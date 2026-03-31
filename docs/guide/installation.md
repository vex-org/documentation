# Installation & Setup

## Toolchain Requirements

### Supported Platforms

| Platform | Architecture          | Status          |
| -------- | --------------------- | --------------- |
| Linux    | x86_64, aarch64       | ✅ Full Support |
| macOS    | x86_64, Apple Silicon | ✅ Full Support |
| Windows  | x86_64                | ✅ Full Support |
| FreeBSD  | x86_64                | ✅ Full Support |

### Dependencies

- **LLVM 21.1.8** - backend code generation used by the main toolchain
- **Clang / platform C toolchain** - runtime and native linking support
- **Rust toolchain** - required to build the compiler and tools from source today

## Building from Source

### 1. Clone the Repository

```bash
git clone https://github.com/meftunca/vex_lang.git
cd vex_lang
```

### 2. Build the Compiler

```bash
# Debug build
cargo build

# Release build
cargo build --release
```

### 3. Verify Installation

```bash
# Compiler binary
~/.cargo/target/debug/vex --version

# Run a sample program
~/.cargo/target/debug/vex run examples/hello.vx

# Run the repo test suite
./test_all.sh
```

The debug binary path above is the canonical development path used throughout the repository.

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

# Binary path
~/.cargo/target/release/vex-lsp
```

Configure your editor to use `vex-lsp` as the language server for `.vx` files.

## Typical Workspace Layout

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
    $println("Hello, Vex!")
    return 0;
}
```

Run it:

```bash
~/.cargo/target/debug/vex run hello.vx
```

## Common Commands

| Command              | Description            |
| -------------------- | ---------------------- |
| `vex run <file>`     | Compile and run        |
| `vex compile <file>` | Compile and link       |
| `vex test`           | Discover and run tests |

## Useful Development Notes

- `vex run` may use JIT or no-JIT execution depending on runtime/native-linking constraints.
- `vex compile` is the right entry point when you want persistent artifacts or LLVM output.
- Examples in this repository often use `~/.cargo/target/debug/vex` directly during compiler development.

## Troubleshooting

### LLVM Not Found

```bash
# macOS
brew install llvm

# Ubuntu/Debian
sudo apt install llvm-dev libclang-dev

# Fedora
sudo dnf install llvm-devel clang-devel
```

### Linker Errors

LLD is recommended when available.

```bash
# macOS
brew install lld
```

## Next Steps

- [Syntax Overview](/guide/basics/syntax) - Learn Vex syntax
- [Functions](/guide/basics/functions) - Understand declarations and receivers
- [Testing](/guide/tooling/testing) - Learn the test runner
