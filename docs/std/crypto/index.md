# crypto — Overview

A comprehensive, **pure Vex** cryptographic suite. No OpenSSL, no libsodium — every algorithm is implemented natively with full memory safety.

## Module Map

| Category | Algorithms | Files |
|----------|-----------|-------|
| **Hashes** | SHA-1, SHA-256, SHA-512, BLAKE2b | `sha1.vx`, `sha256.vx`, `sha512.vx`, `blake2b.vx` |
| **MACs** | HMAC (any hash) | `hmac.vx` |
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
3. **Software Fallbacks**: Every algorithm works on every platform via `bit` intrinsics
4. **Constant-Time**: Timing-safe comparison functions in `utils.vx`
