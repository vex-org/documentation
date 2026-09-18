# `vex test` reference

```text
vex test [OPTIONS] [PATTERN]
```

## Discovery

| File/function | Meaning |
| --- | --- |
| `*.test.vx`, `*_test.vx`, `*_bench.vx` | Discoverable source under a selected directory |
| `test_*`, `Test*` | Test function |
| `bench_*`, `Benchmark*` | Benchmark function |

`PATTERN` accepts an existing directory, an existing regular `.vx` file, or a
quoted glob such as `"lib/std/net/tests/*.test.vx"`. Existing literal paths take
precedence over glob syntax, including filenames containing brackets and
directories whose names end in `.vx`. With no argument, discovery starts in the
current directory.

A file glob can select any ordinary `.vx` filename. A matched directory selects
its conventionally named test/benchmark sources recursively. Recursive `**`
globs are supported. Automatic traversal skips generated runners, hidden
directories, `target`, `node_modules`, `vex-builds` and `archived`. It does not
follow discovered directory symlinks; pass a directory symlink explicitly to
select that root. Source-file symlinks are accepted and deduplicated by their
resolved path. Pipes, sockets and devices are never opened as test sources.

A missing explicit path, invalid/unmatched glob, or unreadable selected source
is an error with a nonzero exit status, not an empty successful run. A real empty
directory or a `--run` filter selecting no functions remains a valid empty
selection. Neither is evidence that tests passed.

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
| `--timeout <SECONDS>` | Bound runtime for each generated test-file runner |
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
For tests, the runtime watchdog starts when the generated runner enters `main`;
it covers the whole file, not a separate budget per function. Compilation has a
separate 180-second watchdog and process startup has its own deadline. These
are not charged to `--timeout`. Runtime timeout terminates the runner's process
group, including its child processes.

Completed test results survive a later timeout: a reported `PASS`, `FAIL` or `SKIP`
keeps its status and measured duration. Only tests without a complete result
record receive `timeout`. The CLI retains partial stdout/stderr for diagnosis.

Test completion and process completion are separate. A file may print all its
test results and then hang while waiting for detached tasks, or terminate
abnormally during finalization. Such a run exits nonzero and reports a **file
execution error**; it does not invent an additional failed test or rewrite
completed outcomes. `--failfast` stops on file errors as well as test failures.

In `--json` output, `passed`, `failed`, `skipped`, `total` and `results` describe
actual test functions. A skipped test has status `skip` and counts toward
`skipped` and `total`, not `passed` or `failed`. An all-skipped run succeeds but
is summarized as `SKIP`, not as evidence of passing tests. Calling `skip()` after
`err()` does not suppress the failure.

The additive `file_errors` array contains objects with `file`,
`status` (`timeout` or `runtime_error`), `message` and diagnostic `details`.
It is empty on a clean run. Automation must check the CLI exit status and
`file_errors`, not just `failed == 0`: all tests can pass while finalization
fails. Compilation failures remain `compile_error` test results, not runtime
timeouts.

The API reference for `TestCtx` and `BenchCtx` is on the
[`testing` package page](/std/testing).
