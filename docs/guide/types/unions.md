# Unions

> **Type-safe polymorphism without tags.** `A | B` syntax for values that can be one of several types.

## Syntax

```vex
fn process(data: string | i32) {
    // data can be either string or i32
}
```

Union types canonicalize automatically: `A | B` ≡ `B | A`, duplicates removed.

## Pattern Matching

```vex
fn printParam(param: string | i32) {
    match param {
        string => $println("String: " + param),
        i32    => $println("Int: " + param.toString()),
    }
}
```

Borrow checker ensures **exhaustiveness** — missing a variant is a compile error.

## Upcasting

Values implicitly upcast into union types:

```vex
let val: string | i32 | f64 = 42;      // i32 → string|i32|f64
let val2: string | i32 | f64 = "hi";   // string → string|i32|f64
```

## Memory Layout

```text
Union value = { tag: i8, payload: [max_size bytes] }
```

LLVM IR'de tagged struct olarak temsil edilir. `tag` hangi variant'ın aktif olduğunu belirtir, `payload` en büyük variant boyutu kadar yer kaplar.

## Unions vs Enums

| Feature | Union (`A \| B`) | Enum |
|---------|:----------------:|:----:|
| Named variants | ❌ | ✅ |
| Payload types | ✅ | ✅ |
| Exhaustive check | ✅ | ✅ |
| Zero-cost | ❌ (tag) | ✅ (niche opt.) |
| Third-party types | ✅ | ❌ |

## See Also

- [Pattern Matching](./pattern-matching.md)
- [Enums](./enums.md)
- [Contracts](./contracts)
