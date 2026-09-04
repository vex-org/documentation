# io — composable byte I/O

The `io` package is the shared byte-I/O layer for files, streams, protocols,
serializers and loggers. It provides separate synchronous and
cancellation-aware async contracts, reusable buffering, bounded input APIs and
a portable error model.

```vex
import {
    Reader, Writer, ByteReader, ByteWriter, StringWriter,
    BufReader, BufWriter, bufReader, bufWriter,
    IoError, IoErrorKind
} from "io";
```

## Contracts

```vex
contract Reader {
    read(buf: Ptr<u8!>, len: usize)!: Result<usize, IoError>;
}

contract Writer {
    write(data: Ptr<u8>, len: usize)!: Result<usize, IoError>;
    flush()!: Result<(), IoError>;
}

contract ReaderAt {
    // Never changes the source's sequential cursor.
    readAt(buf: Ptr<u8!>, len: usize, offset: u64)!: Result<usize, IoError>;
}

contract WriterAt {
    // Never changes the sink's sequential cursor.
    writeAt(data: Ptr<u8>, len: usize, offset: u64)!: Result<usize, IoError>;
}

contract ByteReader {
    readByte()!: Result<u8, IoError>;
}

contract ByteWriter {
    writeByte(value: u8)!: Result<(), IoError>;
}

contract StringWriter {
    writeStr(value: str)!: Result<usize, IoError>;
}

contract AsyncReader {
    async fn read(buf: Ptr<u8!>, len: usize, context: &Context): Result<usize, IoError>;
}

contract AsyncWriter {
    async fn write(data: Ptr<u8>, len: usize, context: &Context): Result<usize, IoError>;
}
```

`Reader` writes into caller-owned mutable storage. `Writer` only borrows its
input for the duration of the call. A zero-byte read means EOF; a writer may
accept a partial prefix. Use `writeAll` when the complete input must be written.

The package also exports `Seeker`, `Closer` and composed contracts such as
`ReadWriter`, `ReadReaderAt`, `WriteWriterAt`, `ReadSeeker`,
`ReadWriteSeeker`, `ReadWriteRandom` and `ReadWriteCloser`.

`ReaderAt` and `WriterAt` are not "seek, perform an operation, then seek
back" wrappers. They are for sources that can honour an offset without
changing their shared sequential cursor. `Cursor` implements both today;
future file and memory-mapped providers can use the identical contract.

## Async transports

`AsyncReader`, `AsyncWriter` and `AsyncReadWriter` are deliberately not
aliases for synchronous `Reader`/`Writer`. Their mandatory `Context` preserves
cancellation and deadline propagation for every operation that can park a Vex
task. Files, memory buffers and stdio remain free of scheduler overhead.

`TcpStream` implements `AsyncReadWriter`. Generic protocol code can use the
same surface today and later accept TLS or QUIC adapters without a second
read/write loop:

```vex
import { AsyncWriter, IoError, asyncWriteAll } from "io";
import { Context } from "context";

async fn sendFrame<W>(out: &W, bytes: str, request: &Context): Result<(), IoError>
where W: AsyncWriter {
    return await asyncWriteAll(out, bytes.asPtr() as Ptr<u8>, bytes.len(), request);
}
```

`asyncWriteAll` is allocation-free, accepts legal short writes, forwards the
same context on every retry, and turns a zero-byte successful write into
`IoErrorKind.WriteZero` rather than spinning. This is the canonical complete
write helper for HTTP/TLS-style transports.

When an API accepts an async callback (for example, a future HTTP streaming
body producer), use `async fn` in the function type instead of spelling a
nominal `Future` return type:

```vex
type ByteProducer = async fn(out: Ptr<u8!>, cap: usize): usize
```

Calling `ByteProducer` yields the compiler-owned `Future<usize>` and therefore
must be awaited. This keeps scheduler ownership structural and prevents a
user-defined type named `Future` from accidentally gaining runtime semantics.

## Position-independent random access

```vex
import { cursorFromString, readExactAt, sectionReader, SeekFrom } from "io";

let! source = cursorFromString("0123456789".toString());
let header: [u8; 4] = [0; 4];
let _ = readExactAt(&source, &header[0] as Ptr<u8!>, header.len(), 2);
// source.position() is still 0.

let! body = sectionReader(&source, 3, 4).unwrap(); // visible bytes: 3456
let _ = body.seek(SeekFrom.End(-1));
```

`readAt` may return a short count at the end of the visible range, just like
`Reader.read`; use `readExactAt` for fixed binary records. `writeAllAt` retries
partial random writes and rejects zero progress. `SectionReader` bounds every
read and seek to `[start, start + length)`, checks range overflow at creation,
and never mutates the inner reader's cursor.

## Files and streams

```vex
import { openRead, openWrite, readToStringLimit, writeAll } from "io";

match openRead("config.txt".toString()) {
    Ok(stream) => {
        let! input = stream;
        match readToStringLimit(&input, 1024 * 1024) {
            Ok(text) => { $println(text); },
            Err(err) => { $panic(err.toString()); },
        }
        let _ = input.close();
    },
    Err(err) => { $panic(err.toString()); },
}
```

`openRead`, `openWrite` and `openAppend` return `Stream`. Owned streams close on
drop; `close()` is idempotent and should be used when flush/close errors matter.
`stdin()`, `stdout()` and `stderr()` return runtime-owned stream wrappers and
are not closed by their wrappers.

