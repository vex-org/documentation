import{_ as s,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Foreign Function Interface (FFI)","description":"","frontmatter":{},"headers":[],"relativePath":"guide/ffi.md","filePath":"guide/ffi.md"}'),p={name:"guide/ffi.md"};function i(l,a,o,r,c,d){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="foreign-function-interface-ffi" tabindex="-1">Foreign Function Interface (FFI) <a class="header-anchor" href="#foreign-function-interface-ffi" aria-label="Permalink to &quot;Foreign Function Interface (FFI)&quot;">​</a></h1><p>Vex provides seamless interoperability with C libraries through its FFI system. This allows calling C functions and exposing Vex functions to C code.</p><h2 id="calling-c-functions" tabindex="-1">Calling C Functions <a class="header-anchor" href="#calling-c-functions" aria-label="Permalink to &quot;Calling C Functions&quot;">​</a></h2><h3 id="basic-ffi" tabindex="-1">Basic FFI <a class="header-anchor" href="#basic-ffi" aria-label="Permalink to &quot;Basic FFI&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Declare external C functions</span></span>
<span class="line"><span>extern &quot;C&quot; {</span></span>
<span class="line"><span>    fn puts(s: *u8): i32</span></span>
<span class="line"><span>    fn strlen(s: *u8): u64</span></span>
<span class="line"><span>    fn malloc(size: u64): *u8!    // *T! = mutable pointer</span></span>
<span class="line"><span>    fn free(ptr: *u8!)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        puts(&quot;Hello from C!&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="linking-libraries" tabindex="-1">Linking Libraries <a class="header-anchor" href="#linking-libraries" aria-label="Permalink to &quot;Linking Libraries&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Link system library</span></span>
<span class="line"><span>extern &quot;C&quot; from &quot;m&quot; {    // libm (math library)</span></span>
<span class="line"><span>    fn sin(x: f64): f64</span></span>
<span class="line"><span>    fn cos(x: f64): f64</span></span>
<span class="line"><span>    fn sqrt(x: f64): f64</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="pointer-types" tabindex="-1">Pointer Types <a class="header-anchor" href="#pointer-types" aria-label="Permalink to &quot;Pointer Types&quot;">​</a></h2><p>Vex uses explicit pointer syntax:</p><table tabindex="0"><thead><tr><th>Vex Type</th><th>C Type</th><th>Description</th></tr></thead><tbody><tr><td><code>*T</code></td><td><code>const T*</code></td><td>Immutable raw pointer</td></tr><tr><td><code>*T!</code></td><td><code>T*</code></td><td>Mutable raw pointer</td></tr><tr><td><code>**T</code></td><td><code>const T**</code></td><td>Pointer to pointer (immutable)</td></tr><tr><td><code>**T!</code></td><td><code>T**</code></td><td>Pointer to pointer (mutable)</td></tr></tbody></table><h2 id="c-types-mapping" tabindex="-1">C Types Mapping <a class="header-anchor" href="#c-types-mapping" aria-label="Permalink to &quot;C Types Mapping&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Vex Type</th><th>C Type</th></tr></thead><tbody><tr><td><code>i32</code></td><td><code>int32_t</code>, <code>int</code></td></tr><tr><td><code>usize</code></td><td><code>size_t</code></td></tr><tr><td><code>*u8</code></td><td><code>const char*</code></td></tr></tbody></table><h2 id="structs" tabindex="-1">Structs <a class="header-anchor" href="#structs" aria-label="Permalink to &quot;Structs&quot;">​</a></h2><p>Use <code>repr(C)</code> for C-compatible limits:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point repr(C) {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="memory-safety" tabindex="-1">Memory Safety <a class="header-anchor" href="#memory-safety" aria-label="Permalink to &quot;Memory Safety&quot;">​</a></h2><h3 id="unsafe-blocks" tabindex="-1">Unsafe Blocks <a class="header-anchor" href="#unsafe-blocks" aria-label="Permalink to &quot;Unsafe Blocks&quot;">​</a></h3><p>FFI calls require <code>unsafe</code> blocks:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn use_ffi() {</span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        let ptr = malloc(1024)</span></span>
<span class="line"><span>        if ptr == ptr.null() {</span></span>
<span class="line"><span>            panic(&quot;allocation failed&quot;)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        free(ptr)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="safe-wrappers" tabindex="-1">Safe Wrappers <a class="header-anchor" href="#safe-wrappers" aria-label="Permalink to &quot;Safe Wrappers&quot;">​</a></h3><p>Create safe wrappers around unsafe FFI:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Unsafe FFI</span></span>
<span class="line"><span>extern &quot;C&quot; {</span></span>
<span class="line"><span>    fn dangerous_function(ptr: *u8!, len: u64): i32</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Safe wrapper</span></span>
<span class="line"><span>export fn safe_wrapper(data: Vec&lt;u8&gt;!): Result&lt;(), error&gt; {</span></span>
<span class="line"><span>    let result = unsafe {</span></span>
<span class="line"><span>        dangerous_function(data.as_ptr()!, data.len() as u64)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if result == 0 {</span></span>
<span class="line"><span>        return Ok(())</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        return Err(error.new(f&quot;FFI error code: {result}&quot;))</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="unsafe-functions" tabindex="-1">Unsafe Functions <a class="header-anchor" href="#unsafe-functions" aria-label="Permalink to &quot;Unsafe Functions&quot;">​</a></h3><p>For functions that are inherently unsafe manually declare them <code>unsafe</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Unsafe function - caller must ensure safety</span></span>
<span class="line"><span>unsafe fn raw_access(ptr: *i32!): i32 {</span></span>
<span class="line"><span>    return *ptr</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Must be called in unsafe block</span></span>
<span class="line"><span>unsafe {</span></span>
<span class="line"><span>    let value = raw_access(some_ptr)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="platform-specific-code" tabindex="-1">Platform-Specific Code <a class="header-anchor" href="#platform-specific-code" aria-label="Permalink to &quot;Platform-Specific Code&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$if TARGET_OS == &quot;linux&quot; {</span></span>
<span class="line"><span>    extern &quot;C&quot; {</span></span>
<span class="line"><span>        fn epoll_create(size: i32): i32</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Always Wrap Unsafe Code</strong>: Don&#39;t leak <code>unsafe</code> or raw pointers into your public API unless designed for low-level systems programming.</li><li><strong>Handle Null Pointers</strong>: Check for <code>ptr.null()</code> return values from C allocations.</li><li><strong>Use <code>repr(C)</code></strong>: Always mark structs passed to C with <code>repr(C)</code>.</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/stdlib">Standard Library</a> - Built-in utilities</li><li><a href="/docs/guide/memory/ownership">Memory Management</a> - Safe memory model</li></ul>`,31)])])}const f=s(p,[["render",i]]);export{h as __pageData,f as default};
