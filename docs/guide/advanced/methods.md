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

struct Point impl Display {
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

println("Hello".excited()) // "Hello!!!"
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
