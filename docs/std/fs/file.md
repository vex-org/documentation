# File I/O (`fs/file`)

The core `File` type provides everything for reading and writing files with precise control over buffering and syscalls.

## Opening Files

```rust
import { File } from "fs";

let f = File.open("data.txt").unwrap();       // Read-only
let f = File.create("output.txt").unwrap();    // Write (truncate)
let f = File.append("log.txt").unwrap();       // Write (append)
```

## Reading

```rust
// Read entire file into string
let content = File.open("config.json").unwrap().readToString();

// Read into buffer (controlled allocation)
let! buf: [u8; 4096] = [0; 4096];
let bytesRead = f.read(&buf);

// Read exact number of bytes
f.readExact(&buf, 256);
```

## Writing

```rust
let f = File.create("output.txt").unwrap();
f.write("Hello, Vex!\n".asBytes());
f.writeString("Another line\n");
f.flush();  // Force OS buffer flush
f.close();
```

## Buffered I/O (`BufReader` / `BufWriter`)

For high-throughput scenarios, wrap files in buffered wrappers to minimize syscall overhead:

```rust
import { BufReader, BufWriter } from "fs";

let reader = BufReader.new(File.open("big.csv").unwrap(), 8192);
let writer = BufWriter.new(File.create("out.csv").unwrap(), 8192);

// BufReader reduces read() syscalls by internally buffering 8KB chunks
// BufWriter batches small writes into 8KB flushes
```
