<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ChevronLeft, ChevronRight, Play, BookOpen, RotateCcw,
  CheckCircle2, Lightbulb, Zap, Code, Terminal, Layers,
  GitBranch, Box, Shield, Database, AlertTriangle, Cpu,
  Map as MapIcon
} from 'lucide-vue-next'
import { tourLessons, tourSections, type TourLesson } from '../data/tourLessons'
import { runCode as apiRunCode } from '../api/vex'

const route = useRoute()
const router = useRouter()

// ─── State ──────────────────────────────────────────────
const currentIndex = ref(0)
const output = ref('')
const isRunning = ref(false)
const showChallenge = ref(false)
const challengeCode = ref('')
const challengeOutput = ref('')
const challengePassed = ref(false)
const isRunningChallenge = ref(false)
const completedLessons = ref<Set<string>>(new Set())
const sidebarOpen = ref(true)
const editedCode = ref('')

// ─── Computed ───────────────────────────────────────────
const lesson = computed(() => tourLessons[currentIndex.value])
const isFirst = computed(() => currentIndex.value === 0)
const isLast = computed(() => currentIndex.value === tourLessons.length - 1)
const progress = computed(() => Math.round(((currentIndex.value + 1) / tourLessons.length) * 100))

const sectionIcons: Record<string, any> = {
  'book': BookOpen,
  'layers': Layers,
  'git-branch': GitBranch,
  'code': Code,
  'box': Box,
  'shield': Shield,
  'database': Database,
  'alert-triangle': AlertTriangle,
  'cpu': Cpu,
  'zap': Zap,
}

const groupedLessons = computed(() => {
  return tourSections.map(section => ({
    ...section,
    iconComponent: sectionIcons[section.icon] || BookOpen,
    lessons: tourLessons
      .map((l, i) => ({ ...l, index: i }))
      .filter(l => l.section === section.id),
  }))
})

// ─── Navigation ─────────────────────────────────────────
function goTo(index: number) {
  if (index >= 0 && index < tourLessons.length) {
    currentIndex.value = index
    router.replace({ query: { step: tourLessons[index].id } })
  }
}

function next() {
  completedLessons.value.add(lesson.value.id)
  saveProgress()
  goTo(currentIndex.value + 1)
}

function prev() {
  goTo(currentIndex.value - 1)
}

// ─── Code execution ─────────────────────────────────────
async function runExample() {
  isRunning.value = true
  output.value = 'Running...'
  try {
    const result = await apiRunCode(editedCode.value, 'O2')
    const lines = result.stdout.split('\n')
    const filtered = lines.filter(l =>
      !l.includes('Compile time:') && !l.includes('Running (JIT)') && !l.includes('Run time:')
    ).join('\n').trim()
    if (result.exit_code !== 0 && !filtered) {
      const stderr = (result.stderr || '').split('\n').filter(l => {
        const t = l.trim()
        if (!t) return false
        if (t.startsWith('Codegen:') || t.startsWith('Compiling') || t.startsWith('Linking')) return false
        return true
      }).join('\n')
      output.value = stderr || '(compilation error)'
    } else {
      output.value = filtered || '(no output)'
    }
  } catch (err: any) {
    output.value = `Error: ${err.message}`
  } finally {
    isRunning.value = false
  }
}

async function runChallengeCode() {
  isRunningChallenge.value = true
  challengeOutput.value = 'Running...'
  challengePassed.value = false
  try {
    const result = await apiRunCode(challengeCode.value, 'O2')
    const lines = result.stdout.split('\n')
    const filtered = lines.filter(l =>
      !l.includes('Compile time:') && !l.includes('Running (JIT)') && !l.includes('Run time:')
    ).join('\n').trim()
    challengeOutput.value = filtered || result.stderr || '(no output)'
    if (lesson.value.challenge?.validate && filtered.includes(lesson.value.challenge.validate)) {
      challengePassed.value = true
    }
  } catch (err: any) {
    challengeOutput.value = `Error: ${err.message}`
  } finally {
    isRunningChallenge.value = false
  }
}

