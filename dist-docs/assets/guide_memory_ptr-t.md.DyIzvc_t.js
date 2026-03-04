import{_ as s,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Ptr<T> — Typed Generic Pointer","description":"","frontmatter":{},"headers":[],"relativePath":"guide/memory/ptr-t.md","filePath":"guide/memory/ptr-t.md"}'),p={name:"guide/memory/ptr-t.md"};function l(i,a,o,r,c,d){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="ptr-t-—-typed-generic-pointer" tabindex="-1">Ptr&lt;T&gt; — Typed Generic Pointer <a class="header-anchor" href="#ptr-t-—-typed-generic-pointer" aria-label="Permalink to &quot;Ptr\\&lt;T\\&gt; — Typed Generic Pointer&quot;">​</a></h1><p><code>Ptr&lt;T&gt;</code> is Vex&#39;s modern, type-safe pointer wrapper. It replaces the pattern of raw <code>*T</code> pointers with <code>as</code> cast chains, providing a clean method-based API with zero runtime overhead.</p><div class="tip custom-block"><p class="custom-block-title">Prelude Type</p><p><code>Ptr&lt;T&gt;</code> is a <strong>prelude type</strong> — available in all Vex programs without any <code>import</code>. Just use it directly.</p></div><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main() {</span></span>
<span class="line"><span>    // Allocate 10 integers</span></span>
<span class="line"><span>    let! p = Ptr.allocN&lt;i32&gt;(10);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Write at specific indices</span></span>
<span class="line"><span>    p.writeAt(0, 100);</span></span>
<span class="line"><span>    p.writeAt(1, 200);</span></span>
<span class="line"><span>    p.writeAt(2, 300);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Read</span></span>
<span class="line"><span>    let val = p.readAt(1);    // 200</span></span>
<span class="line"><span>    $println(&quot;Value: {}&quot;, val);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Done</span></span>
<span class="line"><span>    p.free();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Compare with the old C-style approach:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Old way — unsafe, casts everywhere</span></span>
<span class="line"><span>let raw = alloc(40) as *i32!;</span></span>
<span class="line"><span>unsafe { *raw = 100; *(raw + 1) = 200; *(raw + 2) = 300; }</span></span>
<span class="line"><span>let val = unsafe { *(raw + 1) };</span></span>
<span class="line"><span>free(raw as *void);</span></span></code></pre></div><h2 id="struct-definition" tabindex="-1">Struct Definition <a class="header-anchor" href="#struct-definition" aria-label="Permalink to &quot;Struct Definition&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Ptr&lt;T&gt; {</span></span>
<span class="line"><span>    raw: *T</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>Ptr&lt;T&gt;</code> is a single-field struct wrapping a raw pointer. After optimization, it has exactly the same memory layout and performance as <code>*T</code>.</p><h2 id="creating-pointers" tabindex="-1">Creating Pointers <a class="header-anchor" href="#creating-pointers" aria-label="Permalink to &quot;Creating Pointers&quot;">​</a></h2><h3 id="from-allocation" tabindex="-1">From Allocation <a class="header-anchor" href="#from-allocation" aria-label="Permalink to &quot;From Allocation&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Allocate a single element (uninitialized)</span></span>
<span class="line"><span>let! p = Ptr.alloc&lt;i32&gt;();</span></span>
<span class="line"><span>p.write(42);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Allocate and initialize with a value</span></span>
<span class="line"><span>let! p = Ptr.allocWith&lt;i64&gt;(9999);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Allocate N contiguous elements</span></span>
<span class="line"><span>let! arr = Ptr.allocN&lt;f64&gt;(1000);</span></span></code></pre></div><h3 id="from-raw-pointers" tabindex="-1">From Raw Pointers <a class="header-anchor" href="#from-raw-pointers" aria-label="Permalink to &quot;From Raw Pointers&quot;">​</a></h3><p>Interop with existing raw pointer code:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x = 42;</span></span>
<span class="line"><span>let raw: *i32 = &amp;x;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Raw → Ptr</span></span>
<span class="line"><span>let p = Ptr.of&lt;i32&gt;(raw);</span></span>
<span class="line"><span>let val = p.read();     // 42</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Ptr → Raw (for FFI, legacy code)</span></span>
<span class="line"><span>let back: *i32 = p.asRaw();</span></span></code></pre></div><h3 id="special-values" tabindex="-1">Special Values <a class="header-anchor" href="#special-values" aria-label="Permalink to &quot;Special Values&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let null = Ptr.null&lt;i32&gt;();         // null pointer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>null.isNull();   // true</span></span>
<span class="line"><span>null.isValid();  // false</span></span></code></pre></div><h2 id="reading-and-writing" tabindex="-1">Reading and Writing <a class="header-anchor" href="#reading-and-writing" aria-label="Permalink to &quot;Reading and Writing&quot;">​</a></h2><h3 id="single-element" tabindex="-1">Single Element <a class="header-anchor" href="#single-element" aria-label="Permalink to &quot;Single Element&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! p = Ptr.alloc&lt;i32&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Write</span></span>
<span class="line"><span>p.write(42);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Read</span></span>
<span class="line"><span>let val = p.read();     // 42</span></span></code></pre></div><h3 id="indexed-access" tabindex="-1">Indexed Access <a class="header-anchor" href="#indexed-access" aria-label="Permalink to &quot;Indexed Access&quot;">​</a></h3><p>For arrays allocated with <code>allocN</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! arr = Ptr.allocN&lt;i32&gt;(5);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Write at index</span></span>
<span class="line"><span>arr.writeAt(0, 10);</span></span>
<span class="line"><span>arr.writeAt(1, 20);</span></span>
<span class="line"><span>arr.writeAt(2, 30);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Read at index</span></span>
<span class="line"><span>let v = arr.readAt(1);  // 20</span></span></code></pre></div><h2 id="pointer-arithmetic" tabindex="-1">Pointer Arithmetic <a class="header-anchor" href="#pointer-arithmetic" aria-label="Permalink to &quot;Pointer Arithmetic&quot;">​</a></h2><p>All arithmetic is <strong>element-level</strong> — <code>p.add(3)</code> advances by 3 elements (not 3 bytes):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! p = Ptr.allocN&lt;i32&gt;(10);</span></span>
<span class="line"><span>p.writeAt(0, 100);</span></span>
<span class="line"><span>p.writeAt(5, 500);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let p5 = p.add(5);       // p + 5*sizeof(i32)</span></span>
<span class="line"><span>let val = p5.read();      // 500</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Signed offset (can go backward)</span></span>
<span class="line"><span>let back = p5.offset(-2); // p + 3 elements</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Subtract</span></span>
<span class="line"><span>let p3 = p5.sub(2);       // same as offset(-2)</span></span></code></pre></div><h3 id="distance-between-pointers" tabindex="-1">Distance Between Pointers <a class="header-anchor" href="#distance-between-pointers" aria-label="Permalink to &quot;Distance Between Pointers&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! start = Ptr.allocN&lt;i32&gt;(100);</span></span>
<span class="line"><span>let p50 = start.add(50);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let dist = start.distanceTo(&amp;p50);   // 50 (elements, not bytes)</span></span></code></pre></div><h2 id="type-casting" tabindex="-1">Type Casting <a class="header-anchor" href="#type-casting" aria-label="Permalink to &quot;Type Casting&quot;">​</a></h2><p>Cast between pointer types via <code>asOpaque()</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! ip = Ptr.alloc&lt;i64&gt;();</span></span>
<span class="line"><span>ip.write(0x41424344);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Cast to Ptr&lt;u8&gt; via opaque pointer</span></span>
<span class="line"><span>let bp = Ptr.of&lt;u8&gt;(ip.asOpaque() as *u8);</span></span>
<span class="line"><span>let firstByte = bp.read();  // 0x44 (little-endian)</span></span></code></pre></div><h2 id="bulk-operations" tabindex="-1">Bulk Operations <a class="header-anchor" href="#bulk-operations" aria-label="Permalink to &quot;Bulk Operations&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! src = Ptr.allocN&lt;i32&gt;(3);</span></span>
<span class="line"><span>src.writeAt(0, 100);</span></span>
<span class="line"><span>src.writeAt(1, 200);</span></span>
<span class="line"><span>src.writeAt(2, 300);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let! dst = Ptr.allocN&lt;i32&gt;(3);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Copy N elements from src to dst (two directions)</span></span>
<span class="line"><span>dst.copyFrom(&amp;src, 3);   // dst ← src</span></span>
<span class="line"><span>src.copyTo(&amp;dst, 3);     // src → dst (same result)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Compare two memory blocks (byte-level, like memcmp)</span></span>
<span class="line"><span>let cmp = src.compare(&amp;dst, 3);   // 0 = equal</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Fill bytes (like memset) — e.g., zero-initialize 12 bytes</span></span>
<span class="line"><span>dst.writeBytes(0, 12);   // fills 12 bytes with 0x00</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Swap values at two pointer locations</span></span>
<span class="line"><span>let! a = Ptr.allocWith&lt;i32&gt;(111);</span></span>
<span class="line"><span>let! b = Ptr.allocWith&lt;i32&gt;(222);</span></span>
<span class="line"><span>a.swap(&amp;b);</span></span>
<span class="line"><span>// a.read() == 222, b.read() == 111</span></span></code></pre></div><h2 id="reference-conversion" tabindex="-1">Reference Conversion <a class="header-anchor" href="#reference-conversion" aria-label="Permalink to &quot;Reference Conversion&quot;">​</a></h2><p>Convert a <code>Ptr&lt;T&gt;</code> into Vex&#39;s reference system:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! x: i32 = 42;</span></span>
<span class="line"><span>let p = Ptr.of&lt;i32&gt;(&amp;x as *i32);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Immutable reference</span></span>
<span class="line"><span>let r: &amp;i32 = p.asRef();</span></span>
<span class="line"><span>$println(*r);    // 42</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mutable reference</span></span>
<span class="line"><span>let mr: &amp;i32! = p.asMut();</span></span>
<span class="line"><span>*mr = 100;</span><span>       // x is now 100</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><code>asRef()</code> and <code>asMut()</code> require the pointer to be valid and non-null. Using them on a null or freed pointer is undefined behavior.</p></div><h2 id="alignment-check" tabindex="-1">Alignment Check <a class="header-anchor" href="#alignment-check" aria-label="Permalink to &quot;Alignment Check&quot;">​</a></h2><p>Required for SIMD operations and specialized allocators:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! p = Ptr.allocN&lt;i32&gt;(64);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if p.isAligned(16) {</span></span>
<span class="line"><span>    // Safe for SSE/NEON operations</span></span>
<span class="line"><span>    $println(&quot;16-byte aligned&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if p.isAligned(32) {</span></span>
<span class="line"><span>    // Safe for AVX operations</span></span>
<span class="line"><span>    $println(&quot;32-byte aligned&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="memory-management" tabindex="-1">Memory Management <a class="header-anchor" href="#memory-management" aria-label="Permalink to &quot;Memory Management&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! p = Ptr.alloc&lt;i32&gt;();</span></span>
<span class="line"><span>p.write(42);</span></span>
<span class="line"><span>p.free();    // deallocates and sets to null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// After free:</span></span>
<span class="line"><span>p.isNull();  // true</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><code>free()</code> deallocates the <strong>entire allocation</strong>, not just one element. Call it on the pointer returned by <code>alloc()</code> / <code>allocN()</code>, not on an offset pointer.</p></div><h2 id="ffi-interop" tabindex="-1">FFI Interop <a class="header-anchor" href="#ffi-interop" aria-label="Permalink to &quot;FFI Interop&quot;">​</a></h2><p><code>Ptr&lt;T&gt;</code> works seamlessly with C FFI:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>extern &quot;C&quot; {</span></span>
<span class="line"><span>    fn fread(buf: ptr, size: u64, count: u64, stream: ptr): u64;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn readBytes(stream: ptr, count: usize): Ptr&lt;u8&gt; {</span></span>
<span class="line"><span>    let! buf = Ptr.allocN&lt;u8&gt;(count);</span></span>
<span class="line"><span>    fread(buf.asOpaque(), 1, count as u64, stream);</span></span>
<span class="line"><span>    return buf;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="method-reference" tabindex="-1">Method Reference <a class="header-anchor" href="#method-reference" aria-label="Permalink to &quot;Method Reference&quot;">​</a></h2><h3 id="constructors" tabindex="-1">Constructors <a class="header-anchor" href="#constructors" aria-label="Permalink to &quot;Constructors&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>Ptr.null&lt;T&gt;()</code></td><td>Null pointer</td></tr><tr><td><code>Ptr.of&lt;T&gt;(p)</code></td><td>Wrap raw <code>*T</code> pointer</td></tr><tr><td><code>Ptr.alloc&lt;T&gt;()</code></td><td>Allocate single element</td></tr><tr><td><code>Ptr.allocWith&lt;T&gt;(val)</code></td><td>Allocate + initialize</td></tr><tr><td><code>Ptr.allocN&lt;T&gt;(n)</code></td><td>Allocate N elements</td></tr></tbody></table><h3 id="core-operations" tabindex="-1">Core Operations <a class="header-anchor" href="#core-operations" aria-label="Permalink to &quot;Core Operations&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>.read()</code></td><td>Read value at pointer</td></tr><tr><td><code>.write(val)</code></td><td>Write value at pointer</td></tr><tr><td><code>.readAt(idx)</code></td><td>Read at element index</td></tr><tr><td><code>.writeAt(idx, val)</code></td><td>Write at element index</td></tr></tbody></table><h3 id="arithmetic" tabindex="-1">Arithmetic <a class="header-anchor" href="#arithmetic" aria-label="Permalink to &quot;Arithmetic&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>.add(n)</code></td><td>Forward N elements</td></tr><tr><td><code>.sub(n)</code></td><td>Backward N elements</td></tr><tr><td><code>.offset(n)</code></td><td>Signed element offset</td></tr><tr><td><code>.distanceTo(&amp;other)</code></td><td>Element distance</td></tr></tbody></table><h3 id="conversion-checks" tabindex="-1">Conversion &amp; Checks <a class="header-anchor" href="#conversion-checks" aria-label="Permalink to &quot;Conversion &amp; Checks&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>.asRaw()</code></td><td>Get underlying <code>*T</code></td></tr><tr><td><code>.asOpaque()</code></td><td>Get as <code>ptr</code> (for FFI)</td></tr><tr><td><code>.addr()</code></td><td>Get address as <code>i64</code></td></tr><tr><td><code>.isNull()</code></td><td>Check if null</td></tr><tr><td><code>.isValid()</code></td><td>Check if non-null</td></tr><tr><td><code>.asRef()</code></td><td>Convert to immutable reference <code>&amp;T</code></td></tr><tr><td><code>.asMut()</code></td><td>Convert to mutable reference <code>&amp;T!</code></td></tr><tr><td><code>.isAligned(n)</code></td><td>Check n-byte alignment</td></tr></tbody></table><h3 id="memory" tabindex="-1">Memory <a class="header-anchor" href="#memory" aria-label="Permalink to &quot;Memory&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>.copyFrom(&amp;src, n)</code></td><td>Copy N elements from src</td></tr><tr><td><code>.copyTo(&amp;dest, n)</code></td><td>Copy N elements to dest</td></tr><tr><td><code>.compare(&amp;other, n)</code></td><td>Compare N elements (memcmp)</td></tr><tr><td><code>.writeBytes(val, n)</code></td><td>Fill n bytes with val (memset)</td></tr><tr><td><code>.swap(&amp;other)</code></td><td>Swap values at two locations</td></tr><tr><td><code>.free()</code></td><td>Deallocate and null-out</td></tr></tbody></table><h2 id="see-also" tabindex="-1">See Also <a class="header-anchor" href="#see-also" aria-label="Permalink to &quot;See Also&quot;">​</a></h2><ul><li><a href="./rawbuf">RawBuf</a> — Zero-cost byte-level memory accessor</li><li><a href="./span-t">Span&lt;T&gt;</a> — Bounds-checked fat pointer built on Ptr&lt;T&gt;</li><li><a href="/docs/guide/advanced/pointers">Raw Pointers</a> — Legacy raw <code>*T</code> documentation</li><li><a href="./vumm">VUMM</a> — Automatic ownership with <code>Box&lt;T&gt;</code></li></ul>`,60)])])}const m=s(p,[["render",l]]);export{u as __pageData,m as default};
