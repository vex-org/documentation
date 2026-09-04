# CBOR (`serde/cbor`)

The CBOR module provides comptime-specialized structured codecs and an owning
`CborValue` dynamic tree.

```vex
import { cborMarshal, cborUnmarshalSafe } from "serde/cbor";

struct Stats {
    public:
    hp: i64,
    mp: i64,
}

let source = Stats { hp: 100, mp: 50 };
let packed = cborMarshal(&source);
let! decoded = Stats { hp: 0, mp: 0 };
match cborUnmarshalSafe(
    packed.raw_ptr() as Ptr<u8>, packed.len() as u64, &decoded,
) {
    Ok(_) => { $println(decoded.hp); }
    Err(failure) => { $println(failure.message()); }
}
```

Dynamic APIs are `cborParseDynamic`, `cborParseDynamicSafe`,
`cborParseDynamicWithLimits`, `cborStringifyDynamic` and `cborToJson`. They
operate on a pointer and explicit byte length when parsing binary input.

## Safe and trusted paths

Use `cborParseDynamicSafe` or `cborUnmarshalSafe` for file, socket and other
untrusted bytes. They perform a complete allocation-free preflight and return
`Result<_, DecodeError>`. Malformed structured input is rejected before the
destination value is modified.

Use a per-protocol budget when the standard defaults are wider than your wire
contract:

```vex
import {
    DecodeErrorKind,
    DecodeLimits,
    cborParseDynamicWithLimits,
} from "serde/cbor";

let! limits = DecodeLimits.standard();
limits.maxTotalBytes = 1024 * 1024 as usize;
limits.maxDepth = 32 as usize;
limits.maxNodes = 100_000 as usize;

match cborParseDynamicWithLimits(data, length, limits) {
    Ok(value) => { /* consume value */ }
    Err(failure) => {
        if failure.isKind(DecodeErrorKind.DepthLimit) {
            $println("CBOR nesting rejected");
        }
    }
}
```

The safe subset accepts definite integers representable as `i64`, byte/text
strings, arrays, string-keyed maps, booleans, null and 32/64-bit
floats. It rejects truncation, trailing bytes, invalid UTF-8, non-string map
keys, over-budget values, tags, indefinite values and unsupported simple
values. Tags, `undefined` and indefinite containers need a future lossless
representation; silently erasing them would be incorrect.

`cborParseDynamic` and `cborUnmarshal` are single-pass trusted-data paths. They
do not validate bounds first and must not be used directly on untrusted input.

The regression matrix covers structured and dynamic round trips, transactional
safe struct decode, truncation, forged lengths, trailing bytes, invalid UTF-8,
integer overflow, non-string keys and every resource budget at O0 and O3.
Official RFC 8949 corpora, canonical encoding and lossless tag/indefinite-value
support remain promotion work.

The 2026-08-25 M2 Max O3 short baseline measured coordinate encode/decode at
14.96/17.49 ns, trusted dynamic parse at 488.66 ns, allocation-free validation
at 51.87 ns and safe dynamic parse at 545.63 ns. The safe boundary added about
11.7% on this small fixture. These are regression baselines, not portable
promises.
