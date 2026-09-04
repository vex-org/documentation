# HTTP/1 Client (`http`)

`http` exposes a bounded, cancellation-aware HTTP/1.1 client. It uses the same
scheduler and ownership model as the server: no blocking resolver is hidden
inside an async request, and every connect, write, and read receives the
caller's `Context`.

## Send one request

Resolve the endpoint at the application boundary, then keep the HTTP authority
and socket endpoint explicit. This permits virtual hosting without putting DNS
on a scheduler worker.

```vex
import { ClientRequest } from "http";
import { Context } from "context";
import { IoError, IoErrorKind, newIoError } from "io/error";
import { IpAddr, Ipv4Addr, SocketAddr } from "net";
import { Duration } from "time";

async fn healthCheck(): Result<string, IoError> {
    let endpoint = SocketAddr(IpAddr.V4(Ipv4Addr.loopback()), 8080);
    let context = Context.background().withTimeout(Duration.seconds(2));
    let request = ClientRequest.new("GET", "api.internal.example", "/health");

    match await request.send(endpoint, &context) {
        Ok(response) => {
            if !response.ok() {
                return Result.Err(newIoError(IoErrorKind.InvalidData, "health endpoint failed"));
            }
            return Result.Ok(response.body);
        }
        Err(failure) => return Result.Err(failure),
    }
}
```

`ClientRequest.host` becomes the `Host` field. `SocketAddr` selects the TCP
peer. The client does not resolve a hostname or infer a port from a URL string.

## Request construction

```vex
import { ClientRequest, HttpClient, HttpClientConfig } from "http";

let! request = ClientRequest.new("POST", "service.example", "/v1/items");
request.setHeader("Authorization", "Bearer token")
       .setContentType("application/json")
       .setBody("{\"name\":\"vex\"}");

let! config = HttpClientConfig.defaults();
config.maxResponseBodyBytes = 2 * 1024 * 1024;
let client = HttpClient.new(config);

// `await client.send(&request, endpoint, &context)`
```

The encoder owns `Host`, `Content-Length`, `Transfer-Encoding`, `Trailer`, and
`Connection`. Supplying any of those through `setHeader` is rejected before a
socket is opened, so the wire has one authority and one framing interpretation.
The direct-origin transport accepts origin-form (`/path?query`) for ordinary
methods, `*` only for `OPTIONS`, and authority-form for `CONNECT`. Absolute-form
proxy targets, URI fragments, and method/form mismatches fail closed rather
than being serialized accidentally. Stateless `send` uses `Connection: close`;
an explicit `HttpSession` owns the `keep-alive` policy instead.

## API

| API | Meaning |
| --- | --- |
| `ClientRequest.new(method, host, path)` | Creates an owning buffered request. |
| `request.setHeader(name, value)` | Adds or replaces an application header. |
| `request.setContentType(value)` | Sets `Content-Type`. |
| `request.setBody(value)` | Sets the complete buffered body. |
| `request.acceptCompressed()` | Advertises the pure-Vex `br`, `zstd`, `gzip`, and `deflate` decoders. |
| `await request.send(endpoint, context)` | Uses default limits for one exchange. |
| `await request.sendInto(endpoint, sink, context)` | Uses default limits and streams the decoded response into an `AsyncWriter`. |
| `HttpClient.new(config)` | Creates a reusable, stateless policy object. |
| `await client.connect(endpoint, context)` | Opens one exclusive reusable `HttpSession` with this policy. |
| `await HttpSession.connect(endpoint, context)` | Opens one exclusive session with default limits. |
| `await session.send(request, context)` | Performs one sequential keep-alive exchange. |
| `await session.sendInto(request, sink, context)` | Streams one sequential response and preserves reuse only after a proven boundary. |
| `await session.sendFrom(request, source, length, context)` | Streams one exact-length request and materializes the response; reuse requires both exact boundaries. |
| `await session.sendFromInto(request, source, length, sink, context)` | Streams request and response bodies without materializing either. |
| `await client.send(request, endpoint, context)` | Sends with explicit limits. |
| `await client.sendFollowing(request, endpoint, redirectPolicy, context)` | Follows a finite same-origin redirect chain without a resolver or hidden DNS. |
| `await client.sendFollowingResolved(request, endpoint, redirectPolicy, resolver, context)` | Follows cross-origin hops through an explicit async `HttpRedirectResolver`. |
| `await client.sendInto(request, endpoint, sink, context)` | Decodes the final body into an `AsyncWriter` without materializing a response-sized string. |
| `await client.sendFrom(request, endpoint, source, length, context)` | Streams an exact-length request over one stateless exchange. |
| `await client.sendFromInto(request, endpoint, source, length, sink, context)` | Streams both directions over one stateless exchange. |
| `response.ok()` / `response.isRedirect()` | Status-class helpers. |
| `response.header(name)` | Case-insensitive response header lookup. |
| `response.decodeContent(decoding)` | Atomically decodes an owning response under explicit byte/layer bounds. |

