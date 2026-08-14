# Vex Language Documentation Coverage

> **Last reviewed:** 2026-08-14
> **Current bundle:** regenerated from all Markdown sources
> **Status:** Core learning path, homepage, and high-risk maturity claims refreshed; feature-by-feature accuracy review continues.

This file tracks documentation coverage and quality. A page existing is not the same as every claim on that page being verified. Compiler-supported syntax, experimental features, and planned APIs must remain visibly distinct.

## Status labels

| Label | Meaning |
| --- | --- |
| Verified | Checked against the current compiler or a maintained source-of-truth implementation. |
| Experimental | Present in the language or compiler, but runtime, library, or platform behavior is still changing. |
| Partial | The main surface is documented, while important edge cases or integration pieces remain unfinished. |
| Planned | The concept is known, but it should not be presented as a stable current feature. |

## Completed in the current pass

- Reworked the homepage around the language's actual strengths and current limits.
- Rewrote the introduction, installation, syntax, variables, functions, control flow, enums, structs, error handling, ownership, borrowing, concurrency overview, and channels pages.
- Added a language-status page with an explicit maturity matrix.
- Added compiler validation notes for syntax examples and documented the current macOS runtime failure in the repository root.
- Removed fabricated benchmark tables, stale release claims, unsupported production labels, and presentation-only emoji/status markers from the documentation sources.
- Regenerated the documentation bundle and verified the Vite/VitePress production build.
- Reworked comptime around the verified strict-boundary and typed-staging
  semantics; documented canonical user/std/VexArch CTFE, shared VUMM/Valence
  materialization, persistent-cache/target rules, and controlled V2 limits.
- Added a verified structural `DeclSet`/`DeclExpr` declaration-generation guide
  and a compiler-facing comptime pipeline architecture page.

## Coverage map

### Basics

`syntax.md`, `variables.md`, `functions.md`, `control-flow.md`, `loops.md`, `template-literals.md`

### Types

Primitive, compound, generic, enum, struct, contract, pattern-matching, collection, pointer, and function-type pages are present. Continue checking examples against the compiler as syntax evolves.

### Memory

`ownership.md`, `borrowing.md`, `lifetimes.md`, `box.md`, `ptr-t.md`, `span-t.md`, `rawbuf.md`, `safety.md`, `vumm.md`, `pin.md`, and `mem-prelude.md`

### Advanced language features

Methods, operators, built-ins, comptime, typed declaration generation, pointers,
unsafe code, assembly, compiler directives, autograd, and native module linking
are covered. Comptime and declaration generation now identify their verified V2
surface and explicit post-V2 limits; the remaining pages still need the same
maturity labeling when their implementation is incomplete.

### Concurrency and accelerated execution

Concurrency, async, channels, SIMD, tensors, SIR, GPU, and fusion pages are present. They should be read as experimental unless a page explicitly says otherwise.

### Standard library and tooling

The standard-library, CLI, package-manager, testing, architecture, FFI, platform, HDL, versioning, and contribution references are present. Their API examples need periodic compiler and runtime checks.

## Next review queue

1. Audit remaining advanced and standard-library API pages against compiler and runtime tests rather than page prose alone.
2. Add focused compiler checks for representative snippets, especially around FFI, SIMD, GPU, HDL, and package management.
3. Review generated/reference pages for API signatures that have drifted from the current implementation.
4. Keep the root compiler issue report and the language-status page synchronized when implementation behavior changes.

The generated `docs/vex_docs.txt` file is current when `bun run docs:bundle:check` reports no changes.
