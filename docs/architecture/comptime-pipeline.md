# Comptime Pipeline Architecture

Vex comptime is a semantic HIR stage shared by the compiler, diagnostics,
lint, and LSP. LLVM is a consumer of the result, not the evaluator and not the
source of compile-time truth.

## End-to-end flow

```text
source + target + tracked build inputs
  -> parse and lower source HIR
  -> discover eager module generators
  -> canonical CTFE under one metered expansion session
  -> seal source + generated declaration snapshot
  -> inference, contracts, ownership, borrow and layout validation
  -> effect classification and typed staging
       -> Known(value)
       -> Residual(typed HIR)
       -> Error(diagnostic)
  -> compiler / diagnostics / lint / LSP consume the same snapshot
  -> normal monomorphization, Valence/VUMM, fusion and backend lowering
```

This ordering prevents two historical failure modes:

1. a codegen-only evaluator making semantic decisions after analysis; and
2. generated source or bitcode losing identities, generic substitutions,
   provenance, ownership facts, or target facts at a serialization boundary.

## One canonical evaluator

Canonical CTFE operates on Vex HIR values and semantic IDs. It does not depend
on `CodegenContext`, LLVM values, symbol names, or host pointers.

The value model covers target-aware fixed-width integers, bools, floats, text,
typed aggregates, enums, sequences, insertion-ordered maps, references,
reflection records, callable handles, and invocation-bound declaration plans.

Every evaluation runs with explicit context:

- source and expansion provenance;
- exact generic type and const arguments;
- selected target facts;
- effect capabilities;
- tracked environment/source inputs;
- step, recursion, allocation, byte, collection, diagnostic, and expansion
  budgets.

Required-comptime evaluation has only two terminal outcomes: a value/expansion
or an error. It never silently asks codegen to execute the operation at
runtime.

## Effect model

Functions are classified from their semantic body and reachable calls. The
important distinction is whether an operation is legal and deterministic in
the current compile-time context—not whether it comes from user code, std, or
VexArch.

Pure arithmetic, exact reflection, deterministic collection operations, and
tracked source/target queries may execute during CTFE. Runtime I/O, clocks,
untracked external state, unsupported FFI, and runtime-only effects remain
residual or are rejected by a strict boundary.

Effects are transitive. A wrapper around a runtime-only call is not considered
pure merely because its own body contains no direct intrinsic.

## Typed staging and residualization

Staging reports a typed result:

```text
StageResult<T> = Known(T) | Residual(ResidualHIR<T>) | Error(Diagnostic)
```

The rewrite is transactional. A candidate is committed only after the known
subgraph evaluates, the replacement is well typed, and consumer-visible
semantics remain valid. Otherwise the original HIR is preserved or a strict
boundary emits a diagnostic.

The accepted V2 frontier folds maximal known:

- primitive binary operations;
- primitive unary operations;
- casts; and
- exact function/method call islands.

Runtime-dependent parents remain ordinary HIR. Overloaded operators with an
exact callable fact are excluded from the primitive path until canonical CTFE
can dispatch that callable directly.

## Collections and runtime materialization

Compile-time allocations live in metered compiler storage. Host addresses are
never Vex values and cannot escape.

When a known text, sequence, map, struct, or enum must enter runtime HIR, CTFE
produces a typed construction recipe. That recipe is lowered through the
ordinary ownership path:

```text
known CTFE value
  -> typed materialization recipe
  -> ordinary residual Vex HIR
  -> borrow/move/drop validation
  -> Valence/VUMM allocation and ownership selection
  -> fusion and backend codegen
```

There is no comptime-specific runtime allocator, object header, reference
count, drop path, or hidden map representation.

## Structural declaration expansion

An eager module generator is a top-level, non-generic, parameterless `const
fn` returning `DeclSet`. Discovery creates a request containing its exact
function identity, module owner, stable site key, lexical anchor, target, and
budgets.

The generator returns compiler-owned structural plans. Expansion:

1. reserves stable identity ranges for every invocation;
2. executes all generators under one cumulative metered session;
3. validates declaration roles, types, constraints, bodies, patterns, hygiene,
   and ownership;
4. remints generic type and const binders for the generated owner;
5. seals one combined source/generated scope and inference snapshot; and
6. exposes that same snapshot to compiler and tooling consumers.

Generated native functions cross a dedicated typed boundary containing their
signature, HIR body, provenance, and frozen inference result. They are not
converted into source text, a synthetic parser tree, or a separate `.bc`
module.

## Fusion and VexArch

Known values are embedded into ordinary HIR before backend lowering. Residual
user, std, and VexArch calls stay semantically visible in the same module and
monomorphization graph. This allows normal inlining, reachability analysis,
runtime fusion, ABI selection, and dead-code removal to operate across the
boundary.

Comptime does not bypass VexArch. It can execute eligible VexArch `const fn`
logic, but runtime VexArch work remains in the same fused runtime path as
handwritten user code.

## Persistent cache

