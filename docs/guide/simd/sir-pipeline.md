# SIR Optimization Pipeline

This page describes the current pipeline conservatively: what is clearly implemented, what route a workload tends to take, and where the sharp edges still are.

## High-level picture

There are two different optimization routes that often get conflated:

- compiler-side inline SIMD for qualifying small static arrays
- SIR lowering and backend dispatch for tensor or graph workloads

Conceptually:

```text
source code
  -> HIR
  -> either small-array inline SIMD
  -> or SIR graph lowering
  -> backend selection
  -> LLVM IR / target code
```

## Route 1: inline SIMD for small arrays

The compiler has a dedicated `simd_small` path for qualifying fixed-size arrays.

The current backend threshold is explicit:

- maximum 64 bytes total
- maximum 64 elements
- element count must be a power of two

That threshold is implemented in `crates/vex-sir/src/codegen/backends/simd/inline.rs` and mirrored by the small-array codegen helpers in `crates/vex-compiler/src/codegen_hir/expr/simd_small`.

Typical examples on this path are:

- element-wise arithmetic on `[T; N]`
- vector comparisons on `[T; N]`
- reductions such as `\+` and `\>` on small arrays

Example:

```vex
fn sum8(x: [i32; 8]): i32 {
    return \+ x
}
```

On this path, the likely evidence in emitted LLVM is:

- `<N x T>` vector values
- `insertelement` chains for tiny literals
- `llvm.vector.reduce.*` intrinsics for reductions

## Route 2: SIR for tensor and graph code

When code is written around `graph fn`, `Tensor<T>`, or other graph-shaped tensor operations, the compiler lowers into SIR first and then chooses a backend based on shapes and supported node families.

This route is the right mental model for:

- dynamic tensors
- graph compute
- gather and scatter families
- backend dispatch between CPU SIMD and GPU-style paths

## Static and dynamic shape routing

The internal contract distinguishes between static and dynamic shapes:

- static tensors like `Tensor<f32, 4>` carry fixed shape information
- dynamic tensors like `Tensor<f32>` lower to `%VexDynTensor { ptr, i64 }`
- `Span<T>` lowers as a non-owning `%VexSlice { ptr, i64 }`

That distinction is not cosmetic. A dynamic tensor owns storage and participates in drop behavior, while a span is a borrowed view.

## Important coercion boundary

One of the easy mistakes is assuming every tensor-like value is interchangeable because the layouts look similar.

They are not.

The compiler has an explicit safety guard to avoid silently fabricating an owning dynamic tensor from a stack-aliased vector value. Conversions into `Tensor<T>` must go through the proper owned path.

In practical terms:

- `Span<T> -> Tensor<T>` should be treated as an owned conversion
- `Tensor<T>` and `Span<T>` are not just two names for the same thing
- bugs at generic call boundaries have historically shown up exactly here

## Unified Silicon IR (SIR) Operator Reference

All data-parallel operations in Vex graph and tensor pipelines lower to a standardized set of SIR operators, which are optimized across different backend architectures (CPU/SIMD, Metal, Vulkan, and WebGPU).

### Binary Operators (`BinOp`)

