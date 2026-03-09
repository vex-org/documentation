# net

The `net` module provides core networking capabilities for Vex. Designed heavily around non-blocking event loops, all network I/O operations inherently integrate with Vex's goroutine-style `go { }` task scheduler, meaning scaling to tens of thousands of connections happens automatically.

## Core Abstractions

- `net.TcpListener`: Binds to a port and acts as a server listening socket.
- `net.TcpStream`: A connected socket (client connection).
- `net.UdpSocket`: Connectionless datagram networking.

## Using `TcpListener`

Because Vex defaults to non-blocking structures integrated with `epoll/kqueue/io_uring`, you write imperative-looking sync code that actually awaits asynchronously under the hood.

```rust
import { TcpListener } from "net";

async fn main() {
    let listener = TcpListener.bind("127.0.0.1:8080").unwrap();
    println("Listening on port 8080...");

    while true {
        // This 'awaits' yieldingly without blocking the OS thread
        let stream = await listener.accept().unwrap();
        
        // Spawn a lightweight task for each connection
        go {
            await handle_client(stream);
        };
    }
}
```

## Buffer Management

To avoid massive garbage collector sweeps on high-throughput servers, `TcpStream.read` and `TcpStream.write` accept `Span<u8>`. You should always slice your pre-allocated `RawBuf` or `Vec` into these spans to handle chunked reading efficiently.
