<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { supabase } from '../supabase/client'
import { useSEO, useSEOJsonLd } from '../composables/useSEO'
import CommentItem from '../components/CommentItem.vue'
import {
  Heart, Calendar, Clock, User, Share2, Twitter, LinkIcon,
  MessageSquare, ChevronUp, FileText, ArrowLeft,
} from 'lucide-vue-next'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
interface AuthorRow { display_name: string | null; username: string | null; avatar_url?: string | null }
interface PostRow { id: string; title: string; body_md: string; published_at: string; author_id: string; cover_image_path: string | null; excerpt?: string | null; author?: AuthorRow | null }
interface CommentRow { id: string; body: string; author_id: string; parent_id: string | null; created_at: string; author?: AuthorRow | null }
interface CommentNode extends CommentRow { children: CommentNode[] }

const post = ref<PostRow | null>(null)
const clapCount = ref(0)
const clapped = ref(false)
const commentsFlat = ref<CommentRow[]>([])
const commentTree = ref<CommentNode[]>([])
const loading = ref(true)
const userId = ref<string | null>(null)
const commentBody = ref('')
const replyToId = ref<string | null>(null)
const commentSubmitting = ref(false)
const commentError = ref('')
const showShareMenu = ref(false)
const copied = ref(false)

function buildCommentTree(flat: CommentRow[]): CommentNode[] {
  const byId = new Map<string, CommentNode>()
  for (const c of flat) byId.set(c.id, { ...c, children: [] })
  const roots: CommentNode[] = []
  for (const c of flat) {
    const node = byId.get(c.id)!
    if (!c.parent_id) roots.push(node)
    else { const parent = byId.get(c.parent_id); parent ? parent.children.push(node) : roots.push(node) }
  }
  return roots
}

function authorLabel(a: AuthorRow | AuthorRow[] | undefined | null): string {
  const one = Array.isArray(a) ? a[0] : a
  return one?.display_name || one?.username || 'Anonymous'
}

function authorInitial(a: AuthorRow | AuthorRow[] | undefined | null): string {
  return authorLabel(a).charAt(0).toUpperCase()
}

const readingTime = computed(() => {
  if (!post.value) return 0
  const words = post.value.body_md.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
})

const bodyHtml = computed(() => {
  if (!post.value) return ''
  const raw = marked.parse(post.value.body_md) as string
  return DOMPurify.sanitize(raw)
})
const coverImageUrl = computed(() => {
  if (!post.value?.cover_image_path) return null
  return supabase.storage.from('blog-images').getPublicUrl(post.value.cover_image_path).data.publicUrl
})

