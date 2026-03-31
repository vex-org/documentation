# Error Handling

Vex uses explicit values for failure and absence. There are no exceptions. The three core building blocks are:

- `Result<T, E>` for operations that can fail
- `Option<T>` for values that may be absent
- `nil` for raw-pointer and FFI null checks

## `Result<T, E>`

Use `Result<T, E>` when the caller should distinguish success from failure.

```vex
fn divide(a: i32, b: i32): Result<i32, i32> {
    if b == 0 {
        return Err(1);
    }
    return Ok(a / b);
}
```

### Matching on `Result`

```vex
match divide(20, 4) {
    Ok(v) => {
        $println("quotient = {}", v);
    }
    Err(code) => {
        $println("divide failed with {}", code);
    }
}
```

## `Option<T>`

Use `Option<T>` when missing data is expected and not necessarily an error.

```vex
fn first_even(a: i32, b: i32): Option<i32> {
    if a % 2 == 0 {
        return Some(a);
    }
    if b % 2 == 0 {
        return Some(b);
    }
    return None;
}
```

### Matching on `Option`

```vex
match first_even(3, 8) {
    Some(v) => {
        $println("found even value {}", v);
    }
    None => {
        $println("no even value");
    }
}
```

## The `?` Operator

`expr?` unwraps the success branch and propagates the failure branch to the caller.

### `Result` propagation

```vex
fn compute(): Result<i32, i32> {
    let x = divide(20, 4)?;
    let y = divide(x, 2)?;
    return Ok(y + 1);
}
```

If any step returns `Err(e)`, the current function returns that `Err(e)` immediately.

### `Option` propagation

```vex
fn next_even_pair(a: i32, b: i32): Option<i32> {
    let first = first_even(a, b)?;
    return Some(first + 2);
}
```

If the operand is `None`, the current function returns `None` immediately.

## The `!>` Rescue Operator

`expr !> handler` converts a failing `Result` into a fallback value inline.

```vex
fn handler(code: i32): i32 {
    return code + 100;
}

let ok_value = divide(20, 4) !> handler;
let err_value = divide(20, 0) !> handler;
```

- if the left-hand side is `Ok(v)`, the expression yields `v`
- if the left-hand side is `Err(e)`, the handler runs and produces the fallback

Closures work as well:

```vex
let value = divide(20, 0) !> |code| {
    return code + 1000;
};
```

## The `??` Fallback Operator

Use `??` with `Option<T>` when you want a direct default value.

```vex
let port = Some(8080) ?? 3000;
let fallback_port = None ?? 3000;
```

This is the concise alternative to a `match` when the absence path is a simple default.

## Common Helper Surface

Current tested helper surface commonly used in the repository:

### `Option<T>`

- `isSome()` / `isNone()`
- `or(...)` / `orElse(...)`
- `map(...)` / `flatMap(...)`
- `filter(...)`
- `rescue(...)`

### `Result<T, E>`

- `isOk()` / `isErr()`
- `or(...)` / `orElse(...)`
- `map(...)` / `mapErr(...)`
- `flatMap(...)`
- `rescue(...)`

Prefer explicit matching, `?`, and `!>` when the control flow matters. They are easier to audit and line up with the main regression coverage in this repository.

## `nil` for Raw Pointers and FFI

`nil` is the null sentinel for raw-pointer style APIs.

```vex
extern "C" {
    fn malloc(size: usize): ptr;
}

fn main(): i32 {
    let p = malloc(64);
    if p == nil {
        return 1;
    }
    return 0;
}
```

Do not use `nil` as a substitute for `Option<T>` or `Result<T, E>`. Keep nullability at the FFI/raw-memory boundary.

## When to Use What

| Need                                   | Use            |
| -------------------------------------- | -------------- |
| Fallible computation with error detail | `Result<T, E>` |
| Optional presence or lookup            | `Option<T>`    |
| Early propagation to caller            | `?`            |
| Inline fallback from `Result`          | `!>`           |
| Inline fallback from `Option`          | `??`           |
| FFI null handling                      | `nil`          |

## Guidelines

1. Use `Result` when the caller should know why something failed.
2. Use `Option` when absence is normal and expected.
3. Use `?` for straight-line propagation.
4. Use `!>` when the fallback belongs at the current call site.
5. Keep `nil` at raw-pointer boundaries only.

## Next Steps

- [Enums](/guide/types/enums)
- [Pattern Matching](/guide/types/pattern-matching)
- [Testing](/guide/tooling/testing)
