# Crypto Namespace

The `Crypto` namespace provides portable semantic cryptographic micro-helpers.
The compiler selects a target instruction only when the target capability is
proven; otherwise it emits the constant-flow portable lowering.

> **No import needed.** `Crypto.*` is a builtin namespace available everywhere.

> **These are building blocks, not full algorithms.** For complete crypto implementations (AES-256-GCM, SHA-256, ChaCha20, etc.), see the [`crypto` standard library package](/std/crypto/).

## Fixed-block contract

```vex
let state: [u8; 16] = [0; 16]
let key: [u8; 16] = getRoundKey()
let encrypted = Crypto.aesEncRound(state, key)
```

AES round operations currently accept exactly one `[u8;16]` state and one
`[u8;16]` round key. They do not implicitly map over slices, tensors,
`[u8;64]`, or nested arrays. Multi-block algorithms expose parallelism by
scheduling multiple exact block operations; aggregate AES-round types require a
separate semantic contract and are not inferred from storage shape.

## Quick Example

```vex
// CRC-32C checksum of a byte array
fn crc32(data: &[u8], len: usize): u32 {
    let! crc: u32 = 0xFFFFFFFF;
    let! i: usize = 0;
    while i < len {
        crc = Crypto.crc32c(crc, data[i]);
        i = i + 1;
    }
    return crc ^ 0xFFFFFFFF;
}
```

## AES Round Operations

Single AES round instructions — the core building block of AES-128/192/256.

| Function                         | Signature                      | Description                                     |
| -------------------------------- | ------------------------------ | ----------------------------------------------- |
| `Crypto.aesEncRound(state, key)` | `([u8;16], [u8;16]) → [u8;16]` | SubBytes → ShiftRows → MixColumns → AddRoundKey |
| `Crypto.aesDecRound(state, key)` | `([u8;16], [u8;16]) → [u8;16]` | Inverse AES round                               |
| `Crypto.aesEncLast(state, key)`  | `([u8;16], [u8;16]) → [u8;16]` | Final round (no MixColumns)                     |
| `Crypto.aesDecLast(state, key)`  | `([u8;16], [u8;16]) → [u8;16]` | Final inverse round                             |

### Platform Mapping

| Vex Function  | x86 (AES-NI)       | ARM (Crypto Ext.)           |
| ------------- | ------------------ | --------------------------- |
| `aesEncRound` | `AESENC` (1 cycle) | `AESE` + `AESMC` (2 cycles) |
| `aesDecRound` | `AESDEC`           | `AESD` + `AESIMC`           |
| `aesEncLast`  | `AESENCLAST`       | `AESE`                      |
| `aesDecLast`  | `AESDECLAST`       | `AESD`                      |

The exact lowering is target-dependent. Inspect emitted assembly and benchmark
the complete construction; instruction latency alone is not an algorithm-level
performance guarantee.

### Usage: AES-256 Encrypt Block

```vex
fn aes256EncryptHW(block: [u8;16], roundKeys: &[[u8;16]; 15]): [u8;16] {
    // XOR initial round key
    let! state = xorBlocks(block, roundKeys[0]);

    // Rounds 1-13
    let! r = 1;
    while r <= 13 {
        state = Crypto.aesEncRound(state, roundKeys[r]);
        r = r + 1;
    }

    // Final round (no MixColumns)
    state = Crypto.aesEncLast(state, roundKeys[14]);
    return state;
}
```

## SHA-256 Hardware Acceleration

These operations have target-independent SHA-256 semantics. The compiler selects
native instructions when the exact target proves them and otherwise emits the
portable fixed-flow implementation.

| Function | Signature | Description |
| --- | --- | --- |
| `Crypto.sha256Rounds4(abcd, efgh, wk)` | `([u32;4], [u32;4], [u32;4]) → [u32;8]` | Four rounds; returns the complete `A..H` state |
| `Crypto.sha256Schedule4(w0, w1, w2, w3)` | `([u32;4], [u32;4], [u32;4], [u32;4]) → [u32;4]` | Produces the next four schedule words |
| `Crypto.sha256H(cdgh, abef, wk)` | `([u32;4], [u32;4], [u32;4]) → [u32;4]` | Low-level SHA-NI two-round contract |
| `Crypto.sha256Msg0(msg0, msg1)` | `([u32;4], [u32;4]) → [u32;4]` | Low-level SHA256MSG1 stage |
| `Crypto.sha256Msg1(msg, prev)` | `([u32;4], [u32;4]) → [u32;4]` | Low-level SHA256MSG2 stage |

### Platform Mapping

| Vex Function | AArch64 with SHA2 | x86 with SHA-NI | Portable fallback |
| --- | --- | --- | --- |
| `sha256Rounds4` | `SHA256H` + `SHA256H2` | fixed-flow lowering | fixed-flow lowering |
| `sha256Schedule4` | `SHA256SU0` + `SHA256SU1` | fixed-flow lowering | fixed-flow lowering |
| `sha256H` | fixed-flow lowering | `SHA256RNDS2` | fixed-flow lowering |
| `sha256Msg0` | fixed-flow lowering | `SHA256MSG1` | fixed-flow lowering |
| `sha256Msg1` | fixed-flow lowering | `SHA256MSG2` | fixed-flow lowering |

