import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vex',
  description: 'Modern parallelism-first systems programming language',
  base: '/docs/',
  outDir: '../dist-docs',
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/vex-logo.svg',
    siteTitle: 'Vex Docs',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Reference', link: '/references/' },
      { text: 'Playground', link: 'https://vex-lang.org/playground' },
      { text: 'Arena', link: 'https://vex-lang.org/arena' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
          ],
        },
        {
          text: 'Basics',
          items: [
            { text: 'Syntax', link: '/guide/basics/syntax' },
            { text: 'Variables', link: '/guide/basics/variables' },
            { text: 'Functions', link: '/guide/basics/functions' },
            { text: 'Control Flow', link: '/guide/basics/control-flow' },
          ],
        },
        {
          text: 'Types',
          items: [
            { text: 'Primitives', link: '/guide/types/primitives' },
            { text: 'Structs', link: '/guide/types/structs' },
            { text: 'Enums', link: '/guide/types/enums' },
            { text: 'Generics', link: '/guide/types/generics' },
            { text: 'Contracts', link: '/guide/types/contracts' },
            { text: 'Pattern Matching', link: '/guide/types/pattern-matching' },
            { text: 'Strings', link: '/guide/types/strings' },
            { text: 'Vec', link: '/guide/types/vec' },
            { text: 'Map & Set', link: '/guide/types/map-set' },
            { text: 'Type Aliases', link: '/guide/types/aliases' },
          ],
        },
        {
          text: 'Memory',
          items: [
            { text: 'Ownership', link: '/guide/memory/ownership' },
            { text: 'Borrowing', link: '/guide/memory/borrowing' },
            { text: 'Lifetimes', link: '/guide/memory/lifetimes' },
            { text: 'Box', link: '/guide/memory/box' },
            { text: 'Ptr<T>', link: '/guide/memory/ptr-t' },
            { text: 'Span<T>', link: '/guide/memory/span-t' },
            { text: 'RawBuf', link: '/guide/memory/rawbuf' },
            { text: 'Memory Safety', link: '/guide/memory/safety' },
            { text: 'VUMM', link: '/guide/memory/vumm' },
          ],
        },
        {
          text: 'Concurrency',
          items: [
            { text: 'Overview', link: '/guide/concurrency/overview' },
            { text: 'Async', link: '/guide/concurrency/async' },
            { text: 'Channels', link: '/guide/concurrency/channels' },
          ],
        },
        {
          text: 'SIMD & Tensors',
          items: [
            { text: 'SIMD Overview', link: '/guide/simd/' },
            { text: 'Tensor & Mask', link: '/guide/simd/tensor-mask' },
            { text: 'SIR Pipeline', link: '/guide/simd/sir-pipeline' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Methods', link: '/guide/advanced/methods' },
            { text: 'Operators', link: '/guide/advanced/operators' },
            { text: 'Pointers', link: '/guide/advanced/pointers' },
            { text: 'Builtins', link: '/guide/advanced/builtins' },
            { text: 'Comptime', link: '/guide/advanced/comptime' },
            { text: 'Autograd', link: '/guide/advanced/autograd' },
            { text: 'Unsafe', link: '/guide/advanced/unsafe' },
          ],
        },
        {
          text: 'More',
          items: [
            { text: 'Modules', link: '/guide/modules' },
            { text: 'Error Handling', link: '/guide/error-handling' },
            { text: 'FFI', link: '/guide/ffi' },
            { text: 'Standard Library', link: '/guide/stdlib' },
            { text: 'GPU Programming', link: '/guide/gpu/' },
            { text: 'Math', link: '/guide/math' },
            { text: 'Crypto', link: '/guide/crypto' },
            { text: 'Bit Operations', link: '/guide/bit' },
            { text: 'Freestanding', link: '/guide/freestanding' },
            { text: 'Testing', link: '/guide/tooling/testing' },
            { text: 'Fusion Graph', link: '/guide/fusion/graph' },
          ],
        },
      ],
      '/references/': [
        {
          text: 'Reference',
          items: [
            { text: 'CLI Reference', link: '/references/vex-cli-reference' },
            { text: 'Test Reference', link: '/references/vex-test-reference' },
            { text: 'Package Manager', link: '/references/vex-pm-reference' },
            { text: 'Doc Reference', link: '/references/vex-doc-reference' },
            { text: 'Native FFI', link: '/references/vex-pm-native-ffi' },
          ],
        },
      ],
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/meftunca/vex' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/meftunca/vex/edit/main/web/documentation/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-2026 Vex Contributors',
    },
  },
})
