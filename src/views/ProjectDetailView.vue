<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase/client'
import { useSEO } from '../composables/useSEO'
import AppLayout from '../components/AppLayout.vue'
import { Users, GitBranch, ExternalLink, CheckCircle2, Circle, UserPlus, UserMinus, Github } from 'lucide-vue-next'

interface ProjectDetail {
  id: string; name: string; slug: string; tagline: string | null; description: string | null
  github_url: string | null; website_url: string | null; status: string; category: string
  looking_for: string[]; owner_id: string; created_at: string
}
interface MilestoneRow { id: string; title: string; completed: boolean; sort_order: number }
interface MemberRow { id: string; user_id: string; role: string; joined_at: string; profile?: { display_name: string; username: string; avatar_url: string | null } }

const route = useRoute()
const project = ref<ProjectDetail | null>(null)
const milestones = ref<MilestoneRow[]>([])
const members = ref<MemberRow[]>([])
const tags = ref<string[]>([])
const owner = ref<{ display_name: string; username: string; avatar_url: string | null } | null>(null)
const loading = ref(true)
const userId = ref<string | null>(null)
const joining = ref(false)

const statusLabels: Record<string, string> = { idea: 'Idea', prototype: 'Prototype', alpha: 'Alpha', beta: 'Beta', stable: 'Stable', archived: 'Archived' }
const statusColors: Record<string, string> = {
  idea: 'bg-violet-500/15 text-violet-400', prototype: 'bg-amber-500/15 text-amber-400',
  alpha: 'bg-sky-500/15 text-sky-400', beta: 'bg-emerald-500/15 text-emerald-400',
  stable: 'bg-green-500/15 text-green-400', archived: 'bg-zinc-500/15 text-zinc-400',
}
const categoryLabels: Record<string, string> = {
  library: 'Library', 'compiler-plugin': 'Compiler Plugin', web: 'Web', embedded: 'Embedded',
  ml: 'ML / AI', game: 'Game', devtools: 'Dev Tools', cli: 'CLI', database: 'Database',
  networking: 'Networking', other: 'Other'
}

const isOwner = computed(() => userId.value && project.value?.owner_id === userId.value)
const isMember = computed(() => members.value.some(m => m.user_id === userId.value))
const progress = computed(() => {
  if (!milestones.value.length) return 0
  const done = milestones.value.filter(m => m.completed).length
  return Math.round((done / milestones.value.length) * 100)
})

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  userId.value = user?.id ?? null

  const slug = route.params.slug as string
  const { data: proj } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!proj) { loading.value = false; return }
  project.value = proj
  useSEO({
    title: proj.name,
    description: proj.tagline || proj.description?.slice(0, 155) || `${proj.name} – a Vex community project.`,
  })

  const [ownerRes, membersRes, msRes, tagsRes] = await Promise.all([
    supabase.from('profiles').select('display_name, username, avatar_url').eq('id', proj.owner_id).single(),
    supabase.from('project_members').select('id, user_id, role, joined_at').eq('project_id', proj.id).order('joined_at'),
    supabase.from('project_milestones').select('id, title, completed, sort_order').eq('project_id', proj.id).order('sort_order'),
    supabase.from('project_tags').select('tag').eq('project_id', proj.id),
  ])

  owner.value = ownerRes.data
  milestones.value = msRes.data ?? []
  tags.value = (tagsRes.data ?? []).map(t => t.tag)

  // Enrich members with profile data
  const memberData = membersRes.data ?? []
  if (memberData.length) {
    const memberIds = memberData.map(m => m.user_id)
    const { data: profiles } = await supabase.from('profiles').select('id, display_name, username, avatar_url').in('id', memberIds)
    const profileMap = new Map((profiles ?? []).map(p => [p.id, p]))
    members.value = memberData.map(m => ({ ...m, profile: profileMap.get(m.user_id) }))
  }

  loading.value = false
})

async function joinProject() {
  if (!userId.value || !project.value) return
  joining.value = true
  const { error } = await supabase.from('project_members').insert({
    project_id: project.value.id,
    user_id: userId.value,
    role: 'interested',
  })
  if (!error) {
    const { data: profile } = await supabase.from('profiles').select('display_name, username, avatar_url').eq('id', userId.value).single()
    members.value.push({
      id: crypto.randomUUID(),
      user_id: userId.value!,
      role: 'interested',
      joined_at: new Date().toISOString(),
      profile: profile ?? undefined,
    })
  }
  joining.value = false
}

async function leaveProject() {
  if (!userId.value || !project.value) return
  joining.value = true
  await supabase.from('project_members').delete().eq('project_id', project.value.id).eq('user_id', userId.value)
  members.value = members.value.filter(m => m.user_id !== userId.value)
  joining.value = false
}

function roleLabel(role: string): string {
  return role === 'owner' ? 'Owner' : role === 'contributor' ? 'Contributor' : 'Interested'
}
function roleColor(role: string): string {
  return role === 'owner' ? 'text-amber-400' : role === 'contributor' ? 'text-sky-400' : 'text-zinc-400'
}
</script>

