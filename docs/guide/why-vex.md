# "Why Vex?" -- Language Comparison

This page compares Vex to other systems programming languages, highlighting where Vex excels and where other languages may still be the better choice.

## Vex vs Rust

| Dimension              | Vex                                              | Rust                                         |
| ---------------------- | ------------------------------------------------ | -------------------------------------------- |
| **Learning curve**     | Moderate (Go-like syntax)                        | Steep (borrow checker, lifetimes)            |
| **Memory safety**      | Ownership + VUMM automatic                       | Ownership + borrow checker (explicit)        |
| **Concurrency**        | Built-in `go` blocks, M:N scheduler              | async/await, tokio (external)                |
| **SIMD**               | Automatic (array math auto-vectorizes)           | Manual intrinsics or portable_simd (nightly) |
| **GPU**                | `graph fn` compiles to Metal/CUDA/SPIR-V/WGSL    | External crates (wgpu, cudarc)               |
| **Compile times**      | Fast (demand-driven prelude, incremental)        | Can be slow (monomorphization, proc macros)  |
| **Ecosystem maturity** | New (growing)                                    | Mature (100K+ crates)                        |
| **Standard library**   | Batteries included (HTTP, crypto, serde, DB, ML) | Minimal std, community crates for everything |
| **Error messages**     | Clear and concise                                | Excellent (but lots of them)                 |
| **FFI**                | C ABI, `extern "C"`, simple linking              | C ABI, `extern "C"`, build.rs                |

**Choose Vex when:** You want Rust-level safety with Go-level simplicity, and you need SIMD/GPU acceleration without fighting the type system.

**Choose Rust when:** You need the mature ecosystem, existing crates, or are building safety-critical software with formal verification requirements.

## Vex vs Go

| Dimension            | Vex                                     | Go                                            |
| -------------------- | --------------------------------------- | --------------------------------------------- |
| **Memory model**     | Ownership + borrowing, no GC            | Garbage collected (tricolor mark-sweep)       |
| **Performance**      | Near-C (LLVM-based, no GC pauses)       | Good but GC overhead, value copying           |
| **Generics**         | Full generics with contracts            | Generics since 1.18 (limited)                 |
| **Error handling**   | `Result<T,E>` + `?` operator            | `if err != nil` (verbose)                     |
| **SIMD/GPU**         | First-class, auto-vectorization         | None built-in (assembly or CGo)               |
| **Null safety**      | `Option<T>` (no nil)                    | Nil pointers, nil slices, nil interfaces      |
| **Concurrency**      | M:N scheduler, `go`, channels           | GOMAXPROCS, goroutines, channels              |
| **Standard library** | Comprehensive (HTTP, crypto, DB, serde) | Comprehensive (HTTP, crypto, but no generics) |
| **Binary size**      | Moderate (LLVM-based)                   | Moderate (Go runtime)                         |

**Choose Vex when:** You need Go's simplicity but without GC pauses, and you want generics, sum types, and SIMD/GPU.

**Choose Go when:** You value extreme compile speed above all else, or your team is already productive in Go and GC pauses are acceptable.

## Vex vs Zig

| Dimension             | Vex                                     | Zig                                  |
| --------------------- | --------------------------------------- | ------------------------------------ |
| **Memory safety**     | Ownership + borrowing (safe by default) | Manual memory management (no safety) |
| **Safety philosophy** | Safe by default, `unsafe` opt-out       | Unsafe by default, no guardrails     |
| **Compile-time**      | Comptime evaluation, codegen            | Comptime (Turing-complete)           |
| **Cross-compilation** | LLVM targets, good but heavy            | Best-in-class (ships with Clang)     |
| **SIMD**              | Auto-vectorization                      | Manual `@Vector` types               |
| **Standard library**  | Rich stdlib                             | Minimal stdlib by design             |
| **Learning curve**    | Moderate                                | Moderate to steep                    |

**Choose Vex when:** You want memory safety guarantees and a rich standard library.

**Choose Zig when:** You want maximum control (including allocator strategies), the best cross-compilation story, or you're writing a C replacement where safety is not the primary concern.

## Vex vs C++

