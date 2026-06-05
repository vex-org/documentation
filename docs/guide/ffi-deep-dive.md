# FFI -- Deep Dive

This page covers advanced FFI topics beyond the basic C interop guide. For basic FFI usage, see the main [FFI guide](/guide/ffi).

## C Type Mapping

### Primitive Types

| Vex Type | C Type           | Size | Notes                |
| -------- | ---------------- | ---- | -------------------- |
| `i8`     | `int8_t`         | 1    | Exact match          |
| `i16`    | `int16_t`        | 2    | Exact match          |
| `i32`    | `int32_t`        | 4    | Exact match          |
| `i64`    | `int64_t`        | 8    | Exact match          |
| `u8`     | `uint8_t`        | 1    | Exact match          |
| `u16`    | `uint16_t`       | 2    | Exact match          |
| `u32`    | `uint32_t`       | 4    | Exact match          |
| `u64`    | `uint64_t`       | 8    | Exact match          |
| `f32`    | `float`          | 4    | IEEE 754             |
| `f64`    | `double`         | 8    | IEEE 754             |
| `bool`   | `_Bool` / `bool` | 1    | 0 or 1 only          |
| `char`   | `char16_t`       | 2    | Unicode code unit    |
| `ptr`    | `void*`          | 8    | Opaque pointer       |
| `*T`     | `T*`             | 8    | Typed pointer        |
| `()`     | `void`           | 0    | Unit type for return |

### Struct Layout

`#[repr(C)]` guarantees C-compatible layout:

```vex
#[repr(C)]
struct CPoint {
    public:
    x: f64,
    y: f64,
}
// C: struct { double x; double y; }

#[repr(C)]
struct CHeader {
    public:
    version: u8,
    flags: u8,
    length: u16,    // C may insert padding before this for alignment
    data: *u8,
}
// C: struct { uint8_t version; uint8_t flags; uint16_t length; void* data; }
```

### Enums

Vex enums with `#[repr(C)]` map to C enums:

```vex
#[repr(C)]
enum CError: i32 {
    Ok = 0,
    NotFound = 1,
    Permission = 2,
    Io = 3,
}
// C: enum { CError_Ok = 0, CError_NotFound = 1, ... }
```

## Calling Conventions

### `extern "C"` -- C ABI

The default and most common calling convention:

```vex
extern "C" {
    fn malloc(size: usize): ptr
    fn free(ptr: ptr)
    fn printf(format: *u8, ...): i32
    fn memcpy(dest: ptr, src: ptr, n: usize): ptr
}
```

### `extern "system"` -- Platform System ABI

Used for OS API calls, particularly on Windows (matches Win32 API):

```vex
extern "system" {
    fn MessageBoxA(hwnd: ptr, text: *u8, caption: *u8, flags: u32): i32
    fn GetCurrentProcessId(): u32
}
```

## Linking C Libraries

### Static Linking

```bash
# Compile C library to object file
clang -c mylib.c -o mylib.o
ar rcs libmylib.a mylib.o

# Link with Vex (Vex invokes system linker)
vex compile main.vx -L . -l mylib
```

### Dynamic Linking

```bash
# Link against system library
vex compile main.vx -l pthread -l dl -l m

# Link against custom library with search path
vex compile main.vx -L /path/to/libs -l mylib

# macOS framework
vex compile main.vx --framework CoreFoundation --framework Metal
```

### Via `vex.toml`

```toml
[build]
link-libs = ["pthread", "m", "dl"]

[target.x86_64-linux.build]
link-libs = ["pthread", "m", "dl", "rt"]

[target.aarch64-apple-darwin.build]
frameworks = ["CoreFoundation", "Metal", "Security"]
```

## Exporting Vex Functions to C

Use `#[no_mangle]` and `extern "C"` to make Vex functions callable from C:

```vex
// Vex side
#[no_mangle]
extern "C" fn vex_add(a: i32, b: i32): i32 {
    return a + b
}

#[no_mangle]
extern "C" fn vex_process_data(data: *u8, len: usize): i32 {
    // ... process data ...
    return 0
}
```

