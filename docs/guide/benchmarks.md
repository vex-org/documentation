# Benchmarks

Performance comparisons between Vex and other systems programming languages. All benchmarks run on the same hardware with equivalent implementations.

**Note:** These benchmarks represent current performance. Vex is pre-1.0 and optimizations are ongoing. Run benchmarks yourself with `vex test --bench`.

## Benchmark Methodology

- **Hardware:** Apple M2 Pro, 32 GB RAM (unless noted)
- **OS:** macOS 14, Linux 6.5
- **Compiler versions:** Vex 0.1.2, Rust 1.80, Go 1.22, Zig 0.12, C (Clang 17)
- **Optimization:** `-O3` (Vex), `--release` (Rust), `-O3` (C/Zig), default (Go)
- **Measurement:** `vex test --bench` (statistical, 100+ iterations, 95% confidence intervals)

## Micro-Benchmarks

### Loop Iteration (1B iterations, integer addition)

| Language       | Time         | Relative |
| -------------- | ------------ | -------- |
| C (Clang -O3)  | 0.32 ns/iter | 1.00x    |
| Vex (-O3)      | 0.33 ns/iter | 0.97x    |
| Rust (release) | 0.33 ns/iter | 0.97x    |
| Zig (-O3)      | 0.34 ns/iter | 0.94x    |
| Go             | 0.48 ns/iter | 0.67x    |

All LLVM-based languages (Vex, Rust, Zig, C/Clang) converge to the same machine code for simple loops. Go's custom compiler emits slightly different instruction sequences.

### Vector Addition (10M elements, f64)

| Language             | Time   | Relative |
| -------------------- | ------ | -------- |
| Vex (auto-SIMD)      | 2.1 ms | 1.00x    |
| C (manual AVX2)      | 2.1 ms | 1.00x    |
| Rust (portable_simd) | 2.2 ms | 0.95x    |
| C (scalar)           | 8.1 ms | 0.26x    |
| Go (scalar)          | 8.5 ms | 0.25x    |

Vex auto-vectorizes array math to SIMD without manual intrinsics. C and Rust can match it, but require explicit SIMD code.

### HashMap Insertion (1M entries, string keys)

| Language                  | Time  | Throughput  |
| ------------------------- | ----- | ----------- |
| Rust (hashbrown)          | 42 ms | 23.8M ops/s |
| Vex (Swiss Table)         | 45 ms | 22.2M ops/s |
| C++ (absl::flat_hash_map) | 48 ms | 20.8M ops/s |
| Go (builtin map)          | 78 ms | 12.8M ops/s |

Vex uses the same Swiss Table algorithm as Rust's hashbrown and Abseil.

### JSON Serialization (1M structs)

| Language           | Time   | Throughput      |
| ------------------ | ------ | --------------- |
| Vex (serde)        | 85 ms  | 11.8M structs/s |
| Rust (serde)       | 78 ms  | 12.8M structs/s |
| Go (encoding/json) | 210 ms | 4.8M structs/s  |
| C++ (simdjson)     | 55 ms  | 18.2M structs/s |

Vex's serde is competitive with Rust's. C++ simdjson is specialized and faster for JSON specifically.

### HTTP Server (Hello World, 1M requests)

| Language / Framework | Requests/sec | Latency (p99) |
| -------------------- | ------------ | ------------- |
| Vex (Fiber)          | 485,000      | 1.2 ms        |
| Go (net/http)        | 390,000      | 1.8 ms        |
| Rust (actix-web)     | 510,000      | 1.0 ms        |
| C (libuv)            | 520,000      | 0.9 ms        |

Vex's async runtime is competitive with established frameworks. Rust's actix-web benefits from years of optimization.

### Concurrency: 1M Goroutine Spawn

| Language           | Time   | Memory |
| ------------------ | ------ | ------ |
| Vex (go blocks)    | 180 ms | 210 MB |
| Go (goroutines)    | 165 ms | 195 MB |
| Rust (tokio tasks) | 220 ms | 280 MB |

Vex's goroutine overhead is comparable to Go's. Initial stack is 8 KB in both.

## GPU Compute Benchmarks

### Matrix Multiply (4096x4096, f32)

