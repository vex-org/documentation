# Inline Assembly (`asm!`)

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** 🚧 In Development

Vex provides inline assembly support for low-level hardware access with full borrow checker integration and compile-time target validation.

---

## 1. Overview

Inline assembly allows embedding target-specific machine code directly in Vex source. Unlike other languages, Vex's `asm!` block:

1. **Memory Safe** - Borrow checker validates all operands
2. **Target Validated** - Compile-time validation of registers and instructions
3. **Type Safe** - Operand types are checked at compile time

```vex
unsafe {
    let! result: i64 = 0;
    
    asm!(
        "mov $0, $1",
        "add $0, 1",
        $asmOut("=r", result),
        $asmIn("r", 42_i64)
    )
}
```

---

## 2. Syntax

### 2.1 Basic Structure

```vex
asm!(
    <template>,
    [$asmIn("constraint", expr), ...]
    [$asmOut("constraint", expr), ...]
    [$asmOpt("option1", "option2", ...)]
    [$asmClobber("reg1", "reg2", ...)]
)
```

**Builtin-Style Operands:**
| Builtin | Description |
|---------|-------------|
| `$asmIn("c", e)` | Input operand |
| `$asmOut("c", e)` | Output operand |
| `$asmLateOut("c", e)` | Late output (can reuse input register) |
| `$asmInOut("c", e)` | Input-output operand |
| `$asmInLateOut("c", e)` | Input with late output |
| `$asmOpt(...)` | Assembly options |
| `$asmClobber(...)` | Clobbered registers |

### 2.2 Template String

Assembly instructions as string literals. Operands are referenced using `$N` placeholders.

```vex
asm!(
    "mov $0, $1",       // Move input to output
    "add $0, $2",       // Add third operand
    $asmOut("=r", result),
    $asmIn("r", a),
    $asmIn("r", b)
)
```

### 2.3 Operand Order

Operands are referenced by their position (0-indexed). Output operands come first:

```vex
let a: i64 = 10
let b: i64 = 32
let! result: i64 = 0

asm!(
    "add $0, $1, $2",   // $0=result, $1=a, $2=b
    $asmOut("=r", result),
    $asmIn("r", a),
    $asmIn("r", b)
)
// result = 42
```

---

## 3. Operand Types

### 3.1 Input Operands (`$asmIn`)

Input operands pass values **into** the assembly. They are borrowed immutably (`&T`).

```vex
let x = 42
asm!(
    "mov rax, $0",
    $asmIn("r", x)      // x is borrowed here
)
// x is still valid
```

**Borrow Checker Rule:** Creates a shared borrow for the duration of the `asm!` block.

### 3.2 Output Operands (`$asmOut`)

Output operands receive values **from** the assembly. They require mutable access (`&mut T`).

```vex
let! result: i64 = 0
asm!(
    "mov $0, 42",
    $asmOut("=r", result)    // result must be mutable
)
```

**Constraint Prefix:** Output constraints use `=` prefix (e.g., `"=r"` for output register).

**Borrow Checker Rule:** Creates an exclusive borrow. Variable must be declared with `let!`.

### 3.3 Input-Output Operands (`$asmInOut`)

Combined read-write operands. Variable is read, then written.

```vex
let! counter: i64 = 10
asm!(
    "add $0, $0, 1",     // Increment in place
    $asmInOut("+r", counter)
)
// counter is now 11
```

**Constraint Prefix:** InOut constraints use `+` prefix (e.g., `"+r"` for read-write register).

**Borrow Checker Rule:** Creates an exclusive borrow (same as `out`).

### 3.4 Late Output (`$asmLateOut`)

Output that doesn't conflict with inputs (can reuse same register).

```vex
asm!(
    "mov $1, $0",
    "add $1, 1",
    $asmIn("r", input),
    $asmLateOut("=r", output)
)
```

### 3.5 Input-Output with Late Output (`$asmInLateOut`)

```vex
asm!(
    "xchg $0, $1",
    $asmInLateOut("+r", a),
    $asmInLateOut("+r", b)
)
```

---

## 4. Register Constraints

### 4.1 Generic Constraints

