---
title: "Pin<T> — Self-Referential Types"
description: "Safe handling of self-referential types with the $Pin contract"
---

# Pin\<T\> — Self-Referential Types

> **`Pin<T>` guarantees that a value **will not move in memory** once pinned.
> Essential for self-referential structs (e.g., linked lists, async coroutines).

---

## The Problem

Self-referential structs contain pointers to their own fields:

```vex
struct Node {
    data: i32,
    next: *mut u8,  // ← points to another Node in the same buffer
}
```

If `Node` is moved (e.g., passed to a function, pushed into a Vec), the internal
pointer becomes dangling. `Pin<T>` prevents this by forbidding move operations.

---

## Usage

```vex
// Pin a Box to prevent moving
let pinned = Pin.new(Box.new(Node { data: 42, next: ptr }));

// Access via asRef (safe, no move)
let node: &Node = pinned.asRef();

// Pin on the stack
let mut data = Node { data: 42, next: ptr };
let pinned = Pin.mut(&mut data);  // &!Node is now pinned
```

---

## `$Pin` Contract

The `$Pin` marker contract enables pin semantics:

```vex
contract $Pin for Node {
    // Auto-detected by compiler for self-referential types
}
```

The compiler automatically:

1. **Detects self-referential types** (circular `*mut` / `ptr` fields)
2. **Registers them in `pinned_types`** during codegen
3. **Disables `memcpy`-based moves** for pinned values

---

## Pin Guarantees

| Operation | Pinned | Unpinned |
|-----------|:------:|:--------:|
| `let x = y` (move) | ❌ | ✅ |
| `fn foo(x: T)` (pass) | ❌ | ✅ |
| `Vec.push(x)` | ❌ | ✅ |
| `x.field` (access) | ✅ | ✅ |
| `&x` (borrow) | ✅ | ✅ |
| Drop | ✅ | ✅ |

---

## Auto-Detection

The compiler's cycle detection (`vumm/cycle.rs`) automatically flags types
with self-referential pointer fields. You don't need to manually implement
`$Pin` — it's inferred at compile time:

```vex
// Compiler detects self-reference and auto-requires Pin
struct TreeNode {
    value: i32,
    children: Vec<TreeNode>,  // recursive → self-referential
}
```

> **⚠️ Note:** Auto-detection requires `*mut T` or `ptr` fields.
> `Box<T>` and `Vec<T>` are NOT self-referential (they own their heap data).

---

## Pin + Async

Async coroutines often contain self-referential data (the coroutine frame
points to itself). The compiler automatically pins coroutine frames:

```vex
async fn example() {
    let x = 42;
    let r = &x;          // self-referential borrow
    some_io().await;     // frame is pinned, safe to suspend
}
```

---

## Related

- [Box\<T\>](../memory/box.md) — Heap allocation
- [VUMM Inference](../memory/vumm.md) — Ownership strategy
- [Memory Safety](../memory/safety.md) — Safety guarantees
