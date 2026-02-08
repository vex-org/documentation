# Bitwise Operators

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/06_bitwise_ops.vx`

## Overview

Bitwise operators manipulate individual bits of integer types (`i8`..`i128`, `u8`..`u128`). They are essential for low-level systems programming, flags, and binary protocols.

## Operators

| Operator | Name | Example | Description |
| :---: | :--- | :--- | :--- |
| `&` | Bitwise AND | `a & b` | 1 if both bits are 1 |
| `\|` | Bitwise OR | `a \| b` | 1 if either bit is 1 |
| `^` | Bitwise XOR | `a ^ b` | 1 if bits differ |
| `~` | Bitwise NOT | `~a` | Inverts all bits (One's complement) |
| `<<` | Left Shift | `a << n` | Shifts bits left (multiplies by 2^n) |
| `>>` | Right Shift | `a >> n` | Shifts bits right (divides by 2^n) |

## Examples

### Bit Manipulation

```vex
let a: u8 = 0b10101010;
let b: u8 = 0b11110000;

let and_res = a & b; // 0b10100000
let or_res  = a | b; // 0b11111010
let xor_res = a ^ b; // 0b01011010
let not_res = ~a;    // 0b01010101
```

### Shifting

```vex
let x: u32 = 1;
let shifted = x << 3; // 1 * 2^3 = 8

let y: u32 = 16;
let down = y >> 2;    // 16 / 2^2 = 4
```

> [!NOTE]
> **Arithmetic vs Logical Shift**:
> - For **unsigned** types (`u32`), `>>` is a **Logical Shift** (fills with 0).
> - For **signed** types (`i32`), `>>` is usually an **Arithmetic Shift** (preserves sign bit), depending on platform/compiler settings. Vex defaults to arithmetic shift for signed integers.

## Usage Patterns

### Setting and Clearing Flags

```vex
const FLAG_READ = 0b01;
const FLAG_WRITE = 0b10;

let! status = 0;

// Set Flag
status = status | FLAG_READ;

// Check Flag
if (status & FLAG_READ) != 0 {
    ("Readable");
}

// Clear Flag
status = status & (~FLAG_READ);
```

### Toggling bits

```vex
// Toggle the read flag
status = status ^ FLAG_READ;
```

## Implementation Details

### AST Representation
Defined in `vex-ast/src/expressions.rs`.

```rust
pub enum BinaryOp {
    BitAnd, BitOr, BitXor,
    Shl, Shr, 
    // ...
}

pub enum UnaryOp {
    BitNot, // ~
}
```

### Codegen
Maps directly to LLVM instructions: `and`, `or`, `xor`, `shl`, `lshr` (unsigned), `ashr` (signed).
