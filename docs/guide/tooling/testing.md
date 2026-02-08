# Testing

Vex provides a built-in test runner with a Go-style testing library. Test files use the `.test.vx` extension and are automatically discovered.

## Quick Start

```bash
# Run tests in current directory
vex test

# Run specific test file
vex test tests/math.test.vx

# Run with verbose output
vex test -v

# Filter tests by name
vex test --run "user"

# Run benchmarks
vex test --bench

# Disable parallel execution
vex test --no-parallel

# Set custom timeout (seconds)
vex test --timeout 60
```

## Writing Tests

### Test File Convention

Test files must have the `.test.vx` extension:

```
src/
├── math.vx
└── math.test.vx     # Tests for math module
tests/
└── integration.test.vx
```

### Basic Test Structure

```vex
import { eq, ok, gt } from "testing/core"

// Test functions must start with "test_" and return i32
// Return 0 for pass, non-zero for fail
fn test_addition(): i32 {
    return eq(2 + 2, 4)
}

fn test_string_length(): i32 {
    let s = "hello"
    return eq(s.len(), 5)
}

fn test_comparison(): i32 {
    return gt(10, 5)  // 10 > 5
}
```

### Available Assertions

```vex
import { eq, ne, ok, ok_msg, gt, lt, gte, lte } from "testing/core"

fn test_all_assertions(): i32 {
    // Equality
    if eq(2 + 2, 4) != 0 { return 1 }      // expected == actual
    if ne(2 + 2, 5) != 0 { return 1 }      // expected != actual
    
    // Boolean
    if ok(true) != 0 { return 1 }           // condition is true
    if ok_msg(1 > 0, "1 should be > 0") != 0 { return 1 }
    
    // Comparisons
    if gt(10, 5) != 0 { return 1 }          // 10 > 5
    if lt(5, 10) != 0 { return 1 }          // 5 < 10
    if gte(10, 10) != 0 { return 1 }        // 10 >= 10
    if lte(5, 10) != 0 { return 1 }         // 5 <= 10
    
    return 0
}
```

### Failure Messages

When an assertion fails, it prints a descriptive message:

```
FAIL: eq(3, 5) - expected 5, got 3
FAIL: gt(2, 5) - expected 2 > 5
FAIL: custom error message
```

## TestCtx (Advanced)

For more complex tests, use `TestCtx` with method-based assertions:

```vex
import { TestCtx } from "testing/core"

fn test_with_context(t: &TestCtx!): i32 {
    t.assert_eq(2 + 2, 4)
    t.assert_str_eq("hello", "hello")
    t.assert_true(1 < 2)
    
    if t.failed() {
        return 1
    }
    return 0
}
```

### TestCtx Methods

| Method | Description |
|--------|-------------|
| `assert_eq(actual, expected)` | Assert i64 values equal |
| `assert_ne(actual, expected)` | Assert i64 values not equal |
| `assert_str_eq(actual, expected)` | Assert strings equal |
| `assert_true(cond)` | Assert condition is true |
| `assert_false(cond)` | Assert condition is false |
| `assert_gt(actual, expected)` | Assert actual > expected |
| `assert_lt(actual, expected)` | Assert actual < expected |
| `assert_gte(actual, expected)` | Assert actual >= expected |
| `assert_lte(actual, expected)` | Assert actual <= expected |
| `err(msg)` | Mark test as failed with message |
| `skip(msg)` | Skip test with reason |
| `log(msg)` | Log a message |

## Benchmarks

### Running Benchmarks

```bash
vex test --bench
```

### Writing Benchmarks

Benchmark functions start with `bench_`:

```vex
import { BenchCtx } from "testing/core"

fn bench_array_sum(b: &BenchCtx!): i32 {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    b.reset_timer()
    
    for i in 0..b.n {
        let! sum = 0
        for x in arr {
            sum = sum + x
        }
    }
    
    b.stop_timer()
    return 0
}
```

### BenchCtx Methods