function resetCode() {
  editedCode.value = lesson.value.code
  output.value = ''
}

function resetChallenge() {
  if (lesson.value.challenge) {
    challengeCode.value = lesson.value.challenge.initialCode
    challengeOutput.value = ''
    challengePassed.value = false
  }
}

// ─── Progress persistence ───────────────────────────────
function saveProgress() {
  try {
    localStorage.setItem('vex-tour-progress', JSON.stringify([...completedLessons.value]))
  } catch { /* ignore */ }
}

function loadProgress() {
  try {
    const saved = localStorage.getItem('vex-tour-progress')
    if (saved) {
      completedLessons.value = new Set(JSON.parse(saved))
    }
  } catch { /* ignore */ }
}

// ─── Keyboard shortcuts ────────────────────────────────
function onKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault()
    if (showChallenge.value) runChallengeCode()
    else runExample()
  }
  if (e.altKey && e.key === 'ArrowRight' && !isLast.value) {
    e.preventDefault()
    next()
  }
  if (e.altKey && e.key === 'ArrowLeft' && !isFirst.value) {
    e.preventDefault()
    prev()
  }
}

// ─── Markdown rendering (simple) ────────────────────────
function renderMarkdown(text: string): string {
  return text
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-black/30 rounded-lg p-4 my-3 overflow-x-auto text-sm font-mono text-vex-primary-light"><code>$2</code></pre>')
    // Tables
    .replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/g, (_match, header: string, body: string) => {
      const heads = header.split('|').map((h: string) => h.trim()).filter(Boolean)
      const rows = body.trim().split('\n').map((row: string) =>
        row.split('|').map((c: string) => c.trim()).filter(Boolean)
      )
      return `<div class="overflow-x-auto my-3"><table class="text-sm w-full"><thead><tr>${heads.map((h: string) => `<th class="text-left px-3 py-1.5 text-vex-text-muted border-b border-vex-border">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r: string[]) => `<tr>${r.map((c: string) => `<td class="px-3 py-1.5 border-b border-vex-border/50">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-vex-primary-light text-xs font-mono">$1</code>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-vex-primary hover:text-vex-primary-light underline">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-3">')
    // List items
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-4 mb-2">$2</h2>')
    // Wrap in paragraph
    .replace(/^(?!<)/, '<p class="mb-3">')
}

// ─── Lifecycle ──────────────────────────────────────────
watch(currentIndex, () => {
  editedCode.value = lesson.value.code
  output.value = ''
  showChallenge.value = false
  challengeOutput.value = ''
  challengePassed.value = false
  if (lesson.value.challenge) {
    challengeCode.value = lesson.value.challenge.initialCode
  }
}, { immediate: true })

onMounted(() => {
  loadProgress()
  document.addEventListener('keydown', onKeyDown)

  // Restore from URL
  const step = route.query.step as string
  if (step) {
    const idx = tourLessons.findIndex(l => l.id === step)
    if (idx >= 0) currentIndex.value = idx
  }
})
</script>

