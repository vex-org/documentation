# vex-cli Reference

This document describes `vex-cli` architecture, command pipeline, and extension points.

---

## Purpose

`vex-cli` is the primary developer-facing command-line entry for:

- compile (`vex compile`)
- run (`vex run`)
- test (`vex test`)
- toolchain integration with diagnostics, optimizer remarks, and package/native resolution

---

## Command Surface

Main command modules are under:

- `tools/vex-cli/src/commands/compile.rs`
- `tools/vex-cli/src/commands/run.rs`
- `tools/vex-cli/src/commands/test.rs`
- `tools/vex-cli/src/commands/pipeline.rs`

### `vex compile`

Responsibilities:

1. Resolve dependencies via `vex-pm`
2. Build compiler pipeline via `CompilerDriver`
3. Generate object file from LLVM module
4. Link executable with:
   - runtime linker args (`vex_runtime::get_linker_args()`)
   - native package linker args (`vex_pm::get_native_linker_args_for_source(...)`)
5. Emit optional artifacts (`.ll`, CFG, coverage)

### `vex run`

Responsibilities:

1. Resolve deps + compile module
2. Decide JIT vs subprocess mode
3. If native external deps exist, switch to subprocess mode automatically
4. Link temporary executable with runtime + merged native linker args
5. Execute and report timings

### `vex test`

Responsibilities:

1. Discover `*.test.vx` / `_test.vx`
2. Generate test runner main when needed
3. Execute each test function with pass/fail markers
4. Handle compile errors and summarize results

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

At link stage, `vex-cli` merges:

1. runtime args (`vex_runtime`)
2. native args from package manifests (`vex-pm`)

For optimized builds, ThinLTO is enabled where appropriate to reduce FFI overhead while preserving dynamic linking flexibility.

---

## JIT Behavior and Safety

JIT is used when possible for speed, but:

- if external native dependencies are detected, `run` switches to no-JIT subprocess
- this avoids hardcoded symbol tables for arbitrary package-defined C APIs

JIT path still registers core runtime + libc/libm/platform symbols needed by runtime.

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

- [vex-pm Reference](./vex-pm-reference.md)
- [vex-pm Native FFI Pipeline](./vex-pm-native-ffi.md)
