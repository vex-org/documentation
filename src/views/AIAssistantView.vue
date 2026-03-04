<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Send, Bot, User, Code, Sparkles, Wrench, ArrowLeftRight } from 'lucide-vue-next'
import { askAI } from '../api/vex'

interface Message {
  role: 'user' | 'assistant'
  content: string
  model?: string
}

const messages = ref<Message[]>([])
const input = ref('')
const codeInput = ref('')
const isLoading = ref(false)
const showCode = ref(false)
const mode = ref<'ask' | 'explain' | 'translate' | 'fix'>('ask')
const chatContainer = ref<HTMLElement | null>(null)

const modes = [
  { key: 'ask', label: 'Ask', icon: Sparkles, desc: 'Ask anything about Vex' },
  { key: 'explain', label: 'Explain', icon: Code, desc: 'Explain Vex code' },
  { key: 'translate', label: 'Translate', icon: ArrowLeftRight, desc: 'Translate code to Vex' },
  { key: 'fix', label: 'Fix', icon: Wrench, desc: 'Fix Vex code errors' },
] as const

async function sendMessage() {
  const question = input.value.trim()
  const code = codeInput.value.trim()
  
  if (!question && !code) return
  
  const userMsg = code ? `${question}\n\`\`\`\n${code}\n\`\`\`` : question
  messages.value.push({ role: 'user', content: userMsg })
  
  input.value = ''
  isLoading.value = true
  
  await nextTick()
  scrollToBottom()
  
  try {
    const result = await askAI({
      question: question || undefined,
      code: code || undefined,
      mode: mode.value === 'ask' ? undefined : mode.value,
    })
    messages.value.push({ role: 'assistant', content: result.answer, model: result.model })
  } catch (err: any) {
    messages.value.push({ role: 'assistant', content: `Error: ${err.message}` })
  } finally {
    isLoading.value = false
    await nextTick()
    scrollToBottom()
  }
}

function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

function setMode(m: typeof mode.value) {
  mode.value = m
  showCode.value = m !== 'ask'
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 h-[calc(100vh-80px)] flex flex-col">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white flex items-center gap-2">
        <Bot class="w-6 h-6 text-vex-primary" />
        Vex AI Assistant
      </h1>
      <p class="text-vex-text-muted text-sm">Ask questions, explain code, translate to Vex, or fix errors</p>
    </div>

    <!-- Mode Selector -->
    <div class="flex gap-2 mb-4">
      <button
        v-for="m in modes"
        :key="m.key"
        @click="setMode(m.key)"
        :class="['flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all', mode === m.key ? 'bg-vex-primary/15 text-vex-primary-light border border-vex-primary/30' : 'bg-white/5 text-vex-text-muted hover:bg-white/10 border border-transparent']"
      >
        <component :is="m.icon" class="w-4 h-4" />
        {{ m.label }}
      </button>
    </div>

    <!-- Chat Messages -->
    <div ref="chatContainer" class="flex-1 overflow-auto rounded-2xl border border-vex-border bg-vex-bg-card p-4 space-y-4 min-h-0">
      <!-- Empty State -->
      <div v-if="messages.length === 0" class="h-full flex flex-col items-center justify-center text-vex-text-muted">
        <Bot class="w-16 h-16 mb-4 opacity-30" />
        <p class="text-lg font-medium mb-2">Vex AI Assistant</p>
        <p class="text-sm opacity-70">Ask anything about Vex syntax, concepts, or get help with your code</p>
      </div>

      <!-- Messages -->
      <div v-for="(msg, i) in messages" :key="i" :class="['flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start']">
        <div v-if="msg.role === 'assistant'" class="w-8 h-8 rounded-full bg-vex-primary/15 flex items-center justify-center flex-shrink-0">
          <Bot class="w-4 h-4 text-vex-primary" />
        </div>
        <div :class="['max-w-[80%] rounded-2xl px-4 py-3 text-sm', msg.role === 'user' ? 'bg-vex-primary/15 text-white' : 'bg-white/5 text-vex-text']">
          <pre class="whitespace-pre-wrap font-sans break-words">{{ msg.content }}</pre>
          <div v-if="msg.model" class="mt-2 text-[10px] text-vex-text-muted opacity-50">{{ msg.model }}</div>
        </div>
        <div v-if="msg.role === 'user'" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <User class="w-4 h-4 text-vex-text-muted" />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex gap-3">
        <div class="w-8 h-8 rounded-full bg-vex-primary/15 flex items-center justify-center flex-shrink-0">
          <Bot class="w-4 h-4 text-vex-primary animate-pulse" />
        </div>
        <div class="bg-white/5 rounded-2xl px-4 py-3">
          <div class="flex gap-1">
            <div class="w-2 h-2 rounded-full bg-vex-primary/50 animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2 h-2 rounded-full bg-vex-primary/50 animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2 h-2 rounded-full bg-vex-primary/50 animate-bounce" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Code Input (for explain/translate/fix modes) -->
    <div v-if="showCode" class="mt-3">
      <textarea
        v-model="codeInput"
        placeholder="Paste your code here..."
        class="w-full h-32 px-4 py-3 rounded-xl bg-vex-bg-card border border-vex-border text-white font-mono text-sm resize-none focus:outline-none focus:border-vex-primary/50"
        spellcheck="false"
      ></textarea>
    </div>

    <!-- Input -->
    <div class="mt-3 flex gap-3">
      <textarea
        v-model="input"
        @keydown="handleKeydown"
        :placeholder="mode === 'ask' ? 'Ask about Vex...' : mode === 'explain' ? 'Any specific question? (optional)' : mode === 'translate' ? 'Describe what the code does (optional)' : 'Describe the error...'"
        rows="1"
        class="flex-1 px-4 py-3 rounded-xl bg-vex-bg-card border border-vex-border text-white text-sm resize-none focus:outline-none focus:border-vex-primary/50"
      ></textarea>
      <button 
        @click="sendMessage"
        :disabled="isLoading || (!input.trim() && !codeInput.trim())"
        class="px-5 py-3 rounded-xl bg-vex-primary hover:bg-vex-primary-light text-vex-bg font-bold transition-all disabled:opacity-50 cursor-pointer"
      >
        <Send class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
