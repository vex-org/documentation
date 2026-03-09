# TOML (`serde/toml`)

TOML (Tom's Obvious, Minimal Language) is the preferred configuration format for Vex projects (`vex.json` may migrate to `vex.toml`). The `serde/toml` module provides a complete parser, encoder, decoder, and a `TomlValue` AST.

## Modules

| File | Purpose |
|------|---------|
| `parse.vx` | TOML text → `TomlValue` AST parser |
| `value.vx` | `TomlValue` type (Table, Array, String, Integer, Float, Bool, DateTime) |
| `encoder.vx` | Struct → TOML string via Serde `Serializer` contract |
| `decoder.vx` | TOML string → Struct via Serde `Deserializer` contract |

## Parsing into AST

```rust
import { parse } from "serde/toml";

let input = "[server]\nhost = \"0.0.0.0\"\nport = 8080\n\n[database]\nurl = \"postgres://localhost/app\"";

let toml = parse(input);
// toml is a TomlValue.Table with nested tables
```

## Encoding (Struct → TOML)

```rust
import { encode } from "serde/toml";

struct ServerConfig {
    host: string
    port: i32
    debug: bool
}

let cfg = ServerConfig { host: "localhost", port: 3000, debug: false };
let toml_str = encode<ServerConfig>(&cfg);
// → host = "localhost"\nport = 3000\ndebug = false
```

## Decoding (TOML → Struct)

```rust
import { decode } from "serde/toml";

let input = "host = \"0.0.0.0\"\nport = 9090\ndebug = true";
let! cfg = ServerConfig { };
decode<ServerConfig>(input, &cfg);
println("Listening on {cfg.host}:{cfg.port}");
```

## Performance

TOML decode benchmarks reach **~1,029,232 ops/s** due to the internal AST-based parsing that avoids re-scanning and uses span-sliced string extraction throughout.
