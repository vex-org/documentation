# Primitive Types

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/02_primitive_types.vx`

## Overview

Primitive types are the atomic building blocks of Vex. They are stack-allocated, passed by value (copy), and map directly to machine value types.

## Integer Types

Vex provides signed (`i`) and unsigned (`u`) integers of various bit widths.

| Type   | Bits | Range                                | Usage                          |
| ------ | ---- | ------------------------------------ | ------------------------------ |
| `i8`   | 8    | -128 to 127                          | Small counters, wire protocols |
| `i16`  | 16   | -32k to 32k                          | Audio samples, legacy hardware |
| `i32`  | 32   | -2B to 2B                            | **Default integer type**       |
| `i64`  | 64   | -9E18 to 9E18                        | File sizes, timestamps, ptrs   |
| `i128` | 128  | Very large                           | Cryptography, high-precision   |
| `u8`   | 8    | 0 to 255                             | Bytes, pixels, raw data        |
| `u16`  | 16   | 0 to 65k                             | Ports, hashes                  |
| `u32`  | 32   | 0 to 4B                              | Sizes, indexes                 |
| `u64`  | 64   | 0 to 1.8E19                          | Memory addresses (large)       |
| `u128` | 128  | 0 to 3.4E38                          | UUIDs, crypto types            |


> [!NOTE]
> `isize` and `usize` depend on the target platform architecture (32-bit or 64-bit). They are typically used for array indexing and pointer arithmetic.

### Example

```vex
let count: i32 = 100;
let explicit_byte: u8 = 255;
let uuid_part: u128 = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
```

## Floating-Point Types

IEEE 754 floating-point standards.

| Type  | Bit Width | Precision | Common Use Cases             |
| ----- | --------- | --------- | ---------------------------- |
| `f16` | 16        | Half      | GPU textures, ML weights     |
| `f32` | 32        | Single    | Graphics, game physics       |
| `f64` | 64        | Double    | **Default**, SciComp, Finance|

```vex
let position: f32 = 10.5; // Game coordinate
let precise_val: f64 = 0.1234567890123456789;
```

## Boolean

The `bool` type represents truth values: `true` or `false`.

```vex
let is_ready = true;
if is_ready {
    launch();
}
```

> [!TIP]
> Booleans are stored as `1 byte` (`i8`) in memory for addressability, but typically use `1 bit` in registers/SIMD masks.

## Void / Unit Type (`nil`)

Vex uses `nil` to represent the absence of a value (similar to `void` in C or `()` in Rust).

```vex
fn do_nothing() {
    return nil; // Optional, implicit if block ends
}
```

## Real World Usage

### 1. Graphics Programming (u8)
When processing images, `u8` is the standard type for color channels (R, G, B, A).

```vex
struct Color {
    r: u8,
    g: u8,
    b: u8,
    a: u8,
}

let red = Color { r: 255, g: 0, b: 0, a: 255 };
```

### 2. High-Performance Counters (usize)
When iterating over arrays, use `usize` to ensure maximum performance and compatibility with memory addressing.

```vex
let items = [1, 2, 3];
// Arrays are indexed by usize
for i in 0..items.() {
    (items[i]);
}
```

### 3. Financial Calculations (i64 / i128)
Avoid floats for money. Use `i64` storing smaller units (cents) or `i128` for crypto-currencies.

```vex
// Store $10.50 as 1050 cents
let price: i64 = 1050; 
let quantity: i64 = 5;
let total = price * quantity; // 5250 cents ($52.50)
```
