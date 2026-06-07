# Closures

Closures (also called lambdas or anonymous functions) are functions that can capture variables from their enclosing scope. They are a core building block for functional-style programming, callbacks, and iterator chains in Vex.

## Syntax

Vex closure syntax uses pipe-delimited parameters directly followed by the body expression or block. No `=>` is needed:

```vex
// Basic closure: |params| expression
let double = |x: i32| x * 2

// Multi-parameter
let add = |a: i32, b: i32|  a + b

// No parameters
let greet = ||  $println("Hello")

// Multi-statement body with braces
let compute = |x: i32, y: i32|  {
    let temp = x * y
    let result = temp + 10
    return result
}
```

## Calling a Closure

Call closures with the same `()` syntax as regular functions:

```vex
let triple = |n: i32|  n * 3

let six = triple(2)       // 6
let nine = triple(3)      // 9
```

## Type Inference

Closure parameter types can often be inferred from context:

```vex
// Named function reference (always works):
fn timesTwo(x: i32): i32 { return x * 2 }
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map(timesTwo)

// Parameter type explicit — currently required for closures passed to generics:
let doubled = numbers.map(|x: i32| x * 2)

// Cast in closure body if needed:
let explicit = numbers.map(|x: i32| x as f64 * 1.5)
```

> **Note:** When passing closures to generic methods like `map()`, parameter type annotations are currently required due to ongoing generic type inference improvements. Named function references and `for` loops with closures do not have this limitation.

## Capture Modes

Closures capture variables from their enclosing scope. Vex determines the capture mode automatically:

### Shared (Immutable) Capture

When a closure only reads captured variables:

```vex
let multiplier = 10

// Captures multiplier by shared reference
let scale = |x: i32|  x * multiplier

let result = scale(5)  // 50
// multiplier is still usable here
```

### Mutable Capture

When a closure modifies captured variables:

```vex
let! counter = 0

// Captures counter by mutable reference
let increment = ||  {
    counter += 1
}

increment()
increment()
// counter is now 2
```

### Move Capture

When ownership must be transferred into the closure (typically for `go` blocks or returned closures):

```vex
let data = Box.new(42)

// data is moved into the closure
let owner = ||  {
    let val = data  // closure owns data now
    $println(val)
}

// data is no longer accessible in outer scope
```

## Closure Types

Every closure has a unique, anonymous type. You can use closures in generic contexts through contracts:

```vex
// Function that accepts any callable returning i32
fn applyTwice(f: fn(i32): i32, x: i32): i32 {
    return f(f(x))
}

let addThree = |n: i32|  n + 3
let result = applyTwice(addThree, 10)  // (10+3)+3 = 16
```

## Closures as Callbacks

Closures are the standard way to pass behavior into higher-order functions:

```vex
// Filter with closure predicate
let numbers = [1, 2, 3, 4, 5, 6]
let evens = numbers.filter(|n: i32| n % 2 == 0)  // [2, 4, 6]

// Sort with custom comparator
let! items = [3, 1, 4, 1, 5]
items.sortBy(|a: i32, b: i32| b - a)  // descending: [5, 4, 3, 1, 1]

// Map transformation
let squares = numbers.map(|n: i32| n * n)  // [1, 4, 9, 16, 25, 36]

// Find first matching element
let found = numbers.find(|n: i32| n > 4)  // Some(5)

// Fold / reduce with closure
let sum = numbers.fold(0, |acc, n|  acc + n)  // 21
```

## Closures with `go` Blocks

`go` blocks implicitly capture variables by move. Be explicit about what you need inside the goroutine:

```vex
let! messages = Channel.new<string>(10)

let prefix = "Msg: "

// Variable captured by move into goroutine
go {
    let text = prefix + "hello from goroutine"
    messages.send(text)
}

let received = <-messages
```

## Closures vs Function Pointers

| Feature    | Closure                        | Function Pointer      |
| ---------- | ------------------------------ | --------------------- |
| Type       | Unique anonymous type          | `fn(Args): Ret`       |
| Captures   | Yes (shared, mutable, or move) | No                    |
| Size       | Varies (captured state)        | Fixed (pointer-sized) |
| Use in FFI | No                             | Yes                   |
| Overhead   | May allocate if escaping       | Zero overhead         |

```vex
// Function pointer: cannot capture, used for FFI
let fp: fn(i32): i32 = someTopLevelFn

// Closure: can capture, used for local callbacks
let closure = |x|  x + capturedValue
```

## Returning Closures

Closures that escape their defining scope may require heap allocation (via `Box`):

```vex
fn makeMultiplier(factor: i32): fn(i32): i32 {
    // This closure escapes the function -- factor is moved in
    return |x: i32|  x * factor
}

let timesFive = makeMultiplier(5)
let result = timesFive(10)  // 50
```

## Best Practices

1. Use the shortest closure form (`|x|  x * 2`) when the body is a single expression.
2. Use brace-delimited bodies for multi-statement closures.
3. Let type inference work -- annotate parameter types only when the compiler asks for it.
4. Be aware of capture mode: immutable by default, mutable when you write to captured variables, move when ownership transfers.
5. For `go` blocks, be explicit about which variables are used inside to avoid accidental captures.
6. Use function pointers (`fn(T): R`) for FFI boundaries and when no capture is needed.

## Related Pages

- [Function Types](/guide/types/function-types) -- `fn(T): R` pointers
- [Loops & Labels](/guide/basics/loops) -- closures in iteration
- [Async](/guide/concurrency/async) -- closures in async context
