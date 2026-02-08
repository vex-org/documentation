# Foreign Function Interface (FFI)

Vex provides seamless interoperability with C libraries through its FFI system. This allows calling C functions and exposing Vex functions to C code.

## Calling C Functions

### Basic FFI

```vex
// Declare external C functions
extern "C" {
    fn puts(s: *u8): i32
    fn strlen(s: *u8): u64
    fn malloc(size: u64): *u8!    // *T! = mutable pointer
    fn free(ptr: *u8!)
}

fn main(): i32 {
    unsafe {
        puts("Hello from C!")
    }
    return 0
}
```

### Linking Libraries

```vex
// Link system library
extern "C" from "m" {    // libm (math library)
    fn sin(x: f64): f64
    fn cos(x: f64): f64
    fn sqrt(x: f64): f64
}
```

## Pointer Types

Vex uses explicit pointer syntax:

| Vex Type | C Type | Description |
|----------|--------|-------------|
| `*T` | `const T*` | Immutable raw pointer |
| `*T!` | `T*` | Mutable raw pointer |
| `**T` | `const T**` | Pointer to pointer (immutable) |
| `**T!` | `T**` | Pointer to pointer (mutable) |

## C Types Mapping

| Vex Type | C Type |
|----------|--------|
| `i32` | `int32_t`, `int` |
| `usize` | `size_t` |
| `*u8` | `const char*` |

## Structs

 Use `repr(C)` for C-compatible limits:

```vex
struct Point repr(C) {
    x: f64,
    y: f64
}
```

## Memory Safety

### Unsafe Blocks

FFI calls require `unsafe` blocks:

```vex
fn use_ffi() {
    unsafe {
        let ptr = malloc(1024)
        if ptr == ptr.null() {
            panic("allocation failed")
        }
        free(ptr)
    }
}
```

### Safe Wrappers

Create safe wrappers around unsafe FFI:

```vex
// Unsafe FFI
extern "C" {
    fn dangerous_function(ptr: *u8!, len: u64): i32
}

// Safe wrapper
export fn safe_wrapper(data: Vec<u8>!): Result<(), error> {
    let result = unsafe {
        dangerous_function(data.as_ptr()!, data.len() as u64)
    }
    
    if result == 0 {
        return Ok(())
    } else {
        return Err(error.new(f"FFI error code: {result}"))
    }
}
```

### Unsafe Functions

For functions that are inherently unsafe manually declare them `unsafe`:

```vex
// Unsafe function - caller must ensure safety
unsafe fn raw_access(ptr: *i32!): i32 {
    return *ptr
}

// Must be called in unsafe block
unsafe {
    let value = raw_access(some_ptr)
}
```

## Platform-Specific Code

```vex
$if TARGET_OS == "linux" {
    extern "C" {
        fn epoll_create(size: i32): i32
    }
}
```

## Best Practices

1.  **Always Wrap Unsafe Code**: Don't leak `unsafe` or raw pointers into your public API unless designed for low-level systems programming.
2.  **Handle Null Pointers**: Check for `ptr.null()` return values from C allocations.
3.  **Use `repr(C)`**: Always mark structs passed to C with `repr(C)`.

## Next Steps

- [Standard Library](/guide/stdlib) - Built-in utilities
- [Memory Management](/guide/memory/ownership) - Safe memory model
