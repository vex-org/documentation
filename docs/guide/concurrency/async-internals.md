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

Self-referential state machines require immovability. When a function body contains references to its own local variables, the compiler wraps the state machine in `Pin<T>` to prevent moves:

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

The generated state machine calls into the C runtime at each `await` boundary. The exact function signatures are compiler internals; the table below shows the conceptual interface:

| Concept | Purpose |
|---------|---------|
| Task spawn | Push a new task to the scheduler |
| Task yield | Suspend current task, return to scheduler |
| Task resume | Re-queue a suspended task |
| Poller wait | Block on I/O events (kqueue/epoll/IOCP) |

> **Implementation detail:** See `lib/runtime/runtime/src/async/` for the actual C runtime API.

## Async Function Rules

### Not Allowed

- Mutable borrows (`&T!`) across `await` -- data could be mutated during suspension
- Holding locks across `await` -- causes deadlocks
- `extern "C"` async functions -- C cannot call Vex async functions
- Recursive `async fn` without boxing -- state machine would be infinite

### Allowed

- Owned values (moved into state machine)
- Immutable references (`&T`, if `T: SuspendSafe`)
- `Box<T>` and `Pin<T>` values
- Calling other `async fn` with `await`
- `go { }` blocks (fire-and-forget from async context)

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
| Task memory overhead    | ~200 bytes + state machine           | On par with Goroutines (Go)       |
| `await` on ready value  | ~5 ns                                | No context switch needed          |
| `await` with suspension | ~50-100 ns                           | Save state + yield + later resume |

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
