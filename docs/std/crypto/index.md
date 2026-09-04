# crypto — Overview

A comprehensive, pure-Vex cryptographic suite. It has no OpenSSL or libsodium
dependency. Application code should prefer the checked `Aes128Gcm`,
`Aes256Gcm`, `ChaCha20Poly1305`, `HkdfSha256`, `Pbkdf2Sha256`, `Argon2id`,
`X25519`, and `Ed25519` facades; raw `RawBuf` functions exist for protocol and
runtime integration and require the caller to uphold buffer dimensions.

## Module Map

| Category | Algorithms | Files |
|----------|-----------|-------|
| **Hashes** | SHA-1, SHA-256, SHA-512, BLAKE2b | `sha1.vx`, `sha256.vx`, `sha512.vx`, `blake2b.vx` |
| **MACs** | HMAC-SHA1, HMAC-SHA256 | `hmac.vx` |
| **AEAD** | AES-GCM, ChaCha20-Poly1305 | `aes_gcm.vx`, `chacha20.vx`, `poly1305.vx`, `aead.vx` |
| **Symmetric** | AES (128/256) | `aes.vx` |
| **KDF** | Argon2id, PBKDF2, HKDF | `argon2id.vx`, `pbkdf2.vx`, `hkdf.vx` |
| **Signatures** | Ed25519 | `ed25519.vx` |
| **Key Exchange** | X25519 (ECDH) | `x25519.vx` |
| **Field Math** | Curve25519 field | `field25519.vx` |
| **Encoding** | Hex, Base64 | `hex.vx`, `base64.vx` |
| **Utilities** | Byte ops, SIMD helpers | `bytes.vx`, `simd.vx`, `utils.vx` |

## Design Principles

1. **Pure Vex**: No C FFI calls — the compiler can inline and vectorize everything
2. **Hardware Acceleration**: When `Crypto.*` builtins are available (AES-NI, ARMv8 CE), they are used transparently
3. **Software Fallbacks**: Portable fixed-flow implementations preserve the
   same `Crypto.*` semantics when a target lacks a native instruction
4. **Failure safety**: checked AEAD open operations release no unauthenticated
   plaintext and clear reusable output on failure
5. **Constant-flow primitives**: tag comparison, AES portable fallback and
   polynomial multiplication avoid secret-dependent lookup tables and branches
6. **Target-width raw memory**: every byte offset crossing a `RawBuf` boundary
   is a canonical `usize`. Algorithms may retain wider logical counters or
   block indices, but never narrow them implicitly while addressing memory.

## Raw integration boundary

Checked facades are the application API. Raw functions exist for runtimes and
protocol implementations that already own exact storage; their capacities and
aliasing requirements are explicit caller obligations. They fail closed rather
than truncate an unaddressable `u64` length. In particular, CTR requests are
validated before their first output write, so a counter stream can never wrap
and reuse keystream bytes. The initial-counter AES-CTR form permits its final
`u32::MAX` block exactly once and rejects any request beyond that boundary.
