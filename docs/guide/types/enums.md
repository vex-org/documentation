# Enums

Enums (enumerations) in Vex allow you to define a type that can be one of several variants. They are the primary tool for modeling sum types and complex data states.

## Defining Enums

### Simple Enums

```vex
enum Direction {
    North,
    South,
    East,
    West
}

enum Status {
    Pending,
    Active,
    Completed,
    Cancelled
}
```

### Using Enum Values

```vex
let direction = Direction.North
let status = Status.Active

// Pattern matching
match direction {
    Direction.North => println("Going north"),
    Direction.South => println("Going south"),
    Direction.East => println("Going east"),
    Direction.West => println("Going west")
}
```

## Variants with Data

Enum variants can hold data, making them extremely powerful for complex structures.

### Tuple Variants

```vex
enum Message {
    Quit,
    Move(i32, i32),
    Write(string),
    ChangeColor(u8, u8, u8)
}

let msg = Message.Move(10, 20)
let quit = Message.Quit
let text = Message.Write("Hello")
```

### Struct Variants

```vex
enum Event {
    Click { x: i32, y: i32, button: u8 },
    KeyPress { key: char, modifiers: u8 },
    Resize { width: u32, height: u32 }
}

let event = Event.Click { x: 100, y: 200, button: 1 }
```

## Methods on Enums (Go-style)

```vex
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
    Point
}

fn (self: &Shape) area(): f64 {
    match self {
        Shape.Circle { radius } => 3.14159 * radius * radius,
        Shape.Rectangle { width, height } => width * height,
        Shape.Point => 0.0
    }
}
```

## Core Enums: Option and Result

Vex provides two special enums in the **Prelude** for handling optionality and errors.

### `Option<T>`

Used when a value might be missing.

```vex
enum Option<T> {
    Some(T),
    None
}
```

#### Common Methods

| Method | Description |
|--------|-------------|
| `isSome(): bool` | Returns `true` if the option is `Some`. |
| `isNone(): bool` | Returns `true` if the option is `None`. |
| `unwrap(): T` | Returns the value or panics if `None`. |
| `unwrapOr(default: T): T` | Returns the value or the provided default. |
| `map<U>(f: fn(T): U): Option<U>` | Transforms the inner value if it exists. |
| `andThen<U>(f: fn(T): Option<U>): Option<U>` | Chains another optional operation (flatmap). |

```vex
fn find_item(id: i32): Option<string> {
    if id == 1 { return Some("Found") }
    return None
}

match find_item(1) {
    Some(val) => println(f"Got: {val}"),
    None => println("Nothing found")
}
```

### `Result<T, E>`

Used for operations that can fail.

```vex
enum Result<T, E> {
    Ok(T),
    Err(E)
}
```

#### Common Methods

| Method | Description |
|--------|-------------|
| `isOk(): bool` | Returns `true` if the result is `Ok`. |
| `isErr(): bool` | Returns `true` if the result is `Err`. |
| `unwrap(): T` | Returns the `Ok` value or panics on `Err`. |
| `unwrapOr(default: T): T` | Returns the `Ok` value or the provided default. |
| `map<U>(f: fn(T): U): Result<U, E>` | Transforms the `Ok` value. |
| `mapErr<F>(f: fn(E): F): Result<T, F>` | Transforms the `Err` value. |
| `andThen<U>(f: fn(T): Result<U, E>): Result<U, E>` | Chains another fallible operation. |

```vex
fn divide(a: f64, b: f64): Result<f64, string> {
    if b == 0.0 { return Err("Division by zero") }
    return Ok(a / b)
}
```

## Generic Enums

Enums can be generic over one or more types:

```vex
enum Either<L, R> {
    Left(L),
    Right(R)
}
```

## Recursive Enums

Use `Box<T>` to wrap recursive variants:

```vex
enum List<T> {
    Cons(T, Box<List<T>>),
    Nil
}
```

## C-like Enums

Enums can have explicit discriminant values:

```vex
enum HttpStatus {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    NotFound = 404,
}

let code = HttpStatus.Ok as i32 // 200
```

## Struct Tags & Metadata

Like structs, enums do not use Rust-style attributes (`#[derive]`). Metadata is handled through struct tags or manual contract implementations.

```vex
enum Color {
    Red,
    Green,
    Blue
}
```

## Best Practices

1. **Use enums for state machines**: Clear representation of mutually exclusive states.
2. **Prefer Option over null**: Use `Option<T>` for high-level logic.
3. **Exhaust all variants**: Vex's `match` is exhaustive; use `_` only when absolutely necessary.

## Next Steps

- [Pattern Matching](/guide/basics/control-flow) - Detailed match syntax
- [Contracts](/guide/types/contracts) - Defining shared behavior
- [Error Handling](/guide/error-handling) - Idiomatic Result/Option usage
