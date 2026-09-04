# HTTP & Client Overview

For routed synchronous HTTP/1-only services, `App<{HTTP_V1}>.new()` selects a
compile-time capability profile. `App` and its `Group` values retain one exact
const-generic mask while H2, WebSocket, async-route and streaming execution
engines are excluded from the emitted program. Capabilities can be composed,
for example `App<{HTTP_V1 | WEBSOCKET}>`; unsupported registrations fail at
compile time. The exact zero-residue listener currently applies to `HTTP_V1`;
other valid masks use the full worker kernel until per-bit worker specialization
lands. Plain `App.new()` remains the `HTTP_FULL` compatibility default. The
choice adds no per-request runtime feature branch. See
[Fiber Framework](./fiber.md#compile-time-http1-profile).

The `http` package provides Vex-native HTTP parsers, client/server foundations,
and the `http/fiber` application framework. Its API direction takes inspiration
from modern Go/Rust libraries and Fiber v3, while ownership, arenas, scheduling,
and hardware acceleration remain native Vex mechanisms.

HTTP/1 is under active production hardening. Fiber WebSocket HTTP/1 upgrade
has a bounded worker-owned connection state machine with explicit lifecycle
hooks; live interoperability/load gates remain open. HTTP/2 has a unified
bounded protocol/application owner and a live cleartext prior-knowledge path
for synchronous buffered routes, async request routes and bounded streaming
responses. TLS ALPN, request-body streaming, WebSocket-over-H2 and external
interoperability remain open. HTTP/3/QUIC is a planned later phase after the
shared HTTP/1, application, scheduler, and HTTP/2 contracts stabilize.

## Key Capabilities

1. **Fiber v3 Framework Layer**: Complete web framework abstractions (`App`, `Ctx`, `Router`) supporting `:param` binding and `*wildcard` routes.
2. **Zero-Copy Parsers**: Request parsers strictly slice bytes (`Span&lt;u8&gt;`) from the underlying socket without any intermediate GC allocation for headers or values.
3. **WebSockets (`http/ws`)**: Fiber-integrated HTTP/1 RFC 6455 upgrade with
   worker-owned bounded queues, strict framing, lifecycle hooks, non-blocking
   partial I/O, bounded route-level subprotocol selection and idle timeout
   ownership. An automated loopback gate covers coalesced upgrade/frame handoff,
   request-arena lifetime, protocol callbacks and close drain; external
   interoperability/load gates remain.
4. **HTTP/2 (`http/parser`, `http/fiber`)**: Bounded protocol foundations plus
   live cleartext prior-knowledge serving for synchronous buffered and async request routes:
   exact fragmented-preface selection, non-blocking worker queues, negotiated and
   type-specific frame checks with typed RFC stream/connection error scope,
   separate local-configuration failures, and extension-safe unknown-frame
   discard that still enforces field-block exclusivity. Transactional SETTINGS,
   typed whole-block HPACK,
   complete Huffman decoding, explicit header/table limits, checked stream
   windows, atomic capacity-aware control encoders and connection-owned
   CONTINUATION/SETTINGS-ACK/GOAWAY sequencing. DATA ownership is transactional
   across exact payload shape, checked padding, borrowed application bytes,
   scheduler budget, connection/stream windows and END_STREAM state. Late DATA
   is discarded without losing connection credit, while closed-stream
   WINDOW_UPDATE races are accepted without reviving state;
   generic frame APIs cannot bypass it. WINDOW_UPDATE has the same exact-frame
   ownership across parsing/encoding, sequencing, scoped overflow, credit and
   scheduler wakeup. RST_STREAM likewise owns exact payload/error decoding,
   idle-stream scope, sequencing, retirement and complete encoding; failed
   output commits nothing. SETTINGS window deltas are overflow-safe and
   directional. Explicit endpoint roles enforce
   local/peer stream parity, monotonic peer IDs, capacity, non-wrapping ID
   exhaustion and graceful GOAWAY drain/retry boundaries before materialization.
   Dedicated GOAWAY receive/send methods bind exact payload/debug bytes,
   sequencing, the non-increasing boundary, retry-safe retirement and complete
   encoding; failed output cannot begin draining.
   PING uses exact opaque payloads and a preallocated bounded correlation set;
   duplicate/full/failed sends consume no token, matched ACKs release one, and
   unmatched ACKs cannot corrupt another liveness probe.
   RFC 9218 priority fields and PRIORITY_UPDATE are bounded and typed. Dedicated
   receive/send methods atomically bind exact parsing or encoding, client-only
   sequencing and scheduler mutation; generic frame APIs cannot bypass them.
   A pre-reserved urgency/incremental
   scheduler providing serial/round-robin service, bounded starvation and no
   allocation during selection/completion. Deprecated RFC 7540 PRIORITY is
   isolated behind compatibility-only exact-frame methods: it accepts any
   stream state without materializing unknown IDs, preserves error scope and
   never enters the RFC 9218 scheduler. `H2ProtocolState` is the recommended
   integration boundary: it atomically owns admission, recyclable stream slots,
   active plus idle priority capacity, flow-aware writable leases,
   reset, GOAWAY retirement and abort. It also owns bounded fragmented
   header reassembly and the connection-lifetime HPACK table; stream errors do
   not desynchronize later streams, while compression errors fail the
   connection closed. Successfully decompressed fields then cross a strict
   request/response/CONNECT/push/trailer semantic gate; invalid names/values,
   connection fields and pseudo-header/message-phase violations retire only the
   malformed stream before application delivery. It also owns SETTINGS lifecycle: peer changes apply
   immediately, local snapshots commit in FIFO ACK order, initial-window deltas
   are transactional, and acknowledged HPACK table reductions are enforced at
   the next field-block boundary. Wire-level unlimited defaults remain separate
   from configured local memory/concurrency ceilings.
   `H2ProtocolState.recvFrame` is the single complete-frame receive boundary:
   known types reach their dedicated transaction, unknown extensions remain
   connection-sequenced, and HEADERS performs peer admission internally.
   Refused/GOAWAY-ignored field blocks still advance HPACK before their typed
   result is returned, so transport cannot split admission from compression.
   Completed field results retain validated message kind, pseudo-header
   positions and END_STREAM. Content-Length lists and DATA content totals are
   owned per stream in both directions; padding consumes flow credit but never
   content length, while mismatches fail without contaminating the connection.
   connection-owned `recvBytes` handles fragmented caller-owned input with
   exact consumed-prefix reporting. Valid payloads remain zero-copy; rejected
   stream payloads are discarded incrementally without frame-sized allocation
   before parsing resumes at the next pipelined frame.
   Outbound field sections use the same owner: semantic phase,
   stream/connection transition, negotiated limits, HPACK table and output
   commit atomically. Indexing policy is explicit, credentials/cookies default
   to never-indexed, Huffman is used only when smaller, and generic frame APIs
   reject header-bearing sends. Successful blocks return an allocation-free
   cursor that maps the contiguous payload to negotiated-size HEADERS and
   CONTINUATION frames without copying. Server `sendPushPromise` uses the same
   transaction for the carrier, even promised ID, `ReservedLocal` slot,
   scheduler capacity and HPACK bytes; its cursor includes the four-byte
   promised-ID prefix in exact frame/queue accounting.
   Fiber contains no dormant H2 side transport; prior knowledge installs the
   same cancellable non-blocking owner used by the protocol/application tests.
   Async request handlers publish through a bounded worker-local completion
   lane while the event loop retains the socket. Exact connection-generation
   identity rejects late results after reset, deadline, shutdown or fd reuse.
5. **Middlewares**: Composable request handlers for logging and CORS. Static
   serving is a first-class `App.static` / `Group.static` route, not a duplicate
   middleware path.

## Verified HTTP/1 behavior

- strict request framing rejects ambiguous length/transfer-encoding forms;
- bounded incremental fixed-length and chunked bodies;
- fragmented chunks and trailers with exact consumed/decoded progress;
- preserved HTTP/1 pipelining suffixes and keep-alive ordering;
- frozen immutable routing with worker-local request scratch;
- route-local middleware is held once in a startup-owned flat router pool;
  frozen radix nodes retain route identity only, avoiding per-route middleware
  allocation/copy and duplicate handler ownership;
- explicit native-handle ownership transfer in multi-worker servers;
- request arenas reset handler temporaries without owning persistent connection
  state;
- monotonic absolute HTTP/1 read deadlines resist slowloris drip-feeding;
- idle peers are retired by bounded worker maintenance ticks;
- response drains are bounded across partial writes and socket backpressure;
- one shared `AppConfig.maxConnections` budget sheds excess accepted peers before
  parser/state allocation and reclaims capacity on exact descriptor ownership;
- response serialization uses reusable one-pass storage with zero allocations
  after warmup on the verified common path.
- fixed-width `Mask<16>` SIMD delimiter scans avoid dynamic-mask allocation in
  the HTTP/1 parser hot path; request/response correctness does not depend on
  a C or Rust parser implementation.
- the live Fiber and canonical request parsers agree on exact HTTP version,
  request-target, framing, and `Connection` token rules; those shared security
  boundaries are regression-tested rather than inferred from one parser alone.
- Fragmented `Content-Length` and chunked request bodies share one incremental
  body state, so slow uploads retain their header once rather than repeatedly
  copying the complete partial request.
- Fiber appends responses directly into connection-owned reusable storage;
  `Response.appendEncodedTo(out)` exposes the same caller-owned batching
  contract for advanced servers without raw socket manipulation. Its
  `AppConfig.responseBatchBytes` high-water mark drains long pipelined bursts
  before aggregate response storage can grow with the peer's request queue;
  exceptional response buffers are released after drain rather than retained
  for the entire keep-alive connection.
- `App.listenWithContext` provides context-native cancellation, descriptor
  cleanup, worker joining, and same-port restart safety.
- `App.static` and `Group.static` canonicalize both the configured root and
  candidate before opening a file. Explicit parent traversal and symlinks that
  resolve outside the published root are rejected.
- Known-length static and `Ctx.sendFile` responses are framed in order and
  streamed from their opened descriptor through Fiber's reusable 64 KiB worker
  scratch buffer, rather than being materialized as response-sized strings.
- Dynamic HTTP/1 responses use `App.getStream` / `postStream` and a bounded
  `ResponseStreamWriter`: canonical chunk framing, terminal signaling and a
  single full-response deadline remain Fiber-owned. Stream routes preserve the
  normal frozen router and middleware chain, while prior pipelined replies
  drain before a producer starts.
- Response framing has one authority: `HEAD` reports the equivalent `GET`
  length without sending bytes, while `1xx`, `204`, `205`, and `304` never
  carry content. Application headers cannot inject a competing
  `Content-Length`, `Transfer-Encoding`, or `Connection` field.

See [Fiber Framework](./fiber.md) for the live server model and
`lib/std/http/VISION.md` in the source tree for open production gates.

---

## HTTP Client

The outbound HTTP/1 client is a bounded async exchange over an already-resolved
`SocketAddr`. A request carries its HTTP authority; the endpoint carries its
TCP peer. This prevents a blocking DNS operation from being accidentally hidden
inside a scheduler task.

```vex
import { ClientRequest } from "http";
import { Context } from "context";
import { IpAddr, Ipv4Addr, SocketAddr } from "net";
import { Duration } from "time";

let endpoint = SocketAddr(IpAddr.V4(Ipv4Addr.loopback()), 8080);
let context = Context.background().withTimeout(Duration.seconds(2));
let request = ClientRequest.new("GET", "service.example", "/health");
let response = await request.send(endpoint, &context)?;
```

The encoder owns `Host`, `Content-Length`, and `Connection`. Stateless client
calls use `Connection: close`; an explicit caller-owned `HttpSession` uses
`keep-alive` only after a proven response boundary. The client uses one
canonical framing decision shared with the parser: a single
`Content-Length`, exact `Transfer-Encoding: chunked`, or close-delimited body.
Ambiguous framing and configured-size violations are errors. There is no
implicit shared pool.

Redirects are equally explicit. `sendFollowing` accepts a finite
`HttpRedirectPolicy` and reuses the caller-resolved endpoint only for
same-origin hops. `sendFollowingResolved` requires an async
`HttpRedirectResolver` before any cross-origin connection and strips
authorization/cookie credentials at that boundary. RFC 3986 relative
resolution, method/body replay rules, unsupported schemes and limit failures
are documented and tested; ordinary `send` still means exactly one exchange.

Owning responses can opt into pure-Vex `br`, `zstd`, `gzip`, and `deflate`
decoding with `acceptCompressed` plus `decodeContent`. Transferred and decoded
byte ceilings are independent, coding chains are bounded and reversed
strictly, and failure leaves the raw response unchanged. Streamed decoding is
not emulated with hidden whole-body buffering.

Interim responses have an explicit count bound. Upgrade and successful
`CONNECT` responses are rejected until a public API can transfer sole stream
ownership. `HEAD`, `204`, `205`, and `304` follow their bodyless response
semantics; `205` may consume only a provably empty framed body.

Chunked responses are safe across arbitrary TCP read boundaries: an incomplete
chunk-size line, data CRLF, or trailer is retained in a small bounded framing
buffer, while already-decoded payload goes directly to the selected response
destination. This applies equally to buffered `send` and `sendInto`.

The client already routes its request/response I/O through the shared,
context-required `io::AsyncReader` / `AsyncWriter` boundary. This preserves
cancellation and backpressure semantics today while reserving one adapter seam
for TLS and streaming bodies; it is not a claim of pooling or upgrade support.

See [HTTP Client](./client.md) for limits, cancellation behavior, supported
surface, and deliberate current boundaries.