## Generic buffering

`BufReader<R>` and `BufWriter<W>` hold a caller-owned reference to the
underlying implementation and use a private 16 KiB buffer. Dispatch remains
static—there is no trait object or per-operation heap allocation. Large reads
and writes bypass the intermediate buffer.

```vex
let! source = openRead("records.txt".toString()).unwrap();
let! reader = bufReader(&source);
let! lineBytes = Vec.withCapacity<u8>(4096);

loop {
    match reader.readLineInto(&lineBytes, 1024 * 1024) {
        Ok(None) => { break; },
        Ok(Some(length)) => {
            // `lineBytes` is reused; LF and an optional CR were removed.
            consumeRecord(lineBytes.asSpan());
        },
        Err(err) => { $panic(err.toString()); },
    }
}
```

`readLineInto` distinguishes EOF (`None`) from an empty line (`Some(0)`). If a
line exceeds the supplied payload limit, it returns `InvalidData` and drains
the rest of that record so the next call starts at the following line.

For binary records or non-newline text framing, use the same reusable SIMD
scan directly:

```vex
let! bytes = Vec.withCapacity<u8>(4096);
match reader.readUntilInto(&bytes, 124 as u8, 64 * 1024) {
    Ok(Some(count)) => {
        // A found delimiter is included: `bytes[count - 1] == '|'`.
        consumeFrame(bytes.asSpan());
    },
    Ok(None) => { /* EOF before another record */ },
    Err(err) => { /* limit exceeded; reader already resynchronized */ },
}
```

`skipUntil(delimiter)` performs the matching zero-allocation recovery/skip
operation and returns the consumed byte count, including the delimiter when
found. `readUntilInto` uses the same 64-byte VexArch byte-search primitive as
line scanning; no target-specific path is embedded in the package source.

Use `readLineLimit` when an owned UTF-8 string is desired:

```vex
match reader.readLineLimit(64 * 1024) {
    Ok(Some(line)) => { useLine(line); },
    Ok(None) => { /* EOF */ },
    Err(err) => { /* invalid UTF-8, limit or provider failure */ },
}
```

`BufWriter.flush()` is explicit. It retries partial writes, reports
`WriteZero`, and preserves unwritten buffered bytes after an error. No
destructor silently discards a flush failure.

## In-memory cursor

```vex
import { newCursor, SeekFrom } from "io";

let! cursor = newCursor();
let _ = cursor.writeStr("header");
let _ = cursor.seek(SeekFrom.Start(0));
let first = cursor.readByte();
```

`Cursor` implements sequential read, write, byte, string and seek contracts
plus cursor-independent `ReaderAt`/`WriterAt`. It supports reuse, zero-fills
sparse writes and safely handles input/output views that alias its own backing
storage.

## Transfer and bounded reads

```vex
copy(src, dst)                         // 16 KiB convenience scratch
copyBuffer(src, dst, scratch, length) // caller-owned, allocation-free core
copyN(src, dst, maximum)
writeAll(dst, data, length)

readAll(src)
readAllLimit(src, maximum)
readAtLeast(src, buffer, length, minimum)
readExact(src, buffer, length)
readExactAt(src, buffer, length, offset)
writeAllAt(dst, data, length, offset)
readToStringLimit(src, maximum)
```

Prefer bounded variants for files supplied by users, network input and parser
front ends. `copyBuffer` lets large applications use stack, arena or pooled
scratch storage without a hidden allocation.

## Adapters

- `emptyReader()` is permanently at EOF.
- `sinkWriter()` accepts and discards bytes without allocation.
- `chainReader(a, b)` reads `a` to EOF and then `b`.
- `teeReader(reader, writer)` mirrors every returned byte.
- `countingReader` and `countingWriter` expose checked `u64` totals.
- `limitReader(reader, maximum)` exposes at most the configured byte count.

All adapters are generic and statically dispatched.

## Errors

`IoError.kind()` returns a portable `IoErrorKind`; `osCode()` preserves the
VexArch-normalized native code and `messageView()` returns diagnostic text
without allocating. Common kinds include:

- `NotFound`, `PermissionDenied`, `AlreadyExists`;
- `WouldBlock`, `Interrupted`, `TimedOut`;
- `UnexpectedEof`, `WriteZero`, `InvalidInput`, `InvalidData`;
- connection, address, filesystem-capacity and resource-limit failures.

Only `Interrupted` and `WouldBlock` are reported by `isRetryable()`.

## Standard I/O helpers

```vex
printStr("without newline")
eprint("diagnostic")
eprintln("diagnostic with newline")

match readLineLimit(64 * 1024) {
    Ok(line) => { useLine(line); },
    Err(err) => { $panic(err.toString()); },
}
```

The simple stdin `readLine()` returns an owned `string`, so EOF and an empty
line are both represented by `""`. Use `BufReader.readLineInto` or
`BufReader.readLineLimit` when a protocol needs to distinguish them.

## Performance and safety notes

- Reusable Cursor, buffering and `copyBuffer` paths allocate no memory.
- ASCII UTF-8 validation and byte scanning use target-independent Vex
  fixed-array/Mask operations; the backend selects CPU SIMD or GPU/SIMT
  lowering.
- Non-empty null buffers, oversized provider counts, counter overflows and
  zero-progress writes are rejected.
- `std/io` does not import libc directly. Native behavior enters through the
  selected VexArch provider, preserving Vex's freestanding core.
