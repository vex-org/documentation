<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../supabase/client'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import TurndownService from 'turndown'
import { marked } from 'marked'
import {
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus, ImagePlus, Link2, Undo2, Redo2, CodeXml,
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const id = computed(() => route.params.id as string)

const title = ref('')
const slug = ref('')
const excerpt = ref('')
const status = ref<'draft' | 'published'>('draft')
const tagsStr = ref('')
const coverImagePath = ref('')
const coverImageFile = ref<File | null>(null)
const saving = ref(false)
const error = ref('')

const lowlight = createLowlight(common)

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
})

const editor = useEditor({
  extensions: [
    StarterKit.configure({ codeBlock: false }),
    Placeholder.configure({ placeholder: 'Start writing your post…' }),
    Image.configure({ inline: false, allowBase64: true }),
    Link.configure({ openOnClick: false, autolink: true }),
    CodeBlockLowlight.configure({ lowlight }),
  ],
  editorProps: {
    attributes: {
      class: 'min-h-[400px] outline-none prose prose-invert max-w-none',
    },
  },
})

// Utility: get markdown from editor HTML
function getMarkdown(): string {
  if (!editor.value) return ''
  const html = editor.value.getHTML()
  return turndown.turndown(html)
}

// Utility: set editor content from markdown
function setEditorContent(md: string) {
  if (!editor.value || !md) return
  const html = marked.parse(md) as string
  editor.value.commands.setContent(html)
}

