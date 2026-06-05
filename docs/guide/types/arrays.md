# Arrays

Arrays in Vex are fixed-size, statically-typed collections. Their size is known at compile time and is part of the type signature: `[T; N]` where `T` is the element type and `N` is the element count.

## Declaration and Initialization

```vex
// Explicit type + literal
let arr: [i32; 4] = [1, 2, 3, 4]

// Inferred type
let names = ["Alice", "Bob", "Charlie"]

// Repeated value: creates [0, 0, 0, 0, 0]
let zeros: [i32; 5] = [0; 5]

// Using array literal with type suffix on first element
let floats = [1.0f32, 2.0, 3.0]
```

## Type Signature

The array type `[T; N]` carries the element type AND the length:

```vex
fn sum4(values: [i32; 4]): i32 {
    let! total = 0
    for v in values {
        total += v
    }
    return total
}

// Caller passes exactly 4 elements
let result = sum4([10, 20, 30, 40])
```

## Element Access

```vex
let arr = [10, 20, 30, 40]

// Index access (zero-based)
let first = arr[0]    // 10
let last = arr[3]     // 40

// Mutable access requires let!
let! mut_arr = [1, 2, 3]
mut_arr[1] = 99
```

## Array Operations

### Length

```vex
let arr = [5, 10, 15]
let len = arr.len()     // 3 (compile-time known)
```

### Iteration

```vex
let values = [100, 200, 300]

// By value (Copy types only)
for v in values {
    $println(v)
}

// Collection functions work naturally
let doubled = values.map(fn(x) => x * 2)

// Reduction
let sum = <+ values     // 600
```

### Slicing and Span Conversion

Arrays automatically coerce to `Span<T>` for functions that accept borrowed views:

```vex
fn printSpan(s: Span<i32>) { ... }

let arr = [1, 2, 3, 4, 5]
printSpan(arr)  // automatically coerces to Span<i32>
```

## Array to Tensor Auto-Promotion

When you perform arithmetic on arrays, Vex automatically promotes them to `Tensor<T, N>` for SIMD vectorization. This is one of Vex's killer features -- no manual SIMD intrinsics required.

```vex
let a = [1.0, 2.0, 3.0, 4.0]
let b = [5.0, 6.0, 7.0, 8.0]

// Element-wise addition compiles to a single SIMD instruction
let c = a + b              // Tensor<f64, 4> = [6.0, 8.0, 10.0, 12.0]

// Scalar broadcast: scalar is splatted across all lanes
let d = a + 10.0           // [11.0, 12.0, 13.0, 14.0]

// Comparison produces Mask<N>
let eq = a == b             // Mask<4> = [false, false, false, false]
```

### Inline SIMD Threshold

Arrays of 64 bytes or fewer (e.g., up to 8 `f64` or 16 `f32`) fit in SIMD registers and compile to **single vector instructions**. Larger arrays use **loop-based vectorization** with SIMD chunks.

```vex
// Fits in register (32 bytes) -> single vaddps
let small = [1.0f32, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]

// Exceeds 64 bytes -> loop vectorization with 256-bit chunks
let big: [f32; 64] = [0.0; 64]
```

## Multidimensional Arrays

Vex supports nested arrays for multidimensional data:

```vex
// 3x3 matrix as array of arrays
let matrix: [[i32; 3]; 3] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

let center = matrix[1][1]  // 5
```

## Pattern Matching on Arrays

Arrays support destructuring in `match` and `let` patterns:

```vex
let triple = [10, 20, 30]

// Destructure in match
match triple {
    [a, b, c] => a + b + c,
    _ => 0,
}

// Destructure in let
let [first, second, third] = triple

// Rest patterns for partial binding
let [head, ..rest] = triple
// head = 10, rest is Span<i32> with [20, 30]

let [first, .., last] = triple
// first = 10, last = 30
```

## Copy vs Non-Copy Element Types

Arrays of `Copy` types (primitives, small structs marked `Copy`) are themselves `Copy`:

```vex
let a = [1, 2, 3]     // [i32; 3] is Copy
let b = a              // bitwise copy, a is still usable
```

Arrays of non-`Copy` types are moved on assignment:

```vex
let a = [Box.new(1), Box.new(2)]  // [Box<i32>; 2] is NOT Copy
let b = a                          // move, a is no longer usable
```

## Best Practices

1. Use arrays for small, fixed-size data where the length is known at compile time.
2. Prefer `Vec<T>` for dynamically-sized collections that grow at runtime.
3. Use `Span<T>` as function parameter types to accept both arrays and Vec slices.
4. Let Vex auto-promote arrays to tensors for SIMD math -- never write manual SIMD intrinsics for array operations.
5. Use `[value; N]` syntax to initialize arrays with a repeated default value.

## Related Pages

- [Tuples](/guide/types/tuples) -- heterogeneous fixed-size grouping
- [Vec](/guide/types/vec) -- dynamic array with auto-growth
- [SIMD Operations](/guide/simd/simd-operations) -- array auto-vectorization
- [Pattern Matching](/guide/types/pattern-matching) -- destructuring arrays
