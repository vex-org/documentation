# OrderedMap\<K, V\>

`OrderedMap<K, V>` is a hash map that preserves insertion order. It combines the O(1) lookup of `Map<K, V>` with predictable iteration order. Internally, it uses a hash table paired with a doubly-linked list tracking insertion order.

## When to Use OrderedMap vs Map

| Feature          | `Map<K, V>`            | `OrderedMap<K, V>`            |
| ---------------- | ---------------------- | ----------------------------- |
| Lookup           | O(1) average           | O(1) average                  |
| Insertion        | O(1) average           | O(1) average                  |
| Iteration order  | Arbitrary (hash order) | Insertion order               |
| Memory overhead  | Lower                  | Higher (linked list pointers) |
| Cache efficiency | Better                 | Slightly worse                |

Use `OrderedMap` when:

- Iteration order matters (e.g., configuration keys displayed to users)
- You need both fast lookup AND ordered traversal
- You're serializing to a format where key order matters (JSON with ordered keys)
- You want deterministic behavior across runs

Use `Map` when:

- You only need key-value lookup
- Memory is tight
- Iteration order is irrelevant

## Construction

```vex
// Empty ordered map
let! map: OrderedMap<string, i32> = OrderedMap.new()

// With initial capacity
let! prealloc = OrderedMap.withCapacity<string, i32>(100)

// From array of key-value pairs
let kvPairs = [("alice", 30), ("bob", 25), ("charlie", 35)]
let fromPairs: OrderedMap<string, i32> = OrderedMap.from(kvPairs)
```

## Basic Operations

```vex
let! scores = OrderedMap.new<string, i32>()

// Insert (preserves insertion order)
scores.insert("alice", 95)
scores.insert("bob", 87)
scores.insert("charlie", 92)

// Lookup
let alice_score = scores.get("alice")    // Some(95)
let missing = scores.get("dave")          // None

// Get with default
let dave_score = scores.getOr("dave", 0)  // 0

// Check existence
let has_alice = scores.contains("alice")  // true

// Remove
let removed = scores.remove("bob")        // Some(87)
scores.remove("nobody")                    // None

// Size
let count = scores.len()                  // 2
let empty = scores.isEmpty()              // false
```

## Insertion-Order Iteration

```vex
let! config = OrderedMap.new<string, string>()
config.insert("host", "localhost")
config.insert("port", "8080")
config.insert("debug", "true")

// Iteration preserves insertion order
for (key, value) in config {
    $println(f"{key} = {value}")
}
// Output (always this order):
// host = localhost
// port = 8080
// debug = true

// Keys in insertion order
let keys = config.keys()    // ["host", "port", "debug"]

// Values in insertion order
let values = config.values()  // ["localhost", "8080", "true"]
```

## Reordering Operations

Unlike `Map`, `OrderedMap` supports order manipulation:

```vex
let! map = OrderedMap.from([("a", 1), ("b", 2), ("c", 3)])

// Move to front
map.moveToFront("c")
// Order: c, a, b

// Move to back
map.moveToBack("a")
// Order: c, b, a

// Insert before/after existing key
map.insertBefore("b", "x", 99)
// Order: c, x, b, a

map.insertAfter("x", "y", 100)
// Order: c, x, y, b, a
```

## Bulk Operations

```vex
let! map = OrderedMap.new<string, i32>()

// Extend from another ordered map
map.extend(other)

// Extend from array of pairs
map.extend([("d", 4), ("e", 5)])

// Clear all entries
map.clear()

// Reserve capacity
map.reserve(1000)
```

## Equality and Hashing

```vex
let a = OrderedMap.from([("x", 1), ("y", 2)])
let b = OrderedMap.from([("x", 1), ("y", 2)])
let c = OrderedMap.from([("y", 2), ("x", 1)])  // different order!

let same = a == b    // true (same entries, same order)
let diff = a == c    // false (same entries, DIFFERENT order)
```

OrderedMap equality considers BOTH entries AND their order. Two ordered maps with the same key-value pairs in different orders are NOT equal.

## Serialization

OrderedMap serializes with keys in insertion order -- important for JSON:

```vex
let! response = OrderedMap.new<string, string>()
response.insert("status", "ok")
response.insert("message", "success")
response.insert("data", "...")

// Serialize to JSON with predictable key order
let json = response.toJson()
// {"status":"ok","message":"success","data":"..."}
// Keys are ALWAYS in this order, unlike regular Map
```

## Performance Characteristics

| Operation            | Complexity   | Notes                                  |
| -------------------- | ------------ | -------------------------------------- |
| `insert`             | O(1) average | Hash table insert + linked list append |
| `get`                | O(1) average | Hash table lookup                      |
| `remove`             | O(1) average | Hash table remove + linked list unlink |
| `contains`           | O(1) average | Hash table check                       |
| `moveToFront/Back`   | O(1)         | Linked list relink                     |
| `insertBefore/After` | O(1)         | Hash + linked list operations          |
| Iteration            | O(n)         | Linked list traversal                  |

## Implementation

OrderedMap uses a Swiss Table hash map paired with a doubly-linked list:

```
Hash Table:  [bucket0] [bucket1] [bucket2] ...
                  |         |         |
                  v         v         v
Linked List:  <-> Entry <-> Entry <-> Entry <->
              (head)                         (tail)
```

Each entry is stored once with both hash table links AND linked list pointers.

## Best Practices

1. Use `OrderedMap` when insertion order is semantically meaningful.
2. Prefer `Map` for pure lookup workloads -- it has lower overhead.
3. Use `OrderedMap` for configuration, HTTP headers, and serialization where key order matters.
4. Specify capacity with `withCapacity` when you know the size upfront to avoid rehashing.
5. Remember that equality comparison includes order, unlike `Map`.

## Related Pages

- [Map & Set](/guide/types/map-set) -- standard unordered collections
- [Contracts Reference](/guide/types/contracts-reference) -- `Hash`, `Eq`, `Iterator`
