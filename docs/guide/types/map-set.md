# Maps and Sets

Vex ships prelude associative collections backed by a Swiss-table style hash map implementation. The current builtin surface lives in the compiler prelude and is available without imports.

::: tip Prelude Types
`Map<K, V>` and `Set<T>` are prelude types. This page documents the currently verified builtin API surface, not every experimental wrapper that may exist elsewhere in the repo.
:::

## `Map<K, V>`

`Map<K, V>` stores unique keys with associated values using open addressing, control bytes, and quadratic probing.

### Constructors

```vex
let! scores = Map.new<string, i32>();
let! fastPath = Map.withCapacity<string, i32>(1024);
```

`Map.withCapacity(n)` guarantees room for at least `n` elements without a
rehash, including the Swiss-table load-factor budget. `Map.withCap(n)` remains
the low-level legacy constructor whose argument is a raw bucket count.

### Compile-time constructor checks

Inside `#const`, Map constructors use the same Vex source policy as native
allocation for bucket rounding, load-factor capacity, padded entry size and
target allocator limits. An empty reservation does not allocate that many
compiler-host entries:

```vex
let count = #const {
    let values = Map.withCapacity<u64, u64>(1000000 as usize);
    values.len()
}; // 0; the runtime receives only this scalar result
```

If a Map itself crosses into runtime, ordinary Vex construction still allocates
its backing table. This is not a static, allocation-free hash table. Explicit
builders retain their exact value; default randomized builders are not replaced
with a compiler-generated seed.

### Mutation history at the runtime boundary

The supported CTFE insert/remove/clear operations retain table-construction
history, not just surviving key/value pairs. A removal-free build followed by
clear becomes an empty table at its final grown capacity: the compiler uses
the Vex source capacity/layout policy and emits no replay of those insertions.

Histories containing removals can depend on the runtime hash seed. Their typed
construction recipe preserves native insertion/removal order, tombstones and
growth budget. Explicit builders keep their exact state; the default seed is
still generated at runtime.

::: warning Construction is not free
A Map crossing into runtime needs ordinary allocation and hashing. A
seed-dependent history may also retain transient inserts/removes, so startup
cost and generated code can exceed constructing only the surviving pairs.
Further history compaction is not yet complete. This does not add a journal or
extra dispatch to ordinary runtime Map operations, and does not make every Map
method callable during CTFE.
:::

### Custom keys during `#const`

Custom Map keys need const-executable `Hash` and `Eq` implementations for CTFE.
Integer, `bool` and `char` fields can forward to their prelude `hashInto`
implementations; the compiler executes those Vex bodies with the selected
Hasher contract:

```vex
struct Key: Hash, Eq { id: i32 }

const fn (self: &Key) op==(other: &Key): bool { return self.id == other.id; }
const fn (self: &Key) op!=(other: &Key): bool { return self.id != other.id; }
const fn (self: &Key) hashInto<H: Hasher>(state: &H!) {
    self.id.hashInto(state);
}

let found = #const {
    let! values = Map.new<Key, i32>();
    values.insert(Key { id: 7 }, 42);
    values.contains(&Key { id: 7 })
}; // true
```

The primitive feeds retain their domain tags and canonical little-endian
encoding. Marking a feed `const` does not authorize arbitrary runtime Hasher
methods, system randomness or I/O during CTFE. Direct use with a custom state
requires its executed methods to be const-executable too. This guarantee does
not cover string-field Hash forwarding or every Map method; for example,
`removeEntry` remains runtime-only in the current CTFE surface.

### Basic usage

```vex
let! scores = Map.new<string, i32>();

scores.insert("alice", 100);
scores.insert("bob", 200);

match scores.getOwned(&"alice") {
    Some(score) => {
        $println(score);
    },
    None => {
        $println("missing");
    },
};

if scores.contains(&"bob") {
    $println("bob exists");
}
```

### Lookup model

- `get(&key)` returns `Option<&V>` for zero-copy access.
- `getOwned(&key)` returns `Option<V>` when `V: Clone`.
- `map[key]` is a read-only index shorthand for `get`, so it also returns `Option<&V>`.
- Updates are done with `insert`, not with `map[key] = value` in the documented prelude surface.

