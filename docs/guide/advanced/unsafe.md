# Unsafe Code

Vex provides `unsafe` blocks and functions for low-level operations that bypass the compiler's safety guarantees. Use sparingly and only when necessary.

::: warning
Unsafe code can cause memory corruption, undefined behavior, and security vulnerabilities. Always wrap unsafe code in safe abstractions.
:::

## Unsafe Blocks

The `unsafe { }` block allows operations that the compiler cannot verify as safe:

```vex
fn main() {
    let value: i64 = 42
    let ptr = &value as *i64
    
    // Unsafe block for raw pointer dereference
    let read_val = unsafe { *ptr }
    
    println(f"Value: {read_val}")
}
```

### What Requires Unsafe?

| Operation | Why Unsafe? |
|-----------|-------------|
| Raw pointer dereference (`*ptr`) | Pointer may be null or dangling |
| Calling `unsafe fn` | Function has manual safety requirements |
| FFI calls (`extern "C"`) | No safety guarantees for C code |
| Mutable global access | Risk of data races |

## Unsafe Functions

Declare functions with the `unsafe` keyword to signal manual safety requirements:

```vex
// Unsafe function - caller must ensure ptr is non-null
unsafe fn raw_read(ptr: *i64): i64 {
    return *ptr
}

fn main() {
    let val = 100
    let ptr = &val as *i64
    
    // Must call within unsafe block
    let result = unsafe { raw_read(ptr) }
}
```

## Raw Pointers

Vex distinguishes between references (`&T`) and raw pointers (`*T`).

### Creating Raw Pointers

```vex
let x = 42
let ptr = &x as *i32      // Immutable raw pointer
let! y = 100
let ptr_mut = &y! as *i32! // Mutable raw pointer
```

### Dereferencing

Dereferencing a raw pointer is always `unsafe`:

```vex
let x = 42
let ptr = &x as *i32
let val = unsafe { *ptr }

let! y = 100
let ptr_mut = &y! as *i32!
unsafe { *ptr_mut = 200 }
```

## Mutable Global Variables

Accessing mutable global variables requires `unsafe` due to potential data races:

```vex
let! COUNTER: i32 = 0

fn increment() {
    unsafe {
        COUNTER += 1
    }
}

fn get_count(): i32 {
    return unsafe { COUNTER }
}
```

## Best Practices

1. **Minimize Unsafe Scope**: Keep `unsafe` blocks as small as possible.
2. **Safe Wrappers**: Always prefer wrapping unsafe modules in a clean, safe Vex API.
3. **Validate Pointers**: Perform null checks or bounds checks in safe code before entering an unsafe block.

## Next Steps

- [FFI](/guide/ffi) - Calling C functions
- [Raw Pointers](/guide/advanced/pointers) - Pointer arithmetic and details
- [Freestanding](/guide/freestanding) - Using unsafe for OS kernels
