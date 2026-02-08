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
    <h1 class="text-2xl font-bold text-white mb-6">{{ isEdit ? 'Edit Post' : 'New Post' }}</h1>
    <form @submit.prevent="save" class="max-w-2xl space-y-4">
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Title</label>
        <input v-model="title" required class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Slug</label>
        <input v-model="slug" required class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Excerpt</label>
        <input v-model="excerpt" class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Cover image</label>
        <input type="file" accept="image/*" @change="onCoverFileChange" class="w-full text-sm text-vex-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-vex-primary/10 file:text-vex-primary file:font-medium file:cursor-pointer hover:file:bg-vex-primary/20 cursor-pointer" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Body (Markdown)</label>
        <textarea v-model="bodyMd" rows="14" required class="w-full px-4 py-3 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all resize-y font-mono text-sm" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Tags (comma-separated)</label>
        <input v-model="tagsStr" placeholder="vex, tutorial" class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-vex-text mb-1.5">Status</label>
        <select v-model="status" class="w-full px-4 py-2.5 rounded-xl border border-vex-border bg-vex-surface text-white focus:outline-none focus:border-vex-primary focus:ring-1 focus:ring-vex-primary transition-all cursor-pointer">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
      <button type="submit" :disabled="saving" class="w-full py-2.5 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white font-medium transition-all disabled:opacity-50 cursor-pointer">{{ saving ? 'Saving…' : 'Save' }}</button>
    </form>
  </div>
</template>
