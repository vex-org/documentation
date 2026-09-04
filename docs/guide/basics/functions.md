# Functions

Functions are the main unit of reuse in Vex. A function has a name, typed parameters, an optional return type, and a block body.

## Declaration

The basic form is:

~~~text
fn name(parameter: Type): ReturnType {
    ...
}
~~~

A return type can be omitted for a function that returns unit. Use an explicit return type for public functions and for code where the interface matters.

~~~vex
fn add(left: i32, right: i32): i32 {
    return left + right;
}

fn main(): i32 {
    let answer = add(20, 22);
    $println(answer);
    return answer;
}
~~~

Vex accepts automatic statement boundaries at line breaks. Explicit semicolons are still useful when several statements share a line or when a boundary would be ambiguous.

## Parameters and mutation

Parameters are immutable by default. Use the mutable marker when a function must reassign a parameter:

~~~vex
fn increment(value!: i32): i32 {
    value += 1;
    return value;
}

fn main(): i32 {
    return increment(41);
}
~~~

Mutation of a caller-owned value normally requires a mutable binding and a mutable reference. The full rules are covered in [Ownership](/guide/memory/ownership) and [Borrowing](/guide/memory/borrowing).

~~~text
fn inspect(value: &Point): i32 { ... }
fn update(value: &Point!): i32 { ... }
~~~

Use immutable references for read-only access. A mutable reference is exclusive for the duration of the borrow; the checker rejects conflicting mutable and immutable borrows.

## Return values

A function returns with return expression. Tuples are the direct way to return more than one value:

~~~vex
fn divide_with_remainder(left: i32, right: i32): (i32, i32) {
    return (left / right, left % right);
}

fn main(): i32 {
    let (quotient, remainder) = divide_with_remainder(10, 3);
    return quotient + remainder;
}
~~~

Use an enum such as Result when a function can fail; do not use a magic integer unless the calling contract explicitly requires one.

## Generic functions

Generic functions declare type parameters after the function name:

~~~vex
fn identity<T>(value: T): T {
    return value;
}

fn main(): i32 {
    let value = identity<i32>(42);
    return value;
}
~~~

Generic structs use the same angle-bracket syntax. Generic functions and structs are implemented, but the interaction between generics, contracts, default parameters, and variadics is still being expanded. See [Language Status](/guide/language-status) before relying on an untested combination.

For a homogeneous variable-length argument list, use a trailing `values: ...T`
parameter. [Typed variadic packs](/guide/types/variadics) describe ownership,
borrowed iteration and supported compile-time calls.

## Methods and associated functions

Methods are declared outside the struct with a receiver. The receiver type determines which value owns the method:

~~~vex
struct Point {
    public:
    x: i32,
    y: i32,
}

fn (point: &Point) sum(): i32 {
    return point.x + point.y;
}

fn Point.origin(): Point {
    return Point { x: 0, y: 0 };
}

fn main(): i32 {
    let point = Point.origin();
    return point.sum();
}
~~~

The receiver is written as an ordinary parameter inside parentheses. A call such as point.sum() supplies the receiver automatically. Methods can be immutable or mutable; mutable receiver methods require the corresponding mutable reference rules.

## Closures

Closures use pipe delimiters around their parameters:

~~~vex
fn apply(operation: fn(i32): i32, value: i32): i32 {
    return operation(value);
}

fn main(): i32 {
    let double = |value: i32| value * 2;
    return apply(double, 21);
}
~~~

A closure can capture values from its surrounding scope. Capture behavior is checked by the ownership and escape analyses, especially when the closure is passed to a go block or stored for later execution.

## Explicit inlining

Use `inline fn` for a small, bounded function whose body must remain visible to
the optimizer at every legal call site:

~~~vex
inline fn isAscii(value: u8): bool {
    return value < 128 as u8;
}
~~~

This is a semantic code-generation contract, not a spelling-based compiler
special case. Vex carries it through HIR and emits the corresponding backend
attribute. It can override ordinary size and loop profitability heuristics,
but it cannot override a semantic prohibition such as a function that the
compiler has proven unsafe to inline.

Prefer ordinary `fn` by default. Use `inline fn` for short dispatchers,
fixed-width primitives, and similar boundaries where caller constants remove
most of the body. Keep large loops in a separate ordinary function and call it
from the inline dispatcher; this preserves specialization without duplicating
the loop at every call site.

## Overloading

Vex supports functions with the same name when their parameter signatures are distinct:

~~~vex
fn measure(value: i32): i32 {
    return value;
}

fn measure(value: f64): f64 {
    return value;
}

fn main(): i32 {
    return measure(42);
}
~~~

Resolution considers exact matches, compatible numeric coercions, and generic candidates. Ambiguous calls should be made explicit with an annotation or a type conversion. The complete overload matrix is not yet a stability guarantee.

## Async functions

Async functions are declared with async fn. Await is valid inside an async function or async execution context:

~~~vex
async fn get_value(): i32 {
    return 42;
}

async fn main(): i32 {
    let value = await get_value();
    $println(value);
    return 0;
}
~~~

Async declarations and await lowering are implemented. Runtime scheduling, suspension behavior, and the interaction with every library API remain experimental. Do not use await in an ordinary synchronous function.

## What is not part of the stable surface

The following forms appear in older design notes or incomplete examples and should not be copied as current syntax:

- an impl block for attaching methods;
- C-style for loops;
- an implicit expression return without an explicit return statement;
- a closure type annotation copied from another language;
- default and variadic parameter combinations that have not been checked in the current compiler.

When in doubt, start from a complete example in the repository and run `vex lint` before treating a form as supported.

## Next steps

- [Control Flow](/guide/basics/control-flow)
- [Structs](/guide/types/structs)
- [Generics](/guide/types/generics)
- [Contracts](/guide/types/contracts)
- [Closures](/guide/types/closures)
- [Async](/guide/concurrency/async)
