# Memory Safety Layers

Vex provides a layered approach to memory management — from raw hardware access to fully automatic ownership. Each layer builds on the previous, giving you the right tool for each situation.

## The Four Layers

```
┌──────────────────────────────────────────────────────┐
│  Layer 3: Box<T>         Owning · Automatic · VUMM   │
│  "I just want a heap value — compiler, handle it"     │
├──────────────────────────────────────────────────────┤
│  Layer 2: Span<T>        Borrowing · Bounds-checked   │
│  "I need a view into contiguous data"                 │
├──────────────────────────────────────────────────────┤
│  Layer 1: Ptr<T>         Typed · Generic · Methodful  │
│  "I need pointer control, but type-safe"              │
├──────────────────────────────────────────────────────┤
│  Layer 0: Ptr<T>          Raw · Unsafe · FFI           │
│  "I'm talking to hardware or C code"                  │
└──────────────────────────────────────────────────────┘
```

### Quick Decision Guide

| You need...                               | Use       | Safety | Overhead             |
| ----------------------------------------- | --------- | ------ | -------------------- |
| Heap allocation with auto cleanup         | `Box<T>`  | Full   | Zero (VUMM)          |
| View into array/buffer with bounds checks | `Span<T>` | High   | ~1 branch per access |
| Typed pointer arithmetic                  | `Ptr<T>`  | Medium | Zero                 |
| FFI / hardware / memory-mapped I/O        | `Ptr<T>`  | Manual | Zero                 |

---

## Layer 0: Raw Pointers (`Ptr<T>` / `Ptr<T!>`)

The escape hatch. Required for FFI and hardware interaction. Everything is manual.

```vex
extern "LIBC" {
    fn mmap(addr: Ptr<Opaque>, len: u64, prot: i32, flags: i32,
            fd: i32, offset: i64): Ptr<Opaque>;
    fn munmap(addr: Ptr<Opaque>, len: u64): i32;
}

fn mapHardwareRegister(): Ptr<u32!> {
    let addr = unsafe {
        mmap(Ptr.null<Opaque>(), 4096, 3, 1, -1, 0)
    };
    return addr as Ptr<u32!>;
}
```

**When to use:**

- FFI with C libraries
- Memory-mapped I/O
- Inline assembly
- Implementing the other layers

**Guarantees:** None. You're responsible for everything.

---

## Layer 1: Ptr\<T\> — Typed Pointer

Same performance as raw pointers, but with method syntax, generics, and no `as` casts. `Ptr<T>` is a **prelude type** — available everywhere without import.

```vex
fn fillBuffer(buf: Ptr<i32>, count: usize, value: i32) {
    let! i: usize = 0;
    while i < count {
        buf.add(i).write(value);
        i = i + 1;
    }
}

fn main() {
    let! p = Ptr.allocN<i32>(100);
    fillBuffer(p, 100, 42);

    let val = p.add(50).read();    // 42
    p.free();
}
```

**When to use:**

- Custom allocators
- Data structure internals (Vec, Map backing storage)
- Performance-critical pointer arithmetic
- When you need pointer control but want type safety

**Guarantees:**

- Type-directed reads/writes (no legacy raw-pointer cast syntax)
- Element-level arithmetic (not byte-level)
- Null checking via `.isNull()`

**Not guaranteed:**

- No bounds checking
- No automatic deallocation
- No lifetime tracking

---

## Layer 2: Span\<T\> — Bounded View

A pointer-length pair with bounds checking. `Span<T>` is a **prelude type** — available everywhere without import.

```vex
fn sum(data: Span<i32>): i32 {
    let! total: i32 = 0;
    let! iter = data.iter();
    loop {
        match iter.next() {
            Some(val) => { total = total + val; },
            None => { break; },
        }
    }
    return total;
}

fn main() {
    let! v = Vec.new<i32>();
    v.push(10);
    v.push(20);
    v.push(30);

    let span = v.asSpan();

    $println(sum(span));       // 60

    // Sub-span — zero allocation
    let first2 = span.take(2);
    $println(sum(first2));     // 30
}
```

**When to use:**

- Function parameters that accept "a slice of data"
- Array views without copying
- Buffer processing

**Guarantees:**

- Bounds checking on `.get()` (returns `Option<T>`)
- Known length via `.len()`
- Sub-slicing without allocation (`.slice()`, `.take()`, `.skip()`)
- Iterator support via `.iter()`
- Search via `.contains()`, `.indexOf()`

**Not guaranteed:**

