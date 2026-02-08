# Built-in Items and Prelude

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

This document lists all types, functions, and items automatically available in every Vex program (Prelude).

---

## 1. Core Types (Prelude)

These types are available without import.

### Primitive Types
| Type | Description |
|:---|:---|
| `i8`, `i16`, `i32`, `i64` | Signed Integers |
| `u8`, `u16`, `u32`, `u64` | Unsigned Integers |
| `f32`, `f64` | Floating Point |
| `bool` | Boolean (true/false) |
| `string` | UTF-8 String |
| `void` | Empty type (Unit) |

### Composite Types
| Type | Description |
|:---|:---|
| `Option<T>` | Optional value (Some/None) |
| `Result<T,E>` | Success/Failure (Ok/Err) |
| `Vec<T>` | Dynamic array |
| `Map<K,V>` | Hash map |
| `Box<T>` | Heap allocation |

---

## 2. Built-in Functions

Functions available globally. All built-in functions are prefixed with `$`.

| Function | Signature | Description |
|:---|:---|:---|
| `$print` | `fn(any...)` | Print to stdout |
| `$println` | `fn(any...)` | Print line to stdout |
| `$panic` | `fn(string) -> !` | Terminate program |
| `$assert` | `fn(bool)` | Verify condition |
| `$sizeof` | `fn<T>() -> usize` | Get type size |
| `$len` | `fn<T>(T) -> u64` | Get length |
| `$cap` | `fn<T>(T) -> u64` | Get capacity |

---

## 3. Operators

Standard operators supported by the language.

### Arithmetic
`+`, `-`, `*`, `/`, `%`

### Comparison
`==`, `!=`, `<`, `>`, `<=`, `>=`

### Logical
`&&`, `||`, `!`

### Bitwise
`&`, `|`, `^`, `<<`, `>>`, `~`

### Advanced
- `!>`: Error Rescue
- `?`: Error Propagation
- `??`: Null Coalescing (Option)

---

## 4. Contracts (Prelude)

All system contracts are prefixed with `$`.

| Contract | Description |
|:---|:---|
| `$Drop` | Destructor capability |
| `$Clone` | Copy capability |
| `$Error` | Error reporting |
| `$Display` | String formatting |
| `$Default` | Default value creation |

