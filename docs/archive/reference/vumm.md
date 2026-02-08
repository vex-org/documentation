# Vex Unified Memory Model (VUMM)

**Goal:** Single surface type `Box<T>` with **100% compile-time determined** ownership strategy.

**Key Principle:** **ZERO runtime branching, ZERO runtime tags.** Kind is monomorphized at compile-time.

---

## 0. Why Static Over Dynamic?

The original spec had `kind: u8` in allocation headers. Problems:

1. **Runtime dispatch overhead**: Every `retain`/`release` needs `if (kind == Unique) {...}` branching
2. **Cache pollution**: Header bytes waste cache lines
3. **Promotion complexity**: Runtime promotion requires synchronization
4. **Not truly zero-cost**: Even `Unique` boxes carry dead `rc` field

**Static solution:** Compiler determines kind per allocation site → monomorphizes → no runtime decisions.

---

## 1. Core Design: Phantom Type Parameter

```vex
// User writes:
let a = Box.new(Data { ... });

// Compiler infers and monomorphizes to one of:
let a: Box<Data, Unique> = ...;    // Just pointer, no header
let a: Box<Data, SharedRc> = ...;  // Pointer + non-atomic rc
let a: Box<Data, AtomicArc> = ...; // Pointer + atomic rc
```

The second type parameter is **phantom** (erased at runtime, exists only for type system).

---

## 2. Memory Layouts (Zero Overhead)

### 2.1 Unique Layout

```
┌─────────────────┐
│  payload: T     │  ← Just the data, nothing else!
└─────────────────┘
```

- **Size:** `sizeof(T)`
- **Alloc:** `malloc(sizeof(T))`
- **Free:** `free(ptr)`
- **Overhead:** 0 bytes, 0 operations

### 2.2 SharedRc Layout

```
┌─────────────────┐
│  rc: u32        │  ← Non-atomic refcount
├─────────────────┤
│  payload: T     │
└─────────────────┘
```

- **Size:** `sizeof(T) + 4` (+ alignment)
- **Retain:** `rc += 1` (plain increment)
- **Release:** `if (--rc == 0) free()`
- **Overhead:** 4 bytes + inc/dec

### 2.3 AtomicArc Layout

```
┌─────────────────┐
│  rc: AtomicU32  │  ← Atomic refcount
├─────────────────┤
│  payload: T     │
└─────────────────┘
```

- **Size:** `sizeof(T) + 4` (+ alignment)
- **Retain:** `atomic_fetch_add(&rc, 1, Acquire)`
- **Release:** `if (atomic_fetch_sub(&rc, 1, Release) == 1) { fence(Acquire); free() }`
- **Overhead:** 4 bytes + atomic ops

---

## 3. Static Analysis Pipeline

### 3.1 Allocation Site Annotation

Each `Box.new()` call site gets annotated during HIR→SIR lowering:

```rust
struct BoxAllocationSite {
    id: AllocationSiteId,
    inferred_kind: BoxKind,  // Unique | SharedRc | AtomicArc
    reasons: Vec<KindReason>,
}

enum KindReason {
    SingleConsumer,           // → Unique
    MultipleConsumers(u32),   // → SharedRc
    EscapesToThread(Span),    // → AtomicArc
    EscapesToChannel(Span),   // → AtomicArc
    UnknownCallTarget(Span),  // → AtomicArc (conservative)
}
```

### 3.2 Analysis Passes (In Order)

#### Pass 1: Consumer Counting (Intra-procedural)

Dataflow analysis tracking how many live variables hold each allocation:

```
let a = Box.new(x);  // consumers[site_0] = 1
let b = a;           // Move semantics: still 1
let c = a.clone();   // Clone: consumers[site_0] = 2 → SharedRc candidate
```

#### Pass 2: Escape Analysis (Inter-procedural)

Tracks if allocation crosses thread boundaries:

```
let a = Box.new(x);
go(|| {
    print(a);  // ESCAPE! a captured by goroutine → AtomicArc
});
```

Escape triggers:
- `go { ... }` captures
- `channel.send(box)`
- `spawn_async(box)`
- FFI with `#[may_escape]`
- Unknown/opaque function calls (conservative)

#### Pass 3: Kind Resolution

```
Final_Kind = max(
    consumer_analysis_result,  // Unique or SharedRc
    escape_analysis_result     // AtomicArc if escaped
)
```

### 3.3 Monomorphization

After analysis, each use site is rewritten with concrete kind:

```rust
// Before (HIR)
let a: Box<Data> = Box.new(data);

// After (SIR)  
let a: Box<Data, AtomicArc> = box_alloc_atomic(data);
```

Different kind = different generated code. **NO runtime branching.**

---

## 4. Generated LLVM IR Examples

### 4.1 Unique (Zero Overhead)

```llvm
; Box.new(42)
%ptr = call ptr @malloc(i64 4)
store i32 42, ptr %ptr

; drop(box)
call void @free(ptr %ptr)
```

### 4.2 SharedRc

