<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabase/client'
import { AlertTriangle } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const error = ref('')

onMounted(async () => {
  // Supabase appends #access_token=... or ?code=... after OAuth redirect
  const { data, error: e } = await supabase.auth.getSession()
  if (e) {
    error.value = e.message
    return
  }
  if (data.session) {
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.replace(redirect)
  } else {
    // Session not ready yet — wait for auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe()
        const redirect = (route.query.redirect as string) || '/dashboard'
        router.replace(redirect)
      }
    })
    // Timeout after 10s
    setTimeout(() => {
      subscription.unsubscribe()
      if (!error.value) {
        error.value = 'Authentication timed out. Please try again.'
      }
    }, 10000)
  }
})
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4">
    <div class="text-center">
      <div v-if="!error">
        <div class="w-8 h-8 border-2 border-vex-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-vex-text-muted">Completing sign in…</p>
      </div>
      <div v-else>
        <div class="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle class="w-7 h-7 text-red-400" />
        </div>
        <p class="text-red-400 mb-4">{{ error }}</p>
        <router-link to="/login" class="text-vex-primary hover:text-vex-accent transition-colors">Try again</router-link>
      </div>
    </div>
  </div>
</template>
