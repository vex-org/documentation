# `db` API reference

This page lists the current public source surface. All fallible operations use
`Result`; nullable columns use `Option` inside that result.

## Enums

### `DbDriver`

`Sqlite`, `Postgres`, `Mysql`, `Redis`, `Mongo`.

### `DbErrorKind`

`Connect`, `Execution`, `NotFound`, `InvalidParameter`, `Unsupported`, `Decode`,
`Closed`, `InvalidState`, `OutOfMemory`, `Unknown`.

### `DbValue`

`Null`, `Bool(bool)`, `I64(i64)`, `F64(f64)`, `Text(string)`, `Bytes(Vec<u8>)`,
`Json(string)`.

### `DbColumnType`

`Null`, `Bool`, `I64`, `F64`, `Text`, `Bytes`, `Json`, `Unknown`.

## `DbError`

- `DbError.new(kind, message)`
- `kind()` / `isKind(kind)`
- `message()` / `messageView()`
- `toString()` / `debug()`
- `clone()`

## `DbCapabilities`

- `sql()`
- `preparedStatements()`
- `binaryParams()`
- `transactions()`

## `Connection`

- constructors: `sqlite`, `postgres`, `mysql`, `redis`, `mongo`, `open`
- metadata: `driver`, `capabilities`
- one-shot operations: `exec`, `execParams`, `query`, `queryParams`, `queryValue`
- reusable operation: `prepare`
- transaction: `beginTransaction`
- `clone`

## `PreparedStatement`

- `parameterCount()`
- `query()` / `queryParams(params)`
- `exec()` / `execParams(params)`
- `clone()`

## `QueryResult`

- `rowsAffected()`
- `columnCount()` / `columnName(index)` / `columnType(index)`
- `next()`
- `isNull(index)` / `length(index)`
- `text(index)` / `bytes(index)`
- `getI64(index)` / `getF64(index)` / `getBool(index)`

## `Transaction`

- `isActive()`
- `connection()`
- `commit()` / `rollback()`

An active transaction rolls back on drop.

## `Db<T>`

- `Db.of<T>(connection, table)`
- `filterRaw`, `filter1Raw`, `orderBy`, `limit`, `offset`, `allRows`
- `find`, `first`, `countRows`
- `create`, `update`, `delete`, `autoMigrate`
- `beginTransaction`

See the dedicated ORM guide for supported field types and safety rules.
