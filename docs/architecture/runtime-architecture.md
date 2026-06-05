# Runtime Architecture

This page covers the C runtime that underpins Vex's concurrency, memory management, and async I/O.

## Runtime Layer Map

```
+----------------------------------------------------+
|                  Vex User Code                      |
|         (go blocks, async fn, Box<T>, ...)          |
+----------------------------------------------------+
                        |
                        v
+----------------------------------------------------+
|              Rust FFI Bridge (lib/runtime/src)       |
|   extern "C" declarations, safe Rust wrappers       |
+----------------------------------------------------+
                        |
                        v
+----------------------------------------------------+
|               C Runtime (lib/runtime/runtime)        |
|  +----------+ +----------+ +----------+ +--------+  |
|  | Scheduler| |  VUMM    | |  Async   | |  Net   |  |
|  | (M:N)    | | Allocator| |  Poller  | | Stack  |  |
|  +----------+ +----------+ +----------+ +--------+  |
|  +----------+ +----------+ +----------+            |
|  | Channels | |  Signals | |Platform  |            |
|  | (MPMC)   | |          | |Abstraction|           |
|  +----------+ +----------+ +----------+            |
+----------------------------------------------------+
                        |
                        v
+----------------------------------------------------+
|               Operating System                      |
|   (macOS, Linux, FreeBSD, Windows)                  |
+----------------------------------------------------+
```

## VUMM -- Vex Unified Memory Model

VUMM is the heap allocator that powers `Box<T>`. It automatically selects one of three ownership strategies.

### Allocation Strategies

| Strategy      | When Used                      | Implementation      | Free Cost |
| ------------- | ------------------------------ | ------------------- | --------- |
| **Unique**    | Single owner, no clones        | Plain malloc/free   | O(1)      |
| **SharedRc**  | Multiple owners, single-thread | Non-atomic refcount | O(1)      |
| **AtomicArc** | Multiple owners, multi-thread  | Atomic refcount     | O(1)      |

### Inference Example

```vex
fn singleOwner() {
    let b = Box.new(42)      // VUMM infers: Unique
    // b is the only owner, no clones detected
}  // freed with plain free()

fn sharedSingleThread() {
    let b = Box.new(42)      // VUMM infers: SharedRc
    let b2 = b.clone()        // clone detected, single thread context
    // refcount reaches 0, memory freed
}

fn sharedMultiThread() {
    let b = Box.new(42)      // VUMM infers: AtomicArc
    go {
        let b2 = b.clone()    // clone in different goroutine
        // atomic refcount operations
    }
    // atomic decrement when each owner drops
}
```

### VUMM Allocation Algorithm

The allocator (`vumm.c`) uses a size-class approach:

```
Size classes:
  Tiny:   8, 16, 24, 32, 48, 64 bytes      (thread-local cache)
  Small:  80, 96, 112, 128, 160, 192, 256   (thread-local cache)
  Medium: 320, 384, 512, 768, 1024, 1536, 2048 (global heap)
  Large:  3KB+                              (direct mmap/munmap)
  Huge:   128KB+                             (mmap with guard pages)
```

Each thread maintains a **thread-local cache** of freed blocks for its most-used size classes, eliminating lock contention for small allocations.

### Refcount Implementation

```
Box<T> layout with refcount:
+-------------------+
| refcount (4/8 B)  |  <- atomic for Arc, non-atomic for Rc
+-------------------+
| capacity (8 B)    |  <- original allocation size
+-------------------+
| data (T)          |  <- the actual value
+-------------------+
```

Reference counting operations:

- **Clone (increment):** `atomic_fetch_add(&refcount, 1)` or `refcount += 1`
- **Drop (decrement + free):** decrement, if zero -> call `T.drop()` then `vumm_free()`
- **Weak references:** Not yet implemented (planned for cycle breaking)

## Async Runtime Event Loop

### Poller Abstraction

Vex abstracts over platform-specific I/O notification mechanisms:

| Platform   | Poller   | Source File              |
| ---------- | -------- | ------------------------ |
| macOS      | kqueue   | `async/poller_kqueue.c`  |
| Linux      | epoll    | `async/poller_epoll.c`   |
| Linux 5.1+ | io_uring | `async/poller_iouring.c` |
| FreeBSD    | kqueue   | `async/poller_kqueue.c`  |
| Windows    | IOCP     | `async/poller_iocp.c`    |

### Event Loop Cycle

```
1. Worker checks local task deque
2. If empty, attempts to steal from another worker
3. If all deques empty, polls I/O:
   - kqueue/epoll/IOCP: wait for I/O events with timeout
   - Any ready I/O wakes associated tasks via Waker
4. Process timer wheel for expired timers
5. Return to step 1
```

### Timer Wheel

The runtime maintains a hierarchical timer wheel for efficient timeout management:

```
Millisecond wheel:  256 slots, 1ms resolution (covers 0-255ms)
Second wheel:       64 slots,  256ms resolution (covers up to ~16s)
Minute wheel:       64 slots,  ~16s resolution (covers up to ~17min)
```

