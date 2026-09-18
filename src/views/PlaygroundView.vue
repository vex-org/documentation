<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  SquareTerminal, Terminal, FileCode, Maximize2, Minimize2, Trash2, Plus, X,
  BookOpen, ExternalLink, Lightbulb, CheckCircle2, ChevronUp, ChevronDown,
  ChevronLeft, ChevronRight, Play, Share2, RotateCcw, Loader2, Layers,
  GitBranch, Box, Shield, Database, AlertTriangle, Cpu, Zap, Code,
  PanelLeftOpen,
} from 'lucide-vue-next'
import { tourLessons, tourSections } from '../data/tourLessons'
import { runCode as apiRunCode, emitIR, healthCheck } from '../api/vex'
import MonacoVexEditor from '../components/MonacoVexEditor.vue'

const route = useRoute()
const router = useRouter()

// ─── Static data ─────────────────────────────────────────
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

const optLevels = ['O0', 'O1', 'O2', 'O3'].map((v) => ({ label: `-${v}`, value: v }))

const SCRATCH_TEMPLATE = `fn main(): i32 {
    println("Hello from Vex!")
    return 0
}`

// ─── State ───────────────────────────────────────────────
const currentIndex = ref(0)
const editorCode = ref(tourLessons[0].code)
const output = ref('')
const errorText = ref('')
const isRunning = ref(false)
const optLevel = ref('O2')

const activeOutputTab = ref<'output' | 'ir' | 'assembly' | 'analysis'>('output')
const irOutput = ref('')
const irLoading = ref(false)

const sidebarOpen = ref(true)
const expandedSections = ref<Set<string>>(new Set(['basics']))
const lessonPanelOpen = ref(false)

const challengeMode = ref(false)
const challengePassed = ref(false)
const scratchMode = ref(false)

const shareCopied = ref(false)
const runMenuOpen = ref(false)
const versionMenuOpen = ref(false)
const version = ref('Vex (latest)')
const editorFullscreen = ref(false)

const wasmConnected = ref(false)

// ─── Computed ────────────────────────────────────────────
const lesson = computed(() => tourLessons[currentIndex.value])
const total = tourLessons.length
const isFirst = computed(() => currentIndex.value === 0)
const isLast = computed(() => currentIndex.value === total - 1)
const section = computed(() => tourSections.find((s) => s.id === lesson.value.section))
const fileName = computed(() => (scratchMode.value ? 'scratch.vx' : 'main.vx'))

const groupedLessons = computed(() =>
  tourSections.map((s) => ({
    ...s,
    iconComponent: sectionIcons[s.icon] || BookOpen,
    lessons: tourLessons
      .map((l, i) => ({ ...l, index: i }))
      .filter((l) => l.section === s.id),
  })),
)

const explanationHtml = computed(() =>
  scratchMode.value
    ? '<p class="mb-3">Switch to a lesson from the learning path when you want guided explanations and challenges.</p>'
    : renderMarkdown(lesson.value.explanation),
)

// ─── Navigation ──────────────────────────────────────────
function goTo(index: number) {
  if (index < 0 || index >= total) return
  currentIndex.value = index
  scratchMode.value = false
  expandedSections.value.add(tourLessons[index].section)
  const id = tourLessons[index].id
  if (route.query.lesson !== id) {
    router.replace({ query: { lesson: id } })
  }
  requestAnimationFrame(() => {
    document.getElementById(`lesson-item-${id}`)?.scrollIntoView({ block: 'nearest' })
  })
}

function next() {
  goTo(currentIndex.value + 1)
}

function prev() {
  goTo(currentIndex.value - 1)
}

function toggleSection(id: string) {
  if (expandedSections.value.has(id)) expandedSections.value.delete(id)
  else expandedSections.value.add(id)
}

function startScratch() {
  scratchMode.value = true
  editorCode.value = SCRATCH_TEMPLATE
  output.value = ''
  errorText.value = ''
  challengeMode.value = false
  challengePassed.value = false
}

function resetCode() {
  editorCode.value = scratchMode.value ? SCRATCH_TEMPLATE : lesson.value.code
  output.value = ''
  errorText.value = ''
  challengeMode.value = false
  challengePassed.value = false
}

