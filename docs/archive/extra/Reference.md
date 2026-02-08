# Vex Reference Guide

**This is a supplementary reference document containing legacy notes and design thoughts.**

---

## Method Definitions

Vex uses a flexible and pragmatic syntax for defining methods, depending on the context.

### 1. Inline Methods (Struct & Contract)

**Goal:** Prevent code duplication and keep definitions clean.

- **Definition:** Mutability is indicated by a `!` at the end of the method signature. Receiver `self` is implicit.
- **Access:** Fields are accessed via `self`.
- **Call:** Called without `!`. Compiler checks mutability of the instance.

```vex
struct Point {
    x: i32,
    y: i32,
}

impl Point {
    fn move_by!(dx: i32, dy: i32) {
        self.x += dx;
        self.y += dy;
    }
}
```

### 2. External Methods (Go-Style)

**Goal:** Explicit receiver definition.

- **Definition:** Receiver is explicit `(self: &Point!)`.
- **Access:** Fields accessed via `self.`.

```vex
fn (self: &Point!) reset() {
    self.x = 0;
    self.y = 0;
}
```

---

*Note: This document contains older design notes. Refer to `specs/` for the authoritative specification.*
