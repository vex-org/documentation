<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/client'
import { Trash2, FileText } from 'lucide-vue-next'

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
      <div>
        <h1 class="text-xl font-bold text-white">Posts</h1>
        <p v-if="!loading" class="text-xs text-zinc-500 mt-0.5">{{ posts.length }} total</p>
      </div>
      <router-link to="/dashboard/posts/new" class="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors">+ New post</router-link>
    </div>
    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-5 h-5 border-2 border-zinc-700 border-t-sky-500 rounded-full animate-spin"></div>
    </div>
    <div v-else-if="posts.length" class="space-y-1.5">
      <div v-for="p in posts" :key="p.id" class="flex items-center gap-3 px-4 py-3 rounded-lg border border-zinc-800/50 hover:bg-zinc-800/30 transition-all group">
        <router-link :to="`/dashboard/posts/${p.id}/edit`" class="flex-1 text-sm text-zinc-300 group-hover:text-white transition-colors truncate">{{ p.title }}</router-link>
        <span :class="['text-[10px] px-1.5 py-0.5 rounded font-medium', p.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500']">{{ p.status }}</span>
        <span class="text-[11px] text-zinc-600 w-20 text-right">{{ p.published_at ? new Date(p.published_at).toLocaleDateString() : 'Draft' }}</span>
        <button type="button" class="p-1.5 rounded-lg text-zinc-700 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer opacity-0 group-hover:opacity-100" title="Delete post" @click.prevent="deletePost(p.id, p.title)">
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>
    <div v-else class="text-center py-16">
      <FileText class="w-8 h-8 text-zinc-700 mx-auto mb-2" />
      <p class="text-sm text-zinc-500 mb-3">No posts yet.</p>
      <router-link to="/dashboard/posts/new" class="text-sky-500 text-sm hover:underline">Write your first post</router-link>
    </div>
  </div>
</template>
