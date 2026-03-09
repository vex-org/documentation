# bit

The `bit` module houses Vex's fundamental low-level bit manipulation primitives. These are essential for custom algorithms, specialized data structures, network protocols, compress/decompress paths, and manual CPU-aligned math.

Vex's `Bit.*` functions map directly to single CPU instructions (e.g. `POPCNT`, `LZCNT`, `TZCNT` on x86, or `RBIT` on ARM) ensuring there are no function call overheads at runtime.

## Core Operations

### Population Count
Counts the total number of set `1` bits in a binary representation.
```rust
let val: u32 = 0b1011;
println(Bit.popcnt32(val)); // 3
```
Maps to `llvm.ctpop.i32`

### Leading & Trailing Zeros
Calculates the number of `0` bits preceding the highest set bit, or following the lowest set bit. Helpful for finding alignment offsets and mask calculation.
```rust
Bit.lzcnt32(0b0100) // 29
Bit.tzcnt64(0b1000) // 3
```

### Endian Reversal (Byte Swap)
Reverses the endianness of an integer. Required for networking stacks or unpacking foreign buffer structures.
```rust
let rev = Bit.bswap32(0x12345678); // 0x78563412
```

### Rotating Values
Rotates bits left or right, carrying them over to the overflow bounds. Crucial in hashing configurations (e.g. xxHash, WyHash).
```rust
Bit.rotl64(val, 3);
Bit.rotr32(val, 2);
```

## Integration with Tensors

Like the `Math.*` built-ins, `Bit.*` primitives can be automatically promoted to SIMD vector executions when called on `Tensor<T, N>` structures!
