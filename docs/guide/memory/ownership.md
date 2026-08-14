# Ownership

Vex uses ownership to make the lifetime and movement of values explicit. A value has one owner. Passing an owning value to a function or assigning it to another binding can move that ownership; borrowing lets code use the value without taking it over.

The ownership and borrow checker are implemented in the current compiler. The exact behavior of container, runtime, and FFI types still depends on their API contracts.

## Bindings and mutation

Bindings are immutable by default:

~~~vex
fn main(): i32 {
    let value = 20;
    return value;
}
~~~

Use let! when the binding must be reassigned:

~~~vex
fn main(): i32 {
    let! total = 20;
    total += 22;
    return total;
}
~~~

A mutable binding does not make every reference to the value mutable. The reference type must also permit mutation.

## Moves

Owning values such as Vec, Box, strings, maps, sets, and most user-defined structs may be moved:

~~~text
let data = Vec.new<i32>()
let moved = data
use(moved)
use(data) // error: data was moved
~~~

A move is useful when a function or task should become the new owner. If the caller still needs to use the value, pass an immutable or mutable reference instead.

## Copy values

Small scalar values such as integers, floating-point values, booleans, and characters are copied in ordinary assignments:

~~~vex
fn main(): i32 {
    let first: i32 = 42;
    let second = first;
    $println(first);
    return second;
}
~~~

For an owning or user-defined type, assume that assignment moves unless the type's contract says otherwise.

## Borrowing

An immutable borrow uses &T:

~~~text
fn inspect(value: &Point): i32 {
    value.x + value.y
}
~~~

A mutable borrow uses &T!:

~~~text
fn update(value: &Point!) {
    value.x = 10
}
~~~

There may be several immutable borrows, or one exclusive mutable borrow, but the two kinds cannot conflict while they are live. The checker uses non-lexical lifetime reasoning, so an immutable borrow can end at its last use rather than at the end of the surrounding block.

## Partial moves

Ownership is tracked at the field level for supported structs. Moving one non-Copy field does not automatically move every independent field:

~~~text
struct Pair {
    public:
    name: string,
    age: i32,
}

let pair = Pair { name: "Alice", age: 30 }
let name = pair.name
use(pair.age)
~~~

The moved field cannot be read again. Copy fields can remain available when the surrounding type and access path permit it.

## References returned from functions

A returned reference must be derived from data that outlives the returned reference:

~~~text
fn longest(left: &string, right: &string): &string {
    if left.len() > right.len() {
        return left
    }
    return right
}
~~~

Returning a reference to a local owned value is rejected because the local is destroyed when the function returns.

## Heap-owned values

Box is an owning heap value. It is useful when a value needs indirection or a recursive data structure needs a stable allocation:

~~~text
let boxed = Box.new(42)
use(boxed)
~~~

Box does not bypass ownership. Moving, borrowing, and dropping a boxed value still follow the same rules.

## Low-level views

Use the narrowest memory abstraction that expresses the operation:

- &T and &T! for ordinary borrows;
- `Span<T>` for a non-owning contiguous view;
- `Ptr<T>` for typed pointer operations;
- RawBuf for explicit raw storage.

Keep raw memory and FFI code behind a small, tested boundary. See [FFI](/guide/ffi), [Pointers](/guide/advanced/pointers), and [Memory Safety](/guide/memory/safety).

## Practical rules

1. Borrow when the callee should not become the owner.
2. Move when ownership transfer is intentional.
3. Make mutation visible with let! and mutable references.
4. Use explicit types at FFI and ABI boundaries.
5. Check detached-task captures carefully; a go block cannot safely outlive a borrowed local.

## Next steps

- [Borrowing](/guide/memory/borrowing)
- [Lifetimes](/guide/memory/lifetimes)
- [Memory Safety](/guide/memory/safety)
- [VUMM](/guide/memory/vumm)
