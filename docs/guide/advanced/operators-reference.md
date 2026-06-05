# Operators -- Complete Reference

This page catalogs every operator in Vex with syntax, semantics, examples, and the contract required for overloading.

## Arithmetic Operators

| Operator       | Syntax  | Contract | Description                                 |
| -------------- | ------- | -------- | ------------------------------------------- |
| Addition       | `a + b` | `$Add`   | Element-wise or numeric addition            |
| Subtraction    | `a - b` | `$Sub`   | Element-wise or numeric subtraction         |
| Multiplication | `a * b` | `$Mul`   | Element-wise or numeric multiplication      |
| Division       | `a / b` | `$Div`   | Element-wise or numeric division            |
| Modulo         | `a % b` | `$Mod`   | Remainder (integers) or element-wise modulo |
| Negation       | `-a`    | `$Neg`   | Unary minus                                 |

```vex
let sum = 10 + 5          // 15
let diff = 10 - 5         // 5
let prod = 10 * 5         // 50
let quot = 10 / 3         // 3 (integer division)
let rem = 10 % 3          // 1
let neg = -42             // -42

// Floating point
let f_div = 10.0 / 3.0    // 3.333...
```

### Compound Assignment

| Operator | Equivalent  |
| -------- | ----------- |
| `a += b` | `a = a + b` |
| `a -= b` | `a = a - b` |
| `a *= b` | `a = a * b` |
| `a /= b` | `a = a / b` |
| `a %= b` | `a = a % b` |

```vex
let! x = 10
x += 5    // x = 15
x -= 3    // x = 12
x *= 2    // x = 24
x /= 4    // x = 6
x %= 4    // x = 2
```

## Bitwise Operators

| Operator    | Syntax   | Contract  | Description                |
| ----------- | -------- | --------- | -------------------------- |
| AND         | `a & b`  | `$BitAnd` | Bitwise AND                |
| OR          | `a \| b` | `$BitOr`  | Bitwise OR                 |
| XOR         | `a ^ b`  | `$BitXor` | Bitwise XOR                |
| NOT         | `~a`     | `$BitNot` | Bitwise complement (unary) |
| Left Shift  | `a << b` | `$Shl`    | Shift left by b bits       |
| Right Shift | `a >> b` | `$Shr`    | Shift right by b bits      |

```vex
let a: u8 = 0b1100_1010
let b: u8 = 0b1010_0110

let and_val = a & b     // 0b1000_0010
let or_val = a | b      // 0b1110_1110
let xor_val = a ^ b     // 0b0110_1100
let not_a = ~a          // 0b0011_0101

let shifted = a << 2    // 0b0010_1000 (left shift)
let right = a >> 3      // 0b0001_1001 (right shift)
```

### Compound Bitwise Assignment

| Operator  | Equivalent   |
| --------- | ------------ |
| `a &= b`  | `a = a & b`  |
| `a \|= b` | `a = a \| b` |
| `a ^= b`  | `a = a ^ b`  |
| `a <<= b` | `a = a << b` |
| `a >>= b` | `a = a >> b` |

## Comparison Operators

| Operator         | Syntax   | Contract | Description                  |
| ---------------- | -------- | -------- | ---------------------------- |
| Equal            | `a == b` | `$Eq`    | Returns true if equal        |
| Not Equal        | `a != b` | `$Eq`    | Returns true if not equal    |
| Less Than        | `a < b`  | `$Ord`   | Returns true if a is less    |
| Greater Than     | `a > b`  | `$Ord`   | Returns true if a is greater |
| Less or Equal    | `a <= b` | `$Ord`   | Returns true if a <= b       |
| Greater or Equal | `a >= b` | `$Ord`   | Returns true if a >= b       |

```vex
let same = (5 == 5)       // true
let diff = (5 != 3)       // true
let less = (3 < 5)        // true
let greater = (10 > 5)    // true
let le = (5 <= 5)         // true
let ge = (10 >= 5)        // true
```

## Logical Operators

