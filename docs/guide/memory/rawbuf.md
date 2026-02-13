# RawBuf — Zero-Cost Byte-Level Memory Accessor

`RawBuf` is Vex's internal abstraction for byte-level memory access. It wraps an untyped `ptr` with typed load/store operations, replacing the raw C-style `(ptr as i64 + offset) as ptr` + `$load<T>` pattern.

::: tip Prelude Type
`RawBuf` is a **prelude type** — available in all Vex programs without any `import`. It is primarily used by the standard library internals (`String`, `str`, `Map`, `Vec`) but is also available for advanced use cases like custom allocators, binary parsers, and FFI buffer manipulation.
:::

::: info Zero Cost
All `RawBuf` methods are trivially inlined by LLVM. The generated machine code is **bit-for-bit identical** to manual pointer arithmetic + `$load/$store` intrinsics. There is no runtime overhead.
:::

## Overview

```vex
fn main() {
    // Allocate a raw buffer
    let mem = alloc(32);
    let! buf = RawBuf.of(mem);
    
    // Write a header: 4-byte magic + 4-byte version
    buf.storeU32(0, 0x56455821);   // "VEX!" magic
    buf.storeU32(4, 1);             // version 1
    
    // Write payload at offset 8
    buf.storeU8(8, 72);            // 'H'
    buf.storeU8(9, 105);           // 'i'
    
    // Read back
    let magic = buf.loadU32(0);
    let version = buf.loadU32(4);
    let ch = buf.loadU8(8);
    
    $println("magic: 0x{:X}, v{}, first byte: {}", magic, version, ch);
    
    free(mem, 32);
}
```

Compare with the old C-style approach:

```vex
// Old way — unsafe, casts everywhere, easy to get wrong
unsafe {
    $store<u32>(mem, 0x56455821);
    $store<u32>((mem as i64 + 4) as ptr, 1);
    $store<u8>((mem as i64 + 8) as ptr, 72);
    let magic = $load<u32>(mem);
    let ch = $load<u8>((mem as i64 + 8) as ptr);
}
```

## Struct Definition

```vex
struct RawBuf {
    public:
    base: ptr
}
```

`RawBuf` is a single-field struct wrapping an untyped pointer. After inlining, it has exactly the same layout and performance as a bare `ptr`.

## Creating RawBuf

### From Existing Pointer

```vex
let mem = alloc(1024);
let buf = RawBuf.of(mem);
```

### Null Buffer

```vex
let null_buf = RawBuf.null();
null_buf.isNull();  // true
```

### From Struct Fields

A common pattern in Vex internals — wrap a struct's data pointer:

```vex
// Inside String implementation
let header = RawBuf.of((self.data_or_ptr as i64 - 8) as ptr);
let capacity = header.loadU32(0);
```

## Pointer Arithmetic

All offsets are in **bytes** (not elements). Arithmetic returns new `RawBuf` values — no mutation.

### at(offset) — Raw Pointer at Offset

```vex
let buf = RawBuf.of(mem);
let p: ptr = buf.at(16);   // raw pointer to base + 16 bytes
```

### advance(n) — New RawBuf at Offset

```vex
let buf = RawBuf.of(mem);
let payload = buf.advance(8);   // new RawBuf pointing to base + 8

// Chainable
let deep = buf.advance(8).advance(4);  // base + 12
```

### addr() — Integer Address

```vex
let buf = RawBuf.of(mem);
let address: i64 = buf.addr();
```

### isNull() — Null Check

```vex
let buf = RawBuf.of(mem);
if !buf.isNull() {
    // safe to use
}
```

## Typed Loads (Read)

All load methods take a **byte offset** from the base pointer.

### Fixed-Width Loads

```vex
let buf = RawBuf.of(mem);

let byte_val:  u8  = buf.loadU8(0);     // 1 byte
let word_val:  u32 = buf.loadU32(4);     // 4 bytes
let dword_val: u64 = buf.loadU64(8);     // 8 bytes
let signed32:  i32 = buf.loadI32(16);    // 4 bytes (signed)
let signed64:  i64 = buf.loadI64(24);    // 8 bytes (signed)
```

