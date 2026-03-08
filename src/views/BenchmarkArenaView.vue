<script setup lang="ts">
import { ref, computed } from 'vue'
import { Play, Trophy, AlertTriangle, ChevronRight, Sparkles, Code, Cpu, Settings, WandSparkles, FlaskConical } from 'lucide-vue-next'
import { compareCode, comparePreset, type LangResult } from '../api/vex'
import { benchmarks } from '../data/benchmarks'

const LANG_META: Record<string, { label: string; color: string; icon: string }> = {
  vex: { label: 'Vex', color: '#00e5a0', icon: '⚡' },
  go: { label: 'Go', color: '#00ADD8', icon: '🐹' },
  rust: { label: 'Rust', color: '#FF6B35', icon: '🦀' },
  zig: { label: 'Zig', color: '#F7A41D', icon: '⚙️' },
}

// Tabs: "preset" or "custom"
const activeTab = ref<'preset' | 'custom'>('preset')

// Preset state
const activeExample = ref(0)
const presetResults = ref<Record<string, LangResult> | null>(null)
const presetRunning = ref(false)
const presetError = ref('')

// Custom state
const customCode = ref(`fn main(): i32 {
    let! sum = 0
    for i in 0..1000000 {
        sum = sum + i
    }
    println(sum)
    return 0
}`)
const customResults = ref<Record<string, LangResult> | null>(null)
const customRunning = ref(false)
const customError = ref('')
const customDisclaimer = ref('')

// Shared
const selectedLangs = ref(['go', 'rust', 'zig'])
const optLevel = ref('O2')
const langVersions = ref<Record<string, string>>({})
const optLevels = [
  { value: 'O0', label: '-O0', desc: 'No optimization' },
  { value: 'O1', label: '-O1', desc: 'Basic' },
  { value: 'O2', label: '-O2', desc: 'Recommended' },
  { value: 'O3', label: '-O3', desc: 'Aggressive' },
]

// Current results based on active tab
const results = computed(() => activeTab.value === 'preset' ? presetResults.value : customResults.value)
const isRunning = computed(() => activeTab.value === 'preset' ? presetRunning.value : customRunning.value)
const errorMsg = computed(() => activeTab.value === 'preset' ? presetError.value : customError.value)

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
  presetResults.value = null
  presetError.value = ''
}

function toggleLang(lang: string) {
  const i = selectedLangs.value.indexOf(lang)
  if (i >= 0) selectedLangs.value.splice(i, 1)
  else selectedLangs.value.push(lang)
}

// Run preset benchmark with pre-written code (no AI)
async function runPreset() {
  if (presetRunning.value) return
  presetRunning.value = true
  presetResults.value = null
  presetError.value = ''

  const ex = benchmarks[activeExample.value]
  try {
    const res = await comparePreset({
      vex_code: ex.vex,
      go_code: selectedLangs.value.includes('go') ? ex.go : '',
      rust_code: selectedLangs.value.includes('rust') ? ex.rust : '',
      zig_code: selectedLangs.value.includes('zig') ? ex.zig : '',
      opt_level: optLevel.value,
    })
    presetResults.value = res.results
    if (res.versions) langVersions.value = res.versions
  } catch (err: any) {
    presetError.value = err.message
  } finally {
    presetRunning.value = false
  }
}

// Run custom benchmark with AI translation
async function runCustom() {
  if (customRunning.value || !customCode.value.trim()) return
  customRunning.value = true
  customResults.value = null
  customError.value = ''
  customDisclaimer.value = ''

  try {
    const res = await compareCode(customCode.value, selectedLangs.value, optLevel.value)
    customResults.value = res.results
    if (res.versions) langVersions.value = res.versions
    customDisclaimer.value = res.ai_disclaimer
  } catch (err: any) {
    customError.value = err.message
  } finally {
    customRunning.value = false
  }
}

