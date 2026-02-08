<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { supabase } from '../supabase/client'
import CommentItem from '../components/CommentItem.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
interface AuthorRow {
  display_name: string | null
  username: string | null
}
interface PostRow {
  id: string
  title: string
  body_md: string
  published_at: string
  author_id: string
  cover_image_path: string | null
  author?: AuthorRow | null
}
interface CommentRow {
  id: string
  body: string
  author_id: string
  parent_id: string | null
  created_at: string
  author?: AuthorRow | null
}
interface CommentNode extends CommentRow {
  children: CommentNode[]
}
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
  for (const c of flat) {
    byId.set(c.id, { ...c, children: [] })
  }
  const roots: CommentNode[] = []
  for (const c of flat) {
    const node = byId.get(c.id)!
    if (!c.parent_id) {
      roots.push(node)
    } else {
      const parent = byId.get(c.parent_id)
      if (parent) parent.children.push(node)
      else roots.push(node)
    }
  }
  return roots
}

function authorLabel(a: AuthorRow | AuthorRow[] | undefined | null): string {
  const one = Array.isArray(a) ? a[0] : a
  if (!one) return 'Anonymous'
  return one.display_name || one.username || 'Anonymous'
}

const bodyHtml = computed(() => post.value ? marked.parse(post.value.body_md) : '')
const coverImageUrl = computed(() => {
  if (!post.value?.cover_image_path) return null
  const { data } = supabase.storage.from('blog-images').getPublicUrl(post.value.cover_image_path)
  return data.publicUrl
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
    clapCount.value--
    clapped.value = false
  } else {
    await supabase.from('post_claps').insert({ post_id: post.value.id, user_id: userId.value })
    clapCount.value++
    clapped.value = true
  }
}

async function submitComment() {
  if (!post.value?.id || !userId.value || !commentBody.value.trim()) return
  commentError.value = ''
  commentSubmitting.value = true
  const { error } = await supabase.from('comments').insert({
    post_id: post.value.id,
    author_id: userId.value,
    parent_id: replyToId.value,
    body: commentBody.value.trim(),
  })
  commentSubmitting.value = false
  if (error) {
    commentError.value = error.message
    return
  }
  commentBody.value = ''
  replyToId.value = null
  const { data: c } = await supabase.from('comments').select('id, body, author_id, parent_id, created_at, author:profiles!author_id(display_name, username)').eq('post_id', post.value.id).order('created_at')
  commentsFlat.value = (c ?? []) as unknown as CommentRow[]
  commentTree.value = buildCommentTree(commentsFlat.value)
}

function setReplyTo(id: string | null) {
  replyToId.value = id
}
</script>

<template>
  <article class="post">
    <p v-if="loading">Loading…</p>
    <template v-else-if="post">
      <img v-if="coverImageUrl" :src="coverImageUrl" alt="" class="cover" />
      <h1>{{ post.title }}</h1>
      <p class="meta">
        <time :datetime="post.published_at">{{ new Date(post.published_at).toLocaleDateString() }}</time>
        <span v-if="post.author" class="author"> · {{ authorLabel(post.author) }}</span>
      </p>
      <div class="body markdown" v-html="bodyHtml" />
      <div class="claps">
        <button type="button" :class="{ clapped }" :disabled="!userId" @click="toggleClap">Clap</button>
        <span>{{ clapCount }}</span>
      </div>
      <section class="comments">
        <h2>Comments</h2>
        <div v-if="userId" class="comment-form">
          <p v-if="replyToId" class="reply-hint">Replying to comment — <button type="button" class="link-btn" @click="setReplyTo(null)">Cancel</button></p>
          <textarea v-model="commentBody" :placeholder="replyToId ? 'Write a reply…' : 'Write a comment…'" rows="3" />
          <p v-if="commentError" class="error">{{ commentError }}</p>
          <button type="button" :disabled="commentSubmitting || !commentBody.trim()" @click="submitComment">{{ replyToId ? 'Reply' : 'Post comment' }}</button>
        </div>
        <p v-else class="login-hint"><router-link to="/login">Log in</router-link> to comment.</p>
        <div v-if="commentTree.length" class="comment-tree">
          <CommentItem
            v-for="node in commentTree"
            :key="node.id"
            :node="node"
            :author-label="authorLabel(node.author)"
            @reply="setReplyTo"
          />
        </div>
        <p v-else-if="userId" class="none">No comments yet.</p>
      </section>
    </template>
    <p v-else>Post not found.</p>
  </article>
</template>

<style scoped>
.cover { width: 100%; max-height: 320px; object-fit: cover; border-radius: 4px; margin-bottom: 1rem; }
.post h1 { margin-bottom: 0.5rem; }
.meta { color: var(--text-muted, #64748b); margin-bottom: 1rem; }
.author { font-style: italic; }
.reply-hint { font-size: 0.875rem; margin-bottom: 0.25rem; }
.link-btn { background: none; border: none; color: var(--link, #3b82f6); cursor: pointer; padding: 0; font-size: inherit; }
.comment-tree { margin-top: 0.5rem; }
.body { margin-bottom: 1.5rem; }
.body.markdown :deep(h1) { font-size: 1.25rem; }
.body.markdown :deep(pre) { background: var(--bg-code, #f1f5f9); padding: 0.75rem; border-radius: 4px; overflow-x: auto; }
.claps { margin-bottom: 2rem; }
.claps button { padding: 0.25rem 0.5rem; cursor: pointer; }
.claps button:disabled { cursor: default; opacity: 0.7; }
.claps button.clapped { font-weight: 600; }
.comments h2 { font-size: 1rem; margin-bottom: 0.5rem; }
.comment-form textarea { width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid var(--border, #e2e8f0); border-radius: 4px; resize: vertical; }
.comment-form .error { color: var(--error, #dc2626); font-size: 0.875rem; }
.login-hint { color: var(--text-muted, #64748b); margin-bottom: 1rem; }
.comments ul { list-style: none; padding: 0; margin: 0; }
.comments li { padding: 0.75rem 0; border-top: 1px solid var(--border, #e2e8f0); }
.comments small { color: var(--text-muted, #64748b); }
.none { color: var(--text-muted, #64748b); }
</style>
