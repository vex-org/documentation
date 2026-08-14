# Pointers and Low-Level Memory

Vex exposes raw pointers for FFI, allocators, runtimes, and memory-mapped I/O.
Most code should use ownership, references, and bounds-aware views instead.

## Choose the narrowest abstraction

| Tool | Bounds | Ownership | Use it for |
| --- | --- | --- | --- |
| `&T` / `&T!` | one valid value | borrowed | ordinary safe access |
| `Span<T>` | checked extent | borrowed | contiguous views and slicing |
| `Ptr<T>` | unchecked | non-owning raw handle | typed FFI and allocator work |
| `RawBuf` | unchecked byte offsets | non-owning raw handle | binary layouts and runtime internals |
| `Ptr<Opaque>` | unchecked | non-owning raw handle | opaque C object-pointer boundaries |

`Ptr<T>` and `RawBuf` do not make invalid memory safe. They make units,
mutability, and intent explicit while keeping the generated code zero-cost.

## Raw pointer forms

- `Ptr<T>` is a readable raw pointer to `T`.
- `Ptr<T!>` carries writable-pointee capability.
- `Ptr<Opaque>` is an opaque object pointer, similar to C's `void*`.

Legacy Vex spellings `*T`, `*T!`, and `ptr` are rejected by normal semantic
analysis. Existing source can be migrated with
`vex lint --fix --only pointer_migration`.

Dereference requires an unsafe boundary:

```vex
let value = 10
let raw = &value as Ptr<i32>
let loaded = unsafe { raw.read() }
```

The programmer must prove non-nullness, alignment, initialization, lifetime,
aliasing validity, and sufficient allocation extent.

## Typed raw access with `Ptr<T>`

```vex
let! values = Ptr.allocN<i32>(3)

unsafe {
    values.writeAt(0, 10)
    values.writeAt(1, 20)
    values.writeAt(2, 30)

    $println(values.readAt(1))
    values.freeN(3)
}
```

Pointer arithmetic is element-based: `values.add(2)` advances by two `i32`
elements, not two bytes. `readAt`, `writeAt`, `offset`, `add`, `sub`, reference
conversion, and deallocation remain unsafe because `Ptr<T>` carries no bounds
or lifetime.

## Bounds-aware views with `Span<T>`

```vex
let view = unsafe { values.asSpan(3) }
let first = view.get(0)
let tail = view.slice(1, 3)
```

Constructing a span from a raw pointer is unsafe; once a valid span exists, its
public view operations retain the extent. Prefer a container's `asSpan()` over
constructing one from raw memory yourself.

## Byte-oriented access with `RawBuf`

```vex
let! buffer = RawBuf.of(memory)
buffer.store<u32>(0, 0x56455821)
buffer.store<u16>(4, 1)

let magic = buffer.load<u32>(0)
let version = buffer.load<u16>(4)
```

RawBuf offsets are bytes. `loadAt<T>(index)` and `storeAt<T>(index, value)` are
the element-stride forms. RawBuf has no bounds metadata, so the same raw-memory
proof obligations apply.

## Compiler-owned memory primitives

The embedded VexArch prelude implements these APIs using a small set of
compiler-owned runtime primitives. Those primitives are **prelude-only** and
normal Vex source must not call them directly.

This boundary is deliberate:

- application code receives typed, reviewable APIs;
- ownership-sensitive writes stay centralized;
- the compiler can change lowering without expanding the public surface;
- unsafe code does not become a collection of unstructured intrinsic calls.

If a missing operation seems to require direct compiler access, extend the
appropriate prelude abstraction instead of bypassing it.

## FFI example

```vex
extern "LIBC" {
    fn malloc(size: usize): Ptr<Opaque>
    fn free(memory: Ptr<Opaque>)
}

fn main(): i32 {
    let raw = unsafe { malloc(#Type.sizeOf<i32>() as usize) }
    let! value = raw as Ptr<i32!>

    unsafe {
        value.write(42)
        $println(value.read())
        free(value.asOpaque())
    }
    return 0
}
```

Do not call `Ptr.free()` for memory owned by a foreign allocator unless that
allocator is explicitly compatible with Vex's allocator. The allocator that
creates a block must also destroy it.

## Practical rules

1. Use references and owned containers in ordinary code.
2. Use `Span<T>` when an extent is known.
3. Use `Ptr<T>` for typed raw handles and element offsets.
4. Use `RawBuf` for byte layouts.
5. Keep raw pointers and allocator pairing at the boundary.
6. Never manufacture addresses through integer arithmetic when a typed prelude
   operation expresses the same intent.

## See also

- [`Ptr<T>`](/guide/memory/ptr-t)
- [`Span<T>`](/guide/memory/span-t)
- [RawBuf](/guide/memory/rawbuf)
- [Memory Prelude](/guide/memory/mem-prelude)
- [FFI](/guide/ffi)
- [Unsafe](/guide/advanced/unsafe)
