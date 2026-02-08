# Compile-Time Evaluation

Vex provides powerful compile-time evaluation capabilities through **comptime intrinsics**. These are evaluated during compilation, producing zero runtime overhead.

## Overview

Comptime intrinsics in Vex start with the `$` prefix and are evaluated at compile time. They enable:

- **Type introspection** - Query type properties
- **Reflection** - Inspect struct/enum fields and variants
- **Compile-time arithmetic** - Evaluate constants
- **Conditional compilation** - Type-based code generation

## Type Introspection

### Size and Alignment

```vex
// Get size of a type in bytes
let size = #sizeof<i64>()     // 8
let size = $sizeOf<MyStruct>()  // Struct size

// Get alignment of a type
let align = #alignof<f64>()   // 8
let align = $alignOf<Vec<i32>>()  // Pointer alignment
```

### Type Name

```vex
// Get type name as string
let name = #typeName<i32>()           // "i32"
let name = #typename<Vec<string>>()   // "Vec<string>"
```

## Type Predicates

Query type characteristics at compile time:

```vex
// Check type categories
#isStruct<MyStruct>()      // true
#isEnum<Option<T>>()       // true
#isPrimitive<i32>()        // true

// Numeric type checks
#isInteger<i64>()          // true
#isFloat<f32>()            // true
#isSigned<i32>()           // true (vs unsigned)

// Compound types
#isPointer<*i32>()         // true
#isArray<[i32; 4]>()       // true
#isTuple<(i32, string)>()  // true
$isSlice<Slice<i32>>()     // true

// Special types
$isOption<Option<i32>>()   // true
$isResult<Result<T, E>>()  // true
#isReference<&T>()         // true
#isFunction<fn(i32): i32>() // true
#isGeneric<T>()            // true for type params

// Contract checks
#isCopy<i32>()             // true
#needsDrop<Vec<i32>>()     // true
```

## Struct Reflection

Inspect struct fields at compile time:

```vex
struct User {
    id: i64 `json:"user_id" db:"primary_key"`,
    name: string `json:"name"`,
    active: bool
}

// Field count
let count = #fieldCount<User>()    // 3

// Field names (comma-separated string)
let names = #fieldNames<User>()    // "id,name,active"

// Check if field exists
let has = #hasField<User>("id")    // true
let has = #hasField<User>("email") // false

// Get field type name
let ty = #fieldType<User>("id")    // "i64"
let ty = #fieldType<User>("name")  // "string"

// Get field offset in bytes
let off = #offsetOf<User>("name")  // Offset of name field

// Field tags (Go-style backtick metadata)
let tag = #fieldTag<User>("id", "json")     // "user_id"
let tag = #fieldTag<User>("id", "db")       // "primary_key"
let has = #hasFieldTag<User>("id", "json")  // true
let tags = #fieldTags<User>("id")           // "json:user_id,db:primary_key"
```

## Enum Reflection

Inspect enum variants:

```vex
enum Status {
    Active,
    Pending,
    Closed(string)
}

// Variant count
let count = #variantCount<Status>()     // 3

// Variant names
let names = #variantNames<Status>()     // "Active,Pending,Closed"

// Check variant existence
let has = #hasVariant<Status>("Active") // true

// Get variant discriminant
let disc = #variantDiscriminant<Status>("Pending")  // 1

// Check if variant has payload
let has = #variantHasPayload<Status>("Closed")  // true
let has = #variantHasPayload<Status>("Active")  // false

// Get variant payload type
let payload = #variantPayload<Status>("Closed")  // "string"
```

## Type Comparison

```vex
// Check if two types are the same
#sameType<i32, i32>()              // true
#sameType<i32, i64>()              // false
#sameType<Vec<i32>, Vec<i32>>()    // true

// Check if type implements a contract
#implements<MyStruct, Display>()   // true/false
```

## Compile-Time Arithmetic

Evaluate arithmetic at compile time:

```vex
// Power
let val = #constPow(2, 10)    // 1024

// Min/Max
let min = #constMin(5, 3)     // 3
let max = #constMax(5, 3)     // 5
let min = $min(a, b)          // shorthand

// Clamp
let val = #constClamp(15, 0, 10)  // 10
let val = $clamp(x, lo, hi)       // shorthand

// Absolute value
let abs = #constAbs(-42)      // 42
let abs = $abs(x)             // shorthand

// Logarithm (base 2)
let log = #constLog2(256)     // 8
let log = $log2(n)            // shorthand

// Square root (integer)
let sqrt = #constSqrt(144)    // 12

// GCD/LCM
let gcd = #constGcd(12, 8)    // 4
let gcd = $gcd(a, b)          // shorthand
let lcm = #constLcm(4, 6)     // 12
let lcm = $lcm(a, b)          // shorthand
```

## Bit Operations

```vex
// Check if power of 2
#isPowerOf2(16)       // true
#isPowerOfTwo(15)     // false

// Next power of 2
#nextPowerOf2(5)      // 8
#nextPow2(100)        // 128

// Bit count (popcount)
#bitCount(0b1010101)  // 4
#popcount(255)        // 8

// Leading/trailing zeros
#leadingZeros(16)     // depends on bit width
#clz(0x80)            // count leading zeros
#trailingZeros(16)    // 4
#ctz(0x80)            // count trailing zeros
```

## Default Values

```vex
// Create default value for type
let val = #default<i32>()        // 0
let val = #default<string>()     // ""
let val = #default<Vec<i32>>()   // empty vec

// Check if type has default
#hasDefault<i32>()               // true

// Create zeroed value (all bits zero)
let val = #zeroed<MyStruct>()    // All fields zeroed
```

## Compile-Time Evaluation

```vex
// Force compile-time evaluation
let val = #constEval(2 + 2)           // 4 at compile time
let val = #eval(some_const_expr)      // Evaluate expression
```

## Debug Intrinsics

```vex
// Print type info during compilation
#debugType<MyComplexType>()  // Prints type info to stderr
```

## Compile-Time Diagnostics

```vex
// Static assertion (fails compilation if false)
#staticAssert(#sizeof<i32>() == 4, "i32 must be 4 bytes")
#staticAssert(#hasField<User>("id"), "User must have id field")

// Emit compile error
#compileError("This code path should not be reached")

// Emit compile warning
#warning("This API is deprecated")
```

## Practical Examples

### Type-Safe Serialization

```vex
fn to_json<T>(obj: &T): string {
    let! result = "{"
    let! first = true
    
    $for field in #fieldNames<T>().split(",") {
        let json_key = #fieldTag<T>(field, "json")
        
        if json_key != "" {
            if !first { result = result + ", " }
            first = false
            
            let value = $fieldGet(obj, field)
            result = result + "\"" + json_key + "\": "
            
            $if #fieldType<T>(field) == "string" {
                result = result + "\"" + value + "\""
            }
            $if #fieldType<T>(field) == "i32" {
                result = result + #stringify(value)
            }
        }
    }
    
    return result + "}"
}
```

### Generic Buffer with Alignment

```vex
struct AlignedBuffer<T> {
    data: *T,
    len: i64
}

fn new_buffer<T>(count: i64): AlignedBuffer<T> {
    let size = #sizeof<T>() * count
    let align = #alignof<T>()
    
    #staticAssert(#isPrimitive<T>() || #isCopy<T>(), 
                  "Buffer only supports Copy types")
    
    return AlignedBuffer {
        data: aligned_alloc(align, size),
        len: count
    }
}
```

### Enum Visitor Pattern

```vex
fn visit_all<E, F>(visitor: F) {
    let variants = #variantNames<E>()
    
    $for name in variants.split(",") {
        $if #variantHasPayload<E>(name) {
            // Skip variants with payloads
            continue
        }
        
        let disc = #variantDiscriminant<E>(name)
        visitor(name, disc)
    }
}
```

## Best Practices

1. **Use for type safety** - Validate assumptions at compile time
2. **Zero overhead** - All intrinsics evaluate at compile time
3. **Static assertions** - Catch errors early with `#staticAssert`
4. **Avoid runtime reflection** - Prefer comptime intrinsics
5. **Document constraints** - Use `#compileError` for clear messages

## Related Topics

- [Generics](/guide/types/generics) - Generic programming
- [Contracts](/guide/types/contracts) - Type constraints
- [Builtins](/guide/advanced/builtins) - Runtime intrinsics
