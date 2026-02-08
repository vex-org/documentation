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
  error.value = ''; saving.value = true
  const { error: e } = await supabase.from('packages').insert({ name: name.value.trim(), description: description.value.trim() || null, repository_url: repositoryUrl.value.trim() || null, homepage: homepage.value.trim() || null, documentation: documentation.value.trim() || null, license: license.value.trim() || null, owner_id: user.id })
  saving.value = false
  if (e) { error.value = e.message; return }
  router.push('/dashboard/packages')
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-white mb-6">Publish Package</h1>
    <form @submit.prevent="save" class="max-w-lg space-y-4">
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Name</label>
        <input v-model="name" required placeholder="my-package" class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Description</label>
        <input v-model="description" placeholder="Short description" class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Repository URL</label>
        <input v-model="repositoryUrl" type="url" placeholder="https://github.com/..." class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Homepage</label>
        <input v-model="homepage" type="url" class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Documentation</label>
        <input v-model="documentation" type="url" class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">License</label>
        <input v-model="license" placeholder="MIT" class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
      <button type="submit" :disabled="saving" class="w-full py-2.5 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-all disabled:opacity-50 cursor-pointer">{{ saving ? 'Creating…' : 'Create Package' }}</button>
    </form>
    <p class="mt-4 text-sm text-vex-text-muted">After creating the package, add a version from <router-link to="/dashboard/packages" class="text-vex-primary hover:text-vex-accent">My Packages</router-link>.</p>
  </div>
</template>
