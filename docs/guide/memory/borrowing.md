# Borrowing

Borrowing lets a function or expression use a value without taking ownership. Vex's semantic checker tracks immutable and mutable references, moves, field access, and the lifetime of returned references.

## Immutable references

An immutable reference uses &T:

~~~vex
struct Point {
    public:
    x: i32,
    y: i32,
}

fn sum(point: &Point): i32 {
    return point.x + point.y;
}

fn main(): i32 {
    let point = Point { x: 3, y: 4 };
    return sum(&point);
}
~~~

The callee can read through the reference, but it cannot mutate the borrowed value through an immutable reference.

## Mutable references

A mutable reference uses &T!. The owner must be stored in a mutable binding:

~~~vex
struct Counter {
    public:
    value: i32,
}

fn increment(counter: &Counter!): i32 {
    counter.value += 1;
    return counter.value;
}

fn main(): i32 {
    let! counter = Counter { value: 41 };
    return increment(&counter!);
}
~~~

Use a mutable borrow only for the smallest operation that needs it. The exclamation mark at the call site makes the exclusive borrow visible.

## The borrowing rule

At a point in the program, Vex permits several immutable borrows or one exclusive mutable borrow. An immutable and mutable borrow cannot conflict while both are live.

~~~text
let! values = Vec.new<i32>()
let read_only = &values
use(read_only)
let writable = &values!
mutate(writable)
~~~

The checker uses non-lexical lifetime reasoning. In the example, the immutable borrow can end after its last use, allowing the later mutable borrow.

## References cannot outlive their source

A function may return a reference derived from one of its input references:

~~~text
fn choose(left: &string, right: &string): &string {
    if left.len() > right.len() {
        return left
    }
    return right
}
~~~

A reference to a local value cannot be returned:

~~~text
fn invalid(): &i32 {
    let value = 42
    return &value
}
~~~

The local value is destroyed when invalid returns, so the compiler rejects the dangling reference.

## Field-level access

The checker can reason about disjoint fields for supported struct operations:

~~~text
struct Point {
    public:
    x: i32,
    y: i32,
}

let! point = Point { x: 1, y: 2 }
let x_ref = &point.x
point.y = 10
use(x_ref)
~~~

Access to point.y does not overlap point.x. A write to point.x while x_ref is live would be rejected.

## Method receivers

Methods use the same reference types as ordinary functions:

~~~text
fn (point: &Point) sum(): i32 {
    return point.x + point.y
}

fn (point: &Point!) move_by(dx: i32, dy: i32) {
    point.x += dx
    point.y += dy
}
~~~

The call-site value must satisfy the receiver's mutability requirement.

## Concurrency boundaries

References cannot be captured by a detached task when the capture could dangle or introduce an unsafe race:

~~~text
let! values = Vec.new<i32>()
let borrowed = &values

go {
    use(borrowed)
}
~~~

Whether a capture is accepted depends on the lifetime and escape path. Prefer moving an owned value into a task or sending a value through a typed channel.

## Current implementation boundary

The NLL borrow checker has direct tests for moves, mutable and immutable conflicts, returned references, field access, and concurrency captures. That evidence supports the core borrowing model; it does not turn every runtime or FFI ownership contract into a guarantee. Read the API contract for containers, pointers, and native resources before using them across a boundary.

## Guidance

- Prefer &T for read-only functions.
- Use &T! only when mutation is required.
- End borrows before taking a mutable borrow.
- Keep returned references tied to input data.
- Treat pointers, raw buffers, and FFI values as separate safety boundaries.

## Next steps

- [Ownership](/guide/memory/ownership)
- [Lifetimes](/guide/memory/lifetimes)
- [Memory Safety](/guide/memory/safety)
- [Concurrency Overview](/guide/concurrency/overview)
