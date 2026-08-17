# SIMD / SIMT Unified Execution Contract

Vex uses one user-visible compute model for both CPU vectorization and GPU execution.

The goal is simple:

- write normal Vex code (`array` / `Tensor<T,N>` / `Tensor<T>` / `Span<T>`)
- keep semantics in one place
- let runtime pick CPU SIMD, SIMD-like CPU kernels, or GPU SIMT backend

There is **no separate “SIMT API”** in user code; kernel concepts come from the same
algebraic operations and the same `Tensor`/`Mask` abstractions.

## 1) Core cross-backend contract

Every operation category below has the same source-level meaning independent of backend:

- `Map` (unary/binary element-wise ops): `f(a)` / `f(a,b)`
- `Reduce`: `sum`, `prod`, `min`, `max`, `all`, `any`, etc.
- `Compare`: `==`, `<`, `>`, `<=`, `>=`
- `Mask` creation + mask algebra: `&`, `|`, `^`, `~`
- `Select`: `cond ? a : b` / `mask.select(a,b)`
- `Index`: `gather`, `scatter`, `scatter_add`, `scatter_max`...
- `Prefix/scan` style kernels used in higher-level algorithms

The compiler emits the same semantic node for both backends where possible; execution
engine choice is done only by dispatch policy and capability.

## 2) Ownership and shape contract

- `Mask<N>` and `Tensor<T, N>` represent **fixed-shape** values and are suitable for register-level codegen when width/shape allow it.
- `DynMask` / `Tensor<T>` represent **runtime-shape** values. `DynMask` stores packed bits and an owner field; it is not a `{ptr,len}` byte slice.
- Scalar forms always stay scalar. Vectorized backends must not change user-visible scalar behavior.
- `Span<T>` is a borrowed view; moving into owned tensor values follows the ownership rules documented in memory sections.

## 3) CPU SIMD vs GPU SIMT behavior

- **SIMD backend** = register/vector execution (`+simd` style codegen, loop-vectorized kernels, and fixed-width tensor lowering).
- **SIMT backend** = one lane/thread lane mapping (GPU warp/wavefront model).

They differ in scheduling:

- register width / lane count
- memory model (`cache` vs `threadgroup`/`global`)
- launch granularity (`for`-body vs kernel/thread semantics)

They **must not** differ in:

- operator identities
- mask semantics
- comparison truth tables
- overflow and clamp policies
- ownership transitions (when a result is borrowed vs owned)

## 4) What "same interface" looks like in practice

The same source stays identical:

```vex
// same user code for both fallback SIMD and GPU path
fn relu(x: Tensor<f32>): Tensor<f32> {
    return x.max(0.0)
}

fn keep_positive(x: Tensor<f32>): Tensor<f32> {
    let m = x > 0.0
    return m.select(x, 0.0)
}
```

If a backend cannot support the exact fast path, it must preserve correctness and
fall back to a valid implementation of the same contract instead of changing semantics.

## 5) Backend capability matrix (contracted)

| API family | CPU SIMD (fixed + dynamic) | GPU SIMT (Metal/CUDA/ROCm/SPIR-V/WGSL) | Contract requirement |
|---|---|---|---|
| Map (`+`, `*`, custom `Math.*`) | Yes | Yes | elementwise identity must match |
| Compare + `Mask` | Yes | Yes | same boolean result layout rules per type |
| Reduce (`+`, `*`, `min`, `max`, `all`, `any`) | Yes | Yes | scalar return type and NaN/compare policy aligned |
| Select (`cond ? a : b`) | Yes | Yes | predicated result for each logical lane/thread |
| Gather/Scatter | Yes (where supported) | Yes (where supported) | deterministic indexing semantics |
| Mask bit operations | Yes | Yes | same logical truth tables |
| Prefix scan / cumulative ops | Partial | Partial | keep same algebraic associativity expectations |
| `Mask.compress` | Yes: LLVM vector intrinsic or legal register network | native subgroup/warp/wave fast path plus bounded portable fixed-mask legalization | stable selected prefix, exact count, deterministic zero tail |

