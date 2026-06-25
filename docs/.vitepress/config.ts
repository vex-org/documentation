import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Vex",
  description: "Modern parallelism-first systems programming language",
  base: "/docs/",
  outDir: "../dist-docs",
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  markdown: {
    languageAlias: {
      vex: "rust",
      vexhdl: "rust",
    },
  },
  themeConfig: {
    logo: "/vex-logo.svg",
    siteTitle: "Vex Docs",

    nav: [
      { text: "Guide", link: "/guide/introduction" },
      { text: "VexHDL", link: "/hdl/" },
      { text: "Architecture", link: "/architecture/" },
      { text: "Standard Library", link: "/std/" },
      { text: "Reference", link: "/references/" },
      { text: "Playground", link: "https://vex-lang.org/playground" },
      { text: "Arena", link: "https://vex-lang.org/arena" },
    ],

    sidebar: {
      "/hdl/": [
        {
          text: "VexHDL Guide",
          items: [
            { text: "Overview", link: "/hdl/" },
            { text: "Getting Started", link: "/hdl/getting-started" },
            { text: "Syntax Reference", link: "/hdl/syntax-reference" },
            { text: "Procedural & Control", link: "/hdl/procedural-control" },
            { text: "Expressions & Operators", link: "/hdl/expressions-operators" },
            { text: "Safety & Policies", link: "/hdl/safety-policies" },
            { text: "Transpiler & Synthesis", link: "/hdl/transpiler-integration" },
            { text: "Design Examples", link: "/hdl/design-examples" },
          ],
        },
      ],
      "/guide/": [
        {
          text: "Getting Started",
          items: [
            { text: "Introduction", link: "/guide/introduction" },
            { text: "Installation", link: "/guide/installation" },
            { text: "Why Vex?", link: "/guide/why-vex" },
          ],
        },
        {
          text: "Language Core",
          items: [
            { text: "Syntax", link: "/guide/basics/syntax" },
            { text: "Variables", link: "/guide/basics/variables" },
            { text: "Functions", link: "/guide/basics/functions" },
            { text: "Control Flow", link: "/guide/basics/control-flow" },
            { text: "Loops & Labels", link: "/guide/basics/loops" },
            {
              text: "Template Literals",
              link: "/guide/basics/template-literals",
            },
            { text: "Modules", link: "/guide/modules" },
          ],
        },
        {
          text: "Types & Data Model",
          items: [
            { text: "Primitives", link: "/guide/types/primitives" },
            { text: "Arrays", link: "/guide/types/arrays" },
            { text: "Tuples", link: "/guide/types/tuples" },
            { text: "Structs", link: "/guide/types/structs" },
            { text: "Enums", link: "/guide/types/enums" },
            { text: "Unions", link: "/guide/types/unions" },
            { text: "Pattern Matching", link: "/guide/types/pattern-matching" },
            { text: "Generics", link: "/guide/types/generics" },
            { text: "Contracts", link: "/guide/types/contracts" },
            { text: "Policies", link: "/guide/types/policies" },
            { text: "Strings", link: "/guide/types/strings" },
            {
              text: "Collections",
              collapsed: true,
              items: [
                { text: "Vec", link: "/guide/types/vec" },
                { text: "Map & Set", link: "/guide/types/map-set" },
                { text: "OrderedMap", link: "/guide/types/ordered-map" },
                { text: "Range", link: "/guide/types/range" },
              ],
            },
            {
              text: "Advanced Types",
              collapsed: true,
              items: [
                { text: "Type Aliases", link: "/guide/types/aliases" },
                { text: "Function Types", link: "/guide/types/function-types" },
                { text: "Closures", link: "/guide/types/closures" },
                { text: "Raw Pointers", link: "/guide/types/raw-pointers" },
                { text: "Never & Unit", link: "/guide/types/never-and-unit" },
                { text: "Complex", link: "/guide/types/complex" },
                { text: "Variadics", link: "/guide/types/variadics" },
              ],
            },
            {
              text: "Standard API",
              collapsed: true,
              items: [
                { text: "Option API", link: "/guide/types/option-api" },
                { text: "Result API", link: "/guide/types/result-api" },
                {
                  text: "Contracts Reference",
                  link: "/guide/types/contracts-reference",
                },
                {
                  text: "Advanced Patterns",
                  link: "/guide/types/advanced-patterns",
                },
              ],
            },
          ],
        },
        {
          text: "Memory",
          items: [
            { text: "Ownership", link: "/guide/memory/ownership" },
            { text: "Borrowing", link: "/guide/memory/borrowing" },
            { text: "Lifetimes", link: "/guide/memory/lifetimes" },
            { text: "Memory Safety", link: "/guide/memory/safety" },
            { text: "VUMM", link: "/guide/memory/vumm" },
            {
              text: "Memory Primitives",
              collapsed: true,
              items: [
                { text: "Box", link: "/guide/memory/box" },
                { text: "Ptr<T>", link: "/guide/memory/ptr-t" },
                { text: "Span<T>", link: "/guide/memory/span-t" },
                { text: "RawBuf", link: "/guide/memory/rawbuf" },
                { text: "Pin<T>", link: "/guide/memory/pin" },
                { text: "Mem Prelude", link: "/guide/memory/mem-prelude" },
              ],
            },
          ],
        },
        {
          text: "Concurrency",
          items: [
            { text: "Overview", link: "/guide/concurrency/overview" },
            { text: "Async", link: "/guide/concurrency/async" },
            {
              text: "Async Internals",
              link: "/guide/concurrency/async-internals",
            },
            { text: "Channels", link: "/guide/concurrency/channels" },
            { text: "Deep Dive", link: "/guide/concurrency/deep-dive" },
          ],
        },
        {
          text: "SIMD & Tensors",
          items: [
            { text: "SIMD Overview", link: "/guide/simd/" },
            { text: "SIMD Operations", link: "/guide/simd/simd-operations" },
            { text: "Tensor & Mask", link: "/guide/simd/tensor-mask" },
            { text: "Dynamic Tensors", link: "/guide/simd/dynamic-tensors" },
            { text: "SIR Pipeline", link: "/guide/simd/sir-pipeline" },
          ],
        },
        {
          text: "Advanced",
          items: [
            { text: "Methods", link: "/guide/advanced/methods" },
            { text: "Operators", link: "/guide/advanced/operators" },
            {
              text: "Operators Reference",
              link: "/guide/advanced/operators-reference",
            },
            { text: "Pointers", link: "/guide/advanced/pointers" },
            {
              text: "Compiler Directives",
              link: "/guide/advanced/compiler-directives",
            },
            { text: "Assembly", link: "/guide/advanced/assembly" },
            { text: "Builtins", link: "/guide/advanced/builtins" },
            { text: "Comptime", link: "/guide/advanced/comptime" },
            { text: "Unsafe", link: "/guide/advanced/unsafe" },
          ],
        },
        {
          text: "Compute & Acceleration",
          items: [
            {
              text: "GPU & SIR",
              collapsed: true,
              items: [
                { text: "GPU Programming", link: "/guide/gpu/" },
                { text: "Graph Functions", link: "/guide/gpu/graph-functions" },
                { text: "Fusion Graph", link: "/guide/fusion/graph" },
              ],
            },
            { text: "Math", link: "/guide/math" },
            { text: "Autograd", link: "/guide/advanced/autograd" },
            { text: "Crypto", link: "/guide/crypto" },
            { text: "Bit Operations", link: "/guide/bit" },
          ],
        },
        {
          text: "Systems & Tooling",
          items: [
            { text: "Error Handling", link: "/guide/error-handling" },
            {
              text: "FFI & Interop",
              collapsed: true,
              items: [
                { text: "FFI", link: "/guide/ffi" },
                { text: "FFI Deep Dive", link: "/guide/ffi-deep-dive" },
                { text: "Freestanding", link: "/guide/freestanding" },
              ],
            },
            { text: "Platform Support", link: "/guide/platform-support" },
            {
              text: "Tooling",
              collapsed: true,
              items: [
                {
                  text: "Compilation Modes",
                  link: "/guide/tooling/compilation-modes",
                },
                { text: "Toolchain", link: "/guide/tooling/full-toolchain" },
                { text: "Testing", link: "/guide/tooling/testing" },
                { text: "VAPE Analyzer", link: "/guide/tooling/vape" },
              ],
            },
            { text: "Standard Library Overview", link: "/guide/stdlib" },
          ],
        },
        {
          text: "Contributing",
          items: [
            { text: "Contributing Guide", link: "/guide/contributing" },
            { text: "Versioning & Stability", link: "/guide/versioning" },
            { text: "Benchmarks", link: "/guide/benchmarks" },
            { text: "FAQ", link: "/guide/faq" },
            { text: "Glossary", link: "/guide/glossary" },
          ],
        },
      ],
      "/references/": [
        {
          text: "Reference",
          items: [
            { text: "Overview", link: "/references/" },
            { text: "CLI Reference", link: "/references/vex-cli-reference" },
            { text: "Test Reference", link: "/references/vex-test-reference" },
            { text: "Package Manager", link: "/references/vex-pm-reference" },
            { text: "PM Deep Dive", link: "/references/vex-pm-deep-dive" },
            { text: "Doc Reference", link: "/references/vex-doc-reference" },
            { text: "Native FFI", link: "/references/vex-pm-native-ffi" },
          ],
        },
      ],
      "/architecture/": [
        {
          text: "Architecture",
          items: [
            { text: "Overview", link: "/architecture/" },
            {
              text: "Compiler Pipeline",
              link: "/architecture/compiler-pipeline",
            },
            { text: "SIR & Backends", link: "/architecture/sir-and-backends" },
            {
              text: "SIR Backends Reference",
              link: "/architecture/sir-backends-reference",
            },
            {
              text: "SIR Passes Deep Dive",
              link: "/architecture/sir-passes-deep-dive",
            },
            {
              text: "Runtime & Tooling",
              link: "/architecture/runtime-and-tooling",
            },
            {
              text: "Runtime Architecture",
              link: "/architecture/runtime-architecture",
            },
          ],
        },
      ],
      "/std/": [
        {
          text: "Standard Library",
          items: [
            { text: "Overview", link: "/std/" },
            { text: "Bit", link: "/std/bit" },
            { text: "CLI", link: "/std/cli" },
            {
              text: "Compress",
              collapsed: true,
              items: [
                { text: "Overview", link: "/std/compress/" },
                { text: "LZ4", link: "/std/compress/lz4" },
                { text: "Zstd", link: "/std/compress/zstd" },
                { text: "Gzip & Deflate", link: "/std/compress/gzip" },
                { text: "Brotli", link: "/std/compress/brotli" },
              ],
            },
            { text: "Context", link: "/std/context" },
            {
              text: "Crypto",
              collapsed: true,
              items: [
                { text: "Overview", link: "/std/crypto/" },
                { text: "Hashing", link: "/std/crypto/hashing" },
                { text: "Encryption (AEAD)", link: "/std/crypto/encryption" },
                { text: "KDF & Signatures", link: "/std/crypto/kdf" },
              ],
            },
            {
              text: "DB & ORM",
              collapsed: true,
              items: [
                { text: "Overview", link: "/std/db/" },
                { text: "Connection & Queries", link: "/std/db/connection" },
                { text: "ORM (Db<T>)", link: "/std/db/orm" },
              ],
            },
            { text: "Encoding", link: "/std/encoding" },
            { text: "Errors", link: "/std/errors" },
            {
              text: "FS",
              collapsed: true,
              items: [
                { text: "Overview", link: "/std/fs/" },
                { text: "File I/O", link: "/std/fs/file" },
                { text: "Paths & Directories", link: "/std/fs/paths" },
              ],
            },
            { text: "Hash", link: "/std/hash" },
            {
              text: "HTTP & Fiber",
              collapsed: true,
              items: [
                { text: "Overview", link: "/std/http/" },
                { text: "Core Server", link: "/std/http/server" },
                { text: "HTTP Client", link: "/std/http/client" },
                { text: "Fiber Framework", link: "/std/http/fiber" },
                { text: "WebSockets", link: "/std/http/ws" },
                { text: "HTTP/2", link: "/std/http/h2" },
                { text: "Middleware", link: "/std/http/middleware" },
              ],
            },
            { text: "Inference", link: "/std/inference" },
            { text: "IO", link: "/std/io" },
            { text: "Log", link: "/std/log" },
            { text: "Math", link: "/std/math" },
            { text: "Mem", link: "/std/mem" },
            { text: "ML", link: "/std/ml" },
            { text: "Net", link: "/std/net" },
            { text: "Rand", link: "/std/rand" },
            {
              text: "Regex",
              collapsed: true,
              items: [
                { text: "Overview & Engine", link: "/std/regex/" },
                { text: "API Reference", link: "/std/regex/api" },
                { text: "Engine Internals", link: "/std/regex/internals" },
              ],
            },
            { text: "SemVer", link: "/std/semver" },
            {
              text: "Serde",
              collapsed: true,
              items: [
                { text: "Overview & Contracts", link: "/std/serde/" },
                { text: "JSON", link: "/std/serde/json" },
                { text: "TOML", link: "/std/serde/toml" },
                { text: "CSV", link: "/std/serde/csv" },
                { text: "MessagePack", link: "/std/serde/msgpack" },
                { text: "YAML", link: "/std/serde/yaml" },
                { text: "CBOR", link: "/std/serde/cbor" },
              ],
            },
            { text: "Sort", link: "/std/sort" },
            { text: "StrConv", link: "/std/strconv" },
            { text: "Strings", link: "/std/strings" },
            { text: "Sys", link: "/std/sys" },
            { text: "Testing", link: "/std/testing" },
            {
              text: "Time",
              collapsed: true,
              items: [
                { text: "Overview", link: "/std/time/" },
                { text: "Time & Duration API", link: "/std/time/api" },
              ],
            },
            { text: "Unicode", link: "/std/unicode" },
            { text: "Url", link: "/std/url" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/meftunca/vex" }],

    search: {
      provider: "local",
    },

    editLink: {
      pattern:
        "https://github.com/meftunca/vex/edit/main/web/documentation/docs/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-2026 Vex Contributors",
    },
  },
});
