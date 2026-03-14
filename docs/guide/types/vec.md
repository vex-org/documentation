# Vec\<T\> — Dynamic Arrays

`Vec<T>` is the standard growable contiguous collection.

## Creating Vectors

```vex
let! nums = Vec.new<i32>()
let! names = Vec<string>()
let! reserved = Vec.withCapacity<f64>(100)
```

## Modification

| Method | Current Surface |
|--------|-----------------|
| `push(value)` | append element |
| `pop()` | `Option<T>` |
| `insert(index, value)` | `bool` success flag |
| `remove(index)` | `Option<T>` |
| `clear()` | remove all elements |
| `set(index, value)` | replace old value |
| `trySet(index, value)` | `bool` |

## Element Access

| Method | Current Surface |
|--------|-----------------|
| `get(index)` | `Option<&T>` |
| `getUnchecked(index)` | `&T` |
| `getRef(index)` | `&T` |
| `tryGet(index)` | `Option<&T>` |
| `copyAt(index)` | `T` |
| `tryCopyAt(index)` | `Option<T>` |
| `getOr(index, fallback)` | `T` |

`usize` and `u64` index overloads are both present on the current surface for several accessors.

## Basic Example

```vex
let! nums = Vec.new<i32>()
nums.push(10)
nums.push(20)

match nums.get(0) {
    Some(v) => $println(v),
    None => $println("empty")
}
```

## Notes

- This page documents the currently tested prelude surface, not an idealized container API.
- For zero-copy views over contiguous data, see [Span\<T\>](../memory/span-t).