The transport defaults are intentionally bounded: 4 MiB request bytes, 32 KiB
response headers, 16 MiB transferred response body, 64 response fields, and 16
interim responses. `maxInformationalResponses` must remain in `1..=64`; every
other limit must also be non-zero. Zero never means “unbounded”. Decoded content
has a separate 16 MiB default described below.

## Follow redirects explicitly

`send` still performs exactly one exchange. Redirect behavior is opt-in and
bounded, so enabling it cannot silently add network work to an existing call.

```vex
import { ClientRequest, HttpClient, HttpRedirectPolicy } from "http";

let request = ClientRequest.new("GET", "service.example", "/old/path");
let redirectPolicy = HttpRedirectPolicy.defaults(); // 10 hops
let response = await HttpClient.new().sendFollowing(
    &request, endpoint, &redirectPolicy, &context,
)?;
```

Same-origin means equal ASCII-case-insensitive scheme and host plus equal
effective port. Such a hop keeps using the original caller-resolved
`SocketAddr`; the HTTP layer performs no DNS. Relative and network-path
`Location` values use `url::URL.resolve` (RFC 3986), query components are
preserved, dot segments are normalized, and fragments never reach the request
target.

Cross-origin redirects require an explicit async authority boundary:

```vex
import { HttpRedirectResolver } from "http";

struct AppEndpoints: HttpRedirectResolver {
    api: SocketAddr,
}

async fn (self: &AppEndpoints) resolve(
    host: str, port: u16, context: &Context,
): Result<SocketAddr, IoError> {
    let _ = context;
    if host == "api.example" && port == 80 { return Result.Ok(self.api); }
    return Result.Err(newIoError(IoErrorKind.NotFound, "unknown HTTP authority"));
}

let response = await client.sendFollowingResolved(
    &request, initialEndpoint, &redirectPolicy, &endpoints, &context,
)?;
```

The resolver can use an application-owned pre-resolved map or a genuinely
async resolver; it must not perform blocking DNS on a scheduler worker. Before
any cross-origin resolver/connect, the client removes `Authorization`,
`Proxy-Authorization`, `Cookie`, and `Cookie2` while preserving ordinary
application headers.

Redirect method/body behavior is fixed and testable:

| Status | Next request |
| --- | --- |
| `301` / `302` | `POST` becomes bodyless `GET`; other methods are preserved. |
| `303` | Becomes bodyless `GET`, except `HEAD` remains `HEAD`. |
| `307` / `308` | Method and complete buffered body are replayed exactly. |

The API follows only `301`, `302`, `303`, `307`, and `308` with exactly one
`Location`. A missing `Location` returns the response unchanged. A zero or
greater-than-64 hop policy, exhausted budget, duplicate/malformed `Location`,
URL userinfo, cross-origin hop without a resolver, or non-`http` transport
fails closed. `https` remains unsupported until the cancellation-aware TLS
adapter lands.

