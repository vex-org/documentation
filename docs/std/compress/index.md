# compress — Overview

High-performance compression and decompression utilities, implemented entirely in **pure Vex** with zero C dependencies.

## Supported Algorithms

| Algorithm | Compression | Decompression | Standard | Best For |
|-----------|:-----------:|:-------------:|----------|----------|
| **LZ4** | ✅ | ✅ | Block Format | Ultra-fast real-time streaming |
| **Zstd** | ✅ | ✅ | RFC 8878 | Best ratio-to-speed balance |
| **Gzip/Deflate** | ✅ | ✅ | RFC 1952/1951 | HTTP, archives, universal compat |
| **Brotli** | ✅ | ✅ | RFC 7932 | Web content, WOFF2, HTTP |
| **Zlib** | ✅ | ✅ | RFC 1950 | PNG, legacy protocols |

## Lines of Code: Vex vs C

| Algorithm | C Lines | Vex Lines | Reduction |
|-----------|--------:|----------:|----------:|
| LZ4 | ~2,000 | 350 | **82%** |
| Zstd | ~20,000 | 1,060 | **95%** |
| Gzip | ~8,000 | 677 | **92%** |
| Brotli | ~15,000 | 660 | **96%** |
| **Total** | **~45,000** | **2,747** | **94%** |

## Design Philosophy

- **Memory safety** — `RawBuf` byte access with bounds awareness
- **Portability** — No platform-specific code
- **Optimizability** — Compiler can inline and vectorize hot paths
- **Auditability** — Single-language, no hidden C complexity
