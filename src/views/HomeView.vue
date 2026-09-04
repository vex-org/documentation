<script setup lang="ts">
import {
  ArrowRight,
  BookOpen,
  Brain,
  Download,
  GitBranch,
  Package,
  Shield,
  Terminal,
  Zap,
} from "lucide-vue-next";
import { markRaw, onMounted, ref, type Component } from "vue";
import { getHealth } from "@/api/vex";

const vexVersion = ref("0.4.0-rc.39");

onMounted(async () => {
  const health = await getHealth();
  const version = health?.compilers?.vex;
  if (version && version !== "unknown" && version !== "not found") {
    vexVersion.value = version.startsWith("v") ? version : "v" + version;
  }
});

const features = [
  {
    icon: markRaw(Shield),
    title: "Ownership without ceremony",
    desc: "Immutable bindings, explicit mutation, moves, borrows, and lifetime checks make the cost of data movement visible in the code.",
  },
  {
    icon: markRaw(Zap),
    title: "A direct native toolchain",
    desc: "Vex source is checked, lowered, and compiled for native targets through a toolchain designed for systems work.",
  },
  {
    icon: markRaw(GitBranch),
    title: "Concurrency in the language",
    desc: "go blocks, channels, async functions, and await share the same language and safety model as synchronous code.",
  },
  {
    icon: markRaw(Brain),
    title: "A path to data parallelism",
    desc: "Arrays, tensor operations, and Silicon IR provide an experimental route to SIMD and accelerator backends.",
  },
  {
    icon: markRaw(Package),
    title: "Low-level access when needed",
    desc: "Typed pointers, spans, raw buffers, FFI declarations, and freestanding workflows cover systems boundaries.",
  },
  {
    icon: markRaw(BookOpen),
    title: "Documentation with a status line",
    desc: "The guide distinguishes verified language behavior from experimental and planned work so readers know what they can rely on.",
  },
] as { icon: Component; title: string; desc: string }[];

const codeExample = [
  "struct Point {",
  "    public:",
  "    x: i32,",
  "    y: i32,",
  "}",
  "",
  "fn (point: &Point) sum(): i32 {",
  "    return point.x + point.y;",
  "}",
  "",
  "fn main(): i32 {",
  "    let point = Point { x: 20, y: 22 };",
  "    $println(point.sum());",
  "    return 0;",
  "}",
].join("\n");

const principles = [
  {
    title: "Learn the core first",
    desc: "Start with the language guide, not the backend details. Vex is easiest to understand through its bindings, types, functions, and ownership rules.",
    link: "/docs/guide/introduction",
    linkText: "Read the introduction",
  },
  {
    title: "Check every assumption",
    desc: "Vex is pre-1.0. Keep the compiler version pinned and run vex lint on examples before depending on an experimental feature.",
    link: "/docs/guide/language-status",
    linkText: "See language status",
  },
  {
    title: "Move closer to the hardware deliberately",
    desc: "Once ordinary code is clear, explore concurrency, SIMD, SIR, GPU backends, FFI, and the standard library with their own documentation.",
    link: "/docs/guide/",
    linkText: "Browse the documentation",
  },
];
</script>

