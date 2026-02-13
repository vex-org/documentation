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
│  Layer 0: *T / *T!       Raw · Unsafe · FFI           │
│  "I'm talking to hardware or C code"                  │
└──────────────────────────────────────────────────────┘
```

### Quick Decision Guide

| You need... | Use | Safety | Overhead |
|-------------|-----|--------|----------|
| Heap allocation with auto cleanup | `Box<T>` | Full | Zero (VUMM) |
| View into array/buffer with bounds checks | `Span<T>` | High | ~1 branch per access |
| Typed pointer arithmetic | `Ptr<T>` | Medium | Zero |
| FFI / hardware / memory-mapped I/O | `*T` | Manual | Zero |

---

## Layer 0: Raw Pointers (`*T` / `*T!`)

The escape hatch. Required for FFI and hardware interaction. Everything is manual.

```vex
extern "C" {
    fn mmap(addr: *void, len: u64, prot: i32, flags: i32, 
            fd: i32, offset: i64): *void;
    fn munmap(addr: *void, len: u64): i32;
}

fn mapHardwareRegister(): *u32! {
    let addr = unsafe {
        mmap(0 as *void, 4096, 3, 1, -1, 0)
    };
    return addr as *u32!;
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
- Data structure internals (Vec, HashMap backing storage)
- Performance-critical pointer arithmetic
- When you need pointer control but want type safety

**Guarantees:**
- Type-safe reads/writes (no `as *T` casts)
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
    let! v = Vec<i32>.new();
    v.push(10);
    v.push(20);
    v.push(30);
    
    let span = Span.ofVec<i32>(v.data as *i32, v.len());
    
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

Fully managed by VUMM. You never think about deallocation:

```vex
fn createNode(value: i32): Box<Node> {
    return Box(Node { value: value, next: null });
}

fn main() {
    let node = createNode(42);
    $println(node.value);
    // node automatically freed at scope exit
    // VUMM chose Unique — zero overhead
}
```

**When to use:**
- Any heap allocation
- Shared data (VUMM auto-selects Rc/Arc)
- Trees, graphs, linked structures
- "I just want a heap value"

**Guarantees:**
- Automatic deallocation
- Correct sharing (Unique/SharedRc/AtomicArc auto-selected)
- Zero runtime branching (monomorphized)
- Move semantics prevent use-after-free

---

## Combining Layers

Layers compose naturally. Higher layers use lower layers internally:

```vex
fn processVec(v: Vec<i32>) {
    // Create Span from Vec data
    let view = Span.ofVec<i32>(v.data as *i32, v.len());
    
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
       asRaw()              Span.ofPtr()            Box.new()
Box<T> ───────→ Ptr<T> ───────→ Span<T>             value → Box
       ←───────        ←───────
      Ptr.of()        .toPtr()
```

| From | To | Method | Allocates? |
|------|----|--------|------------|
| `*T` | `Ptr<T>` | `Ptr.of<T>(p)` | No |
| `*T` | `Ptr<T>` | `Ptr<T>(p)` | No |
| `Ptr<T>` | `*T` | `p.asRaw()` | No |
| `Ptr<T>` | `*void` | `p.asOpaque()` | No |
| `Ptr<T>` | `Span<T>` | `Span.ofPtr<T>(p.asRaw(), len)` | No |
| `Span<T>` | `Ptr<T>` | `span.toPtr()` | No |
| `Span<T>` | `Vec<T>` | `span.toVec()` | Yes |
| Any | `Box<T>` | `Box(val)` | Yes |
| `Box<T>` | `&T` | Auto-deref | No |

---

## Safety Comparison

| Property | `*T` | `Ptr<T>` | `Span<T>` | `Box<T>` |
|----------|------|----------|-----------|----------|
| Typed | Partial | Yes | Yes | Yes |
| Generic | No | Yes | Yes | Yes |
| Null-safe | No | `.isNull()` | Always valid | Always valid |
| Bounds-checked | No | No | `.get()` | N/A |
| Auto-free | No | No | No | Yes |
| Move semantics | No | No | No | Yes |
| Thread-safe | Manual | Manual | Manual | VUMM auto |
| Zero overhead | Yes | Yes | ~Yes | Yes (VUMM) |
| FFI compatible | Native | `.toRaw()` | `.ptr.toRaw()` | No |

---

## Best Practices

### 1. Start at the highest layer, drop down only when needed

```vex
// ✅ Default: Use Box for heap values
let data = Box(MyStruct { ... });

// ✅ Use Span for bounded views
let span = Span.ofVec<i32>(v.data as *i32, v.len());

// ✅ Use Ptr only for allocator/container internals
struct MyVec<T> { data: Ptr<T>, ... }

// ✅ Use *T only for FFI
extern "C" { fn c_func(p: *void): i32; }
```

### 2. Convert upward as soon as possible

```vex
// FFI returns raw pointer — immediately wrap in Ptr<T>
let raw = c_alloc(100);
let typed = Ptr.of<u8>(raw as *u8);       // Layer 0 → 1

// Create Span for safe access
let view = Span.ofPtr<u8>(raw as *u8, 100);  // Layer 0 → 2
```

### 3. Use Span for function interfaces

```vex
// ✅ Good: accepts a bounded view
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

// ❌ Overly restrictive: only accepts raw pointer
fn sum(data: *i32, len: usize): i32 { ... }
```

### 4. Keep unsafe at the boundary

```vex
// ✅ Good: wrap raw pointer immediately
fn readSensor(addr: usize): i32 {
    let p = Ptr.of<i32>(addr as *i32);
    return p.read();
}

// ❌ Bad: raw pointer leaks to caller
fn readSensor(addr: usize): *i32 {
    return addr as *i32;
}
```

## See Also

- [Ptr\<T\> Reference](./ptr-t) — Full typed pointer API
- [Span\<T\> Reference](./span-t) — Full fat pointer API
- [VUMM](./vumm) — Automatic ownership with Box\<T\>
- [Ownership Model](./ownership) — Move semantics and ownership rules
- [Borrowing](./borrowing) — Reference rules
- [Raw Pointers](/guide/advanced/pointers) — Legacy documentation

