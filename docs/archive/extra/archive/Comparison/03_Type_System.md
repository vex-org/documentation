# Type System Comparison

This document compares Vex's type system with Go, Rust, C, and C++.

| Feature | Vex | Go | Rust | C | C++ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Strong Typing** | Yes | Yes | Yes | Weak | Moderate |
| **Type Inference** | Function body local | Function body local | Function body local | `auto` (C23) | `auto` |
| **Structs** | `struct` | `struct` | `struct` | `struct` | `class` / `struct` |
| **Methods** | External (`fn (s: &T)`) | External (`func (s *T)`) | Implement block (`impl T`) | N/A | Internal (Class body) |
| **Interfaces** | `contract` | `interface` | `trait` | N/A | Abstract Class |
| **Generics** | Yes (`<T>`) | Yes (`[T]`) | Yes (`<T>`) | No (`void*`) | Templates (`<T>`) |
| **Enums** | Sum Types (Data variants) | Integer constants | Sum Types | Integers | Integers / `enum class` |
| **Union Types** | `TypeA \| TypeB` | No | No (Use Enums) | `union` (C-style) | `std::variant` |
| **Tuple** | `(A, B)` | No | `(A, B)` | N/A | `std::tuple` |
| **Aliasing** | `type Name = Type` | `type Name Type` | `type Name = Type` | `typedef` | `using` |

## Distinctive Features

### Contracts vs Traits vs Interfaces
- **Vex Contracts**: Similar to Rust traits but allow for both static dispatch and dynamic usage (future). Uses `impl Contract` syntax on the struct definition line, unlike Rust's separate `impl Trait for Type` block.
- **Go Interfaces**: Implicit implementation. If methods match, it implements it.
- **Rust Traits**: Explicit implementation block.

### Enums
Vex Enums are true sum types, capable of holding data (like Rust).
```vex
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(string),
}
```

### Method Syntax
Vex adopts a hybrid "Go-style" definition for methods to keep structs simple data containers, but uses `let!` for mutability.
```vex
fn (p: &Point) distance() {}
fn (p: &Point!) move(x: i32, y: i32) {}
```
