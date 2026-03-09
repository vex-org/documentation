# Serde — Serialization & Deserialization Framework

The `serde` module provides a unified, contract-driven serialization and deserialization system for Vex. Every supported format shares the same `Serializer` and `Deserializer` contracts, which means switching from JSON to TOML or MsgPack requires changing a single import.

## Supported Formats

| Format | Import | Use Case |
|--------|--------|----------|
| **JSON** | `serde/json` | Web APIs, config files, data interchange |
| **TOML** | `serde/toml` | Configuration files (`vex.toml`, `Cargo.toml` style) |
| **CSV** | `serde/csv` | Tabular data, spreadsheets, data pipelines |
| **MessagePack** | `serde/msgpack` | Compact binary RPC, high-throughput messaging |
| **YAML** | `serde/yaml` | Human-readable configs, CI/CD pipelines |
| **CBOR** | `serde/cbor` | IoT, constrained environments, compact binary |

## Contract Architecture

Instead of hardcoding parsers per struct, Vex defines two fundamental contracts that all formats implement:

```rust
// Serializer — emit structured data
contract Serializer {
    serializeBool(v: bool)!;
    serializeI64(v: i64)!;
    serializeF64(v: f64)!;
    serializeStr(v: string)!;
    serializeNone()!;
    serializeSeqStart(len: Option<usize>)!;
    serializeSeqEnd()!;
    serializeMapStart(len: Option<usize>)!;
    serializeMapKey(key: str)!;
    serializeMapEnd()!;
    serializeStructStart(name: string, len: usize)!;
    serializeStructEnd()!;
}

// Deserializer — consume structured data
contract Deserializer {
    parseInt()!: i64;
    parseFloat()!: f64;
    parseBool()!: bool;
    parseString()!: string;
    skipValue()!;
    enterObject()!: i64;
    exitObject()!;
    seekToKey(key: *u8)!: bool;
}
```

Any struct automatically satisfies `Serializable` and `Deserializable` when used with `serialize_any<T>` / `deserialize_any<T>`, thanks to Vex's compile-time struct introspection.

## Quick Example

```rust
import { encode, decode } from "serde/json";

struct Config {
    host: string
    port: i32
    debug: bool
}

fn main() {
    let cfg = Config { host: "0.0.0.0", port: 8080, debug: true };
    
    // Struct → JSON string
    let json = encode<Config>(&cfg);
    println(json);  // {"host":"0.0.0.0","port":8080,"debug":true}
    
    // JSON string → Struct
    let! parsed = Config { };
    decode<Config>(json, &parsed);
    println("Port: {parsed.port}");  // Port: 8080
}
```

## Performance

All serde parsers operate on `RawBuf` and `Span<u8>`, skipping `String` allocations wherever possible. Benchmark highlights:

- **CSV Decode**: 806,302 ops/s
- **TOML Decode**: 1,029,232 ops/s
- **JSON Encode**: Zero-copy struct field emission via compile-time offsets
- **MsgPack**: Binary format—no text parsing overhead at all