### Core operations

| Method                             | Return       | Notes                                |
| ---------------------------------- | ------------ | ------------------------------------ |
| `Map.new<K, V>()`                  | `Map<K, V>`  | Empty map                            |
| `Map.withCapacity<K, V>(capacity: usize)` | `Map<K, V>`  | Guarantee element capacity       |
| `Map.withCap<K, V>(buckets: usize)` | `Map<K, V>`  | Legacy raw bucket capacity          |
| `insert(key: K, value: V)`         | `bool`       | `true` if the key was new            |
| `get(key: &K)`                     | `Option<&V>` | Borrowed lookup                      |
| `getOwned(key: &K)`                | `Option<V>`  | Cloned lookup when `V: Clone`       |
| `getOr(key: &K, fallback: &V)`     | `&V`         | Borrowed fallback lookup             |
| `getOrInsert(key: K, default: V)`  | `&V!`        | Insert-on-miss                       |
| `contains(key: &K)`                | `bool`       | Membership check                     |
| `remove(key: &K)`                  | `Option<V>`  | Removes and returns the stored value |
| `removeEntry(key: &K)`             | `Option<(K,V)>` | Transfers canonical key and value  |
| `getKeyValue(key: &K)`             | `Option<(&K,&V)>` | Borrows canonical key and value  |
| `getOrInsertWith(key, factory)`     | `&V!`        | Constructs only on a miss            |
| `len()`                            | `usize`      | Element count                        |
| `capacity()` / `reserve(n)`        | `usize` / `()` | Element-capacity management        |
| `retain(predicate)`                | `()`         | Drops rejected owners once           |
| `shrinkToFit()`                    | `()`         | Rehashes into the smallest fit table |
| `isEmpty()`                        | `bool`       | Empty check                          |
| `clear()`                          | `()`         | Drops all entries                    |
| `keys()`                           | `Vec<K>`     | Clones keys when `K: Clone`         |
| `values()`                         | `Vec<V>`     | Clones values when `V: Clone`       |

## `Set<T>`

`Set<T>` is the unique-element companion to `Map`. In the current prelude it is implemented as a thin wrapper around `Map<T, u8>`.

### Basic usage

```vex
let! tags = Set.new<string>();

tags.insert("vex");
tags.insert("compiler");
tags.insert("vex");

if tags.contains("vex") {
    $println("present");
}

let removed = tags.remove("compiler");
```

### Core operations

| Method              | Return   | Notes                                   |
| ------------------- | -------- | --------------------------------------- |
| `Set.new<T>()`      | `Set<T>` | Empty set                               |
| `Set.withCapacity<T>(n)` | `Set<T>` | Guarantee element capacity          |
| `insert(elem: T)`   | `bool`   | `true` when the element was newly added |
| `contains(elem: T)` | `bool`   | Membership check                        |
| `remove(elem: T)`   | `bool`   | `true` if an element was removed        |
| `get(elem: &T)`     | `Option<&T>` | Borrow canonical stored value        |
| `take(elem: &T)`    | `Option<T>` | Transfer canonical stored value       |
| `capacity()` / `reserve(n)` | `usize` / `()` | Capacity management          |
| `retain(predicate)` / `shrinkToFit()` | `()` | Filter and reclaim storage     |
| `len()`             | `usize`  | Element count                           |
| `isEmpty()`         | `bool`   | Empty check                             |
| `clear()`           | `()`     | Removes all elements                    |

## Key requirements

Map keys and set elements must support `Hash + Eq`. Hashing feeds the selected
per-table `BuildHasher` state through `hashInto`; keys do not finalize hashes
themselves. Equality and hash feeds must describe the same identity.

In practice, builtin scalar types and `string` are the common key types used across the repo.

## Performance model

The current prelude implementation is designed around Swiss-table techniques:

- Open addressing with quadratic probing
- SIMD-friendly control bytes
- A target load factor of `7/8` before growth
- Separate control and entry storage for better cache behavior

## See Also

- [./vec](./vec)
- [./enums](./enums)
- [./contracts](./contracts)
