# Serde — Serialization & Deserialization

`serde` combines format-independent serialization contracts with comptime field
reflection. Concrete struct codecs specialize at compile time; dynamic value
trees are available when the payload shape is not known statically.

## Formats

| Module | Structured surface | Dynamic surface |
| --- | --- | --- |
| `serde/json` | `jsonMarshal`, `jsonUnmarshal`, `jsonParse` | `JsonValue`, safe parse, compact/pretty stringify |
| `serde/cbor` | `cborMarshal`, `cborUnmarshalSafe` | `CborValue`, bounded safe parse, stringify, JSON conversion |
| `serde/msgpack` | `msgpackMarshal`, `msgpackUnmarshalSafe` | `MsgPackValue`, bounded safe parse, stringify, JSON conversion |
| `serde/toml` | `TomlSerializer`, `TomlDecoder` | `TomlValue`, trusted and bounded safe parse |
| `serde/yaml` | serializer/parser primitives | `YamlValue`, bounded safe parse, stringify, JSON conversion |
| `serde/csv` | `CsvSerializer`, `CsvDecoder` | `CsvDocument`, borrowed trusted and bounded safe parse |

Import a format-specific module when possible. The root `serde` module re-exports
the stable facade, but there is intentionally no fictional universal
`encode`/`decode` pair.

```vex
import { jsonParseDynamicSafe, jsonStringifyDynamic } from "serde/json";

match jsonParseDynamicSafe("{\"ready\":true}") {
    Ok(value) => { $println(jsonStringifyDynamic(&value)); }
    Err(failure) => { $println(failure.message()); }
}
```

## Safety and conformance status

JSON's safe dynamic path validates complete input grammar, escapes and Unicode
surrogate pairs. YAML, TOML and CSV expose the same `Safe`/`WithLimits`
boundary for their documented subsets. CBOR and MessagePack safe APIs run a complete,
allocation-free preflight before allocating a dynamic tree or mutating a
structured output. `DecodeLimits` bounds total bytes, depth, nodes, strings,
binary payloads and container items; `DecodeError` reports a typed failure and
exact byte offset. Trusted non-`Safe` entry points skip this preflight.

TOML/YAML unsupported grammar fails closed; CSV safe parsing requires a
rectangular document and validates RFC-style quoting. Full official conformance
corpora, streaming APIs and canonical/tag/extension policies remain release work. The
documentation does not claim unsupported specification features.

The 2026-08-26 local gate passes warnings-denied lint and 61 tests at both O0 and O3.
An AddressSanitizer probe completed 40,000 valid and malformed safe binary
decodes. All format benchmarks use `BenchCtx.iter`/`iterMut`, keep results observable,
reuse mutable serializer capacity and reclaim owned temporaries in the bounded
benchmark child region. On the local M2 Max O3 baseline, coordinate
encode/decode is about 14.6/27.7 ns for JSON, 15.0/17.5 ns for CBOR and
13.4/14.3 ns for MessagePack; allocation-free binary preflight is about 52 ns
for CBOR and 50 ns for MessagePack. YAML flat parse is about 389 ns and TOML simple
parse about 757 ns. TOML long-document parsing is about 5.41 us with zero
process-heap allocation. These are regression baselines, not portable promises.
