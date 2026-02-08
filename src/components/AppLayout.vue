<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { supabase } from '../supabase/client'

const DOCS_URL = 'https://docs.vex-lang.org'
const user = ref<{ id: string; email?: string } | null>(null)
const router = useRouter()

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
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <RouterLink to="/" class="logo">Vex</RouterLink>
        <nav class="nav">
          <a :href="DOCS_URL" target="_blank" rel="noopener">Docs</a>
          <RouterLink to="/packages">Packages</RouterLink>
          <RouterLink to="/blog">Blog</RouterLink>
          <template v-if="user">
            <RouterLink to="/dashboard">Dashboard</RouterLink>
            <button type="button" class="auth-btn" @click="logout">Logout</button>
          </template>
          <RouterLink v-else to="/login" class="auth">Login</RouterLink>
        </nav>
      </div>
    </header>
    <main class="main">
      <slot />
    </main>
    <footer class="footer">
      <a href="https://vex-lang.org" target="_blank" rel="noopener">vex-lang.org</a>
    </footer>
  </div>
</template>

<style scoped>
.app { min-height: 100vh; display: flex; flex-direction: column; }
.header { border-bottom: 1px solid var(--border, #e2e8f0); background: var(--bg-header, #fff); }
.header-inner { max-width: 960px; margin: 0 auto; padding: 0.75rem 1rem; display: flex; align-items: center; justify-content: space-between; }
.logo { font-weight: 700; font-size: 1.25rem; color: var(--text, #0f172a); text-decoration: none; }
.nav { display: flex; gap: 1.5rem; align-items: center; }
.nav a, .nav .auth { color: var(--text-muted, #64748b); text-decoration: none; background: none; border: none; font: inherit; cursor: pointer; }
.nav a:hover, .nav .router-link-active { color: var(--text, #0f172a); }
.auth-btn { color: var(--text-muted, #64748b); background: none; border: none; font: inherit; cursor: pointer; padding: 0; }
.auth-btn:hover { color: var(--text, #0f172a); }
.auth { margin-left: 0.5rem; }
.main { flex: 1; max-width: 960px; margin: 0 auto; padding: 1.5rem 1rem; width: 100%; }
.footer { padding: 1rem; text-align: center; border-top: 1px solid var(--border, #e2e8f0); font-size: 0.875rem; }
.footer a { color: var(--text-muted, #64748b); text-decoration: none; }
</style>
