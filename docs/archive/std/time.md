# Standard Library: Time

Utilities for tracking time and duration.

## Functions

### `now`
```vex
fn now(): i64
```
Returns the current Unix timestamp in seconds.

### `high_res`
```vex
fn high_res(): i64
```
Returns a high-resolution monotonically increasing timestamp (in nanoseconds). Useful for benchmarking.

### `sleep_ms`
```vex
fn sleep_ms(ms: i64)
```
Suspends the current thread (or goroutine) for the specified number of milliseconds.

## Examples

```vex
import * as time from "time";

fn main() {
    let start = time.high_res();
    time.sleep_ms(100);
    let end = time.high_res();
    
    let duration_ns = end - start;
    println(f"Slept for {duration_ns} ns");
}
```
