# errors

`errors` is Vex's owned diagnostic layer for adding context across abstraction
boundaries. Prefer a precise `Result<T, E>` and a domain error enum inside a
library. Convert to `Error` when an API needs one dynamic, inspectable error
type.

The package is platform-independent and freestanding: it imports no libc, OS,
I/O, or native ABI surface.

## Typed construction

Messages are presentation. Stable program logic uses `ErrorKind` or an explicit
domain code; changing message wording never changes identity.

```vex
import { Error, ErrorKind } from "errors";

let missing = Error.withKind("config.toml is absent", ErrorKind.NotFound);
let protocol = Error.withCode("peer rejected the frame", 731);
let generic = Error.new("operation failed");

if missing.isKind(ErrorKind.NotFound) {
    // recover
}
```

`Error.fromKind(kind)` creates the canonical default message for a kind. The
available kinds are `Other`, `NotFound`, `PermissionDenied`, `TimedOut`,
`Canceled`, `Closed`, `EndOfFile`, `InvalidInput`, `Unsupported`,
`AlreadyExists`, and `ConnectionRefused`.

## Context and causal chains

`context` consumes the old error and adds one owned outer node. It performs one
box allocation, does not clone the existing tail, and does not copy already
rendered messages.

```vex
let failure = Error.withKind("disk full", ErrorKind.EndOfFile)
    .context("write audit log")
    .context("serve request");

$println("{}", failure.messageView()); // serve request
$println("{}", failure.depth());       // 3
$println("{}", failure.renderChain());
```

`messageView(): str`, `source(): Option<&Error>`, and `rootCause(): &Error`
borrow without allocation. `message(): string` deliberately returns an owned
copy. `clone()` copies the local node and VUMM-shares the immutable source
chain, so it is O(1) regardless of causal depth.

`toString()` formats only the current layer. `renderChain()` formats all layers
once:

```text
serve request
caused by: write audit log
caused by: disk full
```

`isKind` and `hasCode` inspect the complete chain. A domain code remains on
the node that produced it: a contextual wrapper displays its own message while
`hasCode` can still find the lower-level code. `containsMessage` is only a
text-search helper and must not drive recovery logic.

## Independent failures

Use `ErrorGroup` when several operations fail independently. A group owns a
vector of complete `Error` chains; it never flattens messages or invents a
cause relationship.

```vex
import { Error, ErrorGroup, ErrorKind } from "errors";

let! failures = ErrorGroup.new();
failures.push(Error.withKind("config missing", ErrorKind.NotFound));
failures.push(Error.withCode("backend refused", 731).context("save user"));

if failures.isKind(ErrorKind.NotFound) {
    // at least one retained chain has this kind
}

match failures.get(1) {
    Some(failure) => $println("{}", failure.renderChain()),
    None => { }
}
```

`ErrorGroup.fromErrors(Vec<Error>)` transfers an existing vector without
cloning. `get` borrows; group cloning copies the independent outer nodes and
shares their immutable causal tails.

## API summary

| Type/API | Ownership and cost |
|---|---|
| `Error.new`, `withKind`, `withCode`, `fromKind` | create one owned node |
| `Error.context` | consumes the source; one box allocation |
| `messageView`, `source`, `rootCause` | borrowed, zero allocation |
| `message`, `toString` | return an owned string |
| `renderChain` | O(total message bytes + depth) rendering |
| `clone` | O(1) local copy; VUMM-shared immutable source chain |
| `isKind`, `hasCode`, `containsMessage` | O(depth) inspection |
| `ErrorGroup.new`, `fromErrors`, `push` | owned independent failures |
| `ErrorGroup.get` | borrowed indexed lookup |
| `ErrorGroup.isKind`, `hasCode` | traverse every retained chain |

The former `StdError`, sentinel constructors, integer `KIND_*` helpers,
message-derived identity, and fixed-arity `join2`/`join3` APIs were removed.
They exposed storage, cloned causal chains, or destroyed structure.

## Current validation status

Focused executable tests pass at O0 and O3 (10/10) and the package is
lint-clean. The bounded O3 clone benchmark for a 64-source error is 5.38 ns on
the current Apple Silicon host. Current sign-off is tracked in
`docs/std/errors_SIGNOFF_2026-08-23.md` in the compiler repository.
