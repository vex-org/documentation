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

## Function Pointers vs Closures

Vex distinguishes two kinds of callable values:

**Function pointers** (`fn(T): R`) are bare pointers to top-level functions. They carry no captured state, are pointer-sized, and can cross FFI boundaries.

**Closures** are anonymous types that may capture variables. Each closure has a unique type and may be larger than a pointer if it captures state.

```vex
// Top-level function
fn addOne(x: i32): i32 {
    return x + 1
}

// Function pointer to addOne
let ptr: fn(i32): i32 = addOne
let result = ptr(41)  // 42

// Closure: captures nothing, but has a unique anonymous type
let closure = |x: i32|  x + 1  // type is NOT fn(i32): i32
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

Function pointers are the mechanism for C interop callbacks:

```vex
// Declare a C function that takes a callback
extern "C" {
    fn qsort(base: ptr, nmemb: usize, size: usize,
             compar: fn(ptr, ptr): i32);
}

// Vex callback passed to C -- must be a top-level fn, NOT a closure
fn compareInts(a: ptr, b: ptr): i32 {
    // ... comparison logic ...
}
```

## Zero-Sized Function Types

A function that takes no parameters and returns nothing has type `fn(): ()`. The `()` is the unit type:

```vex
let noop: fn(): () = ||  {}   // closure returning unit
let alsoNoop: fn(): () = myNoopFn
```

## Limitations

- Function pointers cannot capture variables; use closures for that.
- Closures cannot be passed across FFI boundaries; use `extern "C" fn` for that.
- Recursive function types (a function returning its own type) require indirection via `Box` or structs.
- Variadic C functions require the `...` syntax (see Variadic Functions documentation).

## Best Practices

1. Use `fn(T): R` as parameter types when you want to accept both top-level functions and non-capturing closures.
2. Be explicit about function pointer types at API boundaries for clarity.
3. Prefer closures for local callbacks -- they are more ergonomic and the compiler optimizes non-capturing closures to bare function pointers.
4. For FFI callbacks, always use top-level `fn` declarations, never closures.

## Related Pages

- [Closures](/guide/types/closures) -- anonymous capturing functions
- [FFI](/guide/ffi) -- function pointers for C interop
- [Methods](/guide/advanced/methods) -- method syntax and receivers
