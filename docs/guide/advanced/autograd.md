# Automatic Differentiation (Autograd)

Vex provides **built-in automatic differentiation** for machine learning, physics simulations, and scientific computing. No external libraries needed!

::: tip What is Autograd?
Autograd automatically computes gradients (derivatives) of your functions. This is essential for:
- Training neural networks (backpropagation)
- Physics simulations (sensitivity analysis)
- Optimization problems (gradient descent)
:::

## The `@{ }` Block

The autograd block `@{ ... }` creates a **differentiable scope**. Inside this scope, operations on "parameters" are tracked to compute gradients.

```vex
fn main(): i32 {
    let x = 3.0
    
    // Autograd block - computes value AND gradient
    let result = @{
        let p = $param(x)      // Mark x as a parameter
        p * p + 2.0 * p + 1.0  // f(x) = x² + 2x + 1
    }
    
    // Extract results
    let value = $val(result)    // f(3) = 9 + 6 + 1 = 16
    let gradient = $grad(result) // f'(x) = 2x + 2, f'(3) = 8
    
    $println(f"f(3) = {value}")      // 16.0
    $println(f"f'(3) = {gradient}")  // 8.0
    
    return 0
}
```

## Autograd Intrinsics

| Intrinsic | Description |
|-----------|-------------|
| `$param(x)` | Mark variable `x` as a tracked parameter |
| `$val(res)` | Extract the computed value (primal) |
| `$grad(res)` | Extract the gradient (derivative) |
| `$detach(x)` | Stop gradient tracking (for inference) |

## Supported Operations

### Arithmetic Operations

All basic arithmetic is autograd-aware:

```vex
let result = @{
    let x = $param(a)
    let y = $param(b)
    
    x + y      // ∂/∂x = 1, ∂/∂y = 1
    x - y      // ∂/∂x = 1, ∂/∂y = -1
    x * y      // ∂/∂x = y, ∂/∂y = x
    x / y      // ∂/∂x = 1/y, ∂/∂y = -x/y²
    x ^ n      // ∂/∂x = n·x^(n-1) (power rule)
}
```

### Math Functions

Built-in math functions support automatic differentiation:

```vex
let trig_result = @{
    let x = $param(angle)
    $sin(x)    // ∂/∂x = cos(x)
}

let exp_result = @{
    let x = $param(val)
    $exp(x)    // ∂/∂x = exp(x)
}

let log_result = @{
    let x = $param(val)
    $log(x)    // ∂/∂x = 1/x
}

let sqrt_result = @{
    let x = $param(val)
    $sqrt(x)   // ∂/∂x = 1/(2√x)
}

let pow_result = @{
    let x = $param(base)
    $pow(x, 3.0)  // ∂/∂x = 3x²
}
```

### Complete Example: Trigonometric Derivatives

```vex
fn main(): i32 {
    let x = 3.0
    
    // g(x) = sin(x)
    // g'(x) = cos(x)
    let trig_res = @{
        let p = $param(x)
        $sin(p)
    }
    
    $println(f"sin({x}) = {$val(trig_res)}")    // ~0.14112
    $println(f"cos({x}) = {$grad(trig_res)}")   // ~-0.98999
    
    return 0
}
```

### Advanced Math Example

```vex
fn main(): i32 {
    let x = 3.0
    
    // f(x) = √x + log(x) + exp(x)
    // f'(x) = 1/(2√x) + 1/x + exp(x)
    let result = @{
        let p = $param(x)
        $sqrt(p) + $log(p) + $exp(p)
    }
    
    // At x = 3:
    // val ≈ 1.732 + 1.099 + 20.086 ≈ 22.916
    // grad ≈ 0.289 + 0.333 + 20.086 ≈ 20.707
    $println(f"f(3) = {$val(result)}")
    $println(f"f'(3) = {$grad(result)}")
    
    return 0
}
```

## How It Works

Vex implements **Forward-Mode Automatic Differentiation** using **Dual Numbers**.

### Dual Numbers

Each tracked value becomes a dual number: $v + \varepsilon d$ where:
- $v$ is the primal value
- $d$ is the derivative (tangent)
- $\varepsilon^2 = 0$ (infinitesimal)

### Chain Rule

Operations automatically propagate derivatives using the chain rule:

$$\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)$$

### Compiler Optimization

The Vex compiler (SIR) can:
- Fuse autograd operations with computation loops
- Eliminate memory overhead of computation graphs
- Generate optimized gradient code at compile time

## Machine Learning Example

### Linear Regression

```vex
fn train_step(x: f64, y_true: f64, w: f64, b: f64, lr: f64): (f64, f64) {
    // Forward pass with gradient tracking
    let loss_result = @{
        let weight = $param(w)
        let bias = $param(b)
        
        // Prediction: y = wx + b
        let y_pred = weight * x + bias
        
        // MSE Loss: (y_pred - y_true)²
        let loss = (y_pred - y_true) * (y_pred - y_true)
        loss
    }
    
    let loss = $val(loss_result)
    let grad_w = $grad(loss_result)  // ∂loss/∂w
    let grad_b = $grad(loss_result)  // ∂loss/∂b (second param)
    
    // Gradient descent update
    let new_w = w - lr * grad_w
    let new_b = b - lr * grad_b
    
    return (new_w, new_b)
}
```

### Neural Network Layer

```vex
fn linear_layer(input: [f64], weights: [[f64]], bias: [f64]): @Dual {
    @{
        let w = $param(weights)
        let b = $param(bias)
        
        // Matrix multiplication + bias
        (input <*> w) + b
    }
}

fn relu(x: @Dual): @Dual {
    @{
        let p = $param(x)
        if $val(p) > 0.0 { p } else { 0.0 }
    }
}
```

## Stopping Gradients

Use `$detach` to stop gradient propagation:

```vex
fn inference(x: f64, w: f64): f64 {
    // During inference, we don't need gradients
    let result = @{
        let weight = $detach(w)  // No gradient tracking
        let input = $param(x)
        input * weight
    }
    return $val(result)
}
```

## Comparison with Other Languages

| Feature | Vex | PyTorch | JAX | Julia |
|---------|-----|---------|-----|-------|
| Syntax | `@{ $param(x) }` | `requires_grad=True` | `grad(fn)` | `gradient(fn)` |
| Mode | Forward | Reverse | Both | Both |
| Built-in | ✅ | Library | Library | Library |
| Compile-time | ✅ | ❌ | ✅ (JIT) | ✅ (JIT) |

## Best Practices

1. **Mark only needed parameters** - Don't `$param` constants
2. **Use `$detach` for inference** - Saves computation
3. **Keep autograd blocks focused** - One computation per block
4. **Extract gradients immediately** - Before the result goes out of scope

```vex
// ✅ Good: Clear, focused autograd block
let result = @{
    let w = $param(weights)
    compute_loss(input, w, target)
}
let grad = $grad(result)

// ❌ Avoid: Too much in one block
let result = @{
    let w = $param(weights)
    let preprocessed = preprocess(input)  // Could be outside
    let normalized = normalize(preprocessed)  // Could be outside
    compute_loss(normalized, w, target)
}
```

## Next Steps

- [GPU Computing](/guide/gpu/) - GPU-accelerated autograd
- [SIMD](/guide/simd/) - Vectorized operations
- [Comptime](/guide/advanced/comptime) - Compile-time computation

