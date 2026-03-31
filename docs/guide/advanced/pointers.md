# Pointers and Low-Level Memory

Vex supports raw pointers, but most code should prefer the safer prelude abstractions built on top of them.

## Choose the right tool

| Tool         | Use it for                                             |
| ------------ | ------------------------------------------------------ |
| `*T` / `*T!` | FFI boundaries and truly raw interop                   |
| `ptr`        | Opaque untyped pointer values                          |
| `Ptr<T>`     | Typed low-level reads, writes, offsets, allocation     |
| `Span<T>`    | Non-owning bounds-checked views over contiguous memory |
| `RawBuf`     | Byte-level loads and stores                            |

If you are writing ordinary Vex code, start with `Span<T>` or `Ptr<T>` before reaching for raw dereference syntax.

## Raw pointers exist, but they are the sharp edge

Common raw pointer forms:

- `*T`
- `*T!`
- `ptr`

Dereferencing raw pointers is unsafe and should stay near FFI or runtime-facing code.

```vex
let value = 10;
let raw: *i32 = &value as *i32;

let loaded = unsafe { *raw };
```

## Prefer `Ptr<T>` for typed low-level work

The prelude `Ptr<T>` wrapper is the recommended typed pointer API.

```vex
let! p = Ptr.alloc<i32>();
p.write(42);

let x = p.read();
$println(x);

p.free();
```

Useful `Ptr<T>` operations include:

- `Ptr.null<T>()`
- `Ptr.of<T>(raw)`
- `read()` / `write(value)`
- `readAt(index)` / `writeAt(index, value)`
- `offset(n)` / `add(n)` / `sub(n)`
- `asRaw()` / `asOpaque()`

## Prefer `Span<T>` for contiguous views

When you have a collection or buffer and only need a non-owning view, `Span<T>` is usually the right choice.

```vex
let! v = Vec.new<i32>();
v.push(1);
v.push(2);
v.push(3);

let view = v.asSpan();
let first = view.get(0);
let tail = view.slice(1, 3);
```

`Span<T>` gives you bounds-aware access without taking ownership.

## Use `RawBuf` for byte offsets

`RawBuf` is the byte-level tool for serializers, parsers, encoders, and runtime-oriented memory layouts.

```vex
let buf = RawBuf.of(mem_ptr);
let tag = buf.load<u32>(0);
buf.store<u8>(4, 1);
```

This is the preferred way to express byte-offset memory access.

## Avoid manual pointer arithmetic

Do not write documentation or user code around patterns like these:

```vex
let addr = base as i64 + index * 8;
let val = *(addr as *i32);
```

Or byte stepping through integer casts:

```vex
let next = (ptr as usize + 1) as *u8;
```

In Vex, prefer:

- `Ptr<T>.offset(n)`
- `Ptr<T>.readAt(i)` / `writeAt(i, value)`
- `RawBuf.at(offset)`
- `RawBuf.load<T>(offset)` / `store<T>(offset, value)`

That keeps pointer math explicit, typed where possible, and aligned with the compiler/runtime model used across the prelude.

## Null pointers

For raw pointer values, null is typically written with `0 as *T` or `0 as ptr`.

For typed wrapper code, prefer:

```vex
let p = Ptr.null<i32>();
if p.isNull() {
    $println("null");
}
```

## FFI example

```vex
extern "C" {
    fn malloc(size: i64): ptr;
    fn free(p: ptr);
}

fn main(): i32 {
    let raw = malloc(#sizeof<i32>() as i64);
    let! p = Ptr.of<i32>(raw as *i32);

    p.write(42);
    $println(p.read());

    free(raw);
    return 0;
}
```

This keeps the raw FFI call at the edge and uses `Ptr<T>` for the typed operations.

## Practical rule

1. Use references for ordinary safe code.
2. Use `Span<T>` for views.
3. Use `Ptr<T>` for typed low-level access.
4. Use `RawBuf` for byte-level layouts.
5. Use raw `*T` and `ptr` only when you are truly at the unsafe boundary.

## See also

- [`Ptr<T>`](../memory/ptr-t)
- [`Span<T>`](../memory/span-t)
- [RawBuf](../memory/rawbuf)
- [FFI](../ffi)
