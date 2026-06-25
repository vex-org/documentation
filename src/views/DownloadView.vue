<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Download,
  Terminal,
  Monitor,
  Apple,
  Cpu,
  CheckCircle,
  Copy,
  ExternalLink,
  Package,
  Laptop,
  Layers,
  Sparkles,
  Zap,
} from "lucide-vue-next";

const REPO = "vex-org/releases";
const INSTALL_CMD =
  "curl -fsSL https://raw.githubusercontent.com/vex-org/releases/main/install.sh | bash";

type Platform = "linux-x86_64" | "linux-aarch64" | "macos-arm64";

interface PlatformInfo {
  id: Platform;
  name: string;
  arch: string;
  os: string;
  icon: typeof Monitor;
  suffix: string;
}

const platforms: PlatformInfo[] = [
  {
    id: "linux-x86_64",
    name: "Linux",
    arch: "x86_64",
    os: "Intel / AMD",
    icon: Monitor,
    suffix: "linux-x86_64",
  },
  {
    id: "linux-aarch64",
    name: "Linux",
    arch: "aarch64",
    os: "ARM64",
    icon: Cpu,
    suffix: "linux-aarch64",
  },
  {
    id: "macos-arm64",
    name: "macOS",
    arch: "ARM64",
    os: "Apple Silicon",
    icon: Apple,
    suffix: "macos-arm64",
  },
];

interface StudioPlatformInfo {
  id: string;
  name: string;
  arch: string;
  os: string;
  icon: typeof Monitor;
  fileName: string;
  downloadUrl: string;
}

const studioPlatforms: StudioPlatformInfo[] = [
  {
    id: "macos-arm64",
    name: "macOS (M1/M2/M3/M4)",
    arch: "ARM64",
    os: "Apple Silicon",
    icon: Apple,
    fileName: "vex-hdl Studio_0.1.0_aarch64.dmg",
    downloadUrl: "https://github.com/vex-org/releases/releases/download/v0.1.0/vex-hdl%20Studio_0.1.0_aarch64.dmg",
  },
  {
    id: "macos-x64",
    name: "macOS (Intel)",
    arch: "x64",
    os: "Intel Core / Xeon",
    icon: Apple,
    fileName: "vex-hdl Studio_0.1.0_x64.dmg",
    downloadUrl: "https://github.com/vex-org/releases/releases/download/v0.1.0/vex-hdl%20Studio_0.1.0_x64.dmg",
  },
  {
    id: "windows-x64",
    name: "Windows (x64)",
    arch: "x64",
    os: "Intel / AMD",
    icon: Monitor,
    fileName: "vex-hdl Studio_0.1.0_x64-setup.exe",
    downloadUrl: "https://github.com/vex-org/releases/releases/download/v0.1.0/vex-hdl%20Studio_0.1.0_x64-setup.exe",
  },
  {
    id: "linux-deb",
    name: "Linux (Debian/Ubuntu)",
    arch: "x64",
    os: "Intel / AMD",
    icon: Cpu,
    fileName: "vex-hdl Studio_0.1.0_amd64.deb",
    downloadUrl: "https://github.com/vex-org/releases/releases/download/v0.1.0/vex-hdl%20Studio_0.1.0_amd64.deb",
  },
  {
    id: "linux-appimage",
    name: "Linux (AppImage)",
    arch: "x64",
    os: "Intel / AMD",
    icon: Cpu,
    fileName: "vex-hdl Studio_0.1.0_amd64.AppImage",
    downloadUrl: "https://github.com/vex-org/releases/releases/download/v0.1.0/vex-hdl%20Studio_0.1.0_amd64.AppImage",
  },
];

const selectedProduct = ref<"studio" | "cli">("studio");
const selectedPlatform = ref<Platform>("linux-x86_64");
const selectedStudioPlatform = ref("windows-x64");
const latestVersion = ref("latest");
const copied = ref(false);

