# Contracts Reference

This page is a complete reference of all standard contracts available in Vex. Contracts define shared behavior across types, similar to traits in Rust or interfaces in Go.

## Contract Categories

Contracts are organized into three layers:

| Layer                  | Location                       | Description                                             |
| ---------------------- | ------------------------------ | ------------------------------------------------------- |
| **Operator Contracts** | `prelude/ops.vx`               | Arithmetic, bitwise, comparison, indexing operators     |
| **Builtin Contracts**  | `prelude/builtin_contracts.vx` | Core language capabilities (Display, Clone, Drop, etc.) |
| **Standard Contracts** | `lib/std/contracts/src/`       | Extended capabilities (conversion, collections, memory) |

---

## Operator Contracts (`prelude/ops.vx`)

### Arithmetic Operators

#### `$Add` -- Addition (`a + b`)

```vex
contract $Add {
    op+(rhs: Self): Self
}
```

```vex
struct Vector2: $Add {
    public:
    x: f64,
    y: f64,
}

fn (self: &Vector2) op+(rhs: Vector2): Vector2 {
    return Vector2.new(self.x + rhs.x, self.y + rhs.y)
}
```

#### `$Sub` -- Subtraction (`a - b`)

```vex
contract $Sub {
    op-(rhs: Self): Self
}
```

#### `$Mul` -- Multiplication (`a * b`)

```vex
contract $Mul {
    op*(rhs: Self): Self
}
```

#### `$Div` -- Division (`a / b`)

```vex
contract $Div {
    op/(rhs: Self): Self
}
```

#### `$Mod` -- Modulo (`a % b`)

```vex
contract $Mod {
    op%(rhs: Self): Self
}
```

#### `$Neg` -- Unary Negation (`-a`)

```vex
contract $Neg {
    op-(): Self
}
```

```vex
fn (self: &Vector2) op-(): Vector2 {
    return Vector2.new(-self.x, -self.y)
}
```

### Bitwise Operators

#### `$BitAnd` -- Bitwise AND (`a & b`)

```vex
contract $BitAnd {
    op&(rhs: Self): Self
}
```

#### `$BitOr` -- Bitwise OR (`a | b`)

```vex
contract $BitOr {
    op|(rhs: Self): Self
}
```

#### `$BitXor` -- Bitwise XOR (`a ^ b`)

```vex
contract $BitXor {
    op^(rhs: Self): Self
}
```

#### `$BitNot` -- Bitwise NOT (`~a`)

```vex
contract $BitNot {
    op~(): Self
}
```

#### `$Shl` -- Left Shift (`a << b`)

```vex
contract $Shl {
    op<<(rhs: i32): Self
}
```

#### `$Shr` -- Right Shift (`a >> b`)

```vex
contract $Shr {
    op>>(rhs: i32): Self
}
```

### Comparison Operators

#### `$Eq` -- Equality (`a == b`, `a != b`)

```vex
contract $Eq {
    op==(rhs: Self): bool
    op!=(rhs: Self): bool  // auto-implemented as !(a == b)
}
```

```vex
struct Point: $Eq {
    public:
    x: i32,
    y: i32,
}

fn (self: &Point) op==(rhs: Point): bool {
    return self.x == rhs.x && self.y == rhs.y
}
// op!= is auto-generated: !self.op==(rhs)
```

#### `$Ord` -- Ordering (`a < b`, `a > b`, `a <= b`, `a >= b`)

```vex
contract $Ord {
    op<(rhs: Self): bool
    op>(rhs: Self): bool
    op<=(rhs: Self): bool
    op>=(rhs: Self): bool
}
```

#### `$Not` -- Logical NOT (`!a`)

```vex
contract $Not {
    op!(): bool
}
```

### Other Operator Contracts

#### `$Index` -- Indexing (`a[i]`)

```vex
contract $Index {
    op[](index: usize): Self.Element
}
```

```vex
struct Grid: $Index {
    public:
    data: Vec<i32>,
}

fn (self: &Grid) op[](index: usize): i32 {
    return self.data[index]
}

let grid = Grid.new(10)
let value = grid[3]  // calls op[]
```

---

## Builtin Contracts (`prelude/builtin_contracts.vx`)

### `$Display` -- Human-Readable String

Used by `$println("{}", value)` and `toString()`.

```vex
contract $Display {
    fn toString(): string
}
```

```vex
struct User: $Display {
    public:
    name: string,
    age: i32,
}

fn (self: &User) toString(): string {
    return f"User({self.name}, {self.age})"
}
```

### `$Debug` -- Debug String Representation

Used by `$println("{:?}", value)`.

```vex
contract $Debug {
    fn debug(): string
}
```

### `$Clone` -- Deep Copy

