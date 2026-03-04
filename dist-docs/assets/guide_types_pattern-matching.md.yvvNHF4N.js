import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Pattern Matching","description":"","frontmatter":{},"headers":[],"relativePath":"guide/types/pattern-matching.md","filePath":"guide/types/pattern-matching.md"}'),t={name:"guide/types/pattern-matching.md"};function i(l,a,o,c,r,u){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="pattern-matching" tabindex="-1">Pattern Matching <a class="header-anchor" href="#pattern-matching" aria-label="Permalink to &quot;Pattern Matching&quot;">​</a></h1><p>Pattern matching is one of Vex&#39;s most powerful features, allowing you to destructure complex data types and execute code based on their shape.</p><h2 id="the-match-expression" tabindex="-1">The <code>match</code> Expression <a class="header-anchor" href="#the-match-expression" aria-label="Permalink to &quot;The \`match\` Expression&quot;">​</a></h2><p>The <code>match</code> expression compares a value against a series of patterns. It is exhaustive, meaning you must handle every possible case.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match x {</span></span>
<span class="line"><span>    1 =&gt; println(&quot;One&quot;),</span></span>
<span class="line"><span>    2 =&gt; println(&quot;Two&quot;),</span></span>
<span class="line"><span>    _ =&gt; println(&quot;Something else&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="destructuring" tabindex="-1">Destructuring <a class="header-anchor" href="#destructuring" aria-label="Permalink to &quot;Destructuring&quot;">​</a></h2><h3 id="structs" tabindex="-1">Structs <a class="header-anchor" href="#structs" aria-label="Permalink to &quot;Structs&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point { x: i32, y: i32 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let p = Point { x: 0, y: 7 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match p {</span></span>
<span class="line"><span>    Point { x: 0, y: 0 } =&gt; println(&quot;Origin&quot;),</span></span>
<span class="line"><span>    Point { x, y: 0 } =&gt; println(f&quot;On x-axis at {x}&quot;),</span></span>
<span class="line"><span>    Point { x: 0, y } =&gt; println(f&quot;On y-axis at {y}&quot;),</span></span>
<span class="line"><span>    Point { x, y } =&gt; println(f&quot;At ({x}, {y})&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="enums" tabindex="-1">Enums <a class="header-anchor" href="#enums" aria-label="Permalink to &quot;Enums&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Message {</span></span>
<span class="line"><span>    Quit,</span></span>
<span class="line"><span>    Move { x: i32, y: i32 },</span></span>
<span class="line"><span>    Write(string),</span></span>
<span class="line"><span>    ChangeColor(i32, i32, i32),</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn process(msg: Message) {</span></span>
<span class="line"><span>    match msg {</span></span>
<span class="line"><span>        Message.Quit =&gt; println(&quot;Quit&quot;),</span></span>
<span class="line"><span>        Message.Move { x, y } =&gt; println(f&quot;Move to ({x}, {y})&quot;),</span></span>
<span class="line"><span>        Message.Write(text) =&gt; println(f&quot;Text: {text}&quot;),</span></span>
<span class="line"><span>        Message.ChangeColor(r, g, b) =&gt; println(f&quot;Color: {r}, {g}, {b}&quot;),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="tuples" tabindex="-1">Tuples <a class="header-anchor" href="#tuples" aria-label="Permalink to &quot;Tuples&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let pair = (0, -2)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match pair {</span></span>
<span class="line"><span>    (0, y) =&gt; println(f&quot;Y axis: {y}&quot;),</span></span>
<span class="line"><span>    (x, 0) =&gt; println(f&quot;X axis: {x}&quot;),</span></span>
<span class="line"><span>    (x, y) =&gt; println(f&quot;Coords: {x}, {y}&quot;),</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="advanced-patterns" tabindex="-1">Advanced Patterns <a class="header-anchor" href="#advanced-patterns" aria-label="Permalink to &quot;Advanced Patterns&quot;">​</a></h2><h3 id="multiple-patterns" tabindex="-1">Multiple Patterns <a class="header-anchor" href="#multiple-patterns" aria-label="Permalink to &quot;Multiple Patterns&quot;">​</a></h3><p>Use <code>|</code> to match multiple patterns:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match x {</span></span>
<span class="line"><span>    1 | 2 =&gt; println(&quot;One or Two&quot;),</span></span>
<span class="line"><span>    3 =&gt; println(&quot;Three&quot;),</span></span>
<span class="line"><span>    _ =&gt; println(&quot;Other&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="ranges" tabindex="-1">Ranges <a class="header-anchor" href="#ranges" aria-label="Permalink to &quot;Ranges&quot;">​</a></h3><p>Match ranges of values (inclusive):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let age = 15</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match age {</span></span>
<span class="line"><span>    0..=12 =&gt; println(&quot;Child&quot;),</span></span>
<span class="line"><span>    13..=19 =&gt; println(&quot;Teenager&quot;),</span></span>
<span class="line"><span>    _ =&gt; println(&quot;Adult&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="guards" tabindex="-1">Guards <a class="header-anchor" href="#guards" aria-label="Permalink to &quot;Guards&quot;">​</a></h3><p>Add arbitrary boolean conditions to patterns using <code>if</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let pair = (2, 2)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match pair {</span></span>
<span class="line"><span>    (x, y) if x == y =&gt; println(&quot;Equal&quot;),</span></span>
<span class="line"><span>    (x, y) if x + y == 0 =&gt; println(&quot;Zero sum&quot;),</span></span>
<span class="line"><span>    _ =&gt; println(&quot;Other&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="binding" tabindex="-1">Binding (<code>@</code>) <a class="header-anchor" href="#binding" aria-label="Permalink to &quot;Binding (\`@\`)&quot;">​</a></h3><p>Bind a value to a variable name while testing it against a pattern:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let age = 15</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match age {</span></span>
<span class="line"><span>    n @ 13..=19 =&gt; println(f&quot;Teenager aged {n}&quot;),</span></span>
<span class="line"><span>    _ =&gt; println(&quot;Not a teenager&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="deeply-nested-patterns" tabindex="-1">Deeply Nested Patterns <a class="header-anchor" href="#deeply-nested-patterns" aria-label="Permalink to &quot;Deeply Nested Patterns&quot;">​</a></h2><p>You can match nested structures:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Shape {</span></span>
<span class="line"><span>    Circle { center: Point, radius: i32 },</span></span>
<span class="line"><span>    Rectangle { top_left: Point, bottom_right: Point }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let shape = Shape.Circle { </span></span>
<span class="line"><span>    center: Point { x: 0, y: 0 }, </span></span>
<span class="line"><span>    radius: 10 </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match shape {</span></span>
<span class="line"><span>    Shape.Circle { center: Point { x: 0, y: 0 }, .. } =&gt; {</span></span>
<span class="line"><span>        println(&quot;Circle at origin&quot;)</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    Shape.Rectangle { top_left: Point { x, y }, .. } =&gt; {</span></span>
<span class="line"><span>        println(f&quot;Rect starts at {x}, {y}&quot;)</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    _ =&gt; println(&quot;Other shape&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Exhaustiveness</strong>: Always handle all cases. Use <code>_</code> wildcard only when necessary.</li><li><strong>Clarity</strong>: Use guards for complex logic instead of convoluted patterns.</li><li><strong>Destructuring</strong>: Use destructuring to extract values directly in the match arm.</li></ol>`,30)])])}const g=s(t,[["render",i]]);export{h as __pageData,g as default};
