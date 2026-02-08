# SIR Optimization Pipeline

Vex uses a multi-stage optimization pipeline called **SIR** (Silicon Intermediate Representation) to generate optimal SIMD code. This document explains how the compiler transforms your array operations into blazing-fast machine code.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     VEX COMPILATION PIPELINE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Source (.vx)                                                   │
│       ↓                                                         │
│  ┌─────────┐    ┌─────────┐    ┌──────────────┐                 │
│  │ Parser  │ → │   HIR   │ → │   Codegen    │                   │
│  └─────────┘    └─────────┘    └──────────────┘                 │
│                                       ↓                         │
│                          ┌────────────┴────────────┐            │
│                          ↓                         ↓            │
│                    N ≤ 64 bytes              N > 64 bytes       │
│                          ↓                         ↓            │
│               ┌──────────────────┐    ┌─────────────────────┐   │
│               │   INLINE SIMD    │    │    SIR KERNELS      │   │
│               │  (Pure Vectors)  │    │  (Loop + Prefetch)  │   │
│               └──────────────────┘    └─────────────────────┘   │
│                          ↓                         ↓            │
│               ┌─────────────────────────────────────────────┐   │
│               │              LLVM IR                        │   │
│               └─────────────────────────────────────────────┘   │
│                          ↓                                      │
│               ┌─────────────────────────────────────────────┐   │
│               │   Target: x86 (AVX), ARM (NEON), etc.       │   │
│               └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Optimization Tiers

The compiler classifies operations into tiers based on data size and type:

### Tier 0: Scalar Operations
**Condition:** N = 1  
**Strategy:** Standard scalar operations

```vex
let x: i32 = a + b;  // Simple scalar add
```

### Tier 1: Inline SIMD (≤64 bytes)
**Condition:** N ≤ 64 bytes AND power-of-2 elements AND static size  
**Strategy:** Pure vector values, no loops, no memory allocation

```vex
let a: [i32; 8] = [1, 2, 3, 4, 5, 6, 7, 8];
let b: [i32; 8] = [8, 7, 6, 5, 4, 3, 2, 1];
let c = a + b;  // Single vector add: <8 x i32>
```

**What happens:**
1. Array literals become `insertelement` chains (no alloca!)
2. Operations generate single LLVM vector instructions
3. Results stay in registers until needed

### Tier 1.5: Dynamic Tensor (NEW)
**Condition:** `Tensor<T>` (dynamic size)  
**Strategy:** Fat pointer with vectorized loop

```vex
fn process(data: Tensor<f32>): i64 {
    return data.len();  // O(1) length access from fat pointer
}

// Static → Dynamic coercion at call site
let static_vec: Tensor<i32, 4> = [1, 2, 3, 4];
let len = process(static_vec);  // Automatic fat pointer creation
```

**Fat Pointer Layout:**
```llvm
%DynTensor = type { ptr, i64 }  ; { data_ptr, length }
```

### Tier 2: Small Kernel (64 bytes - 4KB)
**Condition:** 64 < N ≤ 4KB  
**Strategy:** Vectorized loop without prefetch

```vex
let data: [f32; 256] = ...;
let scaled = data * 2.0;  // Loop with <8 x f32> ops
```

### Tier 3: Large Kernel (>4KB)
**Condition:** N > 4KB  
**Strategy:** Unrolled loop + prefetch + multi-vector

```vex
let big_data: [f64; 10000] = ...;
let result = big_data * 2.0;  // Prefetched, unrolled SIMD loop
```

## Inline SIMD Optimizations

For Tier 1 (small arrays), the compiler generates optimal code with no overhead:

### T1.1: Inline Comparison

Array comparisons become single vector `icmp`:

```vex
let a: [i16; 16] = [...];
let b: [i16; 16] = [...];
let eq = a == b;  // Mask<16>
```

**Generated IR:**
```llvm
%cmp = icmp eq <16 x i16> %a, %b  ; Single instruction!
```

### T1.2: Inline Unary Operations

Negation and bitwise NOT become single vector ops:

```vex
let arr: [i32; 8] = [...];
let neg = -arr;  // Negate all elements
let inv = ~arr;  // Bitwise NOT all elements
```

**Generated IR:**
```llvm
%neg = sub <8 x i32> zeroinitializer, %arr
%inv = xor <8 x i32> %arr, <i32 -1, i32 -1, ...>
```

### T1.3: Zero-Alloca Array Literals

Small constant arrays use `insertelement` chains instead of stack allocation:

```vex
let arr: [i32; 4] = [1, 2, 3, 4];
```

**Before optimization:**
```llvm
%arr = alloca [4 x i32]
store i32 1, ptr %arr
store i32 2, ptr ...
; ... lots of stores
```