<template>
  <div class="flex h-[calc(100vh-57px)] overflow-hidden">
    <!-- Sidebar -->
    <aside
      :class="[
        'flex-shrink-0 border-r border-vex-border bg-vex-bg overflow-y-auto transition-all duration-300',
        sidebarOpen ? 'w-72' : 'w-0 border-r-0'
      ]"
    >
      <div class="p-4 min-w-[288px]">
        <!-- Progress bar -->
        <div class="mb-5">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Progress</span>
            <span class="text-xs text-vex-primary font-mono">{{ progress }}%</span>
          </div>
          <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-vex-primary to-vex-accent rounded-full transition-all duration-500"
              :style="{ width: progress + '%' }"
            />
          </div>
        </div>

        <!-- Section nav -->
        <nav>
          <div v-for="group in groupedLessons" :key="group.id" class="mb-4">
            <div class="flex items-center gap-2 px-2 mb-1.5">
              <component :is="group.iconComponent" class="w-3.5 h-3.5 text-vex-text-muted" />
              <span class="text-[11px] font-bold text-vex-text-muted uppercase tracking-wider">{{ group.title }}</span>
            </div>
            <button
              v-for="item in group.lessons"
              :key="item.id"
              @click="goTo(item.index)"
              :class="[
                'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left group',
                item.index === currentIndex
                  ? 'bg-vex-primary/10 text-vex-primary-light font-medium'
                  : 'text-vex-text-muted hover:bg-white/5 hover:text-white'
              ]"
            >
              <CheckCircle2
                v-if="completedLessons.has(item.id)"
                class="w-3.5 h-3.5 text-vex-success flex-shrink-0"
              />
              <div
                v-else
                :class="[
                  'w-3.5 h-3.5 rounded-full border flex-shrink-0',
                  item.index === currentIndex ? 'border-vex-primary bg-vex-primary/20' : 'border-vex-border'
                ]"
              />
              <span class="truncate">{{ item.title }}</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top bar -->
      <div class="flex items-center justify-between px-6 py-3 border-b border-vex-border bg-vex-bg/50 backdrop-blur-sm">
        <div class="flex items-center gap-3">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="p-1.5 rounded-lg text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            :title="sidebarOpen ? 'Hide sidebar' : 'Show sidebar'"
          >
            <MapIcon class="w-4 h-4" />
          </button>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-vex-text-muted font-mono">{{ currentIndex + 1 }}/{{ tourLessons.length }}</span>
              <h2 class="text-base font-bold text-white">{{ lesson.title }}</h2>
            </div>
            <p class="text-xs text-vex-text-muted">{{ lesson.description }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            :disabled="isFirst"
            @click="prev"
            class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft class="w-4 h-4" />
            <span class="hidden sm:inline">Prev</span>
          </button>
          <button
            :disabled="isLast"
            @click="next"
            class="flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm font-medium bg-vex-primary hover:bg-vex-primary-light text-vex-bg transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <span class="hidden sm:inline">Next</span>
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Content area -->
      <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0 overflow-hidden">
        <!-- Left: Explanation -->
        <div class="border-r border-vex-border overflow-y-auto">
          <div class="p-6 lg:p-8 max-w-2xl">
            <div class="prose-vex text-vex-text text-sm leading-relaxed" v-html="renderMarkdown(lesson.explanation)" />

            <!-- Challenge section -->
            <div v-if="lesson.challenge" class="mt-8">
              <button
                @click="showChallenge = !showChallenge"
                class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-vex-accent/30 bg-vex-accent/5 text-vex-accent hover:bg-vex-accent/10 transition-all cursor-pointer w-full text-left"
              >
                <Lightbulb class="w-4 h-4" />
                <span class="text-sm font-medium">Try it yourself!</span>
                <ChevronRight :class="['w-4 h-4 ml-auto transition-transform', showChallenge ? 'rotate-90' : '']" />
              </button>

              <div v-if="showChallenge" class="mt-4 rounded-xl border border-vex-border bg-vex-bg-card overflow-hidden">
                <div class="px-4 py-3 border-b border-vex-border bg-vex-surface/50">
                  <p class="text-sm text-vex-text">{{ lesson.challenge.prompt }}</p>
                </div>
                <textarea
                  v-model="challengeCode"
                  class="w-full p-4 bg-transparent text-white font-mono text-sm resize-none focus:outline-none min-h-[160px]"
                  spellcheck="false"
                  @keydown.ctrl.enter="runChallengeCode"
                  @keydown.meta.enter="runChallengeCode"
                />
                <div class="flex items-center gap-2 px-4 py-2 border-t border-vex-border">
                  <button
                    @click="runChallengeCode"
                    :disabled="isRunningChallenge"
                    class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-vex-accent hover:bg-vex-accent/80 text-vex-bg text-sm font-bold transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Play v-if="!isRunningChallenge" class="w-3.5 h-3.5" />
                    <div v-else class="w-3.5 h-3.5 border-2 border-vex-bg border-t-transparent rounded-full animate-spin" />
                    Check
                  </button>
                  <button
                    @click="resetChallenge"
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-vex-text-muted hover:text-white hover:bg-white/5 text-sm transition-colors cursor-pointer"
                  >
                    <RotateCcw class="w-3.5 h-3.5" />
                    Reset
                  </button>
                  <div v-if="challengePassed" class="ml-auto flex items-center gap-1.5 text-vex-success text-sm font-medium">
                    <CheckCircle2 class="w-4 h-4" />
                    Correct!
                  </div>
                </div>
                <div v-if="challengeOutput" class="px-4 py-3 border-t border-vex-border bg-black/30">
                  <pre class="text-sm font-mono whitespace-pre-wrap" :class="challengePassed ? 'text-vex-success' : 'text-vex-text'">{{ challengeOutput }}</pre>
                </div>
              </div>
            </div>

            <!-- Keyboard shortcuts hint -->
            <div class="mt-8 flex flex-wrap gap-4 text-[10px] text-vex-text-muted">
              <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 rounded border border-vex-border font-mono">⌘↵</kbd> Run</span>
              <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 rounded border border-vex-border font-mono">⌥→</kbd> Next</span>
              <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 rounded border border-vex-border font-mono">⌥←</kbd> Prev</span>
            </div>
          </div>
        </div>

        <!-- Right: Editor + Output -->
        <div class="flex flex-col min-h-0">
          <!-- Editor -->
          <div class="flex-1 flex flex-col min-h-0 border-b border-vex-border">
            <div class="flex items-center justify-between px-4 py-2 border-b border-vex-border bg-vex-surface/50">
              <div class="flex items-center gap-2">
                <Code class="w-4 h-4 text-vex-primary" />
                <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Editor</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button
                  @click="resetCode"
                  class="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Reset code"
                >
                  <RotateCcw class="w-3 h-3" />
                  Reset
                </button>
                <button
                  @click="runExample"
                  :disabled="isRunning"
                  class="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-vex-primary hover:bg-vex-primary-light text-vex-bg text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Play v-if="!isRunning" class="w-3.5 h-3.5" />
                  <div v-else class="w-3.5 h-3.5 border-2 border-vex-bg border-t-transparent rounded-full animate-spin" />
                  {{ isRunning ? 'Running...' : 'Run ⌘↵' }}
                </button>
              </div>
            </div>
            <textarea
              v-model="editedCode"
              class="flex-1 p-4 bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
              spellcheck="false"
              @keydown.ctrl.enter="runExample"
              @keydown.meta.enter="runExample"
            />
          </div>

          <!-- Output -->
          <div class="h-48 flex flex-col bg-[#050508]">
            <div class="flex items-center gap-2 px-4 py-2 border-b border-vex-border bg-vex-surface/50">
              <Terminal class="w-4 h-4 text-vex-accent" />
              <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Output</span>
            </div>
            <div class="flex-1 p-4 overflow-auto">
              <pre v-if="output" class="text-sm font-mono whitespace-pre-wrap text-vex-text">{{ output }}</pre>
              <div v-else class="h-full flex items-center justify-center text-vex-text-muted opacity-40">
                <div class="text-center">
                  <Terminal class="w-8 h-8 mx-auto mb-2" />
                  <p class="text-xs">Click Run or press ⌘↵</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom nav (mobile-friendly) -->
      <div class="flex items-center justify-between px-6 py-3 border-t border-vex-border bg-vex-bg lg:hidden">
        <button
          :disabled="isFirst"
          @click="prev"
          class="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-vex-text-muted disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft class="w-4 h-4" /> Previous
        </button>
        <span class="text-xs text-vex-text-muted font-mono">{{ currentIndex + 1 }} / {{ tourLessons.length }}</span>
        <button
          :disabled="isLast"
          @click="next"
          class="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-vex-primary text-vex-bg cursor-pointer disabled:opacity-30"
        >
          Next <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  tab-size: 4;
}

/* Hide scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 4px;
}
aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
</style>
