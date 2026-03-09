# CSV (`serde/csv`)

The `serde/csv` module provides blazing-fast tabular data parsing and serialization with full RFC 4180 compliance (quoted fields, embedded commas, newlines within quotes).

## Modules

| File | Purpose |
|------|---------|
| `parse.vx` | CSV text → `CsvValue` row/field parser |
| `value.vx` | `CsvValue` type representing parsed rows and fields |
| `encoder.vx` | Struct → CSV row via Serde `Serializer` contract |
| `decoder.vx` | CSV row → Struct via Serde `Deserializer` contract |

## Parsing CSV

```rust
import { parse } from "serde/csv";

let input = "name,age,city\nAlice,30,Istanbul\nBob,25,Berlin";
let rows = parse(input);
// rows[0] = ["name", "age", "city"]
// rows[1] = ["Alice", "30", "Istanbul"]
```

## Decoding into Structs

```rust
import { decode } from "serde/csv";

struct Person {
    name: string
    age: i32
    city: string
}

let csv = "name,age,city\nAlice,30,Istanbul";
let! person = Person { };
decode<Person>(csv, &person);
println("{person.name} lives in {person.city}");
```

## Encoding from Structs

```rust
import { encode } from "serde/csv";

let person = Person { name: "Charlie", age: 28, city: "Tokyo" };
let csv_row = encode<Person>(&person);
// → "Charlie,28,Tokyo"
```

## Performance

CSV parsing uses native C-string `strtod` conversion for numeric fields and direct byte scanning for delimiters. This bypasses the heavier JSON-style tokenizer, achieving benchmark results of **~806,302 ops/s** for simple row parsing. Quoted field handling adds minimal overhead since the parser only branches on the `"` byte.
