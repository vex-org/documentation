import{_ as s,o as a,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Concurrency","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/concurrency.md","filePath":"archive/reference/concurrency.md"}'),p={name:"archive/reference/concurrency.md"};function c(l,n,o,i,r,d){return a(),e("div",null,[...n[0]||(n[0]=[t(`<h1 id="concurrency" tabindex="-1">Concurrency <a class="header-anchor" href="#concurrency" aria-label="Permalink to &quot;Concurrency&quot;">​</a></h1><p><strong>Core Language Specification</strong><br><strong>Version:</strong> 0.2.0<br><strong>Status:</strong> ✅ Implemented</p><p>Vex provides a hybrid concurrency model combining Go-style CSP (Communicating Sequential Processes) with Rust-style Async/Await.</p><hr><h2 id="_1-goroutines-go" tabindex="-1">1. Goroutines (<code>go</code>) <a class="header-anchor" href="#_1-goroutines-go" aria-label="Permalink to &quot;1. Goroutines (\`go\`)&quot;">​</a></h2><p>Lightweight threads of execution.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn worker(id: i32) {</span></span>
<span class="line"><span>    (&quot;Worker &quot;, id);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main() {</span></span>
<span class="line"><span>    go worker(1);</span></span>
<span class="line"><span>    go worker(2);</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>Keyword</strong>: <code>go</code></li><li><strong>Semantics</strong>: Spawns a lightweight task managed by the runtime scheduler.</li><li><strong>Implementation</strong>: <code>TypedStatementKind::Go</code> in AST.</li></ul><hr><h2 id="_2-channels" tabindex="-1">2. Channels <a class="header-anchor" href="#_2-channels" aria-label="Permalink to &quot;2. Channels&quot;">​</a></h2><p>Typed conduits for signaling and data transfer.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let ch: Channel&lt;i32&gt; = Channel.new(); // Unbuffered</span></span>
<span class="line"><span>go {</span></span>
<span class="line"><span>    ch.send(42);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>let msg = ch.recv(); // 42</span></span></code></pre></div><ul><li><strong>Type</strong>: <code>Channel&lt;T&gt;</code> (Built-in)</li><li><strong>Operations</strong>: <code>send(val)</code>, <code>recv()</code> (blocking), <code>close()</code>.</li></ul><hr><h2 id="_3-select-statement" tabindex="-1">3. Select Statement <a class="header-anchor" href="#_3-select-statement" aria-label="Permalink to &quot;3. Select Statement&quot;">​</a></h2><p>Multiplex operations on multiple channels.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>select {</span></span>
<span class="line"><span>    case msg1 = ch1.recv() =&gt; {</span></span>
<span class="line"><span>        (&quot;Received from ch1:&quot;, msg1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    case ch2.send(10) =&gt; {</span></span>
<span class="line"><span>        (&quot;Sent 10 to ch2&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    default =&gt; {</span></span>
<span class="line"><span>        (&quot;No activity&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_4-async-await" tabindex="-1">4. Async / Await <a class="header-anchor" href="#_4-async-await" aria-label="Permalink to &quot;4. Async / Await&quot;">​</a></h2><p>Future-based concurrency for I/O operations.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async fn fetch_data(): string {</span></span>
<span class="line"><span>    return &quot;data&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>async fn main() {</span></span>
<span class="line"><span>    let result = await fetch_data();</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>Type</strong>: <code>Future&lt;T&gt;</code> (Built-in).</li><li><strong>Semantics</strong>: Functions marked <code>async</code> return a <code>Future</code>. <code>await</code> suspends execution until the future resolves.</li></ul><hr><h2 id="_5-defer-statement" tabindex="-1">5. Defer Statement <a class="header-anchor" href="#_5-defer-statement" aria-label="Permalink to &quot;5. Defer Statement&quot;">​</a></h2><p>Ensure cleanup actions run when execution leaves the scope (useful for unlocking mutexes or closing channels).</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn process() {</span></span>
<span class="line"><span>    let f = File.open(&quot;log.txt&quot;);</span></span>
<span class="line"><span>    defer f.close();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    f.write(&quot;Works!&quot;);</span></span>
<span class="line"><span>} // f.close() runs here</span></span></code></pre></div><div class="note custom-block github-alert"><p class="custom-block-title">NOTE</p><p><code>defer</code> is particularly useful in checking that channels are closed or locks are released in concurrent code.</p></div>`,27)])])}const g=s(p,[["render",c]]);export{h as __pageData,g as default};
