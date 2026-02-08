# Automatic Differentiation (Autograd)

Vex provides **built-in automatic differentiation** for machine learning, physics simulations, and scientific computing. No external libraries needed!

::: tip What is Autograd?
Autograd automatically computes gradients (derivatives) of your functions. This is essential for:
- Training neural networks (backpropagation)
- Physics simulations (sensitivity analysis)
- Optimization problems (gradient descent)
:::

## The `@{ }` Block

The autograd block `@{ ... }` creates a **differentiable scope**. Inside this scope, operations on "parameters" are tracked to compute gradients.

```vex
fn main(): i32 {
    let x = 3.0
    
    // Autograd block - computes value AND gradient
    let result = @{
        let p = $param(x)      // Mark x as a parameter
        p * p + 2.0 * p + 1.0  // f(x) = x² + 2x + 1
    }
    
    // Extract results
    let value = $val(result)    // f(3) = 9 + 6 + 1 = 16
    let gradient = $grad(result) // f'(x) = 2x + 2, f'(3) = 8
    
    $println(f"f(3) = {value}")      // 16.0
    $println(f"f'(3) = {gradient}")  // 8.0
    
    return 0
}
```

## Autograd Intrinsics

| Intrinsic | Description |
|-----------|-------------|
| `$param(x)` | Mark variable `x` as a tracked parameter |
| `$val(res)` | Extract the computed value (primal) |
| `$grad(res)` | Extract the gradient (derivative) |
| `$detach(x)` | Stop gradient tracking (for inference) |

## Supported Operations

### Arithmetic Operations

All basic arithmetic is autograd-aware:

```vex
let result = @{
    let x = $param(a)
    let y = $param(b)
    
    x + y      // ∂/∂x = 1, ∂/∂y = 1
    x - y      // ∂/∂x = 1, ∂/∂y = -1
    x * y      // ∂/∂x = y, ∂/∂y = x
    x / y      // ∂/∂x = 1/y, ∂/∂y = -x/y²
    x ^ n      // ∂/∂x = n·x^(n-1) (power rule)
}
```

### Math Functions

Built-in math functions support automatic differentiation:

```vex
let trig_result = @{
    let x = $param(angle)
    $sin(x)    // ∂/∂x = cos(x)
}

let exp_result = @{
    let x = $param(val)
    $exp(x)    // ∂/∂x = exp(x)
}

let log_result = @{
    let x = $param(val)
    $log(x)    // ∂/∂x = 1/x
}

let sqrt_result = @{
    let x = $param(val)
    $sqrt(x)   // ∂/∂x = 1/(2√x)
}

let pow_result = @{
    let x = $param(base)
    $pow(x, 3.0)  // ∂/∂x = 3x²
}
```

### Complete Example: Trigonometric Derivatives

```vex
fn main(): i32 {
    let x = 3.0
    
    // g(x) = sin(x)
    // g'(x) = cos(x)
    let trig_res = @{
        let p = $param(x)
        $sin(p)
    }
    
    $println(f"sin({x}) = {$val(trig_res)}")    // ~0.14112
    $println(f"cos({x}) = {$grad(trig_res)}")   // ~-0.98999
    
    return 0
}
```

### Advanced Math Example

```vex
fn main(): i32 {
    let x = 3.0
    
    // f(x) = √x + log(x) + exp(x)
    // f'(x) = 1/(2√x) + 1/x + exp(x)
    let result = @{
        let p = $param(x)
        $sqrt(p) + $log(p) + $exp(p)
    }
    
    // At x = 3:
    // val ≈ 1.732 + 1.099 + 20.086 ≈ 22.916
    // grad ≈ 0.289 + 0.333 + 20.086 ≈ 20.707
    $println(f"f(3) = {$val(result)}")
    $println(f"f'(3) = {$grad(result)}")
    
    return 0
}
```

## How It Works

Vex implements **Forward-Mode Automatic Differentiation** using **Dual Numbers**.

### Dual Numbers

Each tracked value becomes a dual number: $v + \varepsilon d$ where:
- $v$ is the primal value
- $d$ is the derivative (tangent)
- $\varepsilon^2 = 0$ (infinitesimal)

### Chain Rule

Operations automatically propagate derivatives using the chain rule:

$$\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)$$

### Compiler Optimization

The Vex compiler (SIR) can:
- Fuse autograd operations with computation loops
- Eliminate memory overhead of computation graphs
- Generate optimized gradient code at compile time

## Machine Learning Example

### Linear Regression

```vex
fn train_step(x: f64, y_true: f64, w: f64, b: f64, lr: f64): (f64, f64) {
    // Forward pass with gradient tracking
    let loss_result = @{
        let weight = $param(w)
        let bias = $param(b)
        
        // Prediction: y = wx + b
        let y_pred = weight * x + bias
        
        // MSE Loss: (y_pred - y_true)²
        let loss = (y_pred - y_true) * (y_pred - y_true)
        loss
    }
    
    let loss = $val(loss_result)
    let grad_w = $grad(loss_result)  // ∂loss/∂w
    let grad_b = $grad(loss_result)  // ∂loss/∂b (second param)
    
    // Gradient descent update
    let new_w = w - lr * grad_w
    let new_b = b - lr * grad_b
    
    return (new_w, new_b)
}
```

### Neural Network Layer

```vex
fn linear_layer(input: [f64], weights: [[f64]], bias: [f64]): @Dual {
    @{
        let w = $param(weights)
        let b = $param(bias)
        
        // Matrix multiplication + bias
        (input <*> w) + b
    }
}

fn relu(x: @Dual): @Dual {
    @{
        let p = $param(x)
        if $val(p) > 0.0 { p } else { 0.0 }
    }
}
```

## Stopping Gradients

Use `$detach` to stop gradient propagation:

```vex
fn inference(x: f64, w: f64): f64 {
    // During inference, we don't need gradients
    let result = @{
        let weight = $detach(w)  // No gradient tracking
        let input = $param(x)
        input * weight
    }
    return $val(result)
}
```

## Comparison with Other Languages

| Feature | Vex | PyTorch | JAX | Julia |
|---------|-----|---------|-----|-------|
| Syntax | `@{ $param(x) }` | `requires_grad=True` | `grad(fn)` | `gradient(fn)` |
| Mode | Forward | Reverse | Both | Both |
| Built-in | ✅ | Library | Library | Library |
| Compile-time | ✅ | ❌ | ✅ (JIT) | ✅ (JIT) |

## Best Practices

1. **Mark only needed parameters** - Don't `$param` constants
2. **Use `$detach` for inference** - Saves computation
3. **Keep autograd blocks focused** - One computation per block
4. **Extract gradients immediately** - Before the result goes out of scope

```vex
// ✅ Good: Clear, focused autograd block
let result = @{
    let w = $param(weights)
    compute_loss(input, w, target)
}
let grad = $grad(result)

// ❌ Avoid: Too much in one block
let result = @{
    let w = $param(weights)
    let preprocessed = preprocess(input)  // Could be outside
    let normalized = normalize(preprocessed)  // Could be outside
    compute_loss(normalized, w, target)
}
```

## Next Steps

- [GPU Computing](/guide/gpu/) - GPU-accelerated autograd
- [SIMD](/guide/simd/) - Vectorized operations
- [Comptime](/guide/advanced/comptime) - Compile-time computation

# Builtin Functions

Vex provides a set of builtin functions and intrinsics that are always available without explicit imports. 

## Core IO

```vex
// Variadic printing
println("Hello", "World", 42)
print("No", "newline")
```

## Guard and Assertions

```vex
// Runtime assertion
assert(x > 0)

// Mark unreachable paths (panics in debug, UB in release)
unreachable()

// Placeholder for missing implementation
todo("implement this")
```

## Memory & Type Info

Intrinsics starting with `#` are evaluated at compile time.

```vex
let size = #sizeof<i64>()       // 8
let align = #alignof<f64>()     // 8
let name = #typename<i32>()     // "i32"
```

## Compile-Time Strings

```vex
// Concatenation
let msg = #concat("Hello, ", name)

// Inclusion
let config = #includeStr("config.json")
let data = #includeBytes("image.png")
```

## Explicit Drop

Vex handles memory automatically (RAII), but you can manually trigger cleanup:

```vex
$drop(resource)
```

## Best Practices

1. **Prefer RAII**: Trust the compiler's automatic cleanup instead of manual `$drop`.
2. **Use `todo()` during development**: Keeps the compiler happy while you outline logic.
3. **Leverage `#sizeof` for FFI**: Always use it when interfacing with C to ensure portable layouts.

## Next Steps

- [Comptime](/guide/advanced/comptime) - Full compile-time reflection
- [Unsafe](/guide/advanced/unsafe) - Low-level low-level operations
- [FFI](/guide/ffi) - Interfacing with other languages
# Compile-Time Evaluation

Vex provides powerful compile-time evaluation capabilities through **comptime intrinsics**. These are evaluated during compilation, producing zero runtime overhead.

## Overview

Comptime intrinsics in Vex start with the `$` prefix and are evaluated at compile time. They enable:

- **Type introspection** - Query type properties
- **Reflection** - Inspect struct/enum fields and variants
- **Compile-time arithmetic** - Evaluate constants
- **Conditional compilation** - Type-based code generation

## Type Introspection

### Size and Alignment

```vex
// Get size of a type in bytes
let size = #sizeof<i64>()     // 8
let size = $sizeOf<MyStruct>()  // Struct size

// Get alignment of a type
let align = #alignof<f64>()   // 8
let align = $alignOf<Vec<i32>>()  // Pointer alignment
```

### Type Name

```vex
// Get type name as string
let name = #typeName<i32>()           // "i32"
let name = #typename<Vec<string>>()   // "Vec<string>"
```

## Type Predicates

Query type characteristics at compile time:

```vex
// Check type categories
#isStruct<MyStruct>()      // true
#isEnum<Option<T>>()       // true
#isPrimitive<i32>()        // true

// Numeric type checks
#isInteger<i64>()          // true
#isFloat<f32>()            // true
#isSigned<i32>()           // true (vs unsigned)

// Compound types
#isPointer<*i32>()         // true
#isArray<[i32; 4]>()       // true
#isTuple<(i32, string)>()  // true
$isSlice<Slice<i32>>()     // true

// Special types
$isOption<Option<i32>>()   // true
$isResult<Result<T, E>>()  // true
#isReference<&T>()         // true
#isFunction<fn(i32): i32>() // true
#isGeneric<T>()            // true for type params

// Contract checks
#isCopy<i32>()             // true
#needsDrop<Vec<i32>>()     // true
```

## Struct Reflection

Inspect struct fields at compile time:

```vex
struct User {
    id: i64 `json:"user_id" db:"primary_key"`,
    name: string `json:"name"`,
    active: bool
}

// Field count
let count = #fieldCount<User>()    // 3

// Field names (comma-separated string)
let names = #fieldNames<User>()    // "id,name,active"

// Check if field exists
let has = #hasField<User>("id")    // true
let has = #hasField<User>("email") // false

// Get field type name
let ty = #fieldType<User>("id")    // "i64"
let ty = #fieldType<User>("name")  // "string"

// Get field offset in bytes
let off = #offsetOf<User>("name")  // Offset of name field

// Field tags (Go-style backtick metadata)
let tag = #fieldTag<User>("id", "json")     // "user_id"
let tag = #fieldTag<User>("id", "db")       // "primary_key"
let has = #hasFieldTag<User>("id", "json")  // true
let tags = #fieldTags<User>("id")           // "json:user_id,db:primary_key"
```

## Enum Reflection

Inspect enum variants:

```vex
enum Status {
    Active,
    Pending,
    Closed(string)
}

// Variant count
let count = #variantCount<Status>()     // 3

// Variant names
let names = #variantNames<Status>()     // "Active,Pending,Closed"

// Check variant existence
let has = #hasVariant<Status>("Active") // true

// Get variant discriminant
let disc = #variantDiscriminant<Status>("Pending")  // 1

// Check if variant has payload
let has = #variantHasPayload<Status>("Closed")  // true
let has = #variantHasPayload<Status>("Active")  // false

// Get variant payload type
let payload = #variantPayload<Status>("Closed")  // "string"
```

## Type Comparison

```vex
// Check if two types are the same
#sameType<i32, i32>()              // true
#sameType<i32, i64>()              // false
#sameType<Vec<i32>, Vec<i32>>()    // true

// Check if type implements a contract
#implements<MyStruct, Display>()   // true/false
```

## Compile-Time Arithmetic

Evaluate arithmetic at compile time:

```vex
// Power
let val = #constPow(2, 10)    // 1024

// Min/Max
let min = #constMin(5, 3)     // 3
let max = #constMax(5, 3)     // 5
let min = $min(a, b)          // shorthand

// Clamp
let val = #constClamp(15, 0, 10)  // 10
let val = $clamp(x, lo, hi)       // shorthand

// Absolute value
let abs = #constAbs(-42)      // 42
let abs = $abs(x)             // shorthand

// Logarithm (base 2)
let log = #constLog2(256)     // 8
let log = $log2(n)            // shorthand

// Square root (integer)
let sqrt = #constSqrt(144)    // 12

// GCD/LCM
let gcd = #constGcd(12, 8)    // 4
let gcd = $gcd(a, b)          // shorthand
let lcm = #constLcm(4, 6)     // 12
let lcm = $lcm(a, b)          // shorthand
```

## Bit Operations

```vex
// Check if power of 2
#isPowerOf2(16)       // true
#isPowerOfTwo(15)     // false

// Next power of 2
#nextPowerOf2(5)      // 8
#nextPow2(100)        // 128

// Bit count (popcount)
#bitCount(0b1010101)  // 4
#popcount(255)        // 8

// Leading/trailing zeros
#leadingZeros(16)     // depends on bit width
#clz(0x80)            // count leading zeros
#trailingZeros(16)    // 4
#ctz(0x80)            // count trailing zeros
```

## Default Values

```vex
// Create default value for type
let val = #default<i32>()        // 0
let val = #default<string>()     // ""
let val = #default<Vec<i32>>()   // empty vec

// Check if type has default
#hasDefault<i32>()               // true

// Create zeroed value (all bits zero)
let val = #zeroed<MyStruct>()    // All fields zeroed
```

## Compile-Time Evaluation

```vex
// Force compile-time evaluation
let val = #constEval(2 + 2)           // 4 at compile time
let val = #eval(some_const_expr)      // Evaluate expression
```

## Debug Intrinsics

```vex
// Print type info during compilation
#debugType<MyComplexType>()  // Prints type info to stderr
```

## Compile-Time Diagnostics

```vex
// Static assertion (fails compilation if false)
#staticAssert(#sizeof<i32>() == 4, "i32 must be 4 bytes")
#staticAssert(#hasField<User>("id"), "User must have id field")

// Emit compile error
#compileError("This code path should not be reached")

// Emit compile warning
#warning("This API is deprecated")
```

## Practical Examples

### Type-Safe Serialization

```vex
fn to_json<T>(obj: &T): string {
    let! result = "{"
    let! first = true
    
    $for field in #fieldNames<T>().split(",") {
        let json_key = #fieldTag<T>(field, "json")
        
        if json_key != "" {
            if !first { result = result + ", " }
            first = false
            
            let value = $fieldGet(obj, field)
            result = result + "\"" + json_key + "\": "
            
            $if #fieldType<T>(field) == "string" {
                result = result + "\"" + value + "\""
            }
            $if #fieldType<T>(field) == "i32" {
                result = result + #stringify(value)
            }
        }
    }
    
    return result + "}"
}
```

### Generic Buffer with Alignment

```vex
struct AlignedBuffer<T> {
    data: *T,
    len: i64
}

fn new_buffer<T>(count: i64): AlignedBuffer<T> {
    let size = #sizeof<T>() * count
    let align = #alignof<T>()
    
    #staticAssert(#isPrimitive<T>() || #isCopy<T>(), 
                  "Buffer only supports Copy types")
    
    return AlignedBuffer {
        data: aligned_alloc(align, size),
        len: count
    }
}
```

### Enum Visitor Pattern

```vex
fn visit_all<E, F>(visitor: F) {
    let variants = #variantNames<E>()
    
    $for name in variants.split(",") {
        $if #variantHasPayload<E>(name) {
            // Skip variants with payloads
            continue
        }
        
        let disc = #variantDiscriminant<E>(name)
        visitor(name, disc)
    }
}
```

## Best Practices

1. **Use for type safety** - Validate assumptions at compile time
2. **Zero overhead** - All intrinsics evaluate at compile time
3. **Static assertions** - Catch errors early with `#staticAssert`
4. **Avoid runtime reflection** - Prefer comptime intrinsics
5. **Document constraints** - Use `#compileError` for clear messages

## Related Topics

- [Generics](/guide/types/generics) - Generic programming
- [Contracts](/guide/types/contracts) - Type constraints
- [Builtins](/guide/advanced/builtins) - Runtime intrinsics
# Methods and Constructors

Vex supports instance methods, static methods (constructors), and method chaining with a clean, Go-inspired syntax.

## Method Syntax Overview

Vex has two primary method levels:

1. **Instance methods**: `fn (self: &T) method()` - Associated with an instance.
2. **Static methods**: `fn T.method()` - Associated with the type name.

## Instance Methods

Instance methods take `self` as the first parameter with an explicit type:

```vex
struct Counter {
    value: i32,
}

// Immutable receiver: read-only access
fn (self: &Counter) get(): i32 {
    return self.value
}

// Mutable receiver: allows modification
fn (self: &Counter!) increment() {
    self.value = self.value + 1
}

// By-value receiver: takes ownership
fn (self: Counter) into_value(): i32 {
    return self.value
}
```

## Static Methods (Constructors)

Static methods use `Type.method` syntax and are commonly used as constructors:

```vex
struct Point {
    x: f64,
    y: f64,
}

// Constructor: Point.new()
fn Point.new(x: f64, y: f64): Point {
    return Point { x, y }
}

// Specific constructor: Point.origin()
fn Point.origin(): Point {
    return Point { x: 0.0, y: 0.0 }
}
```

## Generic Methods

Methods can be generic over one or more types:

```vex
struct Box<T> {
    value: T,
}

fn Box.new<T>(val: T): Box<T> {
    return Box { value: val }
}

fn (self: &Box<T>) get(): &T {
    return &self.value
}
```

## Method Chaining (Fluent API)

Methods can be chained when they return `Self` or the receiver type:

```vex
struct Builder {
    count: i32,
}

fn (self: Builder) add(n: i32): Builder {
    return Builder { count: self.count + n }
}

let result = Builder { count: 0 }.add(1).add(10).count // 11
```

## Methods with Contracts

Methods are the primary way to implement contract behavior:

```vex
contract Display {
    toString(): string;
}

struct Point impl Display {
    x: f64, y: f64
}

fn (self: &Point) toString(): string {
    return f"({self.x}, {self.y})"
}
```

## Extension Methods

Vex allows adding methods to existing types, including primitives:

```vex
// Extend string with a custom method
fn (self: &string) excited(): string {
    return self + "!!!"
}

println("Hello".excited()) // "Hello!!!"
```

## Best Practices

1. **Use `Type.new` for primary constructors**: Follow the standard library convention.
2. **Prefer references (`&self`)**: Unless you explicitly need to consume the object.
3. **Use `&self!` for mutation**: Make it clear when a method modifies internal state.
4. **Separate logic from data**: Group methods separately from the struct definition for better modularity.

## Next Steps

- [Structs](/guide/types/structs) - Defining data structures
- [Contracts](/guide/types/contracts) - Defining shared behavior
- [Generics](/guide/types/generics) - Generic methods and types
# Operator Overloading

Vex supports operator overloading through **contracts** and **operator methods**. This allows custom types to use natural operators like `+`, `-`, `*`, `==`, and `[]`.

## Overview

Operator overloading in Vex uses a contract-based system:

1. **Define or use a contract** with an operator method
2. **Implement the contract** on your struct
3. **Use the operator** naturally in code

```vex
// 1. Contract defines the operator
contract Add {
    op+(other: Self): Self;
}

// 2. Struct implements the contract
struct Point:Add {
    x: i32,
    y: i32,
    
    fn op+(other: Point): Point {
        Point { x: self.x + other.x, y: self.y + other.y }
    }
}

// 3. Use the operator
fn main(): i32 {
    let p1 = Point { x: 1, y: 2 }
    let p2 = Point { x: 3, y: 4 }
    let p3 = p1 + p2  // Calls op+
    return 0
}
```

## Standard Operator Contracts

Vex provides built-in contracts for all operators. They use the `$` prefix.

### Arithmetic Operators

| Operator | Contract | Method | Example |
|----------|----------|--------|---------|
| `a + b` | `$Add` | `op+(rhs: Self): Self` | Addition |
| `a - b` | `$Sub` | `op-(rhs: Self): Self` | Subtraction |
| `a * b` | `$Mul` | `op*(rhs: Self): Self` | Multiplication |
| `a / b` | `$Div` | `op/(rhs: Self): Self` | Division |
| `a % b` | `$Mod` | `op%(rhs: Self): Self` | Modulo |
| `-a` | `$Neg` | `op-(): Self` | Negation |

```vex
struct Vec2:$Add, $Sub, $Neg {
    x: f64,
    y: f64,
    
    fn op+(other: Vec2): Vec2 {
        Vec2 { x: self.x + other.x, y: self.y + other.y }
    }
    
    fn op-(other: Vec2): Vec2 {
        Vec2 { x: self.x - other.x, y: self.y - other.y }
    }
    
    fn op-(): Vec2 {
        Vec2 { x: -self.x, y: -self.y }
    }
}

let v = Vec2 { x: 1.0, y: 2.0 }
let neg = -v  // Vec2 { x: -1.0, y: -2.0 }
```

### Comparison Operators

| Operator | Contract | Method | Example |
|----------|----------|--------|---------|
| `a == b` | `$Eq` | `op==(rhs: Self): bool` | Equality |
| `a != b` | `$Eq` | `op!=(rhs: Self): bool` | Inequality |
| `a < b` | `$Ord` | `op<(rhs: Self): bool` | Less than |
| `a <= b` | `$Ord` | `op<=(rhs: Self): bool` | Less or equal |
| `a > b` | `$Ord` | `op>(rhs: Self): bool` | Greater than |
| `a >= b` | `$Ord` | `op>=(rhs: Self): bool` | Greater or equal |

```vex
struct Version:$Eq, $Ord {
    major: i32,
    minor: i32,
    
    fn op==(other: Version): bool {
        self.major == other.major && self.minor == other.minor
    }
    
    fn op!=(other: Version): bool {
        !(self == other)
    }
    
    fn op<(other: Version): bool {
        if self.major != other.major {
            return self.major < other.major
        }
        self.minor < other.minor
    }
    
    fn op<=(other: Version): bool { self < other || self == other }
    fn op>(other: Version): bool { !(self <= other) }
    fn op>=(other: Version): bool { !(self < other) }
}
```

### Bitwise Operators

| Operator | Contract | Method | Example |
|----------|----------|--------|---------|
| `a & b` | `$BitAnd` | `op&(rhs: Self): Self` | AND |
| `a \| b` | `$BitOr` | `op\|(rhs: Self): Self` | OR |
| `a ^ b` | `$BitXor` | `op^(rhs: Self): Self` | XOR |
| `~a` | `$BitNot` | `op~(): Self` | NOT |
| `a << n` | `$Shl` | `op<<(rhs: i32): Self` | Left shift |
| `a >> n` | `$Shr` | `op>>(rhs: i32): Self` | Right shift |

```vex
struct Flags:$BitOr, $BitAnd {
    value: u32,
    
    fn op|(other: Flags): Flags {
        Flags { value: self.value | other.value }
    }
    
    fn op&(other: Flags): Flags {
        Flags { value: self.value & other.value }
    }
}

const READ = Flags { value: 1 }
const WRITE = Flags { value: 2 }
let perms = READ | WRITE  // Flags { value: 3 }
```

### Index Operators

| Operator | Contract | Method | Example |
|----------|----------|--------|---------|
| `a[i]` | `$Index` | `op[](index: Idx): Output` | Read access |
| `a[i] = v` | `$IndexMut` | `op[]=(index: Idx, value: Val)` | Write access |
| `a[i..j]` | `$Slice` | `op[..](start, end): Output` | Slice read |

```vex
struct Matrix:$Index, $IndexMut {
    type Output = f64;
    data: Vec<f64>,
    cols: i64,
    
    fn op[](index: i64): f64 {
        self.data.get(index)
    }
    
    fn op[]=(index: i64, value: f64) {
        // Set value at index
    }
}

let m = Matrix { ... }
let val = m[5]     // Calls op[]
m[5] = 3.14        // Calls op[]=
```

### Compound Assignment

| Operator | Contract | Method |
|----------|----------|--------|
| `a += b` | `$AddAssign` | `op+=(rhs: Self)` |
| `a -= b` | `$SubAssign` | `op-=(rhs: Self)` |
| `a *= b` | `$MulAssign` | `op*=(rhs: Self)` |
| `a /= b` | `$DivAssign` | `op/=(rhs: Self)` |
| `a %= b` | `$ModAssign` | `op%=(rhs: Self)` |
| `a &= b` | `$BitAndAssign` | `op&=(rhs: Self)` |
| `a \|= b` | `$BitOrAssign` | `op\|=(rhs: Self)` |
| `a ^= b` | `$BitXorAssign` | `op^=(rhs: Self)` |
| `a <<= n` | `$ShlAssign` | `op<<=(rhs: i32)` |
| `a >>= n` | `$ShrAssign` | `op>>=(rhs: i32)` |

