# Connection & Queries (`db`)

The `db` module provides database driver bindings. Both `Connection` and `QueryResult` implement the `Drop` contract, guaranteeing that database handles are safely closed and query result set handles are freed when they go out of scope.

## `Connection` — Database Handle

| Method | Description |
|--------|-------------|
| `Connection.sqlite(path)` | Connect to SQLite database |
| `Connection.postgres(conninfo)` | Connect to PostgreSQL |
| `Connection.mysql(conninfo)` | Connect to MySQL |
| `Connection.redis(conninfo)` | Connect to Redis |
| `Connection.open(driver, conninfo)` | Generic driver connection |
| `.ok(): bool` | Check if connection succeeded |
| `.errMsg(): string` | Get error message |
| `.exec(sql): i64` | Execute statement, return rows affected |
| `.query(sql): QueryResult` | Execute query, return result set |
| `.execWithParams(sql, params)` | Parameterized execute |
| `.queryWithParams(sql, params)` | Parameterized query |
| `.queryValue(sql): string` | Get single value (auto-frees result) |
| `.execOk(sql): bool` | Execute and return success/failure |
| `.begin(): bool` | Start transaction |
| `.commit(): bool` | Commit transaction |
| `.rollback(): bool` | Rollback transaction |
| `.close()` | Close connection (optional, as `Drop` closes it automatically) |

## `QueryResult` — Result Set

| Method | Description |
|--------|-------------|
| `.ok(): bool` | Check if query succeeded |
| `.errMsg(): string` | Get error message |
| `.rowsAffected(): i64` | Number of affected rows |
| `.columnCount(): i32` | Number of columns |
| `.columnName(col): string` | Get column name by index |
| `.next(): bool` | Advance to next row |
| `.text(col): string` | Get column value as string |
| `.isNull(col): bool` | Check if column is NULL |
| `.length(col): u64` | Get column data length |
| `.free()` | Free result set (optional, as `Drop` frees it automatically) |

## Standard Resource Management (Drop)

Connections and query results do not require manual resource closing/freeing when scoped:

```vex
import { Connection, QueryResult } from "std/db";

fn runQuery() {
    let conn = Connection.sqlite(":memory:");
    if !conn.ok() { return; }
    
    // SQLite connection is automatically closed when `conn` goes out of scope.
    
    let rs = conn.query("SELECT name FROM users");
    while rs.next() {
        let name = rs.text(0);
        $println(name);
    }
    // rs (QueryResult) is automatically freed when leaving the function.
}
```

## Transactions

```rust
conn.begin();
conn.exec("INSERT INTO orders VALUES (1, 'pending')");
conn.exec("UPDATE inventory SET stock = stock - 1 WHERE id = 42");
if success {
    conn.commit();
} else {
    conn.rollback();
}
```

## Parameterized Queries

```rust
let! params = Vec.new<string>();
params.push("Alice");
params.push("30");

let rows = conn.execWithParams(
    "INSERT INTO users (name, age) VALUES ($1, $2)", &params
);
```

