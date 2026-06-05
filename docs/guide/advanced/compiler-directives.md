# Compiler Directives and Attributes

Compiler directives control how the Vex compiler processes your code. They are written with `#[]` syntax and applied to functions, structs, or modules.

## Function Directives

### `#[inline]` -- Inline Hint

Suggests the compiler should inline the function at call sites:

```vex
#[inline]
fn add(a: i32, b: i32): i32 {
    return a + b
}

// Always inline, even in debug builds
#[inline(always)]
fn smallHelper(x: i32): i32 { return x * 2 }

// Never inline (useful for debugging or large cold functions)
#[inline(never)]
fn rarelyUsed() { ... }
```

### `#[no_mangle]` -- Preserve Symbol Name

Prevents the compiler from mangling the function name. Required for FFI and entry points:

```vex
#[no_mangle]
extern "C" fn vex_main(): i32 {
    return 0
}

// Without #[no_mangle], the symbol becomes something like _ZN8myModule6myFunc...
// With #[no_mangle], the symbol stays as "myFunc"
#[no_mangle]
fn myFunc() { }
```

### `#[export]` -- Export Symbol

Makes a function visible outside the current compilation unit:

```vex
#[export]
fn publicApi(x: i32): i32 {
    return x * 2
}
```

### `#[cold]` -- Cold Path Marker

Marks a function as rarely executed, helping the optimizer place it away from hot code:

```vex
#[cold]
fn handleError(err: Error) {
    $eprintln(f"Fatal: {err}")
    $abort(1)
}

fn process(data: Data) {
    if !data.isValid() {
        handleError(Error.new("invalid"))  // branch predictor: unlikely taken
    }
    // ... hot path continues here ...
}
```

### `#[target_feature]` -- CPU Feature Gate

Enables specific CPU features for a function:

```vex
#[target_feature(enable = "avx512f")]
fn avx512Kernel(data: Tensor<f64, 8>): f64 {
    return <+ data    // uses AVX-512 instructions
}

#[target_feature(enable = "neon")]
fn armSimdKernel(data: Tensor<f32, 4>): f32 {
    return <+ data    // uses ARM NEON instructions
}
```

## Struct Directives

### `#[repr(C)]` -- C-Compatible Layout

Guarantees the struct has the same memory layout as a C struct:

```vex
#[repr(C)]
struct CPoint {
    public:
    x: f64,
    y: f64,
}
// Memory layout matches: struct { double x; double y; }
```

### `#[repr(packed)]` -- No Padding

Removes all padding between fields:

```vex
#[repr(packed)]
struct PackedHeader {
    public:
    version: u8,      // 1 byte
    length: u16,      // 2 bytes, immediately after version (no padding)
    crc: u32,         // 4 bytes
}
// Total: 7 bytes (not 8 with padding)
```

### `#[repr(align(N))]` -- Override Alignment

Sets a specific alignment for the struct:

```vex
#[repr(align(64))]
struct CacheLineAligned {
    public:
    data: [u8; 64],
}
// Struct is aligned to 64-byte boundary (cache line)
```

## Conditional Compilation

### `#if` / `#elif` / `#else` / `#endif`

Conditionally include or exclude code based on compile-time conditions:

```vex
#if target_os == "macos"
    fn getConfigDir(): string { return "~/Library/Application Support" }
#elif target_os == "linux"
    fn getConfigDir(): string {
        let xdg = env("XDG_CONFIG_HOME")
        return xdg.isNone() ? "~/.config" : xdg.unwrap()
    }
#elif target_os == "windows"
    fn getConfigDir(): string { return env("APPDATA").unwrap() }
#else
    #error("Unsupported platform")
#endif
```

### Platform Conditions

| Condition        | Values                                         |
| ---------------- | ---------------------------------------------- |
| `target_os`      | `"macos"`, `"linux"`, `"freebsd"`, `"windows"` |
| `target_arch`    | `"x86_64"`, `"arm64"`, `"riscv64"`             |
| `target_feature` | `"avx2"`, `"avx512f"`, `"neon"`, `"sve"`       |
| `debug`          | `true` in debug builds, `false` in release     |

```vex
#if target_arch == "x86_64"
    #if target_feature == "avx512f"
        fn simdWidth(): i32 { return 512 }
    #elif target_feature == "avx2"
        fn simdWidth(): i32 { return 256 }
    #else
        fn simdWidth(): i32 { return 128 }
    #endif
#endif
```

### `#error` -- Compile-Time Error

Emits a compile error with a message:

```vex
#if target_os == "windows"
    #error("Windows support is experimental. Use at your own risk.")
#endif
```

### `#warning` -- Compile-Time Warning

Emits a compile warning:

```vex
#if !target_feature == "avx2"
    #warning("AVX2 not available -- some optimizations disabled")
#endif
```

### Feature Flags

```vex
#if feature == "experimental_gpu"
    graph fn myKernel(data: Tensor<f32>!) { ... }
#endif

// Set via: vex run --feature experimental_gpu main.vx
```

## Module-Level Directives

### `#![no_std]` -- Freestanding Mode

Opt out of the standard library (for embedded/bare-metal):

```vex
// At the top of the file, before any code
#![no_std]

// No stdlib available -- must provide your own allocator and panic handler
fn main() { ... }
```

### `#![feature(...)]` -- Opt-in to Experimental Features

```vex
#![feature(gpu_kernels)]
#![feature(simd512)]
```

## Intrinsic Compiler Functions

Compiler intrinsics start with `#` and are resolved at compile time:

| Intrinsic                         | Returns | Description                               |
| --------------------------------- | ------- | ----------------------------------------- |
| `#sizeof<T>()`                    | `usize` | Size of type T in bytes                   |
| `#alignof<T>()`                   | `usize` | Required alignment of type T              |
| `#offset_ptr_idx(ptr, idx, size)` | `*T`    | Offset a pointer by index \* element size |
| `#typeof(expr)`                   | type    | Type of an expression (comptime only)     |
| `#embed("file")`                  | `&[u8]` | Embed file contents at compile time       |
| `#line()`                         | `i32`   | Current source line number                |
| `#file()`                         | `str`   | Current source file path                  |
| `#column()`                       | `i32`   | Current source column number              |
| `#panic("msg")`                   | `never` | Compile-time panic (stops compilation)    |

```vex
// Size checks at compile time
const HEADER_SIZE = #sizeof<NetworkHeader>()
#if #sizeof<NetworkHeader>() != 16
    #error("NetworkHeader must be exactly 16 bytes")
#endif

// Embed assets at compile time
let logo_data = #embed("assets/logo.png")
// logo_data: &[u8] -- embedded in the binary, no runtime file I/O

// Source location for debugging
fn debugTrace() {
    $eprintln(f"[{ #file() }:{ #line() }] trace point")
}
```

## Best Practices

1. Use `#[inline]` sparingly -- the compiler's own heuristics are usually correct.
2. Always use `#[no_mangle]` with `extern "C"` functions.
3. Use `#[repr(C)]` for any struct passed across FFI boundaries.
4. Use `#[cold]` on error handlers and panic paths to improve hot-path code layout.
5. Prefer `#if target_os` over runtime OS checks for platform-specific code.
6. Use `#error` to catch unsupported configurations at compile time, not runtime.
7. Keep `#![feature(...)]` usage minimal -- experimental features may change without notice.

## Related Pages

- [Comptime](/guide/advanced/comptime) -- compile-time code execution
- [Freestanding](/guide/freestanding) -- `#![no_std]` mode
- [Builtins](/guide/advanced/builtins) -- `#`-prefixed intrinsics
