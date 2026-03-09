# hash

The `hash` module is focused squarely on non-cryptographic, high-performance hashing algorithms. These form the backbone of `Map` and `Set`, enabling Vex's internal dictionary structures (often Swiss Tables) to probe with extreme velocity.

## Built-in Algorithms

If you need to hash a large buffer or establish consistent hashes in deterministic scenarios, you can rely on the following implementations:

- **WyHash**: Default generic hash for Map/Set. Highly optimized random-seed based algorithm providing near-perfect avalanche properties.
- **FNV-1a**: 32-bit and 64-bit bounds. Outstanding for extremely short strings (keys <= 16 bytes).
- **xxHash3**: Extensively unrolled hardware-aligned chunked hashing.

## Usage

```rust
import { fnv1a_64 } from "hash/fnv";

let raw = "my_string".asPtr();
let hash = fnv1a_64(raw, "my_string".len());
```

For general structures, use the `$Hash` contract built directly into compiler types, which dynamically invokes WyHash based on object memory layout.
