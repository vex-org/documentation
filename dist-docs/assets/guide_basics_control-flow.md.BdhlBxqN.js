import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Control Flow","description":"","frontmatter":{},"headers":[],"relativePath":"guide/basics/control-flow.md","filePath":"guide/basics/control-flow.md"}'),t={name:"guide/basics/control-flow.md"};function i(l,a,o,c,r,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="control-flow" tabindex="-1">Control Flow <a class="header-anchor" href="#control-flow" aria-label="Permalink to &quot;Control Flow&quot;">​</a></h1><p>Vex provides comprehensive control flow constructs including conditionals, pattern matching, and various loop types. Most of these are <strong>expressions</strong> that return values.</p><h2 id="conditional-expressions" tabindex="-1">Conditional Expressions <a class="header-anchor" href="#conditional-expressions" aria-label="Permalink to &quot;Conditional Expressions&quot;">​</a></h2><h3 id="if-else-elif" tabindex="-1">if / else / elif <a class="header-anchor" href="#if-else-elif" aria-label="Permalink to &quot;if / else / elif&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Basic if</span></span>
<span class="line"><span>if condition {</span></span>
<span class="line"><span>    do_something()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// if-else</span></span>
<span class="line"><span>if x &gt; 0 {</span></span>
<span class="line"><span>    println(&quot;Positive&quot;)</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    println(&quot;Non-positive&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// if-elif-else chain</span></span>
<span class="line"><span>if score &gt;= 90 {</span></span>
<span class="line"><span>    println(&quot;A&quot;)</span></span>
<span class="line"><span>} elif score &gt;= 80 {</span></span>
<span class="line"><span>    println(&quot;B&quot;)</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    println(&quot;F&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="if-as-expression" tabindex="-1">if as Expression <a class="header-anchor" href="#if-as-expression" aria-label="Permalink to &quot;if as Expression&quot;">​</a></h3><p>Since <code>if</code> is an expression, it returns a value:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let max = if a &gt; b { a } else { b }</span></span></code></pre></div><h3 id="ternary-operator" tabindex="-1">Ternary Operator <a class="header-anchor" href="#ternary-operator" aria-label="Permalink to &quot;Ternary Operator&quot;">​</a></h3><p>Vex supports the classic C-style ternary operator <code>? :</code> for concise conditionals:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let max = a &gt; b ? a : b</span></span></code></pre></div><h3 id="conditional-binding" tabindex="-1">Conditional Binding <a class="header-anchor" href="#conditional-binding" aria-label="Permalink to &quot;Conditional Binding&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// if-let for Option/Result</span></span>
<span class="line"><span>if let Some(value) = optional_value {</span></span>
<span class="line"><span>    println(f&quot;Got: {value}&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if let Ok(data) = fetch_result {</span></span>
<span class="line"><span>    process(data)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="pattern-matching" tabindex="-1">Pattern Matching <a class="header-anchor" href="#pattern-matching" aria-label="Permalink to &quot;Pattern Matching&quot;">​</a></h2><h3 id="match-expression" tabindex="-1">match Expression <a class="header-anchor" href="#match-expression" aria-label="Permalink to &quot;match Expression&quot;">​</a></h3><p>The <code>match</code> expression is Vex&#39;s most powerful control flow construct. It is <strong>exhaustive</strong>, meaning all cases must be covered.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let result = match value {</span></span>
<span class="line"><span>    0 =&gt; &quot;zero&quot;,</span></span>
<span class="line"><span>    1 =&gt; &quot;one&quot;,</span></span>
<span class="line"><span>    _ =&gt; &quot;many&quot;  // _ is the wildcard pattern</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="pattern-types" tabindex="-1">Pattern Types <a class="header-anchor" href="#pattern-types" aria-label="Permalink to &quot;Pattern Types&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Literal and OR patterns</span></span>
<span class="line"><span>match x {</span></span>
<span class="line"><span>    0 =&gt; &quot;zero&quot;,</span></span>
<span class="line"><span>    1 | 2 | 3 =&gt; &quot;small&quot;,</span></span>
<span class="line"><span>    _ =&gt; &quot;large&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Enum patterns</span></span>
<span class="line"><span>match result {</span></span>
<span class="line"><span>    Ok(value) =&gt; println(f&quot;Success: {value}&quot;),</span></span>
<span class="line"><span>    Err(e) =&gt; println(f&quot;Error: {e.msg}&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Tuple patterns</span></span>
<span class="line"><span>let pair = (1, 2)</span></span>
<span class="line"><span>match pair {</span></span>
<span class="line"><span>    (0, 0) =&gt; &quot;origin&quot;,</span></span>
<span class="line"><span>    (x, y) =&gt; f&quot;at ({x}, {y})&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="guards" tabindex="-1">Guards <a class="header-anchor" href="#guards" aria-label="Permalink to &quot;Guards&quot;">​</a></h3><p>Add conditions to patterns:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match number {</span></span>
<span class="line"><span>    n if n &lt; 0 =&gt; &quot;negative&quot;,</span></span>
<span class="line"><span>    n =&gt; &quot;positive or zero&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="loops" tabindex="-1">Loops <a class="header-anchor" href="#loops" aria-label="Permalink to &quot;Loops&quot;">​</a></h2><h3 id="for-loop" tabindex="-1">for Loop <a class="header-anchor" href="#for-loop" aria-label="Permalink to &quot;for Loop&quot;">​</a></h3><p>Iterate over collections and ranges:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Range iteration</span></span>
<span class="line"><span>for i in 0..10 {</span></span>
<span class="line"><span>    println(i)  // 0 to 9</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Collection iteration</span></span>
<span class="line"><span>let numbers = [1, 2, 3]</span></span>
<span class="line"><span>for num in numbers {</span></span>
<span class="line"><span>    println(num)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="while-loop" tabindex="-1">while Loop <a class="header-anchor" href="#while-loop" aria-label="Permalink to &quot;while Loop&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! count = 0</span></span>
<span class="line"><span>while count &lt; 10 {</span></span>
<span class="line"><span>    println(count)</span></span>
<span class="line"><span>    count += 1</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="loop-infinite-loop" tabindex="-1">loop (Infinite Loop) <a class="header-anchor" href="#loop-infinite-loop" aria-label="Permalink to &quot;loop (Infinite Loop)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>loop {</span></span>
<span class="line"><span>    if should_stop() {</span></span>
<span class="line"><span>        break</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="defer" tabindex="-1">Defer <a class="header-anchor" href="#defer" aria-label="Permalink to &quot;Defer&quot;">​</a></h2><p>Execute code when leaving the current scope (Go-style RAII):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process() {</span></span>
<span class="line"><span>    let file = open(&quot;data.txt&quot;)</span></span>
<span class="line"><span>    defer file.close() // Executes when function returns</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // ... work ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/basics/functions">Functions</a> - Defining behavior</li><li><a href="/docs/guide/error-handling">Error Handling</a> - Result and Option</li><li><a href="/docs/guide/concurrency/async">Concurrency</a> - Async, Await, and Channels</li></ul>`,35)])])}const g=s(t,[["render",i]]);export{u as __pageData,g as default};
