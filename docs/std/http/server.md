# Core Server (`http/server`)

`http/server` is the compact direct-callback entry point. It delegates to the
same `http/fiber::App` HTTP/1 state machine used by routed services, so there
is no second parser, accept loop, or deadline policy to drift from production.

Use `Server` for a single direct request/response callback. Use `App` directly
when a service needs routes or middleware. Both paths have bounded incremental
bodies, pipelined suffixes, deadlines, connection admission, worker lifecycle
and response coalescing.

## Minimal Hello World

```vex
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

## Direct callback contract

The request is valid for the callback only. `Response` is encoded into
connection-owned reusable storage and drained after the callback returns. A
handler may still use the familiar `res.sendString(req.fd, ...)` form; in this
mode it is buffered rather than performing an independent socket write.

For cancellation-aware serving, use `server.serveWithContext(context, handler)`.
For direct raw-socket parsing experiments, `parseRequest(fd)` remains an
explicit low-level function, not a competing server runtime.

### `Request` Struct

| Field | Type | Description |
|-------|------|-------------|
| `method` | `str` | `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, `"PATCH"`, `"HEAD"`, `"OPTIONS"` |
| `path` | `str` | URL path without query string (e.g. `/api/users`) |
| `query` | `str` | Raw query string (e.g. `page=1&sort=name`) |
| `version` | `str` | `"HTTP/1.1"` or `"HTTP/1.0"` |
| `headers` | `Headers` | Parsed header collection (case-insensitive) |
| `body` | `str` | Request body (for `POST`/`PUT`/`PATCH`) |
| `fd` | `i64` | Native-width socket handle |
| `streamId` | `i32` | Reserved stream identifier; the direct HTTP/1 `Server` facade uses `0` (Fiber HTTP/2 routes use `Ctx`) |
| `valid` | `bool` | `true` if parsing succeeded |
| `contentLength` | `i64` | Parsed `Content-Length` value (-1 if absent) |
| `keepAlive` | `bool` | `true` if `Connection != close` |

### Request Accessor Methods

```vex
req.header("Authorization")    // Get header value (case-insensitive)
req.hasHeader("X-Custom")      // Check if header exists
req.isMethod("POST")           // Match method (case-sensitive)
req.hasBody()                  // true if body.len() > 0
req.contentType()              // Get Content-Type header value
req.isJSON()                   // true if Content-Type == "application/json"
```

## Headers (`Headers` Collection)

Headers are stored as parallel `Vec&lt;string&gt;` arrays (names + values) with byte-level case-insensitive comparison. No `Map` overhead, no hash computation—just linear scan optimized for the typical 5–15 header count.

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

```vex
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

```vex
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

```vex
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
