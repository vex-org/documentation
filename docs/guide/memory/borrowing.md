# Borrowing

Borrowing allows you to reference data without taking ownership. This enables efficient data sharing while maintaining memory safety.

## Reference Types

### Immutable References (`&T`)

```vex
let data = [1, 2, 3]
let reference = &data

// Can read through reference
println(f"Length: {reference.len()}")
println(f"First: {reference[0]}")

// Cannot modify
// reference.push(4)  // ERROR: cannot mutate through immutable reference
```

### Mutable References (`&T!`)

```vex
let! data = [1, 2, 3]
let reference = &data!

// Can read
println(f"Length: {reference.len()}")

// Can modify
reference.push(4)
println(f"After push: {data.len()}")  // 4
```

## Borrowing Rules

### Rule 1: One Mutable OR Many Immutable

At any point, you can have either:
- **One** mutable reference (`&T!`), OR
- **Any number** of immutable references (`&T`)

```vex
let! data = [1, 2, 3]

// OK: Multiple immutable references
let r1 = &data
let r2 = &data
println(f"Sizes: {r1.len()} {r2.len()}")

// OK: One mutable reference (after immutable refs are done)
let r3 = &data!
r3.push(4)
```

### Rule 2: References Must Be Valid

References cannot outlive the data they point to. The Vex compiler tracks this automatically without requiring lifetime annotations.

```vex
// ERROR: Dangling reference
fn bad(): &i32 {
    let x = 42
    return &x  // ERROR: x is dropped when function returns
}

// OK: Return owned data
fn good(): i32 {
    let x = 42
    return x   // Transfer ownership
}
```

## Non-Lexical Lifetimes (NLL)

Vex uses NLL - borrows end at their last use, not necessarily at the end of the scope:

```vex
let! data = [1, 2, 3]

let r = &data
println(f"Length: {r.len()}") // Last use of r
// Borrow ends here

let r2 = &data! // OK: No conflict because r is no longer used
r2.push(4)
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

### Method Receivers (Go-style)

```vex
struct MyStruct {
    value: i32
}

// Immutable borrow of self
fn (self: &MyStruct) get_value(): i32 {
    return self.value
}

// Mutable borrow of self
fn (self: &MyStruct!) set_value(value: i32) {
    self.value = value
}
```

## Slices

Slices are references to contiguous sequences:

```vex
let arr = [1, 2, 3, 4, 5]

// Slice of entire array
let slice = &arr

// Slice of portion (start..end)
let middle = &arr[1..4]  // [2, 3, 4]

// Mutable slice
let! arr_mut = [1, 2, 3, 4, 5]
let slice_mut = &arr_mut![1..4]
// slice_mut[0] = 10  // ERROR: Slice mutation syntax is through methods or index
```

## Interior Mutability (VUMM)

Unlike Rust's `Cell` or `RefCell`, Vex relies on its **Unified Memory Model (VUMM)** and `Box<T>` to handle most memory patterns efficiently. High-level interior mutability is typically handled via atomics or synchronized types in the standard library.

## Best Practices

1. **Prefer borrowing over cloning**: Use `&T` to pass large structures.
2. **Use the smallest scope for mutable borrows**: Although NLL helps, keeping mutable borrows brief improves code clarity.
3. **Prefer immutable when possible**: Default to `&T` and only use `&T!` when mutation is required.

## Next Steps

- [Automatic Lifetimes](/guide/memory/lifetimes) - How Vex tracks references
- [VUMM Memory Model](/guide/memory/vumm) - Automatic memory strategy
- [Ownership](/guide/memory/ownership) - Value ownership model