Persistent entries are semantic query results, not snapshots of host memory.
Their keys include the compiler/language semantic version, target identity,
generic instantiation, source dependencies, tracked environment/embed inputs,
and effect policy.

Deserialization validates the entire recursive wire envelope. Current hard
limits are:

| Limit | Value |
| --- | ---: |
| Semantic nodes | 100,000 |
| Semantic payload | 64 MiB |
| Recursive depth | 256 |

The stack-safe validator meters value nodes, type arguments, nominal fields,
and promoted projections. Corrupt, stale, too-deep, oversized, or
target-incompatible entries become cache misses.

Invocation-bound declaration values and compiler-storage addresses are never
published as ordinary persistent constants.

## Target portability

Layout, pointer width, integer domains, and target-specific intrinsic choices
come from the exact semantic target key. Backend lowering checks that its LLVM
target agrees with that key and fails closed on drift.

For example, PDEP/PEXT may select LLVM x86 BMI2 intrinsics only for an exact
`x86_64 +bmi2` target. Generic x86_64, i686, AArch64, and PowerPC64 use the
deterministic software lowering. A host CPU feature cannot leak into a
cross-compiled artifact.

## Consumer parity

Compiler, diagnostics-only analysis, lint, and LSP use the same expansion and
staging queries. The parity harness checks:

- known/residual/error classification;
- values and diagnostics;
- generated identity and provenance;
- target-sensitive behavior;
- no-artifact analysis without LLVM;
- native lowering of the same sealed HIR.

The current V2 closure gates include full HIR and native suites, architecture
invariants, HIR/CLI parity, persistent-cache envelope tests, and a semantic
performance fixture.

### Staging rollout and explicit canary

Opportunistic staging is disabled by default. Native compile, run, and IR
commands expose the closed state directly:

```bash
vex compile --comptime-staging disabled app.vx
vex compile --comptime-staging analyze app.vx
vex compile --comptime-staging apply-known app.vx
```

`disabled` is the default. `analyze` classifies known, residual, and error
outcomes but preserves the original codegen HIR. `apply-known` is an explicit
experimental canary: it transactionally replaces only materialization-ready
known islands in user/std HIR. Runtime effects and unsupported values remain
ordinary typed HIR. Compiler-owned VexArch/prelude support is not
opportunistically reinterpreted; it still participates in the normal fused
module.

Lint and test retain the observation-only `--analyze-comptime` option; test
mode forwards it to generated test and benchmark compilation. LSP uses the
default-false `analyzeComptime` setting in initialization options or `vex.lsp`
configuration. These tooling controls cannot select `ApplyKnown`. Lint writes
its aggregate semantic summary to stderr; test and benchmark runners forward
the compiler summary; LSP retains only the latest summary per URI and clears
it when the setting is disabled.

For compiler telemetry, combine a non-disabled compile/run staging mode with
`--comptime-telemetry FILE`. The versioned `vex.ctfe-staging` schema v4 includes
stable semantic decisions, cache status, VRI inventory, VexArch fusion and
capability reasons, backend phases, object/link timing, and separate host-side
policy discovery plus persistent-cache lookup, decode, semantic-validation,
installation, and publication clocks. Missing phases are `null`, not zero.
These clocks never enter semantic query identity. Telemetry cannot implicitly
turn staging on.

The canary is reversible: returning to `disabled` consumes the original Salsa
HIR snapshot. Native corpus parity, exact custom-drop counts, known-island IR
removal, and seeded differential programs are checked by
`tools/run_apply_known_canary.sh`. Automatic/default `ApplyKnown` remains
post-V2.

## Performance baseline

The release staging benchmark separates analysis overhead from known-root
evaluation:

| Workload | 2026-08-14 median | Throughput |
| --- | ---: | ---: |
| 128 no-call functions | 1.800 ms | 71.1K functions/s |
| 64 literal bindings | 102.6 µs | 624K bindings/s |
| 64 cold known roots | 1.809 ms | 35.4K roots/s |
| 64 warm known roots | 1.506 ms | 42.5K roots/s |

These numbers are a regression baseline, not a universal build-time promise.
Package-scale longitudinal SLOs and further acceleration should follow
profiles that identify a dominant cost.

## Deliberate post-V2 extensions

The architecture keeps the following out of the accepted V2 contract:

- cyclic persistent values;
- arbitrary boolean constraint algebra;
- unknown-slot aggregate residual graphs;
- automatic production-wide `ApplyKnown` rollout;
- unproven scalable/GPU/foreign vector ABI layouts;
- token/procedural macro compatibility layers.

Future work must extend the canonical identity, effect, ownership, target,
cache, and parity contracts. It must not add a second evaluator or a
codegen-only semantic fallback.

## Related

- [Compile-Time Evaluation](/guide/advanced/comptime)
- [Structural Declaration Generation](/guide/advanced/comptime-declarations)
- [Compiler Pipeline](/architecture/compiler-pipeline)
- [Runtime Architecture](/architecture/runtime-architecture)
- [VUMM](/guide/memory/vumm)
