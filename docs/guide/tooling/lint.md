# Linting and Verified Fixes

`vex lint` is Vex's canonical source-analysis command. It runs parser,
resolution, type, control-flow, borrow, ABI, and validation checks together
with the configurable lint registry, without invoking LLVM code generation.

Use it for ordinary diagnostics, CI quality gates, safe cleanup, and source
migrations:

```bash
vex lint src/main.vx
vex lint .
vex lint --fix .
vex lint --diff --only pointer_migration .
vex lint --format json --deny-warnings .
vex lint --format sarif .
vex lint --format json --timings .
vex lint --analyze-comptime .
vex lint --explain-boxing src/main.vx
vex lint --explain-arena src/main.vx
```

The former `vex check`, `vex analyze`, and `vex fix` compatibility commands
have been removed. Use `vex lint`, `vex lint --fix`, or `vex lint --diff`.

`--explain-boxing` exposes VUMM ownership/boxing decisions and
`--explain-arena` exposes AutoArena allocation decisions. They are diagnostic
views over the same semantic session, not separate analysis commands.

`--analyze-comptime` runs the shared typed staging probe after successful
semantic analysis and writes an aggregate known/residual/error summary to
stderr. Lint findings in text, JSON, and SARIF remain unchanged. The option is
default-off and never applies staged replacements.

## Analysis targets

`TARGET` may be:

- one `.vx` or `.vxc` file;
- a package directory;
- omitted, in which case Vex discovers the nearest enclosing `vex.json`.

A directory must belong to a package. Vex rejects an unscoped repository root
instead of merging all nested packages into one enormous analysis session, and
package inventory stops at nested `vex.json` boundaries.

Directory analysis selects the source variants matching the active target OS
and architecture. Cross-target analysis uses the same routing as compilation:

```bash
vex lint --target x86_64-pc-windows-msvc .
```

`.git`, `.vex`, `.vxm`, `target`, `build`, `vendor`, and `generated`
directories are skipped by default. Package-specific exclusions can be added
in `vex.json`. Compiler-generated `vex_test_runner_*`,
`.vex_test_runner_*`, and `.vex_bench_*` files are execution artefacts rather
than package members, so lint excludes them even if an interrupted test or
benchmark process left them beside the original source.

## Diagnostics versus lints

`vex lint` reports two kinds of findings:

1. **Correctness diagnostics** are compiler errors such as invalid syntax,
   unresolved names, type mismatches, borrow violations, illegal pointer
   capability escalation, and invalid FFI declarations. They cannot be
   disabled.
2. **Lint diagnostics** are configurable findings with stable symbolic IDs.
   Their levels are `allow`, `warn`, or `deny`.

This separation matters in fix mode: an unrelated existing compiler error may
coexist with an exact syntax migration, but a semantic cleanup never runs
without the phase that proves it safe.

## Current rules