const formattedDate = computed(() => {
  if (!post.value) return ''
  return new Date(post.value.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})

function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(post.value?.title ?? '')
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

async function copyLink() {
  await navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Close share menu on outside click
function handleClickOutside(e: MouseEvent) {
  if (showShareMenu.value && !(e.target as HTMLElement).closest('.share-menu-container')) {
    showShareMenu.value = false
  }
}
onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  const { data: { user } } = await supabase.auth.getUser()
  userId.value = user?.id ?? null
  const { data: p } = await supabase.from('posts').select('id, title, body_md, published_at, author_id, cover_image_path, excerpt, author:profiles!author_id(display_name, username)').eq('slug', slug.value).eq('status', 'published').single()
  post.value = p as PostRow | null
  if (p) {
    const coverUrl = p.cover_image_path
      ? supabase.storage.from('blog-images').getPublicUrl(p.cover_image_path).data.publicUrl
      : undefined
    useSEO({
      title: p.title,
      description: p.excerpt || p.body_md.slice(0, 155).replace(/\n/g, ' '),
      image: coverUrl,
      type: 'article',
      article: { publishedTime: p.published_at },
    })
    useSEOJsonLd({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt || p.body_md.slice(0, 155).replace(/\n/g, ' '),
      datePublished: p.published_at,
      ...(coverUrl ? { image: coverUrl } : {}),
      publisher: { '@type': 'Organization', name: 'Vex Language' },
    })
  }
  if (p?.id) {
    // Parallelize independent queries
    const [clapRes, commentRes, myClap] = await Promise.all([
      supabase.from('post_claps').select('*', { count: 'exact', head: true }).eq('post_id', p.id),
      supabase.from('comments').select('id, body, author_id, parent_id, created_at, author:profiles!author_id(display_name, username)').eq('post_id', p.id).order('created_at'),
      userId.value ? supabase.from('post_claps').select('id').eq('post_id', p.id).eq('user_id', userId.value).maybeSingle() : Promise.resolve({ data: null }),
    ])
    clapCount.value = clapRes.count ?? 0
    clapped.value = !!myClap.data
    commentsFlat.value = (commentRes.data ?? []) as unknown as CommentRow[]
    commentTree.value = buildCommentTree(commentsFlat.value)
  }
  loading.value = false
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

async function toggleClap() {
  if (!post.value?.id || !userId.value) return
  if (clapped.value) {
    await supabase.from('post_claps').delete().eq('post_id', post.value.id).eq('user_id', userId.value)
    clapCount.value--; clapped.value = false
  } else {
    await supabase.from('post_claps').insert({ post_id: post.value.id, user_id: userId.value })
    clapCount.value++; clapped.value = true
  }
}

async function submitComment() {
  if (!post.value?.id || !userId.value || !commentBody.value.trim()) return
  commentError.value = ''; commentSubmitting.value = true
  const { error } = await supabase.from('comments').insert({ post_id: post.value.id, author_id: userId.value, parent_id: replyToId.value, body: commentBody.value.trim() })
  commentSubmitting.value = false
  if (error) { commentError.value = error.message; return }
  commentBody.value = ''; replyToId.value = null
  const { data: c } = await supabase.from('comments').select('id, body, author_id, parent_id, created_at, author:profiles!author_id(display_name, username)').eq('post_id', post.value.id).order('created_at')
  commentsFlat.value = (c ?? []) as unknown as CommentRow[]
  commentTree.value = buildCommentTree(commentsFlat.value)
}

function setReplyTo(id: string | null) { replyToId.value = id }
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="w-8 h-8 border-2 border-vex-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Post content -->
    <article v-else-if="post" class="relative">
      <!-- Cover Image -->
      <div v-if="coverImageUrl" class="relative w-full max-h-[420px] overflow-hidden">
        <img :src="coverImageUrl" :alt="post.title" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-vex-bg via-vex-bg/60 to-transparent"></div>
      </div>

      <!-- Header -->
      <div class="max-w-3xl mx-auto px-4 sm:px-6" :class="coverImageUrl ? '-mt-32 relative z-10' : 'pt-12'">
        <!-- Back link -->
        <router-link to="/blog" class="inline-flex items-center gap-1.5 text-sm text-vex-text-muted hover:text-vex-primary transition-colors mb-6">
          <ArrowLeft class="w-4 h-4" /> All posts
        </router-link>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.15] tracking-tight">{{ post.title }}</h1>

        <!-- Meta bar -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-vex-text-muted mb-8">
          <!-- Author -->
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-vex-surface-light flex items-center justify-center text-vex-text-muted text-xs font-bold">
              {{ authorInitial(post.author) }}
            </div>
            <span class="text-white font-medium">{{ authorLabel(post.author) }}</span>
          </div>
          <span class="text-vex-border">·</span>
          <div class="flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5" /> {{ formattedDate }}</div>
          <span class="text-vex-border">·</span>
          <div class="flex items-center gap-1.5"><Clock class="w-3.5 h-3.5" /> {{ readingTime }} min read</div>
        </div>
      </div>

      <!-- Floating action bar (left side on desktop) -->
      <div class="hidden lg:flex fixed left-[max(1rem,calc(50%-440px))] top-1/3 flex-col items-center gap-3 z-20">
        <button
          type="button" :disabled="!userId"
          :class="['group flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all cursor-pointer', clapped ? 'border-vex-primary bg-vex-primary/10 text-vex-primary' : 'border-vex-border bg-vex-surface text-vex-text-muted hover:text-red-400 hover:border-red-400/50']"
          @click="toggleClap"
        >
          <Heart :class="['w-5 h-5 transition-transform group-hover:scale-110', clapped ? 'fill-current' : '']" />
          <span class="text-xs font-medium">{{ clapCount }}</span>
        </button>
        <a href="#comments" class="flex flex-col items-center gap-1 p-2.5 rounded-xl border border-vex-border bg-vex-surface text-vex-text-muted hover:text-white hover:border-vex-primary/50 transition-all">
          <MessageSquare class="w-5 h-5" />
          <span class="text-xs font-medium">{{ commentTree.length }}</span>
        </a>
        <div class="relative share-menu-container">
          <button type="button" class="p-2.5 rounded-xl border border-vex-border bg-vex-surface text-vex-text-muted hover:text-white hover:border-vex-primary/50 transition-all cursor-pointer" @click="showShareMenu = !showShareMenu">
            <Share2 class="w-5 h-5" />
          </button>
          <div v-if="showShareMenu" class="absolute left-12 top-0 flex flex-col gap-1 p-1.5 rounded-xl border border-vex-border bg-vex-surface shadow-xl min-w-[140px]">
            <button type="button" class="flex items-center gap-2 px-3 py-2 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer" @click="shareOnTwitter"><Twitter class="w-4 h-4" /> Twitter</button>
            <button type="button" class="flex items-center gap-2 px-3 py-2 text-sm text-vex-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer" @click="copyLink"><LinkIcon class="w-4 h-4" /> {{ copied ? 'Copied!' : 'Copy link' }}</button>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <div class="post-body mb-12" v-html="bodyHtml" />

        <!-- Mobile engagement bar -->
        <div class="flex lg:hidden items-center gap-3 mb-8 pb-6 border-b border-vex-border">
          <button
            type="button" :disabled="!userId"
            :class="['inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer', clapped ? 'border-vex-primary bg-vex-primary/10 text-vex-primary' : 'border-vex-border text-vex-text-muted hover:text-white hover:border-vex-primary/50']"
            @click="toggleClap"
          >
            <Heart :class="['w-4 h-4', clapped ? 'fill-current' : '']" />
            <span>{{ clapCount }}</span>
          </button>
          <a href="#comments" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-vex-border text-vex-text-muted hover:text-white hover:border-vex-primary/50 transition-all">
            <MessageSquare class="w-4 h-4" /> {{ commentTree.length }}
          </a>
          <button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-vex-border text-vex-text-muted hover:text-white hover:border-vex-primary/50 transition-all cursor-pointer" @click="shareOnTwitter">
            <Share2 class="w-4 h-4" /> Share
          </button>
          <button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-vex-border text-vex-text-muted hover:text-white hover:border-vex-primary/50 transition-all cursor-pointer ml-auto" @click="copyLink">
            <LinkIcon class="w-4 h-4" /> {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>

        <!-- Author card -->
        <div v-if="post.author" class="flex items-center gap-4 p-5 rounded-2xl border border-vex-border bg-vex-bg-card mb-12">
          <div class="w-12 h-12 rounded-full bg-vex-surface-light flex items-center justify-center text-vex-text-muted font-bold text-lg shrink-0">
            {{ authorInitial(post.author) }}
          </div>
          <div>
            <p class="text-sm text-vex-text-muted">Written by</p>
            <p class="text-white font-semibold">{{ authorLabel(post.author) }}</p>
          </div>
        </div>

        <!-- Comments -->
        <section id="comments">
          <div class="flex items-center gap-2 mb-6">
            <h2 class="text-xl font-bold text-white">Comments</h2>
            <span class="px-2 py-0.5 rounded-full bg-vex-primary/10 text-vex-primary text-xs font-medium">{{ commentTree.length }}</span>
          </div>
          <div v-if="userId" class="mb-8">
            <p v-if="replyToId" class="text-sm text-vex-text-muted mb-2">
              Replying to comment —
              <button type="button" class="text-vex-primary hover:text-vex-accent cursor-pointer" @click="setReplyTo(null)">Cancel</button>
            </p>
            <div class="flex gap-3">
              <div class="w-8 h-8 rounded-full bg-vex-primary/20 flex items-center justify-center text-vex-primary text-xs font-bold shrink-0 mt-1">
                <User class="w-4 h-4" />
              </div>
              <div class="flex-1">
                <textarea v-model="commentBody" :placeholder="replyToId ? 'Write a reply…' : 'Join the discussion…'" rows="3" class="w-full px-4 py-3 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary transition-all resize-y text-sm" />
                <p v-if="commentError" class="text-sm text-vex-error mt-1">{{ commentError }}</p>
                <button type="button" :disabled="commentSubmitting || !commentBody.trim()" class="mt-2 px-4 py-2 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white text-sm font-medium transition-all disabled:opacity-50 cursor-pointer" @click="submitComment">{{ replyToId ? 'Reply' : 'Post comment' }}</button>
              </div>
            </div>
          </div>
          <p v-else class="text-sm text-vex-text-muted mb-8 p-4 rounded-xl border border-vex-border bg-vex-surface">
            <router-link to="/login" class="text-vex-primary hover:text-vex-accent font-medium">Sign in</router-link> to join the discussion.
          </p>
          <div v-if="commentTree.length" class="space-y-3">
            <CommentItem v-for="node in commentTree" :key="node.id" :node="node" :author-label="authorLabel(node.author)" @reply="setReplyTo" />
          </div>
          <div v-else class="text-center py-12">
            <MessageSquare class="w-8 h-8 text-vex-text-muted mx-auto mb-3 opacity-50" />
            <p class="text-sm text-vex-text-muted">No comments yet. Be the first to share your thoughts.</p>
          </div>
        </section>

        <!-- Back to top -->
        <div class="flex justify-center mt-12 mb-6">
          <button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-vex-border text-vex-text-muted hover:text-white hover:border-vex-primary/50 transition-all cursor-pointer text-sm" @click="scrollToTop">
            <ChevronUp class="w-4 h-4" /> Back to top
          </button>
        </div>
      </div>
    </article>

    <!-- Not found -->
    <div v-else class="text-center py-24">
      <div class="w-16 h-16 rounded-2xl bg-vex-primary/10 flex items-center justify-center mx-auto mb-4">
        <FileText class="w-8 h-8 text-vex-text-muted" />
      </div>
      <h2 class="text-xl font-bold text-white mb-2">Post not found</h2>
      <p class="text-vex-text-muted mb-6">The post you're looking for doesn't exist or has been removed.</p>
      <router-link to="/blog" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white text-sm font-medium transition-all">
        <ArrowLeft class="w-4 h-4" /> Back to blog
      </router-link>
    </div>
  </div>
</template>
