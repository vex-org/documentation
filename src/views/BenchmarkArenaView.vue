<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Funnel,
  ListChecks,
  Loader2,
  Maximize2,
  Minimize2,
  Play,
  Search,
  Settings2,
  Share2,
  Sparkles,
  Trophy,
  Wand2,
  WandSparkles,
} from "lucide-vue-next";
import { compareCode, comparePreset, type LangResult } from "../api/vex";
import { benchmarks } from "../data/benchmarks";
import MonacoVexEditor from "../components/MonacoVexEditor.vue";

const LANG_META: Record<
  string,
  { label: string; color: string; logo: string }
> = {
  vex: { label: "Vex", color: "#e30a17", logo: "/logos/vex.png" },
  go: { label: "Go", color: "#00ADD8", logo: "/logos/go.png" },
  rust: { label: "Rust", color: "#CE422B", logo: "/logos/rust.png" },
  zig: { label: "Zig", color: "#F7A41D", logo: "/logos/zig.png" },
  c: { label: "C", color: "#A8B9CC", logo: "/logos/c.png" },
  cpp: { label: "C++", color: "#00599C", logo: "/logos/cpp.png" },
};

const optLevels = [
  { value: "O0", label: "-O0" },
  { value: "O1", label: "-O1" },
  { value: "O2", label: "-O2" },
  { value: "O3", label: "-O3" },
];

// --- Layout / navigation state ---
const activeTab = ref<"preset" | "custom">("preset");
const rightTab = ref<"config" | "results">("config");
const searchQuery = ref("");
const editorFullscreen = ref(false);
const showAdvanced = ref(false);
const showGeneratedCode = ref(false);
const shareCopied = ref(false);

// --- Preset state ---
const activeExample = ref(0);
const presetResults = ref<Record<string, LangResult> | null>(null);
const presetRunning = ref(false);
const presetError = ref("");

// --- Custom state ---
const customCode = ref(`fn main(): i32 {
    let! sum = 0
    for i in 0..1000000 {
        sum = sum + i
    }
    $println(sum)
    return 0
}`);
const customResults = ref<Record<string, LangResult> | null>(null);
const customRunning = ref(false);
const customError = ref("");
const customDisclaimer = ref("");

// --- Shared ---
const selectedLangs = ref<string[]>(["go", "rust", "zig"]);
const optLevel = ref("O2");
const langVersions = ref<Record<string, string>>({});

const availableLangs = computed(() =>
  activeTab.value === "custom" ? ["go", "rust", "zig"] : ["go", "rust", "zig", "c", "cpp"],
);

const opponents = computed(() =>
  availableLangs.value.map((id) => ({ id, ...LANG_META[id] })),
);

const allSelected = computed(
  () =>
    availableLangs.value.length > 0 &&
    availableLangs.value.every((lang) => selectedLangs.value.includes(lang)),
);

const results = computed(() =>
  activeTab.value === "preset" ? presetResults.value : customResults.value,
);
const isRunning = computed(() =>
  activeTab.value === "preset" ? presetRunning.value : customRunning.value,
);
const errorMsg = computed(() =>
  activeTab.value === "preset" ? presetError.value : customError.value,
);

const sortedResults = computed(() => {
  if (!results.value) return [];
  return Object.entries(results.value)
    .map(([lang, r]) => ({ lang, ...r }))
    .sort((a, b) => {
      if (a.error && !b.error) return 1;
      if (!a.error && b.error) return -1;
      return a.time_ms - b.time_ms;
    });
});

const fastest = computed(() => {
  const valid = sortedResults.value.filter((r) => !r.error);
  return valid.length > 0 ? valid[0].lang : null;
});

const maxTime = computed(() => {
  const valid = sortedResults.value.filter((r) => !r.error);
  return valid.length > 0 ? Math.max(...valid.map((r) => r.time_ms)) : 1;
});

const filteredBenchmarks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const rows = benchmarks.map((benchmark, index) => ({ ...benchmark, index }));
  if (!query) return rows;
  return rows.filter(
    (row) =>
      row.name.toLowerCase().includes(query) ||
      row.description.toLowerCase().includes(query),
  );
});

