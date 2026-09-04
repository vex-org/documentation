# Compile-time SQL mapping with `Db<T>`

`Db<T>` maps documented model fields at compile time. There is no runtime field
reflection. The current ORM is intentionally a strict SQL core, not a facade
that claims joins, relation loading or schema diffing before they exist.

## Models

```vex
struct User {
    public:
    id: i64 `db:"id" pk:"true"`
    name: string `db:"name"`
    email: Option<string> `db:"email"`
    age: i32 `db:"age"`
    active: bool `db:"active"`
    score: f64 `db:"score"`
}
```

Supported mapped fields are `string`, `bool`, `i32`, `u32`, `i64`, `f32`,
`f64` and `Option` of those types. Fields tagged `rel` are excluded from the
flat row/schema mapping.

## Construction and migration

```vex
let! users = match Db.of<User>(&connection, "users") {
    Result.Ok(value) => value,
    Result.Err(err) => $panic(err.message()),
};
match users.autoMigrate() {
    Result.Ok(_) => { /* CREATE TABLE IF NOT EXISTS completed */ }
    Result.Err(err) => $panic(err.message()),
}
```

`Db.of` accepts only safe unquoted table identifiers and SQL-capable drivers.
`autoMigrate` creates a missing table; it is not a schema-diff engine.

## Querying

```vex
let! args = Vec.new<DbValue>();
args.push(DbValue.I64(18 as i64));
args.push(DbValue.Bool(true));
match users.filterRaw("age >= ? AND active = ?", &args) {
    Result.Ok(_) => { /* bound */ }
    Result.Err(err) => $panic(err.message()),
}
match users.orderBy("name", false) {
    Result.Ok(_) => { /* ascending */ }
    Result.Err(err) => $panic(err.message()),
}
users.limit(100 as usize).offset(20 as usize);

let! output = Vec.new<User>();
match users.find(&output!) {
    Result.Ok(appended) => $println(appended),
    Result.Err(err) => $panic(err.message()),
}
```

Available operations:

| API | Behavior |
|---|---|
| `filterRaw(clause, arguments)` | Explicit SQL predicate plus typed values |
| `filter1Raw(clause, argument)` | One typed predicate value |
| `orderBy(column, descending)` | Validated identifier ordering |
| `limit(n)` / `offset(n)` | Driver-correct pagination |
| `find(out)` | Append decoded rows |
| `first(out)` | Decode at most one row |
| `countRows()` | Native typed count decode |
| `create(value)` | Parameterized insert |
| `update(field, value)` | Parameterized update |
| `delete()` | Scoped delete |
| `allRows()` | Explicitly authorize an unfiltered update/delete |
| `beginTransaction()` | Begin through the owned connection |

`filterRaw` is named raw because the clause is developer SQL. Values must still
travel separately as `DbValue`. Update/delete without a predicate fail unless
`allRows()` is called explicitly.

## Deliberate boundaries

Relation loading, joins, groups, schema diffs, hooks and a hidden global prepared
cache are not current APIs. They remain future work and are not emulated through
stringly typed placeholders.
