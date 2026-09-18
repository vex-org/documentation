<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { RouterView } from 'vue-router'
import AppLayout from './components/AppLayout.vue'

const supportsViewTransitions = typeof document !== 'undefined' && 'startViewTransition' in document
// Modern browsers animate page changes through the View Transitions API;
// older ones keep the CSS fade below.
const useLegacyFade = !supportsViewTransitions

const SpeedInsights = defineAsyncComponent(() =>
  import('@vercel/speed-insights/vue').then(m => m.SpeedInsights)
)
const Analytics = defineAsyncComponent(() =>
  import('@vercel/analytics/vue').then(m => m.Analytics)
)
</script>

<template>
  <AppLayout>
    <RouterView v-slot="{ Component }">
      <transition v-if="useLegacyFade" name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
      <component v-else :is="Component" />
    </RouterView>

    <SpeedInsights />
    <Analytics />
  </AppLayout>
</template>

<style>
/* 1. Eski sayfa kaybolurken (Fade-out) */
.page-fade-leave-active {
  transition: opacity 0.25s ease;
}
.page-fade-leave-to {
  opacity: 0;
}

/* 2. Yeni sayfa gelirken (Fade-in) */
.page-fade-enter-active {
  transition: opacity 0.25s ease;
}
.page-fade-enter-from {
  opacity: 0;
}
</style>
