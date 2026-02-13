<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../supabase/client'
import { Mail, CheckCircle2, AlertCircle } from 'lucide-vue-next'

const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const message = ref('')

async function subscribe() {
  if (!email.value || !email.value.includes('@')) {
    status.value = 'error'
    message.value = 'Please enter a valid email address.'
    return
  }

  status.value = 'loading'
  
  const { error } = await supabase
    .from('subscribers')
    .insert([{ email: email.value.trim() }])

  if (error) {
    status.value = 'error'
    if (error.code === '23505') {
      message.value = 'This email is already subscribed!'
    } else {
      message.value = 'Something went wrong. Please try again.'
    }
  } else {
    status.value = 'success'
    message.value = 'Thanks for subscribing! We\'ll keep you posted.'
    email.value = ''
  }
}
</script>

<template>
  <div class="p-8 rounded-2xl border border-vex-border bg-gradient-to-br from-vex-primary/5 to-vex-accent/5 backdrop-blur-xl">
    <div class="max-w-xl">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-vex-primary/10 flex items-center justify-center">
          <Mail class="w-5 h-5 text-vex-primary" />
        </div>
        <h3 class="text-xl font-bold text-white">Vex Newsletter</h3>
      </div>
      
      <p class="text-vex-text-muted mb-6">
        Get the latest updates on Vex Language, compiler features, and ecosystem news delivered to your inbox.
      </p>

      <form v-if="status !== 'success'" @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <input
            v-model="email"
            type="email"
            placeholder="email@example.com"
            :disabled="status === 'loading'"
            class="w-full px-4 py-3 rounded-xl border border-vex-border bg-vex-bg text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all disabled:opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="status === 'loading'"
          class="px-6 py-3 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-vex-bg font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span v-if="status === 'loading'">Subscribing...</span>
          <span v-else>Subscribe</span>
        </button>
      </form>

      <div v-if="status === 'success'" class="flex items-center gap-3 p-4 rounded-xl bg-vex-success/10 border border-vex-success/20 text-vex-success">
        <CheckCircle2 class="w-5 h-5" />
        <span class="font-medium">{{ message }}</span>
      </div>

      <div v-if="status === 'error'" class="mt-3 flex items-center gap-2 text-sm text-vex-error">
        <AlertCircle class="w-4 h-4" />
        <span>{{ message }}</span>
      </div>
      
      <p class="mt-4 text-xs text-vex-text-muted">
        Join 500+ developers. No spam, unsubscribe anytime.
      </p>
    </div>
  </div>
</template>
