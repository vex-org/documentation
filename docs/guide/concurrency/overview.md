# Concurrency Overview

Vex currently exposes two complementary concurrency models:

1. **`go {}` goroutines** for parallel/background work
2. **`async fn` + prefix `await`** for coroutine-style suspension

## Quick Comparison

| Model | Syntax | Good For |
|-------|--------|----------|
| Goroutines | `go { }` | CPU work, background tasks |
| Async/Await | `async fn`, `await` | suspension points, async workflows |
| Channels | `Channel<T>`, `<-ch` | communication between tasks |

## Goroutines

```vex
fn main(): i32 {
    go {
        $println("Hello from goroutine!")
        do_heavy_work()
    };

    $println("Main continues immediately")
    return 0
}
```

## Channels

```vex
fn main(): i32 {
    let! ch: Channel<i64> = Channel.new(3)

    go {
        ch.send(42)
        ch.send(100)
        ch.send(999)
    };

    let val1 = <-ch
    let val2 = <-ch
    let val3 = <-ch

    $println(f"Received: {val1}, {val2}, {val3}")
    return 0
}
```

### Important Channel API Notes

```vex
let! ch: Channel<string> = Channel.new(10)

ch.send("message")        // returns bool

let msg = <-ch            // blocking receive operator, returns T

match ch.recv() {         // method form returns Option<T>
    Some(v) => process(v),
    None => $println("channel closed or empty")
}

if let Some(msg) = ch.tryRecv() {
    process(msg)
}
```

## Async / Await

```vex
async fn fetch_data(id: i32): i32 {
    $println(f"Fetching data for ID: {id}")
    await async_delay(100)
    return id * 2
}

async fn process_items(): i32 {
    let result = await fetch_data(10)
    $println(f"Got result: {result}")
    return result
}
```

## `select` Statement

Current repository tests use a `select { ... }` statement form:

```vex
select {
    val = c1.recv() => $println(f"Got int: {val}"),
    msg = c2.recv() => $println(f"Got string: {msg}"),
    timeout(1000) => $println("Timed out"),
}
```

::: warning Status Note
`select` is present and tested, but current repository tests describe it as an MVP/front-end surface. Prefer simpler channel patterns unless you specifically need it.
:::

## Next Steps

- [Channels](/guide/concurrency/channels)
- [Async/Await](/guide/concurrency/async)
- [Memory Safety](/guide/memory/borrowing)

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
