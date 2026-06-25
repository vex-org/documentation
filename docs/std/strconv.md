# strconv — String Conversions

Type-safe string ↔ number conversions. All parsing returns `Result&lt;T, ParseError&gt;` for safety — no panics.

## Parsing Strings → Numbers

The safe, high-level parsing APIs accept a Vex `str` / `string` and return a standard `ParseResult&lt;T&gt;` containing `Ok(T)` or `Err(ParseError)`:

```vex
import { parseInt, parseFloat, ParseResult } from "std/strconv";

// Parse integer
match parseInt("12345") {
    ParseResult.Ok(n) => $println("Parsed i64: ", n),
    ParseResult.Err(e) => $println("Error: ", e.message),
}

// Parse float
match parseFloat("3.14159") {
    ParseResult.Ok(f) => $println("Parsed f64: ", f),
    ParseResult.Err(e) => $println("Error: ", e.message),
}
```

## Formatting Numbers → Strings

Convert numeric values directly to safe, owned Vex `string` values:

```vex
import { formatInt, formatFloat, boolToString } from "std/strconv";

let s1 = formatInt(42);                // → "42" (string)
let s2 = formatFloat(3.14159, 2);      // → "3.14" (string) with precision 2
let s3 = boolToString(true);           // → "true" (string)
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
| `parse.vx` | `parseInt&lt;T&gt;`, `parseFloat&lt;T&gt;` implementations |
| `format.vx` | `formatInt64`, `formatFloat64`, `formatBool` |
| `errors.vx` | `ParseError`, `ParseErrorKind`, error constructors |
