# Moving from Python to Vex

This document addresses developers coming from Python, specifically in **AI, Game Development, and Scientific Computing**.

| Feature | Python | Vex | Why Switch? |
| :--- | :--- | :--- | :--- |
| **Execution** | Interpreted (Slow) | Compiled (Native Metal Speed) | **Orders of magnitude faster loop execution.** No need to vectorize manually with Numpy for logic. |
| **Concurrency** | GIL (Global Interpreter Lock) | True Parallelism (M:N Scheduler) | Utilize 100% of all CPU cores without `multiprocessing` overhead. |
| **Type System** | Dynamic (Runtime Errors) | Static (Compile-time Safety) | Catch bugs instantly. No `AttributeError` in production after 3 days of training. |
| **Memory** | Garbage Collection (Pauses) | Ownership & Borrowing | Predictable performance for Game loops and Real-time audio/inference. |
| **GPU/AI** | Wrapper (PyTorch/Tensorflow) | **Native SPIR-V Kernel Gen** | Write your custom kernels **in Vex**. No need to learn CUDA/C++ to optimize a layer. |

## The "Two-Language" Problem

In the current ecosystem, you prototype in Python. If it's too slow:
1.  Vectorize with Numpy (rewrite logic).
2.  Compile with Numba/Cython (add complexity).
3.  Rewrite critical parts in C++/CUDA (nightmare).

**Vex solves this by being the single language for both high-level logic and low-level kernels.**

## Comparison for AI/Science

### 1. The Loop Problem
**Python:**
```python
# SLOW: Python loop overhead is massive
res = []
for x in data:
    res.(math.sin(x) * x)
```

**Vex:**
```vex
# FAST: Auto-vectorized to AVX-512 or compiled to GPU SPIR-V
let result = data.map(|x| sin(x) * x);
```
*Why:* Vex compiles this down to the exact machine instructions (or SPIR-V shader) needed.

### 2. Custom Kernels
**Python (PyTorch):**
You are limited to the operations PyTorch provides. Need a custom activation function? It will be slow in pure Python.

**Vex:**
```vex
// Define a custom, high-performance kernel natively
fn custom_activation(x: f32): f32 {
    if x > 0.0 { return x; }
    return x * 0.01 + sin(x); // Works at CUDA speeds
}
```

## Migration Strategy: "Vex for the Engine, Python for the Glue?"

Actually, Vex aims to replace the Glue too. HOWEVER, we know rewriting everything is scary.

### The "Lazy Adoption" Path (FFI)
**Good News:** You don't have to rewrite your entire codebase. Vex is designed to play nice with C-ABI, meaning you can compile Vex code into a shared library and import it directly into Python (like a C extension).

**Workflow:**
1.  Keep your existing Django/FastAPI/PyTorch app in Python.
2.  Identify the **single slowest function** (the bottleneck).
3.  Rewrite JUST that function in Vex.
4.  Export it (`export fn ...`) and build as a dynamic library (`.so` / `.dll`).
5.  Call it from Python using `ctypes` or a future native Vex-Python bridge.

```python
# python_app.py
import my_fast_vex_module

# The rest of your app is slow Python
data = get_data()

# Only the heavy lifting is done in Vex (Hyper-fast)
result = my_fast_vex_module.process_data(data)
```

This "Incremental Migration" lets you stay in your comfort zone while injecting adrenaline into the critical parts of your app.

### Long Term Vision
1.  **Readability:** Vex syntax is designed to be clean (`let`, `fn`, `defer`), minimizing the shock for Pythonistas.
2.  **Safety:** The borrow checker prevents the common C++ segfaults that scare Python developers away from systems programming.
3.  **Tooling:** (Future Goal) **Jupyter Kernel Support**. Being able to run Vex interactively is critical for this audience.

## Vex vs Mojo

*   **Mojo:** Tries to be a superset of Python. Inherits some Python complexity/legacy to maintain compatibility.
*   **Vex:** A fresh start. No GIL. No legacy dynamic typing baggage. Just pure, clean systems programming that feels like a scripting language but runs like C++.

## Summary for Python Developers
You don't just "write code" in Vex; you architect high-performance systems without the pain of C++. Whether you are building a Game Engine or a Diffusion Model, Vex gives you the control of the hardware that Python abstracts away, without the memory management headaches of C++.
