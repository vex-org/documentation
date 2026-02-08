# Raw Pointers

Vex provides first-class support for raw pointers to enable systems programming, hardware interaction, and foreign function interfaces (FFI). Unlike references (`&T`), raw pointers enable manual memory management and are not subject to borrow checker rules.

::: warning
Dereferencing raw pointers is always **unsafe** and must be performed within an `unsafe` block.
:::

## Pointer Types

Vex distinguishes between immutable and mutable raw pointers:

| Type | Description | C Equivalent |
|------|-------------|--------------|
| `*T` | Immutable raw pointer | `const T*` |
| `*T!` | Mutable raw pointer | `T*` |
| `*void` | Opaque/Void pointer | `void*` |

## Creating Pointers

### From References
References can be cast to pointers. This operation is safe (creating the pointer), but using it is unsafe.

```vex
let x = 42
let ptr_const: *i32 = &x         // Cast implicit in assignment if types match? 
                                // Explicit cast: &x as *i32

let! mut_y = 100
let ptr_mut: *i32! = &mut_y!     // Cast to mutable pointer
```

### From Addresses
You can cast integer addresses to pointers. This is essential for memory-mapped I/O.

```vex
let addr: usize = 0xDEAD_BEEF
let ptr = addr as *u32!          // Create pointer from strict address
```

### Type Casting
Pointers can be cast between types using `as`.

```vex
let ptr: *i32 = &10
let byte_ptr = ptr as *u8    // Reinterpret as byte pointer
let void_ptr = ptr as *void  // Type erasure
```

## Operations

### Dereferencing
Accessing the memory pointed to by a raw pointer is `unsafe`.

```vex
let x = 10
let ptr = &x

// READ
let val = unsafe { *ptr }
```

### Writing
Writing requires a mutable pointer (`*T!`).

```vex
let! x = 10
let ptr = &x! as *i32!

// WRITE
unsafe {
    *ptr = 20
}
$println(x) // 20
```

### Pointer Arithmetic
Pointers in Vex support arithmetic operations `+` and `-`. Arithmetic is **typed** components are scaled by the size of the pointee type (similar to C/C++).

```vex
let arr = [10, 20, 30]
let ptr = &arr[0] as *i32

unsafe {
    // Advances by 1 * sizeof(i32) (4 bytes)
    let next = ptr + 1  
    
    // Reads arr[1] (20)
    $println(*next)
}
```

To perform untyped (byte-level) offsets, cast to `usize` or `*u8` first:

```vex
// Advance by exactly 1 byte
let byte_next = (ptr as usize + 1) as *i32 
```

### Comparisons
Pointers can be compared for equality (`==`, `!=`) or ordering (`<`, `>`, etc.).

```vex
if ptr != (0 as *i32) {
    // Not null
}
```

## Multilevel Pointers
Pointers to pointers are supported. Spacing is recommended to avoid parsing ambiguity, though standard Vex parsers handle `**T` correctly.

```vex
let val = 10
let p1: *i32 = &val
let p2: * *i32 = &p1    // Pointer to pointer
```

## Null Pointers
Vex uses `0` as the null value for pointers. There is no usage of a specific `null` keyword for pointer types in the current boolean logic.

```vex
let null_ptr = 0 as *void
```

## Example: FFI Usage

Common usage of pointers is interfacing with C libraries like `malloc`.

```vex
extern "C" {
    fn malloc(size: usize): *void
    fn free(ptr: *void)
}

struct Point { x: i32, y: i32 }

fn main() {
    unsafe {
        // 1. Allocate raw memory
        let void_ptr = malloc(8) // sizeof(Point)
        
        // 2. Cast to structured pointer
        let ptr = void_ptr as *Point!
        
        // 3. Initialize field access
        (*ptr).x = 100
        (*ptr).y = 200
        
        $println(f"Point at {ptr as usize}: {(*ptr).x}, {(*ptr).y}")
        
        // 4. Clean up
        free(void_ptr)
    }
}
```