| Operator | Syntax     | Contract | Description               |
| -------- | ---------- | -------- | ------------------------- |
| AND      | `a && b`   | —        | Short-circuit logical AND |
| OR       | `a \|\| b` | —        | Short-circuit logical OR  |
| NOT      | `!a`       | `$Not`   | Logical negation          |

```vex
let t = true
let f = false

let and_val = t && f       // false (short-circuit: f not evaluated if t were false)
let or_val = t || f        // true
let not_val = !t           // false

// Short-circuit behavior
let ok = ptr != null_ptr && ptr.read() > 0  // safe: read() only called if ptr is valid
```

## Indexing Operator

| Operator | Syntax | Contract | Description             |
| -------- | ------ | -------- | ----------------------- |
| Index    | `a[i]` | `$Index` | Element access by index |

```vex
let arr = [10, 20, 30]
let second = arr[1]       // 20

let map = Map.new<string, i32>()
map["key"] = 42           // calls op[]
let val = map["key"]      // 42
```

## Range Operators

| Operator        | Syntax  | Description                         |
| --------------- | ------- | ----------------------------------- |
| Exclusive Range | `a..b`  | From a (inclusive) to b (exclusive) |
| Inclusive Range | `a..=b` | From a (inclusive) to b (inclusive) |
| From            | `a..`   | From a to infinity                  |
| To Exclusive    | `..b`   | From start to b (exclusive)         |
| To Inclusive    | `..=b`  | From start to b (inclusive)         |
| Full Range      | `..`    | Everything                          |

```vex
for i in 0..5 { }          // 0, 1, 2, 3, 4
for i in 0..=5 { }         // 0, 1, 2, 3, 4, 5

let slice = data[1..4]     // elements at indices 1, 2, 3
let with_end = data[1..=4] // elements at indices 1, 2, 3, 4
let from_start = data[..3] // elements at indices 0, 1, 2
let to_end = data[2..]     // elements from index 2 to end
```

## Reference and Pointer Operators

| Operator         | Syntax   | Description                                    |
| ---------------- | -------- | ---------------------------------------------- |
| Immutable Borrow | `&expr`  | Creates an immutable reference                 |
| Mutable Borrow   | `&!expr` | Creates a mutable reference                    |
| Dereference      | `*ptr`   | Reads value through a pointer (unsafe context) |

```vex
let x = 42
let ref_x: &i32 = &x          // immutable borrow
let val = *ref_x               // dereference (copy)

let! y = 10
let mut_ref: &i32! = &!y       // mutable borrow
```

## Error Handling Operators

| Operator      | Syntax             | Description                                                                                |
| ------------- | ------------------ | ------------------------------------------------------------------------------------------ |
| Null-coalesce | `expr ?? fallback` | If `expr` is `None`/`Err`, returns `fallback` (eager -- always evaluates right side)       |
| Rescue        | `expr !> fallback` | If `expr` is `None`/`Err`, returns `fallback` (lazy with `\|\|`, error-aware with `\|e\|`) |
| Try           | `expr?`            | Propagates `None`/`Err` from the enclosing function                                        |

### Null-Coalescing Operator (`??`)

Simple, eager fallback. The right side is **always evaluated** regardless of whether the left is `Some`/`Ok`:

```vex
let opt: Option<i32> = None
let val = opt ?? 0                     // 0

let res: Result<i32, string> = Err("fail")
let val = res ?? 42                    // 42

// WARNING: right side always runs!
let val = opt ?? expensiveFunction()   // expensiveFunction() ALWAYS called
```

Use `??` for simple, cheap defaults. For expensive fallbacks, use `!> ||` instead.

### Rescue Operator (`!>`)

The `!>` operator extracts a value from `Option<T>` or `Result<T,E>`, providing a fallback on failure. The error value is passed to the fallback closure when recovering from `Err`.

#### Three Forms

```vex
// 1. Direct value fallback (error DISCARDED):
let val = result !> 0

// 2. Lazy closure, error DISCARDED:
let val = result !> || computeDefault()

// 3. Lazy closure, error PASSED to closure:
let val = result !> |err| {
    $eprintln(f"Recovering from: {err}")
    fallbackFromError(err)
}
```

