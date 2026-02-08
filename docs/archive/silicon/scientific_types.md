# RFC 001: Vex Scientific Systems & AI Extensions (V2)

**Status:** Approved (Roadmap)
**Date:** 2025-12-20
**Version:** Draft 1

## Summary
This RFC proposes the addition of three specialized built-in types to the Vex language core to support its vision as a "Scientific Systems Language":
1. `Tensor<T, Rank>` for Machine Learning and High-Performance Computing.
2. `Complex<T>` for Engineering and Signal Processing.
3. `Decimal` for Financial Systems (Fintech).

## 1. Built-in Tensor (`Tensor<T, Rank>`)

### Motivation
Current "Deep Learning" frameworks rely on library-level abstractions (Python/C++ glue) which introduce runtime overhead and prevent compiler-level optimization (loop fusion, tiling). Vex aims to be a native AI language.

### Proposal
A built-in generic type for N-dimensional arrays to serve as the primitive for all Auto-Differentiation (AD) operations.

```vex
// Type Definition
// T: Data type (f32, f16, etc.)
// Rank: Number of dimensions (const generic)
let t: Tensor<f32, 4> = Tensor.zeros([64, 3, 224, 224])

// Operations (GPU Accelerated / SIMD)
// The compiler maps these directly to kernels or BLAS calls
let result = input @ weights + bias 

// Autograd (Reverse Mode)
// The 'autograd' block instructs the compiler to generate the backward pass
autograd {
    let loss = mse_loss(result, target)
    loss.backward() 
}
```

## 2. Built-in Complex Numbers (`Complex<T>`)

### Motivation
Required for Electrical Engineering (AC circuits), Signal Processing (FFT), and Quantum Computing simulations. Library-based implementations often suffer from poor ergonomics and missed SIMD opportunities.

### Proposal
First-class syntax support and SoA (Structure of Arrays) layout optimization.

```vex
// Literal Syntax
let c: Complex<f64> = 3.0 + 4.0i

// Conjugate and Magnitude
let conjugate = c.conj() // 3.0 - 4.0i
let mag = c.abs()        // 5.0

// Memory Optimization
// The compiler can optimize Vec<Complex<T>> into Structure-of-Arrays (SoA)
// layouts to maximize SIMD throughput (processing Real and Imag parts in parallel vectors).
```

## 3. Built-in Decimal (`Decimal`)

### Motivation
Floating point arithmetic (`f64`) is unsuitable for financial calculations due to rounding errors (`0.1 + 0.2 != 0.3`). Vex, as a systems language, should support robust fintech backend development without requiring external "BigInt" libraries for basic currency math.

### Proposal
A 128-bit fixed-point decimal type with guaranteed precision and banking rounding modes.

```vex
// Literal Syntax (suffix 'm' for Money/Decimal)
let price: Decimal = 10.50m 
let tax_rate: Decimal = 0.18m

let total = price + (price * tax_rate)
// Result is strictly precise. No epsilon errors.
```

## Implementation Strategy

1.  **Phase 1 (Parser & Type System)**: Add `Tensor`, `Complex`, `Decimal` keywords and parsing logic.
2.  **Phase 2 (LLVM IR Generation)**:
    *   `Complex` -> `{ T, T }` (LLVM Struct)
    *   `Decimal` -> `i128` (Scaled integer)
    *   `Tensor` -> `{ ptr, dims... }` (Runtime Descriptor)
3.  **Phase 3 (Optimization & Autograd)**: Implement `grad` support logic for these types and `gpu fn` mapping for Tensors.
