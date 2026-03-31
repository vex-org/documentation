# SIR Optimization Pipeline

This page describes the current pipeline conservatively: what is clearly implemented, what route a workload tends to take, and where the sharp edges still are.

## High-level picture

There are two different optimization routes that often get conflated:

- compiler-side inline SIMD for qualifying small static arrays
- SIR lowering and backend dispatch for tensor or graph workloads

Conceptually:

```text
source code
  -> HIR
  -> either small-array inline SIMD
  -> or SIR graph lowering
  -> backend selection
  -> LLVM IR / target code
```

## Route 1: inline SIMD for small arrays

The compiler has a dedicated `simd_small` path for qualifying fixed-size arrays.

The current backend threshold is explicit:

- maximum 64 bytes total
- maximum 64 elements
- element count must be a power of two

That threshold is implemented in `crates/vex-sir/src/codegen/backends/simd/inline.rs` and mirrored by the small-array codegen helpers in `crates/vex-compiler/src/codegen_hir/expr/simd_small`.

Typical examples on this path are:

- element-wise arithmetic on `[T; N]`
- vector comparisons on `[T; N]`
- reductions such as `\+` and `\>` on small arrays

Example:

```vex
fn sum8(x: [i32; 8]): i32 {
    return \+ x
}
```

On this path, the likely evidence in emitted LLVM is:

- `<N x T>` vector values
- `insertelement` chains for tiny literals
- `llvm.vector.reduce.*` intrinsics for reductions

## Route 2: SIR for tensor and graph code

When code is written around `graph fn`, `Tensor<T>`, or other graph-shaped tensor operations, the compiler lowers into SIR first and then chooses a backend based on shapes and supported node families.

This route is the right mental model for:

- dynamic tensors
- graph compute
- gather and scatter families
- backend dispatch between CPU SIMD and GPU-style paths

## Static and dynamic shape routing

The internal contract distinguishes between static and dynamic shapes:

- static tensors like `Tensor<f32, 4>` carry fixed shape information
- dynamic tensors like `Tensor<f32>` lower to `%VexDynTensor { ptr, i64 }`
- `Span<T>` lowers as a non-owning `%VexSlice { ptr, i64 }`

That distinction is not cosmetic. A dynamic tensor owns storage and participates in drop behavior, while a span is a borrowed view.

## Important coercion boundary

One of the easy mistakes is assuming every tensor-like value is interchangeable because the layouts look similar.

They are not.

The compiler has an explicit safety guard to avoid silently fabricating an owning dynamic tensor from a stack-aliased vector value. Conversions into `Tensor<T>` must go through the proper owned path.

In practical terms:

- `Span<T> -> Tensor<T>` should be treated as an owned conversion
- `Tensor<T>` and `Span<T>` are not just two names for the same thing
- bugs at generic call boundaries have historically shown up exactly here

## Backend capability, in plain language

Current backend support is uneven by operation family.

The strongest, most stable parts are:

- element-wise tensor math
- reductions
- inline SIMD for small arrays
- mask operations

More conditional areas include:

- dynamic indexed gather and scatter
- specialized scatter combine variants
- generic tensor arithmetic across arbitrary `T`
- assuming a single fused kernel for every graph-shaped expression

The current type-shape contract documents one especially important special case: dynamic SIMD indexed routing is intentionally narrow and only kicks in for certain single-node gather and scatter forms.

## What to verify when performance matters

For small arrays:

```bash
vex compile --emit-llvm file.vx
```

Look for:

- `<N x T>` vector operations
- `llvm.vector.reduce.*`
- fewer temporary allocas on the hot path

For tensor and graph workloads, emitted LLVM alone is not the whole story. The more relevant question is whether the workload lowered into the intended SIR route and backend family.

## Current documentation stance

Treat these as accurate today:

- there is a real inline SIMD threshold at 64 bytes
- small-array reductions use LLVM vector reduction intrinsics
- dynamic tensors are owning `{ ptr, i64 }` values with drop semantics
- masks and dynamic indexed operations have dedicated backend codepaths

Do not assume from this page that:

- every qualifying source expression will always fuse the way you expect
- all tensor math is equally mature across all dtypes and backends
- generic `Tensor<T>` arithmetic is a stable public contract yet

## See also

- [SIMD and Auto-Vectorization](./index)
- [Tensor and Mask Types](./tensor-mask)
- [GPU Programming](/guide/gpu)