**After optimization:**
```llvm
%v0 = insertelement <4 x i32> poison, i32 1, i64 0
%v1 = insertelement <4 x i32> %v0, i32 2, i64 1
%v2 = insertelement <4 x i32> %v1, i32 3, i64 2
%v3 = insertelement <4 x i32> %v2, i32 4, i64 3
; No alloca! Pure SSA values
```

### T1.4: Constant Folding

When all values are known at compile time, everything folds:

```vex
fn main(): i32 {
    let target: [i16; 16] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let group = target + 100;
    let xor_result = group ^ target;
    let sum = <+ xor_result;
    return sum;
}
```

**Generated IR:**
```llvm
define i32 @main() {
  ret i32 1425  ; Everything computed at compile time!
}
```

## Function Return Optimization (T2.1)

Functions returning small arrays use vector types internally with automatic coercion:

```vex
fn make_array(base: i32): [i32; 4] {
    return [base, base + 1, base + 2, base + 3];
}
```

**Generated IR:**
```llvm
define [4 x i32] @make_array(i32 %base) {
  ; Build vector with insertelement (not alloca)
  %v0 = insertelement <4 x i32> poison, i32 %base, i64 0
  %add1 = add i32 %base, 1
  %v1 = insertelement <4 x i32> %v0, i32 %add1, i64 1
  ; ...
  
  ; LLVM optimizes to insertvalue for return
  ret [4 x i32] %result
}
```

## Binary Operation Fusion

Chained operations stay in registers without intermediate stores:

```vex
fn compute(a: [f32; 8], b: [f32; 8]): [f32; 8] {
    return (a + b) * (a - b);  // Difference of squares
}
```

**Generated IR (no intermediate alloca):**
```llvm
define [8 x float] @compute([8 x float] %a, [8 x float] %b) {
  %add = fadd <8 x float> %a, %b
  %sub = fsub <8 x float> %a, %b
  %mul = fmul <8 x float> %add, %sub
  ret [8 x float] %mul
}
```

## Reduction Optimizations

Horizontal reductions use LLVM's vector reduction intrinsics:

```vex
let arr: [i32; 8] = [1, 2, 3, 4, 5, 6, 7, 8];
let sum = <+ arr;  // → 36
```

**Generated IR:**
```llvm
%sum = call i32 @llvm.vector.reduce.add.v8i32(<8 x i32> %arr)
```

## Viewing Generated IR

Use the `--emit-llvm` flag to inspect optimization results:

```bash
vex compile --emit-llvm myfile.vx
cat vex-builds/myfile.ll
```

### What to Look For

| Pattern | Good Sign | Bad Sign |
|---------|-----------|----------|
| `alloca` | None for small arrays | Multiple alloca for temps |
| `insertelement` | Chain for literals | N/A |
| `<N x T>` ops | Direct vector ops | Scalar extracts in loop |
| `icmp eq <N x T>` | Single comparison | Element-by-element loop |
| `ret` value | Immediate constant | Complex computation |

## Performance Debugging

### Check If Inlined

```bash
# Should see NO loop for small arrays
vex compile --emit-llvm file.vx
grep -c "br label" vex-builds/file.ll  # 0 for inline SIMD
```

### Check If Constant Folded

```bash
# Should see immediate return value
grep "ret i32" vex-builds/file.ll
# Good: ret i32 42
# Bad:  ret i32 %result
```

### Check Vector Width

```bash
# Should match expected SIMD width
grep "<.*x.*>" vex-builds/file.ll
# <8 x i32> for AVX, <4 x i32> for SSE/NEON
```

## Tuning Thresholds

The inline threshold can be configured (advanced):

```rust
// In vex-sir/src/codegen/backends/simd/inline.rs
pub const INLINE_MAX_BYTES: usize = 64;    // 4 × 128-bit registers
pub const INLINE_MAX_ELEMENTS: usize = 64;  // Max element count
```

Criteria for inline SIMD:
- Total size ≤ 64 bytes
- Element count is power of 2
- Element type is numeric (int or float)

## Summary

| Feature | Status | IR Pattern |
|---------|--------|------------|
| Inline binary ops | ✅ | `add/sub/mul/etc <N x T>` |
| Inline comparison | ✅ | `icmp <N x T>` |
| Inline unary ops | ✅ | `sub zeroinitializer` / `xor -1` |
| Zero-alloca literals | ✅ | `insertelement` chain |
| Vector returns | ✅ | Auto-coercion `<N x T>` ↔ `[N x T]` |
| Constant folding | ✅ | Immediate values |
| Reduction | ✅ | `llvm.vector.reduce.*` |
| **Dynamic Tensor** | ✅ | `{ ptr, i64 }` fat pointer |
| **Static→Dynamic coercion** | ✅ | Automatic at call sites |
| **DynTensor.len()** | ✅ | `extractvalue %t, 1` |

## Next Steps

- [Tensor and Mask Types](./tensor-mask) - Understanding SIMD types
- [SIMD Operators](./index) - Full operator reference
- [GPU Programming](/guide/gpu) - When SIMD isn't enough
