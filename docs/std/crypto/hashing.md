# Hashing (`crypto` Hashes)

`crypto` provides pure-Vex streaming and one-shot hash implementations. Prefer
the camelCase public API shown below; low-level `*To` functions write into
caller-owned buffers and require the documented capacity.

## SHA-256 / SHA-512

The NIST standard hash functions. SHA-256 produces a 32-byte digest, SHA-512 produces 64 bytes.

```vex
import { sha256Hex, sha512Hex } from "crypto";

let digest256 = sha256Hex("Hello, Vex!");
let digest512 = sha512Hex("Hello, Vex!");
$println("SHA-256: {digest256}");
```

On proven AArch64 SHA2 targets, SHA-256's target-independent four-round and
four-word schedule operations lower to native `SHA256H/H2/SU0/SU1` instructions.
Other targets execute the exact portable fixed-flow contract; application source
does not branch on architecture names.

## SHA-1 (Legacy)

Still required for Git object hashing and some TLS certificate validation. Not recommended for new security applications.

```vex
import { sha1Hex } from "crypto";
let digest = sha1Hex(data);
```

## BLAKE2b

BLAKE2b provides a modern variable-length digest. Choose a hash according to
the protocol you are implementing; do not silently replace a protocol-mandated
SHA algorithm.

```vex
import { blake2bHex } from "crypto";
let digest = blake2bHex(data);
```

## HMAC

The package exposes explicit SHA-1 and SHA-256 HMAC operations rather than a
runtime-selected hash interface.

```vex
import { hmacSha256Hex, hmacVerifySha256Hex } from "crypto";

let mac = hmacSha256Hex(key, message);
let accepted = hmacVerifySha256Hex(key, message, mac);
```
