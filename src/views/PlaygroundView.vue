<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Play, Code, Terminal, Share2, Sparkles, BookOpen, ChevronRight, Zap, Target, Cpu, Wifi, WifiOff } from 'lucide-vue-next'
import { runCode as apiRunCode, emitIR, healthCheck } from '../api/vex'

const examples = [
  {
    name: 'Hello Vex',
    icon: Sparkles,
    code: `fn main(): i32 {
    println("Hello from Vex Playground!")
    
    let x = 42
    println(x)
    return 0
}`
  },
  {
    name: 'Fibonacci',
    icon: Zap,
    code: `fn fib(n: i32): i32 {
    if n <= 1 { return n }
    return fib(n - 1) + fib(n - 2)
}

fn main(): i32 {
    let result = fib(20)
    println(result)
    return 0
}`
  },
  {
    name: 'Structs & Methods',
    icon: BookOpen,
    code: `struct Point {
    x: f64,
    y: f64
}

fn (self: &Point) distance(): f64 {
    return (self.x * self.x + self.y * self.y)
}

fn main(): i32 {
    let p = Point { x: 3.0, y: 4.0 }
    println(p.distance())
    return 0
}`
  },
  {
    name: 'Pattern Matching',
    icon: Target,
    code: `fn classify(n: i32): string {
    match n {
        0 => return "zero",
        1..=9 => return "small",
        10..=99 => return "medium",
        _ => return "large"
    }
}

fn main(): i32 {
    println(classify(0))
    println(classify(5))
    println(classify(42))
    println(classify(100))
    return 0
}`
  },
  {
    name: 'Vectors',
    icon: Cpu,
    code: `fn main(): i32 {
    let! v = Vec.new<i32>()
    v.push(10)
    v.push(20)
    v.push(30)
    
    println(v.len())
    
    for i in 0..v.len() {
        println(v.get(i))
    }
    return 0
}`
  },
  {
    name: 'Error Handling',
    icon: Target,
    code: `fn divide(a: f64, b: f64): Result<f64, string> {
    if b == 0.0 {
        return Err("division by zero")
    }
    return Ok(a / b)
}

fn main(): i32 {
    match divide(10.0, 3.0) {
        Ok(val) => println(val),
        Err(msg) => println(msg)
    }
    
    match divide(10.0, 0.0) {
        Ok(val) => println(val),
        Err(msg) => println(msg)
    }
    return 0
}`
  },
  {
    name: 'Closures',
    icon: Sparkles,
    code: `fn apply(x: i32, f: fn(i32): i32): i32 {
    return f(x)
}

fn main(): i32 {
    let double = |x: i32|: i32 { x * 2 }
    let square = |x: i32|: i32 { x * x }
    
    println(apply(5, double))
    println(apply(5, square))
    return 0
}`
  },
  {
    name: 'String Operations',
    icon: BookOpen,
    code: `fn main(): i32 {
    let greeting = "Hello, Vex!"
    println(greeting)
    println(greeting.len())
    
    let name = "World"
    println("Hello, " + name + "!")
    return 0
}`
  }
]

const code = ref(examples[0].code)
const output = ref('')
const errors = ref('')
const isRunning = ref(false)
const wasmLoaded = ref(false)
const activeExample = ref(0)
const activeView = ref<'output' | 'ir'>('output')
const compileTime = ref(0)
const runTime = ref(0)
const userTime = ref(0)
const sysTime = ref(0)
const memoryKB = ref(0)
const irOutput = ref('')
const isLoadingIR = ref(false)
const shareLabel = ref('Share')

function shareCode() {
  const encoded = encodeURIComponent(code.value)
  const url = `${window.location.origin}/playground?code=${encoded}`
  navigator.clipboard.writeText(url)
  shareLabel.value = 'Copied!'
  setTimeout(() => { shareLabel.value = 'Share' }, 2000)
}

