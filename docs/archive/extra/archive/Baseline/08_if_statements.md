# If Statements

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/08_if_statements.vx`

## Overview

Conditional execution using `if`, `elif`, and `else`.

## Syntax

Vex does **not** require parentheses around the condition, but **does** require braces `{}` for blocks.

```vex
let score = 85;

if score >= 90 {
    ("Grade: A");
} elif score >= 80 {
    ("Grade: B");
} else {
    ("Grade: C");
}
```

## Boolean Condition
The condition must evaluate to a `bool`. Vex does not have "truthy" or "falsy" values for integers or pointers (unlike C/JS).

```vex
let x = 1;
// if x { ... } // Error: expected bool, found i32
if x != 0 { ... } // OK
```

## Expression usage
`if` is an expression in Vex and can return values (similar to Rust).

```vex
let status = if age >= 18 { "Adult" } else { "Minor" };
```
