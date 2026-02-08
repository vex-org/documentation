# Contracts

Contracts define shared behavior in Vex. They are similar to interfaces in Go or protocols in other languages, but with Vex-specific features like **required fields** and **visibility sections**.

::: tip Key Differences
- Vex uses `contract` keyword, NOT `trait`.
- Method signatures have NO `fn` prefix inside contracts.
- **Contract methods are signatures only** - NO bodies or default implementations!
- Contracts can require **fields** with specific visibility.
:::

## Defining Contracts

```vex
contract Printable {
    print();                    // No 'fn' keyword!
}

contract Describable {
    describe(): string;
    short_description(): string;
}
```

## Contract Fields

Contracts can require implementing structs to have specific fields:

```vex
contract Entity {
    // Required fields
    id: u64
    name: string
    
    // Methods
    validate(): bool;
    display(): string;
}

struct User impl Entity {
    public:
    id: u64       // Required by contract
    name: string  // Required by contract
    email: string // Additional field
}

fn (self: &User) validate(): bool {
    return self.id > 0
}
```

## Implementing Contracts

Use the `impl` keyword on the struct definition or receiver syntax:

```vex
contract Shape {
    area(): f64;
}

struct Circle impl Shape {
    radius: f64
}

fn (self: &Circle) area(): f64 {
    return 3.14159 * self.radius * self.radius
}
```

## Associated Types

Types defined within contracts:

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
    self.count = self.count + 1
    return Some(self.count)
}
```

## Operator Contracts

Vex supports operator overloading through special contracts in the prelude (e.g., `$Add`, `$Eq`, `$Ord`):

```vex
struct Point impl $Add {
    x: f64,
    y: f64
}

fn (self: &Point) op+(other: Point): Point {
    return Point {
        x: self.x + other.x,
        y: self.y + other.y
    }
}
```

## Best Practices

1. **Contracts are pure interfaces**: They define "what" a type can do, not "how".
2. **Use associated types**: For generic behavior that depends on implementing types.
3. **Prefer Prelude contracts**: Leverage built-in contracts like `$Display`, `$Index`, and `$Iterator`.

## Next Steps

- [Generics](/guide/types/generics) - Combining generics and contracts
- [Error Handling](/guide/error-handling) - Contracts for error types
- [Go-style Methods](/guide/basics/functions) - Receiver syntax details
