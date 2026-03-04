import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"While Loops","description":"","frontmatter":{},"headers":[],"relativePath":"archive/extra/archive/Baseline/09_while_loops.md","filePath":"archive/extra/archive/Baseline/09_while_loops.md"}'),t={name:"archive/extra/archive/Baseline/09_while_loops.md"};function i(l,a,o,r,c,h){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="while-loops" tabindex="-1">While Loops <a class="header-anchor" href="#while-loops" aria-label="Permalink to &quot;While Loops&quot;">​</a></h1><p><strong>Baseline Feature</strong><br><strong>Version:</strong> 0.2.0<br><strong>Status:</strong> ✅ Implemented<br><strong>Test:</strong> <code>00_base_feats/09_while_loops.vx</code></p><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>Executes a block of code as long as a condition is true.</p><h2 id="syntax" tabindex="-1">Syntax <a class="header-anchor" href="#syntax" aria-label="Permalink to &quot;Syntax&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! i = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>while i &lt; 5 {</span></span>
<span class="line"><span>    (i);</span></span>
<span class="line"><span>    i = i + 1;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="control-statements" tabindex="-1">Control Statements <a class="header-anchor" href="#control-statements" aria-label="Permalink to &quot;Control Statements&quot;">​</a></h2><ul><li><code>break</code>: Exits the loop immediately.</li><li><code>continue</code>: Skips the rest of the current iteration and re-checks condition.</li></ul><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let! n = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>while true {</span></span>
<span class="line"><span>    n = n + 1;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if n % 2 == 0 {</span></span>
<span class="line"><span>        continue; // Skip even numbers</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    (n);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if n &gt; 10 {</span></span>
<span class="line"><span>        break; // Stop after 10</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,9)])])}const _=s(t,[["render",i]]);export{u as __pageData,_ as default};
