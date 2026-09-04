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
| `formatUIntBase` / `formatUIntBaseUpper` | Owned base-2-through-36 result |
| `formatIntBase` / `formatIntBaseUpper` | Owned signed base-2-through-36 result |
| `formatUIntBaseTo` / `formatUIntBaseUpperTo` | Allocation-free caller-buffer result |
| `formatIntBaseTo` / `formatIntBaseUpperTo` | Allocation-free signed caller-buffer result |
| `formatFloat64`, `formatFloat32` | Owned rounded decimal `string` |
| `formatFloat64To` | Write rounded f64 text into caller-owned storage without allocation |
| `formatFloat64Shortest`, `formatFloat32Shortest` | Owned shortest-roundtrip IEEE decimal |
| `formatFloat64ShortestTo` | Allocation-free shortest f64; requires 24 bytes |
| `formatFloat32ShortestTo` | Allocation-free shortest f32; requires 16 bytes |
| `formatBool` | Owned `true`/`false` string |

`formatFloat64(value, precision)` clamps precision to 0 through 18. Common
values use fixed notation. Magnitudes at least `1e19`, and nonzero magnitudes
below `1e-6`, use scientific notation. This prevents unsafe integer conversion
for huge values and preserves tiny nonzero values. Special output is `nan`,
`inf`, or `-inf`; negative zero keeps its sign.

Shortest formatting uses independent binary32/binary64 pure-Vex Ryu paths.
It preserves signed zero, writes integral finite values with `.0`, and uses
lowercase `e` without a redundant positive exponent sign. `floatToString`
uses this shortest-roundtrip mode; explicit precision remains available via
`formatFloat64(value, precision)`.

```vex
$assert(formatInt64(-42) == "-42");
$assert(formatHexPrefix(255) == "0xff");
$assert(formatFloat64(9.999, 2) == "10.00");
$assert(formatFloat64(1.0e100, 2) == "1.00e+100");
$assert(formatFloat64Shortest(1.2345678901234567) == "1.2345678901234567");
$assert(formatFloat64Shortest(5.0e-324) == "5e-324");
```

Aliases include `intToString`, `floatToString`, `boolToString`, `formatInt`,
and `formatFloat`.

Radix formatters return `Result<..., FormatError>`. Valid bases are 2 through
36. The default variants use `a` through `z`; `Upper` variants use `A` through
`Z`. Caller-buffer forms are transactional: invalid base or insufficient
capacity returns an error without changing the destination. Signed output
uses a leading minus sign in every radix and safely handles `MIN_I64`.

### Caller-buffer float formatting

`formatFloat64To(value, precision, out, outCap)` is the allocation-free source
of truth used by `strings.StringBuilder`. The caller supplies a writable
`RawBuf` with at least 64 bytes of capacity. The function returns the number of
initialized bytes and never appends a terminator. If the buffer is null or too
small, it returns zero without modifying the destination.

```vex
import { formatFloat64To } from "strconv/format"

let! storage: [u8; 64] = [0; 64]
let output = RawBuf.fromMutPtr(&storage[0])
let length = formatFloat64To(9.999e100, 2, output, 64 as usize)
let rendered = str.fromRawParts(storage.asPtr(), length)
$assert(rendered == "1.00e+101")
```

This API is intended for builders, serializers and protocol writers that
already own output capacity. Application code that needs an owned value should
continue to use `formatFloat64`.

The shortest caller-buffer variants have the same transactional contract.
Use 24 writable bytes for f64 and 16 for f32; insufficient capacity returns
zero without modifying the destination.

## Runtime properties

- No libc, native shim, C-string scan, or external package dependency.
- Parsing is allocation-free. Common values need one digit pass; cached powers
  handle unambiguous wide exponents, while rare exact fallbacks re-read the
  borrowed digits without copying them.
- Decimal integer formatting consumes two digits per loop. Radices 2/4/8/16/32
  use masks and shifts; generic radices use one division per digit.
- Owned formatting performs one final copy into a Vex-owned string;
  `formatFloat64To` writes directly into existing caller storage.
- Shortest conversion uses complete cached-power tables and native `u128`
  products; its caller-buffer forms do not allocate.
- Extreme float normalization has bounded work.
- O0 through O3 keep strict IEEE floating-point semantics; optimization level
  alone never enables relaxed math.

The 2026-08-14 M2 Max O3 parser baselines are 6.50 ns for fixed-width f64,
23.48 ns for a general exact-operand decimal, 44.71 ns for a cached-power wide
exponent, and 75.83 ns for a cached-power long decimal. A true exact halfway
fallback is 873.31 ns and is not paid by ordinary or interval-proven inputs.
Timings vary by host.

The 2026-08-25 M2 Max O3 caller-buffer shortest baselines are 17.34 ns for
f32, 21.26 ns for f64 pi, 33.17 ns for an integral f64, and 27.32 ns for the
maximum finite scientific f64. Owned f64/f32 output measured 41.09/22.43 ns.

See the package's `REFERENCE.md`, tests, and benchmarks for the complete
engineering contract.
