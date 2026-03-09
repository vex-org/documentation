# context — Request-Scoped Context

Go-style context propagation for cancellation signals, deadlines, timeouts, and request-scoped values through call chains.

## Background Context

```rust
import { background, todo, withCancel, withTimeout, withValue } from "context";

// Root context (never canceled)
let ctx = background();

// Placeholder (for WIP code)
let ctx = todo();
```

## Cancellation

```rust
import { withCancel, cancel, isDone, isCanceled } from "context";

let! ctx = withCancel(background());

// Pass ctx to workers...
cancel(&ctx);

isDone(ctx);      // → true
isCanceled(ctx);  // → true
cause(ctx);       // → "context canceled"
```

## Timeouts & Deadlines

```rust
import { withTimeout, withDeadline, second, millis } from "context";

// Cancel after 5 seconds
let! ctx = withTimeout(background(), 5 * second());

// Cancel at specific deadline (nanoseconds)
let! ctx = withDeadline(background(), deadlineNs);

isTimeout(ctx);       // → true (after timeout fires)
getTimeout(ctx);      // → original timeout duration
remainingTime(ctx);   // → nanoseconds remaining
```

## Request-Scoped Values

```rust
import { withValue, withValueStr, getValue, getValueStr } from "context";

let ctx = withValue(background(), "request_id", 42);
let ctx = withValueStr(ctx, "user", "alice");

getValue(ctx, "request_id");     // → 42
getValueStr(ctx, "user");        // → "alice"
hasValue(ctx, "request_id");     // → true
```

## Duration Helpers

| Function | Value |
|----------|-------|
| `nanosecond()` | 1 ns |
| `microsecond()` | 1,000 ns |
| `millisecond()` | 1,000,000 ns |
| `second()` | 1,000,000,000 ns |
| `minute()` | 60 × second |
| `hour()` | 3,600 × second |
| `seconds(n)` / `millis(n)` / `minutes(n)` / `hours(n)` | Conversion helpers |
