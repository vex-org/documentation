# vex-pm Reference

`vex-pm` owns package manifests, dependency resolution, lock/cache behavior, target-aware package files, and manifest-owned native artifacts.

## Core modules

- `manifest.rs`: `Manifest`, `NativeConfig`, `PlatformDependency`, testing, and workspace configuration.
- `resolver.rs`: package dependency graph resolution.
- `lockfile.rs`: integrity checks and deterministic locked selection.
- `cache.rs`: local package and git caches.
- `build.rs`: dependency source paths and compatibility build integration.
- `platform.rs`: package-level platform file selection.
- `native_linker.rs`: target-native artifact selection, staging, link plans, and diagnostics.

## Manifest responsibilities

A `vex.json` can define package metadata, dependencies, entry modules, test/workspace settings, and native features.

```json
{
  "name": "codec-wrapper",
  "version": "1.0.0",
  "dependencies": {},
  "native": {
    "useSystemLibC": true,
    "features": {
      "codec": {
        "linux.x86_64": {
          "path": "native/libcodec.a",
          "type": "static"
        },
        "windows-x86_64": {
          "path": "native/codec.dll",
          "type": "dynamic",
          "importLib": "native/codec.lib"
        }
      }
    }
  }
}
```

Native features are requested explicitly by `extern "NATIVE" from "codec"` declarations. The artifact type lives in the manifest, not in Vex source syntax.

## Dependency resolution

`resolve_dependencies_for_build(locked)` behaves as follows:

- `locked=true`: requires a valid `vex.lock`;
- `locked=false`: uses a valid lock or resolves again when needed.

The result contains package source directories and platform-file mappings. Locked non-local packages are pinned to canonical source metadata and an exact commit.

## Target-aware source selection

Vex source resolution recognizes target variants for `.vx` and `.vxc` files. The compiler import resolver uses this precedence:

1. OS and architecture suffix;
2. OS suffix;
3. architecture suffix;
4. generic file.

Architecture aliases such as `x86_64`/`x64` and `aarch64`/`arm64` are accepted. Source routing chooses Vex code without inventing an ABI environment; native manifest routing independently chooses an exact-target binary artifact.

## Native planning

The compile/run path does not aggregate every native feature in every dependency. It starts with the exact `NATIVE` requirements recorded by codegen.

`resolve_native_link_plan`:

1. finds the owning manifest for each declaration file;
2. groups and sorts requests by manifest and feature;
3. chooses the best target entry;
4. stages only selected artifacts;
5. returns link arguments, runtime files, activated dependency metadata, and libc policy.

Supported artifact types are `static`, `dynamic`, and `bitcode`. Windows dynamic artifacts require `importLib`; the old `import_lib` spelling remains a read-only compatibility alias.

The compatibility `NativeLinker::process` API can still process an entire config for package-manager workflows. Compiler and runner correctness relies on `process_features`, which is used-only.

## Freestanding policy

`native.useSystemLibC: false` declares a freestanding libc policy. A reachable `LIBC` extern is rejected by the CLI before linking. If an activated static feature exposes unresolved hosted libc/TLS symbols, the linker classifier reports that exact feature.

The package manager does not reinterpret OS libraries as libc. `SYSTEM` libraries and manifest-owned native artifacts remain explicit link-plan inputs.

## Cache and determinism

- package/git cache uses the configured Vex cache root;
- lock validation prevents dependency drift in locked builds;
- native requests use ordered, deduplicated manifest/feature sets;
- only active target artifacts are copied into native staging;
- runtime files and linker arguments are deduplicated.

## Related

- [vex-pm Native FFI Pipeline](/references/vex-pm-native-ffi)
- [FFI](/guide/ffi)
- [vex-cli Reference](/references/vex-cli-reference)
