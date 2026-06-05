# Vex Language — Master Documentation TODO

> **Status:** ⏳ AWAITING REVIEW  
> **Generated:** 2026-06-05  
> **Purpose:** Every syntax, feature, type, contract, tool, and platform aspect of Vex that MUST be documented correctly in `web/documentation/docs/`.  
> **⚠️ DO NOT START DOCUMENTING until this list is reviewed and approved.**

---

## Legend

| Icon | Meaning                                                        |
| ---- | -------------------------------------------------------------- |
| ✅   | Already documented (exists in `web/documentation/docs/`)       |
| ⚠️   | Partially documented (exists but incomplete / missing details) |
| ❌   | NOT documented (missing entirely)                              |
| 🔧   | Implementation exists, needs doc page                          |
| 📦   | Prelude / stdlib type needing API reference                    |

---

## 1. LANGUAGE BASICS (Guide → Basics)

| #    | Topic                                      | Status | Existing File                       | What's Missing                                                                                       |
| ---- | ------------------------------------------ | ------ | ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1.1  | **Syntax Overview**                        | ✅     | `guide/basics/syntax.md`            | —                                                                                                    |
| 1.2  | **Variables & Mutability** (`let`, `let!`) | ✅     | `guide/basics/variables.md`         | Shadowing rules, `const` / `static` distinction                                                      |
| 1.3  | **Functions** (`fn`, params, return)       | ✅     | `guide/basics/functions.md`         | Generic functions, `self` receiver variants, extern functions                                        |
| 1.4  | **Control Flow** (`if`, `else`, `match`)   | ✅     | `guide/basics/control-flow.md`      | —                                                                                                    |
| 1.5  | **Loops** (`for`, `while`, `loop`)         | ⚠️     | (inside control-flow.md?)           | Loop as **expressions** (returning values), `break` with value, labeled loops, `continue` with label |
| 1.6  | **Range Expressions** (`0..10`, `0..=10`)  | ❌     | —                                   | 🔧 `structures/range.rs` — Range types, inclusive/exclusive, iteration                               |
| 1.7  | **Template Literals** (`$"hello {name}"`)  | ✅     | `guide/basics/template-literals.md` | Format specifiers (`{}`, `{:?}`, `{:#x}`), escape sequences                                          |
| 1.8  | **Comments** (`//`, `///`, `//!`)          | ⚠️     | (buried in syntax.md?)              | Doc comment conventions, markdown in doc comments                                                    |
| 1.9  | **Modules & Imports** (`export`, `import`) | ✅     | `guide/modules.md`                  | Module resolution rules, `pub` vs `export`, circular imports                                         |
| 1.10 | **`defer` Statement**                      | ❌     | —                                   | If Vex has `defer` — verify and add                                                                  |
| 1.11 | **Labeled Blocks**                         | ❌     | —                                   | `'label: { break 'label value; }` — labeled block expressions                                        |

---

## 2. TYPE SYSTEM (Guide → Types)

| #    | Topic                                               | Status | Existing File                     | What's Missing                                                                                                                   |
| ---- | --------------------------------------------------- | ------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------------------------- |
| 2.1  | **Primitives** (`i32`, `f64`, `bool`, `char`, etc.) | ✅     | `guide/types/primitives.md`       | `isize`/`usize`, `i128`/`u128`, `never`, `()` unit, `ptr` (raw opaque)                                                           |
| 2.2  | **Structs**                                         | ✅     | `guide/types/structs.md`          | Field visibility, packed structs, C-layout structs, zero-sized structs                                                           |
| 2.3  | **Enums** (sum types)                               | ✅     | `guide/types/enums.md`            | Enum payload layout, niche optimization                                                                                          |
| 2.4  | **Unions** (C-style)                                | ✅     | `guide/types/unions.md`           | Safety rules, pattern matching on unions                                                                                         |
| 2.5  | **Pattern Matching**                                | ✅     | `guide/types/pattern-matching.md` | Match guards (`if` in arm), `if let`, `while let`, or-patterns, rest patterns (`..`)                                             |
| 2.6  | **Generics**                                        | ✅     | `guide/types/generics.md`         | Const generics, default type params, where clauses                                                                               |
| 2.7  | **Contracts** (traits)                              | ✅     | `guide/types/contracts.md`        | Contract inheritance, associated types, blanket impls                                                                            |
| 2.8  | **Policies** (capabilities)                         | ✅     | `guide/types/policies.md`         | —                                                                                                                                |
| 2.9  | **Strings** (`string`, `str`)                       | ✅     | `guide/types/strings.md`          | `VexString` internals (tagged_len, inline vs heap), `VexStr` lifetime rules                                                      |
| 2.10 | **Arrays** (`[T; N]`)                               | ❌     | —                                 | 🔧 `structures/array.rs`, `matches/arrays.rs` — Fixed-size arrays, array literals, array operations, array→tensor auto-promotion |
| 2.11 | **Tuples** (`(T1, T2, ...)`)                        | ❌     | —                                 | 🔧 `structures/tuple.rs` — Tuple syntax, destructuring, unit `()` as empty tuple                                                 |
| 2.12 | **Vec<T>**                                          | ✅     | `guide/types/vec.md`              | —                                                                                                                                |
| 2.13 | **Map<K,V> & Set<T>**                               | ✅     | `guide/types/map-set.md`          | —                                                                                                                                |
| 2.14 | **Type Aliases**                                    | ✅     | `guide/types/aliases.md`          | —                                                                                                                                |
| 2.15 | **Function Pointers** (`fn(i32): bool` type)        | ❌     | —                                 | Function types, fn ptr values, closures vs fn pointers                                                                           |
| 2.16 | **Closures / Lambdas**                              | ❌     | —                                 | 🔧 `expr/closures.rs` — Closure syntax (`                                                                                        | x   | x + 1`), capture modes (move/borrow/mut borrow), closure types, `Fn`-like contracts |
| 2.17 | **Never Type** (`never`)                            | ❌     | —                                 | Bottom type semantics, divergence, `return`/`panic`/`abort` return `never`                                                       |
| 2.18 | **Unit Type** (`()`)                                | ❌     | —                                 | Zero-size type, used for no-return-value, empty tuple                                                                            |
| 2.19 | **Raw Pointer** (`ptr`)                             | ❌     | —                                 | Opaque untyped pointer, `*T` typed raw pointer, `*T!` mutable raw pointer                                                        |
| 2.20 | **Variadic Functions**                              | ❌     | —                                 | 🔧 `calls/variadic.rs` — `fn printf(fmt: *u8, ...)` C-compatible variadics                                                       |
| 2.21 | **Complex<T>**                                      | ❌     | —                                 | 📦 `prelude/complex.vxc` — Complex numbers, arithmetic, magnitude, phase                                                         |

