---
layout: home
hero:
  name: Vex
  text: Systems programming with parallelism in the language
  tagline: "Explicit ownership, practical concurrency, and a path to accelerated code."
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: Install Vex
      link: /guide/installation
    - theme: alt
      text: Check language status
      link: /guide/language-status
features:
  - title: A systems language with a small core
    details: "Functions, immutable bindings, explicit mutation, structs, enums, pattern matching, and typed low-level access share one consistent model."
  - title: Memory-Safe Systems Model
    details: "Ownership, borrowing, non-lexical lifetime analysis, and explicit unsafe boundaries are part of the language rather than library conventions."
  - title: Concurrency as a language feature
    details: "go blocks, async functions, await, and channels are designed to work with the same type and ownership checks as synchronous code."
  - title: Data-parallel foundations
    details: "Arrays, tensor-oriented operations, reductions, and the Silicon IR pipeline provide an experimental path to SIMD and accelerator backends."
  - title: Direct systems interop
    details: "Typed pointers, spans, raw buffers, FFI declarations, and freestanding builds cover the cases where a runtime abstraction is not enough."
  - title: A toolchain that explains itself
    details: "The compiler, checker, formatter, test runner, documentation generator, LSP, and package tools are documented separately and honestly."
  - title: Typed compile-time programming
    details: "Strict CTFE, typed reflection, partial evaluation, and structural declaration generation reuse ordinary Vex semantics without token macros or a second runtime model."
---

## Start with the language

The guide is organized as a progression rather than a catalogue of isolated features:

1. Read the [introduction](/guide/introduction) to understand Vex's design and the current implementation boundary.
2. Follow [installation](/guide/installation) to build the compiler and run a first program.
3. Learn the core language through [syntax](/guide/basics/syntax), [variables](/guide/basics/variables), [functions](/guide/basics/functions), and [control flow](/guide/basics/control-flow).
4. Continue with [types](/guide/types/primitives), [enums](/guide/types/enums), [ownership](/guide/memory/ownership), and [error handling](/guide/error-handling).
5. Use the specialist sections for [concurrency](/guide/concurrency/overview), [SIMD and tensors](/guide/simd/), [GPU and SIR](/guide/gpu/), [FFI](/guide/ffi), and [tooling](/guide/tooling/full-toolchain).
6. Continue with [compile-time evaluation](/guide/advanced/comptime) and
   [structural declaration generation](/guide/advanced/comptime-declarations)
   when you need typed metaprogramming.

Every language example is intended to be small enough to copy into a file. When a feature is not ready for general use, the page labels that fact and points to the relevant limitation instead of presenting a design sketch as production behavior.

## Find the right reference

- [Language status](/guide/language-status) explains what is verified, experimental, or still planned.
- [Architecture](/architecture/) describes the compiler pipeline, runtime, and intermediate representations.
- [Reference](/references/) documents command behavior for the CLI, test runner, documentation generator, and package tools.
- [Standard library](/std/) is the API reference generated from the library source.
