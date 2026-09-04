# JSON (`serde/json`)

JSON exposes comptime-specialized struct codecs and the owning `JsonValue`
dynamic tree.

## Structured values

```vex
import { jsonMarshal, jsonUnmarshal } from "serde/json";

struct User {
    public:
    id: i64,
    name: string,
}

let source = User { id: 7, name: "Ada" };
let encoded = jsonMarshal(&source);
let! decoded = User { id: 0, name: "" };
jsonUnmarshal(encoded.raw_ptr() as Ptr<u8>, encoded.len() as u64, &decoded);
```

`jsonMarshal<T>` and `jsonUnmarshal<T>` specialize field traversal from comptime
type information. They do not require derive macros or runtime field maps.

## Dynamic values and safe parsing

```vex
import {
    jsonParseDynamicSafe,
    jsonStringifyDynamic,
    jsonStringifyDynamicPretty,
} from "serde/json";

match jsonParseDynamicSafe("{\"items\":[1,true,null]}") {
    Ok(value) => {
        $println(jsonStringifyDynamic(&value));
        $println(jsonStringifyDynamicPretty(&value));
    }
    Err(message) => { $println(message); }
}
```

`JsonValue` provides `is*` predicates, scalar accessors, object `get`, array
`at` and `len`. The safe path rejects trailing tokens, malformed numbers,
invalid escapes, unpaired Unicode surrogates and malformed arrays/objects.

Finite f64 values use the canonical shortest-roundtrip `strconv` formatter,
so serialization preserves every representable value without fixed trailing
zeros or a temporary string. Because RFC 8259 has no NaN or infinity number,
the current infallible serializer emits `null` for non-finite IEEE values.

The 2026-08-21 M2 Max O3 observable `BenchCtx.iter` baseline measured a small
coordinate struct at about 14.59 ns to encode and 27.72 ns to decode; dynamic
parse measured about 453 ns.
These are local benchmark samples, not portable guarantees.

Parser resource ceilings, streaming APIs and official corpus coverage remain
release gates.
