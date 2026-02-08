# GPU & Compute with SIR

Vex provides GPU/compute programming through **Silicon IR (SIR)** - an intermediate representation designed for heterogeneous computing. SIR compiles to SPIR-V, WGSL, Metal Shading Language, and optimized SIMD code.

::: tip Key Insight
Vex has **NO attributes** like `@silicon` or `#[...]`. GPU/compute is handled **automatically** by the SIR compiler when you use array operations. The compiler detects vectorizable patterns and generates optimal code for CPU (SIMD) or GPU backends.
:::

## Overview

The SIR pipeline works automatically:

```
Vex Code → HIR → SIR Graph → Optimization → Backend Code
                                              ├─ LLVM IR (CPU/SIMD)
                                              ├─ SPIR-V (Vulkan)
                                              ├─ WGSL (WebGPU)
                                              └─ MSL (Metal)
```

## Operator Quick Reference

| Category | Operators | Example |
|----------|-----------|---------|
| **Arithmetic** | `+` `-` `*` `/` `%` `**` | `a + b`, `a ** 2` |
| **Min/Max** | `<?` `>?` `><` | `a <? b`, `a >< (lo, hi)` |
| **Saturating** | `+\|` `-\|` `*\|` | `pixels +\| 50` |
| **Bitwise** | `&` `\|` `^` `~` `<<` `>>` | `a & b`, `a << 2` |
| **Rotation** | `<<<` `>>>` | `x <<< 3` (crypto) |
| **Comparison** | `==` `!=` `<` `<=` `>` `>=` | `a > 0` (returns mask) |
| **Reduction** | `\+` `\*` `\<` `\>` `\&` `\\|` | `\+ data` (sum) |
| **Matrix** | `<*>` `·` `×` `'` | `a <*> b`, `matrix'` |
| **Pipeline** | `\|>` | `data \|> normalize \|> process` |

## Array Operations

SIR operates on Vex's built-in array types with **element-wise operators**:

```vex
// Static arrays - size known at compile time
let a: [f32; 1024] = [0.0; 1024]

// Dynamic arrays
let b: [f32] = [1.0, 2.0, 3.0, 4.0]

// Array operations - NO loops needed!
fn vector_add(a: [f32], b: [f32]): [f32] {
    return a + b  // Element-wise addition, auto-vectorized
}

fn vector_scale(a: [f32], scale: f32): [f32] {
    return a * scale  // Scalar broadcasting
}
```

## Element-wise Operators

SIR supports rich element-wise operations directly on arrays:

```vex
let a = [1.0, 2.0, 3.0, 4.0]
let b = [0.5, 1.0, 1.5, 2.0]

// Arithmetic - works on entire arrays!
let c = a + b        // [1.5, 3.0, 4.5, 6.0]
let d = a * b        // [0.5, 2.0, 4.5, 8.0]
let e = a ** 2       // [1.0, 4.0, 9.0, 16.0]  (power)

// Min/Max operators
let f = a <? b       // Element-wise min: [0.5, 1.0, 1.5, 2.0]
let g = a >? b       // Element-wise max: [1.0, 2.0, 3.0, 4.0]
let h = a >< (0.5, 3.0)  // Clamp: [1.0, 2.0, 3.0, 3.0]

// Math functions apply element-wise
let i = $sin(a)      // [0.84, 0.91, 0.14, -0.76]
let j = $sqrt(a)     // [1.0, 1.41, 1.73, 2.0]
let k = $exp(a)      // [2.72, 7.39, 20.09, 54.60]

// Comparisons return masks
let mask = a > 2.0   // [false, false, true, true]
```

## Reduction Operators

Reduce entire arrays to single values with prefix operators:

```vex
let data = [1.0, 2.0, 3.0, 4.0, 5.0]

// Reduction operators (prefix syntax)
let sum = \+ data     // 15.0 (sum reduction)
let prod = \* data    // 120.0 (product)
let max = \> data     // 5.0 (max reduction)
let min = \< data     // 1.0 (min reduction)
let all = \& mask     // Logical AND reduction
let any = \| mask     // Logical OR reduction

// With axis for multi-dimensional
let matrix = [[1, 2], [3, 4]]
let row_sums = \+ matrix, axis: 1   // [3, 7]
let col_sums = \+ matrix, axis: 0   // [4, 6]
```

## Linear Algebra Operators

Matrix operations with dedicated operators:

