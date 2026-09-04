# Hashing

The `hash` package provides allocation-free hashing over `str` and
`Span<u8>`. Its public surface is grouped by algorithm and does not expose raw
pointer-plus-length functions.

## Choose an algorithm

| API | Best fit | Security boundary |
| --- | --- | --- |
| `XxHash3` | general-purpose fast 64-bit hashing | not collision-resistant |
| `WyHash` | compact seeded hashing and short keys | not collision-resistant |
| `Fnv1a` | stable identifiers and format compatibility | do not use for adversarial keys |
| `SipHash` | untrusted hash-table keys | requires a secret random 128-bit key |
| `Crc32c` | accidental-corruption checks | not protection against attackers |

Use `std/crypto` when you need a cryptographic digest, MAC, password hash or
signature.

## One-shot API

```vex
import { Crc32c, Fnv1a, SipHash, WyHash, XxHash3 } from "hash";

let general = XxHash3.hash("hello");
let seeded = WyHash.hash("hello", 42 as u64);
let stable64 = Fnv1a.hash("hello");
let stable32 = Fnv1a.hash32("hello");
let keyed = SipHash.hash("hello", secret0, secret1);
let crc = Crc32c.checksum("hello");
```

Each method above also accepts a borrowed `Span<u8>`. Seeded overloads exist
for `WyHash` and `XxHash3`.

## Incremental API

```vex
import { Crc32c, Fnv1a, SipHasher, XxHash3 } from "hash";

let! stable = Fnv1a.new();
stable.update("header");
stable.update(payload);
let stableDigest = stable.finish();

let! keyed = SipHasher.new(secret0, secret1);
keyed.update("header");
keyed.update(payload);
let keyedDigest = keyed.finish();

let! fast = XxHash3.new();
fast.update("header");
fast.update(payload);
let fastDigest = fast.finish();

let! crc = Crc32c.new();
crc.update("header");
crc.update(payload);
let checksum = crc.finish();
```

Chunks may be strings or byte spans and may split at any byte. Every hasher
keeps bounded state. `XxHash3.new(seed)` selects the seeded form; its state is
eight accumulator lanes plus a fixed 256-byte tail and never grows with the
input. `finish()` is non-mutating and `reset()` preserves the constructor seed.
`Crc32c.reset()` restores its initial Castagnoli state. CRC-32C processes safe
little-endian 64-bit chunks through the compiler intrinsic, then its byte tail;
the compiler selects hardware only when the target proves it legal.

## Compatibility and guarantees

- `WyHash` matches final4 / 4.3.
- `XxHash3` matches upstream XXH3 64-bit 0.8.x, seeded and unseeded.
- XXH3 long inputs use target-independent fixed-vector operations. CPU
  backends select their legal SIMD instructions; applications do not choose an
  architecture implementation or link a native hash library.
- `SipHash` implements SipHash-2-4.
- `Crc32c` implements CRC-32C Castagnoli and uses hardware only when the target
  proves the required CPU feature.
- One-shot and incremental methods allocate no memory.
- There is no fixed-key SipHash helper: a public key would defeat collision-DoS
  protection.

Legacy snake-case free functions and raw pointer overloads were removed. Use
the grouped APIs shown above.

## Built-in collections

The named algorithms remain separate from built-in table policy. Values
implement `Hash.hashInto<H: Hasher>` and feed the state owned by each `Map` or
`Set`; they do not return a pre-finalized hash. Hosted `Map.new` obtains a fresh
128-bit key through the target entropy capability, and deterministic tools can
select `DeterministicState` explicitly.

The portable default currently uses SipHash-1-3, while the public
`std/hash.SipHash` API remains stable SipHash-2-4. The table algorithm and its
output may evolve and are not serialization formats. Freestanding targets do
not gain a hidden libc dependency: entropy enters only through the explicit
target runtime boundary.
