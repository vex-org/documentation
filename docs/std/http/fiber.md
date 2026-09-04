# Fiber Framework (`http/fiber`)

Inspired by Express on Node.js and the infamous **Fiber v3** on Go, Vex's `http/fiber` takes complete control of the web server loop to bring routing rules, parameters, wildcards, and middleware chaining—all inside a beautifully familiar API.

The framework is currently in production hardening. HTTP/1 routing, request
framing, deadlines, WebSocket lifecycle and cleartext prior-knowledge HTTP/2
for synchronous buffered routes are live. HTTP/2 async/streaming lanes, TLS
ALPN, two-stage shutdown, external interoperability and final performance
sign-off remain open.

## Building Applications

Apps are created, routes are mapped, and middlewares are configured dynamically onto memory tables during setup.

```vex
import { App, AppConfig, Ctx } from "http/fiber";
import { logger, cors } from "http/middleware";

fn main(): i32 {
    let! config = AppConfig.defaults();

    // Deadline values are milliseconds; size/count fields are explicit budgets.
    config.readTimeout = 5000;   // absolute HTTP/1 header/body deadline
    config.writeTimeout = 5000;  // complete response-drain deadline
    config.idleTimeout = 60000;  // connection inactivity deadline
    config.maxConnections = 65536; // process-wide accepted-connection budget
    config.maxHeaderBytes = 32768 as usize;
    config.maxHeaders = 64 as usize;
    config.responseBatchBytes = 256 * 1024; // pipelined response high-water mark

    let! app = App.new(config);

    // Attach middlewares
    app.use(logger);
    app.use(cors);

    // Register Routes
    app.get("/", fn(c: &Ctx!) {
        c.sendString("Go Vex!");
    });

    app.post("/users", fn(c: &Ctx!) {
        let body = c.body();
        // Validation / Storage
        c.status(201).sendString("Created: " + body);
    });

    // Start
    app.listen("0.0.0.0", 3000);
    return 0;
}
```

## Compile-time HTTP/1 profile

When a service needs synchronous HTTP/1 routing but not HTTP/2, WebSocket,
async routes or request/response streaming, construct the sealed profile:

```vex
import { App, Ctx, HTTP_V1 } from "http/fiber";

fn health(ctx: &Ctx!) {
    ctx.status(200).sendString("ok".toString());
}

fn main() {
    let! app = App<{HTTP_V1}>.new();
    app.get("/health", health);
    app.listen("0.0.0.0".toString(), 3000);
}
```

The ordinary `App` and every derived `Group` retain the same const-generic
mask. Synchronous methods, middleware, static routes, custom 404/error
handlers and `listenWithContext` remain available. Calling a registration
method without its capability is a compile-time error, not a runtime fallback.
Profiles compose directly, such as `App<{HTTP_V1 | WEBSOCKET}>`, without a
second facade or duplicated framework API.

The current zero-residue serving specialization is the exact `HTTP_V1`
profile. Other valid composed masks enforce registration at compile time but
still select the full multi-protocol worker kernel; per-bit binary/IR pruning
for those non-minimal masks is planned and must not be inferred from the API
composition alone.

The distinction is compile-time, not a runtime flag. The feature value is
propagated through the exact listen, connection, parser and dispatch
monomorphs; eliminated branches do not enter the semantic call graph. On the
2026-08-27 no-cache snapshot, the minimal hello emitted 4,862,955 bytes / 714
LLVM definitions, compared with 20,069,805 bytes / 1,919 for `App.new()` plus
the full listener. The minimal IR audit rejects H2 transport, WebSocket engine,
async-route and response-stream launchers, Hpack ownership, WebSocket session
ownership and full-profile lane selection.

This specialization includes data ownership, not only control flow.
`Router<{HTTP_V1}>` does not allocate the async/stream/WebSocket route sidecar;
H2 field backing, response-stream writers, WebSocket handshake scratch and
session identity belong to their selected protocol worker/task rather than to
every `App` or `Ctx`. The handler ABI and frozen radix source of truth remain
shared, and no per-request feature boolean or indirect dispatch was added.

Plain `App.new()` selects `HTTP_FULL`. It remains the compatibility default and
does not add runtime dispatch to request handling.

## Routing Engine

Instead of pulling heavy Regex dependencies, Vex Fiber relies on ultra-fast segment-based string matching:

Routes and middleware are frozen before workers start. Concurrent workers read
the immutable radix trees while request parameters and middleware cursors stay
inside each worker's reusable `Ctx`.

### URL Parameters `:param`

Dynamic parts of the URL are easily accessible via the `Ctx: params` API.

