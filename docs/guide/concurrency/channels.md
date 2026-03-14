# Channels

Channels are the primary communication primitive between goroutines and async workflows.

## Creating Channels

```vex
let! ch: Channel<i64> = Channel.new<i64>(10)
let! messages: Channel<string> = Channel.new<string>(1)

// Constructor shorthand is also available
let! jobs: Channel<Task> = Channel(16)
```

## Sending and Receiving

```vex
ch.send(42)              // returns bool

let value = <-ch         // blocking receive operator, returns T

match ch.recv() {        // method form returns Option<T>
    Some(v) => $println(v),
    None => $println("channel closed or empty")
}
```

## Non-Blocking Receive

```vex
if let Some(msg) = ch.tryRecv() {
    process(msg)
} else {
    $println("No message available")
}
```

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

## Summary

| Operation | Current Surface |
|-----------|-----------------|
| Create | `Channel.new<T>(cap)` or `Channel(cap)` |
| Send | `ch.send(value)` → `bool` |
| Send with error detail | `ch.sendResult(value)` → `Result<(), string>` |
| Blocking receive operator | `<-ch` → `T` |
| Method receive | `ch.recv()` → `Option<T>` |
| Receive with error detail | `ch.recvResult()` → `Result<T, string>` |
| Non-blocking receive | `ch.tryRecv()` → `Option<T>` |
| Close | `ch.close()` |

## Next Steps

- [Concurrency Overview](/guide/concurrency/overview)
- [Async/Await](/guide/concurrency/async)
