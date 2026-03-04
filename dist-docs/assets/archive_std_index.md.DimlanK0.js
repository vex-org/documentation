import{_ as n,o as a,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Standard Library","description":"","frontmatter":{},"headers":[],"relativePath":"archive/std/index.md","filePath":"archive/std/index.md"}'),l={name:"archive/std/index.md"};function i(t,s,o,r,c,d){return a(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="standard-library" tabindex="-1">Standard Library <a class="header-anchor" href="#standard-library" aria-label="Permalink to &quot;Standard Library&quot;">​</a></h1><p><strong>Version:</strong> 0.2.0<br><strong>Last Updated:</strong> November 2025</p><p>This document provides an overview of the Vex standard library organization and API reference.</p><hr><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ol><li><a href="#library-architecture">Library Architecture</a></li><li><a href="#builtin-functions">Builtin Functions</a></li><li><a href="#layer-1-io-core">Layer 1: I/O Core</a></li><li><a href="#layer-2-protocol-layer">Layer 2: Protocol Layer</a></li><li><a href="#layer-3-application-layer">Layer 3: Application Layer</a></li><li><a href="#module-reference">Module Reference</a></li></ol><hr><h2 id="library-architecture" tabindex="-1">Library Architecture <a class="header-anchor" href="#library-architecture" aria-label="Permalink to &quot;Library Architecture&quot;">​</a></h2><h3 id="four-layer-design" tabindex="-1">Four-Layer Design <a class="header-anchor" href="#four-layer-design" aria-label="Permalink to &quot;Four-Layer Design&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  Layer 3: Application (100% Safe Vex)          │</span></span>
<span class="line"><span>│  http, json, xml, yaml, toml                   │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  Layer 2: Protocol (100% Safe Vex)             │</span></span>
<span class="line"><span>│  net, sync, testing, datetime                   │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  Layer 1: I/O Core (Unsafe Bridge)             │</span></span>
<span class="line"><span>│  io, ffi, unsafe, hpc, libc                     │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  Layer 0: Vex Runtime                   │</span></span>
<span class="line"><span>│  io_uring, async scheduler, allocator          │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="design-principles" tabindex="-1">Design Principles <a class="header-anchor" href="#design-principles" aria-label="Permalink to &quot;Design Principles&quot;">​</a></h3><ol><li><strong>Safety by default</strong>: Layers 2 and 3 are 100% safe Vex code</li><li><strong>Unsafe isolation</strong>: All <code>unsafe</code> code contained in Layer 1</li><li><strong>Zero-cost abstractions</strong>: No runtime overhead</li><li><strong>Composable</strong>: Layers build on each other</li></ol><hr><h2 id="builtin-functions" tabindex="-1">Builtin Functions <a class="header-anchor" href="#builtin-functions" aria-label="Permalink to &quot;Builtin Functions&quot;">​</a></h2><p>Vex provides a comprehensive set of builtin functions that are always available without imports. These functions are implemented directly in the compiler and provide low-level access to memory, type information, LLVM intrinsics, and compiler optimizations.</p><h3 id="memory-operations" tabindex="-1">Memory Operations <a class="header-anchor" href="#memory-operations" aria-label="Permalink to &quot;Memory Operations&quot;">​</a></h3><p>Low-level memory management functions:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    // Allocate memory</span></span>
<span class="line"><span>    let ptr = alloc(1024);  // Allocate 1024 bytes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Get type information</span></span>
<span class="line"><span>    let size = sizeof(i64);     // Returns 8</span></span>
<span class="line"><span>    let align = alignof(i64);   // Returns 8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Memory operations</span></span>
<span class="line"><span>    memset(ptr, 0, 1024);       // Zero out memory</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Copy memory</span></span>
<span class="line"><span>    let src = alloc(100);</span></span>
<span class="line"><span>    let dst = alloc(100);</span></span>
<span class="line"><span>    memcpy(dst, src, 100);      // Copy 100 bytes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Compare memory</span></span>
<span class="line"><span>    let result = memcmp(ptr1, ptr2, 100);  // Returns 0 if equal</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Move overlapping memory</span></span>
<span class="line"><span>    memmove(dst, src, 100);     // Safe for overlapping regions</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Resize allocation</span></span>
<span class="line"><span>    let new_ptr = realloc(ptr, 2048);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Free memory</span></span>
<span class="line"><span>    free(new_ptr);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Available Functions</strong>:</p><ul><li><code>alloc(size: u64): &amp;u8!</code> - Allocate memory</li><li><code>free(ptr: &amp;u8!)</code> - Free memory</li><li><code>realloc(ptr: &amp;u8!, size: u64): &amp;u8!</code> - Resize allocation</li><li><code>&lt;T&gt;(): u64</code> - Get type size</li><li><code>alignof&lt;T&gt;(): u64</code> - Get type alignment</li><li><code>memcpy(dst: &amp;u8!, src: &amp;u8, size: u64)</code> - Copy memory</li><li><code>memset(ptr: &amp;u8!, value: i32, size: u64)</code> - Set memory</li><li><code>memcmp(ptr1: &amp;u8, ptr2: &amp;u8, size: u64): i32</code> - Compare memory</li><li><code>memmove(dst: &amp;u8!, src: &amp;u8, size: u64)</code> - Move memory (overlapping safe)</li></ul><p><strong>Status</strong>: ✅ Fully implemented</p><h3 id="string-operations" tabindex="-1">String Operations <a class="header-anchor" href="#string-operations" aria-label="Permalink to &quot;String Operations&quot;">​</a></h3><p>C-style string manipulation:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let str1 = &quot;Hello&quot;;</span></span>
<span class="line"><span>    let str2 = &quot;World&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Get string length</span></span>
<span class="line"><span>    let len = strlen(str1);  // Returns 5</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Compare strings</span></span>
<span class="line"><span>    let cmp = strcmp(str1, str2);  // Returns &lt;0, 0, or &gt;0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Copy string</span></span>
<span class="line"><span>    let dest = alloc(100);</span></span>
<span class="line"><span>    strcpy(dest, str1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Concatenate strings</span></span>
<span class="line"><span>    strcat(dest, str2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Duplicate string</span></span>
<span class="line"><span>    let copy = strdup(str1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Available Functions</strong>:</p><ul><li><code>strlen(s: string): u64</code> - Get string length</li><li><code>strcmp(s1: string, s2: string): i32</code> - Compare strings</li><li><code>strcpy(dst: &amp;u8!, src: string)</code> - Copy string</li><li><code>strcat(dst: &amp;u8!, src: string)</code> - Concatenate strings</li><li><code>strdup(s: string): string</code> - Duplicate string</li></ul><p><strong>Status</strong>: ✅ Fully implemented</p><h3 id="utf-8-support" tabindex="-1">UTF-8 Support <a class="header-anchor" href="#utf-8-support" aria-label="Permalink to &quot;UTF-8 Support&quot;">​</a></h3><p>Unicode string validation and manipulation:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let text = &quot;Hello 🌍&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Validate UTF-8</span></span>
<span class="line"><span>    if utf8_valid(text) {</span></span>
<span class="line"><span>        // Count Unicode characters (not bytes)</span></span>
<span class="line"><span>        let char_count = utf8_char_count(text);  // Returns 7 (not 10)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Get character at index</span></span>
<span class="line"><span>        let ch = utf8_char_at(text, 6);  // Returns &#39;🌍&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Available Functions</strong>:</p><ul><li><code>utf8_valid(s: string): bool</code> - Check if string is valid UTF-8</li><li><code>utf8_char_count(s: string): u64</code> - Count Unicode characters</li><li><code>utf8_char_at(s: string, index: u64): u32</code> - Get character at index</li></ul><p><strong>Status</strong>: ✅ Fully implemented</p><h3 id="type-reflection" tabindex="-1">Type Reflection <a class="header-anchor" href="#type-reflection" aria-label="Permalink to &quot;Type Reflection&quot;">​</a></h3><p>Runtime type information and checking:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let x: i32 = 42;</span></span>
<span class="line"><span>    let y: f64 = 3.14;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Get type name as string</span></span>
<span class="line"><span>    let type_name = typeof(x);  // Returns &quot;i32&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Get numeric type ID</span></span>
<span class="line"><span>    let id = type_id(x);  // Returns unique ID for i32</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Get type size and alignment</span></span>
<span class="line"><span>    let size = type_size(x);   // Returns 4</span></span>
<span class="line"><span>    let align = type_align(x); // Returns 4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Check type categories</span></span>
<span class="line"><span>    if is_int_type(x) {</span></span>
<span class="line"><span>        (&quot;x is an integer&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if is_float_type(y) {</span></span>
<span class="line"><span>        (&quot;y is a float&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if is_pointer_type(&amp;x) {</span></span>
<span class="line"><span>        (&quot;This is a pointer&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Available Functions</strong>:</p><ul><li><code>typeof&lt;T&gt;(value: T): string</code> - Get type name</li><li><code>type_id&lt;T&gt;(value: T): u64</code> - Get unique type identifier</li><li><code>type_size&lt;T&gt;(value: T): u64</code> - Get type size</li><li><code>type_align&lt;T&gt;(value: T): u64</code> - Get type alignment</li><li><code>is_int_type&lt;T&gt;(value: T): bool</code> - Check if integer type</li><li><code>is_float_type&lt;T&gt;(value: T): bool</code> - Check if floating-point type</li><li><code>is_pointer_type&lt;T&gt;(value: T): bool</code> - Check if pointer type</li></ul><p><strong>Status</strong>: ✅ Fully implemented</p><h3 id="llvm-intrinsics" tabindex="-1">LLVM Intrinsics <a class="header-anchor" href="#llvm-intrinsics" aria-label="Permalink to &quot;LLVM Intrinsics&quot;">​</a></h3><p>Direct access to LLVM&#39;s optimized intrinsic functions:</p><h4 id="bit-manipulation" tabindex="-1">Bit Manipulation <a class="header-anchor" href="#bit-manipulation" aria-label="Permalink to &quot;Bit Manipulation&quot;">​</a></h4><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let x: u32 = 0b00001000;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Count leading zeros</span></span>
<span class="line"><span>    let lz = ctlz(x);  // Returns 28</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Count trailing zeros</span></span>
<span class="line"><span>    let tz = cttz(x);  // Returns 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Count population (number of 1 bits)</span></span>
<span class="line"><span>    let pop = ctpop(x);  // Returns 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Byte swap (reverse byte order)</span></span>
<span class="line"><span>    let swapped = bswap(0x12345678);  // Returns 0x78563412</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Reverse all bits</span></span>
<span class="line"><span>    let reversed = bitreverse(0b00001111);  // Returns 0b11110000...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="overflow-checking" tabindex="-1">Overflow Checking <a class="header-anchor" href="#overflow-checking" aria-label="Permalink to &quot;Overflow Checking&quot;">​</a></h4><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let a: i32 = 2147483647;  // Max i32</span></span>
<span class="line"><span>    let b: i32 = 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Signed addition with overflow detection</span></span>
<span class="line"><span>    let result = sadd_overflow(a, b);</span></span>
<span class="line"><span>    // Returns: {sum: -2147483648, overflow: true}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Signed subtraction with overflow</span></span>
<span class="line"><span>    let result2 = ssub_overflow(a, b);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Signed multiplication with overflow</span></span>
<span class="line"><span>    let result3 = smul_overflow(a, 2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Available Intrinsics</strong>:</p><p><strong>Bit Manipulation</strong>:</p><ul><li><code>ctlz(x: int): int</code> - Count leading zeros</li><li><code>cttz(x: int): int</code> - Count trailing zeros</li><li><code>ctpop(x: int): int</code> - Count population (1 bits)</li><li><code>bswap(x: int): int</code> - Byte swap</li><li><code>bitreverse(x: int): int</code> - Reverse all bits</li></ul><p><strong>Overflow Checking</strong>:</p><ul><li><code>sadd_overflow(a: int, b: int): {int, bool}</code> - Signed add with overflow flag</li><li><code>ssub_overflow(a: int, b: int): {int, bool}</code> - Signed subtract with overflow flag</li><li><code>smul_overflow(a: int, b: int): {int, bool}</code> - Signed multiply with overflow flag</li></ul><p><strong>Status</strong>: ✅ Fully implemented</p><h3 id="compiler-hints" tabindex="-1">Compiler Hints <a class="header-anchor" href="#compiler-hints" aria-label="Permalink to &quot;Compiler Hints&quot;">​</a></h3><p>Optimization hints for the compiler:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let x = 10;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Tell compiler to assume condition is true</span></span>
<span class="line"><span>    assume(x &gt; 0);  // Enables optimizations</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Branch prediction hints</span></span>
<span class="line"><span>    if likely(x &gt; 0) {</span></span>
<span class="line"><span>        // This branch is expected to execute</span></span>
<span class="line"><span>        (&quot;Positive&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if unlikely(x == 0) {</span></span>
<span class="line"><span>        // This branch is rarely executed</span></span>
<span class="line"><span>        (&quot;Zero&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Memory prefetch hint</span></span>
<span class="line"><span>    let data: [i32; 1000] = [...];</span></span>
<span class="line"><span>    prefetch(&amp;data[500], 0, 3, 1);  // Prefetch for reading</span></span>
<span class="line"><span>    // Parameters: addr, rw (0=read, 1=write), locality (0-3), cache_type</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Available Hints</strong>:</p><ul><li><code>assume(condition: bool)</code> - Assert condition is true (undefined if false)</li><li><code>likely(x: bool): bool</code> - Hint that condition is likely true</li><li><code>unlikely(x: bool): bool</code> - Hint that condition is likely false</li><li><code>prefetch(addr: &amp;T, rw: i32, locality: i32, cache_type: i32)</code> - Prefetch memory</li></ul><p><strong>Status</strong>: ✅ Fully implemented</p><h3 id="standard-library-modules" tabindex="-1">Standard Library Modules <a class="header-anchor" href="#standard-library-modules" aria-label="Permalink to &quot;Standard Library Modules&quot;">​</a></h3><p>These modules are implemented as builtin functions and available without imports:</p><h4 id="logger-module" tabindex="-1">Logger Module <a class="header-anchor" href="#logger-module" aria-label="Permalink to &quot;Logger Module&quot;">​</a></h4><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import * as logger from &quot;logger&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    logger.debug(&quot;Debug message&quot;);</span></span>
<span class="line"><span>    logger.info(&quot;Information message&quot;);</span></span>
<span class="line"><span>    logger.warn(&quot;Warning message&quot;);</span></span>
<span class="line"><span>    logger.error(&quot;Error message&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Available Functions</strong>:</p><ul><li><code>logger.debug(msg: string)</code> - Log debug message</li><li><code>logger.info(msg: string)</code> - Log info message</li><li><code>logger.warn(msg: string)</code> - Log warning message</li><li><code>logger.error(msg: string)</code> - Log error message</li></ul><p><strong>Status</strong>: ✅ Fully implemented</p><h4 id="time-module" tabindex="-1">Time Module <a class="header-anchor" href="#time-module" aria-label="Permalink to &quot;Time Module&quot;">​</a></h4><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import * as time from &quot;time&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    // Get current time (seconds since epoch)</span></span>
<span class="line"><span>    let now = time.now();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Get high-resolution time (nanoseconds)</span></span>
<span class="line"><span>    let precise = time.high_res();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Sleep for milliseconds</span></span>
<span class="line"><span>    time.sleep_ms(1000);  // Sleep 1 second</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Available Functions</strong>:</p><ul><li><code>time.now(): i64</code> - Get current Unix timestamp (seconds)</li><li><code>time.high_res(): i64</code> - Get high-resolution time (nanoseconds)</li><li><code>time.sleep_ms(ms: i64)</code> - Sleep for milliseconds</li></ul><p><strong>Status</strong>: ✅ Fully implemented</p><h4 id="testing-module" tabindex="-1">Testing Module <a class="header-anchor" href="#testing-module" aria-label="Permalink to &quot;Testing Module&quot;">​</a></h4><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import * as testing from &quot;testing&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let result = 2 + 2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Basic assertion</span></span>
<span class="line"><span>    testing.(result == 4);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Equality assertion</span></span>
<span class="line"><span>    testing.assert_eq(result, 4);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Inequality assertion</span></span>
<span class="line"><span>    testing.assert_ne(result, 5);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Available Functions</strong>:</p><ul><li><code>testing.(condition: bool)</code> - Assert condition is true</li><li><code>testing.assert_eq&lt;T&gt;(a: T, b: T)</code> - Assert values are equal</li><li><code>testing.assert_ne&lt;T&gt;(a: T, b: T)</code> - Assert values are not equal</li></ul><p><strong>Status</strong>: ✅ Fully implemented</p><hr><h2 id="layer-1-i-o-core" tabindex="-1">Layer 1: I/O Core <a class="header-anchor" href="#layer-1-i-o-core" aria-label="Permalink to &quot;Layer 1: I/O Core&quot;">​</a></h2><h3 id="io" tabindex="-1">io <a class="header-anchor" href="#io" aria-label="Permalink to &quot;io&quot;">​</a></h3><p>Basic input/output operations:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { println, print, readln } from &quot;io&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    (&quot;Hello, World!&quot;);</span></span>
<span class="line"><span>    (&quot;Enter name: &quot;);</span></span>
<span class="line"><span>    let name = readln();</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Functions</strong>:</p><ul><li><code>(s: string)</code> - Print without newline</li><li><code>(s: string)</code> - Print with newline</li><li><code>readln(): string</code> - Read line from stdin</li><li><code>eprint(s: string)</code> - Print to stderr</li><li><code>eprintln(s: string)</code> - Print to stderr with newline</li></ul><p><strong>Status</strong>: ✅ Basic I/O functions implemented and working</p><h3 id="ffi" tabindex="-1">ffi <a class="header-anchor" href="#ffi" aria-label="Permalink to &quot;ffi&quot;">​</a></h3><p>Foreign Function Interface:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import * as ffi from &quot;ffi&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>extern &quot;C&quot; fn printf(format: string, ...): i32;</span></span>
<span class="line"><span>extern &quot;C&quot; fn malloc(size: u64): &amp;u8!;</span></span>
<span class="line"><span>extern &quot;C&quot; fn free(ptr: &amp;u8!);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let ptr = malloc(1024);</span></span>
<span class="line"><span>    free(ptr);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Status</strong>: ✅ Memory operations (alloc, free, realloc) implemented as builtins</p><h3 id="unsafe" tabindex="-1">unsafe <a class="header-anchor" href="#unsafe" aria-label="Permalink to &quot;unsafe&quot;">​</a></h3><p>Unsafe operations:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import * as unsafe_ops from &quot;unsafe&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn raw_pointer_operations() {</span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        let ptr: *const i32 = 0x1000 as *const i32;</span></span>
<span class="line"><span>        let value = *ptr;  // Dereference raw pointer</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Status</strong>: ✅ Unsafe blocks and raw pointers implemented</p><h3 id="hpc" tabindex="-1">hpc <a class="header-anchor" href="#hpc" aria-label="Permalink to &quot;hpc&quot;">​</a></h3><p>High-Performance Computing primitives:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import * as hpc from &quot;hpc&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let vec = hpc.simd.Vector.new([1, 2, 3, 4]);</span></span>
<span class="line"><span>    let doubled = vec.mul(2);  // SIMD multiplication</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Status</strong>: ❌ Planned</p><h3 id="libc" tabindex="-1">libc <a class="header-anchor" href="#libc" aria-label="Permalink to &quot;libc&quot;">​</a></h3><p>libc function bindings:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { printf } from &quot;libc&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    @printf(&quot;Hello from C!\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Status</strong>: ✅ FFI bindings working (extern declarations, raw pointers)</p><hr><h2 id="layer-2-protocol-layer" tabindex="-1">Layer 2: Protocol Layer <a class="header-anchor" href="#layer-2-protocol-layer" aria-label="Permalink to &quot;Layer 2: Protocol Layer&quot;">​</a></h2><h3 id="net" tabindex="-1">net <a class="header-anchor" href="#net" aria-label="Permalink to &quot;net&quot;">​</a></h3><p>Networking primitives:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { TcpStream } from &quot;net/tcp&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let stream = TcpStream.connect(&quot;127.0.0.1:8080&quot;);</span></span>
<span class="line"><span>    stream.write(&quot;GET / HTTP/1.1\\r\\n\\r\\n&quot;);</span></span>
<span class="line"><span>    let response = stream.read();</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Modules</strong>:</p><ul><li><code>&quot;net/tcp&quot;</code> - TCP sockets</li><li><code>&quot;net/udp&quot;</code> - UDP sockets</li><li><code>&quot;net/ip&quot;</code> - IP address handling</li></ul><p><strong>Status</strong>: 🚧 Planned (Layer 2)</p><h3 id="sync" tabindex="-1">sync <a class="header-anchor" href="#sync" aria-label="Permalink to &quot;sync&quot;">​</a></h3><p>Synchronization primitives:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Mutex } from &quot;sync&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let mutex = Mutex.new(0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        let! guard = mutex.lock();</span></span>
<span class="line"><span>        *guard = *guard + 1;</span></span>
<span class="line"><span>    }  // Automatically unlocked</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Primitives</strong>:</p><ul><li><code>Mutex&lt;T&gt;</code> - Mutual exclusion</li><li><code>RwLock&lt;T&gt;</code> - Read-write lock</li><li><code>Semaphore</code> - Counting semaphore</li><li><code>Barrier</code> - Thread barrier</li><li><code>WaitGroup</code> - Go-style wait group</li></ul><p><strong>Status</strong>: 🚧 Planned (Layer 2)</p><h3 id="testing" tabindex="-1">testing <a class="header-anchor" href="#testing" aria-label="Permalink to &quot;testing&quot;">​</a></h3><p>Testing framework:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { assert_eq } from &quot;testing&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>test &quot;addition works&quot; {</span></span>
<span class="line"><span>    let result = add(2, 2);</span></span>
<span class="line"><span>    assert_eq(result, 4);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>test &quot;subtraction works&quot; {</span></span>
<span class="line"><span>    let result = subtract(5, 3);</span></span>
<span class="line"><span>    assert_eq(result, 2);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Assertions</strong>:</p><ul><li><code>(condition)</code> - Basic assertion</li><li><code>assert_eq(a, b)</code> - Equality assertion</li><li><code>assert_ne(a, b)</code> - Inequality assertion</li><li><code>assert_lt(a, b)</code> - Less than</li><li><code>assert_gt(a, b)</code> - Greater than</li></ul><p><strong>Status</strong>: 🚧 Planned (Layer 2)</p><h3 id="datetime" tabindex="-1">datetime <a class="header-anchor" href="#datetime" aria-label="Permalink to &quot;datetime&quot;">​</a></h3><p>Date and time operations:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import * as datetime from &quot;datetime&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let now = datetime.now();</span></span>
<span class="line"><span>    let unix_time = now.unix_timestamp();</span></span>
<span class="line"><span>    let formatted = now.format(&quot;%Y-%m-%d %H:%M:%S&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Status</strong>: 🚧 Planned (Layer 2)</p><hr><h2 id="layer-3-application-layer" tabindex="-1">Layer 3: Application Layer <a class="header-anchor" href="#layer-3-application-layer" aria-label="Permalink to &quot;Layer 3: Application Layer&quot;">​</a></h2><h3 id="net-http" tabindex="-1">net/http <a class="header-anchor" href="#net-http" aria-label="Permalink to &quot;net/http&quot;">​</a></h3><p>HTTP client and server:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { get } from &quot;net/http&quot;;</span></span>
<span class="line"><span>import { println } from &quot;io&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let response = get(&quot;https://api.example.com/data&quot;);</span></span>
<span class="line"><span>    match response {</span></span>
<span class="line"><span>        Response(body) =&gt; {</span></span>
<span class="line"><span>            (body);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        Error(msg) =&gt; {</span></span>
<span class="line"><span>            (msg);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Client API</strong>:</p><ul><li><code>get(url: string): (Response | Error)</code></li><li><code>post(url: string, body: string): (Response | Error)</code></li><li><code>put(url: string, body: string): (Response | Error)</code></li><li><code>delete(url: string): (Response | Error)</code></li></ul><p><strong>Server API</strong> (Future):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let server = http.Server.new();</span></span>
<span class="line"><span>server.route(&quot;/&quot;, handle_root);</span></span>
<span class="line"><span>server.listen(8080);</span></span></code></pre></div><p><strong>Status</strong>: 🚧 Planned (Layer 3)</p><h3 id="json" tabindex="-1">json <a class="header-anchor" href="#json" aria-label="Permalink to &quot;json&quot;">​</a></h3><p>JSON parsing and serialization:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { parse } from &quot;json&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let json_str = &quot;{\\&quot;name\\&quot;: \\&quot;Alice\\&quot;, \\&quot;age\\&quot;: 30}&quot;;</span></span>
<span class="line"><span>    let parsed = parse(json_str);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    match parsed {</span></span>
<span class="line"><span>        Object(obj) =&gt; {</span></span>
<span class="line"><span>            let name = obj.get(&quot;name&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        Error(msg) =&gt; {</span></span>
<span class="line"><span>            (msg);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>API</strong>:</p><ul><li><code>parse(s: string): (Value | Error)</code></li><li><code>stringify(v: Value): string</code></li><li><code>Value</code> enum: Object, Array, String, Number, Bool, Null</li></ul><p><strong>Status</strong>: 🚧 Planned (Layer 3)</p><h3 id="xml" tabindex="-1">xml <a class="header-anchor" href="#xml" aria-label="Permalink to &quot;xml&quot;">​</a></h3><p>XML parsing:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { parse } from &quot;xml&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let xml_str = &quot;&lt;root&gt;&lt;item&gt;value&lt;/item&gt;&lt;/root&gt;&quot;;</span></span>
<span class="line"><span>    let doc = parse(xml_str);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Status</strong>: 🚧 Planned (Layer 3)</p><h3 id="yaml" tabindex="-1">yaml <a class="header-anchor" href="#yaml" aria-label="Permalink to &quot;yaml&quot;">​</a></h3><p>YAML parsing:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { parse } from &quot;yaml&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let yaml_str = &quot;name: Alice\\nage: 30&quot;;</span></span>
<span class="line"><span>    let parsed = parse(yaml_str);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Status</strong>: 🚧 Planned (Layer 3)</p><h3 id="collections" tabindex="-1">collections <a class="header-anchor" href="#collections" aria-label="Permalink to &quot;collections&quot;">​</a></h3><p>Data structures:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { HashMap, Vec } from &quot;collections&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let map = HashMap.new();</span></span>
<span class="line"><span>    map.insert(&quot;key&quot;, &quot;value&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let vec = Vec.new();</span></span>
<span class="line"><span>    vec.(42);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Types</strong>:</p><ul><li><code>Vec&lt;T&gt;</code> - Dynamic array</li><li><code>HashMap&lt;K, V&gt;</code> - Hash map</li><li><code>HashSet&lt;T&gt;</code> - Hash set</li><li><code>LinkedList&lt;T&gt;</code> - Linked list</li><li><code>BTreeMap&lt;K, V&gt;</code> - Ordered map</li><li><code>BTreeSet&lt;T&gt;</code> - Ordered set</li></ul><p><strong>Status</strong>: ❌ Not implemented</p><hr><h2 id="module-reference" tabindex="-1">Module Reference <a class="header-anchor" href="#module-reference" aria-label="Permalink to &quot;Module Reference&quot;">​</a></h2><h3 id="complete-module-tree" tabindex="-1">Complete Module Tree <a class="header-anchor" href="#complete-module-tree" aria-label="Permalink to &quot;Complete Module Tree&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>std/</span></span>
<span class="line"><span>├── io/              ✅ Basic I/O working (Layer 1)</span></span>
<span class="line"><span>│   ├── mod.vx       - print, println, readln</span></span>
<span class="line"><span>│   ├── file.vx      - File I/O (planned)</span></span>
<span class="line"><span>│   └── stream.vx    - Stream operations (planned)</span></span>
<span class="line"><span>├── ffi/             ✅ FFI working (Layer 1)</span></span>
<span class="line"><span>│   └── mod.vx       - extern declarations, raw pointers</span></span>
<span class="line"><span>├── unsafe/          ✅ Implemented (Layer 1)</span></span>
<span class="line"><span>│   └── mod.vx       - Unsafe blocks, raw pointers</span></span>
<span class="line"><span>├── hpc/             🚧 Planned (Layer 1)</span></span>
<span class="line"><span>│   ├── simd.vx      - SIMD operations</span></span>
<span class="line"><span>│   └── gpu.vx       - GPU primitives</span></span>
<span class="line"><span>├── libc/            ✅ Basic bindings (Layer 1)</span></span>
<span class="line"><span>│   └── mod.vx       - libc bindings via @intrinsic</span></span>
<span class="line"><span>├── net/             🚧 Planned (Layer 2)</span></span>
<span class="line"><span>│   ├── mod.vx       - Common types</span></span>
<span class="line"><span>│   ├── tcp.vx       - TCP operations</span></span>
<span class="line"><span>│   ├── udp.vx       - UDP operations</span></span>
<span class="line"><span>│   └── ip.vx        - IP addressing</span></span>
<span class="line"><span>├── sync/            🚧 Planned (Layer 2)</span></span>
<span class="line"><span>│   ├── mod.vx       - Synchronization</span></span>
<span class="line"><span>│   ├── mutex.vx     - Mutex</span></span>
<span class="line"><span>│   ├── rwlock.vx    - RwLock</span></span>
<span class="line"><span>│   └── atomic.vx    - Atomic operations</span></span>
<span class="line"><span>├── testing/         ✅ Basic framework (Layer 2)</span></span>
<span class="line"><span>│   └── mod.vx       - assert functions, testing module</span></span>
<span class="line"><span>├── datetime/        🚧 Planned (Layer 2)</span></span>
<span class="line"><span>│   └── mod.vx       - Date/time operations</span></span>
<span class="line"><span>├── http/            🚧 Planned (Layer 3)</span></span>
<span class="line"><span>│   ├── mod.vx       - HTTP client/server</span></span>
<span class="line"><span>│   ├── client.vx    - Client API</span></span>
<span class="line"><span>│   └── server.vx    - Server API</span></span>
<span class="line"><span>├── json/            🚧 Planned (Layer 3)</span></span>
<span class="line"><span>│   └── mod.vx       - JSON parser</span></span>
<span class="line"><span>├── xml/             🚧 Planned (Layer 3)</span></span>
<span class="line"><span>│   └── mod.vx       - XML parser</span></span>
<span class="line"><span>├── yaml/            🚧 Planned (Layer 3)</span></span>
<span class="line"><span>│   └── mod.vx       - YAML parser</span></span>
<span class="line"><span>└── collections/     ✅ Builtins implemented</span></span>
<span class="line"><span>    ├── Vec&lt;T&gt;       - Dynamic array (builtin)</span></span>
<span class="line"><span>    ├── Map&lt;K,V&gt;     - Hash map (builtin)</span></span>
<span class="line"><span>    ├── Set&lt;T&gt;       - Hash set (builtin)</span></span>
<span class="line"><span>    ├── Box&lt;T&gt;       - Heap allocation (builtin)</span></span>
<span class="line"><span>    └── Channel&lt;T&gt;   - MPSC channel (builtin)</span></span></code></pre></div><h3 id="implementation-status" tabindex="-1">Implementation Status <a class="header-anchor" href="#implementation-status" aria-label="Permalink to &quot;Implementation Status&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Layer</th><th>Modules</th><th>Status</th><th>Completion</th></tr></thead><tbody><tr><td>Layer 3</td><td>http, json, xml, yaml</td><td>🚧 Planned</td><td>0%</td></tr><tr><td>Layer 2</td><td>net, sync, testing, datetime</td><td>🚧 Planned</td><td>5%</td></tr><tr><td>Layer 1</td><td>io, ffi, unsafe, hpc, libc</td><td>✅ Partial</td><td>60%</td></tr><tr><td>Layer 0</td><td>Vex Runtime</td><td>✅ Implemented</td><td>80%</td></tr></tbody></table><p><strong>Overall</strong>: ~45% complete (builtins + I/O + FFI + unsafe working)</p><hr><h2 id="usage-examples" tabindex="-1">Usage Examples <a class="header-anchor" href="#usage-examples" aria-label="Permalink to &quot;Usage Examples&quot;">​</a></h2><h3 id="hello-world" tabindex="-1">Hello World <a class="header-anchor" href="#hello-world" aria-label="Permalink to &quot;Hello World&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { println } from &quot;io&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    (&quot;Hello, World!&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="reading-input" tabindex="-1">Reading Input <a class="header-anchor" href="#reading-input" aria-label="Permalink to &quot;Reading Input&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { println, readln } from &quot;io&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    (&quot;Enter your name:&quot;);</span></span>
<span class="line"><span>    let name = readln();</span></span>
<span class="line"><span>    (&quot;Hello, &quot; + name + &quot;!&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="http-request-future" tabindex="-1">HTTP Request (Future) <a class="header-anchor" href="#http-request-future" aria-label="Permalink to &quot;HTTP Request (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { get } from &quot;net/http&quot;;</span></span>
<span class="line"><span>import { println } from &quot;io&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let response = get(&quot;https://api.example.com/data&quot;);</span></span>
<span class="line"><span>    match response {</span></span>
<span class="line"><span>        Response(body) =&gt; {</span></span>
<span class="line"><span>            (body);</span></span>
<span class="line"><span>            return 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        Error(msg) =&gt; {</span></span>
<span class="line"><span>            (&quot;Error: &quot; + msg);</span></span>
<span class="line"><span>            return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="json-parsing-future" tabindex="-1">JSON Parsing (Future) <a class="header-anchor" href="#json-parsing-future" aria-label="Permalink to &quot;JSON Parsing (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { parse } from &quot;json&quot;;</span></span>
<span class="line"><span>import { println } from &quot;io&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let json_str = &quot;{\\&quot;name\\&quot;: \\&quot;Alice\\&quot;, \\&quot;age\\&quot;: 30}&quot;;</span></span>
<span class="line"><span>    let parsed = parse(json_str);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    match parsed {</span></span>
<span class="line"><span>        Object(obj) =&gt; {</span></span>
<span class="line"><span>            (&quot;Name: &quot; + obj.get(&quot;name&quot;));</span></span>
<span class="line"><span>            return 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        Error(msg) =&gt; {</span></span>
<span class="line"><span>            (&quot;Parse error: &quot; + msg);</span></span>
<span class="line"><span>            return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="concurrency-future" tabindex="-1">Concurrency (Future) <a class="header-anchor" href="#concurrency-future" aria-label="Permalink to &quot;Concurrency (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { WaitGroup } from &quot;sync&quot;;</span></span>
<span class="line"><span>import { println } from &quot;io&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn worker(id: i32, wg: &amp;WaitGroup!) {</span></span>
<span class="line"><span>    defer wg.done();</span></span>
<span class="line"><span>    (&quot;Worker &quot; + id + &quot; starting&quot;);</span></span>
<span class="line"><span>    // Do work</span></span>
<span class="line"><span>    (&quot;Worker &quot; + id + &quot; done&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let wg = WaitGroup.new();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for i in 0..5 {</span></span>
<span class="line"><span>        wg.add(1);</span></span>
<span class="line"><span>        go worker(i, &amp;wg);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    wg.wait();</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="development-roadmap" tabindex="-1">Development Roadmap <a class="header-anchor" href="#development-roadmap" aria-label="Permalink to &quot;Development Roadmap&quot;">​</a></h2><h3 id="phase-1-layer-1-completion-high-priority-🔴" tabindex="-1">Phase 1: Layer 1 Completion (High Priority 🔴) <a class="header-anchor" href="#phase-1-layer-1-completion-high-priority-🔴" aria-label="Permalink to &quot;Phase 1: Layer 1 Completion (High Priority 🔴)&quot;">​</a></h3><p><strong>Duration</strong>: 2-3 months</p><p><strong>Tasks</strong>:</p><ol><li>Complete <code>&quot;io&quot;</code> module <ul><li>File I/O operations</li><li>Buffered I/O</li><li>Stream abstraction</li></ul></li><li>Implement <code>&quot;ffi&quot;</code> module <ul><li>FFI declarations</li><li>C interop</li><li>Type conversions</li></ul></li><li>Basic <code>&quot;libc&quot;</code> bindings <ul><li>Core functions</li><li>String operations</li><li>Memory operations</li></ul></li></ol><h3 id="phase-2-layer-2-protocols-high-priority-🔴" tabindex="-1">Phase 2: Layer 2 Protocols (High Priority 🔴) <a class="header-anchor" href="#phase-2-layer-2-protocols-high-priority-🔴" aria-label="Permalink to &quot;Phase 2: Layer 2 Protocols (High Priority 🔴)&quot;">​</a></h3><p><strong>Duration</strong>: 3-4 months</p><p><strong>Tasks</strong>:</p><ol><li><code>&quot;net&quot;</code> module family <ul><li><code>&quot;net/tcp&quot;</code> - TCP sockets</li><li><code>&quot;net/udp&quot;</code> - UDP sockets</li><li><code>&quot;net/ip&quot;</code> - IP addressing</li></ul></li><li><code>&quot;sync&quot;</code> primitives <ul><li>Mutex, RwLock</li><li>Atomic operations</li><li>WaitGroup</li></ul></li><li><code>&quot;testing&quot;</code> framework <ul><li>Test runner</li><li>Assertions</li><li>Benchmarks</li></ul></li></ol><h3 id="phase-3-layer-3-applications-medium-priority-🟡" tabindex="-1">Phase 3: Layer 3 Applications (Medium Priority 🟡) <a class="header-anchor" href="#phase-3-layer-3-applications-medium-priority-🟡" aria-label="Permalink to &quot;Phase 3: Layer 3 Applications (Medium Priority 🟡)&quot;">​</a></h3><p><strong>Duration</strong>: 4-6 months</p><p><strong>Tasks</strong>:</p><ol><li><code>&quot;net/http&quot;</code> module <ul><li>HTTP client</li><li>HTTP server</li><li>WebSocket support</li></ul></li><li>Data formats <ul><li><code>&quot;json&quot;</code> parser</li><li><code>&quot;xml&quot;</code> parser</li><li><code>&quot;yaml&quot;</code> parser</li></ul></li><li><code>&quot;collections&quot;</code> module <ul><li>Vec, HashMap, HashSet</li><li>Iterators</li><li>Algorithms</li></ul></li></ol><h3 id="phase-4-advanced-features-low-priority-🟢" tabindex="-1">Phase 4: Advanced Features (Low Priority 🟢) <a class="header-anchor" href="#phase-4-advanced-features-low-priority-🟢" aria-label="Permalink to &quot;Phase 4: Advanced Features (Low Priority 🟢)&quot;">​</a></h3><p><strong>Duration</strong>: Ongoing</p><p><strong>Tasks</strong>:</p><ol><li><code>&quot;hpc&quot;</code> for SIMD/GPU</li><li><code>&quot;crypto&quot;</code> for cryptography</li><li><code>&quot;database&quot;</code> for SQL</li><li>Third-party ecosystem</li></ol><hr><h2 id="contributing" tabindex="-1">Contributing <a class="header-anchor" href="#contributing" aria-label="Permalink to &quot;Contributing&quot;">​</a></h2><p>Standard library is open for contributions. See:</p><ul><li><code>vex-libs/std/README.md</code> for architecture details</li><li><code>STD_INTEGRATION_STATUS.md</code> for current status</li><li><code>STD_PACKAGE_REORGANIZATION.md</code> for reorganization plan</li></ul><hr><p><strong>Previous</strong>: <a href="./14_Modules_and_Imports">14_Modules_and_Imports.md</a><br><strong>Back to</strong>: <a href="./01_Introduction_and_Overview">01_Introduction_and_Overview.md</a></p><p><strong>Maintained by</strong>: Vex Language Team<br><strong>Location</strong>: <code>vex-libs/std/</code></p>`,196)])])}const g=n(l,[["render",i]]);export{h as __pageData,g as default};
