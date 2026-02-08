<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { LayoutDashboard, PenLine, PenSquare, Package, Rocket } from 'lucide-vue-next'
import { type Component } from 'vue'

const navItems: { to: string; label: string; icon: Component }[] = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/posts', label: 'My Posts', icon: PenLine },
  { to: '/dashboard/posts/new', label: 'New Post', icon: PenSquare },
  { to: '/dashboard/packages', label: 'My Packages', icon: Package },
  { to: '/dashboard/packages/new', label: 'Publish Package', icon: Rocket },
]
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar -->
      <aside class="md:w-56 flex-shrink-0">
        <nav class="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-vex-text-muted hover:text-white hover:bg-white/5 transition-all whitespace-nowrap"
            active-class="!text-white !bg-vex-primary/15 !border-l-2 !border-vex-primary"
            :exact="item.to === '/dashboard'"
          >
            <component :is="item.icon" class="w-4 h-4" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </aside>
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <RouterView />
      </div>
    </div>
  </div>
</template>
