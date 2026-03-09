<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type * as Monaco from 'monaco-editor'

import { ensureVexMonaco, VEX_LANGUAGE_ID, VEX_THEME_ID } from '@/monaco/vexMonaco'

interface Props {
  modelValue: string
  readOnly?: boolean
  minimap?: boolean
  fontSize?: number
  submitOnModEnter?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  readOnly: false,
  minimap: false,
  fontSize: 14,
  submitOnModEnter: false,
  ariaLabel: 'Vex editor',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()

const containerRef = ref<HTMLElement | null>(null)

let editor: Monaco.editor.IStandaloneCodeEditor | null = null
let model: Monaco.editor.ITextModel | null = null
let resizeObserver: ResizeObserver | null = null
let syncingFromProps = false

onMounted(async () => {
  if (!containerRef.value) return

  const monaco = await ensureVexMonaco()

  model = monaco.editor.createModel(props.modelValue, VEX_LANGUAGE_ID)
  editor = monaco.editor.create(containerRef.value, {
    model,
    theme: VEX_THEME_ID,
    readOnly: props.readOnly,
    fontSize: props.fontSize,
    fontFamily: 'var(--font-family-mono)',
    minimap: { enabled: props.minimap },
    automaticLayout: false,
    scrollBeyondLastLine: false,
    tabSize: 4,
    insertSpaces: true,
    wordWrap: 'off',
    renderLineHighlight: 'all',
    roundedSelection: false,
    padding: {
      top: 16,
      bottom: 16,
    },
    bracketPairColorization: { enabled: true },
    guides: { bracketPairs: 'active' },
    ariaLabel: props.ariaLabel,
  })

  await ensureVexMonaco(editor)

  editor.onDidChangeModelContent(() => {
    if (syncingFromProps || !editor) return
    emit('update:modelValue', editor.getValue())
  })

  if (props.submitOnModEnter) {
    editor.addAction({
      id: 'vex-submit',
      label: 'Run Vex Code',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => emit('submit'),
    })
  }

  resizeObserver = new ResizeObserver(() => editor?.layout())
  resizeObserver.observe(containerRef.value)

  await nextTick()
  editor.layout()
})

watch(
  () => props.modelValue,
  (value) => {
    if (!editor || value === editor.getValue()) return

    syncingFromProps = true
    editor.setValue(value)
    syncingFromProps = false
  },
)

watch(
  () => props.readOnly,
  (readOnly) => {
    editor?.updateOptions({ readOnly })
  },
)

watch(
  () => props.fontSize,
  (fontSize) => {
    editor?.updateOptions({ fontSize })
    editor?.layout()
  },
)

watch(
  () => props.minimap,
  (minimap) => {
    editor?.updateOptions({ minimap: { enabled: minimap } })
    editor?.layout()
  },
)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  editor?.dispose()
  editor = null
  model?.dispose()
  model = null
})
</script>

<template>
  <div ref="containerRef" class="monaco-vex-editor h-full w-full min-h-0" />
</template>

<style scoped>
.monaco-vex-editor {
  min-height: 0;
}
</style>