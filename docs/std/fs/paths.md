# Paths & Directories (`fs/path`, `fs/dir`)

## `Path`

Current `Path` is a value type with methods such as:

- `join(...)`
- `parent()`
- `fileName()`
- `extension()`
- `stem()`
- `exists()`
- `isReadable()` / `isWritable()`
- `isAbsolute()` / `isRelative()`
- `isDir()` / `isFile()` / `isSymlink()`
- `canonicalize()`
- `withExtension(...)`

## Directory Helpers

Current directory-facing helpers include:

- `readDir(path, &DirList!)`
- `readDirVec(path)`
- `readDirPage(path, offset, limit)`
- `mkdirAll(path)`
- `removeAll(path)`
- `walkDir(...)`

## Notes

This page intentionally avoids stale `unwrap()`-style examples and top-level function names that do not match the current exported surface.
