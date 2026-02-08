# Literals

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/01_literals.vx`

## Overview

Literals are fixed values written directly in source code. Vex supports integer, floating-point, boolean, string, and byte literals.

> [!NOTE]
> All literals in Vex are strictly typed. While the compiler can infer types (e.g., `42` is `i32`), explicit suffixes allow you to specify the exact type (e.g., `42u8`).

## Integer Literals

### Decimal Integers
Basic decimal numbers without prefix.

```vex
let zero = 0;
let answer = 42;
let max_u8 = 255;
```

> [!WARNING]
> Visual separators (underscores like `1_000`) are **not yet supported** in the Lexer. Please write numbers continuously: `1000000`.

**Default Type:** `i32`  
**Regex:** `[0-9]+`

### Hexadecimal Integers
Prefix: `0x` or `0X`

```vex
let color = 0xFF;           // 255
let flags = 0x1A2B;         // 6699
```

**Regex:** `0[xX][0-9a-fA-F]+`

### Binary Integers
Prefix: `0b` or `0B`

```vex
let bits = 0b1010;          // 10
let mask = 0b11110000;      // 240
```

**Regex:** `0[bB][01]+`

### Octal Integers
Prefix: `0o` or `0O`

```vex
let permissions = 0o755;    // 493
```

**Regex:** `0[oO][0-7]+`

### Explicit Type Suffixes
You can force a literal to be a specific type by appending the type name.

```vex
let small = 127i8;          // Type is i8
let unsigned = 100u32;      // Type is u32
let big = 1000000i64;       // Type is i64
let byte_hex = 0xFFu8;      // Type is u8
```

## Floating-Point Literals

### Basic Floats
Decimal numbers with a decimal point.

```vex
let pi = 3.14;
let half = 0.5;
```

**Default Type:** `f64` (Double precision)  
**Regex:** `[0-9]+\.[0-9]+`

### Scientific Notation
Exponential format with `e` or `E`.

```vex
let large = 1.5e10;         // 15000000000.0
let tiny = 2.0e-5;          // 0.00002
```

## String Literals

### Basic Strings
Enclosed in double quotes. Vex strings are UTF-8 encoded.

```vex
let greeting = "Hello, World!";
let path = "C:\\Windows\\System32";
```

### F-Strings (Interpolation)
Prefix with `f` to interpret `{expression}` inside the string.

```vex
let name = "Vex";
let version = 1;
// Prints: "Language: Vex, Version: 1"
(f"Language: {name}, Version: {version}");
```

> [!TIP]
> F-strings are compiled to efficient string concatenation code at compile time.

## Byte Literals
Vex treats bytes as `u8`. We do not have a dedicated `char` type or single-quote literals ` 'a' `.

```vex
let letter_a: u8 = 97;      // ASCII for 'a'
let newline: u8 = 10;       // ASCII for '\n'
```

## Real World Usage

### Defining Configuration Flags (Bitmasks)
Binary literals are perfect for bitmasks.

```vex
// Define explicit types for safety
const READ: u8    = 0b00000001; // 1
const WRITE: u8   = 0b00000010; // 2
const EXECUTE: u8 = 0b00000100; // 4

fn check_access(perms: u8) {
    if perms & READ != 0 {
        ("Readable");
    }
}
```

### High-Precision Math
Using explicit suffixes to ensure 64-bit or 128-bit precision.

```vex
fn calculate_distance() {
    // Force f64 literals to prevent accidental f32 constraint
    let x = 10.5f64; 
    let y = 20.2f64;
    // ...
}
```
