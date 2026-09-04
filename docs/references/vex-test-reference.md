# `vex test` reference

```text
vex test [OPTIONS] [PATTERN]
```

## Discovery

| File/function | Meaning |
| --- | --- |
| `*.test.vx`, `*_test.vx` | Discoverable source |
| `test_*`, `Test*` | Test function |
| `bench_*`, `Benchmark*` | Benchmark function |

Accepted test signatures are zero arguments or one `&TestCtx!` argument.
Zero-argument `bool` uses `true` as success; integer status uses `0`; context
tests use sealed `failed()`/`skipped()` state. Async tests are awaited from a
generated async main. A discovered file with a custom `main` is rejected.

## Options

| Option | Purpose |
| --- | --- |
| `-q`, `--quiet` | Zero-noise successful output |
| `-v`, `--verbose` | Detailed execution output |
| `--run <REGEX>` | Filter test names |
| `--no-parallel` | Serialize test files |
| `--timeout <SECONDS>` | Bound compilation/execution |
| `--failfast` | Stop after first failure |
| `--short` | Select short-mode behavior |
| `--json` | Structured result output |
| `-O0` … `-O3` | Generated runner optimization level |
| `--analyze-comptime` | Print comptime staging telemetry |
| `--coverage` | LLVM coverage run |
| `--coverprofile <FILE>` | Coverage output path |
| `--covermode <MODE>` | `set`, `count`, or `atomic` |
| `--fuzz <TARGET>` | Run a fuzz target |
| `--fuzztime <DURATION>` | Bound fuzz execution |

Benchmark-only options:

| Option | Purpose |
| --- | --- |
| `--bench` | Select benchmarks instead of tests |
| `--benchtime <DURATION>` | Target measurement duration (default `1s`) |
| `--count <N>` | Repeat benchmark measurement |
| `--benchmem` | Report allocation counters |

Use `vex test --help` as the authoritative flag list for the installed CLI.
The API reference for `TestCtx` and `BenchCtx` is on the
[`testing` package page](/std/testing).
