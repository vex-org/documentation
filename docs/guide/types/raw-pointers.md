# Raw Pointers

Raw pointers (`ptr` and `*T`) are low-level, unchecked memory addresses. They are the foundation upon which safe abstractions like `Ptr<T>`, `Span<T>`, and `Box<T>` are built. Most Vex code should use those safe abstractions; raw pointers are for FFI, systems programming, and building new safe abstractions.

## Pointer Types

| Syntax | Name                    | Description                                   |
| ------ | ----------------------- | --------------------------------------------- |
| `ptr`  | Untyped opaque pointer  | A raw memory address with no type information |
| `*T`   | Typed immutable pointer | Points to a value of type `T`, read-only      |
| `*T!`  | Typed mutable pointer   | Points to a value of type `T`, read-write     |

```vex
let raw: ptr = vex_malloc(64)         // untyped pointer
let typed: *i32 = raw as *i32          // cast to typed
let mut_ptr: *i32! = raw as *i32!      // mutable typed pointer
```

## Obtaining Pointers

### From Allocations

```vex
let p = vex_malloc(1024) as *u8      // from raw allocation
let box_ptr = Box.new(42)             // Box manages the pointer for you
```

### From References

```vex
let x = 42
let ref_to_x: &i32 = &x
let ptr_to_x: *i32 = ref_to_x as *i32
```

### From Arrays and Slices

```vex
let arr = [1, 2, 3, 4]
let first_ptr: *i32 = &arr[0]             // pointer to first element
let array_ptr: *i32 = arr.as_ptr()        // pointer to array data
```

### Null Pointers

```vex
let null_i32: *i32 = null_ptr             // null typed pointer
let null_raw: ptr = null_ptr              // null untyped pointer
```

## Reading and Writing Through Pointers

Reading and writing through raw pointers requires `unsafe` blocks:

```vex
unsafe {
    let p = vex_malloc(4) as *i32!
    p.write(42)           // write value
    let val = p.read()    // read value (returns 42)
}
```

Without `unsafe`, raw pointer dereference is a compile error:

```vex
let p: *i32 = somePointer
// let val = p.read()    // ERROR: raw read requires unsafe
```

## Pointer Arithmetic

**WARNING:** Do NOT perform manual pointer arithmetic using integer casts (`ptr as i64 + offset`). This is unsafe, unportable, and defeats alignment guarantees. Use the safe builtin types instead.

### The Correct Way: Use `Ptr<T>`, `Span<T>`, or `RawBuf`

```vex
// WRONG -- never do this
// let addr = raw_ptr as i64 + index * sizeof_i32
// let val = *(addr as *i32)

// CORRECT -- use Ptr<T>
let p = Ptr.of(base_ptr)
p.writeAt(3, 100)           // write to element 3 (stride computed automatically)
let val = p.readAt(3)       // read from element 3

// CORRECT -- use RawBuf for byte-level access
let buf = RawBuf.of(raw_ptr)
buf.store<i32>(offset, 42)  // typed store at byte offset
let val = buf.load<i32>(offset)
```

## Casting Between Pointer Types

```vex
let raw: ptr = vex_malloc(64)

// Cast to typed pointers
let bytes: *u8 = raw as *u8
let ints: *i32 = raw as *i32
let mutable: *i32! = raw as *i32!

// Cast back to untyped
let opaque: ptr = ints as ptr

// Cast to integer (for debugging, logging)
let addr: i64 = raw as i64
```

### Alignment Requirements

When casting between pointer types, ensure the pointer satisfies the alignment requirements of the target type:

```vex
let raw = vex_malloc(64)  // 16-byte aligned on most platforms

// Safe: u8 has no alignment requirement
let bytes: *u8 = raw as *u8

// Potentially unsafe: i32 requires 4-byte alignment
// vex_malloc returns 16-byte aligned, so this is fine
let ints: *i32 = raw as *i32
```

## FFI and Raw Pointers

Raw pointers are the primary mechanism for C interop:

```vex
extern "C" {
    fn memcpy(dest: ptr, src: ptr, n: usize): ptr
    fn strlen(s: *u8): usize
}

unsafe {
    let src = "hello" as *u8
    let len = strlen(src)         // 5
    let buf = vex_malloc(64)
    memcpy(buf, src, 6)            // copy including null terminator
}
```

## Safety Rules

1. **Always use `unsafe` blocks** for raw pointer dereference.
2. **Never do integer-based pointer arithmetic** (`ptr as i64 + N`). Use `Ptr<T>`, `Span<T>`, or `RawBuf`.
3. **Ensure alignment** when casting between pointer types.
4. **Ensure the pointed-to memory is live** when reading/writing.
5. **Free allocated memory** when done -- raw pointers have no automatic cleanup.
6. **Prefer safe abstractions** (`Box<T>`, `Ptr<T>`, `Span<T>`) over raw pointers whenever possible.

## When to Use Raw Pointers

- FFI with C libraries
- Building new safe abstractions (writing the internals of `Vec<T>`, `Box<T>`, etc.)
- Systems programming with memory-mapped I/O
- Interfacing with hardware

## When NOT to Use Raw Pointers

- General application code -- use `Box<T>`, `Vec<T>`, `Ptr<T>`, `Span<T>`
- Array access -- use `Span<T>` or `Vec<T>`
- Dynamic allocation -- use `Box.new()` or `Vec.new()`
- Pointer arithmetic -- use `Ptr<T>.readAt()` or `RawBuf.load<T>()`
