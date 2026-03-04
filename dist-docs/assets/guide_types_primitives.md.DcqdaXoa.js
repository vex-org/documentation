import{_ as s,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Primitive Types","description":"","frontmatter":{},"headers":[],"relativePath":"guide/types/primitives.md","filePath":"guide/types/primitives.md"}'),p={name:"guide/types/primitives.md"};function i(l,a,o,c,r,d){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="primitive-types" tabindex="-1">Primitive Types <a class="header-anchor" href="#primitive-types" aria-label="Permalink to &quot;Primitive Types&quot;">​</a></h1><p>Vex provides a comprehensive set of primitive types for numeric, boolean, and character data.</p><h2 id="integer-types" tabindex="-1">Integer Types <a class="header-anchor" href="#integer-types" aria-label="Permalink to &quot;Integer Types&quot;">​</a></h2><h3 id="signed-integers" tabindex="-1">Signed Integers <a class="header-anchor" href="#signed-integers" aria-label="Permalink to &quot;Signed Integers&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Type</th><th>Size</th><th>Range</th></tr></thead><tbody><tr><td><code>i8</code></td><td>8 bits</td><td>-128 to 127</td></tr><tr><td><code>i16</code></td><td>16 bits</td><td>-32,768 to 32,767</td></tr><tr><td><code>i32</code></td><td>32 bits</td><td>-2³¹ to 2³¹-1</td></tr><tr><td><code>i64</code></td><td>64 bits</td><td>-2⁶³ to 2⁶³-1</td></tr><tr><td><code>i128</code></td><td>128 bits</td><td>-2¹²⁷ to 2¹²⁷-1</td></tr></tbody></table><h3 id="unsigned-integers" tabindex="-1">Unsigned Integers <a class="header-anchor" href="#unsigned-integers" aria-label="Permalink to &quot;Unsigned Integers&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Type</th><th>Size</th><th>Range</th></tr></thead><tbody><tr><td><code>u8</code></td><td>8 bits</td><td>0 to 255</td></tr><tr><td><code>u16</code></td><td>16 bits</td><td>0 to 65,535</td></tr><tr><td><code>u32</code></td><td>32 bits</td><td>0 to 2³²-1</td></tr><tr><td><code>u64</code></td><td>64 bits</td><td>0 to 2⁶⁴-1</td></tr><tr><td><code>u128</code></td><td>128 bits</td><td>0 to 2¹²⁸-1</td></tr></tbody></table><h3 id="platform-dependent-types" tabindex="-1">Platform-Dependent Types <a class="header-anchor" href="#platform-dependent-types" aria-label="Permalink to &quot;Platform-Dependent Types&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Type</th><th>Size</th><th>Description</th></tr></thead><tbody><tr><td><code>isize</code></td><td>Platform</td><td>Pointer-sized signed integer</td></tr><tr><td><code>usize</code></td><td>Platform</td><td>Pointer-sized unsigned integer</td></tr></tbody></table><h3 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Default integer type is i32</span></span>
<span class="line"><span>let x = 42         // i32</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Explicit type suffix</span></span>
<span class="line"><span>let a = 42i8       // i8</span></span>
<span class="line"><span>let b = 42u64      // u64</span></span>
<span class="line"><span>let c = 1000i128   // i128</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Explicit type annotation</span></span>
<span class="line"><span>let d: u16 = 1000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Numeric separators for readability</span></span>
<span class="line"><span>let million = 1_000_000</span></span>
<span class="line"><span>let bytes = 0xFF_FF_FF_FF</span></span>
<span class="line"><span>let binary = 0b1111_0000_1111_0000</span></span></code></pre></div><h3 id="literals-in-different-bases" tabindex="-1">Literals in Different Bases <a class="header-anchor" href="#literals-in-different-bases" aria-label="Permalink to &quot;Literals in Different Bases&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let decimal = 255</span></span>
<span class="line"><span>let hex = 0xFF        // Hexadecimal</span></span>
<span class="line"><span>let octal = 0o377     // Octal</span></span>
<span class="line"><span>let binary = 0b11111111  // Binary</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With type suffix</span></span>
<span class="line"><span>let hex_byte = 0xFFu8</span></span>
<span class="line"><span>let binary_word = 0b1010_1010u16</span></span></code></pre></div><h2 id="floating-point-types" tabindex="-1">Floating-Point Types <a class="header-anchor" href="#floating-point-types" aria-label="Permalink to &quot;Floating-Point Types&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Type</th><th>Size</th><th>Precision</th><th>Range</th></tr></thead><tbody><tr><td><code>f16</code></td><td>16 bits</td><td>~3 digits</td><td>±65,504</td></tr><tr><td><code>f32</code></td><td>32 bits</td><td>~7 digits</td><td>±3.4×10³⁸</td></tr><tr><td><code>f64</code></td><td>64 bits</td><td>~15 digits</td><td>±1.8×10³⁰⁸</td></tr></tbody></table><h3 id="usage-1" tabindex="-1">Usage <a class="header-anchor" href="#usage-1" aria-label="Permalink to &quot;Usage&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Default float type is f64</span></span>
<span class="line"><span>let pi = 3.14159       // f64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Scientific notation</span></span>
<span class="line"><span>let avogadro = 6.022e23</span></span>
<span class="line"><span>let planck = 6.626e-34</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Explicit type suffix</span></span>
<span class="line"><span>let half = 0.5f32      // f32</span></span>
<span class="line"><span>let precise = 3.14159265358979f64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Special values</span></span>
<span class="line"><span>let infinity = f64.INFINITY</span></span>
<span class="line"><span>let neg_infinity = f64.NEG_INFINITY</span></span>
<span class="line"><span>let nan = f64.NAN</span></span></code></pre></div><h3 id="f16-half-precision" tabindex="-1">f16 (Half Precision) <a class="header-anchor" href="#f16-half-precision" aria-label="Permalink to &quot;f16 (Half Precision)&quot;">​</a></h3><p>Useful for GPU operations and ML:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let weights: [f16; 1024] = load_model_weights()</span></span>
<span class="line"><span>let result = neural_network.forward(weights)</span></span></code></pre></div><h2 id="boolean-type" tabindex="-1">Boolean Type <a class="header-anchor" href="#boolean-type" aria-label="Permalink to &quot;Boolean Type&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let yes: bool = true</span></span>
<span class="line"><span>let no: bool = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Boolean operations</span></span>
<span class="line"><span>let and_result = true &amp;&amp; false   // false</span></span>
<span class="line"><span>let or_result = true || false    // true</span></span>
<span class="line"><span>let not_result = !true           // false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Comparison results</span></span>
<span class="line"><span>let is_equal = (5 == 5)          // true</span></span>
<span class="line"><span>let is_greater = (10 &gt; 5)        // true</span></span></code></pre></div><h2 id="character-type" tabindex="-1">Character Type <a class="header-anchor" href="#character-type" aria-label="Permalink to &quot;Character Type&quot;">​</a></h2><p>The <code>char</code> type represents a Unicode scalar value (4 bytes):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let letter: char = &#39;A&#39;</span></span>
<span class="line"><span>let emoji: char = &#39;🚀&#39;</span></span>
<span class="line"><span>let chinese: char = &#39;中&#39;</span></span>
<span class="line"><span>let escape: char = &#39;\\n&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Unicode escapes</span></span>
<span class="line"><span>let heart: char = &#39;\\u{2764}&#39;     // ❤</span></span>
<span class="line"><span>let smiley: char = &#39;\\u{1F600}&#39;   // 😀</span></span></code></pre></div><h3 id="character-methods" tabindex="-1">Character Methods <a class="header-anchor" href="#character-methods" aria-label="Permalink to &quot;Character Methods&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let c = &#39;A&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>c.is_alphabetic()    // true</span></span>
<span class="line"><span>c.is_numeric()       // false</span></span>
<span class="line"><span>c.is_alphanumeric()  // true</span></span>
<span class="line"><span>c.is_whitespace()    // false</span></span>
<span class="line"><span>c.is_uppercase()     // true</span></span>
<span class="line"><span>c.is_lowercase()     // false</span></span>
<span class="line"><span>c.to_lowercase()     // &#39;a&#39;</span></span>
<span class="line"><span>c.to_uppercase()     // &#39;A&#39;</span></span></code></pre></div><h2 id="string-and-str" tabindex="-1">String and str <a class="header-anchor" href="#string-and-str" aria-label="Permalink to &quot;String and str&quot;">​</a></h2><p>Vex provides two string types for different use cases:</p><ul><li><code>String</code>: An owned, growable, heap-allocated string (Omni-string).</li><li><code>str</code>: A borrowed, non-owning string view (literal/view).</li></ul><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let s: str = &quot;Hello&quot;           // str literal</span></span>
<span class="line"><span>let owned: String = s.to_string() // owned copy</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">Omni-String System</p><p>Vex&#39;s string system is highly optimized. <code>String</code> uses Small String Optimization (SSO) for short text and VUMM for zero-copy sharing of long text. See <a href="./../types/strings">Strings</a> for details.</p></div><h2 id="complex-t" tabindex="-1">Complex&lt;T&gt; <a class="header-anchor" href="#complex-t" aria-label="Permalink to &quot;Complex\\&lt;T\\&gt;&quot;">​</a></h2><p>The prelude provides <code>Complex&lt;T&gt;</code> for complex number arithmetic.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let c1 = Complex { real: 1.0, imag: 2.0 }</span></span>
<span class="line"><span>let c2 = Complex { real: 3.0, imag: 4.0 }</span></span>
<span class="line"><span>let sum = c1 + c2</span></span></code></pre></div><h2 id="unit-type" tabindex="-1">Unit Type <a class="header-anchor" href="#unit-type" aria-label="Permalink to &quot;Unit Type&quot;">​</a></h2><p>The empty tuple <code>()</code>, used for functions that don&#39;t return a value:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn do_something(): () {</span></span>
<span class="line"><span>    println(&quot;Done&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Usually omitted</span></span>
<span class="line"><span>fn do_something() {</span></span>
<span class="line"><span>    println(&quot;Done&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="never-type" tabindex="-1">Never Type <a class="header-anchor" href="#never-type" aria-label="Permalink to &quot;Never Type&quot;">​</a></h2><p>The <code>never</code> type represents computations that never complete:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn infinite_loop(): never {</span></span>
<span class="line"><span>    loop {}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn panic_always(): never {</span></span>
<span class="line"><span>    panic(&quot;This always panics&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Useful in match arms</span></span>
<span class="line"><span>let value: i32 = match result {</span></span>
<span class="line"><span>    Ok(x) =&gt; x,</span></span>
<span class="line"><span>    Err(e) =&gt; panic(e)  // Returns never, coerces to i32</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="type-conversions" tabindex="-1">Type Conversions <a class="header-anchor" href="#type-conversions" aria-label="Permalink to &quot;Type Conversions&quot;">​</a></h2><h3 id="explicit-casting" tabindex="-1">Explicit Casting <a class="header-anchor" href="#explicit-casting" aria-label="Permalink to &quot;Explicit Casting&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x: i32 = 42</span></span>
<span class="line"><span>let y: i64 = x as i64      // Widening (safe)</span></span>
<span class="line"><span>let z: i16 = x as i16      // Narrowing (may truncate)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let f: f64 = 3.14</span></span>
<span class="line"><span>let i: i32 = f as i32      // Truncates to 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let c: char = &#39;A&#39;</span></span>
<span class="line"><span>let n: u32 = c as u32      // 65</span></span></code></pre></div><h3 id="safe-conversions" tabindex="-1">Safe Conversions <a class="header-anchor" href="#safe-conversions" aria-label="Permalink to &quot;Safe Conversions&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Using From/Into contracts</span></span>
<span class="line"><span>let x: i32 = 42</span></span>
<span class="line"><span>let y: i64 = i64.from(x)   // Guaranteed safe</span></span>
<span class="line"><span>let z: i64 = x.into()      // Same thing</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TryFrom for fallible conversions</span></span>
<span class="line"><span>let big: i64 = 1_000_000</span></span>
<span class="line"><span>let small: Result&lt;i16, _&gt; = i16.try_from(big)  // Err (overflow)</span></span></code></pre></div><h2 id="type-ranges-and-constants" tabindex="-1">Type Ranges and Constants <a class="header-anchor" href="#type-ranges-and-constants" aria-label="Permalink to &quot;Type Ranges and Constants&quot;">​</a></h2><p>Each numeric type has associated constants:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>i32.MIN        // -2147483648</span></span>
<span class="line"><span>i32.MAX        // 2147483647</span></span>
<span class="line"><span>i32.BITS       // 32</span></span>
<span class="line"><span></span></span>
<span class="line"><span>u64.MIN        // 0</span></span>
<span class="line"><span>u64.MAX        // 18446744073709551615</span></span>
<span class="line"><span></span></span>
<span class="line"><span>f64.MIN        // Smallest positive value</span></span>
<span class="line"><span>f64.MAX        // Largest finite value</span></span>
<span class="line"><span>f64.EPSILON    // Smallest difference</span></span>
<span class="line"><span>f64.NAN        // Not a Number</span></span>
<span class="line"><span>f64.INFINITY   // Positive infinity</span></span></code></pre></div><h2 id="overflow-behavior" tabindex="-1">Overflow Behavior <a class="header-anchor" href="#overflow-behavior" aria-label="Permalink to &quot;Overflow Behavior&quot;">​</a></h2><p>By default, integer overflow panics in debug mode and wraps in release mode:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! x: u8 = 255</span></span>
<span class="line"><span>x += 1  // Debug: panic! Release: x = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Explicit wrapping</span></span>
<span class="line"><span>let y = x.wrapping_add(1)  // Always wraps: 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Explicit saturation</span></span>
<span class="line"><span>let z = x.saturating_add(1)  // Clamps: 255</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Checked operations</span></span>
<span class="line"><span>let result = x.checked_add(1)  // Returns Option&lt;u8&gt;: None</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use <code>i32</code> for general integers</strong> - Default, fast on all platforms</li><li><strong>Use <code>usize</code> for indices</strong> - Matches platform pointer size</li><li><strong>Use <code>f64</code> for general floats</strong> - Better precision, same speed on modern CPUs</li><li><strong>Prefer explicit types at API boundaries</strong> - Clarity over inference</li><li><strong>Use checked arithmetic for untrusted input</strong> - Prevent overflow bugs</li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Explicit types at boundaries</span></span>
<span class="line"><span>fn process_chunk(data: &amp;[u8], offset: usize, len: usize): Result&lt;Vec&lt;u8&gt;, Error&gt; {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Good: Let inference work internally</span></span>
<span class="line"><span>let sum = 0</span></span>
<span class="line"><span>for n in items { sum += n }</span></span></code></pre></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/types/compound">Compound Types</a> - Arrays, tuples, slices</li><li><a href="/docs/guide/types/structs">User-Defined Types</a> - Structs and enums</li><li><a href="/docs/guide/types/generics">Generics</a> - Type parameters</li></ul>`,57)])])}const g=s(p,[["render",i]]);export{u as __pageData,g as default};
