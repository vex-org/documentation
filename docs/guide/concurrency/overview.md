# Concurrency Overview

Vex provides **two complementary concurrency models** that can be used together:

1. **Go-style Goroutines + Channels** - Lightweight green threads with M:N scheduling
2. **Async/Await Coroutines** - Stackless coroutines for I/O operations

::: tip Hybrid Model
Unlike most languages that choose one model, Vex supports **both**! Use goroutines for CPU-bound parallelism and async/await for I/O-bound concurrency. They can even interoperate.
:::

## Concurrency Models Comparison

| Model | Syntax | Best For | Scheduling |
|-------|--------|----------|------------|
| **Goroutines** | `go { }` | CPU parallelism, background tasks | M:N (many goroutines : N OS threads) |
| **Async/Await** | `async fn`, `await` | I/O operations, network calls | Cooperative (single-threaded by default) |
| **Channels** | `Channel<T>`, `<-ch` | Communication between goroutines | Lock-free message passing |

## Go-style Concurrency

### Goroutines with `go`

Spawn lightweight green threads using the `go` keyword:

```vex
fn main(): i32 {
    // Spawn a goroutine
    go {
        println("Hello from goroutine!")
        do_heavy_work()
    };
    
    // Or with an expression
    go process_data(my_data);
    
    println("Main continues immediately")
    return 0
}
```

### Channels

Channels provide safe communication between goroutines:

```vex
fn main(): i32 {
    // Create a buffered channel with capacity 3
    let! ch: Channel<i64> = Channel(3)
    
    // Producer goroutine
    go {
        ch.send(42)
        ch.send(100)
        ch.send(999)
    };
    
    // Receiver - Go-style syntax
    let val1 = <-ch    // Receive from channel
    let val2 = <-ch
    let val3 = <-ch
    
    println(f"Received: {val1}, {val2}, {val3}")
    return 0
}
```

### Channel Operations

```vex
// Create channel with buffer size
let! ch: Channel<string> = Channel(10)

// Send to channel
ch.send("message")

// Receive from channel (two syntaxes)
let msg = <-ch          // Go-style: <-channel
let msg = ch.recv()     // Method call style

// Non-blocking try operations
if let Some(msg) = ch.try_recv() {
    process(msg)
}

if ch.try_send("data").is_ok() {
    println("Sent successfully")
}
```

### Producer-Consumer Pattern

```vex
fn producer_consumer() {
    let! ch: Channel<i32> = Channel(100)
    
    // Multiple producers
    for i in 0..4 {
        let producer_id = i
        go {
            for j in 0..25 {
                ch.send(producer_id * 100 + j)
            }
        };
    }
    
    // Consumer
    for _ in 0..100 {
        let item = <-ch
        process(item)
    }
}
```

### Worker Pool

```vex
fn worker_pool(jobs: [Task], num_workers: i32) {
    let! job_ch: Channel<Task> = Channel(jobs.len())
    let! result_ch: Channel<Result> = Channel(jobs.len())
    
    // Spawn workers
    for _ in 0..num_workers {
        go {
            loop {
                if let Some(job) = job_ch.try_recv() {
                    let result = process_job(job)
                    result_ch.send(result)
                } else {
                    break
                }
            }
        };
    }
    
    // Submit jobs
    for job in jobs {
        job_ch.send(job)
    }
    
    // Collect results
    let! results = []
    for _ in 0..jobs.len() {
        results.push(<-result_ch)
    }
}
```

## Async/Await Coroutines

### Async Functions

Declare async functions with `async fn`:

```vex
async fn fetch_user(id: u64): Result<User, Error> {
    let response = await http.get(f"https://api.example.com/users/{id}")?
    let user: User = await response.json()?
    Ok(user)
}

async fn fetch_data(id: i32): i32 {
    println(f"Fetching data for ID: {id}")
    await async_delay(100)
    println("Data fetched!")
    return id * 2
}
```

### The `await` Keyword

`await` suspends coroutine execution until the future completes:

