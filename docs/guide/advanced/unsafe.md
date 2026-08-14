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
    let ptr = &value as Ptr<i64>
    
    // Unsafe block for raw pointer dereference
    let read_val = unsafe { ptr.read() }
    
    println(f"Value: {read_val}")
}
```

### What Requires Unsafe?

| Operation | Why Unsafe? |
|-----------|-------------|
| Raw pointer read/write | Pointer may be null or dangling |
| Calling `unsafe fn` | Function has manual safety requirements |
| Foreign calls (`LIBC`/`SYSTEM`/`NATIVE`) | No safety guarantees for foreign code |
| Mutable global access | Risk of data races |

## Unsafe Functions

Declare functions with the `unsafe` keyword to signal manual safety requirements:

```vex
// Unsafe function - caller must ensure ptr is non-null
unsafe fn rawRead(ptr: Ptr<i64>): i64 {
    return ptr.read()
}

fn main() {
    let val = 100
    let ptr = &val as Ptr<i64>
    
    // Must call within unsafe block
    let result = unsafe { rawRead(ptr) }
}
```

## Raw Pointers

Vex distinguishes between references (`&T`) and canonical raw pointers
(`Ptr<T>` and `Ptr<T!>`).

### Creating Raw Pointers

```vex
let x = 42
let ptr = &x as Ptr<i32>       // Readable raw pointer
let! y = 100
let ptrMut = &y as Ptr<i32!>   // Writable-pointee capability
```

### Dereferencing

Dereferencing a raw pointer is always `unsafe`:

```vex
let x = 42
let ptr = &x as Ptr<i32>
let val = unsafe { ptr.read() }

let! y = 100
let ptrMut = &y as Ptr<i32!>
unsafe { ptrMut.write(200) }
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