<template>
  <div>
    <section class="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden border-b border-vex-border bg-vex-bg">
      <img
        src="/brand/vex-panther-hero.webp"
        alt=""
        class="absolute inset-0 h-full w-full object-cover object-[68%_45%] opacity-45 sm:opacity-60 lg:opacity-95"
        fetchpriority="high"
      />
      <div class="absolute inset-0 bg-[linear-gradient(90deg,#07090b_0%,rgba(7,9,11,0.98)_28%,rgba(7,9,11,0.72)_52%,rgba(7,9,11,0.08)_82%)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(0deg,#07090b_0%,transparent_35%,rgba(7,9,11,0.24)_100%)]"></div>
      <div class="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(32,38,48,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(32,38,48,0.28)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(90deg,black,transparent_58%)]"></div>

      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
        <div class="max-w-2xl">
          <div class="flex items-center gap-3 mb-8">
            <img src="/vex-logo.svg" alt="" class="h-9 w-9" />
            <span class="brand-kicker text-[11px] font-semibold text-vex-text">Vex Language</span>
            <span class="h-px w-10 bg-vex-primary"></span>
          </div>

          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-vex-border bg-vex-bg/70 text-xs text-vex-text-muted mb-7 backdrop-blur-md">
            <span class="w-1.5 h-1.5 rounded-full bg-vex-accent shadow-[0_0_12px_rgba(32,214,199,0.75)]"></span>
            {{ vexVersion }} · pre-1.0
          </div>

          <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.045em] leading-[0.98] mb-7">
            <span class="block text-vex-primary-light">Fast.</span>
            <span class="block text-vex-text">Safe.</span>
            <span class="block text-vex-accent">Expressive.</span>
          </h1>

          <p class="font-display text-xl sm:text-2xl font-medium text-vex-text max-w-xl mb-4 leading-snug">
            Systems programming with parallelism in the language.
          </p>
          <p class="text-base sm:text-lg text-vex-text-muted max-w-xl mb-9 leading-relaxed">
            Explicit ownership, practical concurrency, and a direct compiler path to accelerated native code—without losing a clear model of the program.
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <a href="/docs/guide/introduction" class="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-vex-primary hover:bg-vex-primary-dim text-white font-semibold transition-colors shadow-[0_12px_40px_rgba(227,10,23,0.2)]">
              Start building
              <ArrowRight class="w-4 h-4" />
            </a>
            <router-link to="/playground" class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-vex-border-light bg-vex-bg/45 text-vex-text hover:bg-vex-surface-light/80 font-medium transition-colors backdrop-blur-md">
              <Terminal class="w-4 h-4 text-vex-accent" />
              Try Vex
            </router-link>
            <router-link to="/download" class="inline-flex items-center gap-2 px-4 py-3 text-sm text-vex-text-muted hover:text-vex-text transition-colors">
              <Download class="w-4 h-4" />
              Install
            </router-link>
          </div>
        </div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
        <p class="brand-kicker text-[10px] text-vex-text-muted">Built for a more capable tomorrow.</p>
      </div>
    </section>

    <section class="relative border-b border-vex-border bg-vex-bg-card/65">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div class="grid lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-16 items-center">
          <div>
            <p class="brand-kicker text-[10px] text-vex-primary-light mb-4">Power through precision</p>
            <h2 class="font-display text-2xl sm:text-3xl font-semibold text-vex-text mb-4">Control you can see.</h2>
            <p class="text-vex-text-muted leading-relaxed">
              Vex keeps ownership, mutation, communication, and acceleration visible in source. The compiler does the hard work without hiding the cost model.
            </p>
          </div>

          <div>
            <div class="rounded-xl border border-vex-border bg-vex-bg overflow-hidden shadow-2xl shadow-black/30">
              <div class="flex items-center gap-2 px-4 py-3 border-b border-vex-border bg-vex-surface/80">
                <span class="w-2 h-2 rounded-full bg-vex-primary"></span>
                <span class="w-2 h-2 rounded-full bg-vex-border-light"></span>
                <span class="w-2 h-2 rounded-full bg-vex-accent"></span>
                <span class="ml-2 text-[11px] text-vex-text-muted font-mono tracking-wide">point.vx</span>
                <span class="ml-auto brand-kicker text-[9px] text-vex-accent">native</span>
              </div>
              <pre class="p-5 sm:p-6 text-sm leading-relaxed overflow-x-auto font-mono text-vex-text"><code>{{ codeExample }}</code></pre>
            </div>
            <p class="mt-3 text-xs text-vex-text-muted">
              Core syntax from the checked language guide—small enough to understand in one sitting.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div class="max-w-2xl mb-12">
        <p class="brand-kicker text-[10px] font-medium text-vex-primary-light mb-3">The language model</p>
        <h2 class="font-display text-2xl sm:text-3xl font-bold text-white mb-4">Make important costs visible.</h2>
        <p class="text-vex-text-muted leading-relaxed">
          Vex is designed to keep data ownership, mutation, communication, and acceleration visible in the source. Its core is compact; the advanced sections build on that core rather than replacing it.
        </p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-vex-border rounded-xl overflow-hidden border border-vex-border">
        <div v-for="feature in features" :key="feature.title" class="p-6 bg-vex-bg hover:bg-vex-bg-card transition-colors">
          <component :is="feature.icon" class="w-5 h-5 text-vex-text-muted mb-4" />
          <h3 class="text-base font-semibold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-vex-text-muted leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <section class="border-y border-vex-border bg-vex-surface/30">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div class="grid md:grid-cols-3 gap-6">
          <article v-for="principle in principles" :key="principle.title" class="rounded-xl border border-vex-border bg-vex-bg-card p-6">
            <h3 class="text-lg font-semibold text-white mb-3">{{ principle.title }}</h3>
            <p class="text-sm text-vex-text-muted leading-relaxed mb-5">{{ principle.desc }}</p>
            <a :href="principle.link" class="inline-flex items-center gap-2 text-sm font-medium text-vex-primary hover:text-vex-primary-light transition-colors">
              {{ principle.linkText }}
              <ArrowRight class="w-4 h-4" />
            </a>
          </article>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div class="grid lg:grid-cols-[1fr_auto] gap-8 items-center rounded-2xl border border-vex-border bg-vex-bg-card p-8 sm:p-10">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">A language worth checking out.</h2>
          <p class="text-vex-text-muted max-w-2xl leading-relaxed">
            Build the compiler, check the first example, and then explore the parts of Vex that match the problem you are solving. The documentation tells you which pieces are ready and which are still moving.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="/docs/guide/installation" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-colors">
            <Download class="w-4 h-4" />
            Install Vex
          </a>
          <a href="/docs/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-vex-border text-vex-text hover:bg-vex-surface-light font-medium transition-colors">
            <BookOpen class="w-4 h-4" />
            Documentation
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
