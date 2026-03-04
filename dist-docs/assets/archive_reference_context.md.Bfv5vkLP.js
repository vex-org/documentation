import{_ as n,o as s,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Context","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/context.md","filePath":"archive/reference/context.md"}'),p={name:"archive/reference/context.md"};function l(i,a,o,c,r,d){return s(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="context" tabindex="-1">Context <a class="header-anchor" href="#context" aria-label="Permalink to &quot;Context&quot;">​</a></h1><p><strong>Version:</strong> 0.1.0 (Planned)<br><strong>Last Updated:</strong> December 2025</p><p>This document describes Vex&#39;s context system for request-scoped values, cancellation, and deadlines.</p><hr><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ol><li><a href="#overview">Overview</a></li><li><a href="#context-contract">Context Contract</a></li><li><a href="#creating-contexts">Creating Contexts</a></li><li><a href="#cancellation">Cancellation</a></li><li><a href="#timeouts-and-deadlines">Timeouts and Deadlines</a></li><li><a href="#context-values">Context Values</a></li><li><a href="#integration-with-async">Integration with Async</a></li><li><a href="#best-practices">Best Practices</a></li></ol><hr><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The <code>context</code> module provides mechanisms for:</p><ul><li><strong>Cancellation propagation</strong> - Cancel long-running operations across goroutines</li><li><strong>Deadline management</strong> - Set timeouts for operations</li><li><strong>Request-scoped values</strong> - Pass values through call chains without explicit parameters</li></ul><p>Contexts form a tree structure where child contexts inherit from parents and are automatically canceled when parents are canceled.</p><hr><h2 id="context-contract" tabindex="-1">Context Contract <a class="header-anchor" href="#context-contract" aria-label="Permalink to &quot;Context Contract&quot;">​</a></h2><p>All context types implement the <code>Context</code> contract:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>contract Context {</span></span>
<span class="line"><span>    // Returns channel that closes when context is done</span></span>
<span class="line"><span>    fn done(self): Channel&lt;void&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Returns error explaining why context was canceled</span></span>
<span class="line"><span>    fn err(self): Option&lt;Error&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Returns deadline if set</span></span>
<span class="line"><span>    fn deadline(self): Option&lt;Instant&gt;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Returns value for key, or None</span></span>
<span class="line"><span>    fn value&lt;T&gt;(self, key: string): Option&lt;T&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>done()</code></td><td>Returns a channel that&#39;s closed when the context is canceled</td></tr><tr><td><code>err()</code></td><td>Returns <code>ErrCanceled</code> or <code>ErrTimeout</code> when done, <code>None</code> otherwise</td></tr><tr><td><code>deadline()</code></td><td>Returns the deadline instant if set</td></tr><tr><td><code>value(key)</code></td><td>Retrieves a value by key from the context chain</td></tr></tbody></table><hr><h2 id="creating-contexts" tabindex="-1">Creating Contexts <a class="header-anchor" href="#creating-contexts" aria-label="Permalink to &quot;Creating Contexts&quot;">​</a></h2><h3 id="background-context" tabindex="-1">Background Context <a class="header-anchor" href="#background-context" aria-label="Permalink to &quot;Background Context&quot;">​</a></h3><p>The root context that is never canceled. Use for main functions and tests.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { background } from &quot;context&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let ctx = background();</span></span>
<span class="line"><span>    // ctx is never canceled</span></span>
<span class="line"><span>    runApp(ctx);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="todo-context" tabindex="-1">Todo Context <a class="header-anchor" href="#todo-context" aria-label="Permalink to &quot;Todo Context&quot;">​</a></h3><p>Alias for <code>background()</code>. Use as a placeholder when you&#39;re not sure which context to use yet.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { todo } from &quot;context&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn tempFunction() {</span></span>
<span class="line"><span>    let ctx = todo();  // TODO: Use proper context later</span></span>
<span class="line"><span>    doSomething(ctx);</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="cancellation" tabindex="-1">Cancellation <a class="header-anchor" href="#cancellation" aria-label="Permalink to &quot;Cancellation&quot;">​</a></h2><h3 id="withcancel" tabindex="-1">withCancel <a class="header-anchor" href="#withcancel" aria-label="Permalink to &quot;withCancel&quot;">​</a></h3><p>Creates a cancelable context and returns both the context and a cancel function.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { background, withCancel } from &quot;context&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn withCancel(parent: Context): (Context, CancelFunc)</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let (ctx, cancel) = withCancel(background());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Start background work</span></span>
<span class="line"><span>    go fn() {</span></span>
<span class="line"><span>        doWork(ctx);</span></span>
<span class="line"><span>    }();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Cancel after some condition</span></span>
<span class="line"><span>    time.sleep(5 * SECOND);</span></span>
<span class="line"><span>    cancel();  // Signals all goroutines using ctx to stop</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn doWork(ctx: Context) {</span></span>
<span class="line"><span>    loop {</span></span>
<span class="line"><span>        select {</span></span>
<span class="line"><span>        case &lt;-ctx.done():</span></span>
<span class="line"><span>            (&quot;Work canceled&quot;);</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            // Do actual work</span></span>
<span class="line"><span>            processNextItem();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="cancellation-propagation" tabindex="-1">Cancellation Propagation <a class="header-anchor" href="#cancellation-propagation" aria-label="Permalink to &quot;Cancellation Propagation&quot;">​</a></h3><p>When a parent context is canceled, all child contexts are automatically canceled:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let (parentCtx, parentCancel) = withCancel(background());</span></span>
<span class="line"><span>let (childCtx, childCancel) = withCancel(parentCtx);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>parentCancel();  // Both parentCtx and childCtx are now done</span></span></code></pre></div><hr><h2 id="timeouts-and-deadlines" tabindex="-1">Timeouts and Deadlines <a class="header-anchor" href="#timeouts-and-deadlines" aria-label="Permalink to &quot;Timeouts and Deadlines&quot;">​</a></h2><h3 id="withtimeout" tabindex="-1">withTimeout <a class="header-anchor" href="#withtimeout" aria-label="Permalink to &quot;withTimeout&quot;">​</a></h3><p>Creates a context that automatically cancels after a duration.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn withTimeout(parent: Context, timeout: Duration): (Context, CancelFunc)</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { background, withTimeout } from &quot;context&quot;;</span></span>
<span class="line"><span>import { SECOND } from &quot;time&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn fetchData(ctx: Context): Result&lt;Data, Error&gt; {</span></span>
<span class="line"><span>    // Create 30-second timeout</span></span>
<span class="line"><span>    let (ctx, cancel) = withTimeout(ctx, 30 * SECOND);</span></span>
<span class="line"><span>    defer cancel();  // Always call cancel to release resources</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return http.get(ctx, &quot;https://api.example.com/data&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="withdeadline" tabindex="-1">withDeadline <a class="header-anchor" href="#withdeadline" aria-label="Permalink to &quot;withDeadline&quot;">​</a></h3><p>Creates a context that cancels at a specific time.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn withDeadline(parent: Context, deadline: Instant): (Context, CancelFunc)</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { background, withDeadline } from &quot;context&quot;;</span></span>
<span class="line"><span>import { now } from &quot;time&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn processUntilMidnight(ctx: Context) {</span></span>
<span class="line"><span>    let midnight = now().truncate(DAY).add(DAY);</span></span>
<span class="line"><span>    let (ctx, cancel) = withDeadline(ctx, midnight);</span></span>
<span class="line"><span>    defer cancel();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Work until midnight</span></span>
<span class="line"><span>    while !isDone(ctx) {</span></span>
<span class="line"><span>        processItem();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="checking-deadline" tabindex="-1">Checking Deadline <a class="header-anchor" href="#checking-deadline" aria-label="Permalink to &quot;Checking Deadline&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn checkDeadline(ctx: Context) {</span></span>
<span class="line"><span>    if let Some(deadline) = ctx.deadline() {</span></span>
<span class="line"><span>        let remaining = time.until(deadline);</span></span>
<span class="line"><span>        (f&quot;Time remaining: {remaining}ns&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="context-values" tabindex="-1">Context Values <a class="header-anchor" href="#context-values" aria-label="Permalink to &quot;Context Values&quot;">​</a></h2><h3 id="withvalue" tabindex="-1">withValue <a class="header-anchor" href="#withvalue" aria-label="Permalink to &quot;withValue&quot;">​</a></h3><p>Attaches a key-value pair to a context.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn withValue&lt;T&gt;(parent: Context, key: string, value: T): Context</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { background, withValue } from &quot;context&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Middleware adds user to context</span></span>
<span class="line"><span>fn authMiddleware(ctx: Context, req: Request): Context {</span></span>
<span class="line"><span>    let user = authenticate(req);</span></span>
<span class="line"><span>    return withValue(ctx, &quot;user&quot;, user);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Handler retrieves user from context</span></span>
<span class="line"><span>fn handleRequest(ctx: Context, req: Request): Response {</span></span>
<span class="line"><span>    let user: User = ctx.value(&quot;user&quot;).expect(&quot;user required&quot;);</span></span>
<span class="line"><span>    return Response.json(getUserData(user));</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="value-lookup" tabindex="-1">Value Lookup <a class="header-anchor" href="#value-lookup" aria-label="Permalink to &quot;Value Lookup&quot;">​</a></h3><p>Values are looked up through the context chain:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let ctx1 = withValue(background(), &quot;key&quot;, &quot;value1&quot;);</span></span>
<span class="line"><span>let ctx2 = withValue(ctx1, &quot;key&quot;, &quot;value2&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ctx1.value(&quot;key&quot;);  // Some(&quot;value1&quot;)</span></span>
<span class="line"><span>ctx2.value(&quot;key&quot;);  // Some(&quot;value2&quot;) - shadows parent</span></span></code></pre></div><h3 id="type-safety" tabindex="-1">Type Safety <a class="header-anchor" href="#type-safety" aria-label="Permalink to &quot;Type Safety&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Store typed value</span></span>
<span class="line"><span>let ctx = withValue(background(), &quot;requestId&quot;, 12345 as i64);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Retrieve with correct type</span></span>
<span class="line"><span>let requestId: i64 = ctx.value(&quot;requestId&quot;).unwrap();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Wrong type returns None</span></span>
<span class="line"><span>let wrongType: string = ctx.value(&quot;requestId&quot;);  // None</span></span></code></pre></div><hr><h2 id="integration-with-async" tabindex="-1">Integration with Async <a class="header-anchor" href="#integration-with-async" aria-label="Permalink to &quot;Integration with Async&quot;">​</a></h2><h3 id="async-functions" tabindex="-1">Async Functions <a class="header-anchor" href="#async-functions" aria-label="Permalink to &quot;Async Functions&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async fn fetchWithContext(ctx: Context, url: string): Result&lt;Response, Error&gt; {</span></span>
<span class="line"><span>    select {</span></span>
<span class="line"><span>    case response = await http.get(url):</span></span>
<span class="line"><span>        return Ok(response);</span></span>
<span class="line"><span>    case &lt;-ctx.done():</span></span>
<span class="line"><span>        return Err(ctx.err().unwrapOr(errors.ErrCanceled));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="parallel-operations" tabindex="-1">Parallel Operations <a class="header-anchor" href="#parallel-operations" aria-label="Permalink to &quot;Parallel Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async fn fetchAll(ctx: Context, urls: []string): Result&lt;[]Response, Error&gt; {</span></span>
<span class="line"><span>    let! results: []Response = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for url in urls {</span></span>
<span class="line"><span>        // Check before each operation</span></span>
<span class="line"><span>        if isDone(ctx) {</span></span>
<span class="line"><span>            return Err(errors.ErrCanceled);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let resp = await fetchWithContext(ctx, url)?;</span></span>
<span class="line"><span>        results.(resp);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return Ok(results);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="goroutines" tabindex="-1">Goroutines <a class="header-anchor" href="#goroutines" aria-label="Permalink to &quot;Goroutines&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn startWorkers(ctx: Context, count: i32) {</span></span>
<span class="line"><span>    for let i = 0; i &lt; count; i++ {</span></span>
<span class="line"><span>        go fn() {</span></span>
<span class="line"><span>            worker(ctx, i);</span></span>
<span class="line"><span>        }();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn worker(ctx: Context, id: i32) {</span></span>
<span class="line"><span>    loop {</span></span>
<span class="line"><span>        select {</span></span>
<span class="line"><span>        case &lt;-ctx.done():</span></span>
<span class="line"><span>            (f&quot;Worker {id} stopping&quot;);</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            doWork(id);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="helper-functions" tabindex="-1">Helper Functions <a class="header-anchor" href="#helper-functions" aria-label="Permalink to &quot;Helper Functions&quot;">​</a></h2><h3 id="isdone" tabindex="-1">isDone <a class="header-anchor" href="#isdone" aria-label="Permalink to &quot;isDone&quot;">​</a></h3><p>Non-blocking check if context is done.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn isDone(ctx: Context): bool</span></span></code></pre></div><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if isDone(ctx) {</span></span>
<span class="line"><span>    return Err(errors.ErrCanceled);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="wait" tabindex="-1">wait <a class="header-anchor" href="#wait" aria-label="Permalink to &quot;wait&quot;">​</a></h3><p>Blocks until context is done.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn wait(ctx: Context)</span></span></code></pre></div><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Block until canceled</span></span>
<span class="line"><span>wait(ctx);</span></span>
<span class="line"><span>(&quot;Context canceled&quot;);</span></span></code></pre></div><h3 id="cause" tabindex="-1">cause <a class="header-anchor" href="#cause" aria-label="Permalink to &quot;cause&quot;">​</a></h3><p>Get the cancellation error.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn cause(ctx: Context): Option&lt;Error&gt;</span></span></code></pre></div><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if let Some(err) = cause(ctx) {</span></span>
<span class="line"><span>    if is(err, errors.ErrTimeout) {</span></span>
<span class="line"><span>        (&quot;Operation timed out&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><h3 id="_1-always-pass-context-as-first-parameter" tabindex="-1">1. Always Pass Context as First Parameter <a class="header-anchor" href="#_1-always-pass-context-as-first-parameter" aria-label="Permalink to &quot;1. Always Pass Context as First Parameter&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good</span></span>
<span class="line"><span>fn fetchUser(ctx: Context, id: i32): Result&lt;User, Error&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad</span></span>
<span class="line"><span>fn fetchUser(id: i32, ctx: Context): Result&lt;User, Error&gt;</span></span></code></pre></div><h3 id="_2-always-call-cancel" tabindex="-1">2. Always Call Cancel <a class="header-anchor" href="#_2-always-call-cancel" aria-label="Permalink to &quot;2. Always Call Cancel&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Use defer to ensure cancel is called</span></span>
<span class="line"><span>let (ctx, cancel) = withTimeout(parentCtx, 30 * SECOND);</span></span>
<span class="line"><span>defer cancel();</span></span>
<span class="line"><span>doWork(ctx);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Cancel might not be called on error</span></span>
<span class="line"><span>let (ctx, cancel) = withTimeout(parentCtx, 30 * SECOND);</span></span>
<span class="line"><span>doWork(ctx);  // If this fails, cancel() is never called</span></span>
<span class="line"><span>cancel();</span></span></code></pre></div><h3 id="_3-don-t-store-context-in-structs" tabindex="-1">3. Don&#39;t Store Context in Structs <a class="header-anchor" href="#_3-don-t-store-context-in-structs" aria-label="Permalink to &quot;3. Don&#39;t Store Context in Structs&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Bad: Context stored in struct</span></span>
<span class="line"><span>struct Service {</span></span>
<span class="line"><span>    ctx: Context,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Good: Pass context to methods</span></span>
<span class="line"><span>struct Service {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>impl Service {</span></span>
<span class="line"><span>    fn fetch(self, ctx: Context): Result&lt;Data, Error&gt; {</span></span>
<span class="line"><span>        // Use ctx parameter</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-use-short-timeouts-for-external-calls" tabindex="-1">4. Use Short Timeouts for External Calls <a class="header-anchor" href="#_4-use-short-timeouts-for-external-calls" aria-label="Permalink to &quot;4. Use Short Timeouts for External Calls&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Reasonable timeout for HTTP call</span></span>
<span class="line"><span>let (ctx, cancel) = withTimeout(ctx, 30 * SECOND);</span></span>
<span class="line"><span>defer cancel();</span></span>
<span class="line"><span>http.get(ctx, url);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: No timeout - could hang forever</span></span>
<span class="line"><span>http.get(ctx, url);</span></span></code></pre></div><h3 id="_5-check-context-in-loops" tabindex="-1">5. Check Context in Loops <a class="header-anchor" href="#_5-check-context-in-loops" aria-label="Permalink to &quot;5. Check Context in Loops&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Check context each iteration</span></span>
<span class="line"><span>for item in items {</span></span>
<span class="line"><span>    if isDone(ctx) {</span></span>
<span class="line"><span>        return Err(errors.ErrCanceled);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    process(item);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Bad: Never checks for cancellation</span></span>
<span class="line"><span>for item in items {</span></span>
<span class="line"><span>    process(item);  // Runs even if context is canceled</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_6-use-background-for-tests-and-main" tabindex="-1">6. Use Background for Tests and Main <a class="header-anchor" href="#_6-use-background-for-tests-and-main" aria-label="Permalink to &quot;6. Use Background for Tests and Main&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let ctx = background();</span></span>
<span class="line"><span>    runApp(ctx);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn testMyFunction() {</span></span>
<span class="line"><span>    let ctx = background();</span></span>
<span class="line"><span>    // Test code...</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="api-reference" tabindex="-1">API Reference <a class="header-anchor" href="#api-reference" aria-label="Permalink to &quot;API Reference&quot;">​</a></h2><h3 id="types" tabindex="-1">Types <a class="header-anchor" href="#types" aria-label="Permalink to &quot;Types&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>Context</code></td><td>Contract for all context types</td></tr><tr><td><code>CancelFunc</code></td><td><code>fn()</code> - Function to cancel a context</td></tr></tbody></table><h3 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Function</th><th>Signature</th><th>Description</th></tr></thead><tbody><tr><td><code>background</code></td><td><code>fn(): Context</code></td><td>Root context, never canceled</td></tr><tr><td><code>todo</code></td><td><code>fn(): Context</code></td><td>Alias for background()</td></tr><tr><td><code>withCancel</code></td><td><code>fn(Context): (Context, CancelFunc)</code></td><td>Cancelable context</td></tr><tr><td><code>withTimeout</code></td><td><code>fn(Context, Duration): (Context, CancelFunc)</code></td><td>Context with timeout</td></tr><tr><td><code>withDeadline</code></td><td><code>fn(Context, Instant): (Context, CancelFunc)</code></td><td>Context with deadline</td></tr><tr><td><code>withValue</code></td><td><code>fn&lt;T&gt;(Context, string, T): Context</code></td><td>Context with value</td></tr><tr><td><code>isDone</code></td><td><code>fn(Context): bool</code></td><td>Non-blocking done check</td></tr><tr><td><code>wait</code></td><td><code>fn(Context)</code></td><td>Blocking wait until done</td></tr><tr><td><code>cause</code></td><td><code>fn(Context): Option&lt;Error&gt;</code></td><td>Get cancellation error</td></tr></tbody></table><h3 id="errors" tabindex="-1">Errors <a class="header-anchor" href="#errors" aria-label="Permalink to &quot;Errors&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Error</th><th>Description</th></tr></thead><tbody><tr><td><code>errors.ErrCanceled</code></td><td>Context was canceled</td></tr><tr><td><code>errors.ErrTimeout</code></td><td>Context deadline exceeded</td></tr></tbody></table><hr><p><strong>Previous</strong>: <a href="./23_Operator_Overloading">23_Operator_Overloading.md</a><br><strong>Next</strong>: <a href="./99_BUILTINS">99_BUILTINS.md</a></p><p><strong>Maintained by</strong>: Vex Language Team</p>`,108)])])}const x=n(p,[["render",l]]);export{u as __pageData,x as default};
