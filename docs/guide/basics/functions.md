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
