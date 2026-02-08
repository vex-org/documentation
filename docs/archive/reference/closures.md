# Closures and Lambda Expressions

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

Closures are anonymous functions that can capture their environment. Vex closures are statically typed and zero-cost.

---

## 1. Syntax

Vex uses Rust-like pipe syntax for closures.

```vex
let add = |a, b| a + b;
let square = |x| {
    return x * x;
};
```

### Type Inference
Types are usually inferred, but can be explicit.

```vex
let mul = |x: i32, y: i32|: i32 {
    return x * y;
};
```

---

## 2. Capture Modes

Vex automatically determines how variables are captured (Move vs Borrow).

1.  **Borrow (Immutable)**: If captured variable is only read.
2.  **Borrow (Mutable)**: If captured variable is mutated (must be declared `let!`).
3.  **Move**: If captured variable is consumed (e.g. returned or moved).

### Example
```vex
let! sum = 0;
let add_to_sum = |x| {
    sum = sum + x; // Mutable capture
};
```

---

## 3. Contracts

Closures implement specific contracts based on their capture usage:

- `contract Callable`: Can be called multiple times (Immutable state).
- `contract CallableMut`: Can be called multiple times (Mutable state).
- `contract CallableOnce`: Can be called once (Moves state).

```vex
fn apply<F: Callable<i32, i32>>(f: F, val: i32): i32 {
    return f(val);
}
```

---

## 4. Async Closures (Future)

Declarative syntax for async closures is planned.

```vex
// Future Syntax
let fetch = async |url| {
    let resp = await http.get(url);
    return resp;
};
```
