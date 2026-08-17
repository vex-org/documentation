# strings

`strings` provides allocation-free byte/ASCII search and an automatically
managed builder for incremental output. Common operations such as `split`,
`join`, `trim`, `repeat`, `replace`, `startsWith`, and `endsWith` already live
on the prelude `str`/`string` types and are not duplicated here.

## StringBuilder

```vex
import { StringBuilder } from "strings"

let! builder = StringBuilder.new()
builder.writeStr("item=")
builder.writeI64(42)

let output = builder.toString() // "item=42"
```

Use `StringBuilder(capacity)` or `StringBuilder.new(capacity)` when the expected
size is known. The builder grows automatically, checks capacity arithmetic,
and follows Vex's allocator region automatically. Arena-backed storage is
reclaimed in bulk at region exit; a builder that needs persistent storage uses
the normal heap and releases it through `Drop`. Cross-region growth is promoted
safely without exposing this distinction to application code. There is no raw
buffer field, manual `free`, reference-count choice, or thread-tracking API.

Available methods:

| Method | Purpose |
|---|---|
| `writeStr(value: str)` | Append borrowed UTF-8 bytes in one copy |
| `writeByte(value: u8)` | Append one byte |
| `writeI64(value: i64)` | Append signed decimal text |
| `writeU64(value: u64)` | Append unsigned decimal text |
| `writeF64(value: f64, precision: i32)` | Append rounded fixed/scientific text without an intermediate string |
| `toString()` | Copy current bytes into an owned `string` |
| `len()` / `isEmpty()` | Inspect logical content |
| `capacity()` | Inspect reserved byte capacity |
| `reset()` | Clear content while retaining capacity |

## Search

```vex
import {
    indexOf, indexOfFrom, contains, count,
    indexOfIgnoreCase, containsIgnoreCase,
} from "strings"

let first = indexOf("alpha beta", "beta")
let next = indexOfFrom("go go go", "go", 3 as usize)
let found = containsIgnoreCase("Content-Type", "content")
```

Search inputs are borrowed `str` values and do not allocate. Results use `i64`
with `-1` for no match. `count` and `countIgnoreCase` count non-overlapping
matches. Ignore-case operations fold ASCII letters only; non-ASCII bytes are
compared verbatim.

Single-byte variants are also available: `indexOfByte`, `indexOfByteFrom`,
`lastIndexOfByte`, `countByte`, and `containsByte`.

Complete ranges use Vex's target-independent `[u8; 16]` and `Mask<16>`
operations. Substring search delegates to the same VexArch
`Mem.indexOfBytes` implementation used by prelude `str`, so the package does
not maintain a slower second search engine. Exact tails remain bounded scalar
code. Ignore-case comparisons fold only ASCII `A`–`Z` lanes; punctuation and
non-ASCII bytes are never changed.

On an Apple M2 Max with O3 and runtime-backed 64 KiB inputs, the 2026-08-16
baseline is roughly 37 GB/s byte search, 24 GB/s substring search, 37 GB/s
ASCII validation and 11.6 GB/s all-case-different ASCII equality. These are
regression baselines for that machine, not cross-platform guarantees.

`StringBuilder.writeF64` writes through `strconv`'s caller-buffer formatter.
It shares canonical NaN, infinity, negative-zero, rounding and scientific
notation behavior without allocating a temporary formatted string.

## ASCII helpers

`isAscii`, `equals`, `eqIgnoreCaseAscii`, `toLowerAscii`, and `toUpperAscii`
make byte/ASCII semantics explicit. For Unicode text processing, use the
`unicode` package.

## Ownership model

Application code works with ordinary values and `Box<T>`. VUMM determines any
required sharing and thread-safe physical representation automatically. The
`strings` API never exposes reference counts or asks a developer to track
threads.
