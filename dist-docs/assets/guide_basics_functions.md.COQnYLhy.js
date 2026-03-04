import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Functions","description":"","frontmatter":{},"headers":[],"relativePath":"guide/basics/functions.md","filePath":"guide/basics/functions.md"}'),t={name:"guide/basics/functions.md"};function i(l,a,c,o,r,u){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h1><p>Functions are the primary unit of code reuse in Vex. They are declared using the <code>fn</code> keyword.</p><h2 id="basic-syntax" tabindex="-1">Basic Syntax <a class="header-anchor" href="#basic-syntax" aria-label="Permalink to &quot;Basic Syntax&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn function_name(param1: Type1, param2: Type2): ReturnType {</span></span>
<span class="line"><span>    // bodies are blocks</span></span>
<span class="line"><span>    return value</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Function with no parameters and no return value</span></span>
<span class="line"><span>fn greet() {</span></span>
<span class="line"><span>    println(&quot;Hello, Vex!&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Function with parameters</span></span>
<span class="line"><span>fn greet_user(name: string) {</span></span>
<span class="line"><span>    println(f&quot;Hello, {name}!&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Function with return value</span></span>
<span class="line"><span>fn add(a: i32, b: i32): i32 {</span></span>
<span class="line"><span>    return a + b</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Single expression functions (automatic return)</span></span>
<span class="line"><span>fn multiply(a: i32, b: i32): i32 {</span></span>
<span class="line"><span>    a * b</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><h3 id="immutable-by-default" tabindex="-1">Immutable by Default <a class="header-anchor" href="#immutable-by-default" aria-label="Permalink to &quot;Immutable by Default&quot;">​</a></h3><p>Parameters are immutable by default. You cannot modify them within the function body:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process(value: i32) {</span></span>
<span class="line"><span>    // value = 10</span><span>  // ERROR: Cannot mutate parameter</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="mutable-parameters" tabindex="-1">Mutable Parameters <a class="header-anchor" href="#mutable-parameters" aria-label="Permalink to &quot;Mutable Parameters&quot;">​</a></h3><p>To make a parameter mutable, use the <code>!</code> suffix:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn increment(value!: i32) {</span></span>
<span class="line"><span>    value = value + 1</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-label="Permalink to &quot;References&quot;">​</a></h3><p>Use <code>&amp;T</code> for immutable references and <code>&amp;T!</code> for mutable references:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn print_vec(data: &amp;Vec&lt;i32&gt;) {</span></span>
<span class="line"><span>    println(f&quot;Vector length: {data.len()}&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn append_sum(data: &amp;Vec&lt;i32&gt;!) {</span></span>
<span class="line"><span>    // Note: iter() method is on &amp;Vec&lt;T&gt;</span></span>
<span class="line"><span>    let! sum = 0</span></span>
<span class="line"><span>    for n in data {</span></span>
<span class="line"><span>        sum += n</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    data.push(sum)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="optional-and-default-parameters" tabindex="-1">Optional and Default Parameters <a class="header-anchor" href="#optional-and-default-parameters" aria-label="Permalink to &quot;Optional and Default Parameters&quot;">​</a></h2><p>Vex supports default values for parameters:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn greet(name: string, greeting: string = &quot;Hello&quot;) {</span></span>
<span class="line"><span>    println(f&quot;{greeting}, {name}!&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    greet(&quot;Alice&quot;)           // Prints: Hello, Alice!</span></span>
<span class="line"><span>    greet(&quot;Bob&quot;, &quot;Hi&quot;)       // Prints: Hi, Bob!</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="variadic-parameters" tabindex="-1">Variadic Parameters <a class="header-anchor" href="#variadic-parameters" aria-label="Permalink to &quot;Variadic Parameters&quot;">​</a></h2><p>Use <code>...T</code> for functions that accept a variable number of arguments:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn sum(numbers: ...i32): i32 {</span></span>
<span class="line"><span>    let! total = 0</span></span>
<span class="line"><span>    for n in numbers {</span></span>
<span class="line"><span>        total += n</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return total</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let result = sum(1, 2, 3, 4, 5)</span></span></code></pre></div><h2 id="generic-functions" tabindex="-1">Generic Functions <a class="header-anchor" href="#generic-functions" aria-label="Permalink to &quot;Generic Functions&quot;">​</a></h2><p>Functions can be generic over one or more types:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn identity&lt;T&gt;(value: T): T {</span></span>
<span class="line"><span>    return value</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let x = identity&lt;i32&gt;(42)</span></span>
<span class="line"><span>let y = identity&lt;string&gt;(&quot;hello&quot;)</span></span></code></pre></div><h3 id="with-contract-bounds" tabindex="-1">With Contract Bounds <a class="header-anchor" href="#with-contract-bounds" aria-label="Permalink to &quot;With Contract Bounds&quot;">​</a></h3><p>Constrain generic types using contracts:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn print_it&lt;T: $Display&gt;(item: T) {</span></span>
<span class="line"><span>    println(item.toString())</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="multiple-return-values-tuples" tabindex="-1">Multiple Return Values (Tuples) <a class="header-anchor" href="#multiple-return-values-tuples" aria-label="Permalink to &quot;Multiple Return Values (Tuples)&quot;">​</a></h2><p>Vex uses tuples to return multiple values:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn divide_with_remainder(a: i32, b: i32): (i32, i32) {</span></span>
<span class="line"><span>    return (a / b, a % b)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let (quotient, remainder) = divide_with_remainder(10, 3)</span></span></code></pre></div><h2 id="methods-go-style" tabindex="-1">Methods (Go-style) <a class="header-anchor" href="#methods-go-style" aria-label="Permalink to &quot;Methods (Go-style)&quot;">​</a></h2><p>Vex uses Go-style receiver syntax for methods. Methods are defined outside the struct:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Immutable receiver</span></span>
<span class="line"><span>fn (self: &amp;Point) length(): f64 {</span></span>
<span class="line"><span>    return (self.x * self.x + self.y * self.y).sqrt()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mutable receiver</span></span>
<span class="line"><span>fn (self: &amp;Point!) move_by(dx: f64, dy: f64) {</span></span>
<span class="line"><span>    self.x += dx</span></span>
<span class="line"><span>    self.y += dy</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Static/Associated function</span></span>
<span class="line"><span>fn Point.new(x: f64, y: f64): Point {</span></span>
<span class="line"><span>    return Point { x, y }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="anonymous-functions-closures" tabindex="-1">Anonymous Functions (Closures) <a class="header-anchor" href="#anonymous-functions-closures" aria-label="Permalink to &quot;Anonymous Functions (Closures)&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let add = |a: i32, b: i32| a + b</span></span>
<span class="line"><span>let result = add(10, 20)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With parameter types and return type</span></span>
<span class="line"><span>let multiply = |a: i32, b: i32|: i32 {</span></span>
<span class="line"><span>    return a * b</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="async-functions" tabindex="-1">Async Functions <a class="header-anchor" href="#async-functions" aria-label="Permalink to &quot;Async Functions&quot;">​</a></h2><p>Declare async functions with the <code>async</code> keyword:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async fn fetch_data(url: string): Result&lt;string, error&gt; {</span></span>
<span class="line"><span>    // ... implementation</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>async fn main() {</span></span>
<span class="line"><span>    let result = await fetch_data(&quot;https://vex-lang.org&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use <code>string</code> for text</strong> - Always prefer the built-in <code>string</code> type.</li><li><strong>Prefer immutable parameters</strong> - Only use <code>!</code> when necessary.</li><li><strong>Use descriptive names</strong> - Functions should describe actions (<code>calculate_sum</code>).</li><li><strong>Keep functions focused</strong> - A function should do one thing well.</li><li><strong>Leverage Go-style methods</strong> - For better code organization and readability.</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/basics/control-flow">Control Flow</a> - Conditionals and loops</li><li><a href="/docs/guide/types/structs">Structs</a> - Custom data types</li><li><a href="/docs/guide/types/contracts">Contracts</a> - Interface definitions</li></ul>`,43)])])}const m=s(t,[["render",i]]);export{h as __pageData,m as default};