// Auto-generate slug from title
watch(title, (val) => {
  if (!isEdit.value && val) {
    slug.value = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
})

onMounted(async () => {
  if (!isEdit.value) return
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data, error: e } = await supabase.from('posts').select('id, title, slug, body_md, excerpt, status, cover_image_path').eq('id', id.value).eq('author_id', user.id).single()
  if (e || !data) { error.value = e?.message ?? 'Post not found'; return }
  title.value = data.title
  slug.value = data.slug
  excerpt.value = data.excerpt ?? ''
  status.value = data.status as 'draft' | 'published'
  coverImagePath.value = data.cover_image_path ?? ''
  setEditorContent(data.body_md)
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
  if (uploadErr) { error.value = uploadErr.message; return null }
  return path
}

function addImage() {
  const url = window.prompt('Image URL')
  if (url && editor.value) editor.value.chain().focus().setImage({ src: url }).run()
}

function setLink() {
  const url = window.prompt('URL', editor.value?.getAttributes('link').href || '')
  if (url === null) return
  if (url === '') { editor.value?.chain().focus().unsetLink().run(); return }
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

async function save() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  error.value = ''; saving.value = true
  const bodyMd = getMarkdown()
  const tags = tagsStr.value.split(',').map((t) => t.trim()).filter(Boolean)

  if (isEdit.value) {
    const newCover = await uploadCoverImage(id.value)
    if (coverImageFile.value && newCover === null) { saving.value = false; return }
    const { error: e } = await supabase.from('posts').update({
      title: title.value, slug: slug.value, body_md: bodyMd,
      excerpt: excerpt.value || null, cover_image_path: (newCover ?? coverImagePath.value) || null,
      status: status.value,
      published_at: status.value === 'published' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }).eq('id', id.value).eq('author_id', user.id)
    if (e) { error.value = e.message; saving.value = false; return }
    await supabase.from('post_tags').delete().eq('post_id', id.value)
    for (const tag of tags) await supabase.from('post_tags').insert({ post_id: id.value, tag })
    router.push('/dashboard/posts')
  } else {
    const { data: inserted, error: e } = await supabase.from('posts').insert({
      author_id: user.id, title: title.value, slug: slug.value, body_md: bodyMd,
      excerpt: excerpt.value || null, status: status.value,
      published_at: status.value === 'published' ? new Date().toISOString() : null,
    }).select('id').single()
    if (e) { error.value = e.message; saving.value = false; return }
    const newCover = await uploadCoverImage(inserted.id)
    if (coverImageFile.value && newCover === null) { saving.value = false; return }
    if (newCover) await supabase.from('posts').update({ cover_image_path: newCover, updated_at: new Date().toISOString() }).eq('id', inserted.id)
    for (const tag of tags) await supabase.from('post_tags').insert({ post_id: inserted.id, tag })
    router.push('/dashboard/posts')
  }
  saving.value = false
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-white">{{ isEdit ? 'Edit Post' : 'New Post' }}</h1>
      <div class="flex items-center gap-3">
        <select v-model="status" class="px-3 py-1.5 rounded-lg border border-vex-border bg-vex-surface text-sm text-white focus:outline-none focus:border-vex-primary transition-all cursor-pointer">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="button" :disabled="saving" class="px-5 py-2 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-white text-sm font-medium transition-all disabled:opacity-50 cursor-pointer" @click="save">{{ saving ? 'Saving…' : 'Save' }}</button>
      </div>
    </div>

    <div class="space-y-4">
      <!-- Title -->
      <input v-model="title" placeholder="Post title" class="w-full text-3xl font-bold bg-transparent text-white placeholder-vex-text-muted focus:outline-none border-none" />

      <!-- Meta row -->
      <div class="flex flex-wrap gap-3">
        <input v-model="slug" placeholder="slug" class="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-vex-border bg-vex-surface text-sm text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary transition-all font-mono" />
        <input v-model="excerpt" placeholder="Short description…" class="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-vex-border bg-vex-surface text-sm text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary transition-all" />
        <input v-model="tagsStr" placeholder="Tags (comma-separated)" class="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-vex-border bg-vex-surface text-sm text-white placeholder-vex-text-muted focus:outline-none focus:border-vex-primary transition-all" />
      </div>

      <!-- Cover image -->
      <div>
        <label class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-vex-border text-sm text-vex-text-muted hover:text-white hover:border-vex-primary/50 transition-all cursor-pointer">
          <ImagePlus class="w-4 h-4" />
          {{ coverImageFile?.name || coverImagePath || 'Add cover image' }}
          <input type="file" accept="image/*" class="hidden" @change="onCoverFileChange" />
        </label>
      </div>

      <!-- Rich Editor -->
      <div v-if="editor" class="rounded-xl border border-vex-border overflow-hidden bg-vex-surface">
        <!-- Toolbar -->
        <div class="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-vex-border bg-vex-bg-card">
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('bold') ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleBold().run()"><Bold class="w-4 h-4" /></button>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('italic') ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleItalic().run()"><Italic class="w-4 h-4" /></button>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('strike') ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleStrike().run()"><Strikethrough class="w-4 h-4" /></button>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('code') ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleCode().run()"><Code class="w-4 h-4" /></button>
          <div class="w-px h-5 bg-vex-border mx-1"></div>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('heading', { level: 1 }) ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"><Heading1 class="w-4 h-4" /></button>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('heading', { level: 2 }) ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"><Heading2 class="w-4 h-4" /></button>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('heading', { level: 3 }) ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"><Heading3 class="w-4 h-4" /></button>
          <div class="w-px h-5 bg-vex-border mx-1"></div>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('bulletList') ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleBulletList().run()"><List class="w-4 h-4" /></button>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('orderedList') ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleOrderedList().run()"><ListOrdered class="w-4 h-4" /></button>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('blockquote') ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleBlockquote().run()"><Quote class="w-4 h-4" /></button>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('codeBlock') ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="editor.chain().focus().toggleCodeBlock().run()"><CodeXml class="w-4 h-4" /></button>
          <button type="button" class="p-1.5 rounded-md text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer" @click="editor.chain().focus().setHorizontalRule().run()"><Minus class="w-4 h-4" /></button>
          <div class="w-px h-5 bg-vex-border mx-1"></div>
          <button type="button" :class="['p-1.5 rounded-md transition-colors cursor-pointer', editor.isActive('link') ? 'bg-vex-primary/20 text-vex-primary' : 'text-vex-text-muted hover:text-white hover:bg-white/5']" @click="setLink"><Link2 class="w-4 h-4" /></button>
          <button type="button" class="p-1.5 rounded-md text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer" @click="addImage"><ImagePlus class="w-4 h-4" /></button>
          <div class="flex-1"></div>
          <button type="button" class="p-1.5 rounded-md text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-30" :disabled="!editor.can().undo()" @click="editor.chain().focus().undo().run()"><Undo2 class="w-4 h-4" /></button>
          <button type="button" class="p-1.5 rounded-md text-vex-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-30" :disabled="!editor.can().redo()" @click="editor.chain().focus().redo().run()"><Redo2 class="w-4 h-4" /></button>
        </div>
        <!-- Editor content -->
        <EditorContent :editor="editor" class="px-6 py-4 [&_.ProseMirror]:min-h-[400px] [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-vex-text-muted [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_p]:mb-3 [&_.ProseMirror_p]:leading-relaxed [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ul]:mb-3 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ol]:mb-3 [&_.ProseMirror_li]:mb-1 [&_.ProseMirror_blockquote]:border-l-2 [&_.ProseMirror_blockquote]:border-vex-primary [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-vex-text-muted [&_.ProseMirror_blockquote]:mb-3 [&_.ProseMirror_pre]:bg-vex-bg-card [&_.ProseMirror_pre]:border [&_.ProseMirror_pre]:border-vex-border [&_.ProseMirror_pre]:rounded-lg [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:mb-3 [&_.ProseMirror_pre]:font-mono [&_.ProseMirror_pre]:text-sm [&_.ProseMirror_code]:bg-vex-primary/10 [&_.ProseMirror_code]:text-vex-accent [&_.ProseMirror_code]:px-1.5 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-sm [&_.ProseMirror_pre_code]:bg-transparent [&_.ProseMirror_pre_code]:p-0 [&_.ProseMirror_a]:text-vex-primary [&_.ProseMirror_a]:underline [&_.ProseMirror_hr]:border-vex-border [&_.ProseMirror_hr]:my-6 [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:max-w-full" />
      </div>

      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
    </div>
  </div>
</template>
