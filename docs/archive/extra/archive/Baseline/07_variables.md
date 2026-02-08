# Variables & Constants

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/07_variables.vx`

## Overview

Vex prioritizes safety and explicitness. Variables are immutable by default, requiring the special `!` marker for mutability.

## Declaration

### Immutable Variables (`let`)
The default binding. Cannot be changed after initialization.

```vex
let x = 10;
// x = 20; // Error: Cannot assign to immutable variable 'x'

let name = "Alice";
```

### Mutable Variables (`let!`)
Use `let!` to declare a variable that can be reassigned.

```vex
let! count = 0;
count = count + 1; // OK

let! user = "Guest";
user = "Admin"; // OK
```

> [!NOTE]
> **Why `!`?** Vex uses `!` for "attention" or "side effects". Mutating state is a side effect. This makes mutable state visible at a glance.

### Constants (`const`)
Compile-time constants. Must be explicitly typed (or inferred for literals) and initialized with a constant expression.

```vex
const MAX_USERS: i32 = 100;
const PI = 3.14159;
```

## Type Inference

Vex infers types from the right-hand side. Explicit types are optional but encouraged for public APIs.

```vex
let a = 42;          // Inferred as i32 (default integer)
let b: i64 = 42;     // Explicit i64
let c = 10.5;        // Inferred as f64
```

## Shadowing

You can declare a new variable with the same name as a previous one. This "shadows" the old variable.

```vex
let x = 5;
let x = x + 1; // New 'x' is 6, old 'x' is inaccessible

let spaces = "   ";
let spaces = spaces.(); // Changing type is allowed in shadowing
```

## Destructuring

Variables can be unpacked from tuples or structs.

```vex
let (x, y) = (10, 20);
```

## Implementation Details

### AST Structure
Defined in `vex-ast/src/statements.rs`.

```rust
pub enum Statement {
    Let {
        name: String,
        type_annotation: Option<Type>,
        initializer: Option<Expression>,
        is_mutable: bool, // Checked for 'let!'
    },
    // ...
}
```

### Memory
- **Primitives (i32, f64):** Stack allocated.
- **Assignment:** By value (copy) for primitives.