| Constraint | Description |
|------------|-------------|
| `"r"` | Any general-purpose register |
| `"q"` | Byte-sized register (al, bl, etc.) |
| `"Q"` | a, b, c, d registers only |
| `"x"` | SSE/AVX register (x86_64) |
| `"v"` | AVX-512 register (x86_64) |
| `"w"` | SIMD register (AArch64) |
| `"f"` | Floating-point register |
| `"m"` | Memory operand |
| `"i"` | Immediate value |

**Output Prefixes:**
| Prefix | Meaning |
|--------|----------|
| `=` | Write-only output |
| `+` | Read-write (inout) |

### 4.2 Explicit Register Names

```vex
// x86_64
asm!(
    "syscall",
    $asmIn("{rax}", syscall_num),
    $asmIn("{rdi}", arg1),
    $asmIn("{rsi}", arg2),
    $asmOut("={rax}", result)
)

// AArch64
asm!(
    "svc #0",
    $asmIn("{x8}", syscall_num),
    $asmIn("{x0}", arg1),
    $asmOut("={x0}", result)
)
```

**Note:** Explicit registers are wrapped in `{}` within the constraint string.

### 4.3 Architecture-Specific Registers

**x86_64:**
```
General: rax, rbx, rcx, rdx, rsi, rdi, rbp, rsp, r8-r15
SSE:     xmm0-xmm15
AVX:     ymm0-ymm15
AVX-512: zmm0-zmm31, k0-k7
```

**AArch64:**
```
General: x0-x30, w0-w30
SIMD:    v0-v31, d0-d31, s0-s31
Special: sp, lr (x30), xzr, wzr
```

**RISC-V:**
```
General: x0-x31 (zero, ra, sp, gp, tp, t0-t6, s0-s11, a0-a7)
Float:   f0-f31 (ft0-ft11, fs0-fs11, fa0-fa7)
```

---

## 5. Clobbers

Declare registers modified by the assembly that aren't operands using `$asmClobber`.

```vex
asm!(
    "cpuid",
    $asmInOut("+{eax}", leaf),
    $asmOut("={ebx}", ebx),
    $asmOut("={ecx}", ecx),
    $asmOut("={edx}", edx),
    $asmClobber("memory")    // May modify memory
)
```

### 5.1 Special Clobbers

| Clobber | Description |
|---------|-------------|
| `"memory"` | Assembly may read/write arbitrary memory |
| `"cc"` | Condition codes/flags are modified |
| `"stack"` | Stack pointer may be modified |

---

## 6. Options

Control assembly behavior using `$asmOpt`:

```vex
asm!(
    "nop",
    $asmOpt("pure", "nomem", "nostack")
)
```

| Option | Description |
|--------|-------------|
| `"pure"` | No side effects (can be optimized away if unused) |
| `"nomem"` | Doesn't access memory (beyond explicit operands) |
| `"nostack"` | Doesn't modify stack |
| `"preserves_flags"` | Doesn't modify CPU flags |
| `"noreturn"` | Never returns (e.g., abort) |
| `"att_syntax"` | Use AT&T syntax (default is Intel for x86) |
| `"raw"` | Don't apply any fixups to template |

---

## 7. Borrow Checker Integration

### 7.1 Safety Rules

All `asm!` blocks must be inside `unsafe`:

```vex
// ❌ Error: asm! requires unsafe block
asm!("nop")

// ✅ Correct
unsafe {
    asm!("nop")
}
```

### 7.2 Borrow Rules

```vex
let! x = 10
let! y = 20

unsafe {
    // ❌ Error: cannot borrow x as mutable more than once
    asm!(
        "add $0, $1",
        $asmInOut("+r", x),
        $asmInOut("+r", x)     // Error!
    )
    
    // ✅ Correct: different variables
    asm!(
        "add $0, $1",
        $asmInOut("+r", x),
        $asmIn("r", y)
    )
}
```

### 7.3 Lifetime Safety

```vex
fn get_ptr(): *i64 {
    let! local = 42
    unsafe {
        // ❌ Error: returning reference to local variable
        let! ptr: *i64 = nil
        asm!(
            "lea $0, [$1]",
            $asmOut("=r", ptr),
            $asmIn("r", &local)
        )
        return ptr  // Dangling pointer!
    }
}
```

---

## 8. Compile-Time Target Validation

### 8.1 Architecture Validation

