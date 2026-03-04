<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../supabase/client'
import AppLayout from '../components/AppLayout.vue'
import { Search, Users, GitBranch, ArrowRight, Filter } from 'lucide-vue-next'

interface ProjectRow {
  id: string
  name: string
  slug: string
  tagline: string | null
  github_url: string | null
  status: string
  category: string
  looking_for: string[]
  owner_id: string
  created_at: string
  owner?: { display_name: string; username: string; avatar_url: string | null }
  member_count?: number
  milestone_progress?: { done: number; total: number }
}

const projects = ref<ProjectRow[]>([])
const loading = ref(true)
const search = ref('')
const statusFilter = ref('all')
const categoryFilter = ref('all')

const statuses = ['all', 'idea', 'prototype', 'alpha', 'beta', 'stable']
const categories = ['all', 'library', 'compiler-plugin', 'web', 'embedded', 'ml', 'game', 'devtools', 'cli', 'database', 'networking', 'other']

const statusLabels: Record<string, string> = {
  idea: 'Idea', prototype: 'Prototype', alpha: 'Alpha', beta: 'Beta', stable: 'Stable', archived: 'Archived'
}
const statusColors: Record<string, string> = {
  idea: 'bg-violet-500/15 text-violet-400',
  prototype: 'bg-amber-500/15 text-amber-400',
  alpha: 'bg-sky-500/15 text-sky-400',
  beta: 'bg-emerald-500/15 text-emerald-400',
  stable: 'bg-green-500/15 text-green-400',
  archived: 'bg-zinc-500/15 text-zinc-400',
}
const categoryLabels: Record<string, string> = {
  library: 'Library', 'compiler-plugin': 'Compiler Plugin', web: 'Web', embedded: 'Embedded',
  ml: 'ML / AI', game: 'Game', devtools: 'Dev Tools', cli: 'CLI', database: 'Database',
  networking: 'Networking', other: 'Other'
}

const filtered = computed(() => {
  let list = projects.value
  if (statusFilter.value !== 'all') list = list.filter(p => p.status === statusFilter.value)
  if (categoryFilter.value !== 'all') list = list.filter(p => p.category === categoryFilter.value)
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || (p.tagline?.toLowerCase().includes(q)))
  }
  return list
})

onMounted(async () => {
  const { data } = await supabase
    .from('projects')
    .select('id, name, slug, tagline, github_url, status, category, looking_for, owner_id, created_at')
    .neq('status', 'archived')
    .order('created_at', { ascending: false })

  if (data) {
    const ownerIds = [...new Set(data.map(p => p.owner_id))]
    const projectIds = data.map(p => p.id)

    const [profilesRes, membersRes, milestonesRes] = await Promise.all([
      supabase.from('profiles').select('id, display_name, username, avatar_url').in('id', ownerIds),
      supabase.from('project_members').select('project_id').in('project_id', projectIds),
      supabase.from('project_milestones').select('project_id, completed').in('project_id', projectIds),
    ])

    const profileMap = new Map((profilesRes.data ?? []).map(p => [p.id, p]))
    const memberCounts = new Map<string, number>()
    for (const m of membersRes.data ?? []) {
      memberCounts.set(m.project_id, (memberCounts.get(m.project_id) ?? 0) + 1)
    }
    const milestoneMap = new Map<string, { done: number; total: number }>()
    for (const ms of milestonesRes.data ?? []) {
      const entry = milestoneMap.get(ms.project_id) ?? { done: 0, total: 0 }
      entry.total++
      if (ms.completed) entry.done++
      milestoneMap.set(ms.project_id, entry)
    }

    projects.value = data.map(p => ({
      ...p,
      owner: profileMap.get(p.owner_id),
      member_count: memberCounts.get(p.id) ?? 0,
      milestone_progress: milestoneMap.get(p.id),
    }))
  }
  loading.value = false
})

function progressPercent(p: ProjectRow): number {
  if (!p.milestone_progress || p.milestone_progress.total === 0) return 0
  return Math.round((p.milestone_progress.done / p.milestone_progress.total) * 100)
}
</script>

