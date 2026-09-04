# File I/O

`File` is a move-only owning descriptor. Dropping it closes the descriptor;
`close()` is available when the error or exact release point matters and is
idempotent.

## Opening files

Use `OpenOptions` when behavior must be explicit:

```vex
import { OpenOptions } from "fs";

let options = OpenOptions.new()
    .read(true)
    .write(true)
    .create(true);

match options.open("state.bin") {
    Ok(file) => {
        let! opened = file;
        match opened.metadata() {
            Ok(info) => $println(info.len()),
            Err(error) => $println(error.toString()),
        }
        let _ = opened.close();
    },
    Err(error) => $println(error.toString()),
}
```

Available options are `read`, `write`, `append`, `truncate`, `create`,
atomic `createNew`, and the creation `mode`. Invalid combinations fail with
`IoErrorKind.InvalidInput` before a provider call. Convenience constructors
include `File.open`, `File.create`, `File.openReadWrite`,
`File.openAppend` and `File.temp`.

## Streaming operations

`File` implements the canonical `io` reader, writer, random-access reader,
random-access writer, seeker and closer contracts. Core methods include:

- `read` and `write`: partial `usize` operations;
- `readByte`, `writeByte` and `writeStr`;
- `readAt` and `writeAt`: native positional operations without changing the
  shared seek cursor;
- `seek`, `tell`, `size`, `truncate`, `flush` and `sync`;
- `metadata`, `filePath`, `isOpen` and `close`.

Use `bufReader(file)`, `bufWriter(file)`, `copyBuffer` and other `io`
adapters for reusable buffering. The filesystem package intentionally does not
carry package-local reader or writer implementations. `readExactAt`,
`writeAllAt` and `SectionReader` are likewise supplied by `io` and compose
directly with `File`.

`writeAt` intentionally rejects a `File` opened with append mode: append and
an explicit offset cannot have one portable meaning across POSIX and Windows.
Open a read/write handle when the offset is part of the operation.

## Whole-file operations

`readBytes` and `readFile` consume the complete input. For untrusted or
externally controlled files, use `readBytesLimit` or `readFileLimit`; an
oversized input is rejected instead of silently truncated. `writeFile` and
`appendFile` complete the requested write or return an error.

Other one-shot operations include `copyFile`, `renameFile`, `removeFile`,
`createDir`, `removeDir`, `cwd`, `chdir`, `changeMode`,
`createSymlink`, `hardlink` and `readSymlink`.

## Memory mapping

`mapRead` returns an owning `MappedRegion` with bounds-checked `readByte`
and `copyTo`. The mapping is automatically released. Raw `mmap`/`munmap`
methods remain explicit unsafe compatibility boundaries for low-level code.
