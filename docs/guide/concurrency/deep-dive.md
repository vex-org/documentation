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

To share data between goroutines, use `Channel<T>` or `Arc<T>`:

```vex
fn shareData() {
    let shared = Box.new(42)  // VUMM infers AtomicArc for multi-thread access

    go {
        let val = shared.get()  // safe: atomic reference count
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

| Contract             | Meaning                                                |
| -------------------- | ------------------------------------------------------ |
| `ConcurrentSafe`    | Type can be safely sent between threads                |
| `SuspendSafe`       | Value remains valid across `await` suspension points   |
| `$Send` (conceptual) | Type can be transferred to another thread              |
| `$Sync` (conceptual) | Shared reference can be accessed from multiple threads |

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

The runtime can detect simple deadlocks (all workers blocked):

```bash
VEX_DEADLOCK_DETECT=1 vex run main.vx
# If all goroutines are blocked waiting on each other, the runtime panics
```

## Performance Characteristics

| Operation                 | Latency (approximate) | Notes                                    |
| ------------------------- | --------------------- | ---------------------------------------- |
| `go { }` spawn            | ~50-100 ns            | Task allocated on current worker's deque |
| Channel send (unbuffered) | ~100 ns               | Direct handoff if receiver waiting       |
| Channel send (buffered)   | ~30 ns                | Ring buffer push                         |
| Mutex lock (uncontended)  | ~20 ns                | Single atomic operation                  |
| Mutex lock (contended)    | ~1-10 us              | Futex-based sleep                        |
| Work stealing             | ~100-500 ns           | Only when worker is idle                 |

## Best Practices

1. Use `Channel<T>` for communication between goroutines -- "don't communicate by sharing memory, share memory by communicating."
2. Use `go` blocks for I/O-bound parallelism, not CPU-bound (use `graph fn` for that).
3. Prefer atomics over mutexes for simple counters and flags.
4. Use `RwLock` when reads vastly outnumber writes.
5. Always use `defer wg.done()` with WaitGroup to prevent leaks.
6. Enable thread sanitizer in CI to catch data races early.
7. Be mindful of `select` fairness -- Vex's select picks randomly among ready cases to prevent starvation.

## Related Pages

- [Concurrency Overview](/guide/concurrency/overview) -- goroutines and M:N scheduler
- [Async](/guide/concurrency/async) -- async/await basics
- [Channels](/guide/concurrency/channels) -- message passing between tasks
- [Runtime Architecture](/architecture/runtime-architecture) -- VUMM, event loop, channel internals
- [Operators Reference](/guide/advanced/operators-reference) -- channel send/receive operators
