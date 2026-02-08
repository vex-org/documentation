# Raw Pointers and FFI

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

Vex provides zero-cost interoperability with C and low-level memory access via `unsafe` blocks.

---

## 1. Safety Boundary (`unsafe`)

Operations that cannot be verified by the borrow checker must be wrapped in `unsafe`.

```vex
unsafe {
    let ptr = malloc(1024);
    free(ptr);
}
```

**Unsafe Operations:**
- Dereferencing raw pointers.
- Calling `extern` functions (FFI).
- Accessing unions.
- Implementing `unsafe` contracts.

---

## 2. Raw Pointers

Vex distinguishes between safe References (`&T`) and raw Pointers (`*T`).

| Type | Description |
| :--- | :--- |
| `*T` | Raw immutable pointer (C `const T*`). |
| `*T!` | Raw mutable pointer (C `T*`). |
| `&T` | Safe immutable reference (Borrowed). |
| `&T!` | Safe mutable reference (Exclusive). |

```vex
let! x = 10;
let ptr: *i32! = &raw x; // Create raw pointer

unsafe {
    *ptr = 20; // Dereference requires unsafe
}
```

---

## 3. Foreign Function Interface (FFI)

Call C libraries directly.

```vex
// Declaration
extern "C" {
    fn malloc(size: usize): *void;
    fn free(ptr: *void);
    fn printf(fmt: *u8, ...): i32;
}

// Usage
fn main() {
    unsafe {
        let ptr = malloc(32);
        free(ptr);
    }
}
```

### Calling Convention
- `extern "C"`: Standard C ABI.
- `extern "system"`: System call ABI (e.g. `stdcall` on Windows).

---

## 4. Native Modules (`.vxc`)

For complex C integration, Vex uses `.vxc` files (Vex C headers).
These allow inline C code or direct linking.

```vex
// math.vxc
extern "C" {
    fn cos(x: f64): f64;
}
```
