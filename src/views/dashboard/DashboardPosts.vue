<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/client'

interface PostRow {
  id: string
  title: string
  slug: string
  status: string
  published_at: string | null
  created_at: string
}
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
    <h1>My Posts</h1>
    <p><router-link to="/dashboard/posts/new">New post</router-link></p>
    <p v-if="loading">Loading…</p>
    <ul v-else-if="posts.length" class="list">
      <li v-for="p in posts" :key="p.id">
        <router-link :to="`/dashboard/posts/${p.id}/edit`">{{ p.title }}</router-link>
        <span class="badge">{{ p.status }}</span>
        <span class="date">{{ p.published_at ? new Date(p.published_at).toLocaleDateString() : 'Draft' }}</span>
      </li>
    </ul>
    <p v-else>No posts yet.</p>
  </div>
</template>

<style scoped>
.list { list-style: none; padding: 0; }
.list li { padding: 0.5rem 0; border-bottom: 1px solid var(--border, #e2e8f0); display: flex; align-items: center; gap: 0.5rem; }
.badge { font-size: 0.75rem; padding: 0.125rem 0.375rem; background: var(--bg-code, #f1f5f9); border-radius: 4px; }
.date { color: var(--text-muted, #64748b); font-size: 0.875rem; }
</style>
