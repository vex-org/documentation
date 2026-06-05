# SIMD Operations -- Deep Dive

Vex provides first-class SIMD support. Arrays automatically vectorize to SIMD instructions without any manual intrinsics. This page covers the full SIMD operation set beyond the basic overview.

## SIMD Model

Vex treats arrays as SIMD vectors whenever you perform arithmetic or comparisons on them. The compiler automatically selects the best instruction set for your target (SSE, AVX2, AVX-512 on x86; NEON on ARM).

### Auto-Vectorization Threshold

| Array Size                   | Strategy                                  |
| ---------------------------- | ----------------------------------------- |
| <= 64 bytes (e.g., [f64; 8]) | Single SIMD instruction (register)        |
| > 64 bytes                   | Loop-based vectorization with SIMD chunks |

```vex
// <= 64 bytes: compiles to single vaddps (AVX) or vaddpd (AVX-512)
let a = [1.0f32, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]
let b = [8.0f32, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0]
let c = a + b
// LLVM IR: %c = fadd <8 x f32> %a, %b

// > 64 bytes: loop with SIMD body
let big: [f64; 64] = [0.0; 64]
let other: [f64; 64] = [1.0; 64]
let result = big + other
// Compiler emits: for i in 0..64 step 4 { simd_add_4_f64 }
```

## Scalar Broadcast

When one operand is a scalar and the other is a tensor, the scalar is automatically broadcast:

```vex
let values = [1.0, 2.0, 3.0, 4.0]

let plus_two = values + 2.0      // [3.0, 4.0, 5.0, 6.0]
let times_ten = values * 10.0    // [10.0, 20.0, 30.0, 40.0]
let halved = values / 2.0        // [0.5, 1.0, 1.5, 2.0]

// Broadcast with comparisons
let above_two = values > 2.0     // Mask<4> = [false, false, true, true]
```

## SIMD Comparison and Masks

Comparisons produce `Mask<N>`, a SIMD boolean vector:

```vex
let a = [1.0, 5.0, 3.0, 8.0]
let b = [2.0, 3.0, 3.0, 1.0]

let eq = a == b     // Mask<4> = [false, false, true, false]
let lt = a < b      // Mask<4> = [true, false, false, false]
let gt = a > b      // Mask<4> = [false, true, false, true]
```

### Mask Operations

```vex
let m1 = a > 2.0     // Mask<4>
let m2 = a < 6.0     // Mask<4>

// Bitwise mask operations
let both = m1 & m2   // logical AND of masks
let either = m1 | m2  // logical OR
let not_m1 = !m1     // logical NOT of mask
```

### Mask-to-Bitmask Conversion

```vex
let mask: Mask<8> = a > 0

let bits: u8 = mask.toBitmask()   // e.g., 0b1011_0000
let restored: Mask<8> = Mask.fromBitmask(bits)

// Query mask state
let anyTrue = mask.any()          // true if any lane is true
let allTrue = mask.all()          // true if all lanes are true
let count = mask.countSetBits()   // number of true lanes (POPCNT)
let firstIdx = mask.firstSet()    // index of first true lane (TZCNT)
```

## Saturating Arithmetic

Saturating operations clamp results to the type's valid range instead of wrapping:

```vex
let a: [u8; 4] = [200, 100, 50, 0]
let b: [u8; 4] = [100, 200, 200, 255]

let sat_add = a +| b    // [255, 255, 250, 255]  -- 200+100=255 (saturated), not 44 (wrap)
let sat_sub = a -| b    // [100, 0, 0, 0]         -- 50-200=0 (saturated), not 106 (wrap)
let sat_mul = a *| b    // element-wise with saturation

// Use cases
let brightness = pixel +| 50u8   // safely increase brightness, never overflow
let darken = pixel -| 30u8       // safely decrease, never underflow
```

## Min/Max Operations

```vex
let a = [10, 5, 20, 15]
let b = [8, 12, 7, 25]

let mins = a <? b     // [8, 5, 7, 15]   -- element-wise min
let maxs = a >? b     // [10, 12, 20, 25] -- element-wise max
```

## Fused Multiply-Add (FMA)

FMA computes `a * b + c` in a single instruction with a single rounding step (higher precision than separate multiply + add):

