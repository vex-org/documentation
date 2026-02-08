# Syntax Overview

Vex syntax is designed to be familiar to developers coming from C, Rust, Go, or TypeScript while introducing unique features for parallelism and safety.

## Basic Structure

### Comments

```vex
// Single-line comment

/* 
   Multi-line comment 
*/

/// Documentation comment (generates docs)
fn documented_function() {
    // ...
}
```

### Statements and Semicolons

Vex uses **automatic semicolon insertion (ASI)** similar to Go. Semicolons are optional at line endings:

```vex
let x = 10      // Semicolon inserted automatically
let y = 20      // Semicolon inserted automatically

// Explicit semicolons for multiple statements on one line
let a = 1; let b = 2
```

### Blocks

Blocks are delimited by curly braces `{}`:

```vex
{
    let x = 10
    let y = 20
    x + y  // Last expression is the block's value
}
```

## Identifiers

Valid identifiers:
- Start with a letter or underscore
- Contain letters, digits, or underscores
- Case-sensitive

```vex
let myVariable = 10
let _private = 20
let camelCase = 30
let snake_case = 40
let Type123 = 50
```

### Reserved Keywords

```
fn       let      let!     const    struct   enum     contract
impl     if       else     elif     for      while    loop
match    return   break    continue defer    go       async
await    import   export   from     as       type     where
true     false    nil      self     unsafe   extern   public
private  readonly
```

## Literals

### Numeric Literals

```vex
// Integers
let decimal = 42
let hex = 0xFF
let octal = 0o77
let binary = 0b1010

// With type suffix
let byte: u8 = 255u8
let big: i64 = 1000000i64
let huge: i128 = 999999999999i128

// Floats
let pi = 3.14159
let scientific = 1.5e10
let small = 2.0e-5

// Imaginary (for complex numbers)
let imag = 5i
let complex_imag = 3.14i
```

### String Literals

```vex
// Regular strings
let hello = "Hello, World!"

// Escape sequences
let escaped = "Line 1\nLine 2\tTabbed"

// Formatted strings (f-strings)
let name = "Vex"
let greeting = f"Hello, {name}!"

// Multi-line strings
let multi = "Line 1
Line 2
Line 3"
```

### Boolean and Nil

```vex
let yes = true       // bool
let no = false       // bool

// nil represents a NULL pointer (primarily for FFI)
// For high-level code, use Option<T> instead.
let nothing = nil    
```

### Array Literals

```vex
let numbers: [i32; 5] = [1, 2, 3, 4, 5]
let zeros: [f64; 3] = [0.0, 0.0, 0.0]
let mixed = [1, 2, 3]  // Type inferred as [i32; 3]
```

### Tuple Literals

```vex
let pair = (10, "hello")
let triple: (i32, f64, bool) = (1, 2.5, true)

// Access by index
let first = pair.0   // 10
let second = pair.1  // "hello"
```

## Operators

### Arithmetic Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `+` | Addition | `a + b` |
| `-` | Subtraction | `a - b` |
| `*` | Multiplication | `a * b` |
| `/` | Division | `a / b` |
| `%` | Modulo | `a % b` |
| `**` | Power | `a ** b` |

### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal | `a == b` |
| `!=` | Not equal | `a != b` |
| `<` | Less than | `a < b` |
| `<=` | Less or equal | `a <= b` |
| `>` | Greater than | `a > b` |
| `>=` | Greater or equal | `a >= b` |

### Logical Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `&&` | Logical AND | `a && b` |
| `\|\|` | Logical OR | `a \|\| b` |
| `!` | Logical NOT | `!a` |

### Bitwise Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `&` | Bitwise AND | `a & b` |
| `\|` | Bitwise OR | `a \| b` |
| `^` | Bitwise XOR | `a ^ b` |
| `~` | Bitwise NOT | `~a` |
| `<<` | Left shift | `a << n` |
| `>>` | Right shift | `a >> n` |

### SIMD & Vector Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `<<<` | Rotate left | `a <<< n` |
| `>>>` | Rotate right | `a >>> n` |
| `<?` | Element-wise min | `a <? b` |
| `>?` | Element-wise max | `a >? b` |
| `*+` | Fused multiply-add | `a *+ b` |
| `+\|` | Saturating add | `a +\| b` |
| `-\|` | Saturating sub | `a -\| b` |

### Assignment Operators

```vex
let! x = 10

x = 20        // Simple assignment
x += 5        // Add and assign
x -= 3        // Subtract and assign
x *= 2        // Multiply and assign
x /= 4        // Divide and assign
x %= 3        // Modulo and assign
x &= 0xFF     // Bitwise AND and assign
x |= 0x0F     // Bitwise OR and assign
x ^= 0xAA     // Bitwise XOR and assign
x <<= 2       // Left shift and assign
x >>= 1       // Right shift and assign
```

### Other Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `? :` | Ternary conditional | `a > b ? a : b` |
| `?` | Error propagation | `result?` |
| `??` | Nil coalescing | `a ?? default` |
| `\|>` | Pipeline | `x \|> fn1 \|> fn2` |
| `..` | Range (exclusive) | `0..10` |
| `..=` | Range (inclusive) | `0..=10` |
| `.` | Member access | `obj.field` |

## Expressions vs Statements

In Vex, most constructs are **expressions** that return values:

```vex
// if is an expression
let max = if a > b { a } else { b }

// match is an expression
let name = match value {
    1 => "one",
    2 => "two",
    _ => "other"
}

// Blocks are expressions (return last value)
let result = {
    let x = compute()
    let y = transform(x)
    x + y  // This is the block's value
}
```

## Next Steps

- [Variables & Constants](/guide/basics/variables) - Learn about variable declaration
- [Functions](/guide/basics/functions) - Function syntax and features
- [Control Flow](/guide/basics/control-flow) - if, match, loops
