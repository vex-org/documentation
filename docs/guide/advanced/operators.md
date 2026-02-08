# Operator Overloading

Vex supports operator overloading through **contracts** and **operator methods**. This allows custom types to use natural operators like `+`, `-`, `*`, `==`, and `[]`.

## Overview

Operator overloading in Vex uses a contract-based system:

1. **Define or use a contract** with an operator method
2. **Implement the contract** on your struct
3. **Use the operator** naturally in code

```vex
// 1. Contract defines the operator
contract Add {
    op+(other: Self): Self;
}

// 2. Struct implements the contract
struct Point:Add {
    x: i32,
    y: i32,
    
    fn op+(other: Point): Point {
        Point { x: self.x + other.x, y: self.y + other.y }
    }
}

// 3. Use the operator
fn main(): i32 {
    let p1 = Point { x: 1, y: 2 }
    let p2 = Point { x: 3, y: 4 }
    let p3 = p1 + p2  // Calls op+
    return 0
}
```

## Standard Operator Contracts

Vex provides built-in contracts for all operators. They use the `$` prefix.

### Arithmetic Operators

| Operator | Contract | Method | Example |
|----------|----------|--------|---------|
| `a + b` | `$Add` | `op+(rhs: Self): Self` | Addition |
| `a - b` | `$Sub` | `op-(rhs: Self): Self` | Subtraction |
| `a * b` | `$Mul` | `op*(rhs: Self): Self` | Multiplication |
| `a / b` | `$Div` | `op/(rhs: Self): Self` | Division |
| `a % b` | `$Mod` | `op%(rhs: Self): Self` | Modulo |
| `-a` | `$Neg` | `op-(): Self` | Negation |

```vex
struct Vec2:$Add, $Sub, $Neg {
    x: f64,
    y: f64,
    
    fn op+(other: Vec2): Vec2 {
        Vec2 { x: self.x + other.x, y: self.y + other.y }
    }
    
    fn op-(other: Vec2): Vec2 {
        Vec2 { x: self.x - other.x, y: self.y - other.y }
    }
    
    fn op-(): Vec2 {
        Vec2 { x: -self.x, y: -self.y }
    }
}

let v = Vec2 { x: 1.0, y: 2.0 }
let neg = -v  // Vec2 { x: -1.0, y: -2.0 }
```

### Comparison Operators

| Operator | Contract | Method | Example |
|----------|----------|--------|---------|
| `a == b` | `$Eq` | `op==(rhs: Self): bool` | Equality |
| `a != b` | `$Eq` | `op!=(rhs: Self): bool` | Inequality |
| `a < b` | `$Ord` | `op<(rhs: Self): bool` | Less than |
| `a <= b` | `$Ord` | `op<=(rhs: Self): bool` | Less or equal |
| `a > b` | `$Ord` | `op>(rhs: Self): bool` | Greater than |
| `a >= b` | `$Ord` | `op>=(rhs: Self): bool` | Greater or equal |

```vex
struct Version:$Eq, $Ord {
    major: i32,
    minor: i32,
    
    fn op==(other: Version): bool {
        self.major == other.major && self.minor == other.minor
    }
    
    fn op!=(other: Version): bool {
        !(self == other)
    }
    
    fn op<(other: Version): bool {
        if self.major != other.major {
            return self.major < other.major
        }
        self.minor < other.minor
    }
    
    fn op<=(other: Version): bool { self < other || self == other }
    fn op>(other: Version): bool { !(self <= other) }
    fn op>=(other: Version): bool { !(self < other) }
}
```

### Bitwise Operators

| Operator | Contract | Method | Example |
|----------|----------|--------|---------|
| `a & b` | `$BitAnd` | `op&(rhs: Self): Self` | AND |
| `a \| b` | `$BitOr` | `op\|(rhs: Self): Self` | OR |
| `a ^ b` | `$BitXor` | `op^(rhs: Self): Self` | XOR |
| `~a` | `$BitNot` | `op~(): Self` | NOT |
| `a << n` | `$Shl` | `op<<(rhs: i32): Self` | Left shift |
| `a >> n` | `$Shr` | `op>>(rhs: i32): Self` | Right shift |

