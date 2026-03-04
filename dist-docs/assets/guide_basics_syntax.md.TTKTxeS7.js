import{_ as s,o as e,c as t,ag as n}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Syntax Overview","description":"","frontmatter":{},"headers":[],"relativePath":"guide/basics/syntax.md","filePath":"guide/basics/syntax.md"}'),l={name:"guide/basics/syntax.md"};function i(p,a,d,o,r,c){return e(),t("div",null,[...a[0]||(a[0]=[n(`<h1 id="syntax-overview" tabindex="-1">Syntax Overview <a class="header-anchor" href="#syntax-overview" aria-label="Permalink to &quot;Syntax Overview&quot;">​</a></h1><p>Vex syntax is designed to be familiar to developers coming from C, Rust, Go, or TypeScript while introducing unique features for parallelism and safety.</p><h2 id="basic-structure" tabindex="-1">Basic Structure <a class="header-anchor" href="#basic-structure" aria-label="Permalink to &quot;Basic Structure&quot;">​</a></h2><h3 id="comments" tabindex="-1">Comments <a class="header-anchor" href="#comments" aria-label="Permalink to &quot;Comments&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Single-line comment</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* </span></span>
<span class="line"><span>   Multi-line comment </span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Documentation comment (generates docs)</span></span>
<span class="line"><span>fn documented_function() {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="statements-and-semicolons" tabindex="-1">Statements and Semicolons <a class="header-anchor" href="#statements-and-semicolons" aria-label="Permalink to &quot;Statements and Semicolons&quot;">​</a></h3><p>Vex uses <strong>automatic semicolon insertion (ASI)</strong> similar to Go. Semicolons are optional at line endings:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x = 10      // Semicolon inserted automatically</span></span>
<span class="line"><span>let y = 20      // Semicolon inserted automatically</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Explicit semicolons for multiple statements on one line</span></span>
<span class="line"><span>let a = 1; let b = 2</span></span></code></pre></div><h3 id="blocks" tabindex="-1">Blocks <a class="header-anchor" href="#blocks" aria-label="Permalink to &quot;Blocks&quot;">​</a></h3><p>Blocks are delimited by curly braces <code>{}</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    let x = 10</span></span>
<span class="line"><span>    let y = 20</span></span>
<span class="line"><span>    x + y  // Last expression is the block&#39;s value</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="identifiers" tabindex="-1">Identifiers <a class="header-anchor" href="#identifiers" aria-label="Permalink to &quot;Identifiers&quot;">​</a></h2><p>Valid identifiers:</p><ul><li>Start with a letter or underscore</li><li>Contain letters, digits, or underscores</li><li>Case-sensitive</li></ul><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let myVariable = 10</span></span>
<span class="line"><span>let _private = 20</span></span>
<span class="line"><span>let camelCase = 30</span></span>
<span class="line"><span>let snake_case = 40</span></span>
<span class="line"><span>let Type123 = 50</span></span></code></pre></div><h3 id="reserved-keywords" tabindex="-1">Reserved Keywords <a class="header-anchor" href="#reserved-keywords" aria-label="Permalink to &quot;Reserved Keywords&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn       let      let!     const    struct   enum     contract</span></span>
<span class="line"><span>impl     if       else     elif     for      while    loop</span></span>
<span class="line"><span>match    return   break    continue defer    go       async</span></span>
<span class="line"><span>await    import   export   from     as       type     where</span></span>
<span class="line"><span>true     false    nil      self     unsafe   extern   public</span></span>
<span class="line"><span>private  readonly</span></span></code></pre></div><h2 id="literals" tabindex="-1">Literals <a class="header-anchor" href="#literals" aria-label="Permalink to &quot;Literals&quot;">​</a></h2><h3 id="numeric-literals" tabindex="-1">Numeric Literals <a class="header-anchor" href="#numeric-literals" aria-label="Permalink to &quot;Numeric Literals&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Integers</span></span>
<span class="line"><span>let decimal = 42</span></span>
<span class="line"><span>let hex = 0xFF</span></span>
<span class="line"><span>let octal = 0o77</span></span>
<span class="line"><span>let binary = 0b1010</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With type suffix</span></span>
<span class="line"><span>let byte: u8 = 255u8</span></span>
<span class="line"><span>let big: i64 = 1000000i64</span></span>
<span class="line"><span>let huge: i128 = 999999999999i128</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Floats</span></span>
<span class="line"><span>let pi = 3.14159</span></span>
<span class="line"><span>let scientific = 1.5e10</span></span>
<span class="line"><span>let small = 2.0e-5</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Imaginary (for complex numbers)</span></span>
<span class="line"><span>let imag = 5i</span></span>
<span class="line"><span>let complex_imag = 3.14i</span></span></code></pre></div><h3 id="string-literals" tabindex="-1">String Literals <a class="header-anchor" href="#string-literals" aria-label="Permalink to &quot;String Literals&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Regular strings</span></span>
<span class="line"><span>let hello = &quot;Hello, World!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Escape sequences</span></span>
<span class="line"><span>let escaped = &quot;Line 1\\nLine 2\\tTabbed&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Formatted strings (f-strings)</span></span>
<span class="line"><span>let name = &quot;Vex&quot;</span></span>
<span class="line"><span>let greeting = f&quot;Hello, {name}!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Multi-line strings</span></span>
<span class="line"><span>let multi = &quot;Line 1</span></span>
<span class="line"><span>Line 2</span></span>
<span class="line"><span>Line 3&quot;</span></span></code></pre></div><h3 id="boolean-and-nil" tabindex="-1">Boolean and Nil <a class="header-anchor" href="#boolean-and-nil" aria-label="Permalink to &quot;Boolean and Nil&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let yes = true       // bool</span></span>
<span class="line"><span>let no = false       // bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// nil represents a NULL pointer (primarily for FFI)</span></span>
<span class="line"><span>// For high-level code, use Option&lt;T&gt; instead.</span></span>
<span class="line"><span>let nothing = nil</span></span></code></pre></div><h3 id="array-literals" tabindex="-1">Array Literals <a class="header-anchor" href="#array-literals" aria-label="Permalink to &quot;Array Literals&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let numbers: [i32; 5] = [1, 2, 3, 4, 5]</span></span>
<span class="line"><span>let zeros: [f64; 3] = [0.0, 0.0, 0.0]</span></span>
<span class="line"><span>let mixed = [1, 2, 3]  // Type inferred as [i32; 3]</span></span></code></pre></div><h3 id="tuple-literals" tabindex="-1">Tuple Literals <a class="header-anchor" href="#tuple-literals" aria-label="Permalink to &quot;Tuple Literals&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let pair = (10, &quot;hello&quot;)</span></span>
<span class="line"><span>let triple: (i32, f64, bool) = (1, 2.5, true)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Access by index</span></span>
<span class="line"><span>let first = pair.0   // 10</span></span>
<span class="line"><span>let second = pair.1  // &quot;hello&quot;</span></span></code></pre></div><h2 id="operators" tabindex="-1">Operators <a class="header-anchor" href="#operators" aria-label="Permalink to &quot;Operators&quot;">​</a></h2><h3 id="arithmetic-operators" tabindex="-1">Arithmetic Operators <a class="header-anchor" href="#arithmetic-operators" aria-label="Permalink to &quot;Arithmetic Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>+</code></td><td>Addition</td><td><code>a + b</code></td></tr><tr><td><code>-</code></td><td>Subtraction</td><td><code>a - b</code></td></tr><tr><td><code>*</code></td><td>Multiplication</td><td><code>a * b</code></td></tr><tr><td><code>/</code></td><td>Division</td><td><code>a / b</code></td></tr><tr><td><code>%</code></td><td>Modulo</td><td><code>a % b</code></td></tr><tr><td><code>**</code></td><td>Power</td><td><code>a ** b</code></td></tr></tbody></table><h3 id="comparison-operators" tabindex="-1">Comparison Operators <a class="header-anchor" href="#comparison-operators" aria-label="Permalink to &quot;Comparison Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>==</code></td><td>Equal</td><td><code>a == b</code></td></tr><tr><td><code>!=</code></td><td>Not equal</td><td><code>a != b</code></td></tr><tr><td><code>&lt;</code></td><td>Less than</td><td><code>a &lt; b</code></td></tr><tr><td><code>&lt;=</code></td><td>Less or equal</td><td><code>a &lt;= b</code></td></tr><tr><td><code>&gt;</code></td><td>Greater than</td><td><code>a &gt; b</code></td></tr><tr><td><code>&gt;=</code></td><td>Greater or equal</td><td><code>a &gt;= b</code></td></tr></tbody></table><h3 id="logical-operators" tabindex="-1">Logical Operators <a class="header-anchor" href="#logical-operators" aria-label="Permalink to &quot;Logical Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>&amp;&amp;</code></td><td>Logical AND</td><td><code>a &amp;&amp; b</code></td></tr><tr><td><code>||</code></td><td>Logical OR</td><td><code>a || b</code></td></tr><tr><td><code>!</code></td><td>Logical NOT</td><td><code>!a</code></td></tr></tbody></table><h3 id="bitwise-operators" tabindex="-1">Bitwise Operators <a class="header-anchor" href="#bitwise-operators" aria-label="Permalink to &quot;Bitwise Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>&amp;</code></td><td>Bitwise AND</td><td><code>a &amp; b</code></td></tr><tr><td><code>|</code></td><td>Bitwise OR</td><td><code>a | b</code></td></tr><tr><td><code>^</code></td><td>Bitwise XOR</td><td><code>a ^ b</code></td></tr><tr><td><code>~</code></td><td>Bitwise NOT</td><td><code>~a</code></td></tr><tr><td><code>&lt;&lt;</code></td><td>Left shift</td><td><code>a &lt;&lt; n</code></td></tr><tr><td><code>&gt;&gt;</code></td><td>Right shift</td><td><code>a &gt;&gt; n</code></td></tr></tbody></table><h3 id="simd-vector-operators" tabindex="-1">SIMD &amp; Vector Operators <a class="header-anchor" href="#simd-vector-operators" aria-label="Permalink to &quot;SIMD &amp; Vector Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>&lt;&lt;&lt;</code></td><td>Rotate left</td><td><code>a &lt;&lt;&lt; n</code></td></tr><tr><td><code>&gt;&gt;&gt;</code></td><td>Rotate right</td><td><code>a &gt;&gt;&gt; n</code></td></tr><tr><td><code>&lt;?</code></td><td>Element-wise min</td><td><code>a &lt;? b</code></td></tr><tr><td><code>&gt;?</code></td><td>Element-wise max</td><td><code>a &gt;? b</code></td></tr><tr><td><code>*+</code></td><td>Fused multiply-add</td><td><code>a *+ b</code></td></tr><tr><td><code>+|</code></td><td>Saturating add</td><td><code>a +| b</code></td></tr><tr><td><code>-|</code></td><td>Saturating sub</td><td><code>a -| b</code></td></tr></tbody></table><h3 id="assignment-operators" tabindex="-1">Assignment Operators <a class="header-anchor" href="#assignment-operators" aria-label="Permalink to &quot;Assignment Operators&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! x = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>x = 20        // Simple assignment</span></span>
<span class="line"><span>x += 5        // Add and assign</span></span>
<span class="line"><span>x -= 3        // Subtract and assign</span></span>
<span class="line"><span>x *= 2        // Multiply and assign</span></span>
<span class="line"><span>x /= 4        // Divide and assign</span></span>
<span class="line"><span>x %= 3        // Modulo and assign</span></span>
<span class="line"><span>x &amp;= 0xFF     // Bitwise AND and assign</span></span>
<span class="line"><span>x |= 0x0F     // Bitwise OR and assign</span></span>
<span class="line"><span>x ^= 0xAA     // Bitwise XOR and assign</span></span>
<span class="line"><span>x &lt;&lt;= 2       // Left shift and assign</span></span>
<span class="line"><span>x &gt;&gt;= 1       // Right shift and assign</span></span></code></pre></div><h3 id="other-operators" tabindex="-1">Other Operators <a class="header-anchor" href="#other-operators" aria-label="Permalink to &quot;Other Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td><code>? :</code></td><td>Ternary conditional</td><td><code>a &gt; b ? a : b</code></td></tr><tr><td><code>?</code></td><td>Error propagation</td><td><code>result?</code></td></tr><tr><td><code>??</code></td><td>Nil coalescing</td><td><code>a ?? default</code></td></tr><tr><td><code>|&gt;</code></td><td>Pipeline</td><td><code>x |&gt; fn1 |&gt; fn2</code></td></tr><tr><td><code>..</code></td><td>Range (exclusive)</td><td><code>0..10</code></td></tr><tr><td><code>..=</code></td><td>Range (inclusive)</td><td><code>0..=10</code></td></tr><tr><td><code>.</code></td><td>Member access</td><td><code>obj.field</code></td></tr></tbody></table><h2 id="expressions-vs-statements" tabindex="-1">Expressions vs Statements <a class="header-anchor" href="#expressions-vs-statements" aria-label="Permalink to &quot;Expressions vs Statements&quot;">​</a></h2><p>In Vex, most constructs are <strong>expressions</strong> that return values:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// if is an expression</span></span>
<span class="line"><span>let max = if a &gt; b { a } else { b }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// match is an expression</span></span>
<span class="line"><span>let name = match value {</span></span>
<span class="line"><span>    1 =&gt; &quot;one&quot;,</span></span>
<span class="line"><span>    2 =&gt; &quot;two&quot;,</span></span>
<span class="line"><span>    _ =&gt; &quot;other&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Blocks are expressions (return last value)</span></span>
<span class="line"><span>let result = {</span></span>
<span class="line"><span>    let x = compute()</span></span>
<span class="line"><span>    let y = transform(x)</span></span>
<span class="line"><span>    x + y  // This is the block&#39;s value</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/basics/variables">Variables &amp; Constants</a> - Learn about variable declaration</li><li><a href="/docs/guide/basics/functions">Functions</a> - Function syntax and features</li><li><a href="/docs/guide/basics/control-flow">Control Flow</a> - if, match, loops</li></ul>`,48)])])}const b=s(l,[["render",i]]);export{u as __pageData,b as default};
