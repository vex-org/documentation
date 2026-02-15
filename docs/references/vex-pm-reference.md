# vex-pm Reference

This document describes `vex-pm` package management and build integration responsibilities.

---

## Purpose

`vex-pm` is responsible for:

- manifest parsing (`vex.json`)
- dependency resolution and lock-file behavior
- cache management
- platform-aware module resolution
- native dependency build/link argument generation

---

## Core Modules

- `tools/vex-pm/src/manifest.rs`
  - `Manifest`, `NativeConfig`, `NativeFeatureConfig`, testing/workspace fields
- `tools/vex-pm/src/build.rs`
  - dependency path resolution
  - native linker arg aggregation APIs
- `tools/vex-pm/src/native_linker.rs`
  - C source compilation
  - pkg-config probing
  - feature merge and linker arg generation
- `tools/vex-pm/src/resolver.rs`
  - dependency graph resolution
- `tools/vex-pm/src/lockfile.rs`
  - lock integrity and deterministic dependency selection
- `tools/vex-pm/src/cache.rs`
  - local package/git cache logic

---

## Manifest Semantics

`vex.json` can define:

- package metadata (`name`, `version`, `main`)
- dependency map
- testing/workspace config
- native config (`native`)

`native` supports:

- `sources`, `include_dirs`, `search_paths`
- `libraries`, `cflags`
- `pkg_config`, `pkg_config_optional`
- `features` blocks with the same native fragment fields

---

## Dependency Resolution

`resolve_dependencies_for_build(locked)`:

- `locked=true`: requires valid `vex.lock`
- `locked=false`: uses lock if valid; otherwise re-resolves

Output is `DependencyPaths` with:

- package source directories
- platform-specific file mappings

---

## Native Link Aggregation APIs

### `get_native_linker_args_for_build(locked)`

Collects native linker args from:

- current package manifest
- resolved dependency manifests

### `get_native_linker_args_for_source(source, locked)`

Extends build-level collection with stdlib package manifests discovered from imports in source.

This is used by `vex-cli` so imported stdlib modules (for example `db`) can contribute native build/link settings automatically.

---

## NativeLinker Behavior

`NativeLinker::process(...)` performs:

1. effective config materialization (base + enabled features)
2. pkg-config resolution (optional/strict behavior)
3. macro-aware source gating (`HAVE_*` checks)
4. C compilation to objects
5. dynamic linker arg generation (`-L`, `-l`, object list)

Policy:

- static linking is not allowed in this architecture (`static_libs` rejected)

---

## Environment Controls

- `VEX_NATIVE_FEATURES=feat1,feat2`
- `VEX_DB_FEATURES=...` (compat alias)
- `PKG_CONFIG_PATH=...`

---

## Cache and Determinism

- package/git cache rooted in `~/.vex/cache` (or `VEX_CACHE`)
- lock-file validation prevents drift in CI/locked mode

---

## Design Notes

- `vex-pm` provides policy + metadata resolution
- `vex-cli` consumes resolved paths/args to execute compile/run/test workflows
- package-native behavior should remain manifest-driven, not command-hardcoded

---

## Related References

- [vex-cli Reference](./vex-cli-reference.md)
- [vex-pm Native FFI Pipeline](./vex-pm-native-ffi.md)
