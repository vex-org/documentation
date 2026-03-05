<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { supabase } from '../supabase/client'

const SearchModal = defineAsyncComponent(() => import('./SearchModal.vue'))

const user = ref<{ id: string; email?: string } | null>(null)
const mobileOpen = ref(false)
const searchOpen = ref(false)
const openDropdown = ref<string | null>(null)
const router = useRouter()
const route = useRoute()

// Close mobile nav on route change
watch(() => route.fullPath, () => { mobileOpen.value = false; openDropdown.value = null })

function toggleDropdown(name: string) {
  openDropdown.value = openDropdown.value === name ? null : name
}

function closeDropdowns() {
  openDropdown.value = null
}

onMounted(async () => {
  const { data: { user: u } } = await supabase.auth.getUser()
  user.value = u ?? null
  document.addEventListener('keydown', onCmdK)
  document.addEventListener('click', onClickOutside)
})
onUnmounted(() => { document.removeEventListener('keydown', onCmdK); document.removeEventListener('click', onClickOutside) })

function onClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.nav-dropdown')) {
    openDropdown.value = null
  }
}

supabase.auth.onAuthStateChange((_event, session) => {
  user.value = session?.user ?? null
})

function onCmdK(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    searchOpen.value = !searchOpen.value
  }
  if (e.key === 'Escape' && searchOpen.value) {
    searchOpen.value = false
  }
}