```vex
app.get("/users/:id", fn(c: &Ctx!) {
    let id = c.params("id");  // Given /users/142 -> 142

    // Automatically stringifies back to JSON
    c.sendJSON("{\"id\": \"" + id + "\"}");
});
```

### Wildcards `*wildcard`

Match all subsequent path requests. Highly useful for catching static directory matches.

```vex
app.get("/files/*filepath", fn(c: &Ctx!) {
    let path = c.params("filepath");
    c.sendString("Serving file: " + path);
});
```

## Context (`Ctx`) Methods

The `Ctx` object abstracts away all socket buffer writes, headers, and status code manipulation beautifully.

### Request Properties

- `c.method()`: Request HTTP method (`GET`, `POST`)
- `c.path()`: URL path.
- `c.params(key)`: Path router variable
- `c.query(key)`: URL Query mapping (`?search=foo`)
- `c.header(key)`: Reads header case-insensitively
- `c.body()`: The request payload string
- `c.isJSON()` / `c.contentType()`

### Response Modifiers

- `c.status(200)`: Set Status (Returns Context, chainable)
- `c.set("Authorization", "Bearer ABC")`: Append Header
- `c.type("application/json")`: Override Content-Type
- **Sending Output**:
    - `c.sendString("Text")`
    - `c.sendJSON("{\"success\":true}")`
    - `c.sendHTML("&lt;h1&gt;Welcome&lt;/h1&gt;")`
    - `c.send()`: Flush manual body bytes.
    - `c.sendStatus(400)`: Throw an immediate HTTP Code
    - `c.redirect("/login")`: HTTP 302 Redirection

## Bounded dynamic responses

For generated output whose final size is unknown, use a route-level stream
handler rather than a raw socket or `Ctx.send*` loop:

```vex
import { App, Ctx, ResponseStreamWriter } from "http/fiber";

fn events(c: &Ctx!, out: &ResponseStreamWriter!) {
    c.status(200).set("Content-Type", "text/event-stream");
    let _ = out.write("event: ready\ndata: vex\n\n");
    let _ = out.write("event: tick\ndata: 1\n\n");
}

let! app = App.new();
app.getStream("/events", events);
```

`App.getStream`, `postStream`, `getStreamWith`, `postStreamWith`, plus Group
`getStream`/`postStream`, use the same frozen radix tree and `c.next()`
middleware chain as ordinary routes. A stream handler sets status and headers
before its first `out.write`; that first write emits the canonical HTTP/1
header block. `ResponseStreamWriter` then owns lowercase-hex chunk framing,
the terminal chunk, a reusable 64 KiB buffer, and the complete response write
deadline. It never exposes a file descriptor.

If an earlier pipelined request already has a completed response, Fiber drains
it before reaching the stream producer. A failed stream write makes the
connection non-reusable; a partial response is never followed by another
HTTP/1 reply. `HEAD` uses GET fallback metadata but emits no chunk framing or
payload. This response-stream API is deliberately synchronous. Request-body
streaming uses the separate task-owned lane below and is not implied by
`getStream`.

Fiber already exposes the safe first async lane for complete HTTP/1 requests:
`getAsync`, `postAsync`, `putAsync`, `deleteAsync`, `patchAsync`, `headAsync`,
`optionsAsync`, plus a `*AsyncWith` form for every method. After frozen route
selection, Fiber unregisters the descriptor, moves its admission lease and
task-owned request state into one boxed task owner, then adopts the sole
owning `Socket` as a `TcpStream`. The response uses the normal context-aware
async write contract and the connection closes after that response; there is
no handback for this complete-body lane yet. Route-local awaitable middleware preserves
`before → await next() → after` exactly once. Ordinary `Handler` routes remain
synchronous and allocation-free; they are never silently reinterpreted as
coroutines.

Connection admission remains correct across this transfer: each tracked HTTP/1
connection owns a shared Vex `Box` lease for the admission budget, and the task
moves that lease with the socket rather than retaining a borrowed worker-local
counter pointer.

```vex
import { App, AsyncHandler, AsyncPipelineNext, Ctx } from "http/fiber";
import { Context } from "context";

async fn auth(ctx: &Ctx!, next: &AsyncPipelineNext!, cx: &Context) {
    // validate auth
    await next.run(ctx, cx);
}

async fn createJob(ctx: &Ctx!, _: &AsyncPipelineNext!, _: &Context) {
    ctx.status(201).sendString(ctx.params("id") + ":" + ctx.body());
}

let! app = App.new();
let! middleware = Vec.new<AsyncHandler>();
middleware.push(auth);
app.postAsyncWith("/jobs/:id", middleware, createJob);
```

