# Benchmarks

Use the compiler-owned benchmark runner instead of a hand-written timer:

```vex
import { BenchCtx } from "testing";

fn bench_hash(b: &BenchCtx!) {
    let! input = makeInput();
    b.setBytes(input.len() as i64);
    b.iterMut(&input!, |data: &Input!| hash(data));
}
```

```bash
vex test --bench -O3 --benchtime 1s --count 5 --benchmem tests/bench.test.vx
```

Independent benchmark files compile in a bounded parallel pool. Their binaries
then execute serially so concurrent workloads cannot contaminate timing. A
selected file is compiled once; `--count 5` reuses that exact artifact for all
five measurement rounds.

`BenchCtx.iter` centralizes adaptive clock batching, compiler barriers and an
isolated child allocation region. Temporary allocations are reclaimed every
128 operations, and the caller's prior region and arena mode are restored.
`iterMut` evolves caller-owned state; `iterString`
consumes owned string results exactly once. Use `blackBox` in manual `b.n`
loops. Timer control uses `resetTimer`, `startTimer` and `stopTimer`; resumed
intervals accumulate.

Do not benchmark a loop whose complete result is a compile-time constant. LLVM
may legally replace it with the closed-form result. Seed work from runtime
state and keep the result observable through `iter`, `iterMut` or `blackBox`.

For reproducible comparisons record the Vex revision, target CPU/GPU, input
distribution, optimization level, benchmark duration, iteration count, median
and spread. Compare equivalent algorithms and observable outputs—never source
size, estimates or one fastest sample as a substitute for measurements.
