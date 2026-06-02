# VUMM: Vex Universal Memory Manager

VUMM (Vex Universal Memory Manager) is the core memory management strategy in Vex. Its primary goal is to provide **automatic, efficient ownership transitions** without a garbage collector, ensuring that data is managed correctly and safely across unique, shared, and concurrent contexts.

## The Design Philosophy: Zero Ceremony

In ordinary Vex code, you don't choose between a separate `Rc` or `Arc` type hierarchy. The heap-owning abstraction you work with is always `Box`.

```vex
let a = Box.new(42)
let b = Box(99)
```

Behind this simple interface, VUMM dynamically chooses the underlying memory management strategy. It combines value-based move semantics with automatic reference counting, scaling thread-safety guarantees only when concurrency is actually introduced.

---

## Internal Ownership States

VUMM manages three primary ownership modes for heap-allocated data:

```
                  Clone (same thread)
  ┌───────────┐  ────────────────────→  ┌─────────────┐
  │  Unique   │                         │  SharedRc   │
  │ (Box<T>)  │  ←────────────────────  │ (Ref Count) │
  └───────────┘    Only 1 ref remaining  └─────────────┘
        │
        │ Share across 'go' block
        ▼
  ┌─────────────┐
  │  AtomicArc  │ (Atomic Ref Count)
  └─────────────┘
```

### 1. Unique Ownership (`Unique`)
* **Role**: The data has exactly one owner (equivalent to Rust's `Box<T>`).
* **Performance**: Supports in-place mutation and efficient, zero-overhead moves.
* **Deallocation**: Freed immediately when the owning variable goes out of scope.

### 2. Shared Reference Counting (`SharedRc`)
* **Role**: The data is reference-counted and shared among multiple owners on the same thread.
* **Transition**: Triggered automatically when a `Box` is cloned within a non-concurrent context.
* **Performance**: Cloning simply performs a fast reference count increment (`vex_rc_retain`) instead of a deep copy, providing value semantics with zero overhead.

### 3. Atomic Shared Reference Counting (`AtomicArc`)
* **Role**: The data is shared across thread boundaries with atomic reference counting for thread safety.
* **Transition**: Triggered automatically when a shared `Box` is captured inside a `go` block or passed to a concurrent task.
* **Performance**: Uses atomic fetch-and-add operations (`vex_arc_retain`) to prevent data races.

---

## Relationship with Contracts

VUMM leverages Vex's contract-based system to automate lifetime management:

* **`$Copy`**: Primitive types (numbers, bools, raw pointers) copy on assignment. Owning VUMM types do not implement `$Copy` and default to move semantics.
* **`$Clone`**: Cloning a VUMM type triggers a cheap reference count increment (`vex_rc_retain` or `vex_arc_retain`) under the hood instead of duplicating heap allocations, unless a deep copy is explicitly requested.
* **`$Drop`**: VUMM automatically decrements reference counts when an owner leaves scope, freeing the underlying allocation once the reference count reaches zero.

---

## Monomorphized Drop Calls

To eliminate brittle, complex inline drop glue for generic containers (e.g., `Vec<T>`), the Vex compiler uses a **Monomorphized Drop Call** strategy:

1. **Explicit Monomorphization**: The compiler analyzes concrete generic types at compile time (e.g., `Vec<String>`).
2. **Direct Call Emission**: When a container is dropped, Vex emits a direct call to the monomorphized user `drop()` function (e.g., `call void @"drop@Vec_String"`).
3. **Safety**: This ensures both the container allocation and its elements are cleaned up correctly according to the specific type `T`, preventing "orphan drops" and Use-After-Free (UAF) errors.

---

## Memory Allocator Integration

VUMM is backed by a custom runtime memory allocator designed for low latency:

* **Slab Allocator**: Reuses uniform memory chunks in a thread-local pool to avoid expensive syscalls.
* **Epoch Quiescence**: FFI and dynamic allocations are retired via epoch-based reclamation, ensuring memory is reclaimed only when no active execution thread holds a reference.
* **Zero-Copy Unified Memory**: On Apple Silicon and supported APUs, VUMM maps buffers directly between CPU and GPU without copy overhead.

---

## Summary

::: info TL;DR
1. **Write `Box(value)`** - Vex has no explicit `Rc` or `Arc` types.
2. **VUMM chooses** between Unique, SharedRc, and AtomicArc automatically at compile time.
3. **Fast Clones**: Cloning VUMM values increments reference counts instead of deep-copying.
4. **Monomorphized Drop**: Frees generic containers and elements safely using concrete drop functions.
5. **Compile Flag**: Use `--explain-boxing` to inspect VUMM's decisions during compilation.
:::

## Next Steps

- [Borrowing](borrowing) - Reference rules and NLL
- [Lifetimes](lifetimes) - Lifetime elision and regions
- [Contracts](../types/contracts) - Contract system
