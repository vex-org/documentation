# Vex Language: Native SIMD/SIMT Operator Specification

This document defines the native operators required for Vex's automatic vectorization engine and their hardware mappings.

**Target Domains:** AI (Tensors), Cryptography, Scientific Computing, String Processing.  
**Philosophy:** "Operator Mapping" and **"Platform Agnostic Lane Sizing"**.  
**Vision:** No special types like `simd<T>` in code. Standard arrays (`[f32]`, `[i32; N]`) are directly processed as vectors. The compiler automatically determines the optimal vector width for the target architecture (AVX2, AVX-512, NEON, SVE).

---

## Automatic Heterogeneous Dispatch (CPU ↔ GPU)

Vex's compiler automatically decides whether to execute parallel operations on CPU (SIMD) or GPU (SIMT) based on a **workload threshold calculation**:

```
threshold = complexity × data_size × instruction_family_ratio
```

### Threshold Components

| Component | Description | Example Values |
|-----------|-------------|----------------|
| **complexity** | Algorithmic complexity of the operation | 1.0 (add), 2.0 (mul), 5.0 (FMA chain) |
| **data_size** | Number of elements to process | 1K, 1M, 1B elements |
| **instruction_family_ratio** | Compute-to-memory ratio | 0.3 (memory-bound), 1.0 (balanced), 3.0 (compute-bound) |

### Dispatch Decision

```
if threshold > GPU_THRESHOLD:
    → Emit GPU kernel (CUDA/Metal/Vulkan)
else if threshold > SIMD_THRESHOLD:
    → Emit wide SIMD loop (AVX-512/SVE)
else:
    → Emit narrow SIMD or scalar
```

### User Experience

```vex
// User writes - platform agnostic
let c = a + b;

// Compiler decides:
// ├─ 1K elements  → AVX-512 (CPU SIMD)
// ├─ 1M elements  → GPU kernel dispatch
// └─ 1B elements  → Multi-GPU split
```

**No `gpu` keyword required.** The compiler analyzes the workload and automatically selects the optimal execution target.

---

## 1. Math and AI Core (Linear Algebra Core)

Fundamental arithmetic for high-performance matrix multiplications, neural networks, and physics simulations. Operates on standard arrays.

| Operation | Operator | Description | Hardware (x86/ARM) | Usage Example |
|-----------|----------|-------------|---------------------|---------------|
| **Element-wise Add/Sub** | `+`, `-` | Standard vector addition/subtraction. | `VADD`, `VSUB` | `vec_a + vec_b` |
| **Element-wise Mul/Div** | `*`, `/` | Standard vector multiplication/division. | `VMUL`, `VDIV` | `weights * inputs` |
| **Fused Multiply-Add** | `*+` | Multiply and add (single cycle, high precision). | `VFMADD`, `FMLA` | `acc *+ (x, y)` (acc += x*y) |
| **Minimum** | `<?` | Select the smaller of two vectors. | `VMIN`, `FMIN` | `vec_a <? vec_b` |
| **Maximum** | `>?` | Select the larger of two vectors. | `VMAX`, `FMAX` | `vec_a >? vec_zero` (ReLU) |
| **Remainder** | `%` | Modulo (for float and int). | `VREM` | `indices % v_size` |
| **Negation** | `-` | Sign flip (Unary). | `VNEG` | `-vec_velocity` |

### Example: ReLU Activation Function

```vex
// No "simd<T>" - standard array type [f32] is used directly.
// Compiler auto-vectorizes this.
fn relu(x: [f32]): [f32] {
    return x >? 0.0; // Single instruction: VMAXPS (width-independent)
}
```

---

## 2. Saturating Arithmetic

Critical for image processing, DSP, and audio processing. On overflow, values clamp to limits instead of wrapping.

| Operation | Operator | Description | Hardware (x86/ARM) | Usage Example |
|-----------|----------|-------------|---------------------|---------------|
| **Saturating Add** | `+\|` | Add and clamp at limit (0xFF or MAX_INT). | `PADDS`, `UQADD` | `pixels +\| brightness` |
| **Saturating Sub** | `-\|` | Subtract and clamp at limit (0 or MIN_INT). | `PSUBS`, `UQSUB` | `pixels -\| amount` |
| **Saturating Mul** | `*\|` | Multiply and clamp at limit. | (Custom/Intrinsic) | `audio *\| gain` |

---

## 3. Cryptography and Bit Manipulation (Crypto Core)

Native support for blockchain, hashing (SHA/Blake3), and encryption (AES/ChaCha) algorithms.

