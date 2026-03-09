<script setup lang="ts">
import { Zap, Shield, Brain, Gamepad2, RefreshCw, Package, ArrowRight, Terminal, Download } from 'lucide-vue-next'
import { markRaw, type Component } from 'vue'

const features = [
  { icon: markRaw(Zap), title: 'Rust-Level Speed', desc: 'Zero-cost abstractions with LLVM 21 backend. Competitive with native Rust performance.' },
  { icon: markRaw(Shield), title: 'Memory Safe', desc: 'Polonius borrow checker with automatic lifetimes. No GC, no leaks, no data races.' },
  { icon: markRaw(Brain), title: 'Auto-Vectorization', desc: 'SIR generates optimal SIMD for AVX-512, ARM SVE/NEON, and RISC-V vectors automatically.' },
  { icon: markRaw(Gamepad2), title: 'GPU Offloading', desc: 'Write Vex, run on CUDA, Metal, Vulkan, ROCm, or WebGPU. 7 backends, zero boilerplate.' },
  { icon: markRaw(RefreshCw), title: 'Go-Style Concurrency', desc: 'M:N scheduler with go {} blocks, async/await, and lock-free channels.' },
  { icon: markRaw(Package), title: 'Batteries Included', desc: 'LSP, formatter, package manager, and VS Code extension — all built in.' },
] as { icon: Component; title: string; desc: string }[]

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
    <section class="relative overflow-hidden border-b border-vex-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left: Text -->
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-vex-border bg-vex-surface text-sm text-vex-text-muted mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-vex-success"></span>
              v0.3.2 Alpha
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Every Cycle.<br>
              Every Core.<br>
              <span class="text-vex-primary">Every Time.</span>
            </h1>
            <p class="text-lg text-vex-text-muted max-w-lg mb-8 leading-relaxed">
              A modern systems language combining Rust's safety, Go's simplicity, and automatic hardware optimization — CPU, GPU, and NPU.
            </p>
            <div class="flex flex-wrap items-center gap-3">
              <a href="/docs/guide/introduction" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-colors">
                Get Started
                <ArrowRight class="w-4 h-4" />
              </a>
              <router-link to="/playground" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-vex-border text-vex-text hover:bg-vex-surface-light font-medium transition-colors">
                <Terminal class="w-4 h-4" />
                Playground
              </router-link>
              <router-link to="/arena" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 font-medium transition-colors">
                🏆 Arena
              </router-link>
              <router-link to="/download" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-vex-accent text-white hover:bg-vex-accent/90 font-medium transition-colors">
                <Download class="w-4 h-4" />
                Download
              </router-link>
            </div>

            <!-- Inline stats -->
            <div class="flex flex-wrap gap-6 mt-10 pt-8 border-t border-vex-border">
              <div v-for="stat in stats" :key="stat.label">
                <div class="text-xl font-bold text-white">{{ stat.value }}</div>
                <div class="text-xs text-vex-text-muted mt-0.5">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Right: Code -->
          <div class="hidden lg:block">
            <div class="rounded-xl border border-vex-border bg-vex-bg-card overflow-hidden">
              <div class="flex items-center gap-2 px-4 py-3 border-b border-vex-border bg-vex-surface">
                <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                <span class="ml-2 text-xs text-vex-text-muted font-mono">hello.vx</span>
              </div>
              <pre class="p-5 text-sm leading-relaxed overflow-x-auto font-mono text-vex-text"><code>{{ codeExample }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div class="text-center mb-14">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">Why Vex?</h2>
        <p class="text-vex-text-muted max-w-lg mx-auto">One language for all silicon. No CUDA, no Metal, no OpenCL — just Vex.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-vex-border rounded-xl overflow-hidden border border-vex-border">
        <div v-for="f in features" :key="f.title" class="p-6 bg-vex-bg hover:bg-vex-bg-card transition-colors">
          <component :is="f.icon" class="w-5 h-5 text-vex-text-muted mb-4" />
          <h3 class="text-base font-semibold text-white mb-2">{{ f.title }}</h3>
          <p class="text-sm text-vex-text-muted leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="border-t border-vex-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to saturate your hardware?</h2>
        <p class="text-vex-text-muted mb-8 max-w-md mx-auto">Join the community building the future of systems programming.</p>
        <div class="flex items-center justify-center gap-3">
          <a href="/docs/guide/installation" class="px-5 py-2.5 rounded-lg bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-colors">Install Vex</a>
          <router-link to="/packages" class="px-5 py-2.5 rounded-lg border border-vex-border text-vex-text hover:bg-vex-surface-light font-medium transition-colors">Browse Packages</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
