# Core Server (`http/server`)

While most users will build APIs with the `http/fiber` framework, `http/server` gives you direct access to the the raw accept loop, request parser, and response builder.

## Minimal Hello World

```rust
import { Server, Request, Response } from "http";

fn main(): i32 {
    let! srv = Server.new("0.0.0.0", 8080);
    srv.serve(handler);
    return 0;
}

fn handler(req: &Request, res: &Response!) {
    res.sendString(req.fd, "Hello, Vex!");
}
```

---

## Request Parsing

Every incoming connection is consumed by the zero-copy `parseRequest(fd)` function. It reads up to 8KB from the socket and extracts the full request in a single pass using a byte-level scanner—**no regex, no intermediate string allocations**.

### `Request` Struct

| Field | Type | Description |
|-------|------|-------------|
| `method` | `string` | `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, `"PATCH"`, `"HEAD"`, `"OPTIONS"` |
| `path` | `string` | URL path without query string (e.g. `/api/users`) |
| `query` | `string` | Raw query string (e.g. `page=1&sort=name`) |
| `version` | `string` | `"HTTP/1.1"` or `"HTTP/1.0"` |
| `headers` | `Headers` | Parsed header collection (case-insensitive) |
| `body` | `string` | Request body (for `POST`/`PUT`/`PATCH`) |
| `fd` | `i32` | Socket file descriptor |
| `streamId` | `i32` | HTTP/2 stream ID (0 for HTTP/1.1) |
| `valid` | `bool` | `true` if parsing succeeded |
| `contentLength` | `i64` | Parsed `Content-Length` value (-1 if absent) |
| `keepAlive` | `bool` | `true` if `Connection != close` |

### Request Accessor Methods

```rust
req.header("Authorization")    // Get header value (case-insensitive)
req.hasHeader("X-Custom")      // Check if header exists
req.isMethod("POST")           // Match method (case-sensitive)
req.hasBody()                  // true if body.len() > 0
req.contentType()              // Get Content-Type header value
req.isJSON()                   // true if Content-Type == "application/json"
```

### Async Variant

For goroutine-per-connection servers, use the non-blocking parser:

```rust
let req = parseRequestAsync(fd);  // yields to scheduler on EAGAIN
```

---

## Headers (`Headers` Collection)

Headers are stored as parallel `Vec<string>` arrays (names + values) with byte-level case-insensitive comparison. No `Map` overhead, no hash computation—just linear scan optimized for the typical 5–15 header count.

| Method | Description |
|--------|-------------|
| `Headers.new()` | Create empty collection |
| `hdrs.get(name): string` | Get value (case-insensitive), returns `""` if not found |
| `hdrs.has(name): bool` | Check existence |
| `hdrs.set(name, value)` | Set/replace (removes existing, then appends) |
| `hdrs.add(name, value)` | Append (allows duplicates, e.g. `Set-Cookie`) |
| `hdrs.del(name)` | Remove all matching (in-place, zero-alloc) |
| `hdrs.clear()` | Remove all headers |
| `hdrs.shrinkToFit()` | Release excess capacity |
| `hdrs.len(): i32` | Count of headers |

---

## Cookies

The `cookie.vx` module provides full HTTP cookie parsing and `Set-Cookie` header serialization.

### Building Cookies

```rust
import { Cookie } from "http";

// Simple session cookie
let session = Cookie.new("session_id", "abc123");
// → "session_id=abc123; Path=/; HttpOnly; SameSite=Lax"

// Persistent cookie (expires in 1 hour)
let remember = Cookie.persistent("remember", "yes", 3600);
// → "remember=yes; Max-Age=3600; Path=/; HttpOnly; SameSite=Lax"

// Deletion cookie
let logout = Cookie.delete("session_id");
// → "session_id=; Max-Age=0; Path=/"

// Set on response
res.header("Set-Cookie", session.toString());
```

### Parsing Incoming Cookies

```rust
import { parseCookies } from "http";

let pairs = parseCookies(req.header("Cookie"));
// "session_id=abc123; theme=dark"
// → [CookiePair{name:"session_id", value:"abc123"}, CookiePair{name:"theme", value:"dark"}]
```

### Cookie Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Cookie name |
| `value` | `string` | Cookie value |
| `path` | `string` | Path attribute (default `"/"`) |
| `domain` | `string` | Domain attribute (empty = current) |
| `maxAge` | `i32` | Max-Age in seconds (-1 = session, 0 = delete) |
| `secure` | `bool` | HTTPS only flag |
| `httpOnly` | `bool` | No JS access flag |
| `sameSite` | `string` | `"Strict"`, `"Lax"`, `"None"`, or `""` |

---

## Response Builder

```rust
import { Response, respondText, respondJSON, respondError, respondRedirect } from "http";

// Builder pattern
let! res = Response.new();
res.status(201)
   .header("X-Request-ID", "req-001")
   .contentType("application/json");
res.sendJSON(req.fd, "{\"created\": true}");

// One-liner convenience functions
respondText(fd, "Hello!");                    // 200 text/plain
respondJSON(fd, "{\"ok\":true}");             // 200 application/json
respondError(fd, 404, "Not Found");           // 404 with message
respondRedirect(fd, "/login");                // 302 redirect
```

---

## Internal Parser Architecture

Underneath, request parsing is handled by a dedicated `parser/` subsystem:

| File | Purpose |
|------|---------|
| `parser/scanner.vx` | Low-level byte scanner with position tracking |
| `parser/request.vx` | HTTP/1.1 request line + header parser |
| `parser/fiber_request.vx` | Optimized Fiber-compatible incremental parser |
| `parser/headers.vx` | Header-specific parsing logic |
| `parser/body.vx` | Body extraction with Content-Length validation |
| `parser/chunked.vx` | Transfer-Encoding: chunked decoder |
| `parser/response.vx` | Client-side response parser |
| `parser/h2.vx` | HTTP/2 frame parser |
| `parser/hpack.vx` | HPACK header compression (RFC 7541) |
| `parser/huffman.vx` | Huffman coding tables for HPACK |
| `parser/ws.vx` | WebSocket frame parser |
| `parser/stream.vx` | Streaming parser for large payloads |
