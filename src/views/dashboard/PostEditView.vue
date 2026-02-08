<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../supabase/client'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const id = computed(() => route.params.id as string)

const title = ref('')
const slug = ref('')
const bodyMd = ref('')
const excerpt = ref('')
const status = ref<'draft' | 'published'>('draft')
const tagsStr = ref('')
const coverImagePath = ref('')
const coverImageFile = ref<File | null>(null)
const saving = ref(false)
const error = ref('')

onMounted(async () => {
  if (!isEdit.value) return
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data, error: e } = await supabase.from('posts').select('id, title, slug, body_md, excerpt, status, cover_image_path').eq('id', id.value).eq('author_id', user.id).single()
  if (e || !data) {
    error.value = e?.message ?? 'Post not found'
    return
  }
  title.value = data.title
  slug.value = data.slug
  bodyMd.value = data.body_md
  excerpt.value = data.excerpt ?? ''
  status.value = data.status as 'draft' | 'published'
  coverImagePath.value = data.cover_image_path ?? ''
  const { data: tagRows } = await supabase.from('post_tags').select('tag').eq('post_id', data.id)
  tagsStr.value = (tagRows ?? []).map((r) => r.tag).join(', ')
})

function onCoverFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  coverImageFile.value = input.files?.[0] ?? null
}

async function uploadCoverImage(postId: string): Promise<string | null> {
  if (!coverImageFile.value) return coverImagePath.value || null
  const ext = coverImageFile.value.name.split('.').pop() || 'jpg'
  const path = `posts/${postId}/${Date.now()}.${ext}`
  const { error: uploadErr } = await supabase.storage.from('blog-images').upload(path, coverImageFile.value, { upsert: true })
  if (uploadErr) {
    error.value = uploadErr.message
    return null
  }
  return path
}

async function save() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  error.value = ''
  saving.value = true
  const tags = tagsStr.value.split(',').map((t) => t.trim()).filter(Boolean)
  if (isEdit.value) {
    const newCover = await uploadCoverImage(id.value)
    if (coverImageFile.value && newCover === null) {
      saving.value = false
      return
    }
    const { error: e } = await supabase.from('posts').update({
      title: title.value,
      slug: slug.value,
      body_md: bodyMd.value,
      excerpt: excerpt.value || null,
      cover_image_path: (newCover ?? coverImagePath.value) || null,
      status: status.value,
      published_at: status.value === 'published' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }).eq('id', id.value).eq('author_id', user.id)
    if (e) {
      error.value = e.message
      saving.value = false
      return
    }
    await supabase.from('post_tags').delete().eq('post_id', id.value)
    for (const tag of tags) {
      await supabase.from('post_tags').insert({ post_id: id.value, tag })
    }
    router.push('/dashboard/posts')
  } else {
    const { data: inserted, error: e } = await supabase.from('posts').insert({
      author_id: user.id,
      title: title.value,
      slug: slug.value,
      body_md: bodyMd.value,
      excerpt: excerpt.value || null,
      status: status.value,
      published_at: status.value === 'published' ? new Date().toISOString() : null,
    }).select('id').single()
    if (e) {
      error.value = e.message
      saving.value = false
      return
    }
    const newCover = await uploadCoverImage(inserted.id)
    if (coverImageFile.value && newCover === null) {
      saving.value = false
      return
    }
    if (newCover) {
      await supabase.from('posts').update({ cover_image_path: newCover, updated_at: new Date().toISOString() }).eq('id', inserted.id)
    }
    for (const tag of tags) {
      await supabase.from('post_tags').insert({ post_id: inserted.id, tag })
    }
    router.push('/dashboard/posts')
  }
  saving.value = false
}
</script>

<template>
  <div>
    <h1>{{ isEdit ? 'Edit post' : 'New post' }}</h1>
    <form @submit.prevent="save" class="form">
      <label>Title <input v-model="title" required /></label>
      <label>Slug <input v-model="slug" required /></label>
      <label>Excerpt <input v-model="excerpt" /></label>
      <label>Cover image <input type="file" accept="image/*" @change="onCoverFileChange" /></label>
      <label>Body (Markdown) <textarea v-model="bodyMd" rows="12" required /></label>
      <label>Tags (comma-separated) <input v-model="tagsStr" placeholder="vex, tutorial" /></label>
      <label>Status
        <select v-model="status">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" :disabled="saving">{{ saving ? 'Saving…' : 'Save' }}</button>
    </form>
  </div>
</template>

<style scoped>
.form { max-width: 600px; }
.form label { display: block; margin-bottom: 0.75rem; }
.form input, .form textarea, .form select { width: 100%; padding: 0.5rem; margin-top: 0.25rem; border: 1px solid var(--border, #e2e8f0); border-radius: 4px; }
.form .error { color: var(--error, #dc2626); }
.form button { margin-top: 1rem; padding: 0.5rem 1rem; cursor: pointer; }
</style>
