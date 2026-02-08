# Type System

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

Vex features a static, strong, and structural type system with rich compile-time metaprogramming capabilities.

---

## 1. Primitive Types

### Integers
Fixed-size signed and unsigned integers.

| Type | Bits | Range |
| :--- | :--- | :--- |
| `i8`, `u8` | 8 | -128..127 / 0..255 |
| `i16`, `u16` | 16 | Small counters |
| `i32`, `u32` | 32 | **Default**. Standard arithmetic. |
| `i64`, `u64` | 64 | Pointers/Sizes on 64-bit systems. |
| `i128`, `u128` | 128 | High-precision/Crypto. |

### Floating Point
IEEE 754 floats.

| Type | Bits | Precision |
| :--- | :--- | :--- |
| `f16` | 16 | Machine learning / Graphics |
| `f32` | 32 | Standard graphics |
| `f64` | 64 | **Default**. High precision physics/math. |

### Boolean
`bool`: `true` or `false`. (1 byte).

### String
`string`: UTF-8 encoded, dynamic length, heap-allocated.  
See `12. Strings` for full details.

### Special Types
- **`nil`**: Unit type (void).
- **`never`**: The bottom type (!), representing computations that never complete.
- **`any`**: Dynamic type (erased).
- **`byte`**: Alias for `u8`.

---

## 2. Built-in Core Types

Vex implements these types directly in the AST for zero-overhead performance.

### Option & Result (Null Safety)
First-class support for safety without null pointer exceptions.

```vex
// Option<T>: Some(T) or None
let maybe_num: Option<i32> = Some(10);

// Result<T, E>: Ok(T) or Err(E)
let res: Result<i32, string> = Ok(200);
```

### Collections (AST Implemented)
Map directly to high-performance internal structures.

| Type | Description |
| :--- | :--- |
| `Vec<T>` | Growable array (Heap). |
| `Map<K, V>` | Hash map. |
| `Set<T>` | Hash set. |

### Memory & Concurrency
| Type | Description |
| :--- | :--- |
| `Box<T>` | Heap allocation. |
| `Channel<T>` | MPSC Channel for `go` routines. |

---

## 3. Compound Types

### Arrays & Slices
- **Array**: `[T; N]` (Fixed size, stack/static).
- **Slice**: `&[T]` (View into array).

### Tuples
Heterogeneous fixed-size grouping.
```vex
let pair: (i32, string) = (1, "one");
```

### References
- `&T`: Immutable reference.
- `&T!`: Mutable reference.

---

## 4. Advanced Types

### Algebraic Types
- **Union**: `Type A | Type B` (Sum type).
- **Intersection**: `Type A & Type B` (Satisfies both contracts - Planned).

### Metaprogramming Types
- **Conditional**: `T extends U ? X : Y` (Planned)
- **Typeof**: `$typeof(expr)` returns the type at compile time.
- **Infer**: `infer T` for type deduction in constraints.

---

## 5. Type Inference

Vex infers types locally. Global items (functions args/return) require annotations.

```vex
let x = 10;      // Inferred i32
let y = x * 2;   // Inferred i32
```

## 6. Type Hierarchy

Vex uses a structural type system for Contracts (Traits), but nominal typing for Structs/Enums.

- **Upcasting**: Automatic for `T -> Contract` if T implements Contract.
- **Coercion**: No implicit numeric coercion.
