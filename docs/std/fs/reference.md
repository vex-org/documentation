# Project v0.0.0

## Overview

**Structs:** [`OpenOptions`](#OpenOptions) · [`File`](#File) · [`MappedRegion`](#MappedRegion) · [`Metadata`](#Metadata) · [`Permissions`](#Permissions) · [`MacStat`](#MacStat) · [`MacDirent`](#MacDirent) · [`TempDirEntry`](#TempDirEntry) · [`Path`](#Path) · [`FsMetadataRaw`](#FsMetadataRaw) · [`LinuxStat`](#LinuxStat) · [`LinuxDirent`](#LinuxDirent) · [`TempDirEntry`](#TempDirEntry) · [`FileTime`](#FileTime) · [`ByHandleFileInformation`](#ByHandleFileInformation) · [`FindDataW`](#FindDataW) · [`WindowsDirCursor`](#WindowsDirCursor) · [`DirList`](#DirList) · [`DirCursor`](#DirCursor) · [`DirEntry`](#DirEntry)

**Enums:** [`FileType`](#FileType)

**Functions:** [`vex_fs_last_error`](#vex_fs_last_error) · [`vex_fs_unlink`](#vex_fs_unlink) · [`vex_fs_rename`](#vex_fs_rename) · [`vex_fs_mkdir`](#vex_fs_mkdir) · [`vex_fs_rmdir`](#vex_fs_rmdir) · [`vex_fs_exists`](#vex_fs_exists) · [`vex_fs_access`](#vex_fs_access) · [`vex_fs_getcwd`](#vex_fs_getcwd) · [`vex_fs_chdir`](#vex_fs_chdir) · [`vex_fs_chmod`](#vex_fs_chmod) · [`vex_fs_is_readable`](#vex_fs_is_readable) · [`vex_fs_is_writable`](#vex_fs_is_writable) · [`vex_fs_symlink`](#vex_fs_symlink) · [`vex_fs_link`](#vex_fs_link) · [`vex_fs_readlink`](#vex_fs_readlink) · [`vex_fs_mkstemp`](#vex_fs_mkstemp) · [`vex_fs_metadata`](#vex_fs_metadata) · [`vex_fs_file_metadata`](#vex_fs_file_metadata) · [`vex_fs_dir_open`](#vex_fs_dir_open) · [`vex_fs_dir_read`](#vex_fs_dir_read) · [`vex_fs_dir_close`](#vex_fs_dir_close) · [`vex_fs_readdir_from`](#vex_fs_readdir_from) · [`vex_fs_readdir`](#vex_fs_readdir) · [`vex_fs_mkdir_all`](#vex_fs_mkdir_all) · [`vex_fs_temp_dir`](#vex_fs_temp_dir) · [`vex_fs_realpath`](#vex_fs_realpath) · [`vex_fs_mmap`](#vex_fs_mmap) · [`vex_fs_munmap`](#vex_fs_munmap) · [`openConfigured`](#openConfigured) · [`closedFileError`](#closedFileError) · [`descriptorError`](#descriptorError) · [`_openFile`](#_openFile) · [`_createFile`](#_createFile) · [`_openReadWrite`](#_openReadWrite) · [`_openAppend`](#_openAppend) · [`openFile`](#openFile) · [`createFile`](#createFile) · [`openReadWrite`](#openReadWrite) · [`openAppend`](#openAppend) · [`readBytes`](#readBytes) · [`readBytesLimit`](#readBytesLimit) · [`readFile`](#readFile) · [`readFileLimit`](#readFileLimit) · [`writeFile`](#writeFile) · [`appendFile`](#appendFile) · [`copyFile`](#copyFile) · [`renameFile`](#renameFile) · [`removeFile`](#removeFile) · [`exists`](#exists) · [`tryExists`](#tryExists) · [`createDir`](#createDir) · [`removeDir`](#removeDir) · [`cwd`](#cwd) · [`chdir`](#chdir) · [`changeMode`](#changeMode) · [`_tempFile`](#_tempFile) · [`tempFile`](#tempFile) · [`createSymlink`](#createSymlink) · [`symlink`](#symlink) · [`hardlink`](#hardlink) · [`readSymlink`](#readSymlink) · [`readlink`](#readlink) · [`fileTypeFromRaw`](#fileTypeFromRaw) · [`metadataFromRaw`](#metadataFromRaw) · [`queryMetadata`](#queryMetadata) · [`metadata`](#metadata) · [`symlinkMetadata`](#symlinkMetadata) · [`pathIsDir`](#pathIsDir) · [`pathIsFile`](#pathIsFile) · [`pathIsSymlink`](#pathIsSymlink) · [`Permissions`](#Permissions) · [`new_stat`](#new_stat) · [`vex_fs_last_error`](#vex_fs_last_error) · [`vex_fs_unlink`](#vex_fs_unlink) · [`vex_fs_rename`](#vex_fs_rename) · [`vex_fs_mkdir`](#vex_fs_mkdir) · [`vex_fs_rmdir`](#vex_fs_rmdir) · [`vex_fs_exists`](#vex_fs_exists) · [`vex_fs_access`](#vex_fs_access) · [`vex_fs_getcwd`](#vex_fs_getcwd) · [`vex_fs_chdir`](#vex_fs_chdir) · [`vex_fs_chmod`](#vex_fs_chmod) · [`vex_fs_is_readable`](#vex_fs_is_readable) · [`vex_fs_is_writable`](#vex_fs_is_writable) · [`vex_fs_symlink`](#vex_fs_symlink) · [`vex_fs_link`](#vex_fs_link) · [`vex_fs_readlink`](#vex_fs_readlink) · [`vex_fs_mkstemp`](#vex_fs_mkstemp) · [`fill_metadata`](#fill_metadata) · [`vex_fs_metadata`](#vex_fs_metadata) · [`vex_fs_file_metadata`](#vex_fs_file_metadata) · [`vex_fs_dir_open`](#vex_fs_dir_open) · [`vex_fs_dir_read`](#vex_fs_dir_read) · [`vex_fs_dir_close`](#vex_fs_dir_close) · [`vex_fs_readdir_from`](#vex_fs_readdir_from) · [`vex_fs_readdir`](#vex_fs_readdir) · [`vex_fs_mkdir_all_raw`](#vex_fs_mkdir_all_raw) · [`vex_fs_mkdir_all`](#vex_fs_mkdir_all) · [`vex_fs_temp_dir`](#vex_fs_temp_dir) · [`vex_fs_realpath`](#vex_fs_realpath) · [`vex_fs_mmap`](#vex_fs_mmap) · [`vex_fs_munmap`](#vex_fs_munmap) · [`vex_getcwd`](#vex_getcwd) · [`pathIsSeparator`](#pathIsSeparator) · [`pathSeparator`](#pathSeparator) · [`pathSeparatorByte`](#pathSeparatorByte) · [`pathIsAsciiLetter`](#pathIsAsciiLetter) · [`pathHasDrivePrefix`](#pathHasDrivePrefix) · [`pathPrefixLength`](#pathPrefixLength) · [`pathPrefixIsRooted`](#pathPrefixIsRooted) · [`pathLastSeparator`](#pathLastSeparator) · [`pathLastByte`](#pathLastByte) · [`pathSlice`](#pathSlice) · [`pathNormalizedPrefix`](#pathNormalizedPrefix) · [`Path`](#Path) · [`emptyFsMetadataRaw`](#emptyFsMetadataRaw) · [`new_stat`](#new_stat) · [`vex_fs_last_error`](#vex_fs_last_error) · [`vex_fs_unlink`](#vex_fs_unlink) · [`vex_fs_rename`](#vex_fs_rename) · [`vex_fs_mkdir`](#vex_fs_mkdir) · [`vex_fs_rmdir`](#vex_fs_rmdir) · [`vex_fs_exists`](#vex_fs_exists) · [`vex_fs_access`](#vex_fs_access) · [`vex_fs_getcwd`](#vex_fs_getcwd) · [`vex_fs_chdir`](#vex_fs_chdir) · [`vex_fs_chmod`](#vex_fs_chmod) · [`vex_fs_is_readable`](#vex_fs_is_readable) · [`vex_fs_is_writable`](#vex_fs_is_writable) · [`vex_fs_symlink`](#vex_fs_symlink) · [`vex_fs_link`](#vex_fs_link) · [`vex_fs_readlink`](#vex_fs_readlink) · [`vex_fs_mkstemp`](#vex_fs_mkstemp) · [`fill_metadata`](#fill_metadata) · [`vex_fs_metadata`](#vex_fs_metadata) · [`vex_fs_file_metadata`](#vex_fs_file_metadata) · [`vex_fs_dir_open`](#vex_fs_dir_open) · [`vex_fs_dir_read`](#vex_fs_dir_read) · [`vex_fs_dir_close`](#vex_fs_dir_close) · [`vex_fs_readdir_from`](#vex_fs_readdir_from) · [`vex_fs_readdir`](#vex_fs_readdir) · [`vex_fs_mkdir_all_raw`](#vex_fs_mkdir_all_raw) · [`vex_fs_mkdir_all`](#vex_fs_mkdir_all) · [`vex_fs_temp_dir`](#vex_fs_temp_dir) · [`vex_fs_realpath`](#vex_fs_realpath) · [`vex_fs_mmap`](#vex_fs_mmap) · [`vex_fs_munmap`](#vex_fs_munmap) · [`vex_getcwd`](#vex_getcwd) · [`invalidHandle`](#invalidHandle) · [`portableError`](#portableError) · [`vex_fs_last_error`](#vex_fs_last_error) · [`zeroedWide`](#zeroedWide) · [`utf8ToWide`](#utf8ToWide) · [`wideLength`](#wideLength) · [`wideToUtf8`](#wideToUtf8) · [`combineU32`](#combineU32) · [`fileTimeSeconds`](#fileTimeSeconds) · [`emptyInformation`](#emptyInformation) · [`fillMetadata`](#fillMetadata) · [`openMetadataHandle`](#openMetadataHandle) · [`vex_fs_metadata`](#vex_fs_metadata) · [`vex_fs_file_metadata`](#vex_fs_file_metadata) · [`vex_fs_unlink`](#vex_fs_unlink) · [`vex_fs_rename`](#vex_fs_rename) · [`vex_fs_mkdir`](#vex_fs_mkdir) · [`vex_fs_rmdir`](#vex_fs_rmdir) · [`vex_fs_exists`](#vex_fs_exists) · [`vex_fs_access`](#vex_fs_access) · [`vex_fs_is_readable`](#vex_fs_is_readable) · [`vex_fs_is_writable`](#vex_fs_is_writable) · [`vex_fs_getcwd`](#vex_fs_getcwd) · [`vex_fs_chdir`](#vex_fs_chdir) · [`vex_fs_chmod`](#vex_fs_chmod) · [`vex_fs_symlink`](#vex_fs_symlink) · [`vex_fs_link`](#vex_fs_link) · [`vex_fs_readlink`](#vex_fs_readlink) · [`emptyFindData`](#emptyFindData) · [`searchPattern`](#searchPattern) · [`vex_fs_dir_open`](#vex_fs_dir_open) · [`isDotEntry`](#isDotEntry) · [`vex_fs_dir_read`](#vex_fs_dir_read) · [`vex_fs_dir_close`](#vex_fs_dir_close) · [`vex_fs_readdir_from`](#vex_fs_readdir_from) · [`vex_fs_readdir`](#vex_fs_readdir) · [`vex_fs_mkdir_all`](#vex_fs_mkdir_all) · [`vex_fs_temp_dir`](#vex_fs_temp_dir) · [`appendDecimal`](#appendDecimal) · [`vex_fs_mkstemp`](#vex_fs_mkstemp) · [`vex_fs_realpath`](#vex_fs_realpath) · [`vex_fs_mmap`](#vex_fs_mmap) · [`vex_fs_munmap`](#vex_fs_munmap) · [`dirReadAt`](#dirReadAt) · [`DirEntry`](#DirEntry) · [`readDir`](#readDir) · [`mkdirAll`](#mkdirAll) · [`removeAll`](#removeAll) · [`tempDir`](#tempDir) · [`readDirVecLimit`](#readDirVecLimit) · [`readDirVec`](#readDirVec) · [`readDirPage`](#readDirPage) · [`newDirCursor`](#newDirCursor) · [`walkDir`](#walkDir) · [`fsError`](#fsError) · [`fsInvalidInput`](#fsInvalidInput) · [`fsOutOfMemory`](#fsOutOfMemory)

**Constants:** [`ENOTSUP`](#ENOTSUP) · [`O_RDONLY`](#O_RDONLY) · [`O_WRONLY`](#O_WRONLY) · [`O_RDWR`](#O_RDWR) · [`O_CREAT`](#O_CREAT) · [`O_EXCL`](#O_EXCL) · [`O_TRUNC`](#O_TRUNC) · [`O_APPEND`](#O_APPEND) · [`O_NONBLOCK`](#O_NONBLOCK) · [`O_DIRECTORY`](#O_DIRECTORY) · [`O_CLOEXEC`](#O_CLOEXEC) · [`SEEK_SET`](#SEEK_SET) · [`SEEK_CUR`](#SEEK_CUR) · [`SEEK_END`](#SEEK_END) · [`PROT_READ`](#PROT_READ) · [`PROT_WRITE`](#PROT_WRITE) · [`MAP_SHARED`](#MAP_SHARED) · [`MAP_PRIVATE`](#MAP_PRIVATE) · [`MAP_FAILED`](#MAP_FAILED) · [`F_OK`](#F_OK) · [`R_OK`](#R_OK) · [`W_OK`](#W_OK) · [`X_OK`](#X_OK) · [`S_IFMT`](#S_IFMT) · [`S_IFDIR`](#S_IFDIR) · [`S_IFREG`](#S_IFREG) · [`S_IFLNK`](#S_IFLNK) · [`DT_UNKNOWN`](#DT_UNKNOWN) · [`DT_DIR`](#DT_DIR) · [`DT_REG`](#DT_REG) · [`DT_LNK`](#DT_LNK) · [`FS_KIND_OTHER`](#FS_KIND_OTHER) · [`FS_KIND_FILE`](#FS_KIND_FILE) · [`FS_KIND_DIRECTORY`](#FS_KIND_DIRECTORY) · [`FS_KIND_SYMLINK`](#FS_KIND_SYMLINK) · [`CP_UTF8`](#CP_UTF8) · [`MB_ERR_INVALID_CHARS`](#MB_ERR_INVALID_CHARS) · [`WC_ERR_INVALID_CHARS`](#WC_ERR_INVALID_CHARS) · [`INVALID_FILE_ATTRIBUTES`](#INVALID_FILE_ATTRIBUTES) · [`FILE_ATTRIBUTE_READONLY`](#FILE_ATTRIBUTE_READONLY) · [`FILE_ATTRIBUTE_DIRECTORY`](#FILE_ATTRIBUTE_DIRECTORY) · [`FILE_ATTRIBUTE_REPARSE_POINT`](#FILE_ATTRIBUTE_REPARSE_POINT) · [`FILE_FLAG_BACKUP_SEMANTICS`](#FILE_FLAG_BACKUP_SEMANTICS) · [`FILE_FLAG_OPEN_REPARSE_POINT`](#FILE_FLAG_OPEN_REPARSE_POINT) · [`FILE_READ_ATTRIBUTES`](#FILE_READ_ATTRIBUTES) · [`OPEN_EXISTING`](#OPEN_EXISTING) · [`CREATE_NEW`](#CREATE_NEW) · [`FILE_SHARE_ALL`](#FILE_SHARE_ALL) · [`ERROR_NO_MORE_FILES`](#ERROR_NO_MORE_FILES) · [`ERROR_INSUFFICIENT_BUFFER`](#ERROR_INSUFFICIENT_BUFFER) · [`ERROR_NOT_SUPPORTED`](#ERROR_NOT_SUPPORTED) · [`ERROR_FILENAME_EXCED_RANGE`](#ERROR_FILENAME_EXCED_RANGE) · [`FSCTL_GET_REPARSE_POINT`](#FSCTL_GET_REPARSE_POINT) · [`IO_REPARSE_TAG_MOUNT_POINT`](#IO_REPARSE_TAG_MOUNT_POINT) · [`IO_REPARSE_TAG_SYMLINK`](#IO_REPARSE_TAG_SYMLINK) · [`DEFAULT_PAGE_SIZE`](#DEFAULT_PAGE_SIZE) · [`READDIR_VEC_CHUNK`](#READDIR_VEC_CHUNK)

## Constants

### <a id="ENOTSUP"></a>`ENOTSUP`

> 📄 `native.vxc` L10-10

```vex
const ENOTSUP: i32=95;
```

**Returns:** `i32=95;`

---

### <a id="O_RDONLY"></a>`O_RDONLY` `🔓 export`

> 📄 `sys.vx` L5-5

```vex
export const O_RDONLY: i32=0x0000;
```

**Returns:** `i32=0x0000;`

---

### <a id="O_WRONLY"></a>`O_WRONLY` `🔓 export`

> 📄 `sys.vx` L6-6

```vex
export const O_WRONLY: i32=0x0001;
```

**Returns:** `i32=0x0001;`

---

### <a id="O_RDWR"></a>`O_RDWR` `🔓 export`

> 📄 `sys.vx` L7-7

```vex
export const O_RDWR: i32=0x0002;
```

**Returns:** `i32=0x0002;`

---

### <a id="O_CREAT"></a>`O_CREAT` `🔓 export`

> 📄 `sys.vx` L8-8

```vex
export const O_CREAT: i32=0x0040;
```

**Returns:** `i32=0x0040;`

---

### <a id="O_EXCL"></a>`O_EXCL` `🔓 export`

> 📄 `sys.vx` L9-9

```vex
export const O_EXCL: i32=0x0080;
```

**Returns:** `i32=0x0080;`

---

### <a id="O_TRUNC"></a>`O_TRUNC` `🔓 export`

> 📄 `sys.vx` L10-10

```vex
export const O_TRUNC: i32=0x0200;
```

**Returns:** `i32=0x0200;`

---

### <a id="O_APPEND"></a>`O_APPEND` `🔓 export`

> 📄 `sys.vx` L11-11

```vex
export const O_APPEND: i32=0x0400;
```

**Returns:** `i32=0x0400;`

---

### <a id="O_NONBLOCK"></a>`O_NONBLOCK` `🔓 export`

> 📄 `sys.vx` L12-12

```vex
export const O_NONBLOCK: i32=0x0800;
```

**Returns:** `i32=0x0800;`

---

### <a id="O_DIRECTORY"></a>`O_DIRECTORY` `🔓 export`

> 📄 `sys.vx` L13-13

```vex
export const O_DIRECTORY: i32=0x10000;
```

**Returns:** `i32=0x10000;`

---

### <a id="O_CLOEXEC"></a>`O_CLOEXEC` `🔓 export`

> 📄 `sys.vx` L14-14

```vex
export const O_CLOEXEC: i32=0x80000;
```

**Returns:** `i32=0x80000;`

---

### <a id="SEEK_SET"></a>`SEEK_SET` `🔓 export`

> 📄 `sys.vx` L17-17

```vex
export const SEEK_SET: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="SEEK_CUR"></a>`SEEK_CUR` `🔓 export`

> 📄 `sys.vx` L18-18

```vex
export const SEEK_CUR: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="SEEK_END"></a>`SEEK_END` `🔓 export`

> 📄 `sys.vx` L19-19

```vex
export const SEEK_END: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="PROT_READ"></a>`PROT_READ` `🔓 export`

> 📄 `sys.vx` L22-22

```vex
export const PROT_READ: i32=0x1;
```

**Returns:** `i32=0x1;`

---

### <a id="PROT_WRITE"></a>`PROT_WRITE` `🔓 export`

> 📄 `sys.vx` L23-23

```vex
export const PROT_WRITE: i32=0x2;
```

**Returns:** `i32=0x2;`

---

### <a id="MAP_SHARED"></a>`MAP_SHARED` `🔓 export`

> 📄 `sys.vx` L24-24

```vex
export const MAP_SHARED: i32=0x1;
```

**Returns:** `i32=0x1;`

---

### <a id="MAP_PRIVATE"></a>`MAP_PRIVATE` `🔓 export`

> 📄 `sys.vx` L25-25

```vex
export const MAP_PRIVATE: i32=0x2;
```

**Returns:** `i32=0x2;`

---

### <a id="MAP_FAILED"></a>`MAP_FAILED` `🔓 export`

> 📄 `sys.vx` L26-26

```vex
export const MAP_FAILED: i64=-1;
```

**Returns:** `i64=-1;`

---

### <a id="F_OK"></a>`F_OK` `🔓 export`

> 📄 `sys.vx` L29-29

```vex
export const F_OK: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="R_OK"></a>`R_OK` `🔓 export`

> 📄 `sys.vx` L30-30

```vex
export const R_OK: i32=4;
```

**Returns:** `i32=4;`

---

### <a id="W_OK"></a>`W_OK` `🔓 export`

> 📄 `sys.vx` L31-31

```vex
export const W_OK: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="X_OK"></a>`X_OK` `🔓 export`

> 📄 `sys.vx` L32-32

```vex
export const X_OK: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="S_IFMT"></a>`S_IFMT` `🔓 export`

> 📄 `sys.vx` L35-35

```vex
export const S_IFMT: u32=0o170000;
```

**Returns:** `u32=0o170000;`

---

### <a id="S_IFDIR"></a>`S_IFDIR` `🔓 export`

> 📄 `sys.vx` L36-36

```vex
export const S_IFDIR: u32=0o040000;
```

**Returns:** `u32=0o040000;`

---

### <a id="S_IFREG"></a>`S_IFREG` `🔓 export`

> 📄 `sys.vx` L37-37

```vex
export const S_IFREG: u32=0o100000;
```

**Returns:** `u32=0o100000;`

---

### <a id="S_IFLNK"></a>`S_IFLNK` `🔓 export`

> 📄 `sys.vx` L38-38

```vex
export const S_IFLNK: u32=0o120000;
```

**Returns:** `u32=0o120000;`

---

### <a id="DT_UNKNOWN"></a>`DT_UNKNOWN` `🔓 export`

> 📄 `sys.vx` L41-41

```vex
export const DT_UNKNOWN: u8=0;
```

**Returns:** `u8=0;`

---

### <a id="DT_DIR"></a>`DT_DIR` `🔓 export`

> 📄 `sys.vx` L42-42

```vex
export const DT_DIR: u8=4;
```

**Returns:** `u8=4;`

---

### <a id="DT_REG"></a>`DT_REG` `🔓 export`

> 📄 `sys.vx` L43-43

```vex
export const DT_REG: u8=8;
```

**Returns:** `u8=8;`

---

### <a id="DT_LNK"></a>`DT_LNK` `🔓 export`

> 📄 `sys.vx` L44-44

```vex
export const DT_LNK: u8=10;
```

**Returns:** `u8=10;`

---

### <a id="FS_KIND_OTHER"></a>`FS_KIND_OTHER` `🔓 export`

> 📄 `metadata_raw.vxc` L5-5

```vex
export const FS_KIND_OTHER: u8=0 as u8;
```

**Returns:** `u8=0 as u8;`

---

### <a id="FS_KIND_FILE"></a>`FS_KIND_FILE` `🔓 export`

> 📄 `metadata_raw.vxc` L6-6

```vex
export const FS_KIND_FILE: u8=1 as u8;
```

**Returns:** `u8=1 as u8;`

---

### <a id="FS_KIND_DIRECTORY"></a>`FS_KIND_DIRECTORY` `🔓 export`

> 📄 `metadata_raw.vxc` L7-7

```vex
export const FS_KIND_DIRECTORY: u8=2 as u8;
```

**Returns:** `u8=2 as u8;`

---

### <a id="FS_KIND_SYMLINK"></a>`FS_KIND_SYMLINK` `🔓 export`

> 📄 `metadata_raw.vxc` L8-8

```vex
export const FS_KIND_SYMLINK: u8=3 as u8;
```

**Returns:** `u8=3 as u8;`

---

### <a id="CP_UTF8"></a>`CP_UTF8`

> 📄 `windows_provider.vxc` L90-90

```vex
const CP_UTF8: u32=65001 as u32;
```

**Returns:** `u32=65001 as u32;`

---

### <a id="MB_ERR_INVALID_CHARS"></a>`MB_ERR_INVALID_CHARS`

> 📄 `windows_provider.vxc` L91-91

```vex
const MB_ERR_INVALID_CHARS: u32=8 as u32;
```

**Returns:** `u32=8 as u32;`

---

### <a id="WC_ERR_INVALID_CHARS"></a>`WC_ERR_INVALID_CHARS`

> 📄 `windows_provider.vxc` L92-92

```vex
const WC_ERR_INVALID_CHARS: u32=128 as u32;
```

**Returns:** `u32=128 as u32;`

---

### <a id="INVALID_FILE_ATTRIBUTES"></a>`INVALID_FILE_ATTRIBUTES`

> 📄 `windows_provider.vxc` L94-94

```vex
const INVALID_FILE_ATTRIBUTES: u32=0xFFFFFFFF as u32;
```

**Returns:** `u32=0xFFFFFFFF as u32;`

---

### <a id="FILE_ATTRIBUTE_READONLY"></a>`FILE_ATTRIBUTE_READONLY`

> 📄 `windows_provider.vxc` L95-95

```vex
const FILE_ATTRIBUTE_READONLY: u32=0x00000001 as u32;
```

**Returns:** `u32=0x00000001 as u32;`

---

### <a id="FILE_ATTRIBUTE_DIRECTORY"></a>`FILE_ATTRIBUTE_DIRECTORY`

> 📄 `windows_provider.vxc` L96-96

```vex
const FILE_ATTRIBUTE_DIRECTORY: u32=0x00000010 as u32;
```

**Returns:** `u32=0x00000010 as u32;`

---

### <a id="FILE_ATTRIBUTE_REPARSE_POINT"></a>`FILE_ATTRIBUTE_REPARSE_POINT`

> 📄 `windows_provider.vxc` L97-97

```vex
const FILE_ATTRIBUTE_REPARSE_POINT: u32=0x00000400 as u32;
```

**Returns:** `u32=0x00000400 as u32;`

---

### <a id="FILE_FLAG_BACKUP_SEMANTICS"></a>`FILE_FLAG_BACKUP_SEMANTICS`

> 📄 `windows_provider.vxc` L98-98

```vex
const FILE_FLAG_BACKUP_SEMANTICS: u32=0x02000000 as u32;
```

**Returns:** `u32=0x02000000 as u32;`

---

### <a id="FILE_FLAG_OPEN_REPARSE_POINT"></a>`FILE_FLAG_OPEN_REPARSE_POINT`

> 📄 `windows_provider.vxc` L99-99

```vex
const FILE_FLAG_OPEN_REPARSE_POINT: u32=0x00200000 as u32;
```

**Returns:** `u32=0x00200000 as u32;`

---

### <a id="FILE_READ_ATTRIBUTES"></a>`FILE_READ_ATTRIBUTES`

> 📄 `windows_provider.vxc` L100-100

```vex
const FILE_READ_ATTRIBUTES: u32=0x00000080 as u32;
```

**Returns:** `u32=0x00000080 as u32;`

---

### <a id="OPEN_EXISTING"></a>`OPEN_EXISTING`

> 📄 `windows_provider.vxc` L101-101

```vex
const OPEN_EXISTING: u32=3 as u32;
```

**Returns:** `u32=3 as u32;`

---

### <a id="CREATE_NEW"></a>`CREATE_NEW`

> 📄 `windows_provider.vxc` L102-102

```vex
const CREATE_NEW: u32=1 as u32;
```

**Returns:** `u32=1 as u32;`

---

### <a id="FILE_SHARE_ALL"></a>`FILE_SHARE_ALL`

> 📄 `windows_provider.vxc` L103-103

```vex
const FILE_SHARE_ALL: u32=7 as u32;
```

**Returns:** `u32=7 as u32;`

---

### <a id="ERROR_NO_MORE_FILES"></a>`ERROR_NO_MORE_FILES`

> 📄 `windows_provider.vxc` L104-104

```vex
const ERROR_NO_MORE_FILES: u32=18 as u32;
```

**Returns:** `u32=18 as u32;`

---

### <a id="ERROR_INSUFFICIENT_BUFFER"></a>`ERROR_INSUFFICIENT_BUFFER`

> 📄 `windows_provider.vxc` L105-105

```vex
const ERROR_INSUFFICIENT_BUFFER: u32=122 as u32;
```

**Returns:** `u32=122 as u32;`

---

### <a id="ERROR_NOT_SUPPORTED"></a>`ERROR_NOT_SUPPORTED`

> 📄 `windows_provider.vxc` L106-106

```vex
const ERROR_NOT_SUPPORTED: u32=50 as u32;
```

**Returns:** `u32=50 as u32;`

---

### <a id="ERROR_FILENAME_EXCED_RANGE"></a>`ERROR_FILENAME_EXCED_RANGE`

> 📄 `windows_provider.vxc` L107-107

```vex
const ERROR_FILENAME_EXCED_RANGE: u32=206 as u32;
```

**Returns:** `u32=206 as u32;`

---

### <a id="FSCTL_GET_REPARSE_POINT"></a>`FSCTL_GET_REPARSE_POINT`

> 📄 `windows_provider.vxc` L108-108

```vex
const FSCTL_GET_REPARSE_POINT: u32=0x000900A8 as u32;
```

**Returns:** `u32=0x000900A8 as u32;`

---

### <a id="IO_REPARSE_TAG_MOUNT_POINT"></a>`IO_REPARSE_TAG_MOUNT_POINT`

> 📄 `windows_provider.vxc` L109-109

```vex
const IO_REPARSE_TAG_MOUNT_POINT: u32=0xA0000003 as u32;
```

**Returns:** `u32=0xA0000003 as u32;`

---

### <a id="IO_REPARSE_TAG_SYMLINK"></a>`IO_REPARSE_TAG_SYMLINK`

> 📄 `windows_provider.vxc` L110-110

```vex
const IO_REPARSE_TAG_SYMLINK: u32=0xA000000C as u32;
```

**Returns:** `u32=0xA000000C as u32;`

---

### <a id="DEFAULT_PAGE_SIZE"></a>`DEFAULT_PAGE_SIZE`

> 📄 `dir.vx` L38-38

```vex
const DEFAULT_PAGE_SIZE: usize=128;
```

**Returns:** `usize=128;`

---

### <a id="READDIR_VEC_CHUNK"></a>`READDIR_VEC_CHUNK`

> 📄 `dir.vx` L39-39

```vex
const READDIR_VEC_CHUNK: usize=64;
```

**Returns:** `usize=64;`

---

## Structs

### <a id="OpenOptions"></a>`OpenOptions` `🔓 export`

> 📄 `file.vx` L20-28

```vex
export struct OpenOptions
```

Validated, zero-allocation file-open configuration.

All builder methods consume and return the small Copy value, so a complete
configuration is resolved at the call site without heap allocation.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `readEnabled` | `bool` | 🔒 private |  |
| `writeEnabled` | `bool` | 🔒 private |  |
| `appendEnabled` | `bool` | 🔒 private |  |
| `truncateEnabled` | `bool` | 🔒 private |  |
| `createEnabled` | `bool` | 🔒 private |  |
| `createNewEnabled` | `bool` | 🔒 private |  |
| `modeValue` | `u32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `OpenOptions.new`[↗](#OpenOptions.new) | `export fn OpenOptions.new(): OpenOptions` |  |
| `OpenOptions.readOnly`[↗](#OpenOptions.readOnly) | `export fn OpenOptions.readOnly(): OpenOptions` |  |
| `OpenOptions.writeOnly`[↗](#OpenOptions.writeOnly) | `export fn OpenOptions.writeOnly(): OpenOptions` |  |
| `OpenOptions.readWrite`[↗](#OpenOptions.readWrite) | `export fn OpenOptions.readWrite(): OpenOptions` |  |
| `read`[↗](#OpenOptions.read) | `export fn (self: OpenOptions) read(enabled: bool):` |  |
| `write`[↗](#OpenOptions.write) | `export fn (self: OpenOptions) write(enabled: bool)` |  |
| `append`[↗](#OpenOptions.append) | `export fn (self: OpenOptions) append(enabled: bool` |  |
| `truncate`[↗](#OpenOptions.truncate) | `export fn (self: OpenOptions) truncate(enabled: bo` |  |
| `create`[↗](#OpenOptions.create) | `export fn (self: OpenOptions) create(enabled: bool` |  |
| `createNew`[↗](#OpenOptions.createNew) | `export fn (self: OpenOptions) createNew(enabled: b` |  |
| `mode`[↗](#OpenOptions.mode) | `export fn (self: OpenOptions) mode(mode: u32): Ope` | Set creation permissions before the process umask is applied. |
| `open`[↗](#OpenOptions.open) | `export fn (self: OpenOptions) open(path: string): ` |  |

---

### <a id="File"></a>`File` `🔓 export`

> 📄 `file.vx` L134-144

```vex
export struct File
```

**Implements:** `Reader` & `ReaderAt` & `Writer` & `WriterAt` & `ByteReader` & `ByteWriter` & `StringWriter` & `Seeker` & `Closer` & `Drop` & `Display` & `Debug`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `path` | `string` | 🔓 public |  |
| `appendMode` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `File.open`[↗](#File.open) | `export fn File.open(path: string): Result&lt;File, Io` | Open an existing file for reading. |
| `File.create`[↗](#File.create) | `export fn File.create(path: string): Result&lt;File, ` | Create a new file for writing (or truncate if it already exists). |
| `File.openReadWrite`[↗](#File.openReadWrite) | `export fn File.openReadWrite(path: string): Result` | Open an existing file for reading and writing. |
| `File.openAppend`[↗](#File.openAppend) | `export fn File.openAppend(path: string): Result&lt;Fi` | Open or create a file for appending data. |
| `File.openWith`[↗](#File.openWith) | `export fn File.openWith(path: string, options: Ope` | Open a file using a validated options value. |
| `read`[↗](#File.read) | `export fn (self: &amp;File!) read(buf: Ptr&lt;u8!&gt;, len: ` | Canonical std/io Reader implementation. |
| `write`[↗](#File.write) | `export fn (self: &amp;File!) write(data: Ptr&lt;u8&gt;, len:` | Canonical std/io Writer implementation. |
| `flush`[↗](#File.flush) | `export fn (self: &amp;File!) flush(): Result&lt;(), IoErr` | File descriptors are unbuffered at this layer; durability is explicit via |
| `readByte`[↗](#File.readByte) | `export fn (self: &amp;File!) readByte(): Result&lt;u8, Io` |  |
| `writeByte`[↗](#File.writeByte) | `export fn (self: &amp;File!) writeByte(value: u8): Res` |  |
| `writeStr`[↗](#File.writeStr) | `export fn (self: &amp;File!) writeStr(value: str): Res` |  |
| `readAt`[↗](#File.readAt) | `export fn (self: &amp;File!) readAt(buf: Ptr&lt;u8!&gt;, len` | Position-independent read — never changes the sequential file cursor. |
| `writeAt`[↗](#File.writeAt) | `export fn (self: &amp;File!) writeAt(data: Ptr&lt;u8&gt;, le` | Position-independent write — never changes the sequential file cursor. |
| `seek`[↗](#File.seek) | `export fn (self: &amp;File!) seek(position: SeekFrom):` | Canonical std/io Seeker implementation. |
| `tell`[↗](#File.tell) | `export fn (self: &amp;File) tell(): Result&lt;u64, IoErro` | Get current file position. |
| `metadata`[↗](#File.metadata) | `export fn (self: &amp;File) metadata(): Result&lt;Metadat` | Query one coherent metadata snapshot for this open descriptor. |
| `size`[↗](#File.size) | `export fn (self: &amp;File) size(): Result&lt;u64, IoErro` | Get file size in bytes from the descriptor metadata snapshot. |
| `truncate`[↗](#File.truncate) | `export fn (self: &amp;File) truncate(length: u64): Res` | Truncate file to given length. |
| `sync`[↗](#File.sync) | `export fn (self: &amp;File) sync(): Result&lt;(), IoError` | Flush file data to disk. |
| `close`[↗](#File.close) | `export fn (self: &amp;File!) close(): Result&lt;(), IoErr` | Explicitly close the file. Safe to call multiple times. |
| `drop`[↗](#File.drop) | `export fn (self: &amp;File!) drop()` | Auto-close on scope exit (Drop contract). |
| `toString`[↗](#File.toString) | `export fn (self: &amp;File) toString(): string` | Human-readable representation (Display contract) — returns the file path. |
| `debug`[↗](#File.debug) | `export fn (self: &amp;File) debug(): string` | Debug representation (Debug contract). |
| `filePath`[↗](#File.filePath) | `export fn (self: &amp;File) filePath(): string` | Return the file path. |
| `isOpen`[↗](#File.isOpen) | `export fn (self: &amp;File) isOpen(): bool` | Return true if the file is currently open (fd &gt;= 0). |
| `mapRead`[↗](#File.mapRead) | `export fn (self: &amp;File) mapRead(len: usize, offset` | Create an owning read-only private mapping. Closing the File after this |
| `mmap`[↗](#File.mmap) | `export fn (self: &amp;File) mmap(len: u64, offset: i64` | Memory-map the file for read+write access. |
| `mmapRead`[↗](#File.mmapRead) | `export fn (self: &amp;File) mmapRead(len: u64, offset:` | Memory-map the file for read-only access (MAP_PRIVATE). |
| `munmap`[↗](#File.munmap) | `export fn (self: &amp;File) munmap(ptr: Ptr&lt;Opaque&gt;, l` | Unmap a memory region previously created via mmap() or mmapRead(). |
| `readAll`[↗](#File.readAll) | `export fn (self: &amp;File!) readAll(): Result&lt;Vec&lt;u8&gt;` | Read all remaining bytes from the file into a Vec&lt;u8&gt;. |
| `File.temp`[↗](#File.temp) | `export fn File.temp(): Result&lt;File, IoError&gt;` |  |

---

### <a id="MappedRegion"></a>`MappedRegion` `🔓 export`

> 📄 `file.vx` L148-151

```vex
export struct MappedRegion
```

Owning read-only memory mapping. The region is unmapped automatically and

cannot be copied, preventing double-unmap and descriptor-lifetime coupling.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `base` | `Ptr&lt;Opaque&gt;` | 🔒 private |  |
| `byteLength` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `len`[↗](#MappedRegion.len) | `export fn (self: &amp;MappedRegion) len(): usize` |  |
| `isEmpty`[↗](#MappedRegion.isEmpty) | `export fn (self: &amp;MappedRegion) isEmpty(): bool` |  |
| `readByte`[↗](#MappedRegion.readByte) | `export fn (self: &amp;MappedRegion) readByte(index: us` | Bounds-checked byte access that keeps raw pointers behind the fs boundary. |
| `copyTo`[↗](#MappedRegion.copyTo) | `export fn (self: &amp;MappedRegion) copyTo(offset: usi` | Copy a bounded region into caller-owned storage. |
| ⚠️`asPtr`[↗](#MappedRegion.asPtr) | `export fn (self: &amp;MappedRegion) asPtr(): Ptr&lt;u8&gt;` | Escape hatch for parsers/codecs that need zero-copy typed access. The |
| `unmap`[↗](#MappedRegion.unmap) | `export fn (self: &amp;MappedRegion!) unmap(): Result&lt;(` | Release the mapping early. Calling this more than once is safe. |
| `drop`[↗](#MappedRegion.drop) | `fn (self: &amp;MappedRegion!) drop()` |  |

---

### <a id="Metadata"></a>`Metadata` `🔓 export`

> 📄 `stat.vx` L20-33

```vex
export struct Metadata
```

Immutable metadata snapshot. Every field comes from the same provider call,

avoiding the race and syscall amplification of the former FileInfo API.

**Implements:** `Clone` & `Copy` & `Display` & `Debug`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `byteLength` | `u64` | 🔒 readonly |  |
| `modifiedSeconds` | `i64` | 🔒 readonly |  |
| `accessedSeconds` | `i64` | 🔒 readonly |  |
| `createdSeconds` | `i64` | 🔒 readonly |  |
| `permissionBits` | `u32` | 🔒 readonly |  |
| `kindValue` | `FileType` | 🔒 readonly |  |
| `ownerId` | `i64` | 🔒 readonly |  |
| `groupId` | `i64` | 🔒 readonly |  |
| `inodeValue` | `u64` | 🔒 readonly |  |
| `deviceValue` | `u64` | 🔒 readonly |  |
| `links` | `u64` | 🔒 readonly |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `len`[↗](#Metadata.len) | `export fn (self: &amp;Metadata) len(): u64` |  |
| `isEmpty`[↗](#Metadata.isEmpty) | `export fn (self: &amp;Metadata) isEmpty(): bool` |  |
| `fileType`[↗](#Metadata.fileType) | `export fn (self: &amp;Metadata) fileType(): FileType` |  |
| `isFile`[↗](#Metadata.isFile) | `export fn (self: &amp;Metadata) isFile(): bool` |  |
| `isDir`[↗](#Metadata.isDir) | `export fn (self: &amp;Metadata) isDir(): bool` |  |
| `isSymlink`[↗](#Metadata.isSymlink) | `export fn (self: &amp;Metadata) isSymlink(): bool` |  |
| `permissions`[↗](#Metadata.permissions) | `export fn (self: &amp;Metadata) permissions(): Permiss` |  |
| `modified`[↗](#Metadata.modified) | `export fn (self: &amp;Metadata) modified(): i64` |  |
| `accessed`[↗](#Metadata.accessed) | `export fn (self: &amp;Metadata) accessed(): i64` |  |
| `created`[↗](#Metadata.created) | `export fn (self: &amp;Metadata) created(): i64` |  |
| `uid`[↗](#Metadata.uid) | `export fn (self: &amp;Metadata) uid(): i64` |  |
| `gid`[↗](#Metadata.gid) | `export fn (self: &amp;Metadata) gid(): i64` |  |
| `inode`[↗](#Metadata.inode) | `export fn (self: &amp;Metadata) inode(): u64` |  |
| `device`[↗](#Metadata.device) | `export fn (self: &amp;Metadata) device(): u64` |  |
| `linkCount`[↗](#Metadata.linkCount) | `export fn (self: &amp;Metadata) linkCount(): u64` |  |
| `clone`[↗](#Metadata.clone) | `export fn (self: &amp;Metadata) clone(): Metadata` |  |
| `toString`[↗](#Metadata.toString) | `export fn (self: &amp;Metadata) toString(): string` |  |
| `debug`[↗](#Metadata.debug) | `export fn (self: &amp;Metadata) debug(): string` |  |

---

### <a id="Permissions"></a>`Permissions` `🔓 export`

> 📄 `permissions.vx` L13-15

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

**Implements:** `Clone` & `Copy` & `Display` & `Debug` & `Eq`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mode` | `u32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `clone`[↗](#Permissions.clone) | `export fn (self: &amp;Permissions) clone(): Permission` |  |
| `Permissions.readOnly`[↗](#Permissions.readOnly) | `export fn Permissions.readOnly(): Permissions` | Read-only file (0o444). |
| `Permissions.readWrite`[↗](#Permissions.readWrite) | `export fn Permissions.readWrite(): Permissions` | Read-write file (0o644). |
| `Permissions.executable`[↗](#Permissions.executable) | `export fn Permissions.executable(): Permissions` | Executable file (0o755). |
| `canRead`[↗](#Permissions.canRead) | `export fn (self: &amp;Permissions) canRead(): bool` | True if any entity (owner/group/other) can read. |
| `canWrite`[↗](#Permissions.canWrite) | `export fn (self: &amp;Permissions) canWrite(): bool` | True if any entity (owner/group/other) can write. |
| `canExec`[↗](#Permissions.canExec) | `export fn (self: &amp;Permissions) canExec(): bool` | True if any entity (owner/group/other) can execute. |
| `ownerCanRead`[↗](#Permissions.ownerCanRead) | `export fn (self: &amp;Permissions) ownerCanRead(): boo` | True if the owner can read. |
| `ownerCanWrite`[↗](#Permissions.ownerCanWrite) | `export fn (self: &amp;Permissions) ownerCanWrite(): bo` | True if the owner can write. |
| `ownerCanExec`[↗](#Permissions.ownerCanExec) | `export fn (self: &amp;Permissions) ownerCanExec(): boo` | True if the owner can execute. |
| `isReadOnly`[↗](#Permissions.isReadOnly) | `export fn (self: &amp;Permissions) isReadOnly(): bool` | Convenience: no entity has write permission. |
| `rawMode`[↗](#Permissions.rawMode) | `export fn (self: &amp;Permissions) rawMode(): u32` | Raw mode bits. |
| `op==`[↗](#Permissions.op==) | `export fn (self: &amp;Permissions) op==(rhs: &amp;Permissi` |  |
| `toString`[↗](#Permissions.toString) | `export fn (self: &amp;Permissions) toString(): string` |  |
| `debug`[↗](#Permissions.debug) | `export fn (self: &amp;Permissions) debug(): string` |  |

---

### <a id="MacStat"></a>`MacStat`

> 📄 `native.macos.vxc` L8-32

```vex
struct MacStat
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `st_dev` | `u32` | 🔓 public |  |
| `st_mode` | `u16` | 🔓 public |  |
| `st_nlink` | `u16` | 🔓 public |  |
| `st_ino` | `u64` | 🔓 public |  |
| `st_uid` | `u32` | 🔓 public |  |
| `st_gid` | `u32` | 🔓 public |  |
| `st_rdev` | `u32` | 🔓 public |  |
| `_pad1` | `u32` | 🔓 public |  |
| `st_atime` | `i64` | 🔓 public |  |
| `st_atimensec` | `i64` | 🔓 public |  |
| `st_mtime` | `i64` | 🔓 public |  |
| `st_mtimensec` | `i64` | 🔓 public |  |
| `st_ctime` | `i64` | 🔓 public |  |
| `st_ctimensec` | `i64` | 🔓 public |  |
| `st_birthtime` | `i64` | 🔓 public |  |
| `st_birthtimensec` | `i64` | 🔓 public |  |
| `st_size` | `i64` | 🔓 public |  |
| `st_blocks` | `i64` | 🔓 public |  |
| `st_blksize` | `i32` | 🔓 public |  |
| `st_flags` | `u32` | 🔓 public |  |
| `st_gen` | `u32` | 🔓 public |  |
| `_pad2` | `[u8; 20]` | 🔓 public |  |

---

### <a id="MacDirent"></a>`MacDirent`

> 📄 `native.macos.vxc` L131-140

```vex
struct MacDirent
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `d_ino` | `u64` | 🔓 public |  |
| `d_seekoff` | `u64` | 🔓 public |  |
| `d_reclen` | `u16` | 🔓 public |  |
| `d_namlen` | `u16` | 🔓 public |  |
| `d_type` | `u8` | 🔓 public |  |
| `d_name` | `[u8; 1024]` | 🔓 public |  |
| `_pad` | `[u8; 3]` | 🔓 public |  |

---

### <a id="TempDirEntry"></a>`TempDirEntry`

> 📄 `native.macos.vxc` L519-525

```vex
struct TempDirEntry
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name_buf` | `[u8; 256]` | 🔓 public |  |
| `entry_type` | `u8` | 🔓 public |  |
| `_pad` | `[u8; 7]` | 🔓 public |  |
| `inode` | `u64` | 🔓 public |  |

---

### <a id="Path"></a>`Path` `🔓 export`

> 📄 `path.vx` L10-12

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
| `asStr`[↗](#Path.asStr) | `export fn (self: &amp;Path) asStr(): str` | Borrows the native path spelling without allocating. |
| `len`[↗](#Path.len) | `export fn (self: &amp;Path) len(): usize` |  |
| `toString`[↗](#Path.toString) | `export fn (self: &amp;Path) toString(): string` |  |
| `debug`[↗](#Path.debug) | `export fn (self: &amp;Path) debug(): string` |  |
| `clone`[↗](#Path.clone) | `export fn (self: &amp;Path) clone(): Path` |  |
| `op==`[↗](#Path.op==) | `export fn (self: &amp;Path) op==(rhs: &amp;Path): bool` |  |
| `join`[↗](#Path.join) | `export fn (self: &amp;Path) join(other: string): Path` | Joins a component using the compile target's preferred separator. An |
| `parent`[↗](#Path.parent) | `export fn (self: &amp;Path) parent(): Path` | Returns the lexical parent without touching the filesystem. |
| `fileName`[↗](#Path.fileName) | `export fn (self: &amp;Path) fileName(): string` | Returns the final component, or an empty string for a trailing separator. |
| `extension`[↗](#Path.extension) | `export fn (self: &amp;Path) extension(): string` |  |
| `stem`[↗](#Path.stem) | `export fn (self: &amp;Path) stem(): string` |  |
| `exists`[↗](#Path.exists) | `export fn (self: &amp;Path) exists(): bool` |  |
| `isReadable`[↗](#Path.isReadable) | `export fn (self: &amp;Path) isReadable(): bool` |  |
| `isWritable`[↗](#Path.isWritable) | `export fn (self: &amp;Path) isWritable(): bool` |  |
| `isAbsolute`[↗](#Path.isAbsolute) | `export fn (self: &amp;Path) isAbsolute(): bool` | A fully qualified path. Windows root-relative (`\foo`) and drive-relative |
| `isRelative`[↗](#Path.isRelative) | `export fn (self: &amp;Path) isRelative(): bool` |  |
| `isDir`[↗](#Path.isDir) | `export fn (self: &amp;Path) isDir(): bool` |  |
| `isFile`[↗](#Path.isFile) | `export fn (self: &amp;Path) isFile(): bool` |  |
| `isSymlink`[↗](#Path.isSymlink) | `export fn (self: &amp;Path) isSymlink(): bool` |  |
| `canonicalize`[↗](#Path.canonicalize) | `export fn (self: &amp;Path) canonicalize(): Result&lt;Pat` | Resolves symlinks and returns an absolute native path. Provider errors are |
| `withExtension`[↗](#Path.withExtension) | `export fn (self: &amp;Path) withExtension(extension: s` | Replaces the final extension. An empty extension removes the existing one. |
| `clean`[↗](#Path.clean) | `export fn (self: &amp;Path) clean(): Path` | Lexically resolves `.` and `..` without filesystem access. The target's |
| `components`[↗](#Path.components) | `export fn (self: &amp;Path) components(): Vec&lt;string&gt;` | Splits the path while keeping a drive/UNC/root prefix as the first item. |

---

### <a id="FsMetadataRaw"></a>`FsMetadataRaw` `🔓 export`

> 📄 `metadata_raw.vxc` L10-24

```vex
export struct FsMetadataRaw
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `size` | `i64` | 🔓 public |  |
| `modified` | `i64` | 🔓 public |  |
| `accessed` | `i64` | 🔓 public |  |
| `created` | `i64` | 🔓 public |  |
| `mode` | `u32` | 🔓 public |  |
| `kind` | `u8` | 🔓 public |  |
| `_padding` | `[u8; 3]` | 🔓 public |  |
| `uid` | `i64` | 🔓 public |  |
| `gid` | `i64` | 🔓 public |  |
| `inode` | `u64` | 🔓 public |  |
| `device` | `u64` | 🔓 public |  |
| `linkCount` | `u64` | 🔓 public |  |

---

### <a id="LinuxStat"></a>`LinuxStat`

> 📄 `native.linux.vxc` L8-28

```vex
struct LinuxStat
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `st_dev` | `u64` | 🔓 public |  |
| `st_ino` | `u64` | 🔓 public |  |
| `st_mode` | `u32` | 🔓 public |  |
| `st_nlink` | `u32` | 🔓 public |  |
| `st_uid` | `u32` | 🔓 public |  |
| `st_gid` | `u32` | 🔓 public |  |
| `st_rdev` | `u64` | 🔓 public |  |
| `__pad1` | `u64` | 🔓 public |  |
| `st_size` | `i64` | 🔓 public |  |
| `st_blksize` | `i64` | 🔓 public |  |
| `st_blocks` | `i64` | 🔓 public |  |
| `st_atime` | `i64` | 🔓 public |  |
| `st_atimensec` | `i64` | 🔓 public |  |
| `st_mtime` | `i64` | 🔓 public |  |
| `st_mtimensec` | `i64` | 🔓 public |  |
| `st_ctime` | `i64` | 🔓 public |  |
| `st_ctimensec` | `i64` | 🔓 public |  |
| `__unused` | `[u64; 1]` | 🔓 public |  |

---

### <a id="LinuxDirent"></a>`LinuxDirent`

> 📄 `native.linux.vxc` L88-96

```vex
struct LinuxDirent
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `d_ino` | `u64` | 🔓 public |  |
| `d_off` | `u64` | 🔓 public |  |
| `d_reclen` | `u16` | 🔓 public |  |
| `d_type` | `u8` | 🔓 public |  |
| `d_name` | `[u8; 256]` | 🔓 public |  |
| `_pad` | `[u8; 5]` | 🔓 public |  |

---

### <a id="TempDirEntry"></a>`TempDirEntry`

> 📄 `native.linux.vxc` L475-481

```vex
struct TempDirEntry
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name_buf` | `[u8; 256]` | 🔓 public |  |
| `entry_type` | `u8` | 🔓 public |  |
| `_pad` | `[u8; 7]` | 🔓 public |  |
| `inode` | `u64` | 🔓 public |  |

---

### <a id="FileTime"></a>`FileTime`

> 📄 `windows_provider.vxc` L18-21

```vex
struct FileTime
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `low` | `u32` | 🔒 private |  |
| `high` | `u32` | 🔒 private |  |

---

### <a id="ByHandleFileInformation"></a>`ByHandleFileInformation`

> 📄 `windows_provider.vxc` L23-34

```vex
struct ByHandleFileInformation
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `attributes` | `u32` | 🔒 private |  |
| `creationTime` | `FileTime` | 🔒 private |  |
| `accessTime` | `FileTime` | 🔒 private |  |
| `writeTime` | `FileTime` | 🔒 private |  |
| `volumeSerial` | `u32` | 🔒 private |  |
| `sizeHigh` | `u32` | 🔒 private |  |
| `sizeLow` | `u32` | 🔒 private |  |
| `linkCount` | `u32` | 🔒 private |  |
| `fileIndexHigh` | `u32` | 🔒 private |  |
| `fileIndexLow` | `u32` | 🔒 private |  |

---

### <a id="FindDataW"></a>`FindDataW`

> 📄 `windows_provider.vxc` L36-47

```vex
struct FindDataW
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `attributes` | `u32` | 🔒 private |  |
| `creationTime` | `FileTime` | 🔒 private |  |
| `accessTime` | `FileTime` | 🔒 private |  |
| `writeTime` | `FileTime` | 🔒 private |  |
| `sizeHigh` | `u32` | 🔒 private |  |
| `sizeLow` | `u32` | 🔒 private |  |
| `reserved0` | `u32` | 🔒 private |  |
| `reserved1` | `u32` | 🔒 private |  |
| `fileName` | `[u16; 260]` | 🔒 private |  |
| `alternateName` | `[u16; 14]` | 🔒 private |  |

---

### <a id="WindowsDirCursor"></a>`WindowsDirCursor`

> 📄 `windows_provider.vxc` L49-53

```vex
struct WindowsDirCursor
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handle` | `Ptr&lt;Opaque&gt;` | 🔒 private |  |
| `current` | `FindDataW` | 🔒 private |  |
| `firstPending` | `bool` | 🔒 private |  |

---

### <a id="DirList"></a>`DirList` `🔓 export`

> 📄 `dir.vx` L32-36

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

> 📄 `dir.vx` L222-226

```vex
export struct DirCursor
```

Owning O(n) directory stream. A cursor opens the provider once, advances

monotonically, and closes automatically on scope exit.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handle` | `Ptr&lt;Opaque&gt;` | 🔒 private |  |
| `pageSize` | `usize` | 🔒 private |  |
| `done` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `DirCursor.open`[↗](#DirCursor.open) | `export fn DirCursor.open(path: string, pageSize: u` |  |
| `close`[↗](#DirCursor.close) | `export fn (self: &amp;DirCursor!) close(): Result&lt;(), ` |  |
| `drop`[↗](#DirCursor.drop) | `fn (self: &amp;DirCursor!) drop()` |  |
| `nextPageLimit`[↗](#DirCursor.nextPageLimit) | `fn (self: &amp;DirCursor!) nextPageLimit(limit: usize)` |  |
| `nextPage`[↗](#DirCursor.nextPage) | `export fn (self: &amp;DirCursor!) nextPage(): Result&lt;V` | Fetch next page from cursor. |

---

### <a id="DirEntry"></a>`DirEntry` `🔓 export`

> 📄 `dir_entry.vxc` L6-12

```vex
export struct DirEntry
```

**Implements:** `Clone` & `Copy` & `Display`

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
| `clone`[↗](#DirEntry.clone) | `export fn (self: &amp;DirEntry) clone(): DirEntry` |  |
| `name`[↗](#DirEntry.name) | `export fn (self: &amp;DirEntry) name(): string` | Returns the entry name without retaining or exposing the fixed native ABI |
| `toString`[↗](#DirEntry.toString) | `export fn (self: &amp;DirEntry) toString(): string` |  |
| `isDir`[↗](#DirEntry.isDir) | `export fn (self: &amp;DirEntry) isDir(): bool` |  |
| `isFile`[↗](#DirEntry.isFile) | `export fn (self: &amp;DirEntry) isFile(): bool` |  |
| `isSymlink`[↗](#DirEntry.isSymlink) | `export fn (self: &amp;DirEntry) isSymlink(): bool` |  |

---

## Enums

### <a id="FileType"></a>`FileType` `🔓 export`

> 📄 `stat.vx` L11-16

```vex
export enum FileType
```

Portable file kind derived from one native metadata snapshot.

**Variants:**

- `File`
- `Directory`
- `Symlink`
- `Other`

---

## Functions

### <a id="vex_fs_last_error"></a>`vex_fs_last_error` `🔓 export`

> 📄 `native.vxc` L12-12

```vex
export fn vex_fs_last_error(): i32
```

**Returns:** `i32`

---

### <a id="vex_fs_unlink"></a>`vex_fs_unlink` `🔓 export`

> 📄 `native.vxc` L14-14

```vex
export fn vex_fs_unlink(_path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_rename"></a>`vex_fs_rename` `🔓 export`

> 📄 `native.vxc` L15-15

```vex
export fn vex_fs_rename(_oldPath: Ptr<u8>, _newPath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_oldPath` | `Ptr&lt;u8&gt;` |  |
| `_newPath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_mkdir"></a>`vex_fs_mkdir` `🔓 export`

> 📄 `native.vxc` L16-16

```vex
export fn vex_fs_mkdir(_path: Ptr<u8>, _mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |
| `_mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_rmdir"></a>`vex_fs_rmdir` `🔓 export`

> 📄 `native.vxc` L17-17

```vex
export fn vex_fs_rmdir(_path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_exists"></a>`vex_fs_exists` `🔓 export`

> 📄 `native.vxc` L18-18

```vex
export fn vex_fs_exists(_path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_access"></a>`vex_fs_access` `🔓 export`

> 📄 `native.vxc` L19-19

```vex
export fn vex_fs_access(_path: Ptr<u8>, _mode: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |
| `_mode` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_getcwd"></a>`vex_fs_getcwd` `🔓 export`

> 📄 `native.vxc` L20-20

```vex
export fn vex_fs_getcwd(_buffer: Ptr<u8!>, _size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_buffer` | `Ptr&lt;u8!&gt;` |  |
| `_size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_chdir"></a>`vex_fs_chdir` `🔓 export`

> 📄 `native.vxc` L21-21

```vex
export fn vex_fs_chdir(_path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_chmod"></a>`vex_fs_chmod` `🔓 export`

> 📄 `native.vxc` L22-22

```vex
export fn vex_fs_chmod(_path: Ptr<u8>, _mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |
| `_mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_is_readable"></a>`vex_fs_is_readable` `🔓 export`

> 📄 `native.vxc` L23-23

```vex
export fn vex_fs_is_readable(_path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_is_writable"></a>`vex_fs_is_writable` `🔓 export`

> 📄 `native.vxc` L24-24

```vex
export fn vex_fs_is_writable(_path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_symlink"></a>`vex_fs_symlink` `🔓 export`

> 📄 `native.vxc` L26-26

```vex
export fn vex_fs_symlink(_target: Ptr<u8>, _linkPath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_target` | `Ptr&lt;u8&gt;` |  |
| `_linkPath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_link"></a>`vex_fs_link` `🔓 export`

> 📄 `native.vxc` L27-27

```vex
export fn vex_fs_link(_oldPath: Ptr<u8>, _newPath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_oldPath` | `Ptr&lt;u8&gt;` |  |
| `_newPath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_readlink"></a>`vex_fs_readlink` `🔓 export`

> 📄 `native.vxc` L28-30

```vex
export fn vex_fs_readlink(_path: Ptr<u8>, _buffer: Ptr<u8>, _size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |
| `_buffer` | `Ptr&lt;u8&gt;` |  |
| `_size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mkstemp"></a>`vex_fs_mkstemp` `🔓 export`

> 📄 `native.vxc` L32-32

```vex
export fn vex_fs_mkstemp(_pathBuffer: Ptr<u8!>, _bufferSize: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_pathBuffer` | `Ptr&lt;u8!&gt;` |  |
| `_bufferSize` | `u64` |  |

**Returns:** `i32`

---

### <a id="vex_fs_metadata"></a>`vex_fs_metadata` `🔓 export`

> 📄 `native.vxc` L33-35

```vex
export fn vex_fs_metadata(_path: Ptr<u8>, _followSymlinks: bool, _out: Ptr<FsMetadataRaw!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |
| `_followSymlinks` | `bool` |  |
| `_out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_file_metadata"></a>`vex_fs_file_metadata` `🔓 export`

> 📄 `native.vxc` L36-38

```vex
export fn vex_fs_file_metadata(_fd: i32, _out: Ptr<FsMetadataRaw!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_fd` | `i32` |  |
| `_out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_dir_open"></a>`vex_fs_dir_open` `🔓 export`

> 📄 `native.vxc` L40-40

```vex
export fn vex_fs_dir_open(_path: Ptr<u8>): Ptr<Opaque>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="vex_fs_dir_read"></a>`vex_fs_dir_read` `🔓 export`

> 📄 `native.vxc` L41-43

```vex
export fn vex_fs_dir_read(_directory: Ptr<Opaque>, _entries: Ptr<Opaque>, _maximum: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_directory` | `Ptr&lt;Opaque&gt;` |  |
| `_entries` | `Ptr&lt;Opaque&gt;` |  |
| `_maximum` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_dir_close"></a>`vex_fs_dir_close` `🔓 export`

> 📄 `native.vxc` L44-44

```vex
export fn vex_fs_dir_close(_directory: Ptr<Opaque>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_directory` | `Ptr&lt;Opaque&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_readdir_from"></a>`vex_fs_readdir_from` `🔓 export`

> 📄 `native.vxc` L45-47

```vex
export fn vex_fs_readdir_from(_path: Ptr<u8>, _entries: Ptr<Opaque>, _maximum: u64, _skip: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |
| `_entries` | `Ptr&lt;Opaque&gt;` |  |
| `_maximum` | `u64` |  |
| `_skip` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_readdir"></a>`vex_fs_readdir` `🔓 export`

> 📄 `native.vxc` L48-50

```vex
export fn vex_fs_readdir(_path: Ptr<u8>, _entries: Ptr<Opaque>, _maximum: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |
| `_entries` | `Ptr&lt;Opaque&gt;` |  |
| `_maximum` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mkdir_all"></a>`vex_fs_mkdir_all` `🔓 export`

> 📄 `native.vxc` L52-52

```vex
export fn vex_fs_mkdir_all(_path: Ptr<u8>, _mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |
| `_mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_temp_dir"></a>`vex_fs_temp_dir` `🔓 export`

> 📄 `native.vxc` L53-55

```vex
export fn vex_fs_temp_dir(_buffer: Ptr<u8>, _size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_buffer` | `Ptr&lt;u8&gt;` |  |
| `_size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_realpath"></a>`vex_fs_realpath` `🔓 export`

> 📄 `native.vxc` L56-58

```vex
export fn vex_fs_realpath(_path: Ptr<u8>, _buffer: Ptr<u8>, _size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_path` | `Ptr&lt;u8&gt;` |  |
| `_buffer` | `Ptr&lt;u8&gt;` |  |
| `_size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mmap"></a>`vex_fs_mmap` `🔓 export`

> 📄 `native.vxc` L60-63

```vex
export fn vex_fs_mmap(_address: Ptr<Opaque>, _length: u64, _protection: i32, _flags: i32, _fd: i32, _offset: i64): Ptr<Opaque>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_address` | `Ptr&lt;Opaque&gt;` |  |
| `_length` | `u64` |  |
| `_protection` | `i32` |  |
| `_flags` | `i32` |  |
| `_fd` | `i32` |  |
| `_offset` | `i64` |  |

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="vex_fs_munmap"></a>`vex_fs_munmap` `🔓 export`

> 📄 `native.vxc` L64-64

```vex
export fn vex_fs_munmap(_address: Ptr<Opaque>, _length: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_address` | `Ptr&lt;Opaque&gt;` |  |
| `_length` | `u64` |  |

**Returns:** `i32`

---

### <a id="openConfigured"></a>`openConfigured`

> 📄 `file.vx` L97-128

```vex
fn openConfigured(path: string, options: OpenOptions): Result<File, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `options` | `OpenOptions` |  |

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="closedFileError"></a>`closedFileError`

> 📄 `file.vx` L212-214

```vex
fn closedFileError(): IoError
```

**Returns:** `IoError`

---

### <a id="descriptorError"></a>`descriptorError`

> 📄 `file.vx` L217-223

```vex
fn descriptorError(result: i64, fallback: str): IoError
```

VexArch descriptor operations return `-portable_errno` on every target.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `result` | `i64` |  |
| `fallback` | `str` |  |

**Returns:** `IoError`

---

### <a id="_openFile"></a>`_openFile`

> 📄 `file.vx` L228-230

```vex
fn _openFile(path: string): Result<File, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="_createFile"></a>`_createFile`

> 📄 `file.vx` L240-242

```vex
fn _createFile(path: string): Result<File, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="_openReadWrite"></a>`_openReadWrite`

> 📄 `file.vx` L252-254

```vex
fn _openReadWrite(path: string): Result<File, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="_openAppend"></a>`_openAppend`

> 📄 `file.vx` L264-266

```vex
fn _openAppend(path: string): Result<File, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="openFile"></a>`openFile` `🔓 export`

> 📄 `file.vx` L281-281

```vex
export fn openFile(path: string): Result<File, IoError>
```

Function-form constructors for code that prefers package-level operations.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="createFile"></a>`createFile` `🔓 export`

> 📄 `file.vx` L282-282

```vex
export fn createFile(path: string): Result<File, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="openReadWrite"></a>`openReadWrite` `🔓 export`

> 📄 `file.vx` L283-283

```vex
export fn openReadWrite(path: string): Result<File, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="openAppend"></a>`openAppend` `🔓 export`

> 📄 `file.vx` L284-284

```vex
export fn openAppend(path: string): Result<File, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="readBytes"></a>`readBytes` `🔓 export`

> 📄 `file.vx` L605-621

```vex
export fn readBytes(path: string): Result<Vec<u8>, IoError>
```

Read the entire file as bytes using the canonical partial-read-safe loop.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;Vec&lt;u8&gt;, IoError&gt;`

---

### <a id="readBytesLimit"></a>`readBytesLimit` `🔓 export`

> 📄 `file.vx` L624-640

```vex
export fn readBytesLimit(path: string, maximum: usize): Result<Vec<u8>, IoError>
```

Read a complete file while enforcing an explicit allocation ceiling.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `maximum` | `usize` |  |

**Returns:** `Result&lt;Vec&lt;u8&gt;, IoError&gt;`

---

### <a id="readFile"></a>`readFile` `🔓 export`

> 📄 `file.vx` L643-659

```vex
export fn readFile(path: string): Result<string, IoError>
```

Read the entire file as strict UTF-8 text.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;string, IoError&gt;`

---

### <a id="readFileLimit"></a>`readFileLimit` `🔓 export`

> 📄 `file.vx` L662-678

```vex
export fn readFileLimit(path: string, maximum: usize): Result<string, IoError>
```

Read strict UTF-8 text while enforcing an explicit byte ceiling.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `maximum` | `usize` |  |

**Returns:** `Result&lt;string, IoError&gt;`

---

### <a id="writeFile"></a>`writeFile` `🔓 export`

> 📄 `file.vx` L681-692

```vex
export fn writeFile(path: string, content: string): Result<(), IoError>
```

Write complete text to a file, creating or truncating it.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `content` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="appendFile"></a>`appendFile` `🔓 export`

> 📄 `file.vx` L695-706

```vex
export fn appendFile(path: string, content: string): Result<(), IoError>
```

Append complete text, creating the file when needed.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `content` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="copyFile"></a>`copyFile` `🔓 export`

> 📄 `file.vx` L710-739

```vex
export fn copyFile(src: string, dst: string): Result<u64, IoError>
```

Copy a file through the canonical Reader/Writer contracts. Partial writes,

zero-progress providers and invalid byte counts are handled by std/io.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `src` | `string` |  |
| `dst` | `string` |  |

**Returns:** `Result&lt;u64, IoError&gt;`

---

### <a id="renameFile"></a>`renameFile` `🔓 export`

> 📄 `file.vx` L742-746

```vex
export fn renameFile(oldpath: string, newpath: string): Result<(), IoError>
```

Rename or move a file within the provider's supported filesystem scope.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `oldpath` | `string` |  |
| `newpath` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="removeFile"></a>`removeFile` `🔓 export`

> 📄 `file.vx` L749-753

```vex
export fn removeFile(path: string): Result<(), IoError>
```

Delete a file.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="exists"></a>`exists` `🔓 export`

> 📄 `file.vx` L756-758

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

### <a id="tryExists"></a>`tryExists` `🔓 export`

> 📄 `file.vx` L761-769

```vex
export fn tryExists(path: string): Result<bool, IoError>
```

Check existence without conflating absence with permission/provider errors.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;bool, IoError&gt;`

---

### <a id="createDir"></a>`createDir` `🔓 export`

> 📄 `file.vx` L776-780

```vex
export fn createDir(path: string): Result<(), IoError>
```

Create a directory (mode 0755).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="removeDir"></a>`removeDir` `🔓 export`

> 📄 `file.vx` L783-787

```vex
export fn removeDir(path: string): Result<(), IoError>
```

Remove an empty directory.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="cwd"></a>`cwd` `🔓 export`

> 📄 `file.vx` L790-796

```vex
export fn cwd(): Result<string, IoError>
```

Get current working directory.

**Returns:** `Result&lt;string, IoError&gt;`

---

### <a id="chdir"></a>`chdir` `🔓 export`

> 📄 `file.vx` L799-803

```vex
export fn chdir(path: string): Result<(), IoError>
```

Change current working directory.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="changeMode"></a>`changeMode` `🔓 export`

> 📄 `file.vx` L806-810

```vex
export fn changeMode(path: string, mode: u32): Result<(), IoError>
```

Set file permissions (chmod).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `mode` | `u32` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="_tempFile"></a>`_tempFile`

> 📄 `file.vx` L819-851

```vex
fn _tempFile(): Result<File, IoError>
```

Create a unique temporary file (like Go's os.CreateTemp).

The returned File is open for read+write. Path is filled automatically.
Caller is responsible for removing the file when done.

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="tempFile"></a>`tempFile` `🔓 export`

> 📄 `file.vx` L857-857

```vex
export fn tempFile(): Result<File, IoError>
```

**Returns:** `Result&lt;File, IoError&gt;`

---

### <a id="createSymlink"></a>`createSymlink` `🔓 export`

> 📄 `file.vx` L864-868

```vex
export fn createSymlink(target: string, linkpath: string): Result<(), IoError>
```

Create a symbolic link pointing to `target` at `linkpath`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `target` | `string` |  |
| `linkpath` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="symlink"></a>`symlink` `🔓 export`

> 📄 `file.vx` L871-873

```vex
export fn symlink(target: string, linkpath: string): Result<(), IoError>
```

Function-form alias for `createSymlink`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `target` | `string` |  |
| `linkpath` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="hardlink"></a>`hardlink` `🔓 export`

> 📄 `file.vx` L876-880

```vex
export fn hardlink(oldpath: string, newpath: string): Result<(), IoError>
```

Create a hard link from `oldpath` to `newpath`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `oldpath` | `string` |  |
| `newpath` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="readSymlink"></a>`readSymlink` `🔓 export`

> 📄 `file.vx` L883-890

```vex
export fn readSymlink(path: string): Result<string, IoError>
```

Read the target path of a symbolic link.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;string, IoError&gt;`

---

### <a id="readlink"></a>`readlink` `🔓 export`

> 📄 `file.vx` L893-895

```vex
export fn readlink(path: string): Result<string, IoError>
```

Function-form alias for `readSymlink`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;string, IoError&gt;`

---

### <a id="fileTypeFromRaw"></a>`fileTypeFromRaw`

> 📄 `stat.vx` L35-40

```vex
fn fileTypeFromRaw(kind: u8): FileType
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `u8` |  |

**Returns:** `FileType`

---

### <a id="metadataFromRaw"></a>`metadataFromRaw` `🔓 export`

> 📄 `stat.vx` L42-56

```vex
export fn metadataFromRaw(raw: &FsMetadataRaw): Metadata
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `&amp;FsMetadataRaw` |  |

**Returns:** `Metadata`

---

### <a id="queryMetadata"></a>`queryMetadata`

> 📄 `stat.vx` L58-66

```vex
fn queryMetadata(path: string, followSymlinks: bool): Result<Metadata, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `followSymlinks` | `bool` |  |

**Returns:** `Result&lt;Metadata, IoError&gt;`

---

### <a id="metadata"></a>`metadata` `🔓 export`

> 📄 `stat.vx` L69-71

```vex
export fn metadata(path: string): Result<Metadata, IoError>
```

Query metadata while following the final symbolic link.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;Metadata, IoError&gt;`

---

### <a id="symlinkMetadata"></a>`symlinkMetadata` `🔓 export`

> 📄 `stat.vx` L74-76

```vex
export fn symlinkMetadata(path: string): Result<Metadata, IoError>
```

Query metadata for the link itself rather than its target.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;Metadata, IoError&gt;`

---

### <a id="pathIsDir"></a>`pathIsDir` `🔓 export`

> 📄 `stat.vx` L123-125

```vex
export fn pathIsDir(path: string): bool
```

Convenience predicates intentionally collapse provider errors to false.

Use `metadata`/`symlinkMetadata` when the distinction matters.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `bool`

---

### <a id="pathIsFile"></a>`pathIsFile` `🔓 export`

> 📄 `stat.vx` L127-129

```vex
export fn pathIsFile(path: string): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `bool`

---

### <a id="pathIsSymlink"></a>`pathIsSymlink` `🔓 export`

> 📄 `stat.vx` L131-133

```vex
export fn pathIsSymlink(path: string): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `bool`

---

### <a id="Permissions"></a>`Permissions` `🔓 export`

> 📄 `permissions.vx` L24-26

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
| `clone`[↗](#Permissions.clone) | `export fn (self: &amp;Permissions) clone(): Permission` |  |
| `Permissions.readOnly`[↗](#Permissions.readOnly) | `export fn Permissions.readOnly(): Permissions` | Read-only file (0o444). |
| `Permissions.readWrite`[↗](#Permissions.readWrite) | `export fn Permissions.readWrite(): Permissions` | Read-write file (0o644). |
| `Permissions.executable`[↗](#Permissions.executable) | `export fn Permissions.executable(): Permissions` | Executable file (0o755). |
| `canRead`[↗](#Permissions.canRead) | `export fn (self: &amp;Permissions) canRead(): bool` | True if any entity (owner/group/other) can read. |
| `canWrite`[↗](#Permissions.canWrite) | `export fn (self: &amp;Permissions) canWrite(): bool` | True if any entity (owner/group/other) can write. |
| `canExec`[↗](#Permissions.canExec) | `export fn (self: &amp;Permissions) canExec(): bool` | True if any entity (owner/group/other) can execute. |
| `ownerCanRead`[↗](#Permissions.ownerCanRead) | `export fn (self: &amp;Permissions) ownerCanRead(): boo` | True if the owner can read. |
| `ownerCanWrite`[↗](#Permissions.ownerCanWrite) | `export fn (self: &amp;Permissions) ownerCanWrite(): bo` | True if the owner can write. |
| `ownerCanExec`[↗](#Permissions.ownerCanExec) | `export fn (self: &amp;Permissions) ownerCanExec(): boo` | True if the owner can execute. |
| `isReadOnly`[↗](#Permissions.isReadOnly) | `export fn (self: &amp;Permissions) isReadOnly(): bool` | Convenience: no entity has write permission. |
| `rawMode`[↗](#Permissions.rawMode) | `export fn (self: &amp;Permissions) rawMode(): u32` | Raw mode bits. |
| `op==`[↗](#Permissions.op==) | `export fn (self: &amp;Permissions) op==(rhs: &amp;Permissi` |  |
| `toString`[↗](#Permissions.toString) | `export fn (self: &amp;Permissions) toString(): string` |  |
| `debug`[↗](#Permissions.debug) | `export fn (self: &amp;Permissions) debug(): string` |  |

---

### <a id="new_stat"></a>`new_stat` `🔓 export`

> 📄 `native.macos.vxc` L34-59

```vex
export fn new_stat(): MacStat
```

**Returns:** `MacStat`

---

### <a id="vex_fs_last_error"></a>`vex_fs_last_error` `🔓 export`

> 📄 `native.macos.vxc` L90-128

```vex
export fn vex_fs_last_error(): i32
```

**Returns:** `i32`

---

### <a id="vex_fs_unlink"></a>`vex_fs_unlink` `🔓 export`

> 📄 `native.macos.vxc` L144-147

```vex
export fn vex_fs_unlink(path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_rename"></a>`vex_fs_rename` `🔓 export`

> 📄 `native.macos.vxc` L149-152

```vex
export fn vex_fs_rename(oldpath: Ptr<u8>, newpath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `oldpath` | `Ptr&lt;u8&gt;` |  |
| `newpath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_mkdir"></a>`vex_fs_mkdir` `🔓 export`

> 📄 `native.macos.vxc` L154-157

```vex
export fn vex_fs_mkdir(path: Ptr<u8>, mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_rmdir"></a>`vex_fs_rmdir` `🔓 export`

> 📄 `native.macos.vxc` L159-162

```vex
export fn vex_fs_rmdir(path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_exists"></a>`vex_fs_exists` `🔓 export`

> 📄 `native.macos.vxc` L164-167

```vex
export fn vex_fs_exists(path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_access"></a>`vex_fs_access` `🔓 export`

> 📄 `native.macos.vxc` L169-172

```vex
export fn vex_fs_access(path: Ptr<u8>, mode: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `mode` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_getcwd"></a>`vex_fs_getcwd` `🔓 export`

> 📄 `native.macos.vxc` L174-186

```vex
export fn vex_fs_getcwd(buf: Ptr<u8!>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_chdir"></a>`vex_fs_chdir` `🔓 export`

> 📄 `native.macos.vxc` L188-191

```vex
export fn vex_fs_chdir(path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_chmod"></a>`vex_fs_chmod` `🔓 export`

> 📄 `native.macos.vxc` L193-196

```vex
export fn vex_fs_chmod(path: Ptr<u8>, mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_is_readable"></a>`vex_fs_is_readable` `🔓 export`

> 📄 `native.macos.vxc` L198-201

```vex
export fn vex_fs_is_readable(path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_is_writable"></a>`vex_fs_is_writable` `🔓 export`

> 📄 `native.macos.vxc` L203-206

```vex
export fn vex_fs_is_writable(path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_symlink"></a>`vex_fs_symlink` `🔓 export`

> 📄 `native.macos.vxc` L210-213

```vex
export fn vex_fs_symlink(target: Ptr<u8>, linkpath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `target` | `Ptr&lt;u8&gt;` |  |
| `linkpath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_link"></a>`vex_fs_link` `🔓 export`

> 📄 `native.macos.vxc` L215-218

```vex
export fn vex_fs_link(oldpath: Ptr<u8>, newpath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `oldpath` | `Ptr&lt;u8&gt;` |  |
| `newpath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_readlink"></a>`vex_fs_readlink` `🔓 export`

> 📄 `native.macos.vxc` L220-223

```vex
export fn vex_fs_readlink(path: Ptr<u8>, buf: Ptr<u8>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mkstemp"></a>`vex_fs_mkstemp` `🔓 export`

> 📄 `native.macos.vxc` L225-319

```vex
export fn vex_fs_mkstemp(path_buf: Ptr<u8!>, buf_size: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path_buf` | `Ptr&lt;u8!&gt;` |  |
| `buf_size` | `u64` |  |

**Returns:** `i32`

---

### <a id="fill_metadata"></a>`fill_metadata`

> 📄 `native.macos.vxc` L323-351

```vex
fn fill_metadata(st: &MacStat, out: Ptr<FsMetadataRaw!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `st` | `&amp;MacStat` |  |
| `out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_metadata"></a>`vex_fs_metadata` `🔓 export`

> 📄 `native.macos.vxc` L353-362

```vex
export fn vex_fs_metadata(path: Ptr<u8>, followSymlinks: bool, out: Ptr<FsMetadataRaw!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `followSymlinks` | `bool` |  |
| `out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_file_metadata"></a>`vex_fs_file_metadata` `🔓 export`

> 📄 `native.macos.vxc` L364-369

```vex
export fn vex_fs_file_metadata(fd: i32, out: Ptr<FsMetadataRaw!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_dir_open"></a>`vex_fs_dir_open` `🔓 export`

> 📄 `native.macos.vxc` L373-375

```vex
export fn vex_fs_dir_open(path: Ptr<u8>): Ptr<Opaque>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="vex_fs_dir_read"></a>`vex_fs_dir_read` `🔓 export`

> 📄 `native.macos.vxc` L377-421

```vex
export fn vex_fs_dir_read(dir: Ptr<Opaque>, entries: Ptr<Opaque>, max_entries: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dir` | `Ptr&lt;Opaque&gt;` |  |
| `entries` | `Ptr&lt;Opaque&gt;` |  |
| `max_entries` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_dir_close"></a>`vex_fs_dir_close` `🔓 export`

> 📄 `native.macos.vxc` L423-426

```vex
export fn vex_fs_dir_close(dir: Ptr<Opaque>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dir` | `Ptr&lt;Opaque&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_readdir_from"></a>`vex_fs_readdir_from` `🔓 export`

> 📄 `native.macos.vxc` L428-445

```vex
export fn vex_fs_readdir_from(path: Ptr<u8>, entries: Ptr<Opaque>, max_entries: u64, skip_entries: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `entries` | `Ptr&lt;Opaque&gt;` |  |
| `max_entries` | `u64` |  |
| `skip_entries` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_readdir"></a>`vex_fs_readdir` `🔓 export`

> 📄 `native.macos.vxc` L447-449

```vex
export fn vex_fs_readdir(path: Ptr<u8>, entries: Ptr<Opaque>, max_entries: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `entries` | `Ptr&lt;Opaque&gt;` |  |
| `max_entries` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mkdir_all_raw"></a>`vex_fs_mkdir_all_raw`

> 📄 `native.macos.vxc` L453-496

```vex
fn vex_fs_mkdir_all_raw(path: Ptr<u8!>, mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8!&gt;` |  |
| `mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_mkdir_all"></a>`vex_fs_mkdir_all` `🔓 export`

> 📄 `native.macos.vxc` L498-517

```vex
export fn vex_fs_mkdir_all(path: Ptr<u8>, mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_temp_dir"></a>`vex_fs_temp_dir` `🔓 export`

> 📄 `native.macos.vxc` L531-555

```vex
export fn vex_fs_temp_dir(buf: Ptr<u8>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_realpath"></a>`vex_fs_realpath` `🔓 export`

> 📄 `native.macos.vxc` L559-597

```vex
export fn vex_fs_realpath(path: Ptr<u8>, buf: Ptr<u8>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mmap"></a>`vex_fs_mmap` `🔓 export`

> 📄 `native.macos.vxc` L607-610

```vex
export fn vex_fs_mmap(addr: Ptr<Opaque>, len: u64, prot: i32, flags: i32, fd: i32, offset: i64): Ptr<Opaque>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |
| `prot` | `i32` |  |
| `flags` | `i32` |  |
| `fd` | `i32` |  |
| `offset` | `i64` |  |

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="vex_fs_munmap"></a>`vex_fs_munmap` `🔓 export`

> 📄 `native.macos.vxc` L612-615

```vex
export fn vex_fs_munmap(addr: Ptr<Opaque>, len: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i32`

---

### <a id="vex_getcwd"></a>`vex_getcwd` `🔓 export`

> 📄 `native.macos.vxc` L619-622

```vex
export fn vex_getcwd(buf: Ptr<u8!>, size: u64): Ptr<u8>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `size` | `u64` |  |

**Returns:** `Ptr&lt;u8&gt;`

---

### <a id="pathIsSeparator"></a>`pathIsSeparator`

> 📄 `path.vx` L14-19

```vex
fn pathIsSeparator(value: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u8` |  |

**Returns:** `bool`

---

### <a id="pathSeparator"></a>`pathSeparator`

> 📄 `path.vx` L21-24

```vex
fn pathSeparator(): str
```

**Returns:** `str`

---

### <a id="pathSeparatorByte"></a>`pathSeparatorByte`

> 📄 `path.vx` L26-29

```vex
fn pathSeparatorByte(): u8
```

**Returns:** `u8`

---

### <a id="pathIsAsciiLetter"></a>`pathIsAsciiLetter`

> 📄 `path.vx` L31-34

```vex
fn pathIsAsciiLetter(value: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u8` |  |

**Returns:** `bool`

---

### <a id="pathHasDrivePrefix"></a>`pathHasDrivePrefix`

> 📄 `path.vx` L36-44

```vex
fn pathHasDrivePrefix(raw: Ptr<Opaque>, length: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `Ptr&lt;Opaque&gt;` |  |
| `length` | `usize` |  |

**Returns:** `bool`

---

### <a id="pathPrefixLength"></a>`pathPrefixLength`

> 📄 `path.vx` L49-91

```vex
fn pathPrefixLength(raw: Ptr<Opaque>, length: usize): usize
```

Returns the preserved lexical prefix. On Windows this can be a rooted

drive (`C:\`), drive-relative volume (`C:`), root-relative separator, or
complete UNC volume (`\\server\share\`). POSIX has only `/`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `Ptr&lt;Opaque&gt;` |  |
| `length` | `usize` |  |

**Returns:** `usize`

---

### <a id="pathPrefixIsRooted"></a>`pathPrefixIsRooted`

> 📄 `path.vx` L93-103

```vex
fn pathPrefixIsRooted(raw: Ptr<Opaque>, length: usize, prefixLength: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `Ptr&lt;Opaque&gt;` |  |
| `length` | `usize` |  |
| `prefixLength` | `usize` |  |

**Returns:** `bool`

---

### <a id="pathLastSeparator"></a>`pathLastSeparator`

> 📄 `path.vx` L105-114

```vex
fn pathLastSeparator(raw: Ptr<Opaque>, length: usize): isize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `Ptr&lt;Opaque&gt;` |  |
| `length` | `usize` |  |

**Returns:** `isize`

---

### <a id="pathLastByte"></a>`pathLastByte`

> 📄 `path.vx` L116-125

```vex
fn pathLastByte(raw: Ptr<Opaque>, length: usize, needle: u8): isize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `Ptr&lt;Opaque&gt;` |  |
| `length` | `usize` |  |
| `needle` | `u8` |  |

**Returns:** `isize`

---

### <a id="pathSlice"></a>`pathSlice`

> 📄 `path.vx` L127-129

```vex
fn pathSlice(raw: Ptr<Opaque>, start: usize, length: usize): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `Ptr&lt;Opaque&gt;` |  |
| `start` | `usize` |  |
| `length` | `usize` |  |

**Returns:** `string`

---

### <a id="pathNormalizedPrefix"></a>`pathNormalizedPrefix`

> 📄 `path.vx` L131-146

```vex
fn pathNormalizedPrefix(raw: Ptr<Opaque>, length: usize): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `Ptr&lt;Opaque&gt;` |  |
| `length` | `usize` |  |

**Returns:** `string`

---

### <a id="Path"></a>`Path` `🔓 export`

> 📄 `path.vx` L148-148

```vex
export fn Path(value: string): Path
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `string` |  |

**Returns:** `Path`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `asStr`[↗](#Path.asStr) | `export fn (self: &amp;Path) asStr(): str` | Borrows the native path spelling without allocating. |
| `len`[↗](#Path.len) | `export fn (self: &amp;Path) len(): usize` |  |
| `toString`[↗](#Path.toString) | `export fn (self: &amp;Path) toString(): string` |  |
| `debug`[↗](#Path.debug) | `export fn (self: &amp;Path) debug(): string` |  |
| `clone`[↗](#Path.clone) | `export fn (self: &amp;Path) clone(): Path` |  |
| `op==`[↗](#Path.op==) | `export fn (self: &amp;Path) op==(rhs: &amp;Path): bool` |  |
| `join`[↗](#Path.join) | `export fn (self: &amp;Path) join(other: string): Path` | Joins a component using the compile target's preferred separator. An |
| `parent`[↗](#Path.parent) | `export fn (self: &amp;Path) parent(): Path` | Returns the lexical parent without touching the filesystem. |
| `fileName`[↗](#Path.fileName) | `export fn (self: &amp;Path) fileName(): string` | Returns the final component, or an empty string for a trailing separator. |
| `extension`[↗](#Path.extension) | `export fn (self: &amp;Path) extension(): string` |  |
| `stem`[↗](#Path.stem) | `export fn (self: &amp;Path) stem(): string` |  |
| `exists`[↗](#Path.exists) | `export fn (self: &amp;Path) exists(): bool` |  |
| `isReadable`[↗](#Path.isReadable) | `export fn (self: &amp;Path) isReadable(): bool` |  |
| `isWritable`[↗](#Path.isWritable) | `export fn (self: &amp;Path) isWritable(): bool` |  |
| `isAbsolute`[↗](#Path.isAbsolute) | `export fn (self: &amp;Path) isAbsolute(): bool` | A fully qualified path. Windows root-relative (`\foo`) and drive-relative |
| `isRelative`[↗](#Path.isRelative) | `export fn (self: &amp;Path) isRelative(): bool` |  |
| `isDir`[↗](#Path.isDir) | `export fn (self: &amp;Path) isDir(): bool` |  |
| `isFile`[↗](#Path.isFile) | `export fn (self: &amp;Path) isFile(): bool` |  |
| `isSymlink`[↗](#Path.isSymlink) | `export fn (self: &amp;Path) isSymlink(): bool` |  |
| `canonicalize`[↗](#Path.canonicalize) | `export fn (self: &amp;Path) canonicalize(): Result&lt;Pat` | Resolves symlinks and returns an absolute native path. Provider errors are |
| `withExtension`[↗](#Path.withExtension) | `export fn (self: &amp;Path) withExtension(extension: s` | Replaces the final extension. An empty extension removes the existing one. |
| `clean`[↗](#Path.clean) | `export fn (self: &amp;Path) clean(): Path` | Lexically resolves `.` and `..` without filesystem access. The target's |
| `components`[↗](#Path.components) | `export fn (self: &amp;Path) components(): Vec&lt;string&gt;` | Splits the path while keeping a drive/UNC/root prefix as the first item. |

---

### <a id="emptyFsMetadataRaw"></a>`emptyFsMetadataRaw` `🔓 export`

> 📄 `metadata_raw.vxc` L26-41

```vex
export fn emptyFsMetadataRaw(): FsMetadataRaw
```

**Returns:** `FsMetadataRaw`

---

### <a id="new_stat"></a>`new_stat` `🔓 export`

> 📄 `native.linux.vxc` L30-51

```vex
export fn new_stat(): LinuxStat
```

**Returns:** `LinuxStat`

---

### <a id="vex_fs_last_error"></a>`vex_fs_last_error` `🔓 export`

> 📄 `native.linux.vxc` L81-85

```vex
export fn vex_fs_last_error(): i32
```

Linux errno values are already the canonical std/io numeric domain.

**Returns:** `i32`

---

### <a id="vex_fs_unlink"></a>`vex_fs_unlink` `🔓 export`

> 📄 `native.linux.vxc` L100-103

```vex
export fn vex_fs_unlink(path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_rename"></a>`vex_fs_rename` `🔓 export`

> 📄 `native.linux.vxc` L105-108

```vex
export fn vex_fs_rename(oldpath: Ptr<u8>, newpath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `oldpath` | `Ptr&lt;u8&gt;` |  |
| `newpath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_mkdir"></a>`vex_fs_mkdir` `🔓 export`

> 📄 `native.linux.vxc` L110-113

```vex
export fn vex_fs_mkdir(path: Ptr<u8>, mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_rmdir"></a>`vex_fs_rmdir` `🔓 export`

> 📄 `native.linux.vxc` L115-118

```vex
export fn vex_fs_rmdir(path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_exists"></a>`vex_fs_exists` `🔓 export`

> 📄 `native.linux.vxc` L120-123

```vex
export fn vex_fs_exists(path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_access"></a>`vex_fs_access` `🔓 export`

> 📄 `native.linux.vxc` L125-128

```vex
export fn vex_fs_access(path: Ptr<u8>, mode: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `mode` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_getcwd"></a>`vex_fs_getcwd` `🔓 export`

> 📄 `native.linux.vxc` L130-142

```vex
export fn vex_fs_getcwd(buf: Ptr<u8>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_chdir"></a>`vex_fs_chdir` `🔓 export`

> 📄 `native.linux.vxc` L144-147

```vex
export fn vex_fs_chdir(path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_chmod"></a>`vex_fs_chmod` `🔓 export`

> 📄 `native.linux.vxc` L149-152

```vex
export fn vex_fs_chmod(path: Ptr<u8>, mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_is_readable"></a>`vex_fs_is_readable` `🔓 export`

> 📄 `native.linux.vxc` L154-157

```vex
export fn vex_fs_is_readable(path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_is_writable"></a>`vex_fs_is_writable` `🔓 export`

> 📄 `native.linux.vxc` L159-162

```vex
export fn vex_fs_is_writable(path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_symlink"></a>`vex_fs_symlink` `🔓 export`

> 📄 `native.linux.vxc` L166-169

```vex
export fn vex_fs_symlink(target: Ptr<u8>, linkpath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `target` | `Ptr&lt;u8&gt;` |  |
| `linkpath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_link"></a>`vex_fs_link` `🔓 export`

> 📄 `native.linux.vxc` L171-174

```vex
export fn vex_fs_link(oldpath: Ptr<u8>, newpath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `oldpath` | `Ptr&lt;u8&gt;` |  |
| `newpath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_readlink"></a>`vex_fs_readlink` `🔓 export`

> 📄 `native.linux.vxc` L176-179

```vex
export fn vex_fs_readlink(path: Ptr<u8>, buf: Ptr<u8>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mkstemp"></a>`vex_fs_mkstemp` `🔓 export`

> 📄 `native.linux.vxc` L181-275

```vex
export fn vex_fs_mkstemp(path_buf: Ptr<u8!>, buf_size: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path_buf` | `Ptr&lt;u8!&gt;` |  |
| `buf_size` | `u64` |  |

**Returns:** `i32`

---

### <a id="fill_metadata"></a>`fill_metadata`

> 📄 `native.linux.vxc` L279-307

```vex
fn fill_metadata(st: &LinuxStat, out: Ptr<FsMetadataRaw!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `st` | `&amp;LinuxStat` |  |
| `out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_metadata"></a>`vex_fs_metadata` `🔓 export`

> 📄 `native.linux.vxc` L309-318

```vex
export fn vex_fs_metadata(path: Ptr<u8>, followSymlinks: bool, out: Ptr<FsMetadataRaw!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `followSymlinks` | `bool` |  |
| `out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_file_metadata"></a>`vex_fs_file_metadata` `🔓 export`

> 📄 `native.linux.vxc` L320-325

```vex
export fn vex_fs_file_metadata(fd: i32, out: Ptr<FsMetadataRaw!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_dir_open"></a>`vex_fs_dir_open` `🔓 export`

> 📄 `native.linux.vxc` L329-331

```vex
export fn vex_fs_dir_open(path: Ptr<u8>): Ptr<Opaque>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="vex_fs_dir_read"></a>`vex_fs_dir_read` `🔓 export`

> 📄 `native.linux.vxc` L333-377

```vex
export fn vex_fs_dir_read(dir: Ptr<Opaque>, entries: Ptr<Opaque>, max_entries: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dir` | `Ptr&lt;Opaque&gt;` |  |
| `entries` | `Ptr&lt;Opaque&gt;` |  |
| `max_entries` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_dir_close"></a>`vex_fs_dir_close` `🔓 export`

> 📄 `native.linux.vxc` L379-382

```vex
export fn vex_fs_dir_close(dir: Ptr<Opaque>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dir` | `Ptr&lt;Opaque&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_readdir_from"></a>`vex_fs_readdir_from` `🔓 export`

> 📄 `native.linux.vxc` L384-401

```vex
export fn vex_fs_readdir_from(path: Ptr<u8>, entries: Ptr<Opaque>, max_entries: u64, skip_entries: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `entries` | `Ptr&lt;Opaque&gt;` |  |
| `max_entries` | `u64` |  |
| `skip_entries` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_readdir"></a>`vex_fs_readdir` `🔓 export`

> 📄 `native.linux.vxc` L403-405

```vex
export fn vex_fs_readdir(path: Ptr<u8>, entries: Ptr<Opaque>, max_entries: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `entries` | `Ptr&lt;Opaque&gt;` |  |
| `max_entries` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mkdir_all_raw"></a>`vex_fs_mkdir_all_raw`

> 📄 `native.linux.vxc` L409-452

```vex
fn vex_fs_mkdir_all_raw(path: Ptr<u8!>, mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8!&gt;` |  |
| `mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_mkdir_all"></a>`vex_fs_mkdir_all` `🔓 export`

> 📄 `native.linux.vxc` L454-473

```vex
export fn vex_fs_mkdir_all(path: Ptr<u8>, mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_temp_dir"></a>`vex_fs_temp_dir` `🔓 export`

> 📄 `native.linux.vxc` L485-509

```vex
export fn vex_fs_temp_dir(buf: Ptr<u8>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_realpath"></a>`vex_fs_realpath` `🔓 export`

> 📄 `native.linux.vxc` L513-551

```vex
export fn vex_fs_realpath(path: Ptr<u8>, buf: Ptr<u8>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mmap"></a>`vex_fs_mmap` `🔓 export`

> 📄 `native.linux.vxc` L560-563

```vex
export fn vex_fs_mmap(addr: Ptr<Opaque>, len: u64, prot: i32, flags: i32, fd: i32, offset: i64): Ptr<Opaque>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |
| `prot` | `i32` |  |
| `flags` | `i32` |  |
| `fd` | `i32` |  |
| `offset` | `i64` |  |

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="vex_fs_munmap"></a>`vex_fs_munmap` `🔓 export`

> 📄 `native.linux.vxc` L565-568

```vex
export fn vex_fs_munmap(addr: Ptr<Opaque>, len: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i32`

---

### <a id="vex_getcwd"></a>`vex_getcwd` `🔓 export`

> 📄 `native.linux.vxc` L572-575

```vex
export fn vex_getcwd(buf: Ptr<u8>, size: u64): Ptr<u8>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `Ptr&lt;u8&gt;`

---

### <a id="invalidHandle"></a>`invalidHandle`

> 📄 `windows_provider.vxc` L112-114

```vex
fn invalidHandle(handle: Ptr<Opaque>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `handle` | `Ptr&lt;Opaque&gt;` |  |

**Returns:** `bool`

---

### <a id="portableError"></a>`portableError`

> 📄 `windows_provider.vxc` L116-134

```vex
fn portableError(code: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_last_error"></a>`vex_fs_last_error` `🔓 export`

> 📄 `windows_provider.vxc` L136-136

```vex
export fn vex_fs_last_error(): i32
```

**Returns:** `i32`

---

### <a id="zeroedWide"></a>`zeroedWide`

> 📄 `windows_provider.vxc` L138-146

```vex
fn zeroedWide(length: usize): Vec<u16>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `length` | `usize` |  |

**Returns:** `Vec&lt;u16&gt;`

---

### <a id="utf8ToWide"></a>`utf8ToWide`

> 📄 `windows_provider.vxc` L148-159

```vex
fn utf8ToWide(value: Ptr<u8>): Result<Vec<u16>, i32>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Ptr&lt;u8&gt;` |  |

**Returns:** `Result&lt;Vec&lt;u16&gt;, i32&gt;`

---

### <a id="wideLength"></a>`wideLength`

> 📄 `windows_provider.vxc` L161-165

```vex
fn wideLength(value: Ptr<u16>): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Ptr&lt;u16&gt;` |  |

**Returns:** `usize`

---

### <a id="wideToUtf8"></a>`wideToUtf8`

> 📄 `windows_provider.vxc` L167-194

```vex
fn wideToUtf8(value: Ptr<u16>, units: usize, destination: Ptr<u8!>, capacity: usize): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Ptr&lt;u16&gt;` |  |
| `units` | `usize` |  |
| `destination` | `Ptr&lt;u8!&gt;` |  |
| `capacity` | `usize` |  |

**Returns:** `i64`

---

### <a id="combineU32"></a>`combineU32`

> 📄 `windows_provider.vxc` L196-198

```vex
fn combineU32(high: u32, low: u32): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `high` | `u32` |  |
| `low` | `u32` |  |

**Returns:** `u64`

---

### <a id="fileTimeSeconds"></a>`fileTimeSeconds`

> 📄 `windows_provider.vxc` L200-205

```vex
fn fileTimeSeconds(value: FileTime): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `FileTime` |  |

**Returns:** `i64`

---

### <a id="emptyInformation"></a>`emptyInformation`

> 📄 `windows_provider.vxc` L207-220

```vex
fn emptyInformation(): ByHandleFileInformation
```

**Returns:** `ByHandleFileInformation`

---

### <a id="fillMetadata"></a>`fillMetadata`

> 📄 `windows_provider.vxc` L222-249

```vex
fn fillMetadata(information: &ByHandleFileInformation, followSymlinks: bool, out: Ptr<FsMetadataRaw!>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `information` | `&amp;ByHandleFileInformation` |  |
| `followSymlinks` | `bool` |  |
| `out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

---

### <a id="openMetadataHandle"></a>`openMetadataHandle`

> 📄 `windows_provider.vxc` L251-264

```vex
fn openMetadataHandle(path: Ptr<u8>, followSymlinks: bool): Ptr<Opaque>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `followSymlinks` | `bool` |  |

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="vex_fs_metadata"></a>`vex_fs_metadata` `🔓 export`

> 📄 `windows_provider.vxc` L266-283

```vex
export fn vex_fs_metadata(path: Ptr<u8>, followSymlinks: bool, out: Ptr<FsMetadataRaw!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `followSymlinks` | `bool` |  |
| `out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_file_metadata"></a>`vex_fs_file_metadata` `🔓 export`

> 📄 `windows_provider.vxc` L285-301

```vex
export fn vex_fs_file_metadata(fd: i32, out: Ptr<FsMetadataRaw!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `out` | `Ptr&lt;FsMetadataRaw!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_unlink"></a>`vex_fs_unlink` `🔓 export`

> 📄 `windows_provider.vxc` L303-312

```vex
export fn vex_fs_unlink(path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_rename"></a>`vex_fs_rename` `🔓 export`

> 📄 `windows_provider.vxc` L314-318

```vex
export fn vex_fs_rename(oldPath: Ptr<u8>, newPath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `oldPath` | `Ptr&lt;u8&gt;` |  |
| `newPath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_mkdir"></a>`vex_fs_mkdir` `🔓 export`

> 📄 `windows_provider.vxc` L320-323

```vex
export fn vex_fs_mkdir(path: Ptr<u8>, _mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `_mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_rmdir"></a>`vex_fs_rmdir` `🔓 export`

> 📄 `windows_provider.vxc` L325-328

```vex
export fn vex_fs_rmdir(path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_exists"></a>`vex_fs_exists` `🔓 export`

> 📄 `windows_provider.vxc` L330-333

```vex
export fn vex_fs_exists(path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_access"></a>`vex_fs_access` `🔓 export`

> 📄 `windows_provider.vxc` L335-344

```vex
export fn vex_fs_access(path: Ptr<u8>, mode: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `mode` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_is_readable"></a>`vex_fs_is_readable` `🔓 export`

> 📄 `windows_provider.vxc` L346-346

```vex
export fn vex_fs_is_readable(path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_is_writable"></a>`vex_fs_is_writable` `🔓 export`

> 📄 `windows_provider.vxc` L347-347

```vex
export fn vex_fs_is_writable(path: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_getcwd"></a>`vex_fs_getcwd` `🔓 export`

> 📄 `windows_provider.vxc` L349-357

```vex
export fn vex_fs_getcwd(buffer: Ptr<u8!>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buffer` | `Ptr&lt;u8!&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_chdir"></a>`vex_fs_chdir` `🔓 export`

> 📄 `windows_provider.vxc` L359-362

```vex
export fn vex_fs_chdir(path: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_chmod"></a>`vex_fs_chmod` `🔓 export`

> 📄 `windows_provider.vxc` L364-372

```vex
export fn vex_fs_chmod(path: Ptr<u8>, mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_symlink"></a>`vex_fs_symlink` `🔓 export`

> 📄 `windows_provider.vxc` L374-388

```vex
export fn vex_fs_symlink(target: Ptr<u8>, linkPath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `target` | `Ptr&lt;u8&gt;` |  |
| `linkPath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_link"></a>`vex_fs_link` `🔓 export`

> 📄 `windows_provider.vxc` L390-398

```vex
export fn vex_fs_link(oldPath: Ptr<u8>, newPath: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `oldPath` | `Ptr&lt;u8&gt;` |  |
| `newPath` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_readlink"></a>`vex_fs_readlink` `🔓 export`

> 📄 `windows_provider.vxc` L400-467

```vex
export fn vex_fs_readlink(path: Ptr<u8>, destination: Ptr<u8>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `destination` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="emptyFindData"></a>`emptyFindData`

> 📄 `windows_provider.vxc` L469-482

```vex
fn emptyFindData(): FindDataW
```

**Returns:** `FindDataW`

---

### <a id="searchPattern"></a>`searchPattern`

> 📄 `windows_provider.vxc` L484-501

```vex
fn searchPattern(path: Ptr<u8>): Result<Vec<u16>, i32>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `Result&lt;Vec&lt;u16&gt;, i32&gt;`

---

### <a id="vex_fs_dir_open"></a>`vex_fs_dir_open` `🔓 export`

> 📄 `windows_provider.vxc` L503-522

```vex
export fn vex_fs_dir_open(path: Ptr<u8>): Ptr<Opaque>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="isDotEntry"></a>`isDotEntry`

> 📄 `windows_provider.vxc` L524-530

```vex
fn isDotEntry(name: Ptr<u16>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `Ptr&lt;u16&gt;` |  |

**Returns:** `bool`

---

### <a id="vex_fs_dir_read"></a>`vex_fs_dir_read` `🔓 export`

> 📄 `windows_provider.vxc` L532-575

```vex
export fn vex_fs_dir_read(directory: Ptr<Opaque>, entries: Ptr<Opaque>, maximum: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `directory` | `Ptr&lt;Opaque&gt;` |  |
| `entries` | `Ptr&lt;Opaque&gt;` |  |
| `maximum` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_dir_close"></a>`vex_fs_dir_close` `🔓 export`

> 📄 `windows_provider.vxc` L577-584

```vex
export fn vex_fs_dir_close(directory: Ptr<Opaque>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `directory` | `Ptr&lt;Opaque&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_fs_readdir_from"></a>`vex_fs_readdir_from` `🔓 export`

> 📄 `windows_provider.vxc` L586-605

```vex
export fn vex_fs_readdir_from(path: Ptr<u8>, entries: Ptr<Opaque>, maximum: u64, skip: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `entries` | `Ptr&lt;Opaque&gt;` |  |
| `maximum` | `u64` |  |
| `skip` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_readdir"></a>`vex_fs_readdir` `🔓 export`

> 📄 `windows_provider.vxc` L607-609

```vex
export fn vex_fs_readdir(path: Ptr<u8>, entries: Ptr<Opaque>, maximum: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `entries` | `Ptr&lt;Opaque&gt;` |  |
| `maximum` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mkdir_all"></a>`vex_fs_mkdir_all` `🔓 export`

> 📄 `windows_provider.vxc` L611-679

```vex
export fn vex_fs_mkdir_all(path: Ptr<u8>, _mode: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `_mode` | `u32` |  |

**Returns:** `i32`

---

### <a id="vex_fs_temp_dir"></a>`vex_fs_temp_dir` `🔓 export`

> 📄 `windows_provider.vxc` L681-689

```vex
export fn vex_fs_temp_dir(buffer: Ptr<u8>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buffer` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="appendDecimal"></a>`appendDecimal`

> 📄 `windows_provider.vxc` L691-708

```vex
fn appendDecimal(value: u64, destination: &Vec<u16>!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u64` |  |
| `destination` | `&amp;Vec&lt;u16&gt;!` |  |

---

### <a id="vex_fs_mkstemp"></a>`vex_fs_mkstemp` `🔓 export`

> 📄 `windows_provider.vxc` L710-767

```vex
export fn vex_fs_mkstemp(pathBuffer: Ptr<u8!>, bufferSize: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pathBuffer` | `Ptr&lt;u8!&gt;` |  |
| `bufferSize` | `u64` |  |

**Returns:** `i32`

---

### <a id="vex_fs_realpath"></a>`vex_fs_realpath` `🔓 export`

> 📄 `windows_provider.vxc` L769-833

```vex
export fn vex_fs_realpath(path: Ptr<u8>, buffer: Ptr<u8>, size: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `Ptr&lt;u8&gt;` |  |
| `buffer` | `Ptr&lt;u8&gt;` |  |
| `size` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fs_mmap"></a>`vex_fs_mmap` `🔓 export`

> 📄 `windows_provider.vxc` L835-870

```vex
export fn vex_fs_mmap(_address: Ptr<Opaque>, length: u64, protection: i32, flags: i32, fd: i32, offset: i64): Ptr<Opaque>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_address` | `Ptr&lt;Opaque&gt;` |  |
| `length` | `u64` |  |
| `protection` | `i32` |  |
| `flags` | `i32` |  |
| `fd` | `i32` |  |
| `offset` | `i64` |  |

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="vex_fs_munmap"></a>`vex_fs_munmap` `🔓 export`

> 📄 `windows_provider.vxc` L872-875

```vex
export fn vex_fs_munmap(address: Ptr<Opaque>, _length: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `Ptr&lt;Opaque&gt;` |  |
| `_length` | `u64` |  |

**Returns:** `i32`

---

### <a id="dirReadAt"></a>`dirReadAt`

> 📄 `dir.vx` L7-7

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

### <a id="DirEntry"></a>`DirEntry`

> 📄 `dir.vx` L12-19

```vex
fn DirEntry(): DirEntry
```

**Returns:** `DirEntry`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `clone`[↗](#DirEntry.clone) | `export fn (self: &amp;DirEntry) clone(): DirEntry` |  |
| `name`[↗](#DirEntry.name) | `export fn (self: &amp;DirEntry) name(): string` | Returns the entry name without retaining or exposing the fixed native ABI |
| `toString`[↗](#DirEntry.toString) | `export fn (self: &amp;DirEntry) toString(): string` |  |
| `isDir`[↗](#DirEntry.isDir) | `export fn (self: &amp;DirEntry) isDir(): bool` |  |
| `isFile`[↗](#DirEntry.isFile) | `export fn (self: &amp;DirEntry) isFile(): bool` |  |
| `isSymlink`[↗](#DirEntry.isSymlink) | `export fn (self: &amp;DirEntry) isSymlink(): bool` |  |

---

### <a id="readDir"></a>`readDir` `🔓 export`

> 📄 `dir.vx` L43-52

```vex
export fn readDir(path: string, out: &DirList!): Result<usize, IoError>
```

List contents of a directory (fills caller-provided buffer).

Returns up to 64 entries. For larger directories, use raw vex_fs_readdir.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `out` | `&amp;DirList!` |  |

**Returns:** `Result&lt;usize, IoError&gt;`

---

### <a id="mkdirAll"></a>`mkdirAll` `🔓 export`

> 📄 `dir.vx` L59-64

```vex
export fn mkdirAll(path: string): Result<(), IoError>
```

Create all directories along a path (like `mkdir -p`).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="removeAll"></a>`removeAll` `🔓 export`

> 📄 `dir.vx` L66-120

```vex
export fn removeAll(path: string): Result<(), IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="tempDir"></a>`tempDir` `🔓 export`

> 📄 `dir.vx` L123-131

```vex
export fn tempDir(): string
```

Get the system temporary directory path.

**Returns:** `string`

---

### <a id="readDirVecLimit"></a>`readDirVecLimit` `🔓 export`

> 📄 `dir.vx` L140-170

```vex
export fn readDirVecLimit(path: string, maxEntries: usize): Result<Vec<DirEntry>, IoError>
```

Read directory entries into a Vec with explicit upper bound.

This function paginates via vex_fs_readdir_from to collect up to `maxEntries`
entries, avoiding single-batch truncation behavior.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `maxEntries` | `usize` |  |

**Returns:** `Result&lt;Vec&lt;DirEntry&gt;, IoError&gt;`

---

### <a id="readDirVec"></a>`readDirVec` `🔓 export`

> 📄 `dir.vx` L174-176

```vex
export fn readDirVec(path: string): Result<Vec<DirEntry>, IoError>
```

Read all directory entries into a Vec. Callers handling untrusted or very

large directories should use `readDirVecLimit` or `DirCursor` instead.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `Result&lt;Vec&lt;DirEntry&gt;, IoError&gt;`

---

### <a id="readDirPage"></a>`readDirPage` `🔓 export`

> 📄 `dir.vx` L180-218

```vex
export fn readDirPage(path: string, offset: usize, limit: usize): Result<Vec<DirEntry>, IoError>
```

Read one page of directory entries starting from `offset` (non-dot entries).

Returns up to `limit` entries.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `offset` | `usize` |  |
| `limit` | `usize` |  |

**Returns:** `Result&lt;Vec&lt;DirEntry&gt;, IoError&gt;`

---

### <a id="newDirCursor"></a>`newDirCursor` `🔓 export`

> 📄 `dir.vx` L243-245

```vex
export fn newDirCursor(path: string, pageSize: usize): Result<DirCursor, IoError>
```

Create a new directory cursor.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `pageSize` | `usize` |  |

**Returns:** `Result&lt;DirCursor, IoError&gt;`

---

### <a id="walkDir"></a>`walkDir` `🔓 export`

> 📄 `dir.vx` L314-346

```vex
export fn walkDir(root: string, callback: fn (DirEntry, string): bool): Result<bool, IoError>
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

**Returns:** `Result&lt;bool, IoError&gt;`

---

### <a id="fsError"></a>`fsError` `🔓 export`

> 📄 `error.vx` L6-10

```vex
export fn fsError(fallback: str): IoError
```

Convert the provider's normalized errno immediately after a failed call.

`fallback` is used only by providers that cannot expose a native code.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fallback` | `str` |  |

**Returns:** `IoError`

---

### <a id="fsInvalidInput"></a>`fsInvalidInput` `🔓 export`

> 📄 `error.vx` L12-14

```vex
export fn fsInvalidInput(message: str): IoError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `message` | `str` |  |

**Returns:** `IoError`

---

### <a id="fsOutOfMemory"></a>`fsOutOfMemory` `🔓 export`

> 📄 `error.vx` L16-18

```vex
export fn fsOutOfMemory(message: str): IoError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `message` | `str` |  |

**Returns:** `IoError`

---

---

*Generated by vex-doc v2.0 • 2026-08-21*
