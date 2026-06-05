# Tuples

Tuples group multiple values of possibly different types into a single compound value. They are fixed-size, ordered, and heterogeneous.

## Syntax and Construction

```vex
// Parenthesized comma-separated values
let pair = (1, "hello")
let triple = (true, 3.14, 'x')

// Explicit type annotation
let coord: (f64, f64) = (10.0, 20.0)

// Nested tuples
let nested = ((1, 2), "three", (4.0, 5.0))
```

## The Unit Type: `()`

The empty tuple `()` is Vex's **unit type** -- a zero-size type with exactly one value. It represents "no meaningful value" and is the default return type of functions that don't return anything.

```vex
// Function returning nothing
fn doSomething() {
    // Implicitly returns ()
}

// Explicitly
fn explicitUnit(): () {
    return ()
}
```

## Tuple Field Access

Access tuple elements by position using dot-index syntax:

```vex
let pair = (42, "answer")

let num: i32 = pair.0     // 42
let text: string = pair.1  // "answer"

// Mutable tuple fields
let! mut = (1, 2)
mut.0 = 99
mut.1 = 100
```

## Destructuring

Tuples can be destructured in `let` bindings and `match` arms:

```vex
let point = (10, 20)

// Destructuring let
let (x, y) = point
// x = 10, y = 20

// In function parameters
fn distance((x1, y1): (f64, f64), (x2, y2): (f64, f64)): f64 {
    let dx = x2 - x1
    let dy = y2 - y1
    return (dx * dx + dy * dy).sqrt()
}

let dist = distance((0.0, 0.0), (3.0, 4.0))  // 5.0
```

## Pattern Matching with Tuples

Tuples are first-class patterns in `match` expressions:

```vex
let pair = (0, -2)

let axis = match pair {
    (0, y) => f"on x-axis at y={y}",
    (x, 0) => f"on y-axis at x={x}",
    (x, y) => f"point at ({x}, {y})",
}

// Nested tuple patterns
let nested = ((1, 2), 3)

let total = match nested {
    ((a, b), c) => a + b + c,
}
```

## Returning Multiple Values

Since functions return a single value, tuples are the idiomatic way to return multiple values:

```vex
fn divideAndRemainder(a: i32, b: i32): (i32, i32) {
    return (a / b, a % b)
}

let (quotient, remainder) = divideAndRemainder(17, 5)
// quotient = 3, remainder = 2
```

## Tuple Comparison

Tuples support equality and ordering comparisons when all element types do:

```vex
let a = (1, "abc")
let b = (1, "abc")
let c = (2, "xyz")

let same = a == b    // true (lexicographic)
let diff = a == c    // false
let less = a < c     // true (1 < 2)
```

Comparisons are **lexicographic**: first elements compared first, if equal then second elements, etc.

## Copy and Move Semantics

A tuple is `Copy` if ALL its element types are `Copy`:

```vex
// All primitive types are Copy -> tuple is Copy
let a = (1, 2.0, true)
let b = a    // Copy, a still usable

// Contains Box (non-Copy) -> tuple is NOT Copy
let c = (1, Box.new(42))
let d = c    // Move, c is consumed
```

## Tuples vs Structs

| Feature       | Tuple                           | Struct                    |
| ------------- | ------------------------------- | ------------------------- |
| Field access  | `.0`, `.1`, `.2` position-based | `.fieldName` name-based   |
| Type identity | `(T1, T2)` structural           | Named type                |
| Best for      | Quick, ad-hoc grouping          | Meaningful, reusable data |
| Destructuring | `let (a, b) = t`                | `let S { x, y } = s`      |

Use tuples for short-lived, positionally-meaningful groupings (return values, coordinate pairs). Use structs when fields have semantic meaning and the type is reused.

## Tuple Arity

Vex supports tuples of any arity from 0 (unit) upward. There is no hard limit, but extremely large tuples (15+ elements) should be refactored into structs for readability.

```vex
// 0-element: unit
let nothing = ()

// 1-element: single-value tuple (rare, use with caution)
let single = (42,)
let val = single.0

// 2-element: pair
let pair = (1, "a")

// 3-element: triple
let triple = (1, 2, 3)

// 4+ element
let quad = (1, 2.0, true, 'x')
```

## Related Pages

- [Arrays](/guide/types/arrays) -- homogeneous fixed-size collection
- [Structs](/guide/types/structs) -- named-field composite type
- [Pattern Matching](/guide/types/pattern-matching) -- destructuring tuples