```vex
struct Counter:$AddAssign {
    value: i32,
    
    fn op+=(amount: Counter) {
        self.value = self.value + amount.value
    }
}

let! c = Counter { value: 10 }
c += Counter { value: 5 }  // c.value is now 15
```

### Advanced Operators

| Operator | Contract | Method | Example |
|----------|----------|--------|---------|
| `a ** b` | `$Pow` | `op**(exp: i32): Self` | Power |
| `++a` | `$PreInc` | `op++(): Self` | Pre-increment |
| `a++` | `$PostInc` | `op++(): Self` | Post-increment |
| `--a` | `$PreDec` | `op--(): Self` | Pre-decrement |
| `a--` | `$PostDec` | `op--(): Self` | Post-decrement |
| `a..b` | `$Range` | `op..(end): Range<Self>` | Range |
| `a..=b` | `$RangeInclusive` | `op..=(end): RangeInclusive<Self>` | Inclusive range |
| `a ?? b` | `$NullCoalesce` | `op??(fallback): Self` | Null coalesce |

## External Operator Methods

You can also define operators outside the struct using **method syntax**:

```vex
struct Vector2 {
    x: f64,
    y: f64,
}

// External operator method
fn (self: Vector2) op+(other: Vector2): Vector2 {
    Vector2 {
        x: self.x + other.x,
        y: self.y + other.y,
    }
}

// Works the same
let v1 = Vector2 { x: 1.0, y: 2.0 }
let v2 = Vector2 { x: 3.0, y: 4.0 }
let v3 = v1 + v2
```

## Custom Contracts

Define your own contracts for domain-specific operators:

```vex
// Custom scalar multiplication contract
contract ScalarMul {
    mul_scalar(scalar: f64): Self;
}

struct Vec3:ScalarMul {
    x: f64,
    y: f64,
    z: f64,
    
    fn mul_scalar(scalar: f64): Vec3 {
        Vec3 {
            x: self.x * scalar,
            y: self.y * scalar,
            z: self.z * scalar,
        }
    }
}

let v = Vec3 { x: 1.0, y: 2.0, z: 3.0 }
let scaled = v.mul_scalar(2.5)
```

## Implementing Multiple Contracts

A single struct can implement multiple operator contracts:

```vex
struct Complex:$Add, $Sub, $Mul, $Eq, $Display {
    real: f64,
    imag: f64,
    
    fn op+(other: Complex): Complex {
        Complex { real: self.real + other.real, imag: self.imag + other.imag }
    }
    
    fn op-(other: Complex): Complex {
        Complex { real: self.real - other.real, imag: self.imag - other.imag }
    }
    
    fn op*(other: Complex): Complex {
        // (a + bi)(c + di) = (ac - bd) + (ad + bc)i
        Complex {
            real: self.real * other.real - self.imag * other.imag,
            imag: self.real * other.imag + self.imag * other.real,
        }
    }
    
    fn op==(other: Complex): bool {
        self.real == other.real && self.imag == other.imag
    }
    
    fn op!=(other: Complex): bool {
        !(self == other)
    }
    
    fn display(): string {
        // Format as "a + bi"
        return "Complex"
    }
}
```

## Non-Overloadable Operators

The following operators **cannot** be overloaded:

| Operator | Reason |
|----------|--------|
| `&&` | Short-circuit evaluation |
| `\|\|` | Short-circuit evaluation |
| `=` | Assignment semantics |
| `.` | Member access |
| `?.` | Optional chaining |

## Best Practices

1. **Follow semantics** - `op+` should behave like addition
2. **Implement related operators** - If `op==`, also implement `op!=`
3. **Return Self** - Arithmetic operators should return `Self` type
4. **Don't surprise** - Operators should be intuitive for users
5. **Use contracts** - They provide compile-time checking

## Example: Matrix Type

```vex
struct Matrix:$Add, $Mul, $Index, $Eq {
    type Output = f64;
    data: Vec<f64>,
    rows: i64,
    cols: i64,
    
    fn op+(other: Matrix): Matrix {
        $assert(self.rows == other.rows && self.cols == other.cols)
        let! result = Vec.with_capacity<f64>(self.data.len())
        for i in 0..self.data.len() {
            result.push(self.data.get(i) + other.data.get(i))
        }
        Matrix { data: result, rows: self.rows, cols: self.cols }
    }
    
    fn op*(other: Matrix): Matrix {
        $assert(self.cols == other.rows)
        // Matrix multiplication implementation
        // ...
    }
    
    fn op[](index: i64): f64 {
        self.data.get(index)
    }
    
    fn op==(other: Matrix): bool {
        if self.rows != other.rows || self.cols != other.cols {
            return false
        }
        for i in 0..self.data.len() {
            if self.data.get(i) != other.data.get(i) {
                return false
            }
        }
        true
    }
    
    fn op!=(other: Matrix): bool {
        !(self == other)
    }
}

fn main(): i32 {
    let a = Matrix { ... }
    let b = Matrix { ... }
    let c = a + b       // Matrix addition
    let d = a * b       // Matrix multiplication
    let val = c[0]      // Index access
    let eq = a == b     // Equality check
    return 0
}
```

## Related Topics

- [Contracts](/guide/types/contracts) - Contract system
- [Structs](/guide/types/structs) - Defining types
- [Methods](/guide/advanced/methods) - Method syntax
# Raw Pointers

Vex provides first-class support for raw pointers to enable systems programming, hardware interaction, and foreign function interfaces (FFI). Unlike references (`&T`), raw pointers enable manual memory management and are not subject to borrow checker rules.

::: warning
Dereferencing raw pointers is always **unsafe** and must be performed within an `unsafe` block.
:::

## Pointer Types

Vex distinguishes between immutable and mutable raw pointers:

| Type | Description | C Equivalent |
|------|-------------|--------------|
| `*T` | Immutable raw pointer | `const T*` |
| `*T!` | Mutable raw pointer | `T*` |
| `*void` | Opaque/Void pointer | `void*` |

## Creating Pointers

### From References
References can be cast to pointers. This operation is safe (creating the pointer), but using it is unsafe.

```vex
let x = 42
let ptr_const: *i32 = &x         // Cast implicit in assignment if types match? 
                                // Explicit cast: &x as *i32

let! mut_y = 100
let ptr_mut: *i32! = &mut_y!     // Cast to mutable pointer
```

### From Addresses
You can cast integer addresses to pointers. This is essential for memory-mapped I/O.

```vex
let addr: usize = 0xDEAD_BEEF
let ptr = addr as *u32!          // Create pointer from strict address
```

### Type Casting
Pointers can be cast between types using `as`.

```vex
let ptr: *i32 = &10
let byte_ptr = ptr as *u8    // Reinterpret as byte pointer
let void_ptr = ptr as *void  // Type erasure
```

## Operations

### Dereferencing
Accessing the memory pointed to by a raw pointer is `unsafe`.

```vex
let x = 10
let ptr = &x

// READ
let val = unsafe { *ptr }
```

### Writing
Writing requires a mutable pointer (`*T!`).

```vex
let! x = 10
let ptr = &x! as *i32!

// WRITE
unsafe {
    *ptr = 20
}
$println(x) // 20
```

### Pointer Arithmetic
Pointers in Vex support arithmetic operations `+` and `-`. Arithmetic is **typed** components are scaled by the size of the pointee type (similar to C/C++).

```vex
let arr = [10, 20, 30]
let ptr = &arr[0] as *i32

unsafe {
    // Advances by 1 * sizeof(i32) (4 bytes)
    let next = ptr + 1  
    
    // Reads arr[1] (20)
    $println(*next)
}
```

To perform untyped (byte-level) offsets, cast to `usize` or `*u8` first:

```vex
// Advance by exactly 1 byte
let byte_next = (ptr as usize + 1) as *i32 
```

### Comparisons
Pointers can be compared for equality (`==`, `!=`) or ordering (`<`, `>`, etc.).

```vex
if ptr != (0 as *i32) {
    // Not null
}
```

## Multilevel Pointers
Pointers to pointers are supported. Spacing is recommended to avoid parsing ambiguity, though standard Vex parsers handle `**T` correctly.

```vex
let val = 10
let p1: *i32 = &val
let p2: * *i32 = &p1    // Pointer to pointer
```

## Null Pointers
Vex uses `0` as the null value for pointers. There is no usage of a specific `null` keyword for pointer types in the current boolean logic.

```vex
let null_ptr = 0 as *void
```

## Example: FFI Usage

Common usage of pointers is interfacing with C libraries like `malloc`.

```vex
extern "C" {
    fn malloc(size: usize): *void
    fn free(ptr: *void)
}

struct Point { x: i32, y: i32 }

fn main() {
    unsafe {
        // 1. Allocate raw memory
        let void_ptr = malloc(8) // sizeof(Point)
        
        // 2. Cast to structured pointer
        let ptr = void_ptr as *Point!
        
        // 3. Initialize field access
        (*ptr).x = 100
        (*ptr).y = 200
        
        $println(f"Point at {ptr as usize}: {(*ptr).x}, {(*ptr).y}")
        
        // 4. Clean up
        free(void_ptr)
    }
}
```
# Unsafe Code

Vex provides `unsafe` blocks and functions for low-level operations that bypass the compiler's safety guarantees. Use sparingly and only when necessary.

::: warning
Unsafe code can cause memory corruption, undefined behavior, and security vulnerabilities. Always wrap unsafe code in safe abstractions.
:::

## Unsafe Blocks

The `unsafe { }` block allows operations that the compiler cannot verify as safe:

```vex
fn main() {
    let value: i64 = 42
    let ptr = &value as *i64
    
    // Unsafe block for raw pointer dereference
    let read_val = unsafe { *ptr }
    
    println(f"Value: {read_val}")
}
```

### What Requires Unsafe?

| Operation | Why Unsafe? |
|-----------|-------------|
| Raw pointer dereference (`*ptr`) | Pointer may be null or dangling |
| Calling `unsafe fn` | Function has manual safety requirements |
| FFI calls (`extern "C"`) | No safety guarantees for C code |
| Mutable global access | Risk of data races |

## Unsafe Functions

Declare functions with the `unsafe` keyword to signal manual safety requirements:

```vex
// Unsafe function - caller must ensure ptr is non-null
unsafe fn raw_read(ptr: *i64): i64 {
    return *ptr
}

fn main() {
    let val = 100
    let ptr = &val as *i64
    
    // Must call within unsafe block
    let result = unsafe { raw_read(ptr) }
}
```

## Raw Pointers

Vex distinguishes between references (`&T`) and raw pointers (`*T`).

### Creating Raw Pointers

```vex
let x = 42
let ptr = &x as *i32      // Immutable raw pointer
let! y = 100
let ptr_mut = &y! as *i32! // Mutable raw pointer
```

### Dereferencing

Dereferencing a raw pointer is always `unsafe`:

```vex
let x = 42
let ptr = &x as *i32
let val = unsafe { *ptr }

let! y = 100
let ptr_mut = &y! as *i32!
unsafe { *ptr_mut = 200 }
```

## Mutable Global Variables

Accessing mutable global variables requires `unsafe` due to potential data races:

```vex
let! COUNTER: i32 = 0

fn increment() {
    unsafe {
        COUNTER += 1
    }
}

fn get_count(): i32 {
    return unsafe { COUNTER }
}
```

## Best Practices

1. **Minimize Unsafe Scope**: Keep `unsafe` blocks as small as possible.
2. **Safe Wrappers**: Always prefer wrapping unsafe modules in a clean, safe Vex API.
3. **Validate Pointers**: Perform null checks or bounds checks in safe code before entering an unsafe block.

## Next Steps

- [FFI](/guide/ffi) - Calling C functions
- [Raw Pointers](/guide/advanced/pointers) - Pointer arithmetic and details
- [Freestanding](/guide/freestanding) - Using unsafe for OS kernels
# Control Flow

Vex provides comprehensive control flow constructs including conditionals, pattern matching, and various loop types. Most of these are **expressions** that return values.

## Conditional Expressions

### if / else / elif

```vex
// Basic if
if condition {
    do_something()
}

// if-else
if x > 0 {
    println("Positive")
} else {
    println("Non-positive")
}

// if-elif-else chain
if score >= 90 {
    println("A")
} elif score >= 80 {
    println("B")
} else {
    println("F")
}
```

### if as Expression

Since `if` is an expression, it returns a value:

```vex
let max = if a > b { a } else { b }
```

### Ternary Operator

Vex supports the classic C-style ternary operator `? :` for concise conditionals:

```vex
let max = a > b ? a : b
```

### Conditional Binding

```vex
// if-let for Option/Result
if let Some(value) = optional_value {
    println(f"Got: {value}")
}

if let Ok(data) = fetch_result {
    process(data)
}
```

## Pattern Matching

### match Expression

The `match` expression is Vex's most powerful control flow construct. It is **exhaustive**, meaning all cases must be covered.

```vex
let result = match value {
    0 => "zero",
    1 => "one",
    _ => "many"  // _ is the wildcard pattern
}
```

### Pattern Types

```vex
// Literal and OR patterns
match x {
    0 => "zero",
    1 | 2 | 3 => "small",
    _ => "large"
}

// Enum patterns
match result {
    Ok(value) => println(f"Success: {value}"),
    Err(e) => println(f"Error: {e.msg}")
}

// Tuple patterns
let pair = (1, 2)
match pair {
    (0, 0) => "origin",
    (x, y) => f"at ({x}, {y})"
}
```

### Guards

Add conditions to patterns:

```vex
match number {
    n if n < 0 => "negative",
    n => "positive or zero"
}
```

## Loops

### for Loop

Iterate over collections and ranges:

```vex
// Range iteration
for i in 0..10 {
    println(i)  // 0 to 9
}

// Collection iteration
let numbers = [1, 2, 3]
for num in numbers {
    println(num)
}
```

### while Loop

```vex
let! count = 0
while count < 10 {
    println(count)
    count += 1
}
```

### loop (Infinite Loop)

```vex
loop {
    if should_stop() {
        break
    }
}
```

## Defer

Execute code when leaving the current scope (Go-style RAII):

```vex
fn process() {
    let file = open("data.txt")
    defer file.close() // Executes when function returns
    
    // ... work ...
}
```

## Next Steps

- [Functions](/guide/basics/functions) - Defining behavior
- [Error Handling](/guide/error-handling) - Result and Option
- [Concurrency](/guide/concurrency/async) - Async, Await, and Channels
# Functions

Functions are the primary unit of code reuse in Vex. They are declared using the `fn` keyword.

## Basic Syntax

```vex
fn function_name(param1: Type1, param2: Type2): ReturnType {
    // bodies are blocks
    return value
}
```

### Examples

```vex
// Function with no parameters and no return value
fn greet() {
    println("Hello, Vex!")
}

// Function with parameters
fn greet_user(name: string) {
    println(f"Hello, {name}!")
}

// Function with return value
fn add(a: i32, b: i32): i32 {
    return a + b
}

// Single expression functions (automatic return)
fn multiply(a: i32, b: i32): i32 {
    a * b
}
```

## Parameters

### Immutable by Default
Parameters are immutable by default. You cannot modify them within the function body:

```vex
fn process(value: i32) {
    // value = 10  // ERROR: Cannot mutate parameter
}
```

### Mutable Parameters
To make a parameter mutable, use the `!` suffix:

```vex
fn increment(value!: i32) {
    value = value + 1
}
```

### References
Use `&T` for immutable references and `&T!` for mutable references:

```vex
fn print_vec(data: &Vec<i32>) {
    println(f"Vector length: {data.len()}")
}

fn append_sum(data: &Vec<i32>!) {
    // Note: iter() method is on &Vec<T>
    let! sum = 0
    for n in data {
        sum += n
    }
    data.push(sum)
}
```

## Optional and Default Parameters

Vex supports default values for parameters:

```vex
fn greet(name: string, greeting: string = "Hello") {
    println(f"{greeting}, {name}!")
}

fn main() {
    greet("Alice")           // Prints: Hello, Alice!
    greet("Bob", "Hi")       // Prints: Hi, Bob!
}
```

## Variadic Parameters

Use `...T` for functions that accept a variable number of arguments:

```vex
fn sum(numbers: ...i32): i32 {
    let! total = 0
    for n in numbers {
        total += n
    }
    return total
}

let result = sum(1, 2, 3, 4, 5)
```

## Generic Functions

Functions can be generic over one or more types:

```vex
fn identity<T>(value: T): T {
    return value
}

let x = identity<i32>(42)
let y = identity<string>("hello")
```

### With Contract Bounds

Constrain generic types using contracts:

```vex
fn print_it<T: $Display>(item: T) {
    println(item.toString())
}
```

## Multiple Return Values (Tuples)

Vex uses tuples to return multiple values:

```vex
fn divide_with_remainder(a: i32, b: i32): (i32, i32) {
    return (a / b, a % b)
}

let (quotient, remainder) = divide_with_remainder(10, 3)
```

## Methods (Go-style)

Vex uses Go-style receiver syntax for methods. Methods are defined outside the struct:

```vex
struct Point {
    x: f64,
    y: f64
}

// Immutable receiver
fn (self: &Point) length(): f64 {
    return (self.x * self.x + self.y * self.y).sqrt()
}

// Mutable receiver
fn (self: &Point!) move_by(dx: f64, dy: f64) {
    self.x += dx
    self.y += dy
}

// Static/Associated function
fn Point.new(x: f64, y: f64): Point {
    return Point { x, y }
}
```

## Anonymous Functions (Closures)

```vex
let add = |a: i32, b: i32| a + b
let result = add(10, 20)

// With parameter types and return type
let multiply = |a: i32, b: i32|: i32 {
    return a * b
}
```

## Async Functions

Declare async functions with the `async` keyword:

```vex
async fn fetch_data(url: string): Result<string, error> {
    // ... implementation
}

async fn main() {
    let result = await fetch_data("https://vex-lang.org")
}
```

## Best Practices

1. **Use `string` for text** - Always prefer the built-in `string` type.
2. **Prefer immutable parameters** - Only use `!` when necessary.
3. **Use descriptive names** - Functions should describe actions (`calculate_sum`).
4. **Keep functions focused** - A function should do one thing well.
5. **Leverage Go-style methods** - For better code organization and readability.

## Next Steps

- [Control Flow](/guide/basics/control-flow) - Conditionals and loops
- [Structs](/guide/types/structs) - Custom data types
- [Contracts](/guide/types/contracts) - Interface definitions
# Syntax Overview

Vex syntax is designed to be familiar to developers coming from C, Rust, Go, or TypeScript while introducing unique features for parallelism and safety.

## Basic Structure

### Comments

```vex
// Single-line comment

/* 
   Multi-line comment 
*/

/// Documentation comment (generates docs)
fn documented_function() {
    // ...
}
```

### Statements and Semicolons

Vex uses **automatic semicolon insertion (ASI)** similar to Go. Semicolons are optional at line endings:

```vex
let x = 10      // Semicolon inserted automatically
let y = 20      // Semicolon inserted automatically

// Explicit semicolons for multiple statements on one line
let a = 1; let b = 2
```

### Blocks

Blocks are delimited by curly braces `{}`:

```vex
{
    let x = 10
    let y = 20
    x + y  // Last expression is the block's value
}
```

## Identifiers

Valid identifiers:
- Start with a letter or underscore
- Contain letters, digits, or underscores
- Case-sensitive

```vex
let myVariable = 10
let _private = 20
let camelCase = 30
let snake_case = 40
let Type123 = 50
```

### Reserved Keywords

```
fn       let      let!     const    struct   enum     contract
impl     if       else     elif     for      while    loop
match    return   break    continue defer    go       async
await    import   export   from     as       type     where
true     false    nil      self     unsafe   extern   public
private  readonly
```

## Literals

### Numeric Literals

```vex
// Integers
let decimal = 42
let hex = 0xFF
let octal = 0o77
let binary = 0b1010

// With type suffix
let byte: u8 = 255u8
let big: i64 = 1000000i64
let huge: i128 = 999999999999i128

// Floats
let pi = 3.14159
let scientific = 1.5e10
let small = 2.0e-5

// Imaginary (for complex numbers)
let imag = 5i
let complex_imag = 3.14i
```

### String Literals

```vex
// Regular strings
let hello = "Hello, World!"

// Escape sequences
let escaped = "Line 1\nLine 2\tTabbed"

// Formatted strings (f-strings)
let name = "Vex"
let greeting = f"Hello, {name}!"

// Multi-line strings
let multi = "Line 1
Line 2
Line 3"
```

### Boolean and Nil

```vex
let yes = true       // bool
let no = false       // bool

// nil represents a NULL pointer (primarily for FFI)
// For high-level code, use Option<T> instead.
let nothing = nil    
```

### Array Literals

```vex
let numbers: [i32; 5] = [1, 2, 3, 4, 5]
let zeros: [f64; 3] = [0.0, 0.0, 0.0]
let mixed = [1, 2, 3]  // Type inferred as [i32; 3]
```

### Tuple Literals

```vex
let pair = (10, "hello")
let triple: (i32, f64, bool) = (1, 2.5, true)

// Access by index
let first = pair.0   // 10
let second = pair.1  // "hello"
```

## Operators

### Arithmetic Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `+` | Addition | `a + b` |
| `-` | Subtraction | `a - b` |
| `*` | Multiplication | `a * b` |
| `/` | Division | `a / b` |
| `%` | Modulo | `a % b` |
| `**` | Power | `a ** b` |

### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal | `a == b` |
| `!=` | Not equal | `a != b` |
| `<` | Less than | `a < b` |
| `<=` | Less or equal | `a <= b` |
| `>` | Greater than | `a > b` |
| `>=` | Greater or equal | `a >= b` |

### Logical Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `&&` | Logical AND | `a && b` |
| `\|\|` | Logical OR | `a \|\| b` |
| `!` | Logical NOT | `!a` |

### Bitwise Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `&` | Bitwise AND | `a & b` |
| `\|` | Bitwise OR | `a \| b` |
| `^` | Bitwise XOR | `a ^ b` |
| `~` | Bitwise NOT | `~a` |
| `<<` | Left shift | `a << n` |
| `>>` | Right shift | `a >> n` |

### SIMD & Vector Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `<<<` | Rotate left | `a <<< n` |
| `>>>` | Rotate right | `a >>> n` |
| `<?` | Element-wise min | `a <? b` |
| `>?` | Element-wise max | `a >? b` |
| `*+` | Fused multiply-add | `a *+ b` |
| `+\|` | Saturating add | `a +\| b` |
| `-\|` | Saturating sub | `a -\| b` |

### Assignment Operators

```vex
let! x = 10

x = 20        // Simple assignment
x += 5        // Add and assign
x -= 3        // Subtract and assign
x *= 2        // Multiply and assign
x /= 4        // Divide and assign
x %= 3        // Modulo and assign
x &= 0xFF     // Bitwise AND and assign
x |= 0x0F     // Bitwise OR and assign
x ^= 0xAA     // Bitwise XOR and assign
x <<= 2       // Left shift and assign
x >>= 1       // Right shift and assign
```

### Other Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `? :` | Ternary conditional | `a > b ? a : b` |
| `?` | Error propagation | `result?` |
| `??` | Nil coalescing | `a ?? default` |
| `\|>` | Pipeline | `x \|> fn1 \|> fn2` |
| `..` | Range (exclusive) | `0..10` |
| `..=` | Range (inclusive) | `0..=10` |
| `.` | Member access | `obj.field` |

## Expressions vs Statements

In Vex, most constructs are **expressions** that return values:

```vex
// if is an expression
let max = if a > b { a } else { b }

// match is an expression
let name = match value {
    1 => "one",
    2 => "two",
    _ => "other"
}

// Blocks are expressions (return last value)
let result = {
    let x = compute()
    let y = transform(x)
    x + y  // This is the block's value
}
```

## Next Steps

- [Variables & Constants](/guide/basics/variables) - Learn about variable declaration
- [Functions](/guide/basics/functions) - Function syntax and features
- [Control Flow](/guide/basics/control-flow) - if, match, loops
# Variables & Constants

Vex provides three ways to declare bindings: `let` for immutable variables, `let!` for mutable variables, and `const` for compile-time constants.

## Immutable Variables (`let`)

By default, variables in Vex are **immutable**. Once assigned, their value cannot be changed:

```vex
let x = 42
let name = "Vex"
let pi = 3.14159

// x = 100  // ERROR: Cannot assign to immutable variable
```

::: tip Why Immutable by Default?
Immutable bindings make code easier to reason about, enable better optimizations, and prevent accidental mutations. This is a key principle in Vex's safety model.
:::

## Mutable Variables (`let!`)

When you need to modify a variable, use `let!`:

```vex
let! counter = 0
counter = counter + 1  // OK
counter += 1           // OK

let! buffer = Vec<u8>.new()
buffer.push(42)        // OK - mutation allowed
```

The `!` suffix serves as a visual marker that this variable can change, making mutation explicit and intentional.

## Constants (`const`)

Constants are evaluated at **compile time** and must have an explicit type annotation:

```vex
const MAX_SIZE: i32 = 1024
const PI: f64 = 3.14159265358979
const APP_NAME: string = "MyApp"
const BUFFER_SIZE: usize = 2048
```

### Const vs Let

| Feature | `let` | `const` |
|---------|-------|---------|
| Evaluation | Runtime | Compile-time |
| Type annotation | Optional | Required |
| Memory | Stack/Heap | Inlined |

## Type Annotations

Type annotations are optional when the type can be inferred:

```vex
// Inferred types
let x = 42          // i32 (default integer type)
let y = 3.14        // f64 (default float type)
let z = true        // bool
let s = "hello"     // string

// Explicit types
let a: i64 = 42
let b: f32 = 3.14
let c: u8 = 255
```

## Shadowing

You can redeclare a variable with the same name, which **shadows** the previous binding:

