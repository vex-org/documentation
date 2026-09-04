# YAML (`serde/yaml`)

The current YAML surface is an owning dynamic tree with parser and serializer
primitives. It deliberately documents the implemented subset rather than
claiming complete YAML conformance.

```vex
import {
    yamlParseDynamicSafe,
    yamlStringifyDynamic,
    yamlToJson,
} from "serde/yaml";

let source = "user:\n  name: Ada\nitems:\n  - compiler\n  - runtime\n";
match yamlParseDynamicSafe(source) {
    Ok(value) => {
        $println(yamlStringifyDynamic(&value));
        $println(yamlToJson(&value));
    }
    Err(failure) => { $println(failure.message()); }
}
```

The tested subset covers mappings, nested mappings, sequences, comments,
quoted strings, integers, floats, booleans and null. `YamlValue` supplies type
predicates and scalar accessors. `YamlSerializer` and `YamlParser` are also
exported for lower-level control; there is no generic exported `encode` or
`decode` helper today.

Finite floats serialize with the canonical shortest-roundtrip `strconv`
engine, including scientific notation and IEEE subnormals. YAML special values
use canonical `.nan`, `.inf`, and `-.inf` spellings and parse back as floats.

`yamlParseDynamicSafe` validates indentation, quoted escapes, UTF-8, integer and
float range, trailing structure and every shared `DecodeLimits` budget before
allocating the tree. `yamlParseDynamicWithLimits` accepts a tighter policy.
The trusted one-shot parser borrows its source and avoids a complete input copy.

The 2026-08-26 M2 Max O3 sample measured flat trusted parse at about 573 ns,
allocation-free validation at 151 ns / 283 MB/s and safe parse at 699 ns.

Anchors, aliases, tags, the complete block/flow grammar and official conformance
corpora remain promotion work.
