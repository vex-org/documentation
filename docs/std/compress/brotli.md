# Brotli (`compress/brotli`)

Google's modern compression algorithm (RFC 7932). Brotli achieves the best compression ratio for web content, surpassing Gzip by 15–25% on typical HTML/CSS/JS payloads. It's the standard for HTTP `Content-Encoding: br` and WOFF2 web fonts.

## Usage

```rust
import { brotliCompress, brotliDecompress } from "compress/brotli";

let data = "Brotli in pure Vex!";
let ptr = data.as_ptr() as *void;
let len = data.len() as i64;

let outCap = len + (len / 65536 + 1) * 8 + 16;
let comp = alloc(outCap as u64);
let compLen = brotliCompress(ptr, len, comp, outCap);

let decomp = alloc(len as u64);
let decompLen = brotliDecompress(comp, compLen, decomp, len);
```

## API

| Function | Description |
|----------|-------------|
| `brotliCompress(src, srcLen, dst, dstCap): i64` | Compress into Brotli stream |
| `brotliDecompress(src, srcLen, dst, dstCap): i64` | Decompress Brotli data |

## Internal Architecture

| File | Purpose |
|------|---------|
| `compress.vx` | Brotli encoder with context modeling |
| `decompress.vx` | Brotli decoder |
| `prefix.vx` | Prefix code (Huffman) tables |

The reference C Brotli implementation is ~15,000 lines. Vex achieves the same in ~660 lines — a **96% reduction**.
