# Concurrency Comparison

This document compares Vex's concurrency and parallelism model with Go, Rust, C, and C++.

| Feature | Vex | Go | Rust | C | C++ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Paradigm** | CSP + Async/Await + **Data Parallel** | CSP (Blocking) | Async/Await + Threads | OS Threads | OS Threads + Async |
| **Lightweight Threads** | `go` routines (M:N) | `go` routines (M:N) | No (OS threads standard) | No | No |
| **Async Function** | `async fn` | No | `async fn` | No | `co_await` (C++20) |
| **Data Parallelism** | **Native Auto-Vectorization & GPU** | No (Manual SIMD assembly) | Auto-vectorization (LLVM) | Manual Intrinsics | `std::execution` (C++17) / OpenMP |
| **GPU Offload** | **Automatic (SPIR-V)** | No (CGO + OpenCL/CUDA) | No (External Crates) | No (CUDA/OpenCL) | No (CUDA/OpenCL/SYCL) |
| **Channels** | Native `Channel<T>` | Native `chan T` | Library (`std::sync::mpsc`) | Manual | Library |
| **Select** | `select { case ... }` | `select { case ... }` | Macro `select!` | `poll` | N/A |

## Key Concepts

### Hybrid Model: Task + Data Parallelism
Vex distinguishes itself by treating concurrency (task management) and parallelism (data processing) as native language features, not just library add-ons.

1.  **Task Concurrency (Go-style):** `go` routines and channels for orchestrating I/O and independent tasks.
2.  **Data Parallelism (HPC):** Vex's compiler and runtime automatically identify data-parallel workloads.
    *   **SIMD:** Small loops are auto-vectorized for CPU (AVX2/AVX-512/NEON).
    *   **SIMT (GPU):** Large data operations are automatically compiled to **SPIR-V** and offloaded to the GPU if heuristics determine it's efficient.

### Example Comparison

**Vex (GPU Offload):**
```vex
// Vex - 'launch' keyword or auto-detection handles offload
// Compiler detects large dataset + parallelizable operation
let result = large_array.map(|x| x * 2.0 + 1.0); 
// -> Compiles to SPIR-V kernel for GPU
```

**C++ (Manual CUDA):**
```cpp
// C++ requires extensive Setup + Kernel writing
__global__ void loop(float* a) { ... }
cudaMalloc(...);
cudaMemcpy(...);
loop<<<blocks, threads>>>(d_a);
```

### Concurrency Primitives
**Vex:**
```vex
let! ch = Channel(10);
go worker(ch);
let val = <-ch;
```

**Go:**
```go
ch := make(chan int, 10)
go worker(ch)
val := <-ch
```

**Rust:**
```rust
let (tx, rx) = mpsc::channel();
thread::spawn(move || worker(tx));
let val = rx.recv().unwrap();
```
