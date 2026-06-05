# Loops -- Expressions and Labels

Loops in Vex are **expressions** that can return values. Combined with labeled blocks, this enables concise, powerful control flow patterns.

## Loops as Expressions

Every loop form (`for`, `while`, `loop`) can yield a value via `break`:

### `loop` with Break Value

```vex
// loop is the primary way to compute with early exit
let result = loop {
    let candidate = generateNext()
    if isGood(candidate) {
        break candidate   // loop returns this value
    }
    if attempts > 1000 {
        break defaultValue  // fallback return
    }
}
// result is the value from whichever break executed
```

### `for` with Break Value

```vex
let found = for item in collection {
    if matches(item) {
        break item        // for loop returns the found item
    }
}
// found type is Option<T> -- None if loop completed without break
```

### `while` with Break Value

```vex
let! counter = 0
let first_over_hundred = while counter < 1000 {
    counter += 1
    let val = compute(counter)
    if val > 100 {
        break val
    }
}
// first_over_hundred is the value that exceeded 100
```

## Labeled Blocks

Labels allow naming a block or loop so `break` and `continue` can target a specific scope:

### Labeled Block Expressions

```vex
let value = 'outer: {
    let x = compute()
    if x < 0 {
        break 'outer 0    // break out of 'outer with value 0
    }

    let y = 'inner: {
        if x > 100 {
            break 'inner x / 2
        }
        break 'inner x * 2
    }

    break 'outer y + 1
}
```

### Labeled Loops

```vex
'search: for row in 0..gridHeight {
    for col in 0..gridWidth {
        if grid[row][col] == target {
            $println(f"Found at ({row}, {col})")
            break 'search    // breaks the OUTER loop, not just the inner
        }
    }
}
```

### `continue` with Labels

```vex
'outer: for i in 0..10 {
    for j in 0..10 {
        if i * j > 50 {
            continue 'outer   // skip rest of inner loop AND advance outer loop
        }
        process(i, j)
    }
}
```

## Loop Forms Reference

### `for` -- Iteration

```vex
// Range iteration
for i in 0..10 { }            // 0, 1, ..., 9
for i in 0..=10 { }           // 0, 1, ..., 10

// Collection iteration
for item in vec { }            // by value (consumes if non-Copy)
for item in &vec { }          // by reference (borrows)
for item in &!vec { }         // by mutable reference

// Map iteration
for (key, value) in map { }   // destructuring in for

// With index
for (i, item) in vec.enumerate() { }
```

### `while` -- Condition-Based

```vex
while condition {
    // body
}

// While-let pattern
while let Some(item) = queue.pop() {
    process(item)
}
```

### `loop` -- Infinite Loop

```vex
loop {
    // runs until break, return, or panic
    if done {
        break
    }
}
```

## Loop Control Flow

| Expression           | Behavior                                       |
| -------------------- | ---------------------------------------------- |
| `break`              | Exit the innermost loop immediately            |
| `break value`        | Exit with a value (loop becomes an expression) |
| `break 'label`       | Exit the named loop                            |
| `break 'label value` | Exit named loop with value                     |
| `continue`           | Skip to next iteration of innermost loop       |
| `continue 'label`    | Skip to next iteration of named loop           |

## Loop Return Types

When a loop does NOT `break` with a value, it returns `()` (unit). When it DOES break with a value, the type is taken from the break expression:

```vex
// Returns () because no break-with-value
for i in 0..10 {
    $println(i)
}

// Returns Option<i32> because break may yield a value
let result: Option<i32> = for i in 0..10 {
    if i == 5 {
        break i
    }
}
// result = Some(5)

// If the loop completes without break, result is None
let not_found: Option<i32> = for i in 0..5 {
    if i > 100 {
        break i
    }
}
// not_found = None
```

## Common Patterns

### Find First Match

```vex
fn findFirst<T>(items: Span<T>, predicate: fn(&T): bool): Option<T> {
    return for item in items {
        if predicate(&item) {
            break item   // Option<T>
        }
    }
    // If loop completes without break, returns None
}
```

### Retry with Backoff

```vex
fn retryWithBackoff<T>(f: fn(): Result<T, Error>, maxRetries: i32): Result<T, Error> {
    let! delay = 1

    return loop {
        match f() {
            Ok(value) => break Ok(value),
            Err(e) => {
                if delay > maxRetries {
                    break Err(e)
                }
                sleep(delay)
                delay *= 2
            }
        }
    }
}
```

### State Machine with Labeled Blocks

```vex
fn parseStateMachine(tokens: Span<Token>): Result<Ast, ParseError> {
    let! state = State.Initial

    return 'parse: {
        for token in tokens {
            state = match (state, token) {
                (Initial, OpenBrace) => InBlock,
                (InBlock, Identifier(name)) => {
                    // ... handle identifier
                    InBlock
                },
                (InBlock, CloseBrace) => break 'parse Ok(ast),
                (_, unexpected) => break 'parse Err(ParseError.new(unexpected)),
            }
        }
        break 'parse Err(ParseError.new("Unexpected end of input"))
    }
}
```

## Best Practices

1. Use `loop` with `break value` for complex initialization or search logic that doesn't fit a `for` or `while`.
2. Use labeled blocks for multi-level control flow instead of boolean flags or deeply nested conditionals.
3. Use `for` with `break` for linear searches where the item may not exist.
4. Label outer loops clearly when nested -- `'search`, `'parse`, `'retry` are better than `'outer`, `'a`.
5. Avoid `loop` with `break` when a simpler `while` or `for` expresses the intent more clearly.
