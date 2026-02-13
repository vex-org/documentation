# Maps and Sets — Key-Value Collections

Vex provides high-performance associative collections in the prelude: `Map<K, V>` for key-value pairs and `Set<T>` for unique elements. Both are based on **Swiss Tables**, an advanced hash map design that provides exceptional speed and memory efficiency.

::: tip Prelude Types
`Map<K, V>` and `Set<T>` are **prelude types** — available in all Vex programs without any `import`.
:::

## Map\<K, V\>

A `Map` (often called a hash map or dictionary) stores pairs of keys and values. Keys must be unique and must implement the `$Eq` and `.hash()` contracts.

### Basic Usage

```vex
fn main() {
    // Create an empty map
    let! scores = Map.new<string, i32>();
    
    // Insert values
    scores.insert("Alice", 100);
    scores["Bob"] = 200;            // Index assignment operator
    
    // Retrieve values
    match scores.get("Alice") {
        Some(score) => $println("Alice scored: {}", score),
        None => $println("Not found")
    }
    
    // Check for existence
    if scores.contains("Charlie") {
        $println("Charlie is playing");
    }
}
```

### Core Operations

| Method | Description |
|--------|-------------|
| `insert(key: K, value: V): bool` | Inserts or updates a pair. Returns `true` if it's a new key. |
| `get(key: &K): Option<V>` | Returns a copy of the value if it exists. |
| `getRef(key: &K): Option<&V>` | Returns a reference to the value in the map. |
| `remove(key: &K): Option<V>` | Removes and returns the value associated with the key. |
| `contains(key: &K): bool` | Returns `true` if the key exists in the map. |
| `clear()` | Removes all key-value pairs. |

### Index Operators

Maps support convenient index syntax for reading and writing:

```vex
let val = map[key];      // Returns Option<&V>
map[key] = new_val;      // Internally calls insert()
```

### Capacity Hints

Pre-allocating capacity can improve performance for large maps:

```vex
let! large_map = Map.withCapacity<i32, string>(1000);
```

---

## Set\<T\>

A `Set` is a collection that stores unique elements. It is implemented as a wrapper around `Map<T, u8>`, providing similar performance characteristics.

### Basic Usage

```vex
fn main() {
    let! tags = Set.new<string>();
    
    tags.insert("vex");
    tags.insert("programming");
    tags.insert("vex");         // Duplicate - ignored
    
    if tags.contains("vex") {
        $println("Found!");
    }
    
    tags.remove("programming");
}
```

### Core Operations

| Method | Description |
|--------|-------------|
| `insert(elem: T): bool` | Adds an element. Returns `true` if it was not already present. |
| `contains(elem: T): bool` | Returns `true` if the element exists in the set. |
| `remove(elem: T): bool` | Removes an element. Returns `true` if it was present. |
| `clear()` | Removes all elements. |

---

## OrderedMap\<K, V\>

Specifically useful when insertion order must be preserved (e.g., for JSON serialization or maintaining a history). It has the same API as `Map<K, V>` but uses additional memory to track order.

```vex
let! om = OrderedMap.new<string, i32>();
om.insert("first", 1);
om.insert("second", 2);

// Accessing by insertion index
let val = om.getAtIndex(0); // Some(1)
```

## Performance Characteristics

Vex collections use **quadratic probing** and **SIMD-friendly control bytes** (Swiss Tables) to achieve:

-   **O(1) Average Case**: Insertion, deletion, and lookup.
-   **High Load Factor**: Maps remain efficient even at 87.5% capacity.
-   **Cache Efficiency**: Control bytes and data slots are optimized for modern CPU caches.

## Requirements for Keys

To be used as a key in a `Map` or an element in a `Set`, a type must implement:

1.  **Equality (`$Eq`)**: To compare keys during lookup.
2.  **Hashing**: A `.hash(): u64` method.

Most built-in types (`i32`, `f64`, `string`, etc.) implement these by default.

## See Also

-   [Vec\<T\>](./vec) — Ordered dynamic array
-   [Enums](./enums) — Using `Option` for missing keys
-   [Operator Overloading](./operators) — How `op[]` works
