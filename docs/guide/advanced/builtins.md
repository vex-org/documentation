# Builtins and Intrinsics

Vex provides a robust, always-available set of builtin and intrinsic helpers covering:

- Runtime I/O and debugging
- Panic and development traps
- Low-level memory access
- Timing helpers
- Compile-time reflection and diagnostics
- Autograd intrinsics

This page documents the stable builtins and their prefix conventions.

---

## Prefix Families

Builtin names fall into three distinct groups:

- `#...` for **Compile-Time** helpers (zero runtime cost).
- `$...` for **Runtime** helpers (has runtime execution cost).
- `@...` for **Autograd** helpers.

::: tip Design Principle: No Runtime Cost
All compile-time features are prefixed with `#` (e.g., `#sizeof`, `#alignof`, `#typeName`, `#if`, `#for`). The `$` prefix is reserved exclusively for runtime features that call compiler-internal runtime helper intrinsics (such as `$print`, `$println`, and `$now`), indicating they have a runtime execution cost.
:::

---

## Runtime I/O and Debugging

```vex
$print("partial line")
$println("done")
$eprint("warning: ")
$eprintln("bad state")

let rendered = $format("{0}:{1}", host, port)
let value = $dbg(rendered)
```

The runtime builtins include:

- `$print`
- `$println`
- `$eprint`
- `$eprintln`
- `$format`
- `$dbg` (prints expression and value, then returns it)

---

## Runtime Traps and Development Helpers

```vex
$panic("fatal error")
$todo("finish this branch")
$unreachable()
$assertEq(left, right)
```

- `$panic` aborts execution immediately.
- `$todo` marks unfinished runtime paths.
- `$unreachable` signals to the compiler that this code path is impossible.
- `$assertEq` is a runtime equality assertion with structured failure output.

---

## Memory and Low-Level Helpers

```vex
$drop(resource)

let value = $load(ptr)
$store(ptr_mut, value)

let slice = $ptrToSlice(raw_ptr, len)
```

- Prefer `Ptr<T>`, `Span<T>`, and `RawBuf` over raw pointer helpers.
- Treat `$load`, `$store`, and `$ptrToSlice` as unsafe building blocks.
- Use `$drop` only when early destruction is required.

---

## Timing

```vex
let start = $now()
work()
let end = $now()
```

Both `$monotonicNow()` and `$now()` resolve to the same high-resolution monotonic timing helper in the runtime.

---

## Layout, Shape, and Reflection

```vex
let size = #sizeof<i64>()
let align = #alignof<f64>()
let ty_name = #typeName<Vec<i32>>()

let len = $len(v)
let rank = $rank(tensor)
let shape = $shape(tensor)
```

Compile-time reflection helpers also include:

- `#typeInfo<T>()`
- `#getField(value, field)`
- `#setField(target, field, value)`
- `#fieldCount<T>()`
- `#variantCount<E>()`
- `#len<T>()` / `#length<T>()` (static length)
- `#rank<T>()` / `#ndim<T>()` (tensor dimensions)
- `#shape<T>()` (static shape tuple)
- `#tupleLen<T>()` / `#arrayLen<T>()` (tuple/array lengths)
- `#elementType<T>()` / `#implements<T, Contract>()` (element/contract query)
- `#isPowerOf2<T>(val)` / `#isPowerOfTwo<T>(val)` (checks if val is power of 2)
- `#offset_ptr_idx(base, index, stride)` (computes raw pointer offset)
- `#ptr_write(ptr, value)` (writes value directly to raw address)
- `#format(fmt, ...)` (compile-time formatting parsing helper)

