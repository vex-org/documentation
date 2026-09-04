# Compiler Pipeline

This page describes the main compilation flow from source text to native code or SIR-backed execution.

## End-to-End Flow

```text
source (.vx)
  -> lexer
  -> parser / syntax tree
  -> HIR lowering
  -> comptime generator discovery and canonical CTFE
  -> sealed source/generated HIR snapshot
  -> type inference + borrow analysis + semantic checks
  -> typed known/residual staging
  -> codegen selection
       -> LLVM/native path
       -> SIR graph path
  -> link / subprocess execution
```

## Front-End Stages

### Lexer

`vex-lexer` tokenizes source text.

### Parser

`vex-parser` constructs the syntax tree and keeps enough recovery behavior for diagnostics and tooling.

### Syntax Layer

`vex-syntax` defines the syntax node model used by the parser and later lowering passes.

## HIR and Semantic Analysis

`vex-hir` is where syntax becomes semantically meaningful program structure.

Key responsibilities include:

- name resolution
- type inference
- pattern lowering
- contract-related checks
- borrow and move analysis
- enum, `Option`, and `Result` behavior

## Comptime and expansion

Canonical CTFE runs on HIR before backend codegen. It evaluates strict `#`
boundaries and eligible ordinary `const fn` calls, expands authorized typed
`DeclSet` module generators, and produces one sealed source/generated semantic
snapshot for compiler, diagnostics, lint, and LSP.

Staging classifies work as known, typed residual HIR, or an error. Runtime
effects and runtime-dependent values remain in the ordinary pipeline; strict
compile-time consumers never receive a runtime fallback.

Generated declarations are not printed or reparsed and do not cross a separate
bitcode boundary. Their typed HIR remains visible to monomorphization, VUMM,
fusion, ABI lowering, and dead-code elimination.

See [Comptime Pipeline](/architecture/comptime-pipeline) for the full flow.

## Memory-Safety Analysis

The repository describes the borrow system as a multi-phase analysis model. The high-level responsibilities are:

1. immutability and `let` vs `let!` enforcement
2. move tracking
3. borrow rule validation
4. lifetime-oriented validation

This is the part of the compiler that enforces the memory model documented in the guide.

## Two Main Lowering Paths

### Native LLVM Path

`vex-compiler` lowers checked HIR into LLVM IR and then into object code, linked executables.

This path is the default for ordinary systems code.

#### Callable and alias contracts

First-class functions and closures have one internal representation:
`{ code, context }`. The context is always a valid non-null pointer; a
capture-free callable uses a private zero-cost sentinel rather than a heap
allocation. Direct calls, indirect calls, callable fields and error-rescue
handlers share the same physical ABI decisions for hidden return storage,
aggregate parameters, references, alignment and capture guarantees. Because a
true indirect call has no visible declaration to inherit from, its sealed HIR
function type publishes those facts at the call site too: initialized scalar,
aggregate and SIMD results retain `noundef`, while `Box<T>` and reference
results retain `nonnull noundef`. Ownership alone never invents allocator-style
return `noalias`.

O3 indirect-call promotion is proof-carrying. It consumes only the exact target
identities sealed by semantic lowering in standard LLVM `!callees` metadata;
it never guesses candidates by scanning for the same opaque-pointer signature.
Without that proof the call stays indirect. Before rewriting, the pass also
requires an exact function type, calling convention and ABI-attribute match.
Variadic calls, `tail`/`musttail`, invokes and unknown call metadata fail
closed, while operand bundles, `notail`, attributes, fast-math flags, debug
locations and the indirect fallback are preserved.

LLVM alias information is emitted only from sealed semantic facts. Alias-scope
domains are operation-distinct even after separately compiled modules are
linked. TBAA describes the storage actually accessed: pointer slots are
pointer storage, whole aggregates and byte views remain conservative, and
scalar field identities include the exact nominal owner and generic
specialization. Missing owner or layout information removes the optimization
claim instead of guessing from a source name.

Call coercions follow the same rule. Direct calls, function values and Vex
source-variadic packing consume the typed HIR coercion plan before physical ABI
transport is selected. LLVM bit widths alone never decide a language
conversion or signedness; an unsealed conversion fails before IR emission.

Memory alignment follows pointer provenance as well. A SIMD value's preferred
register/ABI width is not treated as proof that an array or slice address has
the same alignment. Generic vector memory operations are conservative;
optimized paths publish stronger alignment only from the element type, Vex's
allocator/entry-alloca guarantee, or immutable global storage. This keeps the
same source valid on NEON, AVX2 and AVX-512 without sacrificing vectorized O3
code. Allocator-backed closure fields use their exact TargetData offset, while
array and Vec stores are bounded by the storage base and element ABI. Repeated
SIMD stores also include their byte stride in the proof, so a strongly aligned
first address cannot overstate later iterations. Pointer-transported aggregate
copies use the destination alloca's exact
guarantee and the source type's target ABI alignment; no fixed alignment is
guessed for closure or contract-default arguments. Program-lifetime
`invariant.load` metadata is likewise restricted to real loads from true
constant globals, never ordinary immutable borrows.

