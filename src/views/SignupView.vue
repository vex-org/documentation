<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase/client'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function signup() {
  error.value = ''
  const { error: e } = await supabase.auth.signUp({ email: email.value, password: password.value })
  if (e) {
    error.value = e.message
    return
  }
  router.push('/dashboard')
}
</script>

<template>
  <div class="auth">
    <h1>Sign up</h1>
    <form @submit.prevent="signup">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">Sign up</button>
    </form>
    <p><router-link to="/login">Log in</router-link></p>
  </div>
</template>

<style scoped>
.auth { max-width: 320px; margin: 0 auto; }
.auth h1 { margin-bottom: 1rem; }
.auth input { display: block; width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid var(--border, #e2e8f0); border-radius: 4px; }
.auth button { padding: 0.5rem 1rem; margin-top: 0.5rem; cursor: pointer; }
.error { color: var(--error, #dc2626); font-size: 0.875rem; margin-top: 0.25rem; }
</style>
