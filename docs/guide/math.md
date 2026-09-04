# Math Namespace

The `Math` namespace provides mathematical functions with compiler and runtime implementations that vary by operation and target. Some array and tensor forms can lower through the data-parallel pipeline, but support and vectorization are not blanket guarantees.

> **No import needed.** `Math.*` is a builtin namespace available everywhere.

## Scalar vs Vectorized Usage

Scalar forms are the most portable surface. Array and tensor forms are available only where the selected function and compiler path support them:

```vex
// Scalar: single value
let s = Math.sin(1.5708)              // 1.0

// Array: auto-vectorized to single SIMD instruction
let angles = [0.0, 1.5708, 3.14159, 4.71239]
let sines = Math.sin(angles)          // [0.0, 1.0, 0.0, -1.0]
// Compiles to: single SIMD sin instruction on all 4 elements

// Span: works on non-owning views
let view: Span<f64> = getData()
let logs = Math.log(view)             // auto-vectorized

// Tensor: static SIMD vector types
let t: Tensor<f64, 8> = [1.0; 8]
let exp_t = Math.exp(t)               // single SIMD exp instruction

// DynTensor: runtime-sized tensors
let big: Tensor<f64> = loadModel()
let activated = Math.relu(big)        // loop-vectorized in SIMD chunks
```

This is the core Vex philosophy: **write plain math, get hardware SIMD automatically.**

## Quick Examples

```vex
// Scalars
let angle = Math.PI / 4.0
let s = Math.sin(angle)              // 0.7071...
let x = Math.sqrt(144.0)             // 12.0
let clamped = Math.clamp(x, 0.0, 1.0)

// Arrays and Tensors (auto-vectorized)
let vals = [1.0, 4.0, 9.0, 16.0]
let roots = Math.sqrt(vals)          // [1.0, 2.0, 3.0, 4.0] -- single SIMD instr
let relued = Math.relu([-1.0, 2.0, -3.0, 4.0])  // [0.0, 2.0, 0.0, 4.0]
```

## Trigonometric

Every function below accepts `f64`, `[f64; N]`, `Span<f64>`, `Tensor<f64, N>`, or `Tensor<f64>`.
When given an array/tensor, the operation auto-vectorizes to SIMD.

| Function           | Scalar Signature               | Description           |
| ------------------ | ------------------------------ | --------------------- |
| `Math.sin(x)`      | `T, [T;N], Span<T>, Tensor<T>` | Sine (radians)        |
| `Math.cos(x)`      | `T, [T;N], Span<T>, Tensor<T>` | Cosine (radians)      |
| `Math.tan(x)`      | `T, [T;N], Span<T>, Tensor<T>` | Tangent (radians)     |
| `Math.asin(x)`     | `T, [T;N], Span<T>, Tensor<T>` | Arc sine → radians    |
| `Math.acos(x)`     | `T, [T;N], Span<T>, Tensor<T>` | Arc cosine → radians  |
| `Math.atan(x)`     | `T, [T;N], Span<T>, Tensor<T>` | Arc tangent → radians |
| `Math.atan2(y, x)` | `T, [T;N], Span<T>, Tensor<T>` | Two-arg arc tangent   |

## Hyperbolic

| Function        | Signature                      | Description                |
| --------------- | ------------------------------ | -------------------------- |
| `Math.sinh(x)`  | `T, [T;N], Span<T>, Tensor<T>` | Hyperbolic sine            |
| `Math.cosh(x)`  | `T, [T;N], Span<T>, Tensor<T>` | Hyperbolic cosine          |
| `Math.tanh(x)`  | `T, [T;N], Span<T>, Tensor<T>` | Hyperbolic tangent         |
| `Math.asinh(x)` | `T, [T;N], Span<T>, Tensor<T>` | Inverse hyperbolic sine    |
| `Math.acosh(x)` | `T, [T;N], Span<T>, Tensor<T>` | Inverse hyperbolic cosine  |
| `Math.atanh(x)` | `T, [T;N], Span<T>, Tensor<T>` | Inverse hyperbolic tangent |

## Exponential & Logarithmic

