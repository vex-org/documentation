# SIR and Backends

SIR, short for Silicon IR, is the graph-oriented lowering path used for Vex's data-parallel execution model.

## What SIR Is For

SIR is the part of the architecture that turns array-, tensor-, and graph-friendly computation into backend-specific execution plans.

Typical features routed through or associated with this layer include:

- tensor and mask lowering
- fused arithmetic graphs
- reductions and SIMD-oriented ops
- backend-specific code generation

## Main Idea

```text
Vex source
  -> HIR
  -> SIR graph
  -> optimization / fusion / lowering
  -> backend codegen
```

## Backend Maturity

The repository's own backend status documentation makes an important distinction: not every SIR backend is equally mature.

### Generally strongest path

- SIMD is the most mature backend family today.

### Partial or mixed maturity paths

- Metal has meaningful codegen but runtime path constraints still matter.
- CUDA and ROCm have serious codegen work but runtime execution is not uniformly production-complete.
- SPIR-V and WGSL generation exist, but runtime and correctness coverage are not equivalent to “all targets fully finished”.

The correct reading is: SIR is a real subsystem, but backend readiness differs by target.

## Why This Matters for Documentation

When documenting Vex compute, it is more accurate to say:

- Vex has a real SIMD/SIR pipeline
- several accelerator backends exist
- execution maturity varies by target and runtime path

instead of implying that every backend has the same completeness and runtime guarantees.

## Routing and Fallbacks

The architecture includes runtime/backend selection and fallback logic. That means a graph may:

- stay on SIMD/CPU
- route to a specific backend
- fall back depending on capability, shape, or runtime constraints

This is part of why backend maturity and runtime availability both matter.

## Where to Read Next

- [SIMD Overview](/guide/simd/)
- [GPU Programming](/guide/gpu/)
- [Fusion Graph](/guide/fusion/graph)
- [Runtime & Tooling](/architecture/runtime-and-tooling)
