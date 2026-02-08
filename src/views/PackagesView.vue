<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase/client'

const packages = ref<{ id: string; name: string; description: string | null }[]>([])
const loading = ref(true)
const q = ref('')

onMounted(async () => {
  await doSearch()
})

async function doSearch() {
  loading.value = true
  let query = supabase.from('packages').select('id, name, description').order('name')
  if (q.value) query = query.ilike('name', `%${q.value}%`)
  const { data } = await query
  packages.value = data ?? []
  loading.value = false
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Packages</h1>
      <p class="text-vex-text-muted">Discover and share Vex libraries</p>
    </div>

    <!-- Search -->
    <div class="flex gap-3 mb-8">
      <div class="relative flex-1">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-vex-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          v-model="q"
          type="search"
          placeholder="Search packages…"
          class="w-full pl-10 pr-4 py-3 rounded-xl border border-vex-border bg-vex-bg-card text-vex-text placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all"
          @keyup.enter="doSearch"
        />
      </div>
      <button class="px-5 py-3 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-all cursor-pointer" @click="doSearch">Search</button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-vex-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Results -->
    <div v-else-if="packages.length" class="grid gap-3">
      <router-link
        v-for="pkg in packages"
        :key="pkg.id"
        :to="`/packages/${pkg.name}`"
        class="group block p-5 rounded-xl border border-vex-border bg-vex-bg-card hover:bg-vex-bg-card-hover hover:border-vex-primary/30 transition-all"
      >
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-base font-semibold text-white group-hover:text-vex-accent transition-colors font-mono">{{ pkg.name }}</h3>
            <p v-if="pkg.description" class="text-sm text-vex-text-muted mt-1">{{ pkg.description }}</p>
          </div>
          <svg class="w-5 h-5 text-vex-text-muted group-hover:text-vex-accent transition-colors flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </div>
      </router-link>
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-20">
      <div class="text-4xl mb-4">📦</div>
      <p class="text-vex-text-muted">No packages found.</p>
    </div>
  </div>
</template>
