# vex test Reference

Comprehensive reference for the Vex test runner — test discovery, execution, benchmarks, subtests, and CI/CD integration.

---

## Quick Start

```bash
# Run all tests
vex test

# Run tests in a specific file
vex test lib/std/rand/tests/rand.test.vx

# Run tests matching a pattern
vex test lib/std/

# Run benchmarks only
vex test --bench lib/std/rand/tests/bench.test.vx

# Run with all features
vex test --failfast --benchmem --json
```

---

## Test Discovery

The test runner discovers test files using these patterns:

| Pattern | Example |
|---------|---------|
| `*.test.vx` | `math.test.vx` |
| `*_test.vx` | `math_test.vx` |

Within test files, functions are identified by naming convention:

| Prefix | Type | Example |
|--------|------|---------|
| `test_` | Test | `fn test_addition(t: &TestCtx!) { }` |
| `Test` | Test | `fn TestAddition(t: &TestCtx!) { }` |
| `bench_` | Benchmark | `fn bench_sort(b: &BenchCtx!) { }` |
| `Benchmark` | Benchmark | `fn BenchmarkSort(b: &BenchCtx!) { }` |

Test functions can take zero arguments (simple tests) or a `&TestCtx!` parameter (context-based tests with assertions).

---

## Writing Tests

### Simple Tests (Zero-Arg)

```vex
fn test_basic() {
    let x = 2 + 3
    if x != 5 {
        $println("FAIL: expected 5")
    }
}
```

### Context-Based Tests (Recommended)

```vex
import { TestCtx } from "testing/core"

fn test_arithmetic(t: &TestCtx!) {
    t.assert_eq(2 + 3, 5)
    t.assert_eq(10 * 2, 20)
    t.assert_true(100 > 50)
}
```

### TestCtx Assertion API

| Method | Description |
|--------|-------------|
| `t.assert_eq(actual, expected)` | Assert two `i64` values are equal |
| `t.assert_ne(actual, expected)` | Assert two `i64` values are not equal |
| `t.assert_str_eq(actual, expected)` | Assert two strings are equal |
| `t.assert_true(cond)` | Assert condition is true |
| `t.assert_false(cond)` | Assert condition is false |
| `t.assert_gt(actual, expected)` | Assert actual > expected |
| `t.assert_lt(actual, expected)` | Assert actual < expected |
| `t.assert_gte(actual, expected)` | Assert actual >= expected |
| `t.assert_lte(actual, expected)` | Assert actual <= expected |
| `t.err(msg)` | Report failure with message |
| `t.skip(msg)` | Skip test with reason |
| `t.log(msg)` | Log a message |
| `t.skip_if(cond, reason)` | Skip if condition is true |
| `t.failed()` | Check if test has failed |
| `t.passed()` | Check if test has passed |

All `assert_*` methods also have `_msg` variants that accept a custom message:

```vex
t.assert_eq_msg(result, 42, "computation should return 42")
t.assert_str_eq_msg(name, "vex", "name should be 'vex'")
t.assert_true_msg(is_valid, "input must be valid")
```

### Standalone Assertion Functions

For cases where mutable reference propagation isn't available:

```vex
import { eq, ne, ok, gt, lt, gte, lte, ok_msg } from "testing/core"

fn test_standalone(): i32 {
    let! failures = 0
    failures = failures + eq(2 + 2, 4)     // returns 0 on pass, 1 on fail
    failures = failures + ok(true)
    failures = failures + gt(10, 5)
    return failures
}
```

---

## Subtests

Subtests organize related test cases within a parent test. Subtests propagate failures to the parent — if any subtest fails, the parent test fails.

```vex
import { TestCtx } from "testing/core"

fn test_parser(t: &TestCtx!) {
    let! numbers = t.sub("numbers")
    numbers.assert_eq(parse("42"), 42)
    numbers.assert_eq(parse("0"), 0)
    numbers.done(t)

    let! strings = t.sub("strings")
    strings.assert_str_eq(parse_str("hello"), "hello")
    strings.done(t)

    let! edge_cases = t.sub("edge_cases")
    edge_cases.assert_true(parse("") == 0)
    edge_cases.done(t)
}
```

