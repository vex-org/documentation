# Contributing to Vex

This guide covers how to build Vex from source, run tests, debug the compiler, and submit contributions.

## Building from Source

### Prerequisites

| Dependency | Version | Notes                                      |
| ---------- | ------- | ------------------------------------------ |
| **Rust**   | 1.80+   | Install via [rustup.rs](https://rustup.rs) |
| **LLVM**   | 21.1.8  | Required for codegen                       |
| **CMake**  | 3.20+   | Required by LLVM bindings                  |
| **Clang**  | 16+     | For compiling the C runtime                |
| **Git**    | 2.40+   | Version control                            |

### macOS

```bash
# Install LLVM via Homebrew
brew install llvm@21 cmake

# Set LLVM path
export LLVM_SYS_210_PREFIX=$(brew --prefix llvm@21)

# Build
git clone https://github.com/meftunca/vex
cd vex
cargo build

# The binary is at ~/.cargo/target/debug/vex
```

### Linux (Ubuntu/Debian)

```bash
# Install dependencies
sudo apt-get install -y \
    build-essential cmake clang-16 \
    libllvm-21-dev libclang-21-dev \
    libssl-dev pkg-config

# Build
git clone https://github.com/meftunca/vex
cd vex
cargo build
```

### Linux (Fedora)

```bash
sudo dnf install -y \
    cmake clang clang-devel llvm21 llvm21-devel \
    openssl-devel

git clone https://github.com/meftunca/vex
cd vex
cargo build
```

## Project Structure

```
vex_lang/
├── crates/                        # Rust compiler crates
│   ├── vex-lexer/                # Tokenizer
│   ├── vex-parser/               # Rowan-based CST parser
│   ├── vex-syntax/               # AST type definitions
│   ├── vex-hir/                  # High-level IR (type checking, borrow checking)
│   ├── vex-sir/                  # Silicon IR (GPU/SIMD pipeline)
│   ├── vex-compiler/             # Main compiler (codegen, prelude)
│   └── vex-diagnostics/          # Error/warning reporting
├── lib/
│   ├── runtime/                  # C runtime (scheduler, VUMM allocator, async)
│   └── std/                      # Vex standard library (.vx files)
├── tools/
│   ├── vex-cli/                  # CLI binary (run, compile, test)
│   ├── vex-lsp/                  # Language server
│   ├── vex-formatter/            # Code formatter
│   ├── vex-fuzzer/               # Fuzzer
│   ├── vex-bench/                # Benchmark runner
│   ├── vex-pm/                   # Package manager
│   └── vex-doc/                  # Documentation generator
├── web/documentation/            # VitePress documentation site
├── examples/                     # Example .vx files
├── tests/                        # Integration tests
└── docs/                         # Internal design docs
```

## Running Tests

### Full Test Suite

```bash
./test_all.sh                     # Runs all ~812 tests
```

### Subset of Tests

```bash
# Compiler tests only
cargo test -p vex-compiler

# Lexer tests
cargo test -p vex-lexer

# Parser tests
cargo test -p vex-parser

# SIR tests
cargo test -p vex-sir

# Runtime tests
cd lib/runtime && make test

# Run a specific test
cargo test -p vex-compiler test_name

# Run tests with output
cargo test -p vex-compiler -- --nocapture
```

### Running Individual Vex Files

```bash
# Compile and run
~/.cargo/target/debug/vex run examples/hello.vx

# AOT compile
~/.cargo/target/debug/vex compile examples/hello.vx

# With optimization
~/.cargo/target/debug/vex run -O3 examples/hello.vx
```

## Debugging the Compiler

### Emitting LLVM IR

```bash
~/.cargo/target/debug/vex compile --emit-llvm examples/hello.vx
# Produces output.ll
```

### Rust Backtrace

```bash
RUST_BACKTRACE=1 ~/.cargo/target/debug/vex run problematic.vx
RUST_BACKTRACE=full ~/.cargo/target/debug/vex run problematic.vx
```

### Debugging with LLDB

```bash
# Build with debug symbols
cargo build

# Launch in debugger
lldb ~/.cargo/target/debug/vex
(lldb) run examples/hello.vx

# Set breakpoints
(lldb) b vex_compiler::codegen_hir::expr::binary::compile
(lldb) run examples/hello.vx
```

### Logging

Vex uses the `log` crate for diagnostics:

```bash
# Enable verbose logging
RUST_LOG=vex_compiler=debug ~/.cargo/target/debug/vex run file.vx

# Specific module
RUST_LOG=vex_compiler::codegen_hir=trace ~/.cargo/target/debug/vex run file.vx

# All modules
RUST_LOG=vex=trace ~/.cargo/target/debug/vex run file.vx
```

## Contribution Workflow

### 1. Find an Issue

Check GitHub Issues for `good first issue`, `help wanted`, or `bug` labels.

### 2. Create a Branch

```bash
git checkout -b feature/my-feature
# or: git checkout -b fix/my-bug-fix
```

### 3. Make Changes

Follow these conventions:

**Rust code (compiler):**

- Files must not exceed 400 lines. Split into modules when approaching this limit.
- Use `Result<T, E>` with `?` for error propagation. Never use `unwrap()` or `panic!` in compiler core.
- Follow standard Rust naming conventions (snake_case for functions, CamelCase for types).
- Use `build_struct_gep` and `const_gep` for LLVM pointer operations -- never manual byte offset calculations.

**Vex code (stdlib):**

- Follow Vex syntax v0.1.2. No `::` operator (use `.`). No `mut` keyword (use `!`).
- No manual pointer arithmetic (use `Ptr<T>`, `Span<T>`, `RawBuf`).
- Write comprehensive tests for all new stdlib functions.

### 4. Write Tests

Every change should include tests:

- **Compiler changes:** Add to `tests/` or existing `#[test]` functions.
- **Stdlib changes:** Add to `lib/std/<module>/tests/`.
- **Bug fixes:** Add a regression test that fails before your fix and passes after.

### 5. Run the Full Test Suite

```bash
./test_all.sh
```

All ~812 tests must pass. Check `docs/PROJECT_STATUS.md` for current test status.

### 6. Submit a Pull Request

- Write a clear PR description: what, why, how tested.
- Reference related issues with `Fixes #123`.
- Keep PRs focused -- one concern per PR.
- Ensure CI passes (GitHub Actions runs tests on macOS and Linux).

## Code Conventions

### Rust (Compiler)

```rust
// Use Result for fallible operations
fn parse_tokens(tokens: &[Token]) -> Result<Ast, ParseError> {
    let header = parse_header(tokens)?;
    Ok(Ast::new(header))
}

// Module organization: one concept per file
// src/codegen_hir/expr/binary/arrays.rs  (not a 500-line binary.rs)
```

### Vex (Standard Library)

```vex
// Use contracts for abstraction
fn sum<T: $Add + Default>(items: Span<T>): T {
    let! total = T.default()
    for item in items {
        total = total + item
    }
    return total
}
```

## Documentation

- Language docs live in `web/documentation/docs/` (VitePress markdown).
- Internal design docs live in `docs/`.
- API docs are generated by `vex doc` from doc comments.

## Getting Help

- **Discord:** [Vex Language Server](https://discord.gg/vex) -- `#contributing` channel
- **GitHub Discussions:** For design questions and proposals
- **Issues:** For bugs and feature requests

## Best Practices

1. Keep PRs small and focused -- easier to review, less likely to introduce bugs.
2. Run tests BEFORE pushing -- CI is not a test runner, it's a verification step.
3. Write clear commit messages: `fix: handle None case in Option.unwrap()` not `fix bug`.
4. Update documentation when changing public APIs.
5. Add memory for lessons learned in `/memories/repo/` for significant discoveries.
