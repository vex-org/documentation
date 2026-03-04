const API_URL = import.meta.env.VITE_API_URL || 'https://api.vex-lang.org'

export interface RunResult {
  stdout: string
  stderr: string
  exit_code: number
  compile_time_ms: number
  run_time_ms: number
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

export async function runCode(code: string): Promise<RunResult> {
  const res = await fetch(`${API_URL}/api/website/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
  if (!res.ok) throw new Error(`Server error: ${res.status}`)
  return res.json()
}

export async function emitIR(code: string): Promise<IRResult> {
  const res = await fetch(`${API_URL}/api/website/ir`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
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
