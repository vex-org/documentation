# Pattern Matching -- Advanced Patterns

This page covers pattern matching features beyond the basics: `if let`, `while let`, match guards, or-patterns, rest patterns, and destructuring in `let` bindings.

## `if let` -- Conditional Single-Pattern Match

`if let` tests a value against a single pattern and executes the block only if it matches. It is syntactic sugar for a `match` with one arm and a wildcard.

```vex
let opt: Option<i32> = Some(42)

// if let: concise single-pattern match
if let Some(value) = opt {
    $println(f"Got value: {value}")
}

// Equivalent match (more verbose)
match opt {
    Some(value) => $println(f"Got value: {value}"),
    None => {},
}
```

### `if let` with Multiple Conditions

Combine `if let` with regular conditions using `&&`:

```vex
let data: Result<i32, string> = fetchData()

if let Ok(value) = data && value > 0 {
    $println(f"Positive result: {value}")
}
```

### `if let` with Struct Patterns

```vex
struct Point {
    public:
    x: f64,
    y: f64,
}

let maybe_point: Option<Point> = Some(Point.new(3.0, 4.0))

if let Some(Point { x, y }) = maybe_point {
    $println(f"Point at ({x}, {y})")
}
```

### `if let` with `else`

```vex
let result = compute()

if let Ok(data) = result {
    process(data)
} else {
    $println("Computation failed")
}
```

## `while let` -- Loop While Pattern Matches

`while let` repeatedly tests a value against a pattern, continuing as long as it matches:

```vex
let! queue = Vec.new<i32>()
queue.push(1)
queue.push(2)
queue.push(3)

// Process items until the queue is empty
while let Some(item) = queue.pop() {
    $println(f"Processing: {item}")
}
// Output: Processing: 1, Processing: 2, Processing: 3
```

### Iterator Pattern with `while let`

```vex
let! iter = someCollection.iter()

while let Some(element) = iter.next() {
    process(element)
}
```

### Channel Receive with `while let`

```vex
while let Some(msg) = channel.tryRecv() {
    handleMessage(msg)
}
```

## Match Guards -- Conditional Patterns

Match guards add a boolean condition after a pattern using `if`:

```vex
let number = 15

let description = match number {
    n if n < 0 => "negative",
    n if n == 0 => "zero",
    n if n < 10 => "single digit",
    n if n % 2 == 0 => "even",
    n => "odd",
}
// description = "odd"
```

### Guards with Enum Patterns

```vex
fn processResult(res: Result<i32, string>): string {
    return match res {
        Ok(v) if v > 100 => "large success",
        Ok(v) if v > 0 => "small success",
        Ok(v) => "zero or negative",
        Err(e) if e.startsWith("NET_") => f"Network error: {e}",
        Err(e) => f"Other error: {e}",
    }
}
```

### Guards with Destructured Patterns

```vex
struct Person {
    public:
    name: string,
    age: i32,
}

fn canDrink(person: Person): bool {
    return match person {
        Person { age, .. } if age >= 21 => true,
        _ => false,
    }
}
```

### Guard Limitations

Guards cannot use `|` (or-patterns) on the left side:

```vex
// ERROR: or-pattern with guard is ambiguous
// match x {
//     Some(n) | None if n > 0 => ...  // What does 'n' refer to for None?
// }

// CORRECT: separate arms
match x {
    Some(n) if n > 0 => ...,
    None => ...,
    Some(n) => ...,
}
```

## Or-Patterns -- Multiple Patterns, One Arm

Use `|` to match multiple patterns with the same handler:

```vex
let x = 2

let kind = match x {
    1 | 2 | 3 => "small",
    4 | 5 | 6 => "medium",
    _ => "large",
}
```

### Or-Patterns with Enums

```vex
fn isClientError(res: Result<i32, HttpError>): bool {
    return match res {
        Err(BadRequest) | Err(Unauthorized) | Err(Forbidden) | Err(NotFound) => true,
        _ => false,
    }
}
```

