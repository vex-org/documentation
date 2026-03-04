import{_ as a,o as n,c as e,ag as i}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Automatic Lifetime Management","description":"","frontmatter":{},"headers":[],"relativePath":"guide/memory/lifetimes.md","filePath":"guide/memory/lifetimes.md"}'),p={name:"guide/memory/lifetimes.md"};function t(l,s,r,o,c,h){return n(),e("div",null,[...s[0]||(s[0]=[i(`<h1 id="automatic-lifetime-management" tabindex="-1">Automatic Lifetime Management <a class="header-anchor" href="#automatic-lifetime-management" aria-label="Permalink to &quot;Automatic Lifetime Management&quot;">​</a></h1><p>Unlike Rust, Vex does <strong>NOT</strong> require explicit lifetime annotations. The compiler automatically manages reference lifetimes through static analysis.</p><div class="tip custom-block"><p class="custom-block-title">Key Difference from Rust</p><p>In Rust, you write: <code>fn longest&lt;&#39;a&gt;(x: &amp;&#39;a str, y: &amp;&#39;a str) -&gt; &amp;&#39;a str</code></p><p>In Vex, you simply write: <code>fn longest(x: &amp;string, y: &amp;string): &amp;string</code></p><p>The Vex compiler figures out the relationships automatically!</p></div><h2 id="how-it-works" tabindex="-1">How It Works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How It Works&quot;">​</a></h2><p>Vex&#39;s borrow checker performs sophisticated static analysis to track:</p><ol><li><strong>Reference Origins</strong> - Where each reference comes from</li><li><strong>Validity Ranges</strong> - How long each reference is valid</li><li><strong>Conflicts</strong> - When mutable and immutable borrows overlap</li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn longest(x: &amp;string, y: &amp;string): &amp;string {</span></span>
<span class="line"><span>    if x.len() &gt; y.len() {</span></span>
<span class="line"><span>        return x</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return y</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// The compiler understands that the returned reference</span></span>
<span class="line"><span>// can only be used while BOTH x and y are valid</span></span></code></pre></div><h2 id="borrowing-rules" tabindex="-1">Borrowing Rules <a class="header-anchor" href="#borrowing-rules" aria-label="Permalink to &quot;Borrowing Rules&quot;">​</a></h2><p>Vex enforces safety rules through static analysis, without explicit annotations:</p><h3 id="rule-1-one-mutable-or-multiple-immutable" tabindex="-1">Rule 1: One Mutable OR Multiple Immutable <a class="header-anchor" href="#rule-1-one-mutable-or-multiple-immutable" aria-label="Permalink to &quot;Rule 1: One Mutable OR Multiple Immutable&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! data = Vec&lt;i32&gt;.new()</span></span>
<span class="line"><span>data.push(1)</span></span>
<span class="line"><span>data.push(2)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Multiple immutable borrows - OK</span></span>
<span class="line"><span>let a = &amp;data</span></span>
<span class="line"><span>let b = &amp;data</span></span>
<span class="line"><span>println(f&quot;{a.len()}, {b.len()}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mutable borrow - OK (immutable borrows no longer in use)</span></span>
<span class="line"><span>let c = &amp;data!</span></span>
<span class="line"><span>c.push(3)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ ERROR: Cannot have mutable and immutable at same time</span></span>
<span class="line"><span>let d = &amp;data</span></span>
<span class="line"><span>let e = &amp;data!  // Error: cannot borrow mutably while immutably borrowed</span></span></code></pre></div><h3 id="rule-2-references-cannot-outlive-data" tabindex="-1">Rule 2: References Cannot Outlive Data <a class="header-anchor" href="#rule-2-references-cannot-outlive-data" aria-label="Permalink to &quot;Rule 2: References Cannot Outlive Data&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn dangling(): &amp;i32 {</span></span>
<span class="line"><span>    let x = 42</span></span>
<span class="line"><span>    return &amp;x  // ❌ ERROR: x will be dropped, reference invalid</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ Correct: Return owned data</span></span>
<span class="line"><span>fn not_dangling(): i32 {</span></span>
<span class="line"><span>    let x = 42</span></span>
<span class="line"><span>    return x</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="rule-3-no-data-races" tabindex="-1">Rule 3: No Data Races <a class="header-anchor" href="#rule-3-no-data-races" aria-label="Permalink to &quot;Rule 3: No Data Races&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! counter = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// These would execute concurrently - compiler prevents race</span></span>
<span class="line"><span>go {</span></span>
<span class="line"><span>    // counter = counter + 1</span><span>  // ❌ ERROR: data race possible</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="common-patterns" tabindex="-1">Common Patterns <a class="header-anchor" href="#common-patterns" aria-label="Permalink to &quot;Common Patterns&quot;">​</a></h2><h3 id="returning-references-from-functions" tabindex="-1">Returning References from Functions <a class="header-anchor" href="#returning-references-from-functions" aria-label="Permalink to &quot;Returning References from Functions&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct User {</span></span>
<span class="line"><span>    name: string,</span></span>
<span class="line"><span>    email: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Return reference to field - compiler tracks this</span></span>
<span class="line"><span>fn (self: &amp;User) get_name(): &amp;string {</span></span>
<span class="line"><span>    return &amp;self.name</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Usage</span></span>
<span class="line"><span>let user = User { name: &quot;Alice&quot;, email: &quot;alice@example.com&quot; }</span></span>
<span class="line"><span>let name = user.get_name()</span></span>
<span class="line"><span>println(name)  // OK: user still valid</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Error case - would be caught at compile time</span></span>
<span class="line"><span>fn bad_example(): &amp;string {</span></span>
<span class="line"><span>    let user = User { name: &quot;Bob&quot;, email: &quot;bob@example.com&quot; }</span></span>
<span class="line"><span>    return user.get_name()  // ❌ ERROR: user dropped, reference invalid</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="structs-holding-references" tabindex="-1">Structs Holding References <a class="header-anchor" href="#structs-holding-references" aria-label="Permalink to &quot;Structs Holding References&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Struct can hold references</span></span>
<span class="line"><span>struct Parser {</span></span>
<span class="line"><span>    input: &amp;string,</span></span>
<span class="line"><span>    position: usize</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn Parser.new(input: &amp;string): Parser {</span></span>
<span class="line"><span>    return Parser { input, position: 0 }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;Parser!) advance() {</span></span>
<span class="line"><span>    self.position = self.position + 1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Usage</span></span>
<span class="line"><span>let source = &quot;let x = 42&quot;</span></span>
<span class="line"><span>let! parser = Parser.new(&amp;source)</span></span>
<span class="line"><span>parser.advance()</span></span>
<span class="line"><span>// parser valid only while source is valid - compiler enforces this</span></span></code></pre></div><h2 id="comparison-vex-vs-rust" tabindex="-1">Comparison: Vex vs Rust <a class="header-anchor" href="#comparison-vex-vs-rust" aria-label="Permalink to &quot;Comparison: Vex vs Rust&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Aspect</th><th>Rust</th><th>Vex</th></tr></thead><tbody><tr><td>Lifetime annotations</td><td>Required when ambiguous</td><td>Never required</td></tr><tr><td><code>&#39;a</code> syntax</td><td>Yes</td><td>No</td></tr><tr><td>Borrow checking</td><td>Compile time</td><td>Compile time</td></tr><tr><td>Safety guarantees</td><td>Same</td><td>Same</td></tr></tbody></table><h3 id="equivalent-code" tabindex="-1">Equivalent Code <a class="header-anchor" href="#equivalent-code" aria-label="Permalink to &quot;Equivalent Code&quot;">​</a></h3><p><strong>Rust:</strong></p><div class="language-rust vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fn</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> longest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;(x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, y</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">len</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() &gt; y</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">len</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() { x } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { y }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ImportantExcerpt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    part</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>Vex:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn longest(x: &amp;string, y: &amp;string): &amp;string {</span></span>
<span class="line"><span>    if x.len() &gt; y.len() { x } else { y }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct ImportantExcerpt {</span></span>
<span class="line"><span>    part: &amp;string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;ImportantExcerpt) level(): i32 {</span></span>
<span class="line"><span>    return 3</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Return owned data when in doubt</strong> - Simpler and avoids lifetime issues</li><li><strong>Use references for read-only access</strong> - Efficient, no copying</li><li><strong>Use <code>&amp;T!</code> for mutable operations</strong> - Clear intent</li><li><strong>Trust the compiler</strong> - If it compiles, references are safe</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/memory/vumm">VUMM Memory Model</a> - Automatic memory management</li><li><a href="/docs/guide/memory/ownership">Ownership</a> - Value ownership model</li><li><a href="/docs/guide/memory/borrowing">Borrowing</a> - Reference borrowing details</li></ul>`,31)])])}const m=a(p,[["render",t]]);export{u as __pageData,m as default};
