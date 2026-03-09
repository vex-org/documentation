# io — Core I/O Abstractions

The `io` module defines the fundamental I/O contracts (`Reader`, `Writer`, `Seeker`, `Closer`) and provides stdio, streams, cursors, and utility functions.

## Contracts

Every I/O source in Vex implements one or more of these contracts:

```rust
contract Reader     { read(buf: Span<u8>): Result<usize, IoError>; }
contract Writer     { write(data: Span<u8>): Result<usize, IoError>; }
contract Seeker     { seek(offset: i64, whence: SeekFrom): Result<i64, IoError>; }
contract Closer     { close(): Result<(), IoError>; }
```

Compound contracts for convenience:

| Contract | Combines |
|----------|----------|
| `ReadWriter` | `Reader` + `Writer` |
| `ReadSeeker` | `Reader` + `Seeker` |
| `WriteSeeker` | `Writer` + `Seeker` |
| `ReadWriteSeeker` | `Reader` + `Writer` + `Seeker` |
| `ReadCloser` | `Reader` + `Closer` |
| `WriteCloser` | `Writer` + `Closer` |
| `ReadWriteCloser` | `Reader` + `Writer` + `Closer` |

## Standard I/O (`stdio`)

```rust
import { stdin, stdout, stderr, print, println, readLine, prompt } from "io";

println("Hello, Vex!");
eprint("Warning!");
eprintln("Error message");

let line = readLine();
let name = prompt("Enter name: ");

// Typed output
printInt(42);
printFloat(3.14);
printBool(true);
```

## Streams (Buffered File I/O)

```rust
import { Stream, openRead, openWrite, openAppend } from "io";

let r = openRead("/etc/hosts");
let w = openWrite("/tmp/output.txt");
let a = openAppend("/var/log/app.log");
```

## Cursor (In-Memory I/O)

An in-memory buffer implementing `Reader`/`Writer`/`Seeker`:

```rust
import { Cursor, newCursor, cursorFromBytes, cursorFromString } from "io";

let c = cursorFromString("Hello, World!");
// Read from cursor as if it were a file
```

## Utilities

| Function | Description |
|----------|-------------|
| `copy(dst, src)` | Copy all bytes from Reader to Writer |
| `copyN(dst, src, n)` | Copy at most N bytes |
| `readAll(reader)` | Read entire Reader into `Vec<u8>` |
| `readToString(reader)` | Read entire Reader into string |
| `readFileToString(path)` | Read file path into string |
| `discard(reader, n)` | Discard N bytes |
| `limitReader(reader, n)` | Wrap Reader to read at most N bytes |

## Error Types

```rust
import { IoError, IoErrorKind } from "io";

// Constructors
notFound(msg)         // File not found
permissionDenied(msg) // Access denied
unexpectedEof(msg)    // Premature end of input
invalidInput(msg)     // Bad argument
invalidData(msg)      // Corrupt data
timedOut(msg)         // I/O timeout
fromOsError(errno)    // From OS errno
```
