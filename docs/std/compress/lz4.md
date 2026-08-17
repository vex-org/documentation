# LZ4

LZ4 is the low-latency choice for caches, transport buffers and transient data.
The package supports both raw blocks and interoperable LZ4 frames.

## Safe frame API

```vex
import {
    compress, decompress,
    CompressOptions, CompressionFormat,
} from "compress";

let encoded = compress(
    source.asSpan(),
    CompressOptions.forFormat(CompressionFormat.Lz4),
)?;
let decoded = decompress(
    encoded.asSpan(),
    CompressionFormat.Lz4,
    source.len(),
)?;
```

The facade writes LZ4 frames, validates headers and XXH32 checksums, supports
multi-block payloads and enforces the caller's output limit.

## Streaming writer

`Lz4Writer` owns an `io.Stream`, writes the frame header lazily, divides input
into bounded blocks and propagates `IoError`.

```vex
import { Lz4Writer } from "compress/lz4/writer";
import { openWrite } from "io/stream";

let stream = openWrite("payload.lz4")?;
let! writer = Lz4Writer.new(stream);
writer.write(payload.asStr())?;
writer.close()?;
```

The current streaming writer emits valid uncompressed LZ4 frame blocks. The
one-shot facade chooses compressed or raw blocks according to size.

## Low-level API

`compress`/`decompress` in the `compress/lz4` submodule operate on raw LZ4
blocks. `compressFrame`/`decompressFrame` operate on frames;
`maxCompressedSize` and `maxFrameCompressedSize` provide destination bounds.
These `RawBuf` functions are intended for codec implementers.

Generated frames are checked by the official LZ4 tool and round-tripped against
the original bytes.
