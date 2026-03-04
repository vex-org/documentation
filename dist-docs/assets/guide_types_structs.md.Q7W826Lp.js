import{_ as a,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Structs","description":"","frontmatter":{},"headers":[],"relativePath":"guide/types/structs.md","filePath":"guide/types/structs.md"}'),p={name:"guide/types/structs.md"};function i(l,s,c,o,r,d){return n(),e("div",null,[...s[0]||(s[0]=[t(`<h1 id="structs" tabindex="-1">Structs <a class="header-anchor" href="#structs" aria-label="Permalink to &quot;Structs&quot;">​</a></h1><p>Structs in Vex are pure data types that group related values together. Unlike many other systems languages, Vex structs primarily contain data; behavior is defined externally using Go-style methods.</p><h2 id="defining-structs" tabindex="-1">Defining Structs <a class="header-anchor" href="#defining-structs" aria-label="Permalink to &quot;Defining Structs&quot;">​</a></h2><h3 id="basic-struct" tabindex="-1">Basic Struct <a class="header-anchor" href="#basic-struct" aria-label="Permalink to &quot;Basic Struct&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct User {</span></span>
<span class="line"><span>    id: u64,</span></span>
<span class="line"><span>    name: string,</span></span>
<span class="line"><span>    email: string,</span></span>
<span class="line"><span>    active: bool</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="creating-instances" tabindex="-1">Creating Instances <a class="header-anchor" href="#creating-instances" aria-label="Permalink to &quot;Creating Instances&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let origin = Point { x: 0.0, y: 0.0 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let user = User {</span></span>
<span class="line"><span>    id: 1,</span></span>
<span class="line"><span>    name: &quot;Alice&quot;,</span></span>
<span class="line"><span>    email: &quot;alice@example.com&quot;,</span></span>
<span class="line"><span>    active: true</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="field-shorthand" tabindex="-1">Field Shorthand <a class="header-anchor" href="#field-shorthand" aria-label="Permalink to &quot;Field Shorthand&quot;">​</a></h3><p>When variable names match field names:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn create_user(name: string, email: string): User {</span></span>
<span class="line"><span>    let id = 123</span></span>
<span class="line"><span>    return User {</span></span>
<span class="line"><span>        id,        // Same as id: id</span></span>
<span class="line"><span>        name,</span></span>
<span class="line"><span>        email,</span></span>
<span class="line"><span>        active: true</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="field-visibility-section-based" tabindex="-1">Field Visibility (Section-Based) <a class="header-anchor" href="#field-visibility-section-based" aria-label="Permalink to &quot;Field Visibility (Section-Based)&quot;">​</a></h2><p>Vex uses <strong>section-based</strong> visibility labels instead of per-field keywords:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export struct Account {</span></span>
<span class="line"><span>    private:</span></span>
<span class="line"><span>    internal_id: i64,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    readonly:</span></span>
<span class="line"><span>    balance: f64,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public:</span></span>
<span class="line"><span>    name: string</span></span>
<span class="line"><span>}</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Label</th><th>Access Level</th></tr></thead><tbody><tr><td><code>private:</code></td><td>Module-only (Default)</td></tr><tr><td><code>readonly:</code></td><td>Publicly readable, Module-only writable</td></tr><tr><td><code>public:</code></td><td>Fully accessible</td></tr></tbody></table><h2 id="go-style-methods" tabindex="-1">Go-Style Methods <a class="header-anchor" href="#go-style-methods" aria-label="Permalink to &quot;Go-Style Methods&quot;">​</a></h2><p>Methods are defined <strong>outside</strong> the struct using receiver syntax:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Static method (Associated function)</span></span>
<span class="line"><span>fn Point.new(x: f64, y: f64): Point {</span></span>
<span class="line"><span>    return Point { x, y }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Instance method (Immutable)</span></span>
<span class="line"><span>fn (self: &amp;Point) length(): f64 {</span></span>
<span class="line"><span>    return (self.x * self.x + self.y * self.y).sqrt()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Instance method (Mutable)</span></span>
<span class="line"><span>fn (self: &amp;Point!) translate(dx: f64, dy: f64) {</span></span>
<span class="line"><span>    self.x += dx</span></span>
<span class="line"><span>    self.y += dy</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="struct-tags-go-style" tabindex="-1">Struct Tags (Go-Style) <a class="header-anchor" href="#struct-tags-go-style" aria-label="Permalink to &quot;Struct Tags (Go-Style)&quot;">​</a></h2><p>Vex uses Go-style backtick tags for metadata, such as serialization instructions:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct User {</span></span>
<span class="line"><span>    id: u64        \`json:&quot;id&quot; db:&quot;pk&quot;\`,</span></span>
<span class="line"><span>    username: string \`json:&quot;username&quot;\`,</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">No Rust-style Attributes</p><p>Vex does <strong>NOT</strong> use <code>#[derive(...)]</code> or other attribute syntax. Use struct tags or implement contracts manually.</p></div><h2 id="implementing-contracts" tabindex="-1">Implementing Contracts <a class="header-anchor" href="#implementing-contracts" aria-label="Permalink to &quot;Implementing Contracts&quot;">​</a></h2><p>Use the <code>impl</code> keyword to declare that a struct implements one or more contracts:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Display {</span></span>
<span class="line"><span>    toString(): string;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct Point impl Display {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;Point) toString(): string {</span></span>
<span class="line"><span>    return f&quot;({self.x}, {self.y})&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="tuple-structs" tabindex="-1">Tuple Structs <a class="header-anchor" href="#tuple-structs" aria-label="Permalink to &quot;Tuple Structs&quot;">​</a></h2><p>Structs without named fields, useful for the &quot;Newtype&quot; pattern:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Color(u8, u8, u8)</span></span>
<span class="line"><span>struct UserId(u64)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let red = Color(255, 0, 0)</span></span>
<span class="line"><span>println(f&quot;R: {red.0}&quot;)</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use section-based visibility</strong>: Group relative fields under <code>private:</code>, <code>readonly:</code>, or <code>public:</code>.</li><li><strong>Prefer Go-style methods</strong>: Keep data and logic separate for better modularity.</li><li><strong>Use Struct Tags</strong>: For all cross-cutting concerns like JSON serialization or DB mapping.</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/types/enums">Enums</a> - Sum types and pattern matching</li><li><a href="/docs/guide/types/contracts">Contracts</a> - Interface-driven development</li><li><a href="/docs/guide/types/generics">Generics</a> - Type-safe abstractions</li></ul>`,31)])])}const g=a(p,[["render",i]]);export{h as __pageData,g as default};
