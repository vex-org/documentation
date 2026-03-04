<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase/client'
import { Rss } from 'lucide-vue-next'
import NewsletterComponent from '../components/NewsletterComponent.vue'

const route = useRoute()
interface AuthorRow { display_name: string | null; username: string | null }
interface PostWithTags { id: string; title: string; slug: string; excerpt: string | null; body_md: string; published_at: string; cover_image_path: string | null; post_tags: { tag: string }[]; author?: AuthorRow | null }
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
  const { data } = await supabase.from('posts').select('id, title, slug, excerpt, body_md, published_at, cover_image_path, post_tags(tag), author:profiles!author_id(display_name, username)').eq('status', 'published').order('published_at', { ascending: false })
  posts.value = (data ?? []) as unknown as PostWithTags[]
  loading.value = false
})

function setTag(tag: string | null) { selectedTag.value = tag }
function authorLabel(a: AuthorRow | AuthorRow[] | undefined | null): string {
  const one = Array.isArray(a) ? a[0] : a
  return one?.display_name || one?.username || 'Anonymous'
}
function readingTime(body: string): number {
  return Math.max(1, Math.ceil((body || '').split(/\s+/).length / 200))
}
function coverUrl(path: string | null): string | null {
  if (!path) return null
  return supabase.storage.from('blog-images').getPublicUrl(path).data.publicUrl
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <div class="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white mb-1">Blog</h1>
        <p class="text-sm text-vex-text-muted">Updates, tutorials, and insights from the Vex team.</p>
      </div>
      <a href="/feed.xml" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-medium text-vex-text-muted hover:text-white transition-colors">
        <Rss class="w-3.5 h-3.5" />
        RSS
      </a>
    </div>

    <!-- Tag filters -->
    <div v-if="tags.length" class="flex flex-wrap gap-2 mb-8">
      <button
        type="button"
        :class="['px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer', !selectedTag ? 'bg-vex-primary/10 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-vex-surface-light']"
        @click="setTag(null)"
      >All</button>
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        :class="['px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer', selectedTag === tag ? 'bg-vex-primary/10 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-vex-surface-light']"
        @click="setTag(tag)"
      >{{ tag }}</button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-6 h-6 border-2 border-vex-border border-t-vex-primary rounded-full animate-spin"></div>
    </div>

    <!-- Posts -->
    <div v-else-if="filteredPosts.length" class="space-y-1">
      <router-link
        v-for="(post, i) in filteredPosts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="group block"
      >
        <!-- Featured (first post) -->
        <article v-if="i === 0 && !selectedTag" class="p-6 rounded-xl border border-vex-border bg-vex-bg-card hover:bg-vex-bg-card-hover transition-colors mb-6">
          <div class="flex flex-col sm:flex-row gap-5">
            <div v-if="coverUrl(post.cover_image_path)" class="sm:w-48 flex-shrink-0">
              <img :src="coverUrl(post.cover_image_path)!" :alt="post.title" class="w-full h-32 sm:h-full rounded-lg object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2">
                <span v-for="t in (post.post_tags || []).slice(0, 2)" :key="t.tag" class="text-[10px] px-1.5 py-0.5 rounded bg-vex-surface-light text-vex-text-muted uppercase tracking-wider font-medium">{{ t.tag }}</span>
              </div>
              <h2 class="text-xl font-semibold text-white group-hover:text-vex-primary transition-colors mb-2 leading-snug">{{ post.title }}</h2>
              <p v-if="post.excerpt" class="text-sm text-vex-text-muted line-clamp-2 mb-3">{{ post.excerpt }}</p>
              <div class="flex items-center gap-3 text-xs text-vex-text-muted">
                <span>{{ authorLabel(post.author) }}</span>
                <span class="text-vex-border">&middot;</span>
                <time>{{ new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</time>
                <span class="text-vex-border">&middot;</span>
                <span>{{ readingTime(post.body_md) }} min read</span>
              </div>
            </div>
          </div>
        </article>

        <!-- Regular post -->
        <article v-else class="flex items-center gap-4 py-4 border-b border-vex-border last:border-0 hover:bg-vex-bg-card/50 -mx-3 px-3 rounded-lg transition-colors">
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-medium text-white group-hover:text-vex-primary transition-colors mb-1 leading-snug">{{ post.title }}</h3>
            <div class="flex items-center gap-2 text-xs text-vex-text-muted">
              <time>{{ new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}</time>
              <span class="text-vex-border">&middot;</span>
              <span>{{ readingTime(post.body_md) }} min</span>
              <template v-if="(post.post_tags || []).length">
                <span class="text-vex-border">&middot;</span>
                <span v-for="t in (post.post_tags || []).slice(0, 1)" :key="t.tag">{{ t.tag }}</span>
              </template>
            </div>
          </div>
          <svg class="w-4 h-4 text-vex-text-muted/50 group-hover:text-vex-primary transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </article>
      </router-link>
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-20">
      <p class="text-sm text-vex-text-muted">No posts yet. Check back soon.</p>
    </div>

    <!-- Newsletter -->
    <div class="mt-20">
      <NewsletterComponent />
    </div>
  </div>
</template>