| Operator Category | BinOp | Vex Syntax | LLVM Instruction / Intrinsic | Metal / CUDA / Vulkan |
| :--- | :--- | :--- | :--- | :--- |
| **Arithmetic** | `Add` | `a + b` | `fadd` / `add` | `+` |
| | `Sub` | `a - b` | `fsub` / `sub` | `-` |
| | `Mul` | `a * b` | `fmul` / `mul` | `*` |
| | `Div` | `a / b` | `fdiv` / `sdiv` | `/` |
| | `Mod` | `a % b` | `frem` / `srem` | `fmod` / `%` |
| | `Pow` | `a ** b` | `llvm.pow.*` | `pow` / `powf` |
| **Saturating** | `SaturatingAdd` | `a +| b` | Clamped add | Clamped by Type `MAX` |
| | `SaturatingSub` | `a -| b` | Clamped sub | Clamped by Type `MIN` |
| | `SaturatingMul` | `a *| b` | Clamped mul | Clamped by Type `MIN/MAX` |
| **Comparison** | `Eq` / `Ne` | `a == b` / `a != b` | `icmp eq` / `fcmp oeq` | Returns `Mask<N>` |
| | `Lt` / `Le` | `a < b` / `a <= b` | `icmp` / `fcmp` | Returns `Mask<N>` |
| | `Gt` / `Ge` | `a > b` / `a >= b` | `icmp` / `fcmp` | Returns `Mask<N>` |
| **Logical** | `And` / `Or` | `a && b` / `a \|\| b` | `and` / `or` | `&&` / `\|\|` |
| **Bitwise** | `BitAnd` / `BitOr` | `a & b` / `a \| b` | `and` / `or` | `&` / `\|` |
| | `BitXor` | `a ^ b` | `xor` | `^` |
| | `Shl` / `Shr` | `a << b` / `a >> b` | `shl` / `lshr` or `ashr` | `<<` / `>>` |
| | `RotL` / `RotR` | `a <<< b` / `a >>> b`| `llvm.fshl` / `llvm.fshr` | `rotate` (Metal/CUDA) |
| **Min/Max** | `Min` / `Max` | `a <? b` / `a >? b` | `llvm.minnum` / `llvm.maxnum`| `min` / `max` |
| **Matrix/Vector**| `MatMul` | `a <*> b` | Lowered to MatMul Node | Blas / Metal kernel |
| | `MatPow` | `a <^> n` | Matrix Exponentiation | Iterative / Spectral |
| | `Dot` / `Cross` | `a · b` / `a × b` | Vector Dot / Cross | `dot` / `cross` |
| | `Solve` | `A <\> b` | Lowered to Solve Node | Linear Solver (Ax=b) |
| **Extended Math**| `Atan2` / `Hypot` | `atan2(y,x)` / `hypot(x,y)`| `atan2` / `llvm.sqrt` | `atan2` / `hypot` |
| | `Fmod` / `Copysign`| `fmod(x,y)` / `copysign(x,y)`| `frem` / `llvm.copysign` | `fmod` / `copysign` |
| **Special** | `GaloisMul` | `a *^ b` | Carry-less multiply | `pmul` (AVX) / clmul |
| | `Concat` | `a ++ b` | Lowered to Concat Node | Dynamic Concatenation |

---

### Unary Operators (`UnaryOp`)

