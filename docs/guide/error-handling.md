# Error Handling

Vex represents failure and absence as values. The core language does not require exceptions: a function can return an enum, a caller can inspect it with match, and the ? operator can propagate the unsuccessful branch.

## Result-shaped values

Use a Result-shaped enum when the caller needs to distinguish success from failure:

~~~vex
enum Division {
    Ok(i32),
    Err(i32),
}

fn divide(left: i32, right: i32): Division {
    if right == 0 {
        return Division.Err(1);
    }
    return Division.Ok(left / right);
}

fn main(): i32 {
    return match divide(20, 4) {
        Division.Ok(value) => value,
        Division.Err(code) => code,
    };
}
~~~

The standard library and prelude provide Result APIs for common code. A custom enum is shown here so that the representation and matching rules are visible.

## Option-shaped values

Use Option when absence is expected rather than exceptional:

~~~vex
enum Maybe<T> {
    Some(T),
    None,
}

fn first_even(left: i32, right: i32): Maybe<i32> {
    if left % 2 == 0 {
        return Maybe.Some(left);
    }
    if right % 2 == 0 {
        return Maybe.Some(right);
    }
    return Maybe.None;
}

fn main(): i32 {
    return match first_even(3, 8) {
        Maybe.Some(value) => value,
        Maybe.None => 0,
    };
}
~~~

In application code, use the project-provided Option type rather than redefining it. See the [Option API](/guide/types/option-api).

## Propagation with ?

The question-mark operator returns the failure branch to the current function and unwraps the success branch:

~~~vex
enum Division {
    Ok(i32),
    Err(i32),
}

fn divide(left: i32, right: i32): Division {
    if right == 0 {
        return Division.Err(1);
    }
    return Division.Ok(left / right);
}

fn calculate(): Division {
    let first = divide(20, 4)?;
    let second = divide(first, 2)?;
    return Division.Ok(second + 1);
}

fn main(): i32 {
    return match calculate() {
        Division.Ok(value) => value,
        Division.Err(code) => code,
    };
}
~~~

The propagated type must be compatible with the enclosing function's return type. If several error types are involved, make the conversion explicit or use the conversion support documented by the current Result API.

## Fallback operators

The repository contains additional fallback operators for Result and Option workflows, including ?? and !>. These operators are more version-sensitive than match and ?. Treat them as experimental until the API page for your compiler version confirms the exact operand and return types.

Use text fragments when documenting a library-specific fallback:

~~~text
let value = optional ?? default_value
let value = fallible !> handle_error
~~~

Do not assume that a fallback operator is lazy unless its API documentation says so.

## Null pointers

Use typed pointer constructors and `isNull()` at FFI boundaries. Null pointers
are not a replacement for `Option` in ordinary application code:

~~~text
extern "LIBC" {
    fn malloc(size: usize): Ptr<Opaque>
}

let pointer = malloc(64)
if pointer.isNull() {
    return 1
}
~~~

Keep allocation, null checks, and deallocation inside a small FFI boundary with a documented ownership contract. See [FFI](/guide/ffi) and [Raw Pointers](/guide/types/raw-pointers).

## Choosing a representation

| Situation | Prefer |
| --- | --- |
| An operation succeeds or fails with a meaningful error | `Result<T, E>` |
| A lookup or value may be absent | `Option<T>` |
| The caller should stop and return the same failure | ? |
| A null pointer crosses a foreign ABI | nil |
| A default value is enough and the operator is supported by your version | ?? or an explicit match |

## Guidance

- Handle failure at the boundary where the program can make a useful decision.
- Use match when the success and failure paths are materially different.
- Use ? for straight-line propagation inside a function returning the same shape.
- Avoid integer sentinels when Option or Result communicates the state more clearly.
- Check the exact standard-library API before using helper methods such as map, flatMap, or rescue.

## Next steps

- [Enums](/guide/types/enums)
- [Pattern Matching](/guide/types/pattern-matching)
- [Option API](/guide/types/option-api)
- [Result API](/guide/types/result-api)
