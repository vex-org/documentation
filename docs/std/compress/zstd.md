# Zstandard

The pure-Vex Zstandard implementation reads and writes RFC 8878 frames. The
recommended entry points are the common `compress`/`decompress` facade and the
workspace-reusing `ZstdEncoder`.

## Reusable encoding

```vex
import {
    decompress, CompressionFormat, ZstdEncoder,
} from "compress";

let! encoder = ZstdEncoder.withLevel(3)?;
let! encoded = Vec.new<u8>();

encoder.compressInto(source.asSpan(), &encoded)?;
let decoded = decompress(
    encoded.asSpan(),
    CompressionFormat.Zstd,
    source.len(),
)?;
```

Levels 1–22 are accepted. The encoder owns one reusable workspace and grows it
only when the input requires more capacity.

## Implemented frame features

- raw, run-length and compressed blocks;
- multi-block frames and a rolling 128 KiB match window;
- repeat offsets;
- predefined, RLE and custom FSE sequence tables;
- compressed and raw literal decoding, including Huffman literal streams;
- optional frame checksum validation;
- bounded backward bit readers and checked frame-content-size parsing.

The encoder currently emits raw literal sections; sequence streams use FSE.
Dictionary compression, concatenated frames and skippable frames are explicit
future extensions.

## Low-level kernels

`zstdCompress`, `zstdDecompress` and `zstdGetFrameContentSize` operate on
`RawBuf` and capacities. They preserve negative codec diagnostics and exist for
runtime or codec implementers. Application code should prefer `ZstdEncoder` or
the common safe facade, which performs checked sizing, alias staging and typed
error conversion.

## Verification

Package tests cover all public levels, empty and multi-block inputs, custom FSE
tables, repeated offsets, malformed/truncated streams and output ceilings.
Generated frames are validated and decoded by the official Zstandard tool.
