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
let! fastPath = Map.withCap<string, i32>(1024);
```

`Map.withCap` is the current capacity constructor exposed by the prelude implementation.

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
- `getOwned(&key)` returns `Option<V>` when `V: $Clone`.
- `map[key]` is a read-only index shorthand for `get`, so it also returns `Option<&V>`.
- Updates are done with `insert`, not with `map[key] = value` in the documented prelude surface.

### Core operations

| Method                             | Return       | Notes                                |
| ---------------------------------- | ------------ | ------------------------------------ |
| `Map.new<K, V>()`                  | `Map<K, V>`  | Empty map                            |
| `Map.withCap<K, V>(capacity: u64)` | `Map<K, V>`  | Preallocate buckets                  |
| `insert(key: K, value: V)`         | `bool`       | `true` if the key was new            |
| `get(key: &K)`                     | `Option<&V>` | Borrowed lookup                      |
| `getOwned(key: &K)`                | `Option<V>`  | Cloned lookup when `V: $Clone`       |
| `getOr(key: &K, fallback: &V)`     | `&V`         | Borrowed fallback lookup             |
| `getOrInsert(key: K, default: V)`  | `&V!`        | Insert-on-miss                       |
| `contains(key: &K)`                | `bool`       | Membership check                     |
| `remove(key: &K)`                  | `Option<V>`  | Removes and returns the stored value |
| `len()`                            | `u64`        | Element count                        |
| `isEmpty()`                        | `bool`       | Empty check                          |
| `clear()`                          | `()`         | Drops all entries                    |
| `keys()`                           | `Vec<K>`     | Clones keys when `K: $Clone`         |
| `values()`                         | `Vec<V>`     | Clones values when `V: $Clone`       |

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
| `insert(elem: T)`   | `bool`   | `true` when the element was newly added |
| `contains(elem: T)` | `bool`   | Membership check                        |
| `remove(elem: T)`   | `bool`   | `true` if an element was removed        |
| `len()`             | `usize`  | Element count                           |
| `isEmpty()`         | `bool`   | Empty check                             |
| `clear()`           | `()`     | Removes all elements                    |

## Key requirements

Map keys and set elements must support hashing and equality because the builtin implementation computes hashes with `key.hash()` and checks key equality during probing.

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
