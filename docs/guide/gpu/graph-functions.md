# Graph Functions (GPU Kernels)

`graph fn` is the Vex syntax for defining GPU compute kernels. Graph functions compile through the SIR (Silicon IR) pipeline and can target Metal, CUDA, SPIR-V, WGSL, and other GPU backends.

## Syntax

```vex
graph fn kernelName(params...): ReturnType {
    // GPU kernel body
}
```

A `graph fn` is NOT a regular function -- it runs on the GPU with a parallel execution model.

## Basic GPU Kernel

```vex
// Element-wise vector addition kernel
graph fn vectorAdd(a: Tensor<f32>, b: Tensor<f32>, result: Tensor<f32>!) {
    let idx = thread.x                // global thread index
    if idx < result.len() {
        result[idx] = a[idx] + b[idx]
    }
}

// Host-side dispatch
fn main() {
    let a = Tensor.filled(1.0f32, 1024)
    let b = Tensor.filled(2.0f32, 1024)
    let! result = Tensor.zeros<f32>(1024)

    // Launch kernel with 1024 threads
    launch vectorAdd(a, b, &!result) with threads: 1024
}
```

## Thread Hierarchy

Graph functions have access to GPU thread indexing builtins:

```vex
graph fn matmulKernel(A: Tensor<f32>, B: Tensor<f32>, C: Tensor<f32>!,
                       M: i32, N: i32, K: i32) {
    let row = thread.y       // workgroup-level row
    let col = thread.x       // workgroup-level column

    if row < M && col < N {
        let! sum = 0.0f32
        for k in 0..K {
            sum += A[row * K + k] * B[k * N + col]
        }
        C[row * N + col] = sum
    }
}
```

### Thread Indexing Builtins

| Builtin      | Description                          |
| ------------ | ------------------------------------ |
| `thread.x`   | Thread index in dimension 0 (global) |
| `thread.y`   | Thread index in dimension 1 (global) |
| `thread.z`   | Thread index in dimension 2 (global) |
| `block.x`    | Workgroup/block index in dimension 0 |
| `block.y`    | Workgroup/block index in dimension 1 |
| `block.z`    | Workgroup/block index in dimension 2 |
| `blockDim.x` | Workgroup size in dimension 0        |
| `gridDim.x`  | Grid size in dimension 0             |

### 2D Launch Configuration

```vex
// 2D grid of workgroups, each 16x16 threads
launch myKernel(a, b, &!c)
    with grid: (64, 64),
    block: (16, 16)
```

## Shared Memory / Threadgroup Memory

Use the `threadgroup` address space for on-chip shared memory within a workgroup:

```vex
graph fn tiledMatmul(A: Tensor<f32>, B: Tensor<f32>, C: Tensor<f32>!,
                      M: i32, N: i32, K: i32) {
    let tile_size = 16

    // Threadgroup-shared tiles
    threadgroup let! As: [f32; 256]  // 16x16 tile
    threadgroup let! Bs: [f32; 256]

    let row = block.y * tile_size + thread.y
    let col = block.x * tile_size + thread.x

    let! sum = 0.0f32

    for tile in 0..(K / tile_size) {
        // Cooperative load into shared memory
        As[thread.y * tile_size + thread.x] = A[row * K + tile * tile_size + thread.x]
        Bs[thread.y * tile_size + thread.x] = B[(tile * tile_size + thread.y) * N + col]

        threadgroup.barrier()  // synchronize workgroup

        // Compute from shared memory (much faster)
        for k in 0..tile_size {
            sum += As[thread.y * tile_size + k] * Bs[k * tile_size + thread.x]
        }

        threadgroup.barrier()
    }

    if row < M && col < N {
        C[row * N + col] = sum
    }
}
```

## GPU Memory Address Spaces

| Address Space   | Keyword       | Description                                  |
| --------------- | ------------- | -------------------------------------------- |
| Global / Device | (default)     | GPU global memory, accessible by all threads |
| Threadgroup     | `threadgroup` | On-chip shared memory within a workgroup     |
| Constant        | `constant`    | Read-only constant memory                    |
| Thread / Local  | (per-thread)  | Each thread's registers / local variables    |

