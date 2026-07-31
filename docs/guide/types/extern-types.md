# Extern Types (FFI Ownership)

Extern types bridge Vex's ownership system with foreign (C) memory management. When working with C libraries, memory ownership doesn't follow Vex's arena/slab/RC model — the C side allocates and frees memory using `malloc`/`free` or custom allocators. Extern types let you express these ownership semantics directly in the Vex type system.

## Language Constructs

| Syntax                       | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `extern type Foo`            | Declares an opaque type whose definition lives in C          |
| `Extern.Owned<T, "drop_fn">` | Vex owns the pointer; calls `drop_fn` (a C function) on drop |
| `Extern.ForeignManaged<T>`   | Vex does NOT own the pointer; C manages the lifetime         |

---

## `extern type` — Opaque Foreign Types

When a C library exposes a struct whose layout Vex shouldn't know about, declare it as `extern type`:

```vex
// file.vex
extern {
    type FILE;        // opaque — Vex can only hold pointers to FILE
    type sqlite3;     // opaque database handle
}
```

These types cannot be instantiated in Vex. They exist only behind pointers (`*FILE`, `Extern.Owned<FILE, "fclose">`).

---

## `Extern.Owned<T, "drop_fn">` — Vex-Owned Foreign Pointers

Use when Vex code **acquires ownership** of a C-allocated resource and must release it. The compiler emits a call to `drop_fn` when the value goes out of scope — no VUMM header, no refcount, just a raw pointer + compile-time destructor.

### Syntax

```vex
Extern.Owned<T, "c_destructor_name">
```

- `T`: The foreign type (must be declared with `extern type`)
- `"c_destructor_name"`: String literal naming the C function to call on drop
- If omitted, defaults to `"free"`

### Examples

```vex
extern {
    type FILE;
    fn fopen(path: *u8, mode: *u8): *FILE;
    fn fclose(file: *FILE): i32;
    fn fread(buf: *u8, size: u64, count: u64, file: *FILE): u64;
}

fn read_file(path: *u8): void {
    // fopen returns a raw *FILE — wrap it for safe cleanup
    let file = Extern.Owned<FILE, "fclose">.new(
        unsafe { fopen(path, "r\0" as *u8) }
    );
    defer file.drop();  // calls fclose(file.ptr) at scope exit

    let! buf: [u8; 1024];
    let n = unsafe { fread(&buf[0] as *u8, 1, 1024, file.ptr) };
    // ...
}  // fclose called automatically here via defer
```

```vex
// Default destructor: "free"
let buf = Extern.Owned<u8>.new(
    unsafe { extern_malloc(4096) as *u8 }
);
// Drop calls free(buf.ptr)
```

### How It Works (Compiler Internals)

`Extern.Owned<T, "free">` lowers to `Ty::Box { inner: T, kind: BoxKind::ExternOwned { drop_fn: "free" } }`. The codegen emits:

- **No VUMM header** — just a raw pointer
- **Inline drop call** — `call @free(ptr)` at drop sites, not a vtable lookup
- **Zero overhead** — identical to hand-written C cleanup

---

## `Extern.ForeignManaged<T>` — C-Owned Opaque Handles

Use when Vex holds a pointer but the **C side owns** the memory. Vex never frees it — the foreign library manages the entire lifecycle.

### Syntax

```vex
Extern.ForeignManaged<T>
```

### Example

```vex
extern {
    type sqlite3;                          // opaque DB handle
    fn sqlite3_open(path: *u8, out: **sqlite3): i32;
    fn sqlite3_close(db: *sqlite3): i32;
}

struct Database {
    handle: Extern.ForeignManaged<sqlite3>,
}

impl Database {
    fn open(path: *u8): Database {
        let! db: *sqlite3 = 0 as *sqlite3;
        unsafe { sqlite3_open(path, &db as **sqlite3) };
        return Database.new(
            handle: Extern.ForeignManaged<sqlite3>.new(db)
        );
    }

    fn close(mut self) {
        unsafe { sqlite3_close(self.handle.ptr) };
        // handle is ForeignManaged — Vex won't double-free
    }
}
```

### How It Works

`Extern.ForeignManaged<T>` lowers to `BoxKind::ForeignManaged`. The codegen emits **no drop glue** — the pointer is completely ignored by Vex's ownership system. This is a zero-cost marker: the compiler guarantees no accidental `free()` on a C-owned resource.

---

## `ForeignManaged` Contract Marker

The `ForeignManaged` contract is a **marker contract** (no methods) that signals a type's lifetime is governed externally:

```vex
contract ForeignManaged { }  // marker
```

Types annotated with `ForeignManaged` bypass Vex's drop infrastructure. The compiler skips `emit_drop_call` for these types. See the [Contracts Reference](contracts-reference.md#foreignmanaged--externally-owned) for details.

---

## When To Use Each

| Scenario                                        | Use                                      |
| ----------------------------------------------- | ---------------------------------------- |
| Vex opens a C file handle, must close it        | `Extern.Owned<FILE, "fclose">`           |
| Vex allocates memory with `malloc`, must `free` | `Extern.Owned<T>` (defaults to `"free"`) |
| C library owns the handle (e.g., `sqlite3*`)    | `Extern.ForeignManaged<T>`               |
| Opaque type whose layout is unknown             | `extern type T`                          |
| Vex owns the memory, Vex allocator              | `Box<T>` or `Unique<T>` (standard VUMM)  |

---

## Related

- [Contracts Reference](contracts-reference.md) — Full list of standard contracts
- [Memory Model (VUMM)](../memory/vumm.md) — Vex's ownership and allocation model
- [Raw Pointers](raw-pointers.md) — Low-level pointer operations
- [Unsafe](../advanced/unsafe.md) — Unsafe blocks and FFI boundaries
