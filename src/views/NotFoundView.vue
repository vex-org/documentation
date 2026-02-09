<script setup lang="ts">
import { Home, ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="text-8xl font-bold text-vex-primary/20 mb-4 font-mono">404</div>
      <h1 class="text-2xl font-bold text-white mb-3">Page not found</h1>
      <p class="text-vex-text-muted mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <div class="flex items-center justify-center gap-3">
        <button type="button" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-vex-border text-sm font-medium text-vex-text-muted hover:text-white hover:border-vex-primary/50 transition-all cursor-pointer" @click="$router.back()">
          <ArrowLeft class="w-4 h-4" /> Go back
        </button>
        <router-link to="/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white text-sm font-medium transition-all">
          <Home class="w-4 h-4" /> Home
        </router-link>
      </div>
    </div>
  </div>
</template>
