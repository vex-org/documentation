<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { LayoutDashboard, PenLine, PenSquare, Package, Rocket, GitBranch, FolderPlus } from 'lucide-vue-next'
import { type Component } from 'vue'

interface NavItem { to: string; label: string; icon: Component }
interface NavSection { label?: string; items: NavItem[] }

const sections: NavSection[] = [
  {
    items: [
      { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    ]
  },
  {
    label: 'Content',
    items: [
      { to: '/dashboard/posts', label: 'Posts', icon: PenLine },
      { to: '/dashboard/packages', label: 'Packages', icon: Package },
      { to: '/dashboard/projects', label: 'Projects', icon: GitBranch },
    ]
  },
  {
    label: 'Create',
    items: [
      { to: '/dashboard/posts/new', label: 'New Post', icon: PenSquare },
      { to: '/dashboard/packages/new', label: 'Publish Package', icon: Rocket },
      { to: '/dashboard/projects/new', label: 'New Project', icon: FolderPlus },
    ]
  },
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar -->
      <aside class="md:w-52 flex-shrink-0">
        <div class="md:sticky md:top-24 space-y-5">
          <template v-for="(section, si) in sections" :key="si">
            <div>
              <p v-if="section.label" class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-1.5 px-3 hidden md:block">{{ section.label }}</p>
              <nav class="flex md:flex-col gap-0.5 overflow-x-auto md:overflow-visible">
                <RouterLink
                  v-for="item in section.items"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all whitespace-nowrap"
                  active-class="!text-sky-400 !bg-sky-500/8"
                  :exact="item.to === '/dashboard'"
                >
                  <component :is="item.icon" class="w-4 h-4 flex-shrink-0" />
                  <span>{{ item.label }}</span>
                </RouterLink>
              </nav>
            </div>
          </template>
        </div>
      </aside>

      <!-- Content -->
      <main class="flex-1 min-w-0">
        <RouterView />
      </main>
    </div>
  </div>
</template>