```vex
graph fn withConstantMem(values: Tensor<f32>, result: Tensor<f32>!) {
    constant let scale: f32 = 2.0     // loaded once, broadcast to all threads
    let idx = thread.x
    if idx < result.len() {
        result[idx] = values[idx] * scale
    }
}
```

## Returning Values from Graph Functions

Graph functions typically write results through mutable tensor parameters rather than returning values directly:

```vex
// Mutable output parameter pattern
graph fn compute(a: Tensor<f32>, b: Tensor<f32>, out: Tensor<f32>!) {
    let idx = thread.x
    if idx < out.len() {
        out[idx] = a[idx] + b[idx]
    }
}

// Caller provides output buffer
let! output = Tensor.zeros<f32>(1024)
compute(a, b, &!output)
```

## Graph Function Restrictions

Graph functions have stricter rules than regular functions:

1. **No heap allocation** -- cannot use `Box.new()`, `Vec.new()`, `string` creation.
2. **No recursion** -- GPU kernels cannot be recursive.
3. **No `go` blocks or `await`** -- graph functions are synchronous GPU code.
4. **No FFI calls** -- cannot call C functions.
5. **No exceptions/panics that escape the kernel** -- use `return` for early exit.
6. **Fixed-size loops preferred** -- the compiler can optimize compile-time-known loop bounds better.

## SIR Pipeline for Graph Functions

When you compile a `graph fn`, it flows through the SIR pipeline:

```
graph fn → HIR → SIR Graph → Optimization Passes → GPU Backend
                                                         ↓
                                         Metal | CUDA | SPIR-V | WGSL | ...
```

### Optimization Passes Applied

| Pass         | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| **Fusion**   | Merges compatible operations to reduce kernel launches       |
| **Tiling**   | Breaks large tensors into cache-optimal blocks               |
| **Memory**   | Optimizes memory access patterns, coalescing                 |
| **MatMul**   | Specialized matrix multiplication lowering                   |
| **Layout**   | Selects optimal data layout (row-major, column-major, tiled) |
| **Simplify** | Algebraic simplification, constant folding                   |
| **DCE**      | Dead code elimination                                        |
| **Quantize** | Reduces precision (f32→f16, i8) where safe                   |

## Multi-Backend Dispatch

The same `graph fn` compiles to multiple backends:

```vex
// Single graph fn, compiles to ALL backends
graph fn relu(input: Tensor<f32>, output: Tensor<f32>!) {
    let idx = thread.x
    if idx < output.len() {
        output[idx] = max(0.0f32, input[idx])
    }
}

// Dispatch based on available hardware
fn applyRelu(data: Tensor<f32>): Tensor<f32> {
    let! result = Tensor.zeros<f32>(data.len())

    // Vex selects the best available backend at runtime
    launch relu(data, &!result) with threads: data.len()

    return result
}
```

Backend priority (auto-selected):

1. **Metal** -- Apple GPUs (M1/M2/M3/M4)
2. **CUDA** -- NVIDIA GPUs
3. **ROCm** -- AMD GPUs
4. **Vulkan** -- Cross-platform GPU
5. **SPIR-V** -- Universal GPU IR
6. **WGSL** -- WebGPU (browser)
7. **OpenCL** -- Legacy cross-platform
8. **OpenVINO** -- Intel inference accelerators
9. **CoreML** -- Apple Neural Engine
10. **CPU SIMD** -- Fallback to CPU vectorization

## Best Practices

1. Use `threadgroup` memory for data reused within a workgroup -- it is ~100x faster than global memory.
2. Use `threadgroup.barrier()` to synchronize threads within a workgroup when sharing data.
3. Keep workgroup sizes as multiples of the hardware warp/wavefront size (32 for NVIDIA, 32 for Apple, 64 for AMD).
4. Prefer `Tensor<T>` (DynTensor) for GPU kernel parameters for maximum flexibility.
5. Use fused operations when possible -- `a *+ b + c` compiles to a single FMA instruction.
6. Profile with different workgroup sizes -- optimal size depends on register pressure and shared memory usage.

## Related Pages

- [GPU Overview](/guide/gpu/) -- GPU programming in Vex
- [Fusion Graph](/guide/fusion/graph) -- SIR operation fusion
- [SIR Pipeline](/guide/simd/sir-pipeline) -- SIR compilation pipeline
- [SIR Backends Reference](/architecture/sir-backends-reference) -- all GPU backends
