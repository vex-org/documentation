# Vex Language — Documentation

VitePress documentation site for [Vex](https://vex-lang.org).

## Setup

- **Runtime:** [Bun](https://bun.sh) or Node.
- Install: `bun install` or `npm install`
- Website dev server: `bun run dev` or `npm run dev`
- Documentation dev server: `bun run dev:docs` or `npm run dev:docs` (port 3333)
- Refresh text bundle: `bun run docs:bundle` or `npm run docs:bundle`
- Verify text bundle: `bun run docs:bundle:check` or `npm run docs:bundle:check`
- Build: `bun run build` or `npm run build`
- Preview: `bun run preview` or `npm run preview`

The documentation sources live in `docs/`. `docs/vex_docs.txt` is the
concatenated text distribution and must be regenerated from those Markdown
sources when documentation changes.

## Deploy (Vercel)

- **Root Directory:** (leave empty — repo root)
- **Build Command:** `bun run build` or `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `bun install` or `npm install` (optional; Vercel auto-detects)
