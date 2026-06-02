# GPU & Compute with SIR

SIR (Static Intermediate Representation) is Vex's heterogeneous compute layer. It allows the compiler and runtime to compile, optimize, and dispatch tensor-style operations to parallel execution targets (CPUs and GPUs) transparently.

---

## The Zero-Cost Perception Philosophy

Vex does not force GPU programming through complex shader languages or custom runtime APIs. Instead, the compiler analyzes standard dataflow inside functions marked with `graph fn` to automatically construct a SIR Directed Acyclic Graph (DAG) for parallel execution.

### Perception Example: Dot Product
```vex
graph fn dot(a: Span<f32>, b: Span<f32>): f32 {
    let ta: Tensor<f32> = a;
    let tb: Tensor<f32> = b;
    return <+(ta * tb);
}
```

The compiler detects the element-wise multiplication followed by a sum reduction and lowers it to a SIR `Map` and `Reduce` DAG. The runtime then chooses the best execution path based on the input size.

---

## Metal GPU Backend Architecture

The Metal backend integrates SIR code generation with a runtime dispatch system optimized for Apple Silicon.

### 1. MSL Compliance and Type Parity
* **F64 to F32 Downcasting**: Because many mobile and integrated GPUs do not natively support `double` precision, the compiler downcasts `DType::F64` to `float` in Metal Shading Language (MSL).
* **Deferred Constants**: MSL prohibits non-constant variables at global scope. The compiler automatically defers global constants, emitting them locally inside the generated kernels.
* **Literal Precision**: All literal float values are formatted with explicit type suffixes (e.g., `1.0f` or `1e-5f`) to prevent MSL compiler warnings and type ambiguities.

### 2. Parallel Two-Pass Reduction
To maximize GPU core utilization on Apple Silicon during complex fused operations (such as Softmax and Normalization), Vex uses a **Two-Pass Reduction** architecture:

```
  Pass 1: reduce_kernel (1 Threadgroup, 256 Threads)
  ┌────────────────────────────────────────────────┐
  │ Parallel Tree Reduction using Shared Memory    │
  └───────────────────────┬────────────────────────┘
                          │
                          ▼ Writes partial results
                    _scalars buffer (buffer(4))
                          │
                          ▼ Reads scalar inputs
  Pass 2: map_kernel (N Threads, Full GPU Cores)
  ┌────────────────────────────────────────────────┐
  │ Element-wise computation using unified memory  │
  └────────────────────────────────────────────────┘
```

* **Pass 1: `reduce_kernel`**: Launched with exactly **one threadgroup** (256 threads). Threads perform a binary tree reduction using threadgroup shared memory (`threadgroup float shared_data[256]`) and write the final scalar result to a temporary `_scalars` buffer.
* **Pass 2: `map_kernel`**: Launched with **N threads** to utilize all available GPU compute cores. Threads read the scalar reduction results from the `_scalars` buffer and execute the element-wise portion of the fused operator in parallel.

### 3. Buffer Binding Conventions

Vex structures MSL shader parameters using a rigid buffer binding index convention:

| Buffer Index | Parameter | Description |
| :--- | :--- | :--- |
| **`buffer(0)`** | `output` | Destination pointer for results. |
| **`buffer(1)`** | `input_0` | Primary input tensor buffer. |
| **`buffer(2)`** | `input_1` | Secondary input tensor buffer (or padding for unary operations). |
| **`buffer(3)`** | `N` | Constant integer representing the total number of elements. |
| **`buffer(4)`** | `_scalars` | Temporary buffer passing reduction results between passes. |

---

## Runtime Deferred Dispatch

For functions with dynamic, runtime-sized inputs (e.g., `Span<f32>`), Vex uses a **Deferred Dispatch** strategy to choose the execution path at runtime:

1. **Length Extraction**: The runtime extracts the length field from the incoming `Span` structure.
2. **Complexity Scoring**: The compiler computes a complexity score for the SIR DAG (e.g., `Map` operations score low, `MatMul` and `Reduce` score high) to determine an `adjusted_threshold`.
3. **Safety Clamping**: Any input length larger than `1GB` is clamped to `0` to force a safe CPU fallback on corrupted memory.
4. **Branching**: If the input length exceeds the complexity threshold, execution is routed to the **GPU Path** (Metal). Otherwise, it falls back to the **CPU SIMD Path** (NEON/AVX) to avoid GPU launch overhead.

