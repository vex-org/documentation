<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase/client'

const packages = ref<{ id: string; name: string; description: string | null }[]>([])
const loading = ref(true)
const q = ref('')

onMounted(async () => {
  let query = supabase.from('packages').select('id, name, description').order('name')
  if (q.value) query = query.ilike('name', `%${q.value}%`)
  const { data } = await query
  packages.value = data ?? []
  loading.value = false
})

async function search() {
  loading.value = true
  let query = supabase.from('packages').select('id, name, description').order('name')
  if (q.value) query = query.ilike('name', `%${q.value}%`)
  const { data } = await query
  packages.value = data ?? []
  loading.value = false
}
</script>

<template>
  <div class="packages">
    <h1>Packages</h1>
    <div class="search">
      <input v-model="q" type="search" placeholder="Search packages…" @keyup.enter="search" />
      <button @click="search">Search</button>
    </div>
    <p v-if="loading">Loading…</p>
    <ul v-else-if="packages.length" class="list">
      <li v-for="pkg in packages" :key="pkg.id">
        <router-link :to="`/packages/${pkg.name}`">{{ pkg.name }}</router-link>
        <span v-if="pkg.description" class="desc">{{ pkg.description }}</span>
      </li>
    </ul>
    <p v-else>No packages yet.</p>
  </div>
</template>

<style scoped>
.packages h1 { margin-bottom: 1rem; }
.search { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.search input { flex: 1; padding: 0.5rem; border: 1px solid var(--border, #e2e8f0); border-radius: 4px; }
.list { list-style: none; padding: 0; margin: 0; }
.list li { padding: 0.5rem 0; border-bottom: 1px solid var(--border, #e2e8f0); }
.list a { font-weight: 600; color: var(--text, #0f172a); text-decoration: none; }
.desc { color: var(--text-muted, #64748b); margin-left: 0.5rem; font-size: 0.9rem; }
</style>
