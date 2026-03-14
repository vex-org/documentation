# fs — Overview

The `fs` module provides a comprehensive suite for file system operations. It offers synchronous and async I/O, buffered readers/writers, directory traversal, path manipulation, file metadata, and permission management — all natively integrated with Vex's async runtime.

# fs — Overview

The current `fs` surface exports:

- `Path`
- `Permissions`
- `File`, `openFile`, `createFile`, `openReadWrite`, `openAppend`, `tempFile`
- one-shot helpers such as `readFile`, `writeFile`, `appendFile`, `copyFile`, `renameFile`, `removeFile`, `exists`, `mkdir`, `rmdir`, `cwd`, `chdir`, `chmod`
- stat helpers such as `stat`, `lstat`, `fileSize`, `modTime`
- directory helpers such as `readDir`, `readDirVec`, `readDirPage`, `mkdirAll`, `removeAll`, `walkDir`

## Example

```vex
match readFile("config.toml") {
    Ok(content) => $println(content),
    Err(_) => $println("read failed")
}
```

This page intentionally avoids `unwrap()`-style examples and other Rust-leaning helper names that do not reflect the current Vex stdlib surface.
    
