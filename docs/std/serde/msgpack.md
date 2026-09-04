# MessagePack (`serde/msgpack`)

MessagePack exposes comptime-specialized struct codecs and an owning
`MsgPackValue` dynamic tree.

```vex
import { msgpackMarshal, msgpackUnmarshalSafe } from "serde/msgpack";

struct Sensor {
    public:
    id: i64,
    temperature: f64,
    active: bool,
}

let source = Sensor { id: 42, temperature: 23.5, active: true };
let packed = msgpackMarshal(&source);
let! decoded = Sensor { id: 0, temperature: 0.0, active: false };
match msgpackUnmarshalSafe(
    packed.raw_ptr() as Ptr<u8>, packed.len() as u64, &decoded,
) {
    Ok(_) => { $println(decoded.temperature); }
    Err(failure) => { $println(failure.message()); }
}
```

Dynamic APIs are `msgpackParseDynamic`, `msgpackParseDynamicSafe`,
`msgpackParseDynamicWithLimits`, `msgpackStringifyDynamic` and `msgpackToJson`.
Binary parsers take an explicit pointer and byte length.

## Safe and trusted paths

Use `msgpackParseDynamicSafe` or `msgpackUnmarshalSafe` at untrusted file and
network boundaries. They validate the full document without allocation before
building a value tree or touching a structured destination. Failures return a
typed `DecodeErrorKind` and absolute byte offset.

```vex
import {
    DecodeLimits,
    msgpackParseDynamicWithLimits,
} from "serde/msgpack";

let! limits = DecodeLimits.standard();
limits.maxTotalBytes = 1024 * 1024 as usize;
limits.maxDepth = 32 as usize;
limits.maxContainerItems = 65_536 as usize;

match msgpackParseDynamicWithLimits(data, length, limits) {
    Ok(value) => { /* consume value */ }
    Err(failure) => { $println(failure.message()); }
}
```

The safe dynamic subset covers integers representable as `i64`, 32/64-bit
floats, strings, binary values, arrays, string-keyed maps, booleans and nil. It
rejects truncation, forged lengths, trailing bytes, invalid UTF-8, non-string
keys, over-budget values, the reserved marker and extension-family markers.
Extensions and timestamps remain rejected until the value model can preserve
them losslessly.

`msgpackParseDynamic` and `msgpackUnmarshal` are single-pass trusted-data paths;
they intentionally skip preflight and are not an untrusted-input API.

The regression matrix covers structured/dynamic round trips, transactional safe
struct decode, truncation, forged lengths, trailing bytes, invalid UTF-8,
integer overflow, non-string keys and every resource budget at O0 and O3.
Official conformance corpora, duplicate/canonical policy and lossless extension
support remain promotion work.

The 2026-08-25 M2 Max O3 short baseline measured coordinate encode/decode at
13.35/14.28 ns, trusted dynamic parse at 477.94 ns, allocation-free validation
at 49.94 ns and safe dynamic parse at 530.92 ns. The safe boundary added about
11.1% on this small fixture. These are regression baselines, not portable
promises.
