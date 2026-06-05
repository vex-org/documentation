# Runtime and Tooling

The Vex repository is more than a compiler. The runtime and tools layer determines how code is linked, executed, tested, formatted, and surfaced in editors.

## Runtime Layer

Runtime support lives primarily under `lib/runtime/`.

This layer includes infrastructure for:

- allocation and heap management
- async and task runtime support
- scheduler state
- runtime symbols used by CLI execution paths
- platform integration for native execution

## Execution Model

Vex compiles to native code ahead-of-time (AOT). Both `vex run` and `vex compile` produce native binaries via LLVM. `vex run` compiles to a temporary executable and runs it as a subprocess; `vex compile` produces a standalone binary.

The runtime is linked as a static library (`libvexruntime.a`) alongside the compiled Vex code. The system linker resolves all symbols at build time -- no runtime symbol registration is needed.

## CLI Tooling

`tools/vex-cli/` is the main developer-facing entry point.

Important commands:

- `vex run`
- `vex compile`
- `vex test`

The CLI owns orchestration around:

- dependency resolution
- compiler-driver invocation
- linking
- execution model selection
- test discovery and execution

## Other Tooling

The repository also contains:

- `tools/vex-lsp/` for editor integration
- formatter tooling
- docs tooling and site generation

These tools matter because they all depend on the same semantic model staying aligned with the compiler.

## Why This Layer Matters

Many user-facing “language” issues are actually toolchain or runtime issues:

- link mode differences
- symbol registration gaps
- runtime state constraints
- test-runner discovery assumptions
- editor/compiler semantic drift

Understanding this layer makes debugging much faster.

## Related Pages

- [CLI Reference](/references/vex-cli-reference)
- [Test Reference](/references/vex-test-reference)
- [Compiler Pipeline](/architecture/compiler-pipeline)
