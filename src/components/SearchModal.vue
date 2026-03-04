<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase/client'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const router = useRouter()
const query = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const activeIndex = ref(0)

// --- Static docs index ---
interface DocEntry { title: string; path: string; section: string }
const docsIndex: DocEntry[] = [
  // Getting Started
  { title: 'Introduction', path: '/docs/guide/introduction', section: 'Guide' },
  { title: 'Installation', path: '/docs/guide/installation', section: 'Guide' },
  // Basics
  { title: 'Variables', path: '/docs/guide/basics/variables', section: 'Basics' },
  { title: 'Functions', path: '/docs/guide/basics/functions', section: 'Basics' },
  { title: 'Control Flow', path: '/docs/guide/basics/control-flow', section: 'Basics' },
  { title: 'Syntax', path: '/docs/guide/basics/syntax', section: 'Basics' },
  // Types
  { title: 'Primitives', path: '/docs/guide/types/primitives', section: 'Types' },
  { title: 'Structs', path: '/docs/guide/types/structs', section: 'Types' },
  { title: 'Enums', path: '/docs/guide/types/enums', section: 'Types' },
  { title: 'Generics', path: '/docs/guide/types/generics', section: 'Types' },
  { title: 'Contracts', path: '/docs/guide/types/contracts', section: 'Types' },
  { title: 'Pattern Matching', path: '/docs/guide/types/pattern-matching', section: 'Types' },
  { title: 'Strings', path: '/docs/guide/types/strings', section: 'Types' },
  { title: 'Vec', path: '/docs/guide/types/vec', section: 'Types' },
  { title: 'Map & Set', path: '/docs/guide/types/map-set', section: 'Types' },
  { title: 'Type Aliases', path: '/docs/guide/types/aliases', section: 'Types' },
  // Memory
  { title: 'Ownership', path: '/docs/guide/memory/ownership', section: 'Memory' },
  { title: 'Borrowing', path: '/docs/guide/memory/borrowing', section: 'Memory' },
  { title: 'Lifetimes', path: '/docs/guide/memory/lifetimes', section: 'Memory' },
  { title: 'Box', path: '/docs/guide/memory/box', section: 'Memory' },
  { title: 'Ptr<T>', path: '/docs/guide/memory/ptr-t', section: 'Memory' },
  { title: 'Span<T>', path: '/docs/guide/memory/span-t', section: 'Memory' },
  { title: 'RawBuf', path: '/docs/guide/memory/rawbuf', section: 'Memory' },
  { title: 'Memory Safety', path: '/docs/guide/memory/safety', section: 'Memory' },
  { title: 'VUMM', path: '/docs/guide/memory/vumm', section: 'Memory' },
  // Concurrency
  { title: 'Concurrency Overview', path: '/docs/guide/concurrency/overview', section: 'Concurrency' },
  { title: 'Async', path: '/docs/guide/concurrency/async', section: 'Concurrency' },
  { title: 'Channels', path: '/docs/guide/concurrency/channels', section: 'Concurrency' },
  // SIMD
  { title: 'SIMD', path: '/docs/guide/simd/', section: 'SIMD' },
  { title: 'Tensor & Mask', path: '/docs/guide/simd/tensor-mask', section: 'SIMD' },
  { title: 'SIR Pipeline', path: '/docs/guide/simd/sir-pipeline', section: 'SIMD' },
  // Advanced
  { title: 'Methods', path: '/docs/guide/advanced/methods', section: 'Advanced' },
  { title: 'Operators', path: '/docs/guide/advanced/operators', section: 'Advanced' },
  { title: 'Pointers', path: '/docs/guide/advanced/pointers', section: 'Advanced' },
  { title: 'Builtins', path: '/docs/guide/advanced/builtins', section: 'Advanced' },
  { title: 'Comptime', path: '/docs/guide/advanced/comptime', section: 'Advanced' },
  { title: 'Autograd', path: '/docs/guide/advanced/autograd', section: 'Advanced' },
  { title: 'Unsafe', path: '/docs/guide/advanced/unsafe', section: 'Advanced' },
  // Other
  { title: 'Modules', path: '/docs/guide/modules', section: 'Guide' },
  { title: 'Error Handling', path: '/docs/guide/error-handling', section: 'Guide' },
  { title: 'FFI', path: '/docs/guide/ffi', section: 'Guide' },
  { title: 'Standard Library', path: '/docs/guide/stdlib', section: 'Guide' },
  { title: 'GPU Programming', path: '/docs/guide/gpu/', section: 'Guide' },
  { title: 'Math', path: '/docs/guide/math', section: 'Guide' },
  { title: 'Crypto', path: '/docs/guide/crypto', section: 'Guide' },
  { title: 'Bit Operations', path: '/docs/guide/bit', section: 'Guide' },
  { title: 'Freestanding', path: '/docs/guide/freestanding', section: 'Guide' },
  { title: 'Testing', path: '/docs/guide/tooling/testing', section: 'Tooling' },
  { title: 'Fusion Graph', path: '/docs/guide/fusion/graph', section: 'Guide' },
  // References
  { title: 'CLI Reference', path: '/docs/references/vex-cli-reference', section: 'Reference' },
  { title: 'Test Reference', path: '/docs/references/vex-test-reference', section: 'Reference' },
  { title: 'Package Manager', path: '/docs/references/vex-pm-reference', section: 'Reference' },
  { title: 'Doc Reference', path: '/docs/references/vex-doc-reference', section: 'Reference' },
  { title: 'Native FFI Reference', path: '/docs/references/vex-pm-native-ffi', section: 'Reference' },
  // Architecture
  { title: 'Architecture', path: '/docs/architecture/', section: 'Architecture' },
]

