# Silicon Operators

Vex includes a rich set of operators designed specifically for vector, matrix, and signal processing operations. These operators compile maps directly to efficient hardware instructions.

## 1. Advanced Arithmetic

### Saturating Arithmetic
Prevents overflow/underflow by clamping values at the type's minimum/maximum instead of wrapping.

| Operator | Name | Example | Description |
| :--- | :--- | :--- | :--- |
| `+|` | Sat Add | `a +| b` | Clamps at MAX. |
| `-|` | Sat Sub | `a -| b` | Clamps at MIN. |
| `*|` | Sat Mul | `a *| b` | Clamps at bounds. |

### Element-wise Min/Max/Clamp
| Operator | Name | Example | Description |
| :--- | :--- | :--- | :--- |
| `<?` | Min | `a <? b` | Element-wise minimum (`min(a, b)`). |
| `>?` | Max | `a >? b` | Element-wise maximum (`max(a, b)`). |
| `><` | Clamp | `x >< [0, 1]` | Clamp value to range. |

## 2. Linear Algebra

Linear algebra operations are distinct from element-wise operations to avoid ambiguity.

| Operator | Name | Example | Description |
| :--- | :--- | :--- | :--- |
| `<*>` | MatMul | `A <*> B` | Matrix Multiplication ($A \times B$). |
| `<\>` | Solve | `A <\> b` | Solve linear system $Ax = b$. |
| `<^>` | Power | `A <^> 3` | Matrix power ($A^3$). |
| `'` | Transpose | `A'` | Matrix transpose ($A^T$). |
| `×` | Cross | `a × b` | Vector cross product (3D). |
| `·` | Dot | `a · b` | Dot product (scalar product). |

## 3. Reduction Operators

Unary operators that reduce a vector to a scalar.

| Operator | Name | Example | Description |
| :--- | :--- | :--- | :--- |
| `\+` | Sum | `\+vec` | Sum of all elements ($\sum x_i$). |
| `\*` | Product | `\*vec` | Product of all elements ($\prod x_i$). |
| `\>` | Max | `\>vec` | Maximum element. |
| `\<` | Min | `\<vec` | Minimum element. |
| `\&` | All | `\&mask` | True if all elements are true. |
| `\|` | Any | `\|mask` | True if any element is true. |

## 4. Signal Processing & Bitwise

| Operator | Name | Example | Description |
| :--- | :--- | :--- | :--- |
| `<<<` | Rotate L | `a <<< 3` | Bitwise rotation left. |
| `>>>` | Rotate R | `a >>> 3` | Bitwise rotation right. |
| `*^` | Galois Mul | `a *^ b` | Carry-less multiplication (for Cryptography/CRC). |
| `[::s]` | Stride | `arr[::2]` | Slice with stride. |

## 5. Broadcasting

Vex supports NumPy-style broadcasting rules for element-wise operations.

```vex
// Scalar + Vector -> Vector
[1, 2, 3] + 10          // [11, 12, 13]

// Vector + Matrix -> Matrix (row broadcast)
let row = [1, 2, 3]
let mat = [[10, 20, 30], [40, 50, 60]]
row + mat               // [[11, 22, 33], [41, 52, 63]]
```

## Operator Precedence

| Priority | Operators |
| :--- | :--- |
| **High** | `'` (Transpose), `#` (Length) |
| | Unary: `-`, `~`, `\+`, `\*` ... |
| | Power: `^`, `**` |
| | Multiply: `*`, `/`, `<*>` |
| | Add: `+`, `-`, `+|` |
| | Shift/Rotate: `<<`, `>>>` |
| **Low** | Compare, Logic, Assign |
