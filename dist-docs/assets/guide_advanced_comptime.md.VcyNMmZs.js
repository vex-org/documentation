import{_ as a,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const g=JSON.parse('{"title":"Compile-Time Evaluation","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/comptime.md","filePath":"guide/advanced/comptime.md"}'),t={name:"guide/advanced/comptime.md"};function l(i,s,o,c,r,u){return n(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="compile-time-evaluation" tabindex="-1">Compile-Time Evaluation <a class="header-anchor" href="#compile-time-evaluation" aria-label="Permalink to &quot;Compile-Time Evaluation&quot;">​</a></h1><p>Vex provides powerful compile-time evaluation capabilities through <strong>comptime intrinsics</strong>. These are evaluated during compilation, producing zero runtime overhead.</p><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>Comptime intrinsics in Vex start with the <code>$</code> prefix and are evaluated at compile time. They enable:</p><ul><li><strong>Type introspection</strong> - Query type properties</li><li><strong>Reflection</strong> - Inspect struct/enum fields and variants</li><li><strong>Compile-time arithmetic</strong> - Evaluate constants</li><li><strong>Conditional compilation</strong> - Type-based code generation</li></ul><h2 id="type-introspection" tabindex="-1">Type Introspection <a class="header-anchor" href="#type-introspection" aria-label="Permalink to &quot;Type Introspection&quot;">​</a></h2><h3 id="size-and-alignment" tabindex="-1">Size and Alignment <a class="header-anchor" href="#size-and-alignment" aria-label="Permalink to &quot;Size and Alignment&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Get size of a type in bytes</span></span>
<span class="line"><span>let size = #sizeof&lt;i64&gt;()     // 8</span></span>
<span class="line"><span>let size = $sizeOf&lt;MyStruct&gt;()  // Struct size</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Get alignment of a type</span></span>
<span class="line"><span>let align = #alignof&lt;f64&gt;()   // 8</span></span>
<span class="line"><span>let align = $alignOf&lt;Vec&lt;i32&gt;&gt;()  // Pointer alignment</span></span></code></pre></div><h3 id="type-name" tabindex="-1">Type Name <a class="header-anchor" href="#type-name" aria-label="Permalink to &quot;Type Name&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Get type name as string</span></span>
<span class="line"><span>let name = #typeName&lt;i32&gt;()           // &quot;i32&quot;</span></span>
<span class="line"><span>let name = #typename&lt;Vec&lt;string&gt;&gt;()   // &quot;Vec&lt;string&gt;&quot;</span></span></code></pre></div><h2 id="type-predicates" tabindex="-1">Type Predicates <a class="header-anchor" href="#type-predicates" aria-label="Permalink to &quot;Type Predicates&quot;">​</a></h2><p>Query type characteristics at compile time:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Check type categories</span></span>
<span class="line"><span>#isStruct&lt;MyStruct&gt;()</span><span>      // true</span></span>
<span class="line"><span>#isEnum&lt;Option&lt;T&gt;&gt;()</span><span>       // true</span></span>
<span class="line"><span>#isPrimitive&lt;i32&gt;()</span><span>        // true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Numeric type checks</span></span>
<span class="line"><span>#isInteger&lt;i64&gt;()</span><span>          // true</span></span>
<span class="line"><span>#isFloat&lt;f32&gt;()</span><span>            // true</span></span>
<span class="line"><span>#isSigned&lt;i32&gt;()</span><span>           // true (vs unsigned)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Compound types</span></span>
<span class="line"><span>#isPointer&lt;*i32&gt;()</span><span>         // true</span></span>
<span class="line"><span>#isArray&lt;[i32; 4]&gt;()</span><span>       // true</span></span>
<span class="line"><span>#isTuple&lt;(i32, string)&gt;()</span><span>  // true</span></span>
<span class="line"><span>$isSlice&lt;Slice&lt;i32&gt;&gt;()     // true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Special types</span></span>
<span class="line"><span>$isOption&lt;Option&lt;i32&gt;&gt;()   // true</span></span>
<span class="line"><span>$isResult&lt;Result&lt;T, E&gt;&gt;()  // true</span></span>
<span class="line"><span>#isReference&lt;&amp;T&gt;()</span><span>         // true</span></span>
<span class="line"><span>#isFunction&lt;fn(i32): i32&gt;()</span><span> // true</span></span>
<span class="line"><span>#isGeneric&lt;T&gt;()</span><span>            // true for type params</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Contract checks</span></span>
<span class="line"><span>#isCopy&lt;i32&gt;()</span><span>             // true</span></span>
<span class="line"><span>#needsDrop&lt;Vec&lt;i32&gt;&gt;()</span><span>     // true</span></span></code></pre></div><h2 id="struct-reflection" tabindex="-1">Struct Reflection <a class="header-anchor" href="#struct-reflection" aria-label="Permalink to &quot;Struct Reflection&quot;">​</a></h2><p>Inspect struct fields at compile time:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct User {</span></span>
<span class="line"><span>    id: i64 \`json:&quot;user_id&quot; db:&quot;primary_key&quot;\`,</span></span>
<span class="line"><span>    name: string \`json:&quot;name&quot;\`,</span></span>
<span class="line"><span>    active: bool</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Field count</span></span>
<span class="line"><span>let count = #fieldCount&lt;User&gt;()    // 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Field names (comma-separated string)</span></span>
<span class="line"><span>let names = #fieldNames&lt;User&gt;()    // &quot;id,name,active&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Check if field exists</span></span>
<span class="line"><span>let has = #hasField&lt;User&gt;(&quot;id&quot;)    // true</span></span>
<span class="line"><span>let has = #hasField&lt;User&gt;(&quot;email&quot;) // false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Get field type name</span></span>
<span class="line"><span>let ty = #fieldType&lt;User&gt;(&quot;id&quot;)    // &quot;i64&quot;</span></span>
<span class="line"><span>let ty = #fieldType&lt;User&gt;(&quot;name&quot;)  // &quot;string&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Get field offset in bytes</span></span>
<span class="line"><span>let off = #offsetOf&lt;User&gt;(&quot;name&quot;)  // Offset of name field</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Field tags (Go-style backtick metadata)</span></span>
<span class="line"><span>let tag = #fieldTag&lt;User&gt;(&quot;id&quot;, &quot;json&quot;)     // &quot;user_id&quot;</span></span>
<span class="line"><span>let tag = #fieldTag&lt;User&gt;(&quot;id&quot;, &quot;db&quot;)       // &quot;primary_key&quot;</span></span>
<span class="line"><span>let has = #hasFieldTag&lt;User&gt;(&quot;id&quot;, &quot;json&quot;)  // true</span></span>
<span class="line"><span>let tags = #fieldTags&lt;User&gt;(&quot;id&quot;)           // &quot;json:user_id,db:primary_key&quot;</span></span></code></pre></div><h2 id="enum-reflection" tabindex="-1">Enum Reflection <a class="header-anchor" href="#enum-reflection" aria-label="Permalink to &quot;Enum Reflection&quot;">​</a></h2><p>Inspect enum variants:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Status {</span></span>
<span class="line"><span>    Active,</span></span>
<span class="line"><span>    Pending,</span></span>
<span class="line"><span>    Closed(string)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Variant count</span></span>
<span class="line"><span>let count = #variantCount&lt;Status&gt;()     // 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Variant names</span></span>
<span class="line"><span>let names = #variantNames&lt;Status&gt;()     // &quot;Active,Pending,Closed&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Check variant existence</span></span>
<span class="line"><span>let has = #hasVariant&lt;Status&gt;(&quot;Active&quot;) // true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Get variant discriminant</span></span>
<span class="line"><span>let disc = #variantDiscriminant&lt;Status&gt;(&quot;Pending&quot;)  // 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Check if variant has payload</span></span>
<span class="line"><span>let has = #variantHasPayload&lt;Status&gt;(&quot;Closed&quot;)  // true</span></span>
<span class="line"><span>let has = #variantHasPayload&lt;Status&gt;(&quot;Active&quot;)  // false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Get variant payload type</span></span>
<span class="line"><span>let payload = #variantPayload&lt;Status&gt;(&quot;Closed&quot;)  // &quot;string&quot;</span></span></code></pre></div><h2 id="type-comparison" tabindex="-1">Type Comparison <a class="header-anchor" href="#type-comparison" aria-label="Permalink to &quot;Type Comparison&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Check if two types are the same</span></span>
<span class="line"><span>#sameType&lt;i32, i32&gt;()</span><span>              // true</span></span>
<span class="line"><span>#sameType&lt;i32, i64&gt;()</span><span>              // false</span></span>
<span class="line"><span>#sameType&lt;Vec&lt;i32&gt;, Vec&lt;i32&gt;&gt;()</span><span>    // true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Check if type implements a contract</span></span>
<span class="line"><span>#implements&lt;MyStruct, Display&gt;()</span><span>   // true/false</span></span></code></pre></div><h2 id="compile-time-arithmetic" tabindex="-1">Compile-Time Arithmetic <a class="header-anchor" href="#compile-time-arithmetic" aria-label="Permalink to &quot;Compile-Time Arithmetic&quot;">​</a></h2><p>Evaluate arithmetic at compile time:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Power</span></span>
<span class="line"><span>let val = #constPow(2, 10)    // 1024</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Min/Max</span></span>
<span class="line"><span>let min = #constMin(5, 3)     // 3</span></span>
<span class="line"><span>let max = #constMax(5, 3)     // 5</span></span>
<span class="line"><span>let min = $min(a, b)          // shorthand</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Clamp</span></span>
<span class="line"><span>let val = #constClamp(15, 0, 10)  // 10</span></span>
<span class="line"><span>let val = $clamp(x, lo, hi)       // shorthand</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Absolute value</span></span>
<span class="line"><span>let abs = #constAbs(-42)      // 42</span></span>
<span class="line"><span>let abs = $abs(x)             // shorthand</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Logarithm (base 2)</span></span>
<span class="line"><span>let log = #constLog2(256)     // 8</span></span>
<span class="line"><span>let log = $log2(n)            // shorthand</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Square root (integer)</span></span>
<span class="line"><span>let sqrt = #constSqrt(144)    // 12</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// GCD/LCM</span></span>
<span class="line"><span>let gcd = #constGcd(12, 8)    // 4</span></span>
<span class="line"><span>let gcd = $gcd(a, b)          // shorthand</span></span>
<span class="line"><span>let lcm = #constLcm(4, 6)     // 12</span></span>
<span class="line"><span>let lcm = $lcm(a, b)          // shorthand</span></span></code></pre></div><h2 id="bit-operations" tabindex="-1">Bit Operations <a class="header-anchor" href="#bit-operations" aria-label="Permalink to &quot;Bit Operations&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Check if power of 2</span></span>
<span class="line"><span>#isPowerOf2(16)</span><span>       // true</span></span>
<span class="line"><span>#isPowerOfTwo(15)</span><span>     // false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Next power of 2</span></span>
<span class="line"><span>#nextPowerOf2(5)</span><span>      // 8</span></span>
<span class="line"><span>#nextPow2(100)</span><span>        // 128</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bit count (popcount)</span></span>
<span class="line"><span>#bitCount(0b1010101)</span><span>  // 4</span></span>
<span class="line"><span>#popcount(255)</span><span>        // 8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Leading/trailing zeros</span></span>
<span class="line"><span>#leadingZeros(16)</span><span>     // depends on bit width</span></span>
<span class="line"><span>#clz(0x80)</span><span>            // count leading zeros</span></span>
<span class="line"><span>#trailingZeros(16)</span><span>    // 4</span></span>
<span class="line"><span>#ctz(0x80)</span><span>            // count trailing zeros</span></span></code></pre></div><h2 id="default-values" tabindex="-1">Default Values <a class="header-anchor" href="#default-values" aria-label="Permalink to &quot;Default Values&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Create default value for type</span></span>
<span class="line"><span>let val = #default&lt;i32&gt;()        // 0</span></span>
<span class="line"><span>let val = #default&lt;string&gt;()     // &quot;&quot;</span></span>
<span class="line"><span>let val = #default&lt;Vec&lt;i32&gt;&gt;()   // empty vec</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Check if type has default</span></span>
<span class="line"><span>#hasDefault&lt;i32&gt;()</span><span>               // true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Create zeroed value (all bits zero)</span></span>
<span class="line"><span>let val = #zeroed&lt;MyStruct&gt;()    // All fields zeroed</span></span></code></pre></div><h2 id="compile-time-evaluation-1" tabindex="-1">Compile-Time Evaluation <a class="header-anchor" href="#compile-time-evaluation-1" aria-label="Permalink to &quot;Compile-Time Evaluation&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Force compile-time evaluation</span></span>
<span class="line"><span>let val = #constEval(2 + 2)           // 4 at compile time</span></span>
<span class="line"><span>let val = #eval(some_const_expr)      // Evaluate expression</span></span></code></pre></div><h2 id="debug-intrinsics" tabindex="-1">Debug Intrinsics <a class="header-anchor" href="#debug-intrinsics" aria-label="Permalink to &quot;Debug Intrinsics&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Print type info during compilation</span></span>
<span class="line"><span>#debugType&lt;MyComplexType&gt;()</span><span>  // Prints type info to stderr</span></span></code></pre></div><h2 id="compile-time-diagnostics" tabindex="-1">Compile-Time Diagnostics <a class="header-anchor" href="#compile-time-diagnostics" aria-label="Permalink to &quot;Compile-Time Diagnostics&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Static assertion (fails compilation if false)</span></span>
<span class="line"><span>#staticAssert(#sizeof&lt;i32&gt;() == 4, &quot;i32 must be 4 bytes&quot;)</span></span>
<span class="line"><span>#staticAssert(#hasField&lt;User&gt;(&quot;id&quot;), &quot;User must have id field&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Emit compile error</span></span>
<span class="line"><span>#compileError(&quot;This code path should not be reached&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Emit compile warning</span></span>
<span class="line"><span>#warning(&quot;This API is deprecated&quot;)</span></span></code></pre></div><h2 id="practical-examples" tabindex="-1">Practical Examples <a class="header-anchor" href="#practical-examples" aria-label="Permalink to &quot;Practical Examples&quot;">​</a></h2><h3 id="type-safe-serialization" tabindex="-1">Type-Safe Serialization <a class="header-anchor" href="#type-safe-serialization" aria-label="Permalink to &quot;Type-Safe Serialization&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn to_json&lt;T&gt;(obj: &amp;T): string {</span></span>
<span class="line"><span>    let! result = &quot;{&quot;</span></span>
<span class="line"><span>    let! first = true</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $for field in #fieldNames&lt;T&gt;().split(&quot;,&quot;) {</span></span>
<span class="line"><span>        let json_key = #fieldTag&lt;T&gt;(field, &quot;json&quot;)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        if json_key != &quot;&quot; {</span></span>
<span class="line"><span>            if !first { result = result + &quot;, &quot; }</span></span>
<span class="line"><span>            first = false</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            let value = $fieldGet(obj, field)</span></span>
<span class="line"><span>            result = result + &quot;\\&quot;&quot; + json_key + &quot;\\&quot;: &quot;</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            $if #fieldType&lt;T&gt;(field) == &quot;string&quot; {</span></span>
<span class="line"><span>                result = result + &quot;\\&quot;&quot; + value + &quot;\\&quot;&quot;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            $if #fieldType&lt;T&gt;(field) == &quot;i32&quot; {</span></span>
<span class="line"><span>                result = result + #stringify(value)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result + &quot;}&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="generic-buffer-with-alignment" tabindex="-1">Generic Buffer with Alignment <a class="header-anchor" href="#generic-buffer-with-alignment" aria-label="Permalink to &quot;Generic Buffer with Alignment&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct AlignedBuffer&lt;T&gt; {</span></span>
<span class="line"><span>    data: *T,</span></span>
<span class="line"><span>    len: i64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn new_buffer&lt;T&gt;(count: i64): AlignedBuffer&lt;T&gt; {</span></span>
<span class="line"><span>    let size = #sizeof&lt;T&gt;() * count</span></span>
<span class="line"><span>    let align = #alignof&lt;T&gt;()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    #staticAssert(#isPrimitive&lt;T&gt;() || #isCopy&lt;T&gt;(), </span></span>
<span class="line"><span>                  &quot;Buffer only supports Copy types&quot;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return AlignedBuffer {</span></span>
<span class="line"><span>        data: aligned_alloc(align, size),</span></span>
<span class="line"><span>        len: count</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="enum-visitor-pattern" tabindex="-1">Enum Visitor Pattern <a class="header-anchor" href="#enum-visitor-pattern" aria-label="Permalink to &quot;Enum Visitor Pattern&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn visit_all&lt;E, F&gt;(visitor: F) {</span></span>
<span class="line"><span>    let variants = #variantNames&lt;E&gt;()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $for name in variants.split(&quot;,&quot;) {</span></span>
<span class="line"><span>        $if #variantHasPayload&lt;E&gt;(name) {</span></span>
<span class="line"><span>            // Skip variants with payloads</span></span>
<span class="line"><span>            continue</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        let disc = #variantDiscriminant&lt;E&gt;(name)</span></span>
<span class="line"><span>        visitor(name, disc)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use for type safety</strong> - Validate assumptions at compile time</li><li><strong>Zero overhead</strong> - All intrinsics evaluate at compile time</li><li><strong>Static assertions</strong> - Catch errors early with <code>#staticAssert</code></li><li><strong>Avoid runtime reflection</strong> - Prefer comptime intrinsics</li><li><strong>Document constraints</strong> - Use <code>#compileError</code> for clear messages</li></ol><h2 id="related-topics" tabindex="-1">Related Topics <a class="header-anchor" href="#related-topics" aria-label="Permalink to &quot;Related Topics&quot;">​</a></h2><ul><li><a href="/docs/guide/types/generics">Generics</a> - Generic programming</li><li><a href="/docs/guide/types/contracts">Contracts</a> - Type constraints</li><li><a href="/docs/guide/advanced/builtins">Builtins</a> - Runtime intrinsics</li></ul>`,45)])])}const h=a(t,[["render",l]]);export{g as __pageData,h as default};
