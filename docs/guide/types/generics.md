# Generics

Generics allow you to write flexible, reusable code that works with any type. Vex's generics are monomorphized at compile time, ensuring zero runtime cost.

## Generic Functions

```vex
// Generic function with type parameter T
fn identity<T>(value: T): T {
    return value
}

fn main(): i32 {
    let x = identity(42)        // T = i32
    let y = identity("hello")   // T = string
    return 0
}
```

## Generic Structs

```vex
struct Container<T> {
    public:
    value: T,
}

struct KeyValue<K, V> {
    public:
    key: K,
    value: V,
}
```

## Generic Methods

Define methods on generic structs using receiver syntax:

```vex
struct Wrapper<T> {
    public:
    value: T,
}

// Immutable borrow receiver
fn (self: &Wrapper<T>) get_value(): &T {
    return &self.value
}

// Mutable borrow receiver
fn (self: &Wrapper<T>!) set_value(new_val: T) {
    self.value = new_val
}
```

## Contract Bounds

Constrain generic types using contracts to ensure they support specific operations:

```vex
// T must implement the $Add contract (from prelude)
fn sum_items<T: $Add>(a: T, b: T): T {
    return a + b
}

// Multiple bounds using +
fn process<T: $Display + $Clone>(item: T) {
    let copy = item.clone()
    println(copy.toString())
}
```

## Associated Types

Contracts can define associated types that implementations must provide:

```vex
contract Iterator {
    type Item;
    next()!: Option<Self.Item>;
}

struct Counter impl Iterator {
    count: i32,
    type Item = i32;
}

fn (self: &Counter!) next(): Option<i32> {
    self.count += 1
    return Some(self.count)
}
```

## Const Generics

Generic over constant values known at compile time:

```vex
struct FixedBuffer<const N: usize> {
    data: [u8; N],
}

fn FixedBuffer.new<const N: usize>(): FixedBuffer<N> {
    return FixedBuffer { data: [0; N] }
}

let buffer = FixedBuffer.new<1024>()
```

## Best Practices

1. **Use meaningful names**: `T` is standard for a single type, but `K, V` or names like `Elem` can improve clarity.
2. **Prefer contract bounds**: Explicitly state requirements for better compiler errors and type safety.
3. **Keep it simple**: Don't over-nest generics; if a signature becomes unreadable, consider using a type alias.

## Next Steps

- [Contracts](/guide/types/contracts) - Defining shared behavior
- [Structs](/guide/types/structs) - Data structure definitions
- [Enums](/guide/types/enums) - Sum types and Option/Result
