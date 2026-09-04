# net — typed TCP/UDP, task-aware I/O and frame processing

`net` provides two deliberate layers:

- `TcpListener`, `TcpStream` and `UdpSocket` own platform-width socket handles
  and return `Result<_, IoError>`;
- `Socket`, `EventLoop` and the raw `*Fd` helpers expose normalized negative
  status codes for runtimes and protocol engines that need direct control.

Native providers normalize Darwin and WinSock errors to the common VexArch
error domain. High-level code can therefore inspect `IoErrorKind` without OS
branches or message matching.

## TCP

```vex
import { Context } from "context";
import { TcpListener } from "net";
import { Duration } from "time";

let! listener = match TcpListener.bind("127.0.0.1", 8080) {
    Ok(value) => value,
    Err(failure) => { $panic(failure.toString()); },
};

let request = Context.background().withTimeout(Duration.seconds(5));
let stream = match await listener.accept(&request) {
    Ok(value) => value,
    Err(failure) => { $panic(failure.toString()); },
};
```

Listeners are non-blocking. `accept`, stream reads and stream writes park the
current Vex task instead of polling in user code. Accepted handles are made
non-blocking explicitly and enable `TCP_NODELAY` before becoming observable.

`TcpStream` is also the canonical `io::AsyncReadWriter`: generic transport
code receives a mandatory `Context` on each read/write, preserving cancellation
and deadlines without a protocol-specific socket loop. Context-free TCP
overloads remain available only for deliberately uncancelable fast paths.

`TcpStream.connect` is task-aware and asynchronous. It uses the same runtime
poller contract as accept/read/write and never narrows Windows' platform-width
`SOCKET`. Bootstrap code that deliberately wants a blocking establishment step
must say so with `TcpStream.connectBlocking`; the returned stream is switched
to non-blocking mode before it becomes observable.

Useful stream operations:

- `read(buffer, len) -> Result<usize, IoError>`; `Ok(0)` means orderly EOF;
- `write(buffer, len) -> Result<usize, IoError>`;
- `writeAll` and `writeAllStr` preserve the unwritten tail across partial I/O;
- `close` is idempotent and invalidates the local handle before entering the OS;
- `rawHandle` is available for poller integration without narrowing WinSock's
 64-bit `SOCKET` carrier.

### Cancellation and deadlines

TCP accept, connect, read, write and write-all have `&Context` overloads. A
context is checked before native access and then bound to the exact in-flight
runtime operation, so cancellation or deadline expiry actively wakes an
already parked task. There is no user-space sleep/poll loop.

```vex
let request = Context.background().withTimeout(Duration.milliseconds(250));
let stream = match await TcpStream.connect(endpoint, &request) {
    Ok(value) => value,
    Err(failure) => { $panic(failure.toString()); },
};

let count = await stream.read(buffer, capacity, &request);
```

Manual cancellation maps to `IoErrorKind.Canceled`; deadline expiry maps to
`IoErrorKind.TimedOut`. The runtime stores cancellation identity and absolute
monotonic deadline in the same generation-owned operation slot as provider
completion. Exactly one of completion, cancellation or timeout retires the
provider resource and wakes the task. Context-free overloads remain a separate
hot path with null identity and no deadline work.

## UDP

```vex
import { Context } from "context";
import { UdpSocket } from "net";
import { Duration } from "time";

let! socket = match UdpSocket.bind("0.0.0.0", 9000) {
    Ok(value) => value,
    Err(failure) => { $panic(failure.toString()); },
};

let request = Context.background().withTimeout(Duration.milliseconds(250));
let received = await socket.recvDatagram(buffer, capacity, &request);
```

UDP sockets are readiness-safe and non-blocking after `bind`. `sendTo`,
`recvFrom`, `recvDatagram` and `recvFromWithSource` provide `&Context`
overloads that park the current task and participate in the same cancellation,
deadline and generation-owned retirement contract as TCP. A datagram is never
split across resumptions. On Windows, the IOCP operation owns its destination
or source address storage until the completion packet retires it.

Context-free overloads perform one immediate operation and report the
normalized would-block error when no datagram is ready. A caller that
deliberately requires an operating-system-thread-blocking receive must opt in
with `socket.setNonBlock(false)`. All overloads validate buffer bounds and
never report more bytes than the caller supplied. `UdpRecvFromResult`
preserves the source port and a bounded, zero-terminated address buffer.

## Typed address boundary

`Ipv4Addr`, `Ipv6Addr`, `IpAddr` and `SocketAddr` are canonical value types.
IPv4 text is parsed once in portable Vex code. The parser is length-bounded,
requires exactly four decimal octets and rejects values above 255, empty
segments, extra segments and non-decimal input. IPv6 accepts canonical compressed
forms and embedded IPv4, and formats according to RFC 5952. Native providers
receive validated address bytes; they do not scan C strings or duplicate
address parsing.

`bind` and `connect` accept either text plus port or a typed `SocketAddr`.
`localAddr` and `peerAddr` return typed endpoints. Numeric-address APIs never
pretend that name resolution happened.

### Allocation-free address formatting

Every address value exposes exact planning, a safe reusable-`Vec` append API,
and a transactional advanced caller-buffer writer:

```vex
import { SocketAddr } from "net";

let endpoint = match SocketAddr.tryParse("[2001:db8::5]:443") {
    Ok(value) => value,
    Err(failure) => { $panic(failure.message()); },
};

let! bytes = Vec.withCapacity<u8>(47);
let written = endpoint.appendTo(&bytes!);
```