```vex
let a = [1.0, 2.0, 3.0, 4.0]
let b = [5.0, 6.0, 7.0, 8.0]
let c = [0.1, 0.2, 0.3, 0.4]

// Uses FMA: a * b + c in one instruction with one rounding
let result = a *+ b + c    // or: a *+ b gives intermediate, then + c

// Common use: ax + y pattern
fn axpy(alpha: f64, x: Tensor<f64, 4>, y: Tensor<f64, 4>): Tensor<f64, 4> {
    return alpha *+ x + y   // single FMA instruction per element
}
```

## Carry-less Multiply (CLMUL)

Bitwise multiplication without carry propagation. Used in cryptography (GHASH for AES-GCM, CRC calculation):

```vex
let a: u64 = 0x1234_5678_9ABC_DEF0
let b: u64 = 0x0F0F_0F0F_0F0F_0F0F

let clmul_result = a *^ b   // carry-less multiply

// CRC-32 computation with CLMUL
fn crc32_pclmul(data: u64, polynomial: u64): u64 {
    return data *^ polynomial
}
```

## Bit Rotation

Circular shift operations that wrap bits around:

```vex
let x: u8 = 0b1000_0001   // 129

let rot_l = x <<< 1        // 0b0000_0011 = 3   (MSB wraps to LSB)
let rot_r = x >>> 1        // 0b1100_0000 = 192 (LSB wraps to MSB)
let rot_l_3 = x <<< 3      // 0b0000_1100 = 12

// Cryptography example: rotate in a round function
fn rotate_left_32(x: u32, n: i32): u32 {
    return x <<< n
}
```

## Horizontal Reductions

Collapse a tensor/array to a scalar by applying an associative operation across all elements.

```vex
let data = [10.0, 20.0, 30.0, 40.0]

// Mathematical reductions
let sum = <+ data           // 100.0
let product = <* data       // 240000.0

// Bitwise reductions (integer tensors)
let bits: [u32; 4] = [0xFF00, 0x0FF0, 0x00FF, 0xF00F]
let all_and = <& bits       // 0x0000
let any_or = <| bits        // 0xFFFF

// Statistical reductions
let min_val = <?| data      // 10.0
let max_val = >?| data      // 40.0
```

### Reduction Use Cases

```vex
// Sum of products (dot product via SIMD)
fn dotProduct(a: Tensor<f64, 4>, b: Tensor<f64, 4>): f64 {
    return <+ (a * b)       // multiply element-wise, then sum
}

// All elements match condition
fn allPositive(data: Tensor<f64, 4>): bool {
    return (data > 0.0).all()
}

// Any element matches
fn hasNaN(data: Tensor<f64, 4>): bool {
    return (data != data).any()
}
```

## Matrix Operations

### Matrix Multiply (`<*>`)

```vex
// 2x2 matrices flattened as [f64; 4] in row-major order
let A = [1.0, 2.0,   // row 0
         3.0, 4.0]   // row 1
let B = [5.0, 6.0,
         7.0, 8.0]

let C = A <*> B
// C = [1*5+2*7, 1*6+2*8, 3*5+4*7, 3*6+4*8]
//   = [19.0, 22.0, 43.0, 50.0]
```

### Matrix Power (`<^>`)

```vex
let M = [2.0, 0.0,
         0.0, 2.0]

let M_cubed = M <^> 3
// [8.0, 0.0, 0.0, 8.0]
```

### Linear Solve (`<\>`)

Solves `Ax = b` for `x`:

```vex
let A = [2.0, 1.0,
         1.0, 3.0]
let b = [5.0, 7.0]

let x = A <\> b
// x = [1.6, 1.8] (solves 2x0+x1=5, x0+3x1=7)
```

## SIMD Math Intrinsics

Element-wise math functions that auto-vectorize on tensors and arrays:

