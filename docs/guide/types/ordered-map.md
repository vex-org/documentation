# OrderedMap\<K, V\>

`OrderedMap<K, V>` is the prelude's insertion-ordered owning hash map. It keeps
average O(1) key lookup and removal while iteration follows the current
insertion order. No import is required.

Use `OrderedMap` when order is part of the data model: deterministic output,
configuration, protocol fields, caches, or user-visible sequences. Prefer
`Map` when order is irrelevant and minimum metadata/cache cost matters.

`OrderedMap` is not a sorted map. A future B-tree family will provide key-order
ranges and logarithmic ordered lookup.

## Construction

```vex
let! values = OrderedMap.new<string, i32>();
let! reserved = OrderedMap.withCapacity<string, i32>(256 as usize);

let builder = DeterministicState.seed(42 as u64);
let! reproducible = OrderedMap.withHasherCapacity<string, i32, DeterministicState>(
    builder,
    256 as usize,
);
```

`withCapacity(n)` guarantees node capacity for at least `n` live entries.
`withHasher` and `withHasherCapacity` accept any `BuildHasher` policy.

## Lookup and ownership

```vex
let! scores = OrderedMap.new<string, i32>();
scores.insert("alice".toString(), 95 as i32);
scores.insert("bob".toString(), 87 as i32);

let alice = "alice".toString();
match scores.get(&alice) {
    Some(score) => $println(*score),
    None => {},
};

match scores.getMut(&alice) {
    Some(score) => { *score = 96 as i32; },
    None => {},
};
```

`insert` transfers key and value ownership. A new key returns `true`. An equal
key returns `false`, replaces only the value, and preserves both the first
canonical stored key and its order position. Insertion and update do not
require `Clone`.

- `get` and `getMut` borrow a value;
- `getKeyValue` borrows the canonical stored key and value;
- `contains` performs a key lookup;
- `removeValue` transfers the stored value and drops the canonical key;
- `removeEntry` transfers both canonical owners;
- `remove` is the boolean compatibility form and drops both removed owners.

## Ordered traversal

```vex
let! fields = OrderedMap.new<string, string>();
fields.insert("host".toString(), "localhost".toString());
fields.insert("port".toString(), "8080".toString());

let! entries = fields.iter();
while true {
    match entries.next() {
        Some(pair) => $println(pair.0, " = ", pair.1),
        None => break,
    };
};
```

`iter`, `keys`, and `values` return allocation-free borrowed iterators in
current order. `first` and `last` borrow the end pairs. `popFront` and
`popBack` transfer an end pair out.

`moveToFront(key)` and `moveToBack(key)` relink a present entry in O(1) after
its average O(1) lookup. They return `false` for a missing key.

## Capacity and filtering

- `capacity()` reports stable-node capacity;
- `reserve(minimum)` pre-grows node and hash-index storage;
- `clear()` drops live owners and retains allocations;
- `retain(predicate)` visits entries once, drops rejects, and preserves survivor
  order without cloning or rehashing them;
- `shrinkToFit()` compacts vacant stable slots in insertion order. It transfers
  owners once and rebuilds the private index from cached hashes, so user keys
  are neither cloned nor hashed again.

## Indexed compatibility access

`getAtIndex`, `getAtIndexRef`, and `getAtIndexMut` address the current order.
They traverse from the nearer end and cost O(min(i, n-i)). Use `iter()` for a
full scan; `OrderedMap` deliberately optimizes stable O(1) removal/reordering
instead of pretending that linked order also offers O(1) random indexing.

## Complexity

| Operation | Time |
|---|---:|
| `get`, `getMut`, `contains`, `insert` | average O(1) |
| `remove*` | average O(1) |
| `moveToFront`, `moveToBack` | average O(1) including lookup |
| `first`, `last`, `popFront`, `popBack` | O(1) |
| iterator step | O(1) |
| `retain`, `clear`, `shrinkToFit` | O(n) |
| `getAtIndex*(i)` | O(min(i, n-i)) |

The implementation owns each key/value pair exactly once in a stable node.
A private Swiss-table index maps the caller-policy full hash to a
collision-correct node chain; it uses an identity policy for that already
hashed `u64`, avoiding a second cryptographic hash. Doubly linked stable-node
indices maintain order and a free-slot stack reuses removed storage.

## Related pages

- [Map and Set](/guide/types/map-set)
- [Collections](/std/collections)
- [Contracts reference](/guide/types/contracts-reference)