`appendTo` preserves existing bytes, reserves when necessary and becomes
allocation-free after capacity is established. `textLength()` returns the
exact RFC 5952 byte length without allocating. Advanced serializers may use
`tryWriteTo(RawBuf, capacity)`: it validates capacity before its first store
and reports both `required()` and `capacity()` through `AddressFormatError`.
Supplying the public maximum widths—15 bytes for IPv4, 39 for IPv6, 21 for an
IPv4 endpoint or 47 for an IPv6 endpoint—selects the one-pass path.
`toString()` remains the owned convenience API.

On the 2026-08-21 M2 Max O3 five-round gate, caller-buffer formatting measured
6.88 ns for IPv4, 17.20 ns for IPv6 and 20.88 ns for an IPv6 `SocketAddr`, all
at zero allocation. Safe reused-`Vec` endpoint append measured 26.18 ns. The
same run measured 18.50 ns IPv4 parse, 56.80 ns compressed IPv6 parse and
69.90 ns bracketed IPv6 endpoint parse.

## DNS resolution

The system resolver is explicit and typed:

```vex
import {
    ResolveFamily,
    ResolveOptions,
    resolveSocketAddrsBlocking,
} from "net";

let endpoints = match resolveSocketAddrsBlocking(
    "example.com",
    443,
    ResolveOptions.new(ResolveFamily.Any, 16),
) {
    Ok(value) => value,
    Err(failure) => { $panic(failure.toString()); },
};
```

`resolveHostBlocking` returns ordered, duplicate-free `Vec<IpAddr>` values;
`resolveSocketAddrsBlocking` attaches the requested port. Numeric IPv4/IPv6
input uses the portable parser and does not enter the OS resolver. Hostname
results are bounded (maximum 64), family-filterable and converted immediately
from native `addrinfo` storage into Vex value types.

The `Blocking` suffix is a semantic guarantee: the platform resolver may use
files, NSS, mDNS or network I/O and can block the operating-system thread. Do
not call it on a latency-sensitive scheduler worker. Hostnames must be ASCII or
caller-supplied IDNA punycode; embedded NUL and locale-dependent Unicode input
are rejected before native access. Unknown targets return typed `Unsupported`
instead of inheriting a hosted resolver ABI.

## Raw socket and event-loop layer

```vex
import { Socket } from "net";

let! socket = Socket.tcpBlocking();
if !socket.isValid() {
    $panic("TCP socket creation failed");
}
```

The raw layer is intentionally status-oriented. Check every fallible return.
Socket handles are `i64` throughout the std boundary; descriptor-only Unix
fallbacks reject values outside the i32 descriptor range instead of truncating.

`EventLoop` routes to kqueue on macOS and epoll on Linux. Windows task-aware
socket I/O uses VexArch's IOCP completion path; the separate readiness-style
`EventLoop` reports `Unsupported` rather than faking successful registration.
Unknown targets use a freestanding fail-closed provider with no borrowed libc
ABI.

Task-aware readiness never publishes a task pointer to the kernel. VexArch
publishes a 64-bit generation-owned registration token only after the provider
resource is prepared. A completion or cancellation must win the registration's
single terminal transition before it may wake the task or retire the provider
resource. Late, duplicate and recycled-generation events are therefore ignored
without reading a stale task. On the Linux epoll fallback, read and write waits
for the same socket own distinct provider registrations, so registering one
direction cannot overwrite the other.

## Buffered connections

`Conn.wrap(handle)` takes ownership; `Conn.wrapBorrowed(handle)` leaves
ownership with the outer adapter. Its read/write queues start at 8 KiB/4 KiB,
grow only to the 1 MiB bound, use bulk `Mem.copy`/`Mem.move`, and never report
silently discarded bytes.

## WebSocket frames

`parseFrame` validates canonical RFC 6455 lengths and returns a zero-copy
payload pointer. Masking keys remain encapsulated in `WsFrame`; use
`frame.unmaskPayload(ptr, len) -> bool` for in-place decoding. It validates the
requested range against the parsed payload and target pointer width before its
first store. `false` therefore means that no payload byte was changed.

Mask XOR is implemented with Vex fixed-array SIMD, not C/Rust FFI or a
source-level architecture branch. Four independent 16-byte vectors form the
bulk loop and a bounded scalar tail handles the remainder. On the M2 Max O3
five-round gate, 125 bytes measured 10.87 ns / 10.7 GB/s and 4 KiB measured
78.03 ns / 48.9 GB/s, both allocation-free. The pre-SIMD 4 KiB implementation
measured about 1.50 us / 2.5 GB/s.

`Conn.findHeaderEnd()` uses the canonical SIMD `Mem.indexOfBytes` engine for
`\r\n\r\n`. A 4 KiB scan with the terminator at the end measured 211.51 ns /
18.0 GB/s, down from roughly 2.38 us / 1.6 GB/s. A steady-state connection
cycle that compacts 4 KiB and stages 8 KiB measured 153.06 ns / 74.8 GB/s.
Reusable 4 KiB WebSocket encoding measured 55.78 ns / 68.4 GB/s. Zero-copy
frame parsing measured 3.92 ns per frame; payload bandwidth is intentionally
not claimed because the parser only reads the header.

## Verified state

- strict lint passes on macOS, Linux AArch64, Windows x64 and the generic
  freestanding fallback;
- all 57 package tests pass at O0 and O3;
- TCP/UDP loopback bind, non-blocking transition and exact-once close pass on
  macOS;
- Windows and Linux AArch64 code generation preserve the common signatures.

Native Linux/Windows execution of the close/event/cancel/deadline race
matrices remains a production-signoff gate documented in
`lib/std/net/VISION.md`. TCP and UDP structured cancellation and deadlines are
public only through safe `&Context` overloads and preserve the
generation-owned retirement contract.
