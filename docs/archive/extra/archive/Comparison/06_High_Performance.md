# High-Performance Computing (HPC) Comparison

This document highlights Vex's unique approach to high-performance computing, focusing on Autonomous Parallelism compared to the manual models of other systems languages.

Vex is designed with the philosophy that **parallelism should be a compiler optimization, not just a developer burden.**

| Feature | Vex | Go | Rust | C | C++ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Philosophy** | **Autonomous Parallelism** | Simplicity / Concurrency | Zero-cost Abstractions | "Close to Metal" | "Do it yourself" |
| **SIMD Support** | **Native & Auto** | Assembly (unsafe) | Intrinsics (unsafe) / Portable SIMD | Intrinsics (unsafe) | Intrinsics (unsafe) |
| **SIMT / GPU** | **Native (SPIR-V)** | External (CGO/CUDA) | External (wgpu/rust-gpu) | External (CUDA/OpenCL) | External (CUDA/SYCL) |
| **Scheduler** | **M:N (Smart)** | M:N (Work Stealing) | 1:1 (OS Threads) | 1:1 (OS Threads) | 1:1 (OS Threads) |
| **Vectorization** | Aggressive Auto-Vectorization | Weak (GC barriers) | Good (LLVM) | Auto (Compiler dependent) | Auto (Compiler dependent) |
| **Memory Layout** | Struct-of-Arrays (SoA) transformations supported | Standard Layout | Standard Layout | Standard Layout | Standard Layout |

## 1. Autonomous SIMT (GPU Offload) via SPIR-V

Vex's killer feature. The compiler analyzes data size and complexity. If the workload surpasses a threshold, it compiles the logic to SPIR-V and dispatches it to the GPU/Compute Device seamlessly.

**Vex:**
```vex
// 'data' is 10M elements
// usage of 'gpu' keyword hints preference, or compiler decides
fn process(data: &[f32]!) {
    for i in 0..data.() {
        data[i] = sin(data[i]) * cos(data[i]);
    }
}
```

**Others (C++/Rust):** Requires linking against CUDA/OpenCL/Vulkan SDKs, writing separate kernel code (often in a different language/dialect), managing device memory allocation, transfer, and synchronization manually.

## 2. SIMD and Auto-Vectorization

While Rust and C++ rely on LLVM's auto-vectorizer (which is excellent), Vex's type system is designed to aid vectorization.
*   **No Aliasing by Default:** Like Fortran, Vex's strict ownership analysis guarantees non-aliasing pointers in many cases where C/C++ compilers have to be conservative ("maybe-alias").
*   **Explicit Alignment:** Types can be naturally aligned for vector registers.

## 3. M:N Scheduler with "Work Awareness"

Vex's scheduler is explicitly designed for high-throughput data processing, not just I/O concurrency.
*   **Blocking I/O:** Handled by efficient epoll/kqueue event loops.
*   **CPU Bound:** The scheduler partitions large loops into blocks (Tiles) and distributes them across worker threads (M:N), utilizing cache locality. This is similar to what OpenMP does via pragmas (`#pragma omp parallel for`), but Vex does it **natively and safely** via the Borrow Checker.

## Summary

*   **C/C++** gives you the tools to build a race car, but you have to assemble the engine yourself.
*   **Rust** gives you a safe chassis, but you still need to install the engine (external crates for async/gpu).
*   **Go** gives you a minivan—great for carrying people (requests) comfortably, but not for racing (raw compute).
*   **Vex** is an autonomous electric hypercar. It manages the engine (SIMD), the battery (Memory), and the route (GPU/CPU scheduling) for you, aiming for maximum throughput with safety.
