# General Syntax Comparison

This document compares Vex's general syntax with Go, Rust, C, and C++.

| Feature | Vex | Go | Rust | C | C++ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Entry Point** | `fn main(): i32` | `func main()` | `fn main()` | `int main()` | `int main()` |
| **Variable Decl** | `let x = 1;` | `var x = 1` | `let x = 1;` | `int x = 1;` | `auto x = 1;` |
| **Mutable Var** | `let! x = 1;` | `var x = 1` | `let mut x = 1;` | `int x = 1;` | `auto x = 1;` |
| **Constants** | `const PI = 3.14;` | `const PI = 3.14` | `const PI: f64 = 3.14;` | `const float PI = 3.14;` | `const float PI = 3.14;` |
| **Function Def** | `fn add(a: i32): i32` | `func add(a int) int` | `fn add(a: i32) -> i32` | `int add(int a)` | `int add(int a)` |
| **Return** | `return x;` | `return x` | `x` (expression) | `return x;` | `return x;` |
| **Comments** | `//`, `/* ... */` | `//`, `/* ... */` | `//`, `/* ... */` | `//`, `/* ... */` | `//`, `/* ... */` |
| **Semicolons** | Required | Optional (inserted) | Required | Required | Required |

## Control Flow

| Feature | Vex | Go | Rust | C | C++ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **If Statement** | `if x < 0 { }` | `if x < 0 { }` | `if x < 0 { }` | `if (x < 0) { }` | `if (x < 0) { }` |
| **Else If** | `elif` | `else if` | `else if` | `else if` | `else if` |
| **Infinite Loop** | `loop { }` | `for { }` | `loop { }` | `while(1) { }` | `while(true) { }` |
| **While Loop** | `while x < 10 { }` | `for x < 10 { }` | `while x < 10 { }` | `while(x < 10) { }` | `while(x < 10) { }` |
| **For Loop** | `for let i=0; i<10; i++` | `for i:=0; i<10; i++` | N/A (use range) | `for(int i=0; i<10; i++)` | `for(int i=0; i < 10; ++i)` |
| **For-In/Range** | `for i in 0..10` | `for i := range arr` | `for i in 0..10` | N/A | `for (auto i : arr)` |
| **Switch/Match** | `switch` (Go-style), `match` (Patterns) | `switch` | `match` | `switch` | `switch` |
| **Defer** | `defer cleanup()` | `defer cleanup()` | `Drop` trait | N/A (goto/cleanup) | Destructors |

## Key Differences

- **Vex vs Rust**: Vex uses `let!` instead of `let mut`, `elif` instead of `else if`, and `:` instead of `->` for returns.
- **Vex vs Go**: Vex uses `fn` instead of `func`, and requires semicolons.
- **Vex vs C/C++**: Vex puts types after names (`name: type`), similar to Go and Rust, and has no parentheses around `if/while` conditions.
