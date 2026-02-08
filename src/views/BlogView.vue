<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase/client'

const route = useRoute()
interface AuthorRow {
  display_name: string | null
  username: string | null
}
interface PostWithTags {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string
  post_tags: { tag: string }[]
  author?: AuthorRow | null
}
const posts = ref<PostWithTags[]>([])
const loading = ref(true)
const selectedTag = ref<string | null>((route.query.tag as string) || null)

const tags = computed(() => {
  const set = new Set<string>()
  for (const p of posts.value)
    for (const t of p.post_tags || []) set.add(t.tag)
  return [...set].sort()
})

const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts.value
  return posts.value.filter((p) => (p.post_tags || []).some((t) => t.tag === selectedTag.value))
})

onMounted(async () => {
  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, published_at, post_tags(tag), author:profiles!author_id(display_name, username)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  posts.value = (data ?? []) as unknown as PostWithTags[]
  loading.value = false
})

function setTag(tag: string | null) {
  selectedTag.value = tag
}
function authorLabel(a: AuthorRow | AuthorRow[] | undefined | null): string {
  const one = Array.isArray(a) ? a[0] : a
  if (!one) return ''
  return one.display_name || one.username || 'Anonymous'
}
</script>

<template>
  <div class="blog">
    <h1>Blog</h1>
    <div v-if="tags.length" class="tag-filter">
      <button type="button" :class="{ active: !selectedTag }" @click="setTag(null)">All</button>
      <button v-for="tag in tags" :key="tag" type="button" :class="{ active: selectedTag === tag }" @click="setTag(tag)">{{ tag }}</button>
    </div>
    <p v-if="loading">Loading…</p>
    <ul v-else-if="filteredPosts.length" class="list">
      <li v-for="post in filteredPosts" :key="post.id">
        <router-link :to="`/blog/${post.slug}`">{{ post.title }}</router-link>
        <time :datetime="post.published_at">{{ new Date(post.published_at).toLocaleDateString() }}</time>
        <span v-if="post.author" class="author"> · {{ authorLabel(post.author) }}</span>
        <p v-if="post.excerpt" class="excerpt">{{ post.excerpt }}</p>
      </li>
    </ul>
    <p v-else>No posts yet.</p>
  </div>
</template>

<style scoped>
.blog h1 { margin-bottom: 1rem; }
.tag-filter { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.tag-filter button { padding: 0.25rem 0.5rem; border: 1px solid var(--border, #e2e8f0); border-radius: 4px; background: var(--bg, #fff); cursor: pointer; }
.tag-filter button.active { background: var(--text, #0f172a); color: var(--bg, #fff); border-color: var(--text, #0f172a); }
.list { list-style: none; padding: 0; margin: 0; }
.list li { padding: 1rem 0; border-bottom: 1px solid var(--border, #e2e8f0); }
.list a { font-weight: 600; color: var(--text, #0f172a); text-decoration: none; }
.list time { color: var(--text-muted, #64748b); font-size: 0.875rem; margin-left: 0.5rem; }
.list .author { color: var(--text-muted, #64748b); font-size: 0.875rem; font-style: italic; }
.excerpt { color: var(--text-muted, #64748b); margin-top: 0.25rem; font-size: 0.9rem; }
</style>
