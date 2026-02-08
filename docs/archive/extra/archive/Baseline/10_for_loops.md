# For Loops

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/10_for_loops.vx`

## Overview

Vex uses `for..in` syntax for iteration. It can iterate over ranges, arrays, and collections.

## Syntax

### Range Iteration

Use `start..end` for exclusive range, or `start..=end` for inclusive.

```vex
// 0 to 4 (5 times)
for i in 0..5 {
    (i);
}

// 1 to 10 (inclusive)
for x in 1..=10 {
    (x * x);
}
```

### Array Iteration

Iterate directly over elements.

```vex
let names = ["Alice", "Bob", "Charlie"];

for name in names {
    ("Hello, " + name);
}
```

## Enumerate (Index & Value)
(Planned Feature: currently standard idiom is to use range length)

```vex
let nums = [10, 20, 30];
for i in 0..nums.() {
    (f"Index {i}: {nums[i]}");
}
```

## Implementation

`for` loops are syntactic sugar. `for x in iter` lowers to a `while` loop that calls `.next()` on an iterator (conceptual). For arrays and ranges, the compiler specifically optimizes this to a raw integer loop.