```vex
let x = 5
let x = x * 2      // x is now 10
let x = "hello"    // x is now a string (type can change)

fn example() {
    let value = 10
    {
        let value = 20  // Shadows outer `value`
        println(value)  // Prints: 20
    }
    println(value)      // Prints: 10 (original)
}
```

## Destructuring

Variables can be declared using pattern destructuring:

### Tuple Destructuring

```vex
let (x, y) = (10, 20)
let (first, _, third) = (1, 2, 3)  // _ ignores a value
```

### Struct Destructuring

```vex
struct Point { x: f64, y: f64 }

let point = Point { x: 3.0, y: 4.0 }
let Point { x, y } = point
```

## Late Initialization

Variables can be declared without initialization and assigned later:

```vex
let x: i32           // Declared but not initialized
// println(x)        // ERROR: Use of uninitialized variable

x = 10               // Now initialized
println(x)           // OK
```

The borrow checker ensures you never use an uninitialized variable.

## Best Practices

1. **Prefer `let` over `let!`**: Only use mutation when necessary.
2. **Use meaningful names**: `user_count` instead of `n`.
3. **Scope variables tightly**: Declare variables close to their first use.
4. **Use `const` for configuration**: Makes intent and compile-time nature clear.

## Next Steps

- [Primitive Types](/guide/types/primitives) - All built-in types
- [Functions](/guide/basics/functions) - Working with functions
- [Ownership](/guide/memory/ownership) - How variables own data
# Async/Await & Goroutines

Vex provides two primary concurrency models designed for modern parallel systems:

1. **Async/Await**: Stackless coroutines for managing many I/O-bound operations efficiently.
2. **Goroutines**: Lightweight, M:N scheduled green threads for CPU-bound parallelism.

## Async Functions

Async functions are declared with the `async` keyword and return a future that can be awaited.

```vex
async fn fetch_data(id: i32): i32 {
    println(f"Fetching data for ID: {id}")
    await sleep(100) // Suspend current coroutine
    return id * 2
}
```

## The `await` Keyword

Vex uses **prefix await** syntax to wait for asynchronous results:

```vex
async fn process() {
    let result = await fetch_data(42)
    println(f"Result: {result}")
}
```

## Goroutines (`go`)

The `go` keyword spawns a lightweight thread (goroutine) that runs concurrently with the caller.

```vex
fn heavy_task() {
    // ... complex computation ...
}

fn main() {
    go heavy_task() // Run in background
    go {
        println("Inline goroutine")
    }
}
```

## Channels

Channels provide safe, synchronized communication between goroutines and async tasks.

```vex
fn main() {
    let! ch = Channel.new<i32>(10)
    
    go {
        ch.send(42)
    }
    
    let val = ch.recv() // Some(42)
}
```

### Channel Operations

| Operation | Description |
|-----------|-------------|
| `Channel.new<T>(cap)` | Create a channel with fixed capacity |
| `ch.send(val)` | Send a value (may block) |
| `ch.recv()` | Receive a value (returns `Option<T>`) |
| `ch.close()` | Close the channel |

## Best Practices

1. **Use `async` for I/O**: High-concurrency network or disk tasks should use `async/await`.
2. **Use `go` for CPU work**: Offload heavy computations to goroutines to avoid blocking the async event loop.
3. **Communicate via Channels**: Avoid shared memory where possible; leverage channels for state synchronization.

## Next Steps

- [Synchronization](/guide/concurrency/sync) - Mutexes and atomics
- [Standard Library](/guide/stdlib) - Built-in async utilities
- [Memory Safety](/guide/memory/borrowing) - Thread-safe borrowing
# Channels

Channels are Vex's primary mechanism for communication between goroutines. They provide type-safe, lock-free message passing.

## Creating Channels

```vex
// Buffered channel with capacity
let! ch: Channel<i64> = Channel(10)    // Buffer size 10
let! ch: Channel<string> = Channel(1)  // Buffer size 1

// Type is inferred from usage
let! ch = Channel<Message>(100)
```

::: tip Buffer Size
Always specify a buffer size. A buffer of 1 acts like a synchronous channel (blocks until received). Larger buffers allow asynchronous sends.
:::

## Sending and Receiving

### Basic Operations

```vex
// Send to channel
ch.send(42)

// Receive from channel - two equivalent syntaxes
let value = <-ch          // Go-style prefix operator
let value = ch.recv()     // Method call style
```

### Go-style Receive Operator

The `<-` prefix operator is syntactic sugar for `.recv()`:

```vex
fn main(): i32 {
    let! ch: Channel<i64> = Channel(3)
    
    go {
        ch.send(42)
        ch.send(100)
        ch.send(999)
    };
    
    // Go-style syntax: <-ch
    let val1 = <-ch    // 42
    let val2 = <-ch    // 100
    let val3 = <-ch    // 999
    
    return 0
}
```

## Non-blocking Operations

### try_send and try_recv

For non-blocking operations that return immediately:

```vex
// Non-blocking send - returns Result
if ch.try_send(value).is_ok() {
    println("Sent successfully")
} else {
    println("Channel full, would block")
}

// Non-blocking receive - returns Option
if let Some(msg) = ch.try_recv() {
    process(msg)
} else {
    println("No message available")
}
```

## Common Patterns

### Producer-Consumer

```vex
fn producer_consumer() {
    let! ch: Channel<i32> = Channel(100)
    
    // Single producer
    go {
        for i in 0..100 {
            ch.send(i)
        }
    };
    
    // Single consumer
    for _ in 0..100 {
        let item = <-ch
        process(item)
    }
}
```

### Multiple Producers

```vex
fn fan_in() {
    let! ch: Channel<i32> = Channel(100)
    
    // Multiple producers
    for producer_id in 0..4 {
        go {
            for i in 0..25 {
                ch.send(producer_id * 100 + i)
            }
        };
    }
    
    // Single consumer receives all
    for _ in 0..100 {
        let item = <-ch
        println(f"Received: {item}")
    }
}
```

### Worker Pool

```vex
fn worker_pool(tasks: [Task], num_workers: i32) {
    let! task_ch: Channel<Task> = Channel(tasks.len())
    let! result_ch: Channel<Result> = Channel(tasks.len())
    
    // Spawn workers
    for worker_id in 0..num_workers {
        go {
            loop {
                match task_ch.try_recv() {
                    Some(task) => {
                        let result = process_task(task)
                        result_ch.send(result)
                    },
                    None => break
                }
            }
        };
    }
    
    // Submit all tasks
    for task in tasks {
        task_ch.send(task)
    }
    
    // Collect results
    let! results = []
    for _ in 0..tasks.len() {
        results.push(<-result_ch)
    }
}
```

### Pipeline

```vex
fn pipeline() {
    let! stage1_out: Channel<i32> = Channel(10)
    let! stage2_out: Channel<i32> = Channel(10)
    let! stage3_out: Channel<i32> = Channel(10)
    
    // Stage 1: Generate numbers
    go {
        for i in 0..100 {
            stage1_out.send(i)
        }
    };
    
    // Stage 2: Double
    go {
        for _ in 0..100 {
            let n = <-stage1_out
            stage2_out.send(n * 2)
        }
    };
    
    // Stage 3: Add 10
    go {
        for _ in 0..100 {
            let n = <-stage2_out
            stage3_out.send(n + 10)
        }
    };
    
    // Consume results
    for _ in 0..100 {
        let result = <-stage3_out
        println(f"Result: {result}")
    }
}
```

### Request-Response

```vex
struct Request {
    data: [u8],
    response_ch: Channel<Response>
}

fn server() {
    let! request_ch: Channel<Request> = Channel(100)
    
    // Server goroutine
    go {
        loop {
            let req = <-request_ch
            let response = handle_request(req.data)
            req.response_ch.send(response)
        }
    };
    
    // Client makes request
    let! response_ch: Channel<Response> = Channel(1)
    request_ch.send(Request {
        data: [1, 2, 3],
        response_ch: response_ch
    })
    
    // Wait for response
    let response = <-response_ch
}
```

## Typed Channels

Channels are generic and type-safe:

```vex
// Channel of structs
struct Message {
    id: i64,
    payload: string
}

let! msg_ch: Channel<Message> = Channel(10)

go {
    msg_ch.send(Message { id: 1, payload: "Hello" })
};

let msg = <-msg_ch
println(f"Got message {msg.id}: {msg.payload}")
```

## Channel Ownership

Channels can be shared between goroutines:

```vex
fn shared_channel() {
    let! ch: Channel<i32> = Channel(100)
    
    // Multiple goroutines can send to same channel
    go { ch.send(1) };
    go { ch.send(2) };
    go { ch.send(3) };
    
    // Collect all
    for _ in 0..3 {
        println(<-ch)
    }
}
```

## Best Practices

### 1. Always Use Buffered Channels

```vex
// ✅ Good: Buffered channel
let! ch: Channel<i32> = Channel(100)

// ⚠️ Minimal buffer (acts like sync channel)
let! ch: Channel<i32> = Channel(1)
```

### 2. Close Channels When Done (Future Feature)

```vex
// Coming soon: close() and range over channels
// go {
//     for item in items {
//         ch.send(item)
//     }
//     ch.close()
// };
// 
// for item in ch {  // Iterates until closed
//     process(item)
// }
```

### 3. Use try_recv for Polling

```vex
// Non-blocking check
loop {
    match ch.try_recv() {
        Some(msg) => handle(msg),
        None => {
            // Do other work
            do_background_task()
        }
    }
}
```

### 4. Avoid Deadlocks

```vex
// ❌ Deadlock: Send blocks forever (no receiver)
fn deadlock() {
    let! ch: Channel<i32> = Channel(1)
    ch.send(1)
    ch.send(2)  // Blocks! Buffer full, no receiver
}

// ✅ Safe: Receiver in separate goroutine
fn safe() {
    let! ch: Channel<i32> = Channel(1)
    
    go {
        ch.send(1)
        ch.send(2)
    };
    
    let a = <-ch
    let b = <-ch
}
```

## Channel Summary

| Operation | Syntax | Blocking |
|-----------|--------|----------|
| Create | `Channel<T>(size)` | - |
| Send | `ch.send(value)` | Yes (if full) |
| Receive | `<-ch` or `ch.recv()` | Yes (if empty) |
| Try send | `ch.try_send(value)` | No |
| Try receive | `ch.try_recv()` | No |

## Next Steps

- [Async/Await](/guide/concurrency/async) - Coroutines and goroutines
- [Synchronization](/guide/concurrency/sync) - Mutexes and atomics
- [Concurrency Overview](/guide/concurrency/overview) - Model comparison
# Concurrency Overview

Vex provides **two complementary concurrency models** that can be used together:

1. **Go-style Goroutines + Channels** - Lightweight green threads with M:N scheduling
2. **Async/Await Coroutines** - Stackless coroutines for I/O operations

::: tip Hybrid Model
Unlike most languages that choose one model, Vex supports **both**! Use goroutines for CPU-bound parallelism and async/await for I/O-bound concurrency. They can even interoperate.
:::

## Concurrency Models Comparison

| Model | Syntax | Best For | Scheduling |
|-------|--------|----------|------------|
| **Goroutines** | `go { }` | CPU parallelism, background tasks | M:N (many goroutines : N OS threads) |
| **Async/Await** | `async fn`, `await` | I/O operations, network calls | Cooperative (single-threaded by default) |
| **Channels** | `Channel<T>`, `<-ch` | Communication between goroutines | Lock-free message passing |

## Go-style Concurrency

### Goroutines with `go`

Spawn lightweight green threads using the `go` keyword:

```vex
fn main(): i32 {
    // Spawn a goroutine
    go {
        println("Hello from goroutine!")
        do_heavy_work()
    };
    
    // Or with an expression
    go process_data(my_data);
    
    println("Main continues immediately")
    return 0
}
```

### Channels

Channels provide safe communication between goroutines:

```vex
fn main(): i32 {
    // Create a buffered channel with capacity 3
    let! ch: Channel<i64> = Channel(3)
    
    // Producer goroutine
    go {
        ch.send(42)
        ch.send(100)
        ch.send(999)
    };
    
    // Receiver - Go-style syntax
    let val1 = <-ch    // Receive from channel
    let val2 = <-ch
    let val3 = <-ch
    
    println(f"Received: {val1}, {val2}, {val3}")
    return 0
}
```

### Channel Operations

```vex
// Create channel with buffer size
let! ch: Channel<string> = Channel(10)

// Send to channel
ch.send("message")

// Receive from channel (two syntaxes)
let msg = <-ch          // Go-style: <-channel
let msg = ch.recv()     // Method call style

// Non-blocking try operations
if let Some(msg) = ch.try_recv() {
    process(msg)
}

if ch.try_send("data").is_ok() {
    println("Sent successfully")
}
```

### Producer-Consumer Pattern

```vex
fn producer_consumer() {
    let! ch: Channel<i32> = Channel(100)
    
    // Multiple producers
    for i in 0..4 {
        let producer_id = i
        go {
            for j in 0..25 {
                ch.send(producer_id * 100 + j)
            }
        };
    }
    
    // Consumer
    for _ in 0..100 {
        let item = <-ch
        process(item)
    }
}
```

### Worker Pool

```vex
fn worker_pool(jobs: [Task], num_workers: i32) {
    let! job_ch: Channel<Task> = Channel(jobs.len())
    let! result_ch: Channel<Result> = Channel(jobs.len())
    
    // Spawn workers
    for _ in 0..num_workers {
        go {
            loop {
                if let Some(job) = job_ch.try_recv() {
                    let result = process_job(job)
                    result_ch.send(result)
                } else {
                    break
                }
            }
        };
    }
    
    // Submit jobs
    for job in jobs {
        job_ch.send(job)
    }
    
    // Collect results
    let! results = []
    for _ in 0..jobs.len() {
        results.push(<-result_ch)
    }
}
```

## Async/Await Coroutines

### Async Functions

Declare async functions with `async fn`:

```vex
async fn fetch_user(id: u64): Result<User, Error> {
    let response = await http.get(f"https://api.example.com/users/{id}")?
    let user: User = await response.json()?
    Ok(user)
}

async fn fetch_data(id: i32): i32 {
    println(f"Fetching data for ID: {id}")
    await async_delay(100)
    println("Data fetched!")
    return id * 2
}
```

### The `await` Keyword

`await` suspends coroutine execution until the future completes:

```vex
async fn process_items() {
    println("Processing item 1")
    let result1 = await fetch_data(10)
    println(f"Got result 1: {result1}")
    
    println("Processing item 2")
    let result2 = await fetch_data(20)
    println(f"Got result 2: {result2}")
    
    println("All done!")
}

fn main(): i32 {
    // Spawn async task
    process_items()
    println("Main function continues...")
    return 0
}
```

### Concurrent Async Operations

```vex
async fn fetch_all() {
    // All three run concurrently
    let (users, posts, comments) = await join!(
        fetch_users(),
        fetch_posts(),
        fetch_comments()
    )
    // Continues after ALL complete
}

async fn with_timeout() {
    select! {
        result = fetch_data() => {
            println(f"Got data: {result}")
        },
        _ = sleep(Duration.from_secs(5)) => {
            println("Timeout!")
        }
    }
}
```

## Combining Both Models

Vex allows mixing goroutines and async/await:

```vex
async fn fetch_and_process(urls: [string]) {
    let! ch: Channel<Response> = Channel(urls.len())
    
    // Spawn goroutines for concurrent fetching
    for url in urls {
        go {
            let response = await http.get(url)
            ch.send(response)
        };
    }
    
    // Collect results
    for _ in 0..urls.len() {
        let response = <-ch
        await process_response(response)
    }
}
```

## Synchronization Primitives

### Mutex (Mutual Exclusion)

```vex
use std.sync.Mutex

let counter = Box(Mutex.new(0))

// Safe concurrent access
go {
    let! guard = counter.lock()
    *guard += 1
};

go {
    let! guard = counter.lock()
    *guard += 1
};
```

### RwLock (Read-Write Lock)

```vex
use std.sync.RwLock

let cache = Box(RwLock.new(HashMap.new()))

// Many concurrent readers
go {
    let guard = cache.read()
    let value = guard.get(&key)
};

// Exclusive writer
go {
    let! guard = cache.write()
    guard.insert(key, value)
};
```

### Atomic Types

```vex
use std.sync.atomic.{AtomicI64, Ordering}

let counter = AtomicI64.new(0)

// Lock-free increment from multiple goroutines
go { counter.fetch_add(1, Ordering.SeqCst) };
go { counter.fetch_add(1, Ordering.SeqCst) };
```

## Choosing the Right Model

```
                    ┌──────────────────┐
                    │  What's your     │
                    │  workload?       │
                    └────────┬─────────┘
                             │
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   I/O-bound  │  │  CPU-bound   │  │   Mixed      │
    │  (network,   │  │  (compute,   │  │  workload    │
    │   file I/O)  │  │   number)    │  │              │
    └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
           │                 │                 │
           ▼                 ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │ async/await  │  │ go { ... }   │  │ Both + Chan  │
    └──────────────┘  └──────────────┘  └──────────────┘
```

### Decision Guide

| If you need... | Use |
|----------------|-----|
| Network/file I/O | `async/await` |
| Parallel CPU work | `go { }` goroutines |
| Communication between tasks | `Channel<T>` |
| Background processing | `go { }` |
| Sequential async calls | `async fn` + `await` |
| Concurrent async calls | `join!` or `select!` |
| Shared mutable state | `Mutex` or `RwLock` |
| Lock-free counters | `Atomic` types |

## Safety Guarantees

Vex's ownership system prevents data races at compile time:

```vex
let! data = [1, 2, 3]

// ERROR: Cannot move data into multiple goroutines
go { data.push(4) };
go { data.push(5) };

// OK: Use Box for shared ownership (VUMM auto-selects AtomicArc)
let data = Box(Mutex.new([1, 2, 3]))

go {
    let data = data.clone()
    data.lock().push(4)
};

go {
    let data = data.clone()
    data.lock().push(5)
};
```

## Performance Notes

| Operation | Approximate Throughput |
|-----------|------------------------|
| Goroutine spawn | ~500K/sec |
| Channel send/recv | ~10M/sec |
| Async task spawn | ~1M/sec |
| Mutex lock/unlock | ~50M/sec |
| Atomic operation | ~100M/sec |

## Next Steps

- [Async/Await](/guide/concurrency/async) - Deep dive into coroutines
- [Channels](/guide/concurrency/channels) - Advanced channel patterns
- [Synchronization](/guide/concurrency/sync) - Locks and atomics
# Error Handling

Vex uses explicit error handling through `Result` and `Option` types. There are no exceptions - errors are values that must be handled explicitly.

## Result Type

For operations that can fail:

```vex
enum Result<T, E> {
    Ok(T),
    Err(E)
}
```

### Returning Results

```vex
fn divide(a: f64, b: f64): Result<f64, string> {
    if b == 0.0 {
        return Err("Division by zero")
    }
    return Ok(a / b)
}

fn parse_number(s: string): Result<i32, error> {
    // Implementation
}
```

### Handling Results

```vex
// Pattern matching
match divide(10.0, 2.0) {
    Ok(result) => println(f"Result: {result}"),
    Err(e) => println(f"Error: {e}")
}

// unwrap (panics on Err)
let result = divide(10.0, 2.0).unwrap()  // 5.0

// unwrap_or (default on Err)
let result = divide(10.0, 0.0).unwrap_or(0.0)  // 0.0

// expect (panics with message)
let result = divide(10.0, 2.0).expect("Division failed")
```

## The ? Operator

Propagate errors automatically:

```vex
fn process_data(path: string): Result<Data, error> {
    let file = open(path)?           // Returns early if Err
    let content = file.read_all()?   // Returns early if Err
    let data = parse(content)?       // Returns early if Err
    return Ok(data)
}

// Equivalent to:
fn process_data_verbose(path: string): Result<Data, error> {
    let file = match open(path) {
        Ok(f) => f,
        Err(e) => return Err(e)
    }
    let content = match file.read_all() {
        Ok(c) => c,
        Err(e) => return Err(e)
    }
    let data = match parse(content) {
        Ok(d) => d,
        Err(e) => return Err(e)
    }
    return Ok(data)
}
```

## The !> Rescue Operator

Vex provides the `!>` (rescue) operator for inline error handling with a fallback:

```vex
// Basic syntax: expr !> |error_var| fallback_expr
let data = parse_json(text) !> |e| default_data

// With function reference
let value = risky_operation() !> handle_error

// Chain with closures
let config = load_config("app.json") !> |e| {
    println(f"Config load failed: {e}, using defaults")
    Config.default()
}
```

### Rescue vs ? Operator

| Operator | Behavior | Use Case |
|----------|----------|----------|
| `?` | Propagate error to caller | Let caller handle errors |
| `!>` | Handle error inline with fallback | Provide default/recovery |

```vex
fn process(path: string): Result<i32, error> {
    // ? propagates error
    let file = open(path)?
    
    // !> handles error inline
    let config = load_config() !> |_| Config.default()
    
    return Ok(config.value)
}
```

### Rescue with Different Handlers

```vex
// Closure handler
let x = parse_int(s) !> |e| {
    log_error(e)
    0  // Default value
}

// Function reference handler
fn default_handler(e: error): i32 {
    println(f"Error: {e}")
    return -1
}
let y = parse_int(s) !> default_handler

// Simple default value (when error is ignored)
let z = parse_int(s) !> |_| 0
```

## Option Type

For high-level values that might not exist, Vex uses the `Option<T>` type (available in the prelude):

```vex
enum Option<T> {
    Some(T),
    None
}
```

### Using Option

```vex
fn find_user(id: u64): Option<User> {
    database.get(id)
}

// Pattern matching
match find_user(42) {
    Some(user) => println(f"Found: {user.name}"),
    None => println("User not found")
}

// Methods
let name = find_user(42)
    .map(|u| u.name)
    .unwrap_or("Unknown")
```

## FFI & Raw Pointers (`nil`)

While `Option<T>` is the idiomatic way to handle optionality in Vex code, the `nil` keyword exists for compatibility with **raw pointers** and **FFI (Foreign Function Interface)**.

It represents the `NULL` value in C.

```vex
extern "C" {
    fn malloc(size: u64): ptr;
}

let p = malloc(100)
if p == nil {
    println("Memory allocation failed")
}
```

## Creating Errors

```vex
// Create error values
let err = error.new("Something went wrong")

// In functions
fn validate(x: i32): Result<i32, error> {
    if x < 0 {
        return Err(error.new("Must be positive"))
    }
    return Ok(x)
}
```

## Null Safety Operators

Vex provides powerful operators to handle `Option` and `nil` values concisely.

### Null Coalesce (??)

Returns the left operand if it is `Some(v)` or a non-nil pointer, otherwise returns the right operand:

```vex
// With Option
let name = user.nickname ?? "Anonymous"

// With pointers (FFI)
let p = get_ptr() ?? default_ptr
```

### Optional Chaining (?.)

Safe member access. Returns `None` (for Options) or `nil` (for pointers) if the receiver is `None` or `nil`:

```vex
let city = user?.address?.city  // None if user or address is None
let len = str_ptr?.len()        // nil if str_ptr is nil
```

## Custom Error Types

### Error Enum

```vex
enum FileError {
    NotFound(string),
    PermissionDenied(string),
    InvalidFormat,
    IoError(error)
}

fn read_config(path: string): Result<Config, FileError> {
    let file = match open(path) {
        Ok(f) => f,
        Err(e) => {
            if e.kind() == "NotFound" {
                return Err(FileError.NotFound(path))
            }
            return Err(FileError.IoError(e))
        }
    }
    
    return parse_config(file)
}
```

### Pattern Matching Errors

```vex
match read_config("app.json") {
    Ok(config) => use_config(config),
    Err(FileError.NotFound(path)) => {
        println(f"File not found: {path}")
        use_default_config()
    },
    Err(FileError.PermissionDenied(path)) => {
        panic(f"Cannot read {path}: permission denied")
    },
    Err(FileError.InvalidFormat) => {
        println("Invalid config format")
        use_default_config()
    },
    Err(FileError.IoError(e)) => {
        panic(f"IO error: {e}")
    }
}
```

## Result Combinators

### map and map_err

```vex
let result: Result<i32, string> = Ok(5)

// Transform Ok value
let doubled = result.map(|n| n * 2)  // Ok(10)

// Transform Err value  
let err: Result<i32, string> = Err("fail")
let detailed = err.map_err(|e| f"Error: {e}")
```

### and_then (Chaining)

```vex
fn validate(input: string): Result<string, error> { /* ... */ }
fn parse(s: string): Result<i32, error> { /* ... */ }
fn process(n: i32): Result<Output, error> { /* ... */ }

let result = validate(input)
    .and_then(|s| parse(s))
    .and_then(|n| process(n))
```

### or_else

```vex
// Try alternative on error
let result = primary_source()
    .or_else(|_| fallback_source())
    .or_else(|_| Ok(default_value()))
```

## Best Practices

### 1. Use Result for Expected Failures

```vex
// ✅ Good: File might not exist
fn read_config(path: string): Result<Config, error>

// ❌ Bad: Using panic for expected case
fn read_config(path: string): Config {
    // panics if file doesn't exist
}
```

### 2. Use ? for Error Propagation

```vex
// ✅ Good: Clean error propagation
fn process(): Result<Output, error> {
    let a = step_a()?
    let b = step_b(a)?
    let c = step_c(b)?
    return Ok(c)
}
```

### 3. Use !> for Recoverable Errors

```vex
// ✅ Good: Provide sensible default
let config = load_config() !> |e| {
    log_warn(f"Config failed: {e}")
    Config.default()
}
```

### 4. Provide Context