// ─── Code execution ──────────────────────────────────────
function cleanStdout(stdout: string) {
  return stdout
    .split('\n')
    .filter(
      (l) =>
        !l.includes('Compile time:') &&
        !l.includes('Running (JIT)') &&
        !l.includes('Run time:'),
    )
    .join('\n')
    .trim()
}

function cleanStderr(stderr: string) {
  return stderr
    .split('\n')
    .filter((l) => {
      const t = l.trim()
      if (!t) return false
      if (t.startsWith('Codegen:') || t.startsWith('Compiling') || t.startsWith('Linking')) return false
      return true
    })
    .join('\n')
    .trim()
}

async function runCode() {
  if (isRunning.value) return
  isRunning.value = true
  runMenuOpen.value = false
  activeOutputTab.value = 'output'
  output.value = ''
  errorText.value = ''
  try {
    const result = await apiRunCode(editorCode.value, optLevel.value)
    const filtered = cleanStdout(result.stdout)
    if (result.exit_code !== 0 && !filtered) {
      errorText.value = cleanStderr(result.stderr) || '(compilation error)'
    } else {
      output.value = filtered || '(no output)'
      if (challengeMode.value && lesson.value.challenge?.validate) {
        challengePassed.value = filtered.includes(lesson.value.challenge.validate)
      }
    }
  } catch (err: any) {
    errorText.value = `Error: ${err.message}`
  } finally {
    isRunning.value = false
  }
}

function runAndNext() {
  runCode()
  if (!isLast.value) setTimeout(() => next(), 120)
}

async function showIR() {
  if (irOutput.value) return
  irLoading.value = true
  try {
    const result = await emitIR(editorCode.value, optLevel.value)
    irOutput.value = result.ir
  } catch (err: any) {
    irOutput.value = `Error: ${err.message}`
  } finally {
    irLoading.value = false
  }
}

function clearOutput() {
  output.value = ''
  errorText.value = ''
  irOutput.value = ''
  challengePassed.value = false
}

function selectOutputTab(tab: typeof activeOutputTab.value) {
  activeOutputTab.value = tab
  if (tab === 'ir') showIR()
}

async function share() {
  const url = `${window.location.origin}/playground?lesson=${lesson.value.id}`
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    /* clipboard unavailable */
  }
  shareCopied.value = true
  setTimeout(() => (shareCopied.value = false), 1600)
}

// ─── Challenge ───────────────────────────────────────────
function startChallenge() {
  if (!lesson.value.challenge) return
  challengeMode.value = true
  challengePassed.value = false
  editorCode.value = lesson.value.challenge.initialCode
  output.value = ''
  errorText.value = ''
}

function exitChallenge() {
  challengeMode.value = false
  challengePassed.value = false
  resetCode()
}

// ─── Markdown (lightweight) ──────────────────────────────
function renderMarkdown(text: string): string {
  return text
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      '<pre class="bg-black/30 rounded-lg p-4 my-3 overflow-x-auto text-sm font-mono text-vex-primary-light"><code>$2</code></pre>',
    )
    .replace(
      /\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/g,
      (_m, header: string, body: string) => {
        const heads = header.split('|').map((h: string) => h.trim()).filter(Boolean)
        const rows = body
          .trim()
          .split('\n')
          .map((row: string) => row.split('|').map((c: string) => c.trim()).filter(Boolean))
        return `<div class="overflow-x-auto my-3"><table class="text-sm w-full"><thead><tr>${heads
          .map((h: string) => `<th class="text-left px-3 py-1.5 text-vex-text-muted border-b border-vex-border">${h}</th>`)
          .join('')}</tr></thead><tbody>${rows
          .map((r: string[]) => `<tr>${r.map((c: string) => `<td class="px-3 py-1.5 border-b border-vex-border/50">${c}</td>`).join('')}</tr>`)
          .join('')}</tbody></table></div>`
      },
    )
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-vex-primary-light text-xs font-mono">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-vex-primary hover:text-vex-primary-light underline">$1</a>')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-4 mb-2">$1</h2>')
    .replace(/^(?!<)/, '<p class="mb-3">')
}

// ─── Keyboard ────────────────────────────────────────────
function onKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault()
    runCode()
  }
  if (e.altKey && e.key === 'ArrowRight' && !isLast.value) {
    e.preventDefault()
    next()
  }
  if (e.altKey && e.key === 'ArrowLeft' && !isFirst.value) {
    e.preventDefault()
    prev()
  }
  if (e.key === 'Escape') {
    editorFullscreen.value = false
    runMenuOpen.value = false
    versionMenuOpen.value = false
  }
}

