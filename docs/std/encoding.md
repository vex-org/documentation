# encoding — Binary Encoding Utilities

Low-level encoding/decoding for Base64, Base32, Hex, and URL-safe encoding.

## Base64

```rust
import { base64Encode, base64Decode } from "encoding";

let encoded = base64Encode("Hello, Vex!");    // "SGVsbG8sIFZleCE="
let decoded = base64Decode(encoded);           // "Hello, Vex!"
```

## Base32

```rust
import { base32Encode, base32Decode } from "encoding";

let encoded = base32Encode(data);
let decoded = base32Decode(encoded);
```

## Hex

```rust
import { hexEncode, hexDecode } from "encoding";

let hex = hexEncode("Hello");    // "48656c6c6f"
let bytes = hexDecode(hex);      // [0x48, 0x65, 0x6c, 0x6c, 0x6f]
```

## URL Encoding

```rust
import { urlEncode, urlDecode } from "encoding";

let encoded = urlEncode("hello world&foo=bar");  // "hello%20world%26foo%3Dbar"
let decoded = urlDecode(encoded);
```

## Files

| File | Purpose |
|------|---------|
| `base64.vx` | RFC 4648 Base64 with standard & URL-safe alphabets |
| `base32.vx` | RFC 4648 Base32 encoding |
| `hex.vx` | Hexadecimal encode/decode |
| `url.vx` | Percent-encoding (RFC 3986) |
