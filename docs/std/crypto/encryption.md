# Encryption (`crypto` AEAD & Symmetric)

## AES-GCM

Authenticated encryption with checked AES-128-GCM and AES-256-GCM facades.
Native AES/CLMUL instructions are selected on capable x86-64 and AArch64
targets; the API and result are identical on the portable fallback.

```vex
import { Aes128Gcm } from "crypto";

let key: Span<u8> = ...;       // exactly 16 bytes
let nonce: Span<u8> = ...;     // exactly 12 bytes
let aad: Span<u8> = ...;
let plaintext: Span<u8> = ...;

let sealed = match Aes128Gcm.seal(key, nonce, aad, plaintext) {
    Ok(value) => value,
    Err(failure) => { $panic(failure.message()); },
};
let plaintextCopy = match Aes128Gcm.open(key, nonce, aad, sealed.asSpan()) {
    Ok(value) => value,
    Err(failure) => { $panic(failure.message()); },
};
```

## ChaCha20-Poly1305

Portable AEAD cipher with checked combined and detached APIs.

```vex
import { ChaCha20Poly1305 } from "crypto";

let sealed = ChaCha20Poly1305.seal(key, nonce, aad, plaintext);
let opened = match sealed {
    Ok(value) => ChaCha20Poly1305.open(key, nonce, aad, value.asSpan()),
    Err(failure) => Err(failure),
};
```

## Raw AES

Low-level AES block cipher for custom constructions.

```vex
import { aes128EncryptBlock, aes256EncryptBlock } from "crypto";
```

These `RawBuf` block functions are low-level building blocks. Prefer the checked
facades for application data. AEAD open verifies the complete tag before
decrypting and clears reusable output on authentication failure.

Raw CTR callers must also respect the complete counter space. Vex validates it
before writing: GCM/J0 CTR reserves the pre-incremented counter correctly, and
the initial-counter variant accepts a final `u32::MAX` block once but never a
wrapping second block. Raw byte offsets are target-width `usize`; public
protocol lengths remain explicit `u64` values until they pass this validation.

## Implementation Details

| File | Purpose |
|------|---------|
| `aes.vx` | AES key expansion, target-independent round semantics and CTR |
| `aes_gcm.vx` | GCM with reflected four-block GHASH aggregation |
| `chacha20.vx` | ChaCha20 quarter-round stream cipher |
| `poly1305.vx` | Poly1305 MAC with 130-bit accumulator |
| `aead.vx` | Unified AEAD interface combining cipher + MAC |
