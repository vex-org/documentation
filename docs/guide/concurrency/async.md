# Async/Await and `go {}`

Vex supports two related concurrency styles:

- `async fn` plus prefix `await` for suspension-based workflows
- `go {}` for spawned concurrent tasks

They are complementary rather than mutually exclusive.

## `async fn`

An async function is declared with `async fn` and awaited with prefix `await`.

```vex
async fn fetch_data(id: i32): i32 {
    await async_delay(100);
    return id * 2;
}

async fn process(): i32 {
    let result = await fetch_data(42);
    return result + 1;
}
```

Repository examples also cover:

- chained awaits
- multiple awaits in one function
- await inside larger expressions
- async `main` entry points in dedicated examples

## Prefix `await`

`await` is a prefix operator.

```vex
async fn compute(): i32 {
    let a = await fetch_data(10);
    let b = await fetch_data(20);
    return a + b;
}
```

This means you will typically see forms like:

- `let x = await work();`
- `return await work();`
- `let total = (await left()) + (await right());`

## `go {}` Blocks

Use `go {}` when you want concurrent work to be spawned as a task.

```vex
fn main(): i32 {
    go {
        $println("background task");
    };
    return 0;
}
```

`go {}` is useful for fire-and-forget work, worker pools, and channel-based orchestration.

## `await` Inside `go {}`

Repository examples also exercise `await` inside spawned `go {}` blocks, so these models are meant to interoperate.

```vex
fn main(): i32 {
    go {
        await async_delay(10);
        $println("task resumed after await");
    };
    return 0;
}
```

## Async with Channels

Channels remain the main coordination primitive even when async code is involved.

```vex
fn main(): i32 {
    let! ch = Channel.new<i32>(1);

    go {
        ch.send(42);
    };

    match ch.recv() {
        Some(v) => {
            $println("received {}", v);
        }
        None => {
            return 1;
        }
    }

    return 0;
}
```

## When to Use Which

| Need                                                | Prefer                 |
| --------------------------------------------------- | ---------------------- |
| Straight-line async workflow with suspension points | `async fn` + `await`   |
| Spawn concurrent work immediately                   | `go {}`                |
| Move values between tasks safely                    | `Channel<T>`           |
| Coordination with explicit mailbox semantics        | `Channel<T>` + `go {}` |

## Practical Guidelines

1. Use `await` for sequencing async dependencies.
2. Use `go {}` when you want independent concurrent progress.
3. Push shared coordination through channels instead of ad-hoc shared mutation.
4. Prefer the dedicated channel API when you need task communication rather than return-value chaining.

## Next Steps

- [Concurrency Overview](/guide/concurrency/overview)
- [Channels](/guide/concurrency/channels)
- [Functions](/guide/basics/functions)
