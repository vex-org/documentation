# Async/Await & Goroutines

Vex provides two primary concurrency models designed for modern parallel systems:

1. **Async/Await**: Stackless coroutines for managing many I/O-bound operations efficiently.
2. **Goroutines**: Lightweight, M:N scheduled green threads for CPU-bound parallelism.

## Async Functions

Async functions are declared with the `async` keyword and return a future that can be awaited.

```vex
async fn fetch_data(id: i32): i32 {
    println(f"Fetching data for ID: {id}")
    await sleep(100) // Suspend current coroutine
    return id * 2
}
```

## The `await` Keyword

Vex uses **prefix await** syntax to wait for asynchronous results:

```vex
async fn process() {
    let result = await fetch_data(42)
    println(f"Result: {result}")
}
```

## Goroutines (`go`)

The `go` keyword spawns a lightweight thread (goroutine) that runs concurrently with the caller.

```vex
fn heavy_task() {
    // ... complex computation ...
}

fn main() {
    go heavy_task() // Run in background
    go {
        println("Inline goroutine")
    }
}
```

## Channels

Channels provide safe, synchronized communication between goroutines and async tasks.

```vex
fn main() {
    let! ch = Channel.new<i32>(10)
    
    go {
        ch.send(42)
    }
    
    let val = ch.recv() // Some(42)
}
```

### Channel Operations

| Operation | Description |
|-----------|-------------|
| `Channel.new<T>(cap)` | Create a channel with fixed capacity |
| `ch.send(val)` | Send a value (may block) |
| `ch.recv()` | Receive a value (returns `Option<T>`) |
| `ch.close()` | Close the channel |

## Best Practices

1. **Use `async` for I/O**: High-concurrency network or disk tasks should use `async/await`.
2. **Use `go` for CPU work**: Offload heavy computations to goroutines to avoid blocking the async event loop.
3. **Communicate via Channels**: Avoid shared memory where possible; leverage channels for state synchronization.

## Next Steps

- [Synchronization](/guide/concurrency/sync) - Mutexes and atomics
- [Standard Library](/guide/stdlib) - Built-in async utilities
- [Memory Safety](/guide/memory/borrowing) - Thread-safe borrowing
