import{_ as s,o as n,c as t,ag as e}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Automatic Optimization (Smart Compiler)","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/optimizations.md","filePath":"archive/reference/optimizations.md"}'),i={name:"archive/reference/optimizations.md"};function p(l,a,o,d,r,c){return n(),t("div",null,[...a[0]||(a[0]=[e(`<h1 id="automatic-optimization-smart-compiler" tabindex="-1">Automatic Optimization (Smart Compiler) <a class="header-anchor" href="#automatic-optimization-smart-compiler" aria-label="Permalink to &quot;Automatic Optimization (Smart Compiler)&quot;">​</a></h1><p><strong>Version:</strong> 0.2.0<br><strong>Last Updated:</strong> December 2025</p><p>This document defines Vex&#39;s core philosophy of <strong>automatic hardware optimization</strong>. Unlike traditional systems languages that require manual annotations for SIMD, GPU, or parallel execution, Vex&#39;s compiler automatically determines the optimal execution strategy.</p><hr><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ol><li><a href="#philosophy">Philosophy</a></li><li><a href="#how-it-works">How It Works</a></li><li><a href="#purity-analysis">Purity Analysis</a></li><li><a href="#cost-model">Cost Model</a></li><li><a href="#execution-strategies">Execution Strategies</a></li><li><a href="#start-time-constants">Start-Time Constants</a></li><li><a href="#runtime-dispatch">Runtime Dispatch</a></li><li><a href="#compiler-hints-optional">Compiler Hints (Optional)</a></li><li><a href="#examples">Examples</a></li><li><a href="#deprecated-keywords">Deprecated Keywords</a></li></ol><hr><h2 id="philosophy" tabindex="-1">Philosophy <a class="header-anchor" href="#philosophy" aria-label="Permalink to &quot;Philosophy&quot;">​</a></h2><h3 id="the-problem-with-manual-optimization" tabindex="-1">The Problem with Manual Optimization <a class="header-anchor" href="#the-problem-with-manual-optimization" aria-label="Permalink to &quot;The Problem with Manual Optimization&quot;">​</a></h3><p>Traditional languages require developers to be hardware experts:</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// C - Manual SIMD (requires AVX knowledge)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">__m256 a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> _mm256_load_ps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arr);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">__m256 b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> _mm256_load_ps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arr2);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">__m256 c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> _mm256_add_ps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a, b);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// CUDA - Manual GPU (requires CUDA knowledge)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">__global__ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> kernel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">float*</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) { ... }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// OpenMP - Manual threading</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#pragma</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> omp</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> parallel</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> for</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> simd</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> n; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) { ... }</span></span></code></pre></div><p><strong>Problems</strong>:</p><ul><li>Developer must understand hardware details</li><li>Code is not portable across architectures</li><li>Optimization is error-prone</li><li>Maintenance burden increases</li></ul><h3 id="the-vex-approach" tabindex="-1">The Vex Approach <a class="header-anchor" href="#the-vex-approach" aria-label="Permalink to &quot;The Vex Approach&quot;">​</a></h3><p><strong>&quot;Describe WHAT you want, not HOW to compute it.&quot;</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Developer writes intent</span></span>
<span class="line"><span>fn process(data: [f32]): [f32] {</span></span>
<span class="line"><span>    return data.map(|x| x * 2.0 + 1.0);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Compiler decides</strong>:</p><ul><li>Scalar loop for tiny data</li><li>SIMD for medium data</li><li>Multi-threaded SIMD for large data</li><li>GPU offload for massive data (if available)</li></ul><hr><h2 id="how-it-works" tabindex="-1">How It Works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How It Works&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                    VEX SOURCE CODE</span></span>
<span class="line"><span>                          │</span></span>
<span class="line"><span>                          ▼</span></span>
<span class="line"><span>              ┌───────────────────────┐</span></span>
<span class="line"><span>              │   SEMANTIC ANALYSIS   │</span></span>
<span class="line"><span>              │   ─────────────────   │</span></span>
<span class="line"><span>              │   • Pure function?    │</span></span>
<span class="line"><span>              │   • Side effects?     │</span></span>
<span class="line"><span>              │   • Data dependency?  │</span></span>
<span class="line"><span>              └───────────┬───────────┘</span></span>
<span class="line"><span>                          │</span></span>
<span class="line"><span>                          ▼</span></span>
<span class="line"><span>              ┌───────────────────────┐</span></span>
<span class="line"><span>              │   COST MODEL ANALYSIS │</span></span>
<span class="line"><span>              │   ─────────────────── │</span></span>
<span class="line"><span>              │   • Data size         │</span></span>
<span class="line"><span>              │   • Memory pattern    │</span></span>
<span class="line"><span>              │   • Arithmetic ops    │</span></span>
<span class="line"><span>              │   • Target hardware   │</span></span>
<span class="line"><span>              └───────────┬───────────┘</span></span>
<span class="line"><span>                          │</span></span>
<span class="line"><span>                          ▼</span></span>
<span class="line"><span>              ┌───────────────────────┐</span></span>
<span class="line"><span>              │   STRATEGY SELECTION  │</span></span>
<span class="line"><span>              │   ──────────────────  │</span></span>
<span class="line"><span>              │   Scalar│SIMD│Thread│GPU│</span></span>
<span class="line"><span>              └───────────┬───────────┘</span></span>
<span class="line"><span>                          │</span></span>
<span class="line"><span>                          ▼</span></span>
<span class="line"><span>              ┌───────────────────────┐</span></span>
<span class="line"><span>              │   CODE GENERATION     │</span></span>
<span class="line"><span>              │   ──────────────────  │</span></span>
<span class="line"><span>              │   + Runtime dispatch  │</span></span>
<span class="line"><span>              │     (if size unknown) │</span></span>
<span class="line"><span>              └───────────────────────┘</span></span></code></pre></div><hr><h2 id="purity-analysis" tabindex="-1">Purity Analysis <a class="header-anchor" href="#purity-analysis" aria-label="Permalink to &quot;Purity Analysis&quot;">​</a></h2><p>The compiler analyzes functions to determine if they can be safely parallelized:</p><h3 id="pure-functions-parallelizable" tabindex="-1">Pure Functions (Parallelizable) <a class="header-anchor" href="#pure-functions-parallelizable" aria-label="Permalink to &quot;Pure Functions (Parallelizable)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Pure: No side effects, deterministic</span></span>
<span class="line"><span>fn square(x: f32): f32 {</span></span>
<span class="line"><span>    return x * x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ Pure: Operates only on inputs</span></span>
<span class="line"><span>fn add_vectors(a: [f32], b: [f32]): [f32] {</span></span>
<span class="line"><span>    return a.zip(b).map(|(x, y)| x + y);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="impure-functions-sequential" tabindex="-1">Impure Functions (Sequential) <a class="header-anchor" href="#impure-functions-sequential" aria-label="Permalink to &quot;Impure Functions (Sequential)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ Impure: Mutates external state</span></span>
<span class="line"><span>let! counter = 0;</span></span>
<span class="line"><span>fn increment(): i32 {</span></span>
<span class="line"><span>    counter++;  // Side effect</span></span>
<span class="line"><span>    return counter;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ Impure: I/O operation</span></span>
<span class="line"><span>fn log_value(x: i32) {</span></span>
<span class="line"><span>    (x);  // Side effect</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="analysis-rules" tabindex="-1">Analysis Rules <a class="header-anchor" href="#analysis-rules" aria-label="Permalink to &quot;Analysis Rules&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Pattern</th><th>Classification</th><th>Parallelizable</th></tr></thead><tbody><tr><td>No mutation of captured variables</td><td>Pure</td><td>✅</td></tr><tr><td>No I/O operations</td><td>Pure</td><td>✅</td></tr><tr><td>No global state access</td><td>Pure</td><td>✅</td></tr><tr><td>Deterministic output</td><td>Pure</td><td>✅</td></tr><tr><td>Mutates <code>self</code> only</td><td>Pure-ish</td><td>⚠️ (with care)</td></tr><tr><td>Any side effect</td><td>Impure</td><td>❌</td></tr></tbody></table><hr><h2 id="cost-model" tabindex="-1">Cost Model <a class="header-anchor" href="#cost-model" aria-label="Permalink to &quot;Cost Model&quot;">​</a></h2><p>The compiler uses a cost model to select the optimal strategy:</p><h3 id="thresholds-configurable" tabindex="-1">Thresholds (Configurable) <a class="header-anchor" href="#thresholds-configurable" aria-label="Permalink to &quot;Thresholds (Configurable)&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Threshold</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>SCALAR_MAX</code></td><td>64 elements</td><td>Use scalar below this</td></tr><tr><td><code>SIMD_MAX</code></td><td>64KB</td><td>Use SIMD only below this</td></tr><tr><td><code>THREAD_MIN</code></td><td>64KB</td><td>Multi-thread above this</td></tr><tr><td><code>GPU_MIN</code></td><td>1MB</td><td>Consider GPU above this</td></tr></tbody></table><h3 id="decision-factors" tabindex="-1">Decision Factors <a class="header-anchor" href="#decision-factors" aria-label="Permalink to &quot;Decision Factors&quot;">​</a></h3><ol><li><strong>Data Size</strong>: Static or dynamic</li><li><strong>Operation Complexity</strong>: Simple (add) vs complex (sqrt)</li><li><strong>Memory Access Pattern</strong>: Sequential vs random</li><li><strong>Data Dependencies</strong>: Independent vs chain</li><li><strong>Hardware Availability</strong>: SIMD width, GPU presence</li></ol><h3 id="example-decision-tree" tabindex="-1">Example Decision Tree <a class="header-anchor" href="#example-decision-tree" aria-label="Permalink to &quot;Example Decision Tree&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Input: data.map(|x| x * 2.0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── data.() &lt; 64</span></span>
<span class="line"><span>│   └── Scalar loop</span></span>
<span class="line"><span>├── data.() &lt; 64KB</span></span>
<span class="line"><span>│   └── SIMD (AVX-512 if available, else AVX2, else SSE)</span></span>
<span class="line"><span>├── data.() &lt; 1MB</span></span>
<span class="line"><span>│   └── SIMD + Multi-threaded (work-stealing)</span></span>
<span class="line"><span>└── data.() &gt;= 1MB &amp;&amp; gpu_available</span></span>
<span class="line"><span>    └── GPU offload (async memory transfer)</span></span></code></pre></div><hr><h2 id="execution-strategies" tabindex="-1">Execution Strategies <a class="header-anchor" href="#execution-strategies" aria-label="Permalink to &quot;Execution Strategies&quot;">​</a></h2><h3 id="strategy-1-scalar" tabindex="-1">Strategy 1: Scalar <a class="header-anchor" href="#strategy-1-scalar" aria-label="Permalink to &quot;Strategy 1: Scalar&quot;">​</a></h3><p>For very small data or complex control flow:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Compiler generates simple loop</span></span>
<span class="line"><span>for i in 0..data.() {</span></span>
<span class="line"><span>    result[i] = data[i] * 2.0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="strategy-2-simd" tabindex="-1">Strategy 2: SIMD <a class="header-anchor" href="#strategy-2-simd" aria-label="Permalink to &quot;Strategy 2: SIMD&quot;">​</a></h3><p>For medium data with simple operations:</p><div class="language-llvm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">llvm</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>; Compiler generates vectorized code</span></span>
<span class="line"><span>%vec = load &lt;8 x float&gt;, ptr %data</span></span>
<span class="line"><span>%mul = fmul &lt;8 x float&gt; %vec, &lt;2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0&gt;</span></span>
<span class="line"><span>store &lt;8 x float&gt; %mul, ptr %result</span></span></code></pre></div><h3 id="strategy-3-multi-threaded" tabindex="-1">Strategy 3: Multi-threaded <a class="header-anchor" href="#strategy-3-multi-threaded" aria-label="Permalink to &quot;Strategy 3: Multi-threaded&quot;">​</a></h3><p>For large data:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Thread 0: process data[0..N/4]</span></span>
<span class="line"><span>Thread 1: process data[N/4..N/2]</span></span>
<span class="line"><span>Thread 2: process data[N/2..3N/4]</span></span>
<span class="line"><span>Thread 3: process data[3N/4..N]</span></span></code></pre></div><h3 id="strategy-4-gpu-offload" tabindex="-1">Strategy 4: GPU Offload <a class="header-anchor" href="#strategy-4-gpu-offload" aria-label="Permalink to &quot;Strategy 4: GPU Offload&quot;">​</a></h3><p>For massive data with available GPU:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. Async copy data to GPU</span></span>
<span class="line"><span>2. Launch kernel (threads = data.())</span></span>
<span class="line"><span>3. Async copy result back</span></span>
<span class="line"><span>4. Synchronize</span></span></code></pre></div><hr><h2 id="start-time-constants" tabindex="-1">Start-Time Constants <a class="header-anchor" href="#start-time-constants" aria-label="Permalink to &quot;Start-Time Constants&quot;">​</a></h2><p>Vex initializes <strong>system capability constants</strong> at program startup, before <code>main()</code> executes. These constants enable intelligent runtime dispatch decisions.</p><h3 id="the-sys-module" tabindex="-1">The <code>sys</code> Module <a class="header-anchor" href="#the-sys-module" aria-label="Permalink to &quot;The \`sys\` Module&quot;">​</a></h3><p>All start-time constants are available through the <code>sys</code> module:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import sys;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    (&quot;CPU Cores: {}&quot;, sys.CPU_CORES);</span></span>
<span class="line"><span>    (&quot;SIMD Width: {}&quot;, sys.SIMD_WIDTH);</span></span>
<span class="line"><span>    (&quot;GPU Available: {}&quot;, sys.GPU_AVAILABLE);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="cpu-information" tabindex="-1">CPU Information <a class="header-anchor" href="#cpu-information" aria-label="Permalink to &quot;CPU Information&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Constant</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>sys.CPU_CORES</code></td><td><code>u32</code></td><td>Number of physical CPU cores</td></tr><tr><td><code>sys.CPU_THREADS</code></td><td><code>u32</code></td><td>Number of logical threads (with hyperthreading)</td></tr><tr><td><code>sys.CPU_ARCH</code></td><td><code>string</code></td><td>Architecture name: <code>&quot;x86_64&quot;</code>, <code>&quot;aarch64&quot;</code>, etc.</td></tr><tr><td><code>sys.CPU_VENDOR</code></td><td><code>string</code></td><td>Vendor: <code>&quot;Intel&quot;</code>, <code>&quot;AMD&quot;</code>, <code>&quot;Apple&quot;</code>, etc.</td></tr><tr><td><code>sys.CPU_MODEL</code></td><td><code>string</code></td><td>Full model name</td></tr></tbody></table><h3 id="simd-capabilities" tabindex="-1">SIMD Capabilities <a class="header-anchor" href="#simd-capabilities" aria-label="Permalink to &quot;SIMD Capabilities&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Constant</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>sys.SIMD_WIDTH</code></td><td><code>u32</code></td><td>Maximum SIMD register width in bits (128, 256, 512)</td></tr><tr><td><code>sys.HAS_SSE</code></td><td><code>bool</code></td><td>SSE support (128-bit, x86)</td></tr><tr><td><code>sys.HAS_SSE2</code></td><td><code>bool</code></td><td>SSE2 support</td></tr><tr><td><code>sys.HAS_SSE4</code></td><td><code>bool</code></td><td>SSE4.1/4.2 support</td></tr><tr><td><code>sys.HAS_AVX</code></td><td><code>bool</code></td><td>AVX support (256-bit, x86)</td></tr><tr><td><code>sys.HAS_AVX2</code></td><td><code>bool</code></td><td>AVX2 support</td></tr><tr><td><code>sys.HAS_AVX512</code></td><td><code>bool</code></td><td>AVX-512 support (512-bit, x86)</td></tr><tr><td><code>sys.HAS_NEON</code></td><td><code>bool</code></td><td>ARM NEON support (128-bit, ARM)</td></tr><tr><td><code>sys.HAS_SVE</code></td><td><code>bool</code></td><td>ARM SVE support (scalable, ARM)</td></tr></tbody></table><h3 id="gpu-information" tabindex="-1">GPU Information <a class="header-anchor" href="#gpu-information" aria-label="Permalink to &quot;GPU Information&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Constant</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>sys.GPU_AVAILABLE</code></td><td><code>bool</code></td><td>Any compute GPU available</td></tr><tr><td><code>sys.GPU_COUNT</code></td><td><code>u32</code></td><td>Number of compute GPUs</td></tr><tr><td><code>sys.GPU_BACKEND</code></td><td><code>string</code></td><td>Backend: <code>&quot;cuda&quot;</code>, <code>&quot;metal&quot;</code>, <code>&quot;vulkan&quot;</code>, <code>&quot;none&quot;</code></td></tr><tr><td><code>sys.GPU_DEVICES</code></td><td><code>[GpuDevice]</code></td><td>List of GPU device info</td></tr></tbody></table><h3 id="gpudevice-structure" tabindex="-1">GpuDevice Structure <a class="header-anchor" href="#gpudevice-structure" aria-label="Permalink to &quot;GpuDevice Structure&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct GpuDevice {</span></span>
<span class="line"><span>    name: string,           // &quot;NVIDIA RTX 4090&quot;, &quot;Apple M3 Max&quot;</span></span>
<span class="line"><span>    vendor: string,         // &quot;NVIDIA&quot;, &quot;AMD&quot;, &quot;Apple&quot;, &quot;Intel&quot;</span></span>
<span class="line"><span>    memory_mb: u64,         // VRAM in megabytes</span></span>
<span class="line"><span>    compute_units: u32,     // Number of compute units/SMs</span></span>
<span class="line"><span>    max_threads: u32,       // Max threads per block</span></span>
<span class="line"><span>    supports_f16: bool,     // Half-precision support</span></span>
<span class="line"><span>    supports_f64: bool,     // Double-precision support</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="memory-information" tabindex="-1">Memory Information <a class="header-anchor" href="#memory-information" aria-label="Permalink to &quot;Memory Information&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Constant</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>sys.TOTAL_MEMORY_MB</code></td><td><code>u64</code></td><td>Total system RAM in MB</td></tr><tr><td><code>sys.AVAILABLE_MEMORY_MB</code></td><td><code>u64</code></td><td>Available RAM at startup</td></tr><tr><td><code>sys.PAGE_SIZE</code></td><td><code>u32</code></td><td>Memory page size in bytes</td></tr><tr><td><code>sys.CACHE_LINE_SIZE</code></td><td><code>u32</code></td><td>CPU cache line size (usually 64)</td></tr><tr><td><code>sys.L1_CACHE_KB</code></td><td><code>u32</code></td><td>L1 data cache size per core</td></tr><tr><td><code>sys.L2_CACHE_KB</code></td><td><code>u32</code></td><td>L2 cache size per core</td></tr><tr><td><code>sys.L3_CACHE_MB</code></td><td><code>u32</code></td><td>L3 cache size (shared)</td></tr></tbody></table><h3 id="platform-information" tabindex="-1">Platform Information <a class="header-anchor" href="#platform-information" aria-label="Permalink to &quot;Platform Information&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Constant</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>sys.OS</code></td><td><code>string</code></td><td>Operating system: <code>&quot;linux&quot;</code>, <code>&quot;macos&quot;</code>, <code>&quot;windows&quot;</code></td></tr><tr><td><code>sys.OS_VERSION</code></td><td><code>string</code></td><td>OS version string</td></tr><tr><td><code>sys.ENDIAN</code></td><td><code>string</code></td><td>Byte order: <code>&quot;little&quot;</code> or <code>&quot;big&quot;</code></td></tr><tr><td><code>sys.POINTER_SIZE</code></td><td><code>u32</code></td><td>Pointer size in bytes (4 or 8)</td></tr></tbody></table><h3 id="compile-time-vs-start-time" tabindex="-1">Compile-Time vs Start-Time <a class="header-anchor" href="#compile-time-vs-start-time" aria-label="Permalink to &quot;Compile-Time vs Start-Time&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Type</th><th>When Evaluated</th><th>Use Case</th></tr></thead><tbody><tr><td><strong>Compile-time</strong></td><td>During compilation</td><td>Type sizes, platform-specific code</td></tr><tr><td><strong>Start-time</strong></td><td>Program startup (once)</td><td>Hardware detection, optimization dispatch</td></tr><tr><td><strong>Run-time</strong></td><td>During execution</td><td>Dynamic values, user input</td></tr></tbody></table><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Compile-time constant (embedded in binary)</span></span>
<span class="line"><span>const MAX_BUFFER = 1024;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Start-time constant (detected at startup)</span></span>
<span class="line"><span>let optimal_threads = sys.CPU_CORES;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Runtime variable (changes during execution)</span></span>
<span class="line"><span>let! current_load = get_cpu_load();</span></span></code></pre></div><h3 id="how-runtime-uses-start-time-constants" tabindex="-1">How Runtime Uses Start-Time Constants <a class="header-anchor" href="#how-runtime-uses-start-time-constants" aria-label="Permalink to &quot;How Runtime Uses Start-Time Constants&quot;">​</a></h3><p>The automatic optimization dispatch uses these constants:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Internal dispatch logic (conceptual)</span></span>
<span class="line"><span>fn __dispatch_strategy(data_size: usize): Strategy {</span></span>
<span class="line"><span>    if data_size &lt; 64 {</span></span>
<span class="line"><span>        return Strategy.Scalar;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if data_size &lt; sys.L2_CACHE_KB * 1024 {</span></span>
<span class="line"><span>        // Fits in L2 cache - single-thread SIMD</span></span>
<span class="line"><span>        return Strategy.Simd(sys.SIMD_WIDTH);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if data_size &lt; sys.GPU_DEVICES[0].memory_mb * 1024 * 1024 &amp;&amp; sys.GPU_AVAILABLE {</span></span>
<span class="line"><span>        // Large but fits in GPU memory</span></span>
<span class="line"><span>        return Strategy.Gpu;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Multi-threaded with cache-aware chunking</span></span>
<span class="line"><span>    return Strategy.Threaded(sys.CPU_CORES);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="initialization-timing" tabindex="-1">Initialization Timing <a class="header-anchor" href="#initialization-timing" aria-label="Permalink to &quot;Initialization Timing&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌──────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                     PROGRAM STARTUP                          │</span></span>
<span class="line"><span>├──────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>│  1. Load executable                                          │</span></span>
<span class="line"><span>│  2. Initialize runtime                                       │</span></span>
<span class="line"><span>│  3. ★ DETECT SYSTEM CAPABILITIES ★                          │</span></span>
<span class="line"><span>│     ├── Query CPUID (x86) / system registers (ARM)          │</span></span>
<span class="line"><span>│     ├── Enumerate GPUs (Vulkan/Metal/CUDA)                   │</span></span>
<span class="line"><span>│     ├── Query memory info                                    │</span></span>
<span class="line"><span>│     └── Store in sys.* constants                             │</span></span>
<span class="line"><span>│  4. Initialize global constructors                           │</span></span>
<span class="line"><span>│  5. Call main()                                              │</span></span>
<span class="line"><span>│                                                              │</span></span>
<span class="line"><span>└──────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="example-adaptive-algorithm-selection" tabindex="-1">Example: Adaptive Algorithm Selection <a class="header-anchor" href="#example-adaptive-algorithm-selection" aria-label="Permalink to &quot;Example: Adaptive Algorithm Selection&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import sys;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn matrix_multiply(a: Matrix, b: Matrix): Matrix {</span></span>
<span class="line"><span>    let size = a.rows * a.cols * b.cols;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Algorithm selection based on hardware</span></span>
<span class="line"><span>    if sys.GPU_AVAILABLE &amp;&amp; size &gt; 1_000_000 {</span></span>
<span class="line"><span>        return gpu_matmul(a, b);</span></span>
<span class="line"><span>    } else if sys.HAS_AVX512 &amp;&amp; size &gt; 10_000 {</span></span>
<span class="line"><span>        return avx512_matmul(a, b);</span></span>
<span class="line"><span>    } else if sys.HAS_AVX2 &amp;&amp; size &gt; 1_000 {</span></span>
<span class="line"><span>        return avx2_matmul(a, b);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        return naive_matmul(a, b);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="lazy-initialization" tabindex="-1">Lazy Initialization <a class="header-anchor" href="#lazy-initialization" aria-label="Permalink to &quot;Lazy Initialization&quot;">​</a></h3><p>Some expensive detections are lazy-initialized on first access:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// GPU enumeration happens only when first accessed</span></span>
<span class="line"><span>if sys.GPU_AVAILABLE {  // First access - triggers GPU detection</span></span>
<span class="line"><span>    let devices = sys.GPU_DEVICES;  // Already cached</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="runtime-dispatch" tabindex="-1">Runtime Dispatch <a class="header-anchor" href="#runtime-dispatch" aria-label="Permalink to &quot;Runtime Dispatch&quot;">​</a></h2><p>When data size is unknown at compile time, the compiler generates dispatch code:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// User code</span></span>
<span class="line"><span>fn process(data: [f32]): [f32] {</span></span>
<span class="line"><span>    return data.map(|x| x * x);</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language-llvm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">llvm</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>; Generated dispatch code</span></span>
<span class="line"><span>define @process(%data) {</span></span>
<span class="line"><span>    %len = call @vec_len(%data)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    %is_tiny = icmp ult %len, 64</span></span>
<span class="line"><span>    br i1 %is_tiny, label %scalar, label %check_simd</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>check_simd:</span></span>
<span class="line"><span>    %is_small = icmp ult %len, 65536</span></span>
<span class="line"><span>    br i1 %is_small, label %simd, label %check_gpu</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>check_gpu:</span></span>
<span class="line"><span>    %gpu_ok = call @gpu_available()</span></span>
<span class="line"><span>    %is_huge = icmp ugt %len, 1048576</span></span>
<span class="line"><span>    %use_gpu = and i1 %gpu_ok, %is_huge</span></span>
<span class="line"><span>    br i1 %use_gpu, label %gpu, label %threaded</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>scalar:</span></span>
<span class="line"><span>    call @process_scalar(%data)</span></span>
<span class="line"><span>    br label %done</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>simd:</span></span>
<span class="line"><span>    call @process_simd(%data)</span></span>
<span class="line"><span>    br label %done</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>threaded:</span></span>
<span class="line"><span>    call @process_threaded(%data)</span></span>
<span class="line"><span>    br label %done</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>gpu:</span></span>
<span class="line"><span>    call @process_gpu(%data)</span></span>
<span class="line"><span>    br label %done</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>done:</span></span>
<span class="line"><span>    ret %result</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="compiler-hints-optional" tabindex="-1">Compiler Hints (Optional) <a class="header-anchor" href="#compiler-hints-optional" aria-label="Permalink to &quot;Compiler Hints (Optional)&quot;">​</a></h2><p>While automatic optimization is preferred, developers can provide hints when they know better:</p><h3 id="performance-hints" tabindex="-1">Performance Hints <a class="header-anchor" href="#performance-hints" aria-label="Permalink to &quot;Performance Hints&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Hint: This data is always large, prefer GPU</span></span>
<span class="line"><span>#[prefer_gpu]</span></span>
<span class="line"><span>fn train_model(weights: [f32]): [f32] {</span></span>
<span class="line"><span>    // Compiler biases toward GPU</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Hint: This must be sequential (has hidden state)</span></span>
<span class="line"><span>#[sequential]</span></span>
<span class="line"><span>fn stateful_process(data: [f32]): [f32] {</span></span>
<span class="line"><span>    // Compiler won&#39;t parallelize</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Hint: Data is always small</span></span>
<span class="line"><span>#[inline]</span></span>
<span class="line"><span>fn tiny_compute(x: f32): f32 {</span></span>
<span class="line"><span>    return x * x;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="disabling-optimization" tabindex="-1">Disabling Optimization <a class="header-anchor" href="#disabling-optimization" aria-label="Permalink to &quot;Disabling Optimization&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Force scalar execution (debugging)</span></span>
<span class="line"><span>#[no_vectorize]</span></span>
<span class="line"><span>fn debug_process(data: [f32]): [f32] {</span></span>
<span class="line"><span>    // Always scalar</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Note</strong>: Hints are suggestions, not commands. The compiler may ignore them if analysis shows they&#39;re suboptimal.</p><hr><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="example-1-vector-operations" tabindex="-1">Example 1: Vector Operations <a class="header-anchor" href="#example-1-vector-operations" aria-label="Permalink to &quot;Example 1: Vector Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn dot_product(a: [f32], b: [f32]): f32 {</span></span>
<span class="line"><span>    return a.zip(b).map(|(x, y)| x * y).sum();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Compiler Analysis</strong>:</p><ul><li>Pure function ✅</li><li>Reduction pattern (sum)</li><li>Memory: sequential access</li></ul><p><strong>Generated Code</strong>:</p><ul><li>Small: Scalar accumulator</li><li>Medium: SIMD with horizontal add</li><li>Large: Parallel reduction tree</li></ul><h3 id="example-2-image-processing" tabindex="-1">Example 2: Image Processing <a class="header-anchor" href="#example-2-image-processing" aria-label="Permalink to &quot;Example 2: Image Processing&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn blur(image: [[f32; W]; H], kernel: [[f32; 3]; 3]): [[f32; W]; H] {</span></span>
<span class="line"><span>    return image.convolve(kernel);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Compiler Analysis</strong>:</p><ul><li>Pure function ✅</li><li>2D stencil pattern</li><li>Memory: regular 2D access</li></ul><p><strong>Generated Code</strong>:</p><ul><li>Small image: Scalar nested loops</li><li>Medium image: SIMD rows + cache blocking</li><li>Large image: GPU kernel (2D grid)</li></ul><h3 id="example-3-sorting" tabindex="-1">Example 3: Sorting <a class="header-anchor" href="#example-3-sorting" aria-label="Permalink to &quot;Example 3: Sorting&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn sort(data: [i32]!): [i32] {</span></span>
<span class="line"><span>    return data.sorted();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Compiler Analysis</strong>:</p><ul><li>In-place mutation (careful!)</li><li>Comparison-based</li><li>Memory: random access</li></ul><p><strong>Generated Code</strong>:</p><ul><li>Small: Insertion sort</li><li>Medium: Quick sort (SIMD comparisons)</li><li>Large: Parallel merge sort</li></ul><hr><h2 id="deprecated-keywords" tabindex="-1">Deprecated Keywords <a class="header-anchor" href="#deprecated-keywords" aria-label="Permalink to &quot;Deprecated Keywords&quot;">​</a></h2><p>The following keywords are <strong>deprecated</strong> and will be removed in future versions:</p><table tabindex="0"><thead><tr><th>Keyword</th><th>Status</th><th>Replacement</th></tr></thead><tbody><tr><td><code>fn</code></td><td>⚠️ Deprecated</td><td>Automatic GPU detection</td></tr><tr><td><code>launch</code></td><td>⚠️ Deprecated</td><td>Automatic dispatch</td></tr><tr><td><code>@vectorize</code></td><td>⚠️ Deprecated</td><td>Automatic SIMD</td></tr><tr><td><code>@gpu</code></td><td>⚠️ Deprecated</td><td>Automatic GPU detection</td></tr></tbody></table><h3 id="migration-guide" tabindex="-1">Migration Guide <a class="header-anchor" href="#migration-guide" aria-label="Permalink to &quot;Migration Guide&quot;">​</a></h3><p><strong>Before (Manual)</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@vectorize</span></span>
<span class="line"><span>fn process(data: [f32]): [f32] {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn kernel(data: [f32]): [f32] {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let result = launch kernel(data);</span></span></code></pre></div><p><strong>After (Automatic)</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process(data: [f32]): [f32] {</span></span>
<span class="line"><span>    // Compiler handles optimization</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn compute(data: [f32]): [f32] {</span></span>
<span class="line"><span>    // Same function, compiler chooses CPU or GPU</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let result = compute(data);  // Automatic dispatch</span></span></code></pre></div><hr><h2 id="implementation-status" tabindex="-1">Implementation Status <a class="header-anchor" href="#implementation-status" aria-label="Permalink to &quot;Implementation Status&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Feature</th><th>Status</th><th>Notes</th></tr></thead><tbody><tr><td>Purity Analysis</td><td>🚧 Partial</td><td>Basic side-effect detection</td></tr><tr><td>SIMD Auto-vectorization</td><td>🚧 Planned</td><td>Via LLVM</td></tr><tr><td>Multi-thread dispatch</td><td>🚧 Planned</td><td>Work-stealing runtime</td></tr><tr><td>GPU detection</td><td>🚧 Planned</td><td>Vulkan/Metal/CUDA</td></tr><tr><td>Runtime dispatch</td><td>🚧 Planned</td><td>Threshold-based</td></tr><tr><td>Cost model</td><td>🚧 Planned</td><td>Configurable</td></tr></tbody></table><hr><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><h3 id="compiler-flags" tabindex="-1">Compiler Flags <a class="header-anchor" href="#compiler-flags" aria-label="Permalink to &quot;Compiler Flags&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Set optimization level</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --opt-level=3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Disable GPU offloading</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --no-gpu</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Set SIMD target</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --simd=avx512</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Profile-guided optimization</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --pgo=profile.data</span></span></code></pre></div><h3 id="environment-variables" tabindex="-1">Environment Variables <a class="header-anchor" href="#environment-variables" aria-label="Permalink to &quot;Environment Variables&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Runtime GPU threshold override</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">VEX_GPU_THRESHOLD</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">10000000</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 10MB</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Force CPU-only execution</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">VEX_NO_GPU</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Thread count</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">VEX_THREADS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">8</span></span></code></pre></div><hr><h2 id="comparison-with-other-languages" tabindex="-1">Comparison with Other Languages <a class="header-anchor" href="#comparison-with-other-languages" aria-label="Permalink to &quot;Comparison with Other Languages&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Language</th><th>Vectorization</th><th>GPU</th><th>Threading</th><th>Automatic</th></tr></thead><tbody><tr><td>C</td><td>Manual intrinsics</td><td>Manual CUDA</td><td>Manual pthreads</td><td>❌</td></tr><tr><td>Rust</td><td>Auto (limited)</td><td>Manual</td><td>Manual</td><td>⚠️</td></tr><tr><td>Go</td><td>❌</td><td>❌</td><td>Easy goroutines</td><td>⚠️</td></tr><tr><td>Julia</td><td>Auto JIT</td><td>Auto</td><td>Auto</td><td>✅</td></tr><tr><td>Mojo</td><td>Manual hints</td><td>Manual</td><td>Manual</td><td>⚠️</td></tr><tr><td><strong>Vex</strong></td><td><strong>Auto</strong></td><td><strong>Auto</strong></td><td><strong>Auto</strong></td><td><strong>✅</strong></td></tr></tbody></table><hr><p><strong>Previous</strong>: <a href="./24_Context">24_Context.md</a><br><strong>Next</strong>: <a href="./99_BUILTINS">99_BUILTINS.md</a></p><p><strong>Maintained by</strong>: Vex Language Team</p>`,141)])])}const m=s(i,[["render",p]]);export{u as __pageData,m as default};
