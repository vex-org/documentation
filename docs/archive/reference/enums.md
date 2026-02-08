# Enums

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

Enums (Enumerations) allow a value to be one of several variants. Vex enums are **Algebraic Data Types**, meaning they can carry data.

---

## 1. Definition

### C-Style Enums
Simple list of values. (Default discriminant starts at 0).

```vex
enum Status {
    Active,
    Inactive,
    Pending,
}
```

### Explicit Discriminants
You can assign specific integer values.

```vex
enum HttpStatus {
    Ok = 200,
    NotFound = 404,
    Error = 500,
}
```

---

## 2. Variants with Data

Enums can act as Tagged Unions.

### Tuple Variants
Variants can hold positional data.

```vex
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(string),
}

let localhost = IpAddr.V4(127, 0, 0, 1);
```

### Generic Enums
Enums can be generic (like `Option<T>`).

```vex
enum BoxedValue<T> {
    Raw(T),
    Boxed(Box<T>),
}
```

---

## 3. Built-in Core Enums

Vex optimizes two specific enums at the compiler level for null safety and error handling.

### Option\<T>
Replaces `null`.

```vex
enum Option<T> {
    Some(T),
    None,
}
```

### Result\<T, E>
Replaces exceptions.

```vex
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

> [!IMPORTANT]
> These are treated specially by the compiler. `match` on them can be optimized, and memory layout is compressed (e.g. `Option<&T>` fits in a single pointer, with 0 representing `None`).

---

## 4. Pattern Matching

Use `match` to extract data.

```vex
let msg = IpAddr.V4(127, 0, 0, 1);

match msg {
    IpAddr.V4(a, b, c, d) => {
        (f"IPv4: {a}.{b}.{c}.{d}");
    }
    IpAddr.V6(s) => {
        (f"IPv6: {s}");
    }
}
```

### Exhaustiveness
All variants must be covered, or use `_` (wildcard).

```vex
match status {
    Status.Active => { ... }
    _ => { ("Other status"); }
}
```

---

## 5. Methods

Like structs, enums can have methods defined via External (UFCS) syntax.

```vex
fn (self: &IpAddr) is_loopback(): bool {
    match *self {
        IpAddr.V4(127, 0, 0, 1) => return true;
        _ => return false;
    }
}
```
