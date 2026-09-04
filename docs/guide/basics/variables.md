# Variables and Constants

Vex makes mutation explicit. A binding created with let cannot be reassigned; use let! when the binding itself must change. Constants use const and require a type annotation.

## Immutable bindings

~~~vex
fn main(): i32 {
    let count = 42;
    let name = "Vex";
    $println(name);
    return count;
}
~~~

Reassigning count or name would be a compiler error. Immutability applies to the binding; it does not mean that every value reachable through a reference is immutable.

## Mutable bindings

~~~vex
fn main(): i32 {
    let! total = 0;
    total += 10;
    total += 32;
    return total;
}
~~~

The exclamation mark is part of the declaration syntax. It is not a general mut keyword.

## Constants

Constants are declared at module scope with an explicit type:

~~~vex
const MAX_RETRIES: i32 = 3;

fn main(): i32 {
    return MAX_RETRIES;
}
~~~

Use a constant for a named value that should be available without allocating a mutable binding. Keep runtime configuration in ordinary bindings or in a configuration type.

## Type annotations and inference

An annotation follows the binding name:

~~~vex
fn main(): i32 {
    let inferred = 42;
    let explicit: i64 = 42;
    let ratio: f64 = 3.5;
    let enabled: bool = true;
    return inferred;
}
~~~

Unsuffixed integer literals default to i32 when there is no expected type. Function parameters, return types, field declarations, and explicit annotations can provide that expected type. Use an annotation when numeric width or ABI compatibility matters.

An admitted widening conversion also applies when the initializer is another
immutable local. For example, `let small: i8 = -7; let wide: i64 = small;`
preserves `-7` whether evaluated at runtime or folded at compile time. Constant
folding must retain the destination's exact type; it does not make narrowing
or signed-to-unsigned conversions implicit.

## Shadowing

A later let can introduce a new binding with the same name. The new binding hides the old one in the current scope:

~~~vex
fn main(): i32 {
    let value = 10;
    let value = value + 5;
    return value;
}
~~~

Shadowing is useful when a value changes representation during a sequence of transformations. Use distinct names when shadowing would obscure ownership or lifetime behavior.

## Destructuring

Tuple patterns can bind several values at once:

~~~vex
fn pair(): (i32, i32) {
    return (3, 4);
}

fn main(): i32 {
    let (left, right) = pair();
    return left + right;
}
~~~

Struct patterns can select exposed fields in `match` arms:

~~~text
struct Point {
    public:
    x: i32,
    y: i32,
}

let point = Point { x: 3, y: 4 }
let total = match point { Point { x, y } => x + y }
~~~

The current `let` parser accepts flat tuple bindings. For nested tuples, use
successive bindings (`let (inner, other) = value; let (left, right) = inner;`)
or a nested `match` pattern. A struct-pattern `let` declaration is not currently
accepted.

Patterns participate in ownership and visibility checks just like ordinary bindings. See [Pattern Matching](/guide/types/pattern-matching) for match arms and [Ownership](/guide/memory/ownership) for move behavior.

## Scope

A binding is visible from its declaration to the end of its enclosing block, subject to shadowing:

~~~vex
fn main(): i32 {
    let outer = 10;
    let inner = {
        let nested = 32;
        outer + nested
    };
    return inner;
}
~~~

Use narrow scopes for temporary values. This makes the lifetime of owned data easier to see and gives the checker more opportunities to end a borrow before the next operation.

## Common mistakes

- Use let! only for a binding that will actually be reassigned.
- Do not assume that a mutable binding makes a value passed by reference mutable; the reference type must also allow mutation.
- Add explicit types at FFI boundaries and for platform-sized values.
- Do not use an integer sentinel where Option or Result communicates the state directly.
- Check examples against the same compiler version used by your project.

## Next steps

- [Primitive Types](/guide/types/primitives)
- [Functions](/guide/basics/functions)
- [Ownership](/guide/memory/ownership)
- [Borrowing](/guide/memory/borrowing)
