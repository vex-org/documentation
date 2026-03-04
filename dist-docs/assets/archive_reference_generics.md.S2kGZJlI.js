import{_ as s,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Generics (Parametric Polymorphism)","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/generics.md","filePath":"archive/reference/generics.md"}'),p={name:"archive/reference/generics.md"};function i(l,a,r,c,o,d){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="generics-parametric-polymorphism" tabindex="-1">Generics (Parametric Polymorphism) <a class="header-anchor" href="#generics-parametric-polymorphism" aria-label="Permalink to &quot;Generics (Parametric Polymorphism)&quot;">​</a></h1><p><strong>Version:</strong> 0.1.0<br><strong>Last Updated:</strong> November 3, 2025</p><p>This document defines the generic type system in Vex, enabling code reuse through parametric polymorphism.</p><hr><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ol><li><a href="#generic-functions">Generic Functions</a></li><li><a href="#generic-structs">Generic Structs</a></li><li><a href="#generic-enums">Generic Enums</a></li><li><a href="#generic-contracts">Generic Contracts</a></li><li><a href="#type-constraints">Type Constraints</a></li><li><a href="#monomorphization">Monomorphization</a></li></ol><hr><h2 id="generic-functions" tabindex="-1">Generic Functions <a class="header-anchor" href="#generic-functions" aria-label="Permalink to &quot;Generic Functions&quot;">​</a></h2><h3 id="basic-syntax" tabindex="-1">Basic Syntax <a class="header-anchor" href="#basic-syntax" aria-label="Permalink to &quot;Basic Syntax&quot;">​</a></h3><p><strong>Syntax</strong>: <code>fn name&lt;T&gt;(params): return_type</code></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn identity&lt;T&gt;(x: T): T {</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Usage</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let num = identity&lt;i32&gt;(42);</span></span>
<span class="line"><span>let text = identity&lt;string&gt;(&quot;hello&quot;);</span></span>
<span class="line"><span>let flag = identity&lt;bool&gt;(true);</span></span></code></pre></div><h3 id="type-inference" tabindex="-1">Type Inference <a class="header-anchor" href="#type-inference" aria-label="Permalink to &quot;Type Inference&quot;">​</a></h3><p>Type parameters can be inferred from arguments:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn identity&lt;T&gt;(x: T): T {</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let num = identity(42);        // T inferred as i32</span></span>
<span class="line"><span>let text = identity(&quot;hello&quot;);  // T inferred as string</span></span></code></pre></div><p><strong>Explicit vs Inferred</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Explicit type argument</span></span>
<span class="line"><span>let result = identity&lt;i32&gt;(42);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Inferred from argument</span></span>
<span class="line"><span>let result = identity(42);  // Same as above</span></span></code></pre></div><h3 id="multiple-type-parameters" tabindex="-1">Multiple Type Parameters <a class="header-anchor" href="#multiple-type-parameters" aria-label="Permalink to &quot;Multiple Type Parameters&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn pair&lt;T, U&gt;(first: T, second: U): (T, U) {</span></span>
<span class="line"><span>    return (first, second);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let p1 = pair&lt;i32, string&gt;(42, &quot;answer&quot;);</span></span>
<span class="line"><span>let p2 = pair(3.14, true);  // Inferred: &lt;f64, bool&gt;</span></span></code></pre></div><h3 id="generic-return-types" tabindex="-1">Generic Return Types <a class="header-anchor" href="#generic-return-types" aria-label="Permalink to &quot;Generic Return Types&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn create&lt;T&gt;(value: T): T {</span></span>
<span class="line"><span>    return value;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let x: i32 = create(42);</span></span>
<span class="line"><span>let y: string = create(&quot;text&quot;);</span></span></code></pre></div><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><p><strong>Swap Function</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn swap&lt;T&gt;(a: T, b: T): (T, T) {</span></span>
<span class="line"><span>    return (b, a);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let (x, y) = swap(10, 20);        // x=20, y=10</span></span>
<span class="line"><span>let (s1, s2) = swap(&quot;hi&quot;, &quot;bye&quot;); // s1=&quot;bye&quot;, s2=&quot;hi&quot;</span></span></code></pre></div><p><strong>Generic Comparison</strong> (Future):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn max&lt;T: Ord&gt;(a: T, b: T): T {</span></span>
<span class="line"><span>    if a &gt; b {</span></span>
<span class="line"><span>        return a;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return b;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="generic-structs" tabindex="-1">Generic Structs <a class="header-anchor" href="#generic-structs" aria-label="Permalink to &quot;Generic Structs&quot;">​</a></h2><h3 id="single-type-parameter" tabindex="-1">Single Type Parameter <a class="header-anchor" href="#single-type-parameter" aria-label="Permalink to &quot;Single Type Parameter&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Box&lt;T&gt; {</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let int_box = Box&lt;i32&gt; { value: 42 };</span></span>
<span class="line"><span>let str_box = Box&lt;string&gt; { value: &quot;hello&quot; };</span></span></code></pre></div><h3 id="multiple-type-parameters-1" tabindex="-1">Multiple Type Parameters <a class="header-anchor" href="#multiple-type-parameters-1" aria-label="Permalink to &quot;Multiple Type Parameters&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Pair&lt;T, U&gt; {</span></span>
<span class="line"><span>    first: T,</span></span>
<span class="line"><span>    second: U,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let pair = Pair&lt;i32, string&gt; {</span></span>
<span class="line"><span>    first: 42,</span></span>
<span class="line"><span>    second: &quot;answer&quot;,</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="generic-methods" tabindex="-1">Generic Methods <a class="header-anchor" href="#generic-methods" aria-label="Permalink to &quot;Generic Methods&quot;">​</a></h3><p>Methods on generic structs can operate on the generic types. Vex supports two styles for defining methods, both of which can be used with generic structs.</p><h4 id="kural-1-inline-methods" tabindex="-1">Kural 1: Inline Methods <a class="header-anchor" href="#kural-1-inline-methods" aria-label="Permalink to &quot;Kural 1: Inline Methods&quot;">​</a></h4><p>Methods defined inside a <code>struct</code> or <code>contract</code> use the <code>!</code> suffix on the function signature to indicate mutability.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Container&lt;T&gt; {</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Immutable method, returns a copy of the value.</span></span>
<span class="line"><span>    fn get(): T {</span></span>
<span class="line"><span>        return self.value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Mutable method, modifies the internal state.</span></span>
<span class="line"><span>    fn set(new_value: T)! {</span></span>
<span class="line"><span>        self.value = new_value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Usage</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! container = Container&lt;i32&gt; { value: 42 };</span></span>
<span class="line"><span>let val = container.get();      // val is 42</span></span>
<span class="line"><span>container.set(100)!;            // State is mutated</span></span>
<span class="line"><span>// container.value is now 100</span></span></code></pre></div><h4 id="kural-2-external-methods-golang-style" tabindex="-1">Kural 2: External Methods (Golang-style) <a class="header-anchor" href="#kural-2-external-methods-golang-style" aria-label="Permalink to &quot;Kural 2: External Methods (Golang-style)&quot;">​</a></h4><p>Methods can also be defined outside the struct body, using an explicit <code>self</code> parameter. Mutability is declared on the receiver&#39;s type.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// This style is also valid for generic structs.</span></span>
<span class="line"><span>fn (self: &amp;Container&lt;T&gt;) get_external(): T {</span></span>
<span class="line"><span>    return self.value;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;Container&lt;T&gt;!) set_external(new_value: T) {</span></span>
<span class="line"><span>    self.value = new_value;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Usage</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! container = Container&lt;i32&gt; { value: 42 };</span></span>
<span class="line"><span>let val = container.get_external();      // val is 42</span></span>
<span class="line"><span>container.set_external(100);             // State is mutated</span></span>
<span class="line"><span>// container.value is now 100</span></span></code></pre></div><h3 id="nested-generics" tabindex="-1">Nested Generics <a class="header-anchor" href="#nested-generics" aria-label="Permalink to &quot;Nested Generics&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Box&lt;T&gt; {</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Box containing Box</span></span>
<span class="line"><span>let nested = Box&lt;Box&lt;i32&gt;&gt; {</span></span>
<span class="line"><span>    value: Box&lt;i32&gt; { value: 42 }</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="examples-1" tabindex="-1">Examples <a class="header-anchor" href="#examples-1" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><p><strong>Generic Stack</strong> (Conceptual):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Stack&lt;T&gt; {</span></span>
<span class="line"><span>    items: [T],</span></span>
<span class="line"><span>    size: i32,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Stack&lt;T&gt;!) (item: T) {</span></span>
<span class="line"><span>        // Add item</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Stack&lt;T&gt;!) (): T {</span></span>
<span class="line"><span>        // Remove and return item</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Generic Point</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point&lt;T&gt; {</span></span>
<span class="line"><span>    x: T,</span></span>
<span class="line"><span>    y: T,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let int_point = Point&lt;i32&gt; { x: 10, y: 20 };</span></span>
<span class="line"><span>let float_point = Point&lt;f64&gt; { x: 1.5, y: 2.5 };</span></span></code></pre></div><hr><h2 id="generic-enums" tabindex="-1">Generic Enums <a class="header-anchor" href="#generic-enums" aria-label="Permalink to &quot;Generic Enums&quot;">​</a></h2><h3 id="basic-generic-enum-future" tabindex="-1">Basic Generic Enum (Future) <a class="header-anchor" href="#basic-generic-enum-future" aria-label="Permalink to &quot;Basic Generic Enum (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Option&lt;T&gt; {</span></span>
<span class="line"><span>    Some(T),</span></span>
<span class="line"><span>    None,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let some_int = Some(42);</span></span>
<span class="line"><span>let some_str = Some(&quot;hello&quot;);</span></span>
<span class="line"><span>let nothing: Option&lt;i32&gt; = None;</span></span></code></pre></div><h3 id="multiple-type-parameters-future" tabindex="-1">Multiple Type Parameters (Future) <a class="header-anchor" href="#multiple-type-parameters-future" aria-label="Permalink to &quot;Multiple Type Parameters (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Result&lt;T, E&gt; {</span></span>
<span class="line"><span>    Ok(T),</span></span>
<span class="line"><span>    Err(E),</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let success: Result&lt;i32, string&gt; = Ok(42);</span></span>
<span class="line"><span>let failure: Result&lt;i32, string&gt; = Err(&quot;error&quot;);</span></span></code></pre></div><h3 id="pattern-matching-future" tabindex="-1">Pattern Matching (Future) <a class="header-anchor" href="#pattern-matching-future" aria-label="Permalink to &quot;Pattern Matching (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let result = Ok(42);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>match result {</span></span>
<span class="line"><span>    Ok(value) =&gt; {</span></span>
<span class="line"><span>        // value: i32</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    Err(error) =&gt; {</span></span>
<span class="line"><span>        // error: string</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="examples-2" tabindex="-1">Examples <a class="header-anchor" href="#examples-2" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><p><strong>Option Type</strong> (Future):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Option&lt;T&gt; {</span></span>
<span class="line"><span>    Some(T),</span></span>
<span class="line"><span>    None,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn find&lt;T&gt;(arr: [T], target: T): Option&lt;i32&gt; {</span></span>
<span class="line"><span>    for i in 0..arr.() {</span></span>
<span class="line"><span>        if arr[i] == target {</span></span>
<span class="line"><span>            return Some(i);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return None;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Either Type</strong> (Future):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Either&lt;L, R&gt; {</span></span>
<span class="line"><span>    Left(L),</span></span>
<span class="line"><span>    Right(R),</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let left: Either&lt;i32, string&gt; = Either.Left(42);</span></span>
<span class="line"><span>let right: Either&lt;i32, string&gt; = Either.Right(&quot;text&quot;);</span></span></code></pre></div><hr><h2 id="generic-contracts" tabindex="-1">Generic Contracts <a class="header-anchor" href="#generic-contracts" aria-label="Permalink to &quot;Generic Contracts&quot;">​</a></h2><h3 id="generic-contract-definition-future" tabindex="-1">Generic Contract Definition (Future) <a class="header-anchor" href="#generic-contract-definition-future" aria-label="Permalink to &quot;Generic Contract Definition (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Container&lt;T&gt; {</span></span>
<span class="line"><span>    fn get(): T;</span></span>
<span class="line"><span>    fn set(value: T);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="implementation-future" tabindex="-1">Implementation (Future) <a class="header-anchor" href="#implementation-future" aria-label="Permalink to &quot;Implementation (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Box&lt;T&gt; impl Container&lt;T&gt; {</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Box&lt;T&gt;!) get(): T {</span></span>
<span class="line"><span>        return self.value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Box&lt;T&gt;!) set(value: T) {</span></span>
<span class="line"><span>        self.value = value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="generic-methods-in-contracts-future" tabindex="-1">Generic Methods in Contracts (Future) <a class="header-anchor" href="#generic-methods-in-contracts-future" aria-label="Permalink to &quot;Generic Methods in Contracts (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Converter {</span></span>
<span class="line"><span>    fn convert&lt;T&gt;(): T;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct Value impl Converter {</span></span>
<span class="line"><span>    data: i32,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Value!) convert&lt;T&gt;(): T {</span></span>
<span class="line"><span>        // Type-specific conversion</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="type-constraints" tabindex="-1">Type Constraints <a class="header-anchor" href="#type-constraints" aria-label="Permalink to &quot;Type Constraints&quot;">​</a></h2><h3 id="contract-bounds-future" tabindex="-1">Contract Bounds (Future) <a class="header-anchor" href="#contract-bounds-future" aria-label="Permalink to &quot;Contract Bounds (Future)&quot;">​</a></h3><p>Restrict generic types to those implementing specific contracts:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn print_all&lt;T: Display&gt;(items: [T]) {</span></span>
<span class="line"><span>    for item in items {</span></span>
<span class="line"><span>        item.show();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Syntax</strong>: <code>T: Contract</code> after type parameter</p><h3 id="multiple-constraints-future" tabindex="-1">Multiple Constraints (Future) <a class="header-anchor" href="#multiple-constraints-future" aria-label="Permalink to &quot;Multiple Constraints (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn compare_and_show&lt;T: Comparable &amp; Display&gt;(a: T, b: T): i32 {</span></span>
<span class="line"><span>    let result = a.compare(b);</span></span>
<span class="line"><span>    a.show();</span></span>
<span class="line"><span>    b.show();</span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Syntax</strong>: <code>T: Contract1 &amp; Contract2 &amp; ...</code></p><h3 id="where-clauses-✅-complete-v0-2-0" tabindex="-1">Where Clauses ✅ COMPLETE (v0.2.0) <a class="header-anchor" href="#where-clauses-✅-complete-v0-2-0" aria-label="Permalink to &quot;Where Clauses ✅ COMPLETE (v0.2.0)&quot;">​</a></h3><p>For complex constraints, use where clause for better readability:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn print_both&lt;T, U&gt;(a: T, b: U): i32</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>    T: Display,</span></span>
<span class="line"><span>    U: Display</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    (&quot;T: &quot;);</span></span>
<span class="line"><span>    (a);</span></span>
<span class="line"><span>    (&quot;U: &quot;);</span></span>
<span class="line"><span>    (b);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let x: i32 = 42;</span></span>
<span class="line"><span>    let y: i32 = 100;</span></span>
<span class="line"><span>    print_both(x, y);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Implementation</strong>:</p><ul><li>Parser: <code>parse_where_clause()</code> in <code>vex-parser/src/parser/items/functions.rs:138</code></li><li>AST: <code>WhereClausePredicate { type_param, bounds }</code></li><li>Syntax: <code>where T: Contract1 &amp; Contract2, U: Contract3</code></li><li>Test: <code>examples/test_where_clause.vx</code></li><li>Limitation: Struct inline methods don&#39;t support where clauses yet</li></ul><h3 id="bound-on-structs-future" tabindex="-1">Bound on Structs (Future) <a class="header-anchor" href="#bound-on-structs-future" aria-label="Permalink to &quot;Bound on Structs (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Container&lt;T: Display&gt; {</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Container&lt;T&gt;!) show() {</span></span>
<span class="line"><span>        self.value.show();  // OK: T implements Display</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="conditional-methods-future" tabindex="-1">Conditional Methods (Future) <a class="header-anchor" href="#conditional-methods-future" aria-label="Permalink to &quot;Conditional Methods (Future)&quot;">​</a></h3><p>Methods available only when constraints met:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Wrapper&lt;T&gt; {</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>impl&lt;T: Display&gt; Wrapper&lt;T&gt; {</span></span>
<span class="line"><span>    fn (self: &amp;Wrapper&lt;T&gt;!) show() {</span></span>
<span class="line"><span>        self.value.show();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// show() only available for Wrapper&lt;T&gt; where T: Display</span></span></code></pre></div><hr><h2 id="monomorphization" tabindex="-1">Monomorphization <a class="header-anchor" href="#monomorphization" aria-label="Permalink to &quot;Monomorphization&quot;">​</a></h2><h3 id="concept" tabindex="-1">Concept <a class="header-anchor" href="#concept" aria-label="Permalink to &quot;Concept&quot;">​</a></h3><p>Vex uses <strong>monomorphization</strong> for generics:</p><ul><li>Each generic instantiation generates specialized code</li><li>No runtime overhead (unlike type erasure)</li><li>Compile-time type checking</li><li>Code size increases with instantiations</li></ul><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><p><strong>Generic Code</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn identity&lt;T&gt;(x: T): T {</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let a = identity(42);</span></span>
<span class="line"><span>let b = identity(&quot;hello&quot;);</span></span></code></pre></div><p><strong>Generated Code</strong> (conceptual):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Compiler generates specialized versions:</span></span>
<span class="line"><span>fn identity_i32(x: i32): i32 {</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn identity_string(x: string): string {</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let a = identity_i32(42);</span></span>
<span class="line"><span>let b = identity_string(&quot;hello&quot;);</span></span></code></pre></div><h3 id="benefits" tabindex="-1">Benefits <a class="header-anchor" href="#benefits" aria-label="Permalink to &quot;Benefits&quot;">​</a></h3><ol><li><strong>Zero Runtime Cost</strong>: No type checking at runtime</li><li><strong>Type Safety</strong>: Full compile-time verification</li><li><strong>Optimization</strong>: Compiler can optimize each instantiation</li><li><strong>No Boxing</strong>: Values aren&#39;t boxed/wrapped</li></ol><h3 id="trade-offs" tabindex="-1">Trade-offs <a class="header-anchor" href="#trade-offs" aria-label="Permalink to &quot;Trade-offs&quot;">​</a></h3><ol><li><strong>Code Size</strong>: Each instantiation increases binary size</li><li><strong>Compile Time</strong>: More code to generate</li><li><strong>Cache Pressure</strong>: Larger code can affect cache</li></ol><h3 id="example-with-structs" tabindex="-1">Example with Structs <a class="header-anchor" href="#example-with-structs" aria-label="Permalink to &quot;Example with Structs&quot;">​</a></h3><p><strong>Generic Struct</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Box&lt;T&gt; {</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let int_box = Box&lt;i32&gt; { value: 42 };</span></span>
<span class="line"><span>let str_box = Box&lt;string&gt; { value: &quot;hello&quot; };</span></span></code></pre></div><p><strong>Generated Structs</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Box_i32 {</span></span>
<span class="line"><span>    value: i32,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct Box_string {</span></span>
<span class="line"><span>    value: string,</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="advanced-patterns" tabindex="-1">Advanced Patterns <a class="header-anchor" href="#advanced-patterns" aria-label="Permalink to &quot;Advanced Patterns&quot;">​</a></h2><h3 id="generic-wrapper" tabindex="-1">Generic Wrapper <a class="header-anchor" href="#generic-wrapper" aria-label="Permalink to &quot;Generic Wrapper&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Wrapper&lt;T&gt; {</span></span>
<span class="line"><span>    inner: T,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn wrap&lt;T&gt;(value: T): Wrapper&lt;T&gt; {</span></span>
<span class="line"><span>    return Wrapper&lt;T&gt; { inner: value };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let wrapped_int = wrap(42);</span></span>
<span class="line"><span>let wrapped_str = wrap(&quot;text&quot;);</span></span></code></pre></div><h3 id="generic-pair-operations" tabindex="-1">Generic Pair Operations <a class="header-anchor" href="#generic-pair-operations" aria-label="Permalink to &quot;Generic Pair Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Pair&lt;T, U&gt; {</span></span>
<span class="line"><span>    first: T,</span></span>
<span class="line"><span>    second: U,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Pair&lt;T, U&gt;) get_first(): T {</span></span>
<span class="line"><span>        return self.first;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Pair&lt;T, U&gt;) get_second(): U {</span></span>
<span class="line"><span>        return self.second;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Pair&lt;T, U&gt;) swap(): Pair&lt;U, T&gt; {</span></span>
<span class="line"><span>        return Pair&lt;U, T&gt; {</span></span>
<span class="line"><span>            first: self.second,</span></span>
<span class="line"><span>            second: self.first,</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="phantom-types-future" tabindex="-1">Phantom Types (Future) <a class="header-anchor" href="#phantom-types-future" aria-label="Permalink to &quot;Phantom Types (Future)&quot;">​</a></h3><p>Type parameters not stored but used for compile-time checks:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct PhantomData&lt;T&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct Marker&lt;T&gt; {</span></span>
<span class="line"><span>    data: i32,</span></span>
<span class="line"><span>    _phantom: PhantomData&lt;T&gt;,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let m1: Marker&lt;i32&gt; = Marker { data: 42, _phantom: PhantomData };</span></span>
<span class="line"><span>let m2: Marker&lt;string&gt; = Marker { data: 42, _phantom: PhantomData };</span></span>
<span class="line"><span>// m1 and m2 are different types despite same data</span></span></code></pre></div><hr><h2 id="examples-3" tabindex="-1">Examples <a class="header-anchor" href="#examples-3" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="identity-function" tabindex="-1">Identity Function <a class="header-anchor" href="#identity-function" aria-label="Permalink to &quot;Identity Function&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn identity&lt;T&gt;(x: T): T {</span></span>
<span class="line"><span>    return x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let a = identity(42);        // i32</span></span>
<span class="line"><span>    let b = identity(&quot;hello&quot;);   // string</span></span>
<span class="line"><span>    return a;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="generic-box" tabindex="-1">Generic Box <a class="header-anchor" href="#generic-box" aria-label="Permalink to &quot;Generic Box&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Box&lt;T&gt; {</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Box&lt;T&gt;) get(): T {</span></span>
<span class="line"><span>        return self.value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let box = Box&lt;i32&gt; { value: 42 };</span></span>
<span class="line"><span>    return box.get();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="swap-function" tabindex="-1">Swap Function <a class="header-anchor" href="#swap-function" aria-label="Permalink to &quot;Swap Function&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn swap&lt;T&gt;(a: T, b: T): (T, T) {</span></span>
<span class="line"><span>    return (b, a);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let (x, y) = swap&lt;i32&gt;(10, 20);</span></span>
<span class="line"><span>    return x;  // 20</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="generic-pair" tabindex="-1">Generic Pair <a class="header-anchor" href="#generic-pair" aria-label="Permalink to &quot;Generic Pair&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Pair&lt;T, U&gt; {</span></span>
<span class="line"><span>    first: T,</span></span>
<span class="line"><span>    second: U,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn make_pair&lt;T, U&gt;(a: T, b: U): Pair&lt;T, U&gt; {</span></span>
<span class="line"><span>    return Pair&lt;T, U&gt; { first: a, second: b };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let pair = make_pair&lt;i32, string&gt;(42, &quot;answer&quot;);</span></span>
<span class="line"><span>    return pair.first;  // 42</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="generic-methods-1" tabindex="-1">Generic Methods <a class="header-anchor" href="#generic-methods-1" aria-label="Permalink to &quot;Generic Methods&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Container&lt;T&gt; {</span></span>
<span class="line"><span>    value: T,</span></span>
<span class="line"><span>    count: i32,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Container&lt;T&gt;) get_value(): T {</span></span>
<span class="line"><span>        return self.value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Container&lt;T&gt;) get_count(): i32 {</span></span>
<span class="line"><span>        return self.count;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    fn (self: &amp;Container&lt;T&gt;!) increment() {</span></span>
<span class="line"><span>        self.count = self.count + 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let! container = Container&lt;i32&gt; {</span></span>
<span class="line"><span>        value: 42,</span></span>
<span class="line"><span>        count: 0,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    container.increment();</span></span>
<span class="line"><span>    return container.get_count();  // 1</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><h3 id="_1-use-descriptive-type-parameter-names" tabindex="-1">1. Use Descriptive Type Parameter Names <a class="header-anchor" href="#_1-use-descriptive-type-parameter-names" aria-label="Permalink to &quot;1. Use Descriptive Type Parameter Names&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Descriptive single letters or words</span></span>
<span class="line"><span>fn map&lt;T, U&gt;(value: T, func: fn(T): U): U { }</span></span>
<span class="line"><span>fn process&lt;Input, Output&gt;(data: Input): Output { }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Unclear abbreviations</span></span>
<span class="line"><span>fn process&lt;X, Y&gt;(data: X): Y { }</span></span></code></pre></div><p><strong>Common Conventions</strong>:</p><ul><li><code>T</code> - Generic type</li><li><code>U</code>, <code>V</code>, <code>W</code> - Additional types</li><li><code>E</code> - Error type</li><li><code>K</code> - Key type</li><li><code>V</code> - Value type</li><li><code>R</code> - Result/Return type</li></ul><h3 id="_2-prefer-specific-types-when-possible" tabindex="-1">2. Prefer Specific Types When Possible <a class="header-anchor" href="#_2-prefer-specific-types-when-possible" aria-label="Permalink to &quot;2. Prefer Specific Types When Possible&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: When type is always the same</span></span>
<span class="line"><span>fn add_integers(a: i32, b: i32): i32 {</span></span>
<span class="line"><span>    return a + b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Unnecessary generic</span></span>
<span class="line"><span>fn add&lt;T&gt;(a: T, b: T): T {</span></span>
<span class="line"><span>    return a + b;  // Assumes T supports +</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-use-constraints-for-safety-future" tabindex="-1">3. Use Constraints for Safety (Future) <a class="header-anchor" href="#_3-use-constraints-for-safety-future" aria-label="Permalink to &quot;3. Use Constraints for Safety (Future)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Explicit constraint</span></span>
<span class="line"><span>fn compare&lt;T: Comparable&gt;(a: T, b: T): bool {</span></span>
<span class="line"><span>    return a &gt; b;  // Safe: T implements Comparable</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Unconstrained</span></span>
<span class="line"><span>fn compare&lt;T&gt;(a: T, b: T): bool {</span></span>
<span class="line"><span>    return a &gt; b;  // Error: T might not support &gt;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-avoid-over-genericization" tabindex="-1">4. Avoid Over-Genericization <a class="header-anchor" href="#_4-avoid-over-genericization" aria-label="Permalink to &quot;4. Avoid Over-Genericization&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Reasonable generality</span></span>
<span class="line"><span>struct Pair&lt;T, U&gt; {</span></span>
<span class="line"><span>    first: T,</span></span>
<span class="line"><span>    second: U,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Unnecessarily complex</span></span>
<span class="line"><span>struct Pair&lt;T, U, F, G&gt;</span></span>
<span class="line"><span>where</span></span>
<span class="line"><span>    F: Fn(T): U,</span></span>
<span class="line"><span>    G: Fn(U): T</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // Too generic for common use</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_5-document-generic-constraints" tabindex="-1">5. Document Generic Constraints <a class="header-anchor" href="#_5-document-generic-constraints" aria-label="Permalink to &quot;5. Document Generic Constraints&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Creates a new container with the given value.</span></span>
<span class="line"><span>/// Type T can be any type that implements Clone.</span></span>
<span class="line"><span>fn create&lt;T: Clone&gt;(value: T): Container&lt;T&gt; {</span></span>
<span class="line"><span>    // Implementation</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="generics-summary" tabindex="-1">Generics Summary <a class="header-anchor" href="#generics-summary" aria-label="Permalink to &quot;Generics Summary&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Feature</th><th>Syntax</th><th>Status</th><th>Example</th></tr></thead><tbody><tr><td>Generic Functions</td><td><code>fn name&lt;T&gt;()</code></td><td>✅ Working</td><td><code>identity&lt;T&gt;(x: T)</code></td></tr><tr><td>Generic Structs</td><td><code>struct S&lt;T&gt; { }</code></td><td>✅ Working</td><td><code>Box&lt;i32&gt;</code></td></tr><tr><td>Multiple Parameters</td><td><code>&lt;T, U, V&gt;</code></td><td>✅ Working</td><td><code>Pair&lt;T, U&gt;</code></td></tr><tr><td>Type Inference</td><td>Omit type args</td><td>✅ Working</td><td><code>identity(42)</code></td></tr><tr><td>Generic Methods</td><td><code>fn (self: &amp;S&lt;T&gt;)</code></td><td>✅ Working</td><td>Methods on generic types</td></tr><tr><td>Monomorphization</td><td>Automatic</td><td>✅ Working</td><td>Zero runtime cost</td></tr><tr><td>Generic Enums</td><td><code>enum E&lt;T&gt; { }</code></td><td>✅ Working</td><td><code>Option&lt;T&gt;</code>, <code>Result&lt;T,E&gt;</code></td></tr><tr><td>Contract Bounds</td><td><code>&lt;T: Contract&gt;</code></td><td>✅ Working</td><td>Constrained types</td></tr><tr><td>Where Clauses</td><td><code>where T: Contract</code></td><td>✅ v0.2.0</td><td>Complex constraints</td></tr><tr><td>Associated Types</td><td><code>type Item;</code></td><td>✅ Working</td><td>Contract associated types working</td></tr><tr><td>Higher-Kinded</td><td><code>F&lt;T&gt;</code></td><td>❌ Future</td><td>Generic over generics</td></tr><tr><td>Associated Types</td><td><code>type Item;</code></td><td>✅ Working</td><td>Contract associated types working</td></tr><tr><td>Higher-Kinded</td><td><code>F&lt;T&gt;</code></td><td>❌ Future</td><td>Generic over generics</td></tr><tr><td>Const Generics</td><td><code>[T; N]</code></td><td>✅ Working</td><td>Array size parameter</td></tr></tbody></table><hr><h2 id="const-generics" tabindex="-1">Const Generics <a class="header-anchor" href="#const-generics" aria-label="Permalink to &quot;Const Generics&quot;">​</a></h2><p>Vex supports const generics, allowing types and functions to be parameterized by constant values (integers, bools) rather than just types.</p><h3 id="syntax" tabindex="-1">Syntax <a class="header-anchor" href="#syntax" aria-label="Permalink to &quot;Syntax&quot;">​</a></h3><p>Use <code>const Name: Type</code> in the type parameter list.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Function with const generic</span></span>
<span class="line"><span>fn process_array&lt;const N: usize&gt;(arr: [i32; N]) {</span></span>
<span class="line"><span>    for i in 0..N {</span></span>
<span class="line"><span>        (arr[i]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Struct with const generic</span></span>
<span class="line"><span>struct Buffer&lt;const SIZE: usize&gt; {</span></span>
<span class="line"><span>    data: [u8; SIZE],</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let buf = Buffer&lt;1024&gt; { data: [0; 1024] };</span></span>
<span class="line"><span>process_array&lt;3&gt;([1, 2, 3]);</span></span></code></pre></div><h3 id="constraints-current-limitations" tabindex="-1">Constraints (Current Limitations) <a class="header-anchor" href="#constraints-current-limitations" aria-label="Permalink to &quot;Constraints (Current Limitations)&quot;">​</a></h3><ul><li>Currently primarily supports standard integer types (usize, i32, etc.) and bools.</li><li>Complex expressions in const arguments are partially supported.</li></ul><hr><h2 id="compilation-model" tabindex="-1">Compilation Model <a class="header-anchor" href="#compilation-model" aria-label="Permalink to &quot;Compilation Model&quot;">​</a></h2><h3 id="instantiation-process" tabindex="-1">Instantiation Process <a class="header-anchor" href="#instantiation-process" aria-label="Permalink to &quot;Instantiation Process&quot;">​</a></h3><ol><li><strong>Parse</strong>: Generic definition → AST with type parameters</li><li><strong>Type Check</strong>: Verify generic constraints</li><li><strong>Instantiate</strong>: Generate concrete types for each usage</li><li><strong>Monomorphize</strong>: Create specialized code for each type</li><li><strong>Optimize</strong>: Optimize each instantiation independently</li><li><strong>Link</strong>: Combine all instantiations into binary</li></ol><h3 id="example-flow" tabindex="-1">Example Flow <a class="header-anchor" href="#example-flow" aria-label="Permalink to &quot;Example Flow&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn identity&lt;T&gt;(x: T): T { return x; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let a = identity(42);       // Instantiate identity&lt;i32&gt;</span></span>
<span class="line"><span>let b = identity(&quot;hi&quot;);     // Instantiate identity&lt;string&gt;</span></span></code></pre></div><p><strong>Compilation</strong>:</p><ol><li>Parse <code>identity&lt;T&gt;</code> as generic template</li><li>Encounter <code>identity(42)</code> → infer T = i32</li><li>Generate <code>identity_i32(x: i32): i32</code></li><li>Encounter <code>identity(&quot;hi&quot;)</code> → infer T = string</li><li>Generate <code>identity_string(x: string): string</code></li><li>Link both specialized versions</li></ol><hr><p><strong>Previous</strong>: <a href="./09_Contracts">09_Contracts.md</a><br><strong>Next</strong>: <a href="./11_Pattern_Matching">11_Pattern_Matching.md</a></p><p><strong>Maintained by</strong>: Vex Language Team</p>`,170)])])}const g=s(p,[["render",i]]);export{h as __pageData,g as default};