```vex
fn read_user_config(): Result<Config, error> {
    let content = read_file("~/.config/app/config.toml") !> |e| {
        return Err(error.new(f"Failed to read config: {e}"))
    }
    
    return parse_config(content)
}
```

## Summary

| Feature | Syntax | Use Case |
|---------|--------|----------|
| Result type | `Result<T, E>` | Operations that can fail |
| Option type | `Option<T>` | Values that may not exist |
| Propagate | `expr?` | Pass error to caller |
| Rescue | `expr !> \|e\| fallback` | Handle error inline |
| Null coalesce | `a ?? b` | Default for nil |
| Optional chain | `a?.b` | Safe member access |

## Next Steps

- [Modules](/guide/modules) - Code organization
- [Standard Library](/guide/stdlib) - Built-in utilities
- [Testing](/guide/tooling/testing) - Testing error cases
# Foreign Function Interface (FFI)

Vex provides seamless interoperability with C libraries through its FFI system. This allows calling C functions and exposing Vex functions to C code.

## Calling C Functions

### Basic FFI

```vex
// Declare external C functions
extern "C" {
    fn puts(s: *u8): i32
    fn strlen(s: *u8): u64
    fn malloc(size: u64): *u8!    // *T! = mutable pointer
    fn free(ptr: *u8!)
}

fn main(): i32 {
    unsafe {
        puts("Hello from C!")
    }
    return 0
}
```

### Linking Libraries

```vex
// Link system library
extern "C" from "m" {    // libm (math library)
    fn sin(x: f64): f64
    fn cos(x: f64): f64
    fn sqrt(x: f64): f64
}
```

## Pointer Types

Vex uses explicit pointer syntax:

| Vex Type | C Type | Description |
|----------|--------|-------------|
| `*T` | `const T*` | Immutable raw pointer |
| `*T!` | `T*` | Mutable raw pointer |
| `**T` | `const T**` | Pointer to pointer (immutable) |
| `**T!` | `T**` | Pointer to pointer (mutable) |

## C Types Mapping

| Vex Type | C Type |
|----------|--------|
| `i32` | `int32_t`, `int` |
| `usize` | `size_t` |
| `*u8` | `const char*` |

## Structs

 Use `repr(C)` for C-compatible limits:

```vex
struct Point repr(C) {
    x: f64,
    y: f64
}
```

## Memory Safety

### Unsafe Blocks

FFI calls require `unsafe` blocks:

```vex
fn use_ffi() {
    unsafe {
        let ptr = malloc(1024)
        if ptr == ptr.null() {
            panic("allocation failed")
        }
        free(ptr)
    }
}
```

### Safe Wrappers

Create safe wrappers around unsafe FFI:

```vex
// Unsafe FFI
extern "C" {
    fn dangerous_function(ptr: *u8!, len: u64): i32
}

// Safe wrapper
export fn safe_wrapper(data: Vec<u8>!): Result<(), error> {
    let result = unsafe {
        dangerous_function(data.as_ptr()!, data.len() as u64)
    }
    
    if result == 0 {
        return Ok(())
    } else {
        return Err(error.new(f"FFI error code: {result}"))
    }
}
```

### Unsafe Functions

For functions that are inherently unsafe manually declare them `unsafe`:

```vex
// Unsafe function - caller must ensure safety
unsafe fn raw_access(ptr: *i32!): i32 {
    return *ptr
}

// Must be called in unsafe block
unsafe {
    let value = raw_access(some_ptr)
}
```

## Platform-Specific Code

```vex
$if TARGET_OS == "linux" {
    extern "C" {
        fn epoll_create(size: i32): i32
    }
}
```

## Best Practices

1.  **Always Wrap Unsafe Code**: Don't leak `unsafe` or raw pointers into your public API unless designed for low-level systems programming.
2.  **Handle Null Pointers**: Check for `ptr.null()` return values from C allocations.
3.  **Use `repr(C)`**: Always mark structs passed to C with `repr(C)`.

## Next Steps

- [Standard Library](/guide/stdlib) - Built-in utilities
- [Memory Management](/guide/memory/ownership) - Safe memory model
# Freestanding Mode

Vex supports freestanding compilation for bare-metal environments, operating systems, bootloaders, and embedded systems - all without a standard library.

## What is Freestanding?

Freestanding mode compiles Vex code without:
- Standard library (`std`)
- Operating system
- Dynamic memory allocation (by default)
- Runtime support

This enables:
- OS kernels and Bootloaders
- Embedded firmware
- UEFI applications

## Enabling Freestanding

### Code Configuration

```vex
// Use no_std and no_main keywords
no_std        // Don't link standard library
no_main       // Don't expect a standard main function

// Required: Panic handler function
fn panic_handler(info: &PanicInfo): never {
    loop {}
}

// Entry point (name depends on target)
export extern "C" fn _start(): never {
    // Your code here
    loop {}
}
```

## Core Library

In freestanding mode, you have access to `core` (a subset of `std`):

```vex
// No imports needed for builtin contracts like $Add, $Eq
// Primitive types and basic constructs are always available
```

## Memory Management

### Global State

Global variables are declared at the top level using `let` or `let!`:

```vex
// Global buffers
let BUFFER: [u8; 4096] = [0; 4096]
let! COUNTER: u32 = 0
```

## Hardware Access

### Port I/O (x86)

```vex
// Output byte to port
fn outb(port: u16, value: u8) {
    unsafe {
        asm!(
            "out dx, al",
            in("dx") port,
            in("al") value
        )
    }
}
```

### Memory-Mapped I/O (MMIO)

```vex
struct UART {
    base: usize
}

fn (self: &UART) write_byte(byte: u8) {
    let addr = self.base + 0x00
    let ptr = addr as *u8!
    
    unsafe {
        // Direct pointer write
        *ptr = byte
    }
}
```

## Inline Assembly

```vex
fn read_cr3(): u64 {
    let value: u64
    unsafe {
        asm!(
            "mov {}, cr3",
            out(reg) value
        )
    }
    return value
}
```

## VGA Text Mode Example

```vex
const VGA_BUFFER: usize = 0xb8000

struct VgaWriter {
    public:
    column: usize,
    row: usize,
    color: u8
}

fn (self: &VgaWriter!) write_byte(byte: u8) {
    let pos = self.row * 80 + self.column
    let ptr = (VGA_BUFFER + pos * 2) as *u16!
    
    unsafe {
        // Direct write to VGA memory
        *ptr = (self.color as u16) << 8 | byte as u16
    }
    self.column += 1
}
```

## Best Practices

1.  **Use `repr(C)`** for structures shared with hardware or other languages.
2.  **Use `let` at top level** for global state variables.
3.  **Manual Memory Management**: In freestanding environments, you are responsible for memory layout.

## Next Steps

- [FFI](/guide/ffi) - Interoperability details
- [Inline Assembly](/guide/advanced/assembly) - Detailed asm syntax
- [Memory Safety](/guide/memory/borrowing) - Borrowing rules in bare-metal
# GPU & Compute with SIR

Vex provides GPU/compute programming through **Silicon IR (SIR)** - an intermediate representation designed for heterogeneous computing. SIR compiles to SPIR-V, WGSL, Metal Shading Language, and optimized SIMD code.

::: tip Key Insight
Vex has **NO attributes** like `@silicon` or `#[...]`. GPU/compute is handled **automatically** by the SIR compiler when you use array operations. The compiler detects vectorizable patterns and generates optimal code for CPU (SIMD) or GPU backends.
:::

## Overview

The SIR pipeline works automatically:

```
Vex Code → HIR → SIR Graph → Optimization → Backend Code
                                              ├─ LLVM IR (CPU/SIMD)
                                              ├─ SPIR-V (Vulkan)
                                              ├─ WGSL (WebGPU)
                                              └─ MSL (Metal)
```

## Operator Quick Reference

| Category | Operators | Example |
|----------|-----------|---------|
| **Arithmetic** | `+` `-` `*` `/` `%` `**` | `a + b`, `a ** 2` |
| **Min/Max** | `<?` `>?` `><` | `a <? b`, `a >< (lo, hi)` |
| **Saturating** | `+\|` `-\|` `*\|` | `pixels +\| 50` |
| **Bitwise** | `&` `\|` `^` `~` `<<` `>>` | `a & b`, `a << 2` |
| **Rotation** | `<<<` `>>>` | `x <<< 3` (crypto) |
| **Comparison** | `==` `!=` `<` `<=` `>` `>=` | `a > 0` (returns mask) |
| **Reduction** | `\+` `\*` `\<` `\>` `\&` `\\|` | `\+ data` (sum) |
| **Matrix** | `<*>` `·` `×` `'` | `a <*> b`, `matrix'` |
| **Pipeline** | `\|>` | `data \|> normalize \|> process` |

## Array Operations

SIR operates on Vex's built-in array types with **element-wise operators**:

```vex
// Static arrays - size known at compile time
let a: [f32; 1024] = [0.0; 1024]

// Dynamic arrays
let b: [f32] = [1.0, 2.0, 3.0, 4.0]

// Array operations - NO loops needed!
fn vector_add(a: [f32], b: [f32]): [f32] {
    return a + b  // Element-wise addition, auto-vectorized
}

fn vector_scale(a: [f32], scale: f32): [f32] {
    return a * scale  // Scalar broadcasting
}
```

## Element-wise Operators

SIR supports rich element-wise operations directly on arrays:

```vex
let a = [1.0, 2.0, 3.0, 4.0]
let b = [0.5, 1.0, 1.5, 2.0]

// Arithmetic - works on entire arrays!
let c = a + b        // [1.5, 3.0, 4.5, 6.0]
let d = a * b        // [0.5, 2.0, 4.5, 8.0]
let e = a ** 2       // [1.0, 4.0, 9.0, 16.0]  (power)

// Min/Max operators
let f = a <? b       // Element-wise min: [0.5, 1.0, 1.5, 2.0]
let g = a >? b       // Element-wise max: [1.0, 2.0, 3.0, 4.0]
let h = a >< (0.5, 3.0)  // Clamp: [1.0, 2.0, 3.0, 3.0]

// Math functions apply element-wise
let i = $sin(a)      // [0.84, 0.91, 0.14, -0.76]
let j = $sqrt(a)     // [1.0, 1.41, 1.73, 2.0]
let k = $exp(a)      // [2.72, 7.39, 20.09, 54.60]

// Comparisons return masks
let mask = a > 2.0   // [false, false, true, true]
```

## Reduction Operators

Reduce entire arrays to single values with prefix operators:

```vex
let data = [1.0, 2.0, 3.0, 4.0, 5.0]

// Reduction operators (prefix syntax)
let sum = \+ data     // 15.0 (sum reduction)
let prod = \* data    // 120.0 (product)
let max = \> data     // 5.0 (max reduction)
let min = \< data     // 1.0 (min reduction)
let all = \& mask     // Logical AND reduction
let any = \| mask     // Logical OR reduction

// With axis for multi-dimensional
let matrix = [[1, 2], [3, 4]]
let row_sums = \+ matrix, axis: 1   // [3, 7]
let col_sums = \+ matrix, axis: 0   // [4, 6]
```

## Linear Algebra Operators

Matrix operations with dedicated operators:

```vex
let a = [[1, 2], [3, 4]]
let b = [[5, 6], [7, 8]]

// Matrix multiply
let c = a <*> b       // [[19, 22], [43, 50]]

// Transpose
let t = a'            // [[1, 3], [2, 4]]

// Dot product
let v1 = [1.0, 2.0, 3.0]
let v2 = [4.0, 5.0, 6.0]
let dot = v1 · v2     // 32.0

// Cross product (3D vectors)
let cross = v1 × v2   // [-3.0, 6.0, -3.0]
```

## Bitwise Operators

Full bitwise support on integer arrays:

```vex
let a: [u8] = [0xFF, 0x0F, 0xF0, 0xAA]
let b: [u8] = [0x0F, 0xFF, 0x0F, 0x55]

let and = a & b       // [0x0F, 0x0F, 0x00, 0x00]
let or = a | b        // [0xFF, 0xFF, 0xFF, 0xFF]
let xor = a ^ b       // [0xF0, 0xF0, 0xFF, 0xFF]
let not = ~a          // [0x00, 0xF0, 0x0F, 0x55]

// Shifts
let shl = a << 2      // Shift left
let shr = a >> 2      // Shift right

// Rotations (for crypto)
let rotl = a <<< 3    // Rotate left
let rotr = a >>> 3    // Rotate right
```

## Saturating Arithmetic

For overflow-safe operations (audio, image processing):

```vex
let pixels: [u8] = [200, 250, 100, 50]
let adjust: u8 = 60

// Saturating operators (clamp instead of wrap)
let brighter = pixels +| adjust   // [255, 255, 160, 110]
let darker = pixels -| adjust     // [140, 190, 40, 0]
let scaled = pixels *| 2          // [255, 255, 200, 100]
```

## Pipeline Operator

Chain operations elegantly:

```vex
fn process_signal(data: [f32]): f32 {
    return data
        |> fn(x) { x - \+ x / x.len() as f32 } // Subtract mean
        |> fn(x) { x ** 2 }                    // Square
        |> \+                                  // Sum
        |> fn(x) { $sqrt(x) }                  // Root = std deviation
}

// Equivalent to:
fn process_signal_verbose(data: [f32]): f32 {
    let mean = \+ data / data.len() as f32
    let centered = data - mean
    let squared = centered ** 2
    let sum = \+ squared
    return $sqrt(sum)
}
```

## SIR Graph Architecture

SIR represents computation as a DAG (Directed Acyclic Graph):

| Node Type | Description | Example |
|-----------|-------------|---------|
| `Input` | Array/tensor placeholders | `let a = input([1024])` |
| `Map` | Element-wise ops (Add, Mul, Sin...) | `a + b`, `$sin(a)` |
| `MatMul` | Matrix multiplication | `a <*> b` |
| `Reduce` | Reductions (Sum, Max, Mean) | `\+ data` |
| `Output` | Graph outputs | `return result` |

## Data Types (DType)

SIR supports these data types:

| Category | Types | Notes |
|----------|-------|-------|
| **Signed Int** | `i8`, `i16`, `i32`, `i64` | Bitwise & arithmetic |
| **Unsigned Int** | `u8`, `u16`, `u32`, `u64` | Also for bitwise |
| **Float** | `f16`, `f32`, `f64` | Math functions |
| **Bool** | `bool` | Comparison results |
| **Quantized** | `int4`, `fp4`, `e4m3`, `e5m2` | ML inference |

## JIT Compilation

SIR uses Just-In-Time compilation:

1. **Graph Construction**: Code builds a SirGraph
2. **Optimization Passes**:
   - **Fusion**: Merges adjacent element-wise ops
   - **Dead Code Elimination**: Removes unused nodes
   - **Layout Optimization**: Reorders for hardware
3. **Kernel Generation**: Backend-specific code
4. **Execution**: Dispatch to hardware

```vex
// This simple code:
fn compute(a: [f32], b: [f32]): [f32] {
    let c = a + b
    let d = c * 2.0
    return d
}

// Becomes optimized fused kernel:
// Add + Mul fused into single pass
```

## Backend Selection
 
Vex **automatically** selects the best backend (CPU SIMD, Metal, Vulkan, etc.) based on the operation size and available hardware.
 
You do **not** need to import or configure backends manually. The compiler and runtime handle this transparently.

### Automatic GPU Offloading

The SIR compiler automatically dispatches to GPU when:
- Array operations exceed 4096 elements
- Matrix multiplications with output > 64x64
- Large reduction operations

```vex
// Small arrays → CPU SIMD (fast, no GPU overhead)
let small = [1.0, 2.0, 3.0, 4.0]
let result = small + 1.0  // Uses SIMD

// Large arrays → GPU automatically
let large: [f32; 10000] = [0.0; 10000]
let result = large * 2.0 + 1.0  // GPU if available
```

### Building with GPU Support

```bash
# macOS with Metal GPU (recommended)
cargo build --features metal-gpu

# Cross-platform with WebGPU
cargo build --features webgpu
```

### Runtime Control

```bash
# Disable GPU (force CPU SIMD)
VEX_NO_GPU=1 vex run program.vx

# Verbose SIR output
VEX_VERBOSE=1 vex run program.vx
```

## Supported GPU Backends

Vex's SIR compiler automatically targets the appropriate API for your platform:

| Platform | Backend | Requirement |
|----------|---------|-------------|
| **macOS** | `Metal` | macOS 10.13+ (Apple Silicon recommended) |
| **Linux** | `Vulkan` | Vulkan 1.2+ driver |
| **Windows** | `Vulkan` | Vulkan 1.2+ driver |
| **Web** | `WebGPU` | Modern browser (Chrome/Edge/Firefox) |
| **Fallback** | `LLVM-SIMD` | Any CPU (if GPU unavailable) |

For intrinsics supported on GPU, see the [Standard Intrinsics](/guide/simd#standard-intrinsics) table in the SIMD guide.

## VUMM Integration

SIR integrates with VUMM (Vex Unified Memory Manager):

- **Zero-Copy**: Uses unified memory on supported platforms (Apple Silicon, APUs)
- **Pool Allocator**: Reuses buffers to reduce allocation overhead
- **Lifecycle Management**: Reference counting for automatic cleanup

```vex
// Memory is managed automatically
fn process_large_array(data: [f32]): [f32] {
    // VUMM handles buffer allocation
    let result = transform(data)
    // Buffer freed when no longer referenced
    return result
}
```

## Optimization Passes

### Kernel Fusion

Adjacent operations are fused into single kernels:

```vex
// Before fusion: 3 separate kernel launches
let b = a + 1.0
let c = b * 2.0
let d = $relu(c)

// After fusion: 1 kernel launch
// (a + 1.0) * 2.0 → relu in single pass
```

### Tiling for Cache Efficiency

Large operations are tiled automatically:

```vex
// Matrix multiply auto-tiled for cache
fn large_matmul(
    a: [[f32; 1024]; 1024],
    b: [[f32; 1024]; 1024]
): [[f32; 1024]; 1024] {
    return a <*> b  // Tiling applied automatically
}
```

## Practical Examples

### Image Processing

```vex
// Brighten image - saturating add prevents overflow
fn brighten(pixels: [u8], amount: u8): [u8] {
    return pixels +| amount
}

// Grayscale conversion with broadcasting
fn grayscale(r: [u8], g: [u8], b: [u8]): [u8] {
    return (r * 0.299 + g * 0.587 + b * 0.114) as [u8]
}

// Contrast adjustment
fn contrast(pixels: [f32], factor: f32): [f32] {
    let mean = \+ pixels / pixels.len() as f32
    return (pixels - mean) * factor + mean
}

// Blur (box filter)
fn blur_3x3(img: [[f32]]): [[f32]] {
    let kernel = [[1, 1, 1], [1, 1, 1], [1, 1, 1]] / 9.0
    return $conv(img, kernel)
}
```

### Signal Processing

```vex
// FFT-based operations would use SIR's optimized kernels
fn normalize(signal: [f32]): [f32] {
    let min = \< signal
    let max = \> signal
    return (signal - min) / (max - min)
}

fn rms(signal: [f32]): f32 {
    return $sqrt(\+ signal ** 2 / #signal)
}

fn moving_average(data: [f32], window: i32): [f32] {
    return $conv(data, [1.0; window] / window as f32)
}
```

### Machine Learning

```vex
// Neural network layer
fn linear(x: [[f32]], w: [[f32]], b: [f32]): [[f32]] {
    return x <*> w + b  // MatMul + broadcast bias
}

fn relu(x: [[f32]]): [[f32]] {
    return x >? 0.0  // Element-wise max with 0
}

fn softmax(logits: [f32]): [f32] {
    let exp_x = $exp(logits - \> logits)  // Subtract max for stability
    return exp_x / \+ exp_x
}

fn cross_entropy(pred: [f32], target: [f32]): f32 {
    return -\+ target * $log(pred + 1e-7)
}

// Full forward pass - fuses into optimized kernels
fn mlp_forward(x: [[f32]], w1: [[f32]], b1: [f32], 
               w2: [[f32]], b2: [f32]): [[f32]] {
    return x 
        |> fn(h) { h <*> w1 + b1 }    // Linear 1
        |> fn(h) { h >? 0.0 }          // ReLU
        |> fn(h) { h <*> w2 + b2 }    // Linear 2
}
```

### Physics Simulation

```vex
// N-body gravity calculation
fn gravity_accel(
    pos: [[f32; 3]],  // N x 3 positions
    masses: [f32]      // N masses
): [[f32; 3]] {
    // Broadcasting: each body vs all others
    let dx = pos[:, None, :] - pos[None, :, :]  // N x N x 3
    let dist_sq = \+ dx ** 2, axis: 2           // N x N
    let inv_dist3 = 1.0 / (dist_sq * $sqrt(dist_sq) + 1e-9)
    
    // a = G * m * dx / r^3
    return \+ masses[None, :, None] * dx * inv_dist3[:, :, None], axis: 1
}

// Velocity Verlet integration
fn integrate(pos: [[f32; 3]], vel: [[f32; 3]], 
             accel: [[f32; 3]], dt: f32): ([[f32; 3]], [[f32; 3]]) {
    let new_pos = pos + vel * dt + 0.5 * accel * dt ** 2
    let new_accel = gravity_accel(new_pos, masses)
    let new_vel = vel + 0.5 * (accel + new_accel) * dt
    return (new_pos, new_vel)
}
```

### Crypto Operations

```vex
// AES SubBytes using Galois Field multiply
fn aes_sbox(state: [u8; 16]): [u8; 16] {
    let inv = $gf_inv(state)
    return inv ^ (inv <<< 1) ^ (inv <<< 2) ^ (inv <<< 3) ^ (inv <<< 4) ^ 0x63
}

// SHA-256 compression round
fn sha256_round(a: u32, b: u32, c: u32, d: u32,
                e: u32, f: u32, g: u32, h: u32,
                k: u32, w: u32): (u32, u32, u32, u32, u32, u32, u32, u32) {
    let s1 = (e >>> 6) ^ (e >>> 11) ^ (e >>> 25)
    let ch = (e & f) ^ (~e & g)
    let temp1 = h +| s1 +| ch +| k +| w
    
    let s0 = (a >>> 2) ^ (a >>> 13) ^ (a >>> 22)
    let maj = (a & b) ^ (a & c) ^ (b & c)
    let temp2 = s0 +| maj
    
    return (temp1 +| temp2, a, b, c, d +| temp1, e, f, g)
}
```

## Best Practices

1. **Use operators, not loops** - SIR optimizes operators directly
2. **Prefer fixed-size arrays** - Enables better optimization
3. **Use reduction operators** - `\+`, `\<`, `\>` for reductions
4. **Chain with pipeline** - `|>` for readable data flow
5. **Let fusion happen** - Don't manually split operations

```vex
// ✅ Excellent: Direct operators
fn dot_product(a: [f64], b: [f64]): f64 {
    return \+ a * b
}

fn normalize(v: [f64]): [f64] {
    return v / $sqrt(\+ v ** 2)
}

// ✅ Good: Pipeline for complex operations
fn standardize(data: [f64]): [f64] {
    let mean = \+ data / data.len() as f64
    let std = $sqrt(\+ (data - mean) ** 2 / data.len() as f64)
    return (data - mean) / std
}

// ❌ Avoid: Manual loops when operators work
fn bad_dot_product(a: [f64], b: [f64]): f64 {
    let! sum = 0.0
    for i in 0..a.len() {
        sum = sum + a[i] * b[i]  // Unnecessary loop!
    }
    return sum
}
```

## Compilation Flags

```bash
# Auto-detect best backend
vex compile file.vx

# Specify optimization level
vex compile -O 3 file.vx

# Target specific CPU for SIMD
vex compile --target-cpu=x86-64-v3 file.vx  # AVX2
vex compile --target-cpu=native file.vx     # Current CPU
```

## Next Steps

- [SIMD](/guide/simd) - CPU vectorization details
- [Memory Management](/guide/memory/vumm) - VUMM system
- [Performance](/guide/advanced/performance) - Optimization techniques
# Installation & Setup

## System Requirements

### Supported Platforms

| Platform | Architecture | Status |
|----------|--------------|--------|
| Linux | x86_64, aarch64 | ✅ Full Support |
| macOS | x86_64, Apple Silicon | ✅ Full Support |
| Windows | x86_64 | ✅ Full Support |
| FreeBSD | x86_64 | ✅ Full Support |

### Dependencies

- **LLVM 18+** - Backend code generation
- **Clang** - C runtime compilation
- **Rust 1.75+** - Building from source (temporary, until self-hosted)

## Building from Source

### 1. Clone the Repository

```bash
git clone https://github.com/meftunca/vex_lang.git
cd vex_lang
```

### 2. Build the Compiler

```bash
# Debug build (faster compilation)
cargo build

# Release build (optimized)
cargo build --release
```

### 3. Verify Installation

```bash
# Check version
~/.cargo/target/debug/vex --version

# Run a test program
~/.cargo/target/debug/vex run examples/hello.vx
```

## Pre-built Binaries

::: info Coming Soon
Pre-built binaries for all platforms will be available on the releases page after v0.3.0.
:::

## Editor/IDE Setup

### VS Code (Recommended)

1. Install the **Vex Language** extension from the marketplace
2. The extension provides:
   - Syntax highlighting
   - LSP integration (diagnostics, completion, go-to-definition)
   - Code formatting
   - Snippets

### Manual LSP Setup

For other editors that support LSP:

```bash
# Build the LSP server
cargo build --release -p vex-lsp

# The binary is at:
~/.cargo/target/release/vex-lsp
```

Configure your editor to use `vex-lsp` as the language server for `.vx` files.

## Project Structure

A typical Vex project looks like:

```
my_project/
├── vex.json          # Project manifest
├── src/
│   ├── main.vx       # Entry point
│   └── lib/          # Library modules
├── tests/            # Test files
└── examples/         # Example code
```

## First Program

Create a file `hello.vx`:

```vex
fn main(): i32 {
    println("Hello, Vex!");
    return 0;
}
```

Run it:

```bash
vex run hello.vx
```

## Build Commands

| Command | Description |
|---------|-------------|
| `vex run <file>` | Compile and run |
| `vex build <file>` | Compile to binary |
| `vex check <file>` | Type-check without compiling |
| `vex fmt <file>` | Format source code |
| `vex doc <file>` | Generate documentation |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VEX_HOME` | Vex installation directory | `~/.vex` |
| `VEX_TARGET` | Default compilation target | Host platform |
| `VEX_OPT_LEVEL` | Optimization level (0-3) | `2` |

## Troubleshooting

### LLVM Not Found

```bash
# macOS
brew install llvm@18
export LLVM_SYS_180_PREFIX=$(brew --prefix llvm@18)

# Ubuntu/Debian
sudo apt install llvm-18-dev libclang-18-dev

# Fedora
sudo dnf install llvm18-devel clang18-devel
```

### Linker Errors

Ensure you have a compatible linker:

```bash
# Use LLD for faster linking (recommended)
cargo install cargo-binutils
rustup component add llvm-tools-preview
```

## Next Steps

- [Syntax Overview](/guide/basics/syntax) - Learn Vex syntax
- [Your First Project](/guide/basics/first-project) - Create a complete project
# Introduction

## What is Vex?

**Vex** is a modern, **parallelism-first** systems programming language designed to maximize hardware utilization without sacrificing developer experience. Write simple, sequential code — the compiler automatically determines optimal execution strategy across CPU SIMD, GPU compute, and distributed systems.

> *"Every Cycle, Every Core, Every Time"*

Vex combines the best ideas from multiple languages:
- **Rust's** memory safety and ownership model
- **Go's** concurrency primitives (goroutines, channels)
- **Zig's** comptime and freestanding capabilities
- **Mojo's** automatic vectorization philosophy

## Design Philosophy

### 1. Hardware Saturation
Vex is designed to **saturate your hardware** — every CPU core, every GPU shader unit, every cycle utilized. No annotations, no manual optimization, no `<<<blocks, threads>>>` nightmares.

### 2. Zero-Cost Abstractions
High-level constructs compile down to optimal machine code. You don't pay for what you don't use.

### 3. Memory Safety Without Compromises
A 4-phase borrow checker ensures memory safety at compile time, without garbage collection overhead.

### 4. Freestanding First
Vex can run without an OS. Custom allocators, raw syscalls, and bare-metal support are first-class citizens.

## Key Features

| Feature | Description |
|---------|-------------|
| **Auto-Vectorization** | Transparent SIMD (SSE, AVX, AVX-512, NEON) |
| **GPU Offloading** | Automatic GPU acceleration for large workloads |
| **Goroutines & Channels** | CSP-style concurrency with `go {}` syntax |
| **4-Phase Borrow Checker** | Polonius-style memory safety |
| **VUMM** | Unified Memory Model with automatic RC selection |
| **Freestanding** | No libc dependency, raw syscall support |
| **Autograd** | Built-in automatic differentiation |
| **Complete Tooling** | LSP, formatter, package manager |

## Hello World

```vex
fn main(): i32 {
    print("Hello, Vex!");
    return 0;
}
```

## A Taste of Vex

### Automatic Vectorization
```vex
fn vector_add(): [f32; 8] {
    let a: [f32; 8] = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0];
    let b: [f32; 8] = [8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0];
    
    // Automatically vectorized to SIMD instructions!
    return a + b;
}
```

### Concurrency with Channels
```vex
fn main(): i32 {
    let ch = Channel<i32>.new();
    
    go {
        ch.send(42);
    };
    
    let value = ch.recv();
    println("Received: {}", value);
    
    return 0;
}
```

### Memory Safety
```vex
fn safe_borrowing() {
    let! data = Vec<i32>.new();
    data.push(1);
    data.push(2);
    
    let ref1 = &data;      // Immutable borrow
    println("{}", ref1[0]); // OK
    
    let ref2 = &data!;     // ERROR: Cannot mutably borrow while immutably borrowed
}
```

## Comparison with Other Languages

| Feature | Vex | Rust | Go | Zig | Mojo |
|---------|-----|------|-----|-----|------|
| Memory Safety | ✅ Borrow Checker | ✅ | ❌ GC | ❌ Manual | ✅ |
| Auto-Vectorization | ✅ Built-in | ❌ | ❌ | ❌ | ✅ |
| GPU Codegen | ✅ SPIR-V | ❌ | ❌ | ❌ | ✅ |
| Freestanding | ✅ | ✅ | ❌ | ✅ | ❌ |
| Channels | ✅ | 📦 Library | ✅ | ❌ | ❌ |
| Autograd | ✅ | ❌ | ❌ | ❌ | ✅ |
| Compile Speed | ⚡ Fast | 🐢 Slow | ⚡ Fast | ⚡ Fast | 🐢 Slow |

## Next Steps

- [Installation & Setup](/guide/installation) - Get Vex running on your machine
- [Language Basics](/guide/basics/syntax) - Learn the fundamentals
- [Examples](/examples/hello-world) - See Vex in action
# Borrowing

Borrowing allows you to reference data without taking ownership. This enables efficient data sharing while maintaining memory safety.

## Reference Types

### Immutable References (`&T`)

```vex
let data = [1, 2, 3]
let reference = &data

