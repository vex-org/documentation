# Error Handling

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

Vex treats errors as values using the `Result` and `Option` types, avoiding exceptions in favor of explicit control flow.

---

## 1. The Result & Option Types

These are Built-in Core Types (optimized by compiler).

```vex
enum Result<T, E> {
    Ok(T),
    Err(E),
}

enum Option<T> {
    Some(T),
    None,
}
```

---

## 2. Propagation Operator (`?`)

The `?` operator unwraps `Ok/Some` or returns `Err/None` early.

```vex
fn read_config(path: string): Result<Config, Error> {
    let file = File.open(path)?; // Returns Err if fails
    let content = file.read_all()?;
    return parse_json(content); // Returns Result directly
}
```

---

## 3. Error Rescue Operator (`!>`)

(Unique to Vex)
Inline error handling for "happy path" coding.

```vex
// If risky() fails, execute closure/expression
let val = risky_op() !> |err| {
    log_error(err);
    return default_value;
};

// Simple Fallback
let config = load_config() !> default_config();
```

> [!TIP]
> Use `!>` when you want to handle an error immediately without `match` verbosity, especially for defaults or logging.

---

## 4. Panics

For unrecoverable errors (bugs), use `()`.

```vex
if pointer.is_null() {
    ("Null pointer in core logic");
}
```

---

## 5. Custom Errors

Implement the `Error` contract.

```vex
contract Error {
    fn message(self): string;
}

struct MyError { msg: string }
impl Error for MyError {
    fn message(self): string { return self.msg; }
}
```
