# Function Types and Pointers

Vex supports first-class function types, allowing functions to be passed as arguments, returned from other functions, and stored in data structures.

## Function Type Syntax

A function type is written as `fn(ParamTypes): ReturnType`:

```vex
// Function taking i32, returning bool
let predicate: fn(i32): bool

// Function taking two f64, returning f64
let binaryOp: fn(f64, f64): f64

// Function with no parameters returning i32
let supplier: fn(): i32

// Function taking nothing, returning nothing
let action: fn(): ()
```

An async function type is written with the same source marker as an async
declaration. It means that invoking the value produces a compiler-owned
`Future<T>`; users do not spell or construct that scheduler handle manually.

```vex
type Fetch = async fn(url: str): string

async fn fetchText(url: str): string {
    return "ok"
}

async fn fetchAndMeasure(fetch: Fetch): usize {
    return (await fetch("https://example.test")).len()
}
```

`async fn(Args): T` is distinct from `fn(Args): T`. It is not an FFI callback
type and cannot be substituted for a synchronous callback: its pointer ABI
returns Vex's task handle and its call must be awaited in an async context.

## Function Pointers vs Closures

Named functions and closures can both produce callable values:

**Named functions** do not capture local variables. A native Vex `fn(T): R`
value nevertheless uses Vex's callable representation: a code pointer and an
environment/context pointer. Do not assume that it is pointer-sized or has a C
callback ABI.

**Closures** may capture variables. Their environment stores the captures;
the native callable value carries the entry point and its environment pointer.
The function type describes the parameters and result, not the capture size.

```vex
// Top-level function
fn addOne(x: i32): i32 {
    return x + 1
}

// Function pointer to addOne
let ptr: fn(i32): i32 = addOne
let result = ptr(41)  // 42

// Explicitly typed non-capturing closure
let closure: fn(i32): i32 = |x: i32| x + 1
```

## Passing Functions as Arguments

```vex
fn applyTwice(f: fn(i32): i32, x: i32): i32 {
    return f(f(x))
}

fn square(n: i32): i32 {
    return n * n
}

let result = applyTwice(square, 3)  // square(square(3)) = 81
```

## Returning Functions

```vex
fn chooseOp(kind: i32): fn(i32, i32): i32 {
    if kind == 0 {
        return add    // returns function pointer
    } else {
        return mul
    }
}

fn add(a: i32, b: i32): i32 { return a + b }
fn mul(a: i32, b: i32): i32 { return a * b }

let op = chooseOp(0)
let result = op(3, 4)  // 7
```

## Storing Functions in Data Structures

```vex
struct Handler {
    callback: fn(i32): (),
    name: string,
}

fn onData(code: i32) {
    $println(f"Got code: {code}")
}

let handler = Handler.new(onData, "data_handler")
handler.callback(200)
```

## Functions in Collections

```vex
// Array of function pointers
let operations: [fn(i32, i32): i32; 3] = [add, mul, sub]

// Named function or explicit closure annotation:
let results = operations.map(|op: fn(i32, i32): i32| op(10, 5))
// [15, 50, 5]
```

## Generic Function Types

Function types work with generics:

```vex
fn mapValues<T, U>(values: Vec<T>, transform: fn(T): U): Vec<U> {
    let! result = Vec.new<U>()
    for v in values {
        result.push(transform(v))
    }
    return result
}

let numbers = Vec.from([1, 2, 3])
let strings = mapValues(numbers, |n: i32|  n.toString())
```

## FFI and Function Pointers

Native Vex callables and raw foreign callback pointers are different ABI
contracts. A foreign callback requires the exact foreign entry signature and a
supported adapter/declaration boundary, including any context and lifetime
requirements. Merely writing `fn(...)` inside an extern declaration does not
prove that an ordinary Vex function value can be passed as one raw pointer.
Do not cast a native callable to `Ptr` to manufacture a foreign callback.
See the [FFI guide](/guide/ffi) for foreign declaration contracts.

## Unit-Returning Function Types

A function that takes no parameters and returns nothing has type `fn(): ()`. The `()` is the unit type:

```vex
let noop: fn(): () = ||  {}   // closure returning unit
let alsoNoop: fn(): () = myNoopFn
```

The unit result does not make the callable value itself zero-sized.

## Limitations

- Named functions do not capture local variables; use closures for that.
- A native callable is not automatically a foreign callback, even when it has
  no captures. Use the exact declared foreign entry contract.
- `async fn(Args): T` values are Vex-runtime callbacks, not C callbacks. Keep
  FFI callback signatures synchronous.
- Recursive function types (a function returning its own type) require indirection via `Box` or structs.
- Variadic C functions require the `...` syntax (see Variadic Functions documentation).

## Best Practices

1. Use `fn(T): R` as parameter types when you want to accept both top-level functions and non-capturing closures.
2. Be explicit about function pointer types at API boundaries for clarity.
3. Prefer closures for local callbacks when useful; optimization may remove
   unnecessary environment work, but it does not change the source ABI contract.
4. For FFI callbacks, verify the foreign signature and conversion explicitly;
   a top-level Vex declaration alone is not an ABI proof.

## Related Pages

- [Closures](/guide/types/closures) -- anonymous capturing functions
- [FFI](/guide/ffi) -- function pointers for C interop
- [Methods](/guide/advanced/methods) -- method syntax and receivers
