# Error Handling

Vex uses explicit error handling through `Result` and `Option` types. There are no exceptions - errors are values that must be handled explicitly.

## Result Type

For operations that can fail:

```vex
enum Result<T, E> {
    Ok(T),
    Err(E)
}
```

### Returning Results

```vex
fn divide(a: f64, b: f64): Result<f64, string> {
    if b == 0.0 {
        return Err("Division by zero")
    }
    return Ok(a / b)
}

fn parse_number(s: string): Result<i32, error> {
    // Implementation
}
```

### Handling Results

```vex
// Pattern matching
match divide(10.0, 2.0) {
    Ok(result) => println(f"Result: {result}"),
    Err(e) => println(f"Error: {e}")
}

// unwrap (panics on Err)
let result = divide(10.0, 2.0).unwrap()  // 5.0

// unwrap_or (default on Err)
let result = divide(10.0, 0.0).unwrap_or(0.0)  // 0.0

// expect (panics with message)
let result = divide(10.0, 2.0).expect("Division failed")
```

## The ? Operator

Propagate errors automatically:

```vex
fn process_data(path: string): Result<Data, error> {
    let file = open(path)?           // Returns early if Err
    let content = file.read_all()?   // Returns early if Err
    let data = parse(content)?       // Returns early if Err
    return Ok(data)
}

// Equivalent to:
fn process_data_verbose(path: string): Result<Data, error> {
    let file = match open(path) {
        Ok(f) => f,
        Err(e) => return Err(e)
    }
    let content = match file.read_all() {
        Ok(c) => c,
        Err(e) => return Err(e)
    }
    let data = match parse(content) {
        Ok(d) => d,
        Err(e) => return Err(e)
    }
    return Ok(data)
}
```

## The !> Rescue Operator

Vex provides the `!>` (rescue) operator for inline error handling with a fallback:

```vex
// Basic syntax: expr !> |error_var| fallback_expr
let data = parse_json(text) !> |e| default_data

// With function reference
let value = risky_operation() !> handle_error

// Chain with closures
let config = load_config("app.json") !> |e| {
    println(f"Config load failed: {e}, using defaults")
    Config.default()
}
```

### Rescue vs ? Operator

| Operator | Behavior | Use Case |
|----------|----------|----------|
| `?` | Propagate error to caller | Let caller handle errors |
| `!>` | Handle error inline with fallback | Provide default/recovery |

```vex
fn process(path: string): Result<i32, error> {
    // ? propagates error
    let file = open(path)?
    
    // !> handles error inline
    let config = load_config() !> |_| Config.default()
    
    return Ok(config.value)
}
```

### Rescue with Different Handlers

```vex
// Closure handler
let x = parse_int(s) !> |e| {
    log_error(e)
    0  // Default value
}

// Function reference handler
fn default_handler(e: error): i32 {
    println(f"Error: {e}")
    return -1
}
let y = parse_int(s) !> default_handler

// Simple default value (when error is ignored)
let z = parse_int(s) !> |_| 0
```

## Option Type

For high-level values that might not exist, Vex uses the `Option<T>` type (available in the prelude):

```vex
enum Option<T> {
    Some(T),
    None
}
```

### Using Option

```vex
fn find_user(id: u64): Option<User> {
    database.get(id)
}

// Pattern matching
match find_user(42) {
    Some(user) => println(f"Found: {user.name}"),
    None => println("User not found")
}

// Methods
let name = find_user(42)
    .map(|u| u.name)
    .unwrap_or("Unknown")
```

## FFI & Raw Pointers (`nil`)

While `Option<T>` is the idiomatic way to handle optionality in Vex code, the `nil` keyword exists for compatibility with **raw pointers** and **FFI (Foreign Function Interface)**.

It represents the `NULL` value in C.

```vex
extern "C" {
    fn malloc(size: u64): ptr;
}

let p = malloc(100)
if p == nil {
    println("Memory allocation failed")
}
```

## Creating Errors

```vex
// Create error values
let err = error.new("Something went wrong")

// In functions
fn validate(x: i32): Result<i32, error> {
    if x < 0 {
        return Err(error.new("Must be positive"))
    }
    return Ok(x)
}
```

## Null Safety Operators

Vex provides powerful operators to handle `Option` and `nil` values concisely.

### Null Coalesce (??)

Returns the left operand if it is `Some(v)` or a non-nil pointer, otherwise returns the right operand:

```vex
// With Option
let name = user.nickname ?? "Anonymous"

// With pointers (FFI)
let p = get_ptr() ?? default_ptr
```

### Optional Chaining (?.)

Safe member access. Returns `None` (for Options) or `nil` (for pointers) if the receiver is `None` or `nil`:

```vex
let city = user?.address?.city  // None if user or address is None
let len = str_ptr?.len()        // nil if str_ptr is nil
```

## Custom Error Types

### Error Enum

```vex
enum FileError {
    NotFound(string),
    PermissionDenied(string),
    InvalidFormat,
    IoError(error)
}

fn read_config(path: string): Result<Config, FileError> {
    let file = match open(path) {
        Ok(f) => f,
        Err(e) => {
            if e.kind() == "NotFound" {
                return Err(FileError.NotFound(path))
            }
            return Err(FileError.IoError(e))
        }
    }
    
    return parse_config(file)
}
```

### Pattern Matching Errors

```vex
match read_config("app.json") {
    Ok(config) => use_config(config),
    Err(FileError.NotFound(path)) => {
        println(f"File not found: {path}")
        use_default_config()
    },
    Err(FileError.PermissionDenied(path)) => {
        panic(f"Cannot read {path}: permission denied")
    },
    Err(FileError.InvalidFormat) => {
        println("Invalid config format")
        use_default_config()
    },
    Err(FileError.IoError(e)) => {
        panic(f"IO error: {e}")
    }
}
```

## Result Combinators

### map and map_err

```vex
let result: Result<i32, string> = Ok(5)

// Transform Ok value
let doubled = result.map(|n| n * 2)  // Ok(10)

// Transform Err value  
let err: Result<i32, string> = Err("fail")
let detailed = err.map_err(|e| f"Error: {e}")
```

### and_then (Chaining)

```vex
fn validate(input: string): Result<string, error> { /* ... */ }
fn parse(s: string): Result<i32, error> { /* ... */ }
fn process(n: i32): Result<Output, error> { /* ... */ }

let result = validate(input)
    .and_then(|s| parse(s))
    .and_then(|n| process(n))
```

### or_else

```vex
// Try alternative on error
let result = primary_source()
    .or_else(|_| fallback_source())
    .or_else(|_| Ok(default_value()))
```

## Best Practices

### 1. Use Result for Expected Failures

```vex
// ✅ Good: File might not exist
fn read_config(path: string): Result<Config, error>

// ❌ Bad: Using panic for expected case
fn read_config(path: string): Config {
    // panics if file doesn't exist
}
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
