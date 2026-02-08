# Arrays & Slices

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/13_arrays.vx`

## Overview

Vex supports fixed-size arrays (on stack) and dynamic views called Slices.

## Fixed-Size Arrays

Arrays have a statically known length. Their size is part of their type `[T; N]`.

### literals

```vex
let nums = [1, 2, 3, 4, 5]; // Inferred as [i32; 5]
let zeros = [0; 10];        // Repeat syntax: 10 zeros
```

### Accessing Elements
Zero-based indexing. Bounds checked at runtime (panics if out of bounds).

```vex
let first = nums[0];
let last = nums[4];

// nums[10] // Panic: index out of bounds
```

### Mutability
To modify an array, it must be declared mutable.

```vex
let! buffer = [0; 64];
buffer[0] = 255;
```

## Slices

A **Slice** is a view into an array or vector. It consists of a pointer and a length. It does not own the data.

**Type:** `[T]` (usually seen as reference `&[T]`)

```vex
let arr = [10, 20, 30, 40, 50];
let view = arr[1..4]; // Slice containing [20, 30, 40]

(view[0]); // 20
(view.()); // 3
```

## Dynamic Arrays (`Vec<T>`)

For growable lists, use the Standard Library's `Vec<T>`.

```vex
let! list = Vec.new<i32>();
list.(10);
list.(20);
```

> [!NOTE]
> Array literals `[1, 2]` create fixed-size arrays by default. To create a Vec, usually `Vec.new()` or conversion is used.

## Implementation Details

### AST
`vex-ast/src/expressions.rs`:
```rust
Expression::Array(Vec<Expression>)          // [a, b, c]
Expression::ArrayRepeat(value, count)       // [v; n]
Expression::Index { object, index }         // a[i]
```

### Memory
- **Array:** Contiguous block on stack (or heap if very large/global).
- **Slice:** Two words (ptr, len).
