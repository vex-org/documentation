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

// No ERROR: Cannot have mutable and immutable at same time
let d = &data
let e = &data!  // Error: cannot borrow mutably while immutably borrowed
```

### Rule 2: References Cannot Outlive Data

```vex
fn dangling(): &i32 {
    let x = 42
    return &x  // No ERROR: x will be dropped, reference invalid
}

// Yes Correct: Return owned data
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
    // counter = counter + 1  // No ERROR: data race possible
}
```

The precise statement here is: the current checker already rejects several classes of unsafe reference capture across detached concurrency boundaries. It is better to document this as enforced `go {}` capture safety than as a blanket theorem about every possible concurrency pattern in the language runtime.

## Common Patterns

### Borrowed Results from Temporary Owners

A call may borrow an unnamed source value and return a view into it. When
that view is consumed directly by another call, the source owner stays alive
until the consuming expression finishes:

```vex
// makeOwner() returns an owned value; view() borrows it; read() returns i32.
let value = makeOwner().view().read();
```

This applies to ordinary user-defined types, free functions and method chains;
it is not a special rule for strings or collections. Scalar field and pointer
dereference reads through a safe reference are evaluated before cleanup.
Owners sharing a cleanup boundary are destroyed in reverse construction order.
A scalar-returning call without a borrowed-result chain still cleans its own
temporary operands immediately after that call.

The chain does **not** extend an owner across a binding, a block boundary, a
return, a capture or a suspension. To keep a view, keep its owner explicitly:

```vex
let owner = makeOwner();
let view = owner.view();
let value = view.read();

// Invalid when the view borrows the temporary owner's storage:
// let dangling = makeOwner().view();
```

This rule concerns borrowing existing source storage. Ownership-producing
argument conversions have separate temporary/escape checks; a constructor
conversion does not automatically make its borrowed result escapable.

### Temporaries Created by Argument Conversions

A conversion that only borrows existing storage does not create a new owner.
For example, `&string` (including nested references) can provide a `str` view
of the original string's bytes. The view retains that owner's lifetime; it
cannot outlive the string. This conversion is not an implicit clone.

An argument conversion may create a new owner before borrowing it for the
callee. For example, passing a `str` to an `&string` parameter constructs
temporary owned storage. The source `str` and that new owner have different
lifetimes, even when the source is a string literal.

The converted owner is registered before later arguments are evaluated.
Normal completion and early `return`, `break` or `continue` use the same
cleanup mechanism. Variadic arguments follow the same sealed conversion and
ownership rules as ordinary arguments.

A callee cannot export this temporary's reference through an output field
merely because its return type is `None`:

```vex
struct View { source: &string }
fn store(output: &View!, input: &string) { output.source = input; }

fn invalid(initial: &string, text: str): &string {
    let! output = View { source: initial };
    store(&output!, text); // A separate converted owner lives for this call.
    return output.source; // Rejected: that owner has already expired.
}
```

Keep an owned value explicitly when the stored view must remain usable.
Replacing an expired reference field with a valid reference before reading it
is allowed; taking a direct field's address to overwrite it does not read its
old reference value.

Typed variadic calls follow the same rule. Every element in `...&T` contributes
its own reference origins to the pack; later arguments cannot escape the
check. An empty pack contributes no element references. The pack owns its
element storage, but does not become the owner of external values referenced
by those elements. Returning an element's reference can therefore be valid
when its external owner remains alive; returning a borrow of the pack's own
element storage is not.

Native calls can borrow an owning pack through the shared Span API (`get`,
`getUnchecked`, `slice`, `splitAt`). This does not convert the pack into an
owned Span value or transfer its cleanup responsibility. A nested view must
remain within the pack's lifetime. The descriptor view requires identical
element types and does not admit an exclusive descriptor borrow.

::: warning Current validation boundary
Ordinary direct, method, static, generic and function-value output writes,
plus typed variadic direct/method/static/generic writes, have focused
regressions. This is not whole-language lifetime qualification.
Constructor-returned converted views retain their conservative escape
restriction until the full lifetime model is implemented. Native owning-pack
views have O0/O3 ownership, drop and escape regressions. CTFE uses the same
shared pack-view recipe for const-capable source methods: it materializes a
descriptor pointing into the original pack instead of copying the elements.
Its pointers preserve allocation identity and cannot outlive the pack frame.
This does not implicitly mark ordinary Span methods as `const`; the existing
comptime callable-admission rules still apply.
:::

### Named Values and Field Borrows

The dot in `State.Ready` selects an enum value; it does not borrow a field from
a runtime object named `State`. Passing that value to a reference parameter
materializes temporary storage for the value. An explicit `&State.Ready` can
also be used within its enclosing lifetime, but cannot be returned as a
reference to permanent storage merely because the variant has a name.

By contrast, `&object.field` borrows the object's existing field storage. A
projection such as `&makeOwner().field` retains the complete temporary owner,
not just an independently copied field. These rules follow resolved values
and storage projections, not type names or prelude privileges.

### Reading a Value Through a Reference

A contextual `&T` to `T` load does not transfer ownership from the referent.
It can copy a `Copy` value, including a user-defined type with the appropriate
contract. For a non-Copy owner, retain a reference or explicitly clone it when
the type supports cloning. The same rule applies to pattern bindings, fields,
indexed elements, function/method results, and block/branch results.

```vex
enum Message { Text(string), Empty }

fn copyText(message: &Message): string {
    return match message {
        Message.Text(text) => text.clone(),
        Message.Empty => "",
    };
}
```

Here `text` borrows the payload. Returning `text` directly as an owned `string`
is rejected; returning its explicit clone leaves the original message intact.
Matching an owned `Message` by value can instead transfer its payload normally.
Serde's dynamic `asString()` getters follow the explicit-clone contract: their
owned results remain valid after the source value is destroyed. Read-only
views should be used when an independent owned result is unnecessary.

### Returning References from Functions

A getter returning a reference reborrows existing storage; it does not move
the referenced value. For example, `&*reference` remains a reborrow even when
the pointee is a non-Copy generic type. Writing through a mutable getter's
result uses that result's capability. Two separate live getter results do not
become interchangeable permissions: a conflicting write is still rejected.

Shared references can retain the lifetime of their mutable parent without
gaining mutable access. These rules apply structurally to user-defined types
and adapters, not just to prelude or standard-library getters.

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
    return user.get_name()  // No ERROR: user dropped, reference invalid
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

```vex
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