---

## 3. MEMORY MODEL (Guide → Memory)

| #    | Topic                                               | Status | Existing File               | What's Missing                                                                           |
| ---- | --------------------------------------------------- | ------ | --------------------------- | ---------------------------------------------------------------------------------------- |
| 3.1  | **Ownership**                                       | ✅     | `guide/memory/ownership.md` | Move semantics detail, partial moves, ownership in match/if let                          |
| 3.2  | **Borrowing**                                       | ✅     | `guide/memory/borrowing.md` | NLL (Non-Lexical Lifetimes) details, borrow checker error messages                       |
| 3.3  | **Lifetimes**                                       | ✅     | `guide/memory/lifetimes.md` | Lifetime elision rules, explicit lifetime annotations syntax                             |
| 3.4  | **Box<T>**                                          | ✅     | `guide/memory/box.md`       | VUMM inference (Unique/SharedRc/AtomicArc), Box vs raw alloc                             |
| 3.5  | **Ptr<T>**                                          | ✅     | `guide/memory/ptr-t.md`     | —                                                                                        |
| 3.6  | **Span<T>**                                         | ✅     | `guide/memory/span-t.md`    | —                                                                                        |
| 3.7  | **RawBuf**                                          | ✅     | `guide/memory/rawbuf.md`    | —                                                                                        |
| 3.8  | **Memory Safety**                                   | ✅     | `guide/memory/safety.md`    | —                                                                                        |
| 3.9  | **VUMM**                                            | ✅     | `guide/memory/vumm.md`      | Unique/SharedRc/AtomicArc inference algorithm detail, refcount implementation            |
| 3.10 | **Move Semantics**                                  | ⚠️     | (buried in ownership.md?)   | Explicit `move` keyword (if exists), copy vs move type distinction                       |
| 3.11 | **Drop Order**                                      | ❌     | —                           | 🔧 `codegen_hir/drop/` — RAII drop order (fields, locals, temporaries), defer-equivalent |
| 3.12 | **Clone Semantics**                                 | ❌     | —                           | Deep copy vs bitwise copy, `$Clone` contract, when clone is auto-called                  |
| 3.13 | **Pin<T>**                                          | ❌     | —                           | 📦 `prelude/pin.vx` — Self-referential types, `$Pin` marker contract, Pin guarantees     |
| 3.14 | **Allocation API** (`vex_malloc`, `vex_free`, etc.) | ❌     | —                           | Raw allocation, alignment, realloc, `Mem` prelude module                                 |

---

## 4. CONTRACTS — FULL REFERENCE

| #    | Topic                                                       | Status | Existing File                 | What's Missing                                                                        |
| ---- | ----------------------------------------------------------- | ------ | ----------------------------- | ------------------------------------------------------------------------------------- |
| 4.1  | **Contracts Overview**                                      | ✅     | `guide/types/contracts.md`    | —                                                                                     |
| 4.2  | **Eq, Ord, Hash**                                           | ⚠️     | (mentioned in contracts.md)   | Full API reference: `eq()`, `ne()`, `cmp()`, `lt()`, `le()`, `gt()`, `ge()`, `hash()` |
| 4.3  | **From, Into, TryFrom, TryInto**                            | ⚠️     | (mentioned in contracts.md)   | Full API with `?` operator integration, Error type                                    |
| 4.4  | **Display, Debug, Clone, Default**                          | ⚠️     | (mentioned in contracts.md)   | Full API: `toString()`, `debug()`, `clone()`, `Default()` constructor                 |
| 4.5  | **Operator Contracts ($Add, $Sub, ...)**                    | ✅     | `guide/advanced/operators.md` | —                                                                                     |
| 4.6  | **$Index** (indexing `[]`)                                  | ❌     | —                             | 📦 `ops.vx` — Index operator contract                                                 |
| 4.7  | **$Not** (logical not `!`)                                  | ❌     | —                             | 📦 `ops.vx` — Logical NOT contract                                                    |
| 4.8  | **$Range** (range `..`)                                     | ❌     | —                             | Range operator contract (if exists)                                                   |
| 4.9  | **$Bytes** (binary serialization)                           | ❌     | —                             | 📦 `builtin_contracts.vx` — `asBytes()`, `fromBytes()`                                |
| 4.10 | **$Pin** (pin marker)                                       | ❌     | —                             | 📦 `builtin_contracts.vx` — Marker for self-referential types                         |
| 4.11 | **$Dealloc** (manual free)                                  | ❌     | —                             | 📦 `builtin_contracts.vx` — Explicit deallocation                                     |
| 4.12 | **$Owner** (owning capability)                              | ❌     | —                             | 📦 `builtin_contracts.vx` + `memory.vx` — Owning capability marker                    |
| 4.13 | **$BorrowedView** (non-owning view)                         | ❌     | —                             | 📦 `builtin_contracts.vx` + `memory.vx` — Borrowed view capability                    |
| 4.14 | **$RawPointer** (raw memory handle)                         | ❌     | —                             | 📦 `builtin_contracts.vx` + `memory.vx` — Raw pointer capability                      |
| 4.15 | **$SuspendSafe** (await-safe)                               | ❌     | —                             | 📦 `builtin_contracts.vx` + `memory.vx` — Value valid across await                    |
| 4.16 | **$ConcurrentSafe** (send/sync)                             | ❌     | —                             | 📦 `builtin_contracts.vx` + `memory.vx` — Value safe for concurrent transfer          |
| 4.17 | **$ForeignManaged** (externally owned)                      | ❌     | —                             | 📦 `memory.vx` — Lifetime governed outside Vex                                        |
| 4.18 | **SmartPointer** contract                                   | ❌     | —                             | 📦 `memory.vx` — Generic smart pointer interface                                      |
| 4.19 | **RefCounted** contract                                     | ❌     | —                             | 📦 `memory.vx` — Reference counting interface (`clone()`, `strong_count()`)           |
| 4.20 | **Drop** contract                                           | ❌     | —                             | 📦 `memory.vx` — RAII cleanup                                                         |
| 4.21 | **Collection, Stack, Queue, Indexable, Iterable, Growable** | ❌     | —                             | 📦 `collection.vx` — Collection hierarchy contracts                                   |
| 4.22 | **PackedType** contract                                     | ❌     | —                             | 📦 `packed.vx` — Packed memory layout contract                                        |
| 4.23 | **Iterator / IntoIterator**                                 | ❌     | —                             | Iterator contract for `for` loop support                                              |

