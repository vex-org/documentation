# ml

`ml` provides pure Vex building blocks for normalization, activations, linear
algebra and attention. Compute kernels use Tensor operators and `graph fn`
where supported; orchestration and borrowed-view helpers also use ordinary
functions. A graph declaration is not a guarantee of GPU execution or a
single fused dispatch.

## Integrated Operations

- `norm`, `rms_norm`: RMS normalization.
- `layernorm`, `layer_norm`: layer normalization.
- `softmax`, `log_softmax`, `relu`, `silu`, `swiglu`, `gelu`: activations.
  Softmax subtracts the maximum before exponentiation; this does not define
  every empty-input, NaN or infinity case. `gelu` currently uses a sigmoid
  approximation, not the exact Gaussian-error-function formula.
- `linear`, `dot`, `matvec`: linear algebra, with additional Span helpers.
- `fused_attend`, `extract_k_head`, `extract_v_head_t`,
  `multi_head_attention`, `argmax`: attention and scoring helpers.

## Graph composition and ownership

Import the actual lowercase API names. For example:

```vex
import { norm, softmax } from "ml";

graph fn hidden_layer(t: Tensor<f32>, w: Tensor<f32>): Tensor<f32> {
    return softmax(norm(t, w));
}
```

Graph composition exposes operations to SIR. Backend support, shapes and
dispatch decisions determine the actual execution plan. Inspect compiler
diagnostics and retained IR before claiming fusion or transfer-free GPU work.

Attention cache extraction accepts a borrowed `Span<T>` over a row-major
`[seq_len, kv_dim]` cache. K extraction returns `[seq_len, head_dim]`; V
extraction returns its transposed `[head_dim, seq_len]` layout. Both return
independent owned Tensors and preserve the cache. Negative dimensions,
out-of-row heads and layouts larger than the supplied Span panic before
generating indices. Empty rows/heads return empty Tensors.

`span_view(&tensor)` and `tensor_ptr(&tensor)` borrow an existing Tensor;
they do not consume it. The Span cannot outlive its owner. `tensor_view(span)`
creates an independent owned Tensor in ordinary code. `copy_tensor` requires
`Ptr<T!>`, `&Tensor<T>` and `T: Copy`; it is unsafe because the caller must
prove destination capacity and non-overlap. Its source count is checked.

## Validation boundary — 2026-09-07

The discoverable ML suite has 31 passing tests at both O0 and O3, including
the package-root example above. Separate ownership and invalid-layout gates
are retained in the source report. This is not yet a complete model-inference
or physical-GPU qualification.

Known compiler work remains: dynamic `Tensor.arange` graph lowering and shape
transport, generic graph-callee staging for the composed example, and GPU
bridging for multiple runtime-K matrix multiplications in one graph. These
currently prevent some helpers from staying on the intended fused SIR/GPU
path. CPU test success must not be presented as GPU parity.

See `lib/std/ml/tests/README.md` in the source repository for commands and the
current retained test report.