| Rule | Group | What it detects | Automatic fix |
| --- | --- | --- | --- |
| `unused_import` | `unused` | resolved imports with no semantic use | yes |
| `unused_local` | `unused` | local bindings with no semantic reads | suggestion; deletion only when proven effect-free |
| `unused_mutability` | `unused` | binding mutability never required | yes |
| `unused_assignment` | `unused` | value overwritten before any read | yes when the RHS is effect-free |
| `ignored_result` | `unused` | discarded value resolving to the canonical `Result` lang item | no |
| `unawaited_future` | `unused` | discarded value whose resolved type is `Future` | no |
| `redundant_identity_cast` | `redundancy` | exact non-pointer identity casts | yes |
| `redundant_literal_cast` | `redundancy` | a literal suffix already fixes the destination type | yes |
| `redundant_pointer_cast` | `pointer_migration` | exact pointer identity casts | yes, only with semantic identity proof |
| `redundant_clone` | `redundancy` | cloning an exact `Copy` value | yes |
| `no_effect_statement` | `redundancy` | discarded expression proven effect-free | yes |
| `self_assignment` | `suspicious` | both sides resolve to the same semantic place | yes |
| `unreachable_code` | `suspicious` | local code after unconditional control flow | suggestion |
| `suspicious_shadowing` | `pedantic` | a nested same-named binding ends and the exact outer binding resumes | no; opt-in |
| `unreachable_match_alternative` | `pedantic` | earlier unguarded alternatives fully cover an exact bool/enum pattern | no; opt-in |
| `borrowed_value_escapes` | `pedantic` | a borrowed/view value crosses an exact container-store or channel boundary | no; opt-in |
| `constant_comparison` | `suspicious` | comparison result proven by typed operand ranges | no |
| `empty_range` | `suspicious` | range proven empty by typed bounds | no |
| `empty_block` | `suspicious` | empty block without an explanatory comment | suggestion |
| `deprecated_syntax` | `migration` | supported legacy grammar with an exact replacement | yes |
| `legacy_pointer_syntax` | `pointer_migration` | `ptr`, `*T`, legacy null casts | yes |
| `legacy_void_type` | `pointer_migration` | legacy Vex `void` type positions | yes |
| `discarded_allocation` | `performance` | exactly proven allocation result immediately discarded | no; opt-in |
| `last_use_owned_clone` | `performance` | a non-Copy owned local is cloned at its proven final non-repeating use | no; opt-in |
| `exported_allocation` | `api` | exported function with allocation in its transitive effect summary | no; opt-in |
| `exported_raw_pointer_abi` | `api` | exported Vex signature exposing a raw pointer capability | no; opt-in |
| `exported_borrowed_return` | `api` | exported return is a borrow/view derived from an exact input binding | no; opt-in |
| `exported_ownership_transfer` | `api` | exported return transfers ownership out of an exact input/receiver chain | no; opt-in |
| `redundant_contract_bound` | `pedantic` | a resolved bound is implied by another exact contract inheritance edge | no; opt-in |
| `out_of_range_numeric_cast` | `pedantic` | integer value range proven outside the target type | no; opt-in |
| `potentially_lossy_numeric_cast` | `pedantic` | numeric type domains cannot preserve every source value | no; opt-in |

The default profile warns for correctness-adjacent, unused, redundancy,
suspicious, and migration rules. Evidence-backed performance, API, and
pedantic rules remain `allow` until selected. Unknown selectors are
configuration errors instead of silently doing nothing.

Available profiles are:

| Profile | Additional opt-in groups |
| --- | --- |
| `default` | none |
| `performance` | `performance` |
| `pedantic` | `pedantic` |
| `library` | `api` |
| `strict` | `performance`, `pedantic`, `api` |

An explicit rule/group level overrides profile promotion. `--only` also
promotes the selected opt-in rule or group to `warn`, unless it was explicitly
set to `allow`.

## Pointer migration

The canonical raw-pointer surface is:

```vex
Ptr<T>         // readable pointee capability
Ptr<T!>        // writable pointee capability
Ptr<Opaque>    // opaque C-compatible object pointer
```

The focused migration group performs syntax-aware conversions:

```text
ptr                 -> Ptr<Opaque>
*T                  -> Ptr<T>
*T!                 -> Ptr<T!>
0 as *T             -> Ptr.null<T>()
fn callback(): void -> fn callback(): ()
Result<void, E>     -> Result<unit, E>
```

Run it independently from unrelated cleanup rules:

```bash
vex lint --only pointer_migration legacy-package
vex lint --diff --only pointer_migration legacy-package
vex lint --fix --only pointer_migration legacy-package
```

Direct function and callback results use `()`. Nested or value-position unit
types use the `unit` keyword because it is unambiguous inside generic grammar.
C source embedded as a compiler fixture remains C and is not interpreted as
Vex pointer syntax.

## Why `--fix` is conservative

`vex lint --fix` does not apply a bag of textual replacements. Every edit is:

- attached to the exact source revision and expected original text;
- planned with overlap and conflict detection;
- applied first to an in-memory workspace;
- reparsed and semantically reanalyzed;
- iterated to a fixed point, with a maximum of four passes;
- written atomically only after verification succeeds.