// Can read through reference
println(f"Length: {reference.len()}")
println(f"First: {reference[0]}")

// Cannot modify
// reference.push(4)  // ERROR: cannot mutate through immutable reference
```

### Mutable References (`&T!`)

```vex
let! data = [1, 2, 3]
let reference = &data!

// Can read
println(f"Length: {reference.len()}")

// Can modify
reference.push(4)
println(f"After push: {data.len()}")  // 4
```

## Borrowing Rules

### Rule 1: One Mutable OR Many Immutable

At any point, you can have either:
- **One** mutable reference (`&T!`), OR
- **Any number** of immutable references (`&T`)

```vex
let! data = [1, 2, 3]

// OK: Multiple immutable references
let r1 = &data
let r2 = &data
println(f"Sizes: {r1.len()} {r2.len()}")

// OK: One mutable reference (after immutable refs are done)
let r3 = &data!
r3.push(4)
```

### Rule 2: References Must Be Valid

References cannot outlive the data they point to. The Vex compiler tracks this automatically without requiring lifetime annotations.

```vex
// ERROR: Dangling reference
fn bad(): &i32 {
    let x = 42
    return &x  // ERROR: x is dropped when function returns
}

// OK: Return owned data
fn good(): i32 {
    let x = 42
    return x   // Transfer ownership
}
```

## Non-Lexical Lifetimes (NLL)

Vex uses NLL - borrows end at their last use, not necessarily at the end of the scope:

```vex
let! data = [1, 2, 3]

let r = &data
println(f"Length: {r.len()}") // Last use of r
// Borrow ends here

let r2 = &data! // OK: No conflict because r is no longer used
r2.push(4)
```

## Reference Patterns

### Function Parameters

```vex
// Take ownership
fn consume(data: Vec<i32>) {
    // data is moved in, dropped when function ends
}

// Borrow immutably
fn inspect(data: &Vec<i32>) {
    // Can read, cannot modify, caller keeps ownership
}

// Borrow mutably
fn modify(data: &Vec<i32>!) {
    // Can read and modify, caller keeps ownership
}
```

### Method Receivers (Go-style)

```vex
struct MyStruct {
    value: i32
}

// Immutable borrow of self
fn (self: &MyStruct) get_value(): i32 {
    return self.value
}

// Mutable borrow of self
fn (self: &MyStruct!) set_value(value: i32) {
    self.value = value
}
```

## Slices

Slices are references to contiguous sequences:

```vex
let arr = [1, 2, 3, 4, 5]

// Slice of entire array
let slice = &arr

// Slice of portion (start..end)
let middle = &arr[1..4]  // [2, 3, 4]

// Mutable slice
let! arr_mut = [1, 2, 3, 4, 5]
let slice_mut = &arr_mut![1..4]
// slice_mut[0] = 10  // ERROR: Slice mutation syntax is through methods or index
```

## Interior Mutability (VUMM)

Unlike Rust's `Cell` or `RefCell`, Vex relies on its **Unified Memory Model (VUMM)** and `Box<T>` to handle most memory patterns efficiently. High-level interior mutability is typically handled via atomics or synchronized types in the standard library.

## Best Practices

1. **Prefer borrowing over cloning**: Use `&T` to pass large structures.
2. **Use the smallest scope for mutable borrows**: Although NLL helps, keeping mutable borrows brief improves code clarity.
3. **Prefer immutable when possible**: Default to `&T` and only use `&T!` when mutation is required.

## Next Steps

- [Automatic Lifetimes](/guide/memory/lifetimes) - How Vex tracks references
- [VUMM Memory Model](/guide/memory/vumm) - Automatic memory strategy
- [Ownership](/guide/memory/ownership) - Value ownership model
# Automatic Lifetime Management

Unlike Rust, Vex does **NOT** require explicit lifetime annotations. The compiler automatically manages reference lifetimes through static analysis.

::: tip Key Difference from Rust
In Rust, you write: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str`

In Vex, you simply write: `fn longest(x: &string, y: &string): &string`

The Vex compiler figures out the relationships automatically!
:::

## How It Works

Vex's borrow checker performs sophisticated static analysis to track:

1. **Reference Origins** - Where each reference comes from
2. **Validity Ranges** - How long each reference is valid
3. **Conflicts** - When mutable and immutable borrows overlap

```vex
fn longest(x: &string, y: &string): &string {
    if x.len() > y.len() {
        return x
    }
    return y
}

// The compiler understands that the returned reference
// can only be used while BOTH x and y are valid
```

## Borrowing Rules

Vex enforces safety rules through static analysis, without explicit annotations:

### Rule 1: One Mutable OR Multiple Immutable

```vex
let! data = Vec<i32>.new()
data.push(1)
data.push(2)

// Multiple immutable borrows - OK
let a = &data
let b = &data
println(f"{a.len()}, {b.len()}")

// Mutable borrow - OK (immutable borrows no longer in use)
let c = &data!
c.push(3)

// ❌ ERROR: Cannot have mutable and immutable at same time
let d = &data
let e = &data!  // Error: cannot borrow mutably while immutably borrowed
```

### Rule 2: References Cannot Outlive Data

```vex
fn dangling(): &i32 {
    let x = 42
    return &x  // ❌ ERROR: x will be dropped, reference invalid
}

// ✅ Correct: Return owned data
fn not_dangling(): i32 {
    let x = 42
    return x
}
```

### Rule 3: No Data Races

```vex
let! counter = 10

// These would execute concurrently - compiler prevents race
go {
    // counter = counter + 1  // ❌ ERROR: data race possible
}
```

## Common Patterns

### Returning References from Functions

```vex
struct User {
    name: string,
    email: string
}

// Return reference to field - compiler tracks this
fn (self: &User) get_name(): &string {
    return &self.name
}

// Usage
let user = User { name: "Alice", email: "alice@example.com" }
let name = user.get_name()
println(name)  // OK: user still valid

// Error case - would be caught at compile time
fn bad_example(): &string {
    let user = User { name: "Bob", email: "bob@example.com" }
    return user.get_name()  // ❌ ERROR: user dropped, reference invalid
}
```

### Structs Holding References

```vex
// Struct can hold references
struct Parser {
    input: &string,
    position: usize
}

fn Parser.new(input: &string): Parser {
    return Parser { input, position: 0 }
}

fn (self: &Parser!) advance() {
    self.position = self.position + 1
}

// Usage
let source = "let x = 42"
let! parser = Parser.new(&source)
parser.advance()
// parser valid only while source is valid - compiler enforces this
```

## Comparison: Vex vs Rust

| Aspect | Rust | Vex |
|--------|------|-----|
| Lifetime annotations | Required when ambiguous | Never required |
| `'a` syntax | Yes | No |
| Borrow checking | Compile time | Compile time |
| Safety guarantees | Same | Same |

### Equivalent Code

**Rust:**
```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

struct ImportantExcerpt<'a> {
    part: &'a str,
}
```

**Vex:**
```vex
fn longest(x: &string, y: &string): &string {
    if x.len() > y.len() { x } else { y }
}

struct ImportantExcerpt {
    part: &string
}

fn (self: &ImportantExcerpt) level(): i32 {
    return 3
}
```

## Best Practices

1. **Return owned data when in doubt** - Simpler and avoids lifetime issues
2. **Use references for read-only access** - Efficient, no copying
3. **Use `&T!` for mutable operations** - Clear intent
4. **Trust the compiler** - If it compiles, references are safe

## Next Steps

- [VUMM Memory Model](/guide/memory/vumm) - Automatic memory management
- [Ownership](/guide/memory/ownership) - Value ownership model
- [Borrowing](/guide/memory/borrowing) - Reference borrowing details
# Ownership Model

Vex's ownership system ensures memory safety without garbage collection. Every value has a single owner, and when the owner goes out of scope, the value is automatically cleaned up.

## Core Principles

### 1. Every Value Has One Owner

```vex
let s = "hello"    // s owns the string
let t = s          // Ownership moves to t
// println(s)      // ERROR: s no longer owns the string
println(t)         // OK: t is the owner
```

### 2. Ownership Can Be Transferred (Moved)

```vex
fn take_ownership(s: string) {
    println(s)
}  // s is dropped here

let my_string = "hello"
take_ownership(my_string)      // Ownership moved to function
// println(my_string)          // ERROR: my_string no longer valid
```

### 3. Values Are Dropped When Owner Goes Out of Scope

```vex
fn example() {
    let s = "hello"
    // ... use s ...
}  // s goes out of scope, memory is freed
```

## Move Semantics

By default, assignment and function calls **move** ownership:

```vex
// Move on assignment
let a = Vec<i32>.new()
let b = a              // a is moved to b
// a.push(1)           // ERROR: use of moved value

// Move on function call
fn consume(v: [i32]) {
    // v is owned here
}

let data = [1, 2, 3]
consume(data)          // data is moved
// data.len()          // ERROR: use of moved value
```

### Copy Types

Simple types that implement `Copy` are copied instead of moved:

```vex
let x: i32 = 5
let y = x          // x is copied, not moved
println(x)         // OK: x is still valid

// Copy types include:
// - All integer types (i8, i16, i32, i64, u8, u16, u32, u64, etc.)
// - All floating point types (f32, f64)
// - bool
// - char
// - Tuples of Copy types
// - Fixed-size arrays of Copy types
```

### Clone

Non-Copy types can be explicitly cloned:

```vex
let s1 = "hello"
let s2 = s1.clone()    // Deep copy
println(s1)            // OK: s1 is still valid
println(s2)            // OK: s2 is a separate copy
```

## Borrowing

Instead of transferring ownership, you can **borrow** a reference:

### Immutable References (`&T`)

Multiple immutable references are allowed:

```vex
fn print_length(s: &string) {
    println(f"Length: {s.len()}")
}  // s (the reference) goes out of scope, but doesn't drop the data

let my_string = "hello"
print_length(&my_string)    // Borrow immutably
print_length(&my_string)    // Can borrow again
println(my_string)          // Still valid - we never gave up ownership
```

### Mutable References (`&T!`)

Only one mutable reference at a time:

```vex
fn append_world(s: &string!) {
    s = s + ", world!"
}

let! my_string = "hello"
append_world(&my_string!)   // Borrow mutably
println(my_string)          // "hello, world!"
```

### Borrowing Rules

1. **At any time, you can have either:**
   - Any number of immutable references (`&T`)
   - OR exactly one mutable reference (`&T!`)

2. **References must always be valid**

```vex
let! data = [1, 2, 3]

// OK: Multiple immutable borrows
let r1 = &data
let r2 = &data
println(f"{r1:?} {r2:?}")

// OK: Single mutable borrow (after immutable borrows are done)
let r3 = &data!
r3.push(4)

// ERROR: Cannot have both mutable and immutable
let r4 = &data
let r5 = &data!    // ERROR: cannot borrow as mutable
println(r4)
```

## Lifetimes

Lifetimes ensure references don't outlive the data they point to:

```vex
// ERROR: Dangling reference
fn dangling(): &string {
    let s = "hello"
    &s  // ERROR: s will be dropped, reference would be invalid
}

// OK: Return owned value
fn not_dangling(): string {
    let s = "hello"
    s  // Ownership transferred to caller
}
```

### Automatic Lifetime Management

Vex automatically infers lifetimes - no explicit annotations needed:

```vex
// Vex infers that result borrows from both x and y
fn longest(x: &string, y: &string): &string {
    if x.len() > y.len() { x } else { y }
}

// Usage
let s1 = "short"
let s2 = "much longer"
let result = longest(&s1, &s2)
println(result)  // "much longer"
```

### References in Structs

```vex
struct Excerpt {
    text: &string
}

let novel = "Call me Ishmael. Some years ago..."
let first_sentence = novel.split('.').next().unwrap()
let excerpt = Excerpt { text: first_sentence }
// excerpt cannot outlive novel - compiler enforces this
```

## Smart Pointers

### Box<T> - Heap Allocation

```vex
// Allocate on heap
let boxed = Box.new(42)
println(boxed)  // 42

// Useful for recursive types
enum List {
    Cons(i32, Box<List>),
    Nil
}

let list = List.Cons(1, Box.new(List.Cons(2, Box.new(List.Nil))))
```

### VUMM (Unified Memory Model)

Vex automatically chooses the right Box strategy:

```vex
// Compiler determines optimal strategy
let data = Box.new(expensive_data)

// Internally becomes one of:
// - Unique: Single owner, zero overhead
// - SharedRc: Multiple owners, single thread
// - AtomicArc: Multiple owners, multi-thread
```

## Interior Mutability

For cases where you need mutation through immutable references:

```vex
// Cell<T> - for Copy types
let cell = Cell.new(5)
cell.set(10)           // Mutate through shared reference
let value = cell.get() // 10

// RefCell<T> - runtime borrow checking
let refcell = RefCell.new([1, 2, 3])
{
    let! r = refcell.borrow_mut()
    r.push(4)
}
let r = refcell.borrow()
println(r)  // [1, 2, 3, 4]
```

## Patterns for Ownership

### Return Ownership

```vex
fn create_data(): [i32] {
    let data = [1, 2, 3]
    data  // Ownership transferred to caller
}

let my_data = create_data()  // Caller owns the data
```

### Borrow for Reading

```vex
fn sum(data: &[i32]): i32 {
    data.iter().sum()
}

let numbers = [1, 2, 3, 4, 5]
let total = sum(&numbers)  // Borrow, don't take ownership
println(numbers)           // Still usable
```

### Mutable Borrow for Modification

```vex
fn double_all(data: &[i32]!) {
    for item in data {
        item *= 2
    }
}

let! numbers = [1, 2, 3]
double_all(&numbers!)
println(numbers)  // [2, 4, 6]
```

### Clone When Needed

```vex
fn needs_ownership(data: [i32]) {
    // ...
}

let original = [1, 2, 3]
needs_ownership(original.clone())  // Keep original
println(original)                   // Still valid
```

## Best Practices

1. **Prefer borrowing over ownership transfer** - More flexible
2. **Use immutable references by default** - More concurrent access
3. **Clone explicitly when needed** - Clear intent
4. **Keep lifetimes simple** - Let the compiler infer when possible
5. **Use smart pointers for shared ownership** - When borrowing isn't enough

## Next Steps

- [Borrowing Deep Dive](/guide/memory/borrowing) - Advanced borrowing patterns
- [Lifetimes](/guide/memory/lifetimes) - Lifetime annotations
- [VUMM](/guide/memory/vumm) - Automatic memory strategy selection
# VUMM - Vex Unified Memory Model

VUMM is Vex's revolutionary memory management system that automatically selects the optimal memory strategy at compile time. Write `Box.new()` and let the compiler choose the best implementation.

::: tip Key Insight
**Vex has NO separate `Rc` or `Arc` types.** There is only `Box<T>`. The compiler automatically determines whether it needs unique ownership, reference counting, or atomic reference counting based on usage analysis.
:::

## Overview

Traditional languages force you to choose:
- **Manual memory** (C/C++): Fast but unsafe
- **Garbage collection** (Java/Go): Safe but has overhead  
- **Explicit smart pointers** (Rust): `Box`, `Rc`, `Arc` - you must choose

**VUMM eliminates the choice burden.** You write `Box.new(value)` and get optimal behavior automatically.

## The Single Type: `Box<T>`

In Vex, there is only one heap allocation type:

```vex
// All three syntaxes are equivalent:
let data = Box(MyData { field: 42 })      // Shorthand
let data = Box.new(MyData { field: 42 })  // Method style
let data = Box<MyData>(value)             // Explicit type
```

**No `Rc` or `Arc` types.** Just `Box` - VUMM handles the rest automatically.

## Automatic BoxKind Selection

At compile time, VUMM analyzes your code and assigns each `Box.new()` call one of three **BoxKinds**:

### 1. Unique

Single owner, zero overhead - just like `malloc`/`free`:

```vex
fn unique_example() {
    let data = Box([1, 2, 3])
    process(data)  // Ownership transferred
    // Memory freed when data goes out of scope
}
// VUMM analysis: No clones, no escapes → Unique
// Generated code: Just malloc + free, zero overhead
```

**When selected:**
- Value never cloned
- Ownership is linear (single owner at any time)
- No thread boundary crossing

**Memory layout:**
```
┌─────────────────┐
│  payload: T     │  ← Just the data, nothing else!
└─────────────────┘
```

### 2. SharedRc

Non-atomic reference counting for single-threaded sharing:

```vex
fn shared_example() {
    let data = Box(ExpensiveResource.load())
    
    let view1 = data.clone()  // Cheap: just increment counter
    let view2 = data.clone()
    
    process(view1)
    use_data(view2)
    
    // Memory freed when last reference dropped
}
// VUMM analysis: Multiple clones, same thread → SharedRc
```

**When selected:**
- Value is cloned (multiple consumers)
- All usage within single thread
- No escapes via `go`, channels, or `spawn`

**Memory layout:**
```
┌─────────────────┐
│  rc: u32        │  ← Non-atomic refcount
├─────────────────┤
│  payload: T     │
└─────────────────┘
```

### 3. AtomicArc

Atomic reference counting for multi-threaded sharing:

```vex
fn atomic_example() {
    let data = Box(SharedState.new())
    
    for _ in 0..10 {
        let data_clone = data.clone()
        go {
            data_clone.read()  // Safe concurrent access
        }
    }
}
// VUMM analysis: Escapes via `go` block → AtomicArc
```

**When selected:**
- Value escapes to another thread (`go` blocks, channels, `spawn`)
- Cross-thread sharing detected
- FFI with potential external escapes

**Memory layout:**
```
┌─────────────────┐
│  rc: AtomicU32  │  ← Atomic refcount
├─────────────────┤
│  payload: T     │
└─────────────────┘
```

## How VUMM Analyzes Your Code

### Analysis Pipeline

```
Box.new() call site
        │
        ▼
┌───────────────────┐
│ Consumer Counting │  How many variables hold this value?
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Escape Analysis  │  Does it cross thread boundaries?
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Kind Resolution  │  max(consumer_result, escape_result)
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Monomorphization │  Generate kind-specific code
└───────────────────┘
```

### Complete Example

```vex
fn main() {
    let config = Box(Config { debug: true })  // Site 0
    
    if should_share {
        let config2 = config.clone()   // Site 0: 2 consumers → SharedRc candidate
        use_config(config2)
    }
    
    go {
        print(config)                  // Site 0: escapes via go → AtomicArc!
    }
}

// Final result: Site 0 = AtomicArc (escape trumps sharing)
```

**Key principle:** `AtomicArc > SharedRc > Unique` - compiler always picks the safest option.

## Reference Count Elision (Perceus)

VUMM implements the Perceus algorithm to eliminate unnecessary reference counting:

```vex
fn elision_example(data: Box<Data>): Box<Data> {
    // Traditional RC: increment on entry, decrement on exit
    // VUMM Perceus: Detects data is passed through unchanged
    // Result: Zero reference count operations!
    
    if data.is_valid() {
        data  // No RC overhead - elided
    } else {
        Box(Data.default())
    }
}
```

### Elision Patterns VUMM Recognizes

```vex
// Pattern 1: Pass-through - ZERO RC operations
fn pass_through(x: Box<T>): Box<T> { x }

// Pattern 2: Temporary clone - increment elided
fn temporary() {
    let data = Box(value)
    let temp = data.clone()
    use_and_drop(temp)
    data  // Last use - decrement elided
}

// Pattern 3: Known last use
fn last_use(data: Box<T>) {
    process(data)  // Decrement moved to callee or elided entirely
}
```

### Memory Reuse

```vex
fn reuse_example() {
    let! data = Box([0u8; 1024])
    
    for i in 0..1000 {
        // Without Perceus: alloc/free each iteration
        // With Perceus: Reuses same memory
        data = Box([i as u8; 1024])
    }
}
// VUMM detects drop→alloc pattern and reuses memory
```

## Explicit Kind Override

When you know better than the compiler, you can override:

```vex
// Force Unique (compiler error if actually needs sharing)
let data: Box<Data, Unique> = Box(value)

// Force SharedRc (even if no clones detected)
let data: Box<Data, SharedRc> = Box(value)

// Force AtomicArc (for future-proofing multi-threaded code)
let data = Box<Data, AtomicArc>(value)

// Let VUMM decide (default - recommended)
let data = Box(value)
```

