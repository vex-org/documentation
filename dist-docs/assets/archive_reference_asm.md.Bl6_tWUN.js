import{_ as a,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Inline Assembly (asm!)","description":"","frontmatter":{},"headers":[],"relativePath":"archive/reference/asm.md","filePath":"archive/reference/asm.md"}'),p={name:"archive/reference/asm.md"};function l(i,s,o,r,c,u){return n(),e("div",null,[...s[0]||(s[0]=[t(`<h1 id="inline-assembly-asm" tabindex="-1">Inline Assembly (<code>asm!</code>) <a class="header-anchor" href="#inline-assembly-asm" aria-label="Permalink to &quot;Inline Assembly (\`asm!\`)&quot;">​</a></h1><p><strong>Core Language Specification</strong><br><strong>Version:</strong> 0.2.0<br><strong>Status:</strong> 🚧 In Development</p><p>Vex provides inline assembly support for low-level hardware access with full borrow checker integration and compile-time target validation.</p><hr><h2 id="_1-overview" tabindex="-1">1. Overview <a class="header-anchor" href="#_1-overview" aria-label="Permalink to &quot;1. Overview&quot;">​</a></h2><p>Inline assembly allows embedding target-specific machine code directly in Vex source. Unlike other languages, Vex&#39;s <code>asm!</code> block:</p><ol><li><strong>Memory Safe</strong> - Borrow checker validates all operands</li><li><strong>Target Validated</strong> - Compile-time validation of registers and instructions</li><li><strong>Type Safe</strong> - Operand types are checked at compile time</li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>unsafe {</span></span>
<span class="line"><span>    let! result: i64 = 0;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    asm!(</span></span>
<span class="line"><span>        &quot;mov $0, $1&quot;,</span></span>
<span class="line"><span>        &quot;add $0, 1&quot;,</span></span>
<span class="line"><span>        $asmOut(&quot;=r&quot;, result),</span></span>
<span class="line"><span>        $asmIn(&quot;r&quot;, 42_i64)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_2-syntax" tabindex="-1">2. Syntax <a class="header-anchor" href="#_2-syntax" aria-label="Permalink to &quot;2. Syntax&quot;">​</a></h2><h3 id="_2-1-basic-structure" tabindex="-1">2.1 Basic Structure <a class="header-anchor" href="#_2-1-basic-structure" aria-label="Permalink to &quot;2.1 Basic Structure&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>asm!(</span></span>
<span class="line"><span>    &lt;template&gt;,</span></span>
<span class="line"><span>    [$asmIn(&quot;constraint&quot;, expr), ...]</span></span>
<span class="line"><span>    [$asmOut(&quot;constraint&quot;, expr), ...]</span></span>
<span class="line"><span>    [$asmOpt(&quot;option1&quot;, &quot;option2&quot;, ...)]</span></span>
<span class="line"><span>    [$asmClobber(&quot;reg1&quot;, &quot;reg2&quot;, ...)]</span></span>
<span class="line"><span>)</span></span></code></pre></div><p><strong>Builtin-Style Operands:</strong></p><table tabindex="0"><thead><tr><th>Builtin</th><th>Description</th></tr></thead><tbody><tr><td><code>$asmIn(&quot;c&quot;, e)</code></td><td>Input operand</td></tr><tr><td><code>$asmOut(&quot;c&quot;, e)</code></td><td>Output operand</td></tr><tr><td><code>$asmLateOut(&quot;c&quot;, e)</code></td><td>Late output (can reuse input register)</td></tr><tr><td><code>$asmInOut(&quot;c&quot;, e)</code></td><td>Input-output operand</td></tr><tr><td><code>$asmInLateOut(&quot;c&quot;, e)</code></td><td>Input with late output</td></tr><tr><td><code>$asmOpt(...)</code></td><td>Assembly options</td></tr><tr><td><code>$asmClobber(...)</code></td><td>Clobbered registers</td></tr></tbody></table><h3 id="_2-2-template-string" tabindex="-1">2.2 Template String <a class="header-anchor" href="#_2-2-template-string" aria-label="Permalink to &quot;2.2 Template String&quot;">​</a></h3><p>Assembly instructions as string literals. Operands are referenced using <code>$N</code> placeholders.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;mov $0, $1&quot;,</span><span>       // Move input to output</span></span>
<span class="line"><span>    &quot;add $0, $2&quot;,</span><span>       // Add third operand</span></span>
<span class="line"><span>    $asmOut(&quot;=r&quot;, result),</span></span>
<span class="line"><span>    $asmIn(&quot;r&quot;, a),</span></span>
<span class="line"><span>    $asmIn(&quot;r&quot;, b)</span></span>
<span class="line"><span>)</span></span></code></pre></div><h3 id="_2-3-operand-order" tabindex="-1">2.3 Operand Order <a class="header-anchor" href="#_2-3-operand-order" aria-label="Permalink to &quot;2.3 Operand Order&quot;">​</a></h3><p>Operands are referenced by their position (0-indexed). Output operands come first:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let a: i64 = 10</span></span>
<span class="line"><span>let b: i64 = 32</span></span>
<span class="line"><span>let! result: i64 = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;add $0, $1, $2&quot;,</span><span>   // $0=result, $1=a, $2=b</span></span>
<span class="line"><span>    $asmOut(&quot;=r&quot;, result),</span></span>
<span class="line"><span>    $asmIn(&quot;r&quot;, a),</span></span>
<span class="line"><span>    $asmIn(&quot;r&quot;, b)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>// result = 42</span></span></code></pre></div><hr><h2 id="_3-operand-types" tabindex="-1">3. Operand Types <a class="header-anchor" href="#_3-operand-types" aria-label="Permalink to &quot;3. Operand Types&quot;">​</a></h2><h3 id="_3-1-input-operands-asmin" tabindex="-1">3.1 Input Operands (<code>$asmIn</code>) <a class="header-anchor" href="#_3-1-input-operands-asmin" aria-label="Permalink to &quot;3.1 Input Operands (\`$asmIn\`)&quot;">​</a></h3><p>Input operands pass values <strong>into</strong> the assembly. They are borrowed immutably (<code>&amp;T</code>).</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let x = 42</span></span>
<span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;mov rax, $0&quot;,</span></span>
<span class="line"><span>    $asmIn(&quot;r&quot;, x)      // x is borrowed here</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>// x is still valid</span></span></code></pre></div><p><strong>Borrow Checker Rule:</strong> Creates a shared borrow for the duration of the <code>asm!</code> block.</p><h3 id="_3-2-output-operands-asmout" tabindex="-1">3.2 Output Operands (<code>$asmOut</code>) <a class="header-anchor" href="#_3-2-output-operands-asmout" aria-label="Permalink to &quot;3.2 Output Operands (\`$asmOut\`)&quot;">​</a></h3><p>Output operands receive values <strong>from</strong> the assembly. They require mutable access (<code>&amp;mut T</code>).</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! result: i64 = 0</span></span>
<span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;mov $0, 42&quot;,</span></span>
<span class="line"><span>    $asmOut(&quot;=r&quot;, result)    // result must be mutable</span></span>
<span class="line"><span>)</span></span></code></pre></div><p><strong>Constraint Prefix:</strong> Output constraints use <code>=</code> prefix (e.g., <code>&quot;=r&quot;</code> for output register).</p><p><strong>Borrow Checker Rule:</strong> Creates an exclusive borrow. Variable must be declared with <code>let!</code>.</p><h3 id="_3-3-input-output-operands-asminout" tabindex="-1">3.3 Input-Output Operands (<code>$asmInOut</code>) <a class="header-anchor" href="#_3-3-input-output-operands-asminout" aria-label="Permalink to &quot;3.3 Input-Output Operands (\`$asmInOut\`)&quot;">​</a></h3><p>Combined read-write operands. Variable is read, then written.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! counter: i64 = 10</span></span>
<span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;add $0, $0, 1&quot;,</span><span>     // Increment in place</span></span>
<span class="line"><span>    $asmInOut(&quot;+r&quot;, counter)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>// counter is now 11</span></span></code></pre></div><p><strong>Constraint Prefix:</strong> InOut constraints use <code>+</code> prefix (e.g., <code>&quot;+r&quot;</code> for read-write register).</p><p><strong>Borrow Checker Rule:</strong> Creates an exclusive borrow (same as <code>out</code>).</p><h3 id="_3-4-late-output-asmlateout" tabindex="-1">3.4 Late Output (<code>$asmLateOut</code>) <a class="header-anchor" href="#_3-4-late-output-asmlateout" aria-label="Permalink to &quot;3.4 Late Output (\`$asmLateOut\`)&quot;">​</a></h3><p>Output that doesn&#39;t conflict with inputs (can reuse same register).</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;mov $1, $0&quot;,</span></span>
<span class="line"><span>    &quot;add $1, 1&quot;,</span></span>
<span class="line"><span>    $asmIn(&quot;r&quot;, input),</span></span>
<span class="line"><span>    $asmLateOut(&quot;=r&quot;, output)</span></span>
<span class="line"><span>)</span></span></code></pre></div><h3 id="_3-5-input-output-with-late-output-asminlateout" tabindex="-1">3.5 Input-Output with Late Output (<code>$asmInLateOut</code>) <a class="header-anchor" href="#_3-5-input-output-with-late-output-asminlateout" aria-label="Permalink to &quot;3.5 Input-Output with Late Output (\`$asmInLateOut\`)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;xchg $0, $1&quot;,</span></span>
<span class="line"><span>    $asmInLateOut(&quot;+r&quot;, a),</span></span>
<span class="line"><span>    $asmInLateOut(&quot;+r&quot;, b)</span></span>
<span class="line"><span>)</span></span></code></pre></div><hr><h2 id="_4-register-constraints" tabindex="-1">4. Register Constraints <a class="header-anchor" href="#_4-register-constraints" aria-label="Permalink to &quot;4. Register Constraints&quot;">​</a></h2><h3 id="_4-1-generic-constraints" tabindex="-1">4.1 Generic Constraints <a class="header-anchor" href="#_4-1-generic-constraints" aria-label="Permalink to &quot;4.1 Generic Constraints&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Constraint</th><th>Description</th></tr></thead><tbody><tr><td><code>&quot;r&quot;</code></td><td>Any general-purpose register</td></tr><tr><td><code>&quot;q&quot;</code></td><td>Byte-sized register (al, bl, etc.)</td></tr><tr><td><code>&quot;Q&quot;</code></td><td>a, b, c, d registers only</td></tr><tr><td><code>&quot;x&quot;</code></td><td>SSE/AVX register (x86_64)</td></tr><tr><td><code>&quot;v&quot;</code></td><td>AVX-512 register (x86_64)</td></tr><tr><td><code>&quot;w&quot;</code></td><td>SIMD register (AArch64)</td></tr><tr><td><code>&quot;f&quot;</code></td><td>Floating-point register</td></tr><tr><td><code>&quot;m&quot;</code></td><td>Memory operand</td></tr><tr><td><code>&quot;i&quot;</code></td><td>Immediate value</td></tr></tbody></table><p><strong>Output Prefixes:</strong></p><table tabindex="0"><thead><tr><th>Prefix</th><th>Meaning</th></tr></thead><tbody><tr><td><code>=</code></td><td>Write-only output</td></tr><tr><td><code>+</code></td><td>Read-write (inout)</td></tr></tbody></table><h3 id="_4-2-explicit-register-names" tabindex="-1">4.2 Explicit Register Names <a class="header-anchor" href="#_4-2-explicit-register-names" aria-label="Permalink to &quot;4.2 Explicit Register Names&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// x86_64</span></span>
<span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;syscall&quot;,</span></span>
<span class="line"><span>    $asmIn(&quot;{rax}&quot;, syscall_num),</span></span>
<span class="line"><span>    $asmIn(&quot;{rdi}&quot;, arg1),</span></span>
<span class="line"><span>    $asmIn(&quot;{rsi}&quot;, arg2),</span></span>
<span class="line"><span>    $asmOut(&quot;={rax}&quot;, result)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// AArch64</span></span>
<span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;svc #0&quot;,</span></span>
<span class="line"><span>    $asmIn(&quot;{x8}&quot;, syscall_num),</span></span>
<span class="line"><span>    $asmIn(&quot;{x0}&quot;, arg1),</span></span>
<span class="line"><span>    $asmOut(&quot;={x0}&quot;, result)</span></span>
<span class="line"><span>)</span></span></code></pre></div><p><strong>Note:</strong> Explicit registers are wrapped in <code>{}</code> within the constraint string.</p><h3 id="_4-3-architecture-specific-registers" tabindex="-1">4.3 Architecture-Specific Registers <a class="header-anchor" href="#_4-3-architecture-specific-registers" aria-label="Permalink to &quot;4.3 Architecture-Specific Registers&quot;">​</a></h3><p><strong>x86_64:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>General: rax, rbx, rcx, rdx, rsi, rdi, rbp, rsp, r8-r15</span></span>
<span class="line"><span>SSE:     xmm0-xmm15</span></span>
<span class="line"><span>AVX:     ymm0-ymm15</span></span>
<span class="line"><span>AVX-512: zmm0-zmm31, k0-k7</span></span></code></pre></div><p><strong>AArch64:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>General: x0-x30, w0-w30</span></span>
<span class="line"><span>SIMD:    v0-v31, d0-d31, s0-s31</span></span>
<span class="line"><span>Special: sp, lr (x30), xzr, wzr</span></span></code></pre></div><p><strong>RISC-V:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>General: x0-x31 (zero, ra, sp, gp, tp, t0-t6, s0-s11, a0-a7)</span></span>
<span class="line"><span>Float:   f0-f31 (ft0-ft11, fs0-fs11, fa0-fa7)</span></span></code></pre></div><hr><h2 id="_5-clobbers" tabindex="-1">5. Clobbers <a class="header-anchor" href="#_5-clobbers" aria-label="Permalink to &quot;5. Clobbers&quot;">​</a></h2><p>Declare registers modified by the assembly that aren&#39;t operands using <code>$asmClobber</code>.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;cpuid&quot;,</span></span>
<span class="line"><span>    $asmInOut(&quot;+{eax}&quot;, leaf),</span></span>
<span class="line"><span>    $asmOut(&quot;={ebx}&quot;, ebx),</span></span>
<span class="line"><span>    $asmOut(&quot;={ecx}&quot;, ecx),</span></span>
<span class="line"><span>    $asmOut(&quot;={edx}&quot;, edx),</span></span>
<span class="line"><span>    $asmClobber(&quot;memory&quot;)    // May modify memory</span></span>
<span class="line"><span>)</span></span></code></pre></div><h3 id="_5-1-special-clobbers" tabindex="-1">5.1 Special Clobbers <a class="header-anchor" href="#_5-1-special-clobbers" aria-label="Permalink to &quot;5.1 Special Clobbers&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Clobber</th><th>Description</th></tr></thead><tbody><tr><td><code>&quot;memory&quot;</code></td><td>Assembly may read/write arbitrary memory</td></tr><tr><td><code>&quot;cc&quot;</code></td><td>Condition codes/flags are modified</td></tr><tr><td><code>&quot;stack&quot;</code></td><td>Stack pointer may be modified</td></tr></tbody></table><hr><h2 id="_6-options" tabindex="-1">6. Options <a class="header-anchor" href="#_6-options" aria-label="Permalink to &quot;6. Options&quot;">​</a></h2><p>Control assembly behavior using <code>$asmOpt</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;nop&quot;,</span></span>
<span class="line"><span>    $asmOpt(&quot;pure&quot;, &quot;nomem&quot;, &quot;nostack&quot;)</span></span>
<span class="line"><span>)</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Option</th><th>Description</th></tr></thead><tbody><tr><td><code>&quot;pure&quot;</code></td><td>No side effects (can be optimized away if unused)</td></tr><tr><td><code>&quot;nomem&quot;</code></td><td>Doesn&#39;t access memory (beyond explicit operands)</td></tr><tr><td><code>&quot;nostack&quot;</code></td><td>Doesn&#39;t modify stack</td></tr><tr><td><code>&quot;preserves_flags&quot;</code></td><td>Doesn&#39;t modify CPU flags</td></tr><tr><td><code>&quot;noreturn&quot;</code></td><td>Never returns (e.g., abort)</td></tr><tr><td><code>&quot;att_syntax&quot;</code></td><td>Use AT&amp;T syntax (default is Intel for x86)</td></tr><tr><td><code>&quot;raw&quot;</code></td><td>Don&#39;t apply any fixups to template</td></tr></tbody></table><hr><h2 id="_7-borrow-checker-integration" tabindex="-1">7. Borrow Checker Integration <a class="header-anchor" href="#_7-borrow-checker-integration" aria-label="Permalink to &quot;7. Borrow Checker Integration&quot;">​</a></h2><h3 id="_7-1-safety-rules" tabindex="-1">7.1 Safety Rules <a class="header-anchor" href="#_7-1-safety-rules" aria-label="Permalink to &quot;7.1 Safety Rules&quot;">​</a></h3><p>All <code>asm!</code> blocks must be inside <code>unsafe</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ Error: asm! requires unsafe block</span></span>
<span class="line"><span>asm!(&quot;nop&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ Correct</span></span>
<span class="line"><span>unsafe {</span></span>
<span class="line"><span>    asm!(&quot;nop&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_7-2-borrow-rules" tabindex="-1">7.2 Borrow Rules <a class="header-anchor" href="#_7-2-borrow-rules" aria-label="Permalink to &quot;7.2 Borrow Rules&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! x = 10</span></span>
<span class="line"><span>let! y = 20</span></span>
<span class="line"><span></span></span>
<span class="line"><span>unsafe {</span></span>
<span class="line"><span>    // ❌ Error: cannot borrow x as mutable more than once</span></span>
<span class="line"><span>    asm!(</span></span>
<span class="line"><span>        &quot;add $0, $1&quot;,</span></span>
<span class="line"><span>        $asmInOut(&quot;+r&quot;, x),</span></span>
<span class="line"><span>        $asmInOut(&quot;+r&quot;, x)     // Error!</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // ✅ Correct: different variables</span></span>
<span class="line"><span>    asm!(</span></span>
<span class="line"><span>        &quot;add $0, $1&quot;,</span></span>
<span class="line"><span>        $asmInOut(&quot;+r&quot;, x),</span></span>
<span class="line"><span>        $asmIn(&quot;r&quot;, y)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_7-3-lifetime-safety" tabindex="-1">7.3 Lifetime Safety <a class="header-anchor" href="#_7-3-lifetime-safety" aria-label="Permalink to &quot;7.3 Lifetime Safety&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn get_ptr(): *i64 {</span></span>
<span class="line"><span>    let! local = 42</span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        // ❌ Error: returning reference to local variable</span></span>
<span class="line"><span>        let! ptr: *i64 = nil</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;lea $0, [$1]&quot;,</span></span>
<span class="line"><span>            $asmOut(&quot;=r&quot;, ptr),</span></span>
<span class="line"><span>            $asmIn(&quot;r&quot;, &amp;local)</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>        return ptr  // Dangling pointer!</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_8-compile-time-target-validation" tabindex="-1">8. Compile-Time Target Validation <a class="header-anchor" href="#_8-compile-time-target-validation" aria-label="Permalink to &quot;8. Compile-Time Target Validation&quot;">​</a></h2><h3 id="_8-1-architecture-validation" tabindex="-1">8.1 Architecture Validation <a class="header-anchor" href="#_8-1-architecture-validation" aria-label="Permalink to &quot;8.1 Architecture Validation&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#[cfg(target_arch = &quot;x86_64&quot;)]</span></span>
<span class="line"><span>fn rdtsc(): u64 {</span></span>
<span class="line"><span>    let! low: u32 = 0</span></span>
<span class="line"><span>    let! high: u32 = 0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;rdtsc&quot;,</span></span>
<span class="line"><span>            $asmOut(&quot;={eax}&quot;, low),</span></span>
<span class="line"><span>            $asmOut(&quot;={edx}&quot;, high)</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return (high as u64 &lt;&lt; 32) | (low as u64)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#[cfg(target_arch = &quot;aarch64&quot;)]</span></span>
<span class="line"><span>fn rdtsc(): u64 {</span></span>
<span class="line"><span>    let! result: u64 = 0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;mrs $0, cntvct_el0&quot;,</span></span>
<span class="line"><span>            $asmOut(&quot;=r&quot;, result)</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_8-2-validation-errors" tabindex="-1">8.2 Validation Errors <a class="header-anchor" href="#_8-2-validation-errors" aria-label="Permalink to &quot;8.2 Validation Errors&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// On x86_64 target:</span></span>
<span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;mrs x0, cntvct_el0&quot;,</span><span>  // ❌ Error: ARM instruction on x86_64 target</span></span>
<span class="line"><span>    $asmOut(&quot;=r&quot;, result)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>asm!(</span></span>
<span class="line"><span>    &quot;mov x99, x0&quot;,</span><span>         // ❌ Error: invalid register &#39;x99&#39; for aarch64</span></span>
<span class="line"><span>    $asmIn(&quot;r&quot;, val)</span></span>
<span class="line"><span>)</span></span></code></pre></div><h3 id="_8-3-feature-requirements" tabindex="-1">8.3 Feature Requirements <a class="header-anchor" href="#_8-3-feature-requirements" aria-label="Permalink to &quot;8.3 Feature Requirements&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Require specific CPU features</span></span>
<span class="line"><span>#[target_feature(enable = &quot;avx2&quot;)]</span></span>
<span class="line"><span>unsafe fn avx2_add(a: [f32; 8], b: [f32; 8]): [f32; 8] {</span></span>
<span class="line"><span>    let! result: [f32; 8] = [0.0; 8]</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    asm!(</span></span>
<span class="line"><span>        &quot;vmovups $3, [$0]&quot;,</span></span>
<span class="line"><span>        &quot;vaddps $3, $3, [$1]&quot;,</span></span>
<span class="line"><span>        &quot;vmovups [$2], $3&quot;,</span></span>
<span class="line"><span>        $asmIn(&quot;r&quot;, a.as_ptr()),</span></span>
<span class="line"><span>        $asmIn(&quot;r&quot;, b.as_ptr()),</span></span>
<span class="line"><span>        $asmIn(&quot;r&quot;, result.as_ptr()!),</span></span>
<span class="line"><span>        $asmOut(&quot;=x&quot;, _),</span></span>
<span class="line"><span>        $asmClobber(&quot;memory&quot;)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_9-os-specific-considerations" tabindex="-1">9. OS-Specific Considerations <a class="header-anchor" href="#_9-os-specific-considerations" aria-label="Permalink to &quot;9. OS-Specific Considerations&quot;">​</a></h2><h3 id="_9-1-system-calls" tabindex="-1">9.1 System Calls <a class="header-anchor" href="#_9-1-system-calls" aria-label="Permalink to &quot;9.1 System Calls&quot;">​</a></h3><p><strong>Linux x86_64:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn syscall_write(fd: i32, buf: *u8, len: usize): isize {</span></span>
<span class="line"><span>    let! result: isize = 0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;syscall&quot;,</span></span>
<span class="line"><span>            $asmIn(&quot;{rax}&quot;, 1_i64),        // SYS_write</span></span>
<span class="line"><span>            $asmIn(&quot;{rdi}&quot;, fd),</span></span>
<span class="line"><span>            $asmIn(&quot;{rsi}&quot;, buf),</span></span>
<span class="line"><span>            $asmIn(&quot;{rdx}&quot;, len),</span></span>
<span class="line"><span>            $asmLateOut(&quot;={rax}&quot;, result),</span></span>
<span class="line"><span>            $asmClobber(&quot;rcx&quot;, &quot;r11&quot;, &quot;memory&quot;)</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>macOS AArch64:</strong></p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn syscall_write(fd: i32, buf: *u8, len: usize): isize {</span></span>
<span class="line"><span>    let! result: isize = 0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;svc #0x80&quot;,</span></span>
<span class="line"><span>            $asmIn(&quot;{x16}&quot;, 4_i64),        // SYS_write</span></span>
<span class="line"><span>            $asmIn(&quot;{x0}&quot;, fd),</span></span>
<span class="line"><span>            $asmIn(&quot;{x1}&quot;, buf),</span></span>
<span class="line"><span>            $asmIn(&quot;{x2}&quot;, len),</span></span>
<span class="line"><span>            $asmLateOut(&quot;={x0}&quot;, result),</span></span>
<span class="line"><span>            $asmClobber(&quot;memory&quot;)</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_9-2-calling-conventions" tabindex="-1">9.2 Calling Conventions <a class="header-anchor" href="#_9-2-calling-conventions" aria-label="Permalink to &quot;9.2 Calling Conventions&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Windows x64 calling convention</span></span>
<span class="line"><span>#[cfg(target_os = &quot;windows&quot;)]</span></span>
<span class="line"><span>extern &quot;win64&quot; fn ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// System V AMD64 ABI (Linux, macOS, BSD)</span></span>
<span class="line"><span>#[cfg(not(target_os = &quot;windows&quot;))]</span></span>
<span class="line"><span>extern &quot;sysv64&quot; fn ...</span></span></code></pre></div><hr><h2 id="_10-wasm-restriction" tabindex="-1">10. WASM Restriction <a class="header-anchor" href="#_10-wasm-restriction" aria-label="Permalink to &quot;10. WASM Restriction&quot;">​</a></h2><p>Inline assembly is <strong>not supported</strong> on WebAssembly targets:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#[cfg(target_arch = &quot;wasm32&quot;)]</span></span>
<span class="line"><span>fn fast_sqrt(x: f32): f32 {</span></span>
<span class="line"><span>    // ❌ Compile error: asm! not supported on wasm32</span></span>
<span class="line"><span>    // asm!(&quot;f32.sqrt&quot;, $asmOut(&quot;=r&quot;, result))</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // ✅ Use intrinsics instead</span></span>
<span class="line"><span>    return @sqrt(x)</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_11-common-patterns" tabindex="-1">11. Common Patterns <a class="header-anchor" href="#_11-common-patterns" aria-label="Permalink to &quot;11. Common Patterns&quot;">​</a></h2><h3 id="_11-1-atomic-operations" tabindex="-1">11.1 Atomic Operations <a class="header-anchor" href="#_11-1-atomic-operations" aria-label="Permalink to &quot;11.1 Atomic Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn atomic_add(ptr: *i64!, val: i64): i64 {</span></span>
<span class="line"><span>    let! old: i64 = 0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;lock xadd [$0], $1&quot;,</span></span>
<span class="line"><span>            $asmIn(&quot;r&quot;, ptr),</span></span>
<span class="line"><span>            $asmInOut(&quot;+r&quot;, val)</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>        old = val</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return old</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_11-2-memory-barriers" tabindex="-1">11.2 Memory Barriers <a class="header-anchor" href="#_11-2-memory-barriers" aria-label="Permalink to &quot;11.2 Memory Barriers&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn memory_fence() {</span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;mfence&quot;,</span></span>
<span class="line"><span>            $asmOpt(&quot;nomem&quot;, &quot;nostack&quot;)</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn compiler_fence() {</span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;&quot;,</span></span>
<span class="line"><span>            $asmOpt(&quot;nomem&quot;, &quot;nostack&quot;, &quot;preserves_flags&quot;)</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_11-3-cpu-feature-detection" tabindex="-1">11.3 CPU Feature Detection <a class="header-anchor" href="#_11-3-cpu-feature-detection" aria-label="Permalink to &quot;11.3 CPU Feature Detection&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn has_avx2(): bool {</span></span>
<span class="line"><span>    let! eax: u32 = 0</span></span>
<span class="line"><span>    let! ebx: u32 = 0</span></span>
<span class="line"><span>    let! ecx: u32 = 0</span></span>
<span class="line"><span>    let! edx: u32 = 0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;mov eax, 7&quot;,</span></span>
<span class="line"><span>            &quot;xor ecx, ecx&quot;,</span></span>
<span class="line"><span>            &quot;cpuid&quot;,</span></span>
<span class="line"><span>            $asmOut(&quot;={eax}&quot;, eax),</span></span>
<span class="line"><span>            $asmOut(&quot;={ebx}&quot;, ebx),</span></span>
<span class="line"><span>            $asmOut(&quot;={ecx}&quot;, ecx),</span></span>
<span class="line"><span>            $asmOut(&quot;={edx}&quot;, edx)</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return (ebx &amp; (1 &lt;&lt; 5)) != 0  // AVX2 bit</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_11-4-simd-operations" tabindex="-1">11.4 SIMD Operations <a class="header-anchor" href="#_11-4-simd-operations" aria-label="Permalink to &quot;11.4 SIMD Operations&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#[target_feature(enable = &quot;sse2&quot;)]</span></span>
<span class="line"><span>unsafe fn simd_add_f32x4(a: *f32, b: *f32, out: *f32!) {</span></span>
<span class="line"><span>    asm!(</span></span>
<span class="line"><span>        &quot;movups xmm0, [$0]&quot;,</span></span>
<span class="line"><span>        &quot;movups xmm1, [$1]&quot;,</span></span>
<span class="line"><span>        &quot;addps xmm0, xmm1&quot;,</span></span>
<span class="line"><span>        &quot;movups [$2], xmm0&quot;,</span></span>
<span class="line"><span>        $asmIn(&quot;r&quot;, a),</span></span>
<span class="line"><span>        $asmIn(&quot;r&quot;, b),</span></span>
<span class="line"><span>        $asmIn(&quot;r&quot;, out),</span></span>
<span class="line"><span>        $asmClobber(&quot;xmm0&quot;, &quot;xmm1&quot;)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_12-error-messages" tabindex="-1">12. Error Messages <a class="header-anchor" href="#_12-error-messages" aria-label="Permalink to &quot;12. Error Messages&quot;">​</a></h2><h3 id="_12-1-borrow-errors" tabindex="-1">12.1 Borrow Errors <a class="header-anchor" href="#_12-1-borrow-errors" aria-label="Permalink to &quot;12.1 Borrow Errors&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>error[E0502]: cannot borrow \`x\` as mutable because it is also borrowed as immutable</span></span>
<span class="line"><span>  --&gt; src/main.vex:10:5</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>8  |         $asmIn(&quot;r&quot;, x),</span></span>
<span class="line"><span>   |                     - immutable borrow occurs here</span></span>
<span class="line"><span>9  |         $asmOut(&quot;=r&quot;, x),</span></span>
<span class="line"><span>   |                       ^ mutable borrow occurs here</span></span></code></pre></div><h3 id="_12-2-target-errors" tabindex="-1">12.2 Target Errors <a class="header-anchor" href="#_12-2-target-errors" aria-label="Permalink to &quot;12.2 Target Errors&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>error[E0777]: invalid register \`r16\` for x86_64 target</span></span>
<span class="line"><span>  --&gt; src/main.vex:5:13</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>5  |         $asmIn(&quot;{r16}&quot;, value),</span></span>
<span class="line"><span>   |                 ^^^^ x86_64 has registers r8-r15, not r16</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   = help: valid general-purpose registers: rax, rbx, rcx, rdx, rsi, rdi, rbp, r8-r15</span></span></code></pre></div><h3 id="_12-3-instruction-errors" tabindex="-1">12.3 Instruction Errors <a class="header-anchor" href="#_12-3-instruction-errors" aria-label="Permalink to &quot;12.3 Instruction Errors&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>error[E0778]: instruction \`vmovaps\` requires AVX feature</span></span>
<span class="line"><span>  --&gt; src/main.vex:4:9</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>4  |         &quot;vmovaps ymm0, [{0}]&quot;</span></span>
<span class="line"><span>   |         ^^^^^^^^^^^^^^^^^^^^^^</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   = note: target CPU does not support AVX</span></span>
<span class="line"><span>   = help: add #[target_feature(enable = &quot;avx&quot;)] to the function</span></span></code></pre></div><hr><h2 id="_13-best-practices" tabindex="-1">13. Best Practices <a class="header-anchor" href="#_13-best-practices" aria-label="Permalink to &quot;13. Best Practices&quot;">​</a></h2><h3 id="_13-1-prefer-intrinsics" tabindex="-1">13.1 Prefer Intrinsics <a class="header-anchor" href="#_13-1-prefer-intrinsics" aria-label="Permalink to &quot;13.1 Prefer Intrinsics&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ Avoid: Architecture-specific asm</span></span>
<span class="line"><span>unsafe {</span></span>
<span class="line"><span>    asm!(&quot;rdtsc&quot;, $asmOut(&quot;=r&quot;, result))</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ Prefer: Portable intrinsics</span></span>
<span class="line"><span>let timestamp = @cpu_timestamp()</span></span></code></pre></div><h3 id="_13-2-wrap-in-safe-functions" tabindex="-1">13.2 Wrap in Safe Functions <a class="header-anchor" href="#_13-2-wrap-in-safe-functions" aria-label="Permalink to &quot;13.2 Wrap in Safe Functions&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Public safe API</span></span>
<span class="line"><span>pub fn rdtsc(): u64 {</span></span>
<span class="line"><span>    unsafe { rdtsc_impl() }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Private unsafe implementation</span></span>
<span class="line"><span>unsafe fn rdtsc_impl(): u64 {</span></span>
<span class="line"><span>    let! result: u64 = 0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    #[cfg(target_arch = &quot;x86_64&quot;)]</span></span>
<span class="line"><span>    asm!(</span></span>
<span class="line"><span>        &quot;rdtsc&quot;,</span></span>
<span class="line"><span>        &quot;shl rdx, 32&quot;,</span></span>
<span class="line"><span>        &quot;or rax, rdx&quot;,</span></span>
<span class="line"><span>        $asmOut(&quot;={rax}&quot;, result),</span></span>
<span class="line"><span>        $asmOut(&quot;={rdx}&quot;, _)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_13-3-document-safety-requirements" tabindex="-1">13.3 Document Safety Requirements <a class="header-anchor" href="#_13-3-document-safety-requirements" aria-label="Permalink to &quot;13.3 Document Safety Requirements&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/// Performs an atomic compare-and-swap.</span></span>
<span class="line"><span>/// </span></span>
<span class="line"><span>/// # Safety</span></span>
<span class="line"><span>/// - \`ptr\` must be valid and properly aligned</span></span>
<span class="line"><span>/// - \`ptr\` must not be accessed by other threads without synchronization</span></span>
<span class="line"><span>pub unsafe fn compare_and_swap(ptr: *i64!, old: i64, new: i64): i64 {</span></span>
<span class="line"><span>    let! result: i64 = 0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    asm!(</span></span>
<span class="line"><span>        &quot;lock cmpxchg [$0], $2&quot;,</span></span>
<span class="line"><span>        $asmIn(&quot;r&quot;, ptr),</span></span>
<span class="line"><span>        $asmInOut(&quot;+{rax}&quot;, old),</span></span>
<span class="line"><span>        $asmIn(&quot;r&quot;, new)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    result = old</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_14-implementation-status" tabindex="-1">14. Implementation Status <a class="header-anchor" href="#_14-implementation-status" aria-label="Permalink to &quot;14. Implementation Status&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Feature</th><th>Status</th></tr></thead><tbody><tr><td>Basic <code>asm!</code> syntax</td><td>✅ Implemented</td></tr><tr><td>Builtin operands (<code>$asmIn</code>, <code>$asmOut</code>, etc.)</td><td>✅ Implemented</td></tr><tr><td>Borrow checker integration</td><td>✅ Implemented</td></tr><tr><td>x86_64 support</td><td>✅ Implemented</td></tr><tr><td>AArch64 support</td><td>✅ Implemented</td></tr><tr><td>RISC-V support</td><td>📋 Planned</td></tr><tr><td>Target validation</td><td>🚧 In Progress</td></tr><tr><td><code>$asmOpt</code> options</td><td>✅ Implemented</td></tr><tr><td><code>$asmClobber</code> clobbers</td><td>✅ Implemented</td></tr></tbody></table><hr><h2 id="_15-see-also" tabindex="-1">15. See Also <a class="header-anchor" href="#_15-see-also" aria-label="Permalink to &quot;15. See Also&quot;">​</a></h2><ul><li><a href="./18_Raw_Pointers_and_FFI">Raw Pointers and FFI</a></li><li><a href="./22_Intrinsics_and_Low_Level_Operations">Intrinsics and Low-Level Operations</a></li><li><a href="./14_Memory_Management">Memory Management</a></li></ul>`,130)])])}const m=a(p,[["render",l]]);export{h as __pageData,m as default};
