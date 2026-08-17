# Brotli

The Brotli codec is implemented in pure Vex and is intended for bounded
whole-buffer compression and decompression of web-oriented payloads.

## Usage

```vex
import {
    compress, decompress,
    CompressOptions, CompressionFormat,
} from "compress";

let encoded = compress(
    source.asSpan(),
    CompressOptions.forFormat(CompressionFormat.Brotli).withLevel(6),
)?;
let decoded = decompress(
    encoded.asSpan(),
    CompressionFormat.Brotli,
    source.len(),
)?;
```

Levels 1–11 are accepted. Levels 1–5 prioritize fast uncompressed metablocks;
levels 6–11 attempt LZ77-compressed metablocks and fall back when compression
would expand the block.

## Decoder coverage and safety

The decoder handles compressed and uncompressed metablocks, prefix codes,
back-references and the RFC static dictionary transformations used by the test
corpus. Every decode goes through an explicit output ceiling. Truncated input,
invalid distance/prefix data and insufficient output space fail without
publishing partial output through the safe facade.

Official Brotli decoders validate streams produced across levels 0, 1, 4, 6,
9 and 11. The package does not claim bit-for-bit parity with Google's encoder;
interoperability and decoded content are the contract.

`brotliCompress` and `brotliDecompress` are low-level `RawBuf` kernels for
specialized callers. A streaming Brotli writer is not currently exposed.
