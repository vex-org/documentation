# Compiler Pipeline

This page describes the main compilation flow from source text to native code or SIR-backed execution.

## End-to-End Flow

```text
source (.vx)
  -> lexer
  -> parser / syntax tree
  -> HIR lowering
  -> type inference + borrow analysis + semantic checks
  -> codegen selection
       -> LLVM/native path
       -> SIR graph path
  -> link / JIT / subprocess execution
```

## Front-End Stages

### Lexer

`vex-lexer` tokenizes source text.

### Parser

`vex-parser` constructs the syntax tree and keeps enough recovery behavior for diagnostics and tooling.

### Syntax Layer

`vex-syntax` defines the syntax node model used by the parser and later lowering passes.

## HIR and Semantic Analysis

`vex-hir` is where syntax becomes semantically meaningful program structure.

Key responsibilities include:

- name resolution
- type inference
- pattern lowering
- contract-related checks
- borrow and move analysis
- enum, `Option`, and `Result` behavior

## Memory-Safety Analysis

The repository describes the borrow system as a multi-phase analysis model. The high-level responsibilities are:

1. immutability and `let` vs `let!` enforcement
2. move tracking
3. borrow rule validation
4. lifetime-oriented validation

This is the part of the compiler that enforces the memory model documented in the guide.

## Two Main Lowering Paths

### Native LLVM Path

`vex-compiler` lowers checked HIR into LLVM IR and then into object code, linked executables, or JIT-executed code.

This path is the default for ordinary systems code.

### SIR Path

When the program shape is suitable for data-parallel lowering, Vex can form SIR graphs that later target SIMD and selected accelerator backends.

This path is the basis for:

- vector-style arithmetic
- tensor and mask operations
- fusion and graph rewrites
- backend-specific kernel generation

## Driver Layer

The user usually interacts with the compiler through `vex-cli`, which wraps compilation, linking, JIT/no-JIT execution, and test discovery.

That means the operational pipeline is often:

```text
vex run / vex compile / vex test
  -> compiler driver
  -> runtime + linker integration
  -> execution or test reporting
```

## Related Pages

- [SIR & Backends](/architecture/sir-and-backends)
- [Runtime & Tooling](/architecture/runtime-and-tooling)
- [CLI Reference](/references/vex-cli-reference)
