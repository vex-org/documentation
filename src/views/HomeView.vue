<script setup lang="ts">
const features = [
  { icon: '⚡', title: 'Rust-Level Speed', desc: 'Zero-cost abstractions with LLVM 21 backend. 4ns per random number, competitive with native Rust.' },
  { icon: '🛡️', title: 'Memory Safe', desc: '4-phase Polonius borrow checker with automatic lifetimes. No GC, no leaks, no data races.' },
  { icon: '🧠', title: 'Auto-Vectorization', desc: 'SIR (Silicon IR) generates optimal SIMD for AVX-512, ARM SVE/NEON, and RISC-V vectors automatically.' },
  { icon: '🎮', title: 'GPU Offloading', desc: 'Write Vex, run on CUDA, Metal, Vulkan, ROCm, or WebGPU. 7 backends, zero boilerplate.' },
  { icon: '🔄', title: 'Go-Style Concurrency', desc: 'M:N scheduler with go {} blocks, async/await, and lock-free channels. Millions of tasks.' },
  { icon: '📦', title: 'Batteries Included', desc: 'LSP, formatter, fuzzer, benchmarks, package manager, and VS Code extension — all built in.' },
]

const codeExample = `fn main(): i32 {
    let! data = Vec<i32>();
    for let i in 0..1000 {
        data.push(i * i);
    }
    
    // Auto-vectorized by SIR
    let sum = <+ data;
    
    // Fire-and-forget concurrency
    go { process(data); };
    
    $println("Sum: ", sum);
    return 0;
}`

const stats = [
  { value: '251K', label: 'Lines of Code' },
  { value: '153K', label: 'Lines of Rust' },
  { value: '48K', label: 'SIR Engine' },
  { value: '7', label: 'GPU Backends' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <!-- Background gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-vex-primary/10 via-transparent to-transparent pointer-events-none"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-vex-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-vex-border text-sm text-vex-text-muted mb-6">
            <span class="w-2 h-2 rounded-full bg-vex-success animate-pulse"></span>
            v0.1.2 — Alpha
          </div>
          <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            <span class="text-white">Every Cycle.</span><br>
            <span class="bg-gradient-to-r from-vex-primary to-vex-accent bg-clip-text text-transparent">Every Core.</span><br>
            <span class="text-white">Every Time.</span>
          </h1>
          <p class="text-lg sm:text-xl text-vex-text-muted max-w-2xl mx-auto mb-8">
            A modern systems language that combines Rust's safety, Go's simplicity, and automatic hardware optimization — CPU, GPU, and NPU.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/docs/guide/introduction" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-all shadow-lg shadow-vex-primary/25 hover:shadow-vex-primary/40">
              Get Started
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <a href="https://github.com/vex-org" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-vex-border text-vex-text hover:bg-white/5 font-medium transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>

        <!-- Code example -->
        <div class="mt-16 max-w-2xl mx-auto">
          <div class="rounded-xl border border-vex-border bg-vex-bg-card overflow-hidden shadow-2xl">
            <div class="flex items-center gap-2 px-4 py-3 border-b border-vex-border">
              <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span class="ml-2 text-xs text-vex-text-muted font-mono">hello.vx</span>
            </div>
            <pre class="p-4 text-sm leading-relaxed overflow-x-auto font-mono text-vex-text"><code>{{ codeExample }}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="border-y border-vex-border bg-vex-surface/50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl font-bold text-white">{{ stat.value }}</div>
            <div class="text-sm text-vex-text-muted mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-3">Why Vex?</h2>
        <p class="text-vex-text-muted max-w-xl mx-auto">One language for all silicon. No CUDA, no Metal, no OpenCL — just Vex.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="f in features" :key="f.title" class="group p-6 rounded-xl border border-vex-border bg-vex-bg-card hover:bg-vex-bg-card-hover hover:border-vex-primary/30 transition-all">
          <div class="text-2xl mb-3">{{ f.icon }}</div>
          <h3 class="text-lg font-semibold text-white mb-2">{{ f.title }}</h3>
          <p class="text-sm text-vex-text-muted leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="border-t border-vex-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to saturate your hardware?</h2>
        <p class="text-vex-text-muted mb-8 max-w-lg mx-auto">Join the community building the future of systems programming.</p>
        <div class="flex items-center justify-center gap-3">
          <a href="/docs/guide/installation" class="px-6 py-3 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-all">Install Vex</a>
          <router-link to="/packages" class="px-6 py-3 rounded-xl border border-vex-border text-vex-text hover:bg-white/5 font-medium transition-all">Browse Packages</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
