# ml

Vex isn't just for building network infrastructure or CLI tools—it was designed ground-up for the new era of computing: **Machine Learning and Local LLMs**.

The `ml` module houses essential Deep Learning primitive operations. These algorithms form the standard building blocks of Transformer architectures and neural networks, directly optimized via Vex's `graph fn` for parallel execution on the CPU and GPU (Metal/SPIR-V).

## Integrated Operations

The `ml` module includes primitives that ordinarily require importing massive dependency chains (like `torch` or `llama.cpp`) in other ecosystems. In Vex, they are native standard library utilities:

- **`RMSNorm`**: Root Mean Square Normalization. Extensively unrolled and vectorized for CPU; reduced via tree-reductions on GPU.
- **`LayerNorm`**: Standard Layer Normalization.
- **`Softmax`**: Matrix and vector softmax functionality with safety assertions to avoid over-tensor exponentiation `NaN` corruption.
- **`Attention`**: Scaled Dot-Product Attention kernels (and soon Flash Attention paths).

## Zero-Ping-Pong Architecture

All of `ml` functions are labeled as `graph fn`. When used inside a Vex `graph { }` execution block, the entire logic tree pushes onto the GPU synchronously without costly ping-ponging of data buffers back to the CPU between layers.

```rust
import { RMSNorm, Softmax } from "ml";

// When compiled inside a graph execution pipeline:
graph fn my_hidden_layer(t: Tensor<f32>, w: Tensor<f32>) {
    let normalized = RMSNorm(t, w); // Stays on GPU
    let probabilities = Softmax(normalized); // Stays on GPU
    return probabilities;
}
```
