# `filter` — stable, allocation-aware filtering

The `filter` package selects values from borrowed contiguous data while making
allocation and alias behavior explicit. It provides a fresh-output convenience
API, caller-owned storage reuse, and fixed-block mask compaction. Output order
is stable in every API.

## Predicate filtering

```vex
import { filter, filterInto } from "filter";

fn isReady(value: &Job): bool {
    return value.ready;
}

let ready = filter(jobs.asSpan(), isReady);

let! scratch = Vec.withCapacity<Job>(jobs.len());
let written = filterInto(jobs.asSpan(), &scratch, isReady);
```

`filter` constructs a fresh `Vec<T>`. `filterInto` replaces the logical
contents of the supplied destination and reuses its allocation when capacity
is sufficient. It returns the destination's final length.

The predicate runs exactly once for every source element. A borrowed Copy
value is copied at no ownership cost; an ownership-bearing value requires
`Clone` and every retained value is cloned exactly once. If the source is the
destination's complete live view, `filterInto` uses the in-place `Vec.retain`
path and keeps existing owners. Partial overlap is safely staged before the
destination is mutated.

## Fixed-mask filtering

Use a fixed `Mask<N>` when selection has already been computed as a vector
predicate:

```vex
import { filterByMask, filterByMaskInto } from "filter";

let values: [i32; 8] = [4, -1, 8, 0, 3, -6, 9, 2];
let keep = values > [0, 0, 0, 0, 0, 0, 0, 0];

let positive = filterByMask(values, keep);

let! reusable = Vec.withCapacity<i32>(8);
let count = filterByMaskInto(values, keep, &reusable);
```

The mask is compacted once through the canonical `Mask.compress` operation.
Selected lanes occupy the output prefix in their original order. The returned
count is exact, and the reusable API commits that initialized prefix with one
bulk copy rather than an element-by-element `push` loop.

Fixed-mask filtering accepts numeric Copy lanes. It does not claim SIMD
authority for ownership-bearing structs; use predicate filtering for those
values.

## Allocation and alias guarantees

| Operation | Allocation policy |
|---|---|
| `filter` | one fresh upper-bound result allocation |
| `filterInto`, independent source | no allocation when destination capacity covers the source length |
| `filterInto`, exact self-view | in-place, no allocation |
| `filterInto`, partial overlap | temporary staging to preserve unread values and ownership |
| `filterByMask` | one fixed-capacity result allocation |
| `filterByMaskInto` | no allocation when destination capacity covers `N` |

Reusable destinations retain their allocator or arena binding. Fresh results
capture the active allocation region when they are constructed. Capacity is
reserved before old destination contents are cleared, so an allocation failure
cannot destroy the previous logical value.

## CPU and GPU semantics

`Mask.compress` has one backend-independent meaning: stable selected prefix,
exact `usize` count, and a deterministic zero tail in its fixed-array result.
CPU SIMD and GPU SIMT backends legalize that semantic operation according to
their hardware; the `filter` API does not expose architecture names or a
backend switch.

Dynamic `DynMask` filtering is not part of this package surface yet. Runtime
mask widths require a separate block-processing and alias contract; fixed-mask
APIs do not silently fall back to a scalar compatibility loop. See the
[SIMD/SIMT unified execution contract](../guide/simd/simd-simt-contract.md) for
the cross-backend compaction rules.

## Choosing an API

- Use `Span.filter` for the shortest fresh-output spelling.
- Use `filter` when package-level discoverability is preferable.
- Use `filterInto` in loops, parsers, and services that can reuse a destination.
- Use `filterByMaskInto` when a numeric fixed-block comparison already produced
  a `Mask<N>` and storage reuse matters.

