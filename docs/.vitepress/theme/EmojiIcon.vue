<template>
  <Icon :icon="iconName" class="emoji-icon" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps<{
  emoji: string
}>()

const emojiMap: Record<string, string> = {
  '✅': 'mdi:check-circle-outline',
  '❌': 'mdi:close-circle-outline',
  '⚠️': 'mdi:alert-outline',
  '🔥': 'mdi:fire',
  '💡': 'mdi:lightbulb-outline',
  '🚀': 'mdi:rocket-launch-outline',
  '📌': 'mdi:pin-outline',
  '📎': 'mdi:paperclip',
  '📚': 'mdi:book-open-page-variant-outline',
  '🧪': 'mdi:test-tube',
}

const iconName = computed(() => {
  return emojiMap[props.emoji] ?? 'mdi:help-circle-outline'
})
</script>

<style scoped>
.emoji-icon {
  vertical-align: text-bottom;
  font-size: 1em;
}
</style>