| Function        | Signature                      | Description              |
| --------------- | ------------------------------ | ------------------------ |
| `Math.exp(x)`   | `T, [T;N], Span<T>, Tensor<T>` | e^x                      |
| `Math.exp2(x)`  | `T, [T;N], Span<T>, Tensor<T>` | 2^x                      |
| `Math.expm1(x)` | `T, [T;N], Span<T>, Tensor<T>` | e^x - 1 (precise near 0) |
| `Math.log(x)`   | `T, [T;N], Span<T>, Tensor<T>` | Natural log (ln)         |
| `Math.ln(x)`    | `T, [T;N], Span<T>, Tensor<T>` | Natural log (alias)      |
| `Math.log2(x)`  | `T, [T;N], Span<T>, Tensor<T>` | Base-2 logarithm         |
| `Math.log10(x)` | `T, [T;N], Span<T>, Tensor<T>` | Base-10 logarithm        |
| `Math.log1p(x)` | `T, [T;N], Span<T>, Tensor<T>` | ln(1+x) (precise near 0) |

## Power & Root

| Function              | Signature                      | Description            |
| --------------------- | ------------------------------ | ---------------------- |
| `Math.pow(base, exp)` | `T, [T;N], Span<T>, Tensor<T>` | base^exp               |
| `Math.sqrt(x)`        | `T, [T;N], Span<T>, Tensor<T>` | Square root            |
| `Math.cbrt(x)`        | `T, [T;N], Span<T>, Tensor<T>` | Cube root              |
| `Math.rsqrt(x)`       | `T, [T;N], Span<T>, Tensor<T>` | 1/√x (reciprocal sqrt) |
| `Math.copysign(x, y)` | `T, [T;N], Span<T>, Tensor<T>` | x with sign of y       |

## Rounding

