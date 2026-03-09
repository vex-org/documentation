# semver

The `semver` module provides functionality for parsing, comparing, and matching Semantic Versioning (SemVer) strings (e.g., `1.2.3-alpha.1+build.metadata`). 
It strictly adheres to the SemVer 2.0.0 specification and is highly optimized, utilizing zero-allocation string parsing where possible.

## Features

- **Parsing**: Parse version strings into structured `Version` types.
- **Comparison**: Compare versions using standard operators (`<`, `>`, `==`).
- **Matching**: Match generic version configurations (e.g., `^1.2`, `~1.2.3`, `>=1.0.0 <2.0.0`).

## Usage

```rust
import { Version, parse } from "semver";

let v1 = parse("1.0.0A-alpha.1+build.metadata").unwrap();
let v2 = parse("1.0.0B-alpha.1+build.metadata").unwrap();

// Standard comparison
if v1 < v2 {
    println("v1 is older than v2");
}

println(v1.major()); // 1
println(v1.minor()); // 0
println(v1.patch()); // 0
```

## Performance Note

Vex `semver` is meticulously crafted out of string slice offsets (`Span<u8>`), executing virtually without allocating intermediate strings during tokenization. Thus, evaluating rules against thousands of version tags is exceptionally fast.
