# Primitive Types

Vex provides a comprehensive set of primitive types for numeric, boolean, and character data.

## Integer Types

### Signed Integers

| Type | Size | Range |
|------|------|-------|
| `i8` | 8 bits | -128 to 127 |
| `i16` | 16 bits | -32,768 to 32,767 |
| `i32` | 32 bits | -2³¹ to 2³¹-1 |
| `i64` | 64 bits | -2⁶³ to 2⁶³-1 |
| `i128` | 128 bits | -2¹²⁷ to 2¹²⁷-1 |

### Unsigned Integers

| Type | Size | Range |
|------|------|-------|
| `u8` | 8 bits | 0 to 255 |
| `u16` | 16 bits | 0 to 65,535 |
| `u32` | 32 bits | 0 to 2³²-1 |
| `u64` | 64 bits | 0 to 2⁶⁴-1 |
| `u128` | 128 bits | 0 to 2¹²⁸-1 |

### Platform-Dependent Types

| Type | Size | Description |
|------|------|-------------|
| `isize` | Platform | Pointer-sized signed integer |
| `usize` | Platform | Pointer-sized unsigned integer |

### Usage

```vex
// Default integer type is i32
let x = 42         // i32

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

| Type | Size | Precision | Range |
|------|------|-----------|-------|
| `f16` | 16 bits | ~3 digits | ±65,504 |
| `f32` | 32 bits | ~7 digits | ±3.4×10³⁸ |
| `f64` | 64 bits | ~15 digits | ±1.8×10³⁰⁸ |

### Usage

```vex
// Default float type is f64
let pi = 3.14159       // f64

// Scientific notation
let avogadro = 6.022e23
let planck = 6.626e-34

// Explicit type suffix
let half = 0.5f32      // f32
let precise = 3.14159265358979f64

// Special values
let infinity = f64.INFINITY
let neg_infinity = f64.NEG_INFINITY
let nan = f64.NAN
```

### f16 (Half Precision)

Useful for GPU operations and ML:

```vex
let weights: [f16; 1024] = load_model_weights()
let result = neural_network.forward(weights)
```

## Boolean Type

```vex
let yes: bool = true
let no: bool = false

// Boolean operations
let and_result = true && false   // false
let or_result = true || false    // true
let not_result = !true           // false

// Comparison results
let is_equal = (5 == 5)          // true
let is_greater = (10 > 5)        // true
```

## Character Type

The `char` type represents a Unicode scalar value (4 bytes):

```vex
let letter: char = 'A'
let emoji: char = '🚀'
let chinese: char = '中'
let escape: char = '\n'

// Unicode escapes
let heart: char = '\u{2764}'     // ❤
let smiley: char = '\u{1F600}'   // 😀
```

### Character Methods

```vex
let c = 'A'

c.is_alphabetic()    // true
c.is_numeric()       // false
c.is_alphanumeric()  // true
c.is_whitespace()    // false
c.is_uppercase()     // true
c.is_lowercase()     // false
c.to_lowercase()     // 'a'
c.to_uppercase()     // 'A'
```

## String and str

Vex provides two string types for different use cases:
- `String`: An owned, growable, heap-allocated string (Omni-string).
- `str`: A borrowed, non-owning string view (literal/view).

```vex
let s: str = "Hello"           // str literal
let owned: String = s.to_string() // owned copy
```

::: tip Omni-String System
Vex's string system is highly optimized. `String` uses Small String Optimization (SSO) for short text and VUMM for zero-copy sharing of long text. See [Strings](../types/strings) for details.
:::

## Complex\<T\>

The prelude provides `Complex<T>` for complex number arithmetic.

```vex
let c1 = Complex { real: 1.0, imag: 2.0 }
let c2 = Complex { real: 3.0, imag: 4.0 }
let sum = c1 + c2
```

## Unit Type

The empty tuple `()`, used for functions that don't return a value:

```vex
fn do_something(): () {
    println("Done")
}

// Usually omitted
fn do_something() {
    println("Done")
}
```

## Never Type

The `never` type represents computations that never complete:

```vex
fn infinite_loop(): never {
    loop {}
}

fn panic_always(): never {
    panic("This always panics")
}

// Useful in match arms
let value: i32 = match result {
    Ok(x) => x,
    Err(e) => panic(e)  // Returns never, coerces to i32
}
```

## Type Conversions

### Explicit Casting

```vex
let x: i32 = 42
let y: i64 = x as i64      // Widening (safe)
let z: i16 = x as i16      // Narrowing (may truncate)

let f: f64 = 3.14
let i: i32 = f as i32      // Truncates to 3

let c: char = 'A'
let n: u32 = c as u32      // 65
```

### Safe Conversions

```vex
// Using From/Into contracts
let x: i32 = 42
let y: i64 = i64.from(x)   // Guaranteed safe
let z: i64 = x.into()      // Same thing

// TryFrom for fallible conversions
let big: i64 = 1_000_000
let small: Result<i16, _> = i16.try_from(big)  // Err (overflow)
```

## Type Ranges and Constants

Each numeric type has associated constants:

```vex
i32.MIN        // -2147483648
i32.MAX        // 2147483647
i32.BITS       // 32

u64.MIN        // 0
u64.MAX        // 18446744073709551615

f64.MIN        // Smallest positive value
f64.MAX        // Largest finite value
f64.EPSILON    // Smallest difference
f64.NAN        // Not a Number
f64.INFINITY   // Positive infinity
```

## Overflow Behavior

By default, integer overflow panics in debug mode and wraps in release mode:

```vex
let! x: u8 = 255
x += 1  // Debug: panic! Release: x = 0

// Explicit wrapping
let y = x.wrapping_add(1)  // Always wraps: 0

// Explicit saturation
let z = x.saturating_add(1)  // Clamps: 255

// Checked operations
let result = x.checked_add(1)  // Returns Option<u8>: None
```

## Best Practices

1. **Use `i32` for general integers** - Default, fast on all platforms
2. **Use `usize` for indices** - Matches platform pointer size
3. **Use `f64` for general floats** - Better precision, same speed on modern CPUs
4. **Prefer explicit types at API boundaries** - Clarity over inference
5. **Use checked arithmetic for untrusted input** - Prevent overflow bugs

```vex
// Good: Explicit types at boundaries
fn process_chunk(data: &[u8], offset: usize, len: usize): Result<Vec<u8>, Error> {
    // ...
}

// Good: Let inference work internally
let sum = 0
for n in items { sum += n }
```

## Next Steps

- [Compound Types](/guide/types/compound) - Arrays, tuples, slices
- [User-Defined Types](/guide/types/structs) - Structs and enums
- [Generics](/guide/types/generics) - Type parameters