::: warning UB Prevention: The `noinline` Attribute
LLVM optimizations (like scalar replacement of aggregates) can decompose Span structures into registers, corrupting runtime length extraction. To prevent this, all functions using runtime dispatch are marked `noinline` in the generated LLVM IR, forcing explicit struct `extractvalue` calls.
:::

---

## Special Handling & Optimizations

* **Sentinel Constants (`-1.0`)**: For dynamic spans, the compiler emits a `-1.0` sentinel for `.len()` operations. The runtime automatically replaces this with the actual runtime length before execution.
* **Graph-in-Graph Inlining**: To support composability (e.g., `softmax` calling `reduce_max`), the compiler performs periodic SIR-level inlining, merging separate graphs into a single DAG to enable global kernel fusion.

---

## Target Architectures & Backend Pipelines

Vex compiles and routes Silicon IR (SIR) graphs dynamically based on the platform and hardware configuration:

### 1. CPU SIMD Fallback (AVX-512 / AVX2 / NEON)
If the array length is below the execution threshold, or if no compatible GPU is detected, Vex routes execution to the CPU:
* **Vectorization**: The compiler lowers SIR operations into LLVM vector instructions (e.g., `<8 x float>`).
* **Loop Optimizations**: Loops are annotated with unrolling and vectorization width hints (`llvm.loop.vectorize.width` and `llvm.loop.unroll.enable`) to ensure LLVM generates efficient CPU SIMD instructions (AVX-512, AVX2, or ARM NEON).

### 2. Apple Silicon Metal (macOS)
The primary GPU acceleration pathway on macOS:
* **Zero-Copy / UMA**: Apple Silicon utilizes a Unified Memory Architecture (UMA). The CPU and GPU share the same memory space, completely eliminating PCIe transfer overhead.
* **Dispatch Threshold**: Set to a low **50,000 elements** due to the absence of buffer copying costs.

### 3. Vulkan & SPIR-V (Linux / Windows)
For Linux and Windows platforms, Vex lowers SIR nodes to Vulkan compute shaders:
* **SPIR-V Codegen**: The compiler outputs SPIR-V intermediate binary instructions.
* **PCIe Transfer Overhead**: Since discrete GPUs (NVIDIA/AMD) require copying input buffers over the PCIe bus, the routing complexity model increases the dispatch threshold to **1,000,000 elements** to amortize latency.

### 4. WebGPU & WGSL (Web)
For WASM/Web applications, Vex lowers graphs directly to WebGPU Shading Language (WGSL):
* **WGSL Generation**: Compiles arithmetic and reduction networks into subgroup-accelerated WGSL shaders.
* **Dynamic Loading**: Shaders are loaded and compiled by the browser runtime asynchronously.

---

## Backend Support Summary

| Platform / OS | Primary Target | Shader / IR Pipeline | Memory Model | Status |
| :--- | :--- | :--- | :--- | :--- |
| **macOS** | `Metal` | MSL Compiler | Unified (UMA) | Fully Supported (Optimized) |
| **Linux** | `Vulkan` | SPIR-V Codegen | Discrete / Copied | Supported |
| **Windows** | `Vulkan` | SPIR-V Codegen | Discrete / Copied | Supported |
| **Web / WASM** | `WebGPU` | WGSL Code Generator | Sandboxed / Copied | Supported |
| **Any (Fallback)** | `CPU SIMD` | LLVM Vector IR | CPU Cache | Fully Supported |

---

## Runtime Controls

You can override the automatic GPU dispatch decisions using environment variables:

```bash
# Disable GPU offloading (force CPU SIMD fallback)
VEX_NO_GPU=1 vex run program.vx

# Force GPU offloading regardless of cost model
VEX_FORCE_GPU=1 vex run program.vx

# Select a specific GPU backend
VEX_GPU_BACKEND=metal|vulkan|webgpu vex run program.vx

# Enable verbose dispatch logging
VEX_DISPATCH_VERBOSE=1 vex run program.vx
```

## Next Steps

- [SIMD Auto-Vectorization](/guide/simd) - CPU SIMD details
- [VUMM Memory Model](/guide/memory/vumm) - Automatic memory management
- [Performance](/guide/advanced/performance) - Optimization techniques

