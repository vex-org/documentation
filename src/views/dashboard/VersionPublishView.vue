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
    <h1 class="text-2xl font-bold text-white mb-6">Publish Version: <span class="text-vex-primary">{{ packageName }}</span></h1>
    <form @submit.prevent="upload" class="max-w-lg space-y-4">
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Version (semver)</label>
        <input v-model="version" required placeholder="1.0.0" class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Readme</label>
        <textarea v-model="readmeText" rows="6" class="w-full px-4 py-3 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all resize-y" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Manifest (JSON)</label>
        <textarea v-model="manifestJson" rows="4" class="w-full px-4 py-3 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all resize-y font-mono text-sm" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Artifact (tarball)</label>
        <input type="file" accept=".tar.gz,.tgz,.zip" @change="onFileChange" class="w-full text-sm text-vex-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-vex-primary/10 file:text-vex-primary file:font-medium file:cursor-pointer hover:file:bg-vex-primary/20 cursor-pointer" />
      </div>
      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
      <button type="submit" :disabled="uploading || !pkgId || !artifactFile" class="w-full py-2.5 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-all disabled:opacity-50 cursor-pointer">{{ uploading ? 'Uploading…' : 'Publish Version' }}</button>
    </form>
    <p class="mt-4 text-sm text-vex-text-muted">Create bucket <code class="px-1.5 py-0.5 rounded bg-vex-surface border border-vex-border text-vex-accent text-xs">artifacts</code> in Supabase Dashboard (Storage).</p>
  </div>
</template>
