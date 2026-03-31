# Ownership and Borrowing

Vex is move-first. Values have an owner, moves transfer that ownership, and borrows let code inspect or mutate data without taking it over.

## The default rule: moves

Assignment and argument passing move non-`$Copy` values unless you borrow them.

```vex
let data = Vec.new<i32>();
let other = data;
// data.len();  // moved

fn consume(v: Vec<i32>) {
    $println(v.len());
}

let more = Vec.new<i32>();
consume(more);
// more.len();  // moved
```

That is the core rule to keep in mind for `Vec`, `Box`, `string`, maps, sets, and most user-defined structs.

## `$Copy` values

Some values copy instead of move.

Typical examples:

- integer types
- floating-point types
- `bool`
- `char`
- `str`
- raw pointer values like `ptr`

```vex
let x: i32 = 5;
let y = x;
$println(x);
$println(y);
```

For larger or owning values, assume move semantics unless the type explicitly behaves as `$Copy`.

## Borrowing with references

Borrowing avoids transfer of ownership.

### Immutable borrow: `&T`

```vex
fn show_len(s: &string) {
    $println(s.len());
}

let msg: string = "hello";
show_len(&msg);
show_len(&msg);
$println(msg);
```

### Mutable borrow: `&T!`

Mutable borrows require a mutable binding on the owner side.

```vex
fn append_item(v: &Vec<i32>!) {
    v.push(42);
}

let! values = Vec.new<i32>();
append_item(&values!);
$println(values.len());
```

The usual rule applies: many immutable borrows or one mutable borrow, but not both at the same time.

## Partial moves and field access

Moving one field of a struct does not mean every field becomes unusable. Copy fields can remain readable.

```vex
struct Pair {
    public:
    name: string,
    age: i32,
}

let p = Pair { name: "Alice", age: 30 };
let name = p.name;
$println(p.age);
// $println(p.name);
```

## Lifetimes are mostly inferred

Vex aims to infer reference lifetimes instead of making users write annotations.

```vex
fn longest(x: &string, y: &string): &string {
    if x.len() > y.len() {
        return x;
    }
    return y;
}
```

The main mental model is simple: returned references must still point at data that outlives the use site.

## Heap ownership with `Box`

Use `Box` when the value should live on the heap or when a recursive type needs an indirection point.

```vex
let boxed = Box.new(42);
$println(boxed.get());
```

`Box` still participates in the same ownership model. It is an owning value, not a special escape hatch from borrowing rules.

## Views over memory

Not every API should take ownership.

- use `&T` or `&T!` for ordinary borrows
- use `Span<T>` for non-owning contiguous views
- use `Ptr<T>` and `RawBuf` for low-level memory work

That separation keeps high-level code safe and low-level code explicit.

## How VUMM fits in

VUMM is the compiler/runtime strategy behind `Box`, not a second ownership model you manually write every day. In user code, you still write `Box.new(value)` or `Box(value)`. The compiler can lower that to different internal ownership strategies as needed.

## Practical guidance

1. Borrow first, move only when ownership transfer is intended.
2. Use immutable borrows by default.
3. Make mutation explicit with `let!` and `&value!`.
4. Treat `Box` as an owning heap value, not as a substitute for borrowing.
5. Keep raw memory work isolated behind `Ptr<T>`, `Span<T>`, and `RawBuf`.

## See also

- [Borrowing](./borrowing)
- [Lifetimes](./lifetimes)
- [VUMM](./vumm)
- [Contracts](../types/contracts)
