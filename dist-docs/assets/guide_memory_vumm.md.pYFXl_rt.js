import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"VUMM - Vex Unified Memory Model","description":"","frontmatter":{},"headers":[],"relativePath":"guide/memory/vumm.md","filePath":"guide/memory/vumm.md"}'),t={name:"guide/memory/vumm.md"};function i(l,a,o,c,r,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="vumm-vex-unified-memory-model" tabindex="-1">VUMM - Vex Unified Memory Model <a class="header-anchor" href="#vumm-vex-unified-memory-model" aria-label="Permalink to &quot;VUMM - Vex Unified Memory Model&quot;">​</a></h1><p>VUMM is Vex&#39;s revolutionary memory management system that automatically selects the optimal memory strategy at compile time. Write <code>Box.new()</code> and let the compiler choose the best implementation.</p><div class="tip custom-block"><p class="custom-block-title">Key Insight</p><p><strong>Vex has NO separate <code>Rc</code> or <code>Arc</code> types.</strong> There is only <code>Box&lt;T&gt;</code>. The compiler automatically determines whether it needs unique ownership, reference counting, or atomic reference counting based on usage analysis.</p></div><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>Traditional languages force you to choose:</p><ul><li><strong>Manual memory</strong> (C/C++): Fast but unsafe</li><li><strong>Garbage collection</strong> (Java/Go): Safe but has overhead</li><li><strong>Explicit smart pointers</strong> (Rust): <code>Box</code>, <code>Rc</code>, <code>Arc</code> - you must choose</li></ul><p><strong>VUMM eliminates the choice burden.</strong> You write <code>Box.new(value)</code> and get optimal behavior automatically.</p><h2 id="the-single-type-box-t" tabindex="-1">The Single Type: <code>Box&lt;T&gt;</code> <a class="header-anchor" href="#the-single-type-box-t" aria-label="Permalink to &quot;The Single Type: \`Box&lt;T&gt;\`&quot;">​</a></h2><p>In Vex, there is only one heap allocation type:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// All three syntaxes are equivalent:</span></span>
<span class="line"><span>let data = Box(MyData { field: 42 })      // Shorthand</span></span>
<span class="line"><span>let data = Box.new(MyData { field: 42 })  // Method style</span></span>
<span class="line"><span>let data = Box&lt;MyData&gt;(value)             // Explicit type</span></span></code></pre></div><p><strong>No <code>Rc</code> or <code>Arc</code> types.</strong> Just <code>Box</code> - VUMM handles the rest automatically.</p><h2 id="automatic-boxkind-selection" tabindex="-1">Automatic BoxKind Selection <a class="header-anchor" href="#automatic-boxkind-selection" aria-label="Permalink to &quot;Automatic BoxKind Selection&quot;">​</a></h2><p>At compile time, VUMM analyzes your code and assigns each <code>Box.new()</code> call one of three <strong>BoxKinds</strong>:</p><h3 id="_1-unique" tabindex="-1">1. Unique <a class="header-anchor" href="#_1-unique" aria-label="Permalink to &quot;1. Unique&quot;">​</a></h3><p>Single owner, zero overhead - just like <code>malloc</code>/<code>free</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn unique_example() {</span></span>
<span class="line"><span>    let data = Box([1, 2, 3])</span></span>
<span class="line"><span>    process(data)  // Ownership transferred</span></span>
<span class="line"><span>    // Memory freed when data goes out of scope</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// VUMM analysis: No clones, no escapes → Unique</span></span>
<span class="line"><span>// Generated code: Just malloc + free, zero overhead</span></span></code></pre></div><p><strong>When selected:</strong></p><ul><li>Value never cloned</li><li>Ownership is linear (single owner at any time)</li><li>No thread boundary crossing</li></ul><p><strong>Memory layout:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────┐</span></span>
<span class="line"><span>│  payload: T     │  ← Just the data, nothing else!</span></span>
<span class="line"><span>└─────────────────┘</span></span></code></pre></div><h3 id="_2-sharedrc" tabindex="-1">2. SharedRc <a class="header-anchor" href="#_2-sharedrc" aria-label="Permalink to &quot;2. SharedRc&quot;">​</a></h3><p>Non-atomic reference counting for single-threaded sharing:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn shared_example() {</span></span>
<span class="line"><span>    let data = Box(ExpensiveResource.load())</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    let view1 = data.clone()  // Cheap: just increment counter</span></span>
<span class="line"><span>    let view2 = data.clone()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    process(view1)</span></span>
<span class="line"><span>    use_data(view2)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Memory freed when last reference dropped</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// VUMM analysis: Multiple clones, same thread → SharedRc</span></span></code></pre></div><p><strong>When selected:</strong></p><ul><li>Value is cloned (multiple consumers)</li><li>All usage within single thread</li><li>No escapes via <code>go</code>, channels, or <code>spawn</code></li></ul><p><strong>Memory layout:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────┐</span></span>
<span class="line"><span>│  rc: u32        │  ← Non-atomic refcount</span></span>
<span class="line"><span>├─────────────────┤</span></span>
<span class="line"><span>│  payload: T     │</span></span>
<span class="line"><span>└─────────────────┘</span></span></code></pre></div><h3 id="_3-atomicarc" tabindex="-1">3. AtomicArc <a class="header-anchor" href="#_3-atomicarc" aria-label="Permalink to &quot;3. AtomicArc&quot;">​</a></h3><p>Atomic reference counting for multi-threaded sharing:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn atomic_example() {</span></span>
<span class="line"><span>    let data = Box(SharedState.new())</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    for _ in 0..10 {</span></span>
<span class="line"><span>        let data_clone = data.clone()</span></span>
<span class="line"><span>        go {</span></span>
<span class="line"><span>            data_clone.read()  // Safe concurrent access</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// VUMM analysis: Escapes via \`go\` block → AtomicArc</span></span></code></pre></div><p><strong>When selected:</strong></p><ul><li>Value escapes to another thread (<code>go</code> blocks, channels, <code>spawn</code>)</li><li>Cross-thread sharing detected</li><li>FFI with potential external escapes</li></ul><p><strong>Memory layout:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────┐</span></span>
<span class="line"><span>│  rc: AtomicU32  │  ← Atomic refcount</span></span>
<span class="line"><span>├─────────────────┤</span></span>
<span class="line"><span>│  payload: T     │</span></span>
<span class="line"><span>└─────────────────┘</span></span></code></pre></div><h2 id="how-vumm-analyzes-your-code" tabindex="-1">How VUMM Analyzes Your Code <a class="header-anchor" href="#how-vumm-analyzes-your-code" aria-label="Permalink to &quot;How VUMM Analyzes Your Code&quot;">​</a></h2><h3 id="analysis-pipeline" tabindex="-1">Analysis Pipeline <a class="header-anchor" href="#analysis-pipeline" aria-label="Permalink to &quot;Analysis Pipeline&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Box.new() call site</span></span>
<span class="line"><span>        │</span></span>
<span class="line"><span>        ▼</span></span>
<span class="line"><span>┌───────────────────┐</span></span>
<span class="line"><span>│ Consumer Counting │  How many variables hold this value?</span></span>
<span class="line"><span>└─────────┬─────────┘</span></span>
<span class="line"><span>          │</span></span>
<span class="line"><span>          ▼</span></span>
<span class="line"><span>┌───────────────────┐</span></span>
<span class="line"><span>│  Escape Analysis  │  Does it cross thread boundaries?</span></span>
<span class="line"><span>└─────────┬─────────┘</span></span>
<span class="line"><span>          │</span></span>
<span class="line"><span>          ▼</span></span>
<span class="line"><span>┌───────────────────┐</span></span>
<span class="line"><span>│  Kind Resolution  │  max(consumer_result, escape_result)</span></span>
<span class="line"><span>└─────────┬─────────┘</span></span>
<span class="line"><span>          │</span></span>
<span class="line"><span>          ▼</span></span>
<span class="line"><span>┌───────────────────┐</span></span>
<span class="line"><span>│  Monomorphization │  Generate kind-specific code</span></span>
<span class="line"><span>└───────────────────┘</span></span></code></pre></div><h3 id="complete-example" tabindex="-1">Complete Example <a class="header-anchor" href="#complete-example" aria-label="Permalink to &quot;Complete Example&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main() {</span></span>
<span class="line"><span>    let config = Box(Config { debug: true })  // Site 0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if should_share {</span></span>
<span class="line"><span>        let config2 = config.clone()   // Site 0: 2 consumers → SharedRc candidate</span></span>
<span class="line"><span>        use_config(config2)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    go {</span></span>
<span class="line"><span>        print(config)                  // Site 0: escapes via go → AtomicArc!</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Final result: Site 0 = AtomicArc (escape trumps sharing)</span></span></code></pre></div><p><strong>Key principle:</strong> <code>AtomicArc &gt; SharedRc &gt; Unique</code> - compiler always picks the safest option.</p><h2 id="reference-count-elision-perceus" tabindex="-1">Reference Count Elision (Perceus) <a class="header-anchor" href="#reference-count-elision-perceus" aria-label="Permalink to &quot;Reference Count Elision (Perceus)&quot;">​</a></h2><p>VUMM implements the Perceus algorithm to eliminate unnecessary reference counting:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn elision_example(data: Box&lt;Data&gt;): Box&lt;Data&gt; {</span></span>
<span class="line"><span>    // Traditional RC: increment on entry, decrement on exit</span></span>
<span class="line"><span>    // VUMM Perceus: Detects data is passed through unchanged</span></span>
<span class="line"><span>    // Result: Zero reference count operations!</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if data.is_valid() {</span></span>
<span class="line"><span>        data  // No RC overhead - elided</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        Box(Data.default())</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="elision-patterns-vumm-recognizes" tabindex="-1">Elision Patterns VUMM Recognizes <a class="header-anchor" href="#elision-patterns-vumm-recognizes" aria-label="Permalink to &quot;Elision Patterns VUMM Recognizes&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Pattern 1: Pass-through - ZERO RC operations</span></span>
<span class="line"><span>fn pass_through(x: Box&lt;T&gt;): Box&lt;T&gt; { x }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Pattern 2: Temporary clone - increment elided</span></span>
<span class="line"><span>fn temporary() {</span></span>
<span class="line"><span>    let data = Box(value)</span></span>
<span class="line"><span>    let temp = data.clone()</span></span>
<span class="line"><span>    use_and_drop(temp)</span></span>
<span class="line"><span>    data  // Last use - decrement elided</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Pattern 3: Known last use</span></span>
<span class="line"><span>fn last_use(data: Box&lt;T&gt;) {</span></span>
<span class="line"><span>    process(data)  // Decrement moved to callee or elided entirely</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="memory-reuse" tabindex="-1">Memory Reuse <a class="header-anchor" href="#memory-reuse" aria-label="Permalink to &quot;Memory Reuse&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn reuse_example() {</span></span>
<span class="line"><span>    let! data = Box([0u8; 1024])</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    for i in 0..1000 {</span></span>
<span class="line"><span>        // Without Perceus: alloc/free each iteration</span></span>
<span class="line"><span>        // With Perceus: Reuses same memory</span></span>
<span class="line"><span>        data = Box([i as u8; 1024])</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// VUMM detects drop→alloc pattern and reuses memory</span></span></code></pre></div><h2 id="explicit-kind-override" tabindex="-1">Explicit Kind Override <a class="header-anchor" href="#explicit-kind-override" aria-label="Permalink to &quot;Explicit Kind Override&quot;">​</a></h2><p>When you know better than the compiler, you can override:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Force Unique (compiler error if actually needs sharing)</span></span>
<span class="line"><span>let data: Box&lt;Data, Unique&gt; = Box(value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Force SharedRc (even if no clones detected)</span></span>
<span class="line"><span>let data: Box&lt;Data, SharedRc&gt; = Box(value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Force AtomicArc (for future-proofing multi-threaded code)</span></span>
<span class="line"><span>let data = Box&lt;Data, AtomicArc&gt;(value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Let VUMM decide (default - recommended)</span></span>
<span class="line"><span>let data = Box(value)</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Explicit overrides should be rare. Trust VUMM&#39;s analysis in most cases.</p></div><h2 id="performance-characteristics" tabindex="-1">Performance Characteristics <a class="header-anchor" href="#performance-characteristics" aria-label="Permalink to &quot;Performance Characteristics&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Operation</th><th>Unique</th><th>SharedRc</th><th>AtomicArc</th></tr></thead><tbody><tr><td>Create</td><td>~malloc</td><td>~malloc</td><td>~malloc</td></tr><tr><td>Clone</td><td>N/A (move)</td><td>+1 plain inc</td><td>+1 atomic inc</td></tr><tr><td>Drop</td><td>~free</td><td>+1 plain dec</td><td>+1 atomic dec</td></tr><tr><td>Deref</td><td>0</td><td>0</td><td>0</td></tr><tr><td>Memory overhead</td><td>+0 bytes</td><td>+4 bytes</td><td>+4 bytes</td></tr></tbody></table><h2 id="debug-vumm-decisions" tabindex="-1">Debug VUMM Decisions <a class="header-anchor" href="#debug-vumm-decisions" aria-label="Permalink to &quot;Debug VUMM Decisions&quot;">​</a></h2><p>See what VUMM decided:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Compile with VUMM explanation</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> check</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --explain-boxing</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> src/main.vx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Output:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># src/main.vx:15  Box.new() → Unique    (single consumer)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># src/main.vx:23  Box.new() → SharedRc  (2 consumers, single thread)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># src/main.vx:45  Box.new() → AtomicArc (escapes via go block at line 52)</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><h3 id="_1-trust-vumm" tabindex="-1">1. Trust VUMM <a class="header-anchor" href="#_1-trust-vumm" aria-label="Permalink to &quot;1. Trust VUMM&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Good: Let VUMM decide</span></span>
<span class="line"><span>let data = Box(expensive_computation())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ Unnecessary: Manual specification</span></span>
<span class="line"><span>let data: Box&lt;Data, AtomicArc&gt; = Box(expensive_computation())</span></span></code></pre></div><h3 id="_2-minimize-cloning-when-possible" tabindex="-1">2. Minimize Cloning When Possible <a class="header-anchor" href="#_2-minimize-cloning-when-possible" aria-label="Permalink to &quot;2. Minimize Cloning When Possible&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// VUMM optimizes clones, but avoiding them is still better</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Less optimal - triggers SharedRc</span></span>
<span class="line"><span>let data = Box(vec)</span></span>
<span class="line"><span>let copy = data.clone()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Better - use references when possible</span></span>
<span class="line"><span>let data = Box(vec)</span></span>
<span class="line"><span>process(&amp;data)</span></span></code></pre></div><h3 id="_3-use-references-for-read-only-access" tabindex="-1">3. Use References for Read-Only Access <a class="header-anchor" href="#_3-use-references-for-read-only-access" aria-label="Permalink to &quot;3. Use References for Read-Only Access&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: VUMM can use Unique if no clones</span></span>
<span class="line"><span>fn process(data: &amp;Box&lt;Data&gt;) {</span></span>
<span class="line"><span>    print(data.field)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Triggers SharedRc unnecessarily</span></span>
<span class="line"><span>fn process(data: Box&lt;Data&gt;): Box&lt;Data&gt; {</span></span>
<span class="line"><span>    print(data.field)</span></span>
<span class="line"><span>    data</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="comparison-with-other-languages" tabindex="-1">Comparison with Other Languages <a class="header-anchor" href="#comparison-with-other-languages" aria-label="Permalink to &quot;Comparison with Other Languages&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Language</th><th>Heap Allocation</th><th>Developer Burden</th></tr></thead><tbody><tr><td>C</td><td><code>malloc</code>/<code>free</code></td><td>Manual, error-prone</td></tr><tr><td>C++</td><td><code>unique_ptr</code>, <code>shared_ptr</code></td><td>Choose correct type</td></tr><tr><td>Rust</td><td><code>Box</code>, <code>Rc</code>, <code>Arc</code></td><td>Choose correct type</td></tr><tr><td>Go</td><td>GC handles everything</td><td>Runtime overhead</td></tr><tr><td><strong>Vex</strong></td><td><code>Box.new()</code></td><td><strong>Automatic, zero overhead</strong></td></tr></tbody></table><h2 id="summary" tabindex="-1">Summary <a class="header-anchor" href="#summary" aria-label="Permalink to &quot;Summary&quot;">​</a></h2><div class="info custom-block"><p class="custom-block-title">TL;DR</p><ol><li><strong>Write <code>Box(value)</code> or <code>Box.new(value)</code></strong> - that&#39;s it</li><li><strong>Never look for <code>Rc</code> or <code>Arc</code> types</strong> - they don&#39;t exist in Vex</li><li><strong>VUMM picks Unique/SharedRc/AtomicArc</strong> automatically at compile time</li><li><strong>Zero runtime overhead</strong> - kind is monomorphized, no branching</li><li><strong>Use <code>--explain-boxing</code></strong> to see VUMM&#39;s decisions</li></ol></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="./borrowing">Borrowing</a> - Reference rules</li><li><a href="./lifetimes">Lifetimes</a> - Lifetime annotations</li><li><a href="/docs/guide/advanced/performance">Performance</a> - Optimization tips</li></ul>`,69)])])}const m=s(t,[["render",i]]);export{u as __pageData,m as default};
