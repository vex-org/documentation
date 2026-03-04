import{_ as n,o as a,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Methods and Constructors","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/methods.md","filePath":"guide/advanced/methods.md"}'),p={name:"guide/advanced/methods.md"};function i(l,s,o,c,r,d){return a(),e("div",null,[...s[0]||(s[0]=[t(`<h1 id="methods-and-constructors" tabindex="-1">Methods and Constructors <a class="header-anchor" href="#methods-and-constructors" aria-label="Permalink to &quot;Methods and Constructors&quot;">​</a></h1><p>Vex supports instance methods, static methods (constructors), and method chaining with a clean, Go-inspired syntax.</p><h2 id="method-syntax-overview" tabindex="-1">Method Syntax Overview <a class="header-anchor" href="#method-syntax-overview" aria-label="Permalink to &quot;Method Syntax Overview&quot;">​</a></h2><p>Vex has two primary method levels:</p><ol><li><strong>Instance methods</strong>: <code>fn (self: &amp;T) method()</code> - Associated with an instance.</li><li><strong>Static methods</strong>: <code>fn T.method()</code> - Associated with the type name.</li></ol><h2 id="instance-methods" tabindex="-1">Instance Methods <a class="header-anchor" href="#instance-methods" aria-label="Permalink to &quot;Instance Methods&quot;">​</a></h2><p>Instance methods take <code>self</code> as the first parameter with an explicit type:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Counter {</span></span>
<span class="line"><span>    value: i32,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Immutable receiver: read-only access</span></span>
<span class="line"><span>fn (self: &amp;Counter) get(): i32 {</span></span>
<span class="line"><span>    return self.value</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mutable receiver: allows modification</span></span>
<span class="line"><span>fn (self: &amp;Counter!) increment() {</span></span>
<span class="line"><span>    self.value = self.value + 1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// By-value receiver: takes ownership</span></span>
<span class="line"><span>fn (self: Counter) into_value(): i32 {</span></span>
<span class="line"><span>    return self.value</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="static-methods-constructors" tabindex="-1">Static Methods (Constructors) <a class="header-anchor" href="#static-methods-constructors" aria-label="Permalink to &quot;Static Methods (Constructors)&quot;">​</a></h2><p>Static methods use <code>Type.method</code> syntax and are commonly used as constructors:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Constructor: Point.new()</span></span>
<span class="line"><span>fn Point.new(x: f64, y: f64): Point {</span></span>
<span class="line"><span>    return Point { x, y }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Specific constructor: Point.origin()</span></span>
<span class="line"><span>fn Point.origin(): Point {</span></span>
<span class="line"><span>    return Point { x: 0.0, y: 0.0 }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="generic-methods" tabindex="-1">Generic Methods <a class="header-anchor" href="#generic-methods" aria-label="Permalink to &quot;Generic Methods&quot;">​</a></h2><p>Methods can be generic over one or more types:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Box&lt;T&gt; {</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn Box.new&lt;T&gt;(val: T): Box&lt;T&gt; {</span></span>
<span class="line"><span>    return Box { value: val }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;Box&lt;T&gt;) get(): &amp;T {</span></span>
<span class="line"><span>    return &amp;self.value</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="method-chaining-fluent-api" tabindex="-1">Method Chaining (Fluent API) <a class="header-anchor" href="#method-chaining-fluent-api" aria-label="Permalink to &quot;Method Chaining (Fluent API)&quot;">​</a></h2><p>Methods can be chained when they return <code>Self</code> or the receiver type:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Builder {</span></span>
<span class="line"><span>    count: i32,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: Builder) add(n: i32): Builder {</span></span>
<span class="line"><span>    return Builder { count: self.count + n }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let result = Builder { count: 0 }.add(1).add(10).count // 11</span></span></code></pre></div><h2 id="methods-with-contracts" tabindex="-1">Methods with Contracts <a class="header-anchor" href="#methods-with-contracts" aria-label="Permalink to &quot;Methods with Contracts&quot;">​</a></h2><p>Methods are the primary way to implement contract behavior:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Display {</span></span>
<span class="line"><span>    toString(): string;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct Point impl Display {</span></span>
<span class="line"><span>    x: f64, y: f64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;Point) toString(): string {</span></span>
<span class="line"><span>    return f&quot;({self.x}, {self.y})&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="extension-methods" tabindex="-1">Extension Methods <a class="header-anchor" href="#extension-methods" aria-label="Permalink to &quot;Extension Methods&quot;">​</a></h2><p>Vex allows adding methods to existing types, including primitives:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Extend string with a custom method</span></span>
<span class="line"><span>fn (self: &amp;string) excited(): string {</span></span>
<span class="line"><span>    return self + &quot;!!!&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>println(&quot;Hello&quot;.excited()) // &quot;Hello!!!&quot;</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use <code>Type.new</code> for primary constructors</strong>: Follow the standard library convention.</li><li><strong>Prefer references (<code>&amp;self</code>)</strong>: Unless you explicitly need to consume the object.</li><li><strong>Use <code>&amp;self!</code> for mutation</strong>: Make it clear when a method modifies internal state.</li><li><strong>Separate logic from data</strong>: Group methods separately from the struct definition for better modularity.</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/types/structs">Structs</a> - Defining data structures</li><li><a href="/docs/guide/types/contracts">Contracts</a> - Defining shared behavior</li><li><a href="/docs/guide/types/generics">Generics</a> - Generic methods and types</li></ul>`,27)])])}const m=n(p,[["render",i]]);export{u as __pageData,m as default};
