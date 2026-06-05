# Range\<T\>

`Range<T>` is the iterator type behind Vex's `..` and `..=` range syntax. Ranges are the primary mechanism for iterating over numeric sequences and slicing collections.

## Range Types

| Syntax  | Type                   | Description                      |
| ------- | ---------------------- | -------------------------------- |
| `a..b`  | `Range<T>` (exclusive) | From a up to but not including b |
| `a..=b` | `RangeInclusive<T>`    | From a up to and including b     |
| `a..`   | `RangeFrom<T>`         | From a to infinity               |
| `..b`   | `RangeTo<T>`           | From start to b (exclusive)      |
| `..=b`  | `RangeToInclusive<T>`  | From start to b (inclusive)      |
| `..`    | `RangeFull`            | The entire range                 |

## Range Creation

```vex
let r1 = 0..10           // Range<i32>, exclusive end
let r2 = 0..=10          // RangeInclusive<i32>, inclusive end
let r3 = 5..             // RangeFrom<i32>, unbounded
let r4 = ..100           // RangeTo<i32>

// Explicit types
let r5: Range<f64> = 0.0..1.0
let r6: Range<usize> = 100..200
```

## Iteration with Ranges

Ranges implement the `Iterator` contract, so they work with `for` loops:

```vex
// Basic iteration
for i in 0..5 {
    $println(i)  // 0, 1, 2, 3, 4
}

// Inclusive range
for i in 0..=5 {
    $println(i)  // 0, 1, 2, 3, 4, 5
}

// Reverse iteration
for i in (0..5).rev() {
    $println(i)  // 4, 3, 2, 1, 0
}

// Step iteration
for i in (0..10).stepBy(2) {
    $println(i)  // 0, 2, 4, 6, 8
}
```

## Range in Pattern Matching

Ranges are valid patterns in `match` expressions:

```vex
let score = 85

let grade = match score {
    0..60 => "F",
    60..70 => "D",
    70..80 => "C",
    80..90 => "B",
    90..=100 => "A",
    _ => "Invalid",
}

// Exclusive vs inclusive in patterns
let n = 10
match n {
    0..10 => "single digit (0-9)",
    10..=99 => "two digits (10-99)",
    _ => "large",
}
```

## Range for Slicing

Ranges are used to slice `Span<T>`, `Vec<T>`, arrays, and strings:

```vex
let data = [10, 20, 30, 40, 50, 60, 70, 80]
let span: Span<i32> = data.as_span()

let first3 = span[0..3]         // [10, 20, 30]
let middle = span[2..6]         // [30, 40, 50, 60]
let from_fourth = span[3..]     // [40, 50, 60, 70, 80]
let to_fifth = span[..5]        // [10, 20, 30, 40, 50]
let all = span[..]              // entire span

// Strings
let text = "Hello, World!"
let hello = text[..5]           // "Hello"
let world = text[7..12]         // "World"
```

## Range API

```vex
let r = 0..100

// Properties
let start = r.start    // 0
let end = r.end        // 100

// Check containment
let contains_50 = r.contains(50)     // true
let contains_0 = r.contains(0)       // true
let contains_100 = r.contains(100)   // false (exclusive end)

// Check emptiness
let empty = r.isEmpty()  // false
let really_empty = (5..5).isEmpty()  // true

// Iterator methods
let first = r.next()       // Some(0)
let collected = r.collect()  // Vec<i32> with [0, 1, ..., 99]
```

## Range with Float Types

Floating-point ranges work but have caveats due to IEEE 754 precision:

```vex
// Float range iteration
for t in (0.0..1.0).stepBy(0.1) {
    $println(t)  // 0.0, 0.1, 0.2, ..., 0.9
}

// Float range in patterns
match temperature {
    ..0.0 => "freezing",
    0.0..100.0 => "liquid",
    100.0.. => "gas",
}

// NOTE: (0.0..1.0).contains(0.5) works, but float precision
// can cause edge cases at boundaries
```

## Range in Collections

```vex
// Create Vec from range
let numbers: Vec<i32> = (0..100).collect()

// Filter range
let evens = (0..20).filter(|n|  n % 2 == 0)

// Map range
let squares = (0..10).map(|n|  n * n)

// Sum a range
let sum = <+ (0..100)   // 4950 via horizontal reduction
```

## Unbounded Ranges

`RangeFrom` (e.g., `5..`) has no end and cannot be collected directly. Use `take()`:

```vex
let infinite = 1..
let first_ten: Vec<i32> = infinite.take(10).collect()
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Useful for generating sequences
let powers_of_two = (1..).map(|n|  1 << n).take(10)
```

## Custom Range-Like Types

To make your type work with `..` syntax and `for` loops, implement the `Iterator` contract:

```vex
struct StepCounter: Iterator {
    type Item = i32
    current: i32,
    step: i32,
    limit: i32,
}

fn (self: &StepCounter!) next(): Option<i32> {
    if self.current >= self.limit {
        return None
    }
    let val = self.current
    self.current += self.step
    return Some(val)
}

// Now usable in for loops
let counter = StepCounter.new(0, 3, 20)  // start=0, step=3, limit=20
for n in counter {
    $println(n)  // 0, 3, 6, 9, 12, 15, 18
}
```

## Best Practices

1. Use `0..len` for exclusive iteration (most common).
2. Use `0..=len-1` when the inclusive form reads better in context.
3. Use range patterns in `match` for clean numeric classification.
4. Use ranges for slicing -- they express intent more clearly than manual index math.
5. Avoid collecting unbounded ranges (`5..`) without `take()` -- it will loop forever.
6. Be cautious with float ranges at boundaries due to precision issues.

## Related Pages

- [Loops & Labels](/guide/basics/loops) -- ranges in for loops
- [Pattern Matching](/guide/types/pattern-matching) -- range patterns in match
- [Vec](/guide/types/vec) -- collecting ranges into vectors
