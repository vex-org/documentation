# Canonical Raw Pointers

Raw pointers are unchecked addresses used at FFI, allocator, runtime, and
hardware boundaries. Vex has one source-level raw-pointer family: `Ptr<T>`.
The old `ptr`, `*T`, `*T!`, `Ptr.of`, and `asRaw` spellings are not part of the
language surface.

Most application code should still prefer references, owned containers, or
`Span<T>`.

## Pointer types

| Syntax | Meaning |
| --- | --- |
| `Ptr<T>` | readable pointer to `T` |
| `Ptr<T!>` | pointer with writable-pointee capability |
| `Ptr<Opaque>` | opaque C-compatible pointer |
| `Ptr<Opaque!>` | opaque pointer with writable-pointee capability |

`Ptr<T>` lowers directly to the target pointer representation. `Opaque` is a
pointee marker, not a value type and not a hidden allocation.

```vex
let raw = Mem.alloc(64)                // Ptr<Opaque!>
let typed = raw as Ptr<i32>
let writable = raw as Ptr<i32!>

Mem.free(raw, 64)
```

A pointer does not own its allocation and carries no length or lifetime. The
code that allocates memory must preserve the allocator and byte size required
to release it.

## Obtaining pointers

From a reference:

```vex
let value = 42
let raw = &value as Ptr<i32>
```

From the typed prelude:

```vex
let! values = Ptr.allocN<i32>(4)
let opaque = values.asOpaque()
```

Null pointers use typed constructors:

```vex
let readable = Ptr.null<i32>()
let writable = Ptr.nullMut<i32>()
let opaque = Ptr.null<Opaque>()
```

## Reading and writing

Raw access is unsafe because the compiler cannot prove address validity:

```vex
let! value = 0
let raw = &value as Ptr<i32!>

unsafe {
    raw.write(42)
    $println(raw.read())
}
```

Before access, prove that the pointer is non-null, aligned, live, initialized
for reads, within allocation bounds, and valid under Vex's aliasing rules.

## Pointer arithmetic

Do not convert a pointer to an integer merely to perform element arithmetic.
Prefer:

- `offset(index)`, `add`, `sub`, `readAt`, and `writeAt` for element units;
- `RawBuf.at(offset)`, `load<T>`, and `store<T>` for byte units;
- `Span<T>` when the extent is known and should be checked.

```vex
let item = unsafe { typed.readAt(3) }

let! bytes = RawBuf.of(raw.asOpaque())
bytes.store<u32>(12, 99)
```

## Casting and alignment

```vex
let memory = Mem.allocAligned(64, 32)
let words = memory as Ptr<u32!>

unsafe { words.write(7) }
Mem.freeAligned(memory)
```

An explicit `as Ptr<U>` cast changes the compiler's pointee contract, not the
underlying allocation. It cannot repair alignment, extend a lifetime,
initialize bytes, or transfer ownership. Pointee erasure remains visible as
`asOpaque()`.

## FFI ownership

```vex
extern "NATIVE" from "foreign_objects" {
    fn foreignCreate(): Ptr<Opaque>
    fn foreignDestroy(value: Ptr<Opaque>)
}

let handle = unsafe { foreignCreate() }
unsafe { foreignDestroy(handle) }
```

Always destroy memory with the allocator that created it. Do not pass a C block
to `Mem.free`, and do not pass a VexArch block to C `free`, unless the API
explicitly guarantees allocator compatibility.

## Safety checklist

1. Keep raw pointer scopes short and audited.
2. Preserve allocation size and allocator identity.
3. Check nullness, extent, alignment, and initialization.
4. Keep capability changes and pointee casts explicit.
5. Convert a valid raw range to `Span<T>` as early as possible.