const selectedInfo = computed(
  () => platforms.find((p) => p.id === selectedPlatform.value)!,
);

const selectedStudioInfo = computed(
  () => studioPlatforms.find((p) => p.id === selectedStudioPlatform.value)!,
);

const fileName = computed(() => {
  const v = latestVersion.value === "latest" ? "latest" : latestVersion.value;
  return `vex-${v}-${selectedInfo.value.suffix}.tar.gz`;
});

const downloadUrl = computed(() => {
  return `https://github.com/${REPO}/releases/download/${latestVersion.value}/vex-${latestVersion.value}-${selectedInfo.value.suffix}.tar.gz`;
});

const checksumUrl = computed(() => downloadUrl.value + ".sha256");

function copyInstallCmd() {
  navigator.clipboard.writeText(INSTALL_CMD);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  
  // CLI Detection
  if (ua.includes("mac")) {
    selectedPlatform.value = "macos-arm64";
  } else if (ua.includes("linux")) {
    selectedPlatform.value =
      ua.includes("aarch64") || ua.includes("arm")
        ? "linux-aarch64"
        : "linux-x86_64";
  }

  // Studio IDE Detection
  if (ua.includes("mac")) {
    selectedStudioPlatform.value = "macos-arm64";
  } else if (ua.includes("linux")) {
    selectedStudioPlatform.value = "linux-deb";
  } else if (ua.includes("win")) {
    selectedStudioPlatform.value = "windows-x64";
  }
}

