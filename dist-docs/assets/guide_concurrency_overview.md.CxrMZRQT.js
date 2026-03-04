import{_ as s,o as a,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Concurrency Overview","description":"","frontmatter":{},"headers":[],"relativePath":"guide/concurrency/overview.md","filePath":"guide/concurrency/overview.md"}'),l={name:"guide/concurrency/overview.md"};function t(i,n,c,o,r,d){return a(),e("div",null,[...n[0]||(n[0]=[p(`<h1 id="concurrency-overview" tabindex="-1">Concurrency Overview <a class="header-anchor" href="#concurrency-overview" aria-label="Permalink to &quot;Concurrency Overview&quot;">​</a></h1><p>Vex provides <strong>two complementary concurrency models</strong> that can be used together:</p><ol><li><strong>Go-style Goroutines + Channels</strong> - Lightweight green threads with M:N scheduling</li><li><strong>Async/Await Coroutines</strong> - Stackless coroutines for I/O operations</li></ol><div class="tip custom-block"><p class="custom-block-title">Hybrid Model</p><p>Unlike most languages that choose one model, Vex supports <strong>both</strong>! Use goroutines for CPU-bound parallelism and async/await for I/O-bound concurrency. They can even interoperate.</p></div><h2 id="concurrency-models-comparison" tabindex="-1">Concurrency Models Comparison <a class="header-anchor" href="#concurrency-models-comparison" aria-label="Permalink to &quot;Concurrency Models Comparison&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Model</th><th>Syntax</th><th>Best For</th><th>Scheduling</th></tr></thead><tbody><tr><td><strong>Goroutines</strong></td><td><code>go { }</code></td><td>CPU parallelism, background tasks</td><td>M:N (many goroutines : N OS threads)</td></tr><tr><td><strong>Async/Await</strong></td><td><code>async fn</code>, <code>await</code></td><td>I/O operations, network calls</td><td>Cooperative (single-threaded by default)</td></tr><tr><td><strong>Channels</strong></td><td><code>Channel&lt;T&gt;</code>, <code>&lt;-ch</code></td><td>Communication between goroutines</td><td>Lock-free message passing</td></tr></tbody></table><h2 id="go-style-concurrency" tabindex="-1">Go-style Concurrency <a class="header-anchor" href="#go-style-concurrency" aria-label="Permalink to &quot;Go-style Concurrency&quot;">​</a></h2><h3 id="goroutines-with-go" tabindex="-1">Goroutines with <code>go</code> <a class="header-anchor" href="#goroutines-with-go" aria-label="Permalink to &quot;Goroutines with \`go\`&quot;">​</a></h3><p>Spawn lightweight green threads using the <code>go</code> keyword:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    // Spawn a goroutine</span></span>
<span class="line"><span>    go {</span></span>
<span class="line"><span>        println(&quot;Hello from goroutine!&quot;)</span></span>
<span class="line"><span>        do_heavy_work()</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Or with an expression</span></span>
<span class="line"><span>    go process_data(my_data);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    println(&quot;Main continues immediately&quot;)</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="channels" tabindex="-1">Channels <a class="header-anchor" href="#channels" aria-label="Permalink to &quot;Channels&quot;">​</a></h3><p>Channels provide safe communication between goroutines:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    // Create a buffered channel with capacity 3</span></span>
<span class="line"><span>    let! ch: Channel&lt;i64&gt; = Channel(3)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Producer goroutine</span></span>
<span class="line"><span>    go {</span></span>
<span class="line"><span>        ch.send(42)</span></span>
<span class="line"><span>        ch.send(100)</span></span>
<span class="line"><span>        ch.send(999)</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Receiver - Go-style syntax</span></span>
<span class="line"><span>    let val1 = &lt;-ch    // Receive from channel</span></span>
<span class="line"><span>    let val2 = &lt;-ch</span></span>
<span class="line"><span>    let val3 = &lt;-ch</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    println(f&quot;Received: {val1}, {val2}, {val3}&quot;)</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="channel-operations" tabindex="-1">Channel Operations <a class="header-anchor" href="#channel-operations" aria-label="Permalink to &quot;Channel Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Create channel with buffer size</span></span>
<span class="line"><span>let! ch: Channel&lt;string&gt; = Channel(10)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Send to channel</span></span>
<span class="line"><span>ch.send(&quot;message&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Receive from channel (two syntaxes)</span></span>
<span class="line"><span>let msg = &lt;-ch          // Go-style: &lt;-channel</span></span>
<span class="line"><span>let msg = ch.recv()     // Method call style</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Non-blocking try operations</span></span>
<span class="line"><span>if let Some(msg) = ch.try_recv() {</span></span>
<span class="line"><span>    process(msg)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ch.try_send(&quot;data&quot;).is_ok() {</span></span>
<span class="line"><span>    println(&quot;Sent successfully&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="producer-consumer-pattern" tabindex="-1">Producer-Consumer Pattern <a class="header-anchor" href="#producer-consumer-pattern" aria-label="Permalink to &quot;Producer-Consumer Pattern&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn producer_consumer() {</span></span>
<span class="line"><span>    let! ch: Channel&lt;i32&gt; = Channel(100)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Multiple producers</span></span>
<span class="line"><span>    for i in 0..4 {</span></span>
<span class="line"><span>        let producer_id = i</span></span>
<span class="line"><span>        go {</span></span>
<span class="line"><span>            for j in 0..25 {</span></span>
<span class="line"><span>                ch.send(producer_id * 100 + j)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Consumer</span></span>
<span class="line"><span>    for _ in 0..100 {</span></span>
<span class="line"><span>        let item = &lt;-ch</span></span>
<span class="line"><span>        process(item)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="worker-pool" tabindex="-1">Worker Pool <a class="header-anchor" href="#worker-pool" aria-label="Permalink to &quot;Worker Pool&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn worker_pool(jobs: [Task], num_workers: i32) {</span></span>
<span class="line"><span>    let! job_ch: Channel&lt;Task&gt; = Channel(jobs.len())</span></span>
<span class="line"><span>    let! result_ch: Channel&lt;Result&gt; = Channel(jobs.len())</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Spawn workers</span></span>
<span class="line"><span>    for _ in 0..num_workers {</span></span>
<span class="line"><span>        go {</span></span>
<span class="line"><span>            loop {</span></span>
<span class="line"><span>                if let Some(job) = job_ch.try_recv() {</span></span>
<span class="line"><span>                    let result = process_job(job)</span></span>
<span class="line"><span>                    result_ch.send(result)</span></span>
<span class="line"><span>                } else {</span></span>
<span class="line"><span>                    break</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Submit jobs</span></span>
<span class="line"><span>    for job in jobs {</span></span>
<span class="line"><span>        job_ch.send(job)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Collect results</span></span>
<span class="line"><span>    let! results = []</span></span>
<span class="line"><span>    for _ in 0..jobs.len() {</span></span>
<span class="line"><span>        results.push(&lt;-result_ch)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="async-await-coroutines" tabindex="-1">Async/Await Coroutines <a class="header-anchor" href="#async-await-coroutines" aria-label="Permalink to &quot;Async/Await Coroutines&quot;">​</a></h2><h3 id="async-functions" tabindex="-1">Async Functions <a class="header-anchor" href="#async-functions" aria-label="Permalink to &quot;Async Functions&quot;">​</a></h3><p>Declare async functions with <code>async fn</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async fn fetch_user(id: u64): Result&lt;User, Error&gt; {</span></span>
<span class="line"><span>    let response = await http.get(f&quot;https://api.example.com/users/{id}&quot;)?</span></span>
<span class="line"><span>    let user: User = await response.json()?</span></span>
<span class="line"><span>    Ok(user)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>async fn fetch_data(id: i32): i32 {</span></span>
<span class="line"><span>    println(f&quot;Fetching data for ID: {id}&quot;)</span></span>
<span class="line"><span>    await async_delay(100)</span></span>
<span class="line"><span>    println(&quot;Data fetched!&quot;)</span></span>
<span class="line"><span>    return id * 2</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="the-await-keyword" tabindex="-1">The <code>await</code> Keyword <a class="header-anchor" href="#the-await-keyword" aria-label="Permalink to &quot;The \`await\` Keyword&quot;">​</a></h3><p><code>await</code> suspends coroutine execution until the future completes:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async fn process_items() {</span></span>
<span class="line"><span>    println(&quot;Processing item 1&quot;)</span></span>
<span class="line"><span>    let result1 = await fetch_data(10)</span></span>
<span class="line"><span>    println(f&quot;Got result 1: {result1}&quot;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    println(&quot;Processing item 2&quot;)</span></span>
<span class="line"><span>    let result2 = await fetch_data(20)</span></span>
<span class="line"><span>    println(f&quot;Got result 2: {result2}&quot;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    println(&quot;All done!&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    // Spawn async task</span></span>
<span class="line"><span>    process_items()</span></span>
<span class="line"><span>    println(&quot;Main function continues...&quot;)</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="concurrent-async-operations" tabindex="-1">Concurrent Async Operations <a class="header-anchor" href="#concurrent-async-operations" aria-label="Permalink to &quot;Concurrent Async Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async fn fetch_all() {</span></span>
<span class="line"><span>    // All three run concurrently</span></span>
<span class="line"><span>    let (users, posts, comments) = await join!(</span></span>
<span class="line"><span>        fetch_users(),</span></span>
<span class="line"><span>        fetch_posts(),</span></span>
<span class="line"><span>        fetch_comments()</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    // Continues after ALL complete</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>async fn with_timeout() {</span></span>
<span class="line"><span>    select! {</span></span>
<span class="line"><span>        result = fetch_data() =&gt; {</span></span>
<span class="line"><span>            println(f&quot;Got data: {result}&quot;)</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        _ = sleep(Duration.from_secs(5)) =&gt; {</span></span>
<span class="line"><span>            println(&quot;Timeout!&quot;)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="combining-both-models" tabindex="-1">Combining Both Models <a class="header-anchor" href="#combining-both-models" aria-label="Permalink to &quot;Combining Both Models&quot;">​</a></h2><p>Vex allows mixing goroutines and async/await:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async fn fetch_and_process(urls: [string]) {</span></span>
<span class="line"><span>    let! ch: Channel&lt;Response&gt; = Channel(urls.len())</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Spawn goroutines for concurrent fetching</span></span>
<span class="line"><span>    for url in urls {</span></span>
<span class="line"><span>        go {</span></span>
<span class="line"><span>            let response = await http.get(url)</span></span>
<span class="line"><span>            ch.send(response)</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Collect results</span></span>
<span class="line"><span>    for _ in 0..urls.len() {</span></span>
<span class="line"><span>        let response = &lt;-ch</span></span>
<span class="line"><span>        await process_response(response)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="synchronization-primitives" tabindex="-1">Synchronization Primitives <a class="header-anchor" href="#synchronization-primitives" aria-label="Permalink to &quot;Synchronization Primitives&quot;">​</a></h2><h3 id="mutex-mutual-exclusion" tabindex="-1">Mutex (Mutual Exclusion) <a class="header-anchor" href="#mutex-mutual-exclusion" aria-label="Permalink to &quot;Mutex (Mutual Exclusion)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Mutex } from &quot;sync&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let counter = Box(Mutex.new(0))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Safe concurrent access</span></span>
<span class="line"><span>go {</span></span>
<span class="line"><span>    let! guard = counter.lock()</span></span>
<span class="line"><span>    *guard += 1</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>go {</span></span>
<span class="line"><span>    let! guard = counter.lock()</span></span>
<span class="line"><span>    *guard += 1</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="rwlock-read-write-lock" tabindex="-1">RwLock (Read-Write Lock) <a class="header-anchor" href="#rwlock-read-write-lock" aria-label="Permalink to &quot;RwLock (Read-Write Lock)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { RwLock } from &quot;sync&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let cache = Box(RwLock.new(HashMap.new()))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Many concurrent readers</span></span>
<span class="line"><span>go {</span></span>
<span class="line"><span>    let guard = cache.read()</span></span>
<span class="line"><span>    let value = guard.get(&amp;key)</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Exclusive writer</span></span>
<span class="line"><span>go {</span></span>
<span class="line"><span>    let! guard = cache.write()</span></span>
<span class="line"><span>    guard.insert(key, value)</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="atomic-types" tabindex="-1">Atomic Types <a class="header-anchor" href="#atomic-types" aria-label="Permalink to &quot;Atomic Types&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { AtomicI64, Ordering } from &quot;sync&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let counter = AtomicI64.new(0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Lock-free increment from multiple goroutines</span></span>
<span class="line"><span>go { counter.fetch_add(1, Ordering.SeqCst) };</span></span>
<span class="line"><span>go { counter.fetch_add(1, Ordering.SeqCst) };</span></span></code></pre></div><h2 id="choosing-the-right-model" tabindex="-1">Choosing the Right Model <a class="header-anchor" href="#choosing-the-right-model" aria-label="Permalink to &quot;Choosing the Right Model&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                    ┌──────────────────┐</span></span>
<span class="line"><span>                    │  What&#39;s your     │</span></span>
<span class="line"><span>                    │  workload?       │</span></span>
<span class="line"><span>                    └────────┬─────────┘</span></span>
<span class="line"><span>                             │</span></span>
<span class="line"><span>           ┌─────────────────┼─────────────────┐</span></span>
<span class="line"><span>           ▼                 ▼                 ▼</span></span>
<span class="line"><span>    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐</span></span>
<span class="line"><span>    │   I/O-bound  │  │  CPU-bound   │  │   Mixed      │</span></span>
<span class="line"><span>    │  (network,   │  │  (compute,   │  │  workload    │</span></span>
<span class="line"><span>    │   file I/O)  │  │   number)    │  │              │</span></span>
<span class="line"><span>    └──────┬───────┘  └──────┬───────┘  └──────┬───────┘</span></span>
<span class="line"><span>           │                 │                 │</span></span>
<span class="line"><span>           ▼                 ▼                 ▼</span></span>
<span class="line"><span>    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐</span></span>
<span class="line"><span>    │ async/await  │  │ go { ... }   │  │ Both + Chan  │</span></span>
<span class="line"><span>    └──────────────┘  └──────────────┘  └──────────────┘</span></span></code></pre></div><h3 id="decision-guide" tabindex="-1">Decision Guide <a class="header-anchor" href="#decision-guide" aria-label="Permalink to &quot;Decision Guide&quot;">​</a></h3><table tabindex="0"><thead><tr><th>If you need...</th><th>Use</th></tr></thead><tbody><tr><td>Network/file I/O</td><td><code>async/await</code></td></tr><tr><td>Parallel CPU work</td><td><code>go { }</code> goroutines</td></tr><tr><td>Communication between tasks</td><td><code>Channel&lt;T&gt;</code></td></tr><tr><td>Background processing</td><td><code>go { }</code></td></tr><tr><td>Sequential async calls</td><td><code>async fn</code> + <code>await</code></td></tr><tr><td>Concurrent async calls</td><td><code>join!</code> or <code>select!</code></td></tr><tr><td>Shared mutable state</td><td><code>Mutex</code> or <code>RwLock</code></td></tr><tr><td>Lock-free counters</td><td><code>Atomic</code> types</td></tr></tbody></table><h2 id="safety-guarantees" tabindex="-1">Safety Guarantees <a class="header-anchor" href="#safety-guarantees" aria-label="Permalink to &quot;Safety Guarantees&quot;">​</a></h2><p>Vex&#39;s ownership system prevents data races at compile time:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! data = [1, 2, 3]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ERROR: Cannot move data into multiple goroutines</span></span>
<span class="line"><span>go { data.push(4) };</span></span>
<span class="line"><span>go { data.push(5) };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// OK: Use Box for shared ownership (VUMM auto-selects AtomicArc)</span></span>
<span class="line"><span>let data = Box(Mutex.new([1, 2, 3]))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>go {</span></span>
<span class="line"><span>    let data = data.clone()</span></span>
<span class="line"><span>    data.lock().push(4)</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>go {</span></span>
<span class="line"><span>    let data = data.clone()</span></span>
<span class="line"><span>    data.lock().push(5)</span></span>
<span class="line"><span>};</span></span></code></pre></div><h2 id="performance-notes" tabindex="-1">Performance Notes <a class="header-anchor" href="#performance-notes" aria-label="Permalink to &quot;Performance Notes&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Operation</th><th>Approximate Throughput</th></tr></thead><tbody><tr><td>Goroutine spawn</td><td>~500K/sec</td></tr><tr><td>Channel send/recv</td><td>~10M/sec</td></tr><tr><td>Async task spawn</td><td>~1M/sec</td></tr><tr><td>Mutex lock/unlock</td><td>~50M/sec</td></tr><tr><td>Atomic operation</td><td>~100M/sec</td></tr></tbody></table><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/concurrency/async">Async/Await</a> - Deep dive into coroutines</li><li><a href="/docs/guide/concurrency/channels">Channels</a> - Advanced channel patterns</li><li><a href="/docs/guide/concurrency/sync">Synchronization</a> - Locks and atomics</li></ul>`,49)])])}const g=s(l,[["render",t]]);export{u as __pageData,g as default};
