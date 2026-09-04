# Testing and benchmarking

Vex compiles each discovered test file with a generated runner. This gives
tests the same ownership, contracts, SIMD, async and target semantics as normal
programs while retaining process isolation and bounded execution.

## Tests

```vex
import { TestCtx } from "testing";

fn test_decode(t: &TestCtx!) {
    t.run("valid", |child: &TestCtx!| {
        child.assertTrue(decode("42").isOk());
    });
    t.run("invalid", |child: &TestCtx!| {
        child.assertTrue(decode("?").isErr());
    });
}
```

Context tests return unit and report through `TestCtx`. Zero-argument tests may
return `bool` (`true` passes) or an integer status (`0` passes). A zero-argument
unit test can fail only by panic/abort, so use `TestCtx` for assertions.

Discovery reads parsed function declarations rather than source lines. Test
and benchmark names, `async`, context parameters and return types therefore
retain the same meaning when a legal signature spans multiple lines. Receiver
methods are not free test entrypoints.

Skipped contexts are reported as SKIP, not PASS. Test state is private and
cannot be overwritten by the test body. A test file containing discovered test
functions must not define `main`.

## Benchmarks

```vex
import { BenchCtx } from "testing";

fn bench_lookup(b: &BenchCtx!) {
    b.setBytes(4096);
    b.iter(17 as i64, |key: i64| table.lookup(key));
}
```

The duration-based `iter` family is preferred. Inputs and results cross a
compiler barrier, clock checks are adaptively batched, and temporary arena
allocations live in an isolated child region reclaimed every 128 operations.
The runner restores the caller's previous region and arena mode before
returning. For explicit setup:

```vex
fn bench_manual(b: &BenchCtx!) {
    let data = prepare();
    b.resetTimer();
    for let i in 0..b.n {
        blackBox(run(data, i));
    }
    b.stopTimer();
}
```

Run performance measurements with optimization enabled:

```bash
vex test --bench -O3 --benchtime 1s --count 5 --benchmem path/to/tests
```

Benchmark files compile concurrently within a bounded worker pool, but run
serially for isolation. `--count` repeats execution of the same compiled
artifacts; it does not rebuild and relink every round.

Report the compiler revision, target, input distribution, optimization level,
iteration count and sample spread. Do not compare fastest outliers across
different workloads.

## Useful commands

```bash
vex test path/to/tests
vex test --run expression path/to/tests
vex test --no-parallel --timeout 60 path/to/tests
vex test --failfast path/to/tests
vex test --json path/to/tests
vex test --coverage --coverprofile coverage.lcov path/to/tests
vex test --analyze-comptime path/to/tests
```

`--analyze-comptime` is observation-only; it does not change semantics or
enable speculative rewrites.