```vex
let angles = [0.0, 1.5708, 3.14159, 4.71239]

// Trigonometric (element-wise, SIMD-accelerated)
let sines = angles.sin()           // [0.0, 1.0, 0.0, -1.0]
let cosines = angles.cos()         // [1.0, 0.0, -1.0, 0.0]
let tangents = angles.tan()

// Exponential and logarithmic
let values = [1.0, 2.0, 10.0, 100.0]
let exps = values.exp()            // e^x
let logs = values.log()            // natural log
let log2s = values.log2()          // base-2 log
let log10s = values.log10()        // base-10 log
let exp2s = values.exp2()          // 2^x

// Rounding
let nums = [1.3, 2.7, -1.3, -2.7]
let floors = nums.floor()          // [1.0, 2.0, -2.0, -3.0]
let ceils = nums.ceil()            // [2.0, 3.0, -1.0, -2.0]
let truncs = nums.trunc()          // [1.0, 2.0, -1.0, -2.0]
let rounds = nums.round()          // [1.0, 3.0, -1.0, -3.0]
let rints = nums.rint()            // round to nearest even

// Absolute and square root
let abs_vals = [-5.0, 3.0, -2.0, 7.0].abs()   // [5.0, 3.0, 2.0, 7.0]
let roots = [4.0, 9.0, 16.0, 25.0].sqrt()      // [2.0, 3.0, 4.0, 5.0]
```

## Gather and Scatter

Indexed memory access for irregular data patterns:

### Gather

`gather(base, indices)` loads elements at positions specified by indices:

```vex
let data = [10.0, 20.0, 30.0, 40.0, 50.0]
let indices = [0, 2, 4, 1]

let gathered = data.gather(indices)
// gathered = [10.0, 30.0, 50.0, 20.0]
// gathered[i] = data[indices[i]]
```

### Scatter

`scatter(base, indices, updates)` writes updates to positions specified by indices:

```vex
let! result = [0.0, 0.0, 0.0, 0.0, 0.0]
let indices = [0, 3, 1]
let updates = [100.0, 300.0, 200.0]

result.scatter(indices, updates)
// result = [100.0, 200.0, 0.0, 300.0, 0.0]
```

### Scatter-Add (Atomic)

```vex
let! histogram = [0, 0, 0, 0, 0]
let bins = [0, 2, 0, 4, 2]

histogram.scatterAdd(bins, [1, 1, 1, 1, 1])
// histogram = [2, 0, 2, 0, 1]
```

### Bounds Checking

Gather and scatter operations include bounds checks. Out-of-bounds indices trigger a panic unless disabled:

```vex
let data = [10.0, 20.0, 30.0]
// data.gather([0, 5])  // PANIC: index 5 out of bounds
```

## SIMD Backend Configuration

The SIMD backend can be tuned for specific hardware:

```vex
// Compiler-level configuration (set via compiler flags or config)
// SimdBackend {
//     simd_width: 256,        // 128, 256, or 512 bits
//     unroll_factor: 2,       // loop unroll: 1x, 2x, 4x
//     enable_prefetch: true,  // hardware prefetch hints
//     use_sve: false,         // ARM SVE scalable vectors (ARM only)
// }
```

Choose SIMD width based on target:

- `128` -- SSE (x86), NEON (ARM), baseline compatibility
- `256` -- AVX2 (x86), good balance of performance and compatibility
- `512` -- AVX-512 (x86 server), maximum throughput

## Best Practices

1. **Write plain array math** -- let Vex handle vectorization. Don't try to hand-optimize with intrinsics.
2. **Keep arrays at or below 64 bytes** for register-level SIMD (single instruction).
3. **Use horizontal reductions** instead of manual loops for sum, product, min, max.
4. **Use saturating arithmetic** for pixel/audio/signal processing where overflow is meaningless.
5. **Use FMA** for linear algebra and ML workloads -- it's faster and more accurate than separate multiply+add.
6. **Use gather/scatter** for sparse data access -- it autovectorizes index lookups.
7. **Remember masks** come from comparisons and can be combined with `&`, `|`, `!` for complex conditions.

## Related Pages

- [SIMD Overview](/guide/simd/) -- introduction to SIMD in Vex
- [Tensor & Mask](/guide/simd/tensor-mask) -- static tensors and masks
- [SIR Pipeline](/guide/simd/sir-pipeline) -- how SIMD lowers through SIR
- [Operators Reference](/guide/advanced/operators-reference) -- SIMD operators catalog
- [GPU Programming](/guide/gpu/) -- graph functions for GPU compute
