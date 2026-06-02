# Compile-Time Evaluation

Vex splits compile-time features into two groups:

- `#name(...)` style compile-time functions, intrinsic helpers, and queries.
- `#if`, `#elif`, `#else`, `#for`, `#while`, and `#const` compile-time control-flow and evaluation blocks.

::: tip Design Principle: No Runtime Cost
Vex uses the `#` prefix for all compile-time expressions and control flow. The `$` prefix is reserved exclusively for runtime features that call compiler-internal runtime helper intrinsics (such as `$print` and `$println`), indicating they have a runtime execution cost.
:::

## Layout and Reflection

```vex
let size_a = #sizeof<i64>()
let align_a = #alignof<f64>()
let ty_name = #typeName<Vec<i32>>()
let field_count = #fieldCount<User>()
let variant_count = #variantCount<Result<i32, string>>()

let array_len = #arrayLen<[f32; 16]>()
let implements_copy = #implements<User, Copy>()
```

The compiler supports additional compile-time type and layout reflection helpers:

- `#len<T>()` / `#length<T>()` — Length of static arrays, tuples, etc.
- `#rank<T>()` / `#ndim<T>()` — Number of dimensions of a static tensor/array.
- `#shape<T>()` — Shape of a static tensor/array as a compile-time tuple.
- `#tupleLen<T>()` — Length of a tuple type.
- `#arrayLen<T>()` — Length of an array type.
- `#elementType<T>()` — Element type of static arrays, spans, or vectors.
- `#implements<T, Contract>()` — Compile-time check if `T` implements a contract.
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

## Compile-Time Type Predicates

Type predicates allow checking characteristics of types at compile time (e.g., inside `#if` statements):

```vex
#if #isStruct<T>() {
    // T is a struct type
}
#if #needsDrop<T>() {
    // T has drop semantics and owns resources
}
#if #sameType<T, U>() {
    // T and U are the same type
}
```

The full list of compile-time type predicates:

* **`#isStruct<T>()`**: Returns `true` if `T` is a struct or named user type.
* **`#isEnum<T>()`**: Returns `true` if `T` is an enum type.
* **`#isPrimitive<T>()`**: Returns `true` if `T` is a primitive type (scalar, boolean, char).
* **`#isInteger<T>()`**: Returns `true` if `T` is an integer type.
* **`#isFloat<T>()`**: Returns `true` if `T` is a floating-point type.
* **`#isSigned<T>()`**: Returns `true` if `T` is a signed numeric type.
* **`#isPointer<T>()`**: Returns `true` if `T` is a raw pointer type (`*U` or `ptr`).
* **`#isArray<T>()`**: Returns `true` if `T` is a compile-time sized array.
* **`#isTuple<T>()`**: Returns `true` if `T` is a tuple.
* **`#isCopy<T>()`**: Returns `true` if `T` implements the `$Copy` contract (trivially copyable).
* **`#needsDrop<T>()`**: Returns `true` if `T` has custom drop logic or contains fields requiring drop.
* **`#isReference<T>()`**: Returns `true` if `T` is a borrowed reference type (`&U`).
* **`#isFunction<T>()`**: Returns `true` if `T` is a function pointer or function signature type.
* **`#isGeneric<T>()`**: Returns `true` if `T` is unresolved or generic.
* **`#sameType<T, U>()`**: Returns `true` if type `T` and type `U` are identical.

## `#typeInfo<T>()`

`#typeInfo<T>()` is the structured reflection entry point.

```vex
struct User {
    id: i32 `json:"user_id" db:"primary_key"`,
    name: string `json:"username"`,
}

fn dump_user_fields(u: User) {
    #for f in #typeInfo<User>().fields {
        $println("field: ", f.name, " type: ", f.type_name)

        #for t in f.tags {
            $println("  tag ", t.key, " = ", t.value)
        }

        let value = #getField(u, f)
        $println("  value = ", value)
    }
}
```

Inside a `#for f in #typeInfo<Point>().fields` loop, the compiler also supports `#setField`:

```vex
fn rewrite_all_fields() {
    let! p = Point { x: 1, y: 2 }

    #for f in #typeInfo<Point>().fields {
        #setField(p, f, 99)
    }
}
```

## Compile-Time Control Flow

The parser and codegen support the following compile-time blocks:

```vex
#if #fieldCount<User>() > 0 {
    #warning("User has fields")
} #elif #fieldCount<User>() == 0 {
    #warning("User is empty")
} #else {
    #compileError("unreachable comptime branch")
}

#for f in #typeInfo<User>().fields {
    $println(f.name)
}

#while condition {
    break
}

let value = #const {
    2 + 2
}
```

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

The primary diagnostics and meta helpers documented by the compiler are:

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
let is_pow2 = #isPowerOf2(64)
```

Accepted aliases in the compiler include:

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
- `#isPowerOfTwo` for `#isPowerOf2`

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

## Practical Guidance

1. Prefer `#typeInfo<T>()` when you need structured field iteration instead of parsing `#fieldNames<T>()` strings yourself.
2. Prefer `#staticAssert` over comment-based assumptions.
3. Treat compatibility aliases as compatibility aliases; document the primary spelling you actually want other code to use.
4. Keep `#for` and `#if` bodies simple. They are easiest to reason about when they expand straightforward source.

## Related

- [Builtins](/guide/advanced/builtins)
- [Policies](/guide/types/policies)
- [Generics](/guide/types/generics)
