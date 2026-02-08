# Chapter 4: Core Concepts

Welcome to Vex. This guide will walk you through the core concepts of the language. Vex is designed to be familiar to users of Rust, Go, and TypeScript, but it has its own unique philosophy.



## 1.2 Variables and Mutability

This is where Vex differs from many languages.

### Immutable by Default
Variables declared with `let` are **immutable**. You cannot change them.

```vex
let x = 42;
// x = 100; // Error!
```

### Explicit Mutability (`let!`)
To make a variable mutable, you must use the `!` bang operator.

```vex
let! count = 0;
count = count + 1; // OK
```

> **Why `!`?** Vex emphasizes that mutation is a side-effect. The `!` serves as a visual marker that "this value changes".

## 1.3 Basic Types

Vex supports standard systems types:

- **Integers**: `i32`, `u64`, `i8`, `usize`...
- **Floats**: `f32`, `f64`
- **Boolean**: `bool` (`true`, `false`)
- **String**: `string` (UTF-8)

```vex
let age: i32 = 25;
let price: f64 = 19.99;
let is_active = true; // Type inferred
```

## 1.4 Functions

Functions are first-class citizens.

```vex
fn add(a: i32, b: i32): i32 {
    return a + b;
}
```

### Named Return Types (Go-style) - *Planned*
Vex is exploring named returns, but current versions use standard return syntax.

## 1.5 Comments

```vex
// Single line comment

/*
   Multi-line
   Comment
*/
```

## Next Steps
Now that you know the basics, let's look at how Vex handles data with **Structs**.
