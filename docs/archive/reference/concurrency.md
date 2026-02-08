# Concurrency

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

Vex provides a hybrid concurrency model combining Go-style CSP (Communicating Sequential Processes) with Rust-style Async/Await.

---

## 1. Goroutines (`go`)

Lightweight threads of execution.

```vex
fn worker(id: i32) {
    ("Worker ", id);
}

fn main() {
    go worker(1);
    go worker(2);
}
```

- **Keyword**: `go`
- **Semantics**: Spawns a lightweight task managed by the runtime scheduler.
- **Implementation**: `TypedStatementKind::Go` in AST.

---

## 2. Channels

Typed conduits for signaling and data transfer.

```vex
let ch: Channel<i32> = Channel.new(); // Unbuffered
go {
    ch.send(42);
};
let msg = ch.recv(); // 42
```

- **Type**: `Channel<T>` (Built-in)
- **Operations**: `send(val)`, `recv()` (blocking), `close()`.

---

## 3. Select Statement

Multiplex operations on multiple channels.

```vex
select {
    case msg1 = ch1.recv() => {
        ("Received from ch1:", msg1);
    }
    case ch2.send(10) => {
        ("Sent 10 to ch2");
    }
    default => {
        ("No activity");
    }
}
```

---

## 4. Async / Await

Future-based concurrency for I/O operations.

```vex
async fn fetch_data(): string {
    return "data";
}

async fn main() {
    let result = await fetch_data();
}
```

- **Type**: `Future<T>` (Built-in).
- **Semantics**: Functions marked `async` return a `Future`. `await` suspends execution until the future resolves.

---

## 5. Defer Statement

Ensure cleanup actions run when execution leaves the scope (useful for unlocking mutexes or closing channels).

```vex
fn process() {
    let f = File.open("log.txt");
    defer f.close();

    f.write("Works!");
} // f.close() runs here
```

> [!NOTE]
> `defer` is particularly useful in checking that channels are closed or locks are released in concurrent code.