This lane receives the already-bounded complete request body. Incremental body
delivery is intentionally not implied by `AsyncHandler`.

## Bounded request-body streams

Large or incrementally processed uploads use an explicit body-stream route.
Fiber selects the frozen route after the complete validated header but before
ordinary body accumulation. It unregisters the descriptor, then transfers the
sole socket owner, admission lease, framing state, request context and
already-read body/pipeline suffix to one scheduler task.

```vex
import {
    App, AsyncBodyPipelineNext, AsyncRequestBody, Ctx,
} from "http/fiber";
import { BodyConsumerStart, RequestBodyConsumer } from "http";
import { Context } from "context";

struct ByteCounter: RequestBodyConsumer { total: usize }

fn (self: &ByteCounter!) begin(_info: BodyConsumerStart): bool {
    self.total = 0 as usize;
    return true;
}

fn (self: &ByteCounter!) acceptChunk(bytes: str): bool {
    self.total = self.total + bytes.len();
    return true;
}

fn (self: &ByteCounter!) finish(_totalBytes: usize): bool { return true; }
fn (self: &ByteCounter!) cancel() { self.total = 0 as usize; }

async fn upload(
    ctx: &Ctx!, body: &AsyncRequestBody!,
    _next: &AsyncBodyPipelineNext!, cx: &Context,
) {
    let! counter = ByteCounter { total: 0 as usize };
    match await body.consume(&counter!, cx) {
        Ok(total) => { ctx.status(201).sendString(total.toString()); }
        Err(_) => { ctx.status(400).sendString("invalid request body"); }
    }
}

let! app = App.new();
app.postBodyStream("/upload", upload);
```

`bodyStream(method, path, handler)`, `bodyStreamWith(...)`, and
`getBodyStream` / `postBodyStream` / `putBodyStream` /
`deleteBodyStream` / `patchBodyStream` / `headBodyStream` /
`optionsBodyStream` share the immutable router. Groups provide matching body
stream methods; `Group.useBodyAsync` composes awaitable middleware and is
inherited by nested Groups. Ordinary synchronous `Group.use` middleware does
not cross the descriptor handoff, so its stack frame and `after next()` logic
cannot accidentally outlive the worker event.

`AsyncRequestBody.consume<C: RequestBodyConsumer>` may run once. It drives the
canonical fixed-length/chunked decoder and exact `begin` -> chunks ->
`finish|cancel` lifecycle through four fixed 16 KiB pages and a reused 64 KiB
transport workspace. Chunks are synchronous borrowed views of task-owned page
storage: consumers must copy data they retain. Context deadline/cancellation,
consumer rejection, malformed framing, premature EOF and I/O failure all fail
closed. No raw fd or borrowed transport read crosses an `await`.

After a positive body lifecycle completion, Fiber writes the complete response
through the same task-owned socket. If both request and response permit reuse,
the task then moves the sole socket owner, admission lease, and exact preserved
pipeline suffix into a fixed-capacity non-blocking worker handback inbox. A
native wake pipe notifies the pollers, but only the adopting worker mutates its
event loop and connection map. Already-read suffix bytes are parsed
immediately; they cannot be stranded waiting for a socket edge. Failed body or
response completion, a full/closed inbox, poller registration failure,
cancellation, and shutdown all close and release exactly once.

Descriptor reattachment is an internal integration boundary, not a developer
escape hatch: the ownership-transfer functions are free functions omitted from
the public `net` and `http/fiber` facades, and neither `TcpStream` nor
`AsyncRequestBody` exposes a method which relinquishes its transport.

This path is covered by a live one-write `POST body + pipelined GET` regression:
the first response completes before the second request is dispatched, the
first response advertises keep-alive, the second suffix is preserved, and
server cancellation joins every worker. The test has explicit 1.2-second
client and 500-ms worker-join fail-fast bounds rather than an unbounded channel
wait. Complete-body `*Async` routes remain a
separate close-after-response lane; the proof above applies specifically to
`*BodyStream` routes.
Multipart is provided as a bounded consumer over the same lane:

```vex
import {
    MultipartLimits, MultipartSink, multipartBoundary, multipartConsumer,
} from "http";

// UploadSink implements beginPart/partHeader/acceptPartChunk/endPart,
// finishMultipart and cancelMultipart. It copies only metadata it retains.
let boundary = multipartBoundary(ctx.contentType())?;
let! sink = UploadSink.new();
let! form = multipartConsumer(
    boundary.asStr(), MultipartLimits.defaults(), &sink!,
)?;
let result = await body.consume(&form!, cx);
```

