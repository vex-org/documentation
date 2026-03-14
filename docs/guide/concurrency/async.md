# Async/Await & Goroutines

Vex supports both coroutine-style `async` code and goroutine-style `go {}` concurrency.

## Async Functions

```vex
async fn fetch_data(id: i32): i32 {
    $println(f"Fetching data for ID: {id}")
    await sleep(100)
    return id * 2
}
```

## Prefix `await`

```vex
async fn process(): i32 {
    let result = await fetch_data(42)
    $println(f"Result: {result}")
    return result
}
```

## Goroutines

```vex
fn main(): i32 {
    go {
        $println("Inline goroutine")
    };
    return 0
}
```

## Channels in Async Workflows

```vex
fn main(): i32 {
    let! ch = Channel.new<i32>(10)

    go {
        ch.send(42)
    };

    match ch.recv() {
        Some(v) => $println(v),
        None => $println("channel closed or empty")
    }

    return 0
}
```

## Notes

- `await` uses prefix syntax.
- Repository tests also show `await` inside `go {}` blocks.
- For channel API details, prefer the dedicated [Channels](/guide/concurrency/channels) page.

## Next Steps

- [Concurrency Overview](/guide/concurrency/overview)
- [Channels](/guide/concurrency/channels)
