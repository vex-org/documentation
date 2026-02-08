<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { supabase } from '../supabase/client'
import CommentItem from '../components/CommentItem.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
interface AuthorRow { display_name: string | null; username: string | null }
interface PostRow { id: string; title: string; body_md: string; published_at: string; author_id: string; cover_image_path: string | null; author?: AuthorRow | null }
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

const bodyHtml = computed(() => post.value ? marked.parse(post.value.body_md) : '')
const coverImageUrl = computed(() => {
  if (!post.value?.cover_image_path) return null
  return supabase.storage.from('blog-images').getPublicUrl(post.value.cover_image_path).data.publicUrl
})

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  userId.value = user?.id ?? null
  const { data: p } = await supabase.from('posts').select('id, title, body_md, published_at, author_id, cover_image_path, author:profiles!author_id(display_name, username)').eq('slug', slug.value).eq('status', 'published').single()
  post.value = p as PostRow | null
  if (p?.id) {
    const { count } = await supabase.from('post_claps').select('*', { count: 'exact', head: true }).eq('post_id', p.id)
    clapCount.value = count ?? 0
    if (userId.value) {
      const { data: myClap } = await supabase.from('post_claps').select('id').eq('post_id', p.id).eq('user_id', userId.value).maybeSingle()
      clapped.value = !!myClap
    }
    const { data: c } = await supabase.from('comments').select('id, body, author_id, parent_id, created_at, author:profiles!author_id(display_name, username)').eq('post_id', p.id).order('created_at')
    commentsFlat.value = (c ?? []) as unknown as CommentRow[]
    commentTree.value = buildCommentTree(commentsFlat.value)
  }
  loading.value = false
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
  <article class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-vex-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <template v-else-if="post">
      <img v-if="coverImageUrl" :src="coverImageUrl" alt="" class="w-full max-h-80 object-cover rounded-xl mb-8" />
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{{ post.title }}</h1>
      <div class="flex items-center gap-3 text-sm text-vex-text-muted mb-8 pb-8 border-b border-vex-border">
        <time :datetime="post.published_at">{{ new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
        <span v-if="post.author">· {{ authorLabel(post.author) }}</span>
      </div>

      <!-- Body -->
      <div class="prose prose-invert max-w-none mb-12 [&_pre]:bg-vex-bg-card [&_pre]:border [&_pre]:border-vex-border [&_pre]:rounded-xl [&_pre]:p-4 [&_code]:text-vex-accent [&_a]:text-vex-primary [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_blockquote]:border-l-vex-primary [&_blockquote]:bg-vex-bg-card [&_blockquote]:rounded-r-xl [&_blockquote]:py-2 [&_blockquote]:px-4" v-html="bodyHtml" />

      <!-- Claps -->
      <div class="flex items-center gap-3 mb-12 pb-8 border-b border-vex-border">
        <button
          type="button"
          :disabled="!userId"
          :class="['inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer', clapped ? 'border-vex-primary bg-vex-primary/10 text-vex-primary' : 'border-vex-border text-vex-text-muted hover:text-white hover:border-vex-primary/50']"
          @click="toggleClap"
        >
          👏 {{ clapped ? 'Clapped' : 'Clap' }}
        </button>
        <span class="text-sm text-vex-text-muted">{{ clapCount }}</span>
      </div>

      <!-- Comments -->
      <section>
        <h2 class="text-xl font-bold text-white mb-6">Comments</h2>
        <div v-if="userId" class="mb-6">
          <p v-if="replyToId" class="text-sm text-vex-text-muted mb-2">Replying to comment — <button type="button" class="text-vex-primary hover:text-vex-accent cursor-pointer" @click="setReplyTo(null)">Cancel</button></p>
          <textarea v-model="commentBody" :placeholder="replyToId ? 'Write a reply…' : 'Write a comment…'" rows="3" class="w-full px-4 py-3 rounded-xl border border-vex-border bg-vex-bg-card text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all resize-y" />
          <p v-if="commentError" class="text-sm text-vex-error mt-1">{{ commentError }}</p>
          <button type="button" :disabled="commentSubmitting || !commentBody.trim()" class="mt-2 px-4 py-2 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white text-sm font-medium transition-all disabled:opacity-50 cursor-pointer" @click="submitComment">{{ replyToId ? 'Reply' : 'Post comment' }}</button>
        </div>
        <p v-else class="text-sm text-vex-text-muted mb-6"><router-link to="/login" class="text-vex-primary hover:text-vex-accent">Sign in</router-link> to comment.</p>
        <div v-if="commentTree.length" class="space-y-3">
          <CommentItem v-for="node in commentTree" :key="node.id" :node="node" :author-label="authorLabel(node.author)" @reply="setReplyTo" />
        </div>
        <p v-else class="text-sm text-vex-text-muted">No comments yet.</p>
      </section>
    </template>

    <div v-else class="text-center py-20">
      <div class="text-4xl mb-4">📝</div>
      <p class="text-vex-text-muted">Post not found.</p>
    </div>
  </article>
</template>
