# Error Handling

Vex uses explicit `Result<T, E>` and `Option<T>` values. There are no exceptions.

## Result

```vex
fn divide(a: f64, b: f64): Result<f64, string> {
    if b == 0.0 {
        return Err("Division by zero")
    }
    return Ok(a / b)
}
```

### Pattern Matching

```vex
match divide(10.0, 2.0) {
    Ok(result) => $println(f"Result: {result}"),
    Err(e) => $println(f"Error: {e}")
}
```

## `?` Propagation

```vex
fn process_data(path: string): Result<Data, error> {
    let file = open(path)?
    let content = file.read_all()?
    let data = parse(content)?
    return Ok(data)
}
```

## Rescue / Fallback

The repository also uses inline recovery patterns around the `!>` rescue operator.

```vex
let config = load_config("app.json") !> |e| {
    $println(f"Config load failed: {e}, using defaults")
    Config.default()
}
```

## Option

```vex
match find_user(42) {
    Some(user) => $println(f"Found: {user.name}"),
    None => $println("User not found")
}
```

### Common Methods on `Option<T>`

- `isSome()` / `isNone()`
- `or(fallback)`
- `orElse(fn() -> T)`
- `map(...)`
- `flatMap(...)`
- `filter(...)`
- `rescue(...)`

### Common Methods on `Result<T, E>`

- `isOk()` / `isErr()`
- `or(fallback)`
- `orElse(fn(E) -> T)`
- `map(...)`
- `mapErr(...)`
- `flatMap(...)`
- `rescue(...)`

## `nil`

Use `nil` for raw-pointer / FFI null handling:

```vex
extern "C" {
    fn malloc(size: u64): ptr;
}

let p = malloc(100)
if p == nil {
    $println("Memory allocation failed")
}
```

## Notes

- This page intentionally avoids undocumented combinators like `unwrap()` / `expect()` / `unwrap_or()` when the current prelude surface uses `or`, `orElse`, `rescue`, and explicit pattern matching.
- Prefer explicit matching or the current tested combinator names from the prelude.
```

### 2. Use ? for Error Propagation

```vex
// ✅ Good: Clean error propagation
fn process(): Result<Output, error> {
    let a = step_a()?
    let b = step_b(a)?
    let c = step_c(b)?
    return Ok(c)
}
```

### 3. Use !> for Recoverable Errors

```vex
// ✅ Good: Provide sensible default
let config = load_config() !> |e| {
    log_warn(f"Config failed: {e}")
    Config.default()
}
```

### 4. Provide Context

```vex
fn read_user_config(): Result<Config, error> {
    let content = read_file("~/.config/app/config.toml") !> |e| {
        return Err(error.new(f"Failed to read config: {e}"))
    }
    
    return parse_config(content)
}
```

## Summary

| Feature | Syntax | Use Case |
|---------|--------|----------|
| Result type | `Result<T, E>` | Operations that can fail |
| Option type | `Option<T>` | Values that may not exist |
| Propagate | `expr?` | Pass error to caller |
| Rescue | `expr !> \|e\| fallback` | Handle error inline |
| Null coalesce | `a ?? b` | Default for nil |
| Optional chain | `a?.b` | Safe member access |

## Next Steps

- [Modules](/guide/modules) - Code organization
- [Standard Library](/guide/stdlib) - Built-in utilities
- [Testing](/guide/tooling/testing) - Testing error cases
