<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { supabase } from '../supabase/client'

const route = useRoute()
const name = computed(() => route.params.name as string)
interface PkgRow {
  id: string
  name: string
  description: string | null
  repository_url: string | null
  license: string | null
  owner_id: string
}
interface VersionRow {
  id: string
  version: string
  published_at: string
  yanked: boolean
  readme_text: string | null
}
const pkg = ref<PkgRow | null>(null)
const versions = ref<VersionRow[]>([])
const downloadCount = ref(0)
const loading = ref(true)
const userId = ref<string | null>(null)
const copyDone = ref(false)

const latestVersion = computed(() => versions.value.find((v) => !v.yanked) ?? versions.value[0])
const readmeHtml = computed(() => {
  const v = latestVersion.value
  if (!v?.readme_text) return ''
  return marked.parse(v.readme_text)
})
const isOwner = computed(() => !!userId.value && !!pkg.value && pkg.value.owner_id === userId.value)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  userId.value = user?.id ?? null

  const { data: p } = await supabase.from('packages').select('id, name, description, repository_url, license, owner_id').eq('name', name.value).single()
  pkg.value = p as PkgRow | null
  if (p?.id) {
    const { data: v } = await supabase.from('versions').select('id, version, published_at, yanked, readme_text').eq('package_id', p.id).order('published_at', { ascending: false })
    versions.value = (v ?? []) as VersionRow[]

    const { data: sum } = await supabase.from('package_downloads').select('count').eq('package_id', p.id)
    downloadCount.value = (sum ?? []).reduce((acc, row) => acc + Number(row.count), 0)
  }
  loading.value = false
})

async function copyInstall() {
  if (!pkg.value) return
  const cmd = `vex add ${pkg.value.name}`
  await navigator.clipboard.writeText(cmd)
  copyDone.value = true
  setTimeout(() => { copyDone.value = false }, 2000)
  if (latestVersion.value) {
    await supabase.rpc('record_package_download', { package_name: pkg.value.name, version: latestVersion.value.version })
    const { data: sum } = await supabase.from('package_downloads').select('count').eq('package_id', pkg.value.id)
    downloadCount.value = (sum ?? []).reduce((acc, row) => acc + Number(row.count), 0)
  }
}

async function yankVersion(versionId: string) {
  if (!confirm('Yank this version? It will no longer be installable.')) return
  const { error } = await supabase.from('versions').update({ yanked: true }).eq('id', versionId)
  if (!error) {
    const v = versions.value.find((x) => x.id === versionId)
    if (v) v.yanked = true
  }
}
</script>

<template>
  <div class="detail">
    <p v-if="loading">Loading…</p>
    <template v-else-if="pkg">
      <h1>{{ pkg.name }}</h1>
      <p v-if="pkg.description" class="desc">{{ pkg.description }}</p>
      <p v-if="downloadCount > 0" class="meta">{{ downloadCount.toLocaleString() }} downloads</p>
      <p v-if="pkg.repository_url"><a :href="pkg.repository_url" target="_blank" rel="noopener">Repository</a></p>
      <p v-if="pkg.license">License: {{ pkg.license }}</p>
      <h2>Install</h2>
      <div class="install-wrap">
        <pre class="install">vex add {{ pkg.name }}</pre>
        <button type="button" class="copy-btn" @click="copyInstall">{{ copyDone ? 'Copied!' : 'Copy' }}</button>
      </div>
      <template v-if="readmeHtml">
        <h2>README</h2>
        <div class="readme markdown" v-html="readmeHtml" />
      </template>
      <h2>Versions</h2>
      <ul class="versions">
        <li v-for="v in versions" :key="v.id" class="ver-row">
          <code>{{ v.version }}</code>
          <span v-if="v.yanked" class="yanked">yanked</span>
          <button v-if="isOwner && !v.yanked" type="button" class="yank-btn" @click="yankVersion(v.id)">Yank</button>
        </li>
      </ul>
    </template>
    <p v-else>Package not found.</p>
  </div>
</template>

<style scoped>
.detail h1 { margin-bottom: 0.5rem; }
.desc { color: var(--text-muted, #64748b); }
.meta { color: var(--text-muted, #64748b); font-size: 0.9rem; margin-bottom: 0.5rem; }
.detail h2 { margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1rem; }
.install-wrap { display: flex; align-items: flex-start; gap: 0.5rem; }
.install { flex: 1; background: var(--bg-code, #f1f5f9); padding: 0.75rem; border-radius: 4px; overflow-x: auto; margin: 0; }
.copy-btn { padding: 0.25rem 0.5rem; font-size: 0.875rem; cursor: pointer; flex-shrink: 0; }
.readme.markdown :deep(h1) { font-size: 1.1rem; }
.readme.markdown :deep(pre) { background: var(--bg-code, #f1f5f9); padding: 0.75rem; border-radius: 4px; overflow-x: auto; }
.versions { list-style: none; padding: 0; }
.ver-row { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; }
.yanked { color: var(--text-muted, #64748b); }
.yank-btn { font-size: 0.75rem; padding: 0.125rem 0.375rem; cursor: pointer; margin-left: auto; }
</style>
