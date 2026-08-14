# `Ptr<T>` — Typed Raw Pointer

`Ptr<T>` is Vex's canonical typed raw-memory handle. It is represented directly
as a target pointer—never as a wrapper aggregate—and provides element-based
reads, writes, offsets, allocation, and FFI interop. It is a prelude type and
needs no import.

`Ptr<T>` is not a safe smart pointer: it carries neither a length nor a
lifetime. Prefer references, `Box<T>`, or `Span<T>` when they fit the job.

## Allocate and initialize

```vex
let! value = Ptr.allocWith<i32>(42)

unsafe {
    $println(value.read())
    value.free()
}
```

Allocation constructors are:

| Constructor | Result |
| --- | --- |
| `Ptr.null<T>()` | null typed pointer |
| `Ptr.nullMut<T>()` | null pointer with writable-pointee capability |
| `Ptr.alloc<T>()` | allocate one uninitialized `T` |
| `Ptr.allocWith<T>(value)` | allocate and initialize one `T` |
| `Ptr.allocN<T>(count)` | allocate `count` uninitialized contiguous elements |

An uninitialized allocation must be written before it is read.

## Reads and writes

```vex
let! values = Ptr.allocN<i32>(3)

unsafe {
    values.writeAt(0, 10)
    values.writeAt(1, 20)
    values.writeAt(2, 30)

    let second = values.readAt(1)
    $println(second)

    values.freeN(3)
}
```

| Method | Unit |
| --- | --- |
| `read()` / `write(value)` | the pointed-to `T` |
| `readAt(index)` / `writeAt(index, value)` | element index |
| `refAt(index)` | borrowed element reference |

The compiler cannot prove that an index is within the allocation. These
operations are unsafe even though their element type is explicit.

## Element-based pointer arithmetic

```vex
let third = unsafe { values.add(2) }
let previous = unsafe { third.sub(1) }
let signed = unsafe { third.offset(-2) }
let distance = values.distanceTo(third) // 2 elements
```

`add`, `sub`, and `offset` scale by `#Type.sizeOf<T>()`. They never use byte
units. Use `RawBuf` when the layout is naturally byte-oriented.

## Views and conversions

| Method | Result |
| --- | --- |
| `asOpaque()` | `Ptr<Opaque>` with erased pointee type |
| `addr()` | address as `usize` |
| `asSpan(count)` | bounds-aware `Span<T>` view |
| `asSlice(count)` | native slice view for low-level/vectorized operations |
| `asRef()` / `asMut()` | synthesized Vex reference |
| `isNull()` / `isValid()` | null checks |
| `isAligned(alignment)` | alignment check |

Creating a reference, span, or slice from a raw pointer is unsafe: the caller
must prove lifetime, extent, alignment, initialization, and aliasing.

To reinterpret the element type, cross an explicit opaque-pointer boundary:

```vex
let bytes = value.asOpaque() as Ptr<u8>
```

## Bulk operations

| Method | Behavior |
| --- | --- |
| `copyFrom(&src, count)` | copy `count` elements from `src` into `self` |
| `copyTo(&dst, count)` | copy `count` elements from `self` into `dst` |
| `compare(&other, count)` | compare `count` elements bytewise |
| `writeBytes(value, count)` | fill `count` bytes |
| `swap(&other)` | swap the two pointed-to values |

The `count` parameter is elements for copy/compare and bytes for `writeBytes`.
That distinction is intentional and should stay visible at call sites.

## Deallocation

- `free()` destroys an allocation created for one `T` and nulls the handle.
- `freeN(count)` destroys an allocation created by `allocN(count)` and supplies
  the correct total byte size.

Call deallocation only on the original allocation pointer, never an offset
pointer. Do not use it for foreign memory unless the foreign allocator is
explicitly compatible with VexArch's allocator.

## Safety checklist

Before every raw access, prove:

1. the pointer is non-null and correctly aligned;
2. the requested range lies within a live allocation;
3. reads observe initialized valid `T` values;
4. mutable access is exclusive for the operation's duration;
5. deallocation uses the original pointer, allocator, and size.

## Related

- [`Span<T>`](/guide/memory/span-t)
- [RawBuf](/guide/memory/rawbuf)
- [Memory Prelude](/guide/memory/mem-prelude)
- [Pointers and Low-Level Memory](/guide/advanced/pointers)
- [Unsafe](/guide/advanced/unsafe)
