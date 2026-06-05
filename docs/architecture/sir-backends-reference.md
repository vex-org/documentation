# SIR Backends -- Complete Reference

The Silicon IR (SIR) pipeline can target multiple GPU and accelerator backends from a single `graph fn` definition. This page catalogs all supported backends and their characteristics.

## Backend Overview

| Backend      | Target                       | Status     | Best For                              |
| ------------ | ---------------------------- | ---------- | ------------------------------------- |
| **Metal**    | Apple GPUs (M1-M4, A-series) | Production | macOS/iOS GPU compute                 |
| **CUDA**     | NVIDIA GPUs                  | Production | HPC, ML training, NVIDIA hardware     |
| **ROCm**     | AMD GPUs                     | Production | AMD GPU compute                       |
| **SPIR-V**   | Vulkan/OpenCL                | Production | Universal GPU IR, cross-vendor        |
| **WGSL**     | WebGPU (browser)             | Production | Web deployment, browser-based compute |
| **Vulkan**   | Cross-platform GPU           | Beta       | Direct Vulkan compute                 |
| **OpenCL**   | Cross-platform               | Stable     | Legacy GPU support                    |
| **OpenVINO** | Intel accelerators           | Beta       | Intel CPU/GPU/VPU inference           |
| **CoreML**   | Apple Neural Engine          | Beta       | On-device ML inference (Apple)        |
| **CPU SIMD** | x86/ARM CPU                  | Production | Fallback, CPU vectorization           |

## Metal Backend

Targets Apple's Metal GPU framework. Generates MSL (Metal Shading Language).

**Strengths:**

- Native Apple GPU performance (M1/M2/M3/M4, A-series)
- Low driver overhead
- Unified memory on Apple Silicon

**Key features:**

- Threadgroup (shared) memory via `threadgroup` address space
- SIMD-group operations for warp-level primitives
- Tile-based deferred rendering support

```vex
// This graph fn compiles to MSL for Metal
graph fn vectorAdd(a: Tensor<f32>, b: Tensor<f32>, out: Tensor<f32>!) {
    let idx = thread.x
    if idx < out.len() {
        out[idx] = a[idx] + b[idx]
    }
}
// Compiles to MSL: kernel void vectorAdd(device float* a, device float* b, device float* out, uint idx [[thread_position_in_grid]])
```

## CUDA Backend

Targets NVIDIA GPUs via CUDA. Generates PTX and cubin.

**Strengths:**

- Mature ecosystem, best tooling
- Tensor Cores for matrix operations
- Largest GPU market share in data centers

**Key features:**

- Warp-level primitives (shuffle, vote)
- Tensor Core acceleration for `<*>` operations
- Cooperative groups
- CUDA graphs for kernel launch optimization

```vex
// Matrix multiply uses Tensor Cores on CUDA
graph fn matmul(A: Tensor<f32>, B: Tensor<f32>, C: Tensor<f32>!, M: i32, N: i32, K: i32) {
    let row = block.y * 16 + thread.y
    let col = block.x * 16 + thread.x
    // ... tiled matmul using shared memory ...
    // On CUDA: uses wmma (warp matrix multiply-accumulate) or Tensor Cores
}
```

## ROCm Backend

Targets AMD GPUs. Similar programming model to CUDA (HIP).

**Strengths:**

- AMD GPU support (Radeon Instinct, Radeon Pro)
- HIP compatibility with CUDA tooling
- Growing HPC adoption

## SPIR-V Backend

Generates SPIR-V binary for Vulkan and OpenCL consumption. SPIR-V is the universal GPU intermediate representation.

**Strengths:**

- Write once, run on Vulkan or OpenCL
- Cross-vendor (NVIDIA, AMD, Intel, ARM Mali, Apple via MoltenVK)
- Standardized by Khronos

**Key features:**

- Full SPIR-V 1.5+ support
- Physical storage buffer addressing
- Cooperative matrix (KHR) for tensor operations

## WGSL Backend

Generates WGSL (WebGPU Shading Language) for browser-based GPU compute.

**Strengths:**

- Runs in any modern browser (Chrome, Firefox, Safari, Edge)
- Zero installation for users
- WebGPU standard

