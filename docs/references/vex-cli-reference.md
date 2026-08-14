# vex-cli Reference

This document describes `vex-cli` architecture, command pipeline, and extension points.

---

## Purpose

`vex-cli` is the primary developer-facing command-line entry for:

- compile (`vex compile`)
- run (`vex run`)
- test (`vex test`)
- semantic analysis and verified cleanup (`vex lint`)
- toolchain integration with diagnostics, optimizer remarks, and package/native resolution

---

## Command Surface

Main command modules are under:

- `tools/vex-cli/src/commands/compile.rs`
- `tools/vex-cli/src/commands/run.rs`
- `tools/vex-cli/src/commands/test.rs`
- `tools/vex-cli/src/commands/lint.rs`
- `tools/vex-cli/src/commands/pipeline.rs`

### `vex compile`

Responsibilities:

1. Resolve dependencies via `vex-pm`
2. Build compiler pipeline via `CompilerDriver`
3. Generate object file from LLVM module
4. Link executable with:
   - the target-selected embedded native support pack, when required
   - target system libraries activated by reachable VexArch providers
   - native package linker args (`vex_pm::get_native_linker_args_for_source(...)`)
5. Emit optional artifacts (`.ll`, CFG, coverage)

### `vex run`

Responsibilities:

1. Resolve deps + compile module
2. Link a temporary executable from the fused module, embedded native support,
   and manifest-owned native dependencies
3. Execute and report timings

### Comptime staging modes

`vex compile`, `vex run`, and `vex ir` accept:

```bash
--comptime-staging disabled|analyze|apply-known
```

The default is `disabled`. `analyze` measures opportunistic typed staging while
preserving the original HIR and diagnostics. `apply-known` is the explicit
experimental native canary; it transactionally commits only canonical,
materialization-ready known islands. Disabling the mode restores the original
immutable HIR path. Automatic/default application is not part of V2.

`vex lint` and `vex test` retain the observation-only `--analyze-comptime`
option. In test mode it also reaches generated benchmark compilation. Neither
command can apply replacements, and LSP's `analyzeComptime` setting is likewise
observation-only.

Compile and run additionally accept `--comptime-telemetry FILE`. It requires a
non-disabled `--comptime-staging` mode and writes the versioned schema-v4 JSON
report. Schema v4 separates policy discovery, persistent-cache lookup, record
decode, semantic validation, installation and publication from frontend,
fusion, LLVM, object and native-link phases. Missing phases are `null`, and
telemetry cannot implicitly enable staging or affect semantic query identity.

### `vex test`

Responsibilities:

1. Discover `*.test.vx` / `_test.vx`
2. Generate test runner main when needed
3. Execute each test function with pass/fail markers
4. Handle compile errors and summarize results

### `vex lint`

Responsibilities:

1. Resolve a `.vx`/`.vxc` file, package directory, or nearest `vex.json`
2. Run correctness analysis and the shared `vex-lint` semantic registry without LLVM
3. Apply manifest and CLI rule/group levels with CLI precedence
4. Emit deterministic text, canonical JSON, or SARIF 2.1.0 diagnostics,
   including suppression metadata
5. Plan revision-bound edits, reject conflicts, and verify semantics for up to four passes
6. Atomically write only a fully verified workspace, or print it with `--diff`

Core options are `--fix`, `--diff`, `--format text|json|sarif`, `--deny-warnings`,
`--allow`, `--warn`, `--deny`, `--only`, `--target`, `--explain-boxing` and
`--explain-arena`. `--analyze-comptime` adds an observation-only staging
summary on stderr. `--timings` adds opt-in per-rule telemetry to JSON/SARIF;
normal runs have no clock-read overhead. The former `check`, `analyze` and `fix` compatibility
commands have been removed.

`--write-baseline PATH` atomically records the current lint set for staged CI;
`--baseline PATH` loads it. Matching findings remain in every output format but
do not fail lint warning/deny gates. Correctness errors are never baselined.
`lint.baseline` in `vex.json` provides a package-relative default.

Directory inventory is package-scoped: nested manifests and transient
test/benchmark runners are not merged into the target. Ordinary lint uses the
diagnostics-oriented HIR path and skips codegen module flattening. Full
semantic fingerprints are reserved for verified `--fix`/`--diff` runs.

Canonical forms:

```bash
vex lint [TARGET]
vex lint --fix [TARGET]
vex lint --diff [TARGET]
```

`--fix` writes only after the in-memory result reaches a verified fixed point.
`--diff` runs the same planner and verifier but prints the patch. Syntax-only
migrations can operate beside an unrelated pre-existing correctness error;
semantic fixes require their proving phase and cannot introduce or alter a
correctness failure.

Rule configuration is read from the nearest `vex.json`. CLI rule/group levels
override manifest levels. Local `vex-lint: allow-file` and `allow-next`
directives use stable symbolic IDs and are included in JSON metadata.

The current registry also covers resolved `Result`/`Future` misuse,
target-aware numeric ranges, allocation effects, and exported API audits.
Performance, API, and pedantic rules are opt-in through the `performance`,
`library`, `pedantic`, and `strict` profiles. Semantic body rules share one
lazy, revision-bound fact graph with exact call identities and transitive
effect summaries. See
[Linting and Verified Fixes](/guide/tooling/lint) for the complete rule table,
configuration, exit codes, suppression syntax, and stability boundary.

---

## Compiler Integration

`vex-cli` delegates language pipeline to `CompilerDriver`:

- parsing
- lowering
- type/borrow checks
- codegen

This keeps command handlers thin while preserving shared compilation behavior.

---

## Linking Model

VexArch source semantics are rehydrated from the embedded VRI and lowered into
the same backend module as user and prelude code. They are not linked from a
runtime bitcode module, object, static archive, or dynamic library.

At native link stage, `vex-cli` merges:

1. a requested-target native support object only when that port requires one;
2. system libraries activated by reachable `SYSTEM`/`LIBC` providers;
3. native args from package manifests (`vex-pm`).

The support object contains irreducible assembly only and carries no VexArch
semantics. Ordinary cross-boundary optimization happens before object emission
inside the fused module.

---

## Execution Model

`vex run` compiles to a temporary executable and runs it as a subprocess. Native dependencies are resolved via the system linker and dynamic loader at runtime.

`vex compile` produces a standalone binary from the fused user/prelude/VexArch
module plus the explicit target/native link plan. Release packages do not ship
a separate Vex runtime library or `vex_runtime.bc`.

---

## Diagnostics and UX

`vex-cli` supports:

- JSON/non-JSON output modes
- optimization remarks
- sanitizer flags
- coverage emission
- lock-file aware dependency workflows

---

## Key Extension Points

- Add new command: `tools/vex-cli/src/commands/`
- Extend CLI flags: command handler signatures + argument parser wiring
- Add new link behavior: compile/run link stage argument builders
- Add test behavior: `tools/vex-cli/src/commands/test.rs`

---

## Operational Notes

- Native linking behavior is package-manifest driven (`vex.json/native`)
- `tools/vex-cli/build.rs` is intentionally no-op for package native logic (to avoid package-specific hardcoding)

---

## Related References

- [Linting and Verified Fixes](/guide/tooling/lint)
- [vex-pm Reference](./vex-pm-reference.md)
- [vex-pm Native FFI Pipeline](./vex-pm-native-ffi.md)
