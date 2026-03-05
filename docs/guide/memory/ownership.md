# Ownership Model

Vex's ownership system ensures memory safety without garbage collection. Every value has a single owner, and when the owner goes out of scope, the value is automatically cleaned up.

## Core Principles

### 1. Every Value Has One Owner

```vex
let s = "hello";    // s owns the string
let t = s;          // Ownership moves to t
// print(s);        // ❌ ERROR: s no longer owns the string
print(t);           // ✅ OK: t is the owner
```

### 2. Ownership Can Be Transferred (Moved)

```vex
fn take_ownership(s: string) {
    print(s);
}  // s is dropped here

let my_string = "hello";
take_ownership(my_string);      // Ownership moved to function
// print(my_string);            // ❌ ERROR: my_string no longer valid
```

### 3. Values Are Dropped When Owner Goes Out of Scope

```vex
fn example() {
    let s = "hello";
    // ... use s ...
}  // s goes out of scope, memory is freed
```

Types implementing `$Drop` run custom cleanup code at this point.

## Move Semantics

By default, assignment and function calls **move** ownership:

```vex
// Move on assignment
let a = Vec.new<i32>();
let b = a;              // a is moved to b
// a.push(1);           // ❌ ERROR: use of moved value

// Move on function call
fn consume(v: Vec<i32>) {
    // v is owned here
}

let data = Vec.new<i32>();
consume(data);          // data is moved
// data.len();          // ❌ ERROR: use of moved value
```

### `$Copy` Types

Simple types that implement `$Copy` are copied instead of moved:

```vex
let x: i32 = 5;
let y = x;          // x is COPIED, not moved
print(x);           // ✅ OK: x is still valid

// $Copy types include:
// - All integer types (i8, i16, i32, i64, u8, u16, u32, u64, etc.)
// - All floating point types (f32, f64)
// - bool, char
// - str (borrowed string view)
// - Tuples and fixed-size arrays of $Copy types
```

### `$Clone` — Explicit Deep Copy

Non-`$Copy` types can be explicitly cloned:

```vex
let s1 = "hello";
let s2 = s1.clone();    // Deep copy
print(s1);              // ✅ OK: s1 is still valid
print(s2);              // ✅ OK: s2 is a separate copy
```

## Partial Moves

Vex supports moving individual fields out of a struct:

```vex
struct Pair {
    public:
    name: string,
    age: i32,
}

let p = Pair { name: "Alice", age: 30 };
let n = p.name;     // Move only p.name
print(p.age);       // ✅ OK: p.age (i32 — $Copy) is still valid
// print(p.name);   // ❌ ERROR: p.name has been moved
```

## Borrowing

Instead of transferring ownership, you can **borrow** a reference:

### Immutable References (`&T`)

Multiple immutable references are allowed:

```vex
fn print_length(s: &string) {
    print(s.len());
}  // s (the reference) goes out of scope, but doesn't drop the data

let my_string = "hello";
print_length(&my_string);    // Borrow immutably
print_length(&my_string);    // Can borrow again
print(my_string);            // Still valid — we never gave up ownership
```

### Mutable References (`&T!`)

Only one mutable reference at a time:

```vex
fn append_item(v: &Vec<i32>!) {
    v.push(42);
}

let! numbers = Vec.new<i32>();
append_item(&numbers!);
print(numbers.len());   // 1
```

### Borrowing Rules

1. **At any time, you can have either:**
   - Any number of immutable references (`&T`)
   - OR exactly one mutable reference (`&T!`)

2. **References must always be valid** — no dangling references

## Lifetimes

Vex automatically infers lifetimes — no explicit annotations needed:

```vex
fn longest(x: &string, y: &string): &string {
    if x.len() > y.len() {
        return x;
    }
    return y;
}

// The compiler understands that the returned reference
// borrows from both x and y automatically
let s1 = "short";
let s2 = "much longer";
let result = longest(&s1, &s2);
print(result);  // "much longer"
```

## Smart Pointers

### Box&lt;T&gt; — Heap Allocation

```vex
// Allocate on heap
let boxed = Box.new(42);
print(boxed);  // 42

// Useful for recursive types
enum List {
    Cons(i32, Box<List>),
    Nil,
}

let list = List.Cons(1, Box.new(List.Cons(2, Box.new(List.Nil))));
```

### VUMM (Unified Memory Model)

Vex automatically chooses the right `Box` strategy:

```vex
// Compiler determines optimal strategy
let data = Box.new(expensive_data);

// Internally becomes one of:
// - Unique: Single owner, zero overhead
// - SharedRc: Multiple owners, single thread
// - AtomicArc: Multiple owners, multi-thread
```

::: tip
You write `Box.new(value)` and the compiler picks the best strategy. No `Rc`, `Arc`, or `RefCell` needed — VUMM handles it all.
:::

## Best Practices

1. **Prefer borrowing over ownership transfer** — more flexible
2. **Use immutable references by default** — more concurrent access
3. **Clone explicitly when needed** — clear intent with `.clone()`
4. **Let the compiler infer lifetimes** — zero annotations required
5. **Use `Box<T>` for shared ownership** — VUMM picks the right strategy

## Next Steps

- [Borrowing Deep Dive](/guide/memory/borrowing) — Advanced borrowing patterns
- [Automatic Lifetimes](/guide/memory/lifetimes) — How Vex tracks references
- [VUMM](/guide/memory/vumm) — Automatic memory strategy selection
- [Contracts](/guide/types/contracts) — $Drop, $Copy, $Clone and operator contracts