```vex
let a = [[1, 2], [3, 4]]
let b = [[5, 6], [7, 8]]

// Matrix multiply
let c = a <*> b       // [[19, 22], [43, 50]]

// Transpose
let t = a'            // [[1, 3], [2, 4]]

// Dot product
let v1 = [1.0, 2.0, 3.0]
let v2 = [4.0, 5.0, 6.0]
let dot = v1 · v2     // 32.0

// Cross product (3D vectors)
let cross = v1 × v2   // [-3.0, 6.0, -3.0]
```

## Bitwise Operators

Full bitwise support on integer arrays:

```vex
let a: [u8] = [0xFF, 0x0F, 0xF0, 0xAA]
let b: [u8] = [0x0F, 0xFF, 0x0F, 0x55]

let and = a & b       // [0x0F, 0x0F, 0x00, 0x00]
let or = a | b        // [0xFF, 0xFF, 0xFF, 0xFF]
let xor = a ^ b       // [0xF0, 0xF0, 0xFF, 0xFF]
let not = ~a          // [0x00, 0xF0, 0x0F, 0x55]

// Shifts
let shl = a << 2      // Shift left
let shr = a >> 2      // Shift right

// Rotations (for crypto)
let rotl = a <<< 3    // Rotate left
let rotr = a >>> 3    // Rotate right
```

## Saturating Arithmetic

For overflow-safe operations (audio, image processing):

```vex
let pixels: [u8] = [200, 250, 100, 50]
let adjust: u8 = 60

// Saturating operators (clamp instead of wrap)
let brighter = pixels +| adjust   // [255, 255, 160, 110]
let darker = pixels -| adjust     // [140, 190, 40, 0]
let scaled = pixels *| 2          // [255, 255, 200, 100]
```

## Pipeline Operator

Chain operations elegantly:

```vex
fn process_signal(data: [f32]): f32 {
    return data
        |> fn(x) { x - \+ x / x.len() as f32 } // Subtract mean
        |> fn(x) { x ** 2 }                    // Square
        |> \+                                  // Sum
        |> fn(x) { $sqrt(x) }                  // Root = std deviation
}

// Equivalent to:
fn process_signal_verbose(data: [f32]): f32 {
    let mean = \+ data / data.len() as f32
    let centered = data - mean
    let squared = centered ** 2
    let sum = \+ squared
    return $sqrt(sum)
}
```

## SIR Graph Architecture

SIR represents computation as a DAG (Directed Acyclic Graph):

| Node Type | Description | Example |
|-----------|-------------|---------|
| `Input` | Array/tensor placeholders | `let a = input([1024])` |
| `Map` | Element-wise ops (Add, Mul, Sin...) | `a + b`, `$sin(a)` |
| `MatMul` | Matrix multiplication | `a <*> b` |
| `Reduce` | Reductions (Sum, Max, Mean) | `\+ data` |
| `Output` | Graph outputs | `return result` |

## Data Types (DType)

SIR supports these data types:

| Category | Types | Notes |
|----------|-------|-------|
| **Signed Int** | `i8`, `i16`, `i32`, `i64` | Bitwise & arithmetic |
| **Unsigned Int** | `u8`, `u16`, `u32`, `u64` | Also for bitwise |
| **Float** | `f16`, `f32`, `f64` | Math functions |
| **Bool** | `bool` | Comparison results |
| **Quantized** | `int4`, `fp4`, `e4m3`, `e5m2` | ML inference |

## JIT Compilation

SIR uses Just-In-Time compilation:

1. **Graph Construction**: Code builds a SirGraph
2. **Optimization Passes**:
   - **Fusion**: Merges adjacent element-wise ops
   - **Dead Code Elimination**: Removes unused nodes
   - **Layout Optimization**: Reorders for hardware
3. **Kernel Generation**: Backend-specific code
4. **Execution**: Dispatch to hardware

```vex
// This simple code:
fn compute(a: [f32], b: [f32]): [f32] {
    let c = a + b
    let d = c * 2.0
    return d
}

// Becomes optimized fused kernel:
// Add + Mul fused into single pass
```

## Backend Selection
 
Vex **automatically** selects the best backend (CPU SIMD, Metal, Vulkan, etc.) based on the operation size and available hardware.
 
You do **not** need to import or configure backends manually. The compiler and runtime handle this transparently.

### Automatic GPU Offloading

The SIR compiler automatically dispatches to GPU when:
- Array operations exceed 4096 elements
- Matrix multiplications with output > 64x64
- Large reduction operations

