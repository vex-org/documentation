# sort — Sorting & Searching

Hybrid sorting with Introsort (Quicksort + Heapsort + Insertion Sort) and binary search.

## Sorting

```rust
import { sort, sortDesc } from "sort";

let! arr = [5, 3, 8, 1, 9, 2];
sort(&arr);         // [1, 2, 3, 5, 8, 9]
sortDesc(&arr);     // [9, 8, 5, 3, 2, 1]
```

## Binary Search

```rust
import { binarySearch } from "sort";

let arr = [1, 3, 5, 7, 9, 11];
let idx = binarySearch(&arr, 7);    // → Some(3)
let idx = binarySearch(&arr, 4);    // → None
```

## Algorithm Details

The default sort uses **Introsort**:
1. Start with Quicksort (fast average case)
2. Fall back to Heapsort if recursion depth exceeds `2 × log₂(n)` (guarantees O(n log n) worst case)
3. Switch to Insertion Sort for small subarrays (n ≤ 16)

| File | Purpose |
|------|---------|
| `introsort.vx` | Main Introsort implementation |
| `search.vx` | Binary search |
| `util.vx` | Swap, comparison helpers |
