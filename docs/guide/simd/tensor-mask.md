# Tensor and Mask Types

Vex provides specialized SIMD types for high-performance vector operations: **Tensor** for numeric vectors and **Mask** for comparison results. Both come in **static** (compile-time size) and **dynamic** (runtime size) variants.

## Overview

While arrays `[T; N]` represent data in memory, **Tensor** and **Mask** represent data optimized for computation:

```
[T; N]         → Memory layout (load/store)
Tensor<T, N>   → Static: Register layout (compile-time size)
Tensor<T>      → Dynamic: Fat pointer (runtime size)
Mask<N>        → Static: Boolean vector
Mask           → Dynamic: Boolean fat pointer
```

The compiler automatically converts between these types and handles coercion from static to dynamic variants.

## Tensor Type

Vex supports two Tensor variants:

### Static Tensor: `Tensor<T, N>`

Compile-time sized SIMD vector - optimal for fixed-size data:

```vex
// These are equivalent at runtime:
let arr: [i32; 4] = [1, 2, 3, 4];
let vec: Tensor<i32, 4> = arr;  // Implicit conversion

// Operations on Tensor stay in registers
let result = vec + vec;  // No memory access!
```

### Dynamic Tensor: `Tensor<T>`

Runtime-sized tensor - ideal for variable-length data and ML workloads:

```vex
// Function accepting any-length tensor
fn sum_all(data: Tensor<f32>): f64 {
    let len = data.len();  // Runtime length query
    // ... process data
}

// Static → Dynamic coercion (automatic)
let static_vec: Tensor<i32, 4> = [1, 2, 3, 4];
let dyn_vec: Tensor<i32> = static_vec;  // Auto-coerced
```

### LLVM Mapping

| Vex Type | LLVM Type | Description |
|----------|-----------|-------------|
| `Tensor<i32, 4>` | `<4 x i32>` | 128-bit integer vector |
| `Tensor<f32, 8>` | `<8 x float>` | 256-bit float vector |
| `Tensor<i16, 16>` | `<16 x i16>` | 256-bit short vector |
| `Tensor<f64, 4>` | `<4 x double>` | 256-bit double vector |
| `Tensor<T>` | `{ ptr, i64 }` | Fat pointer (data + length) |

### Automatic Conversion

The compiler handles Tensor↔Array conversion automatically:

```vex
fn process(data: [f32; 8]): [f32; 8] {
    // Array → Tensor (implicit load into registers)
    let doubled = data * 2.0;  // Tensor operation!
    
    // Tensor → Array (implicit store back)
    return doubled;
}
```

Generated LLVM IR:
```llvm
define [8 x float] @process([8 x float] %data) {
  ; Array loaded as vector
  %vec = ... ; <8 x float>
  
  ; Pure vector multiply (no memory access)
  %doubled = fmul <8 x float> %vec, <float 2.0, ...>
  
  ; Converted back to array for return
  ret [8 x float] %result
}
```

## Mask Type

Mask types represent boolean vectors for comparisons and selections:

### Static Mask: `Mask<N>`

Compile-time sized boolean vector:

```vex
let a: [i32; 4] = [1, 5, 3, 8];
let b: [i32; 4] = [2, 3, 3, 6];

// Comparison produces Mask<4>
let eq: Mask<4> = a == b;  // [false, false, true, false]
let lt: Mask<4> = a < b;   // [true, false, false, false]
```

### Dynamic Mask: `Mask`

Runtime-sized mask for dynamic tensor operations:

```vex
// Function accepting any-length mask
fn count_true(m: Mask): i64 {
    return m.len();  // Runtime length
}

// Static → Dynamic coercion
let static_mask: Mask<4> = Mask.splat(true);
let dyn_mask: Mask = static_mask;  // Auto-coerced
```

### LLVM Mapping

| Vex Type | LLVM Type | Description |
|----------|-----------|-------------|
| `Mask<4>` | `<4 x i1>` | 4-bit mask |
| `Mask<8>` | `<8 x i1>` | 8-bit mask |
| `Mask<16>` | `<16 x i1>` | 16-bit mask |
| `Mask` | `{ ptr, i64 }` | Dynamic mask fat pointer |

### Mask Operations

```vex
let a = [1, 2, 3, 4, 5, 6, 7, 8];
let b = [2, 2, 2, 2, 6, 6, 6, 6];

// Element-wise comparison → Mask
let gt_mask = a > b;   // Mask<8>

// Boolean reductions on masks
let any_gt = \| gt_mask;   // true (any element > ?)
let all_gt = \& gt_mask;   // false (all elements > ?)

// Count true values
let count = $popcount(gt_mask);  // 4

// Use mask for selection
let selected = $select(gt_mask, a, b);  // [2, 2, 3, 4, 6, 6, 7, 8]
```

## Inline SIMD Optimizations

For small arrays (≤64 bytes, power-of-2 elements), Vex generates **pure register operations** with no memory access:

### Tier Classification

| Size | Strategy | Example |
|------|----------|---------|
| N = 1 | Scalar | `let x = a + b` |
| N ≤ 64 bytes | Inline SIMD | `[i32; 8]` → `<8 x i32>` |
| N > 64 bytes | Loop + SIMD | Unrolled vectorized loop |

### Example: Inline vs Loop