---

## 5. ADVANCED FEATURES (Guide → Advanced)

| #    | Topic                                | Status | Existing File                 | What's Missing                                                                          |
| ---- | ------------------------------------ | ------ | ----------------------------- | --------------------------------------------------------------------------------------- |
| 5.1  | **Methods**                          | ✅     | `guide/advanced/methods.md`   | Constructor methods, static methods, method resolution order                            |
| 5.2  | **Operators**                        | ✅     | `guide/advanced/operators.md` | Full operator list with descriptions                                                    |
| 5.3  | **Pointers**                         | ✅     | `guide/advanced/pointers.md`  | —                                                                                       |
| 5.4  | **Inline Assembly**                  | ✅     | `guide/advanced/assembly.md`  | 🔧 `expr/inline_asm.rs` — All constraint types, clobber lists, Intel vs AT&T            |
| 5.5  | **Builtins / Compiler Intrinsics**   | ✅     | `guide/advanced/builtins.md`  | Complete intrinsic catalog, `#sizeof`, `#alignof`, `#offset_ptr_idx`, etc.              |
| 5.6  | **Comptime**                         | ✅     | `guide/advanced/comptime.md`  | 🔧 `calls/comptime/` — Comptime evaluation, reflection, code generation                 |
| 5.7  | **Unsafe**                           | ✅     | `guide/advanced/unsafe.md`    | Unsafe blocks, unsafe operations catalog, safety proofs                                 |
| 5.8  | **Autograd**                         | ✅     | `guide/advanced/autograd.md`  | 🔧 `calls/autograd/` — Automatic differentiation API, gradient tapes                    |
| 5.9  | **Graph Functions** (`graph fn`)     | ❌     | —                             | 🔧 `codegen_hir/graph_fn/` — GPU graph function syntax, kernel launch, thread hierarchy |
| 5.10 | **Error Handling**                   | ✅     | `guide/error-handling.md`     | `Result<T,E>`, `?` operator, error propagation patterns, custom error types             |
| 5.11 | **FFI**                              | ✅     | `guide/ffi.md`                | C type mapping table, calling conventions, linking                                      |
| 5.12 | **Freestanding**                     | ✅     | `guide/freestanding.md`       | `#![no_std]`, bare metal, custom allocators, panic handler                              |
| 5.13 | **Conditional Compilation**          | ❌     | —                             | `#if`, `#else`, `#endif`, `#target_os`, feature flags                                   |
| 5.14 | **Compiler Directives / Attributes** | ❌     | —                             | `#[inline]`, `#[no_mangle]`, `#[export]`, `#[cold]`, `#[target_feature]`, etc.          |

---

## 6. SIMD, TENSOR & MASK (Guide → SIMD)

| #    | Topic                             | Status | Existing File               | What's Missing                                                                                                                                              |
| ---- | --------------------------------- | ------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- | ------------------------------------------------------------------------- |
| 6.1  | **SIMD Overview**                 | ✅     | `guide/simd/`               | —                                                                                                                                                           |
| 6.2  | **Tensor<T, N>**                  | ✅     | `guide/simd/tensor-mask.md` | Static tensor API, element access, reshape                                                                                                                  |
| 6.3  | **Mask<N>**                       | ✅     | `guide/simd/tensor-mask.md` | Mask creation, bitwise mask ops, ToBitmask/FromBitmask, Any/All/CountSetBits/FirstSet                                                                       |
| 6.4  | **DynTensor<T> & DynMask**        | ❌     | —                           | Runtime-sized tensors, heap-backed, dynamic reshaping                                                                                                       |
| 6.5  | **SIMD Arithmetic Operators**     | ⚠️     | (partial)                   | Saturating ops (`+                                                                                                                                          | `, `-     | `, `\*     | `), min/max (`<?`, `>?`), FMA (`_+`), CLMUL (`_^`), rotate (`<<<`, `>>>`) |
| 6.6  | **SIMD Comparison → Mask**        | ⚠️     | (partial)                   | Full comparison operator table, mask combination                                                                                                            |
| 6.7  | **Horizontal Reductions**         | ❌     | —                           | `<+` (sum), `<*` (product), `<&` (AND), `<                                                                                                                  | `(OR),`<? | `(min),`>? | ` (max)                                                                   |
| 6.8  | **Matrix Operations**             | ❌     | —                           | `<*>` (matmul), `<^>` (power), `<\>` (linear solve)                                                                                                         |
| 6.9  | **Gather / Scatter**              | ❌     | —                           | 🔧 `simd/backends/*/gather_scatter.rs` — Indexed load/store, scatter_add, bounds checking                                                                   |
| 6.10 | **SIMD Math Intrinsics**          | ❌     | —                           | `abs()`, `sqrt()`, `sin()`, `cos()`, `exp()`, `exp2()`, `log()`, `log2()`, `log10()`, `floor()`, `ceil()`, `trunc()`, `round()`, `rint()` on arrays/tensors |
| 6.11 | **Array → Tensor Auto-Promotion** | ❌     | —                           | When arrays become tensors, scalar broadcast rules                                                                                                          |
| 6.12 | **SIMD Backend Configuration**    | ❌     | —                           | `SimdBackend { simd_width, unroll_factor, enable_prefetch, use_sve }` — tuning                                                                              |

---

## 7. CONCURRENCY (Guide → Concurrency)

