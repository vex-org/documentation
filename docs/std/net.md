# net — TCP Sockets

High-level TCP networking built on Vex's async runtime. Sockets implement the `Drop` contract for safe, automatic lifecycle management and port/descriptor release.

## TCP Listener

```vex
import { TcpListener } from "std/net";

// Binds socket and starts listening
let listener = TcpListener.bind("127.0.0.1", 8080);
if listener.fd < 0 {
    $println("listen failed");
    return;
}

// listener is automatically closed when it goes out of scope
let stream = listener.accept();
```

## TCP Stream

```vex
import { TcpStream } from "std/net";

// Connect to remote address
let stream = TcpStream.connect("127.0.0.1", 8080);
if stream.fd >= 0 {
    stream.writeStr("hello");
    // stream is automatically closed when it goes out of scope
}
```

## Current Surface Notes

### Static Constructors

- `TcpListener.bind(ip, port)`: Bind socket and start listening.
- `TcpStream.connect(ip, port)`: Establish client connection to a remote socket.

### Sockets & Connections

- `accept()`: (Async) Accept a connection, returning a `TcpStream`.
- `incoming()`: Return a `Channel&lt;TcpStream&gt;` that receives incoming connections from a background accept loop.
- `read(buf: *u8, len: i32): i64`: (Async) Read data.
- `write(data: *u8, len: i32): i64`: (Async) Write raw bytes.
- `writeStr(s: string): i64`: (Async) Write a string.
- `close()`: Explicitly close the socket.

The standard library exports deprecated compatibility wrappers (`TcpListener(ip, port)` and `TcpStream(ip, port)`) which invoke `.bind` and `.connect` respectively.

