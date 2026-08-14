# `strconv` — string conversions

`strconv` parses borrowed `str` values without allocation and formats primitive
values into owned `string` values. Every parser returns builtin
`Result<T, ParseError>`; parsing never panics or wraps on overflow.

## Parse text

```vex
import { parseInt64, parseFloat64 } from "strconv";

match parseInt64("12345") {
    Result.Ok(value) => $println(value),
    Result.Err(error) => {
        $println(error.message());
        $println(error.position);
    },
};

let ratio = parseFloat64("1.25e-3")?;
```

The package supports signed and unsigned 8/16/32/64-bit integers, bases 2
through 36, binary/octal/hex prefixes, f32/f64 scientific notation, and
case-insensitive booleans. ASCII edge whitespace is accepted; trailing junk is
rejected. A `str` slice does not need NUL termination.

Width-specific integer errors point at the first digit that exceeds the target
type itself (`parseInt8("128")` reports byte 2). Representable subnormals are
kept, including the minimum f64 boundary written as `5e-324`.

Float parsing is correctly rounded to nearest-even, including halfway,
subnormal, overflow, and long-decimal cases. Ordinary decimals use bounded
native paths; wide exponents use an allocation-free pure-Vex cached-power
conversion with `u128` products. Only ambiguous rounding boundaries use the
pure-Vex exact bigint fallback. f32 values are checked for midpoint double
rounding instead of blindly narrowing through f64.

## Format values

```vex
import { formatInt, formatFloat, formatHexPrefix, boolToString } from "strconv";

let count: string = formatInt(42);             // "42"
let ratio: string = formatFloat(3.14159, 2);   // "3.14"
let flags: string = formatHexPrefix(255);      // "0xff"
let enabled: string = boolToString(true);      // "true"
```

Float formatting handles NaN, infinities, negative zero, rounding carry, and
huge/tiny finite values without unsafe float-to-integer conversion. See the
[complete reference](./strconv_reference.md) for all functions and exact
grammar.

Compiler optimization levels do not change these semantics: O0 through O3
retain strict IEEE floating-point behavior unless a separate explicit relaxed
math policy is selected internally.

## Error model

`ParseError` exposes `kind`, zero-based byte `position`, and `invalidByte`.
Its `message()` is a static borrowed description, so error construction stays
allocation-free. Categories are `Empty`, `InvalidChar`, `InvalidFormat`,
`InvalidBase`, `Overflow`, and `Underflow`.
