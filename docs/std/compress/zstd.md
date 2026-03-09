# Zstd (`compress/zstd`)

Modern compression with excellent ratio-to-speed balance (RFC 8878). Zstandard consistently outperforms both Gzip and LZ4 in compression ratio while maintaining competitive decompression speed.

## Usage

```rust
import { zstdCompress, zstdDecompress, zstdGetFrameContentSize } from "compress/zstd";

let data = "Zstandard in pure Vex!";
let ptr = data.as_ptr() as *void;
let len = data.len() as i64;

let outCap = len + len / 8 + 18;
let comp = alloc(outCap as u64);
let compLen = zstdCompress(ptr, len, comp, outCap);

let origSize = zstdGetFrameContentSize(comp, compLen);
let decomp = alloc(origSize as u64);
let decompLen = zstdDecompress(comp, compLen, decomp, origSize);
```

## API

| Function | Description |
|----------|-------------|
| `zstdCompress(src, srcLen, dst, dstCap): i64` | Compress into Zstd frame |
| `zstdDecompress(src, srcLen, dst, dstCap): i64` | Decompress Zstd frame |
| `zstdGetFrameContentSize(src, srcLen): i64` | Read content size from frame header |

## Internal Architecture

| File | Purpose |
|------|---------|
| `compress.vx` | Frame compression with LZ77 matching |
| `decompress.vx` | Frame decompression |
| `fse.vx` | Finite State Entropy coding (tANS) |
| `huffman.vx` | Huffman tree decoding |
| `bitreader.vx` | Backward bit reader for entropy streams |

The reference C implementation is ~20,000 lines. Vex achieves feature parity in ~1,060 lines — a **95% reduction**.
