# Platform Support

Platform support has two separate dimensions: whether the compiler can check a program for a target, and whether the bundled runtime, linker, native I/O, and optional backends can build and run there. Do not treat a target triple or a successful source check as proof of full runtime support.

## Current support matrix

| Platform | Current documentation status | Notes |
| --- | --- | --- |
| macOS ARM64 | Primary development platform | Local fused compile/run and the representative native comptime corpus are characterized; release certification still requires a retained clean-host artifact. |
| macOS x86_64 | Experimental | Requires independent runtime validation on the target machine. |
| Linux x86_64 / ARM64 | Experimental | Structural target checks and release lanes exist; retain green native artifacts on each exact release host before promoting support. |
| FreeBSD | Experimental | Not validated in this documentation pass. |
| Windows | Experimental | Toolchain and runtime integration are not validated in this documentation pass. |
| WASM | Experimental | Limited compiler and library surface; do not assume native-runtime parity. |
| iOS and other Apple targets | Planned or experimental | A target entry alone does not provide a supported runtime port. |

## Building from source

The most reliable workflow is to build the compiler from the repository and check a small program first:

~~~bash
cargo build --release
target/release/vex --version
target/release/vex lint examples/01_basics/hello_world.vx
~~~

The exact native dependencies depend on the compiler checkout and host platform. Follow the repository build instructions and record the toolchain versions when reporting a failure.

## Fusion and native-link boundary

`vex lint` validates source semantics but does not execute LLVM object emission,
native linking, or the produced program. `vex compile` and `vex run` rehydrate
target-selected VexArch sources from the compiler's embedded VRI; they do not
rebuild or link a separate runtime artifact. Platform certification must still
exercise the requested target's native support pack, linker, system ABI and
execution path.

## Reporting platform results

Include:

- operating-system version and architecture;
- compiler version and repository revision;
- Rust, LLVM, linker, and C toolchain versions where relevant;
- the exact `vex lint`, `vex compile`, or `vex run` command;
- whether the failure occurred during source checking, VRI target selection,
  fused codegen, native linking, or execution.

Platform claims should be updated only after the relevant path has been tested on that platform.
