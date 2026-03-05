# Math Namespace

The `Math` namespace provides hardware-accelerated mathematical functions. All functions map directly to LLVM intrinsics or optimized C library calls — no overhead, single-instruction where possible.

> **No import needed.** `Math.*` is a builtin namespace available everywhere.

## Quick Examples

```vex
let angle = Math.PI / 4.0;
let s = Math.sin(angle);           // 0.7071...
let c = Math.cos(angle);           // 0.7071...

let x = Math.sqrt(144.0);          // 12.0
let p = Math.pow(2.0, 10.0);       // 1024.0
let bits = Math.popcount(0xFF);     // 8

let r = Math.random();             // [0.0, 1.0) random float
let clamped = Math.clamp(x, 0.0, 1.0);
```

## Trigonometric

| Function | Signature | Description |
|----------|-----------|-------------|
| `Math.sin(x)` | `f64 → f64` | Sine (radians) |
| `Math.cos(x)` | `f64 → f64` | Cosine (radians) |
| `Math.tan(x)` | `f64 → f64` | Tangent (radians) |
| `Math.asin(x)` | `f64 → f64` | Arc sine → radians |
| `Math.acos(x)` | `f64 → f64` | Arc cosine → radians |
| `Math.atan(x)` | `f64 → f64` | Arc tangent → radians |
| `Math.atan2(y, x)` | `(f64, f64) → f64` | Two-arg arc tangent |

## Hyperbolic

| Function | Signature | Description |
|----------|-----------|-------------|
| `Math.sinh(x)` | `f64 → f64` | Hyperbolic sine |
| `Math.cosh(x)` | `f64 → f64` | Hyperbolic cosine |
| `Math.tanh(x)` | `f64 → f64` | Hyperbolic tangent |
| `Math.asinh(x)` | `f64 → f64` | Inverse hyperbolic sine |
| `Math.acosh(x)` | `f64 → f64` | Inverse hyperbolic cosine |
| `Math.atanh(x)` | `f64 → f64` | Inverse hyperbolic tangent |

## Exponential & Logarithmic

| Function | Signature | Description |
|----------|-----------|-------------|
| `Math.exp(x)` | `f64 → f64` | e^x |
| `Math.exp2(x)` | `f64 → f64` | 2^x |
| `Math.expm1(x)` | `f64 → f64` | e^x - 1 (precise near 0) |
| `Math.log(x)` | `f64 → f64` | Natural log (ln) |
| `Math.ln(x)` | `f64 → f64` | Natural log (alias) |
| `Math.log2(x)` | `f64 → f64` | Base-2 logarithm |
| `Math.log10(x)` | `f64 → f64` | Base-10 logarithm |
| `Math.log1p(x)` | `f64 → f64` | ln(1+x) (precise near 0) |

## Power & Root

| Function | Signature | Description |
|----------|-----------|-------------|
| `Math.pow(base, exp)` | `(f64, f64) → f64` | base^exp |
| `Math.sqrt(x)` | `f64 → f64` | Square root |
| `Math.cbrt(x)` | `f64 → f64` | Cube root |
| `Math.rsqrt(x)` | `f64 → f64` | 1/√x (reciprocal sqrt) |
| `Math.copysign(x, y)` | `(f64, f64) → f64` | x with sign of y |

## Rounding