::: warning
Explicit overrides should be rare. Trust VUMM's analysis in most cases.
:::

## Performance Characteristics

| Operation | Unique | SharedRc | AtomicArc |
|-----------|--------|----------|-----------|
| Create | ~malloc | ~malloc | ~malloc |
| Clone | N/A (move) | +1 plain inc | +1 atomic inc |
| Drop | ~free | +1 plain dec | +1 atomic dec |
| Deref | 0 | 0 | 0 |
| Memory overhead | +0 bytes | +4 bytes | +4 bytes |

## Debug VUMM Decisions

See what VUMM decided:

```bash
# Compile with VUMM explanation
vex check --explain-boxing src/main.vx

# Output:
# src/main.vx:15  Box.new() → Unique    (single consumer)
# src/main.vx:23  Box.new() → SharedRc  (2 consumers, single thread)
# src/main.vx:45  Box.new() → AtomicArc (escapes via go block at line 52)
```

## Best Practices

### 1. Trust VUMM

```vex
// ✅ Good: Let VUMM decide
let data = Box(expensive_computation())

// ❌ Unnecessary: Manual specification
let data: Box<Data, AtomicArc> = Box(expensive_computation())
```

### 2. Minimize Cloning When Possible

```vex
// VUMM optimizes clones, but avoiding them is still better

// Less optimal - triggers SharedRc
let data = Box(vec)
let copy = data.clone()

// Better - use references when possible
let data = Box(vec)
process(&data)
```

### 3. Use References for Read-Only Access

```vex
// Good: VUMM can use Unique if no clones
fn process(data: &Box<Data>) {
    print(data.field)
}

// Triggers SharedRc unnecessarily
fn process(data: Box<Data>): Box<Data> {
    print(data.field)
    data
}
```

## Comparison with Other Languages

| Language | Heap Allocation | Developer Burden |
|----------|----------------|------------------|
| C | `malloc`/`free` | Manual, error-prone |
| C++ | `unique_ptr`, `shared_ptr` | Choose correct type |
| Rust | `Box`, `Rc`, `Arc` | Choose correct type |
| Go | GC handles everything | Runtime overhead |
| **Vex** | `Box.new()` | **Automatic, zero overhead** |

## Summary

::: info TL;DR
1. **Write `Box(value)` or `Box.new(value)`** - that's it
2. **Never look for `Rc` or `Arc` types** - they don't exist in Vex
3. **VUMM picks Unique/SharedRc/AtomicArc** automatically at compile time
4. **Zero runtime overhead** - kind is monomorphized, no branching
5. **Use `--explain-boxing`** to see VUMM's decisions
:::

## Next Steps

- [Borrowing](borrowing) - Reference rules
- [Lifetimes](lifetimes) - Lifetime annotations
- [Performance](/guide/advanced/performance) - Optimization tips
# Modules and Imports

Vex uses a modern `import`/`export` system inspired by Go and JavaScript, ensuring clear module boundaries and explicit dependency management.

## Import Syntax

### Namespace Import

```vex
import * as io from "std.io"

fn main(): i32 {
    io.println("Hello, World!")
    return 0
}
```

### Named Imports

```vex
import { sqrt, PI } from "std.math"

fn main() {
    let result = sqrt(16.0)
    println(f"PI is {PI}")
}
```

## Export Syntax

Everything in a module is **private** by default. Use the `export` keyword to expose items to other modules.

### Exporting Functions and Structs

```vex
// Public function
export fn calculate(x: i32): i32 {
    return x * 2
}

// Public struct
export struct User {
    public:
    name: string
}

// Private helper (not visible outside)
fn internal_aid() { }
```

### Exporting Methods

Methods associated with an exported struct are also typically exported:

```vex
export struct Counter {
    public:
    count: i64
}

export fn (self: &Counter!) increment() {
    self.count += 1
}
```

## File-Based Modules

Each `.vx` file is automatically treated as a module. The file path relative to the project root or standard library determines the import path.

```
src/
├── main.vx          # Root module
└── utils.vx         # imported as "./utils"
```

## Re-exporting

Modules can act as a gateway by re-exporting items from other modules:

```vex
// models/mod.vx
export { User } from "./user"
export { Post } from "./post"
```

## Comparison with Other Languages

| Feature | Vex | Rust | Go |
|---------|-----|------|-----|
| Import | `import { x } from "m"` | `use m.x` | `import "m"` |
| Export | `export fn f()` | `pub fn f()` | `func F()` |
| Namespace | `import * as m` | `use m` | `import m "m"` |

## Best Practices

1. **Export sparingly**: Keep your module's internal implementation details private.
2. **Prefer named imports**: It makes dependencies explicit and easier to track.
3. **Use Namespace Imports for large modules**: For modules like `std.math`, importing as a namespace (`math.sqrt`) improves readability.

## Next Steps

- [Standard Library](/guide/stdlib) - Available modules
- [FFI](/guide/ffi) - Importing C functions
- [Project Configuration](/guide/basics/first-project) - Setting up `vex.json`
# SIMD and Auto-Vectorization

Vex automatically vectorizes array operations. There are **NO custom SIMD types** like `f32x4` - write clean, readable code and the compiler optimizes automatically.

> **Deep Dive:** For implementation details, see:
> - [Tensor and Mask Types](./tensor-mask) - Internal SIMD type system (static & dynamic)
> - [SIR Optimization Pipeline](./sir-pipeline) - How the compiler optimizes

## Overview

SIMD (Single Instruction, Multiple Data) processes multiple elements with single instructions:

```
Scalar:           SIMD (4-wide):
a + b = c         [a₀,a₁,a₂,a₃] + [b₀,b₁,b₂,b₃] = [c₀,c₁,c₂,c₃]
1 op              1 op (but 4 results!)
```

Vex supports two modes:
- **Static Tensors** (`Tensor<T, N>`) - Compile-time size, register-optimized
- **Dynamic Tensors** (`Tensor<T>`) - Runtime size, ideal for ML and variable data

## Automatic Vectorization

Write operations directly on arrays - the compiler handles the rest:

```vex
// Element-wise operations (NO loops needed!)
fn vector_add(a: [f32], b: [f32]): [f32] {
    return a + b  // Automatically vectorized
}

fn scale_array(data: [f32; 1024], factor: f32): [f32; 1024] {
    return data * factor  // Scalar broadcasting
}

fn process(data: [f64]): f64 {
    return $sqrt(\+ data ** 2)  // Sum of squares → sqrt
}
```

### What Gets Vectorized

The compiler automatically vectorizes:

- **Element-wise ops**: `+`, `-`, `*`, `/`, `%`, `**`
- **Comparisons**: `==`, `!=`, `<`, `>`, `<=`, `>=` (return masks)
- **Math functions**: `$sqrt`, `$abs`, `$sin`, `$cos`, `$exp`, `$log`
- **Reductions**: `\+` (sum), `\*` (product), `\<` (min), `\>` (max)
- **Fused ops**: multiply-add via FMA

## SIMD Operators

Vex provides special operators optimized for SIMD:

### Reduction Operators

```vex
let arr = [1, 2, 3, 4, 5]

// Reduction operators (prefix syntax)
let sum = \+ arr         // 15 (sum)
let prod = \* arr        // 120 (product)
let min_val = \< arr     // 1 (min)
let max_val = \> arr     // 5 (max)

// Boolean reductions
let all_positive = \& (arr > 0)   // true (AND)
let any_even = \| (arr % 2 == 0)  // true (OR)
```

### Element-wise Min/Max

```vex
let a = [1, 5, 3, 8]
let b = [2, 3, 6, 4]

let mins = a <? b        // [1, 3, 3, 4] (element-wise min)
let maxs = a >? b        // [2, 5, 6, 8] (element-wise max)
let clamped = a >< (2, 6)  // [2, 5, 3, 6] (clamp to range)
```

### Fused Multiply-Add

```vex
let a = [1.0, 2.0, 3.0, 4.0]
let b = [2.0, 2.0, 2.0, 2.0]
let c = [1.0, 1.0, 1.0, 1.0]

// FMA: a * b + c in single operation (more accurate!)
let result = a * b + c   // Compiler auto-fuses to FMA
```

### Saturating Arithmetic

```vex
let pixels: [u8; 4] = [250, 200, 100, 50]

// Saturating add (clamps at max value, no overflow!)
let brighter = pixels +| 60   // [255, 255, 160, 110]

// Saturating subtract (clamps at 0)
let darker = pixels -| 100    // [150, 100, 0, 0]
```

### Rotate Operations

```vex
let x: [u32] = [0x80000001, 0x00000001]

// Rotate left
let rotl = x <<< 1    // [0x00000003, 0x00000002]

// Rotate right
let rotr = x >>> 1    // [0xC0000000, 0x80000000]
```

## Working with Arrays

### Fixed-Size Arrays

```vex
// Compiler knows size → optimal vectorization
fn dot_product(a: [f64; 256], b: [f64; 256]): f64 {
    return \+ a * b   // Sum of element-wise products
}

fn distance(a: [f32; 3], b: [f32; 3]): f32 {
    return $sqrt(\+ (a - b) ** 2)
}
```

### Dynamic Arrays

```vex
// Dynamic arrays also auto-vectorized
fn normalize(v: [f32]): [f32] {
    let mag = $sqrt(\+ v ** 2)
    return v / mag
}

fn cosine_similarity(a: [f32], b: [f32]): f32 {
    let dot = \+ a * b
    let norm_a = $sqrt(\+ a ** 2)
    let norm_b = $sqrt(\+ b ** 2)
    return dot / (norm_a * norm_b)
}
```

## Practical Examples

### Vector Operations

```vex
fn add_vectors(a: [f32], b: [f32]): [f32] {
    return a + b
}

fn lerp(a: [f32], b: [f32], t: f32): [f32] {
    return a * (1.0 - t) + b * t
}

fn cross_product(a: [f32; 3], b: [f32; 3]): [f32; 3] {
    return a × b  // Cross product operator
}
```

### Finding Extremes

```vex
fn find_max(data: [f32]): f32 {
    return \> data
}

fn find_min_max(data: [f32]): (f32, f32) {
    return (\< data, \> data)
}

fn argmax(data: [f32]): i32 {
    // ArgMax reduction
    return $argmax(data)
}
```

### Matrix Operations

```vex
// Matrix multiply with operator
fn matmul(a: [[f64; 4]; 4], b: [[f64; 4]; 4]): [[f64; 4]; 4] {
    return a <*> b
}

// Transpose
fn transpose(m: [[f64; 4]; 4]): [[f64; 4]; 4] {
    return m'
}

// Matrix-vector multiply
fn transform(m: [[f32; 4]; 4], v: [f32; 4]): [f32; 4] {
    return m <*> v
}
```

### Image Processing

```vex
fn brighten(pixels: [u8], amount: u8): [u8] {
    return pixels +| amount  // Saturating add
}

fn invert(pixels: [u8]): [u8] {
    return 255 - pixels
}

fn blend(a: [u8], b: [u8], alpha: f32): [u8] {
    return (a as [f32] * (1.0 - alpha) + b as [f32] * alpha) as [u8]
}

fn grayscale(r: [u8], g: [u8], b: [u8]): [u8] {
    return (r * 0.299 + g * 0.587 + b * 0.114) as [u8]
}
```

### Signal Processing

```vex
fn normalize_signal(signal: [f32]): [f32] {
    let min = \< signal
    let max = \> signal
    return (signal - min) / (max - min)
}

fn energy(signal: [f32]): f32 {
    return \+ signal ** 2
}

fn rms(signal: [f32]): f32 {
    return $sqrt(\+ signal ** 2 / #signal)
}
```

## Compilation Flags

Enable SIMD optimizations:

```bash
# Auto-detect best SIMD for current CPU
vex compile --simd file.vx

# Specify optimization level
vex compile -O 3 file.vx

# Target specific architecture (for distribution)
vex compile --target-cpu=x86-64-v3 file.vx  # AVX2
vex compile --target-cpu=x86-64-v4 file.vx  # AVX-512
```

## Supported CPU Architectures

Vex's SIMD backend (LLVM-based) supports modern vector extensions out of the box:

| Architecture | Extensions | Note |
|--------------|------------|------|
| **Apple Silicon** | `NEON` | M1, M2, M3 families (ARM64) |
| **ARM64** | `NEON`, `SVE` | Modern servers, mobile |
| **x86-64 v4** | `AVX-512` | High-performance server/workstation |
| **x86-64 v3** | `AVX2`, `FMA` | Most modern desktops (Zen, Haswell+) |
| **x86-64 v2** | `SSE4.2` | Legacy fallback |
| **WebAssembly** | `SIMD128` | Web browsers |

## Standard Intrinsics

These intrinsics are hardware-accelerated on both CPU (SIMD) and GPU:

### Math & Analysis
| Intrinsic | Description | Example |
|-----------|-------------|---------|
| `$sqrt(x)` | Square root | `$sqrt([4, 9])` → `[2, 3]` |
| `$abs(x)` | Absolute value | `$abs([-5, 5])` → `[5, 5]` |
| `$sin(x)`, `$cos(x)` | Trigonometry | `$sin(angle)` |
| `$exp(x)`, `$log(x)` | Exp/Log | `$log(val)` |
| `$pow(b, e)` | Power | `$pow(2, 3)` → `8` |
| `$round(x)` | Rounding | `$round(1.6)` → `2.0` |
| `$floor(x)`, `$ceil(x)` | Floor/Ceil | `$floor(1.6)` → `1.0` |

### Array & Matrix
| Intrinsic | Description | Example |
|-----------|-------------|---------|
| `$sum(x)` | Sum elements | `$sum([1,2,3])` → `6` |
| `$prod(x)` | Product | `$prod([2,3])` → `6` |
| `$min(x)`, `$max(x)` | Min/Max val | `$max([1,5])` → `5` |
| `$argmax(x)` | Index of max | `$argmax([1,5,2])` → `1` |
| `$zeros(shape)` | Zero tensor | `$zeros([2,2])` |
| `$ones(shape)` | Inputs 1s | `$ones([4])` |
| `$eye(n)` | Identity matrix | `$eye(3)` |
| `$conv(d, k)` | Convolution | `$conv(img, kernel)` |
| `$fft(x)` | Fast Fourier | `$fft(audio)` |


## Best Practices

1. **Use operators directly** - No loops needed for element-wise ops
2. **Use reduction operators** - `\+`, `\<`, `\>` are SIMD-optimized
3. **Prefer fixed-size arrays** - Known sizes enable better optimization
4. **Let fusion happen** - Don't split operations unnecessarily

```vex
// ✅ Excellent: Direct operators
fn sum(data: [f64]): f64 {
    return \+ data
}

fn dot_product(a: [f64], b: [f64]): f64 {
    return \+ a * b
}

fn normalize(v: [f64]): [f64] {
    return v / $sqrt(\+ v ** 2)
}

// ❌ Avoid: Manual loops when operators work
fn sum_bad(data: [f64]): f64 {
    let! total = 0.0
    for x in data {
        total = total + x  // Unnecessary!
    }
    return total
}
```

## SIMD Operator Reference

| Operator | Description | Example |
|----------|-------------|---------|
| `\+` | Sum reduction | `\+ [1,2,3]` → `6` |
| `\*` | Product reduction | `\* [1,2,3]` → `6` |
| `\<` | Min reduction | `\< [3,1,2]` → `1` |
| `\>` | Max reduction | `\> [3,1,2]` → `3` |
| `\&` | AND reduction | `\& [t,t,f]` → `false` |
| `\|` | OR reduction | `\| [t,f,f]` → `true` |
| `<?` | Element-wise min | `[1,5] <? [3,2]` → `[1,2]` |
| `>?` | Element-wise max | `[1,5] >? [3,2]` → `[3,5]` |
| `><` | Clamp | `[1,5] >< (2,4)` → `[2,4]` |
| `+\|` | Saturating add | `250u8 +\| 10u8` → `255` |
| `-\|` | Saturating sub | `5u8 -\| 10u8` → `0` |
| `<<<` | Rotate left | `x <<< 1` |
| `>>>` | Rotate right | `x >>> 1` |
| `<*>` | Matrix multiply | `a <*> b` |
| `'` | Transpose | `matrix'` |

## Next Steps

- [GPU Programming](/guide/gpu) - Massively parallel compute
- [FFI](/guide/ffi) - Integrating with native libraries
- [Memory Management](/guide/memory/ownership) - Efficient data handling
# SIR Optimization Pipeline

Vex uses a multi-stage optimization pipeline called **SIR** (Silicon Intermediate Representation) to generate optimal SIMD code. This document explains how the compiler transforms your array operations into blazing-fast machine code.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     VEX COMPILATION PIPELINE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Source (.vx)                                                   │
│       ↓                                                         │
│  ┌─────────┐    ┌─────────┐    ┌──────────────┐                 │
│  │ Parser  │ → │   HIR   │ → │   Codegen    │                   │
│  └─────────┘    └─────────┘    └──────────────┘                 │
│                                       ↓                         │
│                          ┌────────────┴────────────┐            │
│                          ↓                         ↓            │
│                    N ≤ 64 bytes              N > 64 bytes       │
│                          ↓                         ↓            │
│               ┌──────────────────┐    ┌─────────────────────┐   │
│               │   INLINE SIMD    │    │    SIR KERNELS      │   │
│               │  (Pure Vectors)  │    │  (Loop + Prefetch)  │   │
│               └──────────────────┘    └─────────────────────┘   │
│                          ↓                         ↓            │
│               ┌─────────────────────────────────────────────┐   │
│               │              LLVM IR                        │   │
│               └─────────────────────────────────────────────┘   │
│                          ↓                                      │
│               ┌─────────────────────────────────────────────┐   │
│               │   Target: x86 (AVX), ARM (NEON), etc.       │   │
│               └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Optimization Tiers

The compiler classifies operations into tiers based on data size and type:

### Tier 0: Scalar Operations
**Condition:** N = 1  
**Strategy:** Standard scalar operations

```vex
let x: i32 = a + b;  // Simple scalar add
```

### Tier 1: Inline SIMD (≤64 bytes)
**Condition:** N ≤ 64 bytes AND power-of-2 elements AND static size  
**Strategy:** Pure vector values, no loops, no memory allocation

```vex
let a: [i32; 8] = [1, 2, 3, 4, 5, 6, 7, 8];
let b: [i32; 8] = [8, 7, 6, 5, 4, 3, 2, 1];
let c = a + b;  // Single vector add: <8 x i32>
```

**What happens:**
1. Array literals become `insertelement` chains (no alloca!)
2. Operations generate single LLVM vector instructions
3. Results stay in registers until needed

### Tier 1.5: Dynamic Tensor (NEW)
**Condition:** `Tensor<T>` (dynamic size)  
**Strategy:** Fat pointer with vectorized loop

```vex
fn process(data: Tensor<f32>): i64 {
    return data.len();  // O(1) length access from fat pointer
}

// Static → Dynamic coercion at call site
let static_vec: Tensor<i32, 4> = [1, 2, 3, 4];
let len = process(static_vec);  // Automatic fat pointer creation
```

**Fat Pointer Layout:**
```llvm
%DynTensor = type { ptr, i64 }  ; { data_ptr, length }
```

### Tier 2: Small Kernel (64 bytes - 4KB)
**Condition:** 64 < N ≤ 4KB  
**Strategy:** Vectorized loop without prefetch

```vex
let data: [f32; 256] = ...;
let scaled = data * 2.0;  // Loop with <8 x f32> ops
```

### Tier 3: Large Kernel (>4KB)
**Condition:** N > 4KB  
**Strategy:** Unrolled loop + prefetch + multi-vector

```vex
let big_data: [f64; 10000] = ...;
let result = big_data * 2.0;  // Prefetched, unrolled SIMD loop
```

## Inline SIMD Optimizations

For Tier 1 (small arrays), the compiler generates optimal code with no overhead:

### T1.1: Inline Comparison

Array comparisons become single vector `icmp`:

```vex
let a: [i16; 16] = [...];
let b: [i16; 16] = [...];
let eq = a == b;  // Mask<16>
```

**Generated IR:**
```llvm
%cmp = icmp eq <16 x i16> %a, %b  ; Single instruction!
```

### T1.2: Inline Unary Operations

Negation and bitwise NOT become single vector ops:

```vex
let arr: [i32; 8] = [...];
let neg = -arr;  // Negate all elements
let inv = ~arr;  // Bitwise NOT all elements
```

**Generated IR:**
```llvm
%neg = sub <8 x i32> zeroinitializer, %arr
%inv = xor <8 x i32> %arr, <i32 -1, i32 -1, ...>
```

### T1.3: Zero-Alloca Array Literals

Small constant arrays use `insertelement` chains instead of stack allocation:

```vex
let arr: [i32; 4] = [1, 2, 3, 4];
```

**Before optimization:**
```llvm
%arr = alloca [4 x i32]
store i32 1, ptr %arr
store i32 2, ptr ...
; ... lots of stores
```

**After optimization:**
```llvm
%v0 = insertelement <4 x i32> poison, i32 1, i64 0
%v1 = insertelement <4 x i32> %v0, i32 2, i64 1
%v2 = insertelement <4 x i32> %v1, i32 3, i64 2
%v3 = insertelement <4 x i32> %v2, i32 4, i64 3
; No alloca! Pure SSA values
```

### T1.4: Constant Folding

When all values are known at compile time, everything folds:

```vex
fn main(): i32 {
    let target: [i16; 16] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let group = target + 100;
    let xor_result = group ^ target;
    let sum = <+ xor_result;
    return sum;
}
```

**Generated IR:**
```llvm
define i32 @main() {
  ret i32 1425  ; Everything computed at compile time!
}
```

## Function Return Optimization (T2.1)

Functions returning small arrays use vector types internally with automatic coercion:

```vex
fn make_array(base: i32): [i32; 4] {
    return [base, base + 1, base + 2, base + 3];
}
```

**Generated IR:**
```llvm
define [4 x i32] @make_array(i32 %base) {
  ; Build vector with insertelement (not alloca)
  %v0 = insertelement <4 x i32> poison, i32 %base, i64 0
  %add1 = add i32 %base, 1
  %v1 = insertelement <4 x i32> %v0, i32 %add1, i64 1
  ; ...
  
  ; LLVM optimizes to insertvalue for return
  ret [4 x i32] %result
}
```

## Binary Operation Fusion

Chained operations stay in registers without intermediate stores:

```vex
fn compute(a: [f32; 8], b: [f32; 8]): [f32; 8] {
    return (a + b) * (a - b);  // Difference of squares
}
```

**Generated IR (no intermediate alloca):**
```llvm
define [8 x float] @compute([8 x float] %a, [8 x float] %b) {
  %add = fadd <8 x float> %a, %b
  %sub = fsub <8 x float> %a, %b
  %mul = fmul <8 x float> %add, %sub
  ret [8 x float] %mul
}
```

## Reduction Optimizations

Horizontal reductions use LLVM's vector reduction intrinsics:

```vex
let arr: [i32; 8] = [1, 2, 3, 4, 5, 6, 7, 8];
let sum = <+ arr;  // → 36
```

**Generated IR:**
```llvm
%sum = call i32 @llvm.vector.reduce.add.v8i32(<8 x i32> %arr)
```

## Viewing Generated IR

Use the `--emit-llvm` flag to inspect optimization results:

```bash
vex compile --emit-llvm myfile.vx
cat vex-builds/myfile.ll
```

### What to Look For

| Pattern | Good Sign | Bad Sign |
|---------|-----------|----------|
| `alloca` | None for small arrays | Multiple alloca for temps |
| `insertelement` | Chain for literals | N/A |
| `<N x T>` ops | Direct vector ops | Scalar extracts in loop |
| `icmp eq <N x T>` | Single comparison | Element-by-element loop |
| `ret` value | Immediate constant | Complex computation |

## Performance Debugging

### Check If Inlined

```bash
# Should see NO loop for small arrays
vex compile --emit-llvm file.vx
grep -c "br label" vex-builds/file.ll  # 0 for inline SIMD
```

### Check If Constant Folded

```bash
# Should see immediate return value
grep "ret i32" vex-builds/file.ll
# Good: ret i32 42
# Bad:  ret i32 %result
```

### Check Vector Width

```bash
# Should match expected SIMD width
grep "<.*x.*>" vex-builds/file.ll
# <8 x i32> for AVX, <4 x i32> for SSE/NEON
```

## Tuning Thresholds

The inline threshold can be configured (advanced):

```rust
// In vex-sir/src/codegen/backends/simd/inline.rs
pub const INLINE_MAX_BYTES: usize = 64;    // 4 × 128-bit registers
pub const INLINE_MAX_ELEMENTS: usize = 64;  // Max element count
```

Criteria for inline SIMD:
- Total size ≤ 64 bytes
- Element count is power of 2
- Element type is numeric (int or float)

## Summary

| Feature | Status | IR Pattern |
|---------|--------|------------|
| Inline binary ops | ✅ | `add/sub/mul/etc <N x T>` |
| Inline comparison | ✅ | `icmp <N x T>` |
| Inline unary ops | ✅ | `sub zeroinitializer` / `xor -1` |
| Zero-alloca literals | ✅ | `insertelement` chain |
| Vector returns | ✅ | Auto-coercion `<N x T>` ↔ `[N x T]` |
| Constant folding | ✅ | Immediate values |
| Reduction | ✅ | `llvm.vector.reduce.*` |
| **Dynamic Tensor** | ✅ | `{ ptr, i64 }` fat pointer |
| **Static→Dynamic coercion** | ✅ | Automatic at call sites |
| **DynTensor.len()** | ✅ | `extractvalue %t, 1` |

