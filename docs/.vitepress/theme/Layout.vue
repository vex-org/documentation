<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'

const { Layout } = DefaultTheme

onMounted(() => {
  // Override navbar title link to go to site origin instead of /docs/
  document.querySelectorAll('.VPNavBarTitle a, a.VPNavBarTitle').forEach((el) => {
    el.setAttribute('href', '/')
    el.addEventListener('click', (e) => {
      e.preventDefault()
      window.location.href = '/'
    })
  })
})
</script>

<template>
  <Layout />
</template>
