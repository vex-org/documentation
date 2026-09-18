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
  <div class="workspace-page">
    <header class="workspace-heading">
      <div>
        <p class="page-eyebrow">Workspace / Overview</p>
        <h1>{{ displayName ? 'Welcome back, ' + displayName : 'Your workspace' }}</h1>
        <p>Your writing, packages, and projects. All in one place.</p>
      </div>
      <router-link to="/dashboard/posts/new" class="ui-button ui-button-primary"><PenSquare :size="16" /> New post</router-link>
    </header>

    <div v-if="loading" class="workspace-loading" role="status" aria-label="Loading workspace">
      <div v-for="n in 4" :key="n" class="skeleton-card"><span></span><strong></strong><span></span></div>
      <p>Loading your workspace…</p>
    </div>
    <template v-else>
      <div class="metric-grid">
        <router-link to="/dashboard/posts" class="metric-card">
          <div><span>Posts</span><FileText :size="18" /></div>
          <strong>{{ stats.posts }}</strong>
          <p>{{ stats.published }} published <span>·</span> {{ stats.drafts }} {{ stats.drafts === 1 ? 'draft' : 'drafts' }}</p>
        </router-link>
        <router-link to="/dashboard/packages" class="metric-card">
          <div><span>Packages</span><Package :size="18" /></div>
          <strong>{{ stats.packages }}</strong>
          <p>Libraries you maintain</p>
        </router-link>
        <router-link to="/dashboard/projects" class="metric-card">
          <div><span>Projects</span><GitBranch :size="18" /></div>
          <strong>{{ stats.projects }}</strong>
          <p>Ideas you're building</p>
        </router-link>
        <div class="metric-card">
          <div><span>Claps</span><Heart :size="18" /></div>
          <strong>{{ stats.claps }}</strong>
          <p>{{ stats.comments }} comments on your posts</p>
        </div>
      </div>

      <div class="workspace-overview-grid">
        <section class="workspace-panel">
          <header class="panel-heading">
            <div><h2>Recent writing</h2><p>Pick up where you left off.</p></div>
            <router-link to="/dashboard/posts" class="ui-text-link">View all <ArrowRight :size="14" /></router-link>
          </header>
          <div v-if="recentPosts.length" class="workspace-recent">
            <router-link v-for="post in recentPosts" :key="post.id" :to="`/dashboard/posts/${post.id}/edit`" class="recent-row">
              <FileText :size="18" class="recent-icon" />
              <div class="recent-title"><strong>{{ post.title }}</strong><span>{{ timeAgo(post.created_at) }}</span></div>
              <span class="status-badge" :class="post.status === 'published' ? 'status-published' : 'status-draft'">{{ post.status }}</span>
              <ArrowRight :size="16" class="recent-arrow" />
            </router-link>
          </div>
          <div v-else class="ui-empty-state">
            <div class="empty-state-icon"><PenSquare :size="24" /></div>
            <h3>Your next idea starts here.</h3>
            <p>Share a tutorial, a discovery, or what you're building with Vex.</p>
            <router-link to="/dashboard/posts/new" class="ui-button ui-button-secondary">Write your first post <ArrowRight :size="15" /></router-link>
          </div>
        </section>

        <section class="workspace-panel">
          <header class="panel-heading"><div><h2>Start something</h2><p>Contribute to the Vex ecosystem.</p></div></header>
          <div class="workspace-actions">
            <router-link to="/dashboard/posts/new" class="workspace-action">
              <span class="action-icon"><PenSquare :size="19" /></span>
              <div><strong>Write a post</strong><span>Share what you've learned.</span></div><ArrowRight :size="16" />
            </router-link>
            <router-link to="/dashboard/packages/new" class="workspace-action">
              <span class="action-icon"><Rocket :size="19" /></span>
              <div><strong>Publish a package</strong><span>Put your library to work.</span></div><ArrowRight :size="16" />
            </router-link>
            <router-link to="/dashboard/projects/new" class="workspace-action">
              <span class="action-icon"><FolderPlus :size="19" /></span>
              <div><strong>Create a project</strong><span>Build something together.</span></div><ArrowRight :size="16" />
            </router-link>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>
