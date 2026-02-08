import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: { alias: { '@': '/src' } },
  server: { port: 3334 },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          tiptap: ['@tiptap/vue-3', '@tiptap/starter-kit', '@tiptap/extension-placeholder', '@tiptap/extension-image', '@tiptap/extension-link', '@tiptap/extension-code-block-lowlight'],
        },
      },
    },
  },
})
