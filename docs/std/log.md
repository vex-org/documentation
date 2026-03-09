# log — Structured Logging

Simple, leveled logging with ANSI color output.

## Log Levels

| Level | Value | Color | Use Case |
|-------|-------|-------|----------|
| `DEBUG` | 0 | Gray | Development details |
| `INFO` | 1 | Green | Normal operation messages |
| `WARN` | 2 | Yellow | Potential problems |
| `ERROR` | 3 | Red | Failures requiring attention |

## Quick Start (Global Functions)

```rust
import { debug, info, warn, err } from "log";

debug("Cache hit for key=user:42");
info("Server started on :8080");
warn("Connection pool at 90% capacity");
err("Failed to write to disk");
```

Output:
```
[90m[DEBUG]: Cache hit for key=user:42
[32m[INFO ]: Server started on :8080
[33m[WARN ]: Connection pool at 90% capacity
[31m[ERROR]: Failed to write to disk
```

## Instance-Based Logger

For scoped logging with minimum level filtering:

```rust
import { Logger, newLogger, INFO, WARN } from "log";

let logger = newLogger(WARN);  // Only WARN and ERROR

logger.debug("Ignored");    // Filtered (below WARN)
logger.info("Ignored");     // Filtered
logger.warn("Disk space below 10%");    // ✅ Printed
logger.err("Out of memory");            // ✅ Printed

println("Logger level: {logger.getLevel()}");  // 2
```

## API

| Method | Description |
|--------|-------------|
| `newLogger(level)` | Create logger with minimum level |
| `.debug(msg)` | Log at DEBUG level |
| `.info(msg)` | Log at INFO level |
| `.warn(msg)` | Log at WARN level |
| `.err(msg)` | Log at ERROR level |
| `.getLevel()` | Get current minimum level |
