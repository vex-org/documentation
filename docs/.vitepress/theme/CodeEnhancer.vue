<script setup>
/**
 * Code block enhancer — turns plain VitePress code blocks into the Vex
 * signature component: `filename VEX · Run · Copy` with an inline run
 * result panel underneath.
 *
 * Runs only in the browser; VitePress keeps the un-enhanced blocks fully
 * functional (built-in copy button) until this upgrades them.
 */
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const API_BASE = import.meta.env.DEV ? '' : 'https://api.vex-lang.org'
const TERMINAL_LANGS = /^(bash|sh|shell|zsh|console)$/i
const VEX_LANGS = /^(vex|vexhdl)$/i

const route = useRoute()

let observer = null
let scheduled = false

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const formatMs = (value) => {
  const ms = Number(value)
  if (!Number.isFinite(ms)) return '—'
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)} s`
  if (ms >= 10) return `${ms.toFixed(0)} ms`
  return `${ms.toFixed(1)} ms`
}

const langOf = (block) => {
  const cls = [...block.classList].find((name) => name.startsWith('language-'))
  return cls ? cls.slice('language-'.length) : ''
}

const codeTextOf = (pre) => (pre?.textContent ?? '').replace(/\n$/, '')

// `text` fences that read like shell commands get the terminal treatment.
const looksLikeTerminal = (code) =>
  /^\s*\$\s/m.test(code) ||
  /\bvex(?:-pm|-lsp|-doc|-formatter)?\s+(?:run|lint|build|test|new|doc|pm|check|init)\b/.test(
    code
  )

const isTerminalBlock = (lang, code) =>
  TERMINAL_LANGS.test(lang) || (/^text$/i.test(lang) && looksLikeTerminal(code))

function schedule() {
  if (scheduled) return
  scheduled = true
  requestAnimationFrame(() => {
    scheduled = false
    enhanceAll()
  })
}

function enhanceAll() {
  document
    .querySelectorAll('.vp-doc div[class*="language-"]:not(.vex-enhanced)')
    .forEach(enhanceBlock)
}

function buildBar(block, pre, lang) {
  const span = block.querySelector(':scope > .lang')
  const rawLabel = span?.textContent?.trim() || ''
  const isPlainLang = rawLabel.toLowerCase() === lang.toLowerCase()
  const title = block.dataset.title || (rawLabel && !isPlainLang ? rawLabel : '')
  const isTerminal = isTerminalBlock(lang, codeTextOf(pre))

  const bar = document.createElement('div')
  bar.className = 'vex-code-bar'

  const left = document.createElement('div')
  left.className = 'vex-code-title'
  if (title) {
    const file = document.createElement('span')
    file.className = 'vex-code-filename'
    file.textContent = title
    left.append(file)
  }
  const chip = document.createElement('span')
  chip.className = 'vex-code-lang'
  chip.textContent = isTerminal ? 'Terminal' : lang.toUpperCase()
  left.append(chip)

  const actions = document.createElement('div')
  actions.className = 'vex-code-actions'

  if (VEX_LANGS.test(lang) && /\bfn\s+main\s*\(/.test(codeTextOf(pre))) {
    const runBtn = document.createElement('button')
    runBtn.type = 'button'
    runBtn.className = 'vex-code-btn vex-run'
    runBtn.innerHTML =
      '<svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true"><path fill="currentColor" d="M4.5 2.7v10.6a.6.6 0 0 0 .92.5l8.4-5.3a.6.6 0 0 0 0-1L5.42 2.2a.6.6 0 0 0-.92.5Z"/></svg><span>Run</span>'
    runBtn.addEventListener('click', () => runBlock(block, runBtn, codeTextOf(pre)))
    actions.append(runBtn)
  }

  const copyBtn = document.createElement('button')
  copyBtn.type = 'button'
  copyBtn.className = 'vex-code-btn vex-copy'
  copyBtn.textContent = 'Copy'
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeTextOf(pre))
      copyBtn.textContent = 'Copied'
      copyBtn.classList.add('is-done')
      setTimeout(() => {
        copyBtn.textContent = 'Copy'
        copyBtn.classList.remove('is-done')
      }, 1400)
    } catch {
      /* clipboard unavailable (http / permissions) */
    }
  })
  actions.append(copyBtn)

  bar.append(left, actions)
  block.insertBefore(bar, block.firstChild)
}

function enhanceBlock(block) {
  const pre = block.querySelector(':scope > pre')
  if (!pre) return

  const lang = langOf(block)
  if (!lang) return

  block.classList.add('vex-enhanced')
  if (isTerminalBlock(lang, codeTextOf(pre))) block.classList.add('vex-terminal')

  buildBar(block, pre, lang)
}

async function runBlock(block, button, code) {
  const previous = block.querySelector(':scope > .vex-run-output')
  if (previous) previous.remove()

  const out = document.createElement('div')
  out.className = 'vex-run-output is-running'
  out.innerHTML =
    '<div class="vex-run-state"><span class="vex-spinner" aria-hidden="true"></span><span>Compiling and running&hellip;</span></div>'
  block.append(out)

  button.disabled = true
  block.classList.add('is-running')

  const playgroundUrl = `${window.location.origin}/playground?code=${encodeURIComponent(code)}`

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 60_000)
    const res = await fetch(`${API_BASE}/api/website/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, opt_level: 'O2' }),
      signal: controller.signal,
    })
    clearTimeout(timer)
    if (!res.ok) throw new Error(`server responded with ${res.status}`)
    const result = await res.json()
    renderResult(out, result, playgroundUrl)
  } catch (error) {
    const message =
      error?.name === 'AbortError'
        ? 'timed out after 60s'
        : String(error?.message || error)
    out.classList.remove('is-running')
    out.classList.add('is-error')
    out.innerHTML =
      `<div class="vex-run-state"><span class="vex-run-fail">Run failed</span><span class="vex-run-reason">${escapeHtml(message)}</span></div>` +
      `<div class="vex-run-links"><a href="${playgroundUrl}" target="_blank" rel="noopener">Open in Playground &nearr;</a></div>`
  } finally {
    button.disabled = false
    block.classList.remove('is-running')
  }
}

