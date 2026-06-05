# Dynamic Tensors and Masks

While `Tensor<T, N>` and `Mask<N>` have compile-time-known sizes, `Tensor<T>` (DynTensor) and `Mask` (DynMask) handle runtime-sized data. They are heap-backed fat pointers suitable for large, variable-length computations.

## DynTensor\<T\>

`Tensor<T>` is a fat pointer: `{ ptr: *T, len: i64 }`. Use it when the tensor size is not known until runtime.

### Construction

```vex
// From a Vec
let! data = Vec.new<f64>()
data.push(1.0)
data.push(2.0)
data.push(3.0)
let tensor: Tensor<f64> = Tensor.from(data)

// From a fixed-size array (auto-coerces)
let arr = [1.0, 2.0, 3.0, 4.0]
let dyn: Tensor<f64> = arr.asTensor()

// Zero-initialized
let zeros: Tensor<f64> = Tensor.zeros(1024)

// Filled with constant
let ones: Tensor<f64> = Tensor.filled(1.0, 512)
```

### Access and Manipulation

```vex
let t: Tensor<f64> = getData()

let size = t.len()           // number of elements
let first = t[0]             // element access
let slice = t.slice(10, 20) // sub-tensor [10..20)

// Element-wise operations
let doubled = t * 2.0
let squared = t * t

// Reductions
let sum = <+ t               // sum all elements
let mean = sum / (t.len() as f64)
```

### Reshape

```vex
let flat: Tensor<f64> = Tensor.zeros(24)
let matrix: Tensor<f64> = flat.reshape([4, 6])  // 4x6 matrix
let cube: Tensor<f64> = flat.reshape([2, 3, 4])  // 2x3x4 cube
```

## DynMask

`Mask` is a fat pointer for runtime-sized boolean masks: `{ ptr: *i8, len: i64 }`.

### Construction

```vex
let data: Tensor<f64> = getTensor()

// Create mask from comparison
let positive: Mask = data > 0.0
let in_range: Mask = (data > 0.0) & (data < 100.0)

// Manual mask creation
let bits = [true, false, true, false]
let mask = Mask.from(bits)
```

### Mask Operations

```vex
let m1: Mask = condition1()
let m2: Mask = condition2()

let combined = m1 & m2       // element-wise AND
let either = m1 | m2         // element-wise OR
let negated = !m1            // element-wise NOT

// Query
let any_true = m1.any()     // any element true?
let all_true = m1.all()     // all elements true?
let count = m1.countTrue() // number of true elements
```

### Selective Operations with Masks

```vex
let values: Tensor<f64> = getValues()
let mask: Mask = values > 0.0

// Apply operation only where mask is true
let positive_only = values.masked(mask)     // zeros where mask is false
let clamped = values.maskedFill(mask, 0.0) // fill with 0 where mask is false

// Conditional computation
let result = values.maskedMap(mask, |v|  v.sqrt())
// sqrt only computed where mask is true, 0.0 elsewhere
```

## Tensor / DynTensor Interaction

Fixed-size tensors coerce to DynTensor when needed:

```vex
fn processTensor(t: Tensor<f64>): f64 {
    return <+ t
}

let small: Tensor<f64, 4> = [1.0, 2.0, 3.0, 4.0]
let result = processTensor(small)  // auto-coerce Tensor<f64,4> to Tensor<f64>
```

## GPU Integration

DynTensor and DynMask are the primary data types for GPU computation via SIR:

```vex
let input: Tensor<f32> = loadData()
let weights: Tensor<f32> = loadWeights()

// This can be lowered to GPU via SIR
let output = input <*> weights

// Explicit GPU dispatch
graph fn matmulKernel(input: Tensor<f32>, weights: Tensor<f32>): Tensor<f32> {
    // Runs on GPU via Metal/CUDA/SPIR-V
    return input <*> weights
}
```

## Memory Layout

| Type                    | Layout                       | Size           |
| ----------------------- | ---------------------------- | -------------- |
| `Tensor<T, N>` (<= 64B) | Register: `<N x T>` in LLVM  | Register-sized |
| `Tensor<T, N>` (> 64B)  | Stack: `[N x T]`             | N \* sizeof(T) |
| `DynTensor<T>`          | Heap fat ptr: `{ *T, i64 }`  | 16 bytes       |
| `Mask<N>` (<= 64B)      | Register: `<N x i1>`         | Register-sized |
| `DynMask`               | Heap fat ptr: `{ *i8, i64 }` | 16 bytes       |

## Best Practices

1. Use static `Tensor<T, N>` for small, known-size data (<= 64 bytes) -- gets register-level SIMD.
2. Use `DynTensor<T>` for runtime-sized or large data that exceeds SIMD register width.
3. Use `Mask` for conditional operations on large tensors -- avoids branches in hot loops.
4. Coerce static tensors to dynamic tensors for API flexibility (zero-cost conversion).
5. Prefer `reshape()` over manual index arithmetic when changing tensor dimensions.

## Related Pages

- [SIMD Overview](/guide/simd/) -- introduction to SIMD in Vex
- [Tensor & Mask](/guide/simd/tensor-mask) -- static tensors and masks
- [SIR Pipeline](/guide/simd/sir-pipeline) -- how SIMD lowers through SIR
- [Operators Reference](/guide/advanced/operators-reference) -- SIMD operators catalog
- [GPU Programming](/guide/gpu/) -- graph functions for GPU compute
