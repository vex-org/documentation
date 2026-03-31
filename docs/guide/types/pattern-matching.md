# Pattern Matching

Vex has a real `match` pipeline in the parser, HIR lowering, borrow checker, and codegen. The most exercised paths today are literal and wildcard matches, bindings, tuple and nested tuple destructuring, enum payload patterns, range patterns, guards, and `|` or-patterns.

## `match` is an expression

`match` returns a value, so it works naturally in assignments and returns.

```vex
let x = 5;

let label = match x {
    0 => "zero",
    1 | 2 => "small",
    _ => "other",
};
```

## Common pattern forms

### Wildcards and bindings

```vex
let value = 42;

let result = match value {
    0 => 0,
    n => n * 2,
};
```

### Tuples and nested tuples

Tuple destructuring is one of the best-covered pattern forms in the current test suite.

```vex
let pair = (0, -2);

let axis = match pair {
    (0, y) => y,
    (x, 0) => x,
    (x, y) => x + y,
};

let nested = ((1, 2), 3);

let total = match nested {
    ((a, b), c) => a + b + c,
};
```

### Enums and payload extraction

Enum payload binding is implemented and covered by both source tests and borrow-checker tests.

```vex
fn unwrapOrZero(opt: Option<i32>): i32 {
    return match opt {
        Some(v) => v,
        None => 0,
    };
}

fn describe(res: Result<i32, i32>): i32 {
    return match res {
        Ok(v) => v,
        Err(code) => code,
    };
}
```

### Struct patterns

Shorthand struct destructuring such as `Point { x, y }` is supported and used in repo examples.

```vex
struct Point {
    public:
    x: f32,
    y: f32,
}

fn distanceSquared(p: Point): f32 {
    return match p {
        Point { x, y } => x * x + y * y,
    };
}
```

### Fixed-size array and slice-style patterns

```vex
let values = [1, 2, 3];

match values {
    [a, b, c] => {
        $println(a);
        $println(b);
        $println(c);
    },
    _ => {
        $println("unexpected shape");
    },
};
```

## Ranges, guards, and or-patterns

### Or-patterns

```vex
let x = 2;

let kind = match x {
    1 | 2 => "small",
    3 => "three",
    _ => "other",
};
```

### Range patterns

Both exclusive `a..b` and inclusive `a..=b` range patterns are parsed and used in repo examples.

```vex
let n = 9;

let digits = match n {
    0..10 => "single digit",
    10..=99 => "two digits",
    _ => "large",
};
```

### Guards

Guards add a second condition after the pattern.

```vex
let x = 5;

let selected = match x {
    n if n > 3 => n,
    _ => 0,
};
```

## Current documented surface

- Safe to rely on today: wildcard patterns, bindings, tuple destructuring, nested tuple patterns, enum variant payload binding, range patterns, guards, fixed-size array patterns, and `|` or-patterns.
- Struct destructuring with shorthand field bindings like `Point { x, y }` is also in active use.
- More elaborate struct-field rebinding forms such as `Point { x: px, y: py }` exist in parser and example coverage, but the shorthand form is the most battle-tested shape to document as the baseline.

## Best Practices

1. Prefer `match` when you need exhaustive branching and value extraction in one place.
2. Use guards for extra conditions instead of encoding too much logic into the pattern itself.
3. Treat tuple, enum, and shorthand struct patterns as the most stable core surface when writing portable examples and docs.
