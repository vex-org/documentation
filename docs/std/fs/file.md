# File I/O (`fs/file`)

The current `File` API is constructor/helper based:

```vex
match openFile("data.txt") {
	Ok(file) => {
		let! f = file;
		let content = f.readAll();
		let _ = f.close();
	},
	Err(_) => $println("open failed")
}
```

## Common Operations

- `openFile(path)`
- `createFile(path)`
- `openReadWrite(path)`
- `openAppend(path)`
- `read(buf, len)`
- `write(buf, len)`
- `writeString(s)`
- `seek(offset, whence)`
- `tell()`
- `size()`
- `sync()`
- `close()`
- `readAll()`

The current page intentionally avoids stale `File.open(...).unwrap()` and `readToString()` examples that do not match the present export surface.
