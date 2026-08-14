# Installation

The current documented workflow builds Vex from source. Prebuilt release packages and platform-specific distribution are tracked separately from the compiler source, so use the repository build when you need a version that matches the checked examples.

## Requirements

You need:

- a recent Rust toolchain with Cargo;
- LLVM and Clang development tools required by the selected backend;
- a native linker for your operating system;
- Git to obtain the repository.

The repository's workspace manifest is the authoritative source for compiler and tool versions. Vex is currently 0.4.0-rc.39 and remains pre-1.0.

## Build from source

~~~bash
git clone https://github.com/meftunca/vex_lang.git
cd vex_lang
cargo build --release
~~~

The release binary is target/release/vex. Confirm the build before using it:

~~~bash
target/release/vex --version
target/release/vex --help
~~~

For a faster edit-check cycle, use the debug build instead:

~~~bash
cargo build
target/debug/vex lint examples/01_basics/hello_world.vx
~~~

## Run a first program

Create hello.vx:

~~~vex
fn main(): i32 {
    $println("Hello, Vex!");
    return 0;
}
~~~

Then check and run it:

~~~bash
target/release/vex lint hello.vx
target/release/vex run hello.vx
~~~

Use lint while writing code. It performs correctness and configured lint analysis without creating a final executable. Use run when you want the compiler to build a temporary executable and launch it.

::: warning Native execution is a separate gate
`vex lint` does not emit an object, link, or execute the program. `vex run`
uses the fused embedded VexArch image plus the requested target's native
support and system ABI, so validate that path on the exact deployment target.
:::

## Command-line tools

The compiler currently exposes these high-level commands:

| Command | Purpose |
| --- | --- |
| `vex lint [target]` | Run correctness analysis, semantic lints and verified fixes without code generation. |
| `vex run <file>` | Compile and run a source file. |
| `vex compile <file>` | Compile and link a persistent artifact. |
| vex build | Build a Vex package or project. |
| vex test | Discover and run Vex tests. |
| vex format | Format Vex source. |
| vex doc | Generate API documentation from Vex source. |
| vex view | Inspect compiler representations and analyses. |
| vex new / vex init | Create or initialize a project. |
| vex mod / vex workspace | Manage module and workspace workflows. |
| vex env / vex setup | Inspect or initialize the Vex environment. |

Run `vex <command> --help` for the options supported by the binary you built. The [CLI reference](/references/vex-cli-reference) describes the command surface in more detail.

## Project layout

A conventional project keeps the manifest and source tree separate:

~~~text
my-project/
├── vex.json
├── src/
│   └── main.vx
├── tests/
└── examples/
~~~

The exact manifest fields depend on whether the project uses local modules, native artifacts, or package dependencies. Start with the [package manager reference](/references/vex-pm-reference) instead of copying an outdated manifest from a design note.

## Editor support

The repository includes an LSP implementation and a VS Code extension under editors/vscode. Build the LSP server with:

~~~bash
cargo build --release -p vex-lsp
~~~

The resulting binary is target/release/vex-lsp. Configure your editor to start it for .vx files. LSP capabilities and editor integration are evolving alongside the compiler, so treat advanced refactoring features as experimental.

## Troubleshooting

### LLVM or Clang is not found

Install the development packages for your operating system and ensure the compiler can find them through the environment used by Cargo. On macOS, the Xcode Command Line Tools are usually required. On Linux, install the distribution's LLVM, Clang, and development packages.

### The compiler accepts a file but linking fails

check and compile exercise different parts of the toolchain. A successful check proves that the source passed parsing and semantic analysis; it does not prove that the target linker, runtime libraries, or native dependencies are available. Re-run with the full compiler output and record the target triple when reporting the problem.

### An example does not match your checkout

Check the compiler version first:

~~~bash
target/release/vex --version
git rev-parse --short HEAD
~~~

The documentation site follows the repository's current development line. Pin both the compiler revision and the documentation revision in CI when reproducibility matters.

## Next steps

- [Introduction](/guide/introduction)
- [Language Status](/guide/language-status)
- [Syntax](/guide/basics/syntax)
- [Testing](/guide/tooling/testing)
- [CLI Reference](/references/vex-cli-reference)