<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="w-6 h-6 border-2 border-vex-border border-t-vex-primary rounded-full animate-spin"></div>
      </div>

      <!-- Not found -->
      <div v-else-if="!project" class="text-center py-16">
        <GitBranch class="w-10 h-10 text-zinc-600 mx-auto mb-3" />
        <p class="text-vex-text-muted text-lg">Project not found.</p>
        <router-link to="/projects" class="inline-block mt-4 text-vex-primary text-sm hover:underline">Back to projects</router-link>
      </div>

      <template v-else>
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-2xl font-bold text-white">{{ project.name }}</h1>
                <span :class="statusColors[project.status]" class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">{{ statusLabels[project.status] }}</span>
              </div>
              <p v-if="project.tagline" class="text-vex-text-muted">{{ project.tagline }}</p>
            </div>
            <!-- Actions -->
            <div class="flex items-center gap-2 flex-shrink-0">
              <router-link v-if="isOwner" :to="`/dashboard/projects/${project.slug}/edit`" class="px-3 py-1.5 rounded-lg border border-vex-border text-sm text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors">Edit</router-link>
              <button v-else-if="userId && !isMember" :disabled="joining" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-vex-primary text-white text-sm font-medium hover:bg-vex-primary-dim transition-colors disabled:opacity-50 cursor-pointer" @click="joinProject">
                <UserPlus class="w-3.5 h-3.5" /> Join
              </button>
              <button v-else-if="userId && isMember && !isOwner" :disabled="joining" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-vex-border text-sm text-vex-text-muted hover:text-red-400 hover:border-red-500/30 transition-colors disabled:opacity-50 cursor-pointer" @click="leaveProject">
                <UserMinus class="w-3.5 h-3.5" /> Leave
              </button>
            </div>
          </div>

          <!-- Meta row -->
          <div class="flex flex-wrap items-center gap-3 mt-4 text-xs text-zinc-500">
            <span class="bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">{{ categoryLabels[project.category] || project.category }}</span>
            <span v-for="tag in tags" :key="tag" class="bg-zinc-800/50 px-2 py-0.5 rounded text-zinc-500">#{{ tag }}</span>
            <a v-if="project.github_url" :href="project.github_url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors">
              <Github class="w-3.5 h-3.5" /> Repository
            </a>
            <a v-if="project.website_url" :href="project.website_url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors">
              <ExternalLink class="w-3.5 h-3.5" /> Website
            </a>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Description -->
            <section v-if="project.description">
              <h2 class="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">About</h2>
              <div class="prose-vex text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{{ project.description }}</div>
            </section>

            <!-- Looking for -->
            <section v-if="project.looking_for?.length">
              <h2 class="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Looking For</h2>
              <div class="flex flex-wrap gap-2">
                <span v-for="role in project.looking_for" :key="role" class="px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-400 text-sm border border-sky-500/20">{{ role }}</span>
              </div>
            </section>

            <!-- Milestones -->
            <section>
              <div class="flex items-center justify-between mb-3">
                <h2 class="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Milestones</h2>
                <span v-if="milestones.length" class="text-xs text-zinc-500">{{ progress }}% complete</span>
              </div>
              <!-- Progress bar -->
              <div v-if="milestones.length" class="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-4">
                <div class="h-full bg-vex-primary rounded-full transition-all" :style="{ width: progress + '%' }"></div>
              </div>
              <div v-if="milestones.length" class="space-y-2">
                <div v-for="ms in milestones" :key="ms.id" class="flex items-center gap-2.5 py-1.5">
                  <CheckCircle2 v-if="ms.completed" class="w-4 h-4 text-green-500 flex-shrink-0" />
                  <Circle v-else class="w-4 h-4 text-zinc-600 flex-shrink-0" />
                  <span :class="ms.completed ? 'text-zinc-500 line-through' : 'text-zinc-300'" class="text-sm">{{ ms.title }}</span>
                </div>
              </div>
              <p v-else class="text-xs text-zinc-600">No milestones defined yet.</p>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Owner -->
            <section>
              <h2 class="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Created by</h2>
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0">
                  <img v-if="owner?.avatar_url" :src="owner.avatar_url" :alt="owner.display_name" class="w-full h-full object-cover" />
                </div>
                <div>
                  <div class="text-sm text-white font-medium">{{ owner?.display_name || owner?.username || 'Unknown' }}</div>
                  <div v-if="owner?.username" class="text-xs text-zinc-500">@{{ owner.username }}</div>
                </div>
              </div>
            </section>

            <!-- Team -->
            <section>
              <h2 class="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Team <span class="text-zinc-600 font-normal">({{ members.length }})</span>
              </h2>
              <div v-if="members.length" class="space-y-2.5">
                <div v-for="member in members" :key="member.id" class="flex items-center gap-2.5">
                  <div class="w-6 h-6 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0">
                    <img v-if="member.profile?.avatar_url" :src="member.profile.avatar_url" :alt="member.profile.display_name" class="w-full h-full object-cover" />
                  </div>
                  <span class="text-sm text-zinc-300 flex-1 truncate">{{ member.profile?.display_name || member.profile?.username || 'User' }}</span>
                  <span :class="roleColor(member.role)" class="text-[10px] font-medium uppercase tracking-wider">{{ roleLabel(member.role) }}</span>
                </div>
              </div>
              <p v-else class="text-xs text-zinc-600">No team members yet. Be the first to join!</p>
            </section>

            <!-- Quick info -->
            <section class="p-4 rounded-lg border border-vex-border bg-vex-bg-card">
              <div class="space-y-2.5 text-xs">
                <div class="flex justify-between"><span class="text-zinc-500">Status</span><span class="text-zinc-300">{{ statusLabels[project.status] }}</span></div>
                <div class="flex justify-between"><span class="text-zinc-500">Category</span><span class="text-zinc-300">{{ categoryLabels[project.category] || project.category }}</span></div>
                <div class="flex justify-between"><span class="text-zinc-500">Created</span><span class="text-zinc-300">{{ new Date(project.created_at).toLocaleDateString() }}</span></div>
              </div>
            </section>
          </div>
        </div>
      </template>
    </div>
  </AppLayout>
</template>