```vex
// Small array → Inline SIMD (no loop!)
let small: [i32; 4] = [1, 2, 3, 4];
let doubled = small * 2;
// Generates: %result = mul <4 x i32> %vec, <i32 2, i32 2, i32 2, i32 2>

// Large array → Vectorized loop
let large: [i32; 1024] = ...;
let doubled = large * 2;
// Generates: loop with <8 x i32> operations + prefetch
```

## Type Inference Rules

The compiler infers the result type based on the operation:

| Operation | Input Types | Result Type |
|-----------|-------------|-------------|
| `a + b` | `[T; N], [T; N]` | `Tensor<T, N>` |
| `a * scalar` | `[T; N], T` | `Tensor<T, N>` |
| `a == b` | `[T; N], [T; N]` | `Mask<N>` |
| `a < b` | `[T; N], [T; N]` | `Mask<N>` |
| `-a` | `[T; N]` | `Tensor<T, N>` |
| `~a` | `[T; N]` (integer) | `Tensor<T, N>` |

## Coercion Rules

Automatic type conversions:

| From | To | Cost |
|------|-----|------|
| `Tensor<T, N>` | `Tensor<T>` | Zero-cost (fat pointer wrap) |
| `Mask<N>` | `Mask` | Zero-cost (fat pointer wrap) |
| `[T; N]` | `Tensor<T, N>` | Vector load |
| `[T; N]` | `Tensor<T>` | Alloca + fat pointer |
| `&[T]` | `Tensor<T>` | Reinterpret |

### Dynamic Tensor Methods

```vex
let t: Tensor<f32> = ...;

t.len()       // i64 - number of elements
t.ptr()       // *T - raw data pointer
t.is_empty()  // bool - len == 0
```

### Chained Operations Stay in Registers

```vex
fn compute(a: [f32; 8], b: [f32; 8], c: [f32; 8]): [f32; 8] {
    // All operations happen in registers!
    return (a + b) * c - a;
}
```

LLVM IR (no alloca, pure vectors):
```llvm
define [8 x float] @compute([8 x float] %a, [8 x float] %b, [8 x float] %c) {
  %add = fadd <8 x float> %a, %b
  %mul = fmul <8 x float> %add, %c
  %sub = fsub <8 x float> %mul, %a
  ret [8 x float] %sub
}
```

## Practical Examples

### XOR All Elements

```vex
fn xor_arrays(a: [i16; 16], b: [i16; 16]): [i16; 16] {
    return a ^ b;  // Single SIMD XOR instruction
}
```

Generated:
```llvm
%vxor = xor <16 x i16> %a, %b
```

### Count Matches

```vex
fn count_equal(a: [i32; 8], b: [i32; 8]): i32 {
    let mask = a == b;           // Mask<8>
    let as_int = mask as [i32; 8];  // Convert to integers
    return <+ as_int;            // Sum = count of trues
}
```

### Conditional Selection

```vex
fn clamp_positive(data: [f32; 4]): [f32; 4] {
    let zeros: [f32; 4] = [0.0, 0.0, 0.0, 0.0];
    let positive = data > zeros;  // Mask<4>
    return $select(positive, data, zeros);
}
```

### Parallel Threshold

```vex
fn threshold(data: [u8; 32], thresh: u8): [u8; 32] {
    let mask = data > thresh;
    return $select(mask, data, 0);  // Zero out below threshold
}
```

## Performance Tips

### 1. Keep Operations Chained

```vex
// ✅ Good: Single expression, stays in registers
let result = (a + b) * c;

// ❌ Avoid: Intermediate variables may spill to memory
let temp = a + b;
let result = temp * c;
```

### 2. Use Power-of-2 Sizes

```vex
// ✅ Optimal: Power of 2
let vec: [f32; 8] = ...;

// ⚠️ Less optimal: Not power of 2
let vec: [f32; 7] = ...;  // May need padding
```

### 3. Match SIMD Register Widths

| Target | Optimal Size |
|--------|--------------|
| Apple Silicon (NEON) | 16 bytes (`[f32; 4]`, `[i32; 4]`) |
| AVX2 | 32 bytes (`[f32; 8]`, `[i32; 8]`) |
| AVX-512 | 64 bytes (`[f32; 16]`, `[i32; 16]`) |

### 4. Let Compiler Fold Constants

```vex
// Constant arrays are folded at compile time!
let target: [i16; 16] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let offset = target + 100;  // Computed at compile time!
```

### 5. Use Static vs Dynamic Wisely

```vex
// ✅ Static: When size is known at compile time (faster)
fn process_fixed(data: Tensor<f32, 4>): Tensor<f32, 4> {
    return data * 2.0;  // Pure SIMD, no length checks
}

// ✅ Dynamic: When accepting variable-length data
fn process_any(data: Tensor<f32>): f32 {
    return \+ data / data.len() as f32;  // Works with any size
}

// Static→Dynamic coercion is automatic and efficient
let fixed: Tensor<i32, 4> = [1, 2, 3, 4];
let avg = process_any(fixed);  // Automatic fat pointer creation
```

## Next Steps

- [SIR Optimization Pipeline](./sir-pipeline) - How the compiler optimizes SIMD
- [GPU Programming](/guide/gpu) - Massively parallel compute
- [SIMD Operators](./index) - Full operator reference
