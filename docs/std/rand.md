# rand — Random Number Generation

Fast, high-quality pseudo-random number generation using the **Xoshiro256++** algorithm.

## Usage

```rust
import { Rng } from "rand";

// Auto-seeded (from system entropy)
let! rng = Rng.init();

// Deterministic (reproducible)
let! rng = Rng.withSeed(42);

// Generate values
let u = rng.nextU64();              // Random u64
let i = rng.nextI64();              // Random i64
let f = rng.nextF64();              // Random f64 in [0.0, 1.0)
let n = rng.nextInRange(1, 100);    // Random in [1, 100]
let b = rng.nextBool();             // Random bool
```

## Xoshiro256++ Algorithm

| Property | Value |
|----------|-------|
| State size | 256 bits (4 × u64) |
| Period | 2²⁵⁶ - 1 |
| Speed | ~1 ns per u64 |
| Quality | Passes BigCrush, PractRand |

Significantly faster than Mersenne Twister with better statistical properties.
