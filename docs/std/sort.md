# sort — Sorting and searching

The `sort` package provides ownership-safe in-place sorting, stable sorting,
ordered searches, and sequence utilities. Generic ordering uses the `Ord`
contract; there is no type-name dispatch or hidden C runtime dependency.

## Unstable sorting

```vex
import { sort, sortDesc } from "sort";

let! values = [5, 3, 8, 1, 9, 2];
sort(&values);      // [1, 2, 3, 5, 8, 9]
sortDesc(&values);  // [9, 8, 5, 3, 2, 1]
```

`sort` and `sortDesc` are hybrid introsorts. They combine ordered-input fast
paths, insertion sort for tiny ranges, median-of-three partitioning, a
duplicate-aware three-way path, and a heapsort fallback. Worst-case time is
O(n log n), stack use is O(log n), and no element workspace is allocated.
Equal elements are not guaranteed to keep their original order.

## Stable sorting

```vex
import { stableSort } from "sort";

let! events = loadEvents();
stableSort(&events);
```

`stableSort` keeps equal elements in their original relative order and does not
require `Clone`. Copy values use a direct contiguous merge buffer; owning values
stable-sort indices and then apply the permutation with ownership-safe
`Vec.swap` operations. The choice is structural at comptime, not based on a
type name. Time is O(n log n), auxiliary storage is O(n), and an already sorted
vector returns before allocating workspace.

## Ordered search

```vex
import { binarySearch, lowerBound, upperBound } from "sort";

let values = [1, 3, 3, 5, 7, 9];
let found = binarySearch(&values, 5); // 3
let missing = binarySearch(&values, 4); // -1
let firstThree = lowerBound(&values, 3); // 1
let afterThree = upperBound(&values, 3); // 3
```

`binarySearch` returns an `i64` index or `-1` when absent. `lowerBound` and
`upperBound` return insertion positions in `0..=values.len()`. Use the
`binarySearchRef`, `lowerBoundRef`, `upperBoundRef`, and `linearSearchRef`
variants when the target is an owning value that should only be borrowed.

## Utilities

The package also exports `linearSearch`, `isSorted`, `isSortedDesc`, `unique`,
`minElement`, and `maxElement`. Prefer `minElementRef` and `maxElementRef` in
allocation-sensitive code; their owned counterparts require `Clone` and clone
only the selected result. `unique` removes consecutive duplicates, so sort the
vector first when duplicates are not already adjacent.

All ordered operations require a lawful total `Ord` implementation. A custom
ordering must remain transitive and consistent for the duration of the call.
