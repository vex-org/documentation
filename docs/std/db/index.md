# db — Overview

The `db` module provides database connectors, high-level connection management, and a GORM-style ORM for Vex.

## Supported Databases

| Driver | Constant | Usage |
|--------|----------|-------|
| **SQLite** | `SQLITE` | `Connection.sqlite(":memory:")` |
| **PostgreSQL** | `POSTGRES` | `Connection.postgres("host=... dbname=...")` |
| **MySQL** | `MYSQL` | `Connection.mysql("user:pass@tcp(host)/db")` |
| **Redis** | `REDIS` | `Connection.redis("localhost:6379")` |
| **MongoDB** | `MONGO` | `Connection.open(MONGO, connstring)` |

## Quick Start

```rust
import { Connection, QueryResult } from "db";

let conn = Connection.sqlite(":memory:");
if !conn.ok() { println(conn.errMsg()); return; }

conn.exec("CREATE TABLE users (id INTEGER, name TEXT)");
conn.exec("INSERT INTO users VALUES (1, 'Alice')");

let count = conn.queryValue("SELECT COUNT(*) FROM users");  // "1"

let rs = conn.query("SELECT id, name FROM users");
while rs.next() {
    println("{rs.text(0)}: {rs.text(1)}");
}
rs.free();
conn.close();
```

## Module Structure

| Component | Description |
|-----------|-------------|
| `lib.vx` | Connection, QueryResult, FFI bindings |
| `orm/orm.vx` | `Db<T>` generic query builder |
| `orm/query.vx` | SQL generation (SELECT, INSERT, UPDATE, DELETE) |
| `orm/scanner.vx` | Row → Struct mapping |
