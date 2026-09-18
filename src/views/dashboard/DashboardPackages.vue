<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/client'
import { Package } from 'lucide-vue-next'

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
  <div class="workspace-page">
    <div class="workspace-heading">
      <div>
        <h1>Packages</h1>
        <p v-if="!loading" class="text-xs text-vex-text-muted mt-0.5">{{ packages.length }} total</p>
      </div>
      <router-link to="/dashboard/packages/new" class="ui-button ui-button-primary">+ Publish new</router-link>
    </div>
    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-5 h-5 border-2 border-zinc-700 border-t-vex-primary rounded-full animate-spin"></div>
    </div>
    <div v-else-if="packages.length" class="workspace-list space-y-2">
      <div v-for="p in packages" :key="p.id" class="flex items-center gap-3 px-4 py-3 rounded-lg border border-zinc-800/50 hover:bg-zinc-800/30 transition-all group">
        <div class="flex-1 min-w-0">
          <router-link :to="`/packages/${p.name}`" class="text-sm text-zinc-300 font-medium group-hover:text-white transition-colors">{{ p.name }}</router-link>
          <p v-if="p.description" class="text-xs text-vex-text-muted mt-0.5 truncate">{{ p.description }}</p>
        </div>
        <router-link :to="`/dashboard/packages/${p.name}/versions/new`" class="text-xs px-3 py-1.5 rounded-lg border border-zinc-800 text-vex-text-muted hover:text-white hover:border-vex-primary/30 transition-all whitespace-nowrap">Add version</router-link>
      </div>
    </div>
    <div v-else class="ui-empty-state workspace-panel">
      <Package class="w-8 h-8 text-vex-text-muted mx-auto mb-2" />
      <p class="text-sm text-vex-text-muted mb-3">No packages yet.</p>
      <router-link to="/dashboard/packages/new" class="text-vex-primary-light text-sm hover:underline">Publish your first package</router-link>
    </div>
  </div>
</template>
