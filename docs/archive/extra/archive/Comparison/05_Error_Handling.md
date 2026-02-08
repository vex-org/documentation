# Error Handling Comparison

This document compares Vex's error handling with Go, Rust, C, and C++.

| Feature | Vex | Go | Rust | C | C++ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mechanism** | value-based (`Result`) | value-based (`error`) | value-based (`Result`) | Return codes | Exceptions |
| **Type** | `Result<T, E>`, `Option<T>` | Interface `error` | Enum `Result`, `Option` | Integer/Null | Class Hierarchy |
| **Propagation** | `expr?` | Manual `if err != nil` | `expr?` | Manual check | Automatic stack unwind |
| **Unrecoverable** | `panic()` | `panic` | `panic!` | `abort` | `std::terminate` |
| **Try/Catch** | No (Use Match) | No (Use Recover) | No (Use Match) | No | Yes |
| **Stack Trace** | On Panic | On Panic | On Panic | Debugger | On throw (impl defined) |

## Philosophy

### Vex vs Go
Go requires verbose error checking:
```go
val, err := func()
if err != nil {
    return err
}
```

Vex uses the `?` operator to reduce boilerplate while maintaining visibility:
```vex
let val = func()?;
```

### Vex vs C++
C++ exceptions are implicit. You don't know if a function throws just by looking at the call.
Vex makes errors part of the function signature (`Result<T, E>`), forcing the caller to handle or propagate them.

### Vex vs Rust
Vex is very similar to Rust here, treating errors as values.
- `Result<T, E>`: Operation might fail.
- `Option<T>`: Value might be missing.
- `?`: Propagate error/none.
