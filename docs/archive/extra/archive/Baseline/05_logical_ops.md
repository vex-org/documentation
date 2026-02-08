# Logical Operators

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/05_logical_ops.vx`

## Overview

Logical operators perform boolean algebra. They are used to combine conditional logic expressions.

## Operators

| Operator | Name | Syntax | Description |
| :---: | :--- | :--- | :--- |
| `&&` | Logical AND | `a && b` | True if BOTH are true |
| `\|\|` | Logical OR | `a \|\| b` | True if EITHER is true |
| `!` | Logical NOT | `!a` | Inverts the value |

## Examples

```vex
let has_ticket = true;
let is_banned = false;

if has_ticket && !is_banned {
    ("Welcome!");
}

let is_admin = false;
let is_owner = true;

if is_admin || is_owner {
    ("Access Granted");
}
```

## Short-Circuit Evaluation

Vex logical operators are **short-circuiting**. This means the second operand is evaluated only if necessary.

### AND (`&&`)
If the left operand is `false`, the entire expression is `false`. The right operand is **skipped**.

```vex
// 'dangerous_check()' is NEVER called if x is acceptable
if x != nil && x.dangerous_check() {
    // ...
}
```

### OR (`||`)
If the left operand is `true`, the entire expression is `true`. The right operand is **skipped**.

```vex
// 'compute_fallback()' is skipped if user is cached
let user = get_cached_user() || compute_fallback();
```

## Implementation Details

### AST Representation
Defined in `vex-ast/src/expressions.rs`.

```rust
pub enum BinaryOp {
    And, // &&
    Or,  // ||
}

pub enum UnaryOp {
    Not, // !
}
```

### Codegen
Implemented in `codegen_ast/expressions/operators.rs` using LLVM branching (control flow) to ensure short-circuit behavior is respected at the machine level.
