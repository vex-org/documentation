# Structs

Structs group named fields into a value. They are the main record type in Vex. Behavior is declared outside the struct with receiver methods.

## Define and construct a struct

~~~vex
struct Point {
    public:
    x: i32,
    y: i32,
}

fn main(): i32 {
    let point = Point { x: 3, y: 4 };
    return point.x + point.y;
}
~~~

Field declarations are grouped under visibility sections. Use public for fields that callers may read or write, readonly for fields that callers may read but not write, and private for module-internal fields. When a struct is part of a module API, export the struct declaration as well.

~~~text
export struct Account {
    private:
    internal_id: i64,

    readonly:
    balance: f64,

    public:
    name: string,
}
~~~

Keep the visibility choice close to the type definition. It is part of the data model, not a comment about how the type happens to be used today.

## Methods

Methods use an external receiver:

~~~vex
struct Rectangle {
    public:
    width: i32,
    height: i32,
}

fn (rectangle: &Rectangle) area(): i32 {
    return rectangle.width * rectangle.height;
}

fn main(): i32 {
    let rectangle = Rectangle { width: 5, height: 7 };
    return rectangle.area();
}
~~~

The receiver is an ordinary typed parameter inside parentheses. A call such as rectangle.area() supplies that parameter automatically.

A mutable receiver is written with !:

~~~text
fn (rectangle: &Rectangle!) resize(width: i32, height: i32) {
    rectangle.width = width
    rectangle.height = height
}
~~~

Mutation through a receiver requires a mutable binding at the call site and an exclusive mutable borrow. Field assignment through mutable receivers is still an area where individual compiler paths should be checked before use in a critical codebase.

## Associated functions

An associated function is qualified by the type name and has no receiver:

~~~vex
struct Point {
    public:
    x: i32,
    y: i32,
}

fn Point.origin(): Point {
    return Point { x: 0, y: 0 };
}

fn main(): i32 {
    let point = Point.origin();
    return point.x + point.y;
}
~~~

Use associated functions for constructors and type-level operations. Use receiver methods when an existing value is the subject of the operation.

## Generic structs

Structs may have type parameters:

~~~vex
struct Container<T> {
    public:
    value: T,
}

fn main(): i32 {
    let container = Container<i32> { value: 42 };
    return container.value;
}
~~~

Generic structs are implemented. Generic contracts and complex combinations with overloaded methods remain subject to the coverage described in [Language Status](/guide/language-status).

## Structs and ownership

A struct owns its fields unless a field is a reference or another explicitly borrowed type. Passing a struct by value may move it:

~~~text
fn consume(point: Point) { ... }
fn inspect(point: &Point) { ... }
~~~

Use an immutable reference when the callee only needs to read the value. Use a mutable reference when it must update the value. See [Ownership](/guide/memory/ownership) and [Borrowing](/guide/memory/borrowing) for the rules that govern these calls.

## Structs and contracts

Contracts describe required methods and can be attached to a struct declaration:

~~~text
contract Area {
    area(): i32;
}

struct Rectangle: Area {
    public:
    width: i32,
    height: i32,
}
~~~

The contract surface and validation rules are implemented, but generic contract bounds and default methods are still evolving. Use the [Contracts](/guide/types/contracts) reference for current syntax and the [Language Status](/guide/language-status) page for stability expectations.

## Guidance

- Keep data representation and behavior easy to find.
- Make fields public only when callers should depend on their layout.
- Prefer associated functions for construction instead of exposing an invalid intermediate state.
- Use references for read-only inspection and avoid unnecessary moves.
- Check mutable receiver examples against the compiler version used by the project.

## Next steps

- [Enums](/guide/types/enums)
- [Tuples](/guide/types/tuples)
- [Generics](/guide/types/generics)
- [Contracts](/guide/types/contracts)
- [Ownership](/guide/memory/ownership)
