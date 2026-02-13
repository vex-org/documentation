# Ptr\<T\> — Typed Generic Pointer

`Ptr<T>` is Vex's modern, type-safe pointer wrapper. It replaces the pattern of raw `*T` pointers with `as` cast chains, providing a clean method-based API with zero runtime overhead.

::: tip Prelude Type
`Ptr<T>` is a **prelude type** — available in all Vex programs without any `import`. Just use it directly.
:::

## Overview

```vex
fn main() {
    // Allocate 10 integers
    let! p = Ptr.allocN<i32>(10);
    
    // Write at specific indices
    p.writeAt(0, 100);
    p.writeAt(1, 200);
    p.writeAt(2, 300);
    
    // Read
    let val = p.readAt(1);    // 200
    $println("Value: {}", val);
    
    // Done
    p.free();
}
```

Compare with the old C-style approach:
```vex
// Old way — unsafe, casts everywhere
let raw = alloc(40) as *i32!;
unsafe { *raw = 100; *(raw + 1) = 200; *(raw + 2) = 300; }
let val = unsafe { *(raw + 1) };
free(raw as *void);
```

## Struct Definition

```vex
struct Ptr<T> {
    raw: *T
}
```

`Ptr<T>` is a single-field struct wrapping a raw pointer. After optimization, it has exactly the same memory layout and performance as `*T`.

## Creating Pointers

### From Allocation

```vex
// Allocate a single element (uninitialized)
let! p = Ptr.alloc<i32>();
p.write(42);

// Allocate and initialize with a value
let! p = Ptr.allocWith<i64>(9999);

// Allocate N contiguous elements
let! arr = Ptr.allocN<f64>(1000);
```

### From Raw Pointers

Interop with existing raw pointer code:

```vex
let x = 42;
let raw: *i32 = &x;

// Raw → Ptr
let p = Ptr.of<i32>(raw);
let val = p.read();     // 42

// Ptr → Raw (for FFI, legacy code)
let back: *i32 = p.asRaw();
```

### Special Values

```vex
let null = Ptr.null<i32>();         // null pointer

null.isNull();   // true
null.isValid();  // false
```

## Reading and Writing

### Single Element

```vex
let! p = Ptr.alloc<i32>();

// Write
p.write(42);

// Read
let val = p.read();     // 42
```

### Indexed Access

For arrays allocated with `allocN`:

```vex
let! arr = Ptr.allocN<i32>(5);

// Write at index
arr.writeAt(0, 10);
arr.writeAt(1, 20);
arr.writeAt(2, 30);

// Read at index
let v = arr.readAt(1);  // 20
```

## Pointer Arithmetic

All arithmetic is **element-level** — `p.add(3)` advances by 3 elements (not 3 bytes):

```vex
let! p = Ptr.allocN<i32>(10);
p.writeAt(0, 100);
p.writeAt(5, 500);

let p5 = p.add(5);       // p + 5*sizeof(i32)
let val = p5.read();      // 500

// Signed offset (can go backward)
let back = p5.offset(-2); // p + 3 elements

// Subtract
let p3 = p5.sub(2);       // same as offset(-2)
```

### Distance Between Pointers

```vex
let! start = Ptr.allocN<i32>(100);
let p50 = start.add(50);

let dist = start.distanceTo(&p50);   // 50 (elements, not bytes)
```

## Type Casting

Cast between pointer types via `asOpaque()`:

```vex
let! ip = Ptr.alloc<i64>();
ip.write(0x41424344);

// Cast to Ptr<u8> via opaque pointer
let bp = Ptr.of<u8>(ip.asOpaque() as *u8);
let firstByte = bp.read();  // 0x44 (little-endian)
```

## Bulk Operations

```vex
let! src = Ptr.allocN<i32>(3);
src.writeAt(0, 100);
src.writeAt(1, 200);
src.writeAt(2, 300);

let! dst = Ptr.allocN<i32>(3);

// Copy N elements from src to dst (two directions)
dst.copyFrom(&src, 3);   // dst ← src
src.copyTo(&dst, 3);     // src → dst (same result)

// Compare two memory blocks (byte-level, like memcmp)
let cmp = src.compare(&dst, 3);   // 0 = equal

// Fill bytes (like memset) — e.g., zero-initialize 12 bytes
dst.writeBytes(0, 12);   // fills 12 bytes with 0x00

// Swap values at two pointer locations
let! a = Ptr.allocWith<i32>(111);
let! b = Ptr.allocWith<i32>(222);
a.swap(&b);
// a.read() == 222, b.read() == 111
```

