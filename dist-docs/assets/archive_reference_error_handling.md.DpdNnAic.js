import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Error Handling","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/error_handling.md","filePath":"archive/reference/error_handling.md"}'),r={name:"archive/reference/error_handling.md"};function t(o,a,l,i,c,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="error-handling" tabindex="-1">Error Handling <a class="header-anchor" href="#error-handling" aria-label="Permalink to &quot;Error Handling&quot;">​</a></h1><p><strong>Core Language Specification</strong><br><strong>Version:</strong> 0.2.0<br><strong>Status:</strong> ✅ Implemented</p><p>Vex treats errors as values using the <code>Result</code> and <code>Option</code> types, avoiding exceptions in favor of explicit control flow.</p><hr><h2 id="_1-the-result-option-types" tabindex="-1">1. The Result &amp; Option Types <a class="header-anchor" href="#_1-the-result-option-types" aria-label="Permalink to &quot;1. The Result &amp; Option Types&quot;">​</a></h2><p>These are Built-in Core Types (optimized by compiler).</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>enum Result&lt;T, E&gt; {</span></span>
<span class="line"><span>    Ok(T),</span></span>
<span class="line"><span>    Err(E),</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>enum Option&lt;T&gt; {</span></span>
<span class="line"><span>    Some(T),</span></span>
<span class="line"><span>    None,</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_2-propagation-operator" tabindex="-1">2. Propagation Operator (<code>?</code>) <a class="header-anchor" href="#_2-propagation-operator" aria-label="Permalink to &quot;2. Propagation Operator (\`?\`)&quot;">​</a></h2><p>The <code>?</code> operator unwraps <code>Ok/Some</code> or returns <code>Err/None</code> early.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn read_config(path: string): Result&lt;Config, Error&gt; {</span></span>
<span class="line"><span>    let file = File.open(path)?; // Returns Err if fails</span></span>
<span class="line"><span>    let content = file.read_all()?;</span></span>
<span class="line"><span>    return parse_json(content); // Returns Result directly</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_3-error-rescue-operator" tabindex="-1">3. Error Rescue Operator (<code>!&gt;</code>) <a class="header-anchor" href="#_3-error-rescue-operator" aria-label="Permalink to &quot;3. Error Rescue Operator (\`!&gt;\`)&quot;">​</a></h2><p>(Unique to Vex) Inline error handling for &quot;happy path&quot; coding.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// If risky() fails, execute closure/expression</span></span>
<span class="line"><span>let val = risky_op() !&gt; |err| {</span></span>
<span class="line"><span>    log_error(err);</span></span>
<span class="line"><span>    return default_value;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Simple Fallback</span></span>
<span class="line"><span>let config = load_config() !&gt; default_config();</span></span></code></pre></div><div class="tip custom-block github-alert"><p class="custom-block-title">TIP</p><p>Use <code>!&gt;</code> when you want to handle an error immediately without <code>match</code> verbosity, especially for defaults or logging.</p></div><hr><h2 id="_4-panics" tabindex="-1">4. Panics <a class="header-anchor" href="#_4-panics" aria-label="Permalink to &quot;4. Panics&quot;">​</a></h2><p>For unrecoverable errors (bugs), use <code>()</code>.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if pointer.is_null() {</span></span>
<span class="line"><span>    (&quot;Null pointer in core logic&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_5-custom-errors" tabindex="-1">5. Custom Errors <a class="header-anchor" href="#_5-custom-errors" aria-label="Permalink to &quot;5. Custom Errors&quot;">​</a></h2><p>Implement the <code>Error</code> contract.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Error {</span></span>
<span class="line"><span>    fn message(self): string;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct MyError { msg: string }</span></span>
<span class="line"><span>impl Error for MyError {</span></span>
<span class="line"><span>    fn message(self): string { return self.msg; }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,24)])])}const g=s(r,[["render",t]]);export{u as __pageData,g as default};
