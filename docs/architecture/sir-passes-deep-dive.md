# SIR Optimization Passes

The Silicon IR (SIR) pipeline applies a series of optimization passes before lowering to target-specific GPU or CPU code. This page catalogs the pass pipeline based on the current `vex-sir` crate structure.

> **Status:** SIR is under active development. Pass names and ordering reflect the current codebase (`crates/vex-sir/src/passes/`). Pass heuristics and thresholds are subject to change. See the source for authoritative details.

## Pass Pipeline Order

```
SIR Graph (from graph fn)
        |
        v
[1] Simplify       -- Algebraic simplification, constant folding
        |
        v
[2] Fusion         -- Merge compatible operations
        |
        v
[3] Layout         -- Select optimal data layout
        |
        v
[4] Tiling         -- Block decomposition for cache
        |
        v
[5] MatMul         -- Specialized matrix multiply lowering
        |
        v
[6] Memory         -- Memory coalescing, bank conflict avoidance
        |
        v
[7] Quantize       -- Precision reduction (f32->f16/i8)
        |
        v
[8] DCE            -- Dead code elimination
        |
        v
[9] Legalize       -- Lower to backend-supported operations
        |
        v
[10] Autograd      -- Generate gradient graph (if training)
        |
        v
Target Backend (Metal / CUDA / SPIR-V / WGSL / CPU SIMD)
```

## 1. Simplify Pass

Performs compile-time algebraic simplification and constant folding.

### Transformations

| Pattern                       | Simplified To                  |
| ----------------------------- | ------------------------------ |
| `x * 1`                       | `x`                            |
| `x + 0`                       | `x`                            |
| `x * 0`                       | `0` (broadcast)                |
| `x - x`                       | `0` (broadcast)                |
| `x / 1`                       | `x`                            |
| `-( -x )`                     | `x`                            |
| `(x + c1) + c2`               | `x + (c1+c2)`                  |
| `transpose(transpose(x))`     | `x`                            |
| `reshape(reshape(x, s1), s2)` | `reshape(x, s2)` if compatible |

### Constant Folding

```vex
// Before simplify:
let result = data * (2.0 + 3.0)   // 2.0 + 3.0 computed at runtime

// After simplify:
let result = data * 5.0            // constant folded at compile time
```

## 2. Fusion Pass

Merges multiple element-wise operations into a single kernel, eliminating intermediate memory allocations and kernel launch overhead.

### Fusion Rules

**Element-wise fusion** -- Operations without data dependencies between them:

```vex
// Before fusion (3 separate kernel launches):
let a = input + bias          // kernel 1: add
let b = a * scale              // kernel 2: mul
let c = b.relu()               // kernel 3: relu

// After fusion (1 kernel launch):
graph fn fused_add_mul_relu(input, bias, scale, output) {
    let idx = thread.x
    let tmp = input[idx] + bias
    tmp = tmp * scale
    output[idx] = max(0.0, tmp)   // all in one pass
}
```

**Reduce+Elementwise fusion** -- Element-wise op after reduction:

```vex
// Before fusion:
let sum = <+ data               // reduction kernel
let normalized = data / sum     // element-wise kernel

// After fusion: compute sum first, then divide in same kernel
// (requires two-pass: first pass computes sum to shared memory,
//  second pass divides each element)
```

### Fusion Heuristics

Fusion is skipped when:

- Combined kernel would exceed register pressure limits
- Shared memory would exceed device limits
- Operations have conflicting memory access patterns
- Kernel would be too large (instruction cache thrashing)

### Fusion Decision Engine

Located in `fusion_decision/`, evaluates each candidate fusion against:

- **Register pressure model:** Estimates register usage per thread
- **Occupancy impact:** How fusion affects GPU occupancy
- **Memory bandwidth savings:** Eliminated intermediate buffers
- **Launch overhead savings:** Fewer kernel launches

## 3. Layout Pass

Selects the optimal data layout for tensor operations based on access patterns.

### Layout Options

