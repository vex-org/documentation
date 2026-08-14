# Regex Engine Internals

## Pipeline

```text
source → bounded parser → AST → Thompson bytecode (Prog)
                                  ├─ literal/prefix metadata
                                  └─ one-pass DFA when provably deterministic
```

The AST is compile-only and is not retained by the returned `Regex`. Thompson
fragments also allocate no side storage: each `Frag` is three `i32` values and
its unresolved edges form an intrusive linked list in the unfinished program's
target cells. After patching, those same cells contain ordinary instruction
targets. The validated instruction budget reserves the four persistent SoA
bytecode streams once, avoiding geometric reallocation and copy traffic.
Before publication, `Prog.isWellFormed` rejects unresolved intrusive links,
invalid opcodes, mismatched SoA lengths, bad class indices and out-of-range
targets. Temporary compiler state therefore cannot leak into execution.

This gives per-call, thread-local compilation state without a process-global
cache, runtime FFI allocator, or forced arena mode. Applications should compile
a pattern once and share the resulting immutable `Regex`.

The parser fails closed for unknown flags, malformed inline flags, unsupported
scoped flags, capture-slot overflow, excessive repeats, oversized patterns and
programs whose instruction or capture-scratch budget would be unsafe.

## Execution engines

### Literal and required-literal filters

Pure literals use `str` search directly. The compiler may also publish a
conservatively proven `requiredLiteral`. It is a rejection filter only; a
literal from an optional group or one alternation branch is never treated as
globally required. Exact `.*literal.*` shapes can complete directly.

Multi-byte prefixes use the built-in `str.indexOf`/`contains` implementation,
which inherits Vex's native SIMD lowering. Sparse prefix hits are verified by a
bounded candidate engine. After at most two input lengths of speculative work,
execution falls back to the parallel Thompson state set. Dense adversarial
prefixes therefore remain linear.

### One-pass DFA

Eligible programs receive a 256-way transition table. Empty acceptance is
stored separately from byte transitions, so `a*` does not turn every non-`a`
byte into a match. Position-dependent assertions remain explicit states and are
evaluated at the exact input offset. Assertion table targets use a negative
sentinel, leaving the ordinary hot loop as a direct table lookup.

Multiline programs currently use the general Thompson engine. If branch byte
sets overlap, one-pass construction fails closed and the same fallback is used.

### Thompson boolean engine

Programs with at most 64 instructions use a register-resident `u64` state set
and iterate set bits with `Math.ctz`. All possible unanchored starts coexist in
the same state set, so the input is consumed once instead of restarting the NFA
for every byte. Larger programs use two reusable vectors per call. Both paths
are linear in input length for a fixed program and contain no recursive
backtracking.

### Prioritized Pike capture engine

`Regex.exec` uses an ordered Pike VM over the same bytecode. Split order carries
greedy/lazy priority; a candidate match is retained while higher-priority live
threads are allowed to extend it. Capture `Save` slots travel with each thread.

Mutable VM scratch belongs to `Match`, not `Regex`. A compiled regex can
therefore be shared by concurrent callers, while a caller that reuses its
`Match` value pays workspace growth only on the first call. Epsilon generations
avoid per-thread clears and wrap safely.

## Complexity and limits

- Boolean search/full match: linear in input for a fixed bytecode program.
- Capture execution: prioritized Thompson/Pike simulation; no catastrophic
  recursive backtracking.
- Repeat count: at most 1000.
- Capture groups: at most 127 (the bytecode's one-byte Save-slot format).
- Group nesting: at most 256.
- Pattern source: at most 1 MiB.
- Compiled program: at most 65,536 instructions.
- Capture workspace: at most 16,777,216 `i32` values.

## Metadata

`ProgMeta` contains exact minimum length, anchored-start information, pure and
prefix literals, a conservative required literal and the exact
literal-search-only classification. Metadata is never allowed to change regex
semantics; uncertain cases fall back to the complete engine.
