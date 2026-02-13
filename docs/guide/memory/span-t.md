# Span\<T\> — Bounds-Checked Fat Pointer

`Span<T>` is Vex's non-owning view over contiguous typed memory. It combines a data pointer with a length, enabling bounds-checked access and zero-copy slicing.

::: tip Prelude Type
`Span<T>` is a **prelude type** — available in all Vex programs without any `import`. Just use it directly.
:::

## Overview

```vex
fn main() {
    let! nums = Vec.new<i32>();
    nums.push(10); nums.push(20); nums.push(30); nums.push(40); nums.push(50);
    
    // Create a span view (zero-copy)
    let view = Span.ofVec<i32>(nums.data as *i32, nums.len());
    
    // Bounds-checked access
    match view.get(2) {
        Some(val) => $println("Index 2: {}", val),   // 30
        None => $println("out of bounds")
    };
    
    // Zero-copy slicing
    let middle = view.slice(1, 4);   // [20, 30, 40]
    $println("Middle length: {}", middle.len());  // 3
}
```

## Struct Definition

```vex
struct Span<T> {
    data: *T,
    length: usize
}
```

`Span<T>` is a fat pointer — two fields on the stack. It does **not own** the underlying memory. The data source (Vec, Ptr, array) must outlive the span.

## Creating Spans

### From Vec

```vex
let! v = Vec.new<i32>();
v.push(1); v.push(2); v.push(3);

let s = Span.ofVec<i32>(v.data as *i32, v.len());
```

### From Ptr

```vex
let! p = Ptr.allocN<i32>(5);
p.writeAt(0, 10);
p.writeAt(1, 20);

let s = Span.ofPtr<i32>(p.asRaw(), 5);
```

### From Raw Pointer

```vex
let s = Span.of<i32>(rawPtr, length);
```

### Empty Span

```vex
let empty = Span.empty<i32>();
empty.isEmpty();  // true
empty.len();      // 0
```

## Element Access

### Bounds-Checked (Safe)

```vex
let s = Span.ofVec<i32>(v.data as *i32, v.len());

// Returns Option<T>
match s.get(0) {
    Some(val) => $println("first: {}", val),
    None => $println("empty!")
};

// Out of bounds → None (no panic)
match s.get(999) {
    Some(_) => $println("impossible"),
    None => $println("safely handled")
};
```

### Unchecked (Fast)

```vex
// No bounds check — caller guarantees index < len
let val = s.getUnchecked(0);
```

### First / Last

```vex
match s.first() {
    Some(val) => $println("first: {}", val),
    None => $println("empty")
};

match s.last() {
    Some(val) => $println("last: {}", val),
    None => $println("empty")
};
```

### With Fallback

```vex
let val = s.getOr(100, -1);  // returns -1 if index >= length
```

### Index Operator

```vex
let val = s[2];  // equivalent to s.getUnchecked(2)
```

## Slicing (Zero-Copy)

All slicing operations return new `Span<T>` values that share the same underlying memory — no copies:

```vex
let s = Span.ofVec<i32>(v.data as *i32, v.len());
// v = [10, 20, 30, 40, 50]

// Sub-range [start, end)
let mid = s.slice(1, 4);     // [20, 30, 40]

// First N elements
let head = s.take(3);         // [10, 20, 30]

// Skip first N elements
let tail = s.skip(2);         // [30, 40, 50]

// Split into two halves at index → SpanPair<T>
let pair = s.splitAt(3);
let left = pair.first;    // [10, 20, 30]
let right = pair.second;  // [40, 50]

// Clamped — won't panic on out-of-range
let safe = s.take(100);       // [10, 20, 30, 40, 50] (clamped to length)
let empty = s.skip(100);      // [] (empty span)
```

## Search

```vex
let s = Span.ofVec<i32>(v.data as *i32, v.len());

// Contains check
if s.contains(30) {
    $println("found 30!");
};

// Index of first occurrence
match s.indexOf(30) {
    Some(idx) => $println("30 at index {}", idx),
    None => $println("not found")
};
```

### Higher-Order Search

Find the first element matching a predicate:

```vex
fn is_even(x: i32): bool {
    return x % 2 == 0;
}

fn main() {
    let! v = Vec.new<i32>();
    v.push(1); v.push(3); v.push(4); v.push(7);
    let s = Span.ofVec<i32>(v.data as *i32, v.len());
    
    match s.find(is_even) {
        Some(val) => $println("First even: {}", val),  // 4
        None => $println("no even numbers")
    };
}
```

