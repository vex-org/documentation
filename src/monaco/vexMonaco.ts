import * as monaco from 'monaco-editor'
import { Registry } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'
import { loadWASM } from 'vscode-oniguruma'
import onigWasmUrl from 'vscode-oniguruma/release/onig.wasm?url'

import vexGrammar from '@vex-vscode/syntaxes/vex.tmLanguage.json'
import vexTheme from '@vex-vscode/themes/vex-dark.json'
import vexLanguageConfiguration from '@vex-vscode/language-configuration.json'

const VEX_LANGUAGE_ID = 'vex'
const VEX_SCOPE_NAME = 'source.vex'
const VEX_THEME_ID = 'vex-dark'
const grammarMap = new Map([[VEX_LANGUAGE_ID, VEX_SCOPE_NAME]])

type VsCodeTokenColor = {
  scope?: string | string[]
  settings?: {
    foreground?: string
    fontStyle?: string
  }
}

type VsCodeTheme = {
  type?: 'dark' | 'light' | 'hc-dark' | 'hc-light'
  colors?: Record<string, string>
  tokenColors?: VsCodeTokenColor[]
}

let monacoSetupPromise: Promise<typeof monaco> | null = null
let registryPromise: Promise<Registry> | null = null
let onigasmPromise: Promise<void> | null = null

function ensureMonacoEnvironment() {
  const monacoGlobal = globalThis as typeof globalThis & {
    MonacoEnvironment?: monaco.Environment
  }

  if (monacoGlobal.MonacoEnvironment) return

  monacoGlobal.MonacoEnvironment = {
    getWorker() {
      return new Worker(
        new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url),
        { type: 'module' },
      )
    },
  }
}

function normalizeScopes(scope?: string | string[]) {
  if (!scope) return []
  return Array.isArray(scope) ? scope : [scope]
}

function toMonacoTheme(theme: VsCodeTheme): monaco.editor.IStandaloneThemeData {
  const rules: monaco.editor.ITokenThemeRule[] = []

  for (const tokenColor of theme.tokenColors ?? []) {
    for (const scope of normalizeScopes(tokenColor.scope)) {
      rules.push({
        token: scope,
        foreground: tokenColor.settings?.foreground?.replace('#', ''),
        fontStyle: tokenColor.settings?.fontStyle,
      })
    }
  }

  return {
    base: theme.type === 'light' || theme.type === 'hc-light' ? 'vs' : 'vs-dark',
    inherit: true,
    rules,
    colors: theme.colors ?? {},
  }
}

async function ensureRegistry() {
  if (!registryPromise) {
    registryPromise = (async () => {
      if (!onigasmPromise) {
        onigasmPromise = (async () => {
          await loadWASM(await fetch(onigWasmUrl))
        })()
      }

      await onigasmPromise

      return new Registry({
        getGrammarDefinition: async (scopeName) => {
          if (scopeName !== VEX_SCOPE_NAME) {
            throw new Error(`Unsupported grammar scope requested: ${scopeName}`)
          }

          return {
            format: 'json',
            content: JSON.stringify(vexGrammar),
          }
        },
      })
    })()
  }

  return registryPromise
}

async function ensureBaseSetup() {
  if (!monacoSetupPromise) {
    monacoSetupPromise = (async () => {
      ensureMonacoEnvironment()

      if (!monaco.languages.getLanguages().some((language) => language.id === VEX_LANGUAGE_ID)) {
        monaco.languages.register({
          id: VEX_LANGUAGE_ID,
          aliases: ['Vex', 'vex'],
          extensions: ['.vx', '.vxc'],
        })
      }

      monaco.languages.setLanguageConfiguration(
        VEX_LANGUAGE_ID,
        vexLanguageConfiguration as unknown as monaco.languages.LanguageConfiguration,
      )
      monaco.editor.defineTheme(VEX_THEME_ID, toMonacoTheme(vexTheme as VsCodeTheme))
      monaco.editor.setTheme(VEX_THEME_ID)

      return monaco
    })()
  }

  return monacoSetupPromise
}

export async function ensureVexMonaco(editor?: monaco.editor.ICodeEditor) {
  const monacoInstance = await ensureBaseSetup()
  const registry = await ensureRegistry()

  await wireTmGrammars(monacoInstance, registry, grammarMap, editor)

  return monacoInstance
}

export { VEX_LANGUAGE_ID, VEX_THEME_ID }