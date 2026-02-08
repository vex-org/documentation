# Ownership Model

Vex's ownership system ensures memory safety without garbage collection. Every value has a single owner, and when the owner goes out of scope, the value is automatically cleaned up.

## Core Principles

### 1. Every Value Has One Owner

```vex
let s = "hello"    // s owns the string
let t = s          // Ownership moves to t
// println(s)      // ERROR: s no longer owns the string
println(t)         // OK: t is the owner
```

### 2. Ownership Can Be Transferred (Moved)

```vex
fn take_ownership(s: string) {
    println(s)
}  // s is dropped here

let my_string = "hello"
take_ownership(my_string)      // Ownership moved to function
// println(my_string)          // ERROR: my_string no longer valid
```

### 3. Values Are Dropped When Owner Goes Out of Scope

```vex
fn example() {
    let s = "hello"
    // ... use s ...
}  // s goes out of scope, memory is freed
```

## Move Semantics

By default, assignment and function calls **move** ownership:

```vex
// Move on assignment
let a = Vec<i32>.new()
let b = a              // a is moved to b
// a.push(1)           // ERROR: use of moved value

// Move on function call
fn consume(v: [i32]) {
    // v is owned here
}

let data = [1, 2, 3]
consume(data)          // data is moved
// data.len()          // ERROR: use of moved value
```

### Copy Types

Simple types that implement `Copy` are copied instead of moved:

```vex
let x: i32 = 5
let y = x          // x is copied, not moved
println(x)         // OK: x is still valid

// Copy types include:
// - All integer types (i8, i16, i32, i64, u8, u16, u32, u64, etc.)
// - All floating point types (f32, f64)
// - bool
// - char
// - Tuples of Copy types
// - Fixed-size arrays of Copy types
```

### Clone

Non-Copy types can be explicitly cloned:

```vex
let s1 = "hello"
let s2 = s1.clone()    // Deep copy
println(s1)            // OK: s1 is still valid
println(s2)            // OK: s2 is a separate copy
```

## Borrowing

Instead of transferring ownership, you can **borrow** a reference:

### Immutable References (`&T`)

Multiple immutable references are allowed:

```vex
fn print_length(s: &string) {
    println(f"Length: {s.len()}")
}  // s (the reference) goes out of scope, but doesn't drop the data

let my_string = "hello"
print_length(&my_string)    // Borrow immutably
print_length(&my_string)    // Can borrow again
println(my_string)          // Still valid - we never gave up ownership
```

### Mutable References (`&T!`)

Only one mutable reference at a time:

```vex
fn append_world(s: &string!) {
    s = s + ", world!"
}

let! my_string = "hello"
append_world(&my_string!)   // Borrow mutably
println(my_string)          // "hello, world!"
```

### Borrowing Rules

1. **At any time, you can have either:**
   - Any number of immutable references (`&T`)
   - OR exactly one mutable reference (`&T!`)

2. **References must always be valid**

```vex
let! data = [1, 2, 3]

// OK: Multiple immutable borrows
let r1 = &data
let r2 = &data
println(f"{r1:?} {r2:?}")

// OK: Single mutable borrow (after immutable borrows are done)
let r3 = &data!
r3.push(4)

// ERROR: Cannot have both mutable and immutable
let r4 = &data
let r5 = &data!    // ERROR: cannot borrow as mutable
println(r4)
```

## Lifetimes

Lifetimes ensure references don't outlive the data they point to:

```vex
// ERROR: Dangling reference
fn dangling(): &string {
    let s = "hello"
    &s  // ERROR: s will be dropped, reference would be invalid
}

// OK: Return owned value
fn not_dangling(): string {
    let s = "hello"
    s  // Ownership transferred to caller
}
```

### Automatic Lifetime Management

Vex automatically infers lifetimes - no explicit annotations needed:

```vex
// Vex infers that result borrows from both x and y
fn longest(x: &string, y: &string): &string {
    if x.len() > y.len() { x } else { y }
}

// Usage
let s1 = "short"
let s2 = "much longer"
let result = longest(&s1, &s2)
println(result)  // "much longer"
```

### References in Structs

```vex
struct Excerpt {
    text: &string
}

let novel = "Call me Ishmael. Some years ago..."
let first_sentence = novel.split('.').next().unwrap()
let excerpt = Excerpt { text: first_sentence }
// excerpt cannot outlive novel - compiler enforces this
```

## Smart Pointers

### Box<T> - Heap Allocation

```vex
// Allocate on heap
let boxed = Box.new(42)
println(boxed)  // 42

// Useful for recursive types
enum List {
    Cons(i32, Box<List>),
    Nil
}

let list = List.Cons(1, Box.new(List.Cons(2, Box.new(List.Nil))))
```

### VUMM (Unified Memory Model)

Vex automatically chooses the right Box strategy:

```vex
// Compiler determines optimal strategy
let data = Box.new(expensive_data)

// Internally becomes one of:
// - Unique: Single owner, zero overhead
// - SharedRc: Multiple owners, single thread
// - AtomicArc: Multiple owners, multi-thread
```

## Interior Mutability

For cases where you need mutation through immutable references:

```vex
// Cell<T> - for Copy types
let cell = Cell.new(5)
cell.set(10)           // Mutate through shared reference
let value = cell.get() // 10

// RefCell<T> - runtime borrow checking
let refcell = RefCell.new([1, 2, 3])
{
    let! r = refcell.borrow_mut()
    r.push(4)
}
let r = refcell.borrow()
println(r)  // [1, 2, 3, 4]
```

## Patterns for Ownership

### Return Ownership

```vex
fn create_data(): [i32] {
    let data = [1, 2, 3]
    data  // Ownership transferred to caller
}

let my_data = create_data()  // Caller owns the data
```

### Borrow for Reading

```vex
fn sum(data: &[i32]): i32 {
    data.iter().sum()
}

let numbers = [1, 2, 3, 4, 5]
let total = sum(&numbers)  // Borrow, don't take ownership
println(numbers)           // Still usable
```

### Mutable Borrow for Modification

```vex
fn double_all(data: &[i32]!) {
    for item in data {
        item *= 2
    }
}

let! numbers = [1, 2, 3]
double_all(&numbers!)
println(numbers)  // [2, 4, 6]
```

### Clone When Needed

```vex
fn needs_ownership(data: [i32]) {
    // ...
}

let original = [1, 2, 3]
needs_ownership(original.clone())  // Keep original
println(original)                   // Still valid
```

## Best Practices

1. **Prefer borrowing over ownership transfer** - More flexible
2. **Use immutable references by default** - More concurrent access
3. **Clone explicitly when needed** - Clear intent
4. **Keep lifetimes simple** - Let the compiler infer when possible
5. **Use smart pointers for shared ownership** - When borrowing isn't enough

## Next Steps

- [Borrowing Deep Dive](/guide/memory/borrowing) - Advanced borrowing patterns
- [Lifetimes](/guide/memory/lifetimes) - Lifetime annotations
- [VUMM](/guide/memory/vumm) - Automatic memory strategy selection
