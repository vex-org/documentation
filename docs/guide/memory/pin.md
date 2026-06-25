# Pin\<T\> -- Self-Referential Types

`Pin<T>` prevents a value from being moved in memory. It is essential for self-referential types -- types that contain pointers to their own fields.

## Why Pin Exists

Some data structures hold pointers to their own memory. If such a structure is moved (copied to a new memory location), those internal pointers become dangling:

```vex
// PROBLEM: This struct is self-referential
struct SelfRef {
    data: [i32; 10],
    ptr_to_third: *i32,    // points to data[2]
}

let sr = SelfRef.new()
// sr.ptr_to_third points into sr.data

let moved = sr   // sr is moved to a new memory location!
// moved.ptr_to_third now points to the OLD location of data -- DANGLING POINTER!
```

`Pin<T>` prevents this by making the value immovable.

## Using Pin

```vex
let! pinned = Pin.new(SelfRef.new())

// The pinned value cannot be moved
// let escaped = pinned    // COMPILE ERROR: cannot move pinned value

// Access through Pin is safe
let third = pinned.get().data[2]     // immutable access
let ptr = pinned.get().ptr_to_third  // pointer is still valid
```

## Pin API

### Construction

```vex
// Pin a newly created value
let pinned: Pin<MyType> = Pin.new(MyType.new(42))

// Pin is heap-allocated by default (stable address)
// The value lives on the heap where its address never changes
```

### Access

```vex
let pinned = Pin.new(MyStruct.new(10))

// Immutable access
let val = pinned.get()            // &MyStruct
let field = pinned.get().field

// Mutable access (requires unsafe -- you must preserve invariants)
unsafe {
    let mut_ref = pinned.get_mut!()  // &MyStruct!
    mut_ref.field = 20
}
```

### Drop

When `Pin<T>` goes out of scope, the pinned value is dropped normally:

```vex
{
    let pinned = Pin.new(Resource.new())
    // ... use pinned ...
}  // Resource.drop() is called, then memory is freed
```

## The `Pin` Contract

Types that are self-referential implement the `Pin` marker contract:

```vex
// Pin is a marker contract -- it has no methods
contract Pin { }

// The compiler may auto-detect self-referential fields and apply Pin
```

## Common Use Cases

### Async State Machines

The compiler uses `Pin` internally for async functions. When an `async fn` is suspended at an `await` point, its state machine may contain self-referential fields. `Pin` ensures the state machine stays at a fixed address:

```vex
async fn fetchAndProcess(url: string): Result<Data, Error> {
    let response = await http.get(url)?    // suspension point
    let data = await parse(response)?       // another suspension point
    return Ok(data)
}
// Compiler wraps the state machine in Pin internally
```

### Intrusive Data Structures

Linked lists, trees, and graphs where nodes point to each other within the same allocation:

```vex
struct IntrusiveNode: Pin {
    value: i32,
    next: *IntrusiveNode,    // self-referential: may point within same allocation
}

fn createList(values: Vec<i32>): Pin<IntrusiveNode> {
    // Allocate nodes together in a stable memory region
    // Establish internal pointers safely because Pin prevents moves
    // ...
}
```

### Foreign-Managed Memory

When interfacing with C libraries that maintain internal pointers:

```vex
struct CContext: Pin {
    handle: ptr,  // C library owns internal pointers based on this address
}

fn createContext(): Pin<CContext> {
    let ctx = CContext.new()
    unsafe { c_init(ctx.handle) }  // C stores pointers relative to ctx
    return Pin.new(ctx)            // Pin prevents Vex from moving ctx
}
```

## Safety Rules

1. **Once pinned, never move.** The compiler enforces this for `Pin<T>`.
2. **Mutable access requires `unsafe`.** You must guarantee you don't break the pinning invariant.
3. **Drop runs in place.** The pinned value is dropped at its pinned address, so internal pointers remain valid during drop.
4. **`Pin` is auto-detected.** The compiler may automatically apply `Pin` to types with self-referential fields.

## Pin vs Box

| Feature           | `Box<T>`                | `Pin<T>`                                     |
| ----------------- | ----------------------- | -------------------------------------------- |
| Heap allocation   | Yes                     | Yes                                          |
| Can move?         | Yes                     | No                                           |
| Self-referential? | Unsafe                  | Safe                                         |
| Use case          | General heap allocation | Self-referential types, async state machines |

```vex
// Box: general heap allocation, movable
let boxed = Box.new(42)
let moved = boxed   // OK, Box is movable

// Pin: pinned heap allocation, immovable
let pinned = Pin.new(SelfRef.new())
// let escaped = pinned  // ERROR: Pin is not movable
```

## Best Practices

1. Use `Pin` when you have types that contain pointers to themselves.
2. Don't use `Pin` unless you need immovability -- `Box<T>` is simpler and sufficient for most heap allocations.
3. Respect `unsafe` requirements when accessing `Pin` mutably -- you're responsible for maintaining invariants.
4. Let the compiler auto-detect `Pin` -- annotating manually is rarely needed.

## Related Pages

- [Ownership](/guide/memory/ownership) -- how values are owned and moved
- [Borrowing](/guide/memory/borrowing) -- references and borrow rules
- [Box](/guide/memory/box) -- heap allocation with VUMM
- [Ptr\<T\>](/guide/memory/ptr-t) -- safe typed pointer wrapper
- [Span\<T\>](/guide/memory/span-t) -- bounds-checked fat pointer
- [Raw Pointers](/guide/types/raw-pointers) -- `ptr`, `*T`, `*T!`
- [Memory Safety](/guide/memory/safety) -- safety rules and unsafe blocks
