---
layout: doc
title: Safety, Verification, and Policies
---

# VexHDL Safety, Verification, and Policy System

This document outlines VexHDL's safety checks (including the V-VUMM analyzer), formal verification constructs, and the parameterized policy system.

---

## 1. V-VUMM Static Safety Analyzer

The **V-VUMM (Vex-HDL Value & Usage Memory Manager)** analyzer performs static checks during semantic compiler analysis to catch critical hardware bugs before synthesis.

### 1.1 Multiple Driver Protection (`E023: HirDriverConflict`)
* **Rule**: A signal (wire or reg) can only be driven by a single process or continuous assignment.
* If a signal is written to by two different sequential blocks, combinational blocks, or continuous assignments, the compiler throws `E023`.
* **Example (Multiple Drivers)**:
  ```vexhdl
  let! r_val: U<8>;

  on(PosEdge(clk_A)) { r_val <- val_a; }
  on(PosEdge(clk_B)) { r_val <- val_b; } // E023 Error!
  ```

### 1.2 Unintentional Latch Prevention (`W002: WarnInferredLatch`)
* **Rule**: All signals written inside a combinational (`comb`) block must be explicitly assigned a value along every execution path.
* Missing assignments (e.g. an `if` block without an `else` branch, or a `case` block without a `default`) generate latches, causing timing problems.
* **Example (Latch Inferred)**:
  ```vexhdl
  let comb next_state: State;
  comb {
      if (start) {
          next_state = State::RUN;
      }
      // W002 Warning: next_state is not assigned if start is false!
  }
  ```

### 1.3 Clock Domain Crossing Protection (`W004: WarnClockDomainCrossing`)
* **Rule**: Registers driven in clock domain `A` cannot be read directly inside a block driven in clock domain `B` without synchronization.
* The compiler scans clock domains bidirectionally. Unsynchronized domain crossings emit `W004`.
* **Example (CDC crossing)**:
  ```vexhdl
  let! r_data_a: U<8> on PosEdge(clk_a);
  let! r_data_b: U<8> on PosEdge(clk_b);

  on(PosEdge(clk_b)) {
      r_data_b <- r_data_a; // W004 Warning: Unsynchronized CDC crossing!
  }
  ```
* **Struct CDC Splitting Check**: In addition to standard signals, the compiler ensures different fields of the same struct are not driven by multiple conflicting clocks. If `my_struct.f1` is driven by `clk_A` and `my_struct.f2` is driven by `clk_B`, warning `W004` is raised.

### 1.4 Combinational Loop Detection (`E025: HirCombLoop`)
* **Rule**: Continuous assignments and combinational blocks must not form circular dependency paths.
* The compiler constructs a directed graph of combinational dependencies and uses a DFS-based cycle-detection algorithm.
* **Example (Combinational Loop)**:
  ```vexhdl
  let a: Bool;
  let b: Bool;
  a = b;
  b = a; // E025 Error: combinational feedback loop detected
  ```

### 1.5 Async Reset Polarity Check (`E024: HirAsyncPattern`)
* **Rule**: Edge-triggered async resets must check the correct polarity in their conditional statements inside the block.
* For `PosEdge(rst)`, the block must start with `if (rst)`. For `NegEdge(rst)`, it must check `if (!rst)`.
* **Example (Mismatched Polarity)**:
  ```vexhdl
  let clk: Bool;
  let rst: Bool;
  let! q: U<8>;

  on(PosEdge(clk), PosEdge(rst)) {
      if (!rst) { // E024 Error: Active-high reset trigger requires check `if rst`
          q <- 0;
      } else {
          q <- d;
      }
  }
  ```

### 1.6 Uninitialized Signal & Register Read Check (`W006: WarnUninitializedRead`)
* **Rule**: Floating combinational wires must be driven before being read, and registers must have an initial value or reset branch if read.
* Prevents metastability in simulation and synthesized silicon.
* **Example (Uninitialized Read)**:
  ```vexhdl
  let a: Bool;
  let b: Bool;
  a = b; // W006 Warning: read on unassigned wire `b`
  ```

### 1.7 Width Truncation Warning (`W001: WarnWidthTruncation`)
* **Rule**: Assigning a high-width expression to a smaller-width target bus emits a truncation warning.
* **Example (Width Truncation)**:
  ```vexhdl
  let a: U<8>;
  let b: U<16>;
  a = b; // W001 Warning: width truncation from 16 to 8 bits
  ```