// --- Dynamic results from Supabase ---
interface SearchResult { title: string; href: string; category: 'doc' | 'package' | 'blog' | 'project'; subtitle?: string }

const loading = ref(false)
const blogResults = ref<SearchResult[]>([])
const packageResults = ref<SearchResult[]>([])
const projectResults = ref<SearchResult[]>([])

const docResults = computed<SearchResult[]>(() => {
  if (!query.value.trim()) return []
  const q = query.value.toLowerCase()
  return docsIndex
    .filter(d => d.title.toLowerCase().includes(q) || d.section.toLowerCase().includes(q) || d.path.toLowerCase().includes(q))
    .slice(0, 8)
    .map(d => ({ title: d.title, href: d.path, category: 'doc' as const, subtitle: d.section }))
})

const allResults = computed<SearchResult[]>(() => [
  ...docResults.value,
  ...packageResults.value,
  ...projectResults.value,
  ...blogResults.value,
])

// Debounced Supabase search
let searchTimer: ReturnType<typeof setTimeout> | null = null
watch(query, (val) => {
  activeIndex.value = 0
  if (searchTimer) clearTimeout(searchTimer)
  if (!val.trim()) {
    blogResults.value = []
    packageResults.value = []
    projectResults.value = []
    loading.value = false
    return
  }
  loading.value = true
  searchTimer = setTimeout(() => searchRemote(val.trim()), 250)
})

async function searchRemote(q: string) {
  const pattern = `%${q}%`
  const [pkgRes, postRes, projRes] = await Promise.all([
    supabase.from('packages').select('name, description').ilike('name', pattern).limit(5),
    supabase.from('posts').select('title, slug, status').ilike('title', pattern).eq('status', 'published').limit(5),
    supabase.from('projects').select('name, slug, tagline, status').ilike('name', pattern).neq('status', 'archived').limit(5),
  ])

  packageResults.value = (pkgRes.data ?? []).map(p => ({
    title: p.name,
    href: `/packages/${p.name}`,
    category: 'package' as const,
    subtitle: p.description?.slice(0, 60) || undefined,
  }))

  blogResults.value = (postRes.data ?? []).map(p => ({
    title: p.title,
    href: `/blog/${p.slug}`,
    category: 'blog' as const,
  }))

  projectResults.value = (projRes.data ?? []).map(p => ({
    title: p.name,
    href: `/projects/${p.slug}`,
    category: 'project' as const,
    subtitle: p.tagline?.slice(0, 60) || undefined,
  }))

  loading.value = false
}

