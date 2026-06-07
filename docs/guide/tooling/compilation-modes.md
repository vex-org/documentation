# Compilation Modes and Optimization

Vex compiles to native code ahead-of-time (AOT) via LLVM 21. `vex compile` produces standalone binaries; `vex run` compiles and executes in one step.

> **Note:** Some optimization flags described below (LTO, cross-compilation targets, sanitizers, incremental compilation) are **planned features**. Currently available flags are documented in the [CLI Reference](/references/vex-cli-reference) and visible via `vex compile --help`.

## Compilation Modes

### `vex run` -- Compile and Execute

`vex run` compiles the source to a temporary executable and runs it. Best for development.

```bash
vex run main.vx              # compile and run
vex run -O 3 main.vx          # with maximum optimization
vex run --emit-llvm main.vx  # also emit LLVM IR during run
```

**Characteristics:**

- Single command: compile + link + execute
- Temporary binary cleaned up after execution
- All optimization levels available

### `vex compile` -- AOT Binary

`vex compile` produces a standalone native binary. Best for production and distribution.

```bash
vex compile main.vx                    # AOT compile to executable
vex compile --emit-llvm main.vx        # Emit LLVM IR (.ll file)
vex compile --emit-asm main.vx         # Emit assembly (.s file)
vex compile --emit-obj main.vx         # Emit object file (.o)
vex compile --target x86_64-linux main.vx  # Cross-compile
```

**Characteristics:**

- Produces self-contained binary
- Full LTO support
- All optimization levels available
- Cross-compilation to any LLVM target

## Optimization Levels

| Level | Flag      | Description                                                              |
| ----- | --------- | ------------------------------------------------------------------------ |
| O0    | (default) | No optimization. Fast compile, debuggable code.                          |
| O1    | `-O1`     | Basic optimizations. Good balance for development.                       |
| O2    | `-O2`     | Standard release optimizations. Inlining, vectorization, loop unrolling. |
| O3    | `-O3`     | Aggressive optimization. Auto-vectorization, inter-procedural opts.      |
| Oz    | `-Oz`     | Optimize for size. Sacrifice some speed for smaller binary.              |
| Os    | `-Os`     | Optimize for size while keeping reasonable speed.                        |

```bash
vex compile -O 3 main.vx      # Maximum speed
vex compile --opt-level z main.vx      # Minimum binary size
vex run -O 2 main.vx          # Fast iteration with decent optimization
```

### LLVM Pass Pipeline by Level

**O0:**

- Mem2Reg (alloca→SSA promotion)
- Basic dead code elimination
- No inlining, no vectorization

**O1:**

- O0 passes plus:
- Function inlining (moderate threshold)
- Basic loop optimizations (LICM, indvar simplify)
- Instruction combining (InstCombine)

**O2:**

- O1 passes plus:
- Aggressive inlining
- Loop vectorization (SLP, LoopVectorize)
- Global value numbering (GVN)
- Partial inlining

**O3:**

- O2 passes plus:
- Inter-procedural optimizations (function specialization, IPA)
- Aggressive loop unrolling
- Profile-guided optimization hooks (PGO)

## LTO (Link-Time Optimization) -- PLANNED

LTO enables cross-module optimization by preserving LLVM bitcode through the link step. This feature is planned for a future release.

```vex
// Planned syntax:
// vex compile --lto=thin main.vx
// vex compile --lto=full main.vx
```

# Disable LTO
vex compile --lto=off main.vx
```

| Type    | Speed   | Memory | Optimization Quality              |
| ------- | ------- | ------ | --------------------------------- |
| ThinLTO | Fast    | Low    | Good (90% of FullLTO)             |
| FullLTO | Slow    | High   | Best (cross-module inlining, IPA) |
| Off     | Fastest | Lowest | Module-local only                 |

## Build Profiles

### Debug (Default)

```bash
vex compile main.vx                     # debug build
vex compile --profile debug main.vx     # explicit debug
```

- Full debug info (DWARF)
- Assertions enabled
- No optimization (O0)
- Largest binary, slowest execution

### Release

```bash
vex compile --release main.vx           # release build
vex compile --profile release main.vx   # explicit release
```

- Stripped debug info (or `--debug-info=limited`)
- Assertions disabled
- O3 optimization
- ThinLTO enabled by default
- Smallest, fastest binary

### Custom Profiles

Define profiles in `vex.toml`:

```toml
[profile.bench]
opt-level = 3
lto = "full"
debug-info = "none"
codegen-units = 1         # single codegen unit for best optimization

