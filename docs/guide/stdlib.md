# Standard Library

> **Vex's standard library.** Prelude (auto-imported) + `std.*` modules.

## Prelude (Auto-Imported)

These are available everywhere without `import`:

### Collections
| Type | Description |
|-----|----------|
| `Vec<T>` | Dynamic heap-allocated array |
| `Map<K, V>` | Hash map (SwissTable) |
| `Set<T>` | Hash set |
| `String` | SSO-optimized heap string |
| `str` | Borrowed string view |

### Smart Pointers
| Type | Description |
|-----|----------|
| `Box<T>` | VUMM: Unique/SharedRc/AtomicArc |
| `Ptr<T>` | Typed pointer |
| `Span<T>` | Bounds-checked fat pointer |
| `RawBuf` | Raw byte buffer |

### Error & Optionality
| Type | Description |
|-----|----------|
| `Result<T, E>` | Operations that can fail |
| `Option<T>` | Values that may not exist |
| `Range<T>` | Range expressions |
| `Complex<T>` | Complex numbers |

## `std.*` Modules (Import Required)

```vex
// File system
import * as fs from "fs"
let file = fs.open("test.txt") !> |err| { ... }

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
