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
    <section class="relative overflow-hidden border-b border-vex-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-vex-border bg-vex-surface text-sm text-vex-text-muted mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-vex-success"></span>
              {{ vexVersion }} · pre-1.0
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
              Systems programming with
              <span class="text-vex-primary">parallelism</span>
              in the language.
            </h1>
            <p class="text-lg text-vex-text-muted max-w-xl mb-8 leading-relaxed">
              Vex combines explicit ownership, practical concurrency, and a compiler path to accelerated code. The result is a language for programmers who want control without losing a clear model of the program.
            </p>
            <div class="flex flex-wrap items-center gap-3">
              <a href="/docs/guide/introduction" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-colors">
                Read the guide
                <ArrowRight class="w-4 h-4" />
              </a>
              <router-link to="/playground" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-vex-border text-vex-text hover:bg-vex-surface-light font-medium transition-colors">
                <Terminal class="w-4 h-4" />
                Open playground
              </router-link>
              <router-link to="/download" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-vex-border text-vex-text hover:bg-vex-surface-light font-medium transition-colors">
                <Download class="w-4 h-4" />
                Install
              </router-link>
            </div>
          </div>

          <div>
            <div class="rounded-xl border border-vex-border bg-vex-bg-card overflow-hidden shadow-2xl shadow-black/20">
              <div class="flex items-center gap-2 px-4 py-3 border-b border-vex-border bg-vex-surface">
                <div class="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <span class="ml-2 text-xs text-vex-text-muted font-mono">point.vx</span>
              </div>
              <pre class="p-5 text-sm leading-relaxed overflow-x-auto font-mono text-vex-text"><code>{{ codeExample }}</code></pre>
            </div>
            <p class="mt-3 text-xs text-vex-text-muted">
              This example uses core syntax documented in the language guide. It is intentionally small enough to check and understand in one sitting.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div class="max-w-2xl mb-12">
        <p class="text-sm font-medium text-vex-primary mb-3">The language model</p>
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">Make important costs visible.</h2>
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
