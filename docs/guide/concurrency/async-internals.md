# Async Functions -- Internals

This page covers the internal mechanics of `async fn` and `await`: how the state machine is constructed, suspension points, and memory layout.

## The Async State Machine

When you write an `async fn`, the compiler transforms it into a state machine enum. Each `await` point becomes a state variant.

### Source Code

```vex
async fn fetchAndProcess(url: string): Result<Data, Error> {
    let response = http.get(url).await?
    let parsed = parse(response).await?
    return Ok(parsed)
}
```

### Conceptual State Machine (Compiler Output)

```vex
// Compiler-generated (conceptual, not actual Vex code)
enum FetchAndProcessStateMachine {
    State0_Start { url: string },
    State1_AwaitGet { /* saved locals */ },
    State2_AwaitParse { response: Response },
    State3_Done,
    Poisoned,
}

fn FetchAndProcessStateMachine.poll(self: &FetchAndProcessStateMachine!): Poll<Result<Data, Error>> {
    match self.currentState {
        State0_Start => {
            let future = http.get(self.url)
            self.transition(State1_AwaitGet, future)
            return Poll.Pending
        },
        State1_AwaitGet => {
            let response = self.savedFuture.result()?
            let future = parse(response)
            self.transition(State2_AwaitParse, future)
            return Poll.Pending
        },
        State2_AwaitParse => {
            let parsed = self.savedFuture.result()?
            return Poll.Ready(Ok(parsed))
        },
        State3_Done | Poisoned => $panic("polled after completion"),
    }
}
```

## Suspension Points

An `await` expression is a **suspension point** -- the function may yield control back to the scheduler at that point.

### What Happens at `await`

1. The current future is polled.
2. If `Poll::Pending`, the function saves all live local variables into the state machine.
3. The state machine is registered with the async runtime to be woken when the awaited future completes.
4. The current goroutine yields, allowing other tasks to run.

### What CANNOT Cross Suspension Points

The borrow checker enforces that certain values cannot live across `await`:

```vex
async fn badExample(data: &Vec<i32>): i32 {
    // ERROR: borrowed reference across await
    let first = &data[0]
    http.get("...").await?    // suspension point
    return first              // first may be invalid after resume
}

async fn goodExample(data: &Vec<i32>): i32 {
    let first = data[0]       // copy the value, not a reference
    http.get("...").await?    // suspension point
    return first              // first is owned, still valid
}
```

### `$SuspendSafe` Contract

Types implementing `$SuspendSafe` are guaranteed to remain valid across suspension:

```vex
// i32 is SuspendSafe (it's a Copy type)
// &T is NOT SuspendSafe (the reference may dangle)
// Box<T> IS SuspendSafe (heap-allocated, stable address)
// Pin<T> IS SuspendSafe (pinned, cannot move)
```

## Pin and Async

Async state machines are self-referential: the state machine contains pointers to its own fields. This requires `Pin` to prevent moves:

```vex
// The compiler wraps the state machine in Pin automatically
async fn selfReferential() {
    let x = 42
    let ref_x = &x     // points into the state machine itself
    something().await    // x must not move during await
    $println(ref_x)      // ref_x is still valid because of Pin
}
```

Without `Pin`, moving the state machine would invalidate `ref_x`. The compiler detects self-referential fields and applies `Pin` automatically.

## Waker and Notification

When a future returns `Poll::Pending`, it stores a **Waker** -- a handle that can signal completion:

```vex
// Simplified Waker concept (runtime internals)
struct Waker {
    taskId: u64,       // which task to wake
    workerId: u32,     // which worker owns the task
}

fn Waker.wake(self) {
    // Push the task back onto the worker's deque
    runtime.schedule(self.workerId, self.taskId)
}
```

When an I/O operation completes (e.g., data arrives on a socket), the poller calls `waker.wake()`, which re-queues the async task.

## Async Runtime Integration

```
User Code:   async fn myTask() { ... }
                    |
                    v
Compiler:    State Machine (enum) + poll() method
                    |
                    v
Runtime:     Task { stateMachine, waker }
             Worker polls task
                |
        +-------+-------+
        |               |
    Poll::Ready     Poll::Pending
        |               |
    Task completes   Task suspended
                     Waker registered with poller
                     Worker moves to next task
                        |
                    I/O completes
                        |
                     Waker.wake()
                        |
                     Task re-queued
```

## Async Function Restrictions

### Not Allowed in `async fn`

- `&self!` (mutable self reference) across `.await`
- Holding a `MutexGuard` across `.await` (causes deadlocks)
- Recursive `async fn` (would require boxed futures)
- `extern "C"` async functions (C cannot call async functions)

### Allowed in `async fn`

- `&self` (immutable self, if `Self: $SuspendSafe`)
- All owned values
- `Pin<T>` values
- Calling other `async fn` with `.await`
- `go { }` blocks (fire-and-forget from async context)

## Async with Error Handling

The `?` operator works naturally in async functions:

```vex
async fn processRequest(req: Request): Result<Response, AppError> {
    let user = auth.verify(req.token).await?       // propagates AuthError
    let data = db.query(user.id).await?             // propagates DbError
    let result = compute(data).await?               // propagates ComputeError
    return Ok(Response.new(result))
}
```

## Async Traits / Contracts

Contracts can have async methods:

```vex
contract AsyncReader {
    async fn read(): Result<Vec<u8>, IoError>
    async fn readExact(n: usize): Result<Vec<u8>, IoError>
}

struct HttpStream: AsyncReader {
    async fn read(): Result<Vec<u8>, IoError> {
        let chunk = self.socket.read().await?
        return Ok(chunk)
    }
}
```

## Performance

| Metric                     | Value                                             |
| -------------------------- | ------------------------------------------------- |
| State machine size         | Sum of all live variables across await points     |
| Task spawn (async fn call) | Heap allocation for state machine (if not inline) |
| `await` overhead (pending) | ~10-20 ns (waker registration)                    |
| `await` overhead (ready)   | ~5 ns (no context switch)                         |
| Memory overhead per task   | ~200 bytes + state machine size                   |

## Best Practices

1. Keep async functions small -- large state machines waste memory.
2. Don't hold locks across `.await` -- use `select` with timeout if needed.
3. Avoid borrowing across `.await` points -- copy or clone values instead.
4. Use `async fn` for I/O-bound work; `graph fn` for GPU-bound work; `go` blocks for fire-and-forget.
5. Be explicit about error types -- `async fn` returning `Result<T, E>` composes well with `?`.
6. Avoid deep async call stacks -- each level adds to the state machine.

## Related Pages

- [Concurrency Overview](/guide/concurrency/overview) -- goroutines and M:N scheduler
- [Async](/guide/concurrency/async) -- async/await basics
- [Channels](/guide/concurrency/channels) -- message passing between tasks
- [Runtime Architecture](/architecture/runtime-architecture) -- VUMM, event loop, channel internals
- [Operators Reference](/guide/advanced/operators-reference) -- channel send/receive operators