```vex
#[cfg(target_arch = "x86_64")]
fn rdtsc(): u64 {
    let! low: u32 = 0
    let! high: u32 = 0
    
    unsafe {
        asm!(
            "rdtsc",
            $asmOut("={eax}", low),
            $asmOut("={edx}", high)
        )
    }
    
    return (high as u64 << 32) | (low as u64)
}

#[cfg(target_arch = "aarch64")]
fn rdtsc(): u64 {
    let! result: u64 = 0
    
    unsafe {
        asm!(
            "mrs $0, cntvct_el0",
            $asmOut("=r", result)
        )
    }
    
    return result
}
```

### 8.2 Validation Errors

```vex
// On x86_64 target:
asm!(
    "mrs x0, cntvct_el0",  // ❌ Error: ARM instruction on x86_64 target
    $asmOut("=r", result)
)

asm!(
    "mov x99, x0",         // ❌ Error: invalid register 'x99' for aarch64
    $asmIn("r", val)
)
```

### 8.3 Feature Requirements

```vex
// Require specific CPU features
#[target_feature(enable = "avx2")]
unsafe fn avx2_add(a: [f32; 8], b: [f32; 8]): [f32; 8] {
    let! result: [f32; 8] = [0.0; 8]
    
    asm!(
        "vmovups $3, [$0]",
        "vaddps $3, $3, [$1]",
        "vmovups [$2], $3",
        $asmIn("r", a.as_ptr()),
        $asmIn("r", b.as_ptr()),
        $asmIn("r", result.as_ptr()!),
        $asmOut("=x", _),
        $asmClobber("memory")
    )
    
    return result
}
```

---

## 9. OS-Specific Considerations

### 9.1 System Calls

**Linux x86_64:**
```vex
fn syscall_write(fd: i32, buf: *u8, len: usize): isize {
    let! result: isize = 0
    
    unsafe {
        asm!(
            "syscall",
            $asmIn("{rax}", 1_i64),        // SYS_write
            $asmIn("{rdi}", fd),
            $asmIn("{rsi}", buf),
            $asmIn("{rdx}", len),
            $asmLateOut("={rax}", result),
            $asmClobber("rcx", "r11", "memory")
        )
    }
    
    return result
}
```

**macOS AArch64:**
```vex
fn syscall_write(fd: i32, buf: *u8, len: usize): isize {
    let! result: isize = 0
    
    unsafe {
        asm!(
            "svc #0x80",
            $asmIn("{x16}", 4_i64),        // SYS_write
            $asmIn("{x0}", fd),
            $asmIn("{x1}", buf),
            $asmIn("{x2}", len),
            $asmLateOut("={x0}", result),
            $asmClobber("memory")
        )
    }
    
    return result
}
```

### 9.2 Calling Conventions

```vex
// Windows x64 calling convention
#[cfg(target_os = "windows")]
extern "win64" fn ...

// System V AMD64 ABI (Linux, macOS, BSD)
#[cfg(not(target_os = "windows"))]
extern "sysv64" fn ...
```

---

## 10. WASM Restriction

Inline assembly is **not supported** on WebAssembly targets:

```vex
#[cfg(target_arch = "wasm32")]
fn fast_sqrt(x: f32): f32 {
    // ❌ Compile error: asm! not supported on wasm32
    // asm!("f32.sqrt", $asmOut("=r", result))
    
    // ✅ Use intrinsics instead
    return @sqrt(x)
}
```

---

## 11. Common Patterns

### 11.1 Atomic Operations

```vex
fn atomic_add(ptr: *i64!, val: i64): i64 {
    let! old: i64 = 0
    
    unsafe {
        asm!(
            "lock xadd [$0], $1",
            $asmIn("r", ptr),
            $asmInOut("+r", val)
        )
        old = val
    }
    
    return old
}
```

### 11.2 Memory Barriers

```vex
fn memory_fence() {
    unsafe {
        asm!(
            "mfence",
            $asmOpt("nomem", "nostack")
        )
    }
}

fn compiler_fence() {
    unsafe {
        asm!(
            "",
            $asmOpt("nomem", "nostack", "preserves_flags")
        )
    }
}
```

### 11.3 CPU Feature Detection

