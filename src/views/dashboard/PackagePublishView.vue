<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase/client'

const router = useRouter()
const name = ref('')
const description = ref('')
const repositoryUrl = ref('')
const homepage = ref('')
const documentation = ref('')
const license = ref('')
const saving = ref(false)
const error = ref('')

async function save() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  error.value = ''
  saving.value = true
  const { error: e } = await supabase.from('packages').insert({
    name: name.value.trim(),
    description: description.value.trim() || null,
    repository_url: repositoryUrl.value.trim() || null,
    homepage: homepage.value.trim() || null,
    documentation: documentation.value.trim() || null,
    license: license.value.trim() || null,
    owner_id: user.id,
  })
  saving.value = false
  if (e) {
    error.value = e.message
    return
  }
  router.push('/dashboard/packages')
}
</script>

<template>
  <div>
    <h1>Publish package</h1>
    <form @submit.prevent="save" class="form">
      <label>Name <input v-model="name" required placeholder="my-package" /></label>
      <label>Description <input v-model="description" placeholder="Short description" /></label>
      <label>Repository URL <input v-model="repositoryUrl" type="url" placeholder="https://github.com/..." /></label>
      <label>Homepage <input v-model="homepage" type="url" /></label>
      <label>Documentation <input v-model="documentation" type="url" /></label>
      <label>License <input v-model="license" placeholder="MIT" /></label>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" :disabled="saving">{{ saving ? 'Saving…' : 'Create package' }}</button>
    </form>
    <p class="hint">After creating the package, add a version (tarball) from the package page or <router-link to="/dashboard/packages">My Packages</router-link>.</p>
  </div>
</template>

<style scoped>
.form { max-width: 500px; }
.form label { display: block; margin-bottom: 0.75rem; }
.form input { width: 100%; padding: 0.5rem; margin-top: 0.25rem; border: 1px solid var(--border, #e2e8f0); border-radius: 4px; }
.form .error { color: var(--error, #dc2626); }
.form button { margin-top: 1rem; padding: 0.5rem 1rem; cursor: pointer; }
.hint { margin-top: 1rem; color: var(--text-muted, #64748b); font-size: 0.9rem; }
</style>
