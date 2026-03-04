import{_ as n,o as s,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Borrowing","description":"","frontmatter":{},"headers":[],"relativePath":"guide/memory/borrowing.md","filePath":"guide/memory/borrowing.md"}'),l={name:"guide/memory/borrowing.md"};function t(i,a,r,o,c,d){return s(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="borrowing" tabindex="-1">Borrowing <a class="header-anchor" href="#borrowing" aria-label="Permalink to &quot;Borrowing&quot;">​</a></h1><p>Borrowing allows you to reference data without taking ownership. This enables efficient data sharing while maintaining memory safety.</p><h2 id="reference-types" tabindex="-1">Reference Types <a class="header-anchor" href="#reference-types" aria-label="Permalink to &quot;Reference Types&quot;">​</a></h2><h3 id="immutable-references-t" tabindex="-1">Immutable References (<code>&amp;T</code>) <a class="header-anchor" href="#immutable-references-t" aria-label="Permalink to &quot;Immutable References (\`&amp;T\`)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let data = [1, 2, 3]</span></span>
<span class="line"><span>let reference = &amp;data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Can read through reference</span></span>
<span class="line"><span>println(f&quot;Length: {reference.len()}&quot;)</span></span>
<span class="line"><span>println(f&quot;First: {reference[0]}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Cannot modify</span></span>
<span class="line"><span>// reference.push(4)</span><span>  // ERROR: cannot mutate through immutable reference</span></span></code></pre></div><h3 id="mutable-references-t" tabindex="-1">Mutable References (<code>&amp;T!</code>) <a class="header-anchor" href="#mutable-references-t" aria-label="Permalink to &quot;Mutable References (\`&amp;T!\`)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! data = [1, 2, 3]</span></span>
<span class="line"><span>let reference = &amp;data!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Can read</span></span>
<span class="line"><span>println(f&quot;Length: {reference.len()}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Can modify</span></span>
<span class="line"><span>reference.push(4)</span></span>
<span class="line"><span>println(f&quot;After push: {data.len()}&quot;)  // 4</span></span></code></pre></div><h2 id="borrowing-rules" tabindex="-1">Borrowing Rules <a class="header-anchor" href="#borrowing-rules" aria-label="Permalink to &quot;Borrowing Rules&quot;">​</a></h2><h3 id="rule-1-one-mutable-or-many-immutable" tabindex="-1">Rule 1: One Mutable OR Many Immutable <a class="header-anchor" href="#rule-1-one-mutable-or-many-immutable" aria-label="Permalink to &quot;Rule 1: One Mutable OR Many Immutable&quot;">​</a></h3><p>At any point, you can have either:</p><ul><li><strong>One</strong> mutable reference (<code>&amp;T!</code>), OR</li><li><strong>Any number</strong> of immutable references (<code>&amp;T</code>)</li></ul><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! data = [1, 2, 3]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// OK: Multiple immutable references</span></span>
<span class="line"><span>let r1 = &amp;data</span></span>
<span class="line"><span>let r2 = &amp;data</span></span>
<span class="line"><span>println(f&quot;Sizes: {r1.len()} {r2.len()}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// OK: One mutable reference (after immutable refs are done)</span></span>
<span class="line"><span>let r3 = &amp;data!</span></span>
<span class="line"><span>r3.push(4)</span></span></code></pre></div><h3 id="rule-2-references-must-be-valid" tabindex="-1">Rule 2: References Must Be Valid <a class="header-anchor" href="#rule-2-references-must-be-valid" aria-label="Permalink to &quot;Rule 2: References Must Be Valid&quot;">​</a></h3><p>References cannot outlive the data they point to. The Vex compiler tracks this automatically without requiring lifetime annotations.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ERROR: Dangling reference</span></span>
<span class="line"><span>fn bad(): &amp;i32 {</span></span>
<span class="line"><span>    let x = 42</span></span>
<span class="line"><span>    return &amp;x  // ERROR: x is dropped when function returns</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// OK: Return owned data</span></span>
<span class="line"><span>fn good(): i32 {</span></span>
<span class="line"><span>    let x = 42</span></span>
<span class="line"><span>    return x   // Transfer ownership</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="non-lexical-lifetimes-nll" tabindex="-1">Non-Lexical Lifetimes (NLL) <a class="header-anchor" href="#non-lexical-lifetimes-nll" aria-label="Permalink to &quot;Non-Lexical Lifetimes (NLL)&quot;">​</a></h2><p>Vex uses NLL - borrows end at their last use, not necessarily at the end of the scope:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! data = [1, 2, 3]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let r = &amp;data</span></span>
<span class="line"><span>println(f&quot;Length: {r.len()}&quot;) // Last use of r</span></span>
<span class="line"><span>// Borrow ends here</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let r2 = &amp;data! // OK: No conflict because r is no longer used</span></span>
<span class="line"><span>r2.push(4)</span></span></code></pre></div><h2 id="reference-patterns" tabindex="-1">Reference Patterns <a class="header-anchor" href="#reference-patterns" aria-label="Permalink to &quot;Reference Patterns&quot;">​</a></h2><h3 id="function-parameters" tabindex="-1">Function Parameters <a class="header-anchor" href="#function-parameters" aria-label="Permalink to &quot;Function Parameters&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Take ownership</span></span>
<span class="line"><span>fn consume(data: Vec&lt;i32&gt;) {</span></span>
<span class="line"><span>    // data is moved in, dropped when function ends</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Borrow immutably</span></span>
<span class="line"><span>fn inspect(data: &amp;Vec&lt;i32&gt;) {</span></span>
<span class="line"><span>    // Can read, cannot modify, caller keeps ownership</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Borrow mutably</span></span>
<span class="line"><span>fn modify(data: &amp;Vec&lt;i32&gt;!) {</span></span>
<span class="line"><span>    // Can read and modify, caller keeps ownership</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="method-receivers-go-style" tabindex="-1">Method Receivers (Go-style) <a class="header-anchor" href="#method-receivers-go-style" aria-label="Permalink to &quot;Method Receivers (Go-style)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct MyStruct {</span></span>
<span class="line"><span>    value: i32</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Immutable borrow of self</span></span>
<span class="line"><span>fn (self: &amp;MyStruct) get_value(): i32 {</span></span>
<span class="line"><span>    return self.value</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mutable borrow of self</span></span>
<span class="line"><span>fn (self: &amp;MyStruct!) set_value(value: i32) {</span></span>
<span class="line"><span>    self.value = value</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="slices" tabindex="-1">Slices <a class="header-anchor" href="#slices" aria-label="Permalink to &quot;Slices&quot;">​</a></h2><p>Slices are references to contiguous sequences:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let arr = [1, 2, 3, 4, 5]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Slice of entire array</span></span>
<span class="line"><span>let slice = &amp;arr</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Slice of portion (start..end)</span></span>
<span class="line"><span>let middle = &amp;arr[1..4]  // [2, 3, 4]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mutable slice</span></span>
<span class="line"><span>let! arr_mut = [1, 2, 3, 4, 5]</span></span>
<span class="line"><span>let slice_mut = &amp;arr_mut![1..4]</span></span>
<span class="line"><span>// slice_mut[0] = 10</span><span>  // ERROR: Slice mutation syntax is through methods or index</span></span></code></pre></div><h2 id="interior-mutability-vumm" tabindex="-1">Interior Mutability (VUMM) <a class="header-anchor" href="#interior-mutability-vumm" aria-label="Permalink to &quot;Interior Mutability (VUMM)&quot;">​</a></h2><p>Unlike Rust&#39;s <code>Cell</code> or <code>RefCell</code>, Vex relies on its <strong>Unified Memory Model (VUMM)</strong> and <code>Box&lt;T&gt;</code> to handle most memory patterns efficiently. High-level interior mutability is typically handled via atomics or synchronized types in the standard library.</p><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Prefer borrowing over cloning</strong>: Use <code>&amp;T</code> to pass large structures.</li><li><strong>Use the smallest scope for mutable borrows</strong>: Although NLL helps, keeping mutable borrows brief improves code clarity.</li><li><strong>Prefer immutable when possible</strong>: Default to <code>&amp;T</code> and only use <code>&amp;T!</code> when mutation is required.</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/memory/lifetimes">Automatic Lifetimes</a> - How Vex tracks references</li><li><a href="/docs/guide/memory/vumm">VUMM Memory Model</a> - Automatic memory strategy</li><li><a href="/docs/guide/memory/ownership">Ownership</a> - Value ownership model</li></ul>`,32)])])}const m=n(l,[["render",t]]);export{h as __pageData,m as default};