```llvm
; Box.new(42)
%alloc = call ptr @malloc(i64 8)  ; 4 for rc + 4 for i32
store i32 1, ptr %alloc           ; rc = 1
%data = getelementptr ptr, %alloc, i64 4
store i32 42, ptr %data

; clone(box) - called at compile-known clone sites
%rc_ptr = %alloc
%old = load i32, ptr %rc_ptr
%new = add i32 %old, 1
store i32 %new, ptr %rc_ptr       ; Plain increment, no atomic!

; drop(box)
%old = load i32, ptr %rc_ptr
%new = sub i32 %old, 1
store i32 %new, ptr %rc_ptr
%is_zero = icmp eq i32 %new, 0
br i1 %is_zero, label %free, label %done
free:
  call void @free(ptr %alloc)
  br label %done
done:
```

### 4.3 AtomicArc

```llvm
; clone(box)
%old = atomicrmw add ptr %rc_ptr, i32 1 acquire
; (ignore old value, just incrementing)

; drop(box)
%old = atomicrmw sub ptr %rc_ptr, i32 1 release
%was_one = icmp eq i32 %old, 1
br i1 %was_one, label %free, label %done
free:
  fence acquire  ; Sync with other releases
  call void @free(ptr %alloc)
  br label %done
done:
```

---

## 5. Handling Polymorphic Code

**Problem:** Generic functions don't know the kind at definition time.

```vex
fn process<T>(box: Box<T>) { ... }
```

**Solution:** Kind becomes part of the generic signature:

```vex
// Conceptually:
fn process<T, K: BoxKind>(box: Box<T, K>) { ... }

// Monomorphized to 3 versions if all used:
fn process_unique<T>(box: Box<T, Unique>) { ... }
fn process_shared<T>(box: Box<T, SharedRc>) { ... }  
fn process_atomic<T>(box: Box<T, AtomicArc>) { ... }
```

If a function ONLY works with one kind (e.g., needs thread-safety), use bounds:

```vex
fn send_to_worker<T>(box: Box<T, AtomicArc>) { ... }  // Only accepts Arc
```

---

## 6. Explicit Kind Override (Escape Hatch)

Sometimes the programmer knows better:

```vex
// Force unique (compiler error if analysis disagrees)
let a: Box<T, Unique> = Box.new(x);

// Force atomic (even if single-threaded - e.g., for future-proofing)
let b: Box<T, AtomicArc> = Box.new_atomic(x);
```

---

## 7. Implementation Checklist

### Phase 1: IR Support ✅
- [x] Add `BoxKind` enum to HIR types (`vex-hir/src/vumm/kind.rs`)
- [x] Add `AllocationSite` tracking (`vex-hir/src/vumm/site.rs`)
- [x] Modify `Box<T>` type to `Ty::Box { inner, kind }` (`vex-hir/src/ir/types.rs`)

### Phase 2: Analysis Passes ✅
- [x] Consumer counting pass (`vex-hir/src/vumm/analysis.rs`)
- [x] Escape analysis pass (basic - `vex-hir/src/vumm/analysis.rs`)
- [x] Kind resolution pass (integrated in AllocationSite)

### Phase 3: Runtime & Codegen ✅
- [x] `--explain-boxing` CLI flag (`vex check --explain-boxing`)
- [x] `Ty::Box` LLVM type mapping (opaque pointer)
- [x] Type mangling for Box (`vex-compiler/src/abi/types.rs`)
- [x] Runtime functions: `vex_rc_alloc/retain/release`, `vex_arc_alloc/retain/release` (`vex-runtime/runtime/src/alloc/vumm.c`)
- [x] Codegen dispatches `Box.new()` to correct allocator based on kind (`vex-compiler/src/codegen_hir/expr/calls/method_call.rs`)
- [x] VUMM analysis integration in CLI (`vex-cli/src/commands/compile.rs`, `run.rs`)

### Phase 4: Optimizations (Future)
- [x] Monomorphize box operations (clone/drop) based on kind
- [x] Elide refcount ops when provably unnecessary
- [x] Perceus-style reuse analysis
- [x] Inline drop glue (Box drop with emit_box_release)
- [x] Thread escape detection for `spawn`/`go` → AtomicArc promotion

---

## 8. Comparison: Dynamic vs Static

| Aspect | Dynamic (Old Spec) | Static (This Spec) |
|--------|-------------------|-------------------|
| Runtime branching | YES (`if kind == ...`) | NO |
| Header overhead | Always present | Only for Rc/Arc |
| Unique box size | `T + header` | `T` exactly |
| Promotion | Runtime possible | Compile-time only |
| Complexity | Simpler analysis | More monomorphization |
| Performance | Branch prediction dependent | Predictable, optimal |

---

## 9. Example: Full Flow

```vex
fn main() {
    let a = Box.new(Config { ... });  // Site 0
    
    if condition {
        let b = a.clone();            // Site 0 now has 2 consumers
        use(b);
    }
    
    go(|| {
        print(a);                     // Site 0 escapes to thread!
    });
}
```

**Analysis:**
1. Consumer pass: `Site 0 → 2 consumers → SharedRc candidate`
2. Escape pass: `Site 0 → escapes via go → AtomicArc`
3. Resolution: `Site 0 = AtomicArc`

**Generated code:** All uses of `a` use `AtomicArc` layout and atomic operations.
