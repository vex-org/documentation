import{_ as a,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Control Flow","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/control_flow.md","filePath":"archive/reference/control_flow.md"}'),t={name:"archive/reference/control_flow.md"};function l(i,s,o,c,r,d){return n(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="control-flow" tabindex="-1">Control Flow <a class="header-anchor" href="#control-flow" aria-label="Permalink to &quot;Control Flow&quot;">​</a></h1><p><strong>Version:</strong> 0.1.0<br><strong>Last Updated:</strong> November 3, 2025</p><p>This document defines control flow constructs in the Vex programming language.</p><hr><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ol><li><a href="#conditional-statements">Conditional Statements</a></li><li><a href="#pattern-matching">Pattern Matching</a></li><li><a href="#loops">Loops</a></li><li><a href="#control-transfer">Control Transfer</a></li><li><a href="#defer-statement">Defer Statement</a></li><li><a href="#error-handling">Error Handling</a></li></ol><hr><h2 id="conditional-statements" tabindex="-1">Conditional Statements <a class="header-anchor" href="#conditional-statements" aria-label="Permalink to &quot;Conditional Statements&quot;">​</a></h2><h3 id="if-expression" tabindex="-1">If Expression <a class="header-anchor" href="#if-expression" aria-label="Permalink to &quot;If Expression&quot;">​</a></h3><p><strong>Basic Syntax</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if condition {</span></span>
<span class="line"><span>    // body</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Properties</strong>:</p><ul><li>Condition must be <code>bool</code> type (no implicit conversion)</li><li>Braces are required (no braceless syntax)</li><li>Body is a new scope</li></ul><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x = 10;</span></span>
<span class="line"><span>if x &gt; 5 {</span></span>
<span class="line"><span>    // x is greater than 5</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="if-else" tabindex="-1">If-Else <a class="header-anchor" href="#if-else" aria-label="Permalink to &quot;If-Else&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if condition {</span></span>
<span class="line"><span>    // true branch</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    // false branch</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let age = 18;</span></span>
<span class="line"><span>if age &gt;= 18 {</span></span>
<span class="line"><span>    // adult</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    // minor</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="if-elif-else-chain-v0-1" tabindex="-1">If-Elif-Else Chain (v0.1) <a class="header-anchor" href="#if-elif-else-chain-v0-1" aria-label="Permalink to &quot;If-Elif-Else Chain (v0.1)&quot;">​</a></h3><p>Use <code>elif</code> for else-if chains:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if condition1 {</span></span>
<span class="line"><span>    // first branch</span></span>
<span class="line"><span>} elif condition2 {</span></span>
<span class="line"><span>    // second branch</span></span>
<span class="line"><span>} elif condition3 {</span></span>
<span class="line"><span>    // third branch</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    // default branch</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let score = 85;</span></span>
<span class="line"><span>if score &gt;= 90 {</span></span>
<span class="line"><span>    // grade A</span></span>
<span class="line"><span>} elif score &gt;= 80 {</span></span>
<span class="line"><span>    // grade B</span></span>
<span class="line"><span>} elif score &gt;= 70 {</span></span>
<span class="line"><span>    // grade C</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    // grade F</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Note</strong>: <code>elif</code> keyword introduced in v0.1 (replaces older <code>else if</code> syntax)</p><h3 id="nested-if" tabindex="-1">Nested If <a class="header-anchor" href="#nested-if" aria-label="Permalink to &quot;Nested If&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if outer_condition {</span></span>
<span class="line"><span>    if inner_condition {</span></span>
<span class="line"><span>        // nested body</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let age = 20;</span></span>
<span class="line"><span>let has_license = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if age &gt;= 18 {</span></span>
<span class="line"><span>    if has_license {</span></span>
<span class="line"><span>        // can drive</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="if-as-expression-future" tabindex="-1">If as Expression (Future) <a class="header-anchor" href="#if-as-expression-future" aria-label="Permalink to &quot;If as Expression (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let value = if condition { 10 } else { 20 };</span></span></code></pre></div><h3 id="switch-statement" tabindex="-1">Switch Statement <a class="header-anchor" href="#switch-statement" aria-label="Permalink to &quot;Switch Statement&quot;">​</a></h3><p><strong>Syntax</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>switch value {</span></span>
<span class="line"><span>    case 1, 2: {</span></span>
<span class="line"><span>        // handle 1 or 2</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    case 3: {</span></span>
<span class="line"><span>        // handle 3</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    default: {</span></span>
<span class="line"><span>        // handle others</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Properties</strong>:</p><ul><li>C-style switch but with block scopes for cases.</li><li>Supports multiple values per case (<code>case 1, 2:</code>).</li><li><code>default</code> case is optional.</li></ul><hr><h2 id="pattern-matching" tabindex="-1">Pattern Matching <a class="header-anchor" href="#pattern-matching" aria-label="Permalink to &quot;Pattern Matching&quot;">​</a></h2><h3 id="match-expression" tabindex="-1">Match Expression <a class="header-anchor" href="#match-expression" aria-label="Permalink to &quot;Match Expression&quot;">​</a></h3><p><strong>Syntax</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match value {</span></span>
<span class="line"><span>    pattern1 =&gt; { body1 }</span></span>
<span class="line"><span>    pattern2 =&gt; { body2 }</span></span>
<span class="line"><span>    _ =&gt; { default }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Properties</strong>:</p><ul><li>Must be exhaustive (all cases covered)</li><li>Evaluates top-to-bottom (first match wins)</li><li><code>_</code> is wildcard pattern (matches anything)</li></ul><h3 id="literal-patterns" tabindex="-1">Literal Patterns <a class="header-anchor" href="#literal-patterns" aria-label="Permalink to &quot;Literal Patterns&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match x {</span></span>
<span class="line"><span>    0 =&gt; { /* zero */ }</span></span>
<span class="line"><span>    1 =&gt; { /* one */ }</span></span>
<span class="line"><span>    2 =&gt; { /* two */ }</span></span>
<span class="line"><span>    _ =&gt; { /* other */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let day = 3;</span></span>
<span class="line"><span>match day {</span></span>
<span class="line"><span>    1 =&gt; { /* Monday */ }</span></span>
<span class="line"><span>    2 =&gt; { /* Tuesday */ }</span></span>
<span class="line"><span>    3 =&gt; { /* Wednesday */ }</span></span>
<span class="line"><span>    4 =&gt; { /* Thursday */ }</span></span>
<span class="line"><span>    5 =&gt; { /* Friday */ }</span></span>
<span class="line"><span>    6 =&gt; { /* Saturday */ }</span></span>
<span class="line"><span>    7 =&gt; { /* Sunday */ }</span></span>
<span class="line"><span>    _ =&gt; { /* invalid */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="enum-patterns" tabindex="-1">Enum Patterns <a class="header-anchor" href="#enum-patterns" aria-label="Permalink to &quot;Enum Patterns&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Color {</span></span>
<span class="line"><span>    Red,</span></span>
<span class="line"><span>    Green,</span></span>
<span class="line"><span>    Blue,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let color = Color.Red;</span></span>
<span class="line"><span>match color {</span></span>
<span class="line"><span>    Color.Red =&gt; { /* red */ }</span></span>
<span class="line"><span>    Color.Green =&gt; { /* green */ }</span></span>
<span class="line"><span>    Color.Blue =&gt; { /* blue */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Exhaustiveness Check</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match color {</span></span>
<span class="line"><span>    Color.Red =&gt; { }</span></span>
<span class="line"><span>    Color.Green =&gt; { }</span></span>
<span class="line"><span>    // ERROR: Missing Color.Blue case</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="or-patterns-v0-1" tabindex="-1">Or Patterns (v0.1) <a class="header-anchor" href="#or-patterns-v0-1" aria-label="Permalink to &quot;Or Patterns (v0.1)&quot;">​</a></h3><p>Match multiple patterns with <code>|</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match x {</span></span>
<span class="line"><span>    1 | 2 | 3 =&gt; { /* low */ }</span></span>
<span class="line"><span>    4 | 5 | 6 =&gt; { /* medium */ }</span></span>
<span class="line"><span>    7 | 8 | 9 =&gt; { /* high */ }</span></span>
<span class="line"><span>    _ =&gt; { /* other */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match day {</span></span>
<span class="line"><span>    1 | 2 | 3 | 4 | 5 =&gt; { /* weekday */ }</span></span>
<span class="line"><span>    6 | 7 =&gt; { /* weekend */ }</span></span>
<span class="line"><span>    _ =&gt; { /* invalid */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="tuple-patterns" tabindex="-1">Tuple Patterns <a class="header-anchor" href="#tuple-patterns" aria-label="Permalink to &quot;Tuple Patterns&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let point = (10, 20);</span></span>
<span class="line"><span>match point {</span></span>
<span class="line"><span>    (0, 0) =&gt; { /* origin */ }</span></span>
<span class="line"><span>    (0, y) =&gt; { /* on y-axis */ }</span></span>
<span class="line"><span>    (x, 0) =&gt; { /* on x-axis */ }</span></span>
<span class="line"><span>    (x, y) =&gt; { /* general point */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Destructuring</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let pair = (1, 2);</span></span>
<span class="line"><span>match pair {</span></span>
<span class="line"><span>    (a, b) =&gt; {</span></span>
<span class="line"><span>        // a = 1, b = 2</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="struct-patterns-future" tabindex="-1">Struct Patterns (Future) <a class="header-anchor" href="#struct-patterns-future" aria-label="Permalink to &quot;Struct Patterns (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point { x: i32, y: i32 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let p = Point { x: 10, y: 20 };</span></span>
<span class="line"><span>match p {</span></span>
<span class="line"><span>    Point { x: 0, y: 0 } =&gt; { /* origin */ }</span></span>
<span class="line"><span>    Point { x, y: 0 } =&gt; { /* on x-axis, x = 10 */ }</span></span>
<span class="line"><span>    Point { x, y } =&gt; { /* general, x=10, y=20 */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="range-patterns-future" tabindex="-1">Range Patterns (Future) <a class="header-anchor" href="#range-patterns-future" aria-label="Permalink to &quot;Range Patterns (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match age {</span></span>
<span class="line"><span>    0..=12 =&gt; { /* child */ }</span></span>
<span class="line"><span>    13..=17 =&gt; { /* teen */ }</span></span>
<span class="line"><span>    18..=64 =&gt; { /* adult */ }</span></span>
<span class="line"><span>    65.. =&gt; { /* senior */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="guards-future" tabindex="-1">Guards (Future) <a class="header-anchor" href="#guards-future" aria-label="Permalink to &quot;Guards (Future)&quot;">​</a></h3><p>Add conditions to patterns:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match x {</span></span>
<span class="line"><span>    n if n &lt; 0 =&gt; { /* negative */ }</span></span>
<span class="line"><span>    n if n == 0 =&gt; { /* zero */ }</span></span>
<span class="line"><span>    n if n &gt; 0 =&gt; { /* positive */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="data-carrying-enum-patterns-future" tabindex="-1">Data-Carrying Enum Patterns (Future) <a class="header-anchor" href="#data-carrying-enum-patterns-future" aria-label="Permalink to &quot;Data-Carrying Enum Patterns (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Option&lt;T&gt; {</span></span>
<span class="line"><span>    Some(T),</span></span>
<span class="line"><span>    None,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let value = Some(42);</span></span>
<span class="line"><span>match value {</span></span>
<span class="line"><span>    Some(x) =&gt; { /* x = 42 */ }</span></span>
<span class="line"><span>    None =&gt; { /* no value */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="loops" tabindex="-1">Loops <a class="header-anchor" href="#loops" aria-label="Permalink to &quot;Loops&quot;">​</a></h2><h3 id="while-loop" tabindex="-1">While Loop <a class="header-anchor" href="#while-loop" aria-label="Permalink to &quot;While Loop&quot;">​</a></h3><p><strong>Syntax</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while condition {</span></span>
<span class="line"><span>    // body</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! counter = 0;</span></span>
<span class="line"><span>while counter &lt; 10 {</span></span>
<span class="line"><span>    counter = counter + 1;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Infinite Loop</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while true {</span></span>
<span class="line"><span>    // runs forever (until break)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="for-loop-c-style" tabindex="-1">For Loop (C-Style) <a class="header-anchor" href="#for-loop-c-style" aria-label="Permalink to &quot;For Loop (C-Style)&quot;">​</a></h3><p><strong>Syntax</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for init; condition; post {</span></span>
<span class="line"><span>    // body</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for let! i = 0; i &lt; 10; i++ {</span></span>
<span class="line"><span>    (i);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="for-in-loop-range-iterator" tabindex="-1">For-In Loop (Range &amp; Iterator) <a class="header-anchor" href="#for-in-loop-range-iterator" aria-label="Permalink to &quot;For-In Loop (Range &amp; Iterator)&quot;">​</a></h3><p><strong>Syntax</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for variable in iterable {</span></span>
<span class="line"><span>    // body</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Range-Based</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for i in 0..10 {</span></span>
<span class="line"><span>    // i = 0, 1, 2, ..., 9</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! sum = 0;</span></span>
<span class="line"><span>for i in 1..11 {</span></span>
<span class="line"><span>    sum = sum + i;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// sum = 55 (1+2+...+10)</span></span></code></pre></div><p><strong>Inclusive Range</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for i in 0..=10 {</span></span>
<span class="line"><span>    // i = 0, 1, 2, ..., 10 (includes 10)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Operators</strong>:</p><ul><li><code>..</code> - Exclusive range: <code>0..10</code> → 0, 1, 2, ..., 9</li><li><code>..=</code> - Inclusive range: <code>0..=10</code> → 0, 1, 2, ..., 10</li></ul><h3 id="loop-infinite-loop" tabindex="-1">Loop (Infinite Loop) <a class="header-anchor" href="#loop-infinite-loop" aria-label="Permalink to &quot;Loop (Infinite Loop)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>loop {</span></span>
<span class="line"><span>    // runs forever</span></span>
<span class="line"><span>    if condition {</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Equivalent to</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while true {</span></span>
<span class="line"><span>    // body</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="for-each-future" tabindex="-1">For-Each (Future) <a class="header-anchor" href="#for-each-future" aria-label="Permalink to &quot;For-Each (Future)&quot;">​</a></h3><p>Iterate over collections:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let numbers = [1, 2, 3, 4, 5];</span></span>
<span class="line"><span>for num in numbers {</span></span>
<span class="line"><span>    // num = 1, then 2, then 3, ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>With Index</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for (index, value) in numbers.enumerate() {</span></span>
<span class="line"><span>    // index = 0, 1, 2, ...</span></span>
<span class="line"><span>    // value = 1, 2, 3, ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="control-transfer" tabindex="-1">Control Transfer <a class="header-anchor" href="#control-transfer" aria-label="Permalink to &quot;Control Transfer&quot;">​</a></h2><h3 id="break" tabindex="-1">Break <a class="header-anchor" href="#break" aria-label="Permalink to &quot;Break&quot;">​</a></h3><p>Exit from loop early:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! i = 0;</span></span>
<span class="line"><span>while i &lt; 10 {</span></span>
<span class="line"><span>    if i == 5 {</span></span>
<span class="line"><span>        break;  // Exit loop</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    i = i + 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// i = 5</span></span></code></pre></div><p><strong>In Match</strong> (Future):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>while true {</span></span>
<span class="line"><span>    match get_input() {</span></span>
<span class="line"><span>        &quot;quit&quot; =&gt; { break; }</span></span>
<span class="line"><span>        cmd =&gt; { process(cmd); }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="continue" tabindex="-1">Continue <a class="header-anchor" href="#continue" aria-label="Permalink to &quot;Continue&quot;">​</a></h3><p>Skip to next iteration:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>for i in 0..10 {</span></span>
<span class="line"><span>    if i % 2 == 0 {</span></span>
<span class="line"><span>        continue;  // Skip even numbers</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // Only odd numbers reach here</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! count = 0;</span></span>
<span class="line"><span>for i in 1..101 {</span></span>
<span class="line"><span>    if i % 3 == 0 {</span></span>
<span class="line"><span>        continue;  // Skip multiples of 3</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    count = count + 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// count = 67 (100 - 33 multiples of 3)</span></span></code></pre></div><h3 id="return" tabindex="-1">Return <a class="header-anchor" href="#return" aria-label="Permalink to &quot;Return&quot;">​</a></h3><p>Exit from function:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn find(arr: [i32; 10], target: i32): i32 {</span></span>
<span class="line"><span>    for i in 0..10 {</span></span>
<span class="line"><span>        if arr[i] == target {</span></span>
<span class="line"><span>            return i;  // Found, exit function</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return -1;  // Not found</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Early Return</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn validate(x: i32): bool {</span></span>
<span class="line"><span>    if x &lt; 0 {</span></span>
<span class="line"><span>        return false;  // Early exit</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if x &gt; 100 {</span></span>
<span class="line"><span>        return false;  // Early exit</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="labeled-breaks-future" tabindex="-1">Labeled Breaks (Future) <a class="header-anchor" href="#labeled-breaks-future" aria-label="Permalink to &quot;Labeled Breaks (Future)&quot;">​</a></h3><p>Break from nested loops:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&#39;outer: for i in 0..10 {</span></span>
<span class="line"><span>    for j in 0..10 {</span></span>
<span class="line"><span>        if i * j &gt; 50 {</span></span>
<span class="line"><span>            break &#39;outer;  // Break outer loop</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="go-statement-async" tabindex="-1">Go Statement (Async) <a class="header-anchor" href="#go-statement-async" aria-label="Permalink to &quot;Go Statement (Async)&quot;">​</a></h3><p>Execute a function or block asynchronously:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>go process_data();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>go {</span></span>
<span class="line"><span>    // async block</span></span>
<span class="line"><span>    perform_task();</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="error-handling" tabindex="-1">Error Handling <a class="header-anchor" href="#error-handling" aria-label="Permalink to &quot;Error Handling&quot;">​</a></h2><h3 id="result-type-future" tabindex="-1">Result Type (Future) <a class="header-anchor" href="#result-type-future" aria-label="Permalink to &quot;Result Type (Future)&quot;">​</a></h3><p>Use union types for error handling:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>type Result&lt;T&gt; = (T | error);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn divide(a: i32, b: i32): Result&lt;i32&gt; {</span></span>
<span class="line"><span>    if b == 0 {</span></span>
<span class="line"><span>        return &quot;Division by zero&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return a / b;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Pattern Matching on Result</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let result = divide(10, 2);</span></span>
<span class="line"><span>match result {</span></span>
<span class="line"><span>    value when value is i32 =&gt; {</span></span>
<span class="line"><span>        // Success: value = 5</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    err when err is error =&gt; {</span></span>
<span class="line"><span>        // Error: handle err</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="option-type-future" tabindex="-1">Option Type (Future) <a class="header-anchor" href="#option-type-future" aria-label="Permalink to &quot;Option Type (Future)&quot;">​</a></h3><p>Represent optional values:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>type Option&lt;T&gt; = (T | nil);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn find(arr: [i32], target: i32): Option&lt;i32&gt; {</span></span>
<span class="line"><span>    for i in 0..arr.() {</span></span>
<span class="line"><span>        if arr[i] == target {</span></span>
<span class="line"><span>            return i;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return nil;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Unwrapping</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let result = find([1, 2, 3], 2);</span></span>
<span class="line"><span>match result {</span></span>
<span class="line"><span>    index when index is i32 =&gt; { /* found at index */ }</span></span>
<span class="line"><span>    nil =&gt; { /* not found */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="try-expression-experimental" tabindex="-1">Try Expression (Experimental) <a class="header-anchor" href="#try-expression-experimental" aria-label="Permalink to &quot;Try Expression (Experimental)&quot;">​</a></h3><p>Use <code>try</code> to handle errors from functions returning <code>Result</code>.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let value = try risky_operation();</span></span>
<span class="line"><span>// If risky_operation returns Err, current function returns early with that Err.</span></span>
<span class="line"><span>// Similar to Rust&#39;s ? operator but as a keyword prefix.</span></span></code></pre></div><h3 id="try-catch-block" tabindex="-1">Try-Catch Block <a class="header-anchor" href="#try-catch-block" aria-label="Permalink to &quot;Try-Catch Block&quot;">​</a></h3><p>Handle errors locally:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>try {</span></span>
<span class="line"><span>    let result = risky_operation();</span></span>
<span class="line"><span>    process(result);</span></span>
<span class="line"><span>} catch err {</span></span>
<span class="line"><span>    handle_error(err);</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="error-handling-1" tabindex="-1">Error Handling <a class="header-anchor" href="#error-handling-1" aria-label="Permalink to &quot;Error Handling&quot;">​</a></h2><h3 id="result-option" tabindex="-1">Result / Option <a class="header-anchor" href="#result-option" aria-label="Permalink to &quot;Result / Option&quot;">​</a></h3><p>Vex uses <code>Result&lt;T, E&gt;</code> and <code>Option&lt;T&gt;</code> types.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn find_user(id: i32): Option&lt;User&gt; {</span></span>
<span class="line"><span>    if exists(id) {</span></span>
<span class="line"><span>        return Some(load_user(id));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return None;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Pattern Matching</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match find_user(1) {</span></span>
<span class="line"><span>    Some(user) =&gt; { /* found */ }</span></span>
<span class="line"><span>    None =&gt; { /* not found */ }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="the-operator-try" tabindex="-1">The <code>?</code> Operator / <code>try</code> <a class="header-anchor" href="#the-operator-try" aria-label="Permalink to &quot;The \`?\` Operator / \`try\`&quot;">​</a></h3><p>Both <code>?</code> suffix and <code>try</code> prefix are reserved for error propagation.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let user = find_user(1)?; // Returns None early if None</span></span></code></pre></div><h3 id="panic" tabindex="-1">Panic <a class="header-anchor" href="#panic" aria-label="Permalink to &quot;Panic&quot;">​</a></h3><p>Abort program execution:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn unreachable_code() {</span></span>
<span class="line"><span>    @unreachable();  // Compiler hint</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn assert_positive(x: i32) {</span></span>
<span class="line"><span>    if x &lt;= 0 {</span></span>
<span class="line"><span>        (&quot;Value must be positive&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="if-elif-else" tabindex="-1">If-Elif-Else <a class="header-anchor" href="#if-elif-else" aria-label="Permalink to &quot;If-Elif-Else&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn classify_age(age: i32): i32 {</span></span>
<span class="line"><span>    if age &lt; 0 {</span></span>
<span class="line"><span>        return -1;  // Invalid</span></span>
<span class="line"><span>    } elif age &lt; 13 {</span></span>
<span class="line"><span>        return 0;   // Child</span></span>
<span class="line"><span>    } elif age &lt; 20 {</span></span>
<span class="line"><span>        return 1;   // Teen</span></span>
<span class="line"><span>    } elif age &lt; 65 {</span></span>
<span class="line"><span>        return 2;   // Adult</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        return 3;   // Senior</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="match-with-enums" tabindex="-1">Match with Enums <a class="header-anchor" href="#match-with-enums" aria-label="Permalink to &quot;Match with Enums&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Status {</span></span>
<span class="line"><span>    Active = 0,</span></span>
<span class="line"><span>    Inactive = 1,</span></span>
<span class="line"><span>    Pending = 2,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn handle_status(status: Status): i32 {</span></span>
<span class="line"><span>    match status {</span></span>
<span class="line"><span>        Active =&gt; {</span></span>
<span class="line"><span>            return 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        Inactive =&gt; {</span></span>
<span class="line"><span>            return 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        Pending =&gt; {</span></span>
<span class="line"><span>            return -1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="while-loop-1" tabindex="-1">While Loop <a class="header-anchor" href="#while-loop-1" aria-label="Permalink to &quot;While Loop&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn count_down(n: i32): i32 {</span></span>
<span class="line"><span>    let! counter = n;</span></span>
<span class="line"><span>    while counter &gt; 0 {</span></span>
<span class="line"><span>        counter = counter - 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return counter;  // 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="for-loop" tabindex="-1">For Loop <a class="header-anchor" href="#for-loop" aria-label="Permalink to &quot;For Loop&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn sum_range(start: i32, end: i32): i32 {</span></span>
<span class="line"><span>    let! sum = 0;</span></span>
<span class="line"><span>    for i in start..end {</span></span>
<span class="line"><span>        sum = sum + i;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return sum;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    return sum_range(1, 11);  // 55</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="break-and-continue" tabindex="-1">Break and Continue <a class="header-anchor" href="#break-and-continue" aria-label="Permalink to &quot;Break and Continue&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn find_first_even(numbers: [i32; 10]): i32 {</span></span>
<span class="line"><span>    for i in 0..10 {</span></span>
<span class="line"><span>        if numbers[i] % 2 == 1 {</span></span>
<span class="line"><span>            continue;  // Skip odd numbers</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return numbers[i];  // Return first even</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return -1;  // No even number found</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="defer-statement" tabindex="-1">Defer Statement <a class="header-anchor" href="#defer-statement" aria-label="Permalink to &quot;Defer Statement&quot;">​</a></h2><h3 id="syntax" tabindex="-1">Syntax <a class="header-anchor" href="#syntax" aria-label="Permalink to &quot;Syntax&quot;">​</a></h3><p><strong>Purpose</strong>: Execute code when function exits, regardless of how it exits.</p><p><strong>Status</strong>: ✅ Fully implemented - deferred statements execute in LIFO order on function exit</p><p><strong>Keyword</strong>: <code>defer</code></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn example() {</span></span>
<span class="line"><span>    defer cleanup();  // Executes when function returns</span></span>
<span class="line"><span>    // ... function body</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn read_file(path: string): string {</span></span>
<span class="line"><span>    let file = open(path);</span></span>
<span class="line"><span>    defer close(file);  // Always closes, even on error</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if !file.is_valid() {</span></span>
<span class="line"><span>        return &quot;&quot;;  // defer executes before return</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return file.read_all();</span></span>
<span class="line"><span>}  // defer executes here</span></span></code></pre></div><h3 id="multiple-defer-statements" tabindex="-1">Multiple Defer Statements <a class="header-anchor" href="#multiple-defer-statements" aria-label="Permalink to &quot;Multiple Defer Statements&quot;">​</a></h3><p><strong>Execution Order</strong>: LIFO (Last In, First Out) - Reverse order of declaration</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process_data() {</span></span>
<span class="line"><span>    defer (&quot;Step 3: Final cleanup&quot;);</span></span>
<span class="line"><span>    defer (&quot;Step 2: Release lock&quot;);</span></span>
<span class="line"><span>    defer (&quot;Step 1: Close connection&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Function body</span></span>
<span class="line"><span>    (&quot;Processing...&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Output:</span></span>
<span class="line"><span>// Processing...</span></span>
<span class="line"><span>// Step 1: Close connection</span></span>
<span class="line"><span>// Step 2: Release lock</span></span>
<span class="line"><span>// Step 3: Final cleanup</span></span></code></pre></div><h3 id="resource-management" tabindex="-1">Resource Management <a class="header-anchor" href="#resource-management" aria-label="Permalink to &quot;Resource Management&quot;">​</a></h3><p><strong>File Handling</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn copy_file(src: string, dst: string): bool {</span></span>
<span class="line"><span>    let src_file = open(src);</span></span>
<span class="line"><span>    defer close(src_file);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let dst_file = create(dst);</span></span>
<span class="line"><span>    defer close(dst_file);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Both files automatically closed on return</span></span>
<span class="line"><span>    return copy_content(src_file, dst_file);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Memory Management</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process_buffer(): i32 {</span></span>
<span class="line"><span>    let buffer = allocate(1024);</span></span>
<span class="line"><span>    defer free(buffer);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Use buffer...</span></span>
<span class="line"><span>    let result = compute(buffer);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>}  // buffer freed automatically</span></span></code></pre></div><p><strong>Lock Management</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn update_shared_data(mutex: &amp;Mutex!, data: i32) {</span></span>
<span class="line"><span>    mutex.lock();</span></span>
<span class="line"><span>    defer mutex.unlock();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Critical section</span></span>
<span class="line"><span>    shared_value = data;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // mutex unlocked automatically, even if panic occurs</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="defer-with-closures-future" tabindex="-1">Defer with Closures (Future) <a class="header-anchor" href="#defer-with-closures-future" aria-label="Permalink to &quot;Defer with Closures (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn complex_cleanup() {</span></span>
<span class="line"><span>    let! counter = 0;</span></span>
<span class="line"><span>    defer {</span></span>
<span class="line"><span>        // Closure can access function variables</span></span>
<span class="line"><span>        (&quot;Counter was: &quot; + counter);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    counter = 42;</span></span>
<span class="line"><span>}  // Prints: &quot;Counter was: 42&quot;</span></span></code></pre></div><h3 id="error-handling-with-defer" tabindex="-1">Error Handling with Defer <a class="header-anchor" href="#error-handling-with-defer" aria-label="Permalink to &quot;Error Handling with Defer&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn risky_operation(): (i32 | error) {</span></span>
<span class="line"><span>    let resource = acquire();</span></span>
<span class="line"><span>    defer release(resource);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if problem() {</span></span>
<span class="line"><span>        return &quot;Error occurred&quot;;  // defer runs before return</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 42;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="common-patterns" tabindex="-1">Common Patterns <a class="header-anchor" href="#common-patterns" aria-label="Permalink to &quot;Common Patterns&quot;">​</a></h3><p><strong>1. RAII-style Resource Management</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn database_transaction(): bool {</span></span>
<span class="line"><span>    let tx = db.begin_transaction();</span></span>
<span class="line"><span>    defer tx.rollback();  // Safety net</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if !tx.insert(...) {</span></span>
<span class="line"><span>        return false;  // Rollback happens</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    tx.commit();</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>2. Cleanup Stack</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn multi_step_process(): i32 {</span></span>
<span class="line"><span>    let step1 = init_step1();</span></span>
<span class="line"><span>    defer cleanup_step1(step1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let step2 = init_step2();</span></span>
<span class="line"><span>    defer cleanup_step2(step2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let step3 = init_step3();</span></span>
<span class="line"><span>    defer cleanup_step3(step3);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return execute();</span></span>
<span class="line"><span>}  // Cleanup in reverse: step3, step2, step1</span></span></code></pre></div><p><strong>3. Timing and Logging</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn measured_operation() {</span></span>
<span class="line"><span>    let start_time = now();</span></span>
<span class="line"><span>    defer {</span></span>
<span class="line"><span>        let elapsed = now() - start_time;</span></span>
<span class="line"><span>        (&quot;Operation took: &quot; + elapsed + &quot;ms&quot;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Expensive operation</span></span>
<span class="line"><span>    compute_heavy_task();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="comparison-with-other-languages" tabindex="-1">Comparison with Other Languages <a class="header-anchor" href="#comparison-with-other-languages" aria-label="Permalink to &quot;Comparison with Other Languages&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Feature</th><th>Vex</th><th>Go</th><th>Rust</th><th>C++</th></tr></thead><tbody><tr><td><strong>Keyword</strong></td><td><code>defer</code></td><td><code>defer</code></td><td>N/A</td><td>N/A</td></tr><tr><td><strong>RAII</strong></td><td>Manual</td><td>Manual</td><td>Automatic</td><td>Manual</td></tr><tr><td><strong>Execution</strong></td><td>On exit</td><td>On exit</td><td>On drop</td><td>On scope</td></tr><tr><td><strong>Order</strong></td><td>LIFO</td><td>LIFO</td><td>LIFO (drop)</td><td>LIFO</td></tr><tr><td><strong>Closures</strong></td><td>✅ Yes</td><td>✅ Yes</td><td>✅ Yes (Drop)</td><td>✅ Lambda</td></tr></tbody></table><h3 id="implementation-status" tabindex="-1">Implementation Status <a class="header-anchor" href="#implementation-status" aria-label="Permalink to &quot;Implementation Status&quot;">​</a></h3><ul><li>✅ Keyword reserved (<code>defer</code>)</li><li>✅ Parser support (COMPLETE - Nov 9, 2025)</li><li>✅ Codegen implemented (LIFO execution)</li><li>✅ Stack unwinding integration working</li><li><strong>Priority</strong>: ✅ COMPLETE</li></ul><p><strong>Examples</strong>: See <code>examples/defer_*.vx</code> for working demonstrations</p><hr><h3 id="nested-loops" tabindex="-1">Nested Loops <a class="header-anchor" href="#nested-loops" aria-label="Permalink to &quot;Nested Loops&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn matrix_sum(rows: i32, cols: i32): i32 {</span></span>
<span class="line"><span>    let! sum = 0;</span></span>
<span class="line"><span>    for i in 0..rows {</span></span>
<span class="line"><span>        for j in 0..cols {</span></span>
<span class="line"><span>            sum = sum + (i * cols + j);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return sum;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="early-return" tabindex="-1">Early Return <a class="header-anchor" href="#early-return" aria-label="Permalink to &quot;Early Return&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn is_prime(n: i32): bool {</span></span>
<span class="line"><span>    if n &lt;= 1 {</span></span>
<span class="line"><span>        return false;  // Early return</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if n == 2 {</span></span>
<span class="line"><span>        return true;   // Early return</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if n % 2 == 0 {</span></span>
<span class="line"><span>        return false;  // Early return</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Check odd divisors</span></span>
<span class="line"><span>    let! i = 3;</span></span>
<span class="line"><span>    while i * i &lt;= n {</span></span>
<span class="line"><span>        if n % i == 0 {</span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        i = i + 2;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><h3 id="_1-use-match-over-if-chains" tabindex="-1">1. Use Match Over If Chains <a class="header-anchor" href="#_1-use-match-over-if-chains" aria-label="Permalink to &quot;1. Use Match Over If Chains&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Clear, exhaustive</span></span>
<span class="line"><span>match status {</span></span>
<span class="line"><span>    Active =&gt; { }</span></span>
<span class="line"><span>    Inactive =&gt; { }</span></span>
<span class="line"><span>    Pending =&gt; { }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Verbose, error-prone</span></span>
<span class="line"><span>if status == Active {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>} elif status == Inactive {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>} elif status == Pending {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-prefer-early-returns" tabindex="-1">2. Prefer Early Returns <a class="header-anchor" href="#_2-prefer-early-returns" aria-label="Permalink to &quot;2. Prefer Early Returns&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Early validation</span></span>
<span class="line"><span>fn process(x: i32): i32 {</span></span>
<span class="line"><span>    if x &lt; 0 {</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if x == 0 {</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // Main logic</span></span>
<span class="line"><span>    return x * 2;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Deep nesting</span></span>
<span class="line"><span>fn process(x: i32): i32 {</span></span>
<span class="line"><span>    if x &gt;= 0 {</span></span>
<span class="line"><span>        if x != 0 {</span></span>
<span class="line"><span>            // Main logic</span></span>
<span class="line"><span>            return x * 2;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            return 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-avoid-deep-nesting" tabindex="-1">3. Avoid Deep Nesting <a class="header-anchor" href="#_3-avoid-deep-nesting" aria-label="Permalink to &quot;3. Avoid Deep Nesting&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Flat structure</span></span>
<span class="line"><span>fn validate(x: i32, y: i32, z: i32): bool {</span></span>
<span class="line"><span>    if x &lt; 0 { return false; }</span></span>
<span class="line"><span>    if y &lt; 0 { return false; }</span></span>
<span class="line"><span>    if z &lt; 0 { return false; }</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Deep nesting</span></span>
<span class="line"><span>fn validate(x: i32, y: i32, z: i32): bool {</span></span>
<span class="line"><span>    if x &gt;= 0 {</span></span>
<span class="line"><span>        if y &gt;= 0 {</span></span>
<span class="line"><span>            if z &gt;= 0 {</span></span>
<span class="line"><span>                return true;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-use-descriptive-conditions" tabindex="-1">4. Use Descriptive Conditions <a class="header-anchor" href="#_4-use-descriptive-conditions" aria-label="Permalink to &quot;4. Use Descriptive Conditions&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Named condition</span></span>
<span class="line"><span>let is_adult = age &gt;= 18;</span></span>
<span class="line"><span>let has_permission = role == &quot;admin&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if is_adult &amp;&amp; has_permission {</span></span>
<span class="line"><span>    // Clear intent</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Complex inline condition</span></span>
<span class="line"><span>if age &gt;= 18 &amp;&amp; role == &quot;admin&quot; &amp;&amp; status == &quot;active&quot; {</span></span>
<span class="line"><span>    // What does this check?</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_5-limit-loop-complexity" tabindex="-1">5. Limit Loop Complexity <a class="header-anchor" href="#_5-limit-loop-complexity" aria-label="Permalink to &quot;5. Limit Loop Complexity&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Simple loop body</span></span>
<span class="line"><span>for i in 0..10 {</span></span>
<span class="line"><span>    process_item(i);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Complex logic in loop</span></span>
<span class="line"><span>for i in 0..10 {</span></span>
<span class="line"><span>    if condition1 {</span></span>
<span class="line"><span>        if condition2 {</span></span>
<span class="line"><span>            for j in 0..5 {</span></span>
<span class="line"><span>                // Too complex</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><hr><h2 id="select-statement-future" tabindex="-1">Select Statement (Future) <a class="header-anchor" href="#select-statement-future" aria-label="Permalink to &quot;Select Statement (Future)&quot;">​</a></h2><h3 id="syntax-go-style" tabindex="-1">Syntax (Go-style) <a class="header-anchor" href="#syntax-go-style" aria-label="Permalink to &quot;Syntax (Go-style)&quot;">​</a></h3><p><strong>Purpose</strong>: Wait on multiple channel operations</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>select {</span></span>
<span class="line"><span>    case msg = &lt;-ch1:</span></span>
<span class="line"><span>        (&quot;Received from ch1&quot;);</span></span>
<span class="line"><span>    case ch2 &lt;- value:</span></span>
<span class="line"><span>        (&quot;Sent to ch2&quot;);</span></span>
<span class="line"><span>    case msg = &lt;-ch3:</span></span>
<span class="line"><span>        (&quot;Received from ch3&quot;);</span></span>
<span class="line"><span>    default:</span></span>
<span class="line"><span>        (&quot;No channel ready&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="semantics" tabindex="-1">Semantics <a class="header-anchor" href="#semantics" aria-label="Permalink to &quot;Semantics&quot;">​</a></h3><ul><li><strong>Blocks</strong> until one case is ready</li><li>If multiple cases ready, <strong>randomly</strong> chooses one</li><li><code>default</code> case executes immediately if no channel ready</li><li>Without <code>default</code>, blocks forever if no channel ready</li></ul><h3 id="example-timeout-pattern" tabindex="-1">Example: Timeout Pattern <a class="header-anchor" href="#example-timeout-pattern" aria-label="Permalink to &quot;Example: Timeout Pattern&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { channel, timeout } from &quot;sync&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn fetch_with_timeout(): (string | error) {</span></span>
<span class="line"><span>    let result_ch = channel&lt;string&gt;();</span></span>
<span class="line"><span>    let timeout_ch = timeout(5000); // 5 seconds</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    go fetch_data(result_ch);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    select {</span></span>
<span class="line"><span>        case data = &lt;-result_ch:</span></span>
<span class="line"><span>            return data;</span></span>
<span class="line"><span>        case &lt;-timeout_ch:</span></span>
<span class="line"><span>            return &quot;Timeout error&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="current-status" tabindex="-1">Current Status <a class="header-anchor" href="#current-status" aria-label="Permalink to &quot;Current Status&quot;">​</a></h3><p><strong>Syntax</strong>: ✅ <code>select</code> keyword reserved<br><strong>Parser</strong>: 🚧 Partial (keyword recognized, AST node exists)<br><strong>Channels</strong>: ✅ MPSC channels implemented (lock-free ring buffer)<br><strong>Priority</strong>: � Medium (Channel infrastructure complete, select syntax pending)</p><p><strong>Note</strong>: Basic channel operations (<code>send</code>, <code>recv</code>, <code>close</code>) fully working. Multi-channel <code>select</code> syntax planned.</p><p>See <a href="./13_Concurrency">13_Concurrency.md</a> for full concurrency model.</p><h3 id="switch-statement-1" tabindex="-1">Switch Statement <a class="header-anchor" href="#switch-statement-1" aria-label="Permalink to &quot;Switch Statement&quot;">​</a></h3><p>C-style switch with integer values:</p><p><strong>Syntax</strong>: <code>switch value { case val: { } default: { } }</code></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>switch day {</span></span>
<span class="line"><span>    case 1:</span></span>
<span class="line"><span>        (&quot;Monday&quot;);</span></span>
<span class="line"><span>    case 2:</span></span>
<span class="line"><span>        (&quot;Tuesday&quot;);</span></span>
<span class="line"><span>    case 3:</span></span>
<span class="line"><span>        (&quot;Wednesday&quot;);</span></span>
<span class="line"><span>    case 4:</span></span>
<span class="line"><span>        (&quot;Thursday&quot;);</span></span>
<span class="line"><span>    case 5:</span></span>
<span class="line"><span>        (&quot;Friday&quot;);</span></span>
<span class="line"><span>    case 6:</span></span>
<span class="line"><span>        (&quot;Saturday&quot;);</span></span>
<span class="line"><span>    case 7:</span></span>
<span class="line"><span>        (&quot;Sunday&quot;);</span></span>
<span class="line"><span>    default:</span></span>
<span class="line"><span>        (&quot;Invalid day&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Properties</strong>:</p><ul><li>Only works with integer types (i32, u32, etc.)</li><li>No implicit fallthrough (unlike C)</li><li>Must have <code>default</code> case (unlike C)</li><li>Each case must be a compile-time constant</li></ul><p><strong>Differences from C</strong>:</p><ul><li>No fallthrough by default</li><li>Requires <code>default</code> case</li><li>Only integer types supported</li><li>No expression cases (use <code>match</code> instead)</li></ul><hr><h2 id="control-flow-summary" tabindex="-1">Control Flow Summary <a class="header-anchor" href="#control-flow-summary" aria-label="Permalink to &quot;Control Flow Summary&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Construct</th><th>Syntax</th><th>Use Case</th><th>Status</th></tr></thead><tbody><tr><td>If</td><td><code>if cond { }</code></td><td>Simple branching</td><td>✅</td></tr><tr><td>If-Else</td><td><code>if cond { } else { }</code></td><td>Binary choice</td><td>✅</td></tr><tr><td>If-Elif-Else</td><td><code>if { } elif { } else { }</code></td><td>Multiple conditions</td><td>✅</td></tr><tr><td>Match</td><td><code>match val { pat =&gt; { } }</code></td><td>Pattern matching</td><td>✅</td></tr><tr><td>Switch</td><td><code>switch val { case ... }</code></td><td>Integer switching</td><td>✅</td></tr><tr><td>While</td><td><code>while cond { }</code></td><td>Condition-based loop</td><td>✅</td></tr><tr><td>For</td><td><code>for i in range { }</code></td><td>Iteration</td><td>✅</td></tr><tr><td>Defer</td><td><code>defer cleanup();</code></td><td>LIFO cleanup</td><td>✅</td></tr><tr><td>Select</td><td><code>select { case ... }</code></td><td>Channel multiplexing</td><td>❌</td></tr><tr><td>Break</td><td><code>break;</code></td><td>Exit loop</td><td>✅</td></tr><tr><td>Continue</td><td><code>continue;</code></td><td>Skip iteration</td><td>✅</td></tr><tr><td>Return</td><td><code>return value;</code></td><td>Exit function</td><td>✅</td></tr></tbody></table><hr><p><strong>Previous</strong>: <a href="./05_Functions_and_Methods">05_Functions_and_Methods.md</a><br><strong>Next</strong>: <a href="./07_Structs_and_Data_Types">07_Structs_and_Data_Types.md</a></p><p><strong>Maintained by</strong>: Vex Language Team</p>`,249)])])}const g=a(t,[["render",l]]);export{u as __pageData,g as default};
