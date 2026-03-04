<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/client'
import { GitBranch, Trash2, Pencil, Users } from 'lucide-vue-next'

interface ProjectRow {
  id: string; name: string; slug: string; tagline: string | null; status: string; category: string
  member_count?: number; milestone_done?: number; milestone_total?: number
}

const projects = ref<ProjectRow[]>([])
const loading = ref(true)

const statusLabels: Record<string, string> = {
  idea: 'Idea', prototype: 'Prototype', alpha: 'Alpha', beta: 'Beta', stable: 'Stable', archived: 'Archived'
}

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data } = await supabase
    .from('projects')
    .select('id, name, slug, tagline, status, category')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  if (data) {
    const projectIds = data.map(p => p.id)
    const [membersRes, msRes] = await Promise.all([
      supabase.from('project_members').select('project_id').in('project_id', projectIds),
      supabase.from('project_milestones').select('project_id, completed').in('project_id', projectIds),
    ])

    const memberCounts = new Map<string, number>()
    for (const m of membersRes.data ?? []) memberCounts.set(m.project_id, (memberCounts.get(m.project_id) ?? 0) + 1)
    const msMap = new Map<string, { done: number; total: number }>()
    for (const ms of msRes.data ?? []) {
      const e = msMap.get(ms.project_id) ?? { done: 0, total: 0 }
      e.total++
      if (ms.completed) e.done++
      msMap.set(ms.project_id, e)
    }

    projects.value = data.map(p => ({
      ...p,
      member_count: memberCounts.get(p.id) ?? 0,
      milestone_done: msMap.get(p.id)?.done ?? 0,
      milestone_total: msMap.get(p.id)?.total ?? 0,
    }))
  }
  loading.value = false
})

async function deleteProject(project: ProjectRow) {
  if (!confirm(`Delete "${project.name}"? This cannot be undone.`)) return
  await supabase.from('projects').delete().eq('id', project.id)
  projects.value = projects.value.filter(p => p.id !== project.id)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-white">My Projects</h1>
      <router-link to="/dashboard/projects/new" class="px-4 py-2 rounded-lg bg-vex-primary text-white text-sm font-medium hover:bg-vex-primary-dim transition-colors">+ New Project</router-link>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-6 h-6 border-2 border-vex-border border-t-vex-primary rounded-full animate-spin"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="projects.length === 0" class="text-center py-12">
      <GitBranch class="w-8 h-8 text-zinc-600 mx-auto mb-2" />
      <p class="text-vex-text-muted text-sm mb-4">You haven't created any projects yet.</p>
      <router-link to="/dashboard/projects/new" class="text-vex-primary text-sm hover:underline">Start your first project</router-link>
    </div>

    <!-- Project list -->
    <div v-else class="space-y-3">
      <div v-for="project in projects" :key="project.id" class="flex items-center gap-4 p-4 rounded-lg border border-vex-border bg-vex-bg-card">
        <div class="flex-1 min-w-0">
          <router-link :to="`/projects/${project.slug}`" class="text-sm font-semibold text-white hover:text-vex-primary transition-colors">{{ project.name }}</router-link>
          <p v-if="project.tagline" class="text-xs text-vex-text-muted mt-0.5 truncate">{{ project.tagline }}</p>
          <div class="flex items-center gap-3 mt-2 text-[11px] text-zinc-500">
            <span>{{ statusLabels[project.status] }}</span>
            <span class="flex items-center gap-1"><Users class="w-3 h-3" /> {{ project.member_count }}</span>
            <span v-if="project.milestone_total! > 0">{{ project.milestone_done }}/{{ project.milestone_total }} milestones</span>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <router-link :to="`/dashboard/projects/${project.slug}/edit`" class="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-vex-surface-light transition-colors" title="Edit">
            <Pencil class="w-4 h-4" />
          </router-link>
          <button type="button" class="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Delete" @click="deleteProject(project)">
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
