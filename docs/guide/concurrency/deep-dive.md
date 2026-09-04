# Concurrency -- Deep Dive

This page covers advanced concurrency features: the M:N scheduler, synchronization primitives, and channel patterns.

> **Note:** The standard library module paths shown here (e.g., `import { ... } from "sync"`) represent the planned API. Verify exact import paths and method signatures against the current `lib/std/` source.

## M:N Scheduler Architecture

Vex uses an M:N user-space scheduler: M coroutines multiplexed onto N operating system threads. This is the same model as Go's runtime, but Vex's scheduler is designed for both throughput and latency-sensitive workloads.

### Architecture Overview

```
User Code (go blocks, async fn)
        |
        v
+-------------------+     +-------------------+
|   Worker Thread 0 | ... |   Worker Thread N |
|  +-------------+  |     |  +-------------+  |
|  | Local Deque |  |     |  | Local Deque |  |
|  | [task][task]|  |     |  | [task][task]|  |
|  +-------------+  |     |  +-------------+  |
|       |    ^       |     |       |    ^       |
|       v    |       |     |       v    |       |
|  +-------------+  |     |  +-------------+  |
|  |   Poller    |  |     |  |   Poller    |  |
|  | (kqueue/    |  |     |  | (kqueue/    |  |
|  |  epoll/IOCP)|  |     |  |  epoll/IOCP)|  |
|  +-------------+  |     |  +-------------+  |
+-------------------+     +-------------------+
        |                        |
        +--------+---------------+
                 |
        +-------------------+
        |  Global Task Queue |
        |  (work-stealing)   |
        +-------------------+
```

### Worker Threads

By default, Vex spawns one worker thread per CPU core:

```vex
import * as sys from "sys"

fn main() {
    let cores = sys.cpuCount()
    $println(f"Scheduler running with {cores} workers")
}
```

Control worker count explicitly:

```vex
// In vex.toml or via environment
// VEX_WORKERS=4 vex run main.vx
```

### Work-Stealing Algorithm

Each worker maintains a **local deque** (double-ended queue) of tasks:

1. **Push/pop from local end** -- The owning worker pushes new tasks to the back and pops from the back (LIFO, cache-friendly).
2. **Steal from remote end** -- Idle workers steal from the front of another worker's deque (FIFO, largest tasks first).
3. **Global queue fallback** -- If all deques are empty, workers check the global queue.

This is the classic Chase-Lev work-stealing deque, proven in Cilk, Go, and tokio.

```
Worker A's deque:  [task1, task2, task3, task4]
                     ^                    ^
                     |                    |
              Steal (FIFO)          Push/Pop (LIFO)
```

### Task Lifecycle

```
Created --> Queued --> Running --> Complete
                  |         |
                  |         +--> Suspended (await) --> Queued
                  |
                  +--> Stolen (migrated to another worker)
```

## `go` Blocks -- Deep Semantics

### Capture Semantics

`go` blocks **move** all captured variables. This prevents data races on stack variables that would go out of scope:

```vex
fn spawnTasks(data: Vec<i32>) {
    // data is moved into the go block -- cannot be used after
    go {
        for item in data {
            process(item)
        }
    }
    // data is inaccessible here -- compile error
}
```

For mutable coordination, use `Channel<T>`. Immutable owned data may be captured
through `Box<T>`; VUMM recognizes the cross-task escape and selects the required
thread-safe representation internally. Vex does not expose `Arc`, `Rc`, reference
counts, or thread-ownership bookkeeping to application code:

```vex
fn shareData() {
    let shared = Box.new(42)  // ownership strategy is selected by VUMM

    go {
        let val = shared.get()  // safe immutable capture
        $println(f"Goroutine 1: {val}")
    }

    go {
        let val = shared.get()
        $println(f"Goroutine 2: {val}")
    }
}
```

### `go` with Return Values

`go` blocks do not return values directly. Use channels or shared state:

```vex
fn computeAsync(): Channel<i32> {
    let! ch = Channel.new<i32>(1)

    go {
        let result = expensiveComputation()
        ch <- result        // send result through channel
    }

    return ch               // caller receives the channel
}

fn main() {
    let resultCh = computeAsync()
    // ... do other work ...
    let result = <-resultCh  // blocks until result is ready
    $println(f"Result: {result}")
}
```

### `go` Block Limitations

- Cannot capture mutable references (`&T!`) -- causes compile error
- Cannot capture values with non-`Send`-like contracts (compiler checks `ConcurrentSafe`)
- Stack-allocated data must be moved, not borrowed

### Exact detached batches and automatic fanout

