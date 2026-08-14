# Compiler Directives

Vex compiler directives are source constructs evaluated during parsing,
semantic analysis, or compile-time expansion. The stable surface consists of
compile-time control flow, namespaced compile-time intrinsics, `export`, and
`extern` declarations.

::: warning About attribute-style examples
Rust-style optimizer attributes such as `#[inline]`, `#[cold]`, and
`#[target_feature]` are not part of Vex's stable source API. Vex computes
inlining and target lowering from semantic analysis and the selected target.
Do not use those spellings in portable Vex code.
:::

## Compile-time conditional expansion

Use `#if`, `#elif`, and `#else` with a compile-time expression. Branches use
normal braces; there is no `#endif` terminator.

```vex
#if #Target.os() == "macos" {
    fn platformName(): str { "Darwin" }
} #elif #Target.os() == "linux" {
    fn platformName(): str { "Linux" }
} #elif #Target.os() == "windows" {
    fn platformName(): str { "Windows" }
} #else {
    #Diag.compileError("unsupported operating system")
}
```

Target queries are compile-time values:

| Query | Typical results |
| --- | --- |
| `#Target.os()` | `"macos"`, `"linux"`, `"windows"` |
| `#Target.arch()` | `"aarch64"`, `"x86_64"` |
| `#Target.endian()` | `"little"`, `"big"` |
| `#Target.pointerWidth()` | `64`, `32` |

Use these queries instead of unbound names such as `target_os` or
`target_arch`.

## Compile-time iteration and evaluation

```vex
#for field in #Type.info<Packet>().fields {
    $println(field.name)
}

let headerSize = #const {
    #Type.sizeOf<PacketHeader>()
}

let folded = #Const.eval(6 * 7)
```

`#for` expands its body from compile-time-known metadata. `#const` evaluates a
block at compile time. `#Const.eval` requires an expression that the compiler
can fold and produces no runtime call.

These are strict boundaries: an unknown value is a compile error. Runtime
effects inside a branch selected by `#if` or a body expanded by `#for` remain
ordinary runtime HIR; selecting the body does not execute its I/O or allocation
during compilation.

A top-level, parameterless, non-generic `const fn` returning `DeclSet` is a
structural module generator. See
[Structural Declaration Generation](/guide/advanced/comptime-declarations)
for the typed builder surface and invocation rules.

## Diagnostics

```vex
#Diag.staticAssert(
    #Type.sizeOf<PacketHeader>() == 16,
    "PacketHeader ABI changed"
)

#if #Target.pointerWidth() != 64 {
    #Diag.compileError("this implementation requires a 64-bit target")
}

#Diag.compileWarning("experimental implementation selected")
```

- `#Diag.staticAssert(condition, message)` checks a compile-time invariant.
- `#Diag.compileError(message)` stops compilation.
- `#Diag.compileWarning(message)` emits a compiler and LSP diagnostic.
- `#Diag.debugExpr(expression)` and `#Diag.debugType<T>()` assist metaprogram
  development.

## Layout, embedding, and source location

```vex
let size = #Type.sizeOf<Packet>()
let alignment = #Type.alignOf<Packet>()
let payloadOffset = #Type.offsetOf<Packet>("payload")

let schema = #Embed.string("schema.json")
let table = #Embed.bytes("lookup.bin")

$eprintln(
    "{}:{}",
    #Source.fileName(),
    #Source.line()
)
```

Embedding reads the file during compilation and makes it an input to the
binary. It performs no runtime file I/O. `#Source` reports the expansion's
source location.

## Exported and foreign symbols

Use `export` for declarations that must be visible outside their module and an
`extern` ABI at a foreign boundary:

```vex
export "C" fn vexAdd(a: i32, b: i32): i32 {
    return a + b
}

extern "NATIVE" from "host_api" {
    fn hostWrite(data: Ptr<u8>, length: usize): i32;
}
```

Keep ABI declarations at a narrow wrapper boundary. Convert raw pointers to
typed Vex abstractions inside the wrapper, and keep ownership rules explicit.
See [FFI](/guide/ffi) for ABI and native-module details.

## Best practices

1. Use canonical namespaced intrinsics; legacy flat aliases are unsupported.
2. Encode ABI and layout assumptions with `#Diag.staticAssert`.
3. Keep `#if` conditions target- or type-derived and compile-time evaluable.
4. Let the optimizer choose inlining unless Vex exposes a documented stable
   directive for the use case.
5. Treat embedded files and build environment values as build-cache inputs.

## Related

- [Compile-Time Evaluation](/guide/advanced/comptime)
- [Structural Declaration Generation](/guide/advanced/comptime-declarations)
- [Builtins and Intrinsics](/guide/advanced/builtins)
- [FFI](/guide/ffi)
- [Platform Support](/guide/platform-support)
