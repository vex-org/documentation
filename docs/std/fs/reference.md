# Project v0.0.0

## Overview

**Structs:** [`File`](#File) · [`BufReader`](#BufReader) · [`BufWriter`](#BufWriter) · [`Lines`](#Lines) · [`FileInfo`](#FileInfo) · [`Permissions`](#Permissions) · [`Path`](#Path) · [`DirEntry`](#DirEntry) · [`DirList`](#DirList) · [`DirCursor`](#DirCursor)

**Functions:** [`_openFile`](#_openFile) · [`_createFile`](#_createFile) · [`_openReadWrite`](#_openReadWrite) · [`_openAppend`](#_openAppend) · [`openFile`](#openFile) · [`createFile`](#createFile) · [`openReadWrite`](#openReadWrite) · [`openAppend`](#openAppend) · [`readFile`](#readFile) · [`writeFile`](#writeFile) · [`appendFile`](#appendFile) · [`copyFile`](#copyFile) · [`renameFile`](#renameFile) · [`removeFile`](#removeFile) · [`exists`](#exists) · [`mkdir`](#mkdir) · [`rmdir`](#rmdir) · [`cwd`](#cwd) · [`chdir`](#chdir) · [`chmod`](#chmod) · [`_tempFile`](#_tempFile) · [`tempFile`](#tempFile) · [`symlink`](#symlink) · [`hardlink`](#hardlink) · [`readlink`](#readlink) · [`stat`](#stat) · [`lstat`](#lstat) · [`pathIsDir`](#pathIsDir) · [`pathIsFile`](#pathIsFile) · [`pathIsSymlink`](#pathIsSymlink) · [`fileSize`](#fileSize) · [`modTime`](#modTime) · [`pathPermissions`](#pathPermissions) · [`accessTime`](#accessTime) · [`creationTime`](#creationTime) · [`linkCount`](#linkCount) · [`Permissions`](#Permissions) · [`path_last_index_of_byte`](#path_last_index_of_byte) · [`Path`](#Path) · [`dirReadAt`](#dirReadAt) · [`emptyDirEntry`](#emptyDirEntry) · [`readDir`](#readDir) · [`mkdirAll`](#mkdirAll) · [`removeAll`](#removeAll) · [`tempDir`](#tempDir) · [`readDirVecLimit`](#readDirVecLimit) · [`readDirVec`](#readDirVec) · [`readDirPage`](#readDirPage) · [`newDirCursor`](#newDirCursor) · [`walkDir`](#walkDir)

**Constants:** [`BUF_SIZE`](#BUF_SIZE) · [`O_RDONLY`](#O_RDONLY) · [`O_WRONLY`](#O_WRONLY) · [`O_RDWR`](#O_RDWR) · [`O_CREAT`](#O_CREAT) · [`O_EXCL`](#O_EXCL) · [`O_TRUNC`](#O_TRUNC) · [`O_APPEND`](#O_APPEND) · [`O_NONBLOCK`](#O_NONBLOCK) · [`O_DIRECTORY`](#O_DIRECTORY) · [`SEEK_SET`](#SEEK_SET) · [`SEEK_CUR`](#SEEK_CUR) · [`SEEK_END`](#SEEK_END) · [`PROT_READ`](#PROT_READ) · [`PROT_WRITE`](#PROT_WRITE) · [`MAP_SHARED`](#MAP_SHARED) · [`MAP_PRIVATE`](#MAP_PRIVATE) · [`MAP_FAILED`](#MAP_FAILED) · [`F_OK`](#F_OK) · [`R_OK`](#R_OK) · [`W_OK`](#W_OK) · [`X_OK`](#X_OK) · [`S_IFMT`](#S_IFMT) · [`S_IFDIR`](#S_IFDIR) · [`S_IFREG`](#S_IFREG) · [`S_IFLNK`](#S_IFLNK) · [`DT_UNKNOWN`](#DT_UNKNOWN) · [`DT_DIR`](#DT_DIR) · [`DT_REG`](#DT_REG) · [`DT_LNK`](#DT_LNK) · [`DEFAULT_READDIR_MAX`](#DEFAULT_READDIR_MAX) · [`DEFAULT_PAGE_SIZE`](#DEFAULT_PAGE_SIZE) · [`READDIR_VEC_CHUNK`](#READDIR_VEC_CHUNK)

## Constants

### <a id="BUF_SIZE"></a>`BUF_SIZE`

&gt; 📄 `bufio.vx` L31-31

```vex
const BUF_SIZE: usize=8192;
```

**Returns:** `usize=8192;`

---

### <a id="O_RDONLY"></a>`O_RDONLY` `🔓 export`

&gt; 📄 `sys.vx` L4-4

```vex
export const O_RDONLY: i32=0x0000;
```

**Returns:** `i32=0x0000;`

---

### <a id="O_WRONLY"></a>`O_WRONLY` `🔓 export`

&gt; 📄 `sys.vx` L5-5

```vex
export const O_WRONLY: i32=0x0001;
```

**Returns:** `i32=0x0001;`

---

### <a id="O_RDWR"></a>`O_RDWR` `🔓 export`

&gt; 📄 `sys.vx` L6-6

```vex
export const O_RDWR: i32=0x0002;
```

**Returns:** `i32=0x0002;`

---

### <a id="O_CREAT"></a>`O_CREAT` `🔓 export`

&gt; 📄 `sys.vx` L7-7

```vex
export const O_CREAT: i32=0x0040;
```

**Returns:** `i32=0x0040;`

---

### <a id="O_EXCL"></a>`O_EXCL` `🔓 export`

&gt; 📄 `sys.vx` L8-8

```vex
export const O_EXCL: i32=0x0080;
```

**Returns:** `i32=0x0080;`

---

### <a id="O_TRUNC"></a>`O_TRUNC` `🔓 export`

&gt; 📄 `sys.vx` L9-9

```vex
export const O_TRUNC: i32=0x0200;
```

**Returns:** `i32=0x0200;`

---

### <a id="O_APPEND"></a>`O_APPEND` `🔓 export`

&gt; 📄 `sys.vx` L10-10

```vex
export const O_APPEND: i32=0x0400;
```

**Returns:** `i32=0x0400;`

---

### <a id="O_NONBLOCK"></a>`O_NONBLOCK` `🔓 export`

&gt; 📄 `sys.vx` L11-11

```vex
export const O_NONBLOCK: i32=0x0800;
```

**Returns:** `i32=0x0800;`

---

### <a id="O_DIRECTORY"></a>`O_DIRECTORY` `🔓 export`

&gt; 📄 `sys.vx` L12-12

```vex
export const O_DIRECTORY: i32=0x10000;
```

**Returns:** `i32=0x10000;`

---

### <a id="SEEK_SET"></a>`SEEK_SET` `🔓 export`

&gt; 📄 `sys.vx` L15-15

```vex
export const SEEK_SET: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="SEEK_CUR"></a>`SEEK_CUR` `🔓 export`

&gt; 📄 `sys.vx` L16-16

```vex
export const SEEK_CUR: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="SEEK_END"></a>`SEEK_END` `🔓 export`

&gt; 📄 `sys.vx` L17-17

```vex
export const SEEK_END: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="PROT_READ"></a>`PROT_READ` `🔓 export`

&gt; 📄 `sys.vx` L20-20

```vex
export const PROT_READ: i32=0x1;
```

**Returns:** `i32=0x1;`

---

### <a id="PROT_WRITE"></a>`PROT_WRITE` `🔓 export`

&gt; 📄 `sys.vx` L21-21

```vex
export const PROT_WRITE: i32=0x2;
```

**Returns:** `i32=0x2;`

---

### <a id="MAP_SHARED"></a>`MAP_SHARED` `🔓 export`

&gt; 📄 `sys.vx` L22-22

```vex
export const MAP_SHARED: i32=0x1;
```

**Returns:** `i32=0x1;`

---

### <a id="MAP_PRIVATE"></a>`MAP_PRIVATE` `🔓 export`

&gt; 📄 `sys.vx` L23-23

```vex
export const MAP_PRIVATE: i32=0x2;
```

**Returns:** `i32=0x2;`

---

### <a id="MAP_FAILED"></a>`MAP_FAILED` `🔓 export`

&gt; 📄 `sys.vx` L24-24

```vex
export const MAP_FAILED: i64=-1;
```

**Returns:** `i64=-1;`

---

### <a id="F_OK"></a>`F_OK` `🔓 export`

&gt; 📄 `sys.vx` L27-27

```vex
export const F_OK: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="R_OK"></a>`R_OK` `🔓 export`

&gt; 📄 `sys.vx` L28-28

```vex
export const R_OK: i32=4;
```

**Returns:** `i32=4;`

---

### <a id="W_OK"></a>`W_OK` `🔓 export`

&gt; 📄 `sys.vx` L29-29

```vex
export const W_OK: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="X_OK"></a>`X_OK` `🔓 export`

&gt; 📄 `sys.vx` L30-30

```vex
export const X_OK: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="S_IFMT"></a>`S_IFMT` `🔓 export`

&gt; 📄 `sys.vx` L32-32

```vex
export const S_IFMT: u32=0o170000;
```

**Returns:** `u32=0o170000;`

---

### <a id="S_IFDIR"></a>`S_IFDIR` `🔓 export`

&gt; 📄 `sys.vx` L33-33

```vex
export const S_IFDIR: u32=0o040000;
```

**Returns:** `u32=0o040000;`

---

### <a id="S_IFREG"></a>`S_IFREG` `🔓 export`

&gt; 📄 `sys.vx` L34-34

```vex
export const S_IFREG: u32=0o100000;
```

**Returns:** `u32=0o100000;`

---

### <a id="S_IFLNK"></a>`S_IFLNK` `🔓 export`

&gt; 📄 `sys.vx` L35-35

```vex
export const S_IFLNK: u32=0o120000;
```

**Returns:** `u32=0o120000;`

---

### <a id="DT_UNKNOWN"></a>`DT_UNKNOWN` `🔓 export`

&gt; 📄 `sys.vx` L38-38

```vex
export const DT_UNKNOWN: u8=0;
```

**Returns:** `u8=0;`

---

### <a id="DT_DIR"></a>`DT_DIR` `🔓 export`

&gt; 📄 `sys.vx` L39-39

```vex
export const DT_DIR: u8=4;
```

**Returns:** `u8=4;`

---

### <a id="DT_REG"></a>`DT_REG` `🔓 export`

&gt; 📄 `sys.vx` L40-40

```vex
export const DT_REG: u8=8;
```

**Returns:** `u8=8;`

---

### <a id="DT_LNK"></a>`DT_LNK` `🔓 export`

&gt; 📄 `sys.vx` L41-41

```vex
export const DT_LNK: u8=10;
```

**Returns:** `u8=10;`

---

### <a id="DEFAULT_READDIR_MAX"></a>`DEFAULT_READDIR_MAX`

&gt; 📄 `dir.vx` L75-75

```vex
const DEFAULT_READDIR_MAX: usize=4096;
```

**Returns:** `usize=4096;`

---

### <a id="DEFAULT_PAGE_SIZE"></a>`DEFAULT_PAGE_SIZE`

&gt; 📄 `dir.vx` L76-76

```vex
const DEFAULT_PAGE_SIZE: usize=128;
```

**Returns:** `usize=128;`

---

### <a id="READDIR_VEC_CHUNK"></a>`READDIR_VEC_CHUNK`

&gt; 📄 `dir.vx` L77-77

```vex
const READDIR_VEC_CHUNK: usize=64;
```

**Returns:** `usize=64;`

---

## Structs

### <a id="File"></a>`File` `🔓 export`

&gt; 📄 `file.vx` L8-12

```vex
export struct File
```

**Implements:** `Drop` & `Display` & `Debug`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `path` | `string` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `File.open`[↗](#File.open) | `export fn File.open(path: string): Result&lt;File, St` | Open an existing file for reading. |
| `File.create`[↗](#File.create) | `export fn File.create(path: string): Result&lt;File, ` | Create a new file for writing (or truncate if it already exists). |
| `File.openReadWrite`[↗](#File.openReadWrite) | `export fn File.openReadWrite(path: string): Result` | Open an existing file for reading and writing. |
| `File.openAppend`[↗](#File.openAppend) | `export fn File.openAppend(path: string): Result&lt;Fi` | Open or create a file for appending data. |
| `read`[↗](#File.read) | `export fn (self: &File) read(buf: &u8 !, len: u64)` | Read up to `len` bytes into buffer. Returns bytes read. |
| `pread`[↗](#File.pread) | `export fn (self: &File) pread(buf: &u8 !, len: u64` | Positional read — read at offset without changing file position. |
| `write`[↗](#File.write) | `export fn (self: &File) write(buf: &u8, len: u64):` | Write `len` bytes from buffer. Returns bytes written. |
| `writeString`[↗](#File.writeString) | `export fn (self: &File) writeString(s: string): Re` | Write a string to the file. Returns bytes written. |
| `seek`[↗](#File.seek) | `export fn (self: &File) seek(offset: i64, whence: ` | Seek to absolute/relative position. whence: SEEK_SET, SEEK_CUR, SEEK_END. |
| `tell`[↗](#File.tell) | `export fn (self: &File) tell(): Result&lt;i64, StdErr` | Get current file position. |
| `size`[↗](#File.size) | `export fn (self: &File) size(): Result&lt;i64, StdErr` | Get file size in bytes. |
| `truncate`[↗](#File.truncate) | `export fn (self: &File) truncate(length: u64): Res` | Truncate file to given length. |
| `sync`[↗](#File.sync) | `export fn (self: &File) sync(): Result&lt;i32, StdErr` | Flush file data to disk. |
| `close`[↗](#File.close) | `export fn (self: &File!) close(): Result&lt;i32, StdE` | Explicitly close the file. Safe to call multiple times. |
| `drop`[↗](#File.drop) | `export fn (self: &File!) drop()` | Auto-close on scope exit (Drop contract). |
| `toString`[↗](#File.toString) | `export fn (self: &File) toString(): string` | Human-readable representation (Display contract) — returns the file path. |
| `debug`[↗](#File.debug) | `export fn (self: &File) debug(): string` | Debug representation (Debug contract). |
| `filePath`[↗](#File.filePath) | `export fn (self: &File) filePath(): string` | Return the file path. |
| `isOpen`[↗](#File.isOpen) | `export fn (self: &File) isOpen(): bool` | Return true if the file is currently open (fd &gt;= 0). |
| `mmap`[↗](#File.mmap) | `export fn (self: &File) mmap(len: u64, offset: i64` | Memory-map the file for read+write access. |
| `mmapRead`[↗](#File.mmapRead) | `export fn (self: &File) mmapRead(len: u64, offset:` | Memory-map the file for read-only access (MAP_PRIVATE). |
| `munmap`[↗](#File.munmap) | `export fn (self: &File) munmap(ptr: &void!, len: u` | Unmap a memory region previously created via mmap() or mmapRead(). |
| `readAll`[↗](#File.readAll) | `export fn (self: &File) readAll(): Result&lt;Vec&lt;u8&gt;,` | Read all remaining bytes from the file into a Vec&lt;u8&gt;. |
| `File.temp`[↗](#File.temp) | `export fn File.temp(): Result&lt;File, StdError&gt;` |  |

---

### <a id="BufReader"></a>`BufReader` `🔓 export`

&gt; 📄 `bufio.vx` L33-40

```vex
export struct BufReader
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `buf` | `[u8; 8192]` | 🔓 public |  |
| `pos` | `usize` | 🔓 public |  |
| `filled` | `usize` | 🔓 public |  |
| `eof` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `BufReader.from`[↗](#BufReader.from) | `export fn BufReader.from(fd: i32): BufReader` | Create a BufReader from a file descriptor. |
| `fill`[↗](#BufReader.fill) | `fn (self: &BufReader!) fill(): i64` | Fill the internal buffer from the file. Returns bytes read. |
| `readLine`[↗](#BufReader.readLine) | `export fn (self: &BufReader!) readLine(): string` | Read a single line (up to \n or EOF). Returns empty string at EOF. |
| `read`[↗](#BufReader.read) | `export fn (self: &BufReader!) read(out: &u8 !, len` | Read up to `len` bytes into buffer. Returns bytes read. |
| `hasMore`[↗](#BufReader.hasMore) | `export fn (self: &BufReader!) hasMore(): bool` | Check if there is more data to read. |

---

### <a id="BufWriter"></a>`BufWriter` `🔓 export`

&gt; 📄 `bufio.vx` L189-194

```vex
export struct BufWriter
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `buf` | `[u8; 8192]` | 🔓 public |  |
| `pos` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `BufWriter.from`[↗](#BufWriter.from) | `export fn BufWriter.from(fd: i32): BufWriter` | Create a BufWriter from a file descriptor. |
| `flush`[↗](#BufWriter.flush) | `export fn (self: &BufWriter!) flush(): i64` | Flush the internal buffer to the file. |
| `write`[↗](#BufWriter.write) | `export fn (self: &BufWriter!) write(data: &u8, len` | Write bytes to the buffer. Flushes when full. |
| `writeString`[↗](#BufWriter.writeString) | `export fn (self: &BufWriter!) writeString(s: strin` | Write a string to the buffer. |
| `writeLine`[↗](#BufWriter.writeLine) | `export fn (self: &BufWriter!) writeLine(s: string)` | Write a string followed by a newline. |

---

### <a id="Lines"></a>`Lines` `🔓 export`

&gt; 📄 `bufio.vx` L254-259

```vex
export struct Lines
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `reader` | `BufReader` | 🔓 public |  |
| `done` | `bool` | 🔓 public |  |
| `current` | `string` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Lines.open`[↗](#Lines.open) | `export fn Lines.open(path: string): Lines` | Open a file and create a line iterator. |
| `Lines.from`[↗](#Lines.from) | `export fn Lines.from(reader: BufReader): Lines` | Create a Lines iterator from an existing BufReader. |
| `hasNext`[↗](#Lines.hasNext) | `export fn (self: &Lines!) hasNext(): bool` | Check if there are more lines to read. |
| `next`[↗](#Lines.next) | `export fn (self: &Lines!) next(): string` | Get the next line (call after hasNext() returns true). |
| `close`[↗](#Lines.close) | `export fn (self: &Lines!) close()` | Close the underlying file. |

---

### <a id="FileInfo"></a>`FileInfo` `🔓 export`

&gt; 📄 `stat.vx` L7-22

```vex
export struct FileInfo
```

**Implements:** `Display` & `Debug`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `file_size` | `i64` | 🔓 public |  |
| `mod_time` | `i64` | 🔓 public |  |
| `access_time` | `i64` | 🔓 public |  |
| `creation_time` | `i64` | 🔓 public |  |
| `perms` | `u32` | 🔓 public |  |
| `uid` | `i64` | 🔓 public |  |
| `gid` | `i64` | 🔓 public |  |
| `inode` | `i64` | 🔓 public |  |
| `dev` | `i64` | 🔓 public |  |
| `nlink` | `i64` | 🔓 public |  |
| `is_dir` | `bool` | 🔓 public |  |
| `is_file` | `bool` | 🔓 public |  |
| `is_symlink` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `toString`[↗](#FileInfo.toString) | `export fn (self: &FileInfo) toString(): string` | Human-readable kind (Display contract). |
| `debug`[↗](#FileInfo.debug) | `export fn (self: &FileInfo) debug(): string` | Debug representation (Debug contract). |
| `permissions`[↗](#FileInfo.permissions) | `export fn (self: &FileInfo) permissions(): Permiss` | Get typed permissions wrapper. |

---

### <a id="Permissions"></a>`Permissions` `🔓 export`

&gt; 📄 `permissions.vx` L13-15

```vex
export struct Permissions
```

Wraps a raw POSIX mode bitmask with ergonomic boolean helpers.

Examples:
let p = Permissions { mode: 0o644 };
p.canRead()    // true
p.canWrite()   // true  (owner)
p.canExec()    // false
p.isReadOnly() // false

**Implements:** `Display` & `Debug` & `Eq`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mode` | `u32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Permissions.readOnly`[↗](#Permissions.readOnly) | `export fn Permissions.readOnly(): Permissions` | Read-only file (0o444). |
| `Permissions.readWrite`[↗](#Permissions.readWrite) | `export fn Permissions.readWrite(): Permissions` | Read-write file (0o644). |
| `Permissions.executable`[↗](#Permissions.executable) | `export fn Permissions.executable(): Permissions` | Executable file (0o755). |
| `canRead`[↗](#Permissions.canRead) | `export fn (self: &Permissions) canRead(): bool` | True if any entity (owner/group/other) can read. |
| `canWrite`[↗](#Permissions.canWrite) | `export fn (self: &Permissions) canWrite(): bool` | True if any entity (owner/group/other) can write. |
| `canExec`[↗](#Permissions.canExec) | `export fn (self: &Permissions) canExec(): bool` | True if any entity (owner/group/other) can execute. |
| `ownerCanRead`[↗](#Permissions.ownerCanRead) | `export fn (self: &Permissions) ownerCanRead(): boo` | True if the owner can read. |
| `ownerCanWrite`[↗](#Permissions.ownerCanWrite) | `export fn (self: &Permissions) ownerCanWrite(): bo` | True if the owner can write. |
| `ownerCanExec`[↗](#Permissions.ownerCanExec) | `export fn (self: &Permissions) ownerCanExec(): boo` | True if the owner can execute. |
| `isReadOnly`[↗](#Permissions.isReadOnly) | `export fn (self: &Permissions) isReadOnly(): bool` | Convenience: no entity has write permission. |
| `rawMode`[↗](#Permissions.rawMode) | `export fn (self: &Permissions) rawMode(): u32` | Raw mode bits. |
| `op==`[↗](#Permissions.op==) | `export fn (self: Permissions) op==(rhs: Permission` |  |
| `toString`[↗](#Permissions.toString) | `export fn (self: &Permissions) toString(): string` |  |
| `debug`[↗](#Permissions.debug) | `export fn (self: &Permissions) debug(): string` |  |

---

### <a id="Path"></a>`Path` `🔓 export`

&gt; 📄 `path.vx` L6-8

```vex
export struct Path
```

**Implements:** `Display` & `Clone` & `Eq` & `Debug`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `inner` | `string` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `toString`[↗](#Path.toString) | `export fn (self: &Path) toString(): string` | String representation (Display contract). |
| `debug`[↗](#Path.debug) | `export fn (self: &Path) debug(): string` | Debug representation (Debug contract). |
| `clone`[↗](#Path.clone) | `export fn (self: &Path) clone(): Path` | Deep copy (Clone contract). |
| `op==`[↗](#Path.op==) | `export fn (self: &Path) op==(rhs: Path): bool` | Equality by inner string (Eq contract). |
| `join`[↗](#Path.join) | `export fn (self: &Path) join(other: string): Path` | Join this path with another component. |
| `parent`[↗](#Path.parent) | `export fn (self: &Path) parent(): Path` | Get the parent directory. |
| `fileName`[↗](#Path.fileName) | `export fn (self: &Path) fileName(): string` | Get the file name component (everything after last '/'). |
| `extension`[↗](#Path.extension) | `export fn (self: &Path) extension(): string` | Get the file extension (after last '.'). |
| `stem`[↗](#Path.stem) | `export fn (self: &Path) stem(): string` | Get the file stem (file name without extension). |
| `exists`[↗](#Path.exists) | `export fn (self: &Path) exists(): bool` | Check if the path exists on disk. |
| `isReadable`[↗](#Path.isReadable) | `export fn (self: &Path) isReadable(): bool` | Check if path is readable. |
| `isWritable`[↗](#Path.isWritable) | `export fn (self: &Path) isWritable(): bool` | Check if path is writable. |
| `isAbsolute`[↗](#Path.isAbsolute) | `export fn (self: &Path) isAbsolute(): bool` | Check if path is absolute (starts with '/'). |
| `isRelative`[↗](#Path.isRelative) | `export fn (self: &Path) isRelative(): bool` | Check if path is relative (not absolute). |
| `isDir`[↗](#Path.isDir) | `export fn (self: &Path) isDir(): bool` | Check if path refers to a directory. |
| `isFile`[↗](#Path.isFile) | `export fn (self: &Path) isFile(): bool` | Check if path refers to a regular file. |
| `isSymlink`[↗](#Path.isSymlink) | `export fn (self: &Path) isSymlink(): bool` | Check if path refers to a symbolic link. |
| `canonicalize`[↗](#Path.canonicalize) | `export fn (self: &Path) canonicalize(): Path` | Resolve the path to its canonical, absolute form. |
| `withExtension`[↗](#Path.withExtension) | `export fn (self: &Path) withExtension(ext: string)` | Return a new Path with the extension replaced. |
| `clean`[↗](#Path.clean) | `export fn (self: &Path) clean(): Path` | Normalize the path by resolving `.` and `..` components lexically. |
| `components`[↗](#Path.components) | `export fn (self: &Path) components(): Vec&lt;string&gt;` | Split path into its individual components. |

---

### <a id="DirEntry"></a>`DirEntry` `🔓 export`

&gt; 📄 `dir.vx` L11-17

```vex
export struct DirEntry
```

**Implements:** `Display`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name_buf` | `[u8; 256]` | 🔓 public |  |
| `entry_type` | `u8` | 🔓 public |  |
| `_pad` | `[u8; 7]` | 🔓 public |  |
| `inode` | `u64` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `name`[↗](#DirEntry.name) | `export fn (self: &DirEntry) name(): string` | Get the entry name as a string. |
| `toString`[↗](#DirEntry.toString) | `export fn (self: &DirEntry) toString(): string` | String representation (Display contract) — returns the entry name. |
| `isDir`[↗](#DirEntry.isDir) | `export fn (self: &DirEntry) isDir(): bool` | Is this entry a directory? |
| `isFile`[↗](#DirEntry.isFile) | `export fn (self: &DirEntry) isFile(): bool` | Is this entry a regular file? |
| `isSymlink`[↗](#DirEntry.isSymlink) | `export fn (self: &DirEntry) isSymlink(): bool` | Is this entry a symlink? |

---

### <a id="DirList"></a>`DirList` `🔓 export`

&gt; 📄 `dir.vx` L69-73

```vex
export struct DirList
```

Read all entries in a directory.

Returns a fixed-size buffer of up to 64 entries.
Usage:
let! list = DirList { items: uninit, count: 0 };
readDir("/tmp", &list!);
let! i: i64 = 0;
while i &lt; list.count { $println(list.items[i].name()); i = i + 1; }

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `items` | `[DirEntry; 64]` | 🔓 public |  |
| `count` | `usize` | 🔓 public |  |

---

### <a id="DirCursor"></a>`DirCursor` `🔓 export`

&gt; 📄 `dir.vx` L224-230

```vex
export struct DirCursor
```

Stateful cursor for paginated directory traversal.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `path` | `string` | 🔓 public |  |
| `offset` | `usize` | 🔓 public |  |
| `page_size` | `usize` | 🔓 public |  |
| `done` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `nextPage`[↗](#DirCursor.nextPage) | `export fn (self: &DirCursor!) nextPage(): Result&lt;V` | Fetch next page from cursor. |

---

## Functions

### <a id="_openFile"></a>`_openFile`

&gt; 📄 `file.vx` L17-23

```vex
fn _openFile(path: string): Result<File, StdError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, StdError&gt;`

---

### <a id="_createFile"></a>`_createFile`

&gt; 📄 `file.vx` L33-42

```vex
fn _createFile(path: string): Result<File, StdError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, StdError&gt;`

---

### <a id="_openReadWrite"></a>`_openReadWrite`

&gt; 📄 `file.vx` L52-58

```vex
fn _openReadWrite(path: string): Result<File, StdError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, StdError&gt;`

---

### <a id="_openAppend"></a>`_openAppend`

&gt; 📄 `file.vx` L68-77

```vex
fn _openAppend(path: string): Result<File, StdError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, StdError&gt;`

---

### <a id="openFile"></a>`openFile` `🔓 export`

&gt; 📄 `file.vx` L87-87

```vex
export fn openFile(path: string): Result<File, StdError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, StdError&gt;`

---

### <a id="createFile"></a>`createFile` `🔓 export`

&gt; 📄 `file.vx` L88-88

```vex
export fn createFile(path: string): Result<File, StdError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, StdError&gt;`

---

### <a id="openReadWrite"></a>`openReadWrite` `🔓 export`

&gt; 📄 `file.vx` L89-89

```vex
export fn openReadWrite(path: string): Result<File, StdError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, StdError&gt;`

---

### <a id="openAppend"></a>`openAppend` `🔓 export`

&gt; 📄 `file.vx` L90-90

```vex
export fn openAppend(path: string): Result<File, StdError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, StdError&gt;`

---

### <a id="readFile"></a>`readFile` `🔓 export`

&gt; 📄 `file.vx` L280-298

```vex
export fn readFile(path: string): Result<string, StdError>
```

Read entire file as string. Simple as Go's os.ReadFile.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;string, StdError&gt;`

---

### <a id="writeFile"></a>`writeFile` `🔓 export`

&gt; 📄 `file.vx` L301-311

```vex
export fn writeFile(path: string, content: string): Result<i32, StdError>
```

Write string to file (creates/truncates). Simple as Go's os.WriteFile.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `content` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="appendFile"></a>`appendFile` `🔓 export`

&gt; 📄 `file.vx` L314-324

```vex
export fn appendFile(path: string, content: string): Result<i32, StdError>
```

Append string to file (creates if needed).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `content` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="copyFile"></a>`copyFile` `🔓 export`

&gt; 📄 `file.vx` L327-333

```vex
export fn copyFile(src: string, dst: string): Result<i32, StdError>
```

Copy a file from src to dst.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `src` | `string` |  |
| `dst` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="renameFile"></a>`renameFile` `🔓 export`

&gt; 📄 `file.vx` L336-342

```vex
export fn renameFile(oldpath: string, newpath: string): Result<i32, StdError>
```

Rename/move a file.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `oldpath` | `string` |  |
| `newpath` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="removeFile"></a>`removeFile` `🔓 export`

&gt; 📄 `file.vx` L345-351

```vex
export fn removeFile(path: string): Result<i32, StdError>
```

Delete a file.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="exists"></a>`exists` `🔓 export`

&gt; 📄 `file.vx` L354-356

```vex
export fn exists(path: string): bool
```

Check if a file exists.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `bool`

---

### <a id="mkdir"></a>`mkdir` `🔓 export`

&gt; 📄 `file.vx` L363-369

```vex
export fn mkdir(path: string): Result<i32, StdError>
```

Create a directory (mode 0755).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="rmdir"></a>`rmdir` `🔓 export`

&gt; 📄 `file.vx` L372-378

```vex
export fn rmdir(path: string): Result<i32, StdError>
```

Remove an empty directory.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="cwd"></a>`cwd` `🔓 export`

&gt; 📄 `file.vx` L381-388

```vex
export fn cwd(): string
```

Get current working directory.

**Returns:** `string`

---

### <a id="chdir"></a>`chdir` `🔓 export`

&gt; 📄 `file.vx` L391-397

```vex
export fn chdir(path: string): Result<i32, StdError>
```

Change current working directory.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="chmod"></a>`chmod` `🔓 export`

&gt; 📄 `file.vx` L400-406

```vex
export fn chmod(path: string, mode: u32): Result<i32, StdError>
```

Set file permissions (chmod).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `mode` | `u32` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="_tempFile"></a>`_tempFile`

&gt; 📄 `file.vx` L415-430

```vex
fn _tempFile(): Result<File, StdError>
```

Create a unique temporary file (like Go's os.CreateTemp).

The returned File is open for read+write. Path is filled automatically.
Caller is responsible for removing the file when done.

**Returns:** `Result&lt;File, StdError&gt;`

---

### <a id="tempFile"></a>`tempFile` `🔓 export`

&gt; 📄 `file.vx` L437-437

```vex
export fn tempFile(): Result<File, StdError>
```

**Returns:** `Result&lt;File, StdError&gt;`

---

### <a id="symlink"></a>`symlink` `🔓 export`

&gt; 📄 `file.vx` L444-450

```vex
export fn symlink(target: string, linkpath: string): Result<i32, StdError>
```

Create a symbolic link pointing to `target` at `linkpath`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `target` | `string` |  |
| `linkpath` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="hardlink"></a>`hardlink` `🔓 export`

&gt; 📄 `file.vx` L453-459

```vex
export fn hardlink(oldpath: string, newpath: string): Result<i32, StdError>
```

Create a hard link from `oldpath` to `newpath`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `oldpath` | `string` |  |
| `newpath` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="readlink"></a>`readlink` `🔓 export`

&gt; 📄 `file.vx` L462-469

```vex
export fn readlink(path: string): Result<string, StdError>
```

Read the target path of a symbolic link.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;string, StdError&gt;`

---

### <a id="stat"></a>`stat` `🔓 export`

&gt; 📄 `stat.vx` L46-64

```vex
export fn stat(path: string): FileInfo
```

Get file metadata by path (follows symlinks).

let info = stat("src/main.vx");

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `FileInfo`

---

### <a id="lstat"></a>`lstat` `🔓 export`

&gt; 📄 `stat.vx` L67-85

```vex
export fn lstat(path: string): FileInfo
```

Get symlink metadata (does NOT follow symlinks).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `FileInfo`

---

### <a id="pathIsDir"></a>`pathIsDir` `🔓 export`

&gt; 📄 `stat.vx` L88-90

```vex
export fn pathIsDir(path: string): bool
```

Quick check: is path a directory?

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `bool`

---

### <a id="pathIsFile"></a>`pathIsFile` `🔓 export`

&gt; 📄 `stat.vx` L93-95

```vex
export fn pathIsFile(path: string): bool
```

Quick check: is path a regular file?

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `bool`

---

### <a id="pathIsSymlink"></a>`pathIsSymlink` `🔓 export`

&gt; 📄 `stat.vx` L98-100

```vex
export fn pathIsSymlink(path: string): bool
```

Quick check: is path a symbolic link?

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `bool`

---

### <a id="fileSize"></a>`fileSize` `🔓 export`

&gt; 📄 `stat.vx` L103-105

```vex
export fn fileSize(path: string): i64
```

Get file size by path (bytes).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `i64`

---

### <a id="modTime"></a>`modTime` `🔓 export`

&gt; 📄 `stat.vx` L108-110

```vex
export fn modTime(path: string): i64
```

Get file modification time (Unix epoch seconds).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `i64`

---

### <a id="pathPermissions"></a>`pathPermissions` `🔓 export`

&gt; 📄 `stat.vx` L112-114

```vex
export fn pathPermissions(path: string): Permissions
```

Convenience: get typed Permissions for a path.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Permissions`

---

### <a id="accessTime"></a>`accessTime` `🔓 export`

&gt; 📄 `stat.vx` L117-119

```vex
export fn accessTime(path: string): i64
```

Get file access time (Unix epoch seconds).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `i64`

---

### <a id="creationTime"></a>`creationTime` `🔓 export`

&gt; 📄 `stat.vx` L123-125

```vex
export fn creationTime(path: string): i64
```

Get file creation/birth time (Unix epoch seconds).

On Linux, returns status change time (ctime) as closest approximation.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `i64`

---

### <a id="linkCount"></a>`linkCount` `🔓 export`

&gt; 📄 `stat.vx` L128-130

```vex
export fn linkCount(path: string): i64
```

Get hard link count.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `i64`

---

### <a id="Permissions"></a>`Permissions` `🔓 export`

&gt; 📄 `permissions.vx` L20-22

```vex
export fn Permissions(mode: u32): Permissions
```

Create from a raw POSIX mode value (e.g. 0o755).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `mode` | `u32` |  |

**Returns:** `Permissions`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Permissions.readOnly`[↗](#Permissions.readOnly) | `export fn Permissions.readOnly(): Permissions` | Read-only file (0o444). |
| `Permissions.readWrite`[↗](#Permissions.readWrite) | `export fn Permissions.readWrite(): Permissions` | Read-write file (0o644). |
| `Permissions.executable`[↗](#Permissions.executable) | `export fn Permissions.executable(): Permissions` | Executable file (0o755). |
| `canRead`[↗](#Permissions.canRead) | `export fn (self: &Permissions) canRead(): bool` | True if any entity (owner/group/other) can read. |
| `canWrite`[↗](#Permissions.canWrite) | `export fn (self: &Permissions) canWrite(): bool` | True if any entity (owner/group/other) can write. |
| `canExec`[↗](#Permissions.canExec) | `export fn (self: &Permissions) canExec(): bool` | True if any entity (owner/group/other) can execute. |
| `ownerCanRead`[↗](#Permissions.ownerCanRead) | `export fn (self: &Permissions) ownerCanRead(): boo` | True if the owner can read. |
| `ownerCanWrite`[↗](#Permissions.ownerCanWrite) | `export fn (self: &Permissions) ownerCanWrite(): bo` | True if the owner can write. |
| `ownerCanExec`[↗](#Permissions.ownerCanExec) | `export fn (self: &Permissions) ownerCanExec(): boo` | True if the owner can execute. |
| `isReadOnly`[↗](#Permissions.isReadOnly) | `export fn (self: &Permissions) isReadOnly(): bool` | Convenience: no entity has write permission. |
| `rawMode`[↗](#Permissions.rawMode) | `export fn (self: &Permissions) rawMode(): u32` | Raw mode bits. |
| `op==`[↗](#Permissions.op==) | `export fn (self: Permissions) op==(rhs: Permission` |  |
| `toString`[↗](#Permissions.toString) | `export fn (self: &Permissions) toString(): string` |  |
| `debug`[↗](#Permissions.debug) | `export fn (self: &Permissions) debug(): string` |  |

---

### <a id="path_last_index_of_byte"></a>`path_last_index_of_byte`

&gt; 📄 `path.vx` L13-26

```vex
fn path_last_index_of_byte(raw: ptr, len: usize, needle: u8): isize
```

Return last index of `needle` in raw byte buffer, or -1 if not found.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `ptr` |  |
| `len` | `usize` |  |
| `needle` | `u8` |  |

**Returns:** `isize`

---

### <a id="Path"></a>`Path` `🔓 export`

&gt; 📄 `path.vx` L31-33

```vex
export fn Path(s: string): Path
```

Create a Path from a string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `string` |  |

**Returns:** `Path`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `toString`[↗](#Path.toString) | `export fn (self: &Path) toString(): string` | String representation (Display contract). |
| `debug`[↗](#Path.debug) | `export fn (self: &Path) debug(): string` | Debug representation (Debug contract). |
| `clone`[↗](#Path.clone) | `export fn (self: &Path) clone(): Path` | Deep copy (Clone contract). |
| `op==`[↗](#Path.op==) | `export fn (self: &Path) op==(rhs: Path): bool` | Equality by inner string (Eq contract). |
| `join`[↗](#Path.join) | `export fn (self: &Path) join(other: string): Path` | Join this path with another component. |
| `parent`[↗](#Path.parent) | `export fn (self: &Path) parent(): Path` | Get the parent directory. |
| `fileName`[↗](#Path.fileName) | `export fn (self: &Path) fileName(): string` | Get the file name component (everything after last '/'). |
| `extension`[↗](#Path.extension) | `export fn (self: &Path) extension(): string` | Get the file extension (after last '.'). |
| `stem`[↗](#Path.stem) | `export fn (self: &Path) stem(): string` | Get the file stem (file name without extension). |
| `exists`[↗](#Path.exists) | `export fn (self: &Path) exists(): bool` | Check if the path exists on disk. |
| `isReadable`[↗](#Path.isReadable) | `export fn (self: &Path) isReadable(): bool` | Check if path is readable. |
| `isWritable`[↗](#Path.isWritable) | `export fn (self: &Path) isWritable(): bool` | Check if path is writable. |
| `isAbsolute`[↗](#Path.isAbsolute) | `export fn (self: &Path) isAbsolute(): bool` | Check if path is absolute (starts with '/'). |
| `isRelative`[↗](#Path.isRelative) | `export fn (self: &Path) isRelative(): bool` | Check if path is relative (not absolute). |
| `isDir`[↗](#Path.isDir) | `export fn (self: &Path) isDir(): bool` | Check if path refers to a directory. |
| `isFile`[↗](#Path.isFile) | `export fn (self: &Path) isFile(): bool` | Check if path refers to a regular file. |
| `isSymlink`[↗](#Path.isSymlink) | `export fn (self: &Path) isSymlink(): bool` | Check if path refers to a symbolic link. |
| `canonicalize`[↗](#Path.canonicalize) | `export fn (self: &Path) canonicalize(): Path` | Resolve the path to its canonical, absolute form. |
| `withExtension`[↗](#Path.withExtension) | `export fn (self: &Path) withExtension(ext: string)` | Return a new Path with the extension replaced. |
| `clean`[↗](#Path.clean) | `export fn (self: &Path) clean(): Path` | Normalize the path by resolving `.` and `..` components lexically. |
| `components`[↗](#Path.components) | `export fn (self: &Path) components(): Vec&lt;string&gt;` | Split path into its individual components. |

---

### <a id="dirReadAt"></a>`dirReadAt`

&gt; 📄 `dir.vx` L5-5

```vex
fn dirReadAt(p: Ptr<T>, i: usize): T
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;T&gt;` |  |
| `i` | `usize` |  |

**Returns:** `T`

---

### <a id="emptyDirEntry"></a>`emptyDirEntry`

&gt; 📄 `dir.vx` L19-26

```vex
fn emptyDirEntry(): DirEntry
```

**Returns:** `DirEntry`

---

### <a id="readDir"></a>`readDir` `🔓 export`

&gt; 📄 `dir.vx` L81-89

```vex
export fn readDir(path: string, out: &DirList!): i32
```

List contents of a directory (fills caller-provided buffer).

Returns up to 64 entries. For larger directories, use raw vex_fs_readdir.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `out` | `&DirList!` |  |

**Returns:** `i32`

---

### <a id="mkdirAll"></a>`mkdirAll` `🔓 export`

&gt; 📄 `dir.vx` L96-102

```vex
export fn mkdirAll(path: string): Result<i32, StdError>
```

Create all directories along a path (like `mkdir -p`).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="removeAll"></a>`removeAll` `🔓 export`

&gt; 📄 `dir.vx` L105-111

```vex
export fn removeAll(path: string): Result<i32, StdError>
```

Recursively remove a file or directory tree (like `rm -rf`).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

### <a id="tempDir"></a>`tempDir` `🔓 export`

&gt; 📄 `dir.vx` L114-121

```vex
export fn tempDir(): string
```

Get the system temporary directory path.

**Returns:** `string`

---

### <a id="readDirVecLimit"></a>`readDirVecLimit` `🔓 export`

&gt; 📄 `dir.vx` L130-183

```vex
export fn readDirVecLimit(path: string, maxEntries: usize): Result<Vec<DirEntry>, StdError>
```

Read directory entries into a Vec with explicit upper bound.

This function paginates via vex_fs_readdir_from to collect up to `maxEntries`
entries, avoiding single-batch truncation behavior.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `maxEntries` | `usize` |  |

**Returns:** `Result&lt;Vec&lt;DirEntry&gt;, StdError&gt;`

---

### <a id="readDirVec"></a>`readDirVec` `🔓 export`

&gt; 📄 `dir.vx` L187-189

```vex
export fn readDirVec(path: string): Result<Vec<DirEntry>, StdError>
```

Read directory entries into a Vec (preferred over DirList for most use-cases).

Collects entries paginated up to DEFAULT_READDIR_MAX.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;Vec&lt;DirEntry&gt;, StdError&gt;`

---

### <a id="readDirPage"></a>`readDirPage` `🔓 export`

&gt; 📄 `dir.vx` L193-221

```vex
export fn readDirPage(path: string, offset: usize, limit: usize): Result<Vec<DirEntry>, StdError>
```

Read one page of directory entries starting from `offset` (non-dot entries).

Returns up to `limit` entries.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `offset` | `usize` |  |
| `limit` | `usize` |  |

**Returns:** `Result&lt;Vec&lt;DirEntry&gt;, StdError&gt;`

---

### <a id="newDirCursor"></a>`newDirCursor` `🔓 export`

&gt; 📄 `dir.vx` L233-241

```vex
export fn newDirCursor(path: string, pageSize: usize): DirCursor
```

Create a new directory cursor.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `pageSize` | `usize` |  |

**Returns:** `DirCursor`

---

### <a id="walkDir"></a>`walkDir` `🔓 export`

&gt; 📄 `dir.vx` L277-309

```vex
export fn walkDir(root: string, callback: fn (DirEntry, string): bool): Result<i32, StdError>
```

Recursively walk a directory tree, calling `callback(entry, fullPath)` for

each entry (excluding "." and "..").
If the callback returns `false`, traversal stops immediately.
Returns `Ok(0)` on complete traversal, `Ok(1)` if stopped early.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `root` | `string` |  |
| `callback` | `fn (DirEntry, string): bool` |  |

**Returns:** `Result&lt;i32, StdError&gt;`

---

---

*Generated by vex-doc v2.0 • 2026-07-06*
