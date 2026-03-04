<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { supabase } from '../supabase/client'
import { useSEO, useSEOJsonLd } from '../composables/useSEO'

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
  const raw = marked.parse(v.readme_text) as string
  return DOMPurify.sanitize(raw)
})
const isOwner = computed(() => !!userId.value && !!pkg.value && pkg.value.owner_id === userId.value)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  userId.value = user?.id ?? null
  const { data: p } = await supabase.from('packages').select('id, name, description, repository_url, license, owner_id').eq('name', name.value).single()
  pkg.value = p as PkgRow | null
  if (p) {
    useSEO({
      title: `${p.name} – Packages`,
      description: p.description || `${p.name} – a Vex package on the registry.`,
    })
    useSEOJsonLd({
      '@type': 'SoftwareSourceCode',
      name: p.name,
      description: p.description || `${p.name} – a Vex package.`,
      programmingLanguage: 'Vex',
      ...(p.repository_url ? { codeRepository: p.repository_url } : {}),
    })
  }
  if (p?.id) {
    // Parallelize independent queries
    const [vRes, dlRes] = await Promise.all([
      supabase.from('versions').select('id, version, published_at, yanked, readme_text').eq('package_id', p.id).order('published_at', { ascending: false }),
      supabase.from('package_downloads').select('count').eq('package_id', p.id),
    ])
    versions.value = (vRes.data ?? []) as VersionRow[]
    downloadCount.value = (dlRes.data ?? []).reduce((acc, row) => acc + Number(row.count), 0)
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
      <div class="w-6 h-6 border-2 border-vex-border border-t-vex-primary rounded-full animate-spin"></div>
    </div>

    <template v-else-if="pkg">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-white font-mono mb-1">{{ pkg.name }}</h1>
            <p v-if="pkg.description" class="text-sm text-vex-text-muted">{{ pkg.description }}</p>
          </div>
          <span v-if="latestVersion" class="text-xs px-2 py-1 rounded-md bg-vex-surface-light text-vex-text-muted font-mono flex-shrink-0">v{{ latestVersion.version }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-4 mt-4 text-xs text-vex-text-muted">
          <span v-if="downloadCount > 0" class="inline-flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
            {{ downloadCount.toLocaleString() }} downloads
          </span>
          <span v-if="pkg.license">{{ pkg.license }}</span>
          <a v-if="pkg.repository_url" :href="pkg.repository_url" target="_blank" rel="noopener" class="inline-flex items-center gap-1 hover:text-white transition-colors">Repository</a>
        </div>
      </div>

      <!-- Install -->
      <div class="flex items-center gap-3 p-3 rounded-lg border border-vex-border bg-vex-bg-card mb-8">
        <code class="flex-1 text-sm font-mono text-vex-text-muted">vex add {{ pkg.name }}</code>
        <button type="button" class="px-3 py-1 rounded-md text-xs font-medium text-vex-text-muted hover:text-white hover:bg-vex-surface-light transition-colors cursor-pointer" @click="copyInstall">{{ copyDone ? 'Copied' : 'Copy' }}</button>
      </div>

      <!-- README -->
      <div v-if="readmeHtml" class="mb-10">
        <h2 class="text-sm font-semibold text-vex-text-muted uppercase tracking-wider mb-4">Readme</h2>
        <div class="prose-vex p-6 rounded-lg border border-vex-border bg-vex-bg-card" v-html="readmeHtml" />
      </div>

      <!-- Versions -->
      <div>
        <h2 class="text-sm font-semibold text-vex-text-muted uppercase tracking-wider mb-4">Versions</h2>
        <div class="divide-y divide-vex-border border border-vex-border rounded-lg overflow-hidden">
          <div v-for="v in versions" :key="v.id" class="flex items-center justify-between px-4 py-3 bg-vex-bg-card">
            <div class="flex items-center gap-3">
              <code class="text-sm font-mono text-white">{{ v.version }}</code>
              <span v-if="v.yanked" class="text-[10px] px-1.5 py-0.5 rounded bg-vex-error/10 text-vex-error font-medium">yanked</span>
              <time class="text-xs text-vex-text-muted">{{ new Date(v.published_at).toLocaleDateString() }}</time>
            </div>
            <button v-if="isOwner && !v.yanked" type="button" class="text-xs text-vex-text-muted hover:text-vex-error transition-colors cursor-pointer" @click="yankVersion(v.id)">Yank</button>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="text-center py-20">
      <p class="text-sm text-vex-text-muted">Package not found.</p>
    </div>
  </div>
</template>
