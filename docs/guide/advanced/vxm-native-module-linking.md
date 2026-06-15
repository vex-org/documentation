# VXM Native Module Linking Architecture

Vex uses a highly optimized module caching system known as **VXM (Vex Module) Native Linking**. This system drastically reduces compilation times for large projects by caching dependencies as pre-compiled, fully-optimized LLVM Bitcode (`.bc`), bypassing parsing, AST generation, and High-Level IR (HIR) lowering for all upstream dependencies.

## The Problem

In a traditional compiler, importing a large library like `std/http` or `std/regex` forces the compiler to parse thousands of lines of code, resolve types, and generate IR for the entire library every time you compile your application. This can turn a 100ms compilation into a 5-second compilation, especially for heavily layered applications.

## The VXM Solution

VXM introduces a two-phase compilation architecture:

1. **Independent Package Codegen (`vex build`)**
2. **Transparent Consumer Linking (`vex compile` / `vex run`)**

### Phase 1: Library Mode Compilation

When a package defines a `"lib"` entry in its `vex.json` manifest, running `vex build` activates **Library Mode**.

```json
{
  "name": "my_library",
  "version": "1.0.0",
  "lib": "src/lib.vx"
}
```

During Library Mode compilation:
- **Dead Code Elimination (DCE) is Disabled**: The compiler preserves all exported functions (and generic templates via sidecars) rather than aggressively stripping them. This ensures that any future consumer of the library has access to the full API.
- **Bitcode Emission**: The compiler runs its full optimization pipeline (O2/O3) and outputs a single `package.bc` LLVM Bitcode file.
- **Global Caching**: The resulting `.bc` file is cached globally in `~/.vex/cache/packages/<name>/<version>/package.bc`.

### Phase 2: Transparent Consumer Linking

When you build an application that imports `my_library`, the Vex Package Manager (`vex-pm`) automatically intercepts the import graph.

1. **Dependency Resolution**: `vex-pm` identifies that `my_library` is already built and cached.
2. **AST Bypass**: The compiler completely skips parsing and type-checking the implementation of `my_library`.
3. **Link-Time Injection**: Instead, `vex-pm` passes the cached `package.bc` directly to the linker (LLD or Clang fallback).

### Link-Time Optimization (LTO) Integration

Because Vex relies on a bundled, fixed LLVM version (v22), the cached bitcode files are perfectly compatible with the consumer's emitted bitcode. 

When the linker runs, it executes **Link-Time Optimization (LTO)** across the consumer code and the pre-compiled VXM modules. This enables:
- **Cross-Module Inlining**: A function call to `my_library::fast_math()` can be perfectly inlined into the consumer's loop, just as if it were compiled from source in the same module.
- **Zero-Cost Abstractions**: The runtime performance is completely unaffected by the compilation boundary.
- **Late Dead-Code Elimination**: While the cached `.bc` file contained *all* exported functions, the final linker (LLD) will strip out the ones your application didn't actually use, ensuring your final binary remains tiny.

## Local Workspaces and Standard Library

The same VXM mechanics apply to the Vex Standard Library (`std/*`). Standard library modules are pre-compiled and shipped with the toolchain as `.bc` objects. When you `import std::http`, Vex links the precompiled `std_http.bc` transparently.

Local workspace dependencies (e.g., a monorepo with multiple local libraries) also use VXM caching. The workspace resolver determines if the local library source has changed since the last `package.bc` generation, and rebuilds the bitcode cache only if necessary.
