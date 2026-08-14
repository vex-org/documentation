# VAPE: Analysis, Fixes and Performance Tooling

VAPE groups three complementary tools: `vex lint` for semantic source
analysis, `vex view` for compiler representations, and `vex prof` for native
microarchitectural inspection.

## `vex lint`

`vex lint` is the canonical correctness and lint command. It analyzes one
`.vx`/`.vxc` file, a package directory, or the nearest package when the target
is omitted. It runs the parser and semantic pipeline without LLVM codegen.

```bash
vex lint main.vx
vex lint --format json main.vx
vex lint --format sarif .
vex lint --format json --timings .
vex lint --deny-warnings .
```

Correctness errors are non-configurable. Lint findings use stable symbolic IDs
in the `unused`, `redundancy`, `suspicious`, `migration`,
`pointer_migration`, `performance`, `api` and `pedantic` groups. The default rules
cover unused imports/locals/assignments/mutability, proven redundant casts and
clones, pure discarded statements, self-assignment, unreachable code, empty
blocks and exact syntax migrations.

Semantic rules use resolved declaration and callable identities plus a shared,
revision-bound graph of transitive effects, provenance, and target-aware
numeric ranges. They do not decide whether code is unused, Copy, unsafe,
allocating, or redundant from a source name. The `performance`, `library`,
`pedantic`, and `strict` profiles promote evidence-backed opt-in groups.

SARIF 2.1.0 integrates external code scanners without replacing canonical
JSON. `--timings` adds sorted rule invocation/finding/latency counters only
when requested; ordinary runs avoid clock reads.

### Configuration

```json
{
  "lint": {
    "profile": "default",
    "levels": {
      "unused": "warn",
      "unused_import": "deny",
      "pedantic": "allow"
    },
    "exclude": ["generated/**"]
  }
}
```

CLI overrides take precedence:

```bash
vex lint --only unused .
vex lint --allow unused_mutability .
vex lint --deny unused_import .
```

Local suppressions are structural:

```vex
// vex-lint: allow-file unused_import

fn example() {
    // vex-lint: allow-next unused_mutability
    let! value = 1
}
```

`allow-file` must appear before the first item. `allow-next` applies once to
the next item or statement. JSON output retains suppressed findings and the
directive that matched them.

## Verified automatic fixes

```bash
vex lint --diff .
vex lint --fix .
vex lint --fix --only pointer_migration .
```

Fixes are revision-bound structured edits, not regular-expression rewrites.
The engine rejects stale or conflicting edits, applies changes in memory,
reruns semantic analysis for at most four fixed-point passes, and verifies
that function signatures, binding types, exact overload/callable selection,
generic arguments and correctness diagnostics do not regress. Files are
atomically replaced only after verification succeeds; `--diff` performs the
same proof without writing.

The former `vex analyze`, `vex fix` and `vex check` compatibility commands have
been removed. Commands, scripts and examples must use `vex lint`.

## LSP parity

The Vex language server consumes the same report and fix structures. It uses
the same rule IDs and conflict planner, marks unused/redundant diagnostics as
unnecessary, rejects stale revisions, and exposes `source.fixAll.vex`. It does
not independently scan names for unused imports or rebuild lint edits from
diagnostic text.

## `vex view`

```bash
vex view ast main.vx --format json
vex view cfg main.vx --output cfg.dot
vex view dfg main.vx --output dfg.dot
vex view layout main.vx --struct-name Packet
vex view escape main.vx --output escape.dot
```

These commands expose syntax, control/data flow, layout and ownership/escape
information without applying source changes.

## `vex prof`

```bash
vex prof main.vx
vex prof main.vx --cpu apple-m2
```

`vex prof` uses LLVM-MCA to report instruction throughput, latency and target
execution-resource pressure. Profiling is deliberately separate from lint:
source diagnostics and fixes never rely on an LLVM optimization result.
