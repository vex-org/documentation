# Enums

Enums model sum types and tagged states.

## Basic Enums

```vex
enum Direction {
    North,
    South,
    East,
    West
}
```

## Variants with Data

```vex
enum Message {
    Quit,
    Move(i32, i32),
    Write(string),
    ChangeColor(i32, i32, i32),
}
```

## Matching

```vex
match direction {
    Direction.North => $println("Going north"),
    Direction.South => $println("Going south"),
    Direction.East => $println("Going east"),
    Direction.West => $println("Going west"),
}
```

## Prelude Enums: Option and Result

Current tested helper surface for `Option<T>` includes:

- `isSome()` / `isNone()`
- `or(...)` / `orElse(...)`
- `map(...)` / `flatMap(...)`
- `filter(...)`
- `rescue(...)`

Current tested helper surface for `Result<T, E>` includes:

- `isOk()` / `isErr()`
- `or(...)` / `orElse(...)`
- `map(...)` / `mapErr(...)`
- `flatMap(...)`
- `rescue(...)`

This page intentionally avoids promising `unwrap()` / `unwrapOr()` / `andThen()` as the primary current surface.

## Next Steps

- [Pattern Matching](/guide/basics/control-flow)
- [Contracts](/guide/types/contracts)
- [Error Handling](/guide/error-handling)
