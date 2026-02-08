<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/client'

interface PkgRow {
  id: string
  name: string
  description: string | null
  created_at: string
}
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
    <h1>My Packages</h1>
    <p><router-link to="/dashboard/packages/new">Publish new package</router-link></p>
    <p v-if="loading">Loading…</p>
    <ul v-else-if="packages.length" class="list">
      <li v-for="p in packages" :key="p.id">
        <router-link :to="`/packages/${p.name}`">{{ p.name }}</router-link>
        <span v-if="p.description" class="desc">{{ p.description }}</span>
        <router-link :to="`/dashboard/packages/${p.name}/versions/new`" class="link">Add version</router-link>
      </li>
    </ul>
    <p v-else>No packages yet.</p>
  </div>
</template>

<style scoped>
.list { list-style: none; padding: 0; }
.list li { padding: 0.5rem 0; border-bottom: 1px solid var(--border, #e2e8f0); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.desc { color: var(--text-muted, #64748b); font-size: 0.9rem; }
.link { font-size: 0.875rem; color: var(--link, #3b82f6); margin-left: auto; }
</style>
