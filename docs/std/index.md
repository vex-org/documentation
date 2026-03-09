# Vex Standard Library

The Vex Standard Library (`std`) provides a set of highly optimized, parallelism-first modules to help you build fast, reliable systems. It is written completely in Vex, making use of Vex's powerful Memory Management (VUMM), Tensor / Vectorization types, and compiler-level built-ins to extract maximum performance from the CPU and GPU.

## Core Modules

| Module | Description |
|---|---|
| **[`bit`](./bit.md)** | Bitwise manipulation, population counts, masking, leading/trailing zero counts mapped directly to hardware vector intrinsics. |
| **[`cli`](./cli.md)** | Subcommand, argument, and flag parsing utilities for rapid CLI application development. |
| **[`compress`](./compress.md)** | Pure Vex DEFLATE and GZIP compression and decompression paths optimized for the vectorizer. |
| **[`crypto`](./crypto.md)** | Core cryptographic algorithms and checksums (e.g. CRC32, AES, MD5) leveraging crypto SIMD instructions (AES-NI) with software fallbacks. |
| **[`db`](./db.md)** | Database connections, async pooling, and Native PostgreSQL bindings written purely in Vex without C driver dependencies. |
| **[`fs`](./fs.md)** | Buffered asynchronous and synchronous File System operations integrated into the Vex M:N scheduler. |
| **[`hash`](./hash.md)** | Extremely fast, non-cryptographic hashing algorithms (FNV-1a, xxHash3, WyHash) optimized for Hash Maps and general probing. |
| **[`http`](./http.md)** | Zero-allocation HTTP/1.1 Protocol parsers and baseline Web Server constructs. |
| **[`inference`](./inference.md)** | LLM specific primitive abstractions. Holds logic for RoPE, K/V Cache, and Hardware quantizations. |
| **[`io`](./io.md)** | Basic cross-platform I/O streams and file descriptors. |
| **[`math`](./math.md)** | Math operations ranging from basic arithmetic to advanced trigonometry. Built with GPU `graph fn` infrastructure for bulk operations. |
| **[`ml`](./ml.md)** | High performance Neural Network blocks (RMSNorm, Softmax) executed via Graph blocks. |
| **[`net`](./net.md)** | Asynchronous TCP/UDP networking sockets mapped natively to the Vex M:N scheduler loop. |
| **[`regex`](./regex.md)** | SIMD-Accelerated zero-copy regex engine compiling to bytecode NFAs. |
| **[`semver`](./semver.md)** | Semantic Versioning definitions and query engines. |
| **[`serde`](./serde.md)** | A powerful, zero-copy serialization/deserialization framework supporting JSON, TOML, CSV, and MessagePack formats. |
| **[`strings`](./strings.md)** | Memory-safe, zero-cost string property lookups (startsWith, endsWith, split). |
| **[`time`](./time.md)** | Instant OS monotonic hardware clocks without GC pauses. |
| **[`unicode`](./unicode.md)** | Unicode character properties, case folding, and character matching. Powered by binary-searched precompiled tables. |
| **[`url`](./url.md)** | Extremely fast, WHATWG-compliant URL parsing and encoding, designed to aggressively reduce small allocations. |

## Philosophy

The Vex Standard Library follows a few central design pillars:
1. **Zero-Copy & Low Allocation**: Functions prefer slices (`Span<T>`), byte buffers (`RawBuf`), and minimal heap allocations. 
2. **"Silicon-Ready" Operations**: Wherever there are SIMD instructions or potential for parallelism (hashes, loops, string escapes), the `std` structures it so `vex-compiler` can vectorize it directly.
3. **Extensibility**: Things like `Serde` are abstracted via `contracts`, bringing familiar ergonomic usage to a completely custom systems stack.