```vex
struct Flags:$BitOr, $BitAnd {
    value: u32,
    
    fn op|(other: Flags): Flags {
        Flags { value: self.value | other.value }
    }
    
    fn op&(other: Flags): Flags {
        Flags { value: self.value & other.value }
    }
}

const READ = Flags { value: 1 }
const WRITE = Flags { value: 2 }
let perms = READ | WRITE  // Flags { value: 3 }
```

### Index Operators

| Operator | Contract | Method | Example |
|----------|----------|--------|---------|
| `a[i]` | `$Index` | `op[](index: Idx): Output` | Read access |
| `a[i] = v` | `$IndexMut` | `op[]=(index: Idx, value: Val)` | Write access |
| `a[i..j]` | `$Slice` | `op[..](start, end): Output` | Slice read |

```vex
struct Matrix:$Index, $IndexMut {
    type Output = f64;
    data: Vec<f64>,
    cols: i64,
    
    fn op[](index: i64): f64 {
        self.data.get(index)
    }
    
    fn op[]=(index: i64, value: f64) {
        // Set value at index
    }
}

let m = Matrix { ... }
let val = m[5]     // Calls op[]
m[5] = 3.14        // Calls op[]=
```

### Compound Assignment

| Operator | Contract | Method |
|----------|----------|--------|
| `a += b` | `$AddAssign` | `op+=(rhs: Self)` |
| `a -= b` | `$SubAssign` | `op-=(rhs: Self)` |
| `a *= b` | `$MulAssign` | `op*=(rhs: Self)` |
| `a /= b` | `$DivAssign` | `op/=(rhs: Self)` |
| `a %= b` | `$ModAssign` | `op%=(rhs: Self)` |
| `a &= b` | `$BitAndAssign` | `op&=(rhs: Self)` |
| `a \|= b` | `$BitOrAssign` | `op\|=(rhs: Self)` |
| `a ^= b` | `$BitXorAssign` | `op^=(rhs: Self)` |
| `a <<= n` | `$ShlAssign` | `op<<=(rhs: i32)` |
| `a >>= n` | `$ShrAssign` | `op>>=(rhs: i32)` |

```vex
struct Counter:$AddAssign {
    value: i32,
    
    fn op+=(amount: Counter) {
        self.value = self.value + amount.value
    }
}

let! c = Counter { value: 10 }
c += Counter { value: 5 }  // c.value is now 15
```

### Advanced Operators

| Operator | Contract | Method | Example |
|----------|----------|--------|---------|
| `a ** b` | `$Pow` | `op**(exp: i32): Self` | Power |
| `++a` | `$PreInc` | `op++(): Self` | Pre-increment |
| `a++` | `$PostInc` | `op++(): Self` | Post-increment |
| `--a` | `$PreDec` | `op--(): Self` | Pre-decrement |
| `a--` | `$PostDec` | `op--(): Self` | Post-decrement |
| `a..b` | `$Range` | `op..(end): Range<Self>` | Range |
| `a..=b` | `$RangeInclusive` | `op..=(end): RangeInclusive<Self>` | Inclusive range |
| `a ?? b` | `$NullCoalesce` | `op??(fallback): Self` | Null coalesce |

## External Operator Methods

You can also define operators outside the struct using **method syntax**:

```vex
struct Vector2 {
    x: f64,
    y: f64,
}

// External operator method
fn (self: Vector2) op+(other: Vector2): Vector2 {
    Vector2 {
        x: self.x + other.x,
        y: self.y + other.y,
    }
}

// Works the same
let v1 = Vector2 { x: 1.0, y: 2.0 }
let v2 = Vector2 { x: 3.0, y: 4.0 }
let v3 = v1 + v2
```

