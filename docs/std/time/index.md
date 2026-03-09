# time — Overview

The `time` module provides comprehensive time and date functionality, inspired by Go's `time` package with Day.js-style fluent APIs.

## Module Map

| File | Purpose |
|------|---------|
| `time_type.vx` | Core `Time` struct, calendar accessors, `startOf`/`endOf` |
| `duration.vx` | `Duration` type with arithmetic |
| `constants.vx` | `Month` and `Weekday` enums, time unit constants |
| `parse.vx` | Time string parsing (ISO 8601, RFC 3339, custom formats) |
| `format.vxc` | Time formatting with layout strings |
| `conversations.vx` | Internal date math (leap years, epoch conversion) |
| `helpers.vx` | Utility functions |
| `location.vx` | Timezone / location support |
| `native.vxc` | OS clock FFI (monotonic, wall clock) |

## Quick Start

```rust
import { Time, now, Duration, sleep, SECOND, MILLISECOND } from "time";

// Current time
let t = now();
println("Now: {t}");               // 2024-06-15T14:30:00Z
println("Unix: {t.unix()}");       // 1718458200
println("Year: {t.year()}");       // 2024
println("Month: {t.month()}");     // June
println("Weekday: {t.weekday()}"); // Saturday

// Arithmetic
let later = t.add(3600 * SECOND);
let elapsed = t.sub(earlier);

// Sleep
sleep(500 * MILLISECOND);
```
