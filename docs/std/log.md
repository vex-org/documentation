# `log` — typed structured logging

`std/log` provides immutable contextual loggers, typed fields, dynamic level
control and synchronized persistent destinations. A rejected record returns
before reading the clock or allocating its formatting buffer.

## Quick start

```vex
import { Format, Level, Logger, field } from "log";

let logger = Logger.stderr(Level.Info)
    .withFormat(Format.Json)
    .withService("checkout".toString());

let fields = [
    field("order_id".toString(), 42 as u64),
    field("cached".toString(), false),
];

match logger.info("order accepted", &fields[0..2]) {
    Ok(_) => { /* complete record written */ }
    Err(err) => { /* apply the application's I/O failure policy */ }
}
```

JSON output is one complete object per line:

```json
{"time":"2026-08-17T12:34:56.789Z","level":"INFO","msg":"order accepted","service":"checkout","order_id":42,"cached":false}
```

## Levels and destinations

Levels are ordered `Level.Trace`, `Debug`, `Info`, `Warn`, `Error`, and `Off`.
`Off` rejects every record.

| Constructor | Destination |
|---|---|
| `Logger.new(level)` | stderr |
| `Logger.stderr(level)` | stderr |
| `Logger.stdout(level)` | stdout |
| `Logger.file(path, level)` | one persistent append descriptor |
| `Logger.discard()` | disabled sink |

`Logger.file` returns `Result<Logger, IoError>`. It opens the destination once;
clones share that descriptor and serialize complete records through one lock.

```vex
let logger = match Logger.file("service.log".toString(), Level.Debug) {
    Ok(value) => value.withFormat(Format.Json),
    Err(err) => $panic("could not open log file"),
};
```

## Typed fields

`field` overloads accept `bool`, `i64`, `u64`, `f64`, and owned `string`.
`nullField` emits null. `group` creates a nested structured object rather than
flattening keys into text.

```vex
import { field, group, nullField } from "log";

let requestFields = [
    field("method".toString(), "GET".toString()),
    field("status".toString(), 200 as i64),
    nullField("error".toString()),
];
let fields = [group("request".toString(), &requestFields[0..3])];

let result = logger.info("request complete", &fields[0..1]);
```

Retained string fields are owned. A derived logger never keeps a borrow into a
request buffer after that buffer's lifetime.

## Immutable context and groups

Builder methods consume and return a logger. Clone a base logger when deriving
independent contextual children:

```vex
let common = [field("region".toString(), "eu-west".toString())];
let base = Logger.stderr(Level.Info).withFields(&common[0..1]);

let requestLogger = base.clone()
    .withGroup("request".toString())
    .withTraceparent(
        "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
    );
```

Available derivations:

- `withFormat(Format.Text | Format.Json)`;
- `withTimestamp(bool)`;
- `withFields(&[Field])` and `withGroup(string)`;
- `withService(string)`;
- `withTrace(traceId, spanId)`;
- `withTraceparent(str)` for canonical W3C trace context;
- `withLevelSwitch(LevelSwitch)`.

Invalid, uppercase, future-version or all-zero traceparent identifiers leave
the logger unchanged.

## Dynamic filtering

`LevelSwitch` is shared across all loggers derived from it. Updates use
acquire/release atomics and do not rebuild logger context.

```vex
import { LevelSwitch } from "log";

let levels = LevelSwitch.new(Level.Info);
let logger = Logger.stderr(Level.Info)
    .withLevelSwitch(levels.clone());

levels.set(Level.Debug);
```

Use `logger.enabled(level)` before constructing application-level expensive
fields. The logger performs its own second check before clock/format work.

## Emission API

Convenience methods `trace`, `debug`, `info`, `warn`, and `err` have
message-only and message-plus-fields overloads. Every method returns
`Result<(), IoError>`.

`log(level, message, fields)` selects a level explicitly. `logAt` also accepts
a supplied `Time`, which is useful for replay and imported events.

Source metadata is explicit and compile-time discoverable:

```vex
import { Field, Source } from "log";

let source = Source.new(
    #Source.fileName().toString(),
    #Source.module().toString(),
    #Source.line(),
    #Source.column(),
);
let fields: [Field; 0] = [];
let result = logger.log(Level.Error, "request failed", &fields[0..0], &source);
```

This avoids an opaque runtime stack walk. `formatRecordAt` is available for
deterministic custom formatting and tests.

## Flush and close

`flush()` forwards to the destination. `close()` closes a file destination at
most once across all clones; stdout, stderr, and discard remain process-owned.
Later writes through a closed file logger return the canonical `IoError`.

The package is intentionally synchronous. Async batching, sampling, rotation,
and telemetry export require explicit loss/backpressure and lifecycle policies;
they are not hidden behind a process-global logger.

## Performance baseline

M2 Max, O3, 200 ms:

| Operation | Result |
|---|---:|
| disabled level check | 1.62 ns |
| disabled record | 2.10 ns |
| empty JSON record | 275.60 ns |
| JSON record with six fields | 408.85 ns |
| text record with six fields | 414.88 ns |

Formatting measurements include the returned owned string allocation; they do
not include destination I/O.