Redirect following is intentionally absent from `sendFrom`, `sendInto`, and
`sendFromInto`: an `AsyncReader` or streamed response sink is not replayable by
definition. A future streaming redirect surface must require an explicit body
factory/replay contract rather than retaining or guessing ownership.

## Decode compressed content

Compression is opt-in and composes with both one-shot and redirected owning
responses:

```vex
import { HttpContentDecoding } from "http";

let! request = ClientRequest.new("GET", "assets.example", "/manifest.json");
request.acceptCompressed();

let! response = await client.sendFollowing(
    &request, endpoint, &redirectPolicy, &context,
)?;
response.decodeContent(&HttpContentDecoding.defaults())?;
```

`acceptCompressed()` emits `Accept-Encoding: br, zstd, gzip, deflate`, exactly
the pure-Vex codecs understood by `decodeContent`. The operation parses every
`Content-Encoding` field as a strict comma-token list and reverses the coding
order, so `Content-Encoding: gzip, br` decodes Brotli first and Gzip second.
`identity` is a no-op. Unsupported tokens, empty elements and trailing commas
are errors rather than guesses.

`HttpContentDecoding.defaults()` allows 16 MiB of decoded output and four
non-identity layers; the hard layer ceiling is 16. The transferred body remains
independently bounded by `HttpClientConfig.maxResponseBodyBytes`. Every decode
stage observes the decoded ceiling, preventing nested compression bombs.
Unknown-size frames begin with a small source-proportional allocation and grow
geometrically only after a typed codec capacity signal; the 16 MiB ceiling is
not reserved for a tiny response.

Mutation is atomic. On malformed content, unsupported coding or a limit error,
the original encoded body and headers remain available for diagnostics. On
success, the body becomes the decoded representation and stale wire
`Content-Encoding`/`Content-Length` fields are removed; representation headers
such as `Content-Type` remain.

`sendInto` does not decode compressed content yet. Whole-buffer fallback would
violate its allocation-bounded streaming contract, so streamed decompression
waits for incremental codec readers that preserve `AsyncWriter` backpressure.

## Stream a response body

`sendInto` is the bounded download/proxy path. It returns `ClientResponseHead`
after the final body has been decoded into the supplied `AsyncWriter`; the
response body itself is not retained by the client. The decoder uses a reused
16 KiB transport scratch buffer, preserves the same `Context` for both socket
and sink writes, accepts fixed-length/chunked/close-delimited bodies, and
enforces the configured decoded-body limit.

```vex
import { ClientRequest, HttpClient } from "http";
import { AsyncWriter, IoError } from "io";

async fn download<W>(
    endpoint: SocketAddr, destination: &W, context: &Context,
): Result<i32, IoError> where W: AsyncWriter {
    let request = ClientRequest.new("GET", "assets.example", "/release.bin");
    let client = HttpClient.new();
    let response = await client.sendInto(&request, endpoint, destination, context)?;
    return response.status;
}
```

The destination observes normal async short-write/backpressure semantics via
`io::asyncWriteAll`.

## Stream a request body

`sendFrom` accepts a mutable `AsyncReader` and one exact `Content-Length`.
`ClientRequest.body` must remain empty, because buffered plus streamed payloads
would create two authorities for framing. The complete head plus declared body
length is checked against `maxRequestBytes` before connect. A fixed 16 KiB
buffer carries natural source and socket backpressure; every read and write
uses the caller's `Context`.

```vex
let request = ClientRequest.new("PUT", "assets.example", "/upload.bin");
let! source = UploadReader.open(); // implements AsyncReader
let response = await client.sendFrom(
    &request, endpoint, &source!, sourceLength, &context,
)?;
```

