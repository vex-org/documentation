# GPU & Compute with SIR

SIR is Vex's heterogeneous compute layer. It is the part of the compiler/runtime stack that can lower tensor-style work to SIMD and, where available, GPU-oriented backends.

This page is intentionally conservative: today, the most reliable path is still CPU/SIMD. GPU backends exist, but they do not all have equally mature runtime execution.

## What to use today

- Use normal array math and the [SIMD guide](../simd/) for the main production-ready fast path.
- Use `graph fn`, `Tensor<T>`, and related APIs when you want to work directly with SIR-style compute graphs.
- Treat non-SIMD GPU execution as evolving, not universally production-ready.

## Minimal SIR example

The current repo already contains examples like this:

```vex
graph fn dynamic_even_gather(data: Span<f32>): Tensor<f32> {
    let t: Tensor<f32> = data;
    let total = data.len() as f64;
    let even_indices = Tensor.arange<i64>(0.0, total, 2.0);
    return t.gather(even_indices);
}
```

This is the clearest signal that you are on the graph/SIR path rather than only writing ordinary scalar code.

## Conceptual pipeline

```
Vex source
  -> HIR
  -> SIR graph
  -> optimization and fusion
  -> backend codegen
  -> runtime dispatch or fallback
```

Backends in the tree include SIMD, Metal, CUDA, ROCm, SPIR-V, and WGSL-oriented code generation.

## Current maturity snapshot

The repo's backend roadmap currently points to this practical picture:

| Backend  | Practical status                                                            |
| -------- | --------------------------------------------------------------------------- |
| `SIMD`   | Most mature and the safest fast path today                                  |
| `Metal`  | Real codegen exists, runtime execution is only solid in some configurations |
| `CUDA`   | Codegen exists, runtime dispatch is still incomplete                        |
| `ROCm`   | Separate HIP-oriented backend exists, runtime dispatch is still incomplete  |
| `SPIR-V` | Important intermediate target, full Vulkan runtime path is not finished     |
| `WGSL`   | Generation exists, but correctness and runtime coverage still need caution  |

If you need dependable behavior now, assume CPU/SIMD first and treat GPU execution as opt-in validation territory.

## What SIR is good at

SIR is the right abstraction for:

- tensor and graph-style transforms
- gather/scatter patterns
- backend-specific optimization and fusion
- routing the same high-level compute description across multiple targets

## What not to assume

Do not assume that every SIR-capable program:

- will run on a real GPU on every machine
- will avoid fallback paths
- will have parity across Metal, CUDA, SPIR-V, and WGSL today
- will beat the SIMD path for every workload

Those are explicit areas still being hardened in the compiler and runtime.

## Practical guidance

1. Start with a correct CPU/SIMD version.
2. Introduce `graph fn` and `Tensor` only where the dataflow really fits.
3. Validate results on the backend you care about instead of assuming parity.
4. Treat Metal on macOS as the most realistic current GPU target.
5. Use docs in the architecture section when you need backend-level caveats.

## Related docs

- [SIMD and Auto-Vectorization](../simd/)
- [Tensor and Mask Types](../simd/tensor-mask)
- [SIR and Backends](/architecture/sir-and-backends)

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

| Platform     | Backend     | Requirement                              |
| ------------ | ----------- | ---------------------------------------- |
| **macOS**    | `Metal`     | macOS 10.13+ (Apple Silicon recommended) |
| **Linux**    | `Vulkan`    | Vulkan 1.2+ driver                       |
| **Windows**  | `Vulkan`    | Vulkan 1.2+ driver                       |
| **Web**      | `WebGPU`    | Modern browser (Chrome/Edge/Firefox)     |
| **Fallback** | `LLVM-SIMD` | Any CPU (if GPU unavailable)             |

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