## Comparison

```vex
let s1 = Span.ofVec<i32>(v1.data as *i32, v1.len());
let s2 = Span.ofVec<i32>(v2.data as *i32, v2.len());

if s1.equals(&s2) {
    $println("spans are equal");
};
```

## Converting to Vec

Create an owned copy:

```vex
let s = Span.ofVec<i32>(v.data as *i32, v.len());
let sub = s.slice(1, 3);

// Deep copy into a new Vec
let! owned = sub.toVec();  
// owned is an independent Vec<i32> = [20, 30]
```

## Iteration

```vex
let s = Span.ofVec<i32>(v.data as *i32, v.len());
let! it = s.iter();
let! sum = 0;

loop {
    match it.next() {
        Some(val) => { sum = sum + val; },
        None => { break; }
    };
};
$println("sum: {}", sum);
```

## Raw Access

```vex
let rawPtr: *i32 = s.asPtr();     // underlying raw pointer
let typed: Ptr<i32> = s.toPtr();   // convert to Ptr<T>
```

## In-Place Mutation

Mutating spans require `let!` (mutable binding):

### Fill

```vex
let! p = Ptr.allocN<i32>(5);
let! span = Span.of<i32>(p.asRaw(), 5);

span.fill(42);  // all 5 elements are now 42
```

### Copy From Another Span

```vex
let src = Span.ofVec<i32>(srcVec.data as *i32, srcVec.len());
let! dst = Span.of<i32>(dstPtr.asRaw(), 10);

dst.copyFromSpan(&src);  // copies min(dst.len, src.len) elements
```

### Reverse

```vex
let! p = Ptr.allocN<i32>(5);
p.writeAt(0, 1); p.writeAt(1, 2); p.writeAt(2, 3);
p.writeAt(3, 4); p.writeAt(4, 5);

let! span = Span.of<i32>(p.asRaw(), 5);
span.reverse();  // [5, 4, 3, 2, 1]
```

## Method Reference

### Constructors

| Method | Description |
|--------|-------------|
| `Span.empty<T>()` | Empty span |
| `Span.of<T>(ptr, len)` | From raw pointer + length |
| `Span.ofVec<T>(data, len)` | From Vec's data pointer + length |
| `Span.ofPtr<T>(rawPtr, len)` | From Ptr's raw pointer + length |

### Properties

| Method | Description |
|--------|-------------|
| `.len()` | Number of elements |
| `.isEmpty()` | Is length zero? |
| `.isNull()` | Is data pointer null? |

### Element Access

| Method | Description |
|--------|-------------|
| `.get(idx)` | Bounds-checked → `Option<T>` |
| `.getUnchecked(idx)` | No bounds check |
| `.getOr(idx, fallback)` | With default value |
| `.first()` | First element → `Option<T>` |
| `.last()` | Last element → `Option<T>` |
| `.[idx]` | Index operator (unchecked) |

### Slicing

| Method | Description |
|--------|-------------|
| `.slice(start, end)` | Sub-span `[start, end)` |
| `.take(n)` | First N elements |
| `.skip(n)` | Skip first N elements |
| `.splitAt(idx)` | Split into `SpanPair<T>` with `.first` and `.second` |

### Search

| Method | Description |
|--------|-------------|
| `.contains(val)` | Linear search |
| `.indexOf(val)` | Index of first match → `Option<usize>` |
| `.find(pred)` | First match by predicate → `Option<T>` |

### Mutation (In-Place)

| Method | Description |
|--------|-------------|
| `.fill(val)` | Set all elements to val |
| `.copyFromSpan(&src)` | Copy from another span |
| `.reverse()` | Reverse elements in-place |

### Comparison & Conversion

| Method | Description |
|--------|-------------|
| `.equals(&other)` | Element-wise equality |
| `.toVec()` | Deep copy into new `Vec<T>` |
| `.asPtr()` | Get raw `*T` |
| `.toPtr()` | Convert to `Ptr<T>` |
| `.iter()` | Iterator over elements |

## See Also

- [RawBuf](./rawbuf) — Zero-cost byte-level memory accessor
- [Ptr\<T\>](./ptr-t) — Generic typed pointer
- [Raw Pointers](/guide/advanced/pointers) — Legacy raw `*T` documentation
- [VUMM](./vumm) — Automatic ownership with `Box<T>`
