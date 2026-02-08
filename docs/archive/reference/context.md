# Context

**Version:** 0.1.0 (Planned)  
**Last Updated:** December 2025

This document describes Vex's context system for request-scoped values, cancellation, and deadlines.

---

## Table of Contents

1. [Overview](#overview)
2. [Context Contract](#context-contract)
3. [Creating Contexts](#creating-contexts)
4. [Cancellation](#cancellation)
5. [Timeouts and Deadlines](#timeouts-and-deadlines)
6. [Context Values](#context-values)
7. [Integration with Async](#integration-with-async)
8. [Best Practices](#best-practices)

---

## Overview

The `context` module provides mechanisms for:

- **Cancellation propagation** - Cancel long-running operations across goroutines
- **Deadline management** - Set timeouts for operations
- **Request-scoped values** - Pass values through call chains without explicit parameters

Contexts form a tree structure where child contexts inherit from parents and are automatically canceled when parents are canceled.

---

## Context Contract

All context types implement the `Context` contract:

```vex
contract Context {
    // Returns channel that closes when context is done
    fn done(self): Channel<void>;

    // Returns error explaining why context was canceled
    fn err(self): Option<Error>;

    // Returns deadline if set
    fn deadline(self): Option<Instant>;

    // Returns value for key, or None
    fn value<T>(self, key: string): Option<T>;
}
```

### Methods

| Method       | Description                                                       |
| ------------ | ----------------------------------------------------------------- |
| `done()`     | Returns a channel that's closed when the context is canceled      |
| `err()`      | Returns `ErrCanceled` or `ErrTimeout` when done, `None` otherwise |
| `deadline()` | Returns the deadline instant if set                               |
| `value(key)` | Retrieves a value by key from the context chain                   |

---

## Creating Contexts

### Background Context

The root context that is never canceled. Use for main functions and tests.

```vex
import { background } from "context";

fn main(): i32 {
    let ctx = background();
    // ctx is never canceled
    runApp(ctx);
    return 0;
}
```

### Todo Context

Alias for `background()`. Use as a placeholder when you're not sure which context to use yet.

```vex
import { todo } from "context";

fn tempFunction() {
    let ctx = todo();  // TODO: Use proper context later
    doSomething(ctx);
}
```

---

## Cancellation

### withCancel

Creates a cancelable context and returns both the context and a cancel function.

```vex
import { background, withCancel } from "context";

fn withCancel(parent: Context): (Context, CancelFunc)
```

**Example:**

```vex
fn main(): i32 {
    let (ctx, cancel) = withCancel(background());

    // Start background work
    go fn() {
        doWork(ctx);
    }();

    // Cancel after some condition
    time.sleep(5 * SECOND);
    cancel();  // Signals all goroutines using ctx to stop

    return 0;
}

fn doWork(ctx: Context) {
    loop {
        select {
        case <-ctx.done():
            ("Work canceled");
            return;
        default:
            // Do actual work
            processNextItem();
        }
    }
}
```

### Cancellation Propagation

When a parent context is canceled, all child contexts are automatically canceled:

```vex
let (parentCtx, parentCancel) = withCancel(background());
let (childCtx, childCancel) = withCancel(parentCtx);

parentCancel();  // Both parentCtx and childCtx are now done
```

---

## Timeouts and Deadlines

### withTimeout

Creates a context that automatically cancels after a duration.

```vex
fn withTimeout(parent: Context, timeout: Duration): (Context, CancelFunc)
```

**Example:**

```vex
import { background, withTimeout } from "context";
import { SECOND } from "time";

fn fetchData(ctx: Context): Result<Data, Error> {
    // Create 30-second timeout
    let (ctx, cancel) = withTimeout(ctx, 30 * SECOND);
    defer cancel();  // Always call cancel to release resources

    return http.get(ctx, "https://api.example.com/data");
}
```

### withDeadline

Creates a context that cancels at a specific time.

```vex
fn withDeadline(parent: Context, deadline: Instant): (Context, CancelFunc)
```

**Example:**

```vex
import { background, withDeadline } from "context";
import { now } from "time";

fn processUntilMidnight(ctx: Context) {
    let midnight = now().truncate(DAY).add(DAY);
    let (ctx, cancel) = withDeadline(ctx, midnight);
    defer cancel();

    // Work until midnight
    while !isDone(ctx) {
        processItem();
    }
}
```

### Checking Deadline

```vex
fn checkDeadline(ctx: Context) {
    if let Some(deadline) = ctx.deadline() {
        let remaining = time.until(deadline);
        (f"Time remaining: {remaining}ns");
    }
}
```

---

## Context Values

### withValue

Attaches a key-value pair to a context.

```vex
fn withValue<T>(parent: Context, key: string, value: T): Context
```

**Example:**

```vex
import { background, withValue } from "context";

// Middleware adds user to context
fn authMiddleware(ctx: Context, req: Request): Context {
    let user = authenticate(req);
    return withValue(ctx, "user", user);
}

// Handler retrieves user from context
fn handleRequest(ctx: Context, req: Request): Response {
    let user: User = ctx.value("user").expect("user required");
    return Response.json(getUserData(user));
}
```

### Value Lookup

Values are looked up through the context chain:

```vex
let ctx1 = withValue(background(), "key", "value1");
let ctx2 = withValue(ctx1, "key", "value2");

ctx1.value("key");  // Some("value1")
ctx2.value("key");  // Some("value2") - shadows parent
```

### Type Safety

```vex
// Store typed value
let ctx = withValue(background(), "requestId", 12345 as i64);

// Retrieve with correct type
let requestId: i64 = ctx.value("requestId").unwrap();

// Wrong type returns None
let wrongType: string = ctx.value("requestId");  // None
```

---

## Integration with Async

### Async Functions

```vex
async fn fetchWithContext(ctx: Context, url: string): Result<Response, Error> {
    select {
    case response = await http.get(url):
        return Ok(response);
    case <-ctx.done():
        return Err(ctx.err().unwrapOr(errors.ErrCanceled));
    }
}
```

### Parallel Operations

```vex
async fn fetchAll(ctx: Context, urls: []string): Result<[]Response, Error> {
    let! results: []Response = [];

    for url in urls {
        // Check before each operation
        if isDone(ctx) {
            return Err(errors.ErrCanceled);
        }

        let resp = await fetchWithContext(ctx, url)?;
        results.(resp);
    }

    return Ok(results);
}
```

### Goroutines

```vex
fn startWorkers(ctx: Context, count: i32) {
    for let i = 0; i < count; i++ {
        go fn() {
            worker(ctx, i);
        }();
    }
}

fn worker(ctx: Context, id: i32) {
    loop {
        select {
        case <-ctx.done():
            (f"Worker {id} stopping");
            return;
        default:
            doWork(id);
        }
    }
}
```

---

## Helper Functions

### isDone

Non-blocking check if context is done.

```vex
fn isDone(ctx: Context): bool
```

```vex
if isDone(ctx) {
    return Err(errors.ErrCanceled);
}
```

### wait

Blocks until context is done.

```vex
fn wait(ctx: Context)
```

```vex
// Block until canceled
wait(ctx);
("Context canceled");
```

### cause

Get the cancellation error.

```vex
fn cause(ctx: Context): Option<Error>
```

```vex
if let Some(err) = cause(ctx) {
    if is(err, errors.ErrTimeout) {
        ("Operation timed out");
    }
}
```

---

## Best Practices

### 1. Always Pass Context as First Parameter

```vex
// Good
fn fetchUser(ctx: Context, id: i32): Result<User, Error>

// Bad
fn fetchUser(id: i32, ctx: Context): Result<User, Error>
```

### 2. Always Call Cancel

```vex
// Good: Use defer to ensure cancel is called
let (ctx, cancel) = withTimeout(parentCtx, 30 * SECOND);
defer cancel();
doWork(ctx);

// Bad: Cancel might not be called on error
let (ctx, cancel) = withTimeout(parentCtx, 30 * SECOND);
doWork(ctx);  // If this fails, cancel() is never called
cancel();
```

### 3. Don't Store Context in Structs

```vex
// Bad: Context stored in struct
struct Service {
    ctx: Context,
}

// Good: Pass context to methods
struct Service {}

impl Service {
    fn fetch(self, ctx: Context): Result<Data, Error> {
        // Use ctx parameter
    }
}
```

### 4. Use Short Timeouts for External Calls

```vex
// Good: Reasonable timeout for HTTP call
let (ctx, cancel) = withTimeout(ctx, 30 * SECOND);
defer cancel();
http.get(ctx, url);

// Bad: No timeout - could hang forever
http.get(ctx, url);
```

### 5. Check Context in Loops

```vex
// Good: Check context each iteration
for item in items {
    if isDone(ctx) {
        return Err(errors.ErrCanceled);
    }
    process(item);
}

// Bad: Never checks for cancellation
for item in items {
    process(item);  // Runs even if context is canceled
}
```

### 6. Use Background for Tests and Main

```vex
fn main(): i32 {
    let ctx = background();
    runApp(ctx);
    return 0;
}

fn testMyFunction() {
    let ctx = background();
    // Test code...
}
```

---

## API Reference

### Types

| Type         | Description                           |
| ------------ | ------------------------------------- |
| `Context`    | Contract for all context types        |
| `CancelFunc` | `fn()` - Function to cancel a context |

### Functions

| Function       | Signature                                      | Description                  |
| -------------- | ---------------------------------------------- | ---------------------------- |
| `background`   | `fn(): Context`                                | Root context, never canceled |
| `todo`         | `fn(): Context`                                | Alias for background()       |
| `withCancel`   | `fn(Context): (Context, CancelFunc)`           | Cancelable context           |
| `withTimeout`  | `fn(Context, Duration): (Context, CancelFunc)` | Context with timeout         |
| `withDeadline` | `fn(Context, Instant): (Context, CancelFunc)`  | Context with deadline        |
| `withValue`    | `fn<T>(Context, string, T): Context`           | Context with value           |
| `isDone`       | `fn(Context): bool`                            | Non-blocking done check      |
| `wait`         | `fn(Context)`                                  | Blocking wait until done     |
| `cause`        | `fn(Context): Option<Error>`                   | Get cancellation error       |

### Errors

| Error                | Description               |
| -------------------- | ------------------------- |
| `errors.ErrCanceled` | Context was canceled      |
| `errors.ErrTimeout`  | Context deadline exceeded |

---

**Previous**: [23_Operator_Overloading.md](./23_Operator_Overloading.md)  
**Next**: [99_BUILTINS.md](./99_BUILTINS.md)

**Maintained by**: Vex Language Team
