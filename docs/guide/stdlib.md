# Standard Library

Vex provides a focused standard library and a powerful **Prelude** that is available to all programs automatically.

## The Prelude

Core types are available everywhere without an `import` statement. These include:

### Collections
- `Vec<T>`: Dynamic heap-allocated array.
- `Map<K, V>`: Hash map (SwissTable implementation).
- `Set<T>`: Hash set (built on top of Map).

### Smart Pointers
- `Box<T>`: Revolutionary unified memory management (VUMM). Automatically selects Unique/SharedRc/AtomicArc.

### Error & Optionality
- `Result<T, E>`: For operations that can fail.
- `Option<T>`: For values that may not exist.

---

## Standard Modules

Modules in `std` must be explicitly imported.

### `std.fs` (File System)

Provides basic file and path operations.

```vex
import * as fs from "std.fs"

fn example(): i32 {
    // Path handling
    let path = fs.newPath("test.txt")
    if !path.exists() {
        println("File not found")
    }

    // File I/O
    let! file = fs.open("test.txt") !> |err| {
        println(f"Error: {err.msg}")
        return 1
    }
    
    // ... read/write operations
    return 0
}
```

### `std.math`

Comprehensive math constants and functions.

```vex
import * as math from "std.math"

let root = math.sqrt(16.0)
let pi = math.PI
```

### `std.time`

Time and duration utilities.

```vex
import * as time from "std.time"

let start = time.Instant.now()
// ... do work
let elapsed = start.elapsed()
```

---

## Future Roadmap

The following modules are currently in development and not yet available in the stable standard library:
- `std.json` / `std.toml`: Serialization support.
- `std.net`: Networking (TCP/UDP/HTTP).
- `std.process`: Advanced process management.

---

## Next Steps

- [VUMM Memory Model](/guide/memory/vumm) - How Box works
- [Error Handling](/guide/error-handling) - Using Result and Option
- [FFI](/guide/ffi) - Interacting with C code