// --- Navigation ---
function go(result: SearchResult) {
  if (result.category === 'doc') {
    // Docs are a separate VitePress app — full page nav
    window.location.href = result.href
  } else {
    router.push(result.href)
  }
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, allResults.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  } else if (e.key === 'Enter' && allResults.value[activeIndex.value]) {
    e.preventDefault()
    go(allResults.value[activeIndex.value])
  }
}

// --- Focus on open ---
watch(() => props.open, async (val) => {
  if (val) {
    query.value = ''
    blogResults.value = []
    packageResults.value = []
    projectResults.value = []
    activeIndex.value = 0
    await nextTick()
    inputEl.value?.focus()
  }
})

// Global Cmd+K
function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    if (props.open) emit('close')
    else emit('close') // parent toggles
  }
}
onMounted(() => document.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => document.removeEventListener('keydown', onGlobalKeydown))

const categoryLabel: Record<string, string> = { doc: 'Docs', package: 'Packages', blog: 'Blog', project: 'Projects' }
const categoryIcon: Record<string, string> = { doc: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', package: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z', blog: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2', project: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' }
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4" @click.self="emit('close')">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="emit('close')" />

        <!-- Modal -->
        <div class="relative w-full max-w-lg bg-vex-bg border border-vex-border rounded-xl shadow-2xl overflow-hidden" @keydown="onKeydown">
          <!-- Input -->
          <div class="flex items-center gap-3 px-4 border-b border-vex-border">
            <svg class="w-4 h-4 text-vex-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              ref="inputEl"
              v-model="query"
              type="text"
              placeholder="Search docs, packages, projects, blog..."
              class="flex-1 py-3 bg-transparent text-sm text-white placeholder-vex-text-muted focus:outline-none"
            />
            <kbd class="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-vex-border text-[10px] text-vex-text-muted font-mono">ESC</kbd>
          </div>

          <!-- Results -->
          <div class="max-h-[50vh] overflow-y-auto">
            <!-- Empty state -->
            <div v-if="!query.trim()" class="px-4 py-8 text-center">
              <p class="text-sm text-vex-text-muted">Type to search across documentation, packages, projects, and blog posts.</p>
            </div>

            <!-- Loading -->
            <div v-else-if="loading && !allResults.length" class="px-4 py-8 text-center">
              <div class="w-5 h-5 border-2 border-vex-border border-t-vex-primary rounded-full animate-spin mx-auto"></div>
            </div>

            <!-- No results -->
            <div v-else-if="query.trim() && !allResults.length && !loading" class="px-4 py-8 text-center">
              <p class="text-sm text-vex-text-muted">No results for "<span class="text-white">{{ query }}</span>"</p>
            </div>

            <!-- Result list -->
            <div v-else class="py-2">
              <div v-for="(result, i) in allResults" :key="result.href">
                <button
                  type="button"
                  class="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors cursor-pointer"
                  :class="i === activeIndex ? 'bg-vex-surface-light text-white' : 'text-vex-text-muted hover:bg-vex-surface-light/50 hover:text-white'"
                  @click="go(result)"
                  @mouseenter="activeIndex = i"
                >
                  <svg class="w-4 h-4 flex-shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="categoryIcon[result.category]" /></svg>
                  <div class="flex-1 min-w-0">
                    <div class="truncate" :class="i === activeIndex ? 'text-white' : 'text-vex-text'">{{ result.title }}</div>
                    <div v-if="result.subtitle" class="text-xs text-vex-text-muted truncate mt-0.5">{{ result.subtitle }}</div>
                  </div>
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-vex-surface text-vex-text-muted flex-shrink-0">{{ categoryLabel[result.category] }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between px-4 py-2 border-t border-vex-border text-[11px] text-vex-text-muted">
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-1"><kbd class="px-1 py-0.5 rounded border border-vex-border font-mono text-[10px]">&uarr;&darr;</kbd> navigate</span>
              <span class="inline-flex items-center gap-1"><kbd class="px-1 py-0.5 rounded border border-vex-border font-mono text-[10px]">&crarr;</kbd> select</span>
            </div>
            <span class="inline-flex items-center gap-1"><kbd class="px-1 py-0.5 rounded border border-vex-border font-mono text-[10px]">esc</kbd> close</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.15s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