## Next Steps

- [Tensor and Mask Types](./tensor-mask) - Understanding SIMD types
- [SIMD Operators](./index) - Full operator reference
- [GPU Programming](/guide/gpu) - When SIMD isn't enough
# Tensor and Mask Types

Vex provides specialized SIMD types for high-performance vector operations: **Tensor** for numeric vectors and **Mask** for comparison results. Both come in **static** (compile-time size) and **dynamic** (runtime size) variants.

## Overview

While arrays `[T; N]` represent data in memory, **Tensor** and **Mask** represent data optimized for computation:

```
[T; N]         → Memory layout (load/store)
Tensor<T, N>   → Static: Register layout (compile-time size)
Tensor<T>      → Dynamic: Fat pointer (runtime size)
Mask<N>        → Static: Boolean vector
Mask           → Dynamic: Boolean fat pointer
```

The compiler automatically converts between these types and handles coercion from static to dynamic variants.

## Tensor Type

Vex supports two Tensor variants:

### Static Tensor: `Tensor<T, N>`

Compile-time sized SIMD vector - optimal for fixed-size data:

```vex
// These are equivalent at runtime:
let arr: [i32; 4] = [1, 2, 3, 4];
let vec: Tensor<i32, 4> = arr;  // Implicit conversion

// Operations on Tensor stay in registers
let result = vec + vec;  // No memory access!
```

### Dynamic Tensor: `Tensor<T>`

Runtime-sized tensor - ideal for variable-length data and ML workloads:

```vex
// Function accepting any-length tensor
fn sum_all(data: Tensor<f32>): f64 {
    let len = data.len();  // Runtime length query
    // ... process data
}

// Static → Dynamic coercion (automatic)
let static_vec: Tensor<i32, 4> = [1, 2, 3, 4];
let dyn_vec: Tensor<i32> = static_vec;  // Auto-coerced
```

### LLVM Mapping

| Vex Type | LLVM Type | Description |
|----------|-----------|-------------|
| `Tensor<i32, 4>` | `<4 x i32>` | 128-bit integer vector |
| `Tensor<f32, 8>` | `<8 x float>` | 256-bit float vector |
| `Tensor<i16, 16>` | `<16 x i16>` | 256-bit short vector |
| `Tensor<f64, 4>` | `<4 x double>` | 256-bit double vector |
| `Tensor<T>` | `{ ptr, i64 }` | Fat pointer (data + length) |

### Automatic Conversion

The compiler handles Tensor↔Array conversion automatically:

```vex
fn process(data: [f32; 8]): [f32; 8] {
    // Array → Tensor (implicit load into registers)
    let doubled = data * 2.0;  // Tensor operation!
    
    // Tensor → Array (implicit store back)
    return doubled;
}
```

Generated LLVM IR:
```llvm
define [8 x float] @process([8 x float] %data) {
  ; Array loaded as vector
  %vec = ... ; <8 x float>
  
  ; Pure vector multiply (no memory access)
  %doubled = fmul <8 x float> %vec, <float 2.0, ...>
  
  ; Converted back to array for return
  ret [8 x float] %result
}
```

## Mask Type

Mask types represent boolean vectors for comparisons and selections:

### Static Mask: `Mask<N>`

Compile-time sized boolean vector:

```vex
let a: [i32; 4] = [1, 5, 3, 8];
let b: [i32; 4] = [2, 3, 3, 6];

// Comparison produces Mask<4>
let eq: Mask<4> = a == b;  // [false, false, true, false]
let lt: Mask<4> = a < b;   // [true, false, false, false]
```

### Dynamic Mask: `Mask`

Runtime-sized mask for dynamic tensor operations:

```vex
// Function accepting any-length mask
fn count_true(m: Mask): i64 {
    return m.len();  // Runtime length
}

// Static → Dynamic coercion
let static_mask: Mask<4> = Mask.splat(true);
let dyn_mask: Mask = static_mask;  // Auto-coerced
```

### LLVM Mapping

| Vex Type | LLVM Type | Description |
|----------|-----------|-------------|
| `Mask<4>` | `<4 x i1>` | 4-bit mask |
| `Mask<8>` | `<8 x i1>` | 8-bit mask |
| `Mask<16>` | `<16 x i1>` | 16-bit mask |
| `Mask` | `{ ptr, i64 }` | Dynamic mask fat pointer |

### Mask Operations

```vex
let a = [1, 2, 3, 4, 5, 6, 7, 8];
let b = [2, 2, 2, 2, 6, 6, 6, 6];

// Element-wise comparison → Mask
let gt_mask = a > b;   // Mask<8>

// Boolean reductions on masks
let any_gt = \| gt_mask;   // true (any element > ?)
let all_gt = \& gt_mask;   // false (all elements > ?)

// Count true values
let count = $popcount(gt_mask);  // 4

// Use mask for selection
let selected = $select(gt_mask, a, b);  // [2, 2, 3, 4, 6, 6, 7, 8]
```

## Inline SIMD Optimizations

For small arrays (≤64 bytes, power-of-2 elements), Vex generates **pure register operations** with no memory access:

### Tier Classification

| Size | Strategy | Example |
|------|----------|---------|
| N = 1 | Scalar | `let x = a + b` |
| N ≤ 64 bytes | Inline SIMD | `[i32; 8]` → `<8 x i32>` |
| N > 64 bytes | Loop + SIMD | Unrolled vectorized loop |

### Example: Inline vs Loop

```vex
// Small array → Inline SIMD (no loop!)
let small: [i32; 4] = [1, 2, 3, 4];
let doubled = small * 2;
// Generates: %result = mul <4 x i32> %vec, <i32 2, i32 2, i32 2, i32 2>

// Large array → Vectorized loop
let large: [i32; 1024] = ...;
let doubled = large * 2;
// Generates: loop with <8 x i32> operations + prefetch
```

## Type Inference Rules

The compiler infers the result type based on the operation:

| Operation | Input Types | Result Type |
|-----------|-------------|-------------|
| `a + b` | `[T; N], [T; N]` | `Tensor<T, N>` |
| `a * scalar` | `[T; N], T` | `Tensor<T, N>` |
| `a == b` | `[T; N], [T; N]` | `Mask<N>` |
| `a < b` | `[T; N], [T; N]` | `Mask<N>` |
| `-a` | `[T; N]` | `Tensor<T, N>` |
| `~a` | `[T; N]` (integer) | `Tensor<T, N>` |

## Coercion Rules

Automatic type conversions:

| From | To | Cost |
|------|-----|------|
| `Tensor<T, N>` | `Tensor<T>` | Zero-cost (fat pointer wrap) |
| `Mask<N>` | `Mask` | Zero-cost (fat pointer wrap) |
| `[T; N]` | `Tensor<T, N>` | Vector load |
| `[T; N]` | `Tensor<T>` | Alloca + fat pointer |
| `&[T]` | `Tensor<T>` | Reinterpret |

### Dynamic Tensor Methods

```vex
let t: Tensor<f32> = ...;

t.len()       // i64 - number of elements
t.ptr()       // *T - raw data pointer
t.is_empty()  // bool - len == 0
```

### Chained Operations Stay in Registers

```vex
fn compute(a: [f32; 8], b: [f32; 8], c: [f32; 8]): [f32; 8] {
    // All operations happen in registers!
    return (a + b) * c - a;
}
```

LLVM IR (no alloca, pure vectors):
```llvm
define [8 x float] @compute([8 x float] %a, [8 x float] %b, [8 x float] %c) {
  %add = fadd <8 x float> %a, %b
  %mul = fmul <8 x float> %add, %c
  %sub = fsub <8 x float> %mul, %a
  ret [8 x float] %sub
}
```

## Practical Examples

### XOR All Elements

```vex
fn xor_arrays(a: [i16; 16], b: [i16; 16]): [i16; 16] {
    return a ^ b;  // Single SIMD XOR instruction
}
```

Generated:
```llvm
%vxor = xor <16 x i16> %a, %b
```

### Count Matches

```vex
fn count_equal(a: [i32; 8], b: [i32; 8]): i32 {
    let mask = a == b;           // Mask<8>
    let as_int = mask as [i32; 8];  // Convert to integers
    return <+ as_int;            // Sum = count of trues
}
```

### Conditional Selection

```vex
fn clamp_positive(data: [f32; 4]): [f32; 4] {
    let zeros: [f32; 4] = [0.0, 0.0, 0.0, 0.0];
    let positive = data > zeros;  // Mask<4>
    return $select(positive, data, zeros);
}
```

### Parallel Threshold

```vex
fn threshold(data: [u8; 32], thresh: u8): [u8; 32] {
    let mask = data > thresh;
    return $select(mask, data, 0);  // Zero out below threshold
}
```

## Performance Tips

### 1. Keep Operations Chained

```vex
// ✅ Good: Single expression, stays in registers
let result = (a + b) * c;

// ❌ Avoid: Intermediate variables may spill to memory
let temp = a + b;
let result = temp * c;
```

### 2. Use Power-of-2 Sizes

```vex
// ✅ Optimal: Power of 2
let vec: [f32; 8] = ...;

// ⚠️ Less optimal: Not power of 2
let vec: [f32; 7] = ...;  // May need padding
```

### 3. Match SIMD Register Widths

| Target | Optimal Size |
|--------|--------------|
| Apple Silicon (NEON) | 16 bytes (`[f32; 4]`, `[i32; 4]`) |
| AVX2 | 32 bytes (`[f32; 8]`, `[i32; 8]`) |
| AVX-512 | 64 bytes (`[f32; 16]`, `[i32; 16]`) |

### 4. Let Compiler Fold Constants

```vex
// Constant arrays are folded at compile time!
let target: [i16; 16] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let offset = target + 100;  // Computed at compile time!
```

### 5. Use Static vs Dynamic Wisely

```vex
// ✅ Static: When size is known at compile time (faster)
fn process_fixed(data: Tensor<f32, 4>): Tensor<f32, 4> {
    return data * 2.0;  // Pure SIMD, no length checks
}

// ✅ Dynamic: When accepting variable-length data
fn process_any(data: Tensor<f32>): f32 {
    return \+ data / data.len() as f32;  // Works with any size
}

// Static→Dynamic coercion is automatic and efficient
let fixed: Tensor<i32, 4> = [1, 2, 3, 4];
let avg = process_any(fixed);  // Automatic fat pointer creation
```

## Next Steps

- [SIR Optimization Pipeline](./sir-pipeline) - How the compiler optimizes SIMD
- [GPU Programming](/guide/gpu) - Massively parallel compute
- [SIMD Operators](./index) - Full operator reference
# Standard Library

Vex provides a focused standard library and a powerful **Prelude** that is available to all programs automatically.

## The Prelude

Core types are available everywhere without an `import` statement. These include:

### Collections
- `Vec<T>`: Dynamic heap-allocated array.
- `Map<K, V>`: Hash map (SwissTable implementation).
- `Set<T>`: Hash set (built on top of Map).

### Smart Pointers
- `Box<T>`: Revolutionary unified memory management (VUMM). Automatically selects Unique/SharedRc/AtomicArc.

### Error & Optionality
- `Result<T, E>`: For operations that can fail.
- `Option<T>`: For values that may not exist.

---

## Standard Modules

Modules in `std` must be explicitly imported.

### `std.fs` (File System)

Provides basic file and path operations.

```vex
import * as fs from "std.fs"

fn example(): i32 {
    // Path handling
    let path = fs.newPath("test.txt")
    if !path.exists() {
        println("File not found")
    }

    // File I/O
    let! file = fs.open("test.txt") !> |err| {
        println(f"Error: {err.msg}")
        return 1
    }
    
    // ... read/write operations
    return 0
}
```

### `std.math`

Comprehensive math constants and functions.

```vex
import * as math from "std.math"

let root = math.sqrt(16.0)
let pi = math.PI
```

### `std.time`

Time and duration utilities.

```vex
import * as time from "std.time"

let start = time.Instant.now()
// ... do work
let elapsed = start.elapsed()
```

---

## Future Roadmap

The following modules are currently in development and not yet available in the stable standard library:
- `std.json` / `std.toml`: Serialization support.
- `std.net`: Networking (TCP/UDP/HTTP).
- `std.process`: Advanced process management.

---

## Next Steps

- [VUMM Memory Model](/guide/memory/vumm) - How Box works
- [Error Handling](/guide/error-handling) - Using Result and Option
- [FFI](/guide/ffi) - Interacting with C code
# Testing

Vex provides a built-in test runner with a Go-style testing library. Test files use the `.test.vx` extension and are automatically discovered.

## Quick Start

```bash
# Run tests in current directory
vex test

# Run specific test file
vex test tests/math.test.vx

# Run with verbose output
vex test -v

# Filter tests by name
vex test --run "user"

# Run benchmarks
vex test --bench

# Disable parallel execution
vex test --no-parallel

# Set custom timeout (seconds)
vex test --timeout 60
```

## Writing Tests

### Test File Convention

Test files must have the `.test.vx` extension:

```
src/
├── math.vx
└── math.test.vx     # Tests for math module
tests/
└── integration.test.vx
```

### Basic Test Structure

```vex
import { eq, ok, gt } from "testing/core"

// Test functions must start with "test_" and return i32
// Return 0 for pass, non-zero for fail
fn test_addition(): i32 {
    return eq(2 + 2, 4)
}

fn test_string_length(): i32 {
    let s = "hello"
    return eq(s.len(), 5)
}

fn test_comparison(): i32 {
    return gt(10, 5)  // 10 > 5
}
```

### Available Assertions

```vex
import { eq, ne, ok, ok_msg, gt, lt, gte, lte } from "testing/core"

fn test_all_assertions(): i32 {
    // Equality
    if eq(2 + 2, 4) != 0 { return 1 }      // expected == actual
    if ne(2 + 2, 5) != 0 { return 1 }      // expected != actual
    
    // Boolean
    if ok(true) != 0 { return 1 }           // condition is true
    if ok_msg(1 > 0, "1 should be > 0") != 0 { return 1 }
    
    // Comparisons
    if gt(10, 5) != 0 { return 1 }          // 10 > 5
    if lt(5, 10) != 0 { return 1 }          // 5 < 10
    if gte(10, 10) != 0 { return 1 }        // 10 >= 10
    if lte(5, 10) != 0 { return 1 }         // 5 <= 10
    
    return 0
}
```

### Failure Messages

When an assertion fails, it prints a descriptive message:

```
FAIL: eq(3, 5) - expected 5, got 3
FAIL: gt(2, 5) - expected 2 > 5
FAIL: custom error message
```

## TestCtx (Advanced)

For more complex tests, use `TestCtx` with method-based assertions:

```vex
import { TestCtx } from "testing/core"

fn test_with_context(t: &TestCtx!): i32 {
    t.assert_eq(2 + 2, 4)
    t.assert_str_eq("hello", "hello")
    t.assert_true(1 < 2)
    
    if t.failed() {
        return 1
    }
    return 0
}
```

### TestCtx Methods

| Method | Description |
|--------|-------------|
| `assert_eq(actual, expected)` | Assert i64 values equal |
| `assert_ne(actual, expected)` | Assert i64 values not equal |
| `assert_str_eq(actual, expected)` | Assert strings equal |
| `assert_true(cond)` | Assert condition is true |
| `assert_false(cond)` | Assert condition is false |
| `assert_gt(actual, expected)` | Assert actual > expected |
| `assert_lt(actual, expected)` | Assert actual < expected |
| `assert_gte(actual, expected)` | Assert actual >= expected |
| `assert_lte(actual, expected)` | Assert actual <= expected |
| `err(msg)` | Mark test as failed with message |
| `skip(msg)` | Skip test with reason |
| `log(msg)` | Log a message |

## Benchmarks

### Running Benchmarks

```bash
vex test --bench
```

### Writing Benchmarks

Benchmark functions start with `bench_`:

```vex
import { BenchCtx } from "testing/core"

fn bench_array_sum(b: &BenchCtx!): i32 {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    b.reset_timer()
    
    for i in 0..b.n {
        let! sum = 0
        for x in arr {
            sum = sum + x
        }
    }
    
    b.stop_timer()
    return 0
}
```

### BenchCtx Methods

| Method | Description |
|--------|-------------|
| `reset_timer()` | Reset elapsed time to 0 |
| `start_timer()` | Start timing |
| `stop_timer()` | Stop timing |
| `set_bytes(n)` | Set bytes processed per op |
| `ns_per_op()` | Get nanoseconds per operation |
| `ops_per_sec()` | Get operations per second |

## Test Organization

### Multiple Tests in One File

```vex
import { eq, ok } from "testing/core"

// Helper function (not a test)
fn add(a: i32, b: i32): i32 {
    return a + b
}

fn test_add_positive(): i32 {
    return eq(add(2, 3), 5)
}

fn test_add_negative(): i32 {
    return eq(add(-1, 1), 0)
}

fn test_add_zero(): i32 {
    return eq(add(0, 0), 0)
}
```

### Setup and Cleanup with Defer

```vex
import { eq } from "testing/core"

fn test_with_cleanup(): i32 {
    let path = "/tmp/test_file.txt"
    defer { remove_file(path) }  // Always runs
    
    write_file(path, "test data")
    let content = read_file(path)
    
    return eq(content, "test data")
}
```

### Skip Tests Conditionally

```vex
import { TestCtx } from "testing/core"

fn test_platform_specific(t: &TestCtx!): i32 {
    t.skip_if($os() != "linux", "Linux only test")
    
    // Test logic here...
    return 0
}
```

## Test Output

### Standard Output

```
$ vex test

Running 3 test(s)...

  ✓ test_addition
  ✓ test_subtraction  
  ✗ test_multiplication
    FAIL: eq(6, 8) - expected 8, got 6

FAIL
  2 passed, 1 failed in 45.23ms
```

### Verbose Output

```bash
$ vex test -v

=== Found 3 test file(s) ===
  tests/math.test.vx
  tests/string.test.vx
  tests/array.test.vx

=== tests/math.test.vx ===
  ✓ test_addition
  ✓ test_subtraction
  ✗ test_multiplication
    FAIL: eq(6, 8) - expected 8, got 6

FAIL
  2 passed, 1 failed in 45.23ms
```

### CLI Options

| Option | Description |
|--------|-------------|
| `-v, --verbose` | Show detailed output |
| `--run <REGEX>` | Filter tests by name |
| `--no-parallel` | Disable parallel execution |
| `--timeout <SECS>` | Custom timeout per test |
| `--bench` | Run benchmarks |
| `--benchtime <DUR>` | Benchmark duration (e.g., `3s`) |
| `--coverage` | Generate LLVM coverage report |
| `--coverprofile <FILE>` | Output coverage to file (default: `coverage.txt`) |

## Code Coverage

Vex uses LLVM's built-in instrumentation for accurate code coverage measurement.

### Basic Usage

```bash
$ vex test --coverage

📊 Coverage enabled (LLVM instrumentation)
Running 5 test(s)...

  ✓ test_addition
  ✓ test_subtraction
  ✓ test_multiplication

📊 Generating coverage report...

Filename                      Regions    Missed   Cover   Functions  Missed   Cover
-------------------------------------------------------
src/math.vx                        15         2   86.67%          5       0  100.00%
src/string.vx                      22         8   63.64%          7       2   71.43%
-------------------------------------------------------
TOTAL                              37        10   72.97%         12       2   83.33%

✓ Coverage report: coverage.txt
✓ LCOV format: /tmp/vex_coverage/coverage.lcov
✓ HTML report: /tmp/vex_coverage/html/index.html

PASS
  3 passed in 1.23s
```

### Custom Output

```bash
# Save to specific file
$ vex test --coverage --coverprofile my_coverage.lcov

# View HTML report (macOS)
$ open /tmp/vex_coverage/html/index.html
```

### Integration with CI

```yaml
# GitHub Actions example
- name: Run tests with coverage
  run: vex test --coverage --coverprofile coverage.lcov

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    file: coverage.lcov
```

### How It Works

1. **Compile**: Tests are compiled with LLVM profile instrumentation (`-fprofile-instr-generate`)
2. **Run**: Executed binaries generate `.profraw` files
3. **Merge**: `llvm-profdata` merges raw profiles
4. **Report**: `llvm-cov` generates human-readable and LCOV reports

### Requirements

- LLVM tools (`llvm-profdata`, `llvm-cov`)
- Install via Homebrew: `brew install llvm`

## Best Practices

### 1. One Assertion Per Test (When Possible)

```vex
// Good: Focused tests
fn test_user_name(): i32 {
    let user = User.new("Alice")
    return eq(user.name, "Alice")
}

fn test_user_default_active(): i32 {
    let user = User.new("Alice")
    return ok(user.is_active)
}
```

### 2. Descriptive Names

```vex
// Good
fn test_empty_string_returns_zero_length(): i32 { ... }
fn test_negative_index_returns_none(): i32 { ... }

// Avoid
fn test1(): i32 { ... }
fn test_string(): i32 { ... }
```

### 3. Arrange-Act-Assert

```vex
fn test_user_activation(): i32 {
    // Arrange
    let! user = User.new("Alice")
    user.deactivate()
    
    // Act
    user.activate()
    
    // Assert
    return ok(user.is_active)
}
```

### 4. Use Helpers for Complex Setup

```vex
fn create_test_user(): User {
    return User {
        id: 1,
        name: "Test User",
        email: "test@example.com"
    }
}

fn test_user_email(): i32 {
    let user = create_test_user()
    return eq(user.email, "test@example.com")
}
```

## Roadmap

The following features are planned for future releases:

### Subtests (Planned)

```vex
// TODO: Not yet implemented
fn test_math(t: &TestCtx): i32 {
    t.run("addition", fn() {
        eq(2 + 2, 4)
    })
    
    t.run("subtraction", fn() {
        eq(5 - 3, 2)
    })
    
    return t.result()
}
```

### Table-Driven Tests (Planned)

```vex
// TODO: Not yet implemented
fn test_add_cases(t: &TestCtx): i32 {
    let cases = [
        { a: 1, b: 2, want: 3 },
        { a: 0, b: 0, want: 0 },
        { a: -1, b: 1, want: 0 },
    ]
    
    for case in cases {
        t.run(#stringify(case), fn() {
            eq(add(case.a, case.b), case.want)
        })
    }
    return t.result()
}
```

### Fuzzing (Planned)

```bash
# TODO: Not yet implemented
vex test --fuzz FuzzParseJSON --fuzztime 30s
```

```vex
// TODO: Not yet implemented
fn FuzzParseJSON(f: &FuzzCtx): i32 {
    f.add_corpus("[]")
    f.add_corpus("{}")
    
    f.fuzz(fn(data: &[u8]) {
        let _ = parse_json(data)  // Should not panic
    })
    
    return 0
}
```

### Source-Level Coverage (Planned)

Current coverage tracks function execution. Future versions will support line-by-line coverage:

```bash
# TODO: Currently function-level only
vex test --coverage

# Planned output:
#   src/math.vx
#     Line 10: ✓ covered (5 hits)
#     Line 11: ✓ covered (5 hits)  
#     Line 12: ✗ not covered
#     Line 13: ✓ covered (3 hits)
```

### Feature Comparison

| Feature | Go | Rust | Vex |
|---------|:---:|:----:|:---:|
| Test Discovery | ✅ | ✅ | ✅ |
| Filtering | ✅ | ✅ | ✅ |
| Parallel Exec | ✅ | ✅ | ✅ |
| Benchmarks | ✅ | ⚠️ | ✅ |
| Coverage | ✅ | ⚠️ | ✅ |
| Subtests | ✅ | ❌ | 🔜 |
| Table Tests | ✅ | ⚠️ | 🔜 |
| Fuzzing | ✅ | ⚠️ | 🔜 |
| Line Coverage | ✅ | ✅ | 🔜 |

Legend: ✅ Native | ⚠️ External/Nightly | 🔜 Planned | ❌ Not Available

## Next Steps

- [Debugging](/guide/tooling/debugging) - Debug your code
- [Documentation](/guide/tooling/docs) - Document your code
- [CI/CD](/guide/tooling/ci) - Continuous integration
# Type Aliases & Conditional Types

Vex supports type aliases for creating readable type names and conditional types for compile-time type computation.

## Type Aliases

Create new names for existing types:

```vex
// Simple type alias
type UserId = u64
type Email = string
type Score = f64

// Pointer type aliases
type IntPtr = *i32
type MutPtr = *i32!
type VoidPtr = *void

// Function type alias
type Handler = fn(i32): bool
type Callback = fn(string, i32): void

// Generic type alias
type Pair<T> = (T, T)
type Triple<T, U, V> = (T, U, V)
```

### Using Type Aliases

```vex
type UserId = u64
type UserMap = HashMap<UserId, User>

struct User {
    id: UserId,
    name: string,
    score: Score
}

fn get_user(users: &UserMap, id: UserId): Option<&User> {
    users.get(&id)
}

fn main(): i32 {
    let id: UserId = 12345
    let score: Score = 98.5
    
    $println(f"User {id} has score {score}")
    return 0
}
```

### Generic Type Aliases

```vex
// Alias with type parameters
type Result<T> = Result<T, Error>
type AsyncResult<T> = Future<Result<T>>
type Vec2<T> = (T, T)
type Matrix<T> = [[T]]

// Constrained generic alias
type Numeric<T: Add + Mul> = T

// Usage
let point: Vec2<f64> = (1.0, 2.0)
let matrix: Matrix<i32> = [[1, 2], [3, 4]]
```

## Conditional Types

TypeScript-style conditional types for compile-time type computation:

```vex
// Syntax: T extends U ? X : Y
// If T is assignable to U, result is X, otherwise Y

type IsString<T> = T extends string ? true : false
type IsNumber<T> = T extends i32 | i64 | f32 | f64 ? true : false
```

