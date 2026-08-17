# io — composable byte I/O

The `io` package is the shared synchronous I/O layer for files, streams,
protocols, serializers and loggers. It provides small statically dispatched
contracts, reusable buffering, bounded input APIs and a portable error model.

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

contract ByteReader {
    readByte()!: Result<u8, IoError>;
}

contract ByteWriter {
    writeByte(value: u8)!: Result<(), IoError>;
}

contract StringWriter {
    writeStr(value: str)!: Result<usize, IoError>;
}
```

`Reader` writes into caller-owned mutable storage. `Writer` only borrows its
input for the duration of the call. A zero-byte read means EOF; a writer may
accept a partial prefix. Use `writeAll` when the complete input must be written.

The package also exports `Seeker`, `Closer` and composed contracts such as
`ReadWriter`, `ReadSeeker`, `ReadWriteSeeker` and `ReadWriteCloser`.

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

`Cursor` implements read, write, byte, string and seek contracts. It supports
reuse, zero-fills sparse writes and safely handles input/output views that
alias its own backing storage.

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