| Function        | Signature                      | Description                          |
| --------------- | ------------------------------ | ------------------------------------ |
| `Math.floor(x)` | `T, [T;N], Span<T>, Tensor<T>` | Round towards -∞                     |
| `Math.ceil(x)`  | `T, [T;N], Span<T>, Tensor<T>` | Round towards +∞                     |
| `Math.round(x)` | `T, [T;N], Span<T>, Tensor<T>` | Round to nearest integer             |
| `Math.trunc(x)` | `T, [T;N], Span<T>, Tensor<T>` | Truncate towards 0                   |
| `Math.rint(x)`  | `T, [T;N], Span<T>, Tensor<T>` | Round to nearest (banker's rounding) |

## Comparison & Clamping

| Function                | Signature                      | Description                   |
| ----------------------- | ------------------------------ | ----------------------------- |
| `Math.min(a, b)`        | `T, [T;N], Span<T>, Tensor<T>` | Minimum of two values         |
| `Math.max(a, b)`        | `T, [T;N], Span<T>, Tensor<T>` | Maximum of two values         |
| `Math.fmax(a, b)`       | `T, [T;N], Span<T>, Tensor<T>` | Float max (NaN-safe)          |
| `Math.fmin(a, b)`       | `T, [T;N], Span<T>, Tensor<T>` | Float min (NaN-safe)          |
| `Math.clamp(x, lo, hi)` | `T, [T;N], Span<T>, Tensor<T>` | Clamp x to [lo, hi]           |
| `Math.abs(x)`           | `T, [T;N], Span<T>, Tensor<T>` | Absolute value (int or float) |
| `Math.fabs(x)`          | `T, [T;N], Span<T>, Tensor<T>` | Float absolute value          |
| `Math.sign(x)`          | `T, [T;N], Span<T>, Tensor<T>` | Returns -1, 0, or +1          |

## Activation Functions (ML)

| Function          | Signature                      | Description    |
| ----------------- | ------------------------------ | -------------- |
| `Math.relu(x)`    | `T, [T;N], Span<T>, Tensor<T>` | max(0, x)      |
| `Math.sigmoid(x)` | `T, [T;N], Span<T>, Tensor<T>` | 1/(1+e^(-x))   |
| `Math.erf(x)`     | `T, [T;N], Span<T>, Tensor<T>` | Error function |

## Bit Operations

| Function               | Signature                      | Description                |
| ---------------------- | ------------------------------ | -------------------------- |
| `Math.popcount(x)`     | `T, [T;N], Span<T>, Tensor<T>` | Count set bits             |
| `Math.clz(x)`          | `T, [T;N], Span<T>, Tensor<T>` | Count leading zeros        |
| `Math.ctz(x)`          | `T, [T;N], Span<T>, Tensor<T>` | Count trailing zeros       |
| `Math.nextPowerOf2(x)` / `Math.nextPow2(x)` | integer scalar `T -> T` | Width-preserving next power of 2 |
| `Math.bswap(x)`        | `T, [T;N], Span<T>, Tensor<T>` | Byte-swap (endian reverse) |

### Scalar next power of two at compile time

Both spellings preserve the operand's integer type and bit width, including
`usize`/`isize` on the compilation target and 128-bit integers. Known scalar
operands can be evaluated in `#const` or a const function through the ordinary
`Math` API; no separate intrinsic spelling is needed.

```vex
let buckets: usize = #const { Math.nextPow2(1000001 as usize) }; // 1048576
let high: u128 = #const { Math.nextPowerOf2(((1 as u128) << 100) + 1 as u128) };
```

This is a **wrapping bit-pattern operation**: zero returns zero, and a result
outside the operand width wraps to zero. Signed inputs retain signedness and
use their underlying bits; for example, `Math.nextPow2(127 as i8)` yields
`-128`. For allocation sizes use unsigned inputs and checked `Layout`/collection
APIs, which reject invalid extents. This scalar CTFE support does not imply
array, Span, Tensor, or GPU next-power support.

## Float Bit Representation

`Math.toBits` and `Math.fromBits` reinterpret a scalar's representation. They
are not numeric casts and preserve signed zero and every NaN payload bit.

| Function | Signature | Result |
|---|---|---|
| `Math.toBits(x)` | `f32 -> u32`, `f64 -> u64` | Same-width IEEE-754 bits |
| `Math.fromBits(x)` | `u32 -> f32`, `u64 -> f64` | Same-width IEEE-754 value |

```vex
let negativeZero = Math.fromBits(0x8000000000000000 as u64);
let payload = Math.toBits(negativeZero); // exact same u64
```

Both operations lower to one LLVM SSA `bitcast`. They perform no memory copy,
allocation, libc call or FFI transition. Other integer widths and signed
integer arguments are rejected rather than implicitly narrowed or re-signed.

## Angle Conversion

| Function           | Signature                      | Description             |
| ------------------ | ------------------------------ | ----------------------- |
| `Math.degrees(x)`  | `T, [T;N], Span<T>, Tensor<T>` | Radians → degrees       |
| `Math.radians(x)`  | `T, [T;N], Span<T>, Tensor<T>` | Degrees → radians       |
| `Math.degreesf(x)` | `T, [T;N], Span<T>, Tensor<T>` | Radians → degrees (f32) |
| `Math.radiansf(x)` | `T, [T;N], Span<T>, Tensor<T>` | Degrees → radians (f32) |

```vex
let angle_deg = Math.degrees(Math.PI);   // 180.0
let angle_rad = Math.radians(90.0);      // 1.5707...
```

## Random Numbers

| Function        | Signature                      | Description                |
| --------------- | ------------------------------ | -------------------------- |
| `Math.random()` | `T, [T;N], Span<T>, Tensor<T>` | Random float in [0.0, 1.0) |

Fast PRNG (xoshiro256++) — **NOT cryptographically secure**. For crypto-safe randomness, use [`Crypto.secureRand()`](/guide/crypto).

```vex
fn main(): i32 {
    let r = Math.random();       // 0.0 ≤ r < 1.0
    let dice = (r * 6.0) as i32 + 1;  // 1-6
    println("Rolled: ", dice);
    return 0;
}
```

## Constants

| Constant            | Value         | Description       |
| ------------------- | ------------- | ----------------- |
| `Math.PI`           | 3.14159265... | π                 |
| `Math.E`            | 2.71828182... | Euler's number    |
| `Math.TAU`          | 6.28318530... | τ = 2π            |
| `Math.SQRT2`        | 1.41421356... | √2                |
| `Math.LN2`          | 0.69314718... | ln(2)             |
| `Math.LN10`         | 2.30258509... | ln(10)            |
| `Math.LOG2E`        | 1.44269504... | log₂(e)           |
| `Math.LOG10E`       | 0.43429448... | log₁₀(e)          |
| `Math.FRAC_PI_2`    | 1.57079632... | π/2               |
| `Math.FRAC_PI_4`    | 0.78539816... | π/4               |
| `Math.FRAC_1_SQRT2` | 0.70710678... | 1/√2              |
| `Math.INF`          | ∞             | Positive infinity |
| `Math.NAN`          | NaN           | Not-a-Number      |

```vex
let area = Math.PI * radius * radius;
let circumference = Math.TAU * radius;
let diagonal = side * Math.SQRT2;
```

## f32 Variants

Every f64 math function has an f32 counterpart with `f` suffix:

| f64                  | f32                            | Description |
| -------------------- | ------------------------------ | ----------- |
| `Math.sin(x)`        | `T, [T;N], Span<T>, Tensor<T>` | Sine        |
| `Math.cos(x)`        | `T, [T;N], Span<T>, Tensor<T>` | Cosine      |
| `Math.exp(x)`        | `T, [T;N], Span<T>, Tensor<T>` | Exponential |
| `Math.log(x)`        | `T, [T;N], Span<T>, Tensor<T>` | Natural log |
| `Math.sqrt(x)`       | `T, [T;N], Span<T>, Tensor<T>` | Square root |
| `Math.floor(x)`      | `T, [T;N], Span<T>, Tensor<T>` | Floor       |
| `Math.ceil(x)`       | `T, [T;N], Span<T>, Tensor<T>` | Ceiling     |
| `Math.round(x)`      | `T, [T;N], Span<T>, Tensor<T>` | Round       |
| `Math.trunc(x)`      | `T, [T;N], Span<T>, Tensor<T>` | Truncate    |
| `Math.abs(x)`        | `T, [T;N], Span<T>, Tensor<T>` | Float abs   |
| `Math.exp2(x)`       | `T, [T;N], Span<T>, Tensor<T>` | 2^x         |
| `Math.log2(x)`       | `T, [T;N], Span<T>, Tensor<T>` | Base-2 log  |
| `Math.log10(x)`      | `T, [T;N], Span<T>, Tensor<T>` | Base-10 log |
| `Math.pow(a,b)`      | `T, [T;N], Span<T>, Tensor<T>` | Power       |
| `Math.copysign(x,y)` | `T, [T;N], Span<T>, Tensor<T>` | Copy sign   |
| `Math.fmax(a,b)`     | `T, [T;N], Span<T>, Tensor<T>` | Float max   |
| `Math.fmin(a,b)`     | `T, [T;N], Span<T>, Tensor<T>` | Float min   |

```vex
// Use f32 variants for ML workloads
let inv_rms = 1.0 as f32 / Math.sqrtf(mean_sq + eps);
let activated = Math.expf(neg_x);
```

## LLVM Backend

Every `Math.*` function maps to a single LLVM intrinsic or optimized libm call:

```
Math.sin(x)     →  @llvm.sin.f64(x)        (1-2 cycles)
Math.sinf(x)    →  @llvm.sin.f32(x)        (1 cycle, HW)
Math.sqrt(x)    →  @llvm.sqrt.f64(x)       (1 cycle, HW)
Math.abs(x)     →  @llvm.fabs.f64(x)       (1 cycle)
Math.degrees(x) →  fmul x, 57.2957...      (1 cycle, inline)
Math.PI         →  const double 3.14159... (zero cost)
```

## Next Steps

- [Crypto Namespace](/guide/crypto) — Hardware-accelerated cryptographic primitives
- [Bit Namespace](/guide/bit) — Parallel bit manipulation
- [SIMD](/guide/simd) — Auto-vectorization for arrays
