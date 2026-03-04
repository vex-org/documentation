<script setup lang="ts">
import { ref, computed } from 'vue'
import { Play, Zap, Trophy, AlertTriangle, ChevronRight, Sparkles, Code, Clock, Cpu } from 'lucide-vue-next'
import { compareCode, type LangResult } from '../api/vex'

const LANG_META: Record<string, { label: string; color: string; icon: string }> = {
  vex: { label: 'Vex', color: '#00e5a0', icon: '⚡' },
  go: { label: 'Go', color: '#00ADD8', icon: '🐹' },
  rust: { label: 'Rust', color: '#FF6B35', icon: '🦀' },
  zig: { label: 'Zig', color: '#F7A41D', icon: '⚙️' },
}

const examples = [
  {
    name: 'Fibonacci',
    code: `fn fib(n: i32): i32 {
    if n <= 1 { return n }
    return fib(n - 1) + fib(n - 2)
}

fn main(): i32 {
    let result = fib(35)
    println(result)
    return 0
}`,
  },
  {
    name: 'Sum 1M',
    code: `fn main(): i32 {
    let! sum = 0
    for i in 0..1000000 {
        sum = sum + i
    }
    println(sum)
    return 0
}`,
  },
  {
    name: 'String Concat',
    code: `fn main(): i32 {
    let! s = ""
    for i in 0..10000 {
        s = s + "x"
    }
    println(s.len())
    return 0
}`,
  },
  {
    name: 'SIMD Sum 1M',
    code: `fn main(): i32 {
    let! total: f64 = 0.0
    for i in 0..250000 {
        let chunk = [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3]
        total = total + (<+ chunk)
    }
    println(total)
    return 0
}`,
  },
  {
    name: 'Array Math',
    code: `fn dot(a: [f64; 4], b: [f64; 4]): f64 {
    return <+ (a * b)
}

fn main(): i32 {
    let! sum: f64 = 0.0
    for i in 0..100000 {
        let a = [1.0, 2.0, 3.0, 4.0]
        let b = [5.0, 6.0, 7.0, 8.0]
        sum = sum + dot(a, b)
    }
    println(sum)
    return 0
}`,
  },
]

const code = ref(examples[0].code)
const activeExample = ref(0)
const isRunning = ref(false)
const results = ref<Record<string, LangResult> | null>(null)
const disclaimer = ref('')
const errorMsg = ref('')
const selectedLangs = ref(['go', 'rust', 'zig'])

const sortedResults = computed(() => {
  if (!results.value) return []
  return Object.entries(results.value)
    .map(([lang, r]) => ({ lang, ...r }))
    .sort((a, b) => {
      if (a.error && !b.error) return 1
      if (!a.error && b.error) return -1
      return a.time_ms - b.time_ms
    })
})

const fastest = computed(() => {
  const valid = sortedResults.value.filter(r => !r.error)
  return valid.length > 0 ? valid[0].lang : null
})

const maxTime = computed(() => {
  const valid = sortedResults.value.filter(r => !r.error)
  return valid.length > 0 ? Math.max(...valid.map(r => r.time_ms)) : 1
})

function loadExample(index: number) {
  activeExample.value = index
  code.value = examples[index].code
  results.value = null
  errorMsg.value = ''
}

function toggleLang(lang: string) {
  const i = selectedLangs.value.indexOf(lang)
  if (i >= 0) selectedLangs.value.splice(i, 1)
  else selectedLangs.value.push(lang)
}