**Output:**

```
  parser.test.vx
       1/1 ✓ test_parser  <1ms
              ✓ numbers
              ✓ strings
              ✓ edge_cases
```

### Subtest API

| Method | Description |
|--------|-------------|
| `t.sub(name)` | Create a child TestCtx with `parent/child` naming |
| `sub.done(t)` | Finalize subtest, emit PASS/FAIL, propagate failure to parent |

The child context inherits all `assert_*` methods from `TestCtx`.

---

## Benchmarks

### Writing Benchmarks

```vex
import { BenchCtx } from "testing/core"

fn BenchmarkSort(b: &BenchCtx!) {
    let! i = 0
    while i < b.n {
        let! arr = [5, 3, 1, 4, 2]
        sort(&arr)
        i = i + 1
    }
}

fn BenchmarkWithThroughput(b: &BenchCtx!) {
    b.set_bytes(1024)  // bytes processed per op → shows MB/s
    let! i = 0
    while i < b.n {
        process_chunk(1024)
        i = i + 1
    }
}
```

### BenchCtx API

| Method | Description |
|--------|-------------|
| `b.n` | Number of iterations (set by calibration) |
| `b.set_bytes(n)` | Set bytes per op for throughput display |
| `b.reset_timer()` | Reset timing (exclude setup) |
| `b.start_timer()` | Resume timing |
| `b.stop_timer()` | Pause timing |

### Running Benchmarks

```bash
# Run all benchmarks in a file
vex test --bench lib/std/rand/tests/bench.test.vx

# Custom duration (default: 1s)
vex test --bench --benchtime 500ms file.test.vx
vex test --bench --benchtime 5s file.test.vx

# Multiple rounds for stability
vex test --bench --count 3 file.test.vx

# Show memory allocations
vex test --bench --benchmem file.test.vx
```

### Benchmark Output

```
═══ BENCHMARKS ═══

BenchmarkSort          5,000,000 iters    1.55 ns/op   645,063,994 ops/s
BenchmarkHash         12,500,000 iters    3.23 ns/op   309,552,856 ops/s
```

With `--benchmem`:

```
BenchmarkSort    5,000,000 iters  1.55 ns/op  645M ops/s     0 B/op  0 allocs/op
BenchmarkVec     1,000,000 iters  42.3 ns/op   23M ops/s   128 B/op  2 allocs/op
```

With `--count 3`:

```
═══ BENCHMARKS ═══

--- Round 1/3 ---
BenchmarkSort    5,000,000 iters    1.14 ns/op
--- Round 2/3 ---
BenchmarkSort    4,878,048 iters    1.41 ns/op
--- Round 3/3 ---
BenchmarkSort    5,263,157 iters    1.17 ns/op
```

### Auto-Calibration

Benchmarks use Go-style auto-calibration:

1. **Calibration run** — executes 100 iterations to estimate cost per op
2. **Calculate optimal N** — targets `--benchtime` duration (default 1s)
3. **Measurement run** — executes with calibrated N for accurate results

Timing uses `vex_monotonic_ns()` (mach_absolute_time on macOS) for nanosecond precision.

---

## CLI Flags

```
vex test [OPTIONS] [PATTERN]
```

### Core Flags

| Flag | Default | Description |
|------|---------|-------------|
| `[PATTERN]` | all tests | File or directory pattern |
| `-v, --verbose` | off | Verbose output |
| `--run &lt;REGEX&gt;` | — | Filter tests by name |
| `--no-parallel` | off | Disable parallel execution |
| `--timeout &lt;SEC&gt;` | 30 | Per-test timeout in seconds |

### Benchmark Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--bench` | off | Run benchmarks only (skip tests) |
| `--benchtime &lt;DUR&gt;` | `1s` | Target duration (`500ms`, `5s`, etc.) |
| `--count &lt;N&gt;` | 1 | Repeat benchmarks N times |
| `--benchmem` | off | Show `B/op` and `allocs/op` |

