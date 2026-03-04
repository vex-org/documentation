<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase/client'
import { Download } from 'lucide-vue-next'

interface PkgRow { id: string; name: string; description: string | null; license: string | null; latest_version: string | null; download_count: number }
const packages = ref<PkgRow[]>([])
const loading = ref(true)
const q = ref('')

onMounted(async () => {
  await doSearch()
})

async function doSearch() {
  loading.value = true
  let query = supabase.from('packages').select('id, name, description, license').order('name')
  if (q.value) query = query.ilike('name', `%${q.value}%`)
  const { data } = await query
  const pkgs = (data ?? []) as { id: string; name: string; description: string | null; license: string | null }[]

  // Fetch latest version + download count per package
  const enriched: PkgRow[] = []
  if (pkgs.length) {
    const pkgIds = pkgs.map(p => p.id)
    const [vRes, dlRes] = await Promise.all([
      supabase.from('versions').select('package_id, version, published_at').in('package_id', pkgIds).eq('yanked', false).order('published_at', { ascending: false }),
      supabase.from('package_downloads').select('package_id, count').in('package_id', pkgIds),
    ])
    const latestVersions = new Map<string, string>()
    for (const v of (vRes.data ?? []) as { package_id: string; version: string }[]) {
      if (!latestVersions.has(v.package_id)) latestVersions.set(v.package_id, v.version)
    }
    const dlCounts = new Map<string, number>()
    for (const d of (dlRes.data ?? []) as { package_id: string; count: number }[]) {
      dlCounts.set(d.package_id, (dlCounts.get(d.package_id) ?? 0) + Number(d.count))
    }
    for (const p of pkgs) {
      enriched.push({ ...p, latest_version: latestVersions.get(p.id) ?? null, download_count: dlCounts.get(p.id) ?? 0 })
    }
  }
  packages.value = enriched
  loading.value = false
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <div class="mb-10">
      <h1 class="text-2xl font-bold text-white mb-1">Packages</h1>
      <p class="text-sm text-vex-text-muted">Discover and share Vex libraries.</p>
    </div>

    <!-- Search -->
    <div class="flex gap-2 mb-8">
      <div class="relative flex-1">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-vex-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          v-model="q"
          type="search"
          placeholder="Search packages..."
          class="w-full pl-9 pr-4 py-2.5 rounded-lg border border-vex-border bg-vex-bg-card text-sm text-vex-text placeholder-vex-text-muted focus:outline-none focus:border-vex-primary/50 transition-colors"
          @keyup.enter="doSearch"
        />
      </div>
      <button class="px-4 py-2.5 rounded-lg bg-vex-primary hover:bg-vex-primary-light text-white text-sm font-medium transition-colors cursor-pointer" @click="doSearch">Search</button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-6 h-6 border-2 border-vex-border border-t-vex-primary rounded-full animate-spin"></div>
    </div>

    <!-- Results -->
    <div v-else-if="packages.length" class="space-y-px">
      <router-link
        v-for="pkg in packages"
        :key="pkg.id"
        :to="`/packages/${pkg.name}`"
        class="group flex items-start gap-4 p-4 -mx-2 px-2 rounded-lg hover:bg-vex-bg-card transition-colors"
      >
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <h3 class="text-sm font-semibold text-white group-hover:text-vex-primary transition-colors font-mono">{{ pkg.name }}</h3>
            <span v-if="pkg.latest_version" class="text-[11px] px-1.5 py-0.5 rounded bg-vex-surface-light text-vex-text-muted font-mono">v{{ pkg.latest_version }}</span>
          </div>
          <p v-if="pkg.description" class="text-xs text-vex-text-muted mt-0.5 line-clamp-1">{{ pkg.description }}</p>
        </div>
        <div class="flex items-center gap-4 text-xs text-vex-text-muted flex-shrink-0 mt-1">
          <span v-if="pkg.license" class="hidden sm:inline">{{ pkg.license }}</span>
          <span v-if="pkg.download_count > 0" class="inline-flex items-center gap-1">
            <Download class="w-3 h-3" />
            {{ pkg.download_count.toLocaleString() }}
          </span>
        </div>
      </router-link>
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-20">
      <p class="text-sm text-vex-text-muted">No packages found.</p>
    </div>
  </div>
</template>
