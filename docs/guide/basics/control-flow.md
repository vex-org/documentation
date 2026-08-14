# Control Flow

Vex provides conditional expressions, pattern matching, and several loop forms. The compiler's current surface favors readable block-based control flow.

## if, elif, and else

~~~vex
fn classify(value: i32): i32 {
    if value < 0 {
        return -1;
    } elif value == 0 {
        return 0;
    } else {
        return 1;
    }
}

fn main(): i32 {
    return classify(12);
}
~~~

An if expression can produce a value when both branches have compatible types:

~~~vex
fn main(): i32 {
    let left = 20;
    let right = 22;
    let larger = if left > right { left } else { right };
    return larger;
}
~~~

Keep the branches simple. If a branch needs several statements, use a block with an explicit return or assign the result inside the block.

## match

match is an exhaustive expression for selecting between patterns:

~~~vex
fn label(value: i32): i32 {
    return match value {
        0 => 100,
        1 | 2 | 3 => 200,
        _ => 300,
    };
}

fn main(): i32 {
    return label(2);
}
~~~

Constructor patterns bind enum payloads:

~~~vex
enum State {
    Ready,
    Failed(i32),
}

fn state_code(state: State): i32 {
    return match state {
        State.Ready => 0,
        State.Failed(code) => code,
    };
}

fn main(): i32 {
    return state_code(State.Failed(7));
}
~~~

Use a wildcard only when all remaining values truly share the same behavior. A wildcard can hide a newly added enum variant from review.

## for loops

The range form is the normal counted loop:

~~~vex
fn main(): i32 {
    let! total = 0;
    for value in 0..10 {
        total += value;
    }
    return total;
}
~~~

The upper bound of 0..10 is exclusive. Use 0..=10 when the upper bound is inclusive. Collection iteration uses the same in form:

~~~text
for item in values {
    process(item)
}
~~~

C-style for loops are not part of the supported Vex syntax. Use a range, collection iteration, or while loop.

## while loops

Use while when the next iteration depends on mutable state:

~~~vex
fn sum_to(limit: i32): i32 {
    let! current = 0;
    let! total = 0;
    while current <= limit {
        total += current;
        current += 1;
    }
    return total;
}

fn main(): i32 {
    return sum_to(10);
}
~~~

Make progress toward the loop condition explicit. The compiler can check types and ownership, but it cannot prove that an arbitrary loop terminates.

## loop, break, and continue

loop creates an unbounded loop. break exits it and continue starts the next iteration:

~~~vex
fn first_multiple_of_seven(limit: i32): i32 {
    let! value = 1;
    loop {
        if value > limit {
            break;
        }
        if value % 7 == 0 {
            return value;
        }
        value += 1;
        continue;
    }
    return -1;
}

fn main(): i32 {
    return first_multiple_of_seven(50);
}
~~~

## defer

defer schedules a cleanup expression for the current scope. It is useful for resource-management code, but the exact runtime behavior depends on the resource type and backend. Keep the deferred expression simple and use the standard-library resource APIs described by their own documentation.

~~~text
fn process() {
    let resource = acquire()
    defer resource.close()
    use(resource)
}
~~~

The fragment is intentionally shown as text because acquire, use, and close are library-specific names.

## Next steps

- [Loops and Labels](/guide/basics/loops)
- [Pattern Matching](/guide/types/pattern-matching)
- [Error Handling](/guide/error-handling)
- [Concurrency Overview](/guide/concurrency/overview)
