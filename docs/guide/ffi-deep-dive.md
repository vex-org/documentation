# FFI — Deep Dive

This page covers ABI, symbol export, callbacks, and ownership across a foreign
boundary. See the shorter [FFI guide](/guide/ffi) for basic imports.

## Scalar type mapping

Use fixed-width types whenever the foreign ABI permits it.

| Vex | C |
| --- | --- |
| `i8`, `u8` | `int8_t`, `uint8_t` |
| `i16`, `u16` | `int16_t`, `uint16_t` |
| `i32`, `u32` | `int32_t`, `uint32_t` |
| `i64`, `u64` | `int64_t`, `uint64_t` |
| `f32`, `f64` | `float`, `double` |
| `bool` | `_Bool` / `bool` when ABI-compatible |
| `char` | 32-bit Vex Unicode scalar; map explicitly, usually to `uint32_t` |
| `Ptr<Opaque>` | `void*` |
| `Ptr<T>`, `Ptr<T!>` | `const T*`, `T*` by capability contract |
| `()` return | `void` |

Pointer width depends on the target. Use `usize` only for C `size_t`-like
parameters and verify the target ABI.

## Importing foreign functions

```vex
extern "LIBC" {
    fn malloc(size: usize): Ptr<Opaque!>
    fn free(memory: Ptr<Opaque>)
    fn memcpy(dst: Ptr<Opaque!>, src: Ptr<Opaque>, size: usize): Ptr<Opaque!>
}
```

Extern calls are unsafe by default:

```vex
let memory = unsafe { malloc(128) }
if !memory.isNull() {
    unsafe { free(memory) }
}
```

The provider belongs to the extern block. `LIBC` identifies the owner; it is
not a generic spelling for every function that happens to use the C calling
convention. Use `SYSTEM from "library"` for an OS library and `NATIVE from
"feature"` for a package-owned artifact.

## Exporting a C ABI symbol

The stable spelling for a defined, unmangled C ABI export is `export "C" fn`:

```vex
export "C" fn vexAdd(a: i32, b: i32): i32 {
    return a + b
}

export "C" fn vexProcess(data: Ptr<u8>, length: usize): i32 {
    if data.isNull() {
        return -1
    }
    // Validate length before accessing data.
    return 0
}
```

```c
extern int32_t vexAdd(int32_t a, int32_t b);
extern int32_t vexProcess(const uint8_t *data, size_t length);
```

Rust-style `#[no_mangle]` is not Vex syntax and is not needed. The export ABI
spelling controls the unmangled wrapper symbol.

## Aggregate layout

Do not assume that a normal Vex struct or enum automatically matches a C
aggregate. For a stable boundary:

1. prefer scalar parameters and opaque handles;
2. use fixed-width fields;
3. verify size, alignment, and offsets with compile-time assertions;
4. test the layout from both languages for every supported target.

```vex
struct CHeader {
    version: u32,
    flags: u32,
    payload: Ptr<Opaque>,
}

#Diag.staticAssert(#Type.sizeOf<CHeader>() == 16, "CHeader size mismatch")
#Diag.staticAssert(#Type.offsetOf<CHeader>("payload") == 8, "payload offset mismatch")
```

Attribute spellings such as `#[repr(C)]` are not part of the stable Vex source
surface. If the verified native layout is insufficient, use explicit
serialization or an opaque C-owned object.

## Callbacks

Declare the callback shape in the foreign function signature and pass a
top-level function with a compatible ABI:

```vex
fn compareInts(a: Ptr<Opaque>, b: Ptr<Opaque>): i32 {
    let left = unsafe { (a as Ptr<i32>).read() }
    let right = unsafe { (b as Ptr<i32>).read() }
    return left - right
}

extern "LIBC" {
    fn qsort(
        base: Ptr<Opaque!>,
        count: usize,
        elementSize: usize,
        compare: fn(Ptr<Opaque>, Ptr<Opaque>): i32
    )
}
```

Do not pass a capturing closure unless the foreign API also accepts an explicit
context pointer and the wrapper owns that context for the callback's full
lifetime.

## Allocation ownership

Allocator identity must cross the boundary with the pointer contract.

```vex
extern "NATIVE" from "foreign_objects" {
    fn foreignCreate(): Ptr<Opaque>
    fn foreignDestroy(value: Ptr<Opaque>)
}

let foreign = unsafe { foreignCreate() }
unsafe { foreignDestroy(foreign) }

let size = 256 as usize
let vexMemory = Mem.alloc(size)
// Foreign code may borrow vexMemory, but Vex retains ownership.
Mem.free(vexMemory, size)
```

If ownership is transferred, export a matching destroy function instead of
asking the other language to guess the allocator:

```vex
export "C" fn vexBufferDestroy(memory: Ptr<Opaque>, size: usize) {
    Mem.free(memory, size)
}
```

## Linking

Native libraries are selected by the feature named in `extern "NATIVE" from
"..."`. The owning `vex.json` maps that feature to target-specific `static`,
`dynamic`, or `bitcode` artifacts. Only features reached by codegen contribute
link arguments or runtime files.

On freestanding targets, activated `LIBC` uses are rejected before linking.
With `--no-runtime`, an activated `VEX` symbol must have a local VexArch
implementation; Vex reports `E0FFI36` instead of deferring the problem to an
undefined-symbol linker error.
If an activated static native artifact still leaves known libc/TLS symbols
undefined, Vex reports that exact active feature instead of silently producing
a hosted binary.

## Safety checklist

1. Match ABI, scalar width, pointer mutability, and variadic signatures exactly.
2. Treat every extern call and returned pointer as unsafe until validated.
3. Define nullability, ownership, allocator, lifetime, and thread rules.
4. Keep exported wrappers thin; convert to safe Vex types immediately inside.
5. Verify aggregate layout on every target, or use opaque handles.
6. Test both success and failure paths with sanitizers where available.

## Related

- [FFI](/guide/ffi)
- [Raw Pointers](/guide/types/raw-pointers)
- [Memory Prelude](/guide/memory/mem-prelude)
- [Freestanding](/guide/freestanding)
- [Native Module Linking](/guide/advanced/vxm-native-module-linking)
