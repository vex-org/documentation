# Compile-Time Evaluation

Vex comptime is ordinary typed Vex evaluated before native or SIR codegen. It
is not a token-macro language, a second interpreter-facing dialect, or a
runtime fallback mechanism. The compiler evaluates the same HIR used by user
code, the standard library, and VexArch, then keeps any runtime-dependent work
as ordinary typed HIR.

The accepted V2 surface described on this page is verified. Vex is still
pre-1.0, so pin the compiler version when publishing metaprogramming APIs.

## V2 feature and limit table

This table is the frozen user-facing V2 contract. “Accepted” means the feature
uses canonical typed HIR semantics and fails closed outside its supported
domain; it does not promote experimental CLI rollout modes to defaults.

| Area | V2 status | Contract |
| --- | --- | --- |
| Required boundaries | Accepted | `#const`, required intrinsics, `#if`, `#for`, and `#while` must resolve at compile time or diagnose. |
| Ordinary `const fn` CTFE | Accepted | User, std, prelude, and VexArch calls use the same typed callable/effect model. |
| Typed residualization | Accepted | Runtime-dependent work remains ordinary typed HIR and uses normal Valence/VUMM/fusion. |
| Type/target/source reflection | Accepted | Results retain exact semantic identity, requested-target facts, and source provenance. |
| Scalars and aggregates | Accepted subset | Scalars, text, bytes, arrays, tuples, structs, enums, references, sequences, and insertion-ordered maps are quota-bounded. |
| Structural declarations | Accepted subset | Typed functions, methods, structs, enums, constants, aliases, conformances, constraints, and patterns enter the sealed HIR snapshot without generated source or bitcode. |
| Persistent CTFE cache | Accepted subset | Only the closed semantic wire subset is stored; target/source/compiler drift or malformed data is a cache miss. Host addresses and session-local IDs cannot persist. |
| Opportunistic staging | Controlled rollout | `analyze` observes; explicit `apply-known` commits only verified known islands. Automatic/default application is outside V2. |
| Cyclic values and custom map policy | Outside V2 | No cyclic persistent graph or arbitrary user-defined compile-time map policy. |
| Constraint boolean algebra | Outside V2 | Arbitrary `AND`/`OR`/`NOT` composition is not accepted. |
| Unknown aggregate slots | Outside V2 | Residual aggregate value graphs with unknown interior slots remain runtime HIR. |
| Scalable/GPU/foreign vector ABI | Outside V2 | Only explicitly proven target layouts are generated. |
| Token/source/procedural macros | Outside V2 | V2 does not expose token streams, source templates, or Rust-style procedural macros. |

## The three ways code becomes compile time

| Form | Meaning | If the result is not known |
| --- | --- | --- |
| `#Namespace.operation(...)` | Required compile-time intrinsic | Compilation fails |
| `#const { ... }` | Required compile-time block | Compilation fails |
| `const fn` called from a compile-time context | Ordinary Vex function eligible for CTFE | Compilation fails at a required boundary |

```vex
const fn addOne(value: i32): i32 {
    return value + 1
}

let answer = #const {
    addOne(41)
}

#Diag.staticAssert(answer == 42, "constant evaluation failed")
```

Public intrinsic names use an UpperCamel namespace with a lowerCamel member,
such as `#Type.sizeOf` and `#Diag.staticAssert`. The `#` prefix is a semantic
phase requirement, not decoration: a required-comptime expression cannot
silently turn into a runtime call.

## Strict boundaries and residual runtime code

Vex distinguishes a required compile-time result from a body selected or
expanded at compile time.

```vex
#if #Target.os() == "macos" {
    // The branch is chosen at compile time.
    // This call remains an ordinary runtime effect.
    $println("running on Darwin")
}
```

The condition of `#if` must be known. The selected body may still contain
runtime values, allocations, calls, I/O, and ownership operations. Those
operations remain typed residual HIR and enter the normal Valence, VUMM,
fusion, and backend pipeline.

By contrast, runtime-dependent data cannot cross a strict boundary:

```vex
fn invalid(value: i32): i32 {
    // Compile error: value is not known at this required-comptime boundary.
    return #Const.eval(value + 1)
}
```

There is no hidden "try CTFE, then execute at runtime" behavior for `#const`,
`#Const.eval`, `#if` conditions, reflection requests, or compile-time
intrinsics. A result is either known, valid residual HIR where the surrounding
construct permits it, or a diagnostic.

## Partial evaluation of ordinary Vex

The staging pass can fold known scalar and call islands while preserving their
runtime-dependent parents.