| Function | Signature | Description |
|----------|-----------|-------------|
| `Math.floor(x)` | `f64 → f64` | Round towards -∞ |
| `Math.ceil(x)` | `f64 → f64` | Round towards +∞ |
| `Math.round(x)` | `f64 → f64` | Round to nearest integer |
| `Math.trunc(x)` | `f64 → f64` | Truncate towards 0 |
| `Math.rint(x)` | `f64 → f64` | Round to nearest (banker's rounding) |

## Comparison & Clamping

| Function | Signature | Description |
|----------|-----------|-------------|
| `Math.min(a, b)` | `(numeric, numeric) → numeric` | Minimum of two values |
| `Math.max(a, b)` | `(numeric, numeric) → numeric` | Maximum of two values |
| `Math.fmax(a, b)` | `(f64, f64) → f64` | Float max (NaN-safe) |
| `Math.fmin(a, b)` | `(f64, f64) → f64` | Float min (NaN-safe) |
| `Math.clamp(x, lo, hi)` | `(numeric, numeric, numeric) → numeric` | Clamp x to [lo, hi] |
| `Math.abs(x)` | `numeric → numeric` | Absolute value (int or float) |
| `Math.fabs(x)` | `f64 → f64` | Float absolute value |
| `Math.sign(x)` | `f64 → f64` | Returns -1, 0, or +1 |

## Activation Functions (ML)

| Function | Signature | Description |
|----------|-----------|-------------|
| `Math.relu(x)` | `f64 → f64` | max(0, x) |
| `Math.sigmoid(x)` | `f64 → f64` | 1/(1+e^(-x)) |
| `Math.erf(x)` | `f64 → f64` | Error function |

## Bit Operations

| Function | Signature | Description |
|----------|-----------|-------------|
| `Math.popcount(x)` | `int → int` | Count set bits |
| `Math.clz(x)` | `int → int` | Count leading zeros |
| `Math.ctz(x)` | `int → int` | Count trailing zeros |
| `Math.nextPowerOf2(x)` | `int → int` | Next power of 2 |
| `Math.bswap(x)` | `int → int` | Byte-swap (endian reverse) |

## Angle Conversion

| Function | Signature | Description |
|----------|-----------|-------------|
| `Math.degrees(x)` | `f64 → f64` | Radians → degrees |
| `Math.radians(x)` | `f64 → f64` | Degrees → radians |
| `Math.degreesf(x)` | `f32 → f32` | Radians → degrees (f32) |
| `Math.radiansf(x)` | `f32 → f32` | Degrees → radians (f32) |

```vex
let angle_deg = Math.degrees(Math.PI);   // 180.0
let angle_rad = Math.radians(90.0);      // 1.5707...
```

## Random Numbers

| Function | Signature | Description |
|----------|-----------|-------------|
| `Math.random()` | `→ f64` | Random float in [0.0, 1.0) |

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

| Constant | Value | Description |
|----------|-------|-------------|
| `Math.PI` | 3.14159265... | π |
| `Math.E` | 2.71828182... | Euler's number |
| `Math.TAU` | 6.28318530... | τ = 2π |
| `Math.SQRT2` | 1.41421356... | √2 |
| `Math.LN2` | 0.69314718... | ln(2) |
| `Math.LN10` | 2.30258509... | ln(10) |
| `Math.LOG2E` | 1.44269504... | log₂(e) |
| `Math.LOG10E` | 0.43429448... | log₁₀(e) |
| `Math.FRAC_PI_2` | 1.57079632... | π/2 |
| `Math.FRAC_PI_4` | 0.78539816... | π/4 |
| `Math.FRAC_1_SQRT2` | 0.70710678... | 1/√2 |
| `Math.INF` | ∞ | Positive infinity |
| `Math.NAN` | NaN | Not-a-Number |

```vex
let area = Math.PI * radius * radius;
let circumference = Math.TAU * radius;
let diagonal = side * Math.SQRT2;
```

## f32 Variants

Every f64 math function has an f32 counterpart with `f` suffix:

| f64 | f32 | Description |
|-----|-----|-------------|
| `Math.sin(x)` | `Math.sinf(x)` | Sine |
| `Math.cos(x)` | `Math.cosf(x)` | Cosine |
| `Math.exp(x)` | `Math.expf(x)` | Exponential |
| `Math.log(x)` | `Math.logf(x)` | Natural log |
| `Math.sqrt(x)` | `Math.sqrtf(x)` | Square root |
| `Math.floor(x)` | `Math.floorf(x)` | Floor |
| `Math.ceil(x)` | `Math.ceilf(x)` | Ceiling |
| `Math.round(x)` | `Math.roundf(x)` | Round |
| `Math.trunc(x)` | `Math.truncf(x)` | Truncate |
| `Math.abs(x)` | `Math.fabsf(x)` | Float abs |
| `Math.exp2(x)` | `Math.exp2f(x)` | 2^x |
| `Math.log2(x)` | `Math.log2f(x)` | Base-2 log |
| `Math.log10(x)` | `Math.log10f(x)` | Base-10 log |
| `Math.pow(a,b)` | `Math.powf(a,b)` | Power |
| `Math.copysign(x,y)` | `Math.copysignf(x,y)` | Copy sign |
| `Math.fmax(a,b)` | `Math.fmaxf(a,b)` | Float max |
| `Math.fmin(a,b)` | `Math.fminf(a,b)` | Float min |

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
