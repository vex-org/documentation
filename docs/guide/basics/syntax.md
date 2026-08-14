# Syntax

This page introduces the syntax shared by most Vex programs. It focuses on forms accepted by the current compiler. Advanced operators, compiler directives, and backend-specific constructs have their own reference pages.

## Source files and comments

Vex source files use the .vx extension. Comments use // for a line and /* ... */ for a block. Documentation comments use /// and are consumed by the documentation tool when attached to a public item.

~~~text
// A line comment
/* A block comment */
/// Documentation for the next public item
~~~

## Statements and automatic semicolons

Vex accepts explicit semicolons and also inserts statement boundaries at suitable line breaks. Use one statement per line in normal code; add a semicolon when placing multiple statements on one line or when the grammar needs an unambiguous boundary.

~~~vex
fn main(): i32 {
    let first = 10
    let second = 20;
    let total = first + second
    $println(total);
    return total;
}
~~~

Automatic insertion is intentionally conservative around operators, delimiters, and struct literals. Do not split an expression after an infix operator just because the line is long.

## Declarations

The core declaration forms are:

~~~text
fn name(parameter: Type): ReturnType { ... }
struct Name { ... }
enum Name { ... }
contract Name { ... }
const NAME: Type = value
let name = value
let! mutable_name = value
~~~

Bindings are covered in [Variables](/guide/basics/variables). Functions, methods, generics, and closures are covered in [Functions](/guide/basics/functions).

## Identifiers

Identifiers are case-sensitive. They normally begin with a letter or underscore and may contain letters, digits, and underscores. Keep type names distinct from value names; Vex uses the spelling and context of a path to resolve types, functions, constructors, and fields.

~~~text
counter
user_name
Point3
_temporary
~~~

The language reserves keywords such as fn, let, struct, enum, contract, if, else, elif, for, while, loop, match, return, break, continue, defer, go, async, await, import, export, unsafe, extern, self, true, false, and nil.

## Literals

Vex supports integer, floating-point, boolean, string, character, and null literals.

~~~vex
fn main(): i32 {
    let decimal: i32 = 42;
    let hexadecimal: i32 = 0x2a;
    let binary: i32 = 0b101010;
    let ratio: f64 = 3.5;
    let enabled: bool = true;
    let greeting = "hello";
    $println(greeting);
    if enabled && decimal == hexadecimal + binary - 42 {
        return 0;
    }
    return 1;
}
~~~

Unsuffixed integer literals default to i32 when there is no expected type. An expected parameter or return type can guide inference. Add an explicit annotation when the width is part of the program's meaning or ABI.

Numeric suffixes and the complete primitive type list are documented in [Primitive Types](/guide/types/primitives).

## Strings and formatting

Normal strings use double quotes and support escape sequences. Vex also has formatted string literals with an f prefix:

~~~vex
fn main(): i32 {
    let name = "Vex";
    let message = f"Hello, {name}!";
    $println(message);
    return 0;
}
~~~

Backtick template literals and compile-time rendering are separate features. Read [Template Literals](/guide/basics/template-literals) before using them in generated output; the feature is still evolving.

## Arrays, tuples, and blocks

Array and tuple literals are expressions. A block can be used as the body of a control-flow construct or function; use return when the value must be returned from the enclosing function.

~~~vex
fn first_pair(): (i32, i32) {
    let values: [i32; 2] = [3, 4];
    let pair = (values[0], values[1]);
    return pair;
}

fn main(): i32 {
    let (left, right) = first_pair();
    return left + right;
}
~~~

See [Arrays](/guide/types/arrays) and [Tuples](/guide/types/tuples) for indexing, repetition, and ownership behavior.

## Operators

The core operator groups are:

| Group | Operators |
| --- | --- |
| Arithmetic | +, -, *, /, % |
| Comparison | ==, !=, <, <=, >, >= |
| Boolean | &&, ||, ! |
| Bitwise | &, |, ^, ~, <<, >> |
| Assignment | =, +=, -=, *=, /=, %=, &=, |=, ^=, <<=, >>= |
| Access | ., [], function call () |
| Range | .., ..= |
| Error flow | ?, ??, and !> where supported by the Result/Option APIs |

SIMD-oriented operators are documented separately because their type rules depend on arrays, masks, tensors, or SIR lowering. Do not assume that a scalar operator is automatically vectorized.

## Expressions and control flow

if, match, and loops can appear inside functions. if and match can produce values when every branch has a compatible result:

~~~vex
fn label(value: i32): i32 {
    return match value {
        0 => 100,
        1 | 2 => 200,
        _ => 300,
    };
}

fn main(): i32 {
    let result = if label(1) == 200 { 1 } else { 0 };
    return result;
}
~~~

For detailed grammar and semantics, continue with [Control Flow](/guide/basics/control-flow), [Loops](/guide/basics/loops), and [Pattern Matching](/guide/types/pattern-matching).
