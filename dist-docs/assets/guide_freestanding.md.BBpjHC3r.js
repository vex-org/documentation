import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Freestanding Mode","description":"","frontmatter":{},"headers":[],"relativePath":"guide/freestanding.md","filePath":"guide/freestanding.md"}'),l={name:"guide/freestanding.md"};function i(t,a,o,r,c,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="freestanding-mode" tabindex="-1">Freestanding Mode <a class="header-anchor" href="#freestanding-mode" aria-label="Permalink to &quot;Freestanding Mode&quot;">​</a></h1><p>Vex supports freestanding compilation for bare-metal environments, operating systems, bootloaders, and embedded systems - all without a standard library.</p><h2 id="what-is-freestanding" tabindex="-1">What is Freestanding? <a class="header-anchor" href="#what-is-freestanding" aria-label="Permalink to &quot;What is Freestanding?&quot;">​</a></h2><p>Freestanding mode compiles Vex code without:</p><ul><li>Standard library (<code>std</code>)</li><li>Operating system</li><li>Dynamic memory allocation (by default)</li><li>Runtime support</li></ul><p>This enables:</p><ul><li>OS kernels and Bootloaders</li><li>Embedded firmware</li><li>UEFI applications</li></ul><h2 id="enabling-freestanding" tabindex="-1">Enabling Freestanding <a class="header-anchor" href="#enabling-freestanding" aria-label="Permalink to &quot;Enabling Freestanding&quot;">​</a></h2><h3 id="code-configuration" tabindex="-1">Code Configuration <a class="header-anchor" href="#code-configuration" aria-label="Permalink to &quot;Code Configuration&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Use no_std and no_main keywords</span></span>
<span class="line"><span>no_std        // Don&#39;t link standard library</span></span>
<span class="line"><span>no_main       // Don&#39;t expect a standard main function</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Required: Panic handler function</span></span>
<span class="line"><span>fn panic_handler(info: &amp;PanicInfo): never {</span></span>
<span class="line"><span>    loop {}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Entry point (name depends on target)</span></span>
<span class="line"><span>export extern &quot;C&quot; fn _start(): never {</span></span>
<span class="line"><span>    // Your code here</span></span>
<span class="line"><span>    loop {}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="core-library" tabindex="-1">Core Library <a class="header-anchor" href="#core-library" aria-label="Permalink to &quot;Core Library&quot;">​</a></h2><p>In freestanding mode, you have access to <code>core</code> (a subset of <code>std</code>):</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// No imports needed for builtin contracts like $Add, $Eq</span></span>
<span class="line"><span>// Primitive types and basic constructs are always available</span></span></code></pre></div><h2 id="memory-management" tabindex="-1">Memory Management <a class="header-anchor" href="#memory-management" aria-label="Permalink to &quot;Memory Management&quot;">​</a></h2><h3 id="global-state" tabindex="-1">Global State <a class="header-anchor" href="#global-state" aria-label="Permalink to &quot;Global State&quot;">​</a></h3><p>Global variables are declared at the top level using <code>let</code> or <code>let!</code>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Global buffers</span></span>
<span class="line"><span>let BUFFER: [u8; 4096] = [0; 4096]</span></span>
<span class="line"><span>let! COUNTER: u32 = 0</span></span></code></pre></div><h2 id="hardware-access" tabindex="-1">Hardware Access <a class="header-anchor" href="#hardware-access" aria-label="Permalink to &quot;Hardware Access&quot;">​</a></h2><h3 id="port-i-o-x86" tabindex="-1">Port I/O (x86) <a class="header-anchor" href="#port-i-o-x86" aria-label="Permalink to &quot;Port I/O (x86)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Output byte to port</span></span>
<span class="line"><span>fn outb(port: u16, value: u8) {</span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;out dx, al&quot;,</span></span>
<span class="line"><span>            in(&quot;dx&quot;) port,</span></span>
<span class="line"><span>            in(&quot;al&quot;) value</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="memory-mapped-i-o-mmio" tabindex="-1">Memory-Mapped I/O (MMIO) <a class="header-anchor" href="#memory-mapped-i-o-mmio" aria-label="Permalink to &quot;Memory-Mapped I/O (MMIO)&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct UART {</span></span>
<span class="line"><span>    base: usize</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;UART) write_byte(byte: u8) {</span></span>
<span class="line"><span>    let addr = self.base + 0x00</span></span>
<span class="line"><span>    let ptr = addr as *u8!</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        // Direct pointer write</span></span>
<span class="line"><span>        *ptr = byte</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="inline-assembly" tabindex="-1">Inline Assembly <a class="header-anchor" href="#inline-assembly" aria-label="Permalink to &quot;Inline Assembly&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn read_cr3(): u64 {</span></span>
<span class="line"><span>    let value: u64</span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        asm!(</span></span>
<span class="line"><span>            &quot;mov {}, cr3&quot;,</span></span>
<span class="line"><span>            out(reg) value</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return value</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="vga-text-mode-example" tabindex="-1">VGA Text Mode Example <a class="header-anchor" href="#vga-text-mode-example" aria-label="Permalink to &quot;VGA Text Mode Example&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const VGA_BUFFER: usize = 0xb8000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct VgaWriter {</span></span>
<span class="line"><span>    public:</span></span>
<span class="line"><span>    column: usize,</span></span>
<span class="line"><span>    row: usize,</span></span>
<span class="line"><span>    color: u8</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn (self: &amp;VgaWriter!) write_byte(byte: u8) {</span></span>
<span class="line"><span>    let pos = self.row * 80 + self.column</span></span>
<span class="line"><span>    let ptr = (VGA_BUFFER + pos * 2) as *u16!</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    unsafe {</span></span>
<span class="line"><span>        // Direct write to VGA memory</span></span>
<span class="line"><span>        *ptr = (self.color as u16) &lt;&lt; 8 | byte as u16</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    self.column += 1</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Use <code>repr(C)</code></strong> for structures shared with hardware or other languages.</li><li><strong>Use <code>let</code> at top level</strong> for global state variables.</li><li><strong>Manual Memory Management</strong>: In freestanding environments, you are responsible for memory layout.</li></ol><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/ffi">FFI</a> - Interoperability details</li><li><a href="/docs/guide/advanced/assembly">Inline Assembly</a> - Detailed asm syntax</li><li><a href="/docs/guide/memory/borrowing">Memory Safety</a> - Borrowing rules in bare-metal</li></ul>`,30)])])}const b=s(l,[["render",i]]);export{h as __pageData,b as default};
