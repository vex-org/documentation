# Introduction

Vex is a systems programming language built around three concerns that are often handled separately: explicit memory ownership, concurrent execution, and data-parallel computation. The language is still pre-1.0, but the core programming model is already concrete enough to learn and use.

## The basic idea

Vex keeps ordinary systems code readable while making the important costs visible:

- bindings are immutable unless mutation is written explicitly with let!;
- values are moved or borrowed according to ownership rules;
- go blocks, channels, async, and await are part of the language surface;
- arrays and tensor-shaped operations can be lowered through Silicon IR (SIR);
- FFI, typed pointers, spans, and raw buffers provide controlled low-level escape hatches.

These parts are not equally mature. Core syntax, data types, ownership, and the checker have the strongest coverage. Concurrency, SIR, GPU backends, FFI, and platform-specific tooling are documented as experimental where their behavior is still being developed. See the [Language Status](/guide/language-status) page before choosing a feature for production work.

## A complete first program

Create hello.vx:

~~~vex
fn main(): i32 {
    let language = "Vex";
    $println("Hello from ", language);
    return 0;
}
~~~

Check and run it from the repository root:

~~~text
target/release/vex lint hello.vx
target/release/vex run hello.vx
~~~

The compiler reports syntax and semantic errors before it produces a program. The [installation guide](/guide/installation) covers building the compiler and the available command-line tools.

## A small data model

Structs hold related fields. Methods are declared outside the struct with a receiver:

~~~vex
struct Point {
    public:
    x: i32,
    y: i32,
}

fn (point: &Point) manhattan_distance(): i32 {
    return point.x + point.y;
}

fn main(): i32 {
    let point = Point { x: 3, y: 4 };
    return point.manhattan_distance();
}
~~~

&Point is an immutable borrow. A mutable receiver is written &Point!; mutation also requires the value at the call site to be held in a mutable binding. The complete rules are in [Ownership](/guide/memory/ownership) and [Borrowing](/guide/memory/borrowing).

## Explicit failure values

Vex uses enum-shaped values for recoverable failure. A function can propagate a matching error with ?:

~~~vex
enum Division {
    Ok(i32),
    Err(i32),
}

fn divide(left: i32, right: i32): Division {
    if right == 0 {
        return Division.Err(1);
    }
    return Division.Ok(left / right);
}

fn calculate(): Division {
    let first = divide(20, 4)?;
    return Division.Ok(first + 1);
}

fn main(): i32 {
    return match calculate() {
        Division.Ok(value) => value,
        Division.Err(code) => code,
    };
}
~~~

`Option<T>` models an absent value; `Result<T, E>` is the standard shape for an operation that may fail. Vex does not use exceptions as the primary error model. See [Enums](/guide/types/enums), [Option](/guide/types/option-api), [Result](/guide/types/result-api), and [Error Handling](/guide/error-handling).

## What makes Vex different

### Mutation is visible

let is immutable. Use let! when a local must change:

~~~vex
fn main(): i32 {
    let! total = 0;
    total += 2;
    total += 3;
    return total;
}
~~~

This is a small rule, but it makes ownership diagnostics and code review easier: the places that can change state are visible in the source.

### Concurrency is explicit

A go block schedules work, while a channel provides a typed communication path:

~~~vex
fn main(): i32 {
    let! channel: Channel<i64> = Channel(1);

    go {
        channel.send(42);
    };

    let value = <-channel;
    $println(value);
    return 0;
}
~~~

The syntax and checker path are implemented, but scheduling and runtime behavior remain experimental. Start with [Concurrency Overview](/guide/concurrency/overview) and [Channels](/guide/concurrency/channels), then test on the target platform you plan to ship.

### Data parallelism has a compiler path

Vex includes operations intended to describe work over arrays and tensors. The SIR pipeline can lower eligible operations to target-specific code, but no source program should assume that every operation will be vectorized or that every GPU backend supports the same set of features. Read [SIMD](/guide/simd/) and [GPU & SIR](/guide/gpu/) together with the status notes on those pages.

## A practical learning path

1. [Install the compiler](/guide/installation).
2. Learn [syntax](/guide/basics/syntax), [variables](/guide/basics/variables), [functions](/guide/basics/functions), and [control flow](/guide/basics/control-flow).
3. Build data models with [primitive types](/guide/types/primitives), [structs](/guide/types/structs), [enums](/guide/types/enums), and [pattern matching](/guide/types/pattern-matching).
4. Learn the memory model through [ownership](/guide/memory/ownership), [borrowing](/guide/memory/borrowing), and [lifetimes](/guide/memory/lifetimes).
5. Add recoverable failure with [error handling](/guide/error-handling).
6. Explore [modules](/guide/modules), [testing](/guide/tooling/testing), and the [standard library](/guide/stdlib).
7. Only then move into experimental areas such as [async](/guide/concurrency/async), [SIR](/guide/simd/sir-pipeline), [GPU programming](/guide/gpu/), or [FFI](/guide/ffi).

## Source of truth

The language guide describes the intended user-facing model. The compiler tests and checked examples determine what the current toolchain accepts. Design notes under the repository's docs/ directory can describe future work and should not be treated as stable syntax unless the corresponding guide page says that the feature is implemented.

If an example in this site fails against the current compiler, report it with the exact command, source, and diagnostic. Documentation should make the language easier to understand while also making its current boundaries impossible to miss.