| Method | Description |
|--------|-------------|
| `reset_timer()` | Reset elapsed time to 0 |
| `start_timer()` | Start timing |
| `stop_timer()` | Stop timing |
| `set_bytes(n)` | Set bytes processed per op |
| `ns_per_op()` | Get nanoseconds per operation |
| `ops_per_sec()` | Get operations per second |

## Test Organization

### Multiple Tests in One File

```vex
import { eq, ok } from "testing/core"

// Helper function (not a test)
fn add(a: i32, b: i32): i32 {
    return a + b
}

fn test_add_positive(): i32 {
    return eq(add(2, 3), 5)
}

fn test_add_negative(): i32 {
    return eq(add(-1, 1), 0)
}

fn test_add_zero(): i32 {
    return eq(add(0, 0), 0)
}
```

### Setup and Cleanup with Defer

```vex
import { eq } from "testing/core"

fn test_with_cleanup(): i32 {
    let path = "/tmp/test_file.txt"
    defer { remove_file(path) }  // Always runs
    
    write_file(path, "test data")
    let content = read_file(path)
    
    return eq(content, "test data")
}
```

### Skip Tests Conditionally

```vex
import { TestCtx } from "testing/core"

fn test_platform_specific(t: &TestCtx!): i32 {
    t.skip_if($os() != "linux", "Linux only test")
    
    // Test logic here...
    return 0
}
```

## Test Output

### Standard Output

```
$ vex test

Running 3 test(s)...

  ✓ test_addition
  ✓ test_subtraction  
  ✗ test_multiplication
    FAIL: eq(6, 8) - expected 8, got 6

FAIL
  2 passed, 1 failed in 45.23ms
```

### Verbose Output

```bash
$ vex test -v

=== Found 3 test file(s) ===
  tests/math.test.vx
  tests/string.test.vx
  tests/array.test.vx

=== tests/math.test.vx ===
  ✓ test_addition
  ✓ test_subtraction
  ✗ test_multiplication
    FAIL: eq(6, 8) - expected 8, got 6

FAIL
  2 passed, 1 failed in 45.23ms
```

### CLI Options

| Option | Description |
|--------|-------------|
| `-v, --verbose` | Show detailed output |
| `--run <REGEX>` | Filter tests by name |
| `--no-parallel` | Disable parallel execution |
| `--timeout <SECS>` | Custom timeout per test |
| `--bench` | Run benchmarks |
| `--benchtime <DUR>` | Benchmark duration (e.g., `3s`) |
| `--coverage` | Generate LLVM coverage report |
| `--coverprofile <FILE>` | Output coverage to file (default: `coverage.txt`) |

## Code Coverage

Vex uses LLVM's built-in instrumentation for accurate code coverage measurement.

### Basic Usage

```bash
$ vex test --coverage

📊 Coverage enabled (LLVM instrumentation)
Running 5 test(s)...

  ✓ test_addition
  ✓ test_subtraction
  ✓ test_multiplication

📊 Generating coverage report...

Filename                      Regions    Missed   Cover   Functions  Missed   Cover
-------------------------------------------------------
src/math.vx                        15         2   86.67%          5       0  100.00%
src/string.vx                      22         8   63.64%          7       2   71.43%
-------------------------------------------------------
TOTAL                              37        10   72.97%         12       2   83.33%

✓ Coverage report: coverage.txt
✓ LCOV format: /tmp/vex_coverage/coverage.lcov
✓ HTML report: /tmp/vex_coverage/html/index.html

PASS
  3 passed in 1.23s
```

### Custom Output

```bash
# Save to specific file
$ vex test --coverage --coverprofile my_coverage.lcov

# View HTML report (macOS)
$ open /tmp/vex_coverage/html/index.html
```

### Integration with CI

```yaml
# GitHub Actions example
- name: Run tests with coverage
  run: vex test --coverage --coverprofile coverage.lcov

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    file: coverage.lcov
```

### How It Works

1. **Compile**: Tests are compiled with LLVM profile instrumentation (`-fprofile-instr-generate`)
2. **Run**: Executed binaries generate `.profraw` files
3. **Merge**: `llvm-profdata` merges raw profiles
4. **Report**: `llvm-cov` generates human-readable and LCOV reports

