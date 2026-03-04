import{_ as a,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const k=JSON.parse('{"title":"Testing","description":"","frontmatter":{},"headers":[],"relativePath":"guide/tooling/testing.md","filePath":"guide/tooling/testing.md"}'),i={name:"guide/tooling/testing.md"};function p(l,s,h,r,d,c){return n(),e("div",null,[...s[0]||(s[0]=[t(`<h1 id="testing" tabindex="-1">Testing <a class="header-anchor" href="#testing" aria-label="Permalink to &quot;Testing&quot;">​</a></h1><p>Vex provides a built-in test runner with a Go-style testing library. Test files use the <code>.test.vx</code> extension and are automatically discovered.</p><h2 id="quick-start" tabindex="-1">Quick Start <a class="header-anchor" href="#quick-start" aria-label="Permalink to &quot;Quick Start&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Run tests in current directory</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Run specific test file</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tests/math.test.vx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Run with verbose output</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Filter tests by name</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;user&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Run benchmarks</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bench</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Disable parallel execution</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --no-parallel</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Set custom timeout (seconds)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 60</span></span></code></pre></div><h2 id="writing-tests" tabindex="-1">Writing Tests <a class="header-anchor" href="#writing-tests" aria-label="Permalink to &quot;Writing Tests&quot;">​</a></h2><h3 id="test-file-convention" tabindex="-1">Test File Convention <a class="header-anchor" href="#test-file-convention" aria-label="Permalink to &quot;Test File Convention&quot;">​</a></h3><p>Test files must have the <code>.test.vx</code> extension:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>src/</span></span>
<span class="line"><span>├── math.vx</span></span>
<span class="line"><span>└── math.test.vx     # Tests for math module</span></span>
<span class="line"><span>tests/</span></span>
<span class="line"><span>└── integration.test.vx</span></span></code></pre></div><h3 id="basic-test-structure" tabindex="-1">Basic Test Structure <a class="header-anchor" href="#basic-test-structure" aria-label="Permalink to &quot;Basic Test Structure&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { eq, ok, gt } from &quot;testing/core&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Test functions must start with &quot;test_&quot; and return i32</span></span>
<span class="line"><span>// Return 0 for pass, non-zero for fail</span></span>
<span class="line"><span>fn test_addition(): i32 {</span></span>
<span class="line"><span>    return eq(2 + 2, 4)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_string_length(): i32 {</span></span>
<span class="line"><span>    let s = &quot;hello&quot;</span></span>
<span class="line"><span>    return eq(s.len(), 5)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_comparison(): i32 {</span></span>
<span class="line"><span>    return gt(10, 5)  // 10 &gt; 5</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="available-assertions" tabindex="-1">Available Assertions <a class="header-anchor" href="#available-assertions" aria-label="Permalink to &quot;Available Assertions&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { eq, ne, ok, ok_msg, gt, lt, gte, lte } from &quot;testing/core&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_all_assertions(): i32 {</span></span>
<span class="line"><span>    // Equality</span></span>
<span class="line"><span>    if eq(2 + 2, 4) != 0 { return 1 }      // expected == actual</span></span>
<span class="line"><span>    if ne(2 + 2, 5) != 0 { return 1 }      // expected != actual</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Boolean</span></span>
<span class="line"><span>    if ok(true) != 0 { return 1 }           // condition is true</span></span>
<span class="line"><span>    if ok_msg(1 &gt; 0, &quot;1 should be &gt; 0&quot;) != 0 { return 1 }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Comparisons</span></span>
<span class="line"><span>    if gt(10, 5) != 0 { return 1 }          // 10 &gt; 5</span></span>
<span class="line"><span>    if lt(5, 10) != 0 { return 1 }          // 5 &lt; 10</span></span>
<span class="line"><span>    if gte(10, 10) != 0 { return 1 }        // 10 &gt;= 10</span></span>
<span class="line"><span>    if lte(5, 10) != 0 { return 1 }         // 5 &lt;= 10</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="failure-messages" tabindex="-1">Failure Messages <a class="header-anchor" href="#failure-messages" aria-label="Permalink to &quot;Failure Messages&quot;">​</a></h3><p>When an assertion fails, it prints a descriptive message:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FAIL: eq(3, 5) - expected 5, got 3</span></span>
<span class="line"><span>FAIL: gt(2, 5) - expected 2 &gt; 5</span></span>
<span class="line"><span>FAIL: custom error message</span></span></code></pre></div><h2 id="testctx-advanced" tabindex="-1">TestCtx (Advanced) <a class="header-anchor" href="#testctx-advanced" aria-label="Permalink to &quot;TestCtx (Advanced)&quot;">​</a></h2><p>For more complex tests, use <code>TestCtx</code> with method-based assertions:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { TestCtx } from &quot;testing/core&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_with_context(t: &amp;TestCtx!): i32 {</span></span>
<span class="line"><span>    t.assert_eq(2 + 2, 4)</span></span>
<span class="line"><span>    t.assert_str_eq(&quot;hello&quot;, &quot;hello&quot;)</span></span>
<span class="line"><span>    t.assert_true(1 &lt; 2)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if t.failed() {</span></span>
<span class="line"><span>        return 1</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="testctx-methods" tabindex="-1">TestCtx Methods <a class="header-anchor" href="#testctx-methods" aria-label="Permalink to &quot;TestCtx Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>assert_eq(actual, expected)</code></td><td>Assert i64 values equal</td></tr><tr><td><code>assert_ne(actual, expected)</code></td><td>Assert i64 values not equal</td></tr><tr><td><code>assert_str_eq(actual, expected)</code></td><td>Assert strings equal</td></tr><tr><td><code>assert_true(cond)</code></td><td>Assert condition is true</td></tr><tr><td><code>assert_false(cond)</code></td><td>Assert condition is false</td></tr><tr><td><code>assert_gt(actual, expected)</code></td><td>Assert actual &gt; expected</td></tr><tr><td><code>assert_lt(actual, expected)</code></td><td>Assert actual &lt; expected</td></tr><tr><td><code>assert_gte(actual, expected)</code></td><td>Assert actual &gt;= expected</td></tr><tr><td><code>assert_lte(actual, expected)</code></td><td>Assert actual &lt;= expected</td></tr><tr><td><code>err(msg)</code></td><td>Mark test as failed with message</td></tr><tr><td><code>skip(msg)</code></td><td>Skip test with reason</td></tr><tr><td><code>log(msg)</code></td><td>Log a message</td></tr></tbody></table><h2 id="benchmarks" tabindex="-1">Benchmarks <a class="header-anchor" href="#benchmarks" aria-label="Permalink to &quot;Benchmarks&quot;">​</a></h2><h3 id="running-benchmarks" tabindex="-1">Running Benchmarks <a class="header-anchor" href="#running-benchmarks" aria-label="Permalink to &quot;Running Benchmarks&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bench</span></span></code></pre></div><h3 id="writing-benchmarks" tabindex="-1">Writing Benchmarks <a class="header-anchor" href="#writing-benchmarks" aria-label="Permalink to &quot;Writing Benchmarks&quot;">​</a></h3><p>Benchmark functions start with <code>bench_</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { BenchCtx } from &quot;testing/core&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn bench_array_sum(b: &amp;BenchCtx!): i32 {</span></span>
<span class="line"><span>    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    b.reset_timer()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    for i in 0..b.n {</span></span>
<span class="line"><span>        let! sum = 0</span></span>
<span class="line"><span>        for x in arr {</span></span>
<span class="line"><span>            sum = sum + x</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    b.stop_timer()</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="benchctx-methods" tabindex="-1">BenchCtx Methods <a class="header-anchor" href="#benchctx-methods" aria-label="Permalink to &quot;BenchCtx Methods&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><code>reset_timer()</code></td><td>Reset elapsed time to 0</td></tr><tr><td><code>start_timer()</code></td><td>Start timing</td></tr><tr><td><code>stop_timer()</code></td><td>Stop timing</td></tr><tr><td><code>set_bytes(n)</code></td><td>Set bytes processed per op</td></tr><tr><td><code>ns_per_op()</code></td><td>Get nanoseconds per operation</td></tr><tr><td><code>ops_per_sec()</code></td><td>Get operations per second</td></tr></tbody></table><h2 id="test-organization" tabindex="-1">Test Organization <a class="header-anchor" href="#test-organization" aria-label="Permalink to &quot;Test Organization&quot;">​</a></h2><h3 id="multiple-tests-in-one-file" tabindex="-1">Multiple Tests in One File <a class="header-anchor" href="#multiple-tests-in-one-file" aria-label="Permalink to &quot;Multiple Tests in One File&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { eq, ok } from &quot;testing/core&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Helper function (not a test)</span></span>
<span class="line"><span>fn add(a: i32, b: i32): i32 {</span></span>
<span class="line"><span>    return a + b</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_add_positive(): i32 {</span></span>
<span class="line"><span>    return eq(add(2, 3), 5)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_add_negative(): i32 {</span></span>
<span class="line"><span>    return eq(add(-1, 1), 0)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_add_zero(): i32 {</span></span>
<span class="line"><span>    return eq(add(0, 0), 0)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="setup-and-cleanup-with-defer" tabindex="-1">Setup and Cleanup with Defer <a class="header-anchor" href="#setup-and-cleanup-with-defer" aria-label="Permalink to &quot;Setup and Cleanup with Defer&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { eq } from &quot;testing/core&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_with_cleanup(): i32 {</span></span>
<span class="line"><span>    let path = &quot;/tmp/test_file.txt&quot;</span></span>
<span class="line"><span>    defer { remove_file(path) }  // Always runs</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    write_file(path, &quot;test data&quot;)</span></span>
<span class="line"><span>    let content = read_file(path)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return eq(content, &quot;test data&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="skip-tests-conditionally" tabindex="-1">Skip Tests Conditionally <a class="header-anchor" href="#skip-tests-conditionally" aria-label="Permalink to &quot;Skip Tests Conditionally&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { TestCtx } from &quot;testing/core&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_platform_specific(t: &amp;TestCtx!): i32 {</span></span>
<span class="line"><span>    t.skip_if($os() != &quot;linux&quot;, &quot;Linux only test&quot;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Test logic here...</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="test-output" tabindex="-1">Test Output <a class="header-anchor" href="#test-output" aria-label="Permalink to &quot;Test Output&quot;">​</a></h2><h3 id="standard-output" tabindex="-1">Standard Output <a class="header-anchor" href="#standard-output" aria-label="Permalink to &quot;Standard Output&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ vex test</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Running 3 test(s)...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ✓ test_addition</span></span>
<span class="line"><span>  ✓ test_subtraction  </span></span>
<span class="line"><span>  ✗ test_multiplication</span></span>
<span class="line"><span>    FAIL: eq(6, 8) - expected 8, got 6</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FAIL</span></span>
<span class="line"><span>  2 passed, 1 failed in 45.23ms</span></span></code></pre></div><h3 id="verbose-output" tabindex="-1">Verbose Output <a class="header-anchor" href="#verbose-output" aria-label="Permalink to &quot;Verbose Output&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Found</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">===</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  tests/math.test.vx</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  tests/string.test.vx</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  tests/array.test.vx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tests/math.test.vx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ===</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  ✓</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test_addition</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  ✓</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test_subtraction</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  ✗</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test_multiplication</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    FAIL:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> eq</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">6,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> expected</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> got</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FAIL</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> passed,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> failed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 45.23ms</span></span></code></pre></div><h3 id="cli-options" tabindex="-1">CLI Options <a class="header-anchor" href="#cli-options" aria-label="Permalink to &quot;CLI Options&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><code>-v, --verbose</code></td><td>Show detailed output</td></tr><tr><td><code>--run &lt;REGEX&gt;</code></td><td>Filter tests by name</td></tr><tr><td><code>--no-parallel</code></td><td>Disable parallel execution</td></tr><tr><td><code>--timeout &lt;SECS&gt;</code></td><td>Custom timeout per test</td></tr><tr><td><code>--bench</code></td><td>Run benchmarks</td></tr><tr><td><code>--benchtime &lt;DUR&gt;</code></td><td>Benchmark duration (e.g., <code>3s</code>)</td></tr><tr><td><code>--coverage</code></td><td>Generate LLVM coverage report</td></tr><tr><td><code>--coverprofile &lt;FILE&gt;</code></td><td>Output coverage to file (default: <code>coverage.txt</code>)</td></tr></tbody></table><h2 id="code-coverage" tabindex="-1">Code Coverage <a class="header-anchor" href="#code-coverage" aria-label="Permalink to &quot;Code Coverage&quot;">​</a></h2><p>Vex uses LLVM&#39;s built-in instrumentation for accurate code coverage measurement.</p><h3 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --coverage</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">📊</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Coverage</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (LLVM </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">instrumentation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Running</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 5</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  ✓</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test_addition</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  ✓</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test_subtraction</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  ✓</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test_multiplication</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">📊</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Generating</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coverage</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> report...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Filename</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                      Regions</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    Missed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   Cover</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   Functions</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  Missed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   Cover</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-------------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">src/math.vx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                        15</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   86.67%</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          5</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">       0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  100.00%</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">src/string.vx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                      22</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         8</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   63.64%</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          7</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">       2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   71.43%</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-------------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">TOTAL</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                              37</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        10</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   72.97%</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">         12</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">       2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   83.33%</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">✓</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Coverage</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> report:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coverage.txt</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">✓</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> LCOV</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> format:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp/vex_coverage/coverage.lcov</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">✓</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HTML</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> report:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp/vex_coverage/html/index.html</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PASS</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> passed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 1.23s</span></span></code></pre></div><h3 id="custom-output" tabindex="-1">Custom Output <a class="header-anchor" href="#custom-output" aria-label="Permalink to &quot;Custom Output&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Save to specific file</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --coverage</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --coverprofile</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my_coverage.lcov</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># View HTML report (macOS)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> open</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp/vex_coverage/html/index.html</span></span></code></pre></div><h3 id="integration-with-ci" tabindex="-1">Integration with CI <a class="header-anchor" href="#integration-with-ci" aria-label="Permalink to &quot;Integration with CI&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># GitHub Actions example</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Run tests with coverage</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">vex test --coverage --coverprofile coverage.lcov</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Upload coverage</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  uses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">codecov/codecov-action@v3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">coverage.lcov</span></span></code></pre></div><h3 id="how-it-works" tabindex="-1">How It Works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How It Works&quot;">​</a></h3><ol><li><strong>Compile</strong>: Tests are compiled with LLVM profile instrumentation (<code>-fprofile-instr-generate</code>)</li><li><strong>Run</strong>: Executed binaries generate <code>.profraw</code> files</li><li><strong>Merge</strong>: <code>llvm-profdata</code> merges raw profiles</li><li><strong>Report</strong>: <code>llvm-cov</code> generates human-readable and LCOV reports</li></ol><h3 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-label="Permalink to &quot;Requirements&quot;">​</a></h3><ul><li>LLVM tools (<code>llvm-profdata</code>, <code>llvm-cov</code>)</li><li>Install via Homebrew: <code>brew install llvm</code></li></ul><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><h3 id="_1-one-assertion-per-test-when-possible" tabindex="-1">1. One Assertion Per Test (When Possible) <a class="header-anchor" href="#_1-one-assertion-per-test-when-possible" aria-label="Permalink to &quot;1. One Assertion Per Test (When Possible)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good: Focused tests</span></span>
<span class="line"><span>fn test_user_name(): i32 {</span></span>
<span class="line"><span>    let user = User.new(&quot;Alice&quot;)</span></span>
<span class="line"><span>    return eq(user.name, &quot;Alice&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_user_default_active(): i32 {</span></span>
<span class="line"><span>    let user = User.new(&quot;Alice&quot;)</span></span>
<span class="line"><span>    return ok(user.is_active)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-descriptive-names" tabindex="-1">2. Descriptive Names <a class="header-anchor" href="#_2-descriptive-names" aria-label="Permalink to &quot;2. Descriptive Names&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Good</span></span>
<span class="line"><span>fn test_empty_string_returns_zero_length(): i32 { ... }</span></span>
<span class="line"><span>fn test_negative_index_returns_none(): i32 { ... }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Avoid</span></span>
<span class="line"><span>fn test1(): i32 { ... }</span></span>
<span class="line"><span>fn test_string(): i32 { ... }</span></span></code></pre></div><h3 id="_3-arrange-act-assert" tabindex="-1">3. Arrange-Act-Assert <a class="header-anchor" href="#_3-arrange-act-assert" aria-label="Permalink to &quot;3. Arrange-Act-Assert&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn test_user_activation(): i32 {</span></span>
<span class="line"><span>    // Arrange</span></span>
<span class="line"><span>    let! user = User.new(&quot;Alice&quot;)</span></span>
<span class="line"><span>    user.deactivate()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Act</span></span>
<span class="line"><span>    user.activate()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Assert</span></span>
<span class="line"><span>    return ok(user.is_active)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-use-helpers-for-complex-setup" tabindex="-1">4. Use Helpers for Complex Setup <a class="header-anchor" href="#_4-use-helpers-for-complex-setup" aria-label="Permalink to &quot;4. Use Helpers for Complex Setup&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn create_test_user(): User {</span></span>
<span class="line"><span>    return User {</span></span>
<span class="line"><span>        id: 1,</span></span>
<span class="line"><span>        name: &quot;Test User&quot;,</span></span>
<span class="line"><span>        email: &quot;test@example.com&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn test_user_email(): i32 {</span></span>
<span class="line"><span>    let user = create_test_user()</span></span>
<span class="line"><span>    return eq(user.email, &quot;test@example.com&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="roadmap" tabindex="-1">Roadmap <a class="header-anchor" href="#roadmap" aria-label="Permalink to &quot;Roadmap&quot;">​</a></h2><p>The following features are planned for future releases:</p><h3 id="subtests-planned" tabindex="-1">Subtests (Planned) <a class="header-anchor" href="#subtests-planned" aria-label="Permalink to &quot;Subtests (Planned)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// TODO: Not yet implemented</span></span>
<span class="line"><span>fn test_math(t: &amp;TestCtx): i32 {</span></span>
<span class="line"><span>    t.run(&quot;addition&quot;, fn() {</span></span>
<span class="line"><span>        eq(2 + 2, 4)</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    t.run(&quot;subtraction&quot;, fn() {</span></span>
<span class="line"><span>        eq(5 - 3, 2)</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return t.result()</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="table-driven-tests-planned" tabindex="-1">Table-Driven Tests (Planned) <a class="header-anchor" href="#table-driven-tests-planned" aria-label="Permalink to &quot;Table-Driven Tests (Planned)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// TODO: Not yet implemented</span></span>
<span class="line"><span>fn test_add_cases(t: &amp;TestCtx): i32 {</span></span>
<span class="line"><span>    let cases = [</span></span>
<span class="line"><span>        { a: 1, b: 2, want: 3 },</span></span>
<span class="line"><span>        { a: 0, b: 0, want: 0 },</span></span>
<span class="line"><span>        { a: -1, b: 1, want: 0 },</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    for case in cases {</span></span>
<span class="line"><span>        t.run(#stringify(case), fn() {</span></span>
<span class="line"><span>            eq(add(case.a, case.b), case.want)</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return t.result()</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="fuzzing-planned" tabindex="-1">Fuzzing (Planned) <a class="header-anchor" href="#fuzzing-planned" aria-label="Permalink to &quot;Fuzzing (Planned)&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># TODO: Not yet implemented</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --fuzz</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> FuzzParseJSON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --fuzztime</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 30s</span></span></code></pre></div><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// TODO: Not yet implemented</span></span>
<span class="line"><span>fn FuzzParseJSON(f: &amp;FuzzCtx): i32 {</span></span>
<span class="line"><span>    f.add_corpus(&quot;[]&quot;)</span></span>
<span class="line"><span>    f.add_corpus(&quot;{}&quot;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    f.fuzz(fn(data: &amp;[u8]) {</span></span>
<span class="line"><span>        let _ = parse_json(data)  // Should not panic</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="source-level-coverage-planned" tabindex="-1">Source-Level Coverage (Planned) <a class="header-anchor" href="#source-level-coverage-planned" aria-label="Permalink to &quot;Source-Level Coverage (Planned)&quot;">​</a></h3><p>Current coverage tracks function execution. Future versions will support line-by-line coverage:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># TODO: Currently function-level only</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --coverage</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Planned output:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   src/math.vx</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     Line 10: ✓ covered (5 hits)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     Line 11: ✓ covered (5 hits)  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     Line 12: ✗ not covered</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     Line 13: ✓ covered (3 hits)</span></span></code></pre></div><h3 id="feature-comparison" tabindex="-1">Feature Comparison <a class="header-anchor" href="#feature-comparison" aria-label="Permalink to &quot;Feature Comparison&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Feature</th><th style="text-align:center;">Go</th><th style="text-align:center;">Rust</th><th style="text-align:center;">Vex</th></tr></thead><tbody><tr><td>Test Discovery</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td></tr><tr><td>Filtering</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td></tr><tr><td>Parallel Exec</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td></tr><tr><td>Benchmarks</td><td style="text-align:center;">✅</td><td style="text-align:center;">⚠️</td><td style="text-align:center;">✅</td></tr><tr><td>Coverage</td><td style="text-align:center;">✅</td><td style="text-align:center;">⚠️</td><td style="text-align:center;">✅</td></tr><tr><td>Subtests</td><td style="text-align:center;">✅</td><td style="text-align:center;">❌</td><td style="text-align:center;">🔜</td></tr><tr><td>Table Tests</td><td style="text-align:center;">✅</td><td style="text-align:center;">⚠️</td><td style="text-align:center;">🔜</td></tr><tr><td>Fuzzing</td><td style="text-align:center;">✅</td><td style="text-align:center;">⚠️</td><td style="text-align:center;">🔜</td></tr><tr><td>Line Coverage</td><td style="text-align:center;">✅</td><td style="text-align:center;">✅</td><td style="text-align:center;">🔜</td></tr></tbody></table><p>Legend: ✅ Native | ⚠️ External/Nightly | 🔜 Planned | ❌ Not Available</p><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/tooling/debugging">Debugging</a> - Debug your code</li><li><a href="/docs/guide/tooling/docs">Documentation</a> - Document your code</li><li><a href="/docs/guide/tooling/ci">CI/CD</a> - Continuous integration</li></ul>`,80)])])}const g=a(i,[["render",p]]);export{k as __pageData,g as default};
