# regex — Overview

A complete, SIMD-accelerated regex engine written in pure Vex. The engine compiles patterns into Thompson NFA bytecode and employs multiple execution strategies for optimal performance.

## Execution Strategy Pipeline

When you call `regex.test(text)`, the engine routes through the fastest available path:

```
Pattern Compile → Thompson NFA → Bytecode Program
                                       ↓
                  ┌────────────────────┼────────────────────┐
                  ↓                    ↓                    ↓
            One-Pass DFA         SIMD Prefix        Lazy DFA
           (small patterns)    (multi-byte lit)   (complex patterns)
                  ↓                    ↓                    ↓
              Direct match      Fast candidate       On-demand
              (no backtrack)     pre-filter          state cache
```

## Quick Start

```rust
import { Regex, Match } from "regex";

let re = Regex.new("\\d{3}-\\d{4}");

// Simple test
if re.test("Call 555-1234 now") {
    println("Found phone number!");
}

// Extract match
let! m = Match.new();
if re.exec("Call 555-1234 now", &m) {
    println("Match: {m.value()}");       // "555-1234"
    println("Start: {m.start()}");       // position
}
```

## Module Architecture

| File | Lines | Purpose |
|------|------:|---------|
| `parser.vx` | 18,837 | Regex syntax parser → AST |
| `ast.vx` | 6,472 | Pattern/Sequence/Span types |
| `thompson.vx` | 14,511 | NFA compiler (AST → bytecode) |
| `prog.vx` | 4,296 | Bytecode program + metadata |
| `onepass.vx` | 14,227 | One-pass DFA builder & executor |
| `lazy_dfa.vx` | 15,444 | Lazy DFA with on-demand states |
| `thompson_fast.vx` | 22,240 | SIMD-accelerated NFA execution |
| `thompson_exec.vx` | 7,729 | Basic Thompson NFA executor |
| `matcher.vx` | 17,197 | High-level search + capture groups |
| `regex.vx` | 6,179 | Public API (`Regex`, `Match`) |
