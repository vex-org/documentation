# Automatic Lifetime Management

Unlike Rust, Vex does **NOT** require explicit lifetime annotations. The compiler automatically manages reference lifetimes through static analysis.

::: tip Key Difference from Rust
In Rust, you write: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str`

In Vex, you simply write: `fn longest(x: &string, y: &string): &string`

The Vex compiler figures out the relationships automatically!
:::

## How It Works

Vex's borrow checker performs sophisticated static analysis to track:

1. **Reference Origins** - Where each reference comes from
2. **Validity Ranges** - How long each reference is valid
3. **Conflicts** - When mutable and immutable borrows overlap

```vex
fn longest(x: &string, y: &string): &string {
    if x.len() > y.len() {
        return x
    }
    return y
}

// The compiler understands that the returned reference
// can only be used while BOTH x and y are valid
```

## Borrowing Rules

Vex enforces safety rules through static analysis, without explicit annotations:

### Rule 1: One Mutable OR Multiple Immutable

```vex
let! data = Vec<i32>.new()
data.push(1)
data.push(2)

// Multiple immutable borrows - OK
let a = &data
let b = &data
println(f"{a.len()}, {b.len()}")

// Mutable borrow - OK (immutable borrows no longer in use)
let c = &data!
c.push(3)

// ❌ ERROR: Cannot have mutable and immutable at same time
let d = &data
let e = &data!  // Error: cannot borrow mutably while immutably borrowed
```

### Rule 2: References Cannot Outlive Data

```vex
fn dangling(): &i32 {
    let x = 42
    return &x  // ❌ ERROR: x will be dropped, reference invalid
}

// ✅ Correct: Return owned data
fn not_dangling(): i32 {
    let x = 42
    return x
}
```

### Rule 3: No Data Races

```vex
let! counter = 10

// These would execute concurrently - compiler prevents race
go {
    // counter = counter + 1  // ❌ ERROR: data race possible
}
```

## Common Patterns

### Returning References from Functions

```vex
struct User {
    name: string,
    email: string
}

// Return reference to field - compiler tracks this
fn (self: &User) get_name(): &string {
    return &self.name
}

// Usage
let user = User { name: "Alice", email: "alice@example.com" }
let name = user.get_name()
println(name)  // OK: user still valid

// Error case - would be caught at compile time
fn bad_example(): &string {
    let user = User { name: "Bob", email: "bob@example.com" }
    return user.get_name()  // ❌ ERROR: user dropped, reference invalid
}
```

### Structs Holding References

```vex
// Struct can hold references
struct Parser {
    input: &string,
    position: usize
}

fn Parser.new(input: &string): Parser {
    return Parser { input, position: 0 }
}

fn (self: &Parser!) advance() {
    self.position = self.position + 1
}

// Usage
let source = "let x = 42"
let! parser = Parser.new(&source)
parser.advance()
// parser valid only while source is valid - compiler enforces this
```

## Comparison: Vex vs Rust

| Aspect | Rust | Vex |
|--------|------|-----|
| Lifetime annotations | Required when ambiguous | Never required |
| `'a` syntax | Yes | No |
| Borrow checking | Compile time | Compile time |
| Safety guarantees | Same | Same |

### Equivalent Code

**Rust:**
```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

struct ImportantExcerpt<'a> {
    part: &'a str,
}
```

**Vex:**
```vex
fn longest(x: &string, y: &string): &string {
    if x.len() > y.len() { x } else { y }
}

struct ImportantExcerpt {
    part: &string
}

fn (self: &ImportantExcerpt) level(): i32 {
    return 3
}
```

## Best Practices

1. **Return owned data when in doubt** - Simpler and avoids lifetime issues
2. **Use references for read-only access** - Efficient, no copying
3. **Use `&T!` for mutable operations** - Clear intent
4. **Trust the compiler** - If it compiles, references are safe

## Next Steps

- [VUMM Memory Model](/guide/memory/vumm) - Automatic memory management
- [Ownership](/guide/memory/ownership) - Value ownership model
- [Borrowing](/guide/memory/borrowing) - Reference borrowing details
