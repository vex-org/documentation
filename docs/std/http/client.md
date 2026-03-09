# HTTP Client (`http/client`)

The `http/client` module provides everything needed for making outbound HTTP requests—from simple one-liners to fully custom requests with authentication, headers, and arbitrary bodies.

All client operations utilize Vex's native TCP socket layer (`net/socket`) and are fully non-blocking when used inside `async` contexts.

## Quick Convenience Functions

For common HTTP verbs, Vex provides instant helpers that handle connection setup, request serialization, response parsing, and socket teardown in a single call:

```rust
import { httpGet, httpPost, httpPostJSON, httpPatch, httpDelete } from "http";

// GET
let res = httpGet("api.github.com", 443, "/repos/vex-lang/vex");
if res.ok() {
    println("Stars: {res.body}");
}

// POST with raw body
let res = httpPost("api.example.com", 8080, "/submit", "name=Vex&type=lang");

// POST with JSON body (auto Content-Type: application/json)
let res = httpPostJSON("api.example.com", 8080, "/users", "{\"name\":\"Vex\"}");

// PATCH
let res = httpPatch("api.example.com", 8080, "/users/1", "{\"active\":true}");

// DELETE
let res = httpDelete("api.example.com", 8080, "/users/99");
```

## Builder Pattern (`ClientRequest`)

For full control, construct a `ClientRequest` manually. Every setter returns `&ClientRequest!`, enabling clean chaining:

```rust
import { ClientRequest } from "http";

let! req = ClientRequest.new("PUT", "api.internal.io", 8080, "/sync/worker-1");

req.setHeader("Authorization", "Bearer sk_live_abc123")
   .setHeader("X-Request-ID", "trace-001A")
   .setHeader("Accept", "application/json")
   .setContentType("application/json")
   .setBody("{\"status\":\"active\",\"region\":\"eu-west-1\"}");

let res = req.send();

println("Status: {res.status} {res.statusText}");
println("Server: {res.header(\"Server\")}");
println("Body: {res.body}");
```

### `ClientRequest` API

| Method | Description |
|--------|-------------|
| `ClientRequest.new(method, host, port, path)` | Create a new request builder. |
| `.setHeader(name, value): &Self!` | Set a custom header (chainable). |
| `.setContentType(ct): &Self!` | Shortcut for `Content-Type` header (chainable). |
| `.setBody(body): &Self!` | Set the request body string (chainable). |
| `.send(): ClientResponse` | Execute the HTTP request and return the parsed response. |

### `ClientRequest` Fields

| Field | Type | Description |
|-------|------|-------------|
| `method` | `string` | HTTP verb (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`). |
| `host` | `string` | Target hostname. |
| `port` | `i32` | Target port. |
| `path` | `string` | Request path (e.g. `/api/v2/users`). |
| `headers` | `Headers` | The full header collection. |
| `body` | `string` | Request body (empty for GET/DELETE). |
| `timeout` | `i32` | Read timeout in milliseconds (0 = default). |

## `ClientResponse` — Parsed Response

When `send()` executes, Vex reads up to 64KB from the socket and parses the HTTP response line, headers, and body using a zero-copy byte scanner.

### Properties

| Field | Type | Description |
|-------|------|-------------|
| `status` | `i32` | HTTP status code (e.g. `200`, `404`, `500`). |
| `statusText` | `string` | Status reason phrase (`"OK"`, `"Not Found"`). |
| `version` | `string` | Protocol version (`"HTTP/1.1"`). |
| `headers` | `Headers` | All response headers. |
| `body` | `string` | The response body payload. |
| `valid` | `bool` | `true` if the response was successfully parsed. |

### Helper Methods

| Method | Description |
|--------|-------------|
| `res.ok(): bool` | Returns `true` if status is in the 2xx range. |
| `res.header(name): string` | Read a specific response header (case-insensitive). |
| `res.hasHeader(name): bool` | Check if a response header exists. |
| `res.isJSON(): bool` | Check if `Content-Type` is `application/json`. |

## Response Header Parsing

All response headers are automatically extracted during `readResponse()` using the same zero-copy byte scanner used by the server-side parser. Headers are stored in a `Headers` collection supporting:

```rust
let res = httpGet("example.com", 80, "/");

// Case-insensitive access
let server = res.header("Server");          // e.g. "VexHTTP/1.0"
let ctype  = res.header("content-type");    // case-insensitive matching
let length = res.header("Content-Length");   // "1234"

// Existence check
if res.hasHeader("X-RateLimit-Remaining") {
    println("Remaining: {res.header(\"X-RateLimit-Remaining\")}");
}
```
