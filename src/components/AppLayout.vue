<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { supabase } from '../supabase/client'

const SearchModal = defineAsyncComponent(() => import('./SearchModal.vue'))

const user = ref<{ id: string; email?: string } | null>(null)
const mobileOpen = ref(false)
const searchOpen = ref(false)
const router = useRouter()
const route = useRoute()

// Close mobile nav on route change
watch(() => route.fullPath, () => { mobileOpen.value = false })

onMounted(async () => {
  const { data: { user: u } } = await supabase.auth.getUser()
  user.value = u ?? null
  document.addEventListener('keydown', onCmdK)
})
onUnmounted(() => document.removeEventListener('keydown', onCmdK))

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
          <a href="/docs/" class="px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors">Docs</a>
          <RouterLink to="/packages" class="px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors">Packages</RouterLink>
          <RouterLink to="/blog" class="px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors">Blog</RouterLink>
          <RouterLink to="/projects" class="px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors">Projects</RouterLink>
          <RouterLink to="/playground" class="px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors">Playground</RouterLink>
          <RouterLink to="/ai" class="px-3 py-1.5 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>AI</RouterLink>
          <div class="w-px h-5 bg-vex-border mx-1"></div>
          <!-- Search trigger -->
          <button type="button" class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors cursor-pointer" @click="searchOpen = true">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span class="hidden lg:inline">Search</span>
            <kbd class="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded border border-vex-border text-[10px] font-mono ml-1">&#8984;K</kbd>
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
      <div v-if="mobileOpen" class="md:hidden border-t border-vex-border bg-vex-bg px-4 py-3 space-y-1">
        <a href="/docs/" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Docs</a>
        <RouterLink to="/packages" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Packages</RouterLink>
        <RouterLink to="/blog" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Blog</RouterLink>
        <RouterLink to="/projects" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Projects</RouterLink>
        <RouterLink to="/playground" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">Playground</RouterLink>
        <RouterLink to="/ai" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light" @click="mobileOpen = false">AI Assistant</RouterLink>
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
              <li><RouterLink to="/playground" class="text-vex-text-muted hover:text-white transition-colors">Playground</RouterLink></li>
              <li><RouterLink to="/ai" class="text-vex-text-muted hover:text-white transition-colors">AI Assistant</RouterLink></li>
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
