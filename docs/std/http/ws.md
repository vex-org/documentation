# WebSocket (`http/ws`)

Fiber exposes a bounded RFC 6455 server endpoint through `App.ws` and
`Group.ws`; `App.wsWithLifecycle` and `Group.wsWithLifecycle` add optional
open/close hooks. Every callback runs on the same worker that owns the
connection. Message and open callbacks receive a temporary `&WsSession!`, not
a raw descriptor or blocking socket API.

```vex
import { App } from "http/fiber";
import { WsMessage, WsSession } from "http/ws";

fn echo(peer: &WsSession!, message: WsMessage) {
    if message.isText() {
        let _ = peer.sendText(message.data);
    }
}

let! app = App.new();
app.ws("/chat/:room", echo);
app.listen("127.0.0.1", 3000);
```

`Group.ws` preserves its prefix and route middleware in the same way as
ordinary Fiber routes. Middleware runs before the upgrade marker, so an auth
middleware can reject the HTTP request normally; no WebSocket state is created
in that case.

Use lifecycle hooks when a route needs to initialize or release application
state around a validated handoff:

```vex
fn opened(peer: &WsSession!) {
    let _ = peer.sendText("ready");
}

fn closed(sessionId: u64) {
    // The transport has been retired; release this connection's app state.
    let _ = sessionId;
}

app.wsWithLifecycle("/chat/:room", Some(opened), echo, Some(closed));
```

`opened` runs after Fiber has accepted the request and queued `101 Switching
Protocols`, before any complete WebSocket message is delivered. `closed` runs
exactly once on the owner worker when Fiber retires the connection (peer close,
protocol failure, I/O failure, deadline, or shutdown). It receives a unique
opaque `u64`, never a recycled OS descriptor or session handle, so it remains
observational after transport ownership has ended.

## Subprotocol selection

`WsRouteOptions` compiles supported protocol tokens into frozen route metadata.
Insertion order is server preference order; selection allocates only the one
owned protocol string for an accepted connection, never a request-time vector.

```vex
import { App, WsRouteOptions } from "http/fiber";

let! protocols = WsRouteOptions.new();
protocols
    .protocol("vex.chat.v2")
    .protocol("vex.chat.v1")
    .requireSubprotocol();

app.wsWithOptions("/chat/:room", protocols, echo);
```

Use `wsWithLifecycleOptions` when the same route also needs open/close hooks.
`peer.protocol()` returns the selected token to both open and message
callbacks, or an empty `str` when an optional policy selected none.

Client and server lists are each limited to 32 tokens. Client tokens are
case-sensitive and may span repeated `Sec-WebSocket-Protocol` fields, but empty
elements, invalid HTTP tokens, duplicates, and trailing commas reject the
handshake. Server-configured tokens are additionally limited to 255 bytes. The
server emits exactly one client-offered token. By default a
valid no-overlap request may upgrade without a protocol; `requireSubprotocol`
instead rejects it before connection ownership changes.

## Ownership and backpressure

After a valid `101` handoff, the original HTTP/1 connection state changes in
place to a worker-owned `WsSession`. The worker remains the sole fd owner:

- prior pipelined HTTP responses drain before `101` is queued;
- a frame coalesced with the upgrade request is retained as initial WebSocket
  input, never dropped or reparsed as HTTP;
- reads and writes use the same bounded `net::Conn` input/output queues;
- write readiness is armed only while queued output exists, so regular HTTP
  connections do not pay an `EVT_WRITE` wake-up cost;
- at most 256 received frames are delivered from one connection in one worker
  turn; remaining already-buffered frames enter a worker-local FIFO, so a ping
  or tiny-message flood cannot monopolize a worker and Linux `EPOLLET` bytes
  are still drained into the bounded input queue;
- text/binary replies use `sendText` / `sendBinary`; ping replies and close
  echoes are queued by the transport state rather than synchronously written;
- each input and output queue is capped at 16 MiB. A slow peer becomes a
  visible `false` return from a send method, not unbounded worker RSS.

Fiber reclaims its request-local arena before constructing the long-lived
session. Only a fixed inline capability containing the validated 24-byte key
and selected bounded protocol crosses that boundary; the `Request` and its
borrowed header views never escape. The automated 2026-08-24 loopback test
coalesces the opening request and first masked frame in one TCP write and
verifies `101`, protocol visibility in both callbacks, ordered replies, close
drain and bounded server join (7 ms O3 runtime on M2 Max).

`WsSession.close()` queues one close frame and becomes drain-only. The worker
retires the descriptor once that queue drains, or under Fiber's normal idle /
read deadline and shutdown ownership rules. `sendText` rejects invalid UTF-8;
`closeWith` rejects reserved/invalid close codes and malformed UTF-8 reasons.
Malformed peer framing queues the RFC 6455 `1002` protocol-error close when
the bounded outbound queue still has capacity, then becomes drain-only.

## RFC 6455 boundary

The opening request requires HTTP/1.1 `GET`, exactly one
`Sec-WebSocket-Key`, exactly one `Sec-WebSocket-Version: 13`, list-aware
`Upgrade: websocket` and `Connection: upgrade` tokens, and a canonical Base64
key decoding to exactly 16 bytes. HTTP request bodies and
`Transfer-Encoding` are refused before handoff so body bytes cannot be
smuggled into frame input.

Frames are strict and extension-free: reserved RSV bits/opcodes,
non-canonical extended lengths, unmasked client frames, fragmented control
frames, invalid close payloads, malformed UTF-8 text/close reasons and invalid
continuation order fail closed. Fragmented messages, ping/pong and close echo
are handled by the session state with a 16 MiB message ceiling.

## Current scope

This is a plaintext HTTP/1 WebSocket server path. TLS termination, negotiated
extensions (including permessage-deflate), outbound cross-worker broadcast
ownership and HTTP/2 extended CONNECT are intentionally not implied by
`App.ws`. `WsConn` remains
available only as the lower-level blocking helper for callers that already own
their descriptor; do not use it inside a live Fiber route.
