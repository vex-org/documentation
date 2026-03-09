# YAML (`serde/yaml`)

YAML (YAML Ain't Markup Language) provides human-readable data serialization suited for configuration files, CI/CD pipelines, and data interchange. Vex's YAML module provides both tree-based and struct-mapped access.

## Modules

| File | Purpose |
|------|---------|
| `encoder.vx` | Struct → YAML string |
| `decoder.vx` | YAML string → Struct |
| `value.vx` | `YamlValue` dynamic type (Mapping, Sequence, String, Integer, Float, Bool, Null) |

## Encoding

```rust
import { encode } from "serde/yaml";

struct Pipeline {
    name: string
    stages: i32
    parallel: bool
}

let p = Pipeline { name: "deploy", stages: 3, parallel: true };
let yaml_str = encode<Pipeline>(&p);
// name: deploy
// stages: 3
// parallel: true
```

## Decoding

```rust
import { decode } from "serde/yaml";

let input = "name: build\nstages: 5\nparallel: false";
let! pipeline = Pipeline { };
decode<Pipeline>(input, &pipeline);
println("Pipeline: {pipeline.name} with {pipeline.stages} stages");
```

## YAML vs TOML

| Feature | YAML | TOML |
|---------|------|------|
| Nesting | Indentation-based | Section headers `[table]` |
| Lists | `- item` | `[1, 2, 3]` |
| Multi-line strings | `\|` and `>` blocks | Triple-quoted `"""..."""` |
| Best for | CI/CD, Kubernetes, Ansible | App configs, build manifests |
