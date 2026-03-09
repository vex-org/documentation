# inference

Coupled directly with `ml`, the `inference` module provides higher-level abstractions targeted towards local LLM execution. 

If `ml` is the raw linear algebra, `inference` is the architecture. It maps model weights extracted from architectures (like GGUF or Safetensors) and routes them through Vex's `VUMM` and Graph architecture efficiently.

## Features

- **Batched Dequantization**: Translates `Q4_0`, `Q4_1`, etc. compressed integers directly into GPU memory floating point registers on the fly.
- **RoPE (Rotary Positional Embeddings)**: Highly optimized sinusodial rotary position embedding applications.
- **K/V Cache Management**: Allocates and updates Key-Value caches representing sequence contexts automatically.
- **Transformer Pipelines**: Ready-to-go `graph fn` implementations representing full decoder layers.

## The Objective: 100% Graph Inference

Because the standard inference library natively links to Vex SIR (Silicon Intermediate Representation), evaluating a token for models like TinyLlama or Llama-3 skips overhead entirely, streaming operations parallel directly across Metal / WebGPU pipelines.
