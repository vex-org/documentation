<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase/client'
import { PenLine } from 'lucide-vue-next'

const route = useRoute()
interface AuthorRow { display_name: string | null; username: string | null }
interface PostWithTags { id: string; title: string; slug: string; excerpt: string | null; published_at: string; post_tags: { tag: string }[]; author?: AuthorRow | null }
const posts = ref<PostWithTags[]>([])
const loading = ref(true)
const selectedTag = ref<string | null>((route.query.tag as string) || null)

const tags = computed(() => {
  const set = new Set<string>()
  for (const p of posts.value) for (const t of p.post_tags || []) set.add(t.tag)
  return [...set].sort()
})
const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts.value
  return posts.value.filter((p) => (p.post_tags || []).some((t) => t.tag === selectedTag.value))
})

onMounted(async () => {
  const { data } = await supabase.from('posts').select('id, title, slug, excerpt, published_at, post_tags(tag), author:profiles!author_id(display_name, username)').eq('status', 'published').order('published_at', { ascending: false })
  posts.value = (data ?? []) as unknown as PostWithTags[]
  loading.value = false
})

function setTag(tag: string | null) { selectedTag.value = tag }
function authorLabel(a: AuthorRow | AuthorRow[] | undefined | null): string {
  const one = Array.isArray(a) ? a[0] : a
  return one?.display_name || one?.username || 'Anonymous'
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Blog</h1>
      <p class="text-vex-text-muted">Updates, tutorials, and insights from the Vex team</p>
    </div>

    <!-- Tag filters -->
    <div v-if="tags.length" class="flex flex-wrap gap-2 mb-8">
      <button
        type="button"
        :class="['px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer', !selectedTag ? 'bg-vex-primary text-white' : 'border border-vex-border text-vex-text-muted hover:text-white hover:border-vex-primary/50']"
        @click="setTag(null)"
      >All</button>
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        :class="['px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer', selectedTag === tag ? 'bg-vex-primary text-white' : 'border border-vex-border text-vex-text-muted hover:text-white hover:border-vex-primary/50']"
        @click="setTag(tag)"
      >{{ tag }}</button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-vex-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Posts -->
    <div v-else-if="filteredPosts.length" class="grid gap-4">
      <router-link
        v-for="post in filteredPosts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="group block p-6 rounded-xl border border-vex-border bg-vex-bg-card hover:bg-vex-bg-card-hover hover:border-vex-primary/30 transition-all"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <h3 class="text-lg font-semibold text-white group-hover:text-vex-accent transition-colors mb-1">{{ post.title }}</h3>
            <p v-if="post.excerpt" class="text-sm text-vex-text-muted line-clamp-2 mb-2">{{ post.excerpt }}</p>
            <div class="flex items-center gap-3 text-xs text-vex-text-muted">
              <time :datetime="post.published_at">{{ new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
              <span>·</span>
              <span>{{ authorLabel(post.author) }}</span>
            </div>
          </div>
          <svg class="w-5 h-5 text-vex-text-muted group-hover:text-vex-accent transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </div>
      </router-link>
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-20">
      <div class="w-14 h-14 rounded-xl bg-vex-primary/10 flex items-center justify-center mx-auto mb-4">
        <PenLine class="w-7 h-7 text-vex-text-muted" />
      </div>
      <p class="text-vex-text-muted">No posts yet. Check back soon!</p>
    </div>
  </div>
</template>
