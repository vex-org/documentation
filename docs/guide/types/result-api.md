# Result\<T, E\> -- Complete API Reference

`Result<T, E>` represents either success (`Ok(T)`) or failure (`Err(E)`). It is Vex's primary error handling mechanism, replacing exceptions and error codes. Vex Result has **no `.unwrap()`** -- you must always handle the `Err` case.

## The `!>` Rescue Operator

The `!>` (rescue) operator is the idiomatic way to extract a value, providing a fallback on error. The error value is passed to the fallback closure:

### `??` vs `!>` -- Quick Comparison

```vex
// ?? -- eager, right side always evaluated:
let val = result ?? 0

// !> || -- lazy, only evaluated on Err:
let val = result !> || computeDefault()

// !> |e| -- lazy, error passed to closure:
let val = result !> |err| handleError(err)
```

|                | `??`           | `!>                 |                     | `   | `!> \|e\|` |
| -------------- | -------------- | ------------------- | ------------------- | --- | ---------- |
| When evaluated | Always         | Only on Err         | Only on Err         |
| Error access   | No             | No                  | Yes                 |
| Best for       | Cheap defaults | Expensive fallbacks | Error introspection |

### Three Forms

```vex
// 1. Direct value (error DISCARDED):
let val = result !> 0

// 2. Lazy closure, error DISCARDED:
let val = result !> || computeDefault()

// 3. Lazy closure, error PASSED -- |e| receives the Err value:
let val = result !> |err| {
    $eprintln(f"Failed: {err}")
    fallbackFromError(err)
}
```

### In Practice

```vex
let res: Result<i32, i32> = Err(404)

// Error passed to closure
let val = res !> |code| {
    $println(f"Got error code: {code}")
    code  // use the error as fallback value
}
// val = 404, "Got error code: 404" printed

// Ok passes through without calling closure
let ok: Result<i32, i32> = Ok(999)
let val = ok !> |e| {
    $println("Never called")  // this does NOT execute
    0
}
// val = 999

// Ergonomic default on common errors
let user = findUser(id) !> |e| {
    $eprintln(f"User lookup failed: {e}")
    GuestUser.new()
}
```

## Variants

```vex
Result<T, E> = Ok(T) | Err(E)
```

## Construction

```vex
// Success
let success: Result<i32, string> = Ok(42)

// Failure
let failure: Result<i32, string> = Err("something went wrong")

// From operations that can fail
let parsed: Result<i32, ParseError> = "42".parse()
let opened: Result<File, IoError> = File.open("data.txt")
```

## Core Query Methods

### `isOk()` and `isErr()`

```vex
let result = compute()

if result.isOk() {
    $println("Success!")
}

if result.isErr() {
    // Extract error via pattern matching
    match result {
        Err(e) => $println(f"Failed: {e}"),
        _ => {},
    }
}
```

### `.or()` -- Extract Value with Fallback

```vex
let ok: Result<i32, string> = Ok(42)
let val = ok.or(0)              // 42

let err: Result<i32, string> = Err("fail")
let fallback = err.or(0)        // 0
```

### `.orElse()` -- Extract with Computed Fallback

```vex
let result: Result<i32, Error> = Err(Error.new())

let value = result.orElse(|e| {
    $eprintln(f"Using default due to: {e}")
    return computeDefault()
})
```

## Transformations

### `map()` -- Transform Success Value

```vex
let result: Result<i32, Error> = Ok(5)

// Named function reference (fully supported):
fn timesTwo(n: i32): i32 { return n * 2 }
let doubled: Result<i32, Error> = result.map(timesTwo)   // Ok(10)

// Closure with explicit annotation:
let doubled: Result<i32, Error> = result.map(|n: i32| n * 2)
```

> **Note:** `map()` with closures currently requires explicit type annotations. Named function references work without annotations. Same applies to `flatMap()`, `mapErr()`, and `filter()`.

### `mapErr()` -- Transform Error Value

```vex
let result: Result<i32, IoError> = Err(IoError.new("not found"))

// Convert low-level error to domain error
let domain: Result<i32, AppError> = result.mapErr(|e|  {
    return AppError.new(f"IO failed: {e}")
})
```

### `andThen()` -- Chain Fallible Operations

```vex
fn getUser(id: i32): Result<User, DbError> { ... }
fn getOrders(user: User): Result<Vec<Order>, DbError> { ... }

let orders: Result<Vec<Order>, DbError> = getUser(42)
    .flatMap(|user|  getOrders(user))

// Each step only executes if the previous succeeded
let pipeline = openFile(path)
    .flatMap(|f|  readHeader(f))
    .flatMap(|h|  validateHeader(h))
    .flatMap(|h|  processBody(h))
```

### `orElse()` -- Fallback on Error

```vex
let primary = tryPrimaryServer()
let fallback = primary.orElse(|e|  {
    $eprintln(f"Primary failed: {e}, trying fallback...")
    return tryFallbackServer()
})

// Try multiple strategies
let result = tryCache(key)
    .orElse(|_|  tryDatabase(key))
    .orElse(|_|  tryApi(key))
    .orElse(|_|  Err(AppError.new("All sources failed")))
```

## The `?` Operator

The `?` operator is the primary way to propagate errors. If the result is `Err`, it returns immediately from the enclosing function. If `Ok`, it unwraps the value.

