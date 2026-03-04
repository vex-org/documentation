<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../supabase/client'
import { Plus, Trash2, GripVertical, CheckCircle2, Circle } from 'lucide-vue-next'

interface MilestoneRow { id?: string; title: string; completed: boolean; sort_order: number }

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.slug)
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const projectId = ref('')

// Form fields
const name = ref('')
const slug = ref('')
const tagline = ref('')
const description = ref('')
const githubUrl = ref('')
const websiteUrl = ref('')
const status = ref('idea')
const category = ref('library')
const lookingFor = ref<string[]>([])
const tags = ref('')
const milestones = ref<MilestoneRow[]>([])

const statuses = [
  { value: 'idea', label: 'Idea' }, { value: 'prototype', label: 'Prototype' },
  { value: 'alpha', label: 'Alpha' }, { value: 'beta', label: 'Beta' },
  { value: 'stable', label: 'Stable' }, { value: 'archived', label: 'Archived' },
]
const categories = [
  { value: 'library', label: 'Library' }, { value: 'compiler-plugin', label: 'Compiler Plugin' },
  { value: 'web', label: 'Web' }, { value: 'embedded', label: 'Embedded' },
  { value: 'ml', label: 'ML / AI' }, { value: 'game', label: 'Game' },
  { value: 'devtools', label: 'Dev Tools' }, { value: 'cli', label: 'CLI' },
  { value: 'database', label: 'Database' }, { value: 'networking', label: 'Networking' },
  { value: 'other', label: 'Other' },
]
const roleOptions = ['backend', 'frontend', 'systems', 'llvm', 'tester', 'docs', 'design', 'devops']

function autoSlug() {
  if (!isEdit.value) {
    slug.value = name.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }
}

function addMilestone() {
  milestones.value.push({ title: '', completed: false, sort_order: milestones.value.length })
}
function removeMilestone(idx: number) { milestones.value.splice(idx, 1) }
function toggleMilestone(idx: number) { milestones.value[idx].completed = !milestones.value[idx].completed }

onMounted(async () => {
  if (!isEdit.value) { loading.value = false; return }

  const editSlug = route.params.slug as string
  const { data: proj } = await supabase.from('projects').select('*').eq('slug', editSlug).single()
  if (!proj) { loading.value = false; error.value = 'Project not found'; return }

  projectId.value = proj.id
  name.value = proj.name
  slug.value = proj.slug
  tagline.value = proj.tagline || ''
  description.value = proj.description || ''
  githubUrl.value = proj.github_url || ''
  websiteUrl.value = proj.website_url || ''
  status.value = proj.status
  category.value = proj.category
  lookingFor.value = proj.looking_for || []

  const [tagsRes, msRes] = await Promise.all([
    supabase.from('project_tags').select('tag').eq('project_id', proj.id),
    supabase.from('project_milestones').select('id, title, completed, sort_order').eq('project_id', proj.id).order('sort_order'),
  ])
  tags.value = (tagsRes.data ?? []).map(t => t.tag).join(', ')
  milestones.value = msRes.data ?? []
  loading.value = false
})

async function save() {
  error.value = ''
  if (!name.value.trim()) { error.value = 'Project name is required.'; return }
  if (!slug.value.trim()) { error.value = 'Slug is required.'; return }

  saving.value = true
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { error.value = 'Not authenticated'; saving.value = false; return }

  const payload = {
    name: name.value.trim(),
    slug: slug.value.trim(),
    tagline: tagline.value.trim() || null,
    description: description.value.trim() || null,
    github_url: githubUrl.value.trim() || null,
    website_url: websiteUrl.value.trim() || null,
    status: status.value,
    category: category.value,
    looking_for: lookingFor.value,
    owner_id: user.id,
    updated_at: new Date().toISOString(),
  }

  let pid = projectId.value

  if (isEdit.value) {
    const { error: err } = await supabase.from('projects').update(payload).eq('id', pid)
    if (err) { error.value = err.message; saving.value = false; return }
  } else {
    const { data, error: err } = await supabase.from('projects').insert(payload).select('id').single()
    if (err || !data) { error.value = err?.message || 'Failed to create project'; saving.value = false; return }
    pid = data.id
    // Add owner as member
    await supabase.from('project_members').insert({ project_id: pid, user_id: user.id, role: 'owner' })
  }

  // Sync tags
  const tagList = tags.value.split(',').map(t => t.trim()).filter(Boolean)
  await supabase.from('project_tags').delete().eq('project_id', pid)
  if (tagList.length) {
    await supabase.from('project_tags').insert(tagList.map(tag => ({ project_id: pid, tag })))
  }

  // Sync milestones
  if (isEdit.value) {
    await supabase.from('project_milestones').delete().eq('project_id', pid)
  }
  const validMs = milestones.value.filter(m => m.title.trim())
  if (validMs.length) {
    await supabase.from('project_milestones').insert(
      validMs.map((m, i) => ({ project_id: pid, title: m.title.trim(), completed: m.completed, sort_order: i }))
    )
  }

  saving.value = false
  router.push(`/projects/${slug.value}`)
}
</script>