const editorTitle = computed(() =>
  activeTab.value === "preset"
    ? `${benchmarks[activeExample.value].name} — Vex Code`
    : "Your Vex Code",
);

const statBlocks = computed(() => [
  {
    icon: ArrowLeftRight,
    value: String(Object.keys(LANG_META).length),
    label: "Languages",
  },
  { icon: BarChart3, value: String(benchmarks.length), label: "Benchmarks" },
  { icon: Cpu, value: "Real", label: "Compilers" },
  { icon: BadgeCheck, value: "Reproducible", label: "Results" },
]);

const runningMessage = computed(() =>
  activeTab.value === "preset"
    ? "Compiling & running all languages in parallel..."
    : "AI translating & running all languages in parallel...",
);

watch(activeTab, (newTab) => {
  if (newTab === "custom") {
    selectedLangs.value = selectedLangs.value.filter(
      (lang) => lang !== "c" && lang !== "cpp",
    );
  }
});

// Single Monaco instance for both modes: remounting the editor on every tab
// switch tears down its worker/WASM setup, so the buffer is swapped instead.
const editorText = ref(benchmarks[0].vex);

watch(
  [activeTab, activeExample, customCode],
  () => {
    const next =
      activeTab.value === "preset"
        ? benchmarks[activeExample.value].vex
        : customCode.value;
    if (editorText.value !== next) editorText.value = next;
  },
  { immediate: true },
);

function onEditorUpdate(value: string) {
  editorText.value = value;
  if (activeTab.value === "custom") customCode.value = value;
}

function selectExample(index: number) {
  activeExample.value = index;
  presetResults.value = null;
  presetError.value = "";
}

function toggleLang(lang: string) {
  const i = selectedLangs.value.indexOf(lang);
  if (i >= 0) selectedLangs.value.splice(i, 1);
  else selectedLangs.value.push(lang);
}

function toggleAll() {
  selectedLangs.value = allSelected.value ? [] : [...availableLangs.value];
}

// --- Run ---
async function runPreset() {
  if (presetRunning.value) return;
  presetRunning.value = true;
  presetResults.value = null;
  presetError.value = "";
  rightTab.value = "results";

  const ex = benchmarks[activeExample.value];
  try {
    const res = await comparePreset({
      vex_code: ex.vex,
      go_code: selectedLangs.value.includes("go") ? ex.go : "",
      rust_code: selectedLangs.value.includes("rust") ? ex.rust : "",
      zig_code: selectedLangs.value.includes("zig") ? ex.zig : "",
      c_code: selectedLangs.value.includes("c") ? ex.c ?? "" : "",
      cpp_code: selectedLangs.value.includes("cpp") ? ex.cpp ?? "" : "",
      opt_level: optLevel.value,
    });
    presetResults.value = res.results;
    if (res.versions) langVersions.value = res.versions;
  } catch (err: any) {
    presetError.value = err.message;
  } finally {
    presetRunning.value = false;
  }
}

async function runCustom() {
  if (customRunning.value || !customCode.value.trim()) return;
  customRunning.value = true;
  customResults.value = null;
  customError.value = "";
  customDisclaimer.value = "";
  rightTab.value = "results";

  try {
    const res = await compareCode(
      customCode.value,
      selectedLangs.value,
      optLevel.value,
    );
    customResults.value = res.results;
    if (res.versions) langVersions.value = res.versions;
    customDisclaimer.value = res.ai_disclaimer;
  } catch (err: any) {
    customError.value = err.message;
  } finally {
    customRunning.value = false;
  }
}

function runBenchmark() {
  if (isRunning.value || !selectedLangs.value.length) return;
  if (activeTab.value === "preset") runPreset();
  else runCustom();
}

// --- Editor toolbar ---
function formatCode() {
  if (activeTab.value !== "custom") return;
  customCode.value = customCode.value
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\n*$/, "\n");
}

async function shareBenchmark() {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("bench", String(activeExample.value));
  url.searchParams.set("tab", activeTab.value);
  url.searchParams.set("opt", optLevel.value);
  url.searchParams.set("langs", selectedLangs.value.join(","));
  try {
    await navigator.clipboard.writeText(url.toString());
    shareCopied.value = true;
    window.setTimeout(() => (shareCopied.value = false), 1600);
  } catch {
    /* clipboard unavailable */
  }
}