```vex
// Small arrays → CPU SIMD (fast, no GPU overhead)
let small = [1.0, 2.0, 3.0, 4.0]
let result = small + 1.0  // Uses SIMD

// Large arrays → GPU automatically
let large: [f32; 10000] = [0.0; 10000]
let result = large * 2.0 + 1.0  // GPU if available
```

### Building with GPU Support

```bash
# macOS with Metal GPU (recommended)
cargo build --features metal-gpu

# Cross-platform with WebGPU
cargo build --features webgpu
```

### Runtime Control

```bash
# Disable GPU (force CPU SIMD)
VEX_NO_GPU=1 vex run program.vx

# Verbose SIR output
VEX_VERBOSE=1 vex run program.vx
```

## Supported GPU Backends

Vex's SIR compiler automatically targets the appropriate API for your platform:

| Platform | Backend | Requirement |
|----------|---------|-------------|
| **macOS** | `Metal` | macOS 10.13+ (Apple Silicon recommended) |
| **Linux** | `Vulkan` | Vulkan 1.2+ driver |
| **Windows** | `Vulkan` | Vulkan 1.2+ driver |
| **Web** | `WebGPU` | Modern browser (Chrome/Edge/Firefox) |
| **Fallback** | `LLVM-SIMD` | Any CPU (if GPU unavailable) |

