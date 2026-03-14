# url

The current URL type is `URL` (uppercase), with parsing via `URL.parse(...)` and public component fields.

## Usage

```vex
let parsed = URL.parse("https://vex-lang.org/docs/std?lang=tr#unicode")

$println(parsed.scheme)    // "https"
$println(parsed.host)      // "vex-lang.org"
$println(parsed.path)      // "/docs/std"
```

## Current Surface

- `URL.parse(input: string): URL`
- public fields: `scheme`, `userinfo`, `host`, `port`, `path`, `query`, `fragment`, `raw`, `valid`
- methods such as `toString()`, `hostPort()`, `queryParam()`, `isSecure()`, `defaultPort()`, `effectivePort()`

This page intentionally avoids undocumented accessor-style examples like `parsed.scheme()` that do not match the current exported type.