#### On `Result<T,E>`

```vex
let res: Result<i32, i32> = Err(404)

// Error passed to closure -- |e| receives the 404
let val = res !> |err_code| {
    $println(f"Failed with code: {err_code}")
    err_code  // use error as fallback value
}
// val = 404

// Ok values pass through without calling closure
let ok: Result<i32, i32> = Ok(42)
let val = ok !> |e| {
    $println("Never called")
    0
}
// val = 42, closure not evaluated
```

#### On `Option<T>`

```vex
let opt: Option<i32> = None

// Option uses || form (no error value to pass):
let val = opt !> || {
    $println("Was None, computing default")
    99
}
// val = 99
```

The fallback is **only evaluated when the value is `None`/`Err`**. This is the idiomatic Vex alternative to `.unwrap()` (which does not exist in Vex).

### Try Operator (`?`)

Propagates errors from `Option` or `Result`:

```vex
fn process(): Result<Data, Error> {
    let file = File.open("data.txt")?   // propagates Err
    let parsed = parse(file.readAll()?)?  // propagates Err
    return Ok(parsed)
}
```

## Channel Operators

| Operator | Syntax        | Description                            |
| -------- | ------------- | -------------------------------------- |
| Send     | `ch <- value` | Sends value into channel               |
| Receive  | `<-ch`        | Receives value from channel (blocking) |

```vex
let! ch = Channel.new<i32>(10)

ch <- 42                      // send value
let received = <-ch            // receive value (blocking)

// Select-like pattern with try operations
if let Some(val) = ch.tryRecv() {
    process(val)
}
```

## Ternary Operator

| Operator | Syntax         | Description                       |
| -------- | -------------- | --------------------------------- |
| Ternary  | `cond ? a : b` | Returns a if cond is true, else b |

```vex
let max = a > b ? a : b
let status = code == 200 ? "OK" : "ERROR"

// Nested ternaries (use sparingly for readability)
let category = score >= 90 ? "A" :
               score >= 80 ? "B" :
               score >= 70 ? "C" : "F"
```

## Type Operators

| Operator  | Syntax         | Description                     |
| --------- | -------------- | ------------------------------- |
| Type Cast | `expr as Type` | Safe or unsafe type conversion  |
| Type Test | (not in Vex)   | Use `match` or `if let` instead |

```vex
let x: i32 = 42
let y: f64 = x as f64      // safe: widening cast 42.0
let z: u8 = 300 as u8       // safe: truncating cast (wraps)

let ptr_val: ptr = some_pointer
let addr: i64 = ptr_val as i64  // pointer to integer
```

## SIMD-Specific Operators

These operators work on `Tensor<T, N>`, `Mask<N>`, and fixed-size arrays (auto-promoted to tensors).

### SIMD Arithmetic

| Operator            | Syntax    | Description                                  |
| ------------------- | --------- | -------------------------------------------- |
| Saturating Add      | `a +\| b` | Addition with saturation (clamp on overflow) |
| Saturating Sub      | `a -\| b` | Subtraction with saturation                  |
| Saturating Mul      | `a *\| b` | Multiplication with saturation               |
| Min                 | `a <? b`  | Element-wise minimum                         |
| Max                 | `a >? b`  | Element-wise maximum                         |
| Fused Multiply-Add  | `a *+ b`  | FMA: `a * b + c` in one instruction          |
| Carry-less Multiply | `a *^ b`  | CLMUL (cryptographic)                        |

```vex
let a = [100u8, 200u8, 50u8]
let b = [100u8, 100u8, 200u8]

let sat_add = a +| b     // [200, 255, 250] -- 200+100=300 clamped to 255
let sat_sub = a -| b     // [0, 100, 0]      -- 50-200=0 (clamped)
let min_vals = a <? b    // [100, 100, 50]
let max_vals = a >? b    // [100, 200, 200]
```

### SIMD Rotation

