---
layout: doc
title: Getting Started
---

# VexHDL Getting Started Guide

Welcome to VexHDL! VexHDL is a modern, type-safe, and high-performance Hardware Description Language (HDL) designed to eliminate the common bugs, verbosity, and licensing friction of traditional HDLs (like Verilog and VHDL). 

This guide will walk you through the Vex Studio IDE, the package manager CLI (`vex-pm`), and the steps to write, simulate, and debug your first hardware module.

---

## 1. Introducing Vex Studio & `vex-pm`

VexHDL designs are managed as packages and developed inside **Vex Studio**, a lightweight Tauri-based desktop environment containing:
* **Monaco Editor:** Armed with a full-featured Language Server (LSP) providing diagnostics, hover values, autocompletions, and type-checks.
* **Waveform Viewer:** A canvas-based, high-performance visualizer showing simulation signals.
* **Schematic Viewer:** An interactive visualizer rendering the generated gate/cell-level design schematic.
* **Embedded Simulator (`vex-hdl-sim`):** A fast 4-state engine supporting timing and live interactive debugging.

### Creating a New Project
You can create a project using the `vex-pm` CLI or directly within Vex Studio:
```bash
# Create a new VexHDL package
vex-pm new my_counter_project
cd my_counter_project
```

A standard VexHDL project structure looks like this:
```text
my_counter_project/
├── vex.toml          # Package configuration and dependencies
└── src/
    └── main.vxh      # Top-level entry file
```

---

## 2. Writing Your First Module (`graph`)

In VexHDL, hardware modules are declared using the `graph` keyword. Unlike Verilog modules, a `graph` defines compile-time constants (parameters) and ports in distinct lists.

Let's write a parameterized **8-bit Counter with active-high asynchronous reset and enable** inside `src/counter.vxh`:

```vexhdl
// A parameterized up-counter module
export graph counter #(
    WIDTH: Param<U<32>> = 8, // Compile-time generic parameter (defaults to 8 bits)
)(
    clk: In,                 // 1-bit input clock (alias for In<Bool>)
    rst: In,                 // 1-bit input active-high reset
    en: In<Bool>,            // 1-bit input enable signal
    count: Out<U<WIDTH>>,    // Output bus of width 'WIDTH'
) {
    // 1. Declare a sequential register (Flip-Flop)
    let! r_count: U<WIDTH> = 0;

    // 2. Describe the clock-edge-triggered behavior
    // PosEdge(rst) in the trigger list makes the reset ASYNCHRONOUS.
    // If 'PosEdge(rst)' was omitted, the reset would be SYNCHRONOUS.
    on(PosEdge(clk), PosEdge(rst)) {
        if rst {
            r_count <- 0;               // Non-blocking assignment (<-)
        } else if en {
            r_count <- r_count + 1;     // Increment
        }
    }

    // 3. Drive output port with continuous combinational assignment
    count = r_count;                    // Blocking assignment (=)
}
```

### Key Rules to Remember:
1. **`let!` vs `let`**: `let!` declares a sequential register (producing physical Flip-Flops). `let` declares combinational wires/nets.
2. **Assignments**: Use non-blocking `<-` only inside trigger-based `on(...)` blocks. Use blocking `=` for combinational lines and continuous assignments.
3. **Ports**: Inputs and outputs must be annotated with `In`, `Out`, or `InOut` wrapper types.

---

## 3. Writing a Simulation Testbench

To verify our counter, we write a `testbench` block. Testbenches are simulation-only environments where you instantiate your device under test (DUT) and drive inputs procedurally.

Create a file named `src/tb_counter.vxh`:

```vexhdl
import { counter } from "./counter.vxh";

testbench tb_counter {
    // Declare testbench driver signals (combinational variables)
    let clk: Bool = false;
    let rst: Bool = true;
    let en: Bool = false;
    let count: U<8>;

    // 1. Instantiate the Device Under Test (DUT)
    // Instantiation syntax: <inst_name>: <graph_name>(<params>)(<ports>);
    dut: counter(
        WIDTH: 8,
    )(
        clk: clk,
        rst: rst,
        en: en,
        count: count,
    );

    // 2. Generate a Clock signal (50MHz / 20ns period)
    initial {
        forever {
            clk = false;
            Sim.delay(10); // Wait 10 simulation steps
            clk = true;
            Sim.delay(10); // Wait 10 simulation steps
        }
    }

    // 3. Describe the Stimulus Sequence
    initial {
        Sim.print("=== Starting Counter Simulation ===");

        // Apply Reset
        rst = true;
        en = false;
        Sim.delay(25); // Wait until after first clock edge

        // Release Reset
        rst = false;
        Sim.delay(10);

        // Enable counting
        en = true;
        Sim.delay(200); // Let it count for multiple cycles

        // Inspect final value and assert
        Sim.print("Final Count value: %d", count);
        Sim.assert(count > 0, "Counter failed to increment!");

        // Stop the simulation runner
        Sim.finish();
    }
}
```

> [!WARNING]
> Verilog's `#delay` syntax (e.g. `#10`) is **not** supported in VexHDL. Procedural simulation delays must use `Sim.delay(ticks)` or `delay(ticks)`.

---

## 4. Running and Debugging

In Vex Studio:
1. Open your workspace folder containing `counter.vxh` and `tb_counter.vxh`.
2. Select `tb_counter.vxh` as the active document.
3. Click the **Run Simulation** button in the top menu bar or press `Cmd+Enter` / `Ctrl+Enter`.
4. The simulation outputs will print to the Terminal Console, and the **Waveform Viewer** tab will open showing the transitions of `clk`, `rst`, `en`, and `count`.

### Next Steps:
Go to [Syntax Reference](/hdl/syntax-reference) to explore VexHDL's type system, module declarations, and structured data types.
