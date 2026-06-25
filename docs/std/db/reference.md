# Project v0.0.0

## Overview

**Structs:** [`Connection`](#Connection) · [`QueryResult`](#QueryResult) · [`Db`](#Db)

**Functions:** [`cstrToString`](#cstrToString) · [`dbWritePtr`](#dbWritePtr) · [`dbWriteI32`](#dbWriteI32) · [`scanRow`](#scanRow) · [`executePreloads`](#executePreloads) · [`buildColumnList`](#buildColumnList) · [`buildInsertSQL`](#buildInsertSQL) · [`buildSelectSQL`](#buildSelectSQL) · [`buildCountSQL`](#buildCountSQL) · [`buildUpdateSQL`](#buildUpdateSQL) · [`buildDeleteSQL`](#buildDeleteSQL) · [`buildCreateTableSQL`](#buildCreateTableSQL) · [`get_dialect_type`](#get_dialect_type) · [`orm_vec_meta`](#orm_vec_meta) · [`orm_append_copy`](#orm_append_copy) · [`ormInsert`](#ormInsert) · [`ormFindById`](#ormFindById)

**Constants:** [`SQLITE`](#SQLITE) · [`POSTGRES`](#POSTGRES) · [`MYSQL`](#MYSQL) · [`REDIS`](#REDIS) · [`MONGO`](#MONGO)

## Constants

### <a id="SQLITE"></a>`SQLITE` `🔓 export`

&gt; 📄 `lib.vx` L26-26

```vex
export const SQLITE: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="POSTGRES"></a>`POSTGRES` `🔓 export`

&gt; 📄 `lib.vx` L27-27

```vex
export const POSTGRES: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="MYSQL"></a>`MYSQL` `🔓 export`

&gt; 📄 `lib.vx` L28-28

```vex
export const MYSQL: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="REDIS"></a>`REDIS` `🔓 export`

&gt; 📄 `lib.vx` L29-29

```vex
export const REDIS: i32=3;
```

**Returns:** `i32=3;`

---

### <a id="MONGO"></a>`MONGO` `🔓 export`

&gt; 📄 `lib.vx` L30-30

```vex
export const MONGO: i32=4;
```

**Returns:** `i32=4;`

---

## Structs

### <a id="Connection"></a>`Connection` `🔓 export`

&gt; 📄 `lib.vx` L83-87

```vex
export struct Connection
```

Connection - Database connection handle.

Automatically closes the database connection when dropped (Drop).

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handle` | `ptr` | 🔓 public |  |
| `driver` | `i32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Connection.sqlite`[↗](#Connection.sqlite) | `export fn Connection.sqlite(path: string): Connect` | Connect to a SQLite database at the specified file path. |
| `Connection.postgres`[↗](#Connection.postgres) | `export fn Connection.postgres(conninfo: string): C` | Connect to a PostgreSQL database using the specified connection info string. |
| `Connection.mysql`[↗](#Connection.mysql) | `export fn Connection.mysql(conninfo: string): Conn` | Connect to a MySQL database using the specified connection info string. |
| `Connection.redis`[↗](#Connection.redis) | `export fn Connection.redis(conninfo: string): Conn` | Connect to a Redis instance using the specified connection info string. |
| `Connection.open`[↗](#Connection.open) | `export fn Connection.open(driver: i32, conninfo: s` | Connect to a generic database driver using the driver ID and connection info string. |
| `ok`[↗](#Connection.ok) | `export fn (self: &Connection) ok(): bool` |  |
| `errMsg`[↗](#Connection.errMsg) | `export fn (self: &Connection) errMsg(): string` |  |
| `exec`[↗](#Connection.exec) | `export fn (self: &Connection) exec(sql: string): i` |  |
| `query`[↗](#Connection.query) | `export fn (self: &Connection) query(sql: string): ` |  |
| `execWithParams`[↗](#Connection.execWithParams) | `export fn (self: &Connection) execWithParams(sql: ` |  |
| `queryWithParams`[↗](#Connection.queryWithParams) | `export fn (self: &Connection) queryWithParams(sql:` |  |
| `queryValue`[↗](#Connection.queryValue) | `export fn (self: &Connection) queryValue(sql: stri` |  |
| `execOk`[↗](#Connection.execOk) | `export fn (self: &Connection) execOk(sql: string):` |  |
| `begin`[↗](#Connection.begin) | `export fn (self: &Connection) begin(): bool` |  |
| `commit`[↗](#Connection.commit) | `export fn (self: &Connection) commit(): bool` |  |
| `rollback`[↗](#Connection.rollback) | `export fn (self: &Connection) rollback(): bool` |  |
| `close`[↗](#Connection.close) | `export fn (self: &Connection!) close()` |  |
| `drop`[↗](#Connection.drop) | `export fn (self: &Connection!) drop()` |  |

---

### <a id="QueryResult"></a>`QueryResult` `🔓 export`

&gt; 📄 `lib.vx` L272-275

```vex
export struct QueryResult
```

QueryResult - Iterable database result set.

Automatically frees the result set handle when dropped (Drop).

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `result` | `ptr` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ok`[↗](#QueryResult.ok) | `export fn (self: &QueryResult) ok(): bool` |  |
| `errMsg`[↗](#QueryResult.errMsg) | `export fn (self: &QueryResult) errMsg(): string` |  |
| `rowsAffected`[↗](#QueryResult.rowsAffected) | `export fn (self: &QueryResult) rowsAffected(): i64` |  |
| `columnCount`[↗](#QueryResult.columnCount) | `export fn (self: &QueryResult) columnCount(): i32` |  |
| `columnName`[↗](#QueryResult.columnName) | `export fn (self: &QueryResult) columnName(col: i32` |  |
| `next`[↗](#QueryResult.next) | `export fn (self: &QueryResult) next(): bool` |  |
| `text`[↗](#QueryResult.text) | `export fn (self: &QueryResult) text(col: i32): str` |  |
| `isNull`[↗](#QueryResult.isNull) | `export fn (self: &QueryResult) isNull(col: i32): b` |  |
| `length`[↗](#QueryResult.length) | `export fn (self: &QueryResult) length(col: i32): u` |  |
| `free`[↗](#QueryResult.free) | `export fn (self: &QueryResult!) free()` |  |
| `drop`[↗](#QueryResult.drop) | `export fn (self: &QueryResult!) drop()` |  |

---

### <a id="Db"></a>`Db` `🔓 export`

&gt; 📄 `orm.vx` L38-55

```vex
export struct Db<T>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `db_handle` | `ptr` | 🔓 public |  |
| `db_driver` | `i32` | 🔓 public |  |
| `table_name` | `string` | 🔓 public |  |
| `where_clauses` | `Vec&lt;string&gt;` | 🔓 public |  |
| `where_args` | `Vec&lt;string&gt;` | 🔓 public |  |
| `order_clause` | `string` | 🔓 public |  |
| `limit_val` | `i64` | 🔓 public |  |
| `offset_val` | `i64` | 🔓 public |  |
| `select_cols` | `string` | 🔓 public |  |
| `joins` | `Vec&lt;string&gt;` | 🔓 public |  |
| `preloads` | `Vec&lt;string&gt;` | 🔓 public |  |
| `group_clause` | `string` | 🔓 public |  |
| `having_clauses` | `Vec&lt;string&gt;` | 🔓 public |  |

**Type Parameters:**

- `T`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Db.of`[↗](#Db.of) | `export fn Db.of(conn: Connection, table: string): ` |  |

---

## Functions

### <a id="cstrToString"></a>`cstrToString`

&gt; 📄 `lib.vx` L65-71

```vex
fn cstrToString(raw: ptr): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `ptr` |  |

**Returns:** `string`

---

### <a id="dbWritePtr"></a>`dbWritePtr`

&gt; 📄 `lib.vx` L73-75

```vex
fn dbWritePtr(p: Ptr<ptr>, i: usize, v: ptr)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;ptr&gt;` |  |
| `i` | `usize` |  |
| `v` | `ptr` |  |

---

### <a id="dbWriteI32"></a>`dbWriteI32`

&gt; 📄 `lib.vx` L77-79

```vex
fn dbWriteI32(p: Ptr<i32>, i: usize, v: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;i32&gt;` |  |
| `i` | `usize` |  |
| `v` | `i32` |  |

---

### <a id="scanRow"></a>`scanRow` `🔓 export`

&gt; 📄 `scanner.vx` L15-53

```vex
export fn scanRow(rs: &QueryResult, out: &T!)
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `rs` | `&QueryResult` |  |
| `out` | `&T!` |  |

---

### <a id="executePreloads"></a>`executePreloads` `🔓 export`

&gt; 📄 `scanner.vx` L58-102

```vex
export fn executePreloads(conn: Connection, out: &Vec<T>!, preloads: &Vec<string>)
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `conn` | `Connection` |  |
| `out` | `&Vec&lt;T&gt;!` |  |
| `preloads` | `&Vec&lt;string&gt;` |  |

---

### <a id="buildColumnList"></a>`buildColumnList` `🔓 export`

&gt; 📄 `query.vx` L18-26

```vex
export fn buildColumnList(): string
```

**Type Parameters:**

- `T`

**Returns:** `string`

---

### <a id="buildInsertSQL"></a>`buildInsertSQL` `🔓 export`

&gt; 📄 `query.vx` L29-57

```vex
export fn buildInsertSQL(table: string, value: &T, out_params: &Vec<string>!): string
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `table` | `string` |  |
| `value` | `&T` |  |
| `out_params` | `&Vec&lt;string&gt;!` |  |

**Returns:** `string`

---

### <a id="buildSelectSQL"></a>`buildSelectSQL` `🔓 export`

&gt; 📄 `query.vx` L60-162

```vex
export fn buildSelectSQL(table: string, select_cols: string, wheres: &Vec<string>, where_args: &Vec<string>, joins: &Vec<string>, group_clause: string, havings: &Vec<string>, order: string, limit_val: i64, offset_val: i64, out_params: &Vec<string>!): string
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `table` | `string` |  |
| `select_cols` | `string` |  |
| `wheres` | `&Vec&lt;string&gt;` |  |
| `where_args` | `&Vec&lt;string&gt;` |  |
| `joins` | `&Vec&lt;string&gt;` |  |
| `group_clause` | `string` |  |
| `havings` | `&Vec&lt;string&gt;` |  |
| `order` | `string` |  |
| `limit_val` | `i64` |  |
| `offset_val` | `i64` |  |
| `out_params` | `&Vec&lt;string&gt;!` |  |

**Returns:** `string`

---

### <a id="buildCountSQL"></a>`buildCountSQL` `🔓 export`

&gt; 📄 `query.vx` L166-218

```vex
export fn buildCountSQL(table: string, wheres: &Vec<string>, where_args: &Vec<string>, joins: &Vec<string>, group_clause: string, havings: &Vec<string>, out_params: &Vec<string>!): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `table` | `string` |  |
| `wheres` | `&Vec&lt;string&gt;` |  |
| `where_args` | `&Vec&lt;string&gt;` |  |
| `joins` | `&Vec&lt;string&gt;` |  |
| `group_clause` | `string` |  |
| `havings` | `&Vec&lt;string&gt;` |  |
| `out_params` | `&Vec&lt;string&gt;!` |  |

**Returns:** `string`

---

### <a id="buildUpdateSQL"></a>`buildUpdateSQL` `🔓 export`

&gt; 📄 `query.vx` L221-247

```vex
export fn buildUpdateSQL(table: string, field: string, value: &string, wheres: &Vec<string>, where_args: &Vec<string>, out_params: &Vec<string>!): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `table` | `string` |  |
| `field` | `string` |  |
| `value` | `&string` |  |
| `wheres` | `&Vec&lt;string&gt;` |  |
| `where_args` | `&Vec&lt;string&gt;` |  |
| `out_params` | `&Vec&lt;string&gt;!` |  |

**Returns:** `string`

---

### <a id="buildDeleteSQL"></a>`buildDeleteSQL` `🔓 export`

&gt; 📄 `query.vx` L250-274

```vex
export fn buildDeleteSQL(table: string, wheres: &Vec<string>, where_args: &Vec<string>, out_params: &Vec<string>!): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `table` | `string` |  |
| `wheres` | `&Vec&lt;string&gt;` |  |
| `where_args` | `&Vec&lt;string&gt;` |  |
| `out_params` | `&Vec&lt;string&gt;!` |  |

**Returns:** `string`

---

### <a id="buildCreateTableSQL"></a>`buildCreateTableSQL` `🔓 export`

&gt; 📄 `query.vx` L278-293

```vex
export fn buildCreateTableSQL(table: string, driver_id: i32): string
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `table` | `string` |  |
| `driver_id` | `i32` |  |

**Returns:** `string`

---

### <a id="get_dialect_type"></a>`get_dialect_type` `🔓 export`

&gt; 📄 `dialect.vx` L4-44

```vex
export fn get_dialect_type(driver: i32, vex_type: string, is_pk: bool): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `driver` | `i32` |  |
| `vex_type` | `string` |  |
| `is_pk` | `bool` |  |

**Returns:** `string`

---

### <a id="orm_vec_meta"></a>`orm_vec_meta`

&gt; 📄 `orm.vx` L84-86

```vex
fn orm_vec_meta(out: &Vec<T>!): RawBuf
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&Vec&lt;T&gt;!` |  |

**Returns:** `RawBuf`

---

### <a id="orm_append_copy"></a>`orm_append_copy`

&gt; 📄 `orm.vx` L88-97

```vex
fn orm_append_copy(out: &Vec<T>!, value: &T)
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&Vec&lt;T&gt;!` |  |
| `value` | `&T` |  |

---

### <a id="ormInsert"></a>`ormInsert` `🔓 export`

&gt; 📄 `orm.vx` L330-333

```vex
export fn ormInsert(conn: Connection, table: string, value: &T): bool
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `conn` | `Connection` |  |
| `table` | `string` |  |
| `value` | `&T` |  |

**Returns:** `bool`

---

### <a id="ormFindById"></a>`ormFindById` `🔓 export`

&gt; 📄 `orm.vx` L336-353

```vex
export fn ormFindById(conn: Connection, table: string, pk_col: string, pk_value: K, out: &T!): bool
```

**Type Parameters:**

- `K`
- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `conn` | `Connection` |  |
| `table` | `string` |  |
| `pk_col` | `string` |  |
| `pk_value` | `K` |  |
| `out` | `&T!` |  |

**Returns:** `bool`

---

---

*Generated by vex-doc v2.0 • 2026-07-06*