### Requirements

- LLVM tools (`llvm-profdata`, `llvm-cov`)
- Install via Homebrew: `brew install llvm`

## Best Practices

### 1. One Assertion Per Test (When Possible)

```vex
// Good: Focused tests
fn test_user_name(): i32 {
    let user = User.new("Alice")
    return eq(user.name, "Alice")
}

fn test_user_default_active(): i32 {
    let user = User.new("Alice")
    return ok(user.is_active)
}
```

### 2. Descriptive Names

```vex
// Good
fn test_empty_string_returns_zero_length(): i32 { ... }
fn test_negative_index_returns_none(): i32 { ... }

// Avoid
fn test1(): i32 { ... }
fn test_string(): i32 { ... }
```

### 3. Arrange-Act-Assert

```vex
fn test_user_activation(): i32 {
    // Arrange
    let! user = User.new("Alice")
    user.deactivate()
    
    // Act
    user.activate()
    
    // Assert
    return ok(user.is_active)
}
```

### 4. Use Helpers for Complex Setup

```vex
fn create_test_user(): User {
    return User {
        id: 1,
        name: "Test User",
        email: "test@example.com"
    }
}

fn test_user_email(): i32 {
    let user = create_test_user()
    return eq(user.email, "test@example.com")
}
```

## Roadmap

The following features are planned for future releases:

### Subtests (Planned)

```vex
// TODO: Not yet implemented
fn test_math(t: &TestCtx): i32 {
    t.run("addition", fn() {
        eq(2 + 2, 4)
    })
    
    t.run("subtraction", fn() {
        eq(5 - 3, 2)
    })
    
    return t.result()
}
```

### Table-Driven Tests (Planned)

```vex
// TODO: Not yet implemented
fn test_add_cases(t: &TestCtx): i32 {
    let cases = [
        { a: 1, b: 2, want: 3 },
        { a: 0, b: 0, want: 0 },
        { a: -1, b: 1, want: 0 },
    ]
    
    for case in cases {
        t.run(#stringify(case), fn() {
            eq(add(case.a, case.b), case.want)
        })
    }
    return t.result()
}
```

### Fuzzing (Planned)

```bash
# TODO: Not yet implemented
vex test --fuzz FuzzParseJSON --fuzztime 30s
```

```vex
// TODO: Not yet implemented
fn FuzzParseJSON(f: &FuzzCtx): i32 {
    f.add_corpus("[]")
    f.add_corpus("{}")
    
    f.fuzz(fn(data: &[u8]) {
        let _ = parse_json(data)  // Should not panic
    })
    
    return 0
}
```

### Source-Level Coverage (Planned)

Current coverage tracks function execution. Future versions will support line-by-line coverage:

```bash
# TODO: Currently function-level only
vex test --coverage

# Planned output:
#   src/math.vx
#     Line 10: ✓ covered (5 hits)
#     Line 11: ✓ covered (5 hits)  
#     Line 12: ✗ not covered
#     Line 13: ✓ covered (3 hits)
```

### Feature Comparison

| Feature | Go | Rust | Vex |
|---------|:---:|:----:|:---:|
| Test Discovery | ✅ | ✅ | ✅ |
| Filtering | ✅ | ✅ | ✅ |
| Parallel Exec | ✅ | ✅ | ✅ |
| Benchmarks | ✅ | ⚠️ | ✅ |
| Coverage | ✅ | ⚠️ | ✅ |
| Subtests | ✅ | ❌ | 🔜 |
| Table Tests | ✅ | ⚠️ | 🔜 |
| Fuzzing | ✅ | ⚠️ | 🔜 |
| Line Coverage | ✅ | ✅ | 🔜 |

Legend: ✅ Native | ⚠️ External/Nightly | 🔜 Planned | ❌ Not Available

## Next Steps

- [Debugging](/guide/tooling/debugging) - Debug your code
- [Documentation](/guide/tooling/docs) - Document your code
- [CI/CD](/guide/tooling/ci) - Continuous integration
