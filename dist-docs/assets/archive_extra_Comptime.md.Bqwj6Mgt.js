import{_ as s,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const q=JSON.parse('{"title":"Vex Compile-Time Reflection","description":"","frontmatter":{},"headers":[],"relativePath":"archive/extra/Comptime.md","filePath":"archive/extra/Comptime.md"}'),p={name:"archive/extra/Comptime.md"};function l(i,a,o,c,r,u){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="vex-compile-time-reflection" tabindex="-1">Vex Compile-Time Reflection <a class="header-anchor" href="#vex-compile-time-reflection" aria-label="Permalink to &quot;Vex Compile-Time Reflection&quot;">​</a></h1><p>Vex provides powerful compile-time reflection capabilities that enable zero-overhead serialization, deserialization, and generic programming. All reflection happens at compile time - no runtime overhead.</p><h2 id="features-summary" tabindex="-1">Features Summary <a class="header-anchor" href="#features-summary" aria-label="Permalink to &quot;Features Summary&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Feature</th><th>Syntax</th><th>Returns</th></tr></thead><tbody><tr><td>Field iteration</td><td><code>$for f in $typeInfo&lt;T&gt;().fields</code></td><td>Unrolls loop</td></tr><tr><td>Field name</td><td><code>f.name</code></td><td><code>string</code></td></tr><tr><td>Field type</td><td><code>f.type_name</code></td><td><code>string</code></td></tr><tr><td>Tag value</td><td><code>f.tag(&quot;key&quot;)</code></td><td><code>string</code> (empty if not found)</td></tr><tr><td>Tag check</td><td><code>f.has_tag(&quot;key&quot;)</code></td><td><code>bool</code></td></tr><tr><td>Has field</td><td><code>has_field&lt;T&gt;(&quot;name&quot;)</code></td><td><code>bool</code></td></tr><tr><td>Tag iteration</td><td><code>$for t in f.tags</code></td><td>Unrolls nested loop</td></tr><tr><td>Tag key</td><td><code>t.key</code></td><td><code>string</code></td></tr><tr><td>Tag value</td><td><code>t.value</code></td><td><code>string</code></td></tr><tr><td>Type name</td><td><code>typeof(expr)</code></td><td><code>string</code></td></tr></tbody></table><h2 id="struct-tags" tabindex="-1">Struct Tags <a class="header-anchor" href="#struct-tags" aria-label="Permalink to &quot;Struct Tags&quot;">​</a></h2><p>Vex uses Go-style backtick tags for metadata:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct User {</span></span>
<span class="line"><span>    id: i32 \`json:&quot;user_id&quot; db:&quot;primary_key&quot;\`,</span></span>
<span class="line"><span>    name: string \`json:&quot;name&quot; db:&quot;varchar(255)&quot;\`,</span></span>
<span class="line"><span>    active: bool \`json:&quot;is_active&quot;\`</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="example-json-serializer" tabindex="-1">Example: JSON Serializer <a class="header-anchor" href="#example-json-serializer" aria-label="Permalink to &quot;Example: JSON Serializer&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { $typeInfo } from &quot;reflect&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn to_json&lt;T&gt;(obj: &amp;T): string {</span></span>
<span class="line"><span>    let! result = &quot;{&quot;;</span></span>
<span class="line"><span>    let! first = true;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $for f in $typeInfo&lt;T&gt;().fields {</span></span>
<span class="line"><span>        let json_key = f.tag(&quot;json&quot;);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // Skip fields without json tag</span></span>
<span class="line"><span>        $if json_key != &quot;&quot; {</span></span>
<span class="line"><span>            if !first {</span></span>
<span class="line"><span>                result = result + &quot;, &quot;;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            first = false;</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            // Get field value (pseudo-code, field_get would be needed)</span></span>
<span class="line"><span>            let value = field_get(obj, f.name);</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            $if f.type_name == &quot;string&quot; {</span></span>
<span class="line"><span>                result = result + &quot;\\&quot;&quot; + json_key + &quot;\\&quot;: \\&quot;&quot; + value + &quot;\\&quot;&quot;;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            $if f.type_name == &quot;i32&quot; {</span></span>
<span class="line"><span>                result = result + &quot;\\&quot;&quot; + json_key + &quot;\\&quot;: &quot; + value.to_string();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            $if f.type_name == &quot;bool&quot; {</span></span>
<span class="line"><span>                if value {</span></span>
<span class="line"><span>                    result = result + &quot;\\&quot;&quot; + json_key + &quot;\\&quot;: true&quot;;</span></span>
<span class="line"><span>                } else {</span></span>
<span class="line"><span>                    result = result + &quot;\\&quot;&quot; + json_key + &quot;\\&quot;: false&quot;;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result + &quot;}&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Usage:</span></span>
<span class="line"><span>let user = User { id: 1, name: &quot;Alice&quot;, active: true };</span></span>
<span class="line"><span>let json = to_json(&amp;user);</span></span>
<span class="line"><span>// Output: {&quot;user_id&quot;: 1, &quot;name&quot;: &quot;Alice&quot;, &quot;is_active&quot;: true}</span></span></code></pre></div><hr><h2 id="example-yaml-serializer" tabindex="-1">Example: YAML Serializer <a class="header-anchor" href="#example-yaml-serializer" aria-label="Permalink to &quot;Example: YAML Serializer&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn to_yaml&lt;T&gt;(obj: &amp;T): string {</span></span>
<span class="line"><span>    let! result = &quot;&quot;;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $for f in $typeInfo&lt;T&gt;().fields {</span></span>
<span class="line"><span>        let yaml_key = f.tag(&quot;yaml&quot;);</span></span>
<span class="line"><span>        let key = $if yaml_key != &quot;&quot; { yaml_key } else { f.name };</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        let value = field_get(obj, f.name);</span></span>
<span class="line"><span>        result = result + key + &quot;: &quot; + format_value(value) + &quot;\\n&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="example-database-orm" tabindex="-1">Example: Database ORM <a class="header-anchor" href="#example-database-orm" aria-label="Permalink to &quot;Example: Database ORM&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Product {</span></span>
<span class="line"><span>    sku: string \`db:&quot;sku&quot; pk:&quot;true&quot;\`,</span></span>
<span class="line"><span>    name: string \`db:&quot;product_name&quot;\`,</span></span>
<span class="line"><span>    price: f64 \`db:&quot;price&quot;\`</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn create_table&lt;T&gt;(): string {</span></span>
<span class="line"><span>    let! sql = &quot;CREATE TABLE (&quot;;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $for f in $typeInfo&lt;T&gt;().fields {</span></span>
<span class="line"><span>        let col_name = f.tag(&quot;db&quot;);</span></span>
<span class="line"><span>        $if col_name != &quot;&quot; {</span></span>
<span class="line"><span>            let col_type = $if f.type_name == &quot;string&quot; { &quot;TEXT&quot; }</span></span>
<span class="line"><span>                      else $if f.type_name == &quot;i32&quot; { &quot;INTEGER&quot; }</span></span>
<span class="line"><span>                      else $if f.type_name == &quot;f64&quot; { &quot;REAL&quot; }</span></span>
<span class="line"><span>                      else { &quot;BLOB&quot; };</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            sql = sql + col_name + &quot; &quot; + col_type;</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            $if f.has_tag(&quot;pk&quot;) {</span></span>
<span class="line"><span>                sql = sql + &quot; PRIMARY KEY&quot;;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            sql = sql + &quot;, &quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return sql + &quot;)&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="example-type-based-function-dispatch" tabindex="-1">Example: Type-Based Function Dispatch <a class="header-anchor" href="#example-type-based-function-dispatch" aria-label="Permalink to &quot;Example: Type-Based Function Dispatch&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process&lt;T&gt;(value: T) {</span></span>
<span class="line"><span>    // Branches are eliminated at compile time</span></span>
<span class="line"><span>    $if typeof(value) == &quot;i32&quot; {</span></span>
<span class="line"><span>        println(&quot;Processing integer: &quot;, value);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    $if typeof(value) == &quot;string&quot; {</span></span>
<span class="line"><span>        println(&quot;Processing string: &quot;, value);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    $if typeof(value) == &quot;bool&quot; {</span></span>
<span class="line"><span>        println(&quot;Processing boolean: &quot;, value);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// LLVM will only compile the matching branch</span></span>
<span class="line"><span>process(42);       // Only &quot;Processing integer&quot; branch exists</span></span>
<span class="line"><span>process(&quot;hello&quot;);  // Only &quot;Processing string&quot; branch exists</span></span></code></pre></div><hr><h2 id="example-validation-with-tags" tabindex="-1">Example: Validation with Tags <a class="header-anchor" href="#example-validation-with-tags" aria-label="Permalink to &quot;Example: Validation with Tags&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct UserInput {</span></span>
<span class="line"><span>    email: string \`validate:&quot;email&quot; required:&quot;true&quot;\`,</span></span>
<span class="line"><span>    age: i32 \`validate:&quot;range(0,150)&quot;\`,</span></span>
<span class="line"><span>    name: string \`validate:&quot;min_len(2)&quot; required:&quot;true&quot;\`</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn validate&lt;T&gt;(obj: &amp;T): Result&lt;(), string&gt; {</span></span>
<span class="line"><span>    $for f in $typeInfo&lt;T&gt;().fields {</span></span>
<span class="line"><span>        let value = field_get(obj, f.name);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        $if f.has_tag(&quot;required&quot;) {</span></span>
<span class="line"><span>            $if f.type_name == &quot;String&quot; {</span></span>
<span class="line"><span>                if value.is_empty() {</span></span>
<span class="line"><span>                    return Err(f.name + &quot; is required&quot;);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // More validation logic based on tags...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return Ok(());</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="implementation-notes" tabindex="-1">Implementation Notes <a class="header-anchor" href="#implementation-notes" aria-label="Permalink to &quot;Implementation Notes&quot;">​</a></h2><ol><li><p><strong>Zero Runtime Overhead</strong>: All <code>$for</code> and <code>$if</code> are evaluated at compile time. The generated code contains only the necessary branches.</p></li><li><p><strong>Type Safety</strong>: <code>typeof()</code> comparisons are compile-time constants, enabling LLVM to eliminate dead code.</p></li><li><p><strong>Tag Storage</strong>: Tags are stored in <code>struct_metadata</code> HashMap during parsing, accessed via <code>ComptimeFieldContext</code>.</p></li><li><p><strong>Nested Iteration</strong>: <code>$for t in f.tags</code> creates a nested <code>ComptimeTagContext</code> that coexists with the outer <code>ComptimeFieldContext</code>.</p></li></ol>`,25)])])}const m=s(p,[["render",l]]);export{q as __pageData,m as default};
