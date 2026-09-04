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

## Returning references through known callbacks

A local function value can retain the declared function's return-source
information. The result does not automatically borrow every argument:

~~~vex
struct Record { value: i32 }
fn first(left: &Record, right: &Record): &Record { return left; }
fn selected(source: &Record): &Record {
    let local = Record { value: 719 };
    let callback = first;
    return callback(source, &local);
}
~~~

Here `first` returns `source`, not `local`, so the return is valid. The compiler
tracks declaration identity through local aliases, equal-target branches and
assignments. A contextually specialized generic function also retains its exact
generic arguments; import aliases do not replace declaration identity.

This also works inside a generic forwarding function:

~~~vex
fn firstGeneric<T>(left: &T, right: &T): &T { return left; }
fn forward<T>(left: &T, right: &T): &T {
    let callback: fn(&T, &T): &T = firstGeneric;
    return callback(left, right);
}
~~~

The template retains the known declaration and its symbolic function type.
That is not a concrete specialization: only a complete type/const environment
can identify an exact instance. Return-source information that is valid for
every specialization can already be used while checking the template. This
includes contextual array callbacks forwarding a declared const extent;
different exact extents remain different instantiations. Same-environment
recursive forwarding and references carried in local structs use the same
origin analysis.

This is a compile-time lifetime proof, not a different callback calling
convention. Mixed targets, callback parameters, mutable address exposure and
unresolved specializations remain conservative. In particular, changing
`callback` to a function that returns its second argument must not make a
reference to `local` escape. Passing all possible source owners with sufficient
lifetimes remains valid even when the target is only known at runtime.

Function-value target analysis still joins assignments across the body: a
later overwrite does not yet remove an earlier possible callback target.
Function-valued fields, returned callbacks and general closure-result origins
are separate precision boundaries.

## Writing and returning a stored reference

For supported ordinary memory operations, the compiler tracks the writes that
reach each reference load, rather than attributing the result to every earlier
value of its holder:

~~~vex
struct StoredRecord { value: i32 }
struct StoredHolder { source: &StoredRecord }

fn replace(output: &StoredHolder!, source: &StoredRecord): &StoredRecord {
    output.source = source;
    return output.source;
}
~~~

The returned reference comes from `source`; it does not borrow the storage of
`output`. The write still imposes its normal lifetime requirements on the
stored reference. A definite overwrite replaces the previous source. A write
on only one branch, a possibly zero-iteration loop or a possibly aliasing index
must retain every possible source. A reference copied **before** an overwrite
keeps its original pointee.

This precision currently covers direct stores/loads, typed field and constant
index paths, stable aliases, conditionals and ordinary loop control. General
call-side memory effects, implicit reference conversions, cleanup calls and
retargeted pointer aliases remain conservative until their ordered effects are
represented. Some valid programs can still be rejected at those boundaries;
no unsafe conversion or alternate library API is required by the language.

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

A reference field's storage slot is distinct from the object it points to.
Replacing `holder.source` does not mutate the old or new source object;
ordinary scalar sibling updates and repeated field assignments use that same
distinction. A live reference to the slot itself still prevents overwriting it.

References stored behind a live alias remain observable even when the original
holder variable is no longer directly used. Their source cannot be mutated or
destroyed while that alias can still observe it. This follows selected fields:
an alias to one subobject does not automatically keep unrelated sibling
references live, and an alias whose last use has passed does not extend a borrow.
The conservative call-side and implicit-effect boundaries described above
still apply. Copying a reference out of caller-owned storage does not borrow
its reference slot; borrowing the slot with `&holder.source` does. Unknown
pointees and whole-owner operations remain conservative.

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

A freshly written `&value` can also take its shared/exclusive reference type
from its consuming field or parameter. This applies after generic literal
inference too. The borrow checker uses that inferred capability: if the field
requires `&T!`, a simultaneous shared borrow of the same live pointee is not
allowed. This does not upgrade an already stored `&T` reference to `&T!`.

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
