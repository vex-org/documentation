# Builtins and Intrinsics

Vex does not expose a tiny builtin surface anymore. The current compiler ships a broader always-available set of helpers covering:

- runtime I/O and debugging
- panic and development traps
- low-level memory access
- timing helpers
- compile-time reflection and diagnostics
- autograd intrinsics

Some builtins also keep compatibility aliases for older spellings. This page documents the current surface you can actually rely on.

## Prefix Families

In the current implementation, builtin names fall into three practical groups:

- `@...` for autograd helpers
- `$...` for runtime helpers plus a few long-lived layout and shape intrinsics
- `#...` for compile-time helpers

## Runtime I/O and Debugging

```vex
$print("partial line")
$println("done")
$eprint("warning: ")
$eprintln("bad state")

let rendered = $format("{0}:{1}", host, port)
let value = $dbg(rendered)
```

The current builtin surface includes:

- `$print`
- `$println`
- `$eprint`
- `$eprintln`
- `$format`
- `$dbg`

## Runtime Traps and Development Helpers

```vex
$panic("fatal error")
$todo("finish this branch")
$unreachable()
$assertEq(left, right)
```

Use these intentionally:

- `$panic` aborts execution
- `$todo` marks unfinished runtime paths
- `$unreachable` promises the path is impossible
- `$assertEq` is a runtime equality assertion with structured failure output

## Memory and Low-Level Helpers

```vex
$drop(resource)

let value = $load(ptr)
$store(ptr_mut, value)

let slice = $ptrToSlice(raw_ptr, len)
```

These helpers exist, but they are not the first choice for ordinary application code.

- Prefer `Ptr<T>`, `Span<T>`, and `RawBuf` over raw pointer helpers
- Treat `$load`, `$store`, and `$ptrToSlice` as unsafe building blocks
- Use `$drop` only when early destruction materially improves correctness or clarity

## Timing

```vex
let start = $monotonicNow()
work()
let end = $monotonicNow()
```

Both `$monotonicNow()` and `$now()` resolve to the same timing helper in the current compiler surface.

## Layout, Shape, and Reflection

The implementation currently supports a mixed surface here.

```vex
let size_a = #sizeof<i64>()
let size_b = $sizeof<i64>()

let align_a = #alignof<f64>()
let align_b = $alignof<f64>()

let ty_name = $typeName<Vec<i32>>()
let len = $len(v)
let rank = $rank(tensor)
let shape = $shape(tensor)
```

Current reflection helpers also include:

- `#typeInfo<T>()`
- `#getField(value, field)`
- `#setField(target, field, value)`
- `#fieldCount<T>()`
- `#variantCount<E>()`

If you are doing serious compile-time work, move from this page to [Comptime](/guide/advanced/comptime).

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

Useful helpers in this group:

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

## Autograd Builtins

Autograd uses `@...` as the primary syntax today:

```vex
let x = @param(2.0)
let y = Math.sin(x)

$println(@val(y))
$println(@grad(y))
```

Use these primary forms:

- `@param`
- `@val`
- `@grad`
- `@detach`

Legacy `$param` and related spellings still normalize in parts of the compiler, but they should not be the documented form.

## Guidance

1. Prefer ordinary language constructs first and reach for builtins only when they make intent sharper.
2. Prefer `Ptr<T>`, `Span<T>`, and `RawBuf` over `$load`, `$store`, and `$ptrToSlice` when the higher-level wrappers fit.
3. Keep `$dbg` and `$todo` temporary.
4. Prefer `#...` spellings for most compile-time helpers even if older aliases still parse.

## Related

- [Comptime](/guide/advanced/comptime)
- [Assembly](/guide/advanced/assembly)
- [Unsafe](/guide/advanced/unsafe)
