# strings

The `strings` module provides an extension of utilities on top of the builtin `string` and `str` types. Because strings in Vex are UTF-8 validated fat-pointers (often maintaining 16-byte structure `[tagged_len:u32] [prefix:u32] [payload:u64]`), manipulating them effectively is critical for system performance.

## Core Utilities

This module handles multi-byte, zero-cost slices of standard strings without forcing deep heap copies every step. 

```rust
import { startsWith, endsWith, contains, split } from "strings";

let haystack = "Hello, Hardware!";

if startsWith(haystack, "Hello") {
    println("Matches!");
}

let chunks = split(haystack, ", ");
```

## Buffer Builders and Concatenation

Often the most expensive part of string operations is continuous re-allocation when concatenating `+`. While Vex's internal omni-string handles `VUMM` ownership, building up a long text dynamically should typically utilize a `StringBuilder` or manual byte writing into `RawBuf`. The `strings` package handles all these buffer-level manipulations safely.