### Compile-Time Type Predicates
- `#isStruct<T>()`, `#isEnum<T>()`, `#isPrimitive<T>()`
- `#isInteger<T>()`, `#isFloat<T>()`, `#isSigned<T>()`
- `#isPointer<T>()`, `#isArray<T>()`, `#isTuple<T>()`
- `#isCopy<T>()`, `#needsDrop<T>()`, `#isReference<T>()`
- `#isFunction<T>()`, `#isGeneric<T>()`, `#sameType<T, U>()`
- `#isTensor<T>()`, `#isDynTensor<T>()` — static/dynamic tensor types
- `#isMask<T>()`, `#isDynMask<T>()` — SIMD mask types
- `#isOption<T>()`, `#isResult<T>()` — stdlib type checks
- `#isSlice<T>()` — borrowed view type check

If you are doing compile-time code generation or reflection work, see [Comptime](/guide/advanced/comptime).

---

## Compile-Time Diagnostics and Embedding

```vex
#staticAssert(#fieldCount<User>() > 0, "User must stay non-empty")
#warning("legacy path compiled")

let home = #env("HOME")
let text = #includeStr("banner.txt")
let bytes = #includeBytes("blob.bin")
let expr = #debugExpr(5 + 3)
let joined = #concat("hello", " ", "vex")
let name = #concatIdents(foo, bar)
```

- `#staticAssert`
- `#compileError`
- `#compileWarning`
- `#warning`
- `#debugExpr`
- `#debugType`
- `#env`
- `#includeStr`
- `#includeBytes`
- `#concat`
- `#stringify`
- `#concatIdents`

---

## Target Introspection

```vex
#if #targetOs() == "macos" {
    // Darwin-specific path
} elif #targetArch() == "arm64" {
    // ARM-specific optimization
}
```

- `#targetOs()` → `"macos"`, `"linux"`, `"windows"`
- `#targetArch()` → `"arm64"`, `"x86_64"`, `"x86"`
- `#targetEndian()` → `"little"`, `"big"`
- `#targetPointerWidth()` → `64` or `32`

All resolved at compile-time with zero runtime cost.

---

## Source-Location Intrinsics

```vex
$println("At {}:{} in {}", #line(), #column(), #fileName());
```

- `#line()` → current line number (i64)
- `#column()` → current column number (i64)
- `#fileName()` / `#file()` → current file path (str)
- `#module()` → current module name (str)

Useful for debugging, logging, and `#staticAssert` error messages.

---

## Compile-Time Math

```vex
let abs_val = #abs(-5)
let pow_val = #constPow(2, 10)
let gcd_val = #gcd(48, 18)
```

- `#abs`, `#min`, `#max`, `#clamp` — basic math
- `#pow`, `#sqrt` — power and square root
- `#constAbs`, `#constMin`, `#constMax`, `#constClamp` — comptime-only variants
- `#constPow`, `#constSqrt`, `#constLog2`, `#constEval` — comptime power/log/eval
- `#gcd`, `#lcm`, `#constGcd`, `#constLcm` — number theory
- `#bitCount` / `#popcount` — population count
- `#leadingZeros` / `#clz`, `#trailingZeros` / `#ctz` — bit scan
- `#bswap` / `#reverseBytes` — byte swap
- `#isPowerOf2` / `#isPowerOfTwo`, `#nextPowerOf2` / `#nextPow2`, `#log2` — power-of-2 utilities
- `#typeof(x)` — returns the type name of an expression as a string
- `#typeBaseName<T>()` — base type name without generic parameters

---

## Autograd Builtins

Autograd uses `@...` as the primary syntax:

```vex
let x = @param(2.0)
let y = Math.sin(x)

$println(@val(y))
$println(@grad(y))
```

- `@param`
- `@val`
- `@grad`
- `@detach`

---

## Guidance

1. Prefer ordinary language constructs first and reach for builtins only when necessary.
2. Prefer `Ptr<T>`, `Span<T>`, and `RawBuf` over `$load`, `$store`, and `$ptrToSlice`.
3. Keep `$dbg` and `$todo` temporary.
4. Prefer `#...` spellings for all compile-time helpers.

## Related

- [Comptime](/guide/advanced/comptime)
- [Assembly](/guide/advanced/assembly)
- [Unsafe](/guide/advanced/unsafe)
