# Vec\<T\> — Dynamic Arrays

`Vec<T>` is the standard growable contiguous collection in Vex. It is the default choice when you need owned, mutable, resizable sequence storage.

## Creating Vectors

```vex
let! nums = Vec.new<i32>();
let! names = Vec.new<string>();
let! reserved = Vec.withCapacity<f64>(100);
let! hinted = Vec.withCap<i32>(16);
```

Use `let!` when you plan to mutate the vector.

Both `Vec.withCapacity(...)` and `Vec.withCap(...)` are present in the current prelude.

## Common Mutation Operations

| Method                 | Current Surface     |
| ---------------------- | ------------------- |
| `push(value)`          | append element      |
| `pop()`                | `Option<T>`         |
| `insert(index, value)` | `bool` success flag |
| `remove(index)`        | `Option<T>`         |
| `clear()`              | remove all elements |
| `set(index, value)`    | replace old value   |
| `trySet(index, value)` | `bool`              |

Example:

```vex
let! nums = Vec.new<i32>();
nums.push(10);
nums.push(20);
nums.push(30);

let last = nums.pop();
```

## Access Patterns

| Method                   | Current Surface |
| ------------------------ | --------------- |
| `get(index)`             | `Option<&T>`    |
| `getUnchecked(index)`    | `&T`            |
| `getRef(index)`          | `&T`            |
| `tryGet(index)`          | `Option<&T>`    |
| `tryGetRef(index)`       | `Option<&T>`    |
| `copyAt(index)`          | `T`             |
| `tryCopyAt(index)`       | `Option<T>`     |
| `getOr(index, fallback)` | `T`             |
| `first()` / `last()`     | `Option<&T>`    |

`get(...)` and `tryGet(...)` are the preferred safe access paths. `getRef(...)` is currently an unchecked compatibility alias for `getUnchecked(...)`, so it should be treated as low-level access rather than a safe borrow helper.

## Basic Example

```vex
let! nums = Vec.new<i32>();
nums.push(10);
nums.push(20);

match nums.get(0) {
    Some(v) => { $println(v); }
    None => { $println("empty"); }
}
```

## Copying vs Borrowing

Use the right accessor for the ownership model you want:

- use `get(...)` or `tryGet(...)` when you want a bounds-checked borrowed view
- use `getRef(...)` only when the index proof is already established
- use `copyAt(...)` when you want an owned copy of a copyable element
- use `getOr(...)` when a fallback value keeps the call site simpler

## Capacity and Growth

`Vec.withCapacity<T>(n)` is useful when you roughly know the final size and want to reduce reallocation churn. `Vec.withCap<T>(n)` is a built-in alias for the same operation.

```vex
let! values = Vec.withCapacity<i64>(10);
values.push(1);
values.push(2);
```

## Interop with `Span<T>`

For zero-copy, non-owning views over contiguous memory, prefer [Span\<T\>](../memory/span-t). The current prelude exposes both `asPtr()` and `asSpan()` on `Vec<T>`.

```vex
let! values = Vec.new<i32>();
values.push(10);
values.push(20);

let view = values.asSpan();
let raw = values.asPtr();
```

Use `Vec<T>` when you need ownership and growth, and `Span<T>` when you need a view.

## Practical Guidelines

1. Use `Vec<T>` as the default owned sequence container.
2. Keep the binding mutable with `let!` if you plan to call `push`, `pop`, `insert`, or `remove`.
3. Prefer safe accessors first; only use unchecked access when the proof is obvious.
4. Reach for `withCapacity(...)` in tight loops or builder-style code.

## Notes

- This page documents the currently tested prelude surface rather than an idealized future API.
- Several accessors accept multiple integer index forms in current usage.
