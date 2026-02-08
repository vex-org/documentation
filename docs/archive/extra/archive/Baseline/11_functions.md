# Functions

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/11_functions.vx`

## Overview

Functions are the building blocks of Vex applications. They are declared with the `fn` keyword.

## Syntax

```vex
fn generic_name(param1: Type, param2: Type): ReturnType {
    // body
    return value;
}
```

> [!WARNING]
> Vex uses a **colon** (`:`) for return types, not an arrow (`->`).
> 
> *   ✅ `fn add(a: i32): i32`
> *   ❌ `fn add(a: i32) -> i32`

## Examples

### Basic Function

```vex
fn add(a: i32, b: i32): i32 {
    return a + b;
}
```

### Void Function (No Return)
Omit the return type.

```vex
fn greet(name: string) {
    ("Hello, " + name);
}
```

## Parameters

Parameters must always have explicit types.

```vex
fn calculate_area(width: f64, height: f64): f64 {
    return width * height;
}
```

## Recursion
Functions can call themselves. A stack overflow will occur if recursion is too deep (platform dependent).

```vex
fn factorial(n: i64): i64 {
    if n <= 1 { return 1; }
    return n * factorial(n - 1);
}
```

## Main Function
Every executable program must have a `main` function.

```vex
fn main(): i32 {
    ("Program start");
    return 0; // Exit code
}
```
