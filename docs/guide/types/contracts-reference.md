# Contracts Reference

This page is a complete reference of all standard contracts available in Vex. Contracts define shared behavior across types, similar to traits in Rust or interfaces in Go.

## Contract Categories

Contracts are organized into three layers:

| Layer                  | Location                       | Description                                             |
| ---------------------- | ------------------------------ | ------------------------------------------------------- |
| **Operator Contracts** | `prelude/ops.vx`               | Arithmetic, bitwise, comparison, indexing operators     |
| **Builtin Contracts**  | `prelude/builtin_contracts.vx` | Core language capabilities (Display, Clone, Drop, etc.) |
| **Standard Contracts** | `lib/std/contracts/src/`       | Explicit conversion, collection and packed-data protocols |

---

## Operator Contracts (`prelude/ops.vx`)

### Arithmetic Operators

#### `Add` -- Addition (`a + b`)

```vex
contract Add {
    op+(rhs: Self): Self
}
```

```vex
struct Vector2: Add {
    public:
    x: f64,
    y: f64,
}

fn (self: &Vector2) op+(rhs: Vector2): Vector2 {
    return Vector2.new(self.x + rhs.x, self.y + rhs.y)
}
```

#### `Sub` -- Subtraction (`a - b`)

```vex
contract Sub {
    op-(rhs: Self): Self
}
```

#### `Mul` -- Multiplication (`a * b`)

```vex
contract Mul {
    op*(rhs: Self): Self
}
```

#### `Div` -- Division (`a / b`)

```vex
contract Div {
    op/(rhs: Self): Self
}
```

#### `Mod` -- Modulo (`a % b`)

```vex
contract Mod {
    op%(rhs: Self): Self
}
```

#### `Neg` -- Unary Negation (`-a`)

```vex
contract Neg {
    op-(): Self
}
```

```vex
fn (self: &Vector2) op-(): Vector2 {
    return Vector2.new(-self.x, -self.y)
}
```

### Bitwise Operators

#### `BitAnd` -- Bitwise AND (`a & b`)

```vex
contract BitAnd {
    op&(rhs: Self): Self
}
```

#### `BitOr` -- Bitwise OR (`a | b`)

```vex
contract BitOr {
    op|(rhs: Self): Self
}
```

#### `BitXor` -- Bitwise XOR (`a ^ b`)

```vex
contract BitXor {
    op^(rhs: Self): Self
}
```

#### `BitNot` -- Bitwise NOT (`~a`)

```vex
contract BitNot {
    op~(): Self
}
```

#### `Shl` -- Left Shift (`a << b`)

```vex
contract Shl {
    op<<(rhs: i32): Self
}
```

#### `Shr` -- Right Shift (`a >> b`)

```vex
contract Shr {
    op>>(rhs: i32): Self
}
```

### Comparison Operators

#### `Eq` -- Equality (`a == b`, `a != b`)

```vex
contract Eq {
    op==(rhs: Self): bool
    op!=(rhs: Self): bool  // auto-implemented as !(a == b)
}
```

```vex
struct Point: Eq {
    public:
    x: i32,
    y: i32,
}

fn (self: &Point) op==(rhs: Point): bool {
    return self.x == rhs.x && self.y == rhs.y
}
// op!= is auto-generated: !self.op==(rhs)
```

#### `Ord` -- Ordering (`a < b`, `a > b`, `a <= b`, `a >= b`)

```vex
contract Ord {
    op<(rhs: Self): bool
    op>(rhs: Self): bool
    op<=(rhs: Self): bool
    op>=(rhs: Self): bool
}
```

#### `Not` -- Logical NOT (`!a`)

```vex
contract Not {
    op!(): bool
}
```

### Other Operator Contracts

#### `Index` -- Indexing (`a[i]`)

```vex
contract Index {
    op[](index: usize): Self.Element
}
```

```vex
struct Grid: Index {
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

### `Display` -- Human-Readable String

Used by `$println("{}", value)` and `toString()`.

```vex
contract Display {
    fn toString(): string
}
```

```vex
struct User: Display {
    public:
    name: string,
    age: i32,
}

fn (self: &User) toString(): string {
    return f"User({self.name}, {self.age})"
}
```

### `Debug` -- Debug String Representation

Used by `$println("{:?}", value)`.

```vex
contract Debug {
    fn debug(): string
}
```

### `Clone` -- Deep Copy

Creates an independent copy of a value. For heap types, allocates new memory.

```vex
contract Clone {
    fn clone(): Self
}
```

```vex
struct Node: Clone {
    public:
    value: i32,
    children: Vec<Node>,
}