`MultipartConsumer<S: MultipartSink>` does not read a socket and does not
decode HTTP framing. It recognizes arbitrarily fragmented MIME delimiters over
the canonical decoded body, forwards binary part bytes synchronously, and
retains only a fixed header workspace plus a delimiter tail. Defaults bound
parts, bytes and header count per part, field-name bytes and filename bytes;
applications may lower those limits per route. Duplicate/empty/overlong
boundaries, truncated bodies, illegal part headers, false delimiter suffixes
and sink rejection fail closed through the one-shot cancellation lifecycle.

## WebSocket routes

Fiber WebSocket routes use the same frozen radix tree and middleware ordering:

The tree owns structural match metadata, not a second copy of route handlers.
After matching, the route index restores the exact middleware range from the
router's single startup-owned flat pool. This keeps ordinary, streamed and
WebSocket routes on one ordering contract, makes repeated freeze idempotent,
and removes per-route middleware Vec allocation/copy during startup.

```vex
import { App } from "http/fiber";
import { WsMessage, WsSession } from "http/ws";

fn echo(peer: &WsSession!, message: WsMessage) {
    if message.isText() { let _ = peer.sendText(message.data); }
}

let! app = App.new();
app.ws("/ws/:room", echo);
```

`App.ws` and `Group.ws` accept only a valid bodyless RFC 6455 opening request.
After global and route middleware finish, Fiber drains earlier pipelined HTTP
output, queues `101 Switching Protocols`, and transfers the same worker-local
connection state to a bounded non-blocking `WsSession`. The callback receives
complete text/binary messages plus received close/pong events; ping replies,
frame fragmentation and partial writes remain in the worker state. See
[WebSocket](./ws.md) for queue limits and current scope.

`App.wsWithLifecycle(path, onOpen, handler, onClose)` and the corresponding
`Group` method preserve the same route/middleware boundary. `onOpen` receives
the event-scoped session after `101` has been queued; `onClose` receives an
opaque session id (not an fd) exactly once on the owner worker while the
connection retires.

`App.wsWithOptions` / `Group.wsWithOptions` accept a `WsRouteOptions` policy
whose protocol insertion order is server preference order. The corresponding
`wsWithLifecycleOptions` methods combine that policy with lifecycle hooks.
Selection is bounded, case-sensitive, and stored on `WsSession.protocol()`;
each configured token is capped at 255 bytes and `requireSubprotocol()` rejects
a no-overlap offer before handoff. The validated key/protocol cross Fiber's
request-arena rewind only through fixed inline storage; no borrowed header view
enters the persistent session.

## HTTP/1 framing and connection lifetime

The live server uses one bounded incremental framing state per active
connection. The state survives socket fragmentation without retaining bytes
that have already been decoded.

- `Content-Length` and exact `Transfer-Encoding: chunked` request bodies are
  supported.
- Fragmented fixed-length and chunked bodies reuse the same incremental
  decoder state. Fiber retains a parsed header once and appends only newly
  decoded body bytes, avoiding repeated `header + body-so-far` copies during
  a slow upload. Common body-buffer capacity is reused on keep-alive; an
  exceptional body larger than 64 KiB is released immediately after dispatch
  instead of becoming permanent per-connection RSS.
- `Content-Length` plus `Transfer-Encoding`, conflicting lengths, unsupported
  transfer codings, obs-fold, malformed field syntax, and invalid HTTP/1.1
  `Host` rules are rejected before handler dispatch. Only exact `HTTP/1.0` and
  `HTTP/1.1` spellings are accepted; request-target control bytes are rejected.
  `Host` must be an authority shape—userinfo, path/query/fragment, ambiguous
  unbracketed IPv6, and invalid ports are rejected before routing.
- Normal host names use RFC `reg-name` grammar; malformed percent escapes and
  non-authority punctuation are rejected, while valid IPv6/IPvFuture literals
  remain bracketed URI authorities.
- Chunk sizes, data, CRLF boundaries, trailers, and a following pipelined
  request may arrive in arbitrary socket fragments.
- Decoded body limits are checked before every append; trailers have separate
  bounded validation.
- Keep-alive and pipelined suffixes stay attached to the same descriptor
  generation. A stale event from an earlier generation cannot close a newly
  reused OS descriptor.
- `Connection` is parsed as a comma-token list across all field lines; `close`
  wins over `keep-alive`, so an ambiguous list never keeps a peer reusable.
- Outbound `ClientRequest.host` uses that same authority grammar before a
  socket is opened. A resolved `SocketAddr` may deliberately differ for
  virtual hosting, but userinfo, paths, malformed literal addresses, and
  invalid ports are never serialized as `Host`.