function runBenchmark() {
  if (activeTab.value === 'preset') runPreset()
  else runCustom()
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy class="w-6 h-6 text-yellow-400" />
          Benchmark Arena
        </h1>
        <p class="text-vex-text-muted text-sm mt-1">Compare Vex against Go, Rust & Zig — fair benchmarks, real compilers</p>
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
      <!-- Left sidebar -->
      <div class="space-y-4">
        <!-- Tab Switcher -->
        <div class="rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden">
          <div class="p-2 flex gap-1">
            <button
              @click="activeTab = 'preset'"
              :class="['flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                activeTab === 'preset' ? 'bg-yellow-500/15 text-yellow-400' : 'text-vex-text-muted hover:text-white hover:bg-white/5']"
            >
              <Sparkles class="w-4 h-4" />
              Benchmarks
            </button>
            <button
              @click="activeTab = 'custom'"
              :class="['flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                activeTab === 'custom' ? 'bg-purple-500/15 text-purple-400' : 'text-vex-text-muted hover:text-white hover:bg-white/5']"
            >
              <FlaskConical class="w-4 h-4" />
              Kendin Dene
            </button>
          </div>
        </div>

        <!-- Examples (preset tab) -->
        <div v-if="activeTab === 'preset'" class="rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden">
          <div class="px-4 py-3 border-b border-vex-border bg-vex-surface/50 flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-yellow-400" />
            <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Examples</span>
            <span class="ml-auto text-[10px] text-vex-text-muted">{{ benchmarks.length }}</span>
          </div>
          <div class="p-2 max-h-[520px] overflow-y-auto">
            <button
              v-for="(ex, i) in benchmarks"
              :key="i"
              @click="loadExample(i)"
              :class="['w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left mb-1 group', activeExample === i ? 'bg-yellow-500/10 text-yellow-400' : 'text-vex-text-muted hover:bg-white/5 hover:text-white']"
            >
              <span class="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold" :class="activeExample === i ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-vex-text-muted'">{{ i + 1 }}</span>
              <div class="flex-1 min-w-0">
                <span class="truncate block">{{ ex.name }}</span>
                <span class="text-[10px] text-vex-text-muted truncate block">{{ ex.description }}</span>
              </div>
              <ChevronRight :class="['w-3 h-3 transition-transform flex-shrink-0', activeExample === i ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0']" />
            </button>
          </div>
        </div>

        <!-- Custom mode info -->
        <div v-if="activeTab === 'custom'" class="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
          <div class="flex items-center gap-2 mb-2">
            <WandSparkles class="w-4 h-4 text-purple-400" />
            <span class="text-sm font-medium text-purple-300">AI Translation</span>
          </div>
          <p class="text-xs text-vex-text-muted leading-relaxed">Write Vex code and AI will translate it to Go, Rust & Zig. All 4 versions run on real compilers for fair comparison.</p>
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

        <!-- Optimization Level -->
        <div class="rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden">
          <div class="px-4 py-3 border-b border-vex-border bg-vex-surface/50 flex items-center gap-2">
            <Settings class="w-4 h-4 text-vex-primary" />
            <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Opt Level</span>
          </div>
          <div class="p-3 flex gap-2">
            <button
              v-for="o in optLevels"
              :key="o.value"
              @click="optLevel = o.value"
              :title="o.desc"
              :class="['flex-1 px-2 py-2 rounded-xl text-xs font-mono font-bold transition-all text-center', optLevel === o.value ? 'bg-vex-primary text-vex-bg' : 'bg-white/5 text-vex-text-muted hover:text-white']"
            >{{ o.label }}</button>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="lg:col-span-3 flex flex-col gap-6">
        <!-- Code editor -->
        <div class="rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden">
          <div class="flex items-center gap-2 px-4 py-2 border-b border-vex-border bg-vex-surface/50">
            <Code class="w-4 h-4 text-vex-primary" />
            <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">
              {{ activeTab === 'preset' ? benchmarks[activeExample].name + ' — Vex Code' : 'Your Vex Code' }}
            </span>
            <span v-if="activeTab === 'preset'" class="ml-auto text-[10px] text-vex-text-muted">Pre-written code for all languages</span>
            <span v-else class="ml-auto text-[10px] text-vex-text-muted">AI will translate to other languages</span>
          </div>
          <textarea
            v-if="activeTab === 'custom'"
            v-model="customCode"
            class="w-full h-48 p-4 bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
            spellcheck="false"
            placeholder="Write your Vex code here..."
            @keydown.ctrl.enter="runBenchmark"
            @keydown.meta.enter="runBenchmark"
          ></textarea>
          <pre v-else class="p-4 text-sm text-white font-mono whitespace-pre-wrap max-h-48 overflow-auto">{{ benchmarks[activeExample].vex }}</pre>
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
          <p class="text-center text-sm text-vex-text-muted mt-4">
            {{ activeTab === 'preset' ? 'Compiling &amp; running all languages in parallel...' : 'AI translating &amp; running all languages in parallel...' }}
          </p>
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
              <span v-if="customDisclaimer && activeTab === 'custom'" class="ml-auto text-[10px] text-vex-text-muted italic">{{ customDisclaimer }}</span>
              <span v-if="activeTab === 'preset'" class="ml-auto text-[10px] text-vex-text-muted">Hand-written code · No AI translation</span>
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
                <div class="flex items-center gap-2 w-28">
                  <span class="text-lg">{{ LANG_META[r.lang]?.icon }}</span>
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-white">{{ LANG_META[r.lang]?.label }}</span>
                    <span v-if="langVersions[r.lang]" class="text-[9px] text-vex-text-muted leading-tight">{{ langVersions[r.lang] }}</span>
                  </div>
                </div>

                <!-- Bar + Metrics -->
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
                    <span>👤 User: {{ r.user_time_ms != null ? r.user_time_ms.toFixed(2) : '0.00' }}ms</span>
                    <span>⚙️ Sys: {{ r.sys_time_ms != null ? r.sys_time_ms.toFixed(2) : '0.00' }}ms</span>
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

          <!-- Code Tabs -->
          <div class="rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden">
            <div class="px-4 py-3 border-b border-vex-border bg-vex-surface/50 flex items-center gap-2">
              <Code class="w-4 h-4 text-vex-primary" />
              <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">
                {{ activeTab === 'preset' ? 'Source Code' : 'AI-Generated Code' }}
              </span>
            </div>
            <div class="p-2">
              <details v-for="r in sortedResults.filter(x => x.code && x.lang !== 'vex')" :key="r.lang" class="mb-2">
                <summary class="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-white/5 text-sm text-vex-text-muted">
                  <span class="text-lg">{{ LANG_META[r.lang]?.icon }}</span>
                  <span class="font-medium text-white">{{ LANG_META[r.lang]?.label }}</span>
                  <span v-if="r.stdout" class="ml-2 text-[10px] text-vex-text-muted/70">stdout: {{ r.stdout.trim().substring(0, 40) }}</span>
                  <span class="ml-auto text-[10px] text-vex-text-muted">click to expand</span>
                </summary>
                <pre class="mx-3 mb-2 p-4 rounded-xl bg-black/30 text-[11px] text-vex-text overflow-auto font-mono whitespace-pre-wrap max-h-64">{{ r.code }}</pre>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
