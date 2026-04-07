# Unions

Unions in Vex allow a value to be one of several distinct types. Using TypeScript-style notation `A | B`, unions provide type-safe polymorphism without the overhead of manually creating tagged `enum` wrappers.

## Core syntax

You can declare untagged unions using the `|` operator directly in type annotations:

```vex
fn process(data: string | i32) {
    // data can be either a string or an i32
}
```

Vex automatically handles the canonicalization of union types. For example, `A | B` is exactly the same as `B | A`. Type boundaries and repetitions (`A | A | B`) are deduplicated dynamically.

## Pattern Matching

To extract and safely operate on values inside a union, use a `match` expression. 

```vex
fn printParam(param: string | i32) {
    match param {
        string => {
            $println("String value: " + param);
        }
        i32 => {
            $println("Integer value: " + param.toString());
        }
    }
}
```

### Flow-sensitive casting and Coercion

Vex allows values to be **implicitly upcast** into union boundaries safely:

```vex
let my_val: string | i32 | f64 = 42; // i32 implicitly upcasts into the union limits
```

When pattern matching, the borrow-checker ensures **exhaustiveness**. This means if you omit a match case for `f64` in the `string | i32 | f64` example above, the compiler will report an error (`MissingMatchArm`) ensuring compile-time safety across all polymorphism trees.

## Memory Layout

Unlike fully untyped architectures, Vex's `A | B` is mapped to an internal compiler tagged struct structure at the LLVM IR level (`{ tag: i8, payload: [max_bytes] }`). This maintains ultra-fast dynamic dispatches while ensuring memory layout stability when calling external APIs or allocating arrays.

## See Also
- [Pattern Matching](./pattern-matching)
- [Enums](./enums)
- [Contracts](./contracts)
