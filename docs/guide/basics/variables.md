# Variables & Constants

Vex provides three ways to declare bindings: `let` for immutable variables, `let!` for mutable variables, and `const` for compile-time constants.

## Immutable Variables (`let`)

By default, variables in Vex are **immutable**. Once assigned, their value cannot be changed:

```vex
let x = 42
let name = "Vex"
let pi = 3.14159

// x = 100  // ERROR: Cannot assign to immutable variable
```

::: tip Why Immutable by Default?
Immutable bindings make code easier to reason about, enable better optimizations, and prevent accidental mutations. This is a key principle in Vex's safety model.
:::

## Mutable Variables (`let!`)

When you need to modify a variable, use `let!`:

```vex
let! counter = 0
counter = counter + 1  // OK
counter += 1           // OK

let! buffer = Vec<u8>.new()
buffer.push(42)        // OK - mutation allowed
```

The `!` suffix serves as a visual marker that this variable can change, making mutation explicit and intentional.

## Constants (`const`)

Constants are evaluated at **compile time** and must have an explicit type annotation:

```vex
const MAX_SIZE: i32 = 1024
const PI: f64 = 3.14159265358979
const APP_NAME: string = "MyApp"
const BUFFER_SIZE: usize = 2048
```

### Const vs Let

| Feature | `let` | `const` |
|---------|-------|---------|
| Evaluation | Runtime | Compile-time |
| Type annotation | Optional | Required |
| Memory | Stack/Heap | Inlined |

## Type Annotations

Type annotations are optional when the type can be inferred:

```vex
// Inferred types
let x = 42          // i32 (default integer type)
let y = 3.14        // f64 (default float type)
let z = true        // bool
let s = "hello"     // string

// Explicit types
let a: i64 = 42
let b: f32 = 3.14
let c: u8 = 255
```

## Shadowing

You can redeclare a variable with the same name, which **shadows** the previous binding:

```vex
let x = 5
let x = x * 2      // x is now 10
let x = "hello"    // x is now a string (type can change)

fn example() {
    let value = 10
    {
        let value = 20  // Shadows outer `value`
        println(value)  // Prints: 20
    }
    println(value)      // Prints: 10 (original)
}
```

## Destructuring

Variables can be declared using pattern destructuring:

### Tuple Destructuring

```vex
let (x, y) = (10, 20)
let (first, _, third) = (1, 2, 3)  // _ ignores a value
```

### Struct Destructuring

```vex
struct Point { x: f64, y: f64 }

let point = Point { x: 3.0, y: 4.0 }
let Point { x, y } = point
```

## Late Initialization

Variables can be declared without initialization and assigned later:

```vex
let x: i32           // Declared but not initialized
// println(x)        // ERROR: Use of uninitialized variable

x = 10               // Now initialized
println(x)           // OK
```

The borrow checker ensures you never use an uninitialized variable.

## Best Practices

1. **Prefer `let` over `let!`**: Only use mutation when necessary.
2. **Use meaningful names**: `user_count` instead of `n`.
3. **Scope variables tightly**: Declare variables close to their first use.
4. **Use `const` for configuration**: Makes intent and compile-time nature clear.

## Next Steps

- [Primitive Types](/guide/types/primitives) - All built-in types
- [Functions](/guide/basics/functions) - Working with functions
- [Ownership](/guide/memory/ownership) - How variables own data