Verification fingerprints function identity, inferred signatures and
bindings, callable and overload selection, generic arguments, call
operand/result types, and correctness diagnostics. If a fix changes a semantic
decision or introduces a new compiler error, no files are committed.

Use `--diff` to run the same verified pipeline without writing:

```bash
vex lint --diff .
```

## Rule selection and levels

```bash
vex lint --only unused .
vex lint --allow empty_block .
vex lint --warn performance .
vex lint --deny unused_import .
vex lint --deny-warnings .
```

`--only` selects one rule or group while correctness analysis still runs.
Repeated `--allow`, `--warn`, and `--deny` flags may target either a symbolic
rule ID or a group. CLI settings override manifest settings.

Package configuration lives in `vex.json`:

```json
{
  "lint": {
    "profile": "default",
    "levels": {
      "unused": "warn",
      "unused_import": "deny",
      "pedantic": "allow"
    },
    "exclude": ["generated/**", "vendor/**"],
    "baseline": ".vex/lint-baseline.json"
  }
}
```

## Staged CI baselines

A baseline lets an existing package adopt strict lint gates without hiding its
current debt:

```bash
vex lint --deny-warnings --write-baseline .vex/lint-baseline.json .
vex lint --deny-warnings --baseline .vex/lint-baseline.json .
```

Baseline findings remain present in terminal, JSON, SARIF, and editor output;
they are tagged as baselined and do not fail the lint gate. New findings do.
Compiler correctness errors are never baselined. Reports include `matched`,
`new`, and `stale` counts, making obsolete entries visible instead of silently
accumulating them.

The file is strict, versioned JSON and is written atomically. Entries use
package-relative paths and source-aware anchors rather than absolute line
numbers, so inserting unrelated lines does not churn the baseline. Configure it
once in `vex.json` with `lint.baseline`; an explicit `--baseline` path overrides
the manifest.

## Local suppression

Suppressions use stable rule or group IDs:

```vex
// vex-lint: allow-file unused_import, deprecated_syntax

fn example() {
    // vex-lint: allow-next unused_mutability
    let! intentionallyMutable = 1
}
```

`allow-file` is valid only before the first item. `allow-next` applies to the
next syntax item or statement. Suppressed diagnostics remain visible in JSON
metadata so editors and audit tools can explain the decision.

Correctness errors cannot be suppressed this way.

## Machine-readable output and editors

```bash
vex lint --format json .
vex lint --format sarif .
vex lint --format json --timings .
```

JSON reports stable rule IDs, groups, levels, byte ranges, notes, structured
fixes, applicability, source revisions, and suppression metadata. Diagnostic
ordering is deterministic by file, source offset, severity, and rule ID. The
top-level `semantic_fact_schema_version` lets consumers version semantic facts
independently from diagnostic wording. Schema v5 models pattern-binding origins
and treats clone, transfer, and exact owning coercions such as `str -> string`
as ownership provenance barriers. It consumes the compiler-owned `Copy`
contract identity and distinguishes immutable program-storage literals from
ordinary borrows. Trusted container and channel facts also identify the exact
parameter slots that escape; indices and other non-stored arguments are never
inferred to escape.

SARIF 2.1.0 carries compiler correctness and lint results for external code
scanners without changing the canonical JSON schema. `--timings` adds sorted
per-rule invocation, finding, and elapsed-nanosecond telemetry to JSON/SARIF.
Ordinary lint runs avoid clock reads entirely.

Machine formats always emit exactly one parseable document. `--diff` and
`--explain-boxing`/`--explain-arena` therefore require text output; fix status
messages are suppressed for JSON/SARIF.

The Vex language server consumes the same `LintReport` and source revisions as
the CLI. Quick fixes and `source.fixAll.vex` use the shared conflict planner;
the editor does not rediscover warnings or reconstruct edits from message
text.

## Exit status

