# Functions and Methods

**Version:** 0.2.0  
**Last Updated:** November 12, 2025

This document defines functions, methods, and related concepts in the Vex programming language.

---

## Table of Contents

1. [Function Declarations](#function-declarations)
2. [Method Definitions](#method-definitions)
3. [Parameters and Arguments](#parameters-and-arguments)
   - [Go-Style Parameter Grouping](#go-style-parameter-grouping) ⭐ NEW
4. [Return Values](#return-values)
5. [Generic Functions](#generic-functions)
6. [Function Overloading](#function-overloading)
7. [Higher-Order Functions](#higher-order-functions)
8. [Special Function Types](#special-function-types)

---

## Function Declarations

### Basic Syntax

**Syntax**: `fn name(parameters): return_type { body }`

```vex
fn add(x: i32, y: i32): i32 {
    return x + y;
}

fn greet(name: string) {
    // No return type = returns nil (unit)
}

fn main(): i32 {
    return 0;  // Entry point
}
```

### Unsafe Functions (`fn!`)

**Status**: ✅ Fully Implemented

**Syntax**: `fn! name(parameters): return_type { body }`

The `fn!` syntax declares an **unsafe function** - a function that performs low-level operations that bypass Vex's safety guarantees. The `!` (bang) after `fn` signals that this function may:

- Perform raw pointer operations
- Call FFI/C functions
- Bypass bounds checking
- Access uninitialized memory

**Examples**:

```vex
// Basic unsafe function
fn! dangerous_divide(x: i32, y: i32): i32 {
    // No runtime check for division by zero
    return x / y;
}

// Unsafe static method
fn! Vec<T>.withCapacity(cap: u64): Vec<T> {
    // Direct memory allocation
    let ptr = @vex_alloc(cap * @sizeof(T));
    return Vec { data: ptr, len: 0, cap: cap };
}

// Unsafe instance method
fn! (self: &Vec<T>) get(index: u64): T {
    // No bounds check - caller must ensure index < len
    return @ptr_read(self.data, index);
}

// Exported unsafe function
export fn! (self: &Box<T>!) drop() {
    @vex_free(self.ptr);
    self.ptr = nil;
}
```

**When to use `fn!`**:

| Use Case                   | Example                            |
| -------------------------- | ---------------------------------- |
| Memory allocation/dealloc  | `Vec.withCapacity()`, `Box.drop()` |
| Raw pointer arithmetic     | `@ptr_read`, `@ptr_write`          |
| FFI/extern calls           | Calling C functions                |
| Unchecked array access     | `vec.get()` without bounds check   |
| Performance-critical paths | Avoiding runtime checks            |

**Calling unsafe functions**:

Unsafe functions can be called from:
1. Other unsafe functions (`fn!`)
2. Unsafe blocks (`unsafe { }`)
3. Regular functions (currently allowed, future: may require explicit opt-in)

```vex
fn safe_wrapper(v: &Vec<i32>, idx: u64): Option<i32> {
    if idx < v.len() {
        // Safe to call unsafe function - we validated the index
        return Some(v.get(idx));
    }
    return None;
}
```

**Parser Implementation**:

The lexer tokenizes `fn!` as two separate tokens: `fn` + `!` (Not).
The parser detects the `!` immediately after `fn` and sets `is_unsafe = true` on the function.

**Components**:

- `fn!` keyword combination (fn followed by !)
- Optional receiver: `(self: &Type)` or `(self: &Type!)`
- Optional static type: `Type<T>.`
- Function name (identifier)
- Parameter list in parentheses
- Optional return type after colon
- Function body in braces

### Simple Functions

**No Parameters**:

```vex
fn hello(): i32 {
    return 42;
}
```

**No Return Value** (returns nil):

```vex
fn print_message() {
    // Implicit return nil
}
```

**Single Expression** (explicit return required):

```vex
fn double(x: i32): i32 {
    return x * 2;
}
```

### Function Naming

**Conventions**:

- `snake_case` for function names
- Descriptive names preferred
- Verbs for actions: `calculate_sum`, `print_result`
- Predicates start with `is_`, `has_`, `can_`: `is_valid`, `has_error`

**Examples**:

```vex
fn calculate_total(items: [i32; 10]): i32 { }
fn is_prime(n: i32): bool { }
fn get_user_name(): string { }
fn validate_input(data: string): bool { }
```

### Entry Point

The `main` function is the program entry point:

```vex
fn main(): i32 {
    return 0;  // Exit code
}
```

**Properties**:

- Must return `i32` (exit code)
- No parameters (command-line args future feature)
- Program execution starts here
- Return 0 for success, non-zero for error

---

## Method Definitions

Vex uses a Go-style syntax for defining methods. Methods are simply functions with a receiver argument.

### External Methods (Go-Style)

**Purpose:** To define behavior for a type clearly and explicitly, separating data from behavior.

- **Definition:** The receiver is specified in parentheses before the function name.
  - `fn (self: &MyType) method_name()`
- **Mutability:** Mutability is indicated by `&Type!` in the receiver.
  - `fn (self: &MyType!) method_name()`
- **Body Access:** Fields are accessed via `self`.
  - `self.field = new_value`
- **Call:** Called using dot notation. The `!` is NOT used at the call site.
  - `object.method_name()`

**Example:**

```vex
struct Rectangle {
    width: i32,
    height: i32,
}

// Immutable method
fn (r: &Rectangle) area(): i32 {
    return r.width * r.height;
}

// Mutable method
fn (r: &Rectangle!) scale(factor: i32) {
    r.width = r.width * factor;
    r.height = r.height * factor;
}

// --- Calls ---
let rect = Rectangle { width: 10, height: 5 };
let a = rect.area();

let! rect_mut = Rectangle { width: 10, height: 5 };
rect_mut.scale(2); // No '!' needed
```

### Deprecated: Inline Methods

_Note: Defining methods inside `struct` blocks is deprecated and will be removed in a future version. Please use the Go-style syntax above._

### Contract Method Implementation

```vex
contract Display {
    show();        // ✅ No 'fn' prefix in contract declarations
    update()!;     // Mutable contract method
}

struct User impl Display {
    name: string,
    age: i32,

    // Contract methods MUST be implemented here (in struct body)
    fn show() {
        (self.name, " - ", self.age);
    }

    fn update()! {
        self.age = self.age + 1;
    }
}
```

**Error**: Contract methods cannot be external

```vex
// ❌ COMPILE ERROR: Contract method cannot be external
fn (u: &User) show() {
    (u.name);
}
```

---

## Parameters and Arguments

### Basic Parameter Syntax

Parameters are declared with a name and type, separated by colon:

```vex
fn add(x: i32, y: i32): i32 {
    return x + y;
}

fn greet(name: string, age: i32) {
    ("Hello ", name, ", age ", age);
}
```

### Go-Style Parameter Grouping

⭐ **NEW in v0.2.0**: Consecutive parameters of the same type can be grouped together.

**Syntax**: `(name1, name2, name3: type)`

```vex
// Traditional syntax (still supported)
fn add(a: i32, b: i32, c: i32): i32 {
    return a + b + c;
}

// Go-style grouping (new!)
fn add(a, b, c: i32): i32 {
    return a + b + c;
}
```

Both syntaxes are equivalent and produce identical AST nodes.

**Multiple Groups**:

```vex
fn process(x, y, z: f64, name, tag: string): void {
    let sum = x + y + z;
    (name, ": ", tag, " = ", sum);
}
```

**Mixed Parameters**:

```vex
fn compute(a, b: i32, factor: f64, c, d: i32): f64 {
    let sum = a + b + c + d;
    return (sum as f64) * factor;
}
```

**In Methods**:

```vex
struct Point {
    x: f64,
    y: f64,

    // Grouping works in methods
    distance_to(x1, y1: f64): f64 {
        let dx = self.x - x1;
        let dy = self.y - y1;
        return sqrt(dx * dx + dy * dy);
    }
}

// Also in external methods
fn (p: &Point!) translate(dx, dy: f64) {
    p.x = p.x + dx;
    p.y = p.y + dy;
}
```

**In Contracts**:

```vex
contract Geometry {
    distance(x1, y1, x2, y2: f64): f64;
    translate(dx, dy: f64)!;
}
```

**Benefits**:

- ✅ Reduces repetition for same-typed parameters
- ✅ Cleaner, more readable function signatures
- ✅ Familiar to Go developers
- ✅ Purely syntactic sugar (no runtime overhead)
- ✅ Optional - traditional syntax still supported

**Implementation Note**: The parser automatically expands grouped parameters to individual `Param` AST nodes during parsing, so the rest of the compiler sees fully expanded parameters.

### Parameter Passing

Vex uses **pass-by-value** semantics by default:

```vex
fn modify(x: i32) {
    x = 10;  // Only modifies local copy
}

let y = 5;
modify(y);
// y is still 5
```

For reference semantics, use pointers or references (see [21_Mutability_and_Pointers.md](21_Mutability_and_Pointers.md)).

### Default Parameter Values

⭐ **NEW in v0.2.0**: Parameters can have default values.

**Syntax**: `parameter: type = default_expression`

```vex
// Simple default value
fn greet(name: string = "World") {
    ("Hello, ", name, "!");
}

// Multiple defaults
fn create_point(x: i32 = 0, y: i32 = 0): Point {
    return Point { x: x, y: y };
}

// Mixed: required and optional parameters
fn add_numbers(a: i32, b: i32 = 10, c: i32 = 20): i32 {
    return a + b + c;
}

// With parameter grouping
fn process(x, y: f64 = 1.0): f64 {
    return x * y;
}
```

**Calling with defaults**:

```vex
// Use all defaults
greet();  // "Hello, World!"

// Override some defaults
create_point(5);  // Point { x: 5, y: 0 }

// Override all
create_point(5, 10);  // Point { x: 5, y: 10 }

// Mixed parameters
add_numbers(1);        // 1 + 10 + 20 = 31
add_numbers(1, 2);     // 1 + 2 + 20 = 23
add_numbers(1, 2, 3);  // 1 + 2 + 3 = 6
```

**Rules**:

- Default values can be any compile-time constant expression
- Parameters with defaults must come after required parameters
- When calling, you can omit trailing parameters with defaults
- You cannot skip a parameter in the middle (no named arguments yet)

**Examples**:

```vex
// ✅ Valid
fn foo(a: i32, b: i32 = 10) { }
fn bar(x: i32, y: i32 = 5, z: i32 = 3) { }

// ❌ Invalid: default before required
fn baz(a: i32 = 10, b: i32) { }  // Compile error

// Calling
foo(1);     // OK: a=1, b=10
foo(1, 2);  // OK: a=1, b=2

bar(1);        // OK: x=1, y=5, z=3
bar(1, 2);     // OK: x=1, y=2, z=3
bar(1, 2, 3);  // OK: x=1, y=2, z=3
```

**Implementation**: The compiler automatically fills in missing arguments with their default expressions during code generation. This is a zero-cost abstraction - no runtime overhead.

### Variadic Parameters

✅ **Fully Implemented in v0.2.0**: Functions can accept variable number of arguments using `Slice<T>`.

**Syntax**: `parameter_name: ...Type`

Variadic parameters are internally converted to `Slice<T>`, giving full access to:
- `slice.len()` - Get count of variadic arguments
- `slice.get(i)` - Access element by index
- `slice.is_empty()` - Check if no arguments passed
- `for item in slice { }` - Iterate over all arguments

```vex
// Sum all variadic arguments
fn sum(numbers: ...i32): i32 {
    let! total = 0;
    for n in numbers {
        total = total + n;
    }
    return total;
}

// Count variadic arguments
fn count(items: ...i32): i32 {
    return items.len();
}

// Get first element or default
fn first_or_default(items: ...i32): i32 {
    if items.is_empty() {
        return -1;
    }
    return items.get(0);
}

// With base parameter
fn sum_with_base(base: i32, nums: ...i32): i32 {
    let! total = base;
    for n in nums {
        total = total + n;
    }
    return total;
}
```

**Calling variadic functions**:

```vex
// Pass multiple arguments
let s = sum(1, 2, 3, 4, 5);  // 15

// No variadic arguments (empty slice)
let empty = sum();  // 0

// With base parameter
let based = sum_with_base(100, 1, 2, 3);  // 106

// Count arguments
let c = count(10, 20, 30, 40);  // 4
```

**Type Coercion**:

Integer literals are automatically coerced to match the variadic element type:

```vex
fn sum_i64(nums: ...i64): i64 {
    let! total: i64 = 0;
    for n in nums {
        total = total + n;
    }
    return total;
}

// Integer literals coerced to i64
let result = sum_i64(1, 2, 3, 4, 5);  // Works! No explicit i64 suffix needed
```

**Rules**:

- ✅ Variadic parameter must be the LAST parameter
- ✅ Only ONE variadic parameter per function
- ✅ Can combine with regular parameters (before variadic)
- ✅ Variadic parameters can accept zero or more arguments
- ✅ Full iteration and indexed access via Slice<T>
- ⚠️ Default params + variadic requires named arguments (not yet supported)

**Supported Types**:

| Type | Support | Notes |
|------|---------|-------|
| `i32`, `i64`, `i8`, `i16` | ✅ Full | Integer types |
| `u32`, `u64`, `u8`, `u16` | ✅ Full | Unsigned integers |
| `f32`, `f64` | ✅ Full | Floating-point |
| `bool` | ✅ Full | Boolean |
| `string` | ✅ Full | String type |
| Custom structs | ✅ Full | User-defined types |
| `any` | ✅ Full | Heterogeneous |

**Examples**:

```vex
// ✅ Valid
fn foo(a: i32, items: ...string) { }
fn bar(x: f64, y: f64, nums: ...i32) { }

// ❌ Invalid: variadic not last
fn baz(items: ...i32, suffix: string) { }  // Compile error

// ❌ Invalid: multiple variadic
fn qux(items1: ...i32, items2: ...string) { }  // Compile error
```

**Implementation Details**:

The compiler transforms variadic functions as follows:

1. **Parser**: `fn sum(nums: ...i32)` → Parameter with `Slice<i32>` type
2. **Call Site**: `sum(1, 2, 3)` → Pack arguments into array, convert to slice
3. **Function Body**: Access via `nums.len()`, `nums.get(i)`, `for n in nums`
4. **Runtime**: Uses `VexSlice` struct `{ data: ptr, len: i64, elem_size: i64 }`

**Slice Methods Available**:

| Method | Signature | Description |
|--------|-----------|-------------|
| `len()` | `(): i64` | Number of variadic arguments |
| `get(i)` | `(i64): T` | Get element at index |
| `is_empty()` | `(): bool` | Check if no arguments |

**For-in Loop Support**:

```vex
fn print_all(items: ...i32) {
    for item in items {
        (item);
        (" ");
    }
    ("\n");
}

print_all(1, 2, 3, 4, 5);  // Prints: 1 2 3 4 5
```

---

## Return Values

Functions can return a single value or multiple values (via tuples).

### Single Return Value

```vex
fn square(x: i32): i32 {
    return x * x;
}
```

### Multiple Return Values

```vex
fn swap(x: i32, y: i32): (i32, i32) {
    return (y, x);
}

let (a, b) = swap(1, 2);
```

### Named Return Values (Future)

```vex
fn divide(dividend, divisor: i32): (quotient, remainder: i32) {
    quotient = dividend / divisor;
    remainder = dividend % divisor;
    return; // Implicitly returns quotient and remainder
}
```

---

## Generic Functions

Functions can be generic over types.

```vex
fn id<T>(x: T): T {
    return x;
}

let s = id<string>("hello");
let n = id(42); // Type inference
```

---

## Function Overloading

Vex does **not** support traditional function overloading (same name, different parameters). Instead, use:

- Default parameters
- Variadic parameters
- Generic functions
- Different names (e.g., `from_string`, `from_int`)

---

## Higher-Order Functions

Functions that take other functions as parameters or return them.

### Closures

Closures are anonymous functions that can capture their environment.

**Syntax**: `|parameters| body`

```vex
let add = |x, y| x + y;
let result = add(1, 2);

// With type annotations
let multiply = |x: i32, y: i32|: i32 {
    return x * y;
};

// No parameters
let greet = || ("Hello");
```

**Capturing**:
Closures capture variables from their scope.

```vex
let factor = 2;
let doubler = |x| x * factor;
```

---

## Special Function Types

### Async Functions

Functions marked with `async` return a `Future<T>`.

```vex
async fn fetch_data(url: string): string {
    // ... network call ...
    return "data";
}

// Calling async function
let future = fetch_data("https://example.com");
let data = await future; // (await syntax future)
```

### Async Blocks

```vex
let future = async {
    let x = do_something();
    x + 1
};
```
