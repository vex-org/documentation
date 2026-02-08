<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../supabase/client'

const route = useRoute()
const router = useRouter()
const packageName = computed(() => route.params.name as string)
const version = ref('')
const readmeText = ref('')
const manifestJson = ref('{}')
const artifactFile = ref<File | null>(null)
const uploading = ref(false)
const error = ref('')
const pkgId = ref<string | null>(null)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data } = await supabase.from('packages').select('id').eq('name', packageName.value).eq('owner_id', user.id).single()
  if (!data) {
    error.value = 'Package not found or not owned by you'
    return
  }
  pkgId.value = data.id
})

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  artifactFile.value = input.files?.[0] ?? null
}

async function upload() {
  if (!pkgId.value || !version.value.trim()) {
    error.value = 'Version is required'
    return
  }
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  error.value = ''
  uploading.value = true

  if (!artifactFile.value) {
    error.value = 'Please select an artifact file (e.g. .tar.gz)'
    uploading.value = false
    return
  }
  const path = `${packageName.value}/${version.value.trim()}/${artifactFile.value.name}`
  const { error: uploadErr } = await supabase.storage.from('artifacts').upload(path, artifactFile.value, { upsert: true })
  if (uploadErr) {
    error.value = uploadErr.message
    uploading.value = false
    return
  }
  const artifactPath = path

  let manifest: unknown = null
  try {
    manifest = JSON.parse(manifestJson.value || '{}')
  } catch {
    error.value = 'Invalid JSON in manifest'
    uploading.value = false
    return
  }

  const { error: insertErr } = await supabase.from('versions').insert({
    package_id: pkgId.value,
    version: version.value.trim(),
    readme_text: readmeText.value.trim() || null,
    manifest_json: manifest,
    artifact_path: artifactPath,
  })
  uploading.value = false
  if (insertErr) {
    error.value = insertErr.message
    return
  }
  router.push(`/packages/${packageName.value}`)
}
</script>

<template>
  <div>
    <h1>Publish version: {{ packageName }}</h1>
    <form @submit.prevent="upload" class="form">
      <label>Version (semver) <input v-model="version" required placeholder="1.0.0" /></label>
      <label>Readme <textarea v-model="readmeText" rows="6" /></label>
      <label>Manifest (JSON) <textarea v-model="manifestJson" rows="4" /></label>
      <label>Artifact (tarball) <input type="file" accept=".tar.gz,.tgz,.zip" @change="onFileChange" /></label>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" :disabled="uploading || !pkgId || !artifactFile">{{ uploading ? 'Uploading…' : 'Publish version' }}</button>
    </form>
    <p class="hint">Create bucket <code>artifacts</code> in Supabase Dashboard (Storage). Allow authenticated uploads and public read if needed for installs.</p>
  </div>
</template>

<style scoped>
.form { max-width: 500px; }
.form label { display: block; margin-bottom: 0.75rem; }
.form input, .form textarea { width: 100%; padding: 0.5rem; margin-top: 0.25rem; border: 1px solid var(--border, #e2e8f0); border-radius: 4px; }
.form .error { color: var(--error, #dc2626); }
.form button { margin-top: 1rem; padding: 0.5rem 1rem; cursor: pointer; }
.hint { margin-top: 1rem; color: var(--text-muted, #64748b); font-size: 0.875rem; }
.hint code { background: var(--bg-code, #f1f5f9); padding: 0.125rem 0.25rem; border-radius: 4px; }
</style>
