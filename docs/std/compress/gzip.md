# Gzip, Deflate and Zlib

The Gzip codec implements RFC 1952 framing over the package's pure-Vex Deflate
core. Zlib uses the same core with RFC 1950 framing.

## One-shot API

```vex
import {
    compress, decompress,
    CompressOptions, CompressionFormat,
} from "compress";

let encoded = compress(
    source.asSpan(),
    CompressOptions.forFormat(CompressionFormat.Gzip).withLevel(6),
)?;
let decoded = decompress(
    encoded.asSpan(),
    CompressionFormat.Gzip,
    source.len(),
)?;
```

Gzip and Zlib accept levels 1–9. The safe facade checks size arithmetic and
requires an explicit decompressed-output ceiling.

## Streaming writer

`GzipWriter` owns an `io.Stream`, incrementally tracks CRC-32/ISIZE, buffers
64 KiB Deflate chunks and propagates `IoError` from partial writes and close.

```vex
import { GzipWriter } from "compress/gzip/writer";
import { openWrite } from "io/stream";

let stream = openWrite("archive.gz")?;
let! writer = GzipWriter.new(stream, 6);
writer.write(RawBuf.of(source.asPtr()), source.len() as i64)?;
writer.close()?;
```

`close()` finalizes the Deflate stream and writes the trailer. The writer owns
the wrapped stream.

## Checksums and low-level API

`crc32` and `crc32Update` provide one-shot and incremental CRC-32. The hot path
uses the width-polymorphic `Crypto.crc32` semantic operation. Large buffers are
split into four dependency-independent 4 KiB stripes and restored to canonical
byte order with a fixed GF(2) combine matrix. The compiler selects native CRC
instructions when the target proves support; the package contains no C codec
dependency or architecture-name dispatch. `adler32`/`adler32Update` serve Zlib
framing.

Deflate match tables store positions relative to each 65,535-byte block, so
very large application streams cannot overflow a global i32 position. Level 6
uses a measured four-byte hash-fill stride inside accepted matches; levels 7-9
retain exhaustive insertion for their stronger ratio contract.

Raw `gzipCompress`/`gzipDecompress` and `zlibCompress`/`zlibDecompress` kernels
remain available to specialized callers. Ordinary code should use the typed
facade.

Official Gzip tooling validates generated streams in the interoperability gate.
