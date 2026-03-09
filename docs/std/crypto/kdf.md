# Key Derivation & Signatures (`crypto` KDF & PKI)

## Argon2id — Password Hashing

The winner of the Password Hashing Competition. Memory-hard, parallelizable, and resistant to GPU/ASIC attacks.

```rust
import { Argon2id } from "crypto";

let password = "my_secure_password".asBytes();
let salt = randomBytes(16);

let hash = Argon2id.hash(password, salt, {
    timeCost: 3,
    memoryCost: 65536,   // 64 MB
    parallelism: 4
});

println(hash.toHex());
```

## PBKDF2

Legacy-compatible password derivation. Use Argon2id for new applications.

```rust
import { pbkdf2_sha256 } from "crypto";
let key = pbkdf2_sha256(password, salt, iterations, keyLen);
```

## HKDF

Key extraction and expansion (RFC 5869). Used for deriving session keys from shared secrets.

```rust
import { hkdf_sha256_extract, hkdf_sha256_expand } from "crypto";
let prk = hkdf_sha256_extract(salt, input_key);
let derived = hkdf_sha256_expand(prk, info, outputLen);
```

## Ed25519 — Digital Signatures

High-speed, high-security EdDSA public-key signatures over Curve25519.

```rust
import { ed25519_keygen, ed25519_sign, ed25519_verify } from "crypto";

let (pubKey, privKey) = ed25519_keygen(seed);
let signature = ed25519_sign(privKey, message);
let valid = ed25519_verify(pubKey, message, signature);
```

## X25519 — Key Exchange

Elliptic-curve Diffie-Hellman over Curve25519 for establishing shared secrets.

```rust
import { x25519 } from "crypto";
let sharedSecret = x25519(myPrivateKey, theirPublicKey);
```

## Encoding Utilities

```rust
import { toHex, fromHex, toBase64, fromBase64 } from "crypto";

let hex = toHex(bytes);
let b64 = toBase64(bytes);
```
