# context — request lifetime and cancellation

`context` carries cooperative cancellation, monotonic deadlines and small
request metadata through a call tree. Contexts are immutable persistent
handles: deriving a child never mutates its parent or siblings.

```vex
import { Context } from "context";
import { Error, ErrorKind } from "errors";
import { Duration } from "time";

fn serve(request: &Context): Result<string, Error> {
    match request.check() {
        Result.Err(cause) => return Result.Err(cause),
        Result.Ok(_) => { /* continue */ },
    }

    match request.valueStringView("request-id") {
        Some(id) => return Result.Ok("request " + id),
        None => return Result.Ok("anonymous request"),
    }
}

let root = Context.background();
let timed = root.withTimeout(Duration.seconds(5));
let request = timed.withValue("request-id", "req-42");
let result = serve(&request);
```

## Roots and derivation

```vex
let root = Context.background();
let placeholder = Context.todo();

let absolute = root.withDeadline(deadline); // deadline: Instant
let relative = root.withTimeout(Duration.milliseconds(250));
let tagged = relative.withValue("attempt", 3 as i64);
```

`Context.todo()` behaves like a background root but remains distinguishable
through `kind()` for diagnostics. `withDeadline` accepts an absolute monotonic
`Instant`; wall-clock `Time` and raw Unix timestamps cannot be mixed into this
API. An earlier inherited deadline always wins.

Deadline creation does not spawn a timer or thread. Consumers observe expiry
at `isDone()`, `cause()`, `check()` or `remaining()` calls.

## Cancellation

```vex
let root = Context.background();
let (request, cancel) = root.withCancelCause(
    Error.withKind("server shutdown", ErrorKind.Closed),
);

// Pass `request` or a clone to workers.
let first = cancel.cancel();  // true: this caller published the event
let again = cancel.cancel();  // false: cancellation is idempotent

$assert(request.isDone(), "worker must observe cancellation");
match request.cause() {
    Some(cause) => $println(cause.messageView()),
    None => $panic("missing cancellation cause"),
}
```

`CancelHandle.cancel()` is thread-safe. Exactly one concurrent caller publishes
the event; other callers return only after the timestamp and immutable typed
cause are visible. Child cancellation and parent cancellation remain separate
events. `cause()` returns whichever cancellation or deadline occurred first.

`withCancel()` is the convenience form using `ErrorKind.Canceled`.

## Cooperative checkpoints

Use `check()` at meaningful boundaries in request handlers and long-running
loops:

```vex
let! offset = 0 as usize;
while offset < input.len() {
    match request.check() {
        Result.Err(cause) => return Result.Err(cause),
        Result.Ok(_) => { /* process the next bounded chunk */ },
    }
    offset = offset + processChunk(input, offset);
}
```

`check()` returns the same typed `Error` as `cause()`. It does not panic, block,
allocate a notification channel or introduce a scheduler dependency.

## Values

The current safe value surface supports `i64` and owned `string` entries:

```vex
let first = root.withValue("attempt", 0 as i64);
let second = first.withValue("request-id", "req-42");

match second.valueI64("attempt") {
    Some(value) => $assert(value == 0, "zero is a valid value"),
    None => $panic("attempt missing"),
}

let borrowed: Option<str> = second.valueStringView("request-id");
let owned: Option<string> = second.valueString("request-id");
```

Absence is always `None`; integer zero and an empty string are ordinary values.
`valueStringView` is allocation-free and tied to the context borrow.
`valueString` returns an owned copy.

Values are for shallow cross-cutting metadata, not application state or
dependency injection. Arbitrary typed payloads are intentionally unavailable
until Vex has safe existential storage, exact generic drop glue and borrowed
downcasting. Use an explicit typed request struct for domain data.

## Cost model

Each derivation creates one persistent node in the active request arena.
Cloning a handle shares the chain through VUMM; developers never select or
manage `Rc`/`Arc`.

Cancellation state and request values use separate persistent chains. Every
node caches its effective deadline and nearest cancellation state, so adding
value nodes does not slow down polling.

M2 Max O3 medians (500 ms, three runs, 2026-08-17):

| Operation | Median |
|---|---:|
| context clone | 7.88 ns |
| cancelable child creation and publication | 95.13 ns |
| active cancellation poll | 2.13 ns |
| active poll below 256 value nodes | 2.08 ns |
| cooperative `check` below 256 value nodes | 4.84 ns |
| cached deadline lookup below 256 value nodes | 1.27 ns |
| latest value lookup at depth 256 | 4.82 ns |
| oldest value lookup at depth 256 | 1.65 us |

Value lookup is newest-to-oldest and O(depth). Keep metadata chains shallow;
the 256-node row is an explicit adversarial regression baseline.

## API summary

| API | Meaning |
|---|---|
| `Context.background()` / `Context.todo()` | Create a root |
| `withCancel()` / `withCancelCause(error)` | Derive a cancelable child and handle |
| `withDeadline(Instant)` / `withTimeout(Duration)` | Derive a monotonic deadline |
| `isDone()` | Cheap boolean poll |
| `cause()` / `check()` | Retrieve or propagate the typed earliest cause |
| `deadline()` / `timeout()` / `remaining()` | Inspect effective timing |
| `withValue(key, i64|string)` | Add persistent metadata |
| `valueI64`, `valueString`, `valueStringView` | Typed lookup |
| `containsKey` / `kind` | Metadata and diagnostic inspection |

The source distribution includes a generated `lib/std/context/REFERENCE.md`
with complete signatures.
