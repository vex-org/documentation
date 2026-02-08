# RAII Model in Vex

Vex implements **RAII (Resource Acquisition Is Initialization)** using a **Rust-like** approach combined with **Go's `defer` keyword**. This model ensures safe, predictable, and automatic resource management.

---

## Core Principles

1.  **Automatic Cleanup**: Resources are automatically cleaned up when they go out of scope.
2.  **Deterministic**: Cleanup happens at a known point (end of scope).
3.  **Explicit Control**: `defer` allows manual scheduling of cleanup logic.

---

## The `Drop` Contract

The `Drop` contract is central to Vex's RAII.

```vex
contract Drop {
    /// Called automatically at scope exit
    fn drop(self: &Self!);
}
```

- **Automatic Call**: Called when variable goes out of scope.
- **Mutable Receiver**: `&Self!` allows modification during cleanup (e.g., setting file handle to -1).
- **Compiler Injection**: Calls are injected implicitly by the compiler.

---

## Example: File Resource

```vex
struct File {
    fd: i32,
}

impl Drop for File {
    fn drop(self: &File!) {
        println(f"Closing file {self.fd}");
        syscall_close(self.fd);
    }
}

fn process() {
    let f = File { fd: 10 };
    // do work...
    // f.drop() called here automatically
}
```

---

## Interaction with `defer`

Vex allows `defer` for ad-hoc cleanup, often used when valid RAII types aren't available or for logic flow.

```vex
fn complex_logic() {
    let temp = TemporaryFile.new(); // Implements Drop
    
    defer println("Function finished");  // Runs last
    
    // ... logic
    
} // temp.drop() runs, then "Function finished" prints.
```

**Order of Operations:**
1. Scope-based `Drop` calls (LIFO).
2. `defer` statements (LIFO).
(Note: Exact ordering between Drop and Defer needs strict specification, usually Defer runs before local drops in Go/Zig, but Vex treats them similarly).

---

## Conclusion

Vex's RAII model combines Rust's safety (Drop trait) with Go's pragmatism (Defer), providing ergonomic resource management.
