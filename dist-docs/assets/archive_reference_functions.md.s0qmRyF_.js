import{_ as n,o as s,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Functions and Methods","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/functions.md","filePath":"archive/reference/functions.md"}'),t={name:"archive/reference/functions.md"};function i(l,a,o,c,r,d){return s(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="functions-and-methods" tabindex="-1">Functions and Methods <a class="header-anchor" href="#functions-and-methods" aria-label="Permalink to &quot;Functions and Methods&quot;">​</a></h1><p><strong>Version:</strong> 0.2.0<br><strong>Last Updated:</strong> November 12, 2025</p><p>This document defines functions, methods, and related concepts in the Vex programming language.</p><hr><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ol><li><a href="#function-declarations">Function Declarations</a></li><li><a href="#method-definitions">Method Definitions</a></li><li><a href="#parameters-and-arguments">Parameters and Arguments</a><ul><li><a href="#go-style-parameter-grouping">Go-Style Parameter Grouping</a> ⭐ NEW</li></ul></li><li><a href="#return-values">Return Values</a></li><li><a href="#generic-functions">Generic Functions</a></li><li><a href="#function-overloading">Function Overloading</a></li><li><a href="#higher-order-functions">Higher-Order Functions</a></li><li><a href="#special-function-types">Special Function Types</a></li></ol><hr><h2 id="function-declarations" tabindex="-1">Function Declarations <a class="header-anchor" href="#function-declarations" aria-label="Permalink to &quot;Function Declarations&quot;">​</a></h2><h3 id="basic-syntax" tabindex="-1">Basic Syntax <a class="header-anchor" href="#basic-syntax" aria-label="Permalink to &quot;Basic Syntax&quot;">​</a></h3><p><strong>Syntax</strong>: <code>fn name(parameters): return_type { body }</code></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn add(x: i32, y: i32): i32 {</span></span>
<span class="line"><span>    return x + y;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn greet(name: string) {</span></span>
<span class="line"><span>    // No return type = returns nil (unit)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    return 0;  // Entry point</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="unsafe-functions-fn" tabindex="-1">Unsafe Functions (<code>fn!</code>) <a class="header-anchor" href="#unsafe-functions-fn" aria-label="Permalink to &quot;Unsafe Functions (\`fn!\`)&quot;">​</a></h3><p><strong>Status</strong>: ✅ Fully Implemented</p><p><strong>Syntax</strong>: <code>fn! name(parameters): return_type { body }</code></p><p>The <code>fn!</code> syntax declares an <strong>unsafe function</strong> - a function that performs low-level operations that bypass Vex&#39;s safety guarantees. The <code>!</code> (bang) after <code>fn</code> signals that this function may:</p><ul><li>Perform raw pointer operations</li><li>Call FFI/C functions</li><li>Bypass bounds checking</li><li>Access uninitialized memory</li></ul><p><strong>Examples</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Basic unsafe function</span></span>
<span class="line"><span>fn! dangerous_divide(x: i32, y: i32): i32 {</span></span>
<span class="line"><span>    // No runtime check for division by zero</span></span>
<span class="line"><span>    return x / y;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Unsafe static method</span></span>
<span class="line"><span>fn! Vec&lt;T&gt;.withCapacity(cap: u64): Vec&lt;T&gt; {</span></span>
<span class="line"><span>    // Direct memory allocation</span></span>
<span class="line"><span>    let ptr = @vex_alloc(cap * @sizeof(T));</span></span>
<span class="line"><span>    return Vec { data: ptr, len: 0, cap: cap };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Unsafe instance method</span></span>
<span class="line"><span>fn! (self: &amp;Vec&lt;T&gt;) get(index: u64): T {</span></span>
<span class="line"><span>    // No bounds check - caller must ensure index &lt; len</span></span>
<span class="line"><span>    return @ptr_read(self.data, index);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Exported unsafe function</span></span>
<span class="line"><span>export fn! (self: &amp;Box&lt;T&gt;!) drop() {</span></span>
<span class="line"><span>    @vex_free(self.ptr);</span></span>
<span class="line"><span>    self.ptr = nil;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>When to use <code>fn!</code></strong>:</p><table tabindex="0"><thead><tr><th>Use Case</th><th>Example</th></tr></thead><tbody><tr><td>Memory allocation/dealloc</td><td><code>Vec.withCapacity()</code>, <code>Box.drop()</code></td></tr><tr><td>Raw pointer arithmetic</td><td><code>@ptr_read</code>, <code>@ptr_write</code></td></tr><tr><td>FFI/extern calls</td><td>Calling C functions</td></tr><tr><td>Unchecked array access</td><td><code>vec.get()</code> without bounds check</td></tr><tr><td>Performance-critical paths</td><td>Avoiding runtime checks</td></tr></tbody></table><p><strong>Calling unsafe functions</strong>:</p><p>Unsafe functions can be called from:</p><ol><li>Other unsafe functions (<code>fn!</code>)</li><li>Unsafe blocks (<code>unsafe { }</code>)</li><li>Regular functions (currently allowed, future: may require explicit opt-in)</li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn safe_wrapper(v: &amp;Vec&lt;i32&gt;, idx: u64): Option&lt;i32&gt; {</span></span>
<span class="line"><span>    if idx &lt; v.len() {</span></span>
<span class="line"><span>        // Safe to call unsafe function - we validated the index</span></span>
<span class="line"><span>        return Some(v.get(idx));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return None;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Parser Implementation</strong>:</p><p>The lexer tokenizes <code>fn!</code> as two separate tokens: <code>fn</code> + <code>!</code> (Not). The parser detects the <code>!</code> immediately after <code>fn</code> and sets <code>is_unsafe = true</code> on the function.</p><p><strong>Components</strong>:</p><ul><li><code>fn!</code> keyword combination (fn followed by !)</li><li>Optional receiver: <code>(self: &amp;Type)</code> or <code>(self: &amp;Type!)</code></li><li>Optional static type: <code>Type&lt;T&gt;.</code></li><li>Function name (identifier)</li><li>Parameter list in parentheses</li><li>Optional return type after colon</li><li>Function body in braces</li></ul><h3 id="simple-functions" tabindex="-1">Simple Functions <a class="header-anchor" href="#simple-functions" aria-label="Permalink to &quot;Simple Functions&quot;">​</a></h3><p><strong>No Parameters</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn hello(): i32 {</span></span>
<span class="line"><span>    return 42;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>No Return Value</strong> (returns nil):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn print_message() {</span></span>
<span class="line"><span>    // Implicit return nil</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Single Expression</strong> (explicit return required):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn double(x: i32): i32 {</span></span>
<span class="line"><span>    return x * 2;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="function-naming" tabindex="-1">Function Naming <a class="header-anchor" href="#function-naming" aria-label="Permalink to &quot;Function Naming&quot;">​</a></h3><p><strong>Conventions</strong>:</p><ul><li><code>snake_case</code> for function names</li><li>Descriptive names preferred</li><li>Verbs for actions: <code>calculate_sum</code>, <code>print_result</code></li><li>Predicates start with <code>is_</code>, <code>has_</code>, <code>can_</code>: <code>is_valid</code>, <code>has_error</code></li></ul><p><strong>Examples</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn calculate_total(items: [i32; 10]): i32 { }</span></span>
<span class="line"><span>fn is_prime(n: i32): bool { }</span></span>
<span class="line"><span>fn get_user_name(): string { }</span></span>
<span class="line"><span>fn validate_input(data: string): bool { }</span></span></code></pre></div><h3 id="entry-point" tabindex="-1">Entry Point <a class="header-anchor" href="#entry-point" aria-label="Permalink to &quot;Entry Point&quot;">​</a></h3><p>The <code>main</code> function is the program entry point:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    return 0;  // Exit code</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Properties</strong>:</p><ul><li>Must return <code>i32</code> (exit code)</li><li>No parameters (command-line args future feature)</li><li>Program execution starts here</li><li>Return 0 for success, non-zero for error</li></ul><hr><h2 id="method-definitions" tabindex="-1">Method Definitions <a class="header-anchor" href="#method-definitions" aria-label="Permalink to &quot;Method Definitions&quot;">​</a></h2><p>Vex uses a Go-style syntax for defining methods. Methods are simply functions with a receiver argument.</p><h3 id="external-methods-go-style" tabindex="-1">External Methods (Go-Style) <a class="header-anchor" href="#external-methods-go-style" aria-label="Permalink to &quot;External Methods (Go-Style)&quot;">​</a></h3><p><strong>Purpose:</strong> To define behavior for a type clearly and explicitly, separating data from behavior.</p><ul><li><strong>Definition:</strong> The receiver is specified in parentheses before the function name. <ul><li><code>fn (self: &amp;MyType) method_name()</code></li></ul></li><li><strong>Mutability:</strong> Mutability is indicated by <code>&amp;Type!</code> in the receiver. <ul><li><code>fn (self: &amp;MyType!) method_name()</code></li></ul></li><li><strong>Body Access:</strong> Fields are accessed via <code>self</code>. <ul><li><code>self.field = new_value</code></li></ul></li><li><strong>Call:</strong> Called using dot notation. The <code>!</code> is NOT used at the call site. <ul><li><code>object.method_name()</code></li></ul></li></ul><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Rectangle {</span></span>
<span class="line"><span>    width: i32,</span></span>
<span class="line"><span>    height: i32,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Immutable method</span></span>
<span class="line"><span>fn (r: &amp;Rectangle) area(): i32 {</span></span>
<span class="line"><span>    return r.width * r.height;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mutable method</span></span>
<span class="line"><span>fn (r: &amp;Rectangle!) scale(factor: i32) {</span></span>
<span class="line"><span>    r.width = r.width * factor;</span></span>
<span class="line"><span>    r.height = r.height * factor;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// --- Calls ---</span></span>
<span class="line"><span>let rect = Rectangle { width: 10, height: 5 };</span></span>
<span class="line"><span>let a = rect.area();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let! rect_mut = Rectangle { width: 10, height: 5 };</span></span>
<span class="line"><span>rect_mut.scale(2); // No &#39;!&#39; needed</span></span></code></pre></div><h3 id="deprecated-inline-methods" tabindex="-1">Deprecated: Inline Methods <a class="header-anchor" href="#deprecated-inline-methods" aria-label="Permalink to &quot;Deprecated: Inline Methods&quot;">​</a></h3><p><em>Note: Defining methods inside <code>struct</code> blocks is deprecated and will be removed in a future version. Please use the Go-style syntax above.</em></p><h3 id="contract-method-implementation" tabindex="-1">Contract Method Implementation <a class="header-anchor" href="#contract-method-implementation" aria-label="Permalink to &quot;Contract Method Implementation&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Display {</span></span>
<span class="line"><span>    show();        // ✅ No &#39;fn&#39; prefix in contract declarations</span></span>
<span class="line"><span>    update()!;     // Mutable contract method</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct User impl Display {</span></span>
<span class="line"><span>    name: string,</span></span>
<span class="line"><span>    age: i32,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Contract methods MUST be implemented here (in struct body)</span></span>
<span class="line"><span>    fn show() {</span></span>
<span class="line"><span>        (self.name, &quot; - &quot;, self.age);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn update()! {</span></span>
<span class="line"><span>        self.age = self.age + 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Error</strong>: Contract methods cannot be external</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ COMPILE ERROR: Contract method cannot be external</span></span>
<span class="line"><span>fn (u: &amp;User) show() {</span></span>
<span class="line"><span>    (u.name);</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="parameters-and-arguments" tabindex="-1">Parameters and Arguments <a class="header-anchor" href="#parameters-and-arguments" aria-label="Permalink to &quot;Parameters and Arguments&quot;">​</a></h2><h3 id="basic-parameter-syntax" tabindex="-1">Basic Parameter Syntax <a class="header-anchor" href="#basic-parameter-syntax" aria-label="Permalink to &quot;Basic Parameter Syntax&quot;">​</a></h3><p>Parameters are declared with a name and type, separated by colon:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn add(x: i32, y: i32): i32 {</span></span>
<span class="line"><span>    return x + y;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn greet(name: string, age: i32) {</span></span>
<span class="line"><span>    (&quot;Hello &quot;, name, &quot;, age &quot;, age);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="go-style-parameter-grouping" tabindex="-1">Go-Style Parameter Grouping <a class="header-anchor" href="#go-style-parameter-grouping" aria-label="Permalink to &quot;Go-Style Parameter Grouping&quot;">​</a></h3><p>⭐ <strong>NEW in v0.2.0</strong>: Consecutive parameters of the same type can be grouped together.</p><p><strong>Syntax</strong>: <code>(name1, name2, name3: type)</code></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Traditional syntax (still supported)</span></span>
<span class="line"><span>fn add(a: i32, b: i32, c: i32): i32 {</span></span>
<span class="line"><span>    return a + b + c;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Go-style grouping (new!)</span></span>
<span class="line"><span>fn add(a, b, c: i32): i32 {</span></span>
<span class="line"><span>    return a + b + c;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Both syntaxes are equivalent and produce identical AST nodes.</p><p><strong>Multiple Groups</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process(x, y, z: f64, name, tag: string): void {</span></span>
<span class="line"><span>    let sum = x + y + z;</span></span>
<span class="line"><span>    (name, &quot;: &quot;, tag, &quot; = &quot;, sum);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Mixed Parameters</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn compute(a, b: i32, factor: f64, c, d: i32): f64 {</span></span>
<span class="line"><span>    let sum = a + b + c + d;</span></span>
<span class="line"><span>    return (sum as f64) * factor;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>In Methods</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Grouping works in methods</span></span>
<span class="line"><span>    distance_to(x1, y1: f64): f64 {</span></span>
<span class="line"><span>        let dx = self.x - x1;</span></span>
<span class="line"><span>        let dy = self.y - y1;</span></span>
<span class="line"><span>        return sqrt(dx * dx + dy * dy);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Also in external methods</span></span>
<span class="line"><span>fn (p: &amp;Point!) translate(dx, dy: f64) {</span></span>
<span class="line"><span>    p.x = p.x + dx;</span></span>
<span class="line"><span>    p.y = p.y + dy;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>In Contracts</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Geometry {</span></span>
<span class="line"><span>    distance(x1, y1, x2, y2: f64): f64;</span></span>
<span class="line"><span>    translate(dx, dy: f64)!;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Benefits</strong>:</p><ul><li>✅ Reduces repetition for same-typed parameters</li><li>✅ Cleaner, more readable function signatures</li><li>✅ Familiar to Go developers</li><li>✅ Purely syntactic sugar (no runtime overhead)</li><li>✅ Optional - traditional syntax still supported</li></ul><p><strong>Implementation Note</strong>: The parser automatically expands grouped parameters to individual <code>Param</code> AST nodes during parsing, so the rest of the compiler sees fully expanded parameters.</p><h3 id="parameter-passing" tabindex="-1">Parameter Passing <a class="header-anchor" href="#parameter-passing" aria-label="Permalink to &quot;Parameter Passing&quot;">​</a></h3><p>Vex uses <strong>pass-by-value</strong> semantics by default:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn modify(x: i32) {</span></span>
<span class="line"><span>    x = 10;  // Only modifies local copy</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let y = 5;</span></span>
<span class="line"><span>modify(y);</span></span>
<span class="line"><span>// y is still 5</span></span></code></pre></div><p>For reference semantics, use pointers or references (see <a href="./21_Mutability_and_Pointers">21_Mutability_and_Pointers.md</a>).</p><h3 id="default-parameter-values" tabindex="-1">Default Parameter Values <a class="header-anchor" href="#default-parameter-values" aria-label="Permalink to &quot;Default Parameter Values&quot;">​</a></h3><p>⭐ <strong>NEW in v0.2.0</strong>: Parameters can have default values.</p><p><strong>Syntax</strong>: <code>parameter: type = default_expression</code></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Simple default value</span></span>
<span class="line"><span>fn greet(name: string = &quot;World&quot;) {</span></span>
<span class="line"><span>    (&quot;Hello, &quot;, name, &quot;!&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Multiple defaults</span></span>
<span class="line"><span>fn create_point(x: i32 = 0, y: i32 = 0): Point {</span></span>
<span class="line"><span>    return Point { x: x, y: y };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mixed: required and optional parameters</span></span>
<span class="line"><span>fn add_numbers(a: i32, b: i32 = 10, c: i32 = 20): i32 {</span></span>
<span class="line"><span>    return a + b + c;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With parameter grouping</span></span>
<span class="line"><span>fn process(x, y: f64 = 1.0): f64 {</span></span>
<span class="line"><span>    return x * y;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Calling with defaults</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Use all defaults</span></span>
<span class="line"><span>greet();  // &quot;Hello, World!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Override some defaults</span></span>
<span class="line"><span>create_point(5);  // Point { x: 5, y: 0 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Override all</span></span>
<span class="line"><span>create_point(5, 10);  // Point { x: 5, y: 10 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mixed parameters</span></span>
<span class="line"><span>add_numbers(1);        // 1 + 10 + 20 = 31</span></span>
<span class="line"><span>add_numbers(1, 2);     // 1 + 2 + 20 = 23</span></span>
<span class="line"><span>add_numbers(1, 2, 3);  // 1 + 2 + 3 = 6</span></span></code></pre></div><p><strong>Rules</strong>:</p><ul><li>Default values can be any compile-time constant expression</li><li>Parameters with defaults must come after required parameters</li><li>When calling, you can omit trailing parameters with defaults</li><li>You cannot skip a parameter in the middle (no named arguments yet)</li></ul><p><strong>Examples</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Valid</span></span>
<span class="line"><span>fn foo(a: i32, b: i32 = 10) { }</span></span>
<span class="line"><span>fn bar(x: i32, y: i32 = 5, z: i32 = 3) { }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ Invalid: default before required</span></span>
<span class="line"><span>fn baz(a: i32 = 10, b: i32) { }  // Compile error</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Calling</span></span>
<span class="line"><span>foo(1);     // OK: a=1, b=10</span></span>
<span class="line"><span>foo(1, 2);  // OK: a=1, b=2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bar(1);        // OK: x=1, y=5, z=3</span></span>
<span class="line"><span>bar(1, 2);     // OK: x=1, y=2, z=3</span></span>
<span class="line"><span>bar(1, 2, 3);  // OK: x=1, y=2, z=3</span></span></code></pre></div><p><strong>Implementation</strong>: The compiler automatically fills in missing arguments with their default expressions during code generation. This is a zero-cost abstraction - no runtime overhead.</p><h3 id="variadic-parameters" tabindex="-1">Variadic Parameters <a class="header-anchor" href="#variadic-parameters" aria-label="Permalink to &quot;Variadic Parameters&quot;">​</a></h3><p>✅ <strong>Fully Implemented in v0.2.0</strong>: Functions can accept variable number of arguments using <code>Slice&lt;T&gt;</code>.</p><p><strong>Syntax</strong>: <code>parameter_name: ...Type</code></p><p>Variadic parameters are internally converted to <code>Slice&lt;T&gt;</code>, giving full access to:</p><ul><li><code>slice.len()</code> - Get count of variadic arguments</li><li><code>slice.get(i)</code> - Access element by index</li><li><code>slice.is_empty()</code> - Check if no arguments passed</li><li><code>for item in slice { }</code> - Iterate over all arguments</li></ul><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Sum all variadic arguments</span></span>
<span class="line"><span>fn sum(numbers: ...i32): i32 {</span></span>
<span class="line"><span>    let! total = 0;</span></span>
<span class="line"><span>    for n in numbers {</span></span>
<span class="line"><span>        total = total + n;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return total;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Count variadic arguments</span></span>
<span class="line"><span>fn count(items: ...i32): i32 {</span></span>
<span class="line"><span>    return items.len();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Get first element or default</span></span>
<span class="line"><span>fn first_or_default(items: ...i32): i32 {</span></span>
<span class="line"><span>    if items.is_empty() {</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return items.get(0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With base parameter</span></span>
<span class="line"><span>fn sum_with_base(base: i32, nums: ...i32): i32 {</span></span>
<span class="line"><span>    let! total = base;</span></span>
<span class="line"><span>    for n in nums {</span></span>
<span class="line"><span>        total = total + n;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return total;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Calling variadic functions</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Pass multiple arguments</span></span>
<span class="line"><span>let s = sum(1, 2, 3, 4, 5);  // 15</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// No variadic arguments (empty slice)</span></span>
<span class="line"><span>let empty = sum();  // 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With base parameter</span></span>
<span class="line"><span>let based = sum_with_base(100, 1, 2, 3);  // 106</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Count arguments</span></span>
<span class="line"><span>let c = count(10, 20, 30, 40);  // 4</span></span></code></pre></div><p><strong>Type Coercion</strong>:</p><p>Integer literals are automatically coerced to match the variadic element type:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn sum_i64(nums: ...i64): i64 {</span></span>
<span class="line"><span>    let! total: i64 = 0;</span></span>
<span class="line"><span>    for n in nums {</span></span>
<span class="line"><span>        total = total + n;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return total;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Integer literals coerced to i64</span></span>
<span class="line"><span>let result = sum_i64(1, 2, 3, 4, 5);  // Works! No explicit i64 suffix needed</span></span></code></pre></div><p><strong>Rules</strong>:</p><ul><li>✅ Variadic parameter must be the LAST parameter</li><li>✅ Only ONE variadic parameter per function</li><li>✅ Can combine with regular parameters (before variadic)</li><li>✅ Variadic parameters can accept zero or more arguments</li><li>✅ Full iteration and indexed access via <code>Slice&lt;T&gt;</code></li><li>⚠️ Default params + variadic requires named arguments (not yet supported)</li></ul><p><strong>Supported Types</strong>:</p><table tabindex="0"><thead><tr><th>Type</th><th>Support</th><th>Notes</th></tr></thead><tbody><tr><td><code>i32</code>, <code>i64</code>, <code>i8</code>, <code>i16</code></td><td>✅ Full</td><td>Integer types</td></tr><tr><td><code>u32</code>, <code>u64</code>, <code>u8</code>, <code>u16</code></td><td>✅ Full</td><td>Unsigned integers</td></tr><tr><td><code>f32</code>, <code>f64</code></td><td>✅ Full</td><td>Floating-point</td></tr><tr><td><code>bool</code></td><td>✅ Full</td><td>Boolean</td></tr><tr><td><code>string</code></td><td>✅ Full</td><td>String type</td></tr><tr><td>Custom structs</td><td>✅ Full</td><td>User-defined types</td></tr><tr><td><code>any</code></td><td>✅ Full</td><td>Heterogeneous</td></tr></tbody></table><p><strong>Examples</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Valid</span></span>
<span class="line"><span>fn foo(a: i32, items: ...string) { }</span></span>
<span class="line"><span>fn bar(x: f64, y: f64, nums: ...i32) { }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ Invalid: variadic not last</span></span>
<span class="line"><span>fn baz(items: ...i32, suffix: string) { }  // Compile error</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ Invalid: multiple variadic</span></span>
<span class="line"><span>fn qux(items1: ...i32, items2: ...string) { }  // Compile error</span></span></code></pre></div><p><strong>Implementation Details</strong>:</p><p>The compiler transforms variadic functions as follows:</p><ol><li><strong>Parser</strong>: <code>fn sum(nums: ...i32)</code> → Parameter with <code>Slice&lt;i32&gt;</code> type</li><li><strong>Call Site</strong>: <code>sum(1, 2, 3)</code> → Pack arguments into array, convert to slice</li><li><strong>Function Body</strong>: Access via <code>nums.len()</code>, <code>nums.get(i)</code>, <code>for n in nums</code></li><li><strong>Runtime</strong>: Uses <code>VexSlice</code> struct <code>{ data: ptr, len: i64, elem_size: i64 }</code></li></ol><p><strong>Slice Methods Available</strong>:</p><table tabindex="0"><thead><tr><th>Method</th><th>Signature</th><th>Description</th></tr></thead><tbody><tr><td><code>len()</code></td><td><code>(): i64</code></td><td>Number of variadic arguments</td></tr><tr><td><code>get(i)</code></td><td><code>(i64): T</code></td><td>Get element at index</td></tr><tr><td><code>is_empty()</code></td><td><code>(): bool</code></td><td>Check if no arguments</td></tr></tbody></table><p><strong>For-in Loop Support</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn print_all(items: ...i32) {</span></span>
<span class="line"><span>    for item in items {</span></span>
<span class="line"><span>        (item);</span></span>
<span class="line"><span>        (&quot; &quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    (&quot;\\n&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print_all(1, 2, 3, 4, 5);  // Prints: 1 2 3 4 5</span></span></code></pre></div><hr><h2 id="return-values" tabindex="-1">Return Values <a class="header-anchor" href="#return-values" aria-label="Permalink to &quot;Return Values&quot;">​</a></h2><p>Functions can return a single value or multiple values (via tuples).</p><h3 id="single-return-value" tabindex="-1">Single Return Value <a class="header-anchor" href="#single-return-value" aria-label="Permalink to &quot;Single Return Value&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn square(x: i32): i32 {</span></span>
<span class="line"><span>    return x * x;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="multiple-return-values" tabindex="-1">Multiple Return Values <a class="header-anchor" href="#multiple-return-values" aria-label="Permalink to &quot;Multiple Return Values&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn swap(x: i32, y: i32): (i32, i32) {</span></span>
<span class="line"><span>    return (y, x);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let (a, b) = swap(1, 2);</span></span></code></pre></div><h3 id="named-return-values-future" tabindex="-1">Named Return Values (Future) <a class="header-anchor" href="#named-return-values-future" aria-label="Permalink to &quot;Named Return Values (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn divide(dividend, divisor: i32): (quotient, remainder: i32) {</span></span>
<span class="line"><span>    quotient = dividend / divisor;</span></span>
<span class="line"><span>    remainder = dividend % divisor;</span></span>
<span class="line"><span>    return; // Implicitly returns quotient and remainder</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="generic-functions" tabindex="-1">Generic Functions <a class="header-anchor" href="#generic-functions" aria-label="Permalink to &quot;Generic Functions&quot;">​</a></h2><p>Functions can be generic over types.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn id&lt;T&gt;(x: T): T {</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let s = id&lt;string&gt;(&quot;hello&quot;);</span></span>
<span class="line"><span>let n = id(42); // Type inference</span></span></code></pre></div><hr><h2 id="function-overloading" tabindex="-1">Function Overloading <a class="header-anchor" href="#function-overloading" aria-label="Permalink to &quot;Function Overloading&quot;">​</a></h2><p>Vex does <strong>not</strong> support traditional function overloading (same name, different parameters). Instead, use:</p><ul><li>Default parameters</li><li>Variadic parameters</li><li>Generic functions</li><li>Different names (e.g., <code>from_string</code>, <code>from_int</code>)</li></ul><hr><h2 id="higher-order-functions" tabindex="-1">Higher-Order Functions <a class="header-anchor" href="#higher-order-functions" aria-label="Permalink to &quot;Higher-Order Functions&quot;">​</a></h2><p>Functions that take other functions as parameters or return them.</p><h3 id="closures" tabindex="-1">Closures <a class="header-anchor" href="#closures" aria-label="Permalink to &quot;Closures&quot;">​</a></h3><p>Closures are anonymous functions that can capture their environment.</p><p><strong>Syntax</strong>: <code>|parameters| body</code></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let add = |x, y| x + y;</span></span>
<span class="line"><span>let result = add(1, 2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With type annotations</span></span>
<span class="line"><span>let multiply = |x: i32, y: i32|: i32 {</span></span>
<span class="line"><span>    return x * y;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// No parameters</span></span>
<span class="line"><span>let greet = || (&quot;Hello&quot;);</span></span></code></pre></div><p><strong>Capturing</strong>: Closures capture variables from their scope.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let factor = 2;</span></span>
<span class="line"><span>let doubler = |x| x * factor;</span></span></code></pre></div><hr><h2 id="special-function-types" tabindex="-1">Special Function Types <a class="header-anchor" href="#special-function-types" aria-label="Permalink to &quot;Special Function Types&quot;">​</a></h2><h3 id="async-functions" tabindex="-1">Async Functions <a class="header-anchor" href="#async-functions" aria-label="Permalink to &quot;Async Functions&quot;">​</a></h3><p>Functions marked with <code>async</code> return a <code>Future&lt;T&gt;</code>.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async fn fetch_data(url: string): string {</span></span>
<span class="line"><span>    // ... network call ...</span></span>
<span class="line"><span>    return &quot;data&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Calling async function</span></span>
<span class="line"><span>let future = fetch_data(&quot;https://example.com&quot;);</span></span>
<span class="line"><span>let data = await future; // (await syntax future)</span></span></code></pre></div><h3 id="async-blocks" tabindex="-1">Async Blocks <a class="header-anchor" href="#async-blocks" aria-label="Permalink to &quot;Async Blocks&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let future = async {</span></span>
<span class="line"><span>    let x = do_something();</span></span>
<span class="line"><span>    x + 1</span></span>
<span class="line"><span>};</span></span></code></pre></div>`,152)])])}const g=n(t,[["render",i]]);export{h as __pageData,g as default};
