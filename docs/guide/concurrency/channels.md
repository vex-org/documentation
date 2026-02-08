# Channels

Channels are Vex's primary mechanism for communication between goroutines. They provide type-safe, lock-free message passing.

## Creating Channels

```vex
// Buffered channel with capacity
let! ch: Channel<i64> = Channel(10)    // Buffer size 10
let! ch: Channel<string> = Channel(1)  // Buffer size 1

// Type is inferred from usage
let! ch = Channel<Message>(100)
```

::: tip Buffer Size
Always specify a buffer size. A buffer of 1 acts like a synchronous channel (blocks until received). Larger buffers allow asynchronous sends.
:::

## Sending and Receiving

### Basic Operations

```vex
// Send to channel
ch.send(42)

// Receive from channel - two equivalent syntaxes
let value = <-ch          // Go-style prefix operator
let value = ch.recv()     // Method call style
```

### Go-style Receive Operator

The `<-` prefix operator is syntactic sugar for `.recv()`:

```vex
fn main(): i32 {
    let! ch: Channel<i64> = Channel(3)
    
    go {
        ch.send(42)
        ch.send(100)
        ch.send(999)
    };
    
    // Go-style syntax: <-ch
    let val1 = <-ch    // 42
    let val2 = <-ch    // 100
    let val3 = <-ch    // 999
    
    return 0
}
```

## Non-blocking Operations

### try_send and try_recv

For non-blocking operations that return immediately:

```vex
// Non-blocking send - returns Result
if ch.try_send(value).is_ok() {
    println("Sent successfully")
} else {
    println("Channel full, would block")
}

// Non-blocking receive - returns Option
if let Some(msg) = ch.try_recv() {
    process(msg)
} else {
    println("No message available")
}
```

## Common Patterns

### Producer-Consumer

```vex
fn producer_consumer() {
    let! ch: Channel<i32> = Channel(100)
    
    // Single producer
    go {
        for i in 0..100 {
            ch.send(i)
        }
    };
    
    // Single consumer
    for _ in 0..100 {
        let item = <-ch
        process(item)
    }
}
```

### Multiple Producers

```vex
fn fan_in() {
    let! ch: Channel<i32> = Channel(100)
    
    // Multiple producers
    for producer_id in 0..4 {
        go {
            for i in 0..25 {
                ch.send(producer_id * 100 + i)
            }
        };
    }
    
    // Single consumer receives all
    for _ in 0..100 {
        let item = <-ch
        println(f"Received: {item}")
    }
}
```

### Worker Pool

```vex
fn worker_pool(tasks: [Task], num_workers: i32) {
    let! task_ch: Channel<Task> = Channel(tasks.len())
    let! result_ch: Channel<Result> = Channel(tasks.len())
    
    // Spawn workers
    for worker_id in 0..num_workers {
        go {
            loop {
                match task_ch.try_recv() {
                    Some(task) => {
                        let result = process_task(task)
                        result_ch.send(result)
                    },
                    None => break
                }
            }
        };
    }
    
    // Submit all tasks
    for task in tasks {
        task_ch.send(task)
    }
    
    // Collect results
    let! results = []
    for _ in 0..tasks.len() {
        results.push(<-result_ch)
    }
}
```

### Pipeline

```vex
fn pipeline() {
    let! stage1_out: Channel<i32> = Channel(10)
    let! stage2_out: Channel<i32> = Channel(10)
    let! stage3_out: Channel<i32> = Channel(10)
    
    // Stage 1: Generate numbers
    go {
        for i in 0..100 {
            stage1_out.send(i)
        }
    };
    
    // Stage 2: Double
    go {
        for _ in 0..100 {
            let n = <-stage1_out
            stage2_out.send(n * 2)
        }
    };
    
    // Stage 3: Add 10
    go {
        for _ in 0..100 {
            let n = <-stage2_out
            stage3_out.send(n + 10)
        }
    };
    
    // Consume results
    for _ in 0..100 {
        let result = <-stage3_out
        println(f"Result: {result}")
    }
}
```

### Request-Response

```vex
struct Request {
    data: [u8],
    response_ch: Channel<Response>
}

fn server() {
    let! request_ch: Channel<Request> = Channel(100)
    
    // Server goroutine
    go {
        loop {
            let req = <-request_ch
            let response = handle_request(req.data)
            req.response_ch.send(response)
        }
    };
    
    // Client makes request
    let! response_ch: Channel<Response> = Channel(1)
    request_ch.send(Request {
        data: [1, 2, 3],
        response_ch: response_ch
    })
    
    // Wait for response
    let response = <-response_ch
}
```

## Typed Channels

Channels are generic and type-safe:

```vex
// Channel of structs
struct Message {
    id: i64,
    payload: string
}

let! msg_ch: Channel<Message> = Channel(10)

go {
    msg_ch.send(Message { id: 1, payload: "Hello" })
};

let msg = <-msg_ch
println(f"Got message {msg.id}: {msg.payload}")
```

## Channel Ownership

Channels can be shared between goroutines:

```vex
fn shared_channel() {
    let! ch: Channel<i32> = Channel(100)
    
    // Multiple goroutines can send to same channel
    go { ch.send(1) };
    go { ch.send(2) };
    go { ch.send(3) };
    
    // Collect all
    for _ in 0..3 {
        println(<-ch)
    }
}
```

## Best Practices

### 1. Always Use Buffered Channels

```vex
// ✅ Good: Buffered channel
let! ch: Channel<i32> = Channel(100)

// ⚠️ Minimal buffer (acts like sync channel)
let! ch: Channel<i32> = Channel(1)
```

### 2. Close Channels When Done (Future Feature)

```vex
// Coming soon: close() and range over channels
// go {
//     for item in items {
//         ch.send(item)
//     }
//     ch.close()
// };
// 
// for item in ch {  // Iterates until closed
//     process(item)
// }
```

### 3. Use try_recv for Polling

```vex
// Non-blocking check
loop {
    match ch.try_recv() {
        Some(msg) => handle(msg),
        None => {
            // Do other work
            do_background_task()
        }
    }
}
```

### 4. Avoid Deadlocks

```vex
// ❌ Deadlock: Send blocks forever (no receiver)
fn deadlock() {
    let! ch: Channel<i32> = Channel(1)
    ch.send(1)
    ch.send(2)  // Blocks! Buffer full, no receiver
}

// ✅ Safe: Receiver in separate goroutine
fn safe() {
    let! ch: Channel<i32> = Channel(1)
    
    go {
        ch.send(1)
        ch.send(2)
    };
    
    let a = <-ch
    let b = <-ch
}
```

## Channel Summary

| Operation | Syntax | Blocking |
|-----------|--------|----------|
| Create | `Channel<T>(size)` | - |
| Send | `ch.send(value)` | Yes (if full) |
| Receive | `<-ch` or `ch.recv()` | Yes (if empty) |
| Try send | `ch.try_send(value)` | No |
| Try receive | `ch.try_recv()` | No |

## Next Steps

- [Async/Await](/guide/concurrency/async) - Coroutines and goroutines
- [Synchronization](/guide/concurrency/sync) - Mutexes and atomics
- [Concurrency Overview](/guide/concurrency/overview) - Model comparison
