# `collections` — supplemental owning containers

Vex provides `Vec`, `Map`, `Set`, `OrderedMap`, and `Deque` in the prelude. The `collections`
package adds higher-level access policies through `Stack`, `PriorityQueue`, and
`LinkedList`. It does not duplicate prelude hash-table or ring-buffer storage.

Every container owns its stored values. Insertion transfers ownership,
removal transfers it back to the caller, and peeking/iteration borrows without
cloning. There is no reference-counting or manual thread-lifetime API.

## Map and Set

Prelude `Map<K,V>` uses 16-byte Swiss-table control groups and Vex's ordinary
fixed-array/`Mask<16>` SIMD lowering. `getKeyValue` borrows the canonical
stored key together with its value; `removeEntry` transfers both owners.

```vex
let! counts = Map.new<string, i32>();
let count = counts.getOrInsertWith("vex".toString(), fn(): i32 {
    return 0;
});
*count = *count + 1;
```

Unlike eager `getOrInsert`, `getOrInsertWith` runs its factory only on a miss
and still performs a single lookup/insertion probe. `Set.get` borrows the
canonical stored representative; `Set.take` removes and returns its owner.

`Map.withCapacity(n)` and `Map.withHasherCapacity(builder, n)` guarantee room
for at least `n` live elements, accounting for the Swiss-table 7/8 load limit.
`capacity`, `reserve`, `retain`, and `shrinkToFit` use element counts and never
clone retained owners. The legacy `withCap`/`cap` pair is the explicit raw
bucket-count compatibility surface. `Set` delegates the same capacity and
retention semantics to its canonical Map storage.

## OrderedMap

Prelude `OrderedMap<K,V>` is the insertion-ordered map. Each canonical key and
value is owned once in a stable node; a private Swiss index maps cached full
hashes to collision-correct node chains, and reciprocal links maintain order.
Equal-key updates replace only the value, preserving the first key and its
position. Insertion, update, lookup, removal and reordering require no `Clone`.

`iter`, `keys`, and `values` borrow in current order. `first`/`last` borrow end
pairs, while `popFront`/`popBack` transfer owners. `moveToFront` and
`moveToBack` relink after average O(1) lookup. `removeValue` transfers the
value, `removeEntry` transfers both canonical owners, and `remove` is the
boolean dropping form.

`reserve`, `retain`, and `shrinkToFit` preserve ownership. Compaction moves
entries once and rebuilds the private index from cached hashes, so user keys
are not cloned or hashed again. `getAtIndex*` traverses from the nearer end in
O(min(i,n-i)); use the O(1)-step iterator for scans. `OrderedMap` is
insertion-ordered, not a sorted/B-tree collection.

## Deque

`Deque<T>` is a tag-free owning circular buffer with amortized O(1) operations
at both ends. It is available without an import.

```vex
let! pending = Deque.withCapacity<Job>(256);
pending.pushBack(job);

match pending.popFront() {
    Some(next) => run(next),
    None => {},
};
```

`pushFront`/`pushBack` and `popFront`/`popBack` transfer ownership. `front`,
`back`, and `get` borrow. `frontMut`, `backMut`, and `getMut` return exclusive
borrows to proven-live positions. `reserve()` grows in advance, `clear()` drops live
values while retaining storage, and `iter()` visits logical front-to-back
order even when the physical buffer wraps. `asSlices()` exposes that order as
at most two borrowed contiguous spans. `shrinkToFit()` reclaims unused heap
capacity; arena storage remains owned by its bulk-reclaimed region.

Only live positions are initialized; there is no `Option<T>` tag per capacity
slot. Wrapped growth transfers at most two contiguous runs with bulk memory
operations and preserves the allocator region captured at construction.

## Stack

`Stack<T>` is the small LIFO surface over the canonical Vex `Vec<T>` storage.
It provides `push`, `pop`, borrowed `peek`, exclusive `peekMut`, `truncate`,
capacity management, `shrinkToFit`, `clear`, and bottom-to-top borrowed
iteration.

## PriorityQueue

Priority queues are max-heaps by default. Use `min()` or `minWithCapacity()`
when the smallest value must be selected first.

```vex
import { PriorityOrder, PriorityQueue } from "collections";

let! ready = PriorityQueue.withCapacity<Task>(1024);
ready.push(task);

match ready.pop() {
    Some(highest) => dispatch(highest),
    None => {},
};
```

`push` and `pop` are O(log n), while `peek` is O(1). Borrowed iteration exposes
heap layout; it is intentionally not sorted.

### Zero-overhead custom ordering

