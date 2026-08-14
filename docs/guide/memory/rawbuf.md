# RawBuf — Byte-Level Memory View

`RawBuf` is VexArch's zero-cost, non-owning view over an opaque `ptr`. Its
offsets are bytes and its generic load/store methods make the value type
explicit. It is a prelude API for standard-library internals, allocators,
binary protocols, and audited FFI code.

RawBuf carries no length, lifetime, or ownership. It centralizes pointer
arithmetic but cannot validate an access.

## Basic use

```vex
let size = 16 as usize
let memory = Mem.alloc(size)
let! buffer = RawBuf.of(memory)

buffer.zero(size)
buffer.store<u32>(0, 0x56455821)
buffer.store<u16>(4, 1)

let magic = buffer.load<u32>(0)
let version = buffer.load<u16>(4)

Mem.free(memory, size)
```

The wrapper itself has the same representation as its `ptr` field. Its small
methods lower to ordinary pointer arithmetic and memory operations without
allocating an object or adding bounds metadata.

## Construction and navigation

| Method | Result |
| --- | --- |
| `RawBuf.of(p)` | view beginning at `p` |
| `RawBuf.null()` | null view |
| `at(offset)` | raw pointer at a signed or unsigned byte offset |
| `advance(offset)` | new RawBuf at a byte offset |
| `slice(offset)` | equivalent byte sub-view |
| `addr()` | base address as `usize` |
| `isNull()` | whether the base is null |

```vex
let payload = buffer.advance(8)
let fieldPointer = payload.at(4)
```

No navigation method checks allocation extent.

## Typed loads and stores

```vex
let count = buffer.load<u32>(0)
let timestamp = buffer.load<u64>(8)

buffer.store<u32>(0, count + 1)
buffer.store<u64>(8, timestamp)
```

`load<T>(offset)` and `store<T>(offset, value)` use byte offsets.
`loadAt<T>(index)` and `storeAt<T>(index, value)` scale the index by
`#Type.sizeOf<T>()`.

```vex
let second = buffer.loadAt<i64>(1) // byte offset 8
buffer.storeAt<i64>(2, 99)         // byte offset 16
let reference = buffer.refAt<i64>(2)
```

The caller must prove alignment and that the memory contains a valid `T`.
`refAt` additionally requires the backing memory to outlive the returned
reference and obey reference aliasing rules.

## Bulk byte operations

| Method | Behavior |
| --- | --- |
| `copyFrom(src, len)` | copy bytes from `src` into this buffer |
| `copyTo(dst, len)` | copy bytes from this buffer into `dst` |
| `copyFromBuf(src, len)` | copy bytes from another RawBuf |
| `cmp(other, len)` | three-way byte comparison with a pointer |
| `eq(other, len)` | byte equality with another RawBuf |
| `fill(value, len)` | fill the base range |
| `zero(len)` | zero the base range |
| `zeroAt(offset, len)` | zero a range at an offset |

The copy methods use non-overlapping copy semantics. Use `Mem.move` when the
source and destination may overlap.

RawBuf also provides `writeBytes` and `writeBytesAt` overloads for filling from
a scalar byte value or copying from `Span<T>` and native arrays.

## Typed views

```vex
let words = unsafe { buffer.asSpan<u32>(4) }
let native = unsafe { buffer.asSlice<u32>(4) }
```

Prefer `asSpan` for ordinary bounds-aware access. `asSlice` is the low-level
bridge used by native slice/vectorized operations. Both constructors are unsafe
because RawBuf cannot prove the count, lifetime, alignment, or element validity.

## RawBuf, Ptr, or Span?

| Property | `RawBuf` | `Ptr<T>` | `Span<T>` |
| --- | --- | --- | --- |
| Offset unit | bytes | elements | elements |
| Bounds stored | no | no | yes |
| Element type stored | no | yes | yes |
| Owns allocation | no | no | no |
| Best use | mixed binary layout | homogeneous typed raw memory | bounded borrowed view |

Owned collections and `Box<T>` should remain the default for application code.

## Compiler boundary

RawBuf is the public prelude layer over compiler-owned memory primitives. Those
primitives are deliberately inaccessible to normal source code. Extend RawBuf
or another typed prelude abstraction when a reusable low-level operation is
missing; do not expose the compiler primitive at each call site.

## Safety checklist

1. Track the allocation base and total byte length outside RawBuf.
2. Check every offset plus access size for overflow and bounds.
3. Respect `T` alignment, initialization, and validity requirements.
4. Do not retain references beyond the backing allocation's lifetime.
5. Pair allocation and deallocation through the same allocator.

## Related

- [`Ptr<T>`](/guide/memory/ptr-t)
- [`Span<T>`](/guide/memory/span-t)
- [Memory Prelude](/guide/memory/mem-prelude)
- [Ownership](/guide/memory/ownership)
- [Unsafe](/guide/advanced/unsafe)