When a detached integer-range group has an exact small task count, a
non-suspending body, and a capture layout whose ownership can be completed
before publication, the compiler may lower the source operation as one private
batch. This is a physical optimization only: it does not change iteration
values, ownership, completion, or source-visible concurrency semantics.

The compiler chooses producer-local or 2/4/8-way publication from the target,
the exact task population, and a transitive typed-HIR cost. Calls are followed
by resolved semantic identity and exact generic instantiation, never by a
function-name match. Recursion, indirect calls, dynamic control flow,
unsupported targets, or incomplete inference retain the ordinary scheduler
path. Suspension uses a separate persistent-frame admission path described
below; it never uses transient inline capture storage.

Automatic fanout is also subordinate to the runtime's configured worker
ceiling. For example, an eight-way compiler request in a four-worker embedder
uses at most four execution contexts; it never silently expands the pool.
This keeps scheduler tuning and host resource ownership under application
control while allowing zero-source-noise batching where the proof is complete.

Exact owned indexed sources participate in the same physical optimization.
Copy arrays move into one generation-owned aggregate, while `Vec<T>` and
`Deque<T>` move one owning container and yield immutable `&T` items to the lane
tasks. A Deque remains a ring: the compiler transports its semantic head and
capacity and maps logical indices directly to wrapped physical slots without
linearizing or copying it. The final lane releases compiler-generated drop glue
exactly once. Borrowed Slice/Span views intentionally keep the ordinary path,
because a view alone does not prove that its backing owner outlives detached
execution.

Read-only shared captures may also use this exact batch path when ownership can
be completed before reservation. Today that proof is available for the exact
`Channel<T>` language item and for `Box<T>` sites that VUMM has selected as
thread-safe shared owners. `Box<T>` remains the public API; no Arc type or
manual thread-aware ownership leaks into user code. Retains may be combined
into one same-owner multiplicity operation before private task reservation. The
compiler passes the exact owner and lane count directly; no pointer array is
materialized, and VexArch performs one RC update or one uncontended CAS.
Channel and VUMM ownership remain distinct internally, so this optimization
cannot accidentally apply VUMM release or permanence rules to Channel storage.
Owned strings and arbitrary user containers remain fail-closed because their
clone operation may allocate or otherwise fail.

Suspending Array, Vec, and Deque bodies retain the same ownership model rather
than falling back to one universal coroutine. One allocation owns the single
source value and exactly N persistent lane frames. Array/Vec frames carry only
`data`, `length`, and a logical cursor; Deque adds `head` and `capacity` so every
lane can address the ring directly. Generic iterator state is omitted.
Vec/Deque drop glue runs exactly once after the final lane reaches terminal
completion, including lane-local `break`; Copy arrays need no owner destructor.
The parent evaluates the source once, even when the `go` is nested in an async
function.

For an integer-range body that can suspend, `go(cpu: N) for` likewise creates
exactly N persistent coroutine lanes rather than one universal task. The parent
evaluates range bounds or a trusted first-class `Range` once, allocates one
aggregate frame generation, initializes every private lane, and publishes the
group once. Lane `i` visits offsets `i, i + N, ...` from a widened frame field.
Empty lanes finish normally, and inclusive integer maxima cannot wrap at the
source width.

Transient inline captures remain DONE-only. Aggregate coroutine frames instead
survive YIELDED/WAIT returns and are released only after terminal DONE and drop
glue. The final lane reclaims the shared allocation. Resume blocks reload bounds
and offsets from the frame, so no entry-state SSA value is reused across a
suspension edge. Admission is based on exact HIR identities and repeat-safe
capture ownership; unsupported owners retain the single-coroutine fallback.
Borrowed views and non-Copy arrays stay on that fallback until backing lifetime
and exact-once element destruction can be proven. Generic iterator lane
batching additionally requires a semantic partition capability: sharing one
mutable `next()` cursor across lanes would race, while calling `iter()` once per
lane could repeat user-visible conversion effects.

This fallback is not limited to integer ranges. An inference-sealed custom
`Iterator` keeps its normalized source value in the coroutine frame, and a
custom `IntoIterator` keeps the converted iterator in a separate exact frame
field when its type or ABI differs from the source. `iter`, `next`, and
`Option<Item>` are selected by semantic identity rather than spelling. Mutable
receivers are reloaded after resume, and converted iterator drop glue runs
exactly once on exhaustion, `break`, return, or terminal cleanup. Re-entering
the same source loop reinitializes the persistent field and its ownership flag
without reusing stale state.