```vex
const fn headerBytes(): usize {
    return #Type.sizeOf<Header>()
}

fn totalBytes(payloadBytes: usize): usize {
    // headerBytes() is known; payloadBytes remains runtime data.
    return headerBytes() + payloadBytes
}
```

Primitive binary, unary, cast, and exact call islands can be folded. Calls with
runtime effects remain runtime calls. Overloaded operators are not folded as
primitive scalar islands merely because their operands look constant; their
exact callable semantics must be supported by canonical CTFE first.

Package origin does not grant special powers. User functions, standard-library
functions, and VexArch functions are classified by the same effect and target
rules.

## Compile-time control flow

```vex
#if #Type.fieldCount<User>() > 0 {
    #Diag.compileWarning("User has fields")
} #elif #Type.fieldCount<User>() == 0 {
    #Diag.compileWarning("User is empty")
} #else {
    #Diag.compileError("unreachable compile-time branch")
}

#for field in #Type.info<User>().fields {
    $println(field.name)
}

let four = #const {
    2 + 2
}
```

`#if`, `#elif`, `#else`, `#for`, and `#while` make their control decision at
compile time. Conditions and iteration sources must be compile-time evaluable.
Evaluation is quota-bounded; an unbounded compile-time loop is a compiler
diagnostic, not an infinite build.

## Exact type and target reflection

```vex
let size = #Type.sizeOf<i64>()
let alignment = #Type.alignOf<f64>()
let fieldOffset = #Type.offsetOf<Point>("y")
let smallest = #Type.minValue<i32>()
let largestIndex = #Type.maxValue<usize>()
let name = #Type.name<Vec<i32>>()
let baseName = #Type.baseName<Vec<i32>>()
let expressionType = #Type.of(value)
```

| Intrinsic | Result |
| --- | --- |
| `#Type.sizeOf<T>()` | target size of `T` in bytes |
| `#Type.alignOf<T>()` | target alignment of `T` |
| `#Type.offsetOf<T>(field)` | target byte offset of a named field |
| `#Type.minValue<T>()` | minimum value of integer `T` |
| `#Type.maxValue<T>()` | maximum value of integer `T` |
| `#Type.of(value)` | exact type of an expression |
| `#Type.name<T>()` | fully qualified display name |
| `#Type.baseName<T>()` | display name without generic arguments |
| `#Type.info<T>()` | structured typed metadata |
| `#Type.contractInfo<C>()` | structured contract metadata |
| `#Type.fieldCount<T>()` | number of fields |
| `#Type.tupleLen<T>()` | number of tuple elements |
| `#Type.tupleFields<T>()` | structured tuple-field metadata |
| `#Type.arrayLen<T>()` | fixed array length |
| `#Type.elementType<T>()` | element type of a supported aggregate |
| `#Type.variantCount<T>()` | number of enum variants |
| `#Type.implements<T, C>()` | whether `T` implements contract `C` |

`minValue` and `maxValue` preserve the exact integer type, including `i128`
and `u128`. `isize`, `usize`, layout, and offsets use the selected target—not
the compiler host. If semantic target facts and backend target facts disagree,
compilation fails closed.

Type predicates include:

- representation: `isStruct`, `isEnum`, `isPrimitive`, `isInteger`, `isFloat`,
  `isSigned`, `isPointer`, `isArray`, `isTuple`, `isReference`, `isSlice`;
- ownership: `isCopy`, `needsDrop`, `hasDefault`;
- standard shapes: `isOption`, `isResult`, `isFunction`, `isGeneric`;
- compute types: `isTensor`, `isDynTensor`, `isMask`, `isDynMask`;
- identity: `same`.

Names such as `typeName` are presentation data. Use typed metadata handles and
`#Type.same` for semantic decisions instead of comparing display strings.

## Structured reflection

`#Type.info<T>()` keeps field, variant, method, contract, visibility, generic,
and ownership metadata attached to compiler identities.

```vex
struct User {
    id: i32 `json:"user_id" db:"primary_key"`,
    name: string `json:"username"`,
}

fn dumpUserFields(user: User) {
    #for field in #Type.info<User>().fields {
        $println("field: ", field.name, " type: ", field.typeName)

        #for tag in field.tags {
            $println("  ", tag.key, " = ", tag.value)
        }

        let value = #Reflect.getField(user, field)
        $println("  value = ", value)
    }
}
```

Direct reflection operations include:

- fields: `fieldType`, `fieldTag`, `hasField`, `hasFieldTag`;
- variants: `variantDiscriminant`, `variantPayload`, `variantHasPayload`,
  `hasVariant`;
