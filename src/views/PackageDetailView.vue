<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { supabase } from '../supabase/client'

const route = useRoute()
const name = computed(() => route.params.name as string)
interface PkgRow { id: string; name: string; description: string | null; repository_url: string | null; license: string | null; owner_id: string }
interface VersionRow { id: string; version: string; published_at: string; yanked: boolean; readme_text: string | null }
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
  await navigator.clipboard.writeText(`vex add ${pkg.value.name}`)
  copyDone.value = true
  setTimeout(() => { copyDone.value = false }, 2000)
  if (latestVersion.value) {
    await supabase.rpc('record_package_download', { package_name: pkg.value.name, version: latestVersion.value.version })
    const { data: sum } = await supabase.from('package_downloads').select('count').eq('package_id', pkg.value.id)
    downloadCount.value = (sum ?? []).reduce((acc, row) => acc + Number(row.count), 0)
  }
}

async function yankVersion(versionId: string) {
  if (!confirm('Yank this version?')) return
  const { error } = await supabase.from('versions').update({ yanked: true }).eq('id', versionId)
  if (!error) { const v = versions.value.find((x) => x.id === versionId); if (v) v.yanked = true }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-vex-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <template v-else-if="pkg">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white font-mono mb-2">{{ pkg.name }}</h1>
        <p v-if="pkg.description" class="text-vex-text-muted text-lg">{{ pkg.description }}</p>
        <div class="flex flex-wrap items-center gap-4 mt-4 text-sm text-vex-text-muted">
          <span v-if="latestVersion" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-vex-primary/10 text-vex-primary font-mono text-xs">v{{ latestVersion.version }}</span>
          <span v-if="downloadCount > 0" class="inline-flex items-center gap-1">⬇️ {{ downloadCount.toLocaleString() }} downloads</span>
          <span v-if="pkg.license" class="inline-flex items-center gap-1">📄 {{ pkg.license }}</span>
          <a v-if="pkg.repository_url" :href="pkg.repository_url" target="_blank" rel="noopener" class="inline-flex items-center gap-1 hover:text-white transition-colors">🔗 Repository</a>
        </div>
      </div>

      <!-- Install -->
      <div class="p-4 rounded-xl border border-vex-border bg-vex-bg-card mb-8">
        <div class="text-xs text-vex-text-muted mb-2 font-medium uppercase tracking-wider">Install</div>
        <div class="flex items-center gap-3">
          <code class="flex-1 text-sm font-mono text-vex-accent">vex add {{ pkg.name }}</code>
          <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-medium border border-vex-border text-vex-text-muted hover:text-white hover:border-vex-primary/50 transition-all cursor-pointer" @click="copyInstall">{{ copyDone ? '✓ Copied' : 'Copy' }}</button>
        </div>
      </div>

      <!-- README -->
      <div v-if="readmeHtml" class="mb-8">
        <h2 class="text-lg font-semibold text-white mb-4">README</h2>
        <div class="prose prose-invert max-w-none p-6 rounded-xl border border-vex-border bg-vex-bg-card [&_pre]:bg-vex-surface [&_pre]:rounded-lg [&_pre]:p-4 [&_code]:text-vex-accent [&_a]:text-vex-primary [&_h1]:text-xl [&_h2]:text-lg" v-html="readmeHtml" />
      </div>

      <!-- Versions -->
      <div>
        <h2 class="text-lg font-semibold text-white mb-4">Versions</h2>
        <div class="space-y-2">
          <div v-for="v in versions" :key="v.id" class="flex items-center justify-between p-3 rounded-xl border border-vex-border bg-vex-bg-card">
            <div class="flex items-center gap-3">
              <code class="text-sm font-mono text-white">{{ v.version }}</code>
              <span v-if="v.yanked" class="text-xs px-2 py-0.5 rounded-full bg-vex-error/10 text-vex-error">yanked</span>
              <time class="text-xs text-vex-text-muted">{{ new Date(v.published_at).toLocaleDateString() }}</time>
            </div>
            <button v-if="isOwner && !v.yanked" type="button" class="text-xs text-vex-text-muted hover:text-vex-error transition-colors cursor-pointer" @click="yankVersion(v.id)">Yank</button>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="text-center py-20">
      <div class="text-4xl mb-4">🔍</div>
      <p class="text-vex-text-muted">Package not found.</p>
    </div>
  </div>
</template>
