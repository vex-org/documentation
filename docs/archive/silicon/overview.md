# Vex Silicon Native: Introduction

> ***"Every Cycle, Every Core, Every Time"***

Vex is designed with a **"vector-first"** philosophy, aiming to eliminate the "library hell" of traditional high-performance computing. Instead of relying on external libraries like NumPy, PyTorch, or Eigen, Vex builds these capabilities directly into the language syntax and compiler.

## The Problem: Library Hell

In languages like Python or C++, high-performance computing often involves juggling multiple incompatible libraries:

- **Python:** `numpy` vs `torch` vs `tensorflow` vs `jax`. Each has its own tensor types, memory management, and API. Moving data between them is costly and error-prone.
- **C++:** Manual memory management, complex template metaprogramming, and verbose intrinsic functions for SIMD/GPU usage.

## The Vex Solution: Native Vector Semantics

Vex introduces **Vector Semantics**, treating arrays and matrices as first-class citizens with built-in hardware acceleration.

```vex
// Vex: Single Type, Single API
let a: [f32; 1024] = ...
let b = a + c          // Automatic SIMD or GPU offloading
let sum = \+a          // Built-in reduction operator
let grad = @{ ... }    // Built-in autograd scope
```

### Key Features

1.  **Unified Tensor Strategy:** No import needed. `[T; N]` implies vectorization potential.
2.  **Automatic Offloading:** The compiler decides whether to run on CPU (SIMD) or GPU based on data size and operation complexity.
3.  **Language-Level Autograd:** Derivative computation is a syntactic feature (`@{ ... }`), not a library wrapper.
4.  **Rich Operator Set:** Specialized operators for linear algebra (`<*>`), reductions (`\+`), and signal processing eliminate verbose function calls.

## Comparison

| Feature | Python | C++ | Rust | Vex |
| :--- | :--- | :--- | :--- | :--- |
| **SIMD** | via NumPy | Intrinsics | `std::simd` | **Automatic** |
| **GPU** | PyTorch/JAX | CUDA | wgpu/shaders | **Automatic** |
| **Autograd** | PyTorch | None | Libraries | **Native `@{}`** |
| **Linear Alg** | SciPy | Eigen | nalgebra | **Native `<*>`** |

## Vision

Vex aims to be the single language for the entire AI/HPC stack, from writing the kernel (replacing CUDA) to modelling the neural network (replacing Python).
