# Borrowing

Borrowing lets code reference data without taking ownership. In the current compiler, this is enforced by a real NLL borrow checker rather than being only an aspirational language rule.

::: tip Current Status
The borrow checker and NLL pipeline are implemented in `crates/vex-hir/src/borrow_check/nll/` and are covered by a large targeted test suite. A recent targeted run of `cargo test -p vex-hir borrow_check::nll` passed with 288 tests and 1 ignored parser-related test.
:::

## Reference Types

### Immutable References (`&T`)

```vex
let data = [1, 2, 3];
let reference = &data;

// Can read through reference
print(reference.len());

// Cannot modify
// reference.push(4);  // ❌ ERROR: cannot mutate through immutable reference
```

### Mutable References (`&T!`)

```vex
let! data = Vec.new<i32>();
data.push(1);
data.push(2);

let reference = &data!;

// Can read and modify
reference.push(3);
print(data.len());  // 3
```

## Borrowing Rules

### Rule 1: One Mutable OR Many Immutable

At any point, you can have either:

- **One** mutable reference (`&T!`), OR
- **Any number** of immutable references (`&T`)

```vex
let! data = Vec.new<i32>();
data.push(1);

// ✅ OK: Multiple immutable references
let r1 = &data;
let r2 = &data;
print(r1.len());

// ✅ OK: One mutable reference (after immutable refs are done)
let r3 = &data!;
r3.push(2);
```

### Rule 2: References Must Be Valid

References cannot outlive the data they point to. The Vex compiler tracks this automatically without requiring lifetime annotations.

```vex
// ❌ ERROR: Dangling reference
fn bad(): &i32 {
    let x = 42;
    return &x;  // ERROR: x is dropped when function returns
}

// ✅ OK: Return owned data
fn good(): i32 {
    let x = 42;
    return x;
}
```

## Non-Lexical Lifetimes (NLL)

Vex uses NLL-style reasoning: borrows end at their last relevant use rather than always extending to the textual end of the scope.

```vex
let! data = Vec.new<i32>();
data.push(1);

let r = &data;
print(r.len());   // Last use of r — borrow ends here

let r2 = &data!;  // ✅ OK: no conflict because r is no longer used
r2.push(2);
```

This behavior is backed by both unit tests and source-file harness tests such as the `nll_borrow_ends_at_last_use` regression.

## Partial Moves

You can move individual fields out of a struct without invalidating the entire struct:

```vex
struct Pair {
    public:
    a: string,
    b: string,
}

let p = Pair { a: "hello", b: "world" };
let x = p.a;     // Move only p.a
print(p.b);      // ✅ OK: p.b is still valid
// print(p.a);   // ❌ ERROR: p.a has been moved
```

::: tip
Copy types (like `i32`, `bool`, `f64`) are never moved — they're copied. Partial moves only apply to non-Copy fields.
:::

## Field-Level Borrowing

The borrow checker tracks borrows at the field level, allowing disjoint field access:

```vex
struct Point {
    public:
    x: i32,
    y: i32,
}

let! p = Point { x: 1, y: 2 };
let rx = &p.x;   // Borrow p.x
p.y = 10;        // ✅ OK: p.y is disjoint from p.x
print(rx);

// p.x = 5;      // ❌ ERROR: p.x is currently borrowed
```

## Cross-Function Lifetime

When a function returns a reference (`&T`), the compiler tracks that the returned reference is derived from an input borrow instead of treating it as a fresh owned value.

```vex
struct Data {
    public:
    value: i32,
}

fn get_value(d: &Data): &i32 {
    return &d.value;
}

let d = Data { value: 42 };
let r = get_value(&d);  // r borrows from d
print(r);                // ✅ OK: d is still alive
```

::: warning
No explicit lifetime annotations are required in source syntax. The compiler currently applies automatic lifetime reasoning and conservative elision-style rules for common cases:

1. If there's one `&T` parameter → return borrows from it
2. If there's a `&self` receiver → return borrows from self
3. Multiple `&T` parameters → return borrows from all (conservative)
   :::

The important point is that this is not only a design goal: return-reference cases are part of the current NLL test matrix.

## Method Receivers (Go-style)

```vex
struct MyStruct {
    public:
    value: i32,
}

// Immutable borrow of self
fn (self: &MyStruct) get_value(): i32 {
    return self.value;
}

// Mutable borrow of self
fn (self: &MyStruct!) set_value(value: i32) {
    self.value = value;
}
```

## Reference Patterns

### Function Parameters

```vex
// Take ownership
fn consume(data: Vec<i32>) {
    // data is moved in, dropped when function ends
}

// Borrow immutably
fn inspect(data: &Vec<i32>) {
    // Can read, cannot modify, caller keeps ownership
}

// Borrow mutably
fn modify(data: &Vec<i32>!) {
    // Can read and modify, caller keeps ownership
}
```

## Concurrency boundary

Borrowing rules become stricter at detached concurrency boundaries.

In particular, references are not allowed to escape into `go {}` blocks when that would create a dangling reference or a race-prone capture.

```vex
let! x: i32 = 42;
let r = &x!;

go {
    $println("{}", r);  // rejected by the current borrow checker
};
```

This is already covered by dedicated NLL tests for go-block capture safety.

## Best Practices

1. **Prefer borrowing over cloning** — use `&T` to pass large structures
2. **Use the smallest scope for mutable borrows** — NLL helps, but clarity is king
3. **Prefer immutable when possible** — default to `&T`, only use `&T!` for mutation
4. **Treat borrow-check success as local evidence** — the borrow checker is real and substantial, but broader ownership and runtime hardening work still exists elsewhere in the project

## Next Steps

- [Automatic Lifetimes](/guide/memory/lifetimes) — How Vex tracks references
- [VUMM Memory Model](/guide/memory/vumm) — Automatic memory strategy
- [Ownership](/guide/memory/ownership) — Value ownership model
