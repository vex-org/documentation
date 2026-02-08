# Structs

Structs in Vex are pure data types that group related values together. Unlike many other systems languages, Vex structs primarily contain data; behavior is defined externally using Go-style methods.

## Defining Structs

### Basic Struct

```vex
struct Point {
    x: f64,
    y: f64
}

struct User {
    id: u64,
    name: string,
    email: string,
    active: bool
}
```

### Creating Instances

```vex
let origin = Point { x: 0.0, y: 0.0 }

let user = User {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    active: true
}
```

### Field Shorthand

When variable names match field names:

```vex
fn create_user(name: string, email: string): User {
    let id = 123
    return User {
        id,        // Same as id: id
        name,
        email,
        active: true
    }
}
```

## Field Visibility (Section-Based)

Vex uses **section-based** visibility labels instead of per-field keywords:

```vex
export struct Account {
    private:
    internal_id: i64,
    
    readonly:
    balance: f64,
    
    public:
    name: string
}
```

| Label | Access Level |
|-------|--------------|
| `private:` | Module-only (Default) |
| `readonly:` | Publicly readable, Module-only writable |
| `public:` | Fully accessible |

## Go-Style Methods

Methods are defined **outside** the struct using receiver syntax:

```vex
struct Point {
    x: f64,
    y: f64
}

// Static method (Associated function)
fn Point.new(x: f64, y: f64): Point {
    return Point { x, y }
}

// Instance method (Immutable)
fn (self: &Point) length(): f64 {
    return (self.x * self.x + self.y * self.y).sqrt()
}

// Instance method (Mutable)
fn (self: &Point!) translate(dx: f64, dy: f64) {
    self.x += dx
    self.y += dy
}
```

## Struct Tags (Go-Style)

Vex uses Go-style backtick tags for metadata, such as serialization instructions:

```vex
struct User {
    id: u64        `json:"id" db:"pk"`,
    username: string `json:"username"`,
}
```

::: warning No Rust-style Attributes
Vex does **NOT** use `#[derive(...)]` or other attribute syntax. Use struct tags or implement contracts manually.
:::

## Implementing Contracts

Use the `impl` keyword to declare that a struct implements one or more contracts:

```vex
contract Display {
    toString(): string;
}

struct Point impl Display {
    x: f64,
    y: f64
}

fn (self: &Point) toString(): string {
    return f"({self.x}, {self.y})"
}
```

## Tuple Structs

Structs without named fields, useful for the "Newtype" pattern:

```vex
struct Color(u8, u8, u8)
struct UserId(u64)

let red = Color(255, 0, 0)
println(f"R: {red.0}")
```

## Best Practices

1. **Use section-based visibility**: Group relative fields under `private:`, `readonly:`, or `public:`.
2. **Prefer Go-style methods**: Keep data and logic separate for better modularity.
3. **Use Struct Tags**: For all cross-cutting concerns like JSON serialization or DB mapping.

## Next Steps

- [Enums](/guide/types/enums) - Sum types and pattern matching
- [Contracts](/guide/types/contracts) - Interface-driven development
- [Generics](/guide/types/generics) - Type-safe abstractions