| Layout                  | Description                | Best For               |
| ----------------------- | -------------------------- | ---------------------- |
| **Row-major** (default) | Last dimension contiguous  | Row-wise access, CPU   |
| **Column-major**        | First dimension contiguous | Column-wise access     |
| **NHWC**                | Batch-Height-Width-Channel | Convolutions on GPU    |
| **NCHW**                | Batch-Channel-Height-Width | Convolutions on CPU    |
| **Tiled**               | Blocked layout             | Matrix multiply        |
| **Interleaved**         | Strided layout             | SIMD gather operations |

### Layout Selection

The pass analyzes tensor usage in the graph:

- If a tensor is used in a convolution → NHWC (GPU) or NCHW (CPU)
- If used in matrix multiply → Tiled
- If used only in element-wise ops → Row-major (default)

```vex
// Transparent to user -- compiler inserts layout transformations
graph fn processImage(input: Tensor<f32>!): Tensor<f32> {
    // User writes natural code
    let result = conv2d(input, kernel)  // SIR inserts NHWC layout here
    let activated = result.relu()
    return activated
}
```

## 4. Tiling Pass

Decomposes large tensor operations into cache-friendly blocks.

### Tiling Strategy

For a matrix multiply `C[M,N] = A[M,K] * B[K,N]`:

```
Without tiling:   1 kernel, O(M*N*K) global memory accesses
With tiling:      M/tile_M * N/tile_N kernels, each O(tile_M*tile_N*K) shared memory accesses
```

### Tile Size Selection

Tile sizes are chosen to maximize:

- **Shared memory utilization:** Tile fits in threadgroup memory
- **Register usage:** Each thread's tile portion fits in registers
- **Occupancy:** Enough threads per workgroup to hide latency

```vex
// Conceptual tiling (compiler output, not user code)
graph fn tiledMatmul(A, B, C, M, N, K) {
    let TILE = 16  // compiler-selected

    threadgroup let! As: [f32; TILE * TILE]
    threadgroup let! Bs: [f32; TILE * TILE]

    for tile in 0..(K / TILE) {
        // Cooperative load tile into shared memory
        As[thread.y * TILE + thread.x] = A[row * K + tile * TILE + thread.x]
        Bs[thread.y * TILE + thread.x] = B[(tile * TILE + thread.y) * N + col]
        threadgroup.barrier()

        // Compute from shared memory
        for k in 0..TILE {
            sum += As[thread.y * TILE + k] * Bs[k * TILE + thread.x]
        }
        threadgroup.barrier()
    }
}
```

## 5. MatMul Pass

Specializes matrix multiplications for target hardware.

### Hardware-Specific Lowering

| Hardware            | Lowering                                 |
| ------------------- | ---------------------------------------- |
| NVIDIA Tensor Cores | `wmma` (Warp Matrix Multiply-Accumulate) |
| Apple AMX           | Apple Matrix coprocessor instructions    |
| ARM SME             | Scalable Matrix Extension                |
| Intel AMX           | Advanced Matrix Extensions               |
| CPU SIMD            | Tiled loop with FMA instructions         |
| Generic GPU         | Tiled shared-memory matmul               |

### Precision Selection

```vex
// User writes:
let C = A <*> B          // f32 matmul

// SIR MatMul pass may lower to:
// - f16 accumulation on hardware that benefits (Tensor Cores)
// - i8 quantized matmul if A and B are quantized
// - f32 FMA on CPU
```

## 6. Memory Pass

Optimizes memory access patterns for coalescing and bank conflict avoidance.

### Transformations

- **Coalescing:** Reorders thread->data mapping so adjacent threads access adjacent memory
- **Bank conflict avoidance:** Pads shared memory arrays to avoid bank conflicts
- **Prefetch insertion:** Adds hardware prefetch hints for sequential access patterns
- **Vectorization:** Combines multiple scalar loads into vector loads

```vex
// Before memory optimization:
// Thread 0 accesses addresses 0, 16, 32, 48  (strided, bad)
// Thread 1 accesses addresses 1, 17, 33, 49
// ...

// After memory optimization (coalescing):
// Thread 0 accesses addresses 0, 1, 2, 3     (sequential, good)
// Thread 1 accesses addresses 4, 5, 6, 7
// ...
```

