# Structs

Structs in Vex are pure data types that group related values together. Unlike many other systems languages, Vex structs primarily contain data; behavior is defined externally using Go-style methods.

## Defining Structs

### Basic Struct

```vex
struct Point {
    x: f64,
    y: f64,
}

struct User {
    id: u64,
    name: string,
    email: string,
    active: bool,
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
        id,
        name,
        email,
        active: true,
    }
}
```

## Field visibility and export

Vex separates two concerns:

- `export` controls whether the struct itself is visible outside the module
- `private:`, `readonly:`, and `public:` control field visibility inside the struct

Section-based field visibility is the current model:

```vex
export struct Account {
    private:
    internal_id: i64,

    readonly:
    balance: f64,

    public:
    name: string,
}
```

| Label       | Access Level                            |
| ----------- | --------------------------------------- |
| `private:`  | Module-only (Default)                   |
| `readonly:` | Publicly readable, Module-only writable |
| `public:`   | Fully accessible                        |

If no section label is present, fields default to `private:`.

## Go-Style Methods

Methods are defined outside the struct using receiver syntax:

```vex
struct Point {
    x: f64,
    y: f64,
}

// Associated function
fn Point.new(x: f64, y: f64): Point {
    return Point { x, y }
}

fn (self: &Point) length(): f64 {
    return (self.x * self.x + self.y * self.y).sqrt()
}

fn (self: &Point!) translate(dx: f64, dy: f64) {
    self.x += dx
    self.y += dy
}
```

If a method should be available across modules, export the function itself:

```vex
export fn (self: &Point) length(): f64 {
    return (self.x * self.x + self.y * self.y).sqrt()
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

## Contracts on structs

Attach contracts directly on the struct declaration with colon syntax.

```vex
contract Area {
    area(): f64;
}

struct Rect: Area {
    public:
    width: f64,
    height: f64,
}

fn (self: &Rect) area(): f64 {
    return self.width * self.height
}
```

Builtin contracts from the prelude commonly start with `$`, such as `$Display`, `$Clone`, and `$Drop`.

## Tuple Structs

Structs without named fields, useful for the "Newtype" pattern:

```vex
struct Color(u8, u8, u8)
struct UserId(u64)

let red = Color(255, 0, 0)
```

## Guidance

- Use `export struct` only when the type itself is part of the module surface.
- Use visibility sections to group fields intentionally instead of repeating per-field modifiers.
- Keep structs data-focused and put behavior in receiver methods.
- Use tags when tooling or serializers need field metadata.

## Next Steps

- [Enums](/guide/types/enums) - Sum types and pattern matching
- [Contracts](/guide/types/contracts) - Interface-driven development
- [Generics](/guide/types/generics) - Type-safe abstractions