async function logout() {
  await supabase.auth.signOut()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Skip to content -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-vex-primary focus:text-white focus:text-sm">Skip to content</a>
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-vex-border bg-vex-bg/90 backdrop-blur-lg">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 group">
          <img src="/vex-logo.svg" alt="Vex" class="w-7 h-7" />
          <span class="text-lg font-bold text-white">Vex</span>
        </RouterLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <!-- Learn dropdown -->
          <div class="relative nav-dropdown">
            <button @click="toggleDropdown('learn')" class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors cursor-pointer">
              Learn
              <svg class="w-3 h-3 transition-transform" :class="openDropdown === 'learn' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-if="openDropdown === 'learn'" class="absolute top-full left-0 mt-1 w-56 rounded-xl border border-vex-border bg-vex-bg-card shadow-xl shadow-black/40 py-1.5 z-50">
              <a href="/docs/" @click="closeDropdowns" class="flex items-center gap-3 px-4 py-2.5 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-vex-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <div><div class="font-medium text-white">Documentation</div><div class="text-xs text-vex-text-muted">Language reference & guides</div></div>
              </a>
              <RouterLink to="/tour" @click="closeDropdowns" class="flex items-center gap-3 px-4 py-2.5 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-vex-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                <div><div class="font-medium text-white">Tour of Vex</div><div class="text-xs text-vex-text-muted">Interactive step-by-step tutorial</div></div>
              </RouterLink>
              <RouterLink to="/playground" @click="closeDropdowns" class="flex items-center gap-3 px-4 py-2.5 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div><div class="font-medium text-white">Playground</div><div class="text-xs text-vex-text-muted">Try Vex in your browser</div></div>
              </RouterLink>
            </div>
          </div>

          <!-- Community dropdown -->
          <div class="relative nav-dropdown">
            <button @click="toggleDropdown('community')" class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors cursor-pointer">
              Community
              <svg class="w-3 h-3 transition-transform" :class="openDropdown === 'community' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-if="openDropdown === 'community'" class="absolute top-full left-0 mt-1 w-56 rounded-xl border border-vex-border bg-vex-bg-card shadow-xl shadow-black/40 py-1.5 z-50">
              <RouterLink to="/packages" @click="closeDropdowns" class="flex items-center gap-3 px-4 py-2.5 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                <div><div class="font-medium text-white">Packages</div><div class="text-xs text-vex-text-muted">Browse the registry</div></div>
              </RouterLink>
              <RouterLink to="/blog" @click="closeDropdowns" class="flex items-center gap-3 px-4 py-2.5 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                <div><div class="font-medium text-white">Blog</div><div class="text-xs text-vex-text-muted">Articles & updates</div></div>
              </RouterLink>
              <RouterLink to="/projects" @click="closeDropdowns" class="flex items-center gap-3 px-4 py-2.5 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                <div><div class="font-medium text-white">Projects</div><div class="text-xs text-vex-text-muted">Community showcase</div></div>
              </RouterLink>
            </div>
          </div>

          <!-- Tools dropdown -->
          <div class="relative nav-dropdown">
            <button @click="toggleDropdown('tools')" class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors cursor-pointer">
              Tools
              <svg class="w-3 h-3 transition-transform" :class="openDropdown === 'tools' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-if="openDropdown === 'tools'" class="absolute top-full left-0 mt-1 w-56 rounded-xl border border-vex-border bg-vex-bg-card shadow-xl shadow-black/40 py-1.5 z-50">
              <RouterLink to="/ai" @click="closeDropdowns" class="flex items-center gap-3 px-4 py-2.5 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-vex-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
                <div><div class="font-medium text-white">AI Assistant</div><div class="text-xs text-vex-text-muted">Ask, explain, translate code</div></div>
              </RouterLink>
              <RouterLink to="/arena" @click="closeDropdowns" class="flex items-center gap-3 px-4 py-2.5 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.672c-.99 0-1.932-.223-2.77-.672" /></svg>
                <div><div class="font-medium text-white">Benchmark Arena</div><div class="text-xs text-vex-text-muted">Compare Vex vs Go, Rust, Zig</div></div>
              </RouterLink>
            </div>
          </div>

          <!-- Direct links -->
          <RouterLink to="/download" class="px-3 py-1.5 rounded-lg text-sm font-medium text-vex-accent hover:text-white hover:bg-vex-accent/10 transition-colors flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            Download
          </RouterLink>

          <div class="w-px h-5 bg-vex-border mx-1"></div>
          <!-- Search trigger -->
          <button type="button" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors cursor-pointer" @click="searchOpen = true">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <kbd class="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded border border-vex-border text-[10px] font-mono">&#8984;K</kbd>
          </button>
          <div class="w-px h-5 bg-vex-border mx-1"></div>
          <template v-if="user">
            <RouterLink to="/dashboard" class="px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors">Dashboard</RouterLink>
            <button type="button" class="px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors cursor-pointer" @click="logout">Sign out</button>
          </template>
          <RouterLink v-else to="/login" class="px-4 py-1.5 rounded-lg text-sm font-medium bg-vex-primary/10 text-vex-primary hover:bg-vex-primary/20 transition-colors">Sign in</RouterLink>
        </nav>

        <!-- Mobile toggle -->
        <button type="button" aria-label="Toggle navigation menu" class="md:hidden p-2 text-vex-text-muted hover:text-white" @click="mobileOpen = !mobileOpen">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile nav -->
      <div v-if="mobileOpen" class="md:hidden border-t border-vex-border bg-vex-bg px-4 py-3 space-y-1 max-h-[calc(100vh-57px)] overflow-y-auto">
        <div class="px-3 py-1 text-[10px] font-bold text-vex-text-muted uppercase tracking-widest">Learn</div>
        <a href="/docs/" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Documentation</a>
        <RouterLink to="/tour" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Tour of Vex</RouterLink>
        <RouterLink to="/playground" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Playground</RouterLink>
        <div class="border-t border-vex-border my-2"></div>
        <div class="px-3 py-1 text-[10px] font-bold text-vex-text-muted uppercase tracking-widest">Community</div>
        <RouterLink to="/packages" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Packages</RouterLink>
        <RouterLink to="/blog" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Blog</RouterLink>
        <RouterLink to="/projects" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Projects</RouterLink>
        <div class="border-t border-vex-border my-2"></div>
        <div class="px-3 py-1 text-[10px] font-bold text-vex-text-muted uppercase tracking-widest">Tools</div>
        <RouterLink to="/ai" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">AI Assistant</RouterLink>
        <RouterLink to="/arena" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Benchmark Arena</RouterLink>
        <div class="border-t border-vex-border my-2"></div>
        <RouterLink to="/download" class="block px-3 py-2 rounded-lg text-sm text-vex-accent hover:text-white hover:bg-vex-accent/10" @click="mobileOpen = false">Download</RouterLink>
        <template v-if="user">
          <RouterLink to="/dashboard" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Dashboard</RouterLink>
          <button type="button" class="block w-full text-left px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light cursor-pointer" @click="logout(); mobileOpen = false">Sign out</button>
        </template>
        <RouterLink v-else to="/login" class="block px-3 py-2 rounded-lg text-sm font-medium text-vex-primary" @click="mobileOpen = false">Sign in</RouterLink>
        <!-- Mobile search -->
        <button type="button" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light cursor-pointer" @click="searchOpen = true; mobileOpen = false">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          Search
        </button>
      </div>
    </header>

    <!-- Main -->
    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-vex-border mt-auto">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 class="text-xs font-semibold text-vex-text-muted uppercase tracking-wider mb-3">Product</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="/docs/guide/introduction" class="text-vex-text-muted hover:text-white transition-colors">Get Started</a></li>
              <li><a href="/docs/" class="text-vex-text-muted hover:text-white transition-colors">Documentation</a></li>
              <li><RouterLink to="/tour" class="text-vex-text-muted hover:text-white transition-colors">Tour of Vex</RouterLink></li>
              <li><RouterLink to="/playground" class="text-vex-text-muted hover:text-white transition-colors">Playground</RouterLink></li>
              <li><RouterLink to="/ai" class="text-vex-text-muted hover:text-white transition-colors">AI Assistant</RouterLink></li>
              <li><RouterLink to="/arena" class="text-vex-text-muted hover:text-white transition-colors">Benchmark Arena</RouterLink></li>
              <li><RouterLink to="/download" class="text-vex-text-muted hover:text-white transition-colors">Download</RouterLink></li>
            </ul>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-vex-text-muted uppercase tracking-wider mb-3">Ecosystem</h4>
            <ul class="space-y-2 text-sm">
              <li><RouterLink to="/packages" class="text-vex-text-muted hover:text-white transition-colors">Packages</RouterLink></li>
              <li><RouterLink to="/blog" class="text-vex-text-muted hover:text-white transition-colors">Blog</RouterLink></li>
              <li><RouterLink to="/projects" class="text-vex-text-muted hover:text-white transition-colors">Projects</RouterLink></li>
            </ul>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-vex-text-muted uppercase tracking-wider mb-3">Community</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="https://github.com/vex-org" target="_blank" rel="noopener" class="text-vex-text-muted hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://discord.gg/vex" target="_blank" rel="noopener" class="text-vex-text-muted hover:text-white transition-colors">Discord</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-vex-text-muted uppercase tracking-wider mb-3">Legal</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="/docs/guide/installation" class="text-vex-text-muted hover:text-white transition-colors">License</a></li>
            </ul>
          </div>
        </div>
        <div class="flex items-center justify-between pt-6 border-t border-vex-border">
          <div class="flex items-center gap-2 text-vex-text-muted text-xs">
            <img src="/vex-logo.svg" alt="Vex" class="w-4 h-4 opacity-50" />
            <span>&copy; {{ new Date().getFullYear() }} Vex Language</span>
          </div>
          <a href="https://github.com/vex-org" target="_blank" rel="noopener" class="text-vex-text-muted hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </footer>

    <!-- Search Modal (lazy mounted) -->
    <SearchModal v-if="searchOpen" :open="searchOpen" @close="searchOpen = false" />
  </div>
</template>
