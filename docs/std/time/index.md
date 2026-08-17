# `time`

`std/time` separates three concepts that must not be mixed:

| Type | Meaning | Use |
|---|---|---|
| `Time` | UTC Unix timestamp | storage, protocols, calendar and display |
| `Instant` | process-local monotonic reading | elapsed time, deadlines, timers |
| `Duration` | signed nanosecond interval | arithmetic and delays |

## Monotonic timing

```vex
import { Duration, Instant, sleep } from "time";

let started = Instant.now();
sleep(Duration.milliseconds(2));
let elapsed = started.elapsed();
```

Do not persist or transmit `Instant.asNanos()`: its epoch is process-local.
Raw `monotonicNow()` and `sleepDuration()` compatibility APIs no longer exist.

## Wall time and checked arithmetic

```vex
import { Duration, Time } from "time";

let now = Time.now();
match now.checkedAdd(Duration.seconds(30)) {
    Some(deadline) => $println(deadline.toString()),
    None => $panic("timestamp overflow"),
}
```

Default arithmetic panics on overflow. Use `checked*` for recoverable failure or
`saturating*` when clamping is the intended policy.

## Parsing

```vex
import { parse_duration, parse_rfc3339 } from "time";

let timestamp = parse_rfc3339("2024-03-15T14:30:45.123456789+03:00");
let timeout = parse_duration("2d3h4m5.006007008s");
```

RFC 3339 parsing validates civil dates, leap years, clock fields, numeric
offsets, trailing input and the exact signed-nanosecond range. Calendar
conversion is constant-time. Duration parsing supports `d`, `h`, `m`, `s`,
`ms`, `us`, `µs` and `ns` with signs and fractional components.

## Timers

`Timer` and `Ticker` use the monotonic clock. Tickers advance from their prior
phase and skip missed periods, avoiding cumulative drift. `after(Duration)`
delivers one wall-clock `Time` through a `Channel<Time>`.

## Platform behavior

The package resolves `native.macos.vxc`, `native.linux.vxc` or
`native.windows.vxc`; it has no generic native fallback. POSIX sleep resumes
after signal interruption. Windows prefers a high-resolution waitable timer.

IANA zone lookup is currently a manifest-owned native feature. A pure-Vex TZif
parser is the remaining portability milestone.

## Module map

| File | Purpose |
|---|---|
| `time_type.vx` | `Time`, calendar accessors and checked arithmetic |
| `instant.vx` | monotonic `Instant` and deadline arithmetic |
| `duration.vx` | `Duration` policies and formatting |
| `parse.vx` | RFC 3339 and Duration parsing |
| `conversions.vx` | O(1) Gregorian conversion |
| `helpers.vx` | timers, tickers and package helpers |
| `location.vx` | UTC, local, fixed and IANA locations |
| `native.*.vxc` | target-specific clock and sleep boundaries |

See [the generated API reference](./reference.md) for the complete surface.
