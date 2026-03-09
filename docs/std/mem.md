# mem — Memory Management

Low-level memory allocation, arena allocators, and memory operations.

## Allocation

```rust
import { alloc, allocZeroed, realloc, free } from "mem";

let ptr = alloc(1024);          // Allocate 1KB
let ptr = allocZeroed(1024);    // Allocate 1KB, zeroed
let ptr = realloc(ptr, 2048);   // Resize to 2KB
free(ptr);                       // Release
```

## Memory Operations

```rust
import { memcpy, memset, memcmp, memmove } from "mem";

memcpy(dest, src, len);         // Copy bytes (no overlap)
memmove(dest, src, len);        // Copy bytes (overlap safe)
memset(ptr, value, len);        // Fill with byte value
memcmp(a, b, len);              // Compare bytes → i32
```

## Arena Allocator

Bump-allocator for batch allocations that are freed together:

```rust
import { Arena } from "mem";

let! arena = Arena.new(4096);   // 4KB arena
let ptr1 = arena.alloc(64);     // Bump-allocate 64 bytes
let ptr2 = arena.alloc(128);    // Another 128 bytes
arena.reset();                   // Free everything at once
```

## Slice Operations

```rust
import { sliceCopy, sliceFill, sliceEquals } from "mem";
```
