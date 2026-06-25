# Memory Allocation API (Mem Prelude)

The `Mem` prelude module provides raw memory allocation primitives. These are the building blocks for `Box<T>`, `Vec<T>`, `Map<K,V>`, and all other heap-allocated types. Most Vex code should use those safe abstractions; direct use of `Mem` is for systems programming and building new safe abstractions.

## Core Functions

All `Mem` functions are available without imports (prelude).

### Allocation

```vex
// Allocate raw memory (uninitialized)
let ptr: ptr = vex_malloc(1024)     // allocate 1024 bytes
let aligned: ptr = vex_malloc(64)   // 16-byte aligned by default

// Allocate zero-initialized memory
let zeroed: ptr = vex_calloc(100, 8)  // 100 elements of 8 bytes each, zeroed

// Reallocate
let grown: ptr = vex_realloc(ptr, 2048)  // resize to 2048 bytes

// Free
vex_free(ptr)  // ptr becomes dangling after this
```

### Memory Operations

```vex
let dest = vex_malloc(64)
let src = vex_malloc(64)

// Copy memory: dest = src for N bytes
vex_memcpy(dest, src, 64)

// Move memory (handles overlapping regions correctly)
vex_memmove(dest, src, 64)

// Set memory to a byte value
vex_memset(dest, 0, 64)  // zero out 64 bytes
vex_memset(dest, 0xFF, 16)  // fill 16 bytes with 0xFF

// Compare memory
let cmp = vex_memcmp(dest, src, 64)
// returns 0 if equal, <0 if dest < src, >0 if dest > src
```

### Query Functions

```vex
// Get allocation size (platform-dependent, may return original requested size or block size)
let size = vex_malloc_usable_size(ptr)
```

## Complete API Reference

| Function                 | Signature                              | Description                                     |
| ------------------------ | -------------------------------------- | ----------------------------------------------- |
| `vex_malloc`             | `(size: usize): ptr`                   | Allocate `size` bytes, uninitialized            |
| `vex_calloc`             | `(count: usize, size: usize): ptr`     | Allocate `count * size` bytes, zero-initialized |
| `vex_realloc`            | `(ptr: ptr, size: usize): ptr`         | Resize allocation to `size` bytes               |
| `vex_free`               | `(ptr: ptr)`                           | Free an allocation                              |
| `vex_memcpy`             | `(dest: ptr, src: ptr, n: usize): ptr` | Copy `n` bytes from `src` to `dest`             |
| `vex_memmove`            | `(dest: ptr, src: ptr, n: usize): ptr` | Move `n` bytes (safe for overlap)               |
| `vex_memset`             | `(dest: ptr, val: i32, n: usize): ptr` | Set `n` bytes to byte value `val`               |
| `vex_memcmp`             | `(a: ptr, b: ptr, n: usize): i32`      | Compare `n` bytes, returns 0 if equal           |
| `vex_malloc_usable_size` | `(ptr: ptr): usize`                    | Get allocation size                             |

## Alignment

Allocations from `vex_malloc` are aligned to at least 16 bytes (suitable for 128-bit SIMD). For larger alignments, use the alignment-aware variant:

```vex
// Allocate 64 bytes aligned to 64-byte boundary (cache line)
let cache_line: ptr = vex_aligned_alloc(64, 64)

// Free aligned allocations with vex_free (same as normal)
vex_free(cache_line)
```

## Safety and `unsafe`

All direct use of `Mem` functions requires `unsafe` blocks:

```vex
unsafe {
    let buf = vex_malloc(1024) as *u8!

    // Write data
    for i in 0..1024 {
        buf[i] = i as u8
    }

    // Read data
    let first = buf[0]

    // Always free
    vex_free(buf as ptr)
}
```

## Memory Lifetime Rules

1. **Every `vex_malloc` must have a matching `vex_free`** -- Vex does NOT garbage-collect raw allocations.
2. **Use-after-free is undefined behavior** -- the compiler cannot detect this.
3. **Double-free is undefined behavior** -- set pointers to `null_ptr` after freeing.
4. **Uninitialized reads are undefined behavior** -- always initialize memory before reading.
5. **Alignment matters** -- misaligned access may crash on some architectures (ARM).

## Comparison with Safe Types

| Raw Mem                        | Safe Alternative      | When to Use Raw                 |
| ------------------------------ | --------------------- | ------------------------------- |
| `vex_malloc` + `vex_free`      | `Box.new()`           | Building custom allocators      |
| `vex_malloc` + manual indexing | `Vec.new()`           | Building custom data structures |
| `vex_memcpy`                   | `Ptr<T>.copyFrom()`   | FFI, byte-level protocols       |
| `vex_memset`                   | `Ptr<T>.writeBytes()` | FFI, clearing sensitive data    |
| `vex_memcmp`                   | `Ptr<T>.compare()`    | FFI, binary comparison          |

## Example: Custom Allocator Wrapper

```vex
struct Arena: Drop {
    base: ptr,
    offset: usize,
    capacity: usize,
}

fn Arena(capacity: usize): Arena {
    let base = unsafe { vex_malloc(capacity) }
    return Arena { base: base, offset: 0, capacity: capacity }
}

fn (self: &Arena!) alloc!(size: usize, alignment: usize): ptr {
    // Align offset
    let aligned = (self.offset + alignment - 1) & !(alignment - 1)
    if aligned + size > self.capacity {
        $panic("Arena out of memory")
    }
    self.offset = aligned + size
    return self.base + aligned
}

fn (self: &Arena!) drop() {
    unsafe { vex_free(self.base) }
}

// Usage
let! arena = Arena.new(4096)
let p1 = arena.alloc!(256, 8)
let p2 = arena.alloc!(128, 16)
// All memory freed when arena goes out of scope
```

## Best Practices

1. **Don't use raw `Mem` functions directly** unless you're writing low-level systems code or building new abstractions.
2. **Always pair `malloc` with `free`** -- use `defer` or `Drop` to ensure cleanup.
3. **Use `calloc` when you need zeroed memory** -- it avoids bugs from uninitialized reads.
4. **Prefer `memmove` over `memcpy`** when source and destination might overlap.
5. **Set freed pointers to `null_ptr`** to catch use-after-free bugs early.
6. **Use the safe abstractions** (`Box`, `Vec`, `Ptr<T>`, `Span<T>`) for 99% of code.

## Related Pages

- [Ownership](/guide/memory/ownership) -- how values are owned and moved
- [Borrowing](/guide/memory/borrowing) -- references and borrow rules
- [Box](/guide/memory/box) -- heap allocation with VUMM
- [Ptr\<T\>](/guide/memory/ptr-t) -- safe typed pointer wrapper
- [Span\<T\>](/guide/memory/span-t) -- bounds-checked fat pointer
- [Raw Pointers](/guide/types/raw-pointers) -- `ptr`, `*T`, `*T!`
- [Memory Safety](/guide/memory/safety) -- safety rules and unsafe blocks
