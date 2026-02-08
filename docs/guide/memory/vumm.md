# VUMM - Vex Unified Memory Model

VUMM is Vex's revolutionary memory management system that automatically selects the optimal memory strategy at compile time. Write `Box.new()` and let the compiler choose the best implementation.

::: tip Key Insight
**Vex has NO separate `Rc` or `Arc` types.** There is only `Box<T>`. The compiler automatically determines whether it needs unique ownership, reference counting, or atomic reference counting based on usage analysis.
:::

## Overview

Traditional languages force you to choose:
- **Manual memory** (C/C++): Fast but unsafe
- **Garbage collection** (Java/Go): Safe but has overhead  
- **Explicit smart pointers** (Rust): `Box`, `Rc`, `Arc` - you must choose

**VUMM eliminates the choice burden.** You write `Box.new(value)` and get optimal behavior automatically.

## The Single Type: `Box<T>`

In Vex, there is only one heap allocation type:

```vex
// All three syntaxes are equivalent:
let data = Box(MyData { field: 42 })      // Shorthand
let data = Box.new(MyData { field: 42 })  // Method style
let data = Box<MyData>(value)             // Explicit type
```

**No `Rc` or `Arc` types.** Just `Box` - VUMM handles the rest automatically.

## Automatic BoxKind Selection

At compile time, VUMM analyzes your code and assigns each `Box.new()` call one of three **BoxKinds**:

### 1. Unique

Single owner, zero overhead - just like `malloc`/`free`:

```vex
fn unique_example() {
    let data = Box([1, 2, 3])
    process(data)  // Ownership transferred
    // Memory freed when data goes out of scope
}
// VUMM analysis: No clones, no escapes → Unique
// Generated code: Just malloc + free, zero overhead
```

**When selected:**
- Value never cloned
- Ownership is linear (single owner at any time)
- No thread boundary crossing

**Memory layout:**
```
┌─────────────────┐
│  payload: T     │  ← Just the data, nothing else!
└─────────────────┘
```

### 2. SharedRc

Non-atomic reference counting for single-threaded sharing:

```vex
fn shared_example() {
    let data = Box(ExpensiveResource.load())
    
    let view1 = data.clone()  // Cheap: just increment counter
    let view2 = data.clone()
    
    process(view1)
    use_data(view2)
    
    // Memory freed when last reference dropped
}
// VUMM analysis: Multiple clones, same thread → SharedRc
```

**When selected:**
- Value is cloned (multiple consumers)
- All usage within single thread
- No escapes via `go`, channels, or `spawn`

**Memory layout:**
```
┌─────────────────┐
│  rc: u32        │  ← Non-atomic refcount
├─────────────────┤
│  payload: T     │
└─────────────────┘
```

### 3. AtomicArc

Atomic reference counting for multi-threaded sharing:

```vex
fn atomic_example() {
    let data = Box(SharedState.new())
    
    for _ in 0..10 {
        let data_clone = data.clone()
        go {
            data_clone.read()  // Safe concurrent access
        }
    }
}
// VUMM analysis: Escapes via `go` block → AtomicArc
```

**When selected:**
- Value escapes to another thread (`go` blocks, channels, `spawn`)
- Cross-thread sharing detected
- FFI with potential external escapes

**Memory layout:**
```
┌─────────────────┐
│  rc: AtomicU32  │  ← Atomic refcount
├─────────────────┤
│  payload: T     │
└─────────────────┘
```

## How VUMM Analyzes Your Code

### Analysis Pipeline

```
Box.new() call site
        │
        ▼
┌───────────────────┐
│ Consumer Counting │  How many variables hold this value?
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Escape Analysis  │  Does it cross thread boundaries?
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Kind Resolution  │  max(consumer_result, escape_result)
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Monomorphization │  Generate kind-specific code
└───────────────────┘
```

### Complete Example

```vex
fn main() {
    let config = Box(Config { debug: true })  // Site 0
    
    if should_share {
        let config2 = config.clone()   // Site 0: 2 consumers → SharedRc candidate
        use_config(config2)
    }
    
    go {
        print(config)                  // Site 0: escapes via go → AtomicArc!
    }
}

// Final result: Site 0 = AtomicArc (escape trumps sharing)
```

**Key principle:** `AtomicArc > SharedRc > Unique` - compiler always picks the safest option.

## Reference Count Elision (Perceus)

VUMM implements the Perceus algorithm to eliminate unnecessary reference counting:

