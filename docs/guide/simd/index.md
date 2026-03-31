# SIMD and Auto-Vectorization

Vex has two related, but different, SIMD stories:

- small fixed-size arrays can be lowered directly to LLVM vector instructions
- tensor and graph workloads can flow through SIR, which has its own SIMD backend

The important constraint is that SIMD is not a blanket guarantee for every array expression. Some patterns inline cleanly, some lower to loop kernels, and some belong on the `graph fn` and `Tensor<T>` path instead.

See also:

- [Tensor and Mask Types](./tensor-mask)
- [SIR Optimization Pipeline](./sir-pipeline)

## The practical model

Use ordinary arrays when you want straightforward element-wise code:

```vex
fn add4(a: [i32; 4], b: [i32; 4]): [i32; 4] {
    return a + b
}

fn dot8(a: [f32; 8], b: [f32; 8]): f32 {
    return \+ (a * b)
}
```

For small static arrays, the compiler can lower these operations to direct vector IR. The current inline threshold in the SIMD backend is 64 bytes with a power-of-two element count.

When data is dynamic, graph-shaped, or needs tensor-specific routing, use the `graph fn` and `Tensor<T>` path instead:

```vex
graph fn normalize(x: Tensor<f32>): Tensor<f32> {
    let mag = Math.sqrt(x * x)
    return x / mag
}
```

## What is solid today

The currently well-grounded pieces are:

- inline SIMD for small static arrays in compiler codegen
- vector comparisons and reductions for qualifying fixed-size arrays
- SIR SIMD backends for tensor and graph workloads
- mask operations in SIR such as `any`, `all`, `countBits`, `firstSet`, and `select`

## What should be read conservatively

Treat these areas as advanced or still moving:

- generic tensor arithmetic like `Tensor<T> * Tensor<T>` across arbitrary `T`
- automatic coercion stories between `Span<T>` and `Tensor<T>` at every call boundary
- assuming every dynamic array expression will become a single SIMD instruction
- assuming every matrix or signal-processing operator is equally mature on every backend

## Small-array path

For fixed-size arrays, these patterns are the safest ones to expect the compiler to optimize well:

- element-wise arithmetic such as `+`, `-`, `*`, `/`
- comparisons such as `==`, `!=`, `<`, `>`
- reductions such as `\+`, `\*`, `\<`, `\>`

Example:

```vex
fn energy4(x: [f32; 4]): f32 {
    return \+ (x * x)
}
```

This is the part of the SIMD story backed by `crates/vex-compiler/src/codegen_hir/expr/simd_small`.

## Tensor and graph path

When code is naturally tensor-oriented, prefer `graph fn` plus concrete tensor types such as `Tensor<f32>`.

That path lowers through SIR and then routes to CPU SIMD, GPU, or other backends based on shape and backend support. It is more powerful than the small-array fast path, but it is also where current limitations show up first.

## Choosing the right abstraction

Use fixed arrays when:

- the shape is small and known at compile time
- the code is mostly arithmetic, comparison, or reduction
- you want predictable LLVM-level vectorization

Use `Tensor<T>` and `graph fn` when:

- the data shape is dynamic
- the computation is already graph-like
- you want SIR routing and backend dispatch

## Verification

When SIMD behavior matters, inspect the generated LLVM or backend output instead of assuming fusion happened:

```bash
vex compile --emit-llvm file.vx
```

Good signs for the small-array path are direct vector operations and vector reductions. For graph and tensor code, the more relevant check is whether the code lowered into the expected SIR/backend route.

// ❌ Avoid: Manual loops when operators work
fn sum_bad(data: [f64]): f64 {
let! total = 0.0
for x in data {
total = total + x // Unnecessary!
}
return total
}

```

## SIMD Operator Reference

| Operator | Description | Example |
|----------|-------------|---------|
| `\+` | Sum reduction | `\+ [1,2,3]` → `6` |
| `\*` | Product reduction | `\* [1,2,3]` → `6` |
| `\<` | Min reduction | `\< [3,1,2]` → `1` |
| `\>` | Max reduction | `\> [3,1,2]` → `3` |
| `\&` | AND reduction | `\& [t,t,f]` → `false` |
| `\|` | OR reduction | `\| [t,f,f]` → `true` |
| `<?` | Element-wise min | `[1,5] <? [3,2]` → `[1,2]` |
| `>?` | Element-wise max | `[1,5] >? [3,2]` → `[3,5]` |
| `><` | Clamp | `[1,5] >< (2,4)` → `[2,4]` |
| `+\|` | Saturating add | `250u8 +\| 10u8` → `255` |
| `-\|` | Saturating sub | `5u8 -\| 10u8` → `0` |
| `<<<` | Rotate left | `x <<< 1` |
| `>>>` | Rotate right | `x >>> 1` |
| `<*>` | Matrix multiply | `a <*> b` |
| `'` | Transpose | `matrix'` |

## Next Steps

- [GPU Programming](/guide/gpu) - Massively parallel compute
- [FFI](/guide/ffi) - Integrating with native libraries
- [Memory Management](/guide/memory/ownership) - Efficient data handling
```