Creates an independent copy of a value. For heap types, allocates new memory.

```vex
contract $Clone {
    fn clone(): Self
}
```

```vex
struct Node: $Clone {
    public:
    value: i32,
    children: Vec<Node>,
}

fn (self: &Node) clone(): Node {
    return Node.new(self.value, self.children.clone())
}
```

### `$Drop` -- RAII Cleanup

Called automatically when a value goes out of scope. Used for releasing resources.

```vex
contract $Drop {
    fn drop()
}
```

```vex
struct File: $Drop {
    public:
    handle: i32,
}

fn (self: &File!) drop() {
    unsafe { close(self.handle) }
    $println("File closed")
}
```

### `$Hash` -- Hash Value

Used by `Map` and `Set` for key hashing. Uses AHash algorithm (fast + DoS-resistant).

**Rule:** `a == b` implies `hash(a) == hash(b)`.

```vex
contract $Hash {
    fn hash(): u64
}
```

### `$Bytes` -- Binary Serialization

Zero-copy byte representation for FFI, network I/O, and file serialization.

```vex
contract $Bytes {
    fn asBytes(): &[u8]
    fn fromBytes(bytes: &[u8]): Result<Self, BytesError>
}
```

```vex
struct PacketHeader: $Bytes {
    public:
    version: u8,
    length: u16,
    flags: u8,
}

fn (self: &PacketHeader) asBytes(): &[u8] {
    return ...  // zero-copy view of struct bytes
}
```

### Capability Marker Contracts

These are **marker contracts** -- they have no methods and are used by the compiler for static analysis.

#### `$Copy` -- Bitwise Copyable

Types that can be duplicated by copying their bits. All primitives are `$Copy`.

```vex
// Marker -- no methods
contract $Copy { }
```

#### `$Pin` -- Self-Referential Prevention

Prevents moving self-referential types. Auto-applied by the compiler when self-referential fields are detected.

```vex
contract $Pin { }  // marker
```

#### `$Owner` -- Owning Capability

The value is responsible for eventual destruction. Applied to `Box<T>`, `Vec<T>`, `string`, etc.

```vex
contract $Owner { }  // marker
```

#### `$BorrowedView` -- Non-Owning View

Non-owning reference into proven-live storage. Applied to `Span<T>`, `str`, `&T`.

```vex
contract $BorrowedView { }  // marker
```

#### `$RawPointer` -- Raw Memory Handle

Types carrying raw, unmanaged pointers. Used for FFI and low-level code.

```vex
contract $RawPointer { }  // marker
```

#### `$SuspendSafe` -- Await-Safe

Value remains valid across `await` suspension boundaries.

```vex
contract $SuspendSafe { }  // marker
```

#### `$ConcurrentSafe` -- Thread-Safe

Value can be sent across thread/concurrency boundaries safely.

```vex
contract $ConcurrentSafe { }  // marker
```

#### `$ForeignManaged` -- Externally Owned

Lifetime is governed outside normal Vex ownership. Used for FFI objects.

```vex
contract $ForeignManaged { }  // marker
```

#### `$Dealloc` -- Manual Deallocation

Types that support explicit, manual deallocation (typically unsafe).

```vex
contract $Dealloc {
    fn free()
}
```

---

## Standard Contracts (`lib/std/contracts/src/`)

### Conversion Contracts

#### `From<T>` -- Infallible Conversion

```vex
contract From<T> {
    From(value: T): Self
}
```

```vex
struct Celsius: From<f64> {
    public:
    value: f64,

    fn Celsius(value: f64): Celsius {
        return Celsius { value: value }
    }
}

let temp: Celsius = Celsius.from(100.0)  // or just Celsius(100.0)
```

#### `Into<T>` -- Reverse of From

```vex
contract Into<T> {
    into(): T
}
```

`Into<T>` is automatically implemented for any type where `T: From<Self>`.

#### `TryFrom<T>` -- Fallible Conversion

```vex
contract TryFrom<T> {
    type Error
    try_from(value: T): Result<Self, Self.Error>
}
```

```vex
struct PositiveInt: TryFrom<i32> {
    public:
    value: i32,

    type Error = string

    fn PositiveInt.try_from(value: i32): Result<PositiveInt, string> {
        if value <= 0 {
            return Err("value must be positive")
        }
        return Ok(PositiveInt { value: value })
    }
}
```

#### `TryInto<T>` -- Fallible Reverse Conversion

```vex
contract TryInto<T> {
    type Error
    try_into(): Result<T, Self.Error>
}
```

#### `Default` -- Default Value

```vex
contract Default {
    Default(): Self
}
```

```vex
struct Config: Default {
    public:
    host: string,
    port: i32,

    fn Config(): Config {
        return Config { host: "localhost", port: 8080 }
    }
}

let defaultConfig = Config.default()
```

