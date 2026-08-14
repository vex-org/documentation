# Benchmarks

This page describes how to benchmark Vex. It does not publish performance numbers: the current compiler and runtime are still changing, and unsupported or unrepeatable measurements would be misleading.

## Benchmarking a program

Start with a checked program and keep the workload, compiler version, target, optimization settings, and input data under version control.

~~~bash
vex --version
vex lint benchmark.vx
vex run benchmark.vx
~~~

Use the repository's test and benchmark tooling only when the command is present in the compiler version being evaluated. Run several warm-up and measurement iterations, and report a distribution rather than a single fastest result.

## What to record

| Field | Example |
| --- | --- |
| Compiler | `vex 0.4.0-rc.39` |
| Commit | Short repository revision |
| Target | OS, architecture, and runtime configuration |
| Workload | Source revision, input size, and expected result |
| Build mode | Exact command and optimization flags |
| Measurement | Iteration count, warm-up policy, median, and spread |

Comparisons with Rust, Go, Zig, C, or C++ are meaningful only when each implementation performs the same work and the results can be reproduced from published source. Do not present estimates as measurements or infer production readiness from a benchmark.

## Current status

SIMD, async, channels, GPU backends, and standard-library services are not
uniform across platforms. A successful `vex lint` proves semantic acceptance;
it does not prove that fused backend codegen, native linking, I/O, or a selected
accelerator works on the target machine. See the
[language status](/guide/language-status) page for current limitations.
