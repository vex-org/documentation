# Gzip & Deflate (`compress/gzip`)

Industry-standard compression for HTTP responses, `.gz` archives, and legacy file formats (RFC 1952 / RFC 1951).

## Usage

```rust
import { gzipCompress, gzipDecompress, crc32, crc32Update } from "compress/gzip";

let data = "Gzip in pure Vex!";
let ptr = data.as_ptr() as *void;
let len = data.len() as i64;

let outCap = len + (len / 65535 + 1) * 5 + 18;
let comp = alloc(outCap as u64);
let compLen = gzipCompress(ptr, len, comp, outCap);

let decomp = alloc(len as u64);
let decompLen = gzipDecompress(comp, compLen, decomp, len);
```

## API

| Function | Description |
|----------|-------------|
| `gzipCompress(src, srcLen, dst, dstCap): i64` | Compress into `.gz` format |
| `gzipDecompress(src, srcLen, dst, dstCap): i64` | Decompress `.gz` data |
| `crc32(data, len): u32` | Compute CRC-32 checksum |
| `crc32Update(crc, data, len): u32` | Update a running CRC-32 |

## Internal Architecture

| File | Purpose |
|------|---------|
| `compress.vx` | Gzip frame encoder with header/trailer |
| `decompress.vx` | Gzip frame decoder |
| `deflate.vx` | Deflate algorithm (RFC 1951) — LZ77 + Huffman |
| `crc32.vx` | CRC-32 checksum (table-driven) |

## Zlib Variant

A separate `compress/zlib` module wraps the same Deflate core with Zlib framing (RFC 1950) for compatibility with PNG and other legacy protocols.
