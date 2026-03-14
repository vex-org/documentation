# cli

The current CLI package exports these primary building blocks:

- `App`
- `Command`
- `Context`
- `Flag`
- `Arg`
- prompt helpers: `input`, `confirm`, `choose`

## Current Guidance

This page intentionally avoids promising a specific high-level `Application.new(...).parse(...).unwrap()` flow until the user-facing examples are fully re-synchronized with the current stdlib surface.

For now, treat `cli` as a structured command/flag/context package rather than relying on Rust-style builder examples copied from older drafts.
