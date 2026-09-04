# Connections, statements and results

## `Connection`

Every constructor returns `Result<Connection, DbError>`.

| API | Purpose |
|---|---|
| `Connection.sqlite(path)` | Open SQLite |
| `Connection.postgres(conninfo)` | Open optional PostgreSQL provider |
| `Connection.mysql(conninfo)` | Open optional MySQL provider |
| `Connection.redis(conninfo)` | Open optional Redis provider |
| `Connection.mongo(conninfo)` | Open optional MongoDB provider |
| `Connection.open(driver, conninfo)` | Typed generic constructor |
| `exec(sql)` | One-shot statement, returning affected rows |
| `execParams(sql, params)` | One-shot typed parameter statement |
| `query(sql)` | One-shot result cursor |
| `queryParams(sql, params)` | One-shot typed parameter cursor |
| `queryValue(sql)` | First column as owning `Option<string>` |
| `prepare(sql)` | Reusable provider plan |
| `beginTransaction()` | RAII transaction guard |

`DbCapabilities` exposes only callable public features: `sql()`,
`preparedStatements()`, `binaryParams()` and `transactions()`.

## Typed parameters

`DbValue` variants are `Null`, `Bool`, `I64`, `F64`, `Text`, `Bytes` and
`Json`. Payload lengths are exact; embedded NUL bytes in text parameters are
preserved because the native ABI receives an explicit length.

```vex
let! params = Vec.new<DbValue>();
params.push(DbValue.Text("Ada".toString()));
params.push(DbValue.I64(37 as i64));

match connection.execParams(
    "INSERT INTO users (name, age) VALUES (?, ?)",
    &params,
) {
    Result.Ok(rows) => $println(rows),
    Result.Err(err) => $panic(err.message()),
}
```

## `PreparedStatement`

Prepared statements are cloneable shared owners. Clones refer to the same
native plan. Exactly one `QueryResult` may be active; re-entry returns
`DbErrorKind.InvalidState` instead of racing or allocating a second hidden plan.

| API | Purpose |
|---|---|
| `parameterCount()` | Exact placeholder count |
| `query()` | Zero-parameter query |
| `queryParams(params)` | Typed reusable query |
| `exec()` | Zero-parameter execution |
| `execParams(params)` | Typed reusable execution |

Drop the active result before reusing the statement. The result retains both
the statement and connection, so returning a cursor from a helper is safe.

## `QueryResult`

| API | Return |
|---|---|
| `next()` | `Result<bool, DbError>` |
| `rowsAffected()` | `i64` |
| `columnCount()` | `usize` |
| `columnName(index)` | `Result<string, DbError>` |
| `columnType(index)` | `Result<DbColumnType, DbError>` |
| `isNull(index)` | `Result<bool, DbError>` |
| `length(index)` | `Result<usize, DbError>` |
| `text(index)` | `Result<Option<string>, DbError>` |
| `bytes(index)` | `Result<Option<Vec<u8>>, DbError>` |
| `getI64/getF64/getBool(index)` | typed optional scalar |

Reading a column before `next()` or outside its bounds returns a typed error.
Typed SQLite scalars use native readers; textual providers fall back to
allocation-free Vex parsing. Public text and byte results are owning copies.

## Transactions

```vex
let! transaction = match connection.beginTransaction() {
    Result.Ok(value) => value,
    Result.Err(err) => $panic(err.message()),
};

// Execute through transaction.connection().
match transaction.commit() {
    Result.Ok(_) => { /* committed */ }
    Result.Err(err) => $panic(err.message()),
}
```

An active transaction rolls back on drop. A committed or rolled-back guard
rejects a second finish operation.

