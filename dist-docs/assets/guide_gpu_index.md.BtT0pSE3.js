import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"GPU & Compute with SIR","description":"","frontmatter":{},"headers":[],"relativePath":"guide/gpu/index.md","filePath":"guide/gpu/index.md"}'),t={name:"guide/gpu/index.md"};function i(l,a,o,r,c,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="gpu-compute-with-sir" tabindex="-1">GPU &amp; Compute with SIR <a class="header-anchor" href="#gpu-compute-with-sir" aria-label="Permalink to &quot;GPU &amp; Compute with SIR&quot;">​</a></h1><p>Vex provides GPU/compute programming through <strong>Silicon IR (SIR)</strong> - an intermediate representation designed for heterogeneous computing. SIR compiles to SPIR-V, WGSL, Metal Shading Language, and optimized SIMD code.</p><div class="tip custom-block"><p class="custom-block-title">Key Insight</p><p>Vex has <strong>NO attributes</strong> like <code>@silicon</code> or <code>#[...]</code>. GPU/compute is handled <strong>automatically</strong> by the SIR compiler when you use array operations. The compiler detects vectorizable patterns and generates optimal code for CPU (SIMD) or GPU backends.</p></div><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The SIR pipeline works automatically:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Vex Code → HIR → SIR Graph → Optimization → Backend Code</span></span>
<span class="line"><span>                                              ├─ LLVM IR (CPU/SIMD)</span></span>
<span class="line"><span>                                              ├─ SPIR-V (Vulkan)</span></span>
<span class="line"><span>                                              ├─ WGSL (WebGPU)</span></span>
<span class="line"><span>                                              └─ MSL (Metal)</span></span></code></pre></div><h2 id="operator-quick-reference" tabindex="-1">Operator Quick Reference <a class="header-anchor" href="#operator-quick-reference" aria-label="Permalink to &quot;Operator Quick Reference&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Category</th><th>Operators</th><th>Example</th></tr></thead><tbody><tr><td><strong>Arithmetic</strong></td><td><code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>%</code> <code>**</code></td><td><code>a + b</code>, <code>a ** 2</code></td></tr><tr><td><strong>Min/Max</strong></td><td><code>&lt;?</code> <code>&gt;?</code> <code>&gt;&lt;</code></td><td><code>a &lt;? b</code>, <code>a &gt;&lt; (lo, hi)</code></td></tr><tr><td><strong>Saturating</strong></td><td><code>+|</code> <code>-|</code> <code>*|</code></td><td><code>pixels +| 50</code></td></tr><tr><td><strong>Bitwise</strong></td><td><code>&amp;</code> <code>|</code> <code>^</code> <code>~</code> <code>&lt;&lt;</code> <code>&gt;&gt;</code></td><td><code>a &amp; b</code>, <code>a &lt;&lt; 2</code></td></tr><tr><td><strong>Rotation</strong></td><td><code>&lt;&lt;&lt;</code> <code>&gt;&gt;&gt;</code></td><td><code>x &lt;&lt;&lt; 3</code> (crypto)</td></tr><tr><td><strong>Comparison</strong></td><td><code>==</code> <code>!=</code> <code>&lt;</code> <code>&lt;=</code> <code>&gt;</code> <code>&gt;=</code></td><td><code>a &gt; 0</code> (returns mask)</td></tr><tr><td><strong>Reduction</strong></td><td><code>\\+</code> <code>\\*</code> <code>\\&lt;</code> <code>\\&gt;</code> <code>\\&amp;</code> <code>\\|</code></td><td><code>\\+ data</code> (sum)</td></tr><tr><td><strong>Matrix</strong></td><td><code>&lt;*&gt;</code> <code>·</code> <code>×</code> <code>&#39;</code></td><td><code>a &lt;*&gt; b</code>, <code>matrix&#39;</code></td></tr><tr><td><strong>Pipeline</strong></td><td><code>|&gt;</code></td><td><code>data |&gt; normalize |&gt; process</code></td></tr></tbody></table><h2 id="array-operations" tabindex="-1">Array Operations <a class="header-anchor" href="#array-operations" aria-label="Permalink to &quot;Array Operations&quot;">​</a></h2><p>SIR operates on Vex&#39;s built-in array types with <strong>element-wise operators</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Static arrays - size known at compile time</span></span>
<span class="line"><span>let a: [f32; 1024] = [0.0; 1024]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Dynamic arrays</span></span>
<span class="line"><span>let b: [f32] = [1.0, 2.0, 3.0, 4.0]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Array operations - NO loops needed!</span></span>
<span class="line"><span>fn vector_add(a: [f32], b: [f32]): [f32] {</span></span>
<span class="line"><span>    return a + b  // Element-wise addition, auto-vectorized</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn vector_scale(a: [f32], scale: f32): [f32] {</span></span>
<span class="line"><span>    return a * scale  // Scalar broadcasting</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="element-wise-operators" tabindex="-1">Element-wise Operators <a class="header-anchor" href="#element-wise-operators" aria-label="Permalink to &quot;Element-wise Operators&quot;">​</a></h2><p>SIR supports rich element-wise operations directly on arrays:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let a = [1.0, 2.0, 3.0, 4.0]</span></span>
<span class="line"><span>let b = [0.5, 1.0, 1.5, 2.0]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Arithmetic - works on entire arrays!</span></span>
<span class="line"><span>let c = a + b        // [1.5, 3.0, 4.5, 6.0]</span></span>
<span class="line"><span>let d = a * b        // [0.5, 2.0, 4.5, 8.0]</span></span>
<span class="line"><span>let e = a ** 2       // [1.0, 4.0, 9.0, 16.0]  (power)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Min/Max operators</span></span>
<span class="line"><span>let f = a &lt;? b       // Element-wise min: [0.5, 1.0, 1.5, 2.0]</span></span>
<span class="line"><span>let g = a &gt;? b       // Element-wise max: [1.0, 2.0, 3.0, 4.0]</span></span>
<span class="line"><span>let h = a &gt;&lt; (0.5, 3.0)  // Clamp: [1.0, 2.0, 3.0, 3.0]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Math functions apply element-wise</span></span>
<span class="line"><span>let i = $sin(a)      // [0.84, 0.91, 0.14, -0.76]</span></span>
<span class="line"><span>let j = $sqrt(a)     // [1.0, 1.41, 1.73, 2.0]</span></span>
<span class="line"><span>let k = $exp(a)      // [2.72, 7.39, 20.09, 54.60]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Comparisons return masks</span></span>
<span class="line"><span>let mask = a &gt; 2.0   // [false, false, true, true]</span></span></code></pre></div><h2 id="reduction-operators" tabindex="-1">Reduction Operators <a class="header-anchor" href="#reduction-operators" aria-label="Permalink to &quot;Reduction Operators&quot;">​</a></h2><p>Reduce entire arrays to single values with prefix operators:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let data = [1.0, 2.0, 3.0, 4.0, 5.0]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Reduction operators (prefix syntax)</span></span>
<span class="line"><span>let sum = \\+ data     // 15.0 (sum reduction)</span></span>
<span class="line"><span>let prod = \\* data    // 120.0 (product)</span></span>
<span class="line"><span>let max = \\&gt; data     // 5.0 (max reduction)</span></span>
<span class="line"><span>let min = \\&lt; data     // 1.0 (min reduction)</span></span>
<span class="line"><span>let all = \\&amp; mask     // Logical AND reduction</span></span>
<span class="line"><span>let any = \\| mask     // Logical OR reduction</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With axis for multi-dimensional</span></span>
<span class="line"><span>let matrix = [[1, 2], [3, 4]]</span></span>
<span class="line"><span>let row_sums = \\+ matrix, axis: 1   // [3, 7]</span></span>
<span class="line"><span>let col_sums = \\+ matrix, axis: 0   // [4, 6]</span></span></code></pre></div><h2 id="linear-algebra-operators" tabindex="-1">Linear Algebra Operators <a class="header-anchor" href="#linear-algebra-operators" aria-label="Permalink to &quot;Linear Algebra Operators&quot;">​</a></h2><p>Matrix operations with dedicated operators:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let a = [[1, 2], [3, 4]]</span></span>
<span class="line"><span>let b = [[5, 6], [7, 8]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Matrix multiply</span></span>
<span class="line"><span>let c = a &lt;*&gt; b       // [[19, 22], [43, 50]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Transpose</span></span>
<span class="line"><span>let t = a&#39;            // [[1, 3], [2, 4]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Dot product</span></span>
<span class="line"><span>let v1 = [1.0, 2.0, 3.0]</span></span>
<span class="line"><span>let v2 = [4.0, 5.0, 6.0]</span></span>
<span class="line"><span>let dot = v1 · v2     // 32.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Cross product (3D vectors)</span></span>
<span class="line"><span>let cross = v1 × v2   // [-3.0, 6.0, -3.0]</span></span></code></pre></div><h2 id="bitwise-operators" tabindex="-1">Bitwise Operators <a class="header-anchor" href="#bitwise-operators" aria-label="Permalink to &quot;Bitwise Operators&quot;">​</a></h2><p>Full bitwise support on integer arrays:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let a: [u8] = [0xFF, 0x0F, 0xF0, 0xAA]</span></span>
<span class="line"><span>let b: [u8] = [0x0F, 0xFF, 0x0F, 0x55]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let and = a &amp; b       // [0x0F, 0x0F, 0x00, 0x00]</span></span>
<span class="line"><span>let or = a | b        // [0xFF, 0xFF, 0xFF, 0xFF]</span></span>
<span class="line"><span>let xor = a ^ b       // [0xF0, 0xF0, 0xFF, 0xFF]</span></span>
<span class="line"><span>let not = ~a          // [0x00, 0xF0, 0x0F, 0x55]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Shifts</span></span>
<span class="line"><span>let shl = a &lt;&lt; 2      // Shift left</span></span>
<span class="line"><span>let shr = a &gt;&gt; 2      // Shift right</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Rotations (for crypto)</span></span>
<span class="line"><span>let rotl = a &lt;&lt;&lt; 3    // Rotate left</span></span>
<span class="line"><span>let rotr = a &gt;&gt;&gt; 3    // Rotate right</span></span></code></pre></div><h2 id="saturating-arithmetic" tabindex="-1">Saturating Arithmetic <a class="header-anchor" href="#saturating-arithmetic" aria-label="Permalink to &quot;Saturating Arithmetic&quot;">​</a></h2><p>For overflow-safe operations (audio, image processing):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let pixels: [u8] = [200, 250, 100, 50]</span></span>
<span class="line"><span>let adjust: u8 = 60</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Saturating operators (clamp instead of wrap)</span></span>
<span class="line"><span>let brighter = pixels +| adjust   // [255, 255, 160, 110]</span></span>
<span class="line"><span>let darker = pixels -| adjust     // [140, 190, 40, 0]</span></span>
<span class="line"><span>let scaled = pixels *| 2          // [255, 255, 200, 100]</span></span></code></pre></div><h2 id="pipeline-operator" tabindex="-1">Pipeline Operator <a class="header-anchor" href="#pipeline-operator" aria-label="Permalink to &quot;Pipeline Operator&quot;">​</a></h2><p>Chain operations elegantly:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process_signal(data: [f32]): f32 {</span></span>
<span class="line"><span>    return data</span></span>
<span class="line"><span>        |&gt; fn(x) { x - \\+ x / x.len() as f32 } // Subtract mean</span></span>
<span class="line"><span>        |&gt; fn(x) { x ** 2 }                    // Square</span></span>
<span class="line"><span>        |&gt; \\+                                  // Sum</span></span>
<span class="line"><span>        |&gt; fn(x) { $sqrt(x) }                  // Root = std deviation</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Equivalent to:</span></span>
<span class="line"><span>fn process_signal_verbose(data: [f32]): f32 {</span></span>
<span class="line"><span>    let mean = \\+ data / data.len() as f32</span></span>
<span class="line"><span>    let centered = data - mean</span></span>
<span class="line"><span>    let squared = centered ** 2</span></span>
<span class="line"><span>    let sum = \\+ squared</span></span>
<span class="line"><span>    return $sqrt(sum)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="sir-graph-architecture" tabindex="-1">SIR Graph Architecture <a class="header-anchor" href="#sir-graph-architecture" aria-label="Permalink to &quot;SIR Graph Architecture&quot;">​</a></h2><p>SIR represents computation as a DAG (Directed Acyclic Graph):</p><table tabindex="0"><thead><tr><th>Node Type</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>Input</code></td><td>Array/tensor placeholders</td><td><code>let a = input([1024])</code></td></tr><tr><td><code>Map</code></td><td>Element-wise ops (Add, Mul, Sin...)</td><td><code>a + b</code>, <code>$sin(a)</code></td></tr><tr><td><code>MatMul</code></td><td>Matrix multiplication</td><td><code>a &lt;*&gt; b</code></td></tr><tr><td><code>Reduce</code></td><td>Reductions (Sum, Max, Mean)</td><td><code>\\+ data</code></td></tr><tr><td><code>Output</code></td><td>Graph outputs</td><td><code>return result</code></td></tr></tbody></table><h2 id="data-types-dtype" tabindex="-1">Data Types (DType) <a class="header-anchor" href="#data-types-dtype" aria-label="Permalink to &quot;Data Types (DType)&quot;">​</a></h2><p>SIR supports these data types:</p><table tabindex="0"><thead><tr><th>Category</th><th>Types</th><th>Notes</th></tr></thead><tbody><tr><td><strong>Signed Int</strong></td><td><code>i8</code>, <code>i16</code>, <code>i32</code>, <code>i64</code></td><td>Bitwise &amp; arithmetic</td></tr><tr><td><strong>Unsigned Int</strong></td><td><code>u8</code>, <code>u16</code>, <code>u32</code>, <code>u64</code></td><td>Also for bitwise</td></tr><tr><td><strong>Float</strong></td><td><code>f16</code>, <code>f32</code>, <code>f64</code></td><td>Math functions</td></tr><tr><td><strong>Bool</strong></td><td><code>bool</code></td><td>Comparison results</td></tr><tr><td><strong>Quantized</strong></td><td><code>int4</code>, <code>fp4</code>, <code>e4m3</code>, <code>e5m2</code></td><td>ML inference</td></tr></tbody></table><h2 id="jit-compilation" tabindex="-1">JIT Compilation <a class="header-anchor" href="#jit-compilation" aria-label="Permalink to &quot;JIT Compilation&quot;">​</a></h2><p>SIR uses Just-In-Time compilation:</p><ol><li><strong>Graph Construction</strong>: Code builds a SirGraph</li><li><strong>Optimization Passes</strong>: <ul><li><strong>Fusion</strong>: Merges adjacent element-wise ops</li><li><strong>Dead Code Elimination</strong>: Removes unused nodes</li><li><strong>Layout Optimization</strong>: Reorders for hardware</li></ul></li><li><strong>Kernel Generation</strong>: Backend-specific code</li><li><strong>Execution</strong>: Dispatch to hardware</li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// This simple code:</span></span>
<span class="line"><span>fn compute(a: [f32], b: [f32]): [f32] {</span></span>
<span class="line"><span>    let c = a + b</span></span>
<span class="line"><span>    let d = c * 2.0</span></span>
<span class="line"><span>    return d</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Becomes optimized fused kernel:</span></span>
<span class="line"><span>// Add + Mul fused into single pass</span></span></code></pre></div><h2 id="backend-selection" tabindex="-1">Backend Selection <a class="header-anchor" href="#backend-selection" aria-label="Permalink to &quot;Backend Selection&quot;">​</a></h2><p>Vex <strong>automatically</strong> selects the best backend (CPU SIMD, Metal, Vulkan, etc.) based on the operation size and available hardware.</p><p>You do <strong>not</strong> need to import or configure backends manually. The compiler and runtime handle this transparently.</p><h3 id="automatic-gpu-offloading" tabindex="-1">Automatic GPU Offloading <a class="header-anchor" href="#automatic-gpu-offloading" aria-label="Permalink to &quot;Automatic GPU Offloading&quot;">​</a></h3><p>The SIR compiler automatically dispatches to GPU when:</p><ul><li>Array operations exceed 4096 elements</li><li>Matrix multiplications with output &gt; 64x64</li><li>Large reduction operations</li></ul><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Small arrays → CPU SIMD (fast, no GPU overhead)</span></span>
<span class="line"><span>let small = [1.0, 2.0, 3.0, 4.0]</span></span>
<span class="line"><span>let result = small + 1.0  // Uses SIMD</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Large arrays → GPU automatically</span></span>
<span class="line"><span>let large: [f32; 10000] = [0.0; 10000]</span></span>
<span class="line"><span>let result = large * 2.0 + 1.0  // GPU if available</span></span></code></pre></div><h3 id="building-with-gpu-support" tabindex="-1">Building with GPU Support <a class="header-anchor" href="#building-with-gpu-support" aria-label="Permalink to &quot;Building with GPU Support&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># macOS with Metal GPU (recommended)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cargo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --features</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> metal-gpu</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Cross-platform with WebGPU</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cargo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --features</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> webgpu</span></span></code></pre></div><h3 id="runtime-control" tabindex="-1">Runtime Control <a class="header-anchor" href="#runtime-control" aria-label="Permalink to &quot;Runtime Control&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Disable GPU (force CPU SIMD)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">VEX_NO_GPU</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> program.vx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Verbose SIR output</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">VEX_VERBOSE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> program.vx</span></span></code></pre></div><h2 id="supported-gpu-backends" tabindex="-1">Supported GPU Backends <a class="header-anchor" href="#supported-gpu-backends" aria-label="Permalink to &quot;Supported GPU Backends&quot;">​</a></h2><p>Vex&#39;s SIR compiler automatically targets the appropriate API for your platform:</p><table tabindex="0"><thead><tr><th>Platform</th><th>Backend</th><th>Requirement</th></tr></thead><tbody><tr><td><strong>macOS</strong></td><td><code>Metal</code></td><td>macOS 10.13+ (Apple Silicon recommended)</td></tr><tr><td><strong>Linux</strong></td><td><code>Vulkan</code></td><td>Vulkan 1.2+ driver</td></tr><tr><td><strong>Windows</strong></td><td><code>Vulkan</code></td><td>Vulkan 1.2+ driver</td></tr><tr><td><strong>Web</strong></td><td><code>WebGPU</code></td><td>Modern browser (Chrome/Edge/Firefox)</td></tr><tr><td><strong>Fallback</strong></td><td><code>LLVM-SIMD</code></td><td>Any CPU (if GPU unavailable)</td></tr></tbody></table><p>For intrinsics supported on GPU, see the <a href="/docs/guide/simd#standard-intrinsics">Standard Intrinsics</a> table in the SIMD guide.</p><h2 id="vumm-integration" tabindex="-1">VUMM Integration <a class="header-anchor" href="#vumm-integration" aria-label="Permalink to &quot;VUMM Integration&quot;">​</a></h2><p>SIR integrates with VUMM (Vex Unified Memory Manager):</p><ul><li><strong>Zero-Copy</strong>: Uses unified memory on supported platforms (Apple Silicon, APUs)</li><li><strong>Pool Allocator</strong>: Reuses buffers to reduce allocation overhead</li><li><strong>Lifecycle Management</strong>: Reference counting for automatic cleanup</li></ul><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Memory is managed automatically</span></span>
<span class="line"><span>fn process_large_array(data: [f32]): [f32] {</span></span>
<span class="line"><span>    // VUMM handles buffer allocation</span></span>
<span class="line"><span>    let result = transform(data)</span></span>
<span class="line"><span>    // Buffer freed when no longer referenced</span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="optimization-passes" tabindex="-1">Optimization Passes <a class="header-anchor" href="#optimization-passes" aria-label="Permalink to &quot;Optimization Passes&quot;">​</a></h2><h3 id="kernel-fusion" tabindex="-1">Kernel Fusion <a class="header-anchor" href="#kernel-fusion" aria-label="Permalink to &quot;Kernel Fusion&quot;">​</a></h3><p>Adjacent operations are fused into single kernels:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Before fusion: 3 separate kernel launches</span></span>
<span class="line"><span>let b = a + 1.0</span></span>
<span class="line"><span>let c = b * 2.0</span></span>
<span class="line"><span>let d = $relu(c)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// After fusion: 1 kernel launch</span></span>
<span class="line"><span>// (a + 1.0) * 2.0 → relu in single pass</span></span></code></pre></div><h3 id="tiling-for-cache-efficiency" tabindex="-1">Tiling for Cache Efficiency <a class="header-anchor" href="#tiling-for-cache-efficiency" aria-label="Permalink to &quot;Tiling for Cache Efficiency&quot;">​</a></h3><p>Large operations are tiled automatically:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Matrix multiply auto-tiled for cache</span></span>
<span class="line"><span>fn large_matmul(</span></span>
<span class="line"><span>    a: [[f32; 1024]; 1024],</span></span>
<span class="line"><span>    b: [[f32; 1024]; 1024]</span></span>
<span class="line"><span>): [[f32; 1024]; 1024] {</span></span>
<span class="line"><span>    return a &lt;*&gt; b  // Tiling applied automatically</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="practical-examples" tabindex="-1">Practical Examples <a class="header-anchor" href="#practical-examples" aria-label="Permalink to &quot;Practical Examples&quot;">​</a></h2><h3 id="image-processing" tabindex="-1">Image Processing <a class="header-anchor" href="#image-processing" aria-label="Permalink to &quot;Image Processing&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Brighten image - saturating add prevents overflow</span></span>
<span class="line"><span>fn brighten(pixels: [u8], amount: u8): [u8] {</span></span>
<span class="line"><span>    return pixels +| amount</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Grayscale conversion with broadcasting</span></span>
<span class="line"><span>fn grayscale(r: [u8], g: [u8], b: [u8]): [u8] {</span></span>
<span class="line"><span>    return (r * 0.299 + g * 0.587 + b * 0.114) as [u8]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Contrast adjustment</span></span>
<span class="line"><span>fn contrast(pixels: [f32], factor: f32): [f32] {</span></span>
<span class="line"><span>    let mean = \\+ pixels / pixels.len() as f32</span></span>
<span class="line"><span>    return (pixels - mean) * factor + mean</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Blur (box filter)</span></span>
<span class="line"><span>fn blur_3x3(img: [[f32]]): [[f32]] {</span></span>
<span class="line"><span>    let kernel = [[1, 1, 1], [1, 1, 1], [1, 1, 1]] / 9.0</span></span>
<span class="line"><span>    return $conv(img, kernel)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="signal-processing" tabindex="-1">Signal Processing <a class="header-anchor" href="#signal-processing" aria-label="Permalink to &quot;Signal Processing&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// FFT-based operations would use SIR&#39;s optimized kernels</span></span>
<span class="line"><span>fn normalize(signal: [f32]): [f32] {</span></span>
<span class="line"><span>    let min = \\&lt; signal</span></span>
<span class="line"><span>    let max = \\&gt; signal</span></span>
<span class="line"><span>    return (signal - min) / (max - min)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn rms(signal: [f32]): f32 {</span></span>
<span class="line"><span>    return $sqrt(\\+ signal ** 2 / #signal)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn moving_average(data: [f32], window: i32): [f32] {</span></span>
<span class="line"><span>    return $conv(data, [1.0; window] / window as f32)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="machine-learning" tabindex="-1">Machine Learning <a class="header-anchor" href="#machine-learning" aria-label="Permalink to &quot;Machine Learning&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Neural network layer</span></span>
<span class="line"><span>fn linear(x: [[f32]], w: [[f32]], b: [f32]): [[f32]] {</span></span>
<span class="line"><span>    return x &lt;*&gt; w + b  // MatMul + broadcast bias</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn relu(x: [[f32]]): [[f32]] {</span></span>
<span class="line"><span>    return x &gt;? 0.0  // Element-wise max with 0</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn softmax(logits: [f32]): [f32] {</span></span>
<span class="line"><span>    let exp_x = $exp(logits - \\&gt; logits)  // Subtract max for stability</span></span>
<span class="line"><span>    return exp_x / \\+ exp_x</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn cross_entropy(pred: [f32], target: [f32]): f32 {</span></span>
<span class="line"><span>    return -\\+ target * $log(pred + 1e-7)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Full forward pass - fuses into optimized kernels</span></span>
<span class="line"><span>fn mlp_forward(x: [[f32]], w1: [[f32]], b1: [f32], </span></span>
<span class="line"><span>               w2: [[f32]], b2: [f32]): [[f32]] {</span></span>
<span class="line"><span>    return x </span></span>
<span class="line"><span>        |&gt; fn(h) { h &lt;*&gt; w1 + b1 }    // Linear 1</span></span>
<span class="line"><span>        |&gt; fn(h) { h &gt;? 0.0 }          // ReLU</span></span>
<span class="line"><span>        |&gt; fn(h) { h &lt;*&gt; w2 + b2 }    // Linear 2</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="physics-simulation" tabindex="-1">Physics Simulation <a class="header-anchor" href="#physics-simulation" aria-label="Permalink to &quot;Physics Simulation&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// N-body gravity calculation</span></span>
<span class="line"><span>fn gravity_accel(</span></span>
<span class="line"><span>    pos: [[f32; 3]],  // N x 3 positions</span></span>
<span class="line"><span>    masses: [f32]      // N masses</span></span>
<span class="line"><span>): [[f32; 3]] {</span></span>
<span class="line"><span>    // Broadcasting: each body vs all others</span></span>
<span class="line"><span>    let dx = pos[:, None, :] - pos[None, :, :]  // N x N x 3</span></span>
<span class="line"><span>    let dist_sq = \\+ dx ** 2, axis: 2           // N x N</span></span>
<span class="line"><span>    let inv_dist3 = 1.0 / (dist_sq * $sqrt(dist_sq) + 1e-9)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // a = G * m * dx / r^3</span></span>
<span class="line"><span>    return \\+ masses[None, :, None] * dx * inv_dist3[:, :, None], axis: 1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Velocity Verlet integration</span></span>
<span class="line"><span>fn integrate(pos: [[f32; 3]], vel: [[f32; 3]], </span></span>
<span class="line"><span>             accel: [[f32; 3]], dt: f32): ([[f32; 3]], [[f32; 3]]) {</span></span>
<span class="line"><span>    let new_pos = pos + vel * dt + 0.5 * accel * dt ** 2</span></span>
<span class="line"><span>    let new_accel = gravity_accel(new_pos, masses)</span></span>
<span class="line"><span>    let new_vel = vel + 0.5 * (accel + new_accel) * dt</span></span>
<span class="line"><span>    return (new_pos, new_vel)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="crypto-operations" tabindex="-1">Crypto Operations <a class="header-anchor" href="#crypto-operations" aria-label="Permalink to &quot;Crypto Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// AES SubBytes using Galois Field multiply</span></span>
<span class="line"><span>fn aes_sbox(state: [u8; 16]): [u8; 16] {</span></span>
<span class="line"><span>    let inv = $gf_inv(state)</span></span>
<span class="line"><span>    return inv ^ (inv &lt;&lt;&lt; 1) ^ (inv &lt;&lt;&lt; 2) ^ (inv &lt;&lt;&lt; 3) ^ (inv &lt;&lt;&lt; 4) ^ 0x63</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// SHA-256 compression round</span></span>
<span class="line"><span>fn sha256_round(a: u32, b: u32, c: u32, d: u32,</span></span>
<span class="line"><span>                e: u32, f: u32, g: u32, h: u32,</span></span>
<span class="line"><span>                k: u32, w: u32): (u32, u32, u32, u32, u32, u32, u32, u32) {</span></span>
<span class="line"><span>    let s1 = (e &gt;&gt;&gt; 6) ^ (e &gt;&gt;&gt; 11) ^ (e &gt;&gt;&gt; 25)</span></span>
<span class="line"><span>    let ch = (e &amp; f) ^ (~e &amp; g)</span></span>
<span class="line"><span>    let temp1 = h +| s1 +| ch +| k +| w</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    let s0 = (a &gt;&gt;&gt; 2) ^ (a &gt;&gt;&gt; 13) ^ (a &gt;&gt;&gt; 22)</span></span>
<span class="line"><span>    let maj = (a &amp; b) ^ (a &amp; c) ^ (b &amp; c)</span></span>
<span class="line"><span>    let temp2 = s0 +| maj</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return (temp1 +| temp2, a, b, c, d +| temp1, e, f, g)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use operators, not loops</strong> - SIR optimizes operators directly</li><li><strong>Prefer fixed-size arrays</strong> - Enables better optimization</li><li><strong>Use reduction operators</strong> - <code>\\+</code>, <code>\\&lt;</code>, <code>\\&gt;</code> for reductions</li><li><strong>Chain with pipeline</strong> - <code>|&gt;</code> for readable data flow</li><li><strong>Let fusion happen</strong> - Don&#39;t manually split operations</li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Excellent: Direct operators</span></span>
<span class="line"><span>fn dot_product(a: [f64], b: [f64]): f64 {</span></span>
<span class="line"><span>    return \\+ a * b</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn normalize(v: [f64]): [f64] {</span></span>
<span class="line"><span>    return v / $sqrt(\\+ v ** 2)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ Good: Pipeline for complex operations</span></span>
<span class="line"><span>fn standardize(data: [f64]): [f64] {</span></span>
<span class="line"><span>    let mean = \\+ data / data.len() as f64</span></span>
<span class="line"><span>    let std = $sqrt(\\+ (data - mean) ** 2 / data.len() as f64)</span></span>
<span class="line"><span>    return (data - mean) / std</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ Avoid: Manual loops when operators work</span></span>
<span class="line"><span>fn bad_dot_product(a: [f64], b: [f64]): f64 {</span></span>
<span class="line"><span>    let! sum = 0.0</span></span>
<span class="line"><span>    for i in 0..a.len() {</span></span>
<span class="line"><span>        sum = sum + a[i] * b[i]  // Unnecessary loop!</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return sum</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="compilation-flags" tabindex="-1">Compilation Flags <a class="header-anchor" href="#compilation-flags" aria-label="Permalink to &quot;Compilation Flags&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Auto-detect best backend</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compile</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file.vx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Specify optimization level</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compile</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -O</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file.vx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Target specific CPU for SIMD</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compile</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --target-cpu=x86-64-v3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file.vx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # AVX2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compile</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --target-cpu=native</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file.vx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     # Current CPU</span></span></code></pre></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/simd">SIMD</a> - CPU vectorization details</li><li><a href="/docs/guide/memory/vumm">Memory Management</a> - VUMM system</li><li><a href="/docs/guide/advanced/performance">Performance</a> - Optimization techniques</li></ul>`,83)])])}const g=s(t,[["render",i]]);export{u as __pageData,g as default};