## Custom Contracts

Define your own contracts for domain-specific operators:

```vex
// Custom scalar multiplication contract
contract ScalarMul {
    mul_scalar(scalar: f64): Self;
}

struct Vec3:ScalarMul {
    x: f64,
    y: f64,
    z: f64,
    
    fn mul_scalar(scalar: f64): Vec3 {
        Vec3 {
            x: self.x * scalar,
            y: self.y * scalar,
            z: self.z * scalar,
        }
    }
}

let v = Vec3 { x: 1.0, y: 2.0, z: 3.0 }
let scaled = v.mul_scalar(2.5)
```

## Implementing Multiple Contracts

A single struct can implement multiple operator contracts:

```vex
struct Complex:$Add, $Sub, $Mul, $Eq, $Display {
    real: f64,
    imag: f64,
    
    fn op+(other: Complex): Complex {
        Complex { real: self.real + other.real, imag: self.imag + other.imag }
    }
    
    fn op-(other: Complex): Complex {
        Complex { real: self.real - other.real, imag: self.imag - other.imag }
    }
    
    fn op*(other: Complex): Complex {
        // (a + bi)(c + di) = (ac - bd) + (ad + bc)i
        Complex {
            real: self.real * other.real - self.imag * other.imag,
            imag: self.real * other.imag + self.imag * other.real,
        }
    }
    
    fn op==(other: Complex): bool {
        self.real == other.real && self.imag == other.imag
    }
    
    fn op!=(other: Complex): bool {
        !(self == other)
    }
    
    fn display(): string {
        // Format as "a + bi"
        return "Complex"
    }
}
```

## Non-Overloadable Operators

The following operators **cannot** be overloaded:

| Operator | Reason |
|----------|--------|
| `&&` | Short-circuit evaluation |
| `\|\|` | Short-circuit evaluation |
| `=` | Assignment semantics |
| `.` | Member access |
| `?.` | Optional chaining |

## Best Practices

1. **Follow semantics** - `op+` should behave like addition
2. **Implement related operators** - If `op==`, also implement `op!=`
3. **Return Self** - Arithmetic operators should return `Self` type
4. **Don't surprise** - Operators should be intuitive for users
5. **Use contracts** - They provide compile-time checking

## Example: Matrix Type

```vex
struct Matrix:$Add, $Mul, $Index, $Eq {
    type Output = f64;
    data: Vec<f64>,
    rows: i64,
    cols: i64,
    
    fn op+(other: Matrix): Matrix {
        $assert(self.rows == other.rows && self.cols == other.cols)
        let! result = Vec.with_capacity<f64>(self.data.len())
        for i in 0..self.data.len() {
            result.push(self.data.get(i) + other.data.get(i))
        }
        Matrix { data: result, rows: self.rows, cols: self.cols }
    }
    
    fn op*(other: Matrix): Matrix {
        $assert(self.cols == other.rows)
        // Matrix multiplication implementation
        // ...
    }
    
    fn op[](index: i64): f64 {
        self.data.get(index)
    }
    
    fn op==(other: Matrix): bool {
        if self.rows != other.rows || self.cols != other.cols {
            return false
        }
        for i in 0..self.data.len() {
            if self.data.get(i) != other.data.get(i) {
                return false
            }
        }
        true
    }
    
    fn op!=(other: Matrix): bool {
        !(self == other)
    }
}

fn main(): i32 {
    let a = Matrix { ... }
    let b = Matrix { ... }
    let c = a + b       // Matrix addition
    let d = a * b       // Matrix multiplication
    let val = c[0]      // Index access
    let eq = a == b     // Equality check
    return 0
}
```

## Related Topics

- [Contracts](/guide/types/contracts) - Contract system
- [Structs](/guide/types/structs) - Defining types
- [Methods](/guide/advanced/methods) - Method syntax
