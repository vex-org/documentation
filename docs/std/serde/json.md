# JSON (`serde/json`)

The JSON module is the most heavily used format in `serde`. It provides a complete encoder, decoder, and a tree-based `JsonValue` type for dynamic data access.

## Modules

| File | Purpose |
|------|---------|
| `encoder.vx` | Struct → JSON string serialization |
| `decoder.vx` | JSON string → Struct deserialization |
| `value.vx` | `JsonValue` dynamic tree (Object, Array, String, Number, Bool, Null) |
| `serde.vx` | Contract-based `Serializer`/`Deserializer` implementations |

## Encoding (Struct → JSON)

```rust
import { encode } from "serde/json";

struct User {
    id: i64
    name: string
    active: bool
}

let user = User { id: 1, name: "Alice", active: true };
let json = encode<User>(&user);
// → {"id":1,"name":"Alice","active":true}
```

The encoder walks struct fields at compile-time offsets, emitting keys and values directly into a growable buffer. No reflection, no hash maps—just raw byte writes.

## Decoding (JSON → Struct)

```rust
import { decode } from "serde/json";

let payload = "{\"id\":42,\"name\":\"Bob\",\"active\":false}";
let! user = User { };
decode<User>(payload, &user);
println("Name: {user.name}");  // Name: Bob
```

The decoder uses a streaming byte scanner to walk the JSON token stream. When it encounters a key, it uses `seekToKey` to match against known struct field names and directly writes the parsed value into the struct's memory layout.

## Dynamic JSON (`JsonValue`)

For untyped or heterogeneous JSON, use `JsonValue`:

```rust
import { parseJSON } from "serde/json";

let val = parseJSON("{\"users\":[{\"name\":\"Alice\"},{\"name\":\"Bob\"}]}");
// Access nested values via the JsonValue tree
```

## String Escaping

The encoder handles all JSON string escaping requirements (backslash, quotes, control characters, Unicode escapes) automatically during serialization.
