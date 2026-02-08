# Modules and Imports

Vex uses a modern `import`/`export` system inspired by Go and JavaScript, ensuring clear module boundaries and explicit dependency management.

## Import Syntax

### Namespace Import

```vex
import * as io from "std.io"

fn main(): i32 {
    io.println("Hello, World!")
    return 0
}
```

### Named Imports

```vex
import { sqrt, PI } from "std.math"

fn main() {
    let result = sqrt(16.0)
    println(f"PI is {PI}")
}
```

## Export Syntax

Everything in a module is **private** by default. Use the `export` keyword to expose items to other modules.

### Exporting Functions and Structs

```vex
// Public function
export fn calculate(x: i32): i32 {
    return x * 2
}

// Public struct
export struct User {
    public:
    name: string
}

// Private helper (not visible outside)
fn internal_aid() { }
```

### Exporting Methods

Methods associated with an exported struct are also typically exported:

```vex
export struct Counter {
    public:
    count: i64
}

export fn (self: &Counter!) increment() {
    self.count += 1
}
```

## File-Based Modules

Each `.vx` file is automatically treated as a module. The file path relative to the project root or standard library determines the import path.

```
src/
├── main.vx          # Root module
└── utils.vx         # imported as "./utils"
```

## Re-exporting

Modules can act as a gateway by re-exporting items from other modules:

```vex
// models/mod.vx
export { User } from "./user"
export { Post } from "./post"
```

## Comparison with Other Languages

| Feature | Vex | Rust | Go |
|---------|-----|------|-----|
| Import | `import { x } from "m"` | `use m.x` | `import "m"` |
| Export | `export fn f()` | `pub fn f()` | `func F()` |
| Namespace | `import * as m` | `use m` | `import m "m"` |

## Best Practices

1. **Export sparingly**: Keep your module's internal implementation details private.
2. **Prefer named imports**: It makes dependencies explicit and easier to track.
3. **Use Namespace Imports for large modules**: For modules like `std.math`, importing as a namespace (`math.sqrt`) improves readability.

## Next Steps

- [Standard Library](/guide/stdlib) - Available modules
- [FFI](/guide/ffi) - Importing C functions
- [Project Configuration](/guide/basics/first-project) - Setting up `vex.json`
