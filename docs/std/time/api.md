# Time & Duration API

## `Time` Struct

Internal representation: nanoseconds since Unix epoch (`i64`).

### Constructors

| Function | Description |
|----------|-------------|
| `now()` | Current wall-clock time |
| `Time { ns: value }` | From raw nanoseconds |

`Time.now()` and `now()` use the same target-selected VexArch wall clock.
Valid pre-1970 readings remain negative, and native failures or timestamps
outside the signed `i64` nanosecond range terminate with a runtime diagnostic.
They never silently return the epoch or wrap into a different date. Wall time
can move backwards after system-clock corrections; use `Instant.now()` for
elapsed-time measurement and deadlines.

`Instant.now()` also uses the shared VexArch provider, including its checked
monotonic conversion and Windows frequency cache. Linux clock reads do not
require libc `clock_gettime`. Blocking sleep also uses the runtime directly;
only timezone operations retain their separate native requirements here.
No application-facing clock configuration is needed.

### Calendar Accessors

| Method | Return | Description |
|--------|--------|-------------|
| `.year(): i64` | `2024` | Year |
| `.month(): Month` | `Month.June` | Month enum |
| `.day(): i64` | `15` | Day of month |
| `.hour(): i64` | `14` | Hour (0–23) |
| `.minute(): i64` | `30` | Minute (0–59) |
| `.second(): i64` | `0` | Second (0–59) |
| `.weekday(): Weekday` | `Weekday.Saturday` | Day of week |

### Unix Representations

| Method | Description |
|--------|-------------|
| `.unix(): i64` | Seconds since epoch |
| `.unixNano(): i64` | Nanoseconds since epoch |
| `.unixMilli(): i64` | Milliseconds since epoch |
| `.unixMicro(): i64` | Microseconds since epoch |
| `.nanosecond(): i64` | Nanosecond component within the current second (`0..999_999_999`) |

Unix conversion methods use floor semantics for instants before 1970. For
example, an instant 500 ms before the epoch has `unix() == -1`,
`unixMilli() == -500`, and `nanosecond() == 500_000_000`.

### Arithmetic

```vex
let t2 = t.add(duration_ns);    // Add nanoseconds → new Time
let diff = t1.sub(t2);          // Subtract → i64 nanoseconds

// Free function variants
let t3 = add(t, duration);      // Time + Duration → Time
let d = sub(t1, t2);            // Time - Time → Duration
```

### Fluent API (Day.js Style)

Truncate or round time to boundaries:

```vex
let t = now();

// Start of day (midnight)
let dayStart = t.startOf("day");

// End of current hour
let hourEnd = t.endOf("hour");

// Start of month
let monthStart = t.startOf("month");
```

Supported units: `"year"` / `"y"`, `"month"` / `"M"`, `"day"` / `"d"`, `"hour"` / `"h"`, `"minute"` / `"m"`, `"second"` / `"s"`

### Formatting

```vex
println("{t}");  // ISO 8601: "2024-06-15T14:30:00Z"
```

## `Duration` Struct

| Method | Description |
|--------|-------------|
| `Duration { ns: i64 }` | Create from nanoseconds |
| `.ns` | Raw nanosecond value |

### Time Constants

```vex
import { NANOSECOND, MICROSECOND, MILLISECOND, SECOND, MINUTE, HOUR } from "time";

sleep(500 * MILLISECOND);
let timeout = 30 * SECOND;
let interval = 1 * HOUR;
```

## Blocking sleep

`sleep(nanoseconds: i64)` and `sleep(duration: Duration)` share VexArch’s
target-selected sleeper. Zero and negative durations return immediately without
yielding. This blocking API is distinct from scheduler `await sleep(...)`.

On Linux, the runtime uses an absolute monotonic `clock_nanosleep` syscall
without libc. On macOS, interrupted `nanosleep` calls retry only the time left
until the original monotonic deadline. Windows uses a one-shot waitable timer,
rounding positive durations upward to 100 ns ticks; it does not clip long
durations to a 32-bit millisecond timeout. A kernel that rejects the
high-resolution timer flag is retried with the standard timer flag.

Native failure or deadline overflow emits a runtime diagnostic and terminates
with exit status 70 instead of pretending that time elapsed. Operating-system
scheduling can delay the wake; no real-time scheduling guarantee is implied.

## Parsing

```vex
import { parse } from "time";

let t = parse("2024-06-15T14:30:00Z");     // ISO 8601
let t = parse("2024-06-15 14:30:00");       // Common format
```

## Enums

```vex
enum Month { January, February, ..., December }
enum Weekday { Sunday, Monday, ..., Saturday }
```