async function fetchLatestVersion() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases?per_page=1`,
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        latestVersion.value = data[0].tag_name;
      }
    }
  } catch {
    /* keep 'latest' as fallback */
  }
}

detectPlatform();
onMounted(fetchLatestVersion);
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="border-b border-vex-border bg-gradient-to-b from-vex-bg-card/20 to-transparent">
      <div
        class="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center"
      >
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-vex-border bg-vex-surface text-sm text-vex-text-muted mb-6"
        >
          <Sparkles class="w-3.5 h-3.5 text-vex-accent" />
          Hardware Development Reimagined
        </div>
        <h1
          class="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
        >
          Get Vex Language & IDE
        </h1>
        <p class="text-lg text-vex-text-muted max-w-2xl mx-auto">
          Choose between the visual desktop suite or the lightweight CLI toolchain to build and simulate hardware designs.
        </p>
      </div>
    </section>

    <!-- Product Choice Toggle -->
    <section class="border-b border-vex-border bg-vex-surface/10 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="grid sm:grid-cols-2 gap-4">
          <!-- Vex Language -->
          <div
            @click="selectedProduct = 'cli'"
            :class="[
              'cursor-pointer rounded-xl border p-5 transition-all text-left relative overflow-hidden',
              selectedProduct === 'cli'
                ? 'border-vex-primary bg-vex-primary/5 ring-1 ring-vex-primary'
                : 'border-vex-border bg-vex-surface/30 hover:border-vex-border-light hover:bg-vex-surface/50'
            ]"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="p-2 rounded-lg bg-vex-primary/10 text-vex-primary">
                <Terminal class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-semibold text-white flex items-center gap-1.5">
                  Vex Language
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-vex-primary/20 text-vex-primary-light font-medium font-sans">{{ latestVersion }}</span>
                </h3>
                <span class="text-xs text-vex-text-muted">Systems Programming Language</span>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-vex-text-muted leading-relaxed">
              A modern systems language combining Rust's safety, Go's simplicity, and automatic hardware optimization — CPU, GPU, and NPU.
            </p>
          </div>

          <!-- Vex HDL Studio (IDE) -->
          <div
            @click="selectedProduct = 'studio'"
            :class="[
              'cursor-pointer rounded-xl border p-5 transition-all text-left relative overflow-hidden',
              selectedProduct === 'studio'
                ? 'border-vex-accent bg-vex-accent/5 ring-1 ring-vex-accent'
                : 'border-vex-border bg-vex-surface/30 hover:border-vex-border-light hover:bg-vex-surface/50'
            ]"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="p-2 rounded-lg bg-vex-accent/10 text-vex-accent">
                <Laptop class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-semibold text-white flex items-center gap-1.5">
                  Vex HDL Studio
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-vex-accent/20 text-vex-accent font-medium font-sans">v0.1.0</span>
                </h3>
                <span class="text-xs text-vex-text-muted">Visual IDE & Simulator</span>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-vex-text-muted leading-relaxed">
              A comprehensive visual IDE featuring Monaco-based editing, interactive multi-cursor logic waveform analysis, mixed-signal SPICE co-simulation plotting, VUPPS policy verification, and gate-level physical power estimations. <strong>Recommended for visual-centric hardware design, debug pipelines, and simulations.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content: Vex HDL Studio (IDE) -->
    <div v-if="selectedProduct === 'studio'">
      <!-- Download Section -->
      <section class="border-b border-vex-border">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2
            class="text-xl font-semibold text-white mb-6 flex items-center gap-2"
          >
            <Download class="w-5 h-5 text-vex-accent" />
            Download Vex HDL Studio
          </h2>

          <!-- Studio Platform Tabs -->
          <div class="flex gap-2 mb-6 flex-wrap">
            <button
              v-for="p in studioPlatforms"
              :key="p.id"
              @click="selectedStudioPlatform = p.id"
              :class="[
                'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors',
                selectedStudioPlatform === p.id
                  ? 'border-vex-accent bg-vex-accent/10 text-vex-accent'
                  : 'border-vex-border bg-vex-surface/30 text-vex-text-muted hover:text-white hover:border-vex-border-hover',
              ]"
            >
              <component :is="p.icon" class="w-4 h-4" />
              {{ p.name }}
            </button>
          </div>

          <!-- Studio Download Card -->
          <div class="rounded-lg border border-vex-border bg-vex-surface/30 p-6">
            <div class="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 class="text-lg font-medium text-white">
                  {{ selectedStudioInfo.name }}
                  <span class="text-vex-text-muted text-sm ml-2"
                    >({{ selectedStudioInfo.os }})</span
                  >
                </h3>
                <p class="text-sm text-vex-text-muted mt-1 font-mono">
                  {{ selectedStudioInfo.fileName }}
                </p>
              </div>
              <div class="flex gap-3">
                <a
                  :href="selectedStudioInfo.downloadUrl"
                  class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-vex-accent text-white text-sm font-medium hover:bg-vex-accent/90 transition-colors shadow-lg shadow-vex-accent/15"
                >
                  <Download class="w-4 h-4" />
                  Download Installer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Visual Features Showcase -->
      <section class="border-b border-vex-border">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2
            class="text-xl font-semibold text-white mb-6 flex items-center gap-2"
          >
            <Layers class="w-5 h-5 text-vex-accent" />
            Studio Features
          </h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <div class="rounded-lg border border-vex-border bg-vex-surface/30 p-5">
              <h3 class="text-sm font-medium text-vex-accent mb-2">Modern Code Editor</h3>
              <p class="text-xs text-vex-text-muted leading-relaxed">
                Monaco-based editor fully integrated with Vex compiler. Includes syntax highlighting, linting warnings, real-time diagnostic reports, autocomplete, and hover documentation.
              </p>
            </div>
            <div class="rounded-lg border border-vex-border bg-vex-surface/30 p-5">
              <h3 class="text-sm font-medium text-vex-accent mb-2">Dual-Cursor Waveforms</h3>
              <p class="text-xs text-vex-text-muted leading-relaxed">
                Advanced logic analyzer output. Shift-click to configure Dual-Cursors (Cursor A/B) and dynamically measure delta values, clock speeds (GHz/MHz), and cycle differences.
              </p>
            </div>
            <div class="rounded-lg border border-vex-border bg-vex-surface/30 p-5">
              <h3 class="text-sm font-medium text-vex-accent mb-2">Interactive SPICE Simulation</h3>
              <p class="text-xs text-vex-text-muted leading-relaxed">
                Co-simulate high-frequency mixed-signals with built-in SPICE models. View transient response graphs directly next to your Vex HDL structural modules.
              </p>
            </div>
            <div class="rounded-lg border border-vex-border bg-vex-surface/30 p-5">
              <h3 class="text-sm font-medium text-vex-accent mb-2">Power Estimator Metrics</h3>
              <p class="text-xs text-vex-text-muted leading-relaxed">
                Understand physical constraints before synthesis. Estimates dynamic/static power draw, thermal bounds, and gate switching activity based on simulated stimulus vectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Requirements: Studio -->
      <section>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 class="text-xl font-semibold text-white mb-6">
            Studio System Requirements
          </h2>
          <div class="grid sm:grid-cols-3 gap-4">
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-5"
            >
              <div class="flex items-center gap-2 mb-3">
                <Apple class="w-4 h-4 text-vex-accent" />
                <h3 class="text-sm font-medium text-white">macOS</h3>
              </div>
              <ul class="space-y-1.5 text-xs text-vex-text-muted">
                <li>macOS 13 (Ventura) or newer</li>
                <li>Apple Silicon (M1/M2/M3/M4) or Intel</li>
                <li>Xcode Command Line Tools</li>
                <li>`ngspice` (via homebrew) for SPICE simulation</li>
              </ul>
            </div>
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-5"
            >
              <div class="flex items-center gap-2 mb-3">
                <Monitor class="w-4 h-4 text-vex-accent" />
                <h3 class="text-sm font-medium text-white">Windows</h3>
              </div>
              <ul class="space-y-1.5 text-xs text-vex-text-muted">
                <li>Windows 10 / 11 (64-bit)</li>
                <li>Intel Core / AMD Ryzen processor</li>
                <li>VC++ Redistributable packages</li>
                <li>Included Yosys & nextpnr build toolchain</li>
              </ul>
            </div>
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-5"
            >
              <div class="flex items-center gap-2 mb-3">
                <Cpu class="w-4 h-4 text-vex-accent" />
                <h3 class="text-sm font-medium text-white">Linux</h3>
              </div>
              <ul class="space-y-1.5 text-xs text-vex-text-muted">
                <li>Ubuntu 20.04+, Fedora 32+ or equivalent</li>
                <li>x86_64 architecture</li>
                <li>libwebkit2gtk-4.1 libraries</li>
                <li>`ngspice` package installed via package manager</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Content: Vex CLI & Compiler -->
    <div v-else>
      <!-- Quick Install -->
      <section class="border-b border-vex-border">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2
            class="text-xl font-semibold text-white mb-6 flex items-center gap-2"
          >
            <Terminal class="w-5 h-5 text-vex-primary" />
            CLI Quick Install
          </h2>
          <div class="relative group">
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/50 p-4 sm:p-5 font-mono text-sm sm:text-base text-vex-text-muted overflow-x-auto"
            >
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
          <p class="mt-3 text-sm text-vex-text-muted">
            Installs the full Vex toolchain to
            <code class="text-white/80">~/.vex</code>. Supports Linux and macOS.
          </p>
        </div>
      </section>

      <!-- What's Included -->
      <section class="border-b border-vex-border">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2
            class="text-xl font-semibold text-white mb-6 flex items-center gap-2"
          >
            <Package class="w-5 h-5 text-vex-primary" />
            What's Included
          </h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-4"
            >
              <code class="text-vex-primary-light text-sm">vex</code>
              <p class="text-xs text-vex-text-muted mt-1">
                Compiler, JIT runner, test runner, benchmarks
              </p>
            </div>
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-4"
            >
              <code class="text-vex-primary-light text-sm">vex-lsp</code>
              <p class="text-xs text-vex-text-muted mt-1">
                Language server for VS Code, Neovim, etc.
              </p>
            </div>
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-4"
            >
              <code class="text-vex-primary-light text-sm">vex-formatter</code>
              <p class="text-xs text-vex-text-muted mt-1">
                Opinionated code formatter
              </p>
            </div>
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-4"
            >
              <code class="text-vex-primary-light text-sm">vex-doc</code>
              <p class="text-xs text-vex-text-muted mt-1">
                Documentation generator
              </p>
            </div>
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-4"
            >
              <code class="text-vex-primary-light text-sm">vex-pm</code>
              <p class="text-xs text-vex-text-muted mt-1">Package manager</p>
            </div>
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-4"
            >
              <code class="text-vex-primary-light text-sm">lib/std</code>
              <p class="text-xs text-vex-text-muted mt-1">
                Standard library + runtime
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Manual Download CLI -->
      <section class="border-b border-vex-border">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2
            class="text-xl font-semibold text-white mb-6 flex items-center gap-2"
          >
            <Download class="w-5 h-5 text-vex-primary" />
            Manual Toolchain Download
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
                  ? 'border-vex-primary bg-vex-primary/10 text-vex-primary-light'
                  : 'border-vex-border bg-vex-surface/30 text-vex-text-muted hover:text-white hover:border-vex-border-hover',
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
                  <span class="text-vex-text-muted text-sm ml-2"
                    >({{ selectedInfo.os }})</span
                  >
                </h3>
                <p class="text-sm text-vex-text-muted mt-1 font-mono">
                  {{ fileName }}
                </p>
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
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-vex-primary text-white text-sm font-medium hover:bg-vex-primary-light transition-colors"
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
              class="inline-flex items-center gap-1.5 text-sm text-vex-text-muted hover:text-vex-primary transition-colors"
            >
              All releases
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      <!-- Post-Install: CLI -->
      <section class="border-b border-vex-border">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 class="text-xl font-semibold text-white mb-6">
            After Installation
          </h2>
          <div class="space-y-4">
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-5"
            >
              <h3 class="text-sm font-medium text-vex-primary-light mb-2">Verify</h3>
              <code class="text-sm text-vex-text-muted font-mono"
                >vex --version</code
              >
            </div>
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-5"
            >
              <h3 class="text-sm font-medium text-vex-primary-light mb-2">
                First Program
              </h3>
              <pre
                class="text-sm text-vex-text-muted font-mono overflow-x-auto"
              ><span class="text-vex-text-muted/60">$</span> echo 'fn main(): i32 { print("Hello Vex!"); return 0; }' > hello.vx
<span class="text-vex-text-muted/60">$</span> vex run hello.vx</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- Requirements: CLI -->
      <section>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 class="text-xl font-semibold text-white mb-6">
            Compiler System Requirements
          </h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-5"
            >
              <div class="flex items-center gap-2 mb-3">
                <Monitor class="w-4 h-4 text-vex-primary-light" />
                <h3 class="text-sm font-medium text-white">Linux</h3>
              </div>
              <ul class="space-y-1.5 text-sm text-vex-text-muted">
                <li>glibc 2.31+ (Ubuntu 20.04+, Fedora 32+)</li>
                <li>clang or gcc (for linking)</li>
                <li>x86_64 or aarch64 processor</li>
              </ul>
            </div>
            <div
              class="rounded-lg border border-vex-border bg-vex-surface/30 p-5"
            >
              <div class="flex items-center gap-2 mb-3">
                <Apple class="w-4 h-4 text-vex-primary-light" />
                <h3 class="text-sm font-medium text-white">macOS</h3>
              </div>
              <ul class="space-y-1.5 text-sm text-vex-text-muted">
                <li>macOS 13 (Ventura)+</li>
                <li>Apple Silicon (M1/M2/M3/M4) or Intel</li>
                <li>Xcode Command Line Tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

