---
layout: home
hero:
  name: Vex
  text: Parallelism-First Systems Programming
  tagline: "Every Cycle, Every Core, Every Time"
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: Architecture
      link: /architecture/
    - theme: alt
      text: CLI Reference
      link: /references/vex-cli-reference
features:
  - title: LLVM 21 Toolchain
    details: "Native codegen is built around LLVM 21.1.8 with JIT and no-JIT execution paths."
  - title: Memory-Safe Systems Model
    details: "Ownership, borrowing, NLL-style analysis, and VUMM-backed heap management without GC."
  - title: SIMD, Tensor, and SIR
    details: "Arrays, tensors, masks, fusion, and backend lowering to SIMD, SPIR-V, WGSL, and Metal."
  - title: Concurrency Built In
    details: "go blocks, async workflows, channels, and a runtime scheduler designed for real workloads."
  - title: Typed Low-Level Access
    details: "Ptr<T>, Span<T>, RawBuf, FFI, and freestanding workflows for systems code."
  - title: Full Tooling Loop
    details: "vex run, vex compile, vex test, diagnostics, formatter, docs tooling, and editor support."
---

## Documentation Map

- [Guide](/guide/introduction): language model, syntax, ownership, concurrency, SIMD/SIR, and tooling.
- [Architecture](/architecture/): compiler pipeline, crate layout, and where major subsystems live.
- [Reference](/references/): command-level and toolchain-level behavior for CLI, test runner, docs, and package management.

## What This Site Covers

This documentation focuses on the Vex language, compiler model, execution pipeline, and developer workflows. Standard library module references live under `/std/`, but the main guide is where language semantics, memory model, concurrency, SIMD/SIR, and error handling are explained.

## Suggested Path

1. Start with [Introduction](/guide/introduction).
2. Set up the toolchain with [Installation](/guide/installation).
3. Learn the core language in [Syntax](/guide/basics/syntax), [Functions](/guide/basics/functions), and [Control Flow](/guide/basics/control-flow).
4. Move to [Enums](/guide/types/enums), [Ownership](/guide/memory/ownership), and [Error Handling](/guide/error-handling).
5. Finish with [SIMD](/guide/simd/), [GPU & SIR](/guide/gpu/), and [Testing](/guide/tooling/testing).
