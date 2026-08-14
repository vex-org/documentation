# LZ4 (`compress/lz4`)

Ultra-fast lossless compression with best-in-class speed. LZ4 is the go-to algorithm when decompression speed matters more than compression ratio—ideal for real-time streaming, game assets, and in-memory caching.

## Usage

```vex
import { compress, decompress, maxCompressedSize } from "compress/lz4";

let data = "Hello, Vex compression!";
let ptr = data.asPtr() as Ptr<Opaque>;
let len = data.len() as i64;

// Compress
let outCap = maxCompressedSize(len);
let comp = Mem.allocCompat(outCap as u64);
let compLen = compress(ptr, len, comp, outCap);

// Decompress
let decomp = Mem.allocCompat(len as u64);
let decompLen = decompress(comp, compLen, decomp, len);

Mem.freeCompat(comp);
Mem.freeCompat(decomp);
```

## API

| Function | Description |
|----------|-------------|
| `compress(src, srcLen, dst, dstCap): i64` | Compress data into LZ4 block format |
| `decompress(src, srcLen, dst, dstCap): i64` | Decompress LZ4 block |
| `maxCompressedSize(srcLen): i64` | Max output buffer size for allocation |

## Implementation

LZ4 uses a hash table for matching. The Vex implementation fits in ~350 lines vs ~2,000 lines in C, while remaining fully optimizable by the LLVM backend.
