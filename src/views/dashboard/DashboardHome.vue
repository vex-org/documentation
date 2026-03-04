<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/client'
import { FileText, Package, GitBranch, Heart, PenSquare, Rocket, FolderPlus, ArrowRight } from 'lucide-vue-next'

const stats = ref({ posts: 0, published: 0, drafts: 0, packages: 0, projects: 0, claps: 0, comments: 0 })
const recentPosts = ref<{ id: string; title: string; status: string; created_at: string }[]>([])
const loading = ref(true)
const displayName = ref('')

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const [postsRes, pkgsRes, profileRes, projsRes] = await Promise.all([
    supabase.from('posts').select('id, title, status, created_at').eq('author_id', user.id).order('created_at', { ascending: false }),
    supabase.from('packages').select('id', { count: 'exact', head: true }).eq('owner_id', user.id),
    supabase.from('profiles').select('display_name, username').eq('id', user.id).single(),
    supabase.from('projects').select('id', { count: 'exact', head: true }).eq('owner_id', user.id),
  ])

  const posts = postsRes.data ?? []
  stats.value.posts = posts.length
  stats.value.published = posts.filter(p => p.status === 'published').length
  stats.value.drafts = posts.filter(p => p.status === 'draft').length
  stats.value.packages = pkgsRes.count ?? 0
  stats.value.projects = projsRes.count ?? 0
  displayName.value = profileRes.data?.display_name || profileRes.data?.username || user.email?.split('@')[0] || 'there'
  recentPosts.value = posts.slice(0, 5)

  if (posts.length) {
    const postIds = posts.map(p => p.id)
    const [clapsRes, commentsRes] = await Promise.all([
      supabase.from('post_claps').select('*', { count: 'exact', head: true }).in('post_id', postIds),
      supabase.from('comments').select('*', { count: 'exact', head: true }).in('post_id', postIds),
    ])
    stats.value.claps = clapsRes.count ?? 0
    stats.value.comments = commentsRes.count ?? 0
  }
  loading.value = false
})

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}
</script>

<template>
  <div>
    <!-- Welcome -->
    <div class="mb-8">
      <h1 class="text-xl font-semibold text-white">Welcome back, {{ displayName }}</h1>
      <p class="text-sm text-zinc-500 mt-0.5">Here's what's happening with your content.</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-5 h-5 border-2 border-zinc-700 border-t-sky-500 rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <div class="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Posts</span>
            <FileText class="w-4 h-4 text-zinc-700" />
          </div>
          <p class="text-2xl font-bold text-white">{{ stats.posts }}</p>
          <p class="text-[11px] text-zinc-600 mt-1">{{ stats.published }} published · {{ stats.drafts }} drafts</p>
        </div>
        <div class="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Packages</span>
            <Package class="w-4 h-4 text-zinc-700" />
          </div>
          <p class="text-2xl font-bold text-white">{{ stats.packages }}</p>
        </div>
        <div class="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Projects</span>
            <GitBranch class="w-4 h-4 text-zinc-700" />
          </div>
          <p class="text-2xl font-bold text-white">{{ stats.projects }}</p>
        </div>
        <div class="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Engagement</span>
            <Heart class="w-4 h-4 text-zinc-700" />
          </div>
          <p class="text-2xl font-bold text-white">{{ stats.claps }}</p>
          <p class="text-[11px] text-zinc-600 mt-1">{{ stats.comments }} comments</p>
        </div>
      </div>

      <!-- Recent Posts + Quick Actions -->
      <div class="grid lg:grid-cols-5 gap-6">
        <!-- Recent Posts -->
        <div class="lg:col-span-3">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-zinc-400">Recent Posts</h2>
            <router-link to="/dashboard/posts" class="text-xs text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1">
              View all <ArrowRight class="w-3 h-3" />
            </router-link>
          </div>
          <div v-if="recentPosts.length" class="space-y-1">
            <router-link v-for="post in recentPosts" :key="post.id" :to="`/dashboard/posts/${post.id}/edit`"
              class="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-zinc-800/40 transition-colors group">
              <span class="text-sm text-zinc-300 group-hover:text-white transition-colors truncate mr-3">{{ post.title }}</span>
              <div class="flex items-center gap-2 flex-shrink-0">
                <span :class="['text-[10px] px-1.5 py-0.5 rounded font-medium', post.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500']">{{ post.status }}</span>
                <span class="text-[11px] text-zinc-600 w-14 text-right">{{ timeAgo(post.created_at) }}</span>
              </div>
            </router-link>
          </div>
          <p v-else class="text-sm text-zinc-600 px-3 py-6">No posts yet. Write your first one!</p>
        </div>

        <!-- Quick Actions -->
        <div class="lg:col-span-2">
          <h2 class="text-sm font-semibold text-zinc-400 mb-3">Quick Actions</h2>
          <div class="space-y-2">
            <router-link to="/dashboard/posts/new" class="flex items-center gap-3 px-3 py-3 rounded-lg border border-zinc-800/50 hover:border-sky-500/20 hover:bg-sky-500/5 transition-all group">
              <div class="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                <PenSquare class="w-4 h-4 text-sky-500" />
              </div>
              <div>
                <p class="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">New Post</p>
                <p class="text-[11px] text-zinc-600">Write a blog post</p>
              </div>
            </router-link>
            <router-link to="/dashboard/packages/new" class="flex items-center gap-3 px-3 py-3 rounded-lg border border-zinc-800/50 hover:border-sky-500/20 hover:bg-sky-500/5 transition-all group">
              <div class="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                <Rocket class="w-4 h-4 text-sky-500" />
              </div>
              <div>
                <p class="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Publish Package</p>
                <p class="text-[11px] text-zinc-600">Share a Vex package</p>
              </div>
            </router-link>
            <router-link to="/dashboard/projects/new" class="flex items-center gap-3 px-3 py-3 rounded-lg border border-zinc-800/50 hover:border-sky-500/20 hover:bg-sky-500/5 transition-all group">
              <div class="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                <FolderPlus class="w-4 h-4 text-sky-500" />
              </div>
              <div>
                <p class="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">New Project</p>
                <p class="text-[11px] text-zinc-600">Rally the community</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