## Reference Conversion

Convert a `Ptr<T>` into Vex's reference system:

```vex
let! x: i32 = 42;
let p = Ptr.of<i32>(&x as *i32);

// Immutable reference
let r: &i32 = p.asRef();
$println(*r);    // 42

// Mutable reference
let mr: &i32! = p.asMut();
*mr = 100;       // x is now 100
```

::: warning
`asRef()` and `asMut()` require the pointer to be valid and non-null. Using them on a null or freed pointer is undefined behavior.
:::

## Alignment Check

Required for SIMD operations and specialized allocators:

```vex
let! p = Ptr.allocN<i32>(64);

if p.isAligned(16) {
    // Safe for SSE/NEON operations
    $println("16-byte aligned");
}

if p.isAligned(32) {
    // Safe for AVX operations
    $println("32-byte aligned");
}
```

## Memory Management

```vex
let! p = Ptr.alloc<i32>();
p.write(42);
p.free();    // deallocates and sets to null

// After free:
p.isNull();  // true
```

::: warning
`free()` deallocates the **entire allocation**, not just one element. Call it on the pointer returned by `alloc()` / `allocN()`, not on an offset pointer.
:::

## FFI Interop

`Ptr<T>` works seamlessly with C FFI:

```vex
extern "C" {
    fn fread(buf: ptr, size: u64, count: u64, stream: ptr): u64;
}

fn readBytes(stream: ptr, count: usize): Ptr<u8> {
    let! buf = Ptr.allocN<u8>(count);
    fread(buf.asOpaque(), 1, count as u64, stream);
    return buf;
}
```

## Method Reference

### Constructors

| Method | Description |
|--------|-------------|
| `Ptr.null<T>()` | Null pointer |
| `Ptr.of<T>(p)` | Wrap raw `*T` pointer |
| `Ptr.alloc<T>()` | Allocate single element |
| `Ptr.allocWith<T>(val)` | Allocate + initialize |
| `Ptr.allocN<T>(n)` | Allocate N elements |

### Core Operations

| Method | Description |
|--------|-------------|
| `.read()` | Read value at pointer |
| `.write(val)` | Write value at pointer |
| `.readAt(idx)` | Read at element index |
| `.writeAt(idx, val)` | Write at element index |

### Arithmetic

| Method | Description |
|--------|-------------|
| `.add(n)` | Forward N elements |
| `.sub(n)` | Backward N elements |
| `.offset(n)` | Signed element offset |
| `.distanceTo(&other)` | Element distance |

### Conversion & Checks

| Method | Description |
|--------|-------------|
| `.asRaw()` | Get underlying `*T` |
| `.asOpaque()` | Get as `ptr` (for FFI) |
| `.addr()` | Get address as `i64` |
| `.isNull()` | Check if null |
| `.isValid()` | Check if non-null |
| `.asRef()` | Convert to immutable reference `&T` |
| `.asMut()` | Convert to mutable reference `&T!` |
| `.isAligned(n)` | Check n-byte alignment |

### Memory

| Method | Description |
|--------|-------------|
| `.copyFrom(&src, n)` | Copy N elements from src |
| `.copyTo(&dest, n)` | Copy N elements to dest |
| `.compare(&other, n)` | Compare N elements (memcmp) |
| `.writeBytes(val, n)` | Fill n bytes with val (memset) |
| `.swap(&other)` | Swap values at two locations |
| `.free()` | Deallocate and null-out |

## See Also

- [RawBuf](./rawbuf) — Zero-cost byte-level memory accessor
- [Span\<T\>](./span-t) — Bounds-checked fat pointer built on Ptr\<T\>
- [Raw Pointers](/guide/advanced/pointers) — Legacy raw `*T` documentation
- [VUMM](./vumm) — Automatic ownership with `Box<T>`
