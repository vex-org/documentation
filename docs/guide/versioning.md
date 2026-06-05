# Versioning and Stability

This page describes Vex's versioning policy, stability guarantees, and migration expectations.

## Semantic Versioning

Vex follows **Semantic Versioning 2.0.0** (`MAJOR.MINOR.PATCH`):

| Change                             | Version Bump           | Examples                                           |
| ---------------------------------- | ---------------------- | -------------------------------------------------- |
| Bug fixes (backward-compatible)    | PATCH (0.1.0 -> 0.1.1) | Fix crash in parser, correct codegen for edge case |
| New features (backward-compatible) | MINOR (0.1.0 -> 0.2.0) | New stdlib module, new contract, new compiler flag |
| Breaking changes                   | MAJOR (0.1.0 -> 1.0.0) | Syntax change, removed API, changed behavior       |

**Current version: 0.1.2** -- Vex is pre-1.0. Breaking changes may occur in minor versions during 0.x.

## Stability Tiers

### Tier 1: Stable

These are guaranteed NOT to change without a major version bump (after 1.0):

- Core syntax (`fn`, `let`, `struct`, `enum`, `match`, `if`, `for`, `while`, `loop`)
- Primitive types (`i32`, `f64`, `bool`, `char`, etc.)
- Basic operator semantics (`+`, `-`, `*`, `/`, `==`, `!=`, `<`, `>`)
- Standard prelude types: `Option<T>`, `Result<T,E>`, `Box<T>`, `Vec<T>`, `Map<K,V>`, `Set<T>`
- Core contracts: `$Add`, `$Sub`, `$Mul`, `$Div`, `$Eq`, `$Ord`, `$Display`, `$Debug`, `$Clone`, `$Drop`
- `vex run` and `vex compile` CLI

### Tier 2: Stabilizing (0.x)

These are largely stable but may see minor adjustments:

- `Channel<T>`, `Ptr<T>`, `Span<T>`, `RawBuf`
- `async fn` / `await` semantics
- `go` blocks
- Pattern matching (all pattern forms)
- Operator overloading (`$Index`, `$BitAnd`, etc.)
- `vex fmt`, `vex test`, `vex doc`
- Standard library modules: `http`, `serde`, `crypto`, `fs`, `io`, `time`

### Tier 3: Experimental

These are under active development and may change significantly:

- `graph fn` GPU kernels
- SIR pipeline and all GPU backends
- `Complex<T>`, `OrderedMap<K,V>`
- SIMD operation set (saturating, FMA, CLMUL, reductions)
- `vex fuzz`, `vex bench`
- Package manager registry protocol
- `comptime` advanced features (reflection, codegen)
- WASM target
- Windows and FreeBSD support
- OpenVINO, CoreML, OpenCL backends

### Tier 4: Internal / Unstable

These are compiler internals NOT intended for direct use:

- `#`-prefixed compiler intrinsics (may change without notice)
- Runtime C API (`vumm.c` functions)
- SIR internal graph representation
- LSP protocol extensions

## Deprecation Process

When an API is scheduled for removal:

1. **Deprecation notice** -- Added to documentation and release notes (MINOR release)
2. **Deprecation warning** -- Compiler emits warning on use (next MINOR release)
3. **Removal** -- API removed (next MAJOR release, or after 2 minor releases during 0.x)

```vex
// Example deprecation flow:
// v0.2.0: oldFunction() documented as deprecated
// v0.3.0: #[deprecated("use newFunction() instead")] warning emitted
// v0.4.0: oldFunction() removed
```

### Deprecation Attribute

```vex
#[deprecated("Use newMethod() instead")]
fn oldMethod() { ... }

#[deprecated(since = "0.2.0", note = "Use processAsync()")]
fn processSync() { ... }
```

## Migration Guide: v0.1.x to v0.2.x

### Syntax Changes

| Old (v0.1.x)             | New (v0.2.x)                             | Reason                         |
| ------------------------ | ---------------------------------------- | ------------------------------ |
| `impl Contract for Type` | Contract on struct: `struct T: Contract` | Vex doesn't use `impl` keyword |
| `::` for method calls    | `.` for ALL member access                | Unified access syntax          |
| `mut` keyword            | `!` suffix (`let!`, `&T!`)               | Consistent with type system    |

### API Changes

| Old                         | New                                                         |
| --------------------------- | ----------------------------------------------------------- |
| `Option.unwrap()`           | `Option.unwrap()` (unchanged, but `.expect()` added)        |
| `Vec.push()` returning bool | `Vec.push()` returning void (use `.tryPush()` for fallible) |

### Runtime Changes

- Minimum macOS version raised to 12.0
- io_uring poller available on Linux 5.1+

## Long-Term Roadmap

### v0.3 (Target: Q3 2026)

- Stabilize `graph fn` and Metal/CUDA backends
- Complete `select {}` for channels
- Package manager registry MVP

### v0.4 (Target: Q4 2026)

- WASM target stabilization
- LSP: code actions and refactoring
- `vex bench` stabilization

### v1.0 (Target: 2027)

- All Tier 1 and Tier 2 features stable
- Backward compatibility guarantees begin
- LTS release cycle established

## Reporting Breaking Changes

If a compiler update breaks your code, check:

1. The [CHANGELOG.md](https://github.com/meftunca/vex/blob/main/CHANGELOG.md) for documented changes
2. Whether you were using Tier 3/4 features (experimental -- changes expected)
3. File an issue at [github.com/meftunca/vex/issues](https://github.com/meftunca/vex/issues)

## Best Practices

1. Pin Vex version in CI (`vex --version` in build scripts).
2. Avoid Tier 4 (internal) APIs -- they WILL break.
3. Isolate Tier 3 (experimental) usage behind feature flags for easy removal.
4. Check the changelog before upgrading Vex versions.
5. Use `#[deprecated]` in your own libraries for graceful API evolution.
