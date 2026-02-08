# SIMD and Auto-Vectorization

Vex automatically vectorizes array operations. There are **NO custom SIMD types** like `f32x4` - write clean, readable code and the compiler optimizes automatically.

> **Deep Dive:** For implementation details, see:
> - [Tensor and Mask Types](./tensor-mask) - Internal SIMD type system (static & dynamic)
> - [SIR Optimization Pipeline](./sir-pipeline) - How the compiler optimizes

## Overview

SIMD (Single Instruction, Multiple Data) processes multiple elements with single instructions:

```
Scalar:           SIMD (4-wide):
a + b = c         [a₀,a₁,a₂,a₃] + [b₀,b₁,b₂,b₃] = [c₀,c₁,c₂,c₃]
1 op              1 op (but 4 results!)
```

Vex supports two modes:
- **Static Tensors** (`Tensor<T, N>`) - Compile-time size, register-optimized
- **Dynamic Tensors** (`Tensor<T>`) - Runtime size, ideal for ML and variable data

## Automatic Vectorization

Write operations directly on arrays - the compiler handles the rest:

```vex
// Element-wise operations (NO loops needed!)
fn vector_add(a: [f32], b: [f32]): [f32] {
    return a + b  // Automatically vectorized
}

fn scale_array(data: [f32; 1024], factor: f32): [f32; 1024] {
    return data * factor  // Scalar broadcasting
}

fn process(data: [f64]): f64 {
    return $sqrt(\+ data ** 2)  // Sum of squares → sqrt
}
```

### What Gets Vectorized

The compiler automatically vectorizes:

- **Element-wise ops**: `+`, `-`, `*`, `/`, `%`, `**`
- **Comparisons**: `==`, `!=`, `<`, `>`, `<=`, `>=` (return masks)
- **Math functions**: `$sqrt`, `$abs`, `$sin`, `$cos`, `$exp`, `$log`
- **Reductions**: `\+` (sum), `\*` (product), `\<` (min), `\>` (max)
- **Fused ops**: multiply-add via FMA

## SIMD Operators

Vex provides special operators optimized for SIMD:

### Reduction Operators

```vex
let arr = [1, 2, 3, 4, 5]

// Reduction operators (prefix syntax)
let sum = \+ arr         // 15 (sum)
let prod = \* arr        // 120 (product)
let min_val = \< arr     // 1 (min)
let max_val = \> arr     // 5 (max)

// Boolean reductions
let all_positive = \& (arr > 0)   // true (AND)
let any_even = \| (arr % 2 == 0)  // true (OR)
```

### Element-wise Min/Max

```vex
let a = [1, 5, 3, 8]
let b = [2, 3, 6, 4]

let mins = a <? b        // [1, 3, 3, 4] (element-wise min)
let maxs = a >? b        // [2, 5, 6, 8] (element-wise max)
let clamped = a >< (2, 6)  // [2, 5, 3, 6] (clamp to range)
```

### Fused Multiply-Add

```vex
let a = [1.0, 2.0, 3.0, 4.0]
let b = [2.0, 2.0, 2.0, 2.0]
let c = [1.0, 1.0, 1.0, 1.0]

// FMA: a * b + c in single operation (more accurate!)
let result = a * b + c   // Compiler auto-fuses to FMA
```

### Saturating Arithmetic

```vex
let pixels: [u8; 4] = [250, 200, 100, 50]

// Saturating add (clamps at max value, no overflow!)
let brighter = pixels +| 60   // [255, 255, 160, 110]

// Saturating subtract (clamps at 0)
let darker = pixels -| 100    // [150, 100, 0, 0]
```

### Rotate Operations

```vex
let x: [u32] = [0x80000001, 0x00000001]

// Rotate left
let rotl = x <<< 1    // [0x00000003, 0x00000002]

// Rotate right
let rotr = x >>> 1    // [0xC0000000, 0x80000000]
```

## Working with Arrays

### Fixed-Size Arrays

