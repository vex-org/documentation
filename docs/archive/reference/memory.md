# Memory Model

Vex provides a unique hybrid memory model that combines the deterministic safety of Rust's ownership system with the ease of use found in Go, all backed by the compile-time power of VUMM.

## 1. The Stack and The Heap

Like most systems languages, memory in Vex is divided into two primary regions:

### The Stack
- **Fast**: Allocation is just moving a pointer.
- **Deterministic**: Automatically cleaned up when a function returns.
- **Fixed Size**: Values must have a known size at compile time.
- **Contents**: Functions arguments, local variables, standard structs, arrays.

```vex
fn main() {
    let x = 42;          // Stack allocated
    let p = Point{1, 2}; // Stack allocated
}
```

### The Heap
- **Dynamic**: Used for data that grows or lives beyond the current scope.
- **Slower**: Requires a specialized allocator (`mimalloc`).
- **Managed**: Vex manages heap memory automatically via RAII (Resource Acquisition Is Initialization).
- **Contents**: `Box<T>`, `Vec<T>`, `HashMap`, `String`.

```vex
fn main() {
    let b = Box.new(42); // Heap allocated int, pointer on stack
    let v = Vec.new();   // Heap buffer, pointer/len/cap on stack
}
```

---

## 2. Ownership System

Vex uses a strict ownership model to ensure memory safety without a Garbage Collector.

### The Three Rules
1.  **Each value in Vex has a variable that’s called its owner.**
2.  **There can only be one owner at a time.**
3.  **When the owner goes out of scope, the value is dropped.**

### Copy vs Move
- **Copy Types**: Primitives (`i32`, `bool`, `f64`) are cheap to copy. Assigning them copies the bits.
- **Move Types**: Complex types (`structs`, `Vec`, `Box`) transfer ownership upon assignment.

```vex
let a = 10;
let b = a; // Copy: Both 'a' and 'b' are usable (10)

let v1 = Vec.new();
let v2 = v1; // Move: Ownership transferred to 'v2'. 'v1' is now invalid.
// print(v1); // Compile Error: Use of moved value
```

---

## 3. Borrowing (References)

You can access data without taking ownership by "borrowing" it via references.

### Reference Rules
- **Immutable References (`&T`)**: You can have infinite immutable references. Read-only.
- **Mutable References (`&T!`)**: You can have exactly one mutable reference. Exclusive access.
- **Separation**: You cannot have a mutable reference while immutable references exist.

```vex
let! x = 10;
let r1 = &x;  // OK
let r2 = &x;  // OK: Multiple readers

// let m = &x!; // Error: Cannot borrow as mutable because 'x' is already borrowed as immutable
```

---

## 4. VUMM (Vex Unified Memory Model)

For heap-allocated values wrapped in `Box<T>`, Vex uses a unique system called VUMM.

Unlike Rust (`Box` vs `Rc` vs `Arc`) or C++ (`unique_ptr` vs `shared_ptr`), Vex exposes a single **`Box<T>`** type. The compiler analyzes how you use the box and statically compiles it to the most efficient representation:

1.  **Unique**: Zero overhead. Same as `unique_ptr`. Default.
2.  **Shared**: Compilation of `Box` changes to include a non-atomic refcount.
3.  **Atomic**: If the box crosses threads, it compiles to an atomic ref-counted pointer.

See the [VUMM Reference](./vumm) for low-level details.

---

## 5. Lifetimes

Lifetimes are the scope for which a reference is valid. Vex checks lifetimes at compile time to prevent:
- **Dangling Pointers**: References to data that has been freed.
- **Use After Free**: Accessing memory after it's dropped.

Currently, Vex uses an **intra-procedural** lifetime checking algorithm (Phase 4 of the Borrow Checker) which infers lifetimes automatically within functions. Explicit lifetime annotations (`'a`) are not currently required or supported in user code, as the compiler handles most cases implicitly.

```vex
fn return_ref(x: &i32) : &i32 {
    return x; // OK: Output lifetime tied to input
}

/*
fn dangling() : &i32 {
    let x = 10;
    return &x; // Error: `x` does not live long enough
}
*/
```