async function runCode() {
  isRunning.value = true
  output.value = 'Running...'
  errors.value = ''
  
  try {
    const result = await apiRunCode(code.value)
    // Extract actual program output (filter compiler timing lines)
    const lines = result.stdout.split('\n')
    const programOutput = lines.filter(l => 
      !l.includes('Compile time:') && !l.includes('Running (JIT)') && !l.includes('Run time:') && l.trim() !== ''
    ).join('\n')
    
    // Filter informational messages from stderr, keep actual errors
    const stderrFiltered = (result.stderr || '').split('\n').filter(l => {
      const t = l.trim()
      if (!t) return false
      if (t.startsWith('Codegen:') || t.startsWith('Compiling') || t.startsWith('Linking')) return false
      return true
    }).join('\n')
    
    if (result.exit_code !== 0 && !programOutput) {
      output.value = stderrFiltered || '(compilation error)'
      errors.value = ''
    } else {
      output.value = programOutput || '(no output)'
      errors.value = result.exit_code !== 0 ? stderrFiltered : ''
    }
    
    compileTime.value = result.compile_time_ms
    runTime.value = result.run_time_ms
    userTime.value = result.user_time_ms
    sysTime.value = result.sys_time_ms
    memoryKB.value = result.memory_kb
    // Also fetch IR in background
    fetchIR()
  } catch (err: any) {
    output.value = ''
    errors.value = `Connection Error: ${err.message}`
  } finally {
    isRunning.value = false
  }
}

async function fetchIR() {
  isLoadingIR.value = true
  try {
    const result = await emitIR(code.value)
    irOutput.value = result.ir
  } catch {
    irOutput.value = ''
  } finally {
    isLoadingIR.value = false
  }
}

function loadExample(index: number) {
  activeExample.value = index
  code.value = examples[index].code
  output.value = ''
  errors.value = ''
}

