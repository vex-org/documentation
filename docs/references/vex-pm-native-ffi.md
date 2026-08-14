# vex-pm Native FFI Pipeline Reference

This page documents the implemented manifest-driven native link pipeline shared by `vex compile` and `vex run`.

## Source contract

A package requests a native feature from a `.vxc` boundary:

```vex
extern "NATIVE" from "sqlite" {
    fn sqlite3_libversion(): Ptr<i8>;
}
```

The `from` value is a feature name, not a filename or linker flag. The nearest `vex.json` that owns the declaration defines the artifacts.

## Manifest schema

```json
{
  "name": "database-app",
  "version": "0.1.0",
  "native": {
    "useSystemLibC": true,
    "features": {
      "sqlite": {
        "x86_64-unknown-linux-gnu": {
          "path": "native/libsqlite3.a",
          "type": "static"
        },
        "macos.arm64": {
          "path": "native/libsqlite3.dylib",
          "type": "dynamic"
        },
        "windows-x86_64": {
          "path": "native/sqlite3.dll",
          "type": "dynamic",
          "importLib": "native/sqlite3.lib"
        },
        "all": {
          "path": "native/portable.bc",
          "type": "bitcode"
        }
      }
    }
  }
}
```

`native.useSystemLibC` defaults to `true`. Setting it to `false` selects the freestanding libc policy for that package.

Each platform dependency contains:

| Field | Required | Meaning |
|---|---:|---|
| `path` | yes | Artifact path, relative to the owning manifest or absolute |
| `type` | yes | `static`, `dynamic`, or `bitcode` |
| `importLib` | Windows dynamic only | Link-time `.lib` paired with a runtime DLL |

`importLib` is canonical. The parser accepts the legacy `import_lib` alias during migration.

## Target key precedence

For a target, `vex-pm` tries:

1. exact target triple;
2. `<os>.<arch>`;
3. `<os>-<arch>`;
4. `<os>-<environment>` such as `linux-musl` or `windows-msvc`;
5. `<os>`;
6. `all`.

The first match wins. A missing match is `E0FFI02`.

`dynamic` cannot use the target-independent `all` key. Windows dynamic features require `importLib`. WASM rejects dynamic native features.

## Used-only activation

Codegen records a native requirement only when reachable code calls an extern function or takes its address. It carries both the feature name and declaration file.

`vex-pm` then:

1. finds the declaration's owning manifest;
2. groups requests deterministically by manifest and feature;
3. resolves only those features for the requested target;
4. stages only the selected artifacts;
5. returns structured linker arguments, runtime files, and activated dependency metadata.

Importing a boundary without using its functions has zero native link and deployment effect. There is no environment-variable feature activation and no package-wide “link all features” scan in the compile/run path.

## Artifact behavior

### Static

The selected artifact is copied to the package native staging directory and passed to the linker by path.

### Bitcode

The selected `.bc` artifact is staged and passed as a linker input.

### Dynamic

- Linux/macOS: Vex adds the staging search path and library name, then deploys the runtime library beside the produced executable.
- Windows: Vex links the staged `importLib` and deploys the DLL.
- macOS and Linux post-processing is performed only on a compatible host. Unsupported cross-host mutation fails explicitly with `E0FFI09`.

Runtime deployment happens for both `vex compile` and `vex run` because both commands consume the same extern link plan.

## Freestanding diagnostics

A reachable `LIBC` provider is rejected before linking. `SYSTEM` and `NATIVE` are not categorically forbidden: their actual target contracts determine compatibility.

If an activated static native feature leaves known libc or TLS symbols unresolved, Vex emits `E0FFI07` naming that exact activated feature. Unused manifest features are never considered by this classifier.

## Determinism

- Requests are sorted and deduplicated.
- Manifests and feature names use ordered collections in plan construction.
- Link arguments and runtime files are deduplicated.
- System libraries are emitted in stable order.

This makes link behavior independent of parallel module traversal.

## Important APIs

### `vex-pm`

- `NativeTarget::from_triple`
- `NativeFeatureRequest`
- `resolve_native_link_plan`
- `NativeLinker::process_features`
- `NativeLinkPlan`
- `check_active_linker_error`

### `vex-cli`

- `native_plan::resolve_extern_link_plan`
- `native_plan::deploy_runtime_files`

The CLI plan also merges `LIBC`, `SYSTEM`, and `VEX` provider requirements with native feature results.

## Diagnostics

| Code | Meaning |
|---|---|
| `E0904` | No owning manifest/native configuration for a requested feature |
| `E0FFI01` | Requested feature is absent from the owning manifest |
| `E0FFI02` | No artifact matches the target |
| `E0FFI03` | Reachable libc call in a freestanding build |
| `E0FFI04` | Dynamic native feature on WASM |
| `E0FFI05` | Dynamic artifact declared under `all` |
| `E0FFI06` / `E0FFI08` | Missing Windows import library |
| `E0FFI07` | Activated static feature depends on hosted libc/TLS symbols |
| `E0FFI09` | Unsupported cross-host dynamic-library post-processing |

## Related

- [FFI](/guide/ffi)
- [Freestanding](/guide/freestanding)
- [vex-pm Reference](/references/vex-pm-reference)
