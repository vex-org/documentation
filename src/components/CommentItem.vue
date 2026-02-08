<script setup lang="ts">
interface AuthorRow {
  display_name: string | null
  username: string | null
}
interface CommentNode {
  id: string
  body: string
  author_id: string
  created_at: string
  author?: AuthorRow | AuthorRow[] | null
  children: CommentNode[]
}

defineProps<{
  node: CommentNode
  authorLabel: string
}>()
defineEmits<{
  reply: [id: string]
}>()

function childAuthorLabel(a: CommentNode['author']): string {
  const one = Array.isArray(a) ? a[0] : a
  if (!one) return 'Anonymous'
  return one.display_name || one.username || 'Anonymous'
}
</script>

<template>
  <div class="comment">
    <p class="comment-body">{{ node.body }}</p>
    <div class="comment-meta">
      <span class="comment-author">{{ authorLabel }}</span>
      <time>{{ new Date(node.created_at).toLocaleString() }}</time>
      <button type="button" class="link-btn" @click="$emit('reply', node.id)">Reply</button>
    </div>
    <div v-if="node.children.length" class="comment-children">
      <CommentItem
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :author-label="childAuthorLabel(child.author)"
        @reply="$emit('reply', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.comment { padding: 0.5rem 0; border-top: 1px solid var(--border, #e2e8f0); }
.comment-meta { font-size: 0.875rem; color: var(--text-muted, #64748b); margin-top: 0.25rem; display: flex; gap: 0.5rem; align-items: center; }
.link-btn { background: none; border: none; color: var(--link, #3b82f6); cursor: pointer; padding: 0; font-size: inherit; }
.comment-children { margin-left: 1.5rem; margin-top: 0.5rem; }
</style>
