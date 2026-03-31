# Introduction

Vex is a parallelism-first systems programming language aimed at native performance, memory safety, and hardware saturation without forcing the programmer into low-level scheduling or handwritten SIMD.

## Core Model

Vex combines four ideas into one language surface:

- ownership and borrowing for memory safety
- Go-style task spawning and channels for concurrency
- tensor/SIMD-friendly operators that lower into SIR
- systems-level escape hatches for FFI, freestanding work, and typed low-level memory access

The compiler pipeline can lower regular code through native LLVM codegen and lower data-parallel shapes through SIR for optimized SIMD or GPU backends.

## Syntax at a Glance

Vex syntax is intentionally small and direct:

```vex
fn main(): i32 {
    let x = 5;
    let! total = x + 2;
    $println("total = {}", total);
    return 0;
}
```

- `fn name(): Type` declares a function return type
- `let` is immutable by default
- `let!` introduces mutability
- member access uses `.`
- builtins such as `$println` are always available

## Why Vex Exists

### Hardware-First Execution

Vex is designed around the idea that arrays, tensors, reductions, maps, fused arithmetic, and similar patterns should compile into efficient SIMD or GPU-ready graphs when the program shape allows it.

### Safe Systems Programming

The language keeps explicit ownership, borrowing, and typed low-level memory tools in the foreground. Instead of manual pointer arithmetic, code is expected to use `Ptr<T>`, `Span<T>`, and `RawBuf` for clear and auditable memory operations.

### Practical Concurrency

Vex includes `go {}` tasks, async workflows, and channels as built-in concepts, so concurrent code stays inside the main language model instead of being outsourced to framework-specific conventions.

## Major Areas in the Guide

- [Syntax](/guide/basics/syntax): lexical rules, declarations, expressions, and control flow
- [Enums](/guide/types/enums): tagged unions, `Option`, `Result`, and matching
- [Ownership](/guide/memory/ownership): moves, borrows, and mutation rules
- [Error Handling](/guide/error-handling): `Result`, `Option`, `?`, `!>`, and `??`
- [SIMD](/guide/simd/): tensors, masks, reductions, and vectorized operators
- [GPU & SIR](/guide/gpu/): the graph pipeline and heterogeneous backends
- [Testing](/guide/tooling/testing): `vex test`, discovery, and test authoring

## Representative Features

| Area             | What you get                                                          |
| ---------------- | --------------------------------------------------------------------- |
| Memory model     | Ownership, borrowing, lifetimes, VUMM, RAII                           |
| Low-level access | `Ptr<T>`, `Span<T>`, `RawBuf`, FFI, freestanding support              |
| Concurrency      | `go {}` tasks, async workflows, channels                              |
| Compute          | SIMD lowering, tensor operators, SIR, backend fusion                  |
| Tooling          | `vex run`, `vex compile`, `vex test`, formatter, docs, editor tooling |

## Small Examples

### Error propagation

```vex
fn divide(a: i32, b: i32): Result<i32, i32> {
    if b == 0 {
        return Err(1);
    }
    return Ok(a / b);
}

fn compute(): Result<i32, i32> {
    let x = divide(20, 4)?;
    return Ok(x + 1);
}
```

### Concurrency

```vex
fn main(): i32 {
    let! ch = Channel.new<i32>(1);

    go {
        ch.send(42);
    };

    match ch.recv() {
        Some(v) => { $println("received {}", v); }
        None => { return 1; }
    }

    return 0;
}
```

### Data-parallel expression

```vex
fn fused(): [f32; 4] {
    let a = [1.0, 2.0, 3.0, 4.0];
    let b = [2.0, 2.0, 2.0, 2.0];
    let c = [3.0, 3.0, 3.0, 3.0];
    return a + b * c;
}
```

## Where to Go Next

1. [Installation](/guide/installation)
2. [Syntax](/guide/basics/syntax)
3. [Functions](/guide/basics/functions)
4. [Enums](/guide/types/enums)
5. [Ownership](/guide/memory/ownership)
