# Time & Duration API

## `Time` Struct

Internal representation: nanoseconds since Unix epoch (`i64`).

### Constructors

| Function | Description |
|----------|-------------|
| `now()` | Current wall-clock time |
| `Time { ns: value }` | From raw nanoseconds |

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

### Arithmetic

```rust
let t2 = t.add(duration_ns);    // Add nanoseconds → new Time
let diff = t1.sub(t2);          // Subtract → i64 nanoseconds

// Free function variants
let t3 = add(t, duration);      // Time + Duration → Time
let d = sub(t1, t2);            // Time - Time → Duration
```

### Fluent API (Day.js Style)

Truncate or round time to boundaries:

```rust
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

```rust
println("{t}");  // ISO 8601: "2024-06-15T14:30:00Z"
```

## `Duration` Struct

| Method | Description |
|--------|-------------|
| `Duration { ns: i64 }` | Create from nanoseconds |
| `.ns` | Raw nanosecond value |

### Time Constants

```rust
import { NANOSECOND, MICROSECOND, MILLISECOND, SECOND, MINUTE, HOUR } from "time";

sleep(500 * MILLISECOND);
let timeout = 30 * SECOND;
let interval = 1 * HOUR;
```

## Parsing

```rust
import { parse } from "time";

let t = parse("2024-06-15T14:30:00Z");     // ISO 8601
let t = parse("2024-06-15 14:30:00");       // Common format
```

## Enums

```rust
enum Month { January, February, ..., December }
enum Weekday { Sunday, Monday, ..., Saturday }
```
