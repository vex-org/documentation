# Channels

Channels are the primary communication primitive between goroutines and async workflows.

They provide explicit message passing instead of implicit shared-state coordination.

## Creating Channels

```vex
let! ch: Channel<i64> = Channel.new<i64>(10)
let! messages: Channel<string> = Channel.new<string>(1)

// Constructor shorthand is also available
let! jobs: Channel<Task> = Channel(16)
```

Capacity determines buffering behavior. Small capacities are good for backpressure; larger capacities are useful for bursty producers.

## Sending and Receiving

```vex
ch.send(42)              // returns bool

let value = <-ch         // blocking receive operator, returns T

match ch.recv() {        // method form returns Option<T>
    Some(v) => $println(v),
    None => $println("channel closed or empty")
}
```

There are two common receive styles:

- `<-ch` when you want the blocking receive operator
- `ch.recv()` when you want explicit `Option<T>` control flow

## Non-Blocking Receive

```vex
if let Some(msg) = ch.tryRecv() {
    process(msg)
} else {
    $println("No message available")
}
```

`tryRecv()` is the right choice for polling loops and opportunistic work-stealing patterns.

## `close()` and Channel Iteration

Both are present in current repository tests:

```vex
go {
    let! i = 0
    while i < 10 {
        ch.send(i)
        i += 1
    }
    ch.close()
};

for val in ch {
    $println(val)
}
```

Closing is what makes channel iteration practical for producer-completes-then-consumer-drains workflows.

## Worker-Pool Style Pattern

```vex
fn worker_pool(tasks: [Task], num_workers: i32) {
    let! task_ch: Channel<Task> = Channel(tasks.len())
    let! result_ch: Channel<Result> = Channel(tasks.len())

    for _ in 0..num_workers {
        go {
            loop {
                match task_ch.tryRecv() {
                    Some(task) => {
                        let result = process_task(task)
                        result_ch.send(result)
                    },
                    None => break
                }
            }
        };
    }
}
```

This pattern scales well when:

- tasks are independent
- workers can share the same input queue
- results can be merged later or consumed by another coordinator

## Result-Carrying Channel APIs

The current documented surface also includes result-returning forms:

```vex
let send_ok = ch.sendResult(10);
let recv_val = ch.recvResult();
```

Use these when the caller needs more detail than a bare `bool` or `Option<T>`.

## Common Patterns

### Producer-consumer

```vex
let! ch: Channel<i64> = Channel(3);

go {
    ch.send(1);
    ch.send(2);
    ch.send(3);
    ch.close();
};

for value in ch {
    $println(value);
}
```

### Request fan-out

Spawn multiple workers and have them all pull from the same queue.

### Explicit shutdown

Call `close()` once the producing side is done so consumers can terminate cleanly.

## Summary

| Operation                 | Current Surface                               |
| ------------------------- | --------------------------------------------- |
| Create                    | `Channel.new<T>(cap)` or `Channel(cap)`       |
| Send                      | `ch.send(value)` → `bool`                     |
| Send with error detail    | `ch.sendResult(value)` → `Result<(), string>` |
| Blocking receive operator | `<-ch` → `T`                                  |
| Method receive            | `ch.recv()` → `Option<T>`                     |
| Receive with error detail | `ch.recvResult()` → `Result<T, string>`       |
| Non-blocking receive      | `ch.tryRecv()` → `Option<T>`                  |
| Close                     | `ch.close()`                                  |

## Guidelines

1. Use bounded channels to express backpressure intentionally.
2. Prefer `recv()` or `recvResult()` when you want explicit termination handling.
3. Use `<-ch` when a simple blocking receive keeps the code clear.
4. Close producer-owned channels exactly once.

## Next Steps

- [Concurrency Overview](/guide/concurrency/overview)
- [Async/Await](/guide/concurrency/async)
