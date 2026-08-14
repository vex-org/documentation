# Concurrency Overview

Vex has two concurrency surfaces:

1. go blocks for detached or background work;
2. async functions and await for suspension-based workflows.

Channels provide typed communication between tasks. The current runtime uses bounded MPMC queues, cooperative blocking progress, and event-driven multi-channel `select`; native Linux and Windows execution remains part of the platform validation matrix.

## Choose a model

| Model | Use it for | Main syntax |
| --- | --- | --- |
| go block | Scheduling a block of work | go { ... } |
| async function | A function that may suspend | async fn |
| await | Waiting for an async result | await expression |
| channel | Typed communication and backpressure | `Channel<T>`, `<-channel` |

Start with synchronous code. Add concurrency when the ownership boundary and shutdown behavior are clear.

## go blocks

A go block schedules its body independently of the current statement sequence:

~~~vex
fn main(): i32 {
    go {
        $println("background work");
    };
    $println("main continues");
    return 0;
}
~~~

The block does not make a synchronous function return a value. If the caller needs a result, use a channel or an explicit task handle provided by the relevant runtime API.

Captured values still go through ownership and escape analysis. A borrowed local cannot be moved into a detached block if that would leave a dangling reference or create an unsafe shared mutation.

## Channels

Channels are typed queues. A bounded channel makes the producer and consumer relationship explicit:

~~~vex
fn main(): i32 {
    let! channel: Channel<i64> = Channel(1);

    go {
        channel.send(42);
    };

    let value = <-channel;
    $println(value);
    return 0;
}
~~~

The receive operator is blocking and returns the element type directly. A drained closed channel produces that type's zero value. Use `recv()`, `recvResult()`, or `tryRecv()` when the caller must distinguish closure or non-readiness. See [Channels](/guide/concurrency/channels).

## async and await

An async function can be awaited from another async context:

~~~vex
async fn fetch_value(): i32 {
    return 42;
}

async fn main(): i32 {
    let value = await fetch_value();
    $println(value);
    return 0;
}
~~~

Await is not valid in an ordinary synchronous function. An async function's runtime behavior depends on the runtime support available for the target and the operation being awaited.

## Ownership at concurrency boundaries

Concurrency does not disable the ownership model. The compiler checks captures at a go or async boundary:

~~~text
let! values = Vec.new<i32>()
let borrowed = &values

go {
    use(borrowed)
}
~~~

Whether a capture is accepted depends on the lifetime and capture kind. Prefer moving an owned value into a task, borrowing only when the task is guaranteed to remain within the borrow's lifetime, and communicating results through a channel.

## Runtime status

The macOS ARM64 development runtime covers scheduler ownership, channel close/drain behavior, same-worker blocking progress, and event-driven select regressions. Cross-target objects and internal-symbol checks cover Linux and Windows; native execution on those operating systems remains a CI validation item.

Do not use benchmark numbers from design notes as guarantees. Measure the workload, target, and runtime configuration you intend to deploy.

## Next steps

- [Channels](/guide/concurrency/channels)
- [Async](/guide/concurrency/async)
- [Borrowing](/guide/memory/borrowing)
- [Language Status](/guide/language-status)
