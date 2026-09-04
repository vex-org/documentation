# Standard Library

> **Vex's standard library.** Prelude (auto-imported) + `std.*` modules.

## Prelude (Auto-Imported)

These are available everywhere without `import`:

### Collections
| Type | Description |
|-----|----------|
| `Vec<T>` | Dynamic array bound to its construction-time allocator region |
| `Map<K, V>` | Hash map (SwissTable) |
| `Set<T>` | Hash set |
| `String` | SSO-optimized heap string |
| `str` | Borrowed string view |

### Smart Pointers
| Type | Description |
|-----|----------|
| `Box<T>` | Compiler-managed heap ownership; sharing and thread safety are inferred automatically |
| `Ptr<T>` | Typed pointer |
| `Span<T>` | Bounds-checked fat pointer |
| `RawBuf` | Raw byte buffer |
| `Layout` | Checked allocation size and alignment |
| `Mem` | Canonical low-level allocation and byte-operation namespace |
| `Limits` | Target-aware compile-time integer minimum and maximum values |

### Error & Optionality
| Type | Description |
|-----|----------|
| `Result<T, E>` | Operations that can fail |
| `Option<T>` | Values that may not exist |
| `Range<T>` | Range expressions |
| `Complex<T>` | Complex numbers |

## `std.*` Modules (Import Required)

Memory primitives are deliberately absent from this list: there is no
`std/mem` package. Low-level code uses the prelude `Mem.*` boundary; most code
uses owning types such as `Box`, `Vec`, or `string`.

```vex
// File system
import * as fs from "fs"
match fs.File.open("test.txt") {
    Ok(file) => { /* File closes automatically when ownership ends. */ },
    Err(error) => $println(error.toString()),
}

// Math
import * as math from "math"
let x = math.sqrt(16.0)

// Time
import * as time from "time"
let now = time.Instant.now()

// Crypto
import * as crypto from "crypto"
let hash = crypto.sha256(data)

// Regex
import * as regex from "regex"
let re = regex.compile("\\d+")!

// Serialization
import * as json from "json"
let data = json.parse(source)!
```

## In Development

| Module | Status |
|-------|:-----:|
| `std.json` / `std.toml` | 🔧 Planned |
| `std.net` (TCP/UDP/HTTP) | 🔧 Planned |
| `std.process` | 🔧 Planned |

## Next Steps

- [VUMM Memory Model](memory/vumm.md)
- [Error Handling](error-handling.md)
- [FFI](ffi.md)