### Behavior Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--failfast` | off | Stop on first test failure |
| `--short` | off | Skip tests with `_slow` suffix |
| `--json` | off | Structured JSON output |

### Coverage Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--coverage` | off | Generate coverage report |
| `--coverprofile &lt;FILE&gt;` | — | Coverage output file |
| `--covermode &lt;MODE&gt;` | `set` | Mode: `set`, `count`, or `atomic` |

---

## JSON Output

Use `--json` for CI/CD integration. JSON is printed to stdout:

```json
{
  "passed": 3,
  "failed": 0,
  "total": 3,
  "elapsed_ms": 269,
  "files": 1,
  "results": [
    {
      "name": "test_addition",
      "file": "examples/coverage_example.test.vx",
      "status": "pass",
      "duration_ms": 0.03
    }
  ]
}
```

Status values: `pass`, `fail`, `timeout`, `compile_error`, `runtime_error`.

---

## Output Format

### Default Output

```
vex test · 24 tests · 5 files

  lib/std/rand/tests/rand.test.vx
       1/24 ✓ test_seed          <1ms
       2/24 ✓ test_next_range    <1ms
  lib/std/math/tests/math.test.vx
       3/24 ✗ test_sqrt          <1ms
              assertion failed: test_sqrt
                expected: 3
                actual:   4

  ──────────────────────────────────────────────
  FAIL  23 passed  1 failed  1.23s  5 files
  ──────────────────────────────────────────────
```

### With Subtests

```
  parser.test.vx
       1/2 ✓ test_parser  <1ms
              ✓ numbers
              ✓ strings
              ✓ edge_cases
       2/2 ✗ test_edge  <1ms
              ✓ empty_input
              ✗ overflow
```

### Slowest Tests

When all tests pass, tests slower than 100ms are shown:

```
  Slowest:
    test_large_file  342ms
    test_compilation  201ms
```

---

## Parallel Execution

By default, test files run in parallel using a thread pool (size = CPU cores). Each **file** runs in its own thread; tests within a file run sequentially.

Parallel execution is automatically disabled when:
- `--no-parallel` is set
- `--failfast` is set (requires sequential ordering)
- Only one test file is found

---

## Short Mode

`--short` skips test functions whose names end with `_slow` or `_Slow`:

```vex
fn test_quick() { }        // Always runs
fn test_parser_slow() { }  // Skipped with --short
```

```
$ vex test --short
  (skipping 2 slow tests)
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VEX_TEST_DEBUG=1` | Show generated runner code and stderr |

---

## File Structure

```
project/
├── lib/
│   └── mylib/
│       ├── src/
│       │   └── lib.vx
│       └── tests/
│           ├── unit.test.vx
│           ├── integration.test.vx
│           └── bench.test.vx
└── examples/
    └── feature.test.vx
```

Tests are placed alongside source code. The runner automatically imports `testing/core` when `TestCtx` or `BenchCtx` are used.

---

## Comparison with Go / Rust

| Feature | Go | Rust | Vex |
|---------|:---:|:---:|:---:|
| Test discovery | ✅ | ✅ | ✅ |
| Parallel execution | ✅ | ✅ | ✅ |
| Per-test timing | ✅ | ✅ | ✅ |
| Subtests | ✅ `t.Run()` | ✅ | ✅ `t.sub()` |
| Benchmark calibration | ✅ `b.N` | ✅ criterion | ✅ `b.n` |
| `--benchtime` | ✅ | ✅ | ✅ |
| `--benchmem` | ✅ | — | ✅ |
| `--count N` | ✅ | — | ✅ |
| `--failfast` | ✅ | ✅ | ✅ |
| `--json` | ✅ | ✅ | ✅ |
| `--short` | ✅ | — | ✅ |
| Coverage | ✅ | ✅ | ✅ |
| Colors | ❌ | 3rd party | ✅ built-in |
| Progress counter | ❌ | ❌ | ✅ `[3/24]` |

---

## Related References

- [vex-cli Reference](./vex-cli-reference.md)
- [TestCtx source](file:///lib/std/testing/src/core.vx)
