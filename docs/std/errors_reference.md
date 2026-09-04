# errors API reference

This page is a compact reference for the current `errors` package. For design,
ownership guidance, and examples, see [errors](./errors.md).

## ErrorKind

```vex
export enum ErrorKind impl Copy {
    Other,
    NotFound,
    PermissionDenied,
    TimedOut,
    Canceled,
    Closed,
    EndOfFile,
    InvalidInput,
    Unsupported,
    AlreadyExists,
    ConnectionRefused,
}
```

## Error

`Error` implements `Display` and `Debug`, exposes an explicit `clone()` method,
and keeps its fields private.

| API | Signature |
|---|---|
| create generic | `Error.new(message: string): Error` |
| create typed | `Error.withKind(message: string, kind: ErrorKind): Error` |
| create coded | `Error.withCode(message: string, code: i32): Error` |
| canonical typed | `Error.fromKind(kind: ErrorKind): Error` |
| add context | `(self: Error).context(message: string): Error` |
| owned message | `(&Error).message(): string` |
| borrowed message | `(&Error).messageView(): str` |
| classification | `(&Error).kind(): ErrorKind` |
| domain code | `(&Error).code(): i32` |
| immediate source | `(&Error).source(): Option<&Error>` |
| deepest source | `(&Error).rootCause(): &Error` |
| node count | `(&Error).depth(): usize` |
| semantic match | `(&Error).isKind(target: ErrorKind): bool` |
| code match | `(&Error).hasCode(target: i32): bool` |
| text search | `(&Error).containsMessage(needle: str): bool` |
| current display | `(&Error).toString(): string` |
| full display | `(&Error).renderChain(): string` |
| local copy | `(&Error).clone(): Error` |

Domain code `0` means “not supplied”; `hasCode(0)` is always false. Codes stay
on their producing node; `hasCode` traverses sources to find them.

## ErrorGroup

`ErrorGroup` implements `Display` and `Debug`, exposes `clone()`, and
represents independent failures rather than a causal chain.

| API | Signature |
|---|---|
| empty accumulator | `ErrorGroup.new(): ErrorGroup` |
| transfer vector | `ErrorGroup.fromErrors(errors: Vec<Error>): ErrorGroup` |
| add failure | `(&ErrorGroup!).push(failure: Error)` |
| count | `(&ErrorGroup).len(): usize` |
| empty check | `(&ErrorGroup).isEmpty(): bool` |
| borrowed lookup | `(&ErrorGroup).get(index: usize): Option<&Error>` |
| kind traversal | `(&ErrorGroup).isKind(target: ErrorKind): bool` |
| code traversal | `(&ErrorGroup).hasCode(target: i32): bool` |
| full display | `(&ErrorGroup).toString(): string` |
| clone outer nodes | `(&ErrorGroup).clone(): ErrorGroup` |

No compatibility aliases are provided for the removed `StdError`, sentinel,
`KIND_*`, `CODE_*`, or fixed-arity join APIs.
