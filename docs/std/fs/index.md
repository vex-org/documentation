# fs — filesystem

The `fs` package is Vex's canonical synchronous filesystem boundary. It combines
owned file and mapping handles, portable metadata, native path handling,
directory streaming and bounded whole-file helpers. Byte I/O composes with the
contracts and adapters from `io`; `fs` does not maintain a second buffering
stack.

```vex
import { Path, readFileLimit } from "fs";

let config = Path("config/../config/app.toml").clean();
match readFileLimit(config.toString(), 1024 as usize * 1024 as usize) {
    Ok(content) => $println(content),
    Err(error) => $println(error.toString()),
}
```

## Public areas

- `Path`: lexical cleaning, joining and inspection plus filesystem
  canonicalization.
- `OpenOptions` and `File`: validated opening, RAII descriptors, partial I/O,
  `ReaderAt`/`WriterAt` positional I/O, seeking, metadata, sync and mapping.
- Whole-file helpers: complete and explicitly bounded byte/string reads,
  writes, appends, copy, rename and removal.
- `Metadata`, `FileType` and `Permissions`: one portable surface over
  macOS, Linux and Windows providers.
- `DirCursor`, collection and pagination helpers: bounded O(n) traversal,
  recursive walk/create/remove and temporary-directory lookup.
- Links and temporary files: native symlink, hard-link, readlink and
  race-resistant temporary-file operations.

## Error and limit policy

Operations that can fail return `Result<_, IoError>`. `tryExists` preserves
permission and provider failures; `exists` intentionally collapses them to
`false` as a convenience. Code reading untrusted files or directories should
prefer `readFileLimit`, `readBytesLimit`, `readDirVecLimit` or
`DirCursor` and choose an application-specific bound.

## Random-access I/O

`File` is an `io.ReaderAt` and `io.WriterAt` provider. `readAt` and `writeAt`
perform native offsetted I/O, so they do not mutate the descriptor's sequential
cursor and compose directly with `io.readExactAt`, `io.writeAllAt` and
`io.SectionReader`. This is deliberately one shared `io` contract rather than
a second filesystem-specific random-access API.

```vex
import { File } from "fs";
import { readExactAt, writeAllAt } from "io";

let! file = File.openReadWrite("archive.bin")?;
let header: [u8; 16] = [0; 16];
readExactAt(&file, &header[0]!, header.len(), 0 as u64)?;

let marker: [u8; 2] = [0x56 as u8, 0x58 as u8];
writeAllAt(&file, &marker[0], marker.len(), 64 as u64)?;
```

An append-mode handle intentionally rejects `writeAt`: append semantics and an
explicit offset cannot have one portable meaning across all targets. Use
`File.openReadWrite` when an offset is part of the operation.

## Platform boundary

Paths are public UTF-8 values. Windows providers use wide Win32 APIs and
preserve drive-relative, rooted and UNC semantics. macOS and Linux use explicit
target-routed providers. Native structs, handles, errno values and libc
constants do not escape the package.
