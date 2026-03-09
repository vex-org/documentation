# errors — Go-Style Error Handling

Structured error creation, wrapping, inspection, and comparison. Inspired by Go's `errors` package with sentinel errors and `Is()`/`As()` patterns.

## Creating Errors

```rust
import { newError, newErrorCode, newErrorKind, StdError } from "errors";

let e = newError("file not found");                // Simple message
let e = newErrorCode("timeout", CODE_TIMEOUT());   // With error code
let e = newErrorKind("denied", KIND_PERMISSION_DENIED()); // With semantic kind
```

## Error Wrapping (Go 1.13+)

Add context to errors while preserving the original cause:

```rust
import { wrap, wrapf, unwrapMsg } from "errors";

let original = newError("connection refused");
let wrapped = wrap(original, "failed to connect to database");
// wrapped.msg = "failed to connect to database"
// wrapped retains original error code

let innerMsg = unwrapMsg(wrapped);
```

## Error Comparison (`Is` / `Equals`)

```rust
import { is, equals, hasCode } from "errors";

let e = ErrNotFound();

is(e, CODE_NOT_FOUND());      // → true (match by code)
equals(e, ErrNotFound());     // → true (match by code + message)
hasCode(e, 1);                // → true
```

## Sentinel Errors

Pre-defined common errors for fast comparison:

| Constructor | Message | Code |
|-------------|---------|------|
| `ErrNotFound()` | `"not found"` | 1 |
| `ErrPermission()` | `"permission denied"` | 2 |
| `ErrTimeout()` | `"timeout"` | 3 |
| `ErrCanceled()` | `"canceled"` | 4 |
| `ErrClosed()` | `"closed"` | 5 |
| `ErrEOF()` | `"EOF"` | 6 |
| `ErrInvalidArg()` | `"invalid argument"` | 7 |
| `ErrNotSupported()` | `"not supported"` | 8 |
| `ErrExists()` | `"already exists"` | 9 |
| `ErrConnRefused()` | `"connection refused"` | 10 |

## Error Joining (Go 1.20+)

```rust
import { join2, join3 } from "errors";
let combined = join2(err1, err2);   // Merge two errors
let combined = join3(e1, e2, e3);   // Merge three errors
```

## Inspection

| Function | Description |
|----------|-------------|
| `getMessage(err)` | Get error message |
| `getCode(err)` | Get error code |
| `getKind(err)` | Get semantic kind |
| `isWrapped(err)` | Check if error wraps another |
| `toString(err)` | String representation |