### 1.8 Array Out-of-Bounds Check (`E027: HirOutOfBounds`)
* **Rule**: Constant indices used to index arrays must be strictly within the array's declared depth.
* **Example (Out-of-Bounds)**:
  ```vexhdl
  let! ram: [U<8>; 16];
  let val: U<8>;
  val = ram[20]; // E027 Error: index 20 is out of bounds for array of depth 16
  ```

### 1.9 Clock/Reset Collision Check (`E026: HirClockResetCollision`)
* **Rule**: Sinyals classified as clock or reset sources cannot be driven/written as data signals inside procedural blocks or continuous assignments.
* **Example (Clock/Reset Collision)**:
  ```vexhdl
  let clk: Bool;
  let rst: Bool;
  on(PosEdge(clk)) {
      clk <- 1; // E026 Error: cannot write to clock/reset signal
  }
  ```

### 1.10 Assignment Style Verification (`W005: WarnAssignStyle`)
* **Rule**: Sequential registers (`let!`) should be updated with non-blocking assignments (`<-` / `NonBlockingAssign`) inside sequential blocks, while combinational wires should use blocking assignments (`=` / `BlockingAssign`).
* **Example (Mismatched Assignment Style)**:
  ```vexhdl
  let! reg_val: U<8>;
  on(PosEdge(clk)) {
      reg_val = 1; // W005 Warning: blocking assignment '=' used for register
  }
  ```

### 1.11 Port Width Mismatch Warning (`W008: WarnMismatchedPorts`)
* **Rule**: Port connections to instantiated sub-modules must have identical bit widths.
* **Example (Mismatched Ports)**:
  ```vexhdl
  graph sub(a: In<U<8>>, y: Out<U<8>>) {
      y = a;
  }
  graph top(a16: In<U<16>>, y16: Out<U<16>>) {
      inst: sub(a: a16, y: y16); // W008 Warning: port width mismatch in instance
  }
  ```

### 1.12 Fork-Join Racing Error (`E028: HirParallelRacing`)
* **Rule**: Parallel execution blocks inside a `fork-join` block must not write to the same signal.
* **Example (Fork-Join Racing)**:
  ```vexhdl
  let! q: U<8>;
  fork_join {
      { q <- 1; }
      { q <- 2; } // E028 Error: parallel race condition on signal `q`
  }
  ```

---

## 2. Formal Verification and Debugging

VexHDL supports simulation and formal verification primitives directly in the syntax:

* **`assert(condition)`**: Verifies that `condition` is true. Synthesizes to formal assertions or simulation checks.
* **`assume(condition)`**: Assumes that `condition` is true during formal verification (acting as an input constraint).
* **`cover(condition)`**: Instructs formal tools to prove that `condition` is reachable during testing.
* **`force(signal, value)`**: Procedurally forces a signal to a value in simulation, ignoring its normal drivers.
* **`release(signal)`**: Removes a procedural force, returning the signal to its normal drivers.

---

## 3. Parameterized Policy & Contract System

The Policy system allows designers to attach metadata, synthesis constraints, and layout parameters directly to hardware graphs, ports, and signals using the `@attach` decorator.

### 3.1 Declaring a Policy
Policies are declared using the `policy` keyword, supporting default arguments and inheritance:
```vexhdl
// Base policy for timing constraints
policy TimingConstraints {
    setup_slack: Int = 10,
    hold_slack: Int = 2,
}

// Inherited policy for critical paths
policy CriticalPath : TimingConstraints {
    max_delay_ns: Float = 1.2,
}
```

### 3.2 Attaching Policies (`@attach`)
You can attach policies to graphs, ports, or signal declarations:
```vexhdl
@attach(CriticalPath(setup_slack = 12, max_delay_ns = 1.0))
export graph critical_adder(
    in_a: In<U<8>>,
    in_b: In<U<8>>,
    out_sum: Out<U<8>>,
) {
    out_sum = in_a + in_b;
}
```
During compilation, these policies are resolved into a flat metadata map on the High-Level Intermediate Representation (`HirGraph::metadata`), allowing synthesis backends (like Yosys) or layout tools to apply exact physical constraints.

---

## 4. VUPPS: Vex Unified Physical Policy Standard