| Dimension              | Vex                                  | C++                                     |
| ---------------------- | ------------------------------------ | --------------------------------------- |
| **Memory safety**      | Ownership + borrowing                | Manual, smart pointers (optional)       |
| **Build system**       | Built-in (`vex compile`, `vex.toml`) | CMake, Bazel, Meson (external)          |
| **Package management** | Built-in (`vex pm`)                  | vcpkg, Conan, CPM (external)            |
| **Error messages**     | Modern, clear                        | Template errors notoriously cryptic     |
| **Move semantics**     | Move by default                      | std::move, rvalue references            |
| **Legacy burden**      | Clean slate design                   | 40 years of backward compatibility      |
| **GPU/SIMD**           | First-class                          | C++17 parallel algorithms, SYCL, OpenMP |

**Choose Vex when:** You're starting a new project and want modern tooling, safety, and don't need C++'s ecosystem.

**Choose C++ when:** You have an existing C++ codebase, need specific C++ libraries (Qt, Unreal Engine), or require C++20/23 features.

## Vex vs Mojo

| Dimension            | Vex                              | Mojo                                 |
| -------------------- | -------------------------------- | ------------------------------------ |
| **Target audience**  | Systems programmers              | ML/AI engineers                      |
| **Python compat**    | No (clean syntax)                | Python superset                      |
| **Memory model**     | Ownership + VUMM                 | Ownership + MLIR-based               |
| **GPU programming**  | `graph fn` (multiple backends)   | Built-in GPU support via MLIR        |
| **Standard library** | General-purpose (HTTP, DB, etc.) | ML-focused (tensors, autograd)       |
| **Open source**      | Yes (MIT)                        | Partially (some modules proprietary) |
| **Maturity**         | Early                            | Early (by Modular)                   |

**Choose Vex when:** You're building general systems software, web servers, CLI tools, or anything non-ML.

**Choose Mojo when:** You're primarily doing ML/AI and want Python interoperability.

## Feature Matrix

| Feature          | Vex             | Rust         | Go              | Zig                | C++             | Mojo        |
| ---------------- | --------------- | ------------ | --------------- | ------------------ | --------------- | ----------- |
| Memory safety    | Yes             | Yes          | GC              | No                 | Partial         | Yes         |
| Ownership model  | VUMM auto       | Explicit     | GC              | Manual             | Manual/Optional | Yes         |
| Generics         | Yes (contracts) | Yes (traits) | Yes (limited)   | Yes (comptime)     | Yes (templates) | Yes         |
| Sum types        | Yes (enums)     | Yes (enums)  | No              | Yes (tagged union) | std::variant    | Yes         |
| Pattern matching | Full            | Full         | No (switch)     | switch             | No (visit)      | Limited     |
| Auto SIMD        | Yes             | Manual       | No              | Manual             | Partial (STL)   | Yes         |
| GPU compute      | Yes (SIR)       | External     | No              | External           | External        | Yes         |
| Async/await      | Yes             | Yes          | No (goroutines) | No (async/await)   | C++20           | Yes         |
| Null safety      | Option\<T\>     | Option\<T\>  | No (nil)        | Optional type      | std::optional   | Optional    |
| Package manager  | Built-in        | Cargo        | Go modules      | Built-in           | External        | External    |
| Compiler backend | LLVM 21         | LLVM         | Custom          | LLVM               | LLVM/GCC        | MLIR        |
| License          | MIT             | MIT/Apache2  | BSD             | MIT                | (various)       | Proprietary |

## When Vex is the Right Choice

- Building a new web service where GC pauses are unacceptable
- Writing performance-critical code that needs SIMD or GPU acceleration
- Developing cross-platform CLI tools with a single codebase
- Systems programming where memory safety is required but Rust's complexity is too high
- Data processing pipelines that benefit from auto-vectorization
- Any project where you want Rust's safety with Go's simplicity

## When Vex is NOT the Right Choice (Yet)

- Projects requiring a mature ecosystem (Vex is new -- the package ecosystem is small)
- When you absolutely need a specific C++/Rust library with no Vex equivalent
- Embedded systems with < 64KB RAM (Vex's runtime has a minimum footprint)
- When your team is already highly productive in another language with no compelling reason to switch
