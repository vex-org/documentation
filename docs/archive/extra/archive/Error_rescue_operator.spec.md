# Error Rescue Operator (`!>`)

**Version:** 0.1.1 **Status:** Approved **Feature:** Error Handling Suffix Operator

## 1. Overview

The **Error Rescue Operator** (`!>`) is a binary suffix operator designed for inline error handling of `Result<T, E>` types. It allows developers to handle `Err` variants using a concise closure syntax or by invoking a handler function directly, without disrupting the visual flow of the "happy path."

It serves as the semantic counterpart to the `??` (Null Coalescing) operator, but specifically for **Errors** rather than **Absence** (Option/Null).

## 2. Syntax

The operator supports two forms on the Right Hand Side (RHS):

### Form A: Inline Block (Closure)

```javascript
expression !> |error_variable| { block }

```

### Form B: Direct Callable (Function/Closure)

```javascript
expression !> handler_function

```

- **LHS (Left Hand Side):** An expression evaluating to `Result<T, E>`.
- **Operator:** `!>`
- **RHS (Right Hand Side):** \* An inline closure definition `|e| { ... }`.
  - A callable expression (function name, closure variable) with signature `fn(E) -> T`.

### Grammar

```javascript
error_handling_expr = expression "!>" ( inline_closure | callable_expression )
inline_closure      = "|" identifier "|" block
callable_expression = identifier | call_expression | ...

```

## 3. Semantics

Given the statement `let value = result_expr !> handler;`

1. **Evaluation:** The LHS `result_expr` is evaluated first.
2. **Success Path (`Ok`):**
   - If the result is `Ok(v)`, the value `v` is unwrapped.
   - The RHS (handler) is **skipped** entirely.
   - `value` becomes `v`.
3. **Failure Path (`Err`):**
   - If the result is `Err(e)`, the RHS is invoked with `e` as the argument.
   - **Inline Block:** The block executes with `e` bound to the capture variable.
   - **Direct Callable:** The function/closure is called as `handler(e)`.
   - **Recovery:** The return value of the handler (must be type `T`) is assigned to `value`.
   - **Early Return:** If the handler executes a `return` statement (or is a diverging function like `panic`), the flow exits the current scope.

## 4. Type Rules

For an expression `L !> R`:

- **LHS Type:** Must be `Result<T, E>`.
- **RHS Type:** Must be a callable `fn(E) -> T` (or `fn(E) -> noreturn`).
  - **Argument:** Must match the error type `E` of the LHS.
  - **Return:** Must match the success type `T` of the LHS (for recovery) OR be `noreturn`.

## 5. Precedence and Associativity

- **Precedence:** Lower than method calls (`.`) and function calls `()`, but higher than assignment (`=`).
- **Associativity:** Left-associative.

## 6. Examples

### Scenario A: Inline Recovery (Default Value)

```javascript
// If parse fails, log the error and use DefaultConfig
let config = read_file(path)?.parse_json() !> |err| {
    log.warn("Config invalid: " + err.msg);
    DefaultConfig // Evaluates to T
};

```

### Scenario B: Direct Function Handler

```javascript
fn handle_db_error(e: DbError): User {
    log.error("DB Error: " + e.msg);
    return User.guest(); // Returns a fallback User
}

// Pass function directly without wrapping in closure
let user = db.find_user(id) !> handle_db_error;

```

### Scenario C: Early Return (Guard)

```javascript
// If database fails, log and exit the function with an error
let user = db.find_user(id) !> |err| {
    return Err(AppError.databaseFail); // Exits parent function
};

```

### Scenario D: Panic/Abort with Function

```javascript
// Using a standard library panic function directly
let texture = load_asset("hero.png") !> panic;
// Assuming panic accepts the error string or implements Display

```

## 7. Rationale

- **Symbology:** The `!` symbol connotes "Alert/Error", and `>` connotes "Forward/Redirect". Together (`!>`), they signify "On Error, redirect flow to...".
- **Conflict Analysis:**
  - Does not conflict with Greater Than (`>`) or Logical NOT (`!`).
  - Does not conflict with Inequality (`!=`).
  - Does not conflict with Math (`<=`).
- **Separation of Concerns:** Distinct from `??` (Null Coalescing):
  - `??` for **Data Absence** (`Option`).
  - `!>` for **Operation Failure** (`Result`).
-
