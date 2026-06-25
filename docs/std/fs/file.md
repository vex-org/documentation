# File I/O (`fs/file`)

The `File` struct represents an open file descriptor. It provides static constructors and implements the `Drop` contract for safe, automatic resource cleanup upon leaving scope.

```vex
import { File } from "std/fs";

match File.open("data.txt") {
    Ok(file) => {
        // file is auto-closed when it goes out of scope here
        let content = file.readAll();
        $println(content);
    },
    Err(_) => $println("open failed")
}
```

## Common Operations

### Static Constructors

- `File.open(path)`: Open an existing file for reading only.
- `File.create(path)`: Create a new file or truncate an existing one for writing.
- `File.openReadWrite(path)`: Open a file for both reading and writing.
- `File.openAppend(path)`: Open or create a file for appending.
- `File.temp()`: Create a unique temporary file open for reading and writing.

### Instance Methods

- `.read(buf, len)`: Read up to `len` bytes into a buffer.
- `.write(buf, len)`: Write `len` bytes from a buffer.
- `.writeString(s)`: Write a Vex string to the file.
- `.seek(offset, whence)`: Seek to a relative or absolute position.
- `.tell()`: Get the current file position.
- `.size()`: Get the file size in bytes.
- `.sync()`: Flush file data to storage.
- `.close()`: Explicitly close the file (optional, as `Drop` closes it automatically).
- `.readAll()`: Read all remaining bytes into a `Vec&lt;u8&gt;`.

The present standard library also exports deprecated free-function compatibility wrappers (`openFile`, `createFile`, `openReadWrite`, `openAppend`, `tempFile`) which delegate to the static methods under the hood.

