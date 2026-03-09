# url

The `url` module provides a comprehensive and incredibly fast suite for parsing, building, and resolving Web URLs in Vex. Designed to adhere strictly to the WHATWG URL standard where sensible, it avoids string allocation pitfalls, parsing directly into structured states.

## Zero-Allocation Philosophy

`url` focuses on passing `Span<u8>` and slicing a single backing buffer.

A standard `Url` struct maintains offsets (for scheme, username, password, host, port, path, query, and fragment) into a single unified buffer.

## Usage

```rust
import { Url } from "url";

let parsed = Url.parse("https://vex-lang.org/docs/std?lang=tr#unicode");

println(parsed.scheme());  // "https"
println(parsed.host());    // "vex-lang.org"
println(parsed.path());    // "/docs/std"
```

## Performance Note

Vex `url` beats many common C/Rust implementations by doing SIMD-assisted boundary checks and maintaining state via an internal `RawBuf`, skipping constant String copies for simple path concatenations.