fn (self: &Node) clone(): Node {
    return Node.new(self.value, self.children.clone())
}
```

### `Drop` -- RAII Cleanup

Called automatically when a value goes out of scope. Used for releasing resources.

```vex
contract Drop {
    fn drop()
}
```

```vex
struct File: Drop {
    public:
    handle: i32,
}

fn (self: &File!) drop() {
    unsafe { close(self.handle) }
    $println("File closed")
}
```

### `Hash`, `Hasher`, and `BuildHasher` -- Collection Hashing

`Hash` values feed equality-relevant data into the state selected by a `Map`
or `Set`. The value does not finalize its own hash. This lets each hosted
container use an independent random key while deterministic tools select an
explicit reproducible builder.

**Rule:** `a == b` implies identical feeds, in identical order, for every
`Hasher` implementation.

```vex
contract Hasher {
    fn writeBytes(bytes: Span<u8>)!
    fn writeU32(value: u32)!
    fn writeU64(value: u64)!
    fn finish(): u64
}

contract Hash {
    fn hashInto<H: Hasher>(state: &H!)
}

contract BuildHasher {
    type State: Hasher
    fn build(): Self.State
}

struct UserId: Eq, Hash {
    public:
    value: u64,
}

fn (self: &UserId) hashInto<H: Hasher>(state: &H!) {
    self.value.hashInto(state)
}
```

The default table policy is a keyed implementation detail, not a stable file
format. Use the named `hash` package algorithms when output bytes must remain
stable. Floating-point values do not implement `Hash` until their equality and
NaN policy is defined consistently.

### `Bytes` -- Binary Serialization

Zero-copy byte representation for FFI, network I/O, and file serialization.

```vex
contract Bytes {
    fn asBytes(): &[u8]
    fn fromBytes(bytes: &[u8]): Result<Self, BytesError>
}
```

```vex
struct PacketHeader: Bytes {
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

#### `Copy` -- Bitwise Copyable

Types that can be duplicated by copying their bits. Scalar primitives are
`Copy`. Aggregate declarations opt in explicitly, and the compiler then proves
the exact instantiated shape before granting the capability:

```vex
// Marker -- no methods
contract Copy { }

struct Pair<T>: Copy {
    left: T,
    right: T,
}

// Pair<i32> is Copy; Pair<string> is not.
```

The spelling of a type is irrelevant. Prelude types such as `Option<T>`,
`Result<T, E>`, `Range<T>`, `Span<T>`, and `Ptr<T>` receive Copy behavior from
their Vex declarations, not from a Rust-side type-name list.

#### `Pin` -- Self-Referential Prevention

Prevents moving self-referential types. Auto-applied by the compiler when self-referential fields are detected.

```vex
contract Pin { }  // marker
```

#### `Owner` -- Owning Capability

The value is responsible for eventual destruction. VexArch owning types such
as `Box<T>`, `Vec<T>`, `Map<K, V>`, `Channel<T>`, and `string` declare this
capability in their source definitions.

```vex
contract Owner { }  // marker
```

#### `BorrowedView` -- Non-Owning View

Non-owning reference into proven-live storage of `T`. `Span<T>` and `str`
declare this relationship in VexArch; ordinary `&T` and slices have equivalent
intrinsic borrow semantics.

```vex
contract BorrowedView<T> { }  // marker
```

#### `IndirectStorage<T>` -- Out-of-Line Storage

States that values of `T` live behind a container-owned backing allocation.
The borrow checker follows this semantic edge when storage moves or grows; it
does not recognize `Vec`, `Map`, or any other container name.

```vex
contract IndirectStorage<T> { }  // marker
```

The same declaration also informs generic variance. Because the public
abstraction owns values of `T` independently of its private raw backing
pointer, `T` can remain covariant without a compiler-side `Vec`/`Map` table.

#### `BulkReclaimSafe` -- Region Drop Elision

Marks an audited VexArch value whose destructor has no observable effect beyond
releasing storage owned by a compiler-selected region. If the exact allocation
is routed into that region, Vex may omit the individual destructor and reclaim
the storage in one bulk operation.

```vex
contract BulkReclaimSafe { }  // sealed marker
```

This is not a general-purpose user contract. It is sealed because an incorrect
implementation could erase file, socket, synchronization, foreign-resource, or
other observable cleanup. Types that do not need `Drop` are already eligible
structurally; types that do need `Drop` receive this optimization only from the
exact compiler-installed contract declaration. A same-named user contract has
no effect. `string` currently opts in through its VexArch declaration; ordinary
containers and custom destructors retain full drop behavior unless separately
audited.

#### `Invariant<T>` -- Invariant Generic Parameter

Declares that an abstraction both consumes and produces `T`, or otherwise
requires exact type/lifetime identity. `Channel<T>` and `Ptr<T>` use this
user-available conservative source marker. It overrides representation-only
variance inference but can only reject conversions; it cannot grant ownership
or lifetime authority.

```vex
contract Invariant<T> { }  // marker
```

#### `ManagedSharing` -- Compiler-Managed Shared Handle

Marks a trusted owning handle whose representation supports compiler-managed
sharing. Developers still use the normal value type; public `Rc`/`Arc` and
manual retain/release bookkeeping are not part of the Vex model.

```vex
contract ManagedSharing { }  // marker
```

#### `RawPointer` -- Raw Memory Handle

Types carrying raw, unmanaged pointers. Used for FFI and low-level code.

```vex
contract RawPointer { }  // marker
```

#### `SuspendSafe` -- Await-Safe

Value remains valid across `await` suspension boundaries.

```vex
contract SuspendSafe { }  // marker
```

#### `ConcurrentSafe` -- Thread-Safe

Value can be sent across thread/concurrency boundaries safely.

```vex
contract ConcurrentSafe { }  // marker
```

#### `ForeignManaged` -- Externally Owned

Lifetime is governed outside normal Vex ownership. Used for FFI objects. Types with this contract bypass Vex's drop infrastructure — the foreign (C) side manages allocation and deallocation.

See [Extern Types](extern-types.md) for the full FFI ownership system, including `Extern.Owned<T, "drop_fn">` and `Extern.ForeignManaged<T>` type syntax.

```vex
contract ForeignManaged { }  // marker
```

#### `Dealloc` -- Manual Deallocation

Types that support explicit, manual deallocation (typically unsafe).

```vex
contract Dealloc {
    fn free()
}
```

---

## Standard Contracts (`lib/std/contracts/src/`)

### Conversion Contracts

#### `From<T>` -- Infallible Conversion

```vex
contract From<T> {
    static fn fromValue(value: T): Self;
}
```

```vex
struct Celsius: From<f64> {
    public:
    value: f64,
}

fn Celsius.fromValue(value: f64): Celsius {
    return Celsius { value };
}

let temp = Celsius.fromValue(100.0);
```

`From<T>` is an explicit protocol. Constructor-driven implicit coercion is a
separate compiler feature.

#### `Into<T>` -- Reverse of From

```vex
contract Into<T> {
    static fn intoValue(value: Self): T;
}
```

The explicit `Self` parameter consumes the owner. Vex does not synthesize a
blanket `Into<T>` implementation from `From<Self>`.

#### `TryFrom<T>` -- Fallible Conversion

```vex
contract TryFrom<T> {
    type Error;
    static fn tryFromValue(value: T): Result<Self, Self.Error>;
}
```

```vex
struct PositiveInt: TryFrom<i32> {
    public:
    value: i32,

    type Error = str;
}

fn PositiveInt.tryFromValue(value: i32): Result<PositiveInt, str> {
    if value <= 0 {
        return Err("value must be positive");
    }
    return Ok(PositiveInt { value });
}
```

#### `TryInto<T>` -- Fallible Reverse Conversion

```vex
contract TryInto<T> {
    type Error;
    static fn tryIntoValue(value: Self): Result<T, Self.Error>;
}
```

#### `Default` -- Default Value

```vex
contract Default {
    static fn defaultValue(): Self;
}
```

```vex
struct Config: Default {
    public:
    host: string,
    port: i32,
}

fn Config.defaultValue(): Config {
    return Config { host: "localhost", port: 8080 };
}

let defaultConfig = Config.defaultValue();
```

### Comparison Contracts

`std/contracts` exports only the `Ordering` value enum (`Less`, `Equal`, and
`Greater`) in this category. `Eq`, `Ord`, operator behavior and hashing
contracts are canonical prelude identities; the package does not create
parallel aliases for them.

### Collection Contracts

#### `Collection`

Base contract for all collection types.

```vex
contract Collection<T> {
    len(): usize;
    isEmpty(): bool;
    clear()!;
}
```

#### `Stack` -- LIFO

```vex
contract Stack<T>: Collection<T> + Growable {
    push(value: T)!;
    pop()!: Option<T>;
    peek(): Option<&T>;
    peekMut()!: Option<&T!>;
}
```

#### `Queue` -- FIFO

```vex
contract Queue<T>: Collection<T> + Growable {
    enqueue(value: T)!;
    dequeue()!: Option<T>;
    front(): Option<&T>;
    frontMut()!: Option<&T!>;
}
```

#### `Indexable` -- Indexed Access

```vex
contract Indexable<T, Idx>: Collection<T> {
    get(index: Idx): Option<&T>;
    getMut(index: Idx)!: Option<&T!>;
    set(index: Idx, value: T)!;
}
```

Iteration uses the canonical prelude `Iterator` and `IntoIterator` contracts;
`std/contracts` does not define an `Iterable` alias.

#### `Growable` -- Capacity Management

```vex
contract Growable {
    capacity(): usize;
    reserve(minimumCapacity: usize)!;
    shrinkToFit()!;
}
```

### Ownership and memory contracts

Ownership contracts such as `Drop` and `Owner` are canonical language
contracts from the prelude; `std/contracts` does not define parallel versions.
Heap ownership uses `Box<T>`. The compiler and VUMM choose unique, shared, or
thread-safe storage internally—there are no public `Rc`, `Arc`, reference-count,
retain, or release APIs for application code.

The compiler resolves these contracts by declaration identity. It never grants
ownership, view, indirect-storage, or sharing semantics because a type happens
to be named `Vec`, `Span`, `Ptr`, `Box`, or `Channel`. Ordinary user aggregates
receive the same structural Copy/Drop/borrow analysis as prelude aggregates.
Memory-authority markers are sealed: only audited VexArch/standard-library
definitions may assert a raw or hidden-storage invariant that structure alone
cannot prove. `Invariant<T>` is deliberately open because it is purely
restrictive and grants no memory capability.

#### `Owner` -- Ownership Marker

```vex
contract Owner { }
```

#### `BorrowedView` -- Borrow Marker

```vex
contract BorrowedView<T> { }
```

#### `IndirectStorage` -- Backing-Allocation Marker

```vex
contract IndirectStorage<T> { }
```

#### `Invariant` -- Exact Generic-Identity Marker

```vex
contract Invariant<T> { }
```

#### `ManagedSharing` -- Managed Handle Marker

```vex
contract ManagedSharing { }
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

### `PackedType` Contract

Describes a custom block-encoded representation that can be decoded to and
encoded from a logical element type. It is used by quantized ML formats and
other packed-domain formats; it does not change a struct's native layout.

```vex
contract PackedType<T> {
    name(): str
    blockSize(): usize
    blockBytes(): usize
    bitsPerElement(): u8
    decodeBlock(raw: Span<u8>): Tensor<T>
    encodeBlock(input: &Span<T>): Tensor<u8>
}
```

```vex
struct Q4: PackedType<f32> {}

fn (self: Q4) name(): str { "Q4" }
fn (self: Q4) blockSize(): usize { 32 }
fn (self: Q4) blockBytes(): usize { 16 }
fn (self: Q4) bitsPerElement(): u8 { 4 }
// decodeBlock / encodeBlock define the representation transform.
```

For wire structs or C ABI layout, verify `#Type.sizeOf`, `#Type.alignOf`, and
`#Type.offsetOf` explicitly. `PackedType<T>` is a behavior contract, not a
`packed` layout attribute.

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

1. Use operator contracts (`Add`, `Eq`, etc.) to make your types work with standard operators.
2. Implement `Display` for user-facing string representations; `Debug` for developer-facing ones.
3. Implement `Drop` when your type owns resources (files, sockets, allocations) that need cleanup.
4. Use marker contracts (`SuspendSafe`, `ConcurrentSafe`) to document and enforce safety guarantees.
5. Prefer `From`/`Into` for infallible conversions and `TryFrom`/`TryInto` for fallible ones.
6. Contracts in the prelude (`$`-prefixed) are always available without imports.
7. Standard library contracts require `import` from `std.contracts`.

## Related Pages

- [Contracts](/guide/types/contracts) -- contracts overview
- [Operators Reference](/guide/advanced/operators-reference) -- operator contracts
- [Policies](/guide/types/policies) -- capability marker contracts
