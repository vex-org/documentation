# Methods and Constructors

Vex supports instance methods, static methods (constructors), and method chaining with a clean, Go-inspired syntax.

## Method Syntax Overview

Vex has two primary method levels:

1. **Instance methods**: `fn (self: &T) method()` - Associated with an instance.
2. **Static methods**: `fn T.method()` - Associated with the type name.

## Instance Methods

Instance methods take `self` as the first parameter with an explicit type:

```vex
struct Counter {
    value: i32,
}

// Immutable receiver: read-only access
fn (self: &Counter) get(): i32 {
    return self.value
}

// Mutable receiver: allows modification
fn (self: &Counter!) increment() {
    self.value = self.value + 1
}

// By-value receiver: takes ownership
fn (self: Counter) into_value(): i32 {
    return self.value
}
```

## Static Methods (Constructors)

Static methods use `Type.method` syntax and are commonly used as constructors:

```vex
struct Point {
    x: f64,
    y: f64,
}

// Constructor: Point.new()
fn Point.new(x: f64, y: f64): Point {
    return Point { x, y }
}

// Specific constructor: Point.origin()
fn Point.origin(): Point {
    return Point { x: 0.0, y: 0.0 }
}
```

## Method and Constructor Overloading

Vex supports overloading for:

- **Constructors**: `fn Type(...)`
- **Static methods**: `fn Type.method(...)`
- **Instance methods**: `fn (self: &Type) method(...)`

```vex
struct Point {
    x: f64,
    y: f64,
}

fn Point(): Point {
    return Point { x: 0.0, y: 0.0 }
}

fn Point(v: f64): Point {
    return Point { x: v, y: v }
}

fn Point.new(x: f64, y: f64): Point {
    return Point { x, y }
}

fn (self: &Point) distance(): f64 {
    return (self.x * self.x + self.y * self.y).sqrt()
}

fn (self: &Point) distance(other: Point): f64 {
    let dx = self.x - other.x
    let dy = self.y - other.y
    return (dx * dx + dy * dy).sqrt()
}
```

### Practical Note

The core constructor/static/instance overload paths are covered by regression tests and are ready for normal use. However, the broader space of overload interactions with **generic methods**, **variadic calls**, and **default parameters** is still not exhaustively covered by dedicated overload-focused tests.

### Tested Scenarios

| Scenario | Status | Notes |
|----------|--------|-------|
| Constructor overloading | ✅ | Covered by `constructor_001.vx` |
| Static method overloading | ✅ | Covered by `static_001.vx` and `static_types_001.vx` |
| Instance method overloading | ✅ | Covered by `instance_001.vx` |
| Static vs instance same-name split | ✅ | Covered by `static_instance_name_001.vx` |
| Generic/default/variadic method interactions | ⚠️ Partial | Normal overload paths are solid, but exhaustive cross-product coverage is still incomplete |

## Generic Methods

Methods can be generic over one or more types:

```vex
struct Box<T> {
    value: T,
}

fn Box.new<T>(val: T): Box<T> {
    return Box { value: val }
}

fn (self: &Box<T>) get(): &T {
    return &self.value
}
```

## Method Chaining (Fluent API)

Methods can be chained when they return `Self` or the receiver type:

```vex
struct Builder {
    count: i32,
}

fn (self: Builder) add(n: i32): Builder {
    return Builder { count: self.count + n }
}

let result = Builder { count: 0 }.add(1).add(10).count // 11
```

## Methods with Contracts

Methods are the primary way to implement contract behavior:

```vex
contract Display {
    toString(): string;
}

struct Point: Display {
    x: f64, y: f64
}

fn (self: &Point) toString(): string {
    return f"({self.x}, {self.y})"
}
```

## Extension Methods

Vex allows adding methods to existing types, including primitives:

```vex
// Extend string with a custom method
fn (self: &string) excited(): string {
    return self + "!!!"
}

$println("Hello".excited()) // "Hello!!!"
```

## Best Practices

1. **Use `Type.new` for primary constructors**: Follow the standard library convention.
2. **Prefer references (`&self`)**: Unless you explicitly need to consume the object.
3. **Use `&self!` for mutation**: Make it clear when a method modifies internal state.
4. **Separate logic from data**: Group methods separately from the struct definition for better modularity.

## Next Steps

- [Structs](/guide/types/structs) - Defining data structures
- [Contracts](/guide/types/contracts) - Defining shared behavior
- [Generics](/guide/types/generics) - Generic methods and types
