# Collections API reference

Date: 2026-08-25

The canonical low-level containers `Vec<T>`, `Map<K,V>`, `Set<T>`, `OrderedMap<K,V>`, and
`Deque<T>` are VexArch prelude types. The `collections` package exports
`Stack<T>`, `PriorityQueue<T>`, and `LinkedList<T>`.

## `Map<K,V>` and `Set<T>`

No import is required.

- `Map.get` / `getMut`: borrow a value.
- `Map.getKeyValue`: borrow the canonical stored key and value with one probe.
- `Map.insert`: transfer key and value; replace an existing value in place.
- `Map.remove`: transfer the value and drop the stored key.
- `Map.removeEntry`: transfer both stored owners.
- `Map.getOrInsertWith`: invoke a zero-argument factory only on a miss.
- `Map.withCapacity` / `withHasherCapacity`: guarantee element capacity at the
  7/8 load limit; `capacity`, `reserve`, `retain`, and `shrinkToFit` use element
  counts. Legacy `withCap` / `cap` explicitly use raw bucket counts.
- `Set.get`: borrow the stored representative; `Set.take`: transfer it out.
- `Set.capacity` / `reserve` / `retain` / `shrinkToFit`: delegate to the same
  canonical Map storage.

Map probing uses portable Vex fixed-array/Mask SIMD; there is no C hash-table
shim or container-name-specific compiler lowering.

## `OrderedMap<K,V>`

No import is required.

- `new`, `withCapacity`, `withHasher`, `withHasherCapacity`: owning
  insertion-ordered construction.
- `insert`: return whether the key is new; an update preserves the canonical
  stored key and order position.
- `get`, `getMut`, `getKeyValue`, `contains`: borrowed average O(1) lookup.
- `removeValue`, `removeEntry`, `remove`: value transfer, pair transfer, or
  boolean dropping removal.
- `iter`, `keys`, `values`: allocation-free borrowed current-order traversal.
- `first`, `last`, `popFront`, `popBack`: O(1) order-end access/transfer.
- `moveToFront`, `moveToBack`: average O(1) lookup and constant-time relink.
- `capacity`, `reserve`, `retain`, `clear`, `shrinkToFit`: stable-slot capacity
  and mutation without key cloning; compaction reuses cached hashes.
- `getAtIndex`, `getAtIndexRef`, `getAtIndexMut`: compatibility current-order
  access in O(min(i,n-i)).

The type is insertion-ordered rather than key-sorted. Sorted range maps/sets
remain a separate future B-tree family.

## `Deque<T>`

No import is required.

| API | Semantics |
|---|---|
| `Deque.new<T>()` | Empty owning deque with a small initial capacity. |
| `Deque.withCapacity<T>(n)` | Empty deque; `n == 0` performs no allocation. |
| `pushFront(value)` / `pushBack(value)` | Transfer ownership into either end; amortized O(1). |
| `popFront()` / `popBack()` | Transfer ownership out through `Option<T>`; amortized O(1). |
| `front()` / `back()` | Borrow an end through `Option<&T>`. |
| `get(index)` | Borrow a logical front-relative index. |
| `frontMut()` / `backMut()` / `getMut(index)` | Exclusively borrow a live value. |
| `len()` / `isEmpty()` / `capacity()` | Constant-time state queries. |
| `reserve(minimum)` | Ensure total capacity; preserves order and allocator region. |
| `shrinkToFit()` | Reclaim unused heap capacity; arena allocations remain bulk-owned. |
| `clear()` | Drop every live owner exactly once and retain storage. |
| `iter()` | Borrow front-to-back without allocation. |
| `asSlices()` | Borrow logical contents as one or two contiguous `Span<T>` values. |

## `Stack<T>`

Import `Stack` from `collections`. It exposes `new`, `withCapacity`, `push`,
`pop`, borrowed `peek`, exclusive `peekMut`, `truncate`, `len`, `isEmpty`,
`capacity`, `reserve`, `shrinkToFit`, `clear`, and a borrowed bottom-to-top
`iter` over canonical `Vec<T>` storage.

## `PriorityQueue<T, P = MaxPriority<T>>`

Import `PriorityQueue`; custom policies additionally import `PriorityOrder`.

- `new` / `withCapacity`: max heap.
- `min` / `minWithCapacity`: min heap.
- `fromVec` / `minFromVec`: consuming O(n) Floyd heap construction.
- `withOrder` / `withOrderCapacity` / `fromVecWithOrder`: monomorphized custom
  ordering with no runtime comparator pointer.
- `push` / `pop`: O(log n); `peek`: O(1).
- `removeAt`: remove a heap-layout owner and repair in O(log n).
- `tryReplaceAt`: replace and repair, or return the supplied owner in `Err`.
- `replaceTop`: replace the selected extremum and sift once.
- `pushPop`: fused fixed-length push-then-pop semantics.
- `append`: transfer another heap and rebuild once in O(n+m).
- `retain`: evaluate once per owner and rebuild in O(n).
- `drainPriority`: transfer owners in priority order without a second buffer.
- `intoPriorityVec`: consume the queue and reuse its allocation for
  priority-ordered materialization.
- `iter`: borrow heap layout; iteration is intentionally not priority-sorted.

## `LinkedList<T>`

Import `LinkedList` from `collections`. `pushFront`, `pushBack`, `popFront`, and
`popBack` are O(1); `peekFront` and `peekBack` borrow. `clear` retains the
stable-index node pool, `peekFrontMut` / `peekBackMut` borrow exclusively, and
`iter` walks front-to-back.

All insertion APIs transfer ownership, all removal APIs transfer it back, and
borrowed queries allocate nothing. None of these APIs requires application
developers to manage reference counts or thread lifetimes.
