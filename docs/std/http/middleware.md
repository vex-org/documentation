# Middleware (`http/middleware`)

The `http/fiber` framework revolves entirely around an asynchronous array of middleware handlers inside the Vex context.

This modular architecture allows you to easily inject utilities right into the HTTP lifecycle:

```rust
import { logger, cors, recover, staticFiles } from "http/middleware";
```

## Logger

Automatically intercepts all socket requests and logs the timestamp, method, execution path, and outbound status code.

```rust
app.use(logger);

// Output:
// [2024-05-10T12:00:00Z] [ GET ] /api/users → 200
```

## CORS (Cross-Origin Resource Sharing)

Secures API boundaries effortlessly. Automatically intercepts preflight `OPTIONS` requests natively from modern browsers.

```rust
app.use(cors);                        // Blanket access (Allow all Origins)
app.use(corsWithOrigin("https://example.com")); // Strict environment policy
```

## Security & Reliability (`recover`)

Wraps subsequent endpoints and handles catastrophic faults such as array out of bounds, divisions by zero, or memory leaks without entirely crashing the Vex Server daemon.

```rust
app.use(recover);

app.get("/buggy-endpoint", fn(c: &Ctx!) {
    // This handler doesn't respond!
    return;
});

// App returns an orderly 500 "Internal Server Error"
```

## Static Server (`staticFiles`)

Out-of-the-box static resource deployment built using raw Vex stream utilities (`fs`). Features real-time automatic MIME expansion detection without any manual JSON configurations. 

```rust
// Matches `GET /static/...` and directs socket streams down into `./public/...`
app.use(fn(c: &Ctx!) {
    staticFiles(c, "./public", "/static");
});
```

Automatically maps and renders `html, css, js, json, png, jpg, svg, txt, webp` and sets Content-Type headers properly based on file extensions.
