<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabase/client'

const email = ref('')
const password = ref('')
const error = ref('')
const route = useRoute()
const router = useRouter()

async function login() {
  error.value = ''
  const { error: e } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  if (e) { error.value = e.message; return }
  router.push((route.query.redirect as string) || '/dashboard')
}
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-vex-primary to-vex-accent flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">V</div>
        <h1 class="text-2xl font-bold text-white">Welcome back</h1>
        <p class="text-sm text-vex-text-muted mt-1">Sign in to your account</p>
      </div>
      <form class="space-y-4" @submit.prevent="login">
        <div>
          <label class="block text-sm font-medium text-vex-text-muted mb-1.5">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-3 rounded-xl border border-vex-border bg-vex-bg-card text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" placeholder="you@example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-vex-text-muted mb-1.5">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-3 rounded-xl border border-vex-border bg-vex-bg-card text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" placeholder="••••••••" />
        </div>
        <p v-if="error" class="text-sm text-vex-error">{{ error }}</p>
        <button type="submit" class="w-full py-3 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-all cursor-pointer">Sign in</button>
      </form>
      <p class="text-center text-sm text-vex-text-muted mt-6">Don't have an account? <router-link to="/signup" class="text-vex-primary hover:text-vex-accent transition-colors">Sign up</router-link></p>
    </div>
  </div>
</template>