The `ordered` modifier is reserved but not yet enabled. Ordered parallel work
needs a source-visible result-collection contract; scheduling tasks in launch
order alone would not define completion or result order. The compiler therefore
reports `E0658` instead of silently treating `go(cpu: N, ordered)` as unordered
execution. Use an explicit indexed result owner or channels until that contract
is introduced.

## Channel `select`

`select` waits on multiple channel operations, executing the first one that becomes ready:

```vex
fn multiplex(ch1: Channel<string>, ch2: Channel<string>): string {
    return select {
        msg = <-ch1 => f"From ch1: {msg}",
        msg = <-ch2 => f"From ch2: {msg}",
        after 5.seconds() => "timeout",
    }
}
```

### Select with Send

```vex
select {
    ch <- value => $println("Sent successfully"),
    after 1.second() => $println("Send timed out"),
}
```

### Select with Default (Non-Blocking)

```vex
select {
    msg = <-ch => $println(f"Received: {msg}"),
    default => $println("No message available"),
}
```

### Select with Multiple Cases

```vex
fn fanIn(ch1: Channel<i32>, ch2: Channel<i32>, ch3: Channel<i32>): Channel<i32> {
    let! out = Channel.new<i32>(10)

    go {
        loop {
            select {
                v = <-ch1 => out <- v,
                v = <-ch2 => out <- v,
                v = <-ch3 => out <- v,
            }
        }
    }

    return out
}
```

## Atomic Operations

Vex provides atomic types for lock-free concurrent programming:

### Atomic Integers

```vex
import { I64, Bool } from "sync/atomic"

fn concurrentCounter() {
    let! counter = atomic.I64.new(0)

    // Spawn 100 goroutines, each increments 1000 times
    for _ in 0..100 {
        go {
            for _ in 0..1000 {
                counter.fetchAdd(1)      // atomic increment
            }
        }
    }

    // Wait for all to finish...
    let total = counter.load()            // 100000
}
```

### Atomic Operations Reference

| Method                      | Description                   | Memory Ordering        |
| --------------------------- | ----------------------------- | ---------------------- |
| `load()`                    | Read current value            | Acquire                |
| `store(val)`                | Write value                   | Release                |
| `fetchAdd(val)`             | Add and return old value      | Relaxed (or specified) |
| `fetchSub(val)`             | Subtract and return old value | Relaxed                |
| `fetchAnd(val)`             | Bitwise AND and return old    | Relaxed                |
| `fetchOr(val)`              | Bitwise OR and return old     | Relaxed                |
| `fetchXor(val)`             | Bitwise XOR and return old    | Relaxed                |
| `compareExchange(old, new)` | CAS: swap if equal            | Acquire-Release        |
| `swap(val)`                 | Swap and return old value     | Acquire-Release        |

### Memory Ordering

```vex
import { I64, Bool } from "sync/atomic"

let! flag = atomic.Bool.new(false)

// Relaxed: no ordering guarantees, fastest
flag.store(true, atomic.Ordering.Relaxed)

// Acquire: subsequent reads/writes not reordered before this
let val = flag.load(atomic.Ordering.Acquire)

// Release: previous reads/writes not reordered after this
flag.store(false, atomic.Ordering.Release)

// Acquire-Release: both acquire and release semantics
let old = flag.compareExchange(false, true, atomic.Ordering.AcqRel)

// Sequential Consistency: total order, slowest but safest
flag.store(true, atomic.Ordering.SeqCst)
```

### Atomic Bool

```vex
let! running = atomic.Bool.new(true)

go {
    while running.load(atomic.Ordering.Acquire) {
        doWork()
    }
}

// Signal shutdown
running.store(false, atomic.Ordering.Release)
```

## Mutex and RwLock

When atomic operations aren't sufficient, Vex provides mutual exclusion:

### Mutex\<T\>

```vex
import { Mutex, RwLock, Once, Barrier, WaitGroup } from "sync"

let! shared_data = sync.Mutex.new(Vec.new<i32>())

go {
    let! guard = shared_data.lock!()     // acquires mutex
    guard.push(42)                        // safe mutation
    // guard dropped here, mutex released
}

// RAII: lock is automatically released when guard goes out of scope
```

### RwLock\<T\>

Multiple readers or one writer:

```vex
import { Mutex, RwLock, Once, Barrier, WaitGroup } from "sync"

let! cache = sync.RwLock.new(Map.new<string, Data>())

// Multiple readers can access concurrently
fn readCache(key: string): Option<Data> {
    let guard = cache.read()              // shared lock
    return guard.get(key).clone()
}

// Writer gets exclusive access
fn updateCache(key: string, data: Data) {
    let! guard = cache.write!()           // exclusive lock
    guard.insert(key, data)
}
```

