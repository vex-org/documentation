# Hashing (`crypto` Hashes)

Vex provides production-grade hash functions covering both legacy standards and modern alternatives.

## SHA-256 / SHA-512

The NIST standard hash functions. SHA-256 produces a 32-byte digest, SHA-512 produces 64 bytes.

```rust
import { sha256, sha512 } from "crypto";

let digest256 = sha256("Hello, Vex!".asBytes());
let digest512 = sha512("Hello, Vex!".asBytes());
println("SHA-256: {digest256.toHex()}");
```

## SHA-1 (Legacy)

Still required for Git object hashing and some TLS certificate validation. Not recommended for new security applications.

```rust
import { sha1 } from "crypto";
let digest = sha1(data);
```

## BLAKE2b

Faster than MD5 while being more secure than SHA-3. BLAKE2b is the recommended hash for new applications.

```rust
import { blake2b } from "crypto";
let digest = blake2b(data, 32);  // 32-byte output
```

## HMAC

Hash-based Message Authentication Code. Works with any hash function.

```rust
import { hmac_sha256 } from "crypto";
let mac = hmac_sha256(key, message);
```