### Generic Load

```vex
// Load any type T at byte offset
let val: MyStruct = buf.load<MyStruct>(0);
```

### Indexed Load (Array Access)

Load the n-th element of type `T`, automatically computing `offset = idx * sizeof(T)`:

```vex
// Array of i64 at base pointer
let first:  i64 = buf.loadAt<i64>(0);    // offset 0
let second: i64 = buf.loadAt<i64>(1);    // offset 8
let third:  i64 = buf.loadAt<i64>(2);    // offset 16

// Array of u32
let item: u32 = buf.loadAt<u32>(5);      // offset 20
```

This is the primary API used by `Map<K, V>` for its key/value slot arrays.

## Typed Stores (Write)

All store methods take a **byte offset** and a value.

### Fixed-Width Stores

```vex
let! buf = RawBuf.of(mem);

buf.storeU8(0, 0xFF);             // 1 byte
buf.storeU32(4, 42);              // 4 bytes
buf.storeU64(8, 0xDEADBEEF);     // 8 bytes
buf.storeI32(16, -1);             // 4 bytes (signed)
buf.storeI64(24, -9999);          // 8 bytes (signed)
```

### Generic Store

```vex
buf.store<MyStruct>(0, my_value);
```

### Indexed Store (Array Access)

Store at the n-th element slot of type `T`:

```vex
buf.storeAt<i64>(0, 100);    // offset 0
buf.storeAt<i64>(1, 200);    // offset 8
buf.storeAt<i64>(2, 300);    // offset 16
```

## Bulk Memory Operations

### copyFrom — Read Into Buffer

Copy `len` bytes from an external pointer into this buffer:

```vex
let! buf = RawBuf.of(dest);
buf.copyFrom(source_ptr, 64);   // copy 64 bytes: source → buf
```

### copyTo — Write From Buffer

Copy `len` bytes from this buffer to an external destination:

```vex
let buf = RawBuf.of(source);
buf.copyTo(dest_ptr, 64);      // copy 64 bytes: buf → dest
```

### cmp — Compare Memory

Compare `len` bytes with another pointer (like `memcmp`):

```vex
let buf = RawBuf.of(mem1);
let result = buf.cmp(mem2, 32);

if result == 0 {
    $println("equal");
} else if result < 0 {
    $println("buf < other");
} else {
    $println("buf > other");
}
```

### fill — Fill Memory

Fill `len` bytes with a value (like `memset`):

```vex
let! buf = RawBuf.of(mem);
buf.fill(0, 1024);     // zero-initialize 1024 bytes
buf.fill(0xFF, 64);    // fill with 0xFF
```

## Real-World Usage Patterns

### Binary Header Parsing

```vex
fn parse_header(data: ptr): FileHeader {
    let buf = RawBuf.of(data);
    
    let magic   = buf.loadU32(0);
    let version = buf.loadU32(4);
    let flags   = buf.loadU64(8);
    let count   = buf.loadU32(16);
    
    return FileHeader { magic, version, flags, count };
}
```

### Hash Map Slot Access

This is how Vex's `Map<K, V>` uses `RawBuf` internally:

```vex
// Inside Map implementation
let keys = RawBuf.of(self.key_data);
let vals = RawBuf.of(self.val_data);

// Read key/value at slot index
let k: K = keys.loadAt<K>(slot);
let v: V = vals.loadAt<V>(slot);

// Write key/value at slot index
keys.storeAt<K>(slot, new_key);
vals.storeAt<V>(slot, new_value);
```

### String Concatenation Buffer

```vex
fn concat(a: ptr, a_len: i64, b: ptr, b_len: i64): ptr {
    let total = a_len + b_len + 1;
    let mem = alloc(total);
    
    let! buf = RawBuf.of(mem);
    buf.copyFrom(a, a_len);                    // copy first string
    buf.advance(a_len).copyFrom(b, b_len);     // copy second string
    buf.storeU8(a_len + b_len, 0);             // null terminator
    
    return mem;
}
```