```vex
fn processFile(path: string): Result<Data, Error> {
    let file = File.open(path)?          // propagates error if Err
    let contents = file.readAll()?       // propagates error if Err
    let parsed = parse(contents)?        // propagates error if Err
    return Ok(parsed)
}

// Equivalent without ?:
fn processFileVerbose(path: string): Result<Data, Error> {
    let file = match File.open(path) {
        Ok(f) => f,
        Err(e) => return Err(e),
    }
    let contents = match file.readAll() {
        Ok(c) => c,
        Err(e) => return Err(e),
    }
    let parsed = match parse(contents) {
        Ok(p) => p,
        Err(e) => return Err(e),
    }
    return Ok(parsed)
}
```

### `?` with Option

`?` also works with `Option<T>` in functions returning `Option`:

```vex
fn getGrandparent(id: i32): Option<User> {
    let user = getUser(id)?           // None propagates
    let parent = getUser(user.parentId)?  // None propagates
    return getUser(parent.parentId)
}
```

### `?` Error Type Conversion

`?` automatically converts error types via `From`:

```vex
fn readConfig(): Result<Config, AppError> {
    let file = File.open("config.toml")?  // IoError converts to AppError via From
    let text = file.readAll()?            // IoError -> AppError
    let config = parseToml(text)?         // ParseError -> AppError
    return Ok(config)
}
```

## Conversion Methods

```vex
// Result to Option: discard error
let res: Result<i32, Error> = Ok(42)
let opt: Option<i32> = res.ok()       // Some(42)
let err_opt = res.err()               // None (it's Ok)
let bad: Result<i32, Error> = Err(Error.new())
let opt2: Option<i32> = bad.ok()      // None
let err2: Option<Error> = bad.err()   // Some(Error)

// Option to Result
let opt: Option<i32> = Some(42)
let res: Result<i32, string> = opt.okOr("missing")

// Swap Ok and Err
let swapped: Result<Error, i32> = res.swap()
```

## Common Patterns

### Validate and Transform

```vex
fn parsePort(input: string): Result<u16, string> {
    return input.toInt()
        .mapErr(|_|  f"'{input}' is not a number")
        .flatMap(|n|  {
            if n < 1 || n > 65535 {
                return Err(f"Port {n} out of range 1-65535")
            }
            return Ok(n as u16)
        })
}
```

### Retry with Backoff

```vex
fn retry<T, E>(f: fn(): Result<T, E>, maxRetries: i32): Result<T, E> {
    for attempt in 0..maxRetries {
        match f() {
            Ok(value) => return Ok(value),
            Err(e) => {
                if attempt == maxRetries - 1 {
                    return Err(e)
                }
                sleep(1 << attempt)  // exponential backoff
            }
        }
    }
    // unreachable, but compiler needs this
    return Err(...)
}
```

### Collecting Results

```vex
// Transform Vec<Result<T,E>> into Result<Vec<T>, E>
fn collectResults<T, E>(results: Vec<Result<T, E>>): Result<Vec<T>, E> {
    let! values = Vec.new<T>()
    for result in results {
        values.push(result?)
    }
    return Ok(values)
}
```

### Transactional Pattern

```vex
fn transferMoney(from: Account, to: Account, amount: f64): Result<(), BankError> {
    from.withdraw(amount)
        .flatMap(|_|  to.deposit(amount))
        .orElse(|e|  {
            // Rollback: if deposit fails, put money back
            from.deposit(amount).ok()  // ignore rollback error
            return Err(e)
        })
}
```

## Pattern Matching

```vex
let result = process()

let message = match result {
    Ok(data) => f"Success: {data}",
    Err(e) => f"Error: {e}",
}

// if let for single variant
if let Ok(value) = result {
    $println(f"Got: {value}")
} else {
    $println("Failed")
}

// Match with guard
match result {
    Ok(v) if v > 100 => $println("Large success"),
    Ok(v) => $println(f"Small success: {v}"),
    Err(e) if e.isRecoverable() => recover(e),
    Err(e) => $panic(e),
}
```

## Comparison with Exceptions

| Pattern               | Exceptions (Java/Python) | Result\<T, E\> (Vex)        |
| --------------------- | ------------------------ | --------------------------- |
| Success path          | Return value             | `Ok(value)`                 |
| Failure path          | `throw` / `raise`        | `Err(error)`                |
| Propagation           | Automatic (stack unwind) | Explicit (`?` operator)     |
| Visible in signature? | No (unchecked)           | Yes (always in return type) |
| Forgot to handle?     | Runtime crash            | Compile error               |
| Composition           | try/catch nesting        | `.map().flatMap().orElse()` |

## Best Practices

1. Use `Result<T, E>` as the return type for any function that can fail.
2. Use the `?` operator for error propagation -- it's concise and makes the happy path clear.
3. Define custom error types (enums) that implement `Display` for rich error messages.
4. Use `.mapErr()` to convert low-level errors to domain-specific errors at API boundaries.
5. Prefer `.flatMap()` chains for multi-step operations where each step can fail.
6. Vex has no `.unwrap()` or `.expect()` -- use `.or()` for defaults or `match` for handling both cases.
7. Use `.rescue()` to recover from errors with a fallback value.
8. The `?` operator works on both `Result` and `Option` in functions returning the same type.

## Related Pages

- [Result API](/guide/types/result-api) / [Option API](/guide/types/option-api) -- the complementary type
- [Contracts Reference](/guide/types/contracts-reference) -- `Clone`, `Drop`, `From`, `Into`
- [Operators Reference](/guide/advanced/operators-reference) -- `!>` rescue, `??` null-coalesce, `?` try
- [Error Handling](/guide/error-handling) -- patterns for robust error management
- [Pattern Matching](/guide/types/pattern-matching) -- `match` and `if let` with Option/Result