| #   | Topic                              | Status | Existing File                   | What's Missing                                                                                       |
| --- | ---------------------------------- | ------ | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 7.1 | **Overview**                       | ✅     | `guide/concurrency/overview.md` | —                                                                                                    |
| 7.2 | **Async / Await**                  | ✅     | `guide/concurrency/async.md`    | State machine lowering detail, `async fn` restrictions, suspension points                            |
| 7.3 | **Channels**                       | ✅     | `guide/concurrency/channels.md` | Channel buffer strategies, close semantics, `<-ch` receive, `ch <- val` send                         |
| 7.4 | **go Blocks**                      | ⚠️     | (in async.md?)                  | 🔧 `expr/spawn/` — `go { }` fire-and-forget, capture semantics (move by default?), `go` return value |
| 7.5 | **M:N Scheduler**                  | ❌     | —                               | Work-stealing algorithm, worker threads, task spawning overhead                                      |
| 7.6 | **Atomic Operations**              | ❌     | —                               | Atomic types, `fetch_add`, `compare_exchange`, memory ordering                                       |
| 7.7 | **Mutex / Lock / Synchronization** | ❌     | —                               | Mutex<T>, RwLock<T>, Once, Barrier (verify what exists)                                              |
| 7.8 | **Channel Select** (`select { }`)  | ❌     | —                               | Multi-channel wait, `select` syntax, default case                                                    |

---

## 8. SIR (Silicon IR) & GPU (Guide → GPU / Fusion)

| #    | Topic                          | Status | Existing File                | What's Missing                                                                                     |
| ---- | ------------------------------ | ------ | ---------------------------- | -------------------------------------------------------------------------------------------------- |
| 8.1  | **GPU Programming Overview**   | ✅     | `guide/gpu/`                 | —                                                                                                  |
| 8.2  | **Fusion Graph**               | ✅     | `guide/fusion/graph.md`      | —                                                                                                  |
| 8.3  | **SIR Pipeline**               | ✅     | `guide/simd/sir-pipeline.md` | —                                                                                                  |
| 8.4  | **SIR Graph Construction API** | ❌     | —                            | Building SIR graphs from Vex, node types, edge types                                               |
| 8.5  | **SIR Optimization Passes**    | ❌     | —                            | 🔧 `passes/` — Fusion, Tiling, DCE, Legalize, Simplify, Quantize, Memory, MatMul, Layout, Autograd |
| 8.6  | **CPU SIMD Backend**           | ⚠️     | (partial in SIR pipeline)    | Scalar fallback, SIMD width, loop vectorization strategy                                           |
| 8.7  | **SPIR-V Backend**             | ❌     | —                            | 🔧 `backends/spirv/` — Vulkan/OpenCL SPIR-V, capabilities, decorations                             |
| 8.8  | **WGSL Backend**               | ❌     | —                            | 🔧 `backends/wgsl/` — WebGPU shader generation, limits                                             |
| 8.9  | **Metal Backend**              | ❌     | —                            | 🔧 `backends/metal/` — MSL generation, MTLBuffer, threadgroup memory                               |
| 8.10 | **CUDA Backend**               | ❌     | —                            | 🔧 `backends/cuda/` — PTX/CUBIN generation, kernel launch                                          |
| 8.11 | **ROCm Backend**               | ❌     | —                            | 🔧 `backends/rocm/` — AMD GPU support                                                              |
| 8.12 | **Vulkan Backend**             | ❌     | —                            | 🔧 `backends/vulkan.rs` — Direct Vulkan compute                                                    |
| 8.13 | **OpenCL Backend**             | ❌     | —                            | 🔧 `backends/opencl.rs` — OpenCL C generation                                                      |
| 8.14 | **OpenVINO Backend**           | ❌     | —                            | 🔧 `backends/openvino.rs` — Intel inference                                                        |
| 8.15 | **CoreML Backend**             | ❌     | —                            | 🔧 `backends/coreml/` — Apple CoreML model export                                                  |
| 8.16 | **GPU C Family Backend**       | ❌     | —                            | 🔧 `backends/gpu_c_family/` — Generic GPU C codegen                                                |
| 8.17 | **GPU Kernel Dispatch**        | ❌     | —                            | Thread hierarchy, workgroup size, `graph fn` to kernel mapping                                     |

---

## 9. STANDARD LIBRARY (→ /std/)

