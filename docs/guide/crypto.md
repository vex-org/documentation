# Crypto Namespace

The `Crypto` namespace provides hardware-accelerated cryptographic micro-helpers. These are single-instruction building blocks that the compiler maps to platform-specific intrinsics (x86 AES-NI / ARM Crypto Extensions) automatically.

> **No import needed.** `Crypto.*` is a builtin namespace available everywhere.

> **These are building blocks, not full algorithms.** For complete crypto implementations (AES-256-GCM, SHA-256, ChaCha20, etc.), see the [`crypto` standard library package](/stdlib).

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

| Function | Signature | Description |
|----------|-----------|-------------|
| `Crypto.aesEncRound(state, key)` | `([u8;16], [u8;16]) → [u8;16]` | SubBytes → ShiftRows → MixColumns → AddRoundKey |
| `Crypto.aesDecRound(state, key)` | `([u8;16], [u8;16]) → [u8;16]` | Inverse AES round |
| `Crypto.aesEncLast(state, key)` | `([u8;16], [u8;16]) → [u8;16]` | Final round (no MixColumns) |
| `Crypto.aesDecLast(state, key)` | `([u8;16], [u8;16]) → [u8;16]` | Final inverse round |

### Platform Mapping

| Vex Function | x86 (AES-NI) | ARM (Crypto Ext.) |
|---|---|---|
| `aesEncRound` | `AESENC` (1 cycle) | `AESE` + `AESMC` (2 cycles) |
| `aesDecRound` | `AESDEC` | `AESD` + `AESIMC` |
| `aesEncLast` | `AESENCLAST` | `AESE` |
| `aesDecLast` | `AESDECLAST` | `AESD` |

> **~500x faster** than the pure Vex software implementation per round.

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

Single-instruction SHA-256 computation — replaces the 64-round loop in software SHA-256.

| Function | Signature | Description |
|----------|-----------|-------------|
| `Crypto.sha256H(state, msg, k)` | `([u32;4], [u32;4], [u32;4]) → [u32;4]` | SHA-256 hash update (2 rounds) |
| `Crypto.sha256Msg0(msg0, msg1)` | `([u32;4], [u32;4]) → [u32;4]` | Message schedule σ₀ |
| `Crypto.sha256Msg1(msg, prev)` | `([u32;4], [u32;4]) → [u32;4]` | Message schedule σ₁ |

### Platform Mapping

| Vex Function | x86 (SHA-NI) | ARM (SHA2 Ext.) |
|---|---|---|
| `sha256H` | `SHA256RNDS2` | `SHA256H` |
| `sha256Msg0` | `SHA256MSG1` | `SHA256SU0` |
| `sha256Msg1` | `SHA256MSG2` | `SHA256SU1` |

> **~20-50x faster** than software SHA-256. Processes 2 rounds per instruction.

## Carry-Less Multiply

64×64→128 bit polynomial multiplication — essential for GCM (GHASH) and CRC computations.

| Function | Signature | Description |
|----------|-----------|-------------|
| `Crypto.clmul(a, b)` | `(u64, u64) → [u64;2]` | Carry-less multiply, result = `[lo, hi]` |

### Platform Mapping

| x86 | ARM |
|---|---|
| `PCLMULQDQ` (1-3 cycles) | `PMULL` (1-2 cycles) |

> **~200-300x faster** than software GF(2¹²⁸) multiply. Replaces the 128-iteration bit-by-bit loop in GHASH.

```vex
// GF(2^128) multiply for GCM — single instruction!
let result = Crypto.clmul(a, b);
let lo = result[0];  // Lower 64 bits
let hi = result[1];  // Upper 64 bits
```

## CRC-32C

Hardware-accelerated CRC-32C (Castagnoli polynomial) — used in networking (iSCSI, SCTP) and storage (Btrfs, ext4).

| Function | Signature | Description |
|----------|-----------|-------------|
| `Crypto.crc32c(crc, byte)` | `(u32, u8) → u32` | Update CRC with one byte |

### Platform Mapping

| x86 | ARM |
|---|---|
| `CRC32` (SSE4.2, 1 cycle) | `CRC32CB` (1 cycle) |

```vex
fn checksumData(data: RawBuf, len: i64): u32 {
    let! crc: u32 = 0xFFFFFFFF;
    let! i: i64 = 0;
    while i < len {
        crc = Crypto.crc32c(crc, data.load<u8>(i));
        i = i + 1;
    }
    return crc ^ 0xFFFFFFFF;
}
```

## Secure Random

Cryptographically secure random number generation using hardware entropy.

| Function | Signature | Description |
|----------|-----------|-------------|
| `Crypto.secureRand()` | `→ u64` | 64-bit CSPRNG value |

### Platform Mapping

| x86 | ARM / macOS |
|---|---|
| `RDRAND` (HW RNG) | `arc4random` (kernel CSPRNG) |

> For non-cryptographic randomness (games, simulations), use [`Math.random()`](/guide/math#random-numbers) instead — it's faster.

```vex
fn generateKey(): [u8; 32] {
    let! key = [0u8; 32];
    let! i = 0;
    while i < 4 {
        let rand = Crypto.secureRand();
        // Store 8 bytes from each u64
        let rb = RawBuf.of(&key as ptr);
        rb.store<u64>(i * 8, rand);
        i = i + 1;
    }
    return key;
}
```

## Hardware Support

All `Crypto.*` functions require hardware support. The compiler automatically selects the right instruction for the target architecture.

| Feature | x86 | ARM | Apple Silicon |
|---------|-----|-----|---------------|
| AES rounds | AES-NI (2010+) | ARMv8 Crypto | ✅ M1+ |
| SHA-256 | SHA-NI (2016+) | ARMv8 SHA2 | ✅ M1+ |
| CLMUL | PCLMULQDQ (2010+) | PMULL (ARMv8) | ✅ M1+ |
| CRC-32C | SSE4.2 (2008+) | CRC32 (ARMv8.1+) | ✅ M1+ |
| Secure RNG | RDRAND (2012+) | arc4random | ✅ Always |

> **If hardware is not available**, the compiler will emit an error at compile time. Use the pure Vex implementations from `lib/crypto` as a portable fallback.

## Next Steps

- [Math Namespace](/guide/math) — Mathematical functions and constants
- [Bit Namespace](/guide/bit) — Parallel bit manipulation
- [Crypto Library](/stdlib) — Full crypto algorithms (AES-GCM, SHA-256, etc.)
