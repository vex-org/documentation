import{_ as n,o as a,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Generics","description":"","frontmatter":{},"headers":[],"relativePath":"guide/types/generics.md","filePath":"guide/types/generics.md"}'),t={name:"guide/types/generics.md"};function i(l,s,c,r,o,d){return a(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="generics" tabindex="-1">Generics <a class="header-anchor" href="#generics" aria-label="Permalink to &quot;Generics&quot;">​</a></h1><p>Generics allow you to write flexible, reusable code that works with any type. Vex&#39;s generics are monomorphized at compile time, ensuring zero runtime cost.</p><h2 id="generic-functions" tabindex="-1">Generic Functions <a class="header-anchor" href="#generic-functions" aria-label="Permalink to &quot;Generic Functions&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Generic function with type parameter T</span></span>
<span class="line"><span>fn identity&lt;T&gt;(value: T): T {</span></span>
<span class="line"><span>    return value</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let x = identity(42)        // T = i32</span></span>
<span class="line"><span>    let y = identity(&quot;hello&quot;)   // T = string</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="generic-structs" tabindex="-1">Generic Structs <a class="header-anchor" href="#generic-structs" aria-label="Permalink to &quot;Generic Structs&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Container&lt;T&gt; {</span></span>
<span class="line"><span>    public:</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct KeyValue&lt;K, V&gt; {</span></span>
<span class="line"><span>    public:</span></span>
<span class="line"><span>    key: K,</span></span>
<span class="line"><span>    value: V,</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="generic-methods" tabindex="-1">Generic Methods <a class="header-anchor" href="#generic-methods" aria-label="Permalink to &quot;Generic Methods&quot;">​</a></h2><p>Define methods on generic structs using receiver syntax:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Wrapper&lt;T&gt; {</span></span>
<span class="line"><span>    public:</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Immutable borrow receiver</span></span>
<span class="line"><span>fn (self: &amp;Wrapper&lt;T&gt;) get_value(): &amp;T {</span></span>
<span class="line"><span>    return &amp;self.value</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mutable borrow receiver</span></span>
<span class="line"><span>fn (self: &amp;Wrapper&lt;T&gt;!) set_value(new_val: T) {</span></span>
<span class="line"><span>    self.value = new_val</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="contract-bounds" tabindex="-1">Contract Bounds <a class="header-anchor" href="#contract-bounds" aria-label="Permalink to &quot;Contract Bounds&quot;">​</a></h2><p>Constrain generic types using contracts to ensure they support specific operations:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// T must implement the $Add contract (from prelude)</span></span>
<span class="line"><span>fn sum_items&lt;T: $Add&gt;(a: T, b: T): T {</span></span>
<span class="line"><span>    return a + b</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Multiple bounds using +</span></span>
<span class="line"><span>fn process&lt;T: $Display + $Clone&gt;(item: T) {</span></span>
<span class="line"><span>    let copy = item.clone()</span></span>
<span class="line"><span>    println(copy.toString())</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="associated-types" tabindex="-1">Associated Types <a class="header-anchor" href="#associated-types" aria-label="Permalink to &quot;Associated Types&quot;">​</a></h2><p>Contracts can define associated types that implementations must provide:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Iterator {</span></span>
<span class="line"><span>    type Item;</span></span>
<span class="line"><span>    next()!: Option&lt;Self.Item&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct Counter impl Iterator {</span></span>
<span class="line"><span>    count: i32,</span></span>
<span class="line"><span>    type Item = i32;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;Counter!) next(): Option&lt;i32&gt; {</span></span>
<span class="line"><span>    self.count += 1</span></span>
<span class="line"><span>    return Some(self.count)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="const-generics" tabindex="-1">Const Generics <a class="header-anchor" href="#const-generics" aria-label="Permalink to &quot;Const Generics&quot;">​</a></h2><p>Generic over constant values known at compile time:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct FixedBuffer&lt;const N: usize&gt; {</span></span>
<span class="line"><span>    data: [u8; N],</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn FixedBuffer.new&lt;const N: usize&gt;(): FixedBuffer&lt;N&gt; {</span></span>
<span class="line"><span>    return FixedBuffer { data: [0; N] }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let buffer = FixedBuffer.new&lt;1024&gt;()</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use meaningful names</strong>: <code>T</code> is standard for a single type, but <code>K, V</code> or names like <code>Elem</code> can improve clarity.</li><li><strong>Prefer contract bounds</strong>: Explicitly state requirements for better compiler errors and type safety.</li><li><strong>Keep it simple</strong>: Don&#39;t over-nest generics; if a signature becomes unreadable, consider using a type alias.</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/types/contracts">Contracts</a> - Defining shared behavior</li><li><a href="/docs/guide/types/structs">Structs</a> - Data structure definitions</li><li><a href="/docs/guide/types/enums">Enums</a> - Sum types and Option/Result</li></ul>`,22)])])}const g=n(t,[["render",i]]);export{h as __pageData,g as default};
