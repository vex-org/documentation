<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/client'

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
      <router-link v-for="p in posts" :key="p.id" :to="`/dashboard/posts/${p.id}/edit`" class="flex items-center gap-3 p-4 rounded-xl border border-vex-border bg-vex-surface hover:border-vex-primary/50 transition-all group">
        <span class="flex-1 text-white group-hover:text-vex-primary transition-colors">{{ p.title }}</span>
        <span :class="['text-xs px-2 py-0.5 rounded-full font-medium', p.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400']">{{ p.status }}</span>
        <span class="text-sm text-vex-text-muted">{{ p.published_at ? new Date(p.published_at).toLocaleDateString() : 'Draft' }}</span>
      </router-link>
    </div>
    <div v-else class="text-center py-12">
      <div class="text-4xl mb-3">📝</div>
      <p class="text-vex-text-muted">No posts yet.</p>
    </div>
  </div>
</template>
