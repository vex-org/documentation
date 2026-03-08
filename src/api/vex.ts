const API_URL = import.meta.env.VITE_API_URL || 'https://api.vex-lang.org'

export interface RunResult {
  stdout: string
  stderr: string
  exit_code: number
  compile_time_ms: number
  run_time_ms: number
  user_time_ms: number
  sys_time_ms: number
  memory_kb: number
  binary_kb: number
}

export interface IRResult {
  ir: string
  stderr: string
  compile_time_ms: number
}

export interface AIResult {
  answer: string
  model: string
}

export interface AIRequest {
  question?: string
  code?: string
  mode?: 'explain' | 'translate' | 'fix'
}

export async function runCode(code: string, optLevel = 'O2'): Promise<RunResult> {
  const res = await fetch(`${API_URL}/api/website/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, opt_level: optLevel }),
  })
  if (!res.ok) throw new Error(`Server error: ${res.status}`)
  return res.json()
}

export async function emitIR(code: string, optLevel = 'O2'): Promise<IRResult> {
  const res = await fetch(`${API_URL}/api/website/ir`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, opt_level: optLevel }),
  })
  if (!res.ok) throw new Error(`Server error: ${res.status}`)
  return res.json()
}

export async function askAI(req: AIRequest): Promise<AIResult> {
  const res = await fetch(`${API_URL}/api/website/ai/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
  if (!res.ok) throw new Error(`Server error: ${res.status}`)
  return res.json()
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/website/health`)
    return res.ok
  } catch {
    return false
  }
}

export interface LangResult {
  time_ms: number
  compile_time_ms: number
  run_time_ms: number
  user_time_ms: number
  sys_time_ms: number
  binary_kb: number
  memory_kb: number
  code: string
  stdout?: string
  error?: string
}

export interface CompareResult {
  results: Record<string, LangResult>
  ai_disclaimer: string
  versions?: Record<string, string>
}

export async function compareCode(code: string, langs: string[] = ['go', 'rust', 'zig'], optLevel = 'O2'): Promise<CompareResult> {
  const res = await fetch(`${API_URL}/api/website/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, langs, opt_level: optLevel }),
  })
  if (!res.ok) throw new Error(`Server error: ${res.status}`)
  return res.json()
}

export interface PresetCompareRequest {
  vex_code: string
  go_code: string
  rust_code: string
  zig_code: string
  opt_level?: string
}

export async function comparePreset(req: PresetCompareRequest): Promise<CompareResult> {
  const res = await fetch(`${API_URL}/api/website/compare-preset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
  if (!res.ok) throw new Error(`Server error: ${res.status}`)
  return res.json()
}