| #    | Module                                               | Status | Existing File      | What's Missing                                                                             |
| ---- | ---------------------------------------------------- | ------ | ------------------ | ------------------------------------------------------------------------------------------ |
| 9.1  | **Overview**                                         | ✅     | `std/index.md`     | Module dependency graph, import conventions                                                |
| 9.2  | **bit**                                              | ✅     | `std/bit.md`       | —                                                                                          |
| 9.3  | **cli**                                              | ✅     | `std/cli.md`       | Argument parsing, subcommands, help generation                                             |
| 9.4  | **compress** (lz4, zstd, gzip, brotli)               | ✅     | `std/compress/*`   | —                                                                                          |
| 9.5  | **context**                                          | ✅     | `std/context.md`   | —                                                                                          |
| 9.6  | **crypto** (hash, encrypt, kdf)                      | ✅     | `std/crypto/*`     | —                                                                                          |
| 9.7  | **db** (connection, ORM)                             | ✅     | `std/db/*`         | —                                                                                          |
| 9.8  | **encoding**                                         | ✅     | `std/encoding.md`  | Base64, hex, binary codecs                                                                 |
| 9.9  | **errors**                                           | ✅     | `std/errors.md`    | —                                                                                          |
| 9.10 | **fs** (file, paths)                                 | ✅     | `std/fs/*`         | —                                                                                          |
| 9.11 | **hash**                                             | ✅     | `std/hash.md`      | —                                                                                          |
| 9.12 | **http** (server, client, fiber, ws, h2, middleware) | ✅     | `std/http/*`       | —                                                                                          |
| 9.13 | **inference**                                        | ✅     | `std/inference.md` | —                                                                                          |
| 9.14 | **io**                                               | ✅     | `std/io.md`        | —                                                                                          |
| 9.15 | **log**                                              | ✅     | `std/log.md`       | —                                                                                          |
| 9.16 | **math**                                             | ✅     | `std/math.md`      | —                                                                                          |
| 9.17 | **mem**                                              | ✅     | `std/mem.md`       | —                                                                                          |
| 9.18 | **ml**                                               | ✅     | `std/ml.md`        | —                                                                                          |
| 9.19 | **net**                                              | ✅     | `std/net.md`       | —                                                                                          |
| 9.20 | **rand**                                             | ✅     | `std/rand.md`      | —                                                                                          |
| 9.21 | **regex** (engine, API, internals)                   | ✅     | `std/regex/*`      | —                                                                                          |
| 9.22 | **semver**                                           | ✅     | `std/semver.md`    | —                                                                                          |
| 9.23 | **serde** (json, toml, csv, msgpack, yaml, cbor)     | ✅     | `std/serde/*`      | —                                                                                          |
| 9.24 | **sort**                                             | ✅     | `std/sort.md`      | —                                                                                          |
| 9.25 | **strconv**                                          | ✅     | `std/strconv.md`   | —                                                                                          |
| 9.26 | **strings**                                          | ✅     | `std/strings.md`   | —                                                                                          |
| 9.27 | **sys**                                              | ✅     | `std/sys.md`       | OS-level primitives                                                                        |
| 9.28 | **testing**                                          | ✅     | `std/testing.md`   | —                                                                                          |
| 9.29 | **time**                                             | ✅     | `std/time/*`       | —                                                                                          |
| 9.30 | **unicode**                                          | ✅     | `std/unicode.md`   | —                                                                                          |
| 9.31 | **url**                                              | ✅     | `std/url.md`       | —                                                                                          |
| 9.32 | **collections**                                      | ❌     | —                  | 🔧 `lib/std/collections/` — Additional collections (LinkedList, BinaryHeap, etc. — verify) |
| 9.33 | **faststring**                                       | ❌     | —                  | 🔧 `lib/std/faststring/` — FastString implementation details                               |
| 9.34 | **fmt** (formatting)                                 | ❌     | —                  | 🔧 `lib/std/fmt/` — Formatting engine, custom formatters                                   |
| 9.35 | **builtins**                                         | ❌     | —                  | 🔧 `lib/std/builtins.vx` — All builtin functions catalog                                   |

---

## 10. PRELUDE TYPES — FULL API REFERENCE

Each prelude type needs a dedicated API reference page with ALL methods documented.

| #     | Type                     | Status | Existing File                   | Missing Methods / Notes                                                                                                                 |
| ----- | ------------------------ | ------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 10.1  | **Option<T>**            | ⚠️     | (in guide/types/)               | Full API: `isSome()`, `isNone()`, `unwrap()`, `unwrapOr()`, `map()`, `andThen()`, `or()`, `orElse()`, `expect()`                        |
| 10.2  | **Result<T,E>**          | ⚠️     | (in error-handling.md)          | Full API: `isOk()`, `isErr()`, `unwrap()`, `unwrapErr()`, `unwrapOr()`, `map()`, `mapErr()`, `andThen()`, `orElse()`, `expect()`        |
| 10.3  | **Vec<T>**               | ✅     | `guide/types/vec.md`            | Verify completeness: `push`, `pop`, `get`, `set`, `len`, `capacity`, `reserve`, `extend`, `iter`, `remove`, `clear`, `sort`, `contains` |
| 10.4  | **Box<T>**               | ✅     | `guide/memory/box.md`           | VUMM inference, `Box.new()`, `Box.from()`, deref                                                                                        |
| 10.5  | **Map<K,V>**             | ✅     | `guide/types/map-set.md`        | Verify: `insert`, `get`, `remove`, `contains`, `len`, `iter`, `keys`, `values`                                                          |
| 10.6  | **Set<T>**               | ✅     | `guide/types/map-set.md`        | Verify: `insert`, `contains`, `remove`, `len`, `iter`, union/intersection/difference                                                    |
| 10.7  | **Ptr<T>**               | ✅     | `guide/memory/ptr-t.md`         | Verify ALL methods listed in copilot-instructions.md are covered                                                                        |
| 10.8  | **Span<T>**              | ✅     | `guide/memory/span-t.md`        | Verify ALL methods listed in copilot-instructions.md are covered                                                                        |
| 10.9  | **RawBuf**               | ✅     | `guide/memory/rawbuf.md`        | Verify ALL methods listed in copilot-instructions.md are covered                                                                        |
| 10.10 | **Channel<T>**           | ✅     | `guide/concurrency/channels.md` | Verify: `new()`, `send()`, `recv()`, `close()`, `trySend()`, `tryRecv()`, buffered vs unbuffered                                        |
| 10.11 | **str** (VexStr)         | ⚠️     | (in strings.md)                 | Full API: `from_raw()`, `empty()`, `len()`, `as_ptr()`, `slice()`, string interop                                                       |
| 10.12 | **string** (VexString)   | ⚠️     | (in strings.md)                 | Full API: all methods, inline vs heap, capacity, refcount for Rc/Arc                                                                    |
| 10.13 | **Range<T>**             | ❌     | —                               | 🔧 In `vec.vxc` — `{ start, end, current }`, iteration protocol                                                                         |
| 10.14 | **Complex<T>**           | ❌     | —                               | 📦 `prelude/complex.vxc` — Full API: real, imag, magnitude, phase, conjugate, arithmetic                                                |
| 10.15 | **OrderedMap<K,V>**      | ❌     | —                               | 📦 `prelude/ordered_map.vxc` — Insertion-ordered map, full API                                                                          |
| 10.16 | **Pin<T>**               | ❌     | —                               | 📦 `prelude/pin.vx` — Pin API, `pin()`, `unpin()`, `Pin.new()`                                                                          |
| 10.17 | **Mem** (prelude memory) | ❌     | —                               | 📦 `prelude/mem.vxc` — `vex_malloc`, `vex_free`, `vex_realloc`, `vex_memcpy`, `vex_memset`, `vex_memcmp`, `vex_memmove`                 |

---

## 11. OPERATORS — COMPLETE REFERENCE

