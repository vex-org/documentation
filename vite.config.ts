import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, readFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import type { Plugin } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..', '..')

/** Serve pre-built VitePress docs from docs/.vitepress/dist during dev */
function serveDocsPlugin(): Plugin {
  const docsDistDir = join(__dirname, 'dist-docs')
  return {
    name: 'serve-vitepress-docs',
    configureServer: {
      order: 'pre',
      handler(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/docs')) return next()
          let filePath = req.url.replace(/^\/docs/, '') || '/index.html'
          filePath = filePath.split('?')[0]
          if (filePath.endsWith('/')) filePath += 'index.html'
          if (!filePath.includes('.')) filePath += '.html'
          const absolute = join(docsDistDir, filePath)
          if (!existsSync(absolute) || !statSync(absolute).isFile()) return next()
          const ext = filePath.split('.').pop() ?? ''
          const mimeTypes: Record<string, string> = { html: 'text/html; charset=utf-8', js: 'application/javascript', css: 'text/css', json: 'application/json', svg: 'image/svg+xml', png: 'image/png', woff2: 'font/woff2', woff: 'font/woff' }
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
          res.end(readFileSync(absolute))
        })
      },
    },
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), serveDocsPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3334,
    fs: {
      allow: [repoRoot],
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco': ['monaco-editor', 'monaco-textmate', 'monaco-editor-textmate', 'vscode-oniguruma'],
          'vue-core': ['vue', 'vue-router'],
          'supabase': ['@supabase/supabase-js'],
          'markdown': ['marked', 'dompurify', 'turndown'],
          'tiptap': ['@tiptap/vue-3', '@tiptap/starter-kit', '@tiptap/extension-placeholder', '@tiptap/extension-image', '@tiptap/extension-link', '@tiptap/extension-code-block-lowlight'],
          'lowlight': ['lowlight'],
        },
      },
    },
  },
})
