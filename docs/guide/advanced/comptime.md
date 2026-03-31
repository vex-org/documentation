# Compile-Time Evaluation

Vex currently splits comptime features into two groups:

- `#name(...)` style compile-time functions and queries
- `$if`, `$elif`, `$else`, `$for`, `$while`, and `$const` compile-time control-flow forms

That distinction matters. Earlier docs blurred `#` and `$`; the current compiler does not.

## Prefix Model

Use this rule of thumb:

- Prefer `#...` for reflection, diagnostics, embedding, compile-time math, and bit helpers
- Use `$if`, `$for`, `$while`, and `$const` for compile-time branching and expansion
- Layout helpers accept both historical `$sizeof` and `#sizeof` style spellings, plus the same pattern for alignment

## Layout and Reflection

```vex
let size_a = #sizeof<i64>()
let size_b = $sizeof<i64>()

let align_a = #alignof<f64>()
let align_b = $alignof<f64>()

let ty_name = $typeName<Vec<i32>>()
let field_count = #fieldCount<User>()
let variant_count = #variantCount<Result<i32, string>>()
```

The compiler also supports field and variant reflection helpers such as:

- `#fieldNames<T>()`
- `#hasField<T>(name)`
- `#fieldType<T>(name)`
- `#fieldTag<T>(field, key)`
- `#hasFieldTag<T>(field, key)`
- `#fieldTags<T>(field)`
- `#variantNames<E>()`
- `#hasVariant<E>(name)`
- `#variantDiscriminant<E>(name)`
- `#variantHasPayload<E>(name)`
- `#variantPayload<E>(name)`

## `#typeInfo<T>()`

`#typeInfo<T>()` is the current structured reflection entry point.

```vex
struct User {
    id: i32 `json:"user_id" db:"primary_key"`,
    name: string `json:"username"`,
}

fn dump_user_fields(u: User) {
    $for f in #typeInfo<User>().fields {
        $println("field: ", f.name, " type: ", f.type_name)

        $for t in f.tags {
            $println("  tag ", t.key, " = ", t.value)
        }

        let value = #getField(u, f)
        $println("  value = ", value)
    }
}
```

Inside a `$for f in #typeInfo<T>().fields` loop, the current compiler also supports `#setField`:

```vex
fn rewrite_all_fields() {
    let! p = Point { x: 1, y: 2 }

    $for f in #typeInfo<Point>().fields {
        #setField(p, f, 99)
    }
}
```

## Compile-Time Control Flow

The parser and codegen currently support all of the following forms:

```vex
$if #fieldCount<User>() > 0 {
    #warning("User has fields")
} $elif #fieldCount<User>() == 0 {
    #warning("User is empty")
} $else {
    #compileError("unreachable comptime branch")
}

$for f in #typeInfo<User>().fields {
    $println(f.name)
}

$while condition {
    break
}

let value = $const {
    2 + 2
}
```

`$while` is part of the language surface today even though older docs barely mentioned it.

## Diagnostics and Embedding

```vex
#staticAssert(#fieldCount<User>() == 2, "User shape changed")
#warning("legacy path still compiled")
#debugExpr(5 + 3)

let home = #env("HOME")
let config = #includeStr("config.json")
let raw = #includeBytes("blob.bin")
let source = #stringify(User { id: 1, name: "A" })
let ident = #concatIdents(foo, bar)
```

The primary diagnostics and meta helpers currently documented by the compiler are:

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

## Compile-Time Math and Bit Operations

The current implementation accepts both canonical names and several compatibility aliases.

```vex
let pow = #constPow(2, 10)
let abs = #abs(-42)
let min = #min(3, 5)
let max = #max(3, 5)
let clamp = #clamp(15, 0, 10)
let sqrt = #constSqrt(144)
let gcd = #gcd(48, 18)
let lcm = #lcm(4, 6)

let log2 = #log2(256)
let next = #nextPowerOf2(5)
let pop = #bitCount(0b1010101)
let clz = #leadingZeros(16)
let ctz = #trailingZeros(16)
let swapped = #bswap(0x12345678)
```

Accepted aliases in the current compiler include:

- `#constAbs` for `#abs`
- `#constMin` for `#min`
- `#constMax` for `#max`
- `#constClamp` for `#clamp`
- `#constLog2` for `#log2`
- `#nextPow2` for `#nextPowerOf2`
- `#popcount` for `#bitCount`
- `#clz` for `#leadingZeros`
- `#ctz` for `#trailingZeros`
- `#reverseBytes` for `#bswap`

## Forcing Evaluation

```vex
let a = #eval(10 + 20)
let b = #constEval(50 + 50)
```

`#eval` evaluates a comptime-capable expression. `#constEval` is the strict form and produces an error when the expression cannot be folded at compile time.

## Defaults and Zeroed Values

```vex
let default_i32 = #default<i32>()
let zeroed_user = #zeroed<User>()
```

These helpers exist today and are useful in low-level or generated code, but they should still be used with the same care you would apply to raw initialization elsewhere in the language.

## Practical Guidance

1. Prefer `#typeInfo<T>()` when you need structured field iteration instead of parsing `#fieldNames<T>()` strings yourself.
2. Prefer `#staticAssert` over comment-based assumptions.
3. Treat compatibility aliases as compatibility aliases; document the primary spelling you actually want other code to use.
4. Keep `$for` and `$if` bodies simple. They are easiest to reason about when they expand straightforward source.

## Related

- [Builtins](/guide/advanced/builtins)
- [Policies](/guide/types/policies)
- [Generics](/guide/types/generics)