| #     | Operator                | Syntax                             | Contract     | Status |
| ----- | ----------------------- | ---------------------------------- | ------------ | ------ |
| 11.1  | Addition                | `a + b`                            | `$Add`       | ✅     |
| 11.2  | Subtraction             | `a - b`                            | `$Sub`       | ✅     |
| 11.3  | Multiplication          | `a * b`                            | `$Mul`       | ✅     |
| 11.4  | Division                | `a / b`                            | `$Div`       | ✅     |
| 11.5  | Modulo                  | `a % b`                            | `$Mod`       | ✅     |
| 11.6  | Negation                | `-a`                               | `$Neg`       | ✅     |
| 11.7  | Bitwise AND             | `a & b`                            | `$BitAnd`    | ✅     |
| 11.8  | Bitwise OR              | `a \| b`                           | `$BitOr`     | ✅     |
| 11.9  | Bitwise XOR             | `a ^ b`                            | `$BitXor`    | ✅     |
| 11.10 | Bitwise NOT             | `~a`                               | `$BitNot`    | ✅     |
| 11.11 | Left Shift              | `a << b`                           | `$Shl`       | ✅     |
| 11.12 | Right Shift             | `a >> b`                           | `$Shr`       | ✅     |
| 11.13 | Equality                | `a == b`                           | `$Eq`        | ✅     |
| 11.14 | Inequality              | `a != b`                           | `$Eq`        | ✅     |
| 11.15 | Ordering                | `< > <= >=`                        | `$Ord`       | ✅     |
| 11.16 | Logical NOT             | `!a`                               | `$Not`       | ✅     |
| 11.17 | Index                   | `a[i]`                             | `$Index`     | ❌     |
| 11.18 | Range                   | `a..b`, `a..=b`                    | `$Range` (?) | ❌     |
| 11.19 | **SIMD Saturating Add** | `a +\| b`                          | —            | ❌     |
| 11.20 | **SIMD Saturating Sub** | `a -\| b`                          | —            | ❌     |
| 11.21 | **SIMD Saturating Mul** | `a *\| b`                          | —            | ❌     |
| 11.22 | **SIMD Min**            | `a <? b`                           | —            | ❌     |
| 11.23 | **SIMD Max**            | `a >? b`                           | —            | ❌     |
| 11.24 | **SIMD FMA**            | `a *+ b`                           | —            | ❌     |
| 11.25 | **SIMD CLMUL**          | `a *^ b`                           | —            | ❌     |
| 11.26 | **SIMD Rotate Left**    | `a <<< b`                          | —            | ❌     |
| 11.27 | **SIMD Rotate Right**   | `a >>> b`                          | —            | ❌     |
| 11.28 | **Reduce Sum**          | `<+ arr`                           | —            | ❌     |
| 11.29 | **Reduce Product**      | `<* arr`                           | —            | ❌     |
| 11.30 | **Reduce AND**          | `<& arr`                           | —            | ❌     |
| 11.31 | **Reduce OR**           | `<\| arr`                          | —            | ❌     |
| 11.32 | **Reduce Min**          | `<?\| arr`                         | —            | ❌     |
| 11.33 | **Reduce Max**          | `>?\| arr`                         | —            | ❌     |
| 11.34 | **Matrix Multiply**     | `A <*> B`                          | —            | ❌     |
| 11.35 | **Matrix Power**        | `A <^> n`                          | —            | ❌     |
| 11.36 | **Linear Solve**        | `A <\> b`                          | —            | ❌     |
| 11.37 | **Channel Send**        | `ch <- val`                        | —            | ❌     |
| 11.38 | **Channel Recv**        | `<-ch`                             | —            | ❌     |
| 11.39 | **Compound Assignment** | `+= -= *= /= %= &= \|= ^= <<= >>=` | —            | ⚠️     |

---

## 12. COMPILER & BUILD SYSTEM

| #     | Topic                                                      | Status | Existing File                     | What's Missing                                                   |
| ----- | ---------------------------------------------------------- | ------ | --------------------------------- | ---------------------------------------------------------------- |
| 12.1  | **Optimization Levels** (`-O0`, `-O1`, `-O2`, `-O3`)       | ❌     | —                                 | What each level does, LLVM pass pipelines                        |
| 12.2  | **LTO (Link-Time Optimization)**                           | ❌     | —                                 | ThinLTO vs FullLTO, `--lto` flag                                 |
| 12.3  | **AOT vs JIT Compilation**                                 | ❌     | —                                 | `vex run` (JIT) vs `vex compile` (AOT), trade-offs               |
| 12.4  | **Cross-Compilation**                                      | ❌     | —                                 | Target triples, `--target` flag, supported targets               |
| 12.5  | **Build Profiles** (debug, release)                        | ❌     | —                                 | `--release`, debug symbols, assertions                           |
| 12.6  | **Incremental Compilation**                                | ❌     | —                                 | Cache invalidation, `--incremental`                              |
| 12.7  | **Compiler Flags — Complete Reference**                    | ⚠️     | `references/vex-cli-reference.md` | All flags with descriptions, defaults                            |
| 12.8  | **Emit Flags** (`--emit-llvm`, `--emit-asm`, `--emit-obj`) | ⚠️     | (in CLI ref?)                     | Each emit target explained                                       |
| 12.9  | **LLVM Version & Compatibility**                           | ❌     | —                                 | LLVM 21.1.8, upgrade policy                                      |
| 12.10 | **Prelude Loading** (demand-driven)                        | ❌     | —                                 | How prelude modules are loaded, conditional loading optimization |

---

## 13. TOOLING