onMounted(async () => {
  wasmLoaded.value = await healthCheck()
  // Load shared code from URL
  const params = new URLSearchParams(window.location.search)
  const shared = params.get('code')
  if (shared) {
    code.value = shared
    activeExample.value = -1
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 h-[calc(100vh-80px)] flex flex-col">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles class="w-6 h-6 text-vex-primary" />
          Playground
        </h1>
        <p class="text-vex-text-muted text-sm flex items-center gap-2">
          Experiment with Vex in your browser
          <span v-if="wasmLoaded" class="inline-flex items-center gap-1 text-[10px] text-green-400"><Wifi class="w-3 h-3" /> Connected</span>
          <span v-else class="inline-flex items-center gap-1 text-[10px] text-red-400"><WifiOff class="w-3 h-3" /> Offline</span>
        </p>
      </div>
      
      <div class="flex items-center gap-3">
        <button @click="shareCode" class="flex items-center gap-2 px-4 py-2 rounded-lg border border-vex-border text-vex-text-muted hover:text-white transition-all cursor-pointer">
          <Share2 class="w-4 h-4" />
          {{ shareLabel }}
        </button>
        <button 
          @click="runCode"
          :disabled="isRunning"
          class="flex items-center gap-2 px-6 py-2 rounded-lg bg-vex-primary hover:bg-vex-primary-light text-vex-bg font-bold transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-vex-primary/20"
        >
          <Play v-if="!isRunning" class="w-4 h-4" />
          <div v-else class="w-4 h-4 border-2 border-vex-bg border-t-transparent rounded-full animate-spin"></div>
          {{ isRunning ? 'Running...' : 'Run' }}
        </button>
      </div>
    </div>

    <div class="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
      <!-- Sidebar / Examples -->
      <div class="lg:col-span-1 flex flex-col gap-4">
        <div class="rounded-2xl border border-vex-border bg-vex-bg-card h-full overflow-hidden flex flex-col">
          <div class="px-4 py-3 border-b border-vex-border bg-vex-surface/50 flex items-center gap-2">
            <BookOpen class="w-4 h-4 text-vex-primary" />
            <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Examples</span>
          </div>
          <div class="flex-1 overflow-auto p-2">
            <button
              v-for="(ex, index) in examples"
              :key="index"
              @click="loadExample(index)"
              :class="['w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left mb-1 group', activeExample === index ? 'bg-vex-primary/10 text-vex-primary-light' : 'text-vex-text-muted hover:bg-white/5 hover:text-white']"
            >
              <component :is="ex.icon" class="w-4 h-4 flex-shrink-0" />
              <span class="truncate flex-1">{{ ex.name }}</span>
              <ChevronRight :class="['w-3 h-3 transition-transform', activeExample === index ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0']" />
            </button>
          </div>
        </div>
      </div>

      <!-- Editor & Console -->
      <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-0">
        <!-- Editor -->
        <div class="flex flex-col rounded-2xl border border-vex-border bg-vex-bg-card overflow-hidden h-full">
          <div class="flex items-center gap-2 px-4 py-2 border-b border-vex-border bg-vex-surface/50">
            <Code class="w-4 h-4 text-vex-primary" />
            <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Editor</span>
          </div>
          <textarea 
            v-model="code"
            class="flex-1 p-6 bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
            spellcheck="false"
            @keydown.ctrl.enter="runCode"
            @keydown.meta.enter="runCode"
          ></textarea>
        </div>

        <!-- Console -->
        <div class="flex flex-col rounded-2xl border border-vex-border bg-[#050508] overflow-hidden h-full">
          <div class="flex items-center justify-between px-4 py-2 border-b border-vex-border bg-vex-surface/50">
            <div class="flex items-center gap-2">
              <Terminal class="w-4 h-4 text-vex-accent" />
              <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Output</span>
            </div>
            <!-- View Selector -->
            <div class="flex bg-white/5 p-1 rounded-lg">
              <button 
                @click="activeView = 'output'"
                :class="['px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all', activeView === 'output' ? 'bg-vex-primary text-vex-bg shadow-sm' : 'text-vex-text-muted hover:text-white']"
              >Console</button>
              <button 
                @click="activeView = 'ir'"
                :class="['px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all', activeView === 'ir' ? 'bg-vex-primary text-vex-bg shadow-sm' : 'text-vex-text-muted hover:text-white']"
              >LLVM IR</button>
            </div>
          </div>
          <div class="flex-1 p-6 font-mono text-sm overflow-auto">
            <!-- Output View -->
            <div v-if="activeView === 'output'">
              <pre v-if="output" class="text-vex-text break-words whitespace-pre-wrap mb-4">{{ output }}</pre>
              <div v-if="compileTime > 0 || runTime > 0" class="flex flex-wrap gap-3 text-[10px] text-vex-text-muted mb-2 pb-2 border-b border-vex-border">
                <span v-if="compileTime > 0" class="flex items-center gap-1">⚡ Compile: {{ compileTime.toFixed(1) }}ms</span>
                <span v-if="runTime > 0" class="flex items-center gap-1">▶ Run: {{ runTime.toFixed(1) }}ms</span>
                <span v-if="userTime > 0" class="flex items-center gap-1">👤 User: {{ userTime.toFixed(2) }}ms</span>
                <span v-if="sysTime > 0" class="flex items-center gap-1">⚙️ Sys: {{ sysTime.toFixed(2) }}ms</span>
                <span v-if="memoryKB > 0" class="flex items-center gap-1">💾 {{ memoryKB > 1024 ? (memoryKB / 1024).toFixed(1) + ' MB' : memoryKB + ' KB' }}</span>
              </div>
              <pre v-if="errors" class="p-4 rounded-xl bg-vex-error/10 border border-vex-error/20 text-vex-error break-words whitespace-pre-wrap">{{ errors }}</pre>
            </div>
            
            <!-- LLVM IR View -->
            <div v-if="activeView === 'ir'">
              <div v-if="isLoadingIR" class="flex items-center gap-2 text-vex-text-muted">
                <div class="w-4 h-4 border-2 border-vex-primary border-t-transparent rounded-full animate-spin"></div>
                Generating LLVM IR...
              </div>
              <pre v-else-if="irOutput" class="text-vex-primary-light break-words whitespace-pre-wrap text-[11px]">{{ irOutput }}</pre>
              <div v-else class="h-full flex flex-col items-center justify-center text-vex-text-muted opacity-50 py-12">
                <Code class="w-8 h-8 mb-2" />
                <p>Run your code to see LLVM IR</p>
              </div>
            </div>

            <div v-if="!output && !errors && !irOutput && activeView === 'output'" class="h-full flex flex-col items-center justify-center text-vex-text-muted opacity-50">
              <Terminal class="w-12 h-12 mb-4" />
              <p>Ready to run</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features footer -->
    <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 rounded-xl border border-vex-border bg-vex-primary/5">
        <h4 class="text-xs font-bold text-vex-primary uppercase mb-1">Server Execution</h4>
        <p class="text-xs text-vex-text-muted">Code runs on a sandboxed Vex compiler with full stdlib support.</p>
      </div>
      <div class="p-4 rounded-xl border border-vex-border bg-vex-accent/5">
        <h4 class="text-xs font-bold text-vex-accent uppercase mb-1">LLVM IR</h4>
        <p class="text-xs text-vex-text-muted">View the generated LLVM IR for any Vex program.</p>
      </div>
      <div class="p-4 rounded-xl border border-vex-border bg-white/5">
        <h4 class="text-xs font-bold text-vex-text-muted uppercase mb-1">Safety First</h4>
        <p class="text-xs text-vex-text-muted">Sandboxed environment with memory limits and timeouts.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  tab-size: 4;
}
</style>
