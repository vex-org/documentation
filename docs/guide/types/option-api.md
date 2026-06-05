# Option\<T\> -- Complete API Reference

`Option<T>` represents a value that may or may not be present. It is Vex's safe alternative to null pointers. Vex Option has **no `.unwrap()` method** -- you must always handle the `None` case explicitly.

## The `!>` Rescue Operator

The `!>` (rescue) operator is the idiomatic way to extract a value from `Option` or `Result`, providing a fallback if absent. The fallback is **lazily evaluated** -- only runs on `None`/`Err`:

```vex
let opt: Option<i32> = None

// Lazy closure (recommended for expensive fallbacks):
let val = opt !> || computeDefault()   // computeDefault() only called if None

// Direct value:
let val = opt !> 0

// Multi-line block:
let val = opt !> || {
    $println("Cache miss!")
    expensiveFallback()
}
```

### `??` vs `!>`

|              | `??` (null-coalesce)                | `!>` (rescue)                       |
| ------------ | ----------------------------------- | ----------------------------------- |
| Evaluation   | **Eager** -- right side always runs | **Lazy** -- only on None/Err        |
| Error access | No                                  | Yes (`\|e\|` form on Result)        |
| Use case     | Simple cheap defaults               | Expensive fallbacks, error handling |
| Example      | `opt ?? 0`                          | `opt !> \|\| computeDefault()`      |

```vex
// ?? -- computeDefault() ALWAYS called (wasteful if Some):
let val = opt ?? computeDefault()

// !> || -- computeDefault() ONLY called if None:
let val = opt !> || computeDefault()
```

**Note:** For `Result<T,E>`, the `!>` operator can pass the error to the closure: `result !> |err| handleError(err)`. See the [Result API](/guide/types/result-api) for details.

## Variants

```vex
Option<T> = Some(T) | None
```

## Construction

```vex
// Some: wraps a value
let present: Option<i32> = Some(42)
let also: Option<i32> = Some(100)

// None: no value
let absent: Option<i32> = None

// From a nullable-like operation
let found = map.get("key")        // Option<V>
let popped = vec.pop()            // Option<T>
```

## Core Query Methods

### `isSome()` and `isNone()`

```vex
let opt: Option<i32> = Some(42)

if opt.isSome() {
    $println("Has a value")
}

if opt.isNone() {
    $println("No value")
}

// Typical guard pattern with match
match opt {
    Some(v) => process(v),
    None => handleAbsence(),
}
```

### `.or()` -- Extract Value with Fallback

Use `.or()` to extract the contained value or provide a default. This is the primary way to get a value out of an `Option`.

```vex
let opt: Option<i32> = Some(42)
let value = opt.or(0)            // 42 (was Some)

let n: Option<i32> = None
let fallback = n.or(0)           // 0 (was None)
```

### `.orElse()` -- Extract with Computed Fallback

Like `.or()` but the fallback is computed lazily via a closure:

```vex
let opt: Option<i32> = None
let value = opt.orElse(|| computeDefault())

// With expensive computation
let fromCache = lookup(key).orElse(|| {
    $println("Cache miss, computing...")
    computeExpensive(key)
})
```

## Transformations

### `map()` -- Transform the Contained Value

```vex
let opt = Some(5)

let doubled: Option<i32> = opt.map(|n|  n * 2)   // Some(10)
let none_mapped: Option<i32> = None.map(|n|  n * 2)  // None

// Chaining
let result = getNumber()
    .map(|n|  n * 3)
    .map(|n|  n + 1)
// Some(x) becomes Some(x*3+1), None stays None
```

### `andThen()` -- Chain Fallible Operations

```vex
fn getUser(id: i32): Option<User> { ... }
fn getProfile(user: User): Option<Profile> { ... }

let profile = getUser(42)
    .flatMap(|user|  getProfile(user))

// Equivalent to:
// match getUser(42) {
//     Some(user) => getProfile(user),
//     None => None,
// }
```

### `filter()` -- Conditional Keep

```vex
let num = Some(42)

let positive = num.filter(|n|  n > 0)     // Some(42)
let negative = num.filter(|n|  n < 0)     // None

// Only keep even numbers
let even = Some(7).filter(|n|  n % 2 == 0)  // None
```

