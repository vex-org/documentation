<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/client'

interface PkgRow { id: string; name: string; description: string | null; created_at: string }
const packages = ref<PkgRow[]>([])
const loading = ref(true)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data } = await supabase.from('packages').select('id, name, description, created_at').eq('owner_id', user.id).order('name')
  packages.value = data ?? []
  loading.value = false
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-white">My Packages</h1>
      <router-link to="/dashboard/packages/new" class="px-4 py-2 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white text-sm font-medium transition-all">+ Publish new</router-link>
    </div>
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-6 h-6 border-2 border-vex-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else-if="packages.length" class="space-y-2">
      <div v-for="p in packages" :key="p.id" class="flex items-center gap-3 p-4 rounded-xl border border-vex-border bg-vex-surface hover:border-vex-primary/50 transition-all">
        <div class="flex-1 min-w-0">
          <router-link :to="`/packages/${p.name}`" class="text-white font-medium hover:text-vex-primary transition-colors">{{ p.name }}</router-link>
          <p v-if="p.description" class="text-sm text-vex-text-muted mt-0.5 truncate">{{ p.description }}</p>
        </div>
        <router-link :to="`/dashboard/packages/${p.name}/versions/new`" class="text-xs px-3 py-1.5 rounded-lg border border-vex-border text-vex-text-muted hover:text-white hover:border-vex-primary/50 transition-all whitespace-nowrap">Add version</router-link>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <div class="text-4xl mb-3">📦</div>
      <p class="text-vex-text-muted">No packages yet.</p>
    </div>
  </div>
</template>
