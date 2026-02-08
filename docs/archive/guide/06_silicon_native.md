# Chapter 6: Silicon Native Tutorial

This is where Vex shines. Most languages require you to import heavy libraries (NumPy, PyTorch, Eigen) to do high-performance math. In Vex, the compiler *understands* vectors, matrices, and gradients.

## 6.1 Everything is a Vector

In Vex, an array `[T; N]` isn't just a list of numbers; it's a vector in the mathematical sense.

### Auto-Vectorization
Write standard loops or operators, get SIMD (Single Instruction, Multiple Data) for free.

```vex
let a: [f32; 8] = [1.0, 2.0, 3.0, 4.0, ...];
let b: [f32; 8] = [0.5, 0.5, 0.5, 0.5, ...];

// This compiles to AVX-512 vaddps / vmulps instructions
let result = (a + b) * 2.0; 
```

You don't need annotations. The compiler sees `[f32; 8]` and knows your CPU has 256-bit or 512-bit registers.

## 6.2 Matrix Operations

Linear algebra uses the `<...>` family of operators.

```vex
// Define a 2x3 matrix
let A = [
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0]
];

// Define a 3x1 vector (as a matrix)
let B = [
    [1.0],
    [2.0],
    [3.0]
];

// Matrix Multiplication: A (2x3) * B (3x1) => (2x1)
let C = A <*> B; // Result: [[14.0], [32.0]]
```

Common operators:
- `<*>`: Matrix multiplication
- `'`: Transpose (`A'`)
- `<^>`: Matrix power
- `<` / `>`: Reductions (`\>A` gets max element)

## 6.3 Autograd: Machine Learning from Scratch

The `@` operator creates a **differentiable scope**. Inside, Vex tracks every operation on variables marked with `$param`.

Let's implement a single neuron calculation: $y = (w \cdot x + b)^2$.

```vex
fn neuron_step() {
    let x: [f32; 3] = [0.5, -0.5, 1.0];
    let w_init: [f32; 3] = [0.1, 0.2, 0.3];
    let b_init: f32 = 0.0;
    
    // Computation graph
    let result = @{
        // 1. Mark parameters
        let w = $param(w_init);
        let b = $param(b_init);
        
        // 2. Forward pass (Dot product + add)
        let activation = $sum(w * x) + b;
        
        // 3. Loss (let's say we want output to be 0)
        activation * activation 
    };
    
    // Get results
    let loss_val = $val(result);
    let gradients = $grad(result); // Returns struct of { w, b } gradients
    
    println(f"Loss: {loss_val}");
    // We can now update weights: w = w - learning_rate * gradients.w
}
```

## 6.4 GPU Offloading

For massive arrays, Vex can offload to the GPU automatically. Note: This requires the `gpu` feature enabled.

```vex
// A huge array (too big for CPU cache)
let big_data: [f32; 1_000_000] = ...;

// The compiler may decide to run this on GPU (Metal/Vulkan)
let squared = result ^ 2.0; 
```

## Summary
- Use `[T; N]` for vectors.
- Use `<*>` for linear algebra.
- Use `@{ ... }` for derivatives.
- Vex handles the hardware backend (SIMD/GPU) for you.
