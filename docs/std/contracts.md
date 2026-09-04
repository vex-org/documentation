# Contracts

`std/contracts` supplies the explicit, higher-level protocols that do not
belong to the compiler-owned prelude. It has no runtime state, allocation,
I/O, FFI or platform dependency.

```vex
import { From, TryFrom, Collection, Stack } from "contracts";
```

## Conversion

- `From<T>.fromValue(value)` performs an explicit infallible construction.
- `Into<T>.intoValue(value)` consumes `Self` and produces `T`.
- `TryFrom<T>.tryFromValue(value)` returns `Result<Self, Self.Error>`.
- `TryInto<T>.tryIntoValue(value)` consumes `Self` and returns
  `Result<T, Self.Error>`.
- `Default.defaultValue()` constructs the type's explicit default.

These are static requirements. Generic code calls them through the type
parameter:

```vex
fn convert<T, U: From<T>>(value: T): U {
    return U.fromValue(value);
}
```

The compiler seals the type-parameter ordinal plus exact contract/member
identity and resolves the concrete inherent implementation during
monomorphization. There is no runtime interface object or string lookup.

Conversion contracts do not add implicit coercions. Vex's implicit conversion
rules remain constructor-driven and compiler-checked.

## Collections

- `Collection<T>` defines `len`, `isEmpty` and `clear`.
- `Growable` defines target-native capacity, minimum-capacity `reserve`, and
  `shrinkToFit`.
- `Stack<T>` composes `Collection<T> + Growable` and provides owning LIFO
  mutation plus borrowed `peek`/`peekMut`.
- `Queue<T>` composes `Collection<T> + Growable` and provides owning FIFO
  mutation plus borrowed `front`/`frontMut`.
- `Indexable<T, Idx>` composes `Collection<T>` and provides borrowed read,
  mutable borrow and replacement.

All counts and capacities use `usize`. Read APIs borrow elements rather than
forcing clones.

## Other exports

`Ordering` is the package-owned `Less | Equal | Greater` enum. `PackedType<T>`
describes block encoders/decoders suitable for SIR CPU SIMD and GPU dispatch.

Operators, formatting, lifecycle, ownership, `Iterator`, `IntoIterator` and
safety capabilities are canonical prelude contracts. They are intentionally
not re-exported here.

## Verification

The 2026-08-25 production gate passes warning-denied lint and the complete
fixture matrix at O0 and O3. See the repository's dated contracts sign-off for
the compiler and package evidence.

