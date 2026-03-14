# Introduction

## What is Vex?

**Vex** is a modern, **parallelism-first** systems programming language designed to maximize hardware utilization without sacrificing developer experience. Write simple, sequential code — the compiler automatically determines optimal execution strategy across CPU SIMD, GPU compute, and distributed systems.

> *"Every Cycle, Every Core, Every Time"*

Vex combines the best ideas from multiple languages:
- **Rust's** memory safety and ownership model
- **Go's** concurrency primitives (goroutines, channels)
- **Zig's** comptime and freestanding capabilities
- **Mojo's** automatic vectorization philosophy

## Design Philosophy

### 1. Hardware Saturation
Vex is designed to **saturate your hardware** — every CPU core, every GPU shader unit, every cycle utilized. No annotations, no manual optimization, no `<<<blocks, threads>>>` nightmares.

### 2. Zero-Cost Abstractions
High-level constructs compile down to optimal machine code. You don't pay for what you don't use.

### 3. Memory Safety Without Compromises
A 4-phase borrow checker ensures memory safety at compile time, without garbage collection overhead.

### 4. Freestanding First
Vex can run without an OS. Custom allocators, raw syscalls, and bare-metal support are first-class citizens.

## Key Features

| Feature | Description |
|---------|-------------|
| **Auto-Vectorization** | Transparent SIMD (SSE, AVX, AVX-512, NEON) |
| **GPU Offloading** | Automatic GPU acceleration for large workloads |
| **Goroutines & Channels** | CSP-style concurrency with `go {}` syntax |
| **4-Phase Borrow Checker** | Polonius-style memory safety |
| **VUMM** | Unified Memory Model with automatic RC selection |
| **Freestanding** | No libc dependency, raw syscall support |
| **Autograd** | Built-in automatic differentiation |
| **Complete Tooling** | LSP, formatter, package manager |

## Hello World

```vex
fn main(): i32 {
    $println("Hello, Vex!")
    return 0;
}
```

## A Taste of Vex

### Automatic Vectorization
```vex
fn vector_add(): [f32; 8] {
    let a: [f32; 8] = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0];
    let b: [f32; 8] = [8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0];
    
    // Automatically vectorized to SIMD instructions!
    return a + b;
}
```

### Concurrency with Channels
```vex
fn main(): i32 {
    let! ch = Channel.new<i32>(1)
    
    go {
        ch.send(42);
    };
    
    let value = <-ch;
    $println("Received: {}", value);
    
    return 0;
}
```

### Memory Safety
```vex
fn safe_borrowing() {
    let! data = Vec.new<i32>();
    data.push(1);
    data.push(2);
    
    let ref1 = &data;      // Immutable borrow
    $println("{}", ref1[0]); // OK
    
    let ref2 = &data!;     // ERROR: Cannot mutably borrow while immutably borrowed
}
```

## Comparison with Other Languages

| Feature | Vex | Rust | Go | Zig | Mojo |
|---------|-----|------|-----|-----|------|
| Memory Safety | ✅ Borrow Checker | ✅ | ❌ GC | ❌ Manual | ✅ |
| Auto-Vectorization | ✅ Built-in | ❌ | ❌ | ❌ | ✅ |
| GPU Codegen | ✅ SPIR-V | ❌ | ❌ | ❌ | ✅ |
| Freestanding | ✅ | ✅ | ❌ | ✅ | ❌ |
| Channels | ✅ | 📦 Library | ✅ | ❌ | ❌ |
| Autograd | ✅ | ❌ | ❌ | ❌ | ✅ |
| Compile Speed | ⚡ Fast | 🐢 Slow | ⚡ Fast | ⚡ Fast | 🐢 Slow |

## Next Steps

- [Installation & Setup](/guide/installation) - Get Vex running on your machine
- [Language Basics](/guide/basics/syntax) - Learn the fundamentals
- [Examples](/examples/hello-world) - See Vex in action
