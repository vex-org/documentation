import{_ as s,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Enums","description":"","frontmatter":{},"headers":[],"relativePath":"guide/types/enums.md","filePath":"guide/types/enums.md"}'),p={name:"guide/types/enums.md"};function i(l,a,o,c,d,r){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="enums" tabindex="-1">Enums <a class="header-anchor" href="#enums" aria-label="Permalink to &quot;Enums&quot;">​</a></h1><p>Enums (enumerations) in Vex allow you to define a type that can be one of several variants. They are the primary tool for modeling sum types and complex data states.</p><h2 id="defining-enums" tabindex="-1">Defining Enums <a class="header-anchor" href="#defining-enums" aria-label="Permalink to &quot;Defining Enums&quot;">​</a></h2><h3 id="simple-enums" tabindex="-1">Simple Enums <a class="header-anchor" href="#simple-enums" aria-label="Permalink to &quot;Simple Enums&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Direction {</span></span>
<span class="line"><span>    North,</span></span>
<span class="line"><span>    South,</span></span>
<span class="line"><span>    East,</span></span>
<span class="line"><span>    West</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>enum Status {</span></span>
<span class="line"><span>    Pending,</span></span>
<span class="line"><span>    Active,</span></span>
<span class="line"><span>    Completed,</span></span>
<span class="line"><span>    Cancelled</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="using-enum-values" tabindex="-1">Using Enum Values <a class="header-anchor" href="#using-enum-values" aria-label="Permalink to &quot;Using Enum Values&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let direction = Direction.North</span></span>
<span class="line"><span>let status = Status.Active</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Pattern matching</span></span>
<span class="line"><span>match direction {</span></span>
<span class="line"><span>    Direction.North =&gt; println(&quot;Going north&quot;),</span></span>
<span class="line"><span>    Direction.South =&gt; println(&quot;Going south&quot;),</span></span>
<span class="line"><span>    Direction.East =&gt; println(&quot;Going east&quot;),</span></span>
<span class="line"><span>    Direction.West =&gt; println(&quot;Going west&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="variants-with-data" tabindex="-1">Variants with Data <a class="header-anchor" href="#variants-with-data" aria-label="Permalink to &quot;Variants with Data&quot;">​</a></h2><p>Enum variants can hold data, making them extremely powerful for complex structures.</p><h3 id="tuple-variants" tabindex="-1">Tuple Variants <a class="header-anchor" href="#tuple-variants" aria-label="Permalink to &quot;Tuple Variants&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Message {</span></span>
<span class="line"><span>    Quit,</span></span>
<span class="line"><span>    Move(i32, i32),</span></span>
<span class="line"><span>    Write(string),</span></span>
<span class="line"><span>    ChangeColor(u8, u8, u8)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let msg = Message.Move(10, 20)</span></span>
<span class="line"><span>let quit = Message.Quit</span></span>
<span class="line"><span>let text = Message.Write(&quot;Hello&quot;)</span></span></code></pre></div><h3 id="struct-variants" tabindex="-1">Struct Variants <a class="header-anchor" href="#struct-variants" aria-label="Permalink to &quot;Struct Variants&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Event {</span></span>
<span class="line"><span>    Click { x: i32, y: i32, button: u8 },</span></span>
<span class="line"><span>    KeyPress { key: char, modifiers: u8 },</span></span>
<span class="line"><span>    Resize { width: u32, height: u32 }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let event = Event.Click { x: 100, y: 200, button: 1 }</span></span></code></pre></div><h2 id="methods-on-enums-go-style" tabindex="-1">Methods on Enums (Go-style) <a class="header-anchor" href="#methods-on-enums-go-style" aria-label="Permalink to &quot;Methods on Enums (Go-style)&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Shape {</span></span>
<span class="line"><span>    Circle { radius: f64 },</span></span>
<span class="line"><span>    Rectangle { width: f64, height: f64 },</span></span>
<span class="line"><span>    Point</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;Shape) area(): f64 {</span></span>
<span class="line"><span>    match self {</span></span>
<span class="line"><span>        Shape.Circle { radius } =&gt; 3.14159 * radius * radius,</span></span>
<span class="line"><span>        Shape.Rectangle { width, height } =&gt; width * height,</span></span>
<span class="line"><span>        Shape.Point =&gt; 0.0</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="core-enums-option-and-result" tabindex="-1">Core Enums: Option and Result <a class="header-anchor" href="#core-enums-option-and-result" aria-label="Permalink to &quot;Core Enums: Option and Result&quot;">​</a></h2><p>Vex provides two special enums in the <strong>Prelude</strong> for handling optionality and errors.</p><h3 id="option-t" tabindex="-1"><code>Option&lt;T&gt;</code> <a class="header-anchor" href="#option-t" aria-label="Permalink to &quot;\`Option&lt;T&gt;\`&quot;">​</a></h3><p>Used when a value might be missing.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Option&lt;T&gt; {</span></span>
<span class="line"><span>    Some(T),</span></span>
<span class="line"><span>    None</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="common-methods" tabindex="-1">Common Methods <a class="header-anchor" href="#common-methods" aria-label="Permalink to &quot;Common Methods&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>isSome(): bool</code></td><td>Returns <code>true</code> if the option is <code>Some</code>.</td></tr><tr><td><code>isNone(): bool</code></td><td>Returns <code>true</code> if the option is <code>None</code>.</td></tr><tr><td><code>unwrap(): T</code></td><td>Returns the value or panics if <code>None</code>.</td></tr><tr><td><code>unwrapOr(default: T): T</code></td><td>Returns the value or the provided default.</td></tr><tr><td><code>map&lt;U&gt;(f: fn(T): U): Option&lt;U&gt;</code></td><td>Transforms the inner value if it exists.</td></tr><tr><td><code>andThen&lt;U&gt;(f: fn(T): Option&lt;U&gt;): Option&lt;U&gt;</code></td><td>Chains another optional operation (flatmap).</td></tr></tbody></table><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn find_item(id: i32): Option&lt;string&gt; {</span></span>
<span class="line"><span>    if id == 1 { return Some(&quot;Found&quot;) }</span></span>
<span class="line"><span>    return None</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match find_item(1) {</span></span>
<span class="line"><span>    Some(val) =&gt; println(f&quot;Got: {val}&quot;),</span></span>
<span class="line"><span>    None =&gt; println(&quot;Nothing found&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="result-t-e" tabindex="-1"><code>Result&lt;T, E&gt;</code> <a class="header-anchor" href="#result-t-e" aria-label="Permalink to &quot;\`Result&lt;T, E&gt;\`&quot;">​</a></h3><p>Used for operations that can fail.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Result&lt;T, E&gt; {</span></span>
<span class="line"><span>    Ok(T),</span></span>
<span class="line"><span>    Err(E)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="common-methods-1" tabindex="-1">Common Methods <a class="header-anchor" href="#common-methods-1" aria-label="Permalink to &quot;Common Methods&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>isOk(): bool</code></td><td>Returns <code>true</code> if the result is <code>Ok</code>.</td></tr><tr><td><code>isErr(): bool</code></td><td>Returns <code>true</code> if the result is <code>Err</code>.</td></tr><tr><td><code>unwrap(): T</code></td><td>Returns the <code>Ok</code> value or panics on <code>Err</code>.</td></tr><tr><td><code>unwrapOr(default: T): T</code></td><td>Returns the <code>Ok</code> value or the provided default.</td></tr><tr><td><code>map&lt;U&gt;(f: fn(T): U): Result&lt;U, E&gt;</code></td><td>Transforms the <code>Ok</code> value.</td></tr><tr><td><code>mapErr&lt;F&gt;(f: fn(E): F): Result&lt;T, F&gt;</code></td><td>Transforms the <code>Err</code> value.</td></tr><tr><td><code>andThen&lt;U&gt;(f: fn(T): Result&lt;U, E&gt;): Result&lt;U, E&gt;</code></td><td>Chains another fallible operation.</td></tr></tbody></table><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn divide(a: f64, b: f64): Result&lt;f64, string&gt; {</span></span>
<span class="line"><span>    if b == 0.0 { return Err(&quot;Division by zero&quot;) }</span></span>
<span class="line"><span>    return Ok(a / b)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="generic-enums" tabindex="-1">Generic Enums <a class="header-anchor" href="#generic-enums" aria-label="Permalink to &quot;Generic Enums&quot;">​</a></h2><p>Enums can be generic over one or more types:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Either&lt;L, R&gt; {</span></span>
<span class="line"><span>    Left(L),</span></span>
<span class="line"><span>    Right(R)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="recursive-enums" tabindex="-1">Recursive Enums <a class="header-anchor" href="#recursive-enums" aria-label="Permalink to &quot;Recursive Enums&quot;">​</a></h2><p>Use <code>Box&lt;T&gt;</code> to wrap recursive variants:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum List&lt;T&gt; {</span></span>
<span class="line"><span>    Cons(T, Box&lt;List&lt;T&gt;&gt;),</span></span>
<span class="line"><span>    Nil</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="c-like-enums" tabindex="-1">C-like Enums <a class="header-anchor" href="#c-like-enums" aria-label="Permalink to &quot;C-like Enums&quot;">​</a></h2><p>Enums can have explicit discriminant values:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum HttpStatus {</span></span>
<span class="line"><span>    Ok = 200,</span></span>
<span class="line"><span>    Created = 201,</span></span>
<span class="line"><span>    BadRequest = 400,</span></span>
<span class="line"><span>    NotFound = 404,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let code = HttpStatus.Ok as i32 // 200</span></span></code></pre></div><h2 id="struct-tags-metadata" tabindex="-1">Struct Tags &amp; Metadata <a class="header-anchor" href="#struct-tags-metadata" aria-label="Permalink to &quot;Struct Tags &amp; Metadata&quot;">​</a></h2><p>Like structs, enums do not use Rust-style attributes (<code>#[derive]</code>). Metadata is handled through struct tags or manual contract implementations.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Color {</span></span>
<span class="line"><span>    Red,</span></span>
<span class="line"><span>    Green,</span></span>
<span class="line"><span>    Blue</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use enums for state machines</strong>: Clear representation of mutually exclusive states.</li><li><strong>Prefer Option over null</strong>: Use <code>Option&lt;T&gt;</code> for high-level logic.</li><li><strong>Exhaust all variants</strong>: Vex&#39;s <code>match</code> is exhaustive; use <code>_</code> only when absolutely necessary.</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/basics/control-flow">Pattern Matching</a> - Detailed match syntax</li><li><a href="/docs/guide/types/contracts">Contracts</a> - Defining shared behavior</li><li><a href="/docs/guide/error-handling">Error Handling</a> - Idiomatic Result/Option usage</li></ul>`,45)])])}const m=s(p,[["render",i]]);export{h as __pageData,m as default};
