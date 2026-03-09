# Regex Engine Internals

## Compilation Pipeline

```
Source Pattern → Parser → AST (Pattern/Sequence) → Thompson NFA → Bytecode (Prog)
                                                                         ↓
                                                                 One-Pass DFA (if eligible)
```

1. **Parser** (`parser.vx`): Handles full regex syntax including character classes, quantifiers, alternation, groups, lookahead, backreferences, and inline flags like `(?i)`.
2. **AST** (`ast.vx`): Produces `Pattern` → `Sequence` tree with `Span` position tracking.
3. **Thompson Compiler** (`thompson.vx`): Converts AST into NFA bytecode with epsilon-free transitions.
4. **One-Pass DFA** (`onepass.vx`): When the NFA is unambiguous, builds a direct DFA for O(n) matching.

## Execution Engines

### One-Pass DFA (`onepass.vx`)
For simple patterns without ambiguity. O(n) time, no backtracking. Used for patterns like literal strings, simple alternations, and non-overlapping quantifiers.

### SIMD Prefix Search (`thompson_fast.vx`)
When the pattern starts with a multi-byte literal (e.g., `"HTTP/"`, `"error:"`), the engine extracts this prefix and uses V9 SIMD `indexOf` to jump directly to candidate positions, skipping large portions of the input.

### Lazy DFA (`lazy_dfa.vx`)
For complex patterns, builds DFA states on-demand with a bounded cache. Avoids the exponential state explosion of full DFA construction while still achieving near-DFA speeds on practical inputs.

### Thompson NFA (`thompson_exec.vx`)
The fallback executor. Simulates all active NFA states simultaneously (parallel matching). Guarantees linear-time matching regardless of pattern complexity — no catastrophic backtracking.

## Metadata & Optimization

The compiled `Prog` includes metadata for routing decisions:
- `prefixLen` / `prefixBytes`: Extracted literal prefix for SIMD acceleration
- `innerLen` / `innerBytes`: Inner literal for mid-pattern SIMD filtering
- Pattern complexity flags for engine selection
