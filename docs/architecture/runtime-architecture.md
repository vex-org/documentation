# Runtime Architecture

VexArch is the target-routed runtime implemented in
Vex under `lib/runtime/VexArch`. It provides allocation, ownership support,
async scheduling, channels, I/O, networking integration, panic paths, and
platform ABI adapters without making libc an implicit language dependency.

The separately packaged `vex-runtime-core` Rust artifact is a hosted
compatibility option. It is not folded into the freestanding VexArch object,
bitcode, or archive.

## Runtime Layer Map

```text
+------------------------------------------------------+
| Vex application and lib/std public APIs              |
+------------------------------------------------------+
                         |
                         v
+------------------------------------------------------+
| Compiler HIR/ABI lowering and generated code         |
+------------------------------------------------------+
                         |
                         v
+------------------------------------------------------+
| VexArch                                               |
| mem | async | channel | io | unwind | platform glue  |
+------------------------------------------------------+
             |                          |
             v                          v
+---------------------------+  +------------------------+
| Explicit OS system ABI    |  | Manifest-owned native |
| SYSTEM / selected LIBC    |  | NATIVE feature        |
+---------------------------+  +------------------------+
```

There is no universal `extern "C"` import bucket. Every imported symbol states
its owner:

| Provider | Meaning |
| --- | --- |
| `extern "LIBC"` | An intentional hosted C-library dependency |
| `extern "SYSTEM" from "library"` | A named operating-system DLL, dylib, or framework |
| `extern "VEX"` | Compiler/runtime-owned ABI; reserved for VexArch, prelude, and standard-library internals |
| `extern "NATIVE" from "feature"` | A package native feature whose artifacts are declared in `vex.json` |

`export "C" fn` is different: it defines an unmangled outbound C-ABI symbol.
It does not select an import provider or add a library dependency.

See the [FFI guide](/guide/ffi) for the complete provider contract.

## Target-Routed Sources

Vex source files can select an OS and architecture directly. For an import of
`native.vx`, resolution uses the first file that exists:

1. `native.<os>.<arch>.vx`
2. `native.<os>.vx`
3. `native.<arch>.vx`
4. `native.vx`

The same rule applies to `.vxc`. Source routing uses OS/architecture names;
package native artifacts use exact target triples. These are intentionally
separate mechanisms.

## Memory and Freestanding Boundary

The active memory implementation lives under `VexArch/src/mem`:

- `arena.vx` owns arena state, region tokens, and runtime state;
- `alloc.vx` owns slab, heap, realloc, and compatibility allocation entry
  points;
- `vumm.vx` implements Vex Unified Memory Model routing;
- `raw_pages.*.vx` and `compat.*.vx` provide target-specific page, thread, and
  process primitives.

VexArch does not require a hosted `malloc/free` allocator. Target code may call
explicit system APIs, direct kernel interfaces, or selected hosted facilities,
but such dependencies remain visible through the provider and final link plan.
A freestanding link rejects activated `LIBC` requirements.

Prelude types such as `Box`, `Vec`, `string`, and `Mem` use the reserved VEX ABI
internally. Application code consumes their public APIs instead of declaring
raw allocator symbols.

## Async Runtime and Channels

The scheduler and async state machine support live under `VexArch/src/async`:

- `async.vx` owns worker/task scheduling and lifecycle;
- `channel.vx` implements channel state and waiter coordination;
- `timer_wheel.vx` tracks timed wakeups;
- `poller.<target>.vx` integrates the target event mechanism.

Reachable async code is capability-specialized. Straight-line `async fn` and
`await` graphs use a single-owner cooperative FIFO without materializing worker,
timer, channel, or poller machinery. Because that mode has no external wake
source, live tasks with an empty runnable FIFO are reported immediately as a
cooperative deadlock instead of consuming a core in finalization. Full async
graphs retain provider-aware parking because an empty runnable set can be
waiting legitimately on I/O, timers, or channels.

Background worker bootstrap is also ownership-checked. A native thread enters
the scheduler only after its thread-local async state is attached to the exact
shared runtime that spawned it. If attachment fails, the worker cleans up and
acknowledges exit instead of constructing a second scheduler and leaving the
original runtime blocked during shutdown.

Target files select the appropriate implementation at compile time. Runtime
modules import concrete Vex implementations directly where possible. A small
number of reserved VEX ABI edges remain where two core runtime modules form a
deliberate dependency cycle or where a native bootstrap shim supplies the
symbol.

## I/O and Networking

VexArch owns stream state and exposes runtime I/O entry points. Target-specific
files such as `io/native.macos.vx`, `io/native.linux.vx`, and
`io/native.windows.vx` bind to the relevant system surface without exposing C
`FILE` layout as Vex ABI.

`lib/std/io`, `lib/std/fs`, and `lib/std/net` build public, typed APIs over this
boundary. Their low-level target files use explicit `SYSTEM`, `LIBC`, `VEX`, or
`NATIVE` declarations according to the actual symbol owner. Optional native
codecs, database drivers, or TLS implementations are package features rather
than hidden global linker inputs.

## Extern Activation and Linking

Parsing an extern declaration alone has no link effect. Codegen records the
providers required by emitted uses, and the CLI constructs a deterministic
native link plan from those activated requirements.

Important failures are reported before native linking:

- an activated `LIBC` provider is rejected in freestanding mode;
- an unresolved `VEX` provider is rejected when `--no-runtime` is selected;
- a `NATIVE` feature must resolve to artifacts owned by the package manifest;
- system libraries are deduplicated deterministically.

Provider requirements are preserved beside warm prelude cache entries, so a
warm compile cannot silently lose an FFI dependency.

## Runtime Semantic Image and Fusion

VexArch is not shipped or linked as a separate LLVM bitcode, object, static
archive, or shared library. Cargo validates the VexArch package and embeds a
deterministic, versioned Vex Runtime Image (VRI) in the compiler. The image
contains lossless pre-parsed syntax, stable package/source identities,
provenance and target selectors.

For each user compilation the compiler rehydrates the selected VRI sources
without invoking the parser. User code, the prelude and VexArch then enter one
semantic graph. Exact `DefId` reachability, monomorphization and callback
address-taking decide which runtime bodies are materialized in the same backend
module as user code. This keeps cross-boundary inlining and eliminates unused
runtime code before backend DCE.

Architecture-specific assembly is allowed only for operations that cannot be
expressed in Vex. Cargo assembles this tiny target pack once and embeds it in
the compiler; the CLI materializes the content-addressed object only because
native linkers require a filesystem input. It carries no Vex semantics.

## Safety Rules

- Foreign calls require an audited `unsafe` boundary.
- A concrete local definition or explicit import owns its name over an ambient
  prelude extern declaration.
- Raw VEX ABI declarations are runtime/standard-library internals, not the
  application-facing API.
- Provider choice describes ownership; it is not inferred from a filename or
  platform convention.
- Outbound `export "C" fn` definitions must expose explicitly ABI-safe types.

## Related Pages

- [FFI](/guide/ffi) -- provider syntax and link behavior
- [FFI Deep Dive](/guide/ffi-deep-dive) -- ownership and ABI design
- [Freestanding Vex](/guide/freestanding) -- hosted and freestanding boundaries
- [VUMM](/guide/memory/vumm) -- Vex Unified Memory Model
- [Concurrency Deep Dive](/guide/concurrency/deep-dive) -- scheduler behavior
