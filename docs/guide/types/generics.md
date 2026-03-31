# Generics

Generics let one function, struct, or contract work across many concrete types. In Vex, generic code is monomorphized, so the generated code is specialized per concrete use.

## Generic functions

The most common pattern is a reusable function with one or more type parameters:

```vex
fn identity<T>(x: T): T {
    return x;
}

fn pair_first<A, B>(a: A, b: B): A {
    return a;
}
```

You can call generic functions with inference:

```vex
let a = identity(42);
let b = identity("hello");
```

Or with explicit type arguments when clarity matters:

```vex
let first = pair_first<i32, i64>(10, 20);
```

## Generic structs

```vex
struct Container<T> {
    public:
    value: T,
}

struct Pair<T, U> {
    public:
    left: T,
    right: U,
}
```

This is the standard way to build reusable collections, wrappers, and data-model helpers.

## Generic methods

Generic types use normal receiver syntax for methods:

```vex
struct Wrapper<T> {
    public:
    value: T,
}

fn (self: &Wrapper<T>) get(): &T {
    return &self.value;
}

fn (self: &Wrapper<T>!) set(new_value: T) {
    self.value = new_value;
}
```

## Contract bounds

Bounds let you say what operations a type parameter must support.

```vex
contract Stringify {
    toString(): string;
}

fn print_item<T: Stringify>(item: T) {
    let s = item.toString();
    $println(s);
}
```

Use bounds when a function depends on behavior, not on one exact type.

## Default type parameters

Contracts can provide defaults for type parameters. A common pattern is `Self`:

```vex
contract Add<Rhs = Self> {
    op+(other: Rhs): Self;
}
```

That lets one contract cover both `Vector + Vector` and specialized cases like `Vector + i32`.

## Associated types

Vex also supports associated types on contracts:

```vex
contract Iterator {
    type Item;
    next(): Option<Self.Item>;
}

struct Counter: $Drop {
    type Item = i32;
    count: i32,
}

fn (self: &Counter!) next(): Option<i32> {
    self.count = self.count + 1;
    return Some(self.count);
}
```

Associated types help keep APIs readable when one logical output type belongs to the contract itself.

## Const generics

Use const generics when part of the type is a compile-time value:

```vex
struct Matrix<T, const N: usize, const M: usize> {
    public:
}

fn get_size<const SIZE: usize>(): i32 {
    return 42;
}
```

This is useful for fixed-size math structures, static buffers, and shape-encoded APIs.

## Practical guidance

- Keep type parameter lists short and purposeful.
- Add bounds only where operations actually require them.
- Prefer inference for callers, explicit type arguments for docs and tricky code.
- Use const generics when the size or shape is part of correctness.

## See also

- [Contracts](./contracts)
- [Structs](./structs)
- [Enums](./enums)
