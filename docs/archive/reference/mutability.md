# Mutability and Borrowing Rules

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

This document details the exact rules enforced by the Vex Borrow Checker (Phases 1-4).

---

## 1. Variable Mutability (`let` vs `let!`)

Mutability is opt-in.

```vex
let x = 10;
// x = 20; // Error: Immutable assignment

let! y = 10;
y = 20; // OK
```

 - **Deep Mutability**: `let! x = Struct { ... }` makes the *entire* struct mutable. Vex does not support partial field mutability (except via interior mutability types like `Cell` - Future).

---

## 2. Reference Mutability

References inherit the mutability of their binding *at creation*, but enforce it strictly.

```vex
let! data = Vec.new();

fn process(v: &Vec<i32>!) {
    v.(1);
}

process(&data); // Pass mutable reference
```

### The Rules
1. **No Alias + Mutation**: You cannot have a mutable reference (`&T!`) if *any* other reference (mutable or immutable) to the same data is active.
2. **Shared Read**: You can have infinite immutable references (`&T`).

---

## 3. Interior Mutability using `Unsafe`

To bypass these rules (e.g. for implementing smart pointers), one must use `unsafe` and `UnsafeCell`-like patterns.

```vex
struct Cell<T> {
    value: T,
}

impl Cell<T> {
    fn set(self: &Cell<T>, val: T) {
        unsafe {
             // Cast immutable self to mutable pointer
             let ptr = self as *Cell<T>!;
             (*ptr).value = val;
        }
    }
}
```

> [!WARNING]
> Bypassing the borrow checker is undefined behavior if data races occur. Only use this for single-threaded synchronization primitives or FFI.
