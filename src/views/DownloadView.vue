<script setup lang="ts">
import { ref, computed } from 'vue'
import { Download, Terminal, Monitor, Apple, Cpu, CheckCircle, Copy, ExternalLink } from 'lucide-vue-next'

const REPO = 'vex-org/releases'
const INSTALL_CMD = 'curl -fsSL https://raw.githubusercontent.com/vex-org/releases/main/install.sh | bash'

type Platform = 'linux-x86_64' | 'linux-aarch64' | 'macos-arm64'

interface PlatformInfo {
  id: Platform
  name: string
  arch: string
  os: string
  icon: typeof Monitor
  file: (v: string) => string
}

const platforms: PlatformInfo[] = [
  { id: 'linux-x86_64', name: 'Linux', arch: 'x86_64', os: 'Intel / AMD', icon: Monitor, file: (v) => `vex-${v}-linux-x86_64.tar.gz` },
  { id: 'linux-aarch64', name: 'Linux', arch: 'aarch64', os: 'ARM64', icon: Cpu, file: (v) => `vex-${v}-linux-aarch64.tar.gz` },
  { id: 'macos-arm64', name: 'macOS', arch: 'ARM64', os: 'Apple Silicon', icon: Apple, file: (v) => `vex-${v}-macos-arm64.tar.gz` },
]

const selectedPlatform = ref<Platform>('linux-x86_64')
const latestVersion = ref('v0.2.0')
const copied = ref(false)

const selectedInfo = computed(() => platforms.find(p => p.id === selectedPlatform.value)!)

const downloadUrl = computed(() => {
  const v = latestVersion.value
  const file = selectedInfo.value.file(v)
  return `https://github.com/${REPO}/releases/download/${v}/${file}`
})

const checksumUrl = computed(() => downloadUrl.value + '.sha256')

function copyInstallCmd() {
  navigator.clipboard.writeText(INSTALL_CMD)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) {
    selectedPlatform.value = 'macos-arm64'
  } else if (ua.includes('linux')) {
    selectedPlatform.value = ua.includes('aarch64') || ua.includes('arm') ? 'linux-aarch64' : 'linux-x86_64'
  }
}
detectPlatform()
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="border-b border-vex-border">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-vex-border bg-vex-surface text-sm text-vex-text-muted mb-6">
          <Download class="w-3.5 h-3.5" />
          {{ latestVersion }}
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Install Vex</h1>
        <p class="text-lg text-vex-text-muted max-w-2xl mx-auto">Install with a single command, start coding right away.</p>
      </div>
    </section>

    <!-- Quick Install -->
    <section class="border-b border-vex-border">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Terminal class="w-5 h-5 text-vex-accent" />
          Quick Install
        </h2>
        <div class="relative group">
          <div class="rounded-lg border border-vex-border bg-vex-surface/50 p-4 sm:p-5 font-mono text-sm sm:text-base text-vex-text-muted overflow-x-auto">
            <span class="text-vex-text-muted/60 select-none">$ </span>
            <span class="text-white">{{ INSTALL_CMD }}</span>
          </div>
          <button
            @click="copyInstallCmd"
            class="absolute top-3 right-3 p-2 rounded-md border border-vex-border bg-vex-bg hover:bg-vex-surface text-vex-text-muted hover:text-white transition-colors"
            :title="copied ? 'Copied!' : 'Copy'"
          >
            <CheckCircle v-if="copied" class="w-4 h-4 text-vex-success" />
            <Copy v-else class="w-4 h-4" />
          </button>
        </div>
        <p class="mt-3 text-sm text-vex-text-muted">Supports Linux and macOS (Apple Silicon). Verifies SHA-256 checksum.</p>
      </div>
    </section>

    <!-- Manual Download -->
    <section class="border-b border-vex-border">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Download class="w-5 h-5 text-vex-accent" />
          Manual Download
        </h2>

        <!-- Platform Tabs -->
        <div class="flex gap-2 mb-6 flex-wrap">
          <button
            v-for="p in platforms"
            :key="p.id"
            @click="selectedPlatform = p.id"
            :class="[
              'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors',
              selectedPlatform === p.id
                ? 'border-vex-accent bg-vex-accent/10 text-vex-accent'
                : 'border-vex-border bg-vex-surface/30 text-vex-text-muted hover:text-white hover:border-vex-border-hover'
            ]"
          >
            <component :is="p.icon" class="w-4 h-4" />
            {{ p.name }} {{ p.arch }}
          </button>
        </div>

        <!-- Download Card -->
        <div class="rounded-lg border border-vex-border bg-vex-surface/30 p-6">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 class="text-lg font-medium text-white">
                {{ selectedInfo.name }} {{ selectedInfo.arch }}
                <span class="text-vex-text-muted text-sm ml-2">({{ selectedInfo.os }})</span>
              </h3>
              <p class="text-sm text-vex-text-muted mt-1 font-mono">{{ selectedInfo.file(latestVersion) }}</p>
            </div>
            <div class="flex gap-3">
              <a
                :href="checksumUrl"
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-vex-border text-sm text-vex-text-muted hover:text-white hover:border-vex-border-hover transition-colors"
              >
                SHA-256
              </a>
              <a
                :href="downloadUrl"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-vex-accent text-white text-sm font-medium hover:bg-vex-accent/90 transition-colors"
              >
                <Download class="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        </div>

        <!-- All releases link -->
        <div class="mt-4 text-center">
          <a
            :href="`https://github.com/${REPO}/releases`"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-sm text-vex-text-muted hover:text-vex-accent transition-colors"
          >
            All releases
            <ExternalLink class="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>

    <!-- Post-Install -->
    <section class="border-b border-vex-border">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 class="text-xl font-semibold text-white mb-6">After Installation</h2>
        <div class="space-y-4">
          <div class="rounded-lg border border-vex-border bg-vex-surface/30 p-5">
            <h3 class="text-sm font-medium text-vex-accent mb-2">Verify</h3>
            <code class="text-sm text-vex-text-muted font-mono">vex --version</code>
          </div>
          <div class="rounded-lg border border-vex-border bg-vex-surface/30 p-5">
            <h3 class="text-sm font-medium text-vex-accent mb-2">First Program</h3>
            <pre class="text-sm text-vex-text-muted font-mono overflow-x-auto"><span class="text-vex-text-muted/60">$</span> echo 'fn main(): i32 { print("Hello Vex!"); return 0; }' > hello.vx
<span class="text-vex-text-muted/60">$</span> vex run hello.vx</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Requirements -->
    <section>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 class="text-xl font-semibold text-white mb-6">System Requirements</h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-vex-border bg-vex-surface/30 p-5">
            <div class="flex items-center gap-2 mb-3">
              <Monitor class="w-4 h-4 text-vex-accent" />
              <h3 class="text-sm font-medium text-white">Linux</h3>
            </div>
            <ul class="space-y-1.5 text-sm text-vex-text-muted">
              <li>glibc 2.31+ (Ubuntu 20.04+, Fedora 32+)</li>
              <li>clang or gcc (for linking)</li>
              <li>x86_64 or aarch64 processor</li>
            </ul>
          </div>
          <div class="rounded-lg border border-vex-border bg-vex-surface/30 p-5">
            <div class="flex items-center gap-2 mb-3">
              <Apple class="w-4 h-4 text-vex-accent" />
              <h3 class="text-sm font-medium text-white">macOS</h3>
            </div>
            <ul class="space-y-1.5 text-sm text-vex-text-muted">
              <li>macOS 13 (Ventura)+</li>
              <li>Apple Silicon (M1/M2/M3/M4)</li>
              <li>Xcode Command Line Tools</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
