# Introduction to Vex

Vex is `High-Performance Systems Programming` reimagined.

It is designed to solve the **"Three Language Problem"** in modern software stacks:
1.  **Low Level**: C++/Rust for kernels and engines.
2.  **Concurrency**: Go/Java for networked services.
3.  **High Level**: Python for ML and scripting.

Vex aims to be a single language that spans all three domains without compromise.

## Core Pillars

### 1. Safety without the Struggle
Vex provides memory safety (no segfaults, no data races) using a Borrow Checker, similar to Rust. However, it simplifies the model by automating "smart pointer" choice (VUMM) and reducing the need for explicit lifetime annotations in common code.

### 2. Concurrency Built-In
Like Go, Vex treats concurrency as a first-class citizen. Spawning a "goroutine" is a keyword (`go`). Channels (`chan`) are the primary way to communicate. You don't need an external library to write a scalable server.

### 3. Silicon Native
Vex is the first language designed for the AI era. Vectors, matrices, and tensors are primitive types, not libraries.
- **Auto-Vectorization**: Loops compile to SIMD (AVX-512/NEON).
- **GPU Offload**: `spawn` kernels directly to the GPU.
- **Autograd**: Differentiable programming syntax (`@{ ... }`) is built-in.

## Why Vex?

| Feature | Rust | Go | Python | Vex |
| :--- | :--- | :--- | :--- | :--- |
| **GC** | No | Yes | Yes | **No** |
| **Safety** | High | Medium | Low | **High** |
| **Speed** | 🚀🚀🚀 | 🚀🚀 | 🚀 | **🚀🚀🚀** |
| **Simplicity** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **⭐⭐⭐⭐** |
| **AI/ML** | Library | Library | Native-ish | **Native** |

## Next Steps

Ready to dive in?
- [Installation](./01_installation.md)
- [Hello World](./03_hello_world.md)
