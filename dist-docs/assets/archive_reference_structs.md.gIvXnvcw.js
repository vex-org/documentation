import{_ as a,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Structs and Data Types","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/structs.md","filePath":"archive/reference/structs.md"}'),p={name:"archive/reference/structs.md"};function i(l,s,o,c,r,d){return n(),e("div",null,[...s[0]||(s[0]=[t(`<h1 id="structs-and-data-types" tabindex="-1">Structs and Data Types <a class="header-anchor" href="#structs-and-data-types" aria-label="Permalink to &quot;Structs and Data Types&quot;">​</a></h1><p><strong>Core Language Specification</strong><br><strong>Version:</strong> 0.1.3<br><strong>Status:</strong> ✅ Implemented</p><p>Structs are the primary composite data type in Vex. They follow a C/Go-style layout (nominal typing) with support for metadata tags and <strong>field visibility control</strong>.</p><hr><h2 id="_1-struct-definitions" tabindex="-1">1. Struct Definitions <a class="header-anchor" href="#_1-struct-definitions" aria-label="Permalink to &quot;1. Struct Definitions&quot;">​</a></h2><p>Structs are declared with the <code>struct</code> keyword. Fields must have explicit types.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct User {</span></span>
<span class="line"><span>    id: u64,</span></span>
<span class="line"><span>    username: string,</span></span>
<span class="line"><span>    email: string,</span></span>
<span class="line"><span>    is_active: bool,</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="advanced-syntax-parser-supported" tabindex="-1">Advanced Syntax (Parser Supported) <a class="header-anchor" href="#advanced-syntax-parser-supported" aria-label="Permalink to &quot;Advanced Syntax (Parser Supported)&quot;">​</a></h3><p>Vex supports inline policies (<code>with</code>) and contract implementations (<code>impl</code>).</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct User </span></span>
<span class="line"><span>    with Serializable, Debug</span></span>
<span class="line"><span>    impl Display, Hash</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="struct-tags-go-style" tabindex="-1">Struct Tags (Go-style) <a class="header-anchor" href="#struct-tags-go-style" aria-label="Permalink to &quot;Struct Tags (Go-style)&quot;">​</a></h3><p>Vex uses backtick strings for metadata, commonly used for serialization.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Product {</span></span>
<span class="line"><span>    id: i32       \`json:&quot;id&quot;\`,</span></span>
<span class="line"><span>    name: string  \`json:&quot;name&quot;\`,</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="tuple-unit-structs" tabindex="-1">Tuple &amp; Unit Structs <a class="header-anchor" href="#tuple-unit-structs" aria-label="Permalink to &quot;Tuple &amp; Unit Structs&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Color(u8, u8, u8);</span></span>
<span class="line"><span>struct Unit;</span></span></code></pre></div><hr><h2 id="_2-field-visibility" tabindex="-1">2. Field Visibility <a class="header-anchor" href="#_2-field-visibility" aria-label="Permalink to &quot;2. Field Visibility&quot;">​</a></h2><p>Vex uses <strong>C++-style section labels</strong> to control field access. This provides encapsulation without per-field keywords.</p><h3 id="visibility-levels" tabindex="-1">Visibility Levels <a class="header-anchor" href="#visibility-levels" aria-label="Permalink to &quot;Visibility Levels&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Level</th><th>Syntax</th><th>Read Access</th><th>Write Access</th></tr></thead><tbody><tr><td><strong>Private</strong></td><td><code>private:</code></td><td>Only methods</td><td>Only methods</td></tr><tr><td><strong>Readonly</strong></td><td><code>readonly:</code></td><td>Everyone</td><td>Only methods</td></tr><tr><td><strong>Public</strong></td><td><code>public:</code></td><td>Everyone</td><td>Everyone</td></tr></tbody></table><h3 id="default-visibility" tabindex="-1">Default Visibility <a class="header-anchor" href="#default-visibility" aria-label="Permalink to &quot;Default Visibility&quot;">​</a></h3><p>Fields without a visibility label are <strong>private by default</strong>.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Config {</span></span>
<span class="line"><span>    secret: string,     // private (default)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public:</span></span>
<span class="line"><span>    name: string        // public</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="section-based-syntax" tabindex="-1">Section-Based Syntax <a class="header-anchor" href="#section-based-syntax" aria-label="Permalink to &quot;Section-Based Syntax&quot;">​</a></h3><p>Visibility labels apply to all following fields until the next label:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export struct User {</span></span>
<span class="line"><span>    private:</span></span>
<span class="line"><span>    password_hash: string,</span></span>
<span class="line"><span>    session_token: string,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    readonly:</span></span>
<span class="line"><span>    id: i64,</span></span>
<span class="line"><span>    created_at: u64,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public:</span></span>
<span class="line"><span>    name: string,</span></span>
<span class="line"><span>    email: string</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="access-rules" tabindex="-1">Access Rules <a class="header-anchor" href="#access-rules" aria-label="Permalink to &quot;Access Rules&quot;">​</a></h3><p><strong>Private fields:</strong></p><ul><li>Only accessible via <code>self</code> in methods</li><li>Cannot be read or written from outside</li></ul><p><strong>Readonly fields:</strong></p><ul><li>Readable from anywhere</li><li>Writable only via <code>self</code> in methods</li></ul><p><strong>Public fields:</strong></p><ul><li>Full access from anywhere</li></ul><h3 id="example-with-methods" tabindex="-1">Example with Methods <a class="header-anchor" href="#example-with-methods" aria-label="Permalink to &quot;Example with Methods&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export struct BankAccount {</span></span>
<span class="line"><span>    private:</span></span>
<span class="line"><span>    balance: f64,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    readonly:</span></span>
<span class="line"><span>    account_number: string,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public:</span></span>
<span class="line"><span>    owner_name: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Method can access private fields via self</span></span>
<span class="line"><span>fn (self: &amp;BankAccount) get_balance(): f64 {</span></span>
<span class="line"><span>    return self.balance</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mutable method can modify private fields</span></span>
<span class="line"><span>fn (self: &amp;BankAccount!) deposit(amount: f64) {</span></span>
<span class="line"><span>    self.balance += amount</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let! account = BankAccount {</span></span>
<span class="line"><span>        balance: 1000.0,</span></span>
<span class="line"><span>        account_number: &quot;12345&quot;,</span></span>
<span class="line"><span>        owner_name: &quot;Alice&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // ✅ OK: public field</span></span>
<span class="line"><span>    account.owner_name = &quot;Bob&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // ✅ OK: readonly field (read)</span></span>
<span class="line"><span>    $println(account.account_number)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // ❌ ERROR: readonly field (write)</span></span>
<span class="line"><span>    // account.account_number = &quot;99999&quot;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // ❌ ERROR: private field</span></span>
<span class="line"><span>    // $println(account.balance)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // ✅ OK: access via method</span></span>
<span class="line"><span>    $println(account.get_balance())</span></span>
<span class="line"><span>    account.deposit(500.0)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="error-messages" tabindex="-1">Error Messages <a class="header-anchor" href="#error-messages" aria-label="Permalink to &quot;Error Messages&quot;">​</a></h3><p>The compiler provides helpful error messages:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[type-error] Error: field \`password_hash\` of struct \`User\` is private</span></span>
<span class="line"><span>[type-error] Error: cannot assign to readonly field \`id\` of struct \`User\`</span></span></code></pre></div><hr><h2 id="_3-instantiation" tabindex="-1">3. Instantiation <a class="header-anchor" href="#_3-instantiation" aria-label="Permalink to &quot;3. Instantiation&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let user = User {</span></span>
<span class="line"><span>    id: 1,</span></span>
<span class="line"><span>    username: &quot;alice&quot;,</span></span>
<span class="line"><span>    email: &quot;alice@vex.com&quot;,</span></span>
<span class="line"><span>    is_active: true,</span></span>
<span class="line"><span>}</span></span></code></pre></div><blockquote><p><strong>Note:</strong> All fields (including private) can be set during struct literal initialization.</p></blockquote><hr><h2 id="_4-methods" tabindex="-1">4. Methods <a class="header-anchor" href="#_4-methods" aria-label="Permalink to &quot;4. Methods&quot;">​</a></h2><p>Vex supports both <strong>Inline Methods</strong> (inside struct) and <strong>External Methods</strong> (Go-style).</p><h3 id="inline-methods" tabindex="-1">Inline Methods <a class="header-anchor" href="#inline-methods" aria-label="Permalink to &quot;Inline Methods&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Counter {</span></span>
<span class="line"><span>    count: i32,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Counter!) inc() {</span></span>
<span class="line"><span>        self.count += 1</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="external-methods-ufcs" tabindex="-1">External Methods (UFCS) <a class="header-anchor" href="#external-methods-ufcs" aria-label="Permalink to &quot;External Methods (UFCS)&quot;">​</a></h3><p>Useful for extending types or keeping data clean.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn (self: &amp;Counter) value(): i32 {</span></span>
<span class="line"><span>    return self.count</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Calls: <code>counter.inc()</code> or <code>counter.value()</code></p><hr><h2 id="_5-memory-layout" tabindex="-1">5. Memory Layout <a class="header-anchor" href="#_5-memory-layout" aria-label="Permalink to &quot;5. Memory Layout&quot;">​</a></h2><ul><li><strong>Alignment</strong>: Fields are naturally aligned (e.g. <code>u64</code> on 8-byte boundary).</li><li><strong>Ordering</strong>: Compiler may reorder fields in the future to minimize padding (currently C-compatible order).</li><li><strong>Size</strong>: Sum of fields + padding.</li></ul><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct A {</span></span>
<span class="line"><span>    a: u8,   // 1 byte</span></span>
<span class="line"><span>    // 3 bytes padding</span></span>
<span class="line"><span>    b: u32,  // 4 bytes</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// Sizeof(A) = 8</span></span></code></pre></div>`,55)])])}const b=a(p,[["render",i]]);export{h as __pageData,b as default};
