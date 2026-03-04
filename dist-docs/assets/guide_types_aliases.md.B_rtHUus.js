import{_ as n,o as a,c as p,ag as e}from"./chunks/framework.BDReElpY.js";const g=JSON.parse('{"title":"Type Aliases & Conditional Types","description":"","frontmatter":{},"headers":[],"relativePath":"guide/types/aliases.md","filePath":"guide/types/aliases.md"}'),t={name:"guide/types/aliases.md"};function l(i,s,c,r,o,d){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="type-aliases-conditional-types" tabindex="-1">Type Aliases &amp; Conditional Types <a class="header-anchor" href="#type-aliases-conditional-types" aria-label="Permalink to &quot;Type Aliases &amp; Conditional Types&quot;">​</a></h1><p>Vex supports type aliases for creating readable type names and conditional types for compile-time type computation.</p><h2 id="type-aliases" tabindex="-1">Type Aliases <a class="header-anchor" href="#type-aliases" aria-label="Permalink to &quot;Type Aliases&quot;">​</a></h2><p>Create new names for existing types:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Simple type alias</span></span>
<span class="line"><span>type UserId = u64</span></span>
<span class="line"><span>type Email = string</span></span>
<span class="line"><span>type Score = f64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Pointer type aliases</span></span>
<span class="line"><span>type IntPtr = *i32</span></span>
<span class="line"><span>type MutPtr = *i32!</span></span>
<span class="line"><span>type VoidPtr = *void</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Function type alias</span></span>
<span class="line"><span>type Handler = fn(i32): bool</span></span>
<span class="line"><span>type Callback = fn(string, i32): void</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Generic type alias</span></span>
<span class="line"><span>type Pair&lt;T&gt; = (T, T)</span></span>
<span class="line"><span>type Triple&lt;T, U, V&gt; = (T, U, V)</span></span></code></pre></div><h3 id="using-type-aliases" tabindex="-1">Using Type Aliases <a class="header-anchor" href="#using-type-aliases" aria-label="Permalink to &quot;Using Type Aliases&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>type UserId = u64</span></span>
<span class="line"><span>type UserMap = HashMap&lt;UserId, User&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct User {</span></span>
<span class="line"><span>    id: UserId,</span></span>
<span class="line"><span>    name: string,</span></span>
<span class="line"><span>    score: Score</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn get_user(users: &amp;UserMap, id: UserId): Option&lt;&amp;User&gt; {</span></span>
<span class="line"><span>    users.get(&amp;id)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let id: UserId = 12345</span></span>
<span class="line"><span>    let score: Score = 98.5</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $println(f&quot;User {id} has score {score}&quot;)</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="generic-type-aliases" tabindex="-1">Generic Type Aliases <a class="header-anchor" href="#generic-type-aliases" aria-label="Permalink to &quot;Generic Type Aliases&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Alias with type parameters</span></span>
<span class="line"><span>type Result&lt;T&gt; = Result&lt;T, Error&gt;</span></span>
<span class="line"><span>type AsyncResult&lt;T&gt; = Future&lt;Result&lt;T&gt;&gt;</span></span>
<span class="line"><span>type Vec2&lt;T&gt; = (T, T)</span></span>
<span class="line"><span>type Matrix&lt;T&gt; = [[T]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Constrained generic alias</span></span>
<span class="line"><span>type Numeric&lt;T: Add + Mul&gt; = T</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Usage</span></span>
<span class="line"><span>let point: Vec2&lt;f64&gt; = (1.0, 2.0)</span></span>
<span class="line"><span>let matrix: Matrix&lt;i32&gt; = [[1, 2], [3, 4]]</span></span></code></pre></div><h2 id="conditional-types" tabindex="-1">Conditional Types <a class="header-anchor" href="#conditional-types" aria-label="Permalink to &quot;Conditional Types&quot;">​</a></h2><p>TypeScript-style conditional types for compile-time type computation:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Syntax: T extends U ? X : Y</span></span>
<span class="line"><span>// If T is assignable to U, result is X, otherwise Y</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type IsString&lt;T&gt; = T extends string ? true : false</span></span>
<span class="line"><span>type IsNumber&lt;T&gt; = T extends i32 | i64 | f32 | f64 ? true : false</span></span></code></pre></div><h3 id="the-infer-keyword" tabindex="-1">The <code>infer</code> Keyword <a class="header-anchor" href="#the-infer-keyword" aria-label="Permalink to &quot;The \`infer\` Keyword&quot;">​</a></h3><p>Extract types from generic wrappers:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Extract inner type from Option</span></span>
<span class="line"><span>type Unwrap&lt;T&gt; = T extends Option&lt;infer U&gt; ? U : T</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Unwrap&lt;Option&lt;i32&gt;&gt; → i32</span></span>
<span class="line"><span>// Unwrap&lt;string&gt; → string (not Option, returns T)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Extract Ok type from Result</span></span>
<span class="line"><span>type ExtractOk&lt;T&gt; = T extends Result&lt;infer V, infer E&gt; ? V : T</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ExtractOk&lt;Result&lt;i32, string&gt;&gt; → i32</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Extract Error type from Result</span></span>
<span class="line"><span>type ExtractErr&lt;T&gt; = T extends Result&lt;infer V, infer E&gt; ? E : never</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ExtractErr&lt;Result&lt;i32, string&gt;&gt; → string</span></span></code></pre></div><h3 id="conditional-type-examples" tabindex="-1">Conditional Type Examples <a class="header-anchor" href="#conditional-type-examples" aria-label="Permalink to &quot;Conditional Type Examples&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Filter types</span></span>
<span class="line"><span>type OnlyOption&lt;T&gt; = T extends Option&lt;infer U&gt; ? T : never</span></span>
<span class="line"><span>// OnlyOption&lt;Option&lt;i32&gt;&gt; → Option&lt;i32&gt;</span></span>
<span class="line"><span>// OnlyOption&lt;string&gt; → never</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Return type extraction</span></span>
<span class="line"><span>type ReturnType&lt;T&gt; = T extends fn(...): infer R ? R : never</span></span>
<span class="line"><span>// ReturnType&lt;fn(i32): string&gt; → string</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Parameter extraction</span></span>
<span class="line"><span>type Parameters&lt;T&gt; = T extends fn(infer P): any ? P : never</span></span>
<span class="line"><span>// Parameters&lt;fn(i32, string): bool&gt; → (i32, string)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Array element type</span></span>
<span class="line"><span>type ElementType&lt;T&gt; = T extends [infer E] ? E : never</span></span>
<span class="line"><span>// ElementType&lt;[i32]&gt; → i32</span></span></code></pre></div><h3 id="practical-conditional-types" tabindex="-1">Practical Conditional Types <a class="header-anchor" href="#practical-conditional-types" aria-label="Permalink to &quot;Practical Conditional Types&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Nullable type handling</span></span>
<span class="line"><span>type NonNullable&lt;T&gt; = T extends nil ? never : T</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Promise/Future unwrapping</span></span>
<span class="line"><span>type Awaited&lt;T&gt; = T extends Future&lt;infer U&gt; ? Awaited&lt;U&gt; : T</span></span>
<span class="line"><span>// Awaited&lt;Future&lt;Future&lt;i32&gt;&gt;&gt; → i32 (recursive unwrap)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Deep readonly</span></span>
<span class="line"><span>type DeepReadonly&lt;T&gt; = T extends object ? {</span></span>
<span class="line"><span>    readonly [K in keyof T]: DeepReadonly&lt;T[K]&gt;</span></span>
<span class="line"><span>} : T</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Flatten nested arrays</span></span>
<span class="line"><span>type Flatten&lt;T&gt; = T extends [infer U] ? Flatten&lt;U&gt; : T</span></span>
<span class="line"><span>// Flatten&lt;[[i32]]&gt; → i32</span></span></code></pre></div><h2 id="associated-types-in-contracts" tabindex="-1">Associated Types in Contracts <a class="header-anchor" href="#associated-types-in-contracts" aria-label="Permalink to &quot;Associated Types in Contracts&quot;">​</a></h2><p>Contracts can define associated types:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Iterator {</span></span>
<span class="line"><span>    type Item;                    // Associated type</span></span>
<span class="line"><span>    next()!: Option&lt;Self.Item&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>contract Container {</span></span>
<span class="line"><span>    type Item;</span></span>
<span class="line"><span>    type Iter: Iterator;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    iter(): Self.Iter;</span></span>
<span class="line"><span>    len(): usize;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct IntVec:Container {</span></span>
<span class="line"><span>    data: [i32],</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    type Item = i32;</span></span>
<span class="line"><span>    type Iter = IntVecIter;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn iter(): IntVecIter {</span></span>
<span class="line"><span>        IntVecIter { vec: self, index: 0 }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn len(): usize {</span></span>
<span class="line"><span>        self.data.len()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="type-alias-vs-newtype" tabindex="-1">Type Alias vs Newtype <a class="header-anchor" href="#type-alias-vs-newtype" aria-label="Permalink to &quot;Type Alias vs Newtype&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Type alias - same underlying type, interchangeable</span></span>
<span class="line"><span>type Meters = f64</span></span>
<span class="line"><span>type Kilometers = f64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let m: Meters = 100.0</span></span>
<span class="line"><span>let km: Kilometers = m  // OK - same type!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Newtype pattern - distinct types, not interchangeable</span></span>
<span class="line"><span>struct Meters(f64)</span></span>
<span class="line"><span>struct Kilometers(f64)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let m = Meters(100.0)</span></span>
<span class="line"><span>// let km: Kilometers = m</span><span>  // ERROR - different types!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn meters_to_km(m: Meters): Kilometers {</span></span>
<span class="line"><span>    Kilometers(m.0 / 1000.0)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="complex-type-expressions" tabindex="-1">Complex Type Expressions <a class="header-anchor" href="#complex-type-expressions" aria-label="Permalink to &quot;Complex Type Expressions&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Union type alias</span></span>
<span class="line"><span>type StringOrNumber = string | i32 | i64 | f64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Intersection-like (via contracts)</span></span>
<span class="line"><span>type Printable = impl Display + Debug</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Mapped types</span></span>
<span class="line"><span>type Readonly&lt;T&gt; = {</span></span>
<span class="line"><span>    readonly [K in keyof T]: T[K]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Partial&lt;T&gt; = {</span></span>
<span class="line"><span>    [K in keyof T]?: T[K]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Required&lt;T&gt; = {</span></span>
<span class="line"><span>    [K in keyof T]-?: T[K]</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use aliases for clarity</strong> - <code>type UserId = u64</code> is clearer than raw <code>u64</code></li><li><strong>Document complex types</strong> - Add comments for conditional types</li><li><strong>Prefer newtypes for safety</strong> - When you need type distinction</li><li><strong>Keep conditional types simple</strong> - Complex ones are hard to debug</li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Good: Clear, documented</span></span>
<span class="line"><span>/// User identifier, guaranteed unique</span></span>
<span class="line"><span>type UserId = u64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Result type for API operations</span></span>
<span class="line"><span>type ApiResult&lt;T&gt; = Result&lt;T, ApiError&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ Good: Useful conditional type</span></span>
<span class="line"><span>type Unwrap&lt;T&gt; = T extends Option&lt;infer U&gt; ? U : T</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ⚠️ Avoid: Overly complex</span></span>
<span class="line"><span>type ComplexType&lt;T, U, V&gt; = </span></span>
<span class="line"><span>    T extends Option&lt;infer A&gt; </span></span>
<span class="line"><span>        ? A extends Result&lt;infer B, infer C&gt; </span></span>
<span class="line"><span>            ? U extends [infer D] </span></span>
<span class="line"><span>                ? (B, C, D, V) </span></span>
<span class="line"><span>                : never </span></span>
<span class="line"><span>            : never </span></span>
<span class="line"><span>        : never</span></span></code></pre></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/types/generics">Generics</a> - Generic type parameters</li><li><a href="/docs/guide/types/contracts">Contracts</a> - Interfaces and bounds</li><li><a href="/docs/guide/advanced/comptime">Comptime</a> - Compile-time computation</li></ul>`,31)])])}const u=n(t,[["render",l]]);export{g as __pageData,u as default};
