---
layout: home

hero:
  name: "Vex Language"
  text: "High-Performance Systems Programming"
  tagline: "Build specialized software with zero compromises. Auto-vectorization, GPU kernels, and Safe memory management."
  actions:
    - theme: brand
      text: 🚀 Get Started
      link: /guide/introduction
    - theme: alt
      text: Language Reference
      link: /specs/01_Introduction_and_Overview
    - theme: alt
      text: View Source
      link: https://github.com/meftunca/vex

features:
  - icon: ⚡
    title: Native Auto-Vectorization
    details: Write standard loops, compile to highly optimized AVX-512 and NEON SIMD instructions automatically.
  - icon: 🎮
    title: GPU First-Class
    details: Silicon IR compiles to SPIR-V, WGSL, and Metal shaders. Automatic differentiation built-in.
  - icon: 🛡️
    title: Memory Safety
    details: VUMM (Vex Unified Memory Model) automatically selects optimal memory strategy at compile time.
  - icon: 🧠
    title: Differentiable Programming
    details: Built-in Autograd for machine learning and physics. Automatic gradient calculation built into the compiler.
  - icon: 🔒
    title: Borrow Checker
    details: Polonius-style NLL borrow checking with 4-phase analysis. Safe and ergonomic.
  - icon: 🧩
    title: Zero-Cost FFI
    details: Direct FFI with C/C++. No overhead, no wrappers. Drop-in replacement for performance-critical modules.
  - icon: 📦
    title: Modern Tooling
    details: Integrated Package Manager, Language Server (LSP), and Build System out of the box.
  - icon: 🚀
    title: Freestanding Support
    details: Build OS kernels, bootloaders, and embedded systems without standard library.
---

## Quick Example

```vex
// Array operations are auto-vectorized by SIR compiler
fn dot_product(a: [f32], b: [f32]): f32 {
    let! sum = 0.0f32
    for i in 0..a.len() {
        sum = sum + a[i] * b[i]
    }
    return sum
}

// Matrix multiply - SIR auto-detects parallelism
fn matrix_multiply(a: [[f32]], b: [[f32]]): [[f32]] {
    let m = a.len()
    let n = b[0].len()
    let k = a[0].len()
    let! result = [[f32; n]; m]
    
    for i in 0..m {
        for j in 0..n {
            let! sum = 0.0f32
            for p in 0..k {
                sum = sum + a[i][p] * b[p][j]
            }
            result[i][j] = sum
        }
    }
    return result
}

// Safe memory management
fn example() {
    let data = Box([1, 2, 3])  // VUMM auto-selects strategy
    process(&data)              // Borrow, don't move
}
```

## Why Vex?

| Feature | Vex | Rust | C++ | Zig |
|---------|-----|------|-----|-----|
| Memory Safety | ✅ | ✅ | ❌ | ⚠️ |
| Auto-Vectorization | ✅ Native | ⚠️ | ⚠️ | ⚠️ |
| GPU Compute | ✅ Built-in | ❌ | ❌ | ❌ |
| Autograd | ✅ Built-in | ❌ | ❌ | ❌ |
| Freestanding | ✅ | ✅ | ✅ | ✅ |
| Learning Curve | Medium | Steep | Steep | Medium |
