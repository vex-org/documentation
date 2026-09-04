# Vex Standard Library

The Vex Standard Library (`std`) provides a set of highly optimized, parallelism-first modules to help you build fast, reliable systems. It is written completely in Vex, making use of Vex's powerful Memory Management (VUMM), Tensor / Vectorization types, and compiler-level built-ins to extract maximum performance from the CPU and GPU.

Formatting is deliberately not a separate `std/fmt` package. Use
[`$format`, `$print`, and `$println`](../guide/advanced/builtins.md#i-o-formatting-and-debugging),
the built-in `Display`/`Debug` contracts, or
[`strings.StringBuilder`](./strings.md) for reusable caller-owned construction.
This keeps format parsing, diagnostics, and allocation policy in one canonical
stack.

## Core Modules

| Module | Description |
|---|---|
| **[`bit`](./bit.md)** | Bitwise manipulation, population counts, masking, leading/trailing zero counts mapped directly to hardware vector intrinsics. |
| **[`cli`](./cli.md)** | Subcommand, argument, and flag parsing utilities for rapid CLI application development. |
| **[`collections`](./collections.md)** | Tag-free prelude deque plus owning stacks, binary priority heaps, and stable-index linked lists. |
| **[`compress`](./compress.md)** | Pure Vex DEFLATE and GZIP compression and decompression paths optimized for the vectorizer. |
| **[`context`](./context.md)** | Immutable request contexts with cooperative cancellation, monotonic deadlines, typed causes, and persistent metadata. |
| **[`contracts`](./contracts.md)** | Zero-runtime-cost conversion, collection and packed-data protocols with exact generic dispatch. |
| **[`crypto`](./crypto.md)** | Core cryptographic algorithms and checksums (e.g. CRC32, AES, MD5) leveraging crypto SIMD instructions (AES-NI) with software fallbacks. |
| **[`db`](./db.md)** | Database connections, async pooling, and Native PostgreSQL bindings written purely in Vex without C driver dependencies. |
| **[`fs`](./fs/index.md)** | RAII files and mappings, bounded whole-file I/O, portable metadata, native paths, and O(n) directory streaming. |
| **[`filter`](./filter.md)** | Stable predicate filtering, reusable output storage, and fixed-mask SIMD/SIMT compaction. |
| **[`hash`](./hash.md)** | Extremely fast, non-cryptographic hashing algorithms (FNV-1a, xxHash3, WyHash) optimized for Hash Maps and general probing. |
| **[`http`](./http.md)** | Zero-allocation HTTP/1.1 Protocol parsers and baseline Web Server constructs. |
| **[`io`](./io.md)** | Basic cross-platform I/O streams and file descriptors. |
| **[`math`](./math.md)** | Math operations ranging from basic arithmetic to advanced trigonometry. Built with GPU `graph fn` infrastructure for bulk operations. |
| **[`net`](./net.md)** | Asynchronous TCP/UDP networking sockets mapped natively to the Vex M:N scheduler loop. |
| **[`regex`](./regex.md)** | SIMD-Accelerated zero-copy regex engine compiling to bytecode NFAs. |
| **[`rand`](./rand.md)** | Explicit xoshiro256** streams, unbiased ranges, parallel jumps, and reusable zero-allocation distributions. |
| **[`semver`](./semver.md)** | Semantic Versioning definitions and query engines. |
| **[`serde`](./serde.md)** | A powerful, zero-copy serialization/deserialization framework supporting JSON, TOML, CSV, and MessagePack formats. |
| **[`strings`](./strings.md)** | String building utilities centered on `StringBuilder`. |
| **[`tls`](./tls.md)** | Fail-closed TLS 1.3 record protection, SHA-256/SHA-384 key schedule, and bounded dual transcript. |
| **[`time`](./time.md)** | Instant OS monotonic hardware clocks without GC pauses. |
| **[`unicode`](./unicode.md)** | Unicode character properties, case folding, and character matching. Powered by binary-searched precompiled tables. |
| **[`url`](./url.md)** | RFC 3986 URI parsing, reference resolution, strict percent/form codecs and lossless query components. |

## Specialized Projects

[`ml`](./ml.md) and [`inference`](./inference.md) remain available as
specialized compute projects and compiler/SIR stress corpora. They are outside
the 29-package core-standard-library production campaign, alongside `vips`,
`media`, `webrtc`, and `ide/*`; their maturity does not raise or lower the
core-std score.

## Philosophy

The Vex Standard Library follows a few central design pillars:
1. **Zero-Copy & Low Allocation**: Functions prefer slices (`Span&lt;T&gt;`), byte buffers (`RawBuf`), and minimal heap allocations.
2. **"Silicon-Ready" Operations**: Wherever there are SIMD instructions or potential for parallelism (hashes, loops, string escapes), the `std` structures it so `vex-compiler` can vectorize it directly.
3. **Extensibility**: Things like `Serde` are abstracted via `contracts`, bringing familiar ergonomic usage to a completely custom systems stack.
