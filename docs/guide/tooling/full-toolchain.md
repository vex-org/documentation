# Toolchain -- Complete Reference

Vex ships with a comprehensive toolchain through the `vex` CLI.

## `vex` CLI

```bash
vex <command> [options] [args]
```

### All Subcommands

| Command | Description |
|---------|-------------|
| `vex run <file>` | Compile and execute a Vex program |
| `vex compile <file>` | AOT compile to native binary |
| `vex check <file>` | Syntax check without codegen (fast validation) |
| `vex ir <file>` | Emit LLVM IR (shorthand for `compile --emit-llvm`) |
| `vex test` | Run tests or benchmarks |
| `vex format <file>` | Format source code (`-i` for in-place) |
| `vex doc` | Generate documentation from source |
| `vex new <name>` | Create a new Vex project |
| `vex init` | Initialize `vex.json` in existing directory |
| `vex add <dep>` | Add a dependency |
| `vex remove <dep>` | Remove a dependency |
| `vex update` | Update all dependencies |
| `vex list` | List all dependencies |
| `vex watch <file>` | Watch and recompile on changes |
| `vex workspace` | Workspace management for monorepos |
| `vex tool <tool>` | Invoke bundled LLVM tools |
| `vex env` | Show environment configuration |
| `vex setup` | Setup `VEX_HOME` with standard library |
| `vex clean` | Clean cache and build artifacts |
| `vex repl` | Interactive REPL |
| `vex analyze <file>` | Run compiler lints on AST and HIR |
| `vex view <type> <file>` | Export AST, CFG, or DFG representations |
| `vex prof <file>` | Profile microarchitectural pipeline performance using LLVM-MCA |

## `vex compile` -- AOT Compilation

```bash
# Basic compilation
vex compile main.vx

# With optimization
vex compile -O 3 main.vx
vex compile --opt-level 3 main.vx

# Emit artifacts
vex compile --emit-llvm main.vx       # LLVM IR (.ll)
vex compile --emit-asm main.vx        # Assembly (.s)
vex compile --emit-spirv main.vx      # SPIR-V (for GPU functions)

# Enable features
vex compile --simd main.vx            # SIMD optimizations
vex compile --gpu main.vx             # GPU support

# Debug build
vex compile -g main.vx                # DWARF debug info

# Output file
vex compile -o mybinary main.vx

# JSON diagnostics (for IDE integration)
vex compile --json main.vx

# Strict export mode
vex compile --strict-exports main.vx
```

## `vex run` -- Compile and Execute

```bash
vex run main.vx                       # compile and run
vex run -O 3 main.vx                  # with optimization
vex run --simd --gpu main.vx          # with SIMD + GPU
```

## `vex check` -- Fast Validation

```bash
vex check main.vx                     # check single file
vex check --strict-exports main.vx    # strict mode
```

## `vex ir` -- LLVM IR Quick View

```bash
vex ir main.vx                        # emit LLVM IR to stdout
```

## `vex format` -- Code Formatter

```bash
vex format main.vx                    # output formatted to stdout
vex format -i main.vx                 # format in-place

# Check formatting in CI:
vex format main.vx | diff main.vx -
```

## `vex test` -- Test Runner

```bash
# Run all tests
vex test

# Run specific tests
vex test test_name

# Run benchmarks
vex test --bench

# Benchmark with custom duration
vex test --bench --benchtime 5s

# Show memory stats during benchmark
vex test --bench --benchmem

# Fuzzing
vex test --fuzz my_parser --fuzztime 30s

# Fail fast
vex test --failfast

# Coverage
vex test --coverage --coverprofile coverage.out

# Filter tests by regex
vex test --run "parser_.*"

# JSON output
vex test --json

# Short mode (skip slow tests)
vex test --short
```

### Writing Tests

```vex
// In any .vx file or test file
fn test_addition() {
    let result = 1 + 1
    assert(result == 2, "1 + 1 must equal 2")
}

fn test_option_unwrap() {
    let opt = Some(42)
    assert(opt.or(0) == 42, "Some(42).or(0) == 42")
}
```

## `vex new` / `vex init` -- Project Scaffolding

```bash
vex new my-project                     # create new project directory
vex init                               # initialize in current directory
```

Creates:
```
my-project/
├── vex.json           # package manifest
├── src/
│   └── main.vx        # entry point
└── tests/             # test directory
```

## `vex add` / `vex remove` -- Dependency Management

```bash
vex add http                           # add latest http package
vex add serde@1.2.0                    # add specific version
vex remove serde                       # remove dependency
vex update                             # update all to latest compatible
vex list                               # list all dependencies
```

## `vex watch` -- Watch Mode

```bash
vex watch main.vx                      # recompile on file changes
```

## `vex workspace` -- Monorepo Management

```bash
vex workspace list                     # list workspace members
vex workspace add ./new-crate          # add member
```

## `vex tool` -- Bundled LLVM Tools

```bash
vex tool objdump -d mybinary           # disassemble
vex tool nm mybinary                   # list symbols
vex tool ar crs libfoo.a foo.o         # create static library
vex tool strip mybinary                # strip debug symbols
vex tool lld -- <linker-flags>         # invoke lld linker
vex tool info                          # show toolchain info
```

## `vex repl` -- Interactive REPL

```bash
vex repl
> 1 + 1
2
> let x = Some(42)
> x.or(0)
42
```

## `vex clean` -- Clean Artifacts

```bash
vex clean                             # clean build cache
```

## `vex env` / `vex setup` -- Environment

```bash
vex env                               # show VEX_HOME, toolchain paths
vex setup                             # setup ~/.vex with stdlib
```

## Best Practices

1. Use `vex check` for fast validation during development.
2. Use `vex format -i` before committing code.
3. Run `vex test --bench` before and after optimization changes.
4. Use `vex test --fuzz` for code that parses untrusted input.
5. Use `vex watch` for rapid iteration with auto-recompile.
6. Use `vex compile --json` for IDE/LSP integration.
