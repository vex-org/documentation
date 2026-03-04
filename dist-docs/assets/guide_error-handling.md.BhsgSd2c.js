import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Error Handling","description":"","frontmatter":{},"headers":[],"relativePath":"guide/error-handling.md","filePath":"guide/error-handling.md"}'),t={name:"guide/error-handling.md"};function l(i,a,r,o,c,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="error-handling" tabindex="-1">Error Handling <a class="header-anchor" href="#error-handling" aria-label="Permalink to &quot;Error Handling&quot;">​</a></h1><p>Vex uses explicit error handling through <code>Result</code> and <code>Option</code> types. There are no exceptions - errors are values that must be handled explicitly.</p><h2 id="result-type" tabindex="-1">Result Type <a class="header-anchor" href="#result-type" aria-label="Permalink to &quot;Result Type&quot;">​</a></h2><p>For operations that can fail:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Result&lt;T, E&gt; {</span></span>
<span class="line"><span>    Ok(T),</span></span>
<span class="line"><span>    Err(E)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="returning-results" tabindex="-1">Returning Results <a class="header-anchor" href="#returning-results" aria-label="Permalink to &quot;Returning Results&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn divide(a: f64, b: f64): Result&lt;f64, string&gt; {</span></span>
<span class="line"><span>    if b == 0.0 {</span></span>
<span class="line"><span>        return Err(&quot;Division by zero&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return Ok(a / b)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn parse_number(s: string): Result&lt;i32, error&gt; {</span></span>
<span class="line"><span>    // Implementation</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="handling-results" tabindex="-1">Handling Results <a class="header-anchor" href="#handling-results" aria-label="Permalink to &quot;Handling Results&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Pattern matching</span></span>
<span class="line"><span>match divide(10.0, 2.0) {</span></span>
<span class="line"><span>    Ok(result) =&gt; println(f&quot;Result: {result}&quot;),</span></span>
<span class="line"><span>    Err(e) =&gt; println(f&quot;Error: {e}&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// unwrap (panics on Err)</span></span>
<span class="line"><span>let result = divide(10.0, 2.0).unwrap()  // 5.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// unwrap_or (default on Err)</span></span>
<span class="line"><span>let result = divide(10.0, 0.0).unwrap_or(0.0)  // 0.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// expect (panics with message)</span></span>
<span class="line"><span>let result = divide(10.0, 2.0).expect(&quot;Division failed&quot;)</span></span></code></pre></div><h2 id="the-operator" tabindex="-1">The ? Operator <a class="header-anchor" href="#the-operator" aria-label="Permalink to &quot;The ? Operator&quot;">​</a></h2><p>Propagate errors automatically:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process_data(path: string): Result&lt;Data, error&gt; {</span></span>
<span class="line"><span>    let file = open(path)?           // Returns early if Err</span></span>
<span class="line"><span>    let content = file.read_all()?   // Returns early if Err</span></span>
<span class="line"><span>    let data = parse(content)?       // Returns early if Err</span></span>
<span class="line"><span>    return Ok(data)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Equivalent to:</span></span>
<span class="line"><span>fn process_data_verbose(path: string): Result&lt;Data, error&gt; {</span></span>
<span class="line"><span>    let file = match open(path) {</span></span>
<span class="line"><span>        Ok(f) =&gt; f,</span></span>
<span class="line"><span>        Err(e) =&gt; return Err(e)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    let content = match file.read_all() {</span></span>
<span class="line"><span>        Ok(c) =&gt; c,</span></span>
<span class="line"><span>        Err(e) =&gt; return Err(e)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    let data = match parse(content) {</span></span>
<span class="line"><span>        Ok(d) =&gt; d,</span></span>
<span class="line"><span>        Err(e) =&gt; return Err(e)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return Ok(data)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="the-rescue-operator" tabindex="-1">The !&gt; Rescue Operator <a class="header-anchor" href="#the-rescue-operator" aria-label="Permalink to &quot;The !&gt; Rescue Operator&quot;">​</a></h2><p>Vex provides the <code>!&gt;</code> (rescue) operator for inline error handling with a fallback:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Basic syntax: expr !&gt; |error_var| fallback_expr</span></span>
<span class="line"><span>let data = parse_json(text) !&gt; |e| default_data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With function reference</span></span>
<span class="line"><span>let value = risky_operation() !&gt; handle_error</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Chain with closures</span></span>
<span class="line"><span>let config = load_config(&quot;app.json&quot;) !&gt; |e| {</span></span>
<span class="line"><span>    println(f&quot;Config load failed: {e}, using defaults&quot;)</span></span>
<span class="line"><span>    Config.default()</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="rescue-vs-operator" tabindex="-1">Rescue vs ? Operator <a class="header-anchor" href="#rescue-vs-operator" aria-label="Permalink to &quot;Rescue vs ? Operator&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Behavior</th><th>Use Case</th></tr></thead><tbody><tr><td><code>?</code></td><td>Propagate error to caller</td><td>Let caller handle errors</td></tr><tr><td><code>!&gt;</code></td><td>Handle error inline with fallback</td><td>Provide default/recovery</td></tr></tbody></table><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process(path: string): Result&lt;i32, error&gt; {</span></span>
<span class="line"><span>    // ? propagates error</span></span>
<span class="line"><span>    let file = open(path)?</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // !&gt; handles error inline</span></span>
<span class="line"><span>    let config = load_config() !&gt; |_| Config.default()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return Ok(config.value)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="rescue-with-different-handlers" tabindex="-1">Rescue with Different Handlers <a class="header-anchor" href="#rescue-with-different-handlers" aria-label="Permalink to &quot;Rescue with Different Handlers&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Closure handler</span></span>
<span class="line"><span>let x = parse_int(s) !&gt; |e| {</span></span>
<span class="line"><span>    log_error(e)</span></span>
<span class="line"><span>    0  // Default value</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Function reference handler</span></span>
<span class="line"><span>fn default_handler(e: error): i32 {</span></span>
<span class="line"><span>    println(f&quot;Error: {e}&quot;)</span></span>
<span class="line"><span>    return -1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>let y = parse_int(s) !&gt; default_handler</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Simple default value (when error is ignored)</span></span>
<span class="line"><span>let z = parse_int(s) !&gt; |_| 0</span></span></code></pre></div><h2 id="option-type" tabindex="-1">Option Type <a class="header-anchor" href="#option-type" aria-label="Permalink to &quot;Option Type&quot;">​</a></h2><p>For high-level values that might not exist, Vex uses the <code>Option&lt;T&gt;</code> type (available in the prelude):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Option&lt;T&gt; {</span></span>
<span class="line"><span>    Some(T),</span></span>
<span class="line"><span>    None</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="using-option" tabindex="-1">Using Option <a class="header-anchor" href="#using-option" aria-label="Permalink to &quot;Using Option&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn find_user(id: u64): Option&lt;User&gt; {</span></span>
<span class="line"><span>    database.get(id)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Pattern matching</span></span>
<span class="line"><span>match find_user(42) {</span></span>
<span class="line"><span>    Some(user) =&gt; println(f&quot;Found: {user.name}&quot;),</span></span>
<span class="line"><span>    None =&gt; println(&quot;User not found&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Methods</span></span>
<span class="line"><span>let name = find_user(42)</span></span>
<span class="line"><span>    .map(|u| u.name)</span></span>
<span class="line"><span>    .unwrap_or(&quot;Unknown&quot;)</span></span></code></pre></div><h2 id="ffi-raw-pointers-nil" tabindex="-1">FFI &amp; Raw Pointers (<code>nil</code>) <a class="header-anchor" href="#ffi-raw-pointers-nil" aria-label="Permalink to &quot;FFI &amp; Raw Pointers (\`nil\`)&quot;">​</a></h2><p>While <code>Option&lt;T&gt;</code> is the idiomatic way to handle optionality in Vex code, the <code>nil</code> keyword exists for compatibility with <strong>raw pointers</strong> and <strong>FFI (Foreign Function Interface)</strong>.</p><p>It represents the <code>NULL</code> value in C.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>extern &quot;C&quot; {</span></span>
<span class="line"><span>    fn malloc(size: u64): ptr;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let p = malloc(100)</span></span>
<span class="line"><span>if p == nil {</span></span>
<span class="line"><span>    println(&quot;Memory allocation failed&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="creating-errors" tabindex="-1">Creating Errors <a class="header-anchor" href="#creating-errors" aria-label="Permalink to &quot;Creating Errors&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Create error values</span></span>
<span class="line"><span>let err = error.new(&quot;Something went wrong&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// In functions</span></span>
<span class="line"><span>fn validate(x: i32): Result&lt;i32, error&gt; {</span></span>
<span class="line"><span>    if x &lt; 0 {</span></span>
<span class="line"><span>        return Err(error.new(&quot;Must be positive&quot;))</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return Ok(x)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="null-safety-operators" tabindex="-1">Null Safety Operators <a class="header-anchor" href="#null-safety-operators" aria-label="Permalink to &quot;Null Safety Operators&quot;">​</a></h2><p>Vex provides powerful operators to handle <code>Option</code> and <code>nil</code> values concisely.</p><h3 id="null-coalesce" tabindex="-1">Null Coalesce (??) <a class="header-anchor" href="#null-coalesce" aria-label="Permalink to &quot;Null Coalesce (??)&quot;">​</a></h3><p>Returns the left operand if it is <code>Some(v)</code> or a non-nil pointer, otherwise returns the right operand:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// With Option</span></span>
<span class="line"><span>let name = user.nickname ?? &quot;Anonymous&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// With pointers (FFI)</span></span>
<span class="line"><span>let p = get_ptr() ?? default_ptr</span></span></code></pre></div><h3 id="optional-chaining" tabindex="-1">Optional Chaining (?.) <a class="header-anchor" href="#optional-chaining" aria-label="Permalink to &quot;Optional Chaining (?.)&quot;">​</a></h3><p>Safe member access. Returns <code>None</code> (for Options) or <code>nil</code> (for pointers) if the receiver is <code>None</code> or <code>nil</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let city = user?.address?.city  // None if user or address is None</span></span>
<span class="line"><span>let len = str_ptr?.len()        // nil if str_ptr is nil</span></span></code></pre></div><h2 id="custom-error-types" tabindex="-1">Custom Error Types <a class="header-anchor" href="#custom-error-types" aria-label="Permalink to &quot;Custom Error Types&quot;">​</a></h2><h3 id="error-enum" tabindex="-1">Error Enum <a class="header-anchor" href="#error-enum" aria-label="Permalink to &quot;Error Enum&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum FileError {</span></span>
<span class="line"><span>    NotFound(string),</span></span>
<span class="line"><span>    PermissionDenied(string),</span></span>
<span class="line"><span>    InvalidFormat,</span></span>
<span class="line"><span>    IoError(error)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn read_config(path: string): Result&lt;Config, FileError&gt; {</span></span>
<span class="line"><span>    let file = match open(path) {</span></span>
<span class="line"><span>        Ok(f) =&gt; f,</span></span>
<span class="line"><span>        Err(e) =&gt; {</span></span>
<span class="line"><span>            if e.kind() == &quot;NotFound&quot; {</span></span>
<span class="line"><span>                return Err(FileError.NotFound(path))</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            return Err(FileError.IoError(e))</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return parse_config(file)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="pattern-matching-errors" tabindex="-1">Pattern Matching Errors <a class="header-anchor" href="#pattern-matching-errors" aria-label="Permalink to &quot;Pattern Matching Errors&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>match read_config(&quot;app.json&quot;) {</span></span>
<span class="line"><span>    Ok(config) =&gt; use_config(config),</span></span>
<span class="line"><span>    Err(FileError.NotFound(path)) =&gt; {</span></span>
<span class="line"><span>        println(f&quot;File not found: {path}&quot;)</span></span>
<span class="line"><span>        use_default_config()</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    Err(FileError.PermissionDenied(path)) =&gt; {</span></span>
<span class="line"><span>        panic(f&quot;Cannot read {path}: permission denied&quot;)</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    Err(FileError.InvalidFormat) =&gt; {</span></span>
<span class="line"><span>        println(&quot;Invalid config format&quot;)</span></span>
<span class="line"><span>        use_default_config()</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    Err(FileError.IoError(e)) =&gt; {</span></span>
<span class="line"><span>        panic(f&quot;IO error: {e}&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="result-combinators" tabindex="-1">Result Combinators <a class="header-anchor" href="#result-combinators" aria-label="Permalink to &quot;Result Combinators&quot;">​</a></h2><h3 id="map-and-map-err" tabindex="-1">map and map_err <a class="header-anchor" href="#map-and-map-err" aria-label="Permalink to &quot;map and map_err&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let result: Result&lt;i32, string&gt; = Ok(5)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Transform Ok value</span></span>
<span class="line"><span>let doubled = result.map(|n| n * 2)  // Ok(10)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Transform Err value  </span></span>
<span class="line"><span>let err: Result&lt;i32, string&gt; = Err(&quot;fail&quot;)</span></span>
<span class="line"><span>let detailed = err.map_err(|e| f&quot;Error: {e}&quot;)</span></span></code></pre></div><h3 id="and-then-chaining" tabindex="-1">and_then (Chaining) <a class="header-anchor" href="#and-then-chaining" aria-label="Permalink to &quot;and_then (Chaining)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn validate(input: string): Result&lt;string, error&gt; { /* ... */ }</span></span>
<span class="line"><span>fn parse(s: string): Result&lt;i32, error&gt; { /* ... */ }</span></span>
<span class="line"><span>fn process(n: i32): Result&lt;Output, error&gt; { /* ... */ }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let result = validate(input)</span></span>
<span class="line"><span>    .and_then(|s| parse(s))</span></span>
<span class="line"><span>    .and_then(|n| process(n))</span></span></code></pre></div><h3 id="or-else" tabindex="-1">or_else <a class="header-anchor" href="#or-else" aria-label="Permalink to &quot;or_else&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Try alternative on error</span></span>
<span class="line"><span>let result = primary_source()</span></span>
<span class="line"><span>    .or_else(|_| fallback_source())</span></span>
<span class="line"><span>    .or_else(|_| Ok(default_value()))</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><h3 id="_1-use-result-for-expected-failures" tabindex="-1">1. Use Result for Expected Failures <a class="header-anchor" href="#_1-use-result-for-expected-failures" aria-label="Permalink to &quot;1. Use Result for Expected Failures&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Good: File might not exist</span></span>
<span class="line"><span>fn read_config(path: string): Result&lt;Config, error&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ Bad: Using panic for expected case</span></span>
<span class="line"><span>fn read_config(path: string): Config {</span></span>
<span class="line"><span>    // panics if file doesn&#39;t exist</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-use-for-error-propagation" tabindex="-1">2. Use ? for Error Propagation <a class="header-anchor" href="#_2-use-for-error-propagation" aria-label="Permalink to &quot;2. Use ? for Error Propagation&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Good: Clean error propagation</span></span>
<span class="line"><span>fn process(): Result&lt;Output, error&gt; {</span></span>
<span class="line"><span>    let a = step_a()?</span></span>
<span class="line"><span>    let b = step_b(a)?</span></span>
<span class="line"><span>    let c = step_c(b)?</span></span>
<span class="line"><span>    return Ok(c)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-use-for-recoverable-errors" tabindex="-1">3. Use !&gt; for Recoverable Errors <a class="header-anchor" href="#_3-use-for-recoverable-errors" aria-label="Permalink to &quot;3. Use !&gt; for Recoverable Errors&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Good: Provide sensible default</span></span>
<span class="line"><span>let config = load_config() !&gt; |e| {</span></span>
<span class="line"><span>    log_warn(f&quot;Config failed: {e}&quot;)</span></span>
<span class="line"><span>    Config.default()</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-provide-context" tabindex="-1">4. Provide Context <a class="header-anchor" href="#_4-provide-context" aria-label="Permalink to &quot;4. Provide Context&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn read_user_config(): Result&lt;Config, error&gt; {</span></span>
<span class="line"><span>    let content = read_file(&quot;~/.config/app/config.toml&quot;) !&gt; |e| {</span></span>
<span class="line"><span>        return Err(error.new(f&quot;Failed to read config: {e}&quot;))</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return parse_config(content)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="summary" tabindex="-1">Summary <a class="header-anchor" href="#summary" aria-label="Permalink to &quot;Summary&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Feature</th><th>Syntax</th><th>Use Case</th></tr></thead><tbody><tr><td>Result type</td><td><code>Result&lt;T, E&gt;</code></td><td>Operations that can fail</td></tr><tr><td>Option type</td><td><code>Option&lt;T&gt;</code></td><td>Values that may not exist</td></tr><tr><td>Propagate</td><td><code>expr?</code></td><td>Pass error to caller</td></tr><tr><td>Rescue</td><td><code>expr !&gt; |e| fallback</code></td><td>Handle error inline</td></tr><tr><td>Null coalesce</td><td><code>a ?? b</code></td><td>Default for nil</td></tr><tr><td>Optional chain</td><td><code>a?.b</code></td><td>Safe member access</td></tr></tbody></table><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/modules">Modules</a> - Code organization</li><li><a href="/docs/guide/stdlib">Standard Library</a> - Built-in utilities</li><li><a href="/docs/guide/tooling/testing">Testing</a> - Testing error cases</li></ul>`,64)])])}const g=s(t,[["render",l]]);export{h as __pageData,g as default};
