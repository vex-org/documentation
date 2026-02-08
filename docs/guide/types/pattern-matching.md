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
