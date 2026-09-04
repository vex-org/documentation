# TOML (`serde/toml`)

The TOML module provides the `TomlValue` dynamic tree, `TomlParser`,
`TomlSerializer` and `TomlDecoder`. The current public parsing helper is
`parseDynamic`, `parseDynamicSafe` and `parseDynamicWithLimits`; there is no
exported generic `encode` or `decode` helper. The root facade exposes the safe
forms as `parseTomlSafe` and `parseTomlWithLimits`.

```vex
import { parseDynamicSafe } from "serde/toml";

match parseDynamicSafe("[server]\nhost = \"127.0.0.1\"\nport = 8080") {
    Ok(document) => {
        match document.get("server") {
            Some(server) => match server.get("port") {
                Some(port) => { $println(port.asInteger()); }
                None => {}
            },
            None => {}
        }
    }
    Err(failure) => { $println(failure.message()); }
}
```

The tested surface includes basic values, arrays, inline tables, nested table
preservation, exponent and special floating-point forms, and escaped strings.
`TomlValue` also exposes type predicates, scalar accessors, `get`, `at`, `len`
and `toString`.

On the 2026-08-21 Apple M2 Max O3 gate, simple parsing measured about 757 ns,
nested-table parsing 1.306 us, struct serialization 106.8 ns and struct decoding
119.9 ns. The ownership-aware path moves parsed key strings directly into Map
storage and traverses the active table without an absolute-path clone Vec. The
three-round long-document median is 5.409 us with 0 B/op and 0 process-heap
allocations.

The safe API validates UTF-8, syntax, integer overflow, floating-point
representability and `DecodeLimits` before allocating the tree. Multiline
strings and array-of-table headers currently return `UnsupportedValue`; they
are never silently reinterpreted. Malformed trusted input is also guaranteed to
make forward progress.

Full TOML conformance, complete datetime validation, duplicate-key policy and
streaming remain promotion work.