function renderResult(out, result, playgroundUrl) {
  const succeeded = Number(result.exit_code) === 0
  const parts = []

  parts.push('<div class="vex-run-state">')
  parts.push(`<span class="vex-run-tick">&#10003;</span><span>Compiled in ${formatMs(result.compile_time_ms)}</span>`)
  if (succeeded) {
    parts.push('<span class="vex-run-dot">&middot;</span>')
    parts.push(`<span class="vex-run-tick">&#10003;</span><span>Executed in ${formatMs(result.run_time_ms)}</span>`)
  } else {
    parts.push('<span class="vex-run-dot">&middot;</span>')
    parts.push(`<span class="vex-run-exit">exit code ${escapeHtml(result.exit_code)}</span>`)
  }
  parts.push('</div>')

  if (result.stdout) {
    parts.push(`<pre class="vex-run-stdout">${escapeHtml(result.stdout)}</pre>`)
  }
  if (result.stderr) {
    parts.push(`<pre class="vex-run-stderr">${escapeHtml(result.stderr)}</pre>`)
  }
  parts.push(
    `<div class="vex-run-links"><a href="${playgroundUrl}" target="_blank" rel="noopener">Open in Playground &nearr;</a></div>`
  )

  out.classList.remove('is-running')
  out.classList.toggle('has-error', !succeeded)
  out.innerHTML = parts.join('')
}

onMounted(() => {
  enhanceAll()
  observer = new MutationObserver(schedule)
  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})

watch(
  () => route.path,
  () => {
    nextTick(schedule)
    setTimeout(schedule, 60)
  }
)
</script>

<template>
  <span class="vex-code-enhancer" aria-hidden="true" />
</template>

<style>
.vex-code-enhancer {
  display: none;
}
</style>
