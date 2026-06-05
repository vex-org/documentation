# Never and Unit Types

Vex has two special types that represent "no value" in different ways: the **never type** (`never`) and the **unit type** (`()`).

## The Never Type (`never`)

`never` is the **bottom type** -- a type with NO possible values. It represents computations that never complete normally. Functions that diverge (loop forever, panic, abort, or exit the program) have return type `never`.

### Where `never` Appears

**Infinite loops:**

```vex
fn runForever(): never {
    loop {
        processEvents()
    }
    // Unreachable -- loop never exits
}
```

**Panic / Abort:**

```vex
fn die(msg: string): never {
    $panic(msg)
    // Unreachable -- $panic never returns
}
```

**Early exit:**

```vex
fn exitWithCode(code: i32): never {
    $abort(code)
}
```

### `never` Coercion

`never` can coerce to ANY type. This is what makes early-return patterns work in expressions:

```vex
fn getOrDefault(opt: Option<i32>): i32 {
    return match opt {
        Some(v) => v,          // arm returns i32
        None => $panic("none"),  // arm returns never, which coerces to i32
    }
}
```

Because `$panic` returns `never`, it can be used in any expression position regardless of the expected type:

```vex
let value = if valid {
    compute()
} else {
    $panic("invalid state")  // never coerces to the expected type
}
```

### `return`, `break`, `continue` and `never`

The `return`, `break`, and `continue` expressions also produce `never`:

```vex
let x = if condition {
    42
} else {
    return 0  // return produces never, coerces to i32
}
```

### `never` in Generic Code

`never` can appear as a generic type parameter, making some types uninhabitable:

```vex
// Result<T, never> can never be Err -- it's always Ok
fn infallible(): Result<i32, never> {
    return Ok(42)
    // Err(???) is impossible -- no value of type never exists
}
```

## The Unit Type (`()`)

`()` is the **unit type** -- a zero-size type with exactly ONE value: `()`. It represents "no meaningful data" and is the default return type for functions without a return value.

### Functions Returning Unit

```vex
// Implicit unit return
fn printMessage(msg: string) {
    $println(msg)
    // implicitly returns ()
}

// Explicit unit return
fn doNothing(): () {
    return ()
}
```

### Unit in Generics

Unit is commonly used as a type parameter meaning "I don't care about this":

```vex
// Set<T> is essentially Map<T, ()>
// The value type is unit because we only care about keys

// A callback that takes no useful data
fn onEvent(callback: fn(()): ()) {
    callback(())
}
```

### Unit Size

`()` has size 0 -- it takes no memory. A `Vec<()>` stores no data per element, only the length:

```vex
// Type-level counter: Vec<()> is just a length
let! counter = Vec.new<()>()
counter.push(())  // only increments length
counter.push(())
let count = counter.len()  // 2
```

### Unit vs Void (C)

In C, `void` means "no type at all" -- you cannot have a variable of type `void`. In Vex, `()` is a real type with a real value:

```vex
let x: () = ()          // Valid: x is a real value
let items: [(); 3] = [(), (), ()]  // Array of three unit values, zero size
```

## Comparison Table

| Property         | `never`                         | `()`                                   |
| ---------------- | ------------------------------- | -------------------------------------- |
| Number of values | 0 (none)                        | 1 (`()`)                               |
| Size in memory   | 0 bytes                         | 0 bytes                                |
| Meaning          | Computation never finishes      | Computation finished with no result    |
| Coercion         | Coerces to ANY type             | Does not coerce                        |
| Common use       | Diverging functions, early exit | Default return, generic placeholder    |
| Can instantiate? | No -- impossible                | Yes -- `()`                            |
| C equivalent     | `_Noreturn` / `[[noreturn]]`    | `void` (but Vex's `()` is a real type) |

## Best Practices

1. Annotate diverging functions with `: never` return type for clarity and better compiler diagnostics.
2. Use `()` as the return type when a function performs side effects and has no meaningful return value -- or just omit the return type entirely.
3. Use `()` as a generic placeholder when only one type parameter matters (e.g., `Map<K, ()>` acts as a `Set<K>`).
4. Remember that `never` coercions make early-return and panic patterns safe in expression contexts -- no need for awkward `unreachable!()` markers.
