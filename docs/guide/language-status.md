# Language Status

Vex is currently released as `0.4.0-rc.39`. It is a pre-1.0 language: the compiler is usable for development, but the language and runtime are still changing. This page explains how to read the rest of the documentation.

## Status labels

### Verified

The parser, semantic analysis, compiler, or runtime has direct test coverage and the feature is used in checked repository examples. Verified does not mean that every combination is complete; the page should still describe any narrower limitation.

### Experimental

The feature exists and can be useful, but its behavior, backend support, or API may change before 1.0. Experimental features should be isolated behind a small interface in applications that need to track compiler upgrades.

### Partial

The language surface is present, but one or more important paths are incomplete. A partial feature belongs in the documentation when its current behavior is useful or when understanding it helps explain the direction of the language.

### Planned

The concept has a design or implementation direction, but the current compiler should not be expected to accept the examples as written. Planned behavior is kept separate from the reference syntax for implemented features.

## Current implementation map

| Area | Current status | What to expect |
| --- | --- | --- |
| Core syntax and expressions | Verified | Functions, bindings, blocks, conditionals, loops, ranges, calls, assignments, and common operators are implemented. |
| Primitive types and inference | Verified | Explicit annotations are available for all code that needs a stable ABI or numeric width. Unsuffixed integer literals default to `i32` when no context provides a type. |
| Structs, tuples, arrays, and enums | Verified | These are the main data-model building blocks. Payload matching and some advanced pattern forms are still being expanded. |
| Generics and contracts | Partial | Generic functions, generic structs, contract declarations, and receiver methods exist, but the full interaction matrix is not yet a stability guarantee. |
| Comptime and typed reflection | Verified | Strict `#` boundaries, `const fn` CTFE, typed reflection, deterministic collections, and typed residual staging are implemented for the documented V2 surface. Unsupported effects fail closed. |
| Structural declaration generation | Verified | Authorized `DeclSet` generators emit typed functions, methods, nominal types, constants, aliases, conformances, constraints, and patterns without source/token synthesis. Arbitrary boolean constraint algebra remains outside V2. |
| Ownership and borrowing | Verified | Immutable bindings, explicit mutation, moves, references, and lifetime diagnostics are part of the semantic checker. |
| `Option` and `Result` | Verified | Both are used for absence and recoverable failure. Helper APIs and error conversion continue to evolve. |
| `go` blocks and channels | Experimental | The syntax and runtime path exist, with checked examples. Scheduling, blocking behavior, and broader library integration remain active areas. |
| `async fn` and `await` | Experimental | Async declarations and await lowering are implemented. Runtime behavior should be tested on the target platform before being treated as a stable application contract. |
| SIMD, tensors, and SIR | Experimental | The language and intermediate representation expose data-parallel operations; backend coverage and optimization guarantees vary by target. |
| GPU and accelerator backends | Experimental | GPU graph functions and backend integrations are under active development. Do not assume that every backend accepts every SIR operation. |
| FFI and freestanding builds | Experimental | The compiler exposes the necessary low-level surfaces, but ABI, linker, and platform details must be verified for each deployment target. |
| Package management and registry workflows | Partial | Project and package commands exist, while registry behavior and ecosystem conventions are still being formed. |
| WASM and non-primary platforms | Experimental | Support depends on the target, runtime subset, and available system libraries. See [platform support](/guide/platform-support). |

Source analysis and native execution are separate validation levels. A
successful `vex lint` run does not perform fused backend codegen, native
linking, or execution of the produced program.

## How to use examples

Examples in the guide follow three rules:

1. A runnable example includes a complete `main` function and uses syntax accepted by the current compiler unless the page explicitly says otherwise.
2. A conceptual fragment is labelled as a fragment and is not presented as a complete program.
3. An unsupported or incomplete design is shown as text or described in prose, not as a copy-and-paste program that silently fails.

When an example exposes a compiler problem, the problem is recorded in a root-level compiler issue report with a reproduction and the observed diagnostic. Documentation work continues for the unaffected parts of the language.

## Stability policy

Vex does not promise post-1.0 compatibility while it is in the `0.x` series. Pin the compiler version in CI, keep experimental features behind narrow interfaces, and read the [versioning guide](/guide/versioning) before upgrading.

The most reliable sources of truth are, in order:

1. a passing compiler or runtime test;
2. a checked repository example;
3. the language guide and reference pages;
4. design notes and roadmap documents, which may describe future behavior.

## Related pages

- [Introduction](/guide/introduction)
- [Versioning and Stability](/guide/versioning)
- [Platform Support](/guide/platform-support)
- [Compiler Pipeline](/architecture/compiler-pipeline)
- [Compile-Time Evaluation](/guide/advanced/comptime)
- [Structural Declaration Generation](/guide/advanced/comptime-declarations)