| Operator Category | UnaryOp | Vex Syntax | LLVM / Backend Mapping |
| :--- | :--- | :--- | :--- |
| **Basic** | `Neg` / `Not` | `-x` / `!x` | `fneg` or `sub 0, x` / `xor x, true` |
| | `BitNot` | `~x` | `xor x, -1` |
| | `Cast` | `x as T` | `trunc` / `ext` / `fptosi` / `sitofp` |
| **Math Functions**| `Abs` / `Sqrt` | `abs(x)` / `sqrt(x)` | `llvm.fabs.*` / `llvm.sqrt.*` |
| | `Exp` / `Exp2` | `exp(x)` / `exp2(x)` | `llvm.exp.*` / `llvm.exp2.*` |
| | `Log` / `Log2` / `Log10`| `log(x)` / `log2` / `log10`| `llvm.log.*` / `llvm.log2.*` / `llvm.log10.*` |
| | `Sin` / `Cos` / `Tan` | `sin(x)` / `cos` / `tan` | `llvm.sin.*` / `llvm.cos.*` / `tan` |
| | `Floor` / `Ceil` / `Round`| `floor` / `ceil` / `round`| `llvm.floor.*` / `llvm.ceil.*` / `llvm.round.*` |
| | `Trunc` / `Rint` | `trunc(x)` / `rint(x)` | `llvm.trunc.*` / `llvm.rint.*` (Banker's round) |
| | `Rsqrt` | `rsqrt(x)` | `1.0 / llvm.sqrt.*` |
| **Activation** | `Relu` | `relu(x)` | `max(0, x)` (fused element-wise) |
| | `Sigmoid` | `sigmoid(x)` | `1.0 / (1.0 + exp(-x))` |
| **Matrix** | `Transpose` | `a^T` or `a.T` | Lowered to Permute Node |

---

### Ternary Operators (`TernaryOp`)

* **`Fma`**: Fused Multiply-Add (`a * b + c`). Lowers directly to hardware `llvm.fma.*` or GPU FMA instructions.
* **`Clamp`**: Value clamping (`clamp(val, min, max)`). Lowers to nested min/max intrinsics.
* **`Select`**: Conditional selection (`cond ? true_val : false_val`). Lowers to LLVM `select` instruction.

---

### Reduction Operators (`ReduceOp`)

Reduction operations accumulate tensor elements along specified axes:

* **`Sum` (`<+ arr`)**: Computes the sum of elements (LLVM `llvm.vector.reduce.fadd`).
* **`Prod` (`<* arr`)**: Computes the product of elements (LLVM `llvm.vector.reduce.fmul`).
* **`Min` (`<?| arr`) / `Max` (`>?| arr`)**: Computes minimum/maximum elements (LLVM `llvm.vector.reduce.fmin` / `fmax`).
* **`And` (`<& arr`) / `Or` (`<\| arr`)**: Logical/bitwise reductions on masks.
* **`Mean`**: Computed as `Sum / N`.
* **`ArgMin` / `ArgMax`**: Computes the index of the minimum/maximum element.

---

### Mask Operators (`MaskOp`)

These operate on boolean `Mask<N>` vectors and return scalar results:

* **`ToBitmask`**: Converts a `Mask<N>` to an integer bitmask (`iN`) representing lanes (LLVM `bitcast <N x i1> -> iN`).
* **`FromBitmask`**: Converts an integer bitmask to a `Mask<N>`.
* **`Any` / `All`**: Returns `true` if any/all lanes are true (`icmp ne bitmask, 0` / `icmp eq bitmask, all_ones`).
* **`CountSetBits`**: Returns the count of true lanes (LLVM `llvm.ctpop`).
* **`FirstSet`**: Returns the index of the first true lane, or `-1` if none (LLVM `llvm.cttz`).
* **`MaskAnd` / `MaskOr` / `MaskXor` / `MaskNot`**: Logical bitwise operations on masks.

---

## Backend Operator Support Matrix

The following table summarizes compiler code generation support for Silicon IR (SIR) operations across backends:

| Operator Category | CPU (SIMD/Scalar) | macOS (Metal) | Linux/Windows (Vulkan) | Web (WebGPU/WGSL) | CUDA / ROCm |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Element-wise Math** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Reductions** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Mask Ops** | ✅ Native (cttz/ctpop) | ✅ Native (`popcount`) | ✅ Native (subgroup) | ✅ Native | ✅ Native |
| **Matrix Operations** | ✅ LLVM-SIMD / BLAS | ✅ Metal Kernels | ✅ SPIR-V MatMul | ✅ WGSL Compute | ✅ CuBLAS / HIP |
| **Saturating Arithmetic**| ✅ Native | ✅ Clamped emulation | ✅ Clamped emulation | ✅ Clamped | ✅ Native |
| **Quantized/Sparse** | ✅ SIMD-optimized | ✅ MSL Quantized | 🟡 Partial | 🟡 Partial | ✅ CUDA Kernels |

---

## Performance Routing & FLOP Weights

When evaluating whether to dispatch a tensor workload to the CPU or GPU at runtime, Vex uses a complexity cost model based on operator FLOP weights:

* **Weight 1.0 (Trivial)**: `Abs`, `Neg`, `Floor`, `Ceil`, `Round`, `Trunc`, `Rint`, `Sign`, `Not`, `BitNot`, `Relu`.
* **Weight 2.0 (Basic Math)**: `Fmod`, `Copysign`.
* **Weight 4.0 (Hardware-optimized)**: `Sqrt`, `Rsqrt`, `Cbrt`.
* **Weight 6.0 (Composite)**: `Hypot`.
* **Weight 8.0 (Transcendental)**: `Sin`, `Cos`, `Tan`, `Exp`, `Log`, `Exp2`, `Expm1`, `Log2`, `Log10`, `Log1p`, `Sinh`, `Cosh`, `Tanh`.
* **Weight 10.0 (Inverse Trig / Activation)**: `Asin`, `Acos`, `Atan`, `Asinh`, `Acosh`, `Atanh`, `Atan2`, `Sigmoid`, `Erf`.
* **Weight 12.0 (Exponentiation)**: `Pow`.

Workloads with cumulative FLOP scores exceeding the dispatch threshold are automatically offloaded to the target GPU backend (e.g. Metal).

---

## See also

- [SIMD and Auto-Vectorization](./index)
- [Tensor and Mask Types](./tensor-mask)
- [GPU Programming](/guide/gpu)