| Code | Meaning |
| ---: | --- |
| `0` | no correctness errors or denied lints; ordinary warnings are allowed |
| `1` | correctness errors, denied lints, or warnings denied by `--deny-warnings` |
| `2` | invalid target, option, output format, or lint configuration |
| `3` | fix planning or verification failed; no partial write was committed |
| `101` | internal compiler or linter failure |

## Stability boundary

The lint framework is production V1 on the validated macOS host. Its registry,
configuration, suppressions, JSON/text reporting, LSP integration,
revision-bound fixes, transactional writes, four-pass cycle guard, target-aware
source routing, and pointer migration have dedicated tests.

The V2-expanded snapshot is covered by unit, architecture, integration, CLI,
serial/parallel parity, cache invalidation, and documentation-build suites.
Native Linux and Windows execution remain platform-CI validation work; this
does not weaken the source and semantic invariants, but it is not claimed as
locally executed coverage.

The V2 corpus calibration covers VexArch and every standard-library package.
Opt-in ownership/API findings remain visible for explicit review rather than
being hidden to claim a clean corpus. Corpus review moved provably out-of-range
casts to `pedantic`, because explicit signed-to-unsigned sentinel encodings are
a valid low-level pattern; genuine discarded `Result` findings are fixed
instead of suppressed.

Automatic fixes intentionally cover less than diagnostics. Vex does not
automatically rewrite pointer provenance, pointer/integer conversions,
address-space changes, numeric narrowing, general arithmetic, alias-sensitive
global stores, or speculative performance transformations.

## V2 semantic foundation

V2 extends the same engine rather than introducing another linter. A lazy,
revision-bound schema-v5 fact graph now owns exact call edges, transitive effect
and allocation summaries, value provenance, compact ownership-transition and
parameter-origin chains, exact unreachable match alternatives, and target-aware
integer/conversion ranges. Reverse call edges use a monotone worklist, so only callers affected by
a growing callee summary are revisited; recursive cycles converge without
per-rule HIR recursion. All selected body rules share the same lowered body,
inference result, binding facts, and V2 facts. Must-use ownership also prevents
generic `no_effect_statement` from duplicating `Result`/`Future` diagnostics or
offering an unsafe deletion fix.

Ordinary lint analysis uses a semantic diagnostics snapshot and never flattens
the import graph into a codegen module. The more expensive VUMM/codegen-ready
snapshot is requested only by `--explain-boxing` or `--explain-arena`.
Likewise, the full overload/signature/binding fingerprint is built only for
`--fix` and `--diff`, where it proves that a proposed edit preserved semantics.
This keeps normal diagnostics free of codegen-only module merging without
weakening fix verification.

For one-document editor runs, only the active file's reachable loaded imports
join the fact graph as non-reporting support modules. Their effects reach the
active file, while their diagnostics remain owned by their own publication and
unrelated open files do not inflate the analysis.

The first correctness, performance, and API rules listed above are implemented.
Long-lived LSP sessions now retain a bounded semantic-fact cache across source
revisions. Reuse requires exact Salsa body, signature, inference, and lang-item
identity plus matching target and callee summaries; a dependency change cannot
reuse stale caller effects. Rule work is also bounded-parallel: small jobs stay
serial, larger jobs use at most four owned Salsa database forks and always
merge in semantic source order. Exact borrowed escape, public ownership,
last-use clone, resumed shadowing, unreachable-alternative, and redundant-bound
rules consume these facts. Dead-private-item analysis remains gated on explicit
entry/test/reflection root identities; it will not guess roots from names.
Machine-readable staged-CI baselines are implemented.

No V2 rule may infer meaning from a function or type name. Default-profile
admission requires corpus false-positive review, and automatic fixes retain
V1's atomicity, idempotence and semantic-fingerprint verification. Performance
rules cannot assume that LLVM will make a transformation safe or profitable.

## Related

- [`Ptr<T>`](/guide/memory/ptr-t)
- [Canonical raw pointers](/guide/types/raw-pointers)
- [Pointers and low-level memory](/guide/advanced/pointers)
- [CLI reference](/references/vex-cli-reference)
- [Testing](/guide/tooling/testing)
