# While Loops

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/09_while_loops.vx`

## Overview

Executes a block of code as long as a condition is true.

## Syntax

```vex
let! i = 0;

while i < 5 {
    (i);
    i = i + 1;
}
```

## Control Statements

- `break`: Exits the loop immediately.
- `continue`: Skips the rest of the current iteration and re-checks condition.

```vex
let! n = 0;

while true {
    n = n + 1;
    
    if n % 2 == 0 {
        continue; // Skip even numbers
    }
    
    (n);
    
    if n > 10 {
        break; // Stop after 10
    }
}
```