### The `infer` Keyword

Extract types from generic wrappers:

```vex
// Extract inner type from Option
type Unwrap<T> = T extends Option<infer U> ? U : T

// Unwrap<Option<i32>> → i32
// Unwrap<string> → string (not Option, returns T)

// Extract Ok type from Result
type ExtractOk<T> = T extends Result<infer V, infer E> ? V : T

// ExtractOk<Result<i32, string>> → i32

// Extract Error type from Result
type ExtractErr<T> = T extends Result<infer V, infer E> ? E : never

// ExtractErr<Result<i32, string>> → string
```

### Conditional Type Examples

```vex
// Filter types
type OnlyOption<T> = T extends Option<infer U> ? T : never
// OnlyOption<Option<i32>> → Option<i32>
// OnlyOption<string> → never

// Return type extraction
type ReturnType<T> = T extends fn(...): infer R ? R : never
// ReturnType<fn(i32): string> → string

// Parameter extraction
type Parameters<T> = T extends fn(infer P): any ? P : never
// Parameters<fn(i32, string): bool> → (i32, string)

// Array element type
type ElementType<T> = T extends [infer E] ? E : never
// ElementType<[i32]> → i32
```

### Practical Conditional Types

```vex
// Nullable type handling
type NonNullable<T> = T extends nil ? never : T

// Promise/Future unwrapping
type Awaited<T> = T extends Future<infer U> ? Awaited<U> : T
// Awaited<Future<Future<i32>>> → i32 (recursive unwrap)

// Deep readonly
type DeepReadonly<T> = T extends object ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>
} : T

// Flatten nested arrays
type Flatten<T> = T extends [infer U] ? Flatten<U> : T
// Flatten<[[i32]]> → i32
```

## Associated Types in Contracts

Contracts can define associated types:

```vex
contract Iterator {
    type Item;                    // Associated type
    next()!: Option<Self.Item>;
}

contract Container {
    type Item;
    type Iter: Iterator;
    
    iter(): Self.Iter;
    len(): usize;
}

struct IntVec:Container {
    data: [i32],
    
    type Item = i32;
    type Iter = IntVecIter;
    
    fn iter(): IntVecIter {
        IntVecIter { vec: self, index: 0 }
    }
    
    fn len(): usize {
        self.data.len()
    }
}
```

## Type Alias vs Newtype

```vex
// Type alias - same underlying type, interchangeable
type Meters = f64
type Kilometers = f64

let m: Meters = 100.0
let km: Kilometers = m  // OK - same type!

// Newtype pattern - distinct types, not interchangeable
struct Meters(f64)
struct Kilometers(f64)

let m = Meters(100.0)
// let km: Kilometers = m  // ERROR - different types!

fn meters_to_km(m: Meters): Kilometers {
    Kilometers(m.0 / 1000.0)
}
```

## Complex Type Expressions

```vex
// Union type alias
type StringOrNumber = string | i32 | i64 | f64

// Intersection-like (via contracts)
type Printable = impl Display + Debug

// Mapped types
type Readonly<T> = {
    readonly [K in keyof T]: T[K]
}

type Partial<T> = {
    [K in keyof T]?: T[K]
}

type Required<T> = {
    [K in keyof T]-?: T[K]
}
```

## Best Practices

1. **Use aliases for clarity** - `type UserId = u64` is clearer than raw `u64`
2. **Document complex types** - Add comments for conditional types
3. **Prefer newtypes for safety** - When you need type distinction
4. **Keep conditional types simple** - Complex ones are hard to debug

```vex
// ✅ Good: Clear, documented
/// User identifier, guaranteed unique
type UserId = u64

/// Result type for API operations
type ApiResult<T> = Result<T, ApiError>

// ✅ Good: Useful conditional type
type Unwrap<T> = T extends Option<infer U> ? U : T

// ⚠️ Avoid: Overly complex
type ComplexType<T, U, V> = 
    T extends Option<infer A> 
        ? A extends Result<infer B, infer C> 
            ? U extends [infer D] 
                ? (B, C, D, V) 
                : never 
            : never 
        : never
```

## Next Steps

- [Generics](/guide/types/generics) - Generic type parameters
- [Contracts](/guide/types/contracts) - Interfaces and bounds
- [Comptime](/guide/advanced/comptime) - Compile-time computation

# Contracts

Contracts define shared behavior in Vex. They are similar to interfaces in Go or protocols in other languages, but with Vex-specific features like **required fields** and **visibility sections**.

::: tip Key Differences
- Vex uses `contract` keyword, NOT `trait`.
- Method signatures have NO `fn` prefix inside contracts.
- **Contract methods are signatures only** - NO bodies or default implementations!
- Contracts can require **fields** with specific visibility.
:::

## Defining Contracts

```vex
contract Printable {
    print();                    // No 'fn' keyword!
}

contract Describable {
    describe(): string;
    short_description(): string;
}
```

## Contract Fields

Contracts can require implementing structs to have specific fields:

```vex
contract Entity {
    // Required fields
    id: u64
    name: string
    
    // Methods
    validate(): bool;
    display(): string;
}

struct User impl Entity {
    public:
    id: u64       // Required by contract
    name: string  // Required by contract
    email: string // Additional field
}

fn (self: &User) validate(): bool {
    return self.id > 0
}
```

## Implementing Contracts

Use the `impl` keyword on the struct definition or receiver syntax:

```vex
contract Shape {
    area(): f64;
}

struct Circle impl Shape {
    radius: f64
}

fn (self: &Circle) area(): f64 {
    return 3.14159 * self.radius * self.radius
}
```

## Associated Types

Types defined within contracts:

```vex
contract Iterator {
    type Item;
    next()!: Option<Self.Item>;
}

struct Counter impl Iterator {
    count: i32,
    type Item = i32;
}

fn (self: &Counter!) next(): Option<i32> {
    self.count = self.count + 1
    return Some(self.count)
}
```

## Operator Contracts

Vex supports operator overloading through special contracts in the prelude (e.g., `$Add`, `$Eq`, `$Ord`):

```vex
struct Point impl $Add {
    x: f64,
    y: f64
}

fn (self: &Point) op+(other: Point): Point {
    return Point {
        x: self.x + other.x,
        y: self.y + other.y
    }
}
```

## Best Practices

1. **Contracts are pure interfaces**: They define "what" a type can do, not "how".
2. **Use associated types**: For generic behavior that depends on implementing types.
3. **Prefer Prelude contracts**: Leverage built-in contracts like `$Display`, `$Index`, and `$Iterator`.

## Next Steps

- [Generics](/guide/types/generics) - Combining generics and contracts
- [Error Handling](/guide/error-handling) - Contracts for error types
- [Go-style Methods](/guide/basics/functions) - Receiver syntax details
# Enums

Enums (enumerations) in Vex allow you to define a type that can be one of several variants. They are the primary tool for modeling sum types and complex data states.

## Defining Enums

### Simple Enums

```vex
enum Direction {
    North,
    South,
    East,
    West
}

enum Status {
    Pending,
    Active,
    Completed,
    Cancelled
}
```

### Using Enum Values

```vex
let direction = Direction.North
let status = Status.Active

// Pattern matching
match direction {
    Direction.North => println("Going north"),
    Direction.South => println("Going south"),
    Direction.East => println("Going east"),
    Direction.West => println("Going west")
}
```

## Variants with Data

Enum variants can hold data, making them extremely powerful for complex structures.

### Tuple Variants

```vex
enum Message {
    Quit,
    Move(i32, i32),
    Write(string),
    ChangeColor(u8, u8, u8)
}

let msg = Message.Move(10, 20)
let quit = Message.Quit
let text = Message.Write("Hello")
```

### Struct Variants

```vex
enum Event {
    Click { x: i32, y: i32, button: u8 },
    KeyPress { key: char, modifiers: u8 },
    Resize { width: u32, height: u32 }
}

let event = Event.Click { x: 100, y: 200, button: 1 }
```

## Methods on Enums (Go-style)

```vex
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
    Point
}

fn (self: &Shape) area(): f64 {
    match self {
        Shape.Circle { radius } => 3.14159 * radius * radius,
        Shape.Rectangle { width, height } => width * height,
        Shape.Point => 0.0
    }
}
```

## Core Enums: Option and Result

Vex provides two special enums in the **Prelude** for handling optionality and errors.

### `Option<T>`

Used when a value might be missing.

```vex
enum Option<T> {
    Some(T),
    None
}

fn find_item(id: i32): Option<string> {
    if id == 1 { return Some("Found") }
    return None
}

match find_item(1) {
    Some(val) => println(f"Got: {val}"),
    None => println("Nothing found")
}
```

### `Result<T, E>`

Used for operations that can fail.

```vex
enum Result<T, E> {
    Ok(T),
    Err(E)
}

fn divide(a: f64, b: f64): Result<f64, string> {
    if b == 0.0 { return Err("Division by zero") }
    return Ok(a / b)
}
```

## Generic Enums

Enums can be generic over one or more types:

```vex
enum Either<L, R> {
    Left(L),
    Right(R)
}
```

## Recursive Enums

Use `Box<T>` to wrap recursive variants:

```vex
enum List<T> {
    Cons(T, Box<List<T>>),
    Nil
}
```

## C-like Enums

Enums can have explicit discriminant values:

```vex
enum HttpStatus {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    NotFound = 404,
}

let code = HttpStatus.Ok as i32 // 200
```

## Struct Tags & Metadata

Like structs, enums do not use Rust-style attributes (`#[derive]`). Metadata is handled through struct tags or manual contract implementations.

```vex
enum Color {
    Red,
    Green,
    Blue
}
```

## Best Practices

1. **Use enums for state machines**: Clear representation of mutually exclusive states.
2. **Prefer Option over null**: Use `Option<T>` for high-level logic.
3. **Exhaust all variants**: Vex's `match` is exhaustive; use `_` only when absolutely necessary.

## Next Steps

- [Pattern Matching](/guide/basics/control-flow) - Detailed match syntax
- [Contracts](/guide/types/contracts) - Defining shared behavior
- [Error Handling](/guide/error-handling) - Idiomatic Result/Option usage
# Generics

Generics allow you to write flexible, reusable code that works with any type. Vex's generics are monomorphized at compile time, ensuring zero runtime cost.

## Generic Functions

```vex
// Generic function with type parameter T
fn identity<T>(value: T): T {
    return value
}

fn main(): i32 {
    let x = identity(42)        // T = i32
    let y = identity("hello")   // T = string
    return 0
}
```

## Generic Structs

```vex
struct Container<T> {
    public:
    value: T,
}

struct KeyValue<K, V> {
    public:
    key: K,
    value: V,
}
```

## Generic Methods

Define methods on generic structs using receiver syntax:

```vex
struct Wrapper<T> {
    public:
    value: T,
}

// Immutable borrow receiver
fn (self: &Wrapper<T>) get_value(): &T {
    return &self.value
}

// Mutable borrow receiver
fn (self: &Wrapper<T>!) set_value(new_val: T) {
    self.value = new_val
}
```

## Contract Bounds

Constrain generic types using contracts to ensure they support specific operations:

```vex
// T must implement the $Add contract (from prelude)
fn sum_items<T: $Add>(a: T, b: T): T {
    return a + b
}

// Multiple bounds using +
fn process<T: $Display + $Clone>(item: T) {
    let copy = item.clone()
    println(copy.toString())
}
```

## Associated Types

Contracts can define associated types that implementations must provide:

```vex
contract Iterator {
    type Item;
    next()!: Option<Self.Item>;
}

struct Counter impl Iterator {
    count: i32,
    type Item = i32;
}

fn (self: &Counter!) next(): Option<i32> {
    self.count += 1
    return Some(self.count)
}
```

## Const Generics

Generic over constant values known at compile time:

```vex
struct FixedBuffer<const N: usize> {
    data: [u8; N],
}

fn FixedBuffer.new<const N: usize>(): FixedBuffer<N> {
    return FixedBuffer { data: [0; N] }
}

let buffer = FixedBuffer.new<1024>()
```

## Best Practices

1. **Use meaningful names**: `T` is standard for a single type, but `K, V` or names like `Elem` can improve clarity.
2. **Prefer contract bounds**: Explicitly state requirements for better compiler errors and type safety.
3. **Keep it simple**: Don't over-nest generics; if a signature becomes unreadable, consider using a type alias.

## Next Steps

- [Contracts](/guide/types/contracts) - Defining shared behavior
- [Structs](/guide/types/structs) - Data structure definitions
- [Enums](/guide/types/enums) - Sum types and Option/Result
# Pattern Matching

Pattern matching is one of Vex's most powerful features, allowing you to destructure complex data types and execute code based on their shape.

## The `match` Expression

The `match` expression compares a value against a series of patterns. It is exhaustive, meaning you must handle every possible case.

```vex
let x = 1

match x {
    1 => println("One"),
    2 => println("Two"),
    _ => println("Something else")
}
```

## Destructuring

### Structs

```vex
struct Point { x: i32, y: i32 }

let p = Point { x: 0, y: 7 }

match p {
    Point { x: 0, y: 0 } => println("Origin"),
    Point { x, y: 0 } => println(f"On x-axis at {x}"),
    Point { x: 0, y } => println(f"On y-axis at {y}"),
    Point { x, y } => println(f"At ({x}, {y})")
}
```

### Enums

```vex
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(string),
    ChangeColor(i32, i32, i32),
}

fn process(msg: Message) {
    match msg {
        Message.Quit => println("Quit"),
        Message.Move { x, y } => println(f"Move to ({x}, {y})"),
        Message.Write(text) => println(f"Text: {text}"),
        Message.ChangeColor(r, g, b) => println(f"Color: {r}, {g}, {b}"),
    }
}
```

### Tuples

```vex
let pair = (0, -2)

match pair {
    (0, y) => println(f"Y axis: {y}"),
    (x, 0) => println(f"X axis: {x}"),
    (x, y) => println(f"Coords: {x}, {y}"),
}
```

## Advanced Patterns

### Multiple Patterns

Use `|` to match multiple patterns:

```vex
let x = 1

match x {
    1 | 2 => println("One or Two"),
    3 => println("Three"),
    _ => println("Other")
}
```

### Ranges

Match ranges of values (inclusive):

```vex
let age = 15

match age {
    0..=12 => println("Child"),
    13..=19 => println("Teenager"),
    _ => println("Adult")
}
```

### Guards

Add arbitrary boolean conditions to patterns using `if`:

```vex
let pair = (2, 2)

match pair {
    (x, y) if x == y => println("Equal"),
    (x, y) if x + y == 0 => println("Zero sum"),
    _ => println("Other")
}
```

### Binding (`@`)

Bind a value to a variable name while testing it against a pattern:

```vex
let age = 15

match age {
    n @ 13..=19 => println(f"Teenager aged {n}"),
    _ => println("Not a teenager")
}
```

## Deeply Nested Patterns

You can match nested structures:

```vex
enum Shape {
    Circle { center: Point, radius: i32 },
    Rectangle { top_left: Point, bottom_right: Point }
}

let shape = Shape.Circle { 
    center: Point { x: 0, y: 0 }, 
    radius: 10 
}

match shape {
    Shape.Circle { center: Point { x: 0, y: 0 }, .. } => {
        println("Circle at origin")
    },
    Shape.Rectangle { top_left: Point { x, y }, .. } => {
        println(f"Rect starts at {x}, {y}")
    },
    _ => println("Other shape")
}
```

## Best Practices

1.  **Exhaustiveness**: Always handle all cases. Use `_` wildcard only when necessary.
2.  **Clarity**: Use guards for complex logic instead of convoluted patterns.
3.  **Destructuring**: Use destructuring to extract values directly in the match arm.
# Primitive Types

Vex provides a comprehensive set of primitive types for numeric, boolean, and character data.

## Integer Types

### Signed Integers

| Type | Size | Range |
|------|------|-------|
| `i8` | 8 bits | -128 to 127 |
| `i16` | 16 bits | -32,768 to 32,767 |
| `i32` | 32 bits | -2³¹ to 2³¹-1 |
| `i64` | 64 bits | -2⁶³ to 2⁶³-1 |
| `i128` | 128 bits | -2¹²⁷ to 2¹²⁷-1 |

### Unsigned Integers

| Type | Size | Range |
|------|------|-------|
| `u8` | 8 bits | 0 to 255 |
| `u16` | 16 bits | 0 to 65,535 |
| `u32` | 32 bits | 0 to 2³²-1 |
| `u64` | 64 bits | 0 to 2⁶⁴-1 |
| `u128` | 128 bits | 0 to 2¹²⁸-1 |

### Platform-Dependent Types

| Type | Size | Description |
|------|------|-------------|
| `isize` | Platform | Pointer-sized signed integer |
| `usize` | Platform | Pointer-sized unsigned integer |

### Usage

```vex
// Default integer type is i32
let x = 42         // i32

// Explicit type suffix
let a = 42i8       // i8
let b = 42u64      // u64
let c = 1000i128   // i128

// Explicit type annotation
let d: u16 = 1000

// Numeric separators for readability
let million = 1_000_000
let bytes = 0xFF_FF_FF_FF
let binary = 0b1111_0000_1111_0000
```

### Literals in Different Bases

```vex
let decimal = 255
let hex = 0xFF        // Hexadecimal
let octal = 0o377     // Octal
let binary = 0b11111111  // Binary

// With type suffix
let hex_byte = 0xFFu8
let binary_word = 0b1010_1010u16
```

## Floating-Point Types

| Type | Size | Precision | Range |
|------|------|-----------|-------|
| `f16` | 16 bits | ~3 digits | ±65,504 |
| `f32` | 32 bits | ~7 digits | ±3.4×10³⁸ |
| `f64` | 64 bits | ~15 digits | ±1.8×10³⁰⁸ |

### Usage

```vex
// Default float type is f64
let pi = 3.14159       // f64

// Scientific notation
let avogadro = 6.022e23
let planck = 6.626e-34

// Explicit type suffix
let half = 0.5f32      // f32
let precise = 3.14159265358979f64

// Special values
let infinity = f64.INFINITY
let neg_infinity = f64.NEG_INFINITY
let nan = f64.NAN
```

### f16 (Half Precision)

Useful for GPU operations and ML:

```vex
let weights: [f16; 1024] = load_model_weights()
let result = neural_network.forward(weights)
```

## Boolean Type

```vex
let yes: bool = true
let no: bool = false

// Boolean operations
let and_result = true && false   // false
let or_result = true || false    // true
let not_result = !true           // false

// Comparison results
let is_equal = (5 == 5)          // true
let is_greater = (10 > 5)        // true
```

## Character Type

The `char` type represents a Unicode scalar value (4 bytes):

```vex
let letter: char = 'A'
let emoji: char = '🚀'
let chinese: char = '中'
let escape: char = '\n'

// Unicode escapes
let heart: char = '\u{2764}'     // ❤
let smiley: char = '\u{1F600}'   // 😀
```

### Character Methods

```vex
let c = 'A'

c.is_alphabetic()    // true
c.is_numeric()       // false
c.is_alphanumeric()  // true
c.is_whitespace()    // false
c.is_uppercase()     // true
c.is_lowercase()     // false
c.to_lowercase()     // 'a'
c.to_uppercase()     // 'A'
```

## String Type

Vex has a single, powerful `string` type that handles all string operations:

```vex
// String literals
let greeting: string = "Hello, World!"

// String methods
greeting.len()           // 13 (bytes)
greeting.chars().count() // 13 (characters)
greeting.is_empty()      // false
greeting.contains("World") // true

// String concatenation
let name = "Vex"
let message = "Hello, " + name + "!"  // "Hello, Vex!"

// String interpolation (f-strings)
let count = 42
let formatted = f"Count is {count}"
```

::: tip Simpler than Rust
Vex has a single `string` type - no `String` vs `&str` distinction. Just use `string` everywhere!
:::

## Unit Type

The empty tuple `()`, used for functions that don't return a value:

```vex
fn do_something(): () {
    println("Done")
}

// Usually omitted
fn do_something() {
    println("Done")
}
```

## Never Type

The `never` type represents computations that never complete:

```vex
fn infinite_loop(): never {
    loop {}
}

fn panic_always(): never {
    panic("This always panics")
}

// Useful in match arms
let value: i32 = match result {
    Ok(x) => x,
    Err(e) => panic(e)  // Returns never, coerces to i32
}
```

## Type Conversions

### Explicit Casting

```vex
let x: i32 = 42
let y: i64 = x as i64      // Widening (safe)
let z: i16 = x as i16      // Narrowing (may truncate)

let f: f64 = 3.14
let i: i32 = f as i32      // Truncates to 3

let c: char = 'A'
let n: u32 = c as u32      // 65
```

### Safe Conversions

```vex
// Using From/Into contracts
let x: i32 = 42
let y: i64 = i64.from(x)   // Guaranteed safe
let z: i64 = x.into()      // Same thing

// TryFrom for fallible conversions
let big: i64 = 1_000_000
let small: Result<i16, _> = i16.try_from(big)  // Err (overflow)
```

## Type Ranges and Constants

Each numeric type has associated constants:

```vex
i32.MIN        // -2147483648
i32.MAX        // 2147483647
i32.BITS       // 32

u64.MIN        // 0
u64.MAX        // 18446744073709551615

f64.MIN        // Smallest positive value
f64.MAX        // Largest finite value
f64.EPSILON    // Smallest difference
f64.NAN        // Not a Number
f64.INFINITY   // Positive infinity
```

## Overflow Behavior

By default, integer overflow panics in debug mode and wraps in release mode:

```vex
let! x: u8 = 255
x += 1  // Debug: panic! Release: x = 0

// Explicit wrapping
let y = x.wrapping_add(1)  // Always wraps: 0

// Explicit saturation
let z = x.saturating_add(1)  // Clamps: 255

// Checked operations
let result = x.checked_add(1)  // Returns Option<u8>: None
```

## Best Practices

1. **Use `i32` for general integers** - Default, fast on all platforms
2. **Use `usize` for indices** - Matches platform pointer size
3. **Use `f64` for general floats** - Better precision, same speed on modern CPUs
4. **Prefer explicit types at API boundaries** - Clarity over inference
5. **Use checked arithmetic for untrusted input** - Prevent overflow bugs

```vex
// Good: Explicit types at boundaries
fn process_chunk(data: &[u8], offset: usize, len: usize): Result<Vec<u8>, Error> {
    // ...
}

// Good: Let inference work internally
let sum = 0
for n in items { sum += n }
```

## Next Steps

- [Compound Types](/guide/types/compound) - Arrays, tuples, slices
- [User-Defined Types](/guide/types/structs) - Structs and enums
- [Generics](/guide/types/generics) - Type parameters
# Structs

Structs in Vex are pure data types that group related values together. Unlike many other systems languages, Vex structs primarily contain data; behavior is defined externally using Go-style methods.

## Defining Structs

### Basic Struct

```vex
struct Point {
    x: f64,
    y: f64
}

struct User {
    id: u64,
    name: string,
    email: string,
    active: bool
}
```

### Creating Instances

```vex
let origin = Point { x: 0.0, y: 0.0 }

let user = User {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    active: true
}
```

### Field Shorthand

When variable names match field names:

```vex
fn create_user(name: string, email: string): User {
    let id = 123
    return User {
        id,        // Same as id: id
        name,
        email,
        active: true
    }
}
```

## Field Visibility (Section-Based)

Vex uses **section-based** visibility labels instead of per-field keywords:

```vex
export struct Account {
    private:
    internal_id: i64,
    
    readonly:
    balance: f64,
    
    public:
    name: string
}
```

| Label | Access Level |
|-------|--------------|
| `private:` | Module-only (Default) |
| `readonly:` | Publicly readable, Module-only writable |
| `public:` | Fully accessible |

## Go-Style Methods

Methods are defined **outside** the struct using receiver syntax:

```vex
struct Point {
    x: f64,
    y: f64
}

// Static method (Associated function)
fn Point.new(x: f64, y: f64): Point {
    return Point { x, y }
}

// Instance method (Immutable)
fn (self: &Point) length(): f64 {
    return (self.x * self.x + self.y * self.y).sqrt()
}

// Instance method (Mutable)
fn (self: &Point!) translate(dx: f64, dy: f64) {
    self.x += dx
    self.y += dy
}
```

## Struct Tags (Go-Style)

Vex uses Go-style backtick tags for metadata, such as serialization instructions:

```vex
struct User {
    id: u64        `json:"id" db:"pk"`,
    username: string `json:"username"`,
}
```

::: warning No Rust-style Attributes
Vex does **NOT** use `#[derive(...)]` or other attribute syntax. Use struct tags or implement contracts manually.
:::

## Implementing Contracts

Use the `impl` keyword to declare that a struct implements one or more contracts:

```vex
contract Display {
    toString(): string;
}

struct Point impl Display {
    x: f64,
    y: f64
}

fn (self: &Point) toString(): string {
    return f"({self.x}, {self.y})"
}
```

## Tuple Structs

Structs without named fields, useful for the "Newtype" pattern:

```vex
struct Color(u8, u8, u8)
struct UserId(u64)

let red = Color(255, 0, 0)
println(f"R: {red.0}")
```

## Best Practices

1. **Use section-based visibility**: Group relative fields under `private:`, `readonly:`, or `public:`.
2. **Prefer Go-style methods**: Keep data and logic separate for better modularity.
3. **Use Struct Tags**: For all cross-cutting concerns like JSON serialization or DB mapping.

## Next Steps

- [Enums](/guide/types/enums) - Sum types and pattern matching
- [Contracts](/guide/types/contracts) - Interface-driven development
- [Generics](/guide/types/generics) - Type-safe abstractions
