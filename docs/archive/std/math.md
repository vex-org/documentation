# Standard Library: Math

The `std/math` module provides mathematical functions and constants. Many of these map directly to LLVM intrinsics for maximum performance and are auto-vectorized when used on arrays.

## Functions

### `sqrt`
```vex
fn sqrt(x: f64): f64
```
Returns the square root of a number.

### `abs`
```vex
fn abs(x: f64): f64
```
Returns the absolute value of `x`.

### `sin`, `cos`, `tan`
```vex
fn sin(x: f64): f64
fn cos(x: f64): f64
fn tan(x: f64): f64
```
Trigonometric functions.

### `log`, `log2`, `log10`
```vex
fn log(x: f64): f64   // Natural logarithm
fn log2(x: f64): f64  // Base 2
fn log10(x: f64): f64 // Base 10
```

### `pow`
```vex
fn pow(base: f64, exp: f64): f64
```
Returns `base` raised to the power of `exp`.

---

## Constants

```vex
const PI: f64 = 3.14159265358979323846;
const E: f64  = 2.7182818284590452354;
const TAU: f64 = 6.28318530717958647692;
```