## 7. Quantize Pass

Reduces numerical precision where safe, improving performance and reducing memory bandwidth.

### Supported Quantizations

| From | To   | Speedup | Accuracy Impact              |
| ---- | ---- | ------- | ---------------------------- |
| f32  | f16  | ~2x     | Minimal (ML workloads)       |
| f32  | bf16 | ~2x     | Similar to f16, better range |
| f32  | i8   | ~4x     | Moderate (needs calibration) |
| f32  | i4   | ~8x     | Significant (specialized HW) |

### Quantization Strategies

- **Static quantization:** Scale/zero-point computed at compile time
- **Dynamic quantization:** Scale computed per-tensor at runtime
- **Per-channel quantization:** Separate scale per output channel (better accuracy)

```vex
// User opt-in to quantization
#[quantize(f16)]
graph fn inferenceModel(input: Tensor<f32>!): Tensor<f32> {
    // All intermediate computations use f16
    let h1 = input <*> weights1 + bias1   // f16 matmul
    let a1 = h1.relu()                      // f16 activation
    let h2 = a1 <*> weights2 + bias2       // f16 matmul
    return h2
}
```

## 8. DCE (Dead Code Elimination)

Removes operations whose results are never used. Critical after fusion changes data flow.

```vex
// Before DCE:
let a = computeExpensive(x)   // result never used
let b = computeSimple(x)
return b

// After DCE:
let b = computeSimple(x)
return b
// computeExpensive removed entirely
```

## 9. Legalize Pass

Lowers operations not natively supported by the target backend.

| Operation       | Backends Needing Legalization    | Lowered To             |
| --------------- | -------------------------------- | ---------------------- |
| i8 matmul       | WGSL (no cooperative matrix)     | f32 matmul             |
| f64 operations  | Metal (limited f64 on some GPUs) | f32 or software f64    |
| Atomics on f32  | WGSL, older Metal                | CAS loop on i32        |
| Dynamic reshape | WGSL                             | Copy to new allocation |

## 10. Autograd Pass

For training workloads, automatically generates the backward pass (gradient computation).

```vex
// User writes forward pass:
graph fn forward(x: Tensor<f32>): Tensor<f32> {
    let h = x <*> w + b
    return h.relu()
}

// Autograd pass generates backward pass:
graph fn backward(gradOutput: Tensor<f32>, x: Tensor<f32>, w: Tensor<f32>): (Tensor<f32>, Tensor<f32>) {
    let gradRelu = gradOutput * (forward(x) > 0.0).toF32()  // relu gradient
    let gradW = gradRelu <*> x.transpose()                   // weight gradient
    let gradX = w.transpose() <*> gradRelu                   // input gradient
    return (gradX, gradW)
}
```

## Pass Configuration

Control SIR passes via compiler flags:

```bash
# Disable specific passes
vex compile --sir-disable-fusion model.vx
vex compile --sir-disable-quantize model.vx

# Set tile size
vex compile --sir-tile-size=32 model.vx

# Force quantization
vex compile --sir-quantize=f16 model.vx

# Profile SIR passes
vex compile --sir-profile model.vx
# Output: pass timings, fusion decisions, memory savings
```

## Best Practices

1. Let SIR handle optimization -- write clean `graph fn` code and trust the passes.
2. Use `#[quantize(f16)]` for inference workloads where f16 precision is sufficient.
3. Profile with `--sir-profile` to identify bottlenecks before manually tuning.
4. Use `--sir-disable-fusion` for debugging numerical issues -- isolate whether fusion introduced errors.
5. Keep tensor dimensions as multiples of tile sizes (commonly 16 or 32) for optimal tiling.

## Related Pages

- [SIR & Backends](/architecture/sir-and-backends) -- SIR overview
- [SIR Backends Reference](/architecture/sir-backends-reference) -- target backends
- [Fusion Graph](/guide/fusion/graph) -- operation fusion
