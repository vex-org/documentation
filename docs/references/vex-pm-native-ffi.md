# vex-pm Native FFI Pipeline Reference

This document describes the current **manifest-driven native FFI pipeline** in Vex.

It is the source-of-truth reference for how `vex.json` native blocks are resolved, compiled, and linked through `vex-pm` + `vex-cli`.

---

## Goals

- Resolve native dependencies from `vex.json` (not hardcoded package-specific paths)
- Merge native linker inputs across:
  - current package
  - dependency packages
  - stdlib packages referenced via imports
- Keep dynamic-linking oriented behavior (no static linking in this pipeline)
- Support low-overhead linking via ThinLTO in optimized builds

---

## High-Level Flow

1. `vex-cli` reads source and resolves package dependencies (`vex-pm`).
2. `vex-pm` collects native linker args from all relevant package manifests.
3. `vex-pm::NativeLinker` compiles native C sources declared in `vex.json`.
4. `vex-cli` appends merged native linker args during link stage.
5. If external native deps are detected in `run`, execution switches to subprocess mode (no-JIT) for safe native symbol resolution.

---

## Manifest Schema (`vex.json`)

Native configuration is declared under `native`:

- `sources`: C/C++ source files
- `include_dirs`: include paths
- `libraries`: dynamic libraries
- `search_paths`: library search paths
- `cflags`: compile flags (`-D...` supported)
- `pkg_config`: packages to probe
- `pkg_config_optional`: if `true`, missing pkg-config can skip this config/feature
- `features`: feature-scoped native fragments

Feature block fields:

- `enabled`
- `sources`, `include_dirs`, `libraries`, `search_paths`, `cflags`
- `pkg_config`, `pkg_config_optional`

### Example

```json
{
  "name": "db",
  "version": "0.1.0",
  "native": {
    "sources": ["native/src/vex_db_shim.c"],
    "include_dirs": ["native/include"],
    "libraries": [],
    "cflags": [],
    "features": {
      "sqlite": {
        "enabled": true,
        "pkg_config_optional": false,
        "pkg_config": ["sqlite3"],
        "sources": ["native/src/vex_sqlite.c"],
        "libraries": ["sqlite3"],
        "cflags": ["-DHAVE_SQLITE"]
      },
      "postgres": {
        "enabled": false,
        "pkg_config_optional": true,
        "pkg_config": ["libpq"],
        "sources": ["native/src/vex_pg.c"],
        "libraries": ["pq"],
        "cflags": ["-DHAVE_LIBPQ"]
      }
    }
  }
}
```

---

## Environment Controls

- `VEX_NATIVE_FEATURES=feat1,feat2`
  - Forces feature selection in native linker layer
- `VEX_DB_FEATURES=...`
  - Backward-compatible alias used by DB workflows
- `PKG_CONFIG_PATH=...`
  - pkg-config lookup override

When feature env override is set, feature `enabled` values are ignored and only listed features are considered active.

---

## Resolution Scope

`vex-pm` native arg collection merges from:

1. Current package `./vex.json`
2. Dependency package manifests resolved by `vex-pm`
3. Stdlib package manifests discovered from import roots in source (for example `import { Connection } from "db"`)

This makes DB just one consumer of the same generic pipeline.

---

## pkg-config Behavior

`pkg-config` is used to discover include/link metadata.

- success:
  - include paths are merged into compile include set
  - link search paths are merged
  - discovered libs are merged
- failure:
  - if `pkg_config_optional=false` → hard fail
  - if `pkg_config_optional=true` → skip that feature/config branch

---

## Macro-Gated Source Compilation

For source files with top-level guard style:

- `#ifndef HAVE_SQLITE`
- `#ifndef HAVE_LIBPQ`
- etc.

The linker reads required macro from source header area and compiles source only if corresponding `-D...` exists in effective `cflags`.

This avoids compiling incompatible drivers when feature macros are not enabled.

---

## Linking Policy

### Dynamic Linking First

This pipeline is dynamic-link oriented.

- `native.static_libs` is rejected in `NativeLinker` for this architecture.
- Use dynamic libraries (`libraries`) and pkg-config metadata.

### LTO

- `compile` command already supports ThinLTO/FullLTO options.
- `run` subprocess link path auto-enables `-flto=thin` for optimized builds (`-O2+`).

This keeps FFI bridge overhead minimal while preserving flexible dynamic linking.

---

## JIT vs no-JIT for Native FFI

For `vex run`:

- if no external native deps are detected: JIT path can be used
- if external native deps are detected from manifest/native resolution:
  - runner switches to subprocess (no-JIT) mode
  - native symbols are resolved by normal linker/dynamic loader

This avoids fragile hardcoded JIT symbol registration for package-defined native APIs.

---

## Key APIs and Files

### `vex-pm`

- `tools/vex-pm/src/manifest.rs`
  - `NativeConfig`, `NativeFeatureConfig`
- `tools/vex-pm/src/native_linker.rs`
  - feature merge, pkg-config resolve, source compilation, link arg generation
- `tools/vex-pm/src/build.rs`
  - `get_native_linker_args_for_build`
  - `get_native_linker_args_for_source`

### `vex-cli`

- `tools/vex-cli/src/commands/compile.rs`
  - appends merged native linker args at link stage
- `tools/vex-cli/src/commands/run.rs`
  - source-aware native arg collection
  - auto no-JIT fallback when external native deps exist
  - ThinLTO in subprocess mode for optimized builds
- `tools/vex-cli/build.rs`
  - intentionally no-op for package native linking (no package hardcoding)

---

## Recommended Package Authoring Rules

1. Declare all native requirements in `vex.json` only.
2. Prefer feature bundles for optional drivers/backends.
3. Prefer dynamic libraries and pkg-config.
4. Gate driver-specific sources with `HAVE_*` style macros and matching `-D...` flags.
5. Keep `pkg_config_optional=false` for required deps, `true` for optional integrations.

---

## Troubleshooting

### `pkg-config probe failed`

- Verify package is installed
- Verify `PKG_CONFIG_PATH`
- Set `pkg_config_optional=true` for optional feature blocks

### `file not found` during C compile

- Ensure `sources` and `include_dirs` are relative to package root (where `vex.json` exists)

### Native feature not compiling

- Check `VEX_NATIVE_FEATURES` / `VEX_DB_FEATURES`
- Check `cflags` contains matching `-D...` macro for guarded source

### Runtime symbol errors in JIT

- For external native dependencies, use no-JIT path (auto-selected in run flow when native deps are detected)

---

## Status

Current status: implemented and validated on DB package tests with manifest-driven native resolution and no package-specific hardcoded native build path.