## 6) Lane width and compaction

`#Target.simdLanes<T>()` reports the logical lane count selected for `T` at
compile time. The meaning is shared, while the physical executor differs:

- on CPU it is the number of `T` elements in the selected native vector width,
- on CUDA and Metal it is the native 32-lane warp/simdgroup width,
- on ROCm it follows the selected device's wave32/wave64 profile,
- on portable SPIR-V/WGSL it is unavailable until a concrete device profile
  guarantees subgroup capabilities and width.

The last case is deliberately fail-closed. A `#` intrinsic cannot truthfully
return a subgroup size that is known only after runtime adapter selection.

For dynamically routed `graph fn` code, lane-dependent graph specialization
must therefore happen after the backend/device profile is selected. A lane
constant produced for the CPU variant must not be reused by a GPU variant.
HIR lowers the exact intrinsic identity to a symbolic SIR `ExecutionLanes`
node. The selected backend then clones the graph and replaces that node with a
constant: element-width-aware on CPU, 32 on CUDA/Metal, wave32/wave64 on ROCm,
or the exact adapter subgroup width for SPIR-V/WGSL. The source graph is never
mutated, so independently compiled CPU and GPU variants cannot leak constants
into each other.

Inside `graph fn`, use the value as an ordinary expression. It is not legal in
`#if` or `#const`, because backend/device routing happens after graph creation.
The backend-specialized value is still emitted as a constant and has no runtime
query cost.

For a fixed `Mask<N>` and `[T; N]`, `mask.compress(values)` has one definition
on every backend:

```vex
let (packed, count) = mask.compress(values)
```

- selected values occupy `packed[0..count]` in their original order,
- `packed[count..N]` is deterministically zero,
- `count` is `usize`,
- inactive physical GPU lanes do not participate,
- and a mask wider than one native subgroup uses a bounded whole-mask
  legalization; a backend never presents independent subgroup compactions as
  one result.

Current SIR lowering covers CPU scalar/SIMD, Metal, CUDA, ROCm, and
SPIR-V/WGSL. Profiled SPIR-V/WGSL compaction uses subgroup arithmetic
for an exact stable rank plus a subgroup barrier; it does not pay for a ballot
unless an actual bitmask is requested. The WebGPU runtime requests `SUBGROUP`
and `SUBGROUP_BARRIER` and reads the selected adapter's subgroup range. An exact
range (`min == max`) can specialize `simdLanes`; a variable range cannot. It can
still run the native `compress` path when `N <= min`. Without that proof—or
when the fixed mask is wider—the backend emits a bounded portable whole-mask
kernel. This does not manufacture a `simdLanes` constant and therefore keeps
the compile-time query honest while preserving operation semantics.

The standalone-kernel boundary validates this structurally before any backend
sees the graph: `Mask<N>` is fixed to `1..=64`, operands and results must have
matching lane counts and dtypes, and unrelated SIR nodes or extra buffers are
rejected instead of being silently discarded. `toBitmask` uses one `i64/u64`
transport scalar. Packed `Int4`/`Fp4` compaction uses two nibbles per logical
host byte and eight nibbles per canonical GPU `u32` word. Conversion is owned
by the descriptor boundary, so no backend can reinterpret packed values as
byte lanes.

`Mask` also has one transport contract. Its source and host representation
remains abstract (fixed masks may be packed), while GPU storage buffers use one
`u32` per lane because WGSL/SPIR-V do not permit boolean storage-buffer lanes.
The shared SIR runtime expands packed or byte-per-lane inputs at the GPU
boundary and restores mask outputs to logical one-byte values. This is an
internal ABI detail: CUDA, ROCm and Metal source code does not acquire a
different `Mask` API.

