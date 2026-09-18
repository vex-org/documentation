import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import {
  dirname,
  extname,
  join,
  resolve,
  sep,
} from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const srcDir = join(__dirname, 'src')
const repoRoot = resolve(__dirname, '..', '..')
const docsDistDir = resolve(__dirname, 'dist-docs')

const MIME_TYPES: Record<string, string> = {
  html: 'text/html; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  mjs: 'text/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8',
  json: 'application/json; charset=utf-8',
  map: 'application/json; charset=utf-8',

  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  avif: 'image/avif',
  gif: 'image/gif',
  ico: 'image/x-icon',

  woff: 'font/woff',
  woff2: 'font/woff2',

  wasm: 'application/wasm',
}

/**
 * Serve pre-built VitePress docs from dist-docs during development.
 *
 * Uses streaming IO instead of sync readFile/stat calls so large assets
 * don't block Vite's dev server event loop.
 */
function serveDocsPlugin(): Plugin {
  return {
    name: 'serve-vitepress-docs',

    configureServer: {
      order: 'pre',

      handler(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url) return next()

          let pathname: string

          try {
            pathname = decodeURIComponent(
              new URL(req.url, 'http://vite.local').pathname,
            )
          } catch {
            return next()
          }

          if (
            pathname !== '/docs' &&
            !pathname.startsWith('/docs/')
          ) {
            return next()
          }

          let filePath = pathname.slice('/docs'.length)

          if (!filePath || filePath === '/') {
            filePath = '/index.html'
          } else if (filePath.endsWith('/')) {
            filePath += 'index.html'
          } else if (!extname(filePath)) {
            filePath += '.html'
          }

          // "." prevents an absolute URL path from replacing docsDistDir.
          const absolute = resolve(
            docsDistDir,
            `.${filePath}`,
          )

          // Prevent path traversal outside dist-docs.
          if (
            absolute !== docsDistDir &&
            !absolute.startsWith(`${docsDistDir}${sep}`)
          ) {
            return next()
          }

          try {
            const fileStat = await stat(absolute)

            if (!fileStat.isFile()) {
              return next()
            }

            const extension = extname(absolute)
              .slice(1)
              .toLowerCase()

            res.setHeader(
              'Content-Type',
              MIME_TYPES[extension] ??
                'application/octet-stream',
            )

            // VitePress hashed assets can safely be cached aggressively.
            if (filePath.includes('/assets/')) {
              res.setHeader(
                'Cache-Control',
                'public, max-age=31536000, immutable',
              )
            } else {
              res.setHeader(
                'Cache-Control',
                'no-cache',
              )
            }

            const stream = createReadStream(absolute)

            stream.on('error', (error) => {
              if (res.headersSent) {
                res.destroy(error)
                return
              }

              next(error)
            })

            stream.pipe(res)
          } catch {
            next()
          }
        })
      },
    },
  }
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    serveDocsPlugin(),
  ],

  resolve: {
    alias: {
      '@': srcDir,
    },

    // Particularly useful in workspaces / monorepos.
    dedupe: [
      'vue',
      'vue-router',
    ],
  },

  optimizeDeps: {
    /**
     * monaco-textmate@3 creates its Onig scanners via `require('onigasm')`
     * while the app calls `loadWASM` from the ESM side of the same package.
     * Both must resolve to one module instance: the WASM binding that
     * `loadWASM` installs is module-scoped, and if the scanner sees another
     * copy, every tokenize throws `_malloc` of undefined.
     */
    include: [
      'onigasm',
      'monaco-textmate',
      'monaco-editor-textmate',
    ],
  },

  server: {
    port: 3334,

    fs: {
      allow: [repoRoot],
    },
  },

  worker: {
    format: 'es',
  },

  build: {
    target: 'es2024',

    cssCodeSplit: true,

    // You're already targeting modern browsers.
    // Removes Vite's modulepreload compatibility runtime.
    modulePreload: {
      polyfill: false,
    },

    /**
     * Saves some build time.
     *
     * Vite otherwise compresses generated chunks just to print their
     * gzip sizes. It has no effect on production output.
     */
    reportCompressedSize: false,

    rollupOptions: {
      output: {
        /**
         * Rolldown native chunking.
         *
         * manualChunks is only kept for Rollup compatibility and is
         * deprecated under Rolldown.
         */
        advancedChunks: {
          minSize: 20_000,

          groups: [
            /**
             * Monaco is huge and usually lazy-loaded.
             * Keep its ecosystem isolated from the application bundle.
             */
            {
              name: 'monaco',
              test: /node_modules[\\/](?:monaco-editor|monaco-textmate|monaco-editor-textmate|vscode-oniguruma|vscode-textmate)(?:[\\/]|$)/,
              priority: 100,
            },

            /**
             * Vue runtime/router should remain stable between app builds,
             * giving browsers a long-lived cacheable core chunk.
             */
            {
              name: 'vue-core',
              test: /node_modules[\\/](?:vue|vue-router|@vue[\\/][^\\/]+)(?:[\\/]|$)/,
              priority: 90,
            },

            /**
             * supabase-js is actually split across multiple @supabase/*
             * packages, so match the complete ecosystem instead of only
             * @supabase/supabase-js.
             */
            {
              name: 'supabase',
              test: /node_modules[\\/]@supabase[\\/]/,
              priority: 80,
            },

            {
              name: 'tiptap',
              test: /node_modules[\\/](?:@tiptap[\\/]|prosemirror-)/,
              priority: 70,
            },

            {
              name: 'markdown',
              test: /node_modules[\\/](?:marked|dompurify|turndown)(?:[\\/]|$)/,
              priority: 60,
            },

            /**
             * lowlight uses highlight.js internally, so bundling both
             * prevents the syntax-highlighting stack leaking into vendor.
             */
            {
              name: 'lowlight',
              test: /node_modules[\\/](?:lowlight|highlight\.js)(?:[\\/]|$)/,
              priority: 50,
            },

            /**
             * Only extract remaining dependencies when they're actually
             * shared by multiple entry/dynamic chunks.
             *
             * Avoids creating a giant "everything else vendor.js".
             */
            {
              name: 'vendor',
              test: /node_modules[\\/]/,
              minShareCount: 2,
              minSize: 30_000,
              priority: 1,
            },
          ],
        },
      },
    },
  },
})