## Synchronization Primitives

### Once -- Run Exactly Once

```vex
import { Mutex, RwLock, Once, Barrier, WaitGroup } from "sync"

let! init = sync.Once.new()

for _ in 0..10 {
    go {
        init.callOnce(||  {
            $println("This prints exactly once")
            initializeGlobalState()
        })
    }
}
```

### Barrier -- Synchronize N Threads

```vex
import { Mutex, RwLock, Once, Barrier, WaitGroup } from "sync"

let! barrier = sync.Barrier.new(4)  // wait for 4 threads

for _ in 0..4 {
    go {
        phase1()
        barrier.wait()        // all 4 threads synchronize here
        phase2()
    }
}
```

### WaitGroup -- Wait for Completion

```vex
import { Mutex, RwLock, Once, Barrier, WaitGroup } from "sync"

let! wg = sync.WaitGroup.new()

for i in 0..10 {
    wg.add(1)                // increment counter
    go {
        defer wg.done()      // decrement when done
        processTask(i)
    }
}

wg.wait()                    // blocks until counter reaches 0
$println("All tasks completed")
```

## Thread-Local Storage

```vex
// Thread-local variable: each worker thread has its own copy
threadlocal let! threadBuffer: [u8; 4096] = [0; 4096]

fn workerTask() {
    // Each goroutine on each thread sees its own threadBuffer
    threadBuffer[0] = 42
}
```

## Concurrency Safety Contracts

The compiler enforces thread safety through capability contracts:

| Contract | Meaning |
| --- | --- |
| `ConcurrentSafe` | Value/reference use satisfies concurrent transfer rules |
| `SuspendSafe` | A borrow remains valid across `await` suspension points |

These are the canonical Vex capability names. `$Send` and `$Sync` are not Vex
contracts.

```vex
// Compiler checks: Vec<i32> is ConcurrentSafe, so this compiles
go {
    let data = Vec.new<i32>()
    data.push(42)  // OK
}

// Compiler rejects: &i32 is NOT ConcurrentSafe (borrowed reference to stack)
let x = 42
let ref = &x
// go { let val = ref  }  // COMPILE ERROR: cannot send &i32 across threads
```

## Debugging Concurrency Issues

### Thread Sanitizer

```bash
vex compile --sanitize=thread main.vx
./main
# Reports data races with stack traces
```

### Deadlock Detection

The compiler-selected cooperative-local runtime has no external wake source. It
therefore reports a deterministic deadlock when live tasks remain but its
runnable FIFO is empty. No environment flag is required.

The full M:N runtime cannot infer a general wait cycle from an empty runnable
set: tasks may be waiting legitimately on I/O, timers, channels, cancellation,
or a remote worker publication. Use bounded contexts/timeouts for application
protocols. General cross-provider wait-cycle diagnostics are not currently a
documented runtime guarantee.

## Performance Characteristics

| Operation                 | Latency               | Notes                                    |
| ------------------------- | --------------------- | ---------------------------------------- |
| `go { }` spawn            | target-dependent      | Measure with the bounded benchmark matrix |
| Channel send              | target-dependent      | Bounded MPMC ring; no direct handoff claim |
| Mutex lock                | target-dependent      | Contention and provider policy dominate  |
| Work stealing             | target-dependent      | Runs only on the scheduler's idle path   |

Vex keeps the common task cell to one 64-byte cache line and uses owner-local
queues plus bounded stealing. Competitive numbers must come from the
repository's bounded benchmark matrix on the target host; these rows are
architecture notes, not fixed nanosecond promises.

## Best Practices

1. Use `Channel<T>` for communication between goroutines -- "don't communicate by sharing memory, share memory by communicating."
2. Use `go` blocks for I/O-bound parallelism, not CPU-bound (use `graph fn` for that).
3. Prefer atomics over mutexes for simple counters and flags.
4. Use `RwLock` when reads vastly outnumber writes.
5. Always use `defer wg.done()` with WaitGroup to prevent leaks.
6. Enable thread sanitizer in CI to catch data races early.
7. Vex rotates the first polled `select` case per thread, preventing a permanently-ready source-order prefix from starving later cases without requiring a clock or random syscall.

## Related Pages

- [Concurrency Overview](/guide/concurrency/overview) -- goroutines and M:N scheduler
- [Async](/guide/concurrency/async) -- async/await basics
- [Channels](/guide/concurrency/channels) -- message passing between tasks
- [Runtime Architecture](/architecture/runtime-architecture) -- VUMM, event loop, channel internals
- [Operators Reference](/guide/advanced/operators-reference) -- channel send/receive operators
