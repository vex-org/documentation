# CSV (`serde/csv`)

CSV exposes `parseCsv`, `parseCsvSafe`, `parseCsvWithLimits`, `CsvParser`,
`CsvDocument`, `CsvSerializer` and `CsvDecoder`.

```vex
import { parseCsv } from "serde/csv";

let document = parseCsv("name,age\nAda,36\nGrace,37", true);
let name = document.getField(0, "name").or("");
$println(name);
```

`parseCsv(input, has_headers)` borrows a `str` and returns an owning document.
`getRow` performs
indexed row lookup; `getField` resolves a column by the parsed header. The
current regression matrix covers header and no-header input, comma-containing
quoted fields, escaped quotes and CRLF records.

`CsvSerializer` and `CsvDecoder` implement the common serde contracts for
explicit row-oriented codec use. There is no exported generic `encode` or
`decode` convenience function.

The safe path validates UTF-8 and RFC-style quoting, rejects garbage after a
closing quote and ragged rows, and enforces input/field/row/column/node budgets
before allocating output. Quoted fields allocate their exact decoded length and
row vectors reserve exact column capacity.

The 2026-08-26 M2 Max O3 opaque-input baseline measured short trusted parse at
338 ns / 124 MB/s, safe parse at 403 ns / 104 MB/s, quoted parse at 248 ns /
173 MB/s and a 51-row input at 6.28 us / 183 MB/s. All reported parses used the
bounded benchmark arena and recorded 0 process-heap allocations per operation.

Complete RFC 4180 differential coverage, configurable dialects and a streaming
record reader remain promotion work.
