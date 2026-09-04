# rand — explicit, fast random streams

`rand` provides independently owned `Rng` values based on xoshiro256**. It is
intended for simulation, randomized algorithms, games, sampling and tests. It
has no hidden global generator.

`Rng4` is the explicit parallel companion: four canonical jump-separated
streams evaluated with Vex fixed-array SIMD operators. Scalar `Rng` ordering is
never silently changed for throughput.

```vex
import { Rng } from "rand"

let! replayable = Rng.withSeed(42)
let! independentlySeeded = Rng.init()

let word = replayable.nextU64()
let ratio = replayable.nextFloat()        // [0.0, 1.0)
let index = replayable.nextRange(0, 100)  // [0, 100)
```

`Rng.init()` seeds from the target's fail-closed `Crypto.secureRand()`
capability. xoshiro output remains non-cryptographic: use the crypto API itself
for keys, tokens, nonces and secrets.

## Core API

| API | Result |
|---|---|
| `nextU64`, `nextI64`, `nextU32`, `nextI32` | full-width integer output |
| `nextFloat`, `nextFloat32` | uniform semi-open floating output |
| `nextBelow(upper)` | unbiased `u64` in `[0, upper)` |
| `nextRange`, `nextRangeU64`, `nextRangeF` | uniform semi-open ranges; `nextRangeF` rejects non-finite bounds deterministically |
| `choose`, `chooseSpan` | borrowed selection without cloning |
| `shuffle`, `unsafe shuffleSpan` | ownership-neutral Fisher–Yates shuffle |
| `fillBytes(&Vec<u8>!)` | safe deterministic pseudorandom fill |
| `unsafe fillBytes(&Span<u8>!)` | raw-backed fill with caller-proven exclusivity |
| `jump`, `longJump` | advance by `2^128` or `2^192` transitions |
| `fork` | return the current stream and jump the parent |
| `Rng4.withSeed`, `Rng4.init` | create four streams separated by canonical `2^128` jumps |
| `Rng4.nextU64x4` | four independent full-width outputs as `[u64; 4]` |
| `Rng4.nextFloatx4` | four independent values in `[0, 1)` |
| `Rng4.fillBytes` | deterministic lane-interleaved 32-byte batches |

Bounded integers use Lemire multiply-high sampling with a rejection threshold,
so arbitrary bounds are unbiased without division on the ordinary accepted
path. Signed range width is calculated in unsigned space and therefore handles
almost the complete `i64` domain without overflow.

## Reusable distributions

```vex
import { Normal, Rng, WeightedIndex } from "rand"

let! rng = Rng.withSeed(42)
let! normal = match Normal.new(10.0, 2.0) {
    Result.Ok(value) => value,
    Result.Err(err) => $panic(err.message()),
}
let value = normal.sample(&rng!)
```

| Type | Constructor contract | Sample behavior |
|---|---|---|
| `Bernoulli` | finite probability in `[0, 1]` | O(1); exact edges consume no RNG state |
| `Normal` | finite mean, finite non-negative deviation | cached Box–Muller pair, zero allocation |
| `Exponential` | positive finite rate | stable `log1p` transform, zero allocation |
| `WeightedIndex` | finite non-negative weights, positive finite total | owned cumulative table, O(log n), zero allocation |

All constructors return `Result<..., DistributionError>` and validate before a
reusable distribution becomes observable.

## Parallel streams

Give every worker its own `Rng`. Use `longJump()` to partition top-level jobs
and `jump()` or `fork()` to partition worker streams. These operations neither
allocate nor synchronize.

When one hot loop consumes four independent values together, `Rng4` keeps the
stream contract explicit and lets the backend legalize one fixed-array dataflow:

```vex
import { Rng4 } from "rand"

let! streams = Rng4.withSeed(42)
let words = streams.nextU64x4()
let ratios = streams.nextFloatx4()
```

Lane zero is the ordinary seeded stream. Lanes one, two and three begin one,
two and three `jump()` intervals later. Construction pays the partitioning cost
once; steady-state calls have no allocation, lock, global state, FFI, or
architecture-specific source. A partial `Rng4.fillBytes` step consumes one
output from every lane, making state advancement deterministic.

## Measured baseline

Apple M2 Max, release `-O3`, 2026-08-25, median of five 250 ms rounds:

| Operation | Median | Allocation |
|---|---:|---:|
| `nextU64` | 3.13 ns | 0 |
| `Rng4.nextU64x4` | 4.55 ns / 1.14 ns per output | 0 |
| `Rng4.nextFloatx4` | 4.84 ns / 1.21 ns per output | 0 |
| dynamic `nextBelow` | 3.25 ns | 0 |
| 1 KiB `fillBytes` | 170.22 ns / 5.60 GB/s | 0 |
| 1 KiB `Rng4.fillBytes` | 118.49 ns / 8.05 GB/s | 0 |
| Bernoulli | 3.21 ns | 0 |
| cached-pair Normal | 10.37 ns | 0 |
| Exponential | 9.29 ns | 0 |
| eight-entry `WeightedIndex` | 5.40 ns | 0 |

These values are target-specific evidence, not portable latency guarantees.
On this Apple target, `Rng4` produced about 2.75 times the scalar integer output
throughput. NEON lacks packed `u64` multiply, so the backend retains vector
XOR/shift/rotate/load/store work and distributes the star-star multiply across
scalar ALUs. Wider targets may legalize the same source differently.

## Verification

```bash
vex lint lib/std/rand --deny-warnings
vex test lib/std/rand/tests/basic.test.vx
vex test -O3 lib/std/rand/tests/basic.test.vx
vex test -O3 --bench --benchmem lib/std/rand/tests/bench.test.vx
```
