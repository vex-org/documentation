# strings

The current `strings` package is centered on **`StringBuilder`**.

## Exported Surface

The main public export today is:

```vex
import { StringBuilder } from "strings"
```

## Builder Pattern

```vex
let! b = StringBuilder.new()
b.writeStr("Hello")
b.writeStr(", ")
b.writeStr("Vex")

let result = b.toString()
```

## Important Note

This page intentionally does **not** document free functions such as `startsWith`, `endsWith`, `contains`, or `split` from `strings`, because the current package export surface does not provide them as a simple top-level utility API.
