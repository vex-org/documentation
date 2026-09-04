# math

Vex's standard math library (`math`) is not just a wrapper around `libm`. It is a foundational infrastructure layer designed for the Silicon-Ready era.

## GPU and SIMD Acceleration

All functions within `math` have been modeled with the ability to "lift" them into vectors via `Tensor` Promotion. By defining components inside compiler intrinsics, mathematical routines automatically vectorize when provided with arrays or multi-element bounds.

```vex
// Calling on scalar
let a = 4.0;
let res = Math.sqrt(a); // Maps directly to llvm.sqrt.f64

// Promoted to Vector Tensor
let b: Tensor<f64, 4> = [4.0, 9.0, 16.0, 25.0];
let vRes = Math.sqrt(b); // Emits vectorized vsqrt instruction
```

## Graph Functions

`math` functions acts as primitives inside `graph fn` blocks, enabling the entire AST tree to be shipped directly off to the GPU (via Metal, SPIR-V MSL compilers in Vex SIR).

### Available Constants

- `Math.PI`
- `Math.E`
- `Math.TAU`
- `Math.SQRT_2`

### Selected Operations

- `.sqrt()`, `.exp()`, `.exp2()`, `.log()`, `.log10()`, `.pow()`
- **Trigonometry**: `.sin()`, `.cos()`, `.tan()`, `.asin()`, `.tanh()`
- **Rounding**: `.floor()`, `.ceil()`, `.round()`, `.trunc()`, `.abs()`
- **Floating Point Ops**: `.isNan()`, `.isInfinite()`, `.copysign()`

## Exact float representation

The builtin `Math.toBits` / `Math.fromBits` pair provides width-exact scalar
reinterpretation:

```vex
let bits: u64 = Math.toBits(value);   // f64 -> u64
let exact: f64 = Math.fromBits(bits); // u64 -> f64
```

The `f32 <-> u32` pair is also supported. Signed integer widths and mismatched
sizes are rejected. These are semantic compiler operations that lower to an
LLVM SSA `bitcast`; they do not allocate, touch memory, call libc or cross FFI.
Signed zero and NaN payloads therefore round-trip exactly.
