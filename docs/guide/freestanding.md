# Freestanding and No-Runtime Builds

Vex can compile without an implicit libc/CRT edge and can omit VexArch runtime
memory-management and scheduling hooks. Freestanding mode is selected by
`--no-runtime` or by `native.useSystemLibC: false` in the owning `vex.json`.
It is not a source-level `no_std`, `no_main`, or global-allocator directive.

```bash
vex compile --no-runtime --target x86_64-unknown-none kernel.vx
```

Target and linker support still determine whether the final artifact is truly
bare-metal. `--no-runtime` removes the normal Vex runtime edge; it does not
magically supply an entry point, linker script, platform services, allocator,
panic transport, or device I/O.

## What changes

No-runtime mode:

- does not link the normal VexArch memory/scheduler runtime;
- does not install the hosted `main` runtime setup path;
- disables runtime ownership strategies that require shared reference counting;
- makes runtime-only async/scheduler symbols unavailable;
- requires every referenced platform/allocator symbol to be supplied by the
  program, target support layer, or link inputs.

Language primitives, compile-time intrinsics, stack values, raw pointers, and
inline assembly remain available. Standard-library modules that depend on OS or
VexArch services are not freestanding merely because they type-check.

## Entry point

Export the symbol expected by the target ABI:

```vex
export "C" fn _start(): never {
    // Initialize hardware and platform state.
    loop {}
}
```

The exact name and signature are target-specific. UEFI, an ELF kernel, a
microcontroller image, and a hosted process do not share one universal entry
contract.

## Memory

Stack/static code needs no allocator:

```vex
let! buffer: [u8; 4096] = [0; 4096]
let! counter: u32 = 0
```

Heap-using code must supply the allocation ABI required by the generated
program. VexArch itself provides freestanding implementations of compiler-
required memory routines when building the runtime artifacts; an independent
no-runtime target must provide an equivalent target layer or avoid those paths.

Do not call host `malloc/free` merely to satisfy the linker. That turns a
supposedly freestanding artifact back into a hosted libc-dependent program.

## Panic and termination

Code that can panic needs a target-appropriate termination/reporting path. A
minimal bare target may halt:

```vex
fn halt(): never {
    loop {}
}
```

Production firmware or kernels usually provide architecture-specific panic
logging before halting. Do not assume stderr, process exit, unwinding, or a
filesystem exists.

## Hardware access

Memory-mapped I/O stays behind an unsafe boundary:

```vex
fn writeUart(base: usize, byte: u8) {
    let register = base as Ptr<u8!>
    unsafe { *register = byte }
}
```

Use `asm!` only when the target operation cannot be expressed through a
volatile/MMIO abstraction. Inline-assembly operands use the dedicated syntax
documented in [Assembly](/guide/advanced/assembly).

## Link validation

Extern providers remain explicit:

| Provider | Freestanding behavior |
|---|---|
| `LIBC` | A reachable call is rejected before linking |
| `SYSTEM from "library"` | Allowed when the target OS provides that ABI |
| `NATIVE from "feature"` | Allowed when the selected artifact is freestanding-compatible |
| `VEX` | Available only through the selected compiler/runtime configuration |

Freestanding does not mean “no system dylib or DLL.” An OS may define its stable
ABI through `libSystem`, `kernel32`, or another system library without making
the program libc-hosted. The forbidden behavior is a hidden, unavoidable
libc/CRT dependency.

WASM rejects dynamic native artifacts. Other targets may use dynamic `SYSTEM`
or `NATIVE` providers when the target supports them. Native-link diagnostics
identify known libc and TLS dependencies from the exact activated static
feature; unused manifest entries cannot affect the result. Treat these as
architecture errors to remove, not symbols to paper over with compatibility
stubs.

When using clang, freestanding linking passes `-nostdlib`. The Linux direct-LLD
path likewise omits automatic CRT objects, dynamic-loader selection, libc,
libm, and libgcc inputs. The program must supply its own entry and required
target support.

## Verification checklist

1. Compile with `--no-runtime` for the exact target triple.
2. Provide the correct entry symbol and linker script/format.
3. Inspect undefined symbols; no accidental libc, TLS, or Vex scheduler edge
   should remain.
4. Verify compiler-required memory operations are supplied by freestanding code.
5. Test the produced artifact on the real target or an accurate emulator.
6. Keep target-specific services beneath portable Vex ownership and container
   APIs.

## Related

- [Assembly](/guide/advanced/assembly)
- [FFI Deep Dive](/guide/ffi-deep-dive)
- [Memory Prelude](/guide/memory/mem-prelude)
- [Platform Support](/guide/platform-support)
- [Unsafe](/guide/advanced/unsafe)