The versioned execution descriptor carries the exact kernel representation,
entry point, ordered inputs and outputs, per-buffer logical encoding, and
grid/workgroup geometry. Metal, WebGPU and CUDA consume this same contract;
backend-specific positional FFI conventions are not part of `Mask` or
`Tensor` semantics.

Kernel representation is selected by the concrete executor, not by the host
OS: a Metal executor requests MSL, while a WebGPU executor requests SPIR-V even
when WebGPU is the fallback on macOS. This keeps device routing and subgroup
specialization attached to the same capability source.

Metal, CUDA and ROCm lower the canonical `(packed, count)` result as one real
standalone kernel with inputs followed by outputs in the runtime binding order.
Each selected lane computes a stable rank, the lane group clears the tail,
synchronizes once, and writes the selected prefix. Metal output is compiled by
Apple's shader compiler in the regression suite; CUDA PTX and ROCm HIP receive
structural codegen tests and require their native toolchains/hardware in the
platform CI matrix.

Codegen parity and runtime-routing parity are deliberately separate. Metal,
WebGPU and feature-gated CUDA PTX implement the common descriptor-based SIR
graph executor. CUDA honors the descriptor's exact entry point, ordered
buffers and grid/block geometry. ROCm can execute a descriptor containing
precompiled HSACO; HIP source and compiled HSACO are
different kernel representations, so HIP source fails closed until hipRTC or
an AOT compilation step produces a real code object. Vulkan SPIR-V codegen is
also not confused with a native Vulkan dispatcher. This preserves one public
SIMD/SIMT interface without pretending that every deployment bridge is already
complete.

The AOT compiler bridge is gated independently from the runtime executor.
Metal currently has a compatible compiler call bridge. WebGPU remains fully
usable through the SIR runtime executor, but compiler-generated calls fall back
until the legacy N-input/single-output FFI is replaced with the same descriptor
contract. This prevents an ABI mismatch while preserving WebGPU's real runtime
capability.

Backend capability failure never changes value semantics. For example, Metal
has no native `f64` lane type, so Metal codegen rejects `Mask.compress` over
`f64` and the planner must route it elsewhere rather than narrowing values to
`float`. Native standalone Mask kernels use one warp/wave/simdgroup when
possible. Wider fixed masks use the bounded whole-mask path rather than
changing the result or requiring source-level backend branching.

The descriptor-based SIR runtime carries both outputs and performs the mask
transport conversion. The older compiler GPU FFI bridge still accepts only one
ordinary output buffer; it now rejects fixed/DynMask transport and multi-output
graphs so dispatch falls back to CPU instead of risking a buffer overrun. It
will be enabled for this path only after the same descriptor ABI is wired into
that bridge.

All cross-lane operations (`toBitmask`, `any`, `all`, `countBits`, `firstSet`,
and `compress`) use a proven native execution-lane group when possible and a
bounded whole-mask legalization otherwise. No backend may independently reduce
or compact each warp/wave and present that as a whole-mask result.

## 7) How we keep backend parity safe

- Keep the language surface in `Tensor`/`Mask` operations and do not branch on backend in user code.
- Treat SIMD width and GPU workgroup size as hints chosen by compiler/runtimes.
- Use the docs’ operator tables and pipeline pages as the behavioral source of truth.
- Validate important kernels both on CPU SIMD and GPU paths when changing contracts (especially reductions).

## 8) Why this matters

When this contract is respected:

- compiler codegen can optimize one operation into many backends
- `graph fn` can stay backend-agnostic
- benchmark deltas come from schedule/capability, not API drift

If you want raw backend-specific tuning, do it behind a feature-gated call boundary
without replacing this base contract.

## Related docs

- [SIMD Overview](/guide/simd/)
- [SIR Pipeline](/guide/simd/sir-pipeline)
- [Tensor and Mask Types](/guide/simd/tensor-mask)
- [GPU Programming](/guide/gpu/)