```vex
fn elision_example(data: Box<Data>): Box<Data> {
    // Traditional RC: increment on entry, decrement on exit
    // VUMM Perceus: Detects data is passed through unchanged
    // Result: Zero reference count operations!
    
    if data.is_valid() {
        data  // No RC overhead - elided
    } else {
        Box(Data.default())
    }
}
```

### Elision Patterns VUMM Recognizes

```vex
// Pattern 1: Pass-through - ZERO RC operations
fn pass_through(x: Box<T>): Box<T> { x }

// Pattern 2: Temporary clone - increment elided
fn temporary() {
    let data = Box(value)
    let temp = data.clone()
    use_and_drop(temp)
    data  // Last use - decrement elided
}

// Pattern 3: Known last use
fn last_use(data: Box<T>) {
    process(data)  // Decrement moved to callee or elided entirely
}
```

### Memory Reuse

```vex
fn reuse_example() {
    let! data = Box([0u8; 1024])
    
    for i in 0..1000 {
        // Without Perceus: alloc/free each iteration
        // With Perceus: Reuses same memory
        data = Box([i as u8; 1024])
    }
}
// VUMM detects drop→alloc pattern and reuses memory
```

## Explicit Kind Override

When you know better than the compiler, you can override:

```vex
// Force Unique (compiler error if actually needs sharing)
let data: Box<Data, Unique> = Box(value)

// Force SharedRc (even if no clones detected)
let data: Box<Data, SharedRc> = Box(value)

// Force AtomicArc (for future-proofing multi-threaded code)
let data = Box<Data, AtomicArc>(value)

// Let VUMM decide (default - recommended)
let data = Box(value)
```

::: warning
Explicit overrides should be rare. Trust VUMM's analysis in most cases.
:::

## Performance Characteristics

| Operation | Unique | SharedRc | AtomicArc |
|-----------|--------|----------|-----------|
| Create | ~malloc | ~malloc | ~malloc |
| Clone | N/A (move) | +1 plain inc | +1 atomic inc |
| Drop | ~free | +1 plain dec | +1 atomic dec |
| Deref | 0 | 0 | 0 |
| Memory overhead | +0 bytes | +4 bytes | +4 bytes |

## Debug VUMM Decisions

See what VUMM decided:

```bash
# Compile with VUMM explanation
vex check --explain-boxing src/main.vx

# Output:
# src/main.vx:15  Box.new() → Unique    (single consumer)
# src/main.vx:23  Box.new() → SharedRc  (2 consumers, single thread)
# src/main.vx:45  Box.new() → AtomicArc (escapes via go block at line 52)
```

## Best Practices

### 1. Trust VUMM

```vex
// ✅ Good: Let VUMM decide
let data = Box(expensive_computation())

// ❌ Unnecessary: Manual specification
let data: Box<Data, AtomicArc> = Box(expensive_computation())
```

### 2. Minimize Cloning When Possible

```vex
// VUMM optimizes clones, but avoiding them is still better

// Less optimal - triggers SharedRc
let data = Box(vec)
let copy = data.clone()

// Better - use references when possible
let data = Box(vec)
process(&data)
```

### 3. Use References for Read-Only Access

```vex
// Good: VUMM can use Unique if no clones
fn process(data: &Box<Data>) {
    print(data.field)
}

// Triggers SharedRc unnecessarily
fn process(data: Box<Data>): Box<Data> {
    print(data.field)
    data
}
```

## Comparison with Other Languages

| Language | Heap Allocation | Developer Burden |
|----------|----------------|------------------|
| C | `malloc`/`free` | Manual, error-prone |
| C++ | `unique_ptr`, `shared_ptr` | Choose correct type |
| Rust | `Box`, `Rc`, `Arc` | Choose correct type |
| Go | GC handles everything | Runtime overhead |
| **Vex** | `Box.new()` | **Automatic, zero overhead** |

## Summary

::: info TL;DR
1. **Write `Box(value)` or `Box.new(value)`** - that's it
2. **Never look for `Rc` or `Arc` types** - they don't exist in Vex
3. **VUMM picks Unique/SharedRc/AtomicArc** automatically at compile time
4. **Zero runtime overhead** - kind is monomorphized, no branching
5. **Use `--explain-boxing`** to see VUMM's decisions
:::

## Next Steps

- [Borrowing](borrowing) - Reference rules
- [Lifetimes](lifetimes) - Lifetime annotations
- [Performance](/guide/advanced/performance) - Optimization tips
