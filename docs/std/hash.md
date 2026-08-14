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
import { Fnv1a, SipHasher } from "hash";

let! stable = Fnv1a.new();
stable.update("header");
stable.update(payload);
let stableDigest = stable.finish();

let! keyed = SipHasher.new(secret0, secret1);
keyed.update("header");
keyed.update(payload);
let keyedDigest = keyed.finish();
```

Chunks may be strings or byte spans and may split at any byte. FNV-1a and
SipHash keep bounded state. XXH3 intentionally has no incremental API until a
bounded upstream-compatible state machine is provided.

## Compatibility and guarantees

- `WyHash` matches final4 / 4.3.
- `XxHash3` matches upstream XXH3 64-bit 0.8.x, seeded and unseeded.
- `SipHash` implements SipHash-2-4.
- `Crc32c` implements CRC-32C Castagnoli and uses hardware only when the target
  proves the required CPU feature.
- One-shot methods allocate no memory.
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
