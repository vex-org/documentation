<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/client'
import { Trash2 } from 'lucide-vue-next'

interface PostRow { id: string; title: string; slug: string; status: string; published_at: string | null; created_at: string }
const posts = ref<PostRow[]>([])
const loading = ref(true)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data } = await supabase.from('posts').select('id, title, slug, status, published_at, created_at').eq('author_id', user.id).order('created_at', { ascending: false })
  posts.value = data ?? []
  loading.value = false
})

async function deletePost(postId: string, title: string) {
  if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
  // Delete related data first, then the post
  await Promise.all([
    supabase.from('post_tags').delete().eq('post_id', postId),
    supabase.from('post_claps').delete().eq('post_id', postId),
    supabase.from('comments').delete().eq('post_id', postId),
  ])
  const { error } = await supabase.from('posts').delete().eq('id', postId)
  if (!error) posts.value = posts.value.filter(p => p.id !== postId)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-white">My Posts</h1>
      <router-link to="/dashboard/posts/new" class="px-4 py-2 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white text-sm font-medium transition-all">+ New post</router-link>
    </div>
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-6 h-6 border-2 border-vex-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else-if="posts.length" class="space-y-2">
      <div v-for="p in posts" :key="p.id" class="flex items-center gap-3 p-4 rounded-xl border border-vex-border bg-vex-surface hover:border-vex-primary/50 transition-all group">
        <router-link :to="`/dashboard/posts/${p.id}/edit`" class="flex-1 text-white group-hover:text-vex-primary transition-colors">{{ p.title }}</router-link>
        <span :class="['text-xs px-2 py-0.5 rounded-full font-medium', p.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400']">{{ p.status }}</span>
        <span class="text-sm text-vex-text-muted">{{ p.published_at ? new Date(p.published_at).toLocaleDateString() : 'Draft' }}</span>
        <button type="button" class="p-1.5 rounded-lg text-vex-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer opacity-0 group-hover:opacity-100" title="Delete post" @click.prevent="deletePost(p.id, p.title)">
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <div class="w-12 h-12 rounded-xl bg-vex-primary/10 flex items-center justify-center mx-auto mb-3">
        <svg class="w-6 h-6 text-vex-text-muted" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
      </div>
      <p class="text-vex-text-muted">No posts yet.</p>
    </div>
  </div>
</template>
