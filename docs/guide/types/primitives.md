# Primitive Types

Vex provides primitive types for integers, floats, booleans, characters, strings, pointers, and control-flow values such as `never`.

## Integer Types

### Signed Integers

| Type   | Size     | Range             |
| ------ | -------- | ----------------- |
| `i8`   | 8 bits   | -128 to 127       |
| `i16`  | 16 bits  | -32,768 to 32,767 |
| `i32`  | 32 bits  | -2³¹ to 2³¹-1     |
| `i64`  | 64 bits  | -2⁶³ to 2⁶³-1     |
| `i128` | 128 bits | -2¹²⁷ to 2¹²⁷-1   |

### Unsigned Integers

| Type   | Size     | Range       |
| ------ | -------- | ----------- |
| `u8`   | 8 bits   | 0 to 255    |
| `u16`  | 16 bits  | 0 to 65,535 |
| `u32`  | 32 bits  | 0 to 2³²-1  |
| `u64`  | 64 bits  | 0 to 2⁶⁴-1  |
| `u128` | 128 bits | 0 to 2¹²⁸-1 |

### Platform-Dependent Types

| Type    | Size     | Description                    |
| ------- | -------- | ------------------------------ |
| `isize` | Platform | Pointer-sized signed integer   |
| `usize` | Platform | Pointer-sized unsigned integer |

### Integer limits

The auto-imported Prelude exposes typed integer bounds through `Limits`:

```vex
let byteMax: u8 = Limits.u8Max
let signedMin: i64 = Limits.i64Min
let indexMax: usize = Limits.usizeMax
let wideMax: u128 = Limits.u128Max
```

Each signed and unsigned integer type has `Min` and `Max` members. The
`isize`/`usize` values follow the selected compilation target, including during
cross-compilation; they are not based on the machine running the compiler.
`Limits.*` values are compile-time constants and do not emit a runtime lookup.

For generic metaprogramming, the underlying typed operations are
`#Type.minValue<T>()` and `#Type.maxValue<T>()`. Ordinary code should prefer
the readable `Limits.*` surface.

### Integer representation helpers

Integer helpers are grouped under `IntegerLimits`; primitive namespaces stay
small and constants remain under `Limits`:

```vex
let value: u32 = 0x01020304

let little = IntegerLimits.toLe<u32>(value)
let big = IntegerLimits.toBe<u32>(value)
let native = IntegerLimits.fromBe<u32>(big)
let swapped = IntegerLimits.swapBytes<u32>(value)
let ones = IntegerLimits.countOnes<u32>(value)
let leading = IntegerLimits.leadingZeros<u32>(value)
let trailing = IntegerLimits.trailingZeros<u32>(value)
let rounded = IntegerLimits.nextPowerOfTwo<u32>(value)
let power = IntegerLimits.isPowerOfTwo<u32>(value)

let bytes: [u8; 4] = IntegerLimits.toLeBytes(value)
let networkBytes: [u8; 4] = IntegerLimits.toBeBytes(value)
```

Endian selection is resolved at compile time. Conversion becomes either the
identity operation or one LLVM byte-swap instruction; there is no runtime
endianness branch.

`toLeBytes` and `toBeBytes` are statically selected overload families returning the exact array
width (`[u8; 1]`, `[u8; 2]`, `[u8; 4]`, `[u8; 8]`, or `[u8; 16]`). It does not
allocate and does not return a tagged or dynamically sized wrapper.

Generic integer APIs can share the Prelude type sets
`SIGNED_INTEGER_TYPES`, `UNSIGNED_INTEGER_TYPES`, and `INTEGER_TYPES`.

### Usage

```vex
let x: i32 = 42
let y: i64 = 42

// Explicit type suffix
let a = 42i8       // i8
let b = 42u64      // u64
let c = 1000i128   // i128

// Explicit type annotation
let d: u16 = 1000

// Numeric separators for readability
let million = 1_000_000
let bytes = 0xFF_FF_FF_FF
let binary = 0b1111_0000_1111_0000
```

::: warning Overload Resolution Note
Unsuffixed integer literals can be inferred differently depending on context. In current examples and tests, they are commonly used as `i32` unless a wider type is required by surrounding code. At public API boundaries, prefer explicit annotations.
:::

### Literals in Different Bases

```vex
let decimal = 255
let hex = 0xFF        // Hexadecimal
let octal = 0o377     // Octal
let binary = 0b11111111  // Binary

// With type suffix
let hex_byte = 0xFFu8
let binary_word = 0b1010_1010u16
```

## Floating-Point Types

| Type  | Size    | Precision  | Range      |
| ----- | ------- | ---------- | ---------- |
| `f16` | 16 bits | ~3 digits  | ±65,504    |
| `f32` | 32 bits | ~7 digits  | ±3.4×10³⁸  |
| `f64` | 64 bits | ~15 digits | ±1.8×10³⁰⁸ |

### Usage

```vex
let pi = 3.14159       // f64

// Scientific notation
let avogadro = 6.022e23
let planck = 6.626e-34

// Explicit type suffix
let half = 0.5f32      // f32
let precise = 3.14159265358979f64

let single: f32 = 0.5
let precise: f64 = 3.14159265358979
```

### f16 (Half Precision)

`f16` exists in the type system, but some repositories and toolchains still treat it as a specialized path. Use it when you are already working in code that expects half precision, especially tensor or GPU-oriented code.

```vex
let weights: [f16; 1024] = load_model_weights()
let result = neural_network.forward(weights)
```

## Character Type

`char` is the single-character primitive type.

```vex
let letter: char = 'A'
let escape: char = '\n'
```

In the current implementation, `char` is treated as a compact character value rather than a full owned string.

## `string` and `str`

```vex
let owned: string = "Hello"
let borrowed: str = "Hello"
```

Use `string` when you want an owned value. Use `str` for a borrowed string view.

String literals can flow into either type depending on context.

### `string`

`string` is the main owned text type used throughout the repo.

### `str`

`str` is a borrowed string slice-like view used in parsing and APIs that do not need ownership.

## Boolean Type

```vex
let yes: bool = true
let no: bool = false
let is_equal = 5 == 5
let is_greater = 10 > 5
```

## Unit and `never`

The unit type is written as `()` and is usually omitted in function signatures.

```vex
fn log_message() {
    $println("done")
}
```

The `never` type represents computations that do not return.

```vex
fn fail(message: string): never {
    $panic(message)
}

fn spin(): never {
    loop {}
}
```

## Pointers and raw pointer-like primitives

Low-level code uses the canonical `Ptr<T>` family. `Ptr<Opaque>` models an
opaque C pointer and `Ptr<T!>` carries writable-pointee capability. The old
`ptr`, `*T`, and `*T!` spellings are rejected after lint-assisted migration.

Most code should prefer references, `Span<T>`, and owned containers. See
[Pointers](/guide/advanced/pointers).

## Casting

Use `as` for explicit casts.

```vex
let x: i32 = 42
let y: i64 = x as i64

let f: f64 = 3.14
let i: i32 = f as i32
```

## Guidance

- Prefer explicit integer types at public API boundaries.
- Use `usize` and `isize` for sizes and pointer-related indexing.
- Use `string` for owned text and `str` for borrowed text views.
- Treat low-level pointer primitives as boundary tools, not default application code.

## Next Steps

- [Arrays](/guide/types/arrays) - Fixed-size arrays and indexing
- [Structs](/guide/types/structs) - Named data types and methods
- [Generics](/guide/types/generics) - Type parameters
