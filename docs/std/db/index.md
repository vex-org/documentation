# `db` — typed database access

`db` provides owning connections, result cursors, reusable prepared statements,
transactions and a compile-time mapped SQL query builder.

## Provider status

| Provider | Public constructor | Current release status |
|---|---|---|
| SQLite | `Connection.sqlite(path)` | locally production-signed synchronous core |
| PostgreSQL | `Connection.postgres(conninfo)` | optional provider; integration matrix pending |
| MySQL/MariaDB | `Connection.mysql(conninfo)` | optional provider; integration matrix pending |
| Redis | `Connection.redis(conninfo)` | optional provider; integration matrix pending |
| MongoDB | `Connection.mongo(conninfo)` | optional provider; integration matrix pending |

The default native artifact contains SQLite. An unavailable provider returns
`DbErrorKind.Unsupported`; it never silently falls back to another database.

## Quick start

```vex
import { Connection } from "db";

let connection = match Connection.sqlite(":memory:") {
    Result.Ok(value) => value,
    Result.Err(err) => $panic(err.message()),
};

match connection.exec("CREATE TABLE users (id INTEGER, name TEXT)") {
    Result.Ok(_) => { /* ready */ }
    Result.Err(err) => $panic(err.message()),
}

let! rows = match connection.query("SELECT id, name FROM users ORDER BY id") {
    Result.Ok(value) => value,
    Result.Err(err) => $panic(err.message()),
};
while match rows.next() { Result.Ok(value) => value, Result.Err(err) => $panic(err.message()) } {
    match rows.text(1 as usize) {
        Result.Ok(Some(name)) => $println(name),
        Result.Ok(None) => $println("NULL"),
        Result.Err(err) => $panic(err.message()),
    }
}
```

Connections and results use RAII. No `close()` or `free()` call is required.

## Hot-loop performance

Prepare repeated SQL once. A `PreparedStatement` reuses the provider plan,
parameter scratch storage and native result container:

```vex
import { Connection, DbValue } from "db";

let statement = match connection.prepare("SELECT ? + 1") {
    Result.Ok(value) => value,
    Result.Err(err) => $panic(err.message()),
};
let! params = Vec.new<DbValue>();
params.push(DbValue.I64(41 as i64));
let result = statement.queryParams(&params);
```

On the 2026-08-18 M2 Max O3 baseline, prepared select + typed i64 decode is
about 244 ns versus 625 ns for one-shot prepare/query/finalize. Prepared update
is about 387 ns versus 1.35 us for the one-shot parameterized path.

## Safety model

- SQL values use `DbValue`; raw fragments are explicit.
- SQLite accepts exactly one statement per call.
- `NULL`, empty text and empty bytes remain distinct.
- A cursor owns its connection lifetime.
- A prepared cursor also owns its statement lifetime and prevents concurrent
  reuse of the same native plan.
- Text/bytes returned publicly are owning values. Provider row buffers do not
  escape.

See [Connection and prepared statements](./connection.md) and
[compile-time ORM](./orm.md).