<template>
  <div>
    <h1 class="text-xl font-bold text-white mb-6">{{ isEdit ? 'Edit Project' : 'New Project' }}</h1>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-6 h-6 border-2 border-vex-border border-t-vex-primary rounded-full animate-spin"></div>
    </div>

    <form v-else class="space-y-6 max-w-2xl" @submit.prevent="save">
      <!-- Error -->
      <div v-if="error" class="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{{ error }}</div>

      <!-- Name + Slug -->
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-zinc-400 mb-1.5">Project Name *</label>
          <input v-model="name" type="text" required maxlength="80" class="w-full px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm focus:outline-none focus:border-vex-primary/50 focus:ring-1 focus:ring-vex-primary/25" placeholder="My Awesome Project" @input="autoSlug" />
        </div>
        <div>
          <label class="block text-xs font-medium text-zinc-400 mb-1.5">Slug *</label>
          <input v-model="slug" type="text" required maxlength="80" pattern="[a-z0-9-]+" class="w-full px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm focus:outline-none focus:border-vex-primary/50 focus:ring-1 focus:ring-vex-primary/25 font-mono" placeholder="my-awesome-project" />
        </div>
      </div>

      <!-- Tagline -->
      <div>
        <label class="block text-xs font-medium text-zinc-400 mb-1.5">Tagline</label>
        <input v-model="tagline" type="text" maxlength="120" class="w-full px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm focus:outline-none focus:border-vex-primary/50 focus:ring-1 focus:ring-vex-primary/25" placeholder="A brief one-liner about your project" />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-xs font-medium text-zinc-400 mb-1.5">Description / Vision</label>
        <textarea v-model="description" rows="5" class="w-full px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm focus:outline-none focus:border-vex-primary/50 focus:ring-1 focus:ring-vex-primary/25 resize-y" placeholder="What is this project about? What's the vision?"></textarea>
      </div>

      <!-- Status + Category -->
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-zinc-400 mb-1.5">Stage</label>
          <select v-model="status" class="w-full px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm focus:outline-none focus:border-vex-primary/50 cursor-pointer">
            <option v-for="s in statuses" :key="s.value" :value="s.value">{{ s.label }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-zinc-400 mb-1.5">Category</label>
          <select v-model="category" class="w-full px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm focus:outline-none focus:border-vex-primary/50 cursor-pointer">
            <option v-for="c in categories" :key="c.value" :value="c.value">{{ c.label }}</option>
          </select>
        </div>
      </div>

      <!-- URLs -->
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-zinc-400 mb-1.5">GitHub URL</label>
          <input v-model="githubUrl" type="url" class="w-full px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm focus:outline-none focus:border-vex-primary/50 focus:ring-1 focus:ring-vex-primary/25" placeholder="https://github.com/..." />
        </div>
        <div>
          <label class="block text-xs font-medium text-zinc-400 mb-1.5">Website URL</label>
          <input v-model="websiteUrl" type="url" class="w-full px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm focus:outline-none focus:border-vex-primary/50 focus:ring-1 focus:ring-vex-primary/25" placeholder="https://..." />
        </div>
      </div>

      <!-- Looking for -->
      <div>
        <label class="block text-xs font-medium text-zinc-400 mb-1.5">Looking For (select roles)</label>
        <div class="flex flex-wrap gap-2">
          <label v-for="role in roleOptions" :key="role" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-colors" :class="lookingFor.includes(role) ? 'border-sky-500/40 bg-sky-500/10 text-sky-400' : 'border-vex-border bg-vex-bg-card text-zinc-500 hover:text-zinc-300'">
            <input type="checkbox" :value="role" v-model="lookingFor" class="sr-only" />
            {{ role }}
          </label>
        </div>
      </div>

      <!-- Tags -->
      <div>
        <label class="block text-xs font-medium text-zinc-400 mb-1.5">Tags (comma-separated)</label>
        <input v-model="tags" type="text" class="w-full px-3 py-2 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm focus:outline-none focus:border-vex-primary/50 focus:ring-1 focus:ring-vex-primary/25" placeholder="async, networking, http" />
      </div>

      <!-- Milestones -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-xs font-medium text-zinc-400">Milestones</label>
          <button type="button" class="inline-flex items-center gap-1 text-xs text-vex-primary hover:text-vex-primary-light transition-colors cursor-pointer" @click="addMilestone">
            <Plus class="w-3 h-3" /> Add
          </button>
        </div>
        <div class="space-y-2">
          <div v-for="(ms, idx) in milestones" :key="idx" class="flex items-center gap-2">
            <button type="button" class="flex-shrink-0 cursor-pointer" @click="toggleMilestone(idx)">
              <CheckCircle2 v-if="ms.completed" class="w-4 h-4 text-green-500" />
              <Circle v-else class="w-4 h-4 text-zinc-600 hover:text-zinc-400" />
            </button>
            <input v-model="ms.title" type="text" class="flex-1 px-3 py-1.5 rounded-lg border border-vex-border bg-vex-bg-card text-white text-sm focus:outline-none focus:border-vex-primary/50" placeholder="Milestone title" />
            <button type="button" class="p-1 text-zinc-600 hover:text-red-400 transition-colors cursor-pointer" @click="removeMilestone(idx)">
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p v-if="milestones.length === 0" class="text-xs text-zinc-600 mt-1">No milestones yet. Add some to track progress.</p>
      </div>

      <!-- Submit -->
      <div class="flex items-center gap-3 pt-2">
        <button type="submit" :disabled="saving" class="px-6 py-2.5 rounded-lg bg-vex-primary text-white text-sm font-medium hover:bg-vex-primary-dim transition-colors disabled:opacity-50 cursor-pointer">
          {{ saving ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project' }}
        </button>
        <router-link to="/dashboard/projects" class="px-4 py-2.5 rounded-lg border border-vex-border text-sm text-vex-text-muted hover:text-white transition-colors">Cancel</router-link>
      </div>
    </form>
  </div>
</template>
