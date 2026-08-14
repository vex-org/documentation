# Builtins and Intrinsics

Vex intrinsic names expose two properties directly in source: **when** an
operation runs and **which subsystem** owns it. This is a language contract,
not a naming convention.

## Phase prefixes

| Prefix | Phase | Runtime cost | Examples |
| --- | --- | --- | --- |
| `#` | compile time | none | `#Type.sizeOf<T>()`, `#Target.os()` |
| `$` | runtime | possible | `$println(value)`, `$monotonicNow()` |
| `@` | compiler transform / autograd | generated program dependent | `@param(x)`, `@grad(y)` |

Compile-time intrinsics use an UpperCamel namespace and lowerCamel member,
with the sigil written once: `#Type.sizeOf`, `#Reflect.getField`,
`#Diag.compileError`. Runtime and autograd builtins use lowerCamel names.
Legacy flat, PascalCase, and snake_case spellings are not aliases.

::: warning Phase is semantic
An operation that emits a runtime load, store, allocation, clock read, or I/O
cannot become compile-time merely by receiving a `#` name. The prefix describes
the operation's real execution phase.
:::

## Access levels

Not every compiler primitive is a public language API.

| Access | Who may call it? | Purpose |
| --- | --- | --- |
| Public | normal Vex source | stable supported API |
| Prelude-only | embedded VexArch prelude | implements `Ptr<T>`, `Span<T>`, `RawBuf`, and ownership helpers |
| Compiler-only | compiler transforms | values or operations that source code cannot spell |
| Syntax-only | dedicated syntax | operands inside constructs such as `asm!` |

Raw load/store, pointer-offset, pointer-to-slice, and ownership primitives are
prelude-only. Application and library code should use the typed prelude APIs;
this keeps unsafe invariants in one audited layer and leaves the compiler free
to improve their lowering.

## Public runtime core

### I/O, formatting, and debugging

```vex
$print("partial line")
$println("done")
$eprint("warning: ")
$eprintln("bad state")

let rendered = $format("{0}:{1}", host, port)
let value = $dbg(rendered)
```

`$format` is a runtime operation. The compiler may pre-parse a constant format
string, but producing a result from runtime arguments still has runtime
semantics.

### Control and assertions

```vex
$assert(index < length)
$assertEq(actual, expected)
$panic("fatal error")
$todo("finish this branch")
$unreachable()
```

`$panic`, `$todo`, and `$unreachable` return `never`. Use `$unreachable` only
when reaching the path would be a program bug; a false claim can invalidate
optimizer assumptions.

### Timing

```vex
let start = $monotonicNow()
work()
let elapsed = $monotonicNow() - start
```

`$monotonicNow()` is the canonical high-resolution monotonic clock builtin.
Wall-clock/calendar time belongs to the standard library, not this intrinsic.

### Runtime shape, math, and bit operations

Runtime-dependent values use the `$` family:

- shape: `$len`, `$rank`, `$shape`
- math: `$pow`, `$abs`, `$min`, `$max`, `$clamp`, `$log2`, `$sqrt`
- transcendental: `$cos`, `$sin`, `$tanh`, `$exp`, `$exp2`, `$log`
- bits: `$bitCount`, `$leadingZeros`, `$trailingZeros`,
  `$isPowerOfTwo`, `$nextPowerOfTwo`, `$byteSwap`

Use the equivalent `#Math` or `#Bit` operation only when the input is required
to be evaluated at compile time.

## Public compile-time namespaces

| Namespace | Responsibility | Examples |
| --- | --- | --- |
| `#Type` | layout, integer domains, type identity, predicates | `sizeOf`, `minValue`, `maxValue`, `info`, `isCopy` |
| `#Reflect` | field and variant reflection | `getField`, `setField`, `hasVariant` |
| `#Value` | default and zeroed values | `default`, `zeroed` |
| `#Text` | compile-time text/source conversion | `concat`, `stringify`, `concatIdents` |
| `#Build` | build environment | `env` |
| `#Target` | target triple properties | `os`, `arch`, `endian`, `pointerWidth` |
| `#Source` | current source location | `line`, `column`, `fileName`, `module` |
| `#Embed` | compile-time file embedding | `string`, `bytes` |
| `#Diag` | compile-time diagnostics | `staticAssert`, `compileError`, `compileWarning` |
| `#Const` | forced constant evaluation | `eval` |
| `#Math` | compile-time arithmetic | `pow`, `abs`, `gcd`, `sqrt` |
| `#Bit` | compile-time bit operations | `count`, `isPowerOfTwo`, `byteSwap` |
| `#DeclSet` | invocation-authorized declarations | `empty`, `addFunction`, `addStruct`, `addContractImpl` |
| `#DeclExpr` | typed generated expression plans | `value`, `param`, `call`, `matchPattern` |
| `#DeclPattern` | typed generated pattern plans | `value`, `tuple`, `variant`, `anyOf` |
| `#DeclConstraint` | exact generated requirements | `contract` |

```vex
let bytes = #Type.sizeOf<Header>()
let largest = #Type.maxValue<usize>()
let target = #Target.os()
let mask = #Bit.nextPowerOfTwo(17)

#Diag.staticAssert(
    #Type.fieldCount<Header>() > 0,
    "Header must not be empty"
)
```

See [Compile-Time Evaluation](/guide/advanced/comptime) for the complete
namespace reference and structured reflection examples.

The declaration namespaces are public only inside an authorized module
generator invocation. See
[Structural Declaration Generation](/guide/advanced/comptime-declarations).

## Memory and explicit destruction

The public low-level boundary is method based:

```vex
let! p = Ptr.allocWith<i32>(42)
let value = unsafe { p.read() }
unsafe { p.free() }

Mem.drop(ownedValue)
```

- Prefer references and owned containers for ordinary code.
- Use `Span<T>` for bounds-aware non-owning views.
- Use `Ptr<T>` for typed raw handles.
- Use `RawBuf` for byte-oriented layouts.
- Use `Mem.drop(value)` only for intentional early destruction; normal RAII
  destruction remains automatic.

The compiler-owned primitives beneath these APIs are intentionally unavailable
to normal developer code.

## Autograd transforms

```vex
let x = @param(2.0)
let y = Math.sin(x)

$println(@val(y))
$println(@grad(y))
let constant = @detach(y)
```

The public autograd transform family is `@param`, `@val`, `@grad`, and
`@detach`.

## Guidance

1. Choose ordinary language or prelude APIs before reaching for an intrinsic.
2. Treat the prefix as a phase guarantee, not decoration.
3. Do not depend on legacy spellings; there are no compatibility aliases.
4. Keep raw memory access behind `Ptr<T>`, `Span<T>`, `RawBuf`, or `Mem`.
5. Remove `$dbg` and `$todo` from production paths.

## Related

- [Compile-Time Evaluation](/guide/advanced/comptime)
- [Structural Declaration Generation](/guide/advanced/comptime-declarations)
- [Pointers and Low-Level Memory](/guide/advanced/pointers)
- [Memory Prelude](/guide/memory/mem-prelude)
- [Assembly](/guide/advanced/assembly)
- [Unsafe](/guide/advanced/unsafe)
