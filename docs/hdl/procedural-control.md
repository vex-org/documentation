---
layout: doc
title: Procedural and Control Flow
---

# VexHDL Procedural and Control Flow Guide

This document covers VexHDL's procedural execution blocks (processes) and control structures, detailing conditional branching, pattern matching, loops, and simulation-time concurrency.

---

## 1. Process Blocks

Hardware behavior is described inside process blocks. VexHDL categorizes processes based on their sensitivity list and timing characteristics.

### 1.1 Combinational Process (`comb`)
* Triggered instantaneously when any signal read inside the block changes.
* Only blocking assignments (`=`) are allowed inside this block.
* Evaluates outputs immediately.
```vexhdl
let comb is_zero: Bool;
comb {
    if data_bus == 0 {
        is_zero = true;
    } else {
        is_zero = false;
    }
}
```

### 1.2 Sequential Process (`on`)
* Triggered only on specified edges of clock or reset signals.
* Uses non-blocking assignments (`<-`).
```vexhdl
on(PosEdge(clk), PosEdge(rst)) {
    if rst {
        r_out <- 0;
    } else {
        r_out <- next_val;
    }
}
```

### 1.3 Latch Process (`latch`)
* Synthesizes transparent latches.
```vexhdl
latch {
    if gate_enable {
        latch_out = d_in;
    }
    // Note: missing else branch infers memory/latch state.
}
```

### 1.4 Simulation Initial Process (`initial`)
* Runs exactly once at time step 0 during simulation.
* Used to drive initial inputs or sequences in testbenches. Ignored during synthesis.
```vexhdl
initial {
    clk = false;
    rst = true;
    Sim.delay(10);
    rst = false;
}
```

---

## 2. Conditional Statements

### 2.1 `if-else`
Standard conditional structure:
```vexhdl
if (sel == 2'b01) {
    out = a;
} else if (sel == 2'b10) {
    out = b;
} else {
    out = c;
}
```

### 2.2 `case` Statements (Normal, `casez`, `casex`)
VexHDL supports three variants of the `case` statement, supporting don't-care comparison matching:
* **`case` (Normal)**: Strict bitwise comparison of `0`, `1`, `X`, and `Z` values.
* **`casez`**: Treats high-impedance `Z` bits (or `?`) in the patterns as don't-care values.
* **`casex`**: Treats both `X` and `Z` bits in the patterns as don't-care values.

```vexhdl
// CaseZ example: matching priority encoder
casez (encoded_input) {
    4'b1??? => out = 3;
    4'b01?? => out = 2;
    4'b001? => out = 1;
    4'b0001 => out = 0;
    default => out = 0;
}
```

### 2.3 `match` Statements (Pattern Matching)
VexHDL supports Rust-like pattern matching for struct fields, enums, and values:
* **Exhaustive Variant Checks:** Variants are scoped with `Enum::Variant`.
* **Wildcards:** `_` matches all remaining paths.
* **Ranges:** Match range matches using the `a..b` syntax.

```vexhdl
match (current_state) {
    State::IDLE => {
        if start { next_state = State::INIT; }
    }
    State::INIT => {
        next_state = State::RUN;
    }
    _ => {
        next_state = State::IDLE;
    }
}

// Matching value ranges
match (temperature) {
    0..50 => fan_speed = 0;
    51..100 => fan_speed = 1;
    101..150 => fan_speed = 2;
    _ => fan_speed = 3;
}
```

---

## 3. Loops

Loops are unrolled during compilation/synthesis or run dynamically during simulation.

### 3.1 `for` Loops
Used for structured iteration.
```vexhdl
for i in 0..8 {
    out_vector[i] = in_vector[7 - i]; // Reverse bit-order
}
```

### 3.2 `repeat(count)` Loops
Repeats a statement block `count` times.
```vexhdl
repeat(8) {
    clk = !clk;
    Sim.delay(5);
}
```

### 3.3 `forever` Loops
Runs an infinite loop. Primarily used inside clock generation threads.
```vexhdl
forever {
    clk = !clk;
    Sim.delay(10);
}
```

---

## 4. Simulation Concurrency & Synchronization

VexHDL provides advanced statements for managing time-synchronization and thread forks in simulation:

* **`fork ... join`**: Fork-join blocks run multiple statement blocks concurrently as parallel threads during simulation.
  ```vexhdl
  fork {
      // Thread 1: Wait and print
      Sim.delay(50);
      Sim.print("Thread 1 completed!");
  } {
      // Thread 2: Clock stimulus
      repeat(5) {
          clk = !clk;
          Sim.delay(10);
      }
      Sim.print("Thread 2 completed!");
  } join
  ```
* **`wait(condition)`**: Halts thread execution until a condition expression evaluates to `true`.
  ```vexhdl
  wait(ready_flag == true);
  // Continue execution once flag is set
  ```
