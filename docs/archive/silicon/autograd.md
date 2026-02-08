# Automatic Differentiation (Autograd)

Vex makes gradient computation a native feature of the language, enabling seamless Deep Learning and scientific computing workflows without external libraries.

## The `@` Operator

Autograd is activated using the `@` block syntax or specific autograd intrinsics.

### Block Syntax

The `@{ ... }` block creates a differentiable scope. Inside this scope, operations on "parameters" are tracked to build a computation graph (or calculate gradients on the fly).

```vex
fn train_step(x: [f32], target: f32, w: [f32]): [f32] {
    let result = @{
        // 1. Mark 'w' as a parameter to track
        let weights = $param(w);
        
        // 2. Perform tensor operations
        let pred = $sum(x * weights);
        
        // 3. Calculate loss
        let loss = (pred - target) ^ 2;
        
        // 4. Return the loss to be differentiated
        loss
    };
    
    // Extract results
    let loss_value = $val(result);
    let gradients = $grad(result); // Gradient of loss w.r.t weights
    
    return gradients;
}
```

## Intrinsics

| Intrinsic | Description |
| :--- | :--- |
| `$param(x)` | Marks variable `x` as a leaf parameter for gradient tracking. |
| `$val(res)` | Extracts the primal value (the result of the computation). |
| `$grad(res)` | Extracts the gradient (the derivative w.r.t parameters). |
| `$detach(x)` | Stops gradient propagation for a variable (useful for inference). |

## How It Works

Vex implements **Forward-Mode Automatic Differentiation** (and plans for Reverse-Mode) using Dual Numbers or source-to-source transformation.

1.  **Dual Numbers:** Each number is represented as $v + \epsilon d$, where $\epsilon^2 = 0$.
2.  **Chain Rule:** Operations automatically propagate derivaties:
    $$ \frac{d}{dx}(f(g(x))) = f'(g(x)) \cdot g'(x) $$
3.  **Compiler Optimization:** The Vex compiler (SIR) can fuse autograd operations with the computation loop, eliminating the memory overhead of storing the computation graph often seen in libraries like PyTorch.

## Supported Operations

Most built-in math functions and operators are autograd-aware:
- Arithmetic: `+`, `-`, `*`, `/`, `^`
- Math Functions: `$sin`, `$cos`, `$exp`, `$log`
- Reductions: `$sum`, `$mean`
- Linear Algebra: `<*>`, `·`

## Example: Neural Network Layer

```vex
fn linear_layer(input: [f32], weight: Matrix, bias: [f32]) -> @Tensor {
    @{
        let w = $param(weight);
        let b = $param(bias);
        (input <*> w) + b
    }
}
```
