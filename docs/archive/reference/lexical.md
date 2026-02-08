# Lexical Structure

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

This document defines the lexical structure of Vex, including allowed characters, tokenization rules, and automatic semicolon insertion.

---

## 1. Source Code Encoding

- **File Extension**: `.vx`
- **Encoding**: UTF-8
- **Newline**: LF (`\n`) or CRLF (`\r\n`)

## 2. Comments

Comments are ignored by the parser but may be used by documentation tools.

| Type | Syntax | Description |
| :--- | :--- | :--- |
| **Line Comment** | `// text` | Ends at newline. |
| **Block Comment** | `/* text */` | Can span multiple lines. Does not nest. |
| **Doc Line** | `/// text` | Documentation for the following item. |
| **Doc Block** | `/** text */` | Block documentation. |

```vex
// Regular comment
/// Documented function
fn main() { /* ... */ }
```

## 3. Whitespace & ASI

Vex uses **Automatic Semicolon Insertion (ASI)**.
Semicolons `;` are **optional** at the end of statements.

The lexer automatically implies a semicolon if a newline occurs after a statement-ending token (like Identifier, Literal, `)`, `}`, etc.).

```vex
// Valid Vex code
let x = 10
let y = 20

// Also valid
let a = 1; let b = 2;
```

## 4. Identifiers

Names for variables, types, and functions.
- **Start**: `[a-zA-Z_]`
- **Continue**: `[a-zA-Z0-9_]`
- **Case Sensitive**

```vex
my_var
MyStruct
_internal
```

## 5. Keywords

Reserved words that cannot be used as identifiers.

### Declaration
`fn`, `let`, `let!`, `const`, `struct`, `enum`, `contract`, `impl`, `policy`, `type`, `unsafe`, `extern`

### Control Flow
`if`, `else`, `elif`, `for`, `while`, `loop`, `match`, `switch`, `case`, `default`, `return`, `break`, `continue`, `defer`, `try`

### Types
`i8`..`i128`, `u8`..`u128`, `f16`..`f64`, `bool`, `string`, `byte`, `any`, `never`, `error`, `nil`, `typeof`

### Concurrency
`async`, `await`, `go`, `select`

### Modules
`import`, `export`, `from`, `as`

### Constraints & Metaprogramming
`extends`, `infer`, `where`, `asm`

### Deprecated / Legacy
`interface` (Removed), `launch` (Deprecated), `gpu` (Deprecated)

## 6. Operators

### Arithmetic & Bitwise
`+`, `-`, `*`, `/`, `%`
`&`, `|`, `^`, `~`, `<<`, `>>`

### Comparison & Logic
`==`, `!=`, `<`, `<=`, `>`, `>=`
`&&`, `||`, `!`

### Assignment
`=`, `+=`, `-=`, `*=`, `/=`, `%=`, `&=`, `|=`, `^=`, `<<=`, `>>=`

### Advanced / SIMD (Implemented)
| Operator | Name | Description |
| :--- | :--- | :--- |
| `<<<` | Rotate Left | Bitwise rotation |
| `>>>` | Rotate Right | Bitwise rotation |
| `+\|`, `-\|`, `*\|` | Saturating | Saturating arithmetic |
| `*^` | Carry-less Mul | Crypto acceleration |
| `<?`, `>?` | Min/Max | SIMD min/max |

### Pipeline & Functional
| Operator | Name | Description |
| :--- | :--- | :--- |
| `\|>` | Pipeline | Function chaining |
| `->>` | Arrow | (Reserved) |

### Matrix / Linear Algebra
`<*>`, `<^>`, `<\>`

### Special
| Symbol | Usage |
| :--- | :--- |
| `.` | Member access |
| `..` | Exclusive Range |
| `..=` | Inclusive Range |
| `...` | Rest / Spread |
| `?.` | Optional Chaining |
| `??` | Null Coalesce |
| `!>` | Error Rescue |
| `->` | Return Type Arrow |
| `=>` | Fat Arrow |
| `<-` | Channel Receive |
| `@` | Autograd Marker |

## 7. Metaprogramming & Comptime

Vex supports compile-time logic with `$` prefix.

- `$for`, `$while`
- `$if`, `$elif`, `$else`
- `$typeof`, `$const`
- `$concat`, `$stringify`

## 8. Literals

Vex supports specific suffixes and formats.

- **Integers**: `100`, `0xFF`, `0o77`, `0b1010`. Suffixes: `42u8`, `100i64`
- **Floats**: `3.14`, `1.5e-10`.
- **Strings**: `"text"`, `f"hello {name}"`
- **Chars**: Not a distinct type (use string or byte).

## 9. Compiler Directives

Intrinsics start with `@`.

- `@{ ... }` (Intrinsic Block)
- `@vectorize` (Deprecated, auto)
- `@gpu` (Deprecated, auto)
