# Project v0.0.0

## Overview

**Structs:** [`TcpListener`](#TcpListener) · [`TcpStream`](#TcpStream) · [`Event`](#Event) · [`EventLoop`](#EventLoop) · [`UdpSocket`](#UdpSocket) · [`WsFrame`](#WsFrame) · [`Conn`](#Conn) · [`Socket`](#Socket) · [`HttpHeader`](#HttpHeader) · [`HttpRequestLine`](#HttpRequestLine) · [`HttpRequest`](#HttpRequest) · [`StreamParser`](#StreamParser) · [`UriParts`](#UriParts)

**Functions:** [`TcpListener`](#TcpListener) · [`TcpStream`](#TcpStream) · [`readEvent`](#readEvent) · [`UdpSocket`](#UdpSocket) · [`parseFrame`](#parseFrame) · [`encodeFrame`](#encodeFrame) · [`encodeText`](#encodeText) · [`encodeClose`](#encodeClose) · [`encodePing`](#encodePing) · [`encodePong`](#encodePong) · [`unmask`](#unmask) · [`isControlFrame`](#isControlFrame) · [`isDataFrame`](#isDataFrame) · [`cpuCount`](#cpuCount) · [`makePipe`](#makePipe) · [`tcpBlockingFd`](#tcpBlockingFd) · [`connectFd`](#connectFd) · [`bindFd`](#bindFd) · [`listenFd`](#listenFd) · [`acceptFd`](#acceptFd) · [`setReuseAddrFd`](#setReuseAddrFd) · [`setNoDelayFd`](#setNoDelayFd) · [`recvFd`](#recvFd) · [`sendFd`](#sendFd) · [`closeFd`](#closeFd) · [`peekFd`](#peekFd) · [`writeFd`](#writeFd) · [`readFd`](#readFd) · [`asyncAcceptFd`](#asyncAcceptFd) · [`asyncRecvFd`](#asyncRecvFd) · [`asyncSendFd`](#asyncSendFd) · [`setNonBlockFd`](#setNonBlockFd) · [`parseHttp`](#parseHttp) · [`vex_http_string`](#vex_http_string) · [`vex_http_string`](#vex_http_string) · [`vex_http_string`](#vex_http_string) · [`getHeaderPtr`](#getHeaderPtr) · [`methodIs`](#methodIs) · [`getHeader`](#getHeader) · [`getMethod`](#getMethod) · [`getUri`](#getUri) · [`getVersionMajor`](#getVersionMajor) · [`getVersionMinor`](#getVersionMinor) · [`getHeaderCount`](#getHeaderCount) · [`getHeaderNameByIdx`](#getHeaderNameByIdx) · [`getHeaderValueByIdx`](#getHeaderValueByIdx) · [`getBody`](#getBody) · [`getBodyLenUsize`](#getBodyLenUsize) · [`getBodyLen`](#getBodyLen) · [`isKeepAlive`](#isKeepAlive) · [`methodIsRaw`](#methodIsRaw) · [`splitUri`](#splitUri) · [`monotonicNs`](#monotonicNs) · [`prepareWorkers`](#prepareWorkers) · [`flushSpawnBatch`](#flushSpawnBatch) · [`fileExists`](#fileExists) · [`readFile`](#readFile) · [`rbInit`](#rbInit) · [`rbHeader`](#rbHeader) · [`rbSend`](#rbSend)

**Constants:** [`EVT_READ`](#EVT_READ) · [`EVT_WRITE`](#EVT_WRITE) · [`EVT_HUP`](#EVT_HUP) · [`EVT_ERR`](#EVT_ERR) · [`WS_CONTINUATION`](#WS_CONTINUATION) · [`WS_TEXT`](#WS_TEXT) · [`WS_BINARY`](#WS_BINARY) · [`WS_CLOSE`](#WS_CLOSE) · [`WS_PING`](#WS_PING) · [`WS_PONG`](#WS_PONG) · [`WS_OK`](#WS_OK) · [`WS_NEED_MORE`](#WS_NEED_MORE) · [`WS_ERR_INVALID`](#WS_ERR_INVALID) · [`RBUF_INIT`](#RBUF_INIT) · [`RBUF_MAX`](#RBUF_MAX) · [`WBUF_INIT`](#WBUF_INIT) · [`WBUF_MAX`](#WBUF_MAX) · [`HTTP_OK`](#HTTP_OK) · [`HTTP_ERR_TRUNCATED`](#HTTP_ERR_TRUNCATED) · [`HTTP_ERR_BAD_REQUEST`](#HTTP_ERR_BAD_REQUEST) · [`HTTP_MAX_HEADERS`](#HTTP_MAX_HEADERS)

## Constants

### <a id="EVT_READ"></a>`EVT_READ` `🔓 export`

&gt; 📄 `event_loop.vx` L33-33

```vex
export const EVT_READ: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="EVT_WRITE"></a>`EVT_WRITE` `🔓 export`

&gt; 📄 `event_loop.vx` L34-34

```vex
export const EVT_WRITE: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="EVT_HUP"></a>`EVT_HUP` `🔓 export`

&gt; 📄 `event_loop.vx` L35-35

```vex
export const EVT_HUP: i32=4;
```

**Returns:** `i32=4;`

---

### <a id="EVT_ERR"></a>`EVT_ERR` `🔓 export`

&gt; 📄 `event_loop.vx` L36-36

```vex
export const EVT_ERR: i32=8;
```

**Returns:** `i32=8;`

---

### <a id="WS_CONTINUATION"></a>`WS_CONTINUATION` `🔓 export`

&gt; 📄 `ws_parser.vx` L22-22

```vex
export const WS_CONTINUATION: u8=0;
```

**Returns:** `u8=0;`

---

### <a id="WS_TEXT"></a>`WS_TEXT` `🔓 export`

&gt; 📄 `ws_parser.vx` L23-23

```vex
export const WS_TEXT: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="WS_BINARY"></a>`WS_BINARY` `🔓 export`

&gt; 📄 `ws_parser.vx` L24-24

```vex
export const WS_BINARY: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="WS_CLOSE"></a>`WS_CLOSE` `🔓 export`

&gt; 📄 `ws_parser.vx` L25-25

```vex
export const WS_CLOSE: u8=8;
```

**Returns:** `u8=8;`

---

### <a id="WS_PING"></a>`WS_PING` `🔓 export`

&gt; 📄 `ws_parser.vx` L26-26

```vex
export const WS_PING: u8=9;
```

**Returns:** `u8=9;`

---

### <a id="WS_PONG"></a>`WS_PONG` `🔓 export`

&gt; 📄 `ws_parser.vx` L27-27

```vex
export const WS_PONG: u8=10;
```

**Returns:** `u8=10;`

---

### <a id="WS_OK"></a>`WS_OK` `🔓 export`

&gt; 📄 `ws_parser.vx` L30-30

```vex
export const WS_OK: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="WS_NEED_MORE"></a>`WS_NEED_MORE` `🔓 export`

&gt; 📄 `ws_parser.vx` L31-31

```vex
export const WS_NEED_MORE: i32=- 1;
```

**Returns:** `i32=- 1;`

---

### <a id="WS_ERR_INVALID"></a>`WS_ERR_INVALID` `🔓 export`

&gt; 📄 `ws_parser.vx` L32-32

```vex
export const WS_ERR_INVALID: i32=- 2;
```

**Returns:** `i32=- 2;`

---

### <a id="RBUF_INIT"></a>`RBUF_INIT`

&gt; 📄 `conn.vx` L20-20

```vex
const RBUF_INIT: usize=8192;
```

**Returns:** `usize=8192;`

---

### <a id="RBUF_MAX"></a>`RBUF_MAX`

&gt; 📄 `conn.vx` L21-21

```vex
const RBUF_MAX: usize=1048576;
```

**Returns:** `usize=1048576;`

---

### <a id="WBUF_INIT"></a>`WBUF_INIT`

&gt; 📄 `conn.vx` L22-22

```vex
const WBUF_INIT: usize=4096;
```

**Returns:** `usize=4096;`

---

### <a id="WBUF_MAX"></a>`WBUF_MAX`

&gt; 📄 `conn.vx` L23-23

```vex
const WBUF_MAX: usize=1048576;
```

**Returns:** `usize=1048576;`

---

### <a id="HTTP_OK"></a>`HTTP_OK` `🔓 export`

&gt; 📄 `http_parser.vx` L35-35

```vex
export const HTTP_OK: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="HTTP_ERR_TRUNCATED"></a>`HTTP_ERR_TRUNCATED` `🔓 export`

&gt; 📄 `http_parser.vx` L36-36

```vex
export const HTTP_ERR_TRUNCATED: i32=-1;
```

**Returns:** `i32=-1;`

---

### <a id="HTTP_ERR_BAD_REQUEST"></a>`HTTP_ERR_BAD_REQUEST` `🔓 export`

&gt; 📄 `http_parser.vx` L37-37

```vex
export const HTTP_ERR_BAD_REQUEST: i32=-2;
```

**Returns:** `i32=-2;`

---

### <a id="HTTP_MAX_HEADERS"></a>`HTTP_MAX_HEADERS` `🔓 export`

&gt; 📄 `http_parser.vx` L38-38

```vex
export const HTTP_MAX_HEADERS: i32=64;
```

**Returns:** `i32=64;`

---

## Structs

### <a id="TcpListener"></a>`TcpListener` `🔓 export`

&gt; 📄 `tcp.vx` L31-34

```vex
export struct TcpListener
```

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TcpListener.bind`[↗](#TcpListener.bind) | `export fn TcpListener.bind(ip: string, port: i32):` | Create a blocking TCP listener bound to ip:port. |
| ⚡`accept`[↗](#TcpListener.accept) | `fn (self: &TcpListener) accept(): TcpStream` | Accept a new connection (goroutine-aware, parks on EAGAIN). |
| `incoming`[↗](#TcpListener.incoming) | `export fn (self: &TcpListener) incoming(): Channel` | Returns a channel that receives incoming connections. |
| `close`[↗](#TcpListener.close) | `export fn (self: &TcpListener!) close()` | Close the listener socket. |
| `drop`[↗](#TcpListener.drop) | `export fn (self: &TcpListener!) drop()` |  |

---

### <a id="TcpStream"></a>`TcpStream` `🔓 export`

&gt; 📄 `tcp.vx` L117-120

```vex
export struct TcpStream
```

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TcpStream.connect`[↗](#TcpStream.connect) | `export fn TcpStream.connect(ip: string, port: i32)` | Connect to a remote TCP server at ip:port. |
| ⚡`read`[↗](#TcpStream.read) | `fn (self: &TcpStream) read(buf: *u8, len: i32): i6` | Read data into buffer. Returns bytes read, 0 on EOF, negative on error. |
| ⚡`write`[↗](#TcpStream.write) | `fn (self: &TcpStream) write(data: *u8, len: i32): ` | Write raw bytes. Returns bytes written or negative on error. |
| ⚡`writeStr`[↗](#TcpStream.writeStr) | `fn (self: &TcpStream) writeStr(s: string): i64` | Write a string. Returns bytes written or negative on error. |
| `close`[↗](#TcpStream.close) | `export fn (self: &TcpStream!) close()` | Close the stream. |
| `drop`[↗](#TcpStream.drop) | `export fn (self: &TcpStream!) drop()` |  |

---

### <a id="Event"></a>`Event` `🔓 export`

&gt; 📄 `event_loop.vx` L40-44

```vex
export struct Event
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `flags` | `i32` | 🔓 public |  |

---

### <a id="EventLoop"></a>`EventLoop` `🔓 export`

&gt; 📄 `event_loop.vx` L50-54

```vex
export struct EventLoop
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mem` | `[u8; 32]` | 🔓 public |  |
| `valid` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `EventLoop.new`[↗](#EventLoop.new) | `export fn EventLoop.new(): EventLoop` | Create a new event loop. Check isValid() after creation. |
| `isValid`[↗](#EventLoop.isValid) | `export fn (self: &EventLoop) isValid(): bool` | Check if the event loop was created successfully. |
| `register`[↗](#EventLoop.register) | `export fn (self: &EventLoop!) register(fd: i32, ev` | Register an fd for events (EVT_READ, EVT_WRITE, or both). |
| `modify`[↗](#EventLoop.modify) | `export fn (self: &EventLoop!) modify(fd: i32, even` | Modify the events monitored for an fd. |
| `unregister`[↗](#EventLoop.unregister) | `export fn (self: &EventLoop!) unregister(fd: i32):` | Unregister an fd from the event loop. |
| `poll`[↗](#EventLoop.poll) | `export fn (self: &EventLoop!) poll(out: *u8, cap: ` | Poll for events. Returns number of ready events. |
| `close`[↗](#EventLoop.close) | `export fn (self: &EventLoop!) close()` | Close the event loop. |

---

### <a id="UdpSocket"></a>`UdpSocket` `🔓 export`

&gt; 📄 `udp.vx` L25-28

```vex
export struct UdpSocket
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `sendTo`[↗](#UdpSocket.sendTo) | `fn (self: &UdpSocket) sendTo(data: *u8, len: i32, ` | Send data to a specific ip:port. |
| `recvFrom`[↗](#UdpSocket.recvFrom) | `fn (self: &UdpSocket) recvFrom(buf: *u8, len: i32)` | Receive data and get sender address. |
| `close`[↗](#UdpSocket.close) | `fn (self: &UdpSocket) close()` | Close the UDP socket. |

---

### <a id="WsFrame"></a>`WsFrame` `🔓 export`

&gt; 📄 `ws_parser.vx` L38-41

```vex
export struct WsFrame
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `raw` | `[u8; 48]` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `fin`[↗](#WsFrame.fin) | `export fn (self: &WsFrame) fin(): bool` | Get the FIN bit (1 = final frame). |
| `opcode`[↗](#WsFrame.opcode) | `export fn (self: &WsFrame) opcode(): u8` | Get the opcode (WS_TEXT, WS_BINARY, WS_CLOSE, WS_PING, WS_PONG). |
| `masked`[↗](#WsFrame.masked) | `export fn (self: &WsFrame) masked(): bool` | Check if the frame payload is masked (client → server). |
| `payloadLen`[↗](#WsFrame.payloadLen) | `export fn (self: &WsFrame) payloadLen(): u64` | Get payload length. |
| `maskBytes`[↗](#WsFrame.maskBytes) | `export fn (self: &WsFrame) maskBytes(): *u8` | Get mask bytes (4 bytes at offset 16). |
| `payload`[↗](#WsFrame.payload) | `export fn (self: &WsFrame) payload(): *u8` | Get payload pointer (at offset 24 on 64-bit). |

---

### <a id="Conn"></a>`Conn` `🔓 export`

&gt; 📄 `conn.vx` L33-46

```vex
export struct Conn
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `rbuf` | `Vec&lt;u8&gt;` | 🔓 public |  |
| `rpos` | `usize` | 🔓 public |  |
| `rlen` | `usize` | 🔓 public |  |
| `wbuf` | `Vec&lt;u8&gt;` | 🔓 public |  |
| `wpos` | `usize` | 🔓 public |  |
| `wlen` | `usize` | 🔓 public |  |
| `closed` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Conn.wrap`[↗](#Conn.wrap) | `export fn Conn.wrap(fd: i32): Conn` | Wrap a raw fd into a buffered connection. |
| `readable`[↗](#Conn.readable) | `export fn (self: &Conn) readable(): usize` | Number of unread bytes available in the buffer. |
| `readPtr`[↗](#Conn.readPtr) | `export fn (self: &Conn) readPtr(): *u8` | Pointer to start of unread data. |
| `recv`[↗](#Conn.recv) | `export fn (self: &Conn!) recv(): i64` | Read from socket into the read buffer. |
| `consume`[↗](#Conn.consume) | `export fn (self: &Conn!) consume(n: usize)` | Consume `n` bytes from the read buffer. |
| `consume`[↗](#Conn.consume) | `export fn (self: &Conn!) consume(n: i32)` |  |
| `compactRead`[↗](#Conn.compactRead) | `export fn (self: &Conn!) compactRead()` | Compact read buffer — shift unread data to front. |
| `growRead`[↗](#Conn.growRead) | `fn (self: &Conn!) growRead(): bool` | Grow read buffer (double, up to RBUF_MAX). |
| `findHeaderEnd`[↗](#Conn.findHeaderEnd) | `export fn (self: &Conn) findHeaderEnd(): i32` | Scan read buffer for \r\n\r\n (HTTP header terminator). |
| `write`[↗](#Conn.write) | `export fn (self: &Conn!) write(data: *u8, len: i32` | Write data to the write buffer. Does NOT send to socket yet. |
| `bufferWrite`[↗](#Conn.bufferWrite) | `fn (self: &Conn!) bufferWrite(data: *u8, len: usiz` | Buffer data for later flush. |
| `flush`[↗](#Conn.flush) | `export fn (self: &Conn!) flush(): i64` | Flush write buffer to socket. |
| `hasPendingWrite`[↗](#Conn.hasPendingWrite) | `export fn (self: &Conn) hasPendingWrite(): bool` | Check if there's unsent data in the write buffer. |
| `close`[↗](#Conn.close) | `export fn (self: &Conn!) close()` | Close the connection and fd. |
| `reset`[↗](#Conn.reset) | `export fn (self: &Conn!) reset()` | Reset for keep-alive reuse (zero alloc). |

---

### <a id="Socket"></a>`Socket` `🔓 export`

&gt; 📄 `socket.vx` L78-81

```vex
export struct Socket
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Socket.tcp`[↗](#Socket.tcp) | `export fn Socket.tcp(): Socket` | Create a non-blocking TCP socket. |
| `Socket.tcpBlocking`[↗](#Socket.tcpBlocking) | `export fn Socket.tcpBlocking(): Socket` | Create a blocking TCP socket. |
| `Socket.udp`[↗](#Socket.udp) | `export fn Socket.udp(): Socket` | Create a UDP socket. |
| `setReuseAddr`[↗](#Socket.setReuseAddr) | `export fn (self: &Socket!) setReuseAddr(on: bool)` | Enable/disable SO_REUSEADDR. |
| `setReusePort`[↗](#Socket.setReusePort) | `export fn (self: &Socket!) setReusePort(on: bool)` | Enable/disable SO_REUSEPORT (for multi-threaded accept). |
| `setNonBlock`[↗](#Socket.setNonBlock) | `export fn (self: &Socket!) setNonBlock(on: bool)` | Enable/disable O_NONBLOCK. |
| `setNoDelay`[↗](#Socket.setNoDelay) | `export fn (self: &Socket!) setNoDelay(on: bool)` | Enable/disable TCP_NODELAY (Nagle's algorithm off). |
| `setNoPush`[↗](#Socket.setNoPush) | `export fn (self: &Socket!) setNoPush(on: bool)` | Enable/disable TCP_NOPUSH (macOS/BSD) / TCP_CORK (Linux). |
| `bind`[↗](#Socket.bind) | `export fn (self: &Socket) bind(ip: string, port: i` | Bind socket to ip:port. Returns 0 on success, negative on error. |
| `listen`[↗](#Socket.listen) | `export fn (self: &Socket) listen(backlog: i32): i3` | Start listening with given backlog. Returns 0 on success. |
| `connect`[↗](#Socket.connect) | `export fn (self: &Socket) connect(ip: string, port` | Connect to remote ip:port. Returns 0 on success. |
| `accept`[↗](#Socket.accept) | `export fn (self: &Socket) accept(): Socket` | Accept a new connection. Returns a Socket with the client fd. |
| `recv`[↗](#Socket.recv) | `export fn (self: &Socket) recv(buf: *u8, len: u64)` | Read into buffer. Returns bytes read, 0 on EOF, negative on error/EAGAIN. |
| `send`[↗](#Socket.send) | `export fn (self: &Socket) send(buf: *u8, len: u64)` | Write bytes. Returns bytes written or negative on error/EAGAIN. |
| `close`[↗](#Socket.close) | `export fn (self: &Socket) close()` | Close the socket. |
| `isValid`[↗](#Socket.isValid) | `export fn (self: &Socket) isValid(): bool` | Check if socket is valid. |

---

### <a id="HttpHeader"></a>`HttpHeader` `🔓 export`

&gt; 📄 `http_parser.vx` L43-49

```vex
export struct HttpHeader
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `namePtr` | `*u8` | 🔓 public |  |
| `valuePtr` | `*u8` | 🔓 public |  |
| `nameLen` | `u16` | 🔓 public |  |
| `valueLen` | `u16` | 🔓 public |  |

---

### <a id="HttpRequestLine"></a>`HttpRequestLine` `🔓 export`

&gt; 📄 `http_parser.vx` L54-62

```vex
export struct HttpRequestLine
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `methodPtr` | `*u8` | 🔓 public |  |
| `methodLen` | `u16` | 🔓 public |  |
| `uriPtr` | `*u8` | 🔓 public |  |
| `uriLen` | `u16` | 🔓 public |  |
| `httpMajor` | `u8` | 🔓 public |  |
| `httpMinor` | `u8` | 🔓 public |  |

---

### <a id="HttpRequest"></a>`HttpRequest` `🔓 export`

&gt; 📄 `http_parser.vx` L68-71

```vex
export struct HttpRequest
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `raw` | `[u8; 2112]` | 🔓 public |  |

---

### <a id="StreamParser"></a>`StreamParser` `🔓 export`

&gt; 📄 `http_parser.vx` L77-82

```vex
export struct StreamParser
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `state` | `[u8; 256]` | 🔓 public |  |
| `req` | `HttpRequest` | 🔓 public |  |
| `initialized` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `StreamParser.new`[↗](#StreamParser.new) | `export fn StreamParser.new(): StreamParser` | Create a new streaming parser (ready to receive chunks). |
| `feed`[↗](#StreamParser.feed) | `export fn (self: &StreamParser!) feed(buf: *u8, le` | Feed a chunk of data to the streaming parser. |
| `feedEx`[↗](#StreamParser.feedEx) | `export fn (self: &StreamParser!) feedEx(buf: *u8, ` | Feed with bytes-parsed output. |
| `isDone`[↗](#StreamParser.isDone) | `export fn (self: &StreamParser) isDone(): bool` | Check if the parser has received a complete HTTP request. |
| `reset`[↗](#StreamParser.reset) | `export fn (self: &StreamParser!) reset()` | Reset parser for the next request (keep-alive reuse). |
| `requestPtr`[↗](#StreamParser.requestPtr) | `export fn (self: &StreamParser) requestPtr(): *u8` | Get a pointer to the underlying C request struct. |

---

### <a id="UriParts"></a>`UriParts` `🔓 export`

&gt; 📄 `http_parser.vx` L268-272

```vex
export struct UriParts
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `path` | `string` | 🔓 public |  |
| `query` | `string` | 🔓 public |  |

---

## Functions

### <a id="TcpListener"></a>`TcpListener` `🔓 export`

&gt; 📄 `tcp.vx` L74-76

```vex
export fn TcpListener(ip: string, port: i32): TcpListener
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ip` | `string` |  |
| `port` | `i32` |  |

**Returns:** `TcpListener`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TcpListener.bind`[↗](#TcpListener.bind) | `export fn TcpListener.bind(ip: string, port: i32):` | Create a blocking TCP listener bound to ip:port. |
| ⚡`accept`[↗](#TcpListener.accept) | `fn (self: &TcpListener) accept(): TcpStream` | Accept a new connection (goroutine-aware, parks on EAGAIN). |
| `incoming`[↗](#TcpListener.incoming) | `export fn (self: &TcpListener) incoming(): Channel` | Returns a channel that receives incoming connections. |
| `close`[↗](#TcpListener.close) | `export fn (self: &TcpListener!) close()` | Close the listener socket. |
| `drop`[↗](#TcpListener.drop) | `export fn (self: &TcpListener!) drop()` |  |

---

### <a id="TcpStream"></a>`TcpStream` `🔓 export`

&gt; 📄 `tcp.vx` L151-153

```vex
export fn TcpStream(ip: string, port: i32): TcpStream
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ip` | `string` |  |
| `port` | `i32` |  |

**Returns:** `TcpStream`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TcpStream.connect`[↗](#TcpStream.connect) | `export fn TcpStream.connect(ip: string, port: i32)` | Connect to a remote TCP server at ip:port. |
| ⚡`read`[↗](#TcpStream.read) | `fn (self: &TcpStream) read(buf: *u8, len: i32): i6` | Read data into buffer. Returns bytes read, 0 on EOF, negative on error. |
| ⚡`write`[↗](#TcpStream.write) | `fn (self: &TcpStream) write(data: *u8, len: i32): ` | Write raw bytes. Returns bytes written or negative on error. |
| ⚡`writeStr`[↗](#TcpStream.writeStr) | `fn (self: &TcpStream) writeStr(s: string): i64` | Write a string. Returns bytes written or negative on error. |
| `close`[↗](#TcpStream.close) | `export fn (self: &TcpStream!) close()` | Close the stream. |
| `drop`[↗](#TcpStream.drop) | `export fn (self: &TcpStream!) drop()` |  |

---

### <a id="readEvent"></a>`readEvent` `🔓 export`

&gt; 📄 `event_loop.vx` L107-113

```vex
export fn readEvent(events_base: ptr, index: i32): Event
```

Read the i-th event from a raw event buffer.

Each event is 16 bytes: {fd: i32, flags: i32, userdata: i64}.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `events_base` | `ptr` |  |
| `index` | `i32` |  |

**Returns:** `Event`

---

### <a id="UdpSocket"></a>`UdpSocket` `🔓 export`

&gt; 📄 `udp.vx` L38-55

```vex
export fn UdpSocket(ip: string, port: i32): UdpSocket
```

Bind a UDP socket to ip:port.

Returns a UdpSocket. Check fd &gt;= 0 for success.
# Example
```
let sock = udpBind("0.0.0.0", 9999);
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ip` | `string` |  |
| `port` | `i32` |  |

**Returns:** `UdpSocket`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `sendTo`[↗](#UdpSocket.sendTo) | `fn (self: &UdpSocket) sendTo(data: *u8, len: i32, ` | Send data to a specific ip:port. |
| `recvFrom`[↗](#UdpSocket.recvFrom) | `fn (self: &UdpSocket) recvFrom(buf: *u8, len: i32)` | Receive data and get sender address. |
| `close`[↗](#UdpSocket.close) | `fn (self: &UdpSocket) close()` | Close the UDP socket. |

---

### <a id="parseFrame"></a>`parseFrame` `🔓 export`

&gt; 📄 `ws_parser.vx` L83-87

```vex
export fn parseFrame(buf: *u8, len: u64, frame: &WsFrame!, consumed: &u64 !): i32
```

Parse a WebSocket frame from a buffer.

Returns WS_OK(0) on success, WS_NEED_MORE(-1) if incomplete,
WS_ERR_INVALID(-2) on protocol error.
`consumed` is set to the total bytes consumed (header + payload).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `*u8` |  |
| `len` | `u64` |  |
| `frame` | `&WsFrame!` |  |
| `consumed` | `&u64 !` |  |

**Returns:** `i32`

---

### <a id="encodeFrame"></a>`encodeFrame` `🔓 export`

&gt; 📄 `ws_parser.vx` L94-101

```vex
export fn encodeFrame(buf: *u8, bufLen: u64, opcode: u8, payload: *u8, payloadLen: u64, written: &u64 !): i32
```

Encode a WebSocket frame into `buf`.

Server frames are NOT masked (per RFC 6455).
Returns 0 on success. `written` = total bytes written to buf.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `*u8` |  |
| `bufLen` | `u64` |  |
| `opcode` | `u8` |  |
| `payload` | `*u8` |  |
| `payloadLen` | `u64` |  |
| `written` | `&u64 !` |  |

**Returns:** `i32`

---

### <a id="encodeText"></a>`encodeText` `🔓 export`

&gt; 📄 `ws_parser.vx` L104-108

```vex
export fn encodeText(buf: *u8, bufLen: u64, text: *u8, textLen: u64, written: &u64 !): i32
```

Encode a text frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `*u8` |  |
| `bufLen` | `u64` |  |
| `text` | `*u8` |  |
| `textLen` | `u64` |  |
| `written` | `&u64 !` |  |

**Returns:** `i32`

---

### <a id="encodeClose"></a>`encodeClose` `🔓 export`

&gt; 📄 `ws_parser.vx` L111-118

```vex
export fn encodeClose(buf: *u8, bufLen: u64, code: u16, written: &u64 !): i32
```

Encode a close frame with optional status code.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `*u8` |  |
| `bufLen` | `u64` |  |
| `code` | `u16` |  |
| `written` | `&u64 !` |  |

**Returns:** `i32`

---

### <a id="encodePing"></a>`encodePing` `🔓 export`

&gt; 📄 `ws_parser.vx` L121-125

```vex
export fn encodePing(buf: *u8, bufLen: u64, written: &u64 !): i32
```

Encode a ping frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `*u8` |  |
| `bufLen` | `u64` |  |
| `written` | `&u64 !` |  |

**Returns:** `i32`

---

### <a id="encodePong"></a>`encodePong` `🔓 export`

&gt; 📄 `ws_parser.vx` L128-132

```vex
export fn encodePong(buf: *u8, bufLen: u64, payload: *u8, payloadLen: u64, written: &u64 !): i32
```

Encode a pong frame (echo payload from ping).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `*u8` |  |
| `bufLen` | `u64` |  |
| `payload` | `*u8` |  |
| `payloadLen` | `u64` |  |
| `written` | `&u64 !` |  |

**Returns:** `i32`

---

### <a id="unmask"></a>`unmask` `🔓 export`

&gt; 📄 `ws_parser.vx` L138-142

```vex
export fn unmask(data: *u8, len: u64, mask: *u8)
```

Unmask payload data in-place (XOR with 4-byte mask).

Call this on client-sent frames before reading payload.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `*u8` |  |
| `len` | `u64` |  |
| `mask` | `*u8` |  |

---

### <a id="isControlFrame"></a>`isControlFrame` `🔓 export`

&gt; 📄 `ws_parser.vx` L145-147

```vex
export fn isControlFrame(opcode: u8): bool
```

Check if an opcode is a control frame (close/ping/pong).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `opcode` | `u8` |  |

**Returns:** `bool`

---

### <a id="isDataFrame"></a>`isDataFrame` `🔓 export`

&gt; 📄 `ws_parser.vx` L150-152

```vex
export fn isDataFrame(opcode: u8): bool
```

Check if an opcode is a data frame (text/binary/continuation).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `opcode` | `u8` |  |

**Returns:** `bool`

---

### <a id="cpuCount"></a>`cpuCount` `🔓 export`

&gt; 📄 `socket.vx` L195-200

```vex
export fn cpuCount(): i32
```

Get the number of CPU cores (for multi-worker servers).

**Returns:** `i32`

---

### <a id="makePipe"></a>`makePipe` `🔓 export`

&gt; 📄 `socket.vx` L204-210

```vex
export fn makePipe(): [i32; 2]
```

Create a pipe pair (read_fd, write_fd).

Returns [read_fd, write_fd] on success, [-1, -1] on error.

**Returns:** `[i32; 2]`

---

### <a id="tcpBlockingFd"></a>`tcpBlockingFd` `🔓 export`

&gt; 📄 `socket.vx` L215-217

```vex
export fn tcpBlockingFd(): i32
```

Create a blocking TCP socket fd.

**Returns:** `i32`

---

### <a id="connectFd"></a>`connectFd` `🔓 export`

&gt; 📄 `socket.vx` L220-223

```vex
export fn connectFd(fd: i32, ip: string, port: i32): i32
```

Connect an existing fd to ip:port.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip` | `string` |  |
| `port` | `i32` |  |

**Returns:** `i32`

---

### <a id="bindFd"></a>`bindFd` `🔓 export`

&gt; 📄 `socket.vx` L226-229

```vex
export fn bindFd(fd: i32, ip: string, port: i32): i32
```

Bind an existing fd to ip:port.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip` | `string` |  |
| `port` | `i32` |  |

**Returns:** `i32`

---

### <a id="listenFd"></a>`listenFd` `🔓 export`

&gt; 📄 `socket.vx` L232-234

```vex
export fn listenFd(fd: i32, backlog: i32): i32
```

Listen on an existing fd with backlog.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="acceptFd"></a>`acceptFd` `🔓 export`

&gt; 📄 `socket.vx` L237-239

```vex
export fn acceptFd(fd: i32): i32
```

Accept a client fd from a listening fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="setReuseAddrFd"></a>`setReuseAddrFd` `🔓 export`

&gt; 📄 `socket.vx` L242-246

```vex
export fn setReuseAddrFd(fd: i32, on: bool): i32
```

Enable/disable SO_REUSEADDR for a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `bool` |  |

**Returns:** `i32`

---

### <a id="setNoDelayFd"></a>`setNoDelayFd` `🔓 export`

&gt; 📄 `socket.vx` L249-253

```vex
export fn setNoDelayFd(fd: i32, on: bool): i32
```

Enable/disable TCP_NODELAY for a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `bool` |  |

**Returns:** `i32`

---

### <a id="recvFd"></a>`recvFd` `🔓 export`

&gt; 📄 `socket.vx` L256-258

```vex
export fn recvFd(fd: i32, buf: *u8, len: u64): i64
```

Receive bytes on a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `*u8` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="sendFd"></a>`sendFd` `🔓 export`

&gt; 📄 `socket.vx` L261-263

```vex
export fn sendFd(fd: i32, buf: *u8, len: u64): i64
```

Send bytes on a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `*u8` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="closeFd"></a>`closeFd` `🔓 export`

&gt; 📄 `socket.vx` L266-268

```vex
export fn closeFd(fd: i32): i32
```

Close a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="peekFd"></a>`peekFd` `🔓 export`

&gt; 📄 `socket.vx` L271-273

```vex
export fn peekFd(fd: i32, buf: *u8, len: u64): i64
```

Peek bytes without consuming them. Returns 0 on EOF, negative on error/EAGAIN.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `*u8` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="writeFd"></a>`writeFd` `🔓 export`

&gt; 📄 `socket.vx` L277-279

```vex
export fn writeFd(fd: i32, buf: *u8, len: u64): i64
```

Write bytes to any fd (pipe, file, socket). Uses write() syscall.

Unlike sendFd which uses send() (socket-only), this works on pipes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `*u8` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="readFd"></a>`readFd` `🔓 export`

&gt; 📄 `socket.vx` L283-285

```vex
export fn readFd(fd: i32, buf: *u8, len: u64): i64
```

Read bytes from any fd (pipe, file, socket). Uses read() syscall.

Unlike recvFd which uses recv() (socket-only), this works on pipes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `*u8` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="asyncAcceptFd"></a>`asyncAcceptFd` `🔓 export`

&gt; 📄 `socket.vx` L300-302

```vex
export fn asyncAcceptFd(fd: i32): i32
```

Accept a client fd using non-blocking I/O. Parks goroutine if no

connection pending. Returns client fd (pre-set to non-blocking).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="asyncRecvFd"></a>`asyncRecvFd` `🔓 export`

&gt; 📄 `socket.vx` L305-307

```vex
export fn asyncRecvFd(fd: i32, buf: *u8, len: u64): i64
```

Receive bytes on a raw fd, goroutine-aware. Parks on EAGAIN.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `*u8` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="asyncSendFd"></a>`asyncSendFd` `🔓 export`

&gt; 📄 `socket.vx` L311-313

```vex
export fn asyncSendFd(fd: i32, buf: *u8, len: u64): i64
```

Send bytes on a raw fd, goroutine-aware. Parks on EAGAIN.

Ensures all bytes are written (handles partial writes).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `*u8` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="setNonBlockFd"></a>`setNonBlockFd` `🔓 export`

&gt; 📄 `socket.vx` L316-318

```vex
export fn setNonBlockFd(fd: i32): i32
```

Set a socket to non-blocking mode.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="parseHttp"></a>`parseHttp` `🔓 export`

&gt; 📄 `http_parser.vx` L147-149

```vex
export fn parseHttp(buf: *u8, len: u64, req: &HttpRequest!): i32
```

Parse a complete HTTP request in one shot.

`buf` must contain the full request (headers + body).
Returns HTTP_OK(0) on success, HTTP_ERR_* on failure.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `*u8` |  |
| `len` | `u64` |  |
| `req` | `&HttpRequest!` |  |

**Returns:** `i32`

---

### <a id="vex_http_string"></a>`vex_http_string`

&gt; 📄 `http_parser.vx` L151-154

```vex
fn vex_http_string(ptr: *u8, len: usize): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ptr` | `*u8` |  |
| `len` | `usize` |  |

**Returns:** `string`

---

### <a id="vex_http_string"></a>`vex_http_string`

&gt; 📄 `http_parser.vx` L156-158

```vex
fn vex_http_string(ptr: *u8, len: u16): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ptr` | `*u8` |  |
| `len` | `u16` |  |

**Returns:** `string`

---

### <a id="vex_http_string"></a>`vex_http_string`

&gt; 📄 `http_parser.vx` L160-162

```vex
fn vex_http_string(ptr: *u8, len: u64): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ptr` | `*u8` |  |
| `len` | `u64` |  |

**Returns:** `string`

---

### <a id="getHeaderPtr"></a>`getHeaderPtr` `🔓 export`

&gt; 📄 `http_parser.vx` L168-170

```vex
export fn getHeaderPtr(req: &HttpRequest, name: *u8, lenOut: &u16!): *u8
```

Get a header value by name from a parsed request.

Returns null pointer if header not found.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |
| `name` | `*u8` |  |
| `lenOut` | `&u16!` |  |

**Returns:** `*u8`

---

### <a id="methodIs"></a>`methodIs` `🔓 export`

&gt; 📄 `http_parser.vx` L173-175

```vex
export fn methodIs(req: &HttpRequest, method: *u8): bool
```

Check if the request method matches the given string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |
| `method` | `*u8` |  |

**Returns:** `bool`

---

### <a id="getHeader"></a>`getHeader` `🔓 export`

&gt; 📄 `http_parser.vx` L178-183

```vex
export fn getHeader(req: &HttpRequest, name: string): string
```

Get a header value as a Vex string. Returns empty string if not found.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |
| `name` | `string` |  |

**Returns:** `string`

---

### <a id="getMethod"></a>`getMethod` `🔓 export`

&gt; 📄 `http_parser.vx` L188-192

```vex
export fn getMethod(req: &HttpRequest): string
```

Get the parsed HTTP method as a string (e.g. "GET", "POST").

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |

**Returns:** `string`

---

### <a id="getUri"></a>`getUri` `🔓 export`

&gt; 📄 `http_parser.vx` L195-199

```vex
export fn getUri(req: &HttpRequest): string
```

Get the parsed URI as a string (e.g. "/users?page=1").

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |

**Returns:** `string`

---

### <a id="getVersionMajor"></a>`getVersionMajor` `🔓 export`

&gt; 📄 `http_parser.vx` L202-207

```vex
export fn getVersionMajor(req: &HttpRequest): u8
```

Get HTTP major version (e.g. 1 for HTTP/1.1).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |

**Returns:** `u8`

---

### <a id="getVersionMinor"></a>`getVersionMinor` `🔓 export`

&gt; 📄 `http_parser.vx` L210-215

```vex
export fn getVersionMinor(req: &HttpRequest): u8
```

Get HTTP minor version (e.g. 1 for HTTP/1.1).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |

**Returns:** `u8`

---

### <a id="getHeaderCount"></a>`getHeaderCount` `🔓 export`

&gt; 📄 `http_parser.vx` L218-220

```vex
export fn getHeaderCount(req: &HttpRequest): i32
```

Get the number of parsed headers.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |

**Returns:** `i32`

---

### <a id="getHeaderNameByIdx"></a>`getHeaderNameByIdx` `🔓 export`

&gt; 📄 `http_parser.vx` L223-227

```vex
export fn getHeaderNameByIdx(req: &HttpRequest, idx: i32): string
```

Get header name by index.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |
| `idx` | `i32` |  |

**Returns:** `string`

---

### <a id="getHeaderValueByIdx"></a>`getHeaderValueByIdx` `🔓 export`

&gt; 📄 `http_parser.vx` L230-234

```vex
export fn getHeaderValueByIdx(req: &HttpRequest, idx: i32): string
```

Get header value by index.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |
| `idx` | `i32` |  |

**Returns:** `string`

---

### <a id="getBody"></a>`getBody` `🔓 export`

&gt; 📄 `http_parser.vx` L237-241

```vex
export fn getBody(req: &HttpRequest): string
```

Get the parsed request body as a string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |

**Returns:** `string`

---

### <a id="getBodyLenUsize"></a>`getBodyLenUsize` `🔓 export`

&gt; 📄 `http_parser.vx` L243-247

```vex
export fn getBodyLenUsize(req: &HttpRequest): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |

**Returns:** `usize`

---

### <a id="getBodyLen"></a>`getBodyLen` `🔓 export`

&gt; 📄 `http_parser.vx` L250-254

```vex
export fn getBodyLen(req: &HttpRequest): i64
```

Get the parsed body length.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |

**Returns:** `i64`

---

### <a id="isKeepAlive"></a>`isKeepAlive` `🔓 export`

&gt; 📄 `http_parser.vx` L257-259

```vex
export fn isKeepAlive(req: &HttpRequest): bool
```

Check if the request uses keep-alive.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |

**Returns:** `bool`

---

### <a id="methodIsRaw"></a>`methodIsRaw` `🔓 export`

&gt; 📄 `http_parser.vx` L262-264

```vex
export fn methodIsRaw(req: &HttpRequest, method: *u8): bool
```

Check method via raw C string pointer (zero-copy).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&HttpRequest` |  |
| `method` | `*u8` |  |

**Returns:** `bool`

---

### <a id="splitUri"></a>`splitUri` `🔓 export`

&gt; 📄 `http_parser.vx` L276-306

```vex
export fn splitUri(uri: string): UriParts
```

Split a URI into path and query components.

"/users?page=1" → { path: "/users", query: "page=1" }

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `uri` | `string` |  |

**Returns:** `UriParts`

---

### <a id="monotonicNs"></a>`monotonicNs` `🔓 export`

&gt; 📄 `runtime.vx` L30-32

```vex
export fn monotonicNs(): u64
```

Monotonic clock in nanoseconds.

**Returns:** `u64`

---

### <a id="prepareWorkers"></a>`prepareWorkers` `🔓 export`

&gt; 📄 `runtime.vx` L35-37

```vex
export fn prepareWorkers(numWorkers: i32): i32
```

Ensure the async runtime has enough worker threads ready for server workloads.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `numWorkers` | `i32` |  |

**Returns:** `i32`

---

### <a id="flushSpawnBatch"></a>`flushSpawnBatch` `🔓 export`

&gt; 📄 `runtime.vx` L44-46

```vex
export fn flushSpawnBatch()
```

Flush the main-thread spawn batch immediately.

MUST be called after spawning a burst of `go {}` workers before the calling
thread enters a long-lived blocking loop (e.g. accept loop, event loop).
Without this, tasks queued in the TLS spawn batch are never enqueued into
the scheduler's global queue and worker threads remain idle.

---

### <a id="fileExists"></a>`fileExists` `🔓 export`

&gt; 📄 `runtime.vx` L49-51

```vex
export fn fileExists(path: string): bool
```

Check whether a file exists.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `bool`

---

### <a id="readFile"></a>`readFile` `🔓 export`

&gt; 📄 `runtime.vx` L53-61

```vex
export fn readFile(path: string, buf: *u8, bufLen: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |
| `buf` | `*u8` |  |
| `bufLen` | `i32` |  |

**Returns:** `i32`

---

### <a id="rbInit"></a>`rbInit` `🔓 export`

&gt; 📄 `runtime.vx` L64-68

```vex
export fn rbInit(fd: i32, status: i32, keepAlive: bool)
```

Initialize C response builder state for a response.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `status` | `i32` |  |
| `keepAlive` | `bool` |  |

---

### <a id="rbHeader"></a>`rbHeader` `🔓 export`

&gt; 📄 `runtime.vx` L71-77

```vex
export fn rbHeader(name: str, value: str)
```

Add a response header to C response builder.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `str` |  |
| `value` | `str` |  |

---

### <a id="rbSend"></a>`rbSend` `🔓 export`

&gt; 📄 `runtime.vx` L80-82

```vex
export fn rbSend(body: str): i64
```

Finalize and send response body via C response builder.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `body` | `str` |  |

**Returns:** `i64`

---

---

*Generated by vex-doc v2.0 • 2026-07-06*