### Comparison Contracts

#### `Eq` -- Structural Equality

```vex
contract Eq {
    eq(other: &Self): bool
    ne(other: &Self): bool
}
```

#### `Ord` -- Total Ordering

```vex
contract Ord {
    cmp(other: &Self): Ordering
    lt(other: &Self): bool
    le(other: &Self): bool
    gt(other: &Self): bool
    ge(other: &Self): bool
}
```

`Ordering` is an enum: `Less`, `Equal`, `Greater`.

#### `Hash` -- Hashing

```vex
contract Hash {
    hash(): u64
}
```

### Collection Contracts

#### `Collection`

Base contract for all collection types.

```vex
contract Collection {
    type Elem
    len(): usize
    isEmpty(): bool
}
```

#### `Stack` -- LIFO

```vex
contract Stack: Collection {
    push(value: Self.Elem)
    pop(): Option<Self.Elem>
    peek(): Option<Self.Elem>
}
```

#### `Queue` -- FIFO

```vex
contract Queue: Collection {
    enqueue(value: Self.Elem)
    dequeue(): Option<Self.Elem>
    front(): Option<Self.Elem>
}
```

#### `Indexable` -- Indexed Access

```vex
contract Indexable: Collection {
    get(index: usize): Option<Self.Elem>
}
```

#### `Iterable` -- Iteration Support

```vex
contract Iterable: Collection {
    type Iter
    iter(): Self.Iter
}
```

#### `Growable` -- Capacity Management

```vex
contract Growable: Collection {
    reserve(additional: usize)
    capacity(): usize
    shrink()
}
```

### Memory Management Contracts

#### `SmartPointer<T>`

```vex
contract SmartPointer<T> {
    op(value: T): Self
    get(): &T
    get_mut()!: &T!
}
```

#### `RefCounted`

```vex
contract RefCounted {
    clone(): Self
    strong_count(): usize
}
```

#### `Drop` -- Standard Library Drop

```vex
contract Drop {
    drop()!
}
```

Note: This is the standard library `Drop`, distinct from the prelude `$Drop`. Both trigger RAII cleanup but `$Drop` is compiler-enforced.

#### `Owner` -- Ownership Marker

```vex
contract Owner: Drop { }  // inherits Drop
```

#### `BorrowedView` -- Borrow Marker

```vex
contract BorrowedView { }
```

#### `RawPointer` -- Raw Handle Marker

```vex
contract RawPointer { }
```

#### `SuspendSafe` -- Async Safety Marker

```vex
contract SuspendSafe { }
```

#### `ConcurrentSafe` -- Thread Safety Marker

```vex
contract ConcurrentSafe { }
```

#### `ForeignManaged` -- External Ownership

```vex
contract ForeignManaged { }
```

#### `Dealloc`

```vex
contract Dealloc {
    free()!
}
```

### `PackedType` Contract

Ensures a type has no padding bytes -- all bytes are meaningful. Used for binary protocols and serialization.

```vex
contract PackedType { }
```

```vex
#[repr(packed)]
struct NetworkHeader: PackedType {
    public:
    version: u8,
    length: u16,
    crc: u32,
}
```

---

## Contract Inheritance

Contracts can inherit from other contracts:

```vex
contract Ord: Eq {           // Ord requires Eq
    cmp(other: &Self): Ordering
}

contract Iterator {
    type Item
    next(): Option<Self.Item>
}

contract DoubleEndedIterator: Iterator {
    nextBack(): Option<Self.Item>
}
```

## Associated Types

Contracts can define associated types:

```vex
contract Iterator {
    type Item
    next(): Option<Self.Item>
}

struct RangeIter: Iterator {
    type Item = i32
}

fn (self: &RangeIter!) next(): Option<i32> {
    // ...
}
```

## Best Practices

1. Use operator contracts (`$Add`, `$Eq`, etc.) to make your types work with standard operators.
2. Implement `$Display` for user-facing string representations; `$Debug` for developer-facing ones.
3. Implement `$Drop` when your type owns resources (files, sockets, allocations) that need cleanup.
4. Use marker contracts (`$SuspendSafe`, `$ConcurrentSafe`) to document and enforce safety guarantees.
5. Prefer `From`/`Into` for infallible conversions and `TryFrom`/`TryInto` for fallible ones.
6. Contracts in the prelude (`$`-prefixed) are always available without imports.
7. Standard library contracts require `import` from `std.contracts`.

## Related Pages

- [Contracts](/guide/types/contracts) -- contracts overview
- [Operators Reference](/guide/advanced/operators-reference) -- operator contracts
- [Policies](/guide/types/policies) -- capability marker contracts
