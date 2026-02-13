# Box\<T\> — Single Ownership Heap Pointer

`Box<T>` is Vex's primary smart pointer for heap allocation. It provides **single ownership** of the data it points to and automatically cleans up memory when it goes out of scope.

::: tip Prelude Type
`Box<T>` is a **prelude type** — available in all Vex programs without any `import`.
:::

## Overview

A `Box` allows you to store data on the heap rather than the stack. This is useful for:

1.  **Large data structures**: Moving a `Box` only copies a pointer, not the entire data.
2.  **Recursive types**: Enums or structs that contain themselves.
3.  **Ownership transfer**: Passing data between functions without deep copying.

```vex
fn main() {
    // Allocate an integer on the heap
    let b = Box.new(42);
    
    // Automatic cleanup happens when 'b' goes out of scope
}
```

## VUMM Integration

`Box<T>` is fully integrated with **VUMM (Unified Memory Management)**. It follows the RAII (Resource Acquisition Is Initialization) pattern:

-   **Allocation**: Happens via `Box.new(value)`.
-   **Cleanup**: The `drop()` method is called automatically by the compiler when the `Box` is no longer reachable. If `T` implements `$Drop`, its destructor is also called.

## Recursive Types

Recursive types must be "boxed" because their size cannot be determined at compile time otherwise.

```vex
enum List<T> {
    Cons(T, Box<List<T>>),
    Nil
}

fn main() {
    let list = List.Cons(1, Box.new(List.Cons(2, Box.new(List.Nil))));
}
```

## API Reference

### Constructors

| Method | Description |
|--------|-------------|
| `Box.new(value: T)` | Allocates heap memory and moves `value` into it. |

### Instance Methods

| Method | Description |
|--------|-------------|
| `drop()` | Manually triggers cleanup (rarely needed, usually automatic). |

## Memory Layout

A `Box<T>` is represented as a single machine-word pointer to the heap allocation.

```
Stack          Heap
+-------+      +-------+
| Box b | ---> | Value | (T)
+-------+      +-------+
```

## See Also

-   [VUMM](./vumm) — Vex's memory architecture
-   [Ownership](./ownership) — Ownership and borrowing
-   [Ptr\<T\>](./ptr-t) — Low-level typed pointers
