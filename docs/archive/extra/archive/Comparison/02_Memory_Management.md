# Memory Management Comparison

This document compares Vex's memory management model with Go, Rust, C, and C++.

| Feature | Vex | Go | Rust | C | C++ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Strategy** | Ownership & Borrowing | Garbage Collection | Ownership & Borrowing | Manual | Manual + RAII |
| **Ownership** | Compile-time check (Move) | N/A | Compile-time check (Move) | N/A | Move semantics (std::move) |
| **Reference (Immutable)** | `&T` | N/A (Pointers) | `&T` | `const T*` | `const T&` |
| **Reference (Mutable)** | `&T!` | N/A (Pointers) | `&mut T` | `T*` | `T&` |
| **Borrow Checking** | Yes (Single Writer OR Multiple Readers) | Runtime (Race detector only) | Yes | No | No |
| **Allocation** | `new(val)`, Stack default | `new`, `make` (Escape analysis) | `Box::new()`, Stack default | `malloc` | `new` |
| **Deallocation** | Automatic (Drop contract) | GC | Automatic (Drop trait) | `free` | `delete` |
| **Null Safety** | `Option<T>` (No null ref) | `nil` (Dangerous) | `Option<T>` | `NULL` | `nullptr` |
| **Raw Pointers** | `*T`, `*T!` | `*T`, `uintptr` | `*const T`, `*mut T` | `T*` | `T*` |

## Detailed Comparison

### Ownership
Vex follows Rust's ownership model. Variables typically "own" their data. Assigning a value to another variable moves ownership (for non-Copy types), invalidating the previous variable.

### Mutability
- **Vex**: Explicit marker `!` for mutable references (`&i32!`).
- **Rust**: Keyword `mut` (`&mut i32`).
- **Go**: Pointers are always mutable if you have the address.
- **C/C++**: `const` correctness is used, but opt-in.

### Cleanup
Vex uses the `Drop` contract (similar to Rust's `Drop` trait) to automatically clean up resources when a variable goes out of scope. It also supports Go-style `defer` for function-scoped cleanup.

```vex
// Vex
defer file.close();
```

```go
// Go
defer file.Close()
```

```rust
// Rust
// Automatic via Drop
```
