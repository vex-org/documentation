# `Pin` — Move Prevention for Self-References

`Pin` is a prelude marker contract used by the compiler to prevent moves that
would invalidate self-references. It is not a `Pin<T>` wrapper and it does not
use a `$` sigil.

## Why pinning is needed

A value becomes address-sensitive when one of its fields can point to the value
itself or to storage whose address would change with the owner:

```vex
struct Node {
    value: i32,
    next: *Node,
}
```

After such a value establishes internal pointers, a bytewise move could leave
those pointers referring to the old location. The compiler's self-reference
analysis marks the type as pinned and rejects ownership moves that would break
the invariant.

## The marker contract

The prelude declaration has no methods:

```vex
contract Pin {}
```

Pinning is a semantic capability, not an allocation strategy. It does not
allocate, reference-count, or make raw pointers safe.

## Compiler detection

The compiler analyzes structural patterns including:

- a direct reference or pointer to the enclosing type;
- owned and borrowed fields whose borrow may point into the same object;
- recursive owned/container shapes that require address stability.

Detected types receive `Pin` move restrictions automatically. User code does
not need to construct a wrapper or call a pinning function.

## What is restricted

Once the compiler treats a value as pinned, operations that relocate ownership
are rejected. Borrowing fields and calling methods in place remain valid.
Dropping the value is valid when its ownership/lifetime rules permit it.

Do not assume that copying a pointer makes the pointed-to object pinned. The
guarantee is attached to the analyzed value/type and enforced by the ownership
checker.

## Async frames

Async lowering uses the same address-stability principle for borrows that live
across suspension. A borrow crossing `await` must satisfy the compiler's
suspension and lifetime analysis; manually spelling `Pin` is not a way to bypass
that proof.

```vex
async fn example() {
    let value = 42
    let reference = &value
    awaitNextEvent()
    $println(*reference)
}
```

If the frame cannot safely preserve the borrow, compilation fails.

## Practical guidance

1. Let compiler detection apply pin semantics.
2. Keep self-referential raw pointers rare and initialization tightly audited.
3. Do not place an already self-referential value into a relocating container.
4. Prefer indices, handles, or owned indirection when they avoid self-reference.
5. Treat a pinning diagnostic as an ownership/layout issue, not a request for a
   cast.

## Related

- [Ownership](/guide/memory/ownership)
- [Borrowing](/guide/memory/borrowing)
- [VUMM](/guide/memory/vumm)
- [Async](/guide/concurrency/async)
- [Memory Safety](/guide/memory/safety)
