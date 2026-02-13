<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { supabase } from '../supabase/client'

const user = ref<{ id: string; email?: string } | null>(null)
const mobileOpen = ref(false)
const router = useRouter()
const route = useRoute()

// Close mobile nav on route change
watch(() => route.fullPath, () => { mobileOpen.value = false })

onMounted(async () => {
  const { data: { user: u } } = await supabase.auth.getUser()
  user.value = u ?? null
})
supabase.auth.onAuthStateChange((_event, session) => {
  user.value = session?.user ?? null
})

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
    <header class="sticky top-0 z-50 border-b border-vex-border bg-vex-bg/80 backdrop-blur-xl">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 group">
          <img src="/vex-logo.svg" alt="Vex" class="w-8 h-8" />
          <span class="text-xl font-bold text-white group-hover:text-vex-primary-light transition-colors">Vex</span>
        </RouterLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <a href="/docs/" class="px-3 py-2 rounded-lg text-sm font-medium text-vex-text-muted hover:text-vex-primary-light hover:bg-white/5 transition-all">Docs</a>
          <RouterLink to="/packages" class="px-3 py-2 rounded-lg text-sm font-medium text-vex-text-muted hover:text-vex-primary-light hover:bg-white/5 transition-all">Packages</RouterLink>
          <RouterLink to="/blog" class="px-3 py-2 rounded-lg text-sm font-medium text-vex-text-muted hover:text-vex-primary-light hover:bg-white/5 transition-all">Blog</RouterLink>
          <div class="w-px h-6 bg-vex-border mx-2"></div>
          <template v-if="user">
            <RouterLink to="/dashboard" class="px-3 py-2 rounded-lg text-sm font-medium text-vex-text-muted hover:text-vex-primary-light hover:bg-white/5 transition-all">Dashboard</RouterLink>
            <button type="button" class="px-3 py-2 rounded-lg text-sm font-medium text-vex-text-muted hover:text-vex-primary-light hover:bg-white/5 transition-all cursor-pointer" @click="logout">Logout</button>
          </template>
          <RouterLink v-else to="/login" class="px-4 py-2 rounded-lg text-sm font-medium bg-vex-primary hover:bg-vex-primary-light text-vex-bg font-bold transition-all shadow-lg shadow-vex-primary/20">Sign in</RouterLink>
        </nav>

        <!-- Mobile toggle -->
        <button type="button" aria-label="Toggle navigation menu" class="md:hidden p-2 text-vex-text-muted hover:text-white" @click="mobileOpen = !mobileOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile nav -->
      <div v-if="mobileOpen" class="md:hidden border-t border-vex-border bg-vex-bg px-4 py-3 space-y-1">
        <a href="/docs/" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-vex-primary-light hover:bg-white/5" @click="mobileOpen = false">Docs</a>
        <RouterLink to="/packages" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-vex-primary-light hover:bg-white/5" @click="mobileOpen = false">Packages</RouterLink>
        <RouterLink to="/blog" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-vex-primary-light hover:bg-white/5" @click="mobileOpen = false">Blog</RouterLink>
        <template v-if="user">
          <RouterLink to="/dashboard" class="block px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-vex-primary-light hover:bg-white/5" @click="mobileOpen = false">Dashboard</RouterLink>
          <button type="button" class="block w-full text-left px-3 py-2 rounded-lg text-sm text-vex-text-muted hover:text-vex-primary-light hover:bg-white/5 cursor-pointer" @click="logout(); mobileOpen = false">Logout</button>
        </template>
        <RouterLink v-else to="/login" class="block px-3 py-2 rounded-lg text-sm font-medium text-vex-primary" @click="mobileOpen = false">Sign in</RouterLink>
      </div>
    </header>

    <!-- Main -->
    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-vex-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-vex-text-muted text-sm">
            <img src="/vex-logo.svg" alt="Vex" class="w-5 h-5" />
            <span>&copy; {{ new Date().getFullYear() }} Vex Language</span>
          </div>
          <div class="flex items-center gap-6 text-sm">
            <a href="https://github.com/vex-org" target="_blank" rel="noopener" class="text-vex-text-muted hover:text-white transition-colors">GitHub</a>
            <a href="https://discord.gg/vex" target="_blank" rel="noopener" class="text-vex-text-muted hover:text-white transition-colors">Discord</a>
            <a href="/docs/" class="text-vex-text-muted hover:text-white transition-colors">Docs</a>
            <RouterLink to="/packages" class="text-vex-text-muted hover:text-white transition-colors">Packages</RouterLink>
            <RouterLink to="/blog" class="text-vex-text-muted hover:text-white transition-colors">Blog</RouterLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
