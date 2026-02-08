# Arithmetic Operators

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/03_arithmetic_ops.vx`

## Overview

Vex provides a comprehensive set of arithmetic operators, ranging from standard mathematical operations to high-performance logic like saturation, rotation, and carry-less multiplication.

## Standard Arithmetic

Standard operators behave as expected, with predictable precedence and associativity.

| Operator | Name | Example | Description |
| :---: | :--- | :--- | :--- |
| `+` | Addition | `a + b` | Adds two operands |
| `-` | Subtraction | `a - b` | Subtracts right from left |
| `*` | Multiplication | `a * b` | Multiplies operands |
| `/` | Division | `a / b` | Divides left by right (truncates for integers) |
| `%` | Modulo | `a % b` | Returns remainder |
| `-` | Negation | `-a` | Unary negation |

```vex
let sum = 10 + 5;       // 15
let diff = 10 - 20;     // -10
let prod = 6 * 7;       // 42
let quot = 7 / 2;       // 3
let rem = 7 % 2;        // 1
```

> [!WARNING]
> Standard integer arithmetic **wraps around** on overflow (two's complement) in Release builds, but may panic in Debug builds. For safety, use [Saturating Arithmetic](#saturating-arithmetic).

## Saturating Arithmetic

Saturating operators constrain results within the type's valid range instead of overflowing/wrapping. If a value exceeds the maximum, it stays at the maximum.

| Operator | Name | Example | Behavior on Overflow |
| :---: | :--- | :--- | :--- |
| `+|` | Saturating Add | `a +| b` | Clamps to `MAX` |
| `-|` | Saturating Sub | `a -| b` | Clamps to `MIN` / `0` |
| `*|` | Saturating Mul | `a *| b` | Clamps to `MAX` / `MIN` |

```vex
let max: u8 = 255;
// Standard: Wraps to 0
// let x = max + 1; 

// Saturating: Clamps to 255
let safe = max +| 1; 
(safe); // 255

let min: u8 = 0;
let under = min -| 50;
(under); // 0 (Does not wrap to 206)
```

## Advanced & SIMD Operators

Vex includes operators specifically designed for cryptography, hashing, and SIMD (Single Instruction, Multiple Data) algorithms.

| Operator | Name | Example | Description |
| :---: | :--- | :--- | :--- |
| `<<<` | Rotate Left | `x <<< 2` | Bitwise rotation left |
| `>>>` | Rotate Right | `x >>> 2` | Bitwise rotation right |
| `<?` | Min | `a <? b` | Returns the smaller value |
| `>?` | Max | `a >? b` | Returns the larger value |
| `*^` | Carry-less Mul | `a *^ b` | Galois Field multiplication (AES-GCM) |

### Rotation vs Shift
Rotation shifts bits out one end and puts them back in the other, preserving all information.

```vex
let x: u8 = 0b10000001;
let rot = x <<< 1; 
// Result: 0b00000011 (The '1' from MSB moved to LSB)
```

### Min / Max (`<?`, `>?`)
Optimized intrinsics (often single instruction on x86/ARM).

```vex
let x = 10;
let y = 20;
let lower = x <? y; // 10
let upper = x >? y; // 20
```

## Real World Usage

### 1. Signal Processing (Saturating Math)
When processing audio, you never want a sample to wrap from loud (positive) to inverse extreme (negative), which causes "clipping" noise.

```vex
fn mix_audio(sample1: i16, sample2: i16) : i16 {
    // Standard '+' would cause overflow popping
    // Saturating '+|' creates smooth clipping distortion instead
    return sample1 +| sample2;
}
```

### 2. Cryptography (Rotate & Carry-less Mul)
Hashing algorithms like ChaCha20 or SHA-256 rely heavily on rotation. AES-GCM uses carry-less multiplication.

```vex
fn encrypt_step(state: u32, key: u32) : u32 {
    let mixed = state ^ key;
    // Rotate left 13 bits (common in crypto)
    return mixed <<< 13;
}
```

### 3. Bounding Boxes (Min/Max)
Calculating the intersection of rectangles.

```vex
let x_overlap = (rect1.x2 <? rect2.x2) - (rect1.x1 >? rect2.x1);
```
