# Auto-Vectorization Operator Mapping: Vex to SPIR-V

**Date:** December 19, 2025
**Status:** Verification Complete (Full Parity)

This document tracks the mapping between Vex's auto-vectorization operators and their SPIR-V implementation strategies.

## 1. Direct Mapping (Native SPIR-V Instructions)

| Vex Operator | Description | SPIR-V Instruction | Notes |
|---|---|---|---|
| `+`, `-`, `*`, `/` | Basic Arith | `OpIAdd`, `OpFAdd`, etc. | Fully supported |
| `&`, `|`, `^`, `~` | Bitwise | `OpBitwiseAnd`, `OpBitwiseOr`, `OpBitwiseXor`, `OpNot` | Fully supported |
| `<<`, `>>` | Shift | `OpShiftLeftLogical`, `OpShiftRightLogical`, `OpShiftRightArithmetic` | Fully supported |
| `==`, `!=`, `<`, `>` | Comparison | `OpIEqual`, `OpFOrdEqual`, `OpSLessThan`, etc. | Fully supported |
| `? :` | Select | `OpSelect` | Fully supported |
| `.popcnt()` | Bit Count | `OpBitCount` | Fully supported |
| `as` | Cast | `OpConvertFToS`, `OpConvertSToF`, `OpBitcast` | Fully supported |

## 2. Extended Instruction Mapping (GLSL.std.450)

Requires `OpExtInstImport "GLSL.std.450"`.

| Vex Operator | Description | GLSL.std.450 Function | Implementation Strategy |
|---|---|---|---|
| `<?`, `>?` | Min/Max | `FMin`, `SMin`, `UMin`, `FMax`, `SMax`, `UMax` | Map directly to extended instructions. |
| `.abs()` | Absolute | `FAbs`, `SAbs` | Map directly. |
| `.sqrt()`, `.rsqrt()` | Roots | `Sqrt`, `InverseSqrt` | Map directly. |
| `.round()`, `.floor()` | Rounding | `Round`, `Floor`, `Ceil` | Map directly. |
| `.sin()`, `.cos()` | Trig | `Sin`, `Cos`, `Tan`, `Asin`, etc. | Map directly. |
| `*+` | Fused Mul-Add | `Fma` | Map directly. |
| `+|`, `-|` | Saturating Math | `FClamp`, `SClamp`, `UClamp` | **Emulation required:** `clamp(a + b, min, max)`. `GLSL.std.450` provides `Clamp` which makes this efficient. |

## 3. Emulation Required (No Direct Instruction)

| Vex Operator | Description | Implementation Strategy | Complexity |
|---|---|---|---|
| `<<<`, `>>>` | Rotate | `(x << n) | (x >> (width - n))` | Low (Compiler expansion) |
| `*^` | Carry-less Mul | Software emulation loop (Shift-XOR) | **Supported** - Emulated via control flow. |
| `.shuffle()` | Vector Shuffle | `OpVectorShuffle` | Native, but mask must be constant for `OpVectorShuffle`. Dynamic shuffle requires loaded usage. |

## 4. Conclusion & Strategy

1.  **90% Coverage:** The vast majority of Vex's proposed SIMD operators map **directly** to SPIR-V core or `GLSL.std.450`.
2.  **Saturation:** Saturating arithmetic (`+|`, `-|`) is not a single opcode but is efficiently implemented using `Add + Clamp`. The compiler will emit this sequence.
3.  **Rotation:** `<<<` and `>>>` will be emitted as the standard shift-OR sequence.
4.  **Carry-less Mul:** Originally a CPU-only op. Now implemented in SPIR-V via emulation loop for feature parity.
    -   *Decision:* Supported via emulation. Performance warning may apply.

**Result:** SPIR-V is a **viable and excellent target** for Vex's auto-vectorization backend.
