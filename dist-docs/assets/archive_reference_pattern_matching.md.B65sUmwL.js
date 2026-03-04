import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Pattern Matching","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/pattern_matching.md","filePath":"archive/reference/pattern_matching.md"}'),t={name:"archive/reference/pattern_matching.md"};function l(i,a,c,r,o,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="pattern-matching" tabindex="-1">Pattern Matching <a class="header-anchor" href="#pattern-matching" aria-label="Permalink to &quot;Pattern Matching&quot;">​</a></h1><p><strong>Version:</strong> 0.1.0<br><strong>Last Updated:</strong> November 3, 2025</p><p>This document defines pattern matching and destructuring in the Vex programming language.</p><hr><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ol><li><a href="#match-expression">Match Expression</a></li><li><a href="#pattern-types">Pattern Types</a></li><li><a href="#destructuring">Destructuring</a></li><li><a href="#exhaustiveness-checking">Exhaustiveness Checking</a></li><li><a href="#pattern-guards">Pattern Guards</a></li><li><a href="#advanced-patterns">Advanced Patterns</a></li></ol><hr><h2 id="match-expression" tabindex="-1">Match Expression <a class="header-anchor" href="#match-expression" aria-label="Permalink to &quot;Match Expression&quot;">​</a></h2><h3 id="basic-syntax" tabindex="-1">Basic Syntax <a class="header-anchor" href="#basic-syntax" aria-label="Permalink to &quot;Basic Syntax&quot;">​</a></h3><p><strong>Syntax</strong>: <code>match value { pattern =&gt; body }</code></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match x {</span></span>
<span class="line"><span>    pattern1 =&gt; { /* body 1 */ }</span></span>
<span class="line"><span>    pattern2 =&gt; { /* body 2 */ }</span></span>
<span class="line"><span>    _ =&gt; { /* default */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Properties</strong>:</p><ul><li>Must be exhaustive (all cases covered)</li><li>Evaluates top-to-bottom (first match wins)</li><li>Each arm returns a value (future: match as expression)</li><li>Wildcard <code>_</code> matches anything</li></ul><h3 id="simple-example" tabindex="-1">Simple Example <a class="header-anchor" href="#simple-example" aria-label="Permalink to &quot;Simple Example&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x = 5;</span></span>
<span class="line"><span>match x {</span></span>
<span class="line"><span>    0 =&gt; { /* zero */ }</span></span>
<span class="line"><span>    1 =&gt; { /* one */ }</span></span>
<span class="line"><span>    5 =&gt; { /* five */ }</span></span>
<span class="line"><span>    _ =&gt; { /* other */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="pattern-types" tabindex="-1">Pattern Types <a class="header-anchor" href="#pattern-types" aria-label="Permalink to &quot;Pattern Types&quot;">​</a></h2><h3 id="literal-patterns" tabindex="-1">Literal Patterns <a class="header-anchor" href="#literal-patterns" aria-label="Permalink to &quot;Literal Patterns&quot;">​</a></h3><p>Match against specific values:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match status_code {</span></span>
<span class="line"><span>    200 =&gt; { /* OK */ }</span></span>
<span class="line"><span>    404 =&gt; { /* Not Found */ }</span></span>
<span class="line"><span>    500 =&gt; { /* Server Error */ }</span></span>
<span class="line"><span>    _ =&gt; { /* Other */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Supported Literals</strong>:</p><ul><li>Integers: <code>0</code>, <code>42</code>, <code>-10</code></li><li>Booleans: <code>true</code>, <code>false</code></li><li>Strings: <code>&quot;hello&quot;</code> (future)</li><li>Floats: Limited support (comparison issues)</li></ul><h3 id="variable-patterns" tabindex="-1">Variable Patterns <a class="header-anchor" href="#variable-patterns" aria-label="Permalink to &quot;Variable Patterns&quot;">​</a></h3><p>Bind matched value to variable:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match x {</span></span>
<span class="line"><span>    n =&gt; {</span></span>
<span class="line"><span>        // n binds to x&#39;s value</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match age {</span></span>
<span class="line"><span>    a =&gt; {</span></span>
<span class="line"><span>        // a = age</span></span>
<span class="line"><span>        return a * 2;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="wildcard-pattern" tabindex="-1">Wildcard Pattern <a class="header-anchor" href="#wildcard-pattern" aria-label="Permalink to &quot;Wildcard Pattern&quot;">​</a></h3><p>Match and discard value:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match result {</span></span>
<span class="line"><span>    0 =&gt; { /* success */ }</span></span>
<span class="line"><span>    _ =&gt; { /* any error */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Use Cases</strong>:</p><ul><li>Default/catch-all case</li><li>Ignoring specific values</li><li>Exhaustiveness completion</li></ul><h3 id="enum-patterns" tabindex="-1">Enum Patterns <a class="header-anchor" href="#enum-patterns" aria-label="Permalink to &quot;Enum Patterns&quot;">​</a></h3><p>Match enum variants:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Color {</span></span>
<span class="line"><span>    Red,</span></span>
<span class="line"><span>    Green,</span></span>
<span class="line"><span>    Blue,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match color {</span></span>
<span class="line"><span>    Red =&gt; { /* red */ }</span></span>
<span class="line"><span>    Green =&gt; { /* green */ }</span></span>
<span class="line"><span>    Blue =&gt; { /* blue */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Must be exhaustive</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ERROR: Missing Blue</span></span>
<span class="line"><span>match color {</span></span>
<span class="line"><span>    Red =&gt; { }</span></span>
<span class="line"><span>    Green =&gt; { }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="or-patterns" tabindex="-1">Or Patterns <a class="header-anchor" href="#or-patterns" aria-label="Permalink to &quot;Or Patterns&quot;">​</a></h3><p>Match multiple patterns:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match day {</span></span>
<span class="line"><span>    1 | 2 | 3 | 4 | 5 =&gt; { /* weekday */ }</span></span>
<span class="line"><span>    6 | 7 =&gt; { /* weekend */ }</span></span>
<span class="line"><span>    _ =&gt; { /* invalid */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Syntax</strong>: <code>pattern1 | pattern2 | ...</code></p><p><strong>Examples</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match status {</span></span>
<span class="line"><span>    Active | Pending =&gt; { /* in progress */ }</span></span>
<span class="line"><span>    Inactive =&gt; { /* done */ }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match x {</span></span>
<span class="line"><span>    0 | 1 | 2 =&gt; { /* low */ }</span></span>
<span class="line"><span>    3 | 4 | 5 =&gt; { /* medium */ }</span></span>
<span class="line"><span>    _ =&gt; { /* high */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="destructuring" tabindex="-1">Destructuring <a class="header-anchor" href="#destructuring" aria-label="Permalink to &quot;Destructuring&quot;">​</a></h2><h3 id="tuple-destructuring" tabindex="-1">Tuple Destructuring <a class="header-anchor" href="#tuple-destructuring" aria-label="Permalink to &quot;Tuple Destructuring&quot;">​</a></h3><p>Extract tuple components:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let point = (10, 20);</span></span>
<span class="line"><span>match point {</span></span>
<span class="line"><span>    (x, y) =&gt; {</span></span>
<span class="line"><span>        // x = 10, y = 20</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Multiple Patterns</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match pair {</span></span>
<span class="line"><span>    (0, 0) =&gt; { /* origin */ }</span></span>
<span class="line"><span>    (0, y) =&gt; { /* on y-axis, y is bound */ }</span></span>
<span class="line"><span>    (x, 0) =&gt; { /* on x-axis, x is bound */ }</span></span>
<span class="line"><span>    (x, y) =&gt; { /* general point */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Ignoring Components</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match triple {</span></span>
<span class="line"><span>    (x, _, z) =&gt; {</span></span>
<span class="line"><span>        // Only x and z are bound, middle ignored</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="struct-destructuring" tabindex="-1">Struct Destructuring <a class="header-anchor" href="#struct-destructuring" aria-label="Permalink to &quot;Struct Destructuring&quot;">​</a></h3><p><strong>Status</strong>: ✅ <strong>COMPLETE</strong> (v0.2.0)</p><p>Extract struct fields in pattern matching:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point { x: f32, y: f32 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match point {</span></span>
<span class="line"><span>    Point { x, y } =&gt; {</span></span>
<span class="line"><span>        // x and y are bound from point.x and point.y</span></span>
<span class="line"><span>        (x);</span></span>
<span class="line"><span>        (y);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Nested Destructuring</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Line {</span></span>
<span class="line"><span>    start: Point,</span></span>
<span class="line"><span>    end: Point</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match line {</span></span>
<span class="line"><span>    Line { start, end } =&gt; {</span></span>
<span class="line"><span>        match start {</span></span>
<span class="line"><span>            Point { x: x1, y: y1 } =&gt; {</span></span>
<span class="line"><span>                match end {</span></span>
<span class="line"><span>                    Point { x: x2, y: y2 } =&gt; {</span></span>
<span class="line"><span>                        // Access nested fields</span></span>
<span class="line"><span>                        (x1);</span></span>
<span class="line"><span>                        (y2);</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                };</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Field Renaming</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match point {</span></span>
<span class="line"><span>    Point { x: px, y: py } =&gt; {</span></span>
<span class="line"><span>        // Bind point.x to px, point.y to py</span></span>
<span class="line"><span>        (px);</span></span>
<span class="line"><span>        (py);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Use Cases</strong>:</p><ul><li>Extract specific fields from structs</li><li>Validate struct values with guards</li><li>Destructure function parameters (future)</li><li>Pattern matching in match expressions</li></ul><p><strong>Examples</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn distance(p: Point): f32 {</span></span>
<span class="line"><span>    match p {</span></span>
<span class="line"><span>        Point { x, y } =&gt; {</span></span>
<span class="line"><span>            return (x * x + y * y);  // Simplified distance</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn origin_check(p: Point): bool {</span></span>
<span class="line"><span>    match p {</span></span>
<span class="line"><span>        Point { x, y } =&gt; {</span></span>
<span class="line"><span>            if x == 0.0 &amp;&amp; y == 0.0 {</span></span>
<span class="line"><span>                return true;</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                return false;</span></span>
<span class="line"><span>            };</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn quadrant(p: Point): i32 {</span></span>
<span class="line"><span>    match p {</span></span>
<span class="line"><span>        Point { x, y } =&gt; {</span></span>
<span class="line"><span>            if x &gt; 0.0 &amp;&amp; y &gt; 0.0 {</span></span>
<span class="line"><span>                return 1;</span></span>
<span class="line"><span>            } else if x &lt; 0.0 &amp;&amp; y &gt; 0.0 {</span></span>
<span class="line"><span>                return 2;</span></span>
<span class="line"><span>            } else if x &lt; 0.0 &amp;&amp; y &lt; 0.0 {</span></span>
<span class="line"><span>                return 3;</span></span>
<span class="line"><span>            } else if x &gt; 0.0 &amp;&amp; y &lt; 0.0 {</span></span>
<span class="line"><span>                return 4;</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                return 0;  // On axis</span></span>
<span class="line"><span>            };</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Implementation Details</strong>:</p><ul><li><strong>Parser</strong>: <code>vex-parser/src/parser/patterns.rs</code> - Parses <code>Struct { field1, field2 }</code> syntax</li><li><strong>AST</strong>: <code>vex-ast/src/lib.rs</code> - <code>Pattern::Struct { name, fields }</code></li><li><strong>Pattern checking</strong>: <code>vex-compiler/src/codegen_ast/expressions/pattern_matching.rs</code></li><li><strong>Pattern binding</strong>: Extract field values and bind to variables</li><li><strong>Test file</strong>: <code>examples/test_struct_patterns.vx</code></li></ul><p><strong>Partial Destructuring</strong> (Future):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match person {</span></span>
<span class="line"><span>    Person { name, .. } =&gt; {</span></span>
<span class="line"><span>        // Only extract name, ignore other fields</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="array-slice-destructuring-future" tabindex="-1">Array/Slice Destructuring (Future) <a class="header-anchor" href="#array-slice-destructuring-future" aria-label="Permalink to &quot;Array/Slice Destructuring (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match arr {</span></span>
<span class="line"><span>    [first, second, third] =&gt; { /* exactly 3 elements */ }</span></span>
<span class="line"><span>    [head, ..] =&gt; { /* at least 1 element */ }</span></span>
<span class="line"><span>    [.., last] =&gt; { /* at least 1 element */ }</span></span>
<span class="line"><span>    [first, .., last] =&gt; { /* at least 2 elements */ }</span></span>
<span class="line"><span>    [] =&gt; { /* empty */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="enum-destructuring" tabindex="-1">Enum Destructuring <a class="header-anchor" href="#enum-destructuring" aria-label="Permalink to &quot;Enum Destructuring&quot;">​</a></h3><p><strong>Status</strong>: ✅ <strong>COMPLETE</strong> (v0.2.0)</p><p>Data-carrying enums:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Option&lt;T&gt; {</span></span>
<span class="line"><span>    Some(T),</span></span>
<span class="line"><span>    None,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match value {</span></span>
<span class="line"><span>    Some(x) =&gt; {</span></span>
<span class="line"><span>        // x contains the wrapped value</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    None =&gt; {</span></span>
<span class="line"><span>        // No value</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Complex Enums</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Message {</span></span>
<span class="line"><span>    Move { x: i32, y: i32 },</span></span>
<span class="line"><span>    Write(string),</span></span>
<span class="line"><span>    ChangeColor(i32, i32, i32),</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match msg {</span></span>
<span class="line"><span>    Move { x, y } =&gt; { /* x, y bound */ }</span></span>
<span class="line"><span>    Write(text) =&gt; { /* text bound */ }</span></span>
<span class="line"><span>    ChangeColor(r, g, b) =&gt; { /* r, g, b bound */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="exhaustiveness-checking" tabindex="-1">Exhaustiveness Checking <a class="header-anchor" href="#exhaustiveness-checking" aria-label="Permalink to &quot;Exhaustiveness Checking&quot;">​</a></h2><h3 id="requirement" tabindex="-1">Requirement <a class="header-anchor" href="#requirement" aria-label="Permalink to &quot;Requirement&quot;">​</a></h3><p>Match expressions must handle all possible cases:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Status {</span></span>
<span class="line"><span>    Active,</span></span>
<span class="line"><span>    Inactive,</span></span>
<span class="line"><span>    Pending,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// OK: All variants covered</span></span>
<span class="line"><span>match status {</span></span>
<span class="line"><span>    Active =&gt; { }</span></span>
<span class="line"><span>    Inactive =&gt; { }</span></span>
<span class="line"><span>    Pending =&gt; { }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// OK: Wildcard covers remaining</span></span>
<span class="line"><span>match status {</span></span>
<span class="line"><span>    Active =&gt; { }</span></span>
<span class="line"><span>    _ =&gt; { /* Inactive and Pending */ }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ERROR: Missing Pending</span></span>
<span class="line"><span>match status {</span></span>
<span class="line"><span>    Active =&gt; { }</span></span>
<span class="line"><span>    Inactive =&gt; { }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="compiler-errors" tabindex="-1">Compiler Errors <a class="header-anchor" href="#compiler-errors" aria-label="Permalink to &quot;Compiler Errors&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Error: Match is not exhaustive</span></span>
<span class="line"><span>  --&gt; example.vx:10:5</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>10 |     match status {</span></span>
<span class="line"><span>   |     ^^^^^ missing Pending</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   = help: ensure all variants are covered or add a wildcard pattern</span></span></code></pre></div><h3 id="integer-exhaustiveness" tabindex="-1">Integer Exhaustiveness <a class="header-anchor" href="#integer-exhaustiveness" aria-label="Permalink to &quot;Integer Exhaustiveness&quot;">​</a></h3><p>For integers, wildcard required:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// OK: Wildcard covers all other values</span></span>
<span class="line"><span>match x {</span></span>
<span class="line"><span>    0 =&gt; { }</span></span>
<span class="line"><span>    1 =&gt; { }</span></span>
<span class="line"><span>    _ =&gt; { }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ERROR: Cannot cover all i32 values</span></span>
<span class="line"><span>match x {</span></span>
<span class="line"><span>    0 =&gt; { }</span></span>
<span class="line"><span>    1 =&gt; { }</span></span>
<span class="line"><span>    2 =&gt; { }</span></span>
<span class="line"><span>    // Missing billions of other values</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="pattern-guards" tabindex="-1">Pattern Guards <a class="header-anchor" href="#pattern-guards" aria-label="Permalink to &quot;Pattern Guards&quot;">​</a></h2><h3 id="definition" tabindex="-1">Definition <a class="header-anchor" href="#definition" aria-label="Permalink to &quot;Definition&quot;">​</a></h3><p>Add conditions to patterns:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match x {</span></span>
<span class="line"><span>    n if n &lt; 0 =&gt; { /* negative */ }</span></span>
<span class="line"><span>    n if n == 0 =&gt; { /* zero */ }</span></span>
<span class="line"><span>    n if n &gt; 0 =&gt; { /* positive */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Syntax</strong>: <code>pattern if condition</code></p><h3 id="complex-guards" tabindex="-1">Complex Guards <a class="header-anchor" href="#complex-guards" aria-label="Permalink to &quot;Complex Guards&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match pair {</span></span>
<span class="line"><span>    (x, y) if x == y =&gt; { /* equal */ }</span></span>
<span class="line"><span>    (x, y) if x &gt; y =&gt; { /* first larger */ }</span></span>
<span class="line"><span>    (x, y) =&gt; { /* second larger or equal */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="with-enums" tabindex="-1">With Enums <a class="header-anchor" href="#with-enums" aria-label="Permalink to &quot;With Enums&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match option {</span></span>
<span class="line"><span>    Some(x) if x &gt; 10 =&gt; { /* large value */ }</span></span>
<span class="line"><span>    Some(x) =&gt; { /* small value */ }</span></span>
<span class="line"><span>    None =&gt; { /* no value */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="advanced-patterns" tabindex="-1">Advanced Patterns <a class="header-anchor" href="#advanced-patterns" aria-label="Permalink to &quot;Advanced Patterns&quot;">​</a></h2><h3 id="range-patterns" tabindex="-1">Range Patterns <a class="header-anchor" href="#range-patterns" aria-label="Permalink to &quot;Range Patterns&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match age {</span></span>
<span class="line"><span>    0..=12 =&gt; { /* child */ }</span></span>
<span class="line"><span>    13..=17 =&gt; { /* teen */ }</span></span>
<span class="line"><span>    18..=64 =&gt; { /* adult */ }</span></span>
<span class="line"><span>    65.. =&gt; { /* senior */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Syntax</strong>:</p><ul><li><code>a..b</code> - Exclusive end (a &lt;= x &lt; b)</li><li><code>a..=b</code> - Inclusive end (a &lt;= x &lt;= b)</li><li><code>..b</code> - Up to b</li><li><code>a..</code> - From a onwards</li></ul><h3 id="reference-patterns-future" tabindex="-1">Reference Patterns (Future) <a class="header-anchor" href="#reference-patterns-future" aria-label="Permalink to &quot;Reference Patterns (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match &amp;value {</span></span>
<span class="line"><span>    &amp;x =&gt; {</span></span>
<span class="line"><span>        // x is a reference</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="nested-patterns-future" tabindex="-1">Nested Patterns (Future) <a class="header-anchor" href="#nested-patterns-future" aria-label="Permalink to &quot;Nested Patterns (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match nested {</span></span>
<span class="line"><span>    (Point { x, y }, Some(value)) =&gt; {</span></span>
<span class="line"><span>        // Destructure tuple and Point and Option</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-match" tabindex="-1">Basic Match <a class="header-anchor" href="#basic-match" aria-label="Permalink to &quot;Basic Match&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn classify(x: i32): i32 {</span></span>
<span class="line"><span>    match x {</span></span>
<span class="line"><span>        0 =&gt; {</span></span>
<span class="line"><span>            return 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        1 | 2 | 3 =&gt; {</span></span>
<span class="line"><span>            return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        _ =&gt; {</span></span>
<span class="line"><span>            return 2;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="enum-matching" tabindex="-1">Enum Matching <a class="header-anchor" href="#enum-matching" aria-label="Permalink to &quot;Enum Matching&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Color {</span></span>
<span class="line"><span>    Red,</span></span>
<span class="line"><span>    Green,</span></span>
<span class="line"><span>    Blue,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn color_code(c: Color): i32 {</span></span>
<span class="line"><span>    match c {</span></span>
<span class="line"><span>        Red =&gt; { return 0; }</span></span>
<span class="line"><span>        Green =&gt; { return 1; }</span></span>
<span class="line"><span>        Blue =&gt; { return 2; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="tuple-destructuring-1" tabindex="-1">Tuple Destructuring <a class="header-anchor" href="#tuple-destructuring-1" aria-label="Permalink to &quot;Tuple Destructuring&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process_pair(pair: (i32, i32)): i32 {</span></span>
<span class="line"><span>    match pair {</span></span>
<span class="line"><span>        (0, 0) =&gt; {</span></span>
<span class="line"><span>            return 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        (x, 0) =&gt; {</span></span>
<span class="line"><span>            return x;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        (0, y) =&gt; {</span></span>
<span class="line"><span>            return y;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        (x, y) =&gt; {</span></span>
<span class="line"><span>            return x + y;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="or-patterns-1" tabindex="-1">Or Patterns <a class="header-anchor" href="#or-patterns-1" aria-label="Permalink to &quot;Or Patterns&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn is_weekend(day: i32): bool {</span></span>
<span class="line"><span>    match day {</span></span>
<span class="line"><span>        6 | 7 =&gt; {</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        _ =&gt; {</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><h3 id="_1-use-match-for-enums" tabindex="-1">1. Use Match for Enums <a class="header-anchor" href="#_1-use-match-for-enums" aria-label="Permalink to &quot;1. Use Match for Enums&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Clear, exhaustive</span></span>
<span class="line"><span>match status {</span></span>
<span class="line"><span>    Active =&gt; { }</span></span>
<span class="line"><span>    Inactive =&gt; { }</span></span>
<span class="line"><span>    Pending =&gt; { }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Error-prone if-else chain</span></span>
<span class="line"><span>if status == Active {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>} elif status == Inactive {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-specific-before-general" tabindex="-1">2. Specific Before General <a class="header-anchor" href="#_2-specific-before-general" aria-label="Permalink to &quot;2. Specific Before General&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Specific patterns first</span></span>
<span class="line"><span>match x {</span></span>
<span class="line"><span>    0 =&gt; { /* exact match */ }</span></span>
<span class="line"><span>    1 | 2 | 3 =&gt; { /* range */ }</span></span>
<span class="line"><span>    _ =&gt; { /* default */ }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: General pattern first (unreachable)</span></span>
<span class="line"><span>match x {</span></span>
<span class="line"><span>    _ =&gt; { /* catches everything */ }</span></span>
<span class="line"><span>    0 =&gt; { /* never reached! */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-use-destructuring" tabindex="-1">3. Use Destructuring <a class="header-anchor" href="#_3-use-destructuring" aria-label="Permalink to &quot;3. Use Destructuring&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Extract in match</span></span>
<span class="line"><span>match point {</span></span>
<span class="line"><span>    (x, y) =&gt; {</span></span>
<span class="line"><span>        use_coordinates(x, y);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Manual extraction</span></span>
<span class="line"><span>match point {</span></span>
<span class="line"><span>    p =&gt; {</span></span>
<span class="line"><span>        let x = p.0;</span></span>
<span class="line"><span>        let y = p.1;</span></span>
<span class="line"><span>        use_coordinates(x, y);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-avoid-deep-nesting" tabindex="-1">4. Avoid Deep Nesting <a class="header-anchor" href="#_4-avoid-deep-nesting" aria-label="Permalink to &quot;4. Avoid Deep Nesting&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Flat structure</span></span>
<span class="line"><span>match outer {</span></span>
<span class="line"><span>    Some(inner) =&gt; {</span></span>
<span class="line"><span>        process(inner);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    None =&gt; { }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Deep nesting</span></span>
<span class="line"><span>match outer {</span></span>
<span class="line"><span>    Some(x) =&gt; {</span></span>
<span class="line"><span>        match inner {</span></span>
<span class="line"><span>            Some(y) =&gt; {</span></span>
<span class="line"><span>                match another {</span></span>
<span class="line"><span>                    // Too deep</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_5-use-wildcard-for-defaults" tabindex="-1">5. Use Wildcard for Defaults <a class="header-anchor" href="#_5-use-wildcard-for-defaults" aria-label="Permalink to &quot;5. Use Wildcard for Defaults&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Clear default case</span></span>
<span class="line"><span>match error_code {</span></span>
<span class="line"><span>    0 =&gt; { /* success */ }</span></span>
<span class="line"><span>    _ =&gt; { /* any error */ }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Listing all error codes</span></span>
<span class="line"><span>match error_code {</span></span>
<span class="line"><span>    0 =&gt; { /* success */ }</span></span>
<span class="line"><span>    1 =&gt; { /* error */ }</span></span>
<span class="line"><span>    2 =&gt; { /* error */ }</span></span>
<span class="line"><span>    // ... hundreds of error codes</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="pattern-matching-summary" tabindex="-1">Pattern Matching Summary <a class="header-anchor" href="#pattern-matching-summary" aria-label="Permalink to &quot;Pattern Matching Summary&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Pattern Type</th><th>Syntax</th><th>Status</th><th>Example</th></tr></thead><tbody><tr><td>Literal</td><td><code>42</code>, <code>true</code>, <code>&quot;text&quot;</code></td><td>✅ Working</td><td>Exact value match</td></tr><tr><td>Variable</td><td><code>x</code>, <code>name</code></td><td>✅ Working</td><td>Bind to variable</td></tr><tr><td>Wildcard</td><td><code>_</code></td><td>✅ Working</td><td>Match anything</td></tr><tr><td>Enum</td><td><code>Red</code>, <code>Active</code></td><td>✅ Working</td><td>Enum variant (no :: syntax)</td></tr><tr><td>Or</td><td><code>1 | 2 | 3</code></td><td>✅ Working</td><td>Multiple patterns</td></tr><tr><td>Tuple</td><td><code>(x, y)</code></td><td>✅ Working</td><td>Destructure tuples</td></tr><tr><td>Struct</td><td><code>Point { x, y }</code></td><td>✅ Complete (v0.2.0)</td><td>Destructure structs</td></tr><tr><td>Array</td><td><code>[a, b, c]</code></td><td>✅ Working</td><td>Fixed-size arrays</td></tr><tr><td>Slice</td><td><code>[head, ...rest]</code></td><td>✅ Working</td><td>Rest patterns with <code>...</code></td></tr><tr><td>Enum Data</td><td><code>Some(x)</code>, <code>None</code></td><td>✅ Working</td><td>Data-carrying enums working</td></tr><tr><td>Range</td><td><code>0..10</code>, <code>0..=10</code></td><td>✅ Working</td><td>Value ranges with .. and ..=</td></tr><tr><td>Guard</td><td><code>x if x &gt; 0</code></td><td>✅ Working</td><td>Conditional patterns</td></tr><tr><td>Reference</td><td><code>&amp;x</code></td><td>🚧 Future</td><td>Match references</td></tr></tbody></table><hr><p><strong>Previous</strong>: <a href="./10_Generics">10_Generics.md</a><br><strong>Next</strong>: <a href="./12_Closures_and_Lambda_Expressions">12_Closures_and_Lambda_Expressions.md</a></p><p><strong>Maintained by</strong>: Vex Language Team</p>`,134)])])}const g=s(t,[["render",l]]);export{u as __pageData,g as default};
