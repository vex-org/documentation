# Encryption (`crypto` AEAD & Symmetric)

## AES-GCM

Hardware-accelerated authenticated encryption. Uses AES-NI instructions when available.

```rust
import { aes_gcm_encrypt, aes_gcm_decrypt } from "crypto";

let key = ...;    // 16 or 32 bytes
let nonce = ...;  // 12 bytes
let plaintext = "Secret message".asBytes();

let ciphertext = aes_gcm_encrypt(key, nonce, plaintext, aad);
let decrypted = aes_gcm_decrypt(key, nonce, ciphertext, aad);
```

## ChaCha20-Poly1305

Extremely fast AEAD cipher, especially on platforms without AES hardware (mobile/ARM).

```rust
import { chacha20_poly1305_encrypt, chacha20_poly1305_decrypt } from "crypto";

let encrypted = chacha20_poly1305_encrypt(key, nonce, plaintext, aad);
let decrypted = chacha20_poly1305_decrypt(key, nonce, encrypted, aad);
```

## Raw AES

Low-level AES block cipher for custom constructions.

```rust
import { aes_encrypt_block, aes_decrypt_block } from "crypto";
```

## Implementation Details

| File | Purpose |
|------|---------|
| `aes.vx` | AES core (key expansion, SubBytes, MixColumns) |
| `aes_gcm.vx` | GCM mode with GHASH authentication |
| `chacha20.vx` | ChaCha20 quarter-round stream cipher |
| `poly1305.vx` | Poly1305 MAC with 130-bit accumulator |
| `aead.vx` | Unified AEAD interface combining cipher + MAC |
