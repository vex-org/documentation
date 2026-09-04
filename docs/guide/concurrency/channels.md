# Channels

Channels provide typed communication between Vex tasks. A channel can be bounded, which makes the amount of queued work explicit and gives the producer a natural backpressure point.

The compiler, Prelude, and runtime share one typed message ownership protocol. A value accepted by a channel belongs to the receiver; rejected sends destroy the moved value exactly once.

## Create and use a channel

The constructor form is the simplest current example:

~~~vex
fn main(): i32 {
    let! channel: Channel<i64> = Channel(3);

    go {
        channel.send(42);
        channel.send(100);
        channel.send(999);
    };

    let first = <-channel;
    let second = <-channel;
    let third = <-channel;

    if first != 42 {
        return 1;
    }
    if second != 100 {
        return 2;
    }
    if third != 999 {
        return 3;
    }
    return 0;
}
~~~

The channel type carries the element type. Sending a value of another type is a semantic error.

## Capacity

The integer passed to Channel is the buffer capacity:

~~~text
Channel<i64>(1)
Channel<i64>(16)
~~~

A capacity of one is useful for hand-off or small bursts. A larger capacity allows a producer to get ahead temporarily, but it does not remove the need for a shutdown policy.

## Receive syntax

The receive operator is written `<-channel` and is intended for a blocking receive:

~~~text
let value = <-channel
~~~

`<-channel` returns `T` directly. If the channel is closed and fully drained, it returns `T`'s zero value, matching the single-value Go-style receive rule. Use the explicit APIs when closure must remain observable:

~~~vex
let maybe: Option<T> = channel.recv()
let result: Result<T, string> = channel.recvResult()
let ready: Option<T> = channel.tryRecv()
~~~

## Closing and shutdown

A producer should close a channel only when it has finished sending. Consumers need a clear way to stop; otherwise a worker can wait forever for data that will never arrive.

`close()` rejects future sends while allowing receivers to drain values that were already accepted. `recv()` returns `None` after the closed queue is drained; `recvResult()` returns `Err`; and `tryRecv()` returns `None` when no value is immediately available.

An accepted send is never discarded merely because `close()` races its final
publication. Close and producer reservation are ordered by the same atomic
cursor. If the producer reserved first, receivers wait for that payload and
then reach the drained terminal state. This also applies when many ordinary or
`select` receivers are already blocked: each wait generation is claimed at
most once, and the final accepted publication cannot leave surplus receivers
parked on a permanently drained channel.

`trySend(value)` is the symmetric non-blocking publication operation. It
returns `false` immediately when the bounded queue is full or closed; because
it takes ownership just like `send`, a rejected value is destroyed exactly
once. Use it for fail-closed completion inboxes and native event-loop bridges
where blocking a scheduler participant would violate the subsystem contract.

## Ownership and captures

A channel does not make arbitrary captured state safe to share. Values sent through a channel and values captured by a go block still follow Vex's ownership and escape rules:

~~~text
let! queue: Channel<Message> = Channel(8)
let message = Message.Work

go {
    queue.send(message)
}
~~~

Whether this is accepted depends on whether the captured message is moved or borrowed safely. Prefer transferring ownership of a value that will no longer be used by the sender, or define a small message type that makes the transfer explicit.

Channel operations observe the channel through a shared handle; sending does
not consume that handle. The payload is different: a successful or pending send
transfers ownership of the value to the channel operation, and the caller must
not use the moved value afterward.

## Blocking and suspension

In an ordinary `fn`, a blocking send or receive waits on the current OS thread.
It is not a coroutine suspension point. In an `async fn` or `go` body, direct
send and receive syntax may park the current task, so the compiler retains the
receiver and payload in the coroutine frame until the operation completes.

A `select` without `default` follows the same async rule because it may wait for
one case to become ready. A `default` arm makes `select` non-blocking and does
not add a suspension point.

## Waiter fairness

Blocked senders, blocked receivers, and parked `select` cases are registered in
arrival-order intrusive FIFOs. The runtime represents each queue as a circular
list with one tail pointer, so fairness does not enlarge the channel object or
add allocation. Ordinary and `select` waiter classes alternate when both are
present; close detaches each waiter exactly once before publishing wakeups.

FIFO order applies to completed waiter registration, not source-level spawn
order. With multiple scheduler workers, two tasks may reach the same channel in
a different order from the order in which their `go` statements were issued.

## A practical design

For a producer-consumer pipeline:

1. Choose the element type and capacity.
2. Decide who owns the sending side.
3. Define how the consumer learns that production is complete.
4. Decide how errors are returned, usually through a Result value or a second channel.
5. Test the shutdown path as carefully as the successful path.

## Select and platform status

Blocking `select` is event-driven: each case owns an independent waiter, one atomic winner commits the operation, and losing waiters are removed before their storage is reused. Ready cases begin at a rotating per-thread index so a permanently-ready first case cannot starve later cases. A `default` arm makes the operation non-blocking.

Every channel and payload expression in a `select` is evaluated exactly once,
in source order, before readiness is resolved. Send candidates are moved into
compiler-owned transports during that preparation; losing a case does not
restore its source value. Channel handles remain usable because selection only
borrows them. Case-local reservations are released before the selected case
body begins.

The macOS ARM64 path is covered by channel, scheduler, close-race, payload-ownership, fairness, and repeated waiter stress tests. Linux and Windows have cross-target object and symbol validation, but native execution on those hosts remains a CI validation item. Performance figures from internal benchmarks are not API guarantees.

## Next steps

- [Concurrency Overview](/guide/concurrency/overview)
- [Async](/guide/concurrency/async)
- [Borrowing](/guide/memory/borrowing)
- [Error Handling](/guide/error-handling)