```c
// C side
extern int32_t vex_add(int32_t a, int32_t b);
extern int32_t vex_process_data(uint8_t* data, size_t len);

int main() {
    int result = vex_add(3, 4);        // 7
    uint8_t buf[1024];
    vex_process_data(buf, 1024);
    return 0;
}
```

## Callbacks from C to Vex

Pass Vex functions as callbacks to C libraries:

```vex
// Vex callback (must be top-level fn, not closure)
extern "C" fn compareInts(a: ptr, b: ptr): i32 {
    let ia = unsafe { *(a as *i32) }
    let ib = unsafe { *(b as *i32) }
    return ia - ib
}

fn sortWithC(data: &[i32]!) {
    unsafe {
        qsort(data.as_ptr() as ptr, data.len(), 4, compareInts)
    }
}

extern "C" {
    fn qsort(base: ptr, nmemb: usize, size: usize,
             compar: fn(ptr, ptr): i32)
}
```

## Runtime Symbol Resolution

Vex links runtime symbols at compile time via the system linker. The C runtime functions are compiled as a static library (`libvexruntime.a`) and linked into every Vex binary automatically.

```rust
// In lib/runtime/src/lib.rs -- FFI bindings
pub mod ffi {
    extern "C" {
        pub fn vex_runtime_init() -> i32;
        pub fn vex_runtime_spawn(fn_ptr: *const u8, arg: *const u8) -> i64;
        pub fn vex_alloc(size: u64) -> *mut u8;
        pub fn vex_dealloc(ptr: *mut u8);
    }
}

// The linker resolves these symbols against the runtime static library.
// No manual symbol registration is needed.
```

## Memory Management Across FFI

### Vex Allocating for C

```vex
// Allocate memory that C will free
unsafe {
    let buf = libc_malloc(1024)     // C allocator, C can free
    let data = vex_malloc(1024)     // Vex allocator, Vex must free
}
```

### C Allocating for Vex

```vex
// C allocation must be freed by C
extern "C" {
    fn strdup(s: *u8): *u8      // C allocator
    fn free(ptr: ptr)            // C deallocator
}

unsafe {
    let c_str = strdup("hello" as *u8)
    // ... use c_str ...
    free(c_str)  // must free with C allocator
}
```

### Ownership Transfers

When Vex passes ownership to C (or vice versa), document the contract clearly:

```vex
// Vex allocates, transfers ownership to C
#[no_mangle]
extern "C" fn create_context(): ptr {
    let ctx = Context.new()      // Vex heap allocation
    return ctx.as_ptr()           // C now owns this memory
}

// C frees via provided deallocator
#[no_mangle]
extern "C" fn destroy_context(ctx: ptr) {
    let ctx = unsafe { ctx as *Context }
    // Drop runs, memory freed
}
```

## Safety Checklist for FFI

1. **Match calling conventions** -- `extern "C"` for C, `extern "system"` for OS APIs.
2. **Match types exactly** -- use the table above; never assume `int = i32` (it varies per platform).
3. **Handle null pointers** -- C functions often return NULL on failure.
4. **Manage lifetimes** -- know which side allocates and which side frees.
5. **Use `unsafe`** -- all FFI calls require `unsafe` blocks.
6. **Align structs** -- use `#[repr(C)]` for C-compatible struct layout.
7. **Thread safety** -- C libraries may not be thread-safe; document thread requirements.
8. **Error handling** -- C error codes map to `Result<T, Error>` via `match` or conversion.

## Best Practices

1. Create thin Vex wrapper types around C handles for type safety and automatic cleanup.
2. Document ownership semantics for every cross-boundary allocation.
3. Test FFI bindings with sanitizers (`--sanitize=address`) to catch memory bugs.
4. Prefer `extern "C"` blocks over per-function extern declarations.
5. Use `#[link(name = "foo")]` attribute for simple cases instead of build scripts.
