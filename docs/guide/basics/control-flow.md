# Control Flow

Vex provides comprehensive control flow constructs including conditionals, pattern matching, and various loop types. Most of these are **expressions** that return values.

## Conditional Expressions

### if / else / elif

```vex
// Basic if
if condition {
    do_something()
}

// if-else
if x > 0 {
    println("Positive")
} else {
    println("Non-positive")
}

// if-elif-else chain
if score >= 90 {
    println("A")
} elif score >= 80 {
    println("B")
} else {
    println("F")
}
```

### if as Expression

Since `if` is an expression, it returns a value:

```vex
let max = if a > b { a } else { b }
```

### Ternary Operator

Vex supports the classic C-style ternary operator `? :` for concise conditionals:

```vex
let max = a > b ? a : b
```

### Conditional Binding

```vex
// if-let for Option/Result
if let Some(value) = optional_value {
    println(f"Got: {value}")
}

if let Ok(data) = fetch_result {
    process(data)
}
```

## Pattern Matching

### match Expression

The `match` expression is Vex's most powerful control flow construct. It is **exhaustive**, meaning all cases must be covered.

```vex
let result = match value {
    0 => "zero",
    1 => "one",
    _ => "many"  // _ is the wildcard pattern
}
```

### Pattern Types

```vex
// Literal and OR patterns
match x {
    0 => "zero",
    1 | 2 | 3 => "small",
    _ => "large"
}

// Enum patterns
match result {
    Ok(value) => println(f"Success: {value}"),
    Err(e) => println(f"Error: {e.msg}")
}

// Tuple patterns
let pair = (1, 2)
match pair {
    (0, 0) => "origin",
    (x, y) => f"at ({x}, {y})"
}
```

### Guards

Add conditions to patterns:

```vex
match number {
    n if n < 0 => "negative",
    n => "positive or zero"
}
```

## Loops

### for Loop

Iterate over collections and ranges:

```vex
// Range iteration
for i in 0..10 {
    println(i)  // 0 to 9
}

// Collection iteration
let numbers = [1, 2, 3]
for num in numbers {
    println(num)
}
```

### while Loop

```vex
let! count = 0
while count < 10 {
    println(count)
    count += 1
}
```

### loop (Infinite Loop)

```vex
loop {
    if should_stop() {
        break
    }
}
```

## Defer

Execute code when leaving the current scope (Go-style RAII):

```vex
fn process() {
    let file = open("data.txt")
    defer file.close() // Executes when function returns
    
    // ... work ...
}
```

## Next Steps

- [Functions](/guide/basics/functions) - Defining behavior
- [Error Handling](/guide/error-handling) - Result and Option
- [Concurrency](/guide/concurrency/async) - Async, Await, and Channels