| Operator     | Syntax    | Description                 |
| ------------ | --------- | --------------------------- |
| Rotate Left  | `a <<< b` | Circular left bit rotation  |
| Rotate Right | `a >>> b` | Circular right bit rotation |

```vex
let x: u8 = 0b1000_0001
let rot_left = x <<< 1   // 0b0000_0011 (bit 7 wraps to bit 0)
let rot_right = x >>> 1  // 0b1100_0000 (bit 0 wraps to bit 7)
```

### Horizontal Reductions (Prefix Operators)

Reductions collapse an entire tensor/array to a single scalar value.

| Operator       | Syntax     | Description              |
| -------------- | ---------- | ------------------------ |
| Sum Reduce     | `<+ arr`   | Sum all elements         |
| Product Reduce | `<* arr`   | Multiply all elements    |
| AND Reduce     | `<& arr`   | Bitwise AND all elements |
| OR Reduce      | `<\| arr`  | Bitwise OR all elements  |
| Min Reduce     | `<?\| arr` | Minimum of all elements  |
| Max Reduce     | `>?\| arr` | Maximum of all elements  |

```vex
let arr = [1, 2, 3, 4, 5]

let total = <+ arr       // 15
let product = <* arr     // 120
let all_bits = <& arr    // 0 (1 & 2 & 3 & 4 & 5)
let any_bits = <| arr    // 7
let minimum = <?| arr    // 1
let maximum = >?| arr    // 5
```

### Matrix Operations

| Operator        | Syntax    | Description                  |
| --------------- | --------- | ---------------------------- |
| Matrix Multiply | `A <*> B` | Matrix-matrix multiplication |
| Matrix Power    | `A <^> n` | Matrix exponentiation        |
| Linear Solve    | `A <\> b` | Solve Ax = b                 |

```vex
// 2x2 matrices as [f64; 4]
let A = [1.0, 2.0, 3.0, 4.0]
let B = [5.0, 6.0, 7.0, 8.0]

let C = A <*> B          // matrix multiply
let Apow = A <^> 3       // A * A * A
let x = A <\> [1.0, 2.0] // solve Ax = [1, 2]
```

## Operator Precedence

Operators are listed from highest to lowest precedence:

| Precedence  | Operators                                                          |
| ----------- | ------------------------------------------------------------------ |
| 1 (highest) | `!`, `~`, `-` (unary), `*` (deref), `&` (borrow)                   |
| 2           | `as`                                                               |
| 3           | `*`, `/`, `%`                                                      |
| 4           | `+`, `-`                                                           |
| 5           | `<<`, `>>`, `<<<`, `>>>`                                           |
| 6           | `&` (bitwise)                                                      |
| 7           | `^` (bitwise XOR)                                                  |
| 8           | `\|` (bitwise OR)                                                  |
| 9           | `<?`, `>?`, `+\|`, `-\|`, `*\|`, `*+`, `*^`                        |
| 10          | `<+`, `<*`, `<&`, `<\|`, `<?\|`, `>?\|`, `<*>`, `<^>`, `<\>`       |
| 11          | `==`, `!=`, `<`, `>`, `<=`, `>=`                                   |
| 12          | `&&`                                                               |
| 13          | `\|\|`                                                             |
| 14          | `..`, `..=`                                                        |
| 15          | `? :` (ternary)                                                    |
| 16          | `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `&=`, `\|=`, `^=`, `<<=`, `>>=` |
| 17 (lowest) | `<-` (send), `<-` (receive)                                        |

## Best Practices

1. Use parentheses to clarify precedence in complex expressions, even when you know the rules.
2. Prefer `if`/`else` over nested ternary operators for readability.
3. Use compound assignment operators (`+=`, `*=`, etc.) for concise mutation.
4. For SIMD operations, let the compiler handle vectorization -- write plain array math and Vex does the rest.
5. When overloading operators, ensure the semantics match user expectations (e.g., `+` should be commutative).
6. Implement `$Eq` and `$Ord` as a pair when your type has a natural ordering.