| #     | Tool                          | Status | Existing File                      | What's Missing                                                                                                          |
| ----- | ----------------------------- | ------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 13.1  | **vex** (CLI)                 | ✅     | `references/vex-cli-reference.md`  | Verify all subcommands: `run`, `compile`, `test`, `doc`, `fmt`, `pm`, `bench`, `fuzz`                                   |
| 13.2  | **vex test**                  | ✅     | `references/vex-test-reference.md` | Test attributes, assertion macros, benchmark tests                                                                      |
| 13.3  | **vex pm** (Package Manager)  | ✅     | `references/vex-pm-reference.md`   | Registry, publish, install, workspace                                                                                   |
| 13.4  | **vex doc**                   | ✅     | `references/vex-doc-reference.md`  | Doc generation, `///` comments, output format                                                                           |
| 13.5  | **vex fmt** (Formatter)       | ❌     | —                                  | 🔧 `tools/vex-formatter/` — Formatter rules, configuration, CI integration                                              |
| 13.6  | **vex fuzz** (Fuzzer)         | ❌     | —                                  | 🔧 `tools/vex-fuzzer/` — Fuzzing workflow, corpus management, crash triage                                              |
| 13.7  | **vex bench** (Benchmark)     | ❌     | —                                  | 🔧 `tools/vex-bench/` — Benchmark harness, statistical analysis, comparison                                             |
| 13.8  | **vex lsp** (Language Server) | ❌     | —                                  | 🔧 `tools/vex-lsp/` — Features: completions, hover, go-to-def, find-refs, diagnostics, rename, code actions, formatting |
| 13.9  | **Debugging** (LLDB/GDB)      | ❌     | —                                  | Debug info format (DWARF), source mapping, pretty-printers                                                              |
| 13.10 | **Playground** (WASM)         | ❌     | —                                  | Architecture, limitations, sharing snippets                                                                             |
| 13.11 | **Editor Integration**        | ❌     | —                                  | VS Code extension, Vim/Neovim, Emacs, Zed                                                                               |

---

## 14. PACKAGE MANAGER — DETAILED

| #    | Topic                      | Status | What's Missing                                                                                                                   |
| ---- | -------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 14.1 | `vex.toml` manifest format | ⚠️     | Full schema: `[package]`, `[dependencies]`, `[dev-dependencies]`, `[build-dependencies]`, `[workspace]`, `[profile]`, `[target]` |
| 14.2 | Dependency resolution      | ❌     | Version constraints (SemVer), lockfile (`vex.lock`), minimum version resolution                                                  |
| 14.3 | Workspaces                 | ❌     | Multi-crate workspaces, path dependencies, member configuration                                                                  |
| 14.4 | Publishing packages        | ❌     | `vex pm publish`, authentication, package naming, versioning                                                                     |
| 14.5 | Registry architecture      | ❌     | Package storage, download, checksums, registry API                                                                               |
| 14.6 | Git dependencies           | ❌     | `git = "..."`, branch/tag/rev, submodules                                                                                        |

---

## 15. PLATFORM SUPPORT

| #    | Platform                     | Status | What's Missing                                                         |
| ---- | ---------------------------- | ------ | ---------------------------------------------------------------------- |
| 15.1 | **macOS** (arm64 + x86_64)   | ❌     | System requirements, Homebrew install, code signing, Metal backend     |
| 15.2 | **Linux** (x86_64, arm64)    | ❌     | Distro packages, syscall backend, CUDA/ROCm/Vulkan setup               |
| 15.3 | **FreeBSD**                  | ❌     | 🔧 `platform/freebsd.c` — Status, limitations, kqueue poller           |
| 15.4 | **Windows**                  | ❌     | 🔧 `platform/windows.c` — Status, limitations, MSVC/MinGW, IOCP poller |
| 15.5 | **Cross-compilation matrix** | ❌     | Host → Target compatibility table                                      |

---

## 16. FFI & INTEROP — DETAILED

| #    | Topic                        | Status | What's Missing                                                                      |
| ---- | ---------------------------- | ------ | ----------------------------------------------------------------------------------- |
| 16.1 | C type mapping table         | ⚠️     | Every Vex type → C type, struct layout compatibility, `#[repr(C)]`                  |
| 16.2 | Calling conventions          | ❌     | `extern "C"`, `extern "system"`, variadic functions, callback safety                |
| 16.3 | Linking with C libraries     | ❌     | Static vs dynamic linking, `-l` flags, pkg-config integration                       |
| 16.4 | Runtime symbol registration  | ❌     | JIT symbol resolution, `register_runtime_symbols()`, `force_link_runtime_symbols()` |
| 16.5 | Exporting Vex functions to C | ❌     | `#[no_mangle]`, `extern "C" fn`, header generation                                  |

---

## 17. ARCHITECTURE (→ /architecture/)

| #    | Topic               | Status | Existing File                         | What's Missing                                                                                                                |
| ---- | ------------------- | ------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 17.1 | Overview            | ✅     | `architecture/index.md`               | —                                                                                                                             |
| 17.2 | Compiler Pipeline   | ✅     | `architecture/compiler-pipeline.md`   | Lexer → Parser → AST → HIR → SIR → Codegen diagram detail                                                                     |
| 17.3 | SIR & Backends      | ✅     | `architecture/sir-and-backends.md`    | —                                                                                                                             |
| 17.4 | Runtime & Tooling   | ✅     | `architecture/runtime-and-tooling.md` | —                                                                                                                             |
| 17.5 | Crate Map           | ❌     | —                                     | Full crate dependency graph: `vex-lexer`, `vex-parser`, `vex-syntax`, `vex-hir`, `vex-sir`, `vex-compiler`, `vex-diagnostics` |
| 17.6 | HIR (High-Level IR) | ❌     | —                                     | HIR design, type checking, borrow checking (NLL), lowering passes                                                             |

---

## 18. DEVELOPMENT & CONTRIBUTING

| #    | Topic                              | Status | What's Missing                                                       |
| ---- | ---------------------------------- | ------ | -------------------------------------------------------------------- |
| 18.1 | Building from source               | ❌     | Prerequisites (Rust, LLVM 21, CMake), `cargo build`, troubleshooting |
| 18.2 | Project structure for contributors | ❌     | Crate overview, where to find what, code conventions                 |
| 18.3 | Running tests                      | ❌     | `./test_all.sh`, test organization, adding new tests                 |
| 18.4 | Debugging the compiler             | ❌     | LLDB/GDB setup, logging, `--emit-llvm` for IR inspection             |
| 18.5 | Contribution guidelines            | ❌     | PR process, commit style, CLA/DCO                                    |
| 18.6 | Code style guide                   | ❌     | Rust conventions for compiler code, Vex conventions for stdlib       |

---

## 19. ECOSYSTEM & META