`after(5.seconds())` inserts into the appropriate wheel level.

## Channel Implementation

Channels are lock-free MPMC (Multi-Producer, Multi-Consumer) ring buffers.

### Bounded Channel Layout

```
+------------------+
| buffer (ptr)     | --> [slot0][slot1][slot2]...[slotN-1]
+------------------+
| mask (usize)     |  = capacity - 1 (power of 2)
+------------------+
| head (atomic)    |  next write position
+------------------+
| tail (atomic)    |  next read position
+------------------+
| closed (atomic)  |  channel closed flag
+------------------+
| senders (atomic) |  number of active senders
+------------------+
| receivers(atomic)|  number of active receivers
+------------------+
```

### Send Algorithm (Simplified)

```
fn send(ch, value):
    loop:
        head = atomic_load(&ch.head, Acquire)
        tail = atomic_load(&ch.tail, Acquire)
        if head - tail == capacity:
            if ch.closed: return Err(Closed)
            yield()  // full, wait
            continue
        if atomic_compare_exchange(&ch.head, head, head + 1, AcqRel):
            slot = ch.buffer[head & ch.mask]
            slot.write(value)
            wake_one_receiver()
            return Ok(())
```

### Receive Algorithm (Simplified)

```
fn recv(ch):
    loop:
        tail = atomic_load(&ch.tail, Acquire)
        head = atomic_load(&ch.head, Acquire)
        if tail == head:
            if ch.closed: return Err(Closed)
            yield()  // empty, wait
            continue
        if atomic_compare_exchange(&ch.tail, tail, tail + 1, AcqRel):
            slot = ch.buffer[tail & ch.mask]
            value = slot.read()
            wake_one_sender()
            return Ok(value)
```

### Channel Buffer Strategies

| Capacity    | Behavior                                            |
| ----------- | --------------------------------------------------- |
| 0           | Unbuffered: rendezvous -- send blocks until receive |
| 1           | Single-element buffer                               |
| N (> 1)     | Bounded buffer: send blocks when full               |
| (unlimited) | Not supported -- use a growing Vec + Mutex instead  |

## Network Stack

The network layer is built on the async poller:

```
Vex User Code (HTTP, WebSocket, TCP)
        |
        v
lib/std/net/ (TCP, UDP, TLS wrappers)
        |
        v
Runtime: net/net_kqueue.c, net/net_epoll.c, net/net_iocp.c
        |
        v
OS Sockets (non-blocking I/O with poller integration)
```

### Non-Blocking Socket Operations

All socket I/O is non-blocking. When a read/write would block (EAGAIN/EWOULDBLOCK), the runtime:

1. Registers the socket with the poller
2. Suspends the current task
3. When the poller signals readiness, wakes the task

## Signal Handling

The runtime handles POSIX signals gracefully:

```vex
import * as sys from "sys"

// Register signal handler
sys.onSignal(sys.Signal.Interrupt, ||  {
    $println("Received SIGINT, shutting down...")
    shutdown()
})

sys.onSignal(sys.Signal.Terminate, ||  {
    $println("Received SIGTERM")
    gracefulShutdown()
})
```

The runtime dedicates a signal-handling thread that converts signals to internal messages, avoiding the restrictions of signal handler context.

## Panic and Abort

### Panic Handler

When a panic occurs:

1. The panic message is formatted
2. A backtrace is captured (DWARF unwinding on macOS/Linux)
3. If a panic hook is registered, it's called
4. The goroutine stack is unwound, running `$Drop` for all in-scope values
5. If uncaught, the process exits with code 101

```vex
// Custom panic hook
sys.setPanicHook(|msg, backtrace|  {
    $eprintln(f"FATAL: {msg}")
    $eprintln(backtrace)
    // Send to monitoring, write to crash log, etc.
})
```

### Abort

`$abort(code)` immediately terminates the process without unwinding. No `$Drop` handlers run.

## Memory Footprint

| Component                    | Approximate Size       |
| ---------------------------- | ---------------------- |
| Runtime binary (stripped)    | ~200 KB                |
| Per-worker stack             | 2 MB (configurable)    |
| Per-goroutine initial stack  | 8 KB (grows as needed) |
| VUMM thread-local cache      | ~64 KB per thread      |
| Channel (bounded, 256 slots) | ~2 KB + slot data      |

## Best Practices

1. Let VUMM handle allocation strategy -- don't try to manually optimize Box ownership.
2. Use `Channel.new(N)` with a reasonable buffer size -- unbuffered channels can cause deadlocks.
3. Register signal handlers early in `main()` to ensure clean shutdown.
4. Monitor goroutine count -- `sys.goroutineCount()` helps detect leaks.
5. Use the thread sanitizer in CI to catch data races.
6. Keep per-goroutine state small -- stacks grow but large initial state wastes memory.

## Related Pages

- [Runtime & Tooling](/architecture/runtime-and-tooling) -- runtime overview
- [VUMM](/guide/memory/vumm) -- Vex Unified Memory Model
- [Concurrency Deep Dive](/guide/concurrency/deep-dive) -- M:N scheduler
