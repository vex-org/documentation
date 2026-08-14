# Project v0.0.0

## Overview

**Structs:** [`TcpListener`](#TcpListener) · [`TcpStream`](#TcpStream) · [`sockaddr_in`](#sockaddr_in) · [`Event`](#Event) · [`EventLoop`](#EventLoop) · [`UdpSocket`](#UdpSocket) · [`UdpRecvFromResult`](#UdpRecvFromResult) · [`WsFrame`](#WsFrame) · [`sockaddr_in`](#sockaddr_in) · [`Conn`](#Conn) · [`Socket`](#Socket) · [`sockaddr_in`](#sockaddr_in) · [`epoll_event`](#epoll_event) · [`sockaddr_in`](#sockaddr_in)

**Functions:** [`TcpListener`](#TcpListener) · [`TcpStream`](#TcpStream) · [`get_errno`](#get_errno) · [`parse_ip_port`](#parse_ip_port) · [`vex_net_socket_tcp`](#vex_net_socket_tcp) · [`vex_net_socket_tcp_blocking`](#vex_net_socket_tcp_blocking) · [`vex_net_socket_udp`](#vex_net_socket_udp) · [`vex_net_set_reuseaddr`](#vex_net_set_reuseaddr) · [`vex_net_set_reuseport`](#vex_net_set_reuseport) · [`vex_net_set_nonblock`](#vex_net_set_nonblock) · [`vex_net_set_nodelay`](#vex_net_set_nodelay) · [`vex_net_set_nopush`](#vex_net_set_nopush) · [`vex_net_bind`](#vex_net_bind) · [`vex_net_listen`](#vex_net_listen) · [`vex_net_connect`](#vex_net_connect) · [`vex_net_accept`](#vex_net_accept) · [`vex_net_recv`](#vex_net_recv) · [`vex_net_recv_peek`](#vex_net_recv_peek) · [`vex_net_send`](#vex_net_send) · [`vex_net_sendto`](#vex_net_sendto) · [`vex_net_recvfrom`](#vex_net_recvfrom) · [`vex_net_close`](#vex_net_close) · [`vex_net_pipe`](#vex_net_pipe) · [`vex_net_loop_create`](#vex_net_loop_create) · [`vex_net_loop_close`](#vex_net_loop_close) · [`vex_net_register`](#vex_net_register) · [`vex_net_modify`](#vex_net_modify) · [`vex_net_unregister`](#vex_net_unregister) · [`vex_net_tick`](#vex_net_tick) · [`vex_fd_set_nonblock`](#vex_fd_set_nonblock) · [`vex_net_thread_yield`](#vex_net_thread_yield) · [`vex_fd_read`](#vex_fd_read) · [`vex_fd_write`](#vex_fd_write) · [`readEvent`](#readEvent) · [`UdpSocket`](#UdpSocket) · [`parseFrame`](#parseFrame) · [`encodeFrame`](#encodeFrame) · [`encodeText`](#encodeText) · [`encodeClose`](#encodeClose) · [`encodePing`](#encodePing) · [`encodePong`](#encodePong) · [`unmask`](#unmask) · [`isControlFrame`](#isControlFrame) · [`isDataFrame`](#isDataFrame) · [`get_errno`](#get_errno) · [`parse_ip_port`](#parse_ip_port) · [`vex_net_socket_tcp`](#vex_net_socket_tcp) · [`vex_net_socket_tcp_blocking`](#vex_net_socket_tcp_blocking) · [`vex_net_socket_udp`](#vex_net_socket_udp) · [`vex_net_set_reuseaddr`](#vex_net_set_reuseaddr) · [`vex_net_set_reuseport`](#vex_net_set_reuseport) · [`vex_net_set_nonblock`](#vex_net_set_nonblock) · [`vex_net_set_nodelay`](#vex_net_set_nodelay) · [`vex_net_set_nopush`](#vex_net_set_nopush) · [`vex_net_bind`](#vex_net_bind) · [`vex_net_listen`](#vex_net_listen) · [`vex_net_connect`](#vex_net_connect) · [`vex_net_accept`](#vex_net_accept) · [`vex_net_recv`](#vex_net_recv) · [`vex_net_recv_peek`](#vex_net_recv_peek) · [`vex_net_send`](#vex_net_send) · [`vex_net_sendto`](#vex_net_sendto) · [`vex_net_recvfrom`](#vex_net_recvfrom) · [`vex_net_close`](#vex_net_close) · [`vex_net_pipe`](#vex_net_pipe) · [`vex_net_loop_create`](#vex_net_loop_create) · [`vex_net_loop_close`](#vex_net_loop_close) · [`vex_net_register`](#vex_net_register) · [`vex_net_modify`](#vex_net_modify) · [`vex_net_unregister`](#vex_net_unregister) · [`vex_net_tick`](#vex_net_tick) · [`vex_fd_set_nonblock`](#vex_fd_set_nonblock) · [`vex_net_thread_yield`](#vex_net_thread_yield) · [`vex_fd_read`](#vex_fd_read) · [`vex_fd_write`](#vex_fd_write) · [`monotonicNs`](#monotonicNs) · [`prepareWorkers`](#prepareWorkers) · [`flushSpawnBatch`](#flushSpawnBatch) · [`arenaSave`](#arenaSave) · [`arenaRestore`](#arenaRestore) · [`arenaTotalBytesUsed`](#arenaTotalBytesUsed) · [`regionCurrent`](#regionCurrent) · [`regionSetCurrent`](#regionSetCurrent) · [`setArenaMode`](#setArenaMode) · [`getArenaMode`](#getArenaMode) · [`cpuCount`](#cpuCount) · [`makePipe`](#makePipe) · [`tcpBlockingFd`](#tcpBlockingFd) · [`connectFd`](#connectFd) · [`bindFd`](#bindFd) · [`listenFd`](#listenFd) · [`acceptFd`](#acceptFd) · [`setReuseAddrFd`](#setReuseAddrFd) · [`setNoDelayFd`](#setNoDelayFd) · [`recvFd`](#recvFd) · [`sendFd`](#sendFd) · [`closeFd`](#closeFd) · [`peekFd`](#peekFd) · [`writeFd`](#writeFd) · [`readFd`](#readFd) · [`asyncAcceptFd`](#asyncAcceptFd) · [`asyncRecvFd`](#asyncRecvFd) · [`asyncSendFd`](#asyncSendFd) · [`setNonBlockFd`](#setNonBlockFd) · [`socket`](#socket) · [`bind`](#bind) · [`listen`](#listen) · [`accept`](#accept) · [`connect`](#connect) · [`close`](#close) · [`recvfrom`](#recvfrom) · [`sendto`](#sendto) · [`setsockopt`](#setsockopt) · [`pipe2`](#pipe2) · [`fcntl`](#fcntl) · [`epoll_create1`](#epoll_create1) · [`epoll_ctl`](#epoll_ctl) · [`epoll_wait`](#epoll_wait) · [`parse_ip_port`](#parse_ip_port) · [`vex_net_socket_tcp`](#vex_net_socket_tcp) · [`vex_net_socket_tcp_blocking`](#vex_net_socket_tcp_blocking) · [`vex_net_socket_udp`](#vex_net_socket_udp) · [`vex_net_set_reuseaddr`](#vex_net_set_reuseaddr) · [`vex_net_set_reuseport`](#vex_net_set_reuseport) · [`vex_net_set_nonblock`](#vex_net_set_nonblock) · [`vex_net_set_nodelay`](#vex_net_set_nodelay) · [`vex_net_set_nopush`](#vex_net_set_nopush) · [`vex_net_bind`](#vex_net_bind) · [`vex_net_listen`](#vex_net_listen) · [`vex_net_connect`](#vex_net_connect) · [`vex_net_accept`](#vex_net_accept) · [`vex_net_recv`](#vex_net_recv) · [`vex_net_recv_peek`](#vex_net_recv_peek) · [`vex_net_send`](#vex_net_send) · [`vex_net_sendto`](#vex_net_sendto) · [`vex_net_recvfrom`](#vex_net_recvfrom) · [`vex_net_close`](#vex_net_close) · [`vex_net_pipe`](#vex_net_pipe) · [`vex_net_loop_create`](#vex_net_loop_create) · [`vex_net_loop_close`](#vex_net_loop_close) · [`vex_net_register`](#vex_net_register) · [`vex_net_modify`](#vex_net_modify) · [`vex_net_unregister`](#vex_net_unregister) · [`vex_net_tick`](#vex_net_tick) · [`vex_fd_set_nonblock`](#vex_fd_set_nonblock) · [`vex_fd_write`](#vex_fd_write) · [`vex_net_thread_yield`](#vex_net_thread_yield) · [`vex_fd_read`](#vex_fd_read) · [`vex_fd_write`](#vex_fd_write) · [`vex_ws_parse_frame`](#vex_ws_parse_frame) · [`vex_ws_encode_frame`](#vex_ws_encode_frame) · [`vex_ws_unmask`](#vex_ws_unmask) · [`ensure_wsa`](#ensure_wsa) · [`parse_ip_port`](#parse_ip_port) · [`vex_net_socket_tcp`](#vex_net_socket_tcp) · [`vex_net_socket_tcp_blocking`](#vex_net_socket_tcp_blocking) · [`vex_net_socket_udp`](#vex_net_socket_udp) · [`vex_net_set_reuseaddr`](#vex_net_set_reuseaddr) · [`vex_net_set_reuseport`](#vex_net_set_reuseport) · [`vex_net_set_nonblock`](#vex_net_set_nonblock) · [`vex_net_set_nodelay`](#vex_net_set_nodelay) · [`vex_net_set_nopush`](#vex_net_set_nopush) · [`vex_net_bind`](#vex_net_bind) · [`vex_net_listen`](#vex_net_listen) · [`vex_net_connect`](#vex_net_connect) · [`vex_net_accept`](#vex_net_accept) · [`vex_net_recv`](#vex_net_recv) · [`vex_net_recv_peek`](#vex_net_recv_peek) · [`vex_net_send`](#vex_net_send) · [`vex_net_sendto`](#vex_net_sendto) · [`vex_net_recvfrom`](#vex_net_recvfrom) · [`vex_net_close`](#vex_net_close) · [`vex_net_pipe`](#vex_net_pipe) · [`vex_net_loop_create`](#vex_net_loop_create) · [`vex_net_loop_close`](#vex_net_loop_close) · [`vex_net_register`](#vex_net_register) · [`vex_net_modify`](#vex_net_modify) · [`vex_net_unregister`](#vex_net_unregister) · [`vex_net_tick`](#vex_net_tick) · [`vex_net_thread_yield`](#vex_net_thread_yield) · [`vex_fd_set_nonblock`](#vex_fd_set_nonblock) · [`vex_fd_write`](#vex_fd_write) · [`vex_fd_read`](#vex_fd_read) · [`vex_fd_write`](#vex_fd_write)

**Constants:** [`EVT_READ`](#EVT_READ) · [`EVT_WRITE`](#EVT_WRITE) · [`EVT_HUP`](#EVT_HUP) · [`EVT_ERR`](#EVT_ERR) · [`WS_CONTINUATION`](#WS_CONTINUATION) · [`WS_TEXT`](#WS_TEXT) · [`WS_BINARY`](#WS_BINARY) · [`WS_CLOSE`](#WS_CLOSE) · [`WS_PING`](#WS_PING) · [`WS_PONG`](#WS_PONG) · [`WS_OK`](#WS_OK) · [`WS_NEED_MORE`](#WS_NEED_MORE) · [`WS_ERR_INVALID`](#WS_ERR_INVALID) · [`RBUF_INIT`](#RBUF_INIT) · [`RBUF_MAX`](#RBUF_MAX) · [`WBUF_INIT`](#WBUF_INIT) · [`WBUF_MAX`](#WBUF_MAX)

## Constants

### <a id="EVT_READ"></a>`EVT_READ` `🔓 export`

> 📄 `event_loop.vx` L27-27

```vex
export const EVT_READ: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="EVT_WRITE"></a>`EVT_WRITE` `🔓 export`

> 📄 `event_loop.vx` L28-28

```vex
export const EVT_WRITE: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="EVT_HUP"></a>`EVT_HUP` `🔓 export`

> 📄 `event_loop.vx` L29-29

```vex
export const EVT_HUP: i32=4;
```

**Returns:** `i32=4;`

---

### <a id="EVT_ERR"></a>`EVT_ERR` `🔓 export`

> 📄 `event_loop.vx` L30-30

```vex
export const EVT_ERR: i32=8;
```

**Returns:** `i32=8;`

---

### <a id="WS_CONTINUATION"></a>`WS_CONTINUATION` `🔓 export`

> 📄 `ws_parser.vx` L18-18

```vex
export const WS_CONTINUATION: u8=0;
```

**Returns:** `u8=0;`

---

### <a id="WS_TEXT"></a>`WS_TEXT` `🔓 export`

> 📄 `ws_parser.vx` L19-19

```vex
export const WS_TEXT: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="WS_BINARY"></a>`WS_BINARY` `🔓 export`

> 📄 `ws_parser.vx` L20-20

```vex
export const WS_BINARY: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="WS_CLOSE"></a>`WS_CLOSE` `🔓 export`

> 📄 `ws_parser.vx` L21-21

```vex
export const WS_CLOSE: u8=8;
```

**Returns:** `u8=8;`

---

### <a id="WS_PING"></a>`WS_PING` `🔓 export`

> 📄 `ws_parser.vx` L22-22

```vex
export const WS_PING: u8=9;
```

**Returns:** `u8=9;`

---

### <a id="WS_PONG"></a>`WS_PONG` `🔓 export`

> 📄 `ws_parser.vx` L23-23

```vex
export const WS_PONG: u8=10;
```

**Returns:** `u8=10;`

---

### <a id="WS_OK"></a>`WS_OK` `🔓 export`

> 📄 `ws_parser.vx` L26-26

```vex
export const WS_OK: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="WS_NEED_MORE"></a>`WS_NEED_MORE` `🔓 export`

> 📄 `ws_parser.vx` L27-27

```vex
export const WS_NEED_MORE: i32=- 1;
```

**Returns:** `i32=- 1;`

---

### <a id="WS_ERR_INVALID"></a>`WS_ERR_INVALID` `🔓 export`

> 📄 `ws_parser.vx` L28-28

```vex
export const WS_ERR_INVALID: i32=- 2;
```

**Returns:** `i32=- 2;`

---

### <a id="RBUF_INIT"></a>`RBUF_INIT`

> 📄 `conn.vx` L20-20

```vex
const RBUF_INIT: usize=8192;
```

**Returns:** `usize=8192;`

---

### <a id="RBUF_MAX"></a>`RBUF_MAX`

> 📄 `conn.vx` L21-21

```vex
const RBUF_MAX: usize=1048576;
```

**Returns:** `usize=1048576;`

---

### <a id="WBUF_INIT"></a>`WBUF_INIT`

> 📄 `conn.vx` L22-22

```vex
const WBUF_INIT: usize=4096;
```

**Returns:** `usize=4096;`

---

### <a id="WBUF_MAX"></a>`WBUF_MAX`

> 📄 `conn.vx` L23-23

```vex
const WBUF_MAX: usize=1048576;
```

**Returns:** `usize=1048576;`

---

## Structs

### <a id="TcpListener"></a>`TcpListener` `🔓 export`

> 📄 `tcp.vx` L22-25

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
| ⚡`accept`[↗](#TcpListener.accept) | `export fn (self: &amp;TcpListener) accept(): TcpStream` | Accept a new connection (goroutine-aware, parks on EAGAIN). |
| `incoming`[↗](#TcpListener.incoming) | `export fn (self: &amp;TcpListener) incoming(): Channel` | Returns a channel that receives incoming connections. |
| `close`[↗](#TcpListener.close) | `export fn (self: &amp;TcpListener!) close()` | Close the listener socket. |
| `drop`[↗](#TcpListener.drop) | `export fn (self: &amp;TcpListener!) drop()` |  |

---

### <a id="TcpStream"></a>`TcpStream` `🔓 export`

> 📄 `tcp.vx` L107-110

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
| ⚡`read`[↗](#TcpStream.read) | `export fn (self: &amp;TcpStream) read(buf: Ptr&lt;u8&gt;, le` | Read data into buffer. Returns bytes read, 0 on EOF, negative on error. |
| ⚡`write`[↗](#TcpStream.write) | `export fn (self: &amp;TcpStream) write(data: Ptr&lt;u8&gt;, ` | Write raw bytes. Returns bytes written or negative on error. |
| ⚡`writeStr`[↗](#TcpStream.writeStr) | `export fn (self: &amp;TcpStream) writeStr(s: string): ` | Write a string. Returns bytes written or negative on error. |
| `close`[↗](#TcpStream.close) | `export fn (self: &amp;TcpStream!) close()` | Close the stream. |
| `drop`[↗](#TcpStream.drop) | `export fn (self: &amp;TcpStream!) drop()` |  |

---

### <a id="sockaddr_in"></a>`sockaddr_in`

> 📄 `native.vxc` L35-38

```vex
struct sockaddr_in
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mem` | `[u8; 16]` | 🔓 public |  |

---

### <a id="Event"></a>`Event` `🔓 export`

> 📄 `event_loop.vx` L34-38

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

> 📄 `event_loop.vx` L44-48

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
| `isValid`[↗](#EventLoop.isValid) | `export fn (self: &amp;EventLoop) isValid(): bool` | Check if the event loop was created successfully. |
| `register`[↗](#EventLoop.register) | `export fn (self: &amp;EventLoop!) register(fd: i32, ev` | Register an fd for events (EVT_READ, EVT_WRITE, or both). |
| `modify`[↗](#EventLoop.modify) | `export fn (self: &amp;EventLoop!) modify(fd: i32, even` | Modify the events monitored for an fd. |
| `unregister`[↗](#EventLoop.unregister) | `export fn (self: &amp;EventLoop!) unregister(fd: i32):` | Unregister an fd from the event loop. |
| `poll`[↗](#EventLoop.poll) | `export fn (self: &amp;EventLoop!) poll(out: Ptr&lt;u8&gt;, c` | Poll for events. Returns number of ready events. |
| `close`[↗](#EventLoop.close) | `export fn (self: &amp;EventLoop!) close()` | Close the event loop. |

---

### <a id="UdpSocket"></a>`UdpSocket` `🔓 export`

> 📄 `udp.vx` L19-22

```vex
export struct UdpSocket
```

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `sendTo`[↗](#UdpSocket.sendTo) | `export fn (self: &amp;UdpSocket) sendTo(data: Ptr&lt;u8&gt;,` | Send data to a specific ip:port. |
| `recvFrom`[↗](#UdpSocket.recvFrom) | `export fn (self: &amp;UdpSocket) recvFrom(buf: Ptr&lt;u8&gt;` | Receive data and get sender address. |
| `recvFromWithSource`[↗](#UdpSocket.recvFromWithSource) | `export fn (self: &amp;UdpSocket) recvFromWithSource(bu` | Receive data and preserve the native sender IPv4 text and port. The |
| `setNonBlock`[↗](#UdpSocket.setNonBlock) | `export fn (self: &amp;UdpSocket!) setNonBlock(on: bool` | Enable or disable non-blocking receive/send operations. |
| `close`[↗](#UdpSocket.close) | `export fn (self: &amp;UdpSocket!) close()` | Close the UDP socket. |
| `drop`[↗](#UdpSocket.drop) | `export fn (self: &amp;UdpSocket!) drop()` |  |

---

### <a id="UdpRecvFromResult"></a>`UdpRecvFromResult` `🔓 export`

> 📄 `udp.vx` L27-32

```vex
export struct UdpRecvFromResult
```

One bounded recvfrom result including the native source tuple. The legacy

`recvFrom` API intentionally returns only a byte count; protocol stacks
that need datagram demultiplexing should use this value instead.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bytes` | `i64` | 🔓 public |  |
| `sourceIp` | `[u8; 64]` | 🔓 public |  |
| `sourcePort` | `u16` | 🔓 public |  |

---

### <a id="WsFrame"></a>`WsFrame` `🔓 export`

> 📄 `ws_parser.vx` L31-34

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
| `fin`[↗](#WsFrame.fin) | `export fn (self: &amp;WsFrame) fin(): bool` | Get the FIN bit (1 = final frame). |
| `opcode`[↗](#WsFrame.opcode) | `export fn (self: &amp;WsFrame) opcode(): u8` | Get the opcode (WS_TEXT, WS_BINARY, WS_CLOSE, WS_PING, WS_PONG). |
| `masked`[↗](#WsFrame.masked) | `export fn (self: &amp;WsFrame) masked(): bool` | Check if the frame payload is masked (client → server). |
| `payloadLen`[↗](#WsFrame.payloadLen) | `export fn (self: &amp;WsFrame) payloadLen(): u64` | Get payload length. |
| `maskBytes`[↗](#WsFrame.maskBytes) | `export fn (self: &amp;WsFrame) maskBytes(): Ptr&lt;u8&gt;` | Get mask bytes (4 bytes at offset 16). |
| `payload`[↗](#WsFrame.payload) | `export fn (self: &amp;WsFrame) payload(): Ptr&lt;u8&gt;` | Get payload pointer (at offset 24 on 64-bit). |

---

### <a id="sockaddr_in"></a>`sockaddr_in`

> 📄 `native.macos.vxc` L35-38

```vex
struct sockaddr_in
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mem` | `[u8; 16]` | 🔓 public |  |

---

### <a id="Conn"></a>`Conn` `🔓 export`

> 📄 `conn.vx` L28-41

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
| `readable`[↗](#Conn.readable) | `export fn (self: &amp;Conn) readable(): usize` | Number of unread bytes available in the buffer. |
| `readPtr`[↗](#Conn.readPtr) | `export fn (self: &amp;Conn) readPtr(): Ptr&lt;u8&gt;` | Pointer to start of unread data. |
| `recv`[↗](#Conn.recv) | `export fn (self: &amp;Conn!) recv(): i64` | Read from socket into the read buffer. |
| `consume`[↗](#Conn.consume) | `export fn (self: &amp;Conn!) consume(n: usize)` | Consume `n` bytes from the read buffer. |
| `consume`[↗](#Conn.consume) | `export fn (self: &amp;Conn!) consume(n: i32)` |  |
| `compactRead`[↗](#Conn.compactRead) | `export fn (self: &amp;Conn!) compactRead()` | Compact read buffer — shift unread data to front. |
| `growRead`[↗](#Conn.growRead) | `fn (self: &amp;Conn!) growRead(): bool` | Grow read buffer (double, up to RBUF_MAX). |
| `findHeaderEnd`[↗](#Conn.findHeaderEnd) | `export fn (self: &amp;Conn) findHeaderEnd(): i32` | Scan read buffer for \r\n\r\n (HTTP header terminator). |
| `write`[↗](#Conn.write) | `export fn (self: &amp;Conn!) write(data: Ptr&lt;u8&gt;, len:` | Write data to the write buffer. Does NOT send to socket yet. |
| `bufferWrite`[↗](#Conn.bufferWrite) | `fn (self: &amp;Conn!) bufferWrite(data: Ptr&lt;u8&gt;, len: ` | Buffer data for later flush. |
| `flush`[↗](#Conn.flush) | `export fn (self: &amp;Conn!) flush(): i64` | Flush write buffer to socket. |
| `hasPendingWrite`[↗](#Conn.hasPendingWrite) | `export fn (self: &amp;Conn) hasPendingWrite(): bool` | Check if there's unsent data in the write buffer. |
| `close`[↗](#Conn.close) | `export fn (self: &amp;Conn!) close()` | Close the connection and fd. |
| `reset`[↗](#Conn.reset) | `export fn (self: &amp;Conn!) reset()` | Reset for keep-alive reuse (zero alloc). |

---

### <a id="Socket"></a>`Socket` `🔓 export`

> 📄 `socket.vx` L38-41

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
| `setReuseAddr`[↗](#Socket.setReuseAddr) | `export fn (self: &amp;Socket!) setReuseAddr(on: bool)` | Enable/disable SO_REUSEADDR. |
| `setReusePort`[↗](#Socket.setReusePort) | `export fn (self: &amp;Socket!) setReusePort(on: bool)` | Enable/disable SO_REUSEPORT (for multi-threaded accept). |
| `setNonBlock`[↗](#Socket.setNonBlock) | `export fn (self: &amp;Socket!) setNonBlock(on: bool)` | Enable/disable O_NONBLOCK. |
| `setNoDelay`[↗](#Socket.setNoDelay) | `export fn (self: &amp;Socket!) setNoDelay(on: bool)` | Enable/disable TCP_NODELAY (Nagle's algorithm off). |
| `setNoPush`[↗](#Socket.setNoPush) | `export fn (self: &amp;Socket!) setNoPush(on: bool)` | Enable/disable TCP_NOPUSH (macOS/BSD) / TCP_CORK (Linux). |
| `bind`[↗](#Socket.bind) | `export fn (self: &amp;Socket) bind(ip: string, port: i` | Bind socket to ip:port. Returns 0 on success, negative on error. |
| `listen`[↗](#Socket.listen) | `export fn (self: &amp;Socket) listen(backlog: i32): i3` | Start listening with given backlog. Returns 0 on success. |
| `connect`[↗](#Socket.connect) | `export fn (self: &amp;Socket) connect(ip: string, port` | Connect to remote ip:port. Returns 0 on success. |
| `accept`[↗](#Socket.accept) | `export fn (self: &amp;Socket) accept(): Socket` | Accept a new connection. Returns a Socket with the client fd. |
| `recv`[↗](#Socket.recv) | `export fn (self: &amp;Socket) recv(buf: Ptr&lt;u8&gt;, len: ` | Read into buffer. Returns bytes read, 0 on EOF, negative on error/EAGAIN. |
| `send`[↗](#Socket.send) | `export fn (self: &amp;Socket) send(buf: Ptr&lt;u8&gt;, len: ` | Write bytes. Returns bytes written or negative on error/EAGAIN. |
| `close`[↗](#Socket.close) | `export fn (self: &amp;Socket) close()` | Close the socket. |
| `isValid`[↗](#Socket.isValid) | `export fn (self: &amp;Socket) isValid(): bool` | Check if socket is valid. |

---

### <a id="sockaddr_in"></a>`sockaddr_in`

> 📄 `native.linux.vxc` L237-240

```vex
struct sockaddr_in
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mem` | `[u8; 16]` | 🔓 public |  |

---

### <a id="epoll_event"></a>`epoll_event`

> 📄 `native.linux.vxc` L425-429

```vex
struct epoll_event
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `events` | `u32` | 🔓 public |  |
| `data` | `u64` | 🔓 public |  |

---

### <a id="sockaddr_in"></a>`sockaddr_in`

> 📄 `native.windows.vxc` L33-39

```vex
struct sockaddr_in
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `sin_family` | `u16` | 🔓 public |  |
| `sin_port` | `u16` | 🔓 public |  |
| `sin_addr` | `u32` | 🔓 public |  |
| `sin_zero` | `[u8; 8]` | 🔓 public |  |

---

## Functions

### <a id="TcpListener"></a>`TcpListener` `🔓 export`

> 📄 `tcp.vx` L64-66

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
| ⚡`accept`[↗](#TcpListener.accept) | `export fn (self: &amp;TcpListener) accept(): TcpStream` | Accept a new connection (goroutine-aware, parks on EAGAIN). |
| `incoming`[↗](#TcpListener.incoming) | `export fn (self: &amp;TcpListener) incoming(): Channel` | Returns a channel that receives incoming connections. |
| `close`[↗](#TcpListener.close) | `export fn (self: &amp;TcpListener!) close()` | Close the listener socket. |
| `drop`[↗](#TcpListener.drop) | `export fn (self: &amp;TcpListener!) drop()` |  |

---

### <a id="TcpStream"></a>`TcpStream` `🔓 export`

> 📄 `tcp.vx` L140-142

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
| ⚡`read`[↗](#TcpStream.read) | `export fn (self: &amp;TcpStream) read(buf: Ptr&lt;u8&gt;, le` | Read data into buffer. Returns bytes read, 0 on EOF, negative on error. |
| ⚡`write`[↗](#TcpStream.write) | `export fn (self: &amp;TcpStream) write(data: Ptr&lt;u8&gt;, ` | Write raw bytes. Returns bytes written or negative on error. |
| ⚡`writeStr`[↗](#TcpStream.writeStr) | `export fn (self: &amp;TcpStream) writeStr(s: string): ` | Write a string. Returns bytes written or negative on error. |
| `close`[↗](#TcpStream.close) | `export fn (self: &amp;TcpStream!) close()` | Close the stream. |
| `drop`[↗](#TcpStream.drop) | `export fn (self: &amp;TcpStream!) drop()` |  |

---

### <a id="get_errno"></a>`get_errno`

> 📄 `native.vxc` L23-29

```vex
fn get_errno(): i32
```

**Returns:** `i32`

---

### <a id="parse_ip_port"></a>`parse_ip_port`

> 📄 `native.vxc` L40-80

```vex
fn parse_ip_port(ip: Ptr<u8>, port: u16, addr_out: Ptr<sockaddr_in!>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `addr_out` | `Ptr&lt;sockaddr_in!&gt;` |  |

---

### <a id="vex_net_socket_tcp"></a>`vex_net_socket_tcp` `🔓 export`

> 📄 `native.vxc` L84-92

```vex
export fn vex_net_socket_tcp(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_socket_tcp_blocking"></a>`vex_net_socket_tcp_blocking` `🔓 export`

> 📄 `native.vxc` L94-101

```vex
export fn vex_net_socket_tcp_blocking(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_socket_udp"></a>`vex_net_socket_udp` `🔓 export`

> 📄 `native.vxc` L103-110

```vex
export fn vex_net_socket_udp(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseaddr"></a>`vex_net_set_reuseaddr` `🔓 export`

> 📄 `native.vxc` L112-117

```vex
export fn vex_net_set_reuseaddr(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseport"></a>`vex_net_set_reuseport` `🔓 export`

> 📄 `native.vxc` L119-124

```vex
export fn vex_net_set_reuseport(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nonblock"></a>`vex_net_set_nonblock` `🔓 export`

> 📄 `native.vxc` L126-131

```vex
export fn vex_net_set_nonblock(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nodelay"></a>`vex_net_set_nodelay` `🔓 export`

> 📄 `native.vxc` L133-138

```vex
export fn vex_net_set_nodelay(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nopush"></a>`vex_net_set_nopush` `🔓 export`

> 📄 `native.vxc` L140-145

```vex
export fn vex_net_set_nopush(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind"></a>`vex_net_bind` `🔓 export`

> 📄 `native.vxc` L149-155

```vex
export fn vex_net_bind(fd: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_listen"></a>`vex_net_listen` `🔓 export`

> 📄 `native.vxc` L157-161

```vex
export fn vex_net_listen(fd: i32, backlog: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect"></a>`vex_net_connect` `🔓 export`

> 📄 `native.vxc` L163-169

```vex
export fn vex_net_connect(fd: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_accept"></a>`vex_net_accept` `🔓 export`

> 📄 `native.vxc` L171-186

```vex
export fn vex_net_accept(fd: i32, ip_out: Ptr<u8>, ip_len: u64, port_out: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip_out` | `Ptr&lt;u8&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_recv"></a>`vex_net_recv` `🔓 export`

> 📄 `native.vxc` L188-192

```vex
export fn vex_net_recv(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv_peek"></a>`vex_net_recv_peek` `🔓 export`

> 📄 `native.vxc` L194-198

```vex
export fn vex_net_recv_peek(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_send"></a>`vex_net_send` `🔓 export`

> 📄 `native.vxc` L200-204

```vex
export fn vex_net_send(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto"></a>`vex_net_sendto` `🔓 export`

> 📄 `native.vxc` L206-212

```vex
export fn vex_net_sendto(fd: i32, buf: Ptr<u8>, len: u64, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom"></a>`vex_net_recvfrom` `🔓 export`

> 📄 `native.vxc` L214-227

```vex
export fn vex_net_recvfrom(fd: i32, buf: Ptr<u8>, len: u64, ip_out: Ptr<u8>, ip_len: u64, port_out: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip_out` | `Ptr&lt;u8&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_close"></a>`vex_net_close` `🔓 export`

> 📄 `native.vxc` L229-233

```vex
export fn vex_net_close(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_pipe"></a>`vex_net_pipe` `🔓 export`

> 📄 `native.vxc` L235-244

```vex
export fn vex_net_pipe(read_fd: Ptr<i32!>, write_fd: Ptr<i32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `read_fd` | `Ptr&lt;i32!&gt;` |  |
| `write_fd` | `Ptr&lt;i32!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_create"></a>`vex_net_loop_create` `🔓 export`

> 📄 `native.vxc` L248-255

```vex
export fn vex_net_loop_create(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_close"></a>`vex_net_loop_close` `🔓 export`

> 📄 `native.vxc` L257-262

```vex
export fn vex_net_loop_close(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_register"></a>`vex_net_register` `🔓 export`

> 📄 `native.vxc` L264-293

```vex
export fn vex_net_register(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_modify"></a>`vex_net_modify` `🔓 export`

> 📄 `native.vxc` L295-299

```vex
export fn vex_net_modify(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_unregister"></a>`vex_net_unregister` `🔓 export`

> 📄 `native.vxc` L301-314

```vex
export fn vex_net_unregister(loop_ptr: Ptr<u8>, fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_tick"></a>`vex_net_tick` `🔓 export`

> 📄 `native.vxc` L316-352

```vex
export fn vex_net_tick(loop_ptr: Ptr<u8>, out: Ptr<u8>, cap: i32, timeout_ms: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8&gt;` |  |
| `cap` | `i32` |  |
| `timeout_ms` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fd_set_nonblock"></a>`vex_fd_set_nonblock` `🔓 export`

> 📄 `native.vxc` L356-358

```vex
export fn vex_fd_set_nonblock(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_thread_yield"></a>`vex_net_thread_yield` `🔓 export`

> 📄 `native.vxc` L374-376

```vex
export fn vex_net_thread_yield(): i32
```

**Returns:** `i32`

---

### <a id="vex_fd_read"></a>`vex_fd_read` `🔓 export`

> 📄 `native.vxc` L378-382

```vex
export fn vex_fd_read(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.vxc` L384-388

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="readEvent"></a>`readEvent` `🔓 export`

> 📄 `event_loop.vx` L101-107

```vex
export fn readEvent(events_base: Ptr<Opaque>, index: i32): Event
```

Read the i-th event from a raw event buffer.

Each event is 16 bytes: {fd: i32, flags: i32, userdata: i64}.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `events_base` | `Ptr&lt;Opaque&gt;` |  |
| `index` | `i32` |  |

**Returns:** `Event`

---

### <a id="UdpSocket"></a>`UdpSocket` `🔓 export`

> 📄 `udp.vx` L42-58

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
| `sendTo`[↗](#UdpSocket.sendTo) | `export fn (self: &amp;UdpSocket) sendTo(data: Ptr&lt;u8&gt;,` | Send data to a specific ip:port. |
| `recvFrom`[↗](#UdpSocket.recvFrom) | `export fn (self: &amp;UdpSocket) recvFrom(buf: Ptr&lt;u8&gt;` | Receive data and get sender address. |
| `recvFromWithSource`[↗](#UdpSocket.recvFromWithSource) | `export fn (self: &amp;UdpSocket) recvFromWithSource(bu` | Receive data and preserve the native sender IPv4 text and port. The |
| `setNonBlock`[↗](#UdpSocket.setNonBlock) | `export fn (self: &amp;UdpSocket!) setNonBlock(on: bool` | Enable or disable non-blocking receive/send operations. |
| `close`[↗](#UdpSocket.close) | `export fn (self: &amp;UdpSocket!) close()` | Close the UDP socket. |
| `drop`[↗](#UdpSocket.drop) | `export fn (self: &amp;UdpSocket!) drop()` |  |

---

### <a id="parseFrame"></a>`parseFrame` `🔓 export`

> 📄 `ws_parser.vx` L76-80

```vex
export fn parseFrame(buf: Ptr<u8>, len: u64, frame: &WsFrame!, consumed: &u64 !): i32
```

Parse a WebSocket frame from a buffer.

Returns WS_OK(0) on success, WS_NEED_MORE(-1) if incomplete,
WS_ERR_INVALID(-2) on protocol error.
`consumed` is set to the total bytes consumed (header + payload).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `frame` | `&amp;WsFrame!` |  |
| `consumed` | `&amp;u64 !` |  |

**Returns:** `i32`

---

### <a id="encodeFrame"></a>`encodeFrame` `🔓 export`

> 📄 `ws_parser.vx` L87-94

```vex
export fn encodeFrame(buf: Ptr<u8!>, bufLen: u64, opcode: u8, payload: Ptr<u8>, payloadLen: u64, written: &u64 !): i32
```

Encode a WebSocket frame into `buf`.

Server frames are NOT masked (per RFC 6455).
Returns 0 on success. `written` = total bytes written to buf.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `opcode` | `u8` |  |
| `payload` | `Ptr&lt;u8&gt;` |  |
| `payloadLen` | `u64` |  |
| `written` | `&amp;u64 !` |  |

**Returns:** `i32`

---

### <a id="encodeText"></a>`encodeText` `🔓 export`

> 📄 `ws_parser.vx` L97-101

```vex
export fn encodeText(buf: Ptr<u8!>, bufLen: u64, text: Ptr<u8>, textLen: u64, written: &u64 !): i32
```

Encode a text frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `text` | `Ptr&lt;u8&gt;` |  |
| `textLen` | `u64` |  |
| `written` | `&amp;u64 !` |  |

**Returns:** `i32`

---

### <a id="encodeClose"></a>`encodeClose` `🔓 export`

> 📄 `ws_parser.vx` L104-111

```vex
export fn encodeClose(buf: Ptr<u8!>, bufLen: u64, code: u16, written: &u64 !): i32
```

Encode a close frame with optional status code.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `code` | `u16` |  |
| `written` | `&amp;u64 !` |  |

**Returns:** `i32`

---

### <a id="encodePing"></a>`encodePing` `🔓 export`

> 📄 `ws_parser.vx` L114-118

```vex
export fn encodePing(buf: Ptr<u8!>, bufLen: u64, written: &u64 !): i32
```

Encode a ping frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `written` | `&amp;u64 !` |  |

**Returns:** `i32`

---

### <a id="encodePong"></a>`encodePong` `🔓 export`

> 📄 `ws_parser.vx` L121-125

```vex
export fn encodePong(buf: Ptr<u8!>, bufLen: u64, payload: Ptr<u8>, payloadLen: u64, written: &u64 !): i32
```

Encode a pong frame (echo payload from ping).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `payload` | `Ptr&lt;u8&gt;` |  |
| `payloadLen` | `u64` |  |
| `written` | `&amp;u64 !` |  |

**Returns:** `i32`

---

### <a id="unmask"></a>`unmask` `🔓 export`

> 📄 `ws_parser.vx` L131-135

```vex
export fn unmask(data: Ptr<u8>, len: u64, mask: Ptr<u8>)
```

Unmask payload data in-place (XOR with 4-byte mask).

Call this on client-sent frames before reading payload.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `mask` | `Ptr&lt;u8&gt;` |  |

---

### <a id="isControlFrame"></a>`isControlFrame` `🔓 export`

> 📄 `ws_parser.vx` L138-140

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

> 📄 `ws_parser.vx` L143-145

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

### <a id="get_errno"></a>`get_errno`

> 📄 `native.macos.vxc` L23-29

```vex
fn get_errno(): i32
```

**Returns:** `i32`

---

### <a id="parse_ip_port"></a>`parse_ip_port`

> 📄 `native.macos.vxc` L40-80

```vex
fn parse_ip_port(ip: Ptr<u8>, port: u16, addr_out: Ptr<sockaddr_in!>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `addr_out` | `Ptr&lt;sockaddr_in!&gt;` |  |

---

### <a id="vex_net_socket_tcp"></a>`vex_net_socket_tcp` `🔓 export`

> 📄 `native.macos.vxc` L84-92

```vex
export fn vex_net_socket_tcp(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_socket_tcp_blocking"></a>`vex_net_socket_tcp_blocking` `🔓 export`

> 📄 `native.macos.vxc` L94-101

```vex
export fn vex_net_socket_tcp_blocking(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_socket_udp"></a>`vex_net_socket_udp` `🔓 export`

> 📄 `native.macos.vxc` L103-110

```vex
export fn vex_net_socket_udp(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseaddr"></a>`vex_net_set_reuseaddr` `🔓 export`

> 📄 `native.macos.vxc` L112-117

```vex
export fn vex_net_set_reuseaddr(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseport"></a>`vex_net_set_reuseport` `🔓 export`

> 📄 `native.macos.vxc` L119-124

```vex
export fn vex_net_set_reuseport(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nonblock"></a>`vex_net_set_nonblock` `🔓 export`

> 📄 `native.macos.vxc` L126-131

```vex
export fn vex_net_set_nonblock(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nodelay"></a>`vex_net_set_nodelay` `🔓 export`

> 📄 `native.macos.vxc` L133-138

```vex
export fn vex_net_set_nodelay(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nopush"></a>`vex_net_set_nopush` `🔓 export`

> 📄 `native.macos.vxc` L140-145

```vex
export fn vex_net_set_nopush(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind"></a>`vex_net_bind` `🔓 export`

> 📄 `native.macos.vxc` L149-155

```vex
export fn vex_net_bind(fd: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_listen"></a>`vex_net_listen` `🔓 export`

> 📄 `native.macos.vxc` L157-161

```vex
export fn vex_net_listen(fd: i32, backlog: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect"></a>`vex_net_connect` `🔓 export`

> 📄 `native.macos.vxc` L163-169

```vex
export fn vex_net_connect(fd: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_accept"></a>`vex_net_accept` `🔓 export`

> 📄 `native.macos.vxc` L171-186

```vex
export fn vex_net_accept(fd: i32, ip_out: Ptr<u8>, ip_len: u64, port_out: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip_out` | `Ptr&lt;u8&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_recv"></a>`vex_net_recv` `🔓 export`

> 📄 `native.macos.vxc` L188-192

```vex
export fn vex_net_recv(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv_peek"></a>`vex_net_recv_peek` `🔓 export`

> 📄 `native.macos.vxc` L194-198

```vex
export fn vex_net_recv_peek(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_send"></a>`vex_net_send` `🔓 export`

> 📄 `native.macos.vxc` L200-204

```vex
export fn vex_net_send(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto"></a>`vex_net_sendto` `🔓 export`

> 📄 `native.macos.vxc` L206-212

```vex
export fn vex_net_sendto(fd: i32, buf: Ptr<u8>, len: u64, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom"></a>`vex_net_recvfrom` `🔓 export`

> 📄 `native.macos.vxc` L214-227

```vex
export fn vex_net_recvfrom(fd: i32, buf: Ptr<u8>, len: u64, ip_out: Ptr<u8>, ip_len: u64, port_out: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip_out` | `Ptr&lt;u8&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_close"></a>`vex_net_close` `🔓 export`

> 📄 `native.macos.vxc` L229-233

```vex
export fn vex_net_close(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_pipe"></a>`vex_net_pipe` `🔓 export`

> 📄 `native.macos.vxc` L235-244

```vex
export fn vex_net_pipe(read_fd: Ptr<i32!>, write_fd: Ptr<i32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `read_fd` | `Ptr&lt;i32!&gt;` |  |
| `write_fd` | `Ptr&lt;i32!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_create"></a>`vex_net_loop_create` `🔓 export`

> 📄 `native.macos.vxc` L248-255

```vex
export fn vex_net_loop_create(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_close"></a>`vex_net_loop_close` `🔓 export`

> 📄 `native.macos.vxc` L257-262

```vex
export fn vex_net_loop_close(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_register"></a>`vex_net_register` `🔓 export`

> 📄 `native.macos.vxc` L264-293

```vex
export fn vex_net_register(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_modify"></a>`vex_net_modify` `🔓 export`

> 📄 `native.macos.vxc` L295-299

```vex
export fn vex_net_modify(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_unregister"></a>`vex_net_unregister` `🔓 export`

> 📄 `native.macos.vxc` L301-314

```vex
export fn vex_net_unregister(loop_ptr: Ptr<u8>, fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_tick"></a>`vex_net_tick` `🔓 export`

> 📄 `native.macos.vxc` L316-352

```vex
export fn vex_net_tick(loop_ptr: Ptr<u8>, out: Ptr<u8>, cap: i32, timeout_ms: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8&gt;` |  |
| `cap` | `i32` |  |
| `timeout_ms` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fd_set_nonblock"></a>`vex_fd_set_nonblock` `🔓 export`

> 📄 `native.macos.vxc` L356-358

```vex
export fn vex_fd_set_nonblock(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_thread_yield"></a>`vex_net_thread_yield` `🔓 export`

> 📄 `native.macos.vxc` L374-376

```vex
export fn vex_net_thread_yield(): i32
```

**Returns:** `i32`

---

### <a id="vex_fd_read"></a>`vex_fd_read` `🔓 export`

> 📄 `native.macos.vxc` L378-382

```vex
export fn vex_fd_read(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.macos.vxc` L384-388

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="monotonicNs"></a>`monotonicNs` `🔓 export`

> 📄 `runtime.vxc` L15-17

```vex
export fn monotonicNs(): u64
```

Monotonic clock in nanoseconds.

**Returns:** `u64`

---

### <a id="prepareWorkers"></a>`prepareWorkers` `🔓 export`

> 📄 `runtime.vxc` L20-22

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

> 📄 `runtime.vxc` L25-27

```vex
export fn flushSpawnBatch()
```

Flush the main-thread spawn batch immediately.

---

### <a id="arenaSave"></a>`arenaSave` `🔓 export`

> 📄 `runtime.vxc` L29-31

```vex
export fn arenaSave(): Ptr<Opaque>
```

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="arenaRestore"></a>`arenaRestore` `🔓 export`

> 📄 `runtime.vxc` L33-35

```vex
export fn arenaRestore(token: Ptr<Opaque>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `token` | `Ptr&lt;Opaque&gt;` |  |

---

### <a id="arenaTotalBytesUsed"></a>`arenaTotalBytesUsed` `🔓 export`

> 📄 `runtime.vxc` L37-39

```vex
export fn arenaTotalBytesUsed(): u64
```

**Returns:** `u64`

---

### <a id="regionCurrent"></a>`regionCurrent` `🔓 export`

> 📄 `runtime.vxc` L41-43

```vex
export fn regionCurrent(): Ptr<Opaque>
```

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="regionSetCurrent"></a>`regionSetCurrent` `🔓 export`

> 📄 `runtime.vxc` L45-47

```vex
export fn regionSetCurrent(r: Ptr<Opaque>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `r` | `Ptr&lt;Opaque&gt;` |  |

---

### <a id="setArenaMode"></a>`setArenaMode` `🔓 export`

> 📄 `runtime.vxc` L49-51

```vex
export fn setArenaMode(enabled: bool)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `enabled` | `bool` |  |

---

### <a id="getArenaMode"></a>`getArenaMode` `🔓 export`

> 📄 `runtime.vxc` L53-55

```vex
export fn getArenaMode(): bool
```

**Returns:** `bool`

---

### <a id="cpuCount"></a>`cpuCount` `🔓 export`

> 📄 `socket.vx` L153-158

```vex
export fn cpuCount(): i32
```

Get the number of CPU cores (for multi-worker servers).

**Returns:** `i32`

---

### <a id="makePipe"></a>`makePipe` `🔓 export`

> 📄 `socket.vx` L162-168

```vex
export fn makePipe(): [i32; 2]
```

Create a pipe pair (read_fd, write_fd).

Returns [read_fd, write_fd] on success, [-1, -1] on error.

**Returns:** `[i32; 2]`

---

### <a id="tcpBlockingFd"></a>`tcpBlockingFd` `🔓 export`

> 📄 `socket.vx` L173-175

```vex
export fn tcpBlockingFd(): i32
```

Create a blocking TCP socket fd.

**Returns:** `i32`

---

### <a id="connectFd"></a>`connectFd` `🔓 export`

> 📄 `socket.vx` L178-180

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

> 📄 `socket.vx` L183-185

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

> 📄 `socket.vx` L188-190

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

> 📄 `socket.vx` L193-195

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

> 📄 `socket.vx` L198-202

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

> 📄 `socket.vx` L205-209

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

> 📄 `socket.vx` L212-214

```vex
export fn recvFd(fd: i32, buf: Ptr<u8>, len: u64): i64
```

Receive bytes on a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="sendFd"></a>`sendFd` `🔓 export`

> 📄 `socket.vx` L217-219

```vex
export fn sendFd(fd: i32, buf: Ptr<u8>, len: u64): i64
```

Send bytes on a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="closeFd"></a>`closeFd` `🔓 export`

> 📄 `socket.vx` L222-224

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

> 📄 `socket.vx` L227-229

```vex
export fn peekFd(fd: i32, buf: Ptr<u8>, len: u64): i64
```

Peek bytes without consuming them. Returns 0 on EOF, negative on error/EAGAIN.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="writeFd"></a>`writeFd` `🔓 export`

> 📄 `socket.vx` L233-235

```vex
export fn writeFd(fd: i32, buf: Ptr<u8>, len: u64): i64
```

Write bytes to any fd (pipe, file, socket). Uses write() syscall.

Unlike sendFd which uses send() (socket-only), this works on pipes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="readFd"></a>`readFd` `🔓 export`

> 📄 `socket.vx` L239-241

```vex
export fn readFd(fd: i32, buf: Ptr<u8>, len: u64): i64
```

Read bytes from any fd (pipe, file, socket). Uses read() syscall.

Unlike recvFd which uses recv() (socket-only), this works on pipes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="asyncAcceptFd"></a>`asyncAcceptFd` `🔓 export`

> 📄 `socket.vx` L256-258

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

> 📄 `socket.vx` L261-263

```vex
export fn asyncRecvFd(fd: i32, buf: Ptr<u8>, len: u64): i64
```

Receive bytes on a raw fd, goroutine-aware. Parks on EAGAIN.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="asyncSendFd"></a>`asyncSendFd` `🔓 export`

> 📄 `socket.vx` L267-269

```vex
export fn asyncSendFd(fd: i32, buf: Ptr<u8>, len: u64): i64
```

Send bytes on a raw fd, goroutine-aware. Parks on EAGAIN.

Ensures all bytes are written (handles partial writes).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="setNonBlockFd"></a>`setNonBlockFd` `🔓 export`

> 📄 `socket.vx` L272-274

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

### <a id="socket"></a>`socket`

> 📄 `native.linux.vxc` L7-21

```vex
fn socket(domain: i32, type_: i32, protocol: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `domain` | `i32` |  |
| `type_` | `i32` |  |
| `protocol` | `i32` |  |

**Returns:** `i32`

---

### <a id="bind"></a>`bind`

> 📄 `native.linux.vxc` L23-37

```vex
fn bind(fd: i32, addr: Ptr<Opaque>, len: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u32` |  |

**Returns:** `i32`

---

### <a id="listen"></a>`listen`

> 📄 `native.linux.vxc` L39-52

```vex
fn listen(fd: i32, backlog: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="accept"></a>`accept`

> 📄 `native.linux.vxc` L54-68

```vex
fn accept(fd: i32, addr: Ptr<Opaque>, len_ptr: Ptr<u32>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `len_ptr` | `Ptr&lt;u32&gt;` |  |

**Returns:** `i32`

---

### <a id="connect"></a>`connect`

> 📄 `native.linux.vxc` L70-84

```vex
fn connect(fd: i32, addr: Ptr<Opaque>, len: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u32` |  |

**Returns:** `i32`

---

### <a id="close"></a>`close`

> 📄 `native.linux.vxc` L86-98

```vex
fn close(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="recvfrom"></a>`recvfrom`

> 📄 `native.linux.vxc` L100-117

```vex
fn recvfrom(fd: i32, buf: Ptr<u8>, len: u64, flags: i32, addr: Ptr<Opaque>, addr_len: Ptr<u32>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `flags` | `i32` |  |
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `addr_len` | `Ptr&lt;u32&gt;` |  |

**Returns:** `i64`

---

### <a id="sendto"></a>`sendto`

> 📄 `native.linux.vxc` L119-136

```vex
fn sendto(fd: i32, buf: Ptr<u8>, len: u64, flags: i32, addr: Ptr<Opaque>, addr_len: u32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `flags` | `i32` |  |
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `addr_len` | `u32` |  |

**Returns:** `i64`

---

### <a id="setsockopt"></a>`setsockopt`

> 📄 `native.linux.vxc` L138-154

```vex
fn setsockopt(fd: i32, level: i32, optname: i32, optval: Ptr<Opaque>, optlen: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `level` | `i32` |  |
| `optname` | `i32` |  |
| `optval` | `Ptr&lt;Opaque&gt;` |  |
| `optlen` | `u32` |  |

**Returns:** `i32`

---

### <a id="pipe2"></a>`pipe2`

> 📄 `native.linux.vxc` L156-169

```vex
fn pipe2(fds: Ptr<i32>, flags: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fds` | `Ptr&lt;i32&gt;` |  |
| `flags` | `i32` |  |

**Returns:** `i32`

---

### <a id="fcntl"></a>`fcntl`

> 📄 `native.linux.vxc` L171-185

```vex
fn fcntl(fd: i32, cmd: i32, arg: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `cmd` | `i32` |  |
| `arg` | `i64` |  |

**Returns:** `i32`

---

### <a id="epoll_create1"></a>`epoll_create1`

> 📄 `native.linux.vxc` L187-199

```vex
fn epoll_create1(flags: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `flags` | `i32` |  |

**Returns:** `i32`

---

### <a id="epoll_ctl"></a>`epoll_ctl`

> 📄 `native.linux.vxc` L201-216

```vex
fn epoll_ctl(epfd: i32, op: i32, fd: i32, event: Ptr<Opaque>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `epfd` | `i32` |  |
| `op` | `i32` |  |
| `fd` | `i32` |  |
| `event` | `Ptr&lt;Opaque&gt;` |  |

**Returns:** `i32`

---

### <a id="epoll_wait"></a>`epoll_wait`

> 📄 `native.linux.vxc` L218-233

```vex
fn epoll_wait(epfd: i32, events: Ptr<Opaque>, maxevents: i32, timeout: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `epfd` | `i32` |  |
| `events` | `Ptr&lt;Opaque&gt;` |  |
| `maxevents` | `i32` |  |
| `timeout` | `i32` |  |

**Returns:** `i32`

---

### <a id="parse_ip_port"></a>`parse_ip_port`

> 📄 `native.linux.vxc` L242-279

```vex
fn parse_ip_port(ip: Ptr<u8>, port: u16, addr_out: Ptr<sockaddr_in!>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `addr_out` | `Ptr&lt;sockaddr_in!&gt;` |  |

---

### <a id="vex_net_socket_tcp"></a>`vex_net_socket_tcp` `🔓 export`

> 📄 `native.linux.vxc` L283-290

```vex
export fn vex_net_socket_tcp(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_socket_tcp_blocking"></a>`vex_net_socket_tcp_blocking` `🔓 export`

> 📄 `native.linux.vxc` L292-295

```vex
export fn vex_net_socket_tcp_blocking(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_socket_udp"></a>`vex_net_socket_udp` `🔓 export`

> 📄 `native.linux.vxc` L297-300

```vex
export fn vex_net_socket_udp(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseaddr"></a>`vex_net_set_reuseaddr` `🔓 export`

> 📄 `native.linux.vxc` L302-305

```vex
export fn vex_net_set_reuseaddr(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseport"></a>`vex_net_set_reuseport` `🔓 export`

> 📄 `native.linux.vxc` L307-310

```vex
export fn vex_net_set_reuseport(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nonblock"></a>`vex_net_set_nonblock` `🔓 export`

> 📄 `native.linux.vxc` L312-319

```vex
export fn vex_net_set_nonblock(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nodelay"></a>`vex_net_set_nodelay` `🔓 export`

> 📄 `native.linux.vxc` L321-324

```vex
export fn vex_net_set_nodelay(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nopush"></a>`vex_net_set_nopush` `🔓 export`

> 📄 `native.linux.vxc` L326-329

```vex
export fn vex_net_set_nopush(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind"></a>`vex_net_bind` `🔓 export`

> 📄 `native.linux.vxc` L331-335

```vex
export fn vex_net_bind(fd: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_listen"></a>`vex_net_listen` `🔓 export`

> 📄 `native.linux.vxc` L337-339

```vex
export fn vex_net_listen(fd: i32, backlog: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect"></a>`vex_net_connect` `🔓 export`

> 📄 `native.linux.vxc` L341-345

```vex
export fn vex_net_connect(fd: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_accept"></a>`vex_net_accept` `🔓 export`

> 📄 `native.linux.vxc` L347-359

```vex
export fn vex_net_accept(fd: i32, ip_out: Ptr<u8>, ip_len: u64, port_out: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip_out` | `Ptr&lt;u8&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_recv"></a>`vex_net_recv` `🔓 export`

> 📄 `native.linux.vxc` L361-363

```vex
export fn vex_net_recv(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv_peek"></a>`vex_net_recv_peek` `🔓 export`

> 📄 `native.linux.vxc` L365-367

```vex
export fn vex_net_recv_peek(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_send"></a>`vex_net_send` `🔓 export`

> 📄 `native.linux.vxc` L369-371

```vex
export fn vex_net_send(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto"></a>`vex_net_sendto` `🔓 export`

> 📄 `native.linux.vxc` L373-377

```vex
export fn vex_net_sendto(fd: i32, buf: Ptr<u8>, len: u64, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom"></a>`vex_net_recvfrom` `🔓 export`

> 📄 `native.linux.vxc` L379-391

```vex
export fn vex_net_recvfrom(fd: i32, buf: Ptr<u8>, len: u64, ip_out: Ptr<u8>, ip_len: u64, port_out: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip_out` | `Ptr&lt;u8&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_close"></a>`vex_net_close` `🔓 export`

> 📄 `native.linux.vxc` L393-395

```vex
export fn vex_net_close(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_pipe"></a>`vex_net_pipe` `🔓 export`

> 📄 `native.linux.vxc` L397-407

```vex
export fn vex_net_pipe(read_fd: Ptr<i32!>, write_fd: Ptr<i32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `read_fd` | `Ptr&lt;i32!&gt;` |  |
| `write_fd` | `Ptr&lt;i32!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_create"></a>`vex_net_loop_create` `🔓 export`

> 📄 `native.linux.vxc` L411-418

```vex
export fn vex_net_loop_create(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_close"></a>`vex_net_loop_close` `🔓 export`

> 📄 `native.linux.vxc` L420-423

```vex
export fn vex_net_loop_close(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_register"></a>`vex_net_register` `🔓 export`

> 📄 `native.linux.vxc` L431-440

```vex
export fn vex_net_register(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_modify"></a>`vex_net_modify` `🔓 export`

> 📄 `native.linux.vxc` L442-451

```vex
export fn vex_net_modify(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_unregister"></a>`vex_net_unregister` `🔓 export`

> 📄 `native.linux.vxc` L453-456

```vex
export fn vex_net_unregister(loop_ptr: Ptr<u8>, fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_tick"></a>`vex_net_tick` `🔓 export`

> 📄 `native.linux.vxc` L458-485

```vex
export fn vex_net_tick(loop_ptr: Ptr<u8>, out: Ptr<u8>, cap: i32, timeout_ms: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8&gt;` |  |
| `cap` | `i32` |  |
| `timeout_ms` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fd_set_nonblock"></a>`vex_fd_set_nonblock` `🔓 export`

> 📄 `native.linux.vxc` L489-491

```vex
export fn vex_fd_set_nonblock(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.linux.vxc` L493-495

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_thread_yield"></a>`vex_net_thread_yield` `🔓 export`

> 📄 `native.linux.vxc` L511-513

```vex
export fn vex_net_thread_yield(): i32
```

**Returns:** `i32`

---

### <a id="vex_fd_read"></a>`vex_fd_read` `🔓 export`

> 📄 `native.linux.vxc` L515-517

```vex
export fn vex_fd_read(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.linux.vxc` L519-521

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_ws_parse_frame"></a>`vex_ws_parse_frame` `🔓 export`

> 📄 `ws_ffi.vxc` L7-71

```vex
export fn vex_ws_parse_frame(buf: Ptr<u8>, len: u64, out: Ptr<u8!>, consumed: Ptr<u64!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `out` | `Ptr&lt;u8!&gt;` |  |
| `consumed` | `Ptr&lt;u64!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_ws_encode_frame"></a>`vex_ws_encode_frame` `🔓 export`

> 📄 `ws_ffi.vxc` L73-124

```vex
export fn vex_ws_encode_frame(buf: Ptr<u8!>, buf_len: u64, opcode: u8, payload: Ptr<u8>, payload_len: u64, written: Ptr<u64!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `buf_len` | `u64` |  |
| `opcode` | `u8` |  |
| `payload` | `Ptr&lt;u8&gt;` |  |
| `payload_len` | `u64` |  |
| `written` | `Ptr&lt;u64!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_ws_unmask"></a>`vex_ws_unmask` `🔓 export`

> 📄 `ws_ffi.vxc` L126-138

```vex
export fn vex_ws_unmask(data: Ptr<u8>, len: u64, mask: Ptr<u8>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `mask` | `Ptr&lt;u8&gt;` |  |

---

### <a id="ensure_wsa"></a>`ensure_wsa`

> 📄 `native.windows.vxc` L27-29

```vex
fn ensure_wsa(): bool
```

**Returns:** `bool`

---

### <a id="parse_ip_port"></a>`parse_ip_port`

> 📄 `native.windows.vxc` L41-64

```vex
fn parse_ip_port(ip: Ptr<u8>, port: u16, addr_out: Ptr<sockaddr_in!>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `addr_out` | `Ptr&lt;sockaddr_in!&gt;` |  |

---

### <a id="vex_net_socket_tcp"></a>`vex_net_socket_tcp` `🔓 export`

> 📄 `native.windows.vxc` L68-77

```vex
export fn vex_net_socket_tcp(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_socket_tcp_blocking"></a>`vex_net_socket_tcp_blocking` `🔓 export`

> 📄 `native.windows.vxc` L79-84

```vex
export fn vex_net_socket_tcp_blocking(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_socket_udp"></a>`vex_net_socket_udp` `🔓 export`

> 📄 `native.windows.vxc` L86-91

```vex
export fn vex_net_socket_udp(ipv6: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseaddr"></a>`vex_net_set_reuseaddr` `🔓 export`

> 📄 `native.windows.vxc` L93-96

```vex
export fn vex_net_set_reuseaddr(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseport"></a>`vex_net_set_reuseport` `🔓 export`

> 📄 `native.windows.vxc` L98-101

```vex
export fn vex_net_set_reuseport(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nonblock"></a>`vex_net_set_nonblock` `🔓 export`

> 📄 `native.windows.vxc` L103-106

```vex
export fn vex_net_set_nonblock(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nodelay"></a>`vex_net_set_nodelay` `🔓 export`

> 📄 `native.windows.vxc` L108-111

```vex
export fn vex_net_set_nodelay(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nopush"></a>`vex_net_set_nopush` `🔓 export`

> 📄 `native.windows.vxc` L113-117

```vex
export fn vex_net_set_nopush(fd: i32, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind"></a>`vex_net_bind` `🔓 export`

> 📄 `native.windows.vxc` L119-123

```vex
export fn vex_net_bind(fd: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_listen"></a>`vex_net_listen` `🔓 export`

> 📄 `native.windows.vxc` L125-127

```vex
export fn vex_net_listen(fd: i32, backlog: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect"></a>`vex_net_connect` `🔓 export`

> 📄 `native.windows.vxc` L129-133

```vex
export fn vex_net_connect(fd: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_accept"></a>`vex_net_accept` `🔓 export`

> 📄 `native.windows.vxc` L135-146

```vex
export fn vex_net_accept(fd: i32, ip_out: Ptr<u8>, ip_len: u64, port_out: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ip_out` | `Ptr&lt;u8&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_recv"></a>`vex_net_recv` `🔓 export`

> 📄 `native.windows.vxc` L148-150

```vex
export fn vex_net_recv(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv_peek"></a>`vex_net_recv_peek` `🔓 export`

> 📄 `native.windows.vxc` L152-154

```vex
export fn vex_net_recv_peek(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_send"></a>`vex_net_send` `🔓 export`

> 📄 `native.windows.vxc` L156-158

```vex
export fn vex_net_send(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto"></a>`vex_net_sendto` `🔓 export`

> 📄 `native.windows.vxc` L160-164

```vex
export fn vex_net_sendto(fd: i32, buf: Ptr<u8>, len: u64, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom"></a>`vex_net_recvfrom` `🔓 export`

> 📄 `native.windows.vxc` L166-176

```vex
export fn vex_net_recvfrom(fd: i32, buf: Ptr<u8>, len: u64, ip_out: Ptr<u8>, ip_len: u64, port_out: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip_out` | `Ptr&lt;u8&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_close"></a>`vex_net_close` `🔓 export`

> 📄 `native.windows.vxc` L178-180

```vex
export fn vex_net_close(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_pipe"></a>`vex_net_pipe` `🔓 export`

> 📄 `native.windows.vxc` L182-194

```vex
export fn vex_net_pipe(read_fd: Ptr<i32!>, write_fd: Ptr<i32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `read_fd` | `Ptr&lt;i32!&gt;` |  |
| `write_fd` | `Ptr&lt;i32!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_create"></a>`vex_net_loop_create` `🔓 export`

> 📄 `native.windows.vxc` L198-200

```vex
export fn vex_net_loop_create(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_close"></a>`vex_net_loop_close` `🔓 export`

> 📄 `native.windows.vxc` L202-204

```vex
export fn vex_net_loop_close(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_register"></a>`vex_net_register` `🔓 export`

> 📄 `native.windows.vxc` L206-208

```vex
export fn vex_net_register(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_modify"></a>`vex_net_modify` `🔓 export`

> 📄 `native.windows.vxc` L210-212

```vex
export fn vex_net_modify(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_unregister"></a>`vex_net_unregister` `🔓 export`

> 📄 `native.windows.vxc` L214-216

```vex
export fn vex_net_unregister(loop_ptr: Ptr<u8>, fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_tick"></a>`vex_net_tick` `🔓 export`

> 📄 `native.windows.vxc` L218-220

```vex
export fn vex_net_tick(loop_ptr: Ptr<u8>, out: Ptr<u8>, cap: i32, timeout_ms: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8&gt;` |  |
| `cap` | `i32` |  |
| `timeout_ms` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_thread_yield"></a>`vex_net_thread_yield` `🔓 export`

> 📄 `native.windows.vxc` L222-224

```vex
export fn vex_net_thread_yield(): i32
```

**Returns:** `i32`

---

### <a id="vex_fd_set_nonblock"></a>`vex_fd_set_nonblock` `🔓 export`

> 📄 `native.windows.vxc` L228-230

```vex
export fn vex_fd_set_nonblock(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.windows.vxc` L232-234

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fd_read"></a>`vex_fd_read` `🔓 export`

> 📄 `native.windows.vxc` L249-251

```vex
export fn vex_fd_read(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.windows.vxc` L253-255

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

---

*Generated by vex-doc v2.0 • 2026-08-25*
