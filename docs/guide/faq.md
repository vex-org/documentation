# Frequently Asked Questions

## General

### What is Vex?

Vex is a pre-1.0 systems programming language with explicit ownership, borrowing, native compilation, and language-level concurrency features. SIMD, GPU, FFI, and standard-library surfaces are documented with their current maturity rather than treated as uniformly complete.

### Is Vex ready for production?

Not as a general guarantee. The compiler, runtime, and standard library are still evolving. Use Vex for experiments, tools, and projects where you can pin the compiler and validate the exact target yourself. The [language status](/guide/language-status) page records known boundaries.

### What platforms does Vex support?

macOS ARM64 is the primary development platform for this checkout. Other targets are experimental until their compiler, runtime, linker, and native-library paths have been validated together. See [Platform Support](/guide/platform-support).

### What license is Vex under?

The repository is distributed under the MIT license. Check the repository license file for the authoritative text.

## Language design

### Why does Vex use `let!`?

`let` creates an immutable binding. `let!` makes local mutation explicit. Mutable references use the corresponding `!` form. This convention makes mutation visible in code and diagnostics.

### Does Vex have a garbage collector?

Vex's core model is ownership and borrowing rather than a tracing garbage collector. Heap abstractions and runtime-managed values are still subject to the implementation status of the selected library and target.

### How are errors represented?

Use enum-shaped `Option<T>` and `Result<T, E>` values, pattern matching, and the supported propagation operators. See [Enums](/guide/types/enums) and [Error Handling](/guide/error-handling).

## Compilation

### What is the difference between `vex lint`, `vex run`, and `vex compile`?

`vex lint` performs correctness analysis and configured semantic lints without requiring a final executable. `vex run` builds a temporary executable and launches it. `vex compile` produces a persistent artifact. Runtime compilation and linking can fail even when source analysis succeeds.

### Can I cross-compile?

The compiler exposes target-related options, but cross-compilation is not automatically a supported runtime configuration. Validate the target's runtime, linker, native dependencies, and standard library before relying on it.

### Why should I use `vex lint` during development?

It gives fast feedback about syntax, types, ownership, and borrowing without requiring the full runtime and native-linking path. Use `vex run` only after checking the target-specific execution path.

## Memory and safety

### What are `Box<T>`, `Ptr<T>`, and raw pointers?

- `Box<T>` is an owning heap abstraction.
- `Ptr<T>` is a typed pointer abstraction for lower-level operations.
- Raw pointers are unsafe boundary tools for FFI and specialized systems code.

Ownership and borrowing still apply around all three. Keep raw operations inside small, tested boundaries.

### What should I do when the borrow checker rejects code?

Reduce the lifetime of the borrow, make the ownership transfer explicit, or restructure the operation so mutable and immutable access do not overlap. Do not bypass the checker until the boundary and safety invariant are documented.

## Concurrency

### Are `go`, channels, `async`, and `await` stable?

They are implemented language surfaces, but runtime behavior is experimental and platform-dependent. Channels and detached work also require an explicit shutdown and ownership design. See [Concurrency Overview](/guide/concurrency/overview) and [Channels](/guide/concurrency/channels).

### Can a channel deadlock?

Yes. Capacity, send/receive ordering, task shutdown, and ownership transfers all matter. Start with a small checked example and test the runtime behavior on the target platform.

## Tooling and libraries

### Does Vex have a package manager?

The repository contains package-management commands and documentation, but the package surface is still partial. Verify the exact command and manifest fields with `vex <command> --help` and the [package manager reference](/references/vex-pm-reference).

### Can I call C libraries from Vex?

FFI syntax exists, but ABI, linking, ownership, and platform support must be checked for the selected provider and target. Start with the [FFI guide](/guide/ffi).

### Where should I report an internal compiler error?

Record the source, compiler version, repository revision, platform, command, and full diagnostic in the repository issue tracker. If the problem is already reproduced locally, link the relevant compiler issue report from the documentation.

## Getting help

- Read the [installation guide](/guide/installation) and [language status](/guide/language-status).
- Use `vex --help` and `vex <command> --help` for the binary you actually built.
- Include the exact compiler version and platform in bug reports.
