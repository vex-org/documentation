# Async Functions -- Internals

This page covers how `async fn` and `await` work under the hood: the state machine lowering, suspension mechanics, and runtime interaction.

## The Async State Machine

When you write an `async fn`, the Vex compiler lowers it into a **stackless coroutine** -- a state machine that can suspend and resume. Each `await` point becomes a state in the machine.

### Source Code

```vex
async fn fetchAndProcess(url: string): Result<Data, Error> {
    let response = await http.get(url)?
    let parsed = await parse(response)?
    return Ok(parsed)
}
```

### What the Compiler Does

The compiler:

1. Identifies all `await` points in the function body.
2. Partitions the code into **basic blocks** between `await` points.
3. Generates a state machine that saves/restores live variables at each boundary.
4. Generates a **resume function** that jumps to the correct state and continues execution.

Conceptually (not actual generated code):

```vex
// The compiler creates:
// - A struct holding all live variables across await points
// - A state enum tracking which await point is next
// - A resume function with a jump table to each state
```

## Suspension Mechanics

### What Happens at `await`

```vex
let result = await someAsyncFn()
```

1. The current function's state (live variables, program counter) is saved.
2. Control returns to the runtime scheduler.
3. The runtime polls the awaited operation.
4. When the operation completes, the runtime re-queues the task.
5. On resume, the state machine restores live variables and continues from the next instruction.

### Creating a Future is not awaiting it

An `async { ... }` expression captures its inputs and constructs a Future. Its
body does not run at that point, and constructing it does not suspend the
enclosing function. Suspension begins only when the Future is awaited or
scheduled:

```vex
let pending = async {
    return await loadRecord(id)
}

// Construction above did not run loadRecord or yield this task.
let record = await pending
```

The Future owns or borrows its captures according to the normal ownership
rules, so those inputs remain live for as long as the Future may use them. At
`await`, the compiler transports the exact Future value through the suspension
boundary and preserves any reference provenance carried by its result. This
prevents an awaited view or reference from outliving the storage that produced
it.

### Suspension Safety

The compiler enforces rules about what can live across suspension points:

```vex
async fn badExample(data: &Vec<i32>): i32 {
    // ERROR: borrowed reference cannot live across await
    let first = &data[0]
    await http.get("...")?
    return first              // first may be invalid
}

async fn goodExample(data: &Vec<i32>): i32 {
    let first = data[0]       // copy the value before await
    await http.get("...")?
    return first              // first is owned, always valid
}
```

### `SuspendSafe` Contract

Types implementing `SuspendSafe` are guaranteed to remain valid across suspension boundaries:

- `i32`, `f64`, `bool` (Copy types) -- always safe
- `Box<T>` (heap-allocated, stable address) -- safe
- `string` (owned, heap-backed) -- safe
- `&T` (borrowed reference) -- NOT safe, may dangle
- `Span<T>` (non-owning view) -- NOT safe

## Pin and Async

Self-referential state machines require immovability. When a function body
contains references to its own locals, the compiler applies the `Pin` move
restriction to the generated state-machine type:

```vex
async fn selfReferential() {
    let x = 42
    let ref_x = &x         // ref_x points into the state machine
    await something()
    $println(ref_x)         // Pin guarantees ref_x is still valid
}
```

The compiler automatically detects self-referential patterns and applies `Pin` where needed. No manual `Pin` annotation is required.

## Runtime Integration

### How the Scheduler Runs Async Tasks

```
User code:     async fn myTask() { ... }
                      |
                      v
Compiler:      State machine struct + resume function
                      |
                      v
Runtime:       Task pushed to worker's local deque
               Worker picks up task
               Calls resume function
                   |
           +-------+-------+
           |               |
       Completes        Hits await
           |               |
       Task done       Save state
                       Register with I/O poller
                       Yield to scheduler
                           |
                       I/O completes
                           |
                       Re-queue task on worker
                           |
                       Resume from saved state
```

### Key Runtime Functions

The generated state machine cooperates with VexArch at each suspending `await`
boundary. A ready await may continue inline; suspension saves state and hands the
task back to the scheduler. The exact ABI is compiler/runtime-internal:

| Concept | Purpose |
|---------|---------|
| Task spawn | Push a new task to the scheduler |
| Task yield | Suspend current task, return to scheduler |
| Task resume | Re-queue a suspended task |
| Timer wait | Register an exact deadline in the hierarchical timer wheel |
| Poller wait | Block on I/O events (kqueue/epoll/IOCP) |

The full scheduler tracks an exact earliest timer deadline even when timers are
stored in coarse wheel buckets. Workers reject future-deadline scans before
contending on the wheel lock, ignore stale clock snapshots, and preserve
chronological expiration across the internal millisecond-counter wrap. These
are runtime representation guarantees, not application-visible timer APIs.

Long waits are not limited by the wheel's compact 32-bit bucket key. Vex keeps
the exact saturating i64 monotonic deadline inside the active task and schedules
bounded modular chunks. Expiration, cascade, and long scheduler pauses re-arm
the next chunk without resuming user code; only the exact final deadline wakes
the coroutine. This requires no extra task bytes or per-wait allocation.

> **Implementation detail:** See `lib/runtime/VexArch/src/async/` for the runtime
> implementation. Its reserved `extern "VEX"` ABI is not application API.

