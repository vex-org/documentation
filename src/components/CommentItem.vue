<script setup lang="ts">
interface AuthorRow { display_name: string | null; username: string | null }
interface CommentNode { id: string; body: string; author_id: string; created_at: string; author?: AuthorRow | AuthorRow[] | null; children: CommentNode[] }

defineProps<{ node: CommentNode; authorLabel: string }>()
defineEmits<{ reply: [id: string] }>()

function childAuthorLabel(a: CommentNode['author']): string {
  const one = Array.isArray(a) ? a[0] : a
  return one?.display_name || one?.username || 'Anonymous'
}
</script>

<template>
  <div class="py-3 border-t border-vex-border">
    <p class="text-sm text-vex-text leading-relaxed">{{ node.body }}</p>
    <div class="flex items-center gap-3 mt-1.5 text-xs text-vex-text-muted">
      <span class="font-medium text-white">{{ authorLabel }}</span>
      <time>{{ new Date(node.created_at).toLocaleString() }}</time>
      <button type="button" class="text-vex-primary hover:text-vex-accent cursor-pointer" @click="$emit('reply', node.id)">Reply</button>
    </div>
    <div v-if="node.children.length" class="ml-6 mt-2 border-l border-vex-border pl-4">
      <CommentItem v-for="child in node.children" :key="child.id" :node="child" :author-label="childAuthorLabel(child.author)" @reply="$emit('reply', $event)" />
    </div>
  </div>
</template>
