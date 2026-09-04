# Key Derivation & Signatures (`crypto` KDF & PKI)

## Argon2id — Password Hashing

The winner of the Password Hashing Competition. Memory-hard, parallelizable, and resistant to GPU/ASIC attacks.

```vex
import { Argon2id, Argon2Parameters } from "crypto";

// password and salt are Span<u8> values.
let parameters = Argon2Parameters.recommended();
let hash = match Argon2id.derive(password, salt, parameters, 32) {
    Ok(value) => value,
    Err(error) => { $panic(error); },
};
```

## PBKDF2

Legacy-compatible password derivation. Use Argon2id for new applications.

```vex
import { Pbkdf2Sha256 } from "crypto";

let key = match Pbkdf2Sha256.derive(password, salt, iterations, 32) {
    Ok(value) => value,
    Err(error) => { $panic(error); },
};
```

## HKDF

Key extraction and expansion (RFC 5869). Used for deriving session keys from shared secrets.

```vex
import { HkdfSha256 } from "crypto";

let derived = match HkdfSha256.derive(salt, inputKeyMaterial, info, 32) {
    Ok(value) => value,
    Err(error) => { $panic(error); },
};
```

## Ed25519 — Digital Signatures

High-speed, high-security EdDSA public-key signatures over Curve25519.

```vex
import { Ed25519 } from "crypto";

// privateSeed and message are Span<u8> values; the seed must be 32 bytes.
let publicKey = match Ed25519.publicKey(privateSeed) {
    Ok(value) => value,
    Err(error) => { $panic(error); },
};
let signature = match Ed25519.sign(privateSeed, message) {
    Ok(value) => value,
    Err(error) => { $panic(error); },
};
```

## X25519 — Key Exchange

Elliptic-curve Diffie-Hellman over Curve25519 for establishing shared secrets.

```vex
import { X25519 } from "std/crypto";

let sharedSecret = match X25519.sharedSecret(myPrivateKey, peerPublicKey) {
    Ok(value) => value,
    Err(error) => { $panic(error); },
};
```

Protocol owners that already have fixed storage should avoid a temporary
`Vec<u8>` and use the exact caller-owned API:

```vex
let! publicKeyStorage = [0u8; 32];
let! publicOut = unsafe {
    Span.of<u8>(&publicKeyStorage as Ptr<u8>, 32 as usize)
};
X25519.publicKeyTo(privateKey, &publicOut!)?;

let! sharedSecretStorage = [0u8; 32];
let! sharedOut = unsafe {
    Span.of<u8>(&sharedSecretStorage as Ptr<u8>, 32 as usize)
};
X25519.sharedSecretTo(privateKey, peerPublicKey, &sharedOut!)?;
```

Both destinations must be exactly 32 bytes and must not overlap either input.
The shared-secret path rejects RFC 7748's all-zero, non-contributory result and
clears the destination before returning `InvalidPublicKey`. Neither path
allocates.

## Curve performance architecture

X25519 and Ed25519 share the pure-Vex 5×51 field implementation. Multiplication
uses Vex `u128` values, allowing the backend to select native wide multiply
instructions without a C/Rust FFI boundary. Squaring has its own symmetric
schedule, small coefficients avoid sparse full-field multiplication, and the
inversion chain reuses its field slot. On the 2026-08-18 Apple M2 Max O3
development run, X25519 public-key derivation measured 33.8–35.7 µs with zero
allocations. Ed25519 uses a constant-flow four-bit window: every table entry is
visited in public order and arithmetic limb masks perform the selection, so no
secret digit becomes a memory index or branch. The same run measured 1 KiB
signing at 159.6–162.3 µs and verification at 125.0–128.6 µs, both with zero
allocation. These measurements are regression baselines, not API promises.