```vex
fn has_avx2(): bool {
    let! eax: u32 = 0
    let! ebx: u32 = 0
    let! ecx: u32 = 0
    let! edx: u32 = 0
    
    unsafe {
        asm!(
            "mov eax, 7",
            "xor ecx, ecx",
            "cpuid",
            $asmOut("={eax}", eax),
            $asmOut("={ebx}", ebx),
            $asmOut("={ecx}", ecx),
            $asmOut("={edx}", edx)
        )
    }
    
    return (ebx & (1 << 5)) != 0  // AVX2 bit
}
```

### 11.4 SIMD Operations

```vex
#[target_feature(enable = "sse2")]
unsafe fn simd_add_f32x4(a: *f32, b: *f32, out: *f32!) {
    asm!(
        "movups xmm0, [$0]",
        "movups xmm1, [$1]",
        "addps xmm0, xmm1",
        "movups [$2], xmm0",
        $asmIn("r", a),
        $asmIn("r", b),
        $asmIn("r", out),
        $asmClobber("xmm0", "xmm1")
    )
}
```

---

## 12. Error Messages

### 12.1 Borrow Errors

```
error[E0502]: cannot borrow `x` as mutable because it is also borrowed as immutable
  --> src/main.vex:10:5
   |
8  |         $asmIn("r", x),
   |                     - immutable borrow occurs here
9  |         $asmOut("=r", x),
   |                       ^ mutable borrow occurs here
```

### 12.2 Target Errors

```
error[E0777]: invalid register `r16` for x86_64 target
  --> src/main.vex:5:13
   |
5  |         $asmIn("{r16}", value),
   |                 ^^^^ x86_64 has registers r8-r15, not r16
   |
   = help: valid general-purpose registers: rax, rbx, rcx, rdx, rsi, rdi, rbp, r8-r15
```

### 12.3 Instruction Errors

```
error[E0778]: instruction `vmovaps` requires AVX feature
  --> src/main.vex:4:9
   |
4  |         "vmovaps ymm0, [{0}]"
   |         ^^^^^^^^^^^^^^^^^^^^^^
   |
   = note: target CPU does not support AVX
   = help: add #[target_feature(enable = "avx")] to the function
```

---

## 13. Best Practices

### 13.1 Prefer Intrinsics

```vex
// ❌ Avoid: Architecture-specific asm
unsafe {
    asm!("rdtsc", $asmOut("=r", result))
}

// ✅ Prefer: Portable intrinsics
let timestamp = @cpu_timestamp()
```

### 13.2 Wrap in Safe Functions

```vex
// Public safe API
pub fn rdtsc(): u64 {
    unsafe { rdtsc_impl() }
}

// Private unsafe implementation
unsafe fn rdtsc_impl(): u64 {
    let! result: u64 = 0
    
    #[cfg(target_arch = "x86_64")]
    asm!(
        "rdtsc",
        "shl rdx, 32",
        "or rax, rdx",
        $asmOut("={rax}", result),
        $asmOut("={rdx}", _)
    )
    
    return result
}
```

### 13.3 Document Safety Requirements

```vex
/// Performs an atomic compare-and-swap.
/// 
/// # Safety
/// - `ptr` must be valid and properly aligned
/// - `ptr` must not be accessed by other threads without synchronization
pub unsafe fn compare_and_swap(ptr: *i64!, old: i64, new: i64): i64 {
    let! result: i64 = 0
    
    asm!(
        "lock cmpxchg [$0], $2",
        $asmIn("r", ptr),
        $asmInOut("+{rax}", old),
        $asmIn("r", new)
    )
    result = old
    
    return result
}
```

---

## 14. Implementation Status

| Feature | Status |
|---------|--------|
| Basic `asm!` syntax | ✅ Implemented |
| Builtin operands (`$asmIn`, `$asmOut`, etc.) | ✅ Implemented |
| Borrow checker integration | ✅ Implemented |
| x86_64 support | ✅ Implemented |
| AArch64 support | ✅ Implemented |
| RISC-V support | 📋 Planned |
| Target validation | 🚧 In Progress |
| `$asmOpt` options | ✅ Implemented |
| `$asmClobber` clobbers | ✅ Implemented |

---

## 15. See Also

- [Raw Pointers and FFI](18_Raw_Pointers_and_FFI.md)
- [Intrinsics and Low-Level Operations](22_Intrinsics_and_Low_Level_Operations.md)
- [Memory Management](14_Memory_Management.md)