| Operation | Operator | Description | Hardware (x86/ARM) | Usage Example |
|-----------|----------|-------------|---------------------|---------------|
| **Rotate Left** | `<<<` | Circular left shift (no overflow). | `PROL`, `VSHL` | `hash <<< 12` |
| **Rotate Right** | `>>>` | Circular right shift. | `PROR`, `VSHR` | `x >>> 7` |
| **XOR** | `^` | Bitwise Exclusive OR. | `PXOR`, `EOR` | `state ^ key` |
| **AND / OR** | `&`, `\|` | Bitwise AND / OR. | `PAND`, `POR` | `mask & value` |
| **NOT** | `~` | Bitwise Inversion. | `PANDN`, `MVN` | `~mask` |
| **Carry-less Mul** | `*^` | Galois Field multiplication (polynomial multiply). | `PCLMULQDQ`, `PMULL` | `gcm_tag *^ key` |
| **Population Count** | `.popcnt()` | Count set bits (method syntax). | `VPOPCNT` | `bitmap.popcnt()` |

### Example: Simple Hash Round

```vex
// [u32] used for width-independent code
state ^= (input + key);
state = state <<< 13;
state = state *+ (prime, 1); // FMA usage
```

---

## 4. Vector Logic and Masking (Logic & Control)

Foundation for "Branchless Programming" - string search, JSON parsing, and conditional operations.

| Operation | Operator | Description | Hardware Result | Usage |
|-----------|----------|-------------|-----------------|-------|
| **Compare Eq** | `==` | Equality check. | `[bool]` (Mask) | `chars == ' '` |
| **Compare Neq** | `!=` | Inequality. | `[bool]` (Mask) | `chars != 0` |
| **Compare Gt/Lt** | `>`, `<` | Greater than / Less than. | `[bool]` (Mask) | `vals > threshold` |
| **Select / Blend** | `? :` | Ternary operator (mask-based selection). | `VPBLEND`, `BSL` | `mask ? val_a : val_b` |

### Example: Masking Whitespace in Strings

```vex
// load_chunk loads platform's vector width worth of data
let chars: [u8] = load_chunk(ptr);
let space_mask = (chars == ' '); // Creates mask (returns [bool])
let non_spaces = space_mask ? 0 : chars; // Branchless filter
```

---

## 5. Memory and Conversion (Memory & Cast)

For AI model quantization (f32 → int8) and sparse data access.

| Operation | Syntax | Description | Hardware |
|-----------|--------|-------------|----------|
| **Broadcast** | `[T](scalar)` | Spread scalar to all vector lanes. | `VPBROADCAST` |
| **Cast (Safe)** | `as` | Type conversion (e.g., f32 → i32). | `CVTPS2DQ` |
| **Reinterpret** | `bitcast<T>` | Change type without changing bits. | No-op (Compiler) |
| **Gather** | `base[indices]` | Scattered read using index vector. | `VGATHER` |
| **Scatter** | `base[indices] = v` | Scattered write using index vector. | `VSCATTER` |

---

## 6. Advanced Math and Transcendental

For scientific computing, physics engines, and game development.

| Operation | Syntax | Description | Hardware (x86/ARM) | Priority |
|-----------|--------|-------------|---------------------|----------|
| **Square Root** | `.sqrt()` | Compute square root. | `VSQRT` | High (Physics) |
| **Inv. Square Root** | `.rsqrt()` | Inverse square root (1/sqrt). Very fast. | `VRSQRT` | Critical (Normalization) |
| **Absolute** | `.abs()` | Absolute value. | `VABS` | Medium |
| **Round/Floor/Ceil** | `.round()` | Rounding operations. | `VROUND` | Medium |
| **Reciprocal** | `.rcp()` | Multiplicative inverse (1/x). Used instead of division. | `VRCP` | High (Optimization) |

### Example: Fast Vector Normalization

```vex
fn normalize(v: [f32]): [f32] {
    let mag_sq = (v * v).sum();
    // 1/sqrt(mag_sq) in a single instruction
    return v * mag_sq.rsqrt(); 
}
```

---

## 7. Data Manipulation (Shuffle & Permute)

Rearranges data in registers instead of memory. Essential for "AoS to SoA" conversions.

| Operation | Syntax | Description | Hardware |
|-----------|--------|-------------|----------|
| **Shuffle** | `.shuffle(mask)` | Permute vector elements. | `VPSHUFFLE`, `VTBL` |
| **Interleave** | `.zip(vec2)` | Interleave two vectors like a zipper. | `UNPCK`, `ZIP1/2` |
| **Extract** | `[index]` | Extract scalar from vector (compile-time index). | `PEXTR`, `MOV` |

---

## 8. Precision Management (Widening & Narrowing)

