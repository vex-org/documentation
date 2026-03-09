# MessagePack (`serde/msgpack`)

MessagePack is a compact binary serialization format. It's significantly smaller than JSON in wire size and faster to parse since there's no text tokenization involved—just direct byte reading.

## Modules

| File | Purpose |
|------|---------|
| `encoder.vx` | Struct → binary MsgPack bytes |
| `decoder.vx` | Binary MsgPack → Struct |
| `value.vx` | `MsgPackValue` dynamic type tree |
| `serde.vx` | Contract-based `Serializer`/`Deserializer` implementations |

## When to Use

- **RPC and IPC**: Inter-process communication where bandwidth matters.
- **Network Protocols**: Custom binary protocols between Vex services.
- **Storage**: Compact struct serialization for caching or databases.
- **High Throughput**: When JSON text parsing overhead is unacceptable.

## Encoding

```rust
import { encode } from "serde/msgpack";

struct Sensor {
    id: i64
    temperature: f64
    active: bool
}

let data = Sensor { id: 42, temperature: 23.5, active: true };
let bytes = encode<Sensor>(&data);
// Compact binary: ~15 bytes vs ~50+ bytes in JSON
```

## Decoding

```rust
import { decode } from "serde/msgpack";

let! sensor = Sensor { };
decode<Sensor>(bytes, &sensor);
println("Sensor {sensor.id}: {sensor.temperature}°C");
```

## Wire Format

MessagePack uses type-prefix bytes to encode values efficiently:

| Type | Prefix | Size |
|------|--------|------|
| Positive fixint | `0x00–0x7f` | 1 byte |
| Negative fixint | `0xe0–0xff` | 1 byte |
| fixstr | `0xa0–0xbf` | 1 + N bytes |
| fixarray | `0x90–0x9f` | 1 + elements |
| fixmap | `0x80–0x8f` | 1 + entries |
| float64 | `0xcb` | 9 bytes |
| int64 | `0xd3` | 9 bytes |
| true/false | `0xc3/0xc2` | 1 byte |
| nil | `0xc0` | 1 byte |