- No ownership (doesn't free memory)
- No lifetime enforcement (can dangle if source is freed)

---

## Layer 3: Box\<T\> — Owned Heap Value

At the user level, `Box<T>` is the owning heap-value surface. In ordinary code you use it as the managed heap layer rather than handling raw frees yourself.

```vex
fn createValue(value: i32): Box<i32> {
    return Box.new<i32>(value);
}

fn main() {
    let boxed = createValue(42);
    $println(boxed.get());
    // boxed is cleaned up at scope exit
}
```

**When to use:**

- Any heap allocation
- Shared data (VUMM selects the cheapest safe internal ownership strategy)
- Trees, graphs, linked structures
- "I just want a heap value"

**Guarantees:**

- Automatic deallocation
- Correct local and cross-thread sharing, selected automatically by VUMM
- Zero runtime branching (monomorphized)
- Move semantics prevent use-after-free

---

## Combining Layers

Layers compose naturally. Higher layers use lower layers internally:

```vex
fn processVec(v: Vec<i32>) {
    // Create Span from Vec data
    let view = v.asSpan();

    // Bounds-checked access
    match view.get(0) {
        Some(first) => $println(first),
        None => $println("Empty!"),
    }

    // Search
    if view.contains(42) {
        $println("Found 42!");
    }

    // Iterator
    let! iter = view.iter();
    loop {
        match iter.next() {
            Some(val) => $println(val),
            None => { break; },
        }
    }
}

fn main() {
    let! v = Vec<i32>.new();
    v.push(10);
    v.push(20);
    v.push(30);
    processVec(v);
}
```

### Layer Transitions

```
       explicit view         Span.ofPtr()            Box.new()
Box<T> ─────────────→ Ptr<T> ───────────→ Span<T>    value → Box
                       ←───────────────
                           .toPtr()
```

| From      | To        | Method                          | Allocates? |
| --------- | --------- | ------------------------------- | ---------- |
| `&T`      | `Ptr<T>`  | `ref as Ptr<T>`                 | No         |
| `Ptr<T>`  | `Ptr<U>`  | `p.asOpaque() as Ptr<U>`        | No         |
| `Ptr<T>`  | `Ptr<Opaque>` | `p.asOpaque()`              | No         |
| `Ptr<T>`  | `Span<T>` | `Span.ofPtr<T>(p, len)`         | No         |
| `Span<T>` | `Ptr<T>`  | `span.toPtr()`                  | No         |
| `Span<T>` | `Vec<T>`  | `span.toVec()`                  | Yes        |
| Any       | `Box<T>`  | `Box(val)`                      | Yes        |
| `Box<T>`  | `&T`      | `box.getRef()`                  | No         |

---

## Safety Comparison

| Property              | `Ptr<T>`                 | `Span<T>`              | `Box<T>`                  |
| --------------------- | ------------------------ | ---------------------- | ------------------------- |
| Typed                 | Yes                      | Yes                    | Yes                       |
| Generic               | Yes                      | Yes                    | Yes                       |
| Null check            | `.isNull()`              | `.isNull()`            | `.isValid()`              |
| Bounds-checked        | No                       | `.get()`               | N/A                       |
| Auto-free             | No                       | No                     | Yes                       |
| Move semantics        | No                       | No                     | Yes                       |
| Thread-safe           | Manual                   | Manual                 | Ownership-managed surface |
| Runtime representation | target pointer         | pointer + length       | owned handle              |
| FFI-compatible access | direct / `asOpaque()`    | `asPtr()`              | `asPtr()`                 |

---

## Best Practices

### 1. Start at the highest layer, drop down only when needed

```vex
// Yes Default: Use Box for heap values
let data = Box(MyStruct { ... });

// Yes Use Span for bounded views
let span = v.asSpan();

// Yes Use Ptr only for allocator/container internals
struct MyVec<T> { data: Ptr<T>, ... }

// Use Ptr<Opaque> at opaque FFI boundaries
extern "NATIVE" from "c_api" { fn c_func(p: Ptr<Opaque>): i32; }
```

### 2. Convert upward as soon as possible

```vex
// FFI returns an opaque pointer — recover a typed contract explicitly
let raw = c_alloc(100);
let typed = raw as Ptr<u8!>;

// Create Span for safe access
let view = Span.ofPtr<u8>(typed, 100);
```

### 3. Use Span for function interfaces

```vex
// Yes Good: accepts a bounded view
fn sum(data: Span<i32>): i32 {
    let! total: i32 = 0;
    let! iter = data.iter();
    loop {
        match iter.next() {
            Some(val) => { total = total + val; },
            None => { break; },
        }
    }
    return total;
}

// No Overly restrictive: only accepts raw pointer
fn sum(data: Ptr<i32>, len: usize): i32 { ... }
```

### 4. Keep unsafe at the boundary

```vex
// Yes Good: make address recovery explicit and keep it local
fn readSensor(addr: usize): i32 {
    let p = addr as Ptr<i32>;
    return p.read();
}

// No Bad: raw pointer leaks to caller
fn readSensor(addr: usize): Ptr<i32> {
    return addr as Ptr<i32>;
}
```

## See Also

- [Ptr\<T\> Reference](./ptr-t) — Full typed pointer API
- [Span\<T\> Reference](./span-t) — Full fat pointer API
- [VUMM](./vumm) — Automatic ownership with Box\<T\>
- [Ownership Model](./ownership) — Move semantics and ownership rules
- [Borrowing](./borrowing) — Reference rules
- [Raw Pointers](/guide/advanced/pointers) — Legacy documentation