```vex
// Compiler knows size → optimal vectorization
fn dot_product(a: [f64; 256], b: [f64; 256]): f64 {
    return \+ a * b   // Sum of element-wise products
}

fn distance(a: [f32; 3], b: [f32; 3]): f32 {
    return $sqrt(\+ (a - b) ** 2)
}
```

### Dynamic Arrays

```vex
// Dynamic arrays also auto-vectorized
fn normalize(v: [f32]): [f32] {
    let mag = $sqrt(\+ v ** 2)
    return v / mag
}

fn cosine_similarity(a: [f32], b: [f32]): f32 {
    let dot = \+ a * b
    let norm_a = $sqrt(\+ a ** 2)
    let norm_b = $sqrt(\+ b ** 2)
    return dot / (norm_a * norm_b)
}
```

## Practical Examples

### Vector Operations

```vex
fn add_vectors(a: [f32], b: [f32]): [f32] {
    return a + b
}

fn lerp(a: [f32], b: [f32], t: f32): [f32] {
    return a * (1.0 - t) + b * t
}

fn cross_product(a: [f32; 3], b: [f32; 3]): [f32; 3] {
    return a × b  // Cross product operator
}
```

### Finding Extremes

```vex
fn find_max(data: [f32]): f32 {
    return \> data
}

fn find_min_max(data: [f32]): (f32, f32) {
    return (\< data, \> data)
}

fn argmax(data: [f32]): i32 {
    // ArgMax reduction
    return $argmax(data)
}
```

### Matrix Operations

```vex
// Matrix multiply with operator
fn matmul(a: [[f64; 4]; 4], b: [[f64; 4]; 4]): [[f64; 4]; 4] {
    return a <*> b
}

// Transpose
fn transpose(m: [[f64; 4]; 4]): [[f64; 4]; 4] {
    return m'
}

// Matrix-vector multiply
fn transform(m: [[f32; 4]; 4], v: [f32; 4]): [f32; 4] {
    return m <*> v
}
```

### Image Processing

```vex
fn brighten(pixels: [u8], amount: u8): [u8] {
    return pixels +| amount  // Saturating add
}

fn invert(pixels: [u8]): [u8] {
    return 255 - pixels
}

fn blend(a: [u8], b: [u8], alpha: f32): [u8] {
    return (a as [f32] * (1.0 - alpha) + b as [f32] * alpha) as [u8]
}

fn grayscale(r: [u8], g: [u8], b: [u8]): [u8] {
    return (r * 0.299 + g * 0.587 + b * 0.114) as [u8]
}
```

### Signal Processing

```vex
fn normalize_signal(signal: [f32]): [f32] {
    let min = \< signal
    let max = \> signal
    return (signal - min) / (max - min)
}

fn energy(signal: [f32]): f32 {
    return \+ signal ** 2
}

fn rms(signal: [f32]): f32 {
    return $sqrt(\+ signal ** 2 / #signal)
}
```

## Compilation Flags

Enable SIMD optimizations:

```bash
# Auto-detect best SIMD for current CPU
vex compile --simd file.vx

# Specify optimization level
vex compile -O 3 file.vx

# Target specific architecture (for distribution)
vex compile --target-cpu=x86-64-v3 file.vx  # AVX2
vex compile --target-cpu=x86-64-v4 file.vx  # AVX-512
```

## Supported CPU Architectures

Vex's SIMD backend (LLVM-based) supports modern vector extensions out of the box:

| Architecture | Extensions | Note |
|--------------|------------|------|
| **Apple Silicon** | `NEON` | M1, M2, M3 families (ARM64) |
| **ARM64** | `NEON`, `SVE` | Modern servers, mobile |
| **x86-64 v4** | `AVX-512` | High-performance server/workstation |
| **x86-64 v3** | `AVX2`, `FMA` | Most modern desktops (Zen, Haswell+) |
| **x86-64 v2** | `SSE4.2` | Legacy fallback |
| **WebAssembly** | `SIMD128` | Web browsers |

