# Glossary

Key terms and concepts in the Vex ecosystem.

## A

**AOT (Ahead-of-Time)** -- Compilation mode that produces a standalone native binary before execution. Vex is AOT-only.

**Async Function** -- Function declared with `async fn` that can suspend at `await` points. Compiled to a state machine coroutine.

**Autograd** -- Automatic differentiation system for computing gradients of tensor operations, used in machine learning.

## B

**Borrowing** -- Creating a reference (`&T` or `&T!`) to a value without taking ownership. Governed by the borrow checker's NLL (Non-Lexical Lifetime) analysis.

**Box\<T\>** -- Heap-allocated smart pointer. The VUMM system infers whether it becomes Unique (single-owner), SharedRc (reference-counted, single-thread), or AtomicArc (atomic reference-counted, multi-thread).

**Builtin** -- A compiler intrinsic function or type available without imports. Prefixed with `#` (e.g., `#sizeof<T>()`).

## C

**Channel\<T\>** -- Multi-producer, multi-consumer bounded channel for communication between concurrent tasks. Use `ch <- val` to send and `<-ch` to receive.

**Closure** -- Anonymous function that can capture variables from its enclosing scope. Syntax: `|params|  expression`.

**Comptime** -- Compile-time code execution. Functions and expressions evaluated at build time rather than runtime.

**Contract** -- A trait-like interface defining shared behavior. Types implement contracts to gain capabilities. Syntax: `contract Name { method(); }`.

**Copy Type** -- A type that can be duplicated by bitwise copy. All primitives are Copy. Non-Copy types are moved on assignment.

## D

**Defer** -- Statement that schedules code to run when the current scope exits (Go-style RAII). Syntax: `defer file.close()`.

**Drop** -- The RAII cleanup mechanism. When a value implementing `$Drop` goes out of scope, its `drop()` method is called automatically.

**DynMask** -- Runtime-sized boolean mask for SIMD operations. Fat pointer: `{ ptr: *i8, len: i64 }`.

**DynTensor\<T\>** -- Runtime-sized tensor. Fat pointer: `{ ptr: *T, len: i64 }`. Used when tensor dimensions are not known at compile time.

## E

**Enum** -- Sum type (tagged union) that can hold one of several variants. Each variant can carry payload data. Syntax: `enum Option<T> { Some(T), None }`.

**Expression-Oriented** -- Most language constructs (if, match, loop, blocks) are expressions that return values, not just statements.

## F

**FFI (Foreign Function Interface)** -- Mechanism for calling C functions from Vex and vice versa. Uses `extern "C"` blocks.

**Freestanding** -- Mode where the standard library is not available (`#![no_std]`). Used for embedded/bare-metal programming.

**Fusion (SIR Fusion)** -- Optimization that merges multiple tensor operations into a single kernel launch, reducing GPU overhead.

## G

**go Block** -- Launches a fire-and-forget concurrent task on the M:N scheduler. Syntax: `go { await task(); }`.

**graph fn** -- GPU kernel function compiled through the SIR pipeline to target Metal, CUDA, SPIR-V, WGSL, etc.

## H

**HIR (High-Level IR)** -- The intermediate representation after parsing and type checking, before lowering to SIR or LLVM IR.

**Horizontal Reduction** -- Collapsing a tensor/array to a scalar using an associative operation. Syntax: `<+ arr` (sum), `<* arr` (product), `<?| arr` (min), `>?| arr` (max).

## I

**Iterator** -- Contract for types that yield a sequence of values. Powers `for` loops. Method: `next(): Option<Self.Item>`.

## J

**LLVM** -- The compiler backend that Vex uses for native code generation (version 21.1.8). Vex compiles to LLVM IR which is then lowered to machine code for the target architecture.

## L

**Lifetime** -- The span of execution during which a reference is valid. Vex uses NLL (Non-Lexical Lifetime) analysis to verify borrow safety.

**LTO (Link-Time Optimization)** -- Cross-module optimization that preserves LLVM bitcode through the link step. ThinLTO (fast, good results) and FullLTO (slow, best results).

## M

**M:N Scheduler** -- User-space scheduler that multiplexes M coroutines onto N OS threads. Uses work-stealing for load balancing.

**Mask\<N\>** -- Compile-time-sized SIMD boolean vector resulting from tensor comparisons. Supports bitwise operations and reduction queries.

**Move Semantics** -- For non-Copy types, assignment transfers ownership. The source becomes inaccessible after a move.

