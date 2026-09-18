<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute, useRouter } from 'vitepress'
import { onMounted } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import CodeEnhancer from './CodeEnhancer.vue'
import DocUtilities from './DocUtilities.vue'
import VexQuote from './VexQuote.vue'
import { installViewTransitions } from './view-transitions'

const { Layout } = DefaultTheme
const route = useRoute()
const router = useRouter()

// Chrome/Safari/Firefox: wrap internal docs navigation in a view transition.
installViewTransitions(router, route)

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
  <Layout>
    <template #doc-before>
      <Breadcrumb />
    </template>

    <template #aside-outline-after>
      <DocUtilities />
    </template>

    <template #aside-bottom>
      <VexQuote />
    </template>

    <template #layout-bottom>
      <CodeEnhancer />
    </template>
  </Layout>
</template>
