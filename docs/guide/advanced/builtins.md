# Builtin Functions

Vex provides a set of builtin functions and intrinsics that are always available without explicit imports. 

## Core IO

```vex
// Variadic printing
println("Hello", "World", 42)
print("No", "newline")
```

## Guard and Assertions

```vex
// Runtime assertion
assert(x > 0)

// Mark unreachable paths (panics in debug, UB in release)
unreachable()

// Placeholder for missing implementation
todo("implement this")
```

## Memory & Type Info

Intrinsics starting with `#` are evaluated at compile time.

```vex
let size = #sizeof<i64>()       // 8
let align = #alignof<f64>()     // 8
let name = #typename<i32>()     // "i32"
```

## Compile-Time Strings

```vex
// Concatenation
let msg = #concat("Hello, ", name)

// Inclusion
let config = #includeStr("config.json")
let data = #includeBytes("image.png")
```

## Explicit Drop

Vex handles memory automatically (RAII), but you can manually trigger cleanup:

```vex
$drop(resource)
```

## Best Practices

1. **Prefer RAII**: Trust the compiler's automatic cleanup instead of manual `$drop`.
2. **Use `todo()` during development**: Keeps the compiler happy while you outline logic.
3. **Leverage `#sizeof` for FFI**: Always use it when interfacing with C to ensure portable layouts.

## Next Steps

- [Comptime](/guide/advanced/comptime) - Full compile-time reflection
- [Unsafe](/guide/advanced/unsafe) - Low-level low-level operations
- [FFI](/guide/ffi) - Interfacing with other languages
