import{_ as s,o as n,c as e,ag as i}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Chapter 6: Silicon Native Tutorial","description":"","frontmatter":{},"headers":[],"relativePath":"archive/guide/06_silicon_native.md","filePath":"archive/guide/06_silicon_native.md"}'),t={name:"archive/guide/06_silicon_native.md"};function p(l,a,o,r,c,d){return n(),e("div",null,[...a[0]||(a[0]=[i(`<h1 id="chapter-6-silicon-native-tutorial" tabindex="-1">Chapter 6: Silicon Native Tutorial <a class="header-anchor" href="#chapter-6-silicon-native-tutorial" aria-label="Permalink to &quot;Chapter 6: Silicon Native Tutorial&quot;">​</a></h1><p>This is where Vex shines. Most languages require you to import heavy libraries (NumPy, PyTorch, Eigen) to do high-performance math. In Vex, the compiler <em>understands</em> vectors, matrices, and gradients.</p><h2 id="_6-1-everything-is-a-vector" tabindex="-1">6.1 Everything is a Vector <a class="header-anchor" href="#_6-1-everything-is-a-vector" aria-label="Permalink to &quot;6.1 Everything is a Vector&quot;">​</a></h2><p>In Vex, an array <code>[T; N]</code> isn&#39;t just a list of numbers; it&#39;s a vector in the mathematical sense.</p><h3 id="auto-vectorization" tabindex="-1">Auto-Vectorization <a class="header-anchor" href="#auto-vectorization" aria-label="Permalink to &quot;Auto-Vectorization&quot;">​</a></h3><p>Write standard loops or operators, get SIMD (Single Instruction, Multiple Data) for free.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let a: [f32; 8] = [1.0, 2.0, 3.0, 4.0, ...];</span></span>
<span class="line"><span>let b: [f32; 8] = [0.5, 0.5, 0.5, 0.5, ...];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// This compiles to AVX-512 vaddps / vmulps instructions</span></span>
<span class="line"><span>let result = (a + b) * 2.0;</span></span></code></pre></div><p>You don&#39;t need annotations. The compiler sees <code>[f32; 8]</code> and knows your CPU has 256-bit or 512-bit registers.</p><h2 id="_6-2-matrix-operations" tabindex="-1">6.2 Matrix Operations <a class="header-anchor" href="#_6-2-matrix-operations" aria-label="Permalink to &quot;6.2 Matrix Operations&quot;">​</a></h2><p>Linear algebra uses the <code>&lt;...&gt;</code> family of operators.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Define a 2x3 matrix</span></span>
<span class="line"><span>let A = [</span></span>
<span class="line"><span>    [1.0, 2.0, 3.0],</span></span>
<span class="line"><span>    [4.0, 5.0, 6.0]</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Define a 3x1 vector (as a matrix)</span></span>
<span class="line"><span>let B = [</span></span>
<span class="line"><span>    [1.0],</span></span>
<span class="line"><span>    [2.0],</span></span>
<span class="line"><span>    [3.0]</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Matrix Multiplication: A (2x3) * B (3x1) =&gt; (2x1)</span></span>
<span class="line"><span>let C = A &lt;*&gt; B; // Result: [[14.0], [32.0]]</span></span></code></pre></div><p>Common operators:</p><ul><li><code>&lt;*&gt;</code>: Matrix multiplication</li><li><code>&#39;</code>: Transpose (<code>A&#39;</code>)</li><li><code>&lt;^&gt;</code>: Matrix power</li><li><code>&lt;</code> / <code>&gt;</code>: Reductions (<code>\\&gt;A</code> gets max element)</li></ul><h2 id="_6-3-autograd-machine-learning-from-scratch" tabindex="-1">6.3 Autograd: Machine Learning from Scratch <a class="header-anchor" href="#_6-3-autograd-machine-learning-from-scratch" aria-label="Permalink to &quot;6.3 Autograd: Machine Learning from Scratch&quot;">​</a></h2><p>The <code>@</code> operator creates a <strong>differentiable scope</strong>. Inside, Vex tracks every operation on variables marked with <code>$param</code>.</p><p>Let&#39;s implement a single neuron calculation: $y = (w \\cdot x + b)^2$.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn neuron_step() {</span></span>
<span class="line"><span>    let x: [f32; 3] = [0.5, -0.5, 1.0];</span></span>
<span class="line"><span>    let w_init: [f32; 3] = [0.1, 0.2, 0.3];</span></span>
<span class="line"><span>    let b_init: f32 = 0.0;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Computation graph</span></span>
<span class="line"><span>    let result = @{</span></span>
<span class="line"><span>        // 1. Mark parameters</span></span>
<span class="line"><span>        let w = $param(w_init);</span></span>
<span class="line"><span>        let b = $param(b_init);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // 2. Forward pass (Dot product + add)</span></span>
<span class="line"><span>        let activation = $sum(w * x) + b;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // 3. Loss (let&#39;s say we want output to be 0)</span></span>
<span class="line"><span>        activation * activation </span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Get results</span></span>
<span class="line"><span>    let loss_val = $val(result);</span></span>
<span class="line"><span>    let gradients = $grad(result); // Returns struct of { w, b } gradients</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    println(f&quot;Loss: {loss_val}&quot;);</span></span>
<span class="line"><span>    // We can now update weights: w = w - learning_rate * gradients.w</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_6-4-gpu-offloading" tabindex="-1">6.4 GPU Offloading <a class="header-anchor" href="#_6-4-gpu-offloading" aria-label="Permalink to &quot;6.4 GPU Offloading&quot;">​</a></h2><p>For massive arrays, Vex can offload to the GPU automatically. Note: This requires the <code>gpu</code> feature enabled.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// A huge array (too big for CPU cache)</span></span>
<span class="line"><span>let big_data: [f32; 1_000_000] = ...;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// The compiler may decide to run this on GPU (Metal/Vulkan)</span></span>
<span class="line"><span>let squared = result ^ 2.0;</span></span></code></pre></div><h2 id="summary" tabindex="-1">Summary <a class="header-anchor" href="#summary" aria-label="Permalink to &quot;Summary&quot;">​</a></h2><ul><li>Use <code>[T; N]</code> for vectors.</li><li>Use <code>&lt;*&gt;</code> for linear algebra.</li><li>Use <code>@{ ... }</code> for derivatives.</li><li>Vex handles the hardware backend (SIMD/GPU) for you.</li></ul>`,22)])])}const g=s(t,[["render",p]]);export{u as __pageData,g as default};