async function runBenchmark() {
  if (isRunning.value || !code.value.trim()) return
  isRunning.value = true
  results.value = null
  errorMsg.value = ''
  disclaimer.value = ''

  try {
    const res = await compareCode(code.value, selectedLangs.value)
    results.value = res.results
    disclaimer.value = res.ai_disclaimer
  } catch (err: any) {
    errorMsg.value = err.message
  } finally {
    isRunning.value = false
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy class="w-6 h-6 text-yellow-400" />
          Benchmark Arena
        </h1>
        <p class="text-vex-text-muted text-sm mt-1">Write Vex code → AI translates to Go, Rust, Zig → All run in parallel</p>
      </div>
      <button
        @click="runBenchmark"
        :disabled="isRunning"
        class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-bold transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-yellow-500/20"
      >
        <Play v-if="!isRunning" class="w-4 h-4" />
        <div v-else class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        {{ isRunning ? 'Running...' : 'Battle!' }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Left: Examples + Lang selector -->
      <div class="space-y-4">
        <!-- Examples -->
        <div class="rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden">
          <div class="px-4 py-3 border-b border-vex-border bg-vex-surface/50 flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-yellow-400" />
            <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Examples</span>
          </div>
          <div class="p-2">
            <button
              v-for="(ex, i) in examples"
              :key="i"
              @click="loadExample(i)"
              :class="['w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left mb-1 group', activeExample === i ? 'bg-yellow-500/10 text-yellow-400' : 'text-vex-text-muted hover:bg-white/5 hover:text-white']"
            >
              <Zap class="w-4 h-4 flex-shrink-0" />
              <span class="truncate flex-1">{{ ex.name }}</span>
              <ChevronRight :class="['w-3 h-3 transition-transform', activeExample === i ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0']" />
            </button>
          </div>
        </div>

        <!-- Language selector -->
        <div class="rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden">
          <div class="px-4 py-3 border-b border-vex-border bg-vex-surface/50 flex items-center gap-2">
            <Cpu class="w-4 h-4 text-vex-primary" />
            <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Opponents</span>
          </div>
          <div class="p-3 space-y-2">
            <button
              v-for="lang in ['go', 'rust', 'zig']"
              :key="lang"
              @click="toggleLang(lang)"
              :class="['w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all', selectedLangs.includes(lang) ? 'bg-white/10 text-white' : 'text-vex-text-muted opacity-50 hover:opacity-100']"
            >
              <span class="text-lg">{{ LANG_META[lang].icon }}</span>
              <span class="flex-1 text-left">{{ LANG_META[lang].label }}</span>
              <div :class="['w-4 h-4 rounded border-2 transition-all', selectedLangs.includes(lang) ? 'border-vex-primary bg-vex-primary' : 'border-vex-border']">
                <svg v-if="selectedLangs.includes(lang)" class="w-full h-full text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Code editor -->
      <div class="lg:col-span-3 flex flex-col gap-6">
        <!-- Editor -->
        <div class="rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden">
          <div class="flex items-center gap-2 px-4 py-2 border-b border-vex-border bg-vex-surface/50">
            <Code class="w-4 h-4 text-vex-primary" />
            <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Vex Code</span>
            <span class="ml-auto text-[10px] text-vex-text-muted">AI will translate to other languages</span>
          </div>
          <textarea
            v-model="code"
            class="w-full h-48 p-4 bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
            spellcheck="false"
            @keydown.ctrl.enter="runBenchmark"
            @keydown.meta.enter="runBenchmark"
          ></textarea>
        </div>

        <!-- Loading animation -->
        <div v-if="isRunning" class="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-8">
          <div class="flex items-center justify-center gap-4">
            <div class="flex gap-6">
              <div v-for="lang in ['vex', ...selectedLangs]" :key="lang" class="flex flex-col items-center gap-2">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl animate-bounce" :style="{ animationDelay: lang === 'vex' ? '0ms' : lang === 'go' ? '100ms' : lang === 'rust' ? '200ms' : '300ms', backgroundColor: LANG_META[lang]?.color + '15' }">
                  {{ LANG_META[lang]?.icon }}
                </div>
                <span class="text-xs text-vex-text-muted">{{ LANG_META[lang]?.label }}</span>
              </div>
            </div>
          </div>
          <p class="text-center text-sm text-vex-text-muted mt-4">AI is translating & running all languages in parallel...</p>
        </div>

        <!-- Error -->
        <div v-if="errorMsg" class="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
          <div class="flex items-center gap-2 text-red-400">
            <AlertTriangle class="w-5 h-5" />
            <span class="text-sm font-medium">{{ errorMsg }}</span>
          </div>
        </div>

        <!-- Results -->
        <div v-if="results && !isRunning" class="space-y-4">
          <!-- Podium -->
          <div class="rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden">
            <div class="px-4 py-3 border-b border-vex-border bg-vex-surface/50 flex items-center gap-2">
              <Trophy class="w-4 h-4 text-yellow-400" />
              <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Results</span>
              <span v-if="disclaimer" class="ml-auto text-[10px] text-vex-text-muted italic">{{ disclaimer }}</span>
            </div>
            <div class="p-4 space-y-3">
              <div
                v-for="(r, i) in sortedResults"
                :key="r.lang"
                :class="['flex items-center gap-4 p-3 rounded-xl transition-all', r.lang === fastest ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-white/[0.02]']"
              >
                <!-- Rank -->
                <div :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm', i === 0 && !r.error ? 'bg-yellow-500 text-black' : i === 1 && !r.error ? 'bg-gray-300 text-black' : i === 2 && !r.error ? 'bg-amber-700 text-white' : 'bg-white/10 text-vex-text-muted']">
                  {{ r.error ? '✗' : i + 1 }}
                </div>

                <!-- Lang -->
                <div class="flex items-center gap-2 w-24">
                  <span class="text-lg">{{ LANG_META[r.lang]?.icon }}</span>
                  <span class="text-sm font-medium text-white">{{ LANG_META[r.lang]?.label }}</span>
                </div>

                <!-- Bar -->
                <div class="flex-1">
                  <div v-if="!r.error" class="h-6 rounded-full overflow-hidden bg-white/5">
                    <div
                      class="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                      :style="{ width: Math.max(8, (r.time_ms / maxTime) * 100) + '%', backgroundColor: LANG_META[r.lang]?.color }"
                    >
                      <span class="text-[10px] font-bold text-black whitespace-nowrap">{{ r.time_ms.toFixed(1) }}ms</span>
                    </div>
                  </div>
                  <div v-if="!r.error" class="flex flex-wrap gap-3 mt-1.5 text-[10px] text-vex-text-muted">
                    <span v-if="r.compile_time_ms">⚡ Compile: {{ r.compile_time_ms.toFixed(1) }}ms</span>
                    <span v-if="r.run_time_ms">▶ Run: {{ r.run_time_ms.toFixed(1) }}ms</span>
                    <span v-if="r.user_time_ms">👤 User: {{ r.user_time_ms.toFixed(2) }}ms</span>
                    <span v-if="r.sys_time_ms">⚙️ Sys: {{ r.sys_time_ms.toFixed(2) }}ms</span>
                    <span v-if="r.memory_kb">💾 {{ r.memory_kb > 1024 ? (r.memory_kb / 1024).toFixed(1) + ' MB' : r.memory_kb + ' KB' }}</span>
                    <span v-if="r.binary_kb">📦 {{ r.binary_kb > 1024 ? (r.binary_kb / 1024).toFixed(1) + ' MB' : r.binary_kb + ' KB' }}</span>
                  </div>
                  <div v-if="r.error" class="text-xs text-red-400">{{ r.error.length > 120 ? r.error.substring(0, 120) + '...' : r.error }}</div>
                </div>

                <!-- Trophy for winner -->
                <div class="w-6">
                  <Trophy v-if="i === 0 && !r.error" class="w-5 h-5 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          <!-- Generated Code Tabs -->
          <div class="rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden">
            <div class="px-4 py-3 border-b border-vex-border bg-vex-surface/50 flex items-center gap-2">
              <Code class="w-4 h-4 text-vex-primary" />
              <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">AI-Generated Code</span>
            </div>
            <div class="p-2">
              <details v-for="r in sortedResults.filter(x => x.code && x.lang !== 'vex')" :key="r.lang" class="mb-2">
                <summary class="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-white/5 text-sm text-vex-text-muted">
                  <span class="text-lg">{{ LANG_META[r.lang]?.icon }}</span>
                  <span class="font-medium text-white">{{ LANG_META[r.lang]?.label }}</span>
                  <span class="ml-auto text-[10px] text-vex-text-muted">click to expand</span>
                </summary>
                <pre class="mx-3 mb-2 p-4 rounded-xl bg-black/30 text-[11px] text-vex-text overflow-auto font-mono whitespace-pre-wrap">{{ r.code }}</pre>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
