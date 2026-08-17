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
  positional reads, seeking, metadata, sync and mapping.
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

## Platform boundary

Paths are public UTF-8 values. Windows providers use wide Win32 APIs and
preserve drive-relative, rooted and UNC semantics. macOS and Linux use explicit
target-routed providers. Native structs, handles, errno values and libc
constants do not escape the package.

