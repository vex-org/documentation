# fs — Overview

The `fs` module provides a comprehensive suite for file system operations. It offers synchronous and async I/O, buffered readers/writers, directory traversal, path manipulation, file metadata, and permission management — all natively integrated with Vex's async runtime.

## Module Map

| File | Purpose |
|------|---------|
| `file.vx` | Core `File` type — open, read, write, seek, close |
| `bufio.vx` | `BufReader` and `BufWriter` for efficient I/O |
| `dir.vx` | Directory operations — readDir, mkdir, walk |
| `path.vx` | Path manipulation — join, base, ext, dir, clean |
| `stat.vx` | File metadata — size, modification time, type |
| `permissions.vx` | Unix permission bits (chmod-style) |
| `sys.vx` | Low-level syscall wrappers |
| `native.vxc` | FFI declarations for POSIX/Win32 |

## Quick Example

```rust
import { File, readToString, writeToFile } from "fs";

fn main() {
    // Read entire file
    let content = readToString("config.toml").unwrap();
    
    // Write to file
    writeToFile("output.txt", "Hello, FS!".asBytes()).unwrap();
    
    // Buffered streaming read
    let file = File.open("huge_log.txt").unwrap();
    let! buf = Vec.withCapacity<u8>(4096);
    while let Ok(n) = file.read(buf.asMutSpan()) {
        if n == 0 { break; }
        // process chunk...
    }
}
```
