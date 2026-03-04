import{_ as a,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Contracts","description":"","frontmatter":{},"headers":[],"relativePath":"guide/types/contracts.md","filePath":"guide/types/contracts.md"}'),t={name:"guide/types/contracts.md"};function i(l,s,c,o,r,d){return n(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="contracts" tabindex="-1">Contracts <a class="header-anchor" href="#contracts" aria-label="Permalink to &quot;Contracts&quot;">​</a></h1><p>Contracts define shared behavior in Vex. They are similar to interfaces in Go or protocols in other languages, but with Vex-specific features like <strong>required fields</strong> and <strong>visibility sections</strong>.</p><div class="tip custom-block"><p class="custom-block-title">Key Differences</p><ul><li>Vex uses <code>contract</code> keyword, NOT <code>trait</code>.</li><li>Method signatures have NO <code>fn</code> prefix inside contracts.</li><li><strong>Contract methods are signatures only</strong> - NO bodies or default implementations!</li><li>Contracts can require <strong>fields</strong> with specific visibility.</li></ul></div><h2 id="defining-contracts" tabindex="-1">Defining Contracts <a class="header-anchor" href="#defining-contracts" aria-label="Permalink to &quot;Defining Contracts&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Printable {</span></span>
<span class="line"><span>    print();                    // No &#39;fn&#39; keyword!</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>contract Describable {</span></span>
<span class="line"><span>    describe(): string;</span></span>
<span class="line"><span>    short_description(): string;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="contract-fields" tabindex="-1">Contract Fields <a class="header-anchor" href="#contract-fields" aria-label="Permalink to &quot;Contract Fields&quot;">​</a></h2><p>Contracts can require implementing structs to have specific fields:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Entity {</span></span>
<span class="line"><span>    // Required fields</span></span>
<span class="line"><span>    id: u64</span></span>
<span class="line"><span>    name: string</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Methods</span></span>
<span class="line"><span>    validate(): bool;</span></span>
<span class="line"><span>    display(): string;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct User impl Entity {</span></span>
<span class="line"><span>    public:</span></span>
<span class="line"><span>    id: u64       // Required by contract</span></span>
<span class="line"><span>    name: string  // Required by contract</span></span>
<span class="line"><span>    email: string // Additional field</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;User) validate(): bool {</span></span>
<span class="line"><span>    return self.id &gt; 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="implementing-contracts" tabindex="-1">Implementing Contracts <a class="header-anchor" href="#implementing-contracts" aria-label="Permalink to &quot;Implementing Contracts&quot;">​</a></h2><p>Use the <code>impl</code> keyword on the struct definition or receiver syntax:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Shape {</span></span>
<span class="line"><span>    area(): f64;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct Circle impl Shape {</span></span>
<span class="line"><span>    radius: f64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;Circle) area(): f64 {</span></span>
<span class="line"><span>    return 3.14159 * self.radius * self.radius</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="associated-types" tabindex="-1">Associated Types <a class="header-anchor" href="#associated-types" aria-label="Permalink to &quot;Associated Types&quot;">​</a></h2><p>Types defined within contracts:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Iterator {</span></span>
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
<span class="line"><span>    self.count = self.count + 1</span></span>
<span class="line"><span>    return Some(self.count)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="operator-contracts" tabindex="-1">Operator Contracts <a class="header-anchor" href="#operator-contracts" aria-label="Permalink to &quot;Operator Contracts&quot;">​</a></h2><p>Vex supports operator overloading through special contracts in the prelude (e.g., <code>$Add</code>, <code>$Eq</code>, <code>$Ord</code>):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point impl $Add {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;Point) op+(other: Point): Point {</span></span>
<span class="line"><span>    return Point {</span></span>
<span class="line"><span>        x: self.x + other.x,</span></span>
<span class="line"><span>        y: self.y + other.y</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Contracts are pure interfaces</strong>: They define &quot;what&quot; a type can do, not &quot;how&quot;.</li><li><strong>Use associated types</strong>: For generic behavior that depends on implementing types.</li><li><strong>Prefer Prelude contracts</strong>: Leverage built-in contracts like <code>$Display</code>, <code>$Index</code>, and <code>$Iterator</code>.</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/types/generics">Generics</a> - Combining generics and contracts</li><li><a href="/docs/guide/error-handling">Error Handling</a> - Contracts for error types</li><li><a href="/docs/guide/basics/functions">Go-style Methods</a> - Receiver syntax details</li></ul>`,21)])])}const g=a(t,[["render",i]]);export{u as __pageData,g as default};
