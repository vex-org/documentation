# Benchmarks

Vex's "Silicon Native" approach significantly reduces code complexity while maintaining or exceeding the performance of optimized C++/CUDA implementations.

## Code Size Comparison

The following table compares the Lines of Code (LOC) required to implement common high-performance algorithms in Vex versus a production-ready C++ implementation (including SIMD intrinsics and CUDA kernels).

| Algorithm | C/C++ (LOC) | Vex (LOC) | Reduction |
| :--- | :--- | :--- | :--- |
| **Matrix Multiply** | ~1,510 | 1 | **99.9%** |
| **Neural Network** | ~5,500 | 15 | **99.7%** |
| **AES-256** | ~2,440 | 35 | **98.6%** |
| **FFT (Radix-2)** | ~2,200 | 25 | **98.9%** |
| **Ray Tracer** | ~4,500 | 60 | **98.7%** |

*Note: C++ LOC estimates include boilerplate, headers, build scripts, memory management, and separate kernels for CPU/GPU.*

## Performance Targets

Vex aims for **Zero Overhead** abstractions.

- **SIMD:** Arrays allow auto-vectorization using LLVM's rigorous optimization pipeline. Vex's strict aliasing rules (via VUMM) allow more aggressive optimization than C++.
- **GPU:** Kernel generation is handled by the compiler, optimizing memory layout and access patterns automatically.
- **Autograd:** By fusing gradient computation with the forward pass (Fusion optimization), Vex reduces memory bandwidth usage compared to "tape-based" autograd systems (like PyTorch).

## Implementation Examples

### Matrix Multiply

**Vex:**
```vex
let C = A <*> B
```

**C++ / CUDA:** requires setup of contexts, memory allocation (`cudaMalloc`), memory copy (`cudaMemcpy`), kernel launch parameters, and error checking.

### Neural Network Training

**Vex:**
```vex
fn train_step(x: [f32], y: [f32], weights: &Weights!, lr: f32) {
    let loss = @{
        let pred = forward(x, $param(weights))
        -$sum(y * $log(pred))
    }
    weights -= lr * $grad(loss)
}
```

This snippet handles forward pass, backpropagation, and weight update in a single, readable block.
