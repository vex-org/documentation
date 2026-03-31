# Enums

Enums represent tagged states. They are the main sum-type mechanism in Vex and are used both for custom state machines and for prelude types such as `Option<T>` and `Result<T, E>`.

## Basic Form

```vex
enum Direction {
    North,
    South,
    East,
    West,
}
```

This is a plain tagged enum with no payload data.

## Data-Carrying Variants

```vex
enum Message {
    Quit,
    Move(i32, i32),
    Write(string),
    ChangeColor(i32, i32, i32),
}
```

Variants can carry payloads directly. This makes enums suitable for AST nodes, protocol states, parser results, and domain-specific event streams.

## Matching

Pattern matching is the normal way to consume enum values.

```vex
match direction {
    Direction.North => { $println("north"); }
    Direction.South => { $println("south"); }
    Direction.East => { $println("east"); }
    Direction.West => { $println("west"); }
}
```

Payloads can be bound directly:

```vex
match msg {
    Message.Quit => { $println("quit"); }
    Message.Move(x, y) => { $println("move {}, {}", x, y); }
    Message.Write(text) => { $println("write {}", text); }
    Message.ChangeColor(r, g, b) => { $println("rgb {} {} {}", r, g, b); }
}
```

## Generic Enums

Enums can also be generic:

```vex
enum Maybe<T> {
    Some(T),
    None,
}
```

This is the same shape used by the built-in `Option<T>`.

## Enums in Control Flow

Enums work well with expression-oriented matching:

```vex
let code = match packet {
    Packet.Data(v) => v,
    Packet.Empty => 0,
    Packet.Error(e) => e,
};
```

This is the idiomatic pattern when every branch should yield a value.

## Built-In Enums: `Option<T>` and `Result<T, E>`

### `Option<T>`

Use `Option<T>` when absence is expected:

```vex
let value = match Some(42) {
    Some(v) => v,
    None => 0,
};
```

Common current helper surface:

- `isSome()` / `isNone()`
- `or(...)` / `orElse(...)`
- `map(...)` / `flatMap(...)`
- `filter(...)`
- `rescue(...)`

### `Result<T, E>`

Use `Result<T, E>` when you need explicit success and error states:

```vex
fn parse_port(text: string): Result<i32, i32> {
    if text == "8080" {
        return Ok(8080);
    }
    return Err(1);
}
```

Common current helper surface:

- `isOk()` / `isErr()`
- `or(...)` / `orElse(...)`
- `map(...)` / `mapErr(...)`
- `flatMap(...)`
- `rescue(...)`

The main control-flow operators built around these enums are documented in [Error Handling](/guide/error-handling).

## Practical Guidelines

1. Use small enums for finite state machines.
2. Use payload variants instead of parallel flag fields when the state shape changes.
3. Prefer `match` when the branch structure matters.
4. Use `Option` and `Result` instead of ad-hoc sentinel values.

## Next Steps

- [Pattern Matching](/guide/types/pattern-matching)
- [Error Handling](/guide/error-handling)
- [Contracts](/guide/types/contracts)
