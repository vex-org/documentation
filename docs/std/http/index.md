# HTTP & Client Overview

The `http` package provides a blazing fast, zero-copy HTTP/1.1 library for the Vex programming language. 
It takes inspiration from Go's `net/http` to provide low-level controls but heavily expands out into the `.fiber` module to bring full framework-level abstractions (like Go Fiber v3).

## Key Capabilities

1. **Fiber v3 Framework Layer**: Complete web framework abstractions (`App`, `Ctx`, `Router`) supporting `:param` binding and `*wildcard` routes.
2. **Zero-Copy Parsers**: Request parsers strictly slice bytes (`Span<u8>`) from the underlying socket without any intermediate GC allocation for headers or values.
3. **WebSockets (`http/ws`)**: Full native WebSockets implementation based on RFC 6455 framing and connection upgrades.
4. **HTTP/2 (`http/h2`)**: Built-in HTTP/2 streams and HPACK framing.
5. **Middlewares**: Extensively functional middleware chaining allowing custom logic (`Logger`, `CORS`, `Recover`, `Static Files`).

---

## HTTP Client

While `http/server` and `http/fiber` handle massive concurrency natively, `http` also includes an extremely capable `ClientRequest` module for hitting external APIs dynamically.

### Basic Fetching

```rust
import { httpGet, httpPostJSON } from "http";

// Simple GET request
let res = httpGet("api.github.com", 443, "/users/meftunca");
if res.ok() {
    println("Body:", res.body);
}

// Simple POST JSON
let resJSON = httpPostJSON("127.0.0.1", 8080, "/api/users", "{\"name\":\"Vex\"}");
```

### Flow via Builder Pattern

```rust
import { ClientRequest } from "http";

let! req = ClientRequest.new("PUT", "127.0.0.1", 8080, "/api/users/1");

req.setHeader("Authorization", "Bearer token123");
req.setContentType("application/json");
req.setBody("{\"name\":\"Updated\"}");

let res = req.send();

println("Status: {res.status}");
println("Body: {res.body}");
```
