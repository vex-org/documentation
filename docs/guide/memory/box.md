# `Box<T>`

`Box<T>` is Vex's owning heap pointer for one value. It lives in the prelude, so you can use it without an import.

## When to use it

Reach for `Box<T>` when:

- a value should live on the heap
- moving the wrapper should stay cheap
- a recursive type needs an indirection point
- ownership should remain explicit

```vex
fn main(): i32 {
    let b: Box<i32> = Box.new(42);
    $println(b.get());
    return 0;
}
```

## Constructors

Both constructor forms are present in the current prelude:

```vex
let a = Box.new<i32>(42);
let b = Box<i32>(99);
```

Use whichever style matches the surrounding codebase.

## Common methods

The current `Box<T>` prelude surface includes:

| Method           | Purpose                                                       |
| ---------------- | ------------------------------------------------------------- |
| `get()`          | Copy or move the contained value out by value where supported |
| `getRef()`       | Borrow the contained value immutably                          |
| `getRefOpt()`    | Borrow immutably if the internal pointer is valid             |
| `getRefMut()`    | Borrow the contained value mutably                            |
| `getRefMutOpt()` | Borrow mutably if the internal pointer is valid               |
| `set(value)`     | Replace the contained value                                   |
| `take()`         | Consume the box and return the owned value                    |
| `tryTake()`      | Conditional `take()` returning `Option<T>`                    |
| `swap(other)`    | Swap contents with another box                                |
| `asPtr()`        | Expose the raw pointer                                        |
| `isValid()`      | Check for a non-null internal pointer                         |

Example:

```vex
fn bump(value: &Box<i32>!) {
    let current = value.get();
    value.set(current + 1);
}
```

In normal code, prefer `getRef()` or `getRefMut()` when you want a borrow and `take()` only when you intentionally want to consume ownership.

## Recursive types

`Box<T>` is the usual way to make recursive layouts finite:

```vex
enum List<T> {
    Cons(T, Box<List<T>>),
    Nil,
}
```

## Drop behavior

`Box<T>` participates in normal Vex drop semantics. When a box goes out of scope, the contained value is dropped and the heap allocation is released.

That makes it a good fit for simple RAII-style ownership without dropping down to raw pointers.

## Unsafe edges

The prelude also exposes low-level escape hatches:

- `Box.fromRaw<T>(rawPtr)`
- `intoRaw()`

Use them only when you are deliberately crossing ownership boundaries, such as FFI or runtime internals.

## Notes

- `Box<T>` is implemented as a builtin-like pointer wrapper in the prelude.
- The current user-facing API is source-backed by `box.vxc`; this page documents that concrete surface rather than assuming implicit auto-deref behavior.
- If you only need typed memory access, prefer [`Ptr<T>`](./ptr-t).
- If you need growable collections, prefer [`Vec<T>`](../types/vec).

## See also

- [Ownership](./ownership)
- [VUMM](./vumm)
- [`Ptr<T>`](./ptr-t)
