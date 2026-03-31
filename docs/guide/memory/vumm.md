# VUMM

VUMM is Vex's unified ownership strategy for heap values. The user-facing surface stays simple: you write `Box.new(value)` or `Box(value)`, and the compiler/runtime can choose an internal ownership mode.

## The user-facing rule

In ordinary Vex code there is no separate `Rc` or `Arc` type hierarchy to choose from. The heap-owning abstraction you work with is `Box`.

```vex
let a = Box.new(42);
let b = Box(99);
```

That simplicity is the main point of VUMM.

## Internal box kinds

Inside the compiler and runtime, VUMM tracks different ownership strategies. The current codebase exposes these internal kinds:

- `Unique`
- `SharedRc`
- `AtomicArc`

These names show up in typed metadata and runtime support code. They describe how a boxed value is represented and reference-counted internally.

## What typically pushes each mode

### `Unique`

This is the straight-line ownership case: one owner, no shared references, no cross-thread sharing.

```vex
let data = Box.new(Config { debug: true });
use_config(data);
```

### `SharedRc`

This is the shared single-threaded case: a heap value is cloned or otherwise needs shared ownership without crossing concurrency boundaries.

```vex
let item = Box.new(load_resource());
let copy = item.clone();
```

### `AtomicArc`

This is the concurrent sharing case: the value needs ownership semantics that remain valid across `go` blocks or other cross-thread paths.

```vex
let state = Box.new(make_state());
let copy = state.clone();

go {
    use_state(copy);
};
```

## What VUMM does not change

VUMM does not replace the ownership rules explained in the rest of the language:

- moves are still moves
- borrows are still borrows
- `Box` is still an owning value
- `clone()` still signals sharing or duplication intent

VUMM changes representation strategy, not the surface ownership model.

## Why this matters

Without VUMM, a language often forces users to pick between several heap ownership types up front. Vex tries to keep the source-level choice simpler while still leaving room for the compiler/runtime to specialize the underlying behavior.

## Current implementation reality

The important practical statement for the docs is this:

1. user code writes `Box`
2. compiler and runtime may lower it to `Unique`, `SharedRc`, or `AtomicArc`
3. exact lowering is an implementation detail and may evolve as analysis improves

This page should be read as the model behind `Box`, not as a separate syntax you are expected to program directly.

## Practical guidance

- Start with plain `Box.new(value)`.
- Borrow boxed values when read-only access is enough.
- Clone only when shared ownership is actually needed.
- Treat concurrency boundaries like `go` as a signal that stronger sharing semantics may be required under the hood.

## See also

- [Box](./box)
- [Ownership](./ownership)
- [Concurrency: Async](../concurrency/async)
  | Rust | `Box`, `Rc`, `Arc` | Choose correct type |
  | Go | GC handles everything | Runtime overhead |
  | **Vex** | `Box.new()` | **Automatic, zero overhead** |

## Summary

::: info TL;DR

1. **Write `Box(value)` or `Box.new(value)`** - that's it
2. **Never look for `Rc` or `Arc` types** - they don't exist in Vex
3. **VUMM picks Unique/SharedRc/AtomicArc** automatically at compile time
4. **Zero runtime overhead** - kind is monomorphized, no branching
5. **Use `--explain-boxing`** to see VUMM's decisions
   :::

## Next Steps

- [Borrowing](borrowing) - Reference rules
- [Lifetimes](lifetimes) - Lifetime annotations
- [Performance](/guide/advanced/performance) - Optimization tips
