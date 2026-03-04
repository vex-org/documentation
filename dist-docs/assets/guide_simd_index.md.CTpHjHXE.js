import{_ as s,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"SIMD and Auto-Vectorization","description":"","frontmatter":{},"headers":[],"relativePath":"guide/simd/index.md","filePath":"guide/simd/index.md"}'),p={name:"guide/simd/index.md"};function i(l,a,d,o,r,c){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="simd-and-auto-vectorization" tabindex="-1">SIMD and Auto-Vectorization <a class="header-anchor" href="#simd-and-auto-vectorization" aria-label="Permalink to &quot;SIMD and Auto-Vectorization&quot;">​</a></h1><p>Vex automatically vectorizes array operations. There are <strong>NO custom SIMD types</strong> like <code>f32x4</code> - write clean, readable code and the compiler optimizes automatically.</p><blockquote><p><strong>Deep Dive:</strong> For implementation details, see:</p><ul><li><a href="./tensor-mask">Tensor and Mask Types</a> - Internal SIMD type system (static &amp; dynamic)</li><li><a href="./sir-pipeline">SIR Optimization Pipeline</a> - How the compiler optimizes</li></ul></blockquote><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>SIMD (Single Instruction, Multiple Data) processes multiple elements with single instructions:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Scalar:           SIMD (4-wide):</span></span>
<span class="line"><span>a + b = c         [a₀,a₁,a₂,a₃] + [b₀,b₁,b₂,b₃] = [c₀,c₁,c₂,c₃]</span></span>
<span class="line"><span>1 op              1 op (but 4 results!)</span></span></code></pre></div><p>Vex supports two modes:</p><ul><li><strong>Static Tensors</strong> (<code>Tensor&lt;T, N&gt;</code>) - Compile-time size, register-optimized</li><li><strong>Dynamic Tensors</strong> (<code>Tensor&lt;T&gt;</code>) - Runtime size, ideal for ML and variable data</li></ul><h2 id="automatic-vectorization" tabindex="-1">Automatic Vectorization <a class="header-anchor" href="#automatic-vectorization" aria-label="Permalink to &quot;Automatic Vectorization&quot;">​</a></h2><p>Write operations directly on arrays - the compiler handles the rest:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Element-wise operations (NO loops needed!)</span></span>
<span class="line"><span>fn vector_add(a: [f32], b: [f32]): [f32] {</span></span>
<span class="line"><span>    return a + b  // Automatically vectorized</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn scale_array(data: [f32; 1024], factor: f32): [f32; 1024] {</span></span>
<span class="line"><span>    return data * factor  // Scalar broadcasting</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn process(data: [f64]): f64 {</span></span>
<span class="line"><span>    return $sqrt(\\+ data ** 2)  // Sum of squares → sqrt</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="what-gets-vectorized" tabindex="-1">What Gets Vectorized <a class="header-anchor" href="#what-gets-vectorized" aria-label="Permalink to &quot;What Gets Vectorized&quot;">​</a></h3><p>The compiler automatically vectorizes:</p><ul><li><strong>Element-wise ops</strong>: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>, <code>**</code></li><li><strong>Comparisons</strong>: <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> (return masks)</li><li><strong>Math functions</strong>: <code>$sqrt</code>, <code>$abs</code>, <code>$sin</code>, <code>$cos</code>, <code>$exp</code>, <code>$log</code></li><li><strong>Reductions</strong>: <code>\\+</code> (sum), <code>\\*</code> (product), <code>\\&lt;</code> (min), <code>\\&gt;</code> (max)</li><li><strong>Fused ops</strong>: multiply-add via FMA</li></ul><h2 id="simd-operators" tabindex="-1">SIMD Operators <a class="header-anchor" href="#simd-operators" aria-label="Permalink to &quot;SIMD Operators&quot;">​</a></h2><p>Vex provides special operators optimized for SIMD:</p><h3 id="reduction-operators" tabindex="-1">Reduction Operators <a class="header-anchor" href="#reduction-operators" aria-label="Permalink to &quot;Reduction Operators&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let arr = [1, 2, 3, 4, 5]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Reduction operators (prefix syntax)</span></span>
<span class="line"><span>let sum = \\+ arr         // 15 (sum)</span></span>
<span class="line"><span>let prod = \\* arr        // 120 (product)</span></span>
<span class="line"><span>let min_val = \\&lt; arr     // 1 (min)</span></span>
<span class="line"><span>let max_val = \\&gt; arr     // 5 (max)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Boolean reductions</span></span>
<span class="line"><span>let all_positive = \\&amp; (arr &gt; 0)   // true (AND)</span></span>
<span class="line"><span>let any_even = \\| (arr % 2 == 0)  // true (OR)</span></span></code></pre></div><h3 id="element-wise-min-max" tabindex="-1">Element-wise Min/Max <a class="header-anchor" href="#element-wise-min-max" aria-label="Permalink to &quot;Element-wise Min/Max&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let a = [1, 5, 3, 8]</span></span>
<span class="line"><span>let b = [2, 3, 6, 4]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let mins = a &lt;? b        // [1, 3, 3, 4] (element-wise min)</span></span>
<span class="line"><span>let maxs = a &gt;? b        // [2, 5, 6, 8] (element-wise max)</span></span>
<span class="line"><span>let clamped = a &gt;&lt; (2, 6)  // [2, 5, 3, 6] (clamp to range)</span></span></code></pre></div><h3 id="fused-multiply-add" tabindex="-1">Fused Multiply-Add <a class="header-anchor" href="#fused-multiply-add" aria-label="Permalink to &quot;Fused Multiply-Add&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let a = [1.0, 2.0, 3.0, 4.0]</span></span>
<span class="line"><span>let b = [2.0, 2.0, 2.0, 2.0]</span></span>
<span class="line"><span>let c = [1.0, 1.0, 1.0, 1.0]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// FMA: a * b + c in single operation (more accurate!)</span></span>
<span class="line"><span>let result = a * b + c   // Compiler auto-fuses to FMA</span></span></code></pre></div><h3 id="saturating-arithmetic" tabindex="-1">Saturating Arithmetic <a class="header-anchor" href="#saturating-arithmetic" aria-label="Permalink to &quot;Saturating Arithmetic&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let pixels: [u8; 4] = [250, 200, 100, 50]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Saturating add (clamps at max value, no overflow!)</span></span>
<span class="line"><span>let brighter = pixels +| 60   // [255, 255, 160, 110]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Saturating subtract (clamps at 0)</span></span>
<span class="line"><span>let darker = pixels -| 100    // [150, 100, 0, 0]</span></span></code></pre></div><h3 id="rotate-operations" tabindex="-1">Rotate Operations <a class="header-anchor" href="#rotate-operations" aria-label="Permalink to &quot;Rotate Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x: [u32] = [0x80000001, 0x00000001]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Rotate left</span></span>
<span class="line"><span>let rotl = x &lt;&lt;&lt; 1    // [0x00000003, 0x00000002]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Rotate right</span></span>
<span class="line"><span>let rotr = x &gt;&gt;&gt; 1    // [0xC0000000, 0x80000000]</span></span></code></pre></div><h2 id="working-with-arrays" tabindex="-1">Working with Arrays <a class="header-anchor" href="#working-with-arrays" aria-label="Permalink to &quot;Working with Arrays&quot;">​</a></h2><h3 id="fixed-size-arrays" tabindex="-1">Fixed-Size Arrays <a class="header-anchor" href="#fixed-size-arrays" aria-label="Permalink to &quot;Fixed-Size Arrays&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Compiler knows size → optimal vectorization</span></span>
<span class="line"><span>fn dot_product(a: [f64; 256], b: [f64; 256]): f64 {</span></span>
<span class="line"><span>    return \\+ a * b   // Sum of element-wise products</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn distance(a: [f32; 3], b: [f32; 3]): f32 {</span></span>
<span class="line"><span>    return $sqrt(\\+ (a - b) ** 2)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="dynamic-arrays" tabindex="-1">Dynamic Arrays <a class="header-anchor" href="#dynamic-arrays" aria-label="Permalink to &quot;Dynamic Arrays&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Dynamic arrays also auto-vectorized</span></span>
<span class="line"><span>fn normalize(v: [f32]): [f32] {</span></span>
<span class="line"><span>    let mag = $sqrt(\\+ v ** 2)</span></span>
<span class="line"><span>    return v / mag</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn cosine_similarity(a: [f32], b: [f32]): f32 {</span></span>
<span class="line"><span>    let dot = \\+ a * b</span></span>
<span class="line"><span>    let norm_a = $sqrt(\\+ a ** 2)</span></span>
<span class="line"><span>    let norm_b = $sqrt(\\+ b ** 2)</span></span>
<span class="line"><span>    return dot / (norm_a * norm_b)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="practical-examples" tabindex="-1">Practical Examples <a class="header-anchor" href="#practical-examples" aria-label="Permalink to &quot;Practical Examples&quot;">​</a></h2><h3 id="vector-operations" tabindex="-1">Vector Operations <a class="header-anchor" href="#vector-operations" aria-label="Permalink to &quot;Vector Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn add_vectors(a: [f32], b: [f32]): [f32] {</span></span>
<span class="line"><span>    return a + b</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn lerp(a: [f32], b: [f32], t: f32): [f32] {</span></span>
<span class="line"><span>    return a * (1.0 - t) + b * t</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn cross_product(a: [f32; 3], b: [f32; 3]): [f32; 3] {</span></span>
<span class="line"><span>    return a × b  // Cross product operator</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="finding-extremes" tabindex="-1">Finding Extremes <a class="header-anchor" href="#finding-extremes" aria-label="Permalink to &quot;Finding Extremes&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn find_max(data: [f32]): f32 {</span></span>
<span class="line"><span>    return \\&gt; data</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn find_min_max(data: [f32]): (f32, f32) {</span></span>
<span class="line"><span>    return (\\&lt; data, \\&gt; data)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn argmax(data: [f32]): i32 {</span></span>
<span class="line"><span>    // ArgMax reduction</span></span>
<span class="line"><span>    return $argmax(data)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="matrix-operations" tabindex="-1">Matrix Operations <a class="header-anchor" href="#matrix-operations" aria-label="Permalink to &quot;Matrix Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Matrix multiply with operator</span></span>
<span class="line"><span>fn matmul(a: [[f64; 4]; 4], b: [[f64; 4]; 4]): [[f64; 4]; 4] {</span></span>
<span class="line"><span>    return a &lt;*&gt; b</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Transpose</span></span>
<span class="line"><span>fn transpose(m: [[f64; 4]; 4]): [[f64; 4]; 4] {</span></span>
<span class="line"><span>    return m&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Matrix-vector multiply</span></span>
<span class="line"><span>fn transform(m: [[f32; 4]; 4], v: [f32; 4]): [f32; 4] {</span></span>
<span class="line"><span>    return m &lt;*&gt; v</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="image-processing" tabindex="-1">Image Processing <a class="header-anchor" href="#image-processing" aria-label="Permalink to &quot;Image Processing&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn brighten(pixels: [u8], amount: u8): [u8] {</span></span>
<span class="line"><span>    return pixels +| amount  // Saturating add</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn invert(pixels: [u8]): [u8] {</span></span>
<span class="line"><span>    return 255 - pixels</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn blend(a: [u8], b: [u8], alpha: f32): [u8] {</span></span>
<span class="line"><span>    return (a as [f32] * (1.0 - alpha) + b as [f32] * alpha) as [u8]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn grayscale(r: [u8], g: [u8], b: [u8]): [u8] {</span></span>
<span class="line"><span>    return (r * 0.299 + g * 0.587 + b * 0.114) as [u8]</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="signal-processing" tabindex="-1">Signal Processing <a class="header-anchor" href="#signal-processing" aria-label="Permalink to &quot;Signal Processing&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn normalize_signal(signal: [f32]): [f32] {</span></span>
<span class="line"><span>    let min = \\&lt; signal</span></span>
<span class="line"><span>    let max = \\&gt; signal</span></span>
<span class="line"><span>    return (signal - min) / (max - min)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn energy(signal: [f32]): f32 {</span></span>
<span class="line"><span>    return \\+ signal ** 2</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn rms(signal: [f32]): f32 {</span></span>
<span class="line"><span>    return $sqrt(\\+ signal ** 2 / #signal)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="compilation-flags" tabindex="-1">Compilation Flags <a class="header-anchor" href="#compilation-flags" aria-label="Permalink to &quot;Compilation Flags&quot;">​</a></h2><p>Enable SIMD optimizations:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Auto-detect best SIMD for current CPU</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compile</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --simd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file.vx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Specify optimization level</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compile</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -O</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file.vx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Target specific architecture (for distribution)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compile</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --target-cpu=x86-64-v3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file.vx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # AVX2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compile</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --target-cpu=x86-64-v4</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file.vx</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # AVX-512</span></span></code></pre></div><h2 id="supported-cpu-architectures" tabindex="-1">Supported CPU Architectures <a class="header-anchor" href="#supported-cpu-architectures" aria-label="Permalink to &quot;Supported CPU Architectures&quot;">​</a></h2><p>Vex&#39;s SIMD backend (LLVM-based) supports modern vector extensions out of the box:</p><table tabindex="0"><thead><tr><th>Architecture</th><th>Extensions</th><th>Note</th></tr></thead><tbody><tr><td><strong>Apple Silicon</strong></td><td><code>NEON</code></td><td>M1, M2, M3 families (ARM64)</td></tr><tr><td><strong>ARM64</strong></td><td><code>NEON</code>, <code>SVE</code></td><td>Modern servers, mobile</td></tr><tr><td><strong>x86-64 v4</strong></td><td><code>AVX-512</code></td><td>High-performance server/workstation</td></tr><tr><td><strong>x86-64 v3</strong></td><td><code>AVX2</code>, <code>FMA</code></td><td>Most modern desktops (Zen, Haswell+)</td></tr><tr><td><strong>x86-64 v2</strong></td><td><code>SSE4.2</code></td><td>Legacy fallback</td></tr><tr><td><strong>WebAssembly</strong></td><td><code>SIMD128</code></td><td>Web browsers</td></tr></tbody></table><h2 id="standard-intrinsics" tabindex="-1">Standard Intrinsics <a class="header-anchor" href="#standard-intrinsics" aria-label="Permalink to &quot;Standard Intrinsics&quot;">​</a></h2><p>These intrinsics are hardware-accelerated on both CPU (SIMD) and GPU:</p><h3 id="math-analysis" tabindex="-1">Math &amp; Analysis <a class="header-anchor" href="#math-analysis" aria-label="Permalink to &quot;Math &amp; Analysis&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Intrinsic</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>$sqrt(x)</code></td><td>Square root</td><td><code>$sqrt([4, 9])</code> → <code>[2, 3]</code></td></tr><tr><td><code>$abs(x)</code></td><td>Absolute value</td><td><code>$abs([-5, 5])</code> → <code>[5, 5]</code></td></tr><tr><td><code>$sin(x)</code>, <code>$cos(x)</code></td><td>Trigonometry</td><td><code>$sin(angle)</code></td></tr><tr><td><code>$exp(x)</code>, <code>$log(x)</code></td><td>Exp/Log</td><td><code>$log(val)</code></td></tr><tr><td><code>$pow(b, e)</code></td><td>Power</td><td><code>$pow(2, 3)</code> → <code>8</code></td></tr><tr><td><code>$round(x)</code></td><td>Rounding</td><td><code>$round(1.6)</code> → <code>2.0</code></td></tr><tr><td><code>$floor(x)</code>, <code>$ceil(x)</code></td><td>Floor/Ceil</td><td><code>$floor(1.6)</code> → <code>1.0</code></td></tr></tbody></table><h3 id="array-matrix" tabindex="-1">Array &amp; Matrix <a class="header-anchor" href="#array-matrix" aria-label="Permalink to &quot;Array &amp; Matrix&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Intrinsic</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>$sum(x)</code></td><td>Sum elements</td><td><code>$sum([1,2,3])</code> → <code>6</code></td></tr><tr><td><code>$prod(x)</code></td><td>Product</td><td><code>$prod([2,3])</code> → <code>6</code></td></tr><tr><td><code>$min(x)</code>, <code>$max(x)</code></td><td>Min/Max val</td><td><code>$max([1,5])</code> → <code>5</code></td></tr><tr><td><code>$argmax(x)</code></td><td>Index of max</td><td><code>$argmax([1,5,2])</code> → <code>1</code></td></tr><tr><td><code>$zeros(shape)</code></td><td>Zero tensor</td><td><code>$zeros([2,2])</code></td></tr><tr><td><code>$ones(shape)</code></td><td>Inputs 1s</td><td><code>$ones([4])</code></td></tr><tr><td><code>$eye(n)</code></td><td>Identity matrix</td><td><code>$eye(3)</code></td></tr><tr><td><code>$conv(d, k)</code></td><td>Convolution</td><td><code>$conv(img, kernel)</code></td></tr><tr><td><code>$fft(x)</code></td><td>Fast Fourier</td><td><code>$fft(audio)</code></td></tr></tbody></table><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use operators directly</strong> - No loops needed for element-wise ops</li><li><strong>Use reduction operators</strong> - <code>\\+</code>, <code>\\&lt;</code>, <code>\\&gt;</code> are SIMD-optimized</li><li><strong>Prefer fixed-size arrays</strong> - Known sizes enable better optimization</li><li><strong>Let fusion happen</strong> - Don&#39;t split operations unnecessarily</li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Excellent: Direct operators</span></span>
<span class="line"><span>fn sum(data: [f64]): f64 {</span></span>
<span class="line"><span>    return \\+ data</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn dot_product(a: [f64], b: [f64]): f64 {</span></span>
<span class="line"><span>    return \\+ a * b</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn normalize(v: [f64]): [f64] {</span></span>
<span class="line"><span>    return v / $sqrt(\\+ v ** 2)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ Avoid: Manual loops when operators work</span></span>
<span class="line"><span>fn sum_bad(data: [f64]): f64 {</span></span>
<span class="line"><span>    let! total = 0.0</span></span>
<span class="line"><span>    for x in data {</span></span>
<span class="line"><span>        total = total + x  // Unnecessary!</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return total</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="simd-operator-reference" tabindex="-1">SIMD Operator Reference <a class="header-anchor" href="#simd-operator-reference" aria-label="Permalink to &quot;SIMD Operator Reference&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Operator</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>\\+</code></td><td>Sum reduction</td><td><code>\\+ [1,2,3]</code> → <code>6</code></td></tr><tr><td><code>\\*</code></td><td>Product reduction</td><td><code>\\* [1,2,3]</code> → <code>6</code></td></tr><tr><td><code>\\&lt;</code></td><td>Min reduction</td><td><code>\\&lt; [3,1,2]</code> → <code>1</code></td></tr><tr><td><code>\\&gt;</code></td><td>Max reduction</td><td><code>\\&gt; [3,1,2]</code> → <code>3</code></td></tr><tr><td><code>\\&amp;</code></td><td>AND reduction</td><td><code>\\&amp; [t,t,f]</code> → <code>false</code></td></tr><tr><td><code>|</code></td><td>OR reduction</td><td><code>| [t,f,f]</code> → <code>true</code></td></tr><tr><td><code>&lt;?</code></td><td>Element-wise min</td><td><code>[1,5] &lt;? [3,2]</code> → <code>[1,2]</code></td></tr><tr><td><code>&gt;?</code></td><td>Element-wise max</td><td><code>[1,5] &gt;? [3,2]</code> → <code>[3,5]</code></td></tr><tr><td><code>&gt;&lt;</code></td><td>Clamp</td><td><code>[1,5] &gt;&lt; (2,4)</code> → <code>[2,4]</code></td></tr><tr><td><code>+|</code></td><td>Saturating add</td><td><code>250u8 +| 10u8</code> → <code>255</code></td></tr><tr><td><code>-|</code></td><td>Saturating sub</td><td><code>5u8 -| 10u8</code> → <code>0</code></td></tr><tr><td><code>&lt;&lt;&lt;</code></td><td>Rotate left</td><td><code>x &lt;&lt;&lt; 1</code></td></tr><tr><td><code>&gt;&gt;&gt;</code></td><td>Rotate right</td><td><code>x &gt;&gt;&gt; 1</code></td></tr><tr><td><code>&lt;*&gt;</code></td><td>Matrix multiply</td><td><code>a &lt;*&gt; b</code></td></tr><tr><td><code>&#39;</code></td><td>Transpose</td><td><code>matrix&#39;</code></td></tr></tbody></table><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/gpu">GPU Programming</a> - Massively parallel compute</li><li><a href="/docs/guide/ffi">FFI</a> - Integrating with native libraries</li><li><a href="/docs/guide/memory/ownership">Memory Management</a> - Efficient data handling</li></ul>`,61)])])}const g=s(p,[["render",i]]);export{u as __pageData,g as default};
