# Middleware (`http/middleware`)

The `http/fiber` framework revolves entirely around an asynchronous array of middleware handlers inside the Vex context.

This modular architecture allows you to easily inject utilities right into the HTTP lifecycle:

```vex
import { logger, cors } from "http/middleware";
```

## Logger

Automatically intercepts all socket requests and logs the timestamp, method, execution path, and outbound status code.

```vex
app.use(logger);

// Output:
// [2024-05-10T12:00:00Z] [ GET ] /api/users → 200
```

## CORS (Cross-Origin Resource Sharing)

Secures API boundaries effortlessly. Automatically intercepts preflight `OPTIONS` requests natively from modern browsers.

```vex
app.use(cors);                        // Blanket access (Allow all Origins)
app.use(corsWithOrigin("https://example.com")); // Strict environment policy
```

## Static files

Static serving is deliberately a route API, so it shares Fiber's frozen
router and request lifecycle rather than adding a second middleware path.

```vex
app.static("/static", "./public");
```

The implementation canonicalizes the configured root and the candidate before
opening it. Traversal attempts and symlinks that resolve outside the root are
rejected. Large-file streaming remains part of the shared transport-stream
phase; the current static helper is intentionally not presented as a general
asset-pipeline replacement.