### `or()` and `orElse()` -- Fallback Options

```vex
let a: Option<i32> = None
let b: Option<i32> = Some(10)
let c: Option<i32> = Some(20)

let result = a.or(b)         // Some(10) -- first Some or None
let chain = a.or(b).or(c)    // Some(10)
let from_fn = a.orElse(||  expensiveFallback())

// Use case: try multiple sources
let config = envConfig.or(fileConfig).or(defaultConfig)
```

## Pattern Matching

```vex
let opt = computeValue()

// match with both variants
let message = match opt {
    Some(v) => f"Got value: {v}",
    None => "No value",
}

// if let for single-variant check
if let Some(value) = opt {
    $println(f"Processing: {value}")
}

// while let for iteration
while let Some(item) = queue.pop() {
    process(item)
}
```

## Converting to/from Result

```vex
// Option to Result: add error for None case
let opt: Option<i32> = Some(42)
let res: Result<i32, string> = opt.okOr("missing value")
// Some(v) -> Ok(v), None -> Err("missing value")

// With lazy error
let res2 = opt.okOrElse(||  f"Expected value at {line}")

// Result to Option: discard error
let res: Result<i32, Error> = Ok(42)
let opt: Option<i32> = res.ok()
// Ok(v) -> Some(v), Err(_) -> None
```

## Working with References

```vex
// Option<&T> for borrowed values
fn getFirst<T>(items: &Vec<T>): Option<&T> {
    if items.len() > 0 {
        return Some(&items[0])
    }
    return None
}

// Copy the value out (works for Copy types)
let opt = Some(42i32)
let copied: Option<i32> = opt  // Copy
```

## Common Patterns

### Default Value with Side Effect

```vex
let cache = lookup(key).orElse(||  {
    $println("Cache miss, computing...")
    computeExpensive(key)  // only computed if None
})
```

### Chaining Multiple Option Operations

```vex
fn parseAndValidate(input: string): Option<i32> {
    return input.toInt()
        .filter(|n|  n > 0)
        .filter(|n|  n < 1000)
}
```

### Conditional Execution

```vex
let user = getCurrentUser()

// Execute only if Some
user.map(|u|  {
    $println(f"Welcome, {u.name}")
    sendNotification(u)
})

// Execute if None
if user.isNone() {
    redirectToLogin()
}
```

### Collecting Options

```vex
let results = [Some(1), Some(2), None, Some(4)]

// Filter to only Some values
let valid = results.filter(|opt| opt.isSome())
                   .map(|opt| opt.or(0))
// valid = [1, 2, 0, 4] -- uses 0 for None elements
```

## Comparison with Null

| Pattern          | C/Go (null)                 | Vex (Option\<T\>)           |
| ---------------- | --------------------------- | --------------------------- |
| Absence          | `NULL` / `nil`              | `None`                      |
| Presence         | Non-null value              | `Some(value)`               |
| Forgot to check? | Segfault / panic at runtime | Compile error (must handle) |
| Chaining         | Nested if-checks            | `.map().flatMap().filter()` |
| Default          | Ternary `x ? x : default`   | `.or(default)`              |

## Best Practices

1. Use `Option<T>` for any value that might be absent -- never use `null_ptr` or sentinel values.
2. Prefer `.map()`, `.flatMap()`, `.or()` over verbose `match` statements for simple cases.
3. Use `match` or `if let` when you need different behavior for `Some` vs `None`.
4. Vex has no `.unwrap()` -- always handle both `Some` and `None` via `.or()`, `.orElse()`, or pattern matching.
5. Chain operations with `.flatMap()` for multi-step fallible pipelines.
6. Use `.okOr()` to convert `Option` to `Result` when you have error context for the `None` case.

## Related Pages

- [Result API](/guide/types/result-api) / [Option API](/guide/types/option-api) -- the complementary type
- [Contracts Reference](/guide/types/contracts-reference) -- `$Clone`, `$Drop`, `From`, `Into`
- [Operators Reference](/guide/advanced/operators-reference) -- `!>` rescue, `??` null-coalesce, `?` try
- [Error Handling](/guide/error-handling) -- patterns for robust error management
- [Pattern Matching](/guide/types/pattern-matching) -- `match` and `if let` with Option/Result