## Standard Intrinsics

These intrinsics are hardware-accelerated on both CPU (SIMD) and GPU:

### Math & Analysis
| Intrinsic | Description | Example |
|-----------|-------------|---------|
| `$sqrt(x)` | Square root | `$sqrt([4, 9])` → `[2, 3]` |
| `$abs(x)` | Absolute value | `$abs([-5, 5])` → `[5, 5]` |
| `$sin(x)`, `$cos(x)` | Trigonometry | `$sin(angle)` |
| `$exp(x)`, `$log(x)` | Exp/Log | `$log(val)` |
| `$pow(b, e)` | Power | `$pow(2, 3)` → `8` |
| `$round(x)` | Rounding | `$round(1.6)` → `2.0` |
| `$floor(x)`, `$ceil(x)` | Floor/Ceil | `$floor(1.6)` → `1.0` |

### Array & Matrix
| Intrinsic | Description | Example |
|-----------|-------------|---------|
| `$sum(x)` | Sum elements | `$sum([1,2,3])` → `6` |
| `$prod(x)` | Product | `$prod([2,3])` → `6` |
| `$min(x)`, `$max(x)` | Min/Max val | `$max([1,5])` → `5` |
| `$argmax(x)` | Index of max | `$argmax([1,5,2])` → `1` |
| `$zeros(shape)` | Zero tensor | `$zeros([2,2])` |
| `$ones(shape)` | Inputs 1s | `$ones([4])` |
| `$eye(n)` | Identity matrix | `$eye(3)` |
| `$conv(d, k)` | Convolution | `$conv(img, kernel)` |
| `$fft(x)` | Fast Fourier | `$fft(audio)` |


## Best Practices

1. **Use operators directly** - No loops needed for element-wise ops
2. **Use reduction operators** - `\+`, `\<`, `\>` are SIMD-optimized
3. **Prefer fixed-size arrays** - Known sizes enable better optimization
4. **Let fusion happen** - Don't split operations unnecessarily

```vex
// ✅ Excellent: Direct operators
fn sum(data: [f64]): f64 {
    return \+ data
}

fn dot_product(a: [f64], b: [f64]): f64 {
    return \+ a * b
}

fn normalize(v: [f64]): [f64] {
    return v / $sqrt(\+ v ** 2)
}

// ❌ Avoid: Manual loops when operators work
fn sum_bad(data: [f64]): f64 {
    let! total = 0.0
    for x in data {
        total = total + x  // Unnecessary!
    }
    return total
}
```

## SIMD Operator Reference

| Operator | Description | Example |
|----------|-------------|---------|
| `\+` | Sum reduction | `\+ [1,2,3]` → `6` |
| `\*` | Product reduction | `\* [1,2,3]` → `6` |
| `\<` | Min reduction | `\< [3,1,2]` → `1` |
| `\>` | Max reduction | `\> [3,1,2]` → `3` |
| `\&` | AND reduction | `\& [t,t,f]` → `false` |
| `\|` | OR reduction | `\| [t,f,f]` → `true` |
| `<?` | Element-wise min | `[1,5] <? [3,2]` → `[1,2]` |
| `>?` | Element-wise max | `[1,5] >? [3,2]` → `[3,5]` |
| `><` | Clamp | `[1,5] >< (2,4)` → `[2,4]` |
| `+\|` | Saturating add | `250u8 +\| 10u8` → `255` |
| `-\|` | Saturating sub | `5u8 -\| 10u8` → `0` |
| `<<<` | Rotate left | `x <<< 1` |
| `>>>` | Rotate right | `x >>> 1` |
| `<*>` | Matrix multiply | `a <*> b` |
| `'` | Transpose | `matrix'` |

## Next Steps

- [GPU Programming](/guide/gpu) - Massively parallel compute
- [FFI](/guide/ffi) - Integrating with native libraries
- [Memory Management](/guide/memory/ownership) - Efficient data handling
