# Foreign Function Interface (FFI)

Vex makes the owner of every imported symbol explicit. Import declarations use one of four providers; the old all-in-one `extern "C"` import syntax is not supported.

| Provider | Use it for |
|---|---|
| `LIBC` | The target C runtime |
| `SYSTEM from "library"` | An operating-system library or framework |
| `NATIVE from "feature"` | A package-owned native artifact selected by `vex.json` |
| `VEX` | The private compiler/runtime ABI |

An extern declaration has no link or deployment cost by itself. Vex activates its provider only when reachable code calls the function or takes its address.

## Boundary modules

Put user-package extern declarations in a `.vxc` boundary module, then expose a safe `.vx` wrapper:

```vex
// native.vxc
extern "LIBC" {
    fn strlen(value: Ptr<u8>): usize;
}

export fn byteLength(value: Ptr<u8>): usize {
    return unsafe { strlen(value) };
}
```

```vex
// text.vx
import { byteLength } from "./native.vxc";
```

Extern blocks in ordinary user `.vx` files are rejected. Compiler-owned prelude, standard-library, and runtime modules have a private exception for their internal boundaries.

## Calling libc

Use `LIBC` only for symbols owned by the target C runtime:

```vex
extern "LIBC" {
    fn memcpy(destination: Ptr<Opaque!>, source: Ptr<Opaque>, size: usize): Ptr<Opaque!>;
    fn free(memory: Ptr<Opaque>);
}
```

`LIBC` does not accept a `from` clause. A reachable libc call is rejected in a freestanding build; an unused declaration does not create a libc dependency.

## Calling operating-system libraries

Use `SYSTEM` for an OS-owned dylib, DLL, or framework:

```vex
// native.windows.vxc
extern "SYSTEM" from "kernel32" {
    fn GetLastError(): u32;
}
```

```vex
// native.macos.vxc
extern "SYSTEM" from "framework:Metal" {
    fn MTLCreateSystemDefaultDevice(): Ptr<Opaque>;
}
```

The library name is required. Duplicate requests are deduplicated in a deterministic link plan.

## Calling package-native code

Use `NATIVE` for a package feature whose artifact differs by target:

```vex
extern "NATIVE" from "codec" {
    fn codec_decode(input: Ptr<u8>, length: usize): i32;
}
```

The nearest owning `vex.json` selects static, dynamic, or bitcode artifacts:

```json
{
  "name": "image-codec",
  "version": "0.1.0",
  "native": {
    "features": {
      "codec": {
        "linux.x86_64": {
          "path": "native/libcodec.a",
          "type": "static"
        },
        "macos.arm64": {
          "path": "native/libcodec.dylib",
          "type": "dynamic"
        },
        "windows-x86_64": {
          "path": "native/codec.dll",
          "type": "dynamic",
          "importLib": "native/codec.lib"
        }
      }
    }
  }
}
```

Only a feature reached by codegen is resolved, staged, and linked.

## The private Vex runtime provider

`extern "VEX"` is reserved for compiler-owned prelude, standard-library, and VexArch modules. Application code uses the public prelude API instead of calling raw `vex_*` symbols.

`VEX` is not an implicit runtime injection. With `--no-runtime`, an activated
symbol must be implemented locally by VexArch; otherwise compilation stops with
`E0FFI36` before the linker is invoked.

## Exporting Vex to C

Import providers and exports are separate concepts. `export "C" fn` remains the stable spelling for an unmangled C-ABI definition:

```vex
export "C" fn pluginInit(api: Ptr<Opaque>): i32 {
    return 0;
}
```

```c
extern int32_t pluginInit(void *api);
```

## Pointer and scalar mapping

| Vex | Typical C mapping |
|---|---|
| `i32`, `u32` | `int32_t`, `uint32_t` |
| `i64`, `u64` | `int64_t`, `uint64_t` |
| `usize` | `size_t` |
| `Ptr<Opaque>` | `void *` |
| `Ptr<T>` | borrowed/read-only `const T *` contract |
| `Ptr<T!>` | writable-pointee `T *` contract |

Always match the target ABI exactly. C `long`, `wchar_t`, handles, and structure layout vary by platform.

## Unsafe calls and safe wrappers

Foreign code is outside Vex's safety guarantees:

```vex
let result = unsafe { codec_decode(dataPtr, dataLength) };
```

A public wrapper should validate nullability, lengths, ownership, thread rules, and errors before translating the result into normal Vex types.

## Target-aware bindings

Both `.vx` and `.vxc` imports support target suffixes. Resolution prefers the most specific available file:

```text
native.<os>.<arch>.vxc
native.<os>.vxc
native.<arch>.vxc
native.vxc
```

Use file routing to select the OS/architecture binding or API implementation and manifest routing to select the exact target binary artifact. Source routing does not guess an ABI environment such as `gnu`, `musl`, or `msvc`.

## Removed import spellings

These legacy forms are errors:

```vex
extern "C" { ... }
extern "static" from "foo" { ... }
extern "dylib" from "foo" { ... }
```

Choose the symbol owner instead: `LIBC`, `SYSTEM`, `VEX`, or `NATIVE`.

## Related

- [FFI Deep Dive](/guide/ffi-deep-dive)
- [Freestanding](/guide/freestanding)
- [Platform Support](/guide/platform-support)
- [vex-pm Native FFI](/references/vex-pm-native-ffi)