The **Vex Unified Physical Policy Standard (VUPPS)** standardizes physical, electrical, safety, layout, and simulation constraints directly bound to VexHDL designs. Compliant policies organize attributes under seven core domain namespaces.

### 4.1 VUPPS Domains

#### 1. `silicon` (ASIC & Physical Layout)
Targeted at sub-micron and nanometer nodes (e.g., TSMC, SkyWater).
* `process_node`: String (e.g., `"TSMC_N3P"`, `"SKY130"`).
* `power_domain`: String identifying UPF power rails.
* `clock_tree`: Object defining timing targets:
  * `max_skew_ps`: Float (maximum clock skew in picoseconds).
  * `max_latency_ps`: Float (maximum insertion delay).
* `floorplan`: Object containing macro coordinates and cell placement density.
* `isolation`: Object declaring level shifters and isolation cells.

#### 2. `safety_class` (High-Reliability & Mission-Critical Systems)
Targeted at aerospace, automotive (ISO 26262), and defense hardware.
* `redundancy`: Enum (`"None"`, `"DMR"`, `"TMR"`).
  * **TMR (Triple Modular Redundancy)**: When set to `"TMR"`, the compiler automatically triplicates registers and injects a majority voting network at the HIR level.
* `seu_mitigation`: Enum (`"None"`, `"HammingECC"`, `"TripleRegisters"`).
* `temp_range`: Enum (`"Commercial"`, `"Industrial"`, `"Military"`).
* `fail_safe_state`: String defining fallback values on lock detection.

#### 3. `board` (PCB Assembly & System-Level Mapping)
Controls high-level physical boards, packaging, and routing.
* `footprint`: String indicating standard footprints (e.g., `"LQFP-48"`, `"BGA-256"`).
* `routing`: Object defining trace limits:
  * `impedance_ohm`: Float.
  * `max_length_mm`: Float.
* `layers`: Integer (minimum board layers required).

#### 4. `elec` (Electrical & IO Standards)
Electrical conditioning constraints at the pin/package boundary.
* `iostd`: String standard (e.g., `"LVCMOS33"`, `"LVDS"`).
* `drive`: Integer (output drive strength in mA).
* `slew`: Enum (`"Fast"`, `"Slow"`).
* `pull`: Enum (`"None"`, `"Up"`, `"Down"`) or Object containing pull strength values.
* `decouple_uf`: Float (decoupling capacitance target for power pins).

#### 5. `synth` (Logic Synthesis Directives)
Controls logic optimization, mapping, and netlist extraction.
* `keep`: Boolean (prevents synthesis pruning).
* `ram_style`: Enum (`"Auto"`, `"Block"`, `"Distributed"`, `"Ultra"`).
* `clock_gating`: Boolean (enables clock gating cell insertion for power saving).
* `scan_chain`: Boolean (DFT scan path insertion).

#### 6. `sim` (Simulation Modeling & Timing Checks)
Directs simulation runtime environment and behavior:
* `trace`: Enum (`"None"`, `"VCD"`, `"FST"`). Filters trace signal outputs to optimize disk write speed and log file size.
* `clock_skew_ps`: Float. Simulates clock delay tree offsets on crossing clock boundaries.
* `setup_hold_check`: Boolean. Automatically monitors timing violations near clock edges, raising timing violations or transitioning registers to metastable (`X`) state during simulation.

#### 7. `circuit` (tscircuit & Board Assembly Code Gen)
Binds logical modules to PCB layout engines like **tscircuit**:
* `package_name`: String (BOM catalog name, e.g., `"STM32F405RGT6"`).
* `component_type`: String (e.g., `"Microcontroller"`, `"Resistor"`, `"Capacitor"`).
* `net_class`: String (routing class).

### 4.2 Multi-Target Physical Constraint Outputs

During compilation, the VexHDL compiler automatically processes these policies to generate physical constraint files:
1. **Synopsys Design Constraints (SDC)**: Extracted from `silicon.clock_tree` to generate clock periods and uncertainty.
2. **Unified Power Format (UPF)**: Extracted from `silicon.power_domain` to map power rails.
3. **tscircuit Code**: A TypeScript React component representing the board layout, routing paths, pull-up/down resistors (from `elec.pull`), and series current-limiting resistors (from `elec.limit`).

