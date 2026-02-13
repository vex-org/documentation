# Vec\<T\> — Dynamic Arrays

`Vec<T>` is Vex's standard growable array type. It provides efficient, contiguous storage for elements of the same type and handles memory management (allocation, resizing, deallocation) automatically.

::: tip Prelude Type
`Vec<T>` is a **prelude type** — available in all Vex programs without any `import`.
:::

## Overview

A `Vec` is the go-to collection for ordered data. It is fast for element access and appending, and integrates seamlessly with Vex's iteration system.

```vex
fn main() {
    // Create an empty vector
    let! nums = Vec.new<i32>();
    
    // Add elements
    nums.push(10);
    nums.push(20);
    nums.push(30);
    
    // Efficient element access
    let first = nums[0];    // 10
    
    // Iterate
    for n in nums {
        $println(n);
    }
}
```

## Creating Vectors

### Default Constructor
Creates an empty vector with zero initial capacity.

```vex
let! v = Vec.new<string>();
```

### With Capacity
Pre-allocates memory for a specific number of elements. Recommended when the approximate size is known, as it avoids frequent reallocations.

```vex
let! v = Vec.withCapacity<f64>(100);
```

## Modification

| Method | Description |
|--------|-------------|
| `push(value: T)` | Appends an element to the end. Increases capacity if needed. |
| `pop(): Option<T>` | Removes and returns the last element, or `None` if empty. |
| `insert(index: usize, value: T)` | Inserts an element at a specific index, shifting subsequent elements. |
| `remove(index: usize): T` | Removes and returns the element at the index, shifting subsequent elements. |
| `removeAt(index: usize)` | Alias for `remove` without returning the value. |
| `clear()` | Removes all elements from the vector. |

## Element Access

### Index Operator
Direct access to elements. Usage: `vec[index]`.

```vex
let x = v[0];     // Read
v[1] = 42;        // Write
```

### Bounds-Checked Access
Returns `Option<T>` instead of panicking on out-of-bounds access.

| Method | Description |
|--------|-------------|
| `get(index: usize): Option<T>` | Returns the value at the index. |
| `getRef(index: usize): Option<&T>` | Returns a reference to the element. |
| `getRefMut(index: usize): Option<&T!>` | Returns a mutable reference to the element. |

## Capacity Management

`Vec` automatically doubles its capacity when full. You can manually inspect or adjust its capacity:

| Method | Description |
|--------|-------------|
| `len(): usize` | Returns the number of elements in the vector. |
| `capacity(): usize` | Returns the number of elements the vector can hold without reallocating. |
| `isEmpty(): bool` | Returns `true` if the vector contains no elements. |
| `reserve(additional: usize)` | Ensures capacity for at least `additional` more elements. |

## Bulk Operations

| Method | Description |
|--------|-------------|
| `clone(): Vec<T>` | Creates a deep copy of the vector. |
| `extend(other: &Vec<T>)` | Appends all elements from another vector. |
| `truncate(len: usize)` | Shortens the vector to the specified length. |
| `retainWhere(predicate: fn(T): bool)` | Keeps only elements that satisfy the predicate. |

## Slicing

Vectors can be sliced to create a `Span<T>` view:

```vex
let s = v[1..3];   // Returns a Span<T> viewing elements 1 and 2
```

## Performance

-   **Access**: O(1) random access.
-   **Append**: O(1) amortized.
-   **Insert/Remove**: O(n) as elements must be shifted.
-   **Memory**: Contiguous on the heap, cache-friendly.

## See Also

-   [Span\<T\>](../memory/span-t) — Non-owning views over contiguous memory
-   [Map\<K, V\>](./map-set) — Hash map collection
-   [Ownership](../memory/ownership) — How collections manage their data
