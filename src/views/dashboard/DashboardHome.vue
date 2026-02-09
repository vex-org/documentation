<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/client'
import { FileText, Package, Eye, TrendingUp, PenSquare, Rocket } from 'lucide-vue-next'

const postCount = ref(0)
const publishedCount = ref(0)
const draftCount = ref(0)
const pkgCount = ref(0)
const totalClaps = ref(0)
const totalComments = ref(0)
const loading = ref(true)
const displayName = ref('')

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Fetch profile name
  const profilePromise = supabase.from('profiles').select('display_name, username').eq('id', user.id).single()

  // Parallelize all stat queries
  const [postsRes, pkgsRes, profileRes] = await Promise.all([
    supabase.from('posts').select('id, status').eq('author_id', user.id),
    supabase.from('packages').select('id', { count: 'exact', head: true }).eq('owner_id', user.id),
    profilePromise,
  ])

  const posts = postsRes.data ?? []
  postCount.value = posts.length
  publishedCount.value = posts.filter(p => p.status === 'published').length
  draftCount.value = posts.filter(p => p.status === 'draft').length
  pkgCount.value = pkgsRes.count ?? 0
  displayName.value = profileRes.data?.display_name || profileRes.data?.username || user.email?.split('@')[0] || 'there'

  // Get clap + comment counts for user's posts
  if (posts.length) {
    const postIds = posts.map(p => p.id)
    const [clapsRes, commentsRes] = await Promise.all([
      supabase.from('post_claps').select('*', { count: 'exact', head: true }).in('post_id', postIds),
      supabase.from('comments').select('*', { count: 'exact', head: true }).in('post_id', postIds),
    ])
    totalClaps.value = clapsRes.count ?? 0
    totalComments.value = commentsRes.count ?? 0
  }
  loading.value = false
})
</script>

<template>
  <div>
    <!-- Welcome -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-white mb-1">Welcome back<span v-if="displayName">, {{ displayName }}</span></h1>
      <p class="text-vex-text-muted text-sm">Here's an overview of your content.</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-6 h-6 border-2 border-vex-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <!-- Stats grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="p-4 rounded-xl border border-vex-border bg-vex-bg-card">
          <div class="flex items-center gap-2 text-vex-text-muted text-xs font-medium uppercase tracking-wider mb-2">
            <FileText class="w-3.5 h-3.5" /> Posts
          </div>
          <div class="text-2xl font-bold text-white">{{ postCount }}</div>
          <div class="text-xs text-vex-text-muted mt-1">{{ publishedCount }} published · {{ draftCount }} drafts</div>
        </div>
        <div class="p-4 rounded-xl border border-vex-border bg-vex-bg-card">
          <div class="flex items-center gap-2 text-vex-text-muted text-xs font-medium uppercase tracking-wider mb-2">
            <Package class="w-3.5 h-3.5" /> Packages
          </div>
          <div class="text-2xl font-bold text-white">{{ pkgCount }}</div>
        </div>
        <div class="p-4 rounded-xl border border-vex-border bg-vex-bg-card">
          <div class="flex items-center gap-2 text-vex-text-muted text-xs font-medium uppercase tracking-wider mb-2">
            <TrendingUp class="w-3.5 h-3.5" /> Claps
          </div>
          <div class="text-2xl font-bold text-white">{{ totalClaps }}</div>
        </div>
        <div class="p-4 rounded-xl border border-vex-border bg-vex-bg-card">
          <div class="flex items-center gap-2 text-vex-text-muted text-xs font-medium uppercase tracking-wider mb-2">
            <Eye class="w-3.5 h-3.5" /> Comments
          </div>
          <div class="text-2xl font-bold text-white">{{ totalComments }}</div>
        </div>
      </div>

      <!-- Quick actions -->
      <h2 class="text-lg font-semibold text-white mb-4">Quick Actions</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <router-link to="/dashboard/posts/new" class="group flex items-center gap-4 p-5 rounded-xl border border-vex-border bg-vex-bg-card hover:bg-vex-bg-card-hover hover:border-vex-primary/30 transition-all">
          <div class="w-10 h-10 rounded-lg bg-vex-primary/10 flex items-center justify-center">
            <PenSquare class="w-5 h-5 text-vex-primary" />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white group-hover:text-vex-accent transition-colors">Write a Post</h3>
            <p class="text-xs text-vex-text-muted mt-0.5">Create a new blog post</p>
          </div>
        </router-link>
        <router-link to="/dashboard/packages/new" class="group flex items-center gap-4 p-5 rounded-xl border border-vex-border bg-vex-bg-card hover:bg-vex-bg-card-hover hover:border-vex-primary/30 transition-all">
          <div class="w-10 h-10 rounded-lg bg-vex-primary/10 flex items-center justify-center">
            <Rocket class="w-5 h-5 text-vex-primary" />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white group-hover:text-vex-accent transition-colors">Publish Package</h3>
            <p class="text-xs text-vex-text-muted mt-0.5">Share a new Vex package</p>
          </div>
        </router-link>
      </div>
    </template>
  </div>
</template>
