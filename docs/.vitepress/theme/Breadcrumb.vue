<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, theme, frontmatter } = useData()

const SECTION_LABELS = {
  guide: 'Guide',
  hdl: 'VexHDL',
  architecture: 'Architecture',
  std: 'Standard Library',
  references: 'Reference',
}

function normalize(path) {
  return (path || '')
    .replace(/\/+$/, '')
    .replace(/\/index$/, '')
    .replace(/^\/docs/, '') || '/'
}

function resolveGroups(sidebar, prefix) {
  if (!sidebar) return []
  if (Array.isArray(sidebar)) return sidebar
  const keys = Object.keys(sidebar).sort((a, b) => b.length - a.length)
  const match = keys.find((key) => prefix.startsWith(key))
  return match ? sidebar[match] : []
}

function findSidebarEntry(nodes, current, groupText = null) {
  for (const node of nodes || []) {
    if (node.link && normalize(node.link) === current) {
      return { groupText, linkText: node.text }
    }
    if (node.items) {
      const found = findSidebarEntry(node.items, current, node.text || groupText)
      if (found) return found
    }
  }
  return null
}

const crumbs = computed(() => {
  const fm = frontmatter.value || {}
  if (fm.layout === 'home' || fm.home) return []

  const rel = page.value?.relativePath || ''
  const segments = rel.replace(/\.md$/, '').split('/').filter(Boolean)
  if (segments.length < 2) return []

  const sectionKey = segments[0]
  const section = SECTION_LABELS[sectionKey]
  if (!section) return []

  const current = '/' + segments.join('/')
  const groups = resolveGroups(theme.value.sidebar, '/' + sectionKey + '/')
  const entry = findSidebarEntry(groups, current, null)
  const groupTitle = entry?.groupText ?? null

  const title =
    entry?.linkText || fm.title || page.value?.title || segments[segments.length - 1]

  const out = [{ text: section }]
  if (groupTitle && groupTitle.toLowerCase() !== section.toLowerCase()) {
    out.push({ text: groupTitle })
  }
  out.push({ text: title })

  // Fold a repeated trailing title (e.g. section pages).
  if (out.length > 1 && out[out.length - 1].text === out[out.length - 2].text) {
    out.pop()
  }

  return out
})
</script>

<template>
  <nav v-if="crumbs.length" class="vex-breadcrumb" aria-label="Breadcrumb">
    <template v-for="(crumb, i) in crumbs" :key="i">
      <span v-if="i > 0" class="vex-breadcrumb-sep" aria-hidden="true">/</span>
      <span class="vex-breadcrumb-item" :class="{ 'is-current': i === crumbs.length - 1 }">
        {{ crumb.text }}
      </span>
    </template>
  </nav>
</template>