For intrinsics supported on GPU, see the [Standard Intrinsics](/guide/simd#standard-intrinsics) table in the SIMD guide.

## VUMM Integration

SIR integrates with VUMM (Vex Unified Memory Manager):

- **Zero-Copy**: Uses unified memory on supported platforms (Apple Silicon, APUs)
- **Pool Allocator**: Reuses buffers to reduce allocation overhead
- **Lifecycle Management**: Reference counting for automatic cleanup

```vex
// Memory is managed automatically
fn process_large_array(data: [f32]): [f32] {
    // VUMM handles buffer allocation
    let result = transform(data)
    // Buffer freed when no longer referenced
    return result
}
```

## Optimization Passes

### Kernel Fusion

Adjacent operations are fused into single kernels:

```vex
// Before fusion: 3 separate kernel launches
let b = a + 1.0
let c = b * 2.0
let d = $relu(c)

// After fusion: 1 kernel launch
// (a + 1.0) * 2.0 → relu in single pass
```

### Tiling for Cache Efficiency

Large operations are tiled automatically:

```vex
// Matrix multiply auto-tiled for cache
fn large_matmul(
    a: [[f32; 1024]; 1024],
    b: [[f32; 1024]; 1024]
): [[f32; 1024]; 1024] {
    return a <*> b  // Tiling applied automatically
}
```

## Practical Examples

### Image Processing

```vex
// Brighten image - saturating add prevents overflow
fn brighten(pixels: [u8], amount: u8): [u8] {
    return pixels +| amount
}

// Grayscale conversion with broadcasting
fn grayscale(r: [u8], g: [u8], b: [u8]): [u8] {
    return (r * 0.299 + g * 0.587 + b * 0.114) as [u8]
}

// Contrast adjustment
fn contrast(pixels: [f32], factor: f32): [f32] {
    let mean = \+ pixels / pixels.len() as f32
    return (pixels - mean) * factor + mean
}

// Blur (box filter)
fn blur_3x3(img: [[f32]]): [[f32]] {
    let kernel = [[1, 1, 1], [1, 1, 1], [1, 1, 1]] / 9.0
    return $conv(img, kernel)
}
```

### Signal Processing

```vex
// FFT-based operations would use SIR's optimized kernels
fn normalize(signal: [f32]): [f32] {
    let min = \< signal
    let max = \> signal
    return (signal - min) / (max - min)
}

fn rms(signal: [f32]): f32 {
    return $sqrt(\+ signal ** 2 / #signal)
}

fn moving_average(data: [f32], window: i32): [f32] {
    return $conv(data, [1.0; window] / window as f32)
}
```

### Machine Learning

```vex
// Neural network layer
fn linear(x: [[f32]], w: [[f32]], b: [f32]): [[f32]] {
    return x <*> w + b  // MatMul + broadcast bias
}

fn relu(x: [[f32]]): [[f32]] {
    return x >? 0.0  // Element-wise max with 0
}

fn softmax(logits: [f32]): [f32] {
    let exp_x = $exp(logits - \> logits)  // Subtract max for stability
    return exp_x / \+ exp_x
}

fn cross_entropy(pred: [f32], target: [f32]): f32 {
    return -\+ target * $log(pred + 1e-7)
}

// Full forward pass - fuses into optimized kernels
fn mlp_forward(x: [[f32]], w1: [[f32]], b1: [f32], 
               w2: [[f32]], b2: [f32]): [[f32]] {
    return x 
        |> fn(h) { h <*> w1 + b1 }    // Linear 1
        |> fn(h) { h >? 0.0 }          // ReLU
        |> fn(h) { h <*> w2 + b2 }    // Linear 2
}
```

### Physics Simulation

```vex
// N-body gravity calculation
fn gravity_accel(
    pos: [[f32; 3]],  // N x 3 positions
    masses: [f32]      // N masses
): [[f32; 3]] {
    // Broadcasting: each body vs all others
    let dx = pos[:, None, :] - pos[None, :, :]  // N x N x 3
    let dist_sq = \+ dx ** 2, axis: 2           // N x N
    let inv_dist3 = 1.0 / (dist_sq * $sqrt(dist_sq) + 1e-9)
    
    // a = G * m * dx / r^3
    return \+ masses[None, :, None] * dx * inv_dist3[:, :, None], axis: 1
}

// Velocity Verlet integration
fn integrate(pos: [[f32; 3]], vel: [[f32; 3]], 
             accel: [[f32; 3]], dt: f32): ([[f32; 3]], [[f32; 3]]) {
    let new_pos = pos + vel * dt + 0.5 * accel * dt ** 2
    let new_accel = gravity_accel(new_pos, masses)
    let new_vel = vel + 0.5 * (accel + new_accel) * dt
    return (new_pos, new_vel)
}
```

### Crypto Operations

```vex
// AES SubBytes using Galois Field multiply
fn aes_sbox(state: [u8; 16]): [u8; 16] {
    let inv = $gf_inv(state)
    return inv ^ (inv <<< 1) ^ (inv <<< 2) ^ (inv <<< 3) ^ (inv <<< 4) ^ 0x63
}

// SHA-256 compression round
fn sha256_round(a: u32, b: u32, c: u32, d: u32,
                e: u32, f: u32, g: u32, h: u32,
                k: u32, w: u32): (u32, u32, u32, u32, u32, u32, u32, u32) {
    let s1 = (e >>> 6) ^ (e >>> 11) ^ (e >>> 25)
    let ch = (e & f) ^ (~e & g)
    let temp1 = h +| s1 +| ch +| k +| w
    
    let s0 = (a >>> 2) ^ (a >>> 13) ^ (a >>> 22)
    let maj = (a & b) ^ (a & c) ^ (b & c)
    let temp2 = s0 +| maj
    
    return (temp1 +| temp2, a, b, c, d +| temp1, e, f, g)
}
```

## Best Practices

1. **Use operators, not loops** - SIR optimizes operators directly
2. **Prefer fixed-size arrays** - Enables better optimization
3. **Use reduction operators** - `\+`, `\<`, `\>` for reductions
4. **Chain with pipeline** - `|>` for readable data flow
5. **Let fusion happen** - Don't manually split operations

```vex
// ✅ Excellent: Direct operators
fn dot_product(a: [f64], b: [f64]): f64 {
    return \+ a * b
}

fn normalize(v: [f64]): [f64] {
    return v / $sqrt(\+ v ** 2)
}

// ✅ Good: Pipeline for complex operations
fn standardize(data: [f64]): [f64] {
    let mean = \+ data / data.len() as f64
    let std = $sqrt(\+ (data - mean) ** 2 / data.len() as f64)
    return (data - mean) / std
}

// ❌ Avoid: Manual loops when operators work
fn bad_dot_product(a: [f64], b: [f64]): f64 {
    let! sum = 0.0
    for i in 0..a.len() {
        sum = sum + a[i] * b[i]  // Unnecessary loop!
    }
    return sum
}
```

## Compilation Flags

```bash
# Auto-detect best backend
vex compile file.vx

# Specify optimization level
vex compile -O 3 file.vx

# Target specific CPU for SIMD
vex compile --target-cpu=x86-64-v3 file.vx  # AVX2
vex compile --target-cpu=native file.vx     # Current CPU
```

## Next Steps

- [SIMD](/guide/simd) - CPU vectorization details
- [Memory Management](/guide/memory/vumm) - VUMM system
- [Performance](/guide/advanced/performance) - Optimization techniques
