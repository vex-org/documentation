<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from './components/AppLayout.vue'
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { Analytics } from "@vercel/analytics/vue"

</script>

<template>
  <AppLayout>
    <RouterView />
    <SpeedInsights />
    <Analytics />
  </AppLayout>
</template>