- values: `getField`, `setField`.

`#Reflect.setField` requires a mutable target. Reflected access uses the exact
field identity; it is not a runtime hash-map lookup.

## Values, collections, and memory

Canonical CTFE supports exact scalar values, text, sequences, insertion-ordered
maps, tuples, structs, enums, references, and supported ordinary `Vec`/`Map`
operations. Const functions can call ordinary user, std, and VexArch code when
its effects are valid in the current compile-time context.

Compile-time storage is compiler-owned and quota-bounded. Its addresses never
escape into the program. When a supported compile-time collection must become
a runtime value, the compiler emits an ordinary typed construction recipe; the
result then uses the same VUMM/Valence ownership and allocation hierarchy as
handwritten runtime code. Comptime does not introduce a second runtime memory
model.

`#Value.zeroed<T>()` is a low-level operation. Use it only when the all-zero bit
pattern is valid for `T`; prefer `#Value.default<T>()` for semantic defaults.

## Text, environment, embedding, and diagnostics

```vex
let joined = #Text.concat("hello", " ", "vex")
let source = #Text.stringify(User { id: 1, name: "A" })
let ident = #Text.concatIdents(http, Client)

let profile = #Build.env("VEX_PROFILE")
let config = #Embed.string("config.json")
let bytes = #Embed.bytes("blob.bin")

#Diag.staticAssert(
    #Type.fieldCount<User>() == 2,
    "User layout changed"
)
```

`#Build.env` and `#Embed` are tracked build inputs. `#Source` reports the
original source/expansion provenance through `line`, `column`, `fileName`, and
`module`. Diagnostics preserve the CTFE call stack and expansion ancestry.

Persistent CTFE entries include compiler/language versions, target facts,
tracked source/environment inputs, and semantic dependencies. Malformed,
oversized, stale, or target-incompatible entries are cache misses; they do not
weaken semantic checks.

## Arithmetic and bit operations

```vex
let folded = #Const.eval(10 + 20)
let power = #Math.pow(2, 10)
let divisor = #Math.gcd(48, 18)
let population = #Bit.count(0b1010101)
let swapped = #Bit.byteSwap(0x12345678)
```

Use runtime operations such as `$pow` and `$bitCount` for runtime-dependent
data. The same target-identity rule applies to backend-selected ordinary
operations: for example, runtime `Bit.pdep`/`Bit.pext` use BMI2 only on an
`x86_64` target with `+bmi2`; supported generic targets use the portable
implementation.

## Structural declaration generation

An eager, top-level, parameterless `const fn` returning `DeclSet` can generate
typed declarations for its module. `DeclSet`, `DeclExpr`, `DeclPattern`, and
`DeclConstraint` build semantic HIR directly—never source strings, tokens,
synthetic AST, or a generated bitcode module.

Generated declarations receive stable identity and provenance, pass ordinary
inference/ownership validation, and enter the same monomorphization, fusion,
VUMM, ABI, and native codegen pipeline as source declarations.

See [Structural Declaration Generation](/guide/advanced/comptime-declarations)
for the trigger, builders, constraints, patterns, and safety rules.

## Current controlled limits

The following are deliberately outside the accepted V2 contract:

- cyclic compile-time values and arbitrary user-defined map policies;
- arbitrary boolean algebra over declaration constraints;
- unknown-slot aggregate value graphs during residualization;
- automatic production-wide application of opportunistic known-value rewrites;
- scalable/GPU/foreign vector ABI generation beyond explicitly supported
  target layouts;
- token streams, source-template macros, and Rust-style procedural macros.

Unsupported cases fail closed or remain ordinary runtime HIR. They are not
approximated with string matching or hidden runtime fallback.

## Practical guidance

1. Use `#const` or `#Const.eval` only when the result is semantically required
   during compilation.
2. Prefer typed `#Type.info<T>()` metadata over names and parallel string lists.
3. Keep I/O, clocks, nondeterministic state, and runtime allocation outside
   required-comptime expressions.
4. Treat environment variables and embedded files as explicit build inputs.
5. Use stable structural roles—not presentation names—for generated items.
6. Let known ordinary code fold naturally; do not duplicate runtime algorithms
   in a comptime-only dialect.

## Related

- [Structural Declaration Generation](/guide/advanced/comptime-declarations)
- [Compiler Directives](/guide/advanced/compiler-directives)
- [Builtins and Intrinsics](/guide/advanced/builtins)
- [Comptime Pipeline Architecture](/architecture/comptime-pipeline)
- [Policies](/guide/types/policies)
- [Generics](/guide/types/generics)
