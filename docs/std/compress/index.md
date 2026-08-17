# `compress`

`compress` provides pure-Vex LZ4, Zstandard, Gzip, Brotli and Zlib codecs. The
public API accepts borrowed `Span<u8>` input, returns an owned `Vec<u8>` or
writes into caller-reusable storage, validates levels, and reports typed errors.
No C codec library or manual allocation is required.

## Quick start

```vex
import {
    compress, decompress,
    CompressOptions, CompressionFormat,
} from "compress";

let text = "compress me";
let source = unsafe {
    Span.of<u8>(text.asPtr() as Ptr<u8>, text.len())
};

let encoded = compress(
    source,
    CompressOptions.forFormat(CompressionFormat.Zstd).withLevel(3),
)?;

// The ceiling is mandatory: malformed input cannot request unbounded memory.
let decoded = decompress(
    encoded.asSpan(),
    CompressionFormat.Zstd,
    1 * 1024 * 1024 as usize,
)?;
```

For repeated operations, reuse the output allocation:

```vex
let! encoded = Vec.new<u8>();
let written = compressInto(
    source,
    &encoded,
    CompressOptions.forFormat(CompressionFormat.Lz4),
)?;

let! decoded = Vec.new<u8>();
decompressInto(
    encoded.asSpan(),
    &decoded,
    CompressionFormat.Lz4,
    1 * 1024 * 1024 as usize,
)?;
```

`compressInto` and `decompressInto` leave the destination at its exact logical
length on success and empty it on failure. Source/destination overlap is staged
safely.

## Formats and level ranges

| Format | Encoder levels | Decoder | Typical use |
|---|---:|:---:|---|
| LZ4 frame | 1–65537 acceleration | Yes | latency-sensitive caches and transport |
| Zstandard | 1–22 | Yes | general-purpose ratio/speed balance |
| Gzip/Deflate | 1–9 | Yes | HTTP and `.gz` interoperability |
| Brotli | 1–11 | Yes | web payloads |
| Zlib/Deflate | 1–9 | Yes | RFC 1950 consumers and legacy formats |

Use `CompressOptions.forFormat(format)` for production defaults. Invalid levels
return `CompressionErrorKind.InvalidLevel`; they are never silently clamped.

## Error and resource contract

`CompressionError` contains:

- `kind`: stable programmatic classification;
- `codecCode`: the underlying pure-Vex kernel diagnostic;
- `limit`: the configured output ceiling when relevant.

The decoder requires `maxOutputBytes`. This is part of the security contract,
not a tuning hint. `CompressionErrorKind.OutputLimitExceeded` is distinct from
malformed input. Checked size arithmetic rejects impossible inputs before
allocation.

## Reusable Zstandard encoder

`ZstdEncoder` owns and retains its match/FSE workspace. Vex releases the
workspace automatically; application code never receives allocator pointers.

```vex
let! encoder = ZstdEncoder.withLevel(7)?;
let! output = Vec.new<u8>();

encoder.compressInto(first.asSpan(), &output)?;
encoder.compressInto(second.asSpan(), &output)?;
```

`workspaceCapacity()` is available for observability. It does not transfer
ownership.

## Interoperability and boundaries

The package is tested against the official `zstd`, `gzip`, `brotli` and `lz4`
command-line decoders. Truncated input, malformed headers, checksum failures,
output ceilings, empty payloads and multi-block frames are covered by package
tests.

Current advanced boundaries:

- Zstandard dictionary compression is not exposed;
- Zstandard accepts one ordinary frame, not concatenated or skippable frames;
- Gzip and LZ4 have stream writers; Zstandard and Brotli currently use the
  bounded whole-buffer facade;
- low-level `RawBuf` kernels remain exported for codec/runtime specialists, but
  ordinary application code should use the safe facade above.

See the format pages for exact codec behavior and implementation details.
