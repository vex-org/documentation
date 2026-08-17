# `collections` — supplemental owning containers

Vex provides `Vec`, `Map`, and `Set` in the prelude. The `collections` package
adds data structures with different access policies: `Queue`, `Stack`,
`PriorityQueue`, and `LinkedList`. It does not duplicate the prelude hash-table
implementation.

Every container owns its stored values. Insertion transfers ownership,
removal transfers it back to the caller, and peeking/iteration borrows without
cloning. There is no reference-counting or manual thread-lifetime API.

## Queue

`Queue<T>` is a circular FIFO buffer with amortized O(1) enqueue and dequeue.

```vex
import { Queue } from "collections";

let! pending = Queue.withCapacity<Job>(256);
pending.enqueue(job);

match pending.dequeue() {
    Some(next) => run(next),
    None => {},
};
```

`peek()` borrows the next value. `reserve()` grows in advance, `clear()` drops
live values while retaining storage, and `iter()` visits values in FIFO order
even when the physical buffer wraps.

## Stack

`Stack<T>` is the small LIFO surface over the canonical Vex `Vec<T>` storage.
It provides `push`, `pop`, borrowed `peek`, capacity management, `clear`, and
bottom-to-top borrowed iteration.

## PriorityQueue

Priority queues are max-heaps by default. Use `min()` or `minWithCapacity()`
when the smallest value must be selected first.

```vex
import { PriorityQueue } from "collections";

let! ready = PriorityQueue.withCapacity<Task>(1024);
ready.push(task);

match ready.pop() {
    Some(highest) => dispatch(highest),
    None => {},
};
```

`push` and `pop` are O(log n), while `peek` is O(1). Borrowed iteration exposes
heap layout; it is intentionally not sorted.

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

## LinkedList

`LinkedList<T>` is a stable-index doubly linked list for workloads that need
O(1) operations at both ends. `pushFront`, `pushBack`, `popFront`, and
`popBack` transfer ownership. Removed node slots are retained and reused;
`clear()` drops all live values without discarding that pool.

Prefer `Vec`, `Queue`, or `PriorityQueue` when contiguous storage expresses the
workload. `LinkedList` is specialized: its extra links and indirect accesses
are not a general replacement for cache-friendly arrays.

## Complexity summary

| Container operation | Time |
|---|---:|
| Queue enqueue/dequeue | amortized O(1) |
| Stack push/pop | amortized O(1) |
| PriorityQueue peek | O(1) |
| PriorityQueue push/pop/replace | O(log n) |
| PriorityQueue fromVec/append/retain rebuild | O(n) or O(n+m) |
| LinkedList operations at either end | O(1) |