The cooperative async-local allocator is also a proven 16-byte source: its
page, bump, size-class and private-header layout preserve that boundary, so its
LLVM return declaration publishes the fact directly. Pointer-backed aggregate
values are not all equivalent, however. Stack storage, general/async allocation,
RC/ARC payloads and user pointers have different guarantees; aggregate copies
must carry storage provenance before the compiler strengthens their alignment.

Runtime function attributes also describe the intersection of all target
implementations, not the most favorable backend. Arena and region accessors may
release a losing first-use runtime-state allocation, while standard-stream
wrappers can cross a libc `FILE*` boundary on macOS. Those functions therefore
keep their proven control-flow facts but do not advertise `nofree` to LLVM.

Bounds facts preserve the source integer contract. Signed and unsigned
indices are widened differently, and 128-bit indices keep all of their high
bits until the bounds decision; the backend never truncates first and then
mistakes a wrapped value for a valid address. SIMD chunk loops prove
`width <= length - index` before publishing any no-wrap increment. Thus the
check itself remains defined even for adversarial maximum-size inputs, while
the guarded hot loop still gives LLVM the strong fact it needs.

Allocation optimizations use exact LLVM def-use identity rather than pointer
names or a search for one direct `free`. Consecutive allocations may be merged
only when every derived use stays local and no derived pointer is freed;
zero-size and overflowing size calculations are rejected. Heap-to-stack and
SBO promotion share the same rule. Pointer casts and GEPs preserve one root,
but PHI/select nodes are not assumed to do so because they may combine distinct
allocation lifetimes.

Heap-to-stack replacement preserves Vex's 16-byte allocator alignment and
never turns a failing zero-size allocation into live stack storage. Coroutine
frames additionally require an explicit non-owning wrapper proof; the optimizer
does not mutate shared async wrapper or cleanup functions to erase frees.

Arena-loop hoisting mirrors the runtime's physical layout. It specializes only
exact constant positive loops, preserves signed induction widening, and uses a
16-byte stride per allocation. All trip/span arithmetic is checked, nested
allocations belong to the innermost loop, and one batch cannot exceed an
ordinary arena chunk. Dynamic or unrepresentable cases retain the original
allocator calls.

Small constant `memcpy` lowering is equally provenance-aware. Byte-pointer
inputs are scalarized only for non-volatile copies and the generated accesses
remain conservatively aligned to one byte unless an independent provenance
proof strengthens them. Bounds-check reuse requires the exact normalized index
and length SSA values plus dominance by a previous successful check; the
optimizer never erases aggregate-field identity or signedness casts to invent a
shared proof.

CPU/GPU UMA barrier removal is proof-carrying. A pointer that is only read by
the CPU is not enough: the read may follow a GPU write and require coherence.
The optimizer removes a barrier only when semantic Valence lowering seals an
exact proof covering transition direction, producer completion and the full
alias set. Missing proof keeps the barrier live, and exception-capable `invoke`
sites are never rewritten as plain branches.

Constant string-slice folding preserves the language-level `usize` domain as
well. High-bit indices remain unsigned and clamp to the view length exactly as
the runtime operator does; the LLVM folder never reinterprets them as negative
signed offsets. Receiver and result layouts are validated before constructing
constant pointers or VexStr values.

SSO concatenation folds only after validating its complete physical result
layout. Unknown or stale layouts keep the original call, and pointer payloads
retain their declared address space.

Diverging direct calls terminate in `unreachable`; pruning their stale normal
continuation also repairs successor PHI predecessors before LLVM sees the CFG.

Inlining uses two levels of evidence. HIR can attach positive hints from typed
semantic shape, and a post-lowering budget checks the concrete body after
specialization, ownership lowering and Vex-specific simplification. Bodies
over the configured instruction ceiling lose only automatic positive hints;
the compiler does not turn size into a blanket `noinline` contract. Explicit
source `inline fn` declarations and genuine semantic/cold boundaries remain
authoritative, while LLVM's target-aware cost model decides otherwise unhinted
call sites. Opt-in module profiling reports the top-five body concentration so
cold outlining is introduced from measured evidence rather than source size.

### SIR Path

When the program shape is suitable for data-parallel lowering, Vex can form SIR graphs that later target SIMD and selected accelerator backends.

This path is the basis for:

- vector-style arithmetic
- tensor and mask operations
- fusion and graph rewrites
- backend-specific kernel generation

## Driver Layer

The user usually interacts with the compiler through `vex-cli`, which wraps compilation, linking, execution, and test discovery.

That means the operational pipeline is often:

```text
vex run / vex compile / vex test
  -> compiler driver
  -> embedded VRI selection + semantic fusion
  -> explicit target/native link plan
  -> execution or test reporting
```

## Related Pages

- [SIR & Backends](/architecture/sir-and-backends)
- [Comptime Pipeline](/architecture/comptime-pipeline)
- [Runtime & Tooling](/architecture/runtime-and-tooling)
- [CLI Reference](/references/vex-cli-reference)
