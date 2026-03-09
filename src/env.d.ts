/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  /** Publishable key (frontend). Supabase may show this instead of "anon" in the dashboard. */
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  /** @deprecated Use VITE_SUPABASE_PUBLISHABLE_KEY */
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@vex-vscode/syntaxes/vex.tmLanguage.json' {
  const value: Record<string, unknown>
  export default value
}

declare module '@vex-vscode/themes/vex-dark.json' {
  const value: Record<string, unknown>
  export default value
}

declare module '@vex-vscode/language-configuration.json' {
  const value: Record<string, unknown>
  export default value
}
