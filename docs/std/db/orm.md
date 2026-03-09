# ORM — `Db<T>` Query Builder (`db/orm`)

Vex ships with a powerful GORM-style ORM. All struct-to-column mapping is resolved at **compile time** — zero reflection overhead.

## Defining Models

Use `db:` tags to map struct fields to column names, and `pk:` for primary keys:

```rust
struct User {
    id: i64       `db:"id"   pk:"true"`
    name: string  `db:"name"`
    email: string `db:"email"`
    age: i32      `db:"age"`
}
```

## Basic CRUD

```rust
import { Connection, Db } from "db";

let conn = Connection.sqlite(":memory:");
let! db = Db.of<User>(conn, "users");

// Auto-create table from struct schema
db.autoMigrate();

// Create
db.create(&User { id: 1, name: "Alice", email: "a@b.c", age: 30 });

// Read
let! users = Vec.new<User>();
db.find(&users);  // SELECT * FROM users

// Read with filters
db.filter("age > 18").order("name ASC").limit(10).find(&users);

// Read single
let! user = User { };
db.filter1("id = ?", "1").first(&user);

// Update
db.filter1("id = ?", "1").update("name", "Alice Updated");

// Delete
db.filter1("id = ?", "99").delete();

// Count
let total = db.countRows();
```

## Chainable Query Builder

Every modifier returns `&Db<T>!` for clean chaining:

| Method | SQL Equivalent | Example |
|--------|----------------|---------|
| `.filter(clause)` | `WHERE clause` | `.filter("age > 18")` |
| `.filter1(clause, arg)` | `WHERE clause` (parameterized) | `.filter1("name = ?", "Alice")` |
| `.filter2(clause, a1, a2)` | `WHERE clause` (2 params) | `.filter2("age BETWEEN ? AND ?", "18", "65")` |
| `.order(clause)` | `ORDER BY` | `.order("name ASC")` |
| `.limit(n)` | `LIMIT n` | `.limit(10)` |
| `.offset(n)` | `OFFSET n` | `.offset(20)` |
| `.cols(columns)` | `SELECT columns` | `.cols("id, name")` |
| `.join(clause)` | `JOIN` | `.join("LEFT JOIN profiles ON ...")` |
| `.preload(relation)` | Eager loading | `.preload("posts")` |
| `.group(clause)` | `GROUP BY` | `.group("category")` |
| `.having(clause)` | `HAVING` | `.having("COUNT(id) > 1")` |

## Transactions in ORM

```rust
db.begin();
db.create(&newUser);
db.filter1("id = ?", "1").update("balance", "50");
db.commit();
```

## Legacy Helpers

```rust
import { ormInsert, ormFindById } from "db";

ormInsert<User>(conn, "users", &user);

let! found = User { };
ormFindById<i64, User>(conn, "users", "id", 42, &found);
```