```vex
async fn process_items() {
    println("Processing item 1")
    let result1 = await fetch_data(10)
    println(f"Got result 1: {result1}")
    
    println("Processing item 2")
    let result2 = await fetch_data(20)
    println(f"Got result 2: {result2}")
    
    println("All done!")
}

fn main(): i32 {
    // Spawn async task
    process_items()
    println("Main function continues...")
    return 0
}
```

### Concurrent Async Operations

```vex
async fn fetch_all() {
    // All three run concurrently
    let (users, posts, comments) = await join!(
        fetch_users(),
        fetch_posts(),
        fetch_comments()
    )
    // Continues after ALL complete
}

async fn with_timeout() {
    select! {
        result = fetch_data() => {
            println(f"Got data: {result}")
        },
        _ = sleep(Duration.from_secs(5)) => {
            println("Timeout!")
        }
    }
}
```

## Combining Both Models

Vex allows mixing goroutines and async/await:

```vex
async fn fetch_and_process(urls: [string]) {
    let! ch: Channel<Response> = Channel(urls.len())
    
    // Spawn goroutines for concurrent fetching
    for url in urls {
        go {
            let response = await http.get(url)
            ch.send(response)
        };
    }
    
    // Collect results
    for _ in 0..urls.len() {
        let response = <-ch
        await process_response(response)
    }
}
```

## Synchronization Primitives

### Mutex (Mutual Exclusion)

```vex
import { Mutex } from "sync"

let counter = Box(Mutex.new(0))

// Safe concurrent access
go {
    let! guard = counter.lock()
    *guard += 1
};

go {
    let! guard = counter.lock()
    *guard += 1
};
```

### RwLock (Read-Write Lock)

```vex
import { RwLock } from "sync"

let cache = Box(RwLock.new(HashMap.new()))

// Many concurrent readers
go {
    let guard = cache.read()
    let value = guard.get(&key)
};

// Exclusive writer
go {
    let! guard = cache.write()
    guard.insert(key, value)
};
```

### Atomic Types

```vex
import { AtomicI64, Ordering } from "sync"

let counter = AtomicI64.new(0)

// Lock-free increment from multiple goroutines
go { counter.fetch_add(1, Ordering.SeqCst) };
go { counter.fetch_add(1, Ordering.SeqCst) };
```

## Choosing the Right Model

```
                    ┌──────────────────┐
                    │  What's your     │
                    │  workload?       │
                    └────────┬─────────┘
                             │
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   I/O-bound  │  │  CPU-bound   │  │   Mixed      │
    │  (network,   │  │  (compute,   │  │  workload    │
    │   file I/O)  │  │   number)    │  │              │
    └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
           │                 │                 │
           ▼                 ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │ async/await  │  │ go { ... }   │  │ Both + Chan  │
    └──────────────┘  └──────────────┘  └──────────────┘
```

### Decision Guide

| If you need... | Use |
|----------------|-----|
| Network/file I/O | `async/await` |
| Parallel CPU work | `go { }` goroutines |
| Communication between tasks | `Channel<T>` |
| Background processing | `go { }` |
| Sequential async calls | `async fn` + `await` |
| Concurrent async calls | `join!` or `select!` |
| Shared mutable state | `Mutex` or `RwLock` |
| Lock-free counters | `Atomic` types |

## Safety Guarantees

Vex's ownership system prevents data races at compile time:

```vex
let! data = [1, 2, 3]

// ERROR: Cannot move data into multiple goroutines
go { data.push(4) };
go { data.push(5) };

// OK: Use Box for shared ownership (VUMM auto-selects AtomicArc)
let data = Box(Mutex.new([1, 2, 3]))

go {
    let data = data.clone()
    data.lock().push(4)
};

go {
    let data = data.clone()
    data.lock().push(5)
};
```

## Performance Notes

| Operation | Approximate Throughput |
|-----------|------------------------|
| Goroutine spawn | ~500K/sec |
| Channel send/recv | ~10M/sec |
| Async task spawn | ~1M/sec |
| Mutex lock/unlock | ~50M/sec |
| Atomic operation | ~100M/sec |

## Next Steps

- [Async/Await](/guide/concurrency/async) - Deep dive into coroutines
- [Channels](/guide/concurrency/channels) - Advanced channel patterns
- [Synchronization](/guide/concurrency/sync) - Locks and atomics
