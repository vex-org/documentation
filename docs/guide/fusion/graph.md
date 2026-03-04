# Graph Functions

Graph functions compile **entire function bodies** as optimized compute graphs. The compiler automatically fuses operations, eliminates intermediate allocations, and dispatches to the optimal hardware — GPU or SIMD.

## Quick Start

```vex
// Add the `graph` keyword before your function name
graph dot(a: [f32; N], b: [f32; N]): f32 {
    return <+ (a * b);
}

fn main(): i32 {
    let x = [2.0f32; 100000];
    let y = [3.0f32; 100000];
    let result = dot(x, y);  // → GPU dispatch on Apple Silicon
    $println("dot = {}", result);
    return 0;
}
```

**What happens behind the scenes:**

1. Compiler parses the entire `graph` body into a computation graph (SIR DAG)
2. Fusion pass merges `a * b` + `<+` into a single fused operation
3. Dispatch policy checks data size and hardware:
   - **100K floats on Apple M2** → Metal GPU compute kernel
   - **100 floats** → SIMD vectorized loop (AVX-512 / NEON)
4. Zero intermediate arrays allocated

## Why Graph Functions?

### Without `graph`

```vex
fn slow_normalize(x: [f32; N]): [f32; N] {
    let mean = <+ x / N;              // Loop 1 + temp scalar
    let centered = x - mean;           // Loop 2 + temp array [N]
    let sq = centered * centered;      // Loop 3 + temp array [N]
    let variance = <+ sq / N;         // Loop 4 + temp scalar
    return centered / sqrt(variance);  // Loop 5 + temp array [N]
}
// 5 loops, 3 temporary arrays, 5× cache misses
```

### With `graph`

```vex
graph normalize(x: [f32; N]): [f32; N] {
    let mean = <+ x / N;
    let centered = x - mean;
    let variance = <+ (centered * centered) / N;
    return centered / sqrt(variance);
}
// GPU: 2 kernels (fused reduce + fused elementwise), 0 temp arrays
// SIMD: 2 vectorized loops, 0 temp arrays, register-only intermediates
```

## Supported Operations

Graph functions support all Vex array and tensor operations:

### Array Operations
```vex
graph example(a: [f32; N], b: [f32; N]): [f32; N] {
    let sum = a + b;           // elementwise add
    let prod = a * b;          // elementwise multiply
    let scaled = a * 2.0;      // scalar broadcast
    let total = <+ a;          // reduction (sum)
    let maximum = >?| a;       // reduction (max)
    return sum;
}
```

### Matrix Operations
```vex
graph matmul_chain(a: [f32; M, K], b: [f32; K, N], c: [f32; N, P]): [f32; M, P] {
    let ab = a <*> b;          // matrix multiply
    return ab <*> c;           // chained matmul
}
```

### Math Functions
```vex
graph activation(x: [f32; N]): [f32; N] {
    return exp(x) / (1.0 + exp(x));  // sigmoid, all fused
}
```

### Control Flow
```vex
graph relu(x: [f32; N]): [f32; N] {
    if x > 0.0 {
        return x;
    } else {
        return 0.0;
    }
}

graph transformer(x: [f32; N], layers: [[f32; N, N]; 12]): [f32; N] {
    let! out = x;
    for i in 0..12 {       // compile-time unrolled
        out = out <*> layers[i];
    }
    return out;
}
```

## Nested Graph Functions

Graph functions can call other graph functions. The compiler **inlines** the callee's computation graph into the caller's, enabling cross-function fusion:

```vex
graph softmax(x: [f32; N]): [f32; N] {
    let max_val = >?| x;
    let shifted = x - max_val;
    let exp_vals = exp(shifted);
    let sum_val = <+ exp_vals;
    return exp_vals / sum_val;
}

graph attention(q: [f32; N], k: [f32; N], v: [f32; N]): [f32; N] {
    let scores = q <*> k.T / sqrt(N);
    let weights = softmax(scores);  // ← inlined and fused!
    return weights <*> v;
}
```

## Hardware Dispatch

The compiler automatically selects the best execution target:

| Data Size | Target | Why |
|-----------|--------|-----|
| < 2,048 elements | **Scalar** | Not worth vectorizing |
| 2,048 – 50,000 | **SIMD** (AVX-512 / NEON) | CPU cache-friendly |
| ≥ 50,000 (Apple UMA) | **GPU** (Metal) | Zero-copy shared memory |
| ≥ 1,000,000 (discrete) | **GPU** (CUDA/ROCm) | Amortizes PCIe transfer |

Override with environment variables:
```bash
VEX_NO_GPU=1 vex run app.vx        # Force SIMD
VEX_FORCE_GPU=1 vex run app.vx     # Force GPU
```

## Inline Fusion vs Graph Functions

| Feature | Inline Fusion `<+ (a*b)` | Graph Function |
|---------|-------------------------|----------------|
| Scope | Single expression | Entire function body |
| Fusion | Expression-level | Cross-statement |
| Control flow | No | if/else, for loops |
| Nesting | No | Graph calls graph |
| Use case | Quick one-liners | Complex algorithms |

Both work together: inline fusion expressions inside graph functions get fused into the larger graph.

## Debug

```bash
VEX_FUSION_DEBUG=1 vex run app.vx
```

Output:
```
[GRAPH FN] dot: 3 SIR nodes → fused to 1 kernel
[GRAPH FN] Dispatch: SIMD (AVX-512, 8 lanes, unroll=2)
```

```bash
VEX_GPU_DEBUG=1 vex run app.vx
```

Output:
```
[GRAPH FN] attention: 7 SIR nodes → 3 kernels (2 matmul + 1 fused)
[GRAPH FN] Dispatch: GPU Metal (Apple M2 Max)
[Metal] Kernel 1: matmul (256×256) → buffer_0
[Metal] Kernel 2: fused softmax → buffer_1
[Metal] Kernel 3: matmul → readback
```