- `readTimeout` starts with the first byte of an HTTP/1 request and is absolute;
  sending occasional bytes does not extend it. `idleTimeout` starts at accept
  and refreshes after successful IO. Worker polls wake at least once per second
  to retire expired connections even when no socket event arrives.
- `writeTimeout` bounds the complete response drain across partial writes,
  `EINTR`, and `EAGAIN`. Timeout closes keep-alive rather than pinning the
  event-loop worker indefinitely. Multi-chunk static drains share that one
  absolute deadline rather than restarting it per 64 KiB copy.
- Response headers and bodies are serialized into response-owned reusable
  `StringBuilder` storage. Numeric fields are formatted in place and direct
  sends borrow the initialized prefix, avoiding concatenation temporaries and
  steady-state allocations.
- The response serializer is the final header safety boundary. It owns
  framing fields and silently excludes malformed names or CR/LF-bearing values
  from generic application `Headers`, preventing wire-level header injection.
- Parser delimiter scans use complete fixed `[u8; 16]` blocks and
  `Mask<16>` reductions. This keeps the native SIMD path allocation-free;
  dynamic-size slice comparisons are intentionally not used because they
  materialize a dynamic mask.
- A Fiber handler never writes the final HTTP/1 response directly while the
  connection owns the output buffer. The response is appended exactly once and
  drained in ordered batches, preserving one-request/one-response semantics
  while allowing safe pipelined coalescing. `responseBatchBytes` is a
  high-water mark: after a complete response reaches it, Fiber drains before
  dispatching further pipelined work. An individual larger response remains
  intact, then forces the following batch boundary. Fiber reuses ordinary
  batch capacity, but drops an exceptional buffer larger than two batches
  after it drains, so a one-off large response cannot become permanent RSS on
  an otherwise idle keep-alive connection.
- `sendFile`, `App.static`, and `Group.static` do not load an asset into
  `Response.body`. Fiber writes the exact `Content-Length` header in sequence,
  drains preceding pipelined output, and copies the opened descriptor through
  its reusable 64 KiB worker scratch buffer. A short read or bounded-write
  failure closes that connection, preventing a false-length keep-alive reply.
- Response framing is centralized: Fiber suppresses all `HEAD` payload bytes
  while retaining the corresponding `GET` length, and statuses that cannot
  carry content (`1xx`, `204`, `205`, `304`) are serialized with a zero length.
  User headers cannot override `Content-Length`, `Transfer-Encoding`, or
  `Connection`, avoiding ambiguous HTTP/1 framing.
- Dynamic producers use the route-level `ResponseStreamWriter` API above;
  handlers do not receive arbitrary direct-write access. This keeps response
  ordering, canonical framing and bounded socket writes intact.
- `AppConfig.maxConnections` bounds accepted connections across the whole process, not
  per worker. Excess peers are closed before HTTP parser/state allocation and
  capacity is returned exactly once when the owning descriptor generation
  closes. Non-positive values select the safe 65,536 default.
- `AppConfig.maxHeaderBytes` and `maxHeaders` independently bound HTTP/1
  header storage and field cardinality before handler dispatch. Body or
  pipelined bytes coalesced into the same socket read do not consume the header
  byte budget.

HTTP/2 uses the same configured read/idle/write deadline budgets. A stalled
active connection emits CANCEL GOAWAY; an idle connection emits NO_ERROR
GOAWAY. Both become write-only and close only after the complete terminal frame
drains or the write deadline expires. Per-stream async task deadlines remain a
later lane-specific requirement.

On macOS, the default multi-worker topology uses one dedicated acceptor plus
the configured number of client workers. Accepted handles are transferred
explicitly through worker pipes; `Socket` temporaries do not retain ownership
after transfer. Set `VEX_HTTP_MACOS_SINGLE_WORKER=1` only for diagnostics and
comparative measurements.

## Graceful lifecycle

`listenWithContext` is the canonical cancelable server lifecycle. It reuses
Vex's shared `Context` cancellation state, completes the handler/pipeline
currently executing on each worker, stops new accepts, closes worker-owned
connections, and waits for all HTTP workers before returning.

```vex
import { Context } from "context";
import { App } from "http/fiber";

let (lifetime, stop) = Context.background().withCancel();
let app = App.new();

go {
    app.listenWithContext(lifetime, "0.0.0.0", 3000);
}

// A signal handler or application coordinator owns this capability.
let first = stop.cancel();
```

`listen()` remains the forever-serving convenience form and internally uses
`Context.background()`. Cancellation is cooperative and checked between event
batches; it never tears down a handler halfway through its synchronous
execution. Response draining remains bounded by `writeTimeout`.
