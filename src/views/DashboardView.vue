<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { LayoutDashboard, PenLine, Package, GitBranch, ArrowUpRight } from 'lucide-vue-next'

const route = useRoute()
const items = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/posts', label: 'Posts', icon: PenLine },
  { to: '/dashboard/packages', label: 'Packages', icon: Package },
  { to: '/dashboard/projects', label: 'Projects', icon: GitBranch },
]
function isActive(to: string) {
  return to === '/dashboard' ? route.path === to : route.path === to || route.path.startsWith(to + '/')
}
</script>

<template>
  <div class="workspace">
    <aside class="workspace-sidebar">
      <div class="workspace-identity">
        <img src="/vex-logo-micro.svg" alt="" width="32" height="32" />
        <div><strong>Your workspace</strong><span>Build. Publish. Share.</span></div>
      </div>
      <p class="workspace-nav-label">Manage</p>
      <nav class="workspace-nav" aria-label="Workspace">
        <RouterLink v-for="item in items" :key="item.to" :to="item.to"
          class="workspace-nav-link" :class="{ 'is-active': isActive(item.to) }"
          :aria-current="isActive(item.to) ? 'page' : undefined">
          <component :is="item.icon" :size="18" />
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="workspace-guide">
        <p>Make something with Vex.</p>
        <span>Find the language guides, examples, and publishing reference.</span>
        <a href="/docs/">Open documentation <ArrowUpRight :size="15" /></a>
      </div>
    </aside>
    <section class="workspace-content" aria-label="Workspace content">
      <RouterView />
    </section>
  </div>
</template>
