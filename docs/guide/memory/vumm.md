# VUMM: Vex Universal Memory Manager

> VUMM is an evolving memory-management design. Treat the ownership and borrowing rules in the core guide as authoritative; do not infer a specific reference-counting strategy unless the current compiler and library document it for the type in use.

VUMM (Vex Universal Memory Manager) is the proposed memory-management strategy in Vex. Its goal is to describe ownership transitions without a tracing garbage collector, while the exact strategy for shared and concurrent values remains implementation-dependent.

## The Design Philosophy: Zero Ceremony

In ordinary Vex code, you don't choose between a separate `Rc` or `Arc` type hierarchy. The heap-owning abstraction you work with is always `Box`.

```vex
let a = Box.new(42)
let b = Box(99)
```

Behind this simple interface, VUMM chooses the underlying memory-management
strategy during compilation. It combines value-based move semantics with
compiler-managed sharing, scaling thread-safety guarantees only when
concurrency is actually introduced. No reference-counting type or thread
bookkeeping API is exposed to application code.

---

## Compiler-managed ownership states

The source-level type remains `Box<T>` across moves, clones, and `go`
captures. VUMM proves whether a value is uniquely owned, shared locally, or
shared concurrently and selects the required representation and retain/drop
operations during compilation. These are backend states, not types or thread
bookkeeping APIs that application developers choose.

- A uniquely owned value moves without reference-count traffic and can be
  mutated in place.
- A locally shared value receives the cheapest safe ownership operations for
  its proven lifetime.
- A value that crosses a concurrency boundary is promoted automatically to a
  thread-safe representation. Capturing it in `go { ... }` does not require a
  manual clone, retain, release, or wrapper conversion.

---

## Relationship with Contracts

VUMM leverages Vex's contract-based system to automate lifetime management:

* **`Copy`**: Primitive types (numbers, bools, raw pointers) copy on assignment. Owning VUMM types do not implement `Copy` and default to move semantics.
* **`Clone`**: Cloning a VUMM type creates another managed owner; the compiler chooses the cheapest correct implementation unless a deep copy is explicitly requested.
* **`Drop`**: VUMM automatically decrements reference counts when an owner leaves scope, freeing the underlying allocation once the reference count reaches zero.

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

GPU-facing buffers bypass ordinary arenas and slabs so the runtime can preserve
page alignment for no-copy and DMA paths. VexArch validates the payload bound
before page-size rounding, preventing an extreme request from wrapping into a
smaller mapping. On an exception that escapes Vex-generated frames, one
canonical unwind cleanup clears arena routing and the active region before it
reclaims all savepoints, deferred drops, and chunks. These are runtime
guarantees; application code does not call the reserved allocator ABI.

---

## Summary

::: info TL;DR
1. **Write `Box(value)`** - Vex has no explicit `Rc` or `Arc` types.
2. **VUMM chooses** the unique, locally shared, or concurrently shared representation automatically at compile time.
3. **Fast Clones**: Cloning VUMM values increments reference counts instead of deep-copying.
4. **Monomorphized Drop**: Frees generic containers and elements safely using concrete drop functions.
5. **Compile Flag**: Use `--explain-boxing` to inspect VUMM's decisions during compilation.
:::

## Next Steps

- [Borrowing](borrowing) - Reference rules and NLL
- [Lifetimes](lifetimes) - Lifetime elision and regions
- [Contracts](../types/contracts) - Contract system
