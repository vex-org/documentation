# regex — Overview

`std/regex` is a pure-Vex, byte-oriented regular-expression engine with
deterministic resource limits and no catastrophic backtracking.

```vex
import { Match, Regex } from "std/regex";

let regex = Regex.new("(\\w+)@(\\w+\\.\\w+)");
let! result = Match.new();
if regex.exec("mail: user@example.com", &result!) {
    $println(result.group(1).unwrap());
}
```

The public operations have distinct semantics:

- `test` searches anywhere;
- `isMatch` requires the entire input;
- `exec` returns the leftmost match and capture groups.

Internally, pure literals and SIMD-backed prefix searches feed a one-pass DFA
or a parallel Thompson NFA. Capture extraction uses a prioritized Pike VM with
workspace reused through `Match`. Pattern-specific email/router shortcuts are
not part of the engine.

## Source layout

| File | Responsibility |
|---|---|
| `parser.vx` | Bounded syntax parser and validation |
| `ast.vx` | Pattern, sequence, class and capture types |
| `prog.vx` | Thompson bytecode and semantic metadata |
| `thompson.vx` | AST-to-bytecode compiler |
| `class_match.vx` | Canonical byte-class semantics |
| `onepass.vx` | Deterministic transition-table engine |
| `thompson_exec.vx` | Linear boolean search/full-match engine |
| `pike_vm.vx` | Prioritized capture engine |
| `regex.vx` | Public `Regex`, `Matcher` and `Match` API |
