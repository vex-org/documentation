# Paths and directories

## Path

`Path` is an owned native-path value. `clean()` performs lexical O(n)
normalization without consulting the filesystem; `canonicalize()` resolves
the filesystem, follows links according to the native provider and returns an
absolute path or an `IoError`.

```vex
import { Path } from "fs";

let source = Path("src/./frontend/../main.vx").clean();
$println(source.toString()); // src/main.vx

match source.canonicalize() {
    Ok(absolute) => $println(absolute.toString()),
    Err(error) => $println(error.toString()),
}
```

The surface includes `asStr`, `len`, `join`, `parent`, `fileName`,
`extension`, `stem`, `withExtension`, `components`, `exists`,
`isReadable`, `isWritable`, `isAbsolute`, `isRelative`, `isDir`,
`isFile` and `isSymlink`.

Windows behavior is native rather than POSIX-shaped: drive-relative paths,
rooted paths, mixed separators and UNC prefixes remain distinct. Public paths
stay UTF-8 while the provider uses UTF-16 wide Win32 APIs.

## Directory collection

- `readDir` fills caller-provided `DirList` storage.
- `readDirVecLimit` collects at most an explicit number of entries.
- `readDirVec` collects the full directory and is intended for trusted sizes.
- `readDirPage` provides stateless offset/limit pagination.

Dot entries are excluded. Provider counts are validated before Vec lengths are
committed.

## Streaming traversal

`DirCursor` is the preferred API for large or untrusted directories. It opens
the provider once, advances monotonically in O(n), and closes automatically.

```vex
import { DirCursor } from "fs";

match DirCursor.open(".", 256 as usize) {
    Ok(cursor) => {
        let! stream = cursor;
        match stream.nextPage() {
            Ok(entries) => $println(entries.len()),
            Err(error) => $println(error.toString()),
        }
        let _ = stream.close();
    },
    Err(error) => $println(error.toString()),
}
```

`mkdirAll`, `removeAll` and `walkDir` provide recursive operations.
`walkDir` stops when its callback returns `false` and reports whether the
walk completed.

