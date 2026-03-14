# Contracts

Contracts define shared behavior in Vex. They are similar to interfaces in Go or protocols in other languages, but with Vex-specific features like **required fields** and **visibility sections**.

::: tip Key Differences
- Vex uses `contract` keyword, NOT `trait`.
- Current tested contract examples use normal `fn`-style signatures.
- Contract methods may be declarations or default methods depending on the contract.
- Contracts can require **fields** with specific visibility.
- Contract implementation uses **colon syntax on the type**: `struct X: Contract`.
- `impl Contract for X` syntax is **forbidden** in Vex.
:::

## Defining Contracts

```vex
contract Printable {
    fn print();
}

contract Describable {
    fn describe(): string;
    fn short_description(): string;
}
```

## Implementing Contracts

In Vex, contracts are implemented directly on the type declaration with colon syntax:

```vex
contract Shape {
    fn area(): f64;
}

struct Circle: Shape {
    radius: f64
}

fn (self: &Circle) area(): f64 {
    return 3.14159 * self.radius * self.radius;
}
```

::: warning Invalid Syntax
Rust-style `impl Contract for Type` is not part of Vex.

```vex
// ❌ Invalid in Vex
impl Shape for Circle {
    fn area(): f64 {
        return 0.0
    }
}
```

Use `struct Circle: Shape { ... }` and then define receiver methods normally.
:::

## Contract Fields

Contracts can require implementing structs to have specific fields:

```vex
contract Entity {
    // Required fields
    id: u64
    name: string

    // Methods
    fn validate(): bool;
    fn display(): string;
}

struct User: Entity {
    public:
    id: u64       // Required by contract
    name: string  // Required by contract
    email: string // Additional field
}

fn (self: &User) validate(): bool {
    return self.id > 0;
}
```

## Builtin Memory Contracts

Vex has three special contracts that control how values are managed in memory. These are prefixed with `$` and live in the prelude — no import needed.

### `$Copy` — Bitwise Copyable

Types implementing `$Copy` are copied on assignment instead of moved:

```vex
// All primitives are $Copy
let x = 42;
let y = x;     // x is COPIED, not moved
$println(x);   // ✅ Still valid

// Non-$Copy types are MOVED
let s = "hello";
let t = s;     // s is MOVED to t
// $println(s); // ❌ Error: use of moved value
```

**Builtin $Copy types**: `bool`, `i8..i128`, `u8..u128`, `f32`, `f64`, `char`, `usize`, `isize`, `str`, `ptr`

::: warning
`string` is **NOT** $Copy — it's heap-allocated and uses reference counting. Use `.clone()` for explicit deep copies.
:::

### `$Clone` — Deep Copy

Types implementing `$Clone` can be explicitly deep-copied:

```vex
let s1 = "hello";
let s2 = s1.clone();  // Deep copy
print(s1);             // ✅ Still valid
print(s2);             // ✅ Independent copy
```

When a type implements `$Clone`, the compiler automatically inserts `.clone()` calls where needed to resolve borrowing conflicts:

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

### `$Drop` — Cleanup on Scope Exit

Types implementing `$Drop` run cleanup code when they go out of scope (RAII pattern):

```vex
struct FileHandle: $Drop {
    public:
    fd: i32,
    path: string,
}

fn (self: &FileHandle) drop() {
    // Called automatically when FileHandle goes out of scope
    $print("Closing file: ");
    $println(self.path);
    // close(self.fd)
}

fn main(): i32 {
    let file = FileHandle { fd: 3, path: "/tmp/data.txt" };
    // ... use file ...
    return 0;
}  // file.drop() called automatically here
```

::: tip Drop Order
Variables are dropped in **reverse declaration order** (RAII). If you declare `a`, then `b`, then `c` — they drop as `c`, `b`, `a`.
:::

::: warning Drop and Borrows
When a struct with `$Drop` holds references, the borrow checker ensures those references remain valid until the struct is dropped. This prevents use-after-free bugs in destructors.
:::

## Operator Contracts

Vex supports operator overloading through special prelude contracts:

```vex
struct Point: $Add {
    public:
    x: f64,
    y: f64,
}

fn (self: Point) op+(other: Point): Point {
    return Point {
        x: self.x + other.x,
        y: self.y + other.y,
    };
}

// Usage
let a = Point { x: 1.0, y: 2.0 };
let b = Point { x: 3.0, y: 4.0 };
let c = a + b;  // Point { x: 4.0, y: 6.0 }
```

### Available Operator Contracts

| Contract | Operator | Method |
|----------|----------|--------|
| `$Add` | `+` | `op+(rhs: Self): Self` |
| `$Sub` | `-` | `op-(rhs: Self): Self` |
| `$Mul` | `*` | `op*(rhs: Self): Self` |
| `$Div` | `/` | `op/(rhs: Self): Self` |
| `$Mod` | `%` | `op%(rhs: Self): Self` |
| `$Eq` | `==` / `!=` | `op==(rhs: Self): bool` |
| `$Ord` | `<` / `>` / `<=` / `>=` | `op<(rhs: Self): bool` |
| `$Index` | `[]` | `op[](index: Idx): Output` |

### Display and Debug

```vex
struct Color: $Display, $Debug {
    public:
    r: u8, g: u8, b: u8,
}

fn (self: &Color) toString(): string {
    return "rgb(" + self.r.toString() + "," + self.g.toString() + "," + self.b.toString() + ")";
}

fn (self: &Color) debug(): string {
    return "Color{r:" + self.r.toString() + ",g:" + self.g.toString() + ",b:" + self.b.toString() + "}";
}
```

## Contract Inheritance

Contracts can extend other contracts:

```vex
contract Eq {
    fn eq(other: &Self): bool;
}

contract Ord: Eq {
    fn cmp(other: &Self): i32;
}
// Any type implementing Ord must also implement Eq
```

## Best Practices

1. **Contracts are pure interfaces** — they define "what" a type can do, not "how"
2. **Implement `$Drop` for resource cleanup** — file handles, network connections, locks
3. **Implement `$Clone` for deep copy support** — complex data structures
4. **Leverage `$Copy` for simple types** — primitives and small value types
5. **Use operator contracts** — make your types work with standard operators

## Next Steps

- [Generics](/guide/types/generics) — Combining generics and contracts
- [Ownership](/guide/memory/ownership) — How contracts interact with ownership
- [Borrowing](/guide/memory/borrowing) — Reference borrowing details
