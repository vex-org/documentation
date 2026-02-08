# Type Aliases & Conditional Types

Vex supports type aliases for creating readable type names and conditional types for compile-time type computation.

## Type Aliases

Create new names for existing types:

```vex
// Simple type alias
type UserId = u64
type Email = string
type Score = f64

// Pointer type aliases
type IntPtr = *i32
type MutPtr = *i32!
type VoidPtr = *void

// Function type alias
type Handler = fn(i32): bool
type Callback = fn(string, i32): void

// Generic type alias
type Pair<T> = (T, T)
type Triple<T, U, V> = (T, U, V)
```

### Using Type Aliases

```vex
type UserId = u64
type UserMap = HashMap<UserId, User>

struct User {
    id: UserId,
    name: string,
    score: Score
}

fn get_user(users: &UserMap, id: UserId): Option<&User> {
    users.get(&id)
}

fn main(): i32 {
    let id: UserId = 12345
    let score: Score = 98.5
    
    $println(f"User {id} has score {score}")
    return 0
}
```

### Generic Type Aliases

```vex
// Alias with type parameters
type Result<T> = Result<T, Error>
type AsyncResult<T> = Future<Result<T>>
type Vec2<T> = (T, T)
type Matrix<T> = [[T]]

// Constrained generic alias
type Numeric<T: Add + Mul> = T

// Usage
let point: Vec2<f64> = (1.0, 2.0)
let matrix: Matrix<i32> = [[1, 2], [3, 4]]
```

## Conditional Types

TypeScript-style conditional types for compile-time type computation:

```vex
// Syntax: T extends U ? X : Y
// If T is assignable to U, result is X, otherwise Y

type IsString<T> = T extends string ? true : false
type IsNumber<T> = T extends i32 | i64 | f32 | f64 ? true : false
```

### The `infer` Keyword

Extract types from generic wrappers:

```vex
// Extract inner type from Option
type Unwrap<T> = T extends Option<infer U> ? U : T

// Unwrap<Option<i32>> → i32
// Unwrap<string> → string (not Option, returns T)

// Extract Ok type from Result
type ExtractOk<T> = T extends Result<infer V, infer E> ? V : T

// ExtractOk<Result<i32, string>> → i32

// Extract Error type from Result
type ExtractErr<T> = T extends Result<infer V, infer E> ? E : never

// ExtractErr<Result<i32, string>> → string
```

### Conditional Type Examples

```vex
// Filter types
type OnlyOption<T> = T extends Option<infer U> ? T : never
// OnlyOption<Option<i32>> → Option<i32>
// OnlyOption<string> → never

// Return type extraction
type ReturnType<T> = T extends fn(...): infer R ? R : never
// ReturnType<fn(i32): string> → string

// Parameter extraction
type Parameters<T> = T extends fn(infer P): any ? P : never
// Parameters<fn(i32, string): bool> → (i32, string)

// Array element type
type ElementType<T> = T extends [infer E] ? E : never
// ElementType<[i32]> → i32
```

### Practical Conditional Types

```vex
// Nullable type handling
type NonNullable<T> = T extends nil ? never : T

// Promise/Future unwrapping
type Awaited<T> = T extends Future<infer U> ? Awaited<U> : T
// Awaited<Future<Future<i32>>> → i32 (recursive unwrap)

// Deep readonly
type DeepReadonly<T> = T extends object ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>
} : T

// Flatten nested arrays
type Flatten<T> = T extends [infer U] ? Flatten<U> : T
// Flatten<[[i32]]> → i32
```

## Associated Types in Contracts

Contracts can define associated types:

```vex
contract Iterator {
    type Item;                    // Associated type
    next()!: Option<Self.Item>;
}

contract Container {
    type Item;
    type Iter: Iterator;
    
    iter(): Self.Iter;
    len(): usize;
}

struct IntVec:Container {
    data: [i32],
    
    type Item = i32;
    type Iter = IntVecIter;
    
    fn iter(): IntVecIter {
        IntVecIter { vec: self, index: 0 }
    }
    
    fn len(): usize {
        self.data.len()
    }
}
```

## Type Alias vs Newtype

```vex
// Type alias - same underlying type, interchangeable
type Meters = f64
type Kilometers = f64

let m: Meters = 100.0
let km: Kilometers = m  // OK - same type!

// Newtype pattern - distinct types, not interchangeable
struct Meters(f64)
struct Kilometers(f64)

let m = Meters(100.0)
// let km: Kilometers = m  // ERROR - different types!

fn meters_to_km(m: Meters): Kilometers {
    Kilometers(m.0 / 1000.0)
}
```

## Complex Type Expressions

```vex
// Union type alias
type StringOrNumber = string | i32 | i64 | f64

// Intersection-like (via contracts)
type Printable = impl Display + Debug

// Mapped types
type Readonly<T> = {
    readonly [K in keyof T]: T[K]
}

type Partial<T> = {
    [K in keyof T]?: T[K]
}

type Required<T> = {
    [K in keyof T]-?: T[K]
}
```

## Best Practices

1. **Use aliases for clarity** - `type UserId = u64` is clearer than raw `u64`
2. **Document complex types** - Add comments for conditional types
3. **Prefer newtypes for safety** - When you need type distinction
4. **Keep conditional types simple** - Complex ones are hard to debug

```vex
// ✅ Good: Clear, documented
/// User identifier, guaranteed unique
type UserId = u64

/// Result type for API operations
type ApiResult<T> = Result<T, ApiError>

// ✅ Good: Useful conditional type
type Unwrap<T> = T extends Option<infer U> ? U : T

// ⚠️ Avoid: Overly complex
type ComplexType<T, U, V> = 
    T extends Option<infer A> 
        ? A extends Result<infer B, infer C> 
            ? U extends [infer D] 
                ? (B, C, D, V) 
                : never 
            : never 
        : never
```

## Next Steps

- [Generics](/guide/types/generics) - Generic type parameters
- [Contracts](/guide/types/contracts) - Interfaces and bounds
- [Comptime](/guide/advanced/comptime) - Compile-time computation

