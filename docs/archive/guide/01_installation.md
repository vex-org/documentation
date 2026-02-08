# Installation

Getting started with Vex is simple.

## Prerequisites
- **OS**: macOS (12+), Linux, or Windows (WSL2 recommended)
- **Dependencies**: `curl`, `git`, `build-essential` (gcc/clang)

## Installing via VexUp

The easiest way to install Vex is using the official installer script:

```bash
curl -sSf https://vex-lang.org/install.sh | sh
```

This will:
1.  Download the latest `vex-cli` binary.
2.  Install `mimalloc` and standard library dependencies.
3.  Add `vex` to your PATH.

## Building from Source

If you want to contribute or use the bleeding edge version:

```bash
git clone https://github.com/convex-lang/vex
cd vex
cargo build --release
```

## Verifying Installation

Open a new terminal and run:

```bash
vex --version
```

You should see something like:
`vex-cli 0.1.2 (silicon-native) on darwin/arm64`
