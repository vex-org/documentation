export interface TourLesson {
  id: string
  title: string
  section: string
  description: string
  explanation: string
  code: string
  expectedOutput?: string
  hint?: string
  challenge?: {
    prompt: string
    initialCode: string
    validate?: string // substring that must appear in output
  }
}

export const tourSections = [
  { id: 'basics', title: 'Basics', icon: 'book' },
  { id: 'types', title: 'Types & Data', icon: 'layers' },
  { id: 'control', title: 'Control Flow', icon: 'git-branch' },
  { id: 'functions', title: 'Functions', icon: 'code' },
  { id: 'structs', title: 'Structs & Methods', icon: 'box' },
  { id: 'memory', title: 'Memory & Ownership', icon: 'shield' },
  { id: 'collections', title: 'Collections', icon: 'database' },
  { id: 'errors', title: 'Error Handling', icon: 'alert-triangle' },
  { id: 'concurrency', title: 'Concurrency', icon: 'cpu' },
  { id: 'simd', title: 'SIMD & Tensors', icon: 'zap' },
]

export const tourLessons: TourLesson[] = [
  // ─── BASICS ───────────────────────────────────────────────
  {
    id: 'hello',
    title: 'Hello, Vex!',
    section: 'basics',
    description: 'Your very first Vex program.',
    explanation: `Every Vex program starts with a \`main\` function that returns an \`i32\` exit code.

\`println()\` prints any value to the console, followed by a newline.

The return value \`0\` signals success to the operating system — just like C.`,
    code: `fn main(): i32 {
    println("Hello, Vex!")
    return 0
}`,
    expectedOutput: 'Hello, Vex!',
  },
  {
    id: 'variables',
    title: 'Variables',
    section: 'basics',
    description: 'Immutable by default, mutable with let!',
    explanation: `In Vex, variables are **immutable by default** — once assigned, they can't be changed.

Use \`let\` for immutable bindings, and \`let!\` (with an exclamation mark) for mutable ones.

This is the opposite of most languages, and it's intentional. Immutability prevents accidental state changes and data races.

\`\`\`
let x = 5      // immutable — x can't change
let! y = 10    // mutable — y can be reassigned
\`\`\`

Types are usually inferred, but you can annotate them: \`let x: i32 = 5\``,
    code: `fn main(): i32 {
    let x = 42
    println(x)

    let! counter = 0
    counter = counter + 1
    counter = counter + 1
    println(counter)

    // Type annotation
    let name: string = "Vex"
    println(name)
    return 0
}`,
    expectedOutput: '42\n2\nVex',
    challenge: {
      prompt: 'Create a mutable variable called `score` starting at 100, subtract 25 from it, and print the result.',
      initialCode: `fn main(): i32 {
    // Create a mutable variable score = 100
    // Subtract 25 from score 
    // Print score
    return 0
}`,
      validate: '75',
    },
  },
  {
    id: 'types',
    title: 'Primitive Types',
    section: 'basics',
    description: 'Numbers, booleans, strings, and more.',
    explanation: `Vex has a rich set of primitive types:

| Type | Description |
|------|-------------|
| \`i8\` to \`i128\` | Signed integers |
| \`u8\` to \`u128\` | Unsigned integers |
| \`f32\`, \`f64\` | IEEE 754 floats |
| \`bool\` | Boolean (\`true\` / \`false\`) |
| \`string\` | Heap-allocated text |
| \`char\` | Unicode character |

The most common integer type is \`i32\`, and the default float is \`f64\`.`,
    code: `fn main(): i32 {
    let age: i32 = 25
    let pi: f64 = 3.14159
    let alive: bool = true
    let initial: char = 'V'
    let greeting: string = "Hello"

    println(age)
    println(pi)
    println(alive)
    println(greeting)
    return 0
}`,
    expectedOutput: '25\n3.14159\ntrue\nHello',
  },

  // ─── TYPES & DATA ────────────────────────────────────────
  {
    id: 'arrays',
    title: 'Arrays',
    section: 'types',
    description: 'Fixed-size collections with SIMD superpowers.',
    explanation: `Arrays in Vex are fixed-size and stack-allocated.

\`\`\`
let nums = [1, 2, 3, 4]    // [i32; 4]
\`\`\`

Arrays up to 64 bytes are automatically **promoted to SIMD vectors** by the compiler. This means arithmetic on arrays often compiles to a single hardware instruction!

You can access elements with \`arr[i]\` indexing notation.`,
    code: `fn main(): i32 {
    let nums = [10, 20, 30, 40]
    println(nums[0])
    println(nums[3])

    // Array arithmetic — auto-vectorized!
    let a = [1.0, 2.0, 3.0, 4.0]
    let b = [5.0, 6.0, 7.0, 8.0]
    let c = a + b
    println(c)
    return 0
}`,
    expectedOutput: '10\n40\n[6.0, 8.0, 10.0, 12.0]',
  },
  {
    id: 'tuples',
    title: 'Tuples',
    section: 'types',
    description: 'Group different types together.',
    explanation: `Tuples let you combine values of different types into a single compound value.

\`\`\`
let point = (3.14, 2.72)    // (f64, f64)
let pair = ("hello", 42)     // (string, i32)
\`\`\`

Access elements with \`.0\`, \`.1\`, \`.2\`, etc. Tuples are great for returning multiple values from a function.`,
    code: `fn main(): i32 {
    let point = (10, 20)
    println(point.0)
    println(point.1)

    let info = ("Vex", 2024, true)
    println(info.0)
    println(info.1)
    return 0
}`,
    expectedOutput: '10\n20\nVex\n2024',
  },
  {
    id: 'enums',
    title: 'Enums',
    section: 'types',
    description: 'Define types with named variants.',
    explanation: `Enums define a type that can be one of several named variants. Each variant can carry data.

\`\`\`
enum Color {
    Red,
    Green,
    Blue,
    Custom(i32, i32, i32)
}
\`\`\`

Enums are used everywhere in Vex — \`Option<T>\` and \`Result<T, E>\` are both enums!`,
    code: `enum Direction {
    North,
    South,
    East,
    West
}

fn describe(d: Direction): string {
    match d {
        North => return "Going north",
        South => return "Going south",
        East => return "Going east",
        West => return "Going west"
    }
}

fn main(): i32 {
    let dir = North
    println(describe(dir))
    println(describe(West))
    return 0
}`,
    expectedOutput: 'Going north\nGoing west',
  },

  // ─── CONTROL FLOW ────────────────────────────────────────
  {
    id: 'if-else',
    title: 'If / Else',
    section: 'control',
    description: 'Conditional branching.',
    explanation: `Vex uses familiar \`if\` / \`else if\` / \`else\` syntax. No parentheses needed around the condition (but braces are required).

\`\`\`
if x > 10 {
    println("big")
} else if x > 0 {
    println("small")
} else {
    println("zero or negative")
}
\`\`\``,
    code: `fn classify(n: i32): string {
    if n > 100 {
        return "huge"
    } else if n > 10 {
        return "big"
    } else if n > 0 {
        return "small"
    } else {
        return "zero or negative"
    }
}

fn main(): i32 {
    println(classify(200))
    println(classify(42))
    println(classify(3))
    println(classify(-5))
    return 0
}`,
    expectedOutput: 'huge\nbig\nsmall\nzero or negative',
  },
  {
    id: 'loops',
    title: 'Loops',
    section: 'control',
    description: 'For, while, and range-based iteration.',
    explanation: `Vex has three loop forms:

**Range for loop** — iterates over a range:
\`\`\`
for i in 0..5 {
    println(i)    // 0, 1, 2, 3, 4
}
\`\`\`

**While loop** — runs while condition is true:
\`\`\`
while x > 0 {
    x = x - 1
}
\`\`\`

**Loop** — infinite loop (break to exit):
\`\`\`
loop {
    if done { break }
}
\`\`\``,
    code: `fn main(): i32 {
    // Range for loop
    for i in 0..5 {
        println(i)
    }

    // While loop
    let! n = 10
    while n > 0 {
        n = n - 2
    }
    println(n)
    return 0
}`,
    expectedOutput: '0\n1\n2\n3\n4\n0',
  },
  {
    id: 'match',
    title: 'Pattern Matching',
    section: 'control',
    description: 'Powerful match expressions with exhaustive checking.',
    explanation: `\`match\` is Vex's pattern matching expression — more powerful than switch/case.

It supports:
- **Literal matching**: \`42 =>\`
- **Range patterns**: \`1..=9 =>\`
- **Wildcard**: \`_ =>\` (matches anything)
- **Enum destructuring**: \`Some(x) =>\`

The compiler ensures your matches are **exhaustive** — every possible case must be handled.`,
    code: `fn fizzbuzz(n: i32): string {
    match (n % 3, n % 5) {
        (0, 0) => return "FizzBuzz",
        (0, _) => return "Fizz",
        (_, 0) => return "Buzz",
        _ => return n.toString()
    }
}

fn main(): i32 {
    for i in 1..16 {
        println(fizzbuzz(i))
    }
    return 0
}`,
    expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
  },

  // ─── FUNCTIONS ────────────────────────────────────────────
  {
    id: 'functions',
    title: 'Functions',
    section: 'functions',
    description: 'Define reusable functions with type signatures.',
    explanation: `Functions are declared with \`fn\`, parameters have types after a colon, and return type follows the parameter list:

\`\`\`
fn add(a: i32, b: i32): i32 {
    return a + b
}
\`\`\`

**Note:** Vex uses \`: ReturnType\` — not \`-> ReturnType\` like Rust!`,
    code: `fn add(a: i32, b: i32): i32 {
    return a + b
}

fn greet(name: string): string {
    return "Hello, " + name + "!"
}

fn is_even(n: i32): bool {
    return n % 2 == 0
}

fn main(): i32 {
    println(add(3, 4))
    println(greet("World"))
    println(is_even(42))
    println(is_even(7))
    return 0
}`,
    expectedOutput: '7\nHello, World!\ntrue\nfalse',
  },
  {
    id: 'closures',
    title: 'Closures',
    section: 'functions',
    description: 'Anonymous functions that capture their environment.',
    explanation: `Closures are anonymous functions defined with \`|params|: RetType { body }\` syntax.

\`\`\`
let double = |x: i32|: i32 { x * 2 }
\`\`\`

They can be passed to higher-order functions, stored in variables, and capture variables from their surrounding scope.`,
    code: `fn apply(x: i32, f: fn(i32): i32): i32 {
    return f(x)
}

fn main(): i32 {
    let double = |x: i32|: i32 { x * 2 }
    let square = |x: i32|: i32 { x * x }

    println(apply(5, double))
    println(apply(5, square))
    println(apply(3, |x: i32|: i32 { x + 100 }))
    return 0
}`,
    expectedOutput: '10\n25\n103',
    challenge: {
      prompt: 'Write a closure called `triple` that multiplies a number by 3, and apply it to 7.',
      initialCode: `fn apply(x: i32, f: fn(i32): i32): i32 {
    return f(x)
}

fn main(): i32 {
    // Define triple closure
    // Print apply(7, triple)
    return 0
}`,
      validate: '21',
    },
  },
  {
    id: 'recursion',
    title: 'Recursion',
    section: 'functions',
    description: 'Functions calling themselves.',
    explanation: `Vex supports recursion naturally. A classic example is the Fibonacci sequence:

\`\`\`
fn fib(n: i32): i32 {
    if n <= 1 { return n }
    return fib(n - 1) + fib(n - 2)
}
\`\`\`

Be mindful of stack depth with deep recursion. For iterative solutions, use loops.`,
    code: `fn factorial(n: i32): i64 {
    if n <= 1 { return 1 }
    return n as i64 * factorial(n - 1)
}

fn fib(n: i32): i32 {
    if n <= 1 { return n }
    return fib(n - 1) + fib(n - 2)
}

fn main(): i32 {
    println(factorial(10))
    println(fib(10))
    return 0
}`,
    expectedOutput: '3628800\n55',
  },

  // ─── STRUCTS & METHODS ────────────────────────────────────
  {
    id: 'structs',
    title: 'Structs',
    section: 'structs',
    description: 'Custom data types with named fields.',
    explanation: `Structs bundle related data together with named fields:

\`\`\`
struct Point {
    x: f64,
    y: f64
}
\`\`\`

Create instances with field initialization syntax. Access fields with dot notation.`,
    code: `struct Point {
    x: f64,
    y: f64
}

struct Rectangle {
    width: f64,
    height: f64
}

fn main(): i32 {
    let p = Point { x: 3.0, y: 4.0 }
    println(p.x)
    println(p.y)

    let rect = Rectangle { width: 10.0, height: 5.0 }
    println(rect.width * rect.height)
    return 0
}`,
    expectedOutput: '3.0\n4.0\n50.0',
  },
  {
    id: 'methods',
    title: 'Methods',
    section: 'structs',
    description: 'Go-style methods with receiver syntax.',
    explanation: `Vex uses **Go-style methods** — the receiver is declared before the function name:

\`\`\`
fn (self: &Point) distance(): f64 { ... }    // immutable
fn (self: &Point!) scale(f: f64) { ... }     // mutable (note the !)
\`\`\`

**Key differences from Rust:**
- No \`impl\` blocks — methods are standalone functions
- \`&Type\` = immutable borrow, \`&Type!\` = mutable borrow
- Use \`.\` for method calls (not \`::\`)`,
    code: `struct Circle {
    radius: f64
}

fn (self: &Circle) area(): f64 {
    return 3.14159 * self.radius * self.radius
}

fn (self: &Circle) circumference(): f64 {
    return 2.0 * 3.14159 * self.radius
}

fn main(): i32 {
    let c = Circle { radius: 5.0 }
    println(c.area())
    println(c.circumference())
    return 0
}`,
    expectedOutput: '78.53975\n31.4159',
    challenge: {
      prompt: 'Add a `diameter` method to Circle that returns `radius * 2.0`, and print it.',
      initialCode: `struct Circle {
    radius: f64
}

fn (self: &Circle) area(): f64 {
    return 3.14159 * self.radius * self.radius
}

// Add diameter method here

fn main(): i32 {
    let c = Circle { radius: 5.0 }
    println(c.area())
    // Print c.diameter()
    return 0
}`,
      validate: '10.0',
    },
  },
  {
    id: 'contracts',
    title: 'Contracts',
    section: 'structs',
    description: 'Interfaces for polymorphism (like Rust traits).',
    explanation: `Contracts define a set of methods that a type must implement — similar to traits in Rust or interfaces in Go.

\`\`\`
contract Shape {
    area(self: &Self): f64;
}
\`\`\`

Any struct that implements all the methods of a contract **automatically** satisfies it. No explicit \`impl\` declaration needed!`,
    code: `contract Describable {
    describe(self: &Self): string;
}

struct Dog {
    name: string,
    breed: string
}

fn (self: &Dog) describe(): string {
    return self.name + " the " + self.breed
}

struct Cat {
    name: string,
    indoor: bool
}

fn (self: &Cat) describe(): string {
    if self.indoor {
        return self.name + " (indoor cat)"
    }
    return self.name + " (outdoor cat)"
}

fn main(): i32 {
    let d = Dog { name: "Rex", breed: "Shepherd" }
    let c = Cat { name: "Whiskers", indoor: true }
    println(d.describe())
    println(c.describe())
    return 0
}`,
    expectedOutput: 'Rex the Shepherd\nWhiskers (indoor cat)',
  },

  // ─── MEMORY & OWNERSHIP ──────────────────────────────────
  {
    id: 'ownership',
    title: 'Ownership',
    section: 'memory',
    description: 'Vex tracks who owns what — no garbage collector needed.',
    explanation: `Vex uses **ownership** to manage memory — similar to Rust, but simpler.

**Rules:**
1. Each value has exactly **one owner**
2. When the owner goes out of scope, the value is **automatically dropped**
3. Ownership can be **moved** (transferred) or **borrowed** (shared temporarily)

This means: **no garbage collector, no manual free(), no memory leaks**.

Use \`&T\` (immutable borrow) and \`&T!\` (mutable borrow) to share without transferring ownership.`,
    code: `fn main(): i32 {
    // Stack values — Copy semantics
    let x = 42
    let y = x       // Copy — both x and y are valid
    println(x)
    println(y)

    // Borrowing
    let name = "Vex"
    let r = &name    // Borrow — name still owns it
    println(r)
    println(name)    // Still valid!
    return 0
}`,
    expectedOutput: '42\n42\nVex\nVex',
  },
  {
    id: 'borrowing',
    title: 'Borrowing',
    section: 'memory',
    description: 'References let you use data without taking ownership.',
    explanation: `Borrowing lets you access data **without taking ownership**.

\`\`\`
fn print_length(s: &string) {   // borrows s
    println(s.len())
}                                 // borrow ends here
\`\`\`

**Borrowing rules:**
- You can have **many immutable borrows** (\`&T\`) simultaneously
- OR **one mutable borrow** (\`&T!\`) — but not both
- Borrows must not outlive the owner

This prevents data races at compile time!`,
    code: `fn show(s: &string) {
    println(s)
}

fn double(n: &i32!): i32 {
    return n * 2
}

fn main(): i32 {
    let msg = "Hello, borrowing!"
    show(&msg)     // borrow msg
    println(msg)   // still valid

    let val = 21
    println(double(&val))
    return 0
}`,
    expectedOutput: 'Hello, borrowing!\nHello, borrowing!\n42',
  },

  // ─── COLLECTIONS ──────────────────────────────────────────
  {
    id: 'vec',
    title: 'Vec<T> — Dynamic Arrays',
    section: 'collections',
    description: 'Growable arrays with push, pop, and iteration.',
    explanation: `\`Vec<T>\` is Vex's dynamic array — it grows automatically as you add elements.

\`\`\`
let! v = Vec.new<i32>()
v.push(1)
v.push(2)
v.push(3)
println(v.len())    // 3
\`\`\`

Note: \`Vec\` must be declared with \`let!\` because pushing modifies it.

Access elements with \`v.get(i)\` (returns \`Option<T>\`) or iterate with \`for i in 0..v.len()\`.`,
    code: `fn main(): i32 {
    let! v = Vec.new<i32>()
    v.push(10)
    v.push(20)
    v.push(30)
    v.push(40)

    println(v.len())

    for i in 0..v.len() {
        println(v.get(i))
    }
    return 0
}`,
    expectedOutput: '4\n10\n20\n30\n40',
  },
  {
    id: 'map',
    title: 'Map<K,V> — Hash Maps',
    section: 'collections',
    description: 'Key-value storage with O(1) lookup.',
    explanation: `\`Map<K,V>\` is a high-performance hash map (Swiss Table implementation internally).

\`\`\`
let! m = Map.new<string, i32>()
m.set("key", 42)
let val = m.get("key")    // Option<i32>
\`\`\`

Maps support \`set\`, \`get\`, \`contains\`, \`remove\`, and \`len\` operations.`,
    code: `fn main(): i32 {
    let! scores = Map.new<string, i32>()
    scores.set("alice", 95)
    scores.set("bob", 87)
    scores.set("charlie", 92)

    println(scores.get("alice"))
    println(scores.len())
    println(scores.contains("bob"))

    scores.remove("bob")
    println(scores.len())
    println(scores.contains("bob"))
    return 0
}`,
    expectedOutput: '95\n3\ntrue\n2\nfalse',
  },

  // ─── ERROR HANDLING ───────────────────────────────────────
  {
    id: 'option',
    title: 'Option<T>',
    section: 'errors',
    description: 'Represent the presence or absence of a value.',
    explanation: `\`Option<T>\` handles nullable values safely — no null pointer exceptions!

\`\`\`
enum Option<T> {
    Some(T),    // has a value
    None        // no value
}
\`\`\`

Use \`match\` to handle both cases, or methods like \`.unwrap()\`, \`.unwrapOr(default)\`.`,
    code: `fn find_first_even(nums: &Vec<i32>): Option<i32> {
    for i in 0..nums.len() {
        let n = nums.get(i)
        if n % 2 == 0 {
            return Some(n)
        }
    }
    return None
}

fn main(): i32 {
    let! nums = Vec.new<i32>()
    nums.push(1)
    nums.push(3)
    nums.push(4)
    nums.push(7)

    match find_first_even(&nums) {
        Some(n) => println(n),
        None => println("No even number found")
    }
    return 0
}`,
    expectedOutput: '4',
  },
  {
    id: 'result',
    title: 'Result<T, E>',
    section: 'errors',
    description: 'Handle operations that can fail.',
    explanation: `\`Result<T, E>\` represents either success (\`Ok(T)\`) or failure (\`Err(E)\`).

\`\`\`
fn divide(a: f64, b: f64): Result<f64, string> {
    if b == 0.0 { return Err("division by zero") }
    return Ok(a / b)
}
\`\`\`

Use \`match\` to handle both cases, or the \`?\` operator for error propagation.`,
    code: `fn divide(a: f64, b: f64): Result<f64, string> {
    if b == 0.0 {
        return Err("division by zero")
    }
    return Ok(a / b)
}

fn main(): i32 {
    match divide(10.0, 3.0) {
        Ok(val) => println(val),
        Err(msg) => println(msg)
    }

    match divide(10.0, 0.0) {
        Ok(val) => println(val),
        Err(msg) => println(msg)
    }
    return 0
}`,
    expectedOutput: '3.333333\ndivision by zero',
  },

  // ─── CONCURRENCY ──────────────────────────────────────────
  {
    id: 'goroutines',
    title: 'Goroutines',
    section: 'concurrency',
    description: 'Lightweight concurrent tasks with go { }.',
    explanation: `Vex has lightweight goroutines powered by an M:N scheduler (many tasks, few OS threads).

\`\`\`
go {
    // runs concurrently
    println("Hello from goroutine!")
};
\`\`\`

Goroutines are incredibly cheap — you can spawn millions of them. They're perfect for I/O-bound and parallel workloads.`,
    code: `fn main(): i32 {
    let ch = Channel.new<i32>(4)

    for i in 0..4 {
        let sender = ch
        go {
            sender.send(i * 10)
        };
    }

    // Collect results
    let! sum = 0
    for _ in 0..4 {
        sum = sum + ch.recv()
    }
    println(sum)
    return 0
}`,
    expectedOutput: '60',
  },
  {
    id: 'channels',
    title: 'Channels',
    section: 'concurrency',
    description: 'Safe communication between goroutines.',
    explanation: `Channels are the primary way goroutines communicate — following the motto: *"Don't communicate by sharing memory; share memory by communicating."*

\`\`\`
let ch = Channel.new<i32>(10)   // buffered channel (capacity 10)
ch.send(42)                      // send a value
let val = ch.recv()              // receive a value
\`\`\`

Channels are typed (\`Channel<T>\`) and bounded. \`send\` blocks when full, \`recv\` blocks when empty.`,
    code: `fn producer(ch: Channel<string>, id: i32) {
    ch.send("message from " + id.toString())
}

fn main(): i32 {
    let ch = Channel.new<string>(8)

    for i in 0..4 {
        let c = ch
        go {
            producer(c, i)
        };
    }

    for _ in 0..4 {
        println(ch.recv())
    }
    return 0
}`,
  },

  // ─── SIMD & TENSORS ──────────────────────────────────────
  {
    id: 'auto-vectorization',
    title: 'Auto-Vectorization',
    section: 'simd',
    description: 'Arrays automatically become SIMD vectors.',
    explanation: `Vex's killer feature: **arrays automatically promote to SIMD vectors**.

\`\`\`
let a = [1.0, 2.0, 3.0, 4.0]
let b = [5.0, 6.0, 7.0, 8.0]
let c = a + b    // Single SIMD instruction!
\`\`\`

The compiler maps array operations to hardware vector instructions (SSE, AVX, NEON) — you write simple code, the compiler generates optimal SIMD.

Horizontal reductions use prefix operators:
- \`<+ arr\` — sum all elements
- \`<* arr\` — multiply all elements
- \`<?| arr\` — find minimum
- \`>?| arr\` — find maximum`,
    code: `fn main(): i32 {
    let a = [1.0, 2.0, 3.0, 4.0]
    let b = [5.0, 6.0, 7.0, 8.0]

    // Element-wise operations
    let sum = a + b
    println(sum)

    let product = a * b
    println(product)

    // Scalar broadcast
    let scaled = a * 2.0
    println(scaled)

    // Horizontal reduction
    let total = <+ a
    println(total)
    return 0
}`,
    expectedOutput: '[6.0, 8.0, 10.0, 12.0]\n[5.0, 12.0, 21.0, 32.0]\n[2.0, 4.0, 6.0, 8.0]\n10.0',
  },
  {
    id: 'congratulations',
    title: 'Congratulations! 🎉',
    section: 'simd',
    description: "You've completed the Tour of Vex!",
    explanation: `**Congratulations!** You've completed the Tour of Vex!

You've learned:
- ✅ Variables, types, and mutability (\`let\` vs \`let!\`)
- ✅ Control flow: \`if\`, \`for\`, \`while\`, \`match\`
- ✅ Functions, closures, and recursion
- ✅ Structs, methods, and contracts
- ✅ Ownership and borrowing
- ✅ Collections: \`Vec<T>\`, \`Map<K,V>\`
- ✅ Error handling: \`Option<T>\`, \`Result<T,E>\`
- ✅ Concurrency: goroutines and channels
- ✅ SIMD auto-vectorization

**What's next?**
- 📖 [Read the full documentation](/docs/) for in-depth coverage
- 🎮 [Try the Playground](/playground) for free-form experimentation
- 📦 [Browse packages](/packages) to see what the community has built
- ⬇️ [Install Vex](/download) on your machine

*Every Cycle, Every Core, Every Time.* 🚀`,
    code: `// You're ready to write Vex!
// Here's a mini program combining what you learned:

struct Counter {
    value: i32
}

fn (self: &Counter!) increment() {
    self.value = self.value + 1
}

fn (self: &Counter) get(): i32 {
    return self.value
}

fn main(): i32 {
    let! c = Counter { value: 0 }
    
    for _ in 0..10 {
        c.increment()
    }
    
    println("Final count: " + c.get().toString())

    // SIMD bonus
    let scores = [95.0, 87.0, 92.0, 88.0]
    let average = <+ scores / 4.0
    println("Average: " + average.toString())
    
    return 0
}`,
  },
]
