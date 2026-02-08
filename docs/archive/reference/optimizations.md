# Automatic Optimization (Smart Compiler)

**Version:** 0.2.0  
**Last Updated:** December 2025

This document defines Vex's core philosophy of **automatic hardware optimization**. Unlike traditional systems languages that require manual annotations for SIMD, GPU, or parallel execution, Vex's compiler automatically determines the optimal execution strategy.

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [How It Works](#how-it-works)
3. [Purity Analysis](#purity-analysis)
4. [Cost Model](#cost-model)
5. [Execution Strategies](#execution-strategies)
6. [Start-Time Constants](#start-time-constants)
7. [Runtime Dispatch](#runtime-dispatch)
8. [Compiler Hints (Optional)](#compiler-hints-optional)
9. [Examples](#examples)
10. [Deprecated Keywords](#deprecated-keywords)

---

## Philosophy

### The Problem with Manual Optimization

Traditional languages require developers to be hardware experts:

```c
// C - Manual SIMD (requires AVX knowledge)
__m256 a = _mm256_load_ps(arr);
__m256 b = _mm256_load_ps(arr2);
__m256 c = _mm256_add_ps(a, b);

// CUDA - Manual GPU (requires CUDA knowledge)
__global__ void kernel(float* data) { ... }

// OpenMP - Manual threading
#pragma omp parallel for simd
for (int i = 0; i < n; i++) { ... }
```

**Problems**:
- Developer must understand hardware details
- Code is not portable across architectures
- Optimization is error-prone
- Maintenance burden increases

### The Vex Approach

**"Describe WHAT you want, not HOW to compute it."**

```vex
// Developer writes intent
fn process(data: [f32]): [f32] {
    return data.map(|x| x * 2.0 + 1.0);
}
```

**Compiler decides**:
- Scalar loop for tiny data
- SIMD for medium data
- Multi-threaded SIMD for large data
- GPU offload for massive data (if available)

---

## How It Works

```
                    VEX SOURCE CODE
                          │
                          ▼
              ┌───────────────────────┐
              │   SEMANTIC ANALYSIS   │
              │   ─────────────────   │
              │   • Pure function?    │
              │   • Side effects?     │
              │   • Data dependency?  │
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   COST MODEL ANALYSIS │
              │   ─────────────────── │
              │   • Data size         │
              │   • Memory pattern    │
              │   • Arithmetic ops    │
              │   • Target hardware   │
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   STRATEGY SELECTION  │
              │   ──────────────────  │
              │   Scalar│SIMD│Thread│GPU│
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   CODE GENERATION     │
              │   ──────────────────  │
              │   + Runtime dispatch  │
              │     (if size unknown) │
              └───────────────────────┘
```

---

## Purity Analysis

The compiler analyzes functions to determine if they can be safely parallelized:

### Pure Functions (Parallelizable)

```vex
// ✅ Pure: No side effects, deterministic
fn square(x: f32): f32 {
    return x * x;
}

// ✅ Pure: Operates only on inputs
fn add_vectors(a: [f32], b: [f32]): [f32] {
    return a.zip(b).map(|(x, y)| x + y);
}
```

### Impure Functions (Sequential)

```vex
// ❌ Impure: Mutates external state
let! counter = 0;
fn increment(): i32 {
    counter++;  // Side effect
    return counter;
}

// ❌ Impure: I/O operation
fn log_value(x: i32) {
    (x);  // Side effect
}
```

### Analysis Rules

| Pattern | Classification | Parallelizable |
|---------|---------------|----------------|
| No mutation of captured variables | Pure | ✅ |
| No I/O operations | Pure | ✅ |
| No global state access | Pure | ✅ |
| Deterministic output | Pure | ✅ |
| Mutates `self` only | Pure-ish | ⚠️ (with care) |
| Any side effect | Impure | ❌ |

---

## Cost Model

The compiler uses a cost model to select the optimal strategy:

### Thresholds (Configurable)

| Threshold | Default | Description |
|-----------|---------|-------------|
| `SCALAR_MAX` | 64 elements | Use scalar below this |
| `SIMD_MAX` | 64KB | Use SIMD only below this |
| `THREAD_MIN` | 64KB | Multi-thread above this |
| `GPU_MIN` | 1MB | Consider GPU above this |

### Decision Factors

1. **Data Size**: Static or dynamic
2. **Operation Complexity**: Simple (add) vs complex (sqrt)
3. **Memory Access Pattern**: Sequential vs random
4. **Data Dependencies**: Independent vs chain
5. **Hardware Availability**: SIMD width, GPU presence

### Example Decision Tree

```
Input: data.map(|x| x * 2.0)

├── data.() < 64
│   └── Scalar loop
├── data.() < 64KB
│   └── SIMD (AVX-512 if available, else AVX2, else SSE)
├── data.() < 1MB
│   └── SIMD + Multi-threaded (work-stealing)
└── data.() >= 1MB && gpu_available
    └── GPU offload (async memory transfer)
```

---

## Execution Strategies

### Strategy 1: Scalar

For very small data or complex control flow:

```vex
// Compiler generates simple loop
for i in 0..data.() {
    result[i] = data[i] * 2.0;
}
```

### Strategy 2: SIMD

For medium data with simple operations:

```llvm
; Compiler generates vectorized code
%vec = load <8 x float>, ptr %data
%mul = fmul <8 x float> %vec, <2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0>
store <8 x float> %mul, ptr %result
```

### Strategy 3: Multi-threaded

For large data:

```
Thread 0: process data[0..N/4]
Thread 1: process data[N/4..N/2]
Thread 2: process data[N/2..3N/4]
Thread 3: process data[3N/4..N]
```

### Strategy 4: GPU Offload

For massive data with available GPU:

```
1. Async copy data to GPU
2. Launch kernel (threads = data.())
3. Async copy result back
4. Synchronize
```

---

## Start-Time Constants

Vex initializes **system capability constants** at program startup, before `main()` executes. These constants enable intelligent runtime dispatch decisions.

### The `sys` Module

All start-time constants are available through the `sys` module:

```vex
import sys;

fn main() {
    ("CPU Cores: {}", sys.CPU_CORES);
    ("SIMD Width: {}", sys.SIMD_WIDTH);
    ("GPU Available: {}", sys.GPU_AVAILABLE);
}
```

### CPU Information

| Constant | Type | Description |
|----------|------|-------------|
| `sys.CPU_CORES` | `u32` | Number of physical CPU cores |
| `sys.CPU_THREADS` | `u32` | Number of logical threads (with hyperthreading) |
| `sys.CPU_ARCH` | `string` | Architecture name: `"x86_64"`, `"aarch64"`, etc. |
| `sys.CPU_VENDOR` | `string` | Vendor: `"Intel"`, `"AMD"`, `"Apple"`, etc. |
| `sys.CPU_MODEL` | `string` | Full model name |

### SIMD Capabilities

| Constant | Type | Description |
|----------|------|-------------|
| `sys.SIMD_WIDTH` | `u32` | Maximum SIMD register width in bits (128, 256, 512) |
| `sys.HAS_SSE` | `bool` | SSE support (128-bit, x86) |
| `sys.HAS_SSE2` | `bool` | SSE2 support |
| `sys.HAS_SSE4` | `bool` | SSE4.1/4.2 support |
| `sys.HAS_AVX` | `bool` | AVX support (256-bit, x86) |
| `sys.HAS_AVX2` | `bool` | AVX2 support |
| `sys.HAS_AVX512` | `bool` | AVX-512 support (512-bit, x86) |
| `sys.HAS_NEON` | `bool` | ARM NEON support (128-bit, ARM) |
| `sys.HAS_SVE` | `bool` | ARM SVE support (scalable, ARM) |

### GPU Information

| Constant | Type | Description |
|----------|------|-------------|
| `sys.GPU_AVAILABLE` | `bool` | Any compute GPU available |
| `sys.GPU_COUNT` | `u32` | Number of compute GPUs |
| `sys.GPU_BACKEND` | `string` | Backend: `"cuda"`, `"metal"`, `"vulkan"`, `"none"` |
| `sys.GPU_DEVICES` | `[GpuDevice]` | List of GPU device info |

### GpuDevice Structure

```vex
struct GpuDevice {
    name: string,           // "NVIDIA RTX 4090", "Apple M3 Max"
    vendor: string,         // "NVIDIA", "AMD", "Apple", "Intel"
    memory_mb: u64,         // VRAM in megabytes
    compute_units: u32,     // Number of compute units/SMs
    max_threads: u32,       // Max threads per block
    supports_f16: bool,     // Half-precision support
    supports_f64: bool,     // Double-precision support
}
```

### Memory Information

| Constant | Type | Description |
|----------|------|-------------|
| `sys.TOTAL_MEMORY_MB` | `u64` | Total system RAM in MB |
| `sys.AVAILABLE_MEMORY_MB` | `u64` | Available RAM at startup |
| `sys.PAGE_SIZE` | `u32` | Memory page size in bytes |
| `sys.CACHE_LINE_SIZE` | `u32` | CPU cache line size (usually 64) |
| `sys.L1_CACHE_KB` | `u32` | L1 data cache size per core |
| `sys.L2_CACHE_KB` | `u32` | L2 cache size per core |
| `sys.L3_CACHE_MB` | `u32` | L3 cache size (shared) |

### Platform Information

| Constant | Type | Description |
|----------|------|-------------|
| `sys.OS` | `string` | Operating system: `"linux"`, `"macos"`, `"windows"` |
| `sys.OS_VERSION` | `string` | OS version string |
| `sys.ENDIAN` | `string` | Byte order: `"little"` or `"big"` |
| `sys.POINTER_SIZE` | `u32` | Pointer size in bytes (4 or 8) |

### Compile-Time vs Start-Time

| Type | When Evaluated | Use Case |
|------|----------------|----------|
| **Compile-time** | During compilation | Type sizes, platform-specific code |
| **Start-time** | Program startup (once) | Hardware detection, optimization dispatch |
| **Run-time** | During execution | Dynamic values, user input |

```vex
// Compile-time constant (embedded in binary)
const MAX_BUFFER = 1024;

// Start-time constant (detected at startup)
let optimal_threads = sys.CPU_CORES;

// Runtime variable (changes during execution)
let! current_load = get_cpu_load();
```

### How Runtime Uses Start-Time Constants

The automatic optimization dispatch uses these constants:

```vex
// Internal dispatch logic (conceptual)
fn __dispatch_strategy(data_size: usize): Strategy {
    if data_size < 64 {
        return Strategy.Scalar;
    }
    
    if data_size < sys.L2_CACHE_KB * 1024 {
        // Fits in L2 cache - single-thread SIMD
        return Strategy.Simd(sys.SIMD_WIDTH);
    }
    
    if data_size < sys.GPU_DEVICES[0].memory_mb * 1024 * 1024 && sys.GPU_AVAILABLE {
        // Large but fits in GPU memory
        return Strategy.Gpu;
    }
    
    // Multi-threaded with cache-aware chunking
    return Strategy.Threaded(sys.CPU_CORES);
}
```

### Initialization Timing

```
┌──────────────────────────────────────────────────────────────┐
│                     PROGRAM STARTUP                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Load executable                                          │
│  2. Initialize runtime                                       │
│  3. ★ DETECT SYSTEM CAPABILITIES ★                          │
│     ├── Query CPUID (x86) / system registers (ARM)          │
│     ├── Enumerate GPUs (Vulkan/Metal/CUDA)                   │
│     ├── Query memory info                                    │
│     └── Store in sys.* constants                             │
│  4. Initialize global constructors                           │
│  5. Call main()                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Example: Adaptive Algorithm Selection

```vex
import sys;

fn matrix_multiply(a: Matrix, b: Matrix): Matrix {
    let size = a.rows * a.cols * b.cols;
    
    // Algorithm selection based on hardware
    if sys.GPU_AVAILABLE && size > 1_000_000 {
        return gpu_matmul(a, b);
    } else if sys.HAS_AVX512 && size > 10_000 {
        return avx512_matmul(a, b);
    } else if sys.HAS_AVX2 && size > 1_000 {
        return avx2_matmul(a, b);
    } else {
        return naive_matmul(a, b);
    }
}
```

### Lazy Initialization

Some expensive detections are lazy-initialized on first access:

```vex
// GPU enumeration happens only when first accessed
if sys.GPU_AVAILABLE {  // First access - triggers GPU detection
    let devices = sys.GPU_DEVICES;  // Already cached
}
```

---

## Runtime Dispatch

When data size is unknown at compile time, the compiler generates dispatch code:

```vex
// User code
fn process(data: [f32]): [f32] {
    return data.map(|x| x * x);
}
```

```llvm
; Generated dispatch code
define @process(%data) {
    %len = call @vec_len(%data)
    
    %is_tiny = icmp ult %len, 64
    br i1 %is_tiny, label %scalar, label %check_simd
    
check_simd:
    %is_small = icmp ult %len, 65536
    br i1 %is_small, label %simd, label %check_gpu
    
check_gpu:
    %gpu_ok = call @gpu_available()
    %is_huge = icmp ugt %len, 1048576
    %use_gpu = and i1 %gpu_ok, %is_huge
    br i1 %use_gpu, label %gpu, label %threaded
    
scalar:
    call @process_scalar(%data)
    br label %done
    
simd:
    call @process_simd(%data)
    br label %done
    
threaded:
    call @process_threaded(%data)
    br label %done
    
gpu:
    call @process_gpu(%data)
    br label %done
    
done:
    ret %result
}
```

---

## Compiler Hints (Optional)

While automatic optimization is preferred, developers can provide hints when they know better:

### Performance Hints

```vex
// Hint: This data is always large, prefer GPU
#[prefer_gpu]
fn train_model(weights: [f32]): [f32] {
    // Compiler biases toward GPU
}

// Hint: This must be sequential (has hidden state)
#[sequential]
fn stateful_process(data: [f32]): [f32] {
    // Compiler won't parallelize
}

// Hint: Data is always small
#[inline]
fn tiny_compute(x: f32): f32 {
    return x * x;
}
```

### Disabling Optimization

```vex
// Force scalar execution (debugging)
#[no_vectorize]
fn debug_process(data: [f32]): [f32] {
    // Always scalar
}
```

**Note**: Hints are suggestions, not commands. The compiler may ignore them if analysis shows they're suboptimal.

---

## Examples

### Example 1: Vector Operations

```vex
fn dot_product(a: [f32], b: [f32]): f32 {
    return a.zip(b).map(|(x, y)| x * y).sum();
}
```

**Compiler Analysis**:
- Pure function ✅
- Reduction pattern (sum)
- Memory: sequential access

**Generated Code**:
- Small: Scalar accumulator
- Medium: SIMD with horizontal add
- Large: Parallel reduction tree

### Example 2: Image Processing

```vex
fn blur(image: [[f32; W]; H], kernel: [[f32; 3]; 3]): [[f32; W]; H] {
    return image.convolve(kernel);
}
```

**Compiler Analysis**:
- Pure function ✅
- 2D stencil pattern
- Memory: regular 2D access

**Generated Code**:
- Small image: Scalar nested loops
- Medium image: SIMD rows + cache blocking
- Large image: GPU kernel (2D grid)

### Example 3: Sorting

```vex
fn sort(data: [i32]!): [i32] {
    return data.sorted();
}
```

**Compiler Analysis**:
- In-place mutation (careful!)
- Comparison-based
- Memory: random access

**Generated Code**:
- Small: Insertion sort
- Medium: Quick sort (SIMD comparisons)
- Large: Parallel merge sort

---

## Deprecated Keywords

The following keywords are **deprecated** and will be removed in future versions:

| Keyword | Status | Replacement |
|---------|--------|-------------|
| `fn` | ⚠️ Deprecated | Automatic GPU detection |
| `launch` | ⚠️ Deprecated | Automatic dispatch |
| `@vectorize` | ⚠️ Deprecated | Automatic SIMD |
| `@gpu` | ⚠️ Deprecated | Automatic GPU detection |

### Migration Guide

**Before (Manual)**:
```vex
@vectorize
fn process(data: [f32]): [f32] {
    // ...
}

fn kernel(data: [f32]): [f32] {
    // ...
}

let result = launch kernel(data);
```

**After (Automatic)**:
```vex
fn process(data: [f32]): [f32] {
    // Compiler handles optimization
}

fn compute(data: [f32]): [f32] {
    // Same function, compiler chooses CPU or GPU
}

let result = compute(data);  // Automatic dispatch
```

---

## Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| Purity Analysis | 🚧 Partial | Basic side-effect detection |
| SIMD Auto-vectorization | 🚧 Planned | Via LLVM |
| Multi-thread dispatch | 🚧 Planned | Work-stealing runtime |
| GPU detection | 🚧 Planned | Vulkan/Metal/CUDA |
| Runtime dispatch | 🚧 Planned | Threshold-based |
| Cost model | 🚧 Planned | Configurable |

---

## Configuration

### Compiler Flags

```bash
# Set optimization level
vex build --opt-level=3

# Disable GPU offloading
vex build --no-gpu

# Set SIMD target
vex build --simd=avx512

# Profile-guided optimization
vex build --pgo=profile.data
```

### Environment Variables

```bash
# Runtime GPU threshold override
VEX_GPU_THRESHOLD=10000000  # 10MB

# Force CPU-only execution
VEX_NO_GPU=1

# Thread count
VEX_THREADS=8
```

---

## Comparison with Other Languages

| Language | Vectorization | GPU | Threading | Automatic |
|----------|---------------|-----|-----------|-----------|
| C | Manual intrinsics | Manual CUDA | Manual pthreads | ❌ |
| Rust | Auto (limited) | Manual | Manual | ⚠️ |
| Go | ❌ | ❌ | Easy goroutines | ⚠️ |
| Julia | Auto JIT | Auto | Auto | ✅ |
| Mojo | Manual hints | Manual | Manual | ⚠️ |
| **Vex** | **Auto** | **Auto** | **Auto** | **✅** |

---

**Previous**: [24_Context.md](./24_Context.md)  
**Next**: [99_BUILTINS.md](./99_BUILTINS.md)

**Maintained by**: Vex Language Team
