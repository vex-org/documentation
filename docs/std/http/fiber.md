# Fiber Framework (`http/fiber`)

Inspired by Express on Node.js and the infamous **Fiber v3** on Go, Vex's `http/fiber` takes complete control of the web server loop to bring routing rules, parameters, wildcards, and middleware chaining—all inside a beautifully familiar API.

The entire `http/fiber` module relies on the zero-copy infrastructure of `http`, meaning it offers massive throughput without compromising on easy developer syntax.

## Building Applications

Apps are created, routes are mapped, and middlewares are configured dynamically onto memory tables during setup.

```rust
import { App, Ctx } from "http/fiber";
import { logger, cors } from "http/middleware";

fn main(): i32 {
    let! app = App.new();

    // Attach middlewares
    app.use(logger);
    app.use(cors);

    // Register Routes
    app.get("/", fn(c: &Ctx!) {
        c.sendString("Go Vex!");
    });

    app.post("/users", fn(c: &Ctx!) {
        let body = c.body();
        // Validation / Storage
        c.status(201).sendString("Created: " + body);
    });

    // Start
    app.listen("0.0.0.0", 3000);
    return 0;
}
```

## Routing Engine

Instead of pulling heavy Regex dependencies, Vex Fiber relies on ultra-fast segment-based string matching:

### URL Parameters `:param`

Dynamic parts of the URL are easily accessible via the `Ctx: params` API.

```rust
app.get("/users/:id", fn(c: &Ctx!) {
    let id = c.params("id");  // Given /users/142 -> 142
    
    // Automatically stringifies back to JSON
    c.sendJSON("{\"id\": \"" + id + "\"}");
});
```

### Wildcards `*wildcard`

Match all subsequent path requests. Highly useful for catching static directory matches.

```rust
app.get("/files/*filepath", fn(c: &Ctx!) {
    let path = c.params("filepath");
    c.sendString("Serving file: " + path);
});
```

## Context (`Ctx`) Methods

The `Ctx` object abstracts away all socket buffer writes, headers, and status code manipulation beautifully. 

### Request Properties

- `c.method()`: Request HTTP method (`GET`, `POST`)
- `c.path()`: URL path.
- `c.params(key)`: Path router variable
- `c.query(key)`: URL Query mapping (`?search=foo`)
- `c.header(key)`: Reads header case-insensitively
- `c.body()`: The request payload string
- `c.isJSON()` / `c.contentType()`

### Response Modifiers

- `c.status(200)`: Set Status (Returns Context, chainable)
- `c.set("Authorization", "Bearer ABC")`: Append Header
- `c.type("application/json")`: Override Content-Type
- **Sending Output**:
    - `c.sendString("Text")`
    - `c.sendJSON("{\"success\":true}")`
    - `c.sendHTML("<h1>Welcome</h1>")`
    - `c.send()`: Flush manual body bytes.
    - `c.sendStatus(400)`: Throw an immediate HTTP Code 
    - `c.redirect("/login")`: HTTP 302 Redirection
