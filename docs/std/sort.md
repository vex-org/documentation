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
O(n log n), and stack use is O(log n). Structurally Copy four-byte integers can
select a pure-Vex high-byte scratch schedule at comptime: a bounded sample
rejects narrow distributions, a fixed local image groups wide keys, and
2-through-8-value buckets use fixed comparator networks. The choice depends on
integer width/copyability/signedness facts, never an `i32`/`u32` spelling.
Generic and owning values retain the allocation-free introsort path. Equal
elements are not guaranteed to keep their original order.

## Stable sorting

```vex
import { stableSort } from "sort";

let! events = loadEvents();
stableSort(&events);
```

`stableSort` keeps equal elements in their original relative order and does not
require `Clone`. Four-byte Copy integers use a stable four-pass LSD radix path
from 256 elements upward; signed order is normalized by representation facts,
not an `i32` name check. Other Copy values use a direct contiguous merge
buffer. Owning values stable-sort indices and then apply the permutation with
ownership-safe `Vec.swap` operations. Every choice is structural at comptime.
Auxiliary storage is O(n), and an already sorted vector returns before
allocating workspace.

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

## Custom order and key projection

Custom ordering is a concrete policy, not a boxed closure or function pointer.
The compiler monomorphizes the policy into sorting and search loops.

```vex
import { SortKey, sortByKey, stableSortByKey } from "sort";

struct ByScore: SortKey<Player, i32> {}

inline fn (self: &ByScore) key(value: &Player): i32 {
    return value.score;
}

sortByKey<Player, i32, ByScore>(&players, ByScore {});
stableSortByKey<Player, i32, ByScore>(&players, ByScore {});
```

Use `SortOrder<T>` when comparison needs state, descending order, borrowed
compound fields or rules that cannot be represented by a Copy key. The same
policy works with `sortBy`, `stableSortBy`, `selectNthBy`, `partialSortBy`,
`isSortedBy`, `binarySearchBy`, `lowerBoundBy`, `upperBoundBy` and
`equalRangeBy`. The `*ByKey` family supplies the equivalent projected-key API.

## Selection and partial sorting

`selectNth` rearranges a vector so the requested index contains the value that
would appear there in a full sort. `partialSort(values, count)` orders only the
smallest `count` values. Invalid indices/counts fail without mutating input.
Selection uses introspective quickselect with a deterministic median-of-medians
fallback; partial sorting uses a sparse top-K heap and then orders the prefix.

```vex
import { partialSort, selectNth } from "sort";

let median = selectNth(&values, values.len() / 2 as usize);
let ok = partialSort(&values, 10 as usize); // values[0..10] is sorted
```

## Total floating-point order

Generic float comparison is not silently redefined. When deterministic order
must include signed zero, infinities and NaN payloads, use `TotalF32Order`,
`TotalF64Order`, `sortF32Total` or `sortF64Total`.

```vex
import { sortF64Total } from "sort";

sortF64Total(&values);
```

The order key uses zero-cost `Math.toBits`: LLVM receives an SSA bitcast and
integer bit operations, with no temporary memory or FFI call.

## Utilities

The package also exports `linearSearch`, `isSorted`, `isSortedDesc`, `unique`,
`minElement`, and `maxElement`. Prefer `minElementRef` and `maxElementRef` in
allocation-sensitive code; their owned counterparts require `Clone` and clone
only the selected result. `unique` removes consecutive duplicates, so sort the
vector first when duplicates are not already adjacent.

Natural ordered operations require a lawful total `Ord` implementation. A
custom `SortOrder` must remain irreflexive and transitive for the duration of
the call.
