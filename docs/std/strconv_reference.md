# `strconv`

`strconv` performs strict, locale-independent conversion between borrowed text
and primitive values. Parsers accept length-aware `str` and allocate nothing;
formatters return language-owned `string` values.

```vex
import { parseInt64, parseFloat64, formatHex } from "strconv";

let port = parseInt64("8080")?;
let rate = parseFloat64("1.25e-3")?;
let flags: string = formatHex(255); // "ff"
```

## Parsers

| Function | Return type |
| --- | --- |
| `parseInt64` / `parseUInt64` | `Result<i64/u64, ParseError>` |
| `parseInt32/16/8` | Checked matching signed result |
| `parseUInt32/16/8` | Checked matching unsigned result |
| `parseIntBase` / `parseUIntBase` | Checked base 2 through 36 |
| `parseHex` / `parseOctal` / `parseBinary` | `Result<u64, ParseError>` |
| `parseFloat64` / `parseFloat32` | Checked decimal/scientific float |
| `parseBool` | `Result<bool, ParseError>` |

Integer helpers accept optional matching `0x`, `0o`, or `0b` prefixes. Float
syntax includes decimal fractions and `e`/`E` exponents. Boolean values are
`true`, `yes`, `1`, `false`, `no`, and `0`, case-insensitively.

ASCII whitespace may surround a value, but trailing junk is rejected. Inputs
may be slices and do not need a C terminator.

Narrow signed and unsigned parsers check their own limits while accumulating
digits. Overflow and underflow therefore report the exact triggering byte, not
a later wrapper-level cast. Float parsing preserves representable subnormals;
`5e-324` is accepted while values that round to zero report underflow.

Decimal f32/f64 results are rounded to nearest-even over the full finite IEEE
domain. Exactly representable mantissa/power combinations use the smallest
hardware path. Wider exponents use a pure-Vex Eisel-Lemire cached-power tier;
only products whose IEEE result is unambiguous are accepted. Remaining values
use an allocation-free pure-Vex bigint fallback. f32 midpoint detection
prevents decimal → f64 → f32 double rounding.

Convenience overloads are available as `parseInt`, `parseUInt`, `parseFloat`,
and `parseBoolStr`.

## Parse errors

```vex
enum ParseErrorKind {
    Empty, InvalidChar, InvalidFormat, InvalidBase, Overflow, Underflow,
}

struct ParseError {
    kind: ParseErrorKind,
    position: usize,
    invalidByte: u8,
}
```

The position is a zero-based byte offset. Errors allocate no message object;
use `message()` for a static description, `isKind()` for category matching,
or `code()` for a stable numeric code.

```vex
match parseInt64("12x") {
    Result.Ok(value) => $println(value),
    Result.Err(error) => {
        $println(error.message());
        $println(error.position); // 2
    },
};
```

## Formatters

| Function | Result |
| --- | --- |
| `formatInt64`, `formatInt32` | Owned signed decimal `string` |
| `formatUInt64`, `formatUInt32` | Owned unsigned decimal `string` |
| `formatHex`, `formatHexUpper`, `formatHexPrefix` | Owned hexadecimal `string` |
| `formatBinary` | Owned binary `string` |
| `formatFloat64`, `formatFloat32` | Owned rounded decimal `string` |
| `formatBool` | Owned `true`/`false` string |

`formatFloat64(value, precision)` clamps precision to 0 through 18. Common
values use fixed notation. Magnitudes at least `1e19`, and nonzero magnitudes
below `1e-6`, use scientific notation. This prevents unsafe integer conversion
for huge values and preserves tiny nonzero values. Special output is `nan`,
`inf`, or `-inf`; negative zero keeps its sign.

```vex
$assert(formatInt64(-42) == "-42");
$assert(formatHexPrefix(255) == "0xff");
$assert(formatFloat64(9.999, 2) == "10.00");
$assert(formatFloat64(1.0e100, 2) == "1.00e+100");
```

Aliases include `intToString`, `floatToString`, `boolToString`, `formatInt`,
and `formatFloat`.

## Runtime properties

- No libc, native shim, C-string scan, or external package dependency.
- Parsing is allocation-free. Common values need one digit pass; cached powers
  handle unambiguous wide exponents, while rare exact fallbacks re-read the
  borrowed digits without copying them.
- Integer formatting uses backward writing with digit-pair lookup.
- Formatting performs one final copy into a Vex-owned string.
- Extreme float normalization has bounded work.
- O0 through O3 keep strict IEEE floating-point semantics; optimization level
  alone never enables relaxed math.

The 2026-08-14 M2 Max O3 parser baselines are 6.50 ns for fixed-width f64,
23.48 ns for a general exact-operand decimal, 44.71 ns for a cached-power wide
exponent, and 75.83 ns for a cached-power long decimal. A true exact halfway
fallback is 873.31 ns and is not paid by ordinary or interval-proven inputs.
Timings vary by host.

See the package's `REFERENCE.md`, tests, and benchmarks for the complete
engineering contract.
