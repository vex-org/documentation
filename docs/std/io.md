# io — Core I/O Abstractions

The `io` module defines the fundamental I/O contracts (`Reader`, `Writer`, `Seeker`, `Closer`) plus standard streams and helper utilities.

## Core Contracts

Current exported contracts use raw byte pointers plus lengths:

```vex
contract Reader {
	read(self: &Self!, buf: &u8!, len: u64): Result<u64, IoError>;
}

contract Writer {
	write(self: &Self!, data: &u8, len: u64): Result<u64, IoError>;
	flush(self: &Self!): Result<(), IoError>;
}

contract Seeker {
	seek(self: &Self!, pos: SeekFrom): Result<u64, IoError>;
}

contract Closer {
	close(self: &Self!): Result<(), IoError>;
}
```

## Standard I/O

```vex
let! out = stdout();
let! err = stderr();

$println("Hello, Vex!")
eprintln("Error message")

match readLine() {
	Ok(line) => $println(line),
	Err(_) => $println("read failed")
}
```

## Helpers

- `stdin()` → `Stream`
- `stdout()` → `Stream`
- `stderr()` → `Stream`
- `readLine()` → `Result<string, IoError>`
- `prompt(message: string)` → `Result<string, IoError>`
- `printInt`, `printFloat`, `printBool`

## Notes

- Current `Reader` / `Writer` contracts are pointer-and-length based, not `Span<u8>` based.
- Prefer `readLine()` / `prompt()` for simple terminal input examples.
- Use `stdout().flush()` when prompt text must appear before a blocking read.
