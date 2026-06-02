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

- If the total size is at most 64 bytes (e.g. `Tensor<f32, 16>`), they map directly to LLVM vector values (`<16 x float>`) in CPU registers.
- If the total size is larger than 64 bytes, they remain as contiguous memory arrays but can still be vectorized via loop optimization metadata.

So `Tensor<f32, 4>` and `Tensor<f32, 8>` are good mental models for inline SIMD, while larger static tensors should be thought of as shaped arrays.

Example:

```vex
let a: Tensor<f32, 4> = [1.0, 2.0, 3.0, 4.0]
let b: Tensor<f32, 4> = [4.0, 3.0, 2.0, 1.0]
let c = a + b
```

---

## Dynamic `Tensor<T>`

Dynamic tensors lower to an owning `%VexDynTensor { ptr, i64 }` layout.

The data buffer is heap-managed via the VUMI/VUMM allocator and participates in drop logic. Conversions into `Tensor<T>` from `Span<T>` involve an owned copy.

Example:

```vex
graph fn relu(x: Tensor<f32>): Tensor<f32> {
    return x.select(x, 0.0)
}
```

---

## Tensor & DynTensor API Reference

Both static and dynamic tensors support the following methods and static builders resolved directly by the compiler:

### Static Builders
* **`Tensor.arange<T>(start: T, end: T, step: T) -> Tensor<T>`**
  Generates a linear sequence of values starting at `start` up to (but not including) `end` with step size `step`.
* **`Tensor.linspace<T>(start: T, end: T, count: usize) -> Tensor<T>`**
  Generates `count` evenly spaced values over the specified interval `[start, end]`.
* **`Tensor.fill<T>(val: T, shape: Vec<i32>) -> Tensor<T>`**
  Generates a new tensor with the specified `shape` where all elements are initialized to `val`.
* **`Tensor.zeros<T>(shape: Vec<i32>) -> Tensor<T>`**
  Generates a tensor filled with zeros (`0` or `0.0`).
* **`Tensor.ones<T>(shape: Vec<i32>) -> Tensor<T>`**
  Generates a tensor filled with ones (`1` or `1.0`).

### Instance Methods
* **`len() -> usize`**
  Returns the total number of elements in the tensor.
* **`is_empty() -> bool`**
  Returns `true` if the tensor contains no elements.
* **`get(index: usize) -> T`**
  Returns the element at the specified index.
* **`clone() -> Self`**
  Performs a deep copy of the tensor's metadata and backing data buffer.
* **`ptr() -> *const ()`**
  Returns a raw pointer to the underlying contiguous data buffer.
* **`copyTo(offset: usize, src: &Tensor<T>) -> Self`**
  Copies elements from the `src` tensor into `self` starting at the target element `offset`. Returns `self` for chaining.
* **`gather(indices: Tensor<i64>) -> Tensor<T>`**
  Indexed read that collects elements from the source tensor according to the specified index tensor.
* **`scatter(indices: Tensor<i64>, values: Tensor<T>) -> Tensor<T>`**
  Indexed write that updates the tensor at the specified indices with the corresponding values.
* **`scatter_add / scatter_max / scatter_min / scatter_mul`**
  Atomic/combining scatter operations that resolve conflicts by adding, taking the min/max, or multiplying values at duplicate indices.
* **`sort() -> Self` / `sortDesc() -> Self`**
  Sorts the tensor in ascending or descending order.
* **`reverse() -> Self`**
  Reverses the order of elements along the primary dimension.
* **`cumsum() -> Self` / `prefixSum() -> Self`**
  Computes the cumulative sum (parallel prefix scan) of elements.
* **`cumprod() -> Self`**
  Computes the cumulative product of elements.
* **`argsort() -> Tensor<i64>`**
  Computes the indices that would sort the tensor, returning a tensor of index integers.
* **`argmin() -> i64` / `argmax() -> i64`**
  Returns the flat index of the minimum or maximum value in the tensor.

---

## `Mask<N>` and `Mask`

Masks represent boolean results from comparisons and masking operations.

`Mask<N>` maps directly to hardware mask registers (e.g. AVX-512 K-registers), while the dynamic `Mask` maps to a `%VexDynMask { ptr, i64 }` fat-pointer layout.

### Mask API Reference
* **`select<T>(true_val: Tensor<T>, false_val: Tensor<T>) -> Tensor<T>`**
  Returns a new tensor with elements chosen from `true_val` where the mask is `true`, and `false_val` where the mask is `false`.
* **`toBitmask() -> i64`**
  Packs the boolean lanes of the mask into the bits of a 64-bit integer.
* **`toBitmaskAt(offset: usize) -> i64`**
  Packs boolean lanes starting at the specified element `offset` into a 64-bit integer.
* **`firstSet() -> i32`**
  Returns the index of the first `true` lane in the mask. Returns `-1` if all lanes are `false`.
* **`countBits() -> i32`**
  Returns the total number of `true` lanes (population count).
* **`any() -> bool`**
  Returns `true` if at least one lane in the mask is `true`.
* **`all() -> bool`**
  Returns `true` if all lanes in the mask are `true`.
* **`clearBit(index: usize) -> i32`**
  Clears the mask bit at `index` and returns the updated bitmask integer.

Example:

```vex
let mask = data > 0.0
if mask.any() {
    let first = mask.firstSet()
    $println("First positive value index: {}", first)
}
```

---

## Hardware Lowering Summary

The compiler routes target workloads based on shapes and constraints:

- Small static tensors/masks are lowered directly to hardware vector registers and operations.
- Dynamic tensors/masks use standard library runtime calls and GPU/Metal dispatch kernels for bulk parallel operations.

## See also

- [SIMD and Auto-Vectorization](./index)
- [SIR Optimization Pipeline](./sir-pipeline)
- [GPU Programming](/guide/gpu)