Critical for AI quantization (Int8). Writes operation results to larger types to prevent overflow.

| Operation | Syntax | Description | Hardware | Usage |
|-----------|--------|-------------|----------|-------|
| **Widen Mul** | `.mul_wide(v)` | `i8 * i8` → `i16` result. | `PMULLW` | Quantization |
| **Narrow** | `.narrow()` | Compress `i16` to `i8` (with saturation). | `PACKSS` | Output compression |

---

## 9. Reduction Methods

Operations that reduce a vector to a single scalar.

| Method | Description | Example |
|--------|-------------|---------|
| `.sum()` | Horizontal sum. | `dot_prod = (a * b).sum()` |
| `.min()` / `.max()` | Smallest/largest element in vector. | `min_val = vec.min()` |
| `.all()` | Do all elements match the mask? | `if (vec > 0).all() { ... }` |
| `.any()` | Does any element match? | `if (vec == error_code).any() { ... }` |

---

## 10. Real-World Examples

### 10.1 Game Development: Particle Physics Engine

Normalizing velocity vectors for thousands of particles in a physics engine.

```vex
struct ParticleSystem {
    // Platform-independent vector types (standard arrays)
    vx: [f32], 
    vy: [f32],
    vz: [f32]
}

fn normalize_particles(p: &ParticleSystem!) {
    // Compiler uses widest register for target architecture
    let mag_sq = (p.vx * p.vx) + (p.vy * p.vy) + (p.vz * p.vz);

    let inv_mag = mag_sq.rsqrt();

    p.vx = p.vx * inv_mag;
    p.vy = p.vy * inv_mag;
    p.vz = p.vz * inv_mag;
}
```

### 10.2 Cryptography: ChaCha20 Quarter Round

```vex
// [u32]: 8 operations on AVX2, 16 operations on AVX-512 simultaneously
fn quarter_round(a: &[u32]!, b: &[u32]!, c: &[u32]!, d: &[u32]!) {
    *a = *a + *b;  *d = *d ^ *a;  *d = *d <<< 16;
    *c = *c + *d;  *b = *b ^ *c;  *b = *b <<< 12;
    *a = *a + *b;  *d = *d ^ *a;  *d = *d <<< 8;
    *c = *c + *d;  *b = *b ^ *c;  *b = *b <<< 7;
}
```

### 10.3 AI/ML: Cosine Similarity (Embedding Comparison)

```vex
fn cosine_similarity(v1: [f32], v2: [f32]): f32 {
    let dot = (v1 * v2).sum(); 
    
    let mag_v1 = (v1 * v1).sum();
    let mag_v2 = (v2 * v2).sum();
    
    return dot * (mag_v1 * mag_v2).rsqrt();
}
```

### 10.4 Image Processing: Brightness Increase

```vex
fn increase_brightness(pixels: [u8], amount: [u8]): [u8] {
    // +| operator (Saturating Add) works hardware-independently
    return pixels +| amount; 
}
```

### 10.5 Web/Backend: SIMD JSON Scanner (Whitespace Skipping)

The most time-consuming task in JSON parsers is finding whitespace and structural characters.

```vex
// 'load_chunk' loads appropriate width data for the platform
fn scan_json_chunk(ptr: *u8): i32 {
    let chars: [u8] = load_chunk(ptr);
    
    let mask_quote = (chars == '"');
    let mask_brace = (chars == '{') | (chars == '}');
    let mask_colon = (chars == ':');
    
    let interesting = mask_quote | mask_brace | mask_colon;
    
    // to_bitmask() returns appropriate integer for vector length
    let bitmask = interesting.to_bitmask(); 
    
    if bitmask == 0 {
        return -1; 
    }
    
    return bitmask.ctz();
}
```

### 10.6 String Processing: Fast Substring Search

```vex
fn find_substring_simd(haystack: *u8, len: i32, needle_char: u8): i32 {
    let v_needle: [u8] = [u8](needle_char); // Broadcast
    
    // Loop step automatically determined by platform's vector width (simd_width)
    for i in 0..len step sys.SIMD_WIDTH {
        let chunk = load_chunk(haystack + i);
        
        let eq = (chunk == v_needle);
        let mask = eq.to_bitmask();
        
        if mask != 0 {
            return i + mask.ctz();
        }
    }
    return -1;
}
```

### 10.7 Batch Validation: ASCII/Numeric Check

```vex
fn is_numeric_ascii(input: [u8]): bool {
    let ge_zero = input >= '0';
    let le_nine = input <= '9';
    
    let is_digit = ge_zero & le_nine;
    
    return is_digit.all();
}
```
