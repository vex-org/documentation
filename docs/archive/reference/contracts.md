# Contracts (Interfaces)

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

Contracts define shared behavior (polymorphism). They are equivalent to **Traits** in Rust or **Interfaces** in other languages.

---

## 1. Definition

Use the `contract` keyword.

```vex
contract Display {
    // Method signature
    fn show();
}

contract Hash {
    fn hash(): u64;
}
```

### Associated Types
Contracts can define placeholder types to be specified by the implementor.

```vex
contract Iterator {
    type Item;
    fn next(): Option<Item>;
}
```

---

## 2. Implementation

To implement a contract for a type, use an `impl` block. This is explicit (unlike Go).

```vex
struct User {
    name: string,
}

impl Display for User {
    fn show() {
        (self.name);
    }
}
```

> [!NOTE]
> Vex previously supported `struct User impl Display { ... }` (Inline). This is getting phased out in favor of clean `impl Contract for Type` blocks to separate data from behavior.

### Implementing Iterator
```vex
struct Counter {
    count: i32,
}

impl Iterator for Counter {
    type Item = i32;

    fn next(): Option<i32> {
        let val = self.count;
        self.count = self.count + 1;
        return Some(val);
    }
}
```

---

## 3. Usage (Bounds)

Use contracts to constrain generic types.

```vex
fn print_any<T: Display>(item: T) {
    item.show();
}
```

### Where Clauses
For complex bounds:

```vex
fn copy_and_print<T>(item: T)
where
    T: Display + Clone
{
    let copy = item.clone();
    copy.show();
}
```

---

## 4. Derived Contracts
The compiler can automatically derive implementations for common contracts.

```vex
// (Future Feature: derive syntax)
// struct Point impl , Clone { ... }
```

Currently, you must implement them manually or use built-in intrinsics.

## 5. Contract Inheritance

Contracts can inherit from other contracts.

```vex
contract Debug: Display {
    fn debug_print();
}
```
A type implementing `Debug` must also implement `Display`.
