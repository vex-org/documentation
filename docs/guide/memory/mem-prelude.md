# Memory Prelude (`Mem`)

`Mem` is VexArch's single prelude boundary for allocation, reallocation, byte
movement, and explicit destruction. It is available without an import, but it
is intended for runtime, standard-library, allocator, and data-structure code.
Most applications should use `Box<T>`, `Vec<T>`, `string`, or another owning
type.

`Mem` does not make raw memory safe. Every caller remains responsible for
allocation extent, alignment, initialization, aliasing, and allocator pairing.

## Core allocation API

| Function | Purpose |
| --- | --- |
| `Mem.alloc(size: usize): Ptr<Opaque!>` | allocate `size` bytes from the active region or persistent heap, 16-byte aligned |
| `Mem.allocAligned(size: usize, align: usize): Ptr<Opaque!>` | allocate from the active region or heap with a power-of-two alignment |
| `Mem.realloc(p, oldSize, newSize): Ptr<Opaque!>` | resize a block while preserving the common prefix |
| `Mem.free(p, size): ()` | free a block with its exact allocation size |

```vex
let size = #Type.sizeOf<Header>() as usize
let memory = Mem.alloc(size)
let! header = RawBuf.of(memory)

header.zero(size)
header.store<u32>(0, 0x56455821)

Mem.free(memory, size)
```

`Mem.allocAligned` is paired with `Mem.freeAligned`; the aligned pointer may
carry a private prefix and must not be passed directly to `Mem.free`.

`Mem.free` expects the exact allocation size. For `Ptr.allocN<T>(count)`, use
`Ptr.freeN(count)` so the element count is converted to the correct byte size.

For checked dynamic layouts, `Layout` is also a prelude type and requires no
package import. It validates size/alignment arithmetic but deliberately does
not introduce a second allocator or ownership abstraction: low-level owners
retain the `Layout` needed to pair their `Mem` allocation and release.

## Heap- and region-bound allocation

VexArch distinguishes temporary arena allocation from storage that must survive
an arena reset.

| Function | Purpose |
| --- | --- |
| `Mem.heapAlloc(size)` | allocate from the persistent slab/large heap |
| `Mem.heapRealloc(p, oldSize, newSize)` | resize persistent heap storage |
| `Mem.currentRegion()` | return the active allocator region, or null |
| `Mem.regionAlloc(region, size)` | allocate through a captured region; null selects heap behavior |
| `Mem.regionRealloc(region, p, oldSize, newSize)` | resize through the same captured region |
| `Mem.allocFor<T>(size)` | active-region allocation preserving the exact target alignment of `T` |
| `Mem.heapAllocFor<T>(size)` | persistent-heap allocation preserving the exact target alignment of `T` |
| `Mem.regionAllocFor<T>(region, size)` | captured-region typed allocation |
| `Mem.regionReallocFor<T>(region, p, oldSize, newSize)` | captured-region typed resize |
| `Mem.freeFor<T>(p, size)` | release storage selected by a typed allocation route |

Containers capture `Mem.currentRegion()` when they are created and route their
backing-buffer growth through that captured region. This prevents a container
from silently changing allocator lifetime after construction.

The `*For<T>` forms select ordinary versus over-aligned storage at compile time.
Types whose ABI alignment is at most 16 bytes retain the native fast path with
no runtime branch or metadata. Prelude container implementations use these
forms so `Ptr<T>`, `Vec<T>`, `Deque<T>`, and `Map<K,V>` remain valid for
over-aligned element layouts. Application code should normally prefer their
typed owning APIs instead of calling `Mem.*For<T>` directly.

These functions are public so prelude and low-level library types can share the
same allocator contract. Application code should not select an arena/heap path
manually unless it is implementing an owning abstraction.

## Byte operations

| Function | Semantics |
| --- | --- |
| `Mem.copy(dst, src, n)` | copy `n` bytes; regions must not overlap |
| `Mem.move(dst, src, n)` | copy `n` bytes; overlapping regions are supported |
| `Mem.set(dst, value, n)` | fill `n` bytes with the low byte of `value` |
| `Mem.compare(a, b, n): i32` | bytewise comparison |
| `Mem.equals(a, b, n): bool` | equality over `n` bytes |
| `Mem.zero(dst, n)` | fill `n` bytes with zero |

Prefer `RawBuf` or `Ptr<T>` methods when they better express the offset unit and
element type. `Mem` is the shared primitive boundary beneath those wrappers.

## Explicit destruction

```vex
let owned = acquireResource()

// End this value's lifetime before the surrounding scope exits.
Mem.drop(owned)
```

`Mem.drop<T>(value)` consumes the value and runs its ownership-aware destruction
path. Use it only for intentional early destruction. Values are otherwise
dropped automatically at scope exit; calling `Mem.drop` and then using the
moved value is invalid.

The raw ownership primitive used to implement `Mem.drop` is compiler-owned and
prelude-only. It is not a developer-facing intrinsic.

## Size-metadata compatibility path

`Mem.allocCompat(size)`, `Mem.allocZeroedCompat(count, elementSize)`,
`Mem.freeCompat(p)`, and `Mem.reallocCompat(p, newSize)` form the canonical path
for APIs that cannot carry allocation size metadata to deallocation. They use
an inline size header and therefore give up the faster exact-size path. New
owning abstractions should preserve a `Layout` and use the exact-size
`Mem.alloc/realloc/free` contract.

There is no `std/mem` package and no parallel set of free functions. `Mem.*` is
the single source of truth across the compiler prelude, VexArch, standard
library, and application code.

## Unbounded loops and arena safety

`Mem.unboundedLoop()` is a zero-runtime-cost compiler hint for a loop whose exit
depends on runtime state and cannot be proven bounded:

```vex
while keepRunning {
    Mem.unboundedLoop()
    processNextEvent()
}
```

The compiler already recognizes `loop {}` and statically true `while`
conditions. Use the hint only when a genuinely runtime-gated loop would
otherwise look bounded. It prevents scope-root arena allocation from
accumulating indefinitely in a loop that may never exit.

## Freestanding boundary

`Mem` is a VexArch API, not a promise that Vex source depends on host libc
allocation. Its platform implementation may use OS/native system services, a
custom allocator, or a freestanding backend. Prelude and standard-library code
remain expressed against the same `Mem` contract instead of importing
`malloc/free` directly.

This separation is essential for freestanding builds: platform-specific memory
provision lives below VexArch, while Vex ownership and container code remains
portable above it.

## Safety checklist

1. Preserve the exact size and allocator/region that created each block.
2. Do not read uninitialized bytes or access memory after free.
3. Use `Mem.move` when source and destination may overlap.
4. Validate alignment before constructing typed or SIMD views.
5. Prefer RAII owners; expose raw `Mem` operations only inside a small audited
   implementation.

## Related

- [`Ptr<T>`](/guide/memory/ptr-t)
- [`Span<T>`](/guide/memory/span-t)
- [RawBuf](/guide/memory/rawbuf)
- [Ownership](/guide/memory/ownership)
- [Freestanding](/guide/freestanding)
