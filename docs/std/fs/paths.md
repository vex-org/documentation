# Paths & Directories (`fs/path`, `fs/dir`)

## Path Manipulation

The `path` module provides cross-platform path operations without allocations where possible.

```rust
import { join, base, ext, dir, clean, isAbsolute } from "fs/path";

join("/home/user", "docs", "file.txt")  // → "/home/user/docs/file.txt"
base("/home/user/file.txt")             // → "file.txt"
ext("archive.tar.gz")                   // → ".gz"
dir("/home/user/file.txt")              // → "/home/user"
clean("/a/b/../c/./d")                  // → "/a/c/d"
isAbsolute("/etc/hosts")                // → true
```

## Directory Operations

```rust
import { readDir, mkdir, mkdirAll, removeDir, walk } from "fs/dir";

// List directory contents
let entries = readDir("/home/user/projects").unwrap();
for entry in entries {
    println("{entry.name()} - {entry.isDir()}");
}

// Create directories
mkdir("new_folder").unwrap();
mkdirAll("deep/nested/path").unwrap();   // Creates parents

// Remove directory (must be empty)
removeDir("old_folder").unwrap();
```

## File Metadata (`stat`)

```rust
import { stat, FileInfo } from "fs";

let info = stat("myfile.txt").unwrap();
println("Size: {info.size()} bytes");
println("Modified: {info.modTime()}");
println("Is directory: {info.isDir()}");
println("Is symlink: {info.isSymlink()}");
```

## Permissions

```rust
import { chmod, Permissions } from "fs";
chmod("script.sh", Permissions.rwxr_xr_x());  // 755
```
