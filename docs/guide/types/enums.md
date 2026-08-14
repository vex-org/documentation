# Enums

Enums model a value chosen from a finite set of variants. A variant may be a tag on its own or carry one or more values. Enums are useful for state machines, parser results, and explicit success or failure.

## Simple enums

~~~vex
enum Color {
    Red,
    Green,
    Blue,
}

fn main(): i32 {
    let color = Color.Green;
    return match color {
        Color.Red => 1,
        Color.Green => 2,
        Color.Blue => 3,
    };
}
~~~

A match expression must account for the variants that the compiler can see. Use a wildcard only when the fallback is intentional.

## Payload variants

A variant can carry typed data:

~~~vex
enum Message {
    Quit,
    Move(i32, i32),
    Write(string),
}

fn describe(message: Message): i32 {
    return match message {
        Message.Quit => 0,
        Message.Move(x, y) => x + y,
        Message.Write(text) => 1,
    };
}

fn main(): i32 {
    return describe(Message.Move(3, 4));
}
~~~

The payload pattern introduces local bindings for the values stored in the variant. Those bindings follow the same ownership rules as other local values.

## Generic enums

Enums can be generic:

~~~vex
enum Outcome<T, E> {
    Ok(T),
    Err(E),
}

fn divide(left: i32, right: i32): Outcome<i32, i32> {
    if right == 0 {
        return Outcome.Err(1);
    }
    return Outcome.Ok(left / right);
}

fn main(): i32 {
    return match divide(20, 4) {
        Outcome.Ok(value) => value,
        Outcome.Err(code) => code,
    };
}
~~~

Generic enums are implemented. More advanced combinations with generic contracts and overloaded functions remain subject to the compiler's current coverage.

## Matching patterns

Vex supports literal patterns, constructor patterns, wildcard patterns, and or-patterns:

~~~vex
fn classify(value: i32): i32 {
    return match value {
        0 => 0,
        1 | 2 | 3 => 1,
        _ => 2,
    };
}

fn main(): i32 {
    return classify(2);
}
~~~

Pattern matching is an expression when all arms produce compatible values. Use a block arm when an arm needs several statements:

~~~text
match value {
    0 => { $println("zero"); return 0; }
    _ => { $println("other"); return 1; }
}
~~~

## Option and Result

Option and Result are standard enum-shaped values used by the language and library:

- `Option<T>` represents a value that may be absent, with `Some(value)` and `None` variants.
- `Result<T, E>` represents success or failure, with `Ok(value)` and `Err(error)` variants.

A complete Option example:

~~~vex
enum Option<T> {
    Some(T),
    None,
}

fn value_or_zero(value: Option<i32>): i32 {
    return match value {
        Some(number) => number,
        None => 0,
    };
}

fn main(): i32 {
    let value: Option<i32> = Some(42);
    return value_or_zero(value);
}
~~~

In normal application code, use the prelude or standard-library definitions supplied by the project rather than redefining these types. The explicit definition above shows the shape accepted by the compiler and keeps the matching rules visible.

The convenience methods on Option and Result are documented in the [Option API](/guide/types/option-api) and [Result API](/guide/types/result-api). Those APIs are evolving more quickly than the core enum syntax.

## Constructors and qualification

Constructors can be written with the enum name when qualification is useful:

~~~text
Outcome.Ok(42)
Outcome.Err(1)
~~~

For a known expected enum type, the shorter constructor form may also be accepted:

~~~text
Ok(42)
Err(1)
~~~

Prefer the qualified form in public examples when several enum types have similarly named variants.

## Guidance

Use an enum when the set of valid states is part of the type. Prefer Option over a sentinel value for absence and Result over an integer error code for recoverable failure. Keep payloads small and meaningful; if a variant contains many unrelated fields, a struct is usually clearer.

## Next steps

- [Pattern Matching](/guide/types/pattern-matching)
- [Error Handling](/guide/error-handling)
- [Option API](/guide/types/option-api)
- [Result API](/guide/types/result-api)