## N

**never** -- The bottom type with no possible values. Return type of diverging functions (`$panic`, `$abort`, infinite `loop`). Coerces to any type.

**NLL (Non-Lexical Lifetimes)** -- The borrow checker algorithm that computes liveness based on actual usage rather than lexical scope boundaries.

## O

**Operator Overloading** -- Defining custom behavior for operators (`+`, `==`, `[]`, etc.) by implementing the corresponding contract (`$Add`, `$Eq`, `$Index`).

**Option\<T\>** -- Type representing a value that may be absent. Variants: `Some(T)` or `None`. Safe alternative to null pointers.

**OrderedMap\<K, V\>** -- Hash map that preserves insertion order. Combines O(1) lookup with predictable iteration.

**Ownership** -- Each value in Vex has exactly one owner at a time. When the owner goes out of scope, the value is dropped.

## P

**Pin\<T\>** -- Wrapper that prevents a value from being moved in memory. Required for self-referential types where fields contain pointers to other fields of the same value.

**Prelude** -- Set of types and functions always available without explicit import. Includes `Option`, `Result`, `Vec`, `Box`, `Ptr`, `Span`, `string`, etc.

**Ptr\<T\>** -- Safe typed pointer wrapper providing methods like `read()`, `write()`, `readAt(index)`, `offset(n)` without manual pointer arithmetic.

**ptr** -- Untyped opaque raw pointer (equivalent to C's `void*`).

## R

**Range** -- Iterator type for numeric sequences. Syntax: `0..10` (exclusive), `0..=10` (inclusive), `..` (full range).

**RawBuf** -- Zero-cost byte-level memory accessor for low-level/stdlib code. Wraps a `ptr` with typed `load<T>(offset)` and `store<T>(offset, value)`.

**Result\<T, E\>** -- Type representing either success (`Ok(T)`) or failure (`Err(E)`). Primary error handling mechanism with `?` operator for propagation and `!>` rescue operator for fallback values.

**Rescue Operator (`!>`)** -- Postfix operator that extracts a value from `Option<T>` or `Result<T,E>`, providing a fallback on `None`/`Err`. Syntax: `val !> fallback` or `val !> || { computeFallback() }`. The idiomatic Vex alternative to `.unwrap()` (which does not exist in Vex).

## S

**SIMD (Single Instruction, Multiple Data)** -- CPU instruction set extension for parallel data processing. Vex auto-vectorizes array math to SIMD instructions.

**SIR (Silicon IR)** -- Vex's intermediate representation for GPU and accelerator computation. Write once, target Metal/CUDA/SPIR-V/WGSL/CPU SIMD.

**Span\<T\>** -- Bounds-checked fat pointer (non-owning view): `{ data: *T, length: usize }`. Safe slice-like access without ownership.

**str (VexStr)** -- Borrowed string view (16 bytes, Copy): `{ data: ptr, length: usize }`. Used for string literals and borrowing string data.

**string (VexString)** -- Owned heap-allocated string (16 bytes). Supports inline storage for short strings (SSO). Omni-string compatible with UTF-8, UTF-16, Latin-1.

**Struct** -- Composite data type with named fields. Can implement contracts, have methods, and define constructors.

## T

**Tensor\<T, N\>** -- Static-sized SIMD vector. Arrays auto-promote to tensors when performing arithmetic. Small tensors (<= 64B) live in SIMD registers.

**Threadgroup Memory** -- GPU on-chip shared memory within a workgroup (thread block). Declared with `threadgroup` keyword in `graph fn`. Much faster than global GPU memory.

## U

**Unit Type (`()`)** -- Zero-size type with exactly one value: `()`. Default return type for functions without a meaningful return value. Not the same as C's `void`.

**unsafe** -- Keyword marking a block where the compiler relaxes certain safety guarantees. Required for raw pointer dereference, FFI calls, and mutable static access.

## V

**Vec\<T\>** -- Dynamic array with automatic growth. Fields: `{ data: *T!, length: usize, capacity: usize }`. Primary collection type.

**VUMM (Vex Unified Memory Model)** -- Automatic ownership strategy inference for `Box<T>`. The compiler chooses Unique (single owner), SharedRc (reference counted, single thread), or AtomicArc (atomic reference count, multi-thread) based on usage analysis.

## W

**Work-Stealing** -- Scheduling algorithm where idle worker threads "steal" tasks from busy workers' queues. Provides automatic load balancing for the M:N scheduler.
