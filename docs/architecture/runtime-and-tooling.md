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

## JIT vs No-JIT

The repository distinguishes between JIT-oriented execution and no-JIT/subprocess execution.

One important documented constraint is that whole-runtime bitcode merge is intentionally disabled in JIT mode because runtime state is not yet structured for that safely.

Current safe model:

- AOT / subprocess mode can link runtime artifacts more traditionally
- JIT mode relies on symbol registration rather than merging the entire runtime bitcode into the JIT module

This is an architectural detail worth understanding when debugging “works in no-JIT but not in JIT” issues.

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
- JIT/no-JIT selection
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
