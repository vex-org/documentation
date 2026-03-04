import{_ as s,o as a,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Channels","description":"","frontmatter":{},"headers":[],"relativePath":"guide/concurrency/channels.md","filePath":"guide/concurrency/channels.md"}'),l={name:"guide/concurrency/channels.md"};function i(t,n,c,o,r,h){return a(),e("div",null,[...n[0]||(n[0]=[p(`<h1 id="channels" tabindex="-1">Channels <a class="header-anchor" href="#channels" aria-label="Permalink to &quot;Channels&quot;">​</a></h1><p>Channels are Vex&#39;s primary mechanism for communication between goroutines. They provide type-safe, lock-free message passing.</p><h2 id="creating-channels" tabindex="-1">Creating Channels <a class="header-anchor" href="#creating-channels" aria-label="Permalink to &quot;Creating Channels&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Buffered channel with capacity</span></span>
<span class="line"><span>let! ch: Channel&lt;i64&gt; = Channel.new&lt;i64&gt;(10)    // Buffer size 10</span></span>
<span class="line"><span>let! ch: Channel&lt;string&gt; = Channel.new&lt;string&gt;(1)  // Buffer size 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Type is inferred from usage</span></span>
<span class="line"><span>let! ch = Channel&lt;Message&gt;() // Default capacity (16)</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">Buffer Size</p><p>Always specify a buffer size. A buffer of 1 acts like a synchronous channel (blocks until received). Larger buffers allow asynchronous sends.</p></div><h2 id="sending-and-receiving" tabindex="-1">Sending and Receiving <a class="header-anchor" href="#sending-and-receiving" aria-label="Permalink to &quot;Sending and Receiving&quot;">​</a></h2><h3 id="basic-operations" tabindex="-1">Basic Operations <a class="header-anchor" href="#basic-operations" aria-label="Permalink to &quot;Basic Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Send to channel</span></span>
<span class="line"><span>ch.send(42)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Receive from channel - two equivalent syntaxes</span></span>
<span class="line"><span>let value = &lt;-ch          // Go-style prefix operator</span></span>
<span class="line"><span>let value = ch.recv()     // Method call style</span></span></code></pre></div><h3 id="go-style-receive-operator" tabindex="-1">Go-style Receive Operator <a class="header-anchor" href="#go-style-receive-operator" aria-label="Permalink to &quot;Go-style Receive Operator&quot;">​</a></h3><p>The <code>&lt;-</code> prefix operator is syntactic sugar for <code>.recv()</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let! ch: Channel&lt;i64&gt; = Channel(3)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    go {</span></span>
<span class="line"><span>        ch.send(42)</span></span>
<span class="line"><span>        ch.send(100)</span></span>
<span class="line"><span>        ch.send(999)</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Go-style syntax: &lt;-ch</span></span>
<span class="line"><span>    let val1 = &lt;-ch    // 42</span></span>
<span class="line"><span>    let val2 = &lt;-ch    // 100</span></span>
<span class="line"><span>    let val3 = &lt;-ch    // 999</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="non-blocking-operations" tabindex="-1">Non-blocking Operations <a class="header-anchor" href="#non-blocking-operations" aria-label="Permalink to &quot;Non-blocking Operations&quot;">​</a></h2><h3 id="tryrecv" tabindex="-1">tryRecv <a class="header-anchor" href="#tryrecv" aria-label="Permalink to &quot;tryRecv&quot;">​</a></h3><p>For non-blocking receive that returns immediately:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Non-blocking receive - returns Option</span></span>
<span class="line"><span>if let Some(msg) = ch.tryRecv() {</span></span>
<span class="line"><span>    process(msg)</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    println(&quot;No message available&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="common-patterns" tabindex="-1">Common Patterns <a class="header-anchor" href="#common-patterns" aria-label="Permalink to &quot;Common Patterns&quot;">​</a></h2><h3 id="producer-consumer" tabindex="-1">Producer-Consumer <a class="header-anchor" href="#producer-consumer" aria-label="Permalink to &quot;Producer-Consumer&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn producer_consumer() {</span></span>
<span class="line"><span>    let! ch: Channel&lt;i32&gt; = Channel(100)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Single producer</span></span>
<span class="line"><span>    go {</span></span>
<span class="line"><span>        for i in 0..100 {</span></span>
<span class="line"><span>            ch.send(i)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Single consumer</span></span>
<span class="line"><span>    for _ in 0..100 {</span></span>
<span class="line"><span>        let item = &lt;-ch</span></span>
<span class="line"><span>        process(item)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="multiple-producers" tabindex="-1">Multiple Producers <a class="header-anchor" href="#multiple-producers" aria-label="Permalink to &quot;Multiple Producers&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn fan_in() {</span></span>
<span class="line"><span>    let! ch: Channel&lt;i32&gt; = Channel(100)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Multiple producers</span></span>
<span class="line"><span>    for producer_id in 0..4 {</span></span>
<span class="line"><span>        go {</span></span>
<span class="line"><span>            for i in 0..25 {</span></span>
<span class="line"><span>                ch.send(producer_id * 100 + i)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Single consumer receives all</span></span>
<span class="line"><span>    for _ in 0..100 {</span></span>
<span class="line"><span>        let item = &lt;-ch</span></span>
<span class="line"><span>        println(f&quot;Received: {item}&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="worker-pool" tabindex="-1">Worker Pool <a class="header-anchor" href="#worker-pool" aria-label="Permalink to &quot;Worker Pool&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn worker_pool(tasks: [Task], num_workers: i32) {</span></span>
<span class="line"><span>    let! task_ch: Channel&lt;Task&gt; = Channel(tasks.len())</span></span>
<span class="line"><span>    let! result_ch: Channel&lt;Result&gt; = Channel(tasks.len())</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Spawn workers</span></span>
<span class="line"><span>    for worker_id in 0..num_workers {</span></span>
<span class="line"><span>        go {</span></span>
<span class="line"><span>            loop {</span></span>
<span class="line"><span>                match task_ch.try_recv() {</span></span>
<span class="line"><span>                    Some(task) =&gt; {</span></span>
<span class="line"><span>                        let result = process_task(task)</span></span>
<span class="line"><span>                        result_ch.send(result)</span></span>
<span class="line"><span>                    },</span></span>
<span class="line"><span>                    None =&gt; break</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Submit all tasks</span></span>
<span class="line"><span>    for task in tasks {</span></span>
<span class="line"><span>        task_ch.send(task)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Collect results</span></span>
<span class="line"><span>    let! results = []</span></span>
<span class="line"><span>    for _ in 0..tasks.len() {</span></span>
<span class="line"><span>        results.push(&lt;-result_ch)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="pipeline" tabindex="-1">Pipeline <a class="header-anchor" href="#pipeline" aria-label="Permalink to &quot;Pipeline&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn pipeline() {</span></span>
<span class="line"><span>    let! stage1_out: Channel&lt;i32&gt; = Channel(10)</span></span>
<span class="line"><span>    let! stage2_out: Channel&lt;i32&gt; = Channel(10)</span></span>
<span class="line"><span>    let! stage3_out: Channel&lt;i32&gt; = Channel(10)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Stage 1: Generate numbers</span></span>
<span class="line"><span>    go {</span></span>
<span class="line"><span>        for i in 0..100 {</span></span>
<span class="line"><span>            stage1_out.send(i)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Stage 2: Double</span></span>
<span class="line"><span>    go {</span></span>
<span class="line"><span>        for _ in 0..100 {</span></span>
<span class="line"><span>            let n = &lt;-stage1_out</span></span>
<span class="line"><span>            stage2_out.send(n * 2)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Stage 3: Add 10</span></span>
<span class="line"><span>    go {</span></span>
<span class="line"><span>        for _ in 0..100 {</span></span>
<span class="line"><span>            let n = &lt;-stage2_out</span></span>
<span class="line"><span>            stage3_out.send(n + 10)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Consume results</span></span>
<span class="line"><span>    for _ in 0..100 {</span></span>
<span class="line"><span>        let result = &lt;-stage3_out</span></span>
<span class="line"><span>        println(f&quot;Result: {result}&quot;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="request-response" tabindex="-1">Request-Response <a class="header-anchor" href="#request-response" aria-label="Permalink to &quot;Request-Response&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Request {</span></span>
<span class="line"><span>    data: [u8],</span></span>
<span class="line"><span>    response_ch: Channel&lt;Response&gt;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn server() {</span></span>
<span class="line"><span>    let! request_ch: Channel&lt;Request&gt; = Channel(100)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Server goroutine</span></span>
<span class="line"><span>    go {</span></span>
<span class="line"><span>        loop {</span></span>
<span class="line"><span>            let req = &lt;-request_ch</span></span>
<span class="line"><span>            let response = handle_request(req.data)</span></span>
<span class="line"><span>            req.response_ch.send(response)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Client makes request</span></span>
<span class="line"><span>    let! response_ch: Channel&lt;Response&gt; = Channel(1)</span></span>
<span class="line"><span>    request_ch.send(Request {</span></span>
<span class="line"><span>        data: [1, 2, 3],</span></span>
<span class="line"><span>        response_ch: response_ch</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Wait for response</span></span>
<span class="line"><span>    let response = &lt;-response_ch</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="typed-channels" tabindex="-1">Typed Channels <a class="header-anchor" href="#typed-channels" aria-label="Permalink to &quot;Typed Channels&quot;">​</a></h2><p>Channels are generic and type-safe:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Channel of structs</span></span>
<span class="line"><span>struct Message {</span></span>
<span class="line"><span>    id: i64,</span></span>
<span class="line"><span>    payload: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let! msg_ch: Channel&lt;Message&gt; = Channel(10)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>go {</span></span>
<span class="line"><span>    msg_ch.send(Message { id: 1, payload: &quot;Hello&quot; })</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let msg = &lt;-msg_ch</span></span>
<span class="line"><span>println(f&quot;Got message {msg.id}: {msg.payload}&quot;)</span></span></code></pre></div><h2 id="channel-ownership" tabindex="-1">Channel Ownership <a class="header-anchor" href="#channel-ownership" aria-label="Permalink to &quot;Channel Ownership&quot;">​</a></h2><p>Channels can be shared between goroutines:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn shared_channel() {</span></span>
<span class="line"><span>    let! ch: Channel&lt;i32&gt; = Channel(100)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Multiple goroutines can send to same channel</span></span>
<span class="line"><span>    go { ch.send(1) };</span></span>
<span class="line"><span>    go { ch.send(2) };</span></span>
<span class="line"><span>    go { ch.send(3) };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Collect all</span></span>
<span class="line"><span>    for _ in 0..3 {</span></span>
<span class="line"><span>        println(&lt;-ch)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><h3 id="_1-always-use-buffered-channels" tabindex="-1">1. Always Use Buffered Channels <a class="header-anchor" href="#_1-always-use-buffered-channels" aria-label="Permalink to &quot;1. Always Use Buffered Channels&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Good: Buffered channel</span></span>
<span class="line"><span>let! ch: Channel&lt;i32&gt; = Channel(100)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ⚠️ Minimal buffer (acts like sync channel)</span></span>
<span class="line"><span>let! ch: Channel&lt;i32&gt; = Channel(1)</span></span></code></pre></div><h3 id="_2-close-channels-when-done-future-feature" tabindex="-1">2. Close Channels When Done (Future Feature) <a class="header-anchor" href="#_2-close-channels-when-done-future-feature" aria-label="Permalink to &quot;2. Close Channels When Done (Future Feature)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Coming soon: close() and range over channels</span></span>
<span class="line"><span>// go {</span></span>
<span class="line"><span>//     for item in items {</span></span>
<span class="line"><span>//         ch.send(item)</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//     ch.close()</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// </span></span>
<span class="line"><span>// for item in ch {</span><span>  // Iterates until closed</span></span>
<span class="line"><span>//     process(item)</span></span>
<span class="line"><span>// }</span></span></code></pre></div><h3 id="_3-use-try-recv-for-polling" tabindex="-1">3. Use try_recv for Polling <a class="header-anchor" href="#_3-use-try-recv-for-polling" aria-label="Permalink to &quot;3. Use try_recv for Polling&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Non-blocking check</span></span>
<span class="line"><span>loop {</span></span>
<span class="line"><span>    match ch.try_recv() {</span></span>
<span class="line"><span>        Some(msg) =&gt; handle(msg),</span></span>
<span class="line"><span>        None =&gt; {</span></span>
<span class="line"><span>            // Do other work</span></span>
<span class="line"><span>            do_background_task()</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-avoid-deadlocks" tabindex="-1">4. Avoid Deadlocks <a class="header-anchor" href="#_4-avoid-deadlocks" aria-label="Permalink to &quot;4. Avoid Deadlocks&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ Deadlock: Send blocks forever (no receiver)</span></span>
<span class="line"><span>fn deadlock() {</span></span>
<span class="line"><span>    let! ch: Channel&lt;i32&gt; = Channel(1)</span></span>
<span class="line"><span>    ch.send(1)</span></span>
<span class="line"><span>    ch.send(2)  // Blocks! Buffer full, no receiver</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ Safe: Receiver in separate goroutine</span></span>
<span class="line"><span>fn safe() {</span></span>
<span class="line"><span>    let! ch: Channel&lt;i32&gt; = Channel(1)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    go {</span></span>
<span class="line"><span>        ch.send(1)</span></span>
<span class="line"><span>        ch.send(2)</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    let a = &lt;-ch</span></span>
<span class="line"><span>    let b = &lt;-ch</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="channel-summary" tabindex="-1">Channel Summary <a class="header-anchor" href="#channel-summary" aria-label="Permalink to &quot;Channel Summary&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Operation</th><th>Syntax</th><th>Blocking</th></tr></thead><tbody><tr><td>Create</td><td><code>Channel&lt;T&gt;(size)</code></td><td>-</td></tr><tr><td>Send</td><td><code>ch.send(value)</code></td><td>Yes (if full)</td></tr><tr><td>Receive</td><td><code>&lt;-ch</code> or <code>ch.recv()</code></td><td>Yes (if empty)</td></tr><tr><td>Try send</td><td><code>ch.try_send(value)</code></td><td>No</td></tr><tr><td>Try receive</td><td><code>ch.try_recv()</code></td><td>No</td></tr></tbody></table><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/concurrency/async">Async/Await</a> - Coroutines and goroutines</li><li><a href="/docs/guide/concurrency/sync">Synchronization</a> - Mutexes and atomics</li><li><a href="/docs/guide/concurrency/overview">Concurrency Overview</a> - Model comparison</li></ul>`,45)])])}const g=s(l,[["render",i]]);export{u as __pageData,g as default};