<template>
  <AppLayout>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Community Projects</h1>
        <p class="text-vex-text-muted max-w-2xl">Discover projects built with Vex, find teams to join, or start your own. Communication happens through GitHub — we keep it simple.</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-vex-text-muted pointer-events-none" />
          <input
            v-model="search"
            type="text"
            placeholder="Search projects..."
            class="w-full pl-10 pr-4 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-vex-primary/50 focus:ring-1 focus:ring-vex-primary/25"
          />
        </div>
        <select v-model="statusFilter" class="px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-sm text-white focus:outline-none focus:border-vex-primary/50 cursor-pointer">
          <option v-for="s in statuses" :key="s" :value="s">{{ s === 'all' ? 'All Stages' : statusLabels[s] }}</option>
        </select>
        <select v-model="categoryFilter" class="px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-sm text-white focus:outline-none focus:border-vex-primary/50 cursor-pointer">
          <option v-for="c in categories" :key="c" :value="c">{{ c === 'all' ? 'All Categories' : categoryLabels[c] }}</option>
        </select>
        <router-link to="/dashboard/projects/new" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-vex-primary text-white text-sm font-medium hover:bg-vex-primary-dim transition-colors whitespace-nowrap">
          + New Project
        </router-link>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="w-6 h-6 border-2 border-vex-border border-t-vex-primary rounded-full animate-spin"></div>
      </div>

      <!-- Empty -->
      <div v-else-if="filtered.length === 0" class="text-center py-16">
        <GitBranch class="w-10 h-10 text-zinc-600 mx-auto mb-3" />
        <p class="text-vex-text-muted">No projects found.</p>
        <router-link to="/dashboard/projects/new" class="inline-block mt-4 px-4 py-2 rounded-lg bg-vex-primary text-white text-sm font-medium hover:bg-vex-primary-dim transition-colors">Start a Project</router-link>
      </div>

      <!-- Project grid -->
      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <router-link
          v-for="project in filtered"
          :key="project.id"
          :to="`/projects/${project.slug}`"
          class="group flex flex-col p-5 rounded-xl border border-vex-border bg-vex-bg-card hover:bg-vex-bg-card-hover hover:border-vex-primary/30 transition-all"
        >
          <!-- Top row -->
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-sm font-semibold text-white group-hover:text-vex-primary transition-colors line-clamp-1">{{ project.name }}</h3>
            <span :class="statusColors[project.status]" class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap ml-2">{{ statusLabels[project.status] }}</span>
          </div>

          <!-- Tagline -->
          <p class="text-xs text-vex-text-muted line-clamp-2 mb-4 flex-1">{{ project.tagline || 'No description yet.' }}</p>

          <!-- Category -->
          <div class="flex items-center gap-2 mb-3">
            <span class="text-[10px] font-medium text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">{{ categoryLabels[project.category] || project.category }}</span>
          </div>

          <!-- Looking for -->
          <div v-if="project.looking_for?.length" class="flex flex-wrap gap-1 mb-3">
            <span v-for="role in project.looking_for.slice(0, 3)" :key="role" class="text-[10px] text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">{{ role }}</span>
            <span v-if="project.looking_for.length > 3" class="text-[10px] text-zinc-500">+{{ project.looking_for.length - 3 }}</span>
          </div>

          <!-- Progress bar -->
          <div v-if="project.milestone_progress && project.milestone_progress.total > 0" class="mb-3">
            <div class="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
              <span>Progress</span>
              <span>{{ project.milestone_progress.done }}/{{ project.milestone_progress.total }}</span>
            </div>
            <div class="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div class="h-full bg-vex-primary rounded-full transition-all" :style="{ width: progressPercent(project) + '%' }"></div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-3 border-t border-vex-border/50">
            <div class="flex items-center gap-1.5">
              <div class="w-5 h-5 rounded-full bg-zinc-700 overflow-hidden">
                <img v-if="project.owner?.avatar_url" :src="project.owner.avatar_url" :alt="project.owner.display_name" class="w-full h-full object-cover" />
              </div>
              <span class="text-[11px] text-zinc-400">{{ project.owner?.display_name || project.owner?.username || 'Unknown' }}</span>
            </div>
            <div class="flex items-center gap-1 text-[11px] text-zinc-500">
              <Users class="w-3 h-3" />
              <span>{{ project.member_count }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </AppLayout>
</template>
