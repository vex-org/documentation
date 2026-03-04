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
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-xl font-bold text-white">Packages</h1>
        <p v-if="!loading" class="text-xs text-zinc-500 mt-0.5">{{ packages.length }} total</p>
      </div>
      <router-link to="/dashboard/packages/new" class="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors">+ Publish new</router-link>
    </div>
    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-5 h-5 border-2 border-zinc-700 border-t-sky-500 rounded-full animate-spin"></div>
    </div>
    <div v-else-if="packages.length" class="space-y-1.5">
      <div v-for="p in packages" :key="p.id" class="flex items-center gap-3 px-4 py-3 rounded-lg border border-zinc-800/50 hover:bg-zinc-800/30 transition-all group">
        <div class="flex-1 min-w-0">
          <router-link :to="`/packages/${p.name}`" class="text-sm text-zinc-300 font-medium group-hover:text-white transition-colors">{{ p.name }}</router-link>
          <p v-if="p.description" class="text-[11px] text-zinc-600 mt-0.5 truncate">{{ p.description }}</p>
        </div>
        <router-link :to="`/dashboard/packages/${p.name}/versions/new`" class="text-xs px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-500 hover:text-white hover:border-sky-500/30 transition-all whitespace-nowrap">Add version</router-link>
      </div>
    </div>
    <div v-else class="text-center py-16">
      <Package class="w-8 h-8 text-zinc-700 mx-auto mb-2" />
      <p class="text-sm text-zinc-500 mb-3">No packages yet.</p>
      <router-link to="/dashboard/packages/new" class="text-sky-500 text-sm hover:underline">Publish your first package</router-link>
    </div>
  </div>
</template>
