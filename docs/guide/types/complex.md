# Complex Numbers

`Complex<T>` is a prelude type for complex number arithmetic. It stores a real and imaginary part, both of type `T`, where `T` must be a floating-point type (`f16`, `f32`, or `f64`).

## Construction

```vex
// From real and imaginary parts
let c1: Complex<f64> = Complex.new(3.0, 4.0)

// From real part only (imaginary = 0)
let c2 = Complex.fromReal(5.0)

// Pure imaginary
let c3 = Complex.fromImaginary(2.5)

// Zero
let zero: Complex<f64> = Complex.zero()
```

## Accessing Components

```vex
let c = Complex.new(3.0, 4.0)

let re = c.real()       // 3.0
let im = c.imaginary()  // 4.0
```

## Arithmetic Operations

Complex numbers support all standard arithmetic operators:

```vex
let a = Complex.new(1.0, 2.0)
let b = Complex.new(3.0, 4.0)

let sum = a + b          // Complex.new(4.0, 6.0)
let diff = a - b         // Complex.new(-2.0, -2.0)
let prod = a * b         // Complex.new(-5.0, 10.0)
let quot = a / b         // Complex.new(0.44, 0.08)

let neg = -a             // Complex.new(-1.0, -2.0)
```

### Scalar Operations

```vex
let c = Complex.new(3.0, 4.0)

let scaled = c * 2.0     // Complex.new(6.0, 8.0)
let halved = c / 2.0     // Complex.new(1.5, 2.0)

// Scalar addition adds to real part
let shifted = c + 10.0   // Complex.new(13.0, 4.0)
```

## Magnitude and Phase

```vex
let c = Complex.new(3.0, 4.0)

let mag = c.magnitude()       // 5.0 (sqrt(3^2 + 4^2))
let mag_sq = c.magnitudeSquared()  // 25.0 (3^2 + 4^2)
let phase = c.phase()         // atan2(4.0, 3.0) ~ 0.927 radians
```

## Conjugate and Reciprocal

```vex
let c = Complex.new(3.0, 4.0)

let conj = c.conjugate()   // Complex.new(3.0, -4.0)
let recip = c.reciprocal()  // Complex.new(0.12, -0.16)
```

## Equality and Comparison

Complex numbers support equality comparison but NOT ordering (there is no natural total order on complex numbers):

```vex
let a = Complex.new(1.0, 2.0)
let b = Complex.new(1.0, 2.0)
let c = Complex.new(3.0, 4.0)

let same = a == b    // true
let diff = a != c    // true

// a < b   // COMPILE ERROR: Complex<f64> does not implement Ord
```

## Common Functions

```vex
let c = Complex.new(3.0, 4.0)

// Exponential and logarithm
let exp_c = c.exp()        // e^c
let ln_c = c.ln()          // natural log

// Power and square root
let squared = c.pow(2.0)   // c^2
let root = c.sqrt()        // principal square root

// Trigonometric
let sin_c = c.sin()
let cos_c = c.cos()
let tan_c = c.tan()
```

## Conversion

```vex
let c64: Complex<f64> = Complex.new(3.0, 4.0)

// Convert to other floating precision
let c32: Complex<f32> = c64.as_f32()
let c16: Complex<f16> = c64.as_f16()

// From polar coordinates
let fromPolar = Complex.fromPolar(5.0, 0.927)  // magnitude=5, phase=0.927
// Approx Complex.new(3.0, 4.0)
```

## Use Cases

Complex numbers are essential for:

- **Signal processing**: FFT, filters, waveforms
- **Control systems**: Transfer functions, root locus
- **Physics simulations**: Quantum mechanics, electromagnetics
- **Fractals**: Mandelbrot set, Julia sets
- **Fluid dynamics**: Potential flow

```vex
// Mandelbrot iteration
fn mandelbrotIter(c: Complex<f64>, maxIter: i32): i32 {
    let! z: Complex<f64> = Complex.zero()
    for iter in 0..maxIter {
        if z.magnitudeSquared() > 4.0 {
            return iter
        }
        z = z * z + c
    }
    return maxIter
}
```

## Tensor Integration

Complex numbers work with Vex's SIMD tensor system. Arrays of complex numbers auto-vectorize:

```vex
let signals: [Complex<f64>; 4] = [
    Complex.new(1.0, 0.0),
    Complex.new(0.0, 1.0),
    Complex.new(-1.0, 0.0),
    Complex.new(0.0, -1.0),
]

// Element-wise operations are SIMD-accelerated
let scaled = signals * Complex.new(2.0, 0.0)
let conjugated = signals.map(|s|  s.conjugate())
```

## Memory Layout

`Complex<f64>` has the same layout as `[f64; 2]` and is compatible with C's `_Complex double`:

```vex
// Same memory representation
let complex_val: Complex<f64> = Complex.new(3.0, 4.0)
let array_val: [f64; 2] = [3.0, 4.0]

// Can be passed to C functions expecting _Complex double
extern "C" {
    fn cabs(z: Complex<f64>): f64
}
```
