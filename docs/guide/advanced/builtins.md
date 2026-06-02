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
- `#warning`
- `#debugExpr`
- `#env`
- `#includeStr`
- `#includeBytes`
- `#concat`
- `#stringify`
- `#concatIdents`

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