```vex
struct ByScore: PriorityOrder<Task> {}

inline fn (self: &ByScore) higher(left: &Task, right: &Task): bool {
    return left.score > right.score;
}

let! ready = PriorityQueue.withOrderCapacity<Task, ByScore>(ByScore {}, 1024);
```

Ordering is a monomorphized type policy. Empty policies occupy no runtime
storage, and optimized heap maintenance contains no boxed or indirect
comparator call. `fromVecWithOrder` consumes and heapifies a `Vec` in O(n).

### Linear construction and merge

```vex
let! heap = PriorityQueue.fromVec(values);       // max-heap, O(n)
let! timers = PriorityQueue.minFromVec(deadlines); // min-heap, O(n)

heap.append(&other!); // moves owners, empties other, rebuilds once
```

Construction consumes the Vec and reuses its allocation. `append` is O(n+m)
and uses the destination's ordering policy; the source may be a min-heap or a
max-heap because the combined storage is rebuilt bottom-up.

### Bounded top-k operations

```vex
let removed = heap.pushPop(candidate);

match heap.replaceTop(replacement) {
    Some(previous) => consume(previous),
    None => {}, // the empty heap kept replacement
};
```

`pushPop` has the same selected-value result as pushing and immediately
popping, but keeps the heap length fixed. If the candidate would itself be
selected, it is returned after one comparison and the heap is untouched;
otherwise the root is replaced and sifted once. `replaceTop` always replaces
the root without allocating or cloning. `retain(predicate)` evaluates the
predicate once per value and restores heap order in O(n).

`removeAt(index)` removes an arbitrary heap-layout owner and repairs in
O(log n). `tryReplaceAt(index, value)` returns the previous owner on success or
returns `value` in `Err` for an invalid index, so failed mutation never loses
ownership. Repair selects upward or downward traversal from the changed node.

Use `drainPriority()` to move owners out in priority order without auxiliary
storage. `intoPriorityVec()` consumes the queue and reuses its existing `Vec`
allocation for priority-ordered materialization.

## LinkedList

`LinkedList<T>` is a stable-index doubly linked list for workloads that need
O(1) operations at both ends. `pushFront`, `pushBack`, `popFront`, and
`popBack` transfer ownership. Removed node slots are retained and reused;
`peekFrontMut` and `peekBackMut` provide exclusive end borrows. `clear()` drops
all live values without discarding that pool.

Prefer `Vec`, `Deque`, or `PriorityQueue` when contiguous storage expresses the
workload. `LinkedList` is specialized: its extra links and indirect accesses
are not a general replacement for cache-friendly arrays.

## Complexity summary

| Container operation | Time |
|---|---:|
| Deque push/pop at either end | amortized O(1) |
| OrderedMap key lookup/insert/remove/reorder | average O(1) |
| OrderedMap iterator step / indexed compatibility access | O(1) / O(min(i,n-i)) |
| Stack push/pop | amortized O(1) |
| PriorityQueue peek | O(1) |
| PriorityQueue push/pop/replace | O(log n) |
| PriorityQueue fromVec/append/retain rebuild | O(n) or O(n+m) |
| LinkedList operations at either end | O(1) |

## Current native baseline

Apple M2 Max, `-O3`, 2026-08-21; median of three 300 ms rounds. Map and Set use
a fixed deterministic builder and pre-sized tables so the rows are reproducible.

| Transaction | ns/op |
|---|---:|
| Map remove + insert + lookup | 27.31 |
| Map lookup | 8.31 |
| Map remove + insert | 18.57 |
| Map lazy entry hit | 8.95 |
| Map lazy entry miss + remove/reuse | 20.10 |
| Set remove + insert + contains | 25.25 |
| Set contains | 8.29 |
| Deque push-back + pop-front | 2.32 |
| Deque push-front + pop-back | 2.85 |
| Stack push + pop | 4.49 |
| PriorityQueue push + pop | 17.98 |
| PriorityQueue fused reject | 2.09 |
| PriorityQueue fused random top-k | 3.51 |
| LinkedList push-back + pop-front | 9.34 |
| OrderedMap lookup (1,024 entries) | 12.71 |
| OrderedMap remove + reinsert | 68.27 |

OrderedMap traversed 1,024 entries in 2.577 us (5.92 GB/s of key/value
payload) in its 100 ms optimizer-safe smoke gate. Local figures are regression
baselines, not cross-language claims.

Deque hot helpers are bounded and monomorphized inline. No loop-unroll policy,
container-name compiler branch, C FFI, or legacy `.bc` archive is used.
