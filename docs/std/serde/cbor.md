# CBOR (`serde/cbor`)

CBOR (Concise Binary Object Representation, RFC 8949) is an extremely compact binary format designed for constrained environments like IoT devices, embedded systems, and low-bandwidth networks.

## Modules

| File | Purpose |
|------|---------|
| `encoder.vx` | Struct → CBOR binary bytes |
| `decoder.vx` | CBOR binary → Struct |
| `value.vx` | `CborValue` dynamic type tree |
| `serde.vx` | Contract-based `Serializer`/`Deserializer` implementations |

## When to Use

- **IoT Telemetry**: Sensors sending compact payloads over constrained networks.
- **Embedded Systems**: Minimal memory footprint for data exchange.
- **WebAuthn/FIDO2**: CBOR is the standard encoding for authenticator data.
- **COSE (CBOR Object Signing)**: Signed and encrypted CBOR objects in security protocols.

## Encoding

```rust
import { encode } from "serde/cbor";

struct SensorReading {
    device_id: i64
    temperature: f64
    humidity: f64
}

let reading = SensorReading { device_id: 1001, temperature: 22.5, humidity: 65.3 };
let bytes = encode<SensorReading>(&reading);
// Extremely compact binary output
```

## Decoding

```rust
import { decode } from "serde/cbor";

let! reading = SensorReading { };
decode<SensorReading>(bytes, &reading);
println("Device {reading.device_id}: {reading.temperature}°C");
```

## CBOR vs MessagePack

| Feature | CBOR | MessagePack |
|---------|------|-------------|
| Standard | IETF RFC 8949 | Community spec |
| Tags | Yes (datetime, bignum, URI) | No |
| Indefinite-length | Yes | No |
| Web standards | WebAuthn, COSE | Redis, Fluentd |
| Size | Slightly larger (tags) | Slightly smaller |
