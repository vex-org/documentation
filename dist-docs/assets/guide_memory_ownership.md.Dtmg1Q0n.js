import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Ownership Model","description":"","frontmatter":{},"headers":[],"relativePath":"guide/memory/ownership.md","filePath":"guide/memory/ownership.md"}'),l={name:"guide/memory/ownership.md"};function t(i,a,o,r,c,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="ownership-model" tabindex="-1">Ownership Model <a class="header-anchor" href="#ownership-model" aria-label="Permalink to &quot;Ownership Model&quot;">​</a></h1><p>Vex&#39;s ownership system ensures memory safety without garbage collection. Every value has a single owner, and when the owner goes out of scope, the value is automatically cleaned up.</p><h2 id="core-principles" tabindex="-1">Core Principles <a class="header-anchor" href="#core-principles" aria-label="Permalink to &quot;Core Principles&quot;">​</a></h2><h3 id="_1-every-value-has-one-owner" tabindex="-1">1. Every Value Has One Owner <a class="header-anchor" href="#_1-every-value-has-one-owner" aria-label="Permalink to &quot;1. Every Value Has One Owner&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let s = &quot;hello&quot;    // s owns the string</span></span>
<span class="line"><span>let t = s          // Ownership moves to t</span></span>
<span class="line"><span>// println(s)</span><span>      // ERROR: s no longer owns the string</span></span>
<span class="line"><span>println(t)         // OK: t is the owner</span></span></code></pre></div><h3 id="_2-ownership-can-be-transferred-moved" tabindex="-1">2. Ownership Can Be Transferred (Moved) <a class="header-anchor" href="#_2-ownership-can-be-transferred-moved" aria-label="Permalink to &quot;2. Ownership Can Be Transferred (Moved)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn take_ownership(s: string) {</span></span>
<span class="line"><span>    println(s)</span></span>
<span class="line"><span>}  // s is dropped here</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let my_string = &quot;hello&quot;</span></span>
<span class="line"><span>take_ownership(my_string)      // Ownership moved to function</span></span>
<span class="line"><span>// println(my_string)</span><span>          // ERROR: my_string no longer valid</span></span></code></pre></div><h3 id="_3-values-are-dropped-when-owner-goes-out-of-scope" tabindex="-1">3. Values Are Dropped When Owner Goes Out of Scope <a class="header-anchor" href="#_3-values-are-dropped-when-owner-goes-out-of-scope" aria-label="Permalink to &quot;3. Values Are Dropped When Owner Goes Out of Scope&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn example() {</span></span>
<span class="line"><span>    let s = &quot;hello&quot;</span></span>
<span class="line"><span>    // ... use s ...</span></span>
<span class="line"><span>}  // s goes out of scope, memory is freed</span></span></code></pre></div><h2 id="move-semantics" tabindex="-1">Move Semantics <a class="header-anchor" href="#move-semantics" aria-label="Permalink to &quot;Move Semantics&quot;">​</a></h2><p>By default, assignment and function calls <strong>move</strong> ownership:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Move on assignment</span></span>
<span class="line"><span>let a = Vec&lt;i32&gt;.new()</span></span>
<span class="line"><span>let b = a              // a is moved to b</span></span>
<span class="line"><span>// a.push(1)</span><span>           // ERROR: use of moved value</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Move on function call</span></span>
<span class="line"><span>fn consume(v: [i32]) {</span></span>
<span class="line"><span>    // v is owned here</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let data = [1, 2, 3]</span></span>
<span class="line"><span>consume(data)          // data is moved</span></span>
<span class="line"><span>// data.len()</span><span>          // ERROR: use of moved value</span></span></code></pre></div><h3 id="copy-types" tabindex="-1">Copy Types <a class="header-anchor" href="#copy-types" aria-label="Permalink to &quot;Copy Types&quot;">​</a></h3><p>Simple types that implement <code>Copy</code> are copied instead of moved:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x: i32 = 5</span></span>
<span class="line"><span>let y = x          // x is copied, not moved</span></span>
<span class="line"><span>println(x)         // OK: x is still valid</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Copy types include:</span></span>
<span class="line"><span>// - All integer types (i8, i16, i32, i64, u8, u16, u32, u64, etc.)</span></span>
<span class="line"><span>// - All floating point types (f32, f64)</span></span>
<span class="line"><span>// - bool</span></span>
<span class="line"><span>// - char</span></span>
<span class="line"><span>// - Tuples of Copy types</span></span>
<span class="line"><span>// - Fixed-size arrays of Copy types</span></span></code></pre></div><h3 id="clone" tabindex="-1">Clone <a class="header-anchor" href="#clone" aria-label="Permalink to &quot;Clone&quot;">​</a></h3><p>Non-Copy types can be explicitly cloned:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let s1 = &quot;hello&quot;</span></span>
<span class="line"><span>let s2 = s1.clone()    // Deep copy</span></span>
<span class="line"><span>println(s1)            // OK: s1 is still valid</span></span>
<span class="line"><span>println(s2)            // OK: s2 is a separate copy</span></span></code></pre></div><h2 id="borrowing" tabindex="-1">Borrowing <a class="header-anchor" href="#borrowing" aria-label="Permalink to &quot;Borrowing&quot;">​</a></h2><p>Instead of transferring ownership, you can <strong>borrow</strong> a reference:</p><h3 id="immutable-references-t" tabindex="-1">Immutable References (<code>&amp;T</code>) <a class="header-anchor" href="#immutable-references-t" aria-label="Permalink to &quot;Immutable References (\`&amp;T\`)&quot;">​</a></h3><p>Multiple immutable references are allowed:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn print_length(s: &amp;string) {</span></span>
<span class="line"><span>    println(f&quot;Length: {s.len()}&quot;)</span></span>
<span class="line"><span>}  // s (the reference) goes out of scope, but doesn&#39;t drop the data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let my_string = &quot;hello&quot;</span></span>
<span class="line"><span>print_length(&amp;my_string)    // Borrow immutably</span></span>
<span class="line"><span>print_length(&amp;my_string)    // Can borrow again</span></span>
<span class="line"><span>println(my_string)          // Still valid - we never gave up ownership</span></span></code></pre></div><h3 id="mutable-references-t" tabindex="-1">Mutable References (<code>&amp;T!</code>) <a class="header-anchor" href="#mutable-references-t" aria-label="Permalink to &quot;Mutable References (\`&amp;T!\`)&quot;">​</a></h3><p>Only one mutable reference at a time:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn append_world(s: &amp;string!) {</span></span>
<span class="line"><span>    s = s + &quot;, world!&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let! my_string = &quot;hello&quot;</span></span>
<span class="line"><span>append_world(&amp;my_string!)   // Borrow mutably</span></span>
<span class="line"><span>println(my_string)          // &quot;hello, world!&quot;</span></span></code></pre></div><h3 id="borrowing-rules" tabindex="-1">Borrowing Rules <a class="header-anchor" href="#borrowing-rules" aria-label="Permalink to &quot;Borrowing Rules&quot;">​</a></h3><ol><li><p><strong>At any time, you can have either:</strong></p><ul><li>Any number of immutable references (<code>&amp;T</code>)</li><li>OR exactly one mutable reference (<code>&amp;T!</code>)</li></ul></li><li><p><strong>References must always be valid</strong></p></li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! data = [1, 2, 3]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// OK: Multiple immutable borrows</span></span>
<span class="line"><span>let r1 = &amp;data</span></span>
<span class="line"><span>let r2 = &amp;data</span></span>
<span class="line"><span>println(f&quot;{r1:?} {r2:?}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// OK: Single mutable borrow (after immutable borrows are done)</span></span>
<span class="line"><span>let r3 = &amp;data!</span></span>
<span class="line"><span>r3.push(4)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ERROR: Cannot have both mutable and immutable</span></span>
<span class="line"><span>let r4 = &amp;data</span></span>
<span class="line"><span>let r5 = &amp;data!    // ERROR: cannot borrow as mutable</span></span>
<span class="line"><span>println(r4)</span></span></code></pre></div><h2 id="lifetimes" tabindex="-1">Lifetimes <a class="header-anchor" href="#lifetimes" aria-label="Permalink to &quot;Lifetimes&quot;">​</a></h2><p>Lifetimes ensure references don&#39;t outlive the data they point to:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ERROR: Dangling reference</span></span>
<span class="line"><span>fn dangling(): &amp;string {</span></span>
<span class="line"><span>    let s = &quot;hello&quot;</span></span>
<span class="line"><span>    &amp;s  // ERROR: s will be dropped, reference would be invalid</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// OK: Return owned value</span></span>
<span class="line"><span>fn not_dangling(): string {</span></span>
<span class="line"><span>    let s = &quot;hello&quot;</span></span>
<span class="line"><span>    s  // Ownership transferred to caller</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="automatic-lifetime-management" tabindex="-1">Automatic Lifetime Management <a class="header-anchor" href="#automatic-lifetime-management" aria-label="Permalink to &quot;Automatic Lifetime Management&quot;">​</a></h3><p>Vex automatically infers lifetimes - no explicit annotations needed:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Vex infers that result borrows from both x and y</span></span>
<span class="line"><span>fn longest(x: &amp;string, y: &amp;string): &amp;string {</span></span>
<span class="line"><span>    if x.len() &gt; y.len() { x } else { y }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Usage</span></span>
<span class="line"><span>let s1 = &quot;short&quot;</span></span>
<span class="line"><span>let s2 = &quot;much longer&quot;</span></span>
<span class="line"><span>let result = longest(&amp;s1, &amp;s2)</span></span>
<span class="line"><span>println(result)  // &quot;much longer&quot;</span></span></code></pre></div><h3 id="references-in-structs" tabindex="-1">References in Structs <a class="header-anchor" href="#references-in-structs" aria-label="Permalink to &quot;References in Structs&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Excerpt {</span></span>
<span class="line"><span>    text: &amp;string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let novel = &quot;Call me Ishmael. Some years ago...&quot;</span></span>
<span class="line"><span>let first_sentence = novel.split(&#39;.&#39;).next().unwrap()</span></span>
<span class="line"><span>let excerpt = Excerpt { text: first_sentence }</span></span>
<span class="line"><span>// excerpt cannot outlive novel - compiler enforces this</span></span></code></pre></div><h2 id="smart-pointers" tabindex="-1">Smart Pointers <a class="header-anchor" href="#smart-pointers" aria-label="Permalink to &quot;Smart Pointers&quot;">​</a></h2><h3 id="box-lt-t-gt-heap-allocation" tabindex="-1">Box&lt;T&gt; - Heap Allocation <a class="header-anchor" href="#box-lt-t-gt-heap-allocation" aria-label="Permalink to &quot;Box&amp;lt;T&amp;gt; - Heap Allocation&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Allocate on heap</span></span>
<span class="line"><span>let boxed = Box.new(42)</span></span>
<span class="line"><span>println(boxed)  // 42</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Useful for recursive types</span></span>
<span class="line"><span>enum List {</span></span>
<span class="line"><span>    Cons(i32, Box&lt;List&gt;),</span></span>
<span class="line"><span>    Nil</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let list = List.Cons(1, Box.new(List.Cons(2, Box.new(List.Nil))))</span></span></code></pre></div><h3 id="vumm-unified-memory-model" tabindex="-1">VUMM (Unified Memory Model) <a class="header-anchor" href="#vumm-unified-memory-model" aria-label="Permalink to &quot;VUMM (Unified Memory Model)&quot;">​</a></h3><p>Vex automatically chooses the right Box strategy:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Compiler determines optimal strategy</span></span>
<span class="line"><span>let data = Box.new(expensive_data)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Internally becomes one of:</span></span>
<span class="line"><span>// - Unique: Single owner, zero overhead</span></span>
<span class="line"><span>// - SharedRc: Multiple owners, single thread</span></span>
<span class="line"><span>// - AtomicArc: Multiple owners, multi-thread</span></span></code></pre></div><h2 id="interior-mutability" tabindex="-1">Interior Mutability <a class="header-anchor" href="#interior-mutability" aria-label="Permalink to &quot;Interior Mutability&quot;">​</a></h2><p>For cases where you need mutation through immutable references:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Cell&lt;T&gt; - for Copy types</span></span>
<span class="line"><span>let cell = Cell.new(5)</span></span>
<span class="line"><span>cell.set(10)           // Mutate through shared reference</span></span>
<span class="line"><span>let value = cell.get() // 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// RefCell&lt;T&gt; - runtime borrow checking</span></span>
<span class="line"><span>let refcell = RefCell.new([1, 2, 3])</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    let! r = refcell.borrow_mut()</span></span>
<span class="line"><span>    r.push(4)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>let r = refcell.borrow()</span></span>
<span class="line"><span>println(r)  // [1, 2, 3, 4]</span></span></code></pre></div><h2 id="patterns-for-ownership" tabindex="-1">Patterns for Ownership <a class="header-anchor" href="#patterns-for-ownership" aria-label="Permalink to &quot;Patterns for Ownership&quot;">​</a></h2><h3 id="return-ownership" tabindex="-1">Return Ownership <a class="header-anchor" href="#return-ownership" aria-label="Permalink to &quot;Return Ownership&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn create_data(): [i32] {</span></span>
<span class="line"><span>    let data = [1, 2, 3]</span></span>
<span class="line"><span>    data  // Ownership transferred to caller</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let my_data = create_data()  // Caller owns the data</span></span></code></pre></div><h3 id="borrow-for-reading" tabindex="-1">Borrow for Reading <a class="header-anchor" href="#borrow-for-reading" aria-label="Permalink to &quot;Borrow for Reading&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn sum(data: &amp;[i32]): i32 {</span></span>
<span class="line"><span>    data.iter().sum()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let numbers = [1, 2, 3, 4, 5]</span></span>
<span class="line"><span>let total = sum(&amp;numbers)  // Borrow, don&#39;t take ownership</span></span>
<span class="line"><span>println(numbers)           // Still usable</span></span></code></pre></div><h3 id="mutable-borrow-for-modification" tabindex="-1">Mutable Borrow for Modification <a class="header-anchor" href="#mutable-borrow-for-modification" aria-label="Permalink to &quot;Mutable Borrow for Modification&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn double_all(data: &amp;[i32]!) {</span></span>
<span class="line"><span>    for item in data {</span></span>
<span class="line"><span>        item *= 2</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let! numbers = [1, 2, 3]</span></span>
<span class="line"><span>double_all(&amp;numbers!)</span></span>
<span class="line"><span>println(numbers)  // [2, 4, 6]</span></span></code></pre></div><h3 id="clone-when-needed" tabindex="-1">Clone When Needed <a class="header-anchor" href="#clone-when-needed" aria-label="Permalink to &quot;Clone When Needed&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn needs_ownership(data: [i32]) {</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let original = [1, 2, 3]</span></span>
<span class="line"><span>needs_ownership(original.clone())  // Keep original</span></span>
<span class="line"><span>println(original)                   // Still valid</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Prefer borrowing over ownership transfer</strong> - More flexible</li><li><strong>Use immutable references by default</strong> - More concurrent access</li><li><strong>Clone explicitly when needed</strong> - Clear intent</li><li><strong>Keep lifetimes simple</strong> - Let the compiler infer when possible</li><li><strong>Use smart pointers for shared ownership</strong> - When borrowing isn&#39;t enough</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/memory/borrowing">Borrowing Deep Dive</a> - Advanced borrowing patterns</li><li><a href="/docs/guide/memory/lifetimes">Lifetimes</a> - Lifetime annotations</li><li><a href="/docs/guide/memory/vumm">VUMM</a> - Automatic memory strategy selection</li></ul>`,59)])])}const m=s(l,[["render",t]]);export{u as __pageData,m as default};
