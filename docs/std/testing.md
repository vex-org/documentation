# testing — Test Framework

The current testing surface is built around exported testing helpers plus context objects such as `TestCtx` and `BenchCtx`.

## Test Files

Test files typically use the `.test.vx` suffix and export test functions.

```vex
import { assert } from "testing";

export fn test_addition(t: &TestCtx!) {
    assert(2 + 2 == 4, "2 + 2 should equal 4");
}
```

## Benchmark Shape

```vex
export fn bench_sort(b: &BenchCtx!) {
    // benchmark body here
}
```

## Notes

- The current repository surface is **not** `test fn` / `bench fn` syntax.
- Prefer the exported context-based API from `std/testing`.
- Use `vex test <path>` for test files and `./test_all.sh` for the wider example sweep.
