import{_ as s,o as e,c as n,ag as t}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Unsafe Code","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/unsafe.md","filePath":"guide/advanced/unsafe.md"}'),l={name:"guide/advanced/unsafe.md"};function p(i,a,r,o,c,d){return e(),n("div",null,[...a[0]||(a[0]=[t(`<h1 id="unsafe-code" tabindex="-1">Unsafe Code <a class="header-anchor" href="#unsafe-code" aria-label="Permalink to &quot;Unsafe Code&quot;">​</a></h1><p>Vex provides <code>unsafe</code> blocks and functions for low-level operations that bypass the compiler&#39;s safety guarantees. Use sparingly and only when necessary.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Unsafe code can cause memory corruption, undefined behavior, and security vulnerabilities. Always wrap unsafe code in safe abstractions.</p></div><h2 id="unsafe-blocks" tabindex="-1">Unsafe Blocks <a class="header-anchor" href="#unsafe-blocks" aria-label="Permalink to &quot;Unsafe Blocks&quot;">​</a></h2><p>The <code>unsafe { }</code> block allows operations that the compiler cannot verify as safe:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main() {</span></span>
<span class="line"><span>    let value: i64 = 42</span></span>
<span class="line"><span>    let ptr = &amp;value as *i64</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Unsafe block for raw pointer dereference</span></span>
<span class="line"><span>    let read_val = unsafe { *ptr }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    println(f&quot;Value: {read_val}&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="what-requires-unsafe" tabindex="-1">What Requires Unsafe? <a class="header-anchor" href="#what-requires-unsafe" aria-label="Permalink to &quot;What Requires Unsafe?&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operation</th><th>Why Unsafe?</th></tr></thead><tbody><tr><td>Raw pointer dereference (<code>*ptr</code>)</td><td>Pointer may be null or dangling</td></tr><tr><td>Calling <code>unsafe fn</code></td><td>Function has manual safety requirements</td></tr><tr><td>FFI calls (<code>extern &quot;C&quot;</code>)</td><td>No safety guarantees for C code</td></tr><tr><td>Mutable global access</td><td>Risk of data races</td></tr></tbody></table><h2 id="unsafe-functions" tabindex="-1">Unsafe Functions <a class="header-anchor" href="#unsafe-functions" aria-label="Permalink to &quot;Unsafe Functions&quot;">​</a></h2><p>Declare functions with the <code>unsafe</code> keyword to signal manual safety requirements:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Unsafe function - caller must ensure ptr is non-null</span></span>
<span class="line"><span>unsafe fn raw_read(ptr: *i64): i64 {</span></span>
<span class="line"><span>    return *ptr</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    let val = 100</span></span>
<span class="line"><span>    let ptr = &amp;val as *i64</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Must call within unsafe block</span></span>
<span class="line"><span>    let result = unsafe { raw_read(ptr) }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="raw-pointers" tabindex="-1">Raw Pointers <a class="header-anchor" href="#raw-pointers" aria-label="Permalink to &quot;Raw Pointers&quot;">​</a></h2><p>Vex distinguishes between references (<code>&amp;T</code>) and raw pointers (<code>*T</code>).</p><h3 id="creating-raw-pointers" tabindex="-1">Creating Raw Pointers <a class="header-anchor" href="#creating-raw-pointers" aria-label="Permalink to &quot;Creating Raw Pointers&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x = 42</span></span>
<span class="line"><span>let ptr = &amp;x as *i32      // Immutable raw pointer</span></span>
<span class="line"><span>let! y = 100</span></span>
<span class="line"><span>let ptr_mut = &amp;y! as *i32! // Mutable raw pointer</span></span></code></pre></div><h3 id="dereferencing" tabindex="-1">Dereferencing <a class="header-anchor" href="#dereferencing" aria-label="Permalink to &quot;Dereferencing&quot;">​</a></h3><p>Dereferencing a raw pointer is always <code>unsafe</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x = 42</span></span>
<span class="line"><span>let ptr = &amp;x as *i32</span></span>
<span class="line"><span>let val = unsafe { *ptr }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let! y = 100</span></span>
<span class="line"><span>let ptr_mut = &amp;y! as *i32!</span></span>
<span class="line"><span>unsafe { *ptr_mut = 200 }</span></span></code></pre></div><h2 id="mutable-global-variables" tabindex="-1">Mutable Global Variables <a class="header-anchor" href="#mutable-global-variables" aria-label="Permalink to &quot;Mutable Global Variables&quot;">​</a></h2><p>Accessing mutable global variables requires <code>unsafe</code> due to potential data races:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! COUNTER: i32 = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn increment() {</span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        COUNTER += 1</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn get_count(): i32 {</span></span>
<span class="line"><span>    return unsafe { COUNTER }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Minimize Unsafe Scope</strong>: Keep <code>unsafe</code> blocks as small as possible.</li><li><strong>Safe Wrappers</strong>: Always prefer wrapping unsafe modules in a clean, safe Vex API.</li><li><strong>Validate Pointers</strong>: Perform null checks or bounds checks in safe code before entering an unsafe block.</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/ffi">FFI</a> - Calling C functions</li><li><a href="/docs/guide/advanced/pointers">Raw Pointers</a> - Pointer arithmetic and details</li><li><a href="/docs/guide/freestanding">Freestanding</a> - Using unsafe for OS kernels</li></ul>`,25)])])}const f=s(l,[["render",p]]);export{h as __pageData,f as default};
