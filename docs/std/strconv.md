# strconv — String Conversions

Type-safe string ↔ number conversions. All parsing returns `Result<T, ParseError>` for safety — no panics.

## Parsing Strings → Numbers

```rust
import { parseInt, parseFloat, ParseError } from "strconv";

// Parse integer with explicit type
let n = parseInt<i64>("12345")?;           // → 12345
let n = parseInt<i32>("-42")?;             // → -42

// Parse float
let f = parseFloat<f64>("3.14159")?;       // → 3.14159
let f = parseFloat<f64>("1.5e10")?;        // → 15000000000.0

// Error handling
match parseInt<i64>("not_a_number") {
    Ok(n) => println("Got: {n}"),
    Err(e) => println("Error: {e.msg}"),    // "invalid digit"
}
```

## Formatting Numbers → Strings

```rust
import { formatInt64, formatInt32, formatFloat64, formatBool } from "strconv";

let s = formatInt64(42);          // → "42"
let s = formatInt32(-100);        // → "-100"
let s = formatFloat64(3.14);      // → "3.14"
let s = formatBool(true);         // → "true"
```

## Error Types

```rust
struct ParseError {
    msg: string
    kind: ParseErrorKind    // InvalidDigit, Overflow, Empty, InvalidFormat
}

enum ParseErrorKind {
    InvalidDigit,   // Non-numeric character found
    Overflow,       // Number too large for target type
    Empty,          // Empty input string
    InvalidFormat,  // Invalid float format (e.g. "1.2.3")
}
```

## Module Files

| File | Purpose |
|------|---------|
| `parse.vx` | `parseInt<T>`, `parseFloat<T>` implementations |
| `format.vx` | `formatInt64`, `formatFloat64`, `formatBool` |
| `errors.vx` | `ParseError`, `ParseErrorKind`, error constructors |