| #    | Topic                     | Status | What's Missing                                                                    |
| ---- | ------------------------- | ------ | --------------------------------------------------------------------------------- |
| 19.1 | **"Why Vex?" Comparison** | ❌     | Vex vs Rust, Go, Zig, Mojo, C++ — side-by-side feature matrix                     |
| 19.2 | **Versioning policy**     | ❌     | Semantic versioning, breaking change policy, deprecation process                  |
| 19.3 | **Stability guarantees**  | ❌     | What's stable, what's experimental, compiler vs stdlib stability                  |
| 19.4 | **Migration guides**      | ❌     | v0.1.x → v0.2.x migration, syntax changes                                         |
| 19.5 | **FAQ**                   | ❌     | Common questions, misconceptions, troubleshooting                                 |
| 19.6 | **Glossary**              | ❌     | Vex-specific terminology: VUMM, SIR, VexStr, prelude, contracts vs policies, etc. |
| 19.7 | **Changelog**             | ❌     | Version history, breaking changes per release                                     |
| 19.8 | **Benchmarks**            | ❌     | Performance comparisons, micro-benchmarks, real-world benchmarks                  |
| 19.9 | **Community**             | ❌     | Discord, GitHub Discussions, contribution recognition                             |

---

## 20. SYNTAX EDGE CASES & SPECIAL FEATURES

| #     | Topic                                 | Status | Notes                                                                             |
| ----- | ------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| 20.1  | **`#sizeof<T>()`** compiler intrinsic | ⚠️     | Document all `#`-prefixed compiler intrinsics                                     |
| 20.2  | **`#alignof<T>()`**                   | ⚠️     | —                                                                                 |
| 20.3  | **`#offset_ptr_idx(ptr, idx, size)`** | ⚠️     | —                                                                                 |
| 20.4  | **`#typeof(expr)`**                   | ❌     | If exists                                                                         |
| 20.5  | **`#embed("file")`**                  | ❌     | Compile-time file embedding                                                       |
| 20.6  | **`#line`, `#file`, `#column`**       | ❌     | Source location intrinsics                                                        |
| 20.7  | **`#panic("msg")`**                   | ❌     | Compile-time panic                                                                |
| 20.8  | **Destructuring** (let patterns)      | ⚠️     | `let (a, b) = tuple;`, `let Struct { x, y } = val;`, `let [first, ..rest] = arr;` |
| 20.9  | **Or-patterns** (`\|` in match)       | ❌     | `Some(1) \| Some(2) => ...`                                                       |
| 20.10 | **Rest patterns** (`..`)              | ❌     | `Struct { x, .. }`, `[first, ..]`                                                 |
| 20.11 | **Match guards** (`if` in arm)        | ❌     | `Some(x) if x > 0 => ...`                                                         |
| 20.12 | **`if let` / `while let`**            | ❌     | Conditional single-pattern matching                                               |
| 20.13 | **`as` casts**                        | ⚠️     | Safe casts (primitive widening), unsafe casts (ptr→int), `as` vs `tryFrom`        |
| 20.14 | **`is` type test**                    | ❌     | If Vex has `is` operator for type checking                                        |
| 20.15 | **Never-type coercion**               | ❌     | `never` coerces to any type, used in `return`/`panic`/`abort`                     |
| 20.16 | **Expression statements**             | ❌     | Expression vs statement distinction, `;` semantics, block tail expressions        |

---

## 21. RUNTIME DETAILS

| #    | Topic                    | Status | What's Missing                                                                 |
| ---- | ------------------------ | ------ | ------------------------------------------------------------------------------ |
| 21.1 | Runtime architecture     | ❌     | C runtime (`lib/runtime/`), Rust FFI bindings, JIT symbol bridge               |
| 21.2 | VUMM allocator internals | ❌     | `vumm.c` algorithm, size classes, thread-local caches, refcount implementation |
| 21.3 | Async runtime            | ❌     | Work-stealing deque, task spawning, I/O poller integration (kqueue/epoll/IOCP) |
| 21.4 | Channel implementation   | ❌     | MPMC ring buffer, lock-free algorithm, backpressure                            |
| 21.5 | Signal handling          | ❌     | Graceful shutdown, SIGINT/SIGTERM                                              |
| 21.6 | Panic runtime            | ❌     | Panic handler, backtrace, unwind vs abort                                      |
| 21.7 | Sanitizer support        | ❌     | ASan, TSan, UBSan integration                                                  |

---

## 📊 SUMMARY STATISTICS

| Category              | Total Items | ✅ Done       | ⚠️ Partial  | ❌ Missing    |
| --------------------- | ----------- | ------------- | ----------- | ------------- |
| 1. Language Basics    | 11          | 5             | 3           | 3             |
| 2. Type System        | 21          | 11            | 0           | 10            |
| 3. Memory Model       | 14          | 9             | 2           | 3             |
| 4. Contracts          | 23          | 2             | 3           | 18            |
| 5. Advanced Features  | 14          | 10            | 0           | 4             |
| 6. SIMD/Tensor/Mask   | 12          | 3             | 3           | 6             |
| 7. Concurrency        | 8           | 3             | 1           | 4             |
| 8. SIR & GPU          | 17          | 3             | 1           | 13            |
| 9. Standard Library   | 35          | 31            | 0           | 4             |
| 10. Prelude Types API | 17          | 7             | 4           | 6             |
| 11. Operators         | 39          | 15            | 1           | 23            |
| 12. Compiler & Build  | 10          | 0             | 2           | 8             |
| 13. Tooling           | 11          | 4             | 0           | 7             |
| 14. Package Manager   | 6           | 0             | 1           | 5             |
| 15. Platform Support  | 5           | 0             | 0           | 5             |
| 16. FFI & Interop     | 5           | 0             | 1           | 4             |
| 17. Architecture      | 6           | 4             | 0           | 2             |
| 18. Development       | 6           | 0             | 0           | 6             |
| 19. Ecosystem & Meta  | 9           | 0             | 0           | 9             |
| 20. Syntax Edge Cases | 16          | 0             | 5           | 11            |
| 21. Runtime Details   | 7           | 0             | 0           | 7             |
| **TOTAL**             | **292**     | **107 (37%)** | **27 (9%)** | **158 (54%)** |

---

> **Next Step:** Review this list, mark priorities, then we begin documentation systematically.
> **Suggested Priority Order:** Types (Section 2) → Operators (Section 11) → Syntax Edge Cases (Section 20) → Contracts (Section 4) → SIMD (Section 6) → SIR/GPU (Section 8) → Compiler (Section 12) → Tooling (Section 13) → Platform (Section 15) → Ecosystem (Section 19)