## Async Function Rules

### Not Allowed

- Mutable borrows (`&T!`) across `await` -- data could be mutated during suspension
- Holding locks across `await` -- causes deadlocks
- C-ABI-exported async functions -- a native caller cannot drive a Vex async state machine directly
- Recursive `async fn` without boxing -- state machine would be infinite

### Allowed

- Owned values (moved into state machine)
- Immutable references (`&T`, if `T: SuspendSafe`)
- `Box<T>` values and compiler-pinned async frames
- Calling other `async fn` with `await`
- `go { }` blocks (fire-and-forget from async context)

### Implicit suspension points

`await` is the explicit suspension form. Potentially blocking channel syntax is
also a suspension point when it appears in a coroutine: channel send, channel
receive, and a `select` without a `default` arm split the generated state
machine. A `select` with `default` is non-blocking and therefore does not
suspend.

The same channel operations inside an ordinary synchronous function may block
the current OS thread, but they do not manufacture a coroutine frame or a
synthetic `yield`. Borrow checking follows this distinction rather than
treating every channel operation as async.

## Async with `?` Operator

The `?` operator integrates seamlessly with `await`:

```vex
async fn processRequest(req: Request): Result<Response, AppError> {
    let user = await auth.verify(req.token)?      // propagates AuthError
    let data = await db.query(user.id)?            // propagates DbError
    let result = await compute(data)?              // propagates ComputeError
    return Ok(Response.new(result))
}
```

## Comparison: Vex vs Rust Async

| Concept            | Rust                        | Vex                                   |
| ------------------ | --------------------------- | ------------------------------------- |
| `await` syntax     | Postfix: `expr.await`       | Prefix: `await expr`                  |
| State machine type | `impl Future` with `poll()` | Compiler-generated struct + resume fn |
| Waker mechanism    | `std::task::Waker`          | Runtime-internal, not exposed         |
| Trait              | `Future` trait              | No trait -- compiler intrinsic        |
| Executor           | External (tokio, async-std) | Built-in M:N scheduler                |
| Pin requirement    | Manual for self-referential | Auto-applied by compiler              |

## Performance Characteristics

| Metric                  | Approximate                          | Notes                             |
| ----------------------- | ------------------------------------ | --------------------------------- |
| State machine size      | Sum of live vars across await points | Compiler optimizes dead stores    |
| Runtime task cell       | 64 bytes                             | One cache line; frame is separate |
| Ready `await`           | No OS context switch                 | Continues through generated state |
| Suspended `await`       | Provider and workload dependent      | Saves state and resumes later     |

Straight-line async graphs use a compiler-selected cooperative-local scheduler.
That mode has no external wake source. If live tasks remain after its runnable
FIFO becomes empty, Vex reports a deterministic cooperative deadlock instead of
spinning during program finalization. Full async graphs are different: an empty
runnable set may be waiting on channels, timers, or native I/O, so their
scheduler uses provider-aware parking and cancellation rather than this local
terminal check.

The full scheduler becomes visible only after its native poller, global queue,
and timer wheel have all initialized. These resources form one construction
transaction: a failure releases every completed prefix and publishes no partial
scheduler. Likewise, cooperative-local state can promote only before any task,
frame, queue entry, or scheduler work exists. Live local frames can contain
allocator and coroutine-context pointers, so Vex rejects a late promotion
instead of copying an unsafe ownership graph; capability selection must choose
the full scheduler before task publication. Timer suspension verifies its
provider before marking the task waiting, preventing an allocation failure from
turning into an invisible permanent suspension.

Task publication follows the same fail-closed rule. If scheduler/task storage,
an inline reservation token, or queue ownership is unavailable, Vex emits an
allocation-free runtime diagnostic and terminates before publication. It never
reports success after silently dropping a `go` task or leaves an active task
count with no reachable queue entry.

Cooperative-local frames use a thread-local VexArch allocator rather than libc
`malloc`/`free`. Small blocks are reused from aligned size classes backed by raw
64 KiB pages; large frames use page-rounded direct extents. Bounds are checked
before extent tagging and rounding, and cleanup is idempotent for both pooled
and direct storage. Linux uses the target mmap/syscall provider, macOS uses the
system VM provider, and Windows uses `VirtualAlloc`; this does not add a libc
allocator dependency to freestanding runtime storage.

## Best Practices

1. Keep async functions focused -- each `await` point adds to the state machine.
2. Copy/clone values before `await` instead of borrowing across it.
3. Don't hold locks across `await` -- restructure to acquire-release around suspension.
4. Use `async fn` for I/O-bound work; `go` blocks for fire-and-forget.
5. Be explicit about error types -- `Result<T, E>` composes well with `?`.
6. Avoid deep async call stacks -- each level adds state.

## Related Pages

- [Concurrency Overview](/guide/concurrency/overview) -- goroutines and M:N scheduler
- [Async](/guide/concurrency/async) -- async/await basics
- [Channels](/guide/concurrency/channels) -- message passing between tasks
- [Runtime Architecture](/architecture/runtime-architecture) -- VUMM, event loop, channel internals
- [Operators Reference](/guide/advanced/operators-reference) -- channel send/receive operators
