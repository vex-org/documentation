<script setup lang="ts">
// OAuth-only auth — signup and login are the same flow
// This view just redirects to /login
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => router.replace('/login'))
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="w-6 h-6 border-2 border-vex-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
</template>
