# encoding — strict binary and percent codecs

The `encoding` package provides RFC 4648 Hex, Base64, Base64URL and Base32
codecs plus explicit RFC 3986 and form percent decoding.

## Quick start

```vex
import { Hex, Base64, Base64Url, Base32, Percent } from "encoding";

let hex = Hex.encode("hello");              // "68656c6c6f"
let b64 = Base64.encode("hello");           // "aGVsbG8="
let token = Base64Url.encode("hello");      // "aGVsbG8"
let b32 = Base32.encode("foo");             // "MZXW6==="
let path = Percent.encode("a+b c/%");       // "a%2Bb%20c%2F%25"
```

## Decode untrusted input with `Result`

```vex
import { Base64, DecodeErrorKind } from "encoding";

let value = match Base64.tryDecode(input) {
    Result.Ok(decoded) => decoded,
    Result.Err(error) => {
        if error.isKind(DecodeErrorKind.InvalidByte) {
            $println(f"invalid byte at {error.position}");
        }
        return 1;
    },
};
```

`tryDecode` is the canonical API. It distinguishes valid empty output from an
error and reports a stable category, exact position, offending byte and required
capacity where applicable.

Convenience `decode` methods return `""` on error. Convenience `decodeTo`
methods return `0`. Use them only when the empty-result ambiguity is acceptable.

## Allocation-free output

```vex
let memory = Mem.allocCompat(128) as Ptr<u8>;
let output = RawBuf.of(memory as Ptr<Opaque>);

let written = match Base64Url.tryDecodeTo(token.asStr(), output, 128) {
    Result.Ok(count) => count,
    Result.Err(error) => {
        Mem.freeCompat(memory as Ptr<Opaque>);
        return error.code();
    },
};

Mem.freeCompat(memory as Ptr<Opaque>);
```

Strict caller-buffer decoders first validate the complete input and capacity,
then write. A failure leaves the output buffer untouched.

## Canonical input rules

- `Base64` requires standard alphabet and canonical padding.
- `Base64Url` accepts padded and unpadded URL-safe input, but rejects standard
  `+` and `/` characters.
- Base64 and Base32 reject non-zero unused trailing bits.
- Base32 accepts uppercase or lowercase alphabet bytes and only RFC 4648 padding
  shapes.
- Hex requires an even number of ASCII hexadecimal digits.

These checks prevent multiple textual representations from decoding to the same
byte sequence when canonical input is required for signatures, cache keys or
protocol validation.

## Percent versus form decoding

```vex
import { Percent, FormUrl } from "encoding";

Percent.decode("a+b"); // "a+b" — RFC 3986
FormUrl.decode("a+b"); // "a b" — HTML form semantics
```

Generic URL percent decoding never silently rewrites `+`. Form behavior must be
selected explicitly.

## API overview

| Namespace | Owned methods | Caller-buffer methods |
| --- | --- | --- |
| `Hex` | `encode`, `encodeBytes`, `tryDecode`, `decode`, `isValid` | `encodeTo`, `tryDecodeTo`, `decodeTo` |
| `Base64` | `encode`, `tryDecode`, `decode` | `encodeTo`, `tryDecodeTo`, `decodeTo` |
| `Base64Url` | `encode`, `encodePadded`, `tryDecode`, `decode` | `encodeTo`, `encodeToPadded`, `tryDecodeTo`, `decodeTo` |
| `Base32` | `encode`, `tryDecode`, `decode` | `encodeTo`, `tryDecodeTo`, `decodeTo` |
| `Percent` | `encode`, `tryDecode`, `decode` | `tryDecodeTo` |
| `FormUrl` | `tryDecode`, `decode` | `tryDecodeTo` |

Standalone function names remain forwarding compatibility shims. New code
should use namespace methods.

## Decode errors

`DecodeErrorKind` contains:

- `InvalidLength`
- `InvalidByte`
- `InvalidPadding`
- `NonCanonical`
- `OutputTooSmall`
- `InputTooLarge`
- `AllocationFailed`

The error object and its `code()`, `message()` and `isKind()` helpers do not
allocate.

## Verification

```bash
vex test lib/std/encoding
vex test lib/std/encoding -O2
vex lint lib/std/encoding --deny-warnings
vex test lib/std/encoding --bench -O2 --benchmem
```