function closeMenus() {
  runMenuOpen.value = false
  versionMenuOpen.value = false
}

// ─── Lifecycle ───────────────────────────────────────────
watch(currentIndex, () => {
  editorCode.value = lesson.value.code
  output.value = ''
  errorText.value = ''
  irOutput.value = ''
  challengeMode.value = false
  challengePassed.value = false
  if (route.query.lesson !== lesson.value.id) {
    router.replace({ query: { lesson: lesson.value.id } })
  }
}, { immediate: false })

watch(
  () => route.query.lesson,
  (val) => {
    if (typeof val !== 'string') return
    const idx = tourLessons.findIndex((l) => l.id === val)
    if (idx >= 0 && idx !== currentIndex.value) currentIndex.value = idx
  },
)

onMounted(async () => {
  const step = route.query.lesson
  if (typeof step === 'string') {
    const idx = tourLessons.findIndex((l) => l.id === step)
    if (idx >= 0) currentIndex.value = idx
  }
  expandedSections.value.add(lesson.value.section)
  if (window.innerWidth < 1024) sidebarOpen.value = false
  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('click', closeMenus)
  wasmConnected.value = await healthCheck()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyDown)
  document.removeEventListener('click', closeMenus)
})
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-65px)] overflow-hidden">
    <div class="flex flex-1 min-h-0">
      <!-- ═══════════ Learning path sidebar ═══════════ -->
      <aside
        :class="[
          'flex-shrink-0 border-r border-vex-border bg-vex-bg overflow-y-auto transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-0 border-r-0',
        ]"
      >
        <div class="w-64 flex flex-col min-h-full p-4">
          <div class="flex items-center justify-between mb-4">
            <span class="text-[11px] font-bold text-vex-text-muted uppercase tracking-wider">Learning Path</span>
            <button
              @click="sidebarOpen = false"
              class="p-1 rounded-lg text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Collapse sidebar"
            >
              <ChevronUp class="w-3.5 h-3.5" />
            </button>
          </div>

          <nav class="space-y-1">
            <div v-for="group in groupedLessons" :key="group.id">
              <button
                @click="toggleSection(group.id)"
                :class="[
                  'w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors cursor-pointer',
                  group.id === lesson.section && !scratchMode
                    ? 'text-white'
                    : 'text-vex-text-muted hover:text-white hover:bg-white/5',
                ]"
              >
                <component :is="group.iconComponent" class="w-4 h-4 flex-shrink-0" />
                <span class="font-medium truncate">{{ group.title }}</span>
                <span class="ml-auto text-xs text-vex-text-muted/70 font-mono">{{ group.lessons.length }}</span>
                <ChevronDown
                  :class="[
                    'w-3.5 h-3.5 flex-shrink-0 transition-transform',
                    expandedSections.has(group.id) ? 'rotate-180' : '',
                  ]"
                />
              </button>

              <div v-if="expandedSections.has(group.id)" class="mt-0.5 mb-1.5 ml-[15px] border-l border-vex-border/70">
                <button
                  v-for="item in group.lessons"
                  :key="item.id"
                  :id="`lesson-item-${item.id}`"
                  @click="goTo(item.index)"
                  :class="[
                    'w-full flex items-center gap-2 pl-3 pr-2 py-1.5 text-sm text-left transition-colors cursor-pointer border-l-2 -ml-px',
                    item.index === currentIndex && !scratchMode
                      ? 'border-vex-primary bg-vex-primary/10 text-vex-primary-light font-medium'
                      : 'border-transparent text-vex-text-muted hover:text-white hover:bg-white/5',
                  ]"
                >
                  <span class="truncate">{{ item.title }}</span>
                </button>
              </div>
            </div>
          </nav>

          <!-- New to Vex? -->
          <div class="mt-6 mb-2 rounded-xl border border-vex-border bg-vex-bg-card p-3.5">
            <div class="flex items-center gap-2 mb-1.5">
              <div class="w-7 h-7 rounded-lg bg-vex-primary/10 border border-vex-primary/25 flex items-center justify-center flex-shrink-0">
                <FileCode class="w-3.5 h-3.5 text-vex-primary" />
              </div>
              <span class="text-sm font-semibold text-white">New to Vex?</span>
            </div>
            <p class="text-xs text-vex-text-muted leading-relaxed mb-2">Check out the documentation to get started.</p>
            <a
              href="/docs/guide/introduction"
              class="inline-flex items-center gap-1 text-xs font-medium text-vex-primary hover:text-vex-primary-light transition-colors"
            >
              Open Docs
              <ExternalLink class="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>

      <!-- ═══════════ Main column ═══════════ -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Page header -->
        <header class="flex items-center justify-between gap-4 px-6 py-4 border-b border-vex-border">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-vex-primary/10 border border-vex-primary/30 flex items-center justify-center flex-shrink-0">
              <SquareTerminal class="w-5 h-5 text-vex-primary" />
            </div>
            <div class="min-w-0">
              <h1 class="text-xl font-bold text-white leading-tight">Playground</h1>
              <div class="flex items-center gap-3 text-xs text-vex-text-muted">
                <span class="truncate">Experiment with Vex in your browser. Learn mode enabled.</span>
                <span class="flex items-center gap-1.5 flex-shrink-0">
                  <span :class="['w-1.5 h-1.5 rounded-full', wasmConnected ? 'bg-emerald-400' : 'bg-vex-text-muted/50']" />
                  {{ wasmConnected ? 'Connected' : 'Offline' }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              :disabled="isFirst"
              @click="prev"
              class="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-vex-border text-sm text-vex-text-muted hover:text-white hover:border-vex-border-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft class="w-4 h-4" />
              Prev
            </button>
            <button
              :disabled="isLast"
              @click="next"
              class="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-vex-primary hover:bg-vex-primary-light text-white text-sm font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </header>

        <!-- Toolbar: breadcrumb + controls -->
        <div class="flex items-center justify-between gap-4 px-6 py-2.5 border-b border-vex-border bg-vex-surface/30">
          <div class="flex items-center gap-2 min-w-0">
            <button
              v-if="!sidebarOpen"
              @click="sidebarOpen = true"
              class="p-1.5 rounded-lg text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Show learning path"
            >
              <PanelLeftOpen class="w-4 h-4" />
            </button>
            <button
              @click="lessonPanelOpen = !lessonPanelOpen"
              :class="[
                'flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer flex-shrink-0',
                lessonPanelOpen
                  ? 'border-vex-primary/40 bg-vex-primary/10 text-vex-primary-light'
                  : 'border-vex-border text-vex-text-muted hover:text-white hover:border-vex-border-light',
              ]"
              title="Lesson notes"
            >
              <BookOpen class="w-3.5 h-3.5" />
              <span class="text-xs font-medium hidden sm:inline">Lesson</span>
            </button>

            <nav class="flex items-center gap-2 text-sm min-w-0 pl-1">
              <template v-if="scratchMode">
                <span class="text-vex-text-muted">Scratch</span>
                <ChevronRight class="w-3.5 h-3.5 text-vex-text-muted/50 flex-shrink-0" />
                <span class="text-white font-medium truncate">Free coding</span>
              </template>
              <template v-else>
                <span class="text-vex-text-muted truncate">{{ section?.title }}</span>
                <ChevronRight class="w-3.5 h-3.5 text-vex-text-muted/50 flex-shrink-0" />
                <span class="text-vex-primary font-mono text-xs flex-shrink-0">{{ currentIndex + 1 }}/{{ total }}</span>
                <ChevronRight class="w-3.5 h-3.5 text-vex-text-muted/50 flex-shrink-0" />
                <span class="text-white font-medium truncate">{{ lesson.title }}</span>
              </template>
            </nav>
          </div>

          <div class="flex items-center gap-3 flex-shrink-0">
            <div class="hidden md:flex items-center gap-2">
              <span class="text-xs text-vex-text-muted">Opt level</span>
              <div class="flex items-center gap-0.5">
                <button
                  v-for="o in optLevels"
                  :key="o.value"
                  @click="optLevel = o.value"
                  :class="[
                    'px-2 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer',
                    optLevel === o.value
                      ? 'bg-vex-primary text-white font-bold'
                      : 'text-vex-text-muted hover:text-white hover:bg-white/5',
                  ]"
                >
                  {{ o.label }}
                </button>
              </div>
            </div>

            <button
              @click="share"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-vex-border text-sm text-vex-text-muted hover:text-white hover:border-vex-border-light transition-colors cursor-pointer"
            >
              <Share2 class="w-3.5 h-3.5" />
              <span class="hidden sm:inline">{{ shareCopied ? 'Copied!' : 'Share' }}</span>
            </button>

            <div class="relative">
              <div class="flex items-stretch">
                <button
                  @click="runCode"
                  :disabled="isRunning"
                  class="flex items-center gap-2 pl-4 pr-3 py-1.5 rounded-l-lg bg-vex-primary hover:bg-vex-primary-light text-white text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Loader2 v-if="isRunning" class="w-4 h-4 animate-spin" />
                  <Play v-else class="w-4 h-4" />
                  Run
                </button>
                <button
                  @click.stop="runMenuOpen = !runMenuOpen"
                  class="px-1.5 rounded-r-lg bg-vex-primary hover:bg-vex-primary-light text-white border-l border-white/20 transition-colors cursor-pointer"
                  title="Run options"
                >
                  <ChevronDown class="w-3.5 h-3.5" />
                </button>
              </div>
              <div
                v-if="runMenuOpen"
                class="absolute right-0 top-full mt-1 w-44 rounded-xl border border-vex-border bg-vex-bg-card shadow-xl shadow-black/40 py-1 z-50"
              >
                <button
                  @click.stop="runCode"
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Play class="w-3.5 h-3.5" />
                  Run
                  <kbd class="ml-auto text-[10px] px-1.5 py-0.5 rounded border border-vex-border font-mono">⌘↵</kbd>
                </button>
                <button
                  :disabled="isLast"
                  @click.stop="runAndNext"
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 cursor-pointer"
                >
                  <ChevronRight class="w-3.5 h-3.5" />
                  Run &amp; Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Lesson notes drawer -->
        <div
          v-if="lessonPanelOpen"
          class="border-b border-vex-border bg-vex-bg max-h-[36vh] overflow-y-auto px-6 py-5"
        >
          <div class="max-w-3xl">
            <div class="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 class="text-base font-bold text-white">{{ scratchMode ? 'Free coding' : lesson.title }}</h2>
                <p class="text-xs text-vex-text-muted">{{ scratchMode ? 'Write anything — nothing is graded here.' : lesson.description }}</p>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <button
                  @click="resetCode"
                  class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <RotateCcw class="w-3 h-3" />
                  Reset code
                </button>
                <button
                  @click="lessonPanelOpen = false"
                  class="p-1.5 rounded-lg text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div
              class="prose-vex text-vex-text text-sm leading-relaxed"
              v-html="explanationHtml"
            />

            <div v-if="!scratchMode && lesson.challenge" class="mt-4">
              <div class="rounded-xl border border-vex-accent/30 bg-vex-accent/5 p-4">
                <div class="flex items-center gap-2 mb-2">
                  <Lightbulb class="w-4 h-4 text-vex-accent" />
                  <span class="text-sm font-semibold text-vex-accent">Try it yourself</span>
                  <span
                    v-if="challengeMode && challengePassed"
                    class="ml-auto flex items-center gap-1.5 text-xs font-medium text-vex-success"
                  >
                    <CheckCircle2 class="w-3.5 h-3.5" />
                    Correct!
                  </span>
                </div>
                <p class="text-sm text-vex-text mb-3">{{ lesson.challenge.prompt }}</p>
                <div class="flex items-center gap-2">
                  <button
                    v-if="!challengeMode"
                    @click="startChallenge"
                    class="px-3 py-1.5 rounded-lg bg-vex-accent hover:bg-vex-accent/80 text-vex-bg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Load challenge into editor
                  </button>
                  <button
                    v-else
                    @click="exitChallenge"
                    class="px-3 py-1.5 rounded-lg border border-vex-border text-xs text-vex-text-muted hover:text-white transition-colors cursor-pointer"
                  >
                    Exit challenge
                  </button>
                  <span v-if="challengeMode" class="text-xs text-vex-text-muted">Run with ⌘↵ — the output is checked automatically.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Editor + Output -->
        <div class="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-3 p-3">
          <!-- Editor card -->
          <div
            :class="[
              'flex flex-col min-h-0 rounded-xl border border-vex-border bg-vex-bg-card overflow-hidden h-[420px] xl:h-auto',
              editorFullscreen ? 'fixed inset-3 z-40 h-auto shadow-2xl shadow-black/60' : '',
            ]"
          >
            <div class="flex items-center justify-between px-2 py-1.5 border-b border-vex-border bg-vex-surface/50 flex-shrink-0">
              <div class="flex items-center gap-1 min-w-0">
                <div class="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-lg bg-vex-bg border border-vex-border text-sm min-w-0">
                  <FileCode class="w-3.5 h-3.5 text-vex-primary flex-shrink-0" />
                  <span class="text-vex-text truncate">{{ fileName }}</span>
                  <button
                    @click="resetCode"
                    class="p-0.5 rounded text-vex-text-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Reset code"
                  >
                    <X class="w-3 h-3" />
                  </button>
                </div>
                <button
                  @click="startScratch"
                  class="p-1.5 rounded-lg text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="New scratch file"
                >
                  <Plus class="w-3.5 h-3.5" />
                </button>
              </div>

              <div class="flex items-center gap-1 flex-shrink-0">
                <div class="relative">
                  <button
                    @click.stop="versionMenuOpen = !versionMenuOpen"
                    class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-vex-border text-xs text-vex-text-muted hover:text-white transition-colors cursor-pointer"
                  >
                    {{ version }}
                    <ChevronDown class="w-3 h-3" />
                  </button>
                  <div
                    v-if="versionMenuOpen"
                    class="absolute right-0 top-full mt-1 w-36 rounded-xl border border-vex-border bg-vex-bg-card shadow-xl shadow-black/40 py-1 z-50"
                  >
                    <button
                      v-for="v in ['Vex (latest)', 'Vex 0.4.0']"
                      :key="v"
                      @click.stop="version = v; versionMenuOpen = false"
                      :class="[
                        'w-full px-3 py-1.5 text-left text-xs transition-colors cursor-pointer',
                        version === v ? 'text-vex-primary-light' : 'text-vex-text-muted hover:text-white hover:bg-white/5',
                      ]"
                    >
                      {{ v }}
                    </button>
                  </div>
                </div>
                <button
                  @click="editorFullscreen = !editorFullscreen"
                  class="p-1.5 rounded-lg text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  :title="editorFullscreen ? 'Exit fullscreen' : 'Fullscreen'"
                >
                  <Minimize2 v-if="editorFullscreen" class="w-3.5 h-3.5" />
                  <Maximize2 v-else class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <MonacoVexEditor
              v-model="editorCode"
              class="flex-1 min-h-0"
              submit-on-mod-enter
              @submit="runCode"
            />
          </div>

          <!-- Output card -->
          <div class="flex flex-col min-h-0 rounded-xl border border-vex-border bg-[#050508] overflow-hidden h-[320px] xl:h-auto">
            <div class="flex items-center justify-between border-b border-vex-border bg-vex-surface/50 flex-shrink-0 pr-2">
              <div class="flex items-center min-w-0">
                <button
                  @click="selectOutputTab('output')"
                  :class="[
                    'flex items-center gap-1.5 px-4 py-2.5 text-sm transition-colors cursor-pointer border-b-2',
                    activeOutputTab === 'output'
                      ? 'border-vex-primary text-vex-primary-light'
                      : 'border-transparent text-vex-text-muted hover:text-white',
                  ]"
                >
                  <Terminal class="w-3.5 h-3.5" />
                  Output
                </button>
                <button
                  @click="selectOutputTab('ir')"
                  :class="[
                    'px-4 py-2.5 text-sm transition-colors cursor-pointer border-b-2',
                    activeOutputTab === 'ir'
                      ? 'border-vex-primary text-vex-primary-light'
                      : 'border-transparent text-vex-text-muted hover:text-white',
                  ]"
                >
                  LLVM IR
                </button>
                <button
                  @click="selectOutputTab('assembly')"
                  :class="[
                    'px-4 py-2.5 text-sm transition-colors cursor-pointer border-b-2',
                    activeOutputTab === 'assembly'
                      ? 'border-vex-primary text-vex-primary-light'
                      : 'border-transparent text-vex-text-muted hover:text-white',
                  ]"
                >
                  Assembly
                </button>
                <button
                  @click="selectOutputTab('analysis')"
                  :class="[
                    'px-4 py-2.5 text-sm transition-colors cursor-pointer border-b-2',
                    activeOutputTab === 'analysis'
                      ? 'border-vex-primary text-vex-primary-light'
                      : 'border-transparent text-vex-text-muted hover:text-white',
                  ]"
                >
                  Analysis
                </button>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <button
                  @click="clearOutput"
                  class="px-2 py-1 rounded-lg text-xs text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Clear
                </button>
                <button
                  @click="clearOutput"
                  class="p-1 rounded-lg text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Clear output"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <!-- Output body -->
            <div class="flex-1 min-h-0 overflow-auto p-5 font-mono text-sm">
              <template v-if="activeOutputTab === 'output'">
                <div v-if="isRunning" class="flex items-center gap-2 text-vex-text-muted">
                  <Loader2 class="w-4 h-4 animate-spin" />
                  Running...
                </div>
                <template v-else>
                  <pre
                    v-if="output"
                    class="whitespace-pre-wrap text-vex-text leading-relaxed"
                  >{{ output }}</pre>
                  <pre
                    v-if="errorText"
                    class="whitespace-pre-wrap text-red-400 leading-relaxed mb-2"
                  >{{ errorText }}</pre>
                  <div class="flex items-center gap-2 text-vex-accent/80 pt-2">
                    <span class="text-xs font-bold">&gt;_</span>
                    <span v-if="!output && !errorText" class="text-vex-text-muted/50 text-xs">Press Run or ⌘↵ to execute</span>
                    <span v-else class="w-2 h-4 bg-vex-accent/50 animate-pulse" />
                  </div>
                </template>
              </template>

              <template v-else-if="activeOutputTab === 'ir'">
                <div v-if="irLoading" class="flex items-center gap-2 text-vex-text-muted">
                  <Loader2 class="w-4 h-4 animate-spin" />
                  Generating LLVM IR...
                </div>
                <pre v-else-if="irOutput" class="whitespace-pre-wrap text-vex-text/90 text-xs leading-relaxed">{{ irOutput }}</pre>
                <div v-else class="h-full flex items-center justify-center text-vex-text-muted/40 text-xs">No IR yet</div>
              </template>

              <template v-else>
                <div class="h-full flex flex-col items-center justify-center gap-2 text-vex-text-muted/40">
                  <Cpu class="w-6 h-6" />
                  <p class="text-xs">
                    {{ activeOutputTab === 'assembly' ? 'Assembly view is coming soon.' : 'Analysis view is coming soon.' }}
                  </p>
                  <button
                    @click="selectOutputTab('ir')"
                    class="text-xs text-vex-primary/80 hover:text-vex-primary transition-colors cursor-pointer"
                  >
                    View LLVM IR instead
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════ Slim status footer ═══════════ -->
    <div class="flex items-center justify-between gap-4 px-6 py-2.5 border-t border-vex-border bg-vex-bg flex-shrink-0">
      <div class="flex items-center gap-3 min-w-0">
        <span class="font-display text-sm font-bold tracking-[0.18em]">
          <span class="text-vex-primary">V</span><span class="text-vex-text">EX</span>
        </span>
        <span class="text-xs text-vex-text-muted truncate">Build faster. Run everywhere.</span>
      </div>
      <div class="flex items-center gap-5 text-xs text-vex-text-muted flex-shrink-0">
        <span class="hidden sm:flex items-center gap-1.5">
          <span :class="['w-1.5 h-1.5 rounded-full', wasmConnected ? 'bg-emerald-400' : 'bg-vex-text-muted/50']" />
          Server Execution
        </span>
        <span class="hidden md:inline">Safety First</span>
        <a href="/docs" class="flex items-center gap-1 hover:text-white transition-colors">
          Docs <ExternalLink class="w-3 h-3" />
        </a>
        <a href="https://github.com/meftunca/vex" target="_blank" rel="noopener" class="flex items-center gap-1 hover:text-white transition-colors">
          GitHub <ExternalLink class="w-3 h-3" />
        </a>
        <a href="https://discord.gg/vex" target="_blank" rel="noopener" class="hidden sm:flex items-center gap-1 hover:text-white transition-colors">
          Discord <ExternalLink class="w-3 h-3" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
aside::-webkit-scrollbar {
  width: 4px;
}
aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
</style>
