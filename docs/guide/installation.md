# Installation & Setup

## System Requirements

### Supported Platforms

| Platform | Architecture | Status |
|----------|--------------|--------|
| Linux | x86_64, aarch64 | ✅ Full Support |
| macOS | x86_64, Apple Silicon | ✅ Full Support |
| Windows | x86_64 | ✅ Full Support |
| FreeBSD | x86_64 | ✅ Full Support |

### Dependencies

- **LLVM 18+** - Backend code generation
- **Clang** - C runtime compilation
- **Rust 1.75+** - Building from source (temporary, until self-hosted)

## Building from Source

### 1. Clone the Repository

```bash
git clone https://github.com/meftunca/vex_lang.git
cd vex_lang
```

### 2. Build the Compiler

```bash
# Debug build (faster compilation)
cargo build

# Release build (optimized)
cargo build --release
```

### 3. Verify Installation

```bash
# Check version
~/.cargo/target/debug/vex --version

# Run a test program
~/.cargo/target/debug/vex run examples/hello.vx
```

## Pre-built Binaries

::: info Coming Soon
Pre-built binaries for all platforms will be available on the releases page after v0.3.0.
:::

## Editor/IDE Setup

### VS Code (Recommended)

1. Install the **Vex Language** extension from the marketplace
2. The extension provides:
   - Syntax highlighting
   - LSP integration (diagnostics, completion, go-to-definition)
   - Code formatting
   - Snippets

### Manual LSP Setup

For other editors that support LSP:

```bash
# Build the LSP server
cargo build --release -p vex-lsp

# The binary is at:
~/.cargo/target/release/vex-lsp
```

Configure your editor to use `vex-lsp` as the language server for `.vx` files.

## Project Structure

A typical Vex project looks like:

```
my_project/
├── vex.json          # Project manifest
├── src/
│   ├── main.vx       # Entry point
│   └── lib/          # Library modules
├── tests/            # Test files
└── examples/         # Example code
```

## First Program

Create a file `hello.vx`:

```vex
fn main(): i32 {
    println("Hello, Vex!");
    return 0;
}
```

Run it:

```bash
vex run hello.vx
```

## Build Commands

| Command | Description |
|---------|-------------|
| `vex run <file>` | Compile and run |
| `vex build <file>` | Compile to binary |
| `vex check <file>` | Type-check without compiling |
| `vex fmt <file>` | Format source code |
| `vex doc <file>` | Generate documentation |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VEX_HOME` | Vex installation directory | `~/.vex` |
| `VEX_TARGET` | Default compilation target | Host platform |
| `VEX_OPT_LEVEL` | Optimization level (0-3) | `2` |

## Troubleshooting

### LLVM Not Found

```bash
# macOS
brew install llvm@18
export LLVM_SYS_180_PREFIX=$(brew --prefix llvm@18)

# Ubuntu/Debian
sudo apt install llvm-18-dev libclang-18-dev

# Fedora
sudo dnf install llvm18-devel clang18-devel
```

### Linker Errors

Ensure you have a compatible linker:

```bash
# Use LLD for faster linking (recommended)
cargo install cargo-binutils
rustup component add llvm-tools-preview
```

## Next Steps

- [Syntax Overview](/guide/basics/syntax) - Learn Vex syntax
- [Your First Project](/guide/basics/first-project) - Create a complete project
