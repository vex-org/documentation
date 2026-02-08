# Modules and Imports

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

Vex uses a file-based module system with explicit exports, inspired by JavaScript/TypeScript but with static resolution.

---

## 1. Module Basics

Each file is a module. By default, all symbols are **private** unless exported.

```vex
// math.vx
fn helper(x: i32): i32 { return x * 2; }

export fn double_add(x: i32, y: i32): i32 {
    return helper(x) + helper(y);
}
```

---

## 2. Imports

Imports are resolved at compile-time. Circular imports are allowed but discouraged (handled via multi-pass resolution).

### Syntax

```vex
// Named imports (Recommended)
import { println, readln } from "io";

// Namespace import
import * as io from "io";

// Nested module import
import { TcpStream } from "net/tcp";

// Relative import (Same package)
import { Helper } from "./utils.vx";
```

### Resolution Rules

1. **Standard Library**: `import ... from "io"` looks in `std/io`.
2. **Package**: `import ... from "pkg"` looks in `vex.json` dependencies.
3. **Local**: `import ... from "./foo"` looks in current directory.

---

## 3. Exports

Vex is explicit about visibility.

```vex
export fn public_api() {}
export struct User { ... }
export const MAX_RETRIES = 3;
export contract Runnable { ... }
```

### Re-exports
Re-export symbols from other modules:

```vex
export { TcpStream } from "net/tcp";
```

---

## 4. Internal Visibility

Vex packages can have `internal` visibility (accessible within package but not outside), but this is currently implicitly handled by simply *not* exporting from the root `lib.vx`.

> [!NOTE]
> Unlike Rust `pub(crate)`, Vex generally relies on `export` at the file level + `vex.json` to define the public API surface.

---

## 5. Module Context

When you import a function, it retains access to its original module's private internals only. It does *not* gain access to the importer's privates.