// --- Helpers ---
const fmtMs = (value?: number | null) =>
  value == null ? "—" : value >= 100 ? value.toFixed(0) : value >= 10 ? value.toFixed(1) : value.toFixed(2);

const fmtKb = (kb?: number | null) =>
  kb == null ? "—" : kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;

// --- Query params (share links) ---
function readQuery() {
  const params = new URLSearchParams(window.location.search);
  const bench = Number(params.get("bench"));
  if (Number.isInteger(bench) && bench >= 0 && bench < benchmarks.length) {
    activeExample.value = bench;
  }
  const tab = params.get("tab");
  if (tab === "custom" || tab === "preset") activeTab.value = tab;
  const opt = params.get("opt");
  if (opt && optLevels.some((level) => level.value === opt)) optLevel.value = opt;
  const langs = params.get("langs");
  if (langs) {
    selectedLangs.value = langs
      .split(",")
      .filter((lang) => availableLangs.value.includes(lang));
  }
}

// --- Keyboard shortcut ---
function onKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    runBenchmark();
  }
  if (event.key === "Escape" && editorFullscreen.value) {
    editorFullscreen.value = false;
  }
}

onMounted(() => {
  readQuery();
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="content-page">
    <!-- Heading + stats -->
    <div class="flex flex-wrap items-start justify-between gap-8">
      <div>
        <h1 class="flex items-center gap-3">
          <span
            class="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-vex-primary/40 bg-vex-primary/10"
          >
            <Trophy class="h-5 w-5 text-vex-primary" />
          </span>
          Benchmark Arena
        </h1>
        <p class="mt-3 text-sm text-vex-text-muted">
          Compare Vex against Go, Rust &amp; Zig — fair benchmarks, real
          compilers
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <div
          v-for="stat in statBlocks"
          :key="stat.label"
          class="flex items-center gap-3"
        >
          <span
            class="grid h-9 w-9 place-items-center rounded-lg border border-vex-border bg-vex-bg-card"
          >
            <component :is="stat.icon" class="h-4 w-4 text-vex-accent" />
          </span>
          <div class="leading-tight">
            <div class="text-sm font-semibold text-vex-text">
              {{ stat.value }}
            </div>
            <div class="text-[11px] text-vex-text-muted">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-[264px_minmax(0,1fr)_292px]"
    >
      <!-- ================= LEFT: benchmark picker ================= -->
      <div class="space-y-4">
        <!-- Tabs -->
        <div
          class="grid grid-cols-2 gap-1.5 rounded-2xl border border-vex-border bg-vex-bg-card p-1.5"
        >
          <button
            type="button"
            class="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-[13px] font-medium transition-colors"
            :class="
              activeTab === 'preset'
                ? 'border-vex-primary bg-vex-primary/10 text-white'
                : 'border-transparent text-vex-text-muted hover:bg-white/5 hover:text-white'
            "
            @click="activeTab = 'preset'"
          >
            <Sparkles class="h-3.5 w-3.5" />
            Benchmarks
          </button>
          <button
            type="button"
            class="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-[13px] font-medium transition-colors"
            :class="
              activeTab === 'custom'
                ? 'border-vex-primary bg-vex-primary/10 text-white'
                : 'border-transparent text-vex-text-muted hover:bg-white/5 hover:text-white'
            "
            @click="activeTab = 'custom'"
          >
            <Code2 class="h-3.5 w-3.5" />
            Try your code
          </button>
        </div>

        <!-- Benchmark list -->
        <div
          v-if="activeTab === 'preset'"
          class="flex flex-col overflow-hidden rounded-2xl border border-vex-border bg-vex-bg-card"
        >
          <div class="flex items-center gap-2 border-b border-vex-border p-3">
            <div class="relative flex-1">
              <Search
                class="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-vex-text-muted"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search benchmarks..."
                class="h-9 w-full rounded-lg border border-vex-border bg-vex-bg pl-8 pr-3 text-[13px] text-vex-text placeholder-vex-text-muted focus:border-vex-border-light focus:outline-none"
              />
            </div>
            <button
              type="button"
              class="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-vex-border text-vex-text-muted transition-colors hover:border-vex-border-light hover:text-white disabled:cursor-default disabled:opacity-40"
              :disabled="!searchQuery"
              title="Clear search"
              @click="searchQuery = ''"
            >
              <Funnel class="h-3.5 w-3.5" />
            </button>
          </div>

          <div class="max-h-[430px] overflow-y-auto p-2">
            <button
              v-for="row in filteredBenchmarks"
              :key="row.index"
              type="button"
              class="mb-1 flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors"
              :class="
                activeExample === row.index
                  ? 'border-vex-primary/60 bg-vex-primary/[0.07] text-white'
                  : 'border-transparent text-vex-text hover:bg-white/[0.04] hover:text-white'
              "
              @click="selectExample(row.index)"
            >
              <span
                class="w-6 shrink-0 text-right font-mono text-[11px] text-vex-text-muted"
                >{{ row.index + 1 }}</span
              >
              <span class="min-w-0 flex-1 text-left">
                <span class="block truncate text-[13px] font-medium">{{
                  row.name
                }}</span>
                <span
                  class="mt-0.5 block truncate text-[11px] text-vex-text-muted"
                  >{{ row.description }}</span
                >
              </span>
            </button>
            <p
              v-if="!filteredBenchmarks.length"
              class="px-3 py-6 text-center text-xs text-vex-text-muted"
            >
              No benchmarks match "{{ searchQuery }}".
            </p>
          </div>

          <a
            class="flex items-center gap-3 border-t border-vex-border p-3 transition-colors hover:bg-white/[0.03]"
            href="https://github.com/meftunca/vex/issues"
            target="_blank"
            rel="noopener"
          >
            <span
              class="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-vex-primary/40 bg-vex-primary/10"
            >
              <ListChecks class="h-4 w-4 text-vex-primary" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block text-[12px] font-medium text-vex-text"
                >Have a benchmark idea?</span
              >
              <span class="block text-[11px] text-vex-text-muted"
                >Open an issue or submit a PR</span
              >
            </span>
            <ArrowRight class="h-4 w-4 shrink-0 text-vex-text-muted" />
          </a>
        </div>

        <!-- Custom-mode note -->
        <div
          v-else
          class="rounded-2xl border border-vex-border bg-vex-bg-card p-4"
        >
          <div class="flex items-center gap-2 text-[13px] font-medium text-vex-text">
            <WandSparkles class="h-4 w-4 text-vex-primary" />
            AI translation
          </div>
          <p class="mt-2 text-xs leading-relaxed text-vex-text-muted">
            Write Vex code and AI translates it to the selected opponents.
            Every version runs on a real compiler for a fair comparison.
          </p>
        </div>
      </div>

      <!-- ================= CENTER: editor ================= -->
      <div class="min-w-0">
        <div
          :class="
            editorFullscreen
              ? 'fixed inset-0 z-[120] flex flex-col gap-3 bg-vex-bg p-4'
              : 'overflow-hidden rounded-2xl border border-vex-border bg-vex-bg-card'
          "
        >
          <div
            class="flex items-center gap-3 border-b border-vex-border bg-vex-surface/50 px-4 py-2.5"
          >
            <Code2 class="h-4 w-4 shrink-0 text-vex-primary" />
            <span
              class="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-vex-text-muted"
            >
              {{ editorTitle }}
            </span>
            <div class="ml-auto flex shrink-0 items-center gap-2">
              <button
                type="button"
                class="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-vex-border px-2.5 py-1.5 text-[11px] text-vex-text-muted transition-colors hover:border-vex-border-light hover:text-white disabled:cursor-default disabled:opacity-40"
                :disabled="activeTab !== 'custom'"
                title="Trim trailing whitespace and collapse blank lines"
                @click="formatCode"
              >
                <Wand2 class="h-3.5 w-3.5" />
                Format
              </button>
              <button
                type="button"
                class="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-vex-border px-2.5 py-1.5 text-[11px] text-vex-text-muted transition-colors hover:border-vex-border-light hover:text-white"
                @click="shareBenchmark"
              >
                <Share2 class="h-3.5 w-3.5" />
                {{ shareCopied ? "Copied!" : "Share" }}
              </button>
              <button
                type="button"
                class="grid h-7 w-7 cursor-pointer place-items-center rounded-lg border border-vex-border text-vex-text-muted transition-colors hover:border-vex-border-light hover:text-white"
                :title="editorFullscreen ? 'Exit fullscreen' : 'Fullscreen editor'"
                @click="editorFullscreen = !editorFullscreen"
              >
                <Minimize2 v-if="editorFullscreen" class="h-3.5 w-3.5" />
                <Maximize2 v-else class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div class="relative" :class="editorFullscreen ? 'min-h-0 flex-1' : ''">
            <div :class="editorFullscreen ? 'h-full' : 'h-[320px] md:h-[440px]'">
              <MonacoVexEditor
                :model-value="editorText"
                :read-only="activeTab === 'preset'"
                submit-on-mod-enter
                class="h-full"
                :aria-label="
                  activeTab === 'custom' ? 'Vex benchmark editor' : 'Benchmark source'
                "
                @update:model-value="onEditorUpdate"
                @submit="runBenchmark"
              />
            </div>

            <div class="absolute bottom-3 right-3 z-10">
              <div class="relative">
                <select
                  v-model="activeTab"
                  class="cursor-pointer appearance-none rounded-lg border border-vex-border bg-vex-surface/95 py-1.5 pl-3 pr-8 text-[11px] text-vex-text focus:outline-none"
                >
                  <option value="preset">Vex (pre-written)</option>
                  <option value="custom">Your own code</option>
                </select>
                <ChevronDown
                  class="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-vex-text-muted"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= RIGHT: configuration / results ================= -->
      <div class="space-y-4">
        <div
          class="overflow-hidden rounded-2xl border border-vex-border bg-vex-bg-card"
        >
          <div class="grid grid-cols-2 gap-1.5 border-b border-vex-border p-1.5">
            <button
              type="button"
              class="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-[12px] font-medium transition-colors"
              :class="
                rightTab === 'config'
                  ? 'border-vex-primary bg-vex-primary/10 text-white'
                  : 'border-transparent text-vex-text-muted hover:bg-white/5 hover:text-white'
              "
              @click="rightTab = 'config'"
            >
              <Settings2 class="h-3.5 w-3.5" />
              Configuration
            </button>
            <button
              type="button"
              class="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-[12px] font-medium transition-colors"
              :class="
                rightTab === 'results'
                  ? 'border-vex-primary bg-vex-primary/10 text-white'
                  : 'border-transparent text-vex-text-muted hover:bg-white/5 hover:text-white'
              "
              @click="rightTab = 'results'"
            >
              <BarChart3 class="h-3.5 w-3.5" />
              Results
            </button>
          </div>

          <!-- Configuration -->
          <div v-if="rightTab === 'config'" class="space-y-5 p-4">
            <div>
              <div class="mb-2 flex items-center justify-between">
                <span
                  class="text-[11px] font-semibold uppercase tracking-[0.14em] text-vex-text-muted"
                  >Opponents</span
                >
                <button
                  type="button"
                  class="cursor-pointer text-[11px] text-vex-primary transition-colors hover:text-vex-primary-light"
                  @click="toggleAll"
                >
                  {{ allSelected ? "Clear" : "Select all" }}
                </button>
              </div>

              <div class="space-y-1.5">
                <!-- Vex is always in the race -->
                <div
                  class="flex items-center gap-3 rounded-xl border border-vex-primary/40 bg-vex-primary/[0.06] px-3 py-2"
                >
                  <span
                    class="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-vex-primary text-white"
                  >
                    <Check class="h-3.5 w-3.5" />
                  </span>
                  <img
                    :src="LANG_META.vex.logo"
                    alt=""
                    class="h-4 w-4 shrink-0 object-contain"
                  />
                  <span class="flex-1 text-[13px] text-white">Vex</span>
                  <span class="text-[10px] text-vex-text-muted">(current)</span>
                </div>

                <button
                  v-for="op in opponents"
                  :key="op.id"
                  type="button"
                  class="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-vex-border px-3 py-2 text-left transition-colors hover:border-vex-border-light"
                  @click="toggleLang(op.id)"
                >
                  <span
                    class="grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors"
                    :class="
                      selectedLangs.includes(op.id)
                        ? 'border-transparent'
                        : 'border-vex-border'
                    "
                    :style="
                      selectedLangs.includes(op.id)
                        ? { backgroundColor: op.color }
                        : {}
                    "
                  >
                    <Check
                      v-if="selectedLangs.includes(op.id)"
                      class="h-3.5 w-3.5 text-black"
                    />
                  </span>
                  <img
                    :src="op.logo"
                    alt=""
                    class="h-4 w-4 shrink-0 object-contain"
                  />
                  <span
                    class="flex-1 text-[13px]"
                    :class="
                      selectedLangs.includes(op.id)
                        ? 'text-white'
                        : 'text-vex-text-muted'
                    "
                    >{{ op.label }}</span
                  >
                </button>
              </div>
            </div>

            <div>
              <span
                class="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-vex-text-muted"
                >Opt Level</span
              >
              <div class="grid grid-cols-4 gap-1.5">
                <button
                  v-for="level in optLevels"
                  :key="level.value"
                  type="button"
                  class="cursor-pointer rounded-lg py-2 text-center font-mono text-[11px] font-bold transition-colors"
                  :class="
                    optLevel === level.value
                      ? 'bg-vex-primary text-white'
                      : 'bg-white/5 text-vex-text-muted hover:text-white'
                  "
                  @click="optLevel = level.value"
                >
                  {{ level.label }}
                </button>
              </div>
            </div>

            <div class="rounded-xl border border-vex-border">
              <button
                type="button"
                class="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-[12px] text-vex-text-muted transition-colors hover:text-white"
                @click="showAdvanced = !showAdvanced"
              >
                <Settings2 class="h-3.5 w-3.5" />
                Advanced options
                <ChevronDown
                  class="ml-auto h-3.5 w-3.5 transition-transform"
                  :class="showAdvanced ? 'rotate-180' : ''"
                />
              </button>
              <label
                v-if="showAdvanced"
                class="flex cursor-pointer items-start gap-2.5 border-t border-vex-border px-3 py-3 text-[12px] leading-relaxed text-vex-text-muted"
              >
                <input
                  v-model="showGeneratedCode"
                  type="checkbox"
                  class="mt-0.5 accent-[#e30a17]"
                />
                <span>
                  <span class="text-vex-text">Show generated source</span>
                  <br />
                  List the translated Go / Rust / Zig code in the results.
                </span>
              </label>
            </div>

            <div>
              <button
                type="button"
                class="ui-button ui-button-primary w-full disabled:opacity-50"
                :disabled="isRunning || !selectedLangs.length"
                @click="runBenchmark"
              >
                <Loader2 v-if="isRunning" class="h-4 w-4 animate-spin" />
                <Play v-else class="h-4 w-4" />
                {{ isRunning ? "Running..." : "Run benchmarks" }}
                <kbd
                  v-if="!isRunning"
                  class="ml-1 rounded border border-white/25 bg-white/10 px-1.5 py-0.5 font-sans text-[10px] leading-none"
                  >⌘↵</kbd
                >
              </button>
              <p class="mt-2.5 text-[11px] leading-relaxed text-vex-text-muted">
                Compiles each language with the selected options and runs them
                for a fair comparison.
              </p>
              <div
                v-if="errorMsg"
                class="mt-3 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-[12px] text-red-400"
              >
                <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0" />
                <span>{{ errorMsg }}</span>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div v-else class="space-y-3 p-4">
            <template v-if="isRunning">
              <div class="flex items-center gap-2 text-[12px] text-vex-text-muted">
                <Loader2 class="h-4 w-4 animate-spin text-vex-primary" />
                {{ runningMessage }}
              </div>
              <div
                v-for="i in 3"
                :key="i"
                class="h-14 animate-pulse rounded-xl border border-vex-border bg-white/[0.02]"
              />
            </template>

            <template v-else-if="results">
              <p
                v-if="customDisclaimer && activeTab === 'custom'"
                class="text-[10px] italic text-vex-text-muted"
              >
                {{ customDisclaimer }}
              </p>

              <div
                v-for="(r, i) in sortedResults"
                :key="r.lang"
                class="rounded-xl border px-3 py-2.5"
                :class="
                  r.lang === fastest
                    ? 'border-vex-primary/40 bg-vex-primary/[0.06]'
                    : 'border-vex-border bg-white/[0.02]'
                "
              >
                <div class="flex items-center gap-2">
                  <span class="w-4 font-mono text-[10px] text-vex-text-muted">{{
                    r.error ? "×" : i + 1
                  }}</span>
                  <img
                    :src="LANG_META[r.lang]?.logo"
                    alt=""
                    class="h-3.5 w-3.5 shrink-0 object-contain"
                  />
                  <span class="text-[12px] font-medium text-white">{{
                    LANG_META[r.lang]?.label
                  }}</span>
                  <span
                    v-if="langVersions[r.lang]"
                    class="truncate text-[9px] text-vex-text-muted"
                    >{{ langVersions[r.lang] }}</span
                  >
                  <Trophy
                    v-if="r.lang === fastest"
                    class="h-3.5 w-3.5 shrink-0 text-vex-primary"
                  />
                  <span
                    class="ml-auto text-[12px] font-semibold tabular-nums text-white"
                    >{{ r.error ? "—" : fmtMs(r.time_ms) + "ms" }}</span
                  >
                </div>

                <div
                  v-if="!r.error"
                  class="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5"
                >
                  <div
                    class="h-full rounded-full"
                    :style="{
                      width: Math.max(6, (r.time_ms / maxTime) * 100) + '%',
                      backgroundColor: LANG_META[r.lang]?.color,
                    }"
                  />
                </div>

                <p v-if="r.error" class="mt-1.5 text-[10px] leading-snug text-red-400">
                  {{ r.error }}
                </p>
                <div
                  v-else
                  class="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-vex-text-muted"
                >
                  <span v-if="r.compile_time_ms != null"
                    >compile {{ fmtMs(r.compile_time_ms) }}ms</span
                  >
                  <span v-if="r.run_time_ms != null"
                    >run {{ fmtMs(r.run_time_ms) }}ms</span
                  >
                  <span v-if="r.memory_kb">mem {{ fmtKb(r.memory_kb) }}</span>
                  <span v-if="r.binary_kb">bin {{ fmtKb(r.binary_kb) }}</span>
                </div>
              </div>

              <div v-if="showGeneratedCode" class="space-y-2 pt-1">
                <span
                  class="block text-[11px] font-semibold uppercase tracking-[0.14em] text-vex-text-muted"
                  >Generated source</span
                >
                <details
                  v-for="r in sortedResults.filter(
                    (x) => x.code && x.lang !== 'vex',
                  )"
                  :key="'code-' + r.lang"
                  class="rounded-xl border border-vex-border bg-vex-bg"
                >
                  <summary
                    class="cursor-pointer list-none px-3 py-2 text-[12px] text-vex-text-muted transition-colors hover:text-white"
                  >
                    {{ LANG_META[r.lang]?.label }} source
                  </summary>
                  <pre
                    class="max-h-56 overflow-auto border-t border-vex-border p-3 text-[10px] leading-relaxed text-vex-text">{{ r.code }}</pre>
                </details>
              </div>

              <p class="pt-1 text-[10px] text-vex-text-muted">
                {{
                  activeTab === "preset"
                    ? "Hand-written code · no AI translation"
                    : "AI-translated opponents · may not be idiomatic"
                }}
              </p>
            </template>

            <div
              v-else
              class="flex flex-col items-center gap-2 py-8 text-center"
            >
              <BarChart3 class="h-5 w-5 text-vex-text-muted" />
              <p class="max-w-[15rem] text-[12px] leading-relaxed text-vex-text-muted">
                Run the benchmark to see how each language compares.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