`sendFromInto` additionally accepts an `AsyncWriter` for the decoded response.
Premature source EOF returns `IoErrorKind.UnexpectedEof`; cancellation, source
failure and socket failure close the transport. An exclusive `HttpSession`
becomes reusable only after the declared request bytes and canonical response
framing have both reached their terminal boundaries.

## Reuse one exclusive connection

`HttpSession` is the zero-lock, caller-owned foundation for connection reuse.
It is intentionally sequential rather than a shared pool: one session accepts
one request at a time, so HTTP/1.1 response association cannot drift across
tasks. It emits `Connection: keep-alive` and remains reusable only after an
exact HTTP/1.1 boundary with no unread bytes.

```vex
let client = HttpClient.new();
let! session = await client.connect(endpoint, &context)?;

let first = ClientRequest.new("GET", "service.example", "/one");
let one = await session.send(&first, &context)?;

let second = ClientRequest.new("GET", "service.example", "/two");
let two = await session.send(&second, &context)?;
```

The session closes and becomes non-reusable on I/O or protocol failure,
cancellation, `Connection: close`, HTTP/1.0, `101`, or a close-delimited body.
Calling it while an exchange is in flight returns `IoErrorKind.ResourceBusy`.
It is not a shared connection pool and it does not pipeline requests. Its
bounded request encoder and response decoder workspace are reused after a
successful exchange; returned `ClientResponse` values retain independent owned
headers and body data. A one-off large decoded body is not retained by the idle
session after that response has been materialized.

## Framing and safety

The client and HTTP parser share one framing classifier. It accepts exactly one
of:

- a single decimal `Content-Length`;
- one exact `Transfer-Encoding: chunked`; or
- no explicit framing (a response body is then delimited by connection close).

Duplicate `Content-Length`, duplicate `Transfer-Encoding`, `Content-Length`
combined with `Transfer-Encoding`, transfer-coding substring matches such as
`notchunked`, malformed values, and bodies beyond configured limits are errors.
This avoids a client/proxy boundary disagreement.

`Connection` is interpreted as an RFC comma-token list across every such
header field: `Connection: keep-alive, close` retires a session, while an
`upgrade` token is detected even when it shares a field with other tokens.

Interim `1xx` responses are consumed before the final response under
`maxInformationalResponses`; an endless `100`/`103` chain therefore cannot pin
the exchange. `101 Switching Protocols` returns `IoErrorKind.Unsupported`. A
successful `CONNECT` response is rejected for the same ownership reason: the
current surface cannot safely pretend to hand over a live WebSocket or tunnel.

Method comparison is ASCII-case-insensitive for response semantics. `HEAD`,
`204`, and `304` consume no body bytes. Informational responses and `204` must
not contain message framing. A `205 Reset Content` accepts no framing,
`Content-Length: 0`, or a proven empty chunked stream; a non-zero length or
non-empty chunk fails closed. These rules preserve the exact boundary required
for safe `HttpSession` reuse.

## Lifecycle and present boundary

Stateless exchange primitives each open one TCP stream, perform one complete
exchange, and close it. `sendFollowing*` composes those exact exchanges under
its explicit hop policy. `HttpSession` is the explicit sequential reuse surface;
it proves the response boundary before retaining a connection and retires it on
any unsafe boundary. There is no implicit/shared pooling, implicit redirect
following, TLS, streamed decompression, or upgraded-stream handoff yet. Streaming APIs never
transfer ownership of the TCP stream.

Internally, request writes use `io::asyncWriteAll` and response reads use the
generic `io::AsyncReader` contract. The contract carries the caller's
`Context` on every operation and is the future adapter seam for TLS and
streaming bodies; it does not yet imply TLS, shared pooling or an exposed
stream handoff API.

Those features will be added behind explicit ownership and cancellation
contracts; they are not emulated by a convenience wrapper. For HTTP server and
Fiber application APIs, see [HTTP overview](./index.md) and
[Fiber](./fiber.md).