[profile.dev-fast]
opt-level = 1
lto = "off"
debug-info = "full"
incremental = true
```

```bash
vex compile --profile bench main.vx
vex compile --profile dev-fast main.vx
```

## Incremental Compilation -- PLANNED

Incremental compilation caches intermediate results to avoid recompiling unchanged code:

```bash
vex compile --incremental main.vx
```

The cache lives in `target/vex/incremental/` and tracks:

- Source file hashes
- Dependency graphs
- LLVM module fingerprints

## Parallel Compilation -- PLANNED

Vex compiles independent modules in parallel:

```bash
vex compile --jobs 8 main.vx    # Use 8 parallel jobs
vex compile --jobs 0 main.vx    # Use all available cores (default)
```

## Cross-Compilation -- PLANNED

Compile for a different target than the host:

```bash
# From macOS, compile for Linux
vex compile --target x86_64-unknown-linux-gnu main.vx

# From x86_64, compile for ARM64
vex compile --target aarch64-unknown-linux-gnu main.vx

# From Linux, compile for Windows
vex compile --target x86_64-pc-windows-msvc main.vx
```

**Supported targets:**

| Target                      | OS      | Arch        | Status       |
| --------------------------- | ------- | ----------- | ------------ |
| `x86_64-apple-darwin`       | macOS   | x86_64      | Production   |
| `aarch64-apple-darwin`      | macOS   | ARM64 (M1+) | Production   |
| `x86_64-unknown-linux-gnu`  | Linux   | x86_64      | Production   |
| `aarch64-unknown-linux-gnu` | Linux   | ARM64       | Production   |
| `x86_64-unknown-freebsd`    | FreeBSD | x86_64      | Beta         |
| `x86_64-pc-windows-msvc`    | Windows | x86_64      | Beta         |
| `wasm32-unknown-unknown`    | WASM    | 32-bit      | Experimental |

## Emit Flags

Control what the compiler outputs:

```bash
vex compile --emit-llvm main.vx      # LLVM IR (.ll)
vex compile --emit-asm main.vx       # Assembly (.s)
vex compile --emit-obj main.vx       # Object file (.o)
vex compile --emit-llvm-ir main.vx   # LLVM bitcode (.bc)
vex compile --emit-all main.vx       # All of the above + binary
```

## Debug Symbols -- PLANNED

```bash
# Full debug info (DWARF), larger binary
vex compile --debug-info=full main.vx

# Limited debug info (function names, line numbers only)
vex compile --debug-info=limited main.vx

# No debug info (smallest binary)
vex compile --debug-info=none main.vx
```

## Sanitizer Integration -- PLANNED

```bash
# Address Sanitizer (detects memory errors)
vex compile --sanitize=address main.vx

# Thread Sanitizer (detects data races)
vex compile --sanitize=thread main.vx

# Undefined Behavior Sanitizer
vex compile --sanitize=undefined main.vx

# Leak Sanitizer
vex compile --sanitize=leak main.vx
```

## Best Practices

1. Use `vex run` during development for fast compile-and-test cycles.
2. Use `vex compile --release` for production binaries -- O3 + ThinLTO gives best performance.
3. Add `--sanitize=address` to your test CI pipeline to catch memory bugs.
4. Use `--jobs 0` (auto-detect cores) for faster compilation on multi-core machines.
5. Set `codegen-units = 1` in release profile for maximum optimization (at cost of slower compilation).
6. Cross-compile to all targets in CI to catch platform-specific issues early.
