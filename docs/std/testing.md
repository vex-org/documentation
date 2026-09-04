# testing

`testing` provides the contexts and assertions used by `vex test`. Discovery,
isolation, timeouts, parallel files and benchmark reporting belong to the CLI;
there is no library-side runner to call manually.

```vex
import { TestCtx } from "testing";

fn test_addition(t: &TestCtx!) {
    t.assertEq(2 + 2, 4);
    t.assertTrue(4 > 0);
    t.assertStrEq("vex", "vex");
}
```

Test files use `.test.vx` or `_test.vx`. Functions beginning with `test_` or
`Test` are tests; functions beginning with `bench_` or `Benchmark` are
benchmarks. Do not define `main` in a discovered test file—the generated runner
owns it and rejects a custom main to prevent false-green suites.

## TestCtx

| API | Meaning |
| --- | --- |
| `err(message)` | Mark the test failed |
| `skip(reason)` / `skipIf(...)` | Mark the test skipped |
| `failed()` / `skipped()` / `passed()` | Observe sealed outcome state |
| `assertEq`, `assertNe` | `i64` equality checks |
| `assertStrEq` | Owned/borrowed string equality check |
| `assertTrue`, `assertFalse` | Boolean checks |
| `assertGt`, `assertLt`, `assertGte`, `assertLte` | `i64` ordering checks |
| `assertApproxEq` | `f64` absolute tolerance check; NaN/negative epsilon fail |
| `run(name, child)` | Run a synchronous named child and propagate failure |

Message-bearing variants are `assertEqMsg`, `assertStrEqMsg` and
`assertTrueMsg`. Standalone status helpers `eq`, `ne`, `ok`, `okMsg`, `gt`,
`lt`, `gte`, and `lte` return `0` on success and `1` on failure.

## BenchCtx

```vex
import { BenchCtx } from "testing";

fn bench_parse(b: &BenchCtx!) {
    b.setBytes(8);
    b.iter(12345678 as i64, |value: i64| parseValue(value));
}
```

`iter` supplies a compiler barrier and bounded temporary-arena reclamation.
Use `iterMut` for evolving caller-owned state and `iterString` for owned string
results. `resetTimer`, `startTimer`, and `stopTimer` exclude setup; repeated
start/stop intervals accumulate. `blackBox(value)` is available when a manual
`b.n` loop is necessary.

Independent benchmark files compile in a bounded parallel pool, then execute
serially to preserve measurement isolation. The runner artifact is reused for
every requested `--count` round.

```bash
vex test lib/my_package/tests
vex test --run parser lib/my_package/tests
vex test --bench -O3 --benchtime 1s --benchmem lib/my_package/tests
```
