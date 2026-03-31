# Modules and Imports

Vex uses explicit `import` and `export` forms. Files act as modules, and public API is declared rather than implied.

## Import Forms

### Named imports

```vex
import { App } from "cli/app";
import { Command } from "cli/command";
```

This is the most direct form when you only need a few symbols.

### Namespace imports

```vex
import * as style from "cli/style";
```

Namespace imports are useful when the imported module has many entry points and you want calls to stay visibly grouped.

### Relative imports

```vex
import { User } from "./user.vx";
```

Relative paths are common inside package internals and library layout code.

## Export Forms

Everything is private unless exported.

### Exporting declarations

```vex
export struct Logger {
    level: i32,
}

export fn newLogger(level: i32): Logger {
    return Logger { level };
}
```

### Exporting methods

```vex
export fn (self: &Logger) getLevel(): i32 {
    return self.level;
}
```

### Re-exporting

Re-exports are heavily used to build facade modules:

```vex
export { Regex, Match, test } from "./regex.vx";
export { pid, ppid, exit } from "./process.vx";
```

This pattern is common in package `lib.vx` files that gather several internal modules into one public surface.

## File-Based Module Model

Each `.vx` file acts as a module.

```text
src/
  main.vx
  user.vx
  service/
    auth.vx
```

Typical imports then look like:

- package-style: `import { App } from "cli/app";`
- relative: `import { User } from "./user.vx";`

## Public API Design

Keep implementation details private and export only the surface another module should rely on.

Good candidates for export:

- stable structs and enums
- constructors and factory functions
- high-level helper functions
- facade re-exports from a package root

Less ideal candidates:

- internal helpers
- temporary glue functions
- implementation-specific wiring code

## Common Patterns

### Package facade

```vex
export { File } from "./file.vx";
export { readFile, writeFile } from "./convenience.vx";
```

### Mixed import style

```vex
import { App, Command } from "cli/app";
import * as style from "cli/style";
```

## Guidelines

1. Prefer named imports for a narrow dependency surface.
2. Use namespace imports when the module name adds clarity at each call site.
3. Re-export from one facade file when you want consumers to have a stable entry point.
4. Keep internal file layout flexible by exporting a clean public package surface.

## Next Steps

- [Standard Library Overview](/guide/stdlib)
- [FFI](/guide/ffi)
- [Functions](/guide/basics/functions)
