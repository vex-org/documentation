# Automatic Lifetime Management

Unlike Rust, Vex does not expose explicit lifetime annotations in ordinary source code. The compiler performs lifetime and borrow analysis internally.

::: tip Key Difference from Rust
In Rust, you write: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str`

In Vex, you simply write: `fn longest(x: &string, y: &string): &string`

The current compiler resolves those relationships automatically for the supported borrow-checking surface.
:::

## How It Works

The current implementation includes:

- an NLL borrow checker pipeline
- a simplified Polonius-style facts and region solver
- return-reference and reborrow tracking
- conservative suspension-point checking for async and coroutine-style control flow

At a high level, the compiler tracks:

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
// is tied to the borrowed inputs
```

::: tip Verified Surface
The NLL suite in `crates/vex-hir/src/borrow_check/nll/tests` covers returns, reborrows, moves, captures, temporaries, regions, go/defer behavior, and many source-level regressions.
:::

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
print(f"{a.len()}, {b.len()}")

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

The precise statement here is: the current checker already rejects several classes of unsafe reference capture across detached concurrency boundaries. It is better to document this as enforced `go {}` capture safety than as a blanket theorem about every possible concurrency pattern in the language runtime.

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
print(name)  // OK: user still valid

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

| Aspect               | Rust                     | Vex                                   |
| -------------------- | ------------------------ | ------------------------------------- |
| Lifetime annotations | Required when ambiguous  | Never required                        |
| `'a` syntax          | Yes                      | No                                    |
| Borrow checking      | Compile time             | Compile time                          |
| User-facing style    | Explicit lifetime syntax | Automatic lifetime syntax             |
| Current async stance | Mature lifetime surface  | Conservative borrow-across-await rule |

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

## Current boundary conditions

Two constraints matter when describing the current level accurately:

1. Borrows across `await` are still checked with an explicit conservative rule: stack-local borrows may not remain live across a suspension point.
2. The broader ownership and VUMM story is still being hardened in parts of the system outside the core NLL solver.

That means Vex can already document a real automatic lifetime system, but it should avoid claiming that every memory-safety and ownership problem in the whole language is fully closed.

## Best Practices

1. **Return owned data when in doubt** - Simpler and avoids lifetime issues
2. **Use references for read-only access** - Efficient, no copying
3. **Use `&T!` for mutable operations** - Clear intent
4. **Use async and detached concurrency with the documented rules in mind** - especially around borrows that might cross `await` or `go {}` boundaries

## Next Steps

- [VUMM Memory Model](/guide/memory/vumm) - Automatic memory management
- [Ownership](/guide/memory/ownership) - Value ownership model
- [Borrowing](/guide/memory/borrowing) - Reference borrowing details
