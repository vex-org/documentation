# Comparison Operators

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/04_comparison_ops.vx` (Hypothetical path, ensuring consistency)

## Overview

Comparison operators compare two values and return a boolean result (`true` or `false`). They apply to numbers, strings, and pointers.

## Equality Operators

Values can be compared for equality or inequality.

| Operator | Name | Description |
| :---: | :--- | :--- |
| `==` | Equal | True if operands are equal |
| `!=` | Not Equal | True if operands are different |

```vex
let score = 100;
if score == 100 {
    ("Perfect!");
}

if score != 0 {
    ("Non-zero");
}
```

## Ordering Operators

Used to determine relative order (less than, greater than).

| Operator | Name | Description |
| :---: | :--- | :--- |
| `<` | Less Than | True if left < right |
| `<=` | Less or Equal | True if left <= right |
| `>` | Greater Than | True if left > right |
| `>=` | Greater or Equal | True if left >= right |

```vex
let age = 18;
let can_vote = age >= 18; // true

let temp = 20.5;
let is_cold = temp < 10.0; // false
```

## Implementation Details

### Type Safety
Operands must generally be of the same type.

```vex
let a: i32 = 10;
let b: i64 = 10;
// let eq = a == b; // Error: Type mismatch
let eq = (a as i64) == b; // OK
```

### Pointer Comparison
Pointers are compared by memory address.

```vex
let x = 10;
let p1 = &x;
let p2 = &x;
(p1 == p2); // Same address
```

### String Comparison
Strings are compared by **content**, not reference.

```vex
let s1 = "hello";
let s2 = "hello";
(s1 == s2); // true (lexicographical check)
```

## AST Representation
Defined in `vex-ast/src/expressions.rs`.

```rust
pub enum BinaryOp {
    Eq, NotEq,
    Lt, LtEq, Gt, GtEq,
    // ...
}
```
