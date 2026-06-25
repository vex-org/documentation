---
layout: doc
title: Expressions and Operators
---

# VexHDL Expressions and Operators Guide

This guide details VexHDL's expression syntax, binary/unary operators, bit slicing/concatenation, and built-in namespace functions.

---

## 1. Number Literals

VexHDL supports flexible integer and bit-vector literals:

* **Simple Integers**: Decimal numbers (e.g. `42`, `1000`).
* **Radix-Based Literals**: Formatted as `<width>'<radix><value>`. Radixes include binary (`b`), octal (`o`), decimal (`d`), and hexadecimal (`h`).
  * `8'hFF`: 8-bit hex literal representing `255`.
  * `16'd450`: 16-bit decimal literal.
* **4-State Literals (Z & X)**: Radix literals can contain `x`/`X` (unknown) and `z`/`Z` (high impedance) characters.
  * `4'b10z1`: 4-bit literal containing `1`, `0`, `Z`, `1` states.
  * `8'b00xx_zzzz`: 8-bit literal with lower bits high-impedance and middle bits unknown.

---

## 2. Operators

### 2.1 Unary Operators
Unary operators operate on a single operand:

| Operator | Name | Description | Example |
| :--- | :--- | :--- | :--- |
| `~` | Bitwise Not | Flips every bit of the operand | `let mask = ~4'b1010; // 4'b0101` |
| `!` | Logical Not | Inverts boolean state | `let is_false = !is_true;` |
| `-` | Arithmetic Negation | Inverts sign of the number (2's complement) | `let negative_v = -data_in;` |
| `&` | And-Reduction | Performs bitwise AND across all bits of the operand | `let all_ones = &byte_val;` |
| `\|` | Or-Reduction | Performs bitwise OR across all bits of the operand | `let has_one = \|byte_val;` |
| `^` | Xor-Reduction | Performs bitwise XOR across all bits (parity check) | `let parity = ^byte_val;` |

### 2.2 Binary Operators
Binary operators operate on two operands:

* **Arithmetic**: Addition `+`, Subtraction `-`, Multiplication `*`, Division `/`, Modulo `%`.
* **Bitwise Logic**: Bitwise And `&`, Bitwise Or `|`, Bitwise Xor `^`.
* **Logical**: Logic And `&&`, Logic Or `||`.
* **Shifting**:
  * Logical Left-Shift `<<` (fills with `0`).
  * Logical Right-Shift `>>` (fills with `0`).
  * Arithmetic Right-Shift `>>>` (preserves sign bit).
* **Comparisons**:
  * Inequalities: `<`, `<=`, `>`, `>=`.
  * Equality: `==` (equality check, propagates `X/Z`), `!=` (inequality check).
  * Case Equality: `===` (strict equality comparison of `0`, `1`, `X`, and `Z` bits without propagation), `!==` (strict inequality).

### 2.3 Ternary Operator
Conditional selector:
```vexhdl
let result: U<8> = select_flag ? val_a : val_b;
```

---

## 3. Bit Manipulation

* **Bit Selection**: Extracts a single bit from a bus.
  ```vexhdl
  let lsb: Bool = data_bus[0];
  ```
* **Bit Slicing (Part-Select)**: Extracts a sub-bus slice using `[msb:lsb]` syntax.
  ```vexhdl
  let upper_nibble: U<4> = data_bus[7:4];
  ```
* **Concatenation**: Chains multiple signals into a single bus using `{a, b, ...}` syntax.
  ```vexhdl
  let combined_bus: U<8> = {upper_nibble, lower_nibble};
  ```
* **Replication**: Repeats a signal `N` times using `{N{expr}}` syntax.
  ```vexhdl
  let clear_vector: U<8> = {8{false}}; // 8'b0000_0000
  ```

---

## 4. Built-in Namespaces

VexHDL provides standard helper functions organized inside static namespaces:

### 4.1 `Sim` (Simulation Only)
* `Sim.delay(ticks)`: Halts execution of the calling thread for `ticks` simulation steps.
* `Sim.print(format, args...)`: Prints formatted messages to Tauri Studio's output terminal (supports `%d`, `%h`, `%b`).
* `Sim.assert(condition, message)`: Verifies runtime condition; raises simulation error on failure.
* `Sim.finish()`: Stops simulation runner.

### 4.2 `Math` (Compile-time Elaboration)
* `Math.clog2(val)`: Calculates ceiling log2 of `val` (useful for calculating address widths from memory depth).
  ```vexhdl
  param ADDR_WIDTH: U<32> = Math.clog2(1024); // Evaluates to 10
  ```

### 4.3 `Bit` & `Gate` (Hardware Primitives)
* `Gate` namespace exposes cell-level logic gate primitives for netlist structures (e.g. `Gate.and(a, b)`).

### 4.4 `Mem` (Memory Access)
* Exposes primitives for writing to and reading from `Reg` memories with specific clock triggers.
