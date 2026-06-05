# Variadic Functions

Variadic functions accept a variable number of arguments. Vex supports C-compatible variadics for FFI and provides builtin variadic support for formatting macros like `$println`.

## C-Compatible Variadic Functions

For interop with C libraries like `printf`, declare the function with `...` as the final parameter:

```vex
extern "C" {
    fn printf(format: *u8, ...): i32
    fn scanf(format: *u8, ...): i32
    fn snprintf(buf: *u8!, size: usize, format: *u8, ...): i32
}
```

### Calling C Variadics

```vex
unsafe {
    printf("Hello %s, you are %d years old\n", name, age)
    printf("Values: %d, %f, %s\n", 42, 3.14, "test")
}
```

**Important:** When calling C variadic functions:

- Type checking of variadic arguments is minimal -- ensure argument types match the format string.
- Default argument promotions apply (e.g., `f32` promotes to `f64` in variadic position).
- Use `unsafe` blocks -- variadic calls bypass type safety.

## Builtin Variadic Macros

Vex provides variadic builtin macros that are type-safe and do NOT require `unsafe`:

### `$println`

```vex
$println("Hello")                       // single argument
$println(f"Value: {x}")                 // template literal
$println(f"{} + {} = {}", a, b, a + b)  // multiple format args
```

### `$eprintln` (stderr)

```vex
$eprintln(f"Error: {msg}")
```

### `$panic`

```vex
$panic(f"Assertion failed: expected {expected}, got {actual}")
```

### `$format` (string formatting, variadic)

```vex
let msg = $format(f"Processing {} of {} items", current, total)
```

## Defining Variadic Vex Functions

Vex does NOT currently support defining new variadic functions with `...` syntax for pure Vex code. Variadic definitions are restricted to:

1. `extern "C"` declarations for FFI
2. Builtin compiler macros (like `$println`)

For variable-argument needs in pure Vex, use these alternatives:

### Use `Vec<T>` for homogeneous variadic args

```vex
fn sumAll(values: Vec<i32>): i32 {
    let! total = 0
    for v in values {
        total += v
    }
    return total
}

let result = sumAll(Vec.from([1, 2, 3, 4, 5]))
```

### Use default parameters where applicable

```vex
fn createWindow(title: string, width: i32 = 800, height: i32 = 600): Window {
    // ...
}

let w1 = createWindow("Main")                         // defaults
let w2 = createWindow("Settings", height: 400)        // named override
```

### Use builder pattern for complex optional args

```vex
struct Config {
    host: string,
    port: i32,
    timeout: i32,
    retries: i32,
}

fn Config.new(host: string, port: i32): Config { ... }

fn (self: &Config!) set_timeout!(timeout: i32) { self.timeout = timeout }
fn (self: &Config!) set_retries!(retries: i32) { self.retries = retries }

// Builder-style usage
let! config = Config.new("localhost", 8080)
config.set_timeout!(5000)
config.set_retries!(3)
```

## Variadic Argument Access (Compiler Internals)

For compiler developers: The Vex compiler lowers variadic calls through `calls/variadic.rs`. Each target platform has its own calling convention for variadics (System V AMD64 ABI on Linux/macOS, different on Windows and ARM).

## Safety Considerations

1. **C variadics are unsafe**: No type checking on variadic arguments. Mismatched types cause undefined behavior.
2. **Prefer builtin macros**: `$println`, `$format` etc. are type-safe alternatives.
3. **Don't mix Vex types with C variadics**: Pass only C-compatible types (primitives, pointers) to C variadic functions.
4. **String handling**: Vex `string` is NOT C-compatible. Cast to `*u8` for C variadics:

```vex
let msg = "Hello"
unsafe {
    printf("%s\n", msg as *u8)  // pass as C string pointer
}
```