### Custom Allocator Metadata

```vex
fn alloc_with_header(size: i64): ptr {
    let total = 16 + size;   // 16-byte header
    let mem = alloc(total);
    
    let! hdr = RawBuf.of(mem);
    hdr.storeU64(0, size as u64);     // block size
    hdr.storeU64(8, 0);               // flags / ref count
    
    // Return pointer past the header
    return hdr.at(16);
}

fn get_block_size(payload: ptr): u64 {
    let hdr = RawBuf.of((payload as i64 - 16) as ptr);
    return hdr.loadU64(0);
}
```

## RawBuf vs Ptr\<T\> vs Span\<T\>

| Feature | `RawBuf` | `Ptr<T>` | `Span<T>` |
|---------|----------|----------|-----------|
| **Typed** | Untyped (byte offsets) | Typed (element offsets) | Typed (element offsets) |
| **Bounds checking** | None | None | Yes |
| **Owns memory** | No | No | No |
| **Best for** | Binary layout, mixed types | Typed arrays, FFI | Safe iteration, slicing |
| **Stride** | Manual (byte offsets) | Automatic (element size) | Automatic (element size) |
| **Generic load/store** | `loadAt<T>` / `storeAt<T>` | `readAt` / `writeAt` | `get` / — |

**Rule of thumb:**
- Use `Ptr<T>` for homogeneous typed arrays
- Use `Span<T>` for bounds-checked views over typed data
- Use `RawBuf` for binary protocols, mixed-type layouts, and internal stdlib plumbing

## Method Reference

### Constructors

| Method | Description |
|--------|-------------|
| `RawBuf.of(p)` | Wrap raw pointer |
| `RawBuf.null()` | Null buffer |

### Pointer Arithmetic

| Method | Description |
|--------|-------------|
| `.at(offset)` | Raw pointer at byte offset |
| `.advance(n)` | New RawBuf offset by n bytes |
| `.addr()` | Base address as `i64` |
| `.isNull()` | Check if base is null |

### Typed Loads

| Method | Description |
|--------|-------------|
| `.loadU8(off)` | Load `u8` at byte offset |
| `.loadU32(off)` | Load `u32` at byte offset |
| `.loadU64(off)` | Load `u64` at byte offset |
| `.loadI32(off)` | Load `i32` at byte offset |
| `.loadI64(off)` | Load `i64` at byte offset |
| `.load<T>(off)` | Load any type `T` at byte offset |
| `.loadAt<T>(idx)` | Load `T` at index (stride = `sizeof(T)`) |

### Typed Stores

| Method | Description |
|--------|-------------|
| `.storeU8(off, val)` | Store `u8` at byte offset |
| `.storeU32(off, val)` | Store `u32` at byte offset |
| `.storeU64(off, val)` | Store `u64` at byte offset |
| `.storeI32(off, val)` | Store `i32` at byte offset |
| `.storeI64(off, val)` | Store `i64` at byte offset |
| `.store<T>(off, val)` | Store any type `T` at byte offset |
| `.storeAt<T>(idx, val)` | Store `T` at index (stride = `sizeof(T)`) |

### Bulk Operations

| Method | Description |
|--------|-------------|
| `.copyFrom(src, len)` | Copy `len` bytes from `src` into buffer |
| `.copyTo(dst, len)` | Copy `len` bytes from buffer to `dst` |
| `.cmp(other, len)` | Compare `len` bytes (memcmp semantics) |
| `.fill(val, len)` | Fill `len` bytes with `val` (memset semantics) |

## See Also

- [Ptr\<T\>](./ptr-t) — Typed generic pointer with element-level operations
- [Span\<T\>](./span-t) — Bounds-checked fat pointer for safe iteration
- [Ownership](./ownership) — Vex's ownership model
- [Safety](./safety) — When and how to use unsafe code
