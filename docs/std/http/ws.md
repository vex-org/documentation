# WebSockets (`http/ws`)

The `http/ws` package provides seamless WebSocket connection management integrated deeply into Vex's zero-cost paradigms, strictly conforming to the RFC 6455 standard layout.

Through Vex's `Fiber v3` ecosystem, checking for `Upgrade` routes, negotiating WebSocket handshakes, and spawning asynchronous `messageLoop` blocks is all handled inside minimal code footprints.

## Connection Upgrade (`HTTP` to `WebSocket`)

You can effortlessly transition an ordinary `App` route into a full-duplex WebSocket instance based on standard HTTP `Upgrade` headers:

```rust
import { App, Ctx } from "http/fiber";
import { WsConn, WsMessage, isWebSocketUpgrade } from "http/ws";

app.get("/ws", fn(c: &Ctx!) {
    // 1. Verify Request Intention
    if !isWebSocketUpgrade(&c.req) {
        c.sendStatus(400); // Bad Request if not upgrading
        return;
    }

    // 2. Perform Handshake & Spawns Async Stream Socket
    let! ws = WsConn.upgrade(c.req.fd, &c.req);
    
    // 3. Keep Connection Running
    ws.messageLoop(fn(msg: WsMessage) {
        println("Incoming Message: {msg.text()}");

        // Broadcast/Echo
        ws.sendText("Echo: " + msg.text());
    });
});
```

## `WsConn` Capabilities

You can actively manage the bidirectional socket link directly:

| API | Description |
|-----|-------------|
| `conn.sendText(text)` | Send UTF-8 text frames. |
| `conn.sendBinary(data, len)` | Emits unstructured binary frames. |
| `conn.sendPing()` / `conn.sendPong()` | Emits heartbeat pings to detect disconnections. |
| `conn.readMessage()` | Manually suspend and await next incoming packet. |
| `conn.close()` | Emits `WS_CLOSE` termination byte frame natively tearing down the TCP link. |

## Receiving Data (`WsMessage`)

In the `messageLoop` or via `readMessage()`, the server intercepts WebSocket payloads automatically parsed from the fragmented stream buffer.

- `msg.opcode`: Numeric constant (`WS_TEXT`, `WS_BINARY`, `WS_CLOSE`).
- `msg.isText()`, `msg.isBinary()`, `msg.isClose()`
- `msg.text()`: Reads the UTF-8 converted payload.
- `msg.data`: The exact raw bytes block pointer.