`crypto` uses the complete-state four-round API so the source remains identical
across targets. Architecture selection is a compiler/backend responsibility.

## Carry-Less Multiply

64×64→128 bit polynomial multiplication — essential for GCM (GHASH) and CRC computations.

| Function             | Signature              | Description                              |
| -------------------- | ---------------------- | ---------------------------------------- |
| `Crypto.clmul(a, b)` | `(u64, u64) → [u64;2]` | Carry-less multiply, result = `[lo, hi]` |

### Platform Mapping

| x86                      | ARM                  |
| ------------------------ | -------------------- |
| `PCLMULQDQ` (1-3 cycles) | `PMULL` (1-2 cycles) |

The standard-library GHASH implementation uses this operation with Karatsuba
multiplication, reflected register state and four-block aggregation. Targets
without PCLMUL/PMULL use the portable constant-flow lowering.

```vex
// GF(2^128) multiply for GCM — single instruction!
let result = Crypto.clmul(a, b);
let lo = result[0];  // Lower 64 bits
let hi = result[1];  // Upper 64 bits
```

## CRC-32 and CRC-32C

`Crypto.crc32` implements the reflected IEEE polynomial used by Gzip, while
`Crypto.crc32c` implements Castagnoli CRC used by networking and storage. Both
operations accept an exact unsigned chunk width, so one semantic source can
consume 1, 2, 4 or 8 bytes per update without architecture-specific code.

| Function | Signature | Description |
| --- | --- | --- |
| `Crypto.crc32(crc, chunk)` | `(u32, u8\|u16\|u32\|u64) → u32` | IEEE CRC update |
| `Crypto.crc32c(crc, chunk)` | `(u32, u8\|u16\|u32\|u64) → u32` | Castagnoli CRC update |

### Platform Mapping

| Operation | x86 | AArch64 |
| --- | --- | --- |
| IEEE CRC-32 | portable slicing fallback | `CRC32B/H/W/X` |
| CRC-32C | SSE4.2 where the exact width is legal; otherwise portable | `CRC32CB/CH/CW/CX` |

The compiler owns target selection and the constant table fallback. Vex source
sees only polynomial and chunk-width semantics. The `compress` package builds
its dependency-broken large-buffer CRC pipeline from this operation.

```vex
fn checksumData(data: RawBuf, len: i64): u32 {
    let! crc: u32 = 0xFFFFFFFF;
    let length = if len > 0 { len as usize } else { 0 as usize };
    let! i = 0 as usize;
    while i + 8 as usize <= length {
        crc = Crypto.crc32c(crc, unsafe { Mem.loadLe64(data.advance(i).base) });
        i = i + 8 as usize;
    }
    while i < length {
        crc = Crypto.crc32c(crc, data.load<u8>(i));
        i = i + 1 as usize;
    }
    return crc ^ 0xFFFFFFFF;
}
```

## Secure Random

Cryptographically secure random number generation using the operating system's
CSPRNG capability.

| Function              | Signature | Description         |
| --------------------- | --------- | ------------------- |
| `Crypto.secureRand()` | `→ u64`   | 64-bit CSPRNG value |

### Platform Mapping

| Platform | Entropy boundary |
| --- | --- |
| Linux | Direct `getrandom` syscall with EINTR/short-read handling; no libc dependency |
| macOS | Supported libSystem `arc4random_buf` API |
| Windows | `BCryptGenRandom` with the system-preferred provider |

The operation fails closed if the OS cannot supply all 64 bits. It never falls
back to time, PID, pointer addresses, or a predictable PRNG.

> For non-cryptographic randomness (games, simulations), use [`Math.random()`](/guide/math#random-numbers) instead — it's faster.

```vex
fn generateKey(): [u8; 32] {
    let! key = [0u8; 32];
    let! i = 0;
    while i < 4 {
        let rand = Crypto.secureRand();
        // Store 8 bytes from each u64
        let rb = RawBuf.of(&key as Ptr<Opaque>);
        rb.store<u64>(i * 8, rand);
        i = i + 1;
    }
    return key;
}
```

## Hardware Support

Instruction-oriented `Crypto.*` functions select a legal hardware lowering
when target features prove support. Operations with a software implementation,
such as CRC-32C, remain portable. `Crypto.secureRand()` uses the OS CSPRNG and
does not depend on CPU `RDRAND`.

| Feature    | x86               | ARM              | Apple Silicon |
| ---------- | ----------------- | ---------------- | ------------- |
| AES rounds | AES-NI (2010+)    | ARMv8 Crypto     | Yes M1+        |
| SHA-256    | SHA-NI (2016+)    | portable fallback | portable fallback |
| CLMUL      | PCLMULQDQ (2010+) | PMULL (ARMv8)    | Yes M1+        |
| CRC-32/32C | CRC-32C via SSE4.2; IEEE portable | CRC32 extension | Yes M1+ |
| Secure RNG | OS CSPRNG         | OS CSPRNG        | OS CSPRNG      |

> Cryptographic algorithms still need portable implementations or explicit
> target-feature handling where no legal hardware lowering exists.

## Next Steps

- [Math Namespace](/guide/math) — Mathematical functions and constants
- [Bit Namespace](/guide/bit) — Parallel bit manipulation
- [Crypto Library](/stdlib) — Full crypto algorithms (AES-GCM, SHA-256, etc.)
