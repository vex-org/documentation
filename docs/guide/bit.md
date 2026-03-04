# Bit Namespace

The `Bit` namespace provides hardware-accelerated parallel bit manipulation operations. These are essential for high-performance compression, encoding, and data structure implementations.

> **No import needed.** `Bit.*` is a builtin namespace available everywhere.

## Quick Example

```vex
// Extract specific bits from a value using a mask
let data: u64 = 0b1010_1100;
let mask: u64 = 0b1111_0000;

let extracted = Bit.pext(data, mask);  // 0b1010 (bits at mask positions, packed)
let deposited = Bit.pdep(0b1010, mask); // 0b1010_0000 (bits deposited at mask positions)
```

## Parallel Bit Deposit

Scatter bits from source to positions indicated by the mask.

| Function | Signature | Description |
|----------|-----------|-------------|
| `Bit.pdep(source, mask)` | `(u64, u64) → u64` | Deposit bits at mask positions |

### How PDEP Works

```
source  = 0b_1011          (4 bits to deposit)
mask    = 0b_1010_0110     (positions to deposit into)
                   ↓↓  ↓↓
result  = 0b_1000_0110     (bits scattered to mask positions)
```

Each bit from `source` is placed at the next set bit position in `mask`, left to right.

### Platform Mapping

| x86 | ARM |
|---|---|
| `PDEP` (BMI2, 1 cycle Intel / 3 cycles AMD Zen3+) | Software fallback (Apple Silicon has no SVE) |

## Parallel Bit Extract

Gather bits from source at positions indicated by the mask, packed contiguously.

| Function | Signature | Description |
|----------|-----------|-------------|
| `Bit.pext(source, mask)` | `(u64, u64) → u64` | Extract bits from mask positions |

### How PEXT Works

```
source  = 0b_1010_0110
mask    = 0b_1010_0110     (positions to extract from)
                   ↓↓  ↓↓
result  = 0b_1011          (extracted bits, packed together)
```

Each bit at a set position in `mask` is extracted and packed into the result, starting from bit 0.

### Platform Mapping

| x86 | ARM |
|---|---|
| `PEXT` (BMI2, 1 cycle Intel / 3 cycles AMD Zen3+) | Software fallback |

## Use Cases

### Compression (Huffman Decoding)

PEXT/PDEP are the secret weapon behind modern compression:

```vex
// Fast Huffman decode: extract variable-length code from bitstream
fn decodeSymbol(bitstream: u64, codeLen: u64): u64 {
    let mask = (1 as u64 << codeLen) - 1;
    return Bit.pext(bitstream, mask);
}
```

### Bitmap Indexing

Fast rank/select on bitmaps (used in succinct data structures):

```vex
// Count set bits before position (rank query)
fn rank(bitmap: u64, pos: u64): u64 {
    let mask = (1 as u64 << pos) - 1;
    return Math.popcount(bitmap & mask) as u64;
}

// Select the nth set bit position
fn select(bitmap: u64, n: u64): u64 {
    let! b = bitmap;
    let! count: u64 = 0;
    while count < n {
        b = b & (b - 1);  // Clear lowest set bit
        count = count + 1;
    }
    return Math.ctz(b) as u64;
}
```

### Chess Engines (Bitboard Move Generation)

```vex
// Extract all set bit positions from a bitboard
fn extractMoves(bitboard: u64): Vec<u64> {
    let! moves = Vec.new<u64>();
    let! bb = bitboard;
    while bb != 0 {
        let sq = Math.ctz(bb) as u64;  // Index of lowest set bit
        moves.push(sq);
        bb = bb & (bb - 1);            // Clear that bit
    }
    return moves;
}
```

### Data Packing

```vex
// Pack 4 fields into a u64 using PDEP
fn packFields(a: u64, b: u64, c: u64, d: u64): u64 {
    let! result: u64 = 0;
    result = result | Bit.pdep(a, 0xFF);              // bits 0-7
    result = result | Bit.pdep(b, 0xFF00);             // bits 8-15
    result = result | Bit.pdep(c, 0xFF0000);           // bits 16-23
    result = result | Bit.pdep(d, 0xFF000000);         // bits 24-31
    return result;
}

// Unpack with PEXT
fn unpackA(packed: u64): u64 {
    return Bit.pext(packed, 0xFF);
}
```

## Hardware Support

| Function | x86 | ARM | Apple Silicon |
|----------|-----|-----|---------------|
| `pdep` | BMI2 (Haswell+ 2013) | Software fallback | Software fallback |
| `pext` | BMI2 (Haswell+ 2013) | Software fallback | Software fallback |

> **Note:** On ARM/Apple Silicon, `pdep` and `pext` use efficient software fallback loops. On x86 with BMI2 support, they compile to single instructions.

> **AMD Zen 1/2 warning:** AMD Zen 1 and Zen 2 implement PDEP/PEXT with microcode (~18 cycles). True single-cycle support starts from AMD Zen 3+.

## Related

- [Math.popcount](/guide/math#bit-operations) — Count set bits
- [Math.clz / Math.ctz](/guide/math#bit-operations) — Leading/trailing zeros  
- [Math.bswap](/guide/math#bit-operations) — Byte-swap (endian conversion)
- [Crypto Namespace](/guide/crypto) — Cryptographic operations
- [SIMD](/guide/simd) — Array-level bit operations
