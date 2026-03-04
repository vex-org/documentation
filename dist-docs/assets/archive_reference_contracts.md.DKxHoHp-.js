import{_ as s,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Contracts (Interfaces)","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/contracts.md","filePath":"archive/reference/contracts.md"}'),p={name:"archive/reference/contracts.md"};function i(l,a,c,o,r,d){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="contracts-interfaces" tabindex="-1">Contracts (Interfaces) <a class="header-anchor" href="#contracts-interfaces" aria-label="Permalink to &quot;Contracts (Interfaces)&quot;">​</a></h1><p><strong>Core Language Specification</strong><br><strong>Version:</strong> 0.2.0<br><strong>Status:</strong> ✅ Implemented</p><p>Contracts define shared behavior (polymorphism). They are equivalent to <strong>Traits</strong> in Rust or <strong>Interfaces</strong> in other languages.</p><hr><h2 id="_1-definition" tabindex="-1">1. Definition <a class="header-anchor" href="#_1-definition" aria-label="Permalink to &quot;1. Definition&quot;">​</a></h2><p>Use the <code>contract</code> keyword.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Display {</span></span>
<span class="line"><span>    // Method signature</span></span>
<span class="line"><span>    fn show();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>contract Hash {</span></span>
<span class="line"><span>    fn hash(): u64;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="associated-types" tabindex="-1">Associated Types <a class="header-anchor" href="#associated-types" aria-label="Permalink to &quot;Associated Types&quot;">​</a></h3><p>Contracts can define placeholder types to be specified by the implementor.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Iterator {</span></span>
<span class="line"><span>    type Item;</span></span>
<span class="line"><span>    fn next(): Option&lt;Item&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_2-implementation" tabindex="-1">2. Implementation <a class="header-anchor" href="#_2-implementation" aria-label="Permalink to &quot;2. Implementation&quot;">​</a></h2><p>To implement a contract for a type, use an <code>impl</code> block. This is explicit (unlike Go).</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct User {</span></span>
<span class="line"><span>    name: string,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>impl Display for User {</span></span>
<span class="line"><span>    fn show() {</span></span>
<span class="line"><span>        (self.name);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="note custom-block github-alert"><p class="custom-block-title">NOTE</p><p>Vex previously supported <code>struct User impl Display { ... }</code> (Inline). This is getting phased out in favor of clean <code>impl Contract for Type</code> blocks to separate data from behavior.</p></div><h3 id="implementing-iterator" tabindex="-1">Implementing Iterator <a class="header-anchor" href="#implementing-iterator" aria-label="Permalink to &quot;Implementing Iterator&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Counter {</span></span>
<span class="line"><span>    count: i32,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>impl Iterator for Counter {</span></span>
<span class="line"><span>    type Item = i32;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn next(): Option&lt;i32&gt; {</span></span>
<span class="line"><span>        let val = self.count;</span></span>
<span class="line"><span>        self.count = self.count + 1;</span></span>
<span class="line"><span>        return Some(val);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_3-usage-bounds" tabindex="-1">3. Usage (Bounds) <a class="header-anchor" href="#_3-usage-bounds" aria-label="Permalink to &quot;3. Usage (Bounds)&quot;">​</a></h2><p>Use contracts to constrain generic types.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn print_any&lt;T: Display&gt;(item: T) {</span></span>
<span class="line"><span>    item.show();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="where-clauses" tabindex="-1">Where Clauses <a class="header-anchor" href="#where-clauses" aria-label="Permalink to &quot;Where Clauses&quot;">​</a></h3><p>For complex bounds:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn copy_and_print&lt;T&gt;(item: T)</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>    T: Display + Clone</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    let copy = item.clone();</span></span>
<span class="line"><span>    copy.show();</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_4-derived-contracts" tabindex="-1">4. Derived Contracts <a class="header-anchor" href="#_4-derived-contracts" aria-label="Permalink to &quot;4. Derived Contracts&quot;">​</a></h2><p>The compiler can automatically derive implementations for common contracts.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// (Future Feature: derive syntax)</span></span>
<span class="line"><span>// struct Point impl , Clone { ... }</span></span></code></pre></div><p>Currently, you must implement them manually or use built-in intrinsics.</p><h2 id="_5-contract-inheritance" tabindex="-1">5. Contract Inheritance <a class="header-anchor" href="#_5-contract-inheritance" aria-label="Permalink to &quot;5. Contract Inheritance&quot;">​</a></h2><p>Contracts can inherit from other contracts.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Debug: Display {</span></span>
<span class="line"><span>    fn debug_print();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>A type implementing <code>Debug</code> must also implement <code>Display</code>.</p>`,33)])])}const m=s(p,[["render",i]]);export{u as __pageData,m as default};
