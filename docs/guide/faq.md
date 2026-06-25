# Frequently Asked Questions

## General

### What is Vex?

Vex is a modern systems programming language that combines Rust's memory safety with Go's simplicity and Mojo's automatic SIMD/GPU acceleration. It compiles to native code via LLVM 21.

### Is Vex ready for production?

Vex is pre-1.0 (currently v0.1.2). It is suitable for side projects, tools, and experimentation. Production use is at your own risk -- the language, compiler, and standard library are still evolving.

### What platforms does Vex support?

macOS (ARM64 and x86_64) and Linux (x86_64 and ARM64) are production-ready. FreeBSD and Windows are in beta. WASM (browser playground) is experimental.

### What license is Vex under?

MIT. Use it freely for any purpose, commercial or otherwise.

## Language Design

### Why doesn't Vex use `mut` like Rust?

Vex uses `!` suffix syntax (`let!`, `&T!`, `&T!` for mutable) instead of the `mut` keyword. This makes mutability a type-level property rather than a keyword modifier, which integrates better with generics and contracts.

### Why `.` instead of `::` for method calls?

Vex uses `.` for ALL member access -- methods, static functions, enum variants, namespaces. This simplifies the mental model: one operator, one meaning. `Some(x)` not `Option::Some(x)`, `Vec.new()` not `Vec::new()`.

### Does Vex have a garbage collector?

No. Vex uses ownership and borrowing (like Rust) with VUMM (Vex Unified Memory Model) for automatic heap management. VUMM infers whether `Box<T>` should be single-owner, reference-counted, or atomically reference-counted.

### How is Vex different from Rust?

Vex has Go-like syntax simplicity, automatic SIMD vectorization, first-class GPU support via SIR, VUMM automatic ownership inference, and a more comprehensive standard library. Rust has a massively larger ecosystem, more production validation, and the most sophisticated type system of any mainstream language.

### How is Vex different from Go?

Vex has no garbage collector (ownership + VUMM instead), full generics with contracts, sum types with pattern matching, automatic SIMD/GPU acceleration, and null safety via `Option<T>`. Go compiles faster and has a larger ecosystem.

## Compilation

### Why is my compile slow?

Vex uses LLVM for codegen, which accounts for most compilation time. Use `vex check` for fast type-checking without codegen during development. Incremental compilation (`--incremental`) caches intermediate results. Release builds (`--release`) take longer due to optimization passes.

### Can I cross-compile?

Yes. Use `--target` to specify the target triple:

```bash
vex compile --target x86_64-unknown-linux-gnu main.vx      # from macOS to Linux
vex compile --target aarch64-apple-darwin main.vx           # from Intel Mac to Apple Silicon
```

### What's the difference between `vex run` and `vex compile`?

`vex run` compiles to a temporary executable and runs it in one step. Best for development. `vex compile` produces a standalone binary. Best for production.

## Memory and Safety

### Do I need to worry about memory leaks?

Vex's ownership system prevents most leaks automatically. `Drop` ensures resources are freed when they go out of scope. However, reference cycles (in `SharedRc`/`AtomicArc`) can cause leaks -- use weak references or break cycles manually.

### What's the difference between `Box<T>`, `Ptr<T>`, and raw pointers?

- `Box<T>`: Heap-allocated, automatically managed (VUMM selects strategy). Use for general heap allocation.
- `Ptr<T>`: Typed pointer wrapper with safe methods (`readAt`, `writeAt`, `offset`). Use for pointer arithmetic.
- `ptr` / `*T`: Raw unchecked pointers. Use only in `unsafe` blocks for FFI and low-level code.

### What happens on null pointer dereference?

Vex doesn't have null pointers in safe code. `Option<T>` replaces null. Raw pointer dereference requires `unsafe` blocks. Out-of-bounds access on `Span<T>` causes a panic with a clear error message.

## Concurrency

### How many goroutines can I spawn?

Millions. Goroutines start with an 8 KB stack that grows as needed. The M:N scheduler distributes them across available CPU cores efficiently. Memory overhead per idle goroutine is approximately 200 bytes.

### Do channels cause deadlocks?

They can, like in any language. Unbuffered channels (capacity 0) require simultaneous send and receive. Buffered channels block when full/empty. The runtime can detect simple deadlocks (all goroutines blocked).

### How do I share data between goroutines?

Use `Channel<T>` for message passing ("don't communicate by sharing memory, share memory by communicating"). For shared state, use `Mutex<T>`, `RwLock<T>`, or atomics. VUMM automatically upgrades `Box<T>` to `AtomicArc` when shared across goroutines.

## Standard Library

### Does Vex have an HTTP client/server?

Yes. `std.http` provides a full HTTP/1.1 and HTTP/2 server and client with TLS support. The Fiber framework offers Express-like routing. See the [HTTP documentation](/std/http/).

### Does Vex have a package manager?

Yes. `vex pm` handles dependencies, publishing, and workspaces. It uses a minimum-version resolution strategy similar to Go modules.

### Can I call C libraries from Vex?

Yes. Use `extern "C"` blocks to declare C functions. See the [FFI guide](/guide/ffi) and [FFI Deep Dive](/guide/ffi-deep-dive).

### Can Vex be called from C?

Yes. Use `#[no_mangle]` and `extern "C"` on Vex functions. The Vex runtime can be embedded in C applications.

## Troubleshooting

### "Symbol not found" at runtime

A linked native symbol couldn't be resolved. Ensure all required system libraries are installed and accessible. For custom native dependencies, verify the library path is correct in `vex.toml`.

### "Borrow checker" error that seems wrong

The borrow checker (NLL) is conservative. Try:

1. Reducing the scope of mutable borrows
2. Copying/cloning values instead of borrowing
3. Restructuring code to avoid overlapping borrows
4. Using `RefCell<T>` or `Mutex<T>` for runtime borrow checking (when compile-time checks are too restrictive)

### Compiler panic / ICE (Internal Compiler Error)

This is a bug. Please report it at [github.com/meftunca/vex/issues](https://github.com/meftunca/vex/issues) with:

- The Vex source code that triggered it
- Vex version (`vex --version`)
- Platform (OS and architecture)
- The full error output

### Tests pass locally but fail in CI

Common causes:

- Platform differences (CI runs Linux, you're on macOS)
- Different Vex version (pin the version in CI)
- Undefined behavior (run with `--sanitize=address` to detect)
- Race conditions (run with `--sanitize=thread`)

## Getting Help

- **Documentation:** This site (`/docs/`)
- **Discord:** [Vex Language Server](https://discord.gg/vex)
- **GitHub Issues:** [github.com/meftunca/vex/issues](https://github.com/meftunca/vex/issues)
- **GitHub Discussions:** [github.com/meftunca/vex/discussions](https://github.com/meftunca/vex/discussions)
