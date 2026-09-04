# Variadic Functions

Vex supports typed variadic functions and, separately, platform C variadics.
They have different ownership rules and calling conventions.

## Typed Vex packs

Place a typed pack last in the parameter list:

```vex
fn count<T>(values: ...T): usize {
    return values.len();
}

let three = count<i32>(10, 20, 30);
let empty = count<i32>();
```

Each argument is checked against the element type. Ordinary argument coercion
rules apply, including constructor-based conversions where available.
Fixed parameters may precede the pack:

```vex
fn countAfter<T>(prefix: T, values: ...T): usize {
    return values.len();
}

let remaining = countAfter<i32>(10, 20, 30);
```

This is a typed, homogeneous pack, not C varargs. Vex transports a data pointer
and element count through its own ABI. Preparing the pack does not require
allocating a Vec; individual elements can still allocate according to their
normal construction or clone semantics.

Instance methods use the same pack rules. Borrowed, mutable and by-value
receivers keep their ordinary ownership semantics; the receiver is not an
element of the pack. Receiver evaluation precedes argument evaluation, and
each expression runs once. Method-local generic element types and indirect
aggregate returns use the same typed ABI as free functions. Fixed-arity
overloads retain their normal specificity over a matching variadic alternative.

## Ownership and element access

A by-value pack owns its elements. Passing move-only values transfers them to
the callee, which drops them when it exits, including on early return.
Passing borrowed elements, as in `values: ...&T`, does not transfer ownership
of their referents.

Iteration observes elements through references. The pack also exposes the
borrowed Span API, including `get`, `first`, `last`, `slice` and `splitAt`.
These operations do not turn the pack into a second owner.

```vex
fn firstOrZero(values: ...i32): i32 {
    match values.get(0) {
        Some(value) => return *value,
        None => return 0,
    }
}
```

References and views into an owned pack must not escape the callee:

```vex
// Rejected: values cease to be owned by this callee when it returns.
fn invalid(values: ...i32): Span<i32> {
    return values.slice(0, values.len());
}
```

The same restriction applies when a view is wrapped in another aggregate.
To keep data beyond the call, produce independently owned data instead.
A pack's borrowed method view is not a general implicit pack-to-Span conversion.

## Compile-time calls

Typed packs also work in const functions. Every supplied argument is evaluated
in source order and checked against the element type; an omitted tail creates
an empty pack, not a missing required argument.

```vex
const fn packSum(values: ...i64): i64 {
    let! total: i64 = 0;
    for value in values { total += value; }
    return total;
}

let empty = #const { packSum() };                         // 0
let widened = #const { packSum(-7 as i8, 2 as i16) };     // -5
```

Compile-time iteration borrows the callee-owned element slots, just as native
iteration does. Repeated iteration does not consume the pack, and returning
an element reference cannot extend the pack's lifetime. Borrowed element
arguments retain their original caller storage. Fixed leading parameters and
ordinary instance-method receivers use the same argument preparation.

This does not make every Span method const-capable or allow foreign C varargs
during CTFE. Generated/default-contract variadic call combinations, arbitrary
pack forwarding and suspended execution require separate coverage. The
evaluator's private pack storage is never serialized as a persistent array.

## C-compatible variadics

An untyped trailing `...` in an extern declaration uses the selected platform's
C variadic ABI:

```vex
extern "LIBC" {
    fn printf(format: Ptr<u8>, ...): i32;
    fn snprintf(buf: Ptr<u8!>, size: usize, format: Ptr<u8>, ...): i32;
}
```

These are unsafe foreign calls. The caller must supply the correct promoted
C argument types and valid pointers; a format string is not a Vex type-checking
contract. In particular, Vex `str` and `string` are not C string pointers.
Prepare NUL-terminated storage explicitly and keep it alive for the call.

Typed Vex packs do not add a libc dependency. An explicit foreign declaration
and its use are a separate FFI choice.

## Formatting builtins

`$print`, `$println` and `$panic` are compiler-provided operations with their
own argument handling. They are not examples of the C variadic ABI.

## Implementation and validation scope

Typed source calls share the compiler's canonical function ABI, including
hidden context and indirect aggregate returns. Element cleanup is a counted
loop when required; Copy-only packs need no element-drop loop.

Regression coverage includes fixed owning arguments, empty packs, aggregate
returns, repeated temporary owners, cloned strings, borrowed element access,
nested views and early return. Method controls additionally cover receiver
evaluation order, mutable and consuming receivers, generic receiver/element
combinations and fixed-overload preference. Arbitrary pack escape, async capture/forwarding
and foreign-exception unwinding are not certified by this coverage.
