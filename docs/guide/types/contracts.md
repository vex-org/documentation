# Contracts

Contracts define shared behavior in Vex. They are the language mechanism behind reusable capabilities such as display, cloning, dropping, iterators, and operator overloading.

## Core syntax

Vex uses `contract`, not `trait` or `interface`.

```vex
contract Display {
    toString(): string;
}

contract Iterator {
    type Item;
    next(): Option<Self.Item>;
}
```

Current repo examples most commonly use this signature style inside contracts: method declarations without a receiver body.

## Implementing a contract

Attach the contract to the type with colon syntax and then define normal receiver methods.

```vex
contract Display {
    toString(): string;
}

struct Point: $Drop, Display {
    public:
    x: i32,
    y: i32,
}

fn (self: &Point) toString(): string {
    return "Point(" + self.x.toString() + "," + self.y.toString() + ")";
}
```

Rust-style `impl Contract for Type` is not Vex syntax.

## Implicit Receivers and Mutability

You never explicitly declare `self: &Self` inside a contract definition. Vex is inherently instance-oriented, meaning every contract method definition automatically implies a receiver.

* `convert(val: T): U;` defines a method taking an **Immutable Reference** (`self: &Self`).
* `convert(val: T)!: U;` defines a method taking a **Mutable Reference** (`self: &Self!`). The `!` indicates state mutation.

```vex
contract Incrementable {
    // Immutable read method
    count(): i32;
    // Mutable write method (note the '!' after parameters)
    increment()!;
}
```

If you accidentally write `self: &Self` inside a contract (e.g. `convert(self: &Self)`), the compiler will emit a warning correcting this habit.

## Generic contracts and defaults

Contracts can take type parameters, including defaults such as `Self`.

```vex
contract Add<Rhs = Self> {
    op+(other: Rhs): Self;
}
```

This pattern is used in current parser and operator examples.

## Associated types

Contracts can also expose associated types.

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

## Builtin contracts

Many important contracts live in the prelude and start with `$`.

### `$Copy`

`$Copy` values copy on assignment instead of moving.

```vex
let x = 42;
let y = x;
$println(x);
```

Typical `$Copy` values include primitive numbers, `bool`, `char`, `str`, and raw pointer-like values.

### `$Clone`

`$Clone` provides explicit duplication.

```vex
struct Config: $Clone {
    public:
    name: string,
    value: i32,
}

fn (self: &Config) clone(): Config {
    return Config { name: self.name.clone(), value: self.value };
}
```

### `$Drop`

`$Drop` runs cleanup when a value leaves scope.

```vex
struct FileHandle: $Drop {
    public:
    fd: i32,
    path: string,
}

fn (self: &FileHandle) drop() {
    $println("closing " + self.path);
}
```

### `$Display` and `$Debug`

These support human-readable and debug-oriented text conversion.

```vex
struct Color: $Display, $Debug {
    public:
    r: u8,
    g: u8,
    b: u8,
}

fn (self: &Color) toString(): string {
    return "rgb(" + self.r.toString() + "," + self.g.toString() + "," + self.b.toString() + ")";
}

fn (self: &Color) debug(): string {
    return "Color{r:" + self.r.toString() + ",g:" + self.g.toString() + ",b:" + self.b.toString() + "}";
}
```

## Operator contracts

Operator behavior is expressed with contracts and `op...` methods.

```vex
contract Add {
    op+(other: Self): Self;
}

struct Vec2: Add {
    public:
    x: i32,
    y: i32,
}

fn (self: &Vec2) op+(other: Vec2): Vec2 {
    return Vec2 { x: self.x + other.x, y: self.y + other.y };
}
```

Builtin operator contracts also appear in prelude form such as `$Add<T>`, `$Index<Idx, Out>`, and related contracts.

## Guidance

- Use plain contracts for domain behavior.
- Use `$Drop`, `$Clone`, and `$Display` when you want standard language integration.
- Prefer simple method contracts first; add associated types or generic defaults when the API really needs them.
- Keep examples aligned with real syntax from the repo: `struct Type: Contract {}` plus receiver methods.

## See also

- [Generics](./generics)
- [Ownership](../memory/ownership)
- [Pattern Matching](./pattern-matching)