**Limitations:**

- Smaller workgroup sizes (max 256 threads typically)
- Limited shared memory (16KB-32KB)
- No cooperative matrix yet (coming in WebGPU 2.0)

```vex
// Same graph fn, compiles to WGSL
// Browser users get GPU acceleration automatically
graph fn processImage(pixels: Tensor<u8>!, width: i32, height: i32) {
    let x = thread.x
    let y = thread.y
    if x < width && y < height {
        let idx = y * width + x
        // Invert colors
        pixels[idx] = 255 - pixels[idx]
    }
}
// Compiles to WGSL: @compute @workgroup_size(16, 16) fn processImage(...)
```

## Vulkan Backend

Direct Vulkan compute shader generation.

**Strengths:**

- Lower overhead than OpenCL
- Modern API, explicit resource management
- Cross-platform (Windows, Linux, Android)

## OpenCL Backend

Generates OpenCL C kernels for broad compatibility.

**Strengths:**

- Runs on almost any GPU (including very old hardware)
- Also runs on CPUs and FPGAs
- Widely supported

## OpenVINO Backend

Targets Intel's OpenVINO inference engine.

**Strengths:**

- Optimized for Intel CPUs (including integrated GPUs)
- INT8/FP16 quantization support
- Model optimization passes

## CoreML Backend

Exports to Apple's CoreML format for on-device inference.

**Strengths:**

- Apple Neural Engine (ANE) acceleration
- On-device privacy
- iOS/macOS/watchOS deployment

## CPU SIMD Backend (Fallback)

When no GPU is available, SIR falls back to CPU SIMD via LLVM:

- SSE (128-bit) on older x86
- AVX2 (256-bit) on modern x86
- AVX-512 (512-bit) on server x86
- NEON (128-bit) on ARM

## Backend Selection

### Automatic Selection

By default, Vex auto-selects the best available backend:

```vex
// Vex probes available hardware and picks the best backend
launch myKernel(data, &!result) with threads: 1024
// Priority: Metal > CUDA > ROCm > Vulkan > SPIR-V > OpenCL > CPU SIMD
```

### Explicit Selection

```vex
// Force a specific backend
#[backend(cuda)]
launch myKernel(data, &!result) with threads: 1024

#[backend(metal)]
launch myKernel(data, &!result) with threads: 1024

#[backend(cpu)]
launch myKernel(data, &!result) with threads: 1024
```

### Feature Detection

```vex
#if target_feature == "cuda"
    // CUDA-specific code path
#elif target_feature == "metal"
    // Metal-specific code path
#else
    // CPU fallback
#endif
```

## SIR Optimization Passes

All backends benefit from SIR-level optimizations before backend-specific codegen:

| Pass         | Description                                                       |
| ------------ | ----------------------------------------------------------------- |
| **Fusion**   | Merges element-wise ops into single kernels                       |
| **Tiling**   | Block decomposition for cache efficiency                          |
| **MatMul**   | Lowers matmuls to hardware-specific ops (Tensor Cores, AMX, etc.) |
| **Layout**   | Selects NHWC vs NCHW, row-major vs column-major                   |
| **Memory**   | Memory coalescing, bank conflict avoidance                        |
| **Simplify** | Algebraic simplification, constant folding                        |
| **Quantize** | INT8/FP16 precision reduction                                     |
| **DCE**      | Dead code elimination                                             |
| **Autograd** | Gradient computation graph generation                             |

## Best Practices

1. Write `graph fn` once, let SIR handle the backend -- avoid backend-specific code.
2. Use `#[backend(...)]` only when you need backend-specific optimizations.
3. Profile on target hardware -- workgroup sizes and shared memory limits vary per backend.
4. Prefer `threadgroup` memory for shared data within workgroups (available on all backends).
5. Test on CPU SIMD fallback first, then validate on GPU hardware.
6. Use SIR fusion aggressively -- fewer kernel launches = better performance.

## Related Pages

- [SIR & Backends](/architecture/sir-and-backends) -- SIR overview
- [SIR Passes Deep Dive](/architecture/sir-passes-deep-dive) -- optimization passes
- [GPU Programming](/guide/gpu/) -- graph functions