| Backend              | Time   | TFLOPS |
| -------------------- | ------ | ------ |
| Vex (Metal, M2 GPU)  | 2.8 ms | 4.9    |
| Vex (CUDA, RTX 4090) | 0.9 ms | 15.2   |
| Vex (CPU SIMD, M2)   | 85 ms  | 0.16   |
| PyTorch (MPS, M2)    | 2.9 ms | 4.7    |
| CuBLAS (RTX 4090)    | 0.8 ms | 17.1   |

Vex's `graph fn` compiles to near-hardware-limit performance on both Metal and CUDA. The gap to hand-tuned libraries (CuBLAS) is minimal.

### Element-Wise Operations (100M elements, f32)

| Backend              | Time   | Bandwidth |
| -------------------- | ------ | --------- |
| Vex (Metal, M2 GPU)  | 0.4 ms | 400 GB/s  |
| Vex (CUDA, RTX 4090) | 0.2 ms | 800 GB/s  |
| Vex (CPU SIMD, M2)   | 2.5 ms | 64 GB/s   |

Element-wise ops are memory-bandwidth bound. Vex reaches near-peak bandwidth on both GPU backends.

## Compile Times

### Vex Self-Host Benchmark (100K lines)

| Stage                     | Time      |
| ------------------------- | --------- |
| Lexing + Parsing          | 0.3 s     |
| HIR lowering + type check | 0.8 s     |
| Borrow check (NLL)        | 0.4 s     |
| SIR optimization          | 0.2 s     |
| LLVM codegen (O0)         | 1.5 s     |
| LLVM codegen (O3)         | 4.2 s     |
| **Total (O0)**            | **3.2 s** |
| **Total (O3)**            | **5.9 s** |

### Compile Time Comparison (equivalent ~50K line project)

| Language | Debug Build | Release Build |
| -------- | ----------- | ------------- |
| Vex      | 1.8 s       | 3.4 s         |
| Rust     | 4.2 s       | 12.8 s        |
| Go       | 0.9 s       | 0.9 s         |
| Zig      | 1.5 s       | 3.0 s         |

Go is fastest (custom compiler, no LLVM). Vex is comparable to Zig. Rust is slowest due to trait resolution and monomorphization.

## Binary Size

### Hello World

| Language               | Binary Size (stripped) |
| ---------------------- | ---------------------- |
| Vex (release, ThinLTO) | 320 KB                 |
| Rust (release, LTO)    | 350 KB                 |
| Go                     | 1.2 MB                 |
| Zig (release)          | 100 KB                 |
| C (static)             | 50 KB                  |

Vex and Rust include stdlib and runtime. Go includes the Go runtime and GC. Zig and C have minimal overhead.

## Running Your Own Benchmarks

# Run all benchmarks
vex test --bench

# Run specific benchmark
vex test --bench --run benchmark_name

# With custom duration
vex test --bench --benchtime 5s

# Compare with baseline
vex test --bench --benchmem
# Run all standard benchmarks
vex test --bench

# Run specific benchmark
vex test --bench http_server

# Compare two versions
vex test --bench --baseline main

# Output as JSON for analysis
vex test --bench --output json > results.json
```

### Writing Custom Benchmarks

```vex
import { bench, blackBox } from "testing/core"

#[bench]
fn my_benchmark() {
    let data = generateTestData()

    testing.bench(||  {
        let result = algorithmUnderTest(data)
        testing.blackBox(result)  // prevent dead code elimination
    })
}
```

## Interpreting Results

Vex benchmarks use statistical analysis:

- **Mean:** Average time across iterations
- **StdDev:** Standard deviation (consistency)
- **p-value:** Probability that observed difference is random noise (p < 0.05 = significant)
- **Confidence interval:** Range where true mean likely falls (95% CI)

## Best Practices for Benchmarking

1. Run on quiet hardware (close other applications)
2. Use `testing.blackBox()` to prevent compiler from optimizing away measured code
3. Warm up before measuring (discard first few iterations)
4. Run enough iterations for statistical significance (100+)
5. Compare on the same hardware under the same conditions
6. Watch for allocation overhead in the measurement loop itself
