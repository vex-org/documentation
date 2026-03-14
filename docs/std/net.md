# net

The current `net` TCP surface is blocking-style and built around `TcpListener` / `TcpStream` value types.

## TCP Listener

```vex
let listener = TcpListener("127.0.0.1", 8080)
if listener.fd < 0 {
    $println("listen failed")
}

let stream = listener.accept()
stream.close()
listener.close()
```

## TCP Stream

```vex
let stream = TcpStream("127.0.0.1", 8080)
if stream.fd >= 0 {
    stream.writeStr("hello")
    stream.close()
}
```

## Current Surface Notes

- `TcpListener(ip, port)` constructs a listener.
- `accept()` returns a `TcpStream`.
- `TcpStream(ip, port)` constructs a connected stream.
- `read(buf: *u8, len: i32): i64`
- `write(data: *u8, len: i32): i64`
- `writeStr(s: string): i64`
- `close()` closes the socket.

This page intentionally documents the current tested exported surface, not an aspirational async socket wrapper.
