# Tensor and Mask Types

`Tensor` and `Mask` are the types that connect user-facing graph code to the SIR and SIMD backends.

The important distinction is this:

- small static tensors line up closely with array and vector lowering
- dynamic tensors are owning fat-pointer values with their own ABI and drop behavior
- masks are the boolean side of that model and have both static and dynamic forms

## Layout overview

Current compiler and SIR shape contracts are centered around these mappings:

```text
Tensor<f32, 4>  -> Ty::Array(f32, 4)  -> <4 x float>
Tensor<f32, 32> -> Ty::Array(f32, 32) -> [32 x float]
Tensor<f32>     -> Ty::DynTensor(f32) -> %VexDynTensor { ptr, i64 }
Mask<4>         -> Ty::Mask(4)        -> <4 x i1>
Mask            -> Ty::DynMask        -> %VexDynMask { ptr, i64 }
```

That split matters because static and dynamic tensors do not behave like a single interchangeable runtime object.

## Static `Tensor<T, N>`

Static tensors are compile-time sized.

In practice, the compiler lowers them through array machinery first:

- if the total size is at most 64 bytes, they can become LLVM vector values
- if the total size is larger than 64 bytes, they stay as memory arrays

So `Tensor<f32, 4>` and `Tensor<f32, 8>` are good mental models for inline SIMD, while larger static tensors should be thought of as shaped arrays that may still be optimized later.

Example:

```vex
let a: Tensor<f32, 4> = [1.0, 2.0, 3.0, 4.0]
let b: Tensor<f32, 4> = [4.0, 3.0, 2.0, 1.0]
let c = a + b
```

## Dynamic `Tensor<T>`

Dynamic tensors lower to an owning `%VexDynTensor { ptr, i64 }` layout.

The important property is ownership: the data buffer is heap-managed and participates in drop logic. That is why the compiler explicitly guards against creating a fake dynamic tensor by merely aliasing a stack vector as `{ ptr, i64 }`.

This also means that conversions into `Tensor<T>` are not all equivalent in cost or semantics.

### Practical consequences

- `Tensor<T>` is an owning runtime value, not just a borrowed view
- `Span<T> -> Tensor<T>` is a copy into owned tensor storage
- static vector values are not documented as a zero-cost reinterpretation into `Tensor<T>`

Concrete tensor code is the safest thing to document today:

```vex
graph fn relu(x: Tensor<f32>): Tensor<f32> {
    return x.select(x, 0.0)
}
```

## `Mask<N>` and `Mask`

Masks represent boolean results from comparisons and masking operations.

Static masks use vector-friendly layouts during comparison codegen, while dynamic masks use a `%VexDynMask { ptr, i64 }` fat-pointer layout.

Examples of the mask surface that is grounded in current lowering and backend code include:

- `any()`
- `all()`
- `countBits()` or `popcount()`
- `firstSet()`
- `select(true_value, false_value)`

Example:

```vex
let mask = data > 0
if mask.any() {
    let first = mask.firstSet()
    $println(first)
}
```

## Where static tensors stop being "just SIMD"

The old simplified story was "tensor equals register vector". That is too broad.

The more accurate model is:

- small static tensors can map directly to vector IR
- larger static tensors are shaped arrays
- dynamic tensors are owning fat-pointer values
- backend routing depends on shape, operation family, and the selected pipeline

## Current limitations worth knowing

These constraints are real and should be assumed until the compiler surface is broadened further:

- generic arithmetic over `Tensor<T>` is not a safe thing to document as generally available
- not every `Span<T>` to `Tensor<T>` boundary behaves like a trivial view conversion
- tensor routing is strongest in concrete, graph-oriented code such as `Tensor<f32>` workloads

## When to use what

Use `Tensor<T, N>` when:

- the size is fixed at compile time
- you want shaped numeric data
- the hot path benefits from static lowering

Use `Tensor<T>` when:

- the shape is runtime-sized
- the code is naturally graph or ML oriented
- ownership of the tensor buffer is acceptable

Use `Mask<N>` or `Mask` when:

- you are working with comparison results
- you need selection, filtering, or bit-count style mask queries

## See also

- [SIMD and Auto-Vectorization](./index)
- [SIR Optimization Pipeline](./sir-pipeline)
- [GPU Programming](/guide/gpu)