### Or-Patterns with Nested Patterns

```vex
enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
    Triangle(f64, f64, f64),
}

fn area(shape: Shape): f64 {
    return match shape {
        Circle(r) | Rectangle(r, r) => 3.14159 * r * r,  // Circle or Square
        Rectangle(w, h) => w * h,
        Triangle(a, b, c) => {
            let s = (a + b + c) / 2.0
            return (s * (s - a) * (s - b) * (s - c)).sqrt()
        }
    }
}
```

## Rest Patterns -- Ignoring Remaining Fields

The `..` pattern ignores remaining fields or elements:

### In Struct Patterns

```vex
struct Config {
    public:
    host: string,
    port: i32,
    timeout: i32,
    retries: i32,
    verbose: bool,
}

let cfg = Config.new("localhost", 8080, 5000, 3, true)

// Only extract what you need
let Config { host, port, .. } = cfg
// host = "localhost", port = 8080, rest is ignored
```

### In Tuple Patterns

```vex
let triple = (1, 2, 3)

let (first, ..) = triple        // first = 1
let (first, .., last) = triple  // first = 1, last = 3
```

### In Array Patterns

```vex
let numbers = [10, 20, 30, 40, 50]

let [head, ..] = numbers          // head = 10
let [first, .., last] = numbers   // first = 10, last = 50
let [a, b, ..] = numbers          // a = 10, b = 20

match numbers {
    [first, second, ..] => $println(f"First two: {first}, {second}"),
    [] => $println("Empty array"),
}
```

## Destructuring in `let` Bindings

Beyond `match`, patterns work directly in `let` statements:

### Struct Destructuring

```vex
struct Point {
    public:
    x: f64,
    y: f64,
}

let p = Point.new(3.0, 4.0)

// Destructure into individual variables
let Point { x, y } = p
// x = 3.0, y = 4.0

// Rename fields during destructuring
let Point { x: px, y: py } = p
// px = 3.0, py = 4.0
```

### Tuple Destructuring

```vex
let pair = (42, "hello")
let (num, text) = pair
// num = 42, text = "hello"
```

### Array Destructuring

```vex
let rgb = [255u8, 128u8, 64u8]
let [r, g, b] = rgb
// r = 255, g = 128, b = 64
```

### Enum Destructuring

```vex
let result: Result<i32, string> = Ok(99)

let Ok(value) = result else {
    $panic("Expected Ok but got Err")
}
// value = 99

// This only works when you KNOW the variant -- use match when uncertain
```

## `let`-`else` -- Panic on Pattern Mismatch

`let`-`else` provides a way to handle the "else" case when destructuring:

```vex
let opt: Option<i32> = compute()

let Some(value) = opt else {
    return 0  // early return if None
}
// value is available here, guaranteed Some
```

## Pattern Matching on References

When matching through references, Vex automatically dereferences:

```vex
fn describe(opt: &Option<i32>): string {
    return match opt {
        Some(v) => f"Value: {v}",  // v is &i32, auto-derefed
        None => "Nothing",
    }
}
```

## Best Practices

1. Use `if let` when you only care about one pattern and want to ignore all others.
2. Use `while let` for consuming iterators or processing queues until exhaustion.
3. Use guards (`if` in match arm) instead of complex nested matches.
4. Use `|` (or-patterns) to avoid code duplication when multiple patterns share the same handler.
5. Use `..` (rest pattern) to extract only the fields you need from large structs or tuples.
6. Prefer `let` destructuring for fixed-shape data (tuples, known struct fields).
7. Use `match` when you need exhaustiveness checking -- the compiler ensures all cases are covered.
8. Avoid `let`-`else` with complex patterns; use `match` for clarity when multiple outcomes are possible.

## Related Pages

- [Pattern Matching](/guide/types/pattern-matching) -- basic patterns
- [Enums](/guide/types/enums) -- enum variant patterns
- [Structs](/guide/types/structs) -- struct destructuring
