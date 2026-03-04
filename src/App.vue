<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { RouterView } from 'vue-router'
import AppLayout from './components/AppLayout.vue'

const SpeedInsights = defineAsyncComponent(() =>
  import('@vercel/speed-insights/vue').then(m => m.SpeedInsights)
)
const Analytics = defineAsyncComponent(() =>
  import('@vercel/analytics/vue').then(m => m.Analytics)
)
</script>

<template>
  <AppLayout>
    <RouterView />
    <SpeedInsights />
    <Analytics />
  </AppLayout>
</template>
