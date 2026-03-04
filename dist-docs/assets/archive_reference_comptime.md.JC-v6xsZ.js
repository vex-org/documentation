import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Compile Time Execution (Comptime)","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/comptime.md","filePath":"archive/reference/comptime.md"}'),t={name:"archive/reference/comptime.md"};function i(l,a,o,c,r,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="compile-time-execution-comptime" tabindex="-1">Compile Time Execution (Comptime) <a class="header-anchor" href="#compile-time-execution-comptime" aria-label="Permalink to &quot;Compile Time Execution (Comptime)&quot;">​</a></h1><p><strong>Status:</strong> In Development<br><strong>Last Updated:</strong> January 7, 2026</p><hr><h2 id="_1-overview" tabindex="-1">1. Overview <a class="header-anchor" href="#_1-overview" aria-label="Permalink to &quot;1. Overview&quot;">​</a></h2><p>Vex provides powerful compile-time metaprogramming capabilities through <code>$</code>-prefixed builtins. All comptime operations are evaluated during compilation, producing zero runtime overhead.</p><h3 id="design-principles" tabindex="-1">Design Principles <a class="header-anchor" href="#design-principles" aria-label="Permalink to &quot;Design Principles&quot;">​</a></h3><ol><li><strong>Zero Runtime Cost</strong>: All <code>$</code> operations resolve at compile time</li><li><strong>Type Safety</strong>: Comptime operations are fully type-checked</li><li><strong>Predictability</strong>: No hidden magic - explicit is better than implicit</li><li><strong>Consistency</strong>: All builtins use <code>$camelCase</code> naming convention</li></ol><hr><h2 id="_2-naming-convention" tabindex="-1">2. Naming Convention <a class="header-anchor" href="#_2-naming-convention" aria-label="Permalink to &quot;2. Naming Convention&quot;">​</a></h2><p>All compiler builtins use <code>$camelCase</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$sizeOf&lt;T&gt;()      // ✅ Correct</span></span>
<span class="line"><span>$sizeof&lt;T&gt;()      // ❌ Deprecated (but supported for compatibility)</span></span>
<span class="line"><span>$size_of&lt;T&gt;()     // ❌ Wrong</span></span></code></pre></div><h3 id="categories" tabindex="-1">Categories <a class="header-anchor" href="#categories" aria-label="Permalink to &quot;Categories&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Prefix</th><th>Purpose</th><th>Example</th></tr></thead><tbody><tr><td><code>$is*</code></td><td>Type predicates</td><td><code>$isStruct&lt;T&gt;()</code></td></tr><tr><td><code>$field*</code></td><td>Field operations</td><td><code>$fieldGet(obj, &quot;x&quot;)</code></td></tr><tr><td><code>$type*</code></td><td>Type operations</td><td><code>$typeName&lt;T&gt;()</code></td></tr><tr><td><code>$*Of</code></td><td>Size/alignment queries</td><td><code>$sizeOf&lt;T&gt;()</code></td></tr></tbody></table><hr><h2 id="_3-type-introspection" tabindex="-1">3. Type Introspection <a class="header-anchor" href="#_3-type-introspection" aria-label="Permalink to &quot;3. Type Introspection&quot;">​</a></h2><h3 id="_3-1-size-and-alignment" tabindex="-1">3.1 Size and Alignment <a class="header-anchor" href="#_3-1-size-and-alignment" aria-label="Permalink to &quot;3.1 Size and Alignment&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Returns the size of type T in bytes</span></span>
<span class="line"><span>$sizeOf&lt;T&gt;(): u64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Returns the alignment requirement of type T in bytes</span></span>
<span class="line"><span>$alignOf&lt;T&gt;(): u64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Returns the offset of a field within a struct (in bytes)</span></span>
<span class="line"><span>$offsetOf&lt;T&gt;(&quot;fieldName&quot;): u64</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Point { x: f64, y: f64 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let size = $sizeOf&lt;Point&gt;();        // 16</span></span>
<span class="line"><span>let align = $alignOf&lt;Point&gt;();      // 8</span></span>
<span class="line"><span>let offset = $offsetOf&lt;Point&gt;(&quot;y&quot;); // 8</span></span></code></pre></div><h3 id="_3-2-type-names" tabindex="-1">3.2 Type Names <a class="header-anchor" href="#_3-2-type-names" aria-label="Permalink to &quot;3.2 Type Names&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Returns the fully qualified type name as a string</span></span>
<span class="line"><span>$typeName&lt;T&gt;(): str</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Returns the short type name (without generics)</span></span>
<span class="line"><span>$typeBaseName&lt;T&gt;(): str</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$typeName&lt;Vec&lt;i32&gt;&gt;()      // &quot;Vec&lt;i32&gt;&quot;</span></span>
<span class="line"><span>$typeBaseName&lt;Vec&lt;i32&gt;&gt;()  // &quot;Vec&quot;</span></span>
<span class="line"><span>$typeName&lt;i32&gt;()           // &quot;i32&quot;</span></span></code></pre></div><h3 id="_3-3-type-predicates" tabindex="-1">3.3 Type Predicates <a class="header-anchor" href="#_3-3-type-predicates" aria-label="Permalink to &quot;3.3 Type Predicates&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Check if T is a struct type</span></span>
<span class="line"><span>$isStruct&lt;T&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T is an enum type</span></span>
<span class="line"><span>$isEnum&lt;T&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T is a primitive type (i32, f64, bool, etc.)</span></span>
<span class="line"><span>$isPrimitive&lt;T&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T is a pointer type</span></span>
<span class="line"><span>$isPointer&lt;T&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T is a reference type</span></span>
<span class="line"><span>$isReference&lt;T&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T is an array type</span></span>
<span class="line"><span>$isArray&lt;T&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T is a tuple type</span></span>
<span class="line"><span>$isTuple&lt;T&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T is a function type</span></span>
<span class="line"><span>$isFunction&lt;T&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T is a generic type</span></span>
<span class="line"><span>$isGeneric&lt;T&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T is Copy (can be trivially copied)</span></span>
<span class="line"><span>$isCopy&lt;T&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T needs drop (has destructor)</span></span>
<span class="line"><span>$needsDrop&lt;T&gt;(): bool</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process&lt;T&gt;(value: T) {</span></span>
<span class="line"><span>    $if $isPrimitive&lt;T&gt;() {</span></span>
<span class="line"><span>        // Fast path for primitives</span></span>
<span class="line"><span>        println(&quot;Primitive: {}&quot;, value);</span></span>
<span class="line"><span>    } $elif $isStruct&lt;T&gt;() {</span></span>
<span class="line"><span>        // Handle structs</span></span>
<span class="line"><span>        println(&quot;Struct with {} fields&quot;, $fieldCount&lt;T&gt;());</span></span>
<span class="line"><span>    } $else {</span></span>
<span class="line"><span>        // Generic fallback</span></span>
<span class="line"><span>        println(&quot;Other type: {}&quot;, $typeName&lt;T&gt;());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-4-default-values" tabindex="-1">3.4 Default Values <a class="header-anchor" href="#_3-4-default-values" aria-label="Permalink to &quot;3.4 Default Values&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Returns the default value for type T</span></span>
<span class="line"><span>/// Primitives: i32→0, bool→false, f64→0.0, str→&quot;&quot;</span></span>
<span class="line"><span>/// Structs: zero-initialized or calls Default impl</span></span>
<span class="line"><span>$default&lt;T&gt;(): T</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if type T has a default value</span></span>
<span class="line"><span>$hasDefault&lt;T&gt;(): bool</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn create_array&lt;T&gt;(): [T; 10] {</span></span>
<span class="line"><span>    let! arr: [T; 10] = $default&lt;[T; 10]&gt;();</span></span>
<span class="line"><span>    arr</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Zero-initialize a struct</span></span>
<span class="line"><span>let point = $default&lt;Point&gt;();  // Point { x: 0.0, y: 0.0 }</span></span></code></pre></div><h3 id="_3-5-type-comparison" tabindex="-1">3.5 Type Comparison <a class="header-anchor" href="#_3-5-type-comparison" aria-label="Permalink to &quot;3.5 Type Comparison&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Check if two types are exactly the same</span></span>
<span class="line"><span>$sameType&lt;A, B&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T implements a trait</span></span>
<span class="line"><span>$implements&lt;T, Trait&gt;(): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if T can be converted to U</span></span>
<span class="line"><span>$convertible&lt;T, U&gt;(): bool</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$if $sameType&lt;T, i32&gt;() {</span></span>
<span class="line"><span>    // T is exactly i32</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$if $implements&lt;T, $Clone&gt;() {</span></span>
<span class="line"><span>    let copy = value.clone();</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_4-struct-reflection" tabindex="-1">4. Struct Reflection <a class="header-anchor" href="#_4-struct-reflection" aria-label="Permalink to &quot;4. Struct Reflection&quot;">​</a></h2><h3 id="_4-1-field-information" tabindex="-1">4.1 Field Information <a class="header-anchor" href="#_4-1-field-information" aria-label="Permalink to &quot;4.1 Field Information&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Returns the number of fields in a struct</span></span>
<span class="line"><span>$fieldCount&lt;T&gt;(): u64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Returns an array of field names</span></span>
<span class="line"><span>$fieldNames&lt;T&gt;(): [str]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Returns the type name of a field</span></span>
<span class="line"><span>$fieldType&lt;T&gt;(&quot;fieldName&quot;): str</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if struct has a field with given name</span></span>
<span class="line"><span>$hasField&lt;T&gt;(&quot;fieldName&quot;): bool</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct User {</span></span>
<span class="line"><span>    id: i64,</span></span>
<span class="line"><span>    name: str,</span></span>
<span class="line"><span>    active: bool</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$fieldCount&lt;User&gt;()           // 3</span></span>
<span class="line"><span>$fieldNames&lt;User&gt;()           // [&quot;id&quot;, &quot;name&quot;, &quot;active&quot;]</span></span>
<span class="line"><span>$fieldType&lt;User&gt;(&quot;name&quot;)      // &quot;str&quot;</span></span>
<span class="line"><span>$hasField&lt;User&gt;(&quot;email&quot;)      // false</span></span></code></pre></div><h3 id="_4-2-field-access-runtime" tabindex="-1">4.2 Field Access (Runtime) <a class="header-anchor" href="#_4-2-field-access-runtime" aria-label="Permalink to &quot;4.2 Field Access (Runtime)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Get field value by name (runtime operation, comptime-generated)</span></span>
<span class="line"><span>$fieldGet&lt;T&gt;(obj: &amp;T, &quot;fieldName&quot;): FieldType</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Set field value by name (runtime operation, comptime-generated)</span></span>
<span class="line"><span>$fieldSet&lt;T&gt;(obj: &amp;T!, &quot;fieldName&quot;, value: FieldType)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Get field as pointer</span></span>
<span class="line"><span>$fieldPtr&lt;T&gt;(obj: &amp;T, &quot;fieldName&quot;): *FieldType</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let user = User { id: 1, name: &quot;Alice&quot;, active: true };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let name = $fieldGet(&amp;user, &quot;name&quot;);  // &quot;Alice&quot;</span></span>
<span class="line"><span>$fieldSet(&amp;user!, &quot;active&quot;, false);   // user.active = false</span></span></code></pre></div><h3 id="_4-3-struct-tags-metadata" tabindex="-1">4.3 Struct Tags (Metadata) <a class="header-anchor" href="#_4-3-struct-tags-metadata" aria-label="Permalink to &quot;4.3 Struct Tags (Metadata)&quot;">​</a></h3><p><strong>Tag Syntax:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct User {</span></span>
<span class="line"><span>    id: i64 \`json:&quot;user_id&quot; db:&quot;primary_key&quot;\`,</span></span>
<span class="line"><span>    name: str \`json:&quot;name&quot; validate:&quot;required,min=2&quot;\`,</span></span>
<span class="line"><span>    password: str \`json:&quot;-&quot;\`,  // Skip in JSON</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Accessing Tags via $typeInfo (comptime only):</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// $typeInfo is a compiler intrinsic - no import needed</span></span>
<span class="line"><span>// Can ONLY be used inside $for loops (compile-time iteration)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Iterate fields with their tags</span></span>
<span class="line"><span>$for f in $typeInfo&lt;User&gt;().fields {</span></span>
<span class="line"><span>    $println(&quot;Field: &quot;, f.name, &quot; type: &quot;, f.type_name);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Iterate tags for each field</span></span>
<span class="line"><span>    $for t in f.tags {</span></span>
<span class="line"><span>        $println(&quot;  tag: &quot;, t.key, &quot; = &quot;, t.value);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With let bindings</span></span>
<span class="line"><span>$for f in $typeInfo&lt;User&gt;().fields {</span></span>
<span class="line"><span>    let field_name = f.name;</span></span>
<span class="line"><span>    let field_type = f.type_name;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $for t in f.tags {</span></span>
<span class="line"><span>        let tag_key = t.key;</span></span>
<span class="line"><span>        let tag_value = t.value;</span></span>
<span class="line"><span>        $println(tag_key, &quot;: &quot;, tag_value);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Output:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Field: id type: I64</span></span>
<span class="line"><span>  tag: json = user_id</span></span>
<span class="line"><span>  tag: db = primary_key</span></span>
<span class="line"><span>Field: name type: String</span></span>
<span class="line"><span>  tag: json = name</span></span>
<span class="line"><span>  tag: validate = required,min=2</span></span>
<span class="line"><span>Field: password type: String</span></span>
<span class="line"><span>  tag: json = -</span></span></code></pre></div><blockquote><p><strong>Note:</strong> <code>$typeInfo&lt;T&gt;()</code> is compile-time only. It cannot be stored in variables or used at runtime. The iteration is unrolled at compile time, generating specialized code for each field.</p></blockquote><p><strong>Direct Tag Intrinsics (also available):</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Get tag value for a field (returns empty string if not found)</span></span>
<span class="line"><span>let json_name = $fieldTag&lt;User&gt;(&quot;id&quot;, &quot;json&quot;);  // &quot;user_id&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Check if field has a specific tag</span></span>
<span class="line"><span>let has_db = $hasFieldTag&lt;User&gt;(&quot;id&quot;, &quot;db&quot;);    // true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Get all tags for a field as comma-separated string</span></span>
<span class="line"><span>let all_tags = $fieldTags&lt;User&gt;(&quot;id&quot;);          // &quot;json:user_id,db:primary_key&quot;</span></span></code></pre></div><hr><h2 id="_5-enum-reflection" tabindex="-1">5. Enum Reflection <a class="header-anchor" href="#_5-enum-reflection" aria-label="Permalink to &quot;5. Enum Reflection&quot;">​</a></h2><h3 id="_5-1-variant-information" tabindex="-1">5.1 Variant Information <a class="header-anchor" href="#_5-1-variant-information" aria-label="Permalink to &quot;5.1 Variant Information&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Returns the number of variants in an enum</span></span>
<span class="line"><span>$variantCount&lt;T&gt;(): u64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Returns an array of variant names</span></span>
<span class="line"><span>$variantNames&lt;T&gt;(): [str]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if enum has a variant with given name</span></span>
<span class="line"><span>$hasVariant&lt;T&gt;(&quot;variantName&quot;): bool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Get discriminant value of a variant</span></span>
<span class="line"><span>$variantDiscriminant&lt;T&gt;(&quot;variantName&quot;): i64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Get payload type of a variant (returns type name as string)</span></span>
<span class="line"><span>$variantPayload&lt;T&gt;(&quot;variantName&quot;): str</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if variant has payload data</span></span>
<span class="line"><span>$variantHasPayload&lt;T&gt;(&quot;variantName&quot;): bool</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Status {</span></span>
<span class="line"><span>    Pending,</span></span>
<span class="line"><span>    Active,</span></span>
<span class="line"><span>    Completed(i32),</span></span>
<span class="line"><span>    Failed(str)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$variantCount&lt;Status&gt;()                    // 4</span></span>
<span class="line"><span>$variantNames&lt;Status&gt;()                    // [&quot;Pending&quot;, &quot;Active&quot;, &quot;Completed&quot;, &quot;Failed&quot;]</span></span>
<span class="line"><span>$hasVariant&lt;Status&gt;(&quot;Active&quot;)              // true</span></span>
<span class="line"><span>$variantDiscriminant&lt;Status&gt;(&quot;Pending&quot;)    // 0</span></span></code></pre></div><hr><h2 id="_6-compile-time-arithmetic" tabindex="-1">6. Compile-Time Arithmetic <a class="header-anchor" href="#_6-compile-time-arithmetic" aria-label="Permalink to &quot;6. Compile-Time Arithmetic&quot;">​</a></h2><h3 id="_6-1-basic-arithmetic" tabindex="-1">6.1 Basic Arithmetic <a class="header-anchor" href="#_6-1-basic-arithmetic" aria-label="Permalink to &quot;6.1 Basic Arithmetic&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Compile-time power</span></span>
<span class="line"><span>$constPow(base, exp): i64       // or alias: $pow</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Compile-time absolute value</span></span>
<span class="line"><span>$constAbs(value): i64           // or alias: $abs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Compile-time minimum of two values</span></span>
<span class="line"><span>$constMin(a, b): i64            // or alias: $min</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Compile-time maximum of two values</span></span>
<span class="line"><span>$constMax(a, b): i64            // or alias: $max</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Compile-time clamp to range</span></span>
<span class="line"><span>$constClamp(value, min, max): i64  // or alias: $clamp</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const LOOKUP_SIZE = $constPow(2, 10);  // 1024</span></span>
<span class="line"><span>const ABSOLUTE = $constAbs(-42);       // 42</span></span>
<span class="line"><span>const BOUNDED = $constClamp(50, 0, 100);  // 50</span></span></code></pre></div><h3 id="_6-2-math-functions" tabindex="-1">6.2 Math Functions <a class="header-anchor" href="#_6-2-math-functions" aria-label="Permalink to &quot;6.2 Math Functions&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Compile-time integer log base 2</span></span>
<span class="line"><span>$constLog2(value): i64          // or alias: $log2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Compile-time integer square root</span></span>
<span class="line"><span>$constSqrt(value): i64          // or alias: $sqrt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Compile-time greatest common divisor</span></span>
<span class="line"><span>$constGcd(a, b): i64            // or alias: $gcd</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Compile-time least common multiple</span></span>
<span class="line"><span>$constLcm(a, b): i64            // or alias: $lcm</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const LOG_SIZE = $constLog2(1024);  // 10</span></span>
<span class="line"><span>const SQRT_VAL = $constSqrt(100);   // 10</span></span>
<span class="line"><span>const GCD = $constGcd(48, 18);      // 6</span></span></code></pre></div><h3 id="_6-3-bit-operations" tabindex="-1">6.3 Bit Operations <a class="header-anchor" href="#_6-3-bit-operations" aria-label="Permalink to &quot;6.3 Bit Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Check if value is power of 2</span></span>
<span class="line"><span>$isPowerOf2(value): bool        // or alias: $isPowerOfTwo</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Next power of 2 &gt;= value</span></span>
<span class="line"><span>$nextPowerOf2(value): i64       // or alias: $nextPow2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Count set bits (population count)</span></span>
<span class="line"><span>$bitCount(value): i64           // or alias: $popcount</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Count leading zeros</span></span>
<span class="line"><span>$leadingZeros(value): i64       // or alias: $clz</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Count trailing zeros</span></span>
<span class="line"><span>$trailingZeros(value): i64      // or alias: $ctz</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$if $isPowerOf2(BUFFER_SIZE) {</span></span>
<span class="line"><span>    // Use efficient bit masking</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const ALIGNED_SIZE = $nextPowerOf2(513);  // 1024</span></span>
<span class="line"><span>const BITS = $bitCount(0xFF);             // 8</span></span></code></pre></div><hr><h2 id="_7-compile-time-control-flow" tabindex="-1">7. Compile-Time Control Flow <a class="header-anchor" href="#_7-compile-time-control-flow" aria-label="Permalink to &quot;7. Compile-Time Control Flow&quot;">​</a></h2><h3 id="_7-1-conditional-compilation" tabindex="-1">7.1 Conditional Compilation <a class="header-anchor" href="#_7-1-conditional-compilation" aria-label="Permalink to &quot;7.1 Conditional Compilation&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Compile-time if - branches are eliminated at compile time</span></span>
<span class="line"><span>$if &lt;condition&gt; {</span></span>
<span class="line"><span>    // Included if condition is true</span></span>
<span class="line"><span>} $elif &lt;condition2&gt; {</span></span>
<span class="line"><span>    // Included if condition2 is true</span></span>
<span class="line"><span>} $else {</span></span>
<span class="line"><span>    // Fallback</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Rules:</strong></p><ul><li>Conditions must be comptime-evaluable</li><li>Only the matching branch is compiled</li><li>Other branches are completely eliminated (no type checking)</li></ul><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn serialize&lt;T&gt;(value: &amp;T): str {</span></span>
<span class="line"><span>    $if $isPrimitive&lt;T&gt;() {</span></span>
<span class="line"><span>        return value.toString();</span></span>
<span class="line"><span>    } $elif $isStruct&lt;T&gt;() {</span></span>
<span class="line"><span>        return serializeStruct(value);</span></span>
<span class="line"><span>    } $elif $isEnum&lt;T&gt;() {</span></span>
<span class="line"><span>        return serializeEnum(value);</span></span>
<span class="line"><span>    } $else {</span></span>
<span class="line"><span>        $compileError(&quot;Cannot serialize type: &quot; + $typeName&lt;T&gt;());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_7-2-compile-time-loops" tabindex="-1">7.2 Compile-Time Loops <a class="header-anchor" href="#_7-2-compile-time-loops" aria-label="Permalink to &quot;7.2 Compile-Time Loops&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Iterate over struct fields at compile time</span></span>
<span class="line"><span>$for field in $fields&lt;T&gt;() {</span></span>
<span class="line"><span>    // field.name: str</span></span>
<span class="line"><span>    // field.type: str</span></span>
<span class="line"><span>    // field.index: u64</span></span>
<span class="line"><span>    // field.tag(key): str</span></span>
<span class="line"><span>    // field.hasTag(key): bool</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Iterate over enum variants at compile time</span></span>
<span class="line"><span>$for variant in $variants&lt;T&gt;() {</span></span>
<span class="line"><span>    // variant.name: str</span></span>
<span class="line"><span>    // variant.index: u64</span></span>
<span class="line"><span>    // variant.discriminant: i64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Compile-time range iteration</span></span>
<span class="line"><span>$for i in 0..N {</span></span>
<span class="line"><span>    // i is compile-time constant</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Compile-time while loop (condition must be comptime-evaluable)</span></span>
<span class="line"><span>$while &lt;condition&gt; {</span></span>
<span class="line"><span>    // Body is unrolled at compile time</span></span>
<span class="line"><span>    // Use with caution - infinite loops will hang compilation</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example - Zero-Cost JSON Serializer:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn toJson&lt;T&gt;(obj: &amp;T): str {</span></span>
<span class="line"><span>    let! result = &quot;{&quot;;</span></span>
<span class="line"><span>    let! first = true;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $for field in $fields&lt;T&gt;() {</span></span>
<span class="line"><span>        let jsonKey = field.tag(&quot;json&quot;);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        $if jsonKey != &quot;-&quot; {</span></span>
<span class="line"><span>            if !first { result = result + &quot;, &quot;; }</span></span>
<span class="line"><span>            first = false;</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            let key = $if jsonKey != &quot;&quot; { jsonKey } $else { field.name };</span></span>
<span class="line"><span>            let value = $fieldGet(obj, field.name);</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            $if field.type == &quot;str&quot; {</span></span>
<span class="line"><span>                result = result + &quot;\\&quot;&quot; + key + &quot;\\&quot;: \\&quot;&quot; + value + &quot;\\&quot;&quot;;</span></span>
<span class="line"><span>            } $elif field.type == &quot;i32&quot; || field.type == &quot;i64&quot; {</span></span>
<span class="line"><span>                result = result + &quot;\\&quot;&quot; + key + &quot;\\&quot;: &quot; + value.toString();</span></span>
<span class="line"><span>            } $elif field.type == &quot;bool&quot; {</span></span>
<span class="line"><span>                result = result + &quot;\\&quot;&quot; + key + &quot;\\&quot;: &quot; + (if value { &quot;true&quot; } else { &quot;false&quot; });</span></span>
<span class="line"><span>            } $elif $isStruct&lt;field.type&gt;() {</span></span>
<span class="line"><span>                result = result + &quot;\\&quot;&quot; + key + &quot;\\&quot;: &quot; + toJson(&amp;value);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result + &quot;}&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_8-compile-time-assertions-and-errors" tabindex="-1">8. Compile-Time Assertions and Errors <a class="header-anchor" href="#_8-compile-time-assertions-and-errors" aria-label="Permalink to &quot;8. Compile-Time Assertions and Errors&quot;">​</a></h2><h3 id="_8-1-static-assertions" tabindex="-1">8.1 Static Assertions <a class="header-anchor" href="#_8-1-static-assertions" aria-label="Permalink to &quot;8.1 Static Assertions&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Assert a condition at compile time</span></span>
<span class="line"><span>$staticAssert(&lt;condition&gt;, &quot;error message&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Trigger a compile error unconditionally</span></span>
<span class="line"><span>$compileError(&quot;error message&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Trigger a compile warning</span></span>
<span class="line"><span>$compileWarning(&quot;warning message&quot;)</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn alignedCopy&lt;T&gt;(src: &amp;T, dst: &amp;T!) {</span></span>
<span class="line"><span>    $staticAssert($alignOf&lt;T&gt;() &gt;= 8, &quot;Type must be 8-byte aligned&quot;);</span></span>
<span class="line"><span>    $staticAssert($sizeOf&lt;T&gt;() &lt;= 64, &quot;Type too large for aligned copy&quot;);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // ... implementation</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_8-2-debug-helpers" tabindex="-1">8.2 Debug Helpers <a class="header-anchor" href="#_8-2-debug-helpers" aria-label="Permalink to &quot;8.2 Debug Helpers&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Print type information at compile time</span></span>
<span class="line"><span>$debugType&lt;T&gt;()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Print expression value at compile time (if evaluable)</span></span>
<span class="line"><span>$debugExpr(expr)</span></span></code></pre></div><hr><h2 id="_9-code-generation" tabindex="-1">9. Code Generation <a class="header-anchor" href="#_9-code-generation" aria-label="Permalink to &quot;9. Code Generation&quot;">​</a></h2><h3 id="_9-1-string-operations" tabindex="-1">9.1 String Operations <a class="header-anchor" href="#_9-1-string-operations" aria-label="Permalink to &quot;9.1 String Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Convert expression/identifier to string literal</span></span>
<span class="line"><span>$stringify(expr): str</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Concatenate identifiers to form a new identifier</span></span>
<span class="line"><span>$concatIdents(a, b, ...): ident</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Convert string to identifier</span></span>
<span class="line"><span>$ident(&quot;name&quot;): ident</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Generate getter/setter for each field</span></span>
<span class="line"><span>$for field in $fields&lt;T&gt;() {</span></span>
<span class="line"><span>    fn $concatIdents(&quot;get&quot;, field.name)&lt;T&gt;(self: &amp;T): field.type {</span></span>
<span class="line"><span>        return $fieldGet(self, field.name);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn $concatIdents(&quot;set&quot;, field.name)&lt;T&gt;(self: &amp;T!, value: field.type) {</span></span>
<span class="line"><span>        $fieldSet(self, field.name, value);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_9-2-file-inclusion" tabindex="-1">9.2 File Inclusion <a class="header-anchor" href="#_9-2-file-inclusion" aria-label="Permalink to &quot;9.2 File Inclusion&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Include file contents as string literal</span></span>
<span class="line"><span>$includeStr(&quot;path/to/file.txt&quot;): str</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Include file contents as byte array</span></span>
<span class="line"><span>$includeBytes(&quot;path/to/file.bin&quot;): [u8]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Include and parse Vex code from file</span></span>
<span class="line"><span>$include(&quot;path/to/code.vx&quot;)</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Embed SQL schema at compile time</span></span>
<span class="line"><span>const SCHEMA: str = $includeStr(&quot;schema.sql&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Embed binary resource</span></span>
<span class="line"><span>const ICON: [u8] = $includeBytes(&quot;icon.png&quot;);</span></span></code></pre></div><h3 id="_9-3-environment-variables" tabindex="-1">9.3 Environment Variables <a class="header-anchor" href="#_9-3-environment-variables" aria-label="Permalink to &quot;9.3 Environment Variables&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Read environment variable at compile time</span></span>
<span class="line"><span>$env(&quot;VAR_NAME&quot;): str</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Read with default value</span></span>
<span class="line"><span>$envOr(&quot;VAR_NAME&quot;, &quot;default&quot;): str</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// Check if environment variable is set</span></span>
<span class="line"><span>$hasEnv(&quot;VAR_NAME&quot;): bool</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const VERSION: str = $envOr(&quot;BUILD_VERSION&quot;, &quot;dev&quot;);</span></span>
<span class="line"><span>const DEBUG: bool = $env(&quot;DEBUG&quot;) == &quot;1&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$if $hasEnv(&quot;FEATURE_X&quot;) {</span></span>
<span class="line"><span>    // Compile with feature X</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_10-advanced-const-evaluation" tabindex="-1">10. Advanced: Const Evaluation <a class="header-anchor" href="#_10-advanced-const-evaluation" aria-label="Permalink to &quot;10. Advanced: Const Evaluation&quot;">​</a></h2><h3 id="_10-1-const-blocks" tabindex="-1">10.1 Const Blocks <a class="header-anchor" href="#_10-1-const-blocks" aria-label="Permalink to &quot;10.1 Const Blocks&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Force compile-time evaluation of an expression</span></span>
<span class="line"><span>$const {</span></span>
<span class="line"><span>    // All code here is evaluated at compile time</span></span>
<span class="line"><span>    // Result is embedded as a constant</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Compile-time computed lookup table</span></span>
<span class="line"><span>const SIN_TABLE: [f64; 360] = $const {</span></span>
<span class="line"><span>    let! table: [f64; 360] = [0.0; 360];</span></span>
<span class="line"><span>    for i in 0..360 {</span></span>
<span class="line"><span>        table[i] = sin(i as f64 * PI / 180.0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    table</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="_10-2-const-functions" tabindex="-1">10.2 Const Functions <a class="header-anchor" href="#_10-2-const-functions" aria-label="Permalink to &quot;10.2 Const Functions&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Mark function as const-evaluable</span></span>
<span class="line"><span>const fn factorial(n: u64): u64 {</span></span>
<span class="line"><span>    if n &lt;= 1 { 1 } else { n * factorial(n - 1) }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Can be used in const contexts</span></span>
<span class="line"><span>const FACT_10: u64 = factorial(10);  // Computed at compile time</span></span></code></pre></div><hr><h2 id="_11-implementation-phases" tabindex="-1">11. Implementation Phases <a class="header-anchor" href="#_11-implementation-phases" aria-label="Permalink to &quot;11. Implementation Phases&quot;">​</a></h2><h3 id="phase-1-core-type-introspection-✅" tabindex="-1">Phase 1: Core Type Introspection ✅ <a class="header-anchor" href="#phase-1-core-type-introspection-✅" aria-label="Permalink to &quot;Phase 1: Core Type Introspection ✅&quot;">​</a></h3><ul><li>[x] <code>$sizeOf&lt;T&gt;()</code> / <code>$sizeof&lt;T&gt;()</code></li><li>[x] <code>$alignOf&lt;T&gt;()</code> / <code>$alignof&lt;T&gt;()</code></li><li>[x] <code>$typeName&lt;T&gt;()</code></li><li>[x] <code>$drop(value)</code></li></ul><h3 id="phase-2-type-predicates-✅" tabindex="-1">Phase 2: Type Predicates ✅ <a class="header-anchor" href="#phase-2-type-predicates-✅" aria-label="Permalink to &quot;Phase 2: Type Predicates ✅&quot;">​</a></h3><ul><li>[x] <code>$isStruct&lt;T&gt;()</code></li><li>[x] <code>$isEnum&lt;T&gt;()</code></li><li>[x] <code>$isPrimitive&lt;T&gt;()</code></li><li>[x] <code>$isInteger&lt;T&gt;()</code></li><li>[x] <code>$isFloat&lt;T&gt;()</code></li><li>[x] <code>$isSigned&lt;T&gt;()</code></li><li>[x] <code>$isPointer&lt;T&gt;()</code></li><li>[x] <code>$isReference&lt;T&gt;()</code> ✨ NEW</li><li>[x] <code>$isFunction&lt;T&gt;()</code> ✨ NEW</li><li>[x] <code>$isGeneric&lt;T&gt;()</code> ✨ NEW</li><li>[x] <code>$isArray&lt;T&gt;()</code></li><li>[x] <code>$isTuple&lt;T&gt;()</code></li><li>[x] <code>$isSlice&lt;T&gt;()</code> ✨ NEW</li><li>[x] <code>$isOption&lt;T&gt;()</code> ✨ NEW</li><li>[x] <code>$isResult&lt;T&gt;()</code> ✨ NEW</li><li>[x] <code>$isCopy&lt;T&gt;()</code></li><li>[x] <code>$needsDrop&lt;T&gt;()</code></li><li>[x] <code>$sameType&lt;A, B&gt;()</code></li><li>[x] <code>$implements&lt;T, Trait&gt;()</code></li></ul><h3 id="phase-3-struct-reflection-✅" tabindex="-1">Phase 3: Struct Reflection ✅ <a class="header-anchor" href="#phase-3-struct-reflection-✅" aria-label="Permalink to &quot;Phase 3: Struct Reflection ✅&quot;">​</a></h3><ul><li>[x] <code>$fields&lt;T&gt;()</code> iterator (in $for loops)</li><li>[x] <code>$typeInfo&lt;T&gt;().fields</code> iterator with tag support</li><li>[x] <code>f.name</code>, <code>f.type_name</code> field properties</li><li>[x] <code>f.tags</code> nested iterator with <code>t.key</code>, <code>t.value</code></li><li>[x] <code>$fieldCount&lt;T&gt;()</code></li><li>[x] <code>$fieldNames&lt;T&gt;()</code> (returns comma-separated string)</li><li>[x] <code>$hasField&lt;T&gt;(&quot;name&quot;)</code></li><li>[x] <code>$fieldType&lt;T&gt;(&quot;name&quot;)</code></li><li>[x] <code>$fieldGet(obj, &quot;name&quot;)</code> - dynamic field access</li><li>[x] <code>$fieldSet(obj, &quot;name&quot;, value)</code> - dynamic field mutation</li><li>[x] <code>$fieldTag&lt;T&gt;(&quot;field&quot;, &quot;tag&quot;)</code> - get specific tag value</li><li>[x] <code>$hasFieldTag&lt;T&gt;(&quot;field&quot;, &quot;tag&quot;)</code> - check if tag exists</li><li>[x] <code>$fieldTags&lt;T&gt;(&quot;field&quot;)</code> - get all tags as string</li><li>[x] <code>$offsetOf&lt;T&gt;(&quot;field&quot;)</code> ✨ NEW - byte offset of field</li><li>[x] <code>$typeBaseName&lt;T&gt;()</code> ✨ NEW - type name without generics</li></ul><h3 id="phase-4-compile-time-control-flow-✅" tabindex="-1">Phase 4: Compile-Time Control Flow ✅ <a class="header-anchor" href="#phase-4-compile-time-control-flow-✅" aria-label="Permalink to &quot;Phase 4: Compile-Time Control Flow ✅&quot;">​</a></h3><ul><li>[x] <code>$if</code> / <code>$elif</code> / <code>$else</code></li><li>[x] <code>$for i in range</code> (0..N, 0..=N)</li><li>[x] <code>$for field in $fields&lt;T&gt;()</code></li><li>[x] <code>$staticAssert(cond, msg)</code></li><li>[x] <code>$compileError(msg)</code></li></ul><h3 id="phase-5-enum-reflection-✅" tabindex="-1">Phase 5: Enum Reflection ✅ <a class="header-anchor" href="#phase-5-enum-reflection-✅" aria-label="Permalink to &quot;Phase 5: Enum Reflection ✅&quot;">​</a></h3><ul><li>[x] <code>$variantCount&lt;T&gt;()</code></li><li>[x] <code>$variantNames&lt;T&gt;()</code></li><li>[x] <code>$variants&lt;T&gt;()</code> iterator with <code>v.name</code>, <code>v.index</code></li><li>[x] <code>$hasVariant&lt;T&gt;(&quot;name&quot;)</code></li><li>[x] <code>$variantDiscriminant&lt;T&gt;(&quot;name&quot;)</code></li><li>[x] <code>$variantPayload&lt;T&gt;(&quot;name&quot;)</code> ✨ NEW - get variant payload type</li><li>[x] <code>$variantHasPayload&lt;T&gt;(&quot;name&quot;)</code> ✨ NEW - check if variant has payload</li></ul><h3 id="phase-6-code-generation-✅" tabindex="-1">Phase 6: Code Generation ✅ <a class="header-anchor" href="#phase-6-code-generation-✅" aria-label="Permalink to &quot;Phase 6: Code Generation ✅&quot;">​</a></h3><ul><li>[x] <code>$stringify(expr)</code></li><li>[x] <code>$concat(...)</code></li><li>[x] <code>$env(&quot;VAR&quot;)</code></li><li>[x] <code>$includeStr(&quot;path&quot;)</code></li><li>[x] <code>$includeBytes(&quot;path&quot;)</code></li><li>[x] <code>$concatIdents(...)</code> - concatenate identifiers</li><li>[x] <code>$envOr(&quot;VAR&quot;, &quot;default&quot;)</code> - env with fallback</li><li>[x] <code>$hasEnv(&quot;VAR&quot;)</code> - check if env exists</li><li>[x] <code>$compileWarning(msg)</code> ✨ NEW - emit compile-time warning</li><li>[x] <code>$debugType&lt;T&gt;()</code> ✨ NEW - print type info at compile time</li><li>[x] <code>$debugExpr(expr)</code> ✨ NEW - print expression and value at compile time</li><li>[x] <code>$warning(msg)</code> - emit compile-time warning (alias)</li><li>[x] <code>$compileLog(msg)</code> - print message at compile time</li></ul><h3 id="phase-7-const-evaluation-✅" tabindex="-1">Phase 7: Const Evaluation ✅ <a class="header-anchor" href="#phase-7-const-evaluation-✅" aria-label="Permalink to &quot;Phase 7: Const Evaluation ✅&quot;">​</a></h3><ul><li>[x] <code>$const { ... }</code> blocks - compile-time expression evaluation</li><li>[x] <code>const fn</code> functions - parser and HIR support ✨ NEW</li><li>[x] Compile-time arithmetic (complex expressions) ✨ NEW</li></ul><h3 id="phase-8-compile-time-arithmetic-✅-new" tabindex="-1">Phase 8: Compile-Time Arithmetic ✅ NEW <a class="header-anchor" href="#phase-8-compile-time-arithmetic-✅-new" aria-label="Permalink to &quot;Phase 8: Compile-Time Arithmetic ✅ NEW&quot;">​</a></h3><ul><li>[x] <code>$constPow(a, b)</code> / <code>$pow</code> - power</li><li>[x] <code>$constAbs(n)</code> / <code>$abs</code> - absolute value</li><li>[x] <code>$constMin(a, b)</code> / <code>$min</code> - minimum</li><li>[x] <code>$constMax(a, b)</code> / <code>$max</code> - maximum</li><li>[x] <code>$constClamp(v, min, max)</code> / <code>$clamp</code> - clamp to range</li><li>[x] <code>$constLog2(n)</code> / <code>$log2</code> - integer log2</li><li>[x] <code>$constSqrt(n)</code> / <code>$sqrt</code> - integer square root</li><li>[x] <code>$constGcd(a, b)</code> / <code>$gcd</code> - greatest common divisor</li><li>[x] <code>$constLcm(a, b)</code> / <code>$lcm</code> - least common multiple</li><li>[x] <code>$isPowerOf2(n)</code> - check if power of 2</li><li>[x] <code>$nextPowerOf2(n)</code> / <code>$nextPow2</code> - next power of 2</li><li>[x] <code>$bitCount(n)</code> / <code>$popcount</code> - count set bits</li><li>[x] <code>$leadingZeros(n)</code> / <code>$clz</code> - count leading zeros</li><li>[x] <code>$trailingZeros(n)</code> / <code>$ctz</code> - count trailing zeros</li></ul><h3 id="phase-9-default-values-type-construction-✅" tabindex="-1">Phase 9: Default Values &amp; Type Construction ✅ <a class="header-anchor" href="#phase-9-default-values-type-construction-✅" aria-label="Permalink to &quot;Phase 9: Default Values &amp; Type Construction ✅&quot;">​</a></h3><ul><li>[x] <code>$default&lt;T&gt;()</code> ✨ NEW - get default value for type</li><li>[x] <code>$hasDefault&lt;T&gt;()</code> ✨ NEW - check if type has default</li><li>[x] <code>$zeroed&lt;T&gt;()</code> ✨ NEW - zero-initialized value</li></ul><h3 id="phase-10-advanced-compile-time-evaluation" tabindex="-1">Phase 10: Advanced Compile-Time Evaluation <a class="header-anchor" href="#phase-10-advanced-compile-time-evaluation" aria-label="Permalink to &quot;Phase 10: Advanced Compile-Time Evaluation&quot;">​</a></h3><ul><li>[x] <code>$while</code> ✨ NEW - compile-time while loops (basic support)</li><li>[x] <code>$eval(expr)</code> - compile-time expression evaluation (supports binary ops, unary, casts)</li><li>[x] <code>$constEval(expr)</code> - strict compile-time evaluation</li><li>[x] Binary expression evaluation - <code>$eval(10 + 20)</code>, <code>$eval(a * b + c * d)</code></li><li>[x] Bitwise operations at compile-time - <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code></li><li>[x] <code>$constLen($constArray(...))</code> - length of nested const arrays</li><li>[x] Float binary expressions - <code>$eval(3.14 * 2.0)</code></li><li>[x] Bool binary expressions - comparisons and logical ops</li></ul><p><strong>Note:</strong> Full const fn execution (<code>$constCall</code>) requires an interpreter and is planned for a future release.</p><hr><h2 id="_12-examples" tabindex="-1">12. Examples <a class="header-anchor" href="#_12-examples" aria-label="Permalink to &quot;12. Examples&quot;">​</a></h2><h3 id="zero-cost-json-serializer" tabindex="-1">Zero-Cost JSON Serializer <a class="header-anchor" href="#zero-cost-json-serializer" aria-label="Permalink to &quot;Zero-Cost JSON Serializer&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn toJson&lt;T&gt;(obj: &amp;T): str {</span></span>
<span class="line"><span>    $if $isPrimitive&lt;T&gt;() {</span></span>
<span class="line"><span>        return primitiveToJson(obj);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    let! result = &quot;{&quot;;</span></span>
<span class="line"><span>    let! first = true;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $for field in $fields&lt;T&gt;() {</span></span>
<span class="line"><span>        let jsonKey = field.tag(&quot;json&quot;);</span></span>
<span class="line"><span>        $if jsonKey != &quot;-&quot; {</span></span>
<span class="line"><span>            if !first { result = result + &quot;, &quot;; }</span></span>
<span class="line"><span>            first = false;</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            let key = $if jsonKey != &quot;&quot; { jsonKey } $else { field.name };</span></span>
<span class="line"><span>            result = result + &quot;\\&quot;&quot; + key + &quot;\\&quot;: &quot; + toJson(&amp;$fieldGet(obj, field.name));</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result + &quot;}&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="type-safe-orm" tabindex="-1">Type-Safe ORM <a class="header-anchor" href="#type-safe-orm" aria-label="Permalink to &quot;Type-Safe ORM&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn createTable&lt;T&gt;(): str {</span></span>
<span class="line"><span>    $staticAssert($isStruct&lt;T&gt;(), &quot;createTable requires a struct type&quot;);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    let tableName = $fieldTag&lt;T&gt;(&quot;__struct__&quot;, &quot;table&quot;);</span></span>
<span class="line"><span>    let! sql = &quot;CREATE TABLE &quot; + tableName + &quot; (&quot;;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $for field in $fields&lt;T&gt;() {</span></span>
<span class="line"><span>        let colName = field.tag(&quot;db&quot;);</span></span>
<span class="line"><span>        $if colName != &quot;&quot; {</span></span>
<span class="line"><span>            let colType = $if field.type == &quot;str&quot; { &quot;TEXT&quot; }</span></span>
<span class="line"><span>                     $elif field.type == &quot;i32&quot; { &quot;INTEGER&quot; }</span></span>
<span class="line"><span>                     $elif field.type == &quot;i64&quot; { &quot;BIGINT&quot; }</span></span>
<span class="line"><span>                     $elif field.type == &quot;f64&quot; { &quot;REAL&quot; }</span></span>
<span class="line"><span>                     $elif field.type == &quot;bool&quot; { &quot;BOOLEAN&quot; }</span></span>
<span class="line"><span>                     $else { &quot;BLOB&quot; };</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            sql = sql + colName + &quot; &quot; + colType;</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            $if field.hasTag(&quot;pk&quot;) {</span></span>
<span class="line"><span>                sql = sql + &quot; PRIMARY KEY&quot;;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            $if field.hasTag(&quot;notnull&quot;) {</span></span>
<span class="line"><span>                sql = sql + &quot; NOT NULL&quot;;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            sql = sql + &quot;, &quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return sql.trimEnd(&quot;, &quot;) + &quot;)&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="validation-framework" tabindex="-1">Validation Framework <a class="header-anchor" href="#validation-framework" aria-label="Permalink to &quot;Validation Framework&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn validate&lt;T&gt;(obj: &amp;T): Result&lt;(), Vec&lt;str&gt;&gt; {</span></span>
<span class="line"><span>    let! errors: Vec&lt;str&gt; = Vec.new();</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $for field in $fields&lt;T&gt;() {</span></span>
<span class="line"><span>        let value = $fieldGet(obj, field.name);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        $if field.hasTag(&quot;required&quot;) {</span></span>
<span class="line"><span>            $if field.type == &quot;str&quot; {</span></span>
<span class="line"><span>                if value.isEmpty() {</span></span>
<span class="line"><span>                    errors.push(field.name + &quot; is required&quot;);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        $if field.hasTag(&quot;minLen&quot;) {</span></span>
<span class="line"><span>            let minLen = field.tag(&quot;minLen&quot;).parseInt().unwrap();</span></span>
<span class="line"><span>            $if field.type == &quot;str&quot; {</span></span>
<span class="line"><span>                if value.len() &lt; minLen {</span></span>
<span class="line"><span>                    errors.push(field.name + &quot; must be at least &quot; + minLen.toString() + &quot; chars&quot;);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        $if field.hasTag(&quot;range&quot;) {</span></span>
<span class="line"><span>            let range = field.tag(&quot;range&quot;);  // e.g., &quot;0,100&quot;</span></span>
<span class="line"><span>            // Parse and validate range...</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if errors.isEmpty() { Ok(()) } else { Err(errors) }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_13-backward-compatibility" tabindex="-1">13. Backward Compatibility <a class="header-anchor" href="#_13-backward-compatibility" aria-label="Permalink to &quot;13. Backward Compatibility&quot;">​</a></h2><p>The following legacy names are supported but deprecated:</p><table tabindex="0"><thead><tr><th>Deprecated</th><th>Preferred</th></tr></thead><tbody><tr><td><code>$sizeof</code></td><td><code>$sizeOf</code></td></tr><tr><td><code>$alignof</code></td><td><code>$alignOf</code></td></tr><tr><td><code>$typeof</code></td><td><code>$typeName</code></td></tr></tbody></table><p><strong>Note:</strong> <code>$typeInfo&lt;T&gt;().fields</code> is the preferred way to iterate struct fields with full tag support. <code>$fields&lt;T&gt;()</code> is simpler but doesn&#39;t include tag metadata.</p><p>Deprecation warnings will be emitted when legacy names are used.</p><hr><h2 id="_14-error-messages" tabindex="-1">14. Error Messages <a class="header-anchor" href="#_14-error-messages" aria-label="Permalink to &quot;14. Error Messages&quot;">​</a></h2><p>Comptime errors should be clear and actionable:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>error[E0501]: compile-time assertion failed</span></span>
<span class="line"><span>  --&gt; src/main.vx:15:5</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>15 |     $staticAssert($sizeOf&lt;T&gt;() &lt;= 64, &quot;Type too large&quot;);</span></span>
<span class="line"><span>   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   = note: $sizeOf&lt;MyStruct&gt;() = 128, but maximum is 64</span></span>
<span class="line"><span>   = help: consider boxing large fields or splitting the struct</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>error[E0502]: cannot evaluate at compile time</span></span>
<span class="line"><span>  --&gt; src/main.vx:20:15</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>20 |     $if runtime_value &gt; 0 {</span></span>
<span class="line"><span>   |         ^^^^^^^^^^^^^ not a compile-time constant</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   = note: $if conditions must be evaluable at compile time</span></span>
<span class="line"><span>   = help: use regular \`if\` for runtime conditions</span></span></code></pre></div>`,159)])])}const m=s(t,[["render",i]]);export{h as __pageData,m as default};
