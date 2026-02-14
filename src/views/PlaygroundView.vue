<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Play, Code, Terminal, Share2, Sparkles, BookOpen, ChevronRight, Zap, Target, Cpu } from 'lucide-vue-next'
import init, { run_vex } from '../wasm/vex_wasm'

const examples = [
  {
    name: 'Hello Vex',
    icon: Sparkles,
    code: `fn main() {
    $println("Hello from Vex Playground!")
    
    let x = 42
    $println(f"The answer is {x}")
}`
  },
  {
    name: 'Automatic Differentiation',
    icon: Target,
    code: `fn main(): i32 {
    let x = 3.0
    
    // Compute f(x) = x² + 2x + 1 and its derivative
    let result = @{
        let p = $param(x)
        p * p + 2.0 * p + 1.0
    }
    
    $println(f"f(3) = {$val(result)}")    // 16.0
    $println(f"f'(3) = {$grad(result)}")  // 8.0
    
    return 0
}`
  },
  {
    name: 'SIMD Vectorization',
    icon: Zap,
    code: `fn main() {
    let a = [1.0, 2.0, 3.0, 4.0]
    let b = [5.0, 6.0, 7.0, 8.0]
    
    // Explicit SIMD intrinsic
    let result = #simd_add(a, b)
    
    $println(f"Result: {result}")
}`
  },
  {
    name: 'Matrix Multiplication',
    icon: Cpu,
    code: `fn main() {
    let A = [[1.0, 2.0], [3.0, 4.0]]
    let B = [[5.0, 6.0], [7.0, 8.0]]
    
    // Vex supports native matrix operators
    let C = A <*> B
    
    $println(f"Matrix C: {C}")
}`
  },
  {
    name: 'Contracts & Impl',
    icon: BookOpen,
    code: `contract Display {
    toString(): string;
}

struct Point impl Display {
    x: f64, y: f64
}

fn (self: &Point) toString(): string {
    return f"({self.x}, {self.y})"
}

fn main() {
    let p = Point { x: 10.0, y: 20.0 }
    $println(f"Point: {p.toString()}")
}`
  },
  {
    name: 'Error Handling',
    icon: Target,
    code: `fn divide(a: f64, b: f64): Result<f64, string> {
    if b == 0.0 {
        return Error("Division by zero")
    }
    return Ok(a / b)
}

fn main() {
    match divide(10.0, 0.0) {
        Ok(res) => $println(f"Result: {res}"),
        Error(msg) => $println(f"Error: {msg}")
    }
}`
  },
  {
    name: 'Comptime Reflection',
    icon: Sparkles,
    code: `struct User {
    id: i64 \`json:"user_id"\`,
    name: string \`json:"name"\`
}

fn main() {
    let fields = #fieldNames<User>()
    let id_tag = #fieldTag<User>("id", "json")
    
    $println(f"Fields: {fields}")
    $println(f"ID JSON Tag: {id_tag}")
}`
  },
  {
    name: 'Recursive Math',
    icon: Zap,
    code: `fn fib(n: i32): i32 {
    if n <= 1 { return n }
    return fib(n - 1) + fib(n - 2)
}

fn main() {
    let res = fib(10)
    $println(f"Fib(10) = {res}")
}`
  },
  {
    name: 'GPU Kernel (Syntax)',
    icon: Cpu,
    code: `gpu fn add_kernel(a: [f32], b: [f32], out: [f32]) {
    let idx = $thread_id_x()
    out[idx] = a[idx] + b[idx]
}

fn main() {
    $println("GPU logic parsed successfully!")
}`
  },
  {
    name: 'Operators Overloading',
    icon: Target,
    code: `struct Vec2 impl $Add {
    x: f64, y: f64
    
    fn op+(other: Vec2): Vec2 {
        Vec2 { x: self.x + other.x, y: self.y + other.y }
    }
}

fn main() {
    let v1 = Vec2 { x: 1.0, y: 1.0 }
    let v2 = Vec2 { x: 2.0, y: 3.0 }
    let v3 = v1 + v2
    $println(f"v3: ({v3.x}, {v3.y})")
}`
  }
]

const code = ref(examples[0].code)
const output = ref('')
const errors = ref('')
const isRunning = ref(false)
const wasmLoaded = ref(false)
const activeExample = ref(0)

// In a real scenario, we would import the WASM module here
// import init, { run_vex } from '../wasm/vex_wasm'

async function runCode() {
  if (!wasmLoaded.value) return
  
  isRunning.value = true
  output.value = 'Running...'
  errors.value = ''
  
  try {
    const result = run_vex(code.value)
    output.value = result.output
    errors.value = result.errors
  } catch (err: any) {
    output.value = `Execution Error: ${err.message}`
  } finally {
    isRunning.value = false
  }
}

function loadExample(index: number) {
  activeExample.value = index
  code.value = examples[index].code
  output.value = ''
  errors.value = ''
}

onMounted(async () => {
  try {
    await init()
    wasmLoaded.value = true
  } catch (err) {
    console.error('Failed to initialize WASM:', err)
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
        <p class="text-vex-text-muted text-sm">Experiment with Vex in your browser</p>
      </div>
      
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-vex-border text-vex-text-muted hover:text-white transition-all cursor-pointer">
          <Share2 class="w-4 h-4" />
          Share
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
          ></textarea>
        </div>

        <!-- Console -->
        <div class="flex flex-col rounded-2xl border border-vex-border bg-[#050508] overflow-hidden h-full">
          <div class="flex items-center gap-2 px-4 py-2 border-b border-vex-border bg-vex-surface/50">
            <Terminal class="w-4 h-4 text-vex-accent" />
            <span class="text-xs font-bold text-vex-text-muted uppercase tracking-wider">Console</span>
          </div>
          <div class="flex-1 p-6 font-mono text-sm overflow-auto">
            <pre v-if="output" class="text-vex-text break-words whitespace-pre-wrap mb-4">{{ output }}</pre>
            <pre v-if="errors" class="text-vex-error break-words whitespace-pre-wrap">{{ errors }}</pre>
            <div v-if="!output && !errors" class="h-full flex flex-col items-center justify-center text-vex-text-muted opacity-50">
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
        <h4 class="text-xs font-bold text-vex-primary uppercase mb-1">Local Execution</h4>
        <p class="text-xs text-vex-text-muted">Code runs entirely in your browser using WebAssembly.</p>
      </div>
      <div class="p-4 rounded-xl border border-vex-border bg-vex-accent/5">
        <h4 class="text-xs font-bold text-vex-accent uppercase mb-1">Safety First</h4>
        <p class="text-xs text-vex-text-muted">Sandboxed environment with no filesystem access.</p>
      </div>
      <div class="p-4 rounded-xl border border-vex-border bg-white/5">
        <h4 class="text-xs font-bold text-vex-text-muted uppercase mb-1">Coming Soon</h4>
        <p class="text-xs text-vex-text-muted">Full standard library support and LTO optimizations.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  tab-size: 4;
}
</style>
